/* Motor das disciplinas interativas — Prof. Eber Santana
 * Cada módulo é um arquivo dados/mN.js que chama FSI.modulo({...}). Este arquivo desenha tudo:
 * estudo (analogia, pontos-chave, lições, termos), diagramas clicáveis (rede, camadas, linha do tempo,
 * sequência animada), classificar, laboratório com simuladores e missões, exercícios guiados,
 * flashcards, verdadeiro/falso com justificativa, caderno e PBL (a resposta só aparece depois da tentativa),
 * XP e níveis, selos por módulo, desafio relâmpago e simulado.
 * Os simuladores ficam em labs.js e se registram com FSI.sim("nome", function (host, cfg, api) {...}).
 */
(function () {
  "use strict";
  var FSI = (window.FSI = { mods: {}, sims: {}, cfg: window.FSI_CFG || { disc: "fsi", nome: "Disciplina" } });
  FSI.modulo = function (d) { ["objetivos", "licoes", "visuais", "resumo", "glossario"].forEach(function (k) { if (!d[k]) d[k] = []; }); FSI.mods[d.n] = d; };
  function IDX() { return FSI.cfg.indice || "./"; }
  FSI.sim = function (nome, fn) { FSI.sims[nome] = fn; };

  /* ---------- utilidades ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function el(tag, attrs, html) { var e = document.createElement(tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }
  function plain(s) { return String(s).replace(/\n/g, " "); }
  function embaralha(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  FSI.util = { $: $, $$: $$, esc: esc, el: el, embaralha: embaralha };
  var uid = (function () { try { var p = JSON.parse(localStorage.getItem("perfil:aluno") || "null"); return p && p.id ? p.id : "anon"; } catch (e) { return "anon"; } })();
  function chave(n) { return "fsi:" + FSI.cfg.disc + ":" + uid + ":" + n; }
  function ler(n) { try { return JSON.parse(localStorage.getItem(chave(n)) || "null") || {}; } catch (e) { return {}; } }
  function resumo(n, s) { try { var dm = FSI.mods[n]; if (dm) { var c = FSI.contagem(dm, s); localStorage.setItem(chave(n) + ":sum", JSON.stringify({ f: c.feitas, t: c.total, p: c.pontos, ts: Date.now() })); } } catch (e) { } }
  function gravar(n, s) { try { localStorage.setItem(chave(n), JSON.stringify(s)); } catch (e) { } resumo(n, s); if (window.progressoMudou) try { window.progressoMudou(); } catch (e2) { } }
  FSI.ler = ler; FSI.gravar = gravar;
  /* Módulos liberados pelo professor (painel > Liberar conteúdo). As regras vêm da planilha e ficam em cache
     em "pt-visib" (progresso-turma.js). "o" = oculto; data = abre nesse dia. No modo ?professor tudo aparece. */
  function vis(n) {
    if (/[?&]professor\b/.test(location.search)) return "v";
    try {
      var pa = JSON.parse(localStorage.getItem("perfil:aluno") || "null"), o = JSON.parse(localStorage.getItem("pt-visib") || "null");
      if (!pa || !o || o.turma !== pa.turma || !o.r) return "v";
      var pasta = location.pathname.split("/").slice(-2)[0], v = o.r[pasta + "#" + n];
      if (v === "o") return "o";
      if (/^\d{4}-\d{2}-\d{2}$/.test(v || "")) { var d = new Date(), h = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); return h >= v ? "v" : v; }
    } catch (e) {}
    return "v";
  }
  FSI.vis = vis;
  window.addEventListener("visib:mudou", function () { location.reload(); });
  function ids() { return Object.keys(FSI.mods).map(Number).filter(function (n) { return vis(n) !== "o"; }).sort(function (a, b) { return a - b; }); }
  function recorde() { try { return +localStorage.getItem(chave("desafio-recorde")) || 0; } catch (e) { return 0; } }

  function passosGuiados(d) { var t = 0; ((d.lab && d.lab.guiados) || []).forEach(function (g) { t += g.passos.length; }); return t; }

  /* total de itens e feitos de um módulo (usado também pelo índice e pela barra lateral) */
  FSI.contagem = function (d, S) {
    S = S || ler(d.n);
    var pbl = 0, pblF = 0;
    (d.pbl || []).forEach(function (p, a) { p.passos.forEach(function (_, b) { pbl++; if (S.pbl && S.pbl[a + "." + b] && S.pbl[a + "." + b].ver) pblF++; }); });
    var fcF = Object.keys(S.fc || {}).length, vfF = Object.keys(S.vf || {}).length, cadF = 0;
    Object.keys(S.cad || {}).forEach(function (k) { if (S.cad[k].ver) cadF++; });
    var mis = (d.lab && d.lab.missoes) || [], miF = mis.filter(function (m) { return S.mi && S.mi[m.id]; }).length;
    var gdT = passosGuiados(d), gdF = 0, gdOk = 0;
    Object.keys(S.gd || {}).forEach(function (k) { var g = S.gd[k]; if (g.ok || g.rev) gdF++; if (g.ok) gdOk++; });
    var total = d.fc.length + d.vf.length + d.caderno.length + pbl + mis.length + gdT;
    var feitas = fcF + vfF + cadF + pblF + miF + gdF;
    var acertos = 0; Object.keys(S.vf || {}).forEach(function (k) { if (S.vf[k].ok) acertos++; });
    var autoOk = 0;
    Object.keys(S.cad || {}).forEach(function (k) { if (S.cad[k].av === 2) autoOk++; });
    Object.keys(S.pbl || {}).forEach(function (k) { if (S.pbl[k].av === 2) autoOk++; });
    var fcSei = 0; Object.keys(S.fc || {}).forEach(function (k) { if (S.fc[k] === 1) fcSei++; });
    var extras = (S.ex ? Object.keys(S.ex).length : 0);
    var pontos = fcF * 2 + fcSei * 2 + vfF * 3 + acertos * 5 + cadF * 4 + pblF * 4 + autoOk * 3 + extras * 5 + miF * 8 + gdOk * 5 + (gdF - gdOk);
    return { total: total, feitas: feitas, acertos: acertos, pontos: pontos, fc: [fcF, d.fc.length], vf: [vfF, d.vf.length], cad: [cadF, d.caderno.length], pbl: [pblF, pbl], lab: [miF + gdF, mis.length + gdT], mi: [miF, mis.length], gd: [gdF, gdT] };
  };

  /* XP, níveis e selos */
  var NIVEIS = ["Iniciante", "Aprendiz", "Praticante", "Avançado", "Especialista", "Mestre"];
  function nivel(xp) {
    var N = FSI.cfg.niveis || NIVEIS, passo = FSI.cfg.passo || 300, L = Math.min(Math.floor(xp / passo), N.length - 1);
    return { n: L + 1, nome: N[L], ini: L * passo, prox: L < N.length - 1 ? (L + 1) * passo : null };
  }
  function geral() {
    var r = { xp: recorde() * 3, f: 0, t: 0, mods: {} };
    ids().forEach(function (n) { var c = FSI.contagem(FSI.mods[n]); r.xp += c.pontos; r.f += c.feitas; r.t += c.total; r.mods[n] = c; });
    r.nv = nivel(r.xp); return r;
  }
  FSI.geral = geral;
  function selo(c) { return c.total && c.feitas / c.total >= 0.9; }

  /* ---------- casca: barra superior + lista lateral de módulos ---------- */
  var MARCA = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2" y="2" width="9" height="9" rx="2.5" fill="currentColor"/><rect x="13" y="2" width="9" height="9" rx="2.5" fill="currentColor" opacity=".55"/><rect x="2" y="13" width="9" height="9" rx="2.5" fill="currentColor" opacity=".55"/><rect x="13" y="13" width="9" height="9" rx="2.5" fill="currentColor"/></svg>';
  FSI.casca = function (atual) {
    var lista = ids();
    var topo = el("header", { class: "topo" },
      '<a class="marca" href="' + IDX() + '">' + MARCA + '<span><b>' + esc(FSI.cfg.nome) + "</b><small>" + esc(FSI.cfg.eixo || "Prof. Eber Santana") + "</small></span></a>" +
      '<div class="xpbox"><b data-xp>0 XP</b><small data-nv>Nível 1</small></div>' +
      '<div class="gprog" title="Progresso na disciplina"><span data-gt>0 / 0</span><div class="bar" aria-hidden="true"><i data-gb></i></div></div>' +
      '<a class="portal" href="../">← Portal</a>');
    var lay = el("div", { class: "lay" });
    var lado = el("details", { class: "lado", open: "" });
    var h = '<summary>Módulos da disciplina</summary><nav aria-label="Módulos da disciplina"><p class="lt">Módulos da disciplina</p>';
    h += '<a class="lm' + (atual === "indice" ? " on" : "") + '" href="' + IDX() + '"' + (atual === "indice" ? ' aria-current="page"' : "") + '><span class="ln">◆</span><span class="lx"><small>Comece aqui</small>Visão geral</span></a>';
    lista.forEach(function (n) {
      var d = FSI.mods[n], on = atual === n;
      var vd = vis(n), fechado = vd !== "v";
      h += '<a class="lm' + (on ? " on" : "") + '" href="modulo-' + n + '.html"' + (on ? ' aria-current="page"' : "") + ' data-n="' + n + '"><span class="ln">' + n + '</span><span class="lx"><small>' + (fechado ? "Abre em " + vd.slice(8, 10) + "/" + vd.slice(5, 7) : esc(d.unidade)) + "</small>" + esc(d.nome) + '</span><span class="lb" aria-hidden="true"><i></i></span></a>';
    });
    h += '<a class="lm x' + (atual === "desafio" ? " on" : "") + '" href="./#desafio"><span class="ln">⚡</span><span class="lx"><small>Todos os módulos</small>Desafio relâmpago</span></a>';
    h += '<a class="lm x' + (atual === "simulado" ? " on" : "") + '" href="simulado.html"' + (atual === "simulado" ? ' aria-current="page"' : "") + '><span class="ln">✓</span><span class="lx"><small>Para fechar</small>Simulado final</span></a>' + (FSI.cfg.indice ? '<a class="lm x" href="./"><span class="ln">▤</span><span class="lx"><small>Apostila, labs e atividades</small>Materiais da disciplina</span></a>' : "") + '</nav>';
    lado.innerHTML = h;
    var main = el("main", { class: "cont", id: "conteudo", tabindex: "-1" });
    lay.appendChild(lado); lay.appendChild(main);
    var app = $("#app");
    if (app) app.parentNode.replaceChild(lay, app); else document.body.appendChild(lay);
    document.body.insertBefore(topo, lay);
    try { if (window.matchMedia("(max-width: 900px)").matches) lado.open = false; } catch (e) { }
    FSI.atualizaCasca();
    return main;
  };
  FSI.atualizaCasca = function () {
    var g = geral(), nv = g.nv;
    var x = $("[data-xp]"); if (!x) return;
    x.textContent = g.xp + " XP";
    $("[data-nv]").textContent = "Nível " + nv.n + " · " + nv.nome;
    $("[data-gt]").textContent = g.f + " / " + g.t;
    $("[data-gb]").style.width = Math.round((100 * g.f) / (g.t || 1)) + "%";
    $$(".lm[data-n]").forEach(function (a) {
      var c = g.mods[+a.getAttribute("data-n")], p = Math.round((100 * c.feitas) / (c.total || 1));
      $(".lb i", a).style.width = p + "%";
      a.classList.toggle("feito", selo(c));
      a.setAttribute("title", c.feitas + " de " + c.total + " atividades" + (selo(c) ? " · selo conquistado" : ""));
    });
  };

  /* aviso rápido (missão cumprida, conquista) */
  var toastT = null;
  function toast(msg) {
    var t = $("#toast"); if (!t) { t = el("div", { id: "toast", role: "status", "aria-live": "polite" }); document.body.appendChild(t); }
    t.innerHTML = msg; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("on"); }, 4200);
  }
  FSI.toast = toast;

  /* ---------- visuais ---------- */
  function medir(t) { var ls = String(t).split("\n"), m = 0; ls.forEach(function (l) { if (l.length > m) m = l.length; }); return { w: Math.max(104, Math.round(m * 8.4 + 26)), h: 16 + ls.length * 19, ls: ls }; }

  function visRede(v, host, S, salvar) {
    var W = 720, H = v.h || 400, nos = v.nos.map(function (n) { return Object.assign({}, n); }), mapa = {};
    if (v.layout === "ciclo") {
      var cx = W / 2, cy = H / 2, rx = W * 0.28, ry = H * 0.34;
      nos.forEach(function (n, i) { var a = -Math.PI / 2 + (i * 2 * Math.PI) / nos.length; n.x = cx + rx * Math.cos(a); n.y = cy + ry * Math.sin(a); });
    }
    nos.forEach(function (n) { var m = medir(n.t); n.w = m.w; n.h = m.h; n.ls = m.ls; mapa[n.id] = n; });
    function borda(a, b) { var dx = b.x - a.x, dy = b.y - a.y; if (!dx && !dy) return { x: a.x, y: a.y }; var s = Math.min((a.w / 2 + 4) / Math.abs(dx || 1e-9), (a.h / 2 + 4) / Math.abs(dy || 1e-9)); return { x: a.x + dx * s, y: a.y + dy * s }; }
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" role="group" aria-label="' + esc(v.titulo) + '">';
    var lig = v.liga.map(function (l, i) {
      var a = mapa[l[0]], b = mapa[l[1]], p1 = borda(a, b), p2 = borda(b, a), s = '<g class="lg" data-i="' + i + '"><line class="lig" x1="' + p1.x + '" y1="' + p1.y + '" x2="' + p2.x + '" y2="' + p2.y + '"/>';
      if (v.dir) { var ang = Math.atan2(p2.y - p1.y, p2.x - p1.x), L = 11; s += '<polygon class="lig lh" fill="currentColor" points="' + p2.x + "," + p2.y + " " + (p2.x - L * Math.cos(ang - 0.4)) + "," + (p2.y - L * Math.sin(ang - 0.4)) + " " + (p2.x - L * Math.cos(ang + 0.4)) + "," + (p2.y - L * Math.sin(ang + 0.4)) + '"/>'; }
      if (l[2]) s += '<text class="ligt" x="' + (p1.x + p2.x) / 2 + '" y="' + ((p1.y + p2.y) / 2 - 6) + '">' + esc(l[2]) + "</text>";
      return s + "</g>";
    });
    svg += lig.join("");
    nos.forEach(function (n) {
      svg += '<g class="no" tabindex="0" role="button" data-id="' + n.id + '" aria-label="' + esc(plain(n.t)) + '">';
      svg += '<rect x="' + (n.x - n.w / 2) + '" y="' + (n.y - n.h / 2) + '" width="' + n.w + '" height="' + n.h + '" rx="' + (v.forma === "elipse" ? n.h / 2 : 10) + '"/>';
      n.ls.forEach(function (l, i) { svg += '<text x="' + n.x + '" y="' + (n.y - ((n.ls.length - 1) * 19) / 2 + i * 19 + 5) + '">' + esc(l) + "</text>"; });
      svg += "</g>";
    });
    svg += "</svg>";
    host.innerHTML = "<h3>" + esc(v.titulo) + '</h3><p class="instr">' + esc(v.instr || "Clique (ou use Tab e Enter) em cada elemento para ver o que ele significa e como se liga aos demais.") + "</p>" + '<div class="sv" tabindex="0" role="region" aria-label="Diagrama: ' + esc(v.titulo) + '">' + svg + "</div>" + '<div class="det" aria-live="polite"><p>Selecione um elemento do diagrama.</p></div><p class="expl"></p>';
    var det = $(".det", host), expl = $(".expl", host), visit = {};
    function conta() { expl.textContent = "Explorados: " + Object.keys(visit).length + " de " + nos.length; if (Object.keys(visit).length === nos.length && !(S.ex && S.ex[v.id])) { S.ex = S.ex || {}; S.ex[v.id] = 1; salvar(); } }
    S.ex && S.ex[v.id] ? (expl.textContent = "Explorados: " + nos.length + " de " + nos.length + " ✓") : conta();
    function sel(id) {
      var n = mapa[id], viz = {}; viz[id] = 1;
      v.liga.forEach(function (l) { if (l[0] === id) viz[l[1]] = 1; if (l[1] === id) viz[l[0]] = 1; });
      $$(".no", host).forEach(function (g) { var k = g.getAttribute("data-id"); g.classList.toggle("sel", k === id); g.classList.toggle("dim", !viz[k]); });
      $$(".lg", host).forEach(function (g) { var l = v.liga[+g.getAttribute("data-i")], on = l[0] === id || l[1] === id; $(".lig", g).classList.toggle("on", on); $$(".lig", g).forEach(function (x) { x.classList.toggle("dim", !on); x.classList.toggle("on", on); }); var t = $(".ligt", g); if (t) t.style.opacity = on ? 1 : 0.2; });
      var h = "<h4>" + esc(plain(n.t)) + "</h4><p>" + n.d + "</p>";
      if (n.href) h += '<p><a class="btn" style="display:inline-block;text-decoration:none" href="' + n.href + '">Abrir módulo →</a></p>';
      var vz = Object.keys(viz).filter(function (k) { return k !== id; });
      if (vz.length) h += "<p><small>Ligado a:</small> " + vz.map(function (k) { return '<button class="link" data-go="' + k + '">' + esc(plain(mapa[k].t)) + "</button>"; }).join("") + "</p>";
      det.innerHTML = h; visit[id] = 1; conta();
      $$("button[data-go]", det).forEach(function (b) { b.onclick = function () { sel(b.getAttribute("data-go")); }; });
    }
    $$(".no", host).forEach(function (g) { g.onclick = function () { sel(g.getAttribute("data-id")); }; g.onkeydown = function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sel(g.getAttribute("data-id")); } }; });
  }

  function visCamadas(v, host, S, salvar) {
    var W = 720, n = v.camadas.length, alt = v.h || 380, hl = alt / n, cx = W / 2, base = 330, minH = 95, visit = {};
    var svg = '<svg viewBox="0 0 ' + W + " " + (alt + 4) + '" role="group" aria-label="' + esc(v.titulo) + '">';
    v.camadas.forEach(function (c, i) {
      var y0 = i * hl + 2, y1 = (i + 1) * hl - 2, tag;
      if (v.forma === "pilha") { tag = '<rect x="90" y="' + y0 + '" width="540" height="' + (hl - 4) + '" rx="12"/>'; }
      else { var hw0 = minH + (base - minH) * (y0 / alt), hw1 = minH + (base - minH) * (y1 / alt); tag = '<polygon points="' + (cx - hw0) + "," + y0 + " " + (cx + hw0) + "," + y0 + " " + (cx + hw1) + "," + y1 + " " + (cx - hw1) + "," + y1 + '"/>'; }
      svg += '<g class="camada" tabindex="0" role="button" data-i="' + i + '" aria-label="' + esc(plain(c.t)) + '">' + tag + '<text x="' + cx + '" y="' + ((y0 + y1) / 2 + 6) + '">' + esc(plain(c.t)) + "</text></g>";
    });
    host.innerHTML = "<h3>" + esc(v.titulo) + '</h3><p class="instr">' + esc(v.instr || "Clique em cada camada para ver o significado e exemplos.") + "</p>" + '<div class="sv" tabindex="0" role="region" aria-label="Diagrama: ' + esc(v.titulo) + '">' + svg + "</svg></div>" + '<div class="det" aria-live="polite"><p>Selecione uma camada.</p></div><p class="expl"></p>';
    var det = $(".det", host), expl = $(".expl", host);
    function conta() { expl.textContent = "Explorados: " + Object.keys(visit).length + " de " + n; if (Object.keys(visit).length === n && !(S.ex && S.ex[v.id])) { S.ex = S.ex || {}; S.ex[v.id] = 1; salvar(); } }
    S.ex && S.ex[v.id] ? (expl.textContent = "Explorados: " + n + " de " + n + " ✓") : conta();
    function sel(i) {
      $$(".camada", host).forEach(function (g) { g.classList.toggle("sel", +g.getAttribute("data-i") === i); });
      var c = v.camadas[i]; det.innerHTML = "<h4>" + esc(plain(c.t)) + "</h4><p>" + c.d + "</p>" + (c.ex ? "<p><b>Exemplos:</b> " + c.ex + "</p>" : ""); visit[i] = 1; conta();
    }
    $$(".camada", host).forEach(function (g) { g.onclick = function () { sel(+g.getAttribute("data-i")); }; g.onkeydown = function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sel(+g.getAttribute("data-i")); } }; });
  }

  function visLinha(v, host, S, salvar) {
    var n = v.passos.length, atual = 0, visit = { 0: 1 };
    host.innerHTML = "<h3>" + esc(v.titulo) + '</h3><p class="instr">' + esc(v.instr || "Percorra as etapas na ordem. Use os botões ou as setas do teclado.") + '</p><div class="linha" role="list"></div><div class="det" aria-live="polite"></div><div class="row"><button class="btn sec" data-a="-1">← Anterior</button><button class="btn" data-a="1">Próxima →</button></div><p class="expl"></p>' +
      (v.ordenar ? '<h3 style="margin-top:18px">Desafio: coloque na ordem certa</h3><p class="instr">Toque nas etapas na sequência em que acontecem.</p><div class="chips" id="ch"></div><div class="seq" aria-live="polite" aria-label="Sua sequência"></div><div class="row"><button class="btn" id="conf">Conferir</button><button class="btn sec" id="ref">Recomeçar</button><span id="rs" role="status"></span></div>' : "");
    var tl = $(".linha", host), det = $(".det", host), expl = $(".expl", host);
    v.passos.forEach(function (p, i) { tl.appendChild(el("div", { class: "p", role: "listitem" }, '<button aria-label="Etapa ' + (i + 1) + ": " + esc(plain(p.t)) + '" data-i="' + i + '">' + (i + 1) + "</button><span>" + esc(plain(p.t)) + "</span>")); });
    function mostra(i) {
      atual = i; visit[i] = 1;
      $$(".p", tl).forEach(function (d, k) { d.classList.toggle("sel", k === i); d.classList.toggle("fei", k < i); });
      var p = v.passos[i]; det.innerHTML = "<h4>" + (i + 1) + ". " + esc(plain(p.t)) + "</h4><p>" + p.d + "</p>";
      $$("[data-a]", host).forEach(function (b) { var nx = i + +b.getAttribute("data-a"); b.disabled = nx < 0 || nx >= n; });
      expl.textContent = "Etapas vistas: " + Object.keys(visit).length + " de " + n;
      if (Object.keys(visit).length === n && !(S.ex && S.ex[v.id])) { S.ex = S.ex || {}; S.ex[v.id] = 1; salvar(); }
    }
    $$("[data-i]", tl).forEach(function (b) { b.onclick = function () { mostra(+b.getAttribute("data-i")); }; });
    $$("[data-a]", host).forEach(function (b) { b.onclick = function () { mostra(atual + +b.getAttribute("data-a")); }; });
    host.onkeydown = function (e) { if (e.target.tagName === "TEXTAREA") return; if (e.key === "ArrowRight" && atual < n - 1) mostra(atual + 1); if (e.key === "ArrowLeft" && atual > 0) mostra(atual - 1); };
    mostra(0);
    if (v.ordenar) {
      var ch = $("#ch", host), seq = $(".seq", host), rs = $("#rs", host), esc_ = [], ord;
      function mont() {
        ord = embaralha(v.passos.map(function (_, i) { return i; })); esc_ = []; ch.innerHTML = ""; seq.innerHTML = ""; rs.textContent = "";
        ord.forEach(function (i) { var b = el("button", { type: "button" }, esc(plain(v.passos[i].t))); b.onclick = function () { esc_.push(i); b.disabled = true; seq.appendChild(el("span", null, esc_.length + ". " + esc(plain(v.passos[i].t)))); }; ch.appendChild(b); });
      }
      mont();
      $("#ref", host).onclick = mont;
      $("#conf", host).onclick = function () {
        if (esc_.length < n) { rs.textContent = "Escolha todas as etapas primeiro."; return; }
        var certos = 0; $$("span", seq).forEach(function (s, k) { var ok = esc_[k] === k; if (ok) certos++; s.className = ok ? "ok" : "bad"; });
        rs.textContent = certos === n ? "✔ Sequência correta!" : certos + " de " + n + " na posição certa. Revise a linha do tempo e tente de novo.";
        if (certos === n && !(S.ex && S.ex[v.id + "-ord"])) { S.ex = S.ex || {}; S.ex[v.id + "-ord"] = 1; salvar(); }
      };
    }
  }

  function visClassificar(v, host, S, salvar) {
    var itens = embaralha(v.itens.map(function (x, i) { return { t: x[0], c: x[1], i: i }; })), pos = {}, selI = null;
    host.innerHTML = "<h3>" + esc(v.titulo) + '</h3><p class="instr">' + esc(v.instr || "Toque em um item e depois na coluna onde ele se encaixa.") + '</p><div class="chips" id="its"></div><div class="cls" id="cl"></div><div class="row"><button class="btn" id="cf">Conferir</button><button class="btn sec" id="rf">Recomeçar</button><span id="rs" role="status"></span></div>';
    var its = $("#its", host), cl = $("#cl", host), rs = $("#rs", host);
    function desenha(conf) {
      its.innerHTML = ""; cl.innerHTML = "";
      itens.forEach(function (it) { if (pos[it.i] != null) return; var b = el("button", { type: "button", "aria-pressed": selI === it.i ? "true" : "false" }, esc(it.t)); if (selI === it.i) b.classList.add("sel"); b.onclick = function () { selI = it.i; desenha(); }; its.appendChild(b); });
      if (!its.children.length) its.innerHTML = "<span class='instr'>Todos os itens foram classificados. Confira.</span>";
      v.cats.forEach(function (c, ci) {
        var col = el("div", { class: "col" }), cab = el("button", { type: "button", class: "cab" }, esc(c));
        cab.setAttribute("aria-label", "Colocar item selecionado em " + c);
        cab.onclick = function () { if (selI == null) { rs.textContent = "Escolha um item primeiro."; return; } pos[selI] = ci; selI = null; rs.textContent = ""; desenha(); };
        var ul = el("ul");
        itens.forEach(function (it) { if (pos[it.i] !== ci) return; var li = el("li", null, esc(it.t)); if (conf) li.className = it.c === ci ? "ok" : "bad"; if (!conf) { li.tabIndex = 0; li.title = "Clique para devolver ao banco"; li.onclick = function () { delete pos[it.i]; desenha(); }; li.onkeydown = function (e) { if (e.key === "Enter") { delete pos[it.i]; desenha(); } }; } ul.appendChild(li); });
        col.appendChild(cab); col.appendChild(ul); cl.appendChild(col);
      });
    }
    desenha();
    $("#rf", host).onclick = function () { pos = {}; selI = null; rs.textContent = ""; desenha(); };
    $("#cf", host).onclick = function () {
      if (Object.keys(pos).length < itens.length) { rs.textContent = "Classifique todos os itens antes de conferir."; return; }
      var ok = 0, erros = []; itens.forEach(function (it) { if (pos[it.i] === it.c) ok++; else erros.push(it.t + " → " + v.cats[it.c]); });
      desenha(true); rs.textContent = ok === itens.length ? "✔ Tudo certo!" : ok + " de " + itens.length + " certos. Corretos: " + erros.join("; ");
      if (ok === itens.length && !(S.ex && S.ex[v.id])) { S.ex = S.ex || {}; S.ex[v.id] = 1; salvar(); }
    };
  }

  /* sequência animada: mensagens entre participantes, passo a passo (ex.: chamada de sistema, falta de página) */
  function visSequencia(v, host, S, salvar) {
    var A = v.atores, P = v.passos, n = A.length, W = 720, top = 64, gap = 54, H = top + P.length * gap + 26, k = 0, visto = {}, timer = null;
    function cx(i) { return n === 1 ? W / 2 : 80 + i * ((W - 160) / (n - 1)); }
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(v.titulo) + '"><defs><marker id="sq-' + v.id + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>';
    A.forEach(function (a, i) {
      var m = medir(a); svg += '<line class="vida" x1="' + cx(i) + '" y1="' + (top - 6) + '" x2="' + cx(i) + '" y2="' + (H - 8) + '"/>';
      svg += '<g class="ator"><rect x="' + (cx(i) - m.w / 2) + '" y="6" width="' + m.w + '" height="' + (m.h + 4) + '" rx="10"/>';
      m.ls.forEach(function (l, j) { svg += '<text x="' + cx(i) + '" y="' + (6 + 21 + j * 19) + '">' + esc(l) + "</text>"; });
      svg += "</g>";
    });
    P.forEach(function (p, i) {
      var y = top + 20 + i * gap, x1 = cx(p.de), x2 = cx(p.para), mid = (x1 + x2) / 2, g = '<g class="msg" data-i="' + i + '" style="color:var(--accent)">';
      if (p.de === p.para) g += '<path class="seta" d="M' + x1 + "," + (y - 8) + " h46 v18 h-40" + '" marker-end="url(#sq-' + v.id + ')"/><text class="ml" x="' + (x1 + 54) + '" y="' + (y + 5) + '" text-anchor="start">' + esc(p.t) + "</text>";
      else g += '<line class="seta" x1="' + (x1 + (x2 > x1 ? 6 : -6)) + '" y1="' + y + '" x2="' + (x2 + (x2 > x1 ? -8 : 8)) + '" y2="' + y + '" marker-end="url(#sq-' + v.id + ')"/><text class="ml" x="' + mid + '" y="' + (y - 8) + '">' + esc(p.t) + "</text>";
      svg += g + '<text class="mn" x="' + (Math.min(x1, x2) - 22) + '" y="' + (y + 5) + '">' + (i + 1) + "</text></g>";
    });
    svg += "</svg>";
    host.innerHTML = "<h3>" + esc(v.titulo) + '</h3><p class="instr">' + esc(v.instr || "Use Próximo para ver cada mensagem acontecer, ou Animar tudo para assistir à sequência inteira.") + '</p><div class="sv" tabindex="0" role="region" aria-label="Sequência: ' + esc(v.titulo) + '">' + svg + '</div><div class="det" aria-live="polite"><p>Clique em <b>Próximo</b> para ver a primeira mensagem.</p></div><div class="row"><button class="btn sec" type="button" data-a="ini">⟲ Do início</button><button class="btn sec" type="button" data-a="-1">◀ Voltar</button><button class="btn" type="button" data-a="1">Próximo ▶</button><button class="btn sec" type="button" data-a="auto">▶ Animar tudo</button></div><p class="expl"></p>';
    var det = $(".det", host), expl = $(".expl", host);
    function mostra(novo) {
      k = Math.max(0, Math.min(P.length, novo));
      $$(".msg", host).forEach(function (g) { var i = +g.getAttribute("data-i"); g.classList.toggle("vista", i < k); g.classList.toggle("atual", i === k - 1); });
      if (k === 0) det.innerHTML = "<p>Clique em <b>Próximo</b> para ver a primeira mensagem.</p>";
      else { var p = P[k - 1]; visto[k - 1] = 1; det.innerHTML = "<h4>" + k + ". " + esc(A[p.de].replace(/\n/g, " ")) + (p.de === p.para ? "" : " → " + esc(A[p.para].replace(/\n/g, " "))) + ": " + esc(p.t) + "</h4><p>" + p.d + "</p>"; }
      $('[data-a="-1"]', host).disabled = k === 0; $('[data-a="1"]', host).disabled = k === P.length;
      expl.textContent = "Mensagens vistas: " + Object.keys(visto).length + " de " + P.length;
      if (Object.keys(visto).length === P.length && !(S.ex && S.ex[v.id])) { S.ex = S.ex || {}; S.ex[v.id] = 1; salvar(); }
    }
    function para() { if (timer) { clearInterval(timer); timer = null; $('[data-a="auto"]', host).textContent = "▶ Animar tudo"; } }
    $$("[data-a]", host).forEach(function (b) {
      b.onclick = function () {
        var a = b.getAttribute("data-a");
        if (a === "auto") { if (timer) return para(); if (k >= P.length) mostra(0); b.textContent = "■ Parar"; timer = setInterval(function () { if (k >= P.length) return para(); mostra(k + 1); }, 1700); return; }
        para(); mostra(a === "ini" ? 0 : k + +a);
      };
    });
    mostra(0);
  }

  var VIS = { rede: visRede, camadas: visCamadas, linha: visLinha, classificar: visClassificar, sequencia: visSequencia };

  /* ---------- exercícios guiados: passo a passo, a resposta só aparece depois de tentar ---------- */
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim(); }
  function confere(r, v, tol) {
    var alvos = Array.isArray(r) ? r : [r];
    return alvos.some(function (a) {
      if (typeof a === "number") { var x = parseFloat(String(v).replace(/\s/g, "").replace(/[^0-9,.\-]/g, "").replace(",", ".")); return !isNaN(x) && Math.abs(x - a) <= (tol != null ? tol : 0.011 + Math.abs(a) * 0.0005); }
      return norm(v) === norm(a);
    });
  }
  function montaGuiados(host, lista, S, salvar) {
    S.gd = S.gd || {};
    host.innerHTML = '<h2 class="t" style="margin-top:28px">Exercícios guiados</h2><p class="lead">Resolva no caderno e digite a resposta de cada passo. Se errar, aparece uma dica. Depois de duas tentativas você pode ver a resposta comentada — mas tente antes!</p>';
    lista.forEach(function (g, gi) {
      var card = el("div", { class: "q guia" });
      card.innerHTML = '<div class="nq">Exercício guiado ' + (gi + 1) + " de " + lista.length + '</div><div class="enun">' + g.titulo + '</div><div class="gtxt">' + g.txt + '</div><ol class="gpassos"></ol>';
      var ol = $(".gpassos", card);
      function desenha() {
        ol.innerHTML = "";
        var liberado = true;
        g.passos.forEach(function (p, pi) {
          var k = gi + "." + pi, est = S.gd[k] || {}, feito = est.ok || est.rev, id = "gd-" + gi + "-" + pi, li = el("li", { class: feito ? (est.ok ? "ok" : "rev") : liberado ? "" : "bloq" });
          var h = '<label for="' + id + '">' + p.p + "</label>";
          if (feito) h += '<div class="gres"><b>' + (est.ok ? "✔ Certo" : "Resposta") + ":</b> " + esc(est.v != null && est.ok ? est.v : (Array.isArray(p.r) ? p.r[0] : p.r)) + (p.un ? " " + esc(p.un) : "") + (p.expl ? '<p>' + p.expl + "</p>" : "") + "</div>";
          else if (!liberado) h += '<p class="instr">Resolva o passo anterior primeiro.</p>';
          else h += '<div class="gin"><input id="' + id + '" type="text" autocomplete="off" ' + (typeof (Array.isArray(p.r) ? p.r[0] : p.r) === "number" ? 'inputmode="decimal"' : "") + ' placeholder="Sua resposta">' + (p.un ? "<span>" + esc(p.un) + "</span>" : "") + '<button class="btn" type="button">Conferir</button>' + ((est.t || 0) >= 2 ? '<button class="btn sec" type="button" data-rev>Ver resposta</button>' : "") + '</div><div class="gfb" aria-live="polite">' + ((est.t || 0) > 0 && p.dica ? "<b>Dica:</b> " + p.dica : "") + "</div>";
          li.innerHTML = h; ol.appendChild(li);
          if (!feito && liberado) {
            var inp = $("input", li), bt = $(".gin .btn:not([data-rev])", li), rv = $("[data-rev]", li);
            function conferir() {
              if (!inp.value.trim()) { $(".gfb", li).textContent = "Digite uma resposta antes de conferir."; return; }
              if (confere(p.r, inp.value, p.tol)) { S.gd[k] = { ok: 1, v: inp.value.trim() }; salvar(); desenha(); var nx = $(".gpassos li:not(.ok):not(.rev) input", card); if (nx) nx.focus(); }
              else { est.t = (est.t || 0) + 1; S.gd[k] = est; try { localStorage.setItem(chave(FSI._n), JSON.stringify(S)); } catch (e) { } desenha(); var i2 = $("#" + id); if (i2) { i2.value = inp.value; i2.focus(); } var fb = $(".gfb", ol.children[pi]); if (fb) fb.innerHTML = "<b>Ainda não.</b> " + (p.dica ? "<b>Dica:</b> " + p.dica : "Revise o raciocínio e tente de novo.") + (est.t >= 2 ? " Se quiser, veja a resposta." : ""); }
            }
            bt.onclick = conferir; inp.onkeydown = function (e) { if (e.key === "Enter") conferir(); };
            if (rv) rv.onclick = function () { S.gd[k] = { rev: 1 }; salvar(); desenha(); };
          }
          if (!feito) liberado = false;
        });
      }
      desenha(); host.appendChild(card);
    });
  }

  /* ---------- laboratório: simuladores + missões que se marcam sozinhas ---------- */
  function montaLab(host, d, S, salvar, aoMudar) {
    var L = d.lab; S.mi = S.mi || {};
    host.innerHTML = '<h2 class="t">Laboratório</h2><p class="lead">' + (L.intro || "Mexa à vontade: aqui você vê o conceito funcionando. Cumpra as missões ao lado.") + '</p><div class="labg"><div class="labm"></div><aside class="missoes" aria-label="Missões do laboratório"><h3>Missões <span class="mc"></span></h3><ul></ul><p class="instr">As missões são marcadas sozinhas quando você faz a ação no laboratório. Cada uma vale 8 XP.</p></aside></div><div class="guiados"></div>';
    var ul = $(".missoes ul", host), mc = $(".missoes .mc", host);
    function lista() {
      ul.innerHTML = ""; var f = 0;
      L.missoes.forEach(function (m) { var ok = !!S.mi[m.id]; if (ok) f++; ul.appendChild(el("li", { class: ok ? "ok" : "" }, '<span class="ck" aria-hidden="true">' + (ok ? "✓" : "") + "</span><span>" + m.t + '</span><span class="sr">' + (ok ? " (cumprida)" : " (pendente)") + "</span>")); });
      mc.textContent = f + "/" + L.missoes.length;
    }
    var api = {
      S: S, salvar: salvar,
      ev: function (e) {
        var novas = [];
        L.missoes.forEach(function (m) { if (S.mi[m.id]) return; var alvo = m.ev; if (alvo === e || (alvo.slice(-1) === "*" && e.indexOf(alvo.slice(0, -1)) === 0)) { S.mi[m.id] = 1; novas.push(m); } });
        if (novas.length) { salvar(); lista(); aoMudar(); toast("<b>Missão cumprida!</b> " + novas.map(function (m) { return m.t; }).join(" · ") + " <span>+8 XP</span>"); }
      }
    };
    L.sims.forEach(function (s) {
      var h = el("div", { class: "viz sim" }); $(".labm", host).appendChild(h);
      if (VIS[s.tipo]) { VIS[s.tipo](s, h, S, function () { salvar(); if (S.ex[s.id]) api.ev("vis:" + s.id); if (S.ex[s.id + "-ord"]) api.ev("ord:" + s.id); }); if (S.ex && S.ex[s.id]) api.ev("vis:" + s.id); return; }
      h.innerHTML = "<h3>" + esc(s.titulo) + "</h3>" + (s.instr ? '<p class="instr">' + s.instr + "</p>" : "") + '<div class="simb"></div>';
      if (FSI.sims[s.tipo]) { try { FSI.sims[s.tipo]($(".simb", h), s.cfg || {}, api); } catch (err) { $(".simb", h).innerHTML = '<p class="instr">Não foi possível abrir este simulador neste navegador.</p>'; if (window.console) console.error(err); } }
    });
    lista();
    /* missões ligadas aos diagramas da aba Explorar (vis:id / ord:id) */
    FSI._checaEx = function () { L.missoes.forEach(function (m) { var mm = /^(vis|ord):(.+)$/.exec(m.ev); if (mm && S.ex && S.ex[mm[2] + (mm[1] === "ord" ? "-ord" : "")]) api.ev(m.ev); }); };
    FSI._checaEx();
    if (L.guiados && L.guiados.length) montaGuiados($(".guiados", host), L.guiados, S, function () { salvar(); aoMudar(); });
  }

  /* ---------- página do módulo ---------- */
  FSI.montarModulo = function (n) {
    var d = FSI.mods[n], S = ler(n), todos = ids(); FSI._n = n; resumo(n, S);
    var ABAS = [["estudar", "Estudar"], ["explorar", "Explorar"]].concat(d.lab ? [["lab", "Laboratório"]] : []).concat([["flash", "Flashcards"], ["vf", "V ou F"], ["caderno", "Caderno"], ["pbl", "PBL"], ["resumo", "Resumo"]]);
    var CONT = { lab: "lab", flash: "fc", vf: "vf", caderno: "cad", pbl: "pbl" };
    var selAntes = selo(FSI.contagem(d, S));
    function salvar() { gravar(n, S); atualizaProg(); }
    function atualizaProg() {
      var c = FSI.contagem(d, S), p = Math.round((100 * c.feitas) / (c.total || 1));
      var t = $("[data-pct]"); if (t) t.textContent = p + "% concluído";
      var a = $("[data-tot]"); if (a) a.textContent = c.feitas + "/" + c.total + " atividades";
      Object.keys(CONT).forEach(function (k) { var s = $('nav.tabs [data-t="' + k + '"] .n'); if (s) s.textContent = c[CONT[k]][0] + "/" + c[CONT[k]][1]; });
      FSI.atualizaCasca();
      if (!selAntes && selo(c)) { selAntes = true; toast("<b>Selo conquistado!</b> Você completou o Módulo " + n + "."); }
    }
    document.title = "Módulo " + n + " · " + d.titulo + " — " + FSI.cfg.nome;
    var main = FSI.casca(n);
    main.innerHTML = '<div class="mhead"><span class="eb">Módulo ' + n + " de " + todos.length + " · " + esc(d.unidade) + "</span><h1>" + esc(d.titulo) + "</h1><p>" + esc(d.resumoCurto) + '</p><div class="tags">' + (d.duracao ? "<span>" + esc(d.duracao) + "</span>" : "") + '<span data-tot></span><span class="pct" data-pct></span></div></div>';
    var nav = el("nav", { class: "tabs", "aria-label": "Atividades do módulo" }, '<div class="wrap" role="tablist"></div>');
    ABAS.forEach(function (a) { var c = CONT[a[0]]; $("[role=tablist]", nav).appendChild(el("button", { role: "tab", "data-t": a[0], id: "tab-" + a[0], "aria-controls": "p-" + a[0], "aria-selected": "false", tabindex: "-1" }, a[1] + (c ? ' <span class="n"></span>' : ""))); });
    main.appendChild(nav);
    var W = el("div", { class: "wrap paineis" }); main.appendChild(W);
    ABAS.forEach(function (a) { W.appendChild(el("section", { class: "painel", id: "p-" + a[0], role: "tabpanel", "aria-labelledby": "tab-" + a[0], hidden: "" })); });
    var ix = todos.indexOf(n), nn = ix >= 0 ? todos[ix + 1] : todos.filter(function (k) { return k > n; })[0], pn = ix > 0 ? todos[ix - 1] : null;
    var nx = nn ? '<a href="modulo-' + nn + '.html">Módulo ' + nn + ": " + esc(FSI.mods[nn].nome) + " →</a>" : '<a href="simulado.html">Fazer o simulado final →</a>';
    var pv = pn ? '<a href="modulo-' + pn + '.html">← Módulo ' + pn + "</a>" : '<a href="' + IDX() + '">← Visão geral</a>';
    W.appendChild(el("div", { class: "nav2" }, pv + nx));

    /* Estudar */
    var pe = $("#p-estudar"), h = "";
    if (d.analogia) h += '<div class="analogia"><span class="eb">Para entender · analogia</span><h3>' + esc(d.analogia.titulo) + "</h3>" + d.analogia.txt + "</div>";
    if (d.chave) h += '<div class="card chave"><h3>Pontos-chave do módulo</h3><ul>' + d.chave.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div>";
    pe.innerHTML = '<h2 class="t">Estudar</h2><p class="lead">Comece pela analogia e pelos pontos-chave. Depois leia as lições na ordem — antes de abrir cada uma, tente adivinhar o que ela diz.</p>' + h + '<h3 class="sub">Objetivos</h3><div class="objetivos">' + d.objetivos.map(function (o, i) { return "<div><b>Objetivo " + (i + 1) + "</b>" + o + "</div>"; }).join("") + '</div><h3 class="sub">Lições</h3>';
    d.licoes.forEach(function (l, i) {
      var det = el("details", { class: "licao" }, '<summary><span class="num">' + (i + 1) + "</span>" + esc(l.t) + '</summary><div class="corpo">' + l.txt + (l.pontos ? "<ul>" + l.pontos.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>" : "") + (l.pense ? '<div class="pense"><b>Pare e pense:</b> ' + l.pense + "</div>" : "") + "</div>");
      if (i === 0) det.open = true; pe.appendChild(det);
    });
    if (d.ler && d.ler.length) pe.appendChild(el("div", { class: "card" }, '<h3>Aprofunde nos materiais da disciplina</h3><ul>' + d.ler.map(function (x) { return '<li><a href="' + esc(x[1]) + '">' + esc(x[0]) + "</a></li>"; }).join("") + "</ul>"));
    if (d.termos) pe.appendChild(el("div", { class: "card" }, '<h3>Para anotar no caderno</h3><div class="termos">' + d.termos.map(function (t) { return "<div><b>" + t[0] + "</b><span>" + t[1] + "</span></div>"; }).join("") + "</div>"));
    pe.appendChild(el("div", { class: "proximo" }, "<b>Próximo passo:</b> " + (d.lab ? 'abra o <a href="#explorar" data-ir="explorar">Explorar</a> e depois o <a href="#lab" data-ir="lab">Laboratório</a> para ver o conteúdo funcionando.' : 'abra o <a href="#explorar" data-ir="explorar">Explorar</a> para ver o conteúdo em diagramas.')));

    /* Explorar */
    var px = $("#p-explorar"); px.innerHTML = '<h2 class="t">Explorar</h2><p class="lead">Diagramas para clicar, sequências animadas, linhas do tempo e jogos de classificação. Quanto mais você mexe, mais o conceito fica visível.</p>';
    d.visuais.forEach(function (v) { var hh = el("div", { class: "viz" }); px.appendChild(hh); VIS[v.tipo](v, hh, S, function () { salvar(); if (FSI._checaEx) FSI._checaEx(); }); });

    /* Laboratório */
    if (d.lab) montaLab($("#p-lab"), d, S, salvar, atualizaProg);

    /* Flashcards */
    var pf = $("#p-flash"), ordem = d.fc.map(function (_, i) { return i; }), idx = 0, virado = false, soRev = false;
    pf.innerHTML = '<h2 class="t">Flashcards</h2><p class="lead">Leia a frente, <b>responda no caderno</b> e só então vire o cartão. Marque se sabia ou se precisa revisar.</p><div class="row"><button class="btn sec" id="emb">Embaralhar</button><button class="btn sec" id="rev" aria-pressed="false">Só os que preciso revisar</button></div><div class="cnt" id="fcnt"></div><div class="fc" id="fcard" aria-live="polite"></div><div class="row" style="justify-content:center" id="facoes"></div>';
    function fc() {
      var lista = ordem.filter(function (i) { return !soRev || S.fc && S.fc[i] === 0; });
      var card = $("#fcard"), ac = $("#facoes"), cn = $("#fcnt");
      if (!lista.length) { card.innerHTML = '<div class="face"><small>Parabéns</small>Nenhum cartão para revisar agora.</div>'; ac.innerHTML = ""; cn.textContent = ""; return; }
      if (idx >= lista.length) idx = 0; var i = lista[idx], c = d.fc[i];
      cn.textContent = "Cartão " + (idx + 1) + " de " + lista.length + " · sei: " + Object.keys(S.fc || {}).filter(function (k) { return S.fc[k] === 1; }).length + " · revisar: " + Object.keys(S.fc || {}).filter(function (k) { return S.fc[k] === 0; }).length;
      card.innerHTML = '<div class="face ' + (virado ? "verso flip" : "") + '"><small>' + (virado ? "Resposta" : "Pergunta") + "</small>" + (virado ? c[1] : c[0]) + "</div>";
      ac.innerHTML = "";
      var b0 = el("button", { class: "btn sec", type: "button" }, "← Anterior"), b1 = el("button", { class: "btn", type: "button" }, virado ? "Ver pergunta" : "Virar cartão"), b2 = el("button", { class: "btn sec", type: "button" }, "Próximo →");
      b0.onclick = function () { idx = (idx - 1 + lista.length) % lista.length; virado = false; fc(); };
      b2.onclick = function () { idx = (idx + 1) % lista.length; virado = false; fc(); };
      b1.onclick = function () { virado = !virado; fc(); };
      ac.appendChild(b0); ac.appendChild(b1); ac.appendChild(b2);
      if (virado) {
        var s = el("button", { class: "btn ok", type: "button" }, "✔ Eu sabia"), r = el("button", { class: "btn bad", type: "button" }, "↻ Revisar depois");
        s.onclick = function () { S.fc = S.fc || {}; S.fc[i] = 1; salvar(); idx++; virado = false; fc(); };
        r.onclick = function () { S.fc = S.fc || {}; S.fc[i] = 0; salvar(); idx++; virado = false; fc(); };
        ac.appendChild(s); ac.appendChild(r);
      }
    }
    $("#emb").onclick = function () { ordem = embaralha(ordem); idx = 0; virado = false; fc(); };
    $("#rev").onclick = function () { soRev = !soRev; this.setAttribute("aria-pressed", soRev); this.classList.toggle("sec", !soRev); idx = 0; virado = false; fc(); };
    $("#rev").classList.add("sec");
    pf.addEventListener("keydown", function (e) { if (e.target.tagName === "TEXTAREA") return; if (e.key === " " && e.target.tagName !== "BUTTON") { e.preventDefault(); virado = !virado; fc(); } });
    fc();

    /* V ou F */
    var pv_ = $("#p-vf"); pv_.innerHTML = '<h2 class="t">Verdadeiro ou falso — com justificativa</h2><p class="lead">Escolha V ou F, <b>escreva a justificativa</b> (aqui ou no caderno) e só depois confira. Acertar sem saber explicar não conta como aprender.</p><div class="score" id="vfsc"></div>';
    function vfScore() { var c = FSI.contagem(d, S); $("#vfsc").innerHTML = "<div>Respondidas <b>" + c.vf[0] + "/" + c.vf[1] + "</b></div><div>Acertos <b>" + c.acertos + "</b></div>"; }
    d.vf.forEach(function (q, i) {
      var card = el("div", { class: "q" }), est = (S.vf && S.vf[i]) || null, esc_ = est ? est.r : null;
      function desenha() {
        card.innerHTML = '<div class="nq">Afirmação ' + (i + 1) + " de " + d.vf.length + '</div><div class="enun">' + q[0] + "</div>" +
          '<div class="vfopts" role="group" aria-label="Sua resposta"><button type="button" data-v="1" aria-pressed="' + (esc_ === true) + '" ' + (est ? "disabled" : "") + '>Verdadeiro</button><button type="button" data-v="0" aria-pressed="' + (esc_ === false) + '" ' + (est ? "disabled" : "") + ">Falso</button></div>" +
          '<label for="vj' + i + '"><b>Sua justificativa:</b></label><textarea id="vj' + i + '" ' + (est ? "disabled" : "") + ' placeholder="Por que é verdadeira ou falsa? Explique com suas palavras.">' + esc((est && est.j) || "") + "</textarea>" +
          (est ? "" : '<label class="chk"><input type="checkbox" id="vc' + i + '"> Justifiquei no caderno</label><button class="btn" type="button" id="vb' + i + '" disabled>Conferir minha resposta</button>');
        if (est) card.insertAdjacentHTML("beforeend", '<div class="resp ' + (est.ok ? "" : "bad") + '"><b class="rot">' + (est.ok ? "Você acertou" : "Atenção — a afirmação é " + (q[1] ? "VERDADEIRA" : "FALSA")) + '</b><p><b>Gabarito: ' + (q[1] ? "Verdadeiro" : "Falso") + ".</b> " + q[2] + "</p></div>");
        else {
          var bt = $("#vb" + i, card), ta = $("textarea", card), ck = $("#vc" + i, card);
          function hab() { bt.disabled = !(esc_ !== null && (ta.value.trim().length >= 10 || ck.checked)); }
          $$("[data-v]", card).forEach(function (b) { b.onclick = function () { esc_ = b.getAttribute("data-v") === "1"; $$("[data-v]", card).forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); hab(); }; });
          ta.oninput = hab; ck.onchange = hab;
          bt.onclick = function () { S.vf = S.vf || {}; S.vf[i] = { r: esc_, ok: esc_ === q[1], j: ta.value.trim() }; salvar(); est = S.vf[i]; desenha(); vfScore(); };
        }
      }
      desenha(); pv_.appendChild(card);
    });
    vfScore();

    /* Caderno e PBL (mesmo mecanismo) */
    function pergunta(q, chv, bag, i, rot) {
      var card = el("div", { class: "q" }), est = (S[bag] && S[bag][chv]) || null, sid = bag + String(chv).replace(/\./g, "_");
      function desenha() {
        var ver = est && est.ver;
        card.innerHTML = '<div class="nq">' + rot + '</div><div class="enun">' + q[0] + "</div>" + '<label for="t-' + sid + '"><b>Sua resposta (rascunho):</b></label><textarea id="t-' + sid + '" placeholder="Escreva aqui ou no caderno. Tente antes de ver a resposta." ' + (ver ? "disabled" : "") + ">" + esc((est && est.t) || "") + "</textarea>" +
          (ver ? "" : '<label class="chk"><input type="checkbox" id="c-' + sid + '"> Respondi no caderno de papel</label><button class="btn" type="button" id="b-' + sid + '" disabled>Já tentei — mostrar resposta</button>');
        if (ver) {
          card.insertAdjacentHTML("beforeend", '<div class="resp"><b class="rot">Resposta comentada</b>' + q[1] + "</div>");
          var av = el("div", { class: "row" }, "<span>Como você foi?</span>");
          [[2, "✔ Acertei", "ok"], [1, "≈ Em parte", "sec"], [0, "✘ Preciso rever", "bad"]].forEach(function (o) { var b = el("button", { type: "button", class: "btn " + o[2], "aria-pressed": est.av === o[0] ? "true" : "false" }, o[1]); if (est.av === o[0]) b.style.outline = "3px solid var(--accent)"; b.onclick = function () { est.av = o[0]; S[bag][chv] = est; salvar(); desenha(); }; av.appendChild(b); });
          card.appendChild(av);
        } else {
          var ta = $("textarea", card), ck = $("#c-" + sid, card), bt = $("#b-" + sid, card);
          function hab() { bt.disabled = !(ta.value.trim().length >= 10 || ck.checked); }
          ta.oninput = function () { hab(); S[bag] = S[bag] || {}; S[bag][chv] = Object.assign(est || {}, { t: ta.value }); est = S[bag][chv]; try { localStorage.setItem(chave(n), JSON.stringify(S)); } catch (e) { } };
          ck.onchange = hab; hab();
          bt.onclick = function () { S[bag] = S[bag] || {}; est = Object.assign(est || {}, { t: ta.value, ver: 1 }); S[bag][chv] = est; salvar(); desenha(); };
        }
      }
      desenha(); return card;
    }
    var pc = $("#p-caderno"); pc.innerHTML = '<h2 class="t">Atividades de caderno</h2><p class="lead">Responda primeiro por conta própria (no caderno ou no campo abaixo). A resposta comentada só aparece depois da sua tentativa.</p>';
    d.caderno.forEach(function (q, i) { pc.appendChild(pergunta(q, i, "cad", i, "Questão " + (i + 1) + " de " + d.caderno.length)); });
    var pp = $("#p-pbl"); pp.innerHTML = '<h2 class="t">Aprendizagem baseada em problemas (PBL)</h2><p class="lead">Cada problema é uma situação real. Resolva as etapas na ordem, como um pequeno projeto — de preferência em dupla ou trio.</p>';
    d.pbl.forEach(function (p, a) {
      var bloco = el("div", { class: "pbl" }, "<h3 style='font-size:30px;margin:18px 0 6px'>Problema " + (a + 1) + " — " + esc(p.titulo) + '</h3><div class="cenario"><b>Situação:</b> ' + p.cenario + "</div>");
      p.passos.forEach(function (q, b) { bloco.appendChild(pergunta(q, a + "." + b, "pbl", b, "Etapa " + (b + 1) + " de " + p.passos.length)); });
      pp.appendChild(bloco);
    });

    /* Resumo */
    var pr = $("#p-resumo"); pr.className = "painel resumo";
    pr.innerHTML = '<h2 class="t">Resumo do módulo</h2><p class="lead">Use como cola de revisão. Dá para imprimir ou salvar em PDF.</p><div class="row"><button class="btn sec" id="imp">Imprimir / salvar PDF</button><button class="btn sec" id="exp">Baixar minhas respostas (.txt)</button></div>' +
      d.resumo.map(function (r) { return '<div class="card"><h3>' + esc(r.t) + "</h3><ul>" + r.itens.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div>"; }).join("") +
      '<div class="card"><h3>Glossário</h3><dl style="margin:0">' + d.glossario.map(function (g) { return "<dt><b>" + g[0] + "</b></dt><dd style='margin:0 0 8px'>" + g[1] + "</dd>"; }).join("") + "</dl></div>";
    $("#imp").onclick = function () { window.print(); };
    $("#exp").onclick = function () {
      var t = FSI.cfg.nome + " — Módulo " + n + ": " + d.titulo + "\nMinhas respostas\n\n";
      d.vf.forEach(function (q, i) { var e = S.vf && S.vf[i]; if (e) t += "V/F " + (i + 1) + ": " + q[0].replace(/<[^>]+>/g, "") + "\n  Minha resposta: " + (e.r ? "Verdadeiro" : "Falso") + (e.ok ? " (certo)" : " (errado)") + "\n  Justificativa: " + (e.j || "-") + "\n\n"; });
      d.caderno.forEach(function (q, i) { var e = S.cad && S.cad[i]; if (e && e.t) t += "Caderno " + (i + 1) + ": " + q[0].replace(/<[^>]+>/g, "") + "\n  " + e.t + "\n\n"; });
      d.pbl.forEach(function (p, a) { p.passos.forEach(function (q, b) { var e = S.pbl && S.pbl[a + "." + b]; if (e && e.t) t += "PBL " + (a + 1) + "." + (b + 1) + ": " + q[0].replace(/<[^>]+>/g, "") + "\n  " + e.t + "\n\n"; }); });
      var a = el("a", { href: URL.createObjectURL(new Blob([t], { type: "text/plain;charset=utf-8" })), download: FSI.cfg.disc + "-modulo-" + n + "-respostas.txt" }); document.body.appendChild(a); a.click(); a.remove();
    };

    /* abas */
    function abre(id, foco) {
      if (!ABAS.some(function (a) { return a[0] === id; })) id = "estudar";
      $$(".painel").forEach(function (p) { p.hidden = p.id !== "p-" + id; });
      $$("nav.tabs [role=tab]").forEach(function (b) { var on = b.getAttribute("data-t") === id; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; if (on && foco) b.focus(); });
      if (location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
    }
    $$("nav.tabs [role=tab]").forEach(function (b, i, all) {
      b.onclick = function () { abre(b.getAttribute("data-t")); var t = $("nav.tabs"); if (t && t.getBoundingClientRect().top < 0) t.scrollIntoView(); };
      b.onkeydown = function (e) { var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (k) { e.preventDefault(); abre(all[(i + k + all.length) % all.length].getAttribute("data-t"), true); } };
    });
    $$("[data-ir]").forEach(function (a) { a.onclick = function (e) { e.preventDefault(); abre(a.getAttribute("data-ir"), true); $("nav.tabs").scrollIntoView(); }; });
    abre(location.hash.slice(1)); atualizaProg();
    window.addEventListener("hashchange", function () { abre(location.hash.slice(1)); });
    window.PROGRESSO_ID = FSI.cfg.disc + "-modulo-" + n + "-v1";
    window.PROGRESSO_DADOS = function () { var c = FSI.contagem(d, ler(n)); return { feitas: c.feitas, total: c.total, pontos: c.pontos, detalhe: { flashcards: c.fc.join("/"), vf: c.vf.join("/") + " (" + c.acertos + " certas)", caderno: c.cad.join("/"), pbl: c.pbl.join("/"), laboratorio: c.lab.join("/") } }; };
  };

  /* ---------- desafio relâmpago: 10 V ou F em 90 segundos ---------- */
  FSI.desafio = function (host) {
    var pool = []; ids().forEach(function (n) { FSI.mods[n].vf.forEach(function (q) { pool.push({ m: n, q: q }); }); });
    var lista, i, certas, fim, timer;
    function inicio() {
      var r = recorde();
      host.innerHTML = '<span class="eb">Desafio relâmpago</span><h3>10 questões · 90 segundos</h3><p>Verdadeiro ou falso sorteados de todos os módulos. Seu recorde: <b>' + r + '/10</b> (cada acerto do recorde vale 3 XP).</p><button class="btn" type="button" id="dgo">Começar desafio</button>';
      $("#dgo", host).onclick = function () { lista = embaralha(pool).slice(0, 10); i = 0; certas = 0; fim = Date.now() + 90000; tick(); timer = setInterval(tick, 500); pergunta(); };
    }
    function tick() { var s = Math.max(0, Math.ceil((fim - Date.now()) / 1000)), t = $("#dtempo", host); if (t) { t.textContent = s + "s"; t.classList.toggle("pouco", s <= 15); } if (s <= 0) acaba(); }
    function pergunta() {
      var it = lista[i];
      host.innerHTML = '<div class="dtop"><span class="eb">Questão ' + (i + 1) + ' de 10 · Módulo ' + it.m + '</span><span class="dt" id="dtempo" aria-hidden="true"></span></div><p class="enun">' + it.q[0] + '</p><div class="vfopts"><button type="button" data-v="1">Verdadeiro</button><button type="button" data-v="0">Falso</button></div><div id="dfb" aria-live="polite"></div>';
      tick();
      $$("[data-v]", host).forEach(function (b) {
        b.onclick = function () {
          var ok = (b.getAttribute("data-v") === "1") === it.q[1]; if (ok) certas++;
          $$("[data-v]", host).forEach(function (x) { x.disabled = true; }); b.setAttribute("aria-pressed", "true");
          $("#dfb", host).innerHTML = '<div class="resp ' + (ok ? "" : "bad") + '"><b class="rot">' + (ok ? "Acertou" : "Errou") + "</b><p>" + it.q[2] + '</p></div><button class="btn" type="button" id="dnx">' + (i < 9 ? "Próxima →" : "Ver resultado") + "</button>";
          $("#dnx", host).onclick = function () { i++; if (i >= 10) acaba(); else pergunta(); }; $("#dnx", host).focus();
        };
      });
    }
    function acaba() {
      if (!timer) return; clearInterval(timer); timer = null;
      var r = recorde(), novo = certas > r; if (novo) try { localStorage.setItem(chave("desafio-recorde"), certas); } catch (e) { }
      host.innerHTML = '<span class="eb">Desafio relâmpago</span><h3>' + certas + " de 10" + (novo ? " · novo recorde!" : "") + "</h3><p>" + (i < 10 ? "O tempo acabou na questão " + (i + 1) + ". " : "") + (certas >= 8 ? "Excelente! Você domina a disciplina." : certas >= 5 ? "Bom! Revise os módulos em que errou e tente de novo." : "Vale revisar os módulos e voltar ao desafio.") + '</p><button class="btn" type="button" id="dgo2">Jogar de novo</button>';
      $("#dgo2", host).onclick = inicio; FSI.atualizaCasca(); if (novo) toast("<b>Novo recorde no desafio:</b> " + certas + "/10");
    }
    inicio();
  };

  /* ---------- índice (visão geral) ---------- */
  FSI.montarIndice = function () {
    var lista = ids(), cfg = FSI.cfg, main = FSI.casca("indice"), g = geral();
    var ex = FSI.mods[lista[0]] || {}, nfc = ex.fc ? ex.fc.length : 12, nvf = ex.vf ? ex.vf.length : 12, ncad = ex.caderno ? ex.caderno.length : 10, nlab = lista.filter(function (n) { return FSI.mods[n].lab; }).length;
    var h = '<section class="hero2"><span class="eb">' + esc(cfg.eixo || "") + "</span><h1>" + esc(cfg.nome) + "</h1><p>" + esc(cfg.descricao || "") + "</p>" +
      '<div class="feats"><div><small>' + ncad + ' por módulo</small><b>Caderno</b><span>Responda primeiro; a resposta comentada aparece depois.</span></div><div><small>' + nfc + ' por módulo</small><b>Flashcards</b><span>Leia, tente lembrar e só então vire o cartão.</span></div><div><small>' + nvf + ' por módulo</small><b>V ou F</b><span>Marque e justifique com suas palavras.</span></div><div><small>' + (nlab ? nlab + " laboratórios" : "PBL") + "</small><b>" + (nlab ? "Laboratório" : "Problemas reais") + "</b><span>" + (nlab ? "Simuladores com missões que se marcam sozinhas." : "Resolva situações reais em grupo.") + "</span></div></div></section>";
    if (cfg.analogia) h += '<div class="analogia"><span class="eb">Comece por aqui</span><h3>' + esc(cfg.analogia.titulo) + "</h3>" + cfg.analogia.txt + "</div>";
    h += '<div class="duas"><div class="card nivel"><span class="eb">Seu nível</span><h3 data-nvt></h3><div class="nbar" aria-hidden="true"><i data-nvb></i></div><p data-nvp></p><p class="selos" aria-label="Selos de módulo completo"></p></div><div class="card desafio" id="desafio"></div></div>';
    if (cfg.como || cfg.aulas) h += '<div class="duas">' + (cfg.como ? '<div class="card"><h3>Como estudar</h3><ol>' + cfg.como.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ol></div>" : "") + (cfg.aulas ? '<div class="card"><h3>Sugestão de aulas</h3><ul>' + cfg.aulas.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul></div>" : "") + "</div>";
    h += '<div class="secab"><h2 class="t">Módulos</h2><span class="eb">' + lista.length + " módulos · " + g.t + " atividades" + (nlab ? " · " + nlab + " laboratórios" : "") + '</span></div><div class="grid" id="modulos"></div><div class="viz" id="mapa" style="margin-top:22px"></div><div class="grid"><a class="mod" href="simulado.html"><span class="meta">Para finalizar</span><h3>Simulado final</h3><p>20 afirmações sorteadas de todos os módulos, com a justificativa de cada gabarito.</p><span class="go">Começar →</span></a></div>';
    main.innerHTML = h;
    function nivelBox() {
      var gg = geral(), nv = gg.nv, p = nv.prox ? Math.round((100 * (gg.xp - nv.ini)) / (nv.prox - nv.ini)) : 100;
      $("[data-nvt]").textContent = "Nível " + nv.n + " · " + nv.nome;
      $("[data-nvb]").style.width = p + "%";
      $("[data-nvp]").innerHTML = "<b>" + gg.xp + " XP</b> · " + (nv.prox ? "faltam " + (nv.prox - gg.xp) + " XP para o próximo nível." : "nível máximo!") + " Atividades valem de 2 a 10 XP; cada missão de laboratório vale 8.";
      $(".selos").innerHTML = "Selos de módulo completo: " + lista.map(function (n) { var s = selo(gg.mods[n]); return '<span class="selo' + (s ? " on" : "") + '" title="Módulo ' + n + (s ? " completo" : " (complete 90%)") + '">' + n + "</span>"; }).join("");
    }
    nivelBox();
    FSI.desafio($("#desafio"));
    var grade = $("#modulos");
    lista.forEach(function (n) {
      var d = FSI.mods[n], c = g.mods[n]; resumo(n);
      grade.appendChild(el("a", { class: "mod" + (selo(c) ? " feito" : ""), href: "modulo-" + n + ".html" }, '<span class="meta">Módulo ' + n + " · " + esc(d.unidade) + " · " + c.total + " atividades" + (d.lab ? " · laboratório" : "") + "</span><h3>" + esc(d.titulo) + "</h3><p>" + esc(d.resumoCurto) + '</p><div class="mini" aria-hidden="true"><i style="width:' + Math.round((100 * c.feitas) / (c.total || 1)) + '%"></i></div><span class="go">' + (selo(c) ? "✓ Concluído — revisar" : c.feitas ? "Continuar (" + c.feitas + "/" + c.total + ")" : "Começar") + " →</span>"));
    });
    var mapa = {
      tipo: "rede", id: "mapa-geral", titulo: "Mapa da disciplina", forma: "elipse", h: lista.length <= 6 ? 420 : Math.ceil(lista.length / 3) * 210 - 10, dir: true,
      instr: "Clique em cada módulo para ver o que ele traz e como se liga aos outros. Use o botão para abrir.",
      nos: lista.map(function (n, i) { var xs = lista.length <= 6 ? [[130, 80], [360, 80], [590, 80], [590, 330], [360, 330], [130, 330]][i] : (function () { var r = Math.floor(i / 3), c = i % 3; if (r % 2) c = 2 - c; return [130 + 230 * c, 80 + 210 * r]; })(); var d = FSI.mods[n]; return { id: "m" + n, x: xs[0], y: xs[1], t: "Módulo " + n + "\n" + (lista.length > 6 ? d.nome.replace(/(.{1,15})(\s|$)/g, "$1\n").replace(/\n+$/, "") : d.nome), d: d.resumoCurto, href: "modulo-" + n + ".html" }; }),
      liga: lista.slice(0, -1).map(function (n) { return ["m" + n, "m" + (n + 1)]; })
    };
    visRede(mapa, $("#mapa"), {}, function () { });
    if (location.hash === "#desafio") setTimeout(function () { $("#desafio").scrollIntoView(); }, 50);
    window.addEventListener("hashchange", function () { if (location.hash === "#desafio") $("#desafio").scrollIntoView(); });
    window.PROGRESSO_ID = cfg.disc + "-v1";
    window.PROGRESSO_DADOS = function () { var f = 0, tt = 0, p = 0, det = {}; lista.forEach(function (n) { var c = FSI.contagem(FSI.mods[n]); f += c.feitas; tt += c.total; p += c.pontos; det["modulo" + n] = c.feitas + "/" + c.total; }); det.desafio = recorde() + "/10"; return { feitas: f, total: tt, pontos: p, detalhe: det }; };
    var obs = setInterval(function () { if (!document.body.contains($("#desafio"))) clearInterval(obs); nivelBox(); }, 4000);
  };

  /* ---------- simulado ---------- */
  FSI.montarSimulado = function () {
    var lista = ids(), pool = [], main = FSI.casca("simulado");
    main.innerHTML = '<div class="mhead"><span class="eb">Para fechar a disciplina</span><h1>Simulado final</h1><p>20 afirmações sorteadas de todos os módulos. No fim você vê em quais módulos precisa revisar.</p></div><div class="wrap" id="sim"></div>';
    lista.forEach(function (n) { FSI.mods[n].vf.forEach(function (q) { pool.push({ m: n, q: q }); }); });
    var app = $("#sim"), sorteio, i, certas, porMod, melhor = 0;
    try { melhor = +localStorage.getItem(chave("simulado-melhor")) || 0; } catch (e) { }
    function inicio() { app.innerHTML = '<div class="card"><h2 class="t">Como funciona</h2><p>Para cada afirmação, escolha Verdadeiro ou Falso e depois leia a justificativa do gabarito. Sem pressa: aqui o objetivo é revisar.</p>' + (melhor ? "<p>Seu melhor resultado: <b>" + melhor + "/20</b>.</p>" : "") + '<button class="btn" id="go">Começar</button></div>'; $("#go").onclick = function () { sorteio = embaralha(pool).slice(0, 20); i = 0; certas = 0; porMod = {}; pergunta(); }; }
    function pergunta() {
      var it = sorteio[i], q = it.q, esc_ = null;
      app.innerHTML = '<div class="q"><div class="nq">Questão ' + (i + 1) + " de " + sorteio.length + " · Módulo " + it.m + '</div><div class="enun">' + q[0] + '</div><div class="vfopts" role="group" aria-label="Sua resposta"><button type="button" data-v="1" aria-pressed="false">Verdadeiro</button><button type="button" data-v="0" aria-pressed="false">Falso</button></div><button class="btn" id="resp" disabled>Responder</button><div id="fb" aria-live="polite"></div></div>';
      $$("[data-v]", app).forEach(function (b) { b.onclick = function () { if ($("#resp").getAttribute("data-feito")) return; esc_ = b.getAttribute("data-v") === "1"; $$("[data-v]", app).forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); $("#resp").disabled = false; }; });
      $("#resp").onclick = function () {
        var bt = this;
        if (bt.getAttribute("data-feito")) { i++; i < sorteio.length ? pergunta() : fim(); return; }
        var ok = esc_ === q[1]; if (ok) certas++; porMod[it.m] = porMod[it.m] || [0, 0]; porMod[it.m][1]++; if (ok) porMod[it.m][0]++;
        $("#fb").innerHTML = '<div class="resp ' + (ok ? "" : "bad") + '"><b class="rot">' + (ok ? "Correto" : "Incorreto") + "</b><p><b>Gabarito: " + (q[1] ? "Verdadeiro" : "Falso") + ".</b> " + q[2] + "</p></div>";
        bt.textContent = i + 1 < sorteio.length ? "Próxima →" : "Ver resultado"; bt.setAttribute("data-feito", "1"); bt.focus();
      };
    }
    function fim() {
      if (certas > melhor) { melhor = certas; try { localStorage.setItem(chave("simulado-melhor"), melhor); } catch (e) { } }
      var rev = lista.filter(function (n) { return porMod[n] && porMod[n][0] / porMod[n][1] < 0.7; });
      app.innerHTML = '<div class="card"><h2 class="t">Resultado: ' + certas + " de " + sorteio.length + '</h2><p>' + (certas >= 16 ? "Excelente domínio da disciplina!" : certas >= 12 ? "Bom caminho. Revise os pontos fracos abaixo." : "Vale rever os módulos antes de tentar de novo.") + "</p><ul>" + lista.filter(function (n) { return porMod[n]; }).map(function (n) { return "<li>Módulo " + n + " — " + FSI.mods[n].titulo + ": <b>" + porMod[n][0] + "/" + porMod[n][1] + "</b></li>"; }).join("") + "</ul>" + (rev.length ? "<p>Revisar: " + rev.map(function (n) { return '<a href="modulo-' + n + '.html#vf">Módulo ' + n + "</a>"; }).join(", ") + ".</p>" : "") + '<div class="row"><button class="btn" id="de">Fazer outro simulado</button><a class="btn sec" style="text-decoration:none" href="' + IDX() + '">Voltar à visão geral</a></div></div>';
      $("#de").onclick = inicio; if (window.progressoMudou) window.progressoMudou();
    }
    window.PROGRESSO_ID = FSI.cfg.disc + "-simulado-v1";
    window.PROGRESSO_DADOS = function () { return { feitas: melhor ? 20 : 0, total: 20, pontos: melhor * 5, detalhe: { melhor: melhor + "/20" } }; };
    inicio();
  };
})();
