/* Simuladores dos laboratórios — Prof. Eber Santana
 * Cada simulador recebe (host, cfg, api). api.ev("nome-do-evento") avisa o motor de que o aluno fez algo;
 * as missões do módulo (d.lab.missoes) dizem qual evento cumpre cada missão.
 */
(function () {
  "use strict";
  var U = FSI.util, $ = U.$, $$ = U.$$, esc = U.esc, el = U.el, embaralha = U.embaralha;
  function num(v, d) { var x = parseFloat(String(v).replace(",", ".")); return isNaN(x) ? d : x; }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim(); }

  /* ===================== genéricos ===================== */

  /* Cenários de decisão: o aluno escolhe a melhor opção e recebe a explicação. */
  FSI.sim("cenarios", function (host, cfg, api) {
    var itens, i, certos, med;
    function inicio() { itens = cfg.embaralhar === false ? cfg.itens.slice() : embaralha(cfg.itens); i = 0; certos = 0; med = cfg.medidor ? cfg.medidor.ini || 50 : null; mostra(); }
    function medidor() { return med == null ? "" : '<div class="medidor"><span>' + esc(cfg.medidor.nome) + '</span><div class="bar" role="progressbar" aria-label="' + esc(cfg.medidor.nome) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + med + '"><i style="width:' + med + '%"></i></div><b>' + med + "%</b></div>"; }
    function mostra() {
      var it = itens[i];
      host.innerHTML = '<div class="cen">' + medidor() + '<div class="nq eb">' + esc(cfg.rotulo || "Cenário") + " " + (i + 1) + " de " + itens.length + " · acertos: " + certos + '</div><p class="enun" style="font-size:18px;font-weight:600;margin:6px 0 8px">' + it.t + '</p><div class="ops"></div><div class="sim-out" aria-live="polite" hidden></div><div class="row"></div></div>';
      var ops = $(".ops", host);
      it.ops.forEach(function (o, k) {
        var b = el("button", { type: "button", class: "btn sec op" }, o[0]);
        b.onclick = function () {
          $$(".op", host).forEach(function (x, kk) { x.disabled = true; if (it.ops[kk][1]) x.classList.add("certo"); });
          var ok = !!o[1]; if (!ok) b.classList.add("errado");
          if (ok) { certos++; api.ev(cfg.id + ":acertos:" + certos); }
          if (med != null) med = Math.max(0, Math.min(100, med + (ok ? 15 : -10)));
          var out = $(".sim-out", host); out.hidden = false; out.className = "sim-out " + (ok ? "ok" : "bad");
          out.innerHTML = "<p><b>" + (ok ? "Boa escolha!" : "Não é a melhor opção.") + "</b> " + (o[2] || "") + "</p>" + (it.expl ? "<p>" + it.expl + "</p>" : "");
          if (med != null) { var m = $(".medidor", host); m.outerHTML = medidor(); if (med >= 80) api.ev(cfg.id + ":medidor80"); }
          var nx = el("button", { type: "button", class: "btn" }, i < itens.length - 1 ? "Próximo cenário →" : "Ver resultado");
          nx.onclick = function () { i++; if (i < itens.length) mostra(); else fim(); };
          $(".row", host).appendChild(nx); nx.focus();
        };
        ops.appendChild(b);
      });
    }
    function fim() {
      api.ev(cfg.id + ":fim"); if (certos === itens.length) api.ev(cfg.id + ":perfeito");
      host.innerHTML = '<div class="sim-out ' + (certos === itens.length ? "ok" : "") + '"><p><b>Resultado: ' + certos + " de " + itens.length + " cenários.</b> " + (certos === itens.length ? "Perfeito!" : "Jogue de novo: a ordem muda e você fixa o raciocínio.") + "</p>" + (med != null ? "<p>" + esc(cfg.medidor.nome) + ": <b>" + med + "%</b></p>" : "") + '</div><button class="btn" type="button">Jogar de novo</button>';
      $("button", host).onclick = inicio;
    }
    inicio();
  });

  /* Montar e rodar um sistema: encaixe as peças nas etapas (entrada, processamento...) e veja funcionar. */
  FSI.sim("fluxo", function (host, cfg, api) {
    var pecas = embaralha(cfg.pecas.map(function (p, i) { return { t: p[0], c: p[1], i: i }; })), pos = {}, selI = null, montado = false;
    host.innerHTML = '<div class="chips" data-pecas></div><div class="slots" data-slots></div><div class="row"><button class="btn" type="button" data-conf>Conferir montagem</button><button class="btn sec" type="button" data-ref>Recomeçar</button><button class="btn sec" type="button" data-run disabled>▶ Rodar o sistema</button></div><div class="sim-out" aria-live="polite">Toque em uma peça e depois na etapa em que ela se encaixa.</div><div class="fluxo-run" data-run-area hidden></div>';
    var P = $("[data-pecas]", host), SL = $("[data-slots]", host), out = $(".sim-out", host);
    function desenha(conf) {
      P.innerHTML = ""; SL.innerHTML = "";
      pecas.forEach(function (p) { if (pos[p.i] != null) return; var b = el("button", { type: "button", "aria-pressed": selI === p.i ? "true" : "false" }, esc(p.t)); if (selI === p.i) b.classList.add("sel"); b.onclick = function () { selI = p.i; desenha(); }; P.appendChild(b); });
      if (!P.children.length) P.innerHTML = '<span class="instr">Todas as peças estão nas etapas. Confira a montagem.</span>';
      cfg.etapas.forEach(function (e, ei) {
        var col = el("div"), cab = el("button", { type: "button", class: "cab" }, esc(e.t));
        cab.setAttribute("aria-label", "Colocar a peça selecionada em " + e.t);
        cab.onclick = function () { if (selI == null) { out.textContent = "Escolha uma peça primeiro."; return; } pos[selI] = ei; selI = null; desenha(); };
        var ul = el("ul"), todasOk = true, alguma = false;
        pecas.forEach(function (p) { if (pos[p.i] !== ei) return; alguma = true; var li = el("li", { tabindex: "0", title: "Clique para devolver" }, esc(p.t)); if (conf && p.c !== ei) { li.className = "bad"; todasOk = false; } li.onclick = function () { delete pos[p.i]; desenha(); }; li.onkeydown = function (ev) { if (ev.key === "Enter") { delete pos[p.i]; desenha(); } }; ul.appendChild(li); });
        if (conf && alguma && todasOk) col.className = "ok";
        col.appendChild(cab); col.appendChild(ul); SL.appendChild(col);
      });
    }
    desenha();
    $("[data-ref]", host).onclick = function () { pos = {}; selI = null; montado = false; $("[data-run]", host).disabled = true; out.textContent = "Toque em uma peça e depois na etapa em que ela se encaixa."; out.className = "sim-out"; desenha(); };
    $("[data-conf]", host).onclick = function () {
      if (Object.keys(pos).length < pecas.length) { out.textContent = "Coloque todas as peças antes de conferir."; return; }
      var erros = pecas.filter(function (p) { return pos[p.i] !== p.c; });
      desenha(true);
      if (!erros.length) { montado = true; out.className = "sim-out ok"; out.innerHTML = "<b>Sistema montado!</b> Agora clique em <b>Rodar o sistema</b> para ver a informação circulando."; $("[data-run]", host).disabled = false; api.ev(cfg.id + ":montou"); }
      else { out.className = "sim-out bad"; out.innerHTML = "<b>" + erros.length + " peça(s) fora do lugar</b> (marcadas em vermelho). Clique nelas para devolver e tente de novo."; }
    };
    $("[data-run]", host).onclick = function () {
      if (!montado) return;
      var area = $("[data-run-area]", host); area.hidden = false; area.innerHTML = cfg.etapas.map(function (e, i) { return "<div><b>" + esc(e.t) + "</b><span>" + (cfg.rodar[i] || "") + "</span></div>"; }).join("");
      var k = 0, divs = $$("div", area); divs.forEach(function (d) { d.classList.remove("on"); });
      (function passo() { divs.forEach(function (d, j) { d.classList.toggle("on", j === k); }); out.innerHTML = "<b>" + esc(cfg.etapas[k].t) + ":</b> " + (cfg.rodar[k] || ""); k++; if (k < divs.length) setTimeout(passo, 1500); else { api.ev(cfg.id + ":rodou"); setTimeout(function () { out.innerHTML += "<br><b>Ciclo completo.</b> " + (cfg.fim || ""); }, 400); } })();
    };
  });

  /* Do dado à informação: filtrar, resumir e ordenar uma tabela para responder perguntas de gestão. */
  FSI.sim("dadosinfo", function (host, cfg, api) {
    var C = cfg.colunas, txt = C.map(function (c, i) { return c.tipo === "num" ? null : i; }).filter(function (x) { return x != null; }), nums = C.map(function (c, i) { return c.tipo === "num" ? i : null; }).filter(function (x) { return x != null; });
    var filtro = null, ord = null, grupo = null, respondidas = {};
    function opts(lista, sel) { return lista.map(function (i) { return '<option value="' + i + '"' + (sel === i ? " selected" : "") + ">" + esc(C[i].n) + "</option>"; }).join(""); }
    host.innerHTML = '<div class="sim-bar"><label>Filtrar <select data-fc>' + opts(txt) + '</select></label><label>igual a <select data-fv></select></label><button class="btn sec" type="button" data-f>Filtrar</button></div>' +
      '<div class="sim-bar"><label>Agrupar por <select data-gc>' + opts(txt) + '</select></label><label>e somar <select data-gs>' + opts(nums) + '</select></label><button class="btn sec" type="button" data-g>Resumir</button></div>' +
      '<div class="sim-bar"><label>Ordenar por <select data-oc></select></label><label><input type="checkbox" data-od checked> do maior para o menor</label><button class="btn sec" type="button" data-o>Ordenar</button><button class="btn sec" type="button" data-l>Limpar tudo</button></div>' +
      '<p class="instr" data-estado></p><div class="tbl-wrap" data-tab></div><h4 style="font:700 22px Barlow Condensed,sans-serif;margin:14px 0 4px">Perguntas do gerente</h4><div data-perg></div>';
    function valores(ci) { var s = {}; cfg.linhas.forEach(function (l) { s[l[ci]] = 1; }); return Object.keys(s); }
    function enchVal() { var ci = +$("[data-fc]", host).value; $("[data-fv]", host).innerHTML = valores(ci).map(function (v) { return "<option>" + esc(v) + "</option>"; }).join(""); }
    enchVal(); $("[data-fc]", host).onchange = enchVal;
    function dadosAtuais() {
      var L = cfg.linhas.filter(function (l) { return !filtro || String(l[filtro[0]]) === filtro[1]; }), cols = C.map(function (c, i) { return i; });
      if (grupo) { var m = {}; L.forEach(function (l) { var k = l[grupo[0]]; m[k] = (m[k] || 0) + l[grupo[1]]; }); L = Object.keys(m).map(function (k) { return [k, Math.round(m[k] * 100) / 100]; }); cols = null; }
      if (ord) L = L.slice().sort(function (a, b) { var x = a[ord[0]], y = b[ord[0]]; var r = typeof x === "number" ? x - y : String(x).localeCompare(String(y), "pt-BR"); return ord[1] ? -r : r; });
      return { L: L, cab: grupo ? [C[grupo[0]], { n: "Total de " + C[grupo[1]].n.toLowerCase(), tipo: "num" }] : C };
    }
    function desenha() {
      var D = dadosAtuais();
      $("[data-oc]", host).innerHTML = D.cab.map(function (c, i) { return '<option value="' + i + '">' + esc(c.n) + "</option>"; }).join("");
      $("[data-tab]", host).innerHTML = '<table class="tbl"><thead><tr>' + D.cab.map(function (c) { return '<th class="' + (c.tipo === "num" ? "num" : "") + '" scope="col">' + esc(c.n) + "</th>"; }).join("") + "</tr></thead><tbody>" + D.L.map(function (l) { return "<tr>" + l.map(function (v, i) { return '<td class="' + (D.cab[i].tipo === "num" ? "num" : "") + '">' + esc(typeof v === "number" ? v.toLocaleString("pt-BR") : v) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>";
      $("[data-estado]", host).textContent = (D.L.length + " linha(s)") + (filtro ? " · filtro: " + C[filtro[0]].n + " = " + filtro[1] : "") + (grupo ? " · resumido por " + C[grupo[0]].n.toLowerCase() : "") + (ord ? " · ordenado" : "") + (!filtro && !grupo && !ord ? " · dados brutos, sem tratamento" : "");
    }
    $("[data-f]", host).onclick = function () { filtro = [+$("[data-fc]", host).value, $("[data-fv]", host).value]; desenha(); api.ev(cfg.id + ":filtrou"); };
    $("[data-g]", host).onclick = function () { grupo = [+$("[data-gc]", host).value, +$("[data-gs]", host).value]; ord = null; desenha(); api.ev(cfg.id + ":resumiu"); };
    $("[data-o]", host).onclick = function () { ord = [+$("[data-oc]", host).value, $("[data-od]", host).checked]; desenha(); api.ev(cfg.id + ":ordenou"); };
    $("[data-l]", host).onclick = function () { filtro = grupo = ord = null; desenha(); };
    var PG = $("[data-perg]", host);
    cfg.perguntas.forEach(function (q, qi) {
      var d = el("div", { class: "q", style: "padding:12px 14px" }, '<label for="dq' + cfg.id + qi + '"><b>' + (qi + 1) + ".</b> " + q.p + '</label><div class="gin" style="margin-top:6px"><input id="dq' + cfg.id + qi + '" type="text" autocomplete="off" placeholder="Sua resposta"><button class="btn" type="button">Conferir</button></div><div class="gfb" aria-live="polite"></div>');
      var inp = $("input", d), fb = $(".gfb", d), tent = 0;
      function conf() {
        var ok = (Array.isArray(q.r) ? q.r : [q.r]).some(function (r) { return typeof r === "number" ? Math.abs(num(inp.value.replace(/\./g, "").replace(",", "."), NaN) - r) < 0.01 || Math.abs(num(inp.value, NaN) - r) < 0.01 : norm(inp.value) === norm(r); });
        if (ok) { fb.innerHTML = '<span style="color:var(--ok)"><b>✔ Certo!</b></span> ' + (q.expl || ""); inp.disabled = true; respondidas[qi] = 1; api.ev(cfg.id + ":resp:" + Object.keys(respondidas).length); if (Object.keys(respondidas).length === cfg.perguntas.length) api.ev(cfg.id + ":todas"); }
        else { tent++; fb.innerHTML = "<b>Ainda não.</b> " + (q.dica || "") + (tent >= 2 ? " <i>Resposta: " + esc(Array.isArray(q.r) ? q.r[0] : q.r) + "</i>" : ""); }
      }
      $("button", d).onclick = conf; inp.onkeydown = function (e) { if (e.key === "Enter") conf(); };
      PG.appendChild(d);
    });
    desenha();
  });

  /* Matriz de risco: probabilidade × impacto, comparação com o especialista e tratamento. */
  FSI.sim("risco", function (host, cfg, api) {
    var A = cfg.ameacas, R = A.map(function () { return { p: 0, i: 0, t: "" }; }), TR = ["Mitigar", "Transferir", "Evitar", "Aceitar"];
    function nivel(r) { return r === 0 ? ["—", ""] : r <= 4 ? ["Baixo", "nv-b"] : r <= 9 ? ["Médio", "nv-m"] : r <= 16 ? ["Alto", "nv-a"] : ["Crítico", "nv-c"]; }
    function sel(nome, val, k) { var h = '<select data-' + nome + '="' + k + '" aria-label="' + (nome === "p" ? "Probabilidade" : "Impacto") + " de " + esc(A[k].t) + '"><option value="0">—</option>'; for (var v = 1; v <= 5; v++) h += '<option value="' + v + '"' + (val === v ? " selected" : "") + ">" + v + "</option>"; return h + "</select>"; }
    host.innerHTML = '<p class="instr">Probabilidade e impacto vão de 1 (muito baixo) a 5 (muito alto). Risco = probabilidade × impacto.</p><div class="tbl-wrap" data-t></div><div class="row"><button class="btn sec" type="button" data-cmp>Comparar com a análise do especialista</button><button class="btn" type="button" data-trt>Conferir tratamentos</button></div><div class="sim-out" aria-live="polite" hidden></div><h4 style="font:700 22px Barlow Condensed,sans-serif;margin:12px 0 0">Matriz de calor</h4><div class="matriz" data-m aria-label="Matriz de risco: linhas são impacto, colunas são probabilidade"></div>';
    function desenha(cmp) {
      $("[data-t]", host).innerHTML = '<table class="tbl"><thead><tr><th>#</th><th>Ameaça</th><th>Prob.</th><th>Impacto</th><th class="num">Risco</th><th>Nível</th><th>Tratamento</th>' + (cmp ? "<th>Especialista</th>" : "") + "</tr></thead><tbody>" + A.map(function (a, k) {
        var r = R[k].p * R[k].i, nv = nivel(r), ref = a.p * a.i;
        return "<tr><td>" + (k + 1) + "</td><td>" + esc(a.t) + "</td><td>" + sel("p", R[k].p, k) + "</td><td>" + sel("i", R[k].i, k) + '</td><td class="num">' + (r || "—") + '</td><td class="' + nv[1] + '">' + nv[0] + '</td><td><select data-tr="' + k + '" aria-label="Tratamento de ' + esc(a.t) + '"><option value="">—</option>' + TR.map(function (t) { return "<option" + (R[k].t === t ? " selected" : "") + ">" + t + "</option>"; }).join("") + "</select></td>" + (cmp ? "<td>P" + a.p + " × I" + a.i + " = <b class='" + nivel(ref)[1] + "'>" + ref + " (" + nivel(ref)[0] + ")</b></td>" : "") + "</tr>";
      }).join("") + "</tbody></table>";
      $$("select", host).forEach(function (s) {
        s.onchange = function () {
          var k = +(s.getAttribute("data-p") || s.getAttribute("data-i") || s.getAttribute("data-tr"));
          if (s.hasAttribute("data-p")) R[k].p = +s.value; else if (s.hasAttribute("data-i")) R[k].i = +s.value; else R[k].t = s.value;
          desenha(cmp); if (R.every(function (x) { return x.p && x.i; })) api.ev(cfg.id + ":avaliou");
          var f = $('[data-' + (s.hasAttribute("data-p") ? "p" : s.hasAttribute("data-i") ? "i" : "tr") + '="' + k + '"]', host); if (f) f.focus();
        };
      });
      var m = ""; for (var i = 5; i >= 1; i--) { m += '<div class="ax">I' + i + "</div>"; for (var p = 1; p <= 5; p++) { var r = i * p, cl = r <= 4 ? "r1" : r <= 9 ? "r2" : r <= 16 ? "r3" : "r4", dentro = ""; R.forEach(function (x, k) { if (x.p === p && x.i === i) dentro += "<i>" + (k + 1) + "</i>"; }); m += '<div class="' + cl + '">' + dentro + "</div>"; } }
      m += '<div class="ax"></div>' + [1, 2, 3, 4, 5].map(function (p) { return '<div class="ax">P' + p + "</div>"; }).join("");
      $("[data-m]", host).innerHTML = m;
    }
    desenha(false);
    $("[data-cmp]", host).onclick = function () {
      desenha(true); var out = $(".sim-out", host); out.hidden = false; out.className = "sim-out";
      var dif = A.filter(function (a, k) { return R[k].p && R[k].i && Math.abs(R[k].p * R[k].i - a.p * a.i) >= 6; }).length;
      out.innerHTML = "<p>A coluna <b>Especialista</b> mostra a análise de referência. " + (dif ? dif + " ameaça(s) ficaram bem longe da referência: releia o cenário e discuta com a turma — análise de risco também é argumentação." : "Sua análise ficou próxima da referência.") + "</p>";
      api.ev(cfg.id + ":comparou");
    };
    $("[data-trt]", host).onclick = function () {
      var out = $(".sim-out", host); out.hidden = false;
      if (R.some(function (x) { return !x.t; })) { out.className = "sim-out bad"; out.textContent = "Escolha um tratamento para cada ameaça antes de conferir."; return; }
      var ok = 0, h = "<ul>";
      A.forEach(function (a, k) { var c = R[k].t === a.trat; if (c) ok++; h += "<li><b>" + (k + 1) + ". " + (c ? "✔" : "✘ esperado: " + a.trat) + "</b> — " + a.fb + "</li>"; });
      out.className = "sim-out " + (ok === A.length ? "ok" : ""); out.innerHTML = "<p><b>" + ok + " de " + A.length + " tratamentos alinhados à referência.</b></p>" + h + "</ul>";
      api.ev(cfg.id + ":tratou"); if (ok === A.length) api.ev(cfg.id + ":tratou-certo");
    };
  });

  /* ===================== Sistemas Operacionais ===================== */
  function gantt(linhas, total) {
    var esc_ = ""; for (var t = 0; t < total; t++) esc_ += "<span>" + (t % Math.max(1, Math.ceil(total / 20)) === 0 ? t : "") + "</span>";
    return '<div class="gantt">' + linhas.map(function (l) {
      return '<div class="gl"><b>' + esc(l.nome) + '</b><div class="gt">' + l.seg.map(function (s) { var w = (100 * (s.f - s.i)) / total; return '<span class="' + (s.c || "ocioso") + '" style="width:' + w + '%" title="' + esc(s.t) + " de " + s.i + " a " + s.f + '">' + (w > 4 ? esc(s.r || s.t) : "") + "</span>"; }).join("") + "</div></div>";
    }).join("") + '<div class="gescala"><span></span><div>' + esc_ + "</div></div></div>";
  }
  function junta(seg) { var r = []; seg.forEach(function (s) { var u = r[r.length - 1]; if (u && u.t === s.t && u.f === s.i) u.f = s.f; else r.push({ i: s.i, f: s.f, t: s.t, c: s.c, r: s.r }); }); return r; }

  /* Mono x multiprogramação: o que a CPU faz enquanto um programa espera a E/S. */
  FSI.sim("multiprog", function (host, cfg, api) {
    var base = cfg.progs.map(function (p) { return { n: p.n, r: p.r.slice() }; }), progs = base.map(function (p) { return { n: p.n, r: p.r.slice() }; }), feitos = {};
    host.innerHTML = '<div class="tbl-wrap" data-p></div><div class="row"><button class="btn" type="button" data-m="mono">▶ Monoprogramação</button><button class="btn" type="button" data-m="multi">▶ Multiprogramação</button><button class="btn sec" type="button" data-add="io">+ Programa I/O-bound</button><button class="btn sec" type="button" data-add="cpu">+ Programa CPU-bound</button><button class="btn sec" type="button" data-rst>Restaurar</button></div><div data-g></div><div class="sim-out" aria-live="polite">Cada programa alterna rajadas de <b>CPU</b> (cálculo) e de <b>E/S</b> (espera do disco, da rede, do teclado). Rode os dois modos e compare o uso da CPU.</div>';
    function tabela() { $("[data-p]", host).innerHTML = '<table class="tbl"><thead><tr><th>Programa</th><th>Rajadas (CPU, E/S, CPU…) em unidades de tempo</th><th class="num">CPU total</th><th class="num">E/S total</th></tr></thead><tbody>' + progs.map(function (p, k) { var c = 0, e = 0; p.r.forEach(function (x, j) { if (j % 2) e += x; else c += x; }); return '<tr><td><span class="cP' + k + '" style="display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:6px"></span>' + esc(p.n) + "</td><td>" + p.r.map(function (x, j) { return (j % 2 ? "E/S " : "CPU ") + x; }).join(" → ") + '</td><td class="num">' + c + '</td><td class="num">' + e + "</td></tr>"; }).join("") + "</tbody></table>"; }
    function mono() {
      var t = 0, cpu = [], io = progs.map(function () { return []; });
      progs.forEach(function (p, k) { p.r.forEach(function (x, j) { if (j % 2) { io[k].push({ i: t, f: t + x, t: "E/S", c: "cP" + k, r: "E/S" }); cpu.push({ i: t, f: t + x, t: "ociosa" }); } else cpu.push({ i: t, f: t + x, t: p.n, c: "cP" + k }); t += x; }); });
      return { t: t, cpu: junta(cpu), io: io };
    }
    function multi() {
      var st = progs.map(function (p) { return { j: 0, rest: p.r[0], io: false, fim: false }; }), fila = progs.map(function (p, k) { return k; }), run = -1, t = 0, cpu = [], io = progs.map(function () { return []; });
      while (st.some(function (s) { return !s.fim; }) && t < 500) {
        st.forEach(function (s, k) { if (s.io && s.rest <= 0) { s.io = false; s.j++; if (s.j >= progs[k].r.length) s.fim = true; else { s.rest = progs[k].r[s.j]; fila.push(k); } } });
        if (run < 0 && fila.length) run = fila.shift();
        if (run >= 0) cpu.push({ i: t, f: t + 1, t: progs[run].n, c: "cP" + run }); else cpu.push({ i: t, f: t + 1, t: "ociosa" });
        st.forEach(function (s, k) { if (s.io) { io[k].push({ i: t, f: t + 1, t: "E/S", c: "cP" + k, r: "E/S" }); s.rest--; } });
        if (run >= 0) { var s = st[run]; s.rest--; if (s.rest <= 0) { s.j++; if (s.j >= progs[run].r.length) s.fim = true; else { s.rest = progs[run].r[s.j]; s.io = true; } run = -1; } }
        t++;
      }
      return { t: t, cpu: junta(cpu), io: io.map(junta) };
    }
    function roda(modo) {
      var R = modo === "mono" ? mono() : multi(), ocup = 0; R.cpu.forEach(function (s) { if (s.c) ocup += s.f - s.i; });
      var u = Math.round((100 * ocup) / R.t);
      $("[data-g]", host).innerHTML = "<h4 style='margin:10px 0 0'>" + (modo === "mono" ? "Monoprogramação: um programa de cada vez" : "Multiprogramação: enquanto um espera, outro usa a CPU") + "</h4>" + gantt([{ nome: "CPU", seg: R.cpu }].concat(progs.map(function (p, k) { return { nome: p.n + " E/S", seg: R.io[k] }; })), R.t);
      feitos[modo] = { t: R.t, u: u, n: progs.length };
      var out = $(".sim-out", host), h = "<p><b>" + (modo === "mono" ? "Mono" : "Multi") + ":</b> tempo total " + R.t + " · CPU ocupada " + ocup + " de " + R.t + " → <b>uso da CPU " + u + "%</b>.</p>";
      if (feitos.mono && feitos.multi && feitos.mono.n === feitos.multi.n) { h += "<p>Comparação: a multiprogramação terminou tudo em <b>" + feitos.multi.t + "</b> em vez de <b>" + feitos.mono.t + "</b> e subiu o uso da CPU de " + feitos.mono.u + "% para " + feitos.multi.u + "%. A CPU não ficou de braços cruzados esperando a E/S.</p>"; api.ev(cfg.id + ":comparou"); }
      out.innerHTML = h; api.ev(cfg.id + ":" + modo); if (modo === "multi" && u >= 80) api.ev(cfg.id + ":util80");
    }
    $$("[data-m]", host).forEach(function (b) { b.onclick = function () { roda(b.getAttribute("data-m")); }; });
    $$("[data-add]", host).forEach(function (b) { b.onclick = function () { if (progs.length >= 5) { $(".sim-out", host).textContent = "Máximo de 5 programas."; return; } var io = b.getAttribute("data-add") === "io"; progs.push({ n: (io ? "Chat " : "Render ") + (progs.length + 1), r: io ? [1, 4, 1, 4, 1] : [6, 1, 6] }); feitos = {}; tabela(); $("[data-g]", host).innerHTML = ""; api.ev(cfg.id + ":add"); }; });
    $("[data-rst]", host).onclick = function () { progs = base.map(function (p) { return { n: p.n, r: p.r.slice() }; }); feitos = {}; tabela(); $("[data-g]", host).innerHTML = ""; };
    tabela();
  });

  /* Estados de um processo: dispare os eventos e veja o processo mudar de estado (com PCB). */
  FSI.sim("estados", function (host, cfg, api) {
    var POS = { novo: [70, 104], pronto: [260, 104], executando: [470, 104], terminado: [650, 104], bloqueado: [365, 266] }, NOME = { novo: "Novo", pronto: "Pronto", executando: "Executando", bloqueado: "Bloqueado", terminado: "Terminado" };
    var TR = [["novo", "pronto", "admitir"], ["pronto", "executando", "escalonar"], ["executando", "pronto", "fim do quantum"], ["executando", "bloqueado", "pede E/S"], ["bloqueado", "pronto", "E/S concluída"], ["executando", "terminado", "termina"]];
    var EVT = [["admitir", "Admitir (criar)"], ["escalonar", "Escalonar (dar a CPU)"], ["quantum", "Fim do quantum"], ["es", "Pedir E/S"], ["esok", "E/S concluída"], ["fim", "Encerrar"]];
    var P = (cfg.procs || ["Navegador", "Editor", "Backup"]).map(function (n, k) { return { n: n, pid: 101 + k, e: "novo", pc: 0, ax: 0, arq: [], hist: [] }; }), sel = 0, ultimo = null;
    var svg = '<svg viewBox="0 0 740 336" role="img" aria-label="Diagrama de estados de processo"><defs><marker id="seta-est" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>';
    function linha(a, b, rot, curva, k) { var A = POS[a], B = POS[b], x1 = A[0] + (B[0] > A[0] ? 62 : B[0] < A[0] ? -62 : 0), y1 = A[1] + (B[1] > A[1] ? 26 : B[1] < A[1] ? -26 : 0), x2 = B[0] + (B[0] > A[0] ? -62 : B[0] < A[0] ? 62 : 0), y2 = B[1] + (B[1] > A[1] ? -26 : B[1] < A[1] ? 26 : 0); if (a === "executando" && b === "pronto") { return '<path data-tr="' + k + '" class="tr" style="color:var(--muted)" d="M' + (A[0] - 40) + "," + (A[1] - 26) + " C " + (A[0] - 80) + "," + (A[1] - 80) + " " + (B[0] + 80) + "," + (B[1] - 80) + " " + (B[0] + 40) + "," + (B[1] - 26) + '" marker-end="url(#seta-est)"/><text class="trl" x="' + (A[0] + B[0]) / 2 + '" y="' + (A[1] - 66) + '">' + rot + "</text>"; } if (a === "executando" && b === "bloqueado") { x1 = A[0] - 20; y1 = A[1] + 26; x2 = B[0] + 50; y2 = B[1] - 26; } if (a === "bloqueado" && b === "pronto") { x1 = A[0] - 50; y1 = A[1] - 26; x2 = B[0] + 20; y2 = B[1] + 26; } var mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 8; return '<line data-tr="' + k + '" class="tr" style="color:var(--muted)" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" marker-end="url(#seta-est)"/><text class="trl" x="' + mx + '" y="' + my + '">' + rot + "</text>"; }
    TR.forEach(function (t, k) { svg += linha(t[0], t[1], t[2], false, k); });
    Object.keys(POS).forEach(function (s) { svg += '<g class="st" data-st="' + s + '"><rect x="' + (POS[s][0] - 62) + '" y="' + (POS[s][1] - 26) + '" width="124" height="52" rx="12"/><text x="' + POS[s][0] + '" y="' + (POS[s][1] - 4) + '">' + NOME[s] + '</text><g class="toks" transform="translate(' + (POS[s][0] - 30) + "," + (POS[s][1] + 14) + ')"></g></g>'; });
    svg += "</svg>";
    host.innerHTML = '<div class="estados sv" tabindex="0" role="region" aria-label="Diagrama de estados">' + svg + '</div><p class="instr"><b>1.</b> Escolha um processo · <b>2.</b> dispare um evento. Só um processo pode estar Executando de cada vez (uma CPU).</p><div class="procs" role="group" aria-label="Processos"></div><div class="procs" role="group" aria-label="Eventos" data-ev></div><div class="sim-out" aria-live="polite"></div><h4 style="margin:8px 0 0">PCB do processo selecionado</h4><div class="pcb" data-pcb></div><div class="log" data-log role="log" aria-label="Histórico de transições"></div>';
    var CORES = ["#1F5135", "#8A5A00", "#7A3E8E", "#1D6B6B"];
    function desenha() {
      $$(".toks", host).forEach(function (g) { g.innerHTML = ""; });
      var por = {}; P.forEach(function (p, k) { (por[p.e] = por[p.e] || []).push(k); });
      Object.keys(por).forEach(function (s) { var g = $('[data-st="' + s + '"] .toks', host); por[s].forEach(function (k, j) { g.innerHTML += '<g class="tok"><circle cx="' + (j * 22) + '" cy="0" r="10" fill="' + CORES[k % 4] + '"/><text x="' + (j * 22) + '" y="4">P' + (k + 1) + "</text></g>"; }); });
      $$(".st", host).forEach(function (g) { g.classList.toggle("cheio", !!por[g.getAttribute("data-st")]); });
      $$(".tr", host).forEach(function (l) { l.classList.toggle("on", ultimo === +l.getAttribute("data-tr")); l.style.color = ultimo === +l.getAttribute("data-tr") ? "var(--accent)" : "var(--muted)"; });
      var pr = $(".procs", host); pr.innerHTML = "";
      P.forEach(function (p, k) { var b = el("button", { type: "button", "aria-pressed": sel === k ? "true" : "false" }, '<i style="background:' + CORES[k % 4] + '"></i>P' + (k + 1) + " · " + esc(p.n) + " <small>(" + NOME[p.e] + ")</small>"); b.onclick = function () { sel = k; desenha(); }; pr.appendChild(b); });
      var p = P[sel];
      $("[data-pcb]", host).innerHTML = "<div><b>PID</b>" + p.pid + "</div><div><b>Estado</b>" + NOME[p.e] + "</div><div><b>Contador de programa</b>0x" + (4096 + p.pc * 4).toString(16).toUpperCase() + "</div><div><b>Registrador AX</b>" + p.ax + "</div><div><b>Prioridade</b>" + (sel + 1) + "</div><div><b>Arquivos abertos</b>" + (p.arq.length ? esc(p.arq.join(", ")) : "nenhum") + "</div>";
    }
    var ev = $("[data-ev]", host);
    EVT.forEach(function (e) { var b = el("button", { type: "button" }, e[1]); b.onclick = function () { dispara(e[0]); }; ev.appendChild(b); });
    function log(t, cl) { var L = $("[data-log]", host); L.insertBefore(el("div", { class: cl || "" }, t), L.firstChild); }
    function erro(msg) { var o = $(".sim-out", host); o.className = "sim-out bad"; o.innerHTML = "<b>Transição proibida.</b> " + msg; log("✘ " + msg, "bad"); api.ev(cfg.id + ":erro"); }
    function vai(p, para, k, msg) {
      var de = p.e; p.e = para; ultimo = TR.findIndex(function (t) { return t[0] === de && t[1] === para; });
      if (de === "executando") { p.pc += 3 + Math.floor(Math.random() * 9); p.ax = Math.floor(Math.random() * 900) + 10; }
      p.hist.push(para); var o = $(".sim-out", host); o.className = "sim-out ok"; o.innerHTML = "<b>P" + (k + 1) + ": " + NOME[de] + " → " + NOME[para] + ".</b> " + msg;
      log("✔ P" + (k + 1) + " " + NOME[de] + " → " + NOME[para], "ok"); api.ev(cfg.id + ":" + de + ">" + para);
      var h = p.hist.slice(-4).join(">"); if (h === "executando>bloqueado>pronto>executando") api.ev(cfg.id + ":ciclo");
      if (para === "terminado") { api.ev(cfg.id + ":terminou"); if (P.every(function (q) { return q.e === "terminado"; })) api.ev(cfg.id + ":todos"); }
      desenha();
    }
    function dispara(e) {
      var p = P[sel], k = sel, exe = P.findIndex(function (q) { return q.e === "executando"; });
      if (e === "admitir") { if (p.e !== "novo") return erro("Só processos <b>novos</b> são admitidos. P" + (k + 1) + " já foi criado e está em " + NOME[p.e] + "."); return vai(p, "pronto", k, "O SO criou o PCB e colocou o processo na fila de prontos."); }
      if (e === "escalonar") { if (p.e === "bloqueado") return erro("Um processo <b>bloqueado</b> não vai direto para a CPU: quando a E/S termina ele volta para <b>Pronto</b> e espera a vez."); if (p.e !== "pronto") return erro("Só processos <b>prontos</b> podem ganhar a CPU. P" + (k + 1) + " está em " + NOME[p.e] + "."); if (exe >= 0) return erro("A CPU já está ocupada por <b>P" + (exe + 1) + "</b>. Com uma CPU, só um processo executa de cada vez: tire-o antes (quantum, E/S ou fim)."); return vai(p, "executando", k, "O escalonador escolheu este processo; o despachante carregou o contexto dele na CPU."); }
      if (e === "quantum") { if (p.e !== "executando") return erro("O fim do quantum só afeta quem está <b>executando</b>."); return vai(p, "pronto", k, "O tempo dele acabou (preempção). Volta para o fim da fila de prontos e o contexto fica salvo no PCB."); }
      if (e === "es") { if (p.e !== "executando") return erro("Só quem está <b>executando</b> pode pedir E/S — é uma instrução do programa."); p.arq.push(["dados.txt", "rede", "teclado"][p.arq.length % 3]); return vai(p, "bloqueado", k, "Pediu E/S e vai esperar o dispositivo. A CPU fica livre para outro processo."); }
      if (e === "esok") { if (p.e !== "bloqueado") return erro("Só um processo <b>bloqueado</b> espera a conclusão de E/S."); return vai(p, "pronto", k, "O dispositivo gerou uma interrupção: a E/S terminou. O processo volta para a fila de prontos (não direto para a CPU)."); }
      if (e === "fim") { if (p.e !== "executando") return erro("O processo encerra executando sua última instrução — precisa estar <b>executando</b>."); p.arq = []; return vai(p, "terminado", k, "O processo terminou; o SO libera memória, arquivos e o PCB."); }
    }
    desenha();
  });

  /* Escalonamento de CPU: FIFO, SJF, prioridade e Round Robin com gráfico de Gantt. */
  function escalona(procs, alg, q) {
    var P = procs.map(function (p, k) { return { k: k, n: p.n, ch: p.ch, d: p.d, pr: p.pr, rest: p.d, fim: 0, ini: null }; }), t = 0, seg = [], feitos = 0, n = P.length;
    if (alg === "rr") {
      var fila = [], chegou = {}, cur = null;
      function chegam(ate) { P.slice().sort(function (a, b) { return a.ch - b.ch || a.k - b.k; }).forEach(function (p) { if (!chegou[p.k] && p.ch <= ate) { chegou[p.k] = 1; fila.push(p); } }); }
      chegam(0);
      while (feitos < n && t < 1000) {
        if (!fila.length) { var prox = Math.min.apply(null, P.filter(function (p) { return !chegou[p.k]; }).map(function (p) { return p.ch; })); seg.push({ i: t, f: prox, t: "ociosa" }); t = prox; chegam(t); continue; }
        cur = fila.shift(); if (cur.ini == null) cur.ini = t; var dt = Math.min(q, cur.rest); seg.push({ i: t, f: t + dt, t: cur.n, c: "cP" + cur.k }); t += dt; cur.rest -= dt;
        chegam(t); if (cur.rest > 0) fila.push(cur); else { cur.fim = t; feitos++; }
      }
    } else {
      while (feitos < n && t < 1000) {
        var disp = P.filter(function (p) { return p.rest > 0 && p.ch <= t; });
        if (!disp.length) { var nx = Math.min.apply(null, P.filter(function (p) { return p.rest > 0; }).map(function (p) { return p.ch; })); seg.push({ i: t, f: nx, t: "ociosa" }); t = nx; continue; }
        disp.sort(function (a, b) { return alg === "sjf" ? a.d - b.d || a.ch - b.ch || a.k - b.k : alg === "prio" ? a.pr - b.pr || a.ch - b.ch || a.k - b.k : a.ch - b.ch || a.k - b.k; });
        var p = disp[0]; p.ini = t; seg.push({ i: t, f: t + p.d, t: p.n, c: "cP" + p.k }); t += p.d; p.rest = 0; p.fim = t; feitos++;
      }
    }
    P.forEach(function (p) { p.ta = p.fim - p.ch; p.es = p.ta - p.d; p.resp = p.ini - p.ch; });
    var med = function (c) { return Math.round((P.reduce(function (s, p) { return s + p[c]; }, 0) / n) * 100) / 100; };
    return { P: P, seg: junta(seg), t: t, mEs: med("es"), mTa: med("ta"), mResp: med("resp"), trocas: seg.filter(function (s) { return s.c; }).length - 1 };
  }
  FSI.escalona = escalona;
  var ALG = { fifo: "FIFO (FCFS)", sjf: "SJF (menor job primeiro)", prio: "Prioridade (menor número = maior prioridade)", rr: "Round Robin (circular)" };
  FSI.sim("escalonamento", function (host, cfg, api) {
    var procs = cfg.procs.map(function (p) { return Object.assign({}, p); });
    host.innerHTML = '<div class="tbl-wrap" data-t></div><div class="row"><button class="btn sec" type="button" data-add>+ Processo</button><button class="btn sec" type="button" data-rm>− Processo</button><button class="btn sec" type="button" data-rst>Restaurar exemplo</button></div><div class="sim-bar"><label>Algoritmo <select data-alg>' + Object.keys(ALG).map(function (k) { return '<option value="' + k + '">' + ALG[k] + "</option>"; }).join("") + '</select></label><label data-ql>Quantum <input type="number" min="1" max="10" value="' + (cfg.quantum || 2) + '" data-q></label><button class="btn" type="button" data-run>▶ Executar</button><button class="btn sec" type="button" data-cmp>Comparar os 4 algoritmos</button></div><div data-g></div><div class="sim-out" aria-live="polite">Escolha um algoritmo e clique em <b>Executar</b>. Tempo de espera = tempo na fila de prontos; turnaround = término − chegada.</div>';
    function tabela() {
      $("[data-t]", host).innerHTML = '<table class="tbl"><thead><tr><th>Processo</th><th>Chegada</th><th>Duração (rajada)</th><th>Prioridade</th></tr></thead><tbody>' + procs.map(function (p, k) { return '<tr><td><span class="cP' + k + '" style="display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:6px"></span>' + esc(p.n) + '</td><td><input type="number" min="0" max="30" value="' + p.ch + '" data-k="' + k + '" data-c="ch" aria-label="Chegada de ' + p.n + '"></td><td><input type="number" min="1" max="20" value="' + p.d + '" data-k="' + k + '" data-c="d" aria-label="Duração de ' + p.n + '"></td><td><input type="number" min="1" max="9" value="' + p.pr + '" data-k="' + k + '" data-c="pr" aria-label="Prioridade de ' + p.n + '"></td></tr>'; }).join("") + "</tbody></table>";
      $$("input[data-k]", host).forEach(function (i) { i.onchange = function () { var v = Math.max(+i.min, Math.min(+i.max, Math.round(num(i.value, 1)))); i.value = v; procs[+i.getAttribute("data-k")][i.getAttribute("data-c")] = v; api.ev(cfg.id + ":editou"); }; });
    }
    function qVis() { $("[data-ql]", host).style.display = $("[data-alg]", host).value === "rr" ? "" : "none"; }
    $("[data-alg]", host).onchange = qVis;
    $("[data-add]", host).onclick = function () { if (procs.length >= 6) return; procs.push({ n: "P" + (procs.length + 1), ch: procs.length, d: 3, pr: 3 }); tabela(); api.ev(cfg.id + ":editou"); };
    $("[data-rm]", host).onclick = function () { if (procs.length <= 2) return; procs.pop(); tabela(); };
    $("[data-rst]", host).onclick = function () { procs = cfg.procs.map(function (p) { return Object.assign({}, p); }); tabela(); };
    $("[data-run]", host).onclick = function () {
      var a = $("[data-alg]", host).value, q = Math.max(1, Math.round(num($("[data-q]", host).value, 2))), R = escalona(procs, a, q);
      $("[data-g]", host).innerHTML = "<h4 style='margin:8px 0 0'>" + ALG[a] + (a === "rr" ? " · quantum " + q : "") + "</h4>" + gantt([{ nome: "CPU", seg: R.seg }], R.t) +
        '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Processo</th><th class="num">Chegada</th><th class="num">Duração</th><th class="num">Término</th><th class="num">Turnaround</th><th class="num">Espera</th></tr></thead><tbody>' + R.P.map(function (p) { return "<tr><td>" + esc(p.n) + '</td><td class="num">' + p.ch + '</td><td class="num">' + p.d + '</td><td class="num">' + p.fim + '</td><td class="num">' + p.ta + '</td><td class="num">' + p.es + "</td></tr>"; }).join("") + '<tr><th colspan="4">Médias</th><th class="num">' + R.mTa + '</th><th class="num">' + R.mEs + "</th></tr></tbody></table></div>";
      $(".sim-out", host).innerHTML = "<b>Espera média: " + R.mEs + "</b> · turnaround médio: " + R.mTa + " · trocas de contexto: " + R.trocas + "." + (a === "fifo" ? " Repare se algum processo longo na frente fez os curtos esperarem (efeito comboio)." : a === "rr" ? " Diminua o quantum e veja as trocas de contexto aumentarem; aumente muito e o RR vira FIFO." : a === "prio" ? " Processos de prioridade baixa podem esperar muito (inanição); o envelhecimento (aging) resolve." : " O SJF dá a menor espera média, mas exige saber a duração com antecedência.");
      api.ev(cfg.id + ":" + a); if (a === "rr") api.ev(cfg.id + ":rr:q" + q);
    };
    $("[data-cmp]", host).onclick = function () {
      var q = Math.max(1, Math.round(num($("[data-q]", host).value, 2))), R = Object.keys(ALG).map(function (a) { return [a, escalona(procs, a, q)]; }), mx = Math.max.apply(null, R.map(function (r) { return r[1].mEs; })) || 1, best = R.slice().sort(function (a, b) { return a[1].mEs - b[1].mEs; })[0];
      $("[data-g]", host).innerHTML = "<h4 style='margin:8px 0 4px'>Espera média por algoritmo (quantum " + q + " no RR)</h4><div class='barras'>" + R.map(function (r) { return "<div><span>" + ALG[r[0]].split(" (")[0] + '</span><i style="width:' + Math.max(2, (100 * r[1].mEs) / mx) + '%"></i><b>' + r[1].mEs + "</b></div>"; }).join("") + "</div>";
      $(".sim-out", host).innerHTML = "Com estes processos, a menor espera média foi do <b>" + ALG[best[0]].split(" (")[0] + "</b>. Mude as durações ou as chegadas e compare de novo: não existe algoritmo perfeito para tudo.";
      api.ev(cfg.id + ":comparou");
    };
    tabela(); qVis();
  });

  /* Condição de corrida: dois caixas eletrônicos sacando da mesma conta, com e sem trava (mutex). */
  FSI.sim("corrida", function (host, cfg, api) {
    var S0 = cfg.saldo || 500, saques = { A: cfg.a || 100, B: cfg.b || 50 }, st, PASSOS = ["Ler o saldo da conta", "Calcular saldo − saque", "Gravar o novo saldo"];
    host.innerHTML = '<div class="sim-bar"><label><input type="checkbox" data-mx> Usar trava (mutex) na região crítica</label><button class="btn sec" type="button" data-rst>Recomeçar</button></div><div class="dev" data-cx></div><div class="sim-out" aria-live="polite"></div><div class="log" data-log role="log" aria-label="Ordem de execução"></div>';
    function zera() { st = { saldo: S0, A: { p: 0, loc: null }, B: { p: 0, loc: null }, trava: null, ordem: [] }; $("[data-log]", host).innerHTML = ""; $(".sim-out", host).className = "sim-out"; $(".sim-out", host).innerHTML = "Saldo inicial R$ " + S0 + ". Caixa A saca R$ " + saques.A + " e caixa B saca R$ " + saques.B + ". O certo, no fim, é R$ " + (S0 - saques.A - saques.B) + ". Escolha você a ordem dos passos."; desenha(); }
    function desenha() {
      var mx = $("[data-mx]", host).checked;
      $("[data-cx]", host).innerHTML = '<div><b>Conta (memória compartilhada)</b><span style="font:700 26px JetBrains Mono,monospace">R$ ' + st.saldo + "</span>" + (mx ? "<br><small>Trava: " + (st.trava ? "com o caixa " + st.trava : "livre") + "</small>" : "") + "</div>" + ["A", "B"].map(function (c) { var x = st[c]; return "<div><b>Caixa " + c + " · saque R$ " + saques[c] + "</b><small>Variável local: " + (x.loc == null ? "—" : "R$ " + x.loc) + "</small><ol style='padding-left:20px;margin:6px 0'>" + PASSOS.map(function (p, i) { return "<li style='" + (i < x.p ? "color:var(--ok)" : i === x.p ? "font-weight:700" : "color:var(--muted)") + "'>" + p + (i < x.p ? " ✓" : "") + "</li>"; }).join("") + '</ol><button class="btn" type="button" data-c="' + c + '"' + (x.p >= 3 ? " disabled" : "") + ">Próximo passo do caixa " + c + "</button></div>"; }).join("");
      $$("[data-c]", host).forEach(function (b) { b.onclick = function () { passo(b.getAttribute("data-c")); }; });
    }
    function log(t, cl) { $("[data-log]", host).appendChild(el("div", { class: cl || "" }, t)); }
    function passo(c) {
      var x = st[c], mx = $("[data-mx]", host).checked, out = $(".sim-out", host);
      if (x.p === 0) { if (mx && st.trava && st.trava !== c) { out.className = "sim-out bad"; out.innerHTML = "<b>Caixa " + c + " bloqueado:</b> a trava está com o caixa " + st.trava + ". Ele precisa terminar a região crítica (ler → calcular → gravar) primeiro."; log("⏸ " + c + " tentou entrar, mas a trava está com " + st.trava, "bad"); api.ev(cfg.id + ":bloqueou"); return; } if (mx) st.trava = c; x.loc = st.saldo; log(c + ": leu saldo = R$ " + st.saldo); }
      else if (x.p === 1) { x.loc = x.loc - saques[c]; log(c + ": calculou " + (x.loc + saques[c]) + " − " + saques[c] + " = R$ " + x.loc); }
      else { st.saldo = x.loc; log(c + ": gravou saldo = R$ " + st.saldo); if (mx) st.trava = null; }
      x.p++; desenha();
      if (st.A.p === 3 && st.B.p === 3) {
        var certo = S0 - saques.A - saques.B;
        if (st.saldo === certo) { out.className = "sim-out ok"; out.innerHTML = "<b>Saldo final R$ " + st.saldo + " — correto.</b> " + (mx ? "A trava garantiu a exclusão mútua: um caixa só leu o saldo depois que o outro gravou." : "Desta vez deu certo porque um caixa terminou antes do outro começar — sorte da ordem, não garantia."); api.ev(cfg.id + (mx ? ":mutex-ok" : ":sorte")); }
        else { out.className = "sim-out bad"; out.innerHTML = "<b>Saldo final R$ " + st.saldo + " — errado! Deveria ser R$ " + certo + ".</b> Os dois caixas leram o saldo antigo e o último a gravar apagou a atualização do outro: isso é uma <b>condição de corrida</b>. Ligue a trava (mutex) e tente de novo."; api.ev(cfg.id + ":perdeu"); }
      }
    }
    $("[data-rst]", host).onclick = zera; $("[data-mx]", host).onchange = zera;
    zera();
  });

  /* Spooling de impressão: sem spool os programas travam esperando a impressora; com spool, seguem livres. */
  FSI.sim("spool", function (host, cfg, api) {
    var apps = [["Editor de texto", 3], ["Navegador", 2], ["Planilha", 4]], fila = [], imp = null, timer = null, impressos = 0, est = apps.map(function () { return "livre"; });
    host.innerHTML = '<div class="sim-bar"><label><input type="checkbox" data-sp> Spooling ligado (fila no disco)</label><button class="btn sec" type="button" data-rst>Recomeçar</button></div><div class="dev" data-apps></div><div class="dev"><div><b>🖨 Impressora</b><span data-imp>Livre</span></div><div><b>Spool (fila no disco)</b><div class="fila" data-fila aria-live="polite"></div></div></div><div class="sim-out" aria-live="polite">Mande os três programas imprimirem, com o spooling desligado e depois ligado. Observe quem fica travado.</div>';
    var CORES = ["#1F5135", "#8A5A00", "#7A3E8E"];
    function desenha() {
      var sp = $("[data-sp]", host).checked;
      $("[data-apps]", host).innerHTML = apps.map(function (a, k) { return "<div><b>" + a[0] + "</b><span class='" + (est[k] === "travado" ? "st-trav" : "st-ok") + "'>" + (est[k] === "travado" ? "⏸ Travado esperando a impressora" : est[k] === "spool" ? "✓ Livre (job está no spool)" : est[k] === "imprimindo" ? "⏸ Ocupado imprimindo direto" : "✓ Livre") + '</span><br><button class="btn" type="button" data-a="' + k + '"' + (est[k] !== "livre" ? " disabled" : "") + ">Imprimir (" + a[1] + " páginas)</button></div>"; }).join("");
      $$("[data-a]", host).forEach(function (b) { b.onclick = function () { pede(+b.getAttribute("data-a")); }; });
      $("[data-imp]", host).innerHTML = imp ? "Imprimindo <b>" + apps[imp.k][0] + "</b>: página " + imp.feitas + " de " + apps[imp.k][1] : "Livre";
      $("[data-fila]", host).innerHTML = fila.length ? fila.map(function (j) { return '<span style="background:' + CORES[j.k] + '">' + apps[j.k][0] + "</span>"; }).join("") : '<small class="instr">' + (sp ? "vazia" : "desligado") + "</small>";
    }
    function pede(k) {
      var sp = $("[data-sp]", host).checked, out = $(".sim-out", host);
      if (sp) { fila.push({ k: k }); est[k] = "spool"; out.innerHTML = apps[k][0] + " gravou o documento no spool e já está livre para continuar trabalhando."; if (fila.length + (imp ? 1 : 0) >= 3) api.ev(cfg.id + ":fila3"); setTimeout(function () { if (est[k] === "spool") { est[k] = "livre"; desenha(); } }, 900); }
      else if (imp || fila.length) { fila.push({ k: k }); est[k] = "travado"; out.innerHTML = "<b>" + apps[k][0] + " travou:</b> a impressora está ocupada e, sem spool, o programa fica bloqueado até ela liberar."; api.ev(cfg.id + ":travou"); }
      else { fila.push({ k: k }); est[k] = "imprimindo"; }
      roda(); desenha();
    }
    function roda() {
      if (timer) return;
      timer = setInterval(function () {
        if (!imp) { if (!fila.length) { clearInterval(timer); timer = null; desenha(); return; } var j = fila.shift(); imp = { k: j.k, feitas: 0 }; if (!$("[data-sp]", host).checked) est[j.k] = "imprimindo"; }
        imp.feitas++;
        if (imp.feitas >= apps[imp.k][1]) { if (est[imp.k] === "imprimindo") est[imp.k] = "livre"; if ($("[data-sp]", host).checked) { impressos++; if (impressos >= 3) api.ev(cfg.id + ":impressos3"); } imp = null; }
        desenha();
      }, 800);
    }
    $("[data-rst]", host).onclick = function () { clearInterval(timer); timer = null; fila = []; imp = null; impressos = 0; est = apps.map(function () { return "livre"; }); desenha(); };
    $("[data-sp]", host).onchange = function () { $("[data-rst]", host).onclick(); };
    desenha();
  });

  /* Alocação contígua: first-fit, best-fit e worst-fit, fragmentação e compactação. */
  FSI.sim("alocacao", function (host, cfg, api) {
    var ini = cfg.mapa || [["SO", 150], [null, 100], ["A", 80], [null, 500], ["B", 120], [null, 200], ["C", 60], [null, 300], ["D", 90], [null, 600]], mem, novos, cont;
    var COR = { SO: "so", A: "cP5", B: "cP5", C: "cP5", D: "cP5" };
    host.innerHTML = '<div class="sv" tabindex="0" role="region" aria-label="Mapa da memória"><div class="mem" data-mem></div></div><p class="instr" data-st></p><div class="sim-bar"><label>Novo processo de <input type="number" min="10" max="900" value="' + (cfg.tam || 212) + '" data-t> KB</label><label>Estratégia <select data-e><option value="first">First-fit (primeiro que cabe)</option><option value="best">Best-fit (o menor que cabe)</option><option value="worst">Worst-fit (o maior)</option></select></label><button class="btn" type="button" data-al>Alocar</button></div><div class="sim-bar"><label>Liberar <select data-lib></select></label><button class="btn sec" type="button" data-lb>Liberar</button><button class="btn sec" type="button" data-cp>Compactar</button><button class="btn sec" type="button" data-rst>Recomeçar</button></div><div class="sim-out" aria-live="polite">Blocos cinza são <b>livres</b>. Escolha uma estratégia e aloque um processo de 212 KB.</div>';
    function zera() { mem = ini.map(function (b) { return { p: b[0], t: b[1] }; }); novos = []; cont = 0; desenha(); }
    function livres() { return mem.map(function (b, i) { return [b, i]; }).filter(function (x) { return !x[0].p; }); }
    function desenha() {
      var tot = mem.reduce(function (s, b) { return s + b.t; }, 0);
      $("[data-mem]", host).innerHTML = mem.map(function (b) { var cl = !b.p ? "livre" : b.p === "SO" ? "so" : "uso " + (COR[b.p] || "cP" + (1 + (novos.indexOf(b.p) % 4))); return '<div class="' + cl + '" style="width:' + (100 * b.t) / tot + '%" title="' + (b.p || "livre") + " " + b.t + ' KB">' + (b.p ? esc(b.p) : "livre") + "<br>" + b.t + "</div>"; }).join("");
      var L = livres().map(function (x) { return x[0].t; }), soma = L.reduce(function (s, v) { return s + v; }, 0);
      $("[data-st]", host).textContent = "Livre no total: " + soma + " KB em " + L.length + " bloco(s) · maior bloco livre: " + (L.length ? Math.max.apply(null, L) : 0) + " KB.";
      $("[data-lib]", host).innerHTML = novos.length ? novos.map(function (p) { return "<option>" + p + "</option>"; }).join("") : "<option value=''>(nenhum processo novo)</option>";
    }
    $("[data-al]", host).onclick = function () {
      var t = Math.round(num($("[data-t]", host).value, 0)), e = $("[data-e]", host).value, L = livres().filter(function (x) { return x[0].t >= t; }), out = $(".sim-out", host);
      if (t <= 0) return;
      if (!L.length) { var soma = livres().reduce(function (s, x) { return s + x[0].t; }, 0); out.className = "sim-out bad"; if (soma >= t) { out.innerHTML = "<b>Fragmentação externa!</b> Há " + soma + " KB livres no total, mas nenhum bloco contíguo de " + t + " KB. Experimente <b>Compactar</b>."; api.ev(cfg.id + ":fragext"); } else out.innerHTML = "<b>Memória insuficiente:</b> só há " + soma + " KB livres. Libere algum processo."; return; }
      var esc_ = e === "first" ? L[0] : L.slice().sort(function (a, b) { return e === "best" ? a[0].t - b[0].t : b[0].t - a[0].t; })[0], b = esc_[0], i = esc_[1], nome = "P" + (++cont), sobra = b.t - t;
      mem.splice(i, 1, { p: nome, t: t }); if (sobra > 0) mem.splice(i + 1, 0, { p: null, t: sobra }); novos.push(nome);
      out.className = "sim-out ok"; out.innerHTML = "<b>" + nome + " (" + t + " KB)</b> foi para o bloco livre de <b>" + b.t + " KB</b> com " + ({ first: "first-fit: o primeiro que coube", best: "best-fit: o menor que coube", worst: "worst-fit: o maior disponível" })[e] + ". Sobrou um buraco de " + sobra + " KB.";
      desenha(); api.ev(cfg.id + ":" + e);
    };
    function funde() { for (var i = mem.length - 1; i > 0; i--) if (!mem[i].p && !mem[i - 1].p) { mem[i - 1].t += mem[i].t; mem.splice(i, 1); } }
    $("[data-lb]", host).onclick = function () { var p = $("[data-lib]", host).value; if (!p) return; mem.forEach(function (b) { if (b.p === p) b.p = null; }); novos = novos.filter(function (x) { return x !== p; }); funde(); desenha(); $(".sim-out", host).className = "sim-out"; $(".sim-out", host).innerHTML = p + " terminou e liberou a memória; blocos livres vizinhos foram unidos."; api.ev(cfg.id + ":liberou"); };
    $("[data-cp]", host).onclick = function () { var oc = mem.filter(function (b) { return b.p; }), li = mem.filter(function (b) { return !b.p; }).reduce(function (s, b) { return s + b.t; }, 0); mem = oc.concat(li ? [{ p: null, t: li }] : []); desenha(); $(".sim-out", host).className = "sim-out"; $(".sim-out", host).innerHTML = "<b>Compactação:</b> todos os processos foram movidos para o início e os buracos viraram um só bloco de " + li + " KB. Custa caro: o sistema para enquanto copia a memória."; api.ev(cfg.id + ":compactou"); };
    $("[data-rst]", host).onclick = zera;
    zera();
  });

  /* Paginação: traduz endereço lógico em físico, com falta de página. */
  FSI.sim("paginacao", function (host, cfg, api) {
    var T = cfg.tam || 4096, NF = cfg.frames || 8, tab0 = cfg.tabela || [5, 2, null, 7, null, 0, 3, null], tab, carga, n = 0, pend = null;
    host.innerHTML = '<div class="duas" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))"><div><h4 style="margin:4px 0">Tabela de páginas do processo</h4><div class="tbl-wrap" data-tp></div></div><div><h4 style="margin:4px 0">Memória física (RAM) · frames de ' + T + ' bytes</h4><div class="tbl-wrap" data-rf></div></div></div><div class="sim-bar"><label>Endereço lógico (decimal) <input type="text" inputmode="numeric" value="' + (cfg.end || 9000) + '" data-e style="width:120px"></label><button class="btn" type="button" data-tr>Traduzir</button><button class="btn sec" type="button" data-pf disabled>Tratar a falta de página</button><button class="btn sec" type="button" data-rst>Recomeçar</button></div><div class="sim-out" aria-live="polite">Digite um endereço lógico e clique em Traduzir. Tamanho da página: <b>' + T + " bytes</b>; o processo tem " + tab0.length + " páginas (0 a " + (tab0.length - 1) + ").</div>";
    function zera() { tab = tab0.slice(); carga = []; tab.forEach(function (f, p) { if (f != null) carga.push(p); }); pend = null; $("[data-pf]", host).disabled = true; desenha(); }
    function desenha(hp) {
      $("[data-tp]", host).innerHTML = '<table class="tbl"><thead><tr><th class="num">Página</th><th>Frame</th><th>Válida?</th></tr></thead><tbody>' + tab.map(function (f, p) { return "<tr" + (hp === p ? ' style="outline:3px solid var(--accent)"' : "") + '><td class="num">' + p + "</td><td>" + (f == null ? "—" : f) + "</td><td>" + (f == null ? "não (está no disco)" : "sim") + "</td></tr>"; }).join("") + "</tbody></table>";
      var ram = []; for (var f = 0; f < NF; f++) { var dono = tab.indexOf(f); ram.push("<tr><td class='num'>" + f + "</td><td>" + (dono >= 0 ? "página " + dono + " deste processo" : f === 1 || f === 4 ? "outro processo" : "livre") + "</td></tr>"); }
      $("[data-rf]", host).innerHTML = '<table class="tbl"><thead><tr><th class="num">Frame</th><th>Conteúdo</th></tr></thead><tbody>' + ram.join("") + "</tbody></table>";
    }
    $("[data-tr]", host).onclick = function () {
      var E = Math.floor(num($("[data-e]", host).value.replace(/\D/g, ""), -1)), out = $(".sim-out", host);
      if (E < 0) { out.textContent = "Digite um número inteiro."; return; }
      var p = Math.floor(E / T), d = E % T;
      if (p >= tab.length) { out.className = "sim-out bad"; out.innerHTML = "<b>Endereço fora do espaço do processo.</b> " + E + " ÷ " + T + " dá a página " + p + ", mas o processo só tem páginas de 0 a " + (tab.length - 1) + ". A MMU gera uma exceção e o SO encerra o processo (proteção de memória)."; api.ev(cfg.id + ":protecao"); return; }
      var h = "<p><b>1.</b> Página = ⌊" + E + " ÷ " + T + "⌋ = <b>" + p + "</b></p><p><b>2.</b> Deslocamento = " + E + " mod " + T + " = <b>" + d + "</b></p>";
      if (tab[p] == null) { out.className = "sim-out bad"; out.innerHTML = h + "<p><b>3.</b> Tabela: a página " + p + " está marcada como <b>inválida</b> → <b>FALTA DE PÁGINA</b> (page fault). A MMU interrompe e o SO assume.</p>"; pend = { E: E, p: p }; $("[data-pf]", host).disabled = false; desenha(p); api.ev(cfg.id + ":falta"); return; }
      var F = tab[p] * T + d; out.className = "sim-out ok"; out.innerHTML = h + "<p><b>3.</b> Tabela: página " + p + " → <b>frame " + tab[p] + "</b></p><p><b>4.</b> Endereço físico = " + tab[p] + " × " + T + " + " + d + " = <b>" + F + "</b></p>";
      desenha(p); n++; api.ev(cfg.id + ":traduziu"); if (n >= 3) api.ev(cfg.id + ":3");
    };
    $("[data-pf]", host).onclick = function () {
      if (!pend) return;
      var usados = tab.filter(function (f) { return f != null; }).concat([1, 4]), livre = -1, vit = null;
      for (var f = 0; f < NF; f++) if (usados.indexOf(f) < 0) { livre = f; break; }
      if (livre < 0) { vit = carga.shift(); livre = tab[vit]; tab[vit] = null; }
      tab[pend.p] = livre; carga.push(pend.p);
      $(".sim-out", host).className = "sim-out"; $(".sim-out", host).innerHTML = "<b>Falta de página tratada:</b> " + (vit != null ? "não havia frame livre, então a página " + vit + " (a mais antiga, FIFO) voltou para o disco; " : "") + "o SO leu a página " + pend.p + " do disco para o <b>frame " + livre + "</b>, marcou-a como válida e mandou repetir a instrução. Clique em Traduzir de novo.";
      pend = null; $("[data-pf]", host).disabled = true; desenha(); api.ev(cfg.id + ":tratou");
    };
    $("[data-rst]", host).onclick = zera;
    zera();
  });

  /* Substituição de páginas: FIFO, LRU e Ótimo, passo a passo. */
  function substitui(refs, nf, alg) {
    var fr = [], passos = [], faltas = 0, ord = [], uso = {};
    refs.forEach(function (r, i) {
      var hit = fr.indexOf(r) >= 0, vit = null;
      if (!hit) {
        faltas++;
        if (fr.length < nf) { fr.push(r); ord.push(r); }
        else {
          if (alg === "fifo") vit = ord.shift();
          else if (alg === "lru") vit = fr.slice().sort(function (a, b) { return uso[a] - uso[b]; })[0];
          else { var prox = fr.map(function (p) { var k = refs.indexOf(p, i + 1); return [p, k < 0 ? 1e9 : k]; }); vit = prox.sort(function (a, b) { return b[1] - a[1]; })[0][0]; }
          fr[fr.indexOf(vit)] = r; if (alg === "fifo") ord.push(r);
        }
      }
      uso[r] = i; passos.push({ r: r, fr: fr.slice(), hit: hit, vit: vit });
    });
    return { passos: passos, faltas: faltas };
  }
  FSI.substitui = substitui;
  FSI.sim("substituicao", function (host, cfg, api) {
    var NOMES = { fifo: "FIFO", lru: "LRU (menos usada recentemente)", otimo: "Ótimo (a que demora mais a ser usada)" }, k = 0, R = null;
    host.innerHTML = '<div class="sim-bar"><label>Sequência de páginas <input type="text" data-r value="' + esc(cfg.refs || "7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1") + '" style="min-width:260px;flex:1"></label><label>Frames <input type="number" min="1" max="6" value="' + (cfg.frames || 3) + '" data-f></label><label>Algoritmo <select data-a><option value="fifo">FIFO</option><option value="lru">LRU</option><option value="otimo">Ótimo</option></select></label></div><div class="row"><button class="btn" type="button" data-p>Próximo passo</button><button class="btn" type="button" data-t>▶ Rodar tudo</button><button class="btn sec" type="button" data-z>Recomeçar</button><button class="btn sec" type="button" data-c>Comparar os três</button></div><div class="sv" tabindex="0" role="region" aria-label="Quadro de frames" data-g></div><div class="sim-out" aria-live="polite">Cada coluna é um acesso a uma página. Em vermelho, falta de página (a página não estava na RAM).</div>';
    function refs() { return $("[data-r]", host).value.split(/[\s,;]+/).filter(Boolean).map(Number).filter(function (x) { return !isNaN(x); }).slice(0, 30); }
    function calc() { var a = $("[data-a]", host).value, nf = Math.max(1, Math.min(6, Math.round(num($("[data-f]", host).value, 3)))); R = { a: a, nf: nf, rs: refs() }; R.res = substitui(R.rs, nf, a); }
    function desenha() {
      var P = R.res.passos.slice(0, k), n = R.rs.length, h = '<div class="frames" style="--n:' + n + '"><div class="rh">Página</div>' + R.rs.map(function (r, i) { return '<div class="ref" style="' + (i >= k ? "opacity:.45" : "") + '">' + r + "</div>"; }).join("");
      for (var f = 0; f < R.nf; f++) { h += '<div class="rh">Frame ' + f + "</div>"; for (var i = 0; i < n; i++) { var p = P[i]; h += p ? '<div class="' + (!p.hit && p.fr[f] === p.r ? "novo" : "") + '">' + (p.fr[f] != null ? p.fr[f] : "") + "</div>" : "<div></div>"; } }
      h += '<div class="rh">Resultado</div>' + R.rs.map(function (r, i) { var p = P[i]; return p ? '<div class="' + (p.hit ? "acerto" : "falta") + '" title="' + (p.hit ? "acerto" : "falta" + (p.vit != null ? ", saiu a página " + p.vit : "")) + '">' + (p.hit ? "✓" : "F") + "</div>" : "<div></div>"; }).join("") + "</div>";
      $("[data-g]", host).innerHTML = h;
      var f2 = P.filter(function (p) { return !p.hit; }).length, ult = P[P.length - 1];
      $(".sim-out", host).innerHTML = (ult ? "Acesso à página <b>" + ult.r + "</b>: " + (ult.hit ? "já estava na RAM (acerto)." : "falta de página" + (ult.vit != null ? "; o " + NOMES[R.a].split(" (")[0] + " escolheu tirar a página <b>" + ult.vit + "</b>." : "; havia frame livre.")) + "<br>" : "") + "<b>" + NOMES[R.a] + "</b> · faltas até agora: <b>" + f2 + "</b> em " + k + " acessos." + (k === n ? " Total: <b>" + R.res.faltas + " faltas</b>." : "");
    }
    $("[data-p]", host).onclick = function () { if (!R || k >= R.rs.length) { calc(); k = 0; } k++; desenha(); api.ev(cfg.id + ":passo"); if (k === R.rs.length) api.ev(cfg.id + ":" + R.a); };
    $("[data-t]", host).onclick = function () { calc(); k = R.rs.length; desenha(); api.ev(cfg.id + ":" + R.a); };
    $("[data-z]", host).onclick = function () { calc(); k = 0; desenha(); };
    $("[data-c]", host).onclick = function () {
      calc(); var rs = R.rs, nf = R.nf, res = ["fifo", "lru", "otimo"].map(function (a) { return [a, substitui(rs, nf, a).faltas]; }), mx = Math.max.apply(null, res.map(function (r) { return r[1]; }));
      $("[data-g]", host).innerHTML = "<div class='barras'>" + res.map(function (r) { return "<div><span>" + NOMES[r[0]].split(" (")[0] + '</span><i style="width:' + (100 * r[1]) / mx + '%"></i><b>' + r[1] + " faltas</b></div>"; }).join("") + "</div>";
      $(".sim-out", host).innerHTML = "Com " + nf + " frames e " + rs.length + " acessos: o <b>Ótimo</b> é o melhor possível, mas exige saber o futuro (serve de régua). O <b>LRU</b> chega perto usando o passado recente; o <b>FIFO</b> é simples, mas pode tirar uma página muito usada.";
      api.ev(cfg.id + ":comparou");
    };
    calc(); desenha();
  });

  /* Terminal Linux simulado: navegação, arquivos, permissões e processos. */
  FSI.sim("terminal", function (host, cfg, api) {
    function d(f, m) { return { t: "d", m: m || 493, f: f || {} }; }
    function a(c, m) { return { t: "-", m: m || 420, c: c || "" }; }
    var raiz, cwd, hist = [], hi = 0, USER = "aluno";
    function zera() {
      raiz = d({ home: d({ aluno: d({ documentos: d({ "trabalho.txt": a("Trabalho de Sistemas Operacionais\nTema: escalonamento de processos.\n") }), fotos: d({ "praia.jpg": a("(imagem)", 420) }), "script.sh": a("#!/bin/bash\necho \"Olá do script! O SO executou este arquivo.\"\n", 420), "leia-me.txt": a("Bem-vindo ao terminal do laboratório.\nDigite help para ver os comandos.\n") }) }), etc: d({ passwd: a("root:x:0:0:root:/root:/bin/bash\naluno:x:1000:1000:Aluno:/home/aluno:/bin/bash\n", 420), hostname: a("lab-ifs\n") }, 493), tmp: d({}, 1023), bin: d({ ls: a("", 493), bash: a("", 493) }) });
      cwd = ["home", "aluno"];
    }
    zera();
    host.innerHTML = '<div class="term" data-tm role="region" aria-label="Terminal Linux simulado"><div data-out role="log" aria-live="polite"></div><form data-f autocomplete="off"><span class="pr" data-pr></span><label class="sr" for="tin-' + (cfg.id || "t") + '">Comando</label><input id="tin-' + (cfg.id || "t") + '" data-in spellcheck="false" autocapitalize="off"></form></div><p class="instr">Comandos: <code>help</code>, <code>pwd</code>, <code>ls -l</code>, <code>cd</code>, <code>mkdir</code>, <code>touch</code>, <code>cat</code>, <code>echo texto &gt; arquivo</code>, <code>rm</code>, <code>chmod</code>, <code>./script.sh</code>, <code>ps</code>, <code>free -h</code>, <code>uname -a</code>, <code>whoami</code>, <code>clear</code>. Setas ↑ ↓ repetem comandos.</p>';
    var OUT = $("[data-out]", host), IN = $("[data-in]", host);
    function caminho(arr) { return "/" + arr.join("/"); }
    function bonito(arr) { var c = caminho(arr); return c.indexOf("/home/aluno") === 0 ? "~" + c.slice(11) : c; }
    function prompt() { $("[data-pr]", host).textContent = USER + "@lab-ifs:" + bonito(cwd) + "$"; }
    function linha(t, cl) { OUT.appendChild(el("div", { class: "tl " + (cl || "") }, t)); var tm = $("[data-tm]", host); tm.scrollTop = tm.scrollHeight; }
    function resolve(p) { if (!p) return cwd.slice(); var partes = p === "~" || p.indexOf("~/") === 0 ? ["home", "aluno"].concat(p.slice(2).split("/")) : p[0] === "/" ? p.split("/") : cwd.concat(p.split("/")), r = []; partes.forEach(function (x) { if (!x || x === ".") return; if (x === "..") r.pop(); else r.push(x); }); return r; }
    function no(arr) { var n = raiz; for (var i = 0; i < arr.length; i++) { if (!n || n.t !== "d" || !n.f[arr[i]]) return null; n = n.f[arr[i]]; } return n; }
    function pai(arr) { return no(arr.slice(0, -1)); }
    function perm(n) { var s = n.t === "d" ? "d" : "-", m = n.m; ["r", "w", "x", "r", "w", "x", "r", "w", "x"].forEach(function (c, i) { s += (m >> (8 - i)) & 1 ? c : "-"; }); return s; }
    function oct(m) { return ((m >> 6) & 7) + "" + ((m >> 3) & 7) + "" + (m & 7); }
    var CMD = {
      help: function () { return "Comandos disponíveis:\n  pwd            mostra a pasta atual\n  ls [-l] [-a]   lista arquivos (com -l mostra permissões)\n  cd PASTA       entra na pasta (cd .. volta, cd ~ vai para casa)\n  mkdir NOME     cria uma pasta\n  touch NOME     cria um arquivo vazio\n  cat ARQ        mostra o conteúdo\n  echo TXT > ARQ grava texto no arquivo\n  rm ARQ / rmdir PASTA  apagam\n  chmod 754 ARQ  muda permissões (também u+x, g-w, o-r...)\n  ./script.sh    executa um arquivo\n  ps             lista processos e seus estados\n  free -h        memória RAM e swap\n  uname -a       informações do sistema\n  man CMD        explica um comando"; },
      pwd: function () { api.ev("term:pwd"); return caminho(cwd); },
      whoami: function () { return USER; },
      uname: function (ar) { api.ev("term:uname"); return ar.indexOf("-a") >= 0 ? "Linux lab-ifs 6.8.0-ifs #1 SMP x86_64 GNU/Linux" : "Linux"; },
      clear: function () { OUT.innerHTML = ""; return null; },
      history: function () { return hist.map(function (h, i) { return "  " + (i + 1) + "  " + h; }).join("\n"); },
      ls: function (ar) {
        var op = ar.filter(function (x) { return x[0] === "-"; }).join(""), alvo = ar.filter(function (x) { return x[0] !== "-"; })[0], arr = resolve(alvo), n = no(arr);
        if (!n) return { e: "ls: não foi possível acessar '" + alvo + "': Arquivo ou diretório inexistente" };
        var itens = n.t === "d" ? Object.keys(n.f).sort() : [arr[arr.length - 1]], fonte = n.t === "d" ? n.f : { x: n };
        if (op.indexOf("a") >= 0 && n.t === "d") itens = [".", ".."].concat(itens);
        api.ev("term:ls"); if (op.indexOf("l") >= 0) { api.ev("term:ls-l"); return { h: itens.map(function (k) { var x = k === "." || k === ".." ? d() : n.t === "d" ? fonte[k] : n; return esc(perm(x) + " 1 " + USER + " " + USER + " " + String(x.t === "d" ? 4096 : x.c.length).padStart(5) + " nov  8 10:" + String(10 + k.length).slice(-2) + " ") + (x.t === "d" ? '<span class="dir">' + esc(k) + "</span>" : esc(k)); }).join("\n") }; }
        return { h: itens.map(function (k) { var x = n.t === "d" ? fonte[k] : n; return x && x.t === "d" || k === "." || k === ".." ? '<span class="dir">' + esc(k) + "/</span>" : esc(k); }).join("   ") };
      },
      cd: function (ar) { var arr = resolve(ar[0] || "~"), n = no(arr); if (!n) return { e: "cd: " + ar[0] + ": Arquivo ou diretório inexistente" }; if (n.t !== "d") return { e: "cd: " + ar[0] + ": Não é um diretório" }; cwd = arr; api.ev("term:cd"); if (arr.join("/") === "home/aluno/projetos") api.ev("term:cd:projetos"); return null; },
      mkdir: function (ar) { if (!ar[0]) return { e: "mkdir: falta operando" }; var arr = resolve(ar[0]), p = pai(arr), nm = arr[arr.length - 1]; if (!p || p.t !== "d") return { e: "mkdir: não foi possível criar o diretório '" + ar[0] + "'" }; if (p.f[nm]) return { e: "mkdir: não foi possível criar o diretório '" + ar[0] + "': Arquivo existe" }; p.f[nm] = d(); api.ev("term:mkdir:" + nm); return null; },
      touch: function (ar) { if (!ar[0]) return { e: "touch: falta operando" }; var arr = resolve(ar[0]), p = pai(arr), nm = arr[arr.length - 1]; if (!p || p.t !== "d") return { e: "touch: não foi possível tocar '" + ar[0] + "'" }; if (!p.f[nm]) p.f[nm] = a(""); api.ev("term:touch:" + nm); if (arr.slice(0, -1).join("/") === "home/aluno/projetos") api.ev("term:touch-projetos"); return null; },
      cat: function (ar) { var n = no(resolve(ar[0])); if (!n) return { e: "cat: " + ar[0] + ": Arquivo ou diretório inexistente" }; if (n.t === "d") return { e: "cat: " + ar[0] + ": É um diretório" }; if (!((n.m >> 8) & 1)) return { e: "cat: " + ar[0] + ": Permissão negada" }; api.ev("term:cat"); return n.c.replace(/\n$/, ""); },
      rm: function (ar) { var arr = resolve(ar[0]), p = pai(arr), nm = arr[arr.length - 1]; if (!p || !p.f[nm]) return { e: "rm: não foi possível remover '" + ar[0] + "': Arquivo ou diretório inexistente" }; if (p.f[nm].t === "d") return { e: "rm: não foi possível remover '" + ar[0] + "': É um diretório (use rmdir)" }; delete p.f[nm]; api.ev("term:rm"); return null; },
      rmdir: function (ar) { var arr = resolve(ar[0]), p = pai(arr), nm = arr[arr.length - 1]; if (!p || !p.f[nm] || p.f[nm].t !== "d") return { e: "rmdir: falhou em remover '" + ar[0] + "'" }; if (Object.keys(p.f[nm].f).length) return { e: "rmdir: falhou em remover '" + ar[0] + "': Diretório não vazio" }; delete p.f[nm]; return null; },
      chmod: function (ar) {
        var modo = ar[0], arr = resolve(ar[1]), n = no(arr); if (!modo || !ar[1]) return { e: "chmod: falta operando (ex.: chmod 754 script.sh)" }; if (!n) return { e: "chmod: não foi possível acessar '" + ar[1] + "': Arquivo ou diretório inexistente" };
        if (/^[0-7]{3}$/.test(modo)) n.m = parseInt(modo, 8);
        else { var m = /^([ugoa]*)([+\-=])([rwx]+)$/.exec(modo); if (!m) return { e: "chmod: modo inválido: '" + modo + "'" }; var quem = m[1] || "a", bits = 0; m[3].split("").forEach(function (c) { var b = { r: 4, w: 2, x: 1 }[c]; if (/[ua]/.test(quem)) bits |= b << 6; if (/[ga]/.test(quem)) bits |= b << 3; if (/[oa]/.test(quem)) bits |= b; }); n.m = m[2] === "+" ? n.m | bits : m[2] === "-" ? n.m & ~bits : bits; }
        api.ev("term:chmod"); api.ev("term:chmod:" + arr[arr.length - 1] + ":" + oct(n.m)); return "modo de '" + ar[1] + "' agora é " + oct(n.m) + " (" + perm(n) + ")";
      },
      ps: function () { api.ev("term:ps"); return "  PID TTY      STAT   TIME CMD\n    1 ?        Ss     0:02 /sbin/init\n  412 ?        S      0:00 [kworker/u4:2]\n  980 ?        Sl     0:15 /usr/bin/pipewire\n 1207 pts/0    Ss     0:00 bash\n 1388 pts/0    R+     0:00 ps\n\nSTAT: R = executando ou pronto · S = dormindo (bloqueado esperando um evento)\n      D = esperando E/S de disco · T = parado · Z = zumbi (terminou, aguarda o pai)\n      l = multithread · + = em primeiro plano · s = líder de sessão"; },
      free: function () { api.ev("term:free"); return "               total        usada        livre    compart.  buff/cache   disponível\nMem.:          7,7Gi        3,1Gi        1,2Gi       310Mi       3,4Gi        4,3Gi\nSwap:          2,0Gi        128Mi        1,9Gi\n\nSwap = área do disco usada como extensão da RAM (memória virtual)."; },
      man: function (ar) { var M = { ls: "ls — lista o conteúdo de um diretório. -l mostra permissões, dono, tamanho e data; -a inclui ocultos.", cd: "cd — muda o diretório atual.", chmod: "chmod — muda permissões. Octal: r=4, w=2, x=1 somados para dono, grupo e outros (ex.: 754 = rwxr-xr--).", ps: "ps — mostra processos e seus estados (STAT).", mkdir: "mkdir — cria diretórios.", free: "free — mostra uso de memória RAM e swap." }; return M[ar[0]] || "Sem página de manual para '" + (ar[0] || "") + "'. Tente: man ls, man chmod, man ps."; },
      echo: function (ar, bruto) { var m = /^echo\s+(.*?)\s*(>>?)\s*(\S+)$/.exec(bruto); if (!m) return ar.join(" ").replace(/^["']|["']$/g, ""); var arr = resolve(m[3]), p = pai(arr), nm = arr[arr.length - 1]; if (!p || p.t !== "d") return { e: "bash: " + m[3] + ": Arquivo ou diretório inexistente" }; var txt = m[1].replace(/^["']|["']$/g, "") + "\n"; if (!p.f[nm]) p.f[nm] = a(""); p.f[nm].c = m[2] === ">>" ? p.f[nm].c + txt : txt; api.ev("term:echo"); return null; }
    };
    function executa(cmd) {
      var bruto = cmd.trim(); if (!bruto) return; hist.push(bruto); hi = hist.length;
      linha('<span class="pr">' + esc($("[data-pr]", host).textContent) + "</span> " + esc(bruto));
      var partes = bruto.split(/\s+/), nome = partes[0], ar = partes.slice(1), r;
      if (nome.indexOf("./") === 0 || nome[0] === "/") { var arr = resolve(nome), n = no(arr); if (!n) r = { e: "bash: " + nome + ": Arquivo ou diretório inexistente" }; else if (n.t === "d") r = { e: "bash: " + nome + ": É um diretório" }; else if (!((n.m >> 6) & 1)) { r = { e: "bash: " + nome + ": Permissão negada (falta o x de execução para o dono — use chmod)" }; api.ev("term:negado"); } else { var mm = /echo "([^"]*)"/.exec(n.c); r = mm ? mm[1] : "(executado)"; api.ev("term:executou"); } }
      else if (CMD[nome]) r = CMD[nome](ar, bruto);
      else r = { e: nome + ": comando não encontrado. Digite help." };
      if (r == null) { } else if (typeof r === "string") linha(esc(r)); else if (r.e) linha(esc(r.e), "er"); else if (r.h != null) linha(r.h);
      prompt();
    }
    $("[data-f]", host).onsubmit = function (e) { e.preventDefault(); executa(IN.value); IN.value = ""; };
    IN.onkeydown = function (e) { if (e.key === "ArrowUp" && hi > 0) { hi--; IN.value = hist[hi]; e.preventDefault(); } if (e.key === "ArrowDown") { hi = Math.min(hist.length, hi + 1); IN.value = hist[hi] || ""; e.preventDefault(); } };
    $("[data-tm]", host).onclick = function (e) { if (e.target === this || e.target === OUT) IN.focus(); };
    linha("Terminal do laboratório (simulado). Nada aqui afeta o seu computador.\nDigite <b>help</b> para começar.".replace(/<b>|<\/b>/g, ""));
    prompt();
  });

  /* ===================== Organização de Computadores ===================== */
  /* Bases numéricas: liga e desliga bits e vê o número em decimal, binário, octal e hexadecimal. */
  FSI.sim("bases", function (host, cfg, api) {
    var NB = cfg.bits || 8, MAX = Math.pow(2, NB) - 1, v = 0, ia = 0, A = cfg.alvos || [], tocou = false;
    function fmt(x, b) { var t = x.toString(b).toUpperCase(); return b === 2 ? ("00000000" + t).slice(-NB).replace(/(\d{4})(?=\d)/g, "$1 ") : t; }
    function alvoTxt(a) { return a.como === "hex" ? "0x" + a.v.toString(16).toUpperCase() + " (hexadecimal)" : a.como === "oct" ? a.v.toString(8) + " (octal)" : a.como === "bin" ? fmt(a.v, 2) + " (binário)" : a.v + " (decimal)"; }
    host.innerHTML = '<p class="instr">Cada botão é um bit. Toque para ligar (1) ou desligar (0). O valor de cada posição é uma potência de 2.</p><div class="bits" data-bits></div>' +
      '<div class="bases-out" aria-live="polite"><div><small>Decimal</small><b data-d></b></div><div><small>Binário</small><b data-b></b></div><div><small>Octal</small><b data-o></b></div><div><small>Hexadecimal</small><b data-h></b></div></div>' +
      '<div class="sim-bar"><label>Ou digite um decimal (0 a ' + MAX + ') <input type="number" min="0" max="' + MAX + '" data-in style="width:110px"></label><button class="btn sec" type="button" data-zero>Zerar</button></div>' +
      (A.length ? '<div class="sim-out" data-alvo></div>' : "");
    var B = $("[data-bits]", host);
    for (var i = NB - 1; i >= 0; i--) (function (i) {
      var p = Math.pow(2, i), b = el("button", { type: "button", class: "bit", "aria-pressed": "false", "aria-label": "Bit de valor " + p }, '<span>0</span><small>' + p + "</small>");
      b.onclick = function () { v ^= p; if (!tocou) { tocou = true; api.ev(cfg.id + ":bit"); } desenha(); };
      B.appendChild(b);
    })(i);
    function desenha() {
      $$(".bit", host).forEach(function (b, k) { var on = (v >> (NB - 1 - k)) & 1; b.setAttribute("aria-pressed", on ? "true" : "false"); b.classList.toggle("on", !!on); $("span", b).textContent = on; });
      $("[data-d]", host).textContent = v; $("[data-b]", host).textContent = fmt(v, 2); $("[data-o]", host).textContent = fmt(v, 8); $("[data-h]", host).textContent = fmt(v, 16);
      var box = $("[data-alvo]", host); if (!box) return;
      if (ia < A.length && v === A[ia].v) { ia++; api.ev(cfg.id + ":alvo:" + ia); if (ia === A.length) api.ev(cfg.id + ":todos"); box.className = "sim-out ok"; box.innerHTML = "<b>Acertou!</b> " + (A[ia - 1].expl || "") + (ia < A.length ? "<br>Próximo desafio: monte <b>" + alvoTxt(A[ia]) + "</b>." : "<br><b>Todos os desafios concluídos.</b>"); return; }
      if (ia < A.length && box.className.indexOf("ok") < 0) { box.className = "sim-out"; box.innerHTML = "Desafio " + (ia + 1) + " de " + A.length + ": monte <b>" + alvoTxt(A[ia]) + "</b> ligando os bits." + (A[ia].dica ? " <i>Dica: " + A[ia].dica + "</i>" : ""); }
      else if (ia < A.length) box.className = "sim-out";
    }
    var IN = $("[data-in]", host);
    IN.onchange = function () { var x = Math.round(num(IN.value, 0)); v = Math.max(0, Math.min(MAX, x)); api.ev(cfg.id + ":digitou"); desenha(); };
    $("[data-zero]", host).onclick = function () { v = 0; desenha(); };
    desenha();
  });

  /* CPU de Von Neumann simplificada: busca, decodificação e execução, fase por fase. */
  FSI.sim("cpu", function (host, cfg, api) {
    var P = cfg.programas, pi = 0, M, PC, IR, ACC, fase, fim, saida, ciclos, editou = false, dest = -1;
    var INFO = { LOAD: "ACC ← memória[x]", ADD: "ACC ← ACC + memória[x]", SUB: "ACC ← ACC − memória[x]", STORE: "memória[x] ← ACC", JMP: "PC ← x (desvio)", JZ: "se ACC = 0, PC ← x", OUT: "mostra o ACC na saída", HALT: "para a execução" };
    host.innerHTML = '<div class="sim-bar"><label>Programa <select data-p>' + P.map(function (p, i) { return '<option value="' + i + '">' + esc(p.nome) + "</option>"; }).join("") + '</select></label></div><p class="instr" data-desc></p>' +
      '<div class="cpu"><div class="cpu-regs"><h4>CPU</h4><div><small>PC · contador de programa</small><b data-pc></b></div><div><small>IR · registrador de instrução</small><b data-ir></b></div><div><small>ACC · acumulador (ULA)</small><b data-acc></b></div><div><small>Próxima fase</small><b data-f></b></div><div><small>Saída</small><b data-out></b></div></div>' +
      '<div class="tbl-wrap"><table class="tbl cpu-mem"><thead><tr><th class="num">End.</th><th>Conteúdo da memória</th></tr></thead><tbody data-m></tbody></table></div></div>' +
      '<div class="row"><button class="btn" type="button" data-fase>Próxima fase</button><button class="btn sec" type="button" data-inst>Instrução inteira</button><button class="btn sec" type="button" data-tudo>Executar até o fim</button><button class="btn sec" type="button" data-rei>Reiniciar</button></div><div class="sim-out" aria-live="polite" data-log></div>';
    function carrega() { var p = P[pi]; M = p.mem.slice(); PC = 0; IR = "—"; ACC = 0; fase = 0; fim = false; saida = []; ciclos = 0; dest = -1; $("[data-desc]", host).innerHTML = p.desc; log("Programa carregado na memória. Clique em <b>Próxima fase</b> para ver o ciclo de instrução."); desenha(); }
    function log(h, cl) { var o = $("[data-log]", host); o.className = "sim-out " + (cl || ""); o.innerHTML = h; }
    function dec(ins) { var m = /^([A-Z]+)\s*(\d+)?$/.exec(String(ins).trim()); return m ? { op: m[1], x: m[2] != null ? +m[2] : null } : null; }
    function desenha() {
      $("[data-pc]", host).textContent = PC; $("[data-ir]", host).textContent = IR; $("[data-acc]", host).textContent = ACC;
      $("[data-f]", host).textContent = fim ? "fim" : ["1 · busca", "2 · decodificação", "3 · execução"][fase]; $("[data-out]", host).textContent = saida.length ? saida.join(", ") : "—";
      $("[data-m]", host).innerHTML = M.map(function (c, k) {
        var ehDado = typeof c === "number";
        return '<tr class="' + (k === PC && !fim ? "pc" : "") + (k === dest ? " dst" : "") + '"><td class="num">' + k + "</td><td>" + (ehDado ? '<input type="number" data-c="' + k + '" value="' + c + '" aria-label="Dado no endereço ' + k + '" style="width:90px">' : esc(c) + (dec(c) && INFO[dec(c).op] ? ' <small style="color:var(--muted)">· ' + esc(INFO[dec(c).op]).replace("x", dec(c).x != null ? dec(c).x : "") + "</small>" : "")) + "</td></tr>";
      }).join("");
      $$("[data-c]", host).forEach(function (inp) { inp.onchange = function () { M[+inp.getAttribute("data-c")] = Math.round(num(inp.value, 0)); if (!editou) { editou = true; api.ev(cfg.id + ":editou"); } }; });
      ["fase", "inst", "tudo"].forEach(function (k) { $("[data-" + k + "]", host).disabled = fim; });
    }
    function umaFase() {
      if (fim) return;
      dest = -1;
      if (fase === 0) { IR = M[PC]; log("<b>Busca:</b> a UC coloca o endereço <b>" + PC + "</b> no barramento de endereços; a memória devolve <b>" + esc(IR) + "</b> pelo barramento de dados e ela vai para o IR. O PC avança para " + (PC + 1) + "."); PC++; fase = 1; api.ev(cfg.id + ":busca"); }
      else if (fase === 1) { var d = dec(IR); if (!d || !INFO[d.op]) { fim = true; log("<b>Erro:</b> “" + esc(IR) + "” não é uma instrução válida. Um dado foi lido como instrução — faltou um HALT?", "bad"); desenha(); return; } log("<b>Decodificação:</b> a unidade de controle interpreta <b>" + esc(IR) + "</b>: " + esc(INFO[d.op]).replace("x", d.x != null ? d.x : "") + "."); fase = 2; }
      else {
        var d2 = dec(IR), x = d2.x, msg = "";
        if (d2.op === "LOAD") { ACC = +M[x] || 0; dest = x; msg = "ACC recebe " + ACC + " (lido do endereço " + x + ")."; }
        else if (d2.op === "ADD") { ACC += +M[x] || 0; dest = x; msg = "A ULA soma: ACC agora vale " + ACC + "."; }
        else if (d2.op === "SUB") { ACC -= +M[x] || 0; dest = x; msg = "A ULA subtrai: ACC agora vale " + ACC + "."; }
        else if (d2.op === "STORE") { M[x] = ACC; dest = x; msg = "O valor " + ACC + " é gravado no endereço " + x + "."; }
        else if (d2.op === "JMP") { PC = x; msg = "O PC passa a " + x + ": a próxima busca será lá."; }
        else if (d2.op === "JZ") { if (ACC === 0) { PC = x; msg = "ACC = 0, então o PC vai para " + x + "."; } else msg = "ACC ≠ 0: segue em frente, sem desviar."; }
        else if (d2.op === "OUT") { saida.push(ACC); msg = "Saída: " + ACC + "."; api.ev(cfg.id + ":out"); }
        else if (d2.op === "HALT") { fim = true; msg = "Fim do programa."; }
        ciclos++; fase = 0; log("<b>Execução:</b> " + msg + (fim ? " " + (P[pi].fim || "") : ""), fim ? "ok" : "");
        if (ciclos === 1) api.ev(cfg.id + ":ciclo");
        if (fim) { api.ev(cfg.id + ":fim:" + P[pi].id); if (editou) api.ev(cfg.id + ":editou-fim"); }
        if (ciclos > 300 && !fim) { fim = true; log("Parei depois de 300 instruções: parece um laço infinito.", "bad"); }
      }
      desenha();
    }
    $("[data-fase]", host).onclick = umaFase;
    $("[data-inst]", host).onclick = function () { do umaFase(); while (fase !== 0 && !fim); };
    $("[data-tudo]", host).onclick = function () { var g = 0; while (!fim && g++ < 1000) umaFase(); };
    $("[data-rei]", host).onclick = carrega;
    $("[data-p]", host).onchange = function () { pi = +this.value; editou = false; carrega(); };
    carrega();
  });

  /* ===================== Banco de Dados ===================== */
  /* Console SQL real (SQLite no navegador, via sql.js): o aluno escreve comandos, vê o resultado e cumpre desafios.
     cfg: { id, setup: "CREATE…; INSERT…", inicial: "SELECT …", desafios: [{ p, ref, verif?, dica, expl }] }
     - desafio de consulta: o resultado da última consulta do aluno é comparado ao de "ref" (num banco novo).
     - desafio de alteração (verif): executa "ref" num banco novo e compara "verif" nos dois bancos. */
  var SQLP = null;
  function carregaSQL() {
    if (SQLP) return SQLP;
    var base = "../motor-interativo/sql/";
    SQLP = new Promise(function (ok, erro) {
      if (window.initSqlJs) return ok();
      var sc = document.createElement("script"); sc.src = base + "sql-wasm.js"; sc.onload = ok; sc.onerror = erro; document.head.appendChild(sc);
    }).then(function () { return window.initSqlJs({ locateFile: function (f) { return base + f; } }); });
    SQLP.catch(function () { SQLP = null; });
    return SQLP;
  }
  FSI.sim("sql", function (host, cfg, api) {
    var SQL = null, db = null, D = cfg.desafios || [], k = 0, erros = 0, ultimo = null, ultSQL = "";
    host.innerHTML = '<div class="sql"><div class="sql-esq"><div class="sql-schema" data-sch aria-live="polite"><small>Carregando o banco…</small></div></div>' +
      '<div class="sql-dir">' + (D.length ? '<div class="sim-out" data-des></div>' : "") +
      '<label class="sr" for="sql-' + cfg.id + '">Comando SQL</label><textarea id="sql-' + cfg.id + '" class="sql-ed" spellcheck="false" autocapitalize="off" autocomplete="off" rows="5" data-ed>' + esc(cfg.inicial || "SELECT * FROM " + (cfg.tabela || "") + ";") + "</textarea>" +
      '<div class="row"><button class="btn" type="button" data-run>Executar (Ctrl+Enter)</button><button class="btn sec" type="button" data-rst>Restaurar o banco</button>' + (D.length ? '<button class="btn sec" type="button" data-sol hidden>Ver uma solução</button>' : "") + "</div>" +
      '<div class="sql-res" data-res aria-live="polite"></div></div></div>';
    var ED = $("[data-ed]", host);
    function novo() { var b = new SQL.Database(); b.run(cfg.setup || ""); return b; }
    function tabela(r) {
      if (!r) return "";
      var linhas = r.values.slice(0, 60);
      return '<div class="tbl-wrap"><table class="tbl"><thead><tr>' + r.columns.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        linhas.map(function (l) { return "<tr>" + l.map(function (v) { return v === null ? '<td class="nulo">NULL</td>' : "<td>" + esc(v) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>" +
        '<small class="sql-n">' + r.values.length + " linha" + (r.values.length === 1 ? "" : "s") + (r.values.length > 60 ? " (mostrando 60)" : "") + "</small>";
    }
    function schema() {
      var t = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name");
      var nomes = t.length ? t[0].values.map(function (v) { return v[0]; }) : [];
      $("[data-sch]", host).innerHTML = "<b>Tabelas do banco</b>" + (nomes.length ? nomes.map(function (n) {
        var c = db.exec('PRAGMA table_info("' + n.replace(/"/g, "") + '")'), cn = db.exec('SELECT COUNT(*) FROM "' + n.replace(/"/g, "") + '"');
        return '<details><summary>' + esc(n) + ' <small>' + (cn.length ? cn[0].values[0][0] : 0) + " linhas</small></summary><ul>" + (c.length ? c[0].values.map(function (x) { return "<li>" + esc(x[1]) + " <small>" + esc(x[2] || "") + (x[5] ? " · PK" : "") + "</small></li>"; }).join("") : "") + "</ul></details>";
      }).join("") : "<p><small>Nenhuma tabela.</small></p>");
    }
    function chave(r, ordem) { if (!r || !r.values.length) return "∅"; var ls = r.values.map(function (l) { return JSON.stringify(l.map(function (v) { return typeof v === "number" ? Math.round(v * 1000) / 1000 : v; })); }); if (!ordem) ls.sort(); return r.columns.length + "|" + ls.join("\n"); }
    function desafio() {
      var box = $("[data-des]", host); if (!box) return;
      if (k >= D.length) { box.className = "sim-out ok"; box.innerHTML = "<b>Todos os desafios concluídos!</b> Continue praticando: o banco é seu."; return; }
      box.className = "sim-out"; box.innerHTML = "<b>Desafio " + (k + 1) + " de " + D.length + ":</b> " + D[k].p + (D[k].dica && erros >= 1 ? " <i>Dica: " + D[k].dica + "</i>" : "");
      var sb = $("[data-sol]", host); if (sb) sb.hidden = erros < 2;
    }
    function confere() {
      if (k >= D.length) return;
      var d = D[k], ok = false;
      try {
        var b = novo();
        if (d.exige && ultSQL.toUpperCase().indexOf(d.exige) < 0) ok = false;
        else if (d.verif) { b.run(d.ref); var a = b.exec(d.verif)[0], u = db.exec(d.verif)[0]; ok = chave(a, true) === chave(u, true); }
        else if (ultimo) { b.close(); b = new SQL.Database(db.export()); var r = b.exec(d.ref)[0], ord = /order\s+by/i.test(d.ref); ok = chave(r, ord) === chave(ultimo, ord); }
        b.close();
      } catch (e) { ok = false; }
      if (ok) { k++; erros = 0; api.ev(cfg.id + ":desafio:" + k); if (k === D.length) api.ev(cfg.id + ":todos"); var box = $("[data-des]", host); desafio(); if (box && d.expl) box.innerHTML = "<b>Correto!</b> " + d.expl + (k < D.length ? "<br>Próximo — <b>Desafio " + (k + 1) + ":</b> " + D[k].p : "<br><b>Todos os desafios concluídos!</b>"); if (box) box.className = "sim-out ok"; }
      else { erros++; desafio(); }
    }
    function executa() {
      var sql = ED.value.trim(); if (!sql || !db) return; ultSQL = sql;
      var out = $("[data-res]", host), res;
      try { res = db.exec(sql); }
      catch (e) { if (/\bBEGIN\b/i.test(sql)) { try { db.exec("ROLLBACK"); } catch (e2) {} } out.innerHTML = '<div class="sim-out bad"><b>O SGBD recusou o comando' + (/\bBEGIN\b/i.test(sql) ? ' (a transação foi desfeita)' : '') + ':</b> ' + esc(String(e.message || e).replace(/^Error:\s*/, "")) + "</div>"; api.ev(cfg.id + ":erro"); erros++; desafio(); return; }
      var U2 = sql.toUpperCase();
      api.ev(cfg.id + ":rodou");
      [["SELECT", "select"], ["WHERE", "where"], ["ORDER BY", "order"], ["JOIN", "join"], ["GROUP BY", "group"], ["HAVING", "having"], ["INSERT", "insert"], ["UPDATE", "update"], ["DELETE", "delete"], ["CREATE TABLE", "create"], ["ALTER TABLE", "alter"], ["CREATE VIEW", "view"]].forEach(function (x) { if (U2.indexOf(x[0]) >= 0) api.ev(cfg.id + ":" + x[1]); });
      if (/\b(COUNT|SUM|AVG|MAX|MIN)\s*\(/.test(U2)) api.ev(cfg.id + ":agregou");
      var r = res.length ? res[res.length - 1] : null;
      if (r) ultimo = r; else if (/^\s*(SELECT|WITH)\b/i.test(sql.split(";").filter(function (x) { return x.trim(); }).pop() || "")) ultimo = { columns: [], values: [] };
      out.innerHTML = r ? tabela(r) : ultimo && !ultimo.values.length && ultimo.columns.length === 0 && /^\s*(SELECT|WITH)\b/i.test(sql) ? '<div class="sim-out">A consulta não retornou nenhuma linha.</div>' : '<div class="sim-out ok">Comando executado. ' + db.getRowsModified() + " linha(s) afetada(s).</div>";
      schema(); confere();
    }
    $("[data-run]", host).onclick = executa;
    ED.addEventListener("keydown", function (e) { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); executa(); } });
    $("[data-rst]", host).onclick = function () { if (!SQL) return; if (db) db.close(); db = novo(); ultimo = null; schema(); $("[data-res]", host).innerHTML = '<div class="sim-out">Banco restaurado ao estado inicial.</div>'; };
    var sb = $("[data-sol]", host); if (sb) sb.onclick = function () { if (k < D.length) { ED.value = D[k].ref; ED.focus(); } };
    carregaSQL().then(function (S) { SQL = S; db = novo(); schema(); desafio(); }).catch(function () { $("[data-sch]", host).innerHTML = "<b>Não foi possível carregar o SQLite.</b> <small>Abra esta página com internet uma vez e tente de novo.</small>"; });
  });

  /* ===================== Segurança da Informação ===================== */
  /* Cifra de César: desloca as letras; o aluno cifra, decifra e quebra mensagens.
     cfg: { id, desafios: [{ c: "texto cifrado", k: chave, dica }] } */
  function cesar(t, k) { var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; return String(t).toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[A-Z]/g, function (c) { return A[(A.indexOf(c) + k % 26 + 26) % 26]; }); }
  FSI.sim("cifra", function (host, cfg, api) {
    var D = cfg.desafios || [], k = 0;
    host.innerHTML = '<div class="sim-bar"><label>Texto <input type="text" data-t value="' + esc(cfg.texto || "ATAQUE AO AMANHECER") + '" style="min-width:220px;flex:1"></label><label>Chave (deslocamento) <input type="range" min="0" max="25" value="3" data-k> <b data-kv>3</b></label></div>' +
      '<div class="bases-out"><div><small>Texto claro</small><b data-a></b></div><div><small>Texto cifrado</small><b data-c></b></div></div>' +
      (D.length ? '<div class="sim-out" data-des></div><div class="sim-bar"><label>Sua resposta <input type="text" data-r style="min-width:220px;flex:1" autocomplete="off"></label><button class="btn" type="button" data-ok>Conferir</button></div>' : "");
    var T = $("[data-t]", host), K = $("[data-k]", host), cifrou = false, mexeu = false;
    function desenha() { var kk = +K.value; $("[data-kv]", host).textContent = kk; $("[data-a]", host).textContent = cesar(T.value, 0); $("[data-c]", host).textContent = cesar(T.value, kk); }
    function des() { var b = $("[data-des]", host); if (!b) return; if (k >= D.length) { b.className = "sim-out ok"; b.innerHTML = "<b>Todas as mensagens decifradas!</b> Com só 25 chaves possíveis, a cifra de César cai por força bruta — por isso a criptografia moderna usa chaves enormes."; return; } b.className = "sim-out"; b.innerHTML = "<b>Mensagem interceptada " + (k + 1) + " de " + D.length + ":</b> <code>" + esc(D[k].c) + "</code>" + (D[k].dica ? " <i>Dica: " + D[k].dica + "</i>" : "") + "<br>Como quebrar: cole a mensagem no campo <b>Texto</b> e arraste a chave até o resultado virar português. Decifrar uma chave k é cifrar de novo com 26 − k."; }
    T.oninput = function () { if (!cifrou) { cifrou = true; api.ev(cfg.id + ":cifrou"); } desenha(); };
    K.oninput = function () { if (!mexeu) { mexeu = true; api.ev(cfg.id + ":chave"); } desenha(); };
    var OK = $("[data-ok]", host);
    if (OK) OK.onclick = function () { if (k >= D.length) return; var r = norm($("[data-r]", host).value).toUpperCase().replace(/[^A-Z ]/g, ""), cert = cesar(D[k].c, -D[k].k).replace(/[^A-Z ]/g, "");
      var b = $("[data-des]", host);
      if (r.replace(/\s+/g, " ").trim() === cert.replace(/\s+/g, " ").trim()) { k++; api.ev(cfg.id + ":decifrou:" + k); if (k === D.length) api.ev(cfg.id + ":todos"); $("[data-r]", host).value = ""; des(); if (k < D.length) { b.className = "sim-out ok"; b.innerHTML = "<b>Decifrada!</b> A chave era " + D[k - 1].k + ". Próxima: <code>" + esc(D[k].c) + "</code>"; } }
      else { b.className = "sim-out bad"; b.innerHTML = "Ainda não. Mensagem: <code>" + esc(D[k].c) + "</code> — teste outras chaves. " + (D[k].dica ? "<i>Dica: " + D[k].dica + "</i>" : ""); } };
    desenha(); des();
  });

  /* Hash: resumo SHA-256 de um texto; mudar uma letra muda tudo (efeito avalanche). */
  function sha256(t) { if (!(window.crypto && crypto.subtle)) return Promise.resolve("(o navegador não oferece SHA-256 aqui)"); return crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)).then(function (b) { return Array.prototype.map.call(new Uint8Array(b), function (x) { return ("0" + x.toString(16)).slice(-2); }).join(""); }); }
  FSI.sim("hash", function (host, cfg, api) {
    host.innerHTML = '<div class="hashes"><label>Arquivo original <textarea data-a rows="3">' + esc(cfg.a || "Boletim: Ana Souza — Segurança da Informação — nota 7,5") + '</textarea></label><code data-ha></code>' +
      '<label>Arquivo recebido <textarea data-b rows="3">' + esc(cfg.b || cfg.a || "Boletim: Ana Souza — Segurança da Informação — nota 7,5") + '</textarea></label><code data-hb></code></div><div class="sim-out" data-o aria-live="polite"></div>';
    var A = $("[data-a]", host), B = $("[data-b]", host), mudou = false;
    function dif(x, y) { var n = 0; for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) n++; return n; }
    function calc() {
      Promise.all([sha256(A.value), sha256(B.value)]).then(function (h) {
        $("[data-ha]", host).textContent = "SHA-256: " + h[0]; $("[data-hb]", host).textContent = "SHA-256: " + h[1];
        var o = $("[data-o]", host), ig = h[0] === h[1];
        o.className = "sim-out " + (ig ? "ok" : "bad");
        o.innerHTML = ig ? "<b>Os resumos são iguais:</b> o arquivo recebido é íntegro." : "<b>Os resumos são diferentes</b> em " + dif(h[0], h[1]) + " de 64 caracteres: o arquivo foi alterado. Repare que uma mudança mínima muda o resumo inteiro (efeito avalanche).";
        api.ev(cfg.id + ":calculou"); if (!ig && mudou) api.ev(cfg.id + ":detectou");
        if (!ig && A.value.length && B.value.length && Math.abs(A.value.length - B.value.length) <= 1 && dif(A.value, B.value) <= 2) api.ev(cfg.id + ":avalanche");
      });
    }
    A.oninput = B.oninput = function () { mudou = true; calc(); };
    calc();
  });

  /* Força de senhas: estimativa por tamanho e variedade de caracteres e tempo para quebrar por força bruta. */
  FSI.sim("senha", function (host, cfg, api) {
    host.innerHTML = '<div class="sim-bar"><label>Digite uma senha de teste (não use uma senha real!) <input type="text" data-s autocomplete="off" spellcheck="false" style="min-width:240px;flex:1"></label></div><div class="medidor" aria-hidden="true"><i data-bar></i></div><div class="sim-out" data-o aria-live="polite">Digite para ver a análise.</div>';
    var S = $("[data-s]", host), COM = ["123456", "senha", "password", "12345678", "qwerty", "abc123", "111111", "admin", "iloveyou", "brasil"];
    function tempo(s) { var u = [[31536000, "anos"], [86400, "dias"], [3600, "horas"], [60, "minutos"], [1, "segundos"]]; if (s > 31536000 * 1e6) return "mais de um milhão de anos"; for (var i = 0; i < u.length; i++) if (s >= u[i][0]) return Math.round(s / u[i][0]).toLocaleString("pt-BR") + " " + u[i][1]; return "menos de 1 segundo"; }
    S.oninput = function () {
      var v = S.value, a = 0; if (/[a-z]/.test(v)) a += 26; if (/[A-Z]/.test(v)) a += 26; if (/[0-9]/.test(v)) a += 10; if (/[^a-zA-Z0-9]/.test(v)) a += 33;
      var bits = v.length * Math.log2(Math.max(a, 1)), comum = COM.indexOf(v.toLowerCase()) >= 0, seg = Math.pow(2, bits) / 1e10 / 2;
      var nivel = comum || bits < 28 ? 0 : bits < 45 ? 1 : bits < 65 ? 2 : 3, rot = ["Muito fraca", "Fraca", "Boa", "Forte"][nivel];
      $("[data-bar]", host).style.width = Math.min(100, bits * 1.25) + "%"; $("[data-bar]", host).className = "n" + nivel;
      var o = $("[data-o]", host); o.className = "sim-out " + (nivel >= 3 ? "ok" : nivel === 0 ? "bad" : "");
      o.innerHTML = "<b>" + rot + "</b> · " + v.length + " caracteres, alfabeto de " + a + " símbolos ≈ " + Math.round(bits) + " bits. " + (comum ? "Está na lista das senhas mais usadas: cai na primeira tentativa." : "Força bruta a 10 bilhões de tentativas por segundo: cerca de <b>" + tempo(seg) + "</b>.") + (nivel < 3 ? " Dica: aumente o tamanho — uma frase com 4 palavras e um número vale mais que um símbolo no fim." : "");
      api.ev(cfg.id + ":testou"); if (nivel === 0) api.ev(cfg.id + ":fraca"); if (nivel === 3) api.ev(cfg.id + ":forte");
    };
  });

  /* ===================== Redes ===================== */
  /* Calculadora IPv4 com desafios: rede, broadcast, primeiro/último host e quantidade de hosts. */
  function ip2n(ip) { var p = String(ip).trim().split("."); if (p.length !== 4) return null; var n = 0; for (var i = 0; i < 4; i++) { var x = +p[i]; if (!/^\d{1,3}$/.test(p[i]) || x > 255) return null; n = n * 256 + x; } return n; }
  function n2ip(n) { return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join("."); }
  function calcIP(ip, pre) { var n = ip2n(ip); if (n === null || !(pre >= 0 && pre <= 32)) return null; var m = pre === 0 ? 0 : (0xFFFFFFFF << (32 - pre)) >>> 0, r = (n & m) >>> 0, b = (r | (~m >>> 0)) >>> 0; return { rede: n2ip(r), bc: n2ip(b), mask: n2ip(m), pri: pre >= 31 ? n2ip(r) : n2ip(r + 1), ult: pre >= 31 ? n2ip(b) : n2ip(b - 1), hosts: pre >= 31 ? (pre === 31 ? 2 : 1) : Math.pow(2, 32 - pre) - 2, bin: ("00000000000000000000000000000000" + n.toString(2)).slice(-32).replace(/(.{8})(?=.)/g, "$1.") }; }
  FSI.sim("ipv4", function (host, cfg, api) {
    var D = cfg.desafios || [], k = 0, CAMPOS = { rede: "Endereço de rede", bc: "Broadcast", mask: "Máscara", pri: "Primeiro host", ult: "Último host", hosts: "Hosts utilizáveis" };
    host.innerHTML = '<div class="sim-bar"><label>Endereço IP <input type="text" data-ip value="' + esc(cfg.ip || "192.168.10.77") + '" style="width:160px" inputmode="decimal"></label><label>Prefixo / <input type="number" data-pre min="0" max="32" value="' + (cfg.pre || 24) + '" style="width:70px"></label><button class="btn" type="button" data-calc>Calcular</button></div>' +
      '<div class="sim-out" data-res aria-live="polite"></div>' + (D.length ? '<div class="sim-out" data-des></div><div class="sim-bar"><label>Sua resposta <input type="text" data-r style="width:200px" autocomplete="off"></label><button class="btn" type="button" data-ok>Conferir</button></div>' : "");
    function mostra() { var r = calcIP($("[data-ip]", host).value, +$("[data-pre]", host).value), o = $("[data-res]", host); if (!r) { o.className = "sim-out bad"; o.textContent = "Endereço ou prefixo inválido."; return; } o.className = "sim-out"; o.innerHTML = '<div class="tbl-wrap"><table class="tbl"><tbody>' + Object.keys(CAMPOS).map(function (c) { return "<tr><th>" + CAMPOS[c] + "</th><td><code>" + r[c] + "</code></td></tr>"; }).join("") + "<tr><th>IP em binário</th><td><code>" + r.bin + "</code></td></tr></tbody></table></div>"; api.ev(cfg.id + ":calculou"); if (+$("[data-pre]", host).value !== 24) api.ev(cfg.id + ":prefixo"); }
    function des(msg, cl) { var b = $("[data-des]", host); if (!b) return; if (k >= D.length) { b.className = "sim-out ok"; b.innerHTML = (msg || "") + "<b>Todos os desafios resolvidos!</b>"; return; } var d = D[k]; b.className = "sim-out " + (cl || ""); b.innerHTML = (msg || "") + "<b>Desafio " + (k + 1) + " de " + D.length + ":</b> qual é o <b>" + CAMPOS[d.campo].toLowerCase() + "</b> de <code>" + d.ip + "/" + d.pre + "</code>? Resolva no caderno antes de usar a calculadora." + (d.dica ? " <i>Dica: " + d.dica + "</i>" : ""); }
    $("[data-calc]", host).onclick = mostra;
    var OK = $("[data-ok]", host);
    if (OK) OK.onclick = function () { if (k >= D.length) return; var d = D[k], r = calcIP(d.ip, d.pre), v = $("[data-r]", host).value.trim(), cert = String(r[d.campo]);
      if (v === cert || (d.campo === "hosts" && +v === r.hosts)) { k++; $("[data-r]", host).value = ""; api.ev(cfg.id + ":desafio:" + k); if (k === D.length) api.ev(cfg.id + ":todos"); des("Certo: <code>" + cert + "</code>. ", "ok"); }
      else des("Ainda não. ", "bad"); };
    mostra(); des();
  });

  /* Prompt de comando do Windows (simulado): ipconfig, ping, tracert, nslookup, arp, netstat.
     cfg: { id, cenario: { ip, mask, gw, dns, dhcp, mac, falha: "" | "dns" | "dhcp" | "gateway" } } */
  FSI.sim("cmd", function (host, cfg, api) {
    var C = cfg.cenario || {}, ip = C.falha === "dhcp" ? "169.254.33.12" : C.ip || "10.0.1.50", mask = C.mask || "255.255.255.0", gw = C.gw || "10.0.1.1", dns = C.dns || "10.0.1.2", mac = C.mac || "3C-52-82-1A-7F-09";
    host.innerHTML = '<div class="term" role="log" aria-live="polite" data-o></div><div class="term-in"><span>C:\\Users\\aluno&gt;</span><input type="text" data-cin spellcheck="false" autocomplete="off" aria-label="Comando do prompt"></div><p class="instr">Comandos: <code>ipconfig</code>, <code>ipconfig /all</code>, <code>ping &lt;destino&gt;</code>, <code>tracert &lt;destino&gt;</code>, <code>nslookup &lt;nome&gt;</code>, <code>arp -a</code>, <code>netstat -n</code>, <code>ipconfig /release</code>, <code>ipconfig /renew</code>, <code>cls</code>.</p>';
    var O = $("[data-o]", host), I = $("[data-cin]", host), renovou = false;
    function p(t) { O.insertAdjacentHTML("beforeend", "<div>" + esc(t).replace(/\n/g, "<br>") + "</div>"); O.scrollTop = O.scrollHeight; }
    function ping(dest) {
      var semRede = C.falha === "dhcp" && !renovou, semGw = C.falha === "gateway", nome = !/^\d+\.\d+\.\d+\.\d+$/.test(dest);
      if (nome && C.falha === "dns") return "A solicitação ping não pôde encontrar o host " + dest + ". Verifique o nome e tente novamente.";
      if (semRede || (semGw && dest !== ip)) return "Disparando " + dest + ":\nEsgotado o tempo limite do pedido.\nEsgotado o tempo limite do pedido.\nEstatísticas: Enviados = 2, Recebidos = 0, Perdidos = 2 (100% de perda)";
      var alvo = nome ? (dest === "google.com" ? "142.250.79.46" : "200.17.141.20") : dest, t = dest === gw || dest === ip || dest === "127.0.0.1" ? 1 : 18 + (dest.length % 9);
      return "Disparando " + dest + (nome ? " [" + alvo + "]" : "") + " com 32 bytes de dados:\nResposta de " + alvo + ": bytes=32 tempo=" + t + "ms TTL=" + (t < 2 ? 128 : 116) + "\nResposta de " + alvo + ": bytes=32 tempo=" + (t + 1) + "ms TTL=" + (t < 2 ? 128 : 116) + "\nEstatísticas: Enviados = 2, Recebidos = 2, Perdidos = 0 (0% de perda)";
    }
    function exec(c) {
      var a = c.trim(), l = a.toLowerCase(), m;
      p("C:\\Users\\aluno>" + a); if (!a) return;
      if (l === "cls") { O.innerHTML = ""; return; }
      if (l === "ipconfig" || l === "ipconfig /all") {
        var eip = C.falha === "dhcp" && !renovou ? "169.254.33.12" : (C.ip || "10.0.1.50");
        p("Adaptador Ethernet Ethernet:\n   Endereço IPv4. . . . . . . . : " + eip + "\n   Máscara de Sub-rede . . . . : " + (eip.indexOf("169.254") === 0 ? "255.255.0.0" : mask) + "\n   Gateway Padrão. . . . . . . : " + (eip.indexOf("169.254") === 0 ? "" : gw) + (l === "ipconfig /all" ? "\n   Endereço Físico . . . . . . : " + mac + "\n   DHCP Habilitado . . . . . . : Sim\n   Servidor DHCP . . . . . . . : " + (C.dhcp || gw) + "\n   Servidores DNS. . . . . . . : " + dns : ""));
        api.ev(cfg.id + ":ipconfig"); if (l === "ipconfig /all") api.ev(cfg.id + ":all"); if (eip.indexOf("169.254") === 0) api.ev(cfg.id + ":apipa"); return;
      }
      if (l === "ipconfig /release") { p("O adaptador Ethernet liberou o endereço."); api.ev(cfg.id + ":release"); return; }
      if (l === "ipconfig /renew") { renovou = true; p("Endereço IPv4 renovado: " + (C.ip || "10.0.1.50")); api.ev(cfg.id + ":renew"); return; }
      if ((m = /^ping\s+(\S+)/.exec(l))) { p(ping(m[1])); api.ev(cfg.id + ":ping"); if (m[1] === gw) api.ev(cfg.id + ":ping-gw"); if (!/^\d/.test(m[1])) api.ev(cfg.id + ":ping-nome"); if (m[1] === "8.8.8.8") api.ev(cfg.id + ":ping-externo"); return; }
      if ((m = /^tracert\s+(\S+)/.exec(l))) { if (C.falha === "gateway") p("Rastreando a rota para " + m[1] + "\n  1     *        *        *     Esgotado o tempo limite do pedido."); else p("Rastreando a rota para " + m[1] + " com no máximo 30 saltos:\n  1    1 ms  " + gw + "\n  2    4 ms  10.255.0.1   (roteador do campus)\n  3   12 ms  200.143.201.17 (provedor)\n  4   19 ms  72.14.215.85\n  5   20 ms  " + (m[1] === "google.com" ? "142.250.79.46" : m[1]) + "\nRastreamento concluído."); api.ev(cfg.id + ":tracert"); return; }
      if ((m = /^nslookup\s+(\S+)/.exec(l))) { if (C.falha === "dns") p("Servidor: desconhecido\nAddress: " + dns + "\n*** Tempo limite da solicitação esgotado."); else p("Servidor: dns.escola.local\nAddress: " + dns + "\n\nResposta não autoritativa:\nNome: " + m[1] + "\nAddress: " + (m[1] === "google.com" ? "142.250.79.46" : "200.17.141.20")); api.ev(cfg.id + ":nslookup"); return; }
      if (l === "arp -a") { p("Interface: " + ip + "\n  Endereço IP      Endereço físico      Tipo\n  " + gw + "        00-1A-2B-3C-4D-5E    dinâmico\n  " + dns + "        00-1A-2B-77-88-99    dinâmico\n  255.255.255.255  ff-ff-ff-ff-ff-ff    estático"); api.ev(cfg.id + ":arp"); return; }
      if (l === "netstat -n") { p("Conexões ativas\n  Proto  Endereço local        Endereço externo      Estado\n  TCP    " + ip + ":51234    142.250.79.46:443     ESTABELECIDA\n  TCP    " + ip + ":51240    200.17.141.20:80      ESPERANDO_FECHAMENTO\n  UDP    " + ip + ":5353     *:*"); api.ev(cfg.id + ":netstat"); return; }
      p("'" + a.split(" ")[0] + "' não é reconhecido como um comando interno ou externo."); api.ev(cfg.id + ":erro");
    }
    I.addEventListener("keydown", function (e) { if (e.key === "Enter") { exec(I.value); I.value = ""; } });
    p("Microsoft Windows [versão simulada para estudo]\nDigite um comando e pressione Enter.");
  });
})();
