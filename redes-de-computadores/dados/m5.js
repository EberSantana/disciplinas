FSI.modulo({
 "n": 5,
 "unidade": "Unidade V",
 "nome": "Camada de enlace",
 "titulo": "Quadros, MAC, ARP e switches",
 "duracao": "8 h",
 "resumoCurto": "Salto a salto: A camada de rede vê a rota inteira; a de enlace cuida de cada salto entre dois dispositivos diretamente conectados. Serviços: Enquadramento (cabeçalho com MACs e trailer), acesso ao meio (evitar colisões) ",
 "analogia": {
  "titulo": "CPF e endereço de casa",
  "txt": "<p>O <b>MAC</b> é como o CPF: gravado de fábrica, não muda. O <b>IP</b> é como o endereço da casa: muda quando você se muda de rede. Para entregar no último trecho, é preciso saber o “CPF” de quem mora no endereço — o <b>ARP</b> grita na rua “quem é o 10.0.1.1?” e o dono responde com o seu MAC.</p>"
 },
 "chave": [
  "<b>Salto a salto:</b> A camada de rede vê a rota inteira; a de enlace cuida de cada salto entre dois dispositivos diretamente conectados.",
  "<b>Serviços:</b> Enquadramento (cabeçalho com MACs e trailer), acesso ao meio (evitar colisões) e detecção de erros com CRC.",
  "<b>Switch × hub:</b> O switch aprende em que porta está cada MAC e envia o quadro só para a porta certa. O hub repete para todas, causando colisões.",
  "<b>MAC:</b> Endereço físico de 48 bits (6 bytes), em hexadecimal, gravado de fábrica na placa. Como um CPF; o IP é como o endereço da casa.",
  "<b>ARP:</b> Descobre o MAC a partir do IP: pergunta em broadcast, resposta direta, e guarda na tabela ARP (<code>arp -a</code>).",
  "<b>Switch × roteador:</b> Switch: camada 2, quadros, MAC, dentro da LAN, repassa broadcast. Roteador: camada 3, pacotes, IP, liga redes, bloqueia broadcast."
 ],
 "objetivos": [
  "Explicar os serviços da camada de <b>enlace</b>.",
  "Diferenciar <b>MAC e IP</b>.",
  "Descrever o <b>ARP</b>.",
  "Comparar <b>hub, switch e roteador</b>."
 ],
 "licoes": [
  {
   "t": "Salto a salto",
   "txt": "<p>A camada de enlace cuida de cada trecho entre vizinhos: enquadramento (MAC de origem e destino), acesso ao meio e detecção de erros (CRC).</p>"
  },
  {
   "t": "Switch, hub e roteador",
   "txt": "<p>O <b>hub</b> repete para todas as portas. O <b>switch</b> aprende em que porta está cada MAC e envia só para a certa. O <b>roteador</b> trabalha com IP e liga redes diferentes, bloqueando broadcast.</p>"
  }
 ],
 "termos": [
  [
   "MAC",
   "Endereço físico de 48 bits."
  ],
  [
   "Quadro",
   "Unidade da camada de enlace."
  ],
  [
   "ARP",
   "Descobre o MAC a partir do IP."
  ],
  [
   "CRC",
   "Detecção de erros."
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
 "visuais": [
  {
   "tipo": "sequencia",
   "id": "arp",
   "titulo": "ARP: quem tem o 10.0.1.1?",
   "atores": [
    "PC de Ana",
    "Switch",
    "Roteador"
   ],
   "passos": [
    {
     "de": 0,
     "para": 1,
     "t": "Broadcast ARP",
     "d": "Quem tem o IP 10.0.1.1? Responda para 3C-52-82-1A-7F-09."
    },
    {
     "de": 1,
     "para": 2,
     "t": "Repassa a todos",
     "d": "Broadcast vai para todas as portas."
    },
    {
     "de": 2,
     "para": 0,
     "t": "Resposta ARP (unicast)",
     "d": "10.0.1.1 está em 00-1A-2B-3C-4D-5E."
    },
    {
     "de": 0,
     "para": 0,
     "t": "Guarda na tabela ARP",
     "d": "Veja com arp -a."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Compare equipamentos e veja a tabela ARP no prompt.",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-eq",
    "titulo": "Hub, switch ou roteador?",
    "cats": [
     "Hub",
     "Switch",
     "Roteador"
    ],
    "itens": [
     [
      "Repete o sinal para todas as portas",
      0
     ],
     [
      "Causa muitas colisões",
      0
     ],
     [
      "Aprende MACs numa tabela",
      1
     ],
     [
      "Envia o quadro só para a porta certa",
      1
     ],
     [
      "Liga a rede da escola à internet",
      2
     ],
     [
      "Usa tabela de rotas com IPs",
      2
     ],
     [
      "Bloqueia broadcast entre redes",
      2
     ]
    ]
   },
   {
    "tipo": "cmd",
    "titulo": "Prompt: veja MACs e conexões",
    "instr": "Use arp -a, ipconfig /all e netstat -n.",
    "cfg": {
     "id": "c5",
     "cenario": {
      "ip": "10.0.1.50"
     }
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Classifique os equipamentos sem erros",
    "ev": "vis:lab-eq"
   },
   {
    "id": "m2",
    "t": "Veja a tabela ARP",
    "ev": "c5:arp"
   },
   {
    "id": "m3",
    "t": "Descubra o seu MAC (ipconfig /all)",
    "ev": "c5:all"
   },
   {
    "id": "m4",
    "t": "Acompanhe o ARP inteiro (Explorar)",
    "ev": "vis:arp"
   }
  ],
  "guiados": [
   {
    "titulo": "Tamanho do MAC",
    "txt": "<p>O MAC 3C-52-82-1A-7F-09 tem 6 bytes.</p>",
    "passos": [
     {
      "p": "Quantos bits tem um MAC?",
      "r": 48,
      "dica": "6 × 8.",
      "expl": "48 bits."
     },
     {
      "p": "Os 3 primeiros bytes identificam o fabricante (OUI). Quantos bits são?",
      "r": 24,
      "dica": "3 × 8.",
      "expl": "24 bits."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Quadro (frame)",
   "Unidade de dados da camada de enlace: cabeçalho com MACs + dados + CRC."
  ],
  [
   "Endereço MAC",
   "Endereço físico de 48 bits gravado de fábrica. Ex.: <code>A4:5E:60:B2:3C:01</code>."
  ],
  [
   "ARP",
   "Address Resolution Protocol: descobre o MAC a partir do IP."
  ],
  [
   "Tabela ARP",
   "Cache de pares IP-MAC. Veja com <code>arp -a</code>."
  ],
  [
   "CRC",
   "Cyclic Redundancy Check: 4 bytes no fim do quadro para detectar erros."
  ],
  [
   "Switch",
   "Dispositivo da camada 2 que encaminha quadros só para a porta do destino."
  ],
  [
   "Hub",
   "Dispositivo antigo que repete os dados para todas as portas, gerando colisões."
  ],
  [
   "Tabela MAC",
   "Lista do switch que liga cada MAC a uma porta."
  ],
  [
   "Ethernet",
   "Tecnologia de LAN com fio mais usada no mundo."
  ],
  [
   "Payload Ethernet",
   "De 46 a 1500 bytes: o datagrama IP encapsulado."
  ],
  [
   "OUI",
   "Os 3 primeiros bytes do MAC, que identificam o fabricante."
  ],
  [
   "LAN",
   "Rede local: sala, andar, prédio ou campus."
  ]
 ],
 "vf": [
  [
   "A camada de enlace se preocupa com a rota completa entre origem e destino.",
   false,
   "Falso. A rota completa é assunto da camada de <b>rede</b>. O enlace cuida de cada salto entre vizinhos diretos."
  ],
  [
   "O endereço MAC tem 48 bits e costuma ser escrito em hexadecimal.",
   true,
   "Verdadeiro. São 6 bytes, como <code>A4:5E:60:B2:3C:01</code>."
  ],
  [
   "O endereço MAC muda sempre que o computador muda de rede.",
   false,
   "Falso. Quem pode mudar é o <b>IP</b>. O MAC é gravado de fábrica na placa."
  ],
  [
   "A requisição ARP é enviada em broadcast para toda a LAN.",
   true,
   "Verdadeiro. A resposta, por outro lado, volta diretamente para quem perguntou."
  ],
  [
   "O ARP traduz nomes de domínio em endereços IP.",
   false,
   "Falso. Quem traduz nomes em IPs é o <b>DNS</b>. O ARP traduz <b>IP em MAC</b>."
  ],
  [
   "O hub envia os dados apenas para a porta do destinatário.",
   false,
   "Falso. Isso é o <b>switch</b>. O hub repete para todas as portas."
  ],
  [
   "O switch aprende em qual porta está cada endereço MAC.",
   true,
   "Verdadeiro. Ele monta a tabela MAC observando os quadros que recebe."
  ],
  [
   "O campo de dados de um quadro Ethernet vai de 46 a 1500 bytes.",
   true,
   "Verdadeiro. É ali que vai o datagrama IP."
  ],
  [
   "O roteador repassa os broadcasts de uma rede para as outras.",
   false,
   "Falso. O roteador <b>bloqueia</b> broadcasts entre redes; o switch os repassa dentro da LAN."
  ],
  [
   "O switch opera na camada 2 e o roteador na camada 3.",
   true,
   "Verdadeiro. Switch usa MAC; roteador usa IP."
  ],
  [
   "A cada salto no caminho, o roteador cria um novo quadro com novos endereços MAC, mas mantém os IPs.",
   true,
   "Verdadeiro. Na história de Paco, é como trocar de ônibus em cada cidade mantendo o mesmo bilhete (o IP)."
  ],
  [
   "O CRC serve para criptografar o conteúdo do quadro.",
   false,
   "Falso. O CRC <b>detecta erros</b>; não esconde o conteúdo."
  ]
 ],
 "caderno": [
  [
   "Qual a diferença entre a visão da camada de rede e a da camada de enlace sobre o caminho?",
   "A camada de rede tem a visão global da rota completa, da origem ao destino. A de enlace se preocupa com cada salto individual entre dois dispositivos diretamente conectados."
  ],
  [
   "Explique os três serviços principais da camada de enlace.",
   "Enquadramento: encapsula o datagrama em um quadro com cabeçalho (MACs) e trailer (verificação de erros). Acesso ao meio: coordena as transmissões em meios compartilhados para evitar colisões. Detecção e correção de erros: bits de verificação como o CRC."
  ],
  [
   "O que é o CRC e o que acontece com um quadro cujo CRC não confere?",
   "Cyclic Redundancy Check: código de verificação no trailer do quadro. Se o valor calculado no receptor não bate, o quadro está corrompido e é descartado (o TCP, se usado, retransmite depois)."
  ],
  [
   "Por que o switch é mais eficiente que o hub?",
   "O switch aprende os MACs ligados a cada porta e envia o quadro só para a porta do destinatário. O hub repete os dados para todas as portas, gerando colisões e desperdício de banda."
  ],
  [
   "Descreva o endereço MAC: tamanho, notação e origem.",
   "48 bits (6 bytes), representado em hexadecimal (ex.: A4:5E:60:B2:3C:01), gravado de fábrica na placa de rede (NIC) e, em princípio, único no mundo."
  ],
  [
   "Use a analogia do CPF e do endereço da casa para diferenciar MAC e IP.",
   "O IP é como o endereço da casa: lógico, pode mudar se você se mudar. O MAC é como o CPF: atribuído no “nascimento” (fabricação) e não muda."
  ],
  [
   "Descreva os quatro passos do ARP quando A quer falar com B na mesma LAN.",
   "1) A sabe o IP de B, mas não o MAC. 2) A envia em broadcast: “quem tem o IP 192.168.1.20? diga seu MAC”. 3) B reconhece seu IP e responde direto para A com o MAC. 4) A guarda o par IP-MAC na tabela ARP e monta o quadro."
  ],
  [
   "Liste os campos do quadro Ethernet com seus tamanhos.",
   "Preâmbulo 8 bytes (sincronização); MAC destino 6; MAC origem 6; Tipo 2 (protocolo de cima, ex.: IPv4); Dados 46 a 1500 bytes (datagrama IP); CRC 4 bytes."
  ],
  [
   "Como evoluíram as velocidades da Ethernet?",
   "10 Mbps (original) → 100 Mbps (Fast Ethernet) → 1 Gbps (Gigabit Ethernet) → 10 Gbps ou mais (10 Gigabit Ethernet)."
  ],
  [
   "Compare switch e roteador em: camada, unidade de dados, endereço, função, tabela e broadcast.",
   "Switch: camada 2, quadro, MAC, liga dispositivos da mesma LAN, tabela MAC (MAC → porta), repassa broadcast. Roteador: camada 3, pacote, IP, liga redes diferentes, tabela de roteamento (rede → próximo salto), bloqueia broadcast entre redes."
  ],
  [
   "Que quatro funções o aparelho do provedor de internet de casa costuma acumular?",
   "Modem (converte o sinal da operadora), roteador (liga a rede local à internet), switch (várias portas Ethernet) e ponto de acesso Wi-Fi."
  ],
  [
   "Para que serve o comando <code>arp -a</code>?",
   "Mostra a tabela ARP do computador: os pares de IP e MAC já descobertos, incluindo o do gateway padrão."
  ],
  [
   "O que é o OUI de um MAC e como descobrir o fabricante da placa?",
   "Os 3 primeiros bytes do MAC identificam o fabricante (OUI). Basta pesquisá-los em um site como macvendors.com."
  ],
  [
   "Explique o que acontece na camada de enlace quando A (192.168.1.10, AA:AA…) envia para B (192.168.1.20, BB:BB…) na mesma LAN.",
   "A verifica a tabela ARP; sem o MAC de B, envia ARP em broadcast. O switch repassa o broadcast a todas as portas. B responde com BB:BB:BB:BB:BB:BB. A monta o quadro (origem AA…, destino BB…, CRC). O switch consulta a tabela MAC e envia o quadro só pela porta de B."
  ]
 ],
 "pbl": [
  {
   "titulo": "Quem é quem na rede do escritório",
   "cenario": "Um escritório de contabilidade tem 1 roteador ligado à internet, 1 switch e 5 computadores. Um estagiário ligou um hub antigo no lugar do switch “porque tinha mais portas” e a rede ficou lenta.<p><b>Problema:</b> Como explicar ao dono do escritório, com um diagrama, por que o hub deixou a rede lenta e onde entram os endereços IP e MAC em cada trecho?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>O que o hub faz com cada quadro? E o switch?</li><li>Onde, no diagrama, são usados endereços MAC? E IP?</li><li>O que muda nos endereços quando o pacote sai do roteador para a internet?</li><li>Vale a pena um switch gerenciável aqui? Por quê?</li></ol><p><b>Entregáveis:</b></p><ul><li>Diagrama: roteador, switch e 5 computadores, com IP e MAC de cada um</li><li>Explicação do trajeto de um quadro com hub e com switch</li><li>Recomendação de equipamento com justificativa</li></ul>",
     "<ul><li>Com hub, cada quadro é repetido para as 5 portas: há colisões e desperdício de banda. Com switch, o quadro vai só para a porta do destino, graças à tabela MAC.</li><li>Dentro da LAN, o quadro leva MACs de origem e destino; o datagrama dentro dele leva os IPs.</li><li>Ao sair para a internet, o roteador cria um novo quadro (novos MACs), mas o IP de destino continua o mesmo.</li><li>Recomendação: trocar o hub por um switch; um gerenciável permite VLANs, monitoramento e controle das portas, útil se o escritório crescer.</li></ul>"
    ]
   ]
  },
  {
   "titulo": "Caçada ao MAC",
   "cenario": "A coordenação quer um inventário das placas de rede do laboratório para liberar o Wi-Fi só para máquinas conhecidas. Ninguém sabe o fabricante das placas nem o MAC do gateway.<p><b>Problema:</b> Como levantar o MAC de cada máquina, identificar o fabricante e mapear a tabela ARP do laboratório?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Onde aparece o “Endereço Físico” no <code>ipconfig /all</code>?</li><li>O que o <code>arp -a</code> mostra e qual é o MAC do gateway?</li><li>O que os 3 primeiros bytes (OUI) revelam?</li><li>Filtrar por MAC é uma proteção suficiente?</li></ol><p><b>Entregáveis:</b></p><ul><li>Planilha: máquina, IP, MAC, fabricante (OUI)</li><li>Print ou cópia da tabela ARP com o gateway destacado</li><li>Parágrafo sobre os limites do controle por MAC</li></ul>",
     "<ul><li><code>ipconfig /all</code> mostra o MAC como “Endereço Físico” de cada adaptador (Ethernet e Wi-Fi).</li><li><code>arp -a</code> lista pares IP-MAC; a linha do IP do gateway mostra o MAC do roteador.</li><li>O OUI pesquisado em macvendors.com revela o fabricante da placa.</li><li>O controle por MAC ajuda a organizar, mas não basta como segurança: um MAC pode ser falsificado. Deve ser combinado com senha forte e criptografia (WPA2/WPA3).</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Enlace",
   "itens": [
    "Quadros, MAC, CRC.",
    "ARP: IP → MAC.",
    "Hub × switch × roteador."
   ]
  }
 ],
 "glossario": [
  [
   "VLAN",
   "Rede virtual dentro do switch."
  ],
  [
   "CSMA/CD",
   "Acesso ao meio com detecção de colisão."
  ]
 ]
});
