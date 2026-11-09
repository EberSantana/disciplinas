FSI.modulo({
 "n": 8,
 "unidade": "Unidade 4",
 "nome": "Classes, objetos e módulos",
 "titulo": "Modelar coisas do mundo e reutilizar código de outros",
 "duracao": "18 h",
 "resumoCurto": "Classes, atributos, métodos, __init__, self, objetos e uso de módulos (random, math, módulo próprio).",
 "analogia": {
  "titulo": "A planta e a casa",
  "txt": "<p>A <b>planta</b> de uma casa não é uma casa: é o molde que diz que haverá quartos, cozinha e portas. Com a mesma planta você constrói várias casas, cada uma com suas cores e seus moradores. A <b>classe</b> é a planta; cada <b>objeto</b> é uma casa construída a partir dela, com <b>atributos</b> próprios (cor, moradores) e <b>métodos</b> (ações: abrir a porta).</p><p>E um <b>módulo</b> é uma caixa de ferramentas de outra pessoa: você importa e usa, sem reinventar.</p>"
 },
 "chave": [
  "<b>Classe</b>: molde que define atributos e métodos; <b>objeto</b>: instância da classe.",
  "<code>__init__(self, ...)</code> é o <b>construtor</b>: roda ao criar o objeto.",
  "<code>self</code> é o próprio objeto; atributos se criam com <code>self.nome = ...</code>.",
  "<b>Métodos</b> são funções dentro da classe; chamam-se com <code>objeto.metodo()</code>.",
  "Cada objeto tem os <b>seus</b> valores de atributos.",
  "<code>import modulo</code> traz funções prontas: <code>random</code>, <code>math</code>, <code>datetime</code>…",
  "Um arquivo .py seu também é um módulo: dá para <code>import</code>ar em outro programa."
 ],
 "objetivos": [
  "Criar <b>classes</b> com atributos e métodos.",
  "Instanciar <b>objetos</b> e usá-los.",
  "Usar <b>módulos</b> da biblioteca padrão.",
  "Organizar um programa em <b>várias partes</b>."
 ],
 "licoes": [
  {
   "t": "Classe e objeto",
   "txt": "<p>Defina a classe uma vez, crie quantos objetos quiser:</p><pre><code>class Cachorro:\n    def __init__(self, nome, idade):\n        self.nome = nome\n        self.idade = idade\n\n    def latir(self):\n        print(f\"{self.nome} diz: Au au!\")\n\nrex = Cachorro(\"Rex\", 3)\nbia = Cachorro(\"Bia\", 5)\nrex.latir()\nprint(bia.idade)</code></pre><p>Por convenção, nomes de classes começam com <b>maiúscula</b> (CamelCase).</p>",
   "pense": "o que muda de um objeto para outro da mesma classe?"
  },
  {
   "t": "Métodos que mudam o estado",
   "txt": "<p>Os métodos podem alterar os atributos do objeto, como numa conta bancária:</p><pre><code>class Conta:\n    def __init__(self, titular, saldo=0):\n        self.titular = titular\n        self.saldo = saldo\n\n    def depositar(self, valor):\n        self.saldo += valor\n\n    def sacar(self, valor):\n        if valor &lt;= self.saldo:\n            self.saldo -= valor\n        else:\n            print(\"Saldo insuficiente\")\n\nc = Conta(\"Ana\", 100)\nc.depositar(50)\nc.sacar(500)\nprint(c.saldo)  # 150</code></pre><p>Os dados e as ações que mexem neles ficam juntos: é a ideia central da orientação a objetos, que você aprofundará em Programação 2.</p>"
  },
  {
   "t": "Módulos",
   "txt": "<p>Módulos trazem código pronto:</p><pre><code>import random\nimport math\n\nprint(random.randint(1, 6))\nprint(random.choice([\"pedra\", \"papel\", \"tesoura\"]))\nprint(math.sqrt(16))   # 4.0\nprint(math.pi)         # 3.14159...</code></pre><p>Também é possível <code>from math import sqrt</code> e usar só <code>sqrt(16)</code>.</p>"
  },
  {
   "t": "Seu próprio módulo",
   "txt": "<p>Se você guarda funções num arquivo <code>util.py</code>, em outro arquivo na mesma pasta escreve <code>import util</code> e chama <code>util.funcao()</code>. Assim programas grandes se dividem em partes. Exercícios clássicos: restaurantes, cidades favoritas, contas bancárias, pokédex, caça-níqueis e sistema solar (inspirados em <i>The Legend of Python</i>, Codédex, MIT).</p>"
  }
 ],
 "termos": [
  [
   "Classe",
   "Molde de objetos."
  ],
  [
   "Objeto",
   "Instância de uma classe."
  ],
  [
   "Atributo",
   "Variável que pertence ao objeto."
  ],
  [
   "Método",
   "Função que pertence à classe."
  ],
  [
   "Módulo",
   "Arquivo de código reutilizável."
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
  "intro": "Crie classes e objetos, e use módulos prontos.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Python: classes e módulos",
    "instr": "Escreva o código, execute (Ctrl+Enter) e veja a saída. Os desafios são conferidos sozinhos.",
    "cfg": {
     "id": "py8",
     "inicial": "class Pessoa:\n    def __init__(self, nome):\n        self.nome = nome\n\n    def apresentar(self):\n        print(f\"Oi, eu sou {self.nome}\")\n\nPessoa(\"Ana\").apresentar()",
     "entrada": "",
     "desafios": [
      {
       "p": "Crie a classe <code>Ponto</code> com <code>x</code> e <code>y</code>. Leia dois inteiros, crie o objeto e imprima <code>(x, y)</code>.",
       "ref": "class Ponto:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nx = int(input())\ny = int(input())\np = Ponto(x, y)\nprint(f\"({p.x}, {p.y})\")",
       "testes": [
        "3\n4",
        "-1\n0"
       ],
       "exige": [
        "class\\s+Ponto",
        "__init__"
       ],
       "dica": "self.x = x.",
       "expl": "O construtor guarda os atributos."
      },
      {
       "p": "Crie <code>Retangulo(largura, altura)</code> com o método <code>area()</code> que <b>devolve</b> a área. Leia os dois valores (inteiros) e imprima a área.",
       "ref": "class Retangulo:\n    def __init__(self, largura, altura):\n        self.largura = largura\n        self.altura = altura\n\n    def area(self):\n        return self.largura * self.altura\n\nl = int(input())\na = int(input())\nprint(Retangulo(l, a).area())",
       "testes": [
        "3\n4",
        "10\n10"
       ],
       "exige": [
        "class\\s+Retangulo",
        "def\\s+area"
       ],
       "dica": "return self.largura * self.altura.",
       "expl": "O método usa os atributos do objeto."
      },
      {
       "p": "Crie <code>Conta</code> com saldo inicial 0 e os métodos <code>depositar(v)</code> e <code>sacar(v)</code> (só saca se houver saldo). Leia 3 valores: depósito, saque, saque. Imprima o saldo final.",
       "ref": "class Conta:\n    def __init__(self):\n        self.saldo = 0\n\n    def depositar(self, v):\n        self.saldo += v\n\n    def sacar(self, v):\n        if v <= self.saldo:\n            self.saldo -= v\n\nc = Conta()\nc.depositar(int(input()))\nc.sacar(int(input()))\nc.sacar(int(input()))\nprint(c.saldo)",
       "testes": [
        "100\n30\n50",
        "100\n30\n80",
        "50\n60\n10"
       ],
       "exige": [
        "class\\s+Conta",
        "def\\s+sacar"
       ],
       "dica": "if v <= self.saldo.",
       "expl": "O método protege o saldo."
      },
      {
       "p": "Use o módulo <code>math</code>: leia um número e imprima a <b>raiz quadrada</b> com 2 casas decimais.",
       "ref": "import math\nn = float(input())\nprint(f\"{math.sqrt(n):.2f}\")",
       "testes": [
        "16",
        "2",
        "100"
       ],
       "exige": [
        "math|sqrt"
       ],
       "dica": "import math; math.sqrt(n).",
       "expl": "Módulos trazem funções prontas."
      },
      {
       "p": "Crie <code>Aluno(nome, notas)</code> com o método <code>media()</code>. Leia o nome e 3 notas e imprima <code>NOME: média</code> com 1 casa decimal.",
       "ref": "class Aluno:\n    def __init__(self, nome, notas):\n        self.nome = nome\n        self.notas = notas\n\n    def media(self):\n        return sum(self.notas) / len(self.notas)\n\nn = input()\nnotas = [float(input()) for i in range(3)]\na = Aluno(n, notas)\nprint(f\"{a.nome}: {a.media():.1f}\")",
       "testes": [
        "Ana\n7\n8\n9",
        "Rui\n5\n5\n6"
       ],
       "exige": [
        "class\\s+Aluno",
        "def\\s+media"
       ],
       "dica": "sum(self.notas) / len(self.notas).",
       "expl": "Os dados e o cálculo ficam juntos."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "cl8",
    "titulo": "Classe, objeto, atributo ou método?",
    "cats": [
     "Classe",
     "Objeto",
     "Atributo",
     "Método"
    ],
    "itens": [
     [
      "Cachorro (a definição)",
      0
     ],
     [
      "rex = Cachorro(\"Rex\", 3)",
      1
     ],
     [
      "self.nome",
      2
     ],
     [
      "def latir(self):",
      3
     ],
     [
      "bia",
      1
     ],
     [
      "self.saldo",
      2
     ],
     [
      "depositar()",
      3
     ],
     [
      "class Conta:",
      0
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Crie uma classe",
    "ev": "py8:class"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de classes e módulos",
    "ev": "py8:todos"
   },
   {
    "id": "m3",
    "t": "Classifique os conceitos sem erros",
    "ev": "vis:cl8"
   }
  ],
  "guiados": [
   {
    "titulo": "Contando objetos",
    "txt": "<p><code>a = Conta(\"Ana\", 100)</code>, <code>b = Conta(\"Bia\", 50)</code>, <code>a.depositar(20)</code>.</p>",
    "passos": [
     {
      "p": "Qual o saldo de a?",
      "r": 120,
      "un": "",
      "dica": "100 + 20.",
      "expl": "Só o objeto a mudou."
     },
     {
      "p": "Qual o saldo de b?",
      "r": 50,
      "un": "",
      "dica": "b não foi alterado.",
      "expl": "Cada objeto tem o seu saldo."
     },
     {
      "p": "Quantos objetos foram criados?",
      "r": 2,
      "un": "",
      "dica": "uma chamada de Conta() por objeto.",
      "expl": "a e b."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma classe?",
   "Um molde que define os atributos e métodos dos objetos."
  ],
  [
   "O que é um objeto?",
   "Uma instância concreta criada a partir de uma classe."
  ],
  [
   "O que é um atributo?",
   "Uma variável que pertence ao objeto, como <code>self.nome</code>."
  ],
  [
   "O que é um método?",
   "Uma função definida dentro de uma classe."
  ],
  [
   "Para que serve o <code>__init__</code>?",
   "É o construtor: roda ao criar o objeto e inicializa os atributos."
  ],
  [
   "O que é o <code>self</code>?",
   "A referência ao próprio objeto dentro dos métodos."
  ],
  [
   "Como criar um objeto da classe <code>Conta</code>?",
   "<code>c = Conta(\"Ana\", 100)</code>."
  ],
  [
   "Como chamar um método?",
   "<code>objeto.metodo()</code>."
  ],
  [
   "Como nomear classes por convenção?",
   "Com inicial maiúscula (CamelCase): <code>ContaBancaria</code>."
  ],
  [
   "O que é um módulo?",
   "Um arquivo de código reutilizável importado com <code>import</code>."
  ],
  [
   "Como sortear um item de uma lista?",
   "<code>random.choice(lista)</code>."
  ],
  [
   "Como calcular raiz quadrada?",
   "<code>math.sqrt(x)</code>."
  ]
 ],
 "vf": [
  [
   "Uma classe e um objeto são a mesma coisa.",
   false,
   "A classe é o molde; o objeto é a instância."
  ],
  [
   "Dois objetos da mesma classe podem ter valores diferentes nos atributos.",
   true,
   "Cada um tem os seus."
  ],
  [
   "O primeiro parâmetro de um método é <code>self</code>.",
   true,
   "Por convenção e por necessidade."
  ],
  [
   "<code>__init__</code> precisa ser chamado manualmente.",
   false,
   "Roda automaticamente ao criar o objeto."
  ],
  [
   "Métodos podem alterar atributos do objeto.",
   true,
   "Via self."
  ],
  [
   "<code>import math</code> permite usar <code>math.sqrt(9)</code>.",
   true,
   "Devolve 3.0."
  ],
  [
   "Não é possível criar seus próprios módulos.",
   false,
   "Todo arquivo .py pode ser um módulo."
  ],
  [
   "<code>random.randint(1, 6)</code> devolve um número entre 1 e 6, inclusive.",
   true,
   "Incluindo os extremos."
  ],
  [
   "Atributos se criam com <code>self.atributo = valor</code>.",
   true,
   "Geralmente no <code>__init__</code>."
  ],
  [
   "<code>class conta:</code> é a convenção recomendada.",
   false,
   "Use maiúscula: <code>Conta</code>."
  ],
  [
   "Uma classe só pode gerar um objeto.",
   false,
   "Quantos você quiser."
  ],
  [
   "Orientação a objetos junta dados e ações num mesmo lugar.",
   true,
   "Atributos e métodos."
  ]
 ],
 "caderno": [
  [
   "Crie a classe <code>Livro</code> com título e autor e um método que mostre os dois.",
   "class Livro: def __init__(self, titulo, autor): ...; def mostrar(self): print(self.titulo, self.autor)"
  ],
  [
   "Qual a saída? <code>class A: def __init__(self, n): self.n = n</code> / <code>x = A(5); print(x.n * 2)</code>",
   "10"
  ],
  [
   "Escreva a classe <code>Cachorro</code> com <code>latir()</code> e crie dois objetos.",
   "Ver exemplo da aula: rex e bia, cada um com nome próprio."
  ],
  [
   "Por que usar <code>self.saldo</code> e não só <code>saldo</code> dentro da classe?",
   "self.saldo é do objeto; saldo seria uma variável local do método."
  ],
  [
   "Escreva <code>Conta</code> com <code>depositar</code> e <code>sacar</code> que impede saldo negativo.",
   "if valor &lt;= self.saldo: self.saldo -= valor."
  ],
  [
   "Use <code>random.choice</code> para sortear entre pedra, papel e tesoura.",
   "import random; print(random.choice([\"pedra\", \"papel\", \"tesoura\"]))"
  ],
  [
   "Calcule a área de um círculo de raio 3 com <code>math.pi</code>.",
   "import math; print(math.pi * 3 ** 2)"
  ],
  [
   "Explique em uma frase a diferença entre atributo e método.",
   "Atributo guarda um dado do objeto; método é uma ação que o objeto sabe fazer."
  ],
  [
   "Como dividir um programa em dois arquivos?",
   "Guardar funções em util.py e fazer import util no principal."
  ],
  [
   "Dê dois exemplos do mundo real que poderiam virar classes.",
   "Aluno (nome, notas), Produto (nome, preço), Veículo (placa, modelo)."
  ]
 ],
 "pbl": [
  {
   "titulo": "Pokédex simplificada",
   "cenario": "<p>O grupo quer cadastrar criaturas com nome, tipo e nível, e mostrar uma ficha formatada de cada uma.</p>",
   "passos": [
    [
     "Que classe e atributos modelam a criatura?",
     "class Criatura com nome, tipo e nivel."
    ],
    [
     "Escreva o método que devolve a ficha em texto.",
     "def ficha(self): return f\"{self.nome} ({self.tipo}) nível {self.nivel}\""
    ],
    [
     "Como guardar várias criaturas e listar todas?",
     "Uma lista de objetos e um for chamando c.ficha() em cada um."
    ]
   ]
  },
  {
   "titulo": "Caça-níqueis",
   "cenario": "<p>Um joguinho sorteia três símbolos e diz se o jogador ganhou (três iguais).</p>",
   "passos": [
    [
     "Que módulo sorteia e como?",
     "random.choice(simbolos) três vezes."
    ],
    [
     "Escreva o teste de vitória.",
     "if a == b == c: print(\"Ganhou!\") else: print(\"Tente de novo\")"
    ],
    [
     "Como transformar o jogo numa função reutilizável ou classe?",
     "Uma função jogar() que devolve o resultado, ou uma classe Maquina com o método girar()."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Classe = molde; objeto = instância; atributos guardam dados; métodos são ações.",
    "__init__ inicializa o objeto; self é o próprio objeto.",
    "import traz módulos (random, math); seus arquivos .py também são módulos."
   ]
  }
 ],
 "glossario": [
  [
   "Instância",
   "Objeto criado a partir de uma classe."
  ],
  [
   "Construtor",
   "Método __init__, que inicializa o objeto."
  ]
 ]
});
