FSI.modulo({
 "n": 1,
 "unidade": "Fundamentos",
 "nome": "Introdução à segurança",
 "titulo": "Por que proteger a informação? Valor, mitos, invasores e criptografia",
 "duracao": "4 h",
 "resumoCurto": "Por que se preocupar?: A informação é um dos ativos de maior valor das organizações. Transações bancárias, e-commerce e troca de dados sigilosos acontecem pela internet, e ninguém está 100% seguro nela. Evolução: Do pape",
 "analogia": {
  "titulo": "O diário com cadeado",
  "txt": "<p>Um diário com cadeado é a forma mais simples de segurança: o que está escrito tem <b>valor</b> para o dono, alguém pode querer ler (<b>ameaça</b>) e o cadeado é o <b>controle</b>. Mas se o cadeado é de brinquedo, quem quer abre — o esforço de proteção precisa combinar com o valor do que se guarda. Há dois mil anos, Júlio César fazia o mesmo com mensagens: trocava cada letra por outra três posições adiante.</p>"
 },
 "chave": [
  "<b>Por que se preocupar?:</b> A informação é um dos ativos de maior valor das organizações. Transações bancárias, e-commerce e troca de dados sigilosos acontecem pela internet, e ninguém está 100% seguro nela.",
  "<b>Evolução:</b> Do papel trancado em armários (segurança física) aos mainframes (segurança centralizada) e às redes distribuídas, que exigem equipes cada vez mais especializadas.",
  "<b>Valor × esforço:</b> O esforço para proteger uma informação depende do valor que ela tem. Antivírus sozinho não basta: é preciso um plano de segurança.",
  "<b>Mitos:</b> “Isso nunca vai acontecer conosco”, “segurança é problema da TI”, “Linux não pega vírus”, “nosso parceiro é confiável, pode liberar o acesso”.",
  "<b>Invasores:</b> Hacker (conhecimento profundo, cria técnicas), Cracker (age para causar dano ou lucrar) e Script Kiddie (pouco conhecimento, usa ferramentas prontas).",
  "<b>Criptografia:</b> Kryptós (oculto) + gráphein (escrita). Torna a informação ilegível a quem não está autorizado e garante a Confidencialidade. Exemplo clássico: a Cifra de César."
 ],
 "objetivos": [
  "Explicar por que a informação é um <b>ativo</b>.",
  "Reconhecer os <b>mitos</b> da segurança.",
  "Diferenciar <b>hacker, cracker e script kiddie</b>.",
  "Cifrar e decifrar com a <b>cifra de César</b>."
 ],
 "licoes": [
  {
   "t": "Informação tem valor",
   "txt": "<p>Notas, salários, prontuários, fórmulas, a lista de clientes: perder, vazar ou ter isso alterado causa prejuízo financeiro, legal e de reputação. Por isso o esforço de proteção deve ser proporcional ao valor — e antivírus sozinho não é plano de segurança.</p>"
  },
  {
   "t": "Mitos perigosos",
   "txt": "",
   "pontos": [
    "“Isso nunca vai acontecer conosco” — ataques automatizados não escolhem tamanho.",
    "“Segurança é problema da TI” — a maioria dos incidentes começa num usuário.",
    "“Linux não pega vírus” — pega menos, mas pega.",
    "“O parceiro é confiável, pode liberar” — confiança não substitui controle."
   ]
  },
  {
   "t": "Criptografia: a escrita oculta",
   "txt": "<p>Do grego <i>kryptós</i> (oculto) e <i>gráphein</i> (escrita). A <b>cifra de César</b> desloca cada letra um número fixo de posições: com chave 3, A vira D. Simples demais: só existem 25 chaves, e basta testar todas (<b>força bruta</b>).</p>"
  }
 ],
 "termos": [
  [
   "Ativo",
   "Tudo o que tem valor e precisa de proteção."
  ],
  [
   "Cracker",
   "Invasor que age para causar dano ou lucrar."
  ],
  [
   "Script kiddie",
   "Usa ferramentas prontas sem entender."
  ],
  [
   "Criptografia",
   "Torna a informação ilegível a quem não tem a chave."
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
   "id": "hist",
   "titulo": "Da segurança física à nuvem",
   "ordenar": true,
   "passos": [
    {
     "t": "Papel e armário",
     "d": "Segurança física: trancas e cofres."
    },
    {
     "t": "Mainframes",
     "d": "Segurança centralizada num único computador."
    },
    {
     "t": "Redes",
     "d": "Ameaças chegam por qualquer ponto da rede."
    },
    {
     "t": "Internet",
     "d": "E-commerce, bancos e golpes em escala mundial."
    },
    {
     "t": "Nuvem e celular",
     "d": "Dados em todo lugar: identidade é o novo perímetro."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Seja criptógrafo e criptoanalista: cifre mensagens e quebre três mensagens interceptadas.",
  "sims": [
   {
    "tipo": "cifra",
    "titulo": "Cifra de César: cifre e quebre",
    "cfg": {
     "id": "ce",
     "desafios": [
      {
       "c": "HVWXGH SDUD D SURYD",
       "k": 3,
       "dica": "César usava a chave 3."
      },
      {
       "c": "V SPUR L MHSZV",
       "k": 7,
       "dica": "A palavra de uma letra só pode ser O, A ou E."
      },
      {
       "c": "GEBDHR N FRAUN UBWR",
       "k": 13,
       "dica": "Chave 13 é famosa (ROT13): cifrar duas vezes volta ao original."
      }
     ]
    }
   },
   {
    "tipo": "cenarios",
    "titulo": "Mito ou verdade?",
    "cfg": {
     "id": "mi",
     "rotulo": "Frase",
     "itens": [
      {
       "t": "“Somos uma padaria pequena, ninguém vai nos atacar.”",
       "ops": [
        [
         "Mito: ataques automatizados atingem qualquer um",
         true,
         "Robôs varrem a internet atrás de alvos fáceis."
        ],
        [
         "Verdade: só grandes empresas são atacadas",
         false,
         "Pequenos são alvos fáceis."
        ]
       ]
      },
      {
       "t": "“Com um bom antivírus estamos totalmente protegidos.”",
       "ops": [
        [
         "Mito: antivírus é só uma das camadas",
         true,
         "Engenharia social, falhas e desastres exigem outros controles."
        ],
        [
         "Verdade",
         false,
         "Nenhum controle sozinho protege tudo."
        ]
       ]
      },
      {
       "t": "“O esforço de proteção deve ser proporcional ao valor da informação.”",
       "ops": [
        [
         "Verdade",
         true,
         "Proteger o cardápio como se fosse o cofre é desperdício; o contrário é imprudência."
        ],
        [
         "Mito",
         false,
         "É um princípio básico de gestão de riscos."
        ]
       ]
      },
      {
       "t": "“Script kiddie não é perigoso porque não sabe programar.”",
       "ops": [
        [
         "Mito: ferramentas prontas causam estrago de verdade",
         true,
         "Muitos ataques em massa usam kits prontos."
        ],
        [
         "Verdade",
         false,
         "Conhecimento baixo não significa dano baixo."
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
    "t": "Mude a chave e veja a cifra mudar",
    "ev": "ce:chave"
   },
   {
    "id": "m2",
    "t": "Decifre a primeira mensagem",
    "ev": "ce:decifrou:1"
   },
   {
    "id": "m3",
    "t": "Decifre as três mensagens",
    "ev": "ce:todos"
   },
   {
    "id": "m4",
    "t": "Separe mitos e verdades",
    "ev": "mi:fim"
   }
  ],
  "guiados": [
   {
    "titulo": "Força bruta na cifra de César",
    "txt": "<p>Um computador testa <b>1 milhão</b> de chaves por segundo.</p>",
    "passos": [
     {
      "p": "Quantas chaves diferentes de zero existem na cifra de César (alfabeto de 26 letras)?",
      "r": 25,
      "un": "chaves",
      "dica": "Deslocamentos de 1 a 25.",
      "expl": "25."
     },
     {
      "p": "Uma chave de 128 bits tem 2¹²⁸ possibilidades. Escreva o expoente de 2.",
      "r": 128,
      "dica": "É o número de bits.",
      "expl": "2¹²⁸ ≈ 3,4 × 10³⁸: força bruta levaria muito mais que a idade do universo."
     }
    ]
   }
  ]
 },
 "fc": [
  [
   "Criptografia",
   "Técnica que torna a informação ilegível para pessoas não autorizadas. Do grego kryptós (oculto) + gráphein (escrita)."
  ],
  [
   "Cifra de César",
   "Cifra de substituição em que cada letra é trocada pela letra N posições à frente no alfabeto (César usava 3)."
  ],
  [
   "Hacker",
   "Pessoa com grande conhecimento técnico que tenta quebrar a segurança de sistemas; cria técnicas próprias e costuma compartilhar conhecimento."
  ],
  [
   "Cracker",
   "Invasor que age para obter vantagem ou causar dano: roubo de dados, cartões, espionagem industrial, destruição."
  ],
  [
   "Script Kiddie",
   "Usuário com pouco conhecimento que usa ferramentas prontas de outras pessoas e explora falhas já conhecidas."
  ],
  [
   "Ativo de informação",
   "Tudo que tem valor para a organização e contém, processa ou transmite informação: papel, discos, sistemas e até a memória das pessoas."
  ],
  [
   "Plano de segurança",
   "Conjunto planejado de medidas que responde: quais são as ameaças, quais tecnologias usar e como educar os usuários."
  ],
  [
   "Mito “segurança é da TI”",
   "Falso: todos que manipulam informação são responsáveis; o elo humano é o alvo preferido da engenharia social."
  ],
  [
   "Força bruta",
   "Ataque que testa todas as chaves ou senhas possíveis até encontrar a correta."
  ],
  [
   "Análise de frequência",
   "Técnica de criptoanálise que compara a frequência das letras no texto cifrado com a do idioma para descobrir a chave."
  ],
  [
   "Superfície de ataque",
   "Conjunto de pontos (serviços, portas, funcionalidades, pessoas) por onde um atacante pode tentar entrar."
  ],
  [
   "Segurança 100%",
   "Não existe. Medidas são implantadas por humanos, passíveis de erro; o objetivo é reduzir o risco a um nível aceitável."
  ]
 ],
 "vf": [
  [
   "Com um bom antivírus instalado, uma empresa está totalmente protegida.",
   false,
   "Falso. O antivírus cobre apenas parte das ameaças; engenharia social, falhas de configuração, desastres e erros humanos exigem outros controles."
  ],
  [
   "A criptografia tem como função principal garantir a confidencialidade de um documento.",
   true,
   "Verdadeiro. Ao tornar a mensagem ilegível para não autorizados, a criptografia protege a confidencialidade."
  ],
  [
   "Script Kiddies são os invasores mais experientes, pois criam suas próprias ferramentas.",
   false,
   "Falso. Quem cria técnicas próprias é o hacker; o script kiddie usa ferramentas prontas de terceiros."
  ],
  [
   "Na Cifra de César com deslocamento 3, a letra A vira D.",
   true,
   "Verdadeiro. A→B→C→D: três posições à frente."
  ],
  [
   "Segurança da informação protege apenas dados armazenados em computadores.",
   false,
   "Falso. Protege ativos de informação onde quer que estejam: papel, discos, sistemas e até o conhecimento na memória das pessoas."
  ],
  [
   "O esforço de proteção deve ser proporcional ao valor da informação.",
   true,
   "Verdadeiro. Informações mais valiosas ou sensíveis justificam controles mais fortes e mais investimento."
  ],
  [
   "“Linux não pega vírus” é uma afirmação correta.",
   false,
   "Falso. Existe malware para Linux, e servidores Linux são alvos frequentes; é um dos mitos da aula."
  ],
  [
   "Crackers usam técnicas de invasão para roubar dados ou causar destruição.",
   true,
   "Verdadeiro. É o que os diferencia: a intenção de obter vantagem ou causar dano."
  ],
  [
   "Como as medidas de segurança são implantadas por pessoas, sempre haverá possibilidade de falha.",
   true,
   "Verdadeiro. Por isso se fala em reduzir o risco, e não em eliminá-lo; nunca se está 100% seguro."
  ],
  [
   "A Cifra de César é segura contra ataques modernos porque tem milhões de chaves.",
   false,
   "Falso. Tem só 25 deslocamentos úteis; é quebrada por força bruta em segundos."
  ],
  [
   "Sistemas ricos em funcionalidades tendem a ter mais brechas de segurança.",
   true,
   "Verdadeiro. Mais código e mais opções ampliam a superfície de ataque e a chance de erro."
  ],
  [
   "Se a empresa nunca detectou um ataque, pode concluir que nunca foi atacada.",
   false,
   "Falso. Muitos ataques (principalmente os passivos) não são detectados; é o mito “nunca fomos atacados”."
  ]
 ],
 "caderno": [
  [
   "Explique com suas palavras por que a informação é considerada um dos ativos mais valiosos de uma organização. Dê dois exemplos.",
   "Porque decisões, operações, vendas e relacionamento com clientes dependem dela; sua perda, vazamento ou alteração causa prejuízo financeiro, legal e de imagem. Exemplos: cadastro de clientes de uma loja; planilha de custos e preços de uma empresa; histórico médico em um hospital."
  ],
  [
   "Descreva a evolução da segurança da informação desde a era do papel até as redes atuais.",
   "Na era do papel, proteger era trancar documentos e restringir o acesso físico. Com os computadores de grande porte, a segurança ficou mais sofisticada, porém centralizada. Com as redes e a internet, os dados passaram a circular por muitos sistemas, e a complexidade exigiu equipes especializadas e controles técnicos, físicos e administrativos."
  ],
  [
   "Por que “usar um bom antivírus” não é suficiente para uma empresa estar segura?",
   "O antivírus trata só uma parte das ameaças (malware conhecido). Não cobre engenharia social, senhas fracas, configuração errada, falhas humanas, desastres físicos, falta de backup ou de política. Segurança exige um conjunto de controles (pessoas, processos e tecnologia) planejados a partir dos riscos."
  ],
  [
   "Escolha três mitos sobre segurança apresentados na aula e refute cada um.",
   "Exemplos: “Nunca fomos atacados” — muitos ataques passam despercebidos; ausência de evidência não é evidência de ausência. “Segurança é responsabilidade da TI” — todos os usuários manipulam informação e podem ser a porta de entrada (phishing). “Linux não pega vírus” — existe malware para Linux, e servidores Linux são alvos frequentes."
  ],
  [
   "Diferencie Hacker, Cracker e Script Kiddie quanto a conhecimento e intenção.",
   "Hacker: alto conhecimento de programação e SO, cria as próprias técnicas, costuma compartilhar conhecimento e, na maioria dos casos, não causa danos. Cracker: usa técnicas de invasão para obter vantagem ou causar dano (roubo de dados, cartões, espionagem, destruição). Script Kiddie: pouco conhecimento, usa ferramentas de terceiros e explora falhas já conhecidas, geralmente só para “dizer que invadiu”."
  ],
  [
   "Qual a origem da palavra criptografia e qual pilar da segurança ela garante principalmente?",
   "Do grego kryptós (oculto, escondido) + gráphein (escrita): “escrita oculta”. Garante principalmente a Confidencialidade, tornando a mensagem ilegível para quem não tem a chave."
  ],
  [
   "Cifre a palavra SEGURANCA usando a Cifra de César com deslocamento 3.",
   "S→V, E→H, G→J, U→X, R→U, A→D, N→Q, C→F, A→D. Resultado: VHJXUDQFD."
  ],
  [
   "Decifre a mensagem “LIV” sabendo que foi cifrada com César deslocamento 3.",
   "Volta 3 posições em cada letra: L→I, I→F, V→S. Resultado: IFS."
  ],
  [
   "Por que a Cifra de César é considerada fraca hoje? Quantas chaves possíveis ela tem no alfabeto de 26 letras?",
   "Tem apenas 25 deslocamentos úteis (26 contando o zero), então um atacante testa todos em segundos (força bruta). Além disso, preserva a frequência das letras, o que permite análise de frequência."
  ],
  [
   "A frase “O esforço para proteger a informação depende do valor da informação” tem qual implicação prática para um gestor?",
   "Que não se protege tudo igual: primeiro identificam-se os ativos e seu valor; informações críticas recebem controles mais fortes (criptografia, acesso restrito, backup redundante), e informações públicas recebem controles mínimos. Isso evita gastar demais onde não precisa e de menos onde é crítico."
  ],
  [
   "Responda ao questionário da aula: “Se a sua TI parasse, o que aconteceria?” Pense em uma escola e descreva os impactos.",
   "Resposta pessoal. Exemplo: sem SUAP/sistema acadêmico não se lançam notas nem frequência; sem internet não há e-mail nem ambiente virtual; secretaria não emite documentos; aulas de laboratório param. Mostra a dependência da TI e a necessidade de disponibilidade e plano de contingência."
  ],
  [
   "Por que sistemas muito complexos ou cheios de funcionalidades tendem a ter mais falhas de segurança?",
   "Quanto mais código, integrações e opções, maior a superfície de ataque e a chance de erro de programação ou configuração. Além disso, a pressão por desempenho e prazo faz a segurança ficar em segundo plano."
  ]
 ],
 "pbl": [
  {
   "titulo": "A padaria que achava que não era alvo",
   "cenario": "A Padaria Sabor do Sertão vende pelo Instagram e recebe pedidos por WhatsApp. O dono diz: “Somos pequenos, nenhum hacker vai querer nossos dados”. Os pedidos ficam numa planilha compartilhada com link público, com nome, endereço e telefone dos clientes.",
   "passos": [
    [
     "<ol><li>Quais mitos aparecem na fala do dono?</li><li>Que informações têm valor ali e para quem?</li><li>Proponha 4 medidas simples e baratas.</li></ol>",
     "Mitos: “isso nunca vai acontecer conosco” e “não somos alvo”. Ataques automatizados não escolhem tamanho. Valor: dados pessoais dos clientes (servem para golpes e phishing), faturamento e reputação. Medidas: retirar o link público e compartilhar só com pessoas específicas; ativar verificação em duas etapas no WhatsApp e no Instagram; fazer backup semanal da planilha; orientar funcionários sobre golpes de falso cliente e links suspeitos."
    ]
   ]
  },
  {
   "titulo": "Mensagem secreta do grêmio",
   "cenario": "O grêmio estudantil quer combinar a data de um evento surpresa usando a Cifra de César e publicou no mural: “IHVWDVHAWD”.",
   "passos": [
    [
     "<ol><li>Descubra a mensagem testando deslocamentos (use o laboratório da aba Resumo).</li><li>Quantas tentativas no máximo seriam necessárias?</li><li>Proponha uma forma melhor de manter o segredo.</li></ol>",
     "Com deslocamento 3, voltando cada letra: I→F, H→E, V→S, W→T, D→A, V→S, H→E, A→X, W→T, D→A = FESTASEXTA (“festa sexta”). No máximo 25 tentativas quebram qualquer Cifra de César, então ela não protege de verdade: qualquer colega descobre. Melhor: usar um canal com criptografia moderna (app com criptografia ponta a ponta, grupo fechado) e limitar quem sabe a data."
    ]
   ]
  },
  {
   "titulo": "Quem invadiu o site?",
   "cenario": "O site de um campus foi alterado e passou a exibir uma mensagem “hackeado by X” com a imagem de um meme. A investigação mostrou que foi usada uma ferramenta pública que explorava uma falha antiga do CMS, sem nenhuma outra ação.",
   "passos": [
    [
     "<ol><li>Qual perfil de invasor é mais provável? Justifique.</li><li>Qual falha de gestão permitiu o ataque?</li><li>Que ações a equipe deve tomar agora?</li></ol>",
     "Perfil provável: Script Kiddie — ferramenta pronta, falha conhecida, objetivo de exibição, sem roubo. Falha de gestão: CMS desatualizado (falta de gerenciamento de patches). Ações: restaurar o site do backup, atualizar o CMS e plugins, trocar senhas, revisar logs, verificar se não ficou backdoor e criar rotina mensal de atualização."
    ]
   ]
  },
  {
   "titulo": "Diagnóstico de maturidade",
   "cenario": "Use as 4 perguntas do questionário da aula (TI parada, informações seguras, item mais importante, próximo investimento) para entrevistar um comércio do seu bairro.",
   "passos": [
    [
     "<ol><li>Registre as respostas do entrevistado.</li><li>Classifique a maturidade: baixa, média ou alta.</li><li>Escreva 3 recomendações priorizadas.</li></ol>",
     "Rubrica: (1) as 4 perguntas aplicadas e respostas registradas; (2) classificação justificada — respostas “d” (avaliação de risco, política, treinamento) indicam maturidade maior; (3) recomendações priorizadas começando por avaliação de riscos e conscientização, depois backup e controles técnicos. Não há resposta única: avalie coerência entre diagnóstico e recomendações."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Fundamentos",
   "itens": [
    "Informação é ativo.",
    "Mitos: “não somos alvo”, “antivírus basta”.",
    "Hacker, cracker, script kiddie.",
    "César: 25 chaves, quebra por força bruta."
   ]
  }
 ],
 "glossario": [
  [
   "Força bruta",
   "Testar todas as chaves possíveis."
  ],
  [
   "ROT13",
   "César com chave 13."
  ]
 ]
});
