FSI.modulo({
 "n": 1,
 "unidade": "Capítulo 1",
 "nome": "Metodologia Top-Down",
 "titulo": "Das metas do negócio aos requisitos técnicos",
 "duracao": "8 h",
 "resumoCurto": "Top-Down × Bottom-Up: Top-Down começa pelas metas do negócio e pelos usuários; Bottom-Up começa pelos cabos e equipamentos. Em projetos complexos, Top-Down é mais seguro. Metas e restrições: Metas: o que a organização qu",
 "analogia": {
  "titulo": "O médico antes do remédio",
  "txt": "<p>O médico não receita antes de ouvir o paciente e pedir exames. O projetista de redes também: entrevista a organização (<b>metas e restrições</b>), mede a rede atual (<b>baseline</b>) e analisa quem usa o quê e quando (<b>tráfego</b>). Só então “receita” equipamentos.</p>"
 },
 "chave": [
  "<b>Top-Down × Bottom-Up:</b> Top-Down começa pelas metas do negócio e pelos usuários; Bottom-Up começa pelos cabos e equipamentos. Em projetos complexos, Top-Down é mais seguro.",
  "<b>Metas e restrições:</b> Metas: o que a organização quer alcançar. Restrições: orçamento, prazo, pessoal técnico e políticas. Juntas geram os requisitos técnicos.",
  "<b>Parâmetros de desempenho:</b> Largura de banda (capacidade), vazão (taxa real), latência (ms), jitter (variação da latência) e disponibilidade (em “noves”).",
  "<b>Baseline:</b> Raio-x da rede atual: diagramas físico e lógico, inventário de ativos e dados de desempenho. Ferramentas: Zabbix, Grafana, PRTG, Wireshark, ping, traceroute, snmpwalk.",
  "<b>Análise de tráfego:</b> Quais aplicações, quem usa, de onde para onde e em que horário. NetFlow, sFlow e J-Flow coletam os fluxos; o resultado orienta QoS ou upgrade de link.",
  "<b>Ciclo:</b> O projeto não termina na implementação: monitorar, analisar e otimizar continuamente."
 ],
 "objetivos": [
  "Comparar <b>Top-Down e Bottom-Up</b>.",
  "Transformar <b>metas e restrições</b> em requisitos.",
  "Usar <b>banda, vazão, latência, jitter e disponibilidade</b>.",
  "Fazer a <b>baseline</b> e a análise de tráfego."
 ],
 "licoes": [
  {
   "t": "Top-Down",
   "txt": "<p>Começa pelas metas do negócio e pelos usuários; o Bottom-Up começa pelos equipamentos e corre o risco de comprar o que não resolve. Restrições — orçamento, prazo, pessoal e políticas — limitam as escolhas.</p>"
  },
  {
   "t": "Parâmetros de desempenho",
   "txt": "",
   "pontos": [
    "<b>Largura de banda</b>: capacidade do enlace.",
    "<b>Vazão</b>: taxa real obtida.",
    "<b>Latência</b>: atraso em ms.",
    "<b>Jitter</b>: variação da latência — mata chamadas de voz.",
    "<b>Disponibilidade</b>: em “noves”; 99,9% = cerca de 8,8 h paradas por ano."
   ]
  },
  {
   "t": "Baseline e tráfego",
   "txt": "<p>Diagramas, inventário e medições da rede atual (Zabbix, Grafana). Fluxos de tráfego com NetFlow/sFlow: quais aplicações, quem usa, de onde para onde e em que horário.</p>"
  }
 ],
 "termos": [
  [
   "Top-Down",
   "Das metas aos equipamentos."
  ],
  [
   "Baseline",
   "Raio-x da rede atual."
  ],
  [
   "Jitter",
   "Variação da latência."
  ],
  [
   "Disponibilidade",
   "Tempo em funcionamento, em %."
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
   "tipo": "linha",
   "id": "fases",
   "titulo": "As fases do Top-Down",
   "ordenar": true,
   "passos": [
    {
     "t": "Análise de requisitos",
     "d": "Metas, restrições, baseline, tráfego."
    },
    {
     "t": "Projeto lógico",
     "d": "Topologia, endereçamento, segurança."
    },
    {
     "t": "Projeto físico",
     "d": "Cabeamento, LAN, WAN."
    },
    {
     "t": "Testes, otimização e documentação",
     "d": "Validar e registrar."
    },
    {
     "t": "Implementação e operação",
     "d": "Monitorar e melhorar."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Leo recebe pedidos de clientes. Ajude-o a transformar desejos em requisitos e a escolher o parâmetro certo.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Que parâmetro de desempenho está em jogo?",
    "cfg": {
     "id": "pd",
     "rotulo": "Queixa",
     "medidor": {
      "nome": "Clientes satisfeitos",
      "ini": 50
     },
     "itens": [
      {
       "t": "“Nas videochamadas a voz fica picotada, mas o download de arquivos está ótimo.”",
       "ops": [
        [
         "Jitter (e latência)",
         true,
         "Voz em tempo real sofre com a variação do atraso."
        ],
        [
         "Largura de banda",
         false,
         "O download vai bem."
        ],
        [
         "Disponibilidade",
         false,
         "A rede está no ar."
        ]
       ]
      },
      {
       "t": "“Contratamos 300 Mbps, mas medimos 120 Mbps no horário de pico.”",
       "ops": [
        [
         "Vazão abaixo da banda contratada",
         true,
         "Vazão é a taxa real."
        ],
        [
         "Jitter",
         false,
         "Não se fala de variação de atraso."
        ],
        [
         "Latência",
         false,
         "A queixa é de volume, não de atraso."
        ]
       ]
      },
      {
       "t": "“O sistema de vendas não pode ficar mais de 1 hora parado por ano.”",
       "ops": [
        [
         "Disponibilidade (cerca de 99,99%)",
         true,
         "Requisito de disponibilidade."
        ],
        [
         "Vazão",
         false,
         "Não é sobre taxa."
        ],
        [
         "Jitter",
         false,
         "Não é sobre voz."
        ]
       ]
      },
      {
       "t": "“O cliente quer começar comprando 40 switches iguais aos do vizinho.”",
       "ops": [
        [
         "Isso é Bottom-Up: primeiro levantar metas e tráfego",
         true,
         "Equipamento vem depois dos requisitos."
        ],
        [
         "Ótima ideia: padronizar",
         false,
         "Sem requisitos, pode não resolver."
        ],
        [
         "É Top-Down",
         false,
         "Começa pelos equipamentos."
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
    "t": "Resolva 3 queixas",
    "ev": "pd:acertos:3"
   },
   {
    "id": "m2",
    "t": "Clientes satisfeitos em 80% ou mais",
    "ev": "pd:medidor80"
   },
   {
    "id": "m3",
    "t": "Ordene as fases do Top-Down (Explorar)",
    "ev": "ord:fases"
   }
  ],
  "guiados": [
   {
    "titulo": "Quanto vale cada “nove”?",
    "txt": "<p>Um ano tem <b>8.760 horas</b>.</p>",
    "passos": [
     {
      "p": "Com 99% de disponibilidade, quantas horas de parada por ano?",
      "r": 87.6,
      "tol": 0.05,
      "un": "h",
      "dica": "1% de 8.760.",
      "expl": "87,6 h — mais de 3 dias."
     },
     {
      "p": "Com 99,9%?",
      "r": 8.76,
      "tol": 0.01,
      "un": "h",
      "dica": "0,1% de 8.760.",
      "expl": "8,76 h."
     },
     {
      "p": "Com 99,99%, quantos minutos por ano? (arredonde)",
      "r": 53,
      "tol": 1,
      "un": "min",
      "dica": "0,01% de 8.760 h × 60.",
      "expl": "≈ 52,6 min: cada nove a mais custa caro em redundância."
     }
    ]
   },
   {
    "titulo": "Banda para aulas ao vivo",
    "txt": "<p>Cada aluno assiste a uma aula em vídeo de <b>2,5 Mbps</b>. São <b>120 alunos</b> ao mesmo tempo no campus.</p>",
    "passos": [
     {
      "p": "Banda total (Mbps)?",
      "r": 300,
      "un": "Mbps",
      "dica": "120 × 2,5.",
      "expl": "300 Mbps."
     },
     {
      "p": "Com folga de 30%, quanto contratar (Mbps)?",
      "r": 390,
      "un": "Mbps",
      "dica": "300 × 1,3.",
      "expl": "390 Mbps — o plano comercial mais próximo acima."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Top-Down",
   "Projeto que começa pelas metas do negócio e pelos usuários e termina nos equipamentos."
  ],
  [
   "Bottom-Up",
   "Projeto que começa pelos cabos e equipamentos. Arriscado em redes complexas."
  ],
  [
   "Restrição",
   "Limite do projeto: orçamento, prazo, pessoal técnico, políticas."
  ],
  [
   "Largura de banda",
   "Capacidade máxima de transmissão de um link, em bps."
  ],
  [
   "Vazão (throughput)",
   "Taxa real de transferência, normalmente menor que a largura de banda."
  ],
  [
   "Latência",
   "Tempo que o pacote leva da origem ao destino, em ms."
  ],
  [
   "Jitter",
   "Variação da latência. Crítico para voz e vídeo."
  ],
  [
   "Disponibilidade",
   "Porcentagem do tempo em que a rede funciona. Ex.: 99,999% (“cinco noves”)."
  ],
  [
   "Network baseline",
   "Raio-x documentado da rede existente: topologia, configuração e desempenho."
  ],
  [
   "NetFlow / sFlow",
   "Tecnologias de roteadores e switches que coletam dados sobre os fluxos de tráfego."
  ],
  [
   "QoS",
   "Qualidade de Serviço: prioriza um tipo de tráfego (ex.: ERP) sobre outros."
  ],
  [
   "Links simétricos",
   "Mesma velocidade de download e de upload."
  ]
 ],
 "vf": [
  [
   "Na metodologia Top-Down, a escolha dos equipamentos é uma das primeiras decisões do projeto.",
   false,
   "Falso. A escolha de hardware é uma das <b>últimas</b> decisões: só acontece depois das metas, dos requisitos e da análise de tráfego."
  ],
  [
   "Orçamento, prazo e equipe técnica limitada são exemplos de restrições do projeto.",
   true,
   "Verdadeiro. As restrições moldam as soluções possíveis."
  ],
  [
   "Vazão e largura de banda são sinônimos.",
   false,
   "Falso. Largura de banda é a <b>capacidade</b> máxima; vazão é a <b>taxa real</b> alcançada, geralmente menor."
  ],
  [
   "Jitter é a variação da latência e é crítico para voz e vídeo.",
   true,
   "Verdadeiro."
  ],
  [
   "Para um backup noturno, a latência é o parâmetro mais crítico.",
   false,
   "Falso. No backup noturno o mais importante é a <b>vazão</b>, para transferir tudo dentro da janela de tempo."
  ],
  [
   "Uma disponibilidade de 99,999% é chamada de “cinco noves”.",
   true,
   "Verdadeiro."
  ],
  [
   "Como quase todo projeto é feito do zero, a caracterização da rede existente é opcional.",
   false,
   "Falso. É raro projetar do zero; a caracterização (baseline) é um passo <b>obrigatório</b>."
  ],
  [
   "Wireshark, Zabbix, Grafana e PRTG ajudam a caracterizar a rede existente.",
   true,
   "Verdadeiro, junto com ping, traceroute e snmpwalk."
  ],
  [
   "A análise de tráfego pode justificar tanto uma política de QoS quanto a contratação de um link maior.",
   true,
   "Verdadeiro. Depende de o tráfego ser legítimo para o negócio ou não."
  ],
  [
   "Se a rede está lenta, aumentar a velocidade do link sempre resolve.",
   false,
   "Falso. A causa pode ser <b>latência</b> alta ou um firewall subdimensionado; é preciso analisar vários parâmetros."
  ],
  [
   "Na Clínica Saúde Plena, a solução incluiu uma rede de visitantes com limite de banda.",
   true,
   "Verdadeiro. A VLAN de visitantes separa pacientes e celulares pessoais da rede do PEP."
  ],
  [
   "O projeto de rede termina quando a rede é implementada.",
   false,
   "Falso. O projeto é um <b>ciclo</b> contínuo de monitoramento, análise e otimização."
  ]
 ],
 "caderno": [
  [
   "Explique a diferença entre as abordagens Top-Down e Bottom-Up no projeto de redes.",
   "Top-Down começa pelo topo: objetivos do negócio e necessidades dos usuários, depois a parte lógica e só no fim a física. Bottom-Up começa pelos cabos e equipamentos. O Top-Down garante que cada decisão técnica sirva a um propósito."
  ],
  [
   "Use a analogia da casa sem planta para justificar o Top-Down.",
   "Construir sem planta leva a estrutura instável, cômodos mal distribuídos e problemas elétricos. Projetar rede sem método leva a redes lentas, inseguras e que não atendem ao usuário. O Top-Down é a planta."
  ],
  [
   "Diferencie metas de negócio e restrições, com dois exemplos de cada.",
   "Metas: objetivos estratégicos (abrir filial, suportar videoconferência HD, melhorar a internet). Restrições: limites que moldam o projeto (orçamento, prazo, falta de pessoal técnico qualificado, políticas da empresa)."
  ],
  [
   "No caso da rede varejista com Wi-Fi em 50 lojas, liste um requisito técnico derivado e duas restrições.",
   "Requisitos: até 100 usuários simultâneos por loja, captive portal para capturar dados, gerência centralizada na matriz. Restrições: até R$ 200.000, implementação em 3 meses, equipe local com pouco conhecimento (solução de fácil manutenção)."
  ],
  [
   "Defina largura de banda, vazão, latência, jitter e disponibilidade.",
   "Largura de banda: capacidade máxima do link (bps). Vazão: taxa real alcançada, geralmente menor. Latência: tempo da origem ao destino (ms). Jitter: variação da latência. Disponibilidade: porcentagem do tempo em que a rede funciona (ex.: 99,999%)."
  ],
  [
   "Explique a analogia da rodovia para os parâmetros de desempenho.",
   "Largura de banda é o número de pistas; vazão, os carros que realmente passam por hora; latência, o tempo total da viagem; jitter, a imprevisibilidade desse tempo (às vezes 30, às vezes 50 minutos)."
  ],
  [
   "Quais parâmetros definir para videoconferência HD? E para um backup noturno?",
   "Videoconferência: mínimo de 5 Mbps por usuário, latência até 150 ms, jitter até 30 ms e perda abaixo de 1%. Backup noturno: o principal é a vazão, para caber na janela de tempo; a latência importa pouco."
  ],
  [
   "O que é network baseline e por que é obrigatório?",
   "É a documentação e análise da topologia, configuração e desempenho da rede existente. É obrigatório porque raramente se projeta do zero: é preciso conhecer o ponto de partida, os problemas e as oportunidades, como o médico que pede exames antes de diagnosticar."
  ],
  [
   "Quais três grupos de documentação são coletados na caracterização da rede existente?",
   "Diagramas de rede (físico e lógico), inventário de ativos (modelos, versões, configurações) e análise de desempenho (uso médio e de pico, latência, CPU e memória dos equipamentos)."
  ],
  [
   "Para que serve a análise de tráfego e quais tecnologias coletam os fluxos?",
   "Para saber quais aplicações consomem a rede, quem usa, de onde para onde e em que horários, orientando QoS ou aumento de link. NetFlow, sFlow e J-Flow, embutidos em roteadores e switches."
  ],
  [
   "No caso da Clínica Saúde Plena, quais foram os quatro achados do diagnóstico?",
   "Meta: PEP rápido e teleconsultas estáveis, crescimento de 20%, orçamento R$ 15.000, execução fora do expediente. Rede: um roteador doméstico e todos na mesma rede Wi-Fi. Link de 50 Mbps entregando 20 Mbps no pico. Tráfego: streaming de música e backups para o Google Drive durante o dia."
  ],
  [
   "Quais foram as quatro ações da solução para a Clínica Saúde Plena?",
   "Link de fibra empresarial de 200 Mbps simétricos; firewall/roteador profissional com VLANs (administração, teleconsulta e visitantes com limite de banda); QoS priorizando PEP e teleconsultas; backups agendados após a meia-noite."
  ],
  [
   "Explique o erro “focar só na largura de banda” e como o Top-Down o evita.",
   "A empresa contrata 1 Gbps e a lentidão continua, porque o problema era latência alta ou firewall subdimensionado. Analisar vários parâmetros (latência, jitter, vazão) dá o diagnóstico certo: não adianta alargar a rodovia se o asfalto é ruim ou o pedágio é lento."
  ],
  [
   "No escritório de contabilidade, 70% da banda era UDP na porta 443 saindo de um servidor interno. Qual a causa provável e o próximo passo?",
   "UDP 443 é típico do QUIC, usado por serviços do Google. Provavelmente um cliente de sincronização em nuvem subindo arquivos no horário de trabalho. Próximo passo: acessar o servidor, ver serviços e logs e limitar a banda do software ou agendar a sincronização para a noite."
  ]
 ],
 "pbl": [
  {
   "titulo": "Aulas ao vivo para 500 alunos",
   "cenario": "Uma universidade quer transmitir aulas ao vivo em HD para 500 alunos ao mesmo tempo. Os alunos interagem por chat e enviam arquivos de até 50 MB. O orçamento é limitado, a equipe de TI é pequena e tudo precisa estar pronto antes do próximo semestre.<p><b>Problema:</b> Como aplicar o Top-Down para transformar esse desejo em metas, restrições e requisitos técnicos mensuráveis?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Quais são as metas de negócio por trás das aulas online?</li><li>Quais restrições limitam a solução?</li><li>Quanta banda 500 transmissões HD exigem (considere 4 Mbps cada)?</li><li>Como reduzir a carga no servidor central e o esforço da equipe pequena?</li></ol><p><b>Entregáveis:</b></p><ul><li>Quadro com pelo menos 3 metas, 3 restrições e 4 requisitos</li><li>Cálculo da banda necessária</li><li>Mapa Top-Down: negócio → requisitos → lógica → física</li></ul>",
     "<ul><li>Metas: expandir o alcance para outras cidades, criar nova fonte de receita, manter a qualidade de ensino.</li><li>Restrições: orçamento limitado, equipe de TI enxuta, prazo até o início do semestre.</li><li>Banda: 500 × 4 Mbps = <b>2 Gbps</b>, mais o tráfego de chat e arquivos.</li><li>Requisitos: baixa latência e jitter, uso de <b>CDN</b> para aliviar o servidor e aproximar o conteúdo, plataforma de gerência centralizada para a equipe pequena.</li></ul>"
    ]
   ]
  },
  {
   "titulo": "A internet da clínica caiu de novo",
   "cenario": "A Clínica Saúde Plena (30 funcionários) tem o prontuário eletrônico (PEP) na nuvem lento e teleconsultas que caem. Há um único roteador doméstico, todos no mesmo Wi-Fi, link de 50 Mbps que entrega 20 Mbps no pico, streaming de música nos consultórios e backups durante o dia. Orçamento: R$ 15.000; obras só fora do expediente.<p><b>Problema:</b> Quais parâmetros de desempenho definir e qual solução propor, respeitando orçamento e horário?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Quais metas e restrições a clínica tem?</li><li>Que latência, banda e jitter o PEP e a teleconsulta exigem?</li><li>O que o baseline e a análise de tráfego revelam?</li><li>Quais ações resolvem o problema sem estourar o orçamento?</li></ol><p><b>Entregáveis:</b></p><ul><li>Tabela de parâmetros por aplicação</li><li>Diagnóstico com as causas</li><li>Plano de ação com custos estimados e cronograma fora do expediente</li></ul>",
     "<ul><li>Parâmetros: PEP com latência máxima de 50 ms; teleconsulta com 2 Mbps dedicados por sessão, latência até 100 ms e jitter abaixo de 20 ms.</li><li>Causas: rede plana sem separação, roteador doméstico, vazão real baixa no pico, tráfego não essencial (streaming e backups) no horário de atendimento.</li><li>Solução: link de fibra empresarial de 200 Mbps simétricos; firewall profissional com VLANs (administração, teleconsulta, visitantes com limite de banda); QoS priorizando PEP e teleconsulta; backups após a meia-noite.</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Top-Down",
   "itens": [
    "Metas e restrições → requisitos.",
    "Banda, vazão, latência, jitter, disponibilidade.",
    "Baseline e análise de tráfego.",
    "Ciclo contínuo."
   ]
  }
 ],
 "glossario": [
  [
   "NetFlow",
   "Coleta de fluxos de tráfego."
  ],
  [
   "SLA",
   "Acordo de nível de serviço."
  ]
 ]
});
