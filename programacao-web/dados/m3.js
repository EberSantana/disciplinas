FSI.modulo({
 "n": 3,
 "unidade": "Unidade 2",
 "nome": "Templates e formulários",
 "titulo": "Gerar HTML dinâmico, receber dados e redirecionar",
 "duracao": "16 h",
 "resumoCurto": "Templates Jinja (variáveis, laços, condições, herança), escape contra XSS, formulários POST, validação e o padrão Post/Redirect/Get.",
 "analogia": {
  "titulo": "A carta modelo",
  "txt": "<p>Uma empresa envia milhares de cartas com o mesmo texto, trocando só o nome e o valor: “Prezado <b>{nome}</b>, sua fatura de <b>{valor}</b>…”. O <b>template</b> é a carta modelo; os <b>dados</b> preenchem os espaços. Assim o servidor gera páginas diferentes com o mesmo molde.</p><p>E o <b>formulário</b> é o cupom que o cliente preenche: o servidor lê, confere se está completo e só então age.</p>"
 },
 "chave": [
  "<b>Template</b> é HTML com marcações: <code>{{ variavel }}</code> imprime, <code>{% for %}</code> repete, <code>{% if %}</code> decide.",
  "<code>render_template_string(modelo, **dados)</code> (e <code>render_template</code> com arquivos) gera o HTML final.",
  "O Jinja faz <b>escape automático</b>: <code>&lt;script&gt;</code> vira texto inofensivo. Isso evita <b>XSS</b>.",
  "<b>Herança:</b> <code>{% extends \"base.html\" %}</code> e <code>{% block %}</code> reaproveitam o layout.",
  "Formulários enviados por <code>POST</code> chegam em <code>request.form</code>.",
  "<b>Valide sempre</b> no servidor: campo vazio, tamanho, formato. Nunca confie só no HTML/JavaScript.",
  "<b>Post/Redirect/Get:</b> depois de um POST bem-sucedido, <code>redirect()</code> evita reenvio ao recarregar a página."
 ],
 "objetivos": [
  "Gerar <b>HTML dinâmico</b> com templates.",
  "Entender o <b>escape</b> e o risco de XSS.",
  "Receber e <b>validar</b> dados de formulários.",
  "Aplicar o padrão <b>Post/Redirect/Get</b>."
 ],
 "licoes": [
  {
   "t": "Templates com Jinja",
   "txt": "<p>Em vez de montar HTML com concatenação de strings, escrevemos um molde:</p><pre><code>from flask import render_template_string\n\nMODELO = \"\"\"\n&lt;h1&gt;Olá, {{ nome }}!&lt;/h1&gt;\n&lt;ul&gt;\n{% for t in tarefas %}\n  &lt;li&gt;{{ loop.index }}. {{ t }}&lt;/li&gt;\n{% endfor %}\n&lt;/ul&gt;\n{% if urgente %}&lt;b&gt;Tem prazo!&lt;/b&gt;{% endif %}\n\"\"\"\n\n@app.route(\"/\")\ndef inicio():\n    return render_template_string(MODELO, nome=\"Ana\", tarefas=[\"estudar\", \"treinar\"], urgente=True)</code></pre><p>Em projetos reais o molde fica num arquivo da pasta <code>templates/</code> e você chama <code>render_template(\"inicio.html\", ...)</code>.</p>"
  },
  {
   "t": "Escape automático e XSS",
   "txt": "<p>Se um usuário digita <code>&lt;script&gt;roubar()&lt;/script&gt;</code> como nome e você coloca isso direto na página, o navegador <b>executa</b> o script (ataque <b>XSS</b>). O Jinja escapa os caracteres perigosos:</p><pre><code>render_template_string(\"&lt;p&gt;{{ x }}&lt;/p&gt;\", x=\"&lt;b&gt;oi&lt;/b&gt;\")\n# &lt;p&gt;&amp;lt;b&amp;gt;oi&amp;lt;/b&amp;gt;&lt;/p&gt;</code></pre><p>Só use o filtro <code>|safe</code> em conteúdo que <b>você</b> controla, nunca em texto vindo de usuário.</p>",
   "pense": "por que concatenar strings para montar HTML é perigoso?"
  },
  {
   "t": "Formulários e validação",
   "txt": "<p>O navegador envia os campos no corpo de um POST; o Flask entrega em <code>request.form</code>:</p><pre><code>@app.route(\"/cadastro\", methods=[\"GET\", \"POST\"])\ndef cadastro():\n    if request.method == \"POST\":\n        nome = request.form.get(\"nome\", \"\").strip()\n        if not nome:\n            return \"Informe o nome\", 400\n        return f\"Bem-vindo, {nome}!\", 201\n    return \"&lt;form method=post&gt;...&lt;/form&gt;\"</code></pre><p>Validar é checar o que chegou (vazio, tamanho, formato) e responder <b>400</b> com mensagem clara. O HTML (<code>required</code>) ajuda o usuário, mas o servidor decide.</p>"
  },
  {
   "t": "Post/Redirect/Get e herança de templates",
   "txt": "<p>Se o POST responde com uma página e o usuário recarrega, o navegador reenvia o formulário (cadastro duplicado). A solução é responder com um <b>redirecionamento</b>:</p><pre><code>from flask import redirect\n\n@app.post(\"/tarefas\")\ndef criar():\n    TAREFAS.append(request.form[\"texto\"])\n    return redirect(\"/tarefas\")   # 302 → o navegador faz GET /tarefas</code></pre><p>E para não repetir cabeçalho e rodapé em toda página, use herança: um <code>base.html</code> com <code>{% block conteudo %}{% endblock %}</code> e páginas filhas com <code>{% extends \"base.html\" %}</code>.</p>"
  }
 ],
 "termos": [
  [
   "Template",
   "Molde de HTML com marcações dinâmicas."
  ],
  [
   "Jinja",
   "Motor de templates usado pelo Flask."
  ],
  [
   "Escape",
   "Troca de caracteres especiais por entidades seguras."
  ],
  [
   "XSS",
   "Injeção de script em páginas vistas por outras pessoas."
  ],
  [
   "PRG",
   "Post/Redirect/Get: redirecionar após POST."
  ],
  [
   "Validação",
   "Conferência dos dados recebidos."
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
  "intro": "Gere HTML com templates e trate formulários. Use <code>render_template_string</code> e o <code>test_client</code>.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Flask: templates e formulários",
    "instr": "Escreva o código com <code>from flask import ...</code> como no Flask de verdade, execute (Ctrl+Enter) e veja a saída. Um servidor de mentira roda aqui no navegador e o <code>app.test_client()</code> envia as requisições.",
    "cfg": {
     "id": "pw3",
     "inicial": "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\n@app.route(\"/\")\ndef inicio():\n    return render_template_string(\"<h1>Olá, {{ nome }}!</h1>\", nome=\"Ana\")\n\nprint(app.test_client().get(\"/\").get_data(as_text=True))",
     "entrada": "",
     "desafios": [
      {
       "p": "Crie <code>/perfil/&lt;nome&gt;</code> que usa um template <code>&lt;h2&gt;{{ nome }}&lt;/h2&gt;</code>. Imprima o HTML de <code>/perfil/Bia</code>.",
       "ref": "from flask import Flask, render_template_string\napp = Flask(__name__)\n\n@app.route(\"/perfil/<nome>\")\ndef perfil(nome):\n    return render_template_string(\"<h2>{{ nome }}</h2>\", nome=nome)\n\nprint(app.test_client().get(\"/perfil/Bia\").get_data(as_text=True))",
       "testes": [
        ""
       ],
       "exige": [
        "render_template_string",
        "\\{\\{"
       ],
       "dica": "render_template_string(\"<h2>{{ nome }}</h2>\", nome=nome).",
       "expl": "Os dados vão como argumentos nomeados."
      },
      {
       "p": "Crie <code>/lista</code> que mostra os itens <code>[\"pão\", \"leite\", \"café\"]</code> em <code>&lt;li&gt;</code> usando <code>{% for %}</code>. Imprima o HTML.",
       "ref": "from flask import Flask, render_template_string\napp = Flask(__name__)\nITENS = [\"pão\", \"leite\", \"café\"]\n\n@app.route(\"/lista\")\ndef lista():\n    return render_template_string(\"<ul>{% for i in itens %}<li>{{ i }}</li>{% endfor %}</ul>\", itens=ITENS)\n\nprint(app.test_client().get(\"/lista\").get_data(as_text=True))",
       "testes": [
        ""
       ],
       "exige": [
        "\\{% for"
       ],
       "dica": "{% for i in itens %}<li>{{ i }}</li>{% endfor %}.",
       "expl": "O laço repete o trecho para cada item."
      },
      {
       "p": "Mostre a proteção contra XSS: a rota <code>/eco</code> devolve <code>&lt;p&gt;{{ texto }}&lt;/p&gt;</code>, com o texto vindo de <code>?t=</code>. Leia um texto (pode ter tags) e imprima o HTML da resposta.",
       "ref": "from flask import Flask, request, render_template_string\napp = Flask(__name__)\n\n@app.route(\"/eco\")\ndef eco():\n    return render_template_string(\"<p>{{ texto }}</p>\", texto=request.args.get(\"t\", \"\"))\n\nt = input()\nprint(app.test_client().get(\"/eco\", query_string={\"t\": t}).get_data(as_text=True))",
       "testes": [
        "<b>oi</b>",
        "<script>x()</script>",
        "paz"
       ],
       "exige": [
        "query_string|/eco\\?"
       ],
       "dica": "Passe o texto em query_string={\"t\": ...}.",
       "expl": "O Jinja troca < e > por &lt; e &gt;."
      },
      {
       "p": "Crie <code>POST /cadastro</code> que lê o campo <code>nome</code> do formulário. Vazio → <code>erro</code> com status 400; senão → <code>ok: NOME</code> com 201. Leia um nome (pode ser vazio) e imprima status e corpo.",
       "ref": "from flask import Flask, request\napp = Flask(__name__)\n\n@app.post(\"/cadastro\")\ndef cadastro():\n    nome = request.form.get(\"nome\", \"\").strip()\n    if not nome:\n        return \"erro\", 400\n    return \"ok: \" + nome, 201\n\nn = input()\nr = app.test_client().post(\"/cadastro\", data={\"nome\": n})\nprint(r.status_code, r.get_data(as_text=True))",
       "testes": [
        "Ana",
        "   ",
        "Rui"
       ],
       "exige": [
        "request\\.form"
       ],
       "dica": "strip() remove espaços; if not nome.",
       "expl": "Validar no servidor é obrigatório."
      },
      {
       "p": "Aplique o <b>Post/Redirect/Get</b>: <code>POST /tarefas</code> guarda o campo <code>texto</code> numa lista e redireciona para <code>/tarefas</code>; <code>GET /tarefas</code> devolve as tarefas separadas por vírgula. Leia um texto, faça o POST e imprima o status e o <code>Location</code> do POST, depois o corpo do GET.",
       "ref": "from flask import Flask, request, redirect\napp = Flask(__name__)\nTAREFAS = []\n\n@app.post(\"/tarefas\")\ndef criar():\n    TAREFAS.append(request.form[\"texto\"])\n    return redirect(\"/tarefas\")\n\n@app.get(\"/tarefas\")\ndef listar():\n    return \", \".join(TAREFAS)\n\nc = app.test_client()\nt = input()\nr = c.post(\"/tarefas\", data={\"texto\": t})\nprint(r.status_code, r.headers[\"Location\"])\nprint(c.get(\"/tarefas\").get_data(as_text=True))",
       "testes": [
        "estudar",
        "lavar louça"
       ],
       "exige": [
        "redirect"
       ],
       "dica": "return redirect(\"/tarefas\") devolve 302.",
       "expl": "Após o POST, o navegador faz um GET novo."
      }
     ],
     "pre": "web"
    }
   },
   {
    "tipo": "classificar",
    "id": "cl3",
    "titulo": "Seguro ou perigoso?",
    "cats": [
     "Seguro",
     "Perigoso (XSS)"
    ],
    "itens": [
     [
      "{{ nome }} com escape automático",
      0
     ],
     [
      "Montar HTML com f\"<p>{texto}</p>\" e texto vindo do usuário",
      1
     ],
     [
      "{{ comentario|safe }} com comentário digitado por usuário",
      1
     ],
     [
      "{{ titulo|safe }} com título escrito por você no código",
      0
     ],
     [
      "Imprimir o nome do usuário num template Jinja comum",
      0
     ],
     [
      "Colar entrada do usuário dentro de <script> sem tratamento",
      1
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Use um template",
    "ev": "pw3:def"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de templates",
    "ev": "pw3:todos"
   },
   {
    "id": "m3",
    "t": "Diferencie seguro e perigoso",
    "ev": "vis:cl3"
   }
  ],
  "guiados": [
   {
    "titulo": "Lendo um template",
    "txt": "<p><code>{% for p in produtos %}{{ p.nome }}: R$ {{ p.preco }}{% endfor %}</code> com produtos = [{nome: pão, preco: 5}, {nome: leite, preco: 7}].</p>",
    "passos": [
     {
      "p": "Quantas linhas de produto aparecem?",
      "r": 2,
      "un": "",
      "dica": "Uma por item.",
      "expl": "Um item por volta do for."
     },
     {
      "p": "Qual o texto da 2ª?",
      "r": "leite: R$ 7",
      "un": "",
      "dica": "nome: R$ preco.",
      "expl": "O segundo item da lista."
     },
     {
      "p": "O que aparece se a lista estiver vazia?",
      "r": "nada",
      "un": "",
      "dica": "O for não roda.",
      "expl": "Nenhuma volta, nenhuma linha."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é um template?",
   "HTML com marcações para inserir dados e lógica simples."
  ],
  [
   "Como imprimir uma variável no Jinja?",
   "<code>{{ variavel }}</code>."
  ],
  [
   "Como repetir elementos?",
   "<code>{% for item in lista %}...{% endfor %}</code>."
  ],
  [
   "Como decidir o que mostrar?",
   "<code>{% if cond %}...{% else %}...{% endif %}</code>."
  ],
  [
   "O que é XSS?",
   "Injeção de script malicioso numa página vista por outros usuários."
  ],
  [
   "Como o Jinja protege contra XSS?",
   "Escape automático de <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code> e aspas."
  ],
  [
   "Quando usar o filtro <code>|safe</code>?",
   "Só com conteúdo confiável, escrito por você."
  ],
  [
   "Onde chegam os campos de um formulário POST?",
   "Em <code>request.form</code>."
  ],
  [
   "Por que validar no servidor?",
   "Porque o HTML/JS do cliente pode ser burlado."
  ],
  [
   "Que status usar para dados inválidos?",
   "400 (ou 422)."
  ],
  [
   "O que é Post/Redirect/Get?",
   "Responder um POST com redirecionamento para um GET, evitando reenvio."
  ],
  [
   "Para que serve <code>{% extends %}</code>?",
   "Herdar um layout base e preencher seus blocos."
  ]
 ],
 "vf": [
  [
   "<code>{{ x }}</code> imprime a variável x já escapada.",
   true,
   "É o comportamento padrão do Jinja."
  ],
  [
   "O escape automático converte <code>&lt;</code> em <code>&amp;lt;</code>.",
   true,
   "Evita que vire tag."
  ],
  [
   "Se o formulário tem <code>required</code>, não preciso validar no servidor.",
   false,
   "O navegador pode ser contornado."
  ],
  [
   "<code>request.form</code> guarda dados de um POST de formulário.",
   true,
   "Corpo form-urlencoded."
  ],
  [
   "Redirecionar após POST evita reenvio ao recarregar.",
   true,
   "Padrão PRG."
  ],
  [
   "<code>redirect()</code> devolve normalmente status 200.",
   false,
   "Devolve 302."
  ],
  [
   "<code>{% for %}</code> precisa de <code>{% endfor %}</code>.",
   true,
   "Todo bloco fecha."
  ],
  [
   "Usar <code>|safe</code> em texto digitado pelo usuário é boa prática.",
   false,
   "Abre brecha de XSS."
  ],
  [
   "Em <code>{% block %}</code> a página filha substitui o conteúdo do pai.",
   true,
   "Mecanismo de herança."
  ],
  [
   "Montar HTML com concatenação de strings é tão seguro quanto usar template.",
   false,
   "Sem escape há risco de XSS."
  ],
  [
   "Uma view pode devolver HTML como string.",
   true,
   "Content-Type text/html."
  ],
  [
   "<code>request.form.get(\"x\", \"\")</code> evita erro quando o campo falta.",
   true,
   "Devolve o padrão."
  ]
 ],
 "caderno": [
  [
   "Escreva um template que mostra “Olá, {{ nome }}” e a lista de <code>amigos</code> em <code>&lt;li&gt;</code>.",
   "&lt;p&gt;Olá, {{ nome }}&lt;/p&gt;&lt;ul&gt;{% for a in amigos %}&lt;li&gt;{{ a }}&lt;/li&gt;{% endfor %}&lt;/ul&gt;"
  ],
  [
   "O que o Jinja gera para <code>{{ x }}</code> com x = <code>&lt;i&gt;oi&lt;/i&gt;</code>?",
   "&amp;lt;i&amp;gt;oi&amp;lt;/i&amp;gt; (texto, não tag)."
  ],
  [
   "Explique um ataque XSS em 2 frases.",
   "O atacante envia script como se fosse texto; se o site o imprime sem escape, o script roda no navegador de outras pessoas."
  ],
  [
   "Escreva a validação: campo <code>email</code> obrigatório e contendo <code>@</code>.",
   "email = request.form.get(\"email\", \"\"); if \"@\" not in email: return \"email inválido\", 400"
  ],
  [
   "Quando usar 400 e quando 422?",
   "400 para requisição malformada; 422 quando o formato está certo, mas os dados não passam nas regras."
  ],
  [
   "Desenhe o fluxo Post/Redirect/Get.",
   "POST /tarefas → 302 Location /tarefas → GET /tarefas → 200 com a lista."
  ],
  [
   "Escreva <code>base.html</code> e uma página filha mínima.",
   "base: &lt;html&gt;&lt;body&gt;{% block c %}{% endblock %}&lt;/body&gt;&lt;/html&gt;; filha: {% extends \"base.html\" %}{% block c %}Oi{% endblock %}"
  ],
  [
   "Por que <code>|safe</code> em comentário de usuário é perigoso?",
   "Desliga o escape e permite que scripts do usuário rodem."
  ],
  [
   "Mostre como exibir uma mensagem só se <code>erro</code> existir.",
   "{% if erro %}&lt;p class=erro&gt;{{ erro }}&lt;/p&gt;{% endif %}"
  ],
  [
   "Diferencie <code>request.args</code> e <code>request.form</code>.",
   "args: query string da URL; form: corpo do formulário POST."
  ]
 ],
 "pbl": [
  {
   "titulo": "Livro de visitas",
   "cenario": "<p>A escola quer um livro de visitas: o visitante escreve nome e mensagem, e todas as mensagens aparecem numa página.</p>",
   "passos": [
    [
     "Que rotas e métodos são necessários?",
     "GET /visitas (lista + formulário) e POST /visitas (recebe e redireciona)."
    ],
    [
     "Que validações fazer?",
     "Nome e mensagem não vazios; limite de tamanho."
    ],
    [
     "O que impede que um visitante quebre a página com HTML malicioso?",
     "O escape automático do template; nunca usar |safe nas mensagens."
    ]
   ]
  },
  {
   "titulo": "Layout único do site",
   "cenario": "<p>As 5 páginas do site repetem cabeçalho, menu e rodapé, e qualquer mudança exige editar tudo.</p>",
   "passos": [
    [
     "Que recurso do template resolve isso?",
     "Herança: base.html com blocos e páginas filhas com extends."
    ],
    [
     "Que blocos o base deveria ter?",
     "titulo, conteudo e, se preciso, scripts."
    ],
    [
     "Como o menu mostra a página atual destacada?",
     "Passando uma variável (ativa) e usando {% if ativa == 'sobre' %}class=ativo{% endif %}."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Templates misturam HTML e dados; o Jinja escapa por padrão.",
    "request.form recebe POST; valide sempre no servidor.",
    "Depois do POST, redirecione (PRG) e reaproveite o layout com extends."
   ]
  }
 ],
 "glossario": [
  [
   "Jinja",
   "Motor de templates do Flask."
  ],
  [
   "Layout base",
   "Template pai com cabeçalho e rodapé comuns."
  ]
 ]
});
