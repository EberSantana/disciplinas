FSI.modulo({
 "n": 3,
 "unidade": "Capítulo 3",
 "nome": "Projeto da rede física",
 "titulo": "Cabeamento estruturado, LAN e WAN",
 "duracao": "8 h",
 "resumoCurto": "Cabeamento estruturado: Metodologia padronizada e hierárquica: backbone (vertical) e cabeamento horizontal até as áreas de trabalho. Normas ABNT NBR 14565 e ANSI/TIA-568. Componentes: Patch panels, tomadas de telecomunic",
 "analogia": {
  "titulo": "Encanamento do prédio",
  "txt": "<p>Um prédio bem construído tem a prumada (o cano principal) e as derivações para cada apartamento, tudo identificado. O <b>cabeamento estruturado</b> é o encanamento da rede: <b>backbone</b> vertical, cabeamento <b>horizontal</b> até as tomadas, <b>racks</b> e <b>patch panels</b> organizados — e dura de 10 a 15 anos.</p>"
 },
 "chave": [
  "<b>Cabeamento estruturado:</b> Metodologia padronizada e hierárquica: backbone (vertical) e cabeamento horizontal até as áreas de trabalho. Normas ABNT NBR 14565 e ANSI/TIA-568.",
  "<b>Componentes:</b> Patch panels, tomadas de telecomunicações, racks e patch cords, além dos cabos de par trançado e fibra.",
  "<b>LAN com fio:</b> Fast Ethernet 100 Mbps, Gigabit 1 Gbps, 10 Gigabit 10 Gbps. Comum: 1 Gbps nas estações e 10 Gbps em servidores e backbone.",
  "<b>Switches e PoE:</b> Escolha por portas, velocidade, gerenciamento e PoE, que alimenta telefones IP, câmeras e APs pelo cabo de rede.",
  "<b>WAN:</b> Link dedicado de fibra: máximo desempenho e custo. MPLS: rede privada da operadora com QoS. VPN site-to-site: ótimo custo-benefício, depende da internet.",
  "<b>Investimento:</b> Cabeamento é investimento de 10 a 15 anos. Economizar em categoria inferior sai mais caro depois."
 ],
 "objetivos": [
  "Descrever o <b>cabeamento estruturado</b> e seus componentes.",
  "Escolher tecnologias de <b>LAN</b>, switches e <b>PoE</b>.",
  "Comparar opções de <b>WAN</b>."
 ],
 "licoes": [
  {
   "t": "Cabeamento estruturado",
   "txt": "<p>Backbone, cabeamento horizontal (até 90 m + patch cords), área de trabalho, sala de equipamentos. Componentes: racks, patch panels, tomadas, patch cords. Normas ABNT NBR 14565 e TIA-568.</p>"
  },
  {
   "t": "LAN e WAN",
   "txt": "<p>1 Gbps nas estações, 10 Gbps no backbone e servidores. Switches gerenciáveis com PoE alimentam APs, câmeras e telefones. WAN: link dedicado (caro, desempenho máximo), MPLS (privado com QoS), VPN site-to-site sobre internet (barato).</p>"
  }
 ],
 "termos": [
  [
   "Backbone",
   "Cabeamento principal entre andares/salas."
  ],
  [
   "Patch panel",
   "Painel de terminação."
  ],
  [
   "PoE",
   "Energia pelo cabo de rede."
  ],
  [
   "MPLS",
   "Rede privada da operadora."
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
   "tipo": "camadas",
   "id": "est",
   "titulo": "Subsistemas do cabeamento estruturado",
   "forma": "pilha",
   "h": 340,
   "camadas": [
    {
     "t": "Entrada do prédio",
     "d": "Chegada das operadoras."
    },
    {
     "t": "Sala de equipamentos",
     "d": "Núcleo: servidores, roteadores."
    },
    {
     "t": "Backbone",
     "d": "Fibra entre andares."
    },
    {
     "t": "Armário de telecomunicações",
     "d": "Rack do andar, patch panel, switch."
    },
    {
     "t": "Cabeamento horizontal",
     "d": "Até 90 m até a tomada."
    },
    {
     "t": "Área de trabalho",
     "d": "Tomada, patch cord e PC."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Ajude Leo a escolher a WAN e a dimensionar switches e PoE.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Que ligação WAN usar?",
    "cfg": {
     "id": "wan",
     "rotulo": "Cliente",
     "medidor": {
      "nome": "Custo-benefício",
      "ini": 50
     },
     "itens": [
      {
       "t": "Filial pequena de 8 pessoas, orçamento apertado, precisa acessar o sistema da matriz.",
       "ops": [
        [
         "VPN site-to-site sobre internet",
         true,
         "Ótimo custo; segurança pelo túnel cifrado."
        ],
        [
         "Link dedicado de fibra",
         false,
         "Caro para o porte."
        ],
        [
         "MPLS com QoS",
         false,
         "Pode ser exagero aqui."
        ]
       ]
      },
      {
       "t": "Banco com 40 agências e voz/vídeo que exigem qualidade garantida.",
       "ops": [
        [
         "MPLS com QoS",
         true,
         "Rede privada da operadora com prioridade de tráfego."
        ],
        [
         "VPN sobre internet comum",
         false,
         "Sem garantia de qualidade."
        ],
        [
         "Wi-Fi público",
         false,
         "Inseguro e sem garantia."
        ]
       ]
      },
      {
       "t": "Data center que precisa de 1 Gbps simétrico e máxima disponibilidade.",
       "ops": [
        [
         "Link dedicado (com redundância)",
         true,
         "Desempenho e SLA máximos."
        ],
        [
         "Banda larga residencial",
         false,
         "Sem SLA."
        ],
        [
         "VPN sobre 4G",
         false,
         "Instável."
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
    "t": "Escolha a WAN de todos os clientes",
    "ev": "wan:fim"
   },
   {
    "id": "m2",
    "t": "Acerte todos sem erro",
    "ev": "wan:perfeito"
   },
   {
    "id": "m3",
    "t": "Explore os subsistemas do cabeamento (Explorar)",
    "ev": "vis:est"
   }
  ],
  "guiados": [
   {
    "titulo": "Orçamento de PoE",
    "txt": "<p>Um switch PoE tem orçamento de <b>370 W</b>. Serão ligados <b>8 APs de 15 W</b> e <b>12 câmeras de 12 W</b>.</p>",
    "passos": [
     {
      "p": "Consumo dos APs (W)?",
      "r": 120,
      "un": "W",
      "dica": "8 × 15.",
      "expl": "120 W."
     },
     {
      "p": "Consumo das câmeras (W)?",
      "r": 144,
      "un": "W",
      "dica": "12 × 12.",
      "expl": "144 W."
     },
     {
      "p": "Quanto sobra do orçamento PoE (W)?",
      "r": 106,
      "un": "W",
      "dica": "370 − 120 − 144.",
      "expl": "106 W de folga: atende."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Cabeamento estruturado",
   "Instalação padronizada e hierárquica de cabos num prédio ou campus."
  ],
  [
   "Backbone vertical",
   "Cabeamento principal que liga andares e salas de equipamentos. Normalmente fibra."
  ],
  [
   "Cabeamento horizontal",
   "Liga o rack do andar às tomadas das áreas de trabalho."
  ],
  [
   "ABNT NBR 14565",
   "Norma brasileira de cabeamento estruturado."
  ],
  [
   "ANSI/TIA-568",
   "Norma internacional de cabeamento estruturado."
  ],
  [
   "Patch panel",
   "Painel de conexão no rack onde chegam os cabos horizontais."
  ],
  [
   "Patch cord",
   "Cordão de manobra que liga o patch panel ao switch ou o PC à tomada."
  ],
  [
   "Rack 42U",
   "Gabinete padronizado com 42 unidades de altura para equipamentos."
  ],
  [
   "PoE",
   "Power over Ethernet: energia pelo cabo de rede para telefones IP, câmeras e APs."
  ],
  [
   "MPLS",
   "Serviço da operadora que cria rede privada com QoS entre filiais."
  ],
  [
   "VPN site-to-site",
   "Túnel criptografado que liga duas redes de escritório pela internet."
  ],
  [
   "Link de backup (failover)",
   "Segundo link, de outro provedor, que assume se o principal falhar."
  ]
 ],
 "vf": [
  [
   "O cabeamento estruturado organiza a infraestrutura em backbone e cabeamento horizontal.",
   true,
   "Verdadeiro. É uma organização hierárquica."
  ],
  [
   "A ABNT NBR 14565 é a norma brasileira de cabeamento estruturado.",
   true,
   "Verdadeiro. A referência internacional é a ANSI/TIA-568."
  ],
  [
   "O backbone entre andares costuma ser feito com cabo coaxial.",
   false,
   "Falso. O backbone entre andares e prédios costuma usar <b>fibra óptica</b>, pela velocidade, distância e imunidade a interferências."
  ],
  [
   "Patch cords são os cordões de manobra que conectam os dispositivos.",
   true,
   "Verdadeiro."
  ],
  [
   "Uma configuração comum é Gigabit nas estações e 10 Gigabit nos servidores e no backbone.",
   true,
   "Verdadeiro."
  ],
  [
   "PoE permite alimentar câmeras IP e telefones VoIP pelo cabo de rede.",
   true,
   "Verdadeiro."
  ],
  [
   "Um único roteador Wi-Fi potente no centro do escritório garante cobertura completa.",
   false,
   "Falso. Paredes, obstáculos e interferência limitam a cobertura; é preciso um <b>site survey</b> para definir quantidade e posição dos APs."
  ],
  [
   "O link dedicado de fibra é a opção de WAN mais barata.",
   false,
   "Falso. É a de <b>maior desempenho e maior custo</b>. A VPN sobre internet é a de melhor custo-benefício."
  ],
  [
   "O MPLS oferece QoS e é indicado para filiais com VoIP e videoconferência.",
   true,
   "Verdadeiro."
  ],
  [
   "A VPN sobre a internet oferece garantia de latência e de perda de pacotes.",
   false,
   "Falso. A internet pública <b>não oferece garantias</b>; o desempenho da VPN varia com ela."
  ],
  [
   "Cabeamento Cat5 limita a rede a cerca de 100 Mbps mesmo com switches Gigabit.",
   true,
   "Verdadeiro, segundo o exercício do capítulo: vira o gargalo da rede."
  ],
  [
   "Cabeamento deve ser planejado como investimento de 1 a 2 anos.",
   false,
   "Falso. O cabeamento é um investimento de longo prazo, de <b>10 a 15 anos</b>."
  ]
 ],
 "caderno": [
  [
   "Defina cabeamento estruturado e explique por que ele é hierárquico.",
   "Metodologia padronizada para instalar a infraestrutura de cabos (dados, telefonia e outras mídias) num prédio ou campus. É hierárquico porque organiza a rede em backbone (vertical), que liga salas de equipamentos, e cabeamento horizontal, que chega às áreas de trabalho."
  ],
  [
   "Explique a analogia do sistema circulatório para o cabeamento estruturado.",
   "O coração é o rack ou sala de equipamentos; as artérias principais são o backbone vertical; os vasos menores são o cabeamento horizontal; as partes do corpo são as áreas de trabalho e os dispositivos."
  ],
  [
   "Quais são as normas de cabeamento citadas e por que são importantes?",
   "ABNT NBR 14565 (Brasil) e ANSI/TIA-568 (internacional). Definem boas práticas de projeto e instalação e garantem confiabilidade e compatibilidade com vários equipamentos e aplicações."
  ],
  [
   "Liste os componentes do cabeamento estruturado além dos cabos.",
   "Patch panels (painéis de conexão), tomadas de telecomunicações nas áreas de trabalho, racks e patch cords (cordões de manobra)."
  ],
  [
   "Onde usar par trançado e onde usar fibra óptica num prédio?",
   "Par trançado (Cat6, Cat6a) no cabeamento horizontal até as mesas. Fibra no backbone vertical entre andares e entre prédios de um campus, pela distância, velocidade e imunidade a interferência."
  ],
  [
   "Quais são as velocidades Ethernet disponíveis e qual configuração é comum em escritórios?",
   "Fast Ethernet 100 Mbps, Gigabit 1 Gbps e 10 Gigabit 10 Gbps. Comum: Gigabit nas estações e 10 Gigabit para servidores e backbone."
  ],
  [
   "Quais critérios usar para escolher um switch?",
   "Número de portas, velocidade de cada porta, se precisa ser gerenciável e se deve fornecer PoE para telefones IP, câmeras e pontos de acesso."
  ],
  [
   "O que é PoE e qual vantagem ele trouxe no projeto da InovaTech?",
   "Power over Ethernet: alimentação elétrica pelo próprio cabo de rede. Na InovaTech alimentou telefones VoIP e câmeras IP, simplificando a instalação (sem tomada elétrica em cada ponto)."
  ],
  [
   "Compare link dedicado, MPLS e VPN como tecnologias de WAN.",
   "Link dedicado de fibra: conexão privada e exclusiva, maior desempenho e confiabilidade, mais caro. MPLS: rede privada virtual da operadora, alto desempenho e QoS, bom para filiais com VoIP e vídeo. VPN: túnel criptografado sobre a internet, ótimo custo-benefício, desempenho depende da internet."
  ],
  [
   "Quando a VPN sobre a internet não é a melhor escolha de WAN?",
   "Quando há aplicações críticas sensíveis a latência e perda (sistemas em tempo real, videoconferência de alta qualidade entre matriz e filial), porque a internet pública não dá garantias. Aí o MPLS pode ser necessário."
  ],
  [
   "Descreva as decisões de WAN da InovaTech.",
   "VPN de acesso remoto para os vendedores em outros estados; para a internet, dois provedores diferentes: fibra de 1 Gbps como principal e rádio de 200 Mbps como backup (failover)."
  ],
  [
   "Por que “economizar no cabeamento” é um equívoco?",
   "O cabeamento é a fundação da rede e dura de 10 a 15 anos. Categoria inferior ou instalação fora das normas trazem problemas de desempenho, diagnóstico difícil e custo muito maior para refazer depois."
  ],
  [
   "Recomende cabeamento, LAN e WAN para uma clínica de 15 funcionários com prontuário eletrônico e Wi-Fi para pacientes.",
   "Cabeamento Cat6 certificado. LAN: switches Gigabit com PoE; dois APs Wi-Fi 6, um para funcionários (WPA3) e outro em VLAN separada para pacientes, com portal cativo. WAN: fibra de 300 a 500 Mbps e VPN de acesso remoto para os médicos."
  ],
  [
   "Uma empresa com switches Gigabit e computadores novos acha a rede lenta. O cabo é Cat5, de 10 anos atrás. Qual a causa e a solução?",
   "O Cat5 é o gargalo: seu desempenho garantido é de 100 Mbps, dez vezes menos que os equipamentos. Solução: trocar todo o cabeamento horizontal por Cat6 ou Cat6a."
  ]
 ],
 "pbl": [
  {
   "titulo": "Dois andares da InovaTech",
   "cenario": "A InovaTech, software house de 50 funcionários, vai ocupar um escritório de dois andares. Usa telefones VoIP e câmeras IP, os desenvolvedores trabalham com notebooks e a equipe de vendas fica em vários estados. A empresa não pode parar se o link principal cair.<p><b>Problema:</b> Como projetar a rede física da InovaTech: cabeamento, LAN e WAN, pensando em 10 anos de uso?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Qual categoria de cabo e quantas tomadas por mesa?</li><li>Onde ficam os racks e o que liga os andares?</li><li>Quais switches e APs escolher?</li><li>Como conectar os vendedores e garantir a internet se o link principal falhar?</li></ol><p><b>Entregáveis:</b></p><ul><li>Planta simplificada com racks, backbone e pontos</li><li>Lista de equipamentos com especificação (portas, velocidade, PoE, padrão Wi-Fi)</li><li>Desenho da WAN com links principal e de backup</li></ul>",
     "<ul><li>Cabeamento <b>Cat6a</b> em todo o escritório (suporta 10 Gbps), duas tomadas por mesa, seguindo a NBR 14565.</li><li>Rack de 42U em sala climatizada no 1º andar, rack menor no 2º, ligados por <b>backbone de fibra</b>.</li><li>Switches Gigabit com <b>PoE</b> para VoIP e câmeras; APs <b>Wi-Fi 6</b> nos dois andares e rede separada para visitantes.</li><li>WAN: <b>VPN de acesso remoto</b> para vendas; fibra de 1 Gbps como principal e rádio de 200 Mbps de outro provedor como backup (failover).</li></ul>"
    ]
   ]
  },
  {
   "titulo": "Matriz em Aracaju, filial no interior",
   "cenario": "Uma rede de farmácias tem a matriz em Aracaju e três filiais no interior de Sergipe. O sistema de vendas é em tempo real e a matriz faz videoconferências diárias com os gerentes. As filiais têm orçamento pequeno e internet de qualidade variável.<p><b>Problema:</b> Qual tecnologia de WAN usar para ligar a matriz às filiais equilibrando custo, desempenho e segurança?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Quais aplicações são sensíveis a latência e perda?</li><li>Quanto custa cada opção (dedicado, MPLS, VPN) em relação às outras?</li><li>Dá para combinar tecnologias?</li><li>Que LAN cada filial precisa?</li></ol><p><b>Entregáveis:</b></p><ul><li>Tabela comparativa das três tecnologias para o caso</li><li>Diagrama da WAN proposta</li><li>Recomendação com justificativa de custo × desempenho</li></ul>",
     "<ul><li>Sensíveis: sistema de vendas em tempo real e videoconferência, que sofrem com latência e perda.</li><li>Opção equilibrada: <b>MPLS</b> para garantir QoS às aplicações críticas entre matriz e filiais; <b>VPN site-to-site</b> sobre a internet como caminho de backup mais barato.</li><li>Se o orçamento não comportar MPLS, VPN site-to-site em todas as filiais, com QoS local e link de internet de melhor qualidade na matriz, sabendo que o desempenho dependerá da internet.</li><li>LAN das filiais: switch Gigabit, cabeamento Cat6 e AP com rede separada para clientes.</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Rede física",
   "itens": [
    "Cabeamento estruturado e normas.",
    "Racks, patch panels, PoE.",
    "WAN: dedicado, MPLS, VPN."
   ]
  }
 ],
 "glossario": [
  [
   "Patch cord",
   "Cabo curto de manobra."
  ],
  [
   "Rack",
   "Gabinete padronizado de 19\"."
  ]
 ]
});
