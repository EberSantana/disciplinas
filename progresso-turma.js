/* Login, menu de disciplinas e progresso da turma \u2014 Prof. Eber Santana
 * O aluno entra uma vez no portal (nome completo, e-mail, curso, turno, turma e PIN).
 * O login vale em todos os materiais e o bot\u00e3o no canto vira o menu das disciplinas do curso dele.
 * O progresso vai para a planilha do professor (App da Web definido em config.js).
 *
 * Para mudar quais disciplinas pertencem a cada curso, edite a lista CURSOS logo abaixo.
 *
 * Em uma p\u00e1gina de material, defina antes deste script:
 *   window.PROGRESSO_ID = "id-do-material";
 *   window.PROGRESSO_DADOS = () => ({ feitas, total, pontos, detalhe });
 * e chame window.progressoMudou() sempre que o aluno avan\u00e7ar.
 */
(function () {
  var CURSOS = [
    { nome: "T\u00e9cnico em Inform\u00e1tica", disciplinas: [
      ["Redes de Computadores", "redes-de-computadores"],
      ["Projeto de Redes", "projeto-de-redes"],
      ["Seguran\u00e7a da Informa\u00e7\u00e3o", "seguranca-da-informacao"] ] },
    { nome: "Subsequente em Inform\u00e1tica", disciplinas: [
      ["Inform\u00e1tica B\u00e1sica", "informatica-basica"],
      ["Engenharia de Software", "engenharia-de-software"] ] },
    { nome: "Integrado em Desenvolvimento de Sistemas", disciplinas: [
      ["Constru\u00e7\u00e3o de Sites 1 (1\u00ba ano)", "construcao-de-sites-1"],
      ["Banco de Dados (2\u00ba ano)", "banco-de-dados"] ] }
  ];
  var TURNOS = ["Matutino", "Vespertino", "Noturno", "Integral"];

  var URL_ = String(window.RANKING_URL || "").trim();
  var ID = window.PROGRESSO_ID || "";
  var DADOS = typeof window.PROGRESSO_DADOS === "function" ? window.PROGRESSO_DADOS : null;
  var PORTAL = !ID;
  var PKEY = "perfil:aluno";
  var me = document.currentScript;
  var BASE = me && me.src ? me.src.replace(/[^\/]*$/, "") : "";

  function cursoDe(nome) { for (var i = 0; i < CURSOS.length; i++) if (CURSOS[i].nome === nome) return CURSOS[i]; return null; }
  function lerPerfil() {
    try { var p = JSON.parse(localStorage.getItem(PKEY) || "null"); return p && p.email && p.nome && cursoDe(p.curso) ? p : null; } catch (e) { return null; }
  }
  function apelidoDe(nome) {
    var w = nome.trim().split(/\s+/);
    return w.length > 1 ? w[0] + " " + w[w.length - 1].charAt(0).toUpperCase() + "." : w[0];
  }
  var perfil = lerPerfil();

  var css = document.createElement("style");
  css.textContent =
    ".pt-fab{position:fixed;right:16px;bottom:16px;z-index:9998;border:0;border-radius:999px;padding:12px 18px;font:600 15px/1.2 'Source Sans 3','Segoe UI',system-ui,sans-serif;background:#D96C14;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer;max-width:calc(100vw - 32px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    ".pt-fab:focus-visible{outline:3px solid #15212B;outline-offset:2px}" +
    ".pt-fab .pt-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:8px;background:#fff;opacity:.5;vertical-align:middle}" +
    ".pt-fab.ok .pt-dot{opacity:1;background:#7CF0B0}" +
    ".pt-box{position:fixed;right:16px;bottom:72px;z-index:9999;width:min(380px,calc(100vw - 32px));max-height:calc(100vh - 100px);overflow:auto;border-radius:14px;padding:18px;font:15px/1.5 'Source Sans 3','Segoe UI',system-ui,sans-serif;background:#fff;color:#15212B;border:1px solid #D5DDDA;box-shadow:0 10px 30px rgba(0,0,0,.25);text-align:left}" +
    ".pt-box[hidden]{display:none}" +
    ".pt-box h3{margin:0 0 4px;font:700 24px/1.1 'Barlow Condensed','Arial Narrow',sans-serif;color:inherit}" +
    ".pt-box h4{margin:14px 0 6px;font:700 13px/1.2 'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:#B4560B}" +
    ".pt-box p{margin:0 0 10px;color:#3F4F5B;font-size:14px}" +
    ".pt-box label{display:block;font-size:13px;font-weight:600;margin:9px 0 3px;color:inherit}" +
    ".pt-box input,.pt-box select{width:100%;box-sizing:border-box;padding:9px 10px;border-radius:8px;border:1px solid #B8C6CD;background:#fff;color:#15212B;font:inherit}" +
    ".pt-two{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}" +
    ".pt-row{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}" +
    ".pt-btn{border:1px solid #D96C14;background:#D96C14;color:#fff;border-radius:8px;padding:9px 14px;font:600 14px/1 'Source Sans 3','Segoe UI',system-ui,sans-serif;cursor:pointer;text-decoration:none}" +
    ".pt-btn.sec{background:transparent;color:#B4560B}" +
    ".pt-menu{display:grid;gap:6px;margin:0;padding:0;list-style:none}" +
    ".pt-menu a{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 12px;border:1px solid #D5DDDA;border-radius:10px;color:inherit;text-decoration:none;font-weight:600}" +
    ".pt-menu a:hover,.pt-menu a:focus-visible{border-color:#D96C14;outline:none}" +
    ".pt-menu a[aria-current]{border-color:#D96C14;background:rgba(217,108,20,.08)}" +
    ".pt-menu a span{color:#D96C14}" +
    ".pt-msg{margin-top:10px;font-size:14px;min-height:1em}" +
    ".pt-msg.bad{color:#B3261E}.pt-msg.good{color:#0B7A49}" +
    ".pt-stat{font-family:'JetBrains Mono',monospace;font-size:13px;color:#6B7A84}" +
    ".pt-rank{margin:8px 0 0;padding:0;list-style:none;font-size:14px}" +
    ".pt-rank li{display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-top:1px solid #E3E9E6}" +
    ".pt-rank li.me{font-weight:700}" +
    "@media (prefers-color-scheme:dark){.pt-box{background:#16222B;color:#E4ECEF;border-color:#2A3A45}.pt-box p{color:#B8C6CD}.pt-box h4{color:#F08A36}.pt-box input,.pt-box select{background:#0F171D;color:#E4ECEF;border-color:#3A4C58}.pt-btn.sec{color:#F08A36;border-color:#F08A36}.pt-menu a{border-color:#2A3A45}.pt-menu a span{color:#F08A36}.pt-rank li{border-color:#2A3A45}.pt-msg.bad{color:#FF8174}.pt-msg.good{color:#4FD899}}" +
    "@media print{.pt-fab,.pt-box{display:none}}";
  document.head.appendChild(css);

  var fab = document.createElement("button");
  fab.className = "pt-fab";
  fab.type = "button";
  fab.setAttribute("aria-expanded", "false");
  fab.setAttribute("aria-controls", "pt-box");
  var box = document.createElement("div");
  box.className = "pt-box";
  box.id = "pt-box";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Login e disciplinas");
  document.body.appendChild(box);
  document.body.appendChild(fab);

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function primeiroNome() { return perfil ? perfil.nome.trim().split(/\s+/)[0] : ""; }
  function paintFab() {
    fab.className = "pt-fab" + (perfil ? " ok" : "");
    fab.innerHTML = '<span class="pt-dot" aria-hidden="true"></span>' + (perfil ? "Minhas disciplinas" : "Entrar");
    fab.setAttribute("aria-label", perfil ? "Minhas disciplinas, " + primeiroNome() : "Entrar no portal");
  }
  function msg(t, cl) { var m = box.querySelector(".pt-msg"); if (m) { m.textContent = t; m.className = "pt-msg " + (cl || ""); } }
  function dados() { return DADOS ? DADOS() : null; }
  function corpo(d) {
    return { disciplina: ID || "portal", nome: perfil.nome, email: perfil.email, curso: perfil.curso, turno: perfil.turno, turma: perfil.turma,
      pin: perfil.pin, apelido: perfil.apelido, pontos: d.pontos, feitas: d.feitas, total: d.total, detalhe: d.detalhe || {} };
  }
  function avisar() { try { window.dispatchEvent(new CustomEvent("perfil:mudou", { detail: perfil })); } catch (e) {} }
  function pastaAtual() {
    if (!BASE || location.href.indexOf(BASE) !== 0) return "";
    return location.href.slice(BASE.length).split(/[\/?#]/)[0];
  }

  function form() {
    box.innerHTML =
      "<h3>Entrar no portal</h3>" +
      "<p>Fa\u00e7a o login uma vez. Ele vale para todos os materiais e o seu progresso vai para o professor.</p>" +
      '<label for="pt-n">Nome completo</label><input id="pt-n" maxlength="80" autocomplete="name">' +
      '<label for="pt-e">E-mail</label><input id="pt-e" type="email" maxlength="80" autocomplete="email" inputmode="email">' +
      '<label for="pt-c">Curso</label><select id="pt-c"><option value="">Escolha o seu curso</option>' +
      CURSOS.map(function (c) { return "<option>" + esc(c.nome) + "</option>"; }).join("") + "</select>" +
      '<div class="pt-two"><div><label for="pt-tu">Turno</label><select id="pt-tu"><option value="">Escolha</option>' +
      TURNOS.map(function (t) { return "<option>" + t + "</option>"; }).join("") + "</select></div>" +
      '<div><label for="pt-t">Turma</label><input id="pt-t" maxlength="30" placeholder="Ex.: 2026.1"></div></div>' +
      '<label for="pt-p">PIN de 4 n\u00fameros</label><input id="pt-p" inputmode="numeric" maxlength="4" autocomplete="off">' +
      '<p class="pt-stat" style="margin-top:4px">Crie e guarde o PIN. Ele protege o seu progresso e serve para entrar em outro aparelho.</p>' +
      '<div class="pt-row"><button class="pt-btn" id="pt-go">Entrar</button><button class="pt-btn sec" id="pt-x">Agora n\u00e3o</button></div>' +
      '<div class="pt-msg" role="status"></div>';
    box.querySelector("#pt-x").onclick = close;
    box.querySelector("#pt-go").onclick = entrar;
    box.querySelectorAll("input").forEach(function (i) { i.addEventListener("keydown", function (e) { if (e.key === "Enter") entrar(); }); });
  }

  function entrar() {
    var n = box.querySelector("#pt-n").value.trim().replace(/\s+/g, " ");
    var e = box.querySelector("#pt-e").value.trim().toLowerCase();
    var c = box.querySelector("#pt-c").value;
    var tu = box.querySelector("#pt-tu").value;
    var t = box.querySelector("#pt-t").value.trim().replace(/\s+/g, " ");
    var p = box.querySelector("#pt-p").value.trim();
    if (n.split(" ").length < 2) return msg("Escreva o nome completo (nome e sobrenome).", "bad");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return msg("Confira o e-mail.", "bad");
    if (!c) return msg("Escolha o seu curso.", "bad");
    if (!tu) return msg("Escolha o turno.", "bad");
    if (!t) return msg("Escreva a turma.", "bad");
    if (!/^\d{4}$/.test(p)) return msg("O PIN precisa ter 4 n\u00fameros.", "bad");
    var anterior = perfil;
    perfil = { nome: n, email: e, curso: c, turno: tu, turma: t, pin: p, apelido: apelidoDe(n) };
    msg("Entrando\u2026");
    var envio = URL_ ? enviar(ID ? dados() : { feitas: 0, total: 0, pontos: 0 }, true) : Promise.resolve({ ok: true });
    envio.then(function (r) {
      if (!r.ok) { perfil = anterior; return msg(r.erro || "N\u00e3o foi poss\u00edvel entrar.", "bad"); }
      try { localStorage.setItem(PKEY, JSON.stringify(perfil)); } catch (err) {}
      paintFab(); avisar(); painel();
    });
  }

  function menuHtml() {
    var c = cursoDe(perfil.curso), atual = pastaAtual();
    return '<ul class="pt-menu">' + c.disciplinas.map(function (d) {
      return '<li><a href="' + esc(BASE + d[1] + "/") + '"' + (atual === d[1] ? ' aria-current="page"' : "") + ">" + esc(d[0]) + "<span>\u2192</span></a></li>";
    }).join("") + "</ul>";
  }

  function painel() {
    var d = dados();
    box.innerHTML =
      "<h3>Ol\u00e1, " + esc(primeiroNome()) + "</h3>" +
      '<p class="pt-stat">' + esc(perfil.curso) + "<br>" + esc(perfil.turma) + " \u00b7 " + esc(perfil.turno) + "</p>" +
      "<h4>Suas disciplinas</h4>" + menuHtml() +
      (d ? "<h4>Este material</h4>" + '<p class="pt-stat">' + d.feitas + " de " + d.total + " feitas \u00b7 " + d.pontos + " pontos</p>" +
        (URL_ ? "<p>O progresso \u00e9 enviado sozinho enquanto voc\u00ea estuda.</p>" : "<p>O envio para o professor ainda n\u00e3o foi ativado. Seu progresso fica salvo neste navegador.</p>") : "") +
      '<div class="pt-row">' + (d && URL_ ? '<button class="pt-btn" id="pt-s">Enviar agora</button>' : "") +
      '<a class="pt-btn sec" href="' + esc(BASE) + '">Todas as disciplinas</a>' +
      '<button class="pt-btn sec" id="pt-out">Sair</button><button class="pt-btn sec" id="pt-x">Fechar</button></div>' +
      '<div class="pt-msg" role="status"></div>' + (d && URL_ ? '<ol class="pt-rank" aria-label="Ranking da turma"></ol>' : "");
    box.querySelector("#pt-x").onclick = close;
    var s = box.querySelector("#pt-s");
    if (s) s.onclick = function () { msg("Enviando\u2026"); enviar(dados(), false).then(function (r) { if (r.ok) { msg("Progresso salvo.", "good"); ranking(); } }); };
    box.querySelector("#pt-out").onclick = function () { perfil = null; try { localStorage.removeItem(PKEY); } catch (e) {} paintFab(); avisar(); form(); };
    ranking();
  }

  function enviar(d, mostrarErro) {
    if (!URL_ || !perfil || !d) return Promise.resolve({ ok: false, erro: "sem configura\u00e7\u00e3o" });
    return fetch(URL_, { method: "POST", body: JSON.stringify(corpo(d)) })
      .then(function (r) { return r.json(); })
      .catch(function () { return { ok: false, erro: "Sem conex\u00e3o. Tente de novo mais tarde." }; })
      .then(function (r) { if (mostrarErro && !r.ok) msg(r.erro || "Falha no envio.", "bad"); return r; });
  }

  function ranking() {
    var ol = box.querySelector(".pt-rank");
    if (!ol || !URL_ || !perfil) return;
    fetch(URL_ + (URL_.indexOf("?") >= 0 ? "&" : "?") + "disciplina=" + encodeURIComponent(ID) + "&turma=" + encodeURIComponent(perfil.turma))
      .then(function (r) { return r.json(); })
      .then(function (v) {
        if (!v.ok || !v.lista || !v.lista.length) return;
        ol.innerHTML = v.lista.slice(0, 15).map(function (x, i) {
          var eu = String(x.apelido).toLowerCase() === perfil.apelido.toLowerCase();
          return '<li class="' + (eu ? "me" : "") + '"><span>' + (i + 1) + "\u00ba " + esc(x.apelido) + "</span><span>" + x.pontos + " pts</span></li>";
        }).join("");
        ol.insertAdjacentHTML("beforebegin", "<h4>Ranking da turma</h4>");
      })
      .catch(function () {});
  }

  function open() { box.hidden = false; fab.setAttribute("aria-expanded", "true"); perfil ? painel() : form(); var f = box.querySelector("input,a,button"); if (f) f.focus(); }
  function close() { box.hidden = true; fab.setAttribute("aria-expanded", "false"); }
  fab.onclick = function () { box.hidden ? open() : close(); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) close(); });

  var timer = null;
  window.progressoMudou = function () {
    if (!URL_ || !perfil || !DADOS) return;
    clearTimeout(timer);
    timer = setTimeout(function () { timer = null; enviar(dados(), false); }, 4000);
  };
  window.addEventListener("pagehide", function () {
    if (!URL_ || !perfil || !DADOS || !timer) return;
    try { navigator.sendBeacon(URL_, JSON.stringify(corpo(dados()))); } catch (e) {}
  });

  // Para a p\u00e1gina inicial organizar as disciplinas pelo curso do aluno
  window.PORTAL_ALUNO = { perfil: function () { return perfil; }, cursos: CURSOS, entrar: open };

  paintFab();
  avisar();
  if (PORTAL && !perfil) open();
})();
