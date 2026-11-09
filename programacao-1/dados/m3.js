FSI.modulo({
 "n": 3,
 "unidade": "Unidade 2",
 "nome": "Decisão: if, elif e else",
 "titulo": "Fazer o programa escolher o caminho",
 "duracao": "14 h",
 "resumoCurto": "Comparações, operadores lógicos, if/elif/else, aninhamento e números aleatórios.",
 "analogia": {
  "titulo": "O semáforo e o porteiro",
  "txt": "<p>O semáforo decide: <b>se</b> está verde, você passa; <b>senão, se</b> está amarelo, atenção; <b>senão</b>, pare. Um porteiro faz o mesmo com perguntas de sim ou não: “tem convite <b>e</b> documento?”. Em programação, essas perguntas são <b>condições</b> que resultam em verdadeiro ou falso, e o programa segue um caminho ou outro.</p>"
 },
 "chave": [
  "Comparações: <code>== != &lt; &gt; &lt;= &gt;=</code> resultam em <b>True</b> ou <b>False</b>.",
  "<code>=</code> atribui; <code>==</code> compara. Confundir os dois é erro clássico.",
  "Operadores lógicos: <code>and</code> (os dois), <code>or</code> (pelo menos um), <code>not</code> (inverte).",
  "<code>if</code> executa o bloco se a condição for verdadeira; <code>elif</code> testa outra; <code>else</code> é o resto.",
  "O bloco é marcado pelos <b>dois pontos</b> e pela <b>indentação</b> (4 espaços).",
  "Só um ramo do <code>if/elif/else</code> é executado: o primeiro cuja condição for verdadeira.",
  "<code>random.randint(a, b)</code> sorteia um inteiro entre a e b (precisa de <code>import random</code>)."
 ],
 "objetivos": [
  "Escrever <b>condições</b> com comparações e operadores lógicos.",
  "Usar <b>if, elif e else</b> com indentação correta.",
  "Combinar decisões <b>aninhadas</b> e em cadeia.",
  "Sortear valores com o módulo <b>random</b>."
 ],
 "licoes": [
  {
   "t": "Condições: perguntas de sim ou não",
   "txt": "<p>Uma comparação produz um valor lógico:</p><pre><code>idade = 17\nprint(idade &gt;= 18)        # False\nprint(idade != 18)        # True\nprint(idade &gt; 12 and idade &lt; 18)  # True</code></pre><p><code>and</code> exige as duas verdadeiras; <code>or</code>, ao menos uma; <code>not</code> inverte.</p>",
   "pense": "qual a diferença entre = e == ?"
  },
  {
   "t": "if, elif e else",
   "txt": "<p>O Python testa as condições em ordem e executa só o primeiro bloco verdadeiro:</p><pre><code>nota = float(input())\nif nota &gt;= 7:\n    print(\"Aprovado\")\nelif nota &gt;= 5:\n    print(\"Recuperação\")\nelse:\n    print(\"Reprovado\")</code></pre><p>Troque a ordem dos testes e o resultado pode mudar: teste do caso mais específico para o mais geral.</p>"
  },
  {
   "t": "Decisões aninhadas e sorteio",
   "txt": "<p>Dentro de um bloco pode haver outro <code>if</code> (aninhado), avançando outros 4 espaços. Para sortear, importe o módulo <code>random</code>:</p><pre><code>import random\nmoeda = random.randint(0, 1)\nif moeda == 0:\n    print(\"Cara\")\nelse:\n    print(\"Coroa\")</code></pre><p>Exemplos clássicos deste módulo: cara ou coroa, boletim de notas, níveis de pH e a bola 8 mágica (inspirados na trilha <i>The Legend of Python</i>, Codédex, MIT).</p>"
  },
  {
   "t": "Armadilhas comuns",
   "txt": "",
   "pontos": [
    "Usar <code>=</code> no lugar de <code>==</code> dentro do if (SyntaxError).",
    "Esquecer os <b>dois pontos</b> depois da condição.",
    "Indentar com número diferente de espaços no mesmo bloco.",
    "Comparar texto com número: <code>input()</code> é str; converta antes (<code>int(input())</code>).",
    "Condições em ordem errada: <code>nota &gt;= 5</code> antes de <code>nota &gt;= 7</code> captura os aprovados no ramo errado."
   ]
  }
 ],
 "termos": [
  [
   "Condição",
   "Expressão que resulta em True ou False."
  ],
  [
   "Operador lógico",
   "and, or, not."
  ],
  [
   "Bloco",
   "Conjunto de linhas indentadas."
  ],
  [
   "Aninhamento",
   "Um if dentro de outro."
  ],
  [
   "random",
   "Módulo para números aleatórios."
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
  "intro": "Programe decisões. As entradas dos testes variam para checar todos os caminhos.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Python: decisões",
    "instr": "Escreva o código, execute (Ctrl+Enter) e veja a saída. Os desafios são conferidos sozinhos.",
    "cfg": {
     "id": "py3",
     "inicial": "nota = float(input())\nif nota >= 7:\n    print(\"Aprovado\")\nelse:\n    print(\"Reprovado\")",
     "entrada": "",
     "desafios": [
      {
       "p": "Leia um inteiro e mostre <code>par</code> ou <code>impar</code>.",
       "ref": "n = int(input())\nif n % 2 == 0:\n    print(\"par\")\nelse:\n    print(\"impar\")",
       "testes": [
        "4",
        "7",
        "0"
       ],
       "dica": "n % 2 == 0.",
       "expl": "O resto por 2 decide."
      },
      {
       "p": "Leia a idade e mostre <code>crianca</code> (até 11), <code>adolescente</code> (12 a 17) ou <code>adulto</code> (18 ou mais).",
       "ref": "i = int(input())\nif i <= 11:\n    print(\"crianca\")\nelif i <= 17:\n    print(\"adolescente\")\nelse:\n    print(\"adulto\")",
       "testes": [
        "5",
        "11",
        "12",
        "17",
        "18",
        "40"
       ],
       "exige": [
        "elif"
       ],
       "dica": "use if / elif / else.",
       "expl": "Cuidado com os limites 11/12 e 17/18."
      },
      {
       "p": "Leia a nota e mostre <code>A</code> (9 ou mais), <code>B</code> (7 a menos de 9), <code>C</code> (5 a menos de 7) ou <code>D</code>.",
       "ref": "n = float(input())\nif n >= 9:\n    print(\"A\")\nelif n >= 7:\n    print(\"B\")\nelif n >= 5:\n    print(\"C\")\nelse:\n    print(\"D\")",
       "testes": [
        "10",
        "9",
        "8.5",
        "7",
        "6",
        "5",
        "4.9"
       ],
       "dica": "teste do maior para o menor.",
       "expl": "O primeiro verdadeiro vence."
      },
      {
       "p": "Leia o pH. Mostre <code>acido</code> (&lt; 7), <code>neutro</code> (= 7) ou <code>basico</code> (&gt; 7).",
       "ref": "ph = float(input())\nif ph < 7:\n    print(\"acido\")\nelif ph == 7:\n    print(\"neutro\")\nelse:\n    print(\"basico\")",
       "testes": [
        "3",
        "7",
        "11.5"
       ],
       "dica": "== compara.",
       "expl": "pH 7 é neutro."
      },
      {
       "p": "Leia três lados e mostre <code>triangulo</code> se cada lado for menor que a soma dos outros dois; senão <code>nao</code>.",
       "ref": "a = float(input())\nb = float(input())\nc = float(input())\nif a < b + c and b < a + c and c < a + b:\n    print(\"triangulo\")\nelse:\n    print(\"nao\")",
       "testes": [
        "3\n4\n5",
        "1\n2\n3",
        "5\n5\n5",
        "10\n2\n3"
       ],
       "exige": [
        "and"
       ],
       "dica": "use and entre as três comparações.",
       "expl": "É a desigualdade triangular."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "cl3",
    "titulo": "Verdadeiro ou falso? (idade = 17)",
    "cats": [
     "True",
     "False"
    ],
    "itens": [
     [
      "idade >= 18",
      1
     ],
     [
      "idade < 18",
      0
     ],
     [
      "idade == 17",
      0
     ],
     [
      "idade != 17",
      1
     ],
     [
      "idade > 10 and idade < 20",
      0
     ],
     [
      "idade > 20 or idade < 10",
      1
     ],
     [
      "not (idade == 17)",
      1
     ],
     [
      "idade >= 17 and idade <= 17",
      0
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Use um if no seu código",
    "ev": "py3:if"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de decisão",
    "ev": "py3:todos"
   },
   {
    "id": "m3",
    "t": "Avalie as condições sem erros",
    "ev": "vis:cl3"
   }
  ],
  "guiados": [
   {
    "titulo": "Qual ramo executa?",
    "txt": "<p><code>x = 15</code><br><code>if x &gt; 20: print(1)</code><br><code>elif x &gt; 10: print(2)</code><br><code>else: print(3)</code></p>",
    "passos": [
     {
      "p": "O que é impresso?",
      "r": 2,
      "un": "",
      "dica": "x > 20 é falso; x > 10 é verdadeiro.",
      "expl": "O elif é o primeiro verdadeiro."
     },
     {
      "p": "Se x fosse 25, o que seria impresso?",
      "r": 1,
      "un": "",
      "dica": "x > 20 é verdadeiro.",
      "expl": "O primeiro ramo vence."
     },
     {
      "p": "Se x fosse 3?",
      "r": 3,
      "un": "",
      "dica": "nenhuma condição é verdadeira.",
      "expl": "Cai no else."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma condição?",
   "Uma expressão que resulta em <code>True</code> ou <code>False</code>."
  ],
  [
   "Qual a diferença entre <code>=</code> e <code>==</code>?",
   "<code>=</code> atribui um valor; <code>==</code> compara dois valores."
  ],
  [
   "Quais são os operadores de comparação?",
   "<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>."
  ],
  [
   "O que faz <code>and</code>?",
   "Resulta verdadeiro só se as duas condições forem verdadeiras."
  ],
  [
   "O que faz <code>or</code>?",
   "Resulta verdadeiro se pelo menos uma condição for verdadeira."
  ],
  [
   "O que faz <code>not</code>?",
   "Inverte o valor lógico: <code>not True</code> é <code>False</code>."
  ],
  [
   "Para que serve o <code>elif</code>?",
   "Testar outra condição quando as anteriores foram falsas."
  ],
  [
   "Quando o <code>else</code> executa?",
   "Quando nenhuma condição anterior foi verdadeira."
  ],
  [
   "Como o Python sabe onde termina o bloco do <code>if</code>?",
   "Pela indentação (4 espaços) depois dos dois pontos."
  ],
  [
   "O que acontece se vários ramos forem verdadeiros no if/elif?",
   "Só o primeiro é executado."
  ],
  [
   "Como sortear um inteiro de 1 a 6?",
   "<code>import random</code> e <code>random.randint(1, 6)</code>."
  ],
  [
   "Como saber se <code>n</code> é par?",
   "<code>n % 2 == 0</code>."
  ]
 ],
 "vf": [
  [
   "<code>if x = 5:</code> é a forma correta de comparar.",
   false,
   "O correto é <code>==</code>."
  ],
  [
   "<code>5 != 3</code> é verdadeiro.",
   true,
   "5 é diferente de 3."
  ],
  [
   "<code>True and False</code> resulta <code>True</code>.",
   false,
   "and exige as duas verdadeiras."
  ],
  [
   "<code>True or False</code> resulta <code>True</code>.",
   true,
   "Basta uma verdadeira."
  ],
  [
   "<code>not False</code> resulta <code>True</code>.",
   true,
   "not inverte."
  ],
  [
   "Após <code>if condição</code> é obrigatório usar dois pontos.",
   true,
   "Sem eles, há SyntaxError."
  ],
  [
   "O <code>else</code> pode ter uma condição própria.",
   false,
   "Quem tem condição é o elif."
  ],
  [
   "Num if/elif/else, mais de um bloco pode executar.",
   false,
   "Apenas o primeiro verdadeiro."
  ],
  [
   "Linhas do mesmo bloco precisam da mesma indentação.",
   true,
   "Senão IndentationError."
  ],
  [
   "<code>random.randint(1, 6)</code> pode devolver 6.",
   true,
   "Os dois extremos são incluídos."
  ],
  [
   "<code>input()</code> já devolve inteiro, então <code>if input() &gt; 5</code> funciona.",
   false,
   "Devolve texto; converta antes."
  ],
  [
   "<code>if nota &gt;= 5</code> antes de <code>if nota &gt;= 7</code> com elif classifica corretamente os aprovados.",
   false,
   "Quem tirou 8 cai no primeiro ramo (&gt;= 5)."
  ]
 ],
 "caderno": [
  [
   "Escreva um programa que diga se um número é positivo, negativo ou zero.",
   "n = float(input()); if n &gt; 0: ... elif n &lt; 0: ... else: zero."
  ],
  [
   "Qual a saída? <code>x = 10; if x &gt; 5 and x &lt; 8: print(\"A\") else: print(\"B\")</code>",
   "B (x &gt; 5 é verdadeiro, mas x &lt; 8 é falso)."
  ],
  [
   "Escreva a condição: “idade entre 18 e 65, inclusive”.",
   "idade &gt;= 18 and idade &lt;= 65 (ou 18 &lt;= idade &lt;= 65)."
  ],
  [
   "Corrija: <code>if nota = 7:</code>",
   "if nota == 7:"
  ],
  [
   "Crie um programa da bola 8 mágica com 3 respostas sorteadas.",
   "import random; n = random.randint(1, 3); e um if/elif/else com as 3 frases."
  ],
  [
   "Monte a tabela verdade de <code>A and B</code> e <code>A or B</code>.",
   "and só é True com ambos True; or só é False com ambos False."
  ],
  [
   "Escreva um programa para saber se um ano é bissexto.",
   "(ano % 4 == 0 and ano % 100 != 0) or ano % 400 == 0."
  ],
  [
   "Qual o problema? <code>if idade &gt; 12: print(\"A\") elif idade &gt; 17: print(\"B\")</code>",
   "O ramo B nunca executa: todo idade &gt; 17 já é &gt; 12. Inverter a ordem."
  ],
  [
   "Escreva o programa do pH em português estruturado e depois em Python.",
   "Se pH &lt; 7 ácido, se pH = 7 neutro, senão básico."
  ],
  [
   "Por que a indentação é importante no Python?",
   "Ela define o que pertence ao bloco; sem ela o programa muda de sentido ou dá erro."
  ]
 ],
 "pbl": [
  {
   "titulo": "Cara ou coroa com aposta",
   "cenario": "<p>O grupo quer um joguinho: o usuário escolhe cara (0) ou coroa (1), o computador sorteia e o programa diz se ele acertou.</p>",
   "passos": [
    [
     "Que entradas, sorteio e decisão o programa precisa?",
     "Ler 0 ou 1 (int), sortear com randint(0, 1) e comparar com ==."
    ],
    [
     "Escreva o programa.",
     "import random; escolha = int(input()); sorteio = random.randint(0, 1); if escolha == sorteio: print(\"Acertou\") else: print(\"Errou\")"
    ],
    [
     "Como mostrar também o que saiu (cara ou coroa)?",
     "Usar um if para converter 0 em \"cara\" e 1 em \"coroa\" antes de imprimir."
    ]
   ]
  },
  {
   "titulo": "Desconto da livraria",
   "cenario": "<p>A livraria dá 10% de desconto em compras acima de R$ 100 e 20% acima de R$ 200. O caixa digita o valor.</p>",
   "passos": [
    [
     "Quais faixas existem e em que ordem testá-las?",
     "Mais de 200 (20%), mais de 100 (10%), senão 0%. Do maior limite para o menor."
    ],
    [
     "Escreva o if/elif/else do desconto.",
     "if v &gt; 200: d = 0.2 elif v &gt; 100: d = 0.1 else: d = 0"
    ],
    [
     "Mostre o total com duas casas decimais.",
     "print(f\"Total: R$ {v * (1 - d):.2f}\")"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Comparações dão True/False; and, or, not combinam.",
    "if/elif/else: só o primeiro ramo verdadeiro executa; indentação define o bloco.",
    "random.randint(a, b) sorteia entre a e b."
   ]
  }
 ],
 "glossario": [
  [
   "Condição",
   "Teste com resultado verdadeiro ou falso."
  ],
  [
   "Indentação",
   "Recuo que define o bloco de código."
  ]
 ]
});
