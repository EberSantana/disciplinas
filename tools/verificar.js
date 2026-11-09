/* Verificação automática do portal (roda no GitHub Actions a cada envio e também no computador):
 *   npm i playwright axe-core && npx playwright install chromium
 *   python3 -m http.server 8765 &   node tools/verificar.js
 * Confere, nos temas claro e escuro e em tela de computador e de celular: erros de JavaScript,
 * rolagem horizontal, sobreposição dos botões fixos e acessibilidade (axe, WCAG 2.2 AA). */
const { chromium } = require("playwright");
const fs = require("fs");
const axeSrc = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const BASE = process.env.PORTAL_URL || "http://localhost:8765/";
const PAGINAS = ["index.html", "como-usar.html", "professor.html", "redes-de-computadores/index.html", "banco-de-dados/index.html",
  "informatica-basica/index.html", "engenharia-de-software/index.html", "laboratorio-3d/index.html", "recursos-de-aula/index.html",
  "fundamentos-de-sistemas-de-informacao/index.html", "fundamentos-de-sistemas-de-informacao/modulo-1.html", "fundamentos-de-sistemas-de-informacao/simulado.html",
  "organizacao-de-computadores/index.html", "organizacao-de-computadores/modulo-2.html", "organizacao-de-computadores/modulo-4.html",
  "banco-de-dados/trilha.html", "banco-de-dados/modulo-1.html",
  "seguranca-da-informacao/trilha.html", "seguranca-da-informacao/modulo-1.html",
  "redes-de-computadores/trilha.html", "redes-de-computadores/modulo-1.html",
  "projeto-de-redes/trilha.html", "projeto-de-redes/modulo-1.html",
  "informatica-basica/trilha.html", "informatica-basica/modulo-1.html",
  "construcao-de-sites-1/trilha.html", "construcao-de-sites-1/modulo-1.html", "construcao-de-sites-1/modulo-6.html",
  "engenharia-de-software/trilha.html", "engenharia-de-software/modulo-1.html",
  "programacao-1/index.html", "programacao-1/modulo-1.html", "programacao-1/modulo-3.html",
  "programacao-web/index.html", "programacao-web/modulo-1.html", "programacao-web/modulo-5.html", "programacao-web/modulo-6.html", "programacao-web/simulado.html",
  "sistemas-operacionais/index.html", "sistemas-operacionais/modulo-6.html", "sistemas-operacionais/modulo-8.html", "sistemas-operacionais/simulado.html",
  "mapas-mentais/index.html", "mapas-mentais/modulo-1.html", "mapas-mentais/modulo-3.html", "mapas-mentais/modulo-7.html", "mapas-mentais/simulado.html"];
const PERFIL = { id: "A1", nome: "Aluno Teste", turma: "T1", curso: "Integrado em Desenvolvimento de Sistemas · 2º ano", turno: "N", pin: "1234" };
(async () => {
  const b = await chromium.launch(); let falhas = 0;
  const erro = (m) => { falhas++; console.log("FALHA", m); };
  for (const esq of ["light", "dark"]) for (const [nome, w, h] of [["pc", 1280, 800], ["celular", 390, 780]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: esq });
    await ctx.addInitScript((p) => localStorage.setItem("perfil:aluno", JSON.stringify(p)), PERFIL);
    const pg = await ctx.newPage(); let er = [];
    pg.on("pageerror", (e) => er.push(String(e).slice(0, 120)));
    await pg.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, (r) => r.abort());
    for (const u of PAGINAS) {
      er = []; await pg.goto(BASE + u + "?professor"); await pg.waitForTimeout(600);
      const tag = `${u} [${esq}, ${nome}]`;
      if (er.length) erro(tag + " erro de JavaScript: " + er[0]);
      if (await pg.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) erro(tag + " rolagem horizontal");
      await pg.evaluate(axeSrc);
      const v = await pg.evaluate(async () => (await axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"], resultTypes: ["violations"] })).violations);
      v.forEach((x) => erro(tag + " acessibilidade " + x.id + ": " + x.nodes[0].html.slice(0, 80)));
    }
    await ctx.close();
  }
  await b.close();
  console.log(falhas ? falhas + " falha(s)." : "Tudo certo.");
  process.exit(falhas ? 1 : 0);
})();
