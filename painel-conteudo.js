/* Painel do professor · aba "Liberar conteúdo".
 * O professor escolhe, para todas as turmas ou para uma turma, quais disciplinas e quais módulos das
 * disciplinas interativas aparecem para os alunos: visível, oculto ou liberado a partir de uma data.
 * As regras ficam na aba "Visibilidade" da planilha (Apps Script, ação "visibilidade") e são lidas pelo
 * progresso-turma.js (portal e apostilas), pelo motor das disciplinas interativas e pelo Start nos Estudos.
 * Formato: { "pasta": "o" | "v" | "aaaa-mm-dd", "pasta#n": ... }. Sem chave = segue o padrão. */
(function () {
  var PPC = window.PPC, URL_ = String(window.RANKING_URL || "").trim();
  var host = null, S = null;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function chave() { try { return sessionStorage.getItem("pt-prof-chave") || ""; } catch (e) { return ""; } }
  function br(d) { return d.slice(8, 10) + "/" + d.slice(5, 7) + "/" + d.slice(0, 4); }
  function hoje() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function copia(o) { return JSON.parse(JSON.stringify(o || {})); }
  var NOMES = {}; /* nomes das pastas: cursos-ppc.js + complementares */
  var COMPL = { "fundamentos-de-sistemas-de-informacao": "Fundamentos para Sistemas de Informação", "mapas-mentais": "Mapas Mentais de TI", "laboratorio-3d": "Laboratório 3D", "recursos-de-aula": "Recursos de aula" };
  var MODS = {}; /* pasta -> [nomes dos módulos] (carregados sob demanda) */

  function rotulo(v) { return !v ? "" : v === "o" ? "Oculta" : v === "v" ? "Visível" : "Abre em " + br(v); }
  function efetivo(k) { var d = S.rascunho[S.escopo] || {}; if (d[k]) return d[k]; if (S.escopo !== "*") return (S.rascunho["*"] || {})[k] || ""; return ""; }
  function situacao(v) { if (v === "o") return "o"; if (/^\d{4}-\d{2}-\d{2}$/.test(v || "") && v > hoje()) return "d"; return "v"; }

  function cursoDaTurma(t) { for (var i = 0; i < S.alunos.length; i++) if (S.alunos[i].turma === t) return S.alunos[i].curso || ""; return ""; }
  function cursos() {
    if (S.escopo === "*") return PPC.cursos;
    var c = cursoDaTurma(S.escopo), l = PPC.cursos.filter(function (x) { return c.indexOf(x.curto) === 0 || c === x.nome; });
    return l.length ? l : PPC.cursos;
  }

  /* ---------- controle de uma linha (disciplina ou módulo) ---------- */
  function controle(k, nome, sub) {
    var d = S.rascunho[S.escopo] || {}, v = d[k] || "", her = S.escopo !== "*" ? (S.rascunho["*"] || {})[k] || "" : "";
    var sel = v === "" ? "" : v === "o" ? "o" : v === "v" ? "v" : "d", id = "c-" + k.replace(/[^a-z0-9]/g, "-");
    var padrao = S.escopo === "*" ? "Visível (padrão)" : "Igual a todas as turmas" + (her ? " · " + rotulo(her) : " · Visível");
    var ef = situacao(efetivo(k));
    return '<div class="lc-row' + (sub ? " sub" : "") + '" data-k="' + esc(k) + '"><span class="lc-st ' + ef + '" aria-hidden="true"></span>' +
      '<label class="lc-nome" for="' + id + '">' + nome + "</label>" +
      '<select id="' + id + '" data-sel>' +
      '<option value=""' + (sel === "" ? " selected" : "") + ">" + esc(padrao) + "</option>" +
      (S.escopo !== "*" ? '<option value="v"' + (sel === "v" ? " selected" : "") + ">Visível</option>" : "") +
      '<option value="o"' + (sel === "o" ? " selected" : "") + ">Oculta</option>" +
      '<option value="d"' + (sel === "d" ? " selected" : "") + ">Liberar a partir de…</option></select>" +
      '<input type="date" data-dt aria-label="Data de liberação de ' + esc(nome.replace(/<[^>]+>/g, "")) + '"' + (sel === "d" ? ' value="' + esc(v) + '"' : " hidden") + "></div>";
  }

  function linhaPasta(p, vistos) {
    if (vistos[p]) return ""; vistos[p] = 1;
    var d = PPC.disc[p] || { nome: COMPL[p] || p, st: "mat" }, nome = d.nome || COMPL[p] || p;
    NOMES[p] = nome;
    if (d.st === "breve") return '<div class="lc-row breve"><span class="lc-st b" aria-hidden="true"></span><span class="lc-nome">' + esc(nome) + '</span><span class="lc-tag">em produção</span></div>';
    var h = controle(p, esc(nome) + (d.st === "int" ? ' <span class="lc-tag int">interativa</span>' : ""), false);
    if (d.st === "int") h += '<details class="lc-mods" data-p="' + esc(p) + '"' + (S.abertos[p] ? " open" : "") + '><summary>Módulos de ' + esc(nome) + "</summary><div data-ml>" + (MODS[p] ? modulos(p) : '<p class="lc-dica">Carregando módulos…</p>') + "</div></details>";
    return h;
  }
  function modulos(p) {
    return MODS[p].map(function (n, i) { return controle(p + "#" + (i + 1), "Módulo " + (i + 1) + " · " + esc(n), true); }).join("") +
      '<div class="lc-acoes"><button type="button" class="btn" data-lote="' + esc(p) + '" data-v="seq">Liberar um módulo por semana…</button></div>';
  }
  function carregaMods(p) {
    if (MODS[p]) return Promise.resolve();
    return fetch(p + "/disciplina.json").then(function (r) { return r.json(); }).then(function (cfg) {
      var n = cfg.modulos || 0, nomes = [];
      var ps = []; for (var i = 1; i <= n; i++) ps.push(fetch(p + "/dados/m" + i + ".js").then(function (r) { return r.text(); }));
      return Promise.all(ps).then(function (txts) {
        txts.forEach(function (t) { try { new Function("FSI", t)({ modulo: function (d) { nomes[d.n - 1] = d.nome; } }); } catch (e) {} });
        for (var j = 0; j < n; j++) if (!nomes[j]) nomes[j] = "Módulo " + (j + 1);
        MODS[p] = nomes;
      });
    }).catch(function () { MODS[p] = []; });
  }

  /* ---------- desenho ---------- */
  function contaAlteracoes() {
    var a = JSON.stringify(S.rascunho[S.escopo] || {}), b = JSON.stringify(S.salvo[S.escopo] || {});
    return a !== b;
  }
  function desenha() {
    var turmas = {}; S.alunos.forEach(function (a) { if (a.turma) turmas[a.turma] = a.curso || ""; });
    var opts = '<option value="*">Todas as turmas</option>' + Object.keys(turmas).sort().map(function (t) { return '<option value="' + esc(t) + '"' + (S.escopo === t ? " selected" : "") + ">" + esc(t) + (turmas[t] ? " · " + esc(turmas[t]) : "") + "</option>"; }).join("");
    var vistos = {}, corpo = cursos().map(function (c) {
      return '<section class="lc-curso"><h3>' + esc(c.nome) + "</h3>" + c.grupos.map(function (g) {
        var rows = g.c.map(function (x) { return x.p.map(function (p) { return linhaPasta(p, vistos); }).join(""); }).join("");
        return rows ? '<h4 class="lc-per">' + esc(g.t) + "</h4>" + rows : "";
      }).join("") + "</section>";
    }).join("");
    var comp = (PPC.complementares || []).map(function (p) { return linhaPasta(p, vistos); }).join("");
    if (comp) corpo += '<section class="lc-curso"><h3>Complementares</h3>' + comp + "</section>";
    var ocultas = 0, agend = 0, d = S.rascunho[S.escopo] || {};
    Object.keys(d).forEach(function (k) { var s = situacao(d[k]); if (s === "o") ocultas++; else if (s === "d") agend++; });
    host.innerHTML =
      '<div class="lc-topo cartao"><div class="lc-esc"><label for="lc-escopo">Aplicar a</label><select id="lc-escopo">' + opts.replace('value="*">', 'value="*"' + (S.escopo === "*" ? " selected" : "") + ">") + "</select></div>" +
      '<p class="lc-dica">' + (S.escopo === "*" ? "Estas regras valem para <b>todas as turmas</b>. Para ajustar uma turma específica, escolha-a acima: o que você definir para ela vale por cima destas regras." : "Regras só da turma <b>" + esc(S.escopo) + "</b>. “Igual a todas as turmas” segue o que foi definido para todas. Aparecem só as disciplinas do curso dessa turma.") +
      " Itens <b>ocultos</b> somem do portal, do Start nos Estudos e da disciplina; itens com <b>data</b> aparecem com cadeado até o dia escolhido.</p>" +
      '<p class="lc-res"><span><i class="lc-st v"></i>Visível</span><span><i class="lc-st o"></i>Oculta · ' + ocultas + '</span><span><i class="lc-st d"></i>Agendada · ' + agend + "</span></p>" +
      '<div class="lc-acoes"><button type="button" class="btn" data-tudo="">Voltar tudo ao padrão</button><button type="button" class="btn" data-tudo="o">Ocultar todas as disciplinas</button></div></div>' +
      '<div class="lc-lista">' + corpo + "</div>" +
      '<div class="lc-salvar" role="region" aria-label="Salvar alterações"><span id="lc-st" role="status" aria-live="polite">' + (contaAlteracoes() ? "Há alterações não salvas." : S.msg || "Tudo salvo.") + '</span><button type="button" class="btn pri" id="lc-salva"' + (contaAlteracoes() ? "" : " disabled") + ">Salvar para " + (S.escopo === "*" ? "todas as turmas" : esc(S.escopo)) + "</button></div>";
  }
  function marca(k, v) {
    var d = S.rascunho[S.escopo] = S.rascunho[S.escopo] || {};
    if (v) d[k] = v; else delete d[k];
    S.msg = "";
  }
  function atualizaRodape() {
    var alt = contaAlteracoes(), b = document.getElementById("lc-salva"), st = document.getElementById("lc-st");
    if (b) b.disabled = !alt; if (st) st.textContent = alt ? "Há alterações não salvas." : S.msg || "Tudo salvo.";
  }
  function liga() {
    host.addEventListener("change", function (e) {
      var t = e.target;
      if (t.id === "lc-escopo") { S.escopo = t.value; desenha(); abreMods(); return; }
      var row = t.closest(".lc-row"); if (!row) return; var k = row.getAttribute("data-k");
      var sel = row.querySelector("[data-sel]"), dt = row.querySelector("[data-dt]");
      if (t === sel) {
        if (sel.value === "d") { dt.hidden = false; if (!dt.value) { var a = new Date(); a.setDate(a.getDate() + 7); dt.value = a.toISOString().slice(0, 10); } marca(k, dt.value); dt.focus(); }
        else { dt.hidden = true; marca(k, sel.value); }
      } else if (t === dt) { if (/^\d{4}-\d{2}-\d{2}$/.test(dt.value)) marca(k, dt.value); }
      row.querySelector(".lc-st").className = "lc-st " + situacao(efetivo(k));
      atualizaRodape();
    });
    host.addEventListener("toggle", function (e) {
      var dt = e.target; if (!dt.matches || !dt.matches("details.lc-mods")) return;
      var p = dt.getAttribute("data-p"); S.abertos[p] = dt.open;
      if (dt.open && !MODS[p]) carregaMods(p).then(function () { var l = dt.querySelector("[data-ml]"); if (l) l.innerHTML = modulos(p); });
    }, true);
    host.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.id === "lc-salva") return salvar();
      if (b.hasAttribute("data-tudo")) {
        var v = b.getAttribute("data-tudo");
        if (v === "") S.rascunho[S.escopo] = {};
        else host.querySelectorAll(".lc-row[data-k]").forEach(function (r) { var k = r.getAttribute("data-k"); if (k.indexOf("#") < 0) marca(k, "o"); });
        desenha(); abreMods(); return;
      }
      if (b.hasAttribute("data-lote")) {
        var p = b.getAttribute("data-lote"), ini = new Date(), n = (MODS[p] || []).length;
        var dw = (8 - ini.getDay()) % 7 || 7; ini.setDate(ini.getDate() + dw); /* próxima segunda-feira */
        for (var i = 1; i <= n; i++) { if (i === 1) marca(p + "#1", ""); else { var d = new Date(ini); d.setDate(ini.getDate() + 7 * (i - 2)); marca(p + "#" + i, d.toISOString().slice(0, 10)); } }
        S.abertos[p] = true; desenha(); abreMods();
        S.msg = ""; var st = document.getElementById("lc-st"); if (st) st.textContent = "Módulo 1 liberado agora e os demais um por semana, às segundas. Confira e salve.";
      }
    });
  }
  function abreMods() { Object.keys(S.abertos).forEach(function (p) { if (S.abertos[p] && !MODS[p]) carregaMods(p).then(function () { var dt = host.querySelector('details[data-p="' + p + '"] [data-ml]'); if (dt) dt.innerHTML = modulos(p); }); }); }
  function salvar() {
    var b = document.getElementById("lc-salva"), st = document.getElementById("lc-st"), esc0 = S.escopo, reg = copia(S.rascunho[esc0]);
    if (S.demo) { S.salvo[esc0] = reg; S.msg = "Modo demonstração: as regras não foram enviadas à planilha."; atualizaRodape(); return; }
    if (!URL_) { st.textContent = "O portal não está ligado à planilha (config.js)."; return; }
    b.disabled = true; st.textContent = "Salvando…";
    fetch(URL_, { method: "POST", body: JSON.stringify({ acao: "visibilidade", chave: chave(), turma: esc0, regras: reg }) }).then(function (r) { return r.json(); }).then(function (r) {
      if (!r || !r.ok) { st.textContent = (r && r.erro) || "Não foi possível salvar. Confira se o Apps Script foi atualizado."; b.disabled = false; return; }
      S.salvo = copia(r.regras); S.rascunho[esc0] = copia(S.salvo[esc0]);
      S.msg = "Salvo às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) + ". Os alunos veem a mudança na próxima vez que abrirem o portal.";
      atualizaRodape();
    }).catch(function () { st.textContent = "Sem conexão com a planilha. Tente de novo."; b.disabled = false; });
  }

  window.PAINEL_CONTEUDO = function (dados, demo) {
    host = document.getElementById("aba-lib"); if (!host || !PPC) return;
    var esc0 = S ? S.escopo : "*", ab = S ? S.abertos : {};
    var vis = dados.visibilidade || (demo ? { "*": { "topicos-especiais-2": "o", "organizacao-de-computadores#5": "2026-12-01" } } : {});
    S = { escopo: esc0, alunos: dados.alunos || [], demo: !!demo, salvo: copia(vis), rascunho: copia(vis), abertos: ab, msg: dados.visibilidade || demo ? "" : "Para salvar, atualize o Apps Script (ação “visibilidade”)." };
    if (!host.getAttribute("data-ligado")) { liga(); host.setAttribute("data-ligado", "1"); }
    desenha(); abreMods();
  };
})();
