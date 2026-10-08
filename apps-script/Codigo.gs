/**
 * Ranking das disciplinas — Prof. Eber Santana
 * Cole este código em Extensões > Apps Script da planilha e implante como "App da Web".
 * Os pontos ficam na aba "Pontuacoes" desta planilha.
 */
const ABA = "Pontuacoes";

function aba_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA);
    sh.appendRow(["disciplina", "turma", "apelido", "pin", "pontos", "feitas", "total", "atualizado", "detalhe por módulo"]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const disc = String(d.disciplina || "").trim().slice(0, 40);
    const turma = String(d.turma || "").trim().slice(0, 30);
    const apelido = String(d.apelido || "").trim().slice(0, 30);
    const pin = String(d.pin || "").trim();
    if (!disc || !turma || !apelido || !/^\d{4}$/.test(pin)) return json_({ ok: false, erro: "Dados incompletos." });
    const pontos = Math.max(0, Math.min(100000, Number(d.pontos) || 0));
    const feitas = Number(d.feitas) || 0, total = Number(d.total) || 0;
    const detalhe = JSON.stringify(d.detalhe || {}).slice(0, 2000);
    const sh = aba_();
    const linhas = sh.getDataRange().getValues();
    for (let i = 1; i < linhas.length; i++) {
      const r = linhas[i];
      if (r[0] === disc && String(r[1]).toLowerCase() === turma.toLowerCase() && String(r[2]).toLowerCase() === apelido.toLowerCase()) {
        if (String(r[3]) !== "p" + pin) return json_({ ok: false, erro: "Esse apelido já existe nesta turma com outro PIN. Escolha outro apelido." });
        sh.getRange(i + 1, 5, 1, 5).setValues([[pontos, feitas, total, new Date(), detalhe]]);
        return json_({ ok: true });
      }
    }
    sh.appendRow([disc, turma, apelido, "p" + pin, pontos, feitas, total, new Date(), detalhe]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, erro: "Erro no servidor do ranking." });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const disc = String(e.parameter.disciplina || "");
  const turma = String(e.parameter.turma || "").toLowerCase();
  const lista = aba_().getDataRange().getValues().slice(1)
    .filter(r => r[0] === disc && (!turma || String(r[1]).toLowerCase() === turma))
    .map(r => ({ turma: r[1], apelido: r[2], pontos: r[4], feitas: r[5], total: r[6] }))
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, 200);
  return json_({ ok: true, lista: lista });
}
