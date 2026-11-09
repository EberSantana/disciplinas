FSI.modulo({
 "n": 2,
 "unidade": "Fundamentos",
 "nome": "Projeto e ciclo de vida",
 "titulo": "Do pedido do cliente ao banco instalado: as fases do projeto",
 "duracao": "4 h",
 "resumoCurto": "Requisitos, projeto conceitual, lógico e físico, dicionário de dados",
 "analogia": {
  "titulo": "A planta da casa",
  "txt": "<p>Ninguém constrói uma casa começando pelo tijolo. Primeiro se conversa com a família (<b>requisitos</b>), depois se faz um croqui que qualquer pessoa entende (<b>projeto conceitual</b>), depois a planta técnica com medidas (<b>projeto lógico</b>) e, por fim, decide-se o material e a fundação (<b>projeto físico</b>). Com o banco de dados é igual.</p>"
 },
 "chave": [
  "Fases do projeto: requisitos → conceitual → lógico → físico. Cada fase gera o insumo da seguinte.",
  "Conceitual: O QUE será guardado, independente de SGBD (DER + dicionário).",
  "Lógico: tabelas, chaves, normalização e restrições no modelo do SGBD escolhido.",
  "Físico: COMO guardar — índices, particionamento, tablespaces, ajuste de parâmetros.",
  "Ciclo de vida completo: planejamento, requisitos, projetos, implementação, testes, operação e evolução.",
  "Abordagens: top-down, bottom-up e mista (inside-out)."
 ],
 "objetivos": [
  "Ordenar as fases do <b>projeto de banco de dados</b>.",
  "Diferenciar os modelos <b>conceitual, lógico e físico</b>.",
  "Montar um <b>dicionário de dados</b> simples."
 ],
 "licoes": [
  {
   "t": "As quatro fases",
   "txt": "<p>Cada fase produz o insumo da seguinte:</p>",
   "pontos": [
    "<b>Requisitos:</b> entrevistas e documentos para saber que dados existem e que perguntas o banco deve responder.",
    "<b>Conceitual:</b> o <i>o quê</i> — entidades e relacionamentos num DER, sem pensar em SGBD.",
    "<b>Lógico:</b> tabelas, chaves e restrições no modelo relacional, já normalizadas.",
    "<b>Físico:</b> o <i>como</i> — tipos de dados do SGBD escolhido, índices, particionamento."
   ]
  },
  {
   "t": "Dicionário de dados",
   "txt": "<p>É a ficha técnica de cada tabela: nome da coluna, tipo, tamanho, se aceita nulo, se é chave e o significado. Ele evita que cada programador entenda “status” de um jeito e é a documentação que acompanha o DER.</p>"
  },
  {
   "t": "Abordagens",
   "txt": "<p><b>Top-down</b> parte das grandes entidades e detalha; <b>bottom-up</b> parte dos atributos que aparecem nos formulários e os agrupa; a <b>mista</b> combina as duas. Na prática, o ciclo de vida continua depois da implantação: testes, operação e evolução.</p>"
  }
 ],
 "termos": [
  [
   "Modelo conceitual",
   "O que guardar (DER)."
  ],
  [
   "Modelo lógico",
   "Tabelas, chaves e restrições."
  ],
  [
   "Modelo físico",
   "Como guardar no SGBD."
  ],
  [
   "Dicionário de dados",
   "Ficha técnica das colunas."
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
   "id": "fases",
   "titulo": "As fases do projeto",
   "ordenar": true,
   "passos": [
    {
     "t": "Requisitos",
     "d": "Entrevistar usuários, ler formulários e relatórios."
    },
    {
     "t": "Projeto conceitual",
     "d": "DER e dicionário, independente de SGBD."
    },
    {
     "t": "Projeto lógico",
     "d": "Tabelas, chaves, normalização."
    },
    {
     "t": "Projeto físico",
     "d": "Tipos, índices, armazenamento."
    },
    {
     "t": "Implementação e testes",
     "d": "Scripts DDL, carga e validação."
    },
    {
     "t": "Operação e evolução",
     "d": "Uso, ajustes e novas versões."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Ponha o ciclo do projeto na ordem certa e diga em que fase cada tarefa acontece.",
  "sims": [
   {
    "tipo": "linha",
    "id": "lab-fases",
    "titulo": "Ordene as fases do projeto",
    "ordenar": true,
    "passos": [
     {
      "t": "Levantar requisitos",
      "d": "Conversar com a bibliotecária e coletar fichas."
     },
     {
      "t": "Desenhar o DER",
      "d": "Entidades Livro, Autor, Aluno, Empréstimo."
     },
     {
      "t": "Mapear para tabelas",
      "d": "Chaves primárias e estrangeiras."
     },
     {
      "t": "Escolher tipos e índices",
      "d": "VARCHAR, INTEGER, índice no título."
     },
     {
      "t": "Criar e testar",
      "d": "Scripts CREATE TABLE e dados de teste."
     }
    ]
   },
   {
    "tipo": "classificar",
    "id": "lab-qual",
    "titulo": "Em que fase isso acontece?",
    "cats": [
     "Requisitos",
     "Conceitual",
     "Lógico",
     "Físico"
    ],
    "itens": [
     [
      "Entrevistar a bibliotecária",
      0
     ],
     [
      "Ler o formulário de empréstimo em papel",
      0
     ],
     [
      "Desenhar o losango “empresta”",
      1
     ],
     [
      "Definir que Aluno tem atributo multivalorado telefone",
      1
     ],
     [
      "Criar a FK ra na tabela emprestimo",
      2
     ],
     [
      "Eliminar dependência transitiva",
      2
     ],
     [
      "Criar índice no título do livro",
      3
     ],
     [
      "Escolher VARCHAR(120) para o título",
      3
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Veja todas as fases",
    "ev": "vis:lab-fases"
   },
   {
    "id": "m2",
    "t": "Ordene as fases corretamente",
    "ev": "ord:lab-fases"
   },
   {
    "id": "m3",
    "t": "Classifique as tarefas sem erros",
    "ev": "vis:lab-qual"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "Qual é a primeira fase do projeto de banco de dados?",
   "Levantamento e análise de requisitos."
  ],
  [
   "Qual o artefato do levantamento de requisitos?",
   "O Documento de Requisitos de Dados."
  ],
  [
   "O que o projeto conceitual produz?",
   "Um DER acompanhado do dicionário de dados, independente de SGBD."
  ],
  [
   "O que acontece no projeto lógico?",
   "Mapeamento ER→relacional, normalização e definição de PKs, FKs e demais restrições."
  ],
  [
   "Cite 3 decisões do projeto físico.",
   "Índices, organização de arquivos, particionamento, tablespaces, ajuste de parâmetros, desnormalização controlada."
  ],
  [
   "O que é dicionário de dados?",
   "Documento que descreve formalmente cada elemento: nome, descrição, tipo, tamanho, domínio, restrições e exemplos."
  ],
  [
   "Cite 4 técnicas de levantamento de requisitos.",
   "Entrevistas, análise de documentos, observação, questionários, workshops, análise de sistemas legados, prototipagem."
  ],
  [
   "O que é a abordagem top-down?",
   "Parte da visão geral (entidades principais) e detalha progressivamente atributos e subtipos."
  ],
  [
   "O que é a abordagem bottom-up?",
   "Parte dos atributos individuais e os agrupa em entidades e relacionamentos."
  ],
  [
   "O que é a abordagem inside-out (mista)?",
   "Começa pelas entidades mais evidentes e expande para generalizações e detalhes."
  ],
  [
   "O que é desnormalização controlada?",
   "Introduzir redundância calculada no projeto físico para acelerar leituras frequentes."
  ],
  [
   "Qual fase do ciclo de vida inclui carga inicial (ETL)?",
   "A implementação."
  ]
 ],
 "vf": [
  [
   "O projeto conceitual já deve indicar se o banco será PostgreSQL ou MySQL.",
   false,
   "O conceitual é independente de SGBD; a escolha pesa a partir do lógico/físico."
  ],
  [
   "O projeto lógico produz tabelas com chaves primárias e estrangeiras.",
   true,
   "É a tradução do DER para o modelo relacional do SGBD escolhido."
  ],
  [
   "Criar índices é uma decisão do projeto conceitual.",
   false,
   "Índices são decisões de desempenho do projeto físico."
  ],
  [
   "Normalização é uma atividade do projeto lógico.",
   true,
   "Ela ajusta as tabelas para eliminar redundância antes da implementação física."
  ],
  [
   "O ciclo de vida de um banco termina quando o sistema entra em produção.",
   false,
   "Depois vêm operação, manutenção e evolução, até a desativação."
  ],
  [
   "Entrevistas e observação do ambiente são técnicas de levantamento de requisitos.",
   true,
   "Ambas ajudam a descobrir quais dados a organização precisa."
  ],
  [
   "O dicionário de dados registra o tipo, o tamanho e as restrições de cada atributo.",
   true,
   "Também registra descrição, domínio, entidade e exemplos."
  ],
  [
   "A abordagem bottom-up começa pelas entidades principais.",
   false,
   "Essa é a top-down. A bottom-up começa pelos atributos."
  ],
  [
   "Particionar tabelas grandes é uma técnica de projeto físico.",
   true,
   "Divide a tabela em partes para ganhar desempenho e facilitar manutenção."
  ],
  [
   "Testes de desempenho e segurança fazem parte do ciclo de vida.",
   true,
   "Estão na fase de testes e validação, antes da operação."
  ],
  [
   "Um projeto conceitual bem feito pode ser implementado em SGBDs diferentes.",
   true,
   "Justamente por ser independente de SGBD."
  ],
  [
   "Desnormalizar sempre é um erro de projeto.",
   false,
   "Pode ser escolha consciente do projeto físico para leituras frequentes, desde que controlada."
  ]
 ],
 "caderno": [
  [
   "Desenhe o fluxo das 4 fases do projeto e escreva o artefato gerado em cada uma.",
   "Requisitos → Documento de requisitos; Conceitual → DER + dicionário; Lógico → esquema relacional; Físico → scripts DDL, índices e parâmetros."
  ],
  [
   "Escreva uma entrada de dicionário de dados para o atributo Email de ALUNO.",
   "Atributo: Email; Entidade: ALUNO; Descrição: email institucional; Tipo: VARCHAR(150); Restrições: UNIQUE, NOT NULL; Domínio: texto com @; Exemplo: ana@academico.ifs.edu.br."
  ],
  [
   "Explique a diferença entre projeto lógico e projeto físico.",
   "O lógico define as tabelas, colunas e restrições (estrutura). O físico decide como armazenar com desempenho: índices, arquivos, partições e parâmetros."
  ],
  [
   "Liste as 9 fases do ciclo de vida de um banco de dados.",
   "Planejamento, análise de requisitos, projeto conceitual, projeto lógico, projeto físico, implementação, testes e validação, operação e manutenção, evolução."
  ],
  [
   "Elabore 5 perguntas para entrevistar a bibliotecária da escola.",
   "Ex.: Que dados de cada livro vocês anotam? Quem pode pegar livros? Quantos por vez e por quanto tempo? O que acontece no atraso? Que relatórios vocês precisam?"
  ],
  [
   "Cite 3 fatores para escolher um SGBD.",
   "Custo/licença, volume e crescimento dos dados, suporte a transações, comunidade, segurança, compatibilidade com a aplicação."
  ],
  [
   "Compare top-down e bottom-up em uma tabela.",
   "Top-down: parte do geral, bom para sistemas grandes. Bottom-up: parte dos atributos, bom quando os dados são conhecidos mas as entidades não."
  ],
  [
   "Por que o conceitual deve ser independente de SGBD?",
   "Para representar só o que a organização precisa e permitir implementar o mesmo modelo em qualquer SGBD."
  ],
  [
   "Dê 2 exemplos de restrições de integridade identificadas no levantamento de requisitos.",
   "\"Todo aluno pertence a um curso\"; \"a nota vai de 0 a 10\"; \"o CPF não se repete\"."
  ],
  [
   "O que é feito na fase de operação e manutenção?",
   "Monitoramento, ajuste de desempenho (tuning), backups e pequenas evoluções do esquema."
  ]
 ],
 "pbl": [
  {
   "titulo": "Banco de dados da escola técnica",
   "cenario": "Uma escola técnica quer um sistema para cursos, turmas, alunos, professores e notas. Vocês são a equipe de projeto.",
   "passos": [
    [
     "Quais técnicas de levantamento vocês usariam e com quem?",
     "Entrevistas com secretaria e coordenação, análise de diários e boletins atuais, observação da matrícula e questionário aos professores."
    ],
    [
     "Liste as entidades candidatas que surgem dos requisitos.",
     "CURSO, TURMA, ALUNO, PROFESSOR, DISCIPLINA, MATRICULA/NOTA."
    ],
    [
     "Que decisão de projeto físico faria sentido para o boletim?",
     "Índice em Matricula e CodDisciplina na tabela de notas, porque o boletim filtra por aluno e disciplina o tempo todo."
    ]
   ]
  },
  {
   "titulo": "O sistema que ninguém documentou",
   "cenario": "Um sistema de estoque funciona há 8 anos, mas não há documentação. O desenvolvedor saiu e ninguém sabe o que significa a coluna \"flg_st2\".",
   "passos": [
    [
     "Qual artefato faltou nesse projeto?",
     "O dicionário de dados."
    ],
    [
     "Como reconstruir a documentação?",
     "Engenharia reversa: ler o esquema no catálogo, analisar os dados e o código que usa cada coluna e entrevistar os usuários."
    ],
    [
     "Que regra de nomenclatura evitaria o problema?",
     "Nomes descritivos e padronizados (ex.: status_estoque em vez de flg_st2), registrados no dicionário."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Fases",
   "itens": [
    "Requisitos → conceitual → lógico → físico.",
    "Dicionário de dados documenta cada coluna."
   ]
  }
 ],
 "glossario": [
  [
   "Top-down",
   "Do geral ao detalhe."
  ],
  [
   "Bottom-up",
   "Dos atributos às entidades."
  ]
 ]
});
