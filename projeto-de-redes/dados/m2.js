FSI.modulo({
 "n": 2,
 "unidade": "Capítulo 2",
 "nome": "Projeto da rede lógica",
 "titulo": "Topologia, redundância, segmentação e endereçamento",
 "duracao": "8 h",
 "resumoCurto": "Topologias: Estrela: ponto central, falha dele para tudo. Malha: vários caminhos, alta confiabilidade. Barramento: um cabo compartilhado, falha nele derruba tudo. Redundância: Balanceamento de carga distribui acessos ent",
 "analogia": {
  "titulo": "O mapa da cidade",
  "txt": "<p>Antes de asfaltar, a prefeitura desenha o mapa: bairros (<b>VLANs</b>), avenidas principais e desvios (<b>redundância</b>), a área de visitantes separada (<b>DMZ</b>), túneis entre cidades (<b>VPN</b>) e a numeração das casas (<b>endereçamento IP</b>). Esse mapa é o projeto lógico.</p>"
 },
 "chave": [
  "<b>Topologias:</b> Estrela: ponto central, falha dele para tudo. Malha: vários caminhos, alta confiabilidade. Barramento: um cabo compartilhado, falha nele derruba tudo.",
  "<b>Redundância:</b> Balanceamento de carga distribui acessos entre servidores. Caminho de backup assume quando o principal falha (ex.: dois links).",
  "<b>Multihoming e NAT:</b> Multihoming: mais de um provedor ao mesmo tempo. NAT: vários dispositivos privados compartilham um IP público.",
  "<b>DMZ, VLAN e VPN:</b> DMZ isola servidores públicos da rede interna. VLAN divide uma rede física em redes lógicas. VPN cria túnel criptografado pela internet.",
  "<b>Endereços e nomes:</b> Plano IP com espaço para crescer (ex.: <code>10.10.0.0/16</code>) e nomes padronizados como <code>BR-SP-FIN-SRV01</code>.",
  "<b>Protocolos:</b> STP evita loops na camada 2. OSPF calcula as melhores rotas dentro da empresa. BGP escolhe caminhos entre provedores, por políticas."
 ],
 "objetivos": [
  "Escolher <b>topologias</b> e prever <b>redundância</b>.",
  "Aplicar <b>NAT, DMZ, VLAN e VPN</b>.",
  "Montar um <b>plano de endereçamento</b>.",
  "Reconhecer <b>STP, OSPF e BGP</b>."
 ],
 "licoes": [
  {
   "t": "Topologia e redundância",
   "txt": "<p>Estrela: simples, mas o centro é ponto único de falha. Malha: vários caminhos. Projetos hierárquicos usam núcleo, distribuição e acesso, com links e equipamentos redundantes, balanceamento e caminhos de backup.</p>"
  },
  {
   "t": "Segmentação e serviços",
   "txt": "<p><b>VLAN</b> separa setores no mesmo switch; <b>DMZ</b> isola servidores públicos; <b>VPN</b> cria túnel cifrado; <b>NAT</b> compartilha um IP público; <b>multihoming</b> usa dois provedores.</p>"
  },
  {
   "t": "Endereços, nomes e protocolos",
   "txt": "<p>Plano IP com folga (10.10.0.0/16 dividido por setor), nomes padronizados (BR-SE-ADM-SW01). STP evita loops; OSPF roteia dentro da empresa; BGP entre provedores.</p>"
  }
 ],
 "termos": [
  [
   "VLAN",
   "Rede lógica dentro do switch."
  ],
  [
   "DMZ",
   "Zona isolada para servidores públicos."
  ],
  [
   "NAT",
   "Traduz privado ↔ público."
  ],
  [
   "STP",
   "Evita loops na camada 2."
  ]
 ],
 "ler": [
  [
   "Atividades com ranking de Projeto de Redes",
   "atividades.html"
  ]
 ],
 "visuais": [
  {
   "tipo": "rede",
   "id": "zonas",
   "titulo": "Zonas de uma rede escolar",
   "h": 380,
   "nos": [
    {
     "id": "int",
     "x": 360,
     "y": 50,
     "t": "Internet",
     "d": "Dois provedores (multihoming)."
    },
    {
     "id": "fw",
     "x": 360,
     "y": 160,
     "t": "Firewall\n+ NAT",
     "d": "Filtra e traduz endereços."
    },
    {
     "id": "dmz",
     "x": 130,
     "y": 270,
     "t": "DMZ",
     "d": "Site e e-mail da escola: acessíveis de fora, isolados da rede interna."
    },
    {
     "id": "adm",
     "x": 360,
     "y": 300,
     "t": "VLAN 10\nAdministrativo",
     "d": "Secretaria e direção."
    },
    {
     "id": "lab",
     "x": 590,
     "y": 270,
     "t": "VLAN 20\nLaboratórios",
     "d": "Alunos, sem acesso ao administrativo."
    },
    {
     "id": "vpn",
     "x": 590,
     "y": 70,
     "t": "VPN",
     "d": "Professores acessam o sistema de casa por túnel cifrado."
    }
   ],
   "liga": [
    [
     "int",
     "fw"
    ],
    [
     "fw",
     "dmz"
    ],
    [
     "fw",
     "adm"
    ],
    [
     "fw",
     "lab"
    ],
    [
     "int",
     "vpn"
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Escolha o recurso lógico certo para cada necessidade e planeje os endereços de cada setor.",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-rec",
    "titulo": "Qual recurso resolve?",
    "cats": [
     "VLAN",
     "DMZ",
     "VPN",
     "NAT"
    ],
    "itens": [
     [
      "Separar a rede dos alunos da secretaria no mesmo switch",
      0
     ],
     [
      "Isolar o servidor do site que é acessado da internet",
      1
     ],
     [
      "Professor acessa o sistema de casa com segurança",
      2
     ],
     [
      "200 PCs saem para a internet com um IP público",
      3
     ],
     [
      "Filial liga-se à matriz pela internet de forma cifrada",
      2
     ],
     [
      "Câmeras em rede separada dos computadores",
      0
     ]
    ]
   },
   {
    "tipo": "ipv4",
    "titulo": "Planejando os endereços dos setores",
    "cfg": {
     "id": "pl",
     "ip": "10.10.20.0",
     "pre": 24,
     "desafios": [
      {
       "ip": "10.10.0.0",
       "pre": 23,
       "campo": "hosts",
       "dica": "2⁹ − 2."
      },
      {
       "ip": "10.10.40.0",
       "pre": 25,
       "campo": "bc",
       "dica": "Blocos de 128."
      },
      {
       "ip": "10.10.40.200",
       "pre": 26,
       "campo": "rede",
       "dica": "Blocos de 64."
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Associe os recursos sem erros",
    "ev": "vis:lab-rec"
   },
   {
    "id": "m2",
    "t": "Resolva os 3 desafios de endereçamento",
    "ev": "pl:todos"
   },
   {
    "id": "m3",
    "t": "Explore as zonas da rede (Explorar)",
    "ev": "vis:zonas"
   }
  ],
  "guiados": [
   {
    "titulo": "Quantos hosts cabem?",
    "txt": "<p>O setor de laboratórios precisa de <b>180 endereços</b>.</p>",
    "passos": [
     {
      "p": "Um /24 tem quantos hosts utilizáveis?",
      "r": 254,
      "dica": "2⁸ − 2.",
      "expl": "254: atende os 180 com folga."
     },
     {
      "p": "Um /25 tem quantos?",
      "r": 126,
      "dica": "2⁷ − 2.",
      "expl": "126: não atende."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Topologia em estrela",
   "Todos ligados a um ponto central. Se o centro falha, a rede para."
  ],
  [
   "Topologia em malha",
   "Cada nó ligado a vários outros. Múltiplos caminhos, alta confiabilidade."
  ],
  [
   "Balanceamento de carga",
   "Distribui o tráfego entre vários servidores para evitar sobrecarga."
  ],
  [
   "Failover",
   "Passagem automática para o caminho ou equipamento de backup quando o principal falha."
  ],
  [
   "Multihoming",
   "Rede ligada a mais de um provedor de internet ao mesmo tempo."
  ],
  [
   "NAT",
   "Vários dispositivos privados saem para a internet com um único IP público."
  ],
  [
   "DMZ",
   "Sub-rede isolada para servidores públicos, separada da rede interna."
  ],
  [
   "VLAN",
   "Rede lógica independente criada dentro de uma rede física."
  ],
  [
   "VPN",
   "Túnel criptografado sobre a internet para acessar uma rede privada."
  ],
  [
   "STP",
   "Spanning Tree Protocol: bloqueia caminhos redundantes para evitar loops na camada 2."
  ],
  [
   "OSPF",
   "Protocolo de roteamento interno que calcula o caminho mais curto."
  ],
  [
   "BGP",
   "Protocolo de roteamento entre provedores, baseado em políticas."
  ]
 ],
 "vf": [
  [
   "Na topologia em estrela, a falha do ponto central paralisa toda a rede.",
   true,
   "Verdadeiro. É o ponto único de falha dessa topologia."
  ],
  [
   "A topologia em barramento é a mais indicada para ambientes críticos, como aeroportos.",
   false,
   "Falso. Ambientes críticos usam <b>malha</b>, que oferece vários caminhos. No barramento, uma falha no cabo derruba tudo."
  ],
  [
   "O balanceamento de carga distribui acessos entre vários servidores.",
   true,
   "Verdadeiro. Evita que um único servidor fique sobrecarregado."
  ],
  [
   "Multihoming significa usar várias VLANs dentro do mesmo switch.",
   false,
   "Falso. Multihoming é ligar a rede a <b>mais de um provedor</b> de internet."
  ],
  [
   "O NAT permite que vários dispositivos com IP privado compartilhem um único IP público.",
   true,
   "Verdadeiro."
  ],
  [
   "Servidores internos podem ser expostos com segurança à internet por simples redirecionamento de porta.",
   false,
   "Falso. Isso é um risco enorme; o correto é colocar os servidores públicos numa <b>DMZ</b>."
  ],
  [
   "Uma VLAN divide uma rede física em várias redes lógicas isoladas.",
   true,
   "Verdadeiro. É como usar biombos para dividir um salão."
  ],
  [
   "Uma VPN dispensa criptografia porque usa um cabo exclusivo entre os escritórios.",
   false,
   "Falso. A VPN roda <b>sobre a internet pública</b> e depende de criptografia para formar o túnel seguro."
  ],
  [
   "O STP evita que quadros fiquem circulando em loop em redes com caminhos redundantes.",
   true,
   "Verdadeiro. Ele bloqueia temporariamente uma das rotas."
  ],
  [
   "O OSPF é o protocolo usado entre grandes provedores da internet.",
   false,
   "Falso. Entre provedores usa-se o <b>BGP</b>. O OSPF é usado <b>dentro</b> da rede da empresa."
  ],
  [
   "Uma rede “plana”, sem VLANs, é mais segura porque é mais simples.",
   false,
   "Falso. A rede plana gera <b>insegurança</b> e baixo desempenho; a correção é segmentar com VLANs."
  ],
  [
   "Uma nomenclatura padronizada facilita a gerência da rede.",
   true,
   "Verdadeiro. O nome já revela local, setor e função do equipamento."
  ]
 ],
 "caderno": [
  [
   "O que é topologia de rede e quais são suas duas dimensões?",
   "É o mapa de como os nós estão conectados. Tem a dimensão física (cabos) e a lógica (fluxo de dados)."
  ],
  [
   "Compare estrela, malha e barramento quanto ao ponto de falha.",
   "Estrela: falha num dispositivo não afeta os outros, mas a falha do ponto central paralisa a rede. Malha: múltiplos caminhos, alta confiabilidade, usada em ambientes críticos como aeroportos. Barramento: um cabo compartilhado; se ele falhar, a rede toda cai."
  ],
  [
   "Diferencie balanceamento de carga e caminho de backup, com um exemplo de cada.",
   "Balanceamento distribui o tráfego entre vários servidores para evitar sobrecarga (e-commerce na Black Friday). Caminho de backup é uma rota alternativa que assume se a principal falhar (segundo link de internet)."
  ],
  [
   "O que é multihoming e qual a analogia usada?",
   "Conectar a rede a mais de um provedor ao mesmo tempo, para redundância e otimização. É como ter duas portas de casa dando para ruas diferentes."
  ],
  [
   "Explique o NAT com a analogia do recepcionista.",
   "O NAT permite que vários dispositivos privados compartilhem um único IP público. Para fora, toda a correspondência vai para o endereço do prédio (IP público); o recepcionista (roteador) sabe para qual sala (dispositivo) entregar."
  ],
  [
   "O que é uma DMZ e por que usar uma em vez de redirecionar uma porta para um servidor interno?",
   "É uma sub-rede isolada que hospeda servidores públicos (como o site), separada da rede interna. Redirecionar porta para um servidor interno expõe a rede interna; na DMZ, um invasor que comprometa o servidor público não chega direto aos escritórios."
  ],
  [
   "O que é uma VLAN e quais dois benefícios ela traz?",
   "Uma rede local virtual que segmenta uma rede física em várias redes lógicas independentes. Benefícios: segurança (isolamento) e organização (e melhor desempenho, por reduzir o tráfego desnecessário)."
  ],
  [
   "Para que serve uma VPN e qual a analogia do carro-forte?",
   "Cria um túnel seguro e criptografado sobre a internet pública para acessar uma rede privada. É como mandar um cartão-postal num cofre lacrado dentro de um carro-forte: mesmo interceptado, ninguém lê."
  ],
  [
   "Interprete o nome <code>BR-SP-FIN-SRV01</code> e explique a vantagem de uma nomenclatura padronizada.",
   "Brasil, São Paulo, Financeiro, Servidor 01. Um nome padronizado revela na hora localização, departamento e função, o que facilita a gerência, bem mais do que lembrar um IP."
  ],
  [
   "O que é defesa em camadas? Dê quatro exemplos de barreiras.",
   "Usar várias barreiras de segurança combinadas: firewall no perímetro, VLANs para segmentar, antivírus nos dispositivos e autenticação de dois fatores."
  ],
  [
   "Qual a diferença entre protocolos de comutação e de roteamento?",
   "Comutação atua dentro da mesma rede local (camada 2), como o carteiro no bairro. Roteamento encontra o melhor caminho entre redes diferentes (camada 3), como o centro de distribuição entre cidades."
  ],
  [
   "Qual problema o STP resolve e como?",
   "Em redes com caminhos redundantes na camada 2, os quadros podem circular em loop infinito (tempestade de broadcast). O STP bloqueia temporariamente uma das rotas; se a principal falhar, desbloqueia a de backup."
  ],
  [
   "Compare OSPF e BGP.",
   "OSPF é o “GPS interno” da empresa: calcula a rota mais rápida dentro da própria rede; os roteadores trocam seus mapas e calculam juntos. BGP é o protocolo da internet: escolhe caminhos entre grandes redes (provedores) com base em políticas e acordos."
  ],
  [
   "Descreva a solução lógica da startup de 50 funcionários em dois andares com site próprio.",
   "Topologia em estrela (roteador principal e switch por andar); endereçamento <code>10.10.0.0/16</code> para crescer; VLANs por departamento (Engenharia, Vendas, Administração); site na DMZ; dois provedores (multihoming) com BGP; VPN para home office."
  ]
 ],
 "pbl": [
  {
   "titulo": "A nova sede da ConectaTudo",
   "cenario": "A ConectaTudo, startup de 50 funcionários, vai ocupar dois andares com Engenharia, Vendas e Administração. Ela hospeda o próprio site, tem vendedores em home office e não pode ficar fora do ar se um provedor falhar.<p><b>Problema:</b> Como desenhar a rede lógica da nova sede: topologia, segmentação, endereçamento, redundância e acesso remoto?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Qual topologia usar e onde ficam os switches?</li><li>Quantas VLANs criar e qual plano de IPs deixa espaço para crescer?</li><li>Onde colocar o servidor do site?</li><li>Como manter a empresa online se um provedor cair?</li><li>Como os vendedores remotos entram na rede com segurança?</li></ol><p><b>Entregáveis:</b></p><ul><li>Diagrama lógico com VLANs, DMZ e links</li><li>Plano de endereçamento por VLAN</li><li>Padrão de nomes para os equipamentos</li><li>Justificativa de cada protocolo escolhido (STP, OSPF, BGP)</li></ul>",
     "<ul><li>Topologia em estrela: roteador/firewall principal e um switch por andar; links redundantes entre switches protegidos pelo <b>STP</b>.</li><li>VLANs: Engenharia, Vendas, Administração e Visitantes; bloco <code>10.10.0.0/16</code> dividido por VLAN (ex.: <code>10.10.10.0/24</code>, <code>10.10.20.0/24</code>…).</li><li>Servidor do site na <b>DMZ</b>, separado da rede interna.</li><li>Dois provedores (<b>multihoming</b>) com <b>BGP</b> para balancear e ter caminho de backup; <b>OSPF</b> internamente.</li><li><b>VPN</b> de acesso remoto para os vendedores; nomes como <code>BR-SE-ENG-SW01</code>.</li></ul>"
    ]
   ]
  },
  {
   "titulo": "Três redes numa clínica",
   "cenario": "Uma clínica médica usa uma única rede para os computadores da recepção, os prontuários dos médicos e o Wi-Fi dos pacientes. Um contador acessa arquivos da clínica de casa, e a loja online de produtos da clínica caiu na última promoção por excesso de acessos.<p><b>Problema:</b> Quais conceitos da rede lógica resolvem os três problemas: dados expostos, acesso remoto inseguro e site que cai?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Qual o risco de pacientes na mesma rede dos prontuários?</li><li>Como o contador acessa os arquivos com segurança?</li><li>Como evitar que a loja caia no pico de acessos?</li><li>Onde entram DMZ e NAT nesse desenho?</li></ol><p><b>Entregáveis:</b></p><ul><li>Diagrama antes e depois</li><li>Tabela problema → conceito → solução</li><li>Parágrafo explicando a solução para a dona da clínica, sem jargão</li></ul>",
     "<ul><li>Dados expostos: criar <b>três VLANs</b> isoladas (administração, médicos e visitantes/Wi-Fi).</li><li>Acesso remoto: <b>VPN</b>, o túnel criptografado que funciona como carro-forte para os dados.</li><li>Site que cai: <b>balanceador de carga</b> distribuindo os acessos entre vários servidores, com escalabilidade horizontal no pico.</li><li>A loja fica na <b>DMZ</b>; o <b>NAT</b> permite que toda a rede interna saia com um IP público.</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Rede lógica",
   "itens": [
    "Topologias e redundância.",
    "VLAN, DMZ, VPN, NAT, multihoming.",
    "Plano de endereços e nomes.",
    "STP, OSPF, BGP."
   ]
  }
 ],
 "glossario": [
  [
   "OSPF",
   "Roteamento interno por estado de enlace."
  ],
  [
   "BGP",
   "Roteamento entre sistemas autônomos."
  ]
 ]
});
