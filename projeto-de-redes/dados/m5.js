FSI.modulo({
 "n": 5,
 "unidade": "Capítulo 5",
 "nome": "Teste e documentação",
 "titulo": "Ensaio geral: plano de testes, documentação e ferramentas",
 "duracao": "8 h",
 "resumoCurto": "Plano de testes: Roteiro que valida cada aspecto da rede antes da produção, como o ensaio geral de uma peça de teatro. Tipos de teste: Conectividade (ping), desempenho (iperf, Speedtest), failover (desligar o link princi",
 "analogia": {
  "titulo": "O ensaio geral",
  "txt": "<p>Nenhuma peça de teatro estreia sem ensaio geral: testa-se luz, som, figurino e a troca de cenário. O <b>plano de testes</b> é o ensaio da rede — conectividade, desempenho, failover e segurança — e a <b>documentação</b> é o roteiro que permite a qualquer técnico entender e manter a rede depois.</p>"
 },
 "chave": [
  "<b>Plano de testes:</b> Roteiro que valida cada aspecto da rede antes da produção, como o ensaio geral de uma peça de teatro.",
  "<b>Tipos de teste:</b> Conectividade (<code>ping</code>), desempenho (<code>iperf</code>, Speedtest), failover (desligar o link principal) e segurança (OpenVAS, Nmap).",
  "<b>Documentação:</b> Topologia física e lógica, planilha de IPs, backup das configurações e políticas de segurança. É a planta da casa.",
  "<b>Ferramentas:</b> Diagramas: Visio, Lucidchart, draw.io. Projetos: Jira, Trello. Monitoramento: Zabbix, SolarWinds NPM, Grafana. Inventário: NetBox.",
  "<b>Erros comuns:</b> Não ter plano formal, documentação desatualizada e testar só conectividade.",
  "<b>Regra de ouro:</b> Atualizar a documentação a cada mudança. Documentação incorreta pode ser pior do que nenhuma."
 ],
 "objetivos": [
  "Montar um <b>plano de testes</b>.",
  "Executar testes de <b>conectividade, desempenho, failover e segurança</b>.",
  "Definir o conteúdo da <b>documentação</b>."
 ],
 "licoes": [
  {
   "t": "Testes",
   "txt": "<p>Conectividade (<code>ping</code>, <code>tracert</code>), desempenho (<code>iperf</code>, Speedtest), failover (desligar o link principal e ver o backup assumir) e segurança (Nmap, OpenVAS). Registre resultado esperado e obtido.</p>"
  },
  {
   "t": "Documentação",
   "txt": "<p>Topologia física e lógica, planilha de IPs e VLANs, backup das configurações, senhas guardadas com segurança e políticas. Atualize a cada mudança: documentação errada é pior que nenhuma.</p>"
  }
 ],
 "termos": [
  [
   "Failover",
   "Troca automática para o caminho de reserva."
  ],
  [
   "iperf",
   "Mede vazão entre dois pontos."
  ],
  [
   "Nmap",
   "Varre portas e serviços."
  ],
  [
   "As-built",
   "Documentação do que foi realmente instalado."
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
  "intro": "Entregue a rede da contabilidade: ordene o plano de testes e diagnostique uma máquina no prompt.",
  "sims": [
   {
    "tipo": "linha",
    "id": "lab-plano",
    "titulo": "Plano de testes na ordem certa",
    "ordenar": true,
    "passos": [
     {
      "t": "Conectividade",
      "d": "ping e tracert entre todos os setores."
     },
     {
      "t": "Serviços",
      "d": "DNS, DHCP e impressão."
     },
     {
      "t": "Desempenho",
      "d": "iperf entre o setor e o servidor."
     },
     {
      "t": "Failover",
      "d": "Derrubar o link principal."
     },
     {
      "t": "Segurança",
      "d": "Nmap e varredura de vulnerabilidades."
     },
     {
      "t": "Documentar resultados",
      "d": "Esperado × obtido, com evidências."
     }
    ]
   },
   {
    "tipo": "cmd",
    "titulo": "Teste de aceitação: a máquina 7 da contabilidade",
    "instr": "Faça o roteiro: ipconfig, ping no gateway, ping 8.8.8.8 e ping num nome. Qual teste falha?",
    "cfg": {
     "id": "ac",
     "cenario": {
      "ip": "10.20.7.57",
      "gw": "10.20.7.1",
      "dns": "10.20.0.2",
      "falha": "dns"
     }
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Qual o resultado do teste?",
    "cfg": {
     "id": "rs",
     "rotulo": "Pergunta",
     "itens": [
      {
       "t": "Na máquina 7, o ping no gateway e em 8.8.8.8 funcionam, mas o ping em um nome falha. O que registrar?",
       "ops": [
        [
         "Falha de DNS: conferir o servidor DNS entregue pelo DHCP",
         true,
         "Conectividade ok; resolução de nomes não."
        ],
        [
         "Falha de cabo",
         false,
         "Os pings por IP funcionam."
        ],
        [
         "Tudo aprovado",
         false,
         "Um teste falhou."
        ]
       ]
      },
      {
       "t": "Depois da entrega, alguém troca o switch e não atualiza a planilha. Seis meses depois…",
       "ops": [
        [
         "A documentação envelhece e atrapalha o próximo técnico",
         true,
         "Atualizar a cada mudança é a regra de ouro."
        ],
        [
         "Não faz diferença",
         false,
         "Faz, e muita."
        ],
        [
         "A rede para",
         false,
         "Não necessariamente, mas o suporte sofre."
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
    "t": "Ordene o plano de testes",
    "ev": "ord:lab-plano"
   },
   {
    "id": "m2",
    "t": "Faça ping no gateway",
    "ev": "ac:ping-gw"
   },
   {
    "id": "m3",
    "t": "Teste a resolução de nomes",
    "ev": "ac:ping-nome"
   },
   {
    "id": "m4",
    "t": "Use o nslookup",
    "ev": "ac:nslookup"
   },
   {
    "id": "m5",
    "t": "Registre os resultados",
    "ev": "rs:fim"
   }
  ],
  "guiados": [
   {
    "titulo": "Vazão medida",
    "txt": "<p>O iperf transferiu <b>750 MB</b> em <b>10 segundos</b> (1 MB = 8 Mb).</p>",
    "passos": [
     {
      "p": "Quantos megabits foram transferidos?",
      "r": 6000,
      "un": "Mb",
      "dica": "750 × 8.",
      "expl": "6.000 Mb."
     },
     {
      "p": "Vazão em Mbps?",
      "r": 600,
      "un": "Mbps",
      "dica": "6.000 ÷ 10.",
      "expl": "600 Mbps num link de 1 Gbps: 60% de aproveitamento."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Plano de testes",
   "Documento com o que será testado, como e qual o resultado esperado."
  ],
  [
   "Teste de conectividade",
   "Verifica se um dispositivo alcança outro. Ferramenta típica: <code>ping</code>."
  ],
  [
   "iperf",
   "Ferramenta cliente-servidor que mede a largura de banda entre dois pontos."
  ],
  [
   "Teste de failover",
   "Simula a falha de um componente para validar a redundância."
  ],
  [
   "OpenVAS",
   "Ferramenta de varredura de vulnerabilidades."
  ],
  [
   "Planilha de IPs",
   "Registro de cada dispositivo com nome e endereço IP."
  ],
  [
   "Backup de configuração",
   "Cópia dos arquivos de configuração para recuperação rápida."
  ],
  [
   "Microsoft Visio",
   "Padrão da indústria para diagramas de rede."
  ],
  [
   "Lucidchart",
   "Diagramas em nuvem com colaboração em tempo real."
  ],
  [
   "Zabbix",
   "Monitoramento de redes e servidores, de código aberto."
  ],
  [
   "NMS",
   "Network Management System: software de monitoramento e gerência de rede."
  ],
  [
   "Trello × Jira",
   "Trello: Kanban simples. Jira: gestão de tarefas e projetos de TI."
  ]
 ],
 "vf": [
  [
   "O plano de testes deve ser elaborado depois que a rede já está em produção.",
   false,
   "Falso. O plano é feito <b>antes</b>, e no caso do capítulo até antes de comprar os equipamentos."
  ],
  [
   "O <code>ping</code> é a ferramenta mais comum para testes de conectividade.",
   true,
   "Verdadeiro."
  ],
  [
   "O <code>iperf</code> é usado para medir a largura de banda entre dois pontos da rede.",
   true,
   "Verdadeiro, com um servidor de um lado e um cliente do outro."
  ],
  [
   "Desconectar o cabo do link principal para ver se o tráfego vai para o secundário é um teste de failover.",
   true,
   "Verdadeiro."
  ],
  [
   "Se todos os pontos respondem ao <code>ping</code>, os testes estão concluídos.",
   false,
   "Falso. Também é preciso testar <b>desempenho, segurança e redundância</b>."
  ],
  [
   "A planilha de endereçamento IP faz parte da documentação da rede.",
   true,
   "Verdadeiro."
  ],
  [
   "Uma documentação desatualizada é sempre melhor do que nenhuma documentação.",
   false,
   "Falso. Documentação <b>incorreta pode ser pior</b> que nenhuma, porque induz a erros."
  ],
  [
   "Guardar cópias das configurações acelera a recuperação quando um equipamento falha.",
   true,
   "Verdadeiro."
  ],
  [
   "O Zabbix é uma ferramenta de diagramação de redes.",
   false,
   "Falso. O Zabbix é de <b>monitoramento</b>. Diagramação é com Visio, Lucidchart ou draw.io."
  ],
  [
   "O Trello organiza as etapas do projeto em quadros Kanban.",
   true,
   "Verdadeiro."
  ],
  [
   "O OpenVAS pode ser usado para procurar falhas de segurança na rede.",
   true,
   "Verdadeiro. Foi o que se fez no cenário do escritório de contabilidade."
  ],
  [
   "As senhas dos equipamentos podem ficar anotadas no próprio diagrama impresso na parede do rack.",
   false,
   "Falso. As senhas entram na documentação, mas <b>armazenadas de forma segura</b>, nunca expostas."
  ]
 ],
 "caderno": [
  [
   "O que é a elaboração de testes num projeto de rede?",
   "O processo de planejar, criar e executar verificações para garantir que a rede atende a todos os requisitos técnicos e de negócio, da conectividade básica a simulações de carga e avaliações de segurança, antes de entrar em produção."
  ],
  [
   "Explique a analogia do ensaio geral de teatro para os testes.",
   "Antes da estreia (implantação), atores (dispositivos), cenário (infraestrutura física) e roteiro (configurações) são testados; cada cena é um caso de teste. Falhas são corrigidas no ensaio, não na frente do público."
  ],
  [
   "Como fazer um teste de conectividade? Dê um exemplo de comando.",
   "Verificar se um dispositivo se comunica com outro, geralmente com ping. Ex.: <code>ping 192.168.1.1</code> a partir de um computador para testar a comunicação com o roteador."
  ],
  [
   "Como o <code>iperf</code> é usado num teste de desempenho?",
   "Configura-se um servidor iperf num lado da rede e um cliente no outro; o teste mede a taxa de transferência máxima (largura de banda) entre os dois pontos."
  ],
  [
   "O que é um teste de failover? Dê um exemplo.",
   "Simular a falha de um componente crítico para ver se a redundância funciona. Ex.: desconectar o cabo do link principal e verificar se o tráfego passa sozinho para o link secundário."
  ],
  [
   "Por que “a rede pinga” não significa que a rede está pronta?",
   "Porque conectividade é só um aspecto. É preciso testar desempenho, segurança e redundância: uma rede que só responde ao ping pode ser lenta, insegura ou não aguentar uma falha."
  ],
  [
   "Liste os quatro conteúdos essenciais da documentação de uma rede.",
   "Topologia (diagramas físico e lógico), planilha de endereçamento IP, cópias de segurança das configurações dos dispositivos e políticas de segurança (regras de firewall, VPN, acesso)."
  ],
  [
   "Por que guardar cópias das configurações de roteadores, switches e firewalls?",
   "Para recuperar rapidamente um equipamento que falhe: basta restaurar a configuração em vez de refazê-la do zero."
  ],
  [
   "Classifique as ferramentas: Visio, Lucidchart, Jira, Trello, Zabbix e SolarWinds NPM.",
   "Diagramação: Visio (padrão da indústria) e Lucidchart (nuvem, colaborativo). Gerenciamento de projetos: Jira (tarefas de TI) e Trello (Kanban). Monitoramento: Zabbix (código aberto) e SolarWinds NPM (comercial)."
  ],
  [
   "Qual o risco de uma documentação desatualizada e como evitá-lo?",
   "Uma documentação incorreta leva a decisões erradas e pode ser pior que nenhuma. Solução: atualizar a documentação sempre que houver mudança na rede, como parte do procedimento."
  ],
  [
   "Descreva o plano de testes do escritório de contabilidade com 20 funcionários.",
   "Plano criado antes da compra: conectividade de todas as mesas, velocidade do acesso ao sistema online e segurança. Execução: ping de cada ponto ao servidor, Speedtest em vários horários e varredura de vulnerabilidades com OpenVAS."
  ],
  [
   "Quais os 3 testes mais importantes antes de entregar a rede de uma startup de 5 pessoas?",
   "1) Conectividade fim a fim entre todos os dispositivos e com a internet. 2) Desempenho e cobertura do Wi-Fi, já que startups dependem de mobilidade. 3) Segurança básica: senha forte no Wi-Fi e firewall do roteador ativo."
  ],
  [
   "Liste 5 itens da documentação da rede dessa startup.",
   "Diagrama da topologia; planilha de IPs; senhas dos equipamentos e do Wi-Fi guardadas com segurança; contatos do provedor; manual curto para os usuários (como conectar e resolver problemas comuns)."
  ],
  [
   "Escolha duas ferramentas para o diagrama da rede e justifique.",
   "Lucidchart, por ser online e colaborativo, facilitando compartilhar com a equipe. Microsoft Visio, por ser completo, conhecido no mercado e ter uma grande biblioteca de ícones de rede."
  ]
 ],
 "pbl": [
  {
   "titulo": "Entrega da rede da contabilidade",
   "cenario": "Uma empresa de contabilidade com 20 funcionários vai inaugurar escritório novo. Precisa de acesso rápido ao servidor de arquivos e ao sistema de contabilidade online, e só aceita a rede se ela for comprovadamente segura e confiável.<p><b>Problema:</b> Que plano de testes e que pacote de documentação a equipe precisa entregar para a rede ser aceita?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>O que testar, com qual ferramenta e qual resultado esperar em cada caso?</li><li>Como testar a velocidade em diferentes horários?</li><li>Como comprovar a segurança?</li><li>O que entra no pacote de documentação e onde ele fica guardado?</li></ol><p><b>Entregáveis:</b></p><ul><li>Plano de testes em tabela: teste, ferramenta, procedimento, resultado esperado, resultado obtido</li><li>Diagrama da rede</li><li>Planilha de IPs</li><li>Checklist de aceite assinado pelo cliente</li></ul>",
     "<ul><li>Conectividade: <code>ping</code> de cada ponto ao servidor, 100% de respostas.</li><li>Desempenho: Speedtest em vários horários e <code>iperf</code> entre estação e servidor de arquivos.</li><li>Segurança: varredura com <b>OpenVAS</b>, senhas fortes e acesso só para funcionários autorizados.</li><li>Failover, se houver dois links: desligar o principal e medir o tempo até o tráfego passar para o outro.</li><li>Documentação: diagrama no Lucidchart, planilha de IPs no Google Sheets (funcionário, computador, IP), configurações do roteador e do switch salvas em pasta segura do servidor, políticas de segurança.</li></ul>"
    ]
   ]
  },
  {
   "titulo": "Documentação que envelheceu",
   "cenario": "A InovaTech cresceu de 20 para 60 pessoas em um ano. O diagrama da rede é de quando a empresa tinha um andar, a planilha de IPs tem conflitos e ninguém sabe onde estão as configurações do firewall. Um técnico novo levou um dia inteiro para achar a causa de uma queda.<p><b>Problema:</b> Como reconstruir a documentação e criar uma rotina que a mantenha atualizada?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>O que precisa ser levantado de novo?</li><li>Quais ferramentas usar para diagramas, inventário, monitoramento e tarefas?</li><li>Como garantir que toda mudança atualize a documentação?</li><li>Como medir se a documentação está confiável?</li></ol><p><b>Entregáveis:</b></p><ul><li>Inventário atualizado e novo diagrama</li><li>Proposta de ferramentas com justificativa</li><li>Procedimento de mudança (quem altera, o que registra, onde)</li><li>Cartão Kanban de exemplo com uma mudança documentada</li></ul>",
     "<ul><li>Levantamento: refazer o baseline com varredura da rede (ex.: Nmap), <code>ping</code>/<code>traceroute</code> e exportação das configurações de cada equipamento.</li><li>Ferramentas: Visio ou Lucidchart para diagramas; NetBox ou planilha para inventário e IPs; Zabbix com Grafana para monitoramento; Trello ou Jira para registrar mudanças.</li><li>Procedimento: nenhuma mudança é concluída sem atualizar diagrama, planilha e backup de configuração; a tarefa no Kanban só vai para “Feito” com a documentação anexada.</li><li>Indicador: tempo para diagnosticar falhas e número de divergências encontradas em auditorias periódicas.</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Teste e documentação",
   "itens": [
    "Conectividade, desempenho, failover, segurança.",
    "Documentar esperado × obtido.",
    "Topologia, IPs, configurações, políticas.",
    "Atualizar a cada mudança."
   ]
  }
 ],
 "glossario": [
  [
   "Zabbix",
   "Monitoramento de rede."
  ],
  [
   "draw.io",
   "Ferramenta de diagramas."
  ]
 ]
});
