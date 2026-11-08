FSI.modulo({
  n: 3, unidade: "Revisão visual", nome: "Redes e Infraestrutura", titulo: "Redes de computadores e infraestrutura",
  resumoCurto: "Topologias, dispositivos, modelos OSI e TCP/IP, endereçamento IP, TCP e UDP, protocolos de aplicação, roteamento, VLAN, Wi-Fi e VPN.",
  objetivos: ["Relacionar as camadas do modelo OSI e do TCP/IP com protocolos e dispositivos.", "Calcular sub-redes e distinguir IPv4, IPv6, máscara e gateway.", "Comparar TCP e UDP e identificar protocolos de aplicação (DNS, DHCP, HTTP, SMTP).", "Explicar roteamento, VLAN, NAT, Wi-Fi e VPN."],
  licoes: [
    { t: "Modelos em camadas", txt: "<p>O modelo <b>OSI</b> tem sete camadas: física, enlace, rede, transporte, sessão, apresentação e aplicação. O <b>TCP/IP</b> as condensa em quatro (acesso à rede, internet, transporte e aplicação). Cada camada presta serviço à de cima e usa a de baixo.</p>", pontos: ["<b>Física</b>: bits no meio (cabos, sinais). <b>Enlace</b>: quadros e endereço MAC; switch e bridge.", "<b>Rede</b>: pacotes e endereço IP; roteador. <b>Transporte</b>: segmentos, portas; TCP e UDP.", "<b>Aplicação</b>: HTTP, DNS, DHCP, SMTP, FTP, SSH.", "Encapsulamento: cada camada adiciona seu cabeçalho aos dados da camada superior."], pense: "Em que camada o switch trabalha? E o roteador?" },
    { t: "Endereçamento e transporte", txt: "<p>O IPv4 usa 32 bits (ex.: 192.168.1.10) e o IPv6 usa 128 bits. A <b>máscara</b> separa a parte da rede da parte do host; o <b>gateway</b> é a saída para outras redes. A notação CIDR escreve a máscara como /24, /26 etc.</p>", pontos: ["Em uma rede /24, há 256 endereços e 254 hosts úteis (descontam-se rede e broadcast).", "Faixas privadas: 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16. O <b>NAT</b> traduz endereços privados em públicos.", "<b>TCP</b>: orientado à conexão, confiável, controla fluxo e congestionamento. <b>UDP</b>: sem conexão, leve, sem garantia; bom para voz, vídeo e DNS.", "<b>DNS</b> traduz nomes em IPs; <b>DHCP</b> entrega configuração IP automaticamente."], pense: "Quantos hosts úteis tem uma rede /26?" },
    { t: "Dispositivos, roteamento e acesso", txt: "<p>O <b>hub</b> repete sinal a todos; o <b>switch</b> encaminha quadros pelo MAC; o <b>roteador</b> conecta redes diferentes por IP; o <b>access point</b> estende a rede por Wi-Fi. <b>VLANs</b> segmentam logicamente uma rede de camada 2.</p>", pontos: ["Roteamento estático é configurado à mão; o dinâmico usa protocolos como <b>OSPF</b> (interno) e <b>BGP</b> (entre sistemas autônomos, na internet).", "<b>VLAN</b> isola domínios de broadcast; o tráfego entre VLANs passa por um roteador ou switch de camada 3.", "<b>Wi-Fi</b> (IEEE 802.11): WPA3 é o padrão de segurança mais atual.", "<b>VPN</b> cria um túnel cifrado sobre a internet entre locais ou usuários."] }
  ],
  visuais: [
    { tipo: "camadas", id: "v3-osi", titulo: "Modelo OSI", forma: "pilha", h: 420, instr: "Da aplicação até a física. Clique em cada camada.",
      camadas: [{ t: "7 · Aplicação", d: "Serviços ao usuário e à aplicação.", ex: "HTTP, DNS, SMTP, FTP" }, { t: "6 · Apresentação", d: "Formato, compressão e criptografia dos dados.", ex: "TLS, JPEG, ASCII" }, { t: "5 · Sessão", d: "Abre, mantém e encerra diálogos.", ex: "controle de sessão" }, { t: "4 · Transporte", d: "Comunicação fim a fim, portas, confiabilidade.", ex: "TCP, UDP" }, { t: "3 · Rede", d: "Endereçamento lógico e roteamento.", ex: "IP, ICMP, roteador" }, { t: "2 · Enlace", d: "Quadros, endereço MAC e acesso ao meio.", ex: "Ethernet, switch" }, { t: "1 · Física", d: "Transmissão de bits no meio físico.", ex: "cabo, fibra, rádio" }] },
    { tipo: "rede", id: "v3-casa", titulo: "Mapa de uma rede pequena", h: 420, instr: "Clique nos dispositivos e veja o papel de cada um.",
      nos: [{ id: "i", x: 360, y: 50, t: "Internet", d: "Rede pública mundial, alcançada por meio do provedor." }, { id: "r", x: 360, y: 150, t: "Roteador", d: "Conecta a rede local à internet, faz NAT e entrega o gateway." }, { id: "s", x: 360, y: 260, t: "Switch", d: "Encaminha quadros pelo MAC dentro da rede local." }, { id: "ap", x: 110, y: 330, t: "Access point", d: "Dá acesso Wi-Fi à mesma rede." }, { id: "pc", x: 360, y: 370, t: "Computador", d: "Recebe IP do DHCP, usa DNS para resolver nomes." }, { id: "sv", x: 620, y: 330, t: "Servidor", d: "Oferece serviços: arquivos, web, impressão." }],
      liga: [["i", "r"], ["r", "s"], ["s", "ap"], ["s", "pc"], ["s", "sv"]] },
    { tipo: "linha", id: "v3-acesso", titulo: "O que acontece ao abrir um site", ordenar: true, instr: "Acompanhe a requisição e depois ordene as etapas.",
      passos: [{ t: "Resolução DNS", d: "O navegador consulta o DNS para descobrir o IP do domínio." }, { t: "Conexão TCP", d: "Handshake de três vias com o servidor (porta 443)." }, { t: "Negociação TLS", d: "Cliente e servidor combinam cifras e o servidor prova sua identidade." }, { t: "Requisição HTTP", d: "O navegador envia o GET." }, { t: "Resposta", d: "O servidor devolve código de status e conteúdo." }, { t: "Renderização", d: "O navegador monta a página." }] },
    { tipo: "classificar", id: "v3-prot", titulo: "Jogo: TCP ou UDP?", instr: "Associe o serviço ao protocolo de transporte mais típico.", cats: ["TCP", "UDP"],
      itens: [["Transferência de arquivos", 0], ["Chamada de voz em tempo real", 1], ["Navegação web (HTTP/1.1 e 2)", 0], ["Consulta DNS simples", 1], ["Envio de e-mail (SMTP)", 0], ["Streaming ao vivo tolerante a perdas", 1]] },
    { tipo: "classificar", id: "v3-camada", titulo: "Jogo: em que camada do OSI?", instr: "Classifique cada item.", cats: ["Física", "Enlace", "Rede", "Transporte", "Aplicação"],
      itens: [["Cabo de fibra óptica", 0], ["Endereço MAC", 1], ["Endereço IP", 2], ["Porta 443", 3], ["DNS", 4], ["Switch", 1], ["Roteador", 2], ["Segmento TCP", 3]] }
  ],
  fc: [
    ["Quantas camadas tem o modelo OSI e quais?", "Sete: física, enlace, rede, transporte, sessão, apresentação e aplicação."],
    ["Em que camada o switch atua?", "Enlace (camada 2), pelo endereço MAC."],
    ["Em que camada o roteador atua?", "Rede (camada 3), pelo endereço IP."],
    ["O que é encapsulamento?", "O processo em que cada camada acrescenta o seu cabeçalho aos dados recebidos da camada de cima."],
    ["O que é a <b>máscara de sub-rede</b>?", "Define quais bits do IP identificam a rede e quais identificam o host."],
    ["Quantos bits tem um endereço IPv6?", "128 bits."],
    ["Quais são as faixas de IPv4 privado?", "10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16."],
    ["O que faz o NAT?", "Traduz endereços privados em públicos (e vice-versa), permitindo compartilhar um IP público."],
    ["O que é o handshake de três vias?", "SYN, SYN-ACK, ACK: o TCP estabelece a conexão antes de enviar dados."],
    ["Para que serve o DHCP?", "Entrega automaticamente IP, máscara, gateway e DNS aos dispositivos."],
    ["Qual a diferença entre OSPF e BGP?", "OSPF é um protocolo de roteamento interno (dentro de um sistema autônomo); BGP troca rotas entre sistemas autônomos na internet."],
    ["O que uma VLAN faz?", "Segmenta logicamente uma rede, isolando domínios de broadcast."]
  ],
  vf: [
    ["O switch decide o encaminhamento principalmente pelo endereço IP.", false, "Falso. O switch (camada 2) usa o endereço MAC. Quem decide por IP é o roteador."],
    ["Em uma rede /24 existem 254 endereços utilizáveis para hosts.", true, "Verdadeiro. São 256 endereços, menos o de rede e o de broadcast."],
    ["O UDP garante a entrega e a ordem dos pacotes.", false, "Falso. Isso é do TCP. O UDP é sem conexão e sem garantia."],
    ["O DNS traduz nomes de domínio em endereços IP.", true, "Verdadeiro. Também armazena outros registros, como MX e TXT."],
    ["O endereço 172.20.5.9 é privado.", true, "Verdadeiro. Está na faixa 172.16.0.0/12 (172.16 a 172.31)."],
    ["O hub é inteligente e encaminha apenas ao destino.", false, "Falso. O hub repete o sinal a todas as portas; quem encaminha por MAC é o switch."],
    ["O gateway padrão é necessário para falar com redes diferentes da local.", true, "Verdadeiro. É para onde o host manda o tráfego destinado a outra rede."],
    ["A camada de transporte do TCP/IP é responsável pelo roteamento.", false, "Falso. O roteamento é da camada de rede (internet). O transporte cuida da comunicação fim a fim."],
    ["O BGP é o protocolo usado entre sistemas autônomos na internet.", true, "Verdadeiro. É o protocolo de roteamento entre provedores."],
    ["WPA3 é considerado mais seguro que WEP.", true, "Verdadeiro. O WEP é obsoleto e quebrável; o WPA3 é o padrão atual."],
    ["VPN cifra o tráfego criando um túnel sobre uma rede pública.", true, "Verdadeiro. Protege confidencialidade e integridade entre os extremos."],
    ["O IPv6 foi criado, entre outros motivos, pelo esgotamento de endereços IPv4.", true, "Verdadeiro. O IPv6 oferece um espaço de endereços praticamente inesgotável."]
  ],
  caderno: [
    ["Quantos hosts úteis tem a rede 192.168.10.0/26? Mostre o cálculo.", "/26 deixa 6 bits de host: 2^6 = 64 endereços, menos 2 = 62 hosts úteis. Blocos de 64: .0, .64, .128, .192."],
    ["Divida 192.168.1.0/24 em 4 sub-redes iguais.", "Emprestam-se 2 bits: máscara /26 (255.255.255.192). Sub-redes: .0/26, .64/26, .128/26 e .192/26."],
    ["Explique o que acontece desde digitar um endereço até a página aparecer.", "DNS resolve o IP; TCP abre a conexão; TLS cifra; o navegador envia o GET HTTP; o servidor responde; o navegador renderiza."],
    ["Diferencie switch, roteador e hub.", "Hub repete a todos; switch encaminha pelo MAC na rede local; roteador interliga redes por IP e define o caminho."],
    ["Para que serve o NAT e que limitação ele traz?", "Permite que vários hosts privados compartilhem um IP público. Dificulta conexões de fora para dentro e a rastreabilidade ponta a ponta."],
    ["Em que situação você escolheria UDP em vez de TCP?", "Quando a latência importa mais que a entrega perfeita: voz, vídeo em tempo real, jogos e consultas curtas como o DNS."],
    ["O que são portas e por que existem?", "Identificam o serviço de destino em um host (ex.: 80, 443, 22, 53). Permitem várias conexões simultâneas no mesmo IP."],
    ["Como VLANs melhoram segurança e desempenho?", "Separam domínios de broadcast e segmentam departamentos, reduzindo tráfego desnecessário e limitando o alcance de um incidente."],
    ["Descreva o que é um ping e que protocolo usa.", "Teste de alcance e latência com mensagens ICMP echo request e reply."],
    ["Cite três cuidados para proteger uma rede Wi-Fi corporativa.", "WPA3 ou WPA2 Enterprise, separação de rede de convidados, senhas fortes ou autenticação 802.1X, atualização do firmware e desativar WPS."]
  ],
  pbl: [
    { titulo: "A internet caiu só para alguns", cenario: "Em uma escola, o laboratório 2 está sem internet; os demais funcionam. Os computadores têm IP 169.254.x.x.",
      passos: [["O que o IP 169.254.x.x indica e como diagnosticar?", "É um endereço APIPA: o host não obteve IP do DHCP. Verificar cabo e porta do switch, VLAN, serviço DHCP e relay."], ["Como evitar a recorrência?", "Monitorar o DHCP, documentar VLANs, reservar faixas e ter redundância do serviço."]] },
    { titulo: "Planeje o endereçamento", cenario: "Uma empresa tem 3 setores: Administrativo (50 hosts), Vendas (25) e TI (10). Recebeu 10.10.0.0/24.",
      passos: [["Proponha as sub-redes.", "Administrativo /26 (62 hosts), Vendas /27 (30), TI /28 (14). Ex.: 10.10.0.0/26, 10.10.0.64/27, 10.10.0.96/28."], ["Que recomendações de segurança acrescentaria?", "VLAN por setor, ACLs entre elas, firewall e registro de logs."]] },
    { titulo: "Home office seguro", cenario: "Funcionários acessam sistemas internos de casa, por redes domésticas.",
      passos: [["Que tecnologia adotar?", "VPN com autenticação multifator, ou acesso por zero trust, com cifra ponta a ponta."], ["Que riscos persistem?", "Dispositivos pessoais desatualizados, Wi-Fi doméstico fraco, phishing. Mitigar com políticas de dispositivo e conscientização."]] }
  ],
  resumo: [
    { t: "Ideias-chave", itens: ["OSI tem 7 camadas; TCP/IP tem 4.", "Switch usa MAC (camada 2); roteador usa IP (camada 3).", "TCP é confiável; UDP é leve.", "Máscara define rede e host; /24 tem 254 hosts úteis.", "VLAN segmenta, VPN protege e NAT compartilha IP público."] },
    { t: "Erros comuns", itens: ["Esquecer de descontar rede e broadcast.", "Trocar o papel de switch e roteador.", "Achar que UDP é sempre pior que TCP."] }
  ],
  glossario: [["MAC", "Endereço físico da interface de rede."], ["IP", "Endereço lógico para roteamento."], ["Gateway", "Saída para outras redes."], ["NAT", "Tradução de endereços de rede."], ["DNS", "Sistema de nomes de domínio."], ["DHCP", "Configuração automática de IP."], ["VLAN", "Rede local virtual."], ["VPN", "Rede privada virtual por túnel cifrado."]]
});
