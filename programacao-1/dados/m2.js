FSI.modulo({
 "n": 2,
 "unidade": "Unidade 1",
 "nome": "Variáveis, tipos e entrada de dados",
 "titulo": "Guardar valores, calcular e conversar com o usuário",
 "duracao": "14 h",
 "resumoCurto": "Variáveis, tipos (int, float, str, bool), operadores, input(), conversão de tipos e f-strings.",
 "analogia": {
  "titulo": "Caixas com etiqueta",
  "txt": "<p>Uma <b>variável</b> é uma caixa com etiqueta: o nome é a etiqueta, o valor é o que está dentro. Você pode trocar o conteúdo quando quiser, mas o nome continua o mesmo. O <b>tipo</b> diz o que cabe: número inteiro, número com vírgula, texto ou verdadeiro/falso.</p><p>E o <code>input()</code> é perguntar ao usuário o que colocar na caixa, sempre como <b>texto</b>: se for número, é preciso converter.</p>"
 },
 "chave": [
  "<b>Variável</b>: nome que guarda um valor; criada com <code>=</code> (atribuição).",
  "Tipos básicos: <code>int</code> (inteiro), <code>float</code> (decimal), <code>str</code> (texto), <code>bool</code> (True/False).",
  "Operadores: <code>+ - * /</code>, divisão inteira <code>//</code>, resto <code>%</code>, potência <code>**</code>.",
  "<code>input()</code> sempre devolve <b>str</b>; converta com <code>int()</code> ou <code>float()</code>.",
  "<code>type(x)</code> mostra o tipo; <code>f\"Olá, {nome}\"</code> monta texto com valores.",
  "Nomes de variáveis: letras, números e <code>_</code>, sem começar por número, sem espaços e com letras minúsculas por convenção."
 ],
 "objetivos": [
  "Criar variáveis e escolher o <b>tipo</b> certo.",
  "Fazer cálculos com os <b>operadores</b> aritméticos.",
  "Ler dados com <b>input()</b> e converter tipos.",
  "Formatar saídas com <b>f-strings</b>."
 ],
 "licoes": [
  {
   "t": "Variáveis e tipos",
   "txt": "<p>Atribuir é guardar um valor sob um nome:</p><pre><code>nome = \"Ana\"\nidade = 16\naltura = 1.62\nestuda = True\nprint(type(idade))  # &lt;class 'int'&gt;</code></pre><p>O sinal <code>=</code> não é “igual” da matemática: lê-se “recebe”. Em <code>x = x + 1</code>, o novo x recebe o antigo mais 1.</p>",
   "pense": "qual o valor de x depois de x = 5 e depois x = x + 1?"
  },
  {
   "t": "Operadores aritméticos",
   "txt": "<p>Além de soma, subtração e multiplicação, há três muito úteis:</p>",
   "pontos": [
    "<code>/</code> divide e dá <b>float</b>: <code>7 / 2</code> é <code>3.5</code>.",
    "<code>//</code> divisão inteira: <code>7 // 2</code> é <code>3</code>.",
    "<code>%</code> resto: <code>7 % 2</code> é <code>1</code> (ótimo para saber se um número é par).",
    "<code>**</code> potência: <code>2 ** 3</code> é <code>8</code>.",
    "Precedência como na matemática: <code>**</code>, depois <code>* / // %</code>, depois <code>+ -</code>; use parênteses."
   ]
  },
  {
   "t": "Entrada e conversão",
   "txt": "<p><code>input()</code> pausa o programa e espera o usuário digitar. O resultado é sempre texto:</p><pre><code>nome = input(\"Seu nome: \")\nidade = int(input(\"Sua idade: \"))\nprint(f\"{nome} fará {idade + 1} anos.\")</code></pre><p>Sem <code>int()</code>, <code>idade + 1</code> daria erro (texto + número). Use <code>float()</code> para números com ponto decimal (<code>1.75</code>).</p>"
  },
  {
   "t": "f-strings e arredondamento",
   "txt": "<p>Coloque <code>f</code> antes das aspas e use <code>{}</code> para inserir valores. Para fixar casas decimais: <code>{valor:.2f}</code>.</p><pre><code>preco = 12.5\nprint(f\"Total: R$ {preco * 3:.2f}\")  # Total: R$ 37.50</code></pre><p>Exercícios clássicos deste módulo: conversor de temperatura, IMC, hipotenusa e câmbio (inspirados na trilha pública <i>The Legend of Python</i>, Codédex, MIT).</p>"
  }
 ],
 "termos": [
  [
   "Variável",
   "Nome que guarda um valor."
  ],
  [
   "Atribuição",
   "Guardar um valor com =."
  ],
  [
   "Tipo de dado",
   "Natureza do valor: int, float, str, bool."
  ],
  [
   "Conversão",
   "Trocar o tipo, como int('5')."
  ],
  [
   "f-string",
   "Texto com valores dentro de { }."
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
  "intro": "Calcule, converta e leia dados do teclado. As entradas dos testes são enviadas automaticamente.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Python: variáveis e entrada",
    "instr": "Escreva o código, execute (Ctrl+Enter) e veja a saída. Os desafios são conferidos sozinhos.",
    "cfg": {
     "id": "py2",
     "inicial": "nome = input(\"Seu nome: \")\nprint(f\"Olá, {nome}!\")",
     "entrada": "",
     "desafios": [
      {
       "p": "Leia um nome com <code>input()</code> e mostre <code>Olá, NOME!</code> (use f-string).",
       "ref": "nome = input()\nprint(f\"Olá, {nome}!\")",
       "testes": [
        "Ana",
        "Carlos"
       ],
       "dica": "f\"Olá, {nome}!\".",
       "expl": "A f-string insere o valor da variável."
      },
      {
       "p": "Leia dois números <b>inteiros</b> (um por linha) e mostre a <b>soma</b>.",
       "ref": "a = int(input())\nb = int(input())\nprint(a + b)",
       "testes": [
        "2\n3",
        "10\n-4"
       ],
       "dica": "converta com int() antes de somar.",
       "expl": "input() devolve texto; int() converte."
      },
      {
       "p": "Leia a temperatura em Celsius (número, pode ter vírgula decimal com ponto) e mostre em Fahrenheit: <code>F = C × 9/5 + 32</code>.",
       "ref": "c = float(input())\nprint(c * 9 / 5 + 32)",
       "testes": [
        "0",
        "100",
        "36.5"
       ],
       "dica": "use float().",
       "expl": "100 °C = 212 °F."
      },
      {
       "p": "Leia um número inteiro e mostre o <b>resto da divisão por 2</b> (0 = par, 1 = ímpar).",
       "ref": "n = int(input())\nprint(n % 2)",
       "testes": [
        "8",
        "7"
       ],
       "exige": [
        "%"
       ],
       "dica": "o operador % dá o resto.",
       "expl": "n % 2 vale 0 para pares."
      },
      {
       "p": "Leia a <b>massa</b> (kg) e a <b>altura</b> (m) e mostre o IMC com 2 casas: <code>massa / altura**2</code>.",
       "ref": "m = float(input())\nh = float(input())\nprint(f\"{m / h ** 2:.2f}\")",
       "testes": [
        "70\n1.75",
        "50\n1.60"
       ],
       "dica": "f\"{valor:.2f}\".",
       "expl": "Um IMC de 22,86 está na faixa normal."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "cl2",
    "titulo": "Qual é o tipo?",
    "cats": [
     "int",
     "float",
     "str",
     "bool"
    ],
    "itens": [
     [
      "42",
      0
     ],
     [
      "3.14",
      1
     ],
     [
      "\"42\"",
      2
     ],
     [
      "True",
      3
     ],
     [
      "-7",
      0
     ],
     [
      "2.0",
      1
     ],
     [
      "\"verdade\"",
      2
     ],
     [
      "10 > 3",
      3
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Leia um dado com input()",
    "ev": "py2:input"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de cálculo",
    "ev": "py2:todos"
   },
   {
    "id": "m3",
    "t": "Classifique os tipos sem erros",
    "ev": "vis:cl2"
   }
  ],
  "guiados": [
   {
    "titulo": "Seguindo o valor",
    "txt": "<p>Considere: <code>x = 4</code>, <code>y = x * 3</code>, <code>x = y - 2</code>.</p>",
    "passos": [
     {
      "p": "Qual o valor final de y?",
      "r": 12,
      "un": "",
      "dica": "y = 4 * 3.",
      "expl": "y foi calculado com o x antigo (4)."
     },
     {
      "p": "Qual o valor final de x?",
      "r": 10,
      "un": "",
      "dica": "x = 12 - 2.",
      "expl": "x recebeu o valor de y menos 2."
     },
     {
      "p": "Quanto é 17 % 5?",
      "r": 2,
      "un": "",
      "dica": "17 = 3 × 5 + 2.",
      "expl": "O resto da divisão é 2."
     },
     {
      "p": "Quanto é 17 // 5?",
      "r": 3,
      "un": "",
      "dica": "quociente inteiro.",
      "expl": "17 ÷ 5 = 3 e sobram 2."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma variável?",
   "Um nome que guarda um valor na memória."
  ],
  [
   "O que faz o <code>=</code> em Python?",
   "Atribui o valor da direita ao nome da esquerda."
  ],
  [
   "Quais são os quatro tipos básicos?",
   "<code>int</code>, <code>float</code>, <code>str</code> e <code>bool</code>."
  ],
  [
   "O que <code>7 / 2</code> devolve?",
   "<code>3.5</code> (a divisão sempre devolve float)."
  ],
  [
   "O que <code>7 // 2</code> devolve?",
   "<code>3</code> (divisão inteira)."
  ],
  [
   "Para que serve o <code>%</code>?",
   "Dá o resto da divisão; <code>7 % 2</code> é <code>1</code>."
  ],
  [
   "O que <code>2 ** 3</code> calcula?",
   "Potência: 2 elevado a 3 = 8."
  ],
  [
   "Que tipo <code>input()</code> sempre devolve?",
   "<code>str</code> (texto)."
  ],
  [
   "Como ler um número inteiro do teclado?",
   "<code>int(input(\"...\"))</code>."
  ],
  [
   "Para que serve <code>type(x)</code>?",
   "Mostra o tipo do valor de x."
  ],
  [
   "Como inserir uma variável num texto?",
   "Com f-string: <code>f\"Olá, {nome}\"</code>."
  ],
  [
   "Como mostrar 2 casas decimais numa f-string?",
   "<code>{valor:.2f}</code>."
  ]
 ],
 "vf": [
  [
   "<code>x = 5</code> e <code>x == 5</code> significam a mesma coisa.",
   false,
   "<code>=</code> atribui; <code>==</code> compara (veremos adiante)."
  ],
  [
   "<code>input()</code> devolve um número se o usuário digitar números.",
   false,
   "Devolve sempre texto."
  ],
  [
   "<code>\"5\" + \"3\"</code> dá <code>\"53\"</code>.",
   true,
   "Somar textos concatena."
  ],
  [
   "<code>10 // 3</code> é <code>3</code>.",
   true,
   "Divisão inteira."
  ],
  [
   "<code>10 % 3</code> é <code>1</code>.",
   true,
   "10 = 3 × 3 + 1."
  ],
  [
   "Um nome de variável pode começar por número, como <code>1nota</code>.",
   false,
   "Não pode começar por número."
  ],
  [
   "<code>2 + 3 * 4</code> é <code>20</code>.",
   false,
   "A multiplicação vem antes: 14."
  ],
  [
   "<code>True</code> e <code>False</code> são do tipo <code>bool</code>.",
   true,
   "Tipo lógico."
  ],
  [
   "<code>int(\"7\") + 1</code> é <code>8</code>.",
   true,
   "Converte o texto para inteiro."
  ],
  [
   "<code>float(\"2.5\")</code> dá erro.",
   false,
   "Converte para 2.5."
  ],
  [
   "Em <code>x = x + 1</code>, o x aumenta em 1.",
   true,
   "Atribuição com o valor antigo."
  ],
  [
   "Variáveis <code>Nome</code> e <code>nome</code> são a mesma.",
   false,
   "O Python diferencia maiúsculas."
  ]
 ],
 "caderno": [
  [
   "Crie variáveis para seu nome (str), idade (int), altura (float) e se estuda (bool).",
   "nome = \"Ana\"; idade = 16; altura = 1.62; estuda = True."
  ],
  [
   "Qual o resultado de <code>8 / 2</code>, <code>8 // 3</code> e <code>8 % 3</code>?",
   "4.0, 2 e 2."
  ],
  [
   "Calcule <code>2 + 3 * 4 ** 2</code> e explique a ordem.",
   "48: primeiro 4**2=16, depois 3*16=48, depois 2+48."
  ],
  [
   "Escreva um programa que leia dois números e mostre a média.",
   "a = float(input()); b = float(input()); print((a + b) / 2)"
  ],
  [
   "Por que <code>idade = input(); print(idade + 1)</code> dá erro?",
   "input() devolve texto; não dá para somar texto com número. Use int(input())."
  ],
  [
   "Converta o programa da média para mostrar com 1 casa decimal.",
   "print(f\"{(a + b) / 2:.1f}\")"
  ],
  [
   "Escreva um programa que calcule a hipotenusa de um triângulo retângulo (catetos lidos).",
   "import math não é necessário: print((a<b>2 + b</b>2) ** 0.5)."
  ],
  [
   "Escreva um conversor de dólar para real (cotação lida do teclado).",
   "dolar = float(input()); cot = float(input()); print(f\"R$ {dolar * cot:.2f}\")"
  ],
  [
   "Dê dois nomes bons e dois nomes ruins para variáveis.",
   "Bons: preco_total, idade_aluno. Ruins: 1nota, minha nota (espaço), x1y2z3 sem sentido."
  ],
  [
   "Como saber se um número é múltiplo de 5 usando o resto?",
   "numero % 5 == 0."
  ]
 ],
 "pbl": [
  {
   "titulo": "Calculadora de gorjeta",
   "cenario": "<p>Num restaurante, o grupo quer calcular a conta com 10% de serviço e dividir entre as pessoas.</p>",
   "passos": [
    [
     "Quais dados o programa precisa ler e de que tipo cada um?",
     "Valor da conta (float) e número de pessoas (int)."
    ],
    [
     "Escreva as linhas de cálculo do total com 10% e do valor por pessoa.",
     "total = conta * 1.10; por_pessoa = total / pessoas."
    ],
    [
     "Mostre o resultado com duas casas decimais usando f-string.",
     "print(f\"Cada um paga R$ {por_pessoa:.2f}\")"
    ]
   ]
  },
  {
   "titulo": "Ficha do aluno",
   "cenario": "<p>A secretaria quer um programa que pergunte nome, ano de nascimento e mostre a idade aproximada em 2026.</p>",
   "passos": [
    [
     "Que conversão é necessária e por quê?",
     "int() no ano de nascimento: input() devolve texto."
    ],
    [
     "Escreva o programa completo.",
     "nome = input(); ano = int(input()); print(f\"{nome} tem cerca de {2026 - ano} anos\")"
    ],
    [
     "O que acontece se o usuário digitar “dois mil”? Como lidaríamos com isso depois?",
     "Dá ValueError; no módulo 7 veremos try/except para tratar entradas inválidas."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Variável = nome + valor; tipos int, float, str, bool.",
    "/ dá float, // inteira, % resto, ** potência.",
    "input() devolve str: converta com int()/float(); f-strings formatam a saída."
   ]
  }
 ],
 "glossario": [
  [
   "f-string",
   "Texto com expressões entre chaves, precedido de f."
  ],
  [
   "Atribuição",
   "Operação que guarda um valor em uma variável."
  ]
 ]
});
