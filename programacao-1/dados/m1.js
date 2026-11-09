FSI.modulo({
 "n": 1,
 "unidade": "Unidade 1",
 "nome": "Algoritmos e o primeiro programa",
 "titulo": "Dar instruções ao computador: algoritmo, print e comentários",
 "duracao": "12 h",
 "resumoCurto": "O que é um algoritmo, como o Python executa um programa, print, texto, comentários e como ler as mensagens de erro.",
 "analogia": {
  "titulo": "A receita e o cozinheiro literal",
  "txt": "<p>Imagine um cozinheiro que obedece a receita <b>ao pé da letra</b>: se estiver escrito “adicione sal”, ele não pergunta quanto. Um <b>algoritmo</b> é essa receita: passos claros, na ordem certa, sem ambiguidade. O <b>computador</b> é o cozinheiro literal, e o <b>Python</b> é a língua em que escrevemos a receita.</p><p>Se você escrever um passo errado (ou esquecer uma aspa), o computador não adivinha: ele mostra um erro. Aprender a ler esse erro é metade da programação.</p>"
 },
 "chave": [
  "<b>Algoritmo</b>: sequência finita de passos, clara e ordenada, que resolve um problema.",
  "<b>Programa</b>: algoritmo escrito numa linguagem que o computador entende (aqui, Python).",
  "O Python executa o código <b>de cima para baixo</b>, uma linha por vez.",
  "<code>print()</code> mostra texto e valores na tela; texto vai entre <b>aspas</b>.",
  "<code>#</code> inicia um <b>comentário</b>: o Python ignora, mas as pessoas leem.",
  "Erros de <b>sintaxe</b> impedem o programa de rodar; leia a mensagem e a linha indicada.",
  "Programar é <b>testar, errar e corrigir</b> em ciclos curtos."
 ],
 "objetivos": [
  "Explicar com suas palavras o que é um <b>algoritmo</b>.",
  "Escrever e executar programas com <b>print</b> e <b>comentários</b>.",
  "Usar <b>\\n</b>, aspas e repetição de texto para montar saídas.",
  "Ler uma mensagem de erro e <b>corrigir a linha</b> indicada."
 ],
 "licoes": [
  {
   "t": "Algoritmo: pensar antes de digitar",
   "txt": "<p>Antes de programar, descreva os passos em português. Exemplo, <b>trocar uma lâmpada</b>: 1) desligar o interruptor; 2) pegar a escada; 3) retirar a lâmpada queimada; 4) rosquear a nova; 5) ligar o interruptor. Se a ordem muda (ligar antes de trocar), o resultado muda. Um bom algoritmo é <b>finito</b>, <b>ordenado</b> e <b>sem ambiguidade</b>.</p>",
   "pense": "o que acontece se o passo 5 vier antes do passo 3?"
  },
  {
   "t": "O primeiro programa",
   "txt": "<p>O comando <code>print()</code> escreve na tela. O que está entre aspas é <b>texto</b> (chamado <i>string</i>).</p><pre><code>print(\"Olá, mundo!\")\nprint(\"Meu nome é Ana\")</code></pre><p>Cada <code>print</code> termina com uma quebra de linha. Para quebrar dentro do texto, use <code>\\n</code>; para repetir, multiplique: <code>\"ab\" * 3</code> vira <code>ababab</code>.</p>"
  },
  {
   "t": "Comentários e leitura de erros",
   "txt": "<p>Tudo depois de <code>#</code> é ignorado pelo Python:</p><pre><code># Mostra uma saudação\nprint(\"Oi\")  # comentário no fim da linha</code></pre><p>Se esquecer uma aspa, o Python avisa:</p><pre><code>print(\"Oi)\n# SyntaxError: unterminated string literal (line 1)</code></pre><p>A mensagem diz o <b>tipo</b> do erro e a <b>linha</b>. Comece sempre por ela.</p>",
   "pense": "por que um comentário ajuda você mesmo daqui a um mês?"
  },
  {
   "t": "Boas práticas desde o início",
   "txt": "<p>Escreva programas pequenos e execute com frequência. Use nomes claros, comente a intenção (não o óbvio) e mantenha a indentação de 4 espaços. Os exercícios clássicos deste módulo (imprimir um padrão, as suas iniciais, uma carta) vêm da trilha pública <i>The Legend of Python</i>, do Codédex (licença MIT), reescritos aqui em português.</p>"
  }
 ],
 "termos": [
  [
   "Algoritmo",
   "Passos claros e ordenados para resolver um problema."
  ],
  [
   "String",
   "Texto entre aspas."
  ],
  [
   "Comentário",
   "Linha iniciada por # ignorada pelo Python."
  ],
  [
   "Sintaxe",
   "Regras de escrita da linguagem."
  ],
  [
   "Interpretador",
   "Programa que lê e executa o código Python."
  ]
 ],
 "ler": [
  [
   "Python (documentação oficial em português)",
   "https://docs.python.org/pt-br/3/tutorial/"
  ],
  [
   "Codédex: The Legend of Python (repositório)",
   "https://github.com/codedex-io/python-101"
  ]
 ],
 "lab": {
  "intro": "Escreva seus primeiros programas. O Python roda aqui mesmo, no navegador.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Python: print e texto",
    "instr": "Escreva o código, execute (Ctrl+Enter) e veja a saída. Os desafios são conferidos sozinhos.",
    "cfg": {
     "id": "py1",
     "inicial": "print(\"Olá, mundo!\")",
     "entrada": "",
     "desafios": [
      {
       "p": "Imprima exatamente <code>Oi, Python!</code>.",
       "ref": "print(\"Oi, Python!\")",
       "dica": "use print com o texto entre aspas.",
       "expl": "print mostra o texto na tela."
      },
      {
       "p": "Imprima duas linhas: <code>Linha 1</code> e depois <code>Linha 2</code>, com dois <code>print</code>.",
       "ref": "print(\"Linha 1\")\nprint(\"Linha 2\")",
       "exige": [
        "print[\\s\\S]*print"
       ],
       "dica": "cada print termina com uma quebra de linha.",
       "expl": "Cada print começa numa linha nova."
      },
      {
       "p": "Com <b>um único</b> <code>print</code> e <code>\\n</code>, mostre <code>A</code>, <code>B</code> e <code>C</code>, uma letra por linha.",
       "ref": "print(\"A\\nB\\nC\")",
       "exige": [
        "\\\\n"
       ],
       "dica": "\\n dentro do texto quebra a linha.",
       "expl": "\\n é a quebra de linha dentro da string."
      },
      {
       "p": "Mostre um triângulo de 4 linhas: <code>*</code>, <code>**</code>, <code>***</code>, <code>****</code>.",
       "ref": "print(\"*\")\nprint(\"**\")\nprint(\"***\")\nprint(\"****\")",
       "dica": "ou use \"*\" * 2 para repetir.",
       "expl": "Cada linha tem uma estrela a mais."
      },
      {
       "p": "Imprima a linha de 20 sinais de igual (<code>=</code>) usando <b>multiplicação</b> de texto.",
       "ref": "print(\"=\" * 20)",
       "exige": [
        "\\*\\s*20|20\\s*\\*"
       ],
       "dica": "\"=\" * 20.",
       "expl": "Texto vezes número repete o texto."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "cl1",
    "titulo": "Isto é erro de sintaxe?",
    "cats": [
     "Roda sem erro",
     "Dá erro"
    ],
    "itens": [
     [
      "print(\"Oi\")",
      0
     ],
     [
      "print(\"Oi)",
      1
     ],
     [
      "Print(\"Oi\")",
      1
     ],
     [
      "print('Oi')",
      0
     ],
     [
      "print \"Oi\"",
      1
     ],
     [
      "# print(\"Oi\")",
      0
     ],
     [
      "print(\"Oi\" \"Ana\")",
      0
     ],
     [
      "print(Oi)",
      1
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Execute seu primeiro programa",
    "ev": "py1:rodou"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de print e texto",
    "ev": "py1:todos"
   },
   {
    "id": "m3",
    "t": "Classifique os trechos sem erros",
    "ev": "vis:cl1"
   }
  ],
  "guiados": [
   {
    "titulo": "Contando saídas",
    "txt": "<p>Considere: <code>print(\"a\")</code>, <code>print(\"b\")</code>, <code>print(\"c\" * 3)</code>.</p>",
    "passos": [
     {
      "p": "Quantas linhas aparecem na tela?",
      "r": 3,
      "un": "linhas",
      "dica": "um print = uma linha.",
      "expl": "Cada print gera uma linha."
     },
     {
      "p": "Quantos caracteres tem a terceira linha?",
      "r": 3,
      "un": "caracteres",
      "dica": "\"c\" * 3 = ccc.",
      "expl": "ccc tem 3 letras."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é um algoritmo?",
   "Uma sequência finita e ordenada de passos claros que resolve um problema."
  ],
  [
   "O que é um programa?",
   "Um algoritmo escrito numa linguagem de programação para o computador executar."
  ],
  [
   "Para que serve o <code>print()</code>?",
   "Mostrar texto e valores na tela."
  ],
  [
   "Como escrever um texto (string) em Python?",
   "Entre aspas simples ou duplas: <code>\"Olá\"</code> ou <code>'Olá'</code>."
  ],
  [
   "Para que serve o <code>#</code>?",
   "Inicia um comentário, ignorado pelo Python."
  ],
  [
   "O que faz <code>\\n</code> dentro de um texto?",
   "Quebra a linha."
  ],
  [
   "O que <code>\"ab\" * 3</code> produz?",
   "<code>ababab</code>."
  ],
  [
   "Em que ordem o Python executa o código?",
   "De cima para baixo, uma linha por vez."
  ],
  [
   "O que é um erro de sintaxe?",
   "Código escrito fora das regras da linguagem; o programa nem começa a rodar."
  ],
  [
   "Que informações traz uma mensagem de erro?",
   "O tipo do erro e a linha onde ele foi percebido."
  ],
  [
   "Por que <code>Print(\"Oi\")</code> falha?",
   "O Python diferencia maiúsculas de minúsculas; o certo é <code>print</code>."
  ],
  [
   "O que é um interpretador?",
   "O programa que lê o código Python e o executa."
  ]
 ],
 "vf": [
  [
   "Um algoritmo pode ter passos ambíguos, como “coloque um pouco de sal”.",
   false,
   "Precisa ser claro e sem ambiguidade."
  ],
  [
   "O Python executa as linhas de baixo para cima.",
   false,
   "É de cima para baixo."
  ],
  [
   "<code>print(\"Oi\")</code> mostra Oi na tela, sem as aspas.",
   true,
   "As aspas só delimitam o texto."
  ],
  [
   "Dois <code>print</code> seguidos escrevem na mesma linha.",
   false,
   "Cada print termina com quebra de linha."
  ],
  [
   "<code>print(\"*\" * 5)</code> mostra <code>*****</code>.",
   true,
   "Multiplicar texto repete o texto."
  ],
  [
   "Comentários mudam o resultado do programa.",
   false,
   "O Python os ignora."
  ],
  [
   "<code>Print(\"Oi\")</code> funciona igual a <code>print(\"Oi\")</code>.",
   false,
   "Maiúsculas importam."
  ],
  [
   "Esquecer uma aspa causa erro de sintaxe.",
   true,
   "A string fica sem fechamento."
  ],
  [
   "Você só precisa ler o erro se o programa for grande.",
   false,
   "Ler o erro ajuda sempre, mesmo em programas pequenos."
  ],
  [
   "<code>\\n</code> produz uma nova linha dentro do texto.",
   true,
   "É o caractere de quebra de linha."
  ],
  [
   "Programar é escrever tudo certo de primeira.",
   false,
   "É testar e corrigir em ciclos."
  ],
  [
   "O Python precisa de ponto e vírgula no fim de cada linha.",
   false,
   "Em Python não é necessário."
  ]
 ],
 "caderno": [
  [
   "Escreva um algoritmo (5 passos) para fazer um cafezinho.",
   "Ex.: ferver a água; pôr o pó no filtro; passar a água; esperar coar; servir. O importante é a ordem e a clareza."
  ],
  [
   "Escreva um programa que imprima seu nome e sua turma em duas linhas.",
   "print(\"Ana Souza\")\nprint(\"1º ano DS\")"
  ],
  [
   "Qual é a saída? <code>print(\"Oi\" * 2)</code>",
   "OiOi"
  ],
  [
   "Corrija: <code>print(\"Bom dia)</code>",
   "Faltava a aspa de fechamento: print(\"Bom dia\")."
  ],
  [
   "Corrija: <code>Print('Olá')</code>",
   "Usar minúscula: print('Olá')."
  ],
  [
   "Escreva um programa que desenhe uma casinha de 3 linhas com asteriscos.",
   "Ex.: print(\" * \") / print(\"*<b>\") / print(\"</b>*\"). Vale qualquer desenho coerente."
  ],
  [
   "Para que serve um comentário? Dê um exemplo.",
   "Explicar a intenção do código para pessoas. Ex.: # calcula a média da turma."
  ],
  [
   "Por que a ordem dos passos importa num algoritmo?",
   "Porque o resultado depende da sequência; trocar passos muda ou quebra o resultado."
  ],
  [
   "O que <code>print(\"A\\nB\")</code> mostra?",
   "A numa linha e B na linha de baixo."
  ],
  [
   "Dê um exemplo da vida real de algoritmo e outro de algo que não é algoritmo por ser ambíguo.",
   "Algoritmo: receita com medidas exatas. Ambíguo: “faça um bolo gostoso”."
  ]
 ],
 "pbl": [
  {
   "titulo": "A carta no terminal",
   "cenario": "<p>Você quer imprimir uma carta de agradecimento para o professor, com saudação, duas linhas de texto e assinatura, tudo pelo Python.</p>",
   "passos": [
    [
     "Escreva o algoritmo da carta em português, em passos.",
     "1) saudação; 2) primeira linha; 3) segunda linha; 4) assinatura."
    ],
    [
     "Transforme cada passo em um <code>print</code> e execute.",
     "Cada passo vira um print com o texto entre aspas."
    ],
    [
     "Adicione um comentário no topo explicando o que o programa faz e uma linha de separação com <code>\"-\" * 30</code>.",
     "# Carta de agradecimento / print(\"-\" * 30)."
    ]
   ]
  },
  {
   "titulo": "Caça ao erro",
   "cenario": "<p>Um colega enviou um programa que não roda: <code>Print(\"Oi\")</code>, <code>print(\"Tudo bem?)</code> e <code>print 'Até logo'</code>.</p>",
   "passos": [
    [
     "Localize e explique cada erro.",
     "1) P maiúsculo; 2) falta a aspa de fechamento; 3) faltam os parênteses."
    ],
    [
     "Reescreva o programa corrigido.",
     "print(\"Oi\") / print(\"Tudo bem?\") / print(\"Até logo\")"
    ],
    [
     "Escreva uma dica de como evitar esses três erros.",
     "Digitar com calma, conferir aspas e parênteses em pares e ler a mensagem de erro."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Algoritmo = passos claros e ordenados; programa = algoritmo em Python.",
    "print mostra texto; aspas delimitam strings; \\n quebra linha.",
    "# comenta; erros dizem o tipo e a linha."
   ]
  }
 ],
 "glossario": [
  [
   "print()",
   "Função que mostra valores na tela."
  ],
  [
   "Sintaxe",
   "Regras de escrita do código."
  ]
 ]
});
