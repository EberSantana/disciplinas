FSI.modulo({
 "n": 5,
 "unidade": "Governança",
 "nome": "Classificação e LGPD",
 "titulo": "Público, interno, confidencial, secreto — e os direitos do titular",
 "duracao": "4 h",
 "resumoCurto": "Público: Pode ser divulgada sem restrições (marketing, editais publicados). Controles mínimos. Interno: Uso exclusivo dentro da organização (políticas internas, procedimentos). Acesso restrito a funcionários.",
 "analogia": {
  "titulo": "As gavetas da secretaria",
  "txt": "<p>O edital do vestibular fica no mural (<b>público</b>), o calendário dos professores na sala deles (<b>interno</b>), a ficha médica do aluno na gaveta trancada (<b>confidencial</b>) e a prova do vestibular no cofre (<b>secreto</b>). Classificar é decidir em que gaveta cada informação vai — e a <b>LGPD</b> diz como tratar os dados pessoais.</p>"
 },
 "chave": [
  "<b>Público:</b> Pode ser divulgada sem restrições (marketing, editais publicados). Controles mínimos.",
  "<b>Interno:</b> Uso exclusivo dentro da organização (políticas internas, procedimentos). Acesso restrito a funcionários.",
  "<b>Confidencial:</b> Sensível; poderia prejudicar a organização (dados financeiros, planos estratégicos, dados de clientes). Acesso restrito e criptografia.",
  "<b>Secreto / Altamente confidencial:</b> Crítica; a divulgação causaria danos severos (segredos comerciais, P&D). Acesso mínimo, criptografia forte, monitoramento.",
  "<b>LGPD – 10 princípios:</b> Finalidade, Adequação, Necessidade, Livre acesso, Qualidade dos dados, Transparência, Segurança, Prevenção, Não discriminação, Responsabilização e prestação de contas.",
  "<b>Direitos do titular:</b> Confirmação e acesso aos dados, correção, anonimização ou eliminação, portabilidade, informação sobre compartilhamento e revogação do consentimento."
 ],
 "objetivos": [
  "Classificar informações em <b>quatro níveis</b>.",
  "Citar os <b>princípios da LGPD</b>.",
  "Reconhecer os <b>direitos do titular</b>."
 ],
 "licoes": [
  {
   "t": "Níveis de classificação",
   "txt": "<p>Público, interno, confidencial e secreto. Quanto mais alto, mais restrito o acesso e mais fortes os controles (criptografia, registro de acesso, descarte rigoroso).</p>"
  },
  {
   "t": "LGPD em poucas linhas",
   "txt": "<p>A Lei 13.709/2018 vale para quem trata dados pessoais no Brasil. Princípios: finalidade, adequação, necessidade, livre acesso, qualidade, transparência, segurança, prevenção, não discriminação e responsabilização. O titular pode pedir acesso, correção, eliminação e portabilidade. A ANPD fiscaliza.</p>"
  }
 ],
 "termos": [
  [
   "Dado pessoal",
   "Identifica ou pode identificar a pessoa."
  ],
  [
   "Dado sensível",
   "Saúde, religião, biometria…"
  ],
  [
   "Titular",
   "A pessoa a quem os dados se referem."
  ],
  [
   "ANPD",
   "Autoridade Nacional de Proteção de Dados."
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
   "id": "niveis",
   "titulo": "Níveis de classificação",
   "forma": "piramide",
   "h": 340,
   "camadas": [
    {
     "t": "Secreto",
     "d": "Dano severo se vazar; acesso mínimo."
    },
    {
     "t": "Confidencial",
     "d": "Prejudica a organização ou pessoas."
    },
    {
     "t": "Interno",
     "d": "Uso dos funcionários."
    },
    {
     "t": "Público",
     "d": "Pode ser divulgado."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Classifique as informações da escola e decida pedidos com base na LGPD.",
  "sims": [
   {
    "tipo": "classificar",
    "id": "lab-cls",
    "titulo": "Em que nível fica?",
    "cats": [
     "Público",
     "Interno",
     "Confidencial",
     "Secreto"
    ],
    "itens": [
     [
      "Edital do processo seletivo",
      0
     ],
     [
      "Cardápio da cantina",
      0
     ],
     [
      "Escala de plantão dos servidores",
      1
     ],
     [
      "Manual interno de procedimentos",
      1
     ],
     [
      "Laudos médicos de alunos",
      2
     ],
     [
      "Notas e frequência dos alunos",
      2
     ],
     [
      "Prova do processo seletivo antes da aplicação",
      3
     ]
    ]
   },
   {
    "tipo": "cenarios",
    "titulo": "Encarregado de dados (LGPD)",
    "cfg": {
     "id": "lg",
     "rotulo": "Pedido",
     "medidor": {
      "nome": "Conformidade",
      "ini": 50
     },
     "itens": [
      {
       "t": "Uma loja pede CPF, RG, renda e religião para fazer um cartão fidelidade.",
       "ops": [
        [
         "Fere o princípio da necessidade: pedir só o mínimo",
         true,
         "Religião é dado sensível e não tem relação com o cartão."
        ],
        [
         "Está tudo certo se o cliente assinar",
         false,
         "Consentimento não justifica excesso."
        ],
        [
         "Só fere se vazar",
         false,
         "A coleta excessiva já é irregular."
        ]
       ]
      },
      {
       "t": "Um ex-aluno pede para ver quais dados dele a escola guarda.",
       "ops": [
        [
         "Direito de acesso do titular: atender",
         true,
         "A LGPD garante a confirmação e o acesso."
        ],
        [
         "Negar, ele não é mais aluno",
         false,
         "O direito continua."
        ],
        [
         "Cobrar uma taxa",
         false,
         "O acesso deve ser facilitado."
        ]
       ]
      },
      {
       "t": "A escola usa os telefones dos responsáveis para vender rifas de um parceiro.",
       "ops": [
        [
         "Desvio de finalidade",
         true,
         "Os dados foram coletados para comunicação escolar."
        ],
        [
         "Permitido, os dados já são da escola",
         false,
         "Os dados são do titular."
        ],
        [
         "Permitido se for para caridade",
         false,
         "A finalidade original não inclui isso."
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
    "t": "Classifique as informações sem erros",
    "ev": "vis:lab-cls"
   },
   {
    "id": "m2",
    "t": "Decida todos os pedidos",
    "ev": "lg:fim"
   },
   {
    "id": "m3",
    "t": "Conformidade em 80% ou mais",
    "ev": "lg:medidor80"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "Informação pública",
   "Pode ser divulgada sem restrições; controles mínimos."
  ],
  [
   "Informação interna",
   "Uso exclusivo na organização; acesso restrito a funcionários."
  ],
  [
   "Informação confidencial",
   "Sensível, pode prejudicar a organização; acesso restrito e criptografia."
  ],
  [
   "Informação secreta",
   "Crítica; divulgação causa danos severos (segredos comerciais, P&D)."
  ],
  [
   "LGPD",
   "Lei Geral de Proteção de Dados (Lei 13.709/2018): regula o tratamento de dados pessoais no Brasil."
  ],
  [
   "Princípio da Finalidade",
   "Tratamento para propósitos legítimos, específicos, explícitos e informados."
  ],
  [
   "Princípio da Necessidade",
   "Usar o mínimo de dados necessários para a finalidade."
  ],
  [
   "Princípio do Livre acesso",
   "Consulta fácil e gratuita pelo titular sobre forma, duração e integralidade dos seus dados."
  ],
  [
   "Princípio da Prevenção",
   "Adotar medidas para prevenir danos no tratamento de dados pessoais."
  ],
  [
   "Princípio da Não discriminação",
   "Proibido tratar dados para fins discriminatórios ilícitos ou abusivos."
  ],
  [
   "ANPD",
   "Autoridade Nacional de Proteção de Dados: fiscaliza e aplica a LGPD."
  ],
  [
   "Dado pessoal sensível",
   "Origem racial, religião, opinião política, saúde, biometria, genética, vida sexual, filiação sindical."
  ]
 ],
 "vf": [
  [
   "Dados de marketing já publicados podem ser classificados como informação pública.",
   true,
   "Verdadeiro. Podem ser divulgados sem restrição; controles mínimos."
  ],
  [
   "Informações de clientes podem ser classificadas como públicas, pois são sobre terceiros.",
   false,
   "Falso. Dados de clientes são confidenciais e protegidos pela LGPD."
  ],
  [
   "A LGPD possui 10 princípios que regem o tratamento de dados pessoais.",
   true,
   "Verdadeiro. Finalidade, adequação, necessidade, livre acesso, qualidade, transparência, segurança, prevenção, não discriminação e responsabilização."
  ],
  [
   "Pelo princípio da Necessidade, a empresa deve coletar o máximo de dados possível para uso futuro.",
   false,
   "Falso. Deve coletar o mínimo necessário para a finalidade."
  ],
  [
   "O titular tem direito de acessar gratuitamente os dados que uma empresa tem sobre ele.",
   true,
   "Verdadeiro. É o princípio do livre acesso e um direito do titular."
  ],
  [
   "Dados de saúde são considerados dados pessoais sensíveis na LGPD.",
   true,
   "Verdadeiro. Estão na lista de dados sensíveis e exigem proteção reforçada."
  ],
  [
   "Uma vez classificada, a informação nunca muda de nível.",
   false,
   "Falso. A classificação pode mudar com o tempo (ex.: prova secreta que vira pública após aplicada)."
  ],
  [
   "Criptografia é um controle recomendado para informações confidenciais.",
   true,
   "Verdadeiro. Acesso restrito e criptografia estão entre os controles do nível confidencial."
  ],
  [
   "A LGPD se aplica apenas a empresas privadas, não a órgãos públicos.",
   false,
   "Falso. Aplica-se também ao poder público, como institutos federais e prefeituras."
  ],
  [
   "Pelo princípio da Responsabilização, a organização deve conseguir demonstrar que cumpre a LGPD.",
   true,
   "Verdadeiro. Não basta cumprir; é preciso provar com medidas eficazes."
  ],
  [
   "Endereço IP pode ser considerado dado pessoal.",
   true,
   "Verdadeiro. Se permite identificar uma pessoa natural, é dado pessoal."
  ],
  [
   "Segredos comerciais devem ser classificados como informação interna.",
   false,
   "Falso. São secretos/altamente confidenciais; a divulgação causaria danos severos."
  ]
 ],
 "caderno": [
  [
   "Liste os quatro níveis de classificação vistos em aula, do menos ao mais restrito, com um exemplo de cada.",
   "Público (cardápio do refeitório no site); Interno (manual de procedimentos da secretaria); Confidencial (folha de pagamento, dados de alunos); Secreto/Altamente confidencial (prova do vestibular antes da aplicação, código-fonte de um produto inovador)."
  ],
  [
   "Classifique: (a) edital de processo seletivo publicado; (b) prova antes da aplicação; (c) lista de ramais internos; (d) CPF e endereço dos alunos; (e) plano estratégico do campus em elaboração.",
   "(a) Público; (b) Secreto/Altamente confidencial; (c) Interno; (d) Confidencial (dado pessoal); (e) Confidencial."
  ],
  [
   "Por que a classificação da informação é a base para escolher os controles de segurança?",
   "Porque aplicar o mesmo controle a tudo é caro e ineficiente. A classificação indica o impacto de um vazamento e, assim, quanto investir: informação pública precisa de controles mínimos, informação secreta precisa de acesso mínimo, criptografia forte e monitoramento."
  ],
  [
   "Explique o princípio da Necessidade da LGPD e dê um exemplo de violação.",
   "O tratamento deve se limitar ao mínimo de dados necessários para a finalidade. Violação: uma loja pedir CPF, data de nascimento e renda só para enviar um cupom por e-mail."
  ],
  [
   "Diferencie os princípios de Finalidade e Adequação.",
   "Finalidade: o tratamento deve ter propósito legítimo, específico e informado ao titular. Adequação: o tratamento deve ser compatível com essa finalidade informada. Ex.: coletar e-mail para enviar boletim (finalidade) e não usá-lo para vender a terceiros (adequação)."
  ],
  [
   "O que diz o princípio da Responsabilização e prestação de contas?",
   "O agente de tratamento deve demonstrar que adotou medidas eficazes para cumprir a LGPD, ou seja, não basta cumprir, é preciso conseguir provar (documentação, registros, políticas)."
  ],
  [
   "Um supermercado onde você compra teve seus dados vazados. Quais direitos você tem e o que pode fazer?",
   "Direito à informação e à segurança dos dados. Você pode pedir esclarecimentos sobre quais dados foram expostos e quais medidas foram tomadas, solicitar a correção ou eliminação dos seus dados e registrar reclamação na ANPD (Autoridade Nacional de Proteção de Dados) ou no Procon."
  ],
  [
   "O que é dado pessoal e o que é dado pessoal sensível segundo a LGPD? Dê exemplos.",
   "Dado pessoal: informação relacionada a pessoa natural identificada ou identificável (nome, CPF, e-mail, IP). Sensível: origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, dados de saúde, vida sexual, genéticos ou biométricos. Exigem proteção maior."
  ],
  [
   "Quais controles você aplicaria a uma informação classificada como Confidencial?",
   "Acesso restrito por perfil (mínimo privilégio), criptografia em repouso e em trânsito, logs de acesso, termo de confidencialidade para quem acessa, rótulo “CONFIDENCIAL” em documentos e descarte seguro."
  ],
  [
   "Explique o princípio da Transparência.",
   "O titular deve receber informações claras, precisas e facilmente acessíveis sobre o tratamento dos seus dados e sobre quem são os agentes de tratamento (ex.: política de privacidade clara no site)."
  ],
  [
   "Quem é o titular, o controlador e o operador na LGPD?",
   "Titular: a pessoa a quem os dados se referem. Controlador: quem toma as decisões sobre o tratamento (ex.: a escola). Operador: quem realiza o tratamento em nome do controlador (ex.: empresa do sistema acadêmico contratada)."
  ],
  [
   "Uma mesma informação pode mudar de classificação ao longo do tempo? Dê um exemplo.",
   "Sim. A prova do vestibular é secreta antes da aplicação e pode se tornar pública depois (gabarito divulgado). Um balanço financeiro é confidencial até a publicação oficial."
  ]
 ],
 "pbl": [
  {
   "titulo": "Inventário da secretaria",
   "cenario": "A secretaria acadêmica quer uma matriz de classificação para seus documentos: editais, fichas de matrícula, atestados médicos de alunos, atas de conselho de classe, listas de ramais, relatórios financeiros.",
   "passos": [
    [
     "<ol><li>Classifique cada documento.</li><li>Associe controles a cada nível.</li><li>Crie rótulos visuais (cores) para os documentos.</li></ol>",
     "Edital: Público. Lista de ramais: Interno. Ata de conselho de classe: Confidencial. Relatório financeiro antes de publicação: Confidencial. Ficha de matrícula: Confidencial (dados pessoais). Atestado médico: Confidencial com dado sensível (saúde), tratar como mais restrito. Controles: público (revisão antes de publicar); interno (acesso só a servidores); confidencial (acesso por perfil, criptografia, log, armário trancado); sensível (acesso nominal mínimo). Rótulos: verde, azul, laranja, vermelho."
    ]
   ]
  },
  {
   "titulo": "O formulário exagerado",
   "cenario": "O grêmio criou um Google Forms para inscrição num torneio de futsal que pede: nome, CPF, RG, endereço completo, religião, tipo sanguíneo, renda familiar e foto.",
   "passos": [
    [
     "<ol><li>Quais princípios da LGPD estão sendo feridos?</li><li>Quais dados são realmente necessários?</li><li>Reescreva o formulário e crie um aviso de privacidade.</li></ol>",
     "Feridos: necessidade (dados em excesso), adequação, finalidade e, pela religião e dados de saúde (sensíveis), segurança e prevenção. Necessários: nome, turma, contato e, talvez, contato de emergência. Tipo sanguíneo só se houver justificativa, com consentimento. Aviso: “Coletamos nome, turma e contato apenas para organizar o torneio; os dados serão apagados 30 dias após o evento; dúvidas: [e-mail do grêmio]”."
    ]
   ]
  },
  {
   "titulo": "Vazamento no supermercado",
   "cenario": "Você recebe um SMS: “Seus dados foram expostos em incidente no Supermercado Bom Preço”. Dias depois, recebe ligações de golpistas que sabem seu nome e CPF.",
   "passos": [
    [
     "<ol><li>Quais direitos seus foram atingidos?</li><li>Escreva um pedido formal ao supermercado com base na LGPD.</li><li>Que cuidados você deve tomar agora?</li></ol>",
     "Direitos: segurança dos dados, informação clara sobre o incidente e livre acesso. Pedido: identificar-se, citar a LGPD e solicitar quais dados foram expostos, desde quando, medidas adotadas, com quem foram compartilhados e, se desejar, a eliminação dos dados não necessários. Cuidados: desconfiar de ligações e links, não confirmar dados, ativar 2FA, monitorar CPF (Registrato do Banco Central) e registrar reclamação na ANPD ou Procon."
    ]
   ]
  },
  {
   "titulo": "Auditoria de perfil em mídia social",
   "cenario": "Em duplas, analisem um perfil fictício de rede social (criado pelo professor) com data de nascimento, escola, endereço em fotos, rotina de academia e check-ins.",
   "passos": [
    [
     "<ol><li>Classifique cada informação exposta.</li><li>Aponte os riscos (golpe, perseguição, engenharia social).</li><li>Proponha configurações de privacidade.</li></ol>",
     "Rubrica: identificar dados pessoais expostos e classificá-los (público por escolha × deveria ser restrito); relacionar riscos concretos (senha baseada em data de nascimento, golpe do falso parente, localização da rotina); recomendações: perfil privado, remover localização e check-ins em tempo real, ocultar data de nascimento, revisar quem vê as fotos e marcações."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Classificação e LGPD",
   "itens": [
    "Público, interno, confidencial, secreto.",
    "10 princípios; finalidade e necessidade.",
    "Direitos: acesso, correção, eliminação, portabilidade."
   ]
  }
 ],
 "glossario": [
  [
   "Encarregado (DPO)",
   "Canal entre controlador, titulares e ANPD."
  ]
 ]
});
