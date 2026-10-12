/**
 * Portal das disciplinas — Prof. Eber Santana
 * Guarda o login e o progresso de cada aluno.
 * Cole este código em Extensões > Apps Script da planilha e implante como "App da Web".
 *
 * Aba "Alunos":     um aluno por linha (nome, e-mail, curso, turno, turma, data do cadastro e do último acesso).
 * Aba "Progresso":  uma linha por aluno e por material (feitas, total, pontos, última atualização).
 */
const ABA_ALUNOS = "Alunos";
const ABA_PROG = "Progresso";

function aba_(nome, cab) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(nome);
  if (!sh) {
    sh = ss.insertSheet(nome);
    sh.appendRow(cab);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, cab.length).setFontWeight("bold");
  }
  return sh;
}
const alunos_ = () => aba_(ABA_ALUNOS, ["nome", "email", "curso", "turno", "turma", "pin", "cadastro", "ultimo acesso"]);
const prog_ = () => aba_(ABA_PROG, ["material", "nome", "email", "curso", "turno", "turma", "feitas", "total", "pontos", "atualizado", "detalhe"]);

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
const txt_ = (v, n) => String(v == null ? "" : v).trim().replace(/\s+/g, " ").slice(0, n);

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const material = txt_(d.disciplina, 40);
    const nome = txt_(d.nome || d.apelido, 80);
    const email = txt_(d.email, 80).toLowerCase();
    const curso = txt_(d.curso, 60);
    const turno = txt_(d.turno, 20);
    const turma = txt_(d.turma, 30);
    const pin = txt_(d.pin, 4);
    if (!material || !nome || !turma || !/^\d{4}$/.test(pin)) return json_({ ok: false, erro: "Dados incompletos." });

    // Identificação: pelo e-mail; materiais antigos que mandam só apelido usam apelido + turma.
    const chave = email || ("apelido:" + nome.toLowerCase() + "|" + turma.toLowerCase());
    const agora = new Date();

    // 1) Cadastro do aluno e conferência do PIN
    const sa = alunos_();
    const la = sa.getDataRange().getValues();
    let achou = false;
    for (let i = 1; i < la.length; i++) {
      const r = la[i];
      const k = r[1] ? String(r[1]).toLowerCase() : "apelido:" + String(r[0]).toLowerCase() + "|" + String(r[4]).toLowerCase();
      if (k === chave) {
        if (String(r[5]) !== "p" + pin) return json_({ ok: false, erro: "Este e-mail já está cadastrado com outro PIN. Use o PIN que você criou no primeiro acesso." });
        sa.getRange(i + 1, 1, 1, 8).setValues([[nome, email, curso || r[2], turno || r[3], turma, "p" + pin, r[6], agora]]);
        achou = true;
        break;
      }
    }
    if (!achou) sa.appendRow([nome, email, curso, turno, turma, "p" + pin, agora, agora]);
    if (material === "portal") return json_({ ok: true });

    // 2) Progresso no material
    const feitas = Math.max(0, Number(d.feitas) || 0), total = Math.max(0, Number(d.total) || 0);
    const pontos = Math.max(0, Math.min(100000, Number(d.pontos) || 0));
    const detalhe = JSON.stringify(d.detalhe || {}).slice(0, 2000);
    const sp = prog_();
    const lp = sp.getDataRange().getValues();
    for (let i = 1; i < lp.length; i++) {
      const r = lp[i];
      const k = r[2] ? String(r[2]).toLowerCase() : "apelido:" + String(r[1]).toLowerCase() + "|" + String(r[5]).toLowerCase();
      if (r[0] === material && k === chave) {
        sp.getRange(i + 1, 2, 1, 10).setValues([[nome, email, curso || r[3], turno || r[4], turma, feitas, total, pontos, agora, detalhe]]);
        return json_({ ok: true });
      }
    }
    sp.appendRow([material, nome, email, curso, turno, turma, feitas, total, pontos, agora, detalhe]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, erro: "Erro no servidor do portal." });
  } finally {
    lock.releaseLock();
  }
}

// Ranking: mostra só o primeiro nome e a inicial do sobrenome. E-mail e nome completo ficam apenas na planilha.
function doGet(e) {
  const material = String(e.parameter.disciplina || "");
  const turma = String(e.parameter.turma || "").toLowerCase();
  const curto = n => { const w = String(n).trim().split(/\s+/); return w.length > 1 ? w[0] + " " + w[w.length - 1].charAt(0).toUpperCase() + "." : w[0]; };
  const lista = prog_().getDataRange().getValues().slice(1)
    .filter(r => r[0] === material && (!turma || String(r[5]).toLowerCase() === turma))
    .map(r => ({ turma: r[5], apelido: curto(r[1]), pontos: r[8], feitas: r[6], total: r[7] }))
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, 200);
  return json_({ ok: true, lista: lista });
}
