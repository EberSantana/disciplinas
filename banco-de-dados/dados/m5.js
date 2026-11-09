FSI.modulo({
 "n": 5,
 "unidade": "Modelagem",
 "nome": "Modelo ER estendido (EER)",
 "titulo": "Herança no banco: especialização, generalização e categoria",
 "duracao": "4 h",
 "resumoCurto": "Especialização, generalização, herança, categoria e agregação",
 "analogia": {
  "titulo": "Pessoas da escola",
  "txt": "<p>Na escola há <b>pessoas</b>. Toda pessoa tem nome e CPF, mas o <b>aluno</b> tem RA e turma, o <b>professor</b> tem SIAPE e área. Em vez de repetir nome e CPF em duas entidades, criamos a superclasse <b>Pessoa</b> e as subclasses Aluno e Professor, que <b>herdam</b> o que é comum. E se alguém for aluno e professor ao mesmo tempo? Aí a especialização é <b>sobreposta</b>.</p>"
 },
 "chave": [
  "EER estende o ER para semânticas mais ricas.",
  "Especialização (top-down): superclasse → subclasses. Generalização (bottom-up): entidades → superclasse.",
  "Restrições: completude total/parcial e disjunção disjunta (d)/sobreposta (o).",
  "Herança IS-A: a subclasse herda atributos e relacionamentos da superclasse.",
  "Categoria (tipo união ∪): subclasse com superclasses diferentes, pertencendo a uma só.",
  "Agregação: trata um relacionamento como entidade para participar de outro relacionamento."
 ],
 "objetivos": [
  "Diferenciar <b>especialização</b> e <b>generalização</b>.",
  "Aplicar as restrições <b>total/parcial</b> e <b>disjunta/sobreposta</b>.",
  "Reconhecer <b>categoria</b> e <b>agregação</b>."
 ],
 "licoes": [
  {
   "t": "Superclasse e subclasses",
   "txt": "<p><b>Especialização</b> (top-down) divide uma entidade em subclasses; <b>generalização</b> (bottom-up) junta entidades parecidas numa superclasse. A subclasse <b>herda</b> (IS-A) atributos e relacionamentos.</p>"
  },
  {
   "t": "Restrições",
   "txt": "",
   "pontos": [
    "<b>Total</b>: toda instância da superclasse pertence a alguma subclasse (linha dupla).",
    "<b>Parcial</b>: pode haver pessoa que não é aluno nem professor.",
    "<b>Disjunta (d)</b>: pertence a no máximo uma subclasse.",
    "<b>Sobreposta (o)</b>: pode pertencer a várias."
   ]
  },
  {
   "t": "Categoria e agregação",
   "txt": "<p><b>Categoria</b> (união ∪): uma subclasse cujas instâncias vêm de superclasses diferentes — PROPRIETÁRIO pode ser PESSOA ou EMPRESA. <b>Agregação</b>: tratar um relacionamento como entidade para que ele participe de outro.</p>"
  }
 ],
 "termos": [
  [
   "Especialização",
   "Superclasse → subclasses."
  ],
  [
   "Generalização",
   "Entidades → superclasse."
  ],
  [
   "Disjunta",
   "Uma subclasse só."
  ],
  [
   "Sobreposta",
   "Várias subclasses."
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
   "id": "eer",
   "titulo": "Pessoa, aluno e professor",
   "h": 340,
   "nos": [
    {
     "id": "p",
     "x": 360,
     "y": 60,
     "t": "PESSOA",
     "d": "Superclasse: CPF, nome, e-mail."
    },
    {
     "id": "o",
     "x": 360,
     "y": 180,
     "t": "o\n(sobreposta)",
     "d": "Uma pessoa pode ser aluno e professor ao mesmo tempo. Parcial: há pessoas que não são nenhum dos dois (ex.: visitantes)."
    },
    {
     "id": "a",
     "x": 180,
     "y": 300,
     "t": "ALUNO",
     "d": "Subclasse: RA, turma. Herda CPF e nome."
    },
    {
     "id": "pr",
     "x": 540,
     "y": 300,
     "t": "PROFESSOR",
     "d": "Subclasse: SIAPE, área. Herda CPF e nome."
    }
   ],
   "liga": [
    [
     "p",
     "o"
    ],
    [
     "o",
     "a"
    ],
    [
     "o",
     "pr"
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Decida as restrições de cada hierarquia como um modelador.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Modelador EER: total ou parcial? disjunta ou sobreposta?",
    "cfg": {
     "id": "eer",
     "rotulo": "Hierarquia",
     "medidor": {
      "nome": "Precisão do modelo",
      "ini": 50
     },
     "itens": [
      {
       "t": "VEÍCULO especializado em CARRO e MOTO; todo veículo da frota é um dos dois e não pode ser os dois.",
       "ops": [
        [
         "Total e disjunta",
         true,
         "Todos pertencem (total) a uma só (disjunta)."
        ],
        [
         "Parcial e sobreposta",
         false,
         "Contradiz o enunciado."
        ],
        [
         "Total e sobreposta",
         false,
         "Não pode ser os dois."
        ]
       ]
      },
      {
       "t": "PESSOA em ALUNO e PROFESSOR; há visitantes cadastrados e um monitor pode ser aluno e professor.",
       "ops": [
        [
         "Parcial e sobreposta",
         true,
         "Visitantes = parcial; monitor = sobreposta."
        ],
        [
         "Total e disjunta",
         false,
         "Há visitantes e há quem seja os dois."
        ],
        [
         "Total e sobreposta",
         false,
         "Visitantes tornam parcial."
        ]
       ]
      },
      {
       "t": "CONTA em CORRENTE e POUPANÇA; toda conta é de um tipo só, mas o banco ainda tem contas antigas sem tipo.",
       "ops": [
        [
         "Parcial e disjunta",
         true,
         "Sem tipo = parcial; um só tipo = disjunta."
        ],
        [
         "Total e disjunta",
         false,
         "Há contas sem tipo."
        ],
        [
         "Parcial e sobreposta",
         false,
         "Não pode ser dos dois tipos."
        ]
       ]
      },
      {
       "t": "PROPRIETÁRIO de um imóvel pode ser uma PESSOA ou uma EMPRESA.",
       "ops": [
        [
         "Categoria (união)",
         true,
         "Instâncias de superclasses diferentes."
        ],
        [
         "Especialização disjunta",
         false,
         "Aqui são duas superclasses distintas."
        ],
        [
         "Agregação",
         false,
         "Não é relacionamento virando entidade."
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
    "t": "Acerte 3 hierarquias",
    "ev": "eer:acertos:3"
   },
   {
    "id": "m2",
    "t": "Analise todas as hierarquias",
    "ev": "eer:fim"
   },
   {
    "id": "m3",
    "t": "Analise todas sem erro",
    "ev": "eer:perfeito"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que é especialização?",
   "Processo top-down de definir subclasses a partir de uma superclasse."
  ],
  [
   "O que é generalização?",
   "Processo bottom-up de criar uma superclasse a partir de entidades com atributos comuns."
  ],
  [
   "O que é herança no EER?",
   "A subclasse herda todos os atributos e relacionamentos da superclasse (princípio IS-A)."
  ],
  [
   "O que significa especialização total?",
   "Toda instância da superclasse pertence a pelo menos uma subclasse (linha dupla)."
  ],
  [
   "O que significa especialização parcial?",
   "Pode haver instâncias da superclasse fora de qualquer subclasse."
  ],
  [
   "O que significa disjunta (d)?",
   "Cada instância pertence a no máximo uma subclasse."
  ],
  [
   "O que significa sobreposta (o)?",
   "Uma instância pode pertencer a várias subclasses."
  ],
  [
   "O que é uma categoria (tipo união)?",
   "Subclasse com superclasses de tipos diferentes; cada instância pertence a exatamente uma delas."
  ],
  [
   "O que é agregação?",
   "Tratar um relacionamento como entidade de nível superior para ligá-lo a outra entidade."
  ],
  [
   "Mapeamento EER opção A?",
   "Uma tabela para a superclasse e uma para cada subclasse, com FK para a superclasse."
  ],
  [
   "Mapeamento EER opção C?",
   "Uma tabela única com todos os atributos + atributo discriminador de tipo."
  ],
  [
   "Qual o risco da opção C?",
   "Muitos NULLs quando as subclasses têm muitos atributos diferentes."
  ]
 ],
 "vf": [
  [
   "Especialização é um processo bottom-up.",
   false,
   "É top-down. A generalização é bottom-up."
  ],
  [
   "A subclasse pode ter atributos próprios além dos herdados.",
   true,
   "Ex.: ENGENHEIRO herda de FUNCIONÁRIO e tem CREA."
  ],
  [
   "PESSOA dividida em FÍSICA e JURÍDICA é exemplo de disjunção.",
   true,
   "Uma pessoa não pode ser física e jurídica ao mesmo tempo."
  ],
  [
   "Um funcionário que é engenheiro e gerente ao mesmo tempo indica especialização sobreposta.",
   true,
   "A instância pertence a duas subclasses."
  ],
  [
   "Na categoria, uma instância pode pertencer a várias superclasses ao mesmo tempo.",
   false,
   "Pertence a exatamente uma delas (PESSOA ou EMPRESA ou BANCO)."
  ],
  [
   "A opção B de mapeamento funciona bem para especialização parcial.",
   false,
   "Sem tabela da superclasse, instâncias sem subclasse se perdem; só serve para total."
  ],
  [
   "Toda instância de uma subclasse também é instância da superclasse.",
   true,
   "Esse é o princípio IS-A."
  ],
  [
   "Agregação permite que um relacionamento participe de outro relacionamento.",
   true,
   "Ex.: GERENTE monitora [FUNCIONÁRIO trabalha_em PROJETO]."
  ],
  [
   "CARRO e CAMINHÃO gerando VEÍCULO é um exemplo de generalização.",
   true,
   "Parte-se das entidades concretas para a superclasse comum."
  ],
  [
   "Linha simples entre superclasse e círculo indica especialização total.",
   false,
   "Linha simples indica parcial; total usa linha dupla."
  ],
  [
   "A opção A de mapeamento serve para qualquer tipo de especialização.",
   true,
   "Mantém a superclasse e as subclasses separadas."
  ],
  [
   "Categoria e especialização compartilhada são a mesma coisa.",
   false,
   "Na categoria as superclasses são entidades distintas, não subclasses da mesma entidade."
  ]
 ],
 "caderno": [
  [
   "Desenhe a especialização de FUNCIONÁRIO em PROFESSOR e TÉCNICO-ADMINISTRATIVO, com atributos próprios.",
   "FUNCIONÁRIO(Matrícula, Nome, Admissão) → PROFESSOR(Titulação, Área) e TÉCNICO(Cargo, Setor), total e disjunta."
  ],
  [
   "Classifique: CONTA em CORRENTE ou POUPANÇA (toda conta é de um tipo, só um).",
   "Total e disjunta."
  ],
  [
   "Classifique: PESSOA pode ser CLIENTE e/ou FUNCIONÁRIO, ou nenhum.",
   "Parcial e sobreposta."
  ],
  [
   "Dê um exemplo de generalização a partir de duas entidades do seu cotidiano.",
   "Ex.: CELULAR e NOTEBOOK → DISPOSITIVO (marca, modelo, patrimônio)."
  ],
  [
   "Modele uma categoria para PAGADOR de mensalidade (aluno ou responsável ou empresa).",
   "PAGADOR = categoria (∪) de ALUNO, RESPONSÁVEL e EMPRESA; cada pagador é só um deles."
  ],
  [
   "Explique agregação com o exemplo ALUNO participa de PROJETO, supervisionado por PROFESSOR.",
   "Agrega-se [ALUNO participa PROJETO] e cria-se o relacionamento supervisiona entre PROFESSOR e essa agregação."
  ],
  [
   "Mapeie a especialização VEÍCULO→CARRO/MOTO pela opção A.",
   "VEICULO(Placa, Marca, Ano); CARRO(Placa FK/PK, Portas); MOTO(Placa FK/PK, Cilindradas)."
  ],
  [
   "Mapeie a mesma especialização pela opção C.",
   "VEICULO(Placa, Marca, Ano, Tipo, Portas, Cilindradas), com Tipo como discriminador."
  ],
  [
   "Compare as opções A e C em vantagens e desvantagens.",
   "A: sem NULLs, mais JOINs. C: consulta simples, muitos NULLs e menos controle de restrições."
  ],
  [
   "Por que o ER básico não basta em alguns casos?",
   "Não representa bem herança, subtipos com atributos próprios, tipos união e relacionamentos entre relacionamentos."
  ]
 ],
 "pbl": [
  {
   "titulo": "Rede social do campus",
   "cenario": "Usuários podem ser ALUNOS, SERVIDORES ou EGRESSOS; um servidor pode ter sido aluno. Todos publicam posts. Páginas podem ser administradas por um usuário ou por um SETOR do campus.",
   "passos": [
    [
     "Que especialização existe e com que restrições?",
     "USUÁRIO → ALUNO, SERVIDOR, EGRESSO: total e sobreposta."
    ],
    [
     "Onde fica o relacionamento publica?",
     "Na superclasse USUÁRIO, herdado por todas as subclasses."
    ],
    [
     "Como modelar o administrador da página?",
     "Categoria ADMINISTRADOR = USUÁRIO ∪ SETOR."
    ]
   ]
  },
  {
   "titulo": "Oficina de manutenção",
   "cenario": "Técnicos são alocados em ordens de serviço com horas trabalhadas. O supervisor precisa aprovar cada alocação (técnico + ordem).",
   "passos": [
    [
     "Qual relacionamento será agregado?",
     "TÉCNICO trabalha_em ORDEM_SERVIÇO (com atributo horas)."
    ],
    [
     "Qual relacionamento novo surge?",
     "SUPERVISOR aprova [TÉCNICO trabalha_em ORDEM]."
    ],
    [
     "Como fica no relacional?",
     "ALOCACAO(Matricula_Tec, NumOS, Horas) e APROVACAO(Matricula_Tec, NumOS, Matricula_Sup, Data), com FK composta para ALOCACAO."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "EER",
   "itens": [
    "Especialização e generalização; herança IS-A.",
    "Total/parcial; disjunta/sobreposta.",
    "Categoria e agregação."
   ]
  }
 ],
 "glossario": [
  [
   "IS-A",
   "Relação “é um” da herança."
  ],
  [
   "Categoria",
   "Subclasse de superclasses diferentes."
  ]
 ]
});
