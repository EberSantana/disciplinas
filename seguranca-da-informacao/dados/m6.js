FSI.modulo({
 "n": 6,
 "unidade": "Operação",
 "nome": "Monitoramento contínuo",
 "titulo": "Logs, alertas e IDS: segurança que não dorme",
 "duracao": "3 h",
 "resumoCurto": "Auditoria de acesso: Registrar quem acessa qual informação e quando: logs detalhados, rastreabilidade completa e conformidade auditável. Detecção de anomalias: Identificar padrões anormais de acesso: análise comportament",
 "analogia": {
  "titulo": "O porteiro com caderno",
  "txt": "<p>O porteiro anota quem entra e sai (<b>log</b>), estranha quando alguém aparece às 3 da manhã (<b>detecção de anomalia</b>), liga para o diretor na hora (<b>alerta</b>) e, no fim do mês, entrega um relatório (<b>conformidade</b>). Se o invasor rasgar o caderno, o porteiro precisa de uma cópia guardada em outro lugar.</p>"
 },
 "chave": [
  "<b>Auditoria de acesso:</b> Registrar quem acessa qual informação e quando: logs detalhados, rastreabilidade completa e conformidade auditável.",
  "<b>Detecção de anomalias:</b> Identificar padrões anormais de acesso: análise comportamental, detecção de desvios e machine learning.",
  "<b>Alertas em tempo real:</b> Notificar tentativas de acesso não autorizado: notificação imediata, resposta rápida e escalonamento automático.",
  "<b>Relatórios de conformidade:</b> Demonstrar aderência a políticas e regulamentações: relatórios periódicos e evidências para auditoria.",
  "<b>IDS:</b> Sistema de detecção de intrusão: descobre quando a rede está recebendo acessos não autorizados que indicam ação de um atacante.",
  "<b>Por que é contínuo:</b> Invasores tentam desabilitar a auditoria e apagar logs para ocultar rastros. Monitorar sempre, com logs protegidos, é o que permite perceber."
 ],
 "objetivos": [
  "Explicar <b>auditoria, detecção, alerta e relatório</b>.",
  "Descrever o papel do <b>IDS</b>.",
  "Proteger os próprios <b>logs</b>."
 ],
 "licoes": [
  {
   "t": "Os quatro pilares do monitoramento",
   "txt": "<p>Auditoria de acesso (quem, o quê, quando), detecção de anomalias (padrões fora do normal), alertas em tempo real e relatórios de conformidade. Um <b>IDS</b> examina o tráfego e avisa sobre acessos suspeitos.</p>"
  },
  {
   "t": "Por que contínuo",
   "txt": "<p>Invasores tentam desligar a auditoria e apagar logs. Guarde logs em outro servidor, com acesso restrito e horário sincronizado.</p>"
  }
 ],
 "termos": [
  [
   "Log",
   "Registro de eventos."
  ],
  [
   "IDS",
   "Detecta intrusões."
  ],
  [
   "Anomalia",
   "Comportamento fora do padrão."
  ],
  [
   "SIEM",
   "Centraliza e correlaciona logs."
  ]
 ],
 "ler": [
  [
   "Console de estudo de Segurança da Informação",
   "console-de-estudo.html"
  ],
  [
   "Detetives Digitais (investigação de casos)",
   "detetives-digitais.html"
  ]
 ],
 "visuais": [],
 "lab": {
  "intro": "Você é o analista de plantão: leia os alertas e decida.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Plantão do SOC",
    "cfg": {
     "id": "soc",
     "rotulo": "Alerta",
     "medidor": {
      "nome": "Incidentes contidos",
      "ini": 50
     },
     "itens": [
      {
       "t": "Log: 300 tentativas de login falhas na conta “admin” em 2 minutos, de um IP estrangeiro.",
       "ops": [
        [
         "Ataque de força bruta: bloquear o IP e confirmar o bloqueio da conta",
         true,
         "Padrão clássico de força bruta."
        ],
        [
         "Ignorar, foram só falhas",
         false,
         "Pode virar sucesso na próxima."
        ],
        [
         "Desligar todos os servidores",
         false,
         "Exagero: conter e investigar."
        ]
       ]
      },
      {
       "t": "A secretária acessou 2 mil fichas de alunos às 3h da manhã.",
       "ops": [
        [
         "Anomalia: investigar se a conta foi comprometida",
         true,
         "Fora do horário e do volume habitual."
        ],
        [
         "Normal, ela é dedicada",
         false,
         "Precisa de verificação."
        ],
        [
         "Apagar o log",
         false,
         "Destruiria a evidência."
        ]
       ]
      },
      {
       "t": "O serviço de logs parou de registrar há 6 horas, sem manutenção prevista.",
       "ops": [
        [
         "Possível ocultação de rastros: tratar como incidente",
         true,
         "Invasores desligam a auditoria."
        ],
        [
         "Esperar voltar sozinho",
         false,
         "Pode ser intencional."
        ],
        [
         "É normal",
         false,
         "Não é."
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
    "t": "Trate 2 alertas corretamente",
    "ev": "soc:acertos:2"
   },
   {
    "id": "m2",
    "t": "Trate todos os alertas",
    "ev": "soc:fim"
   },
   {
    "id": "m3",
    "t": "Trate todos sem erro",
    "ev": "soc:perfeito"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "Monitoramento contínuo",
   "Acompanhamento permanente dos acessos e eventos para detectar e responder rapidamente a incidentes."
  ],
  [
   "Log",
   "Registro de eventos: quem, o quê, quando, de onde e com que resultado."
  ],
  [
   "Trilha de auditoria",
   "Sequência de registros que permite reconstruir as ações realizadas sobre um recurso."
  ],
  [
   "Rastreabilidade",
   "Capacidade de identificar a origem e o responsável por cada ação."
  ],
  [
   "Anomalia",
   "Padrão de comportamento que foge da linha de base normal."
  ],
  [
   "Análise comportamental",
   "Estudo do comportamento habitual de usuários e sistemas para identificar desvios."
  ],
  [
   "IDS",
   "Sistema de Detecção de Intrusão: identifica e alerta sobre acessos não autorizados."
  ],
  [
   "IPS",
   "Sistema de Prevenção de Intrusão: detecta e também bloqueia a atividade maliciosa."
  ],
  [
   "SIEM",
   "Plataforma que centraliza, correlaciona e analisa logs de várias fontes, gerando alertas."
  ],
  [
   "Falso positivo",
   "Alerta disparado sem que haja ataque real."
  ],
  [
   "Escalonamento",
   "Encaminhar o alerta a um nível superior de resposta conforme gravidade ou tempo sem tratamento."
  ],
  [
   "Relatório de conformidade",
   "Documento periódico com evidências de aderência a políticas e regulamentações."
  ]
 ],
 "vf": [
  [
   "Um IDS tem como função principal detectar acessos não autorizados.",
   true,
   "Verdadeiro. É um controle detectivo que identifica e alerta sobre intrusões."
  ],
  [
   "Logs de acesso não são úteis para auditorias de conformidade.",
   false,
   "Falso. São justamente a evidência que comprova quem acessou o quê e quando."
  ],
  [
   "Machine learning pode ser usado para detectar desvios de comportamento.",
   true,
   "Verdadeiro. Aprende o padrão normal e sinaliza desvios."
  ],
  [
   "Um falso negativo é menos grave que um falso positivo.",
   false,
   "Falso. No falso negativo o ataque passa despercebido, o que costuma ser mais grave."
  ],
  [
   "Guardar logs apenas no próprio servidor monitorado é a prática mais segura.",
   false,
   "Falso. O invasor pode apagá-los; o ideal é enviá-los a um servidor central protegido."
  ],
  [
   "Alertas em tempo real permitem resposta rápida a incidentes.",
   true,
   "Verdadeiro. Reduzem o tempo entre a detecção e a reação."
  ],
  [
   "Firewall e IDS desempenham exatamente a mesma função.",
   false,
   "Falso. Firewall filtra e bloqueia (preventivo); IDS detecta e alerta (detectivo)."
  ],
  [
   "O monitoramento contínuo contribui para preservar a integridade das informações.",
   true,
   "Verdadeiro. Detecta modificações indevidas e identifica responsáveis."
  ],
  [
   "Um login bem-sucedido às 3h de uma conta que só trabalha em horário comercial pode ser uma anomalia.",
   true,
   "Verdadeiro. Foge da linha de base do usuário e merece investigação."
  ],
  [
   "Relatórios de conformidade só precisam ser gerados quando há um incidente.",
   false,
   "Falso. São periódicos e servem para demonstrar conformidade continuamente."
  ],
  [
   "Desabilitar a auditoria do sistema é uma técnica usada por invasores para ocultar rastros.",
   true,
   "Verdadeiro. Faz parte da etapa de ocultação de rastros na anatomia de um ataque."
  ],
  [
   "Escalonamento automático significa desligar o alerta após um tempo.",
   false,
   "Falso. Significa encaminhá-lo a um nível superior de resposta."
  ]
 ],
 "caderno": [
  [
   "Quais são os quatro componentes do monitoramento contínuo apresentados em aula?",
   "Auditoria de acesso, detecção de anomalias, alertas em tempo real e relatórios de conformidade."
  ],
  [
   "Que informações mínimas um log de acesso deve registrar?",
   "Quem (usuário/conta), o quê (recurso ou dado acessado e ação realizada), quando (data e hora sincronizadas), de onde (IP, dispositivo) e o resultado (sucesso ou falha)."
  ],
  [
   "O que é uma anomalia de acesso? Dê três exemplos.",
   "É um comportamento que foge do padrão normal. Exemplos: login às 3h da manhã de uma conta que só trabalha de dia; acesso do Brasil e da Rússia com 10 minutos de diferença; um usuário baixando 5.000 registros quando costuma consultar 20."
  ],
  [
   "Como o machine learning ajuda na detecção de anomalias?",
   "Aprende o comportamento normal (linha de base) de usuários e sistemas a partir de dados históricos e sinaliza desvios estatísticos que regras fixas não detectariam, reduzindo o trabalho manual de análise."
  ],
  [
   "O que é escalonamento automático de alertas?",
   "Quando um alerta não é tratado no tempo definido, ou tem gravidade alta, ele é automaticamente encaminhado ao nível seguinte (ex.: do técnico de plantão para o coordenador de segurança)."
  ],
  [
   "Diferencie IDS de firewall.",
   "O firewall filtra e bloqueia tráfego segundo regras (preventivo). O IDS analisa o tráfego ou os eventos e alerta sobre atividade suspeita (detectivo). Um IPS é um IDS que também bloqueia."
  ],
  [
   "Por que os invasores tentam apagar ou desabilitar logs? Como se proteger?",
   "Para ocultar rastros e evitar a detecção (etapa de ocultação na anatomia do ataque). Proteção: enviar logs em tempo real a um servidor central separado (syslog/SIEM), com acesso restrito, integridade por hash e alerta quando a auditoria é desligada."
  ],
  [
   "Para que servem os relatórios de conformidade?",
   "Para demonstrar, com evidências, que a organização cumpre políticas internas, normas (ISO 27001) e leis (LGPD) em auditorias internas e externas, e para acompanhar indicadores ao longo do tempo."
  ],
  [
   "O que são falso positivo e falso negativo em monitoramento?",
   "Falso positivo: o sistema alerta, mas não havia ataque (gera ruído e cansaço de alertas). Falso negativo: havia ataque e o sistema não alertou (mais perigoso)."
  ],
  [
   "Explique a relação entre monitoramento contínuo e o pilar de integridade.",
   "Monitorar modificações e manter trilhas de auditoria permite detectar alterações não autorizadas e identificar o responsável, preservando e comprovando a integridade dos dados."
  ],
  [
   "Cite duas ferramentas ou tipos de solução usadas no monitoramento.",
   "SIEM (ex.: Wazuh, Splunk) para centralizar e correlacionar logs; IDS/IPS (ex.: Snort, Suricata); monitoramento de disponibilidade (Zabbix, Nagios)."
  ],
  [
   "Proponha três alertas em tempo real para o sistema acadêmico de um campus.",
   "(1) 5 ou mais tentativas de login falhas na mesma conta em 5 minutos; (2) alteração de nota após fechamento do diário; (3) exportação em massa de dados de alunos ou login de país incomum."
  ]
 ],
 "pbl": [
  {
   "titulo": "A madrugada do servidor",
   "cenario": "Os logs do servidor de e-mail do campus mostram: 1.200 tentativas de login falhas entre 2h e 3h, vindas de 40 IPs diferentes, e um login bem-sucedido na conta do diretor às 3h07, seguido do envio de 800 e-mails.",
   "passos": [
    [
     "<ol><li>Interprete os eventos em ordem.</li><li>Que alertas deveriam ter disparado e quando?</li><li>Monte um plano de resposta para as próximas 24h.</li></ol>",
     "Interpretação: ataque de força bruta distribuído (password spraying), sucesso na conta do diretor e uso para spam/phishing. Alertas: após N falhas por minuto; login de IP incomum em horário atípico; envio em massa. Resposta: bloquear a conta e trocar a senha, encerrar sessões, bloquear os IPs, avisar os destinatários sobre o phishing, verificar regras de encaminhamento criadas pelo invasor, ativar 2FA, preservar logs e registrar o incidente."
    ]
   ]
  },
  {
   "titulo": "Painel de monitoramento do campus",
   "cenario": "Sua equipe deve propor um painel (dashboard) de monitoramento para a TI do campus.",
   "passos": [
    [
     "<ol><li>Escolha 6 indicadores.</li><li>Defina para cada um o limite que gera alerta.</li><li>Defina quem recebe cada alerta e o escalonamento.</li></ol>",
     "Exemplos: logins falhos por minuto (>20 → alerta); disponibilidade do sistema acadêmico (<99% no dia); uso de disco dos servidores (>85%); backups que falharam (qualquer); tráfego de saída anômalo (>3x a média); contas administrativas criadas (qualquer). Destinatários: técnico de plantão, depois coordenador de TI após 30 min sem tratamento, e direção em incidentes críticos. Avalie coerência entre indicador, limite e responsável."
    ]
   ]
  },
  {
   "titulo": "Quem apagou o arquivo?",
   "cenario": "Um arquivo de projeto sumiu da pasta compartilhada. Não havia auditoria habilitada. Três pessoas tinham acesso de escrita.",
   "passos": [
    [
     "<ol><li>Por que não é possível saber o responsável?</li><li>Que configuração de auditoria você habilitaria?</li><li>Como evitar que isso volte a acontecer?</li></ol>",
     "Sem trilha de auditoria não há rastreabilidade nem não-repúdio. Habilitar auditoria de acesso a objetos (no Windows, política de auditoria em arquivos, eventos 4663/4660; no Linux, auditd) registrando exclusão e modificação. Prevenção: versionamento ou lixeira de rede, backup diário, permissões mínimas (quem precisa só ler não escreve) e envio dos logs para servidor central."
    ]
   ]
  },
  {
   "titulo": "Falsos alarmes demais",
   "cenario": "O IDS do campus gera 3.000 alertas por dia, e a equipe (2 técnicos) passou a ignorá-los. Um ataque real passou despercebido.",
   "passos": [
    [
     "<ol><li>Explique o problema de “fadiga de alertas”.</li><li>Proponha como reduzir falsos positivos.</li><li>Como priorizar os alertas restantes?</li></ol>",
     "Fadiga de alertas: excesso de falsos positivos faz a equipe ignorar tudo, gerando falsos negativos na prática. Redução: ajustar (tunar) regras ao ambiente, criar exceções para tráfego legítimo conhecido, correlacionar eventos num SIEM, desabilitar assinaturas irrelevantes. Priorização: classificar por severidade e criticidade do ativo, tratar primeiro alertas em servidores críticos e contas privilegiadas, e automatizar respostas simples."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Monitoramento",
   "itens": [
    "Auditoria, detecção, alerta, relatório.",
    "IDS e SIEM.",
    "Logs protegidos e fora do servidor monitorado."
   ]
  }
 ],
 "glossario": [
  [
   "SOC",
   "Centro de operações de segurança."
  ]
 ]
});
