FSI.modulo({
 "n": 2,
 "unidade": "Unidade 1",
 "nome": "Primeiro servidor com Flask",
 "titulo": "Rotas, métodos, parâmetros e respostas",
 "duracao": "16 h",
 "resumoCurto": "Criar a aplicação Flask, declarar rotas com decorators, receber parâmetros de caminho e de consulta, devolver texto, JSON e status.",
 "analogia": {
  "titulo": "A recepção do prédio",
  "txt": "<p>Numa recepção, cada visitante diz para onde vai: “sala 12”, “sala 30”. O porteiro tem uma <b>lista</b> que liga cada destino a uma pessoa responsável. Em Flask, a lista é o conjunto de <b>rotas</b>: cada caminho de URL é ligado a uma função que sabe responder.</p><p>Se ninguém é responsável pelo destino, o porteiro diz “não existe” (404). Se o visitante usa a porta errada, ouve “por aqui não” (405).</p>"
 },
 "chave": [
  "<code>app = Flask(__name__)</code> cria a aplicação.",
  "<code>@app.route(\"/caminho\")</code> liga uma URL a uma <b>função de visão</b> (view).",
  "Por padrão a rota só aceita <code>GET</code>; para outros métodos: <code>methods=[\"GET\", \"POST\"]</code> ou <code>@app.post(...)</code>.",
  "Parâmetros de caminho: <code>/usuario/&lt;nome&gt;</code>, <code>/item/&lt;int:id&gt;</code> (o Flask converte o tipo).",
  "Parâmetros de consulta: <code>request.args.get(\"q\")</code> lê <code>?q=valor</code>.",
  "A view pode devolver texto, um dicionário (vira JSON) ou uma tupla <code>(corpo, status)</code>.",
  "Rota inexistente → <b>404</b>; método não permitido → <b>405</b>; erro no código → <b>500</b>."
 ],
 "objetivos": [
  "Criar uma aplicação e <b>rotas</b> com decorators.",
  "Usar <b>parâmetros</b> de caminho e de consulta.",
  "Controlar o <b>método</b> e o <b>status</b> da resposta.",
  "Testar rotas com o <b>test client</b>."
 ],
 "licoes": [
  {
   "t": "A menor aplicação possível",
   "txt": "<p>Com Flask, uma aplicação inteira cabe em poucas linhas:</p><pre><code>from flask import Flask\n\napp = Flask(__name__)\n\n@app.route(\"/\")\ndef inicio():\n    return \"Olá, web!\"\n\nif __name__ == \"__main__\":\n    app.run()</code></pre><p>O <b>decorator</b> <code>@app.route</code> registra a função. Quando alguém acessa <code>/</code>, o Flask chama <code>inicio()</code> e envia o que ela devolver. Aqui, para testar sem abrir um servidor, usamos o <b>test client</b>:</p><pre><code>cliente = app.test_client()\nresp = cliente.get(\"/\")\nprint(resp.status_code)                 # 200\nprint(resp.get_data(as_text=True))      # Olá, web!</code></pre>",
   "pense": "o que o Flask responde se você acessar /outra?"
  },
  {
   "t": "Parâmetros na rota e na consulta",
   "txt": "<p>Parte da URL pode variar. Marque com <code>&lt; &gt;</code> e receba como argumento da função:</p><pre><code>@app.route(\"/ola/&lt;nome&gt;\")\ndef ola(nome):\n    return f\"Olá, {nome}!\"\n\n@app.route(\"/item/&lt;int:id&gt;\")\ndef item(id):\n    return f\"Item {id + 1}\"      # id já é int</code></pre><p>Já a <i>query string</i> (<code>?q=flask</code>) vem em <code>request.args</code>:</p><pre><code>from flask import request\n\n@app.route(\"/busca\")\ndef busca():\n    q = request.args.get(\"q\", \"nada\")\n    return f\"Você buscou: {q}\"</code></pre>"
  },
  {
   "t": "Métodos e status",
   "txt": "<p>Por padrão uma rota atende só <code>GET</code>. Para aceitar outros métodos:</p><pre><code>@app.route(\"/contato\", methods=[\"GET\", \"POST\"])\ndef contato():\n    if request.method == \"POST\":\n        return \"Recebido!\", 201\n    return \"Formulário\"\n\n@app.post(\"/pedidos\")      # atalho para POST\ndef criar(): return \"ok\", 201</code></pre><p>A tupla <code>(corpo, status)</code> define o código de status. Uma rota existente chamada com método errado devolve <b>405</b>.</p>"
  },
  {
   "t": "Devolvendo JSON",
   "txt": "<p>Se a view devolve um dicionário, o Flask converte em JSON e ajusta o <code>Content-Type</code>:</p><pre><code>from flask import jsonify\n\n@app.route(\"/api/ola\")\ndef api():\n    return {\"mensagem\": \"oi\", \"ok\": True}\n\n@app.route(\"/api/lista\")\ndef lista():\n    return jsonify([1, 2, 3])</code></pre><p>No cliente, <code>resp.get_json()</code> faz o caminho de volta. Este formato é a base das APIs (módulo 7).</p>"
  }
 ],
 "termos": [
  [
   "Rota",
   "Ligação entre um caminho de URL e uma função."
  ],
  [
   "View",
   "Função que responde a uma rota."
  ],
  [
   "Decorator",
   "Sintaxe @ que modifica/registra uma função."
  ],
  [
   "request",
   "Objeto com os dados da requisição atual."
  ],
  [
   "test client",
   "Cliente simulado para testar a aplicação sem rede."
  ],
  [
   "jsonify",
   "Converte dados Python em resposta JSON."
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
  "intro": "Escreva aplicações Flask de verdade. O servidor roda simulado no navegador; o <code>test_client()</code> envia as requisições e você imprime o resultado.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Flask: suas primeiras rotas",
    "instr": "Escreva o código com <code>from flask import ...</code> como no Flask de verdade, execute (Ctrl+Enter) e veja a saída. Um servidor de mentira roda aqui no navegador e o <code>app.test_client()</code> envia as requisições.",
    "cfg": {
     "id": "pw2",
     "inicial": "from flask import Flask\n\napp = Flask(__name__)\n\n@app.route(\"/\")\ndef inicio():\n    return \"Olá, web!\"\n\ncliente = app.test_client()\nr = cliente.get(\"/\")\nprint(r.status_code, r.get_data(as_text=True))",
     "entrada": "",
     "desafios": [
      {
       "p": "Crie uma rota <code>/ola</code> que devolve <code>Olá, Flask!</code>. Imprima o <b>texto</b> da resposta de <code>GET /ola</code>.",
       "ref": "from flask import Flask\napp = Flask(__name__)\n\n@app.route(\"/ola\")\ndef ola():\n    return \"Olá, Flask!\"\n\nr = app.test_client().get(\"/ola\")\nprint(r.get_data(as_text=True))",
       "testes": [
        ""
       ],
       "exige": [
        "@app\\.route",
        "test_client"
       ],
       "dica": "@app.route(\"/ola\") antes da função.",
       "expl": "O decorator liga a URL à função."
      },
      {
       "p": "Crie <code>/ola/&lt;nome&gt;</code> que devolve <code>Olá, NOME!</code>. Imprima as respostas para <code>/ola/Ana</code> e <code>/ola/Rui</code>.",
       "ref": "from flask import Flask\napp = Flask(__name__)\n\n@app.route(\"/ola/<nome>\")\ndef ola(nome):\n    return f\"Olá, {nome}!\"\n\nc = app.test_client()\nfor n in [\"Ana\", \"Rui\"]:\n    print(c.get(\"/ola/\" + n).get_data(as_text=True))",
       "testes": [
        ""
       ],
       "exige": [
        "<nome>"
       ],
       "dica": "O trecho entre < > chega como argumento.",
       "expl": "Parâmetro de caminho."
      },
      {
       "p": "Crie <code>/dobro/&lt;int:n&gt;</code> que devolve o dobro de n. Leia um inteiro, acesse a rota e imprima o texto da resposta. Depois imprima o <b>status</b> de <code>GET /dobro/abc</code>.",
       "ref": "from flask import Flask\napp = Flask(__name__)\n\n@app.route(\"/dobro/<int:n>\")\ndef dobro(n):\n    return str(n * 2)\n\nc = app.test_client()\nn = int(input())\nprint(c.get(f\"/dobro/{n}\").get_data(as_text=True))\nprint(c.get(\"/dobro/abc\").status_code)",
       "testes": [
        "21",
        "5"
       ],
       "exige": [
        "<int:n>"
       ],
       "dica": "Com int, \"abc\" não casa com a rota → 404.",
       "expl": "O conversor int só aceita dígitos."
      },
      {
       "p": "Crie <code>/busca</code> que lê <code>?q=</code> (padrão <code>vazio</code>) e devolve <code>Busca: Q</code>. Leia uma palavra e imprima a resposta de <code>/busca?q=PALAVRA</code> e a de <code>/busca</code>.",
       "ref": "from flask import Flask, request\napp = Flask(__name__)\n\n@app.route(\"/busca\")\ndef busca():\n    return \"Busca: \" + request.args.get(\"q\", \"vazio\")\n\nc = app.test_client()\np = input()\nprint(c.get(\"/busca?q=\" + p).get_data(as_text=True))\nprint(c.get(\"/busca\").get_data(as_text=True))",
       "testes": [
        "flask",
        "python"
       ],
       "exige": [
        "request\\.args"
       ],
       "dica": "request.args.get(\"q\", \"vazio\").",
       "expl": "O segundo argumento é o valor padrão."
      },
      {
       "p": "Crie <code>/pedidos</code> que aceita só <b>POST</b> e devolve <code>criado</code> com status <b>201</b>. Imprima o status de um POST e de um GET na mesma rota.",
       "ref": "from flask import Flask\napp = Flask(__name__)\n\n@app.route(\"/pedidos\", methods=[\"POST\"])\ndef criar():\n    return \"criado\", 201\n\nc = app.test_client()\nprint(c.post(\"/pedidos\").status_code)\nprint(c.get(\"/pedidos\").status_code)",
       "testes": [
        ""
       ],
       "exige": [
        "POST",
        "201"
       ],
       "dica": "methods=[\"POST\"] e return \"criado\", 201.",
       "expl": "GET numa rota só-POST dá 405."
      }
     ],
     "pre": "web"
    }
   },
   {
    "tipo": "classificar",
    "id": "cl2",
    "titulo": "O que acontece? (status)",
    "cats": [
     "200",
     "404",
     "405",
     "500"
    ],
    "itens": [
     [
      "GET numa rota que existe e funciona",
      0
     ],
     [
      "GET em /rota-que-ninguem-criou",
      1
     ],
     [
      "POST numa rota que só aceita GET",
      2
     ],
     [
      "A view faz 1/0 e quebra",
      3
     ],
     [
      "GET /item/abc quando a rota é /item/<int:id>",
      1
     ],
     [
      "DELETE numa rota que só tem POST",
      2
     ],
     [
      "A view devolve texto normalmente",
      0
     ],
     [
      "A view esqueceu o return (devolve None)",
      3
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Crie sua primeira rota",
    "ev": "pw2:def"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de Flask",
    "ev": "pw2:todos"
   },
   {
    "id": "m3",
    "t": "Preveja os status",
    "ev": "vis:cl2"
   }
  ],
  "guiados": [
   {
    "titulo": "Rastreando rotas",
    "txt": "<p><code>@app.route(\"/soma/&lt;int:a&gt;/&lt;int:b&gt;\")</code> devolve <code>str(a + b)</code>.</p>",
    "passos": [
     {
      "p": "Qual o corpo de GET /soma/2/3?",
      "r": 5,
      "un": "",
      "dica": "2+3.",
      "expl": "5."
     },
     {
      "p": "E de GET /soma/10/20?",
      "r": 30,
      "un": "",
      "dica": "10+20.",
      "expl": "30."
     },
     {
      "p": "Qual o status de GET /soma/2/x? (200, 404, 500)",
      "r": 404,
      "un": "",
      "dica": "x não é int.",
      "expl": "A rota não casa → 404."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que faz <code>Flask(__name__)</code>?",
   "Cria a aplicação web."
  ],
  [
   "Para que serve o decorator <code>@app.route</code>?",
   "Liga uma URL a uma função de visão."
  ],
  [
   "Quais métodos uma rota aceita por padrão?",
   "Só <code>GET</code> (e HEAD/OPTIONS)."
  ],
  [
   "Como aceitar POST numa rota?",
   "<code>methods=[\"POST\"]</code> ou <code>@app.post(\"/caminho\")</code>."
  ],
  [
   "Como ler <code>?q=abc</code>?",
   "<code>request.args.get(\"q\")</code>."
  ],
  [
   "O que é <code>&lt;int:id&gt;</code> na rota?",
   "Parâmetro de caminho convertido para inteiro."
  ],
  [
   "Como devolver status 201?",
   "<code>return corpo, 201</code>."
  ],
  [
   "O que acontece ao devolver um <code>dict</code> na view?",
   "O Flask responde JSON."
  ],
  [
   "O que é o test client?",
   "Objeto que envia requisições à app sem abrir rede (<code>app.test_client()</code>)."
  ],
  [
   "Qual status é devolvido para rota inexistente?",
   "404."
  ],
  [
   "Qual status para método não permitido?",
   "405."
  ],
  [
   "O que causa um 500?",
   "Exceção não tratada na view (ou view sem retorno)."
  ]
 ],
 "vf": [
  [
   "Cada função de view precisa devolver algo.",
   true,
   "Devolver None gera erro 500."
  ],
  [
   "Duas rotas diferentes podem usar a mesma função sem nenhum ajuste.",
   false,
   "Cada rota precisa de endpoint único; use funções diferentes."
  ],
  [
   "<code>request.args</code> guarda os dados da query string.",
   true,
   "É o <code>?chave=valor</code>."
  ],
  [
   "Em <code>/item/&lt;id&gt;</code>, <code>id</code> chega como inteiro automaticamente.",
   false,
   "Sem conversor, chega como texto."
  ],
  [
   "<code>@app.post(\"/x\")</code> equivale a <code>methods=[\"POST\"]</code>.",
   true,
   "É um atalho."
  ],
  [
   "GET numa rota só-POST devolve 404.",
   false,
   "Devolve 405."
  ],
  [
   "<code>return {\"a\": 1}</code> produz uma resposta JSON.",
   true,
   "O Flask converte o dict."
  ],
  [
   "A tupla <code>(\"ok\", 201)</code> define o corpo e o status.",
   true,
   "Corpo primeiro, status depois."
  ],
  [
   "O decorator <code>@app.route</code> executa a view na hora em que o código é lido.",
   false,
   "Só registra; a view roda a cada requisição."
  ],
  [
   "<code>app.run()</code> é necessário para usar o test client.",
   false,
   "O test client chama a app direto."
  ],
  [
   "Parâmetros na URL como <code>?pg=2</code> fazem parte da query string.",
   true,
   "Lidos com request.args."
  ],
  [
   "Uma rota pode aceitar mais de um método.",
   true,
   "methods=[\"GET\", \"POST\"]."
  ]
 ],
 "caderno": [
  [
   "Escreva uma rota <code>/sobre</code> que devolve “Sobre nós”.",
   "@app.route(\"/sobre\") / def sobre(): return \"Sobre nós\""
  ],
  [
   "Escreva <code>/quadrado/&lt;int:n&gt;</code> que devolve n ao quadrado como texto.",
   "def quadrado(n): return str(n * n)"
  ],
  [
   "Qual a saída? <code>@app.route(\"/s/&lt;a&gt;\")</code> devolve <code>a.upper()</code>; acesso: <code>/s/oi</code>.",
   "OI"
  ],
  [
   "Como a view lê <code>?pagina=3</code> com padrão 1, como inteiro?",
   "int(request.args.get(\"pagina\", 1))"
  ],
  [
   "Escreva uma rota que aceita GET e POST e diferencia pelo método.",
   "methods=[\"GET\", \"POST\"]; if request.method == \"POST\": ... else: ..."
  ],
  [
   "Qual status a rota devolve em <code>return \"x\", 418</code>?",
   "418."
  ],
  [
   "Por que <code>/item/abc</code> dá 404 com <code>&lt;int:id&gt;</code>?",
   "O conversor int não casa com letras; a rota não é encontrada."
  ],
  [
   "Escreva uma view que devolve <code>{\"status\": \"ok\"}</code>.",
   "return {\"status\": \"ok\"}  (vira JSON)."
  ],
  [
   "Que erro acontece se a view não tem <code>return</code>?",
   "TypeError e resposta 500."
  ],
  [
   "Escreva um teste com test client que verifica o status de <code>/</code>.",
   "assert app.test_client().get(\"/\").status_code == 200"
  ]
 ],
 "pbl": [
  {
   "titulo": "Mini-site da biblioteca",
   "cenario": "<p>A biblioteca da escola quer um site simples com a página inicial, a lista de livros e a página de cada livro.</p>",
   "passos": [
    [
     "Que rotas você criaria e com quais métodos?",
     "GET /, GET /livros, GET /livros/&lt;int:id&gt;."
    ],
    [
     "O que a rota de um livro deve fazer se o id não existir?",
     "Devolver 404 (abort(404) ou return \"não encontrado\", 404)."
    ],
    [
     "Como testar sem abrir o navegador?",
     "Com app.test_client().get(\"/livros/1\") e conferir status e texto."
    ]
   ]
  },
  {
   "titulo": "Calculadora na URL",
   "cenario": "<p>Um professor quer uma rota que some dois números passados na URL para mostrar em aula como o servidor responde.</p>",
   "passos": [
    [
     "Qual rota atende /soma/2/3 devolvendo 5?",
     "@app.route(\"/soma/&lt;int:a&gt;/&lt;int:b&gt;\") com return str(a + b)."
    ],
    [
     "Como fazer a mesma conta via query string (/soma?a=2&amp;b=3)?",
     "int(request.args.get(\"a\", 0)) + int(request.args.get(\"b\", 0))."
    ],
    [
     "O que acontece se alguém acessar /soma/2/abc?",
     "A rota não casa com int → 404."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Flask(__name__) cria a app; @app.route liga URL e função.",
    "<> captura parâmetros de caminho; request.args lê a query string.",
    "Corpo + status na tupla; dict vira JSON; test client testa tudo sem rede."
   ]
  }
 ],
 "glossario": [
  [
   "Endpoint",
   "Nome interno da rota (padrão: nome da função)."
  ],
  [
   "Conversor",
   "int, float, path… tipo do parâmetro de rota."
  ]
 ]
});
