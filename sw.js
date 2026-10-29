/* Service worker do portal · uso offline.
 * Só guarda o que o aluno escolheu baixar (e o essencial do portal). Tudo o mais vai direto à internet.
 * Para forçar atualização de todos os aparelhos, mude VERSAO. */
var VERSAO = "v1";
var CORE = "portal-core-" + VERSAO, MAT = "portal-mat-" + VERSAO, EXT = "portal-ext-" + VERSAO;
var BASE = new URL("./", self.location).href;
var EXTERNOS = /^(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net)$/;

self.addEventListener("install", function (e) {
  e.waitUntil((async function () {
    try {
      var m = await (await fetch(BASE + "offline-manifest.json", { cache: "reload" })).json();
      var c = await caches.open(CORE);
      await Promise.all(m.core.map(function (p) { return c.add(new Request(BASE + p, { cache: "reload" })).catch(function () {}); }));
    } catch (err) { /* sem rede na instalação: o portal funciona normalmente online */ }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", function (e) {
  e.waitUntil((async function () {
    var nomes = await caches.keys();
    await Promise.all(nomes.filter(function (n) { return n !== CORE && n !== MAT && n !== EXT && /^portal-/.test(n); }).map(function (n) { return caches.delete(n); }));
    await self.clients.claim();
  })());
});

function limpa(url) { var u = new URL(url); return u.origin + u.pathname; }
function comTempo(p, ms) { return new Promise(function (ok, no) { var t = setTimeout(function () { no(new Error("tempo")); }, ms); p.then(function (r) { clearTimeout(t); ok(r); }, function (er) { clearTimeout(t); no(er); }); }); }

async function achar(req) {
  var url = limpa(req.url), alvos = [url];
  if (/\/$/.test(url)) alvos.push(url + "index.html");
  for (var i = 0; i < alvos.length; i++) {
    var r = await caches.match(alvos[i], { ignoreSearch: true });
    if (r) return r;
  }
  return null;
}

async function local(req) {
  var guardado = await achar(req);
  try {
    var res = await comTempo(fetch(req), 6000);
    if (res && res.ok && guardado) { /* atualiza a cópia que o aluno já baixou */
      var chave = limpa(req.url);
      for (var n of [CORE, MAT]) { var c = await caches.open(n); if (await c.match(chave, { ignoreSearch: true })) await c.put(chave, res.clone()); }
    }
    return res;
  } catch (err) {
    if (guardado) return guardado;
    if (req.mode === "navigate") { var off = await caches.match(BASE + "offline.html"); if (off) return off; }
    return Response.error();
  }
}

async function externo(req) {
  var c = await caches.open(EXT);
  var hit = await c.match(req, { ignoreVary: true });
  if (hit) return hit;
  try {
    var res = await fetch(req);
    if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone());
    return res;
  } catch (err) { return Response.error(); }
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var u = new URL(req.url);
  if (u.origin === self.location.origin) e.respondWith(local(req));
  else if (EXTERNOS.test(u.hostname)) e.respondWith(externo(req));
});
