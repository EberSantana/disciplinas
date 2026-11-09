FSI.modulo({
 "n": 7,
 "unidade": "Ameaças",
 "nome": "Malware, ataques e engenharia social",
 "titulo": "Vírus, ransomware, phishing e a anatomia de um ataque",
 "duracao": "6 h",
 "resumoCurto": "Malware: Programas feitos para executar ações danosas. Infectam via vulnerabilidades, mídias removíveis, páginas maliciosas, ação direta ou arquivos infectados. Tipos: Vírus (precisa do hospedeiro), Bot/Botnet (zumbis co",
 "analogia": {
  "titulo": "O golpe do falso entregador",
  "txt": "<p>Alguém liga dizendo ser da transportadora, sabe seu nome e endereço e pede “só um código que chegou por SMS” para liberar a entrega. Não há vírus nem invasão técnica: só <b>engenharia social</b>. No mundo digital, o <b>phishing</b> faz o mesmo por e-mail e mensagem — e muitas vezes é a porta de entrada para o <b>malware</b>.</p>"
 },
 "chave": [
  "<b>Malware:</b> Programas feitos para executar ações danosas. Infectam via vulnerabilidades, mídias removíveis, páginas maliciosas, ação direta ou arquivos infectados.",
  "<b>Tipos:</b> Vírus (precisa do hospedeiro), Bot/Botnet (zumbis controlados remotamente), Spyware (keylogger, screenlogger, adware), Backdoor, Cavalo de Troia, Rootkit.",
  "<b>Passivo × Ativo:</b> Passivo: bisbilhota e monitora, sem alterar; difícil de detectar, foco em prevenção (criptografia). Ativo: modifica o fluxo ou cria um fluxo falso.",
  "<b>Phishing:</b> Tentativa de obter senhas, cartões e outros dados se passando por alguém confiável. É engenharia social.",
  "<b>Anatomia do ataque:</b> Footprinting → Scanning → Enumeração → Invasão → Escalada de privilégios → Acesso à informação → Ocultação de rastros → Backdoors → DoS.",
  "<b>DDoS:</b> Ataque coordenado de múltiplas fontes: atacante → masters → agentes (zumbis) → vítima inundada de pacotes."
 ],
 "objetivos": [
  "Diferenciar <b>vírus, worm, trojan, spyware, ransomware e botnet</b>.",
  "Reconhecer <b>phishing</b> e engenharia social.",
  "Ordenar a <b>anatomia de um ataque</b>.",
  "Criar <b>senhas fortes</b>."
 ],
 "licoes": [
  {
   "t": "Tipos de malware",
   "txt": "",
   "pontos": [
    "<b>Vírus</b>: precisa de um hospedeiro.",
    "<b>Worm</b>: se espalha sozinho pela rede.",
    "<b>Trojan</b>: parece útil, esconde o mal.",
    "<b>Spyware/keylogger</b>: espiona.",
    "<b>Ransomware</b>: sequestra arquivos e pede resgate.",
    "<b>Bot/botnet</b>: computadores zumbis controlados à distância."
   ]
  },
  {
   "t": "Anatomia de um ataque",
   "txt": "<p>Footprinting (reconhecimento) → varredura → enumeração → invasão → escalada de privilégios → acesso à informação → ocultação de rastros e instalação de backdoor.</p>"
  },
  {
   "t": "Senhas e phishing",
   "txt": "<p>Senha boa é <b>longa</b>: uma frase de 4 palavras vale mais que 8 caracteres “complicados”. Use gerenciador de senhas e 2FA. No phishing, desconfie de urgência, remetente estranho, link encurtado e pedido de código.</p>"
  }
 ],
 "termos": [
  [
   "Phishing",
   "Isca para roubar dados."
  ],
  [
   "Ransomware",
   "Sequestra arquivos."
  ],
  [
   "Botnet",
   "Rede de máquinas zumbis."
  ],
  [
   "2FA",
   "Segundo fator de autenticação."
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
   "tipo": "linha",
   "id": "anat",
   "titulo": "Anatomia de um ataque",
   "ordenar": true,
   "passos": [
    {
     "t": "Footprinting",
     "d": "Coleta de informações públicas."
    },
    {
     "t": "Varredura",
     "d": "Portas e serviços abertos."
    },
    {
     "t": "Enumeração",
     "d": "Usuários, versões, compartilhamentos."
    },
    {
     "t": "Invasão",
     "d": "Exploração de uma falha."
    },
    {
     "t": "Escalada de privilégios",
     "d": "De usuário comum a administrador."
    },
    {
     "t": "Ocultação",
     "d": "Apaga logs, instala backdoor."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Teste senhas, identifique golpes e classifique malwares.",
  "sims": [
   {
    "tipo": "senha",
    "titulo": "Laboratório de senhas",
    "instr": "Experimente: “123456”, “Ifs@2026” e uma frase como “bolo-de-milho-na-feira-7”.",
    "cfg": {
     "id": "pw"
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "É golpe?",
    "cfg": {
     "id": "ph",
     "rotulo": "Mensagem",
     "medidor": {
      "nome": "Segurança da turma",
      "ini": 50
     },
     "itens": [
      {
       "t": "“Sua conta será BLOQUEADA hoje. Clique em bit.ly/regulariza e confirme sua senha.”",
       "ops": [
        [
         "Phishing: urgência, link encurtado e pedido de senha",
         true,
         "Banco nenhum pede senha por link."
        ],
        [
         "Legítimo, há prazo",
         false,
         "Urgência é a isca."
        ],
        [
         "Pode clicar só para ver",
         false,
         "Já pode instalar malware."
        ]
       ]
      },
      {
       "t": "Um “colega” no WhatsApp com foto nova pede um Pix urgente.",
       "ops": [
        [
         "Golpe do falso contato: confirmar por ligação",
         true,
         "Engenharia social clássica."
        ],
        [
         "Mandar, é amigo",
         false,
         "Confirme por outro canal."
        ],
        [
         "Mandar metade",
         false,
         "Continua sendo golpe."
        ]
       ]
      },
      {
       "t": "A coordenação manda e-mail do domínio oficial lembrando a reunião, sem links nem anexos.",
       "ops": [
        [
         "Provavelmente legítimo",
         true,
         "Sem pedido de dados, domínio correto, sem urgência."
        ],
        [
         "É phishing",
         false,
         "Nem todo e-mail é golpe."
        ],
        [
         "Apagar sem ler",
         false,
         "Desconfiança sem análise também atrapalha."
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
    "t": "Teste uma senha muito fraca",
    "ev": "pw:fraca"
   },
   {
    "id": "m2",
    "t": "Crie uma senha forte",
    "ev": "pw:forte"
   },
   {
    "id": "m3",
    "t": "Analise todas as mensagens",
    "ev": "ph:fim"
   },
   {
    "id": "m4",
    "t": "Ordene a anatomia do ataque (Explorar)",
    "ev": "ord:anat"
   }
  ],
  "guiados": [
   {
    "titulo": "Quanto vale cada caractere?",
    "txt": "<p>Considere só letras minúsculas (26) e um computador que testa 10 bilhões de senhas por segundo.</p>",
    "passos": [
     {
      "p": "Quantas senhas de 2 letras minúsculas existem?",
      "r": 676,
      "dica": "26 × 26.",
      "expl": "676."
     },
     {
      "p": "E de 3 letras?",
      "r": 17576,
      "dica": "26³.",
      "expl": "17.576: cada caractere a mais multiplica por 26."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Malware",
   "Código malicioso desenvolvido para executar ações danosas em um computador."
  ],
  [
   "Vírus",
   "Propaga-se inserindo cópias em outros arquivos; depende da execução do hospedeiro."
  ],
  [
   "Cavalo de Troia",
   "Programa aparentemente legítimo que executa funções maliciosas ocultas; não se replica."
  ],
  [
   "Backdoor",
   "Programa que permite o retorno do invasor ao computador comprometido."
  ],
  [
   "Rootkit",
   "Esconde arquivos, processos e conexões do invasor; atua no kernel e no nível do usuário."
  ],
  [
   "Botnet",
   "Rede de computadores zumbis controlados remotamente; usada em DDoS e spam."
  ],
  [
   "Keylogger",
   "Spyware que captura e armazena as teclas digitadas."
  ],
  [
   "Phishing",
   "Engenharia social para obter dados sensíveis se passando por alguém confiável."
  ],
  [
   "Footprinting",
   "Primeira etapa do ataque: reconhecimento e coleta de informações sobre o alvo."
  ],
  [
   "Scanning",
   "Varredura para descobrir sistemas ativos, portas abertas e SO (ex.: nmap)."
  ],
  [
   "Ataque passivo",
   "Observa e intercepta sem alterar o recurso; difícil de detectar."
  ],
  [
   "DDoS",
   "Negação de serviço distribuída: ataque coordenado a partir de múltiplas fontes."
  ]
 ],
 "vf": [
  [
   "O cavalo de Troia se replica automaticamente para outros computadores.",
   false,
   "Falso. O trojan não se replica; quem infecta outros programas é o vírus."
  ],
  [
   "Ataques passivos são difíceis de detectar, por isso o foco deve ser a prevenção com criptografia.",
   true,
   "Verdadeiro. Como não alteram nada, raramente deixam rastros visíveis."
  ],
  [
   "Phishing é uma forma de engenharia social.",
   true,
   "Verdadeiro. Explora a confiança da vítima, e não uma falha técnica."
  ],
  [
   "Um computador infectado por bot e controlado remotamente é chamado de zumbi.",
   true,
   "Verdadeiro. Um conjunto de zumbis forma uma botnet."
  ],
  [
   "Footprinting é a última etapa da anatomia de um ataque.",
   false,
   "Falso. É a primeira: reconhecimento do alvo."
  ],
  [
   "Um screenlogger captura a tela no momento do clique, podendo burlar teclados virtuais.",
   true,
   "Verdadeiro. Registra a posição do cursor e a imagem da tela."
  ],
  [
   "No DDoS, o master é a máquina alvo do ataque.",
   false,
   "Falso. O master comanda os agentes; o alvo é a vítima."
  ],
  [
   "Rootkits podem substituir comandos do sistema para esconder a presença do invasor.",
   true,
   "Verdadeiro. Por isso o sistema pode “mentir” ao administrador."
  ],
  [
   "Modificar uma mensagem interceptada é um exemplo de ataque passivo.",
   false,
   "Falso. Modificar o fluxo é ataque ativo."
  ],
  [
   "Um vírus depende da execução do programa ou arquivo hospedeiro para infectar o computador.",
   true,
   "Verdadeiro. É a característica que o define."
  ],
  [
   "Na etapa de enumeração, o atacante faz consultas diretas ao sistema e pode ser notado.",
   true,
   "Verdadeiro. É uma coleta intrusiva, diferente do footprinting."
  ],
  [
   "Botnets são usadas apenas para minerar criptomoedas.",
   false,
   "Falso. Usos comuns: DDoS, spam em larga escala e camuflagem do atacante."
  ]
 ],
 "caderno": [
  [
   "Diferencie vírus de cavalo de Troia.",
   "Vírus se propaga inserindo cópias de si em outros programas e arquivos e depende da execução do hospedeiro. Cavalo de Troia se disfarça de programa legítimo (jogo, cartão virtual), executa funções maliciosas escondidas e não se replica."
  ],
  [
   "O que é um bot e o que é uma botnet? Para que as botnets são usadas?",
   "Bot é um programa que permite ao invasor controlar remotamente o computador infectado (zumbi) via IRC, web ou P2P. Botnet é uma rede de centenas ou milhares de zumbis. Usos: DDoS, spam em massa e camuflar o atacante."
  ],
  [
   "Explique keylogger, screenlogger e adware.",
   "Keylogger: captura as teclas digitadas (senhas). Screenlogger: captura a tela e a posição do cursor a cada clique (contorna teclados virtuais). Adware: exibe propagandas, às vezes coletando hábitos de navegação."
  ],
  [
   "O que é um rootkit e por que ele é tão perigoso?",
   "Conjunto de programas que esconde arquivos, processos e conexões do invasor, substituindo partes legítimas do SO e atuando no nível do usuário e do kernel com privilégios de root. É perigoso porque o sistema “mente” para o administrador, dificultando a detecção."
  ],
  [
   "Diferencie ataque passivo de ataque ativo e dê um exemplo de cada.",
   "Passivo: apenas observa ou intercepta, sem alterar (sniffing de rede, análise de tráfego); difícil de detectar. Ativo: altera, injeta, repete ou interrompe (modificação de mensagem, falsificação de identidade, DoS)."
  ],
  [
   "Liste 5 indícios de que um e-mail é phishing.",
   "Remetente com domínio estranho ou parecido (@app0llo.com); senso de urgência ou ameaça (“sua conta será bloqueada”); links que, ao passar o mouse, mostram endereço diferente; erros de português; pedido de senha ou dados bancários; anexos inesperados (.exe, .zip); saudação genérica."
  ],
  [
   "Descreva as três primeiras etapas da anatomia de um ataque.",
   "Footprinting: reconhecimento, coleta de informações públicas (domínios, IPs, nomes, e-mails, engenharia social). Scanning: descobrir sistemas ativos, portas abertas e SO (nmap, ping, traceroute). Enumeração: coleta intrusiva, com consultas diretas para identificar contas válidas, compartilhamentos, versões de serviços e vulnerabilidades."
  ],
  [
   "O que é escalada de privilégios?",
   "Depois de obter acesso como usuário comum, o invasor explora falhas (exploits, buffer overflow, trojans) para conseguir privilégios de administrador ou root e controlar todo o sistema."
  ],
  [
   "Descreva os papéis em um DDoS: atacante, master, agente e vítima.",
   "Atacante: coordena o ataque. Master: recebe os parâmetros e comanda os agentes. Agente: máquina comprometida que efetivamente envia o tráfego. Vítima: alvo inundado de pacotes, que fica congestionado e indisponível."
  ],
  [
   "Quais são as três fases de um DDoS?",
   "(1) Intrusão em massa: ferramentas automáticas comprometem muitas máquinas e obtêm root. (2) Instalação do software DDoS nas máquinas invadidas, montando a rede de ataque. (3) Lançamento do flood de pacotes contra a vítima."
  ],
  [
   "O que é defacement? Qual pilar ele fere?",
   "Alteração do conteúdo de um site (página principal trocada por mensagem do invasor). Fere a integridade e também a imagem da organização."
  ],
  [
   "Cite 4 tipos de Trojan e o que cada um faz.",
   "Downloader: baixa outros malwares da internet. Dropper: instala malwares embutidos em seu próprio código. Backdoor: abre acesso remoto. Banker: coleta dados bancários. (Outros: DoS, Destrutivo, Clicker, Proxy, Spy.)"
  ]
 ],
 "pbl": [
  {
   "titulo": "O e-mail da @Apollo",
   "cenario": "Um cliente encaminhou um e-mail que parece da @Apollo: “Sua assinatura expira HOJE. Clique aqui e atualize seu cartão para não perder o acesso”. O remetente é suporte@apo1lo-seguranca.com e o link aponta para http://apollo-login.xyz.",
   "passos": [
    [
     "<ol><li>Liste todos os indícios de phishing.</li><li>Qual deve ser a orientação ao cliente?</li><li>Proponha uma campanha de conscientização de 1 semana.</li></ol>",
     "Indícios: domínio com “1” no lugar de “l” e diferente do oficial; urgência (“HOJE”); pedido de cartão; link para domínio .xyz e sem HTTPS; possível saudação genérica. Orientação: não clicar, não responder, acessar o site digitando o endereço oficial, reportar ao suporte real e excluir. Campanha: dia 1 cartaz “passe o mouse antes de clicar”; dia 2 quiz; dia 3 simulação controlada de phishing; dia 4 análise dos resultados; dia 5 premiação e dicas."
    ]
   ]
  },
  {
   "titulo": "A rede de hotéis",
   "cenario": "Uma rede mundial de hotéis teve os dados de 3 milhões de hóspedes expostos. Os invasores usaram o login de um funcionário. O hotel diz que senhas e dados financeiros não foram acessados.",
   "passos": [
    [
     "<ol><li>Que tipo de ataque provavelmente ocorreu para obter o login?</li><li>Quais controles teriam limitado o dano?</li><li>O que os hóspedes devem fazer?</li></ol>",
     "Provável phishing ou reaproveitamento de senha vazada (engenharia social / credential stuffing). Controles: 2FA, mínimo privilégio (um funcionário não precisava acessar todos os 3 milhões de registros), monitoramento de anomalias (exportação em massa), segmentação do banco e treinamento. Hóspedes: desconfiar de e-mails e ligações citando a reserva, trocar senhas reutilizadas, ativar 2FA e acompanhar comunicados oficiais."
    ]
   ]
  },
  {
   "titulo": "Linha do tempo de uma invasão",
   "cenario": "Recebendo cartões embaralhados com eventos (pesquisa no LinkedIn por funcionários, nmap no IP do servidor, descoberta de versão antiga do Apache, uso de exploit, obtenção de root, cópia do banco, limpeza do log, instalação de rootkit), a equipe deve reconstruir o ataque.",
   "passos": [
    [
     "<ol><li>Ordene os eventos e nomeie a etapa de cada um.</li><li>Para cada etapa, indique um controle que teria detectado ou impedido.</li><li>Em qual etapa a defesa é mais barata?</li></ol>",
     "Ordem: LinkedIn = footprinting; nmap = scanning; versão do Apache = enumeração; exploit = invasão; root = escalada de privilégios; cópia do banco = acesso à informação; limpeza de log = ocultação de rastros; rootkit = backdoor/manutenção do acesso. Controles: conscientização sobre exposição pública; IDS detectando varredura; ocultar banners e atualizar o Apache; patch e WAF; mínimo privilégio; criptografia do banco e DLP; logs em servidor remoto; verificação de integridade (rkhunter/AIDE). Mais barata: nas primeiras etapas (atualizar e reduzir superfície)."
    ]
   ]
  },
  {
   "titulo": "eLearning em risco",
   "cenario": "Uma plataforma de eLearning usada por várias empresas teve dados pessoais de alunos expostos. Investigação: senha padrão do painel administrativo, plugin desatualizado e ausência de logs.",
   "passos": [
    [
     "<ol><li>Quais exploits ou falhas foram usados?</li><li>Classifique cada falha (configuração, software, processo).</li><li>Monte um checklist de segurança para plataformas de ensino.</li></ol>",
     "Falhas: senha default (configuração), plugin com vulnerabilidade conhecida (software/gestão de patches), sem logs (processo/monitoramento). Checklist: trocar credenciais padrão; 2FA para administradores; atualizar núcleo e plugins mensalmente; remover plugins não usados; HTTPS; backup testado; logs centralizados; mínimo privilégio para professores; política de privacidade e LGPD."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Ameaças",
   "itens": [
    "Vírus, worm, trojan, spyware, ransomware, botnet.",
    "Phishing = engenharia social.",
    "Anatomia: do reconhecimento à ocultação.",
    "Senha longa + 2FA."
   ]
  }
 ],
 "glossario": [
  [
   "Keylogger",
   "Grava o que se digita."
  ],
  [
   "Backdoor",
   "Porta dos fundos para voltar."
  ],
  [
   "DDoS",
   "Negação de serviço distribuída."
  ]
 ]
});
