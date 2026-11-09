FSI.modulo({
 "n": 4,
 "unidade": "Unidade 2",
 "nome": "Organização do projeto e MVC",
 "titulo": "Camadas, blueprints, erros e ganchos de requisição",
 "duracao": "16 h",
 "resumoCurto": "Separar modelo, visão e controlador; organizar rotas em blueprints; url_for; tratar erros com errorhandler; before_request e configuração.",
 "analogia": {
  "titulo": "A cozinha organizada",
  "txt": "<p>Numa cozinha profissional ninguém cozinha tudo numa bancada só: há a estação de frios, a de grelhados, a de sobremesas, cada uma com sua função e seu chefe. O pedido percorre as estações e o prato final sai padronizado.</p><p>No back-end é igual: <b>modelos</b> cuidam dos dados, <b>controladores</b> das rotas, <b>visões</b> da apresentação, e <b>blueprints</b> dividem a aplicação em “estações” por assunto (usuários, produtos, pedidos).</p>"
 },
 "chave": [
  "<b>MVC:</b> o <b>Model</b> guarda dados e regras, a <b>View</b> mostra, o <b>Controller</b> coordena. Na prática, o controller é a função da rota.",
  "<b>Blueprint</b> agrupa rotas de um assunto: <code>bp = Blueprint(\"produtos\", __name__, url_prefix=\"/produtos\")</code>.",
  "<code>app.register_blueprint(bp)</code> conecta o grupo à aplicação.",
  "<code>url_for(\"funcao\")</code> monta URLs a partir do <b>nome da view</b>, sem escrever o caminho à mão.",
  "<code>@app.errorhandler(404)</code> define como responder a cada erro (páginas e JSON amigáveis).",
  "<code>@app.before_request</code> roda antes de toda rota: bom para registro de log, autenticação e limites.",
  "<b>Configuração</b> fica em <code>app.config</code> (e em variáveis de ambiente), nunca espalhada pelo código."
 ],
 "objetivos": [
  "Separar o código em <b>modelo, visão e controlador</b>.",
  "Organizar rotas em <b>blueprints</b>.",
  "Usar <code>url_for</code>, <b>errorhandler</b> e <b>before_request</b>.",
  "Isolar a <b>configuração</b> do código."
 ],
 "licoes": [
  {
   "t": "MVC em um exemplo pequeno",
   "txt": "<p>Veja as três camadas num mini-sistema de produtos:</p><pre><code># Model: dados e regras\nPRODUTOS = {1: {\"nome\": \"Caneta\", \"preco\": 3.5}}\n\ndef buscar(id):\n    return PRODUTOS.get(id)\n\n# Controller: a rota\n@app.route(\"/produtos/&lt;int:id&gt;\")\ndef ver(id):\n    p = buscar(id)\n    if p is None:\n        abort(404)\n    # View: o template\n    return render_template_string(\"&lt;h1&gt;{{ p.nome }}&lt;/h1&gt;\", p=p)</code></pre><p>Se amanhã os dados vierem de um banco, só o <b>model</b> muda. A rota e o template continuam iguais. Esse é o benefício da separação.</p>"
  },
  {
   "t": "Blueprints e url_for",
   "txt": "<p>Quando o sistema cresce, um arquivo de rotas fica enorme. O blueprint divide por assunto:</p><pre><code>from flask import Blueprint\n\nprodutos = Blueprint(\"produtos\", __name__, url_prefix=\"/produtos\")\n\n@produtos.route(\"/\")\ndef listar(): return \"lista\"\n\n@produtos.route(\"/&lt;int:id&gt;\")\ndef ver(id): return f\"produto {id}\"\n\napp.register_blueprint(produtos)</code></pre><p>Os endereços ficam <code>/produtos/</code> e <code>/produtos/3</code>. Para gerar links sem escrever o caminho, use <code>url_for(\"produtos.ver\", id=3)</code> → <code>/produtos/3</code>. Se a rota mudar, os links acompanham.</p>"
  },
  {
   "t": "Tratamento de erros",
   "txt": "<p>Erros acontecem: o usuário digita a URL errada, o banco cai. Em vez da página feia padrão, trate-os:</p><pre><code>@app.errorhandler(404)\ndef nao_achou(e):\n    return {\"erro\": \"recurso não encontrado\"}, 404\n\n@app.errorhandler(500)\ndef falhou(e):\n    return {\"erro\": \"algo deu errado\"}, 500\n\n@app.route(\"/item/&lt;int:id&gt;\")\ndef item(id):\n    if id &gt; 10:\n        abort(404)      # dispara o handler\n    return str(id)</code></pre><p><code>abort(codigo)</code> interrompe a view e entrega o erro ao handler certo. Nunca exponha o rastro (traceback) ao usuário: ele ajuda atacantes.</p>"
  },
  {
   "t": "Ganchos e configuração",
   "txt": "<p><code>before_request</code> executa antes de cada rota; se devolver algo, a rota nem roda:</p><pre><code>@app.before_request\ndef so_com_chave():\n    if request.headers.get(\"X-Chave\") != app.config[\"CHAVE\"]:\n        return {\"erro\": \"sem chave\"}, 401\n\napp.config[\"CHAVE\"] = \"segredo123\"</code></pre><p>Já <code>after_request</code> altera a resposta antes de enviar (por exemplo, para adicionar um cabeçalho). Valores de configuração (chaves, URL do banco, modo debug) vivem em <code>app.config</code> e, em produção, vêm de <b>variáveis de ambiente</b>, nunca do código.</p>"
  }
 ],
 "termos": [
  [
   "Blueprint",
   "Grupo de rotas reaproveitável de um assunto."
  ],
  [
   "url_for",
   "Gera a URL a partir do nome da view."
  ],
  [
   "errorhandler",
   "Função que responde a um tipo de erro."
  ],
  [
   "abort",
   "Interrompe a view devolvendo um erro HTTP."
  ],
  [
   "before_request",
   "Gancho executado antes de toda rota."
  ],
  [
   "Configuração",
   "Valores que mudam por ambiente (chaves, banco)."
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
  "intro": "Organize a aplicação: blueprints, <code>url_for</code>, erros e ganchos. Tudo roda no mini-Flask do navegador.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Flask: organização e erros",
    "instr": "Escreva o código com <code>from flask import ...</code> como no Flask de verdade, execute (Ctrl+Enter) e veja a saída. Um servidor de mentira roda aqui no navegador e o <code>app.test_client()</code> envia as requisições.",
    "cfg": {
     "id": "pw4",
     "inicial": "from flask import Flask, Blueprint\n\napp = Flask(__name__)\nbp = Blueprint(\"exemplo\", __name__, url_prefix=\"/ex\")\n\n@bp.route(\"/ola\")\ndef ola():\n    return \"oi\"\n\napp.register_blueprint(bp)\nprint(app.test_client().get(\"/ex/ola\").get_data(as_text=True))",
     "entrada": "",
     "desafios": [
      {
       "p": "Crie um blueprint <code>site</code> com prefixo <code>/site</code> e a rota <code>/contato</code> (texto <code>contato</code>). Registre-o e imprima o texto de <code>GET /site/contato</code> e o status de <code>GET /contato</code>.",
       "ref": "from flask import Flask, Blueprint\napp = Flask(__name__)\nsite = Blueprint(\"site\", __name__, url_prefix=\"/site\")\n\n@site.route(\"/contato\")\ndef contato():\n    return \"contato\"\n\napp.register_blueprint(site)\nc = app.test_client()\nprint(c.get(\"/site/contato\").get_data(as_text=True))\nprint(c.get(\"/contato\").status_code)",
       "testes": [
        ""
       ],
       "exige": [
        "Blueprint",
        "register_blueprint"
       ],
       "dica": "O url_prefix vem antes do caminho da rota.",
       "expl": "O prefixo é somado ao caminho."
      },
      {
       "p": "Crie a rota <code>/produtos/&lt;int:id&gt;</code> (nome da view <code>ver</code>) e, em outra rota <code>/link</code>, devolva o resultado de <code>url_for(\"ver\", id=7)</code>. Imprima o corpo de <code>GET /link</code>.",
       "ref": "from flask import Flask, url_for\napp = Flask(__name__)\n\n@app.route(\"/produtos/<int:id>\")\ndef ver(id):\n    return str(id)\n\n@app.route(\"/link\")\ndef link():\n    return url_for(\"ver\", id=7)\n\nprint(app.test_client().get(\"/link\").get_data(as_text=True))",
       "testes": [
        ""
       ],
       "exige": [
        "url_for"
       ],
       "dica": "url_for recebe o nome da função, não o caminho.",
       "expl": "A URL é montada a partir do nome da view."
      },
      {
       "p": "Defina um <code>errorhandler(404)</code> que devolve o JSON <code>{\"erro\": \"não achei\"}</code> com status 404. Imprima o corpo JSON (<code>get_json()</code>) de <code>GET /nada</code>.",
       "ref": "from flask import Flask\napp = Flask(__name__)\n\n@app.errorhandler(404)\ndef nao(e):\n    return {\"erro\": \"não achei\"}, 404\n\nr = app.test_client().get(\"/nada\")\nprint(r.status_code, r.get_json())",
       "testes": [
        ""
       ],
       "exige": [
        "errorhandler\\(404\\)"
       ],
       "dica": "@app.errorhandler(404) e devolva um dict e 404.",
       "expl": "O handler transforma o erro padrão em JSON."
      },
      {
       "p": "Crie <code>/produto/&lt;int:id&gt;</code> que consulta o dicionário <code>{1: \"caneta\", 2: \"lápis\"}</code>; se o id não existir, use <code>abort(404)</code>. Leia um id e imprima o status e o corpo.",
       "ref": "from flask import Flask, abort\napp = Flask(__name__)\nPROD = {1: \"caneta\", 2: \"lápis\"}\n\n@app.route(\"/produto/<int:id>\")\ndef ver(id):\n    if id not in PROD:\n        abort(404)\n    return PROD[id]\n\nn = input()\nr = app.test_client().get(\"/produto/\" + n)\nprint(r.status_code, \"|\", r.get_data(as_text=True)[:20])",
       "testes": [
        "1",
        "2",
        "9"
       ],
       "exige": [
        "abort"
       ],
       "dica": "if id not in PROD: abort(404).",
       "expl": "abort interrompe a view na hora."
      },
      {
       "p": "Use <code>before_request</code> para exigir o cabeçalho <code>X-Chave: abc</code>. Sem ele devolva <code>proibido</code> com status 401. Imprima os status de uma chamada <b>sem</b> cabeçalho e outra <b>com</b>.",
       "ref": "from flask import Flask, request\napp = Flask(__name__)\n\n@app.before_request\ndef guarda():\n    if request.headers.get(\"X-Chave\") != \"abc\":\n        return \"proibido\", 401\n\n@app.route(\"/\")\ndef inicio():\n    return \"ok\"\n\nc = app.test_client()\nprint(c.get(\"/\").status_code)\nprint(c.get(\"/\", headers={\"X-Chave\": \"abc\"}).status_code)",
       "testes": [
        ""
       ],
       "exige": [
        "before_request"
       ],
       "dica": "Se o gancho devolve algo, a rota não executa.",
       "expl": "O gancho barra a requisição antes da view."
      }
     ],
     "pre": "web"
    }
   },
   {
    "tipo": "classificar",
    "id": "cl4",
    "titulo": "Em que camada do MVC fica?",
    "cats": [
     "Model",
     "View",
     "Controller"
    ],
    "itens": [
     [
      "Buscar os produtos da lista ou do banco",
      0
     ],
     [
      "O template HTML da página de produto",
      1
     ],
     [
      "A função da rota que chama o model e escolhe o template",
      2
     ],
     [
      "A regra “estoque não pode ser negativo”",
      0
     ],
     [
      "Formatar o preço como R$ 3,50 na tela",
      1
     ],
     [
      "Decidir devolver 404 quando o produto não existe",
      2
     ],
     [
      "Salvar um novo usuário",
      0
     ],
     [
      "O JSON que a API devolve",
      1
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Organize com blueprint",
    "ev": "pw4:def"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de organização",
    "ev": "pw4:todos"
   },
   {
    "id": "m3",
    "t": "Distribua as camadas do MVC",
    "ev": "vis:cl4"
   }
  ],
  "guiados": [
   {
    "titulo": "Prevendo URLs",
    "txt": "<p>Blueprint <code>pedidos</code> com <code>url_prefix=\"/pedidos\"</code> e rota <code>/&lt;int:id&gt;</code> chamada <code>ver</code>.</p>",
    "passos": [
     {
      "p": "Qual a URL final do pedido 5?",
      "r": "/pedidos/5",
      "un": "",
      "dica": "Prefixo + rota.",
      "expl": "/pedidos + /5."
     },
     {
      "p": "Qual o resultado de url_for(\"pedidos.ver\", id=9)?",
      "r": "/pedidos/9",
      "un": "",
      "dica": "Nome do blueprint + view.",
      "expl": "Gera a URL a partir do endpoint."
     },
     {
      "p": "O que /5 sozinho devolve? (200, 404)",
      "r": 404,
      "un": "",
      "dica": "O prefixo é obrigatório.",
      "expl": "A rota só existe sob /pedidos."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que cada letra do MVC representa?",
   "Model (dados/regras), View (apresentação), Controller (coordena)."
  ],
  [
   "Em Flask, quem faz o papel do controller?",
   "A função de view ligada à rota."
  ],
  [
   "Para que serve um blueprint?",
   "Agrupar rotas de um assunto e registrá-las na app."
  ],
  [
   "O que faz <code>register_blueprint</code>?",
   "Conecta o blueprint à aplicação (com seu prefixo)."
  ],
  [
   "O que é <code>url_for</code>?",
   "Função que gera a URL a partir do nome da view."
  ],
  [
   "Por que usar <code>url_for</code> em vez do caminho fixo?",
   "Se a rota mudar, os links continuam certos."
  ],
  [
   "Como tratar a página 404?",
   "<code>@app.errorhandler(404)</code>."
  ],
  [
   "O que faz <code>abort(404)</code>?",
   "Interrompe a view e devolve o erro 404."
  ],
  [
   "Quando roda <code>before_request</code>?",
   "Antes de toda requisição, antes da view."
  ],
  [
   "O que faz <code>after_request</code>?",
   "Altera a resposta antes de ela sair."
  ],
  [
   "Onde ficam as configurações da app?",
   "Em <code>app.config</code> (de preferência vindas de variáveis de ambiente)."
  ],
  [
   "Por que não mostrar o traceback ao usuário?",
   "Ele revela detalhes internos úteis para ataques."
  ]
 ],
 "vf": [
  [
   "No MVC, o template HTML pertence à camada View.",
   true,
   "É a apresentação."
  ],
  [
   "Todas as rotas de um sistema grande devem ficar no mesmo arquivo.",
   false,
   "Blueprints ajudam a dividir."
  ],
  [
   "O <code>url_prefix</code> do blueprint é somado ao caminho de cada rota.",
   true,
   "/produtos + /3."
  ],
  [
   "<code>url_for(\"ver\", id=3)</code> precisa do caminho da rota como argumento.",
   false,
   "Recebe o nome da view."
  ],
  [
   "<code>abort(404)</code> continua a executar o código depois dele.",
   false,
   "Interrompe a função."
  ],
  [
   "Um <code>errorhandler</code> pode devolver JSON.",
   true,
   "Útil em APIs."
  ],
  [
   "<code>before_request</code> que devolve uma resposta impede a view de rodar.",
   true,
   "Curto-circuita."
  ],
  [
   "Chaves secretas devem ficar escritas direto no código-fonte.",
   false,
   "Use variáveis de ambiente."
  ],
  [
   "Mudar a fonte de dados só deveria exigir alterar o model.",
   true,
   "Benefício da separação."
  ],
  [
   "O controller deve conter regras de negócio complexas.",
   false,
   "Elas ficam no model/serviços."
  ],
  [
   "Um blueprint pode ser registrado em mais de uma aplicação.",
   true,
   "É reutilizável."
  ],
  [
   "Mostrar a pilha de erro ao usuário em produção é recomendado.",
   false,
   "Revela detalhes sensíveis."
  ]
 ],
 "caderno": [
  [
   "Desenhe a estrutura de pastas de um projeto Flask com MVC.",
   "app/ models/, views (templates/), controllers/ (blueprints), config.py, run.py, tests/."
  ],
  [
   "Escreva um blueprint <code>usuarios</code> com a rota <code>/</code> (listar) e <code>/&lt;int:id&gt;</code> (ver).",
   "bp = Blueprint(\"usuarios\", __name__, url_prefix=\"/usuarios\"); @bp.route(\"/\") ...; @bp.route(\"/&lt;int:id&gt;\") ..."
  ],
  [
   "Qual a URL de <code>url_for(\"usuarios.ver\", id=2)</code>?",
   "/usuarios/2."
  ],
  [
   "Escreva o handler que responde 404 com uma página HTML amigável.",
   "@app.errorhandler(404) def nao(e): return \"&lt;h1&gt;Página não encontrada&lt;/h1&gt;\", 404"
  ],
  [
   "Que erro devolver quando o usuário não tem permissão?",
   "403 Forbidden."
  ],
  [
   "Dê dois usos de <code>before_request</code>.",
   "Autenticação/checagem de chave e registro (log) de acessos."
  ],
  [
   "Escreva um <code>after_request</code> que acrescenta o cabeçalho <code>X-App: escola</code>.",
   "def depois(r): r.headers[\"X-App\"] = \"escola\"; return r"
  ],
  [
   "Liste 3 valores que NÃO devem ficar no código.",
   "Senhas, chaves secretas e a URL de conexão do banco."
  ],
  [
   "Separe em camadas: “calcular desconto de 10% para alunos”.",
   "Regra no model/serviço; rota (controller) chama; template mostra o valor."
  ],
  [
   "Por que testar as camadas separadas é mais fácil?",
   "Cada parte tem uma responsabilidade e pode ser testada sem depender das outras."
  ]
 ],
 "pbl": [
  {
   "titulo": "Loja da escola dividida em módulos",
   "cenario": "<p>A loja virtual da escola tem produtos, pedidos e usuários, e hoje tudo está num único arquivo de 900 linhas.</p>",
   "passos": [
    [
     "Como dividir em blueprints?",
     "produtos, pedidos e usuarios, cada um com seu url_prefix."
    ],
    [
     "Onde ficam as regras (estoque, desconto)?",
     "Em módulos de model/serviço, fora das rotas."
    ],
    [
     "Como evitar links quebrados quando uma URL mudar?",
     "Gerar links com url_for em vez de escrever o caminho."
    ]
   ]
  },
  {
   "titulo": "Erros que ajudam",
   "cenario": "<p>Usuários reclamam de telas de erro estranhas e a equipe quer padronizar as respostas de erro do sistema.</p>",
   "passos": [
    [
     "Quais erros tratar primeiro?",
     "404, 403, 405 e 500."
    ],
    [
     "Como padronizar para API e para páginas?",
     "Se o caminho começa com /api devolve JSON; senão, HTML amigável."
    ],
    [
     "O que registrar no log quando ocorrer 500?",
     "Data, rota, método e o erro (nunca senhas ou dados pessoais)."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "MVC separa dados, apresentação e controle; blueprints separam assuntos.",
    "url_for gera URLs; errorhandler e abort padronizam erros.",
    "before_request/after_request e app.config centralizam o que vale para todas as rotas."
   ]
  }
 ],
 "glossario": [
  [
   "Endpoint",
   "Nome da view usado pelo url_for (blueprint.funcao)."
  ],
  [
   "Gancho",
   "Função que roda automaticamente em certo momento."
  ]
 ]
});
