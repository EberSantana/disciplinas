FSI.modulo({
 "n": 5,
 "unidade": "Unidade 5",
 "nome": "Design, acessibilidade e publicação",
 "titulo": "Bonita, fácil de usar, para todos — e no ar",
 "duracao": "10 h",
 "resumoCurto": "Princípios de web design, usabilidade, acessibilidade (WCAG), SEO on-page, tipos de site e publicação no GitHub Pages.",
 "analogia": {
  "titulo": "A loja de portas abertas",
  "txt": "<p>Uma loja bonita mas com degrau na entrada, letreiro apagado e corredores confusos perde clientes. Um site também: <b>design</b> organiza, <b>usabilidade</b> facilita, <b>acessibilidade</b> abre a porta para todos — inclusive quem usa leitor de tela ou só o teclado — e o <b>SEO</b> é o letreiro que faz o Google achar a loja.</p>"
 },
 "chave": [
  "Design: hierarquia, alinhamento, contraste, repetição e espaço em branco.",
  "Usabilidade: o usuário acha o que quer em poucos cliques.",
  "Acessibilidade (WCAG): alt, contraste 4,5:1, foco visível, labels, navegação pelo teclado.",
  "SEO on-page: title, h1, description, URLs claras e conteúdo útil; evite texto escondido e repetição forçada.",
  "Responsivo: viewport e layouts que se adaptam ao celular.",
  "Publicação: GitHub Pages, hospedagem e domínio."
 ],
 "objetivos": [
  "Aplicar <b>princípios de design</b>.",
  "Verificar <b>acessibilidade</b> básica.",
  "Otimizar para <b>buscadores</b>.",
  "<b>Publicar</b> um site."
 ],
 "licoes": [
  {
   "t": "Design e usabilidade",
   "txt": "<p>Poucas cores e fontes, alinhamento consistente, contraste, espaço em branco e uma ação principal por página. Teste com usuários reais: se alguém se perde, o problema é do site.</p>"
  },
  {
   "t": "Acessibilidade",
   "txt": "<p>Alt nas imagens; contraste suficiente; links com texto que faz sentido (“Baixe o edital” em vez de “clique aqui”); labels nos campos; foco visível; tudo funcionando pelo teclado; <code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;</code> para o celular.</p>"
  },
  {
   "t": "SEO e publicação",
   "txt": "<p>title único e descritivo, um h1, meta description, URLs legíveis, imagens leves, links de outros sites para o seu (off-page). Publique de graça no <b>GitHub Pages</b>: crie o repositório, envie index.html e ative o Pages.</p>"
  }
 ],
 "termos": [
  [
   "WCAG",
   "Diretrizes de acessibilidade para a web."
  ],
  [
   "SEO",
   "Otimização para buscadores."
  ],
  [
   "Viewport",
   "Área visível; ajusta o site ao celular."
  ],
  [
   "GitHub Pages",
   "Hospedagem gratuita de sites estáticos."
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
   "tipo": "linha",
   "id": "pub",
   "titulo": "Do arquivo ao site no ar",
   "ordenar": true,
   "passos": [
    {
     "t": "Criar index.html e estilo.css",
     "d": "Testar no navegador."
    },
    {
     "t": "Criar conta e repositório no GitHub",
     "d": "Ex.: meu-site."
    },
    {
     "t": "Enviar os arquivos",
     "d": "Upload ou git push."
    },
    {
     "t": "Ativar o GitHub Pages",
     "d": "Settings › Pages › branch main."
    },
    {
     "t": "Abrir usuario.github.io/meu-site",
     "d": "Compartilhar o link."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Faça a auditoria de acessibilidade e SEO de uma página e corrija no editor.",
  "sims": [
   {
    "tipo": "html",
    "titulo": "Editor ao vivo: corrija a página",
    "cfg": {
     "id": "h5",
     "codigo": "<!doctype html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <title>Página</title>\n</head>\n<body>\n  <div class=\"t\">Feira de Ciências 2026</div>\n  <img src=\"cartaz.jpg\">\n  <p>Para baixar o edital <a href=\"edital.pdf\">clique aqui</a>.</p>\n  Nome: <input type=\"text\" id=\"nome\">\n</body>\n</html>",
     "desafios": [
      {
       "p": "Informe o idioma: <code>&lt;html lang=\"pt-BR\"&gt;</code>.",
       "teste": "/^pt/i.test(doc.documentElement.getAttribute('lang') || '')",
       "dica": "<html lang=\"pt-BR\">",
       "expl": "O leitor de tela fala em português."
      },
      {
       "p": "Coloque um <code>&lt;title&gt;</code> descritivo (com a palavra <b>Feira</b>).",
       "teste": "/feira/i.test(doc.title)",
       "dica": "<title>Feira de Ciências 2026 — IFS Tobias Barreto</title>",
       "expl": "Title é o item de SEO mais importante."
      },
      {
       "p": "Troque a div do título por um <code>&lt;h1&gt;</code>.",
       "teste": "!!q('h1') && /feira/i.test(q('h1').textContent)",
       "dica": "<h1>Feira de Ciências 2026</h1>",
       "expl": "Hierarquia de títulos real."
      },
      {
       "p": "Dê um <b>alt</b> descritivo à imagem.",
       "teste": "!!q('img') && (q('img').getAttribute('alt') || '').trim().length > 5",
       "dica": "alt=\"Cartaz da Feira de Ciências 2026\"",
       "expl": ""
      },
      {
       "p": "Troque “clique aqui” por um texto de link que faça sentido sozinho.",
       "teste": "!!q('a') && !/clique aqui/i.test(q('a').textContent) && q('a').textContent.trim().length > 5",
       "dica": "<a href=\"edital.pdf\">Baixe o edital da feira (PDF)</a>",
       "expl": "Leitores de tela listam os links fora de contexto."
      },
      {
       "p": "Ligue um <code>&lt;label&gt;</code> ao campo nome e acrescente a meta <b>viewport</b>.",
       "teste": "!!q('label[for=\"nome\"]') && !!q('meta[name=\"viewport\"]')",
       "dica": "<label for=\"nome\">Nome</label> e <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
       "expl": "Formulário acessível e página pronta para o celular."
      }
     ]
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Auditor de SEO",
    "cfg": {
     "id": "seo",
     "rotulo": "Prática",
     "medidor": {
      "nome": "Posição no Google",
      "ini": 40
     },
     "itens": [
      {
       "t": "Repetir “curso técnico Tobias Barreto” 40 vezes em texto branco no fundo branco.",
       "ops": [
        [
         "Evitar: é técnica proibida (texto oculto e repetição)",
         true,
         "Pode tirar o site do Google."
        ],
        [
         "Boa ideia: mais palavras-chave",
         false,
         "Penalizado."
        ]
       ]
      },
      {
       "t": "Cada página com title único e descritivo.",
       "ops": [
        [
         "Boa prática",
         true,
         "Ajuda o Google e o usuário."
        ],
        [
         "Irrelevante",
         false,
         "É o principal elemento on-page."
        ]
       ]
      },
      {
       "t": "Imagens de 8 MB sem compressão.",
       "ops": [
        [
         "Comprimir: página lenta perde posição",
         true,
         "Velocidade conta."
        ],
        [
         "Melhor qualidade, melhor posição",
         false,
         "Peso atrapalha."
        ]
       ]
      },
      {
       "t": "O jornal da cidade colocou um link para a página da feira.",
       "ops": [
        [
         "Ajuda: é SEO off-page",
         true,
         "Links de sites confiáveis aumentam a relevância."
        ],
        [
         "Não faz diferença",
         false,
         "Faz."
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
    "t": "Edite a página",
    "ev": "h5:editou"
   },
   {
    "id": "m2",
    "t": "Corrija 3 problemas",
    "ev": "h5:desafio:3"
   },
   {
    "id": "m3",
    "t": "Corrija os 6 problemas",
    "ev": "h5:todos"
   },
   {
    "id": "m4",
    "t": "Faça a auditoria de SEO",
    "ev": "seo:fim"
   },
   {
    "id": "m5",
    "t": "Ordene os passos da publicação (Explorar)",
    "ev": "ord:pub"
   }
  ],
  "guiados": [
   {
    "titulo": "Peso da página",
    "txt": "<p>Uma página tem HTML de <b>40 KB</b>, CSS de <b>60 KB</b> e <b>6 fotos de 500 KB</b>. A internet do visitante baixa <b>1 MB por segundo</b> (1 MB = 1000 KB).</p>",
    "passos": [
     {
      "p": "Peso total (KB)?",
      "r": 3100,
      "un": "KB",
      "dica": "40 + 60 + 6 × 500.",
      "expl": "3.100 KB."
     },
     {
      "p": "Segundos para baixar?",
      "r": 3.1,
      "tol": 0.05,
      "un": "s",
      "dica": "3.100 ÷ 1.000.",
      "expl": "3,1 s."
     },
     {
      "p": "Comprimindo cada foto para 150 KB, qual o novo total (KB)?",
      "r": 1000,
      "un": "KB",
      "dica": "40 + 60 + 900.",
      "expl": "1.000 KB: três vezes mais rápida."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Cite 3 princípios de design.",
   "Contraste, alinhamento, repetição, proximidade, hierarquia, espaço em branco."
  ],
  [
   "O que é usabilidade?",
   "Facilidade de usar: achar o que precisa com eficiência e satisfação."
  ],
  [
   "O que é a WCAG?",
   "Diretrizes internacionais de acessibilidade para conteúdo web."
  ],
  [
   "Qual o contraste mínimo para texto normal (nível AA)?",
   "4,5:1."
  ],
  [
   "Por que evitar “clique aqui”?",
   "O texto do link deve dizer aonde leva; leitores de tela listam links fora do contexto."
  ],
  [
   "Para que serve a meta viewport?",
   "Fazer a página se ajustar à largura do celular."
  ],
  [
   "O que é SEO on-page?",
   "Otimizações na própria página: title, h1, description, conteúdo, URLs, velocidade."
  ],
  [
   "O que é SEO off-page?",
   "Fatores externos, como links de outros sites para o seu."
  ],
  [
   "Cite uma técnica de SEO proibida.",
   "Texto oculto, repetição excessiva de palavras-chave, páginas só para robôs."
  ],
  [
   "Catálogo × loja virtual × marketplace?",
   "Catálogo mostra; loja vende os próprios produtos; marketplace reúne vários vendedores."
  ],
  [
   "Como publicar de graça um site estático?",
   "GitHub Pages (ou Netlify, Vercel)."
  ],
  [
   "O que é um domínio?",
   "O nome do site (ex.: ifs.edu.br), registrado num órgão como o Registro.br."
  ]
 ],
 "vf": [
  [
   "Acessibilidade beneficia só pessoas com deficiência.",
   false,
   "Beneficia todos: idosos, celular no sol, internet lenta."
  ],
  [
   "Todo o site deve funcionar só com o teclado.",
   true,
   "Requisito básico de acessibilidade."
  ],
  [
   "Esconder palavras-chave com texto branco melhora o SEO.",
   false,
   "É penalizado pelos buscadores."
  ],
  [
   "O title é um dos elementos mais importantes de SEO.",
   true,
   "Aparece na busca e na aba."
  ],
  [
   "Imagens pesadas deixam a página lenta e prejudicam o SEO.",
   true,
   "Velocidade é fator de ranqueamento."
  ],
  [
   "Remover o contorno de foco sem substituto é boa prática.",
   false,
   "Quem usa teclado se perde."
  ],
  [
   "GitHub Pages hospeda sites estáticos gratuitamente.",
   true,
   "HTML, CSS e JS."
  ],
  [
   "Portal é um site que reúne muitos conteúdos e serviços.",
   true,
   "Ex.: portais de notícias, gov.br."
  ],
  [
   "Muitas fontes e cores diferentes deixam o site mais profissional.",
   false,
   "Consistência transmite profissionalismo."
  ],
  [
   "Espaço em branco é desperdício.",
   false,
   "Organiza e dá respiro à leitura."
  ],
  [
   "Legendas em vídeo são recurso de acessibilidade.",
   true,
   "Para surdos e para quem está sem som."
  ],
  [
   "Sites responsivos se adaptam a diferentes tamanhos de tela.",
   true,
   "Com viewport, flex/grid e media queries."
  ]
 ],
 "caderno": [
  [
   "Liste 5 itens de uma checklist de acessibilidade.",
   "lang, alt, contraste, labels, foco visível, títulos em hierarquia, links descritivos, funciona pelo teclado."
  ],
  [
   "Reescreva: “Para ver as notas clique aqui”.",
   "“Veja as notas do 1º bimestre”, com o link nesse texto."
  ],
  [
   "Por que o design deve ter uma ação principal por página?",
   "Para o usuário saber o que fazer; muitas opções do mesmo peso confundem."
  ],
  [
   "Explique SEO on-page e off-page com um exemplo cada.",
   "On-page: title “Curso Técnico em Informática — IFS Tobias Barreto”. Off-page: o jornal da cidade linkar a página."
  ],
  [
   "Que tipo de site é a página do IFS? E a Amazon?",
   "Portal institucional; marketplace (e loja)."
  ],
  [
   "Quais os passos para publicar no GitHub Pages?",
   "Criar repositório, enviar index.html, Settings › Pages, escolher a branch, abrir o link."
  ],
  [
   "Escreva a meta description de uma página da feira.",
   "&lt;meta name=\"description\" content=\"Programação, inscrições e regulamento da Feira de Ciências 2026 do IFS Tobias Barreto.\">"
  ],
  [
   "Como testar se um site funciona pelo teclado?",
   "Navegar só com Tab, Shift+Tab, Enter e Espaço, observando o foco."
  ],
  [
   "Por que comprimir imagens?",
   "Reduz o tempo de carregamento, o consumo de dados e melhora o SEO."
  ],
  [
   "O que muda num site responsivo no celular?",
   "Colunas viram uma, fonte e botões legíveis, menu compacto, imagens ajustadas."
  ]
 ],
 "pbl": [
  {
   "titulo": "Auditoria do site do grêmio",
   "cenario": "<p>O site do grêmio é bonito, mas um aluno com baixa visão e outro que usa só teclado não conseguem usá-lo.</p>",
   "passos": [
    [
     "Monte o roteiro de auditoria.",
     "Contraste, tamanho de fonte, zoom a 200%, navegação por Tab, foco visível, alt, labels, títulos."
    ],
    [
     "Priorize 3 correções.",
     "Contraste e tamanho de fonte, foco visível com navegação pelo teclado, labels e textos de links."
    ]
   ]
  },
  {
   "titulo": "Ninguém acha a feira no Google",
   "cenario": "<p>A página da feira existe, mas não aparece na busca “feira de ciências Tobias Barreto”.</p>",
   "passos": [
    [
     "Diagnostique os prováveis problemas on-page.",
     "Title genérico (“Página”), sem h1, sem description, texto em imagens, página lenta."
    ],
    [
     "Proponha ações on e off-page.",
     "Title e h1 com os termos, description, conteúdo em texto, imagens leves; pedir links ao site do campus e ao jornal local."
    ]
   ]
  },
  {
   "titulo": "No ar até sexta",
   "cenario": "<p>A turma precisa publicar o portfólio até sexta, sem gastar nada.</p>",
   "passos": [
    [
     "Escolha a hospedagem e justifique.",
     "GitHub Pages: gratuito, simples, ótimo para HTML e CSS e ainda serve de portfólio."
    ],
    [
     "Liste os passos e o que testar depois de publicar.",
     "Repositório, upload, ativar Pages; testar o link no celular e no computador, os links internos, as imagens e o title."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Design e publicação",
   "itens": [
    "Contraste, alinhamento, repetição, espaço.",
    "WCAG: alt, contraste, foco, labels, teclado.",
    "SEO: title, h1, description, velocidade; evite truques.",
    "GitHub Pages."
   ]
  }
 ],
 "glossario": [
  [
   "Responsivo",
   "Adapta-se ao tamanho da tela."
  ],
  [
   "Registro.br",
   "Onde se registram domínios .br."
  ]
 ]
});
