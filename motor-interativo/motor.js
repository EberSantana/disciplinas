/* Motor das disciplinas interativas — Prof. Eber Santana
 * Cada módulo é um arquivo dados/mN.js que chama FSI.modulo({...}). Este arquivo desenha tudo:
 * estudo, diagramas clicáveis (rede, camadas, linha do tempo), classificar, flashcards,
 * verdadeiro/falso com justificativa, caderno e PBL (a resposta só aparece depois da tentativa).
 */
(function () {
  "use strict";
  var FSI = (window.FSI = { mods: {}, cfg: window.FSI_CFG || { disc: "fsi", nome: "Disciplina" } });
  FSI.modulo = function (d) { FSI.mods[d.n] = d; };

  /* ---------- utilidades ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function el(tag, attrs, html) { var e = document.createElement(tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }
  function plain(s) { return String(s).replace(/\n/g, " "); }
  function embaralha(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var uid = (function () { try { var p = JSON.parse(localStorage.getItem("perfil:aluno") || "null"); return p && p.id ? p.id : "anon"; } catch (e) { return "anon"; } })();
  function chave(n) { return "fsi:" + FSI.cfg.disc + ":" + uid + ":" + n; }
  function ler(n) { try { return JSON.parse(localStorage.getItem(chave(n)) || "null") || {}; } catch (e) { return {}; } }
  function gravar(n, s) { try { localStorage.setItem(chave(n), JSON.stringify(s)); } catch (e) { } if (window.progressoMudou) try { window.progressoMudou(); } catch (e2) { } }
  FSI.ler = ler; FSI.gravar = gravar;

  /* total de itens e feitos de um módulo (usado também pelo índice) */
  FSI.contagem = function (d, S) {
    S = S || ler(d.n);
    var pbl = 0, pblF = 0;
    (d.pbl || []).forEach(function (p, a) { p.passos.forEach(function (_, b) { pbl++; if (S.pbl && S.pbl[a + "." + b] && S.pbl[a + "." + b].ver) pblF++; }); });
    var fcF = Object.keys(S.fc || {}).length, vfF = Object.keys(S.vf || {}).length, cadF = 0;
    Object.keys(S.cad || {}).forEach(function (k) { if (S.cad[k].ver) cadF++; });
    var total = d.fc.length + d.vf.length + d.caderno.length + pbl;
    var feitas = fcF + vfF + cadF + pblF;
    var acertos = 0; Object.keys(S.vf || {}).forEach(function (k) { if (S.vf[k].ok) acertos++; });
    var autoOk = 0;
    Object.keys(S.cad || {}).forEach(function (k) { if (S.cad[k].av === 2) autoOk++; });
    Object.keys(S.pbl || {}).forEach(function (k) { if (S.pbl[k].av === 2) autoOk++; });
    var fcSei = 0; Object.keys(S.fc || {}).forEach(function (k) { if (S.fc[k] === 1) fcSei++; });
    var extras = (S.ex ? Object.keys(S.ex).length : 0);
    var pontos = fcF * 2 + fcSei * 2 + vfF * 3 + acertos * 5 + cadF * 4 + pblF * 4 + autoOk * 3 + extras * 5;
    return { total: total, feitas: feitas, acertos: acertos, pontos: pontos, fc: [fcF, d.fc.length], vf: [vfF, d.vf.length], cad: [cadF, d.caderno.length], pbl: [pblF, pbl] };
  };

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

  /* ---------- páginas ---------- */
  var ABAS = [["estudar", "Estudar"], ["explorar", "Explorar"], ["flash", "Flashcards"], ["vf", "V ou F"], ["caderno", "Caderno"], ["pbl", "PBL"], ["resumo", "Resumo"]];

  FSI.montarModulo = function (n) {
    var d = FSI.mods[n], app = $("#app"), S = ler(n);
    function salvar() { gravar(n, S); atualizaProg(); }
    function atualizaProg() { var c = FSI.contagem(d, S); var b = $(".prog .bar i"); if (b) b.style.width = Math.round((100 * c.feitas) / c.total) + "%"; var t = $(".prog b"); if (t) t.textContent = c.feitas + "/" + c.total + " · " + c.pontos + " pts"; var ct = { flash: c.fc, vf: c.vf, caderno: c.cad, pbl: c.pbl }; Object.keys(ct).forEach(function (k) { var s = $('nav.tabs [data-t="' + k + '"] .n'); if (s) s.textContent = ct[k][0] + "/" + ct[k][1]; }); }
    document.title = "Módulo " + n + " · " + d.titulo + " — " + FSI.cfg.nome;
    var nx = FSI.mods[n + 1] ? '<a href="modulo-' + (n + 1) + '.html">Módulo ' + (n + 1) + " →</a>" : '<a href="simulado.html">Fazer o simulado final →</a>';
    var pv = n > 1 ? '<a href="modulo-' + (n - 1) + '.html">← Módulo ' + (n - 1) + "</a>" : '<a href="./">← Visão geral</a>';
    document.body.insertBefore(el("header", { class: "top" }, '<div class="wrap"><a class="back" href="./">← ' + esc(FSI.cfg.nome) + '</a><span class="eyebrow">Módulo ' + n + " · " + esc(d.unidade) + "</span><h1>" + esc(d.titulo) + "</h1><p>" + esc(d.resumoCurto) + '</p><div class="prog" aria-label="Seu progresso"><div class="bar"><i style="width:0"></i></div><b></b></div></div>'), app);
    var nav = el("nav", { class: "tabs", "aria-label": "Atividades do módulo" }, '<div class="wrap" role="tablist"></div>');
    ABAS.forEach(function (a) { var c = ["flash", "vf", "caderno", "pbl"].indexOf(a[0]) >= 0; $("[role=tablist]", nav).appendChild(el("button", { role: "tab", "data-t": a[0], id: "tab-" + a[0], "aria-controls": "p-" + a[0], "aria-selected": "false", tabindex: "-1" }, a[1] + (c ? ' <span class="n"></span>' : ""))); });
    document.body.insertBefore(nav, app);
    app.innerHTML = '<div class="wrap"></div>'; var W = $(".wrap", app);
    ABAS.forEach(function (a) { W.appendChild(el("section", { class: "painel", id: "p-" + a[0], role: "tabpanel", "aria-labelledby": "tab-" + a[0], hidden: "" })); });
    W.appendChild(el("div", { class: "nav2" }, pv + nx));

    /* Estudar */
    var pe = $("#p-estudar");
    pe.innerHTML = '<h2 class="t">Estudar</h2><p class="lead">Leia as lições na ordem. Antes de abrir cada uma, tente adivinhar o que ela diz — isso fixa melhor.</p><div class="objetivos">' + d.objetivos.map(function (o, i) { return "<div><b>Objetivo " + (i + 1) + "</b>" + o + "</div>"; }).join("") + "</div>";
    d.licoes.forEach(function (l, i) {
      var det = el("details", { class: "licao" }, '<summary><span class="num">' + (i + 1) + "</span>" + esc(l.t) + '</summary><div class="corpo">' + l.txt + (l.pontos ? "<ul>" + l.pontos.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>" : "") + (l.pense ? '<div class="pense"><b>Pare e pense:</b> ' + l.pense + "</div>" : "") + "</div>");
      if (i === 0) det.open = true; pe.appendChild(det);
    });

    /* Explorar */
    var px = $("#p-explorar"); px.innerHTML = '<h2 class="t">Explorar</h2><p class="lead">Diagramas para clicar, linhas do tempo e jogos de classificação. Quanto mais você mexe, mais o conceito fica visível.</p>';
    d.visuais.forEach(function (v) { var h = el("div", { class: "viz" }); px.appendChild(h); ({ rede: visRede, camadas: visCamadas, linha: visLinha, classificar: visClassificar })[v.tipo](v, h, S, salvar); });

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
      b.onclick = function () { abre(b.getAttribute("data-t")); window.scrollTo({ top: 0 }); };
      b.onkeydown = function (e) { var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (k) { e.preventDefault(); abre(all[(i + k + all.length) % all.length].getAttribute("data-t"), true); } };
    });
    abre(location.hash.slice(1)); atualizaProg();
    window.addEventListener("hashchange", function () { abre(location.hash.slice(1)); });
    window.PROGRESSO_ID = FSI.cfg.disc + "-modulo-" + n + "-v1";
    window.PROGRESSO_DADOS = function () { var c = FSI.contagem(d, ler(n)); return { feitas: c.feitas, total: c.total, pontos: c.pontos, detalhe: { flashcards: c.fc.join("/"), vf: c.vf.join("/") + " (" + c.acertos + " certas)", caderno: c.cad.join("/"), pbl: c.pbl.join("/") } }; };
  };

  /* ---------- índice ---------- */
  FSI.montarIndice = function () {
    var ids = Object.keys(FSI.mods).map(Number).sort(), tot = 0, fei = 0, pts = 0;
    var grade = $("#modulos");
    ids.forEach(function (n) {
      var d = FSI.mods[n], c = FSI.contagem(d); tot += c.total; fei += c.feitas; pts += c.pontos;
      grade.appendChild(el("a", { class: "mod", href: "modulo-" + n + ".html" }, '<span class="meta">Módulo ' + n + " · " + esc(d.unidade) + " · ~" + c.total + " atividades</span><h3>" + esc(d.titulo) + "</h3><p>" + esc(d.resumoCurto) + '</p><div class="mini" aria-hidden="true"><i style="width:' + Math.round((100 * c.feitas) / c.total) + '%"></i></div><span class="go">' + (c.feitas ? "Continuar (" + c.feitas + "/" + c.total + ")" : "Começar") + " →</span>"));
    });
    var b = $(".prog .bar i"); if (b) b.style.width = Math.round((100 * fei) / (tot || 1)) + "%"; var t = $(".prog b"); if (t) t.textContent = fei + "/" + tot + " · " + pts + " pts";
    var mapa = {
      tipo: "rede", id: "mapa-geral", titulo: "Mapa da disciplina", forma: "elipse", h: ids.length <= 6 ? 420 : Math.ceil(ids.length / 3) * 210 - 10, dir: true,
      instr: "Clique em cada módulo para ver o que ele traz e como se liga aos outros. Use o botão para abrir.",
      nos: ids.map(function (n, i) { var xs = ids.length <= 6 ? [[130, 80], [360, 80], [590, 80], [590, 330], [360, 330], [130, 330]][i] : (function () { var r = Math.floor(i / 3), c = i % 3; if (r % 2) c = 2 - c; return [130 + 230 * c, 80 + 210 * r]; })(); var d = FSI.mods[n]; return { id: "m" + n, x: xs[0], y: xs[1], t: "Módulo " + n + "\n" + (ids.length > 6 ? d.nome.replace(/(.{1,15})(\s|$)/g, "$1\n").replace(/\n+$/, "") : d.nome), d: d.resumoCurto, href: "modulo-" + n + ".html" }; }),
      liga: ids.slice(0, -1).map(function (n) { return ["m" + n, "m" + (n + 1)]; })
    };
    var S0 = {}; visRede(mapa, $("#mapa"), S0, function () { });
    window.PROGRESSO_ID = FSI.cfg.disc + "-v1";
    window.PROGRESSO_DADOS = function () { var f = 0, tt = 0, p = 0, det = {}; ids.forEach(function (n) { var c = FSI.contagem(FSI.mods[n]); f += c.feitas; tt += c.total; p += c.pontos; det["modulo" + n] = c.feitas + "/" + c.total; }); return { feitas: f, total: tt, pontos: p, detalhe: det }; };
  };

  /* ---------- simulado ---------- */
  FSI.montarSimulado = function () {
    var ids = Object.keys(FSI.mods).map(Number).sort(), pool = [];
    ids.forEach(function (n) { FSI.mods[n].vf.forEach(function (q) { pool.push({ m: n, q: q }); }); });
    var app = $("#sim"), lista, i, certas, porMod, melhor = 0;
    try { melhor = +localStorage.getItem(chave("simulado-melhor")) || 0; } catch (e) { }
    function inicio() { app.innerHTML = '<div class="card"><h2 class="t">Simulado final</h2><p>20 afirmações sorteadas de todos os módulos. Para cada uma, escolha Verdadeiro ou Falso e depois leia a justificativa. No fim você vê em quais módulos precisa revisar.</p>' + (melhor ? "<p>Seu melhor resultado: <b>" + melhor + "/20</b>.</p>" : "") + '<button class="btn" id="go">Começar</button></div>'; $("#go").onclick = function () { lista = embaralha(pool).slice(0, 20); i = 0; certas = 0; porMod = {}; pergunta(); }; }
    function pergunta() {
      var it = lista[i], q = it.q, esc_ = null;
      app.innerHTML = '<div class="q"><div class="nq">Questão ' + (i + 1) + " de " + lista.length + '</div><div class="enun">' + q[0] + '</div><div class="vfopts" role="group" aria-label="Sua resposta"><button type="button" data-v="1" aria-pressed="false">Verdadeiro</button><button type="button" data-v="0" aria-pressed="false">Falso</button></div><button class="btn" id="resp" disabled>Responder</button><div id="fb" aria-live="polite"></div></div>';
      $$("[data-v]", app).forEach(function (b) { b.onclick = function () { if ($("#resp").getAttribute("data-feito")) return; esc_ = b.getAttribute("data-v") === "1"; $$("[data-v]", app).forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); $("#resp").disabled = false; }; });
      $("#resp").onclick = function () {
        var bt = this;
        if (bt.getAttribute("data-feito")) { i++; i < lista.length ? pergunta() : fim(); return; }
        var ok = esc_ === q[1]; if (ok) certas++; porMod[it.m] = porMod[it.m] || [0, 0]; porMod[it.m][1]++; if (ok) porMod[it.m][0]++;
        $("#fb").innerHTML = '<div class="resp ' + (ok ? "" : "bad") + '"><b class="rot">' + (ok ? "Correto" : "Incorreto") + "</b><p><b>Gabarito: " + (q[1] ? "Verdadeiro" : "Falso") + ".</b> " + q[2] + "</p></div>";
        bt.textContent = i + 1 < lista.length ? "Próxima →" : "Ver resultado"; bt.setAttribute("data-feito", "1"); bt.focus();
      };
    }
    function fim() {
      if (certas > melhor) { melhor = certas; try { localStorage.setItem(chave("simulado-melhor"), melhor); } catch (e) { } }
      var rev = ids.filter(function (n) { return porMod[n] && porMod[n][0] / porMod[n][1] < 0.7; });
      app.innerHTML = '<div class="card"><h2 class="t">Resultado: ' + certas + " de " + lista.length + '</h2><p>' + (certas >= 16 ? "Excelente domínio da disciplina!" : certas >= 12 ? "Bom caminho. Revise os pontos fracos abaixo." : "Vale rever os módulos antes de tentar de novo.") + "</p><ul>" + ids.filter(function (n) { return porMod[n]; }).map(function (n) { return "<li>Módulo " + n + " — " + FSI.mods[n].titulo + ": <b>" + porMod[n][0] + "/" + porMod[n][1] + "</b></li>"; }).join("") + "</ul>" + (rev.length ? "<p>Revisar: " + rev.map(function (n) { return '<a href="modulo-' + n + '.html#vf">Módulo ' + n + "</a>"; }).join(", ") + ".</p>" : "") + '<div class="row"><button class="btn" id="de">Fazer outro simulado</button><a class="btn sec" style="text-decoration:none" href="./">Voltar à visão geral</a></div></div>';
      $("#de").onclick = inicio; if (window.progressoMudou) window.progressoMudou();
    }
    window.PROGRESSO_ID = FSI.cfg.disc + "-simulado-v1";
    window.PROGRESSO_DADOS = function () { return { feitas: melhor ? 20 : 0, total: 20, pontos: melhor * 5, detalhe: { melhor: melhor + "/20" } }; };
    inicio();
  };
})();
