FSI.modulo({
 "n": 4,
 "unidade": "Pilares",
 "nome": "Ciclo de vida da informação",
 "titulo": "Da criação ao descarte: proteger em cada fase",
 "duracao": "3 h",
 "resumoCurto": "1. Criação / Aquisição: Classificar a informação, definir o nível de sensibilidade e implementar os controles iniciais. 2. Processamento: Dados em uso. Aplicar controles de integridade, manter logs de acesso e monitorar ",
 "analogia": {
  "titulo": "A prova do professor",
  "txt": "<p>A prova é <b>criada</b> no computador do professor, <b>processada</b> na impressora, <b>armazenada</b> no armário, <b>transmitida</b> para a sala e, depois de corrigida, <b>descartada</b>. Se alguém pega o rascunho no lixo da sala dos professores, de nada adiantou trancar o armário: cada fase precisa do seu cuidado.</p>"
 },
 "chave": [
  "<b>1. Criação / Aquisição:</b> Classificar a informação, definir o nível de sensibilidade e implementar os controles iniciais.",
  "<b>2. Processamento:</b> Dados em uso. Aplicar controles de integridade, manter logs de acesso e monitorar modificações.",
  "<b>3. Armazenamento:</b> Dados em repouso. Criptografia em repouso, backups e controle de acesso físico e lógico.",
  "<b>4. Transmissão:</b> Dados em trânsito. Criptografia em trânsito (TLS, VPN), autenticação e não-repúdio.",
  "<b>5. Destruição:</b> Descarte seguro (sobrescrita, desmagnetização, trituração), documentar o processo e cumprir requisitos legais.",
  "<b>Estados dos dados:</b> Em processo (sendo usados), em repouso (armazenados) e em trânsito (trafegando entre sistemas)."
 ],
 "objetivos": [
  "Listar as <b>cinco fases</b> do ciclo de vida.",
  "Associar os <b>três estados</b> dos dados aos controles.",
  "Escolher métodos de <b>descarte seguro</b>."
 ],
 "licoes": [
  {
   "t": "Fases e estados",
   "txt": "<p>Criação, processamento, armazenamento, transmissão e destruição. Os dados estão <b>em uso</b>, <b>em repouso</b> ou <b>em trânsito</b> — e cada estado pede um controle: monitoramento e integridade, criptografia em repouso e backup, TLS/VPN.</p>"
  },
  {
   "t": "Descarte seguro",
   "txt": "<p>Apagar um arquivo não destrói o dado. Use sobrescrita, desmagnetização ou destruição física (trituração) e registre o descarte — a LGPD exige.</p>"
  }
 ],
 "termos": [
  [
   "Em repouso",
   "Armazenado."
  ],
  [
   "Em trânsito",
   "Trafegando pela rede."
  ],
  [
   "Em uso",
   "Sendo processado."
  ],
  [
   "Sanitização",
   "Remoção irrecuperável."
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
   "id": "ciclo",
   "titulo": "O ciclo de vida",
   "ordenar": true,
   "passos": [
    {
     "t": "Criação",
     "d": "Classificar e definir controles."
    },
    {
     "t": "Processamento",
     "d": "Integridade e logs."
    },
    {
     "t": "Armazenamento",
     "d": "Criptografia em repouso e backup."
    },
    {
     "t": "Transmissão",
     "d": "TLS, VPN, autenticação."
    },
    {
     "t": "Destruição",
     "d": "Descarte seguro e documentado."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Qual controle cabe em cada fase?",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-fase",
    "titulo": "Controle certo na fase certa",
    "cats": [
     "Armazenamento",
     "Transmissão",
     "Destruição"
    ],
    "itens": [
     [
      "Criptografar o HD do notebook",
      0
     ],
     [
      "Backup em outro local",
      0
     ],
     [
      "Usar HTTPS no formulário",
      1
     ],
     [
      "VPN para acessar o sistema de casa",
      1
     ],
     [
      "Triturar provas antigas",
      2
     ],
     [
      "Sobrescrever o disco antes de doar o PC",
      2
     ]
    ]
   },
   {
    "tipo": "linha",
    "id": "lab-ciclo",
    "titulo": "Ordene o ciclo",
    "ordenar": true,
    "passos": [
     {
      "t": "Criação",
      "d": ""
     },
     {
      "t": "Processamento",
      "d": ""
     },
     {
      "t": "Armazenamento",
      "d": ""
     },
     {
      "t": "Transmissão",
      "d": ""
     },
     {
      "t": "Destruição",
      "d": ""
     }
    ]
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Classifique os controles por fase",
    "ev": "vis:lab-fase"
   },
   {
    "id": "m2",
    "t": "Ordene o ciclo de vida",
    "ev": "ord:lab-ciclo"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "Ciclo de vida da informação",
   "Criação/Aquisição → Processamento → Armazenamento → Transmissão → Destruição."
  ],
  [
   "Criação/Aquisição",
   "Classificar, definir sensibilidade e aplicar controles iniciais."
  ],
  [
   "Processamento",
   "Dados em uso: controles de integridade, logs de acesso e monitoramento de modificações."
  ],
  [
   "Armazenamento",
   "Dados em repouso: criptografia em repouso, backup e controle de acesso físico/lógico."
  ],
  [
   "Transmissão",
   "Dados em trânsito: TLS/VPN, autenticação e não-repúdio."
  ],
  [
   "Destruição",
   "Descarte seguro, documentado e conforme requisitos legais."
  ],
  [
   "Dados em repouso",
   "Armazenados em memória, HD, SSD ou pendrive."
  ],
  [
   "Dados em trânsito",
   "Trafegando entre sistemas de informação, por uma rede."
  ],
  [
   "Dados em processo",
   "Sendo usados para executar uma operação (ex.: atualizar um registro)."
  ],
  [
   "TLS",
   "Protocolo que cria canal criptografado entre cliente e servidor (sucessor do SSL); base do HTTPS."
  ],
  [
   "VPN",
   "Rede privada virtual: túnel criptografado sobre uma rede pública."
  ],
  [
   "Degausser",
   "Equipamento que desmagnetiza mídias magnéticas, tornando os dados irrecuperáveis."
  ]
 ],
 "vf": [
  [
   "A destruição é a primeira fase do ciclo de vida da informação.",
   false,
   "Falso. É a última; a primeira é Criação/Aquisição."
  ],
  [
   "Classificar a informação é uma atividade da fase de criação/aquisição.",
   true,
   "Verdadeiro. A classificação define os controles das fases seguintes."
  ],
  [
   "Formatar um HD é suficiente para destruir com segurança as informações.",
   false,
   "Falso. Os dados podem ser recuperados; é preciso sobrescrever, desmagnetizar ou destruir fisicamente."
  ],
  [
   "TLS e VPN são controles típicos da fase de transmissão.",
   true,
   "Verdadeiro. Protegem os dados em trânsito."
  ],
  [
   "Dados em repouso são aqueles que trafegam entre sistemas.",
   false,
   "Falso. Esses são dados em trânsito; em repouso são os armazenados."
  ],
  [
   "Backup é um controle da fase de armazenamento.",
   true,
   "Verdadeiro. Protege a disponibilidade dos dados em repouso."
  ],
  [
   "Documentar o processo de destruição é desnecessário se a mídia foi triturada.",
   false,
   "Falso. A documentação comprova conformidade e dá rastreabilidade."
  ],
  [
   "Manter logs de acesso ajuda a proteger a integridade na fase de processamento.",
   true,
   "Verdadeiro. Permite rastrear e detectar modificações indevidas."
  ],
  [
   "Criptografia em repouso protege os dados caso o notebook seja furtado.",
   true,
   "Verdadeiro. Sem a chave, o conteúdo do disco fica ilegível."
  ],
  [
   "Enviar dados sensíveis por e-mail sem criptografia é uma prática adequada na transmissão.",
   false,
   "Falso. O conteúdo pode ser interceptado; é preciso canal ou arquivo criptografado."
  ],
  [
   "Um registro sendo atualizado no banco de dados está no estado “em processo”.",
   true,
   "Verdadeiro. Dados em processo são os usados para executar uma operação."
  ],
  [
   "Requisitos regulatórios só importam na fase de armazenamento.",
   false,
   "Falso. Influenciam todas as fases, inclusive a destruição (prazos de guarda, LGPD)."
  ]
 ],
 "caderno": [
  [
   "Liste, em ordem, as cinco fases do ciclo de vida da informação.",
   "1) Criação/Aquisição; 2) Processamento; 3) Armazenamento; 4) Transmissão; 5) Destruição."
  ],
  [
   "Por que a classificação da informação deve acontecer já na fase de criação?",
   "Porque o nível de sensibilidade define todos os controles das fases seguintes (quem acessa, se precisa de criptografia, como transmitir e como destruir). Classificar depois deixa a informação desprotegida no intervalo."
  ],
  [
   "Explique a diferença entre dados em repouso, em trânsito e em processo, com um exemplo de cada.",
   "Em repouso: armazenados (planilha salva no HD, banco de dados em disco). Em trânsito: trafegando pela rede (e-mail sendo enviado, formulário web sendo submetido). Em processo: sendo usados por uma operação (registro sendo atualizado na memória do servidor)."
  ],
  [
   "Qual a diferença entre criptografia em repouso e criptografia em trânsito?",
   "Em repouso protege o dado armazenado (ex.: BitLocker, banco com TDE), útil se o disco for furtado. Em trânsito protege o dado enquanto trafega (ex.: HTTPS/TLS, VPN), útil contra interceptação na rede."
  ],
  [
   "Cite três métodos de destruição segura de informação para meios diferentes.",
   "Papel: trituradora de corte cruzado ou incineração. HD magnético: sobrescrita múltipla, desmagnetização (degausser) ou destruição física. SSD e pendrive: comando de apagamento seguro do fabricante ou destruição física. Obs.: apenas “apagar” ou “formatar” não é destruição segura."
  ],
  [
   "Por que é importante documentar o processo de destruição?",
   "Para provar conformidade legal e regulatória (LGPD, contratos), ter rastreabilidade (o que, quando, por quem e como foi destruído) e evitar que mídias “perdidas” sejam reutilizadas com dados."
  ],
  [
   "Na fase de processamento, por que manter logs de acesso?",
   "Para saber quem acessou ou modificou a informação e quando, apoiar a integridade, detectar abusos e servir de evidência em auditorias e investigações."
  ],
  [
   "Descreva o ciclo de vida de uma ficha de matrícula de aluno, fase a fase, com um controle em cada.",
   "Criação: aluno preenche e a ficha é classificada como confidencial (dados pessoais). Processamento: secretaria digita no sistema com login individual e log. Armazenamento: banco com backup e acesso restrito; papel em arquivo trancado. Transmissão: envio ao sistema via HTTPS; nunca por e-mail aberto. Destruição: após o prazo legal de guarda, triturar o papel e eliminar do sistema com registro."
  ],
  [
   "O que significa “autenticação e não-repúdio” na fase de transmissão?",
   "Garantir que as partes que se comunicam são quem dizem ser (certificados digitais, TLS) e que o remetente não pode negar o envio (assinatura digital, registros)."
  ],
  [
   "Por que formatar um pendrive antes de doá-lo não é suficiente?",
   "A formatação rápida apenas remove a tabela de arquivos; os dados continuam no meio e podem ser recuperados com ferramentas gratuitas (ex.: PhotoRec). É preciso sobrescrever ou destruir."
  ],
  [
   "Relacione as fases do ciclo de vida com os estados do Cubo de McCumber.",
   "Processamento ↔ dados em processo; Armazenamento ↔ dados em repouso; Transmissão ↔ dados em trânsito. Criação e Destruição são as extremidades do ciclo, que o Cubo não detalha, mas que exigem classificação e descarte seguros."
  ],
  [
   "Cite um requisito regulatório que influencia a fase de destruição.",
   "A LGPD determina a eliminação dos dados pessoais após o término do tratamento (salvo hipóteses de guarda legal); normas de arquivo público e prazos fiscais definem por quanto tempo certos documentos devem ser guardados antes de destruídos."
  ]
 ],
 "pbl": [
  {
   "titulo": "O computador doado",
   "cenario": "O campus vai doar 20 computadores antigos da secretaria para uma ONG. Eles guardaram por anos documentos de alunos e servidores.",
   "passos": [
    [
     "<ol><li>Quais riscos a doação traz?</li><li>Crie um procedimento de sanitização passo a passo.</li><li>Crie um modelo de termo de destruição.</li></ol>",
     "Riscos: vazamento de dados pessoais (violação da LGPD), dano à imagem, uso dos dados em golpes. Procedimento: inventariar as máquinas; fazer backup do que precisa ser mantido; sanitizar o disco (sobrescrita completa com ferramenta como DBAN/nwipe ou secure erase para SSD) ou retirar e destruir os discos; verificar por amostragem com ferramenta de recuperação; registrar. Termo: nº de patrimônio, número de série do disco, método, data, responsável, testemunha e assinatura."
    ]
   ]
  },
  {
   "titulo": "Mapa do ciclo da nota",
   "cenario": "Mapeie o ciclo de vida completo de uma nota de prova, desde a correção até o arquivamento final do diário.",
   "passos": [
    [
     "<ol><li>Desenhe o fluxo com as 5 fases.</li><li>Em cada fase indique o estado do dado e dois controles.</li><li>Aponte o ponto mais vulnerável.</li></ol>",
     "Criação: professor corrige (classificação: interno/confidencial). Processamento: lançamento no sistema com login e log. Armazenamento: banco com backup e acesso por perfil. Transmissão: HTTPS entre navegador e servidor; boletim para o responsável por canal autenticado. Destruição: provas em papel trituradas após o prazo de guarda. Ponto vulnerável comum: planilhas intermediárias no pendrive ou no e-mail pessoal do professor."
    ]
   ]
  },
  {
   "titulo": "Home office da coordenação",
   "cenario": "A coordenadora leva para casa, num pendrive, uma planilha com dados de alunos com necessidades de acompanhamento, e envia versões por WhatsApp.",
   "passos": [
    [
     "<ol><li>Em quais fases do ciclo há falhas?</li><li>Classifique essa informação.</li><li>Proponha um fluxo seguro.</li></ol>",
     "Falhas: armazenamento (pendrive sem criptografia, pode ser perdido), transmissão (WhatsApp pessoal, sem controle institucional) e destruição (cópias espalhadas sem controle). Classificação: confidencial (dados pessoais sensíveis). Fluxo seguro: planilha no drive institucional com acesso restrito e 2FA, acesso remoto via VPN ou nuvem institucional, compartilhamento por link com permissão nominal, sem cópias locais, e eliminação das cópias antigas."
    ]
   ]
  },
  {
   "titulo": "Laboratório de recuperação",
   "cenario": "Com autorização do professor, use um pendrive de teste: copie arquivos, formate e tente recuperá-los com uma ferramenta gratuita. Depois, sobrescreva e tente de novo.",
   "passos": [
    [
     "<ol><li>Registre quantos arquivos foram recuperados em cada caso.</li><li>Explique o resultado.</li><li>Escreva uma orientação de 5 linhas para a comunidade escolar.</li></ol>",
     "Resultado esperado: após formatação rápida, a maioria dos arquivos é recuperada; após sobrescrita completa, praticamente nenhum. Explicação: formatar remove o índice, não o conteúdo. Orientação: nunca doar ou descartar mídias apenas formatadas; usar ferramenta de apagamento seguro; destruir fisicamente mídias com dados confidenciais; registrar o descarte; em dúvida, procurar a TI."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Ciclo",
   "itens": [
    "Criação, processamento, armazenamento, transmissão, destruição.",
    "Em uso, em repouso, em trânsito.",
    "Descarte seguro e documentado."
   ]
  }
 ],
 "glossario": [
  [
   "Desmagnetização",
   "Apaga mídia magnética."
  ]
 ]
});
