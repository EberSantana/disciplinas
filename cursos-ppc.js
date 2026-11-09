/* Disciplinas técnicas por curso, conforme os PPCs do IFS Campus Tobias Barreto (COINF).
 * INF-SUB: Resolução nº 09/2017/CS/IFS · TDS-INT: Resolução CS/IFS nº 216/2023.
 * Cada componente aponta para uma ou mais pastas do portal (o mesmo conteúdo serve aos dois cursos quando a ementa coincide).
 * Situação de cada pasta: "int" = disciplina interativa (motor com XP, laboratórios e missões),
 * "mat" = materiais (apostila, laboratórios e atividades), "breve" = em produção. */
window.PPC = {
  disc: {
    "programacao-1": { nome: "Programação 1", st: "breve" },
    "organizacao-de-computadores": { nome: "Organização de Computadores", st: "int" },
    "sistemas-operacionais": { nome: "Fundamentos de Sistemas Operacionais", st: "int" },
    "informatica-basica": { nome: "Informática Básica", st: "mat" },
    "programacao-orientada-a-objetos": { nome: "Programação Orientada a Objetos", st: "breve" },
    "banco-de-dados": { nome: "Banco de Dados", st: "int" },
    "construcao-de-sites-1": { nome: "Construção de Sites 1", st: "mat" },
    "programacao-web": { nome: "Programação Web (back-end)", st: "breve" },
    "engenharia-de-software": { nome: "Engenharia de Software", st: "mat" },
    "construcao-de-sites-2": { nome: "Construção de Sites 2", st: "breve" },
    "topicos-especiais-1": { nome: "Tópicos Especiais I", st: "breve" },
    "projeto-integrador": { nome: "Projeto Integrador", st: "breve" },
    "redes-de-computadores": { nome: "Redes de Computadores", st: "int" },
    "projeto-de-redes": { nome: "Projeto de Redes", st: "int" },
    "seguranca-da-informacao": { nome: "Segurança da Informação", st: "int" },
    "topicos-especiais-2": { nome: "Tópicos Especiais II", st: "breve" },
    "topicos-especiais-tds": { nome: "Tópicos Especiais (TDS)", st: "breve" }
  },
  cursos: [
    { id: "inf-sub", nome: "Técnico em Informática (Subsequente)", curto: "Subsequente em Informática", ato: "Resolução nº 09/2017/CS/IFS · 4 semestres · 1.203 h", grupos: [
      { t: "1º período", c: [
        { cod: "INF101", nome: "Programação I", ch: "127 h", temas: "Algoritmos, tipos de dados, decisão e repetição, vetores e matrizes, funções, strings, registros e arquivos.", p: ["programacao-1"] },
        { cod: "INF102", nome: "Organização de Computadores e Sistemas Operacionais", ch: "95 h", temas: "Sistemas de numeração, Von Neumann, CPU e memória, processos, memória virtual, arquivos, Linux e Windows.", p: ["organizacao-de-computadores", "sistemas-operacionais"] },
        { cod: "INF103", nome: "Informática Básica", ch: "63 h", temas: "Windows e arquivos, Writer com ABNT, Calc, Impress, nuvem e segurança básica.", p: ["informatica-basica"] }] },
      { t: "2º período", c: [
        { cod: "INF201", nome: "Programação II", ch: "127 h", temas: "Orientação a objetos: classes, encapsulamento, associações, herança, polimorfismo, interfaces, exceções e coleções.", p: ["programacao-orientada-a-objetos"] },
        { cod: "INF202", nome: "Banco de Dados", ch: "95 h", temas: "SGBD, DER, modelo relacional, normalização, SQL (DDL, DML) e consultas com junções e subconsultas.", p: ["banco-de-dados"] },
        { cod: "INF203", nome: "Construção de Sites I", ch: "63 h", temas: "HTML5 semântico, links, mídias, tabelas e formulários, CSS3, box model, Flexbox, acessibilidade e publicação.", p: ["construcao-de-sites-1"] }] },
      { t: "3º período", c: [
        { cod: "INF301", nome: "Programação III", ch: "95 h", temas: "Cliente-servidor e MVC, HTTP, sessões e autenticação, DAO e banco de dados, APIs REST com JSON.", p: ["programacao-web"] },
        { cod: "INF302", nome: "Engenharia de Software", ch: "95 h", temas: "Processos (cascata e Scrum), requisitos, UML, ferramentas CASE, documentação, testes e versionamento.", p: ["engenharia-de-software"] },
        { cod: "INF303", nome: "Construção de Sites II", ch: "63 h", temas: "JavaScript ES6+, DOM, validação, Fetch e JSON, CSS Grid e media queries, frameworks e UX/UI.", p: ["construcao-de-sites-2"] },
        { cod: "INF304", nome: "Tópicos Especiais I", ch: "32 h", temas: "Tendências em TI, Git e GitHub, pesquisa científica, ética, propriedade intelectual e legislação.", p: ["topicos-especiais-1"] }] },
      { t: "4º período", c: [
        { cod: "INF401", nome: "Projeto de Informática", ch: "127 h", temas: "Problema e requisitos, modelagem UML e BD, implementação full-stack, testes, manual e defesa.", p: ["projeto-integrador"] },
        { cod: "INF402", nome: "Redes de Computadores", ch: "63 h", temas: "OSI e TCP/IP, cabeamento, switches e roteadores, IPv4 e sub-redes, DHCP, DNS e Packet Tracer.", p: ["redes-de-computadores", "projeto-de-redes"] },
        { cod: "INF403", nome: "Segurança da Informação", ch: "63 h", temas: "CIDAN, ameaças e engenharia social, criptografia, firewall e IDS, PSI e LGPD, continuidade e backup.", p: ["seguranca-da-informacao"] },
        { cod: "INF404", nome: "Tópicos Especiais II", ch: "63 h", temas: "Nuvem (IaaS, PaaS, SaaS), Docker, DevOps e CI/CD, IA aplicada, carreira e portfólio.", p: ["topicos-especiais-2"] }] }
    ] },
    { id: "tds-int", nome: "Técnico Integrado em Desenvolvimento de Sistemas", curto: "Integrado em Desenvolvimento de Sistemas", ato: "Resolução CS/IFS nº 216/2023 · 3 anos · núcleo tecnológico", grupos: [
      { t: "1º ano", c: [
        { cod: "TDS101", nome: "Programação 1", ch: "167 h", temas: "Algoritmos, decisão e repetição, vetores e matrizes, funções e strings, introdução à orientação a objetos.", p: ["programacao-1", "programacao-orientada-a-objetos"] },
        { cod: "TDS102", nome: "Construção de Sites 1", ch: "67 h", temas: "História da web, HTML5 semântico, links, mídias, tabelas e formulários, CSS3, web design e publicação.", p: ["construcao-de-sites-1"] },
        { cod: "TDS103", nome: "Introdução à Informática", ch: "100 h", temas: "Numeração, Von Neumann, montagem e manutenção, sistemas operacionais e ferramentas de escritório.", p: ["organizacao-de-computadores", "sistemas-operacionais", "informatica-basica"] }] },
      { t: "2º ano", c: [
        { cod: "TDS201", nome: "Programação 2", ch: "133 h", temas: "Cliente-servidor e back-end, formulários web, orientação a objetos no servidor e persistência em banco.", p: ["programacao-web"] },
        { cod: "TDS202", nome: "Construção de Sites 2", ch: "67 h", temas: "JavaScript ES6+, DOM, Fetch e JSON, bibliotecas e frameworks de front-end.", p: ["construcao-de-sites-2"] },
        { cod: "TDS203", nome: "Banco de Dados e Engenharia de Software", ch: "100 h", temas: "DER, normalização e SQL; ciclo de vida, Scrum, requisitos e UML.", p: ["banco-de-dados", "engenharia-de-software"] },
        { cod: "TDS204", nome: "Projeto Integrador 1", ch: "67 h", temas: "Demanda real e TAP, requisitos, casos de uso e classes, DER e modelo lógico.", p: ["projeto-integrador"] }] },
      { t: "3º ano", c: [
        { cod: "TDS301", nome: "Redes de Computadores e Segurança da Informação", ch: "100 h", temas: "OSI e TCP/IP, IPv4/IPv6 e sub-redes, roteamento; CIDAN, riscos, criptografia e firewalls.", p: ["redes-de-computadores", "seguranca-da-informacao"] },
        { cod: "TDS302", nome: "Tópicos Especiais", ch: "100 h", temas: "Padrões de projeto, mineração de dados, BI e dashboards, tendências e mercado de TI.", p: ["topicos-especiais-tds"] },
        { cod: "TDS303", nome: "Projeto Integrador 2", ch: "133 h", temas: "Git/GitHub, banco e DAO/ORM, front-end acessível, back-end com CRUD, testes e apresentação pública.", p: ["projeto-integrador"] }] }
    ] }
  ],
  complementares: ["fundamentos-de-sistemas-de-informacao", "mapas-mentais", "laboratorio-3d", "recursos-de-aula"]
};
