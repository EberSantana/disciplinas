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
 *
 * Nada de nome completo, matrícula ou PIN sai da planilha para o site público:
 * a lista de nomes mostra só o primeiro nome e a inicial do sobrenome.
 */
const ABA_TURMAS = "Turmas";
const ABA_PROG = "Progresso";
const CAB_TURMAS = ["turma", "curso", "turno", "matricula", "nome", "pin", "ultimo acesso", "tentativas", "bloqueado ate"];
const CAB_PROG = ["material", "nome", "matricula", "curso", "turno", "turma", "feitas", "total", "pontos", "atualizado", "detalhe"];
const MAX_TENTATIVAS = 5, BLOQUEIO_MIN = 15;

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
    bloqueio: r[8] ? new Date(r[8]) : null })).filter(a => a.turma && a.nome && a.matricula);
}

function doGet(e) {
  const p = e.parameter || {};
  const acao = String(p.acao || "");
  if (acao === "turmas") {
    const m = {};
    lerTurmas_().forEach(a => { if (!m[a.turma]) m[a.turma] = { turma: a.turma, curso: a.curso, turno: a.turno, alunos: 0 }; m[a.turma].alunos++; });
    return json_({ ok: true, turmas: Object.keys(m).sort().map(k => m[k]) });
  }
  if (acao === "alunos") {
    const t = chave_(p.turma);
    const lista = lerTurmas_().filter(a => chave_(a.turma) === t).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const curtos = nomesCurtos_(lista.map(a => a.nome));
    return json_({ ok: true, alunos: lista.map((a, i) => ({ id: idDe_(a.matricula), nome: curtos[i], temPin: !!a.pin })) });
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
    return { aluno: a, novo: true };
  }
  if (a.pin !== "p" + pin) {
    const n = a.tentativas + 1;
    sh.getRange(a.linha, 8, 1, 2).setValues([[n >= MAX_TENTATIVAS ? 0 : n, n >= MAX_TENTATIVAS ? new Date(agora.getTime() + BLOQUEIO_MIN * 60000) : ""]]);
    return { erro: n >= MAX_TENTATIVAS ? "PIN errado. Por segurança, espere " + BLOQUEIO_MIN + " minutos para tentar de novo." : "PIN errado. Confira e tente de novo." };
  }
  sh.getRange(a.linha, 7, 1, 3).setValues([[agora, 0, ""]]);
  return { aluno: a };
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const sh = turmas_();
    const r = autenticar_(d, sh);
    if (r.erro) return json_({ ok: false, erro: r.erro });
    const a = r.aluno;
    const curto = nomesCurtos_([a.nome])[0];
    const perfil = { id: idDe_(a.matricula), nome: a.nome, apelido: curto, curso: a.curso, turno: a.turno, turma: a.turma };

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
