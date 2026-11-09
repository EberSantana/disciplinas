FSI.modulo({
 "n": 1,
 "unidade": "Unidade I",
 "nome": "Introdução às redes",
 "titulo": "Da ARPANET ao celular: borda, núcleo e camadas",
 "duracao": "8 h",
 "resumoCurto": "ARPANET (1969): Rede descentralizada criada pela DARPA para resistir a falhas. Começou com 4 nós: UCLA, Stanford, UC Santa Barbara e Utah. TCP/IP: Protocolos de Vint Cerf e Bob Kahn (1974). Em 1983 a ARPANET adota o TCP/",
 "analogia": {
  "titulo": "Os Correios do mundo",
  "txt": "<p>A internet funciona como um correio gigante. Você não precisa saber o caminho até Manaus: escreve o endereço, entrega na agência e o sistema leva. As casas são a <b>borda</b> da rede (computadores e celulares), as agências e caminhões são o <b>núcleo</b> (roteadores e enlaces), e cada carta pode seguir por um caminho — é a <b>comutação de pacotes</b>.</p>"
 },
 "chave": [
  "<b>ARPANET (1969):</b> Rede descentralizada criada pela DARPA para resistir a falhas. Começou com 4 nós: UCLA, Stanford, UC Santa Barbara e Utah.",
  "<b>TCP/IP:</b> Protocolos de Vint Cerf e Bob Kahn (1974). Em 1983 a ARPANET adota o TCP/IP: muitos consideram esse o nascimento da internet.",
  "<b>Web (1989):</b> Tim Berners-Lee, no CERN, cria a WWW: hiperlinks, HTTP e navegadores. No Brasil, a internet comercial chega em 1995; antes, o acesso era pela RNP.",
  "<b>Borda e núcleo:</b> Borda: hosts (computadores, celulares, servidores) onde rodam as aplicações. Núcleo: malha de roteadores e switches que só transporta os dados.",
  "<b>Comutação de pacotes:</b> O arquivo é dividido em pacotes com endereço. Cada pacote pode seguir rota diferente e é remontado no destino. Compartilha a rede e resiste a falhas.",
  "<b>Modelos em camadas:</b> OSI (ISO) tem 7 camadas e é referência teórica. O TCP/IP é o modelo prático da internet, com 4 ou 5 camadas: Aplicação, Transporte, Rede, Enlace e Física."
 ],
 "objetivos": [
  "Contar a <b>história</b> da internet em marcos.",
  "Distinguir <b>borda e núcleo</b>.",
  "Explicar a <b>comutação de pacotes</b>.",
  "Comparar os modelos <b>OSI e TCP/IP</b>."
 ],
 "licoes": [
  {
   "t": "Uma rede para resistir",
   "txt": "<p>A <b>ARPANET</b> (1969) ligou quatro universidades dos EUA numa rede descentralizada. Em 1974 Vint Cerf e Bob Kahn criaram o <b>TCP/IP</b>, adotado em 1983. Em 1989 Tim Berners-Lee criou a <b>Web</b>. No Brasil, a internet comercial chegou em 1995.</p>"
  },
  {
   "t": "Borda, núcleo e pacotes",
   "txt": "<p>Na <b>borda</b> rodam as aplicações; o <b>núcleo</b> só transporta. O arquivo é dividido em <b>pacotes</b> com endereço, que podem seguir rotas diferentes e são remontados no destino.</p>"
  },
  {
   "t": "Camadas",
   "txt": "<p><b>OSI</b> (7 camadas) é a referência teórica. O <b>TCP/IP</b> (aplicação, transporte, rede, enlace, física) é o que roda na prática. Cada camada usa os serviços da de baixo e serve a de cima.</p>"
  }
 ],
 "termos": [
  [
   "Host",
   "Dispositivo na borda da rede."
  ],
  [
   "Comutação de pacotes",
   "Dados divididos em pacotes independentes."
  ],
  [
   "ISP",
   "Provedor de acesso."
  ],
  [
   "RFC",
   "Documento que padroniza protocolos."
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
   "tipo": "linha",
   "id": "hist",
   "titulo": "Linha do tempo da internet",
   "ordenar": true,
   "passos": [
    {
     "t": "1969 · ARPANET",
     "d": "Quatro universidades ligadas."
    },
    {
     "t": "1974 · TCP/IP",
     "d": "Cerf e Kahn publicam os protocolos."
    },
    {
     "t": "1983 · Adoção do TCP/IP",
     "d": "Nasce a internet como conhecemos."
    },
    {
     "t": "1989 · Web",
     "d": "Berners-Lee, no CERN."
    },
    {
     "t": "1995 · Internet comercial no Brasil",
     "d": "Antes, só pela RNP."
    },
    {
     "t": "2007 · Smartphones",
     "d": "A internet vai para o bolso."
    }
   ]
  },
  {
   "tipo": "camadas",
   "id": "osi",
   "titulo": "As 5 camadas do TCP/IP",
   "forma": "pilha",
   "h": 340,
   "camadas": [
    {
     "t": "Aplicação",
     "d": "HTTP, DNS, SMTP: o que o usuário usa."
    },
    {
     "t": "Transporte",
     "d": "TCP e UDP: entrega ao programa certo (portas)."
    },
    {
     "t": "Rede",
     "d": "IP: endereços e rotas."
    },
    {
     "t": "Enlace",
     "d": "Ethernet, Wi-Fi: de um nó ao vizinho (MAC)."
    },
    {
     "t": "Física",
     "d": "Bits em sinais: cabo, fibra, rádio."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Ponha a história em ordem e classifique equipamentos e protocolos nas camadas.",
  "sims": [
   {
    "tipo": "linha",
    "id": "lab-hist",
    "titulo": "Ordene os marcos da internet",
    "ordenar": true,
    "passos": [
     {
      "t": "ARPANET",
      "d": "1969"
     },
     {
      "t": "TCP/IP publicado",
      "d": "1974"
     },
     {
      "t": "ARPANET adota o TCP/IP",
      "d": "1983"
     },
     {
      "t": "World Wide Web",
      "d": "1989"
     },
     {
      "t": "Internet comercial no Brasil",
      "d": "1995"
     }
    ]
   },
   {
    "tipo": "classificar",
    "id": "lab-cam",
    "titulo": "Em que camada?",
    "cats": [
     "Aplicação",
     "Transporte",
     "Rede",
     "Enlace",
     "Física"
    ],
    "itens": [
     [
      "HTTP",
      0
     ],
     [
      "DNS",
      0
     ],
     [
      "TCP",
      1
     ],
     [
      "UDP",
      1
     ],
     [
      "IP",
      2
     ],
     [
      "Roteador",
      2
     ],
     [
      "Switch",
      3
     ],
     [
      "Endereço MAC",
      3
     ],
     [
      "Cabo UTP",
      4
     ],
     [
      "Fibra óptica",
      4
     ]
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Ordene os marcos da internet",
    "ev": "ord:lab-hist"
   },
   {
    "id": "m2",
    "t": "Classifique tudo nas camadas certas",
    "ev": "vis:lab-cam"
   },
   {
    "id": "m3",
    "t": "Explore as 5 camadas (Explorar)",
    "ev": "vis:osi"
   }
  ],
  "guiados": [
   {
    "titulo": "Quanto tempo leva?",
    "txt": "<p>Um arquivo de <b>100 MB</b> (1 MB = 8 megabits) é enviado por uma conexão de <b>20 Mbps</b>.</p>",
    "passos": [
     {
      "p": "Quantos megabits tem o arquivo?",
      "r": 800,
      "un": "Mb",
      "dica": "100 × 8.",
      "expl": "800 megabits."
     },
     {
      "p": "Quantos segundos leva, no mínimo?",
      "r": 40,
      "un": "s",
      "dica": "800 ÷ 20.",
      "expl": "40 s — por isso a velocidade é medida em bits, e o arquivo em bytes."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "ARPANET",
   "Rede precursora da internet, criada em 1969 pela DARPA, com 4 nós iniciais."
  ],
  [
   "DARPA",
   "Defense Advanced Research Projects Agency, agência do Departamento de Defesa dos EUA que financiou a ARPANET."
  ],
  [
   "Vint Cerf e Bob Kahn",
   "Criadores dos protocolos TCP/IP, publicados em 1974."
  ],
  [
   "Tim Berners-Lee",
   "Criou a World Wide Web em 1989, no CERN."
  ],
  [
   "RNP",
   "Rede Nacional de Pesquisa. Ligava universidades e centros de pesquisa brasileiros antes da internet comercial (1995)."
  ],
  [
   "Host ou sistema final",
   "Qualquer dispositivo na borda da rede: computador, smartphone, servidor, câmera."
  ],
  [
   "Núcleo da rede",
   "Malha de roteadores e switches que encaminha os dados da origem ao destino."
  ],
  [
   "Pacote",
   "Pedaço de dados com informações de endereço de origem e destino."
  ],
  [
   "Comutação de circuitos",
   "Reserva um caminho exclusivo durante toda a comunicação, como na telefonia tradicional."
  ],
  [
   "Modelo OSI",
   "Modelo de referência da ISO com 7 camadas, usado para estudar os conceitos."
  ],
  [
   "Modelo TCP/IP",
   "Modelo prático usado na internet, com 4 ou 5 camadas."
  ],
  [
   "Camada Física",
   "Transmite os bits brutos pelo meio: cabo, fibra ou ondas de rádio."
  ]
 ],
 "vf": [
  [
   "A ARPANET foi criada para ser uma rede centralizada, com um único computador controlando toda a comunicação.",
   false,
   "Falso. Ela foi pensada para ser <b>descentralizada</b>, para que a informação encontrasse caminhos alternativos mesmo se parte da rede fosse destruída."
  ],
  [
   "A ARPANET adotou oficialmente o TCP/IP em 1983.",
   true,
   "Verdadeiro. Esse marco é considerado por muitos o nascimento da internet."
  ],
  [
   "A World Wide Web e a internet são a mesma coisa.",
   false,
   "Falso. A internet é a infraestrutura de redes interligadas (existe desde a ARPANET). A Web, de 1989, é um serviço que roda sobre a internet, com páginas, hiperlinks e HTTP."
  ],
  [
   "A internet comercial chegou ao Brasil em 1995.",
   true,
   "Verdadeiro. Antes disso o acesso era restrito a universidades e centros de pesquisa pela RNP."
  ],
  [
   "Os roteadores fazem parte da borda da rede.",
   false,
   "Falso. Roteadores e switches formam o <b>núcleo</b>. A borda é formada pelos hosts, como computadores, smartphones e servidores."
  ],
  [
   "Um servidor web é um host da borda da rede.",
   true,
   "Verdadeiro. Servidores também são sistemas finais: ficam nas pontas e fornecem serviços."
  ],
  [
   "Na comutação de pacotes, todos os pacotes de um arquivo precisam seguir exatamente o mesmo caminho.",
   false,
   "Falso. Cada pacote viaja de forma independente, pode seguir rotas diferentes e chegar fora de ordem. O destino reorganiza os pacotes."
  ],
  [
   "A comutação de pacotes é mais resiliente a falhas porque os pacotes podem contornar um caminho que caiu.",
   true,
   "Verdadeiro. Se um enlace falha, os pacotes seguintes encontram outra rota."
  ],
  [
   "O modelo OSI tem 7 camadas e o TCP/IP tem 4 ou 5 camadas.",
   true,
   "Verdadeiro. O OSI é a referência teórica; o TCP/IP é o modelo usado na internet real."
  ],
  [
   "A camada de Rede é responsável pelo endereçamento físico (MAC).",
   false,
   "Falso. O endereço MAC é da camada de <b>Enlace</b>. A camada de Rede cuida do endereço lógico (IP) e do roteamento."
  ],
  [
   "A criptografia e a compressão de dados são funções da camada de Apresentação no modelo OSI.",
   true,
   "Verdadeiro. No TCP/IP essas funções ficam dentro da camada de Aplicação."
  ],
  [
   "TCP e UDP são protocolos da camada de Rede.",
   false,
   "Falso. TCP e UDP são protocolos da camada de <b>Transporte</b>. O protocolo principal da camada de Rede é o IP."
  ]
 ],
 "caderno": [
  [
   "Por que a DARPA quis criar uma rede <b>descentralizada</b> nos anos 1960?",
   "Durante a Guerra Fria havia o medo de que um ataque destruísse os meios de comunicação centralizados. Numa rede descentralizada a informação pode achar outros caminhos até o destino mesmo que parte da rede seja destruída."
  ],
  [
   "Quais foram as quatro instituições conectadas na primeira ARPANET, em 1969?",
   "UCLA, Stanford, UC Santa Barbara e Universidade de Utah."
  ],
  [
   "Qual foi a importância do TCP/IP para o surgimento da internet?",
   "Criado por Vint Cerf e Bob Kahn (publicado em 1974), o TCP/IP padronizou a forma como os computadores conversam, permitindo interligar redes diferentes. Quando a ARPANET o adotou oficialmente, em 1983, nasceu a internet como a conhecemos."
  ],
  [
   "Quem criou a World Wide Web, onde e em que ano? Quais três elementos ela trouxe?",
   "Tim Berners-Lee, no CERN, em 1989. Trouxe as páginas com hiperlinks, o protocolo HTTP e os navegadores."
  ],
  [
   "Como era o acesso à internet no Brasil antes de 1995 e o que mudou nesse ano?",
   "O acesso era restrito a universidades e centros de pesquisa, ligados pela Rede Nacional de Pesquisa (RNP). Em 1995 o governo autorizou a exploração comercial e a internet chegou às pessoas e empresas."
  ],
  [
   "Monte uma linha do tempo com 6 marcos da história das redes, de 1969 a 2007.",
   "1969 ARPANET com 4 nós; 1972 primeira demonstração pública; 1974 publicação do TCP/IP; 1983 ARPANET adota TCP/IP; 1989 proposta da WWW; 1991 Web pública; 1995 internet comercial no Brasil; 2007 iPhone e era da internet móvel."
  ],
  [
   "Diferencie <b>borda</b> e <b>núcleo</b> da rede e dê três exemplos de dispositivos em cada parte.",
   "Borda: dispositivos nas pontas, chamados hosts ou sistemas finais, onde rodam as aplicações. Ex.: notebook, smartphone, servidor web, câmera IP. Núcleo: infraestrutura que interliga a borda e encaminha os dados sem se preocupar com o conteúdo. Ex.: roteadores, switches, enlaces de backbone."
  ],
  [
   "Explique a analogia das rodovias usada para borda e núcleo.",
   "A borda são as casas, lojas e escritórios das cidades, onde as pessoas vivem. O núcleo são as estradas e cruzamentos que ligam as cidades. Os roteadores são os trevos que direcionam o tráfego para o caminho certo."
  ],
  [
   "Descreva como um arquivo viaja usando comutação de pacotes.",
   "O arquivo é quebrado em pacotes; cada um leva parte dos dados e os endereços de origem e destino. Os pacotes viajam de forma independente, podem seguir rotas diferentes e chegar fora de ordem. No destino são reorganizados para montar o arquivo original."
  ],
  [
   "Compare comutação de pacotes e comutação de circuitos. Cite uma vantagem de cada.",
   "Na comutação de circuitos (telefonia tradicional) um caminho é reservado durante toda a comunicação: vantagem, recursos garantidos. Na de pacotes, os dados são divididos e compartilham os enlaces: vantagem, muitos usuários ao mesmo tempo e resiliência, pois os pacotes contornam falhas."
  ],
  [
   "Por que as redes são organizadas em <b>camadas</b>?",
   "Para dividir a complexidade da comunicação: cada camada tem uma função específica e presta serviço à camada de cima. Assim é possível mudar a tecnologia de uma camada sem refazer as outras."
  ],
  [
   "Liste as 7 camadas do modelo OSI e diga a função de cada uma.",
   "7 Aplicação: interface com o usuário (HTTP, SMTP, DNS). 6 Apresentação: formatação, criptografia e compressão. 5 Sessão: controle do diálogo entre hosts. 4 Transporte: entrega fim a fim (TCP/UDP). 3 Rede: endereço lógico e roteamento (IP). 2 Enlace: endereço físico (MAC) e acesso ao meio. 1 Física: transmissão de bits no meio."
  ],
  [
   "Onde ficam as funções das camadas de Sessão e Apresentação no modelo TCP/IP?",
   "Elas não existem como camadas separadas: suas funções ficam incluídas na camada de Aplicação do TCP/IP."
  ],
  [
   "Associe cada etapa do envio de uma encomenda pelo correio a uma camada.",
   "Embalar o produto: Aplicação. Colocar na caixa com número de rastreio: Transporte. Centro de triagem que escolhe a rota: Rede. Carteiro que leva até o endereço: Enlace. Estrada ou avião por onde a encomenda viaja: Física."
  ]
 ],
 "pbl": [
  {
   "titulo": "Museu digital da internet",
   "cenario": "A coordenação do campus vai montar uma exposição na semana de tecnologia e pediu à turma um painel que conte a história das redes para alunos que nunca estudaram o assunto. O painel precisa ligar a história mundial à chegada da internet no Brasil e na nossa região.<p><b>Problema:</b> Como explicar, em um único painel, de onde veio a internet e por que ela funciona com pacotes e camadas?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Quais marcos entre 1969 e 2007 não podem faltar?</li><li>Por que o medo de um ataque nuclear levou a uma rede descentralizada?</li><li>Como a comutação de pacotes se relaciona com essa ideia de descentralização?</li><li>Quando e como a internet chegou à sua cidade ou ao seu campus?</li></ol><p><b>Entregáveis:</b></p><ul><li>Linha do tempo ilustrada com pelo menos 8 marcos</li><li>Um esquema da borda e do núcleo com dispositivos reais do campus</li><li>Uma analogia criada pela equipe para explicar a comutação de pacotes</li><li>Roteiro de 3 minutos para apresentar o painel</li></ul>",
     "<ul><li>Linha do tempo: 1969 ARPANET, 1972 demonstração pública, 1974 TCP/IP, 1983 adoção do TCP/IP, 1989 WWW, 1991 Web pública, 1995 internet comercial no Brasil, 2007 internet móvel; mais um marco local pesquisado pela equipe.</li><li>Ligação central: a rede foi feita descentralizada para sobreviver a falhas; a comutação de pacotes é o que torna isso possível, porque cada pacote pode seguir outra rota.</li><li>Esquema: na borda, computadores do laboratório, celulares, servidor do sistema acadêmico; no núcleo, switch do laboratório, roteador do campus, enlace do provedor.</li><li>Analogia de exemplo: o quebra-cabeça enviado peça por peça em envelopes pelo correio, cada um por um caminho.</li></ul>"
    ]
   ]
  },
  {
   "titulo": "O edifício de Paco",
   "cenario": "Paco, o pacote de dados de Ana, precisa descer os 5 andares do edifício TCP/IP antes de viajar de Coari a Manaus. Os alunos do 1º ano confundem o que acontece em cada andar e misturam OSI com TCP/IP.<p><b>Problema:</b> Como criar um material que mostre, andar por andar, o que acontece com a mensagem e compare os dois modelos de camadas?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>O que Paco recebe em cada andar (segmento, datagrama, quadro, bits)?</li><li>Qual camada do OSI corresponde a cada andar do TCP/IP?</li><li>Onde foram parar as camadas de Sessão e Apresentação?</li><li>O que acontece quando Paco chega ao destino: ele desce ou sobe os andares?</li></ol><p><b>Entregáveis:</b></p><ul><li>Tabela comparativa OSI × TCP/IP com funções</li><li>Desenho do edifício com a “roupa” que Paco veste em cada andar</li><li>Uma encenação curta (2 minutos) com um aluno para cada camada</li></ul>",
     "<ul><li>Aplicação: a mensagem é criada pelo programa. Transporte: vira <b>segmento</b> com portas de origem e destino. Rede: vira <b>datagrama</b> com IPs. Enlace: vira <b>quadro</b> com MACs e CRC. Física: vira sinais elétricos, de luz ou de rádio.</li><li>Correspondência: Aplicação do TCP/IP = Aplicação, Apresentação e Sessão do OSI; as demais são iguais (Transporte, Rede, Enlace, Física).</li><li>No destino o caminho é o inverso: Paco <b>sobe</b> os andares e em cada um retira uma camada de cabeçalho (desencapsulamento).</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Introdução",
   "itens": [
    "ARPANET 1969, TCP/IP 1974/1983, Web 1989.",
    "Borda × núcleo; comutação de pacotes.",
    "OSI 7 × TCP/IP 5 camadas."
   ]
  }
 ],
 "glossario": [
  [
   "Backbone",
   "Espinha dorsal de alta capacidade."
  ],
  [
   "IETF",
   "Grupo que padroniza a internet."
  ]
 ]
});
