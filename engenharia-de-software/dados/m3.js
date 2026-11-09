FSI.modulo({
 "n": 3,
 "unidade": "Unidade 2",
 "nome": "Engenharia de requisitos",
 "titulo": "Da fala do cliente ao requisito aprovado",
 "duracao": "10 h",
 "resumoCurto": "Requisitos funcionais e não funcionais, stakeholders, técnicas de elicitação, especificação (SRS), validação e qualidade dos requisitos.",
 "analogia": {
  "titulo": "O pedido no restaurante",
  "txt": "<p>“Quero algo leve” não é um pedido que a cozinha consiga executar. O garçom pergunta, sugere, confirma: “salada com frango grelhado, sem cebola, em até 15 minutos”. O <b>analista de requisitos</b> é esse garçom: transforma desejos vagos em requisitos claros, verificáveis e aprovados.</p>"
 },
 "chave": [
  "<b>Requisito funcional</b>: o que o sistema faz (emitir boletim).",
  "<b>Não funcional</b>: como/com que qualidade (responder em 2 s, funcionar no celular, LGPD).",
  "Stakeholders: todos os interessados — usuários, clientes, gestores, órgãos reguladores.",
  "Elicitação: entrevistas, questionários, observação, workshops, prototipação, análise de documentos.",
  "Especificação: documento de requisitos (SRS) com requisitos numerados e critérios de aceitação.",
  "Bons requisitos são claros, completos, consistentes, verificáveis e rastreáveis."
 ],
 "objetivos": [
  "Separar requisitos <b>funcionais e não funcionais</b>.",
  "Escolher <b>técnicas de elicitação</b>.",
  "Escrever requisitos <b>verificáveis</b>.",
  "Organizar uma <b>especificação</b>."
 ],
 "licoes": [
  {
   "t": "Tipos de requisitos",
   "txt": "<p>RF: “O sistema deve permitir que o aluno consulte suas notas.” RNF: “A consulta deve carregar em até 3 segundos em conexão 4G”, “O sistema deve seguir a LGPD”, “Deve funcionar em celulares Android e iOS”. Regras de negócio: “A média para aprovação é 6,0”.</p>"
  },
  {
   "t": "Elicitação",
   "txt": "<p>Identifique os stakeholders, prepare um roteiro, entreviste, observe o trabalho real, aplique questionários quando há muitos usuários, faça workshops para conflitos e mostre protótipos. Registre tudo.</p>"
  },
  {
   "t": "Especificar e validar",
   "txt": "<p>Cada requisito com identificador (RF01), descrição, prioridade e critério de aceitação. Evite palavras vagas: “rápido”, “fácil”, “amigável”, “etc.”. Valide com o cliente (revisões, protótipos) e mantenha a rastreabilidade até os testes.</p>",
   "pense": "como tornar verificável o requisito “o sistema deve ser rápido”?"
  }
 ],
 "termos": [
  [
   "RF",
   "O que o sistema faz."
  ],
  [
   "RNF",
   "Qualidade e restrições."
  ],
  [
   "Elicitação",
   "Descobrir requisitos."
  ],
  [
   "SRS",
   "Documento de especificação de requisitos."
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
   "id": "er",
   "titulo": "O processo de engenharia de requisitos",
   "ordenar": true,
   "passos": [
    {
     "t": "Identificar stakeholders",
     "d": "Quem usa, quem paga, quem regula."
    },
    {
     "t": "Elicitar",
     "d": "Entrevistas, observação, questionários."
    },
    {
     "t": "Analisar e negociar",
     "d": "Conflitos e prioridades."
    },
    {
     "t": "Especificar",
     "d": "Documento com RF, RNF e critérios."
    },
    {
     "t": "Validar",
     "d": "Cliente confirma: é isso mesmo?"
    },
    {
     "t": "Gerenciar mudanças",
     "d": "Rastreabilidade e versões."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Seja o analista de requisitos do sistema da cantina.",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-rf",
    "titulo": "Funcional ou não funcional?",
    "cats": [
     "Funcional",
     "Não funcional"
    ],
    "itens": [
     [
      "O aluno pode fazer pedido pelo celular",
      0
     ],
     [
      "A cantina pode cadastrar produtos e preços",
      0
     ],
     [
      "O sistema emite relatório de vendas do dia",
      0
     ],
     [
      "O pedido deve ser confirmado em até 2 segundos",
      1
     ],
     [
      "Deve funcionar em celulares Android e iOS",
      1
     ],
     [
      "Os dados dos alunos seguem a LGPD",
      1
     ],
     [
      "Disponível das 6h às 22h",
      1
     ],
     [
      "O aluno pode cancelar um pedido não preparado",
      0
     ]
    ]
   },
   {
    "tipo": "cenarios",
    "titulo": "Requisito bom ou ruim?",
    "cfg": {
     "id": "rq",
     "rotulo": "Requisito",
     "medidor": {
      "nome": "Qualidade da especificação",
      "ini": 40
     },
     "itens": [
      {
       "t": "“O sistema deve ser rápido.”",
       "ops": [
        [
         "Ruim: vago; reescrever com medida (ex.: até 2 s)",
         true,
         "Não é verificável."
        ],
        [
         "Bom",
         false,
         "Rápido para quem?"
        ]
       ]
      },
      {
       "t": "“RF03 – O aluno deve poder consultar o saldo da carteira digital na tela inicial.”",
       "ops": [
        [
         "Bom: claro, identificado e verificável",
         true,
         "Dá para testar."
        ],
        [
         "Ruim",
         false,
         "Está bem escrito."
        ]
       ]
      },
      {
       "t": "“O sistema deve ter telas amigáveis etc.”",
       "ops": [
        [
         "Ruim: “amigável” e “etc.” são vagos",
         true,
         "Especifique critérios de usabilidade."
        ],
        [
         "Bom",
         false,
         "Não é verificável."
        ]
       ]
      },
      {
       "t": "Dois requisitos: “o pedido pode ser pago na retirada” e “todo pedido deve ser pago antes”.",
       "ops": [
        [
         "Inconsistentes: negociar com o cliente",
         true,
         "Requisitos não podem se contradizer."
        ],
        [
         "Tudo certo",
         false,
         "Contradição."
        ]
       ]
      }
     ]
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Qual técnica de elicitação?",
    "cfg": {
     "id": "el",
     "rotulo": "Situação",
     "itens": [
      {
       "t": "Descobrir a opinião de 600 alunos sobre o cardápio.",
       "ops": [
        [
         "Questionário",
         true,
         "Muitos respondentes."
        ],
        [
         "Entrevista com cada um",
         false,
         "Inviável."
        ]
       ]
      },
      {
       "t": "Entender como a atendente realmente registra os pedidos no papel.",
       "ops": [
        [
         "Observação (etnografia)",
         true,
         "Ver o trabalho real."
        ],
        [
         "Questionário",
         false,
         "As pessoas nem sempre descrevem o que fazem."
        ]
       ]
      },
      {
       "t": "A direção e o grêmio discordam sobre horários de venda.",
       "ops": [
        [
         "Workshop com os dois grupos",
         true,
         "Negociar juntos."
        ],
        [
         "Escolher um lado sem conversar",
         false,
         "Gera rejeição."
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
    "t": "Separe RF e RNF sem erros",
    "ev": "vis:lab-rf"
   },
   {
    "id": "m2",
    "t": "Avalie todos os requisitos",
    "ev": "rq:fim"
   },
   {
    "id": "m3",
    "t": "Especificação com qualidade de 80% ou mais",
    "ev": "rq:medidor80"
   },
   {
    "id": "m4",
    "t": "Escolha as técnicas de elicitação",
    "ev": "el:fim"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que é um requisito funcional?",
   "Uma função que o sistema deve oferecer."
  ],
  [
   "O que é um requisito não funcional?",
   "Uma qualidade ou restrição: desempenho, segurança, usabilidade, compatibilidade."
  ],
  [
   "O que são stakeholders?",
   "Todos os interessados ou afetados pelo sistema."
  ],
  [
   "Cite 4 técnicas de elicitação.",
   "Entrevista, questionário, observação, workshop, prototipação, análise de documentos."
  ],
  [
   "O que é um critério de aceitação?",
   "Condição verificável que diz quando o requisito está atendido."
  ],
  [
   "Por que evitar “rápido” e “amigável”?",
   "São vagos e não podem ser testados."
  ],
  [
   "O que é SRS?",
   "Documento de especificação de requisitos de software."
  ],
  [
   "O que é rastreabilidade?",
   "Ligar cada requisito à sua origem, ao código e aos testes."
  ],
  [
   "O que é validação de requisitos?",
   "Confirmar com o cliente que os requisitos expressam o que ele precisa."
  ],
  [
   "O que é regra de negócio?",
   "Política da organização que o sistema deve respeitar (ex.: média 6,0)."
  ],
  [
   "Quando usar observação?",
   "Quando o trabalho real difere do que as pessoas descrevem."
  ],
  [
   "Cite 4 qualidades de um bom requisito.",
   "Claro, completo, consistente, verificável, rastreável, priorizado."
  ]
 ],
 "vf": [
  [
   "“Emitir boletim” é requisito funcional.",
   true,
   "É uma função."
  ],
  [
   "“Responder em até 2 segundos” é requisito funcional.",
   false,
   "É não funcional (desempenho)."
  ],
  [
   "Só o cliente que paga é stakeholder.",
   false,
   "Usuários, gestores e reguladores também."
  ],
  [
   "Questionários são bons para ouvir muitas pessoas.",
   true,
   "Mas com perguntas mais fechadas."
  ],
  [
   "Requisitos podem se contradizer sem problema.",
   false,
   "Precisam ser consistentes."
  ],
  [
   "“O sistema deve ser fácil de usar” é verificável.",
   false,
   "Faltam critérios mensuráveis."
  ],
  [
   "Prototipação ajuda a validar requisitos.",
   true,
   "O cliente vê e opina."
  ],
  [
   "Requisitos nunca mudam depois de aprovados.",
   false,
   "Mudam; por isso há gerência de requisitos."
  ],
  [
   "LGPD gera requisitos não funcionais.",
   true,
   "Restrições legais e de segurança."
  ],
  [
   "Erros de requisitos custam mais quanto mais tarde são descobertos.",
   true,
   "Corrigir em produção é muito mais caro."
  ],
  [
   "A observação revela atalhos que o usuário não conta na entrevista.",
   true,
   "Por isso é valiosa."
  ],
  [
   "Todo requisito deve ter um identificador.",
   true,
   "Facilita referências e rastreabilidade."
  ]
 ],
 "caderno": [
  [
   "Escreva 3 RF e 2 RNF para um sistema de biblioteca.",
   "RF: emprestar livro, devolver, reservar. RNF: responder em 2 s, acessível no celular."
  ],
  [
   "Reescreva de forma verificável: “o sistema deve ser seguro”.",
   "Ex.: “Senhas armazenadas com hash; bloqueio após 5 tentativas; acesso por HTTPS”."
  ],
  [
   "Liste os stakeholders do sistema da cantina.",
   "Alunos, atendentes, dono da cantina, direção, responsáveis, nutricionista, setor financeiro."
  ],
  [
   "Compare entrevista e questionário.",
   "Entrevista: profunda, poucos; questionário: amplo, muitos, menos detalhe."
  ],
  [
   "Escreva um critério de aceitação para “o aluno pode cancelar pedido”.",
   "Dado um pedido ainda não preparado, quando o aluno cancelar, então o pedido some da fila e o saldo é estornado."
  ],
  [
   "Por que erros de requisitos são os mais caros?",
   "Propagam-se pelo projeto, código e testes e só aparecem tarde."
  ],
  [
   "O que deve ter um SRS?",
   "Introdução, escopo, stakeholders, RF, RNF, regras de negócio, glossário e critérios de aceitação."
  ],
  [
   "Diferença entre requisito e regra de negócio?",
   "Regra é a política da organização; requisito é o que o sistema faz para cumpri-la."
  ],
  [
   "Como resolver dois requisitos contraditórios?",
   "Negociar com os stakeholders e registrar a decisão."
  ],
  [
   "Por que observar o trabalho real?",
   "As pessoas omitem detalhes e atalhos que só aparecem na prática."
  ]
 ],
 "pbl": [
  {
   "titulo": "A cantina digital",
   "cenario": "<p>A cantina quer que os alunos façam pedidos pelo celular e retirem sem fila.</p>",
   "passos": [
    [
     "Liste stakeholders e técnicas de elicitação para cada um.",
     "Alunos (questionário), atendentes (observação e entrevista), dono (entrevista), direção (reunião), nutricionista (entrevista)."
    ],
    [
     "Escreva 4 RF, 3 RNF e 1 regra de negócio.",
     "RF: cadastrar produtos, fazer pedido, pagar, cancelar. RNF: confirmar em 2 s, Android/iOS, LGPD. Regra: pedidos até 15 min antes do intervalo."
    ]
   ]
  },
  {
   "titulo": "Requisitos vagos",
   "cenario": "<p>O documento recebido diz: “sistema rápido, bonito, seguro e fácil, com relatórios etc.”.</p>",
   "passos": [
    [
     "Aponte os problemas.",
     "Termos vagos, nada verificável, “etc.” esconde requisitos, sem prioridades nem identificadores."
    ],
    [
     "Reescreva 3 itens de forma verificável.",
     "Relatório de vendas diário em PDF; login com bloqueio após 5 tentativas; tela de pedido em até 3 toques."
    ]
   ]
  },
  {
   "titulo": "Conflito de interesses",
   "cenario": "<p>A direção quer proibir refrigerante; o dono da cantina diz que perde 30% das vendas.</p>",
   "passos": [
    [
     "Que técnica usar?",
     "Workshop com os dois grupos e a nutricionista."
    ],
    [
     "Como registrar a decisão no documento?",
     "Regra de negócio com justificativa, data, responsáveis e eventuais alternativas aprovadas."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Requisitos",
   "itens": [
    "RF × RNF × regras de negócio.",
    "Stakeholders e técnicas de elicitação.",
    "Requisitos claros, consistentes e verificáveis.",
    "SRS, validação e rastreabilidade."
   ]
  }
 ],
 "glossario": [
  [
   "Elicitação",
   "Descobrir requisitos com os interessados."
  ],
  [
   "Critério de aceitação",
   "Condição de teste do requisito."
  ]
 ]
});
