FSI.modulo({
 "n": 4,
 "unidade": "Unidade 3",
 "nome": "UML: casos de uso",
 "titulo": "Quem usa o sistema e para quê",
 "duracao": "8 h",
 "resumoCurto": "Atores, casos de uso, fronteira do sistema, associação, include, extend e generalização; documentação do caso de uso.",
 "analogia": {
  "titulo": "O cardápio do restaurante",
  "txt": "<p>Um cardápio mostra o que o cliente pode pedir, sem explicar a receita. O <b>diagrama de casos de uso</b> é o cardápio do sistema: mostra os <b>atores</b> (quem usa) e os <b>casos de uso</b> (o que cada um pode fazer), sem dizer como o sistema faz por dentro.</p>"
 },
 "chave": [
  "<b>Ator</b> (bonequinho): papel de quem interage — pessoa, sistema externo ou dispositivo.",
  "<b>Caso de uso</b> (elipse): objetivo do ator, com verbo no infinitivo: “Emitir boletim”.",
  "A <b>fronteira</b> (retângulo) separa o sistema do mundo.",
  "<b>&lt;&lt;include&gt;&gt;</b>: sempre executa o incluído; <b>&lt;&lt;extend&gt;&gt;</b>: executa às vezes, sob condição.",
  "<b>Generalização</b>: ator ou caso de uso especializado herda do geral.",
  "Cada caso de uso tem uma descrição: atores, pré-condições, fluxo principal, fluxos alternativos, pós-condições."
 ],
 "objetivos": [
  "Identificar <b>atores e casos de uso</b>.",
  "Usar <b>include, extend e generalização</b>.",
  "Documentar um <b>caso de uso</b>."
 ],
 "licoes": [
  {
   "t": "Elementos",
   "txt": "<p>Atores ficam fora da fronteira; casos de uso dentro. O nome do caso de uso começa com verbo: Realizar pedido, Consultar notas. Ator é papel, não pessoa: a mesma pessoa pode ser Aluno e Monitor.</p>"
  },
  {
   "t": "Relacionamentos",
   "txt": "<p><b>include</b>: “Realizar pedido” sempre inclui “Autenticar”. <b>extend</b>: “Aplicar cupom” estende “Pagar pedido” só quando há cupom. <b>Generalização</b>: “Professor” e “Aluno” especializam “Usuário”.</p>"
  },
  {
   "t": "Documentação",
   "txt": "<p>Nome, atores, pré-condição (o aluno está logado), fluxo principal passo a passo, fluxos alternativos (saldo insuficiente), pós-condição (pedido registrado).</p>",
   "pense": "“Clicar no botão OK” é um bom caso de uso?"
  }
 ],
 "termos": [
  [
   "Ator",
   "Papel externo que interage."
  ],
  [
   "Caso de uso",
   "Objetivo do ator com o sistema."
  ],
  [
   "include",
   "Comportamento sempre incluído."
  ],
  [
   "extend",
   "Comportamento opcional, sob condição."
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
   "tipo": "rede",
   "id": "uc",
   "titulo": "Casos de uso da cantina",
   "h": 380,
   "nos": [
    {
     "id": "al",
     "x": 90,
     "y": 120,
     "t": "Aluno\n(ator)",
     "d": "Faz pedidos e consulta saldo."
    },
    {
     "id": "at",
     "x": 90,
     "y": 300,
     "t": "Atendente\n(ator)",
     "d": "Prepara e entrega pedidos."
    },
    {
     "id": "rp",
     "x": 360,
     "y": 80,
     "t": "Realizar\npedido",
     "d": "Caso de uso principal do aluno."
    },
    {
     "id": "au",
     "x": 600,
     "y": 80,
     "t": "Autenticar",
     "d": "«include»: todo pedido exige login."
    },
    {
     "id": "cp",
     "x": 600,
     "y": 200,
     "t": "Aplicar\ncupom",
     "d": "«extend» de Pagar: só quando o aluno tem cupom."
    },
    {
     "id": "pg",
     "x": 360,
     "y": 200,
     "t": "Pagar\npedido",
     "d": "Pagamento pela carteira digital."
    },
    {
     "id": "en",
     "x": 360,
     "y": 320,
     "t": "Entregar\npedido",
     "d": "Caso de uso da atendente."
    }
   ],
   "liga": [
    [
     "al",
     "rp"
    ],
    [
     "al",
     "pg"
    ],
    [
     "rp",
     "au"
    ],
    [
     "cp",
     "pg"
    ],
    [
     "at",
     "en"
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Modele o sistema da biblioteca: identifique elementos e relacionamentos.",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-uc",
    "titulo": "Ator ou caso de uso?",
    "cats": [
     "Ator",
     "Caso de uso"
    ],
    "itens": [
     [
      "Aluno",
      0
     ],
     [
      "Bibliotecária",
      0
     ],
     [
      "Sistema de e-mail da escola",
      0
     ],
     [
      "Emprestar livro",
      1
     ],
     [
      "Devolver livro",
      1
     ],
     [
      "Reservar livro",
      1
     ],
     [
      "Emitir multa",
      1
     ],
     [
      "Leitor de código de barras",
      0
     ]
    ]
   },
   {
    "tipo": "cenarios",
    "titulo": "include, extend ou generalização?",
    "cfg": {
     "id": "rel",
     "rotulo": "Situação",
     "medidor": {
      "nome": "Modelo correto",
      "ini": 50
     },
     "itens": [
      {
       "t": "Para emprestar ou reservar um livro, é sempre preciso identificar o aluno.",
       "ops": [
        [
         "include (Identificar aluno)",
         true,
         "Sempre executado."
        ],
        [
         "extend",
         false,
         "Não é opcional."
        ],
        [
         "Generalização",
         false,
         "Não é especialização."
        ]
       ]
      },
      {
       "t": "Na devolução, se houver atraso, o sistema calcula multa.",
       "ops": [
        [
         "extend (Calcular multa estende Devolver livro)",
         true,
         "Só sob condição."
        ],
        [
         "include",
         false,
         "Não acontece sempre."
        ],
        [
         "Associação simples",
         false,
         "Há dependência condicional."
        ]
       ]
      },
      {
       "t": "Professor e Aluno podem emprestar, mas o professor também pode indicar livros.",
       "ops": [
        [
         "Generalização: Professor e Aluno especializam Usuário",
         true,
         "Comportamento comum herdado."
        ],
        [
         "include",
         false,
         "Não é sobre casos de uso."
        ],
        [
         "extend",
         false,
         "Idem."
        ]
       ]
      },
      {
       "t": "“Clicar no botão Salvar” foi desenhado como caso de uso.",
       "ops": [
        [
         "Inadequado: é passo de interface, não objetivo do ator",
         true,
         "Caso de uso é um objetivo completo."
        ],
        [
         "Correto",
         false,
         "Detalhe de tela demais."
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
    "t": "Separe atores e casos de uso",
    "ev": "vis:lab-uc"
   },
   {
    "id": "m2",
    "t": "Acerte 3 relacionamentos",
    "ev": "rel:acertos:3"
   },
   {
    "id": "m3",
    "t": "Modelo correto sem erros",
    "ev": "rel:perfeito"
   },
   {
    "id": "m4",
    "t": "Explore o diagrama da cantina (Explorar)",
    "ev": "vis:uc"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que representa um ator?",
   "Um papel externo que interage com o sistema."
  ],
  [
   "Como se nomeia um caso de uso?",
   "Com verbo no infinitivo + objeto: Emitir boletim."
  ],
  [
   "O que é a fronteira do sistema?",
   "Retângulo que separa o que está dentro do sistema dos atores externos."
  ],
  [
   "Quando usar include?",
   "Quando um caso de uso sempre executa outro."
  ],
  [
   "Quando usar extend?",
   "Quando um comportamento é opcional ou condicional."
  ],
  [
   "O que é generalização de atores?",
   "Um ator especializado herda os casos de uso do geral."
  ],
  [
   "Ator pode ser outro sistema?",
   "Sim: sistemas externos e dispositivos também são atores."
  ],
  [
   "O que é pré-condição?",
   "O que precisa ser verdade antes do caso de uso começar."
  ],
  [
   "O que é fluxo alternativo?",
   "Caminho diferente do principal, como erros ou exceções."
  ],
  [
   "O que é pós-condição?",
   "O estado do sistema depois do caso de uso."
  ],
  [
   "A seta do extend aponta para onde?",
   "Do caso que estende para o caso base."
  ],
  [
   "Para que serve o diagrama de casos de uso?",
   "Mostrar o escopo e as funcionalidades do ponto de vista dos usuários."
  ]
 ],
 "vf": [
  [
   "Ator representa uma pessoa específica, como “Maria”.",
   false,
   "Representa um papel."
  ],
  [
   "Casos de uso ficam fora da fronteira do sistema.",
   false,
   "Ficam dentro; atores ficam fora."
  ],
  [
   "include indica comportamento sempre executado.",
   true,
   "Obrigatório."
  ],
  [
   "extend indica comportamento obrigatório.",
   false,
   "Opcional, sob condição."
  ],
  [
   "Um sistema de pagamento externo pode ser ator.",
   true,
   "Atores podem ser sistemas."
  ],
  [
   "O diagrama mostra como o sistema funciona por dentro.",
   false,
   "Mostra o que faz, não como."
  ],
  [
   "“Fazer login” costuma ser incluído por vários casos de uso.",
   true,
   "Clássico include."
  ],
  [
   "Cada caso de uso deve ter uma descrição textual.",
   true,
   "O diagrama sozinho não basta."
  ],
  [
   "Generalização permite herdar casos de uso.",
   true,
   "O ator filho faz tudo que o pai faz."
  ],
  [
   "“Clicar em OK” é um bom caso de uso.",
   false,
   "É passo de interface."
  ],
  [
   "Um caso de uso entrega um resultado de valor ao ator.",
   true,
   "Objetivo completo."
  ],
  [
   "Fluxos alternativos tratam exceções.",
   true,
   "Ex.: senha incorreta."
  ]
 ],
 "caderno": [
  [
   "Liste atores e 5 casos de uso de um sistema de biblioteca.",
   "Atores: Aluno, Bibliotecária, Sistema de e-mail. Casos: Emprestar, Devolver, Reservar, Consultar acervo, Emitir multa."
  ],
  [
   "Dê um exemplo de include e um de extend.",
   "include: Emprestar inclui Identificar aluno. extend: Calcular multa estende Devolver."
  ],
  [
   "Por que ator é papel e não pessoa?",
   "A mesma pessoa pode ter papéis diferentes e várias pessoas podem ter o mesmo papel."
  ],
  [
   "Documente o caso “Realizar pedido” da cantina.",
   "Ator: Aluno; pré: logado com saldo; fluxo: escolher itens, confirmar, pagar; alternativo: saldo insuficiente; pós: pedido na fila."
  ],
  [
   "O que está errado em desenhar “Abrir tela inicial” como caso de uso?",
   "É detalhe de interface, sem valor completo para o ator."
  ],
  [
   "Desenhe (em texto) a generalização de usuários da escola.",
   "Usuário ← Aluno, Professor, Servidor; casos comuns ligados a Usuário."
  ],
  [
   "Para que serve a fronteira?",
   "Delimitar o escopo: o que o sistema faz e o que fica fora."
  ],
  [
   "Quando um sistema externo deve ser ator?",
   "Quando troca informações com o sistema (pagamento, e-mail, governo)."
  ],
  [
   "Diferença entre fluxo principal e alternativo?",
   "Principal: caminho de sucesso; alternativo: desvios e exceções."
  ],
  [
   "Como o diagrama ajuda na conversa com o cliente?",
   "É simples e visual: o cliente confirma se as funcionalidades e os usuários estão corretos."
  ]
 ],
 "pbl": [
  {
   "titulo": "Eleição do grêmio",
   "cenario": "<p>O grêmio quer um sistema de votação: alunos votam uma vez, a comissão cadastra chapas e publica o resultado.</p>",
   "passos": [
    [
     "Identifique atores e casos de uso.",
     "Atores: Aluno, Comissão eleitoral. Casos: Votar, Cadastrar chapa, Publicar resultado, Autenticar."
    ],
    [
     "Indique os relacionamentos.",
     "Votar e Cadastrar chapa incluem Autenticar; Emitir comprovante estende Votar (se o aluno pedir)."
    ]
   ]
  },
  {
   "titulo": "O diagrama confuso",
   "cenario": "<p>Um colega desenhou 40 casos de uso como “clicar”, “abrir menu” e “digitar senha”.</p>",
   "passos": [
    [
     "Qual o problema?",
     "São passos de interface, não objetivos; o diagrama fica ilegível."
    ],
    [
     "Como reorganizar?",
     "Agrupar em objetivos (Fazer login, Realizar pedido) e mover os passos para a descrição textual."
    ]
   ]
  },
  {
   "titulo": "Pagamento externo",
   "cenario": "<p>A cantina passou a aceitar Pix por um serviço de pagamento de terceiros.</p>",
   "passos": [
    [
     "Como representar no diagrama?",
     "O serviço de pagamento como ator externo associado a Pagar pedido."
    ],
    [
     "Que fluxo alternativo documentar?",
     "Pagamento recusado ou tempo esgotado: pedido não confirmado e aviso ao aluno."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Casos de uso",
   "itens": [
    "Ator (papel) fora; caso de uso (verbo) dentro.",
    "include (sempre), extend (às vezes), generalização.",
    "Descrição: pré, fluxos, pós."
   ]
  }
 ],
 "glossario": [
  [
   "Cenário",
   "Uma instância de execução do caso de uso."
  ],
  [
   "UML",
   "Linguagem de Modelagem Unificada."
  ]
 ]
});
