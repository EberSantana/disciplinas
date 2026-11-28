const KEY = "estudo:" + COURSE.id;
let S = {};
try { S = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch(e) { S = {}; }
const RANK_URL = (window.RANKING_URL || "").trim();
const PKEY = "perfil:aluno";
let PERFIL = null;
try { PERFIL = JSON.parse(localStorage.getItem(PKEY) || "null"); } catch(e) { PERFIL = null; }
if (!(PERFIL && PERFIL.id && PERFIL.pin)) PERFIL = null;
let autoT = null;
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} if (RANK_URL && PERFIL) { clearTimeout(autoT); autoT = setTimeout(() => enviarPontos(true), 15000); } }
function st(mid){ return S[mid] || (S[mid] = {cad:{}, fc:{}, vf:{}, vfj:{}, pbl:{}}); }

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = s => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
const h = (tag, attrs={}, html="") => { const e = document.createElement(tag); for (const k in attrs) { if (k === "class") e.className = attrs[k]; else if (k.startsWith("on")) e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); } if (html) e.innerHTML = html; return e; };

const TABS = [
  {id:"resumo", label:"Resumo"},
  {id:"lab", label:"Laboratório visual"},
  {id:"caderno", label:"Caderno"},
  {id:"flash", label:"Flashcards"},
  {id:"vf", label:"V ou F"},
  {id:"pbl", label:"PBL"},
];

function modTotals(m){
  const s = st(m.id);
  const cad = Object.entries(s.cad).filter(([k, v]) => /^\d+$/.test(k) && v).length;
  const fc = Object.keys(s.fc).length;
  const vf = Object.keys(s.vf).length;
  const pbl = Object.values(s.pbl).filter(v => v === "sol").length;
  const total = m.caderno.length + m.flash.length + m.vf.length + m.pbl.length;
  const done = cad + fc + vf + pbl;
  return {cad, fc, vf, pbl, total, done};
}
/* Pontuação: caderno 10/6/2 · flashcard 3/1 · V ou F 10 (acerto) ou 2 (tentativa) · PBL 20 */
const PONTOS = {cad:{ok:10, mid:6, no:2}, fc:{k:3, r:1}, vfOk:10, vfErr:2, pbl:20};
function modPoints(m){
  const s = st(m.id); let p = 0;
  Object.entries(s.cad).forEach(([k, v]) => { if (/^\d+$/.test(k)) p += PONTOS.cad[v] || 0; });
  Object.values(s.fc).forEach(v => p += PONTOS.fc[v] || 0);
  Object.entries(s.vf).forEach(([i, v]) => p += (m.vf[i] && v === m.vf[i].v) ? PONTOS.vfOk : PONTOS.vfErr);
  Object.values(s.pbl).forEach(v => { if (v === "sol") p += PONTOS.pbl; });
  return p;
}
function modMax(m){ return m.caderno.length * 10 + m.flash.length * 3 + m.vf.length * 10 + m.pbl.length * 20; }
function totalPoints(){ return COURSE.modulos.reduce((a, m) => a + modPoints(m), 0); }
function portState(done, total){ return done === 0 ? "" : (done >= total ? "on" : "half"); }

function renderNav(cur){
  const nav = document.getElementById("nav"); nav.innerHTML = "";
  let T = 0, D = 0;
  const home = h("li"); const hb = h("button", {"aria-current": String(cur === "home"), onclick: () => go("home")},
    `<span class="num">≡</span><span><span class="t">Visão geral</span></span>`);
  home.append(hb); nav.append(home);
  const rk = h("li"); rk.append(h("button", {"aria-current": String(cur === "ranking"), onclick: () => go("ranking")}, `<span class="num">★</span><span><span class="t">Pontuação e ranking</span></span>`)); nav.append(rk);
  COURSE.modulos.forEach((m, i) => {
    const t = modTotals(m); T += t.total; D += t.done;
    const li = h("li");
    const ports = [["cad", m.caderno.length], ["fc", m.flash.length], ["vf", m.vf.length], ["pbl", m.pbl.length]]
      .map(([k, n]) => `<span class="${portState(t[k], n)}" title="${k}"></span>`).join("");
    const b = h("button", {"aria-current": String(cur === m.id), onclick: () => go(m.id)},
      `<span class="num">${String(i+1).padStart(2,"0")}</span><span><span class="t">${esc(m.titulo)}</span><span class="ports" aria-label="${t.done} de ${t.total} feitas">${ports}</span></span>`);
    li.append(b); nav.append(li);
  });
  const pct = T ? Math.round(D / T * 100) : 0;
  document.getElementById("g-pct").textContent = pct + "%";
  document.getElementById("g-bar").style.width = pct + "%";
  document.getElementById("g-detail").textContent = `${D} de ${T} atividades`;
  document.getElementById("g-pts").textContent = `${totalPoints()} pts`;
}

let curMod = "home", curTab = "resumo";
function go(mid, tab){
  curMod = mid; curTab = tab || "resumo";
  try { history.replaceState(null, "", "#" + mid); } catch(e) {}
  render(); window.scrollTo({top:0});
}
function render(){
  renderNav(curMod);
  const v = document.getElementById("view"); v.innerHTML = "";
  if (curMod === "home") return renderHome(v);
  if (curMod === "ranking") return renderRanking(v);
  const m = COURSE.modulos.find(x => x.id === curMod); if (!m) return renderHome(v);
  const idx = COURSE.modulos.indexOf(m);
  v.append(h("div", {class:"mhead"}, `<span class="eyebrow">Módulo ${String(idx+1).padStart(2,"0")} · ${esc(m.subtitulo)}</span><h2>${esc(m.titulo)}</h2><p>${fmt(m.objetivo)}</p>`));
  const t = modTotals(m);
  const counts = {lab: (m.lab || []).length, resumo: m.resumo.length, caderno: `${t.cad}/${m.caderno.length}`, flash: `${t.fc}/${m.flash.length}`, vf: `${t.vf}/${m.vf.length}`, pbl: `${t.pbl}/${m.pbl.length}`};
  const tabs = h("div", {class:"tabs", role:"tablist"});
  TABS.forEach(tb => {
    tabs.append(h("button", {role:"tab", id:"tab-"+tb.id, "aria-selected": String(curTab === tb.id), onclick: () => { curTab = tb.id; render(); }},
      `${tb.label}${tb.id === "resumo" || (tb.id === "lab" && !(m.lab || []).length) ? "" : ` <span class="count">${counts[tb.id]}</span>`}`));
  });
  v.append(tabs);
  const body = h("div", {class:"stack", role:"tabpanel"}); v.append(body);
  ({lab: renderLab, resumo: renderResumo, caderno: renderCaderno, flash: renderFlash, vf: renderVF, pbl: renderPBL})[curTab](body, m);
  const nav = h("div", {class:"btnrow"});
  const prev = COURSE.modulos[idx-1], next = COURSE.modulos[idx+1];
  if (prev) nav.append(h("button", {class:"btn", onclick: () => go(prev.id)}, `← ${esc(prev.titulo)}`));
  if (next) nav.append(h("button", {class:"btn", onclick: () => go(next.id)}, `${esc(next.titulo)} →`));
  const reset = h("button", {class:"btn small", style:"margin-left:auto", onclick: () => {
    reset.hidden = true;
    const c = h("span", {class:"confirm"}, "Apagar o progresso deste módulo?");
    c.append(h("button", {class:"btn small", onclick: () => { delete S[m.id]; save(); render(); }}, "Apagar"),
             h("button", {class:"btn small", onclick: () => { c.remove(); reset.hidden = false; }}, "Cancelar"));
    nav.append(c);
  }}, "Recomeçar módulo");
  nav.append(reset);
  v.append(nav);
}

async function enviarPontos(silencioso){
  if (!RANK_URL || !PERFIL) return {ok:false, erro:"sem configuração"};
  const detalhe = {}; let feitas = 0, total = 0;
  COURSE.modulos.forEach(m => { const t = modTotals(m); detalhe[m.id] = modPoints(m); feitas += t.done; total += t.total; });
  const corpo = {acao:"salvar", disciplina: COURSE.id, turma: PERFIL.turma, id: PERFIL.id, apelido: PERFIL.apelido, nome: PERFIL.nome, curso: PERFIL.curso, turno: PERFIL.turno, pin: PERFIL.pin, pontos: totalPoints(), feitas, total, detalhe};
  try {
    const r = await fetch(RANK_URL, {method:"POST", body: JSON.stringify(corpo)});
    const j = await r.json();
    return j;
  } catch(e) { return {ok:false, erro:"Sem conexão com o ranking. Verifique a internet."}; }
}
async function buscarRanking(){
  const u = RANK_URL + (RANK_URL.includes("?") ? "&" : "?") + "disciplina=" + encodeURIComponent(COURSE.id) + "&turma=" + encodeURIComponent(PERFIL ? PERFIL.turma : "");
  const r = await fetch(u); return r.json();
}
function renderRanking(v){
  v.append(h("div", {class:"mhead"}, `<span class="eyebrow">Gamificação</span><h2>Pontuação e ranking</h2><p>Cada atividade feita vale pontos. Envie sua pontuação para aparecer no ranking da sua turma.</p>`));
  const tb = h("div", {class:"panel"});
  let rows = COURSE.modulos.map((m, i) => `<tr><td>${String(i+1).padStart(2,"0")} · ${esc(m.titulo)}</td><td class="num">${modPoints(m)}</td><td class="num muted">${modMax(m)}</td></tr>`).join("");
  tb.innerHTML = `<h3 style="font-size:22px;margin-bottom:10px">Seus pontos: ${totalPoints()}</h3><div class="tablewrap"><table class="rub"><thead><tr><th>Módulo</th><th>Pontos</th><th>Máximo</th></tr></thead><tbody>${rows}</tbody></table></div>
  <p class="muted" style="margin:10px 0 0;font-size:14px">Caderno: acertei 10, em parte 6, revisar 2 · Flashcard: sabia 3, revisar 1 · V ou F: acerto 10, erro 2 · PBL: 20 por problema resolvido.</p>`;
  v.append(tb);
  const box = h("div", {class:"panel stack"}); v.append(box);
  if (!RANK_URL) { box.innerHTML = `<h3 style="font-size:22px">Ranking da turma</h3><p style="margin:0">O ranking funciona na versão publicada pelo professor no GitHub, ligada à planilha da turma. Aqui seus pontos continuam sendo contados neste aparelho.</p>`; return; }
  if (!PERFIL) {
    box.innerHTML = `<h3 style="font-size:22px">Entre no ranking</h3><p class="muted" style="margin:0">Para aparecer no ranking da turma, entre no portal: escolha a sua turma, toque no seu nome e digite o seu PIN.</p><div class="btnrow"><a class="btn primary" href="../">Entrar no portal</a></div>`;
    return;
  }
  box.innerHTML = `<div class="btnrow"><h3 style="font-size:22px;margin-right:auto">Ranking · ${esc(PERFIL.turma)}</h3><button class="btn primary" id="rk-send">Enviar minha pontuação</button><button class="btn small" id="rk-out">Trocar de aluno</button></div><p class="muted" style="margin:0">Você é <strong>${esc(PERFIL.apelido)}</strong>. Sua pontuação também é enviada sozinha alguns segundos depois de cada atividade.</p><div id="rk-msg" class="hint" hidden></div><div id="rk-list" class="tablewrap"><p class="muted">Carregando ranking…</p></div>`;
  const msg = box.querySelector("#rk-msg"), list = box.querySelector("#rk-list");
  const show = (t, bad) => { msg.hidden = false; msg.innerHTML = `<b>${bad ? "Atenção" : "Pronto"}</b><span>${esc(t)}</span>`; };
  const carregar = async () => {
    try { const j = await buscarRanking(); const L = (j && j.lista) || [];
      if (!L.length) { list.innerHTML = `<p class="muted">Ninguém da turma enviou pontos ainda. Seja o primeiro!</p>`; return; }
      list.innerHTML = `<table class="rub rank"><thead><tr><th>#</th><th>Aluno</th><th>Pontos</th><th>Atividades</th></tr></thead><tbody>${L.map((r, i) => `<tr class="${String(r.apelido).toLowerCase() === PERFIL.apelido.toLowerCase() ? "me" : ""}"><td><span class="pos p${i < 3 ? i + 1 : 0}">${i + 1}º</span></td><td>${esc(r.apelido)}</td><td class="num"><strong>${Number(r.pontos) || 0}</strong></td><td class="num muted">${Number(r.feitas) || 0}/${Number(r.total) || 0}</td></tr>`).join("")}</tbody></table>`;
    } catch(e) { list.innerHTML = `<p class="muted">Não foi possível carregar o ranking. Verifique a internet.</p>`; }
  };
  box.querySelector("#rk-send").addEventListener("click", async () => { show("Enviando…"); const j = await enviarPontos(); if (j && j.ok) { show("Pontuação enviada: " + totalPoints() + " pts."); carregar(); } else show((j && j.erro) || "Não foi possível enviar.", true); });
  box.querySelector("#rk-out").addEventListener("click", () => { PERFIL = null; try { localStorage.removeItem(PKEY); } catch(e) {} render(); });
  enviarPontos(true).then(carregar);
}

function renderHome(v){
  v.append(h("div", {class:"mhead"}, `<span class="eyebrow">${esc(COURSE.curso)}</span><h2>${esc(COURSE.titulo)}</h2><p>${fmt(COURSE.apresentacao)}</p>`));
  v.append(h("div", {class:"hint"}, `<b>Como estudar</b><span>${fmt(COURSE.comoEstudar)}</span>`));
  const g = h("div", {class:"mapgrid"});
  COURSE.modulos.forEach((m, i) => {
    const t = modTotals(m);
    g.append(h("button", {onclick: () => go(m.id)}, `<span class="k">${String(i+1).padStart(2,"0")}</span><span class="l">${esc(m.titulo)}</span><span class="d">${esc(m.subtitulo)}</span><span class="d mono">${t.done}/${t.total} feitas</span>`));
  });
  v.append(g);
  const kinds = h("div", {class:"resumo"});
  [["Laboratório visual", "Imagens animadas e interativas: linha do tempo, camadas, simuladores e desafios. Explore antes de responder."],
   ["Caderno", "Perguntas abertas. Responda à mão no caderno e só depois abra o gabarito. Marque se acertou, acertou em parte ou precisa revisar."],
   ["Flashcards", "Leia a frente, diga a resposta em voz alta e vire o cartão. Separe o que você já sabe do que precisa revisar."],
   ["Verdadeiro ou falso", "Escolha V ou F e escreva a justificativa. Nas falsas, a justificativa precisa corrigir a afirmação."],
   ["PBL", "Um problema real para resolver em equipe. Siga as etapas, produza os entregáveis e só então compare com a proposta de solução."]]
    .forEach(([a, b]) => kinds.append(h("div", {class:"item"}, `<h3>${a}</h3><p>${b}</p>`)));
  v.append(kinds);
  if (COURSE.referencias) v.append(h("div", {class:"panel"}, `<h3 style="font-size:20px;margin-bottom:8px">Referências</h3><ul style="margin:0;padding-left:1.2em;color:var(--ink-2);font-size:15px">${COURSE.referencias.map(r => `<li>${fmt(r)}</li>`).join("")}</ul>`));
}

function renderResumo(body, m){
  if (m.historia) body.append(h("div", {class:"story"}, `<b>${esc(m.historiaTitulo || "Na história")}</b>${fmt(m.historia)}`));
  const g = h("div", {class:"resumo"});
  m.resumo.forEach(r => g.append(h("div", {class:"item"}, `<h3>${fmt(r[0])}</h3><p>${fmt(r[1])}</p>`)));
  body.append(g);
  const r = h("div", {class:"btnrow"});
  if ((m.lab || []).length) r.append(h("button", {class:"btn primary", onclick: () => { curTab = "lab"; render(); }}, "Abrir o laboratório visual →"));
  r.append(h("button", {class:"btn" + ((m.lab || []).length ? "" : " primary"), onclick: () => { curTab = "caderno"; render(); }}, "Começar pelo caderno →"));
  body.append(r);
}

function renderLab(body, m){
  body.append(h("div", {class:"hint"}, `<b>Laboratório</b><span>Interaja com as imagens antes de responder às atividades. Depois, registre no caderno o que você observou.</span>`));
  (m.lab || []).forEach(k => { try { LAB[k](body); } catch(e) { body.append(h("div", {class:"panel"}, "Não foi possível carregar esta interação.")); console.error(e); } });
}

function renderCaderno(body, m){
  const s = st(m.id);
  body.append(h("div", {class:"hint"}, `<b>Caderno</b><span>Copie o número da questão e responda no caderno. Só abra o gabarito depois de escrever sua resposta.</span>`));
  m.caderno.forEach((q, i) => {
    const card = h("div", {class:"q" + (s.cad[i] ? " done" : "")});
    card.append(h("div", {class:"top"}, `<span class="n">C${String(i+1).padStart(2,"0")}</span><div><div class="type">${esc(q.t || "Discursiva")}</div><div class="text">${fmt(q.q)}</div></div>`));
    const slot = h("div", {class:"stack"}); card.append(slot);
    const showAns = () => {
      slot.innerHTML = "";
      slot.append(h("div", {class:"answer"}, `<span class="lbl">Resposta esperada</span>${fmt(q.a)}`));
      const self = h("div", {class:"self"}, "Como foi?");
      [["ok","Acertei"],["mid","Em parte"],["no","Revisar"]].forEach(([k, l]) => {
        self.append(h("button", {class:k, "aria-pressed": String(s.cad[i] === k), onclick: () => { s.cad[i] = k; save(); render(); }}, l));
      });
      slot.append(self);
    };
    if (s.cad[i] || s.cad["o"+i]) showAns();
    else { const r = h("div", {class:"btnrow"}); r.append(h("button", {class:"btn", onclick: () => { s.cad["o"+i] = 1; save(); showAns(); }}, "Já respondi no caderno · ver gabarito")); slot.append(r); }
    body.append(card);
  });
}

let fcIdx = {}, fcFlip = false, fcOnlyReview = false;
function renderFlash(body, m){
  const s = st(m.id);
  let order = m.flash.map((_, i) => i);
  if (fcOnlyReview) { const r = order.filter(i => s.fc[i] === "r"); if (r.length) order = r; }
  if (fcIdx[m.id] == null || fcIdx[m.id] >= order.length) fcIdx[m.id] = 0;
  const pos = fcIdx[m.id], i = order[pos], c = m.flash[i];
  const known = Object.values(s.fc).filter(v => v === "k").length, rev = Object.values(s.fc).filter(v => v === "r").length;
  const wrap = h("div", {class:"fc-wrap"});
  wrap.append(h("div", {class:"fc-meta"}, `<span>Cartão <b>${pos+1}</b> de <b>${order.length}</b>${fcOnlyReview ? " · só os de revisar" : ""}</span><span><span class="pill ok">${known} sei</span> <span class="pill bad" style="background:var(--warn-soft);color:var(--warn)">${rev} revisar</span></span>`));
  const dots = h("div", {class:"dots"});
  order.forEach((j, p) => dots.append(h("span", {class: p === pos ? "cur" : (s.fc[j] === "k" ? "k" : s.fc[j] === "r" ? "r" : "")})));
  wrap.append(dots);
  const box = h("div", {class:"card3d"});
  const card = h("button", {class:"card" + (fcFlip ? " flip" : ""), "aria-label":"Virar cartão", onclick: () => { fcFlip = !fcFlip; card.classList.toggle("flip", fcFlip); }});
  card.append(h("div", {class:"face front"}, `<span class="tag">Frente · ${esc(m.titulo)}</span><div class="big">${fmt(c.f)}</div><span class="tip">Responda mentalmente e toque para virar.</span>`));
  card.append(h("div", {class:"face back"}, `<span class="tag">Verso</span><div class="body">${fmt(c.b)}</div><span class="tip">Toque para voltar à frente.</span>`));
  box.append(card); wrap.append(box);
  // match heights
  requestAnimationFrame(() => { const fs = card.querySelectorAll(".face"); let mx = 260; fs.forEach(f => { f.style.position = "relative"; mx = Math.max(mx, f.scrollHeight); f.style.position = ""; }); card.style.minHeight = mx + "px"; });
  const move = d => { fcIdx[m.id] = (pos + d + order.length) % order.length; fcFlip = false; render(); };
  const mark = k => { s.fc[i] = k; save(); move(1); };
  const row = h("div", {class:"btnrow"});
  row.append(h("button", {class:"btn", onclick: () => move(-1)}, "← Anterior"),
             h("button", {class:"btn", onclick: () => { fcFlip = !fcFlip; card.classList.toggle("flip", fcFlip); }}, "Virar"),
             h("button", {class:"btn", onclick: () => move(1)}, "Próximo →"));
  const row2 = h("div", {class:"btnrow"});
  row2.append(h("button", {class:"btn primary", onclick: () => mark("k")}, "Eu sabia"),
              h("button", {class:"btn", onclick: () => mark("r")}, "Preciso revisar"),
              h("button", {class:"btn small", "aria-pressed": String(fcOnlyReview), onclick: () => { fcOnlyReview = !fcOnlyReview; fcIdx[m.id] = 0; fcFlip = false; render(); }}, fcOnlyReview ? "Mostrar todos" : "Só os de revisar"));
  wrap.append(row, row2);
  body.append(wrap);
}

function renderVF(body, m){
  const s = st(m.id);
  const ans = Object.keys(s.vf).length, hit = Object.entries(s.vf).filter(([i, v]) => v === m.vf[i].v).length;
  body.append(h("div", {class:"hint"}, `<b>V ou F</b><span>Escreva a justificativa antes de escolher. Nas afirmações falsas, a justificativa deve dizer o que está errado e qual é a forma correta.</span>`));
  body.append(h("div", {class:"score"}, `<span class="pill n">${ans}/${m.vf.length} respondidas</span><span class="pill ok">${hit} ${hit === 1 ? "acerto" : "acertos"}</span><span class="pill bad">${ans - hit} ${ans - hit === 1 ? "erro" : "erros"}</span>`));
  m.vf.forEach((q, i) => {
    const card = h("div", {class:"vf"});
    card.append(h("div", {class:"stmt"}, `<span class="n mono" style="font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:5px;padding:2px 6px;margin-top:2px">VF${String(i+1).padStart(2,"0")}</span><div class="text" style="font-weight:600">${fmt(q.s)}</div>`));
    const ta = h("textarea", {id:`vfj-${m.id}-${i}`, placeholder:"Sua justificativa (também vale escrever no caderno)", "aria-label":"Sua justificativa"});
    ta.value = s.vfj[i] || "";
    ta.addEventListener("input", () => { s.vfj[i] = ta.value; save(); });
    card.append(ta);
    const opts = h("div", {class:"opts"});
    const answered = s.vf[i] !== undefined;
    [[true,"Verdadeiro"],[false,"Falso"]].forEach(([val, l]) => {
      const b = h("button", {onclick: () => { s.vf[i] = val; save(); render(); }}, l);
      if (answered) { b.disabled = true; if (val === q.v) b.className = "right"; else if (s.vf[i] === val) b.className = "wrong"; }
      opts.append(b);
    });
    card.append(opts);
    if (answered) {
      const good = s.vf[i] === q.v;
      card.append(h("div", {class:"verdict " + (good ? "good" : "bad")}, `<span class="lbl">${good ? "Você acertou" : "Não foi dessa vez"} · a afirmação é ${q.v ? "verdadeira" : "falsa"}</span>${fmt(q.j)}`));
    }
    body.append(card);
  });
}

function renderPBL(body, m){
  const s = st(m.id);
  body.append(h("div", {class:"hint"}, `<b>PBL</b><span>Trabalhe em equipes de 3 a 4 pessoas. Registrem no caderno cada etapa. A proposta de solução só abre depois que a equipe marcar que já elaborou a própria resposta.</span>`));
  m.pbl.forEach((p, i) => {
    const box = h("article", {class:"pbl"});
    box.append(h("header", {}, `<span class="tag">Problema ${i+1} · ${esc(p.duracao || "2 aulas")}</span><h3>${esc(p.titulo)}</h3>`));
    const inner = h("div", {class:"inner"});
    inner.append(h("div", {}, `<h4>Cenário</h4><p>${fmt(p.cenario)}</p>`));
    inner.append(h("div", {}, `<h4>Problema motriz</h4><p><strong>${fmt(p.problema)}</strong></p>`));
    inner.append(h("div", {class:"cols"},
      `<div><h4>Perguntas para investigar</h4><ol>${p.perguntas.map(x => `<li>${fmt(x)}</li>`).join("")}</ol></div>` +
      `<div><h4>Entregáveis da equipe</h4><ul>${p.entregaveis.map(x => `<li>${fmt(x)}</li>`).join("")}</ul></div>`));
    inner.append(h("div", {}, `<h4>Etapas</h4><div class="steps">${[["1 · Entender","Leiam o cenário e listem o que já sabem e o que precisam descobrir."],["2 · Investigar","Pesquisem no e-book e respondam às perguntas no caderno."],["3 · Propor","Montem a solução e os entregáveis."],["4 · Apresentar","Apresentem em 5 minutos e comparem com a proposta."]].map(([a,b]) => `<div><b>${a}</b>${b}</div>`).join("")}</div>`));
    const gate = h("div", {class:"gate"});
    const open = s.pbl[i] === "sol";
    const cbId = `pbl-${m.id}-${i}`;
    const lab = h("label", {for: cbId});
    const cb = h("input", {type:"checkbox", id: cbId}); cb.checked = !!s.pbl[i];
    lab.append(cb, document.createTextNode("Nossa equipe já elaborou a proposta"));
    const btn = h("button", {class:"btn primary", onclick: () => { s.pbl[i] = "sol"; save(); render(); }}, "Ver proposta de solução");
    btn.disabled = !cb.checked;
    cb.addEventListener("change", () => { s.pbl[i] = cb.checked ? (s.pbl[i] === "sol" ? "sol" : "ok") : 0; save(); btn.disabled = !cb.checked; });
    if (!open) { gate.append(lab, btn); inner.append(gate); }
    else inner.append(h("div", {class:"sol"}, `<span class="lbl">Proposta de solução (uma entre várias possíveis)</span><ul>${p.solucao.map(x => `<li>${fmt(x)}</li>`).join("")}</ul>`));
    box.append(inner); body.append(box);
  });
  body.append(h("div", {class:"panel"}, `<h3 style="font-size:20px;margin-bottom:10px">Rubrica de avaliação do PBL</h3><div class="tablewrap"><table class="rub"><thead><tr><th>Critério</th><th>Excelente (3)</th><th>Adequado (2)</th><th>Em construção (1)</th></tr></thead><tbody>
  <tr><td>Uso dos conceitos</td><td>Usa os termos técnicos corretamente e explica o porquê de cada escolha.</td><td>Usa os termos, com pequenas imprecisões.</td><td>Confunde conceitos ou só cita nomes.</td></tr>
  <tr><td>Solução</td><td>Resolve o problema motriz e respeita todas as restrições do cenário.</td><td>Resolve o essencial, mas ignora alguma restrição.</td><td>Solução incompleta ou fora do cenário.</td></tr>
  <tr><td>Entregáveis</td><td>Todos entregues, organizados e legíveis.</td><td>Quase todos entregues.</td><td>Faltam entregáveis importantes.</td></tr>
  <tr><td>Trabalho em equipe</td><td>Todos participam e sabem explicar a solução.</td><td>Participação desigual.</td><td>Uma pessoa fez quase tudo.</td></tr>
  </tbody></table></div>`));
}

/* ===== Laboratório visual: núcleo e widgets de Redes de Computadores ===== */
const LAB = {};
let LABN = 0;
const RM = (() => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e) { return false; } })();
function labBox(el, title, cap){
  const f = h("figure", {class:"lab"});
  f.append(h("div", {class:"lab-head"}, `<h3>${esc(title)}</h3><p class="cap">${fmt(cap)}</p>`));
  const stage = h("div", {class:"stage"}); const ctrls = h("div", {class:"ctrls"}); const info = h("div", {class:"info", "aria-live":"polite"});
  f.append(stage, ctrls, info); el.append(f);
  return {f, stage, ctrls, info};
}
function seg(opts, cur, on){
  const g = h("div", {class:"seg", role:"group"});
  opts.forEach(([v, l]) => { const b = h("button", {"aria-pressed": String(v === cur), onclick: () => { g.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed","false")); b.setAttribute("aria-pressed","true"); on(v); }}, l); g.append(b); });
  return g;
}
function defs(id){ return `<defs><marker id="${id}a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="s-mk"/></marker><marker id="${id}b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="s-mk2"/></marker><marker id="${id}c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="s-mk3"/></marker></defs>`; }
function mover(path, dur){ return RM ? "" : `<circle r="5" class="s-dot"><animateMotion dur="${dur||0.9}s" repeatCount="1" fill="freeze" path="${path}"/></circle>`; }

/* Diagrama passo a passo genérico (DNS, DHCP, ARP) */
function flowStepper(el, cfg){
  const B = labBox(el, cfg.title, cfg.cap); const id = "fx" + (++LABN);
  const W = cfg.W || 760, H = cfg.H || 320, bw = cfg.bw || 132, bh = 48;
  let vi = 0, i = 0;
  const side = cfg.side ? h("div", {class:"side-table"}) : null;
  function geo(a, b, off){
    const A = cfg.nodes[a], Bn = cfg.nodes[b]; let dx = Bn.x - A.x, dy = Bn.y - A.y; const L = Math.hypot(dx, dy) || 1;
    const ux = dx / L, uy = dy / L, px = -uy * off, py = ux * off;
    const t = n => Math.min((bw/2 + 6) / Math.abs(ux || 1e-9), (bh/2 + 6) / Math.abs(uy || 1e-9));
    const t1 = t(), x1 = A.x + ux * t1 + px, y1 = A.y + uy * t1 + py, x2 = Bn.x - ux * t1 + px, y2 = Bn.y - uy * t1 + py;
    return {x1, y1, x2, y2, mx: (x1 + x2) / 2 + px * 1.6, my: (y1 + y2) / 2 + py * 1.6};
  }
  function draw(){
    const steps = cfg.variants[vi].steps, st = steps[i];
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(cfg.title)}">${defs(id)}`;
    for (let k = 0; k < i; k++) (steps[k].arrows || []).forEach(([a, b]) => { const g = geo(a, b, a < b ? 7 : -7); s += `<line x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}" class="s-line" marker-end="url(#${id}b)"/>`; });
    const hl = new Set([...(st.hl || []), ...((st.arrows || []).flat().slice(0))].filter(x => cfg.nodes[x]));
    Object.entries(cfg.nodes).forEach(([k, n]) => {
      const cls = (st.bad || []).includes(k) ? "bad" : (st.ok || []).includes(k) ? "ok" : hl.has(k) ? "hl" : "";
      s += `<rect x="${n.x - bw/2}" y="${n.y - bh/2}" width="${bw}" height="${bh}" rx="8" class="s-box ${cls}"/><text x="${n.x}" y="${n.y - 3}" text-anchor="middle" class="s-t">${esc(n.label)}</text><text x="${n.x}" y="${n.y + 14}" text-anchor="middle" class="s-s">${esc(n.sub || "")}</text>`;
    });
    (st.arrows || []).forEach(([a, b, lab], j) => {
      const g = geo(a, b, a < b ? 7 : -7);
      s += `<line x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}" class="s-acc" marker-end="url(#${id}a)"/>`;
      if (lab) s += `<text x="${g.mx}" y="${g.my - 4}" text-anchor="middle" class="s-lbl">${esc(lab)}</text>`;
      s += mover(`M${g.x1},${g.y1} L${g.x2},${g.y2}`);
    });
    s += `<text x="12" y="${H - 10}" class="s-s">Passo ${i + 1} de ${steps.length}</text></svg>`;
    B.stage.innerHTML = s;
    B.info.innerHTML = `<b class="k">${esc(st.t || "")}</b>${fmt(st.text)}`;
    prev.disabled = i === 0; next.disabled = i === steps.length - 1;
    if (cfg.side) { side.innerHTML = cfg.side(vi, i); }
  }
  const prev = h("button", {class:"btn", onclick: () => { i--; draw(); }}, "← Anterior");
  const next = h("button", {class:"btn primary", onclick: () => { i++; draw(); }}, "Próximo passo →");
  B.ctrls.append(prev, next, h("button", {class:"btn small", onclick: () => { i = 0; draw(); }}, "Recomeçar"));
  if (cfg.variants.length > 1) B.ctrls.append(seg(cfg.variants.map((v, k) => [k, v.label]), 0, v => { vi = v; i = 0; draw(); }));
  if (side) B.f.insertBefore(side, B.info.nextSibling);
  draw();
}

/* m1 · Linha do tempo */
LAB.timeline = el => {
  const B = labBox(el, "Linha do tempo da internet", "Toque em cada ponto para ver o marco. No modo **Desafio**, descubra o ano de cada acontecimento.");
  const E = [[1969,"ARPANET","Criada pela DARPA para ser descentralizada. Começou com 4 nós: UCLA, Stanford, UC Santa Barbara e Utah."],[1972,"Demonstração pública","Primeira demonstração pública da ARPANET."],[1974,"TCP/IP publicado","Vint Cerf e Bob Kahn padronizam a conversa entre redes diferentes."],[1983,"ARPANET adota o TCP/IP","Muitos consideram este o nascimento da internet."],[1989,"Proposta da Web","Tim Berners-Lee, no CERN: hiperlinks, HTTP e navegadores."],[1991,"A Web fica pública","Qualquer pessoa passa a poder acessar páginas web."],[1995,"Internet comercial no Brasil","Antes, só universidades e centros de pesquisa acessavam, pela RNP."],[2007,"Lançamento do iPhone","Começa a era da internet móvel."]];
  const x = y => 40 + (y - 1965) * (680 / 45);
  let cur = 0, mode = "exp", ask = 0, score = 0, tries = 0, order = [];
  function draw(){
    let s = `<svg viewBox="0 0 760 190" role="img" aria-label="Linha do tempo de 1969 a 2007"><line x1="30" y1="100" x2="730" y2="100" class="s-ink"/>`;
    [1970,1980,1990,2000,2010].forEach(y => s += `<line x1="${x(y)}" y1="94" x2="${x(y)}" y2="106" class="s-ink"/><text x="${x(y)}" y="124" text-anchor="middle" class="s-s">${y}</text>`);
    E.forEach((e, k) => {
      const up = k % 2 === 0, on = mode === "exp" && k === cur;
      s += `<g class="s-click" data-k="${k}" tabindex="0" role="button" aria-label="${mode === "exp" ? e[0] + ": " + e[1] : "Ponto " + (k+1)}"><line x1="${x(e[0])}" y1="100" x2="${x(e[0])}" y2="${up ? 62 : 138}" class="s-line"/><circle cx="${x(e[0])}" cy="100" r="${on ? 11 : 8}" class="${on ? "s-pt on" : "s-pt"}"/>` +
        (mode === "exp" ? `<text x="${x(e[0])}" y="${up ? 54 : 156}" text-anchor="middle" class="s-t">${e[0]}</text>` : `<text x="${x(e[0])}" y="${up ? 54 : 156}" text-anchor="middle" class="s-s">?</text>`) + `</g>`;
    });
    B.stage.innerHTML = s + `</svg>`;
    B.stage.querySelectorAll("[data-k]").forEach(g => { const k = +g.dataset.k; g.addEventListener("click", () => pick(k)); g.addEventListener("keydown", ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); pick(k); } }); });
    if (mode === "exp") B.info.innerHTML = `<b class="k">${E[cur][0]} · ${esc(E[cur][1])}</b>${esc(E[cur][2])}`;
  }
  function pick(k){
    if (mode === "exp") { cur = k; draw(); return; }
    const e = E[order[ask]]; tries++;
    if (k === order[ask]) { score++; B.info.innerHTML = `<b class="k ok">Acertou · ${e[0]}</b>${esc(e[1])}: ${esc(e[2])}`; }
    else B.info.innerHTML = `<b class="k bad">Ainda não · o ponto escolhido é ${E[k][0]}</b>“${esc(e[1])}” aconteceu em <strong>${e[0]}</strong>. ${esc(e[2])}`;
    ask++;
    if (ask < E.length) setTimeout(askQ, 1600); else setTimeout(() => { B.info.innerHTML = `<b class="k">Fim do desafio</b>Você acertou <strong>${score} de ${E.length}</strong>. ${score === E.length ? "Linha do tempo dominada!" : "Volte ao modo Explorar e tente de novo."}`; }, 1700);
  }
  function askQ(){ B.info.innerHTML = `<b class="k">Desafio ${ask + 1} de ${E.length} · acertos: ${score}</b>Em que ponto da linha aconteceu: <strong>${esc(E[order[ask]][1])}</strong>?`; }
  const prev = h("button", {class:"btn", onclick: () => { if (mode !== "exp") return; cur = (cur + E.length - 1) % E.length; draw(); }}, "← Marco anterior");
  const next = h("button", {class:"btn", onclick: () => { if (mode !== "exp") return; cur = (cur + 1) % E.length; draw(); }}, "Próximo marco →");
  B.ctrls.append(prev, next, seg([["exp","Explorar"],["quiz","Desafio"]], "exp", m => { mode = m; if (m === "quiz") { order = E.map((_, k) => k).sort(() => Math.random() - .5); ask = 0; score = 0; draw(); askQ(); } else draw(); }));
  draw();
};

/* m1 · Encapsulamento nas camadas */
LAB.layers = el => {
  const B = labBox(el, "O edifício de Paco: encapsulamento", "Use **Descer** para enviar a mensagem (cada camada acrescenta um cabeçalho) e **Subir** para recebê-la. Toque numa camada para ver o que ela faz e a correspondência com o modelo OSI.");
  const L = [
    {n:"Aplicação", osi:["7 Aplicação","6 Apresentação","5 Sessão"], pdu:"Mensagem (dados)", ex:"HTTP, SMTP, DNS, FTP", f:"O programa de mensagens cria o texto “Olá, Beto!”."},
    {n:"Transporte", osi:["4 Transporte"], pdu:"Segmento", ex:"TCP, UDP", f:"O Sr. TCP põe as portas de origem e destino e numera os bytes."},
    {n:"Rede", osi:["3 Rede"], pdu:"Datagrama", ex:"IP", f:"A Sra. IP cola os IPs: origem 10.0.1.50 e destino 189.12.34.56."},
    {n:"Enlace", osi:["2 Enlace"], pdu:"Quadro", ex:"Ethernet, Wi-Fi, ARP", f:"O Sr. Enlace põe os MACs do próximo salto e o CRC no final."},
    {n:"Física", osi:["1 Física"], pdu:"Bits", ex:"Par trançado, fibra, rádio", f:"Paco vira sinais elétricos, pulsos de luz ou ondas de rádio."}];
  let lv = 0, dir = "down";
  function draw(){
    const rh = 60, gap = 8, y0 = 16;
    let s = `<svg viewBox="0 0 760 ${y0 + 5 * (rh + gap) + 6}" role="img" aria-label="Camadas TCP/IP e OSI com o pacote encapsulado">`;
    s += `<text x="105" y="11" text-anchor="middle" class="s-s">MODELO TCP/IP</text><text x="655" y="11" text-anchor="middle" class="s-s">MODELO OSI</text>`;
    L.forEach((l, k) => {
      const y = y0 + k * (rh + gap), on = k === lv;
      s += `<g class="s-click" data-k="${k}" tabindex="0" role="button" aria-label="Camada ${l.n}"><rect x="20" y="${y}" width="170" height="${rh}" rx="8" class="s-box ${on ? "hl" : ""}"/><text x="105" y="${y + 27}" text-anchor="middle" class="s-t">${5 - k} · ${l.n}</text><text x="105" y="${y + 45}" text-anchor="middle" class="s-s">${l.pdu}</text></g>`;
      const n = l.osi.length, oh = (rh - (n - 1) * 3) / n;
      l.osi.forEach((o, j) => { const oy = y + j * (oh + 3); s += `<rect x="570" y="${oy}" width="170" height="${oh}" rx="5" class="s-box ${on ? "hl" : ""}"/><text x="655" y="${oy + oh / 2 + 4}" text-anchor="middle" class="${n > 1 ? "s-m" : "s-t"}">${o}</text>`; });
      s += `<line x1="190" y1="${y + rh/2}" x2="570" y2="${y + rh/2}" class="s-line" stroke-dasharray="3 5"/>`;
    });
    // pacote
    const y = y0 + lv * (rh + gap) + 12, ph = 36;
    let parts = [];
    if (lv >= 3) parts.push(["MAC", "hdr3"]);
    if (lv >= 2) parts.push(["IP", "hdr2"]);
    if (lv >= 1) parts.push(["TCP", "hdr1"]);
    parts.push(["Olá, Beto!", "data"]);
    if (lv >= 3) parts.push(["CRC", "hdr3"]);
    if (lv === 4) {
      s += `<rect x="215" y="${y}" width="330" height="${ph}" rx="6" class="s-box hl"/><text x="380" y="${y + 23}" text-anchor="middle" class="s-m">01001111 01101100 11100001 ...</text>`;
    } else {
      const ws = parts.map(p => p[1] === "data" ? 96 : 52), tot = ws.reduce((a, b) => a + b, 0) + (parts.length - 1) * 4; let x = 380 - tot / 2;
      parts.forEach((p, j) => { s += `<rect x="${x}" y="${y}" width="${ws[j]}" height="${ph}" rx="5" class="pk ${p[1]}"/><text x="${x + ws[j]/2}" y="${y + 23}" text-anchor="middle" class="s-t pk-t">${esc(p[0])}</text>`; x += ws[j] + 4; });
    }
    s += `<text x="380" y="${y - 2}" text-anchor="middle" class="s-lbl">${dir === "down" ? "▼ encapsulando" : "▲ desencapsulando"}</text>`;
    B.stage.innerHTML = s + `</svg>`;
    B.stage.querySelectorAll("[data-k]").forEach(g => { const k = +g.dataset.k; const go = () => { lv = k; draw(); }; g.addEventListener("click", go); g.addEventListener("keydown", ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); } }); });
    const l = L[lv];
    B.info.innerHTML = `<b class="k">${5 - lv}º andar · ${l.n} · PDU: ${l.pdu}</b>${esc(l.f)} <span class="muted">Protocolos: ${esc(l.ex)}. No OSI: ${esc(l.osi.join(", "))}.</span>`;
    down.disabled = lv === 4; up.disabled = lv === 0;
  }
  const down = h("button", {class:"btn primary", onclick: () => { lv++; dir = "down"; draw(); }}, "▼ Descer (enviar)");
  const up = h("button", {class:"btn", onclick: () => { lv--; dir = "up"; draw(); }}, "▲ Subir (receber)");
  B.ctrls.append(down, up);
  draw();
};

/* m2 · DNS */
LAB.dns = el => flowStepper(el, {
  title: "Consulta DNS passo a passo", cap: "Siga a pergunta “qual o IP de www.ifs.edu.br?” pela hierarquia do DNS. Depois compare com a **segunda consulta**, que usa o cache.",
  H: 320,
  nodes: { pc:{x:95,y:160,label:"Computador",sub:"navegador"}, loc:{x:300,y:160,label:"DNS local",sub:"do provedor"}, raiz:{x:510,y:50,label:"Servidor raiz",sub:"."}, tld:{x:665,y:160,label:"Domínio de topo",sub:".br"}, aut:{x:510,y:270,label:"Autoritativo",sub:"ifs.edu.br"}, web:{x:95,y:285,label:"Servidor web",sub:"203.0.113.10"} },
  variants: [
    {label:"1ª consulta", steps:[
      {t:"1 · Pergunta", arrows:[["pc","loc","www.ifs.edu.br?"]], text:"O navegador precisa do IP. O computador pergunta ao servidor DNS local, geralmente do provedor."},
      {t:"2 · Raiz", arrows:[["loc","raiz","?"]], text:"O DNS local não sabe a resposta e consulta um **servidor raiz**."},
      {t:"3 · Indicação", arrows:[["raiz","loc","pergunte ao .br"]], text:"A raiz não sabe o IP. Ela só **indica** quem cuida do domínio de topo `.br`."},
      {t:"4 · Domínio de topo", arrows:[["loc","tld","?"]], text:"O DNS local pergunta ao servidor do `.br`."},
      {t:"5 · Indicação", arrows:[["tld","loc","pergunte a ifs.edu.br"]], text:"O `.br` indica o servidor **autoritativo** do domínio `ifs.edu.br`."},
      {t:"6 · Autoritativo", arrows:[["loc","aut","?"]], text:"O DNS local pergunta ao autoritativo, o responsável por aquele domínio."},
      {t:"7 · Resposta", arrows:[["aut","loc","203.0.113.10"]], text:"O autoritativo responde com o IP (aqui um endereço de exemplo)."},
      {t:"8 · Cache", arrows:[["loc","pc","203.0.113.10"]], text:"O DNS local entrega o IP ao computador e **guarda a resposta em cache**."},
      {t:"9 · HTTP", arrows:[["pc","web","GET /"]], text:"Só agora o navegador fala com o servidor web: requisição HTTP GET."},
      {t:"10 · Página", arrows:[["web","pc","200 OK"]], text:"O servidor responde 200 OK com a página. Tudo isso levou milissegundos."}]},
    {label:"2ª consulta (cache)", steps:[
      {t:"1 · Pergunta", arrows:[["pc","loc","www.ifs.edu.br?"]], text:"Outro aluno pede o mesmo site alguns minutos depois."},
      {t:"2 · Cache", arrows:[["loc","pc","203.0.113.10"]], hl:["loc"], text:"O DNS local já tem a resposta no **cache**: não precisa perguntar à raiz, ao `.br` nem ao autoritativo."},
      {t:"3 · HTTP", arrows:[["pc","web","GET /"]], text:"O navegador já pode pedir a página."},
      {t:"4 · Página", arrows:[["web","pc","200 OK"]], text:"Foram 4 passos em vez de 10. É por isso que o cache acelera a navegação."}]}]
});

/* m2 · Simulador HTTP */
LAB.http = el => {
  const B = labBox(el, "Simulador de requisições HTTP", "Escolha o método e o recurso e envie. Tente descobrir os **4 códigos de status** da unidade: 200, 301, 404 e 500.");
  const R = ["/index.html","/img/logo.png","/inscricao","/noticias-2019","/img/foto-antiga.jpg","/relatorio"];
  const found = new Set(); const id = "hx" + (++LABN);
  const mSel = h("select", {id:id+"m", "aria-label":"Método"}); ["GET","POST","PUT","DELETE"].forEach(m => mSel.append(h("option", {value:m}, m)));
  const rSel = h("select", {id:id+"r", "aria-label":"Recurso"}); R.forEach(r => rSel.append(h("option", {value:r}, r)));
  function resp(m, r){
    if (r === "/noticias-2019") return [301, "Moved Permanently", "Location: /noticias", "O garçom avisa: “esse prato mudou de nome no cardápio, peça /noticias”."];
    if (r === "/img/foto-antiga.jpg") return [404, "Not Found", "(sem conteúdo)", "O garçom volta: “esse prato não existe na cozinha”."];
    if (r === "/relatorio") return [500, "Internal Server Error", "(erro no servidor)", "A cozinha pegou fogo: o problema é do servidor, não do pedido."];
    const body = {GET: r.endsWith(".png") ? "[imagem PNG]" : "<html>…página…</html>", POST:"Dados recebidos com sucesso", PUT:"Recurso atualizado", DELETE:"Recurso removido"}[m];
    return [200, "OK", body, {GET:"O garçom traz o prato pedido.", POST:"Você entregou um pedido escrito (formulário) e a cozinha recebeu.", PUT:"Você pediu para trocar um prato que já estava na mesa.", DELETE:"Você pediu para retirar um prato."}[m]];
  }
  function draw(m, r, res){
    const col = !res ? "" : res[0] === 200 ? "ok" : res[0] === 301 ? "hl" : "bad";
    let s = `<svg viewBox="0 0 760 210" role="img" aria-label="Cliente envia requisição ao servidor e recebe resposta">${defs(id)}`;
    s += `<rect x="30" y="60" width="150" height="90" rx="10" class="s-box"/><rect x="42" y="72" width="126" height="56" rx="4" class="s-line"/><text x="105" y="104" text-anchor="middle" class="s-t">Navegador</text><text x="105" y="168" text-anchor="middle" class="s-s">cliente</text>`;
    s += `<rect x="580" y="45" width="150" height="120" rx="10" class="s-box"/>${[0,1,2].map(k => `<rect x="595" y="${58 + k*34}" width="120" height="26" rx="3" class="s-line"/><circle cx="700" cy="${71 + k*34}" r="3" class="s-dot"/>`).join("")}<text x="655" y="184" text-anchor="middle" class="s-s">servidor web</text>`;
    if (m) {
      s += `<line x1="185" y1="80" x2="575" y2="80" class="s-acc" marker-end="url(#${id}a)"/><text x="380" y="70" text-anchor="middle" class="s-lbl">${m} ${esc(r)}</text>${mover("M185,80 L575,80", .8)}`;
      s += `<line x1="575" y1="135" x2="185" y2="135" class="${col === "ok" ? "s-okl" : col === "bad" ? "s-badl" : "s-acc"}" marker-end="url(#${id}${col === "ok" || col === "bad" ? "c" : "a"})"/><rect x="315" y="120" width="130" height="30" rx="15" class="s-box ${col}"/><text x="380" y="140" text-anchor="middle" class="s-t">${res[0]} ${res[1]}</text>`;
    } else s += `<text x="380" y="110" text-anchor="middle" class="s-s">escolha o método e o recurso e toque em Enviar</text>`;
    B.stage.innerHTML = s + `</svg>`;
  }
  const chips = h("div", {class:"chips"});
  function chipsDraw(){ chips.innerHTML = [200,301,404,500].map(c => `<span class="chip ${found.has(c) ? "on" : ""}">${c}</span>`).join("") + `<span class="muted">${found.size}/4 descobertos</span>`; }
  const send = h("button", {class:"btn primary", onclick: () => {
    const m = mSel.value, r = rSel.value, res = resp(m, r); found.add(res[0]); draw(m, r, res); chipsDraw();
    B.info.innerHTML = `<div class="msgs"><pre class="msg">${esc(m)} ${esc(r)} HTTP/1.1\nHost: www.ifs.edu.br</pre><pre class="msg">HTTP/1.1 ${res[0]} ${res[1]}\n${esc(res[2])}</pre></div><p style="margin:8px 0 0">${esc(res[3])}</p>`;
  }}, "Enviar requisição");
  B.ctrls.append(mSel, rSel, send, chips); chipsDraw(); draw();
  B.info.innerHTML = `<b class="k">Dica</b>O recurso <code>/inscricao</code> é um formulário: experimente GET (abrir) e POST (enviar).`;
};

/* m3 · Three-way handshake e retransmissão */
LAB.handshake = el => {
  const B = labBox(el, "Conexão TCP: handshake, ACKs e retransmissão", "Avance passo a passo. Marque **Perder o 2º segmento** para ver o TCP perceber a perda e retransmitir.");
  let lose = false, i = 0; const id = "tx" + (++LABN);
  const base = [
    ["c","SYN","seq=100","O cliente pede para abrir a conexão (SYN)."],
    ["s","SYN-ACK","seq=300 ack=101","O servidor confirma e pede sincronização de volta (SYN-ACK)."],
    ["c","ACK","ack=301","O cliente confirma (ACK). **Conexão estabelecida**: só agora os dados podem ir."],
    ["c","DADOS","seq=101 “Olá,”","1º segmento: 4 bytes, numerados de 101 a 104."],
    ["s","ACK","ack=105","O servidor confirma: “recebi até o 104, espero o 105”."]];
  const ok = [["c","DADOS","seq=105 “ Beto!”","2º segmento: 6 bytes, de 105 a 110."],["s","ACK","ack=111","Confirmação recebida. Mensagem completa e na ordem."]];
  const bad = [["c","DADOS","seq=105 “ Beto!”","2º segmento enviado... mas se perde no caminho (fila cheia ou CRC errado).", "lost"],["c","TEMPO","sem ACK","O cliente espera o ACK 111. O tempo limite estoura e nada chega.","timer"],["c","DADOS","seq=105 (de novo)","**Retransmissão**: o cliente reenvia o mesmo segmento."],["s","ACK","ack=111","Agora sim. “Nenhum pacote fica para trás”, como diz o Sr. TCP."]];
  const steps = () => base.concat(lose ? bad : ok);
  function draw(){
    const S = steps(), H = 70 + S.length * 40;
    let s = `<svg viewBox="0 0 760 ${H}" role="img" aria-label="Diagrama de sequência TCP">${defs(id)}<text x="150" y="22" text-anchor="middle" class="s-t">Cliente (Ana)</text><text x="610" y="22" text-anchor="middle" class="s-t">Servidor (Beto)</text><line x1="150" y1="32" x2="150" y2="${H - 10}" class="s-ink"/><line x1="610" y1="32" x2="610" y2="${H - 10}" class="s-ink"/>`;
    S.forEach((st, k) => {
      if (k > i) return;
      const y1 = 46 + k * 40, y2 = y1 + 30, cur = k === i, cl = cur ? "s-acc" : "s-line", mk = cur ? "a" : "b";
      const fx = st[0] === "c" ? 150 : 610, tx = st[0] === "c" ? 610 : 150;
      if (st[4] === "timer") { s += `<rect x="60" y="${y1 + 2}" width="180" height="24" rx="12" class="s-box bad"/><text x="150" y="${y1 + 18}" text-anchor="middle" class="s-m">⏱ tempo limite</text>`; return; }
      if (st[4] === "lost") { const mx = (fx + tx) / 2, my = (y1 + y2) / 2; s += `<line x1="${fx}" y1="${y1}" x2="${mx}" y2="${my}" class="${cur ? "s-badl" : "s-line"}"/><text x="${mx + 8}" y="${my + 5}" class="s-x">✕</text><text x="${(fx + mx) / 2}" y="${y1 + 2}" text-anchor="middle" class="s-lbl">${st[1]} ${esc(st[2])}</text>`; return; }
      s += `<line x1="${fx}" y1="${y1}" x2="${tx}" y2="${y2}" class="${cl}" marker-end="url(#${id}${mk})"/><text x="380" y="${(y1 + y2) / 2 - 4}" text-anchor="middle" class="s-lbl">${st[1]} ${esc(st[2])}</text>`;
      if (cur) s += mover(`M${fx},${y1} L${tx},${y2}`, .8);
    });
    B.stage.innerHTML = s + `</svg>`;
    B.info.innerHTML = `<b class="k">Passo ${i + 1} de ${S.length}</b>${fmt(S[i][3])}`;
    pv.disabled = i === 0; nx.disabled = i === S.length - 1;
  }
  const pv = h("button", {class:"btn", onclick: () => { i--; draw(); }}, "← Anterior");
  const nx = h("button", {class:"btn primary", onclick: () => { i++; draw(); }}, "Próximo →");
  const lab = h("label", {class:"chk"}); const cb = h("input", {type:"checkbox", id:id+"l"}); cb.addEventListener("change", () => { lose = cb.checked; i = Math.min(i, steps().length - 1); draw(); });
  lab.append(cb, document.createTextNode(" Perder o 2º segmento"));
  B.ctrls.append(pv, nx, h("button", {class:"btn small", onclick: () => { i = 0; draw(); }}, "Recomeçar"), lab);
  draw();
};

/* m3 · Demultiplexação por portas */
LAB.ports = el => {
  const B = labBox(el, "Carteiro interno: entregue o segmento na porta certa", "Chegou um segmento. Leia a porta de destino e toque no programa que deve recebê-lo. No modo **Aprender**, as portas aparecem nas portas dos apartamentos.");
  const A = [["Navegador (Web segura)",443,"TCP"],["Site antigo (Web)",80,"TCP"],["Servidor de e-mail",25,"TCP"],["Resolução de nomes",53,"UDP"],["Transferência de arquivos",21,"TCP"],["Configuração automática",67,"UDP"]];
  let show = false, cur = 0, n = 0, hit = 0;
  const grid = h("div", {class:"apts"});
  function newSeg(){ cur = Math.floor(Math.random() * A.length); }
  function draw(msg){
    const a = A[cur];
    B.stage.innerHTML = `<svg viewBox="0 0 760 120" role="img" aria-label="Segmento com porta de destino ${a[1]}"><rect x="250" y="20" width="260" height="80" rx="8" class="s-box hl"/><line x1="250" y1="20" x2="380" y2="62" class="s-line"/><line x1="510" y1="20" x2="380" y2="62" class="s-line"/><text x="380" y="80" text-anchor="middle" class="s-t">porta destino: ${a[1]} · ${a[2]}</text><text x="380" y="96" text-anchor="middle" class="s-s">porta origem: ${49152 + Math.floor(cur * 977) % 16000}</text><text x="120" y="66" text-anchor="middle" class="s-s">camada de rede →</text><text x="640" y="66" text-anchor="middle" class="s-s">→ qual programa?</text></svg>`;
    grid.innerHTML = "";
    A.forEach((x, k) => grid.append(h("button", {class:"apt", onclick: () => answer(k)}, `<span class="door"></span><span>${esc(x[0])}</span><span class="mono pt">${show ? x[1] + "/" + x[2] : "porta ?"}</span>`)));
    B.info.innerHTML = msg || `<b class="k">Rodada ${n + 1} · acertos ${hit}</b>Para qual apartamento vai o segmento com porta <strong>${a[1]}</strong>?`;
  }
  function answer(k){
    n++; const a = A[cur]; const ok = k === cur; if (ok) hit++;
    const m = `<b class="k ${ok ? "ok" : "bad"}">${ok ? "Entregue certo" : "Endereço errado"} · ${hit}/${n}</b>A porta <strong>${a[1]}</strong> (${a[2]}) pertence a <strong>${esc(a[0])}</strong>. Isso é a <strong>demultiplexação</strong>: ler a porta e entregar ao socket da aplicação.`;
    newSeg(); draw(m);
  }
  B.ctrls.append(seg([[false,"Desafio"],[true,"Aprender"]], false, v => { show = v; draw(); }), h("button", {class:"btn small", onclick: () => { n = 0; hit = 0; newSeg(); draw(); }}, "Zerar placar"));
  B.f.insertBefore(grid, B.ctrls); newSeg(); draw();
};

/* m4 · DHCP (DORA) */
LAB.dhcp = el => flowStepper(el, {
  title: "DHCP: como o computador ganha um IP", cap: "Acompanhe as 4 mensagens **Discover, Offer, Request e Ack**. Veja à direita a configuração do novo computador sendo preenchida.",
  H: 300,
  nodes: { pc:{x:110,y:150,label:"Novo PC",sub:"sem IP"}, sw:{x:380,y:150,label:"Switch",sub:"LAN do laboratório"}, srv:{x:650,y:60,label:"Servidor DHCP",sub:"192.168.10.1"}, pc2:{x:650,y:150,label:"Outro PC",sub:"192.168.10.101"}, prn:{x:650,y:240,label:"Impressora",sub:"192.168.10.20"} },
  variants: [{label:"DORA", steps:[
    {t:"Antes", hl:["pc"], text:"O computador acabou de ser ligado na rede. Ele não tem IP, máscara, gateway nem DNS."},
    {t:"1 · Discover (broadcast)", arrows:[["pc","sw","Discover"],["sw","srv"],["sw","pc2"],["sw","prn"]], text:"“Estou aqui! Alguém pode me dar um IP?”. Como ainda não sabe quem é o servidor, envia em **broadcast** para toda a rede local. Todos recebem; só o servidor DHCP responde."},
    {t:"2 · Offer", arrows:[["srv","sw","Offer"],["sw","pc","192.168.10.105?"]], text:"O servidor oferece um IP livre e as outras configurações."},
    {t:"3 · Request", arrows:[["pc","sw","Request"],["sw","srv","quero o .105"]], text:"O computador aceita a oferta e pede formalmente aquele endereço."},
    {t:"4 · Ack", arrows:[["srv","sw","Ack"],["sw","pc","confirmado"]], ok:["pc"], text:"O servidor confirma. O computador agora tem IP e pode se comunicar. A concessão vale por um tempo (lease) e depois precisa ser renovada."}]}],
  side: (v, i) => {
    const st = i >= 4 ? "ok" : i >= 2 ? "off" : "";
    const val = (a, b) => i >= 4 ? a : i >= 2 ? `<span class="muted">${b}</span>` : `<span class="muted">—</span>`;
    return `<table class="ltable"><caption>Configuração do novo PC ${i >= 4 ? "· atribuída" : i >= 2 ? "· oferecida" : ""}</caption><tr><th>IP</th><td class="${st}">${val("192.168.10.105","192.168.10.105")}</td></tr><tr><th>Máscara</th><td>${val("255.255.255.0","255.255.255.0")}</td></tr><tr><th>Gateway</th><td>${val("192.168.10.1","192.168.10.1")}</td></tr><tr><th>DNS</th><td>${val("192.168.10.1","192.168.10.1")}</td></tr><tr><th>Lease</th><td>${val("8 horas","8 horas")}</td></tr></table>`;
  }
});

/* m4 · Roteamento salto a salto */
LAB.route = el => {
  const B = labBox(el, "A viagem de Paco: de Coari a Manaus", "Toque em **Próximo salto**. Repare que o IP de destino nunca muda, mas o quadro (MAC) é trocado em cada roteador. O resultado do `tracert` vai aparecendo abaixo.");
  const N = [
    ["PC de Ana","10.0.1.50","AA:01","Paco nasce. O destino 189.12.34.56 não é da rede local, então vai para o gateway 10.0.1.1."],
    ["Roteador do campus","10.0.1.1","AA:BB:CC:DD:EE:FF","Tabela: 10.0.1.0/24 → entrega direta; 189.12.0.0/16 → próximo salto 200.100.50.1 (provedor)."],
    ["Provedor Coari","200.100.50.1","B2:10","Roteador movimentado: milhares de pacotes por segundo. Encaminha para o backbone regional."],
    ["Backbone 1","200.160.0.9","C3:20","Fibra óptica de alta capacidade. Paco vira pulso de luz."],
    ["Backbone 2","200.160.4.2","C3:44","Aqui pode haver congestionamento: Paco espera numa fila (buffer)."],
    ["Provedor Manaus","189.12.0.1","D4:30","“Bem-vindo à rede do provedor de Manaus.” Encaminha para a casa de Beto."],
    ["Roteador de Beto","189.12.34.1","E5:01","Roteador doméstico (também switch e Wi-Fi). Entrega na rede local."],
    ["PC de Beto","189.12.34.56","F6:56","Chegou! Agora Paco sobe as camadas e a mensagem aparece na tela."]];
  let k = 0, cong = false; const lat = [0, 2, 8, 14, 9, 11, 3, 1];
  function draw(){
    const xs = N.map((_, j) => 50 + j * 94);
    let s = `<svg viewBox="0 0 760 200" role="img" aria-label="Caminho com 8 nós entre Coari e Manaus"><line x1="50" y1="70" x2="708" y2="70" class="s-line"/>`;
    if (k > 0) s += `<line x1="50" y1="70" x2="${xs[k]}" y2="70" class="s-acc"/>`;
    N.forEach((n, j) => {
      const isR = j > 0 && j < N.length - 1;
      s += `<${isR ? "circle" : "rect"} ${isR ? `cx="${xs[j]}" cy="70" r="18"` : `x="${xs[j] - 18}" y="52" width="36" height="36" rx="5"`} class="s-box ${j === k ? "hl" : j < k ? "ok" : ""}"/>`;
      if (isR) s += `<path d="M${xs[j]-8},70 h16 M${xs[j]},62 v16" class="s-ink"/>`;
      const words = n[0].split(" "); const l1 = words.slice(0, Math.ceil(words.length / 2)).join(" "), l2 = words.slice(Math.ceil(words.length / 2)).join(" ");
      s += `<text x="${xs[j]}" y="108" text-anchor="middle" class="s-m">${esc(l1)}</text><text x="${xs[j]}" y="121" text-anchor="middle" class="s-m">${esc(l2)}</text><text x="${xs[j]}" y="137" text-anchor="middle" class="s-s">${n[1]}</text>`;
    });
    s += `<g transform="translate(${xs[k] - 22},18)"><rect width="44" height="22" rx="4" class="pk data"/><text x="22" y="15" text-anchor="middle" class="s-t pk-t">Paco</text></g>`;
    const prevMac = k > 0 ? N[k - 1][2] : "—";
    s += `<text x="20" y="168" class="s-s">IP origem 10.0.1.50 → IP destino 189.12.34.56 (não muda)</text><text x="20" y="186" class="s-s">Quadro deste salto: MAC origem ${k > 0 ? prevMac : N[0][2]} → MAC destino ${N[k][2]}</text></svg>`;
    B.stage.innerHTML = s;
    let tr = `tracert 189.12.34.56\n`; let tot = 0;
    for (let j = 1; j <= k; j++) { const d = lat[j] + (cong && j === 4 ? 18 : 0); tot += d; tr += `  ${j}   ${String(tot).padStart(3)} ms   ${N[j][1]}${cong && j === 4 ? "   (fila)" : ""}\n`; }
    term.textContent = tr + (k === N.length - 1 ? `Rastreamento concluído. Latência acumulada ≈ ${tot} ms.` : "");
    B.info.innerHTML = `<b class="k">Salto ${k} · ${esc(N[k][0])}</b>${esc(N[k][3])}${cong && k === 4 ? " <strong>Congestionamento ligado: +18 ms na fila.</strong>" : ""}`;
    nx.disabled = k === N.length - 1;
  }
  const term = h("pre", {class:"term", "aria-label":"Saída do tracert"});
  const nx = h("button", {class:"btn primary", onclick: () => { k++; draw(); }}, "Próximo salto →");
  const lab = h("label", {class:"chk"}); const cb = h("input", {type:"checkbox", id:"cg" + (++LABN)}); cb.addEventListener("change", () => { cong = cb.checked; draw(); }); lab.append(cb, document.createTextNode(" Congestionamento no backbone"));
  B.ctrls.append(nx, h("button", {class:"btn small", onclick: () => { k = 0; draw(); }}, "Recomeçar"), lab);
  B.f.append(term); draw();
};

/* m5 · Hub × switch com tabela MAC */
LAB.switch = el => {
  const B = labBox(el, "Hub ou switch? Envie quadros e veja a tabela MAC", "Escolha origem e destino e envie. Com **hub**, o quadro vai para todas as portas. Com **switch**, ele aprende onde está cada MAC e passa a enviar só para a porta certa.");
  const P = [["A","AA:AA:AA:AA:AA:AA",1],["B","BB:BB:BB:BB:BB:BB",2],["C","CC:CC:CC:CC:CC:CC",3],["D","DD:DD:DD:DD:DD:DD",4]];
  let mode = "switch", table = {}, last = null, sent = 0, waste = 0; const id = "sw" + (++LABN);
  const so = h("select", {id:id+"o", "aria-label":"Origem"}), de = h("select", {id:id+"d", "aria-label":"Destino"});
  P.forEach(p => { so.append(h("option", {value:p[0]}, "De " + p[0])); de.append(h("option", {value:p[0]}, "Para " + p[0])); }); de.append(h("option", {value:"*"}, "Para todos (broadcast)")); de.value = "C";
  const xs = [110, 290, 470, 650];
  function draw(){
    let s = `<svg viewBox="0 0 760 290" role="img" aria-label="${mode} com quatro computadores">${defs(id)}<rect x="230" y="40" width="300" height="70" rx="10" class="s-box ${mode === "hub" ? "bad" : "hl"}"/><text x="380" y="72" text-anchor="middle" class="s-t">${mode === "hub" ? "HUB (repetidor)" : "SWITCH (camada 2)"}</text>`;
    P.forEach((p, j) => {
      const px = 270 + j * 73; s += `<rect x="${px - 14}" y="88" width="28" height="16" rx="2" class="s-port ${last && last.out.includes(p[0]) ? "on" : last && last.src === p[0] ? "in" : ""}"/><text x="${px}" y="100" text-anchor="middle" class="s-s">${p[2]}</text>`;
      const st = !last ? "" : last.src === p[0] ? "s-acc" : last.out.includes(p[0]) ? (last.dst === p[0] || last.dst === "*" ? "s-okl" : "s-badl") : "s-line";
      s += `<path d="M${px},104 C${px},170 ${xs[j]},160 ${xs[j]},210" class="${st}"/>`;
      if (last && last.out.includes(p[0]) && !RM) s += `<circle r="5" class="s-dot"><animateMotion dur=".7s" begin=".5s" fill="freeze" path="M${px},104 C${px},170 ${xs[j]},160 ${xs[j]},210"/></circle>`;
      if (last && last.src === p[0] && !RM) s += `<circle r="5" class="s-dot"><animateMotion dur=".5s" fill="freeze" path="M${xs[j]},210 C${xs[j]},160 ${px},170 ${px},104"/></circle>`;
      const recv = last && last.out.includes(p[0]), ok = recv && (last.dst === p[0] || last.dst === "*");
      s += `<rect x="${xs[j] - 55}" y="210" width="110" height="52" rx="8" class="s-box ${ok ? "ok" : recv ? "bad" : last && last.src === p[0] ? "hl" : ""}"/><text x="${xs[j]}" y="232" text-anchor="middle" class="s-t">PC ${p[0]}</text><text x="${xs[j]}" y="250" text-anchor="middle" class="s-s">${p[1].slice(0, 8)}…</text>`;
      if (recv && !ok) s += `<text x="${xs[j]}" y="280" text-anchor="middle" class="s-s">descarta</text>`;
    });
    B.stage.innerHTML = s + `</svg>`;
    tbl.innerHTML = mode === "hub" ? `<table class="ltable"><caption>Hub não tem tabela</caption><tr><td class="muted">Repete tudo para todas as portas.</td></tr></table>` :
      `<table class="ltable"><caption>Tabela MAC do switch</caption><tr><th>MAC</th><th>Porta</th></tr>${Object.keys(table).length ? Object.entries(table).map(([m, pt]) => `<tr><td class="mono">${m}</td><td>${pt}</td></tr>`).join("") : `<tr><td colspan="2" class="muted">vazia: ainda não aprendeu nada</td></tr>`}</table>`;
    stats.innerHTML = `<span class="pill n">${sent} quadros enviados</span><span class="pill bad">${waste} cópias desnecessárias</span>`;
  }
  function send(){
    const src = so.value, dst = de.value; if (src === dst) { B.info.innerHTML = `<b class="k">Ops</b>Escolha um destino diferente da origem.`; return; }
    const sp = P.find(p => p[0] === src); let out, txt;
    const others = P.filter(p => p[0] !== src).map(p => p[0]);
    if (mode === "hub") { out = others; txt = `O hub repetiu o quadro para <strong>todas</strong> as portas. Quem não é o destino descarta, mas a banda foi gasta e todos dividem o mesmo domínio de colisão.`; }
    else {
      const learned = !table[sp[1]]; table[sp[1]] = sp[2];
      const dp = dst === "*" ? null : P.find(p => p[0] === dst);
      if (dst === "*") { out = others; txt = `Broadcast (FF:FF:FF:FF:FF:FF): o switch envia para todas as portas, exceto a de origem.`; }
      else if (table[dp[1]]) { out = [dst]; txt = `O switch encontrou ${dp[1].slice(0, 8)}… na porta ${dp[2]} e enviou <strong>só para lá</strong>.`; }
      else { out = others; txt = `O destino ainda não está na tabela: o switch faz <strong>inundação</strong> (envia para todas as portas, menos a de origem). Quando ${dst} responder, ele aprende.`; }
      if (learned) txt = `Aprendeu: ${sp[1].slice(0, 8)}… está na porta ${sp[2]}. ` + txt;
    }
    sent++; waste += out.filter(o => o !== dst && dst !== "*").length;
    last = {src, dst, out}; draw(); B.info.innerHTML = `<b class="k">Quadro de ${src} para ${dst === "*" ? "todos" : dst}</b>${txt}`;
  }
  const tbl = h("div", {class:"side-table"}), stats = h("div", {class:"score"});
  B.ctrls.append(so, de, h("button", {class:"btn primary", onclick: send}, "Enviar quadro"), seg([["switch","Switch"],["hub","Hub"]], "switch", m => { mode = m; last = null; draw(); }), h("button", {class:"btn small", onclick: () => { table = {}; last = null; sent = 0; waste = 0; draw(); }}, "Limpar tabela"));
  B.f.insertBefore(tbl, B.info); B.f.insertBefore(stats, B.info); draw();
  B.info.innerHTML = `<b class="k">Experimente</b>No switch, envie de A para C duas vezes e depois de C para A. Compare com o hub.`;
};

/* m5 · ARP */
LAB.arp = el => flowStepper(el, {
  title: "ARP: o megafone que descobre o MAC", cap: "O computador A conhece o IP de B, mas precisa do **MAC** para montar o quadro. Veja a pergunta em broadcast e a resposta direta.",
  H: 300,
  nodes: { a:{x:110,y:70,label:"PC A",sub:"192.168.1.10"}, sw:{x:380,y:150,label:"Switch",sub:"LAN"}, b:{x:650,y:70,label:"PC B",sub:"192.168.1.20"}, c:{x:110,y:240,label:"PC C",sub:"192.168.1.30"}, d:{x:650,y:240,label:"PC D",sub:"192.168.1.40"} },
  variants: [{label:"ARP", steps:[
    {t:"1 · Consulta a tabela", hl:["a"], text:"A quer enviar para 192.168.1.20. Olha sua tabela ARP (`arp -a`): não tem o MAC de B."},
    {t:"2 · Pergunta em broadcast", arrows:[["a","sw","Quem tem .20?"],["sw","b"],["sw","c"],["sw","d"]], text:"A grita para toda a LAN: “Quem tem o IP 192.168.1.20? Diga seu MAC”. O switch repassa o broadcast para todas as portas."},
    {t:"3 · Só B responde", arrows:[["b","sw","Sou eu: BB:BB…"],["sw","a"]], bad:["c","d"], text:"C e D veem que o IP não é deles e ignoram. B responde **diretamente** para A com o seu MAC."},
    {t:"4 · Guarda no cache", hl:["a"], text:"A salva o par 192.168.1.20 ↔ BB:BB:BB:BB:BB:BB na tabela ARP. Na próxima vez, não precisa perguntar."},
    {t:"5 · Quadro unicast", arrows:[["a","sw","quadro p/ BB:BB…"],["sw","b"]], ok:["b"], text:"Agora A monta o quadro com MAC de destino BB:BB:BB:BB:BB:BB e o switch entrega só para B."}]}],
  side: (v, i) => `<table class="ltable"><caption>Tabela ARP do PC A</caption><tr><th>IP</th><th>MAC</th></tr><tr><td>192.168.1.1</td><td class="mono">00:1A:2B:3C:4D:5E</td></tr>${i >= 3 ? `<tr><td class="ok">192.168.1.20</td><td class="mono ok">BB:BB:BB:BB:BB:BB</td></tr>` : `<tr><td class="muted">192.168.1.20</td><td class="muted">?</td></tr>`}</table>`
});

/* m6 · Crimpagem T568B */
LAB.crimp = el => {
  const B = labBox(el, "Bancada de crimpagem", "Toque nos fios na ordem do pino 1 ao 8 para montar o conector. Toque num pino já preenchido para tirar o fio. Depois, **teste o cabo**.");
  const W = {"bl":["Branco-laranja","#E8811F",1],"l":["Laranja","#E8811F",0],"bv":["Branco-verde","#2E9E4F",1],"v":["Verde","#2E9E4F",0],"ba":["Branco-azul","#1F5135",1],"a":["Azul","#1F5135",0],"bm":["Branco-marrom","#7A4B2A",1],"m":["Marrom","#7A4B2A",0]};
  const STD = {B:["bl","l","bv","a","ba","v","bm","m"], A:["bv","v","bl","a","ba","l","bm","m"]};
  let std = "B", slots = Array(8).fill(null), tested = false, tries = 0; const id = "cr" + (++LABN);
  const shuf = () => Object.keys(W).sort(() => Math.random() - .5); let order = shuf();
  const pal = h("div", {class:"wires"});
  function fill(k){ const w = W[k]; return w[2] ? `url(#${id}${k})` : w[1]; }
  function draw(){
    let s = `<svg viewBox="0 0 760 270" role="img" aria-label="Conector RJ-45 com 8 pinos"><defs>${Object.entries(W).filter(([, w]) => w[2]).map(([k, w]) => `<pattern id="${id}${k}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="10" height="10" fill="#F4F4F2"/><rect width="10" height="4" fill="${w[1]}"/></pattern>`).join("")}</defs>`;
    s += `<rect x="240" y="20" width="280" height="150" rx="10" class="s-box"/><rect x="330" y="170" width="100" height="18" rx="3" class="s-box"/><text x="380" y="210" text-anchor="middle" class="s-s">clipe para baixo · pinos 1 a 8 da esquerda para a direita</text>`;
    slots.forEach((k, j) => {
      const x = 262 + j * 31;
      s += `<g class="s-click" data-j="${j}" tabindex="0" role="button" aria-label="Pino ${j + 1}${k ? ": " + W[k][0] : " vazio"}"><rect x="${x}" y="34" width="22" height="122" rx="3" ${k ? `fill="${fill(k)}" stroke="#555" stroke-width="0.6"` : `class="s-slot"`}/><text x="${x + 11}" y="30" text-anchor="middle" class="s-s">${j + 1}</text></g>`;
      if (tested) { const ok = k === STD[std][j]; s += `<circle cx="${x + 11}" cy="240" r="9" class="${ok ? "led-ok" : "led-bad"}"/><text x="${x + 11}" y="264" text-anchor="middle" class="s-s">${j + 1}</text>`; }
    });
    if (!tested) s += `<text x="380" y="245" text-anchor="middle" class="s-s">testador: LEDs aparecem após o teste</text>`;
    B.stage.innerHTML = s + `</svg>`;
    B.stage.querySelectorAll("[data-j]").forEach(g => { const j = +g.dataset.j; const go = () => { slots[j] = null; tested = false; draw(); }; g.addEventListener("click", go); g.addEventListener("keydown", ev => { if (ev.key === "Enter") go(); }); });
    pal.innerHTML = "";
    order.map(k => [k, W[k]]).forEach(([k, w]) => { const b = h("button", {class:"wire", style:`--c:${w[1]}`, "data-s": w[2] ? "1" : "0", onclick: () => { const e = slots.indexOf(null); if (e < 0) return; slots[e] = k; tested = false; draw(); }}, `<span class="sw"></span>${w[0]}`); b.disabled = slots.includes(k); pal.append(b); });
  }
  function test(){
    if (slots.includes(null)) { B.info.innerHTML = `<b class="k">Faltam fios</b>Preencha os 8 pinos antes de testar.`; return; }
    tested = true; tries++; draw();
    const wrong = slots.map((k, j) => k === STD[std][j] ? null : j + 1).filter(Boolean);
    B.info.innerHTML = wrong.length ? `<b class="k bad">Cabo reprovado · tentativa ${tries}</b>LEDs com problema: pinos ${wrong.join(", ")}. Corte a ponta e refaça. ${tries >= 2 ? `<br>Padrão T568${std}: ${STD[std].map((k, j) => `${j + 1} ${W[k][0]}`).join(" · ")}` : ""}` :
      `<b class="k ok">Cabo aprovado no padrão T568${std}</b>Os 8 LEDs acenderam em sequência. Se a outra ponta usar o mesmo padrão, é um <strong>cabo direto</strong> (PC–switch). T568A numa ponta e T568B na outra formam um <strong>cabo cruzado</strong>.`;
  }
  B.ctrls.append(h("button", {class:"btn primary", onclick: test}, "Testar cabo"), h("button", {class:"btn small", onclick: () => { slots = Array(8).fill(null); tested = false; order = shuf(); draw(); }}, "Cortar e recomeçar"), seg([["B","Meta: T568B"],["A","Meta: T568A"]], "B", v => { std = v; tested = false; draw(); }));
  B.f.insertBefore(pal, B.ctrls); draw();
  B.info.innerHTML = `<b class="k">Dica</b>No T568B, os pares laranja ficam nos pinos 1 e 2. O T568B é o mais usado no Brasil.`;
};

/* m6 · Cortes dos cabos */
LAB.cables = el => {
  const B = labBox(el, "Por dentro dos cabos", "Escolha o cabo e toque em cada camada do corte para saber para que ela serve.");
  const C = {
    coax: {n:"Cabo coaxial", spec:"Até centenas de Mbps · centenas de metros · boa imunidade a EMI · TV a cabo e internet banda larga", L:[[100,"capa","Capa externa (jaqueta)","Plástico que protege o cabo."],[84,"malha","Malha metálica","Blindagem contra interferência eletromagnética."],[66,"diel","Isolamento dielétrico","Separa o condutor central da malha."],[18,"cu","Condutor central de cobre","Por onde passa o sinal elétrico."]]},
    utp: {n:"Par trançado (UTP)", spec:"Até 10 Gbps+ · até 100 m · imunidade baixa (UTP) a boa (STP) · LANs Ethernet", L:[[100,"capa","Capa externa","Protege os 4 pares. No STP há também blindagem metálica."],[0,"pares","4 pares trançados","Cada par é trançado para cancelar interferência e diafonia (crosstalk). São 8 fios para os 8 pinos do RJ-45."]]},
    fibra: {n:"Fibra óptica", spec:"Até Tbps · quilômetros · imunidade total a EMI · backbones e longa distância", L:[[100,"capa","Capa protetora","Protege a fibra, que é frágil."],[56,"buf","Revestimento de proteção","Amortece e protege o vidro."],[30,"clad","Cladding (casca)","Reflete a luz de volta para o núcleo: reflexão interna total."],[9,"core","Núcleo de vidro","Por onde viaja a luz. Monomodo: 9 µm (dezenas de km). Multimodo: 50–62,5 µm (até 2 km)."]]}};
  let cur = "coax", sel = 0, multi = false;
  function draw(){
    const c = C[cur]; let s = `<svg viewBox="0 0 760 250" role="img" aria-label="Corte transversal do ${c.n}">`;
    const cx = 160, cy = 125;
    c.L.forEach((l, j) => {
      if (l[1] === "pares") {
        const cols = ["#E8811F","#2E9E4F","#1F5135","#7A4B2A"];
        cols.forEach((co, q) => { const a = q * Math.PI / 2 + Math.PI / 4, px = cx + Math.cos(a) * 45, py = cy + Math.sin(a) * 45; s += `<g class="s-click" data-j="${j}"><circle cx="${px - 10}" cy="${py}" r="12" fill="${co}" class="${sel === j ? "sel" : ""}"/><circle cx="${px + 10}" cy="${py}" r="12" fill="#F4F4F2" stroke="${co}" stroke-width="4"/></g>`; });
      } else {
        let r = l[0]; if (l[1] === "core" && multi) r = 22;
        s += `<circle cx="${cx}" cy="${cy}" r="${r}" data-j="${j}" class="s-click layer ${l[1]} ${sel === j ? "sel" : ""}"/>`;
      }
    });
    c.L.forEach((l, j) => { const y = 40 + j * 44; s += `<g class="s-click" data-j="${j}"><line x1="${cx + 105}" y1="${y}" x2="330" y2="${y}" class="${sel === j ? "s-acc" : "s-line"}"/><text x="340" y="${y + 4}" class="${sel === j ? "s-lbl" : "s-t"}">${esc(l[2])}</text></g>`; });
    if (cur === "fibra") { s += `<rect x="340" y="200" width="380" height="34" rx="17" class="s-box"/><rect x="350" y="209" width="360" height="16" rx="8" class="layer core"/><polyline points="352,217 392,210 432,224 472,210 512,224 552,210 592,224 632,210 672,224 706,217" class="s-acc"/><text x="530" y="196" text-anchor="middle" class="s-s">luz refletindo dentro do núcleo</text>`; }
    B.stage.innerHTML = s + `</svg>`;
    B.stage.querySelectorAll("[data-j]").forEach(g => g.addEventListener("click", () => { sel = +g.dataset.j; draw(); }));
    const l = c.L[sel]; B.info.innerHTML = `<b class="k">${esc(c.n)} · ${esc(l[2])}</b>${esc(l[3])}<br><span class="muted">${esc(c.spec)}</span>`;
  }
  const mm = h("label", {class:"chk"}); const cb = h("input", {type:"checkbox", id:"mm" + (++LABN)}); cb.addEventListener("change", () => { multi = cb.checked; draw(); }); mm.append(cb, document.createTextNode(" Fibra multimodo (núcleo mais grosso)"));
  B.ctrls.append(seg([["coax","Coaxial"],["utp","Par trançado"],["fibra","Fibra óptica"]], "coax", v => { cur = v; sel = 0; draw(); }), mm);
  draw();
};

/* p1 · Pirâmide Top-Down */
LAB.topdown = el => {
  const B = labBox(el, "A escada Top-Down", "Toque em cada degrau para ver as perguntas que ele responde, com o exemplo da Clínica Saúde Plena. No **Desafio**, coloque as etapas na ordem certa.");
  const S = [
    ["Metas e restrições","Por que a rede existe? O que o negócio quer e quais são os limites?","Meta: PEP rápido e teleconsultas estáveis; crescer 20%. Restrições: R$ 15.000 e obras fora do expediente."],
    ["Requisitos e desempenho","Quanto de banda, latência, jitter e disponibilidade cada aplicação exige?","PEP: latência ≤ 50 ms. Teleconsulta: 2 Mbps por sessão, latência ≤ 100 ms, jitter < 20 ms."],
    ["Rede existente e tráfego","Como está a rede hoje (baseline) e o que consome a banda?","Roteador doméstico, todos no mesmo Wi-Fi, 50 Mbps entregando 20 no pico, streaming e backups de dia."],
    ["Projeto lógico","Topologia, VLANs, endereçamento, segurança, QoS e protocolos.","VLANs para administração, teleconsulta e visitantes; QoS priorizando PEP e teleconsulta."],
    ["Projeto físico","Cabos, equipamentos, LAN e WAN.","Firewall/roteador profissional e link de fibra empresarial de 200 Mbps simétricos."],
    ["Testes e documentação","A rede atende aos requisitos? Está tudo registrado?","Testar latência do PEP e qualidade das teleconsultas; documentar VLANs, IPs e regras."]];
  let sel = 0, mode = "exp", seq = [], pool = []; const tid = "td" + (++LABN);
  function draw(){
    let s = `<svg viewBox="0 0 760 330" role="img" aria-label="Seis degraus da metodologia Top-Down">`;
    S.forEach((st, j) => {
      const y = 14 + j * 51, w = 300 + j * 70, x = 380 - w / 2;
      const on = mode === "exp" ? j === sel : seq.includes(j);
      s += `<g class="s-click" data-j="${j}" tabindex="0" role="button" aria-label="${mode === "exp" ? st[0] : "degrau " + (j + 1)}"><path d="M${x + 16},${y} h${w - 32} l16,44 h${-w} z" class="s-box ${on ? "hl" : ""}"/><text x="380" y="${y + 28}" text-anchor="middle" class="s-t">${mode === "exp" || seq.includes(j) ? (j + 1) + " · " + st[0] : (j + 1) + " · ?"}</text></g>`;
    });
    s += `<text x="30" y="30" class="s-lbl">começa aqui</text><line x1="40" y1="40" x2="40" y2="300" class="s-acc" marker-end="url(#${tid}a)"/>${defs(tid)}<text x="30" y="318" class="s-s">termina nos equipamentos e testes</text>`;
    B.stage.innerHTML = s + `</svg>`;
    B.stage.querySelectorAll("[data-j]").forEach(g => { const j = +g.dataset.j; const go = () => { if (mode === "exp") { sel = j; draw(); } }; g.addEventListener("click", go); g.addEventListener("keydown", ev => { if (ev.key === "Enter") go(); }); });
    if (mode === "exp") B.info.innerHTML = `<b class="k">Degrau ${sel + 1} · ${esc(S[sel][0])}</b>${esc(S[sel][1])}<br><span class="muted">Na clínica: ${esc(S[sel][2])}</span>`;
    else drawQuiz();
  }
  const qbox = h("div", {class:"chips"});
  function drawQuiz(){
    qbox.innerHTML = ""; qbox.hidden = false;
    pool.forEach(j => qbox.append(h("button", {class:"btn small", onclick: () => {
      const need = seq.length;
      if (j === need) { seq.push(j); pool = pool.filter(x => x !== j); B.info.innerHTML = seq.length === S.length ? `<b class="k ok">Ordem correta!</b>Primeiro o negócio, por último os equipamentos e os testes. Esse é o Top-Down.` : `<b class="k ok">Certo</b>Qual é a etapa ${seq.length + 1}?`; }
      else B.info.innerHTML = `<b class="k bad">Ainda não</b>“${esc(S[j][0])}” vem depois. Qual etapa vem logo após “${seq.length ? esc(S[seq.length - 1][0]) : "o início"}”?`;
      draw();
    }}, esc(S[j][0]))));
  }
  B.ctrls.append(seg([["exp","Explorar"],["quiz","Desafio: ordenar"]], "exp", m => { mode = m; if (m === "quiz") { seq = []; pool = S.map((_, j) => j).sort(() => Math.random() - .5); B.info.innerHTML = `<b class="k">Desafio</b>Toque nas etapas na ordem em que acontecem num projeto Top-Down.`; } else qbox.hidden = true; draw(); }));
  B.f.insertBefore(qbox, B.info); qbox.hidden = true; draw();
};

/* p1 · Parâmetros de desempenho */
LAB.perf = el => {
  const B = labBox(el, "Bancada de desempenho", "Escolha a aplicação e mexa nos controles. O gráfico mostra 30 medições de latência; a lista diz se a rede atende aos requisitos.");
  const APP = {
    video:{n:"Videoconferência HD", users:true, req:{bw:5, lat:150, jit:30, loss:1}, note:"5 Mbps por usuário, latência ≤ 150 ms, jitter ≤ 30 ms, perda < 1%."},
    tele:{n:"Teleconsulta (clínica)", users:true, req:{bw:2, lat:100, jit:20}, note:"2 Mbps por consulta, latência ≤ 100 ms, jitter < 20 ms."},
    pep:{n:"Prontuário eletrônico (PEP)", req:{lat:50}, note:"Latência máxima de 50 ms até o servidor na nuvem."},
    backup:{n:"Backup noturno de 200 GB", req:{thr:74}, note:"Precisa caber em 6 horas: 200 GB × 8 ÷ 21.600 s ≈ 74 Mbps de vazão. Latência quase não importa."}};
  const id = "pf" + (++LABN);
  const ctl = {bw:[ "Largura de banda (Mbps)", 10, 1000, 100, 10], occ:["Ocupação da rede (%)", 0, 90, 40, 5], lat:["Latência média (ms)", 5, 300, 40, 5], jit:["Jitter (ms)", 0, 80, 10, 1], loss:["Perda de pacotes (%)", 0, 5, 0.5, 0.1], users:["Usuários simultâneos", 1, 40, 10, 1]};
  const v = {}; let app = "video"; const box = h("div", {class:"sliders"});
  Object.entries(ctl).forEach(([k, c]) => { v[k] = c[3]; const r = h("input", {type:"range", id:id + k, min:c[1], max:c[2], step:c[4], value:c[3]}); const o = h("output", {for:id + k}, String(c[3])); r.addEventListener("input", () => { v[k] = +r.value; o.textContent = r.value; draw(); }); const lab = h("label", {for:id + k}, c[0]); const row = h("div", {class:"srow"}); row.append(lab, r, o); box.append(row); });
  const appSel = h("select", {id:id + "app", "aria-label":"Aplicação"}); Object.entries(APP).forEach(([k, a]) => appSel.append(h("option", {value:k}, a.n))); appSel.addEventListener("change", () => { app = appSel.value; draw(); });
  function draw(){
    const thr = v.bw * (1 - v.occ / 100), per = thr / v.users;
    let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const pts = Array.from({length:30}, () => Math.max(1, v.lat + (rnd() * 2 - 1) * v.jit));
    const maxY = 340; const X = j => 60 + j * 22, Y = l => 210 - Math.min(l, maxY) / maxY * 150;
    let s = `<svg viewBox="0 0 760 240" role="img" aria-label="Rodovia de banda e gráfico de latência">`;
    // rodovia
    const lanes = Math.max(1, Math.min(8, Math.round(Math.log2(v.bw / 10)) + 1)), lw = 12;
    s += `<text x="20" y="18" class="s-s">largura de banda = pistas · vazão = carros que passam</text>`;
    for (let q = 0; q < lanes; q++) { const y = 28 + q * lw; s += `<rect x="20" y="${y}" width="720" height="${lw - 2}" class="lane"/>`; const cars = Math.round(18 * v.occ / 100); for (let c = 0; c < cars; c++) s += `<rect x="${30 + ((c * 41 + q * 17) % 700)}" y="${y + 2}" width="14" height="${lw - 6}" rx="2" class="car"/>`; }
    // gráfico de latência
    const gy = 28 + lanes * lw + 8;
    const scale = l => gy + 10 + (1 - Math.min(l, maxY) / maxY) * (220 - gy - 10);
    s += `<line x1="56" y1="${scale(0)}" x2="720" y2="${scale(0)}" class="s-line"/>`;
    const req = APP[app].req;
    if (req.lat) s += `<line x1="56" y1="${scale(req.lat)}" x2="720" y2="${scale(req.lat)}" class="s-badl" stroke-dasharray="5 4"/><text x="720" y="${scale(req.lat) - 4}" text-anchor="end" class="s-s">limite ${req.lat} ms</text>`;
    s += `<polyline points="${pts.map((l, j) => `${X(j)},${scale(l)}`).join(" ")}" class="s-acc"/>${pts.map((l, j) => `<circle cx="${X(j)}" cy="${scale(l)}" r="2.6" class="s-dot"/>`).join("")}<text x="20" y="${scale(0) + 4}" class="s-s">0 ms</text><text x="20" y="${gy + 14}" class="s-s">${maxY} ms</text>`;
    B.stage.innerHTML = s + `</svg>`;
    const a = APP[app], ch = [];
    ch.push(["Vazão real", `${thr.toFixed(0)} Mbps (${v.bw} × ${(1 - v.occ / 100).toFixed(2)})`, null]);
    if (req.bw) ch.push([`Banda por usuário ≥ ${req.bw} Mbps`, `${per.toFixed(1)} Mbps`, per >= req.bw]);
    if (req.thr) ch.push([`Vazão ≥ ${req.thr} Mbps`, `${thr.toFixed(0)} Mbps`, thr >= req.thr]);
    if (req.lat) ch.push([`Latência ≤ ${req.lat} ms`, `${v.lat} ms (pico ${Math.max(...pts).toFixed(0)})`, v.lat <= req.lat]);
    if (req.jit != null) ch.push([`Jitter ≤ ${req.jit} ms`, `${v.jit} ms`, v.jit <= req.jit]);
    if (req.loss != null) ch.push([`Perda < ${req.loss}%`, `${v.loss}%`, v.loss < req.loss]);
    const all = ch.filter(c => c[2] !== null).every(c => c[2]);
    B.info.innerHTML = `<b class="k ${all ? "ok" : "bad"}">${esc(a.n)} · ${all ? "a rede atende" : "a rede não atende"}</b><span class="muted">${esc(a.note)}</span><ul class="checks">${ch.map(c => `<li class="${c[2] === null ? "" : c[2] ? "ok" : "bad"}">${c[2] === null ? "•" : c[2] ? "✓" : "✕"} ${esc(c[0])}: <strong>${esc(c[1])}</strong></li>`).join("")}</ul>`;
    box.querySelector(`#${id}users`).closest(".srow").hidden = !a.users;
  }
  B.ctrls.append(appSel); B.f.insertBefore(box, B.info); draw();
};

/* p2 · Simulador de topologias com falhas */
LAB.topology = el => {
  const B = labBox(el, "Derrube a rede: estrela, malha e barramento", "Toque num equipamento ou num cabo para simular uma falha. Veja quantos dispositivos continuam se comunicando em cada topologia.");
  let topo = "star", down = new Set();
  const cx = 380, cy = 150, R = 115;
  const ring = Array.from({length:6}, (_, j) => { const a = -Math.PI / 2 + j * Math.PI / 3; return [cx + Math.cos(a) * R * 1.5, cy + Math.sin(a) * R]; });
  function model(){
    if (topo === "star") return {nodes: ring.map((p, j) => ({id:"n" + j, x:p[0], y:p[1], l:"PC " + (j + 1)})).concat([{id:"c", x:cx, y:cy, l:"Switch", core:true}]), links: ring.map((_, j) => ["n" + j, "c"])};
    if (topo === "mesh") return {nodes: ring.map((p, j) => ({id:"n" + j, x:p[0], y:p[1], l:"Roteador " + (j + 1)})), links: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,3],[1,4],[2,5]].map(([a, b]) => ["n" + a, "n" + b])};
    const xs = Array.from({length:6}, (_, j) => 110 + j * 108);
    return {bus:true, nodes: xs.map((x, j) => ({id:"n" + j, x, y: j % 2 ? 230 : 70, l:"PC " + (j + 1), tap:[x, 150]})), links: xs.slice(0, -1).map((x, j) => ["t" + j, "t" + (j + 1)])};
  }
  function reach(m){
    if (m.bus) { const ok = ![...down].some(d => d.startsWith("L")); return m.nodes.map(n => ok && !down.has(n.id)); }
    const alive = m.nodes.filter(n => !down.has(n.id)), adj = {};
    m.links.forEach(([a, b], j) => { if (down.has("L" + j) || down.has(a) || down.has(b)) return; (adj[a] = adj[a] || []).push(b); (adj[b] = adj[b] || []).push(a); });
    const ends = alive.filter(n => !n.core); if (!ends.length) return m.nodes.map(() => false);
    // maior componente entre dispositivos finais
    let best = new Set();
    ends.forEach(st => { const seen = new Set([st.id]), q = [st.id]; while (q.length) { const u = q.shift(); (adj[u] || []).forEach(w => { if (!seen.has(w)) { seen.add(w); q.push(w); } }); } const e = [...seen].filter(x => ends.some(n => n.id === x)); if (e.length > best.size) best = new Set(e); });
    return m.nodes.map(n => !n.core && best.size > 1 && best.has(n.id));
  }
  function draw(){
    const m = model(), ok = reach(m), ends = m.nodes.filter(n => !n.core);
    const pos = id => { if (id.startsWith("t")) { const n = m.nodes[+id.slice(1)]; return n.tap; } const n = m.nodes.find(x => x.id === id); return [n.x, n.y]; };
    let s = `<svg viewBox="0 0 760 300" role="img" aria-label="Topologia ${topo}">`;
    if (m.bus) { s += `<rect x="96" y="146" width="568" height="8" rx="4" class="s-box"/>`; m.nodes.forEach(n => s += `<line x1="${n.x}" y1="${n.y}" x2="${n.tap[0]}" y2="150" class="s-ink"/>`); }
    m.links.forEach(([a, b], j) => { const [x1, y1] = pos(a), [x2, y2] = pos(b), dn = down.has("L" + j);
      s += `<g class="s-click" data-id="L${j}" tabindex="0" role="button" aria-label="cabo ${j + 1}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="hit"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${dn ? "s-badl" : m.bus ? "s-ink" : "s-ink"}" ${dn ? 'stroke-dasharray="6 5"' : ""}/>${dn ? `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 + 5}" text-anchor="middle" class="s-x">✕</text>` : ""}</g>`; });
    m.nodes.forEach((n, j) => { const dn = down.has(n.id), cls = dn ? "bad" : n.core ? "hl" : ok[j] ? "ok" : "bad";
      s += `<g class="s-click" data-id="${n.id}" tabindex="0" role="button" aria-label="${n.l}"><rect x="${n.x - 46}" y="${n.y - 20}" width="92" height="40" rx="8" class="s-box ${cls}"/><text x="${n.x}" y="${n.y + 5}" text-anchor="middle" class="s-t">${dn ? "✕ " : ""}${n.l}</text></g>`; });
    B.stage.innerHTML = s + `</svg>`;
    B.stage.querySelectorAll("[data-id]").forEach(g => { const t = () => { const k = g.dataset.id; down.has(k) ? down.delete(k) : down.add(k); draw(); }; g.addEventListener("click", t); g.addEventListener("keydown", ev => { if (ev.key === "Enter") t(); }); });
    const n = ok.filter(Boolean).length, tot = ends.length;
    const why = {star:"Na estrela, a falha de um PC ou de um cabo afeta só aquele PC. Mas se o switch central cair, ninguém se comunica.", mesh:"Na malha, há vários caminhos: é preciso derrubar muitos cabos para isolar alguém. Por isso é usada em ambientes críticos.", bus:"No barramento, todos dividem o mesmo cabo: qualquer rompimento no cabo principal derruba a rede inteira."}[topo];
    B.info.innerHTML = `<b class="k ${n === tot ? "ok" : "bad"}">${n} de ${tot} dispositivos ainda se comunicam</b>${why}`;
  }
  B.ctrls.append(seg([["star","Estrela"],["mesh","Malha"],["bus","Barramento"]], "star", t => { topo = t; down.clear(); draw(); }), h("button", {class:"btn small", onclick: () => { down.clear(); draw(); }}, "Consertar tudo"));
  draw();
};

/* p2 · Zonas de segurança: firewall, DMZ, VLAN, VPN, NAT */
LAB.zones = el => {
  const B = labBox(el, "Quem pode falar com quem?", "Escolha a origem e o destino e veja o caminho pelo firewall. Cada regra mostra um conceito: **DMZ, VLAN, NAT e VPN**.");
  const Z = {inet:["Internet",380,30], vpn:["Contador em casa (VPN)",640,30], dmz:["DMZ · site da clínica",640,150], adm:["VLAN 10 · Administração",120,250], med:["VLAN 20 · Médicos (PEP)",380,270], vis:["VLAN 30 · Wi-Fi visitantes",640,260]};
  const RULE = (o, d) => {
    if (o === d) return [null, "Escolha zonas diferentes."];
    if (d === "inet") return o === "vis" ? [true, "Visitantes podem navegar, com limite de banda. O **NAT** troca o IP privado pelo IP público da clínica."] : o === "vpn" ? [true, "O contador já está na internet; o túnel VPN serve para entrar na rede da clínica."] : o === "dmz" ? [true, "O servidor da DMZ pode buscar atualizações na internet."] : [true, "Saída permitida. O **NAT** faz todos os computadores internos usarem um único IP público."];
    if (o === "inet") return d === "dmz" ? [true, "Permitido só na porta 443 (HTTPS): o site é público e por isso fica na **DMZ**, separado da rede interna."] : d === "vpn" ? [null, "O contador acessa a clínica, não o contrário."] : [false, "Bloqueado. Conexões iniciadas da internet não entram nas VLANs internas. Além disso, o NAT esconde os IPs privados."];
    if (o === "dmz") return [false, "Bloqueado. Se o site for invadido, o invasor fica preso na **DMZ** e não chega à rede interna."];
    if (o === "vpn") return d === "adm" ? [true, "Permitido pelo túnel **VPN** criptografado: o contador acessa os arquivos da administração como se estivesse lá."] : [false, "Bloqueado. O contador só precisa da administração; o acesso é o mínimo necessário."];
    if (o === "vis") return d === "dmz" ? [true, "Permitido na porta 443, como qualquer visitante da internet."] : [false, "Bloqueado. A **VLAN** de visitantes é isolada: um paciente no Wi-Fi não alcança prontuários nem a administração."];
    if (o === "adm" && d === "med") return [false, "Bloqueado. As **VLANs** separam os setores; a administração não acessa o PEP."];
    if (o === "med" && d === "adm") return [true, "Permitido apenas para o serviço de impressão e agenda da recepção (regra específica no firewall)."];
    if (d === "dmz") return [true, "Permitido para atualizar o conteúdo do site (só a partir da rede interna)."];
    if (d === "vpn" || d === "vis") return [false, "Bloqueado. A rede interna não inicia conexões para dispositivos de visitantes ou remotos."];
    return [false, "Bloqueado por padrão: tudo o que não está permitido é negado."];
  };
  const id = "zn" + (++LABN);
  const so = h("select", {id:id + "o", "aria-label":"Origem"}), de = h("select", {id:id + "d", "aria-label":"Destino"});
  Object.entries(Z).forEach(([k, z]) => { so.append(h("option", {value:k}, "De: " + z[0])); de.append(h("option", {value:k}, "Para: " + z[0])); });
  so.value = "vis"; de.value = "med";
  function draw(){
    const o = so.value, d = de.value, [ok, why] = RULE(o, d), fw = [380, 150];
    let s = `<svg viewBox="0 0 760 300" role="img" aria-label="Firewall no centro com seis zonas">`;
    const vpnPath = `M${Z.vpn[1]},${Z.vpn[2] + 18} Q${Z.inet[1] + 80},70 ${fw[0] + 30},${fw[1] - 22}`;
    s += `<path d="${vpnPath}" class="tunnel"/>`;
    Object.entries(Z).forEach(([k, z]) => { if (k !== "vpn") s += `<line x1="${z[1]}" y1="${z[2]}" x2="${fw[0]}" y2="${fw[1]}" class="s-line"/>`; });
    if (ok !== null && o !== d) {
      const p1 = o === "vpn" ? vpnPath : `M${Z[o][1]},${Z[o][2]} L${fw[0]},${fw[1]}`;
      s += `<path d="${p1}" class="${ok ? "s-okl" : "s-acc"}"/>`;
      if (ok) s += `<line x1="${fw[0]}" y1="${fw[1]}" x2="${Z[d][1]}" y2="${Z[d][2]}" class="s-okl"/>`;
      if (!RM) s += `<circle r="5" class="s-dot"><animateMotion dur="1s" fill="freeze" path="${o === "vpn" ? vpnPath : p1}"/></circle>`;
    }
    s += `<rect x="${fw[0] - 62}" y="${fw[1] - 24}" width="124" height="48" rx="8" class="s-box ${ok === false ? "bad" : ok ? "ok" : "hl"}"/><text x="${fw[0]}" y="${fw[1] - 2}" text-anchor="middle" class="s-t">Firewall</text><text x="${fw[0]}" y="${fw[1] + 14}" text-anchor="middle" class="s-s">${ok === false ? "✕ bloqueou" : ok ? "✓ permitiu" : "regras"}</text>`;
    Object.entries(Z).forEach(([k, z]) => { const on = k === o || k === d; s += `<rect x="${z[1] - 95}" y="${z[2] - 18}" width="190" height="36" rx="${k === "inet" ? 18 : 8}" class="s-box ${on ? (k === d && ok === false ? "bad" : "hl") : ""}"/><text x="${z[1]}" y="${z[2] + 5}" text-anchor="middle" class="s-m">${esc(z[0])}</text>`; });
    s += `<text x="560" y="88" class="s-s">túnel VPN</text>`;
    B.stage.innerHTML = s + `</svg>`;
    B.info.innerHTML = `<b class="k ${ok === false ? "bad" : ok ? "ok" : ""}">${ok === false ? "Bloqueado" : ok ? "Permitido" : "—"}</b>${fmt(why)}`;
  }
  so.addEventListener("change", draw); de.addEventListener("change", draw);
  B.ctrls.append(so, de); draw();
};

/* p3 · Prédio com cabeamento estruturado */
LAB.building = el => {
  const B = labBox(el, "Raio-x do prédio da InovaTech", "Toque em cada parte da instalação para ver o que ela é. Use **Seguir um dado** para ver o caminho de um notebook do 2º andar até a internet.");
  const I = {
    rackP:["Rack principal 42U","Fica na sala de equipamentos climatizada do 1º andar. Concentra firewall, patch panel, switches e servidores."],
    fw:["Firewall / roteador","Liga a rede aos dois links de internet e aplica as regras de segurança."],
    pp1:["Patch panel","Painel onde terminam os cabos horizontais. Patch cords curtos ligam cada porta ao switch."],
    sw1:["Switch Gigabit PoE","Liga as estações a 1 Gbps e alimenta pelo cabo os telefones VoIP, as câmeras IP e os APs."],
    rack2:["Rack do 2º andar","Rack menor com patch panel e switch do andar."],
    bb:["Backbone vertical de fibra","Interliga os racks dos andares com altíssima velocidade e imunidade a interferência."],
    hz:["Cabeamento horizontal Cat6a","Do rack do andar até as tomadas das mesas. Cat6a suporta 10 Gbps em até 100 m; é investimento para 10 a 15 anos."],
    to:["Tomada de telecomunicações","Ponto na área de trabalho. Na InovaTech, duas tomadas por mesa."],
    pc:["Patch cord da mesa","Cordão de manobra que liga a tomada ao computador."],
    ap:["Ponto de acesso Wi-Fi 6","Preso no teto e alimentado por PoE. Há uma rede separada para visitantes."],
    cam:["Câmera IP","Alimentada por PoE: dispensa tomada elétrica no ponto."],
    tel:["Telefone VoIP","Também alimentado por PoE pelo switch."],
    lk:["Links de internet","Fibra de 1 Gbps como principal e rádio de 200 Mbps de outro provedor como backup (failover)."]};
  const PATH = ["pc","to","hz","rack2","bb","rackP","sw1","fw","lk"];
  let sel = "rackP", trace = false;
  function on(k){ return trace ? PATH.includes(k) : sel === k; }
  function g(k, inner){ return `<g class="s-click" data-k="${k}" tabindex="0" role="button" aria-label="${esc(I[k][0])}">${inner}</g>`; }
  function draw(){
    const c = k => on(k) ? "hl" : "", cab = k => on(k) ? "cab on" : "cab";
    let s = `<svg viewBox="0 0 760 360" role="img" aria-label="Corte de um prédio de dois andares com a rede">`;
    s += `<rect x="40" y="40" width="680" height="280" class="bld"/><line x1="40" y1="180" x2="720" y2="180" class="s-ink"/><line x1="20" y1="320" x2="740" y2="320" class="s-ink"/><text x="700" y="60" text-anchor="end" class="s-s">2º andar</text><text x="700" y="200" text-anchor="end" class="s-s">1º andar</text><rect x="55" y="190" width="160" height="125" class="room"/><text x="135" y="312" text-anchor="middle" class="s-s">sala de equipamentos</text>`;
    s += g("rack2", `<rect x="95" y="80" width="56" height="92" rx="3" class="s-box ${c("rack2")}"/><rect x="101" y="90" width="44" height="10" class="s-line"/><rect x="101" y="106" width="44" height="10" class="s-line"/><text x="123" y="76" text-anchor="middle" class="s-s">rack</text>`);
    s += g("rackP", `<rect x="95" y="200" width="56" height="104" rx="3" class="s-box ${c("rackP")}"/>`);
    s += g("fw", `<rect x="101" y="206" width="44" height="14" class="s-box ${c("fw")}"/><text x="123" y="217" text-anchor="middle" class="s-s">FW</text>`);
    s += g("pp1", `<rect x="101" y="226" width="44" height="14" class="s-box ${c("pp1")}"/><text x="123" y="237" text-anchor="middle" class="s-s">PP</text>`);
    s += g("sw1", `<rect x="101" y="246" width="44" height="14" class="s-box ${c("sw1")}"/><text x="123" y="257" text-anchor="middle" class="s-s">PoE</text>`);
    s += g("bb", `<line x1="160" y1="120" x2="160" y2="230" class="hit"/><path d="M151,120 H160 V230 H151" class="fiber ${on("bb") ? "on" : ""}"/><text x="168" y="160" class="s-s">fibra</text>`);
    s += g("hz", `<path d="M151,110 H600 M330,110 V158 M480,110 V158 M600,110 V158 M151,250 H560 M400,250 V292 M560,250 V292" class="hit"/><path d="M151,110 H600 M330,110 V158 M480,110 V158 M600,110 V158 M151,250 H560 M400,250 V292 M560,250 V292" class="${cab("hz")}"/>`);
    [[330,158],[480,158],[600,158],[400,292],[560,292]].forEach(([x, y]) => s += g("to", `<rect x="${x - 8}" y="${y}" width="16" height="12" rx="2" class="s-box ${c("to")}"/>`));
    s += g("pc", `<path d="M480,170 Q470,176 455,176" class="${cab("pc")}"/><rect x="420" y="160" width="36" height="22" rx="3" class="s-box ${c("pc")}"/><text x="438" y="196" text-anchor="middle" class="s-s">notebook</text>`);
    s += `<rect x="300" y="160" width="20" height="20" class="s-box"/><rect x="580" y="160" width="20" height="20" class="s-box"/><rect x="370" y="295" width="20" height="20" class="s-box"/>`;
    s += g("ap", `<path d="M330,110 V50 H420" class="${cab("ap")}"/><rect x="420" y="44" width="40" height="12" rx="6" class="s-box ${c("ap")}"/><text x="440" y="70" text-anchor="middle" class="s-s">AP</text>`);
    s += g("tel", `<rect x="574" y="296" width="28" height="18" rx="3" class="s-box ${c("tel")}"/><text x="588" y="290" text-anchor="middle" class="s-s">VoIP</text>`);
    s += g("cam", `<path d="M560,250 H680 V200" class="${cab("cam")}"/><rect x="668" y="188" width="26" height="14" rx="3" class="s-box ${c("cam")}"/><text x="681" y="216" text-anchor="middle" class="s-s">câmera</text>`);
    s += g("lk", `<path d="M95,213 H10" class="hit"/><path d="M95,213 H10" class="fiber ${on("lk") ? "on" : ""}"/><text x="14" y="206" class="s-s">fibra 1 Gbps</text><path d="M95,207 Q70,190 70,30" class="radio ${on("lk") ? "on" : ""}"/><path d="M62,22 L70,30 L78,22" class="s-ink"/><text x="80" y="28" class="s-s">rádio 200 Mbps</text>`);
    B.stage.innerHTML = s + `</svg>`;
    B.stage.querySelectorAll("[data-k]").forEach(x => { const go = () => { trace = false; sel = x.dataset.k; draw(); }; x.addEventListener("click", go); x.addEventListener("keydown", ev => { if (ev.key === "Enter") go(); }); });
    B.info.innerHTML = trace ? `<b class="k">Caminho de um dado</b>${PATH.map(k => esc(I[k][0])).join(" → ")}. Tudo segue a norma <strong>ABNT NBR 14565</strong> (e a ANSI/TIA-568).` : `<b class="k">${esc(I[sel][0])}</b>${esc(I[sel][1])}`;
  }
  B.ctrls.append(h("button", {class:"btn primary", onclick: () => { trace = !trace; draw(); }}, "Seguir um dado"));
  draw();
};

/* p3 · Escolha da WAN */
LAB.wan = el => {
  const B = labBox(el, "Matriz e filiais: qual WAN?", "Ajuste o cenário e compare as três tecnologias. O desenho muda conforme a opção escolhida.");
  const T = {ded:["Link dedicado de fibra",{custo:1, desempenho:5, garantia:5},"Conexão privada e exclusiva entre dois pontos. Máximo desempenho e confiabilidade; a opção mais cara."], mpls:["MPLS da operadora",{custo:2, desempenho:4, garantia:4},"Rede privada virtual dentro da operadora, com QoS. Ótima para filiais com VoIP e videoconferência."], vpn:["VPN site-to-site",{custo:5, desempenho:2, garantia:1},"Túnel criptografado sobre a internet. Melhor custo-benefício; o desempenho depende da internet, sem garantias."]};
  const id = "wn" + (++LABN);
  let tech = "mpls", fil = 3, crit = true, bud = "medio";
  const r = h("input", {type:"range", id:id + "f", min:1, max:6, value:3}); const ro = h("output", {for:id + "f"}, "3");
  r.addEventListener("input", () => { fil = +r.value; ro.textContent = r.value; draw(); });
  const cb = h("input", {type:"checkbox", id:id + "c"}); cb.checked = true; cb.addEventListener("change", () => { crit = cb.checked; draw(); });
  function rec(){ if (!crit) return "vpn"; if (bud === "baixo") return "vpn"; if (fil === 1 && bud === "alto") return "ded"; return "mpls"; }
  function draw(){
    const R = rec(); let s = `<svg viewBox="0 0 760 260" role="img" aria-label="Matriz ligada a ${fil} filiais por ${T[tech][0]}">`;
    s += `<rect x="30" y="100" width="130" height="56" rx="8" class="s-box hl"/><text x="95" y="124" text-anchor="middle" class="s-t">Matriz</text><text x="95" y="142" text-anchor="middle" class="s-s">Aracaju</text>`;
    const ys = Array.from({length:fil}, (_, j) => fil === 1 ? 128 : 30 + j * (200 / (fil - 1)));
    if (tech !== "ded") s += `<ellipse cx="380" cy="128" rx="120" ry="62" class="cloud"/><text x="380" y="124" text-anchor="middle" class="s-t">${tech === "mpls" ? "Rede da operadora" : "Internet pública"}</text><text x="380" y="142" text-anchor="middle" class="s-s">${tech === "mpls" ? "MPLS com QoS" : "sem garantias"}</text>`;
    ys.forEach((y, j) => {
      s += `<rect x="620" y="${y - 16}" width="120" height="32" rx="6" class="s-box"/><text x="680" y="${y + 5}" text-anchor="middle" class="s-m">Filial ${j + 1}</text>`;
      if (tech === "ded") s += `<path d="M160,128 C380,128 400,${y} 620,${y}" class="ded"/>`;
      else s += `<path d="M500,128 C560,128 560,${y} 620,${y}" class="${tech === "vpn" ? "tun" : "mpls"}"/>`;
    });
    if (tech !== "ded") s += `<path d="M160,128 H260" class="${tech === "vpn" ? "tun" : "mpls"}"/>`;
    if (tech === "vpn") s += `<text x="560" y="250" text-anchor="middle" class="s-s">tracejado = túnel criptografado</text>`;
    B.stage.innerHTML = s + `</svg>`;
    const t = T[tech], bar = (l, n, inv) => `<div class="bar2"><span>${l}</span><i style="--w:${n * 20}%" class="${inv ? "inv" : ""}"></i><b>${n}/5</b></div>`;
    const cost = tech === "ded" ? `cerca de ${fil} links ponto a ponto` : tech === "mpls" ? "contrato com a operadora por ponto" : "só a internet de cada unidade";
    B.info.innerHTML = `<b class="k">${esc(t[0])}${tech === R ? " · recomendada para este cenário" : ""}</b>${esc(t[2])}<div class="bars">${bar("Economia", t[1].custo)}${bar("Desempenho", t[1].desempenho)}${bar("Garantia (QoS)", t[1].garantia)}</div><span class="muted">Custo envolve: ${cost}. Recomendação para o cenário atual: <strong>${esc(T[R][0])}</strong>${R === "vpn" && crit ? " (com QoS local e link melhor na matriz, aceitando que a internet não garante desempenho)" : ""}.</span>`;
  }
  const fl = h("label", {for:id + "f", class:"chk"}, "Filiais "); fl.append(r, ro);
  const cl = h("label", {class:"chk"}); cl.append(cb, document.createTextNode(" Aplicações em tempo real (vendas, vídeo)"));
  B.ctrls.append(seg([["ded","Dedicado"],["mpls","MPLS"],["vpn","VPN"]], "mpls", v => { tech = v; draw(); }), fl, cl, seg([["baixo","Orçamento baixo"],["medio","Médio"],["alto","Alto"]], "medio", v => { bud = v; draw(); }));
  draw();
};

/* p4 · Mapa de calor Wi-Fi */
LAB.wifi = el => {
  const B = labBox(el, "Site survey da Galeria Conectada", "Toque na planta para instalar APs (até 5). Toque num AP para removê-lo. Passe o dedo ou o mouse para medir o sinal. Meta: **−65 dBm ou melhor** em todas as áreas.");
  const M = 20, Wm = 38, Hm = 21;
  const ZONES = [["Salão principal",0,0,20,21],["Sala de concreto A",20,0,29,10],["Sala de concreto B",29,0,38,10],["Jardim (externo)",20,10,38,21]];
  const WALLS = [[20,0,20,10,"concreto"],[29,0,29,10,"concreto"],[20,10,38,10,"concreto"],[20,10,20,21,"vidro"],[10,4,10,14,"divisória"]];
  const LOSS = {concreto:[12,16], vidro:[3,4], "divisória":[3,5]};
  let band = 0, aps = [];
  const cv = h("canvas", {width: 760, height: 420, "aria-label":"Planta da galeria com mapa de sinal", role:"img"});
  const dpr = Math.min(2, window.devicePixelRatio || 1); cv.width = 760 * dpr; cv.height = 420 * dpr; cv.style.width = "100%"; cv.style.maxWidth = "760px"; cv.style.aspectRatio = "760 / 420";
  const cx = cv.getContext("2d");
  function inter(a, b, c, d, e, f, g, hh){ const den = (a - c) * (f - hh) - (b - d) * (e - g); if (!den) return false; const t = ((a - e) * (f - hh) - (b - f) * (e - g)) / den, u = -((a - c) * (b - f) - (b - d) * (a - e)) / den; return t > 0 && t < 1 && u > 0 && u < 1; }
  function rssi(x, y){
    let best = -120;
    aps.forEach(([ax, ay]) => { const d = Math.max(1, Math.hypot(x - ax, y - ay)); let pl = (band ? 46 : 40) + 35 * Math.log10(d); WALLS.forEach(w => { if (inter(ax, ay, x, y, w[0], w[1], w[2], w[3])) pl += LOSS[w[4]][band]; }); best = Math.max(best, 17 - pl); });
    return best;
  }
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || "#888";
  function color(v){ return v >= -55 ? "rgba(35,150,90,.62)" : v >= -65 ? "rgba(80,190,120,.48)" : v >= -75 ? "rgba(230,180,40,.5)" : "rgba(210,70,60,.42)"; }
  function draw(){
    cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, 760, 420);
    cx.fillStyle = css("--panel-2"); cx.fillRect(0, 0, 760, 420);
    const stat = ZONES.map(() => [0, 0]);
    if (aps.length) for (let gx = 0; gx < Wm; gx += .5) for (let gy = 0; gy < Hm; gy += .5) {
      const v = rssi(gx + .25, gy + .25); cx.fillStyle = color(v); cx.fillRect(gx * M, gy * M, M / 2, M / 2);
      ZONES.forEach((z, k) => { if (gx >= z[1] && gx < z[3] && gy >= z[2] && gy < z[4]) { stat[k][1]++; if (v >= -65) stat[k][0]++; } });
    }
    cx.strokeStyle = css("--ink-2"); cx.lineWidth = 1; cx.strokeRect(.5, .5, 759, 419);
    WALLS.forEach(w => { cx.strokeStyle = w[4] === "concreto" ? css("--ink") : w[4] === "vidro" ? css("--blue") : css("--muted"); cx.lineWidth = w[4] === "concreto" ? 6 : 3; cx.setLineDash(w[4] === "vidro" ? [8, 5] : []); cx.beginPath(); cx.moveTo(w[0] * M, w[1] * M); cx.lineTo(w[2] * M, w[3] * M); cx.stroke(); });
    cx.setLineDash([]);
    cx.font = "600 13px " + css("--f-body"); cx.fillStyle = css("--ink"); cx.textAlign = "center";
    ZONES.forEach(z => cx.fillText(z[0], (z[1] + z[3]) / 2 * M, z[2] * M + 22));
    cx.font = "11px " + css("--f-mono"); cx.fillStyle = css("--ink-2"); cx.fillText("divisória", 10 * M + 34, 9 * M); cx.fillText("vidro", 20 * M - 22, 16 * M);
    aps.forEach(([x, y], k) => { cx.beginPath(); cx.arc(x * M, y * M, 11, 0, 7); cx.fillStyle = css("--accent"); cx.fill(); cx.fillStyle = css("--accent-ink"); cx.font = "700 11px " + css("--f-mono"); cx.fillText("AP" + (k + 1), x * M, y * M + 4); });
    if (!aps.length) { cx.font = "600 15px " + css("--f-body"); cx.fillStyle = css("--muted"); cx.fillText("Toque na planta para instalar o primeiro AP", 200, 240); }
    statBox.innerHTML = ZONES.map((z, k) => { const p = stat[k][1] ? Math.round(stat[k][0] / stat[k][1] * 100) : 0; return `<div class="zst ${p >= 95 ? "ok" : p >= 70 ? "mid" : "bad"}"><span>${z[0]}</span><b>${aps.length ? p + "%" : "—"}</b></div>`; }).join("") + `<div class="legend"><i style="background:rgba(35,150,90,.7)"></i>≥ −55 <i style="background:rgba(80,190,120,.6)"></i>−65 <i style="background:rgba(230,180,40,.6)"></i>−75 <i style="background:rgba(210,70,60,.55)"></i>pior</div>`;
  }
  function pt(ev){ const r = cv.getBoundingClientRect(); return [(ev.clientX - r.left) / r.width * Wm, (ev.clientY - r.top) / r.height * Hm]; }
  cv.addEventListener("click", ev => { const [x, y] = pt(ev); const k = aps.findIndex(a => Math.hypot(a[0] - x, a[1] - y) < 1); if (k >= 0) aps.splice(k, 1); else if (aps.length < 5) aps.push([x, y]); else { B.info.innerHTML = `<b class="k">Limite</b>Máximo de 5 APs. Remova um para reposicionar.`; return; } draw(); });
  cv.addEventListener("mousemove", ev => { if (!aps.length) return; const [x, y] = pt(ev); const v = rssi(x, y); B.info.innerHTML = `<b class="k">Medição no ponto (${x.toFixed(1)} m, ${y.toFixed(1)} m)</b><strong>${v.toFixed(0)} dBm</strong> · ${v >= -65 ? "bom para videochamada e áudio-guia" : v >= -75 ? "fraco: navega, mas oscila" : "zona morta"}. Faixa: ${band ? "5 GHz" : "2,4 GHz"}.`; });
  const statBox = h("div", {class:"zstats"});
  B.stage.append(cv);
  B.ctrls.append(seg([[0,"2,4 GHz"],[1,"5 GHz"]], 0, v => { band = v; draw(); }), h("button", {class:"btn small", onclick: () => { aps = [[6,6],[14,15],[24.5,5],[33.5,5],[29,16]]; draw(); B.info.innerHTML = `<b class="k">Proposta de survey preditivo</b>Dois APs no salão, um em cada sala de concreto (as paredes grossas bloqueiam muito) e um AP externo no jardim. Compare 2,4 e 5 GHz.`; }}, "Ver proposta"), h("button", {class:"btn small", onclick: () => { aps = []; draw(); }}, "Limpar APs"));
  B.f.insertBefore(statBox, B.ctrls);
  draw();
  B.info.innerHTML = `<b class="k">Experimente</b>Coloque um único AP no centro do salão e veja o que acontece nas salas de concreto. Depois troque para 5 GHz.`;
};

/* p4 · Segurança Wi-Fi */
LAB.wsec = el => {
  const B = labBox(el, "Proteja o roteador do Sr. Silva", "Configure o roteador e veja o escudo encher. Cada escolha explica o que ela protege, ou por que protege pouco.");
  const id = "ws" + (++LABN);
  const P = [["open","Aberta",0],["wep","WEP",4],["wpa","WPA",14],["wpa2","WPA2 (AES)",34],["wpa3","WPA3",40]];
  let prot = "open"; const pw = h("input", {type:"text", id:id + "p", placeholder:"senha do Wi-Fi", autocomplete:"off", "aria-label":"Senha do Wi-Fi"});
  const ops = [["guest","Rede de visitantes separada",15],["adm","Trocar a senha padrão do painel do roteador",10],["hide","Ocultar o SSID",2],["mac","Filtrar endereços MAC",3]];
  const st = {}; const opsBox = h("div", {class:"opts-col"});
  ops.forEach(([k, l]) => { const c = h("input", {type:"checkbox", id:id + k}); c.addEventListener("change", () => { st[k] = c.checked; draw(); }); const lab = h("label", {for:id + k, class:"chk"}); lab.append(c, document.createTextNode(" " + l)); opsBox.append(lab); });
  pw.addEventListener("input", draw);
  function pwScore(p){ if (!p) return [0, "sem senha"]; let c = 0; [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].forEach(r => { if (r.test(p)) c++; }); const weak = ["12345678","admin","senha123","password"].includes(p.toLowerCase()); if (weak) return [0, "senha óbvia, quebrada em segundos"]; const len = p.length; const s = Math.min(30, (len >= 12 ? 18 : len >= 8 ? 8 : 2) + c * 3); return [s, len >= 12 && c >= 3 ? "forte" : len >= 8 ? "média" : "fraca"]; }
  function draw(){
    const pr = P.find(p => p[0] === prot); const [ps, pl] = prot === "open" ? [0, "rede aberta não usa senha"] : pwScore(pw.value);
    let score = pr[2] + (prot === "open" ? 0 : ps) + ops.reduce((a, [k, , v]) => a + (st[k] ? v : 0), 0); score = Math.min(100, score);
    const col = score >= 80 ? "ok" : score >= 50 ? "mid" : "bad";
    let s = `<svg viewBox="0 0 760 200" role="img" aria-label="Escudo com ${score}% de proteção"><defs><clipPath id="${id}c"><path d="M110,20 L190,45 V105 C190,150 150,175 110,190 C70,175 30,150 30,105 V45 Z"/></clipPath></defs>`;
    s += `<path d="M110,20 L190,45 V105 C190,150 150,175 110,190 C70,175 30,150 30,105 V45 Z" class="s-box"/><rect x="20" y="${190 - score * 1.7}" width="180" height="${score * 1.7}" clip-path="url(#${id}c)" class="shield ${col}"/><path d="M110,20 L190,45 V105 C190,150 150,175 110,190 C70,175 30,150 30,105 V45 Z" fill="none" class="s-ink"/><text x="110" y="112" text-anchor="middle" class="s-big">${score}%</text>`;
    P.slice(1).forEach((p, j) => { const x = 260 + j * 120, hh = [20, 45, 100, 130][j], on = p[0] === prot; s += `<rect x="${x}" y="${170 - hh}" width="90" height="${hh}" rx="4" class="s-box ${on ? "hl" : ""}"/><text x="${x + 45}" y="188" text-anchor="middle" class="s-m">${p[1]}</text>`; });
    s += `<text x="260" y="24" class="s-s">mais fraco → mais forte</text>`;
    B.stage.innerHTML = s + `</svg>`;
    const fb = [];
    fb.push(prot === "open" ? ["bad","Rede aberta: qualquer pessoa entra e pode ver o tráfego."] : prot === "wep" ? ["bad","WEP é obsoleto: uma fechadura de brinquedo."] : prot === "wpa" ? ["mid","WPA melhorou o WEP, mas já tem vulnerabilidades conhecidas."] : prot === "wpa2" ? ["ok","WPA2 com AES: o mínimo recomendado, uma porta de cofre."] : ["ok","WPA3: o mais forte, resiste melhor a ataques de força bruta."]);
    if (prot !== "open") fb.push([ps >= 24 ? "ok" : ps >= 12 ? "mid" : "bad", `Senha ${pl}. Use 12 ou mais caracteres com maiúsculas, minúsculas, números e símbolos.`]);
    fb.push(st.guest ? ["ok","Visitantes isolados da rede da casa."] : ["mid","Sem rede de visitantes: quem recebe a senha vê todos os seus dispositivos."]);
    fb.push(st.adm ? ["ok","Painel do roteador protegido."] : ["mid","Senha padrão do painel (ex.: “admin”) é a primeira coisa que um invasor testa."]);
    if (st.hide) fb.push(["mid","Ocultar o SSID ajuda pouco: atacantes determinados encontram a rede."]);
    if (st.mac) fb.push(["mid","Filtro de MAC é uma camada extra, mas pode ser contornado."]);
    B.info.innerHTML = `<b class="k ${col}">Nível de proteção: ${score}%</b><ul class="checks">${fb.map(f => `<li class="${f[0]}">${f[0] === "ok" ? "✓" : f[0] === "mid" ? "!" : "✕"} ${esc(f[1])}</li>`).join("")}</ul>`;
  }
  const row = h("div", {class:"ctrls"}); row.append(pw);
  B.ctrls.append(seg(P.map(p => [p[0], p[1]]), "open", v => { prot = v; draw(); }));
  B.f.insertBefore(row, B.info); B.f.insertBefore(opsBox, B.info); draw();
};

/* p5 · Teste de failover */
LAB.failover = el => {
  const B = labBox(el, "Teste de failover: corte o link principal", "Corte o cabo do link principal e cronometre quanto tempo a rede leva para usar o backup. Critério do plano de testes: **até 5 segundos**.");
  let state = "normal", t0 = 0, timer = null, nobackup = false; const log = h("pre", {class:"term"}); const id = "fo" + (++LABN);
  const now = () => { const d = new Date(); return d.toTimeString().slice(0, 8); };
  function add(l){ log.textContent += `[${now()}] ${l}\n`; log.scrollTop = 1e6; }
  function draw(){
    const a = state === "normal", bk = state === "backup";
    const pA = "M330,130 C400,130 420,70 480,70 H600", pB = "M330,130 C400,130 420,190 480,190 H600", pL = "M60,130 H230";
    let s = `<svg viewBox="0 0 760 260" role="img" aria-label="Rede com link principal e link de backup">`;
    s += `<rect x="20" y="105" width="80" height="50" rx="8" class="s-box"/><text x="60" y="135" text-anchor="middle" class="s-t">LAN</text><path d="M100,130 H230" class="${state === "out" || state === "detect" ? "s-line" : "s-acc"}"/>`;
    s += `<rect x="230" y="105" width="100" height="50" rx="8" class="s-box ${state === "detect" ? "bad" : "hl"}"/><text x="280" y="128" text-anchor="middle" class="s-t">Firewall</text><text x="280" y="145" text-anchor="middle" class="s-s">${state === "detect" ? "detectando…" : "roteador"}</text>`;
    s += `<path d="${pA}" class="${a ? "s-acc" : "s-badl"}" ${a ? "" : 'stroke-dasharray="6 5"'}/><text x="480" y="60" text-anchor="middle" class="s-m">Link principal · fibra 1 Gbps · provedor A</text>${a ? "" : `<text x="455" y="88" class="s-x">✕</text>`}`;
    s += `<path d="${pB}" class="${bk ? "s-okl" : "s-line"}" ${nobackup ? 'stroke-dasharray="2 6"' : ""}/><text x="480" y="214" text-anchor="middle" class="s-m">${nobackup ? "Backup não configurado" : "Link de backup · rádio 200 Mbps · provedor B"}</text>`;
    s += `<ellipse cx="680" cy="130" rx="70" ry="50" class="cloud"/><text x="680" y="135" text-anchor="middle" class="s-t">Internet</text><path d="M600,70 C640,70 640,110 650,110 M600,190 C640,190 640,150 650,150" class="s-line"/>`;
    if (!RM && (a || bk)) { const p = a ? pA : pB; for (let q = 0; q < 3; q++) s += `<circle r="4" class="s-dot"><animateMotion dur="1.8s" begin="${q * .6}s" repeatCount="indefinite" path="M100,130 H230 M230,130 H330 ${p.slice(p.indexOf(" "))}"/></circle>`; }
    B.stage.innerHTML = s + `</svg>`;
    cut.disabled = state !== "normal"; rest.disabled = state === "normal";
  }
  const cut = h("button", {class:"btn primary", onclick: () => {
    state = "detect"; t0 = Date.now(); add("Teste iniciado: cabo do link principal desconectado."); add("Pacotes para a internet sem resposta…"); draw();
    B.info.innerHTML = `<b class="k bad">Link principal caiu</b>O firewall está percebendo que o provedor A não responde.`;
    timer = setTimeout(() => {
      const secs = ((Date.now() - t0) / 1000).toFixed(1);
      if (nobackup) { state = "out"; add("Nenhuma rota alternativa. Rede SEM internet."); B.info.innerHTML = `<b class="k bad">Teste REPROVADO</b>Sem link de backup configurado, a empresa fica fora do ar até o provedor consertar. O teste de failover revelou o problema antes que ele acontecesse de verdade.`; }
      else { state = "backup"; add(`Rota padrão trocada para o provedor B (rádio). Tempo de failover: ${secs} s.`); add("Usuários continuam navegando, com menos banda (200 Mbps)."); B.info.innerHTML = `<b class="k ok">Teste APROVADO · ${secs} s</b>O tráfego passou sozinho para o link de backup, dentro do critério de 5 s. Registre o resultado no plano de testes e na documentação.`; }
      draw();
    }, 3000);
  }}, "Cortar link principal");
  const rest = h("button", {class:"btn", onclick: () => { clearTimeout(timer); state = "normal"; add("Cabo reconectado. Tráfego volta ao link principal."); draw(); B.info.innerHTML = `<b class="k">Rede normal</b>Pronto para outro teste.`; }}, "Reconectar");
  const lab = h("label", {class:"chk"}); const cb = h("input", {type:"checkbox", id:id + "n"}); cb.addEventListener("change", () => { nobackup = cb.checked; if (state === "normal") draw(); }); lab.append(cb, document.createTextNode(" Simular rede sem backup"));
  B.ctrls.append(cut, rest, lab); B.f.append(log); draw();
  B.info.innerHTML = `<b class="k">Rede normal</b>O tráfego sai pelo link principal de fibra.`;
};

/* p5 · Console do plano de testes */
LAB.tests = el => {
  const B = labBox(el, "Execute o plano de testes da contabilidade", "Rode cada teste, leia a saída do terminal e **decida você** se passou ou falhou comparando com o resultado esperado.");
  const T = [
    ["Conectividade estação → servidor","ping 192.168.1.10","0% de perda",`Disparando 192.168.1.10 com 32 bytes de dados:\nResposta de 192.168.1.10: bytes=32 tempo<1ms TTL=128\nResposta de 192.168.1.10: bytes=32 tempo<1ms TTL=128\nResposta de 192.168.1.10: bytes=32 tempo<1ms TTL=128\nResposta de 192.168.1.10: bytes=32 tempo<1ms TTL=128\nPacotes: Enviados = 4, Recebidos = 4, Perdidos = 0 (0% de perda)`, true, "Conectividade confirmada."],
    ["Saída para a internet","ping 8.8.8.8","0% de perda, < 50 ms",`Resposta de 8.8.8.8: bytes=32 tempo=18ms TTL=117\nResposta de 8.8.8.8: bytes=32 tempo=17ms TTL=117\nResposta de 8.8.8.8: bytes=32 tempo=19ms TTL=117\nResposta de 8.8.8.8: bytes=32 tempo=18ms TTL=117\nPacotes: Enviados = 4, Recebidos = 4, Perdidos = 0 (0% de perda)`, true, "Internet funcionando com boa latência."],
    ["Resolução de nomes","nslookup sistema.contabil.example","retorna um IP",`Servidor:  roteador.local\nAddress:  192.168.1.1\n\nNome:    sistema.contabil.example\nAddress:  198.51.100.24`, true, "O DNS resolve o sistema online."],
    ["Desempenho da rede cabeada","iperf3 -c 192.168.1.10","≥ 900 Mbit/s",`Connecting to host 192.168.1.10, port 5201\n[ ID] Interval        Transfer     Bitrate\n[  5] 0.00-10.00 sec  1.10 GBytes   941 Mbits/sec   sender\n[  5] 0.00-10.00 sec  1.09 GBytes   939 Mbits/sec   receiver`, true, "Gigabit funcionando: o cabeamento não é gargalo."],
    ["Wi-Fi na sala de reunião","iperf3 -c 192.168.1.10   (notebook no Wi-Fi)","≥ 100 Mbit/s",`Sinal medido: -78 dBm\n[ ID] Interval        Transfer     Bitrate\n[  5] 0.00-10.00 sec  45.6 MBytes  38.2 Mbits/sec   sender`, false, "Reprovado: sinal fraco (−78 dBm). Ação: refazer o site survey e reposicionar ou acrescentar um AP perto da sala."],
    ["Segurança (varredura)","openvas --scan 192.168.1.0/24","nenhuma falha alta",`Varredura concluída: 23 hosts\nALTA   192.168.1.2  Switch com senha padrão de fábrica (admin/admin)\nMÉDIA  192.168.1.1  Interface de gerência acessível pelo Wi-Fi`, false, "Reprovado: trocar a senha padrão do switch, bloquear a gerência pelo Wi-Fi e guardar as senhas novas na documentação, de forma segura."]];
  const term = h("pre", {class:"term", "aria-live":"polite"}); const res = {}; const ans = {};
  const tb = h("div", {class:"tablewrap"});
  function draw(){
    let s = `<table class="rub tests"><thead><tr><th>Teste</th><th>Ferramenta</th><th>Esperado</th><th>Sua decisão</th></tr></thead><tbody>`;
    T.forEach((t, k) => {
      s += `<tr><td>${esc(t[0])}</td><td><code>${esc(t[1].split("   ")[0])}</code></td><td>${esc(t[2])}</td><td>${!res[k] ? `<button class="btn small" data-run="${k}">Executar</button>` : ans[k] === undefined ? `<button class="btn small" data-a="${k}:1">Passou</button> <button class="btn small" data-a="${k}:0">Falhou</button>` : `<span class="pill ${ans[k] === t[4] ? "ok" : "bad"}">${ans[k] === t[4] ? "✓ " : "✕ "}${t[4] ? "passou" : "falhou"}</span>`}</td></tr>`;
    });
    tb.innerHTML = s + `</tbody></table>`;
    tb.querySelectorAll("[data-run]").forEach(b => b.addEventListener("click", () => { const k = +b.dataset.run; res[k] = 1; term.textContent = `C:\\> ${T[k][1]}\n${T[k][3]}`; B.info.innerHTML = `<b class="k">Leia a saída</b>Esperado: <strong>${esc(T[k][2])}</strong>. O teste passou ou falhou?`; draw(); }));
    tb.querySelectorAll("[data-a]").forEach(b => b.addEventListener("click", () => { const [k, v] = b.dataset.a.split(":"); ans[k] = v === "1"; const t = T[k], ok = ans[k] === t[4]; B.info.innerHTML = `<b class="k ${ok ? "ok" : "bad"}">${ok ? "Decisão certa" : "Releia a saída"}</b>${esc(t[5])}`; draw(); if (Object.keys(ans).length === T.length) { const hit = T.filter((t, j) => ans[j] === t[4]).length; B.info.innerHTML += `<p style="margin:8px 0 0"><strong>Plano concluído:</strong> ${hit}/${T.length} decisões certas. Dois testes falharam, e por isso a rede não deve ser entregue ainda. Uma rede que só “pinga” não está pronta.</p>`; } }));
  }
  B.stage.append(tb); B.f.insertBefore(term, B.info);
  B.ctrls.append(h("button", {class:"btn small", onclick: () => { for (const k in res) delete res[k]; for (const k in ans) delete ans[k]; term.textContent = ""; draw(); B.info.innerHTML = `<b class="k">Recomeçar</b>Execute os testes de novo.`; }}, "Recomeçar plano"));
  draw(); B.info.innerHTML = `<b class="k">Como usar</b>Toque em <strong>Executar</strong> na primeira linha.`;
};

const hash = (location.hash || "").slice(1);
if (hash && (hash === "ranking" || COURSE.modulos.some(m => m.id === hash))) curMod = hash;
document.getElementById("b-eyebrow").textContent = COURSE.eyebrow;
document.getElementById("b-title").textContent = COURSE.titulo;
document.getElementById("b-sub").textContent = COURSE.autor;
render();
