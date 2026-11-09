FSI.modulo({
 "n": 8,
 "unidade": "Unidade 3",
 "nome": "Planilhas (Calc e Excel)",
 "titulo": "Células, fórmulas, funções e gráficos",
 "duracao": "8 h",
 "resumoCurto": "Células, fórmulas, gráficos e o controle dos seus gastos. Endereços, formatos, fórmulas, SOMA, MÉDIA, SE e gráficos.",
 "analogia": {
  "titulo": "O caderno quadriculado mágico",
  "txt": "<p>Uma planilha é um caderno quadriculado em que cada quadradinho tem endereço — coluna e linha, como B3 — e pode fazer contas sozinho. Mude um número e todos os totais se atualizam. No <b>LibreOffice Calc</b> e no Excel em português as funções têm nomes em português: <code>=SOMA(B2:B5)</code>, <code>=MÉDIA(...)</code>, <code>=SE(...)</code>, com ponto e vírgula entre os argumentos.</p>"
 },
 "chave": [
  "Célula = coluna + linha (B3).",
  "Fórmulas começam com <b>=</b>.",
  "Intervalo B2:B5 = de B2 até B5.",
  "SOMA, MÉDIA, MÁXIMO, MÍNIMO, SE.",
  "Formato muda a aparência, não o valor.",
  "Gráficos transformam números em imagem."
 ],
 "objetivos": [
  "Usar <b>endereços e intervalos</b>.",
  "Escrever <b>fórmulas e funções</b>.",
  "Decidir com <b>SE</b>.",
  "Criar <b>gráficos</b>."
 ],
 "licoes": [
  {
   "t": "Conheça a tela inicial do Excel",
   "txt": "<p>Colunas são identificadas por letras, linhas por números. A célula é o encontro de linha e coluna (B3 = coluna B + linha 3). A Barra de fórmulas mostra ou edita o conteúdo. As abas da planilha organizam páginas diferentes.</p><p><b>Dica:</b> A borda verde mostra qual célula está selecionada.</p>",
   "pense": "pratique — Abra o Excel, clique nas células A1, B3 e D5 e observe o endereço de cada uma."
  },
  {
   "t": "Preencha a planilha com rapidez",
   "txt": "<p>Digite e pressione Enter para descer ou Tab para ir à direita. Arraste a alça de preenchimento (quadradinho no canto) para completar sequências como datas e meses.</p><p><b>Dica:</b> Digite os dois primeiros itens da sequência antes de arrastar.</p>",
   "pense": "pratique — Digite Janeiro e Fevereiro, selecione os dois e arraste até Junho."
  },
  {
   "t": "Mostre cada número do jeito certo",
   "txt": "<p>O formato muda a aparência do valor sem alterar o que foi digitado: Geral, Moeda (R$ 1.500,00), Porcentagem (25%), Data (15/09/2026). Aumentar/diminuir casas decimais ajusta a exibição.</p><p><b>Dica:</b> Digite 0,25 e aplique Porcentagem para ver 25%.</p>",
   "pense": "pratique — Digite 1500, 0,25 e 15/09/2026 e aplique o formato correto em cada célula."
  },
  {
   "t": "Faça cálculos direto nas células",
   "txt": "<p>Toda conta começa com o sinal de igual. Operadores: + soma, - subtração, * multiplicação, / divisão. Use endereços: =A1+B1. Se A1 ou B1 mudar, o resultado se atualiza.</p><p><b>Dica:</b> Use o endereço da célula em vez de digitar o número novamente.</p>",
   "pense": "pratique — Digite 20 em A1 e 4 em B1 e faça as quatro operações."
  },
  {
   "t": "Quatro fórmulas que resolvem o básico",
   "txt": "<p>=SOMA(B2:B5), =MÉDIA(B2:B5), =MÍNIMO(B2:B5), =MÁXIMO(B2:B5). B2:B5 significa todas as células de B2 até B5.</p><p><b>Dica:</b> Fórmulas usam parênteses para indicar quais células serão calculadas.</p>",
   "pense": "pratique — Digite cinco valores e descubra soma, média, menor e maior."
  },
  {
   "t": "Faça o Excel responder por você",
   "txt": "<p>=SE(B2>=7;\"APROVADO\";\"REPROVADO\"): teste lógico; resultado se verdadeiro; resultado se falso.</p><p><b>Dica:</b> Textos dentro de fórmulas precisam ficar entre aspas.</p>",
   "pense": "pratique — Digite três notas e use SE para mostrar APROVADO ou REPROVADO."
  },
  {
   "t": "Encontre qualquer informação em segundos",
   "txt": "<p>Classificar organiza do menor para o maior ou em ordem alfabética. Filtrar mostra apenas os dados que atendem ao critério escolhido. Ambos ficam na guia Dados.</p><p><b>Dica:</b> Filtrar não exclui dados: os demais apenas ficam ocultos.</p>",
   "pense": "pratique — Crie uma lista com cinco produtos e filtre apenas uma categoria."
  },
  {
   "t": "Transforme dados em uma tabela inteligente",
   "txt": "<p>Selecione os dados e use Formatar como Tabela. A tabela ganha filtros nos títulos, linhas alternadas e se expande automaticamente quando você adiciona novas linhas.</p><p><b>Dica:</b> Use nomes únicos e claros em cada cabeçalho.</p>",
   "pense": "pratique — Transforme uma lista de gastos em tabela e escolha um estilo."
  },
  {
   "t": "Transforme números em um gráfico",
   "txt": "<p>Selecione os dados, Inserir > Gráfico de Colunas. Colunas comparam categorias, Linhas mostram mudança no tempo, Pizza mostra partes de um total.</p><p><b>Dica:</b> Um gráfico simples costuma comunicar melhor do que um gráfico cheio de efeitos.</p>",
   "pense": "pratique — Crie um gráfico com seus gastos de quatro semanas."
  },
  {
   "t": "Projeto prático: controle seus gastos",
   "txt": "<p>Monte uma planilha com Data, Descrição, Categoria, Entrada e Saída. Use =SOMA para totais e =Entradas−Saídas para o saldo. Formate como moeda e crie um gráfico comparando entradas e saídas.</p><p><b>Dica:</b> Destaque o saldo para encontrá-lo rápido.</p>",
   "pense": "pratique — Monte o controle do mês de setembro e crie o gráfico."
  }
 ],
 "termos": [
  [
   "Célula",
   "Encontro de linha e coluna."
  ],
  [
   "Fórmula",
   "Começa com =."
  ],
  [
   "Intervalo",
   "B2:B5."
  ],
  [
   "SE",
   "Decide entre dois resultados."
  ]
 ],
 "ler": [
  [
   "Trilha Windows 11",
   "trilha-windows-11.html"
  ],
  [
   "Método Office Visual",
   "metodo-office-visual.html"
  ],
  [
   "Apostila Informática do Zero",
   "apostila.html"
  ],
  [
   "Ambiente interativo (11 módulos)",
   "ambiente-interativo.html"
  ]
 ],
 "visuais": [],
 "lab": {
  "intro": "Uma planilha de verdade: o boletim da turma. Escreva as fórmulas na barra de fórmulas e cumpra os desafios.",
  "sims": [
   {
    "tipo": "planilha",
    "titulo": "Boletim da turma",
    "cfg": {
     "id": "pl",
     "colunas": 5,
     "linhas": 8,
     "dados": [
      [
       "Aluno",
       "Nota 1",
       "Nota 2",
       "Média",
       "Situação"
      ],
      [
       "Ana",
       "8",
       "7",
       "",
       ""
      ],
      [
       "Bruno",
       "5",
       "6",
       "",
       ""
      ],
      [
       "Carla",
       "9",
       "10",
       "",
       ""
      ],
      [
       "Davi",
       "4",
       "5,5",
       "",
       ""
      ]
     ],
     "desafios": [
      {
       "p": "Em <b>D2</b>, calcule a média de Ana: <code>=(B2+C2)/2</code> ou <code>=MÉDIA(B2:C2)</code>.",
       "cel": "D2",
       "valor": 7.5,
       "dica": "Clique em D2, digite na barra e Enter."
      },
      {
       "p": "Em <b>D3</b>, a média de Bruno usando a função <b>MÉDIA</b>.",
       "cel": "D3",
       "valor": 5.5,
       "func": "MEDIA",
       "dica": "=MÉDIA(B3:C3)"
      },
      {
       "p": "Em <b>D4</b> e <b>D5</b> faça o mesmo; depois, em <b>B6</b>, a <b>soma</b> das notas 1 (B2 a B5).",
       "cel": "B6",
       "valor": 26,
       "func": "SOMA",
       "dica": "=SOMA(B2:B5)"
      },
      {
       "p": "Em <b>B7</b>, a <b>maior</b> nota 1 da turma.",
       "cel": "B7",
       "valor": 9,
       "func": "MAXIMO",
       "dica": "=MÁXIMO(B2:B5)"
      },
      {
       "p": "Em <b>E2</b>, use <b>SE</b>: “Aprovado” se D2 ≥ 6, senão “Recuperação”.",
       "cel": "E2",
       "valor": "Aprovado",
       "func": "SE",
       "dica": "=SE(D2>=6;\"Aprovado\";\"Recuperação\")"
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Escreva sua primeira fórmula",
    "ev": "pl:formula"
   },
   {
    "id": "m2",
    "t": "Use uma referência de célula",
    "ev": "pl:ref"
   },
   {
    "id": "m3",
    "t": "Use a função SOMA",
    "ev": "pl:soma"
   },
   {
    "id": "m4",
    "t": "Use a função SE",
    "ev": "pl:se"
   },
   {
    "id": "m5",
    "t": "Cumpra os 5 desafios do boletim",
    "ev": "pl:todos"
   }
  ],
  "guiados": [
   {
    "titulo": "Antes de digitar, calcule",
    "txt": "<p>Notas de Davi: 4 e 5,5.</p>",
    "passos": [
     {
      "p": "Qual a média de Davi? (uma casa decimal)",
      "r": 4.8,
      "tol": 0.06,
      "dica": "(4 + 5,5) ÷ 2 = 4,75.",
      "expl": "4,75 — a planilha mostra 4,75; com uma casa, 4,8."
     },
     {
      "p": "Quantos alunos da tabela ficariam em recuperação (média menor que 6)?",
      "r": 2,
      "un": "alunos",
      "dica": "Calcule as quatro médias: 7,5; 5,5; 9,5; 4,75.",
      "expl": "Bruno e Davi: 2 alunos."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma célula?",
   "O encontro de uma coluna com uma linha, ex.: B3."
  ],
  [
   "Com que sinal toda fórmula começa?",
   "Com o sinal de igual (=)."
  ],
  [
   "O que significa B2:B5?",
   "Todas as células de B2 até B5."
  ],
  [
   "Operador de multiplicação no Excel?",
   "Asterisco (*)."
  ],
  [
   "Para que serve a alça de preenchimento?",
   "Para arrastar e completar sequências ou copiar fórmulas."
  ],
  [
   "Formatar 0,25 como Porcentagem mostra…",
   "25%."
  ],
  [
   "Filtrar exclui os dados que não aparecem?",
   "Não. Eles apenas ficam ocultos."
  ],
  [
   "Gráfico ideal para partes de um total?",
   "Pizza."
  ],
  [
   "Na fórmula SE, onde vão os textos?",
   "Entre aspas: \"APROVADO\"."
  ],
  [
   "Vantagem de Formatar como Tabela?",
   "Filtros automáticos, linhas alternadas e expansão automática."
  ]
 ],
 "vf": [
  [
   "No Excel, as linhas são identificadas por letras.",
   false,
   "Colunas usam letras; linhas usam números."
  ],
  [
   "Tab leva para a célula à direita e Enter para a célula abaixo.",
   true,
   "É o fluxo padrão de digitação."
  ],
  [
   "Aplicar o formato Moeda altera o valor armazenado na célula.",
   false,
   "O formato muda só a aparência; o valor continua o mesmo."
  ],
  [
   "A fórmula =A1+B1 se atualiza sozinha quando A1 muda.",
   true,
   "Por usar referências, o Excel recalcula automaticamente."
  ],
  [
   "=MÉDIA(B2:B5) soma os valores e divide pela quantidade de células com números.",
   true,
   "Esse é o conceito de média aritmética."
  ],
  [
   "Na fórmula SE, os textos podem ser escritos sem aspas.",
   false,
   "Sem aspas, o Excel interpreta o texto como nome e mostra erro #NOME?."
  ],
  [
   "Classificar pode colocar uma lista em ordem alfabética.",
   true,
   "Classificar de A a Z ordena textos alfabeticamente."
  ],
  [
   "Ao usar filtro, os dados ocultos são apagados da planilha.",
   false,
   "O filtro só oculta; ao limpar o filtro, tudo volta."
  ],
  [
   "Gráfico de linhas é indicado para mostrar evolução ao longo do tempo.",
   true,
   "Linhas destacam tendências entre períodos."
  ],
  [
   "Uma tabela formatada se expande ao digitar logo abaixo dela.",
   true,
   "É uma das vantagens da tabela inteligente."
  ],
  [
   "Digitar 10+5 numa célula, sem o sinal de igual, mostra 15.",
   false,
   "Sem =, o Excel trata como texto e mostra “10+5”."
  ],
  [
   "No controle de gastos, o saldo é calculado por Entradas − Saídas.",
   true,
   "É a diferença entre o que entrou e o que saiu."
  ]
 ],
 "caderno": [
  [
   "Desenhe uma grade de 4 colunas (A–D) e 5 linhas. Marque com X as células B3 e D5. Explique como se forma o endereço de uma célula.",
   "Endereço = letra da coluna + número da linha. B3 fica na coluna B, linha 3; D5 na coluna D, linha 5."
  ],
  [
   "Escreva as fórmulas para: somar A1 e B1; subtrair B1 de A1; multiplicar; dividir A1 por B1. Calcule os resultados com A1=20 e B1=4.",
   "=A1+B1 → 24; =A1-B1 → 16; =A1*B1 → 80; =A1/B1 → 5."
  ],
  [
   "Com as notas 6, 8, 5, 9 em B2:B5, calcule à mão SOMA, MÉDIA, MÍNIMO e MÁXIMO e escreva a fórmula de cada uma.",
   "=SOMA(B2:B5)=28; =MÉDIA(B2:B5)=7; =MÍNIMO(B2:B5)=5; =MÁXIMO(B2:B5)=9."
  ],
  [
   "Escreva a fórmula SE que mostra \"APROVADO\" para nota maior ou igual a 7 em B2. Separe e nomeie as três partes da fórmula.",
   "=SE(B2>=7;\"APROVADO\";\"REPROVADO\"). Parte 1: teste lógico B2>=7. Parte 2: valor se verdadeiro. Parte 3: valor se falso."
  ],
  [
   "Explique a diferença entre Classificar e Filtrar com um exemplo de uma lista de alunos.",
   "Classificar reordena todos (ex.: alunos em ordem alfabética). Filtrar exibe só quem atende ao critério (ex.: só a turma A), ocultando os demais sem excluí-los."
  ],
  [
   "Para cada situação, indique o gráfico ideal: (a) vendas por produto; (b) temperatura ao longo do mês; (c) divisão do orçamento familiar.",
   "(a) Colunas – comparar categorias; (b) Linhas – mudança no tempo; (c) Pizza – partes de um total."
  ],
  [
   "O endereço da célula na coluna C e linha 7 é:<ol type=\"a\"><li>7C</li><li>C7</li><li>C:7</li><li>L7C3</li></ol>",
   "<b>b) C7.</b> Primeiro a letra da coluna, depois o número da linha."
  ],
  [
   "Qual fórmula soma de A1 até A10?<ol type=\"a\"><li>=SOMA(A1;A10)</li><li>=SOMA(A1:A10)</li><li>SOMA A1-A10</li><li>=A1+A10</li></ol>",
   "<b>b) =SOMA(A1:A10).</b> Os dois-pontos indicam o intervalo inteiro; o ponto e vírgula somaria só as duas células."
  ],
  [
   "Para descobrir a menor nota de uma turma:<ol type=\"a\"><li>=MÁXIMO()</li><li>=MÍNIMO()</li><li>=MÉDIA()</li><li>=SE()</li></ol>",
   "<b>b) =MÍNIMO().</b> MÍNIMO retorna o menor valor do intervalo."
  ],
  [
   "=SE(B2>=7;\"APROVADO\";\"REPROVADO\") com B2 = 6,5 retorna:<ol type=\"a\"><li>APROVADO</li><li>REPROVADO</li><li>6,5</li><li>#VALOR!</li></ol>",
   "<b>b) REPROVADO.</b> 6,5 não é maior ou igual a 7, então retorna o valor falso."
  ],
  [
   "Você quer ver apenas os gastos da categoria Transporte. Use:<ol type=\"a\"><li>Classificar</li><li>Filtrar</li><li>Mesclar</li><li>Congelar</li></ol>",
   "<b>b) Filtrar.</b> Filtrar exibe só as linhas que atendem ao critério."
  ],
  [
   "Qual formato mostra 15/09/2026 corretamente?<ol type=\"a\"><li>Moeda</li><li>Data</li><li>Porcentagem</li><li>Texto científico</li></ol>",
   "<b>b) Data.</b> O formato Data exibe dia/mês/ano."
  ],
  [
   "Para comparar vendas de 4 produtos, o gráfico mais indicado é:<ol type=\"a\"><li>Pizza</li><li>Colunas</li><li>Dispersão</li><li>Nenhum</li></ol>",
   "<b>b) Colunas.</b> Colunas comparam categorias lado a lado."
  ],
  [
   "O que faz a alça de preenchimento com “Jan” e “Fev” selecionados?<ol type=\"a\"><li>Apaga</li><li>Continua Mar, Abr...</li><li>Copia Jan sempre</li><li>Cria gráfico</li></ol>",
   "<b>b) Continua Mar, Abr....</b> O Excel reconhece o padrão e continua a sequência."
  ],
  [
   "Qual operador faz divisão?<ol type=\"a\"><li>\\</li><li>÷</li><li>/</li><li>%</li></ol>",
   "<b>c) /.</b> A barra / é o operador de divisão."
  ],
  [
   "No controle de gastos, a célula mais importante a destacar é:<ol type=\"a\"><li>A data</li><li>O saldo</li><li>A categoria</li><li>O título da aba</li></ol>",
   "<b>b) O saldo.</b> O saldo mostra a situação final do mês."
  ]
 ],
 "pbl": [
  {
   "titulo": "Boletim da turma",
   "cenario": "<p>O professor anotou as notas de 10 alunos em papel e perde tempo calculando médias e situação de cada um no fim do bimestre.</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Que colunas a planilha precisa ter?</li><li>Quais fórmulas automatizam o trabalho?</li><li>Como mostrar visualmente quem está abaixo da média?</li></ol><p><b>Tarefas:</b></p><ul><li>Planeje no caderno as colunas (Aluno, N1, N2, Média, Situação)</li><li>Digite os dados de 10 alunos fictícios</li><li>Use =MÉDIA para cada aluno</li><li>Use =SE para APROVADO/REPROVADO</li><li>Calcule a maior e menor média da turma</li><li>Crie um gráfico de colunas das médias</li></ul><p><b>Entrega:</b> Boletim.xlsx + explicação das fórmulas no caderno</p>",
     "<p>Confira seu trabalho com os critérios de avaliação:</p><ul><li>Estrutura de colunas clara (2 pts)</li><li>MÉDIA correta (2 pts)</li><li>SE com aspas e ponto e vírgula corretos (2 pts)</li><li>MÍNIMO/MÁXIMO (2 pts)</li><li>Gráfico legível (2 pts)</li></ul>"
    ]
   ]
  },
  {
   "titulo": "Orçamento do passeio da turma",
   "cenario": "<p>A turma vai fazer um passeio e precisa controlar arrecadação (rifas, contribuições) e despesas (ônibus, lanche, ingressos).</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Quanto falta arrecadar?</li><li>Qual despesa pesa mais?</li></ol><p><b>Tarefas:</b></p><ul><li>Monte a planilha de Entradas e Saídas</li><li>Formate valores como Moeda</li><li>Calcule totais com SOMA e o saldo</li><li>Transforme em tabela e filtre por categoria</li><li>Faça um gráfico comparando entradas e saídas</li></ul><p><b>Entrega:</b> Orcamento_Passeio.xlsx</p>",
     "<p>Confira seu trabalho com os critérios de avaliação:</p><ul><li>Valores em moeda (2 pts)</li><li>Totais e saldo corretos (3 pts)</li><li>Filtro aplicado (2 pts)</li><li>Gráfico adequado (2 pts)</li><li>Conclusão escrita sobre o saldo (1 pt)</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Planilhas",
   "itens": [
    "Endereços e intervalos.",
    "= SOMA, MÉDIA, MÁXIMO, MÍNIMO, SE.",
    "Formatos e gráficos."
   ]
  }
 ],
 "glossario": [
  [
   "Alça de preenchimento",
   "Arrasta para completar sequências."
  ],
  [
   "ODS",
   "Formato do Calc."
  ]
 ]
});
