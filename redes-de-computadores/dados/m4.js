FSI.modulo({
 "n": 4,
 "unidade": "Unidade IV",
 "nome": "Camada de rede",
 "titulo": "IP, máscaras, sub-redes, DHCP e o prompt de comando",
 "duracao": "12 h",
 "resumoCurto": "Dois problemas: Endereçamento: cada dispositivo precisa de um endereço único (IP). Roteamento: achar o melhor caminho entre redes, preenchendo as tabelas dos roteadores. IPv4 × IPv6: IPv4: 32 bits, notação decimal com po",
 "analogia": {
  "titulo": "CEP e entregador",
  "txt": "<p>O endereço IP é como o endereço com CEP: a <b>parte de rede</b> diz o bairro e a <b>parte de host</b> diz a casa. A <b>máscara</b> mostra onde termina uma e começa a outra. O <b>roteador</b> é o centro de distribuição: olha o “bairro” de destino e manda para o próximo salto. E o <b>DHCP</b> é o cartório que entrega um endereço a cada morador novo.</p>"
 },
 "chave": [
  "<b>Dois problemas:</b> <b>Endereçamento</b>: cada dispositivo precisa de um endereço único (IP). <b>Roteamento</b>: achar o melhor caminho entre redes, preenchendo as tabelas dos roteadores.",
  "<b>IPv4 × IPv6:</b> IPv4: 32 bits, notação decimal com pontos, cerca de 4,3 bilhões de endereços, praticamente esgotados. IPv6: 128 bits, notação hexadecimal.",
  "<b>Encaminhamento:</b> O roteador lê o IP de destino, consulta a tabela de encaminhamento e envia o pacote ao próximo salto.",
  "<b>Endereços especiais:</b> <code>127.0.0.1</code> loopback; <code>192.168.x.x</code> e <code>10.x.x.x</code> privados; <code>255.255.255.255</code> broadcast.",
  "<b>DHCP (DORA):</b> Discover (broadcast) → Offer → Request → Ack. Entrega IP, máscara, gateway e DNS, com tempo de concessão (lease).",
  "<b>Comandos:</b> <code>ipconfig</code>, <code>ipconfig /all</code>, <code>/release</code>, <code>/renew</code>, <code>ping</code> e <code>tracert</code>."
 ],
 "objetivos": [
  "Separar <b>rede e host</b> com a máscara.",
  "Calcular <b>rede, broadcast e hosts</b> de uma sub-rede.",
  "Descrever o <b>DHCP (DORA)</b>.",
  "Diagnosticar com <b>ipconfig, ping e tracert</b>."
 ],
 "licoes": [
  {
   "t": "Endereçamento IPv4",
   "txt": "<p>32 bits em 4 octetos. O prefixo /24 (255.255.255.0) diz que os 24 primeiros bits são rede. Em 192.168.10.77/24: rede 192.168.10.0, broadcast 192.168.10.255, hosts .1 a .254 (254 hosts = 2⁸ − 2).</p>",
   "pense": "por que se subtrai 2 do total de endereços?"
  },
  {
   "t": "Sub-redes",
   "txt": "<p>Pegar bits de host emprestados divide a rede: /26 deixa 6 bits de host → 64 endereços por sub-rede, 62 utilizáveis. As redes começam em múltiplos de 64: .0, .64, .128, .192.</p>"
  },
  {
   "t": "DHCP e diagnóstico",
   "txt": "<p>DHCP: <b>D</b>iscover, <b>O</b>ffer, <b>R</b>equest, <b>A</b>ck. Se o PC fica com 169.254.x.x, não achou o DHCP. Diagnóstico: <code>ipconfig</code> → <code>ping</code> gateway → <code>ping 8.8.8.8</code> → <code>ping</code> um nome.</p>"
  }
 ],
 "termos": [
  [
   "Máscara",
   "Separa rede e host."
  ],
  [
   "Gateway",
   "Roteador de saída da rede."
  ],
  [
   "Broadcast",
   "Endereço para todos da rede."
  ],
  [
   "APIPA",
   "169.254.x.x: sem DHCP."
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
   "id": "dora",
   "titulo": "DHCP: DORA",
   "atores": [
    "PC novo",
    "Servidor DHCP"
   ],
   "passos": [
    {
     "de": 0,
     "para": 1,
     "t": "Discover (broadcast)",
     "d": "Tem algum servidor DHCP aí?"
    },
    {
     "de": 1,
     "para": 0,
     "t": "Offer",
     "d": "Ofereço 10.0.1.50, máscara, gateway e DNS."
    },
    {
     "de": 0,
     "para": 1,
     "t": "Request",
     "d": "Aceito esse endereço."
    },
    {
     "de": 1,
     "para": 0,
     "t": "Ack",
     "d": "Confirmado, por 8 horas (lease)."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Duas ferramentas de técnico: a calculadora de sub-redes, com desafios para resolver no caderno, e o prompt de comando de uma máquina com problema. Descubra o que há de errado.",
  "sims": [
   {
    "tipo": "ipv4",
    "titulo": "Calculadora de sub-redes com desafios",
    "cfg": {
     "id": "ip",
     "ip": "172.20.5.9",
     "pre": 16,
     "desafios": [
      {
       "ip": "192.168.10.77",
       "pre": 24,
       "campo": "rede",
       "dica": "Zere o último octeto."
      },
      {
       "ip": "192.168.10.77",
       "pre": 24,
       "campo": "bc",
       "dica": "Último octeto 255."
      },
      {
       "ip": "10.0.5.130",
       "pre": 26,
       "campo": "rede",
       "dica": "Blocos de 64: 0, 64, 128, 192."
      },
      {
       "ip": "10.0.5.130",
       "pre": 26,
       "campo": "hosts",
       "dica": "2⁶ − 2."
      },
      {
       "ip": "172.16.40.200",
       "pre": 27,
       "campo": "bc",
       "dica": "Blocos de 32; o bloco de 200 vai de 192 a 223."
      }
     ]
    }
   },
   {
    "tipo": "cmd",
    "titulo": "Prompt de comando: a máquina sem internet",
    "instr": "Esta máquina do laboratório “está sem internet”. Use os comandos na ordem de diagnóstico e descubra a causa.",
    "cfg": {
     "id": "cmd",
     "cenario": {
      "ip": "10.0.1.50",
      "gw": "10.0.1.1",
      "dns": "10.0.1.2",
      "falha": "dhcp"
     }
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Qual foi o diagnóstico?",
    "cfg": {
     "id": "dg",
     "rotulo": "Pergunta",
     "itens": [
      {
       "t": "No prompt acima, o ipconfig mostrava 169.254.33.12. O que isso indica?",
       "ops": [
        [
         "O PC não recebeu endereço do DHCP (APIPA)",
         true,
         "Resolve-se com cabo/switch e ipconfig /release + /renew."
        ],
        [
         "DNS com defeito",
         false,
         "O DNS nem chega a ser usado."
        ],
        [
         "Endereço normal",
         false,
         "169.254 é autoconfiguração."
        ]
       ]
      },
      {
       "t": "ping no gateway responde, ping 8.8.8.8 responde, mas ping em google.com falha. Causa?",
       "ops": [
        [
         "DNS",
         true,
         "Há rede e internet, só não há tradução de nomes."
        ],
        [
         "Cabo",
         false,
         "O ping pelo IP funciona."
        ],
        [
         "DHCP",
         false,
         "O IP está correto."
        ]
       ]
      },
      {
       "t": "ping no gateway falha. Onde procurar primeiro?",
       "ops": [
        [
         "Na rede local: cabo, switch, IP/máscara",
         true,
         "Se nem o gateway responde, o problema está perto."
        ],
        [
         "No provedor",
         false,
         "Primeiro o local."
        ],
        [
         "No DNS",
         false,
         "Ping no gateway é por IP."
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
    "t": "Rode o ipconfig",
    "ev": "cmd:ipconfig"
   },
   {
    "id": "m2",
    "t": "Perceba o endereço APIPA (169.254)",
    "ev": "cmd:apipa"
   },
   {
    "id": "m3",
    "t": "Renove o endereço (/release e /renew)",
    "ev": "cmd:renew"
   },
   {
    "id": "m4",
    "t": "Teste o gateway com ping",
    "ev": "cmd:ping-gw"
   },
   {
    "id": "m5",
    "t": "Veja a rota com tracert",
    "ev": "cmd:tracert"
   },
   {
    "id": "m6",
    "t": "Resolva 3 desafios de sub-rede",
    "ev": "ip:desafio:3"
   },
   {
    "id": "m7",
    "t": "Resolva os 5 desafios de sub-rede",
    "ev": "ip:todos"
   },
   {
    "id": "m8",
    "t": "Responda os diagnósticos",
    "ev": "dg:fim"
   }
  ],
  "guiados": [
   {
    "titulo": "Dividindo a rede do campus",
    "txt": "<p>A rede 192.168.0.0/24 será dividida em sub-redes /26.</p>",
    "passos": [
     {
      "p": "Quantas sub-redes /26 cabem num /24?",
      "r": 4,
      "dica": "2^(26−24).",
      "expl": "4 sub-redes."
     },
     {
      "p": "Quantos hosts utilizáveis em cada /26?",
      "r": 62,
      "dica": "2⁶ − 2.",
      "expl": "62."
     },
     {
      "p": "Qual o último octeto do endereço de rede da 3ª sub-rede?",
      "r": 128,
      "dica": "0, 64, 128…",
      "expl": "192.168.0.128."
     },
     {
      "p": "Qual o último octeto do broadcast da 3ª sub-rede?",
      "r": 191,
      "dica": "Uma antes da próxima rede (192).",
      "expl": "192.168.0.191."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Datagrama",
   "Unidade de dados da camada de rede, com IP de origem e de destino."
  ],
  [
   "Endereço IP",
   "Identificador lógico e global de um dispositivo na rede."
  ],
  [
   "IPv4",
   "Endereço de 32 bits em decimal com pontos. Ex.: <code>192.168.1.100</code>."
  ],
  [
   "IPv6",
   "Endereço de 128 bits em hexadecimal. Criado pelo esgotamento do IPv4."
  ],
  [
   "Tabela de encaminhamento",
   "Lista do roteador que indica, para cada destino, o próximo salto."
  ],
  [
   "Próximo salto",
   "O próximo roteador para onde o pacote será enviado."
  ],
  [
   "Loopback",
   "<code>127.0.0.1</code>: o próprio computador."
  ],
  [
   "Endereço privado",
   "<code>192.168.x.x</code> ou <code>10.x.x.x</code>: usados dentro de redes locais."
  ],
  [
   "DHCP",
   "Atribui automaticamente IP, máscara, gateway e DNS. Portas 67/68, UDP."
  ],
  [
   "DORA",
   "Discover, Offer, Request, Ack: as 4 mensagens do DHCP."
  ],
  [
   "Gateway padrão",
   "Roteador que liga a rede local a outras redes."
  ],
  [
   "tracert",
   "Comando do Windows que mostra os saltos até o destino."
  ]
 ],
 "vf": [
  [
   "O endereço IP é um identificador físico gravado na placa de rede.",
   false,
   "Falso. O IP é um endereço <b>lógico</b>, que pode mudar. O endereço físico gravado de fábrica é o <b>MAC</b>."
  ],
  [
   "O IPv4 usa endereços de 32 bits.",
   true,
   "Verdadeiro. Isso dá cerca de 4,3 bilhões de endereços."
  ],
  [
   "O IPv6 foi criado para resolver o esgotamento dos endereços IPv4.",
   true,
   "Verdadeiro. Com 128 bits, oferece uma quantidade enorme de endereços."
  ],
  [
   "O endereço <code>127.0.0.1</code> identifica o roteador da rede local.",
   false,
   "Falso. <code>127.0.0.1</code> é o <b>loopback</b>, o próprio computador."
  ],
  [
   "Endereços como <code>10.0.1.50</code> são privados e usados em redes locais.",
   true,
   "Verdadeiro. A faixa <code>10.x.x.x</code>, assim como <code>192.168.x.x</code>, é privada."
  ],
  [
   "Cada roteador conhece o caminho completo da origem até o destino final.",
   false,
   "Falso. Cada roteador decide só o <b>próximo salto</b>, consultando sua tabela."
  ],
  [
   "A primeira mensagem do DHCP é enviada em broadcast porque o computador ainda não sabe quem é o servidor.",
   true,
   "Verdadeiro. O DHCP Discover vai para toda a rede local."
  ],
  [
   "A ordem das mensagens do DHCP é Offer, Discover, Ack, Request.",
   false,
   "Falso. A ordem é <b>Discover, Offer, Request, Ack</b> (DORA)."
  ],
  [
   "O IP recebido pelo DHCP vale para sempre, sem precisar de renovação.",
   false,
   "Falso. Ele tem um <b>tempo de concessão</b> (lease) e precisa ser renovado."
  ],
  [
   "O comando <code>ipconfig /all</code> mostra também o endereço MAC e o servidor DNS.",
   true,
   "Verdadeiro. O <code>/all</code> mostra as informações detalhadas."
  ],
  [
   "O comando <code>ipconfig /renew</code> libera o IP obtido por DHCP.",
   false,
   "Falso. Quem libera é o <code>/release</code>. O <code>/renew</code> <b>pede um novo</b> IP."
  ],
  [
   "O <code>tracert</code> mostra cada roteador por onde os pacotes passam até o destino.",
   true,
   "Verdadeiro. Cada linha do resultado é um salto."
  ]
 ],
 "caderno": [
  [
   "Quais são os dois grandes problemas que a camada de rede resolve?",
   "Endereçamento (dar a cada dispositivo um identificador lógico e global, o IP) e roteamento (determinar o melhor caminho para o pacote atravessar várias redes até o destino)."
  ],
  [
   "Como se chama a unidade de dados da camada de rede?",
   "Datagrama (ou pacote IP)."
  ],
  [
   "Explique a analogia do sistema postal para a camada de rede.",
   "O IP é o endereço completo e único da casa (rua, número, cidade, CEP). Os roteadores são agências e centros de triagem que olham o CEP de destino e decidem para qual próxima agência mandar a carta, até chegar à cidade certa."
  ],
  [
   "Compare IPv4 e IPv6 quanto ao tamanho, à notação e à quantidade de endereços.",
   "IPv4: 32 bits, decimal com pontos (192.168.1.100), cerca de 4,3 bilhões de endereços, já praticamente esgotados. IPv6: 128 bits, hexadecimal (2001:0db8:...:7334), quantidade astronomicamente grande."
  ],
  [
   "Qual a diferença entre roteamento e encaminhamento?",
   "Roteamento é o cálculo das rotas feito pelos algoritmos, que preenchem as tabelas. Encaminhamento é a ação do roteador de mover cada pacote da interface de entrada para a de saída correta, consultando a tabela e escolhendo o próximo salto."
  ],
  [
   "O que significa cada endereço: <code>127.0.0.1</code>, <code>192.168.x.x</code>, <code>10.x.x.x</code> e <code>255.255.255.255</code>?",
   "127.0.0.1: loopback, o próprio computador. 192.168.x.x e 10.x.x.x: endereços privados, usados em redes locais. 255.255.255.255: broadcast, mensagem para todos na rede local."
  ],
  [
   "Por que configurar IPs manualmente em um laboratório de 200 computadores é um problema?",
   "É um trabalho enorme e sujeito a erros: IPs repetidos, máscara ou gateway digitados errados. O DHCP automatiza essa configuração."
  ],
  [
   "Descreva as quatro mensagens do DHCP.",
   "1) Discover: o computador envia em broadcast “alguém me dá um IP?”. 2) Offer: o servidor oferece um IP livre e outras configurações. 3) Request: o computador aceita e pede formalmente. 4) Ack: o servidor confirma a atribuição."
  ],
  [
   "Além do endereço IP, que outras informações o DHCP entrega?",
   "Máscara de sub-rede, gateway padrão e servidor DNS."
  ],
  [
   "O que é o tempo de concessão (lease time)?",
   "O período durante o qual o computador pode usar o IP recebido do DHCP. Depois dele, precisa renovar a concessão com o servidor."
  ],
  [
   "Descreva o caminho na interface gráfica do Windows para configurar o IP manualmente.",
   "Painel de Controle › Rede e Internet › Central de Rede e Compartilhamento › Alterar as configurações do adaptador › botão direito na conexão › Propriedades › Protocolo IP Versão 4 (TCP/IPv4) › Propriedades › “Usar o seguinte endereço IP”."
  ],
  [
   "Para que servem <code>ipconfig</code>, <code>ipconfig /all</code>, <code>ipconfig /release</code> e <code>ipconfig /renew</code>?",
   "ipconfig: mostra IP, máscara e gateway. /all: mostra tudo, inclusive MAC, servidor DHCP e DNS. /release: libera o IP obtido por DHCP. /renew: pede um novo IP ao servidor DHCP."
  ],
  [
   "Qual a diferença entre <code>ping</code> e <code>tracert</code>?",
   "O ping testa se há comunicação com outro dispositivo e mostra o tempo de resposta. O tracert mostra a rota até o destino, listando cada roteador (salto) do caminho."
  ],
  [
   "Por que a transição de IPv4 para IPv6 é necessária e qual um desafio dela?",
   "Porque os cerca de 4,3 bilhões de endereços IPv4 estão praticamente esgotados. Um desafio é que os dois protocolos precisam conviver por muito tempo, exigindo equipamentos, sistemas e profissionais preparados para ambos."
  ]
 ],
 "pbl": [
  {
   "titulo": "Raio-x da rede do laboratório",
   "cenario": "O laboratório de informática tem máquinas que às vezes “ficam sem internet”. Ninguém sabe dizer qual é o gateway, qual servidor DHCP entrega os IPs nem por quantos roteadores os pacotes passam até a internet.<p><b>Problema:</b> Usando só o prompt de comando, como documentar a configuração de rede do laboratório e localizar onde a comunicação falha?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Qual IP, máscara, gateway, servidor DHCP e DNS cada máquina recebe?</li><li>O <code>ping</code> responde para o gateway, para <code>8.8.8.8</code> e para um nome de site? O que muda entre os três testes?</li><li>Quantos saltos o <code>tracert</code> mostra até o Google?</li><li>O que acontece depois de <code>ipconfig /release</code> e <code>ipconfig /renew</code>?</li></ol><p><b>Entregáveis:</b></p><ul><li>Ficha de rede de 3 máquinas (saída do <code>ipconfig /all</code> interpretada)</li><li>Tabela dos testes de <code>ping</code> com os tempos</li><li>Mapa dos saltos do <code>tracert</code></li><li>Fluxograma de diagnóstico para o monitor do laboratório</li></ul>",
     "<ul><li>Ordem de diagnóstico: <code>ipconfig</code> (tem IP válido?) → <code>ping</code> ao gateway (a rede local funciona?) → <code>ping 8.8.8.8</code> (sai para a internet?) → <code>ping</code> a um nome (o DNS resolve?).</li><li>Se o IP começa com 169.254, o computador não recebeu resposta do DHCP: testar <code>ipconfig /release</code> e <code>/renew</code>, cabo e switch.</li><li>Se o <code>ping 8.8.8.8</code> funciona mas o nome não, o problema é DNS.</li><li>O <code>tracert</code> mostra onde a rota para de responder: dentro do campus ou já no provedor.</li></ul>"
    ]
   ]
  },
  {
   "titulo": "Planejando IPs para o novo laboratório",
   "cenario": "O campus vai abrir um laboratório com 30 computadores, 1 impressora de rede e 1 servidor local. A equipe de TI quer usar DHCP para os computadores, mas a impressora e o servidor precisam de endereço fixo.<p><b>Problema:</b> Como organizar o endereçamento do novo laboratório combinando DHCP e IPs fixos sem conflitos?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Qual faixa privada usar?</li><li>Quais endereços reservar para gateway, servidor e impressora?</li><li>Qual faixa o DHCP vai distribuir e qual tempo de concessão faz sentido?</li><li>Como configurar manualmente a impressora e o servidor no Windows?</li></ol><p><b>Entregáveis:</b></p><ul><li>Planilha de endereçamento do laboratório</li><li>Configuração proposta para o servidor DHCP (faixa, gateway, DNS, lease)</li><li>Passo a passo da configuração manual de IP</li></ul>",
     "<ul><li>Exemplo: rede <code>192.168.10.0</code> com máscara <code>255.255.255.0</code>; gateway <code>192.168.10.1</code>.</li><li>Fixos fora da faixa do DHCP: servidor <code>192.168.10.10</code>, impressora <code>192.168.10.20</code>.</li><li>DHCP distribui de <code>192.168.10.100</code> a <code>192.168.10.150</code>, com gateway e DNS configurados e lease de algumas horas (um turno de aula).</li><li>Configuração manual pelo TCP/IPv4 › “Usar o seguinte endereço IP”, conferindo depois com <code>ipconfig</code> e <code>ping</code> ao gateway.</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Rede",
   "itens": [
    "IPv4 32 bits; IPv6 128 bits.",
    "Máscara/prefixo: rede × host.",
    "Hosts = 2^bits de host − 2.",
    "DHCP DORA; 169.254 = sem DHCP.",
    "Diagnóstico: ipconfig → ping gateway → ping IP externo → ping nome."
   ]
  }
 ],
 "glossario": [
  [
   "CIDR",
   "Notação /prefixo."
  ],
  [
   "NAT",
   "Traduz IPs privados em público."
  ],
  [
   "TTL",
   "Saltos restantes de um pacote."
  ]
 ]
});
