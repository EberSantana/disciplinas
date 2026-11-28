/* Barra do Trilha Rali HUB nas páginas de disciplina · Prof. Eber Santana
 * Mostra o logo e o caminho "Estudos › nome da disciplina", igual aos jogos e ao PyNetSec.
 * Só entra nas páginas que têm o cabeçalho de disciplina (link "← Todas as disciplinas"),
 * então não mexe nas apostilas, nos módulos nem nos laboratórios. */
(function () {
  "use strict";
  var d = document;
  function montar() {
    if (d.querySelector(".hub-barra")) return;
    var voltar = d.querySelector("header a.back");
    var titulo = d.querySelector("header h1");
    if (!voltar || !titulo || !d.body) return;
    var base = (d.currentScript && d.currentScript.src) ? d.currentScript.src.replace(/barra-hub\.js.*$/, "") : "../";
    var css = d.createElement("style");
    css.textContent =
      ".hub-barra{position:sticky;top:0;z-index:40;background:var(--panel,#fff);border-bottom:1px solid var(--line,#D5DBE3)}" +
      ".hub-barra .in{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:10px;padding:8px clamp(12px,3vw,32px)}" +
      ".hub-barra img{height:40px;width:auto;display:block}" +
      ".hub-barra nav{display:flex;align-items:center;gap:8px;min-width:0;font-weight:600;font-size:15px;color:var(--ink-2,#344054)}" +
      ".hub-barra nav a{color:var(--accent,#007A35);text-decoration:none}" +
      ".hub-barra nav a:hover{text-decoration:underline}" +
      ".hub-barra nav b{color:var(--ink,#0F172A);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
      ".hub-barra .dir{margin-left:auto;display:flex;gap:6px}" +
      ".hub-barra .dir a{padding:8px 12px;border-radius:10px;font-weight:700;font-size:14px;color:var(--ink,#0F172A);text-decoration:none}" +
      ".hub-barra .dir a:hover{background:rgba(127,127,127,.12)}" +
      "@media (max-width:640px){.hub-barra nav .sep,.hub-barra nav b{display:none}.hub-barra .dir a:first-child{display:none}}";
    d.head.appendChild(css);
    var barra = d.createElement("div");
    barra.className = "hub-barra";
    var nome = (titulo.textContent || "").trim();
    barra.innerHTML =
      '<div class="in">' +
      '<a href="' + base + 'portal.html" aria-label="Trilha Rali HUB, página inicial">' +
      '<picture><source media="(prefers-color-scheme: dark)" srcset="' + base + 'img/logo-hub-escuro.png">' +
      '<img src="' + base + 'img/logo-hub.png" alt="Trilha Rali HUB" width="120" height="40"></picture></a>' +
      '<nav aria-label="Você está em"><span class="sep" aria-hidden="true">›</span>' +
      '<a href="' + base + '">Estudos</a><span class="sep" aria-hidden="true">›</span><b aria-current="page"></b></nav>' +
      '<div class="dir"><a href="' + base + '#conquistas">Conquistas</a><a href="' + base + '">← Estudos</a></div></div>';
    barra.querySelector("b").textContent = nome;
    d.body.insertBefore(barra, d.body.firstChild);
  }
  if (d.readyState !== "loading") montar(); else d.addEventListener("DOMContentLoaded", montar);
})();
