FSI.modulo({
 "n": 5,
 "unidade": "Unidade 3",
 "nome": "Sessões, cookies e autenticação",
 "titulo": "Lembrar o usuário, fazer login e proteger rotas",
 "duracao": "16 h",
 "resumoCurto": "Cookies e sessões, login e logout, hash de senhas, proteção de rotas com decorators, autorização (papéis) e noções de CSRF.",
 "analogia": {
  "titulo": "A pulseira do parque",
  "txt": "<p>Na entrada do parque você mostra o ingresso <b>uma vez</b> (login) e ganha uma <b>pulseira</b>. Nos brinquedos, ninguém pergunta quem você é: basta mostrar a pulseira. Se perder a pulseira, precisa entrar de novo. E algumas áreas exigem pulseira <b>VIP</b> (autorização).</p><p>O HTTP não lembra ninguém; o <b>cookie</b> é a pulseira que o navegador apresenta em toda requisição, e a <b>sessão</b> é o que o servidor sabe sobre ela.</p>"
 },
 "chave": [
  "HTTP é sem estado: para lembrar o usuário o servidor entrega um <b>cookie</b> e o navegador o reenvia a cada requisição.",
  "Em Flask, <code>session</code> é um dicionário guardado num cookie <b>assinado</b> com <code>app.secret_key</code>.",
  "<b>Autenticação</b> = provar quem é (login). <b>Autorização</b> = o que pode fazer (papéis/permissões).",
  "Nunca guarde senha em texto puro: guarde o <b>hash</b> (<code>generate_password_hash</code>) e compare com <code>check_password_hash</code>.",
  "Proteja rotas com um <b>decorator</b> como <code>login_required</code> que devolve <b>401</b> (ou redireciona) quando não há usuário na sessão.",
  "Mensagem de login errado deve ser <b>genérica</b> (“usuário ou senha inválidos”) para não revelar quais usuários existem.",
  "Cookies de sessão devem ser <code>HttpOnly</code>, <code>Secure</code> (HTTPS) e protegidos contra <b>CSRF</b>."
 ],
 "objetivos": [
  "Explicar <b>cookies</b> e <b>sessões</b>.",
  "Implementar <b>login/logout</b> com hash de senha.",
  "Proteger rotas com <b>decorators</b> e diferenciar 401 de 403.",
  "Reconhecer riscos: <b>sequestro de sessão</b> e <b>CSRF</b>."
 ],
 "licoes": [
  {
   "t": "Cookies e sessões",
   "txt": "<p>O servidor responde com <code>Set-Cookie: sessao=abc123</code>; o navegador guarda e, nas próximas requisições, envia <code>Cookie: sessao=abc123</code>. Assim o servidor “reconhece” o cliente.</p><pre><code>from flask import session\n\napp.secret_key = \"troque-isto-em-producao\"\n\n@app.route(\"/visita\")\ndef visita():\n    session[\"n\"] = session.get(\"n\", 0) + 1\n    return f\"Você visitou {session['n']} vez(es)\"</code></pre><p>O Flask guarda a sessão <b>no próprio cookie</b>, assinada com a <code>secret_key</code>: o usuário pode ler, mas se alterar, a assinatura quebra e a sessão é descartada. Sem <code>secret_key</code>, a sessão nem funciona.</p>",
   "pense": "por que a secret_key nunca pode ir para o repositório público?"
  },
  {
   "t": "Login, logout e hash de senha",
   "txt": "<p>Guardar senhas em texto puro é desastre: se o banco vaza, todas as contas vazam. Guarde o <b>hash</b> (resumo irreversível, com sal):</p><pre><code>from werkzeug.security import generate_password_hash, check_password_hash\n\nUSUARIOS = {\"ana\": generate_password_hash(\"senha123\")}\n\n@app.post(\"/login\")\ndef login():\n    u = request.form.get(\"usuario\", \"\")\n    s = request.form.get(\"senha\", \"\")\n    h = USUARIOS.get(u)\n    if h and check_password_hash(h, s):\n        session[\"usuario\"] = u\n        return \"ok\"\n    return \"usuário ou senha inválidos\", 401\n\n@app.post(\"/logout\")\ndef logout():\n    session.clear()\n    return \"saiu\"</code></pre><p>Repare na mensagem única de erro: ela não revela se foi o usuário ou a senha que errou.</p>"
  },
  {
   "t": "Proteger rotas: decorators",
   "txt": "<p>Para não repetir “está logado?” em toda rota, crie um decorator:</p><pre><code>from functools import wraps\n\ndef login_required(f):\n    @wraps(f)\n    def interno(*a, **kw):\n        if \"usuario\" not in session:\n            return \"faça login\", 401\n        return f(*a, **kw)\n    return interno\n\n@app.route(\"/painel\")\n@login_required\ndef painel():\n    return \"Painel de \" + session[\"usuario\"]</code></pre><p><b>401</b> = não autenticado; <b>403</b> = autenticado, mas sem permissão (ex.: aluno tentando abrir a área do professor).</p>"
  },
  {
   "t": "Autorização e riscos",
   "txt": "<p>Papéis (<i>roles</i>) separam o que cada pessoa pode fazer: <code>aluno</code>, <code>professor</code>, <code>admin</code>. Verifique o papel no servidor, sempre.</p><pre><code>def exige_papel(papel):\n    def deco(f):\n        @wraps(f)\n        def interno(*a, **kw):\n            if session.get(\"papel\") != papel:\n                return \"proibido\", 403\n            return f(*a, **kw)\n        return interno\n    return deco</code></pre><p><b>Riscos:</b> roubo do cookie (use HTTPS e HttpOnly), <b>CSRF</b> (um site malicioso faz o navegador logado enviar um POST: use token CSRF e <code>SameSite</code>) e <b>força bruta</b> (limite tentativas).</p>"
  }
 ],
 "termos": [
  [
   "Cookie",
   "Pequeno dado guardado no navegador e reenviado ao servidor."
  ],
  [
   "Sessão",
   "Dados do usuário mantidos entre requisições."
  ],
  [
   "Hash",
   "Resumo irreversível usado para guardar senhas."
  ],
  [
   "Autenticação",
   "Verificar quem é a pessoa."
  ],
  [
   "Autorização",
   "Verificar o que ela pode fazer."
  ],
  [
   "CSRF",
   "Ataque que usa a sessão aberta da vítima para enviar ações."
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
  "intro": "Implemente sessões, login e proteção de rotas. O <code>test_client()</code> guarda os cookies como um navegador de verdade.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Flask: sessão e login",
    "instr": "Escreva o código com <code>from flask import ...</code> como no Flask de verdade, execute (Ctrl+Enter) e veja a saída. Um servidor de mentira roda aqui no navegador e o <code>app.test_client()</code> envia as requisições.",
    "cfg": {
     "id": "pw5",
     "inicial": "from flask import Flask, session\n\napp = Flask(__name__)\napp.secret_key = \"chave\"\n\n@app.route(\"/visita\")\ndef visita():\n    session[\"n\"] = session.get(\"n\", 0) + 1\n    return str(session[\"n\"])\n\nc = app.test_client()\nprint(c.get(\"/visita\").get_data(as_text=True), c.get(\"/visita\").get_data(as_text=True))",
     "entrada": "",
     "desafios": [
      {
       "p": "Faça um <b>contador de visitas</b> na rota <code>/visita</code> usando <code>session</code>. Com um mesmo cliente, acesse três vezes e imprima os três textos separados por espaço.",
       "ref": "from flask import Flask, session\napp = Flask(__name__)\napp.secret_key = \"k\"\n\n@app.route(\"/visita\")\ndef visita():\n    session[\"n\"] = session.get(\"n\", 0) + 1\n    return str(session[\"n\"])\n\nc = app.test_client()\nprint(\" \".join(c.get(\"/visita\").get_data(as_text=True) for _ in range(3)))",
       "testes": [
        ""
       ],
       "exige": [
        "session",
        "secret_key"
       ],
       "dica": "session.get(\"n\", 0) + 1 e secret_key definida.",
       "expl": "O cookie da sessão acompanha as requisições do mesmo cliente."
      },
      {
       "p": "Implemente <code>POST /login</code>: usuário <code>ana</code> e senha <code>1234</code> guardam <code>session[\"usuario\"]</code> e devolvem <code>ok</code>; senão <code>invalido</code> com 401. Leia a senha, envie o login e imprima status e corpo.",
       "ref": "from flask import Flask, request, session\napp = Flask(__name__)\napp.secret_key = \"k\"\n\n@app.post(\"/login\")\ndef login():\n    if request.form.get(\"usuario\") == \"ana\" and request.form.get(\"senha\") == \"1234\":\n        session[\"usuario\"] = \"ana\"\n        return \"ok\"\n    return \"invalido\", 401\n\ns = input()\nr = app.test_client().post(\"/login\", data={\"usuario\": \"ana\", \"senha\": s})\nprint(r.status_code, r.get_data(as_text=True))",
       "testes": [
        "1234",
        "errada"
       ],
       "exige": [
        "session\\["
       ],
       "dica": "Compare os dois campos do formulário.",
       "expl": "Credencial certa grava a sessão; errada devolve 401."
      },
      {
       "p": "Proteja <code>/painel</code> com um decorator <code>login_required</code> (401 sem login). Use um cliente: acesse <code>/painel</code>, faça <code>POST /login</code> (campo <code>usuario</code> = <code>ana</code>) e acesse de novo. Imprima os dois status do painel.",
       "ref": "from flask import Flask, request, session\nfrom functools import wraps\napp = Flask(__name__)\napp.secret_key = \"k\"\n\ndef login_required(f):\n    @wraps(f)\n    def interno(*a, **kw):\n        if \"usuario\" not in session:\n            return \"faça login\", 401\n        return f(*a, **kw)\n    return interno\n\n@app.post(\"/login\")\ndef login():\n    session[\"usuario\"] = request.form[\"usuario\"]\n    return \"ok\"\n\n@app.route(\"/painel\")\n@login_required\ndef painel():\n    return \"painel\"\n\nc = app.test_client()\nprint(c.get(\"/painel\").status_code)\nc.post(\"/login\", data={\"usuario\": \"ana\"})\nprint(c.get(\"/painel\").status_code)",
       "testes": [
        ""
       ],
       "exige": [
        "def\\s+login_required",
        "wraps|functools"
       ],
       "dica": "O decorator checa \"usuario\" in session antes de chamar a view.",
       "expl": "O decorator reaproveita a checagem em qualquer rota."
      },
      {
       "p": "Guarde <b>hash</b>, não senha. Use <code>generate_password_hash</code> e <code>check_password_hash</code>. Leia uma senha; imprima <code>True</code>/<code>False</code> para a comparação com o hash de <code>segredo</code>, e depois <code>True</code> se o hash <b>não</b> contém a palavra <code>segredo</code>.",
       "ref": "from werkzeug.security import generate_password_hash, check_password_hash\nh = generate_password_hash(\"segredo\")\ns = input()\nprint(check_password_hash(h, s))\nprint(\"segredo\" not in h)",
       "testes": [
        "segredo",
        "outra",
        "Segredo"
       ],
       "exige": [
        "generate_password_hash",
        "check_password_hash"
       ],
       "dica": "check_password_hash(hash, senha_digitada).",
       "expl": "O hash não revela a senha original."
      },
      {
       "p": "Implemente <b>autorização</b>: <code>/notas</code> só para <code>papel == \"professor\"</code> (403 caso contrário). Leia um papel, grave-o na sessão por <code>POST /entrar</code> (campo <code>papel</code>) e imprima o status de <code>GET /notas</code>.",
       "ref": "from flask import Flask, request, session\napp = Flask(__name__)\napp.secret_key = \"k\"\n\n@app.post(\"/entrar\")\ndef entrar():\n    session[\"papel\"] = request.form[\"papel\"]\n    return \"ok\"\n\n@app.route(\"/notas\")\ndef notas():\n    if session.get(\"papel\") != \"professor\":\n        return \"proibido\", 403\n    return \"notas\"\n\nc = app.test_client()\nc.post(\"/entrar\", data={\"papel\": input()})\nprint(c.get(\"/notas\").status_code)",
       "testes": [
        "professor",
        "aluno"
       ],
       "exige": [
        "403"
       ],
       "dica": "session.get(\"papel\") != \"professor\" → 403.",
       "expl": "403: identificado, mas sem permissão."
      }
     ],
     "pre": "web"
    }
   },
   {
    "tipo": "classificar",
    "id": "cl5",
    "titulo": "401 ou 403?",
    "cats": [
     "401 (não autenticado)",
     "403 (sem permissão)"
    ],
    "itens": [
     [
      "Acessar /painel sem fazer login",
      0
     ],
     [
      "Aluno logado tenta abrir a área do professor",
      1
     ],
     [
      "Token da API ausente ou inválido",
      0
     ],
     [
      "Usuário comum tenta apagar a conta de outro",
      1
     ],
     [
      "Senha digitada errada no login",
      0
     ],
     [
      "Funcionário sem papel admin abre /admin",
      1
     ]
    ]
   },
   {
    "tipo": "classificar",
    "id": "cl5b",
    "titulo": "Boa ou má prática?",
    "cats": [
     "Boa prática",
     "Má prática"
    ],
    "itens": [
     [
      "Guardar o hash da senha com sal",
      0
     ],
     [
      "Guardar a senha em texto puro no banco",
      1
     ],
     [
      "Mensagem “senha incorreta” (revela que o usuário existe)",
      1
     ],
     [
      "Mensagem “usuário ou senha inválidos”",
      0
     ],
     [
      "Secret key escrita no código do GitHub",
      1
     ],
     [
      "Cookie de sessão com HttpOnly e Secure",
      0
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Use a sessão",
    "ev": "pw5:rodou"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de autenticação",
    "ev": "pw5:todos"
   },
   {
    "id": "m3",
    "t": "Diferencie 401 e 403",
    "ev": "vis:cl5"
   },
   {
    "id": "m4",
    "t": "Separe boas e más práticas",
    "ev": "vis:cl5b"
   }
  ],
  "guiados": [
   {
    "titulo": "Rastreando uma sessão",
    "txt": "<p>Mesmo cliente: 1) GET /painel; 2) POST /login (certo); 3) GET /painel; 4) POST /logout; 5) GET /painel.</p>",
    "passos": [
     {
      "p": "Status do 1º acesso ao painel? (200 ou 401)",
      "r": 401,
      "un": "",
      "dica": "Sem login.",
      "expl": "Ainda não há usuário na sessão."
     },
     {
      "p": "Status do 3º acesso? (200 ou 401)",
      "r": 200,
      "un": "",
      "dica": "Já logou.",
      "expl": "O cookie carrega a sessão."
     },
     {
      "p": "Status do 5º acesso? (200 ou 401)",
      "r": 401,
      "un": "",
      "dica": "O logout limpou a sessão.",
      "expl": "session.clear() apaga o usuário."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Por que o HTTP precisa de cookies para login?",
   "Porque é sem estado: não lembra o usuário entre requisições."
  ],
  [
   "O que é um cookie?",
   "Dado que o servidor manda e o navegador reenvia a cada requisição."
  ],
  [
   "O que é <code>session</code> no Flask?",
   "Dicionário por usuário guardado num cookie assinado."
  ],
  [
   "Para que serve a <code>secret_key</code>?",
   "Assinar o cookie de sessão para detectar adulteração."
  ],
  [
   "Diferença entre autenticação e autorização?",
   "Autenticar: quem é você; autorizar: o que você pode fazer."
  ],
  [
   "Por que usar hash de senha?",
   "Se o banco vazar, as senhas originais não aparecem."
  ],
  [
   "O que significa “com sal” (salt)?",
   "Um valor aleatório misturado à senha para que hashes iguais não se repitam."
  ],
  [
   "O que faz o decorator <code>login_required</code>?",
   "Barra a rota quando não há usuário logado."
  ],
  [
   "Quando devolver 401? E 403?",
   "401: sem autenticação; 403: autenticado sem permissão."
  ],
  [
   "O que é CSRF?",
   "Ataque que faz o navegador logado da vítima enviar uma ação sem ela perceber."
  ],
  [
   "Para que serve o atributo HttpOnly?",
   "Impede JavaScript de ler o cookie (reduz roubo por XSS)."
  ],
  [
   "Por que a mensagem de login deve ser genérica?",
   "Para não revelar quais usuários existem."
  ]
 ],
 "vf": [
  [
   "O HTTP guarda o usuário logado automaticamente.",
   false,
   "É sem estado; usa-se cookie."
  ],
  [
   "A sessão do Flask fica guardada no cookie, assinada.",
   true,
   "Com a secret_key."
  ],
  [
   "Sem <code>secret_key</code> é possível usar <code>session</code> normalmente.",
   false,
   "O Flask exige a chave."
  ],
  [
   "Guardar senha em texto puro é aceitável em sistemas pequenos.",
   false,
   "Sempre guarde hash."
  ],
  [
   "<code>check_password_hash</code> compara a senha digitada com o hash.",
   true,
   "Devolve True/False."
  ],
  [
   "401 significa que o usuário está autenticado mas não pode acessar.",
   false,
   "Isso é 403."
  ],
  [
   "Um decorator pode proteger várias rotas sem repetir código.",
   true,
   "login_required."
  ],
  [
   "Basta esconder o botão “Admin” no HTML para proteger a área admin.",
   false,
   "O servidor precisa checar."
  ],
  [
   "<code>session.clear()</code> pode ser usado no logout.",
   true,
   "Apaga os dados da sessão."
  ],
  [
   "O atacante consegue forjar a sessão sem conhecer a secret_key.",
   false,
   "A assinatura quebra."
  ],
  [
   "Cookies enviados em HTTP puro podem ser interceptados na rede.",
   true,
   "Use HTTPS e Secure."
  ],
  [
   "Limitar tentativas de login ajuda a conter força bruta.",
   true,
   "Bloqueio ou atraso progressivo."
  ]
 ],
 "caderno": [
  [
   "Explique, passo a passo, o que acontece do login até o acesso ao painel.",
   "POST /login → servidor valida e grava session → Set-Cookie → navegador reenvia o cookie → servidor lê a sessão → painel liberado."
  ],
  [
   "Escreva o trecho que grava o usuário na sessão após validar a senha.",
   "if check_password_hash(h, senha): session[\"usuario\"] = u"
  ],
  [
   "Escreva o logout.",
   "session.clear(); return redirect(\"/\")"
  ],
  [
   "Escreva um decorator que exija <code>session[\"papel\"] == \"admin\"</code>.",
   "usa wraps; se diferente, return \"proibido\", 403"
  ],
  [
   "Por que <code>check_password_hash</code> é melhor que comparar <code>==</code> com a senha guardada?",
   "Porque a senha não é guardada; compara-se o hash com o sal."
  ],
  [
   "Dê dois riscos de guardar a secret_key no código público.",
   "Qualquer um forja cookies de sessão; atacante assume contas."
  ],
  [
   "O que é sequestro de sessão e como reduzir?",
   "Roubo do cookie; reduzir com HTTPS, HttpOnly, expiração curta e renovar a sessão no login."
  ],
  [
   "Explique CSRF com um exemplo.",
   "Um site malicioso faz o navegador logado enviar POST /transferir; defesa: token CSRF e SameSite."
  ],
  [
   "Quais mensagens de erro de login são boas e ruins?",
   "Boa: “usuário ou senha inválidos”. Ruim: “usuário não existe”."
  ],
  [
   "Quais dados nunca devem ir na sessão em texto aberto?",
   "Senhas, números de cartão e dados sensíveis; guarde só identificadores."
  ]
 ],
 "pbl": [
  {
   "titulo": "Portal do aluno com login",
   "cenario": "<p>O portal da escola precisa de login: o aluno vê suas notas e o professor vê as de toda a turma.</p>",
   "passos": [
    [
     "Que dados guardar na sessão e quais no banco?",
     "Na sessão: id e papel do usuário. No banco: usuários, hashes e notas."
    ],
    [
     "Que decorators criar?",
     "login_required e exige_papel(\"professor\")."
    ],
    [
     "O que fazer se um aluno tentar abrir a nota de outro aluno pela URL?",
     "Conferir no servidor se o id da nota pertence ao usuário e devolver 403."
    ]
   ]
  },
  {
   "titulo": "Vazamento de senhas",
   "cenario": "<p>A equipe descobre que o banco foi copiado por um atacante. As senhas estavam em texto puro e a secret_key estava no GitHub.</p>",
   "passos": [
    [
     "Qual o impacto de cada falha?",
     "Senhas expostas permitem acessar todas as contas; secret_key exposta permite forjar sessões."
    ],
    [
     "O que corrigir primeiro?",
     "Trocar a secret_key (invalida sessões), forçar redefinição de senha e passar a guardar hashes."
    ],
    [
     "Que práticas evitariam isso?",
     "Hash com sal, variáveis de ambiente para segredos, HTTPS e limite de tentativas."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Cookies resolvem a falta de estado do HTTP; session guarda dados assinados.",
    "Senha vira hash; login válido grava o usuário na sessão; logout limpa.",
    "Decorators protegem rotas; 401 = não autenticado, 403 = sem permissão."
   ]
  }
 ],
 "glossario": [
  [
   "Salt (sal)",
   "Valor aleatório misturado à senha antes do hash."
  ],
  [
   "Papel (role)",
   "Perfil de permissões, como aluno ou admin."
  ]
 ]
});
