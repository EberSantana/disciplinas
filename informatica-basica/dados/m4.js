FSI.modulo({
 "n": 4,
 "unidade": "Unidade 1",
 "nome": "Windows, arquivos e pastas",
 "titulo": "Sistema operacional, organização de arquivos e linha de comando",
 "duracao": "6 h",
 "resumoCurto": "Evolução do Windows, suspensão e hibernação, arquivos, pastas, extensões, atalhos e comandos do prompt (MS-DOS).",
 "analogia": {
  "titulo": "O armário bem organizado",
  "txt": "<p>Um armário com gavetas etiquetadas (<b>pastas</b>) e cada coisa no seu lugar (<b>arquivos</b>) deixa tudo fácil de achar. A etiqueta no fim do nome — <b>.pdf</b>, <b>.jpg</b>, <b>.docx</b> — é a <b>extensão</b>, que diz que tipo de coisa é. E o <b>atalho</b> é um bilhete dizendo “o que você procura está naquela gaveta”.</p>"
 },
 "chave": [
  "O Windows evoluiu do 1.0 (1985) ao 11, com menu Iniciar centralizado.",
  "<b>Suspender</b> mantém na RAM; <b>hibernar</b> grava no disco.",
  "Arquivos ficam em <b>pastas</b>; a <b>extensão</b> indica o tipo.",
  "Atalho aponta para o original; copiar duplica.",
  "Prompt: DIR, CD, MD, RD, COPY, MOVE, DEL, REN."
 ],
 "objetivos": [
  "Organizar <b>arquivos e pastas</b>.",
  "Reconhecer <b>extensões</b>.",
  "Usar comandos básicos do <b>prompt</b>."
 ],
 "licoes": [
  {
   "t": "O Windows",
   "txt": "<p>Do Windows 95 (menu Iniciar) ao XP, 7 e 11. Desligar, suspender (rápido, na RAM) e hibernar (grava a sessão no disco, não gasta energia).</p>"
  },
  {
   "t": "Arquivos, pastas e extensões",
   "txt": "<p>.docx/.odt (texto), .xlsx/.ods (planilha), .pdf, .jpg/.png (imagem), .mp4 (vídeo), .zip (compactado), .exe (programa — cuidado!).</p>"
  },
  {
   "t": "Prompt de comando",
   "txt": "<p><code>DIR</code> lista, <code>CD</code> entra na pasta, <code>MD</code> cria, <code>RD</code> remove pasta vazia, <code>COPY</code> copia, <code>MOVE</code> move, <code>DEL *.tmp</code> apaga com curinga, <code>REN</code> renomeia.</p>"
  }
 ],
 "termos": [
  [
   "Extensão",
   "Indica o tipo do arquivo."
  ],
  [
   "Atalho",
   "Aponta para o original."
  ],
  [
   "Hibernar",
   "Salva a sessão no disco."
  ],
  [
   "Curinga",
   "* representa qualquer texto."
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
   "tipo": "linha",
   "id": "win",
   "titulo": "A evolução do Windows",
   "ordenar": true,
   "passos": [
    {
     "t": "Windows 1.0 (1985)",
     "d": "Janelas sobre o MS-DOS."
    },
    {
     "t": "Windows 95",
     "d": "Menu Iniciar e barra de tarefas."
    },
    {
     "t": "Windows XP",
     "d": "Estável e popular."
    },
    {
     "t": "Windows 7",
     "d": "Rápido e querido."
    },
    {
     "t": "Windows 8",
     "d": "Blocos para telas touch."
    },
    {
     "t": "Windows 11",
     "d": "Menu centralizado e Copilot."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Organize arquivos pela extensão e treine os comandos do prompt.",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-ext",
    "titulo": "Para que pasta vai cada arquivo?",
    "cats": [
     "Documentos",
     "Imagens",
     "Vídeos",
     "Programas"
    ],
    "itens": [
     [
      "trabalho.docx",
      0
     ],
     [
      "boletim.pdf",
      0
     ],
     [
      "orcamento.ods",
      0
     ],
     [
      "foto-feira.jpg",
      1
     ],
     [
      "logo.png",
      1
     ],
     [
      "aula-gravada.mp4",
      2
     ],
     [
      "instalador.exe",
      3
     ]
    ]
   },
   {
    "tipo": "cenarios",
    "titulo": "Qual comando do prompt?",
    "cfg": {
     "id": "dos",
     "rotulo": "Tarefa",
     "itens": [
      {
       "t": "Ver o que há na pasta atual",
       "ops": [
        [
         "DIR",
         true,
         "Lista arquivos e pastas."
        ],
        [
         "CD",
         false,
         "Muda de pasta."
        ],
        [
         "CLS",
         false,
         "Limpa a tela."
        ]
       ]
      },
      {
       "t": "Criar a pasta Fotos",
       "ops": [
        [
         "MD Fotos",
         true,
         "Make directory."
        ],
        [
         "RD Fotos",
         false,
         "Remove."
        ],
        [
         "DEL Fotos",
         false,
         "Apaga arquivos."
        ]
       ]
      },
      {
       "t": "Apagar todos os arquivos .tmp da pasta",
       "ops": [
        [
         "DEL *.tmp",
         true,
         "O curinga * pega todos com a extensão."
        ],
        [
         "DEL tmp",
         false,
         "Procuraria um arquivo chamado tmp."
        ],
        [
         "RD *.tmp",
         false,
         "RD remove pastas."
        ]
       ]
      },
      {
       "t": "Trocar o nome de relatorio.txt para final.txt",
       "ops": [
        [
         "REN relatorio.txt final.txt",
         true,
         "Rename."
        ],
        [
         "MOVE",
         false,
         "Move de lugar."
        ],
        [
         "COPY",
         false,
         "Duplica."
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
    "t": "Organize os arquivos sem erros",
    "ev": "vis:lab-ext"
   },
   {
    "id": "m2",
    "t": "Acerte todos os comandos",
    "ev": "dos:perfeito"
   },
   {
    "id": "m3",
    "t": "Ordene a evolução do Windows (Explorar)",
    "ev": "ord:win"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "Em que ano surgiu o Windows 1.0?",
   "1985."
  ],
  [
   "Qual foi o grande diferencial do Windows 95?",
   "Introduziu o Menu Iniciar e a Barra de Tarefas."
  ],
  [
   "Qual versão do Windows trouxe suporte USB e o Internet Explorer integrado?",
   "Windows 98 (1998)."
  ],
  [
   "Qual versão do Windows unificou as linhas de consumo e corporativa, com grande longevidade?",
   "Windows XP (2001)."
  ],
  [
   "Qual versão trouxe a interface visual \"Aero Glass\"?",
   "Windows Vista (2007)."
  ],
  [
   "Qual versão do Windows é lembrada por ser rápida, estável e muito querida pelos usuários?",
   "Windows 7 (2009)."
  ],
  [
   "Qual versão trouxe mudança radical para telas touch, com blocos dinâmicos?",
   "Windows 8 (2012)."
  ],
  [
   "Qual é a versão atual do Windows, com Menu Iniciar centralizado e IA integrada (Copilot)?",
   "Windows 11."
  ],
  [
   "Cite 3 das 7 funções principais do Windows 11.",
   "Gerenciamento de recursos, Interface gráfica (GUI), Multitarefa (entre outras: suporte a hardware, arquivos, segurança, conectividade)."
  ],
  [
   "O que é a suspensão do computador?",
   "Modo de baixo consumo de energia que permite retomar o trabalho rapidamente, sem desligar completamente."
  ],
  [
   "O que é a hibernação?",
   "Estado que salva documentos e programas abertos no disco rígido e desliga o computador, economizando energia."
  ],
  [
   "O que é a suspensão híbrida?",
   "Combinação de suspensão e hibernação, projetada especialmente para computadores desktop."
  ],
  [
   "Cite 3 sistemas operacionais além do Windows.",
   "Linux, macOS e Android (ou iOS)."
  ],
  [
   "O que caracteriza o Linux como sistema operacional?",
   "É open source (código aberto), muito usado em servidores e por desenvolvedores."
  ],
  [
   "Cite 3 distribuições Linux.",
   "Ubuntu, Fedora e Debian."
  ],
  [
   "O que é a GUI (Graphical User Interface)?",
   "Interface gráfica que permite interagir com o SO por meio de ícones, janelas e mouse."
  ],
  [
   "O que é a CLI (Command Line Interface)?",
   "Interface de linha de comando: mecanismo baseado em texto para interagir com o sistema operacional."
  ],
  [
   "Qual atalho abre o Explorador de Arquivos no Windows?",
   "Windows + E."
  ],
  [
   "O que é um arquivo?",
   "Um conjunto de dados armazenado com um nome único e uma extensão que indica seu tipo e conteúdo."
  ],
  [
   "O que é uma pasta (diretório)?",
   "Um recipiente que organiza e armazena arquivos e outras pastas, formando uma estrutura hierárquica."
  ],
  [
   "O que indica a extensão de um arquivo?",
   "O tipo de arquivo e qual programa deve abri-lo. Ex: .docx = Word, .xlsx = Excel."
  ],
  [
   "O que significa a extensão .exe?",
   "Executable — arquivo executável que contém um programa instalável/executável."
  ],
  [
   "O que significa a extensão .pdf?",
   "Portable Document Format — mantém a formatação do documento em qualquer sistema."
  ],
  [
   "O que é um arquivo compactado (.zip/.rar)?",
   "Um arquivo que agrupa e reduz o tamanho de vários arquivos; precisa ser descompactado para uso."
  ],
  [
   "O que faz o comando DIR no MS-DOS?",
   "Lista os arquivos e pastas do diretório atual."
  ],
  [
   "O que faz o comando CD no MS-DOS?",
   "Altera (navega) o diretório atual. \"CD..\" volta para a pasta anterior."
  ],
  [
   "O que faz o comando MD (ou MKDIR)?",
   "Cria uma nova pasta (Make Directory)."
  ],
  [
   "O que faz o comando RD?",
   "Remove um diretório vazio (Remove Directory)."
  ],
  [
   "Qual é a diferença entre COPY e MOVE no MS-DOS?",
   "COPY duplica o arquivo no destino, mantendo o original; MOVE transfere o arquivo, removendo-o da origem."
  ],
  [
   "O que faz o comando DEL?",
   "Exclui arquivos permanentemente."
  ],
  [
   "O que faz o comando REN?",
   "Renomeia arquivos ou diretórios."
  ],
  [
   "O que faz o comando CLS?",
   "Limpa a tela do Prompt de Comando."
  ],
  [
   "O que faz o comando VER no MS-DOS?",
   "Exibe a versão do sistema operacional."
  ],
  [
   "Como criar um arquivo de texto chamado arquivo.txt contendo \"Olá Mundo\" via linha de comando?",
   "Usando o comando: echo \"Olá Mundo\" > arquivo.txt"
  ],
  [
   "O que faz o comando DEL *.jpg?",
   "Apaga todos os arquivos com extensão .jpg da pasta atual, usando o caractere curinga (*)."
  ],
  [
   "O que é um atalho de arquivo no Windows?",
   "Um link que aponta para um arquivo original sem duplicá-lo, economizando espaço em disco."
  ]
 ],
 "vf": [
  [
   "O Windows 95 foi a primeira versão a introduzir o Menu Iniciar.",
   true,
   "Correto — essa foi uma das grandes novidades do Windows 95 em relação às versões anteriores."
  ],
  [
   "O Windows Vista é anterior ao Windows XP.",
   false,
   "É o contrário: o Windows XP é de 2001 e o Windows Vista é de 2007 — portanto, o Vista é posterior."
  ],
  [
   "A hibernação desliga completamente o computador, salvando o trabalho no disco rígido antes.",
   true,
   "Correto — diferente da suspensão, a hibernação grava tudo no HD/SSD e desliga a máquina."
  ],
  [
   "O Linux é um sistema operacional proprietário, assim como o Windows.",
   false,
   "O Linux é Open Source (código aberto); o Windows é que é proprietário."
  ],
  [
   "O Windows 11 é a única versão do Windows que já existiu.",
   false,
   "Existem diversas versões anteriores, como Windows 1.0, 95, 98, XP, Vista, 7, 8 e 10."
  ],
  [
   "A suspensão híbrida combina suspensão e hibernação, sendo indicada para desktops.",
   true,
   "Correto — essa opção existe para casos em que a energia pode ser interrompida, como em computadores de mesa."
  ],
  [
   "Multitarefa significa que o Windows só permite executar um programa por vez.",
   false,
   "É o oposto: multitarefa significa executar VÁRIOS programas simultaneamente."
  ],
  [
   "O atalho Windows + E abre o Explorador de Arquivos no Windows.",
   true,
   "Correto — é um dos atalhos mais usados no dia a dia."
  ],
  [
   "O Android é um sistema operacional voltado principalmente para computadores desktop.",
   false,
   "O Android é voltado principalmente para dispositivos móveis, como smartphones e tablets."
  ],
  [
   "A CLI permite interagir com o sistema operacional digitando comandos de texto.",
   true,
   "Correto — ao contrário da GUI (gráfica), a CLI é baseada em texto."
  ],
  [
   "Um arquivo não precisa de extensão para ser reconhecido pelo computador.",
   false,
   "A extensão é o que identifica o tipo de arquivo e qual programa deve abri-lo; sem ela, o sistema pode não saber como tratá-lo."
  ],
  [
   "O comando DIR lista os arquivos e pastas do diretório atual no MS-DOS.",
   true,
   "Correto — é um dos comandos mais básicos e usados de navegação."
  ],
  [
   "O comando MD serve para apagar uma pasta.",
   false,
   "O MD (Make Directory) serve para CRIAR uma pasta. Quem remove um diretório vazio é o comando RD."
  ],
  [
   "O comando COPY remove o arquivo do local de origem depois de copiá-lo.",
   false,
   "O COPY mantém o arquivo original na origem e cria uma cópia no destino. Quem remove da origem é o comando MOVE."
  ],
  [
   "A extensão .pdf mantém a formatação do documento em qualquer sistema operacional.",
   true,
   "Correto — essa é uma das principais vantagens do formato PDF."
  ],
  [
   "Um arquivo .zip é um exemplo de arquivo compactado que agrupa outros arquivos.",
   true,
   "Correto — arquivos ZIP reduzem o tamanho e agrupam múltiplos arquivos em um só."
  ],
  [
   "O comando CLS serve para copiar arquivos entre pastas.",
   false,
   "O CLS apenas LIMPA A TELA do Prompt de Comando; não tem relação com copiar arquivos."
  ],
  [
   "Uma pasta pode conter tanto arquivos quanto outras pastas dentro dela.",
   true,
   "Correto — essa é a base da estrutura hierárquica de diretórios (árvore de pastas)."
  ],
  [
   "O comando \"echo Olá Mundo > arquivo.txt\" exclui o arquivo arquivo.txt.",
   false,
   "Esse comando CRIA (ou sobrescreve) o arquivo arquivo.txt com o texto \"Olá Mundo\" dentro dele — não o exclui."
  ],
  [
   "Um atalho de arquivo no Windows é uma cópia completa e independente do arquivo original.",
   false,
   "Um atalho é apenas um LINK que aponta para o arquivo original; ele não duplica o conteúdo, economizando espaço."
  ]
 ],
 "caderno": [
  [
   "Qual a diferença entre suspender e hibernar?",
   "Suspender mantém a sessão na RAM (gasta pouca energia, volta rápido); hibernar grava a sessão no disco e desliga."
  ],
  [
   "Qual a diferença entre copiar um arquivo e criar um atalho?",
   "Copiar cria um segundo arquivo; o atalho só aponta para o original e ocupa quase nada."
  ],
  [
   "Por que desconfiar de um anexo chamado foto.jpg.exe?",
   "A extensão real é .exe: é um programa disfarçado de imagem, possível malware."
  ],
  [
   "Proponha uma estrutura de pastas para seus estudos.",
   "Ex.: Estudos > 2026 > Informática Básica > Trabalhos / Provas / Materiais."
  ]
 ],
 "pbl": [
  {
   "titulo": "Escolhendo o Sistema Certo",
   "cenario": "<p>Um pequeno escritório de contabilidade vai renovar seus computadores e pede sua opinião sobre qual sistema operacional adotar.</p>",
   "passos": [
    [
     "Compare Windows e Linux em termos de custo de licença e facilidade de uso para funcionários não-técnicos.",
     "Windows: licença paga, mas familiar; Linux: gratuito, exige adaptação. Para não técnicos, o Windows tende a ser mais fácil; o Linux com LibreOffice reduz custos."
    ],
    [
     "Explique em que situação você recomendaria colocar os computadores em \"hibernação\" em vez de \"desligar\".",
     "Ao parar o trabalho por horas mantendo programas abertos, sem gastar energia: a sessão volta exatamente como estava."
    ],
    [
     "Um funcionário reclama que o computador está lento com muitos programas abertos ao mesmo tempo. Que conceito estudado neste módulo explica isso, e o que você recomendaria?",
     "Falta de memória RAM (gerência de memória do SO usando o disco); recomendar fechar programas e aumentar a RAM."
    ],
    [
     "Monte uma linha do tempo resumida (3 a 4 marcos) mostrando como o Windows evoluiu até hoje, para apresentar ao escritório.",
     "1985 Windows 1.0 → 1995 Windows 95 (menu Iniciar) → 2001 XP → 2021 Windows 11."
    ]
   ]
  },
  {
   "titulo": "Organizando o HD Bagunçado",
   "cenario": "<p>Você está ajudando um amigo a organizar seu computador, que tem centenas de arquivos soltos na Área de Trabalho, sem nenhuma pasta organizando por tipo.</p>",
   "passos": [
    [
     "Proponha uma estrutura de pastas (com pelo menos 3 níveis) para organizar documentos, fotos e vídeos desse usuário.",
     "Ex.: Documentos > Escola > 2026; Imagens > Viagens > 2025; Vídeos > Família."
    ],
    [
     "Ele tem 50 arquivos de imagem (.jpg) misturados com documentos. Que comando do MS-DOS ajudaria a localizar e mover apenas esses arquivos rapidamente?",
     "MOVE *.jpg C:\\Imagens\\ — o curinga seleciona todas as imagens."
    ],
    [
     "Explique a diferença entre simplesmente copiar os arquivos para uma pasta nova e criar um atalho para eles, e qual opção você recomendaria neste caso.",
     "Copiar duplica e ocupa espaço; atalho só aponta. Para organizar, mover os originais; usar atalhos só para acesso rápido."
    ],
    [
     "Ele quer excluir de uma vez todos os arquivos temporários com extensão .tmp de uma pasta. Escreva o comando do MS-DOS que faria isso usando curinga.",
     "DEL *.tmp"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Windows e arquivos",
   "itens": [
    "Suspender × hibernar.",
    "Pastas, arquivos e extensões.",
    "DIR, CD, MD, RD, COPY, MOVE, DEL, REN."
   ]
  }
 ],
 "glossario": [
  [
   "Explorador de Arquivos",
   "Programa que mostra pastas e arquivos (Win+E)."
  ]
 ]
});
