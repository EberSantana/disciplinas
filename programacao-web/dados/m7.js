FSI.modulo({
 "n": 7,
 "unidade": "Unidade 4",
 "nome": "APIs REST e JSON",
 "titulo": "Projetar recursos, verbos, status e respostas em JSON",
 "duracao": "16 h",
 "resumoCurto": "Princípios REST, recursos e URLs, CRUD por verbos HTTP, JSON de entrada e saída, validação, filtros, paginação, erros padronizados, documentação e CORS.",
 "analogia": {
  "titulo": "O cardápio digital com QR code",
  "txt": "<p>O restaurante coloca um cardápio digital acessível por qualquer aparelho: o app do celular, o tablet do garçom, o site. Todos pedem as mesmas coisas, do mesmo jeito, e recebem respostas num formato combinado. A <b>API</b> é essa interface: ela não se importa com quem pede, só com o <b>contrato</b>.</p><p>O contrato do REST é simples: <b>recursos</b> com nomes claros (<code>/pratos</code>), <b>verbos</b> para as ações (GET, POST…) e <b>status</b> que explicam o resultado, com dados em <b>JSON</b>.</p>"
 },
 "chave": [
  "<b>REST</b> organiza a API em <b>recursos</b> (substantivos no plural): <code>/tarefas</code>, <code>/tarefas/3</code>.",
  "O <b>verbo</b> define a ação: <code>GET</code> lê, <code>POST</code> cria, <code>PUT</code> substitui, <code>PATCH</code> altera parte, <code>DELETE</code> remove.",
  "<b>JSON</b> é o formato padrão: <code>{\"titulo\": \"estudar\", \"feita\": false}</code>. No Flask: <code>request.get_json()</code> e <code>jsonify()</code>.",
  "Status certos: <b>200</b> lido/alterado, <b>201</b> criado, <b>204</b> removido (sem corpo), <b>400</b> entrada inválida, <b>404</b> inexistente, <b>409</b> conflito.",
  "<b>Validação</b> sempre no servidor, com mensagens de erro em JSON: <code>{\"erro\": \"titulo é obrigatório\"}</code>.",
  "<b>Filtros e paginação</b> pela query string: <code>/tarefas?feita=true&amp;pagina=2&amp;limite=10</code>.",
  "APIs usadas por outro site precisam de <b>CORS</b> configurado; e devem ser <b>documentadas</b> (OpenAPI/Swagger)."
 ],
 "objetivos": [
  "Modelar uma API <b>REST</b> com recursos e verbos.",
  "Ler e produzir <b>JSON</b> no Flask.",
  "Aplicar <b>validação</b>, <b>filtros</b> e <b>paginação</b>.",
  "Padronizar <b>erros</b> e status."
 ],
 "licoes": [
  {
   "t": "Recursos e verbos",
   "txt": "<p>Em uma API REST a URL nomeia a <b>coisa</b>; o verbo, a <b>ação</b>:</p><pre><code>GET    /tarefas        → lista as tarefas\nPOST   /tarefas        → cria uma tarefa\nGET    /tarefas/3      → mostra a tarefa 3\nPUT    /tarefas/3      → substitui a tarefa 3\nPATCH  /tarefas/3      → altera parte da tarefa 3\nDELETE /tarefas/3      → remove a tarefa 3</code></pre><p>Evite verbos na URL (<code>/criarTarefa</code>, <code>/apagar?id=3</code>): o verbo HTTP já diz isso.</p>",
   "pense": "por que /tarefas/3 funciona para GET, PUT e DELETE com a mesma URL?"
  },
  {
   "t": "JSON de ida e volta",
   "txt": "<p>O cliente envia JSON no corpo; o servidor lê e responde JSON:</p><pre><code>from flask import Flask, request, jsonify\n\napp = Flask(__name__)\nTAREFAS = []\n\n@app.post(\"/tarefas\")\ndef criar():\n    d = request.get_json(silent=True) or {}\n    if not d.get(\"titulo\"):\n        return {\"erro\": \"titulo é obrigatório\"}, 400\n    t = {\"id\": len(TAREFAS) + 1, \"titulo\": d[\"titulo\"], \"feita\": False}\n    TAREFAS.append(t)\n    return t, 201\n\n@app.get(\"/tarefas\")\ndef listar():\n    return jsonify(TAREFAS)</code></pre><p>O Flask converte <code>dict</code> e <code>list</code> em JSON. No cliente de teste: <code>cliente.post(\"/tarefas\", json={...})</code> e <code>resp.get_json()</code>.</p>"
  },
  {
   "t": "Atualizar, remover e tratar erros",
   "txt": "<p>Ao alterar ou remover, trate o caso “não existe” e use o status certo:</p><pre><code>@app.patch(\"/tarefas/&lt;int:id&gt;\")\ndef alterar(id):\n    t = next((x for x in TAREFAS if x[\"id\"] == id), None)\n    if t is None:\n        return {\"erro\": \"tarefa não encontrada\"}, 404\n    t.update(request.get_json() or {})\n    return t                      # 200\n\n@app.delete(\"/tarefas/&lt;int:id&gt;\")\ndef remover(id):\n    ...                           # sucesso: return \"\", 204</code></pre><p>Padronize o formato de erro em toda a API: o cliente (app, site) precisa saber sempre onde ler a mensagem.</p>"
  },
  {
   "t": "Filtros, paginação, CORS e documentação",
   "txt": "<p>Listas grandes não vêm inteiras. Use a query string:</p><pre><code>@app.get(\"/tarefas\")\ndef listar():\n    itens = TAREFAS\n    if request.args.get(\"feita\") == \"true\":\n        itens = [t for t in itens if t[\"feita\"]]\n    pagina = int(request.args.get(\"pagina\", 1))\n    limite = int(request.args.get(\"limite\", 10))\n    ini = (pagina - 1) * limite\n    return {\"total\": len(itens), \"pagina\": pagina, \"itens\": itens[ini:ini + limite]}</code></pre><p>Se o <i>front-end</i> está em outro endereço, o navegador bloqueia a chamada a menos que a API envie cabeçalhos <b>CORS</b> (<code>Access-Control-Allow-Origin</code>). E toda API precisa de <b>documentação</b> (OpenAPI/Swagger): sem ela ninguém sabe usar o contrato.</p>"
  }
 ],
 "termos": [
  [
   "API",
   "Interface de comunicação entre sistemas."
  ],
  [
   "REST",
   "Estilo de projeto de APIs com recursos e verbos HTTP."
  ],
  [
   "Recurso",
   "A “coisa” que a URL identifica."
  ],
  [
   "JSON",
   "Formato de dados em texto, chave-valor."
  ],
  [
   "Paginação",
   "Dividir listas grandes em partes."
  ],
  [
   "CORS",
   "Regra do navegador para chamadas entre origens diferentes."
  ],
  [
   "OpenAPI",
   "Padrão para descrever APIs."
  ]
 ],
 "ler": [
  [
   "Flask (documentação oficial)",
   "https://flask.palletsprojects.com/"
  ],
  [
   "MDN: Visão geral do HTTP",
   "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview"
  ],
  [
   "OWASP Top 10",
   "https://owasp.org/www-project-top-ten/"
  ]
 ],
 "lab": {
  "intro": "Construa uma API REST de tarefas: criar, listar, filtrar, alterar e remover, sempre em JSON.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Flask: API de tarefas",
    "instr": "Escreva o código com <code>from flask import ...</code> como no Flask de verdade, execute (Ctrl+Enter) e veja a saída. Um servidor de mentira roda aqui no navegador e o <code>app.test_client()</code> envia as requisições.",
    "cfg": {
     "id": "pw7",
     "inicial": "from flask import Flask, request\n\napp = Flask(__name__)\nTAREFAS = []\n\n@app.get(\"/tarefas\")\ndef listar():\n    return {\"tarefas\": TAREFAS}\n\nc = app.test_client()\nprint(c.get(\"/tarefas\").get_json())",
     "entrada": "",
     "desafios": [
      {
       "p": "Crie <code>POST /tarefas</code> que recebe <code>{\"titulo\": ...}</code> e devolve a tarefa <code>{\"id\", \"titulo\", \"feita\": false}</code> com <b>201</b>. Leia um título, envie o POST e imprima status e JSON.",
       "ref": "from flask import Flask, request\napp = Flask(__name__)\nTAREFAS = []\n\n@app.post(\"/tarefas\")\ndef criar():\n    d = request.get_json()\n    t = {\"id\": len(TAREFAS) + 1, \"titulo\": d[\"titulo\"], \"feita\": False}\n    TAREFAS.append(t)\n    return t, 201\n\nr = app.test_client().post(\"/tarefas\", json={\"titulo\": input()})\nprint(r.status_code, r.get_json())",
       "testes": [
        "estudar",
        "treinar"
       ],
       "exige": [
        "201",
        "get_json"
       ],
       "dica": "return t, 201.",
       "expl": "201 Created para recurso novo."
      },
      {
       "p": "Acrescente validação: sem <code>titulo</code> (ou vazio) → <code>{\"erro\": \"titulo é obrigatório\"}</code> com <b>400</b>. Leia um título (pode ser vazio) e imprima status e JSON do POST.",
       "ref": "from flask import Flask, request\napp = Flask(__name__)\nTAREFAS = []\n\n@app.post(\"/tarefas\")\ndef criar():\n    d = request.get_json(silent=True) or {}\n    if not str(d.get(\"titulo\", \"\")).strip():\n        return {\"erro\": \"titulo é obrigatório\"}, 400\n    t = {\"id\": len(TAREFAS) + 1, \"titulo\": d[\"titulo\"], \"feita\": False}\n    TAREFAS.append(t)\n    return t, 201\n\nr = app.test_client().post(\"/tarefas\", json={\"titulo\": input()})\nprint(r.status_code, r.get_json())",
       "testes": [
        "estudar",
        "",
        "   "
       ],
       "exige": [
        "400"
       ],
       "dica": "Valide antes de criar.",
       "expl": "Erro do cliente → 400 com mensagem."
      },
      {
       "p": "Com a lista <code>[{id:1, titulo:a, feita:True}, {id:2, titulo:b, feita:False}, {id:3, titulo:c, feita:True}]</code>, faça <code>GET /tarefas</code> com filtro <code>?feita=true</code> (só as concluídas). Leia <code>true</code> ou <code>false</code> e imprima os <b>títulos</b> devolvidos.",
       "ref": "from flask import Flask, request\napp = Flask(__name__)\nTAREFAS = [{\"id\": 1, \"titulo\": \"a\", \"feita\": True}, {\"id\": 2, \"titulo\": \"b\", \"feita\": False}, {\"id\": 3, \"titulo\": \"c\", \"feita\": True}]\n\n@app.get(\"/tarefas\")\ndef listar():\n    f = request.args.get(\"feita\")\n    itens = TAREFAS\n    if f in (\"true\", \"false\"):\n        itens = [t for t in itens if t[\"feita\"] == (f == \"true\")]\n    return {\"itens\": itens}\n\nr = app.test_client().get(\"/tarefas?feita=\" + input())\nprint([t[\"titulo\"] for t in r.get_json()[\"itens\"]])",
       "testes": [
        "true",
        "false"
       ],
       "exige": [
        "request\\.args"
       ],
       "dica": "Compare request.args.get(\"feita\") com \"true\".",
       "expl": "Filtro opcional pela query string."
      },
      {
       "p": "Implemente <b>PATCH</b> e <b>DELETE</b> em <code>/tarefas/&lt;int:id&gt;</code> sobre <code>[{id:1, titulo:a, feita:False}]</code>: PATCH atualiza com o JSON (404 se não existir); DELETE devolve <code>\"\"</code> com <b>204</b> (404 se não existir). Leia um id e imprima os status de PATCH (<code>{\"feita\": true}</code>) e depois de DELETE.",
       "ref": "from flask import Flask, request\napp = Flask(__name__)\nTAREFAS = [{\"id\": 1, \"titulo\": \"a\", \"feita\": False}]\n\ndef achar(id):\n    return next((t for t in TAREFAS if t[\"id\"] == id), None)\n\n@app.patch(\"/tarefas/<int:id>\")\ndef alterar(id):\n    t = achar(id)\n    if t is None:\n        return {\"erro\": \"não encontrada\"}, 404\n    t.update(request.get_json() or {})\n    return t\n\n@app.delete(\"/tarefas/<int:id>\")\ndef remover(id):\n    t = achar(id)\n    if t is None:\n        return {\"erro\": \"não encontrada\"}, 404\n    TAREFAS.remove(t)\n    return \"\", 204\n\nc = app.test_client()\nn = input()\nprint(c.patch(\"/tarefas/\" + n, json={\"feita\": True}).status_code)\nprint(c.delete(\"/tarefas/\" + n).status_code)",
       "testes": [
        "1",
        "7"
       ],
       "exige": [
        "204",
        "404"
       ],
       "dica": "Use um helper achar(id); remova e devolva \"\", 204.",
       "expl": "204: sucesso sem corpo."
      },
      {
       "p": "Faça <b>paginação</b>: <code>GET /numeros?pagina=P&amp;limite=L</code> devolve <code>{\"total\": N, \"itens\": [...]}</code> da lista <code>1..10</code> (inteiros). Leia <code>P L</code> numa linha (ex.: <code>2 3</code>) e imprima o JSON.",
       "ref": "from flask import Flask, request\napp = Flask(__name__)\nNUMS = list(range(1, 11))\n\n@app.get(\"/numeros\")\ndef lista():\n    p = int(request.args.get(\"pagina\", 1))\n    l = int(request.args.get(\"limite\", 5))\n    ini = (p - 1) * l\n    return {\"total\": len(NUMS), \"itens\": NUMS[ini:ini + l]}\n\np, l = input().split()\nprint(app.test_client().get(f\"/numeros?pagina={p}&limite={l}\").get_json())",
       "testes": [
        "1 3",
        "2 3",
        "4 3",
        "1 10"
       ],
       "exige": [
        "request\\.args"
       ],
       "dica": "inicio = (pagina - 1) * limite; fatie a lista.",
       "expl": "Fatiamento = paginação."
      }
     ],
     "pre": "web"
    }
   },
   {
    "tipo": "classificar",
    "id": "cl7",
    "titulo": "URL boa ou ruim em REST?",
    "cats": [
     "Boa (REST)",
     "Ruim (evite)"
    ],
    "itens": [
     [
      "GET /usuarios/5",
      0
     ],
     [
      "GET /buscarUsuarioPorId?id=5",
      1
     ],
     [
      "POST /usuarios",
      0
     ],
     [
      "POST /criarNovoUsuario",
      1
     ],
     [
      "DELETE /usuarios/5",
      0
     ],
     [
      "GET /apagarUsuario/5",
      1
     ],
     [
      "GET /usuarios/5/pedidos",
      0
     ],
     [
      "POST /pedido/atualizar",
      1
     ]
    ]
   },
   {
    "tipo": "classificar",
    "id": "cl7b",
    "titulo": "Qual status devolver?",
    "cats": [
     "200",
     "201",
     "204",
     "400",
     "404"
    ],
    "itens": [
     [
      "Listar tarefas com sucesso",
      0
     ],
     [
      "Criar tarefa com sucesso",
      1
     ],
     [
      "Remover tarefa com sucesso (sem corpo)",
      2
     ],
     [
      "JSON sem o campo obrigatório",
      3
     ],
     [
      "GET /tarefas/999 que não existe",
      4
     ],
     [
      "Alterar tarefa existente com sucesso",
      0
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Crie sua primeira rota de API",
    "ev": "pw7:def"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de API",
    "ev": "pw7:todos"
   },
   {
    "id": "m3",
    "t": "Julgue URLs REST",
    "ev": "vis:cl7"
   },
   {
    "id": "m4",
    "t": "Escolha os status",
    "ev": "vis:cl7b"
   }
  ],
  "guiados": [
   {
    "titulo": "Lendo uma API",
    "txt": "<p><code>GET /tarefas?feita=true&amp;pagina=2&amp;limite=5</code></p>",
    "passos": [
     {
      "p": "Qual é o recurso?",
      "r": "tarefas",
      "un": "",
      "dica": "O substantivo no caminho.",
      "expl": "A coleção de tarefas."
     },
     {
      "p": "Quantos itens por página?",
      "r": 5,
      "un": "",
      "dica": "Parâmetro limite.",
      "expl": "limite=5."
     },
     {
      "p": "Quais itens aparecem (da ordem total)?",
      "r": "do 6º ao 10º",
      "un": "",
      "dica": "Página 2 com 5 por página.",
      "expl": "(2−1)×5 = 5 pulados; mostra 6 a 10."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma API REST?",
   "API organizada em recursos acessados por verbos HTTP, em geral com JSON."
  ],
  [
   "O que é um recurso?",
   "A “coisa” identificada pela URL, como <code>/tarefas/3</code>."
  ],
  [
   "Que verbo cria um recurso?",
   "POST."
  ],
  [
   "Qual a diferença entre PUT e PATCH?",
   "PUT substitui o recurso inteiro; PATCH altera só parte dele."
  ],
  [
   "Que status usar após criar?",
   "201 Created."
  ],
  [
   "E após remover sem corpo?",
   "204 No Content."
  ],
  [
   "Como ler o JSON da requisição no Flask?",
   "<code>request.get_json()</code>."
  ],
  [
   "Como devolver JSON no Flask?",
   "<code>return dict</code> ou <code>jsonify(...)</code>."
  ],
  [
   "Por que paginar listas?",
   "Para não enviar milhares de itens de uma vez."
  ],
  [
   "Como pedir a página 2 com 10 itens?",
   "<code>?pagina=2&amp;limite=10</code>."
  ],
  [
   "O que é CORS?",
   "Regra do navegador que controla chamadas de uma origem para outra."
  ],
  [
   "Para que serve OpenAPI/Swagger?",
   "Documentar a API em formato padrão, gerando telas e clientes."
  ]
 ],
 "vf": [
  [
   "URLs REST usam substantivos, não verbos.",
   true,
   "O verbo está no método HTTP."
  ],
  [
   "<code>GET /apagar/3</code> é um bom projeto de API.",
   false,
   "Apagar deve ser DELETE."
  ],
  [
   "DELETE de sucesso costuma devolver 204.",
   true,
   "Sem corpo."
  ],
  [
   "Uma API REST só pode devolver JSON.",
   false,
   "É o mais comum, mas há outros formatos."
  ],
  [
   "Validar no servidor é desnecessário se o app já valida.",
   false,
   "Qualquer cliente pode enviar dados errados."
  ],
  [
   "Erros devem seguir o mesmo formato em toda a API.",
   true,
   "Facilita o cliente."
  ],
  [
   "Um GET deve alterar dados no servidor.",
   false,
   "GET é para leitura."
  ],
  [
   "<code>request.get_json(silent=True)</code> evita exceção quando o corpo não é JSON.",
   true,
   "Devolve None."
  ],
  [
   "Paginação evita respostas gigantes.",
   true,
   "limite/pagina."
  ],
  [
   "PATCH e PUT são sempre idênticos.",
   false,
   "PATCH altera parte; PUT substitui."
  ],
  [
   "Uma API sem documentação ainda é fácil de integrar.",
   false,
   "Sem contrato, ninguém sabe usar."
  ],
  [
   "Status 404 é adequado para um id que não existe.",
   true,
   "Recurso não encontrado."
  ]
 ],
 "caderno": [
  [
   "Projete as rotas REST para um recurso “livros”.",
   "GET /livros, POST /livros, GET /livros/&lt;id&gt;, PUT/PATCH /livros/&lt;id&gt;, DELETE /livros/&lt;id&gt;."
  ],
  [
   "Reescreva em REST: <code>GET /listarAlunos</code> e <code>POST /excluirAluno?id=4</code>.",
   "GET /alunos e DELETE /alunos/4."
  ],
  [
   "Escreva o JSON de resposta para criar um aluno (id, nome).",
   "{\"id\": 1, \"nome\": \"Ana\"} com status 201."
  ],
  [
   "Que status usar: (a) lista ok, (b) criado, (c) sem corpo, (d) entrada inválida, (e) inexistente?",
   "(a) 200; (b) 201; (c) 204; (d) 400; (e) 404."
  ],
  [
   "Escreva a validação de <code>nota</code> (0 a 10) numa rota POST.",
   "n = d.get(\"nota\"); if not isinstance(n, (int, float)) or not 0 &lt;= n &lt;= 10: return {\"erro\": \"nota inválida\"}, 400"
  ],
  [
   "Escreva o cálculo de paginação (pagina, limite).",
   "ini = (pagina - 1) * limite; itens[ini:ini + limite]"
  ],
  [
   "Qual a diferença entre PUT e PATCH num exemplo?",
   "PUT /alunos/1 com todos os campos; PATCH /alunos/1 só com {\"turma\": \"2DS\"}."
  ],
  [
   "Explique CORS em 2 frases.",
   "O navegador bloqueia chamadas entre origens diferentes, a menos que o servidor autorize com cabeçalhos CORS."
  ],
  [
   "Como testar uma API sem navegador?",
   "Com o test client do Flask, com curl/Postman/Insomnia ou com testes automatizados."
  ],
  [
   "Dê dois itens que a documentação de um endpoint precisa ter.",
   "Método e URL, corpo esperado, exemplos de resposta e códigos de erro."
  ]
 ],
 "pbl": [
  {
   "titulo": "API do app da biblioteca",
   "cenario": "<p>O app de celular da biblioteca vai consultar livros e fazer reservas pela internet. Você projeta a API.</p>",
   "passos": [
    [
     "Quais recursos e verbos a API terá?",
     "/livros (GET), /livros/&lt;id&gt; (GET), /reservas (POST), /reservas/&lt;id&gt; (DELETE para cancelar)."
    ],
    [
     "Como evitar reserva de livro indisponível?",
     "Validar no servidor e devolver 409 Conflict com uma mensagem clara."
    ],
    [
     "Como o app pagina a lista de livros?",
     "?pagina=N&amp;limite=20, devolvendo também o total."
    ]
   ]
  },
  {
   "titulo": "Integração quebrada",
   "cenario": "<p>Depois de uma atualização, o app começou a falhar: a API passou a devolver “mensagem” em vez de “erro” nas respostas de falha e mudou o status de 201 para 200.</p>",
   "passos": [
    [
     "Que princípio foi violado?",
     "O contrato da API: formato de erro e status são parte dele."
    ],
    [
     "Como evitar quebrar clientes ao evoluir a API?",
     "Versionar (/v2/...) e manter compatibilidade, avisando as mudanças."
    ],
    [
     "Que testes automatizados detectariam isso?",
     "Testes de contrato com test client conferindo status e chaves do JSON."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "REST: recursos no plural + verbos HTTP + status corretos + JSON.",
    "Valide a entrada, padronize os erros, pagine e filtre pela query string.",
    "Documente e teste o contrato da API."
   ]
  }
 ],
 "glossario": [
  [
   "Contrato da API",
   "Combinação de rotas, formatos e status que o cliente espera."
  ],
  [
   "Idempotente",
   "Repetir a operação tem o mesmo efeito (GET, PUT, DELETE)."
  ]
 ]
});
