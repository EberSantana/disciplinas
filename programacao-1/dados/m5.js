FSI.modulo({
 "n": 5,
 "unidade": "Unidade 3",
 "nome": "Listas, matrizes e strings",
 "titulo": "Guardar vários valores numa só variável",
 "duracao": "16 h",
 "resumoCurto": "Listas e seus métodos, índices e fatias, percorrer listas, matrizes (listas de listas) e operações com strings.",
 "analogia": {
  "titulo": "A prateleira numerada",
  "txt": "<p>Uma <b>lista</b> é uma prateleira com compartimentos numerados a partir do <b>zero</b>: o primeiro item está na posição 0. Em vez de criar <code>nota1</code>, <code>nota2</code>, <code>nota3</code>…, você guarda tudo numa prateleira só e percorre com um laço. Uma <b>matriz</b> é um armário: prateleiras dentro de prateleiras, com linha e coluna.</p><p>Um texto (<b>string</b>) também é uma fileira de caracteres numerados, então quase tudo que vale para listas vale para ele.</p>"
 },
 "chave": [
  "<b>Lista</b>: coleção ordenada e mutável: <code>nomes = [\"Ana\", \"Bia\"]</code>.",
  "Índices começam em <b>0</b>; o <b>-1</b> é o último item.",
  "Métodos: <code>append</code>, <code>insert</code>, <code>remove</code>, <code>pop</code>, <code>sort</code>, <code>reverse</code>, <code>len()</code>, <code>sum()</code>.",
  "<b>Fatias</b>: <code>lista[1:3]</code> pega do índice 1 até o 2.",
  "<code>for item in lista:</code> percorre; <code>x in lista</code> verifica se existe.",
  "<b>Matriz</b>: lista de listas; acesso por <code>m[linha][coluna]</code>.",
  "Strings: <code>upper</code>, <code>lower</code>, <code>strip</code>, <code>replace</code>, <code>split</code>, <code>join</code>; são <b>imutáveis</b>."
 ],
 "objetivos": [
  "Criar e modificar <b>listas</b> com seus métodos.",
  "Acessar elementos por <b>índice</b> e <b>fatia</b>.",
  "Trabalhar com <b>matrizes</b>.",
  "Aplicar métodos de <b>string</b> para tratar texto."
 ],
 "licoes": [
  {
   "t": "Criando e acessando listas",
   "txt": "<p>Colchetes criam a lista; o índice acessa:</p><pre><code>frutas = [\"maçã\", \"banana\", \"uva\"]\nprint(frutas[0])    # maçã\nprint(frutas[-1])   # uva\nprint(len(frutas))  # 3\nfrutas[1] = \"pera\"  # lista é mutável</code></pre><p>Acessar um índice que não existe causa <code>IndexError</code>.</p>",
   "pense": "qual o índice do último item de uma lista de 10 elementos?"
  },
  {
   "t": "Métodos úteis",
   "txt": "",
   "pontos": [
    "<code>lista.append(x)</code> adiciona no final; <code>insert(i, x)</code> na posição i.",
    "<code>remove(x)</code> tira o primeiro x; <code>pop()</code> tira (e devolve) o último.",
    "<code>sort()</code> ordena a própria lista; <code>sorted(lista)</code> devolve uma cópia ordenada.",
    "<code>sum(lista)</code>, <code>max(lista)</code>, <code>min(lista)</code>, <code>len(lista)</code>.",
    "<code>x in lista</code> responde True ou False.",
    "Fatias: <code>lista[:2]</code> (dois primeiros), <code>lista[-2:]</code> (dois últimos), <code>lista[::-1]</code> (invertida)."
   ]
  },
  {
   "t": "Percorrer e matrizes",
   "txt": "<p>Com laço, trate cada item:</p><pre><code>notas = [7, 5.5, 9]\ntotal = 0\nfor n in notas:\n    total += n\nprint(total / len(notas))</code></pre><p>Uma matriz é uma lista de listas:</p><pre><code>m = [[1, 2, 3],\n     [4, 5, 6]]\nprint(m[1][2])  # 6 (linha 1, coluna 2)\nfor linha in m:\n    print(linha)</code></pre>"
  },
  {
   "t": "Strings como sequências",
   "txt": "<p>O texto também tem índice e fatia: <code>\"Python\"[0]</code> é <code>P</code>. Métodos principais:</p><pre><code>s = \"  Olá, Mundo  \"\nprint(s.strip())            # Olá, Mundo\nprint(s.strip().upper())    # OLÁ, MUNDO\nprint(\"a,b,c\".split(\",\"))   # ['a', 'b', 'c']\nprint(\"-\".join([\"a\", \"b\"])) # a-b</code></pre><p>Strings são <b>imutáveis</b>: os métodos devolvem um texto novo. Exercícios clássicos: lista de compras, to-do, inventário e mixtape (inspirados em <i>The Legend of Python</i>, Codédex, MIT).</p>"
  }
 ],
 "termos": [
  [
   "Lista",
   "Coleção ordenada e mutável de valores."
  ],
  [
   "Índice",
   "Posição de um item, a partir de 0."
  ],
  [
   "Fatia",
   "Pedaço da lista: lista[a:b]."
  ],
  [
   "Matriz",
   "Lista de listas."
  ],
  [
   "Imutável",
   "Não pode ser alterado no lugar (como string)."
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
  "intro": "Manipule listas e textos. Os testes enviam entradas diferentes para o seu código.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Python: listas e strings",
    "instr": "Escreva o código, execute (Ctrl+Enter) e veja a saída. Os desafios são conferidos sozinhos.",
    "cfg": {
     "id": "py5",
     "inicial": "compras = [\"pão\", \"leite\"]\ncompras.append(\"ovos\")\nprint(compras)\nprint(len(compras))",
     "entrada": "",
     "desafios": [
      {
       "p": "Leia 3 números inteiros (um por linha), guarde numa lista e mostre a <b>soma</b>.",
       "ref": "nums = []\nfor i in range(3):\n    nums.append(int(input()))\nprint(sum(nums))",
       "testes": [
        "1\n2\n3",
        "10\n-5\n7"
       ],
       "dica": "append dentro de um for.",
       "expl": "append adiciona ao final."
      },
      {
       "p": "Dada <code>lista = [4, 9, 1, 7]</code>, imprima o <b>maior</b> e o <b>menor</b>, cada um em uma linha.",
       "ref": "lista = [4, 9, 1, 7]\nprint(max(lista))\nprint(min(lista))",
       "exige": [
        "max|min|sort"
       ],
       "dica": "max() e min().",
       "expl": "Funções prontas para listas."
      },
      {
       "p": "Leia uma palavra e mostre-a <b>invertida</b>.",
       "ref": "p = input()\nprint(p[::-1])",
       "testes": [
        "python",
        "ana",
        "radar"
       ],
       "dica": "fatia com passo -1.",
       "expl": "[::-1] inverte a sequência."
      },
      {
       "p": "Leia uma frase e mostre <b>quantas palavras</b> ela tem (separadas por espaço).",
       "ref": "f = input()\nprint(len(f.split()))",
       "testes": [
        "bom dia turma",
        "oi",
        "uma frase com cinco palavras"
       ],
       "dica": "split() divide em palavras.",
       "expl": "len de uma lista de palavras."
      },
      {
       "p": "Leia uma palavra e mostre quantas <b>vogais</b> (a, e, i, o, u, minúsculas) ela tem.",
       "ref": "p = input()\nc = 0\nfor l in p:\n    if l in \"aeiou\":\n        c += 1\nprint(c)",
       "testes": [
        "banana",
        "sol",
        "aeiou"
       ],
       "dica": "for letra in p com um contador.",
       "expl": "Strings também se percorrem com for."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "cl5",
    "titulo": "Lista [10, 20, 30, 40]: qual o resultado?",
    "cats": [
     "10",
     "20",
     "40",
     "[20, 30]"
    ],
    "itens": [
     [
      "lista[0]",
      0
     ],
     [
      "lista[1]",
      1
     ],
     [
      "lista[-1]",
      2
     ],
     [
      "lista[1:3]",
      3
     ],
     [
      "lista[len(lista) - 1]",
      2
     ],
     [
      "lista[3]",
      2
     ],
     [
      "lista[-4]",
      0
     ],
     [
      "lista[1:2][0]",
      1
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Crie uma lista no seu código",
    "ev": "py5:lista"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de listas e strings",
    "ev": "py5:todos"
   },
   {
    "id": "m3",
    "t": "Acerte os índices e fatias",
    "ev": "vis:cl5"
   }
  ],
  "guiados": [
   {
    "titulo": "Índices e tamanhos",
    "txt": "<p><code>t = [5, 8, 2, 9, 1]</code></p>",
    "passos": [
     {
      "p": "Quantos elementos tem t (len)?",
      "r": 5,
      "un": "",
      "dica": "conte.",
      "expl": "len(t) = 5."
     },
     {
      "p": "Qual o valor de t[2]?",
      "r": 2,
      "un": "",
      "dica": "o índice começa em 0.",
      "expl": "t[2] é o terceiro item."
     },
     {
      "p": "Qual o valor de t[-1]?",
      "r": 1,
      "un": "",
      "dica": "-1 é o último.",
      "expl": "O último elemento é 1."
     },
     {
      "p": "Qual a soma de t?",
      "r": 25,
      "un": "",
      "dica": "5+8+2+9+1.",
      "expl": "sum(t) = 25."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é uma lista?",
   "Uma coleção ordenada e mutável de valores, entre colchetes."
  ],
  [
   "Em que índice começa uma lista?",
   "No 0."
  ],
  [
   "O que é o índice <code>-1</code>?",
   "O último elemento."
  ],
  [
   "O que faz <code>append(x)</code>?",
   "Adiciona x no final da lista."
  ],
  [
   "Como remover o último item?",
   "<code>lista.pop()</code>."
  ],
  [
   "Como remover um valor específico?",
   "<code>lista.remove(valor)</code>."
  ],
  [
   "O que <code>len(lista)</code> devolve?",
   "A quantidade de elementos."
  ],
  [
   "O que <code>lista[1:3]</code> devolve?",
   "Os elementos dos índices 1 e 2."
  ],
  [
   "Como inverter uma lista ou texto com fatia?",
   "<code>x[::-1]</code>."
  ],
  [
   "O que é uma matriz em Python?",
   "Uma lista de listas; acessa-se com <code>m[linha][coluna]</code>."
  ],
  [
   "Para que serve <code>split()</code>?",
   "Divide um texto em uma lista de pedaços."
  ],
  [
   "Strings podem ser alteradas no lugar?",
   "Não: são imutáveis; os métodos devolvem um texto novo."
  ]
 ],
 "vf": [
  [
   "O primeiro elemento de uma lista está no índice 1.",
   false,
   "Está no 0."
  ],
  [
   "<code>lista[-1]</code> é o último elemento.",
   true,
   "Índice negativo conta do fim."
  ],
  [
   "Acessar <code>lista[10]</code> numa lista de 3 itens dá <code>IndexError</code>.",
   true,
   "Índice fora do limite."
  ],
  [
   "<code>append</code> coloca o item no início da lista.",
   false,
   "Coloca no final."
  ],
  [
   "<code>\"banana\"[0]</code> é <code>\"b\"</code>.",
   true,
   "Strings têm índices."
  ],
  [
   "<code>sort()</code> devolve uma nova lista e não altera a original.",
   false,
   "Altera a própria lista; <code>sorted()</code> devolve cópia."
  ],
  [
   "<code>\"a b c\".split()</code> devolve <code>['a', 'b', 'c']</code>.",
   true,
   "Divide por espaços."
  ],
  [
   "<code>m[1][0]</code> acessa a linha 1, coluna 0 da matriz.",
   true,
   "Primeiro a linha, depois a coluna."
  ],
  [
   "Uma lista pode misturar tipos, como <code>[1, \"a\", True]</code>.",
   true,
   "Em Python pode."
  ],
  [
   "<code>\"Olá\".upper()</code> altera a variável original.",
   false,
   "Devolve um texto novo."
  ],
  [
   "<code>x in lista</code> devolve True se x estiver na lista.",
   true,
   "Teste de pertinência."
  ],
  [
   "<code>lista[2:4]</code> inclui o índice 4.",
   false,
   "O fim não é incluído."
  ]
 ],
 "caderno": [
  [
   "Crie a lista de compras com 4 itens e mostre o segundo e o último.",
   "compras = [\"pão\", \"leite\", \"ovos\", \"café\"]; print(compras[1], compras[-1])"
  ],
  [
   "Qual a saída? <code>n = [3, 1, 2]; n.sort(); print(n)</code>",
   "[1, 2, 3]"
  ],
  [
   "Escreva um programa que leia 5 notas e mostre a média.",
   "notas = []; for i in range(5): notas.append(float(input())); print(sum(notas) / len(notas))"
  ],
  [
   "Como saber se “ovos” está na lista de compras?",
   "if \"ovos\" in compras: ..."
  ],
  [
   "Escreva um to-do: adicione 3 tarefas e mostre numeradas.",
   "for i, t in enumerate(tarefas, 1): print(i, t) (ou usar um contador)."
  ],
  [
   "Dada <code>m = [[1,2],[3,4]]</code>, o que é <code>m[1][0]</code>?",
   "3"
  ],
  [
   "Some todos os elementos de uma matriz 2x2.",
   "for linha in m: for x in linha: total += x → 10."
  ],
  [
   "Transforme <code>\"  Ana  \"</code> em <code>\"ANA\"</code>.",
   "\"  Ana  \".strip().upper()"
  ],
  [
   "Troque todos os espaços de uma frase por hífen.",
   "frase.replace(\" \", \"-\")"
  ],
  [
   "Por que <code>s[0] = \"X\"</code> dá erro numa string?",
   "Strings são imutáveis; é preciso criar outro texto: \"X\" + s[1:]."
  ]
 ],
 "pbl": [
  {
   "titulo": "Boletim da turma",
   "cenario": "<p>A professora quer guardar as notas de 5 alunos, mostrar a média, a maior nota e quantos ficaram acima da média.</p>",
   "passos": [
    [
     "Que estrutura guarda as notas e como preenchê-la?",
     "Uma lista; ler com um for de 5 voltas e append."
    ],
    [
     "Calcule média, maior nota e quantidade acima da média.",
     "media = sum(n)/len(n); maior = max(n); acima = quantos x &gt; media."
    ],
    [
     "Mostre o resultado formatado.",
     "print(f\"Média {media:.1f} | maior {maior} | acima da média: {acima}\")"
    ]
   ]
  },
  {
   "titulo": "Tratando textos de cadastro",
   "cenario": "<p>Os nomes chegam do formulário com espaços sobrando e letras misturadas, como “  mARIA silva ”.</p>",
   "passos": [
    [
     "Que métodos limpam e padronizam o nome?",
     "strip() e title()."
    ],
    [
     "Escreva o código e teste com o exemplo.",
     "nome = \"  mARIA silva \".strip().title() → \"Maria Silva\""
    ],
    [
     "Como separar nome e sobrenome em duas variáveis?",
     "partes = nome.split(); primeiro = partes[0]; ultimo = partes[-1]."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Listas: índice a partir de 0, fatias, append/remove/pop/sort.",
    "for percorre listas e textos; matriz = lista de listas.",
    "Strings são imutáveis; métodos como strip, upper, split e join devolvem novos valores."
   ]
  }
 ],
 "glossario": [
  [
   "Fatia",
   "Trecho de uma sequência, como lista[1:3]."
  ],
  [
   "Mutável",
   "Que pode ser modificado no lugar."
  ]
 ]
});
