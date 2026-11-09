FSI.modulo({
 "n": 6,
 "unidade": "Unidade 5",
 "nome": "Oficina: posicionamento, formulários e projetos",
 "titulo": "Pôr a mão na massa: formulários completos, position e mini-projetos",
 "duracao": "12 h",
 "resumoCurto": "Formulários acessíveis, seletores e propriedades em prática, box model aplicado e posicionamento (relative, absolute, fixed, sticky) em quatro mini-projetos.",
 "analogia": {
  "titulo": "Montar um mural de avisos",
  "txt": "<p>Num mural, você prende cada aviso num lugar: alguns <b>seguem o fluxo</b> (um embaixo do outro), outros ficam <b>colados num canto</b> do quadro (absolute), um aviso importante fica <b>sempre visível</b> no topo (fixed) e o título de cada seção <b>acompanha</b> quem rola a página até a próxima seção (sticky).</p><p>Esta oficina é prática: você escreve HTML e CSS num editor ao vivo, e o resultado é conferido sozinho. Os exercícios foram inspirados nas trilhas públicas <i>The Origins I: HTML</i> e <i>The Origins II: CSS</i>, do Codédex (licença MIT), reescritos em português.</p>"
 },
 "chave": [
  "Formulário acessível: cada campo tem <code>&lt;label for&gt;</code> ligado a um <code>id</code>; use <code>type</code> certo (<code>email</code>, <code>date</code>, <code>number</code>) e <code>required</code>.",
  "Opções exclusivas (rádio) compartilham o mesmo <code>name</code>; várias escolhas usam <code>checkbox</code>; listas usam <code>&lt;select&gt;</code>.",
  "<code>position: static</code> é o padrão (segue o fluxo); <code>relative</code> mantém o lugar e serve de referência.",
  "<code>absolute</code> sai do fluxo e se posiciona em relação ao ancestral <b>posicionado</b> mais próximo.",
  "<code>fixed</code> fica preso à janela; <code>sticky</code> gruda ao rolar, dentro do seu contêiner.",
  "<code>z-index</code> decide quem fica na frente, e só vale em elementos posicionados.",
  "Projeto bom = HTML semântico + CSS organizado + teste em tela pequena e grande."
 ],
 "objetivos": [
  "Montar um <b>formulário</b> completo e acessível.",
  "Aplicar <b>seletores, cores e tipografia</b> num cartaz.",
  "Dimensionar caixas com <b>box model</b>.",
  "Usar <b>position</b>, <b>z-index</b> e sticky em páginas reais."
 ],
 "licoes": [
  {
   "t": "Formulários que funcionam para todos",
   "txt": "<p>Todo campo precisa de um rótulo ligado a ele:</p><pre><code>&lt;form action=\"/inscricao\" method=\"post\"&gt;\n  &lt;label for=\"nome\"&gt;Nome&lt;/label&gt;\n  &lt;input id=\"nome\" name=\"nome\" type=\"text\" required&gt;\n\n  &lt;label for=\"email\"&gt;E-mail&lt;/label&gt;\n  &lt;input id=\"email\" name=\"email\" type=\"email\" required&gt;\n\n  &lt;fieldset&gt;\n    &lt;legend&gt;Vai levar acompanhante?&lt;/legend&gt;\n    &lt;label&gt;&lt;input type=\"radio\" name=\"acomp\" value=\"sim\"&gt; Sim&lt;/label&gt;\n    &lt;label&gt;&lt;input type=\"radio\" name=\"acomp\" value=\"nao\"&gt; Não&lt;/label&gt;\n  &lt;/fieldset&gt;\n  &lt;button type=\"submit\"&gt;Enviar&lt;/button&gt;\n&lt;/form&gt;</code></pre><p>O <code>label for</code> amplia a área de clique e permite que leitores de tela anunciem o campo. Rádios com o mesmo <code>name</code> formam um grupo: só um fica marcado.</p>",
   "pense": "por que “Nome:” escrito ao lado do campo, sem label, não basta?"
  },
  {
   "t": "Seletores e propriedades em prática",
   "txt": "<p>Um cartaz usa quase tudo do módulo de CSS: classe para o título, cor de fundo e de texto, tamanho e alinhamento, e um link estilizado como botão:</p><pre><code>.titulo { font-size: 48px; text-align: center; }\n.data   { font-style: italic; }\n.ingresso {\n  display: inline-block;\n  padding: 12px 24px;\n  background: #f5c518;\n  color: #111;\n  text-decoration: none;\n  border-radius: 8px;\n}</code></pre><p>Lembre da <b>cascata</b>: regra mais específica vence; havendo empate, vence a última. Evite <code>!important</code>.</p>"
  },
  {
   "t": "position: o mural de avisos",
   "txt": "<p>Cada valor muda como o elemento é colocado:</p>",
   "pontos": [
    "<code>static</code> (padrão): segue o fluxo normal; ignora <code>top/left</code>.",
    "<code>relative</code>: fica no lugar, mas pode ser deslocado, e vira referência para filhos absolutos.",
    "<code>absolute</code>: sai do fluxo; <code>top/right/bottom/left</code> contam a partir do ancestral posicionado.",
    "<code>fixed</code>: preso à janela (banner, botão “voltar ao topo”).",
    "<code>sticky</code>: age como relative até certo ponto da rolagem e depois gruda (<code>top: 0</code>)."
   ]
  },
  {
   "t": "Combinando tudo num cartão com selo",
   "txt": "<p>O padrão clássico “selo no canto do cartão” usa dois valores juntos:</p><pre><code>.cartao { position: relative; }   /* referência */\n.selo   {\n  position: absolute;          /* sai do fluxo */\n  top: 8px;\n  right: 8px;\n}</code></pre><p>Sem <code>position: relative</code> no cartão, o selo iria para o canto da <b>página</b>, não do cartão. Para o menu ficar sempre visível: <code>.menu { position: fixed; top: 0; z-index: 10; }</code> e, para não cobrir o conteúdo, dê ao <code>body</code> um <code>padding-top</code>.</p>"
  }
 ],
 "termos": [
  [
   "label",
   "Rótulo ligado a um campo pelo atributo for."
  ],
  [
   "fieldset/legend",
   "Agrupam campos relacionados com um título."
  ],
  [
   "position",
   "Propriedade que define como o elemento é posicionado."
  ],
  [
   "Ancestral posicionado",
   "Pai (ou avô) com position diferente de static."
  ],
  [
   "z-index",
   "Ordem de empilhamento de elementos posicionados."
  ]
 ],
 "ler": [
  [
   "Apostila interativa de Construção de Sites",
   "apostila.html"
  ]
 ],
 "lab": {
  "intro": "Quatro mini-projetos no editor ao vivo. A pré-visualização atualiza sozinha e cada desafio é conferido automaticamente.",
  "sims": [
   {
    "tipo": "html",
    "titulo": "Projeto 1 · Confirmação de presença (formulário)",
    "cfg": {
     "id": "h6a",
     "codigo": "<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Minha página</title>\n  <style>\n    * { box-sizing: border-box; }\n    body { font-family: Arial, sans-serif; margin: 0; padding: 16px; }\n    /* escreva suas regras aqui */\n  </style>\n</head>\n<body>\n  <h1>Confirme sua presença</h1>\n  <!-- monte o formulário aqui -->\n</body>\n</html>",
     "desafios": [
      {
       "p": "Crie um <code>&lt;form&gt;</code>.",
       "teste": "!!q('form')",
       "dica": "<form> ... </form>",
       "expl": "O form agrupa os campos que serão enviados."
      },
      {
       "p": "Dentro do form, crie um campo de texto com <b>label ligado</b> (<code>label for</code> + <code>id</code> igual).",
       "teste": "(function(){var l=q('form label[for]');return !!l && !!q('#'+l.getAttribute('for'));})()",
       "dica": "<label for=\"nome\">Nome</label> <input id=\"nome\" type=\"text\">",
       "expl": "O for liga o rótulo ao campo."
      },
      {
       "p": "Inclua um campo de <b>e-mail obrigatório</b>.",
       "teste": "!!q('form input[type=email][required]')",
       "dica": "<input type=\"email\" required>",
       "expl": "O navegador valida o formato."
      },
      {
       "p": "Crie um grupo de <b>rádio</b> com pelo menos 2 opções de mesmo <code>name</code>.",
       "teste": "(function(){var r=qa('form input[type=radio]');return r.length>=2 && !!r[0].name && r[0].name===r[1].name;})()",
       "dica": "<input type=\"radio\" name=\"acomp\" value=\"sim\"> ...",
       "expl": "Mesmo name = só uma opção marcada."
      },
      {
       "p": "Inclua um <code>&lt;select&gt;</code> com pelo menos 3 <code>&lt;option&gt;</code>.",
       "teste": "!!q('form select') && qa('form select option').length>=3",
       "dica": "<select><option>…</option>…</select>",
       "expl": "Lista suspensa de escolha única."
      },
      {
       "p": "Termine com um botão de <b>enviar</b> dentro do form.",
       "teste": "!!q('form button[type=submit], form input[type=submit], form button:not([type])')",
       "dica": "<button type=\"submit\">Enviar</button>",
       "expl": "Sem botão, o usuário não consegue enviar."
      }
     ]
    }
   },
   {
    "tipo": "html",
    "titulo": "Projeto 2 · Cartaz do show (seletores e propriedades)",
    "cfg": {
     "id": "h6b",
     "codigo": "<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Minha página</title>\n  <style>\n    * { box-sizing: border-box; }\n    body { font-family: Arial, sans-serif; margin: 0; padding: 16px; }\n    /* escreva suas regras aqui */\n  </style>\n</head>\n<body>\n  <h1 class=\"titulo\">Noite do Forró Tech</h1>\n  <p class=\"data\">Sábado, 20h</p>\n  <p class=\"local\">Ginásio do campus</p>\n  <a class=\"ingresso\" href=\"#\">Garanta o seu ingresso</a>\n</body>\n</html>",
     "desafios": [
      {
       "p": "Centralize o <code>.titulo</code> e deixe a fonte com <b>40px ou mais</b>.",
       "teste": "css(q('.titulo'),'text-align')==='center' && parseFloat(css(q('.titulo'),'font-size'))>=40",
       "dica": ".titulo { text-align: center; font-size: 48px; }",
       "expl": "Título em destaque."
      },
      {
       "p": "Dê ao <code>body</code> um <b>fundo escuro</b>.",
       "teste": "(function(){var m=(css(doc.body,'background-color')).match(/[\\d.]+/g)||[0,0,0];return (m.length<4||+m[3]>0)?(+m[0]+ +m[1]+ +m[2]):-1;})()>=0 && (function(){var m=(css(doc.body,'background-color')).match(/[\\d.]+/g)||[0,0,0];return (m.length<4||+m[3]>0)?(+m[0]+ +m[1]+ +m[2]):-1;})()<300",
       "dica": "body { background: #1b1b2f; }",
       "expl": "Soma dos canais RGB baixa = cor escura."
      },
      {
       "p": "Deixe o texto do <code>body</code> <b>claro</b> para ler no fundo escuro.",
       "teste": "(function(){var m=(css(doc.body,'color')).match(/[\\d.]+/g)||[0,0,0];return (m.length<4||+m[3]>0)?(+m[0]+ +m[1]+ +m[2]):-1;})()>600",
       "dica": "body { color: #f2f2f2; }",
       "expl": "Contraste entre texto e fundo."
      },
      {
       "p": "Ponha a <code>.data</code> em <b>itálico</b>.",
       "teste": "css(q('.data'),'font-style')==='italic'",
       "dica": ".data { font-style: italic; }",
       "expl": "Detalhe tipográfico."
      },
      {
       "p": "Transforme o link <code>.ingresso</code> em <b>botão</b>: <code>inline-block</code>, padding de 10px ou mais e sem sublinhado.",
       "teste": "css(q('.ingresso'),'display')==='inline-block' && parseFloat(css(q('.ingresso'),'padding-top'))>=10 && css(q('.ingresso'),'text-decoration-line')==='none'",
       "dica": ".ingresso { display: inline-block; padding: 12px 24px; text-decoration: none; }",
       "expl": "Link com cara de botão."
      },
      {
       "p": "Dê ao botão uma <b>cor de fundo própria</b> (não transparente) e <b>cantos arredondados</b> de 6px ou mais.",
       "teste": "(function(){var b=css(q('.ingresso'),'background-color');return !/rgba\\(0, 0, 0, 0\\)|transparent/.test(b) && parseFloat(css(q('.ingresso'),'border-top-left-radius'))>=6;})()",
       "dica": ".ingresso { background: #f5c518; border-radius: 8px; }",
       "expl": "Chamada para ação visível."
      }
     ]
    }
   },
   {
    "tipo": "html",
    "titulo": "Projeto 3 · Cartão de perfil (box model)",
    "cfg": {
     "id": "h6c",
     "codigo": "<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Minha página</title>\n  <style>\n    * { box-sizing: border-box; }\n    body { font-family: Arial, sans-serif; margin: 0; padding: 16px; }\n    .cartao { background: #eef3ee; }\n    /* escreva suas regras aqui */\n  </style>\n</head>\n<body>\n  <article class=\"cartao\">\n    <h2>Ana Souza</h2>\n    <p>Estudante de Desenvolvimento de Sistemas</p>\n    <span class=\"tag\">HTML</span> <span class=\"tag\">CSS</span>\n  </article>\n</body>\n</html>",
     "desafios": [
      {
       "p": "Dê ao <code>.cartao</code> largura de <b>320px</b>.",
       "teste": "parseFloat(css(q('.cartao'),'width'))===320",
       "dica": ".cartao { width: 320px; }",
       "expl": "Com border-box, a largura inclui padding e borda."
      },
      {
       "p": "Acrescente <b>padding</b> de 20px ou mais.",
       "teste": "parseFloat(css(q('.cartao'),'padding-top'))>=20",
       "dica": ".cartao { padding: 24px; }",
       "expl": "Espaço entre o conteúdo e a borda."
      },
      {
       "p": "Ponha uma <b>borda sólida</b> de 2px ou mais.",
       "teste": "parseFloat(css(q('.cartao'),'border-top-width'))>=2 && css(q('.cartao'),'border-top-style')==='solid'",
       "dica": ".cartao { border: 2px solid #2d6a4f; }",
       "expl": "A borda marca o limite da caixa."
      },
      {
       "p": "Arredonde os cantos em <b>8px ou mais</b>.",
       "teste": "parseFloat(css(q('.cartao'),'border-top-left-radius'))>=8",
       "dica": ".cartao { border-radius: 12px; }",
       "expl": "border-radius suaviza os cantos."
      },
      {
       "p": "Centralize o cartão na página com <code>margin: 0 auto</code>.",
       "teste": "Array.prototype.some.call(doc.styleSheets,function(sh){return Array.prototype.some.call(sh.cssRules,function(r){return r.selectorText && /cartao/.test(r.selectorText) && r.style.marginLeft==='auto' && r.style.marginRight==='auto';});})",
       "dica": ".cartao { margin: 0 auto; }",
       "expl": "Margens automáticas dividem o espaço sobrando."
      },
      {
       "p": "Afaste as <code>.tag</code> entre si: <b>margin-right</b> de 8px ou mais e <b>padding</b> de 4px ou mais.",
       "teste": "parseFloat(css(q('.tag'),'margin-right'))>=8 && parseFloat(css(q('.tag'),'padding-top'))>=4",
       "dica": ".tag { margin-right: 8px; padding: 4px 8px; }",
       "expl": "Margem fora, padding dentro."
      }
     ]
    }
   },
   {
    "tipo": "html",
    "titulo": "Projeto 4 · Galeria com selo e banner fixo (position)",
    "cfg": {
     "id": "h6d",
     "codigo": "<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Minha página</title>\n  <style>\n    * { box-sizing: border-box; }\n    body { font-family: Arial, sans-serif; margin: 0; padding: 16px; }\n    main { padding-top: 48px; }\n    .card { border: 1px solid #999; padding: 24px; margin: 16px 0; }\n    .banner { background: #1f5135; color: #fff; padding: 12px; }\n    .secao { background: #fff; }\n    /* escreva suas regras aqui */\n  </style>\n</head>\n<body>\n  <header class=\"banner\">Exposição de Arte · entrada gratuita</header>\n  <main>\n    <h2 class=\"secao\">Pinturas</h2>\n    <div class=\"card\">\n      <span class=\"selo\">NOVO</span>\n      <p>Composição em vermelho, azul e amarelo</p>\n    </div>\n    <p style=\"height:500px\">Conteúdo longo para rolar a página…</p>\n    <h2 class=\"secao\">Esculturas</h2>\n    <p style=\"height:500px\">Mais conteúdo…</p>\n  </main>\n</body>\n</html>",
     "desafios": [
      {
       "p": "Faça do <code>.card</code> a <b>referência</b> dos filhos: <code>position: relative</code>.",
       "teste": "css(q('.card'),'position')==='relative'",
       "dica": ".card { position: relative; }",
       "expl": "Agora filhos absolutos se medem a partir do card."
      },
      {
       "p": "Coloque o <code>.selo</code> no <b>canto superior direito</b> do card: <code>absolute</code>, top e right de até 16px.",
       "teste": "css(q('.selo'),'position')==='absolute' && parseFloat(css(q('.selo'),'top'))<=16 && parseFloat(css(q('.selo'),'right'))<=16",
       "dica": ".selo { position: absolute; top: 8px; right: 8px; }",
       "expl": "O selo sai do fluxo e gruda no card."
      },
      {
       "p": "Prenda o <code>.banner</code> ao <b>topo da janela</b>: <code>fixed</code> com <code>top: 0</code> e <code>left: 0</code>.",
       "teste": "css(q('.banner'),'position')==='fixed' && css(q('.banner'),'top')==='0px' && css(q('.banner'),'left')==='0px'",
       "dica": ".banner { position: fixed; top: 0; left: 0; }",
       "expl": "Fixed ignora a rolagem."
      },
      {
       "p": "Faça o banner ocupar <b>toda a largura</b> (<code>right: 0</code>) e ficar <b>na frente</b> com <code>z-index</code> maior que 0.",
       "teste": "css(q('.banner'),'right')==='0px' && parseInt(css(q('.banner'),'z-index'))>0",
       "dica": ".banner { right: 0; z-index: 10; }",
       "expl": "z-index só funciona em elementos posicionados."
      },
      {
       "p": "Faça as <code>.secao</code> <b>grudarem</b> ao rolar: <code>position: sticky</code> e <code>top</code> de 40px ou mais (abaixo do banner).",
       "teste": "css(q('.secao'),'position')==='sticky' && parseFloat(css(q('.secao'),'top'))>=40",
       "dica": ".secao { position: sticky; top: 48px; }",
       "expl": "Cada título acompanha a rolagem até a próxima seção."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "cl6p",
    "titulo": "Qual valor de position?",
    "cats": [
     "static",
     "relative",
     "absolute",
     "fixed",
     "sticky"
    ],
    "itens": [
     [
      "Banner que não sai da tela ao rolar",
      3
     ],
     [
      "Selo no canto do cartão (o próprio selo)",
      2
     ],
     [
      "O cartão que serve de referência ao selo",
      1
     ],
     [
      "Comportamento padrão, segue o fluxo",
      0
     ],
     [
      "Título que gruda ao rolar a seção",
      4
     ],
     [
      "Botão “voltar ao topo” sempre visível",
      3
     ],
     [
      "Ignora top e left",
      0
     ],
     [
      "Sai do fluxo e se mede pelo ancestral posicionado",
      2
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Edite o código do formulário",
    "ev": "h6a:editou"
   },
   {
    "id": "m2",
    "t": "Complete o formulário de presença",
    "ev": "h6a:todos"
   },
   {
    "id": "m3",
    "t": "Termine o cartaz do show",
    "ev": "h6b:todos"
   },
   {
    "id": "m4",
    "t": "Monte o cartão de perfil",
    "ev": "h6c:todos"
   },
   {
    "id": "m5",
    "t": "Posicione a galeria",
    "ev": "h6d:todos"
   },
   {
    "id": "m6",
    "t": "Acerte os valores de position",
    "ev": "vis:cl6p"
   }
  ],
  "guiados": [
   {
    "titulo": "Contas do box model",
    "txt": "<p>Um cartão tem <code>width: 300px</code>, <code>padding: 20px</code> e <code>border: 5px</code> (com <code>box-sizing: content-box</code>).</p>",
    "passos": [
     {
      "p": "Qual a largura total da caixa, em px (sem margem)?",
      "r": 350,
      "un": "px",
      "dica": "300 + 20 + 20 + 5 + 5.",
      "expl": "Largura + padding dos dois lados + bordas dos dois lados."
     },
     {
      "p": "E com <code>border-box</code>, qual a largura total?",
      "r": 300,
      "un": "px",
      "dica": "border-box inclui padding e borda.",
      "expl": "A largura declarada já é a total."
     },
     {
      "p": "Quantos px sobram para o conteúdo em border-box?",
      "r": 250,
      "un": "px",
      "dica": "300 − 40 − 10.",
      "expl": "300 menos padding e bordas."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Para que serve o <code>&lt;label for=\"x\"&gt;</code>?",
   "Liga o rótulo ao campo de <code>id=\"x\"</code>: amplia o clique e ajuda leitores de tela."
  ],
  [
   "Como criar um grupo de opções exclusivas?",
   "Vários <code>input type=\"radio\"</code> com o mesmo <code>name</code>."
  ],
  [
   "Quando usar <code>checkbox</code> e quando <code>radio</code>?",
   "<code>checkbox</code> para várias escolhas; <code>radio</code> para apenas uma."
  ],
  [
   "O que faz o atributo <code>required</code>?",
   "Impede o envio do formulário com o campo vazio."
  ],
  [
   "O que são <code>&lt;fieldset&gt;</code> e <code>&lt;legend&gt;</code>?",
   "Agrupam campos relacionados e dão um título ao grupo."
  ],
  [
   "Qual o valor padrão de <code>position</code>?",
   "<code>static</code>: o elemento segue o fluxo normal."
  ],
  [
   "O que faz <code>position: relative</code>?",
   "Mantém o elemento no fluxo, permite deslocá-lo e o torna referência para filhos absolutos."
  ],
  [
   "O que faz <code>position: absolute</code>?",
   "Tira o elemento do fluxo e o posiciona em relação ao ancestral posicionado mais próximo."
  ],
  [
   "O que faz <code>position: fixed</code>?",
   "Prende o elemento à janela do navegador, mesmo com rolagem."
  ],
  [
   "O que faz <code>position: sticky</code>?",
   "Comporta-se como relative até um ponto da rolagem e depois gruda (por exemplo <code>top: 0</code>)."
  ],
  [
   "Para que serve o <code>z-index</code>?",
   "Define quem fica na frente; só vale em elementos posicionados."
  ],
  [
   "Como centralizar uma caixa com largura definida?",
   "<code>margin: 0 auto</code>."
  ]
 ],
 "vf": [
  [
   "Um <code>label</code> sem <code>for</code> já se liga ao campo que está ao lado.",
   false,
   "Sem <code>for</code> (ou sem envolver o campo), não há ligação."
  ],
  [
   "Rádios com <code>name</code> diferentes formam um único grupo.",
   false,
   "Só o mesmo <code>name</code> forma grupo."
  ],
  [
   "<code>type=\"email\"</code> valida o formato do e-mail no navegador.",
   true,
   "Validação básica nativa."
  ],
  [
   "<code>position: absolute</code> mantém o espaço do elemento no fluxo.",
   false,
   "Sai do fluxo; o espaço some."
  ],
  [
   "Sem ancestral posicionado, o absolute se mede pela página (viewport inicial).",
   true,
   "Por isso o pai costuma ser <code>relative</code>."
  ],
  [
   "<code>position: fixed</code> acompanha a rolagem da página.",
   false,
   "Fica parado na janela, não rola."
  ],
  [
   "<code>z-index</code> funciona em elementos com <code>position: static</code>.",
   false,
   "Precisa ser posicionado."
  ],
  [
   "<code>margin: 0 auto</code> centraliza uma caixa com largura definida.",
   true,
   "As margens laterais dividem o espaço."
  ],
  [
   "Com <code>box-sizing: border-box</code>, a largura inclui padding e borda.",
   true,
   "Facilita o cálculo."
  ],
  [
   "<code>sticky</code> exige um valor como <code>top</code> para saber onde grudar.",
   true,
   "Sem <code>top</code>, não gruda."
  ],
  [
   "Usar <code>!important</code> em tudo é uma boa prática para resolver conflitos.",
   false,
   "Atrapalha a manutenção; prefira especificidade."
  ],
  [
   "Um botão <code>type=\"submit\"</code> dentro do form envia os dados.",
   true,
   "Dispara o envio."
  ]
 ],
 "caderno": [
  [
   "Escreva um formulário com nome, e-mail e um botão, todos acessíveis.",
   "label for + input id; type=\"email\"; button type=\"submit\"."
  ],
  [
   "Qual a diferença entre <code>radio</code> e <code>checkbox</code>? Dê um uso para cada.",
   "Radio: uma opção (sexo/turno); checkbox: várias (interesses)."
  ],
  [
   "Corrija: <code>&lt;input type=\"radio\" name=\"a\"&gt; Sim &lt;input type=\"radio\" name=\"b\"&gt; Não</code>",
   "Os dois precisam do mesmo name; senão ambos podem ficar marcados."
  ],
  [
   "Calcule a largura total com <code>content-box</code>: width 200, padding 10, borda 2.",
   "200 + 20 + 4 = 224 px."
  ],
  [
   "E com <code>border-box</code>?",
   "200 px."
  ],
  [
   "Escreva o CSS para um selo no canto superior direito de um cartão.",
   ".cartao { position: relative } .selo { position: absolute; top: 8px; right: 8px }"
  ],
  [
   "Por que o selo foi parar no canto da página?",
   "O cartão não tinha position: relative; o absolute se mediu pelo ancestral posicionado mais distante (ou pela página)."
  ],
  [
   "Escreva o CSS de um banner fixo no topo que não cubra o conteúdo.",
   ".banner { position: fixed; top: 0; left: 0; right: 0; z-index: 10 } body { padding-top: altura-do-banner }"
  ],
  [
   "Quando usar sticky em vez de fixed?",
   "Quando o elemento deve grudar só dentro da sua seção (títulos de seção, cabeçalhos de tabela)."
  ],
  [
   "Liste três verificações antes de publicar um mini-projeto.",
   "Validar HTML, testar em tela pequena e grande, checar contraste e alt das imagens."
  ]
 ],
 "pbl": [
  {
   "titulo": "Convite de aniversário com RSVP",
   "cenario": "<p>Uma turma quer um convite online com data, local e um formulário para confirmar presença e escolher o sabor do bolo.</p>",
   "passos": [
    [
     "Que seções e campos o convite precisa?",
     "Cabeçalho com título, data e local; formulário com nome, e-mail, rádio sim/não e select de sabores."
    ],
    [
     "Escreva o HTML semântico do formulário.",
     "form com labels ligados, fieldset/legend para o rádio, select e button submit."
    ],
    [
     "Estilize como cartão centralizado.",
     ".convite { max-width: 400px; margin: 0 auto; padding: 24px; border: 2px solid ...; border-radius: 12px }"
    ]
   ]
  },
  {
   "titulo": "Galeria de arte com menu fixo",
   "cenario": "<p>O museu da cidade quer uma página com várias obras, um menu sempre visível e um selo “Novo” nas últimas obras.</p>",
   "passos": [
    [
     "Que valores de position resolvem menu e selo?",
     "Menu fixed (topo); card relative + selo absolute."
    ],
    [
     "Como evitar que o menu cubra o primeiro conteúdo?",
     "padding-top no body (ou margin-top no main) igual à altura do menu."
    ],
    [
     "Como fazer os títulos de seção acompanharem a rolagem?",
     "position: sticky com top igual à altura do menu."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Resumo do módulo",
   "itens": [
    "Formulário bom: label for + id, type certo, required, rádios com o mesmo name.",
    "position: static (fluxo), relative (referência), absolute (canto do ancestral), fixed (janela), sticky (gruda ao rolar).",
    "Selo no cartão = pai relative + filho absolute; z-index só em elementos posicionados."
   ]
  }
 ],
 "glossario": [
  [
   "Fluxo normal",
   "Ordem natural dos elementos, de cima para baixo."
  ],
  [
   "Viewport",
   "Área visível da janela do navegador."
  ]
 ]
});
