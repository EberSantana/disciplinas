FSI.modulo({
 "n": 6,
 "unidade": "Unidade VI",
 "nome": "Meios físicos e cabeamento",
 "titulo": "Coaxial, par trançado, fibra e o cabo T568B",
 "duracao": "8 h",
 "resumoCurto": "Coaxial: Condutor central de cobre, dielétrico, malha metálica e capa. Boa blindagem; usado em TV a cabo e internet banda larga, não em LANs modernas. Par trançado: 4 pares de fios trançados para cancelar interferência e",
 "analogia": {
  "titulo": "Estradas de terra, asfalto e trem-bala",
  "txt": "<p>O <b>coaxial</b> é a estrada antiga, ainda útil para TV a cabo. O <b>par trançado</b> é o asfalto da cidade: barato, flexível, até 100 m. A <b>fibra óptica</b> é o trem-bala: luz no vidro, quilômetros sem perder velocidade e imune a interferência elétrica.</p>"
 },
 "chave": [
  "<b>Coaxial:</b> Condutor central de cobre, dielétrico, malha metálica e capa. Boa blindagem; usado em TV a cabo e internet banda larga, não em LANs modernas.",
  "<b>Par trançado:</b> 4 pares de fios trançados para cancelar interferência e diafonia (crosstalk). UTP (sem blindagem), STP (blindado), FTP (folha metálica). Conector RJ-45.",
  "<b>Categorias:</b> CAT5e 1 Gbps/100 MHz; CAT6 10 Gbps até 55 m/250 MHz; CAT6a 10 Gbps até 100 m/500 MHz; CAT7 10 Gbps/600 MHz.",
  "<b>Fibra óptica:</b> Pulsos de luz num núcleo de vidro com cladding (reflexão interna total). Monomodo (9 µm, dezenas de km) e multimodo (50–62,5 µm, até 2 km). Imune a EMI.",
  "<b>T568B:</b> 1 branco-laranja · 2 laranja · 3 branco-verde · 4 azul · 5 branco-azul · 6 verde · 7 branco-marrom · 8 marrom.",
  "<b>Direto × cruzado:</b> Direto: mesmo padrão nas duas pontas (PC–switch). Cruzado: T568A numa ponta e T568B na outra. Auto-MDIX torna o cruzado pouco necessário."
 ],
 "objetivos": [
  "Comparar <b>coaxial, par trançado e fibra</b>.",
  "Escolher a <b>categoria</b> do cabo.",
  "Montar um cabo no padrão <b>T568B</b>.",
  "Diferenciar cabo <b>direto e cruzado</b>."
 ],
 "licoes": [
  {
   "t": "Meios guiados",
   "txt": "<p>Par trançado: 4 pares trançados para cancelar interferência; UTP, STP, FTP. Categorias: CAT5e (1 Gbps), CAT6 (10 Gbps até 55 m), CAT6a (10 Gbps até 100 m). Fibra: monomodo (longas distâncias) e multimodo (curtas).</p>"
  },
  {
   "t": "Crimpagem",
   "txt": "<p>T568B: branco-laranja, laranja, branco-verde, azul, branco-azul, verde, branco-marrom, marrom. Cabo <b>direto</b>: mesmo padrão nas duas pontas. <b>Cruzado</b>: A numa ponta e B na outra (hoje o auto-MDIX dispensa). Teste sempre com o testador.</p>"
  }
 ],
 "termos": [
  [
   "UTP",
   "Par trançado sem blindagem."
  ],
  [
   "RJ-45",
   "Conector do par trançado."
  ],
  [
   "T568B",
   "Ordem de cores mais usada."
  ],
  [
   "Monomodo",
   "Fibra para longas distâncias."
  ]
 ],
 "ler": [
  [
   "Console de estudo de Redes",
   "console-de-estudo.html"
  ],
  [
   "Atividades com ranking",
   "atividades.html"
  ],
  [
   "Subnetting na Prática",
   "subnetting-na-pratica.html"
  ],
  [
   "Mapa do Chamado (TCP/IP na prática)",
   "mapa-do-chamado.html"
  ]
 ],
 "visuais": [],
 "lab": {
  "intro": "Monte o cabo na ordem certa e escolha o meio para cada situação.",
  "sims": [
   {
    "tipo": "linha",
    "id": "lab-568b",
    "titulo": "Crimpagem: ordene as cores do T568B (pino 1 ao 8)",
    "ordenar": true,
    "passos": [
     {
      "t": "Branco-laranja",
      "d": "Pino 1"
     },
     {
      "t": "Laranja",
      "d": "Pino 2"
     },
     {
      "t": "Branco-verde",
      "d": "Pino 3"
     },
     {
      "t": "Azul",
      "d": "Pino 4"
     },
     {
      "t": "Branco-azul",
      "d": "Pino 5"
     },
     {
      "t": "Verde",
      "d": "Pino 6"
     },
     {
      "t": "Branco-marrom",
      "d": "Pino 7"
     },
     {
      "t": "Marrom",
      "d": "Pino 8"
     }
    ]
   },
   {
    "tipo": "cenarios",
    "titulo": "Qual meio usar?",
    "cfg": {
     "id": "mf",
     "rotulo": "Situação",
     "medidor": {
      "nome": "Projeto aprovado",
      "ini": 50
     },
     "itens": [
      {
       "t": "Ligar dois prédios do campus a 400 m de distância.",
       "ops": [
        [
         "Fibra óptica",
         true,
         "Par trançado vai até 100 m."
        ],
        [
         "Cabo UTP CAT6",
         false,
         "Passa do limite de 100 m."
        ],
        [
         "Coaxial",
         false,
         "Não é usado em LAN moderna."
        ]
       ]
      },
      {
       "t": "Laboratório com 30 PCs a até 40 m do rack, 1 Gbps.",
       "ops": [
        [
         "Par trançado CAT5e ou CAT6",
         true,
         "Barato e suficiente."
        ],
        [
         "Fibra monomodo em cada PC",
         false,
         "Caro e desnecessário."
        ],
        [
         "Wi-Fi apenas",
         false,
         "Laboratório pede cabo."
        ]
       ]
      },
      {
       "t": "Sala ao lado de motores elétricos com muita interferência.",
       "ops": [
        [
         "Cabo blindado (STP/FTP) ou fibra",
         true,
         "Blindagem ou luz evitam ruído."
        ],
        [
         "UTP comum",
         false,
         "Sofre com interferência."
        ],
        [
         "Qualquer cabo",
         false,
         "O ambiente importa."
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
    "t": "Veja todas as cores do T568B",
    "ev": "vis:lab-568b"
   },
   {
    "id": "m2",
    "t": "Monte o cabo na ordem certa",
    "ev": "ord:lab-568b"
   },
   {
    "id": "m3",
    "t": "Escolha o meio em todas as situações",
    "ev": "mf:fim"
   }
  ],
  "guiados": [
   {
    "titulo": "Quanto cabo comprar?",
    "txt": "<p>O laboratório tem <b>20 pontos</b>, cada um a <b>25 m</b> do rack em média, mais <b>2 m</b> de sobra por ponto. A caixa de cabo tem <b>305 m</b>.</p>",
    "passos": [
     {
      "p": "Quantos metros por ponto?",
      "r": 27,
      "un": "m",
      "dica": "25 + 2.",
      "expl": "27 m."
     },
     {
      "p": "Total de metros?",
      "r": 540,
      "un": "m",
      "dica": "20 × 27.",
      "expl": "540 m."
     },
     {
      "p": "Quantas caixas de 305 m comprar?",
      "r": 2,
      "un": "caixas",
      "dica": "540 ÷ 305, arredondado para cima.",
      "expl": "2 caixas (610 m)."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Camada Física",
   "Transmite bits brutos pelo meio: cobre, luz ou ondas."
  ],
  [
   "Coaxial",
   "Cobre central + dielétrico + malha + capa. TV a cabo e banda larga."
  ],
  [
   "Crosstalk",
   "Diafonia: interferência de um par de fios sobre o par vizinho."
  ],
  [
   "UTP",
   "Unshielded Twisted Pair: par trançado sem blindagem, o mais comum."
  ],
  [
   "STP",
   "Shielded Twisted Pair: com blindagem metálica, para ambientes ruidosos."
  ],
  [
   "CAT6a",
   "10 Gbps até 100 m, 500 MHz. Data centers e alta performance."
  ],
  [
   "Distância máxima do UTP",
   "Até 100 metros por segmento."
  ],
  [
   "Cladding",
   "Revestimento da fibra que reflete a luz de volta ao núcleo."
  ],
  [
   "Monomodo",
   "Fibra de núcleo 9 µm, para dezenas de km."
  ],
  [
   "T568B · pinos 1 a 4",
   "Branco-laranja, laranja, branco-verde, azul."
  ],
  [
   "T568B · pinos 5 a 8",
   "Branco-azul, verde, branco-marrom, marrom."
  ],
  [
   "Auto-MDIX",
   "Função que ajusta a porta automaticamente e dispensa o cabo cruzado."
  ]
 ],
 "vf": [
  [
   "O cabo coaxial ainda é o padrão para redes locais Ethernet modernas.",
   false,
   "Falso. Hoje o padrão das LANs é o <b>par trançado</b>. O coaxial segue em TV a cabo e banda larga da operadora."
  ],
  [
   "O trançado dos fios ajuda a cancelar interferências e a diafonia.",
   true,
   "Verdadeiro. É por isso que o cabo se chama par trançado."
  ],
  [
   "O cabo STP é o mais indicado para ambientes com muito ruído elétrico, como fábricas.",
   true,
   "Verdadeiro. A blindagem metálica protege contra interferência."
  ],
  [
   "O CAT6 alcança 10 Gbps em até 100 metros.",
   false,
   "Falso. O CAT6 alcança 10 Gbps só <b>até 55 m</b>. Para 10 Gbps em 100 m, usa-se <b>CAT6a</b>."
  ],
  [
   "O conector RJ-45 tem 8 pinos, um para cada fio do cabo.",
   true,
   "Verdadeiro. São os 8 fios dos 4 pares."
  ],
  [
   "A fibra óptica transmite sinais elétricos por um núcleo de cobre.",
   false,
   "Falso. A fibra transmite <b>pulsos de luz</b> por um núcleo de vidro ou plástico."
  ],
  [
   "A fibra óptica é imune a interferências eletromagnéticas.",
   true,
   "Verdadeiro. Por transmitir luz, não sofre EMI."
  ],
  [
   "A fibra multimodo é a mais indicada para dezenas de quilômetros.",
   false,
   "Falso. Para longas distâncias usa-se a <b>monomodo</b>. A multimodo vai até cerca de 2 km."
  ],
  [
   "No padrão T568B, o pino 1 é branco-laranja e o pino 2 é laranja.",
   true,
   "Verdadeiro."
  ],
  [
   "No padrão T568B, o pino 4 é verde.",
   false,
   "Falso. O pino 4 é <b>azul</b>. O verde fica no pino 6."
  ],
  [
   "O cabo direto usa o mesmo padrão nas duas pontas e liga um computador a um switch.",
   true,
   "Verdadeiro."
  ],
  [
   "Se o testador acender os LEDs fora de ordem, o cabo está bom, só mais lento.",
   false,
   "Falso. LED apagado ou fora de ordem indica erro de montagem: o cabo <b>precisa ser refeito</b>."
  ]
 ],
 "caderno": [
  [
   "Qual é a função da camada física e o que a escolha do meio afeta?",
   "Transmitir os bits brutos (zeros e uns) pelo meio físico. A escolha do meio afeta a velocidade, a distância máxima e a confiabilidade."
  ],
  [
   "Descreva as quatro partes do cabo coaxial, de dentro para fora.",
   "Condutor central de cobre, isolamento dielétrico, malha metálica (blindagem contra interferência) e capa externa de plástico (jaqueta)."
  ],
  [
   "Cite uma vantagem e uma desvantagem do coaxial e onde ele ainda é usado.",
   "Vantagem: boa blindagem contra EMI, alcançando distâncias maiores que o UTP. Desvantagem: mais caro, grosso e pouco flexível. Ainda é usado em TV a cabo e internet banda larga da operadora."
  ],
  [
   "Por que os fios do par trançado são trançados?",
   "Trançar os pares ajuda a cancelar a interferência eletromagnética externa e a diafonia (crosstalk) entre pares vizinhos."
  ],
  [
   "Diferencie UTP, STP e FTP e indique onde usar cada um.",
   "UTP: sem blindagem, o mais comum, casas e escritórios. STP: blindagem metálica, ambientes com muito ruído elétrico, como fábricas. FTP: folha metálica geral, proteção intermediária."
  ],
  [
   "Complete a tabela de categorias: velocidade, frequência e uso de CAT5e, CAT6, CAT6a e CAT7.",
   "CAT5e: 1 Gbps, 100 MHz, casas e pequenos escritórios. CAT6: 10 Gbps até 55 m, 250 MHz, redes corporativas. CAT6a: 10 Gbps até 100 m, 500 MHz, data centers. CAT7: 10 Gbps, 600 MHz, ambientes industriais."
  ],
  [
   "Explique como a luz se mantém dentro da fibra óptica.",
   "O núcleo de vidro ou plástico é cercado pelo revestimento (cladding), que reflete a luz de volta para o núcleo: é a reflexão interna total."
  ],
  [
   "Compare fibra monomodo e multimodo.",
   "Monomodo: núcleo muito fino (9 µm), dezenas de km, telecomunicações de longa distância. Multimodo: núcleo mais grosso (50 a 62,5 µm), até 2 km, redes locais de alta velocidade."
  ],
  [
   "Cite três vantagens e duas desvantagens da fibra óptica.",
   "Vantagens: largura de banda altíssima (Tbps), longas distâncias, imunidade total a EMI, alta segurança. Desvantagens: custo maior, mais frágil, exige equipamento e mão de obra especializados."
  ],
  [
   "Escreva de memória a sequência de cores do padrão T568B, do pino 1 ao 8.",
   "1 branco-laranja, 2 laranja, 3 branco-verde, 4 azul, 5 branco-azul, 6 verde, 7 branco-marrom, 8 marrom."
  ],
  [
   "Qual a diferença entre cabo direto e cabo cruzado? Por que o cruzado quase não é mais usado?",
   "Direto: o mesmo padrão nas duas pontas, para ligar dispositivos diferentes (PC–switch, switch–roteador). Cruzado: T568A numa ponta e T568B na outra, para ligar iguais (PC–PC). A função Auto-MDIX dos equipamentos modernos detecta e ajusta automaticamente."
  ],
  [
   "Liste as ferramentas e materiais para montar um cabo de rede.",
   "Cabo de par trançado (CAT5e ou CAT6), conectores RJ-45, alicate de crimpagem, decapador e testador de cabo."
  ],
  [
   "Descreva os 7 passos da crimpagem.",
   "1) Decapar 2 a 3 cm da capa. 2) Destrançar e organizar no T568B. 3) Alinhar e cortar deixando cerca de 1,2 cm. 4) Inserir no RJ-45 com o clipe para baixo até o fim, com a capa entrando um pouco. 5) Crimpar com firmeza. 6) Repetir na outra ponta (mesmo padrão para cabo direto). 7) Testar: LEDs de 1 a 8 em sequência."
  ],
  [
   "Calcule: 20 computadores, 8 m em média até o rack, folga de 2 m por cabo e 2 conectores extras por cabo. Quantos metros e quantos RJ-45?",
   "Cabo: 20 × (8 + 2) = <b>200 m</b>. Conectores: cada cabo usa 2 + 2 extras = 4; 20 × 4 = <b>80 RJ-45</b>."
  ]
 ],
 "pbl": [
  {
   "titulo": "Cabeando o novo laboratório",
   "cenario": "O campus recebeu 20 computadores para um novo laboratório. O switch ficará num rack no centro da sala e a distância média até cada mesa é de 8 m. A direção quer uma lista de compras e cabos montados pela própria turma.<p><b>Problema:</b> Que cabo comprar, quanto material pedir e como garantir que todos os cabos montados funcionem?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>CAT5e, CAT6 ou CAT6a: qual atende hoje e daqui a alguns anos, dentro do orçamento?</li><li>Quantos metros de cabo e quantos conectores comprar, com folga?</li><li>Qual padrão de pinagem usar e por quê?</li><li>Como registrar os testes de cada cabo?</li></ol><p><b>Entregáveis:</b></p><ul><li>Lista de compras com quantidades e justificativa da categoria</li><li>Pelo menos 2 cabos montados por dupla, testados</li><li>Ficha de teste: cabo, resultado dos LEDs 1 a 8, refeito (sim/não)</li></ul>",
     "<ul><li>Categoria: <b>CAT6</b> atende bem estações a 1 Gbps e oferece margem; CAT6a se o orçamento permitir 10 Gbps a 100 m.</li><li>Material: 20 × (8 + 2) = <b>200 m</b> de cabo; 20 × 4 = <b>80 conectores RJ-45</b>; ferramentas: alicate, decapador, testador.</li><li>Pinagem: <b>T568B</b> nas duas pontas (cabo direto), padrão mais usado no Brasil.</li><li>Teste: LEDs de 1 a 8 em sequência; qualquer falha, refazer a ponta e testar de novo.</li></ul>"
    ]
   ]
  },
  {
   "titulo": "Qual cabo para cada lugar?",
   "cenario": "Uma escola rural tem três prédios. O prédio administrativo fica a 600 m da biblioteca, há uma oficina mecânica com motores elétricos ao lado do laboratório e a sala dos professores fica a 30 m do rack.<p><b>Problema:</b> Qual meio físico usar em cada trecho, considerando distância, interferência e custo?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Qual o limite de distância do par trançado?</li><li>Qual meio resiste à interferência da oficina?</li><li>Monomodo ou multimodo para 600 m?</li><li>Onde o custo pesa mais que o desempenho?</li></ol><p><b>Entregáveis:</b></p><ul><li>Mapa dos prédios com o meio escolhido em cada trecho</li><li>Tabela comparativa coaxial × par trançado × fibra</li><li>Justificativa de cada escolha em até 5 linhas</li></ul>",
     "<ul><li>Sala dos professores (30 m): <b>UTP CAT6</b>, barato e dentro dos 100 m.</li><li>Laboratório ao lado da oficina: <b>STP</b> ou fibra, para resistir ao ruído elétrico dos motores.</li><li>Prédio administrativo à biblioteca (600 m): <b>fibra óptica</b>; multimodo atende até cerca de 2 km, imune a EMI e com alta capacidade.</li><li>O coaxial não entra nas escolhas para LAN; aparece só se a operadora entregar internet por cabo.</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Meios",
   "itens": [
    "Coaxial, par trançado, fibra.",
    "CAT5e, CAT6, CAT6a.",
    "T568B; direto × cruzado.",
    "Par trançado até 100 m."
   ]
  }
 ],
 "glossario": [
  [
   "Diafonia",
   "Interferência entre pares (crosstalk)."
  ],
  [
   "Patch panel",
   "Painel de terminação no rack."
  ]
 ]
});
