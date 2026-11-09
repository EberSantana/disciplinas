/**
 * Portal das disciplinas — Prof. Eber Santana
 * Login por turma, nome e PIN, e registro do progresso de cada aluno.
 * Cole este código em Extensões > Apps Script da planilha e implante como "App da Web".
 *
 * Aba "Turmas" (você preenche, importando o Turmas.csv): um aluno por linha.
 *   turma | curso | turno | matricula | nome | pin | ultimo acesso | tentativas | bloqueado ate
 *   A coluna "pin" começa vazia: o aluno cria o PIN no primeiro acesso.
 *   Para o aluno criar um PIN novo (esqueceu), apague a célula do PIN dele.
 * Aba "Progresso" (criada sozinha): uma linha por aluno e por material.
 * Aba "Jornadas" (criada sozinha): páginas visitadas e dias de estudo de cada aluno, para a página de jornadas.
 * Aba "Visibilidade" (criada sozinha): o que cada turma vê, definido no painel do professor (Liberar conteúdo).
 *   escopo ("*" = todas as turmas, ou o nome da turma) | regras (JSON) | atualizado
 *
 * Nada de nome completo, matrícula ou PIN sai da planilha para o site público:
 * a lista de nomes mostra só o primeiro nome e a inicial do sobrenome.
 */
const ABA_TURMAS = "Turmas";
const ABA_PROG = "Progresso";
const CAB_TURMAS = ["turma", "curso", "turno", "matricula", "nome", "pin", "ultimo acesso", "tentativas", "bloqueado ate", "aparelho"];
const CAB_PROG = ["material", "nome", "matricula", "curso", "turno", "turma", "feitas", "total", "pontos", "atualizado", "detalhe"];
const MAX_TENTATIVAS = 5, BLOQUEIO_MIN = 15;
// Painel do professor: defina a senha em Configurações do projeto > Propriedades do script > PROFESSOR_CHAVE.
// Sem essa propriedade o painel fica desligado.
const DIAS_ALERTA = 7;

function aba_(nome, cab) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(nome);
  if (!sh) {
    // Aceita a lista importada com outro nome de aba: procura uma aba cujo cabeçalho começa igual.
    sh = ss.getSheets().find(s => s.getLastRow() > 0 && String(s.getRange(1, 1).getValue()).trim().toLowerCase() === cab[0]
      && String(s.getRange(1, 2).getValue()).trim().toLowerCase() === cab[1]) || null;
    if (sh) { sh.setName(nome); return sh; }
  }
  if (!sh) {
    sh = ss.insertSheet(nome);
    sh.appendRow(cab);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, cab.length).setFontWeight("bold");
  }
  return sh;
}
const turmas_ = () => aba_(ABA_TURMAS, CAB_TURMAS);
const prog_ = () => aba_(ABA_PROG, CAB_PROG);
const ABA_JORN = "Jornadas";
const CAB_JORN = ["matricula", "nome", "turma", "visitas", "dias", "atualizado", "xp"];
const jorn_ = () => aba_(ABA_JORN, CAB_JORN);
const ABA_VIS = "Visibilidade";
const CAB_VIS = ["escopo", "regras", "atualizado"];
const vis_ = () => aba_(ABA_VIS, CAB_VIS);

// Regras de visibilidade: { "pasta": "o" | "v" | "aaaa-mm-dd", "pasta#n": ... } por escopo ("*" ou turma).
function lerVis_() {
  const m = {};
  vis_().getDataRange().getValues().slice(1).forEach(r => {
    const k = String(r[0] || "").trim(); if (!k) return;
    try { m[k] = JSON.parse(r[1] || "{}") || {}; } catch (e) { m[k] = {}; }
  });
  return m;
}
function limpaRegras_(o) {
  const out = {};
  Object.keys(o || {}).slice(0, 600).forEach(k => {
    const v = String(o[k]);
    if (/^[a-z0-9-]{1,60}(#\d{1,2})?$/.test(k) && (v === "o" || v === "v" || /^\d{4}-\d{2}-\d{2}$/.test(v))) out[k] = v;
  });
  return out;
}
function salvarVis_(d) {
  const erro = chaveErro_(d); if (erro) return { ok: false, erro: erro };
  const escopo = txt_(d.turma || "*", 60) || "*";
  const regras = limpaRegras_(d.regras);
  const sh = vis_(), v = sh.getDataRange().getValues();
  const linha = [escopo, JSON.stringify(regras), new Date()];
  let i = 1;
  for (; i < v.length; i++) if (String(v[i][0]).trim() === escopo) break;
  if (i < v.length) sh.getRange(i + 1, 1, 1, 3).setValues([linha]); else sh.appendRow(linha);
  CacheService.getScriptCache().remove("vis");
  return { ok: true, regras: lerVis_() };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
const txt_ = (v, n) => String(v == null ? "" : v).trim().replace(/\s+/g, " ").slice(0, n);
const chave_ = s => txt_(s, 80).toLowerCase();

// Identificador público do aluno: não revela a matrícula.
function idDe_(matricula) {
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, "portal-eber:" + String(matricula).trim());
  return b.slice(0, 6).map(x => ((x + 256) % 256).toString(16).padStart(2, "0")).join("");
}

// "Pedro Henrique Lima" -> "Pedro L."; se houver outro "Pedro L." na turma, usa mais partes do nome.
function nomesCurtos_(nomes) {
  const part = n => String(n).trim().split(/\s+/).filter(w => !/^(de|da|do|das|dos|e)$/i.test(w));
  const forma = (p, k) => k === 0 ? p[0] + (p.length > 1 ? " " + p[p.length - 1].charAt(0).toUpperCase() + "." : "")
    : p.slice(0, Math.min(k + 1, p.length - 1)).join(" ") + (p.length > 1 ? " " + p[p.length - 1].charAt(0).toUpperCase() + "." : "");
  const ps = nomes.map(part), nivel = nomes.map(() => 0);
  for (let volta = 0; volta < 4; volta++) {
    const out = ps.map((p, i) => forma(p, nivel[i]));
    let mudou = false;
    out.forEach((o, i) => { if (out.filter(x => x === o).length > 1 && nivel[i] < ps[i].length - 1) { nivel[i]++; mudou = true; } });
    if (!mudou) return out;
  }
  return ps.map((p, i) => forma(p, nivel[i]));
}

function lerTurmas_() {
  const v = turmas_().getDataRange().getValues();
  return v.slice(1).map((r, i) => ({ linha: i + 2, turma: txt_(r[0], 60), curso: txt_(r[1], 80), turno: txt_(r[2], 20),
    matricula: String(r[3]).trim(), nome: txt_(r[4], 100), pin: String(r[5] || ""), tentativas: Number(r[7]) || 0,
    bloqueio: r[8] ? new Date(r[8]) : null, acesso: r[6] ? new Date(r[6]) : null, aparelho: txt_(r[9], 40) })).filter(a => a.turma && a.nome && a.matricula);
}

function doGet(e) {
  const p = e.parameter || {};
  const acao = String(p.acao || "");
  if (acao === "turmas") {
    const m = {};
    lerTurmas_().forEach(a => { if (!m[a.turma]) m[a.turma] = { turma: a.turma, curso: a.curso, turno: a.turno, alunos: 0 }; m[a.turma].alunos++; });
    return json_({ ok: true, turmas: Object.keys(m).sort().map(k => m[k]) });
  }
  if (acao === "visibilidade") {
    // Público: só diz o que está oculto ou com data de liberação (nenhum dado de aluno).
    const cache = CacheService.getScriptCache();
    let m = null; try { m = JSON.parse(cache.get("vis") || "null"); } catch (err) {}
    if (!m) { m = lerVis_(); cache.put("vis", JSON.stringify(m), 120); }
    const t = String(p.turma || "");
    return json_({ ok: true, todas: m["*"] || {}, turma: t ? (m[t] || {}) : {} });
  }
  if (acao === "alunos") {
    const t = chave_(p.turma);
    const lista = lerTurmas_().filter(a => chave_(a.turma) === t).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const curtos = nomesCurtos_(lista.map(a => a.nome));
    return json_({ ok: true, alunos: lista.map((a, i) => ({ id: idDe_(a.matricula), nome: curtos[i], temPin: !!a.pin })) });
  }
  if (acao === "ranking") {
    // Top 10 da turma no Start nos Estudos: só o nome curto e os pontos.
    const t = chave_(p.turma);
    if (!t) return json_({ ok: true, lista: [] });
    const cache = CacheService.getScriptCache(), ck = "rk:" + t;
    let lista = null; try { lista = JSON.parse(cache.get(ck) || "null"); } catch (err) {}
    if (!lista) {
      const pts = {};
      prog_().getDataRange().getValues().slice(1).forEach(r => { const m = String(r[2]).trim(); pts[m] = (pts[m] || 0) + (Number(r[8]) || 0); });
      const jv = jorn_().getDataRange().getValues().slice(1).filter(r => chave_(r[2]) === t);
      const alunos = lerTurmas_().filter(a => chave_(a.turma) === t);
      const curtos = nomesCurtos_(alunos.map(a => a.nome)), ap = {};
      alunos.forEach((a, i) => { ap[a.matricula] = curtos[i]; });
      lista = jv.map(r => {
        const m = String(r[0]).trim(), rel = Number(r[6]) || 0;
        const est = (pts[m] || 0) + 10 * String(r[3] || "").split(" ").filter(Boolean).length + 5 * String(r[4] || "").split(" ").filter(Boolean).length;
        return { apelido: ap[m] || "", xp: rel > 0 ? rel : est };
      }).filter(x => x.apelido && x.xp > 0).sort((x, y) => y.xp - x.xp).slice(0, 10);
      cache.put(ck, JSON.stringify(lista), 60);
    }
    return json_({ ok: true, lista: lista });
  }
  // Ranking de um material numa turma
  const material = String(p.disciplina || "");
  const turma = chave_(p.turma);
  const linhas = prog_().getDataRange().getValues().slice(1).filter(r => r[0] === material && (!turma || chave_(r[5]) === turma));
  const curtos = nomesCurtos_(linhas.map(r => r[1]));
  const lista = linhas.map((r, i) => ({ turma: r[5], apelido: curtos[i], pontos: r[8], feitas: r[6], total: r[7] }))
    .sort((a, b) => b.pontos - a.pontos).slice(0, 200);
  return json_({ ok: true, lista: lista });
}

// Confere turma + id + PIN. No primeiro acesso (sem PIN na planilha), grava o PIN novo.
function autenticar_(d, sh) {
  const t = chave_(d.turma), id = String(d.id || "");
  const a = lerTurmas_().find(x => chave_(x.turma) === t && idDe_(x.matricula) === id);
  if (!a) return { erro: "Aluno não encontrado nesta turma. Fale com o professor." };
  const agora = new Date();
  if (a.bloqueio && a.bloqueio > agora) {
    const min = Math.ceil((a.bloqueio - agora) / 60000);
    return { erro: "Muitas tentativas erradas. Tente de novo em " + min + " minuto(s)." };
  }
  const pin = txt_(d.pin, 4);
  if (!/^\d{4}$/.test(pin)) return { erro: "O PIN precisa ter 4 números." };
  if (!a.pin) {
    if (!d.criarPin) return { erro: "Você ainda não tem PIN. Volte e crie o seu." };
    sh.getRange(a.linha, 6, 1, 4).setValues([["p" + pin, agora, 0, ""]]);
    sh.getRange(a.linha, 10).setValue(aparelho_(d));
    return { aluno: a, novo: true };
  }
  if (a.pin !== "p" + pin) {
    const n = a.tentativas + 1;
    sh.getRange(a.linha, 8, 1, 2).setValues([[n >= MAX_TENTATIVAS ? 0 : n, n >= MAX_TENTATIVAS ? new Date(agora.getTime() + BLOQUEIO_MIN * 60000) : ""]]);
    return { erro: n >= MAX_TENTATIVAS ? "PIN errado. Por segurança, espere " + BLOQUEIO_MIN + " minutos para tentar de novo." : "PIN errado. Confira e tente de novo." };
  }
  sh.getRange(a.linha, 7, 1, 3).setValues([[agora, 0, ""]]);
  sh.getRange(a.linha, 10).setValue(aparelho_(d));
  return { aluno: a };
}

// Jornadas: junta as páginas visitadas e os dias de estudo de todos os aparelhos do aluno
// e devolve o progresso dele em cada material (para a página jornadas.html).
const lista_ = (v, re, max) => (Array.isArray(v) ? v : []).map(x => String(x)).filter(x => re.test(x)).slice(0, max);
function jornada_(a, d, perfil) {
  const sh = jorn_();
  const v = sh.getDataRange().getValues();
  let linha = 0, vis = [], dias = [];
  for (let i = 1; i < v.length; i++) {
    if (String(v[i][0]).trim() === a.matricula) {
      linha = i + 1;
      vis = String(v[i][3] || "").split(" ").filter(Boolean);
      dias = String(v[i][4] || "").split(" ").filter(Boolean);
      break;
    }
  }
  const uv = Array.from(new Set(vis.concat(lista_(d.visitas, /^[a-z0-9]{1,8}$/, 500)))).slice(0, 500);
  const ud = Array.from(new Set(dias.concat(lista_(d.dias, /^\d{4}-\d{2}-\d{2}$/, 400)))).sort().slice(-366);
  // Pontos do Start nos Estudos, calculados no aparelho do aluno (se não vierem, mantém o que já estava).
  const xpAnt = linha ? Number(v[linha - 1][6]) || 0 : 0;
  const xp = d.xp != null && isFinite(Number(d.xp)) ? Math.max(0, Math.min(200000, Math.floor(Number(d.xp)))) : xpAnt;
  const row = [a.matricula, a.nome, a.turma, uv.join(" "), ud.join(" "), new Date(), xp];
  if (linha) sh.getRange(linha, 1, 1, 7).setValues([row]); else sh.appendRow(row);
  const materiais = prog_().getDataRange().getValues().slice(1).filter(r => String(r[2]).trim() === a.matricula)
    .map(r => ({ m: String(r[0]), f: Number(r[6]) || 0, t: Number(r[7]) || 0, p: Number(r[8]) || 0, em: r[9] ? new Date(r[9]).getTime() : 0 }));
  return { ok: true, perfil: perfil, jornada: { visitas: uv, dias: ud, materiais: materiais } };
}

// Aparelho em linhas gerais ("Android · Chrome"). Só o tipo de aparelho e o navegador, nada que identifique a pessoa.
const aparelho_ = d => txt_(d.aparelho, 40);

// Painel do professor: resumo por aluno. Exige a senha guardada em PROFESSOR_CHAVE.
function chaveErro_(d) {
  const chave = PropertiesService.getScriptProperties().getProperty("PROFESSOR_CHAVE");
  if (!chave) return "O painel ainda não foi ativado. Defina PROFESSOR_CHAVE no Apps Script.";
  const cache = CacheService.getScriptCache();
  const falhas = Number(cache.get("painel-falhas") || 0);
  if (falhas >= 5) return "Muitas tentativas. Espere 15 minutos.";
  if (String(d.chave || "") !== chave) { cache.put("painel-falhas", String(falhas + 1), 900); return "Senha incorreta."; }
  cache.remove("painel-falhas");
  return "";
}
function painel_(d) {
  const erro = chaveErro_(d); if (erro) return { ok: false, erro: erro };
  const alunos = lerTurmas_();
  const prog = prog_().getDataRange().getValues().slice(1);
  const agora = new Date();
  const porMat = {};
  prog.forEach(r => { (porMat[String(r[2]).trim()] = porMat[String(r[2]).trim()] || []).push({ material: r[0], feitas: Number(r[6]) || 0, total: Number(r[7]) || 0, pontos: Number(r[8]) || 0, em: r[9] ? new Date(r[9]).getTime() : 0 }); });
  const lista = alunos.map(a => {
    const ms = porMat[a.matricula] || [];
    const ultimoEnvio = ms.reduce((m, x) => Math.max(m, x.em), 0);
    const acesso = Math.max(a.acesso ? a.acesso.getTime() : 0, ultimoEnvio);
    return { turma: a.turma, curso: a.curso, turno: a.turno, nome: a.nome, matricula: a.matricula, aparelho: a.aparelho,
      acesso: acesso || null, dias: acesso ? Math.floor((agora.getTime() - acesso) / 86400000) : null,
      feitas: ms.reduce((s, x) => s + x.feitas, 0), total: ms.reduce((s, x) => s + x.total, 0), pontos: ms.reduce((s, x) => s + x.pontos, 0),
      materiais: ms.map(x => ({ material: x.material, feitas: x.feitas, total: x.total, pontos: x.pontos, em: x.em })), semPin: !a.pin };
  });
  return { ok: true, agora: agora.getTime(), diasAlerta: DIAS_ALERTA, alunos: lista, visibilidade: lerVis_() };
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.acao === "painel") return json_(painel_(d));
    if (d.acao === "visibilidade") return json_(salvarVis_(d));
    const sh = turmas_();
    const r = autenticar_(d, sh);
    if (r.erro) return json_({ ok: false, erro: r.erro });
    const a = r.aluno;
    const curto = nomesCurtos_([a.nome])[0];
    const perfil = { id: idDe_(a.matricula), nome: a.nome, apelido: curto, curso: a.curso, turno: a.turno, turma: a.turma };

    if (d.acao === "jornada") return json_(jornada_(a, d, perfil));
    const material = txt_(d.disciplina, 40);
    if (d.acao === "entrar" || !material || material === "portal") return json_({ ok: true, perfil: perfil, novo: !!r.novo });

    const feitas = Math.max(0, Number(d.feitas) || 0), total = Math.max(0, Number(d.total) || 0);
    const pontos = Math.max(0, Math.min(100000, Number(d.pontos) || 0));
    const detalhe = JSON.stringify(d.detalhe || {}).slice(0, 2000);
    const sp = prog_();
    const lp = sp.getDataRange().getValues();
    const linha = [a.nome, a.matricula, a.curso, a.turno, a.turma, feitas, total, pontos, new Date(), detalhe];
    for (let i = 1; i < lp.length; i++) {
      if (lp[i][0] === material && String(lp[i][2]).trim() === a.matricula) {
        sp.getRange(i + 1, 2, 1, 10).setValues([linha]);
        return json_({ ok: true, perfil: perfil });
      }
    }
    sp.appendRow([material].concat(linha));
    return json_({ ok: true, perfil: perfil });
  } catch (err) {
    return json_({ ok: false, erro: "Erro no servidor do portal." });
  } finally {
    lock.releaseLock();
  }
}
