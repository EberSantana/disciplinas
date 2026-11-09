FSI.modulo({
 "n": 3,
 "unidade": "Unidade 3",
 "nome": "CSS: seletores, cores e tipografia",
 "titulo": "Dando cara à página: CSS, seletores e a cascata",
 "duracao": "12 h",
 "resumoCurto": "As três formas de usar CSS, seletores (tag, classe, id, descendente), pseudoclasses, cores, fundos, fontes e a cascata (especificidade).",
 "analogia": {
  "titulo": "O figurino da peça",
  "txt": "<p>O HTML são os atores; o <b>CSS</b> é o figurino. Uma regra diz “todos os atores de chapéu (classe) usam azul”, outra diz “o protagonista (id) usa vermelho”. Quando duas regras brigam, vence a mais <b>específica</b> — e, empatando, a que vem <b>por último</b>. Isso é a <b>cascata</b>.</p>"
 },
 "chave": [
  "Três formas: atributo style, <code>&lt;style&gt;</code> no head e arquivo .css externo (o melhor).",
  "Regra: <code>seletor { propriedade: valor; }</code>.",
  "Seletores: tag (p), classe (.destaque), id (#topo), descendente (nav a), grupo (h1, h2).",
  "Pseudoclasses: :hover, :focus, :visited, :first-child.",
  "Especificidade: style > id > classe > tag; empate, vence o último.",
  "Cores em nome, hexadecimal (#1F5135), rgb() e hsl()."
 ],
 "objetivos": [
  "Aplicar CSS das <b>três formas</b>.",
  "Usar <b>seletores</b> e <b>pseudoclasses</b>.",
  "Prever quem vence pela <b>especificidade</b>.",
  "Formatar <b>cores, fundos e textos</b>."
 ],
 "licoes": [
  {
   "t": "Onde colocar o CSS",
   "txt": "<p>Inline (<code>style=\"color:red\"</code>) só para testes; <code>&lt;style&gt;</code> no head para uma página; arquivo externo <code>&lt;link rel=\"stylesheet\" href=\"estilo.css\"&gt;</code> para o site todo — muda tudo num lugar só.</p>"
  },
  {
   "t": "Seletores",
   "txt": "<p><code>p</code> (todas as tags), <code>.aviso</code> (classe, repetível), <code>#topo</code> (id, único), <code>nav a</code> (a dentro de nav), <code>h1, h2</code> (os dois). Estados: <code>a:hover</code>, <code>input:focus</code>.</p>"
  },
  {
   "t": "Cascata e especificidade",
   "txt": "<p>Conte: id vale 100, classe/pseudoclasse 10, tag 1. <code>#menu a</code> (101) vence <code>.menu a</code> (11). Empate: vence a regra escrita por último. Algumas propriedades são <b>herdadas</b> (cor, fonte); outras não (borda, margem).</p>",
   "pense": "quem vence: <code>p.aviso</code> ou <code>.aviso</code>?"
  },
  {
   "t": "Cores e texto",
   "txt": "<p>color (texto), background-color, background-image; font-family com alternativas (<code>Arial, sans-serif</code>), font-size (rem), font-weight, line-height, text-align. Contraste suficiente entre texto e fundo é acessibilidade.</p>"
  }
 ],
 "termos": [
  [
   "Seletor",
   "Escolhe os elementos."
  ],
  [
   "Especificidade",
   "Peso do seletor."
  ],
  [
   "Herança",
   "Filhos recebem cor e fonte do pai."
  ],
  [
   "Pseudoclasse",
   "Estado: :hover, :focus."
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
   "tipo": "classificar",
   "id": "jogo-sel",
   "titulo": "Jogo: que tipo de seletor?",
   "cats": [
    "Tag",
    "Classe",
    "Id",
    "Descendente",
    "Pseudoclasse"
   ],
   "itens": [
    [
     "p",
     0
    ],
    [
     "h1",
     0
    ],
    [
     ".destaque",
     1
    ],
    [
     ".card",
     1
    ],
    [
     "#topo",
     2
    ],
    [
     "#rodape",
     2
    ],
    [
     "nav a",
     3
    ],
    [
     "main p",
     3
    ],
    [
     "a:hover",
     4
    ],
    [
     "input:focus",
     4
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Estilize o cartão de um curso no editor ao vivo e decida quem vence a cascata.",
  "sims": [
   {
    "tipo": "html",
    "titulo": "Editor ao vivo: o cartão do curso",
    "cfg": {
     "id": "h3",
     "codigo": "<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Minha página</title>\n  <style>\n    body { font-family: Arial, sans-serif; }\n    /* escreva suas regras aqui */\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <h2>Técnico em Informática</h2>\n    <p class=\"sub\">Subsequente · noturno</p>\n    <a href=\"#\">Saiba mais</a>\n  </div>\n</body>\n</html>",
     "desafios": [
      {
       "p": "Dê ao <code>.card</code> uma <b>cor de fundo</b> diferente de branco.",
       "teste": "(() => { const b = css(q('.card'),'background-color'); return b && b !== 'rgba(0, 0, 0, 0)' && b !== 'rgb(255, 255, 255)'; })()",
       "dica": ".card { background-color: #E2EEE5; }",
       "expl": "Seletor de classe."
      },
      {
       "p": "Deixe o <code>h2</code> do cartão com cor <b>#1F5135</b>.",
       "teste": "css(q('.card h2'),'color') === 'rgb(31, 81, 53)'",
       "dica": ".card h2 { color: #1F5135; }",
       "expl": "Seletor descendente e cor em hexadecimal."
      },
      {
       "p": "Coloque o <code>.sub</code> em <b>itálico</b>.",
       "teste": "css(q('.sub'),'font-style') === 'italic'",
       "dica": ".sub { font-style: italic; }",
       "expl": ""
      },
      {
       "p": "Faça o link ficar <b>sem sublinhado</b>.",
       "teste": "!/underline/.test(css(q('.card a'),'text-decoration-line') || css(q('.card a'),'text-decoration'))",
       "dica": ".card a { text-decoration: none; }",
       "expl": "Lembre de destacar o link de outra forma (cor, negrito)."
      },
      {
       "p": "Use uma fonte de <b>20px ou mais</b> no <code>h2</code>.",
       "teste": "parseFloat(css(q('.card h2'),'font-size')) >= 20",
       "dica": ".card h2 { font-size: 1.5rem; }",
       "expl": "rem é relativo à fonte da página."
      }
     ]
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Quem vence a cascata?",
    "cfg": {
     "id": "esp",
     "rotulo": "Briga",
     "itens": [
      {
       "t": "p { color: blue; } e .aviso { color: red; } para <code>&lt;p class=\"aviso\"&gt;</code>",
       "ops": [
        [
         "Vermelho (.aviso)",
         true,
         "Classe (10) vence tag (1)."
        ],
        [
         "Azul",
         false,
         "Tag é mais fraca."
        ],
        [
         "Roxo",
         false,
         "As cores não se misturam."
        ]
       ]
      },
      {
       "t": "#topo { color: green; } e .titulo { color: orange; } para <code>&lt;h1 id=\"topo\" class=\"titulo\"&gt;</code>",
       "ops": [
        [
         "Verde (#topo)",
         true,
         "Id (100) vence classe (10)."
        ],
        [
         "Laranja",
         false,
         "Classe é mais fraca."
        ],
        [
         "Depende do navegador",
         false,
         "A regra é a mesma em todos."
        ]
       ]
      },
      {
       "t": ".a { color: red; } escrito antes de .b { color: blue; } para <code>&lt;p class=\"a b\"&gt;</code>",
       "ops": [
        [
         "Azul: empate, vence a última",
         true,
         "Mesma especificidade."
        ],
        [
         "Vermelho",
         false,
         "Veio antes."
        ],
        [
         "Nenhuma das duas",
         false,
         "Uma vence."
        ]
       ]
      },
      {
       "t": "Cor definida no body e nenhuma no p.",
       "ops": [
        [
         "O p herda a cor do body",
         true,
         "color é herdada."
        ],
        [
         "O p fica preto sempre",
         false,
         "Ele herda."
        ],
        [
         "Erro de CSS",
         false,
         "É herança."
        ]
       ]
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Edite o CSS",
    "ev": "h3:editou"
   },
   {
    "id": "m2",
    "t": "Vença 3 desafios de estilo",
    "ev": "h3:desafio:3"
   },
   {
    "id": "m3",
    "t": "Vença os 5 desafios",
    "ev": "h3:todos"
   },
   {
    "id": "m4",
    "t": "Acerte todas as brigas da cascata",
    "ev": "esp:perfeito"
   },
   {
    "id": "m5",
    "t": "Classifique os seletores (Explorar)",
    "ev": "vis:jogo-sel"
   }
  ],
  "guiados": [
   {
    "titulo": "Calculando especificidade",
    "txt": "<p>Conte id = 100, classe ou pseudoclasse = 10, tag = 1.</p>",
    "passos": [
     {
      "p": "Especificidade de <code>nav a</code>?",
      "r": 2,
      "dica": "Duas tags.",
      "expl": "2."
     },
     {
      "p": "Especificidade de <code>.menu a:hover</code>?",
      "r": 21,
      "dica": "classe + pseudoclasse + tag.",
      "expl": "10 + 10 + 1 = 21."
     },
     {
      "p": "Especificidade de <code>#topo .logo img</code>?",
      "r": 111,
      "dica": "id + classe + tag.",
      "expl": "100 + 10 + 1 = 111."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Qual a forma recomendada de usar CSS num site?",
   "Arquivo .css externo ligado com &lt;link>."
  ],
  [
   "Como é a sintaxe de uma regra CSS?",
   "seletor { propriedade: valor; }"
  ],
  [
   "Como selecionar pela classe destaque?",
   ".destaque"
  ],
  [
   "Como selecionar pelo id topo?",
   "#topo"
  ],
  [
   "O que faz o seletor nav a?",
   "Seleciona os links dentro de nav."
  ],
  [
   "O que faz h1, h2?",
   "Aplica a regra aos dois."
  ],
  [
   "Para que serve :hover?",
   "Estilo quando o mouse está sobre o elemento."
  ],
  [
   "Qual vence: id ou classe?",
   "Id."
  ],
  [
   "E se dois seletores tiverem a mesma especificidade?",
   "Vence o que vier por último."
  ],
  [
   "Cite uma propriedade herdada e uma não herdada.",
   "Herdada: color, font-family. Não herdada: border, margin."
  ],
  [
   "Como escrever a cor verde do portal em hexadecimal?",
   "#1F5135."
  ],
  [
   "Por que listar várias fontes em font-family?",
   "Se a primeira não existir, o navegador usa a próxima."
  ]
 ],
 "vf": [
  [
   "Um id pode ser usado em vários elementos da mesma página.",
   false,
   "id é único; para repetir use classe."
  ],
  [
   "CSS inline tem a maior prioridade (sem !important).",
   true,
   "O atributo style vence seletores."
  ],
  [
   ".card p seleciona parágrafos dentro de .card.",
   true,
   "Seletor descendente."
  ],
  [
   "A ordem das regras não importa.",
   false,
   "No empate, vence a última."
  ],
  [
   "color define a cor de fundo.",
   false,
   "Fundo é background-color."
  ],
  [
   "A cor do texto é herdada pelos filhos.",
   true,
   "color é herdada."
  ],
  [
   "Um link sem sublinhado e sem outra marcação continua fácil de identificar.",
   false,
   "É preciso outra pista visual (cor, negrito)."
  ],
  [
   "rem é relativo ao tamanho da fonte da raiz.",
   true,
   "Facilita ajustar a página toda."
  ],
  [
   "Classe vale mais que tag na especificidade.",
   true,
   "10 contra 1."
  ],
  [
   "O seletor * seleciona todos os elementos.",
   true,
   "Seletor universal."
  ],
  [
   "Pseudoclasses começam com dois-pontos.",
   true,
   "Ex.: :hover."
  ],
  [
   "Baixo contraste entre texto e fundo é problema de acessibilidade.",
   true,
   "A WCAG pede contraste mínimo de 4,5:1 para texto normal."
  ]
 ],
 "caderno": [
  [
   "Quais as três formas de aplicar CSS? Qual é a melhor e por quê?",
   "Inline, &lt;style> no head, arquivo externo; o externo, porque muda o site todo num só lugar."
  ],
  [
   "Escreva uma regra que deixe todos os h1 verdes e centralizados.",
   "h1 { color: green; text-align: center; }"
  ],
  [
   "Escreva um seletor para os links do menu quando o mouse passa.",
   "nav a:hover { … }"
  ],
  [
   "Diferença entre .menu a e .menu, a?",
   ".menu a: links dentro de .menu; .menu, a: o .menu e todos os links."
  ],
  [
   "Explique a cascata com um exemplo.",
   "p { color: blue } e .aviso { color: red }: o parágrafo com classe aviso fica vermelho porque a classe é mais específica."
  ],
  [
   "Calcule a especificidade de #menu li a.",
   "100 + 1 + 1 = 102."
  ],
  [
   "Escreva uma pilha de fontes segura.",
   "font-family: \"Source Sans 3\", Arial, sans-serif;"
  ],
  [
   "Para que serve line-height?",
   "Espaçamento entre linhas: melhora a leitura (ex.: 1.5)."
  ],
  [
   "Escreva uma regra para destacar um campo em foco.",
   "input:focus { outline: 2px solid #1F5135; }"
  ],
  [
   "Por que não remover o outline sem colocar outro destaque?",
   "Quem navega pelo teclado perde a indicação de onde está."
  ]
 ],
 "pbl": [
  {
   "titulo": "Identidade visual do grêmio",
   "cenario": "<p>O grêmio quer as cores verde e branco no site, com títulos em fonte forte e links que mudem de cor ao passar o mouse.</p>",
   "passos": [
    [
     "Liste as regras CSS necessárias.",
     "body (fonte e cor), h1/h2 (cor verde e peso), a (cor), a:hover (outra cor ou sublinhado), um arquivo estilo.css externo."
    ],
    [
     "Como garantir que todas as páginas sigam o padrão?",
     "Um único arquivo .css ligado em todas com &lt;link>."
    ]
   ]
  },
  {
   "titulo": "A regra que não pega",
   "cenario": "<p>Um aluno escreveu p { color: red } no final do CSS, mas o parágrafo continua azul.</p>",
   "passos": [
    [
     "Liste três causas possíveis.",
     "Existe uma regra mais específica (classe ou id); há style inline; o arquivo CSS não está ligado ou tem erro de sintaxe antes."
    ],
    [
     "Como investigar?",
     "Inspecionar o elemento no navegador (F12) e ver qual regra está ativa e qual foi riscada."
    ]
   ]
  },
  {
   "titulo": "Contraste",
   "cenario": "<p>O site da feira usa texto cinza-claro sobre fundo branco e os visitantes reclamam.</p>",
   "passos": [
    [
     "Qual o problema e quem é mais afetado?",
     "Contraste insuficiente; pessoas com baixa visão, idosos e quem usa o celular no sol."
    ],
    [
     "Como corrigir?",
     "Escurecer o texto ou o fundo até atingir pelo menos 4,5:1 (verificar com um medidor de contraste)."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "CSS",
   "itens": [
    "Externo > interno > inline (organização).",
    "Tag, classe, id, descendente, grupo, pseudoclasse.",
    "Especificidade: style > id > classe > tag; empate, a última.",
    "Cores, fundos, fontes, contraste."
   ]
  }
 ],
 "glossario": [
  [
   "!important",
   "Força a regra (evite)."
  ],
  [
   "hex",
   "Cor em hexadecimal, #RRGGBB."
  ]
 ]
});
