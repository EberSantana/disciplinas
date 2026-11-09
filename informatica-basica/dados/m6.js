FSI.modulo({
 "n": 6,
 "unidade": "Unidade 5",
 "nome": "Internet, nuvem e segurança",
 "titulo": "Navegar, pesquisar, trocar e-mails e se proteger",
 "duracao": "5 h",
 "resumoCurto": "URL, HTTP, download e upload, e-mail (CC e CCO), pesquisa avançada no Google, malware, phishing, backup e as camadas de defesa.",
 "analogia": {
  "titulo": "A cidade grande",
  "txt": "<p>A internet é uma cidade enorme: tem bibliotecas (sites), correios (e-mail), praças (redes sociais) — e também batedores de carteira. Saber o endereço certo (<b>URL</b>), pesquisar com precisão (<b>operadores de busca</b>) e desconfiar de quem oferece algo “bom demais” (<b>phishing</b>) é andar com segurança.</p>"
 },
 "chave": [
  "URL é o endereço; HTTPS mostra o cadeado.",
  "Download baixa; upload envia.",
  "CC mostra os destinatários; CCO os esconde.",
  "Operadores: site:, filetype:, aspas, - para excluir.",
  "Malware, phishing e ransomware; defesa com atualização, antivírus, 2FA e backup."
 ],
 "objetivos": [
  "Usar <b>e-mail</b> e <b>busca avançada</b>.",
  "Reconhecer <b>malware e phishing</b>.",
  "Proteger-se com <b>senhas, 2FA e backup</b>."
 ],
 "licoes": [
  {
   "t": "Web e e-mail",
   "txt": "<p>URL, HTTP/HTTPS, navegador. E-mail: usuario@dominio; Para, CC (cópia visível) e CCO (cópia oculta); anexos; spam.</p>"
  },
  {
   "t": "Pesquisar bem",
   "txt": "<p><code>site:ifs.edu.br edital</code>, <code>filetype:pdf</code>, <code>\"frase exata\"</code>, <code>-estágio</code> para excluir.</p>"
  },
  {
   "t": "Segurança",
   "txt": "<p>Vírus, worm, trojan, spyware, ransomware. Phishing é a isca por e-mail/mensagem. Defesa em camadas: antivírus, firewall, atualizações, pessoas atentas e backup offline.</p>"
  }
 ],
 "termos": [
  [
   "URL",
   "Endereço na web."
  ],
  [
   "CCO",
   "Cópia oculta."
  ],
  [
   "Phishing",
   "Isca para roubar dados."
  ],
  [
   "Backup",
   "Cópia de segurança."
  ]
 ],
 "ler": [
  [
   "Trilha Windows 11",
   "trilha-windows-11.html"
  ],
  [
   "Método Office Visual",
   "metodo-office-visual.html"
  ],
  [
   "Apostila Informática do Zero",
   "apostila.html"
  ],
  [
   "Ambiente interativo (11 módulos)",
   "ambiente-interativo.html"
  ]
 ],
 "visuais": [],
 "lab": {
  "intro": "Teste senhas e identifique golpes.",
  "sims": [
   {
    "tipo": "senha",
    "titulo": "Medidor de senhas",
    "instr": "Teste “123456”, “Maria2008” e uma frase longa como “cafe-com-pao-na-feira-9”.",
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
      "nome": "Turma protegida",
      "ini": 50
     },
     "itens": [
      {
       "t": "“Sua conta será bloqueada em 24h. Clique aqui e confirme seus dados.”",
       "ops": [
        [
         "Phishing",
         true,
         "Urgência + link + pedido de dados."
        ],
        [
         "Aviso legítimo",
         false,
         "Bancos não pedem dados por link."
        ]
       ]
      },
      {
       "t": "Você precisa enviar um e-mail para 40 responsáveis sem que um veja o endereço do outro.",
       "ops": [
        [
         "Colocar todos em CCO",
         true,
         "Protege os endereços."
        ],
        [
         "Colocar todos em CC",
         false,
         "Expõe os e-mails."
        ]
       ]
      },
      {
       "t": "O pen drive achado no estacionamento tem um arquivo “notas.pdf.exe”.",
       "ops": [
        [
         "Não abrir: é um programa disfarçado",
         true,
         "A extensão real é .exe."
        ],
        [
         "Abrir para descobrir o dono",
         false,
         "Pode ser malware."
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
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que é uma URL?",
   "Uniform Resource Locator — o endereço de rede onde se encontra um recurso informático (site, arquivo, impressora, etc.)."
  ],
  [
   "O que é HTTP?",
   "HyperText Transfer Protocol — protocolo responsável por tratar pedidos e respostas entre cliente e servidor na Web."
  ],
  [
   "Qual é a diferença entre Download e Upload?",
   "Download é baixar algo da internet; Upload é enviar um arquivo para a internet."
  ],
  [
   "Qual é a estrutura básica de um endereço de e-mail?",
   "nomeusuario@provedor.com — nome de usuário, o símbolo @ (arroba) e o domínio/provedor."
  ],
  [
   "O que é a Inbox de um e-mail?",
   "A caixa de entrada, onde chegam as mensagens novas recebidas."
  ],
  [
   "O que é Spam?",
   "Mensagens indesejadas, geralmente de publicidade em massa, enviadas sem consentimento."
  ],
  [
   "Qual é a diferença entre CC e CCO em um e-mail?",
   "Em CC (Com Cópia), todos veem quem recebeu cópia; em CCO (Cópia Oculta), os demais destinatários não sabem quem recebeu."
  ],
  [
   "O que é um Anexo de e-mail?",
   "Um arquivo extra enviado junto com o texto da mensagem (foto, documento, etc.)."
  ],
  [
   "Para que serve o operador \"site:\" no Google?",
   "Para limitar a busca a um domínio específico. Ex: site:ifs.edu.br edital"
  ],
  [
   "Para que serve o operador \"filetype:\" no Google?",
   "Para buscar arquivos em um formato específico. Ex: linux filetype:pdf"
  ],
  [
   "Para que serve o operador \"intitle:\" no Google?",
   "Para buscar páginas que tenham determinada palavra no título."
  ],
  [
   "Para que serve o operador \"inurl:\" no Google?",
   "Para encontrar páginas que tenham determinada palavra na própria URL do site."
  ],
  [
   "Para que serve o operador \"related:\" no Google?",
   "Para encontrar sites relacionados ou semelhantes ao site indicado."
  ],
  [
   "Para que serve o sinal de \"+\" numa busca do Google?",
   "Para forçar a busca de palavras (como pronomes e preposições) que normalmente seriam ignoradas por serem muito comuns."
  ],
  [
   "Para que serve o sinal de \"-\" numa busca do Google?",
   "Para excluir resultados que contenham determinada palavra."
  ],
  [
   "Para que serve o asterisco (*) numa busca do Google?",
   "Como curinga, substituindo uma palavra desconhecida dentro de uma frase de busca."
  ],
  [
   "O que é considerado uso ilegítimo do Google Hacking (Dorking)?",
   "Acessar sistemas ou dados sem autorização, mesmo que estejam publicamente indexados."
  ],
  [
   "Quem enviou o primeiro e-mail da história, em 1971?",
   "Ray Tomlinson, que também escolheu o símbolo @ (arroba) para separar usuário e servidor."
  ],
  [
   "O que é um Vírus de computador?",
   "Malware que precisa de intervenção humana (ex: abrir um arquivo) para se instalar e se espalhar."
  ],
  [
   "O que são Worms (vermes)?",
   "Malwares que se espalham sozinhos pela rede, sem precisar de ação humana."
  ],
  [
   "O que é um Trojan (Cavalo de Troia)?",
   "Malware que se disfarça de programa legítimo para enganar o usuário e se instalar no sistema."
  ],
  [
   "O que é um Ransomware?",
   "Malware que criptografa os arquivos da vítima e exige pagamento de resgate para liberá-los."
  ],
  [
   "O que é um Spyware?",
   "Malware que monitora e coleta dados do usuário secretamente, como um keylogger."
  ],
  [
   "O que é um Rootkit?",
   "Malware que obtém acesso privilegiado ao sistema e se esconde para não ser detectado."
  ],
  [
   "O que é uma Botnet?",
   "Uma rede de computadores infectados, controlados remotamente para ataques em massa (ex: DDoS, spam)."
  ],
  [
   "Quais são as 4 etapas do ciclo de vida de uma infecção por malware?",
   "Vetor de ataque, Execução, Persistência e Propagação/Ação."
  ],
  [
   "O que é Phishing?",
   "Ataque que combina meios técnicos e engenharia social para roubar dados pessoais e financeiros por meio de mensagens e páginas falsas."
  ],
  [
   "Como o Phishing costuma começar?",
   "Com uma mensagem enganosa (e-mail ou SMS) contendo um link falso e senso de urgência."
  ],
  [
   "O que uma página falsa de Phishing tenta simular?",
   "Instituições conhecidas, como bancos, pedindo usuário e senha da vítima."
  ],
  [
   "O que faz um Antivírus/EDR na defesa contra malware?",
   "Protege o computador (endpoint) detectando e bloqueando softwares maliciosos conhecidos."
  ],
  [
   "O que faz um Firewall?",
   "Controla o tráfego de rede, bloqueando acessos e conexões suspeitas."
  ],
  [
   "Por que é importante manter os softwares atualizados (patches)?",
   "Porque as atualizações corrigem falhas de segurança que poderiam ser exploradas por invasores."
  ],
  [
   "Por que o backup offline é uma defesa importante contra ransomware?",
   "Porque, estando fora da rede, ele não é atingido caso o ransomware criptografe os arquivos conectados."
  ],
  [
   "Por que o treinamento e a conscientização das pessoas são considerados uma camada de defesa?",
   "Porque muitos ataques (como phishing) exploram erros humanos, não apenas falhas técnicas."
  ],
  [
   "O que caracteriza o Software Pirata em termos legais?",
   "Cópia, venda ou distribuição de software proprietário sem pagamento dos direitos autorais — é crime previsto em lei."
  ]
 ],
 "vf": [
  [
   "HTTP é a versão segura e criptografada do protocolo de transferência de hipertexto.",
   false,
   "Essa é a definição de HTTPS. O HTTP puro NÃO é criptografado."
  ],
  [
   "Download significa baixar um arquivo da internet para o computador.",
   true,
   "Correto — é o sentido oposto do Upload."
  ],
  [
   "Em uma cópia oculta (CCO), todos os destinatários sabem quem mais recebeu a mensagem.",
   false,
   "É o contrário: na CCO, os demais destinatários NÃO sabem quem recebeu cópia oculta."
  ],
  [
   "O operador \"site:\" limita a pesquisa do Google a um domínio específico.",
   true,
   "Correto — por exemplo, \"site:ifs.edu.br edital\" busca apenas dentro do site do IFS."
  ],
  [
   "O operador \"filetype:pdf\" busca apenas vídeos no Google.",
   false,
   "O \"filetype:\" busca por um FORMATO DE ARQUIVO específico (nesse caso, PDF), não vídeos."
  ],
  [
   "Uma URL é o endereço que localiza um recurso na rede, como um site ou arquivo.",
   true,
   "Correto — URL significa \"Localizador Padrão de Recursos\"."
  ],
  [
   "Spam são mensagens importantes enviadas por contatos confiáveis.",
   false,
   "Spam são mensagens INDESEJADAS, geralmente publicidade em massa, e não mensagens confiáveis."
  ],
  [
   "O símbolo \"*\" em uma busca do Google funciona como curinga, substituindo uma palavra desconhecida.",
   true,
   "Correto — útil quando não sabemos parte exata de uma frase."
  ],
  [
   "Usar o Google Dorking para acessar dados privados sem autorização é uma prática legal e recomendada.",
   false,
   "É uma prática ILEGAL quando usada para acessar sistemas ou dados sem autorização, mesmo que estejam indexados publicamente."
  ],
  [
   "O sinal de \"-\" antes de uma palavra serve para EXCLUIR resultados que contenham aquele termo.",
   true,
   "Correto — por exemplo, \"Política -Amazonas\" exclui resultados que mencionem \"Amazonas\"."
  ],
  [
   "O primeiro e-mail da história foi enviado na década de 1990.",
   false,
   "Foi enviado em 1971, por Ray Tomlinson — bem antes da popularização da internet nos anos 1990."
  ],
  [
   "O operador \"related:\" retorna páginas parecidas ou semelhantes ao site indicado.",
   true,
   "Correto — por exemplo, \"related:google.com\" retorna sites parecidos com o Google."
  ],
  [
   "Um Vírus de computador se espalha sozinho, sem precisar de nenhuma ação do usuário.",
   false,
   "Essa é a característica do WORM. O Vírus precisa de intervenção humana (como abrir um arquivo) para se espalhar."
  ],
  [
   "Ransomware criptografa os arquivos da vítima e exige pagamento para liberá-los.",
   true,
   "Correto — essa é justamente a definição de ransomware."
  ],
  [
   "Um Trojan (Cavalo de Troia) se apresenta como um programa legítimo para enganar o usuário.",
   true,
   "Correto — daí a referência ao mito grego do Cavalo de Troia."
  ],
  [
   "Uma Botnet é uma rede de servidores oficiais usados por empresas de segurança.",
   false,
   "Uma Botnet é uma rede de computadores INFECTADOS, controlados remotamente por criminosos, geralmente para ataques como DDoS ou envio de spam."
  ],
  [
   "Phishing é um ataque puramente técnico, que não depende de engenganar a vítima.",
   false,
   "O Phishing combina meios técnicos com ENGENHARIA SOCIAL — ele depende de enganar a vítima para funcionar."
  ],
  [
   "Um Spyware serve para monitorar e coletar dados do usuário sem que ele perceba.",
   true,
   "Correto — exemplos incluem keyloggers, que registram tudo que é digitado."
  ],
  [
   "Manter os backups sempre conectados à rede é a melhor proteção contra ransomware.",
   false,
   "O ideal é manter backups OFFLINE (desconectados), pois um ransomware pode criptografar também os backups que estiverem conectados à rede."
  ],
  [
   "Um Rootkit tenta se esconder no sistema para não ser detectado pelo usuário ou pelo antivírus.",
   true,
   "Correto — essa é uma característica central do Rootkit: obter acesso privilegiado e se ocultar."
  ],
  [
   "Atualizações de segurança (patches) são desnecessárias se você já tem um bom antivírus instalado.",
   false,
   "As atualizações corrigem falhas específicas do software que o antivírus sozinho pode não cobrir; ambas as camadas são importantes."
  ],
  [
   "Em um golpe de Phishing, a etapa final costuma ser o roubo de dados sensíveis, como senhas e números de cartão.",
   true,
   "Correto — esse é o objetivo final do golpe: coletar dados sensíveis da vítima."
  ],
  [
   "Baixar e distribuir cópias de software proprietário sem pagar é uma prática legal, desde que seja para uso pessoal.",
   false,
   "É crime previsto em lei (pirataria de software), independentemente de ser para uso pessoal ou comercial."
  ],
  [
   "O Firewall tem a função de controlar o tráfego de rede e bloquear acessos suspeitos.",
   true,
   "Correto — essa é a função principal de um firewall na camada de rede."
  ]
 ],
 "caderno": [
  [
   "Monte a busca para achar editais em PDF só no site do IFS.",
   "edital site:ifs.edu.br filetype:pdf"
  ],
  [
   "Qual a diferença entre CC e CCO?",
   "CC mostra a todos quem recebeu a cópia; CCO esconde."
  ],
  [
   "Por que o backup offline salva contra ransomware?",
   "O ransomware criptografa o que alcança; o backup desconectado fica intacto para restaurar."
  ],
  [
   "Cite 3 sinais de phishing.",
   "Urgência, remetente estranho, link encurtado ou diferente, pedido de senha ou código, erros de português."
  ]
 ],
 "pbl": [
  {
   "titulo": "Pesquisando com Eficiência para um Trabalho Acadêmico",
   "cenario": "<p>Você precisa encontrar, rapidamente, editais em PDF publicados apenas no site do IFS sobre bolsas de pesquisa, sem perder tempo com resultados irrelevantes de outros sites.</p>",
   "passos": [
    [
     "Monte a busca no Google combinando os operadores \"site:\" e \"filetype:\" para essa tarefa.",
     "bolsa pesquisa edital site:ifs.edu.br filetype:pdf"
    ],
    [
     "Explique como você usaria o operador \"-\" para excluir editais de \"estágio\" da sua busca.",
     "Acrescentar -estágio à busca."
    ],
    [
     "Um colega recebeu um e-mail suspeito pedindo para clicar em um link para \"atualizar a senha\". Que cuidados ele deve ter antes de clicar?",
     "Não clicar; verificar o remetente, passar o mouse sobre o link, entrar no site digitando o endereço oficial e avisar o suporte."
    ],
    [
     "Explique a diferença entre colocar um professor em CC ou em CCO num e-mail sobre um projeto de grupo, e quando usar cada um.",
     "CC: o professor vê e todos sabem que ele recebeu; CCO: ele recebe sem que os outros saibam (útil para não expor e-mails)."
    ]
   ]
  },
  {
   "titulo": "Sua Empresa Sofreu uma Tentativa de Ataque",
   "cenario": "<p>Um funcionário recebeu um e-mail dizendo \"Sua conta será bloqueada em 24h, clique aqui para confirmar seus dados\" e quase clicou no link.</p>",
   "passos": [
    [
     "Identifique quais elementos desse e-mail são características típicas de um ataque de Phishing.",
     "Urgência (24h), ameaça de bloqueio, link para “confirmar dados”, remetente genérico."
    ],
    [
     "Explique quais das 5 camadas de defesa estudadas (endpoint, rede, atualização, humana, recuperação) falhou ou quase falhou nesse caso, e qual delas evitou o problema.",
     "A camada humana quase falhou e acabou evitando o problema; as demais (antivírus, filtro de e-mail) deixaram a mensagem passar."
    ],
    [
     "Se o funcionário tivesse clicado e um ransomware tivesse infectado a rede, por que ter um backup offline salvaria a empresa?",
     "Porque o ransomware não alcança uma cópia desconectada: basta limpar as máquinas e restaurar."
    ],
    [
     "Monte um checklist de 5 dicas para os funcionários identificarem e-mails de phishing no futuro.",
     "Desconfiar de urgência; conferir remetente; não clicar em links, digitar o endereço; nunca informar senha ou código; avisar o suporte."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Internet e segurança",
   "itens": [
    "URL, HTTP(S), download/upload.",
    "E-mail: CC × CCO.",
    "Busca: site:, filetype:, aspas, -.",
    "Malware, phishing, backup, 2FA."
   ]
  }
 ],
 "glossario": [
  [
   "2FA",
   "Segundo fator de autenticação."
  ],
  [
   "Nuvem",
   "Armazenamento em servidores na internet."
  ]
 ]
});
