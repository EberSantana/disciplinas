FSI.modulo({
 "n": 8,
 "unidade": "Unidade 4",
 "nome": "OO no servidor, testes e implantação",
 "titulo": "Classes de domínio, app factory, testes automatizados, segurança e deploy",
 "duracao": "16 h",
 "resumoCurto": "Orientação a objetos no back-end (modelos e serviços), app factory e configuração por ambiente, testes automatizados, checklist de segurança (OWASP) e publicação.",
 "analogia": {
  "titulo": "Da cozinha de casa ao restaurante",
  "txt": "<p>Cozinhar para a família é improvisar. Abrir um restaurante exige <b>processos</b>: receitas padronizadas (classes), controle de qualidade (testes), higiene e segurança (OWASP) e uma operação que funcione todos os dias (implantação e monitoramento).</p><p>Este módulo é a passagem do “funciona no meu computador” para o “funciona de verdade, para todo mundo, com segurança”.</p>"
 },
 "chave": [
  "<b>Orientação a objetos:</b> classes de domínio (<code>Produto</code>, <code>Pedido</code>) trazem dados <b>e</b> regras; serviços organizam casos de uso (<code>CarrinhoService</code>).",
  "As rotas ficam finas: <b>validar → chamar o serviço → escolher o status</b>.",
  "<b>App factory:</b> uma função <code>criar_app(config)</code> monta a aplicação; facilita testes e ambientes diferentes.",
  "<b>Configuração por ambiente</b> (variáveis de ambiente): senhas, chaves e modo debug nunca ficam no código.",
  "<b>Testes automatizados</b> com o test client: cada teste prepara, age e confere (<code>assert</code>).",
  "<b>Segurança (OWASP Top 10):</b> injeção, autenticação falha, exposição de dados, controle de acesso, configuração insegura.",
  "<b>Implantação:</b> servidor WSGI (gunicorn) atrás de um proxy, HTTPS, logs, <code>debug=False</code>, backups e monitoramento."
 ],
 "objetivos": [
  "Modelar o domínio com <b>classes</b> e <b>serviços</b>.",
  "Criar uma <b>app factory</b> configurável.",
  "Escrever <b>testes automatizados</b> de rotas.",
  "Aplicar um <b>checklist de segurança</b> e planejar a <b>implantação</b>."
 ],
 "licoes": [
  {
   "t": "Classes de domínio e serviços",
   "txt": "<p>Em vez de dicionários soltos, modele o que o sistema entende:</p><pre><code>class Produto:\n    def __init__(self, nome, preco):\n        if preco &lt; 0:\n            raise ValueError(\"preço não pode ser negativo\")\n        self.nome, self.preco = nome, preco\n\n    def para_dict(self):\n        return {\"nome\": self.nome, \"preco\": self.preco}\n\nclass Carrinho:\n    def __init__(self):\n        self.itens = []\n    def adicionar(self, produto, qtd=1):\n        self.itens.append((produto, qtd))\n    def total(self):\n        return sum(p.preco * q for p, q in self.itens)</code></pre><p>A regra “preço não pode ser negativo” mora na classe, não espalhada pelas rotas. Qualquer parte do sistema que criar um <code>Produto</code> recebe a proteção de graça.</p>",
   "pense": "onde você colocaria a regra “estoque não pode ficar negativo”?"
  },
  {
   "t": "App factory e configuração",
   "txt": "<p>Criar a app dentro de uma função permite montar versões diferentes (produção, testes) e evita estado global:</p><pre><code>import os\n\ndef criar_app(config=None):\n    app = Flask(__name__)\n    app.config[\"DEBUG\"] = os.environ.get(\"DEBUG\", \"0\") == \"1\"\n    app.secret_key = os.environ[\"SECRET_KEY\"]      # nunca no código!\n    app.config.update(config or {})\n\n    @app.route(\"/saude\")\n    def saude():\n        return {\"status\": \"ok\"}\n    return app</code></pre><p>Nos testes: <code>criar_app({\"TESTING\": True})</code>. Em produção, as variáveis vêm do ambiente do servidor (princípio dos <i>12-factor apps</i>).</p>"
  },
  {
   "t": "Testes automatizados",
   "txt": "<p>Teste automatizado é código que confere código. Com o test client, cada rota vira um teste rápido:</p><pre><code>def test_saude():\n    cliente = criar_app().test_client()\n    r = cliente.get(\"/saude\")\n    assert r.status_code == 200\n    assert r.get_json() == {\"status\": \"ok\"}\n\ndef test_produto_inexistente():\n    r = criar_app().test_client().get(\"/produtos/999\")\n    assert r.status_code == 404</code></pre><p>Com <code>pytest</code>, basta rodar <code>pytest</code> e ele descobre as funções <code>test_*</code>. Teste o caminho feliz <b>e</b> os erros (400, 401, 403, 404). Rodar os testes a cada mudança dá segurança para evoluir.</p>"
  },
  {
   "t": "Segurança e implantação",
   "txt": "<p><b>Checklist mínimo (OWASP):</b></p><ul><li>Consultas parametrizadas (nada de SQL por concatenação).</li><li>Escape de saída nos templates (XSS) e validação de toda entrada.</li><li>Senhas com hash; sessões com HttpOnly/Secure; HTTPS sempre.</li><li>Checagem de autorização em <b>toda</b> rota sensível (não só esconder botões).</li><li><code>debug=False</code> em produção; erros genéricos para o usuário, detalhes só no log.</li><li>Dependências atualizadas; segredos fora do repositório.</li></ul><p><b>Implantação:</b> o servidor de desenvolvimento do Flask não serve para produção. Use um servidor WSGI como <code>gunicorn</code> atrás de um proxy (Nginx) com HTTPS, empacote com Docker se possível e acompanhe logs e saúde (<code>/saude</code>).</p>"
  }
 ],
 "termos": [
  [
   "Classe de domínio",
   "Classe que representa um conceito do negócio."
  ],
  [
   "Serviço",
   "Classe que implementa um caso de uso."
  ],
  [
   "App factory",
   "Função que cria e configura a aplicação."
  ],
  [
   "Teste automatizado",
   "Código que confere o comportamento de outro código."
  ],
  [
   "OWASP",
   "Organização que publica as principais falhas de segurança web."
  ],
  [
   "WSGI",
   "Interface entre servidores web e aplicações Python."
  ],
  [
   "12-factor",
   "Boas práticas para aplicações em nuvem, como config no ambiente."
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
  "intro": "Aplique orientação a objetos, app factory e testes. Ao final, você terá escrito a estrutura de um back-end completo.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Flask: classes, factory e testes",
    "instr": "Escreva o código com <code>from flask import ...</code> como no Flask de verdade, execute (Ctrl+Enter) e veja a saída. Um servidor de mentira roda aqui no navegador e o <code>app.test_client()</code> envia as requisições.",
    "cfg": {
     "id": "pw8",
     "inicial": "class Produto:\n    def __init__(self, nome, preco):\n        self.nome = nome\n        self.preco = preco\n\np = Produto(\"caneta\", 3.5)\nprint(p.nome, p.preco)",
     "entrada": "",
     "desafios": [
      {
       "p": "Crie a classe <code>Produto(nome, preco)</code> que levanta <code>ValueError</code> se o preço for negativo e tem o método <code>para_dict()</code>. Leia um preço (float) e imprima o dicionário, ou <code>erro: preço inválido</code> se o preço for negativo.",
       "ref": "class Produto:\n    def __init__(self, nome, preco):\n        if preco < 0:\n            raise ValueError(\"preço inválido\")\n        self.nome = nome\n        self.preco = preco\n\n    def para_dict(self):\n        return {\"nome\": self.nome, \"preco\": self.preco}\n\ntry:\n    print(Produto(\"caneta\", float(input())).para_dict())\nexcept ValueError:\n    print(\"erro: preço inválido\")",
       "testes": [
        "3.5",
        "-1",
        "0"
       ],
       "exige": [
        "class\\s+Produto",
        "ValueError"
       ],
       "dica": "if preco < 0: raise ValueError(...) dentro do __init__.",
       "expl": "A regra mora na classe."
      },
      {
       "p": "Crie <code>Carrinho</code> com <code>adicionar(produto, qtd)</code> e <code>total()</code> (soma de preço × quantidade). Adicione 2 canetas (3.5) e 1 caderno (18.9); leia um <b>desconto em %</b> e imprima o total com desconto, com 2 casas.",
       "ref": "class Produto:\n    def __init__(self, nome, preco):\n        self.nome = nome\n        self.preco = preco\n\nclass Carrinho:\n    def __init__(self):\n        self.itens = []\n    def adicionar(self, produto, qtd=1):\n        self.itens.append((produto, qtd))\n    def total(self):\n        return sum(p.preco * q for p, q in self.itens)\n\nc = Carrinho()\nc.adicionar(Produto(\"caneta\", 3.5), 2)\nc.adicionar(Produto(\"caderno\", 18.9))\nd = float(input())\nprint(f\"{c.total() * (1 - d / 100):.2f}\")",
       "testes": [
        "0",
        "10",
        "50"
       ],
       "exige": [
        "class\\s+Carrinho",
        "def\\s+total"
       ],
       "dica": "sum(p.preco * q for p, q in self.itens).",
       "expl": "O serviço concentra o cálculo."
      },
      {
       "p": "Escreva a <b>app factory</b> <code>criar_app(config=None)</code> que devolve uma Flask com a rota <code>/saude</code> (JSON <code>{\"status\": \"ok\"}</code>) e aplica <code>config</code> em <code>app.config</code>. Crie duas apps (uma com <code>{\"MODO\": \"teste\"}</code>) e imprima o <code>MODO</code> de cada (use <code>get(\"MODO\", \"prod\")</code>) e o status de <code>/saude</code> da primeira.",
       "ref": "from flask import Flask\n\ndef criar_app(config=None):\n    app = Flask(__name__)\n    app.config.update(config or {})\n\n    @app.route(\"/saude\")\n    def saude():\n        return {\"status\": \"ok\"}\n    return app\n\na = criar_app({\"MODO\": \"teste\"})\nb = criar_app()\nprint(a.config.get(\"MODO\", \"prod\"), b.config.get(\"MODO\", \"prod\"))\nprint(a.test_client().get(\"/saude\").status_code)",
       "testes": [
        ""
       ],
       "exige": [
        "def\\s+criar_app"
       ],
       "dica": "Crie o Flask dentro da função e devolva-o.",
       "expl": "Cada chamada gera uma app independente."
      },
      {
       "p": "Escreva <b>testes automatizados</b> para a app abaixo e um mini-executor. Defina <code>test_inicio</code> (GET / dá 200) e <code>test_404</code> (GET /x dá 404); o executor percorre as funções <code>test_*</code> e imprime <code>ok: nome</code> ou <code>falhou: nome</code>. A app tem <code>/</code> devolvendo <code>oi</code>. Leia <code>sim</code> ou <code>nao</code>: se <code>nao</code>, a app deve ser criada <b>sem</b> a rota <code>/</code> (para ver o teste falhar).",
       "ref": "from flask import Flask\n\ndef criar(com_inicio):\n    app = Flask(__name__)\n    if com_inicio:\n        @app.route(\"/\")\n        def inicio():\n            return \"oi\"\n    return app\n\ncom = input() == \"sim\"\n\ndef test_inicio():\n    assert criar(com).test_client().get(\"/\").status_code == 200\n\ndef test_404():\n    assert criar(com).test_client().get(\"/x\").status_code == 404\n\nfor nome in sorted(n for n in list(globals()) if n.startswith(\"test_\")):\n    try:\n        globals()[nome]()\n        print(\"ok:\", nome)\n    except AssertionError:\n        print(\"falhou:\", nome)",
       "testes": [
        "sim",
        "nao"
       ],
       "exige": [
        "assert",
        "def\\s+test_"
       ],
       "dica": "assert condição; o executor usa try/except AssertionError.",
       "expl": "Testes pegam regressões antes dos usuários."
      },
      {
       "p": "Configuração por ambiente: escreva <code>carregar_config(env)</code> que recebe um dicionário (como <code>os.environ</code>) e devolve <code>{\"DEBUG\": bool, \"PORTA\": int}</code> com padrões <code>DEBUG=\"0\"</code> e <code>PORTA=\"5000\"</code>. Leia duas linhas (DEBUG e PORTA; linha vazia = usar o padrão) e imprima o resultado.",
       "ref": "def carregar_config(env):\n    return {\"DEBUG\": env.get(\"DEBUG\", \"0\") == \"1\", \"PORTA\": int(env.get(\"PORTA\", \"5000\"))}\n\nenv = {}\nd = input()\np = input()\nif d:\n    env[\"DEBUG\"] = d\nif p:\n    env[\"PORTA\"] = p\nprint(carregar_config(env))",
       "testes": [
        "1\n8080",
        "\n",
        "0\n"
       ],
       "exige": [
        "def\\s+carregar_config"
       ],
       "dica": "env.get(\"DEBUG\", \"0\") == \"1\" e int(...).",
       "expl": "Mesmo código, configurações diferentes por ambiente."
      }
     ],
     "pre": "web"
    }
   },
   {
    "tipo": "classificar",
    "id": "cl8",
    "titulo": "Checklist de segurança",
    "cats": [
     "Fazer",
     "Evitar"
    ],
    "itens": [
     [
      "Consultas parametrizadas",
      0
     ],
     [
      "debug=True em produção",
      1
     ],
     [
      "Guardar o hash da senha",
      0
     ],
     [
      "Secret key no repositório público",
      1
     ],
     [
      "HTTPS em todo o site",
      0
     ],
     [
      "Mostrar o traceback ao usuário",
      1
     ],
     [
      "Checar o papel no servidor em toda rota sensível",
      0
     ],
     [
      "Confiar só em validação feita em JavaScript",
      1
     ]
    ]
   },
   {
    "tipo": "classificar",
    "id": "cl8b",
    "titulo": "Em qual etapa?",
    "cats": [
     "Desenvolver",
     "Testar",
     "Implantar"
    ],
    "itens": [
     [
      "Escrever as classes e rotas",
      0
     ],
     [
      "Rodar pytest a cada mudança",
      1
     ],
     [
      "Subir o app com gunicorn atrás de um proxy",
      2
     ],
     [
      "Conferir 404 e 403 com o test client",
      1
     ],
     [
      "Configurar variáveis de ambiente no servidor",
      2
     ],
     [
      "Criar o blueprint de pedidos",
      0
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Modele o domínio com classes",
    "ev": "pw8:class"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios finais",
    "ev": "pw8:todos"
   },
   {
    "id": "m3",
    "t": "Monte o checklist de segurança",
    "ev": "vis:cl8"
   },
   {
    "id": "m4",
    "t": "Organize as etapas do projeto",
    "ev": "vis:cl8b"
   }
  ],
  "guiados": [
   {
    "titulo": "Lendo um teste",
    "txt": "<p><code>def test_login_errado(): r = c.post(\"/login\", data={\"senha\": \"x\"}); assert r.status_code == 401</code></p>",
    "passos": [
     {
      "p": "O que o teste verifica?",
      "r": "que a senha errada é recusada",
      "un": "",
      "dica": "Veja o assert.",
      "expl": "O servidor deve rejeitar credenciais erradas."
     },
     {
      "p": "Qual status a rota deve devolver para o teste passar?",
      "r": 401,
      "un": "",
      "dica": "assert r.status_code == ...",
      "expl": "401 não autenticado."
     },
     {
      "p": "Se a rota passar a devolver 200, o que acontece?",
      "r": "o teste falha",
      "un": "",
      "dica": "assert falso.",
      "expl": "O teste acusa o erro antes de ir para produção."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma classe de domínio?",
   "Classe que representa um conceito do negócio, com dados e regras."
  ],
  [
   "Onde deve ficar a regra “preço não pode ser negativo”?",
   "Na classe <code>Produto</code> (model), não nas rotas."
  ],
  [
   "O que é um serviço?",
   "Classe que implementa um caso de uso, usando modelos e DAOs."
  ],
  [
   "Como deve ser uma rota “fina”?",
   "Valida a entrada, chama o serviço e escolhe o status."
  ],
  [
   "O que é app factory?",
   "Função que cria e configura a aplicação (<code>criar_app</code>)."
  ],
  [
   "Por que usar variáveis de ambiente?",
   "Para manter segredos e configurações fora do código."
  ],
  [
   "O que é um teste automatizado?",
   "Código que executa o sistema e confere o resultado esperado."
  ],
  [
   "O que o <code>assert</code> faz num teste?",
   "Falha o teste se a condição for falsa."
  ],
  [
   "Quais status testar além do 200?",
   "400, 401, 403 e 404 (os caminhos de erro)."
  ],
  [
   "O que é o OWASP Top 10?",
   "Lista das falhas de segurança mais comuns em aplicações web."
  ],
  [
   "Por que não usar o servidor de desenvolvimento em produção?",
   "Não é seguro nem preparado para carga; use gunicorn/WSGI."
  ],
  [
   "Para que serve uma rota <code>/saude</code>?",
   "Permitir que o monitoramento confira se a aplicação está viva."
  ]
 ],
 "vf": [
  [
   "Regras de negócio devem ficar espalhadas pelas rotas.",
   false,
   "Concentre-as em classes/serviços."
  ],
  [
   "Uma classe pode validar seus próprios dados no <code>__init__</code>.",
   true,
   "Protege o objeto desde a criação."
  ],
  [
   "Com app factory é possível criar apps diferentes para teste e produção.",
   true,
   "Cada chamada gera uma app."
  ],
  [
   "A chave secreta pode ficar fixa no código se o repositório for privado.",
   false,
   "Ainda é má prática; use o ambiente."
  ],
  [
   "Testes automatizados substituem completamente a revisão de segurança.",
   false,
   "Complementam, não substituem."
  ],
  [
   "<code>debug=True</code> em produção é aceitável.",
   false,
   "Expõe um console e detalhes internos."
  ],
  [
   "Um teste deve cobrir também os erros (404, 400…).",
   true,
   "Caminhos de erro quebram muito."
  ],
  [
   "HTTPS protege os dados em trânsito.",
   true,
   "Criptografa a conexão."
  ],
  [
   "Esconder o botão de admin garante a segurança da área admin.",
   false,
   "O servidor precisa checar."
  ],
  [
   "<code>gunicorn</code> é um servidor WSGI usado em produção.",
   true,
   "Atrás de um proxy."
  ],
  [
   "Logs ajudam a investigar erros em produção.",
   true,
   "Sem expor dados sensíveis."
  ],
  [
   "Depois de publicado, o sistema não precisa mais de atualização de dependências.",
   false,
   "Falhas novas surgem sempre."
  ]
 ],
 "caderno": [
  [
   "Modele em classes um sistema de empréstimo (Livro, Aluno, Emprestimo).",
   "Livro(titulo, disponivel), Aluno(ra, nome), Emprestimo(livro, aluno, data) com emprestar() que valida disponibilidade."
  ],
  [
   "Onde colocar a regra “aluno pode ter até 3 livros”?",
   "No serviço de empréstimo (ou na classe Aluno), nunca só na rota."
  ],
  [
   "Escreva um teste para uma rota que devolve 403 a um aluno.",
   "def test_aluno_403(): ... login como aluno; assert cliente.get(\"/notas\").status_code == 403"
  ],
  [
   "Liste 5 itens do checklist de segurança do seu projeto.",
   "HTTPS, hash de senha, consultas parametrizadas, escape de saída, autorização em toda rota."
  ],
  [
   "Explique o que é injeção, XSS e CSRF em uma linha cada.",
   "Injeção: comando malicioso nos dados; XSS: script injetado na página; CSRF: ação forjada com a sessão da vítima."
  ],
  [
   "Escreva as variáveis de ambiente que seu app precisa.",
   "SECRET_KEY, DATABASE_URL, DEBUG, PORTA."
  ],
  [
   "Descreva os passos de uma implantação simples.",
   "Servidor com Python, instalar dependências, configurar variáveis, rodar gunicorn, proxy Nginx com HTTPS, logs."
  ],
  [
   "Para que serve <code>requirements.txt</code>?",
   "Listar as dependências e versões para reproduzir o ambiente."
  ],
  [
   "Descreva a estrutura final de um projeto Flask organizado.",
   "app/ (blueprints, models, services, templates), tests/, config.py, requirements.txt, run.py."
  ],
  [
   "Crie um plano de testes para o cadastro de usuários.",
   "Sucesso (201), campo vazio (400), e-mail duplicado (409), senha fraca (400), sem permissão (403)."
  ]
 ],
 "pbl": [
  {
   "titulo": "Projeto final: Mural de recados da turma",
   "cenario": "<p>Você e sua equipe vão entregar um sistema completo: cadastro e login de alunos, mural de recados (criar, listar, apagar o próprio recado) e uma API JSON dos recados.</p>",
   "passos": [
    [
     "Que blueprints, modelos e serviços o projeto terá?",
     "Blueprints auth, recados e api; modelos Usuario e Recado; serviço RecadoService com as regras (só o autor apaga)."
    ],
    [
     "Que testes automatizados são indispensáveis?",
     "Cadastro/login (sucesso e falha), criar recado (201/400), apagar recado alheio (403) e listagem da API (200)."
    ],
    [
     "Que itens de segurança você vai demonstrar na apresentação?",
     "Hash de senha, sessão protegida, escape no template, consultas parametrizadas, autorização no servidor e HTTPS no deploy."
    ]
   ]
  },
  {
   "titulo": "Publicar com responsabilidade",
   "cenario": "<p>Depois de pronto, o mural será publicado para toda a escola. A direção quer saber se é seguro e como será mantido.</p>",
   "passos": [
    [
     "Que variáveis de ambiente e configurações o servidor precisa?",
     "SECRET_KEY, DATABASE_URL, DEBUG=0; HTTPS e domínio configurados."
    ],
    [
     "Como acompanhar a saúde do sistema?",
     "Rota /saude, logs de erro, alertas e backups do banco."
    ],
    [
     "Qual o plano se uma falha de segurança for descoberta?",
     "Corrigir, trocar segredos, avisar usuários, restaurar de backup se preciso e registrar a lição aprendida."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Classes e serviços guardam as regras; rotas ficam finas.",
    "App factory + variáveis de ambiente tornam a app testável e implantável.",
    "Teste os caminhos felizes e os de erro; siga o checklist OWASP; implante com WSGI e HTTPS."
   ]
  }
 ],
 "glossario": [
  [
   "pytest",
   "Ferramenta de testes mais usada em Python."
  ],
  [
   "gunicorn",
   "Servidor WSGI para produção."
  ],
  [
   "Regressão",
   "Quando uma mudança quebra algo que funcionava."
  ]
 ]
});
