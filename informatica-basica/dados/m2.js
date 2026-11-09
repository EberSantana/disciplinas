FSI.modulo({
 "n": 2,
 "unidade": "Unidade 1",
 "nome": "Hardware e periféricos",
 "titulo": "CPU, memórias, placa-mãe e os periféricos de entrada e saída",
 "duracao": "5 h",
 "resumoCurto": "Conheça o Sistema Central (CPU, ULA, UC), os tipos de memória (RAM x ROM) e os principais componentes físicos de um computador.",
 "analogia": {
  "titulo": "O escritório",
  "txt": "<p>A <b>CPU</b> é o funcionário que faz o trabalho; a <b>RAM</b> é a mesa onde ficam os papéis em uso (some tudo quando a luz apaga); o <b>HD/SSD</b> é o arquivo de aço; a <b>placa-mãe</b> é o prédio que liga tudo. Os <b>periféricos</b> são as portas: por umas entram pedidos (teclado, mouse), por outras saem respostas (monitor, impressora).</p>"
 },
 "chave": [
  "<b>CPU</b> = UC (controla) + ULA (calcula).",
  "<b>RAM</b> é volátil; <b>ROM</b> guarda o firmware (BIOS/UEFI).",
  "<b>SSD</b> é muito mais rápido que o HD.",
  "Periféricos de <b>entrada</b>, <b>saída</b> e <b>híbridos</b>.",
  "A <b>placa-mãe</b> interliga todos os componentes."
 ],
 "objetivos": [
  "Identificar os <b>componentes</b> do computador.",
  "Diferenciar <b>RAM, ROM, HD e SSD</b>.",
  "Classificar <b>periféricos</b>."
 ],
 "licoes": [
  {
   "t": "Dentro do gabinete",
   "txt": "<p>Processador (CPU) com unidade de controle e ULA; memória RAM (principal, volátil); armazenamento HD ou SSD (secundário, permanente); placa-mãe com chipset e BIOS/UEFI; fonte de alimentação.</p>"
  },
  {
   "t": "Periféricos",
   "txt": "<p><b>Entrada</b>: teclado, mouse, microfone, webcam, scanner, leitor de código de barras. <b>Saída</b>: monitor, impressora, caixa de som, projetor. <b>Híbridos</b>: tela touch, multifuncional, pen drive.</p>"
  }
 ],
 "termos": [
  [
   "CPU",
   "Processador: UC + ULA."
  ],
  [
   "RAM",
   "Memória volátil de trabalho."
  ],
  [
   "SSD",
   "Armazenamento rápido sem partes móveis."
  ],
  [
   "Periférico híbrido",
   "Entrada e saída."
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
   "tipo": "classificar",
   "id": "jogo-per",
   "titulo": "Jogo: entrada, saída ou híbrido?",
   "cats": [
    "Entrada",
    "Saída",
    "Híbrido"
   ],
   "itens": [
    [
     "Teclado",
     0
    ],
    [
     "Webcam",
     0
    ],
    [
     "Leitor de código de barras",
     0
    ],
    [
     "Monitor",
     1
    ],
    [
     "Projetor",
     1
    ],
    [
     "Caixa de som",
     1
    ],
    [
     "Impressora multifuncional",
     2
    ],
    [
     "Tela touchscreen",
     2
    ],
    [
     "Pen drive",
     2
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Você é o técnico da loja: diagnostique os computadores dos clientes.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Assistência técnica",
    "cfg": {
     "id": "hw",
     "rotulo": "Cliente",
     "medidor": {
      "nome": "Clientes satisfeitos",
      "ini": 50
     },
     "itens": [
      {
       "t": "O notebook demora 3 minutos para ligar e tem HD.",
       "ops": [
        [
         "Trocar o HD por um SSD",
         true,
         "O SSD lê os arquivos muito mais rápido."
        ],
        [
         "Trocar o teclado",
         false,
         "Sem relação."
        ],
        [
         "Comprar um monitor maior",
         false,
         "Não muda a velocidade."
        ]
       ]
      },
      {
       "t": "Com navegador, planilha e música abertos, o PC de 4 GB trava.",
       "ops": [
        [
         "Aumentar a RAM",
         true,
         "Falta memória de trabalho."
        ],
        [
         "Trocar o mouse",
         false,
         "Sem relação."
        ],
        [
         "Formatar toda semana",
         false,
         "Não resolve a causa."
        ]
       ]
      },
      {
       "t": "A luz acabou e o texto não salvo sumiu.",
       "ops": [
        [
         "Estava só na RAM, que é volátil",
         true,
         "Salve com frequência."
        ],
        [
         "O SSD apagou",
         false,
         "O SSD guarda sem energia."
        ],
        [
         "Vírus",
         false,
         "Não é o caso."
        ]
       ]
      },
      {
       "t": "A escola quer imprimir, digitalizar e copiar com um só aparelho.",
       "ops": [
        [
         "Impressora multifuncional (periférico híbrido)",
         true,
         "Entrada (scanner) e saída (impressora)."
        ],
        [
         "Projetor",
         false,
         "Só saída."
        ],
        [
         "Webcam",
         false,
         "Só entrada."
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
    "t": "Resolva 3 diagnósticos",
    "ev": "hw:acertos:3"
   },
   {
    "id": "m2",
    "t": "Atenda todos os clientes sem erro",
    "ev": "hw:perfeito"
   },
   {
    "id": "m3",
    "t": "Classifique os periféricos (Explorar)",
    "ev": "vis:jogo-per"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que significa CPU?",
   "Central Processing Unit — o \"cérebro\" do computador, responsável por executar instruções e cálculos."
  ],
  [
   "Quais são as duas unidades internas da CPU?",
   "A ULA (Unidade Lógica e Aritmética) e a UC (Unidade de Controle)."
  ],
  [
   "Qual é a função da ULA?",
   "Realizar operações aritméticas e lógicas, além de tomadas de decisão."
  ],
  [
   "Qual é a função da UC?",
   "Controlar o fluxo de dados e interpretar cada instrução do programa."
  ],
  [
   "O que é a Memória RAM?",
   "Memória de trabalho temporária (volátil), usada para armazenar dados enquanto o computador está ligado."
  ],
  [
   "Por que a RAM é chamada de volátil?",
   "Porque perde todo o conteúdo assim que o computador é desligado ou a energia é cortada."
  ],
  [
   "O que é a Memória ROM?",
   "Memória somente leitura e não volátil, usada para instruções essenciais como o BIOS."
  ],
  [
   "Qual a diferença entre memória Principal e Auxiliar?",
   "A Principal (RAM) é temporária e rápida; a Auxiliar (HD, SSD, pendrive) é permanente e guarda dados/programas."
  ],
  [
   "O que é a Placa-Mãe (Motherboard)?",
   "O circuito principal que conecta e permite a comunicação entre todos os componentes do computador."
  ],
  [
   "Qual é a diferença entre HDD e SSD?",
   "HDD usa discos magnéticos giratórios (mais lento); SSD usa memória flash, sem partes móveis (mais rápido)."
  ],
  [
   "O que significa a arquitetura de 64 bits?",
   "A capacidade do processador de endereçar muito mais memória e processar mais dados por ciclo do que um de 32 bits."
  ],
  [
   "Quanto de RAM um processador de 32 bits consegue endereçar, no máximo?",
   "Cerca de 4 GB de RAM."
  ],
  [
   "Cite exemplos de memória auxiliar (secundária).",
   "Pen drives, HD (disco rígido), SSD, cartão SD, DVD/CD/Blu-Ray."
  ],
  [
   "O que armazena a BIOS?",
   "Instruções essenciais gravadas em ROM/Firmware, necessárias para iniciar (dar boot) no computador."
  ],
  [
   "O que é o Chipset?",
   "Circuito da placa-mãe que controla a comunicação entre CPU, memória e demais componentes."
  ],
  [
   "Qual componente é considerado o \"cérebro\" do computador?",
   "O processador (CPU)."
  ],
  [
   "O que é um periférico de entrada?",
   "Dispositivo que envia informações para o computador. Ex: Teclado, Mouse, Scanner."
  ],
  [
   "O que é um periférico de saída?",
   "Dispositivo que recebe informações do computador. Ex: Monitor, Impressora, Caixa de som."
  ],
  [
   "O que é um periférico híbrido?",
   "Dispositivo que funciona tanto como entrada quanto como saída. Ex: Monitor touchscreen, impressora multifuncional."
  ],
  [
   "Qual é a função do Monitor?",
   "Exibir visualmente os dados e informações processados pelo computador (periférico de saída)."
  ],
  [
   "Qual é a função do Teclado?",
   "Enviar caracteres, números e comandos ao computador (periférico de entrada)."
  ],
  [
   "Qual é a função do Mouse?",
   "Controlar o cursor na tela e executar ações clicando em ícones e botões (periférico de entrada)."
  ],
  [
   "Qual é a função da Impressora?",
   "Imprimir documentos digitais em papel ou outros materiais (periférico de saída)."
  ],
  [
   "O que é um Scanner?",
   "Periférico de entrada que captura imagens de documentos físicos e as converte em formato digital."
  ],
  [
   "O que é uma Webcam?",
   "Câmera digital (periférico de entrada) que captura vídeo para videoconferências."
  ],
  [
   "O que é um Microfone?",
   "Periférico de entrada que capta som do ambiente e o converte em sinal digital."
  ],
  [
   "Por que uma impressora multifuncional é considerada um periférico híbrido?",
   "Porque ela imprime (saída) e também digitaliza/copia documentos (entrada)."
  ],
  [
   "Por que um Monitor Touchscreen é um periférico híbrido?",
   "Porque exibe imagens (saída) e também recebe comandos de toque do usuário (entrada)."
  ],
  [
   "Cite um exemplo de periférico de saída usado para apresentações em sala de aula.",
   "O Projetor."
  ],
  [
   "Qual periférico converte código de barras em dados digitais?",
   "O Leitor de código de barras (periférico de entrada)."
  ]
 ],
 "vf": [
  [
   "A CPU é composta apenas pela Unidade de Controle (UC).",
   false,
   "A CPU é composta por DUAS unidades: a ULA e a UC, trabalhando em conjunto."
  ],
  [
   "A memória RAM mantém os dados salvos mesmo depois de desligar o computador.",
   false,
   "A RAM é volátil e perde os dados quando a energia é cortada; quem guarda dados permanentemente é a memória auxiliar (HD/SSD)."
  ],
  [
   "SSDs costumam ser mais rápidos que HDs por não terem partes mecânicas móveis.",
   true,
   "Correto — o SSD usa memória flash, sem discos giratórios, o que aumenta a velocidade de leitura/gravação."
  ],
  [
   "A Placa-Mãe é responsável por conectar e permitir a comunicação entre os componentes do computador.",
   true,
   "Correto, é justamente essa a função da motherboard."
  ],
  [
   "A ROM é uma memória volátil, assim como a RAM.",
   false,
   "A ROM é NÃO volátil — mantém seu conteúdo mesmo sem energia elétrica."
  ],
  [
   "Um processador de 64 bits pode endereçar muito mais memória do que um de 32 bits.",
   true,
   "Correto — processadores de 64 bits chegam à casa dos exabytes, contra apenas ~4 GB nos de 32 bits."
  ],
  [
   "A ULA é responsável por interpretar e controlar o fluxo das instruções do programa.",
   false,
   "Essa é a função da Unidade de Controle (UC). A ULA cuida das operações aritméticas e lógicas."
  ],
  [
   "Pendrives e cartões SD são exemplos de memória auxiliar (não volátil).",
   true,
   "Correto — são dispositivos de armazenamento permanente."
  ],
  [
   "O Chipset é um tipo de memória RAM usado apenas em notebooks.",
   false,
   "O Chipset é um circuito da placa-mãe que gerencia a comunicação entre componentes; não é um tipo de memória RAM."
  ],
  [
   "A BIOS é armazenada na memória RAM do computador.",
   false,
   "A BIOS é armazenada em memória ROM/Firmware, que é não volátil."
  ],
  [
   "Monitor e Impressora são periféricos de entrada.",
   false,
   "Monitor e Impressora são periféricos de SAÍDA. Teclado e Mouse é que são de ENTRADA."
  ],
  [
   "O Mouse é um periférico de entrada, pois envia comandos ao computador.",
   true,
   "Correto — o mouse envia dados (posição, cliques) para o computador processar."
  ],
  [
   "Um Headset (fone com microfone) pode ser considerado um periférico híbrido.",
   true,
   "Correto — o fone emite som (saída) e o microfone capta voz (entrada)."
  ],
  [
   "O Scanner é um periférico de saída, pois \"solta\" o documento digitalizado.",
   false,
   "O Scanner é um periférico de ENTRADA: ele envia a imagem capturada para o computador processar."
  ],
  [
   "Uma impressora multifuncional só consegue imprimir, nada mais.",
   false,
   "Ela é híbrida: além de imprimir (saída), também digitaliza e copia documentos (entrada)."
  ],
  [
   "O Plotter é um periférico de saída usado geralmente para imprimir plantas e desenhos técnicos em grande formato.",
   true,
   "Correto — o plotter é uma impressora especializada em formatos grandes."
  ],
  [
   "A Webcam é um periférico de saída porque exibe imagens na tela.",
   false,
   "A Webcam é um periférico de ENTRADA: ela captura vídeo e envia para o computador."
  ],
  [
   "Roteadores e modems podem ser considerados periféricos híbridos, pois enviam e recebem dados da rede.",
   true,
   "Correto — eles trocam dados nos dois sentidos com a rede/internet."
  ],
  [
   "Todo periférico de entrada também é, obrigatoriamente, um periférico de saída.",
   false,
   "Não — muitos periféricos são exclusivamente de entrada (ex: teclado, microfone) ou exclusivamente de saída (ex: monitor comum, caixa de som)."
  ],
  [
   "Caixas de som são periféricos de saída, pois reproduzem áudio processado pelo computador.",
   true,
   "Correto — elas recebem o sinal de áudio do computador e o transformam em som."
  ]
 ],
 "caderno": [
  [
   "Qual a diferença entre memória principal e auxiliar?",
   "Principal (RAM) guarda o que está em uso e é volátil; auxiliar (HD, SSD, pen drive) guarda permanentemente."
  ],
  [
   "Explique UC e ULA com uma analogia.",
   "UC é o maestro que coordena; ULA é a calculadora que faz contas e comparações."
  ],
  [
   "Por que um pen drive é periférico híbrido?",
   "Porque o computador lê dados dele (entrada) e grava dados nele (saída)."
  ],
  [
   "Monte uma configuração para um computador de estudo em 2026 e justifique.",
   "Ex.: processador de 4 núcleos ou mais, 16 GB de RAM, SSD de 512 GB: rapidez para abrir programas, folga para várias abas e espaço para arquivos."
  ]
 ],
 "pbl": [
  {
   "titulo": "Diagnosticando um Computador Lento",
   "cenario": "<p>Um cliente reclama que seu computador \"trava muito\" e demora para abrir programas. Como técnico, você suspeita de um problema de hardware.</p>",
   "passos": [
    [
     "Liste 3 componentes de hardware que podem causar lentidão se estiverem com defeito ou capacidade insuficiente.",
     "Armazenamento lento (HD), pouca memória RAM e processador fraco ou superaquecido (cooler sujo)."
    ],
    [
     "Explique por que trocar um HD por um SSD costuma resolver boa parte dos problemas de lentidão.",
     "O SSD não tem partes móveis e lê os dados dezenas de vezes mais rápido: o sistema e os programas abrem muito mais depressa."
    ],
    [
     "Se o computador tem pouca RAM, o que acontece quando o usuário abre muitos programas ao mesmo tempo?",
     "A RAM lota e o sistema passa a usar o disco como memória virtual, muito mais lento: tudo trava."
    ],
    [
     "Monte uma recomendação de configuração mínima (processador, RAM, armazenamento) para um computador de uso doméstico em 2026.",
     "Ex.: processador de 4 núcleos, 8 a 16 GB de RAM, SSD de 256 a 512 GB."
    ]
   ]
  },
  {
   "titulo": "Montando uma Sala de Videoconferência",
   "cenario": "<p>Sua escola quer montar uma sala equipada para dar aulas online e receber visitantes com apresentações.</p>",
   "passos": [
    [
     "Liste os periféricos de entrada necessários para captar áudio e vídeo dos professores.",
     "Webcam ou câmera, microfone de mesa ou de lapela, teclado e mouse."
    ],
    [
     "Liste os periféricos de saída necessários para que os alunos remotos consigam ver e ouvir a aula.",
     "Monitor ou TV grande, projetor, caixas de som."
    ],
    [
     "Sugira 2 periféricos híbridos que poderiam ser úteis nessa sala e explique por quê.",
     "Tela interativa touch (mostra e recebe toques) e impressora multifuncional (digitaliza e imprime materiais)."
    ],
    [
     "Se o orçamento for limitado, qual periférico você priorizaria primeiro e por quê?",
     "Microfone de boa qualidade: sem áudio claro a aula online não funciona, mesmo com imagem boa."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Hardware",
   "itens": [
    "CPU (UC + ULA), RAM, ROM, HD/SSD, placa-mãe.",
    "Entrada, saída e híbridos."
   ]
  }
 ],
 "glossario": [
  [
   "Chipset",
   "Coordena a comunicação na placa-mãe."
  ],
  [
   "BIOS/UEFI",
   "Firmware de inicialização."
  ]
 ]
});
