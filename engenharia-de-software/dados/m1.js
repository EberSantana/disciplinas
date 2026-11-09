FSI.modulo({
 "n": 1,
 "unidade": "Unidade 1",
 "nome": "Software e engenharia de software",
 "titulo": "Do programa ao produto: o que a engenharia de software resolve",
 "duracao": "8 h",
 "resumoCurto": "O que é software e engenharia de software, atributos de um bom software, ética profissional e as atividades fundamentais do processo.",
 "analogia": {
  "titulo": "A receita da avó e a fábrica de bolos",
  "txt": "<p>A avó faz um bolo ótimo de cabeça. Mas, para uma fábrica entregar mil bolos iguais por dia, é preciso receita escrita, controle de qualidade e alguém que saiba ajustar o forno. Programa feito para si é a receita da avó; <b>produto de software</b>, usado por milhares de pessoas e mantido por anos, precisa de <b>engenharia</b>.</p>"
 },
 "chave": [
  "Software = programas + documentação + dados de configuração.",
  "Engenharia de software: disciplina que cuida de todos os aspectos da produção de software, da especificação à manutenção.",
  "Atributos de um bom software: <b>manutenibilidade, confiança e proteção, eficiência e aceitabilidade</b>.",
  "Quatro atividades fundamentais: <b>especificação, projeto e implementação, validação e evolução</b>.",
  "Ética: confidencialidade, competência, direitos de propriedade intelectual, uso correto dos computadores.",
  "A “crise do software”: projetos atrasados, caros e com defeitos motivaram a disciplina."
 ],
 "objetivos": [
  "Diferenciar <b>programa</b> de <b>produto de software</b>.",
  "Citar os <b>atributos</b> de um bom software.",
  "Descrever as <b>quatro atividades</b> do processo.",
  "Reconhecer <b>dilemas éticos</b> da profissão."
 ],
 "licoes": [
  {
   "t": "Programa × produto",
   "txt": "<p>Um programa resolve o problema de quem o escreveu. Um produto tem usuários, documentação, suporte, versões e precisa ser mantido por outras pessoas. Produtos podem ser <b>genéricos</b> (vendidos a muitos: um editor de texto) ou <b>sob encomenda</b> (feitos para um cliente: o sistema da prefeitura).</p>"
  },
  {
   "t": "O que é um bom software",
   "txt": "",
   "pontos": [
    "<b>Manutenibilidade</b>: fácil de mudar quando o negócio muda.",
    "<b>Confiança e proteção</b>: não falha, não causa danos, resiste a ataques.",
    "<b>Eficiência</b>: não desperdiça memória, processamento nem bateria.",
    "<b>Aceitabilidade</b>: compreensível, usável e compatível para quem vai usar."
   ]
  },
  {
   "t": "As quatro atividades",
   "txt": "<p><b>Especificação</b> (o que o sistema deve fazer), <b>projeto e implementação</b> (como fazer e fazer), <b>validação</b> (conferir se faz o que o cliente quer) e <b>evolução</b> (mudar ao longo do tempo). Todo processo tem essas quatro; o que muda é a ordem e a repetição.</p>",
   "pense": "que atividade consome mais tempo na vida de um sistema que dura 10 anos?"
  }
 ],
 "termos": [
  [
   "Produto genérico",
   "Vendido a muitos clientes."
  ],
  [
   "Sob encomenda",
   "Feito para um cliente."
  ],
  [
   "Manutenibilidade",
   "Facilidade de mudar."
  ],
  [
   "Evolução",
   "Mudanças após a entrega."
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
   "tipo": "camadas",
   "id": "camadas",
   "titulo": "As camadas da engenharia de software",
   "forma": "piramide",
   "h": 320,
   "camadas": [
    {
     "t": "Ferramentas",
     "d": "Apoio automatizado: IDE, CASE, Git, testes."
    },
    {
     "t": "Métodos",
     "d": "Como fazer: requisitos, modelagem, testes."
    },
    {
     "t": "Processo",
     "d": "A sequência de atividades e entregas."
    },
    {
     "t": "Foco na qualidade",
     "d": "A base de tudo."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Avalie softwares reais pelos atributos de qualidade e tome decisões éticas como um profissional.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Qual atributo está falhando?",
    "cfg": {
     "id": "at",
     "rotulo": "Caso",
     "medidor": {
      "nome": "Qualidade do produto",
      "ini": 50
     },
     "itens": [
      {
       "t": "Para mudar o valor da taxa de entrega, é preciso alterar 40 arquivos do sistema.",
       "ops": [
        [
         "Manutenibilidade",
         true,
         "Mudanças simples deveriam ser fáceis."
        ],
        [
         "Eficiência",
         false,
         "Não é desempenho."
        ],
        [
         "Aceitabilidade",
         false,
         "Não é usabilidade."
        ]
       ]
      },
      {
       "t": "O aplicativo da escola gasta metade da bateria do celular em uma hora.",
       "ops": [
        [
         "Eficiência",
         true,
         "Desperdiça recursos."
        ],
        [
         "Confiança",
         false,
         "Não falha nem é inseguro."
        ],
        [
         "Manutenibilidade",
         false,
         "Não é sobre mudar o código."
        ]
       ]
      },
      {
       "t": "Os funcionários desistiram do sistema porque não entendem as telas.",
       "ops": [
        [
         "Aceitabilidade",
         true,
         "Usabilidade e compreensão."
        ],
        [
         "Eficiência",
         false,
         "É rápido, mas ninguém usa."
        ],
        [
         "Proteção",
         false,
         "Não é segurança."
        ]
       ]
      },
      {
       "t": "Uma falha no sistema de notas apagou as médias do bimestre.",
       "ops": [
        [
         "Confiança e proteção",
         true,
         "O sistema não pode causar dano."
        ],
        [
         "Aceitabilidade",
         false,
         "Não é sobre gostar."
        ],
        [
         "Eficiência",
         false,
         "Não é desempenho."
        ]
       ]
      }
     ]
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Dilemas éticos",
    "cfg": {
     "id": "et",
     "rotulo": "Dilema",
     "itens": [
      {
       "t": "O chefe pede para você copiar o código de um sistema concorrente.",
       "ops": [
        [
         "Recusar: viola propriedade intelectual",
         true,
         "Ética e lei."
        ],
        [
         "Copiar, é só código",
         false,
         "É ilegal."
        ],
        [
         "Copiar e mudar os nomes",
         false,
         "Continua sendo cópia."
        ]
       ]
      },
      {
       "t": "Você não domina a tecnologia, mas o cliente quer contratá-lo para um sistema crítico de saúde.",
       "ops": [
        [
         "Ser honesto sobre sua competência",
         true,
         "Não aceite trabalho além da sua capacidade."
        ],
        [
         "Aceitar e aprender depois",
         false,
         "Risco a vidas."
        ],
        [
         "Esconder a falta de experiência",
         false,
         "Antiético."
        ]
       ]
      },
      {
       "t": "Você teve acesso aos dados de clientes durante um projeto.",
       "ops": [
        [
         "Manter a confidencialidade",
         true,
         "Mesmo sem contrato formal."
        ],
        [
         "Usar para vender produtos",
         false,
         "Viola confidencialidade e LGPD."
        ],
        [
         "Comentar com amigos",
         false,
         "Também viola."
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
    "t": "Identifique 3 atributos",
    "ev": "at:acertos:3"
   },
   {
    "id": "m2",
    "t": "Qualidade do produto em 80% ou mais",
    "ev": "at:medidor80"
   },
   {
    "id": "m3",
    "t": "Resolva os dilemas éticos sem erro",
    "ev": "et:perfeito"
   },
   {
    "id": "m4",
    "t": "Explore as camadas da engenharia (Explorar)",
    "ev": "vis:camadas"
   }
  ],
  "guiados": [
   {
    "titulo": "Quanto custa a manutenção?",
    "txt": "<p>Um sistema custou <b>R$ 80.000</b> para ser desenvolvido. Estudos mostram que a manutenção costuma custar cerca de <b>3 vezes</b> o desenvolvimento ao longo da vida do sistema.</p>",
    "passos": [
     {
      "p": "Custo estimado de manutenção (R$)?",
      "r": 240000,
      "un": "R$",
      "dica": "80.000 × 3.",
      "expl": "R$ 240.000."
     },
     {
      "p": "Custo total da vida do sistema (R$)?",
      "r": 320000,
      "un": "R$",
      "dica": "Desenvolvimento + manutenção.",
      "expl": "R$ 320.000."
     },
     {
      "p": "Que percentual do total é manutenção?",
      "r": 75,
      "un": "%",
      "dica": "240.000 ÷ 320.000.",
      "expl": "75%: por isso manutenibilidade é tão importante."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é software, segundo a engenharia de software?",
   "Programas mais a documentação e os dados de configuração."
  ],
  [
   "O que é engenharia de software?",
   "Disciplina que trata de todos os aspectos da produção de software, da especificação à manutenção."
  ],
  [
   "Produto genérico × sob encomenda?",
   "Genérico é vendido a muitos; sob encomenda é feito para um cliente."
  ],
  [
   "Cite os 4 atributos de um bom software.",
   "Manutenibilidade, confiança e proteção, eficiência, aceitabilidade."
  ],
  [
   "Quais as 4 atividades fundamentais do processo?",
   "Especificação, projeto e implementação, validação, evolução."
  ],
  [
   "O que foi a crise do software?",
   "Projetos atrasados, caros e cheios de defeitos, que motivaram a criação da engenharia de software (anos 1960/70)."
  ],
  [
   "O que é validação?",
   "Conferir se o software faz o que o cliente realmente precisa."
  ],
  [
   "O que é evolução?",
   "Mudanças no software depois de entregue."
  ],
  [
   "Cite 2 responsabilidades éticas.",
   "Confidencialidade, competência, respeito à propriedade intelectual, uso correto dos computadores."
  ],
  [
   "Por que a manutenção é tão cara?",
   "O sistema vive anos, o negócio muda e o código precisa acompanhar."
  ],
  [
   "Engenharia de software × ciência da computação?",
   "Ciência estuda teorias e fundamentos; engenharia aplica métodos para produzir software útil."
  ],
  [
   "Por que a documentação faz parte do software?",
   "Sem ela, outras pessoas não conseguem usar, manter nem evoluir o sistema."
  ]
 ],
 "vf": [
  [
   "Software é apenas o código executável.",
   false,
   "Inclui documentação e configuração."
  ],
  [
   "Um bom software precisa ser fácil de manter.",
   true,
   "Manutenibilidade é atributo essencial."
  ],
  [
   "As quatro atividades aparecem em todo processo de software.",
   true,
   "Mudam a ordem e a repetição."
  ],
  [
   "Validação e verificação são a mesma coisa.",
   false,
   "Verificar: construímos certo? Validar: construímos a coisa certa?"
  ],
  [
   "A maior parte do custo de um sistema costuma ser a manutenção.",
   true,
   "O sistema vive muitos anos."
  ],
  [
   "Copiar código de um concorrente é aceitável se for para estudo interno.",
   false,
   "Viola propriedade intelectual."
  ],
  [
   "Software sob encomenda é feito para um cliente específico.",
   true,
   "Ex.: sistema de uma prefeitura."
  ],
  [
   "Eficiência só diz respeito à velocidade.",
   false,
   "Também memória, bateria e rede."
  ],
  [
   "Aceitabilidade envolve usabilidade.",
   true,
   "O usuário precisa entender e querer usar."
  ],
  [
   "Programas pessoais exigem o mesmo processo que produtos.",
   false,
   "Produtos têm usuários, suporte e manutenção."
  ],
  [
   "Engenharia de software se preocupa também com custo e prazo.",
   true,
   "Além da qualidade."
  ],
  [
   "Evolução só acontece quando há erros.",
   false,
   "Também por novas leis, novas necessidades e novas tecnologias."
  ]
 ],
 "caderno": [
  [
   "Explique a analogia da receita da avó e da fábrica.",
   "Programa pessoal funciona “de cabeça”; produto precisa de processo, documentação e qualidade para ser repetível e mantido por outros."
  ],
  [
   "Dê um exemplo de produto genérico e um sob encomenda.",
   "Genérico: LibreOffice. Sob encomenda: o sistema acadêmico de uma escola."
  ],
  [
   "Defina cada atributo de qualidade com um exemplo.",
   "Manutenibilidade (mudar taxa fácil), confiança (não perder notas), eficiência (não gastar bateria), aceitabilidade (telas fáceis)."
  ],
  [
   "Descreva as 4 atividades usando um app de delivery.",
   "Especificar pedidos e entregas; projetar e programar; testar com clientes; evoluir com novas formas de pagamento."
  ],
  [
   "Diferença entre verificação e validação?",
   "Verificação: o software está de acordo com a especificação. Validação: atende ao que o cliente precisa."
  ],
  [
   "Por que a crise do software aconteceu?",
   "Sistemas ficaram grandes e complexos e eram feitos sem métodos: atrasos, custos e defeitos."
  ],
  [
   "Cite um dilema ético e como agir.",
   "Pedido para esconder um defeito do cliente: informar o problema com transparência."
  ],
  [
   "Por que a documentação reduz custos?",
   "Novos membros entendem o sistema mais rápido e erros são corrigidos com menos esforço."
  ],
  [
   "O que muda entre o software de um TCC e um sistema bancário?",
   "Escala de usuários, criticidade, segurança, testes, documentação e manutenção por anos."
  ],
  [
   "Por que eficiência importa em celulares?",
   "Bateria, memória e dados móveis são limitados."
  ]
 ],
 "pbl": [
  {
   "titulo": "O sistema que ninguém quer mexer",
   "cenario": "<p>A escola tem um sistema de matrículas feito há 8 anos por um ex-aluno. Ninguém consegue alterá-lo e cada mudança quebra outra coisa.</p>",
   "passos": [
    [
     "Que atributos de qualidade faltam e por quê?",
     "Manutenibilidade (código sem organização e sem documentação) e confiança (mudanças quebram funções)."
    ],
    [
     "Proponha 3 medidas para o próximo sistema.",
     "Documentação e dicionário de dados, testes automatizados, versionamento com Git e código organizado em módulos."
    ]
   ]
  },
  {
   "titulo": "Programa ou produto?",
   "cenario": "<p>Um aluno fez um app de lista de tarefas para si. O grêmio quer usar com 400 alunos.</p>",
   "passos": [
    [
     "O que muda ao virar produto?",
     "Usuários diversos, suporte, segurança dos dados, documentação, versões e manutenção."
    ],
    [
     "Que atividades do processo ele precisa fazer agora?",
     "Especificar requisitos com o grêmio, ajustar projeto, validar com usuários e planejar a evolução."
    ]
   ]
  },
  {
   "titulo": "A proposta tentadora",
   "cenario": "<p>Uma empresa oferece dinheiro a um estagiário para levar o código do sistema da prefeitura onde ele trabalha.</p>",
   "passos": [
    [
     "Quais princípios éticos estão em jogo?",
     "Confidencialidade, propriedade intelectual e lealdade ao empregador."
    ],
    [
     "O que ele deve fazer?",
     "Recusar e, se for o caso, comunicar a chefia."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Fundamentos",
   "itens": [
    "Software = programas + documentação + configuração.",
    "Manutenibilidade, confiança, eficiência, aceitabilidade.",
    "Especificação, projeto/implementação, validação, evolução.",
    "Ética profissional."
   ]
  }
 ],
 "glossario": [
  [
   "Stakeholder",
   "Interessado no sistema."
  ],
  [
   "Legado",
   "Sistema antigo ainda em uso."
  ]
 ]
});
