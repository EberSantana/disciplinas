/* Login, menu de disciplinas e progresso da turma \u2014 Prof. Eber Santana
 * Quem n\u00e3o fez login v\u00ea a tela de entrada, que ocupa a p\u00e1gina inteira. O site aparece depois do login.
 * O login (nome completo, e-mail, curso, turno, turma e PIN) vale em todos os materiais.
 * Depois de entrar, o bot\u00e3o no canto vira o menu com as disciplinas do curso do aluno.
 * O progresso vai para a planilha do professor (App da Web definido em config.js).
 *
 * Para mudar quais disciplinas pertencem a cada curso, edite a lista CURSOS logo abaixo.
 * Para abrir uma p\u00e1gina sem login (ex.: modo professor), acrescente ?professor ao endere\u00e7o.
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
  var PKEY = "perfil:aluno";
  var LIVRE = /[?&]professor\b/.test(location.search);
  var me = document.currentScript;
  var BASE = me && me.src ? me.src.replace(/[^\/]*$/, "") : "";
  var root = document.documentElement;

  function cursoDe(nome) { for (var i = 0; i < CURSOS.length; i++) if (CURSOS[i].nome === nome) return CURSOS[i]; return null; }
  function lerPerfil() {
    try { var p = JSON.parse(localStorage.getItem(PKEY) || "null"); return p && p.email && p.nome && cursoDe(p.curso) ? p : null; } catch (e) { return null; }
  }
  function apelidoDe(nome) {
    var w = nome.trim().split(/\s+/);
    return w.length > 1 ? w[0] + " " + w[w.length - 1].charAt(0).toUpperCase() + "." : w[0];
  }
  var perfil = lerPerfil();

  if (!document.querySelector('link[href*="Barlow+Condensed"]')) {
    var fl = document.createElement("link");
    fl.rel = "stylesheet";
    fl.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400&display=swap";
    document.head.appendChild(fl);
  }

  var F = "'Source Sans 3','Segoe UI',system-ui,sans-serif", FD = "'Barlow Condensed','Arial Narrow',sans-serif", FM = "'JetBrains Mono',ui-monospace,monospace";
  var css = document.createElement("style");
  css.textContent =
    /* tela de entrada */
    "html.pt-gate,html.pt-gate body{overflow:hidden!important}" +
    "html.pt-gate body>*:not(.pt-screen){visibility:hidden!important}" +
    ".pt-screen{position:fixed;inset:0;z-index:10000;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);background:#EEF2F0;color:#15212B;font:16px/1.55 " + F + ";overflow:auto;-webkit-font-smoothing:antialiased}" +
    ".pt-screen[hidden]{display:none}" +
    ".pt-hero{background:#15212B;color:#DCE5EA;padding:clamp(28px,6vw,72px);display:flex;flex-direction:column;justify-content:center;gap:18px;position:relative;overflow:hidden}" +
    ".pt-hero::after{content:'';position:absolute;right:-120px;bottom:-120px;width:360px;height:360px;border-radius:50%;border:56px solid rgba(217,108,20,.16);pointer-events:none}" +
    ".pt-eyebrow{font:12px/1.4 " + FM + ";letter-spacing:.12em;text-transform:uppercase;color:#F08A36}" +
    ".pt-hero h1{margin:0;font:700 clamp(40px,6vw,68px)/1 " + FD + ";color:#fff;text-wrap:balance}" +
    ".pt-hero p{margin:0;max-width:44ch;color:#B8C6CD;font-size:17px}" +
    ".pt-feats{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:12px;max-width:46ch}" +
    ".pt-feats li{display:flex;gap:12px;align-items:flex-start;color:#DCE5EA}" +
    ".pt-feats b{flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:8px;background:rgba(217,108,20,.18);color:#F08A36;font:700 14px/1 " + FM + "}" +
    ".pt-side{display:flex;align-items:center;justify-content:center;padding:clamp(20px,5vw,56px)}" +
    ".pt-card{width:100%;max-width:440px;background:#fff;border:1px solid #D5DDDA;border-radius:16px;padding:clamp(20px,4vw,32px);box-shadow:0 12px 40px rgba(21,33,43,.08)}" +
    ".pt-card h2{margin:0 0 4px;font:700 32px/1.1 " + FD + "}" +
    ".pt-card .pt-sub{margin:0 0 14px;color:#3F4F5B;font-size:15px}" +
    ".pt-card label{display:block;font-size:14px;font-weight:600;margin:12px 0 4px}" +
    ".pt-card input,.pt-card select{width:100%;box-sizing:border-box;min-height:46px;padding:10px 12px;border-radius:10px;border:1px solid #B8C6CD;background:#fff;color:#15212B;font:16px " + F + "}" +
    ".pt-card input:focus,.pt-card select:focus{outline:2px solid #D96C14;outline-offset:1px;border-color:#D96C14}" +
    ".pt-two{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}" +
    ".pt-go{width:100%;min-height:50px;margin-top:20px;border:0;border-radius:10px;background:#D96C14;color:#fff;font:700 17px/1 " + F + ";cursor:pointer}" +
    ".pt-go:hover{background:#C25E0F}.pt-go:focus-visible{outline:3px solid #15212B;outline-offset:2px}.pt-go[disabled]{opacity:.7;cursor:wait}" +
    ".pt-note{margin:12px 0 0;font-size:13px;color:#6B7A84}" +
    ".pt-msg{margin-top:10px;font-size:14px}.pt-msg:empty{margin:0}" +
    ".pt-msg.bad{color:#B3261E}.pt-msg.good{color:#0B7A49}" +
    "@media (max-width:820px){.pt-screen{grid-template-columns:1fr;grid-template-rows:auto auto;align-content:start}.pt-hero{padding:28px 20px 26px;gap:10px;overflow:visible;flex-shrink:0}.pt-hero::after{display:none}.pt-hero h1{font-size:40px}.pt-hero p{font-size:15.5px}.pt-feats{display:none}.pt-side{padding:18px 16px 32px;align-items:flex-start}}" +
    "@media (max-width:380px){.pt-two{grid-template-columns:1fr}}" +
    /* bot\u00e3o e menu depois do login */
    ".pt-fab{position:fixed;right:16px;bottom:16px;z-index:9998;border:0;border-radius:999px;padding:12px 18px;font:600 15px/1.2 " + F + ";background:#D96C14;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer;max-width:calc(100vw - 32px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    ".pt-fab[hidden]{display:none}" +
    ".pt-fab:focus-visible{outline:3px solid #15212B;outline-offset:2px}" +
    ".pt-fab .pt-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:8px;background:#7CF0B0;vertical-align:middle}" +
    ".pt-box{position:fixed;right:16px;bottom:72px;z-index:9999;width:min(380px,calc(100vw - 32px));max-height:calc(100vh - 100px);overflow:auto;border-radius:14px;padding:18px;font:15px/1.5 " + F + ";background:#fff;color:#15212B;border:1px solid #D5DDDA;box-shadow:0 10px 30px rgba(0,0,0,.25);text-align:left}" +
    ".pt-box[hidden]{display:none}" +
    ".pt-box h3{margin:0 0 4px;font:700 24px/1.1 " + FD + ";color:inherit}" +
    ".pt-box h4{margin:14px 0 6px;font:700 12px/1.2 " + FM + ";letter-spacing:.08em;text-transform:uppercase;color:#B4560B}" +
    ".pt-box p{margin:0 0 10px;color:#3F4F5B;font-size:14px}" +
    ".pt-row{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}" +
    ".pt-btn{display:inline-flex;align-items:center;min-height:38px;border:1px solid #D96C14;background:#D96C14;color:#fff;border-radius:8px;padding:0 14px;font:600 14px/1 " + F + ";cursor:pointer;text-decoration:none}" +
    ".pt-btn.sec{background:transparent;color:#B4560B}" +
    ".pt-menu{display:grid;gap:6px;margin:0;padding:0;list-style:none}" +
    ".pt-menu a{display:flex;justify-content:space-between;align-items:center;gap:8px;min-height:44px;padding:0 12px;border:1px solid #D5DDDA;border-radius:10px;color:inherit;text-decoration:none;font-weight:600}" +
    ".pt-menu a:hover,.pt-menu a:focus-visible{border-color:#D96C14;outline:none}" +
    ".pt-menu a[aria-current]{border-color:#D96C14;background:rgba(217,108,20,.08)}" +
    ".pt-menu a span{color:#D96C14}" +
    ".pt-stat{font-family:" + FM + ";font-size:13px;color:#6B7A84}" +
    ".pt-rank{margin:8px 0 0;padding:0;list-style:none;font-size:14px}" +
    ".pt-rank li{display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-top:1px solid #E3E9E6}" +
    ".pt-rank li.me{font-weight:700}" +
    "@media (prefers-color-scheme:dark){" +
      ".pt-screen{background:#0F171D;color:#E4ECEF}.pt-hero{background:#0B1116}" +
      ".pt-card{background:#16222B;border-color:#2A3A45;box-shadow:none}.pt-card .pt-sub{color:#B8C6CD}.pt-note{color:#8699A4}" +
      ".pt-card input,.pt-card select{background:#0F171D;color:#E4ECEF;border-color:#3A4C58}" +
      ".pt-box{background:#16222B;color:#E4ECEF;border-color:#2A3A45}.pt-box p{color:#B8C6CD}.pt-box h4{color:#F08A36}" +
      ".pt-btn.sec{color:#F08A36;border-color:#F08A36}.pt-menu a{border-color:#2A3A45}.pt-menu a span{color:#F08A36}.pt-rank li{border-color:#2A3A45}" +
      ".pt-msg.bad{color:#FF8174}.pt-msg.good{color:#4FD899}}" +
    "@media print{.pt-fab,.pt-box,.pt-screen{display:none}}";
  document.head.appendChild(css);

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function primeiroNome() { return perfil ? perfil.nome.trim().split(/\s+/)[0] : ""; }
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
  function enviar(d) {
    if (!URL_ || !perfil || !d) return Promise.resolve({ ok: false, erro: "sem configura\u00e7\u00e3o" });
    return fetch(URL_, { method: "POST", body: JSON.stringify(corpo(d)) })
      .then(function (r) { return r.json(); })
      .catch(function () { return { ok: false, erro: "Sem conex\u00e3o com a internet. Tente de novo." }; });
  }

  /* ---------- tela de entrada ---------- */
  var screen = document.createElement("div");
  screen.className = "pt-screen";
  screen.hidden = true;
  screen.setAttribute("role", "dialog");
  screen.setAttribute("aria-modal", "true");
  screen.setAttribute("aria-labelledby", "pt-title");
  screen.innerHTML =
    '<section class="pt-hero">' +
      '<span class="pt-eyebrow">Prof. Eber Santana \u00b7 IFS Campus Tobias Barreto</span>' +
      "<h1>Ambientes de estudo</h1>" +
      "<p>Entre para acessar as disciplinas do seu curso e acompanhar o seu progresso.</p>" +
      '<ul class="pt-feats">' +
        "<li><b>01</b><span>Laborat\u00f3rios visuais e simuladores para ver cada conceito funcionando.</span></li>" +
        "<li><b>02</b><span>Caderno, flashcards, verdadeiro ou falso e PBL. A resposta aparece depois que voc\u00ea tenta.</span></li>" +
        "<li><b>03</b><span>Seu progresso fica salvo e conta pontos no ranking da turma.</span></li>" +
      "</ul>" +
    "</section>" +
    '<section class="pt-side"><form class="pt-card" novalidate>' +
      '<h2 id="pt-title">Entrar</h2>' +
      '<p class="pt-sub">Primeiro acesso ou outro aparelho? Preencha os mesmos dados e o mesmo PIN.</p>' +
      '<label for="pt-n">Nome completo</label><input id="pt-n" maxlength="80" autocomplete="name" required>' +
      '<label for="pt-e">E-mail</label><input id="pt-e" type="email" maxlength="80" autocomplete="email" inputmode="email" required>' +
      '<label for="pt-c">Curso</label><select id="pt-c" required><option value="">Escolha o seu curso</option>' +
        CURSOS.map(function (c) { return "<option>" + esc(c.nome) + "</option>"; }).join("") + "</select>" +
      '<div class="pt-two"><div><label for="pt-tu">Turno</label><select id="pt-tu" required><option value="">Escolha</option>' +
        TURNOS.map(function (t) { return "<option>" + t + "</option>"; }).join("") + "</select></div>" +
        '<div><label for="pt-t">Turma</label><input id="pt-t" maxlength="30" placeholder="Ex.: 2026.1" required></div></div>' +
      '<label for="pt-p">PIN de 4 n\u00fameros</label><input id="pt-p" type="password" inputmode="numeric" maxlength="4" autocomplete="off" required>' +
      '<button class="pt-go" type="submit">Entrar</button>' +
      '<div class="pt-msg" role="status" aria-live="polite"></div>' +
      '<p class="pt-note">Crie um PIN e guarde: ele protege o seu progresso. Seus dados ficam s\u00f3 com o professor.</p>' +
    "</form></section>";
  document.body.appendChild(screen);
  var formEl = screen.querySelector("form");
  function gmsg(t, cl) { var m = screen.querySelector(".pt-msg"); m.textContent = t; m.className = "pt-msg " + (cl || ""); }

  function setInert(on) {
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === screen) return;
      if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert");
    });
  }
  function mostrarEntrada() {
    root.classList.add("pt-gate");
    screen.hidden = false;
    fab.hidden = true; box.hidden = true;
    setInert(true);
    screen.scrollTop = 0;
    if (matchMedia("(pointer: fine)").matches) setTimeout(function () { var f = screen.querySelector("#pt-n"); if (f) f.focus({ preventScroll: true }); }, 30);
  }
  function esconderEntrada() {
    root.classList.remove("pt-gate");
    screen.hidden = true;
    setInert(false);
    fab.hidden = false;
  }

  formEl.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var v = function (id) { return screen.querySelector(id).value.trim().replace(/\s+/g, " "); };
    var n = v("#pt-n"), e = v("#pt-e").toLowerCase(), c = screen.querySelector("#pt-c").value, tu = screen.querySelector("#pt-tu").value, t = v("#pt-t"), p = v("#pt-p");
    var erro = n.split(" ").length < 2 ? ["#pt-n", "Escreva o nome completo (nome e sobrenome)."]
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? ["#pt-e", "Confira o e-mail."]
      : !c ? ["#pt-c", "Escolha o seu curso."]
      : !tu ? ["#pt-tu", "Escolha o turno."]
      : !t ? ["#pt-t", "Escreva a turma."]
      : !/^\d{4}$/.test(p) ? ["#pt-p", "O PIN precisa ter 4 n\u00fameros."] : null;
    if (erro) { gmsg(erro[1], "bad"); screen.querySelector(erro[0]).focus(); return; }
    var btn = screen.querySelector(".pt-go");
    btn.disabled = true; btn.textContent = "Entrando\u2026"; gmsg("");
    var anterior = perfil;
    perfil = { nome: n, email: e, curso: c, turno: tu, turma: t, pin: p, apelido: apelidoDe(n) };
    var envio = URL_ ? enviar(ID ? dados() : { feitas: 0, total: 0, pontos: 0 }) : Promise.resolve({ ok: true });
    envio.then(function (r) {
      btn.disabled = false; btn.textContent = "Entrar";
      if (!r.ok) { perfil = anterior; return gmsg(r.erro || "N\u00e3o foi poss\u00edvel entrar.", "bad"); }
      try { localStorage.setItem(PKEY, JSON.stringify(perfil)); } catch (err) {}
      formEl.reset();
      paintFab(); esconderEntrada(); avisar();
    });
  });

  /* ---------- bot\u00e3o e menu depois do login ---------- */
  var fab = document.createElement("button");
  fab.className = "pt-fab";
  fab.type = "button";
  fab.hidden = true;
  fab.setAttribute("aria-expanded", "false");
  fab.setAttribute("aria-controls", "pt-box");
  var box = document.createElement("div");
  box.className = "pt-box";
  box.id = "pt-box";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Minhas disciplinas");
  document.body.appendChild(box);
  document.body.appendChild(fab);

  function paintFab() {
    fab.innerHTML = '<span class="pt-dot" aria-hidden="true"></span>Minhas disciplinas';
    fab.setAttribute("aria-label", "Minhas disciplinas, " + primeiroNome());
  }
  function bmsg(t, cl) { var m = box.querySelector(".pt-msg"); if (m) { m.textContent = t; m.className = "pt-msg " + (cl || ""); } }

  function painel() {
    var d = dados(), c = cursoDe(perfil.curso), atual = pastaAtual();
    box.innerHTML =
      "<h3>Ol\u00e1, " + esc(primeiroNome()) + "</h3>" +
      '<p class="pt-stat">' + esc(perfil.curso) + "<br>" + esc(perfil.turma) + " \u00b7 " + esc(perfil.turno) + "</p>" +
      "<h4>Suas disciplinas</h4>" +
      '<ul class="pt-menu">' + c.disciplinas.map(function (x) {
        return '<li><a href="' + esc(BASE + x[1] + "/") + '"' + (atual === x[1] ? ' aria-current="page"' : "") + ">" + esc(x[0]) + "<span>\u2192</span></a></li>";
      }).join("") + "</ul>" +
      (d ? "<h4>Este material</h4>" + '<p class="pt-stat">' + d.feitas + " de " + d.total + " feitas \u00b7 " + d.pontos + " pontos</p>" +
        (URL_ ? "<p>O progresso \u00e9 enviado sozinho enquanto voc\u00ea estuda.</p>" : "<p>O envio para o professor ainda n\u00e3o foi ativado. Seu progresso fica salvo neste aparelho.</p>") : "") +
      '<div class="pt-row">' + (d && URL_ ? '<button class="pt-btn" id="pt-s" type="button">Enviar agora</button>' : "") +
      '<a class="pt-btn sec" href="' + esc(BASE) + '">P\u00e1gina inicial</a>' +
      '<button class="pt-btn sec" id="pt-out" type="button">Sair</button><button class="pt-btn sec" id="pt-x" type="button">Fechar</button></div>' +
      '<div class="pt-msg" role="status"></div>' + (d && URL_ ? '<ol class="pt-rank" aria-label="Ranking da turma"></ol>' : "");
    box.querySelector("#pt-x").onclick = fechar;
    var s = box.querySelector("#pt-s");
    if (s) s.onclick = function () { bmsg("Enviando\u2026"); enviar(dados()).then(function (r) { bmsg(r.ok ? "Progresso salvo." : r.erro || "Falha no envio.", r.ok ? "good" : "bad"); if (r.ok) ranking(); }); };
    box.querySelector("#pt-out").onclick = function () {
      perfil = null; try { localStorage.removeItem(PKEY); } catch (e) {}
      fechar(); avisar(); mostrarEntrada();
    };
    ranking();
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

  function abrir() { box.hidden = false; fab.setAttribute("aria-expanded", "true"); painel(); var f = box.querySelector("a,button"); if (f) f.focus(); }
  function fechar() { box.hidden = true; fab.setAttribute("aria-expanded", "false"); }
  fab.onclick = function () { box.hidden ? abrir() : fechar(); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) { fechar(); fab.focus(); } });

  /* ---------- envio autom\u00e1tico do progresso ---------- */
  var timer = null;
  window.progressoMudou = function () {
    if (!URL_ || !perfil || !DADOS) return;
    clearTimeout(timer);
    timer = setTimeout(function () { timer = null; enviar(dados()); }, 4000);
  };
  window.addEventListener("pagehide", function () {
    if (!URL_ || !perfil || !DADOS || !timer) return;
    try { navigator.sendBeacon(URL_, JSON.stringify(corpo(dados()))); } catch (e) {}
  });

  // Para a p\u00e1gina inicial organizar as disciplinas pelo curso do aluno
  window.PORTAL_ALUNO = { perfil: function () { return perfil; }, cursos: CURSOS, entrar: mostrarEntrada };

  if (perfil) { paintFab(); esconderEntrada(); }
  else if (LIVRE) { root.classList.remove("pt-gate"); }
  else { mostrarEntrada(); }
  avisar();
})();
