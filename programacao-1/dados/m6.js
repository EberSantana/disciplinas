FSI.modulo({
 "n": 6,
 "unidade": "Unidade 3",
 "nome": "Funções",
 "titulo": "Organizar o código em blocos reutilizáveis",
 "duracao": "16 h",
 "resumoCurto": "def, parâmetros, return, valores padrão, escopo de variáveis e o princípio DRY.",
 "analogia": {
  "titulo": "A máquina de suco",
  "txt": "<p>Uma máquina de suco recebe frutas (<b>entrada</b>), faz o processo por dentro (<b>corpo</b>) e entrega o suco (<b>saída</b>). Você não precisa saber como espremer toda vez: aperta o botão. Uma <b>função</b> é isso: você a define uma vez e a <b>chama</b> quantas vezes quiser, com entradas diferentes.</p><p>Isso evita copiar e colar o mesmo código (princípio <b>DRY</b>: <i>Don't Repeat Yourself</i>) e facilita corrigir: arruma num lugar só.</p>"
 },
 "chave": [
  "<code>def nome(parametros):</code> define uma função; o corpo vai indentado.",
  "<b>Parâmetros</b> são as variáveis da definição; <b>argumentos</b> são os valores passados na chamada.",
  "<code>return</code> devolve um valor e encerra a função; sem return, devolve <code>None</code>.",
  "<code>print</code> mostra na tela; <code>return</code> entrega o valor para quem chamou: não são a mesma coisa.",
  "Parâmetros podem ter <b>valor padrão</b>: <code>def oi(nome=\"amigo\")</code>.",
  "<b>Escopo</b>: variáveis criadas dentro da função só existem dentro dela (locais).",
  "Boas funções fazem <b>uma coisa</b> só e têm nomes que dizem o que fazem."
 ],
 "objetivos": [
  "Definir e <b>chamar</b> funções com parâmetros.",
  "Distinguir <b>print</b> de <b>return</b>.",
  "Usar valores padrão e entender o <b>escopo</b>.",
  "Aplicar o princípio <b>DRY</b> em programas maiores."
 ],
 "licoes": [
  {
   "t": "Definir e chamar",
   "txt": "<p>Defina com <code>def</code> e chame pelo nome:</p><pre><code>def saudar(nome):\n    print(f\"Olá, {nome}!\")\n\nsaudar(\"Ana\")\nsaudar(\"Bia\")</code></pre><p>A função só roda quando é <b>chamada</b>. Defina antes de usar.</p>",
   "pense": "o que acontece se você definir a função mas nunca chamá-la?"
  },
  {
   "t": "return: devolver um resultado",
   "txt": "<p>Funções que calculam devem <b>devolver</b> o valor:</p><pre><code>def area(base, altura):\n    return base * altura / 2\n\nr = area(4, 5)\nprint(r)       # 10.0\nprint(area(3, 6) + 1)  # 10.0</code></pre><p>Com <code>return</code> você pode guardar, somar ou comparar o resultado. Com <code>print</code> só mostra na tela e a função devolve <code>None</code>.</p>"
  },
  {
   "t": "Valores padrão e escopo",
   "txt": "<p>Um parâmetro pode ter valor padrão, usado quando o argumento não é passado:</p><pre><code>def potencia(base, exp=2):\n    return base ** exp\n\nprint(potencia(3))     # 9\nprint(potencia(2, 5))  # 32</code></pre><p><b>Escopo:</b> uma variável criada dentro da função não existe fora. Por isso a função devolve valores com <code>return</code> em vez de “deixar” variáveis para fora.</p>"
  },
  {
   "t": "DRY na prática",
   "txt": "<p>Se o mesmo trecho aparece três vezes, vire função. Exemplos clássicos: calculadora com uma função por operação, biscoito da sorte que sorteia frases, foguete com contagem regressiva, drive-thru com cardápio (inspirados em <i>The Legend of Python</i>, Codédex, MIT).</p><pre><code>def contagem(n):\n    for i in range(n, 0, -1):\n        print(i)\n    print(\"Fogo!\")\n\ncontagem(3)</code></pre>"
  }
 ],
 "termos": [
  [
   "Função",
   "Bloco de código com nome, reutilizável."
  ],
  [
   "Parâmetro",
   "Variável na definição da função."
  ],
  [
   "Argumento",
   "Valor passado na chamada."
  ],
  [
   "return",
   "Devolve um valor para quem chamou."
  ],
  [
   "Escopo",
   "Região onde uma variável existe."
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
  "intro": "Crie funções e use-as. Seu código pode definir e chamar funções à vontade.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Python: funções",
    "instr": "Escreva o código, execute (Ctrl+Enter) e veja a saída. Os desafios são conferidos sozinhos.",
    "cfg": {
     "id": "py6",
     "inicial": "def dobro(x):\n    return x * 2\n\nprint(dobro(21))",
     "entrada": "",
     "desafios": [
      {
       "p": "Defina <code>quadrado(x)</code> que <b>devolve</b> x ao quadrado. Leia um inteiro e imprima <code>quadrado(n)</code>.",
       "ref": "def quadrado(x):\n    return x * x\n\nn = int(input())\nprint(quadrado(n))",
       "testes": [
        "5",
        "-3",
        "0"
       ],
       "exige": [
        "def\\s+quadrado",
        "return"
       ],
       "dica": "def quadrado(x): return ...",
       "expl": "return entrega o valor."
      },
      {
       "p": "Defina <code>eh_par(n)</code> que devolve <code>True</code> ou <code>False</code>. Leia n e imprima o resultado.",
       "ref": "def eh_par(n):\n    return n % 2 == 0\n\nprint(eh_par(int(input())))",
       "testes": [
        "4",
        "9"
       ],
       "exige": [
        "def\\s+eh_par"
       ],
       "dica": "return n % 2 == 0.",
       "expl": "A comparação já é um bool."
      },
      {
       "p": "Defina <code>media(a, b)</code> e imprima a média de dois números lidos (um por linha) com 1 casa decimal.",
       "ref": "def media(a, b):\n    return (a + b) / 2\n\nx = float(input())\ny = float(input())\nprint(f\"{media(x, y):.1f}\")",
       "testes": [
        "7\n8",
        "5\n10"
       ],
       "exige": [
        "def\\s+media"
       ],
       "dica": "f\"{valor:.1f}\".",
       "expl": "A função só calcula; o print está fora."
      },
      {
       "p": "Defina <code>saudar(nome, saudacao=\"Olá\")</code> que <b>devolve</b> <code>Olá, NOME!</code>. Leia o nome e imprima <code>saudar(nome)</code> e depois <code>saudar(nome, \"Oi\")</code>.",
       "ref": "def saudar(nome, saudacao=\"Olá\"):\n    return f\"{saudacao}, {nome}!\"\n\nn = input()\nprint(saudar(n))\nprint(saudar(n, \"Oi\"))",
       "testes": [
        "Ana",
        "Rui"
       ],
       "exige": [
        "def\\s+saudar",
        "saudacao\\s*="
       ],
       "dica": "valor padrão no parâmetro.",
       "expl": "Sem o segundo argumento, vale o padrão."
      },
      {
       "p": "Defina <code>contar_vogais(texto)</code> que devolve a quantidade de vogais (a, e, i, o, u). Leia uma palavra e imprima o resultado.",
       "ref": "def contar_vogais(texto):\n    c = 0\n    for l in texto:\n        if l in \"aeiou\":\n            c += 1\n    return c\n\nprint(contar_vogais(input()))",
       "testes": [
        "banana",
        "xyz",
        "aeiou"
       ],
       "exige": [
        "def\\s+contar_vogais"
       ],
       "dica": "contador + for dentro da função.",
       "expl": "A função isola o problema."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "cl6",
    "titulo": "print ou return?",
    "cats": [
     "print",
     "return"
    ],
    "itens": [
     [
      "Mostrar o resultado final ao usuário",
      0
     ],
     [
      "Entregar um valor para outra parte do código usar",
      1
     ],
     [
      "Guardar o resultado em uma variável: r = f(2)",
      1
     ],
     [
      "Imprimir a mensagem de boas-vindas",
      0
     ],
     [
      "Somar o resultado de uma função com outro número",
      1
     ],
     [
      "Mostrar uma mensagem de erro",
      0
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Defina uma função com def",
    "ev": "py6:def"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de funções",
    "ev": "py6:todos"
   },
   {
    "id": "m3",
    "t": "Distinga print de return",
    "ev": "vis:cl6"
   }
  ],
  "guiados": [
   {
    "titulo": "Rastreando funções",
    "txt": "<p><code>def f(x): return x * 2 + 1</code></p>",
    "passos": [
     {
      "p": "Quanto vale f(3)?",
      "r": 7,
      "un": "",
      "dica": "3*2+1.",
      "expl": "3×2+1 = 7."
     },
     {
      "p": "Quanto vale f(f(1))?",
      "r": 7,
      "un": "",
      "dica": "f(1)=3; f(3)=7.",
      "expl": "A saída de f(1) entra de novo em f."
     },
     {
      "p": "Quanto vale f(0)?",
      "r": 1,
      "un": "",
      "dica": "0*2+1.",
      "expl": "É 1."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma função?",
   "Um bloco de código com nome que pode ser chamado várias vezes."
  ],
  [
   "Qual a palavra para definir uma função?",
   "<code>def</code>."
  ],
  [
   "Qual a diferença entre parâmetro e argumento?",
   "Parâmetro está na definição; argumento é o valor passado na chamada."
  ],
  [
   "O que faz o <code>return</code>?",
   "Devolve um valor para quem chamou e encerra a função."
  ],
  [
   "O que uma função sem <code>return</code> devolve?",
   "<code>None</code>."
  ],
  [
   "Qual a diferença entre <code>print</code> e <code>return</code>?",
   "<code>print</code> mostra na tela; <code>return</code> entrega o valor ao código."
  ],
  [
   "O que é valor padrão de parâmetro?",
   "Valor usado quando o argumento não é informado: <code>def f(x=2)</code>."
  ],
  [
   "O que é escopo local?",
   "Variáveis criadas na função só existem dentro dela."
  ],
  [
   "O que significa DRY?",
   "*Don't Repeat Yourself*: não repita código; crie uma função."
  ],
  [
   "Uma função roda quando é definida?",
   "Não, só quando é chamada."
  ],
  [
   "Pode uma função chamar outra?",
   "Sim, e é muito comum."
  ],
  [
   "Como nomear bem uma função?",
   "Com um verbo ou ação clara: <code>calcular_media</code>, <code>eh_par</code>."
  ]
 ],
 "vf": [
  [
   "Definir uma função já executa o código dela.",
   false,
   "É preciso chamá-la."
  ],
  [
   "<code>return</code> encerra a função imediatamente.",
   true,
   "O que vier depois não roda."
  ],
  [
   "Toda função precisa ter <code>return</code>.",
   false,
   "Sem return devolve None."
  ],
  [
   "<code>print(f(2))</code> mostra o valor devolvido por <code>f(2)</code>.",
   true,
   "O return alimenta o print."
  ],
  [
   "Uma variável criada dentro da função pode ser usada fora dela.",
   false,
   "Escopo local."
  ],
  [
   "Parâmetros podem ter valor padrão.",
   true,
   "<code>def f(x=1)</code>."
  ],
  [
   "A chamada precisa vir depois da definição no código.",
   true,
   "Senão: NameError."
  ],
  [
   "<code>def somar(a, b): return a + b</code> e <code>somar(2, 3)</code> valem 5.",
   true,
   "Devolve 5."
  ],
  [
   "O princípio DRY pede copiar e colar o código onde precisar.",
   false,
   "Pede o contrário."
  ],
  [
   "Uma função pode ter vários parâmetros.",
   true,
   "Separados por vírgula."
  ],
  [
   "Argumentos e parâmetros são exatamente o mesmo conceito.",
   false,
   "Um é a definição, o outro o valor."
  ],
  [
   "Funções ajudam a testar partes do programa separadamente.",
   true,
   "Cada função é uma peça."
  ]
 ],
 "caderno": [
  [
   "Escreva a função <code>dobro(x)</code> e use-a para dobrar 21.",
   "def dobro(x): return x * 2; print(dobro(21)) → 42."
  ],
  [
   "Qual a saída? <code>def f(a, b=3): return a * b</code> / <code>print(f(2), f(2, 5))</code>",
   "6 10"
  ],
  [
   "Escreva <code>eh_maior_de_idade(idade)</code> que devolve True/False.",
   "def eh_maior_de_idade(idade): return idade &gt;= 18"
  ],
  [
   "Por que este código mostra None? <code>def f(x): print(x * 2)</code> / <code>r = f(3); print(r)</code>",
   "A função mostra 6, mas não tem return; r vale None."
  ],
  [
   "Reescreva a calculadora com 4 funções (soma, sub, mult, div).",
   "def soma(a, b): return a + b; e assim por diante; um menu com if/elif chama cada uma."
  ],
  [
   "Escreva <code>fatorial(n)</code> com um laço.",
   "r = 1; for i in range(2, n + 1): r *= i; return r."
  ],
  [
   "Escreva a função biscoito da sorte que sorteia uma frase de uma lista.",
   "import random; frases = [...]; def sorte(): return random.choice(frases)"
  ],
  [
   "Onde está o erro? <code>def dobro(x): y = x * 2</code> / <code>print(y)</code>",
   "y é local; não existe fora da função. Use return y."
  ],
  [
   "Dê dois motivos para usar funções.",
   "Evitar repetição (DRY) e dividir o problema em partes pequenas e testáveis."
  ],
  [
   "Escreva <code>contagem(n)</code> que imprime n até 1 e depois “Fogo!”.",
   "for i in range(n, 0, -1): print(i); print(\"Fogo!\")"
  ]
 ],
 "pbl": [
  {
   "titulo": "Calculadora modular",
   "cenario": "<p>O grupo quer uma calculadora de terminal em que cada operação seja uma função e um menu escolha qual usar.</p>",
   "passos": [
    [
     "Quais funções são necessárias e o que cada uma recebe e devolve?",
     "somar, subtrair, multiplicar e dividir; todas recebem dois números e devolvem o resultado."
    ],
    [
     "Como o menu escolhe a função?",
     "if/elif lendo a opção do usuário e chamando a função correspondente."
    ],
    [
     "Como tratar a divisão por zero?",
     "Na função dividir: if b == 0: return \"erro\"."
    ]
   ]
  },
  {
   "titulo": "Notas do boletim por função",
   "cenario": "<p>Um boletim repete o cálculo da média e da situação (aprovado/recuperação/reprovado) para cada aluno.</p>",
   "passos": [
    [
     "Que duas funções eliminam a repetição?",
     "media(notas) e situacao(media)."
    ],
    [
     "Escreva <code>situacao(m)</code>.",
     "def situacao(m): if m &gt;= 7: return \"aprovado\" elif m &gt;= 5: return \"recuperação\" else: return \"reprovado\""
    ],
    [
     "Como usar as duas para uma lista de alunos?",
     "for nome, notas in alunos: m = media(notas); print(nome, situacao(m))."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "def define, a chamada executa; parâmetros recebem, return devolve.",
    "print mostra; return entrega o valor.",
    "Variáveis locais vivem só dentro da função; DRY evita repetição."
   ]
  }
 ],
 "glossario": [
  [
   "DRY",
   "Princípio de não repetir código."
  ],
  [
   "None",
   "Valor que indica ausência de resultado."
  ]
 ]
});
