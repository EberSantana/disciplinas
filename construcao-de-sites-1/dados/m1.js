FSI.modulo({
 "n": 1,
 "unidade": "Unidade 1",
 "nome": "Web e HTML5 semântico",
 "titulo": "Como a web funciona e a estrutura de um documento HTML",
 "duracao": "12 h",
 "resumoCurto": "Cliente, servidor e HTTP; a estrutura do documento HTML; títulos, parágrafos e ênfase; tags semânticas.",
 "analogia": {
  "titulo": "O esqueleto e as etiquetas",
  "txt": "<p>O HTML não diz como a página <b>parece</b>, diz o que cada parte <b>é</b>: isto é um título, isto é um parágrafo, isto é o menu. É como etiquetar as caixas de uma mudança: “cozinha”, “livros”, “frágil”. Quem lê as etiquetas — o navegador, o Google, o leitor de tela de uma pessoa cega — entende a página.</p>"
 },
 "chave": [
  "O navegador (cliente) pede a página ao <b>servidor</b> por <b>HTTP/HTTPS</b>.",
  "HTML descreve a <b>estrutura</b>; CSS a aparência; JS o comportamento.",
  "Documento: <code>&lt;!doctype html&gt;</code>, <code>&lt;html lang&gt;</code>, <code>&lt;head&gt;</code> (metadados) e <code>&lt;body&gt;</code> (conteúdo).",
  "Títulos <code>&lt;h1&gt;</code> a <code>&lt;h6&gt;</code> em ordem; <code>&lt;p&gt;</code> para parágrafos.",
  "<code>&lt;strong&gt;</code> e <code>&lt;em&gt;</code> dão ênfase com significado.",
  "Semânticas: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code>."
 ],
 "objetivos": [
  "Explicar <b>cliente, servidor e HTTP</b>.",
  "Montar a <b>estrutura</b> de um documento HTML.",
  "Usar <b>títulos, parágrafos e ênfase</b>.",
  "Organizar a página com <b>tags semânticas</b>."
 ],
 "licoes": [
  {
   "t": "A web em três atores",
   "txt": "<p>Você digita o endereço; o <b>navegador</b> pede a página ao <b>servidor</b> pelo protocolo <b>HTTP</b> (com cadeado, HTTPS); o servidor devolve o arquivo HTML; o navegador lê e desenha. HTML não é compilado: o navegador interpreta o texto direto.</p>"
  },
  {
   "t": "Anatomia de uma tag",
   "txt": "<p><code>&lt;a href=\"pagina.html\"&gt;texto&lt;/a&gt;</code>: tag de abertura com <b>atributo</b> (nome=\"valor\"), conteúdo e tag de fechamento. Algumas não têm fechamento: <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;meta&gt;</code>. Atributos globais: id, class, style, title, lang.</p>"
  },
  {
   "t": "O documento",
   "txt": "<p><code>&lt;!doctype html&gt;</code> avisa que é HTML5. No <code>&lt;head&gt;</code> ficam <code>&lt;meta charset=\"utf-8\"&gt;</code> (acentos certos), <code>&lt;title&gt;</code> (aba e Google) e links de CSS. No <code>&lt;body&gt;</code> fica o que aparece.</p>"
  },
  {
   "t": "Semântica",
   "txt": "<p>Em vez de <code>&lt;div&gt;</code> para tudo, use <code>&lt;header&gt;</code> (topo), <code>&lt;nav&gt;</code> (menu), <code>&lt;main&gt;</code> (conteúdo principal, um por página), <code>&lt;article&gt;</code> (texto independente), <code>&lt;section&gt;</code> (seção com título) e <code>&lt;footer&gt;</code> (rodapé). Ajuda o Google e quem usa leitor de tela.</p>",
   "pense": "por que uma página deve ter só um <code>&lt;h1&gt;</code>?"
  }
 ],
 "termos": [
  [
   "Tag",
   "Marcação entre < >."
  ],
  [
   "Atributo",
   "nome=\"valor\" dentro da tag."
  ],
  [
   "head",
   "Metadados da página."
  ],
  [
   "Semântica",
   "Tag que diz o que o conteúdo é."
  ]
 ],
 "ler": [
  [
   "Apostila interativa de Construção de Sites",
   "apostila.html"
  ]
 ],
 "visuais": [
  {
   "tipo": "camadas",
   "id": "doc",
   "titulo": "Anatomia de um documento HTML",
   "forma": "pilha",
   "h": 340,
   "camadas": [
    {
     "t": "<!doctype html>",
     "d": "Declara HTML5."
    },
    {
     "t": "<html lang=\"pt-BR\">",
     "d": "Raiz; o idioma ajuda leitores de tela."
    },
    {
     "t": "<head>",
     "d": "meta charset, title, links de CSS."
    },
    {
     "t": "<body>",
     "d": "Tudo o que aparece na tela."
    },
    {
     "t": "header · nav · main · footer",
     "d": "As regiões semânticas do corpo."
    }
   ]
  },
  {
   "tipo": "sequencia",
   "id": "http",
   "titulo": "Do endereço à página na tela",
   "atores": [
    "Você",
    "Navegador",
    "Servidor"
   ],
   "passos": [
    {
     "de": 0,
     "para": 1,
     "t": "Digita ifs.edu.br",
     "d": "O navegador descobre o IP pelo DNS."
    },
    {
     "de": 1,
     "para": 2,
     "t": "GET / (HTTPS)",
     "d": "Pede a página."
    },
    {
     "de": 2,
     "para": 1,
     "t": "200 OK + HTML",
     "d": "Devolve o arquivo HTML."
    },
    {
     "de": 1,
     "para": 2,
     "t": "GET estilo.css, imagens",
     "d": "Pede os arquivos ligados à página."
    },
    {
     "de": 1,
     "para": 0,
     "t": "Desenha a página",
     "d": "Monta a árvore do documento e aplica o CSS."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Seu primeiro documento HTML, escrito por você e conferido automaticamente.",
  "sims": [
   {
    "tipo": "html",
    "titulo": "Editor ao vivo: a página “Sobre mim”",
    "cfg": {
     "id": "h1",
     "codigo": "<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Minha página</title>\n</head>\n<body>\n  <h1>Seu nome aqui</h1>\n  <p>Escreva um parágrafo sobre você.</p>\n</body>\n</html>",
     "desafios": [
      {
       "p": "Troque o <code>&lt;title&gt;</code> por <b>Sobre mim</b>.",
       "teste": "doc.title.trim().toLowerCase() === 'sobre mim'",
       "dica": "<title>Sobre mim</title>",
       "expl": "O título aparece na aba do navegador e no Google."
      },
      {
       "p": "Acrescente um <code>&lt;h2&gt;</code> com o texto <b>Meus interesses</b>.",
       "teste": "[...qa('h2')].some(h => /meus interesses/i.test(h.textContent))",
       "dica": "<h2>Meus interesses</h2>",
       "expl": "h2 é um subtítulo abaixo do h1."
      },
      {
       "p": "Destaque uma palavra importante com <code>&lt;strong&gt;</code>.",
       "teste": "!!q('strong') && q('strong').textContent.trim().length > 0",
       "dica": "<strong>programação</strong>",
       "expl": "strong dá ênfase forte, com significado."
      },
      {
       "p": "Envolva todo o conteúdo do corpo num <code>&lt;main&gt;</code> e crie um <code>&lt;footer&gt;</code> com o seu nome.",
       "teste": "!!q('main h1') && !!q('footer') && q('footer').textContent.trim().length > 0",
       "dica": "<main> … </main> <footer>Feito por …</footer>",
       "expl": "Página com regiões semânticas."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "lab-sem",
    "titulo": "Que tag semântica usar?",
    "cats": [
     "header",
     "nav",
     "main",
     "footer"
    ],
    "itens": [
     [
      "Logotipo e nome da escola no topo",
      0
     ],
     [
      "Lista de links Início, Cursos, Contato",
      1
     ],
     [
      "O conteúdo principal da página",
      2
     ],
     [
      "Endereço e direitos autorais no fim",
      3
     ],
     [
      "Menu de categorias da loja",
      1
     ],
     [
      "Créditos e redes sociais no rodapé",
      3
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Edite o código e veja a pré-visualização",
    "ev": "h1:editou"
   },
   {
    "id": "m2",
    "t": "Vença 2 desafios",
    "ev": "h1:desafio:2"
   },
   {
    "id": "m3",
    "t": "Vença os 4 desafios",
    "ev": "h1:todos"
   },
   {
    "id": "m4",
    "t": "Classifique as tags semânticas sem erros",
    "ev": "vis:lab-sem"
   },
   {
    "id": "m5",
    "t": "Acompanhe a página saindo do servidor (Explorar)",
    "ev": "vis:http"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que o HTML define numa página?",
   "A estrutura e o significado do conteúdo (não a aparência)."
  ],
  [
   "Quem pede e quem entrega a página?",
   "O navegador (cliente) pede; o servidor entrega, pelo protocolo HTTP/HTTPS."
  ],
  [
   "Para que serve <code>&lt;!doctype html&gt;</code>?",
   "Indica que o documento é HTML5."
  ],
  [
   "O que vai no <code>&lt;head&gt;</code>?",
   "Metadados: charset, title, descrição, links de CSS."
  ],
  [
   "Por que usar <code>&lt;meta charset=\"utf-8\"&gt;</code>?",
   "Para os acentos e caracteres especiais aparecerem corretamente."
  ],
  [
   "Quantos níveis de título existem?",
   "Seis: h1 a h6."
  ],
  [
   "Diferença entre <code>&lt;b&gt;</code> e <code>&lt;strong&gt;</code>?",
   "b só deixa negrito; strong indica importância (lido com ênfase por leitores de tela)."
  ],
  [
   "O que é um atributo?",
   "Informação extra dentro da tag de abertura: nome=\"valor\"."
  ],
  [
   "Para que serve o atributo lang?",
   "Informa o idioma: ajuda leitores de tela, tradutores e buscadores."
  ],
  [
   "Para que serve <code>&lt;nav&gt;</code>?",
   "Agrupar os links de navegação principais."
  ],
  [
   "Quantos <code>&lt;main&gt;</code> uma página deve ter?",
   "Um."
  ],
  [
   "Cite 3 tags que não têm fechamento.",
   "img, br, meta (também hr, input, link)."
  ]
 ],
 "vf": [
  [
   "HTML é uma linguagem de programação compilada.",
   false,
   "É uma linguagem de marcação interpretada pelo navegador."
  ],
  [
   "O conteúdo do <code>&lt;head&gt;</code> aparece no corpo da página.",
   false,
   "O head guarda metadados; o que aparece fica no body."
  ],
  [
   "O <code>&lt;title&gt;</code> aparece na aba do navegador.",
   true,
   "E nos resultados de busca."
  ],
  [
   "Pode-se pular do <code>&lt;h1&gt;</code> direto para o <code>&lt;h4&gt;</code> sem problema.",
   false,
   "Os níveis devem seguir a hierarquia para leitores de tela e SEO."
  ],
  [
   "HTTPS é o HTTP com criptografia.",
   true,
   "O cadeado indica conexão cifrada."
  ],
  [
   "<code>&lt;strong&gt;</code> tem significado semântico.",
   true,
   "Indica importância."
  ],
  [
   "Uma página pode ter vários <code>&lt;h1&gt;</code> sem prejuízo.",
   false,
   "Recomenda-se um h1 principal por página."
  ],
  [
   "<code>&lt;footer&gt;</code> só pode existir uma vez por página.",
   false,
   "Pode haver footer em cada article ou section."
  ],
  [
   "Tags semânticas ajudam leitores de tela.",
   true,
   "Elas indicam as regiões da página."
  ],
  [
   "Atributos ficam na tag de fechamento.",
   false,
   "Ficam na tag de abertura."
  ],
  [
   "Sem <code>&lt;meta charset=\"utf-8\"&gt;</code> os acentos podem aparecer errados.",
   true,
   "Por isso ele é obrigatório."
  ],
  [
   "O navegador precisa compilar o HTML antes de exibir.",
   false,
   "Ele interpreta o texto diretamente."
  ]
 ],
 "caderno": [
  [
   "Explique o caminho de uma página do servidor até sua tela.",
   "O navegador resolve o nome pelo DNS, pede a página por HTTP(S), o servidor responde com o HTML, o navegador pede CSS e imagens e desenha a página."
  ],
  [
   "Escreva a estrutura mínima de um documento HTML5.",
   "&lt;!doctype html>&lt;html lang=\"pt-BR\">&lt;head>&lt;meta charset=\"utf-8\">&lt;title>…&lt;/title>&lt;/head>&lt;body>…&lt;/body>&lt;/html>"
  ],
  [
   "Qual a diferença entre head e body?",
   "head guarda metadados (não aparecem); body guarda o conteúdo visível."
  ],
  [
   "Por que HTML é “estrutura, não aparência”?",
   "Ele diz o que cada parte é; a aparência fica a cargo do CSS."
  ],
  [
   "Marque: título principal, subtítulo, parágrafo com uma palavra importante.",
   "&lt;h1>…&lt;/h1>&lt;h2>…&lt;/h2>&lt;p>Texto com &lt;strong>palavra&lt;/strong>&lt;/p>"
  ],
  [
   "Diferença entre em e i?",
   "em dá ênfase com significado; i é só itálico (termos técnicos, nomes)."
  ],
  [
   "Reescreva com tags semânticas: &lt;div id=\"topo\">, &lt;div id=\"menu\">, &lt;div id=\"conteudo\">, &lt;div id=\"rodape\">.",
   "&lt;header>, &lt;nav>, &lt;main>, &lt;footer>."
  ],
  [
   "Para que servem os atributos id e class?",
   "id identifica um elemento único; class agrupa elementos para estilizar juntos."
  ],
  [
   "O que é uma tag vazia? Dê exemplos.",
   "Tag sem conteúdo nem fechamento: img, br, meta, input."
  ],
  [
   "Por que o atributo lang=\"pt-BR\" é importante para acessibilidade?",
   "O leitor de tela usa a pronúncia do português correta."
  ]
 ],
 "pbl": [
  {
   "titulo": "O site da cantina",
   "cenario": "<p>A cantina quer uma página simples com nome, cardápio do dia e horário. Hoje há só um arquivo com tudo em div.</p>",
   "passos": [
    [
     "Desenhe no caderno as regiões da página e diga que tag semântica cada uma usa.",
     "header (nome da cantina), nav (Cardápio, Horários, Contato), main com section do cardápio, footer com endereço."
    ],
    [
     "Escreva o esqueleto HTML completo.",
     "doctype, html lang, head com meta charset e title “Cantina do IFS”, body com header, nav, main e footer."
    ]
   ]
  },
  {
   "titulo": "Página para leitor de tela",
   "cenario": "<p>Um aluno cego usa leitor de tela e diz que no site do grêmio “tudo é a mesma coisa”.</p>",
   "passos": [
    [
     "O que provavelmente está errado no HTML?",
     "Tudo em div e span, sem títulos em hierarquia, sem lang, sem regiões semânticas."
    ],
    [
     "Liste 4 correções.",
     "Usar h1–h3 em ordem, header/nav/main/footer, lang=\"pt-BR\" e textos de links claros."
    ]
   ]
  },
  {
   "titulo": "Do caderno ao navegador",
   "cenario": "<p>Você escreveu sua primeira página no Bloco de Notas, mas ao abrir os acentos saíram estranhos.</p>",
   "passos": [
    [
     "Qual a causa provável?",
     "Falta de meta charset utf-8 ou arquivo salvo em outra codificação."
    ],
    [
     "Como resolver?",
     "Incluir &lt;meta charset=\"utf-8\"> e salvar o arquivo com codificação UTF-8."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Web e HTML",
   "itens": [
    "Cliente, servidor, HTTP(S).",
    "doctype, html, head, body.",
    "h1–h6, p, strong, em.",
    "header, nav, main, section, article, footer."
   ]
  }
 ],
 "glossario": [
  [
   "DOM",
   "Árvore do documento montada pelo navegador."
  ],
  [
   "UTF-8",
   "Codificação que inclui acentos."
  ],
  [
   "Elemento",
   "Tag + conteúdo."
  ]
 ]
});
