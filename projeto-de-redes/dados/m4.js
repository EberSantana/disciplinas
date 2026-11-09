FSI.modulo({
 "n": 4,
 "unidade": "Capítulo 4",
 "nome": "Projeto de rede sem fio",
 "titulo": "Padrões, frequências, site survey e segurança do Wi-Fi",
 "duracao": "8 h",
 "resumoCurto": "Wi-Fi: Rede que usa ondas de rádio em vez de cabos. Vantagens: mobilidade, flexibilidade e escalabilidade. Desafios: interferência, atenuação e segurança. Indoor × outdoor: Indoor: paredes, móveis e pessoas atenuam o sin",
 "analogia": {
  "titulo": "Conversa numa festa",
  "txt": "<p>Numa festa barulhenta, quem fala perto se entende; longe, ou com a música alta, não. O Wi-Fi é assim: <b>paredes e pessoas</b> atenuam o sinal, outras redes no mesmo <b>canal</b> são a música alta, e o <b>site survey</b> é andar pela festa medindo onde dá para conversar.</p>"
 },
 "chave": [
  "<b>Wi-Fi:</b> Rede que usa ondas de rádio em vez de cabos. Vantagens: mobilidade, flexibilidade e escalabilidade. Desafios: interferência, atenuação e segurança.",
  "<b>Indoor × outdoor:</b> Indoor: paredes, móveis e pessoas atenuam o sinal e criam zonas mortas. Outdoor: distância, chuva e neblina; equipamentos mais robustos.",
  "<b>Padrões 802.11:</b> b 11 Mbps · g 54 Mbps · n 600 Mbps (MIMO) · ac/Wi-Fi 5 1,3 Gbps (MU-MIMO) · ax/Wi-Fi 6 9,6 Gbps (OFDMA).",
  "<b>Frequências:</b> 2,4 GHz: mais alcance, mais interferência e poucos canais. 5 GHz: mais velocidade e canais, menos alcance. 6 GHz: Wi-Fi 6E.",
  "<b>Site survey:</b> Planejamento, análise de espectro, survey preditivo, survey ativo/passivo no local e relatório com mapas de calor.",
  "<b>Segurança:</b> WEP (inseguro) < WPA < WPA2 (AES) < WPA3. Autenticação por PSK ou 802.1X/RADIUS. Ocultar SSID e filtrar MAC são medidas complementares."
 ],
 "objetivos": [
  "Comparar os padrões <b>802.11</b>.",
  "Escolher entre <b>2,4, 5 e 6 GHz</b>.",
  "Planejar um <b>site survey</b>.",
  "Escolher a <b>segurança</b> do Wi-Fi."
 ],
 "licoes": [
  {
   "t": "Padrões e frequências",
   "txt": "<p>b 11 Mbps, g 54 Mbps, n (Wi-Fi 4) 600 Mbps com MIMO, ac (Wi-Fi 5) ~1,3 Gbps, ax (Wi-Fi 6) ~9,6 Gbps com OFDMA. 2,4 GHz: mais alcance, poucos canais (1, 6, 11) e interferência; 5 GHz: mais canais e velocidade, menos alcance.</p>"
  },
  {
   "t": "Site survey e segurança",
   "txt": "<p>Planejamento, análise de espectro, survey preditivo e no local, mapa de calor. Segurança: WEP é inseguro; use <b>WPA2-AES</b> ou <b>WPA3</b>, com 802.1X/RADIUS em empresas. Ocultar SSID e filtrar MAC não bastam.</p>"
  }
 ],
 "termos": [
  [
   "SSID",
   "Nome da rede."
  ],
  [
   "Site survey",
   "Medição do sinal no local."
  ],
  [
   "WPA3",
   "Segurança Wi-Fi atual."
  ],
  [
   "Canal",
   "Faixa de frequência usada."
  ]
 ],
 "ler": [
  [
   "Atividades com ranking de Projeto de Redes",
   "atividades.html"
  ]
 ],
 "visuais": [],
 "lab": {
  "intro": "Seja o projetista do Wi-Fi da escola.",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-ghz",
    "titulo": "2,4 GHz ou 5 GHz?",
    "cats": [
     "2,4 GHz",
     "5 GHz"
    ],
    "itens": [
     [
      "Mais alcance, atravessa melhor paredes",
      0
     ],
     [
      "Só 3 canais sem sobreposição (1, 6, 11)",
      0
     ],
     [
      "Sofre com micro-ondas e Bluetooth",
      0
     ],
     [
      "Mais canais e menos interferência",
      1
     ],
     [
      "Mais velocidade, menos alcance",
      1
     ],
     [
      "Ideal para auditório lotado com APs próximos",
      1
     ]
    ]
   },
   {
    "tipo": "cenarios",
    "titulo": "Segurança do Wi-Fi",
    "cfg": {
     "id": "ws",
     "rotulo": "Situação",
     "medidor": {
      "nome": "Rede protegida",
      "ini": 50
     },
     "itens": [
      {
       "t": "O roteador da biblioteca ainda usa WEP.",
       "ops": [
        [
         "Trocar por WPA2-AES ou WPA3",
         true,
         "WEP é quebrado em minutos."
        ],
        [
         "Ocultar o SSID",
         false,
         "Não protege de verdade."
        ],
        [
         "Manter, é antigo mas funciona",
         false,
         "Inseguro."
        ]
       ]
      },
      {
       "t": "A escola quer que cada professor entre com o próprio login, não com uma senha única.",
       "ops": [
        [
         "WPA2/WPA3-Enterprise com 802.1X/RADIUS",
         true,
         "Autenticação individual."
        ],
        [
         "WPA2-PSK com senha forte",
         false,
         "Senha única compartilhada."
        ],
        [
         "Filtro de MAC",
         false,
         "MAC é fácil de falsificar."
        ]
       ]
      },
      {
       "t": "Visitantes precisam de internet, mas não podem ver a rede interna.",
       "ops": [
        [
         "Rede de visitantes isolada (VLAN própria)",
         true,
         "Separação lógica."
        ],
        [
         "Dar a senha da rede interna",
         false,
         "Expõe a rede."
        ],
        [
         "Desligar o Wi-Fi",
         false,
         "Não atende a necessidade."
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
    "t": "Classifique 2,4 × 5 GHz sem erros",
    "ev": "vis:lab-ghz"
   },
   {
    "id": "m2",
    "t": "Proteja a rede em todas as situações",
    "ev": "ws:fim"
   },
   {
    "id": "m3",
    "t": "Rede protegida em 80% ou mais",
    "ev": "ws:medidor80"
   }
  ],
  "guiados": [
   {
    "titulo": "Quantos APs no pavilhão?",
    "txt": "<p>O pavilhão tem <b>1.200 m²</b>. Cada AP cobre bem cerca de <b>150 m²</b> e atende até <b>30 usuários</b>. São esperados <b>270 usuários</b>.</p>",
    "passos": [
     {
      "p": "APs pela área?",
      "r": 8,
      "dica": "1.200 ÷ 150.",
      "expl": "8 APs."
     },
     {
      "p": "APs pelo número de usuários?",
      "r": 9,
      "dica": "270 ÷ 30.",
      "expl": "9 APs."
     },
     {
      "p": "Quantos APs instalar?",
      "r": 9,
      "dica": "O maior dos dois.",
      "expl": "9: o critério mais exigente vence (confirme com site survey)."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "802.11",
   "Família de padrões Wi-Fi definida pelo IEEE."
  ],
  [
   "Wi-Fi 5",
   "802.11ac: 5 GHz, até 1,3 Gbps, MU-MIMO."
  ],
  [
   "Wi-Fi 6",
   "802.11ax: até 9,6 Gbps, OFDMA, para ambientes densos."
  ],
  [
   "Wi-Fi 6E",
   "Wi-Fi 6 usando também a faixa de 6 GHz."
  ],
  [
   "MIMO",
   "Múltiplas antenas para aumentar velocidade e alcance (desde o 802.11n)."
  ],
  [
   "Modo infraestruturado",
   "Dispositivos ligados a um ponto de acesso. Topologia em estrela."
  ],
  [
   "Modo ad-hoc",
   "Dispositivos ligados diretamente, sem AP. Topologia em malha."
  ],
  [
   "dBm",
   "Unidade da intensidade do sinal. −50 dBm é mais forte que −80 dBm."
  ],
  [
   "2,4 GHz × 5 GHz",
   "2,4: mais alcance e mais interferência. 5: mais velocidade e menos alcance."
  ],
  [
   "Site survey",
   "Estudo do local para posicionar os APs: preditivo, ativo/passivo e relatório com mapa de calor."
  ],
  [
   "WPA3",
   "Protocolo de segurança Wi-Fi mais recente e forte contra força bruta."
  ],
  [
   "802.1X / RADIUS",
   "Autenticação individual por usuário em redes corporativas."
  ]
 ],
 "vf": [
  [
   "Interferência, atenuação e segurança são os principais desafios das redes sem fio.",
   true,
   "Verdadeiro."
  ],
  [
   "Em redes indoor, paredes e móveis podem criar zonas mortas de sinal.",
   true,
   "Verdadeiro. Eles absorvem e refletem as ondas de rádio."
  ],
  [
   "O 802.11ac opera nas faixas de 2,4 GHz e 5 GHz.",
   false,
   "Falso. Pela tabela do capítulo, o 802.11ac (Wi-Fi 5) opera em <b>5 GHz</b>. Quem opera nas duas é o 802.11n; o 802.11ax usa 2,4, 5 e 6 GHz."
  ],
  [
   "O 802.11ax (Wi-Fi 6) foi pensado para ambientes com muitos dispositivos conectados.",
   true,
   "Verdadeiro, com tecnologias como o OFDMA."
  ],
  [
   "No modo ad-hoc todos os dispositivos precisam de um ponto de acesso central.",
   false,
   "Falso. Isso é o modo <b>infraestruturado</b>. No ad-hoc os dispositivos se conectam diretamente."
  ],
  [
   "Um sinal de −80 dBm é mais forte que um de −50 dBm.",
   false,
   "Falso. Quanto mais perto de zero, mais forte: <b>−50 dBm é mais forte</b>."
  ],
  [
   "A faixa de 2,4 GHz tem maior alcance, mas sofre mais interferência que a de 5 GHz.",
   true,
   "Verdadeiro. Micro-ondas e telefones sem fio também usam essa faixa."
  ],
  [
   "A faixa de 6 GHz é usada pelo padrão Wi-Fi 6E.",
   true,
   "Verdadeiro."
  ],
  [
   "No site survey, o survey preditivo dispensa a medição no local.",
   false,
   "Falso. O survey ativo/passivo no local <b>valida e ajusta</b> o modelo preditivo."
  ],
  [
   "O WEP ainda é considerado seguro para redes domésticas.",
   false,
   "Falso. O WEP é <b>obsoleto e inseguro</b>. O mínimo recomendado é WPA2, e WPA3 quando disponível."
  ],
  [
   "O WPA2 usa o padrão de criptografia AES.",
   true,
   "Verdadeiro."
  ],
  [
   "Ocultar o SSID impede que atacantes encontrem a rede.",
   false,
   "Falso. É uma medida simples, mas <b>não impede</b> atacantes determinados."
  ]
 ],
 "caderno": [
  [
   "O que é uma rede sem fio e qual a analogia dos walkie-talkies?",
   "Uma rede que usa ondas de rádio em vez de cabos. Na biblioteca, em vez de amarrar o bilhete numa pedra e jogar (cabo), você fala no walkie-talkie e o amigo ouve no dele: a comunicação vai pelo ar."
  ],
  [
   "Cite três vantagens e três desafios das redes Wi-Fi.",
   "Vantagens: mobilidade, flexibilidade para adicionar dispositivos e escalabilidade (basta um novo AP). Desafios: interferência (micro-ondas, telefones sem fio, outras redes), atenuação do sinal e segurança, pois os dados vão pelo ar."
  ],
  [
   "Compare os desafios de uma rede indoor e de uma outdoor.",
   "Indoor: atenuação por paredes, portas, móveis e pessoas, criando zonas mortas; exige posicionamento cuidadoso dos APs. Outdoor: distância e clima (chuva, neblina) enfraquecem o sinal; exige equipamentos robustos para intempéries."
  ],
  [
   "Complete a tabela: frequência e velocidade de 802.11b, g, n, ac e ax.",
   "802.11b: 2,4 GHz, 11 Mbps. 802.11g: 2,4 GHz, 54 Mbps. 802.11n: 2,4 e 5 GHz, 600 Mbps. 802.11ac (Wi-Fi 5): 5 GHz, 1,3 Gbps. 802.11ax (Wi-Fi 6/6E): 2,4, 5 e 6 GHz, 9,6 Gbps."
  ],
  [
   "O que significam MIMO, MU-MIMO e OFDMA e em que padrões apareceram?",
   "MIMO (802.11n): múltiplas antenas para aumentar velocidade e alcance. MU-MIMO (802.11ac): MIMO multiusuário, atendendo vários dispositivos ao mesmo tempo. OFDMA (802.11ax): divide o canal para atender muitos dispositivos com eficiência em ambientes densos."
  ],
  [
   "Diferencie o modo infraestruturado do modo ad-hoc, com a topologia de cada um.",
   "Infraestruturado: todos se conectam a um AP, que se liga à rede cabeada; topologia em estrela, como o terminal de um aeroporto. Ad-hoc: os dispositivos se conectam diretamente, sem AP; topologia em malha, como amigos conversando num parque."
  ],
  [
   "Quais são as três métricas de desempenho do Wi-Fi e suas unidades?",
   "Taxa de transferência (throughput), em Mbps ou Gbps. Latência (ping), em ms. Intensidade do sinal, em dBm."
  ],
  [
   "Qual sinal é mais forte: −50 dBm ou −80 dBm? Por quê?",
   "−50 dBm. O dBm do Wi-Fi costuma ser negativo, e quanto mais perto de zero, mais forte o sinal."
  ],
  [
   "Compare as faixas de 2,4 GHz, 5 GHz e 6 GHz.",
   "2,4 GHz: maior alcance, mais interferência e poucos canais (estrada antiga que vai longe, com trânsito). 5 GHz: mais velocidade e canais, menos alcance (autoestrada moderna). 6 GHz: exclusiva do Wi-Fi 6E, muitos canais e sem dispositivos antigos (pista particular)."
  ],
  [
   "Descreva as cinco etapas de um site survey.",
   "1) Planejamento: planta baixa e requisitos. 2) Análise de espectro: fontes de interferência de RF. 3) Survey preditivo: simulação em software com a planta e os materiais. 4) Survey ativo/passivo no local: medir sinal, taxa e latência andando pelo local. 5) Relatório: mapas de calor e posições dos APs."
  ],
  [
   "Ordene WEP, WPA, WPA2 e WPA3 da mais fraca à mais forte e comente cada um.",
   "WEP: obsoleto e inseguro (fechadura de brinquedo). WPA: melhor que o WEP, com vulnerabilidades conhecidas. WPA2: o mais usado, com AES (porta de cofre). WPA3: o mais recente, mais forte contra força bruta e melhor em redes abertas."
  ],
  [
   "Diferencie autenticação por PSK e por 802.1X/RADIUS.",
   "PSK (Pre-Shared Key): uma senha compartilhada por todos. 802.1X com servidor RADIUS: cada usuário tem login e senha individuais, típico de empresas (WPA2/WPA3-Enterprise)."
  ],
  [
   "Ocultar o SSID e filtrar MAC tornam a rede segura? Explique.",
   "Não sozinhos. Ocultar o SSID não impede atacantes determinados de encontrarem a rede, e o filtro de MAC pode ser contornado. São camadas extras que só complementam criptografia forte e autenticação."
  ],
  [
   "O sinal é ótimo na sala e péssimo no quarto, com o roteador ao lado da TV. Cite três ações.",
   "1) Mover o roteador para um local central e elevado, como o corredor. 2) Se for dual-band, usar 2,4 GHz no quarto, que atravessa melhor as paredes. 3) Instalar um repetidor ou um sistema mesh entre a sala e o quarto."
  ]
 ],
 "pbl": [
  {
   "titulo": "A Galeria Conectada",
   "cenario": "Um novo espaço de arte tem um salão principal com pé-direito duplo, salas menores com paredes grossas de concreto e um jardim de esculturas a céu aberto. Visitantes vão usar um app com áudio-guia e a equipe usa tablets para vendas. A inauguração é em menos de um mês.<p><b>Problema:</b> Como projetar uma rede sem fio que cubra salão, salas de concreto e jardim, com desempenho e segurança para equipe e visitantes?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Que desafios cada ambiente (salão, salas de concreto, jardim) impõe?</li><li>Qual padrão e quais faixas usar?</li><li>Como será o site survey?</li><li>Como separar a rede da equipe da rede dos visitantes?</li><li>Que sinal mínimo aceitar em cada área?</li></ol><p><b>Entregáveis:</b></p><ul><li>Planta com a posição proposta dos APs e mapa de calor estimado</li><li>Roteiro do site survey (5 etapas)</li><li>Configuração das redes: SSID, segurança, autenticação</li><li>Justificativa dos equipamentos indoor e outdoor</li></ul>",
     "<ul><li>Salão: muitos visitantes ao mesmo tempo, então <b>Wi-Fi 6 (802.11ax)</b> com vários APs. Salas de concreto: forte atenuação, então um AP por sala. Jardim: APs <b>outdoor</b> robustos para intempéries.</li><li>5 GHz para desempenho perto dos APs e 2,4 GHz como apoio para alcance.</li><li>Site survey: planta, análise de espectro, survey preditivo, medições no local e relatório com mapas de calor; meta de sinal acima de −65 dBm.</li><li>Rede da equipe com <b>WPA2/WPA3-Enterprise (802.1X)</b>; rede de visitantes separada e isolada.</li></ul>"
    ]
   ]
  },
  {
   "titulo": "Wi-Fi da consultoria",
   "cenario": "Uma consultoria com 15 funcionários ocupa 200 m² com divisórias. Usa notebooks, smartphones e uma sala de reuniões com smart TV para videoconferência HD. Os dados dos clientes são confidenciais e visitantes precisam de internet.<p><b>Problema:</b> Que padrão, quantos APs e que configuração de segurança atendem a consultoria com bom custo-benefício?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Quais aplicações a rede precisa suportar?</li><li>Wi-Fi 5 ou Wi-Fi 6? Por quê?</li><li>Quantos APs e onde, considerando as divisórias?</li><li>Como autenticar funcionários e separar visitantes?</li></ol><p><b>Entregáveis:</b></p><ul><li>Levantamento de requisitos</li><li>Planta com os APs e as medições de sinal</li><li>Ficha de configuração das duas redes</li></ul>",
     "<ul><li>Requisitos: web, e-mail, arquivos no servidor local e videoconferência HD; segurança dos dados dos clientes é prioridade.</li><li>Padrão <b>802.11ac (Wi-Fi 5)</b> pelo custo-benefício; <b>dois APs de teto</b> para evitar sombras das divisórias.</li><li>Site survey simplificado com app no smartphone, garantindo sinal acima de <b>−65 dBm</b> na sala de reuniões e nas mesas.</li><li>Rede “Consultoria-Corp” com <b>WPA2-Enterprise (802.1X)</b>, login individual; rede “Consultoria-Visitantes” isolada da rede interna.</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Sem fio",
   "itens": [
    "802.11 b/g/n/ac/ax.",
    "2,4 × 5 × 6 GHz.",
    "Site survey e mapa de calor.",
    "WPA2-AES/WPA3, 802.1X."
   ]
  }
 ],
 "glossario": [
  [
   "MIMO",
   "Várias antenas ao mesmo tempo."
  ],
  [
   "OFDMA",
   "Divide o canal entre usuários (Wi-Fi 6)."
  ]
 ]
});
