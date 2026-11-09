FSI.modulo({
 "n": 3,
 "unidade": "Pilares",
 "nome": "Os três pilares",
 "titulo": "Confidencialidade, integridade e disponibilidade — e o hash",
 "duracao": "6 h",
 "resumoCurto": "Confidencialidade: Informação acessível apenas a pessoas autorizadas. Controles: criptografia, controle de acesso, autenticação forte (2FA). Integridade: Informação não alterada de forma não autorizada, intencional ou ac",
 "analogia": {
  "titulo": "A carta selada",
  "txt": "<p>Uma carta lacrada com cera: ninguém lê no caminho (<b>confidencialidade</b>), se o lacre estiver rompido você sabe que mexeram (<b>integridade</b>) e ela precisa chegar a tempo (<b>disponibilidade</b>). O selo com o brasão do remetente prova quem enviou (<b>autenticidade</b>) e ele não pode negar depois (<b>não-repúdio</b>). O <b>hash</b> é o lacre digital.</p>"
 },
 "chave": [
  "<b>Confidencialidade:</b> Informação acessível apenas a pessoas autorizadas. Controles: criptografia, controle de acesso, autenticação forte (2FA).",
  "<b>Integridade:</b> Informação não alterada de forma não autorizada, intencional ou acidental. Controles: hash criptográfico, assinatura digital, auditoria de mudanças.",
  "<b>Disponibilidade:</b> Informação acessível quando necessário para quem é autorizado. Controles: redundância, backup e recuperação, monitoramento, manutenção.",
  "<b>Princípios complementares:</b> Autenticidade (origem identificada), Não-repúdio (autor não pode negar), Controle de acesso (permitir ou negar), Auditoria (o que foi feito, por quem e quando).",
  "<b>Hash:</b> Algoritmo que mapeia dados de tamanho variável para um resumo de tamanho fixo. MD5 (128 bits) e SHA-1 (160 bits) são inseguros; SHA-256 e SHA-512 (SHA-2) e SHA-3 são recomendados.",
  "<b>Ataques e pilares:</b> Interceptar a mensagem fere a confidencialidade; modificá-la fere a integridade; derrubar a conexão fere a disponibilidade."
 ],
 "objetivos": [
  "Explicar <b>C, I e D</b> e os princípios complementares.",
  "Relacionar ataques aos pilares que ferem.",
  "Usar o <b>hash</b> para verificar integridade."
 ],
 "licoes": [
  {
   "t": "Os pilares",
   "txt": "",
   "pontos": [
    "<b>Confidencialidade</b>: só quem pode, acessa — criptografia, controle de acesso.",
    "<b>Integridade</b>: sem alteração indevida — hash, assinatura digital.",
    "<b>Disponibilidade</b>: acessível quando preciso — redundância, backup, proteção contra DoS.",
    "Complementares: <b>autenticidade, não-repúdio</b>, controle de acesso e auditoria."
   ]
  },
  {
   "t": "Hash",
   "txt": "<p>Função que transforma qualquer dado num resumo de tamanho fixo. Mudar uma vírgula muda o resumo inteiro (<b>efeito avalanche</b>) e não dá para voltar do resumo ao original. MD5 e SHA-1 estão quebrados; use <b>SHA-256</b>. Sites publicam o hash dos arquivos para você conferir o download.</p>"
  }
 ],
 "termos": [
  [
   "Integridade",
   "Sem alteração não autorizada."
  ],
  [
   "Disponibilidade",
   "Acessível quando necessário."
  ],
  [
   "Hash",
   "Resumo de tamanho fixo."
  ],
  [
   "Não-repúdio",
   "O autor não pode negar."
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
   "id": "jogo-pil",
   "titulo": "Jogo: qual pilar foi ferido?",
   "cats": [
    "Confidencialidade",
    "Integridade",
    "Disponibilidade"
   ],
   "itens": [
    [
     "Vazamento das notas dos alunos",
     0
    ],
    [
     "Alguém lê o e-mail da diretora",
     0
    ],
    [
     "Nota alterada no sistema sem autorização",
     1
    ],
    [
     "Boleto com código de barras adulterado",
     1
    ],
    [
     "Site da escola fora do ar por DDoS",
     2
    ],
    [
     "Servidor queimado sem backup",
     2
    ],
    [
     "Espião capturando o Wi-Fi sem senha",
     0
    ]
   ]
  }
 ],
 "lab": {
  "intro": "Faça o papel de verificador: compare arquivos pelo hash e descubra se foram alterados.",
  "sims": [
   {
    "tipo": "hash",
    "titulo": "Verificador de integridade (SHA-256)",
    "instr": "Altere uma única letra ou vírgula do arquivo recebido e veja o que acontece com o resumo.",
    "cfg": {
     "id": "h"
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Calcule um hash",
    "ev": "h:calculou"
   },
   {
    "id": "m2",
    "t": "Altere o arquivo e detecte a mudança",
    "ev": "h:detectou"
   },
   {
    "id": "m3",
    "t": "Mude só uma letra e veja o efeito avalanche",
    "ev": "h:avalanche"
   },
   {
    "id": "m4",
    "t": "Resolva o jogo dos pilares (Explorar)",
    "ev": "vis:jogo-pil"
   }
  ],
  "guiados": [
   {
    "titulo": "Tamanho de um hash",
    "txt": "<p>O SHA-256 gera <b>256 bits</b>. Cada caractere hexadecimal representa 4 bits.</p>",
    "passos": [
     {
      "p": "Quantos caracteres hexadecimais tem um SHA-256?",
      "r": 64,
      "dica": "256 ÷ 4.",
      "expl": "64 — confira no laboratório."
     },
     {
      "p": "E um MD5, de 128 bits?",
      "r": 32,
      "dica": "128 ÷ 4.",
      "expl": "32 caracteres."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Confidencialidade",
   "Informação acessível apenas a pessoas, processos ou recursos autorizados."
  ],
  [
   "Integridade",
   "Proteção contra alterações não autorizadas, intencionais ou acidentais."
  ],
  [
   "Disponibilidade",
   "Usuários autorizados acessam sistemas e dados quando e onde necessário."
  ],
  [
   "Autenticidade",
   "A origem ou o autor de uma mensagem é corretamente identificado."
  ],
  [
   "Não-repúdio",
   "O autor de uma mensagem ou ação não pode negar tê-la realizado."
  ],
  [
   "Controle de acesso",
   "Capacidade de permitir ou negar acesso a serviços e recursos do sistema."
  ],
  [
   "Auditoria",
   "Verificar o que foi feito, por quem, quando e o que foi afetado."
  ],
  [
   "Hash",
   "Algoritmo que gera um resumo de tamanho fixo a partir de dados de qualquer tamanho; de mão única."
  ],
  [
   "Colisão de hash",
   "Duas entradas diferentes que geram o mesmo hash. MD5 e SHA-1 são vulneráveis."
  ],
  [
   "SHA-256",
   "Função hash da família SHA-2 que gera 256 bits; uma das mais usadas atualmente."
  ],
  [
   "Assinatura digital",
   "Hash do documento cifrado com a chave privada do autor: garante integridade, autenticidade e não-repúdio."
  ],
  [
   "2FA",
   "Autenticação com dois fatores de tipos diferentes: sabe, tem, é."
  ]
 ],
 "vf": [
  [
   "Interceptar uma mensagem em trânsito, sem alterá-la, é um ataque à integridade.",
   false,
   "Falso. Apenas ler sem autorização é ataque à confidencialidade; alterar é que fere a integridade."
  ],
  [
   "A função hash permite recuperar o texto original a partir do resumo.",
   false,
   "Falso. O hash é de mão única; não é possível reverter para o dado original."
  ],
  [
   "Backups e redundância de sistemas são controles de disponibilidade.",
   true,
   "Verdadeiro. Garantem que a informação continue acessível mesmo após falhas."
  ],
  [
   "MD5 gera hash de 128 bits e é considerado seguro para aplicações críticas.",
   false,
   "Falso. Gera 128 bits, mas é vulnerável a colisões e inadequado para aplicações críticas."
  ],
  [
   "A assinatura digital garante integridade, autenticidade e não-repúdio.",
   true,
   "Verdadeiro. Combina hash (integridade) com a chave privada do autor (autenticidade e não-repúdio)."
  ],
  [
   "Em qualquer organização, confidencialidade é sempre o pilar mais importante.",
   false,
   "Falso. A prioridade varia: em bancos, integridade e auditoria costumam vir primeiro; em universidades, integridade e disponibilidade."
  ],
  [
   "Se dois arquivos têm o mesmo hash SHA-256, é praticamente certo que são idênticos.",
   true,
   "Verdadeiro. Colisões em SHA-256 são computacionalmente inviáveis na prática atual."
  ],
  [
   "Mudar uma única letra de um documento altera apenas um caractere do seu hash.",
   false,
   "Falso. Pelo efeito avalanche, o hash muda completamente."
  ],
  [
   "Um ataque DDoS que tira um site do ar compromete a disponibilidade.",
   true,
   "Verdadeiro. O serviço deixa de estar acessível aos usuários autorizados."
  ],
  [
   "Não-repúdio significa que o autor pode negar ter enviado uma mensagem se quiser.",
   false,
   "Falso. É exatamente o contrário: garante que ele não possa negar."
  ],
  [
   "O comando certutil -hashfile arquivo SHA256 gera o hash SHA-256 de um arquivo no Windows.",
   true,
   "Verdadeiro. É o comando apresentado em aula para validar a integridade de downloads."
  ],
  [
   "Autenticação com senha e PIN é um exemplo de 2FA.",
   false,
   "Falso. Senha e PIN são do mesmo tipo (algo que você sabe); 2FA exige fatores de categorias diferentes."
  ]
 ],
 "caderno": [
  [
   "Defina cada pilar da tríade CID e dê um controle para cada um.",
   "Confidencialidade: só autorizados acessam (criptografia). Integridade: a informação não é alterada sem autorização (hash / assinatura digital). Disponibilidade: a informação está acessível quando necessário (backup e redundância)."
  ],
  [
   "Para os objetos carro, celular e conta bancária, descreva o que seria a quebra de C, I e D em cada um (atividade da aula).",
   "Carro — C: alguém lê o histórico de localização do GPS; I: adulteram o hodômetro; D: roubam o carro ou a bateria descarrega. Celular — C: alguém lê suas mensagens; I: um app altera contatos; D: celular bloqueado por ransomware. Conta bancária — C: vazamento do saldo e extrato; I: transferência não autorizada altera o saldo; D: app do banco fora do ar."
  ],
  [
   "Um atacante intercepta, altera e depois derruba uma conexão. Quais pilares foram atingidos em cada etapa?",
   "Interceptar: confidencialidade. Alterar: integridade. Derrubar a conexão: disponibilidade."
  ],
  [
   "Diferencie autenticidade de não-repúdio.",
   "Autenticidade garante que a origem ou o autor da mensagem é quem diz ser. Não-repúdio garante que o autor não pode negar depois que enviou a mensagem ou realizou a ação. A assinatura digital oferece os dois."
  ],
  [
   "O que é uma função hash e quais propriedades a tornam útil para verificar integridade?",
   "É um algoritmo que transforma dados de qualquer tamanho em um resumo de tamanho fixo. Propriedades: determinística (mesma entrada, mesmo hash), pequena mudança na entrada gera hash totalmente diferente (efeito avalanche), é de mão única (não se volta ao original) e resistente a colisões."
  ],
  [
   "Por que MD5 e SHA-1 não são mais recomendados?",
   "Porque são vulneráveis a ataques de colisão: é possível gerar dois arquivos diferentes com o mesmo hash, o que permite falsificar um arquivo mantendo o hash “válido”."
  ],
  [
   "Escreva o comando para validar o hash SHA-256 de um arquivo no Windows e explique como interpretar o resultado.",
   "certutil -hashfile C:\\Users\\Aluno\\Downloads\\arquivo.iso SHA256. Compara-se o hash exibido com o publicado pelo site oficial: se forem idênticos, o arquivo está íntegro; se diferirem, o arquivo foi corrompido ou adulterado e não deve ser usado."
  ],
  [
   "Em um banco, quais pilares costumam ser mais críticos? E em uma universidade? Por quê?",
   "Banco: integridade e auditoria (um centavo errado ou uma transação sem rastro é grave), seguidos de confidencialidade e disponibilidade. Universidade: integridade (notas, diplomas) e disponibilidade (sistemas acadêmicos no período de matrícula). A prioridade depende do negócio."
  ],
  [
   "Explique o que é autenticação de dois fatores (2FA) e cite os três tipos de fator.",
   "É exigir duas provas de identidade de categorias diferentes. Fatores: algo que você sabe (senha, PIN), algo que você tem (celular, token), algo que você é (biometria). Reforça a confidencialidade mesmo se a senha vazar."
  ],
  [
   "Como a assinatura digital combina hash e criptografia?",
   "Calcula-se o hash do documento e cifra-se esse hash com a chave privada do autor. Quem recebe decifra com a chave pública e compara com o hash que ele mesmo calcula: se forem iguais, o documento é íntegro (integridade) e veio do dono da chave (autenticidade e não-repúdio)."
  ],
  [
   "O que é auditoria como princípio de segurança?",
   "É a capacidade de verificar as atividades do sistema e determinar o que foi feito, por quem, quando e o que foi afetado, por meio de logs e trilhas de auditoria."
  ],
  [
   "Cite duas medidas para garantir disponibilidade de um site de inscrições em época de alto acesso.",
   "Redundância (mais de um servidor com balanceamento de carga ou nuvem com autoescalonamento), CDN e proteção contra DDoS, monitoramento com alertas e backup com plano de recuperação testado."
  ]
 ],
 "pbl": [
  {
   "titulo": "A ISO que veio do espelho",
   "cenario": "Um professor baixou a ISO de uma distribuição Linux de um site espelho não oficial para instalar no laboratório. O site oficial publica o SHA-256 da imagem. Após a instalação, as máquinas começaram a enviar tráfego estranho.",
   "passos": [
    [
     "<ol><li>Qual pilar foi comprometido e como isso poderia ter sido evitado?</li><li>Descreva o passo a passo de validação no Windows e no Linux.</li><li>Que política o laboratório deveria adotar?</li></ol>",
     "Pilar: integridade (e autenticidade da origem). Evitaria-se comparando o hash do arquivo com o hash oficial antes de instalar. Windows: certutil -hashfile imagem.iso SHA256; Linux: sha256sum imagem.iso; comparar com o valor do site oficial. Política: baixar só de fontes oficiais, validar hash e, se disponível, a assinatura GPG, e registrar a validação antes de instalar."
    ]
   ]
  },
  {
   "titulo": "Tríade na sala de aula",
   "cenario": "Em grupos, escolham 3 objetos ou serviços do dia a dia (carro, celular, conta bancária, ou outros) e analisem a quebra de cada pilar.",
   "passos": [
    [
     "<ol><li>Preencha uma matriz 3×3 (objeto × pilar).</li><li>Para cada quebra, proponha um controle.</li><li>Apresente o caso mais crítico.</li></ol>",
     "Rubrica: matriz completa com 9 células coerentes (C = acesso indevido, I = alteração indevida, D = indisponibilidade); controle adequado para cada célula (ex.: senha/biometria para C, hash/log para I, backup/redundância para D); justificativa do caso mais crítico considerando impacto."
    ]
   ]
  },
  {
   "titulo": "Nota alterada no sistema",
   "cenario": "Um aluno alega que sua nota foi alterada de 8,5 para 5,0 depois do fechamento do diário. O professor diz que não mexeu. O sistema não guarda histórico de alterações.",
   "passos": [
    [
     "<ol><li>Quais princípios de segurança faltaram?</li><li>Como provar quem alterou a nota?</li><li>Desenhe uma solução técnica e de processo.</li></ol>",
     "Faltaram integridade, auditoria e não-repúdio. Sem logs não é possível provar quem alterou. Solução: trilha de auditoria (usuário, data, hora, valor antigo e novo, IP), bloqueio de edição após fechamento com fluxo de solicitação formal, autenticação individual forte (2FA) e, opcionalmente, hash por registro para detectar adulteração direta no banco."
    ]
   ]
  },
  {
   "titulo": "Black Friday fora do ar",
   "cenario": "Uma loja virtual regional ficou 6 horas fora do ar na Black Friday. Era um único servidor, sem monitoramento, e o backup mais recente tinha 15 dias.",
   "passos": [
    [
     "<ol><li>Qual pilar foi afetado e qual o impacto?</li><li>Proponha uma arquitetura mínima de alta disponibilidade.</li><li>Defina uma política de backup (frequência, local, teste).</li></ol>",
     "Pilar: disponibilidade; impacto: vendas perdidas, reputação e possível perda de dados de pedidos. Arquitetura: 2 servidores ou nuvem com balanceador, banco com réplica, CDN, monitoramento com alerta por celular. Backup: diário (ou contínuo para o banco), regra 3-2-1 (3 cópias, 2 mídias, 1 fora do local) e teste de restauração mensal."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Pilares",
   "itens": [
    "CID + autenticidade e não-repúdio.",
    "Interceptar fere C; modificar fere I; derrubar fere D.",
    "Hash SHA-256 verifica integridade."
   ]
  }
 ],
 "glossario": [
  [
   "Efeito avalanche",
   "Mudança mínima, resumo totalmente diferente."
  ],
  [
   "Certificado digital",
   "Liga uma chave pública a uma identidade."
  ]
 ]
});
