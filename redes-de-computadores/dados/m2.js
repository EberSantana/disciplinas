FSI.modulo({
 "n": 2,
 "unidade": "Unidade II",
 "nome": "Camada de aplicação",
 "titulo": "HTTP, e-mail e DNS: os protocolos que você usa todo dia",
 "duracao": "8 h",
 "resumoCurto": "Cliente-servidor: Um servidor sempre ligado, com IP fixo e conhecido, atende requisições de clientes. É o modelo da Web, do e-mail e dos bancos de dados. P2P: Não há servidor central: cada computador é cliente e servidor",
 "analogia": {
  "titulo": "A lista telefônica e o balcão",
  "txt": "<p>Você não decora o número de telefone de todo mundo: consulta a agenda. O <b>DNS</b> é a agenda da internet — traduz <i>ifs.edu.br</i> num endereço IP. Depois, o navegador vai ao balcão do servidor e faz um pedido (<b>requisição HTTP</b>); o servidor responde com a página ou com um “não encontrado” (<b>404</b>).</p>"
 },
 "chave": [
  "<b>Cliente-servidor:</b> Um servidor sempre ligado, com IP fixo e conhecido, atende requisições de clientes. É o modelo da Web, do e-mail e dos bancos de dados.",
  "<b>P2P:</b> Não há servidor central: cada computador é cliente e servidor ao mesmo tempo. Ex.: BitTorrent e chamadas de vídeo.",
  "<b>HTTP:</b> Protocolo da Web. Métodos GET, POST, PUT, DELETE. Códigos 200 OK, 301 Moved, 404 Not Found, 500 Internal Server Error.",
  "<b>FTP:</b> Transfere arquivos com duas conexões TCP: controle (porta 21) e dados (porta 20). Hoje é substituído por SFTP e FTPS, que criptografam.",
  "<b>E-mail:</b> SMTP envia (cliente → servidor → servidor). POP3 baixa as mensagens e costuma apagá-las do servidor; IMAP gerencia no servidor, bom para vários dispositivos.",
  "<b>DNS:</b> Traduz nomes em IPs. É distribuído e hierárquico: servidor local → raiz → domínio de topo (.br, .com) → autoritativo. Usa cache."
 ],
 "objetivos": [
  "Comparar <b>cliente-servidor e P2P</b>.",
  "Ler requisições e respostas <b>HTTP</b>.",
  "Explicar <b>SMTP, POP3 e IMAP</b>.",
  "Descrever a resolução <b>DNS</b>."
 ],
 "licoes": [
  {
   "t": "Arquiteturas",
   "txt": "<p>No <b>cliente-servidor</b> um servidor sempre ligado atende muitos clientes (Web, e-mail). No <b>P2P</b> cada par é cliente e servidor (BitTorrent).</p>"
  },
  {
   "t": "HTTP e e-mail",
   "txt": "<p>HTTP: métodos GET, POST, PUT, DELETE; códigos 200, 301, 404, 500. E-mail: <b>SMTP</b> envia; <b>POP3</b> baixa; <b>IMAP</b> mantém no servidor e sincroniza.</p>"
  },
  {
   "t": "DNS",
   "txt": "<p>Banco distribuído e hierárquico: o resolvedor local pergunta à <b>raiz</b>, que indica o <b>TLD</b> (.br), que indica o servidor <b>autoritativo</b>, que responde o IP. Usa a porta 53.</p>"
  }
 ],
 "termos": [
  [
   "HTTP",
   "Protocolo da Web."
  ],
  [
   "DNS",
   "Traduz nomes em IPs."
  ],
  [
   "SMTP",
   "Envia e-mails."
  ],
  [
   "IMAP",
   "Lê e-mails no servidor."
  ]
 ],
 "ler": [
  [
   "Protocol Explorer: DNS, HTTP e TLS passo a passo (em inglês)",
   "https://protocol-explorer-alpha.vercel.app/"
  ],
  [
   "Console de estudo de Redes",
   "console-de-estudo.html"
  ],
  [
   "Atividades com ranking",
   "atividades.html"
  ],
  [
   "Subnetting na Prática",
   "subnetting-na-pratica.html"
  ],
  [
   "Mapa do Chamado (TCP/IP na prática)",
   "mapa-do-chamado.html"
  ]
 ],
 "visuais": [
  {
   "tipo": "sequencia",
   "id": "dns",
   "titulo": "Resolvendo ifs.edu.br",
   "atores": [
    "Navegador",
    "DNS local",
    "Raiz",
    "TLD .br",
    "Autoritativo"
   ],
   "passos": [
    {
     "de": 0,
     "para": 1,
     "t": "Qual o IP de ifs.edu.br?",
     "d": "O navegador pergunta ao resolvedor configurado."
    },
    {
     "de": 1,
     "para": 2,
     "t": "ifs.edu.br?",
     "d": "A raiz não sabe o IP, mas sabe quem cuida do .br."
    },
    {
     "de": 2,
     "para": 1,
     "t": "Pergunte ao .br",
     "d": "Indicação do servidor de domínio de topo."
    },
    {
     "de": 1,
     "para": 3,
     "t": "ifs.edu.br?",
     "d": "O .br indica o servidor autoritativo do domínio."
    },
    {
     "de": 1,
     "para": 4,
     "t": "ifs.edu.br?",
     "d": "O autoritativo sabe a resposta."
    },
    {
     "de": 4,
     "para": 1,
     "t": "IP: 200.17.141.20",
     "d": "Resposta guardada em cache."
    },
    {
     "de": 1,
     "para": 0,
     "t": "200.17.141.20",
     "d": "Agora o navegador abre a conexão HTTP."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Seja o suporte técnico: interprete códigos HTTP e escolha protocolos.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Suporte de aplicação",
    "cfg": {
     "id": "ap",
     "rotulo": "Chamado",
     "medidor": {
      "nome": "Chamados resolvidos",
      "ini": 50
     },
     "itens": [
      {
       "t": "O aluno abre um link e vê “404”.",
       "ops": [
        [
         "A página não existe no servidor (Not Found)",
         true,
         "O servidor respondeu, mas o recurso não existe."
        ],
        [
         "O servidor caiu",
         false,
         "Seria 5xx ou sem resposta."
        ],
        [
         "Falta internet",
         false,
         "Houve resposta HTTP."
        ]
       ]
      },
      {
       "t": "O site mostra “500” depois de enviar o formulário.",
       "ops": [
        [
         "Erro interno do servidor",
         true,
         "Problema do lado do servidor."
        ],
        [
         "O aluno digitou errado",
         false,
         "Seria 4xx."
        ],
        [
         "Página movida",
         false,
         "Seria 301."
        ]
       ]
      },
      {
       "t": "A professora lê e-mails no celular e no notebook e quer ver tudo sincronizado.",
       "ops": [
        [
         "IMAP",
         true,
         "As mensagens ficam no servidor."
        ],
        [
         "POP3",
         false,
         "Baixa e costuma apagar do servidor."
        ],
        [
         "SMTP",
         false,
         "SMTP só envia."
        ]
       ]
      },
      {
       "t": "O site abre pelo IP, mas não pelo nome.",
       "ops": [
        [
         "Problema de DNS",
         true,
         "A tradução nome → IP falhou."
        ],
        [
         "Problema no cabo",
         false,
         "Pelo IP funciona."
        ],
        [
         "Problema no HTTP",
         false,
         "O HTTP funciona pelo IP."
        ]
       ]
      },
      {
       "t": "É preciso administrar o servidor Linux remotamente com segurança.",
       "ops": [
        [
         "SSH (porta 22)",
         true,
         "Sessão criptografada."
        ],
        [
         "Telnet (porta 23)",
         false,
         "Envia tudo em texto claro."
        ],
        [
         "FTP",
         false,
         "FTP transfere arquivos."
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
    "t": "Resolva 3 chamados",
    "ev": "ap:acertos:3"
   },
   {
    "id": "m2",
    "t": "Resolva todos sem erro",
    "ev": "ap:perfeito"
   },
   {
    "id": "m3",
    "t": "Acompanhe a resolução DNS inteira (Explorar)",
    "ev": "vis:dns"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "Camada de Aplicação",
   "A camada mais próxima do usuário, onde rodam navegadores, e-mail, jogos e mensageiros."
  ],
  [
   "HTTP",
   "HyperText Transfer Protocol: protocolo que transfere páginas da Web. Porta 80."
  ],
  [
   "HTTPS",
   "HTTP seguro, com criptografia. Porta 443."
  ],
  [
   "GET × POST",
   "GET pede um recurso; POST envia dados ao servidor, como um formulário."
  ],
  [
   "404 Not Found",
   "O recurso pedido não existe no servidor."
  ],
  [
   "FTP · portas",
   "21 para controle (comandos) e 20 para dados (arquivos)."
  ],
  [
   "SFTP e FTPS",
   "Alternativas seguras ao FTP: sobre SSH e sobre SSL/TLS."
  ],
  [
   "SMTP",
   "Simple Mail Transfer Protocol: envia e-mails. Porta 25."
  ],
  [
   "POP3",
   "Baixa os e-mails para o computador e geralmente apaga do servidor."
  ],
  [
   "IMAP",
   "Acessa e organiza os e-mails no próprio servidor. Ideal para vários dispositivos."
  ],
  [
   "DNS",
   "Traduz nomes de domínio em endereços IP. Usa a porta 53."
  ],
  [
   "Servidor autoritativo",
   "Servidor DNS responsável por um domínio específico; é ele que dá a resposta final com o IP."
  ]
 ],
 "vf": [
  [
   "No modelo cliente-servidor, o servidor precisa estar sempre ligado e ter um endereço conhecido.",
   true,
   "Verdadeiro. O servidor espera requisições de muitos clientes, então precisa estar disponível e com IP fixo e conhecido."
  ],
  [
   "No P2P existe um servidor central que coordena toda a troca de arquivos.",
   false,
   "Falso. No P2P <b>não há servidor central</b>: os computadores falam diretamente e cada um é cliente e servidor."
  ],
  [
   "O método POST é usado para enviar dados de um formulário ao servidor.",
   true,
   "Verdadeiro. GET pede um recurso; POST envia dados."
  ],
  [
   "O código HTTP 500 indica que a página pedida não foi encontrada.",
   false,
   "Falso. Página não encontrada é o <b>404</b>. O 500 é um erro interno do servidor."
  ],
  [
   "O FTP transfere arquivos pela porta 21.",
   false,
   "Falso. A porta 21 é a conexão de <b>controle</b> (comandos). Os arquivos passam pela conexão de dados, na porta <b>20</b>."
  ],
  [
   "SFTP e FTPS criptografam os dados durante a transferência.",
   true,
   "Verdadeiro. Por isso estão substituindo o FTP tradicional."
  ],
  [
   "O SMTP é usado tanto para enviar quanto para ler e-mails na caixa de entrada.",
   false,
   "Falso. O SMTP <b>envia</b> (cliente → servidor e servidor → servidor). Para ler, usam-se POP3 ou IMAP."
  ],
  [
   "Com IMAP, as mensagens ficam no servidor e podem ser vistas de vários dispositivos.",
   true,
   "Verdadeiro. É a melhor opção para quem usa celular e computador."
  ],
  [
   "O DNS é um banco de dados centralizado em um único servidor mundial.",
   false,
   "Falso. O DNS é <b>distribuído e hierárquico</b>: raiz, domínios de topo e servidores autoritativos."
  ],
  [
   "Na consulta DNS, o servidor raiz devolve diretamente o IP do site pedido.",
   false,
   "Falso. A raiz apenas <b>indica</b> o servidor do domínio de topo (.br, .com), que indica o autoritativo. É o autoritativo que devolve o IP."
  ],
  [
   "O cache do DNS acelera as próximas consultas ao mesmo nome.",
   true,
   "Verdadeiro. A resposta guardada evita repetir todo o caminho da consulta."
  ],
  [
   "O HTTP funciona no modelo cliente-servidor.",
   true,
   "Verdadeiro. O navegador é o cliente; o servidor web responde às requisições."
  ]
 ],
 "caderno": [
  [
   "Diferencie a arquitetura cliente-servidor da arquitetura P2P e dê um exemplo de cada.",
   "Cliente-servidor: um servidor sempre ligado, com IP fixo e conhecido, espera requisições de clientes (ex.: acessar o Google, e-mail). P2P: não há servidor central, os computadores se comunicam diretamente e cada um é cliente e servidor (ex.: BitTorrent, chamadas de vídeo)."
  ],
  [
   "Descreva os três passos que acontecem quando você acessa uma página web.",
   "1) O navegador (cliente) envia uma requisição HTTP ao servidor web. 2) O servidor processa e responde com o conteúdo (HTML, imagens, CSS, JavaScript). 3) O navegador renderiza o conteúdo e exibe a página."
  ],
  [
   "Para que serve cada método HTTP: GET, POST, PUT e DELETE?",
   "GET solicita um recurso (carregar página). POST envia dados (formulário). PUT atualiza um recurso existente. DELETE remove um recurso."
  ],
  [
   "O que significam os códigos 200, 301, 404 e 500?",
   "200 OK: sucesso. 301 Moved: o recurso mudou de endereço permanentemente. 404 Not Found: o recurso não existe no servidor. 500 Internal Server Error: erro interno no servidor."
  ],
  [
   "Explique a analogia do garçom para o HTTP, incluindo o erro 404.",
   "Você (cliente) faz o pedido (GET) ao garçom, que leva à cozinha (servidor web). A cozinha prepara o prato (página) e o garçom traz à mesa (200 OK). Se o prato não existe no cardápio, o garçom avisa: é o 404."
  ],
  [
   "Por que se diz que o FTP usa duas conexões? Quais portas e para quê?",
   "Porque abre uma conexão de controle na porta 21, ativa a sessão inteira, para comandos (usuário, senha, listar, pedir arquivos), e uma conexão de dados na porta 20, aberta para cada arquivo e fechada ao fim da transferência."
  ],
  [
   "Por que o FTP está sendo substituído? Cite as alternativas.",
   "Porque o FTP não criptografa os dados, inclusive usuário e senha. As alternativas SFTP (sobre SSH) e FTPS (FTP sobre SSL/TLS) criptografam a transferência."
  ],
  [
   "Quais são os três componentes do sistema de e-mail?",
   "Agentes de usuário (Outlook, Thunderbird, Gmail), servidores de correio e protocolos de comunicação (SMTP, POP3, IMAP)."
  ],
  [
   "Descreva o caminho de um e-mail do remetente até a caixa do destinatário.",
   "O cliente do remetente envia ao seu servidor por SMTP. Esse servidor se conecta ao servidor do destinatário, também por SMTP, e entrega a mensagem. Ela fica guardada até o destinatário acessá-la por POP3 ou IMAP."
  ],
  [
   "Qual a diferença entre POP3 e IMAP? Qual você recomendaria para quem lê e-mail no celular e no notebook?",
   "POP3 baixa as mensagens para o computador e geralmente as remove do servidor. IMAP permite ler e organizar direto no servidor, sem baixar. Para vários dispositivos, IMAP, porque todos veem a mesma caixa."
  ],
  [
   "Por que o DNS é chamado de “lista telefônica da internet”?",
   "Porque traduz nomes fáceis de lembrar (www.google.com.br) nos endereços IP numéricos que os computadores usam, assim como a agenda do celular liga um nome a um número."
  ],
  [
   "Descreva as quatro etapas de uma consulta DNS.",
   "1) O computador pergunta ao servidor DNS local (do provedor). 2) Se ele não sabe, consulta um servidor raiz. 3) A raiz indica o servidor do domínio de topo (.br, .com). 4) Esse indica o servidor autoritativo do domínio, que devolve o IP. O resultado fica em cache."
  ],
  [
   "Para que serve o cache no DNS?",
   "Guarda as respostas de consultas já feitas para que as próximas sejam respondidas mais rápido, sem repetir todo o caminho até o servidor autoritativo."
  ],
  [
   "Explique o que acontece quando você digita <code>www.ifs.edu.br</code> e pressiona Enter, citando DNS e HTTP.",
   "O navegador precisa do IP: consulta o DNS (cache, servidor local, raiz, .br, autoritativo) e recebe o endereço. Depois abre a conexão com o servidor e envia uma requisição HTTP GET. O servidor responde (200 OK) com HTML, CSS, imagens e scripts, e o navegador renderiza a página."
  ]
 ],
 "pbl": [
  {
   "titulo": "Detetive das requisições",
   "cenario": "O site do grêmio estudantil está lento e algumas imagens não aparecem. O presidente do grêmio pediu à turma um diagnóstico usando só o navegador e o prompt de comando.<p><b>Problema:</b> Usando as ferramentas do navegador (F12 › Rede) e o <code>nslookup</code>, como descobrir o que acontece quando a página carrega e onde estão os erros?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>Quantas requisições a página faz e quais métodos aparecem?</li><li>Existem respostas 301, 404 ou 500? O que cada uma indica?</li><li>Qual é o IP do servidor? O <code>nslookup</code> devolve o mesmo IP para outros sites do mesmo provedor?</li><li>O site usa HTTP ou HTTPS? Por que isso importa?</li></ol><p><b>Entregáveis:</b></p><ul><li>Tabela com pelo menos 8 requisições: método, código, URL e tamanho</li><li>Resultado do <code>nslookup</code> para o site e mais 4 domínios</li><li>Relatório de 1 página com o diagnóstico e as recomendações</li></ul>",
     "<ul><li>Tabela preenchida a partir da aba Rede: a maioria das requisições é GET com 200; imagens ausentes aparecem com <b>404</b> (arquivo com nome ou caminho errado); redirecionamentos de http para https aparecem como <b>301</b>.</li><li>O <code>nslookup</code> mostra o servidor DNS consultado e o IP resolvido; é o passo que acontece antes do HTTP.</li><li>Recomendações: corrigir os caminhos das imagens que dão 404, reduzir o tamanho das imagens grandes, usar HTTPS (porta 443) e verificar erros 500 com o responsável pelo servidor.</li></ul>"
    ]
   ]
  },
  {
   "titulo": "E-mail da secretaria",
   "cenario": "A secretaria do campus usa uma conta de e-mail configurada com POP3 em um único computador. Agora as servidoras precisam ler e responder as mensagens também pelo celular, e reclamam que “os e-mails somem”.<p><b>Problema:</b> Por que os e-mails “somem” e como reconfigurar o acesso para funcionar em vários dispositivos com segurança?</p>",
   "passos": [
    [
     "Responda no caderno:<ol><li>O que o POP3 faz com as mensagens depois do download?</li><li>Qual protocolo permite ver a mesma caixa em vários aparelhos?</li><li>Quais servidores e portas precisam ser configurados para envio e recebimento?</li><li>Como evitar que a senha trafegue sem proteção?</li></ol><p><b>Entregáveis:</b></p><ul><li>Diagrama do caminho de um e-mail do remetente até a secretaria</li><li>Ficha de configuração (servidor de envio e de recebimento) para computador e celular</li><li>Guia de uma página para as servidoras</li></ul>",
     "<ul><li>Causa: o POP3 baixa as mensagens para o computador e geralmente as <b>apaga do servidor</b>, então o celular não as encontra.</li><li>Solução: trocar para <b>IMAP</b> em todos os aparelhos; as mensagens ficam no servidor e aparecem iguais em todos.</li><li>Envio continua por <b>SMTP</b>; configurar as versões com criptografia (SSL/TLS) oferecidas pelo provedor.</li><li>Diagrama: cliente do remetente → SMTP → servidor do remetente → SMTP → servidor do campus → IMAP → computador e celular da secretaria.</li></ul>"
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Aplicação",
   "itens": [
    "Cliente-servidor × P2P.",
    "HTTP: métodos e códigos.",
    "SMTP envia; POP3/IMAP leem.",
    "DNS: raiz → TLD → autoritativo."
   ]
  }
 ],
 "glossario": [
  [
   "URL",
   "Endereço de um recurso."
  ],
  [
   "Cache DNS",
   "Respostas guardadas para reutilizar."
  ]
 ]
});
