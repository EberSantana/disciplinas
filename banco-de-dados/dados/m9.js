FSI.modulo({
 "n": 9,
 "unidade": "Aprofundamento",
 "nome": "Data Warehouse e OLAP",
 "titulo": "Do caixa ao painel: data warehouse, OLAP e mineração",
 "duracao": "4 h",
 "resumoCurto": "Sistemas analíticos, ETL, modelo dimensional e descoberta de padrões",
 "analogia": {
  "titulo": "O caixa e o gerente",
  "txt": "<p>O <b>caixa</b> do supermercado registra uma venda por vez, rápido e sem erro: isso é <b>OLTP</b>. O <b>gerente</b>, no fim do mês, quer saber quanto cada loja vendeu por categoria e por trimestre: isso é <b>OLAP</b>, feito num <b>data warehouse</b> que junta e organiza o histórico.</p>"
 },
 "chave": [
  "OLTP processa transações do dia a dia; OLAP analisa históricos para decisão.",
  "DW (Inmon): orientado por assunto, integrado, não volátil, variante no tempo.",
  "ETL: extrair, transformar (limpar, padronizar) e carregar (full ou incremental).",
  "Estrela: fato central + dimensões desnormalizadas. Floco de neve: dimensões normalizadas.",
  "OLAP: drill-down, roll-up, slice, dice, pivot. Em SQL: ROLLUP, CUBE, GROUPING SETS.",
  "Mineração: classificação, clustering, associação, regressão, anomalias, séries temporais."
 ],
 "objetivos": [
  "Diferenciar <b>OLTP e OLAP</b>.",
  "Descrever o <b>ETL</b> e o <b>modelo estrela</b>.",
  "Fazer consultas analíticas com <b>GROUP BY</b>."
 ],
 "licoes": [
  {
   "t": "DW e ETL",
   "txt": "<p>O data warehouse é orientado por assunto, integrado, não volátil e variante no tempo. O <b>ETL</b> extrai dos sistemas, transforma (limpa e padroniza) e carrega no DW.</p>"
  },
  {
   "t": "Modelo estrela e OLAP",
   "txt": "<p>Uma tabela <b>fato</b> (vendas: quantidade, valor) no centro e <b>dimensões</b> (produto, tempo, loja) em volta. Operações OLAP: <b>drill-down</b> (detalhar), <b>roll-up</b> (resumir), <b>slice</b> (fatiar), <b>dice</b> e <b>pivot</b>.</p>"
  }
 ],
 "termos": [
  [
   "OLTP",
   "Transações do dia a dia."
  ],
  [
   "OLAP",
   "Análise do histórico."
  ],
  [
   "Fato",
   "Medidas do negócio."
  ],
  [
   "Dimensão",
   "Contexto: quando, onde, o quê."
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
   "id": "jogo-ol",
   "titulo": "Jogo: OLTP ou OLAP?",
   "cats": [
    "OLTP",
    "OLAP"
   ],
   "itens": [
    [
     "Registrar uma venda no caixa",
     0
    ],
    [
     "Emitir a nota fiscal",
     0
    ],
    [
     "Total vendido por loja no trimestre",
     1
    ],
    [
     "Comparar vendas de 2025 e 2026",
     1
    ],
    [
     "Dar baixa no estoque de um item",
     0
    ],
    [
     "Painel de faturamento por categoria",
     1
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Um pequeno DW em estrela de uma rede de lojas. Responda às perguntas do gerente com SQL.",
  "sims": [
   {
    "tipo": "sql",
    "titulo": "Console SQL: o painel do gerente",
    "cfg": {
     "id": "q9",
     "setup": "CREATE TABLE dim_produto (id INTEGER PRIMARY KEY, nome TEXT, categoria TEXT);\nCREATE TABLE dim_tempo (id INTEGER PRIMARY KEY, data TEXT, mes INTEGER, trimestre INTEGER);\nCREATE TABLE dim_loja (id INTEGER PRIMARY KEY, cidade TEXT);\nCREATE TABLE fato_venda (produto_id INTEGER, tempo_id INTEGER, loja_id INTEGER, qtd INTEGER, valor REAL);\nINSERT INTO dim_produto VALUES (1,'Notebook','Informática'),(2,'Mouse','Informática'),(3,'Geladeira','Eletrodomésticos'),(4,'Liquidificador','Eletrodomésticos');\nINSERT INTO dim_tempo VALUES (1,'2026-01-15',1,1),(2,'2026-02-10',2,1),(3,'2026-04-05',4,2),(4,'2026-05-20',5,2);\nINSERT INTO dim_loja VALUES (1,'Tobias Barreto'),(2,'Lagarto'),(3,'Aracaju');\nINSERT INTO fato_venda VALUES (1,1,1,2,7000),(2,1,1,10,500),(3,2,2,1,3500),(1,3,3,3,10500),(4,3,1,4,800),(2,4,3,15,750),(3,4,3,2,7000),(1,4,2,1,3500),(4,2,2,6,1200);",
     "inicial": "SELECT * FROM fato_venda;",
     "desafios": [
      {
       "p": "Faturamento total (soma do valor) <b>por cidade</b> da loja.",
       "ref": "SELECT dim_loja.cidade, SUM(fato_venda.valor) FROM fato_venda JOIN dim_loja ON fato_venda.loja_id = dim_loja.id GROUP BY dim_loja.cidade;",
       "dica": "JOIN dim_loja + GROUP BY cidade",
       "expl": "Roll-up por loja."
      },
      {
       "p": "Faturamento <b>por categoria</b> de produto.",
       "ref": "SELECT dim_produto.categoria, SUM(fato_venda.valor) FROM fato_venda JOIN dim_produto ON fato_venda.produto_id = dim_produto.id GROUP BY dim_produto.categoria;",
       "dica": "JOIN dim_produto + GROUP BY categoria",
       "expl": "Outra dimensão, mesma ideia."
      },
      {
       "p": "Faturamento <b>por trimestre</b>.",
       "ref": "SELECT dim_tempo.trimestre, SUM(fato_venda.valor) FROM fato_venda JOIN dim_tempo ON fato_venda.tempo_id = dim_tempo.id GROUP BY dim_tempo.trimestre;",
       "dica": "JOIN dim_tempo + GROUP BY trimestre",
       "expl": "Roll-up no tempo."
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Agrupe e some valores",
    "ev": "q9:agregou"
   },
   {
    "id": "m2",
    "t": "Responda às 3 perguntas do gerente",
    "ev": "q9:todos"
   },
   {
    "id": "m3",
    "t": "Classifique OLTP × OLAP",
    "ev": "vis:jogo-ol"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "Diferença entre OLTP e OLAP?",
   "OLTP: transações operacionais rápidas. OLAP: análise multidimensional de dados históricos."
  ],
  [
   "Quais as 4 características de um DW segundo Inmon?",
   "Orientado por assunto, integrado, não volátil e variante no tempo."
  ],
  [
   "O que significa ETL?",
   "Extract, Transform, Load: extrair, transformar e carregar."
  ],
  [
   "O que fica na tabela de fatos?",
   "Medidas numéricas (quantidade, valor, lucro) e FKs para as dimensões."
  ],
  [
   "O que fica nas tabelas de dimensão?",
   "Atributos descritivos para filtrar e agrupar (produto, loja, tempo, cliente)."
  ],
  [
   "Estrela x floco de neve?",
   "Estrela: dimensões desnormalizadas. Floco: dimensões normalizadas em subdimensões, com mais JOINs."
  ],
  [
   "O que é drill-down?",
   "Ir do resumo para o detalhe (ano → mês → dia)."
  ],
  [
   "O que é roll-up?",
   "Ir do detalhe para o resumo (dia → mês → ano)."
  ],
  [
   "O que é slice?",
   "Fixar uma dimensão em um valor (ex.: só março)."
  ],
  [
   "O que é dice?",
   "Selecionar um subcubo com filtros em várias dimensões."
  ],
  [
   "O que é clustering?",
   "Agrupar dados semelhantes sem categorias predefinidas (ex.: K-Means)."
  ],
  [
   "O que são regras de associação?",
   "Padrões de co-ocorrência, como \"quem compra X também compra Y\" (Apriori)."
  ]
 ],
 "vf": [
  [
   "Os dados de um DW são alterados a cada venda do dia.",
   false,
   "O DW é não volátil: recebe cargas periódicas e é consultado, não editado."
  ],
  [
   "Um DW guarda histórico para análise de tendências.",
   true,
   "É a característica variante no tempo."
  ],
  [
   "A etapa Transform do ETL remove duplicatas e padroniza formatos.",
   true,
   "É a limpeza e padronização antes da carga."
  ],
  [
   "Carga incremental recarrega todo o DW do zero.",
   false,
   "Incremental carrega só dados novos ou alterados; do zero é full load."
  ],
  [
   "No esquema estrela, as dimensões costumam ser desnormalizadas.",
   true,
   "Isso reduz JOINs nas consultas analíticas."
  ],
  [
   "Pivot gira os eixos do cubo para uma nova perspectiva.",
   true,
   "Ex.: trocar produtos das linhas para as colunas."
  ],
  [
   "GROUP BY ROLLUP(Regiao, Cidade) gera subtotais por região e total geral.",
   true,
   "Gera (Regiao, Cidade), (Regiao) e ()."
  ],
  [
   "CUBE gera menos combinações que ROLLUP.",
   false,
   "CUBE gera todas as combinações; ROLLUP só a hierarquia."
  ],
  [
   "Classificar clientes como bons ou maus pagadores é tarefa de classificação.",
   true,
   "Categorias predefinidas caracterizam classificação."
  ],
  [
   "Detectar fraudes em cartão é um uso de detecção de anomalias.",
   true,
   "Busca transações muito diferentes do padrão."
  ],
  [
   "Regressão prevê categorias, como sim ou não.",
   false,
   "Regressão prevê valores numéricos contínuos, como faturamento."
  ],
  [
   "Bancos OLTP normalmente são normalizados, e o DW usa modelagem dimensional.",
   true,
   "Cada um é otimizado para seu tipo de uso."
  ]
 ],
 "caderno": [
  [
   "Monte um quadro comparando OLTP e OLAP em 4 aspectos.",
   "Objetivo (operação x análise), dados (atuais x históricos), operações (INSERT/UPDATE x SELECT agregados), modelagem (normalizada x dimensional)."
  ],
  [
   "Explique cada característica de Inmon com um exemplo.",
   "Assunto: vendas. Integrado: \"SE\" e \"Sergipe\" viram um só. Não volátil: não se edita a venda carregada. Tempo: vendas de 5 anos."
  ],
  [
   "Desenhe um esquema estrela para vendas da cantina do campus.",
   "FATO_VENDA(SK_Produto, SK_Tempo, SK_Turno, Qtd, Valor) + DIM_PRODUTO, DIM_TEMPO, DIM_TURNO."
  ],
  [
   "Transforme DIM_PRODUTO(Nome, Categoria, Departamento) em floco de neve.",
   "DIM_PRODUTO(SK, Nome, SK_Categoria) → DIM_CATEGORIA(SK, Nome, SK_Depto) → DIM_DEPARTAMENTO(SK, Nome)."
  ],
  [
   "Dê um exemplo de cada operação OLAP com as vendas da cantina.",
   "Drill-down: mês → dia; roll-up: dia → mês; slice: só turno noite; dice: jan-mar, noite, salgados; pivot: produtos nas colunas."
  ],
  [
   "Escreva uma consulta com ROLLUP para total por Curso e Turma.",
   "<code>SELECT Curso, Turma, SUM(Valor) FROM VENDAS GROUP BY ROLLUP (Curso, Turma);</code>"
  ],
  [
   "Liste 4 transformações típicas do ETL.",
   "Remover duplicatas, tratar nulos, padronizar datas e moedas, criar atributos derivados, consolidar fontes."
  ],
  [
   "Associe técnica e exemplo: previsão de matrículas, segmentar alunos, cesta de compras.",
   "Previsão: regressão/séries temporais. Segmentar: clustering. Cesta: regras de associação."
  ],
  [
   "Por que o DW usa chaves substitutas (SK)?",
   "Para não depender das chaves dos sistemas de origem e permitir guardar o histórico de mudanças nas dimensões."
  ],
  [
   "Cite 3 fontes de dados que um ETL pode extrair.",
   "Bancos relacionais, planilhas, arquivos CSV, APIs, logs, sistemas legados."
  ]
 ],
 "pbl": [
  {
   "titulo": "Mini DW da cantina",
   "cenario": "A cantina do campus quer saber quais produtos vendem mais por turno e mês. Hoje há um sistema de caixa (OLTP) e uma planilha de estoque.",
   "passos": [
    [
     "Qual o fato e quais as medidas?",
     "Fato VENDA; medidas: quantidade, valor total e lucro."
    ],
    [
     "Quais dimensões criar?",
     "DIM_PRODUTO, DIM_TEMPO (data, mês, semestre), DIM_TURNO e, se houver, DIM_CLIENTE (tipo: aluno/servidor)."
    ],
    [
     "Como seria o ETL?",
     "Extrair do caixa e da planilha, padronizar nomes e datas, calcular lucro e carregar incrementalmente toda noite."
    ]
   ]
  },
  {
   "titulo": "Evasão escolar",
   "cenario": "A coordenação quer identificar cedo alunos com risco de evasão usando dados de frequência, notas e transporte.",
   "passos": [
    [
     "Que técnica de mineração é a principal?",
     "Classificação (risco alto x baixo), treinada com dados históricos de quem evadiu."
    ],
    [
     "Que técnica ajudaria a descobrir perfis de alunos?",
     "Clustering, agrupando alunos por comportamento semelhante."
    ],
    [
     "Que cuidado com dados pessoais é necessário?",
     "Respeitar a LGPD: finalidade clara, acesso restrito, anonimização em análises e segurança dos dados."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Analítico",
   "itens": [
    "OLTP × OLAP.",
    "ETL; estrela e floco de neve.",
    "Drill-down, roll-up, slice, dice, pivot."
   ]
  }
 ],
 "glossario": [
  [
   "ETL",
   "Extract, Transform, Load."
  ],
  [
   "Mineração",
   "Descoberta de padrões."
  ]
 ]
});
