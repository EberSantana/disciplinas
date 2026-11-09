FSI.modulo({
 "n": 1,
 "unidade": "Unidade 1",
 "nome": "Como a web funciona",
 "titulo": "Cliente, servidor, HTTP e a arquitetura em camadas",
 "duracao": "16 h",
 "resumoCurto": "Modelo cliente-servidor, URL, requisição e resposta HTTP, métodos, códigos de status, cabeçalhos e visão geral do MVC.",
 "analogia": {
  "titulo": "O restaurante",
  "txt": "<p>Você (o <b>cliente</b>) chega ao restaurante, olha o cardápio e faz um <b>pedido</b> ao garçom. A cozinha (o <b>servidor</b>) prepara e o garçom traz a <b>resposta</b>: o prato, ou um aviso (“acabou”, “não temos isso”). A web é igual: o navegador pede, o servidor responde.</p><p>O pedido e a resposta seguem um <b>protocolo</b>, como a etiqueta do restaurante: o <b>HTTP</b>. Quem programa o back-end escreve a cozinha: decide o que fazer com cada pedido.</p>"
 },
 "chave": [
  "<b>Cliente-servidor:</b> o cliente (navegador, app) envia <b>requisições</b>; o servidor devolve <b>respostas</b>.",
  "Uma <b>URL</b> tem esquema, host, caminho e parâmetros: <code>https://site.com/produtos?cat=livros</code>.",
  "A requisição HTTP tem <b>linha inicial</b> (método + caminho + versão), <b>cabeçalhos</b> e, às vezes, <b>corpo</b>.",
  "Métodos principais: <code>GET</code> (ler), <code>POST</code> (criar), <code>PUT</code>/<code>PATCH</code> (alterar), <code>DELETE</code> (apagar).",
  "A resposta traz um <b>código de status</b>: 2xx sucesso, 3xx redirecionamento, 4xx erro do cliente, 5xx erro do servidor.",
  "HTTP é <b>sem estado</b>: cada requisição é independente. Cookies e sessões (módulo 5) resolvem isso.",
  "O back-end organiza o código em camadas: <b>Model</b> (dados), <b>View</b> (apresentação) e <b>Controller</b> (lógica de cada rota)."
 ],
 "objetivos": [
  "Explicar o modelo <b>cliente-servidor</b> e o ciclo requisição/resposta.",
  "Ler e montar uma <b>requisição</b> e uma <b>resposta HTTP</b>.",
  "Escolher o <b>método</b> e o <b>status</b> adequados a cada situação.",
  "Descrever o padrão <b>MVC</b>."
 ],
 "licoes": [
  {
   "t": "Cliente, servidor e URL",
   "txt": "<p>Quando você digita um endereço, o navegador (cliente) abre uma conexão com o servidor e envia uma <b>requisição</b>. O servidor processa e devolve uma <b>resposta</b> com o conteúdo (HTML, JSON, imagem…).</p><pre><code>https://loja.com:443/produtos/10?cor=azul#fotos\n|_____| |_______| |_| |__________| |_______| |____|\nesquema   host   porta   caminho     consulta  âncora</code></pre><p>O caminho identifica o <b>recurso</b>; a consulta (<i>query string</i>) passa parâmetros opcionais. A âncora (#) fica só no navegador.</p>",
   "pense": "por que a âncora (#fotos) não é enviada ao servidor?"
  },
  {
   "t": "Anatomia de uma requisição e de uma resposta",
   "txt": "<p>HTTP é um protocolo de texto. Veja uma requisição e a resposta:</p><pre><code>GET /produtos/10 HTTP/1.1\nHost: loja.com\nAccept: text/html\n\nHTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nContent-Length: 27\n\n&lt;h1&gt;Camiseta azul&lt;/h1&gt;</code></pre><p>A primeira linha da requisição tem <b>método</b>, <b>caminho</b> e <b>versão</b>. Depois vêm os <b>cabeçalhos</b>, uma linha em branco e o <b>corpo</b> (vazio em GET). A resposta começa com a <b>linha de status</b>.</p>"
  },
  {
   "t": "Métodos e códigos de status",
   "txt": "<p>O método diz a <b>intenção</b>; o status diz o <b>resultado</b>.</p><ul><li><b>GET</b>: lê, não altera nada (seguro).</li><li><b>POST</b>: cria ou envia dados (formulário de cadastro).</li><li><b>PUT/PATCH</b>: substitui/altera um recurso.</li><li><b>DELETE</b>: remove.</li></ul><p>Status que você vai usar sempre: <b>200</b> OK, <b>201</b> criado, <b>204</b> sem conteúdo, <b>301/302</b> redirecionamento, <b>400</b> requisição inválida, <b>401</b> não autenticado, <b>403</b> sem permissão, <b>404</b> não encontrado, <b>405</b> método não permitido, <b>500</b> erro no servidor.</p>"
  },
  {
   "t": "Camadas e MVC",
   "txt": "<p>Um sistema web cresce rápido. Para não virar bagunça, separamos responsabilidades:</p><ul><li><b>Model</b>: regras e acesso aos dados (usuários, produtos).</li><li><b>View</b>: o que o usuário vê (HTML, JSON).</li><li><b>Controller</b>: recebe a requisição, usa o model e escolhe a view.</li></ul><p>Em Flask, a função ligada a uma rota faz o papel do controller. Você vai construir isso passo a passo nos próximos módulos.</p>"
  }
 ],
 "termos": [
  [
   "Cliente",
   "Quem faz o pedido (navegador, app)."
  ],
  [
   "Servidor",
   "Programa que recebe pedidos e responde."
  ],
  [
   "HTTP",
   "Protocolo de comunicação da web."
  ],
  [
   "Requisição",
   "Pedido enviado pelo cliente."
  ],
  [
   "Resposta",
   "Retorno do servidor, com status, cabeçalhos e corpo."
  ],
  [
   "Status",
   "Número de 3 dígitos que resume o resultado."
  ],
  [
   "MVC",
   "Padrão que separa dados, apresentação e controle."
  ]
 ],
 "ler": [
  [
   "Flask (documentação oficial)",
   "https://flask.palletsprojects.com/"
  ],
  [
   "MDN: Visão geral do HTTP",
   "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview"
  ],
  [
   "OWASP Top 10",
   "https://owasp.org/www-project-top-ten/"
  ]
 ],
 "lab": {
  "intro": "Aqui o HTTP é só texto, então vamos manipulá-lo com Python puro: montar e ler requisições e respostas.",
  "sims": [
   {
    "tipo": "python",
    "titulo": "Console Python: HTTP é texto",
    "instr": "Escreva o código, execute (Ctrl+Enter) e veja a saída. Os desafios são conferidos sozinhos.",
    "cfg": {
     "id": "pw1",
     "inicial": "req = \"GET /produtos/10 HTTP/1.1\\nHost: loja.com\"\nlinha = req.split(\"\\n\")[0]\nmetodo, caminho, versao = linha.split(\" \")\nprint(metodo, caminho)",
     "entrada": "",
     "desafios": [
      {
       "p": "Leia uma <b>linha de requisição</b> (ex.: <code>GET /sobre HTTP/1.1</code>) e imprima só o método.",
       "ref": "linha = input()\nprint(linha.split(\" \")[0])",
       "testes": [
        "GET /sobre HTTP/1.1",
        "POST /login HTTP/1.1"
       ],
       "exige": [
        "split"
       ],
       "dica": "split(\" \") separa em 3 partes.",
       "expl": "O método é a primeira palavra."
      },
      {
       "p": "Leia a linha da requisição e imprima o <b>caminho</b> sem a query string (tudo antes do <code>?</code>).",
       "ref": "linha = input()\ncaminho = linha.split(\" \")[1]\nprint(caminho.split(\"?\")[0])",
       "testes": [
        "GET /busca?q=python HTTP/1.1",
        "GET /sobre HTTP/1.1"
       ],
       "exige": [
        "split"
       ],
       "dica": "split(\"?\")[0].",
       "expl": "A consulta começa no ponto de interrogação."
      },
      {
       "p": "Leia um caminho com query (ex.: <code>/busca?q=flask&pg=2</code>) e imprima cada parâmetro como <code>chave=valor</code>, um por linha.",
       "ref": "p = input()\nq = p.split(\"?\")[1]\nfor par in q.split(\"&\"):\n    print(par)",
       "testes": [
        "/busca?q=flask&pg=2",
        "/x?a=1"
       ],
       "exige": [
        "split"
       ],
       "dica": "split(\"&\") separa os pares.",
       "expl": "Cada par é chave=valor."
      },
      {
       "p": "Leia um <b>código de status</b> e imprima a classe: <code>sucesso</code> (2xx), <code>redirecionamento</code> (3xx), <code>erro do cliente</code> (4xx), <code>erro do servidor</code> (5xx).",
       "ref": "s = int(input())\nif 200 <= s < 300:\n    print(\"sucesso\")\nelif 300 <= s < 400:\n    print(\"redirecionamento\")\nelif 400 <= s < 500:\n    print(\"erro do cliente\")\nelse:\n    print(\"erro do servidor\")",
       "testes": [
        "200",
        "404",
        "302",
        "500",
        "201"
       ],
       "exige": [
        "if"
       ],
       "dica": "Compare com faixas: 200 <= s < 300.",
       "expl": "A centena indica a classe."
      },
      {
       "p": "Monte e imprima uma resposta: leia o status (200 ou 404) e o corpo. Saída: a linha <code>HTTP/1.1 200 OK</code> (ou <code>404 Not Found</code>), depois <code>Content-Length: N</code> (tamanho do corpo), uma linha em branco e o corpo.",
       "ref": "s = int(input())\ncorpo = input()\nfrase = {200: \"OK\", 404: \"Not Found\"}[s]\nprint(f\"HTTP/1.1 {s} {frase}\")\nprint(f\"Content-Length: {len(corpo)}\")\nprint()\nprint(corpo)",
       "testes": [
        "200\n<h1>Oi</h1>",
        "404\nNão achei"
       ],
       "exige": [
        "Content-Length"
       ],
       "dica": "len(corpo) dá o tamanho; print() sozinho faz a linha em branco.",
       "expl": "Status, cabeçalhos, linha em branco, corpo."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "cl1",
    "titulo": "Qual método HTTP?",
    "cats": [
     "GET",
     "POST",
     "PUT / PATCH",
     "DELETE"
    ],
    "itens": [
     [
      "Abrir a página de um produto",
      0
     ],
     [
      "Enviar o formulário de cadastro",
      1
     ],
     [
      "Alterar o preço de um produto existente",
      2
     ],
     [
      "Remover um comentário",
      3
     ],
     [
      "Buscar a lista de pedidos",
      0
     ],
     [
      "Criar um novo pedido",
      1
     ],
     [
      "Atualizar o e-mail do perfil",
      2
     ],
     [
      "Excluir a conta",
      3
     ]
    ]
   },
   {
    "tipo": "classificar",
    "id": "cl1b",
    "titulo": "Qual a classe do status?",
    "cats": [
     "2xx sucesso",
     "3xx redireciona",
     "4xx erro do cliente",
     "5xx erro do servidor"
    ],
    "itens": [
     [
      "200 OK",
      0
     ],
     [
      "201 Created",
      0
     ],
     [
      "302 Found",
      1
     ],
     [
      "301 Moved Permanently",
      1
     ],
     [
      "404 Not Found",
      2
     ],
     [
      "403 Forbidden",
      2
     ],
     [
      "401 Unauthorized",
      2
     ],
     [
      "500 Internal Server Error",
      3
     ],
     [
      "503 Service Unavailable",
      3
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Rode seu primeiro código",
    "ev": "pw1:rodou"
   },
   {
    "id": "m2",
    "t": "Cumpra os 5 desafios de HTTP",
    "ev": "pw1:todos"
   },
   {
    "id": "m3",
    "t": "Classifique os métodos HTTP",
    "ev": "vis:cl1"
   },
   {
    "id": "m4",
    "t": "Classifique os status",
    "ev": "vis:cl1b"
   }
  ],
  "guiados": [
   {
    "titulo": "Lendo uma requisição",
    "txt": "<p><code>POST /clientes HTTP/1.1</code> com cabeçalho <code>Content-Type: application/json</code> e corpo <code>{\"nome\": \"Ana\"}</code>.</p>",
    "passos": [
     {
      "p": "Qual o método?",
      "r": "POST",
      "un": "",
      "dica": "Primeira palavra.",
      "expl": "POST: está criando algo."
     },
     {
      "p": "Qual o caminho?",
      "r": "/clientes",
      "un": "",
      "dica": "Segunda palavra.",
      "expl": "O recurso é a coleção de clientes."
     },
     {
      "p": "Qual status é o mais adequado se der certo? (200, 201, 404)",
      "r": 201,
      "un": "",
      "dica": "Algo foi criado.",
      "expl": "201 Created."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é o modelo cliente-servidor?",
   "O cliente faz requisições e o servidor devolve respostas."
  ],
  [
   "O que é HTTP?",
   "O protocolo de texto que define como cliente e servidor trocam requisições e respostas."
  ],
  [
   "Quais as partes de uma URL?",
   "Esquema, host, porta, caminho, consulta (query string) e âncora."
  ],
  [
   "O que tem na primeira linha de uma requisição?",
   "Método, caminho e versão do HTTP: <code>GET /sobre HTTP/1.1</code>."
  ],
  [
   "Para que serve o método GET?",
   "Ler/buscar um recurso, sem alterar nada."
  ],
  [
   "Quando usar POST?",
   "Para criar recurso ou enviar dados, como um formulário."
  ],
  [
   "O que significa o status 404?",
   "Recurso não encontrado."
  ],
  [
   "Qual a diferença entre 401 e 403?",
   "401: não autenticado (quem é você?). 403: autenticado, mas sem permissão."
  ],
  [
   "O que é um cabeçalho HTTP?",
   "Metadado em <code>Chave: valor</code>, como <code>Content-Type</code>."
  ],
  [
   "O que quer dizer “HTTP é sem estado”?",
   "Cada requisição é independente; o servidor não lembra da anterior sozinho."
  ],
  [
   "O que é a query string?",
   "Parâmetros após o <code>?</code>, como <code>?q=flask&amp;pg=2</code>."
  ],
  [
   "Quais as camadas do MVC?",
   "Model (dados), View (apresentação) e Controller (lógica da rota)."
  ]
 ],
 "vf": [
  [
   "O navegador é um exemplo de cliente HTTP.",
   true,
   "Ele envia requisições e exibe respostas."
  ],
  [
   "O servidor pode iniciar a conversa enviando requisições ao navegador sem pedido.",
   false,
   "No HTTP clássico o cliente pergunta primeiro."
  ],
  [
   "O método GET deve ser usado para apagar dados.",
   false,
   "Para apagar, DELETE."
  ],
  [
   "Um status 500 indica erro no servidor.",
   true,
   "Faixa 5xx."
  ],
  [
   "Um status 302 indica redirecionamento.",
   true,
   "Faixa 3xx."
  ],
  [
   "O corpo da requisição é obrigatório em todo POST.",
   false,
   "É comum, mas não obrigatório."
  ],
  [
   "A porta padrão do HTTPS é 443.",
   true,
   "E a do HTTP é 80."
  ],
  [
   "O fragmento (#âncora) da URL é enviado ao servidor.",
   false,
   "Fica só no navegador."
  ],
  [
   "Content-Type informa o formato do corpo.",
   true,
   "Como <code>application/json</code>."
  ],
  [
   "HTTP guarda automaticamente quem é o usuário entre requisições.",
   false,
   "É sem estado; usa-se cookie/sessão."
  ],
  [
   "No MVC, o Controller recebe a requisição e coordena a resposta.",
   true,
   "É a ponte entre model e view."
  ],
  [
   "201 Created é o status típico de criação bem-sucedida.",
   true,
   "Costuma vir após um POST."
  ]
 ],
 "caderno": [
  [
   "Desenhe o fluxo de um acesso a <code>https://escola.com/notas</code>.",
   "Navegador → (DNS) → servidor → requisição GET /notas → processamento → resposta 200 com HTML → navegador mostra."
  ],
  [
   "Identifique as partes: <code>https://api.site.com:8080/v1/livros?autor=ana#top</code>.",
   "esquema https; host api.site.com; porta 8080; caminho /v1/livros; consulta autor=ana; âncora top."
  ],
  [
   "Escreva uma requisição GET para <code>/contato</code> no host <code>site.com</code>.",
   "GET /contato HTTP/1.1 / Host: site.com / (linha em branco)."
  ],
  [
   "Escreva uma resposta 404 simples.",
   "HTTP/1.1 404 Not Found / Content-Type: text/html / (linha em branco) / &lt;h1&gt;Não encontrado&lt;/h1&gt;"
  ],
  [
   "Qual status usar: (a) cadastro criado, (b) senha errada, (c) página inexistente, (d) bug no servidor?",
   "(a) 201; (b) 401; (c) 404; (d) 500."
  ],
  [
   "Por que o login precisa de cookie/sessão?",
   "Porque o HTTP não lembra o usuário entre requisições."
  ],
  [
   "Dê um exemplo de cada método (GET, POST, PUT, DELETE) numa loja online.",
   "GET /produtos; POST /pedidos; PUT /produtos/3; DELETE /carrinho/itens/7."
  ],
  [
   "Qual a diferença entre 301 e 302?",
   "301 é redirecionamento permanente; 302 é temporário."
  ],
  [
   "Qual camada MVC faz: (a) consultar usuários, (b) montar a página, (c) decidir o que fazer na rota?",
   "(a) Model; (b) View; (c) Controller."
  ],
  [
   "Por que não se envia senha por GET na URL?",
   "A URL fica em históricos, logs e cache; use POST com HTTPS."
  ]
 ],
 "pbl": [
  {
   "titulo": "Diagnóstico de acesso",
   "cenario": "<p>Um aluno diz: “o site da escola não abre”. Você tem acesso à ferramenta do navegador que mostra a requisição e o status devolvido.</p>",
   "passos": [
    [
     "Que informação do HTTP ajuda a saber se o problema é do cliente ou do servidor?",
     "O código de status: 4xx indica erro do cliente; 5xx, do servidor; sem resposta, problema de rede."
    ],
    [
     "O status foi 404 ao abrir /notas. O que verificar?",
     "Se o endereço está certo e se a rota /notas existe no servidor."
    ],
    [
     "O status foi 500. A culpa é do aluno?",
     "Não: houve erro no código do servidor; é preciso olhar os logs."
    ]
   ]
  },
  {
   "titulo": "Desenhando a arquitetura",
   "cenario": "<p>A turma vai criar um site de empréstimo de livros e precisa decidir como dividir o código em camadas antes de programar.</p>",
   "passos": [
    [
     "Que dados (model) o sistema precisa guardar?",
     "Livros, alunos e empréstimos (com datas)."
    ],
    [
     "Que rotas (controller) cobrem o fluxo básico?",
     "GET /livros, POST /emprestimos, DELETE /emprestimos/&lt;id&gt; (devolução)."
    ],
    [
     "O que a view precisa mostrar?",
     "Lista de livros, formulário de empréstimo e mensagens de sucesso/erro."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Cliente pede, servidor responde, em HTTP (texto).",
    "Método diz a intenção; status diz o resultado.",
    "MVC separa dados, apresentação e controle."
   ]
  }
 ],
 "glossario": [
  [
   "Query string",
   "Parâmetros da URL após o ?."
  ],
  [
   "Stateless",
   "Sem memória entre requisições."
  ],
  [
   "Endpoint",
   "Endereço (rota) que responde a pedidos."
  ]
 ]
});
