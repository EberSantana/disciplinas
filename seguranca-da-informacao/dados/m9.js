FSI.modulo({
 "n": 9,
 "unidade": "Defesa",
 "nome": "Segurança física, políticas e defesas",
 "titulo": "Política de segurança, firewall, proxy, IDS e TLS",
 "duracao": "5 h",
 "resumoCurto": "Segurança física: Ameaças: enchente, raios, incêndio, falhas de equipamento, acesso físico não autorizado, curto-circuito, vandalismo, furto e fatores humanos. Soluções físicas: Plano de recuperação de desastres e de con",
 "analogia": {
  "titulo": "O castelo",
  "txt": "<p>Castelos medievais tinham muralha, fosso, ponte levadiça e guardas — <b>defesa em camadas</b>. Se uma falha, a outra segura. Na rede, o <b>firewall</b> é a ponte levadiça, o <b>IDS</b> é a sentinela, o <b>TLS</b> é o mensageiro com a carta lacrada, e a <b>política de segurança</b> é o regimento que todos os moradores seguem.</p>"
 },
 "chave": [
  "<b>Segurança física:</b> Ameaças: enchente, raios, incêndio, falhas de equipamento, acesso físico não autorizado, curto-circuito, vandalismo, furto e fatores humanos.",
  "<b>Soluções físicas:</b> Plano de recuperação de desastres e de continuidade de negócios, crachás, circulação restrita, cofres e backup externo, proteção de cabos e energia.",
  "<b>Política de segurança:</b> Conjunto de normas que guia as pessoas; primeiro passo para a conscientização. Componentes: objetivo, escopo, responsabilidades, direitos e deveres, conformidade.",
  "<b>Firewall:</b> Barreira entre a rede e o computador que filtra o fluxo de dados, bloqueando conteúdo malicioso sem impedir o tráfego legítimo.",
  "<b>Proxy e IDS:</b> Proxy: intermediário entre navegador e internet (cache, filtragem de conteúdo). IDS: detecta acessos não autorizados.",
  "<b>SSL/TLS:</b> Canal criptografado entre servidor web e navegador (Netscape, 1994); cadeado e HTTPS. Hoje usa-se o TLS, sucessor do SSL."
 ],
 "objetivos": [
  "Planejar <b>segurança física</b> e continuidade.",
  "Estruturar uma <b>política de segurança</b>.",
  "Explicar <b>firewall, proxy, IDS e TLS</b>."
 ],
 "licoes": [
  {
   "t": "Física e continuidade",
   "txt": "<p>Incêndio, enchente, raio, furto: controle de acesso físico, nobreak, aterramento, backup fora do local e planos de recuperação de desastres e de continuidade de negócios.</p>"
  },
  {
   "t": "Política e tecnologias",
   "txt": "<p>A política tem objetivo, escopo, responsabilidades, regras e sanções. Tecnologias: <b>firewall</b> filtra o tráfego; <b>proxy</b> intermedeia e filtra a navegação; <b>IDS/IPS</b> detecta e bloqueia intrusões; <b>TLS</b> cria o canal cifrado (o cadeado do HTTPS).</p>"
  }
 ],
 "termos": [
  [
   "Firewall",
   "Filtra o tráfego."
  ],
  [
   "Proxy",
   "Intermediário da navegação."
  ],
  [
   "TLS",
   "Canal criptografado (HTTPS)."
  ],
  [
   "PCN",
   "Plano de continuidade de negócios."
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
 "visuais": [
  {
   "tipo": "camadas",
   "id": "camadas",
   "titulo": "Defesa em camadas",
   "forma": "pilha",
   "h": 360,
   "camadas": [
    {
     "t": "Política e pessoas",
     "d": "Regras, treinamento e conscientização."
    },
    {
     "t": "Física",
     "d": "Portas, câmeras, nobreak."
    },
    {
     "t": "Perímetro",
     "d": "Firewall, proxy."
    },
    {
     "t": "Rede",
     "d": "IDS/IPS, segmentação."
    },
    {
     "t": "Sistemas",
     "d": "Atualizações, antivírus."
    },
    {
     "t": "Dados",
     "d": "Criptografia, backup."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Escolha a defesa certa para cada problema.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Arquiteto de defesas",
    "cfg": {
     "id": "df",
     "rotulo": "Problema",
     "medidor": {
      "nome": "Proteção da escola",
      "ini": 50
     },
     "itens": [
      {
       "t": "Alunos acessam sites de apostas no laboratório.",
       "ops": [
        [
         "Proxy com filtragem de conteúdo",
         true,
         "Intermedeia e filtra a navegação."
        ],
        [
         "IDS",
         false,
         "Detecta intrusões, não filtra sites."
        ],
        [
         "Backup",
         false,
         "Não tem relação."
        ]
       ]
      },
      {
       "t": "A porta 3389 (acesso remoto) do servidor está aberta para a internet.",
       "ops": [
        [
         "Firewall bloqueando a porta",
         true,
         "Feche o que não precisa estar exposto."
        ],
        [
         "TLS",
         false,
         "Não fecha portas."
        ],
        [
         "Política de mesa limpa",
         false,
         "É controle físico."
        ]
       ]
      },
      {
       "t": "O formulário de matrícula envia dados sem cadeado no navegador.",
       "ops": [
        [
         "Ativar HTTPS (TLS)",
         true,
         "Cifra os dados em trânsito."
        ],
        [
         "Firewall",
         false,
         "Não cifra."
        ],
        [
         "Antivírus",
         false,
         "Não protege o tráfego."
        ]
       ]
      },
      {
       "t": "Ninguém sabe se pode levar o notebook da escola para casa.",
       "ops": [
        [
         "Política de segurança com regras claras",
         true,
         "Pessoas precisam de regras escritas."
        ],
        [
         "Comprar outro firewall",
         false,
         "Não resolve dúvidas de conduta."
        ],
        [
         "Proibir notebooks",
         false,
         "Exagero sem política."
        ]
       ]
      },
      {
       "t": "A sala do servidor fica destrancada e tem goteira.",
       "ops": [
        [
         "Segurança física: acesso controlado e manutenção",
         true,
         "Primeira camada."
        ],
        [
         "IDS",
         false,
         "Não protege contra água."
        ],
        [
         "Proxy",
         false,
         "Sem relação."
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
    "t": "Resolva 3 problemas",
    "ev": "df:acertos:3"
   },
   {
    "id": "m2",
    "t": "Proteção da escola em 80% ou mais",
    "ev": "df:medidor80"
   },
   {
    "id": "m3",
    "t": "Resolva todos sem erro",
    "ev": "df:perfeito"
   },
   {
    "id": "m4",
    "t": "Explore as camadas de defesa (Explorar)",
    "ev": "vis:camadas"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "Segurança física",
   "Proteção das instalações, equipamentos e pessoas contra ameaças naturais, técnicas e humanas."
  ],
  [
   "PCN",
   "Plano de Continuidade de Negócios: manter processos críticos funcionando durante e após incidentes."
  ],
  [
   "PRD",
   "Plano de Recuperação de Desastres: restaurar a infraestrutura de TI após um desastre."
  ],
  [
   "Política de segurança",
   "Conjunto de normas que guia as pessoas na realização do trabalho com segurança."
  ],
  [
   "Escopo da política",
   "Define a quem e a quais sistemas a política se aplica (toda a organização ou parte dela)."
  ],
  [
   "Conformidade",
   "Como fiscalizar a política e o que acontece com quem não a cumpre."
  ],
  [
   "Firewall",
   "Barreira que filtra o tráfego entre redes, bloqueando o malicioso e permitindo o legítimo."
  ],
  [
   "Proxy",
   "Intermediário entre o navegador e a internet: cache e filtragem de conteúdo."
  ],
  [
   "DMZ",
   "Zona desmilitarizada: rede intermediária onde ficam servidores acessíveis pela internet."
  ],
  [
   "SSL",
   "Secure Socket Layer (Netscape, 1994): canal criptografado entre servidor web e navegador."
  ],
  [
   "HTTPS",
   "HTTP sobre TLS: indicado pelo cadeado no navegador."
  ],
  [
   "BYOD",
   "Bring Your Own Device: política para uso de dispositivos pessoais na organização."
  ]
 ],
 "vf": [
  [
   "Segurança física só se preocupa com invasores humanos.",
   false,
   "Falso. Inclui também fatores naturais (enchente, raio), falhas de equipamento e curto-circuito."
  ],
  [
   "Crachás e circulação restrita em áreas críticas são soluções de segurança física.",
   true,
   "Verdadeiro. Controlam quem entra e circula nos ambientes."
  ],
  [
   "Uma política de segurança deve definir o que acontece com quem não a cumpre.",
   true,
   "Verdadeiro. É o componente de conformidade."
  ],
  [
   "O firewall impede todo o tráfego de dados para garantir a segurança.",
   false,
   "Falso. Bloqueia o tráfego malicioso sem impedir o que precisa transitar."
  ],
  [
   "O servidor proxy pode melhorar o desempenho armazenando cópias de páginas acessadas com frequência.",
   true,
   "Verdadeiro. É a função de cache."
  ],
  [
   "Um site com cadeado e HTTPS é garantidamente legítimo e confiável.",
   false,
   "Falso. O cadeado indica canal criptografado; sites de phishing também podem ter HTTPS."
  ],
  [
   "O SSL foi desenvolvido pela Netscape em 1994.",
   true,
   "Verdadeiro. Hoje foi substituído pelo TLS, mas o nome SSL ainda é usado popularmente."
  ],
  [
   "Segundo a política da aula, roteadores devem manter a comunidade SNMP public para facilitar a gerência.",
   false,
   "Falso. A política determina não usar a comunidade public."
  ],
  [
   "O Plano de Recuperação de Desastres faz parte das soluções de segurança física.",
   true,
   "Verdadeiro. Aparece entre as soluções de proteção contra desastres."
  ],
  [
   "Usar VPN é uma boa prática ao se conectar em Wi-Fi público.",
   true,
   "Verdadeiro. Criptografa o tráfego numa rede não confiável."
  ],
  [
   "O escopo da política de segurança deve obrigatoriamente abranger toda a organização.",
   false,
   "Falso. Pode abranger toda a organização ou parte dela; o exemplo da aula exclui roteadores de laboratório."
  ],
  [
   "O IDS é um meio técnico de descobrir quando uma rede está recebendo acessos não autorizados.",
   true,
   "Verdadeiro. É a definição apresentada em aula."
  ]
 ],
 "caderno": [
  [
   "Cite 6 ameaças físicas a um datacenter e uma solução para cada.",
   "Enchente: instalar fora do térreo e usar piso elevado. Raio: para-raios e aterramento. Incêndio: detecção de fumaça e supressão por gás. Falha elétrica: nobreak e gerador. Acesso não autorizado: crachá, biometria e câmeras. Furto: rack trancado e inventário."
  ],
  [
   "Diferencie Plano de Continuidade de Negócios (PCN) e Plano de Recuperação de Desastres (PRD).",
   "PCN: como a organização continua operando os processos críticos durante e após um incidente (visão de negócio). PRD: como restaurar a infraestrutura de TI (servidores, dados, rede) após um desastre (visão técnica). O PRD é parte do PCN."
  ],
  [
   "Quais são os componentes de uma política de segurança da informação?",
   "Objetivo (por que existe), Escopo (a quem e ao que se aplica), Responsabilidades (quem faz o quê), Direitos e Deveres, e Conformidade (como fiscalizar e o que acontece com quem descumpre, intencionalmente ou não)."
  ],
  [
   "Com base no exemplo da aula, escreva 4 regras de uma política de autenticação para servidores.",
   "Senhas com no mínimo 8 caracteres (hoje recomenda-se 12 ou mais); combinando letras maiúsculas, minúsculas, números e símbolos; autenticação multifator para acesso remoto; acesso apenas por usuários do setor de TI a partir da rede de TI; servidores em rede isolada da rede de usuários."
  ],
  [
   "No exemplo da política para roteadores, cite 4 configurações que devem ser desabilitadas.",
   "Broadcast IP direcionado; recepção de pacotes com endereços inválidos (RFC 1918); serviços TCP/UDP “pequenos” (echo, chargen, daytime, discard); roteamento pela fonte (source routing); serviços web no roteador; comunidade SNMP public."
  ],
  [
   "Explique o que é um firewall e de onde vem o nome.",
   "É um software ou equipamento entre a rede e o computador (ou entre redes) que filtra o tráfego segundo regras, bloqueando o que é malicioso e deixando passar o legítimo. O nome vem das portas corta-fogo dos prédios, que impedem o fogo de passar para as escadas."
  ],
  [
   "Quais as duas funções principais de um servidor proxy?",
   "Desempenho: armazena em cache as páginas mais acessadas e as entrega mais rápido. Segurança: filtra conteúdo web e softwares mal-intencionados e pode registrar e controlar o acesso."
  ],
  [
   "O que o cadeado e o HTTPS no navegador indicam? Isso garante que o site é honesto?",
   "Que a comunicação entre o navegador e o servidor está criptografada (TLS) e que o certificado corresponde ao domínio. Não garante que o site é honesto: sites de phishing também usam HTTPS. É preciso conferir o endereço."
  ],
  [
   "Crie um checklist de 5 itens antes de usar Wi-Fi público (atividade da aula).",
   "1) Confirmar o nome da rede com o estabelecimento; 2) desativar compartilhamento de arquivos; 3) usar VPN; 4) evitar transações bancárias e compras; 5) acessar só sites com HTTPS e esquecer a rede após o uso."
  ],
  [
   "O que é uma política de uso aceitável?",
   "Documento que define o que usuários podem e não podem fazer com os recursos de TI da organização (e-mail, internet, equipamentos), por exemplo, proibir instalar software sem autorização ou usar a rede para fins ilícitos."
  ],
  [
   "O que é uma política de BYOD?",
   "Bring Your Own Device: regras para uso de dispositivos pessoais (celular, notebook) na rede e nos sistemas da organização, como senha de bloqueio, antivírus, rede separada e direito de apagar dados corporativos em caso de perda."
  ],
  [
   "Por que a política de segurança é considerada o primeiro passo para a conscientização?",
   "Porque formaliza o que se espera de cada pessoa, torna as regras conhecidas e dá base para treinamentos e para cobrar conformidade. Sem política, cada um age do seu jeito."
  ]
 ],
 "pbl": [
  {
   "titulo": "A sala do servidor no depósito",
   "cenario": "O servidor do campus fica num depósito com material de limpeza, sem ar-condicionado dedicado, perto do banheiro, com uma chave que “fica na portaria”. Na última chuva forte, a água chegou à porta.",
   "passos": [
    [
     "<ol><li>Liste as ameaças físicas presentes.</li><li>Proponha soluções com custo baixo, médio e alto.</li><li>Escreva um mini-PRD de 1 página para esse servidor.</li></ol>",
     "Ameaças: inundação, vazamento hidráulico, superaquecimento, produtos químicos e inflamáveis, acesso não controlado, furto, queda de energia. Baixo custo: retirar produtos de limpeza, elevar o rack, livro de controle da chave, backup externo semanal. Médio: ar-condicionado dedicado, nobreak, fechadura com controle, sensor de água e temperatura. Alto: sala dedicada com piso elevado, supressão de incêndio e migração para nuvem ou datacenter institucional. PRD: ativos críticos, RTO/RPO, contatos, procedimento de restauração do backup, local alternativo, teste semestral."
    ]
   ]
  },
  {
   "titulo": "Escreva a política",
   "cenario": "A equipe deve escrever a Política de Uso dos Laboratórios de Informática do campus.",
   "passos": [
    [
     "<ol><li>Inclua objetivo, escopo, responsabilidades, direitos e deveres, conformidade.</li><li>Mínimo de 8 regras.</li><li>Apresente para a turma, que votará ajustes.</li></ol>",
     "Rubrica: todos os 5 componentes presentes; regras claras e verificáveis (ex.: login individual, proibido instalar software sem autorização, pendrives verificados pelo antivírus, sem alimentos, desligar ao sair, relatar incidentes à coordenação); conformidade proporcional (orientação na 1ª vez, advertência, suspensão de acesso) e distinção entre descumprimento intencional e por falta de treinamento; linguagem adequada ao público."
    ]
   ]
  },
  {
   "titulo": "Regras de firewall da escola",
   "cenario": "A rede tem: rede de alunos, rede administrativa, servidor web público e servidor do sistema acadêmico. Tudo está hoje na mesma rede.",
   "passos": [
    [
     "<ol><li>Proponha a segmentação (VLANs e DMZ).</li><li>Escreva 8 regras de firewall (origem, destino, porta, ação).</li><li>Onde entram o proxy e o IDS?</li></ol>",
     "Segmentação: VLAN alunos, VLAN administrativa, DMZ com o servidor web público, rede de servidores internos. Regras (exemplo): internet→DMZ web 443 PERMITIR; internet→rede interna QUALQUER NEGAR; alunos→internet 80/443 via proxy PERMITIR; alunos→rede administrativa NEGAR; administrativa→sistema acadêmico 443 PERMITIR; DMZ→rede interna NEGAR (exceto banco específico, se necessário); TI→servidores 22 PERMITIR; padrão final NEGAR TUDO. Proxy: saída web dos alunos (filtragem e cache). IDS: entre a internet e a DMZ e no núcleo da rede."
    ]
   ]
  },
  {
   "titulo": "50 perguntas sobre políticas",
   "cenario": "A atividade final da apostila lista políticas (controle de acesso, uso aceitável, resposta a incidentes, retenção de dados, senhas, backup, segurança física, criptografia, vulnerabilidades, auditoria, treinamento, BYOD...). Cada equipe recebe 3 políticas.",
   "passos": [
    [
     "<ol><li>Defina cada política recebida em até 3 linhas.</li><li>Escreva 3 regras exemplo para cada.</li><li>Monte um cartaz ou slide-resumo para a turma.</li></ol>",
     "Rubrica: definição correta (ex.: política de backup = regras de frequência, retenção, local e teste das cópias de segurança; política de resposta a incidentes = como detectar, comunicar, conter, erradicar, recuperar e aprender com incidentes; política de retenção = por quanto tempo cada tipo de dado é guardado e como é eliminado); 3 regras aplicáveis por política; clareza na apresentação."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Defesas",
   "itens": [
    "Física e continuidade.",
    "Política: objetivo, escopo, responsabilidades, sanções.",
    "Firewall, proxy, IDS/IPS, TLS.",
    "Defesa em camadas."
   ]
  }
 ],
 "glossario": [
  [
   "IPS",
   "Detecta e bloqueia intrusões."
  ],
  [
   "DMZ",
   "Zona para servidores expostos."
  ]
 ]
});
