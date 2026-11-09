FSI.modulo({
 "n": 8,
 "unidade": "Implementação",
 "nome": "Integridade",
 "titulo": "O banco que diz não: restrições de integridade",
 "duracao": "4 h",
 "resumoCurto": "Domínio, entidade, referencial, semântica, constraints e triggers",
 "analogia": {
  "titulo": "O porteiro do banco",
  "txt": "<p>As restrições são o porteiro do banco: não deixam entrar livro sem título (NOT NULL), dois alunos com o mesmo RA (PRIMARY KEY), empréstimo para aluno que não existe (FOREIGN KEY) nem livro com −30 páginas (CHECK). Quando o porteiro recusa, o SGBD devolve um <b>erro</b> — e isso é bom!</p>"
 },
 "chave": [
  "Integridade: precisão, consistência e confiabilidade dos dados ao longo do tempo.",
  "Domínio: tipo, CHECK, NOT NULL, DEFAULT, enumeração.",
  "Entidade: PK única e não nula.",
  "Referencial: FK válida ou NULL; ações RESTRICT, CASCADE, SET NULL, SET DEFAULT.",
  "Semântica: regras de negócio complexas, via triggers, procedures ou aplicação.",
  "Assertions existem no padrão SQL, mas poucos SGBDs implementam; usa-se trigger."
 ],
 "objetivos": [
  "Aplicar restrições de <b>domínio, entidade e referencial</b>.",
  "Prever o que o SGBD faz ao <b>violar</b> uma restrição.",
  "Escolher ações <b>CASCADE, RESTRICT e SET NULL</b>."
 ],
 "licoes": [
  {
   "t": "Tipos de integridade",
   "txt": "",
   "pontos": [
    "<b>Domínio</b>: tipo, NOT NULL, CHECK, DEFAULT.",
    "<b>Entidade</b>: PK única e não nula.",
    "<b>Referencial</b>: FK aponta para PK existente (ou é NULL).",
    "<b>Semântica</b>: regras de negócio, por triggers ou pela aplicação."
   ]
  },
  {
   "t": "Ações referenciais",
   "txt": "<p>Ao apagar um autor que tem livros: <b>RESTRICT</b> recusa; <b>CASCADE</b> apaga os livros junto; <b>SET NULL</b> deixa autor_id vazio; <b>SET DEFAULT</b> põe um valor padrão.</p>"
  }
 ],
 "termos": [
  [
   "CHECK",
   "Condição que o valor deve cumprir."
  ],
  [
   "NOT NULL",
   "Valor obrigatório."
  ],
  [
   "CASCADE",
   "Propaga a exclusão/alteração."
  ],
  [
   "RESTRICT",
   "Impede a operação."
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
  "intro": "Tente violar cada restrição de propósito e leia a resposta do SGBD. Depois cumpra os desafios.",
  "sims": [
   {
    "tipo": "sql",
    "titulo": "Console SQL: tente quebrar as regras",
    "cfg": {
     "id": "q8",
     "setup": "PRAGMA foreign_keys = ON;\nCREATE TABLE autor (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, pais TEXT);\nCREATE TABLE livro (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, ano INTEGER, genero TEXT, paginas INTEGER, autor_id INTEGER REFERENCES autor(id));\nCREATE TABLE aluno (ra INTEGER PRIMARY KEY, nome TEXT NOT NULL, turma TEXT, cidade TEXT);\nCREATE TABLE emprestimo (id INTEGER PRIMARY KEY, livro_id INTEGER NOT NULL REFERENCES livro(id), ra INTEGER NOT NULL REFERENCES aluno(ra), data_saida TEXT, devolvido INTEGER DEFAULT 0);\nINSERT INTO autor VALUES (1,'Machado de Assis','Brasil'),(2,'Clarice Lispector','Brasil'),(3,'George Orwell','Reino Unido'),(4,'J. K. Rowling','Reino Unido'),(5,'Conceição Evaristo','Brasil');\nINSERT INTO livro VALUES (1,'Dom Casmurro',1899,'Romance',256,1),(2,'Memórias Póstumas de Brás Cubas',1881,'Romance',368,1),(3,'A Hora da Estrela',1977,'Romance',88,2),(4,'1984',1949,'Ficção científica',416,3),(5,'A Revolução dos Bichos',1945,'Fábula',152,3),(6,'Harry Potter e a Pedra Filosofal',1997,'Fantasia',264,4),(7,'Olhos d''Água',2014,'Contos',116,5),(8,'Ponciá Vicêncio',2003,'Romance',128,5),(9,'O Alienista',1882,'Novela',96,1);\nINSERT INTO aluno VALUES (101,'Ana Souza','1INF','Tobias Barreto'),(102,'Bruno Lima','1INF','Itabaianinha'),(103,'Carla Dias','2DS','Tobias Barreto'),(104,'Davi Santos','2DS','Poço Verde'),(105,'Elisa Rocha','1INF','Tobias Barreto'),(106,'Fábio Nunes','2DS','Lagarto');\nINSERT INTO emprestimo VALUES (1,1,101,'2026-08-03',1),(2,4,101,'2026-09-10',0),(3,6,102,'2026-09-12',0),(4,3,103,'2026-09-15',1),(5,1,104,'2026-10-01',0),(6,7,103,'2026-10-02',0),(7,4,105,'2026-10-05',1),(8,9,102,'2026-10-20',0);\nCREATE TABLE multa (id INTEGER PRIMARY KEY, ra INTEGER NOT NULL REFERENCES aluno(ra), valor REAL CHECK (valor > 0));",
     "inicial": "INSERT INTO emprestimo VALUES (99, 1, 999, '2026-11-09', 0);",
     "desafios": [
      {
       "p": "Cadastre uma <b>multa válida</b>: (1, 101, 2.5).",
       "ref": "INSERT INTO multa VALUES (1, 101, 2.5);",
       "verif": "SELECT * FROM multa;",
       "dica": "INSERT INTO multa VALUES (1, 101, 2.5);",
       "expl": "Aluno existe e valor > 0: aceita."
      },
      {
       "p": "Liste os alunos que têm multa (nome e valor).",
       "ref": "SELECT aluno.nome, multa.valor FROM multa JOIN aluno ON multa.ra = aluno.ra;",
       "dica": "JOIN aluno ON multa.ra = aluno.ra",
       "expl": "A FK garante que todo ra de multa existe em aluno."
      }
     ]
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "O que o SGBD faz?",
    "cfg": {
     "id": "ri",
     "rotulo": "Comando",
     "itens": [
      {
       "t": "INSERT INTO aluno VALUES (101, 'Outra Ana', '1INF', 'Lagarto'); — o RA 101 já existe.",
       "ops": [
        [
         "Recusa: viola a chave primária (integridade de entidade)",
         true,
         "PK não se repete."
        ],
        [
         "Aceita e substitui",
         false,
         "Não substitui sem um comando próprio."
        ],
        [
         "Aceita duplicado",
         false,
         "PK única."
        ]
       ]
      },
      {
       "t": "INSERT INTO multa VALUES (2, 101, -5);",
       "ops": [
        [
         "Recusa: viola o CHECK (valor > 0)",
         true,
         "Integridade de domínio."
        ],
        [
         "Aceita",
         false,
         "O CHECK impede."
        ],
        [
         "Grava 5",
         false,
         "O SGBD não corrige sozinho."
        ]
       ]
      },
      {
       "t": "DELETE FROM autor WHERE id = 1; com livros ligados e FK com RESTRICT.",
       "ops": [
        [
         "Recusa: há livros que referenciam o autor",
         true,
         "RESTRICT impede deixar livros órfãos."
        ],
        [
         "Apaga autor e livros",
         false,
         "Isso seria CASCADE."
        ],
        [
         "Apaga só o autor",
         false,
         "Deixaria FKs inválidas."
        ]
       ]
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Provoque um erro de propósito e leia a mensagem",
    "ev": "q8:erro"
   },
   {
    "id": "m2",
    "t": "Cumpra os 2 desafios de integridade",
    "ev": "q8:todos"
   },
   {
    "id": "m3",
    "t": "Responda todos os comandos",
    "ev": "ri:fim"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que é integridade de domínio?",
   "Garantia de que cada valor pertence ao conjunto de valores válidos do atributo."
  ],
  [
   "Cite 4 recursos para integridade de domínio.",
   "Tipo de dado, CHECK, NOT NULL, DEFAULT, enumeração."
  ],
  [
   "O que é integridade de entidade?",
   "A PK deve ser única e nenhum componente pode ser NULL."
  ],
  [
   "O que é integridade referencial?",
   "Toda FK referencia uma PK existente ou é NULL (se permitido)."
  ],
  [
   "O que faz ON DELETE CASCADE?",
   "Exclui automaticamente os registros filhos quando o pai é excluído."
  ],
  [
   "O que faz ON DELETE SET NULL?",
   "Coloca NULL na FK dos filhos quando o pai é excluído."
  ],
  [
   "O que faz RESTRICT?",
   "Rejeita a operação se houver registros dependentes."
  ],
  [
   "UNIQUE permite NULL?",
   "Sim, na maioria dos SGBDs; PRIMARY KEY não permite."
  ],
  [
   "O que é integridade semântica?",
   "Regras de negócio que constraints simples não expressam (ex.: salário não pode passar o do gerente)."
  ],
  [
   "O que é uma assertion?",
   "Restrição no nível do esquema, podendo envolver várias tabelas."
  ],
  [
   "O que é um trigger?",
   "Procedimento executado automaticamente em resposta a INSERT, UPDATE ou DELETE."
  ],
  [
   "Para que serve DEFAULT?",
   "Define o valor usado quando nenhum é informado."
  ]
 ],
 "vf": [
  [
   "<code>CHECK (Preco > 0)</code> é uma restrição de domínio.",
   true,
   "Limita os valores válidos da coluna."
  ],
  [
   "Uma chave primária composta pode ter um componente NULL.",
   false,
   "A integridade de entidade proíbe NULL em qualquer parte da PK."
  ],
  [
   "Com RESTRICT, excluir um curso que tem alunos é rejeitado.",
   true,
   "RESTRICT impede a operação quando há referências."
  ],
  [
   "ON UPDATE CASCADE propaga a mudança da PK para as FKs dos filhos.",
   true,
   "Os filhos passam a apontar para o novo valor."
  ],
  [
   "\"Data de devolução posterior à de empréstimo\" pode ser feita com CHECK na mesma tabela.",
   true,
   "<code>CHECK (DataDev > DataEmp)</code> envolve colunas da mesma linha."
  ],
  [
   "\"Aluno não pode ter mais de 7 disciplinas\" se resolve com um CHECK simples de coluna.",
   false,
   "Envolve contar várias linhas; exige trigger ou validação na aplicação."
  ],
  [
   "Triggers BEFORE são adequados para validar dados antes de gravar.",
   true,
   "Podem rejeitar ou corrigir o valor antes da operação."
  ],
  [
   "A maioria dos SGBDs implementa CREATE ASSERTION completamente.",
   false,
   "Poucos implementam; triggers são a alternativa."
  ],
  [
   "NOT NULL é uma restrição de integridade referencial.",
   false,
   "É de domínio: impede ausência de valor na coluna."
  ],
  [
   "SET DEFAULT coloca o valor padrão na FK quando o pai é excluído.",
   true,
   "Exige que exista um DEFAULT válido na coluna."
  ],
  [
   "Validar regras só na aplicação é tão seguro quanto validar no banco.",
   false,
   "Outros sistemas ou comandos diretos podem burlar a aplicação; o banco é a última barreira."
  ],
  [
   "Uma tabela pode ter várias colunas UNIQUE e só uma PRIMARY KEY.",
   true,
   "Chaves alternativas viram UNIQUE."
  ]
 ],
 "caderno": [
  [
   "Crie PRODUTO com Preco > 0, Estoque >= 0 com padrão 0 e Status ATIVO/INATIVO.",
   "<code>CREATE TABLE PRODUTO (Cod SERIAL PRIMARY KEY, Nome VARCHAR(100) NOT NULL, Preco DECIMAL(10,2) CHECK (Preco > 0), Estoque INT DEFAULT 0 CHECK (Estoque >= 0), Status VARCHAR(10) DEFAULT 'ATIVO' CHECK (Status IN ('ATIVO','INATIVO')));</code>"
  ],
  [
   "Monte o quadro das 4 ações referenciais para ON DELETE.",
   "RESTRICT/NO ACTION: impede. CASCADE: apaga filhos. SET NULL: FK = NULL. SET DEFAULT: FK = padrão."
  ],
  [
   "Escreva a FK de PEDIDO para CLIENTE que impeça excluir cliente com pedidos.",
   "<code>FOREIGN KEY (CPF) REFERENCES CLIENTE(CPF) ON DELETE RESTRICT</code>"
  ],
  [
   "Quando você usaria CASCADE e quando RESTRICT? Dê um exemplo de cada.",
   "CASCADE: itens de um pedido excluído. RESTRICT: cliente com pedidos (histórico não pode sumir)."
  ],
  [
   "Classifique: PK, NOT NULL, FK, CHECK(nota BETWEEN 0 AND 10).",
   "PK: entidade; NOT NULL: domínio; FK: referencial; CHECK: domínio."
  ],
  [
   "Escreva 3 regras de integridade semântica de uma escola.",
   "Aluno não se matricula em disciplina sem cursar o pré-requisito; máximo de 7 disciplinas; nota final só após todas as avaliações."
  ],
  [
   "Adicione um CHECK de email em uma tabela já existente.",
   "<code>ALTER TABLE ALUNO ADD CONSTRAINT chk_email CHECK (Email LIKE '%@%.%');</code>"
  ],
  [
   "Explique a diferença entre trigger BEFORE e AFTER.",
   "BEFORE roda antes da gravação (validar/ajustar); AFTER roda depois (auditar, atualizar tabelas derivadas)."
  ],
  [
   "Qual erro ocorre ao inserir um aluno com CodCurso = 99 inexistente?",
   "Violação de chave estrangeira (integridade referencial)."
  ],
  [
   "Por que UNIQUE e PRIMARY KEY não são a mesma coisa?",
   "PK é única e não nula, uma por tabela. UNIQUE aceita NULL e pode haver várias."
  ]
 ],
 "pbl": [
  {
   "titulo": "Auditoria do banco legado",
   "cenario": "A videolocadora tem notas com valor negativo, locações apontando para clientes que não existem e clientes sem CPF.",
   "passos": [
    [
     "Que tipo de integridade falhou em cada caso?",
     "Valor negativo: domínio. Cliente inexistente: referencial. Cliente sem CPF (PK): entidade."
    ],
    [
     "Que constraints vocês adicionariam?",
     "<code>CHECK (Valor >= 0)</code>, FK de LOCACAO para CLIENTE e PK/NOT NULL em CPF."
    ],
    [
     "O que fazer com os dados ruins antes de ativar as constraints?",
     "Levantar os registros com SELECT, corrigir ou mover para uma tabela de quarentena e só então criar as constraints."
    ]
   ]
  },
  {
   "titulo": "Regra do salário do gerente",
   "cenario": "O RH exige que nenhum funcionário ganhe mais que o gerente do seu departamento.",
   "passos": [
    [
     "Essa regra cabe em um CHECK?",
     "Não, porque compara valores de linhas diferentes (o funcionário e o gerente)."
    ],
    [
     "Qual mecanismo usar e em que momento?",
     "Trigger BEFORE INSERT OR UPDATE em FUNCIONARIO, FOR EACH ROW."
    ],
    [
     "O que o trigger faz se a regra for violada?",
     "Dispara <code>RAISE EXCEPTION</code>, cancelando a operação."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Integridade",
   "itens": [
    "Domínio, entidade, referencial, semântica.",
    "RESTRICT, CASCADE, SET NULL, SET DEFAULT."
   ]
  }
 ],
 "glossario": [
  [
   "Trigger",
   "Gatilho executado num evento."
  ],
  [
   "Assertion",
   "Restrição geral do padrão SQL."
  ]
 ]
});
