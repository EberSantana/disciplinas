FSI.modulo({
 "n": 7,
 "unidade": "Modelagem",
 "nome": "Normalização",
 "titulo": "Acabando com a repetição: 1FN, 2FN e 3FN",
 "duracao": "6 h",
 "resumoCurto": "Anomalias, dependências funcionais e formas normais",
 "analogia": {
  "titulo": "A planilha bagunçada da cantina",
  "txt": "<p>A cantina anota numa planilha: pedido, aluno, turma do aluno, produtos (“coxinha, suco”) e o preço de cada produto. Se a turma do aluno muda, é preciso corrigir dezenas de linhas (<b>anomalia de atualização</b>); se o único pedido de um produto é apagado, o preço dele some (<b>anomalia de exclusão</b>); não dá para cadastrar um produto novo sem um pedido (<b>anomalia de inserção</b>). Normalizar é dividir essa planilha em tabelas certas.</p>"
 },
 "chave": [
  "Normalizar reduz redundância e evita anomalias de inserção, exclusão e atualização.",
  "Dependência funcional X → Y: cada valor de X determina um único Y.",
  "DF parcial: depende de parte da chave composta. DF transitiva: X → Y → Z.",
  "1FN: valores atômicos. 2FN: 1FN + sem DF parcial. 3FN: 2FN + sem DF transitiva.",
  "FNBC: todo determinante é superchave. 4FN e 5FN tratam dependências multivaloradas e de junção.",
  "Regras de Armstrong: reflexividade, aumento, transitividade (+ decomposição, união, pseudotransitividade)."
 ],
 "objetivos": [
  "Reconhecer as <b>anomalias</b> de inserção, exclusão e atualização.",
  "Identificar <b>dependências funcionais</b> parciais e transitivas.",
  "Levar uma tabela à <b>1FN, 2FN e 3FN</b>."
 ],
 "licoes": [
  {
   "t": "Dependência funcional",
   "txt": "<p>X → Y significa que cada valor de X determina um único Y: RA → nome. É <b>parcial</b> quando depende só de parte de uma chave composta; é <b>transitiva</b> quando passa por outra coluna (RA → cidade → estado).</p>"
  },
  {
   "t": "As formas normais",
   "txt": "",
   "pontos": [
    "<b>1FN</b>: valores atômicos, sem listas na célula nem grupos repetidos.",
    "<b>2FN</b>: 1FN + nenhuma coluna depende só de parte da chave composta.",
    "<b>3FN</b>: 2FN + nenhuma coluna não-chave depende de outra coluna não-chave.",
    "<b>FNBC</b>: todo determinante é chave candidata."
   ]
  },
  {
   "t": "Exemplo",
   "txt": "<p>PEDIDO(<u>num, produto</u>, data, aluno, turma, preço). <b>preço</b> depende só de produto → parcial (fere a 2FN): vai para PRODUTO. <b>turma</b> depende de aluno, que depende de num → transitiva (fere a 3FN): vai para ALUNO.</p>"
  }
 ],
 "termos": [
  [
   "Anomalia",
   "Problema causado por redundância."
  ],
  [
   "DF parcial",
   "Depende de parte da chave."
  ],
  [
   "DF transitiva",
   "X → Y → Z."
  ],
  [
   "3FN",
   "Sem DF parcial nem transitiva."
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
   "tipo": "classificar",
   "id": "jogo-fn",
   "titulo": "Jogo: que forma normal está sendo violada?",
   "cats": [
    "1FN",
    "2FN",
    "3FN"
   ],
   "itens": [
    [
     "Coluna telefones com '9999-1111, 9888-2222'",
     0
    ],
    [
     "Coluna produtos com 'coxinha, suco'",
     0
    ],
    [
     "Em ITEM(pedido, produto, preço), preço depende só de produto",
     1
    ],
    [
     "Em NOTA(ra, disciplina, nome_aluno), nome depende só de ra",
     1
    ],
    [
     "Em ALUNO(ra, cep, cidade), cidade depende do CEP",
     2
    ],
    [
     "Em FUNC(mat, depto, nome_depto), nome_depto depende de depto",
     2
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Seja o consultor que arruma a planilha da cantina, decisão por decisão.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Consultor de normalização",
    "cfg": {
     "id": "nf",
     "rotulo": "Passo",
     "embaralhar": false,
     "medidor": {
      "nome": "Qualidade do banco",
      "ini": 40
     },
     "itens": [
      {
       "t": "A coluna “produtos” guarda “coxinha, suco, bolo” na mesma célula.",
       "ops": [
        [
         "Fere a 1FN: criar uma linha por item (tabela ITEM_PEDIDO)",
         true,
         "Valores atômicos."
        ],
        [
         "Está certo, economiza linhas",
         false,
         "Impede consultar por produto."
        ],
        [
         "Fere a 3FN",
         false,
         "É a 1FN: valor não atômico."
        ]
       ]
      },
      {
       "t": "Em ITEM_PEDIDO(<u>num_pedido, produto</u>, qtd, preço_produto), o preço depende só do produto.",
       "ops": [
        [
         "DF parcial: mover preço para PRODUTO(produto, preço) — 2FN",
         true,
         "Depende de parte da chave composta."
        ],
        [
         "DF transitiva",
         false,
         "Transitiva é entre colunas não-chave."
        ],
        [
         "Nada a fazer",
         false,
         "Gera anomalia de atualização de preço."
        ]
       ]
      },
      {
       "t": "Em PEDIDO(<u>num</u>, data, ra, turma), turma depende do ra, não do pedido.",
       "ops": [
        [
         "DF transitiva: mover turma para ALUNO(ra, turma) — 3FN",
         true,
         "num → ra → turma."
        ],
        [
         "DF parcial",
         false,
         "A chave não é composta."
        ],
        [
         "Fere a 1FN",
         false,
         "Os valores são atômicos."
        ]
       ]
      },
      {
       "t": "Depois de normalizar, como saber a turma de quem fez o pedido 15?",
       "ops": [
        [
         "Juntar PEDIDO e ALUNO pela FK ra (JOIN)",
         true,
         "Normalizar separa; a junção reúne quando preciso."
        ],
        [
         "Não dá mais para saber",
         false,
         "A FK mantém a ligação."
        ],
        [
         "Duplicar a turma em PEDIDO",
         false,
         "Voltaria a redundância."
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
    "t": "Acerte 2 decisões",
    "ev": "nf:acertos:2"
   },
   {
    "id": "m2",
    "t": "Leve a qualidade do banco a 80% ou mais",
    "ev": "nf:medidor80"
   },
   {
    "id": "m3",
    "t": "Normalize sem errar",
    "ev": "nf:perfeito"
   }
  ],
  "guiados": [
   {
    "titulo": "Quanto se repete?",
    "txt": "<p>Uma planilha não normalizada guarda, em cada um dos <b>200 pedidos</b>, o nome e a turma do aluno. Há <b>40 alunos</b>.</p>",
    "passos": [
     {
      "p": "Quantas vezes a turma aparece escrita na planilha?",
      "r": 200,
      "un": "vezes",
      "dica": "Uma por pedido.",
      "expl": "200."
     },
     {
      "p": "Depois de normalizar (turma na tabela ALUNO), quantas vezes?",
      "r": 40,
      "un": "vezes",
      "dica": "Uma por aluno.",
      "expl": "40."
     },
     {
      "p": "Quantas escritas a menos?",
      "r": 160,
      "un": "vezes",
      "dica": "200 − 40.",
      "expl": "160 a menos — e uma mudança de turma passa a ser corrigida num lugar só."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Qual o objetivo da normalização?",
   "Minimizar redundância e evitar anomalias de atualização."
  ],
  [
   "O que é anomalia de inserção?",
   "Não conseguir inserir um dado por falta de outro (ex.: departamento sem funcionários)."
  ],
  [
   "O que é anomalia de exclusão?",
   "Perder dados sem querer ao excluir uma linha (ex.: último funcionário leva o departamento junto)."
  ],
  [
   "O que é anomalia de atualização?",
   "Ter de alterar o mesmo dado em várias linhas."
  ],
  [
   "O que significa X → Y?",
   "Y depende funcionalmente de X: cada valor de X corresponde a um único Y."
  ],
  [
   "O que é dependência parcial?",
   "Atributo que depende só de parte de uma chave composta."
  ],
  [
   "O que é dependência transitiva?",
   "Atributo não-chave que depende de outro atributo não-chave (X → Y → Z)."
  ],
  [
   "Regra da 1FN?",
   "Todos os atributos têm valores atômicos (sem multivalorados ou compostos)."
  ],
  [
   "Regra da 2FN?",
   "Estar na 1FN e não ter dependências parciais."
  ],
  [
   "Regra da 3FN?",
   "Estar na 2FN e não ter dependências transitivas."
  ],
  [
   "Regra da FNBC?",
   "Para toda DF não trivial X → Y, X é superchave."
  ],
  [
   "Regra de Armstrong da transitividade?",
   "Se X → Y e Y → Z, então X → Z."
  ]
 ],
 "vf": [
  [
   "Uma tabela com a coluna Telefones = \"9999-1111, 9888-2222\" está na 1FN.",
   false,
   "O atributo é multivalorado; viola a atomicidade exigida pela 1FN."
  ],
  [
   "Tabela com chave primária simples que está na 1FN já está na 2FN.",
   true,
   "Sem chave composta não há como existir dependência parcial."
  ],
  [
   "CPF → Nome é uma dependência funcional válida.",
   true,
   "Cada CPF corresponde a um único nome."
  ],
  [
   "Nome → CPF é uma dependência funcional válida.",
   false,
   "Pode haver homônimos com CPFs diferentes."
  ],
  [
   "{CodPedido, CodProduto} → NomeProduto é dependência parcial.",
   true,
   "NomeProduto depende só de CodProduto."
  ],
  [
   "Matrícula → CodDepto → NomeDepto caracteriza dependência transitiva.",
   true,
   "NomeDepto depende de Matrícula por meio de CodDepto."
  ],
  [
   "A 3FN elimina dependências parciais.",
   false,
   "Quem elimina as parciais é a 2FN; a 3FN elimina as transitivas."
  ],
  [
   "Toda relação na FNBC também está na 3FN.",
   true,
   "A FNBC é mais restritiva que a 3FN."
  ],
  [
   "Normalizar costuma aumentar o número de tabelas.",
   true,
   "A decomposição separa os dados em tabelas menores e mais coesas."
  ],
  [
   "A 4FN trata dependências multivaloradas.",
   true,
   "Ela exige FNBC e ausência de dependências multivaloradas independentes."
  ],
  [
   "Pela regra da decomposição, se X → YZ então X → Y e X → Z.",
   true,
   "É uma regra derivada de Armstrong."
  ],
  [
   "Normalização é aplicada no projeto físico.",
   false,
   "Faz parte do projeto lógico."
  ]
 ],
 "caderno": [
  [
   "Explique as 3 anomalias usando a tabela FUNC(Matricula, Nome, CodDepto, NomeDepto).",
   "Inserção: não dá para cadastrar departamento sem funcionário. Exclusão: apagar o último funcionário apaga o departamento. Atualização: renomear o departamento exige mudar várias linhas."
  ],
  [
   "Leve à 1FN: ALUNO(RA, Nome, Telefones).",
   "ALUNO(RA, Nome) e TELEFONE_ALUNO(RA, Telefone), PK (RA, Telefone)."
  ],
  [
   "Identifique as DFs de ITEM(CodPedido, CodProduto, Qtd, NomeProduto, Preco).",
   "{CodPedido, CodProduto} → Qtd; CodProduto → NomeProduto, Preco."
  ],
  [
   "Leve a tabela ITEM do exercício anterior à 2FN.",
   "ITEM(CodPedido, CodProduto, Qtd) e PRODUTO(CodProduto, NomeProduto, Preco)."
  ],
  [
   "Leve à 3FN: FUNC(Matricula, Nome, CodDepto, NomeDepto, SalarioDepto).",
   "FUNC(Matricula, Nome, CodDepto) e DEPTO(CodDepto, NomeDepto, SalarioDepto)."
  ],
  [
   "Normalize até a 3FN: NOTA_FISCAL(Num, Data, CPF, NomeCliente, CodProd, Descricao, Qtd, PrecoUnit).",
   "NF(Num, Data, CPF); CLIENTE(CPF, NomeCliente); PRODUTO(CodProd, Descricao, PrecoUnit); ITEM_NF(Num, CodProd, Qtd)."
  ],
  [
   "Escreva as 6 regras de Armstrong (3 básicas e 3 derivadas).",
   "Reflexividade, aumento, transitividade; decomposição, união, pseudotransitividade."
  ],
  [
   "Monte o quadro resumo 1FN, 2FN, 3FN, FNBC com o que cada uma elimina.",
   "1FN: multivalorados/compostos. 2FN: DF parciais. 3FN: DF transitivas. FNBC: DF com determinante que não é superchave."
  ],
  [
   "Por que Preço de um item de pedido às vezes fica no ITEM, e não só no PRODUTO?",
   "Para registrar o preço praticado na data da venda, que é um fato histórico diferente do preço atual."
  ],
  [
   "Dê um caso em que desnormalizar pode ser aceitável.",
   "Relatórios de leitura intensa ou Data Warehouse, guardando um total calculado para evitar JOINs pesados."
  ]
 ],
 "pbl": [
  {
   "titulo": "A planilha da videolocadora",
   "cenario": "Uma locadora antiga guardava tudo em LOCACAO(NumLoc, Data, CPF, NomeCli, FoneCli, CodFilme, Titulo, Genero, Diaria). Clientes reclamam de telefones desatualizados.",
   "passos": [
    [
     "Quais anomalias essa tabela provoca?",
     "Atualização (telefone repetido em cada locação), inserção (filme sem locação não entra) e exclusão (apagar locações apaga filmes e clientes)."
    ],
    [
     "Quais são as dependências funcionais?",
     "NumLoc → Data, CPF; CPF → NomeCli, FoneCli; CodFilme → Titulo, Genero, Diaria; {NumLoc, CodFilme} → (item)."
    ],
    [
     "Qual o esquema final em 3FN?",
     "CLIENTE(CPF, Nome, Fone); FILME(CodFilme, Titulo, Genero, Diaria); LOCACAO(NumLoc, Data, CPF); ITEM_LOCACAO(NumLoc, CodFilme)."
    ]
   ]
  },
  {
   "titulo": "Diário de classe em uma tabela",
   "cenario": "O diário digital usa DIARIO(RA, NomeAluno, CodDisc, NomeDisc, Professor, Nota). Cada disciplina tem um professor.",
   "passos": [
    [
     "Qual a chave primária e que dependências parciais existem?",
     "PK (RA, CodDisc). Parciais: RA → NomeAluno; CodDisc → NomeDisc, Professor."
    ],
    [
     "Como fica em 2FN?",
     "ALUNO(RA, NomeAluno); DISCIPLINA(CodDisc, NomeDisc, Professor); NOTA(RA, CodDisc, Nota)."
    ],
    [
     "Se o professor tiver email e sala, o que muda para a 3FN?",
     "Criar PROFESSOR(CodProf, Nome, Email, Sala) e deixar só CodProf em DISCIPLINA, eliminando a dependência transitiva."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Normalização",
   "itens": [
    "Anomalias de inserção, exclusão e atualização.",
    "1FN atômico; 2FN sem parcial; 3FN sem transitiva.",
    "Junções reconstroem a informação."
   ]
  }
 ],
 "glossario": [
  [
   "FNBC",
   "Forma normal de Boyce-Codd."
  ],
  [
   "Armstrong",
   "Regras para deduzir dependências."
  ]
 ]
});
