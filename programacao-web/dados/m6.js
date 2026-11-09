FSI.modulo({
 "n": 6,
 "unidade": "Unidade 3",
 "nome": "Banco de dados e DAO",
 "titulo": "Persistir dados com SQL e isolar o acesso em objetos DAO",
 "duracao": "16 h",
 "resumoCurto": "CRUD em SQL, consultas parametrizadas contra SQL injection, o padrão DAO e a integração das rotas com a camada de dados.",
 "analogia": {
  "titulo": "A biblioteca e a bibliotecária",
  "txt": "<p>Os livros ficam guardados na estante (o <b>banco de dados</b>). Você não entra na sala dos fundos para procurar: pede à <b>bibliotecária</b>, que sabe onde tudo está e como registrar empréstimos. Se a biblioteca trocar de prédio, você continua pedindo do mesmo jeito.</p><p>A bibliotecária é o <b>DAO</b> (<i>Data Access Object</i>): o único lugar do código que conversa com o banco. As rotas só pedem: “me dê o produto 3”.</p>"
 },
 "chave": [
  "<b>CRUD:</b> Create (<code>INSERT</code>), Read (<code>SELECT</code>), Update (<code>UPDATE</code>), Delete (<code>DELETE</code>).",
  "Mapa HTTP→SQL: <code>POST</code> cria, <code>GET</code> lê, <code>PUT/PATCH</code> altera, <code>DELETE</code> remove.",
  "<b>Nunca</b> monte SQL concatenando texto do usuário: isso permite <b>SQL injection</b>. Use <b>parâmetros</b> (<code>?</code>).",
  "<b>DAO</b> é uma classe que concentra o acesso aos dados (<code>listar</code>, <code>buscar</code>, <code>inserir</code>, <code>atualizar</code>, <code>remover</code>).",
  "As rotas (controllers) chamam o DAO; trocar de banco muda só o DAO.",
  "Sempre feche/confirme transações (<code>commit</code>) e trate registro inexistente (devolva <code>None</code> e responda 404).",
  "Em Python, o módulo <code>sqlite3</code> acompanha a linguagem e é ótimo para aprender."
 ],
 "objetivos": [
  "Executar <b>CRUD</b> em SQL.",
  "Evitar <b>SQL injection</b> com consultas parametrizadas.",
  "Implementar o padrão <b>DAO</b>.",
  "Ligar rotas, DAO e banco numa API."
 ],
 "licoes": [
  {
   "t": "CRUD em SQL",
   "txt": "<p>As quatro operações básicas:</p><pre><code>INSERT INTO produto (nome, preco, estoque) VALUES ('Régua', 4.5, 30);\nSELECT * FROM produto WHERE preco &lt; 10;\nUPDATE produto SET estoque = estoque - 1 WHERE id = 3;\nDELETE FROM produto WHERE id = 3;</code></pre><p>Atenção ao <code>WHERE</code>: um <code>UPDATE</code> ou <code>DELETE</code> sem ele atinge a tabela inteira. Teste primeiro com <code>SELECT</code>.</p>",
   "pense": "o que acontece com DELETE FROM produto; (sem WHERE)?"
  },
  {
   "t": "SQL injection e consultas parametrizadas",
   "txt": "<p>Veja um código vulnerável:</p><pre><code>nome = request.args[\"nome\"]\nsql = \"SELECT * FROM usuario WHERE nome = '\" + nome + \"'\"\n# se nome = x' OR '1'='1  →  traz TODOS os usuários</code></pre><p>O atacante muda o <b>significado</b> do comando. A defesa é separar o comando dos dados:</p><pre><code>import sqlite3\nbanco = sqlite3.connect(\"loja.db\")\ncur = banco.execute(\"SELECT * FROM usuario WHERE nome = ?\", (nome,))</code></pre><p>O <code>?</code> reserva o lugar do valor; o driver trata o texto como <b>dado</b>, nunca como comando.</p>"
  },
  {
   "t": "O padrão DAO",
   "txt": "<p>Em vez de espalhar SQL pelas rotas, crie uma classe que concentra o acesso:</p><pre><code>class ProdutoDAO:\n    def __init__(self, conexao):\n        self.db = conexao\n\n    def listar(self):\n        return self.db.execute(\"SELECT id, nome, preco FROM produto\").fetchall()\n\n    def buscar(self, id):\n        return self.db.execute(\"SELECT id, nome, preco FROM produto WHERE id = ?\", (id,)).fetchone()\n\n    def inserir(self, nome, preco):\n        cur = self.db.execute(\"INSERT INTO produto (nome, preco) VALUES (?, ?)\", (nome, preco))\n        self.db.commit()\n        return cur.lastrowid</code></pre><p>A rota fica limpa: <code>produto = dao.buscar(id)</code>. Se um dia o banco mudar de SQLite para PostgreSQL, só o DAO muda.</p>"
  },
  {
   "t": "Rotas + DAO na prática",
   "txt": "<p>No laboratório deste módulo o DAO guarda os dados numa lista em memória, com <b>a mesma interface</b> do DAO de banco. Esse é o ponto do padrão: quem usa o DAO não sabe (nem precisa saber) onde os dados ficam.</p><pre><code>dao = ProdutoDAO()\n\n@app.get(\"/produtos/&lt;int:id&gt;\")\ndef ver(id):\n    p = dao.buscar(id)\n    if p is None:\n        abort(404)\n    return p\n\n@app.post(\"/produtos\")\ndef criar():\n    d = request.get_json()\n    if not d or not d.get(\"nome\"):\n        return {\"erro\": \"nome é obrigatório\"}, 400\n    return dao.inserir(d[\"nome\"], d.get(\"preco\", 0)), 201</code></pre><p>Resumindo: validar entrada, chamar o DAO, escolher o status certo.</p>"
  }
 ],
 "termos": [
  [
   "CRUD",
   "Create, Read, Update, Delete."
  ],
  [
   "DAO",
   "Objeto que isola o acesso aos dados."
  ],
  [
   "SQL injection",
   "Ataque que injeta comandos SQL por um campo de entrada."
  ],
  [
   "Consulta parametrizada",
   "SQL com ? e valores separados."
  ],
  [
   "Transação",
   "Conjunto de operações confirmadas (commit) ou desfeitas (rollback)."
  ],
  [
   "lastrowid",
   "Id da última linha inserida."
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
  "intro": "Duas bancadas: um console <b>SQL</b> (CRUD numa loja) e um console <b>Python/Flask</b> para escrever o DAO e ligá-lo às rotas.",
  "sims": [
   {
    "tipo": "sql",
    "titulo": "Console SQL: a loja da escola",
    "instr": "Clique numa tabela à esquerda para ver as colunas. Depois rode comandos e cumpra os desafios.",
    "cfg": {
     "id": "sq6",
     "setup": "CREATE TABLE categoria (id INTEGER PRIMARY KEY, nome TEXT NOT NULL);\nCREATE TABLE produto (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, preco REAL NOT NULL, estoque INTEGER NOT NULL, categoria_id INTEGER);\nCREATE TABLE pedido (id INTEGER PRIMARY KEY, produto_id INTEGER NOT NULL, qtd INTEGER NOT NULL);\nINSERT INTO categoria VALUES (1,'Papelaria'),(2,'Informática'),(3,'Livros');\nINSERT INTO produto VALUES (1,'Caneta',3.5,50,1),(2,'Caderno',18.9,20,1),(3,'Mouse',45,0,2),(4,'Teclado',89.9,8,2),(5,'Dom Casmurro',29.9,5,3),(6,'Grampeador',22,0,1);\nINSERT INTO pedido VALUES (1,1,10),(2,3,1),(3,5,2),(4,1,5);",
     "inicial": "SELECT * FROM produto;",
     "desafios": [
      {
       "p": "<b>Insira</b> o produto <code>Régua</code>, preço 4.5, estoque 30, categoria 1.",
       "ref": "INSERT INTO produto (nome, preco, estoque, categoria_id) VALUES ('Régua', 4.5, 30, 1);",
       "verif": "SELECT nome, preco, estoque, categoria_id FROM produto WHERE nome = 'Régua'",
       "exige": "INSERT",
       "dica": "INSERT INTO produto (colunas) VALUES (valores);",
       "expl": "Create do CRUD."
      },
      {
       "p": "Liste <b>nome e preço</b> dos produtos que custam <b>menos de R$ 25</b>, do mais barato ao mais caro.",
       "ref": "SELECT nome, preco FROM produto WHERE preco < 25 ORDER BY preco;",
       "dica": "WHERE preco < 25 ORDER BY preco.",
       "expl": "Read com filtro e ordenação."
      },
      {
       "p": "Dê <b>10% de desconto</b> nos produtos da categoria 2 (informática).",
       "ref": "UPDATE produto SET preco = preco * 0.9 WHERE categoria_id = 2;",
       "verif": "SELECT nome, ROUND(preco, 2) FROM produto WHERE id <= 6 ORDER BY id",
       "exige": "UPDATE",
       "dica": "UPDATE ... SET preco = preco * 0.9 WHERE ...",
       "expl": "Update do CRUD; o WHERE limita o alvo."
      },
      {
       "p": "<b>Apague</b> os produtos sem estoque (estoque igual a 0).",
       "ref": "DELETE FROM produto WHERE estoque = 0;",
       "verif": "SELECT nome FROM produto WHERE id <= 6 ORDER BY id",
       "exige": "DELETE",
       "dica": "DELETE FROM produto WHERE estoque = 0;",
       "expl": "Delete do CRUD."
      },
      {
       "p": "Mostre o <b>nome do produto</b> e a <b>quantidade</b> de cada pedido (use JOIN com a tabela de pedidos).",
       "ref": "SELECT produto.nome, pedido.qtd FROM pedido JOIN produto ON produto.id = pedido.produto_id;",
       "dica": "JOIN produto ON produto.id = pedido.produto_id.",
       "expl": "O JOIN cruza as tabelas pela chave estrangeira."
      }
     ]
    }
   },
   {
    "tipo": "python",
    "titulo": "Console Flask: DAO e rotas",
    "instr": "Escreva o código com <code>from flask import ...</code> como no Flask de verdade, execute (Ctrl+Enter) e veja a saída. Um servidor de mentira roda aqui no navegador e o <code>app.test_client()</code> envia as requisições.",
    "cfg": {
     "id": "pw6",
     "inicial": "class ProdutoDAO:\n    def __init__(self):\n        self.itens = []\n        self.prox = 1\n\n    def listar(self):\n        return self.itens\n\ndao = ProdutoDAO()\nprint(dao.listar())",
     "entrada": "",
     "desafios": [
      {
       "p": "Complete o <b>DAO</b>: método <code>inserir(nome, preco)</code> que cria um dicionário <code>{\"id\", \"nome\", \"preco\"}</code> (ids 1, 2, 3…), guarda e devolve. Insira <code>caneta</code> (3.5) e <code>lápis</code> (2) e imprima <code>listar()</code>.",
       "ref": "class ProdutoDAO:\n    def __init__(self):\n        self.itens = []\n        self.prox = 1\n\n    def listar(self):\n        return self.itens\n\n    def inserir(self, nome, preco):\n        p = {\"id\": self.prox, \"nome\": nome, \"preco\": preco}\n        self.prox += 1\n        self.itens.append(p)\n        return p\n\ndao = ProdutoDAO()\ndao.inserir(\"caneta\", 3.5)\ndao.inserir(\"lápis\", 2)\nprint(dao.listar())",
       "testes": [
        ""
       ],
       "exige": [
        "class\\s+ProdutoDAO",
        "def\\s+inserir"
       ],
       "dica": "Use um contador para o id.",
       "expl": "O DAO decide como os dados são guardados."
      },
      {
       "p": "Acrescente <code>buscar(id)</code> (devolve o item ou <code>None</code>) e <code>remover(id)</code> (devolve <code>True</code> se removeu, <code>False</code> se não existia). Leia um id; imprima <code>buscar</code> e depois <code>remover</code> desse id.",
       "ref": "class ProdutoDAO:\n    def __init__(self):\n        self.itens = [{\"id\": 1, \"nome\": \"caneta\"}, {\"id\": 2, \"nome\": \"lápis\"}]\n\n    def buscar(self, id):\n        for p in self.itens:\n            if p[\"id\"] == id:\n                return p\n        return None\n\n    def remover(self, id):\n        p = self.buscar(id)\n        if p is None:\n            return False\n        self.itens.remove(p)\n        return True\n\ndao = ProdutoDAO()\nn = int(input())\nprint(dao.buscar(n))\nprint(dao.remover(n))",
       "testes": [
        "1",
        "2",
        "9"
       ],
       "exige": [
        "def\\s+buscar",
        "def\\s+remover"
       ],
       "dica": "Percorra a lista; sem achar, devolva None.",
       "expl": "None indica “não existe”; a rota traduz para 404."
      },
      {
       "p": "Ligue o DAO a uma rota: <code>GET /produtos/&lt;int:id&gt;</code> devolve o item (JSON) ou 404. Itens: <code>{1: caneta, 2: lápis}</code> (use uma classe DAO). Leia um id e imprima o status e o <code>get_json(silent=True)</code> (que dá <code>None</code> quando o corpo não é JSON).",
       "ref": "from flask import Flask, abort\napp = Flask(__name__)\n\nclass ProdutoDAO:\n    def __init__(self):\n        self.itens = {1: {\"id\": 1, \"nome\": \"caneta\"}, 2: {\"id\": 2, \"nome\": \"lápis\"}}\n    def buscar(self, id):\n        return self.itens.get(id)\n\ndao = ProdutoDAO()\n\n@app.get(\"/produtos/<int:id>\")\ndef ver(id):\n    p = dao.buscar(id)\n    if p is None:\n        abort(404)\n    return p\n\nr = app.test_client().get(\"/produtos/\" + input())\nprint(r.status_code, r.get_json(silent=True))",
       "testes": [
        "1",
        "2",
        "7"
       ],
       "exige": [
        "class\\s+\\w*DAO",
        "abort|404"
       ],
       "dica": "p = dao.buscar(id); if p is None: abort(404).",
       "expl": "Controller leve; o DAO faz o trabalho."
      },
      {
       "p": "Crie <code>POST /produtos</code> que lê o JSON (<code>nome</code>, <code>preco</code>), valida (nome obrigatório → 400 com <code>{\"erro\": ...}</code>) e usa um DAO para inserir (201 + item criado). Leia o nome (pode ser vazio), envie o POST e imprima status e JSON.",
       "ref": "from flask import Flask, request\napp = Flask(__name__)\n\nclass ProdutoDAO:\n    def __init__(self):\n        self.itens = []\n    def inserir(self, nome, preco):\n        p = {\"id\": len(self.itens) + 1, \"nome\": nome, \"preco\": preco}\n        self.itens.append(p)\n        return p\n\ndao = ProdutoDAO()\n\n@app.post(\"/produtos\")\ndef criar():\n    d = request.get_json(silent=True) or {}\n    if not d.get(\"nome\"):\n        return {\"erro\": \"nome é obrigatório\"}, 400\n    return dao.inserir(d[\"nome\"], d.get(\"preco\", 0)), 201\n\nn = input()\nr = app.test_client().post(\"/produtos\", json={\"nome\": n, \"preco\": 5})\nprint(r.status_code, r.get_json())",
       "testes": [
        "lápis",
        "",
        "cola"
       ],
       "exige": [
        "class\\s+\\w*DAO",
        "201"
       ],
       "dica": "400 antes de inserir; 201 depois.",
       "expl": "Validar → DAO → status."
      },
      {
       "p": "Evite <b>SQL injection</b>: escreva <code>montar_consulta(nome)</code> que devolve a tupla <code>(\"SELECT * FROM usuario WHERE nome = ?\", (nome,))</code>. Leia um nome e imprima o SQL e os parâmetros (sem o nome dentro do SQL).",
       "ref": "def montar_consulta(nome):\n    return (\"SELECT * FROM usuario WHERE nome = ?\", (nome,))\n\nsql, params = montar_consulta(input())\nprint(sql)\nprint(params)",
       "testes": [
        "ana",
        "x' OR '1'='1"
       ],
       "exige": [
        "\\?"
       ],
       "dica": "O ? fica no SQL; o valor vai na tupla.",
       "expl": "O texto do usuário nunca entra no comando."
      }
     ],
     "pre": "web"
    }
   },
   {
    "tipo": "classificar",
    "id": "cl6",
    "titulo": "Seguro ou vulnerável a SQL injection?",
    "cats": [
     "Seguro",
     "Vulnerável"
    ],
    "itens": [
     [
      "cur.execute(\"SELECT * FROM u WHERE id = ?\", (id,))",
      0
     ],
     [
      "cur.execute(\"SELECT * FROM u WHERE nome = '\" + nome + \"'\")",
      1
     ],
     [
      "cur.execute(f\"DELETE FROM u WHERE id = {id}\") com id vindo da URL",
      1
     ],
     [
      "cur.execute(\"INSERT INTO u (nome) VALUES (?)\", (nome,))",
      0
     ],
     [
      "Montar o ORDER BY com texto vindo do usuário sem validar",
      1
     ],
     [
      "Validar o tipo (int) e usar ? na consulta",
      0
     ]
    ]
   },
   {
    "tipo": "classificar",
    "id": "cl6b",
    "titulo": "Do HTTP ao SQL",
    "cats": [
     "INSERT",
     "SELECT",
     "UPDATE",
     "DELETE"
    ],
    "itens": [
     [
      "POST /produtos",
      0
     ],
     [
      "GET /produtos/3",
      1
     ],
     [
      "PUT /produtos/3",
      2
     ],
     [
      "DELETE /produtos/3",
      3
     ],
     [
      "GET /produtos?preco_max=10",
      1
     ],
     [
      "PATCH /produtos/3 (muda o estoque)",
      2
     ],
     [
      "POST /pedidos",
      0
     ],
     [
      "DELETE /carrinho/itens/9",
      3
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Faça o CRUD em SQL",
    "ev": "sq6:todos"
   },
   {
    "id": "m2",
    "t": "Crie sua classe DAO",
    "ev": "pw6:class"
   },
   {
    "id": "m3",
    "t": "Cumpra os 5 desafios do DAO",
    "ev": "pw6:todos"
   },
   {
    "id": "m4",
    "t": "Reconheça SQL injection",
    "ev": "vis:cl6"
   },
   {
    "id": "m5",
    "t": "Mapeie HTTP → SQL",
    "ev": "vis:cl6b"
   }
  ],
  "guiados": [
   {
    "titulo": "Prevendo o efeito do SQL",
    "txt": "<p>Tabela produto com 6 linhas. <code>DELETE FROM produto WHERE estoque = 0;</code> apaga 2 (Mouse e Grampeador).</p>",
    "passos": [
     {
      "p": "Quantos produtos restam?",
      "r": 4,
      "un": "",
      "dica": "6 − 2.",
      "expl": "Restam 4."
     },
     {
      "p": "E se o comando fosse DELETE FROM produto; (sem WHERE)?",
      "r": 0,
      "un": "",
      "dica": "Sem filtro.",
      "expl": "Apaga todas as linhas."
     },
     {
      "p": "Qual comando usar antes, para conferir quais seriam apagados?",
      "r": "SELECT",
      "un": "",
      "dica": "Mesmo WHERE, outro comando.",
      "expl": "SELECT * FROM produto WHERE estoque = 0 mostra o alvo."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que significa CRUD?",
   "Create, Read, Update, Delete."
  ],
  [
   "Que comando SQL corresponde a “criar”?",
   "<code>INSERT</code>."
  ],
  [
   "Por que <code>UPDATE</code> e <code>DELETE</code> quase sempre levam <code>WHERE</code>?",
   "Sem ele, atingem todas as linhas da tabela."
  ],
  [
   "O que é SQL injection?",
   "Ataque em que o texto do usuário altera o comando SQL."
  ],
  [
   "Como evitar SQL injection?",
   "Consultas parametrizadas: <code>?</code> no SQL e valores à parte."
  ],
  [
   "O que é o padrão DAO?",
   "Classe que concentra o acesso ao banco, isolando-o do resto."
  ],
  [
   "Qual a vantagem do DAO?",
   "Trocar o banco muda só o DAO; as rotas não mudam."
  ],
  [
   "O que faz <code>commit</code>?",
   "Confirma as alterações da transação."
  ],
  [
   "O que faz <code>rollback</code>?",
   "Desfaz a transação em andamento."
  ],
  [
   "O que a rota deve fazer quando o DAO devolve <code>None</code>?",
   "Responder 404."
  ],
  [
   "Para que serve <code>lastrowid</code>?",
   "Descobrir o id gerado no último INSERT."
  ],
  [
   "Que verbo HTTP costuma levar a um <code>SELECT</code>?",
   "GET."
  ]
 ],
 "vf": [
  [
   "Concatenar texto do usuário no SQL é seguro se o texto parece comum.",
   false,
   "Qualquer concatenação é vulnerável."
  ],
  [
   "Em <code>WHERE nome = ?</code>, o <code>?</code> é preenchido com um valor tratado como dado.",
   true,
   "O driver separa comando e dado."
  ],
  [
   "O DAO deve conter a lógica de exibição HTML.",
   false,
   "Ele só cuida de dados."
  ],
  [
   "As rotas podem chamar o DAO sem conhecer o SQL.",
   true,
   "É o objetivo do padrão."
  ],
  [
   "<code>DELETE FROM produto;</code> apaga todas as linhas.",
   true,
   "Sem WHERE."
  ],
  [
   "<code>INSERT</code> retorna sempre o registro completo.",
   false,
   "Devolve o id (lastrowid); busque depois, se precisar."
  ],
  [
   "Uma busca que não encontra o registro deve devolver status 200 com corpo vazio.",
   false,
   "O correto é 404."
  ],
  [
   "POST de criação costuma devolver 201.",
   true,
   "Created."
  ],
  [
   "Trocar de banco de dados exige mexer em todas as rotas se houver DAO.",
   false,
   "Só o DAO muda."
  ],
  [
   "Senhas devem ser guardadas em texto puro na tabela de usuários.",
   false,
   "Guarde o hash."
  ],
  [
   "Transações servem para agrupar operações que devem ocorrer juntas.",
   true,
   "Tudo ou nada."
  ],
  [
   "<code>sqlite3</code> é um módulo da biblioteca padrão do Python.",
   true,
   "Não precisa instalar."
  ]
 ],
 "caderno": [
  [
   "Escreva o SQL para cadastrar o produto Borracha (1.5, estoque 10).",
   "INSERT INTO produto (nome, preco, estoque) VALUES ('Borracha', 1.5, 10);"
  ],
  [
   "Escreva o SQL para listar produtos com estoque abaixo de 5.",
   "SELECT * FROM produto WHERE estoque &lt; 5;"
  ],
  [
   "Escreva o SQL para zerar o estoque do produto 4.",
   "UPDATE produto SET estoque = 0 WHERE id = 4;"
  ],
  [
   "Mostre um ataque de SQL injection num login.",
   "Usuário: x' OR '1'='1 → a condição vira sempre verdadeira e o login passa."
  ],
  [
   "Reescreva com parâmetros: <code>\"SELECT * FROM u WHERE email='\" + e + \"'\"</code>.",
   "cur.execute(\"SELECT * FROM u WHERE email = ?\", (e,))"
  ],
  [
   "Liste os métodos de um <code>ClienteDAO</code> básico.",
   "listar, buscar, inserir, atualizar, remover."
  ],
  [
   "O que o DAO devolve para uma busca sem resultado e como a rota reage?",
   "None; a rota responde 404."
  ],
  [
   "Desenhe o fluxo de POST /produtos até o banco.",
   "Cliente → rota (valida) → DAO.inserir → INSERT no banco → id → rota responde 201 com o item."
  ],
  [
   "Por que não colocar SQL dentro das rotas?",
   "Mistura responsabilidades, repete código e dificulta trocar/testar o banco."
  ],
  [
   "Quando usar rollback?",
   "Quando algo falha no meio de uma transação, para não gravar parte dos dados."
  ]
 ],
 "pbl": [
  {
   "titulo": "Estoque da cantina",
   "cenario": "<p>A cantina da escola anota o estoque em papel e perde o controle. Você vai criar uma API de estoque com banco de dados.</p>",
   "passos": [
    [
     "Que tabelas e colunas criar?",
     "produto(id, nome, preco, estoque) e, depois, movimentacao(id, produto_id, qtd, data)."
    ],
    [
     "Que métodos tem o ProdutoDAO?",
     "listar, buscar, inserir, atualizar_estoque, remover."
    ],
    [
     "Como impedir estoque negativo?",
     "Validar na rota/model antes do UPDATE e devolver 400 se a baixa for maior que o estoque."
    ]
   ]
  },
  {
   "titulo": "Ataque ao login",
   "cenario": "<p>Em um sistema, o login montava o SQL por concatenação. Um aluno entrou como administrador digitando uma frase estranha no campo de usuário.</p>",
   "passos": [
    [
     "Explique o que aconteceu.",
     "O texto digitado virou parte do comando SQL e tornou a condição sempre verdadeira (SQL injection)."
    ],
    [
     "Como corrigir o código?",
     "Usar consulta parametrizada (?) e comparar o hash da senha."
    ],
    [
     "Que outras proteções adicionar?",
     "Mínimo privilégio no usuário do banco, validação de entrada e registro de tentativas suspeitas."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "CRUD = INSERT, SELECT, UPDATE, DELETE; sempre cuidado com o WHERE.",
    "Parâmetros (?) impedem SQL injection.",
    "DAO isola o acesso aos dados; a rota valida, chama o DAO e escolhe o status."
   ]
  }
 ],
 "glossario": [
  [
   "Parâmetro (?)",
   "Marcador de valor numa consulta SQL."
  ],
  [
   "Mínimo privilégio",
   "Dar ao sistema só as permissões de que precisa."
  ]
 ]
});
