FSI.modulo({
 "n": 4,
 "unidade": "Unidade 2",
 "nome": "Repetição: while e for",
 "titulo": "Fazer o computador repetir sem cansar",
 "duracao": "16 h",
 "resumoCurto": "Laços while e for, range, contadores e acumuladores, break e continue, laços aninhados.",
 "analogia": {
  "titulo": "Dar voltas na pista",
  "txt": "<p>Um corredor dá <b>voltas</b> na pista. Se o treino é “correr 10 voltas”, você sabe quantas vezes repetir: é o <b>for</b>. Se o treino é “correr <b>até</b> cansar”, não se sabe de antemão: é o <b>while</b>, que repete enquanto uma condição for verdadeira.</p><p>Cuidado: se a condição nunca ficar falsa, o corredor nunca para, e o programa trava num <b>laço infinito</b>.</p>"
 },
 "chave": [
  "<code>while condição:</code> repete o bloco <b>enquanto</b> a condição for verdadeira.",
  "<code>for x in range(n):</code> repete um número conhecido de vezes; <code>range(n)</code> vai de 0 a n-1.",
  "<code>range(inicio, fim, passo)</code>: o fim <b>não</b> é incluído.",
  "<b>Contador</b>: variável que soma 1 a cada volta; <b>acumulador</b>: soma valores (<code>total += x</code>).",
  "<code>break</code> sai do laço; <code>continue</code> pula para a próxima volta.",
  "No <code>while</code>, algo dentro do laço precisa mudar a condição, senão ele nunca termina.",
  "Laços podem ser <b>aninhados</b>: o de dentro roda por completo a cada volta do de fora."
 ],
 "objetivos": [
  "Escolher entre <b>while</b> e <b>for</b> conforme o problema.",
  "Usar <b>range</b>, contadores e acumuladores.",
  "Controlar o laço com <b>break</b> e <b>continue</b>.",
  "Evitar e reconhecer <b>laços infinitos</b>."
 ],
 "licoes": [
  {
   "t": "while: repetir enquanto",
   "txt": "<p>O teste vem antes de cada volta:</p><pre><code>n = 1\nwhile n &lt;= 3:\n    print(n)\n    n += 1\n# 1, 2, 3</code></pre><p>Sem <code>n += 1</code> o laço seria infinito. <code>n += 1</code> é o mesmo que <code>n = n + 1</code>.</p>",
   "pense": "o que muda se a condição começar falsa?"
  },
  {
   "t": "for e range",
   "txt": "<p>Use <code>for</code> quando souber o número de voltas:</p><pre><code>for i in range(5):\n    print(i)        # 0 1 2 3 4\nfor i in range(1, 6):\n    print(i)        # 1 2 3 4 5\nfor i in range(10, 0, -2):\n    print(i)        # 10 8 6 4 2</code></pre><p>Pode também percorrer um texto: <code>for letra in \"Ana\":</code>.</p>"
  },
  {
   "t": "Contador, acumulador, break e continue",
   "txt": "<p>Somar os números de 1 a 100:</p><pre><code>total = 0\nfor n in range(1, 101):\n    total += n\nprint(total)  # 5050</code></pre><p><code>break</code> interrompe o laço (útil em “digite a senha até acertar”); <code>continue</code> pula o resto da volta atual.</p><pre><code>while True:\n    pin = input()\n    if pin == \"1234\":\n        print(\"Acesso liberado\")\n        break\n    print(\"PIN errado\")</code></pre>"
  },
  {
   "t": "Laços aninhados e clássicos",
   "txt": "<p>Um laço dentro do outro monta tabelas e desenhos:</p><pre><code>for linha in range(1, 4):\n    for col in range(1, 4):\n        print(linha * col, end=\" \")\n    print()</code></pre><p>O <code>end=\" \"</code> troca a quebra de linha por espaço. Exercícios clássicos: digitar o PIN, adivinhar o número, 99 garrafas e FizzBuzz (inspirados na trilha <i>The Legend of Python</i>, Codédex, MIT).</p>"
  }
 ],
 "termos": [
  [
   "Laço",
   "Estrutura que repete um bloco."
  ],
  [
   "Contador",
   "Variável que conta voltas."
  ],
  [
   "Acumulador",
   "Variável que soma valores."
  ],
  [
   "Laço infinito",
   "Repetição que nunca termina."
  ],
  [
   "range",
   "Sequência de inteiros para o for."
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
  "intro": "Repita com while e for. Cuidado: laço infinito é interrompido depois de alguns segundos.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Python: laços",
    "instr": "Escreva o código, execute (Ctrl+Enter) e veja a saída. Os desafios são conferidos sozinhos.",
    "cfg": {
     "id": "py4",
     "inicial": "for i in range(3):\n    print(\"Volta\", i)",
     "entrada": "",
     "desafios": [
      {
       "p": "Imprima os números de 1 a 5, um por linha.",
       "ref": "for i in range(1, 6):\n    print(i)",
       "exige": [
        "for|while"
       ],
       "dica": "range(1, 6).",
       "expl": "O fim do range não é incluído."
      },
      {
       "p": "Leia <code>n</code> e some os inteiros de 1 até <code>n</code>. Mostre só o total.",
       "ref": "n = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    total += i\nprint(total)",
       "testes": [
        "10",
        "100",
        "1"
       ],
       "dica": "acumule em total.",
       "expl": "A soma de 1 a 100 é 5050."
      },
      {
       "p": "Leia <code>n</code> e mostre a <b>tabuada do 3</b> de 1 a <code>n</code> no formato <code>3 x 2 = 6</code>.",
       "ref": "n = int(input())\nfor i in range(1, n + 1):\n    print(f\"3 x {i} = {3 * i}\")",
       "testes": [
        "3",
        "10"
       ],
       "dica": "use f-string.",
       "expl": "Um laço monta a tabuada."
      },
      {
       "p": "Imprima FizzBuzz de 1 a 15: múltiplo de 3 → <code>Fizz</code>, de 5 → <code>Buzz</code>, de ambos → <code>FizzBuzz</code>, senão o número.",
       "ref": "for n in range(1, 16):\n    if n % 15 == 0:\n        print(\"FizzBuzz\")\n    elif n % 3 == 0:\n        print(\"Fizz\")\n    elif n % 5 == 0:\n        print(\"Buzz\")\n    else:\n        print(n)",
       "exige": [
        "for|while",
        "%"
       ],
       "dica": "teste o múltiplo de 15 primeiro.",
       "expl": "A ordem dos testes importa."
      },
      {
       "p": "Leia números até aparecer <code>0</code>. Mostre a <b>soma</b> deles (sem contar o 0). Use <code>while</code>.",
       "ref": "total = 0\nwhile True:\n    n = int(input())\n    if n == 0:\n        break\n    total += n\nprint(total)",
       "testes": [
        "5\n3\n2\n0",
        "0",
        "10\n-4\n0"
       ],
       "exige": [
        "while"
       ],
       "dica": "break sai do laço.",
       "expl": "while True com break resolve “até digitar zero”."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "cl4",
    "titulo": "while ou for?",
    "cats": [
     "while",
     "for"
    ],
    "itens": [
     [
      "Pedir a senha até o usuário acertar",
      0
     ],
     [
      "Imprimir os números de 1 a 100",
      1
     ],
     [
      "Ler notas até digitar 0",
      0
     ],
     [
      "Somar os 10 preços de uma lista",
      1
     ],
     [
      "Tocar a música até o usuário parar",
      0
     ],
     [
      "Repetir 3 vezes uma pergunta",
      1
     ],
     [
      "Jogo: continuar enquanto ainda houver vidas",
      0
     ],
     [
      "Percorrer cada letra de uma palavra",
      1
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Use um for no seu código",
    "ev": "py4:for"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de repetição",
    "ev": "py4:todos"
   },
   {
    "id": "m3",
    "t": "Escolha o laço certo sem erros",
    "ev": "vis:cl4"
   }
  ],
  "guiados": [
   {
    "titulo": "Rastreie o laço",
    "txt": "<p><code>t = 0</code><br><code>for i in range(1, 5):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;t += i</code></p>",
    "passos": [
     {
      "p": "Quantas voltas o laço dá?",
      "r": 4,
      "un": "voltas",
      "dica": "range(1, 5) vai de 1 a 4.",
      "expl": "i vale 1, 2, 3 e 4."
     },
     {
      "p": "Qual o valor final de t?",
      "r": 10,
      "un": "",
      "dica": "1 + 2 + 3 + 4.",
      "expl": "A soma é 10."
     },
     {
      "p": "Quantos números tem range(10)?",
      "r": 10,
      "un": "",
      "dica": "de 0 a 9.",
      "expl": "São 10 valores."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Quando usar <code>for</code> e quando usar <code>while</code>?",
   "<code>for</code> quando se sabe quantas voltas; <code>while</code> quando se repete até uma condição mudar."
  ],
  [
   "O que <code>range(5)</code> produz?",
   "Os inteiros 0, 1, 2, 3 e 4."
  ],
  [
   "O que <code>range(1, 6)</code> produz?",
   "1, 2, 3, 4, 5 (o fim não entra)."
  ],
  [
   "O que <code>range(10, 0, -2)</code> produz?",
   "10, 8, 6, 4, 2."
  ],
  [
   "O que é um contador?",
   "Variável que aumenta em 1 a cada volta."
  ],
  [
   "O que é um acumulador?",
   "Variável que soma valores a cada volta, como <code>total += x</code>."
  ],
  [
   "O que <code>x += 1</code> faz?",
   "Soma 1 a x (igual a <code>x = x + 1</code>)."
  ],
  [
   "O que faz o <code>break</code>?",
   "Sai imediatamente do laço."
  ],
  [
   "O que faz o <code>continue</code>?",
   "Pula o resto da volta atual e vai para a próxima."
  ],
  [
   "O que é um laço infinito?",
   "Um laço cuja condição nunca fica falsa."
  ],
  [
   "O que <code>while True:</code> significa?",
   "Repetir para sempre, até um <code>break</code>."
  ],
  [
   "O que faz <code>print(x, end=\" \")</code>?",
   "Imprime sem quebrar a linha, separando por espaço."
  ]
 ],
 "vf": [
  [
   "<code>for i in range(3)</code> executa o bloco 3 vezes.",
   true,
   "i vale 0, 1 e 2."
  ],
  [
   "<code>range(1, 5)</code> inclui o número 5.",
   false,
   "O fim é excluído."
  ],
  [
   "Um <code>while</code> cuja condição começa falsa nunca executa o bloco.",
   true,
   "O teste vem antes."
  ],
  [
   "<code>while True:</code> sem <code>break</code> termina sozinho.",
   false,
   "Seria infinito."
  ],
  [
   "<code>total += 5</code> equivale a <code>total = total + 5</code>.",
   true,
   "Atalho."
  ],
  [
   "<code>break</code> pula só a volta atual.",
   false,
   "Quem pula a volta é o continue; break sai do laço."
  ],
  [
   "É possível usar um laço dentro de outro.",
   true,
   "Laços aninhados."
  ],
  [
   "<code>for letra in \"Ana\"</code> percorre A, n, a.",
   true,
   "Texto é uma sequência de caracteres."
  ],
  [
   "O <code>while</code> não precisa de nada dentro que mude a condição.",
   false,
   "Senão vira laço infinito."
  ],
  [
   "<code>range(0)</code> produz um número.",
   false,
   "Não produz nenhum."
  ],
  [
   "Contar de 10 a 1 pode usar <code>range(10, 0, -1)</code>.",
   true,
   "Passo negativo."
  ],
  [
   "Dentro de um <code>for</code> não se pode usar <code>if</code>.",
   false,
   "Pode combinar à vontade."
  ]
 ],
 "caderno": [
  [
   "Escreva um laço que mostre os pares de 2 a 20.",
   "for i in range(2, 21, 2): print(i)"
  ],
  [
   "Qual a saída? <code>for i in range(3): print(i * 2)</code>",
   "0, 2, 4 (uma por linha)."
  ],
  [
   "Faça um programa que some os números de 1 a 100.",
   "total = 0; for n in range(1, 101): total += n; print(total) → 5050."
  ],
  [
   "Faça a contagem regressiva de 5 a 1 e depois “Fogo!”.",
   "for i in range(5, 0, -1): print(i); depois print(\"Fogo!\")."
  ],
  [
   "Programa do PIN: peça até o usuário digitar 1234.",
   "while True: pin = input(); if pin == \"1234\": break; print(\"errado\")."
  ],
  [
   "Por que este laço trava? <code>n = 1; while n &lt; 5: print(n)</code>",
   "n nunca muda; falta n += 1."
  ],
  [
   "Escreva a tabuada do 7 até 10.",
   "for i in range(1, 11): print(f\"7 x {i} = {7 * i}\")"
  ],
  [
   "Conte quantas vogais há numa palavra lida.",
   "contador = 0; for letra in palavra: if letra in \"aeiou\": contador += 1."
  ],
  [
   "Desenhe um triângulo de asteriscos com n linhas.",
   "for i in range(1, n + 1): print(\"*\" * i)"
  ],
  [
   "Quando usar continue? Dê um exemplo.",
   "Para pular um caso: ignorar números negativos numa soma (if n &lt; 0: continue)."
  ]
 ],
 "pbl": [
  {
   "titulo": "Adivinhe o número",
   "cenario": "<p>O computador sorteia um número de 1 a 10 e o jogador tenta acertar, recebendo dica de “maior” ou “menor” a cada erro.</p>",
   "passos": [
    [
     "Que tipo de laço usar e por quê?",
     "while, pois não se sabe quantas tentativas serão necessárias."
    ],
    [
     "Escreva o programa com sorteio, leitura, dicas e break ao acertar.",
     "import random; alvo = random.randint(1, 10); while True: palpite = int(input()); if palpite == alvo: break; elif palpite &lt; alvo: print(\"maior\") else: print(\"menor\")"
    ],
    [
     "Como contar as tentativas e mostrar no final?",
     "Um contador tentativas += 1 dentro do laço e print no fim."
    ]
   ]
  },
  {
   "titulo": "Média da turma",
   "cenario": "<p>A professora digita as notas de uma turma, uma por vez, e termina com -1. O programa mostra quantas notas e a média.</p>",
   "passos": [
    [
     "Quais variáveis (contador e acumulador) são necessárias?",
     "total (acumulador) e quantidade (contador)."
    ],
    [
     "Escreva o laço com sentinela (-1).",
     "while True: n = float(input()); if n == -1: break; total += n; qtd += 1"
    ],
    [
     "Como evitar divisão por zero se nenhuma nota for digitada?",
     "if qtd &gt; 0: media = total / qtd else: print(\"sem notas\")"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "for com range quando se sabe as voltas; while enquanto uma condição valer.",
    "Contador (+1) e acumulador (+valor); break sai, continue pula.",
    "Todo while precisa de algo que mude a condição."
   ]
  }
 ],
 "glossario": [
  [
   "Sentinela",
   "Valor especial que indica o fim da entrada."
  ],
  [
   "Iteração",
   "Uma volta do laço."
  ]
 ]
});
