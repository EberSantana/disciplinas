FSI.modulo({
 "n": 6,
 "unidade": "SQL",
 "nome": "Linguagem SQL",
 "titulo": "SELECT, JOIN, GROUP BY: perguntando ao banco",
 "duracao": "10 h",
 "resumoCurto": "DDL, DML, JOINs, agregação, GROUP BY/HAVING e subconsultas",
 "analogia": {
  "titulo": "Pedir no balcão",
  "txt": "<p>SQL é como fazer um pedido no balcão: você diz <b>o que quer</b> (“os títulos dos romances depois de 1950, do mais novo para o mais antigo”) e não <b>como</b> o atendente deve procurar. O SGBD escolhe o caminho mais rápido. Por isso SQL é uma linguagem <b>declarativa</b>.</p>"
 },
 "chave": [
  "SQL: linguagem padrão ISO/ANSI, declarativa, nascida no System R (IBM).",
  "DDL: CREATE, ALTER, DROP, TRUNCATE. DML: SELECT, INSERT, UPDATE, DELETE.",
  "Ordem do SELECT: SELECT → FROM → JOIN → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT.",
  "INNER JOIN só traz correspondências; LEFT JOIN traz tudo da esquerda.",
  "Agregação: COUNT, SUM, AVG, MAX, MIN. WHERE filtra linhas; HAVING filtra grupos.",
  "Subconsultas podem estar no WHERE, no FROM ou no SELECT (inclusive correlacionadas)."
 ],
 "objetivos": [
  "Escrever consultas com <b>SELECT, WHERE e ORDER BY</b>.",
  "Usar <b>funções de agregação, GROUP BY e HAVING</b>.",
  "Combinar tabelas com <b>INNER e LEFT JOIN</b>.",
  "Alterar dados com <b>INSERT, UPDATE e DELETE</b>."
 ],
 "licoes": [
  {
   "t": "A ordem do SELECT",
   "txt": "<p>Escreve-se nesta ordem: <code>SELECT colunas FROM tabela WHERE condição GROUP BY … HAVING … ORDER BY … LIMIT …</code>. No WHERE valem =, &lt;&gt;, &gt;, BETWEEN, IN, LIKE ('%texto%') e IS NULL.</p>"
  },
  {
   "t": "Agregação e grupos",
   "txt": "<p>COUNT, SUM, AVG, MAX e MIN resumem várias linhas numa. Com <b>GROUP BY</b> o resumo é feito por grupo (por gênero, por turma). <b>WHERE</b> filtra linhas antes de agrupar; <b>HAVING</b> filtra grupos depois.</p>"
  },
  {
   "t": "Junções",
   "txt": "<p><b>INNER JOIN</b> traz só as linhas com correspondência nas duas tabelas; <b>LEFT JOIN</b> traz todas da esquerda, com NULL onde não houver par — ótimo para achar “alunos que nunca pegaram livro”.</p>"
  },
  {
   "t": "Mudando dados",
   "txt": "<p><code>INSERT INTO t (cols) VALUES (…)</code>, <code>UPDATE t SET col = valor WHERE …</code> e <code>DELETE FROM t WHERE …</code>. Atenção: UPDATE e DELETE <b>sem WHERE</b> afetam todas as linhas!</p>"
  }
 ],
 "termos": [
  [
   "WHERE",
   "Filtra linhas."
  ],
  [
   "GROUP BY",
   "Agrupa para resumir."
  ],
  [
   "HAVING",
   "Filtra grupos."
  ],
  [
   "LEFT JOIN",
   "Tudo da esquerda + correspondências."
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
 "visuais": [
  {
   "tipo": "linha",
   "id": "ordem",
   "titulo": "Em que ordem o SGBD processa um SELECT",
   "ordenar": true,
   "passos": [
    {
     "t": "FROM / JOIN",
     "d": "Monta o conjunto de linhas."
    },
    {
     "t": "WHERE",
     "d": "Filtra linhas."
    },
    {
     "t": "GROUP BY",
     "d": "Forma os grupos."
    },
    {
     "t": "HAVING",
     "d": "Filtra grupos."
    },
    {
     "t": "SELECT",
     "d": "Calcula as colunas."
    },
    {
     "t": "ORDER BY",
     "d": "Ordena."
    },
    {
     "t": "LIMIT",
     "d": "Corta o resultado."
    }
   ]
  }
 ],
 "lab": {
  "intro": "O laboratório principal da disciplina: dez desafios na biblioteca, do SELECT simples às junções e alterações. Errou? Leia a mensagem do SGBD, corrija e rode de novo. Depois de duas tentativas, aparece uma solução.",
  "sims": [
   {
    "tipo": "sql",
    "titulo": "Console SQL: dez desafios na biblioteca",
    "cfg": {
     "id": "q6",
     "setup": "PRAGMA foreign_keys = ON;\nCREATE TABLE autor (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, pais TEXT);\nCREATE TABLE livro (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, ano INTEGER, genero TEXT, paginas INTEGER, autor_id INTEGER REFERENCES autor(id));\nCREATE TABLE aluno (ra INTEGER PRIMARY KEY, nome TEXT NOT NULL, turma TEXT, cidade TEXT);\nCREATE TABLE emprestimo (id INTEGER PRIMARY KEY, livro_id INTEGER NOT NULL REFERENCES livro(id), ra INTEGER NOT NULL REFERENCES aluno(ra), data_saida TEXT, devolvido INTEGER DEFAULT 0);\nINSERT INTO autor VALUES (1,'Machado de Assis','Brasil'),(2,'Clarice Lispector','Brasil'),(3,'George Orwell','Reino Unido'),(4,'J. K. Rowling','Reino Unido'),(5,'Conceição Evaristo','Brasil');\nINSERT INTO livro VALUES (1,'Dom Casmurro',1899,'Romance',256,1),(2,'Memórias Póstumas de Brás Cubas',1881,'Romance',368,1),(3,'A Hora da Estrela',1977,'Romance',88,2),(4,'1984',1949,'Ficção científica',416,3),(5,'A Revolução dos Bichos',1945,'Fábula',152,3),(6,'Harry Potter e a Pedra Filosofal',1997,'Fantasia',264,4),(7,'Olhos d''Água',2014,'Contos',116,5),(8,'Ponciá Vicêncio',2003,'Romance',128,5),(9,'O Alienista',1882,'Novela',96,1);\nINSERT INTO aluno VALUES (101,'Ana Souza','1INF','Tobias Barreto'),(102,'Bruno Lima','1INF','Itabaianinha'),(103,'Carla Dias','2DS','Tobias Barreto'),(104,'Davi Santos','2DS','Poço Verde'),(105,'Elisa Rocha','1INF','Tobias Barreto'),(106,'Fábio Nunes','2DS','Lagarto');\nINSERT INTO emprestimo VALUES (1,1,101,'2026-08-03',1),(2,4,101,'2026-09-10',0),(3,6,102,'2026-09-12',0),(4,3,103,'2026-09-15',1),(5,1,104,'2026-10-01',0),(6,7,103,'2026-10-02',0),(7,4,105,'2026-10-05',1),(8,9,102,'2026-10-20',0);",
     "inicial": "SELECT titulo, ano FROM livro ORDER BY ano;",
     "desafios": [
      {
       "p": "Liste o <b>título</b> dos livros do gênero <b>'Romance'</b>.",
       "ref": "SELECT titulo FROM livro WHERE genero = 'Romance';",
       "dica": "WHERE genero = 'Romance' (texto entre aspas simples).",
       "expl": "Filtro com WHERE."
      },
      {
       "p": "Liste <b>título e ano</b> dos livros publicados <b>depois de 1950</b>, do <b>mais novo para o mais antigo</b>.",
       "ref": "SELECT titulo, ano FROM livro WHERE ano > 1950 ORDER BY ano DESC;",
       "dica": "ORDER BY ano DESC",
       "expl": "WHERE + ORDER BY DESC."
      },
      {
       "p": "Liste os <b>nomes</b> dos alunos cujo nome <b>começa com 'B' ou 'C'</b>.",
       "ref": "SELECT nome FROM aluno WHERE nome LIKE 'B%' OR nome LIKE 'C%';",
       "dica": "LIKE 'B%' OR LIKE 'C%'",
       "expl": "% representa qualquer sequência de caracteres."
      },
      {
       "p": "Quantos livros há <b>por gênero</b>? Mostre o gênero e a contagem.",
       "ref": "SELECT genero, COUNT(*) FROM livro GROUP BY genero;",
       "dica": "GROUP BY genero",
       "expl": "Uma linha por grupo."
      },
      {
       "p": "Mostre os gêneros com <b>mais de 1 livro</b> e a quantidade.",
       "ref": "SELECT genero, COUNT(*) FROM livro GROUP BY genero HAVING COUNT(*) > 1;",
       "dica": "HAVING COUNT(*) > 1",
       "expl": "HAVING filtra grupos."
      },
      {
       "p": "Qual a <b>média de páginas</b> dos livros?",
       "ref": "SELECT AVG(paginas) FROM livro;",
       "dica": "AVG(paginas)",
       "expl": "Agregação sem GROUP BY: uma linha só."
      },
      {
       "p": "Liste <b>nome do aluno e título</b> dos empréstimos <b>ainda não devolvidos</b> (devolvido = 0).",
       "ref": "SELECT aluno.nome, livro.titulo FROM emprestimo JOIN aluno ON emprestimo.ra = aluno.ra JOIN livro ON emprestimo.livro_id = livro.id WHERE emprestimo.devolvido = 0;",
       "dica": "Duas junções e WHERE devolvido = 0.",
       "expl": "Junção de três tabelas com filtro."
      },
      {
       "p": "Liste os <b>nomes dos alunos que nunca pegaram livro</b>.",
       "ref": "SELECT aluno.nome FROM aluno LEFT JOIN emprestimo ON aluno.ra = emprestimo.ra WHERE emprestimo.id IS NULL;",
       "dica": "LEFT JOIN … WHERE emprestimo.id IS NULL",
       "expl": "O LEFT JOIN mantém quem não tem par; o NULL denuncia."
      },
      {
       "p": "Cadastre o livro <b>(10, 'Quarto de Despejo', 1960, 'Diário', 200, NULL)</b>.",
       "ref": "INSERT INTO livro VALUES (10,'Quarto de Despejo',1960,'Diário',200,NULL);",
       "verif": "SELECT * FROM livro ORDER BY id;",
       "dica": "INSERT INTO livro VALUES (…);",
       "expl": "Livro de Carolina Maria de Jesus incluído."
      },
      {
       "p": "Marque como <b>devolvido</b> (devolvido = 1) o empréstimo de <b>id 2</b>.",
       "ref": "UPDATE emprestimo SET devolvido = 1 WHERE id = 2;",
       "verif": "SELECT * FROM emprestimo ORDER BY id;",
       "dica": "UPDATE … SET devolvido = 1 WHERE id = 2;",
       "expl": "Sem o WHERE, todos os empréstimos seriam marcados!"
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Filtre com WHERE",
    "ev": "q6:where"
   },
   {
    "id": "m2",
    "t": "Ordene com ORDER BY",
    "ev": "q6:order"
   },
   {
    "id": "m3",
    "t": "Use uma função de agregação",
    "ev": "q6:agregou"
   },
   {
    "id": "m4",
    "t": "Agrupe com GROUP BY",
    "ev": "q6:group"
   },
   {
    "id": "m5",
    "t": "Faça uma junção",
    "ev": "q6:join"
   },
   {
    "id": "m6",
    "t": "Vença 5 desafios",
    "ev": "q6:desafio:5"
   },
   {
    "id": "m7",
    "t": "Vença os 10 desafios",
    "ev": "q6:todos"
   }
  ],
  "guiados": [
   {
    "titulo": "Antes de rodar, preveja",
    "txt": "<p>Antes de rodar no console, preveja o resultado olhando a tabela <b>livro</b> (9 livros). Depois confira rodando a consulta.</p>",
    "passos": [
     {
      "p": "Quantas linhas retorna SELECT * FROM livro WHERE genero = 'Romance'?",
      "r": 4,
      "un": "linhas",
      "dica": "Dom Casmurro, Memórias Póstumas, A Hora da Estrela, Ponciá Vicêncio.",
      "expl": "4 romances (confira no console!)."
     },
     {
      "p": "Quantas linhas retorna SELECT genero, COUNT(*) FROM livro GROUP BY genero?",
      "r": 6,
      "un": "linhas",
      "dica": "Uma por gênero diferente.",
      "expl": "Romance, Ficção científica, Fábula, Fantasia, Contos e Novela: 6 grupos."
     },
     {
      "p": "Quantas linhas uma UPDATE sem WHERE na tabela livro alteraria?",
      "r": 9,
      "un": "linhas",
      "dica": "Todas.",
      "expl": "Todas as 9 — por isso o WHERE é tão importante."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Que comando cria uma tabela?",
   "<code>CREATE TABLE</code>."
  ],
  [
   "Que comando adiciona uma coluna?",
   "<code>ALTER TABLE tabela ADD COLUMN coluna tipo;</code>"
  ],
  [
   "Diferença entre DELETE sem WHERE e DROP TABLE?",
   "DELETE apaga todas as linhas e mantém a tabela; DROP remove a tabela inteira."
  ],
  [
   "Diferença entre CHAR(11) e VARCHAR(11)?",
   "CHAR tem tamanho fixo; VARCHAR guarda até 11 caracteres com tamanho variável."
  ],
  [
   "Para que serve DISTINCT?",
   "Elimina linhas repetidas do resultado."
  ],
  [
   "O que faz INNER JOIN?",
   "Retorna só as linhas com correspondência nas duas tabelas."
  ],
  [
   "O que faz LEFT JOIN?",
   "Retorna todas as linhas da tabela da esquerda e as correspondências da direita (NULL onde não houver)."
  ],
  [
   "COUNT(*) x COUNT(coluna)?",
   "COUNT(*) conta todas as linhas; COUNT(coluna) conta só valores não nulos."
  ],
  [
   "WHERE x HAVING?",
   "WHERE filtra linhas antes da agregação; HAVING filtra grupos depois."
  ],
  [
   "Como ordenar do maior para o menor?",
   "<code>ORDER BY coluna DESC</code>."
  ],
  [
   "O que é subconsulta correlacionada?",
   "Subconsulta que usa valores da consulta externa e roda para cada linha dela."
  ],
  [
   "Para que servem LIMIT e OFFSET?",
   "LIMIT limita a quantidade de linhas; OFFSET pula as primeiras."
  ]
 ],
 "vf": [
  [
   "SQL é uma linguagem procedural em que se diz passo a passo como buscar os dados.",
   false,
   "SQL é declarativa; o otimizador decide como executar."
  ],
  [
   "TRUNCATE pertence à DDL.",
   true,
   "Ele esvazia a tabela redefinindo seu armazenamento, sem condição WHERE."
  ],
  [
   "<code>UPDATE ALUNO SET Nome='Ana';</code> altera apenas um aluno.",
   false,
   "Sem WHERE, o UPDATE altera todas as linhas da tabela."
  ],
  [
   "INNER JOIN mostra alunos sem curso cadastrado.",
   false,
   "Alunos sem correspondência só aparecem com LEFT JOIN."
  ],
  [
   "É correto usar <code>WHERE COUNT(*) > 5</code>.",
   false,
   "Condições sobre agregação vão no HAVING."
  ],
  [
   "Toda coluna do SELECT que não está em função de agregação deve estar no GROUP BY.",
   true,
   "Senão o SGBD não sabe qual valor mostrar para o grupo."
  ],
  [
   "AVG ignora valores NULL no cálculo.",
   true,
   "As funções de agregação (exceto COUNT(*)) desconsideram NULL."
  ],
  [
   "<code>WHERE Nome LIKE 'A%'</code> encontra nomes que terminam com A.",
   false,
   "'A%' encontra nomes que começam com A. Terminar seria '%A'."
  ],
  [
   "CROSS JOIN gera o produto cartesiano.",
   true,
   "Cada linha de uma tabela combina com cada linha da outra."
  ],
  [
   "Uma subconsulta pode ser usada no FROM como tabela derivada.",
   true,
   "Ela precisa de um apelido (alias)."
  ],
  [
   "<code>ON DELETE CASCADE</code> apaga os filhos quando o pai é excluído.",
   true,
   "A exclusão se propaga para os registros dependentes."
  ],
  [
   "O operador IN pode receber o resultado de uma subconsulta.",
   true,
   "Ex.: <code>WHERE CodDepto IN (SELECT CodDepto FROM ...)</code>."
  ]
 ],
 "caderno": [
  [
   "Escreva o CREATE TABLE de CURSO(CodCurso PK, Nome obrigatório, CargaHoraria > 0).",
   "<code>CREATE TABLE CURSO (CodCurso INT PRIMARY KEY, Nome VARCHAR(100) NOT NULL, CargaHoraria INT CHECK (CargaHoraria > 0));</code>"
  ],
  [
   "Insira 2 cursos em um único INSERT.",
   "<code>INSERT INTO CURSO VALUES (1,'Informática',1200),(2,'Edificações',1400);</code>"
  ],
  [
   "Aumente em 10% o salário dos funcionários do departamento 3.",
   "<code>UPDATE FUNCIONARIO SET Salario = Salario * 1.10 WHERE CodDepto = 3;</code>"
  ],
  [
   "Liste nome e email dos alunos em ordem alfabética.",
   "<code>SELECT Nome, Email FROM ALUNO ORDER BY Nome;</code>"
  ],
  [
   "Liste o nome de cada aluno com o nome do seu curso.",
   "<code>SELECT a.Nome, c.Nome FROM ALUNO a INNER JOIN CURSO c ON a.CodCurso = c.CodCurso;</code>"
  ],
  [
   "Mostre a quantidade de alunos por curso, inclusive cursos sem alunos.",
   "<code>SELECT c.Nome, COUNT(a.Matricula) FROM CURSO c LEFT JOIN ALUNO a ON a.CodCurso = c.CodCurso GROUP BY c.Nome;</code>"
  ],
  [
   "Mostre os cursos com mais de 30 alunos.",
   "<code>SELECT CodCurso, COUNT(*) FROM ALUNO GROUP BY CodCurso HAVING COUNT(*) > 30;</code>"
  ],
  [
   "Liste os alunos com nota acima da média geral.",
   "<code>SELECT Nome, Nota FROM ALUNO a JOIN MATRICULA m ON a.Matricula = m.Matricula WHERE m.Nota > (SELECT AVG(Nota) FROM MATRICULA);</code>"
  ],
  [
   "Mostre os 3 produtos mais caros.",
   "<code>SELECT Nome, Preco FROM PRODUTO ORDER BY Preco DESC LIMIT 3;</code>"
  ],
  [
   "Escreva a ordem lógica de execução das cláusulas do SELECT.",
   "FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT."
  ]
 ],
 "pbl": [
  {
   "titulo": "Biblioteca do campus em SQL",
   "cenario": "A biblioteca tem LIVRO(Cod, Titulo, Ano), LEITOR(Mat, Nome) e EMPRESTIMO(Cod, Mat, DataEmp, DataDev). DataDev fica NULL enquanto o livro não volta.",
   "passos": [
    [
     "Liste os livros que estão emprestados agora.",
     "<code>SELECT l.Titulo FROM LIVRO l JOIN EMPRESTIMO e ON e.Cod = l.Cod WHERE e.DataDev IS NULL;</code>"
    ],
    [
     "Quantos empréstimos cada leitor fez?",
     "<code>SELECT le.Nome, COUNT(e.Cod) FROM LEITOR le LEFT JOIN EMPRESTIMO e ON e.Mat = le.Mat GROUP BY le.Nome;</code>"
    ],
    [
     "Quais livros nunca foram emprestados?",
     "<code>SELECT Titulo FROM LIVRO WHERE Cod NOT IN (SELECT Cod FROM EMPRESTIMO);</code>"
    ]
   ]
  },
  {
   "titulo": "O UPDATE que apagou o dia",
   "cenario": "Um estagiário rodou `UPDATE PRODUTO SET Preco = 0;` achando que alteraria só o produto 15. A loja ficou com todos os preços zerados.",
   "passos": [
    [
     "Qual foi o erro?",
     "Faltou a cláusula <code>WHERE Cod = 15</code>; sem ela todas as linhas são atualizadas."
    ],
    [
     "Como ele poderia ter se protegido antes de executar?",
     "Rodar antes um <code>SELECT</code> com o mesmo WHERE, trabalhar dentro de <code>BEGIN</code> e só dar <code>COMMIT</code> após conferir."
    ],
    [
     "Como recuperar a situação?",
     "<code>ROLLBACK</code> se ainda estiver na transação; senão, restaurar do backup ou do log (recuperação point-in-time)."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Consultas",
   "itens": [
    "SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT.",
    "Agregação: COUNT, SUM, AVG, MAX, MIN.",
    "INNER × LEFT JOIN."
   ]
  },
  {
   "t": "Alterações",
   "itens": [
    "INSERT, UPDATE, DELETE.",
    "Sempre WHERE em UPDATE e DELETE."
   ]
  }
 ],
 "glossario": [
  [
   "DISTINCT",
   "Remove repetidos."
  ],
  [
   "LIKE",
   "Busca por padrão com % e _."
  ],
  [
   "IS NULL",
   "Testa ausência de valor."
  ]
 ]
});
