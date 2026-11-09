FSI.modulo({
 "n": 3,
 "unidade": "Unidade III",
 "nome": "Camada de transporte",
 "titulo": "Portas, UDP e TCP: entregando ao programa certo",
 "duracao": "8 h",
 "resumoCurto": "Comunicação fim a fim: A camada de rede leva os dados de computador a computador; a de transporte entrega à aplicação certa dentro do computador. Portas: Números que identificam a aplicação: HTTP 80, HTTPS 443, FTP 21, S",
 "analogia": {
  "titulo": "O prédio e os apartamentos",
  "txt": "<p>O endereço IP leva a carta até o prédio; o número do <b>apartamento</b> — a <b>porta</b> — leva ao morador certo: 80 é o servidor web, 53 o DNS. O <b>TCP</b> é a carta registrada, com aviso de recebimento e reenvio se perder; o <b>UDP</b> é o panfleto: chega rápido, mas ninguém confere.</p>"
 },
 "chave": [
  "<b>Comunicação fim a fim:</b> A camada de rede leva os dados de computador a computador; a de transporte entrega à <b>aplicação certa</b> dentro do computador.",
  "<b>Portas:</b> Números que identificam a aplicação: HTTP 80, HTTPS 443, FTP 21, SMTP 25, DNS 53, DHCP 67/68.",
  "<b>Multiplexação:</b> Na origem, junta dados de várias aplicações e põe portas de origem e destino em cada segmento. Demultiplexação: no destino, lê a porta e entrega ao socket certo.",
  "<b>UDP:</b> Sem conexão e sem garantia de entrega ou ordem. Rápido e leve: streaming, jogos, DNS, VoIP.",
  "<b>TCP:</b> Orientado à conexão e confiável: three-way handshake (SYN, SYN-ACK, ACK), números de sequência, ACKs e retransmissão.",
  "<b>Controles do TCP:</b> Controle de fluxo (janela de recepção) protege o receptor lento. Controle de congestionamento reduz a velocidade quando há perda na rede."
 ],
 "objetivos": [
  "Explicar <b>multiplexação</b> com portas.",
  "Comparar <b>TCP e UDP</b>.",
  "Descrever o <b>three-way handshake</b>.",
  "Diferenciar controle de <b>fluxo</b> e de <b>congestionamento</b>."
 ],
 "licoes": [
  {
   "t": "Portas",
   "txt": "<p>HTTP 80, HTTPS 443, FTP 21, SSH 22, SMTP 25, DNS 53, DHCP 67/68. Na origem, a camada junta dados de vários programas (multiplexação); no destino, entrega pela porta (demultiplexação).</p>"
  },
  {
   "t": "UDP e TCP",
   "txt": "<p>UDP: sem conexão, sem garantia, leve — streaming, jogos, DNS, VoIP. TCP: conexão com handshake (SYN, SYN-ACK, ACK), sequência, confirmações e retransmissão — web, e-mail, arquivos.</p>"
  }
 ],
 "termos": [
  [
   "Porta",
   "Número que identifica a aplicação."
  ],
  [
   "Segmento",
   "Unidade da camada de transporte."
  ],
  [
   "Handshake",
   "SYN, SYN-ACK, ACK."
  ],
  [
   "ACK",
   "Confirmação de recebimento."
  ]
 ],
 "ler": [
  [
   "Protocol Explorer: TCP e TLS byte a byte (em inglês)",
   "https://protocol-explorer-alpha.vercel.app/"
  ],
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
   "id": "hs",
   "titulo": "Three-way handshake e envio",
   "atores": [
    "Cliente",
    "Servidor"
   ],
   "passos": [
    {
     "de": 0,
     "para": 1,
     "t": "SYN (seq=100)",
     "d": "Quero conversar."
    },
    {
     "de": 1,
     "para": 0,
     "t": "SYN-ACK (seq=300, ack=101)",
     "d": "Topo, e confirmo o seu 100."
    },
    {
     "de": 0,
     "para": 1,
     "t": "ACK (ack=301)",
     "d": "Conexão estabelecida."
    },
    {
     "de": 0,
     "para": 1,
     "t": "Dados (GET /)",
     "d": "Agora sim a requisição HTTP."
    },
    {
     "de": 1,
     "para": 0,
     "t": "ACK + resposta",
     "d": "Cada segmento é confirmado; se não chegar, é reenviado."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Escolha TCP ou UDP para cada aplicação e associe portas.",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-tu",
    "titulo": "TCP ou UDP?",
    "cats": [
     "TCP",
     "UDP"
    ],
    "itens": [
     [
      "Página web (HTTPS)",
      0
     ],
     [
      "Download de um PDF",
      0
     ],
     [
      "E-mail (SMTP)",
      0
     ],
     [
      "Chamada de vídeo",
      1
     ],
     [
      "Jogo online em tempo real",
      1
     ],
     [
      "Consulta DNS",
      1
     ],
     [
      "SSH",
      0
     ],
     [
      "Transmissão ao vivo",
      1
     ]
    ]
   },
   {
    "tipo": "cenarios",
    "titulo": "Que porta é essa?",
    "cfg": {
     "id": "pt",
     "rotulo": "Serviço",
     "itens": [
      {
       "t": "Servidor web sem criptografia",
       "ops": [
        [
         "80",
         true,
         "HTTP."
        ],
        [
         "443",
         false,
         "HTTPS."
        ],
        [
         "25",
         false,
         "SMTP."
        ]
       ]
      },
      {
       "t": "Servidor web com cadeado",
       "ops": [
        [
         "443",
         true,
         "HTTPS."
        ],
        [
         "80",
         false,
         "Sem criptografia."
        ],
        [
         "22",
         false,
         "SSH."
        ]
       ]
      },
      {
       "t": "Resolução de nomes",
       "ops": [
        [
         "53",
         true,
         "DNS."
        ],
        [
         "67",
         false,
         "DHCP."
        ],
        [
         "21",
         false,
         "FTP."
        ]
       ]
      },
      {
       "t": "Acesso remoto seguro ao terminal",
       "ops": [
        [
         "22",
         true,
         "SSH."
        ],
        [
         "23",
         false,
         "Telnet, inseguro."
        ],
        [
         "53",
         false,
         "DNS."
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
    "t": "Separe TCP e UDP sem erros",
    "ev": "vis:lab-tu"
   },
   {
    "id": "m2",
    "t": "Acerte todas as portas",
    "ev": "pt:perfeito"
   },
   {
    "id": "m3",
    "t": "Assista ao handshake inteiro (Explorar)",
    "ev": "vis:hs"
   }
  ],
  "guiados": [
   {
    "titulo": "Números de sequência",
    "txt": "<p>O cliente envia SYN com seq = <b>100</b>. Depois envia um segmento de dados com <b>500 bytes</b> começando no byte 101.</p>",
    "passos": [
     {
      "p": "Qual ack o servidor responde ao SYN?",
      "r": 101,
      "dica": "seq + 1.",
      "expl": "101."
     },
     {
      "p": "Depois dos 500 bytes (101 a 600), qual ack o servidor envia?",
      "r": 601,
      "dica": "Próximo byte esperado.",
      "expl": "601: o ACK diz qual o próximo byte que ele espera."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Segmento",
   "Unidade de dados da camada de transporte: dados + cabeçalho com portas."
  ],
  [
   "Porta",
   "Número que identifica a aplicação dentro do computador."
  ],
  [
   "Socket",
   "Ponto de comunicação de uma aplicação, identificado por IP e porta."
  ],
  [
   "Demultiplexação",
   "Entregar cada segmento recebido ao socket certo, lendo a porta de destino."
  ],
  [
   "UDP",
   "User Datagram Protocol: sem conexão, não confiável, rápido e leve."
  ],
  [
   "TCP",
   "Transmission Control Protocol: orientado à conexão e confiável."
  ],
  [
   "Three-way handshake",
   "SYN → SYN-ACK → ACK: as três etapas para abrir uma conexão TCP."
  ],
  [
   "ACK",
   "Confirmação de recebimento enviada pelo receptor no TCP."
  ],
  [
   "Número de sequência",
   "Numeração dos bytes enviados, usada para ordenar e detectar perdas."
  ],
  [
   "Janela de recepção",
   "Espaço livre no buffer do receptor; base do controle de fluxo."
  ],
  [
   "Controle de congestionamento",
   "O TCP reduz a taxa de envio quando detecta perda de pacotes na rede."
  ],
  [
   "Porta 443",
   "HTTPS, a Web segura, sobre TCP."
  ]
 ],
 "vf": [
  [
   "A camada de transporte entrega os dados para a aplicação correta dentro do computador de destino.",
   true,
   "Verdadeiro. Ela usa o número da porta para achar o processo certo."
  ],
  [
   "Na multiplexação, o computador de destino lê a porta e entrega o dado ao socket.",
   false,
   "Falso. Isso é a <b>demultiplexação</b>, que acontece no destino. A multiplexação acontece na origem."
  ],
  [
   "O DNS usa principalmente UDP na porta 53.",
   true,
   "Verdadeiro. Também pode usar TCP, mas as consultas comuns vão por UDP."
  ],
  [
   "O UDP garante que os pacotes cheguem na ordem em que foram enviados.",
   false,
   "Falso. O UDP não garante entrega nem ordem. Quem numera e ordena os dados é o <b>TCP</b>."
  ],
  [
   "O UDP é adequado para VoIP porque prioriza a fluidez da conversa.",
   true,
   "Verdadeiro. Esperar retransmissões causaria atrasos piores do que perder um pedaço mínimo de áudio."
  ],
  [
   "O three-way handshake acontece depois que os dados começam a ser enviados.",
   false,
   "Falso. O handshake acontece <b>antes</b> de qualquer dado: SYN, SYN-ACK e ACK estabelecem a conexão."
  ],
  [
   "A sequência correta do handshake é SYN, SYN-ACK, ACK.",
   true,
   "Verdadeiro."
  ],
  [
   "Se o remetente TCP não recebe o ACK dentro do tempo limite, ele retransmite os dados.",
   true,
   "Verdadeiro. É assim que o TCP garante a entrega."
  ],
  [
   "O controle de fluxo existe para evitar o congestionamento dos roteadores da internet.",
   false,
   "Falso. O controle de fluxo protege o <b>receptor</b> lento (janela de recepção). Quem trata a rede é o controle de <b>congestionamento</b>."
  ],
  [
   "Para baixar um arquivo PDF sem erros, o UDP é a melhor escolha.",
   false,
   "Falso. Um arquivo precisa chegar completo e correto: o adequado é o <b>TCP</b>."
  ],
  [
   "O TCP tem mais overhead que o UDP.",
   true,
   "Verdadeiro. Conexão, confirmações e retransmissões custam cabeçalhos e tempo."
  ],
  [
   "HTTP e HTTPS usam UDP como protocolo de transporte.",
   false,
   "Falso. Na tabela da unidade, HTTP (80) e HTTPS (443) usam <b>TCP</b>."
  ]
 ],
 "caderno": [
  [
   "Qual é a diferença entre a tarefa da camada de rede e a da camada de transporte?",
   "A camada de rede leva os pacotes de um computador a outro. A camada de transporte entrega os dados ao processo (aplicação) correto dentro do computador de destino, criando uma comunicação lógica entre processos."
  ],
  [
   "Explique a analogia da correspondência interna de uma empresa para a camada de transporte.",
   "A empresa (computador) recebe muitas cartas do correio. O setor de correspondência (transporte) lê o nome do destinatário (a porta) e entrega na sala certa (a aplicação)."
  ],
  [
   "O que é multiplexação e o que é demultiplexação?",
   "Multiplexação, na origem: pegar dados de várias aplicações, acrescentar o cabeçalho com porta de origem e de destino e entregar à camada de rede. Demultiplexação, no destino: ler a porta de destino de cada segmento e entregar ao socket da aplicação correspondente."
  ],
  [
   "Complete a tabela: serviço, porta e protocolo de transporte para HTTP, HTTPS, FTP, SMTP, DNS e DHCP.",
   "HTTP 80 TCP; HTTPS 443 TCP; FTP 21 TCP; SMTP 25 TCP; DNS 53 UDP (e TCP); DHCP 67/68 UDP."
  ],
  [
   "Por que se diz que o UDP é “não orientado à conexão” e “não confiável”?",
   "Não há aperto de mão antes de enviar os dados (sem conexão) e não há garantia de que os pacotes cheguem nem de que cheguem na ordem (não confiável)."
  ],
  [
   "Se o UDP não garante a entrega, por que ele é usado? Cite quatro aplicações.",
   "Porque é rápido e leve: não tem o custo de estabelecer conexão, confirmar e retransmitir. É usado em streaming de vídeo e áudio, jogos online, DNS e VoIP, onde atraso atrapalha mais que perder um pacote."
  ],
  [
   "Descreva as três etapas do three-way handshake.",
   "1) SYN: o cliente pede para iniciar a conexão. 2) SYN-ACK: o servidor confirma e pede sincronização de volta. 3) ACK: o cliente confirma. A conexão está estabelecida."
  ],
  [
   "Como o TCP percebe que um segmento se perdeu e o que ele faz?",
   "Cada byte enviado tem número de sequência e o receptor devolve confirmações (ACK). Se o remetente não recebe o ACK dentro do tempo limite, retransmite os dados."
  ],
  [
   "Qual a diferença entre controle de fluxo e controle de congestionamento?",
   "Controle de fluxo protege o <b>receptor</b>: ele informa o tamanho da janela de recepção (espaço livre no buffer) e o remetente ajusta a velocidade. Controle de congestionamento protege a <b>rede</b>: ao detectar perda de pacotes, o TCP reduz a taxa de envio."
  ],
  [
   "Monte uma tabela TCP × UDP com: conexão, confiabilidade, fluxo, congestionamento, velocidade, overhead e exemplos.",
   "TCP: orientado à conexão, confiável, tem controle de fluxo e de congestionamento, mais lento, overhead maior, usado em Web, e-mail, download. UDP: sem conexão, não confiável, sem esses controles, mais rápido, overhead pequeno, usado em streaming, jogos, DNS, VoIP."
  ],
  [
   "Indique TCP ou UDP e justifique: a) download de PDF de 50 MB; b) jogo de futebol ao vivo.",
   "a) TCP: o arquivo precisa chegar completo e sem erros. b) UDP: na transmissão ao vivo é melhor perder um pedacinho do que pausar para retransmitir."
  ],
  [
   "Indique TCP ou UDP e justifique: c) e-mail com anexo; d) jogo multiplayer; e) consulta DNS.",
   "c) TCP: a mensagem e o anexo devem chegar inteiros. d) UDP: atraso (lag) é pior que perder uma posição. e) UDP: consultas pequenas e rápidas; se se perder, basta repetir."
  ],
  [
   "Explique as analogias do cartão-postal e da ligação telefônica.",
   "UDP é o cartão-postal: você envia e torce para chegar, sem confirmação, rápido e barato. TCP é a ligação: primeiro se estabelece a conexão (“Alô?”), a conversa tem confirmações (“Entendi”) e há despedida no fim."
  ],
  [
   "Na história, o Sr. TCP escreve duas informações no segmento de Paco. Quais são e para que servem?",
   "A porta de origem (o “apartamento” do programa de mensagens no computador de Ana) e a porta de destino (o do programa no computador de Beto). Servem para que a demultiplexação entregue Paco à aplicação correta."
  ]
 ],
 "pbl": [
  {
   "titulo": "Time TCP × Time UDP",
   "cenario": "Uma escola vai lançar uma rádio web e um sistema de envio de trabalhos pela internet no mesmo servidor. O técnico precisa justificar à direção qual protocolo de transporte cada serviço vai usar.<p><b>Problema:</b> Para cada serviço da escola, qual protocolo de transporte usar e como defender essa escolha diante de quem defende o outro?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>O que acontece com a rádio se um pacote se perder? E com o trabalho enviado?</li><li>Quais portas cada serviço vai usar?</li><li>Qual o custo (overhead) de cada escolha?</li><li>Existe algum serviço em que a escolha não é óbvia?</li></ol><p><b>Entregáveis:</b></p><ul><li>Tabela de serviços com protocolo, porta e justificativa</li><li>Apresentação de 5 minutos de cada time (TCP e UDP)</li><li>Votação da turma e síntese no caderno</li></ul>",
     "<ul><li>Rádio web ao vivo: <b>UDP</b>, porque perder um pedaço mínimo de áudio é melhor do que pausar para retransmitir.</li><li>Envio de trabalhos: <b>TCP</b>, porque o arquivo precisa chegar completo e sem erros; usa HTTPS na porta 443.</li><li>Consulta de nomes do servidor: DNS, porta 53, UDP.</li><li>A síntese deve reconhecer que não existe protocolo melhor em geral: cada um serve a uma necessidade (confiabilidade × velocidade).</li></ul>"
    ]
   ]
  },
  {
   "titulo": "Handshake em papel",
   "cenario": "A turma do 1º ano não entende como o TCP “sabe” que um dado se perdeu. O professor quer uma simulação física com bilhetes para que todos vejam a conexão, o envio e a retransmissão.<p><b>Problema:</b> Como simular com bilhetes de papel o estabelecimento de uma conexão TCP, a troca de dados com números de sequência e uma perda com retransmissão?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Quais bilhetes precisam existir antes do primeiro dado?</li><li>Como representar o número de sequência e o ACK?</li><li>Como simular uma perda (um aluno “carteiro” que some com um bilhete)?</li><li>Como representar a janela de recepção?</li></ol><p><b>Entregáveis:</b></p><ul><li>Roteiro da simulação com papéis: cliente, servidor, carteiro</li><li>Conjunto de bilhetes (SYN, SYN-ACK, ACK, dados numerados, ACKs)</li><li>Registro no caderno do que aconteceu em cada rodada</li></ul>",
     "<ul><li>Rodada 1: cliente envia <b>SYN</b>, servidor responde <b>SYN-ACK</b>, cliente envia <b>ACK</b>; só então há conexão.</li><li>Rodada 2: cliente envia bilhetes de dados numerados (1, 2, 3); o servidor devolve um ACK para cada um.</li><li>Rodada 3: o carteiro “perde” o bilhete 2; o cliente espera, não recebe o ACK dentro do tempo combinado e <b>retransmite</b> o bilhete 2.</li><li>Janela: o servidor diz quantos bilhetes cabem na sua mesa; o cliente não envia mais do que isso (controle de fluxo).</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Transporte",
   "itens": [
    "Portas e multiplexação.",
    "UDP leve × TCP confiável.",
    "Handshake SYN, SYN-ACK, ACK.",
    "Fluxo protege o receptor; congestionamento, a rede."
   ]
  }
 ],
 "glossario": [
  [
   "Socket",
   "IP + porta."
  ],
  [
   "Janela",
   "Quanto pode ser enviado sem confirmação."
  ]
 ]
});
