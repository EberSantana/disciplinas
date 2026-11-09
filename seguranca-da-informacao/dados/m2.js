FSI.modulo({
 "n": 2,
 "unidade": "Fundamentos",
 "nome": "Conceitos e terminologia",
 "titulo": "Ativo, ameaça, vulnerabilidade, risco e controle",
 "duracao": "4 h",
 "resumoCurto": "Ativo: Qualquer recurso que contém, processa ou transmite informação e tem valor: servidores, bancos de dados, documentos, pessoas. Vulnerabilidade: Fraqueza ou falha que pode ser explorada. Pode surgir no projeto, na im",
 "analogia": {
  "titulo": "A janela aberta",
  "txt": "<p>A casa (<b>ativo</b>) tem uma janela que não tranca (<b>vulnerabilidade</b>). Um ladrão na vizinhança é a <b>ameaça</b>. Ele pular a janela é o <b>ataque</b>; se levar a TV, é um <b>incidente</b>. A grade na janela é um <b>controle</b>. E a chance de tudo isso acontecer, combinada com o prejuízo, é o <b>risco</b>.</p>"
 },
 "chave": [
  "<b>Ativo:</b> Qualquer recurso que contém, processa ou transmite informação e tem valor: servidores, bancos de dados, documentos, pessoas.",
  "<b>Vulnerabilidade:</b> Fraqueza ou falha que pode ser explorada. Pode surgir no projeto, na implementação, na operação ou no gerenciamento.",
  "<b>Ameaça:</b> Circunstância com potencial de causar dano. ISO/IEC 27002: causa potencial de um incidente indesejado.",
  "<b>Ataque × Incidente:</b> Ataque é a ação maliciosa para comprometer um ativo. Incidente é a ocorrência efetiva do ataque, a exploração da vulnerabilidade.",
  "<b>Controle:</b> Medida para reduzir o risco. Tipos: preventivo (evita), detectivo (identifica) e corretivo (recupera).",
  "<b>Cubo de McCumber (1991):</b> Três dimensões: princípios (C, I, D), estados da informação (processamento, armazenamento, transmissão) e medidas (tecnologia, políticas e procedimentos, conscientização/educação)."
 ],
 "objetivos": [
  "Usar com precisão <b>ativo, ameaça, vulnerabilidade, ataque, incidente, controle e risco</b>.",
  "Classificar controles em <b>preventivos, detectivos e corretivos</b>.",
  "Descrever o <b>Cubo de McCumber</b>."
 ],
 "licoes": [
  {
   "t": "O vocabulário",
   "txt": "",
   "pontos": [
    "<b>Ativo</b>: o que tem valor.",
    "<b>Vulnerabilidade</b>: fraqueza explorável.",
    "<b>Ameaça</b>: causa potencial de incidente.",
    "<b>Ataque</b>: a ação; <b>incidente</b>: o dano efetivo.",
    "<b>Risco</b>: probabilidade × impacto.",
    "<b>Controle</b>: medida que reduz o risco."
   ]
  },
  {
   "t": "Tipos de controle e o cubo",
   "txt": "<p>Controles <b>preventivos</b> evitam (senha forte), <b>detectivos</b> percebem (log, alarme) e <b>corretivos</b> recuperam (backup). O <b>Cubo de McCumber</b> cruza três dimensões: princípios (C, I, D), estados da informação (processamento, armazenamento, transmissão) e medidas (tecnologia, políticas, pessoas).</p>"
  }
 ],
 "termos": [
  [
   "Vulnerabilidade",
   "Fraqueza explorável."
  ],
  [
   "Ameaça",
   "Causa potencial de dano."
  ],
  [
   "Incidente",
   "Ocorrência efetiva do dano."
  ],
  [
   "Controle detectivo",
   "Identifica o problema."
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
   "tipo": "classificar",
   "id": "jogo-ter",
   "titulo": "Jogo: qual é o termo?",
   "cats": [
    "Ativo",
    "Vulnerabilidade",
    "Ameaça",
    "Controle"
   ],
   "itens": [
    [
     "Banco de dados de alunos",
     0
    ],
    [
     "Servidor de e-mail",
     0
    ],
    [
     "Senha padrão admin/admin nunca trocada",
     1
    ],
    [
     "Sistema sem atualização há 2 anos",
     1
    ],
    [
     "Grupo criminoso que espalha ransomware",
     2
    ],
    [
     "Enchente na sala do servidor",
     2
    ],
    [
     "Autenticação em dois fatores",
     3
    ],
    [
     "Backup diário testado",
     3
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Aplique o vocabulário em situações reais e classifique os controles.",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-ctrl",
    "titulo": "Preventivo, detectivo ou corretivo?",
    "cats": [
     "Preventivo",
     "Detectivo",
     "Corretivo"
    ],
    "itens": [
     [
      "Firewall bloqueando portas",
      0
     ],
     [
      "Treinamento contra phishing",
      0
     ],
     [
      "Câmera com gravação e alarme",
      1
     ],
     [
      "IDS alertando tráfego estranho",
      1
     ],
     [
      "Análise de logs de acesso",
      1
     ],
     [
      "Restaurar o backup",
      2
     ],
     [
      "Plano de recuperação de desastres",
      2
     ],
     [
      "Senha forte com bloqueio após tentativas",
      0
     ]
    ]
   },
   {
    "tipo": "cenarios",
    "titulo": "Ataque ou incidente?",
    "cfg": {
     "id": "ai",
     "rotulo": "Caso",
     "itens": [
      {
       "t": "Alguém tentou 500 senhas no login do sistema, mas foi bloqueado.",
       "ops": [
        [
         "Ataque, sem incidente",
         true,
         "Houve ação maliciosa, mas sem dano."
        ],
        [
         "Incidente",
         false,
         "Não houve comprometimento."
        ],
        [
         "Vulnerabilidade",
         false,
         "É a ação do atacante."
        ]
       ]
      },
      {
       "t": "O atacante entrou e copiou a lista de clientes.",
       "ops": [
        [
         "Incidente",
         true,
         "O ataque teve sucesso e causou dano."
        ],
        [
         "Apenas ameaça",
         false,
         "Já aconteceu."
        ],
        [
         "Controle",
         false,
         "É o oposto."
        ]
       ]
      },
      {
       "t": "O servidor da escola roda uma versão antiga com falha conhecida.",
       "ops": [
        [
         "Vulnerabilidade",
         true,
         "Fraqueza que pode ser explorada."
        ],
        [
         "Incidente",
         false,
         "Ainda não houve exploração."
        ],
        [
         "Ameaça",
         false,
         "Ameaça é quem/o que pode explorar."
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
    "t": "Classifique os controles sem erros",
    "ev": "vis:lab-ctrl"
   },
   {
    "id": "m2",
    "t": "Diferencie ataque, incidente e vulnerabilidade",
    "ev": "ai:fim"
   },
   {
    "id": "m3",
    "t": "Resolva o jogo dos termos (Explorar)",
    "ev": "vis:jogo-ter"
   }
  ],
  "guiados": [
   {
    "titulo": "Risco = probabilidade × impacto",
    "txt": "<p>Use uma escala de 1 a 5 para cada um.</p>",
    "passos": [
     {
      "p": "Phishing: probabilidade 4, impacto 4. Qual o risco?",
      "r": 16,
      "dica": "4 × 4.",
      "expl": "16: alto."
     },
     {
      "p": "Enchente no servidor: probabilidade 1, impacto 5. Qual o risco?",
      "r": 5,
      "dica": "1 × 5.",
      "expl": "5: baixo, mas o impacto é máximo — vale um plano de continuidade."
     },
     {
      "p": "Quantas vezes o risco do phishing é maior? (uma casa decimal)",
      "r": 3.2,
      "tol": 0.05,
      "dica": "16 ÷ 5.",
      "expl": "3,2 vezes: o phishing deve ser tratado primeiro."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Ativo",
   "Qualquer recurso de valor que contém, processa ou transmite informação."
  ],
  [
   "Vulnerabilidade",
   "Fraqueza ou falha (de projeto, implementação, operação ou gestão) que pode ser explorada."
  ],
  [
   "Ameaça",
   "Causa potencial de um incidente indesejado, que pode resultar em dano a um sistema ou organização (ISO/IEC 27002)."
  ],
  [
   "Ataque",
   "Ação maliciosa para comprometer a segurança de um ativo; acesso ou uso de recursos sem autorização."
  ],
  [
   "Incidente",
   "Ocorrência de um ataque; exploração efetiva de uma vulnerabilidade."
  ],
  [
   "Controle",
   "Medida para reduzir o risco: preventivo, detectivo ou corretivo."
  ],
  [
   "Controle preventivo",
   "Evita que o incidente ocorra. Ex.: firewall, catraca, senha forte."
  ],
  [
   "Controle detectivo",
   "Identifica que algo está acontecendo. Ex.: IDS, câmera, logs, alarme."
  ],
  [
   "Controle corretivo",
   "Restaura ou reduz o dano após o incidente. Ex.: restauração de backup, aplicação de patch."
  ],
  [
   "Exploit",
   "Código preparado para explorar uma vulnerabilidade conhecida."
  ],
  [
   "Cubo de McCumber",
   "Modelo de John McCumber (1991) com 3 dimensões: princípios (CID), estados da informação e medidas de segurança."
  ],
  [
   "Risco",
   "Possibilidade de uma ameaça explorar uma vulnerabilidade e causar impacto; ≈ probabilidade × impacto."
  ]
 ],
 "vf": [
  [
   "Vulnerabilidade e ameaça são sinônimos.",
   false,
   "Falso. Vulnerabilidade é a fraqueza; ameaça é o agente ou evento que pode explorá-la."
  ],
  [
   "Um backup restaurado após um ataque é um exemplo de controle corretivo.",
   true,
   "Verdadeiro. Atua depois do incidente para recuperar o estado normal."
  ],
  [
   "O Cubo de McCumber foi criado em 1991 e possui três dimensões.",
   true,
   "Verdadeiro. John McCumber, 1991: princípios, estados da informação e medidas de segurança."
  ],
  [
   "Pessoas não são consideradas ativos de informação.",
   false,
   "Falso. O conhecimento na memória das pessoas é um ativo de informação, e elas processam e transmitem informação."
  ],
  [
   "Um IDS (sistema de detecção de intrusão) é um controle detectivo.",
   true,
   "Verdadeiro. Ele identifica atividades suspeitas; não necessariamente bloqueia."
  ],
  [
   "Incidente é qualquer vulnerabilidade existente em um sistema, mesmo que nunca explorada.",
   false,
   "Falso. Incidente é a ocorrência do ataque ou a exploração; a vulnerabilidade sozinha é apenas a fraqueza."
  ],
  [
   "Vulnerabilidades podem surgir no projeto, na implementação, na operação ou no gerenciamento de um sistema.",
   true,
   "Verdadeiro. É a definição apresentada na aula."
  ],
  [
   "Um exploit é um tipo de controle preventivo.",
   false,
   "Falso. Exploit é um código de ataque que explora uma vulnerabilidade."
  ],
  [
   "No Cubo de McCumber, “Transmissão” é um dos estados da informação.",
   true,
   "Verdadeiro. Os estados são processamento, armazenamento e transmissão."
  ],
  [
   "Firewall e catraca com crachá são exemplos de controles preventivos.",
   true,
   "Verdadeiro. Ambos impedem o acesso não autorizado antes que ele ocorra."
  ],
  [
   "Se não há ameaça conhecida, a vulnerabilidade pode ser ignorada para sempre.",
   false,
   "Falso. Novas ameaças surgem o tempo todo; a existência de uma vulnerabilidade implica uma ameaça potencial."
  ],
  [
   "Conscientização e treinamento fazem parte das medidas de segurança do Cubo de McCumber.",
   true,
   "Verdadeiro. É uma das três medidas, ao lado de tecnologia e de políticas e procedimentos."
  ]
 ],
 "caderno": [
  [
   "Defina ativo e liste 5 ativos de informação de uma escola.",
   "Ativo é qualquer recurso de valor que contém, processa ou transmite informação. Na escola: sistema acadêmico, diários de classe, servidor de arquivos, notebooks da coordenação, os próprios servidores e professores (conhecimento), fichas de matrícula em papel, rede Wi-Fi."
  ],
  [
   "Explique a diferença entre ameaça e vulnerabilidade com um exemplo do cotidiano.",
   "Vulnerabilidade é a fraqueza (uma janela sem tranca); ameaça é o que pode explorá-la (um ladrão no bairro, uma chuva forte). Em TI: senha “123456” é a vulnerabilidade; um atacante fazendo força bruta é a ameaça."
  ],
  [
   "Qual a diferença entre ataque e incidente?",
   "Ataque é a ação maliciosa (tentativa de comprometer). Incidente é a ocorrência concreta, quando o ataque é bem-sucedido ou gera um evento de segurança que afeta a organização, como a exploração de uma vulnerabilidade."
  ],
  [
   "Classifique cada controle como preventivo, detectivo ou corretivo: (a) câmera de segurança; (b) backup restaurado após ransomware; (c) firewall bloqueando porta; (d) alarme de intrusão; (e) catraca com crachá.",
   "(a) detectivo (também dissuasivo); (b) corretivo; (c) preventivo; (d) detectivo; (e) preventivo."
  ],
  [
   "Por que se diz que “a existência de uma vulnerabilidade implica uma ameaça”?",
   "Porque uma fraqueza conhecida ou existente pode, em algum momento, ser descoberta e explorada por alguém ou algo. Se existe a porta aberta, existe o potencial de alguém entrar; o risco nasce da combinação entre ambas."
  ],
  [
   "Desenhe o Cubo de McCumber e nomeie as três faces com seus três elementos cada.",
   "Face 1 – Princípios: Confidencialidade, Integridade, Disponibilidade. Face 2 – Estados da informação: Processamento, Armazenamento, Transmissão. Face 3 – Medidas de segurança: Tecnologia; Políticas e Procedimentos; Conscientização, Treinamento e Educação. São 27 células combinando as três dimensões."
  ],
  [
   "Dê um exemplo de uma “célula” do Cubo de McCumber (um item de cada face) aplicado à realidade.",
   "Exemplo: Confidencialidade + Transmissão + Tecnologia = usar HTTPS/TLS para que as notas dos alunos não sejam lidas em trânsito. Outro: Disponibilidade + Armazenamento + Políticas = política de backup diário do servidor."
  ],
  [
   "Defina exploit e explique sua relação com vulnerabilidade.",
   "Exploit é um código ou técnica preparada para explorar uma vulnerabilidade conhecida. A vulnerabilidade é a falha; o exploit é a “chave” que a aproveita para obter acesso ou causar dano."
  ],
  [
   "O que é risco e como ele se relaciona com ameaça, vulnerabilidade e ativo?",
   "Risco é a possibilidade de uma ameaça explorar uma vulnerabilidade e causar impacto em um ativo. Informalmente: Risco = Probabilidade × Impacto. Sem ativo de valor, sem vulnerabilidade ou sem ameaça, o risco diminui."
  ],
  [
   "Por que a medida “conscientização, treinamento e educação” está no mesmo nível de importância que a tecnologia no Cubo?",
   "Porque o fator humano é explorado constantemente (phishing, engenharia social, senhas fracas). Firewalls não impedem um usuário de entregar a senha num e-mail falso; só a conscientização reduz esse risco."
  ],
  [
   "Cite três exemplos de ameaças naturais e três de ameaças humanas.",
   "Naturais: enchente, raio, incêndio, terremoto. Humanas: invasor externo, funcionário insatisfeito, erro de um operador que apaga uma tabela, furto de notebook."
  ],
  [
   "Relacione: um funcionário deixou a senha num post-it no monitor. Identifique o ativo, a vulnerabilidade, a ameaça e um controle.",
   "Ativo: a conta e os dados que ela acessa. Vulnerabilidade: senha exposta fisicamente. Ameaça: visitante, colega mal-intencionado ou pessoal de limpeza que vê a senha. Controle: política de mesa limpa, treinamento e autenticação em dois fatores."
  ]
 ],
 "pbl": [
  {
   "titulo": "Laboratório de informática sem dono",
   "cenario": "O laboratório do campus tem 30 PCs com a mesma senha de administrador (“lab123”), pendrives entram e saem livremente e não há registro de quem usa cada máquina.",
   "passos": [
    [
     "<ol><li>Liste ativos, vulnerabilidades e ameaças.</li><li>Monte uma tabela com pelo menos 1 controle preventivo, 1 detectivo e 1 corretivo.</li><li>Qual ação você faria primeiro? Por quê?</li></ol>",
     "Ativos: PCs, softwares licenciados, trabalhos dos alunos, rede do campus. Vulnerabilidades: senha única e fraca, autoexecução de mídias removíveis, ausência de registro. Ameaças: malware via pendrive, aluno instalando programas, alteração de configurações. Controles: preventivo — senha forte e única e bloqueio de autoexecução; detectivo — log de login por usuário e antivírus com relatório; corretivo — imagem padrão para restaurar as máquinas (congelamento). Primeira ação: trocar a senha de administrador, pois é a vulnerabilidade de maior impacto e menor custo."
    ]
   ]
  },
  {
   "titulo": "Monte o seu Cubo",
   "cenario": "Sua equipe deve proteger o sistema de notas do campus usando o Cubo de McCumber.",
   "passos": [
    [
     "<ol><li>Escolha 6 células diferentes do cubo.</li><li>Para cada célula, descreva uma medida concreta.</li><li>Apresente em forma de cartaz.</li></ol>",
     "Exemplos esperados: C+Transmissão+Tecnologia = HTTPS; I+Armazenamento+Tecnologia = hash/log de alteração de notas; D+Armazenamento+Políticas = backup diário; C+Processamento+Conscientização = não deixar sessão aberta; I+Processamento+Políticas = só o professor da disciplina lança nota; D+Transmissão+Tecnologia = link de internet redundante. Avalie se cada medida combina de fato os três elementos escolhidos."
    ]
   ]
  },
  {
   "titulo": "O post-it e o estagiário",
   "cenario": "Um estagiário encontrou a senha do servidor em um post-it e, por curiosidade, entrou e apagou sem querer uma pasta de relatórios. Não havia backup recente.",
   "passos": [
    [
     "<ol><li>Isso foi um ataque, um incidente ou os dois? Justifique.</li><li>Identifique as vulnerabilidades envolvidas.</li><li>Proponha controles para cada vulnerabilidade.</li></ol>",
     "Foi um incidente de segurança (houve dano à integridade e à disponibilidade); pode não ser um ataque intencional, mas houve acesso não autorizado. Vulnerabilidades: senha exposta, conta sem controle de privilégio, ausência de backup. Controles: política de mesa limpa e senhas em cofre; contas individuais com mínimo privilégio; backup automático com teste de restauração; treinamento de estagiários."
    ]
   ]
  },
  {
   "titulo": "Glossário ilustrado",
   "cenario": "Crie um glossário visual (história em quadrinhos de 6 quadros) que explique ativo, vulnerabilidade, ameaça, ataque, incidente e controle usando uma única história.",
   "passos": [
    [
     "<ol><li>Defina a história (ex.: uma casa, uma loja).</li><li>Um quadro por conceito.</li><li>Revise se cada quadro corresponde à definição técnica.</li></ol>",
     "Rubrica: 6 quadros, um por conceito; mesma narrativa (ex.: casa = ativo; janela quebrada = vulnerabilidade; ladrão no bairro = ameaça; ladrão tenta entrar = ataque; ladrão leva a TV = incidente; grade e alarme = controle). Critérios: correção conceitual, coerência da história e criatividade."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Termos",
   "itens": [
    "Ativo, vulnerabilidade, ameaça, ataque, incidente.",
    "Risco = probabilidade × impacto.",
    "Controles preventivos, detectivos, corretivos.",
    "Cubo de McCumber."
   ]
  }
 ],
 "glossario": [
  [
   "McCumber",
   "Modelo em cubo da segurança (1991)."
  ]
 ]
});
