FSI.modulo({
 "n": 2,
 "unidade": "Unidade 1",
 "nome": "Processos e métodos ágeis",
 "titulo": "Cascata, incremental, espiral — e o Scrum na prática",
 "duracao": "10 h",
 "resumoCurto": "Modelos de processo (cascata, prototipação, incremental, espiral), manifesto ágil, Scrum (papéis, eventos e artefatos), Kanban e XP.",
 "analogia": {
  "titulo": "Viagem planejada × mochilão",
  "txt": "<p>Na viagem planejada (<b>cascata</b>) tudo é decidido antes de sair: roteiro, hotéis, horários. Funciona quando nada muda. No mochilão (<b>ágil</b>) você planeja os próximos dias, viaja, conversa com quem conhece o lugar e ajusta o plano a cada parada. O <b>Scrum</b> organiza o mochilão em etapas curtas chamadas <b>sprints</b>.</p>"
 },
 "chave": [
  "<b>Cascata</b>: fases em sequência; bom quando os requisitos são estáveis.",
  "<b>Prototipação</b>: versões rápidas para descobrir o que o cliente quer.",
  "<b>Incremental</b>: entrega em partes; <b>espiral</b>: ciclos guiados por análise de risco.",
  "Manifesto ágil: indivíduos e interações, software funcionando, colaboração com o cliente, responder a mudanças.",
  "Scrum: <b>Product Owner, Scrum Master, Developers</b>; sprint, planning, daily, review, retrospectiva; backlog do produto e da sprint.",
  "Kanban: fluxo visual com limite de trabalho em andamento (WIP); XP: programação em par, testes primeiro."
 ],
 "objetivos": [
  "Comparar os <b>modelos de processo</b>.",
  "Explicar os <b>valores ágeis</b>.",
  "Descrever <b>papéis, eventos e artefatos</b> do Scrum.",
  "Usar um quadro <b>Kanban</b>."
 ],
 "licoes": [
  {
   "t": "Modelos tradicionais",
   "txt": "<p><b>Cascata</b>: requisitos → projeto → implementação → testes → manutenção, uma fase depois da outra. <b>Prototipação</b>: protótipos para esclarecer requisitos. <b>Incremental</b>: o sistema chega em incrementos úteis. <b>Espiral</b> (Boehm): ciclos com análise de riscos em cada volta.</p>"
  },
  {
   "t": "Ágil e Scrum",
   "txt": "<p>Sprints de 1 a 4 semanas. O <b>Product Owner</b> prioriza o backlog do produto; os <b>Developers</b> escolhem o que cabe na sprint (planning), se alinham diariamente (daily de 15 minutos), mostram o incremento (review) e melhoram o processo (retrospectiva). O <b>Scrum Master</b> remove impedimentos e ensina o Scrum.</p>"
  },
  {
   "t": "Kanban e XP",
   "txt": "<p>Kanban: colunas A fazer, Fazendo, Feito, com limite de tarefas em andamento. XP: programação em par, TDD (testes antes do código), integração contínua e entregas pequenas.</p>",
   "pense": "por que limitar o número de tarefas na coluna Fazendo ajuda a terminar mais coisas?"
  }
 ],
 "termos": [
  [
   "Sprint",
   "Ciclo curto de desenvolvimento."
  ],
  [
   "Backlog",
   "Lista priorizada do que fazer."
  ],
  [
   "Product Owner",
   "Prioriza o valor do produto."
  ],
  [
   "WIP",
   "Limite de trabalho em andamento."
  ]
 ],
 "ler": [
  [
   "Apostila de Engenharia de Software",
   "apostila-engenharia-de-software.html"
  ],
  [
   "Apostila de Engenharia de Software I",
   "apostila-engenharia-de-software-1.html"
  ],
  [
   "Apostila de Engenharia de Requisitos",
   "apostila-engenharia-de-requisitos.html"
  ],
  [
   "Roteiro de atividade RápidoJá",
   "roteiro-processo-de-software.html"
  ],
  [
   "Dicionário de dados",
   "dicionario-de-dados.html"
  ]
 ],
 "visuais": [
  {
   "tipo": "linha",
   "id": "sprint",
   "titulo": "O ciclo de uma sprint",
   "ordenar": true,
   "passos": [
    {
     "t": "Product backlog",
     "d": "Lista priorizada pelo Product Owner."
    },
    {
     "t": "Sprint planning",
     "d": "O time escolhe o que cabe na sprint."
    },
    {
     "t": "Sprint (1 a 4 semanas)",
     "d": "Desenvolvimento com daily de 15 minutos."
    },
    {
     "t": "Sprint review",
     "d": "Mostra o incremento ao cliente."
    },
    {
     "t": "Retrospectiva",
     "d": "O time melhora o próprio processo."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Escolha o processo certo para cada projeto e conduza decisões de uma sprint.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Que processo usar?",
    "cfg": {
     "id": "pr",
     "rotulo": "Projeto",
     "medidor": {
      "nome": "Projetos entregues",
      "ini": 50
     },
     "itens": [
      {
       "t": "Sistema de controle de um equipamento hospitalar, com requisitos fixos definidos por norma.",
       "ops": [
        [
         "Cascata (ou plano rigoroso)",
         true,
         "Requisitos estáveis e muita documentação exigida."
        ],
        [
         "Kanban sem planejamento",
         false,
         "Inadequado para algo crítico e regulado."
        ],
        [
         "Só prototipação",
         false,
         "Não basta."
        ]
       ]
      },
      {
       "t": "App de uma startup que ainda está descobrindo o que os clientes querem.",
       "ops": [
        [
         "Ágil (Scrum)",
         true,
         "Entregas curtas e mudança constante."
        ],
        [
         "Cascata",
         false,
         "Os requisitos vão mudar."
        ],
        [
         "Espiral de 2 anos",
         false,
         "Lento demais."
        ]
       ]
      },
      {
       "t": "O cliente não sabe explicar como quer as telas.",
       "ops": [
        [
         "Prototipação",
         true,
         "Mostrar versões rápidas para descobrir."
        ],
        [
         "Cascata",
         false,
         "Exige requisitos claros no início."
        ],
        [
         "Nenhum processo",
         false,
         "Pioraria."
        ]
       ]
      },
      {
       "t": "Projeto grande, caro e com muitos riscos técnicos novos.",
       "ops": [
        [
         "Espiral",
         true,
         "Análise de risco a cada ciclo."
        ],
        [
         "Cascata",
         false,
         "Risco descoberto tarde."
        ],
        [
         "Codificar direto",
         false,
         "Risco altíssimo."
        ]
       ]
      },
      {
       "t": "Equipe de suporte recebendo chamados contínuos, sem datas de entrega fixas.",
       "ops": [
        [
         "Kanban",
         true,
         "Fluxo contínuo com limite de WIP."
        ],
        [
         "Cascata",
         false,
         "Não há projeto com fim definido."
        ],
        [
         "Espiral",
         false,
         "Não se encaixa em fluxo contínuo."
        ]
       ]
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "lab-scrum",
    "titulo": "Papel, evento ou artefato do Scrum?",
    "cats": [
     "Papel",
     "Evento",
     "Artefato"
    ],
    "itens": [
     [
      "Product Owner",
      0
     ],
     [
      "Scrum Master",
      0
     ],
     [
      "Developers",
      0
     ],
     [
      "Daily",
      1
     ],
     [
      "Sprint review",
      1
     ],
     [
      "Retrospectiva",
      1
     ],
     [
      "Product backlog",
      2
     ],
     [
      "Sprint backlog",
      2
     ],
     [
      "Incremento",
      2
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Escolha o processo de 3 projetos",
    "ev": "pr:acertos:3"
   },
   {
    "id": "m2",
    "t": "Escolha o processo de todos os projetos sem erro",
    "ev": "pr:perfeito"
   },
   {
    "id": "m3",
    "t": "Classifique os elementos do Scrum",
    "ev": "vis:lab-scrum"
   },
   {
    "id": "m4",
    "t": "Ordene o ciclo da sprint (Explorar)",
    "ev": "ord:sprint"
   }
  ],
  "guiados": [
   {
    "titulo": "Velocidade do time",
    "txt": "<p>Nas últimas 3 sprints o time entregou <b>21, 24 e 27</b> pontos de história. O backlog restante tem <b>120 pontos</b>.</p>",
    "passos": [
     {
      "p": "Velocidade média (pontos por sprint)?",
      "r": 24,
      "dica": "(21 + 24 + 27) ÷ 3.",
      "expl": "24 pontos."
     },
     {
      "p": "Quantas sprints faltam para terminar o backlog?",
      "r": 5,
      "dica": "120 ÷ 24.",
      "expl": "5 sprints."
     },
     {
      "p": "Com sprints de 2 semanas, quantas semanas?",
      "r": 10,
      "un": "semanas",
      "dica": "5 × 2.",
      "expl": "10 semanas — estimativa a revisar a cada sprint."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Quais as fases do modelo cascata?",
   "Requisitos, projeto, implementação, testes e manutenção."
  ],
  [
   "Quando o cascata funciona bem?",
   "Com requisitos estáveis e bem conhecidos."
  ],
  [
   "Para que serve a prototipação?",
   "Descobrir e validar requisitos com o cliente usando versões rápidas."
  ],
  [
   "O que caracteriza o modelo espiral?",
   "Ciclos iterativos com análise de riscos em cada volta (Boehm)."
  ],
  [
   "Cite os 4 valores do manifesto ágil.",
   "Indivíduos e interações, software funcionando, colaboração com o cliente, responder a mudanças."
  ],
  [
   "Quais os papéis do Scrum?",
   "Product Owner, Scrum Master e Developers."
  ],
  [
   "Quanto dura uma sprint?",
   "De 1 a 4 semanas."
  ],
  [
   "Para que serve a daily?",
   "Alinhar o time em até 15 minutos e identificar impedimentos."
  ],
  [
   "Review × retrospectiva?",
   "Review mostra o produto; retrospectiva melhora o processo do time."
  ],
  [
   "O que é o product backlog?",
   "Lista priorizada de tudo que o produto pode ter."
  ],
  [
   "O que limita o WIP no Kanban?",
   "O número máximo de tarefas em andamento em cada coluna."
  ],
  [
   "O que é TDD?",
   "Escrever o teste antes do código (prática do XP)."
  ]
 ],
 "vf": [
  [
   "No cascata, voltar a uma fase anterior é barato.",
   false,
   "Mudanças tardias custam caro."
  ],
  [
   "O ágil dispensa qualquer documentação.",
   false,
   "Valoriza mais o software funcionando, mas documenta o necessário."
  ],
  [
   "O Product Owner prioriza o backlog.",
   true,
   "Ele maximiza o valor do produto."
  ],
  [
   "O Scrum Master é o chefe que distribui tarefas.",
   false,
   "Ele facilita e remove impedimentos; o time se auto-organiza."
  ],
  [
   "A daily pode durar uma hora.",
   false,
   "No máximo 15 minutos."
  ],
  [
   "Ao fim de cada sprint deve haver um incremento utilizável.",
   true,
   "É o objetivo da sprint."
  ],
  [
   "Kanban usa colunas para mostrar o fluxo do trabalho.",
   true,
   "A fazer, fazendo, feito."
  ],
  [
   "O modelo incremental entrega o sistema em partes.",
   true,
   "Cada incremento agrega funcionalidade."
  ],
  [
   "A espiral ignora riscos.",
   false,
   "Risco é o centro do modelo."
  ],
  [
   "Prototipação ajuda quando o cliente não sabe explicar o que quer.",
   true,
   "Ver ajuda a decidir."
  ],
  [
   "Na retrospectiva o time avalia o próprio modo de trabalhar.",
   true,
   "E define melhorias."
  ],
  [
   "Programação em par é prática do XP.",
   true,
   "Dois programadores, um computador."
  ]
 ],
 "caderno": [
  [
   "Desenhe o cascata e cite uma vantagem e uma desvantagem.",
   "Fases em sequência; vantagem: organização e documentação; desvantagem: mudanças tardias custam caro."
  ],
  [
   "Explique a analogia da viagem planejada e do mochilão.",
   "Cascata decide tudo antes; ágil planeja curto, executa e ajusta."
  ],
  [
   "Quais os 4 valores ágeis?",
   "Indivíduos e interações, software funcionando, colaboração com o cliente, responder a mudanças."
  ],
  [
   "Descreva os 3 papéis do Scrum.",
   "PO prioriza o valor; Scrum Master facilita; Developers constroem o incremento."
  ],
  [
   "Descreva os eventos de uma sprint.",
   "Planning, daily, review e retrospectiva, dentro da sprint."
  ],
  [
   "Monte um quadro Kanban com 4 tarefas do seu trabalho escolar.",
   "A fazer / Fazendo (WIP 2) / Feito, com tarefas como pesquisar, escrever, revisar, entregar."
  ],
  [
   "Por que limitar o WIP?",
   "Evita começar muito e terminar pouco; mostra gargalos."
  ],
  [
   "Quando escolher espiral?",
   "Projetos grandes e arriscados, com tecnologia nova."
  ],
  [
   "O que é um incremento?",
   "Parte do produto pronta e utilizável, entregue ao fim da sprint."
  ],
  [
   "Cite 2 práticas do XP.",
   "Programação em par e TDD (também integração contínua e refatoração)."
  ]
 ],
 "pbl": [
  {
   "titulo": "O app do grêmio em sprints",
   "cenario": "<p>O grêmio quer um app com cardápio, avisos e eleições. Há 8 semanas e 4 alunos desenvolvedores.</p>",
   "passos": [
    [
     "Defina os papéis do Scrum e o tamanho das sprints.",
     "PO: presidente do grêmio; Scrum Master: um aluno; Developers: os outros; 4 sprints de 2 semanas."
    ],
    [
     "Monte o backlog priorizado das duas primeiras sprints.",
     "Sprint 1: avisos e cardápio (mais usados); Sprint 2: eleições com votação e resultado."
    ]
   ]
  },
  {
   "titulo": "Cascata que deu errado",
   "cenario": "<p>Uma empresa passou 1 ano especificando e programando um sistema. Na entrega, o cliente disse que não era aquilo.</p>",
   "passos": [
    [
     "Por que isso aconteceu?",
     "O cliente só viu o sistema no fim; os requisitos mudaram ou foram mal entendidos."
    ],
    [
     "Que processo e práticas teriam evitado?",
     "Ágil ou incremental com entregas frequentes, prototipação e o cliente participando das reviews."
    ]
   ]
  },
  {
   "titulo": "Suporte afogado",
   "cenario": "<p>A equipe de TI do campus começa 20 chamados ao mesmo tempo e termina poucos.</p>",
   "passos": [
    [
     "Que método ajuda e como?",
     "Kanban com limite de WIP: só se começa um novo chamado quando outro termina."
    ],
    [
     "Que indicador acompanhar?",
     "Tempo de ciclo (do início ao fim de cada chamado) e quantidade concluída por semana."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Processos",
   "itens": [
    "Cascata, prototipação, incremental, espiral.",
    "Manifesto ágil.",
    "Scrum: papéis, eventos, artefatos.",
    "Kanban (WIP) e XP (par, TDD)."
   ]
  }
 ],
 "glossario": [
  [
   "Story points",
   "Medida relativa de esforço."
  ],
  [
   "Burndown",
   "Gráfico do trabalho restante."
  ]
 ]
});
