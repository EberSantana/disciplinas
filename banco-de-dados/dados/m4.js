FSI.modulo({
 "n": 4,
 "unidade": "Modelagem",
 "nome": "Modelo relacional",
 "titulo": "Tabelas, chaves e o mapeamento do DER",
 "duracao": "6 h",
 "resumoCurto": "Relações, chaves, mapeamento ER→relacional e álgebra relacional",
 "analogia": {
  "titulo": "A planilha com regras",
  "txt": "<p>Uma tabela relacional parece uma planilha, mas com regras rígidas: cada coluna só aceita um tipo de valor (<b>domínio</b>), cada linha é identificada por uma <b>chave primária</b> que não se repete nem fica vazia, e uma coluna pode apontar para a chave de outra tabela (<b>chave estrangeira</b>) — como o número de matrícula anotado na ficha de empréstimo.</p>"
 },
 "chave": [
  "Relação = tabela; tupla = linha; atributo = coluna; domínio = valores válidos.",
  "Grau = nº de colunas; cardinalidade = nº de linhas.",
  "Superchave → chave candidata (mínima) → chave primária (escolhida). FK referencia a PK de outra tabela.",
  "Integridade de entidade (PK não nula), referencial (FK válida ou NULL) e de domínio.",
  "Mapeamento: 1:N → FK no lado N; N:M → tabela associativa; multivalorado → nova tabela.",
  "Álgebra: σ seleção (linhas), π projeção (colunas), ∪, −, ×, junção ⋈."
 ],
 "objetivos": [
  "Usar o vocabulário <b>relação, tupla, atributo, domínio</b>.",
  "Distinguir <b>superchave, chave candidata, primária e estrangeira</b>.",
  "Mapear um <b>DER para tabelas</b>.",
  "Ler operações de <b>álgebra relacional</b>."
 ],
 "licoes": [
  {
   "t": "Vocabulário",
   "txt": "",
   "pontos": [
    "<b>Relação</b> = tabela; <b>tupla</b> = linha; <b>atributo</b> = coluna; <b>domínio</b> = valores válidos.",
    "<b>Grau</b> = número de colunas; <b>cardinalidade</b> = número de linhas."
   ]
  },
  {
   "t": "Chaves",
   "txt": "<p><b>Superchave</b> identifica a linha (pode ter colunas a mais); <b>chave candidata</b> é a superchave mínima; a <b>primária</b> é a candidata escolhida; a <b>estrangeira</b> referencia a primária de outra tabela.</p>"
  },
  {
   "t": "Mapeamento ER → relacional",
   "txt": "",
   "pontos": [
    "Entidade → tabela; atributo chave → PK.",
    "<b>1:N</b> → FK no lado N (livro.autor_id).",
    "<b>N:M</b> → tabela associativa com as duas FKs.",
    "<b>Multivalorado</b> → tabela própria (aluno_telefone).",
    "<b>Composto</b> → colunas separadas."
   ]
  },
  {
   "t": "Álgebra relacional",
   "txt": "<p><b>σ</b> (seleção) escolhe linhas — vira WHERE; <b>π</b> (projeção) escolhe colunas — vira a lista do SELECT; <b>⋈</b> (junção) combina tabelas — vira JOIN; e há ∪, −, ×.</p>"
  }
 ],
 "termos": [
  [
   "Tupla",
   "Linha da relação."
  ],
  [
   "Domínio",
   "Valores válidos de uma coluna."
  ],
  [
   "Chave candidata",
   "Superchave mínima."
  ],
  [
   "FK",
   "Referencia a PK de outra tabela."
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
   "tipo": "classificar",
   "id": "jogo-map",
   "titulo": "Jogo: como mapear?",
   "cats": [
    "Nova tabela",
    "FK no lado N",
    "Colunas separadas"
   ],
   "itens": [
    [
     "Relacionamento N:M aluno–disciplina",
     0
    ],
    [
     "Atributo multivalorado telefones",
     0
    ],
    [
     "Relacionamento 1:N autor–livro",
     1
    ],
    [
     "Relacionamento 1:N turma–aluno",
     1
    ],
    [
     "Atributo composto endereço",
     2
    ],
    [
     "Atributo composto nome (nome, sobrenome)",
     2
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Explore como as chaves ligam as tabelas da biblioteca: cada empréstimo aponta para um livro e para um aluno.",
  "sims": [
   {
    "tipo": "sql",
    "titulo": "Console SQL: seguindo as chaves",
    "cfg": {
     "id": "q4",
     "setup": "PRAGMA foreign_keys = ON;\nCREATE TABLE autor (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, pais TEXT);\nCREATE TABLE livro (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, ano INTEGER, genero TEXT, paginas INTEGER, autor_id INTEGER REFERENCES autor(id));\nCREATE TABLE aluno (ra INTEGER PRIMARY KEY, nome TEXT NOT NULL, turma TEXT, cidade TEXT);\nCREATE TABLE emprestimo (id INTEGER PRIMARY KEY, livro_id INTEGER NOT NULL REFERENCES livro(id), ra INTEGER NOT NULL REFERENCES aluno(ra), data_saida TEXT, devolvido INTEGER DEFAULT 0);\nINSERT INTO autor VALUES (1,'Machado de Assis','Brasil'),(2,'Clarice Lispector','Brasil'),(3,'George Orwell','Reino Unido'),(4,'J. K. Rowling','Reino Unido'),(5,'Conceição Evaristo','Brasil');\nINSERT INTO livro VALUES (1,'Dom Casmurro',1899,'Romance',256,1),(2,'Memórias Póstumas de Brás Cubas',1881,'Romance',368,1),(3,'A Hora da Estrela',1977,'Romance',88,2),(4,'1984',1949,'Ficção científica',416,3),(5,'A Revolução dos Bichos',1945,'Fábula',152,3),(6,'Harry Potter e a Pedra Filosofal',1997,'Fantasia',264,4),(7,'Olhos d''Água',2014,'Contos',116,5),(8,'Ponciá Vicêncio',2003,'Romance',128,5),(9,'O Alienista',1882,'Novela',96,1);\nINSERT INTO aluno VALUES (101,'Ana Souza','1INF','Tobias Barreto'),(102,'Bruno Lima','1INF','Itabaianinha'),(103,'Carla Dias','2DS','Tobias Barreto'),(104,'Davi Santos','2DS','Poço Verde'),(105,'Elisa Rocha','1INF','Tobias Barreto'),(106,'Fábio Nunes','2DS','Lagarto');\nINSERT INTO emprestimo VALUES (1,1,101,'2026-08-03',1),(2,4,101,'2026-09-10',0),(3,6,102,'2026-09-12',0),(4,3,103,'2026-09-15',1),(5,1,104,'2026-10-01',0),(6,7,103,'2026-10-02',0),(7,4,105,'2026-10-05',1),(8,9,102,'2026-10-20',0);",
     "inicial": "SELECT * FROM emprestimo;",
     "desafios": [
      {
       "p": "Liste os livros (<b>título</b>) do autor de id <b>1</b>.",
       "ref": "SELECT titulo FROM livro WHERE autor_id = 1;",
       "dica": "WHERE autor_id = 1",
       "expl": "A FK autor_id liga livro a autor: isso é a seleção σ."
      },
      {
       "p": "Mostre o <b>título do livro</b> e o <b>nome do autor</b> de cada livro.",
       "ref": "SELECT livro.titulo, autor.nome FROM livro JOIN autor ON livro.autor_id = autor.id;",
       "dica": "JOIN autor ON livro.autor_id = autor.id",
       "expl": "A junção ⋈ usa a FK para combinar as tabelas."
      },
      {
       "p": "Mostre o <b>nome do aluno</b> e o <b>título</b> de cada empréstimo.",
       "ref": "SELECT aluno.nome, livro.titulo FROM emprestimo JOIN aluno ON emprestimo.ra = aluno.ra JOIN livro ON emprestimo.livro_id = livro.id;",
       "dica": "Duas junções: emprestimo→aluno e emprestimo→livro.",
       "expl": "A tabela emprestimo é a ponte N:M entre aluno e livro."
      }
     ]
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Qual é a chave?",
    "cfg": {
     "id": "ch",
     "rotulo": "Caso",
     "itens": [
      {
       "t": "Tabela ALUNO(ra, cpf, nome). Tanto o RA quanto o CPF identificam o aluno.",
       "ops": [
        [
         "RA e CPF são chaves candidatas; escolhe-se uma como primária",
         true,
         "As duas são superchaves mínimas."
        ],
        [
         "Só o nome é chave",
         false,
         "Nomes se repetem."
        ],
        [
         "(ra, nome) é chave candidata",
         false,
         "É superchave, mas não mínima."
        ]
       ]
      },
      {
       "t": "Na tabela EMPRESTIMO, a coluna ra guarda o RA do aluno.",
       "ops": [
        [
         "ra é chave estrangeira para ALUNO",
         true,
         "Referencia a PK de outra tabela."
        ],
        [
         "ra é a chave primária de EMPRESTIMO",
         false,
         "Um aluno pode ter vários empréstimos."
        ],
        [
         "ra é atributo derivado",
         false,
         "É uma referência."
        ]
       ]
      },
      {
       "t": "Uma tabela tem 5 colunas e 120 linhas.",
       "ops": [
        [
         "Grau 5 e cardinalidade 120",
         true,
         "Grau = colunas; cardinalidade = linhas."
        ],
        [
         "Grau 120 e cardinalidade 5",
         false,
         "Invertido."
        ],
        [
         "Grau 600",
         false,
         "Não se multiplica."
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
    "t": "Faça sua primeira junção (JOIN)",
    "ev": "q4:join"
   },
   {
    "id": "m2",
    "t": "Cumpra os 3 desafios de chaves",
    "ev": "q4:todos"
   },
   {
    "id": "m3",
    "t": "Responda todos os casos de chaves",
    "ev": "ch:fim"
   }
  ],
  "guiados": [
   {
    "titulo": "Grau e cardinalidade",
    "txt": "<p>A tabela <b>livro</b> da biblioteca tem as colunas id, titulo, ano, genero, paginas e autor_id, e 9 livros cadastrados.</p>",
    "passos": [
     {
      "p": "Qual o grau da relação livro?",
      "r": 6,
      "un": "colunas",
      "dica": "Conte as colunas.",
      "expl": "6 colunas."
     },
     {
      "p": "Qual a cardinalidade?",
      "r": 9,
      "un": "linhas",
      "dica": "Conte os livros.",
      "expl": "9 tuplas."
     },
     {
      "p": "Se 3 livros novos forem cadastrados, qual será a nova cardinalidade?",
      "r": 12,
      "un": "linhas",
      "dica": "Linhas aumentam; colunas não.",
      "expl": "12: o grau continua 6."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma tupla?",
   "Uma linha da relação (registro)."
  ],
  [
   "O que é o grau de uma relação?",
   "O número de atributos (colunas)."
  ],
  [
   "O que é a cardinalidade de uma relação?",
   "O número de tuplas (linhas)."
  ],
  [
   "O que é superchave?",
   "Qualquer conjunto de atributos que identifica unicamente cada tupla."
  ],
  [
   "O que é chave candidata?",
   "Superchave mínima: não dá para tirar nenhum atributo sem perder a unicidade."
  ],
  [
   "O que é chave estrangeira?",
   "Atributo que referencia a chave primária de outra relação."
  ],
  [
   "O que diz a integridade de entidade?",
   "Nenhum componente da chave primária pode ser NULL."
  ],
  [
   "Como se mapeia um relacionamento 1:N?",
   "A PK do lado 1 vai como FK para a tabela do lado N."
  ],
  [
   "Como se mapeia um relacionamento N:M?",
   "Cria-se uma tabela associativa com as PKs das duas entidades como FKs; a PK é a composição delas."
  ],
  [
   "Como se mapeia um atributo multivalorado?",
   "Nova tabela com o atributo + a PK da entidade como FK; PK composta pelos dois."
  ],
  [
   "O que faz a operação σ (seleção)?",
   "Filtra as linhas que satisfazem uma condição."
  ],
  [
   "O que faz a operação π (projeção)?",
   "Escolhe colunas e elimina duplicatas."
  ]
 ],
 "vf": [
  [
   "No modelo relacional a ordem das linhas tem significado.",
   false,
   "A ordem das tuplas é irrelevante; a relação é um conjunto."
  ],
  [
   "Uma relação pode ter duas tuplas idênticas.",
   false,
   "Cada tupla é única no modelo relacional."
  ],
  [
   "{CPF, Nome} é superchave de FUNCIONÁRIO se CPF já é único.",
   true,
   "Todo conjunto que contém uma chave também identifica unicamente; só não é mínimo."
  ],
  [
   "Toda chave candidata é superchave.",
   true,
   "Chave candidata é uma superchave mínima."
  ],
  [
   "Uma chave estrangeira pode ser NULL, se o projeto permitir.",
   true,
   "A integridade referencial aceita FK válida ou NULL quando permitido."
  ],
  [
   "No mapeamento 1:N, a FK vai para a tabela do lado 1.",
   false,
   "Vai para o lado N (ex.: CodDepto em FUNCIONÁRIO)."
  ],
  [
   "Atributos compostos são desmembrados em colunas simples no mapeamento.",
   true,
   "Endereço vira Rua, Número, Cidade, CEP."
  ],
  [
   "A PK de uma entidade fraca é composta pela chave parcial + a PK da forte.",
   true,
   "Regra 2 do mapeamento."
  ],
  [
   "A junção equivale a uma seleção aplicada sobre um produto cartesiano.",
   true,
   "R ⋈c S = σc(R × S)."
  ],
  [
   "A projeção π filtra linhas por condição.",
   false,
   "Quem filtra linhas é σ. A π escolhe colunas."
  ],
  [
   "A união exige relações com esquemas compatíveis.",
   true,
   "Mesmo número de atributos com domínios compatíveis."
  ],
  [
   "Valores multivalorados são permitidos em uma relação no modelo relacional puro.",
   false,
   "Cada valor deve ser atômico."
  ]
 ],
 "caderno": [
  [
   "Monte a tabela de termos formais x informais do modelo relacional.",
   "Relação = tabela; tupla = linha; atributo = coluna; domínio = tipo/valores; esquema = definição; grau = nº colunas; cardinalidade = nº linhas."
  ],
  [
   "Em ALUNO(RA, CPF, Email, Nome), liste 3 superchaves, as chaves candidatas e sugira a PK.",
   "Superchaves: {RA}, {CPF}, {RA, Nome}... Candidatas: {RA}, {CPF}, {Email}. PK sugerida: RA."
  ],
  [
   "Mapeie: DEPARTAMENTO (1) possui (N) FUNCIONÁRIO.",
   "DEPARTAMENTO(CodDepto, Nome); FUNCIONARIO(Matricula, Nome, CodDepto FK)."
  ],
  [
   "Mapeie: ALUNO (N) cursa (M) DISCIPLINA com atributo Nota.",
   "ALUNO(RA, Nome); DISCIPLINA(CodDisc, Nome); CURSA(RA FK, CodDisc FK, Nota), PK (RA, CodDisc)."
  ],
  [
   "Mapeie CLIENTE com atributo multivalorado Telefones.",
   "CLIENTE(CPF, Nome); TELEFONE_CLIENTE(CPF FK, Telefone), PK (CPF, Telefone)."
  ],
  [
   "Mapeie o 1:1 FUNCIONÁRIO gerencia DEPARTAMENTO (todo departamento tem gerente).",
   "FK CPF_Gerente em DEPARTAMENTO (lado com participação total), com UNIQUE."
  ],
  [
   "Escreva em álgebra relacional: nomes dos funcionários com salário > 3000.",
   "π Nome (σ Salario>3000 (FUNCIONARIO))."
  ],
  [
   "Escreva em álgebra: nome do aluno e nome do curso.",
   "π Aluno.Nome, Curso.Nome (ALUNO ⋈ ALUNO.CodCurso=CURSO.CodCurso CURSO)."
  ],
  [
   "Se R tem 4 linhas e S tem 5, quantas linhas tem R × S?",
   "20 linhas."
  ],
  [
   "Explique as três integridades implícitas do modelo relacional.",
   "Entidade: PK única e não nula. Referencial: FK aponta para PK existente ou é NULL. Domínio: valor dentro do tipo/faixa definidos."
  ]
 ],
 "pbl": [
  {
   "titulo": "Clínica veterinária",
   "cenario": "DER: TUTOR (CPF, nome, telefones) 1:N ANIMAL (cod, nome, espécie); ANIMAL N:M VETERINÁRIO via CONSULTA (data, diagnóstico, valor).",
   "passos": [
    [
     "Quantas e quais tabelas o mapeamento gera?",
     "5: TUTOR, TELEFONE_TUTOR, ANIMAL, VETERINARIO, CONSULTA."
    ],
    [
     "Qual a estrutura de ANIMAL e de CONSULTA?",
     "ANIMAL(Cod, Nome, Especie, CPF_Tutor FK). CONSULTA(CodAnimal FK, CRMV FK, Data, Diagnostico, Valor), PK (CodAnimal, CRMV, Data)."
    ],
    [
     "Por que Data entra na PK de CONSULTA?",
     "Porque o mesmo animal pode consultar o mesmo veterinário várias vezes; sem a data a chave se repetiria."
    ]
   ]
  },
  {
   "titulo": "Consultas sem SQL",
   "cenario": "O professor pediu que a turma respondesse perguntas sobre as tabelas LIVRO(Cod, Titulo, Ano, CodAutor) e AUTOR(CodAutor, Nome) só com álgebra relacional.",
   "passos": [
    [
     "Títulos dos livros publicados depois de 2015.",
     "π Titulo (σ Ano>2015 (LIVRO))."
    ],
    [
     "Título de cada livro com o nome do autor.",
     "π Titulo, Nome (LIVRO ⋈ AUTOR)."
    ],
    [
     "Autores que não têm livros cadastrados.",
     "π CodAutor (AUTOR) − π CodAutor (LIVRO), depois junção com AUTOR para obter o nome."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Relacional",
   "itens": [
    "Relação, tupla, atributo, domínio.",
    "Superchave ⊃ candidata ⊃ primária; FK referencia PK.",
    "1:N → FK no N; N:M → associativa."
   ]
  }
 ],
 "glossario": [
  [
   "σ",
   "Seleção (WHERE)."
  ],
  [
   "π",
   "Projeção (colunas)."
  ],
  [
   "⋈",
   "Junção (JOIN)."
  ]
 ]
});
