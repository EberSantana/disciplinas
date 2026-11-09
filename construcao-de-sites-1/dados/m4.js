FSI.modulo({
 "n": 4,
 "unidade": "Unidade 4",
 "nome": "Box model e Flexbox",
 "titulo": "Caixas, espaços e layouts flexíveis",
 "duracao": "12 h",
 "resumoCurto": "Modelo de caixa (content, padding, border, margin), box-sizing, display e posição, e layouts com Flexbox.",
 "analogia": {
  "titulo": "Quadros na parede",
  "txt": "<p>Todo elemento é uma <b>caixa</b>, como um quadro: a pintura é o <b>conteúdo</b>, o passe-partout é o <b>padding</b>, a moldura é a <b>borda</b> e o espaço até o próximo quadro é a <b>margem</b>. O <b>Flexbox</b> é o trilho na parede que alinha vários quadros lado a lado, distribui o espaço e quebra a linha quando falta lugar.</p>"
 },
 "chave": [
  "Caixa = content + padding + border + margin.",
  "<code>box-sizing: border-box</code> faz width incluir padding e borda.",
  "Ordem dos 4 valores: topo, direita, baixo, esquerda (sentido horário).",
  "display: block, inline, inline-block, none, flex.",
  "Flex: <code>display:flex</code>, <code>justify-content</code> (eixo principal), <code>align-items</code> (eixo cruzado), <code>gap</code>, <code>flex-wrap</code>.",
  "position: static, relative, absolute, fixed; z-index define quem fica por cima."
 ],
 "objetivos": [
  "Explicar o <b>modelo de caixa</b>.",
  "Controlar espaços com <b>margin e padding</b>.",
  "Montar layouts com <b>Flexbox</b>.",
  "Usar <b>position</b> com cuidado."
 ],
 "licoes": [
  {
   "t": "A caixa",
   "txt": "<p>Sem box-sizing, <code>width: 200px</code> + padding 20px + borda 2px = 244px na tela. Com <code>* { box-sizing: border-box; }</code> a caixa fica com 200px mesmo. <code>margin: 10px 20px</code> = 10 em cima e embaixo, 20 nas laterais; <code>margin: 0 auto</code> centraliza um bloco com largura.</p>"
  },
  {
   "t": "Display e posição",
   "txt": "<p>Block ocupa a linha toda; inline só o necessário; <code>display:none</code> remove; <code>visibility:hidden</code> esconde mas guarda o espaço. relative desloca da posição normal; absolute posiciona em relação ao ancestral posicionado; fixed fica preso na tela.</p>"
  },
  {
   "t": "Flexbox",
   "txt": "<p>No pai: <code>display:flex</code>. <code>justify-content: space-between | center</code> distribui no eixo principal; <code>align-items: center</code> alinha no outro eixo; <code>flex-direction: column</code> empilha; <code>flex-wrap: wrap</code> quebra a linha; <code>gap: 16px</code> dá espaço entre itens. No filho: <code>flex: 1</code> divide o espaço.</p>",
   "pense": "como fazer um menu com o logotipo à esquerda e os links à direita?"
  }
 ],
 "termos": [
  [
   "Padding",
   "Espaço interno."
  ],
  [
   "Margin",
   "Espaço externo."
  ],
  [
   "border-box",
   "Width inclui padding e borda."
  ],
  [
   "Flexbox",
   "Layout em uma dimensão."
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
   "id": "caixa",
   "titulo": "O modelo de caixa, de fora para dentro",
   "forma": "pilha",
   "h": 320,
   "camadas": [
    {
     "t": "margin",
     "d": "Espaço até os vizinhos; transparente."
    },
    {
     "t": "border",
     "d": "A moldura."
    },
    {
     "t": "padding",
     "d": "Espaço entre a moldura e o conteúdo; tem a cor de fundo."
    },
    {
     "t": "content",
     "d": "Texto ou imagem; width e height."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Monte o menu e a vitrine de cursos com Flexbox no editor ao vivo.",
  "sims": [
   {
    "tipo": "html",
    "titulo": "Editor ao vivo: menu e vitrine com Flexbox",
    "cfg": {
     "id": "h4",
     "codigo": "<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Minha página</title>\n  <style>\n    * { box-sizing: border-box; }\n    body { font-family: Arial, sans-serif; margin: 0; }\n    .curso { border: 1px solid #ccc; }\n    /* escreva suas regras aqui */\n  </style>\n</head>\n<body>\n  <header class=\"topo\">\n    <strong>IFS Tobias Barreto</strong>\n    <nav>\n      <a href=\"#\">Cursos</a> <a href=\"#\">Notícias</a> <a href=\"#\">Contato</a>\n    </nav>\n  </header>\n  <section class=\"vitrine\">\n    <article class=\"curso\">Informática</article>\n    <article class=\"curso\">Desenvolvimento de Sistemas</article>\n    <article class=\"curso\">Administração</article>\n  </section>\n</body>\n</html>",
     "desafios": [
      {
       "p": "Transforme o <code>.topo</code> num contêiner <b>flex</b>.",
       "teste": "css(q('.topo'),'display') === 'flex'",
       "dica": ".topo { display: flex; }",
       "expl": "O nome e o menu ficam lado a lado."
      },
      {
       "p": "Afaste o nome e o menu para as pontas com <code>justify-content</code>.",
       "teste": "css(q('.topo'),'justify-content') === 'space-between'",
       "dica": "justify-content: space-between;",
       "expl": "Espaço distribuído entre os itens."
      },
      {
       "p": "Dê ao <code>.topo</code> um <b>padding</b> de pelo menos 12px.",
       "teste": "parseFloat(css(q('.topo'),'padding-top')) >= 12",
       "dica": ".topo { padding: 16px; }",
       "expl": "Espaço interno."
      },
      {
       "p": "Ponha os cursos lado a lado: <code>.vitrine</code> flex com <code>gap</code> de pelo menos 12px.",
       "teste": "css(q('.vitrine'),'display') === 'flex' && parseFloat(css(q('.vitrine'),'column-gap') || css(q('.vitrine'),'gap')) >= 12",
       "dica": ".vitrine { display: flex; gap: 16px; }",
       "expl": "gap substitui margens entre os itens."
      },
      {
       "p": "Faça cada <code>.curso</code> crescer igualmente (<code>flex: 1</code>) e ter padding de 16px ou mais.",
       "teste": "parseFloat(css(q('.curso'),'flex-grow')) >= 1 && parseFloat(css(q('.curso'),'padding-left')) >= 16",
       "dica": ".curso { flex: 1; padding: 20px; }",
       "expl": "Três colunas iguais."
      },
      {
       "p": "Permita que a vitrine <b>quebre a linha</b> em telas estreitas.",
       "teste": "css(q('.vitrine'),'flex-wrap') === 'wrap'",
       "dica": ".vitrine { flex-wrap: wrap; }",
       "expl": "Primeiro passo para um layout responsivo."
      }
     ]
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Quanto mede a caixa?",
    "cfg": {
     "id": "cx",
     "rotulo": "Caixa",
     "itens": [
      {
       "t": "width: 200px; padding: 20px; border: 5px; sem box-sizing. Largura na tela?",
       "ops": [
        [
         "250px",
         true,
         "200 + 20 + 20 + 5 + 5."
        ],
        [
         "200px",
         false,
         "Só com border-box."
        ],
        [
         "225px",
         false,
         "O padding conta dos dois lados."
        ]
       ]
      },
      {
       "t": "A mesma caixa com box-sizing: border-box.",
       "ops": [
        [
         "200px",
         true,
         "Padding e borda ficam dentro."
        ],
        [
         "250px",
         false,
         "Esse é sem border-box."
        ],
        [
         "150px",
         false,
         "O conteúdo encolhe para 150, mas a caixa mede 200."
        ]
       ]
      },
      {
       "t": "margin: 10px 20px 30px 40px. Qual a margem da esquerda?",
       "ops": [
        [
         "40px",
         true,
         "Ordem: topo, direita, baixo, esquerda."
        ],
        [
         "10px",
         false,
         "É a do topo."
        ],
        [
         "20px",
         false,
         "É a da direita."
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
    "ev": "h4:editou"
   },
   {
    "id": "m2",
    "t": "Vença 3 desafios de Flexbox",
    "ev": "h4:desafio:3"
   },
   {
    "id": "m3",
    "t": "Vença os 6 desafios",
    "ev": "h4:todos"
   },
   {
    "id": "m4",
    "t": "Calcule as caixas sem erro",
    "ev": "cx:perfeito"
   },
   {
    "id": "m5",
    "t": "Explore as camadas da caixa (Explorar)",
    "ev": "vis:caixa"
   }
  ],
  "guiados": [
   {
    "titulo": "Largura real",
    "txt": "<p>Um card tem width 300px, padding 24px, borda 2px e margem 16px (sem border-box).</p>",
    "passos": [
     {
      "p": "Largura da caixa (sem margem)?",
      "r": 352,
      "un": "px",
      "dica": "300 + 24×2 + 2×2.",
      "expl": "352px."
     },
     {
      "p": "Espaço horizontal ocupado com as margens?",
      "r": 384,
      "un": "px",
      "dica": "352 + 16×2.",
      "expl": "384px."
     },
     {
      "p": "Com border-box, qual a largura do conteúdo?",
      "r": 248,
      "un": "px",
      "dica": "300 − 48 − 4.",
      "expl": "248px."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Quais as camadas do modelo de caixa?",
   "content, padding, border, margin."
  ],
  [
   "Padding × margin?",
   "Padding é espaço interno (com o fundo); margin é externo (transparente)."
  ],
  [
   "O que faz box-sizing: border-box?",
   "A width passa a incluir padding e borda."
  ],
  [
   "Ordem de margin com 4 valores?",
   "Topo, direita, baixo, esquerda."
  ],
  [
   "Como centralizar um bloco com largura?",
   "margin: 0 auto."
  ],
  [
   "display:none × visibility:hidden?",
   "none remove do layout; hidden esconde mas mantém o espaço."
  ],
  [
   "O que faz display:flex?",
   "Torna o elemento um contêiner flexível; os filhos viram itens flex."
  ],
  [
   "justify-content atua em qual eixo?",
   "No principal (por padrão, horizontal)."
  ],
  [
   "align-items atua em qual eixo?",
   "No cruzado (por padrão, vertical)."
  ],
  [
   "Para que serve gap?",
   "Espaço entre os itens do flex ou grid."
  ],
  [
   "O que faz flex-wrap: wrap?",
   "Permite quebrar os itens em várias linhas."
  ],
  [
   "position: fixed faz o quê?",
   "Prende o elemento na tela, mesmo rolando a página."
  ]
 ],
 "vf": [
  [
   "O padding fica fora da borda.",
   false,
   "Fica entre o conteúdo e a borda."
  ],
  [
   "A margem tem a cor de fundo do elemento.",
   false,
   "É transparente."
  ],
  [
   "Com border-box a caixa não cresce ao aumentar o padding.",
   true,
   "O conteúdo é que diminui."
  ],
  [
   "justify-content: center centraliza no eixo principal.",
   true,
   "Por padrão, na horizontal."
  ],
  [
   "Flexbox serve para layouts em uma dimensão.",
   true,
   "Linha ou coluna; Grid é bidimensional."
  ],
  [
   "flex-direction: column empilha os itens.",
   true,
   "O eixo principal vira vertical."
  ],
  [
   "Um elemento inline aceita width e height.",
   false,
   "Use inline-block ou block."
  ],
  [
   "position: absolute posiciona em relação ao ancestral posicionado mais próximo.",
   true,
   "Ou à página, se não houver."
  ],
  [
   "z-index maior fica por cima.",
   true,
   "Em elementos posicionados."
  ],
  [
   "gap funciona com display: flex.",
   true,
   "Em navegadores atuais."
  ],
  [
   "margin: 10px 20px aplica 10px nas laterais.",
   false,
   "10 em cima e embaixo, 20 nas laterais."
  ],
  [
   "align-items: center centraliza verticalmente os itens numa linha flex.",
   true,
   "Eixo cruzado."
  ]
 ],
 "caderno": [
  [
   "Desenhe o modelo de caixa e nomeie as camadas.",
   "De dentro para fora: content, padding, border, margin."
  ],
  [
   "Calcule a largura de width:150px; padding:10px; border:3px (sem border-box).",
   "150 + 20 + 6 = 176px."
  ],
  [
   "Escreva o CSS de um menu com logo à esquerda e links à direita.",
   ".topo { display:flex; justify-content:space-between; align-items:center; }"
  ],
  [
   "Escreva o CSS para centralizar um texto vertical e horizontalmente numa caixa de 200px de altura.",
   ".caixa { display:flex; justify-content:center; align-items:center; height:200px; }"
  ],
  [
   "Para que serve * { box-sizing: border-box }?",
   "Para as larguras ficarem previsíveis em todos os elementos."
  ],
  [
   "Diferença entre relative e absolute?",
   "relative desloca da posição normal e mantém o espaço; absolute sai do fluxo e posiciona pelo ancestral posicionado."
  ],
  [
   "Como fazer três cards com a mesma largura?",
   "Pai com display:flex; cada card com flex:1."
  ],
  [
   "O que acontece com os itens flex sem flex-wrap numa tela estreita?",
   "Eles encolhem e podem transbordar; com wrap, descem para a linha seguinte."
  ],
  [
   "Escreva margin para 8px em cima, 0 nas laterais e 24px embaixo.",
   "margin: 8px 0 24px;"
  ],
  [
   "Quando usar position: fixed?",
   "Em barras que devem ficar sempre visíveis, como um menu no topo ou um botão de ajuda."
  ]
 ],
 "pbl": [
  {
   "titulo": "Os cards desalinhados",
   "cenario": "<p>Três cards de cursos aparecem um embaixo do outro e com larguras diferentes.</p>",
   "passos": [
    [
     "Que propriedades resolvem?",
     "No pai: display:flex e gap; nos cards: flex:1 e padding iguais; box-sizing: border-box."
    ],
    [
     "E no celular?",
     "flex-wrap: wrap e uma largura mínima (flex: 1 1 250px) para quebrarem em coluna."
    ]
   ]
  },
  {
   "titulo": "O menu do grêmio",
   "cenario": "<p>O grêmio quer o logo à esquerda, os links à direita e o menu sempre visível ao rolar.</p>",
   "passos": [
    [
     "Escreva o CSS principal.",
     "header { display:flex; justify-content:space-between; align-items:center; position: sticky (ou fixed); top:0; }"
    ],
    [
     "Que cuidado tomar com position: fixed?",
     "O conteúdo fica por baixo: é preciso um espaço (padding-top no body) do tamanho do menu e z-index adequado."
    ]
   ]
  },
  {
   "titulo": "A caixa que estoura",
   "cenario": "<p>Uma coluna de 300px com padding 20px ficou maior que o espaço e quebrou o layout.</p>",
   "passos": [
    [
     "Por que isso acontece?",
     "Sem border-box, a largura real é 340px (300 + 40)."
    ],
    [
     "Duas soluções.",
     "Usar box-sizing: border-box ou reduzir a width para 260px."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Layout",
   "itens": [
    "content, padding, border, margin.",
    "border-box para larguras previsíveis.",
    "display e position.",
    "Flex: justify-content, align-items, gap, wrap, flex:1."
   ]
  }
 ],
 "glossario": [
  [
   "Eixo principal",
   "Direção do flex-direction."
  ],
  [
   "sticky",
   "Gruda ao rolar até certo ponto."
  ]
 ]
});
