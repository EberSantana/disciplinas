FSI.modulo({
 "n": 1,
 "unidade": "Fundamentos",
 "nome": "Introdução a Banco de Dados",
 "titulo": "Dados, SGBD e as três visões de um banco",
 "duracao": "4 h",
 "resumoCurto": "Conceitos, SGBD, modelos, ANSI/SPARC e linguagens",
 "analogia": {
  "titulo": "Cadernos soltos × secretaria organizada",
  "txt": "<p>Imagine que cada professor anota as notas dos alunos no próprio caderno. Quando a coordenação precisa do boletim, junta dez cadernos — e descobre que o nome da mesma aluna está escrito de três jeitos e que uma nota foi corrigida num caderno e não no outro. Isso é o <b>sistema de arquivos</b>: dados espalhados, repetidos e inconsistentes.</p><p>Agora imagine uma secretaria com um único cadastro, regras de quem pode alterar o quê e cópia de segurança. Isso é um <b>banco de dados com SGBD</b>.</p>"
 },
 "chave": [
  "Banco de dados: coleção de dados inter-relacionados que representa um minimundo, com propósito e usuários definidos.",
  "Dado → informação → conhecimento: o dado bruto ganha contexto e depois interpretação.",
  "SGBD: software que define, constrói, manipula, compartilha, protege e mantém bancos de dados.",
  "Arquitetura ANSI/SPARC: níveis externo, conceitual e interno, que garantem independência lógica e física.",
  "Linguagens: DDL (estrutura), DML (dados), DCL (permissões), DTL/TCL (transações).",
  "Evolução: hierárquico/rede (1960) → relacional de Codd (1970) → SQL padrão (1986) → NoSQL, nuvem e NewSQL."
 ],
 "objetivos": [
  "Diferenciar <b>dado, informação e conhecimento</b>.",
  "Explicar o que é um <b>banco de dados</b> e um <b>SGBD</b>.",
  "Descrever os três níveis da <b>arquitetura ANSI/SPARC</b>.",
  "Classificar comandos em <b>DDL, DML, DCL e TCL</b>."
 ],
 "licoes": [
  {
   "t": "Do arquivo solto ao SGBD",
   "txt": "<p>Um <b>banco de dados</b> é uma coleção de dados inter-relacionados que representa uma parte do mundo real (o <i>minimundo</i>), com propósito e usuários definidos. O <b>SGBD</b> (MySQL, PostgreSQL, SQLite, Oracle) é o software que o define, constrói, manipula, compartilha, protege e mantém.</p>",
   "pontos": [
    "Evita <b>redundância</b> e <b>inconsistência</b> de cópias espalhadas.",
    "Controla <b>acesso concorrente</b>: duas pessoas alterando ao mesmo tempo.",
    "Garante <b>integridade</b>, <b>segurança</b> e <b>recuperação</b> após falhas."
   ]
  },
  {
   "t": "As três visões (ANSI/SPARC)",
   "txt": "<p>O mesmo banco é visto em três níveis: <b>externo</b> (as telas e visões de cada usuário), <b>conceitual</b> (todas as tabelas e relacionamentos) e <b>interno</b> (arquivos, índices e blocos no disco). Separar os níveis dá <b>independência de dados</b>: dá para criar um índice (interno) sem mexer nos programas, ou acrescentar uma coluna (conceitual) sem mudar as telas que não a usam.</p>"
  },
  {
   "t": "As linguagens do SGBD",
   "txt": "<p>A SQL reúne quatro sublinguagens:</p>",
   "pontos": [
    "<b>DDL</b> — definição: CREATE, ALTER, DROP.",
    "<b>DML</b> — manipulação: SELECT, INSERT, UPDATE, DELETE.",
    "<b>DCL</b> — controle de acesso: GRANT, REVOKE.",
    "<b>TCL</b> — transações: COMMIT, ROLLBACK."
   ],
   "pense": "quando você faz um Pix, quais dessas linguagens o banco do seu banco usa?"
  }
 ],
 "termos": [
  [
   "Minimundo",
   "Parte do mundo real que o banco representa."
  ],
  [
   "SGBD",
   "Software que gerencia o banco."
  ],
  [
   "Metadados",
   "Dados sobre os dados (catálogo)."
  ],
  [
   "Independência física",
   "Mudar o armazenamento sem mudar o esquema."
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
   "tipo": "camadas",
   "id": "ansi",
   "titulo": "Arquitetura ANSI/SPARC",
   "forma": "pilha",
   "h": 320,
   "camadas": [
    {
     "t": "Nível externo",
     "d": "Visões de cada usuário: o boletim do aluno, o relatório da secretaria."
    },
    {
     "t": "Nível conceitual",
     "d": "Todas as tabelas, colunas, relacionamentos e restrições."
    },
    {
     "t": "Nível interno",
     "d": "Arquivos, páginas, índices e blocos no disco."
    }
   ]
  },
  {
   "tipo": "classificar",
   "id": "jogo-ling",
   "titulo": "Jogo: qual sublinguagem?",
   "cats": [
    "DDL",
    "DML",
    "DCL",
    "TCL"
   ],
   "itens": [
    [
     "CREATE TABLE",
     0
    ],
    [
     "ALTER TABLE",
     0
    ],
    [
     "DROP TABLE",
     0
    ],
    [
     "SELECT",
     1
    ],
    [
     "INSERT",
     1
    ],
    [
     "UPDATE",
     1
    ],
    [
     "GRANT",
     2
    ],
    [
     "REVOKE",
     2
    ],
    [
     "COMMIT",
     3
    ],
    [
     "ROLLBACK",
     3
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Um primeiro contato com um banco de verdade: a biblioteca da escola, rodando em SQLite no seu navegador. Explore as tabelas e rode as primeiras consultas.",
  "sims": [
   {
    "tipo": "sql",
    "titulo": "Console SQL: a biblioteca da escola",
    "instr": "Clique numa tabela à esquerda para ver as colunas. Depois rode comandos e cumpra os desafios.",
    "cfg": {
     "id": "q1",
     "setup": "PRAGMA foreign_keys = ON;\nCREATE TABLE autor (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, pais TEXT);\nCREATE TABLE livro (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, ano INTEGER, genero TEXT, paginas INTEGER, autor_id INTEGER REFERENCES autor(id));\nCREATE TABLE aluno (ra INTEGER PRIMARY KEY, nome TEXT NOT NULL, turma TEXT, cidade TEXT);\nCREATE TABLE emprestimo (id INTEGER PRIMARY KEY, livro_id INTEGER NOT NULL REFERENCES livro(id), ra INTEGER NOT NULL REFERENCES aluno(ra), data_saida TEXT, devolvido INTEGER DEFAULT 0);\nINSERT INTO autor VALUES (1,'Machado de Assis','Brasil'),(2,'Clarice Lispector','Brasil'),(3,'George Orwell','Reino Unido'),(4,'J. K. Rowling','Reino Unido'),(5,'Conceição Evaristo','Brasil');\nINSERT INTO livro VALUES (1,'Dom Casmurro',1899,'Romance',256,1),(2,'Memórias Póstumas de Brás Cubas',1881,'Romance',368,1),(3,'A Hora da Estrela',1977,'Romance',88,2),(4,'1984',1949,'Ficção científica',416,3),(5,'A Revolução dos Bichos',1945,'Fábula',152,3),(6,'Harry Potter e a Pedra Filosofal',1997,'Fantasia',264,4),(7,'Olhos d''Água',2014,'Contos',116,5),(8,'Ponciá Vicêncio',2003,'Romance',128,5),(9,'O Alienista',1882,'Novela',96,1);\nINSERT INTO aluno VALUES (101,'Ana Souza','1INF','Tobias Barreto'),(102,'Bruno Lima','1INF','Itabaianinha'),(103,'Carla Dias','2DS','Tobias Barreto'),(104,'Davi Santos','2DS','Poço Verde'),(105,'Elisa Rocha','1INF','Tobias Barreto'),(106,'Fábio Nunes','2DS','Lagarto');\nINSERT INTO emprestimo VALUES (1,1,101,'2026-08-03',1),(2,4,101,'2026-09-10',0),(3,6,102,'2026-09-12',0),(4,3,103,'2026-09-15',1),(5,1,104,'2026-10-01',0),(6,7,103,'2026-10-02',0),(7,4,105,'2026-10-05',1),(8,9,102,'2026-10-20',0);",
     "inicial": "SELECT * FROM livro;",
     "desafios": [
      {
       "p": "Mostre <b>todas as colunas de todos os alunos</b>.",
       "ref": "SELECT * FROM aluno;",
       "dica": "SELECT * FROM nome_da_tabela;",
       "expl": "O asterisco traz todas as colunas."
      },
      {
       "p": "Mostre só o <b>título</b> e o <b>ano</b> de cada livro.",
       "ref": "SELECT titulo, ano FROM livro;",
       "dica": "Liste as colunas separadas por vírgula.",
       "expl": "Escolher colunas é a <b>projeção</b>."
      },
      {
       "p": "Quantos <b>autores</b> estão cadastrados?",
       "ref": "SELECT COUNT(*) FROM autor;",
       "dica": "COUNT(*) conta linhas.",
       "expl": "5 autores."
      }
     ]
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Arquivos soltos ou SGBD?",
    "cfg": {
     "id": "sg",
     "rotulo": "Situação",
     "medidor": {
      "nome": "Confiança da secretaria",
      "ini": 50
     },
     "itens": [
      {
       "t": "O nome de uma aluna aparece como “Ana Souza”, “Ana S.” e “ANA SOUZA” em três planilhas diferentes.",
       "ops": [
        [
         "Redundância e inconsistência, que um SGBD evita com um cadastro único",
         true,
         "Uma única tabela de alunos, referenciada pelas outras."
        ],
        [
         "Falta de backup",
         false,
         "O problema é a duplicação, não a perda."
        ],
        [
         "Problema de hardware",
         false,
         "É um problema de organização dos dados."
        ]
       ]
      },
      {
       "t": "Duas atendentes registram o último exemplar de um livro para dois alunos ao mesmo tempo.",
       "ops": [
        [
         "Falta de controle de acesso concorrente",
         true,
         "O SGBD usa transações e bloqueios para evitar isso."
        ],
        [
         "Falta de índice",
         false,
         "Índice acelera, não resolve concorrência."
        ],
        [
         "Erro de digitação",
         false,
         "As duas digitaram certo; o problema é o momento."
        ]
       ]
      },
      {
       "t": "A secretaria quer criar um índice para acelerar buscas sem alterar nenhum programa.",
       "ops": [
        [
         "Independência física de dados",
         true,
         "Mudou o nível interno sem afetar os outros."
        ],
        [
         "Independência lógica",
         false,
         "Lógica é mudar o esquema conceitual."
        ],
        [
         "Integridade referencial",
         false,
         "Não se trata de chaves estrangeiras."
        ]
       ]
      },
      {
       "t": "Um aluno não deve conseguir ver as notas dos colegas, mas pode ver as próprias.",
       "ops": [
        [
         "Visão externa + controle de acesso (DCL)",
         true,
         "Cada usuário enxerga só a sua visão."
        ],
        [
         "Normalização",
         false,
         "Normalização trata redundância."
        ],
        [
         "DDL",
         false,
         "DDL cria estruturas."
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
    "t": "Rode sua primeira consulta",
    "ev": "q1:rodou"
   },
   {
    "id": "m2",
    "t": "Cumpra os 3 desafios do console",
    "ev": "q1:todos"
   },
   {
    "id": "m3",
    "t": "Resolva 3 situações corretamente",
    "ev": "sg:acertos:3"
   },
   {
    "id": "m4",
    "t": "Resolva todas as situações sem erro",
    "ev": "sg:perfeito"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que é um banco de dados?",
   "Uma coleção organizada de dados inter-relacionados que representa aspectos do mundo real (minimundo), com significado implícito e propósito específico."
  ],
  [
   "Qual a diferença entre dado e informação?",
   "Dado é fato bruto sem contexto (\"85\"). Informação é o dado processado e contextualizado (\"João tirou 85 em BD\")."
  ],
  [
   "O que significa a sigla SGBD?",
   "Sistema de Gerenciamento de Banco de Dados: o software que cria, mantém e manipula bancos de dados."
  ],
  [
   "Cite 4 funções de um SGBD.",
   "Definição, construção, manipulação, compartilhamento, proteção e manutenção (qualquer 4)."
  ],
  [
   "O que são metadados?",
   "Dados sobre os dados: descrições de estruturas, tipos e restrições, guardadas no catálogo (dicionário) do SGBD."
  ],
  [
   "Quais são os três níveis da arquitetura ANSI/SPARC?",
   "Externo (visões dos usuários), conceitual (estrutura lógica completa) e interno (armazenamento físico)."
  ],
  [
   "O que é independência física de dados?",
   "Poder alterar o esquema interno (índices, arquivos) sem alterar o esquema conceitual nem as aplicações."
  ],
  [
   "O que é independência lógica de dados?",
   "Poder alterar o esquema conceitual (ex.: nova coluna) sem alterar as visões externas nem os programas."
  ],
  [
   "Para que serve a DDL? Dê 3 comandos.",
   "Define a estrutura do banco: CREATE, ALTER e DROP."
  ],
  [
   "Para que serve a DCL?",
   "Controla permissões de acesso, com GRANT e REVOKE."
  ],
  [
   "Quem propôs o modelo relacional e quando?",
   "Edgar F. Codd, em 1970, no artigo \"A Relational Model of Data for Large Shared Data Banks\"."
  ],
  [
   "O que faz o DBA?",
   "Administra o banco: esquema, controle de acesso, desempenho, backup e recuperação."
  ]
 ],
 "vf": [
  [
   "Uma planilha com dados aleatórios, sem propósito definido, já é considerada um banco de dados.",
   false,
   "Um banco de dados precisa representar um minimundo, ser logicamente coerente e ter finalidade e usuários definidos."
  ],
  [
   "O SGBD resolve o problema de redundância e inconsistência típico dos sistemas de arquivos.",
   true,
   "Ao centralizar os dados, o SGBD evita cópias espalhadas por vários programas e as divergências entre elas."
  ],
  [
   "SQLite é um SGBD relacional embarcado de domínio público.",
   true,
   "Ele roda dentro da própria aplicação, sem servidor separado, e seu código é de domínio público."
  ],
  [
   "MongoDB é um SGBD relacional que usa SQL como linguagem principal.",
   false,
   "MongoDB é NoSQL orientado a documentos e usa a MQL (MongoDB Query Language)."
  ],
  [
   "O nível interno da ANSI/SPARC é o que o usuário final enxerga.",
   false,
   "O usuário final enxerga o nível externo (visões). O interno trata do armazenamento físico."
  ],
  [
   "Criar um índice para acelerar consultas sem mudar as tabelas é exemplo de independência física.",
   true,
   "Mudou-se o nível interno sem afetar o esquema conceitual."
  ],
  [
   "SELECT faz parte da DML.",
   true,
   "SELECT, INSERT, UPDATE e DELETE manipulam dados e compõem a DML."
  ],
  [
   "GRANT e REVOKE pertencem à DDL.",
   false,
   "Eles controlam permissões e pertencem à DCL."
  ],
  [
   "A SQL é uma linguagem declarativa: o usuário diz o que quer, não como obter.",
   true,
   "O otimizador do SGBD decide o plano de execução."
  ],
  [
   "O modelo ER é um modelo de dados de baixo nível (físico).",
   false,
   "O ER é conceitual (alto nível). Modelos físicos descrevem arquivos, registros e índices."
  ],
  [
   "Nos anos 2000 surgiram bancos NoSQL como MongoDB, Cassandra e Redis.",
   true,
   "Eles vieram para atender Big Data e aplicações web de larga escala."
  ],
  [
   "Usuários paramétricos criam consultas SQL novas todos os dias.",
   false,
   "Paramétricos usam transações pré-programadas (ex.: caixa de banco). Quem cria consultas livres são os casuais ou sofisticados."
  ]
 ],
 "caderno": [
  [
   "Explique com um exemplo do seu dia a dia a diferença entre dado, informação e conhecimento.",
   "Ex.: \"37,8\" é dado; \"a temperatura de Ana é 37,8 °C\" é informação; saber que isso indica febre e que ela deve procurar o médico é conhecimento."
  ],
  [
   "Liste 5 problemas dos sistemas de arquivos que o SGBD resolve.",
   "Redundância/inconsistência, dificuldade de acesso, isolamento de dados, problemas de integridade, falta de atomicidade, acesso concorrente sem controle e segurança fraca (quaisquer 5)."
  ],
  [
   "Desenhe a arquitetura ANSI/SPARC em três camadas e escreva quem usa cada uma.",
   "Externo: usuários finais e programadores. Conceitual: projetistas e DBA. Interno: DBA e o próprio SGBD."
  ],
  [
   "Classifique cada comando em DDL, DML, DCL ou TCL: CREATE, INSERT, GRANT, COMMIT, DROP, UPDATE.",
   "CREATE: DDL; INSERT: DML; GRANT: DCL; COMMIT: TCL; DROP: DDL; UPDATE: DML."
  ],
  [
   "Monte uma tabela comparando Oracle, PostgreSQL, MySQL, SQLite e MongoDB (tipo e licença).",
   "Oracle: relacional, comercial. PostgreSQL: objeto-relacional, open source. MySQL: relacional, open source. SQLite: relacional embarcado, domínio público. MongoDB: documental NoSQL, open source."
  ],
  [
   "Descreva os 4 tipos de usuário final e dê um exemplo de cada.",
   "Casual (gerente que consulta às vezes), paramétrico (atendente de caixa), sofisticado (analista com OLAP), independente (quem mantém banco pessoal em ferramenta visual)."
  ],
  [
   "Faça uma linha do tempo de 1960 a 2020 com os marcos dos bancos de dados.",
   "1960: hierárquico (IMS) e rede (CODASYL). 1970: Codd e System R. 1980: SGBDs comerciais e SQL-86. 1990: objeto-relacional e DW. 2000: NoSQL. 2010-20: nuvem, NewSQL e grafos."
  ],
  [
   "Dê um exemplo de independência lógica e um de independência física.",
   "Lógica: adicionar a coluna email em ALUNO sem quebrar o app. Física: criar índice em CPF ou mover a tabela para outro disco."
  ],
  [
   "Explique por que a atomicidade é um problema em sistemas de arquivos.",
   "Se faltar energia no meio de uma transferência, o arquivo pode ficar com o débito feito e o crédito não. Não há mecanismo para desfazer ou completar."
  ],
  [
   "Escreva 3 situações do cotidiano em que você usa um banco de dados sem perceber.",
   "Pagamento com cartão, consulta de saldo no app do banco, busca de produtos numa loja virtual, feed de rede social etc."
  ]
 ],
 "pbl": [
  {
   "titulo": "Escolhendo o SGBD da startup",
   "cenario": "Uma startup de delivery de Tobias Barreto vai lançar um app. Terá cadastro de clientes, restaurantes e pedidos, pouco dinheiro e expectativa de crescer rápido.",
   "passos": [
    [
     "Quais critérios a equipe deve usar para escolher o SGBD?",
     "Custo de licença, modelo de dados, escalabilidade, suporte a transações ACID, comunidade/documentação, compatibilidade com a linguagem do app e hospedagem."
    ],
    [
     "Qual SGBD você recomendaria e por quê?",
     "PostgreSQL ou MySQL: gratuitos, relacionais (pedidos precisam de ACID), maduros e com hospedagem barata em nuvem. SQLite serve para o protótipo ou o armazenamento local no celular."
    ],
    [
     "Em que situação um banco NoSQL faria sentido nesse projeto?",
     "Para dados sem esquema fixo e alto volume, como logs de rastreamento em tempo real ou cache de sessões (Redis)."
    ]
   ]
  },
  {
   "titulo": "A secretaria das planilhas",
   "cenario": "A secretaria de uma escola guarda alunos em uma planilha, notas em outra e frequência em uma terceira. O nome de um aluno aparece escrito de três jeitos diferentes.",
   "passos": [
    [
     "Que problema dos sistemas de arquivos aparece aqui?",
     "Redundância e inconsistência: o mesmo dado repetido em várias fontes, com valores divergentes."
    ],
    [
     "Como um SGBD resolveria?",
     "Guardando o aluno uma única vez com uma chave (matrícula) e referenciando essa chave nas tabelas de notas e frequência."
    ],
    [
     "Que outros benefícios a escola ganharia?",
     "Consultas padronizadas em SQL, controle de acesso por perfil, backup e recuperação, acesso simultâneo seguro e regras de integridade."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Conceitos",
   "itens": [
    "Banco de dados representa um minimundo.",
    "SGBD define, manipula, protege e mantém.",
    "Dado → informação → conhecimento."
   ]
  },
  {
   "t": "Arquitetura e linguagens",
   "itens": [
    "Externo, conceitual, interno.",
    "DDL, DML, DCL, TCL."
   ]
  }
 ],
 "glossario": [
  [
   "SGBD",
   "Sistema Gerenciador de Banco de Dados."
  ],
  [
   "ANSI/SPARC",
   "Arquitetura em três níveis."
  ],
  [
   "DBA",
   "Administrador do banco de dados."
  ],
  [
   "Catálogo",
   "Onde ficam os metadados."
  ]
 ]
});
