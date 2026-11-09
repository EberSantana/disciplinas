FSI.modulo({
 "n": 10,
 "unidade": "Aprofundamento",
 "nome": "Consultas complexas, visões e gatilhos",
 "titulo": "Subconsultas, CTEs, visões e triggers",
 "duracao": "4 h",
 "resumoCurto": "CTEs, recursão, window functions, views e triggers",
 "analogia": {
  "titulo": "Atalhos e alarmes",
  "txt": "<p>Uma <b>visão</b> é um atalho: você salva uma consulta complicada com um nome e a usa como se fosse tabela. Um <b>gatilho</b> (trigger) é um alarme: sempre que algo acontece numa tabela, ele dispara uma ação sozinho, como registrar quem alterou o quê.</p>"
 },
 "chave": [
  "CTE: consulta nomeada temporária com WITH; melhora a leitura.",
  "CTE recursiva (WITH RECURSIVE): âncora + UNION ALL + parte recursiva, para hierarquias.",
  "Window functions usam OVER() e calculam sem colapsar linhas: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD.",
  "View: tabela virtual definida por consulta; views materializadas guardam o resultado e precisam de REFRESH.",
  "Trigger: função + CREATE TRIGGER; BEFORE, AFTER ou INSTEAD OF; FOR EACH ROW ou STATEMENT.",
  "OLD e NEW guardam os valores antes e depois; TG_OP informa a operação."
 ],
 "objetivos": [
  "Escrever <b>subconsultas</b> e <b>CTEs</b>.",
  "Criar e usar uma <b>VIEW</b>.",
  "Explicar o funcionamento de um <b>trigger</b>."
 ],
 "licoes": [
  {
   "t": "Subconsultas e CTEs",
   "txt": "<p>Subconsulta é um SELECT dentro de outro (no WHERE, no FROM ou no SELECT). A <b>CTE</b> (<code>WITH nome AS (…)</code>) dá nome a uma subconsulta e deixa a leitura mais clara.</p>"
  },
  {
   "t": "Visões e gatilhos",
   "txt": "<p><code>CREATE VIEW v AS SELECT …</code> cria uma tabela virtual. Um trigger roda BEFORE, AFTER ou INSTEAD OF um INSERT/UPDATE/DELETE, com acesso aos valores OLD e NEW.</p>"
  }
 ],
 "termos": [
  [
   "Subconsulta",
   "SELECT dentro de SELECT."
  ],
  [
   "CTE",
   "Subconsulta nomeada (WITH)."
  ],
  [
   "View",
   "Tabela virtual."
  ],
  [
   "Trigger",
   "Ação automática num evento."
  ]
 ],
 "ler": [
  [
   "Apostila interativa de Banco de Dados",
   "apostila.html"
  ],
  [
   "Console de estudo (13 módulos, com SQL)",
   "console-de-estudo.html"
  ]
 ],
 "visuais": [],
 "lab": {
  "intro": "Consultas avançadas na biblioteca.",
  "sims": [
   {
    "tipo": "sql",
    "titulo": "Console SQL: consultas avançadas",
    "cfg": {
     "id": "q10",
     "setup": "PRAGMA foreign_keys = ON;\nCREATE TABLE autor (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, pais TEXT);\nCREATE TABLE livro (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, ano INTEGER, genero TEXT, paginas INTEGER, autor_id INTEGER REFERENCES autor(id));\nCREATE TABLE aluno (ra INTEGER PRIMARY KEY, nome TEXT NOT NULL, turma TEXT, cidade TEXT);\nCREATE TABLE emprestimo (id INTEGER PRIMARY KEY, livro_id INTEGER NOT NULL REFERENCES livro(id), ra INTEGER NOT NULL REFERENCES aluno(ra), data_saida TEXT, devolvido INTEGER DEFAULT 0);\nINSERT INTO autor VALUES (1,'Machado de Assis','Brasil'),(2,'Clarice Lispector','Brasil'),(3,'George Orwell','Reino Unido'),(4,'J. K. Rowling','Reino Unido'),(5,'Conceição Evaristo','Brasil');\nINSERT INTO livro VALUES (1,'Dom Casmurro',1899,'Romance',256,1),(2,'Memórias Póstumas de Brás Cubas',1881,'Romance',368,1),(3,'A Hora da Estrela',1977,'Romance',88,2),(4,'1984',1949,'Ficção científica',416,3),(5,'A Revolução dos Bichos',1945,'Fábula',152,3),(6,'Harry Potter e a Pedra Filosofal',1997,'Fantasia',264,4),(7,'Olhos d''Água',2014,'Contos',116,5),(8,'Ponciá Vicêncio',2003,'Romance',128,5),(9,'O Alienista',1882,'Novela',96,1);\nINSERT INTO aluno VALUES (101,'Ana Souza','1INF','Tobias Barreto'),(102,'Bruno Lima','1INF','Itabaianinha'),(103,'Carla Dias','2DS','Tobias Barreto'),(104,'Davi Santos','2DS','Poço Verde'),(105,'Elisa Rocha','1INF','Tobias Barreto'),(106,'Fábio Nunes','2DS','Lagarto');\nINSERT INTO emprestimo VALUES (1,1,101,'2026-08-03',1),(2,4,101,'2026-09-10',0),(3,6,102,'2026-09-12',0),(4,3,103,'2026-09-15',1),(5,1,104,'2026-10-01',0),(6,7,103,'2026-10-02',0),(7,4,105,'2026-10-05',1),(8,9,102,'2026-10-20',0);",
     "inicial": "SELECT titulo FROM livro WHERE paginas > (SELECT AVG(paginas) FROM livro);",
     "desafios": [
      {
       "p": "Títulos dos livros com <b>mais páginas que a média</b>.",
       "ref": "SELECT titulo FROM livro WHERE paginas > (SELECT AVG(paginas) FROM livro);",
       "dica": "Subconsulta no WHERE.",
       "expl": "A subconsulta calcula a média primeiro."
      },
      {
       "p": "Crie a visão <b>pendentes</b> com nome do aluno e título dos empréstimos não devolvidos.",
       "ref": "CREATE VIEW pendentes AS SELECT aluno.nome, livro.titulo FROM emprestimo JOIN aluno ON emprestimo.ra = aluno.ra JOIN livro ON emprestimo.livro_id = livro.id WHERE devolvido = 0;",
       "verif": "SELECT * FROM pendentes;",
       "dica": "CREATE VIEW pendentes AS SELECT …",
       "expl": "Agora SELECT * FROM pendentes funciona como tabela."
      },
      {
       "p": "Usando uma CTE, liste os <b>autores com mais de 1 livro</b> (nome).",
       "ref": "WITH c AS (SELECT autor_id, COUNT(*) n FROM livro GROUP BY autor_id) SELECT autor.nome FROM c JOIN autor ON c.autor_id = autor.id WHERE c.n > 1;",
       "dica": "WITH c AS (SELECT autor_id, COUNT(*) n …) SELECT …",
       "expl": "A CTE organiza o raciocínio em partes."
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Crie uma visão",
    "ev": "q10:view"
   },
   {
    "id": "m2",
    "t": "Vença os 3 desafios avançados",
    "ev": "q10:todos"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que é uma CTE?",
   "Uma consulta nomeada temporária, definida com WITH e usada na consulta principal."
  ],
  [
   "Para que serve WITH RECURSIVE?",
   "Para percorrer estruturas hierárquicas, como organogramas e categorias aninhadas."
  ],
  [
   "Quais as partes de uma CTE recursiva?",
   "Âncora (ponto de partida), UNION ALL e a parte recursiva que referencia a própria CTE."
  ],
  [
   "O que é uma window function?",
   "Função que calcula sobre um conjunto de linhas relacionado à linha atual, sem agrupá-las."
  ],
  [
   "RANK x DENSE_RANK?",
   "Em empates, RANK pula posições (1,1,3); DENSE_RANK não pula (1,1,2)."
  ],
  [
   "O que fazem LAG e LEAD?",
   "Acessam o valor da linha anterior (LAG) ou seguinte (LEAD)."
  ],
  [
   "O que é uma view?",
   "Tabela virtual definida por uma consulta armazenada."
  ],
  [
   "O que é view materializada?",
   "View que guarda fisicamente o resultado; precisa de REFRESH."
  ],
  [
   "Cite 3 vantagens das views.",
   "Segurança, simplificação, independência lógica e reutilização."
  ],
  [
   "Quando usar trigger INSTEAD OF?",
   "Para tornar views complexas atualizáveis, substituindo a operação original."
  ],
  [
   "O que representam OLD e NEW?",
   "OLD: valores antes (UPDATE/DELETE). NEW: valores novos (INSERT/UPDATE)."
  ],
  [
   "FOR EACH ROW x FOR EACH STATEMENT?",
   "ROW dispara uma vez por linha afetada; STATEMENT uma vez por comando."
  ]
 ],
 "vf": [
  [
   "Uma CTE fica gravada no banco como uma view.",
   false,
   "A CTE existe só durante a execução daquela consulta."
  ],
  [
   "Window functions reduzem o número de linhas como o GROUP BY.",
   false,
   "Elas mantêm todas as linhas e acrescentam o cálculo."
  ],
  [
   "ROW_NUMBER gera números sem repetição, mesmo em empates.",
   true,
   "Cada linha recebe um número sequencial único."
  ],
  [
   "Uma view comum armazena os dados fisicamente.",
   false,
   "Só a view materializada armazena; a comum é recalculada a cada consulta."
  ],
  [
   "Views podem esconder colunas sensíveis, como salário.",
   true,
   "Dá-se acesso à view e não à tabela base."
  ],
  [
   "Trigger AFTER é o mais indicado para auditoria.",
   true,
   "Registra a operação depois que ela foi efetivada."
  ],
  [
   "Em um trigger de DELETE, o registro NEW está disponível.",
   false,
   "No DELETE só existe OLD."
  ],
  [
   "<code>AVG(Vendas) OVER (ORDER BY Mes ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)</code> calcula média móvel de 3 meses.",
   true,
   "A janela pega a linha atual e as duas anteriores."
  ],
  [
   "Uma CTE recursiva sem condição de parada pode entrar em laço infinito.",
   true,
   "A parte recursiva deve deixar de gerar linhas em algum momento."
  ],
  [
   "REFRESH MATERIALIZED VIEW atualiza os dados da view materializada.",
   true,
   "Recalcula e grava o resultado de novo."
  ],
  [
   "Triggers tornam o banco mais rápido em qualquer situação.",
   false,
   "Eles acrescentam processamento a cada operação; o uso deve ser criterioso."
  ],
  [
   "PARTITION BY dentro do OVER divide as linhas em grupos para o cálculo.",
   true,
   "Ex.: ranking de alunos dentro de cada turma."
  ]
 ],
 "caderno": [
  [
   "Escreva uma CTE que calcule o total vendido por produto e mostre os 5 maiores.",
   "<code>WITH vp AS (SELECT CodProd, SUM(Qtd) AS Total FROM ITEM_PEDIDO GROUP BY CodProd) SELECT * FROM vp ORDER BY Total DESC LIMIT 5;</code>"
  ],
  [
   "Escreva uma CTE recursiva que liste a hierarquia de FUNCIONARIO(Matricula, Nome, Gerente).",
   "<code>WITH RECURSIVE h AS (SELECT Matricula, Nome, 1 AS Nivel FROM FUNCIONARIO WHERE Gerente IS NULL UNION ALL SELECT f.Matricula, f.Nome, h.Nivel+1 FROM FUNCIONARIO f JOIN h ON f.Gerente = h.Matricula) SELECT * FROM h;</code>"
  ],
  [
   "Faça o ranking de alunos por nota dentro de cada turma.",
   "<code>SELECT Nome, Turma, Nota, RANK() OVER (PARTITION BY Turma ORDER BY Nota DESC) FROM ALUNO;</code>"
  ],
  [
   "Mostre a venda de cada mês e a diferença para o mês anterior.",
   "<code>SELECT Mes, Vendas, Vendas - LAG(Vendas) OVER (ORDER BY Mes) AS Dif FROM VENDAS_MENSAIS;</code>"
  ],
  [
   "Dadas as notas 9, 9, 8, escreva o resultado de ROW_NUMBER, RANK e DENSE_RANK.",
   "ROW_NUMBER: 1,2,3. RANK: 1,1,3. DENSE_RANK: 1,1,2."
  ],
  [
   "Crie uma view com alunos aprovados (nota >= 7).",
   "<code>CREATE VIEW v_aprovados AS SELECT a.Nome, m.Nota FROM ALUNO a JOIN MATRICULA m ON a.RA = m.RA WHERE m.Nota >= 7;</code>"
  ],
  [
   "Crie uma view de FUNCIONARIO sem a coluna salário para o setor de recepção.",
   "<code>CREATE VIEW v_func_publico AS SELECT Matricula, Nome, Ramal FROM FUNCIONARIO;</code> e <code>GRANT SELECT ON v_func_publico TO recepcao;</code>"
  ],
  [
   "Compare view comum e view materializada em 3 aspectos.",
   "Armazenamento (não x sim), atualização (sempre atual x precisa de REFRESH), desempenho (recalcula x leitura rápida)."
  ],
  [
   "Escreva a estrutura (sintaxe) de um CREATE TRIGGER no PostgreSQL.",
   "<code>CREATE TRIGGER nome {BEFORE|AFTER|INSTEAD OF} {INSERT|UPDATE|DELETE} ON tabela FOR EACH {ROW|STATEMENT} EXECUTE FUNCTION fn();</code>"
  ],
  [
   "Dê 3 usos de triggers em um sistema escolar.",
   "Auditar mudanças de nota, impedir matrícula acima do limite, atualizar a média do aluno automaticamente."
  ]
 ],
 "pbl": [
  {
   "titulo": "Sistema de auditoria de notas",
   "cenario": "Houve alteração suspeita de notas no sistema acadêmico. A direção quer saber quem mudou, quando e qual era o valor anterior.",
   "passos": [
    [
     "Que tabela de log criar?",
     "LOG_NOTA(Id, RA, CodDisc, NotaAntiga, NotaNova, Usuario, DataHora)."
    ],
    [
     "Que tipo de trigger usar?",
     "AFTER UPDATE ON MATRICULA FOR EACH ROW, gravando OLD.Nota, NEW.Nota, <code>current_user</code> e <code>now()</code>."
    ],
    [
     "Como impedir que o próprio log seja alterado?",
     "Dar só INSERT à função/trigger e nenhum UPDATE/DELETE aos usuários na tabela de log."
    ]
   ]
  },
  {
   "titulo": "Painel de desempenho da turma",
   "cenario": "O professor quer um painel com a posição de cada aluno na turma, a média da turma ao lado de cada nota e a evolução entre bimestres.",
   "passos": [
    [
     "Como mostrar a posição sem perder as linhas?",
     "<code>RANK() OVER (PARTITION BY Turma ORDER BY Nota DESC)</code>."
    ],
    [
     "Como colocar a média da turma em cada linha?",
     "<code>AVG(Nota) OVER (PARTITION BY Turma)</code>."
    ],
    [
     "Como disponibilizar o painel de forma simples e segura?",
     "Criar uma view com essa consulta e dar SELECT apenas na view ao professor."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Avançado",
   "itens": [
    "Subconsultas e CTEs.",
    "Views (e materializadas).",
    "Triggers com OLD/NEW."
   ]
  }
 ],
 "glossario": [
  [
   "Window function",
   "Cálculo sobre janelas de linhas (OVER)."
  ]
 ]
});
