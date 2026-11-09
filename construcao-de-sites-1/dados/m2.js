FSI.modulo({
 "n": 2,
 "unidade": "Unidade 2",
 "nome": "Links, mídias, tabelas e formulários",
 "titulo": "Ligando páginas, mostrando mídia, organizando dados e recebendo respostas",
 "duracao": "14 h",
 "resumoCurto": "Hiperlinks, imagens com alt, áudio e vídeo, listas, tabelas com colspan e rowspan, formulários com input, select, textarea e label.",
 "analogia": {
  "titulo": "Placas, vitrines e fichas",
  "txt": "<p>Links são as <b>placas</b> que levam a outro lugar. Imagens e vídeos são a <b>vitrine</b> — e o texto alternativo (alt) é a descrição da vitrine para quem não enxerga. Tabelas são <b>planilhas</b> para dados, não para montar layout. E o formulário é a <b>ficha de inscrição</b>: cada campo com sua etiqueta (label).</p>"
 },
 "chave": [
  "<code>&lt;a href=\"…\"&gt;</code> cria links; target=\"_blank\" abre em nova aba.",
  "<code>&lt;img src alt&gt;</code>: alt descreve a imagem para quem não vê.",
  "<code>&lt;audio&gt;</code> e <code>&lt;video&gt;</code> com controls.",
  "Listas: <code>&lt;ul&gt;</code> (marcadores) e <code>&lt;ol&gt;</code> (números).",
  "Tabela: table › tr › th/td; colspan e rowspan mesclam células.",
  "Formulário: form (action, method), input (type), select, textarea, label (for)."
 ],
 "objetivos": [
  "Criar <b>links</b> internos e externos.",
  "Inserir <b>imagens e mídia</b> acessíveis.",
  "Montar <b>tabelas</b> com mesclagem.",
  "Construir <b>formulários</b> com label."
 ],
 "licoes": [
  {
   "t": "Links e imagens",
   "txt": "<p><code>&lt;a href=\"contato.html\"&gt;Contato&lt;/a&gt;</code> (relativo), <code>&lt;a href=\"https://ifs.edu.br\" target=\"_blank\"&gt;IFS&lt;/a&gt;</code> (absoluto, nova aba), <code>&lt;a href=\"#rodape\"&gt;</code> (âncora). <code>&lt;img src=\"foto.jpg\" alt=\"Alunos na feira de ciências\" width=\"400\"&gt;</code>: o alt é obrigatório.</p>"
  },
  {
   "t": "Listas e tabelas",
   "txt": "<p>ul/ol com li; listas podem ser aninhadas. Tabela: <code>&lt;table&gt;</code>, linhas <code>&lt;tr&gt;</code>, cabeçalho <code>&lt;th&gt;</code>, células <code>&lt;td&gt;</code>, <code>&lt;caption&gt;</code>. colspan=\"2\" junta colunas; rowspan=\"2\" junta linhas.</p>"
  },
  {
   "t": "Formulários",
   "txt": "<p><code>&lt;form action=\"/enviar\" method=\"post\"&gt;</code>. GET manda os dados na URL; POST no corpo da requisição. Tipos de input: text, email, password, number, date, checkbox, radio, file. <code>&lt;label for=\"nome\"&gt;</code> ligado ao <code>&lt;input id=\"nome\"&gt;</code>. required torna obrigatório.</p>"
  }
 ],
 "termos": [
  [
   "href",
   "Destino do link."
  ],
  [
   "alt",
   "Texto alternativo da imagem."
  ],
  [
   "colspan",
   "Mescla colunas."
  ],
  [
   "label",
   "Rótulo de um campo."
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
   "id": "jogo-in",
   "titulo": "Jogo: que tipo de input?",
   "cats": [
    "email",
    "password",
    "date",
    "radio",
    "checkbox"
   ],
   "itens": [
    [
     "E-mail do aluno",
     0
    ],
    [
     "Senha",
     1
    ],
    [
     "Data de nascimento",
     2
    ],
    [
     "Turno: manhã, tarde ou noite (só um)",
     3
    ],
    [
     "Interesses: robótica, games, música (vários)",
     4
    ],
    [
     "Aceito os termos",
     4
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Monte a página de inscrição da feira de ciências: links, imagem, tabela e formulário — tudo conferido automaticamente.",
  "sims": [
   {
    "tipo": "html",
    "titulo": "Editor ao vivo: inscrição na feira",
    "cfg": {
     "id": "h2",
     "codigo": "<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Minha página</title>\n</head>\n<body>\n  <h1>Feira de Ciências</h1>\n  <p>Veja a programação e inscreva seu projeto.</p>\n\n  <form>\n    <!-- campos aqui -->\n  </form>\n</body>\n</html>",
     "desafios": [
      {
       "p": "Crie um link para <b>https://www.ifs.edu.br</b> que abra em nova aba.",
       "teste": "[...qa('a')].some(a => /ifs\\.edu\\.br/.test(a.getAttribute('href')||'') && a.getAttribute('target') === '_blank')",
       "dica": "<a href=\"https://www.ifs.edu.br\" target=\"_blank\">Site do IFS</a>",
       "expl": "target=\"_blank\" abre em nova aba."
      },
      {
       "p": "Insira uma imagem (qualquer src) com <b>texto alternativo</b>.",
       "teste": "[...qa('img')].some(i => (i.getAttribute('alt')||'').trim().length > 3)",
       "dica": "<img src=\"feira.jpg\" alt=\"Estudantes apresentando projetos\">",
       "expl": "Sem alt, quem usa leitor de tela não sabe o que é a imagem."
      },
      {
       "p": "Crie uma <b>tabela</b> com cabeçalho (th) e pelo menos 2 linhas de dados com horário e atividade.",
       "teste": "!!q('table th') && qa('table tr').length >= 3",
       "dica": "<table><tr><th>Horário</th><th>Atividade</th></tr><tr><td>8h</td><td>Abertura</td></tr>…</table>",
       "expl": "th marca o cabeçalho da coluna."
      },
      {
       "p": "No formulário, crie um campo de <b>e-mail obrigatório</b> com <code>&lt;label&gt;</code> ligado a ele.",
       "teste": "(() => { const i = q('form input[type=email][required]'); return !!i && !!i.id && !!q('label[for=\"' + i.id + '\"]'); })()",
       "dica": "<label for=\"email\">E-mail</label> <input type=\"email\" id=\"email\" required>",
       "expl": "O label com for = id liga o texto ao campo."
      },
      {
       "p": "Acrescente um <code>&lt;select&gt;</code> com pelo menos 3 áreas (option) e um botão de envio.",
       "teste": "qa('form select option').length >= 3 && !!q('form button, form input[type=submit]')",
       "dica": "<select><option>Robótica</option>…</select> <button>Inscrever</button>",
       "expl": "Formulário completo."
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Edite o código",
    "ev": "h2:editou"
   },
   {
    "id": "m2",
    "t": "Vença 3 desafios",
    "ev": "h2:desafio:3"
   },
   {
    "id": "m3",
    "t": "Vença os 5 desafios",
    "ev": "h2:todos"
   },
   {
    "id": "m4",
    "t": "Acerte os tipos de input (Explorar)",
    "ev": "vis:jogo-in"
   }
  ],
  "guiados": [
   {
    "titulo": "Planejando a tabela",
    "txt": "<p>Uma tabela de horários tem <b>3 colunas</b> (Horário, Atividade, Local) e <b>5 atividades</b>, mais a linha de cabeçalho.</p>",
    "passos": [
     {
      "p": "Quantos elementos tr a tabela terá?",
      "r": 6,
      "dica": "Cabeçalho + 5.",
      "expl": "6 linhas."
     },
     {
      "p": "Quantas células td (sem contar os th)?",
      "r": 15,
      "dica": "5 × 3.",
      "expl": "15 td."
     },
     {
      "p": "Se o almoço ocupar as colunas Atividade e Local, que valor de colspan usar?",
      "r": 2,
      "dica": "Duas colunas.",
      "expl": "colspan=\"2\"."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Para que serve o atributo href?",
   "Indicar o destino do link."
  ],
  [
   "Como abrir um link em nova aba?",
   "target=\"_blank\"."
  ],
  [
   "Diferença entre link relativo e absoluto?",
   "Relativo aponta para arquivos do mesmo site (contato.html); absoluto tem o endereço completo (https://…)."
  ],
  [
   "Para que serve o alt?",
   "Descrever a imagem para quem não a vê e quando ela não carrega."
  ],
  [
   "Qual a diferença entre ul e ol?",
   "ul usa marcadores; ol usa numeração."
  ],
  [
   "Para que serve o th?",
   "Célula de cabeçalho da tabela."
  ],
  [
   "O que faz colspan=\"3\"?",
   "A célula ocupa 3 colunas."
  ],
  [
   "O que faz rowspan=\"2\"?",
   "A célula ocupa 2 linhas."
  ],
  [
   "Diferença entre GET e POST?",
   "GET envia os dados na URL; POST no corpo da requisição (melhor para dados sensíveis)."
  ],
  [
   "Para que serve o label?",
   "Dar nome ao campo; clicando nele o foco vai para o campo; leitores de tela o anunciam."
  ],
  [
   "Radio × checkbox?",
   "Radio: uma opção entre várias; checkbox: várias opções."
  ],
  [
   "O que faz o atributo required?",
   "Impede enviar o formulário com o campo vazio."
  ]
 ],
 "vf": [
  [
   "O alt pode ficar vazio em imagens informativas.",
   false,
   "Só imagens puramente decorativas usam alt vazio."
  ],
  [
   "Tabelas devem ser usadas para montar o layout da página.",
   false,
   "Tabelas são para dados; layout é com CSS."
  ],
  [
   "rowspan mescla linhas.",
   true,
   "colspan mescla colunas."
  ],
  [
   "GET coloca os dados do formulário na URL.",
   true,
   "Por isso não se usa GET para senhas."
  ],
  [
   "input type=\"email\" valida o formato do e-mail.",
   true,
   "O navegador confere o @ e o domínio."
  ],
  [
   "Radio buttons do mesmo grupo precisam ter o mesmo name.",
   true,
   "Assim só um pode ser marcado."
  ],
  [
   "O atributo controls mostra os botões do vídeo.",
   true,
   "Play, pausa, volume."
  ],
  [
   "Um link para \"#contato\" leva a outro site.",
   false,
   "Leva ao elemento com id=\"contato\" na mesma página."
  ],
  [
   "textarea é usado para textos longos.",
   true,
   "Várias linhas."
  ],
  [
   "O for do label deve ser igual ao id do campo.",
   true,
   "É assim que eles se ligam."
  ],
  [
   "ol type=\"A\" numera com letras maiúsculas.",
   true,
   "Também há 1, a, I, i."
  ],
  [
   "iframe serve para incorporar outra página dentro da sua.",
   true,
   "Ex.: mapa ou vídeo."
  ]
 ],
 "caderno": [
  [
   "Escreva um link para contato.html e outro para o site do IFS em nova aba.",
   "&lt;a href=\"contato.html\">Contato&lt;/a> e &lt;a href=\"https://www.ifs.edu.br\" target=\"_blank\">IFS&lt;/a>."
  ],
  [
   "Escreva uma imagem acessível de um laboratório.",
   "&lt;img src=\"lab.jpg\" alt=\"Laboratório de informática com 20 computadores\">"
  ],
  [
   "Monte uma lista ordenada com 3 passos para salvar um arquivo.",
   "&lt;ol>&lt;li>Arquivo&lt;/li>&lt;li>Salvar como&lt;/li>&lt;li>Escolher pasta e nome&lt;/li>&lt;/ol>"
  ],
  [
   "Monte uma tabela 2 × 2 com cabeçalho.",
   "&lt;table>&lt;tr>&lt;th>Dia&lt;/th>&lt;th>Aula&lt;/th>&lt;/tr>&lt;tr>&lt;td>Seg&lt;/td>&lt;td>HTML&lt;/td>&lt;/tr>&lt;/table>"
  ],
  [
   "Quando usar POST em vez de GET?",
   "Com dados sensíveis (senhas), muitos dados ou quando o envio altera algo no servidor."
  ],
  [
   "Escreva um campo de senha com label.",
   "&lt;label for=\"senha\">Senha&lt;/label>&lt;input type=\"password\" id=\"senha\">"
  ],
  [
   "Escreva um grupo de radio para turno.",
   "&lt;input type=\"radio\" name=\"turno\" id=\"m\">&lt;label for=\"m\">Manhã&lt;/label> … mesmo name nos três."
  ],
  [
   "Para que serve caption?",
   "Título da tabela, lido por leitores de tela."
  ],
  [
   "Explique colspan e rowspan com um exemplo de horário escolar.",
   "Intervalo ocupando todas as colunas: colspan; aula dupla ocupando dois horários: rowspan."
  ],
  [
   "Por que o label melhora o formulário no celular?",
   "Tocar no texto também foca o campo: área de toque maior."
  ]
 ],
 "pbl": [
  {
   "titulo": "Cardápio em tabela",
   "cenario": "<p>A cantina quer o cardápio da semana numa tabela: dias nas colunas e refeições nas linhas; na sexta, o almoço e o lanche são um só (feijoada).</p>",
   "passos": [
    [
     "Planeje a tabela: quantas linhas e colunas e onde há mescla?",
     "Cabeçalho com os 5 dias + coluna de rótulos; na sexta, rowspan=\"2\" na célula da feijoada."
    ],
    [
     "Escreva o HTML da linha do almoço.",
     "&lt;tr>&lt;th>Almoço&lt;/th>&lt;td>…&lt;/td>…&lt;td rowspan=\"2\">Feijoada&lt;/td>&lt;/tr>"
    ]
   ]
  },
  {
   "titulo": "Inscrição no campeonato",
   "cenario": "<p>O grêmio quer um formulário com nome, e-mail, modalidade (futsal, vôlei, xadrez) e autorização dos pais.</p>",
   "passos": [
    [
     "Escolha o tipo de campo para cada dado.",
     "text (nome), email, select ou radio (modalidade), checkbox (autorização)."
    ],
    [
     "Que atributos garantem dados completos?",
     "required nos obrigatórios; type=\"email\"; label for em todos."
    ]
   ]
  },
  {
   "titulo": "Galeria acessível",
   "cenario": "<p>A página da viagem de campo tem 12 fotos sem alt e um vídeo sem controles.</p>",
   "passos": [
    [
     "Que problemas isso causa?",
     "Leitor de tela anuncia só o nome do arquivo; quem tem internet lenta não sabe o que falta; o vídeo não pode ser pausado."
    ],
    [
     "Como corrigir?",
     "alt descritivo em cada foto e controls no vídeo (e legenda, se houver fala)."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Conteúdo",
   "itens": [
    "a href, target, âncoras.",
    "img src alt; audio/video controls.",
    "ul, ol, li.",
    "table, tr, th, td, colspan, rowspan.",
    "form, input, select, textarea, label, required."
   ]
  }
 ],
 "glossario": [
  [
   "Âncora",
   "Link para um ponto da mesma página."
  ],
  [
   "Método",
   "GET ou POST no formulário."
  ]
 ]
});
