FSI.modulo({
 "n": 3,
 "unidade": "Modelagem",
 "nome": "Modelo Entidade-Relacionamento",
 "titulo": "Retângulos, losangos e elipses: desenhando o DER",
 "duracao": "6 h",
 "resumoCurto": "Entidades, atributos, relacionamentos e cardinalidade",
 "analogia": {
  "titulo": "Substantivos, verbos e adjetivos",
  "txt": "<p>Leia a regra de negócio: “O <b>aluno</b> pega <b>livros</b> emprestados; cada livro tem <b>título</b> e <b>ano</b>.” Os <b>substantivos</b> viram <b>entidades</b> (retângulos), os <b>verbos</b> viram <b>relacionamentos</b> (losangos) e as características — os “adjetivos” — viram <b>atributos</b> (elipses). Contar quantos de cada lado participam dá a <b>cardinalidade</b>.</p>"
 },
 "chave": [
  "MER proposto por Peter Chen (1976); o DER é sua representação gráfica.",
  "Entidade = retângulo; atributo = elipse; relacionamento = losango.",
  "Entidade fraca depende de uma forte (retângulo e losango com borda dupla).",
  "Atributos: simples, composto, multivalorado (elipse dupla), derivado (tracejada), chave (sublinhado).",
  "Grau: unário, binário, ternário. Cardinalidade máxima: 1:1, 1:N, N:M.",
  "Participação: total (mín. 1, linha dupla) ou parcial (mín. 0)."
 ],
 "objetivos": [
  "Identificar <b>entidades, atributos e relacionamentos</b> num texto.",
  "Classificar <b>atributos</b> (simples, composto, multivalorado, derivado, chave).",
  "Definir <b>cardinalidade</b> (1:1, 1:N, N:M) e <b>participação</b>."
 ],
 "licoes": [
  {
   "t": "Os elementos do DER (Peter Chen, 1976)",
   "txt": "",
   "pontos": [
    "<b>Entidade</b> (retângulo): algo com existência própria — Aluno, Livro.",
    "<b>Entidade fraca</b> (retângulo duplo): só existe ligada a outra — Dependente de um Funcionário.",
    "<b>Relacionamento</b> (losango): associação entre entidades — empresta.",
    "<b>Atributo</b> (elipse): propriedade — título, ano."
   ]
  },
  {
   "t": "Tipos de atributo",
   "txt": "",
   "pontos": [
    "<b>Simples</b>: indivisível (ano).",
    "<b>Composto</b>: dividido em partes (endereço = rua + número + cidade).",
    "<b>Multivalorado</b> (elipse dupla): vários valores (telefones).",
    "<b>Derivado</b> (tracejado): calculado (idade a partir da data de nascimento).",
    "<b>Chave</b> (sublinhado): identifica (RA, ISBN)."
   ]
  },
  {
   "t": "Cardinalidade e participação",
   "txt": "<p>A cardinalidade máxima diz quantos de um lado se ligam a um do outro: <b>1:1</b> (aluno — carteirinha), <b>1:N</b> (autor — livros), <b>N:M</b> (alunos — disciplinas). A participação diz se é obrigatória (<b>total</b>, mínimo 1) ou opcional (<b>parcial</b>, mínimo 0).</p>",
   "pense": "um livro pode ter vários autores? Se sim, como fica a cardinalidade autor–livro?"
  }
 ],
 "termos": [
  [
   "Entidade",
   "Retângulo: algo com existência própria."
  ],
  [
   "Relacionamento",
   "Losango: associação."
  ],
  [
   "Cardinalidade",
   "1:1, 1:N, N:M."
  ],
  [
   "Entidade fraca",
   "Depende de outra para existir."
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
   "tipo": "rede",
   "id": "der",
   "titulo": "DER da biblioteca (clique em cada elemento)",
   "h": 380,
   "nos": [
    {
     "id": "al",
     "x": 120,
     "y": 190,
     "t": "ALUNO",
     "d": "Entidade. Atributos: RA (chave), nome, turma, cidade."
    },
    {
     "id": "em",
     "x": 360,
     "y": 190,
     "t": "empresta\n(N:M)",
     "d": "Relacionamento N:M: um aluno pega vários livros e um livro é emprestado a vários alunos ao longo do tempo. Atributo do relacionamento: data de saída."
    },
    {
     "id": "lv",
     "x": 600,
     "y": 190,
     "t": "LIVRO",
     "d": "Entidade. Atributos: id (chave), título, ano, gênero, páginas."
    },
    {
     "id": "au",
     "x": 600,
     "y": 330,
     "t": "AUTOR",
     "d": "Entidade. Relaciona-se com LIVRO (1:N no modelo simplificado: um autor escreve vários livros)."
    },
    {
     "id": "tl",
     "x": 120,
     "y": 60,
     "t": "telefones",
     "d": "Atributo multivalorado (elipse dupla): um aluno pode ter vários telefones."
    },
    {
     "id": "id",
     "x": 600,
     "y": 60,
     "t": "idade da obra",
     "d": "Atributo derivado (tracejado): calculado a partir do ano."
    }
   ],
   "liga": [
    [
     "al",
     "em"
    ],
    [
     "em",
     "lv"
    ],
    [
     "lv",
     "au"
    ],
    [
     "al",
     "tl"
    ],
    [
     "lv",
     "id"
    ]
   ]
  },
  {
   "tipo": "classificar",
   "id": "jogo-at",
   "titulo": "Jogo: que tipo de atributo?",
   "cats": [
    "Simples",
    "Composto",
    "Multivalorado",
    "Derivado",
    "Chave"
   ],
   "itens": [
    [
     "Ano de publicação",
     0
    ],
    [
     "Endereço (rua, número, cidade)",
     1
    ],
    [
     "Telefones de contato",
     2
    ],
    [
     "Idade (a partir da data de nascimento)",
     3
    ],
    [
     "RA do aluno",
     4
    ],
    [
     "Nome completo (nome, sobrenome)",
     1
    ],
    [
     "ISBN do livro",
     4
    ],
    [
     "Total de empréstimos do aluno",
     3
    ],
    [
     "E-mails do aluno",
     2
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Leia regras de negócio como um analista e decida entidades, atributos e cardinalidades.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Analista de dados: leia a regra e decida",
    "cfg": {
     "id": "der",
     "rotulo": "Regra",
     "medidor": {
      "nome": "Qualidade do modelo",
      "ini": 50
     },
     "itens": [
      {
       "t": "“Cada aluno tem uma única carteirinha da biblioteca, e cada carteirinha pertence a um único aluno.”",
       "ops": [
        [
         "1:1",
         true,
         "Um de cada lado."
        ],
        [
         "1:N",
         false,
         "Não há “vários” em nenhum lado."
        ],
        [
         "N:M",
         false,
         "Seria vários dos dois lados."
        ]
       ]
      },
      {
       "t": "“Um autor pode escrever vários livros; neste acervo, cada livro tem um único autor.”",
       "ops": [
        [
         "1:N (autor–livro)",
         true,
         "A FK fica no lado N: livro.autor_id."
        ],
        [
         "N:M",
         false,
         "Só seria N:M se um livro pudesse ter vários autores."
        ],
        [
         "1:1",
         false,
         "Um autor tem vários livros."
        ]
       ]
      },
      {
       "t": "“Um aluno cursa várias disciplinas e cada disciplina tem vários alunos.”",
       "ops": [
        [
         "N:M, que vira tabela associativa no relacional",
         true,
         "Ex.: matricula(ra, disciplina_id)."
        ],
        [
         "1:N",
         false,
         "Há “vários” dos dois lados."
        ],
        [
         "Entidade fraca",
         false,
         "É um relacionamento N:M."
        ]
       ]
      },
      {
       "t": "“Os dependentes de um funcionário só existem no sistema enquanto o funcionário existir.”",
       "ops": [
        [
         "Dependente é entidade fraca",
         true,
         "Identificada pelo funcionário + nome do dependente."
        ],
        [
         "Dependente é atributo multivalorado",
         false,
         "Dependente tem atributos próprios (nome, nascimento)."
        ],
        [
         "Relacionamento N:M",
         false,
         "Cada dependente pertence a um funcionário."
        ]
       ]
      },
      {
       "t": "“Guardar a idade do aluno.”",
       "ops": [
        [
         "Guardar a data de nascimento; idade é atributo derivado",
         true,
         "A idade muda todo ano; a data não."
        ],
        [
         "Guardar a idade como atributo simples",
         false,
         "Ficaria errada a cada aniversário."
        ],
        [
         "Criar entidade Idade",
         false,
         "Idade não tem existência própria."
        ]
       ]
      },
      {
       "t": "“Todo empréstimo precisa estar ligado a um aluno.”",
       "ops": [
        [
         "Participação total de Empréstimo no relacionamento",
         true,
         "Mínimo 1: não existe empréstimo sem aluno."
        ],
        [
         "Participação parcial",
         false,
         "Parcial permitiria empréstimo sem aluno."
        ],
        [
         "Cardinalidade N:M",
         false,
         "A frase fala de obrigatoriedade."
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
    "t": "Acerte 3 regras",
    "ev": "der:acertos:3"
   },
   {
    "id": "m2",
    "t": "Qualidade do modelo em 80% ou mais",
    "ev": "der:medidor80"
   },
   {
    "id": "m3",
    "t": "Analise todas as regras",
    "ev": "der:fim"
   },
   {
    "id": "m4",
    "t": "Analise todas sem erro",
    "ev": "der:perfeito"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "Quem propôs o Modelo ER e em que ano?",
   "Peter Chen, em 1976."
  ],
  [
   "Como se representa uma entidade no DER?",
   "Com um retângulo."
  ],
  [
   "Como se representa um relacionamento no DER?",
   "Com um losango."
  ],
  [
   "O que é uma entidade fraca?",
   "Entidade sem chave própria suficiente, identificada pela chave de uma entidade forte + sua chave parcial."
  ],
  [
   "O que é atributo composto? Exemplo.",
   "Atributo divisível em partes. Endereço = rua, número, cidade, CEP."
  ],
  [
   "O que é atributo multivalorado? Exemplo.",
   "Atributo com vários valores para a mesma entidade. Telefones de um cliente."
  ],
  [
   "O que é atributo derivado? Exemplo.",
   "Atributo calculado a partir de outro. Idade, derivada da data de nascimento."
  ],
  [
   "Como se indica o atributo chave no DER?",
   "Sublinhando o nome do atributo."
  ],
  [
   "O que é um auto-relacionamento?",
   "Entidade relacionada consigo mesma com papéis diferentes. FUNCIONÁRIO supervisiona FUNCIONÁRIO."
  ],
  [
   "O que significa cardinalidade (1,N)?",
   "Mínimo 1 e máximo N: participação obrigatória com muitas ocorrências possíveis."
  ],
  [
   "Onde fica o atributo Nota em ALUNO–matricula–DISCIPLINA?",
   "No relacionamento, porque depende da combinação aluno + disciplina."
  ],
  [
   "Cite 2 ferramentas de modelagem ER.",
   "brModelo, MySQL Workbench, draw.io, Lucidchart, ERDPlus, pgModeler."
  ]
 ],
 "vf": [
  [
   "Uma entidade pode ser algo abstrato, como um curso ou uma transação.",
   true,
   "Entidade é qualquer objeto ou conceito com existência independente, concreto ou abstrato."
  ],
  [
   "Atributos multivalorados são representados por elipse tracejada.",
   false,
   "Elipse tracejada é para derivado. Multivalorado usa elipse com borda dupla."
  ],
  [
   "Em um relacionamento 1:N, cada instância do lado N se liga a no máximo uma do lado 1.",
   true,
   "Ex.: cada funcionário está em um departamento; o departamento tem vários funcionários."
  ],
  [
   "Um relacionamento ternário envolve três entidades.",
   true,
   "Ex.: FORNECEDOR fornece PEÇA para PROJETO."
  ],
  [
   "Cardinalidade mínima zero indica participação obrigatória.",
   false,
   "Mínimo zero é participação parcial (opcional)."
  ],
  [
   "Relacionamentos podem ter atributos próprios.",
   true,
   "Comum em N:M, como Nota e Frequência na matrícula."
  ],
  [
   "DEPENDENTE é exemplo clássico de entidade fraca em relação a FUNCIONÁRIO.",
   true,
   "O dependente é identificado pelo CPF do funcionário + o nome do dependente."
  ],
  [
   "Toda entidade forte precisa ter pelo menos um atributo chave.",
   true,
   "É o que permite identificar cada instância de forma única."
  ],
  [
   "No DER, verbos do texto costumam virar entidades.",
   false,
   "Substantivos viram entidades; verbos viram relacionamentos."
  ],
  [
   "Em N:M, um aluno pode cursar várias disciplinas e uma disciplina ter vários alunos.",
   true,
   "É a definição de muitos-para-muitos."
  ],
  [
   "Idade é um bom atributo armazenado, pois nunca muda.",
   false,
   "Idade muda todo ano; armazena-se a data de nascimento e deriva-se a idade."
  ],
  [
   "Em um auto-relacionamento é preciso definir papéis, como supervisor e supervisionado.",
   true,
   "Os papéis distinguem as duas participações da mesma entidade."
  ]
 ],
 "caderno": [
  [
   "Desenhe os símbolos do DER: entidade, entidade fraca, atributo, atributo chave, multivalorado, derivado e relacionamento.",
   "Retângulo; retângulo duplo; elipse; elipse com nome sublinhado; elipse dupla; elipse tracejada; losango."
  ],
  [
   "Classifique os atributos de CLIENTE: CPF, Nome, Endereço, Telefones, Idade.",
   "CPF: chave/simples; Nome: simples; Endereço: composto; Telefones: multivalorado; Idade: derivado."
  ],
  [
   "Para o texto \"Um professor ministra várias disciplinas; cada disciplina tem um professor\", identifique entidades, relacionamento e cardinalidade.",
   "Entidades PROFESSOR e DISCIPLINA; relacionamento ministra; 1:N (um professor, N disciplinas)."
  ],
  [
   "Dê um exemplo de relacionamento 1:1 com cardinalidades mínimas.",
   "FUNCIONÁRIO (0,1) gerencia (1,1) DEPARTAMENTO: nem todo funcionário gerencia, mas todo departamento tem um gerente."
  ],
  [
   "Desenhe um auto-relacionamento para \"um aluno pode ser monitor de outros alunos\".",
   "ALUNO (monitor) —1:N— monitora —N:1— ALUNO (monitorado)."
  ],
  [
   "Escreva os 7 passos para construir um DER.",
   "Identificar entidades, relacionamentos, atributos, chaves, cardinalidades, entidades fracas e validar com os usuários."
  ],
  [
   "Modele em texto uma locadora: CLIENTE, VEÍCULO, LOCAÇÃO. Indique chaves e cardinalidades.",
   "CLIENTE(CPF, nome) 1:N LOCAÇÃO(num, data_ret, data_dev) N:1 VEÍCULO(placa, modelo). Ou CLIENTE N:M VEÍCULO via aluga, com atributos datas e valor."
  ],
  [
   "Explique participação total com um exemplo.",
   "Toda instância participa. Todo PEDIDO pertence a um CLIENTE (linha dupla do lado PEDIDO)."
  ],
  [
   "Por que Frequência não pode ficar em ALUNO nem em DISCIPLINA?",
   "Porque o valor depende do par aluno-disciplina; em ALUNO seria uma só para todas as disciplinas."
  ],
  [
   "Dê um exemplo de relacionamento ternário diferente do livro.",
   "MÉDICO atende PACIENTE em CLÍNICA; PROFESSOR leciona DISCIPLINA para TURMA."
  ]
 ],
 "pbl": [
  {
   "titulo": "Loja virtual de artesanato",
   "cenario": "Artesãs de Tobias Barreto querem vender online. Cada produto tem uma artesã e uma ou mais categorias. Clientes fazem pedidos com vários produtos e quantidades.",
   "passos": [
    [
     "Quais são as entidades?",
     "ARTESÃ, PRODUTO, CATEGORIA, CLIENTE, PEDIDO."
    ],
    [
     "Quais relacionamentos e cardinalidades?",
     "ARTESÃ 1:N PRODUTO; PRODUTO N:M CATEGORIA; CLIENTE 1:N PEDIDO; PEDIDO N:M PRODUTO."
    ],
    [
     "Onde fica o atributo Quantidade?",
     "No relacionamento PEDIDO–PRODUTO (item do pedido), porque depende do par pedido + produto."
    ]
   ]
  },
  {
   "titulo": "Plano de saúde e dependentes",
   "cenario": "Um plano de saúde cadastra titulares pelo CPF. Cada titular pode ter dependentes, identificados apenas pelo nome e parentesco. Um dependente não existe sem titular.",
   "passos": [
    [
     "Que tipo de entidade é DEPENDENTE?",
     "Entidade fraca."
    ],
    [
     "Qual será a identificação completa do dependente?",
     "CPF do titular + nome do dependente (chave parcial)."
    ],
    [
     "Como fica a notação no DER?",
     "DEPENDENTE e o relacionamento identificador com borda dupla; participação total de DEPENDENTE (linha dupla)."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "DER",
   "itens": [
    "Retângulo, losango, elipse.",
    "Atributos: simples, composto, multivalorado, derivado, chave.",
    "1:1, 1:N, N:M; participação total ou parcial."
   ]
  }
 ],
 "glossario": [
  [
   "DER",
   "Diagrama Entidade-Relacionamento."
  ],
  [
   "Peter Chen",
   "Propôs o modelo ER em 1976."
  ]
 ]
});
