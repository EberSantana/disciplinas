/* Uso offline · Prof. Eber Santana
 * - Registra o service worker (sw.js).
 * - Mostra um aviso quando o aparelho fica sem internet e quando ela volta.
 * - Oferece, no painel "Ajustes", a seção "Uso offline": baixar, atualizar e apagar o material por disciplina.
 * O progresso feito sem internet fica guardado e é enviado sozinho (veja progresso-turma.js).
 */
(function () {
  "use strict";
  if (window.PT_OFFLINE) return;

  var d = document;
  var BASE = (function () {
    var s = d.currentScript && d.currentScript.src;
    if (!s) { var l = d.querySelectorAll("script[src*='offline.js']"); s = l.length ? l[l.length - 1].src : location.href; }
    return s.replace(/[^\/]*$/, "");
  })();
  var MAT = "portal-mat-v1", EXT = "portal-ext-v1";
  var temSW = "serviceWorker" in navigator && "caches" in window;
  var KEY = "pt-offline";

  function lerLS(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function gravarLS(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sem armazenamento */ } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function tam(b) { return b >= 1048576 ? (b / 1048576).toFixed(1).replace(".", ",") + " MB" : Math.max(1, Math.round(b / 1024)) + " KB"; }
  function baixados() { try { return JSON.parse(lerLS(KEY) || "{}") || {}; } catch (e) { return {}; } }
  function salvaBaixados(o) { gravarLS(KEY, JSON.stringify(o)); }

  /* ---------- service worker ---------- */
  if (temSW && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(BASE + "sw.js", { scope: BASE }).catch(function () { /* sem suporte: segue online */ });
    });
  }

  /* ---------- aviso de conexão ---------- */
  var css = d.createElement("style");
  css.setAttribute("data-offline", "");
  css.textContent =
    ".pt-off-bar{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9995;max-width:min(92vw,520px);padding:12px 18px;border-radius:12px;border:2px solid #8A5A00;background:#FFF4D6;color:#3A2A00;font:600 15px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);text-align:center}" +
    ".pt-off-bar.ok{border-color:#1F5135;background:#E3F3E8;color:#10331F}.pt-off-bar[hidden]{display:none}" +
    "html[data-a11y-esq=escuro] .pt-off-bar{border-color:#E6B450;background:#3A2F12;color:#FBEFD0}html[data-a11y-esq=escuro] .pt-off-bar.ok{border-color:#63C48F;background:#123425;color:#DDF0E4}" +
    "@media (prefers-color-scheme:dark){html:not([data-a11y-esq]) .pt-off-bar{border-color:#E6B450;background:#3A2F12;color:#FBEFD0}html:not([data-a11y-esq]) .pt-off-bar.ok{border-color:#63C48F;background:#123425;color:#DDF0E4}}" +
    "@media (max-width:560px){.pt-off-bar{bottom:72px}}" +
    ".a11y-off p{margin:0 0 10px}.a11y-off ul{list-style:none;margin:0 0 10px;padding:0;display:grid;gap:8px}" +
    ".a11y-off li{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;border:2px solid var(--u-line);border-radius:12px;padding:10px;background:var(--u-bg)}" +
    ".a11y-off li.ok{border-color:var(--u-acc);background:var(--u-soft)}" +
    ".a11y-off li>div{flex:1 1 150px;min-width:0}.a11y-off li b{display:block;font-size:14.5px;line-height:1.25;color:var(--u-ink);letter-spacing:0;word-spacing:0}" +
    ".a11y-off li small{display:block;font-size:13px;line-height:1.35;color:var(--u-ink2);margin-top:2px;letter-spacing:0;word-spacing:0}" +
    ".a11y-off .acoes{display:flex;gap:6px;flex-wrap:wrap}" +
    ".a11y-off button{min-height:44px;padding:0 14px;border-radius:10px;border:2px solid var(--u-acc);background:var(--u-acc);color:var(--u-acc-ink);font:600 14px/1 system-ui,-apple-system,'Segoe UI',sans-serif;cursor:pointer}" +
    ".a11y-off button.sec{background:var(--u-bg);color:var(--u-ink)}.a11y-off button[disabled]{opacity:.6;cursor:default}" +
    ".a11y-off progress{width:100%;height:10px;accent-color:var(--u-acc)}" +
    ".a11y-off .st{font-size:14px;color:var(--u-ink);margin:6px 0;letter-spacing:0;word-spacing:0;min-height:1.4em}";
  (d.head || d.documentElement).appendChild(css);

  var bar = null, tBar = null;
  function mostraBar(txt, ok, ms) {
    if (!d.body) return;
    if (!bar) {
      bar = d.createElement("div"); bar.className = "pt-off-bar"; bar.setAttribute("role", "status"); bar.setAttribute("aria-live", "polite"); bar.hidden = true;
      d.body.appendChild(bar);
    }
    clearTimeout(tBar);
    bar.className = "pt-off-bar" + (ok ? " ok" : "");
    bar.textContent = txt; bar.hidden = false;
    if (ms) tBar = setTimeout(function () { bar.hidden = true; }, ms);
  }
  function aoFicarOffline() { mostraBar("Você está sem internet. O que você fizer fica salvo e será enviado quando a conexão voltar.", false); atualiza(); }
  function aoVoltar() { mostraBar("A internet voltou. Seu progresso será enviado.", true, 5000); atualiza(); }
  window.addEventListener("offline", aoFicarOffline);
  window.addEventListener("online", aoVoltar);
  function iniciaAviso() { if (navigator.onLine === false) aoFicarOffline(); }
  if (d.readyState !== "loading") iniciaAviso(); else d.addEventListener("DOMContentLoaded", iniciaAviso);

  /* ---------- instalar na tela inicial ---------- */
  var evInstalar = null;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); evInstalar = e; atualiza(); });
  window.addEventListener("appinstalled", function () { evInstalar = null; atualiza(); });
  function instalado() { return (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true; }
  function ehIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); } /* iPadOS novo se identifica como Mac */

  /* ---------- manifesto de materiais ---------- */
  var M = null, lista = null, estado = { ocupado: false, msg: "", prog: null };
  function carregaManifesto() {
    return fetch(BASE + "offline-manifest.json", { cache: "no-cache" }).then(function (r) { return r.json(); }).then(function (m) { M = m; return m; });
  }
  function url(p) { return BASE + encodeURI(p); }

  function pool(itens, n, fn) {
    var i = 0, feitos = 0;
    return new Promise(function (ok) {
      if (!itens.length) return ok();
      function prox() {
        if (i >= itens.length) { if (feitos >= itens.length) ok(); return; }
        var it = itens[i++];
        Promise.resolve().then(function () { return fn(it); }).catch(function () {}).then(function () { feitos++; prox(); });
      }
      for (var k = 0; k < Math.min(n, itens.length); k++) prox();
    });
  }

  function baixarExterno(u) {
    return fetch(u).then(function (r) {
      if (!r.ok) return;
      return caches.open(EXT).then(function (c) {
        var copia = r.clone();
        return c.put(u, r).then(function () {
          if (!/fonts\.googleapis/.test(u)) return;
          return copia.text().then(function (css) {
            var fontes = css.match(/https:\/\/fonts\.gstatic\.com[^)'" ]+/g) || [];
            return pool(fontes, 4, function (f) { return fetch(f).then(function (x) { if (x.ok) return c.put(f, x); }); });
          });
        });
      });
    }).catch(function () { /* fonte externa indisponível: o portal usa a fonte do sistema */ });
  }

  function baixar(id) {
    var g = M.grupos.filter(function (x) { return x.id === id; })[0];
    if (!g || estado.ocupado) return Promise.resolve();
    if (navigator.onLine === false) { estado.msg = "Sem internet agora. Conecte-se para baixar."; atualiza(); return Promise.resolve(); }
    estado.ocupado = id; estado.msg = "Baixando " + g.nome + "…"; estado.prog = { v: 0, max: g.arquivos.length };
    atualiza();
    var falhas = 0;
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* opcional */ }
    return caches.open(MAT).then(function (c) {
      return pool(g.arquivos, 4, function (p) {
        return fetch(url(p), { cache: "reload" }).then(function (r) {
          if (!r.ok) throw new Error("falha");
          return c.put(url(p), r);
        }).catch(function () { falhas++; }).then(function () { estado.prog.v++; atualizaProgresso(); });
      });
    }).then(function () {
      return pool(g.externos.concat(M.externosCore || []), 3, baixarExterno);
    }).then(function () {
      if (falhas) { estado.msg = "Não foi possível baixar " + falhas + " arquivo(s) de " + g.nome + ". Tente de novo com uma conexão melhor."; }
      else {
        var b = baixados(); b[id] = { versao: g.versao, quando: Date.now() }; salvaBaixados(b);
        estado.msg = g.nome + " está pronta para uso offline.";
      }
    }).catch(function () { estado.msg = "O download foi interrompido. Tente de novo."; })
      .then(function () { estado.ocupado = false; estado.prog = null; atualiza(); });
  }

  function apagar(id) {
    var g = M.grupos.filter(function (x) { return x.id === id; })[0];
    if (!g || estado.ocupado) return Promise.resolve();
    return caches.open(MAT).then(function (c) {
      return Promise.all(g.arquivos.map(function (p) { return c.delete(url(p)); }));
    }).then(function () {
      var b = baixados(); delete b[id]; salvaBaixados(b);
      estado.msg = g.nome + ": material apagado deste aparelho."; atualiza();
    });
  }

  function usoEspaco() {
    try {
      if (navigator.storage && navigator.storage.estimate) return navigator.storage.estimate().then(function (e) { return e.usage || 0; });
    } catch (e) { /* ignora */ }
    return Promise.resolve(0);
  }

  /* ---------- interface (dentro do painel Ajustes) ---------- */
  function html() {
    var b = baixados();
    var h = "<legend>Uso offline</legend>";
    if (!temSW) return h + "<p>Este navegador não permite o uso offline. Os materiais continuam funcionando com internet.</p>";
    if (!M) return h + "<p>Carregando a lista de materiais…</p>";
    h += "<p>Baixe a disciplina para estudar sem internet. Prefira o Wi-Fi para não gastar seus dados. O login precisa de internet na primeira vez.</p><ul>";
    M.grupos.forEach(function (g) {
      var r = b[g.id], tem = !!r, velho = tem && r.versao !== g.versao;
      var st = tem ? (velho ? "Baixada · há atualização" : "Pronta para uso offline") : "Não baixada";
      var ocup = estado.ocupado === g.id;
      h += '<li class="' + (tem ? "ok" : "") + '"><div><b>' + esc(g.nome) + "</b><small>" + tam(g.bytes) + " · " + st + "</small></div><span class=\"acoes\">";
      if (!tem) h += '<button type="button" data-off="baixar" data-id="' + g.id + '"' + (estado.ocupado ? " disabled" : "") + ' aria-label="Baixar ' + esc(g.nome) + '">' + (ocup ? "Baixando…" : "Baixar") + "</button>";
      else {
        if (velho) h += '<button type="button" data-off="baixar" data-id="' + g.id + '"' + (estado.ocupado ? " disabled" : "") + ' aria-label="Atualizar ' + esc(g.nome) + '">' + (ocup ? "Atualizando…" : "Atualizar") + "</button>";
        h += '<button type="button" class="sec" data-off="apagar" data-id="' + g.id + '"' + (estado.ocupado ? " disabled" : "") + ' aria-label="Apagar ' + esc(g.nome) + ' deste aparelho">Apagar</button>';
      }
      h += "</span></li>";
    });
    h += "</ul>";
    h += '<progress id="a11y-off-prog" max="100" value="0" aria-label="Progresso do download"' + (estado.prog ? "" : " hidden") + "></progress>";
    h += '<div class="st" role="status" aria-live="polite" id="a11y-off-st">' + esc(estado.msg) + "</div>";
    if (!instalado()) {
      if (evInstalar) h += '<button type="button" class="sec" data-off="instalar">Instalar na tela inicial</button>';
      else if (ehIOS()) h += "<p>No iPhone ou iPad (Safari): toque em Compartilhar e depois em <strong>Adicionar à Tela de Início</strong>.</p>";
      else h += "<p>Para abrir como aplicativo, abra o menu do navegador (os três pontinhos) e escolha <strong>Instalar aplicativo</strong> ou <strong>Adicionar à tela inicial</strong>.</p>";
    }
    h += '<div class="st" id="a11y-off-uso"></div>';
    return h;
  }

  function atualizaProgresso() {
    if (!lista) return;
    var p = lista.querySelector("#a11y-off-prog");
    if (p && estado.prog) { p.hidden = false; p.max = estado.prog.max; p.value = estado.prog.v; }
  }
  function pinta() {
    if (!lista || !lista.isConnected) { lista = null; return; }
    var foco = d.activeElement && d.activeElement.getAttribute && d.activeElement.getAttribute("data-off") ? d.activeElement.getAttribute("data-off") + "|" + d.activeElement.getAttribute("data-id") : null;
    lista.innerHTML = html();
    if (foco) {
      var p = foco.split("|"), alvo = lista.querySelector('[data-off="' + p[0] + '"][data-id="' + p[1] + '"]') || lista.querySelector("button:not([disabled])");
      if (alvo) alvo.focus();
    }
    atualizaProgresso();
    usoEspaco().then(function (u) { var el = lista && lista.querySelector("#a11y-off-uso"); if (el && u) el.textContent = "Espaço usado por este portal neste aparelho: " + tam(u) + "."; });
  }
  function atualiza() { pinta(); }

  function montar(painel) {
    if (!painel) return;
    var acoes = painel.querySelector(".a11y-acoes");
    var fs = d.createElement("fieldset"); fs.className = "a11y-off";
    if (acoes) painel.insertBefore(fs, acoes); else painel.appendChild(fs);
    lista = fs;
    fs.addEventListener("click", function (ev) {
      var b = ev.target.closest && ev.target.closest("button[data-off]");
      if (!b || b.disabled) return;
      var a = b.getAttribute("data-off"), id = b.getAttribute("data-id");
      if (a === "baixar") baixar(id);
      else if (a === "apagar") apagar(id);
      else if (a === "instalar" && evInstalar) { evInstalar.prompt(); evInstalar.userChoice.then(function () { evInstalar = null; atualiza(); }); }
    });
    pinta();
    carregaManifesto().then(pinta).catch(function () {
      if (!M) { lista && (lista.innerHTML = "<legend>Uso offline</legend><p>Não foi possível carregar a lista agora. Tente de novo com internet.</p>"); }
    });
  }

  window.PT_OFFLINE = { montar: montar, baixar: baixar, apagar: apagar, manifesto: carregaManifesto };
})();
