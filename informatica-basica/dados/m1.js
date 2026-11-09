FSI.modulo({
 "n": 1,
 "unidade": "Unidade 1",
 "nome": "Introdução à informática",
 "titulo": "Hardware, software, peopleware e o mundo dos bits",
 "duracao": "4 h",
 "resumoCurto": "O que é Informática, a diferença entre Hardware/Software/Peopleware e como os computadores representam a informação em Bits e Bytes.",
 "analogia": {
  "titulo": "Interruptores de luz",
  "txt": "<p>Imagine uma fileira de 8 interruptores. Cada um só pode estar ligado (1) ou desligado (0) — isso é um <b>bit</b>. Com os 8 juntos (um <b>byte</b>) dá para fazer 256 combinações, o suficiente para representar uma letra. Todo texto, foto ou vídeo do computador é, no fundo, uma enorme fileira desses interruptores.</p>"
 },
 "chave": [
  "<b>Informática</b> = informação + automática: o tratamento automático da informação.",
  "<b>Hardware</b> é a parte física; <b>software</b>, a lógica; <b>peopleware</b>, as pessoas.",
  "<b>Bit</b> é 0 ou 1; <b>byte</b> = 8 bits = um caractere.",
  "Unidades: byte → KB → MB → GB → TB, cada uma 1024 vezes a anterior.",
  "Pioneiros: Babbage, Ada Lovelace, Turing, Grace Hopper."
 ],
 "objetivos": [
  "Diferenciar <b>hardware, software e peopleware</b>.",
  "Explicar <b>bit e byte</b> e converter unidades.",
  "Reconhecer os <b>pioneiros</b> da computação."
 ],
 "licoes": [
  {
   "t": "Os três “wares”",
   "txt": "<p>Teclado, tela e processador são <b>hardware</b> (dá para tocar). Windows, navegador e jogos são <b>software</b> (instruções). Quem usa, programa e mantém é o <b>peopleware</b>.</p>"
  },
  {
   "t": "Bits e bytes",
   "txt": "<p>Os circuitos só entendem dois estados, ligado e desligado, por isso o computador usa o sistema <b>binário</b>. 8 bits formam 1 byte; 1 KB = 1024 bytes; 1 MB = 1024 KB; 1 GB = 1024 MB; 1 TB = 1024 GB.</p>",
   "pense": "uma foto de 3 MB tem quantos KB?"
  },
  {
   "t": "Quem abriu o caminho",
   "txt": "<p>Charles Babbage projetou a Máquina Analítica; Ada Lovelace escreveu o primeiro algoritmo para ela; Alan Turing fundou a ciência da computação; Grace Hopper criou o compilador.</p>"
  }
 ],
 "termos": [
  [
   "Bit",
   "0 ou 1."
  ],
  [
   "Byte",
   "8 bits."
  ],
  [
   "Hardware",
   "Parte física."
  ],
  [
   "Software",
   "Parte lógica."
  ]
 ],
 "ler": [
  [
   "Trilha Windows 11",
   "trilha-windows-11.html"
  ],
  [
   "Método Office Visual",
   "metodo-office-visual.html"
  ],
  [
   "Apostila Informática do Zero",
   "apostila.html"
  ],
  [
   "Ambiente interativo (11 módulos)",
   "ambiente-interativo.html"
  ]
 ],
 "visuais": [
  {
   "tipo": "camadas",
   "id": "un",
   "titulo": "Do byte ao terabyte",
   "forma": "pilha",
   "h": 340,
   "camadas": [
    {
     "t": "Byte",
     "d": "8 bits: uma letra."
    },
    {
     "t": "Kilobyte (KB)",
     "d": "1024 bytes: um parágrafo."
    },
    {
     "t": "Megabyte (MB)",
     "d": "1024 KB: uma foto."
    },
    {
     "t": "Gigabyte (GB)",
     "d": "1024 MB: um filme."
    },
    {
     "t": "Terabyte (TB)",
     "d": "1024 GB: um HD comum."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Ligue e desligue bits para formar números e classifique o que é hardware, software e peopleware.",
  "sims": [
   {
    "tipo": "bases",
    "titulo": "Painel de bits",
    "cfg": {
     "id": "bits",
     "bits": 8,
     "alvos": [
      {
       "v": 5,
       "como": "dec",
       "dica": "4 + 1.",
       "expl": "5 = 00000101."
      },
      {
       "v": 65,
       "como": "dec",
       "dica": "64 + 1. É o código da letra A!",
       "expl": "65 = 01000001 = 'A' na tabela ASCII."
      },
      {
       "v": 255,
       "como": "dec",
       "dica": "Ligue tudo.",
       "expl": "255: o maior número num byte."
      }
     ]
    }
   },
   {
    "tipo": "classificar",
    "id": "lab-w",
    "titulo": "Hardware, software ou peopleware?",
    "cats": [
     "Hardware",
     "Software",
     "Peopleware"
    ],
    "itens": [
     [
      "Teclado",
      0
     ],
     [
      "Processador",
      0
     ],
     [
      "Pen drive",
      0
     ],
     [
      "Windows 11",
      1
     ],
     [
      "Navegador",
      1
     ],
     [
      "Antivírus",
      1
     ],
     [
      "Programadora",
      2
     ],
     [
      "Técnico de suporte",
      2
     ],
     [
      "Usuário",
      2
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Ligue o seu primeiro bit",
    "ev": "bits:bit"
   },
   {
    "id": "m2",
    "t": "Forme a letra A (65)",
    "ev": "bits:alvo:2"
   },
   {
    "id": "m3",
    "t": "Vença os 3 desafios de bits",
    "ev": "bits:todos"
   },
   {
    "id": "m4",
    "t": "Classifique os três “wares” sem erros",
    "ev": "vis:lab-w"
   }
  ],
  "guiados": [
   {
    "titulo": "Convertendo unidades",
    "txt": "<p>Use 1 KB = 1024 bytes e 1 MB = 1024 KB.</p>",
    "passos": [
     {
      "p": "Uma foto de 3 MB tem quantos KB?",
      "r": 3072,
      "un": "KB",
      "dica": "3 × 1024.",
      "expl": "3.072 KB."
     },
     {
      "p": "E quantos bytes?",
      "r": 3145728,
      "un": "bytes",
      "dica": "3.072 × 1024.",
      "expl": "3.145.728 bytes."
     },
     {
      "p": "Quantas fotos de 3 MB cabem num pen drive de 1 GB (1024 MB)? (número inteiro)",
      "r": 341,
      "un": "fotos",
      "dica": "1024 ÷ 3, sem a parte decimal.",
      "expl": "341 fotos."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "O que é Informática?",
   "Ciência que estuda o tratamento automático e racional da informação (Velloso, 2014). Vem de INFORmação + autoMÁTICA."
  ],
  [
   "Quais são as funções da Informática?",
   "Desenvolver novas máquinas, novos métodos de trabalho, construir aplicações automáticas e melhorar métodos existentes."
  ],
  [
   "O que é Hardware?",
   "A parte física do sistema de computação: o Sistema Central e os periféricos."
  ],
  [
   "O que é Software?",
   "A parte lógica do sistema de computação: Software Básico, Utilitário e Aplicativo."
  ],
  [
   "O que é Peopleware?",
   "As pessoas que trabalham com o computador: digitadores, programadores, analistas e usuários."
  ],
  [
   "O que é um Bit?",
   "A menor unidade de dado do computador. Pode assumir apenas dois valores: 0 ou 1."
  ],
  [
   "O que é um Byte?",
   "Um conjunto de 8 bits, suficiente para representar uma letra ou número."
  ],
  [
   "Quantos bits tem 1 Byte?",
   "8 bits."
  ],
  [
   "Quantos Bytes tem 1 Kilobyte (KB)?",
   "1024 Bytes."
  ],
  [
   "Quantos Kilobytes tem 1 Megabyte (MB)?",
   "1024 KB."
  ],
  [
   "Quantos Megabytes tem 1 Gigabyte (GB)?",
   "1024 MB."
  ],
  [
   "Qual é a ordem crescente das unidades de armazenamento?",
   "Byte → KB → MB → GB → TB → PB → EB → ZB → YB."
  ],
  [
   "Por que os computadores usam o sistema binário?",
   "Porque os circuitos eletrônicos só reconhecem dois estados físicos: ligado (1) e desligado (0)."
  ],
  [
   "Quem foi Ada Lovelace?",
   "Considerada a primeira programadora da história; escreveu o primeiro algoritmo para ser processado por uma máquina."
  ],
  [
   "Quem foi Grace Hopper?",
   "Pioneira da computação naval americana; inventou o compilador e a linguagem COBOL."
  ],
  [
   "Quem foi Charles Babbage?",
   "Considerado o \"Pai da Computação\"; projetou a Máquina Diferencial e a Máquina Analítica."
  ],
  [
   "Quem foi Alan Turing?",
   "Considerado o Pai da Ciência da Computação e da IA; ajudou a decifrar o código Enigma na 2ª Guerra Mundial."
  ],
  [
   "O que representa o sistema binário?",
   "Um sistema numérico com apenas dois estados possíveis: 0 e 1."
  ]
 ],
 "vf": [
  [
   "1 Byte é composto por 8 bits.",
   true,
   "Correto — essa é a definição padrão de Byte."
  ],
  [
   "Um Kilobyte (KB) equivale a exatamente 1000 bytes.",
   false,
   "Na verdade equivale a 1024 bytes, pois a base de cálculo é binária (2¹⁰), não decimal."
  ],
  [
   "Hardware é a parte lógica do computador, como os programas.",
   false,
   "Hardware é a parte FÍSICA do computador. A parte lógica (programas) é o Software."
  ],
  [
   "Peopleware refere-se às pessoas que interagem com o computador.",
   true,
   "Correto — inclui digitadores, programadores, analistas e usuários."
  ],
  [
   "Ada Lovelace é considerada a primeira programadora da história.",
   true,
   "Correto — ela escreveu o primeiro algoritmo destinado a ser processado por uma máquina."
  ],
  [
   "Um Bit pode assumir três valores possíveis: 0, 1 e 2.",
   false,
   "O Bit é binário e só pode assumir DOIS valores possíveis: 0 ou 1."
  ],
  [
   "1 Gigabyte (GB) é maior que 1 Terabyte (TB).",
   false,
   "É o contrário: 1 TB = 1024 GB. Portanto, o Terabyte é maior que o Gigabyte."
  ],
  [
   "A palavra \"Informática\" vem da junção de \"Informação\" e \"Automática\".",
   true,
   "Correto, conforme a origem apresentada por Velloso (2014)."
  ],
  [
   "Grace Hopper inventou o primeiro compilador e a linguagem COBOL.",
   true,
   "Correto — ela é uma referência histórica fundamental da computação."
  ],
  [
   "Os computadores processam informações usando o sistema decimal (base 10).",
   false,
   "Os computadores processam informações em sistema BINÁRIO (base 2), usando 0 e 1."
  ]
 ],
 "caderno": [
  [
   "Explique a origem da palavra Informática.",
   "Junção de INFORmação + autoMÁTICA: o tratamento automático da informação."
  ],
  [
   "Dê dois exemplos de hardware, dois de software e dois de peopleware na sua escola.",
   "Hardware: computadores do laboratório, projetor. Software: Windows, LibreOffice. Peopleware: professores, técnicos, alunos."
  ],
  [
   "Por que o computador usa o sistema binário?",
   "Porque os circuitos eletrônicos só reconhecem dois estados físicos: ligado (1) e desligado (0)."
  ],
  [
   "Quantos bits há em 4 bytes?",
   "32 bits (4 × 8)."
  ],
  [
   "Coloque em ordem crescente: GB, KB, TB, byte, MB.",
   "byte → KB → MB → GB → TB."
  ],
  [
   "Quantos MB tem 2 GB?",
   "2.048 MB (2 × 1024)."
  ],
  [
   "Por que o fabricante diz que o HD tem 1 TB e o Windows mostra cerca de 931 GB?",
   "O fabricante usa 1 TB = 1.000.000.000.000 bytes; o Windows divide por 1024 três vezes, o que dá cerca de 931 GB."
  ],
  [
   "Qual a contribuição de Ada Lovelace?",
   "Escreveu o primeiro algoritmo para a Máquina Analítica de Babbage: é considerada a primeira programadora."
  ],
  [
   "Qual a contribuição de Grace Hopper?",
   "Criou o compilador e participou da criação do COBOL, aproximando a programação da linguagem humana."
  ],
  [
   "Por que Alan Turing é chamado de pai da computação?",
   "Formalizou o que é computar (máquina de Turing), ajudou a quebrar o código Enigma e propôs o teste de Turing para a inteligência artificial."
  ]
 ],
 "pbl": [
  {
   "titulo": "Explicando Informática para um Iniciante",
   "cenario": "<p>Um colega de trabalho, que nunca estudou informática, ouviu você falar sobre \"bytes\" e \"hardware\" e ficou curioso. Ele pergunta: \"Isso tudo tem a ver com o quê, exatamente?\"</p>",
   "passos": [
    [
     "Explique, com suas próprias palavras, a diferença entre Hardware, Software e Peopleware usando exemplos do dia a dia dele.",
     "Hardware é o que se toca (o celular dele); software são os programas e aplicativos (WhatsApp); peopleware é quem usa e mantém (ele próprio, o técnico)."
    ],
    [
     "Se um arquivo de foto tem 3 MB, explique quantos KB e quantos Bytes isso representa aproximadamente.",
     "3 MB = 3 × 1024 = 3.072 KB = 3.072 × 1024 = 3.145.728 bytes (cerca de 3 milhões)."
    ],
    [
     "Descreva por que o computador \"pensa\" apenas em 0 e 1, e não em números decimais como nós.",
     "Porque os circuitos só têm dois estados confiáveis, ligado e desligado; com combinações de 0 e 1 representa-se qualquer número, letra ou cor."
    ],
    [
     "Escolha um dos pioneiros da computação estudados e explique por que a contribuição dessa pessoa ainda importa hoje.",
     "Ex.: Grace Hopper — o compilador permite escrever programas em linguagem próxima da humana, base de todas as linguagens que usamos hoje."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Conceitos",
   "itens": [
    "Hardware, software, peopleware.",
    "Bit, byte e unidades (×1024).",
    "Babbage, Ada, Turing, Hopper."
   ]
  }
 ],
 "glossario": [
  [
   "ASCII",
   "Tabela que associa números a caracteres."
  ],
  [
   "Binário",
   "Sistema de base 2."
  ]
 ]
});
