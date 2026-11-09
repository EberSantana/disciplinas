FSI.modulo({
 "n": 7,
 "unidade": "Unidade 4",
 "nome": "Dicionários, registros, erros e arquivos",
 "titulo": "Organizar dados por nome e lidar com o inesperado",
 "duracao": "16 h",
 "resumoCurto": "Dicionários, tuplas, listas de registros, try/except e leitura e escrita de arquivos de texto.",
 "analogia": {
  "titulo": "A agenda de contatos",
  "txt": "<p>Numa agenda você procura pelo <b>nome</b>, não pela posição: “Maria” → telefone. Um <b>dicionário</b> funciona assim: cada <b>chave</b> aponta para um <b>valor</b>. Uma ficha de aluno (nome, idade, curso) é um <b>registro</b>, e uma turma é uma lista de fichas.</p><p>E a vida real é imprevisível: o usuário digita letras onde se espera número. O <b>try/except</b> é o plano B do programa, e os <b>arquivos</b> guardam dados para depois que o programa fechar.</p>"
 },
 "chave": [
  "<b>Dicionário</b>: pares chave → valor: <code>aluno = {\"nome\": \"Ana\", \"idade\": 16}</code>.",
  "Acesso <code>d[\"nome\"]</code>; <code>d.get(\"x\", padrao)</code> não dá erro se a chave não existe.",
  "<code>d.keys()</code>, <code>d.values()</code>, <code>d.items()</code> permitem percorrer o dicionário.",
  "<b>Tupla</b>: sequência imutável: <code>(10, 20)</code>.",
  "<b>Lista de dicionários</b> = tabela de registros (como linhas de uma planilha).",
  "<code>try/except</code> captura erros (<code>ValueError</code>, <code>ZeroDivisionError</code>) sem derrubar o programa.",
  "Arquivos: <code>open(nome, \"r\"/\"w\"/\"a\")</code>; use <code>with</code> para fechar sozinho."
 ],
 "objetivos": [
  "Criar e consultar <b>dicionários</b>.",
  "Montar <b>listas de registros</b> e percorrê-las.",
  "Tratar erros com <b>try/except</b>.",
  "Ler e gravar <b>arquivos</b> de texto."
 ],
 "licoes": [
  {
   "t": "Dicionários",
   "txt": "<p>Chaves em vez de posições:</p><pre><code>aluno = {\"nome\": \"Ana\", \"idade\": 16}\nprint(aluno[\"nome\"])        # Ana\naluno[\"curso\"] = \"DS\"        # adiciona\nprint(aluno.get(\"email\", \"sem e-mail\"))\nfor chave, valor in aluno.items():\n    print(chave, valor)</code></pre><p>Acessar uma chave inexistente com <code>[]</code> dá <code>KeyError</code>; <code>get</code> evita isso.</p>",
   "pense": "quando um dicionário é melhor que uma lista?"
  },
  {
   "t": "Registros e tuplas",
   "txt": "<p>Uma turma é uma lista de dicionários, como linhas de uma tabela:</p><pre><code>turma = [\n    {\"nome\": \"Ana\", \"nota\": 8},\n    {\"nome\": \"Bia\", \"nota\": 6},\n]\nfor a in turma:\n    print(a[\"nome\"], a[\"nota\"])\nmedia = sum(a[\"nota\"] for a in turma) / len(turma)</code></pre><p>A <b>tupla</b> <code>(x, y)</code> é como uma lista que não muda: boa para pares fixos, como coordenadas.</p>"
  },
  {
   "t": "Tratando erros com try/except",
   "txt": "<p>Sem tratamento, uma entrada inválida derruba o programa. Com <code>try</code>, você prevê o problema:</p><pre><code>try:\n    n = int(input())\n    print(10 / n)\nexcept ValueError:\n    print(\"Digite um número inteiro\")\nexcept ZeroDivisionError:\n    print(\"Não dá para dividir por zero\")</code></pre><p>O código do <code>try</code> roda normalmente; se ocorrer o erro nomeado, o <code>except</code> correspondente executa.</p>"
  },
  {
   "t": "Arquivos de texto",
   "txt": "<p>Com <code>with open(...)</code> o arquivo é fechado automaticamente:</p><pre><code>with open(\"notas.txt\", \"w\") as f:\n    f.write(\"Ana;8\\n\")\n    f.write(\"Bia;6\\n\")\n\nwith open(\"notas.txt\") as f:\n    for linha in f:\n        nome, nota = linha.strip().split(\";\")\n        print(nome, nota)</code></pre><p>Modos: <code>\"r\"</code> ler, <code>\"w\"</code> escrever (apaga o que havia), <code>\"a\"</code> acrescentar. No console do navegador, os arquivos existem só enquanto a página está aberta; no seu computador, ficam salvos no disco.</p>"
  }
 ],
 "termos": [
  [
   "Dicionário",
   "Coleção de pares chave: valor."
  ],
  [
   "Chave",
   "Nome usado para achar um valor."
  ],
  [
   "Registro",
   "Conjunto de campos de uma entidade, como a ficha de um aluno."
  ],
  [
   "Exceção",
   "Erro que pode ser tratado com try/except."
  ],
  [
   "with",
   "Abre e fecha o arquivo automaticamente."
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
  "intro": "Use dicionários, trate erros e grave arquivos.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Python: dicionários, erros e arquivos",
    "instr": "Escreva o código, execute (Ctrl+Enter) e veja a saída. Os desafios são conferidos sozinhos.",
    "cfg": {
     "id": "py7",
     "inicial": "aluno = {\"nome\": \"Ana\", \"nota\": 8}\nprint(aluno[\"nome\"])",
     "entrada": "",
     "desafios": [
      {
       "p": "Leia um nome e uma nota (inteira) e monte um dicionário <code>{\"nome\": ..., \"nota\": ...}</code>. Imprima <code>nome: nota</code>.",
       "ref": "nome = input()\nnota = int(input())\nd = {\"nome\": nome, \"nota\": nota}\nprint(f\"{d['nome']}: {d['nota']}\")",
       "testes": [
        "Ana\n8",
        "Rui\n10"
       ],
       "exige": [
        "\\{"
       ],
       "dica": "d[\"nome\"].",
       "expl": "Cada valor se acessa pela chave."
      },
      {
       "p": "Dada a frase lida, conte quantas vezes <b>cada palavra</b> aparece e imprima <code>palavra: quantidade</code> na ordem em que apareceram pela primeira vez.",
       "ref": "f = input().split()\nc = {}\nfor p in f:\n    c[p] = c.get(p, 0) + 1\nfor p, q in c.items():\n    print(f\"{p}: {q}\")",
       "testes": [
        "a b a c b a",
        "oi oi oi"
       ],
       "exige": [
        "get|in "
       ],
       "dica": "c.get(p, 0) + 1.",
       "expl": "get devolve 0 se a chave ainda não existe."
      },
      {
       "p": "Leia um número. Se não for inteiro, imprima <code>invalido</code>; senão, imprima o dobro. Use <code>try/except</code>.",
       "ref": "try:\n    n = int(input())\n    print(n * 2)\nexcept ValueError:\n    print(\"invalido\")",
       "testes": [
        "21",
        "abc",
        "3.5",
        "-4"
       ],
       "exige": [
        "try",
        "except"
       ],
       "dica": "except ValueError.",
       "expl": "int(\"abc\") lança ValueError."
      },
      {
       "p": "Leia dois inteiros <code>a</code> e <code>b</code> e imprima a divisão <code>a / b</code>. Se b for 0, imprima <code>divisao por zero</code>.",
       "ref": "a = int(input())\nb = int(input())\ntry:\n    print(a / b)\nexcept ZeroDivisionError:\n    print(\"divisao por zero\")",
       "testes": [
        "10\n4",
        "5\n0"
       ],
       "exige": [
        "try",
        "except"
       ],
       "dica": "except ZeroDivisionError.",
       "expl": "O erro é previsto e tratado."
      },
      {
       "p": "Grave um arquivo <code>nomes.txt</code> com as linhas <code>Ana</code> e <code>Bia</code>, depois leia e imprima o conteúdo linha a linha.",
       "ref": "with open(\"nomes.txt\", \"w\") as f:\n    f.write(\"Ana\\n\")\n    f.write(\"Bia\\n\")\nwith open(\"nomes.txt\") as f:\n    for linha in f:\n        print(linha.strip())",
       "exige": [
        "open"
       ],
       "dica": "modo \"w\" para gravar, depois leia.",
       "expl": "with fecha o arquivo sozinho."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "cl7",
    "titulo": "Que erro vai ocorrer?",
    "cats": [
     "ValueError",
     "ZeroDivisionError",
     "KeyError",
     "IndexError"
    ],
    "itens": [
     [
      "int(\"abc\")",
      0
     ],
     [
      "10 / 0",
      1
     ],
     [
      "{\"a\": 1}[\"b\"]",
      2
     ],
     [
      "[1, 2, 3][5]",
      3
     ],
     [
      "float(\"x1\")",
      0
     ],
     [
      "5 % 0",
      1
     ],
     [
      "d = {}; d[\"nome\"]",
      2
     ],
     [
      "\"oi\"[9]",
      3
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Crie um dicionário",
    "ev": "py7:dict"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios",
    "ev": "py7:todos"
   },
   {
    "id": "m3",
    "t": "Identifique os erros sem falhas",
    "ev": "vis:cl7"
   }
  ],
  "guiados": [
   {
    "titulo": "Lendo um dicionário",
    "txt": "<p><code>p = {\"a\": 3, \"b\": 5, \"c\": 2}</code></p>",
    "passos": [
     {
      "p": "Quantas chaves tem p?",
      "r": 3,
      "un": "",
      "dica": "a, b, c.",
      "expl": "len(p) = 3."
     },
     {
      "p": "Quanto vale p[\"b\"]?",
      "r": 5,
      "un": "",
      "dica": "chave b.",
      "expl": "É 5."
     },
     {
      "p": "Qual a soma dos valores?",
      "r": 10,
      "un": "",
      "dica": "3+5+2.",
      "expl": "sum(p.values()) = 10."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é um dicionário?",
   "Uma coleção de pares chave → valor, entre chaves <code>{}</code>."
  ],
  [
   "Como acessar o valor de uma chave?",
   "<code>d[\"chave\"]</code> ou <code>d.get(\"chave\")</code>."
  ],
  [
   "Qual a vantagem do <code>get</code>?",
   "Não dá erro se a chave não existe; devolve <code>None</code> ou o padrão informado."
  ],
  [
   "Que erro ocorre ao pedir uma chave inexistente com <code>[]</code>?",
   "<code>KeyError</code>."
  ],
  [
   "O que faz <code>d.items()</code>?",
   "Devolve os pares (chave, valor) para percorrer."
  ],
  [
   "O que é uma tupla?",
   "Uma sequência imutável, como <code>(3, 4)</code>."
  ],
  [
   "O que é uma lista de dicionários?",
   "Uma tabela de registros: cada dicionário é uma linha."
  ],
  [
   "Para que serve <code>try/except</code>?",
   "Capturar um erro e tratar, sem derrubar o programa."
  ],
  [
   "Que erro ocorre em <code>int(\"abc\")</code>?",
   "<code>ValueError</code>."
  ],
  [
   "Que erro ocorre em <code>10 / 0</code>?",
   "<code>ZeroDivisionError</code>."
  ],
  [
   "Para que serve <code>with open(...)</code>?",
   "Abrir um arquivo e fechá-lo automaticamente ao terminar."
  ],
  [
   "O que fazem os modos <code>\"r\"</code>, <code>\"w\"</code> e <code>\"a\"</code>?",
   "Ler, escrever (apagando) e acrescentar ao final."
  ]
 ],
 "vf": [
  [
   "Dicionários acessam valores por posição numérica.",
   false,
   "Acessam pela chave."
  ],
  [
   "<code>{\"a\": 1}[\"b\"]</code> dá <code>KeyError</code>.",
   true,
   "A chave não existe."
  ],
  [
   "<code>d.get(\"b\", 0)</code> devolve 0 se b não existir.",
   true,
   "É o valor padrão."
  ],
  [
   "Tuplas podem ser alteradas depois de criadas.",
   false,
   "São imutáveis."
  ],
  [
   "O bloco <code>except</code> roda sempre, mesmo sem erro.",
   false,
   "Só roda se ocorrer o erro previsto."
  ],
  [
   "<code>int(\"12\")</code> dá <code>ValueError</code>.",
   false,
   "Converte para 12."
  ],
  [
   "O modo <code>\"w\"</code> apaga o conteúdo anterior do arquivo.",
   true,
   "Use <code>\"a\"</code> para acrescentar."
  ],
  [
   "Arquivos abertos com <code>with</code> fecham sozinhos.",
   true,
   "Ao sair do bloco."
  ],
  [
   "Uma chave de dicionário pode se repetir com valores diferentes.",
   false,
   "A segunda sobrescreve a primeira."
  ],
  [
   "Uma lista de dicionários representa bem uma tabela de alunos.",
   true,
   "Cada dicionário é um registro."
  ],
  [
   "<code>try</code> sem <code>except</code> é válido sozinho.",
   false,
   "Precisa de <code>except</code> (ou <code>finally</code>)."
  ],
  [
   "<code>for k, v in d.items():</code> percorre chaves e valores.",
   true,
   "Desempacota cada par."
  ]
 ],
 "caderno": [
  [
   "Crie um dicionário com nome, idade e curso e mostre cada campo.",
   "p = {\"nome\": \"Ana\", \"idade\": 16, \"curso\": \"DS\"}; for k, v in p.items(): print(k, v)"
  ],
  [
   "Qual a saída? <code>d = {\"x\": 1}; d[\"y\"] = 2; print(len(d))</code>",
   "2"
  ],
  [
   "Conte letras de uma palavra usando dicionário.",
   "c = {}; for l in palavra: c[l] = c.get(l, 0) + 1"
  ],
  [
   "Escreva um try/except para ler um inteiro com segurança.",
   "try: n = int(input()) except ValueError: print(\"inválido\")"
  ],
  [
   "Dada a lista de alunos (dicionários), mostre o de maior nota.",
   "melhor = max(turma, key=lambda a: a[\"nota\"]) (ou laço com comparação)."
  ],
  [
   "Por que <code>d[\"z\"]</code> dá erro e <code>d.get(\"z\")</code> não?",
   "[] levanta KeyError; get devolve None."
  ],
  [
   "Grave 3 nomes em um arquivo, um por linha.",
   "with open(\"n.txt\", \"w\") as f: for n in nomes: f.write(n + \"\\n\")"
  ],
  [
   "Leia um arquivo e conte as linhas.",
   "with open(\"n.txt\") as f: print(len(f.readlines()))"
  ],
  [
   "Qual a diferença entre os modos \"w\" e \"a\"?",
   "w apaga e escreve; a acrescenta ao final."
  ],
  [
   "Dê um exemplo em que try/except melhora a experiência do usuário.",
   "Pedir idade: se digitar letras, mostrar “digite um número” e pedir de novo, em vez de travar."
  ]
 ],
 "pbl": [
  {
   "titulo": "Agenda de contatos",
   "cenario": "<p>O grupo quer uma agenda em que se digita o nome e o programa mostra o telefone, ou avisa que não existe.</p>",
   "passos": [
    [
     "Que estrutura guarda os contatos?",
     "Um dicionário nome → telefone."
    ],
    [
     "Escreva a busca segura.",
     "tel = agenda.get(nome); if tel: print(tel) else: print(\"não encontrado\")"
    ],
    [
     "Como salvar a agenda num arquivo e carregá-la depois?",
     "Gravar uma linha nome;telefone por contato e, ao abrir, ler as linhas e montar o dicionário com split(\";\")."
    ]
   ]
  },
  {
   "titulo": "Controle de estoque da cantina",
   "cenario": "<p>A cantina quer registrar produtos (nome, preço, quantidade), vender e avisar quando faltar.</p>",
   "passos": [
    [
     "Modele o estoque.",
     "Lista de dicionários: {\"nome\": ..., \"preco\": ..., \"qtd\": ...}."
    ],
    [
     "Escreva a função vender(nome, n) que trata o estoque insuficiente.",
     "Procura o produto; if p[\"qtd\"] &gt;= n: p[\"qtd\"] -= n else: print(\"estoque insuficiente\")."
    ],
    [
     "Como tratar quando o usuário digita uma quantidade não numérica?",
     "try/except ValueError ao converter com int()."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Dicionário = chave → valor; get evita KeyError; lista de dicionários = tabela.",
    "try/except trata erros previstos (ValueError, ZeroDivisionError).",
    "with open(...) lê e grava arquivos; modos r, w, a."
   ]
  }
 ],
 "glossario": [
  [
   "Exceção",
   "Erro em tempo de execução que pode ser capturado."
  ],
  [
   "Registro",
   "Conjunto de campos que descreve uma coisa."
  ]
 ]
});
