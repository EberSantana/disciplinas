FSI.modulo({
 "n": 6,
 "unidade": "Unidade 4",
 "nome": "CASE, testes, documentação e Git",
 "titulo": "Ferramentas, qualidade e versionamento",
 "duracao": "10 h",
 "resumoCurto": "Ferramentas CASE, documentação, tipos e níveis de teste, controle de versão com Git e fluxo com ramos.",
 "analogia": {
  "titulo": "O caderno com fotos do progresso",
  "txt": "<p>Imagine tirar uma foto do trabalho a cada passo importante, com uma legenda: “capa pronta”, “introdução revisada”. Se algo der errado, você volta à foto anterior. O <b>Git</b> faz isso com o código: cada <b>commit</b> é uma foto com legenda, e os <b>ramos</b> permitem experimentar sem estragar a versão principal.</p>"
 },
 "chave": [
  "Ferramentas <b>CASE</b> apoiam modelagem, documentação, geração de código e testes (Astah, draw.io, StarUML).",
  "Níveis de teste: <b>unidade, integração, sistema e aceitação</b>.",
  "Caixa-preta (entradas e saídas) × caixa-branca (código interno).",
  "Git: <b>init, status, add, commit, log, branch, merge</b>; GitHub hospeda o repositório remoto.",
  "Boas mensagens de commit explicam o porquê da mudança.",
  "Documentação: requisitos, modelos, dicionário de dados, manual do usuário, README."
 ],
 "objetivos": [
  "Escolher <b>ferramentas CASE</b>.",
  "Diferenciar <b>níveis e tipos de teste</b>.",
  "Versionar com <b>Git</b> e ramos.",
  "Manter a <b>documentação</b> viva."
 ],
 "licoes": [
  {
   "t": "Testes",
   "txt": "<p><b>Unidade</b>: uma função ou classe. <b>Integração</b>: módulos juntos. <b>Sistema</b>: o sistema inteiro contra os requisitos. <b>Aceitação</b>: o cliente valida. Testes de regressão garantem que o que funcionava continua funcionando.</p>"
  },
  {
   "t": "Git",
   "txt": "<p><code>git init</code> cria o repositório; <code>git add</code> prepara; <code>git commit -m</code> grava a foto; <code>git log</code> mostra o histórico; <code>git checkout -b nova-tela</code> cria um ramo; <code>git merge nova-tela</code> junta ao principal; <code>git push</code> envia ao GitHub.</p>"
  },
  {
   "t": "CASE e documentação",
   "txt": "<p>Ferramentas desenham UML, geram documentação e até código. O README explica como instalar e usar; o dicionário de dados descreve cada campo; o manual orienta o usuário. Documentação desatualizada engana.</p>"
  }
 ],
 "termos": [
  [
   "Commit",
   "Foto do código com mensagem."
  ],
  [
   "Ramo (branch)",
   "Linha paralela de desenvolvimento."
  ],
  [
   "Merge",
   "Junta ramos."
  ],
  [
   "Regressão",
   "Teste que garante que nada quebrou."
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
   "id": "testes",
   "titulo": "Níveis de teste",
   "forma": "piramide",
   "h": 320,
   "camadas": [
    {
     "t": "Aceitação",
     "d": "O cliente valida."
    },
    {
     "t": "Sistema",
     "d": "O sistema inteiro contra os requisitos."
    },
    {
     "t": "Integração",
     "d": "Módulos funcionando juntos."
    },
    {
     "t": "Unidade",
     "d": "Cada função e classe; os mais numerosos."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Versione o projeto do site da cantina no Git: crie o repositório, faça commits, trabalhe num ramo e junte ao principal.",
  "sims": [
   {
    "tipo": "git",
    "titulo": "Terminal Git simulado",
    "instr": "Siga as missões: git init → git add . → git commit -m \"...\" → git checkout -b nova-tela → editar index.html → git add . → git commit → git switch main → git merge nova-tela.",
    "cfg": {
     "id": "gt"
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Que nível de teste?",
    "cfg": {
     "id": "ts",
     "rotulo": "Teste",
     "itens": [
      {
       "t": "Verificar se a função calcularTotal() soma corretamente 3 itens.",
       "ops": [
        [
         "Unidade",
         true,
         "Uma função isolada."
        ],
        [
         "Aceitação",
         false,
         "Não envolve o cliente."
        ],
        [
         "Sistema",
         false,
         "Não é o sistema inteiro."
        ]
       ]
      },
      {
       "t": "Conferir se o módulo de pedidos conversa certo com o de pagamento.",
       "ops": [
        [
         "Integração",
         true,
         "Módulos juntos."
        ],
        [
         "Unidade",
         false,
         "São dois módulos."
        ],
        [
         "Aceitação",
         false,
         "Não é validação do cliente."
        ]
       ]
      },
      {
       "t": "O dono da cantina usa o sistema por uma semana e aprova.",
       "ops": [
        [
         "Aceitação",
         true,
         "Validação pelo cliente."
        ],
        [
         "Unidade",
         false,
         "Não."
        ],
        [
         "Integração",
         false,
         "Não."
        ]
       ]
      },
      {
       "t": "Depois de corrigir um erro, rodar de novo todos os testes antigos.",
       "ops": [
        [
         "Regressão",
         true,
         "Garante que nada quebrou."
        ],
        [
         "Aceitação",
         false,
         "Não necessariamente."
        ],
        [
         "Nenhum teste é preciso",
         false,
         "Erro comum."
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
    "t": "Crie o repositório (git init)",
    "ev": "gt:init"
   },
   {
    "id": "m2",
    "t": "Faça o primeiro commit",
    "ev": "gt:commit"
   },
   {
    "id": "m3",
    "t": "Crie um ramo",
    "ev": "gt:branch"
   },
   {
    "id": "m4",
    "t": "Faça um commit no ramo",
    "ev": "gt:commit-ramo"
   },
   {
    "id": "m5",
    "t": "Junte o ramo ao main (merge)",
    "ev": "gt:merge"
   },
   {
    "id": "m6",
    "t": "Veja o histórico (git log)",
    "ev": "gt:log"
   },
   {
    "id": "m7",
    "t": "Identifique todos os níveis de teste",
    "ev": "ts:fim"
   }
  ],
  "guiados": [
   {
    "titulo": "Cobertura de testes",
    "txt": "<p>O sistema tem <b>120 funções</b>; <b>78</b> têm testes de unidade.</p>",
    "passos": [
     {
      "p": "Qual a cobertura em percentual?",
      "r": 65,
      "un": "%",
      "dica": "78 ÷ 120 × 100.",
      "expl": "65%."
     },
     {
      "p": "Quantas funções faltam testar para chegar a 80%?",
      "r": 18,
      "dica": "80% de 120 = 96; 96 − 78.",
      "expl": "18 funções."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma ferramenta CASE?",
   "Software que apoia atividades da engenharia de software: modelagem, documentação, geração de código, testes."
  ],
  [
   "Cite 4 níveis de teste.",
   "Unidade, integração, sistema, aceitação."
  ],
  [
   "Caixa-preta × caixa-branca?",
   "Preta testa entradas e saídas; branca examina o código interno."
  ],
  [
   "O que é teste de regressão?",
   "Rodar de novo os testes para garantir que mudanças não quebraram o que funcionava."
  ],
  [
   "O que faz git add?",
   "Prepara as mudanças para o próximo commit."
  ],
  [
   "O que faz git commit -m?",
   "Grava as mudanças preparadas com uma mensagem."
  ],
  [
   "Para que serve um ramo?",
   "Desenvolver algo novo sem afetar a versão principal."
  ],
  [
   "O que faz git merge?",
   "Junta as mudanças de um ramo em outro."
  ],
  [
   "Git × GitHub?",
   "Git é o controle de versão; GitHub hospeda repositórios na internet."
  ],
  [
   "O que é um bom README?",
   "Explica o que é o projeto, como instalar, usar e contribuir."
  ],
  [
   "O que é TDD?",
   "Escrever o teste antes do código."
  ],
  [
   "Por que documentação desatualizada é perigosa?",
   "Engana quem confia nela e gera erros."
  ]
 ],
 "vf": [
  [
   "Teste de unidade valida o sistema inteiro.",
   false,
   "Valida uma função ou classe."
  ],
  [
   "Teste de aceitação envolve o cliente.",
   true,
   "Ele valida se atende."
  ],
  [
   "git commit envia o código para o GitHub.",
   false,
   "Grava localmente; quem envia é o git push."
  ],
  [
   "Cada commit deve ter uma mensagem significativa.",
   true,
   "Explica a mudança."
  ],
  [
   "Ramos permitem experimentar sem estragar o main.",
   true,
   "É o principal uso."
  ],
  [
   "Teste caixa-branca olha o código interno.",
   true,
   "Caminhos e condições."
  ],
  [
   "Ferramentas CASE substituem o analista.",
   false,
   "Apoiam o trabalho."
  ],
  [
   "Testes mostram que o software não tem nenhum erro.",
   false,
   "Mostram a presença de erros, não a ausência."
  ],
  [
   "git status mostra o estado dos arquivos.",
   true,
   "Modificados, preparados, limpos."
  ],
  [
   "Testes de regressão são feitos depois de mudanças.",
   true,
   "Para evitar efeitos colaterais."
  ],
  [
   "O dicionário de dados descreve campos e tabelas.",
   true,
   "Tipo, tamanho, significado."
  ],
  [
   "É boa prática commitar tudo só no final do projeto.",
   false,
   "Commits pequenos e frequentes."
  ]
 ],
 "caderno": [
  [
   "Cite 3 ferramentas CASE e para que servem.",
   "Astah/StarUML (UML), draw.io (diagramas), Jira/Trello (gestão), Git (versão)."
  ],
  [
   "Explique os 4 níveis de teste com exemplos da cantina.",
   "Unidade: calcularTotal; integração: pedido + pagamento; sistema: fluxo completo; aceitação: o dono aprova."
  ],
  [
   "Escreva a sequência de comandos para criar um repositório e fazer o primeiro commit.",
   "git init; git add .; git commit -m \"Versão inicial do site\"."
  ],
  [
   "Por que usar ramos?",
   "Isolar novas funções ou correções e juntar só quando estiverem prontas."
  ],
  [
   "Escreva 3 boas mensagens de commit.",
   "“Adiciona tela de cancelamento de pedido”, “Corrige cálculo de troco”, “Atualiza README com instalação”."
  ],
  [
   "Caixa-preta × caixa-branca?",
   "Preta: só entradas e saídas; branca: estrutura interna."
  ],
  [
   "O que deve ter o README de um projeto escolar?",
   "Descrição, tecnologias, como rodar, autores e licença."
  ],
  [
   "Por que testes não provam ausência de erros?",
   "Não dá para testar todas as entradas possíveis."
  ],
  [
   "O que é integração contínua?",
   "Juntar e testar o código automaticamente a cada mudança."
  ],
  [
   "Como o Git ajuda no trabalho em grupo?",
   "Cada um trabalha no seu ramo, o histórico mostra quem mudou o quê e os conflitos são resolvidos no merge."
  ]
 ],
 "pbl": [
  {
   "titulo": "O trabalho que sumiu",
   "cenario": "<p>Um grupo perdeu a versão que funcionava do site depois que um colega “melhorou” tudo de madrugada.</p>",
   "passos": [
    [
     "Como o Git teria evitado isso?",
     "Commits frequentes permitiriam voltar à versão anterior; o colega trabalharia num ramo."
    ],
    [
     "Proponha um fluxo de trabalho para o grupo.",
     "main sempre funcionando; um ramo por tarefa; commits pequenos com mensagens claras; merge após revisão; push diário no GitHub."
    ]
   ]
  },
  {
   "titulo": "Plano de testes da cantina",
   "cenario": "<p>O sistema da cantina vai ser entregue em duas semanas e ainda não tem nenhum teste.</p>",
   "passos": [
    [
     "Monte um plano com os quatro níveis.",
     "Unidade (cálculos), integração (pedido e pagamento), sistema (fluxo completo no celular), aceitação (dono e alunos testam uma semana)."
    ],
    [
     "O que priorizar com pouco tempo?",
     "Funções críticas: pagamento, saldo e pedidos; testes de regressão automatizados nelas."
    ]
   ]
  },
  {
   "titulo": "Documentação esquecida",
   "cenario": "<p>Um novo aluno entrou no projeto e levou 2 semanas para conseguir rodá-lo.</p>",
   "passos": [
    [
     "Que documentos faltaram?",
     "README com instalação, dicionário de dados, diagrama de classes e casos de uso."
    ],
    [
     "Como manter a documentação viva?",
     "Atualizar junto com o código, no mesmo commit, e revisar a cada sprint."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Qualidade e versão",
   "itens": [
    "CASE apoia modelagem e documentação.",
    "Unidade, integração, sistema, aceitação; regressão.",
    "Git: init, add, commit, log, branch, merge, push.",
    "README e dicionário de dados."
   ]
  }
 ],
 "glossario": [
  [
   "Pull request",
   "Pedido para juntar um ramo, com revisão."
  ],
  [
   "Repositório",
   "Pasta com o histórico do Git."
  ]
 ]
});
