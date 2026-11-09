FSI.modulo({
 "n": 5,
 "unidade": "Unidade 3",
 "nome": "UML: classes e sequência",
 "titulo": "A estrutura (classes) e a conversa (sequência) do sistema",
 "duracao": "10 h",
 "resumoCurto": "Orientação a objetos, classes, atributos, métodos e visibilidade, associações e multiplicidade, herança e o diagrama de sequência.",
 "analogia": {
  "titulo": "A planta e o roteiro",
  "txt": "<p>O <b>diagrama de classes</b> é a planta da casa: quais cômodos existem (classes), o que há em cada um (atributos e métodos) e como se ligam (associações). O <b>diagrama de sequência</b> é o roteiro de uma cena: quem fala com quem, em que ordem, para realizar um caso de uso.</p>"
 },
 "chave": [
  "Classe: nome, atributos e métodos; objeto é uma instância da classe.",
  "Visibilidade: <b>+</b> público, <b>−</b> privado, <b>#</b> protegido.",
  "Encapsulamento: atributos privados acessados por métodos.",
  "Associação com multiplicidade: 1, 0..1, *, 1..*.",
  "Herança (triângulo vazio): subclasse é um tipo da superclasse.",
  "Sequência: linhas de vida, mensagens em ordem de cima para baixo, retorno tracejado."
 ],
 "objetivos": [
  "Ler e desenhar <b>classes</b> com visibilidade.",
  "Definir <b>associações e multiplicidades</b>.",
  "Usar <b>herança</b> corretamente.",
  "Ler um <b>diagrama de sequência</b>."
 ],
 "licoes": [
  {
   "t": "Classes e objetos",
   "txt": "<p>Classe Pedido: − numero: int; − data: Date; − status: String; + calcularTotal(): double; + cancelar(): void. O objeto pedido15 é uma instância. Encapsular é esconder os dados e expor operações.</p>"
  },
  {
   "t": "Relacionamentos",
   "txt": "<p><b>Associação</b>: Aluno 1 —— 0..* Pedido (um aluno faz vários pedidos). <b>Agregação</b> (losango vazio) e <b>composição</b> (losango cheio: o item não existe sem o pedido). <b>Herança</b>: Professor e Aluno herdam de Pessoa.</p>"
  },
  {
   "t": "Diagrama de sequência",
   "txt": "<p>Cada participante tem uma linha de vida vertical. As mensagens são setas horizontais, de cima para baixo no tempo. Ex.: Aluno → TelaPedido: confirmar(); TelaPedido → Pedido: calcularTotal(); Pedido → Carteira: debitar(valor).</p>",
   "pense": "qual a multiplicidade entre Pedido e ItemPedido?"
  }
 ],
 "termos": [
  [
   "Classe",
   "Molde de objetos."
  ],
  [
   "Objeto",
   "Instância da classe."
  ],
  [
   "Multiplicidade",
   "Quantos objetos se relacionam."
  ],
  [
   "Linha de vida",
   "Participante no diagrama de sequência."
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
   "tipo": "sequencia",
   "id": "seq",
   "titulo": "Sequência: realizar pedido na cantina",
   "atores": [
    "Aluno",
    "TelaPedido",
    "Pedido",
    "Carteira"
   ],
   "passos": [
    {
     "de": 0,
     "para": 1,
     "t": "confirmar()",
     "d": "O aluno confirma os itens escolhidos."
    },
    {
     "de": 1,
     "para": 2,
     "t": "calcularTotal()",
     "d": "O pedido soma os itens."
    },
    {
     "de": 2,
     "para": 1,
     "t": "total = 12,50",
     "d": "Retorno (seta tracejada)."
    },
    {
     "de": 1,
     "para": 3,
     "t": "debitar(12,50)",
     "d": "A carteira confere o saldo e debita."
    },
    {
     "de": 3,
     "para": 1,
     "t": "ok",
     "d": "Saldo suficiente."
    },
    {
     "de": 1,
     "para": 0,
     "t": "Pedido nº 15 confirmado",
     "d": "Pós-condição do caso de uso."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Leia e corrija modelos de classes como um arquiteto.",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-cls",
    "titulo": "Atributo, método ou classe?",
    "cats": [
     "Classe",
     "Atributo",
     "Método"
    ],
    "itens": [
     [
      "Pedido",
      0
     ],
     [
      "Aluno",
      0
     ],
     [
      "Produto",
      0
     ],
     [
      "preco",
      1
     ],
     [
      "dataNascimento",
      1
     ],
     [
      "status",
      1
     ],
     [
      "calcularTotal()",
      2
     ],
     [
      "cancelar()",
      2
     ],
     [
      "debitar(valor)",
      2
     ]
    ]
   },
   {
    "tipo": "cenarios",
    "titulo": "Multiplicidade e relacionamento",
    "cfg": {
     "id": "mu",
     "rotulo": "Regra",
     "medidor": {
      "nome": "Modelo correto",
      "ini": 50
     },
     "itens": [
      {
       "t": "Um aluno pode fazer nenhum ou vários pedidos; cada pedido é de um aluno.",
       "ops": [
        [
         "Aluno 1 —— 0..* Pedido",
         true,
         "Um lado 1, outro zero ou mais."
        ],
        [
         "Aluno 0..* —— 0..* Pedido",
         false,
         "Pedido tem um só aluno."
        ],
        [
         "Aluno 1 —— 1 Pedido",
         false,
         "Aluno pode ter vários."
        ]
       ]
      },
      {
       "t": "Os itens de um pedido não existem sem o pedido.",
       "ops": [
        [
         "Composição (losango cheio no Pedido)",
         true,
         "Ciclo de vida dependente."
        ],
        [
         "Herança",
         false,
         "Item não é um tipo de pedido."
        ],
        [
         "Associação simples",
         false,
         "Não mostra a dependência."
        ]
       ]
      },
      {
       "t": "Professor e Aluno têm nome, CPF e e-mail em comum.",
       "ops": [
        [
         "Herança de uma superclasse Pessoa",
         true,
         "Evita repetir atributos."
        ],
        [
         "Composição",
         false,
         "Não é parte-todo."
        ],
        [
         "Duas classes iguais",
         false,
         "Duplicação."
        ]
       ]
      },
      {
       "t": "O atributo saldo da Carteira pode ser alterado por qualquer classe.",
       "ops": [
        [
         "Tornar saldo privado (−) e expor debitar()/creditar()",
         true,
         "Encapsulamento."
        ],
        [
         "Deixar público (+)",
         false,
         "Qualquer um altera sem regra."
        ],
        [
         "Remover o atributo",
         false,
         "Ele é necessário."
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
    "t": "Classifique classes, atributos e métodos",
    "ev": "vis:lab-cls"
   },
   {
    "id": "m2",
    "t": "Acerte 3 regras de modelagem",
    "ev": "mu:acertos:3"
   },
   {
    "id": "m3",
    "t": "Modelo correto sem erros",
    "ev": "mu:perfeito"
   },
   {
    "id": "m4",
    "t": "Acompanhe a sequência do pedido (Explorar)",
    "ev": "vis:seq"
   }
  ],
  "guiados": [
   {
    "titulo": "Contando objetos",
    "txt": "<p>Num dia, a cantina teve <b>40 alunos</b> que fizeram, em média, <b>2 pedidos</b> cada, com <b>3 itens</b> por pedido.</p>",
    "passos": [
     {
      "p": "Quantos objetos Pedido?",
      "r": 80,
      "dica": "40 × 2.",
      "expl": "80 pedidos."
     },
     {
      "p": "Quantos objetos ItemPedido?",
      "r": 240,
      "dica": "80 × 3.",
      "expl": "240 itens — e todos somem se os pedidos forem apagados (composição)."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma classe?",
   "Molde que define atributos e métodos de objetos."
  ],
  [
   "O que é um objeto?",
   "Instância concreta de uma classe."
  ],
  [
   "O que significam +, − e #?",
   "Público, privado e protegido."
  ],
  [
   "O que é encapsulamento?",
   "Esconder os dados e expor operações controladas."
  ],
  [
   "O que indica 0..*?",
   "Zero ou mais."
  ],
  [
   "Agregação × composição?",
   "Agregação: parte pode existir sozinha (losango vazio); composição: parte morre com o todo (losango cheio)."
  ],
  [
   "Como se representa herança?",
   "Seta com triângulo vazio apontando para a superclasse."
  ],
  [
   "O que é a linha de vida?",
   "A linha vertical de um participante no diagrama de sequência."
  ],
  [
   "Como se lê o tempo no diagrama de sequência?",
   "De cima para baixo."
  ],
  [
   "Como é a mensagem de retorno?",
   "Seta tracejada."
  ],
  [
   "Para que serve o diagrama de classes?",
   "Mostrar a estrutura estática do sistema."
  ],
  [
   "Para que serve o diagrama de sequência?",
   "Mostrar a interação entre objetos ao longo do tempo num cenário."
  ]
 ],
 "vf": [
  [
   "Objeto e classe são a mesma coisa.",
   false,
   "Objeto é instância da classe."
  ],
  [
   "Atributos privados são marcados com −.",
   true,
   "Visibilidade privada."
  ],
  [
   "Herança representa relação “é um”.",
   true,
   "Professor é uma Pessoa."
  ],
  [
   "Composição significa que a parte vive sem o todo.",
   false,
   "Isso é agregação."
  ],
  [
   "1..* significa pelo menos um.",
   true,
   "Um ou mais."
  ],
  [
   "No diagrama de sequência o tempo corre da esquerda para a direita.",
   false,
   "De cima para baixo."
  ],
  [
   "Mensagens de retorno são setas tracejadas.",
   true,
   "Convenção da UML."
  ],
  [
   "Encapsular é deixar todos os atributos públicos.",
   false,
   "É o contrário."
  ],
  [
   "Uma classe pode ter vários objetos.",
   true,
   "Quantos forem necessários."
  ],
  [
   "O diagrama de classes mostra a ordem das chamadas.",
   false,
   "Isso é o de sequência."
  ],
  [
   "Métodos representam comportamentos.",
   true,
   "O que o objeto faz."
  ],
  [
   "Herança evita duplicar atributos comuns.",
   true,
   "Ficam na superclasse."
  ]
 ],
 "caderno": [
  [
   "Modele a classe Livro com 3 atributos e 2 métodos.",
   "Livro: − isbn, − titulo, − disponivel; + emprestar(), + devolver()."
  ],
  [
   "Explique encapsulamento com a Carteira da cantina.",
   "saldo é privado; só debitar() e creditar() alteram, aplicando as regras."
  ],
  [
   "Defina a multiplicidade entre Turma e Aluno.",
   "Turma 1 —— 1..* Aluno (cada aluno numa turma; turma com pelo menos um aluno)."
  ],
  [
   "Dê um exemplo de agregação e um de composição.",
   "Agregação: Time–Jogador; composição: Pedido–ItemPedido."
  ],
  [
   "Desenhe (em texto) a herança Pessoa, Aluno, Professor.",
   "Pessoa (nome, cpf) ◁— Aluno (matrícula), Professor (siape)."
  ],
  [
   "Descreva a sequência de “Emprestar livro”.",
   "Bibliotecária → Tela: emprestar(ra, isbn); Tela → Aluno: verificarPendências(); Tela → Livro: emprestar(); Livro → Tela: ok."
  ],
  [
   "Diferença entre diagrama de classes e de sequência?",
   "Classes: estrutura estática; sequência: interação no tempo."
  ],
  [
   "Por que métodos e não acesso direto aos atributos?",
   "Para validar regras e proteger o estado do objeto."
  ],
  [
   "O que significa 0..1?",
   "Nenhum ou um (opcional)."
  ],
  [
   "Como um diagrama de sequência se liga a um caso de uso?",
   "Ele detalha um cenário do caso de uso, mostrando os objetos envolvidos."
  ]
 ],
 "pbl": [
  {
   "titulo": "Modelo da biblioteca",
   "cenario": "<p>A biblioteca tem livros, exemplares, alunos e empréstimos; um livro pode ter vários exemplares.</p>",
   "passos": [
    [
     "Liste as classes e os relacionamentos com multiplicidade.",
     "Livro 1 —— 1..* Exemplar; Aluno 1 —— 0..* Emprestimo; Emprestimo * —— 1 Exemplar."
    ],
    [
     "Que atributos devem ser privados e por quê?",
     "Disponibilidade, datas e multas: só alteradas por métodos com regras (emprestar, devolver)."
    ]
   ]
  },
  {
   "titulo": "Classe gigante",
   "cenario": "<p>Um colega criou uma classe Sistema com 80 atributos e 120 métodos.</p>",
   "passos": [
    [
     "Qual o problema?",
     "Baixa coesão: tudo misturado, difícil de entender, testar e manter."
    ],
    [
     "Como melhorar?",
     "Separar em classes do domínio (Aluno, Pedido, Produto, Carteira) com responsabilidades claras."
    ]
   ]
  },
  {
   "titulo": "A sequência do pagamento",
   "cenario": "<p>O pagamento falha às vezes e ninguém sabe em que ponto.</p>",
   "passos": [
    [
     "Como o diagrama de sequência ajuda?",
     "Mostra a ordem das mensagens e onde cada verificação acontece."
    ],
    [
     "Desenhe o fluxo com o caso de saldo insuficiente.",
     "Tela → Carteira: debitar(v); Carteira → Tela: erro saldo; Tela → Aluno: aviso e opção de recarregar."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "UML estrutural e comportamental",
   "itens": [
    "Classe, atributos, métodos, visibilidade.",
    "Associação, multiplicidade, agregação, composição, herança.",
    "Sequência: linhas de vida e mensagens no tempo."
   ]
  }
 ],
 "glossario": [
  [
   "Coesão",
   "Quanto as responsabilidades de uma classe são relacionadas."
  ],
  [
   "Acoplamento",
   "Quanto as classes dependem umas das outras."
  ]
 ]
});
