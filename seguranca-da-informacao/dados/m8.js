FSI.modulo({
 "n": 8,
 "unidade": "Gestão",
 "nome": "Vulnerabilidades e riscos",
 "titulo": "Achar as fraquezas e decidir o que tratar primeiro",
 "duracao": "4 h",
 "resumoCurto": "Vulnerabilidade: Falha ou fraqueza que pode ocorrer no projeto, na implementação, na operação ou no gerenciamento, explorável para violar a política de segurança. Críticas: Formatação de strings, travessia de diretórios,",
 "analogia": {
  "titulo": "A vistoria da casa",
  "txt": "<p>Antes de comprar trancas, o vistoriador anda pela casa, anota cada fraqueza, estima a chance de alguém usá-la e o prejuízo, e só então decide: trocar a fechadura (<b>mitigar</b>), fazer seguro (<b>transferir</b>), fechar de vez a porta dos fundos (<b>evitar</b>) ou conviver com o risco pequeno (<b>aceitar</b>).</p>"
 },
 "chave": [
  "<b>Vulnerabilidade:</b> Falha ou fraqueza que pode ocorrer no projeto, na implementação, na operação ou no gerenciamento, explorável para violar a política de segurança.",
  "<b>Críticas:</b> Formatação de strings, travessia de diretórios, senhas padrão (cisco/cisco, SNMP public, administrator). Podem levar a execução remota e escalada de privilégios.",
  "<b>Configurações erradas:</b> Pressa, inexperiência ou displicência. Ex.: FTP “seguro” com conta anonymous esquecida; senhas de uma instituição coletadas por 3 meses.",
  "<b>Backdoors e TCP/IP:</b> Backdoor conhecido indica que a rede já foi atacada. Buffer overflow: dados além do limite do buffer sobrescrevem a memória.",
  "<b>Risco:</b> Evento incerto que, se ocorrer, afeta objetivos. Gerenciar = identificar, avaliar (estimar) e controlar (minimizar). “Não se protege do que não se conhece.”",
  "<b>Análise de risco:</b> Considera bens, ameaças e vulnerabilidades e as propriedades CIDA; compara com o nível de risco aceitável; agrega riscos pequenos e considera requisitos legais e contratuais."
 ],
 "objetivos": [
  "Reconhecer <b>vulnerabilidades</b> frequentes.",
  "Montar uma <b>matriz de riscos</b>.",
  "Escolher o <b>tratamento</b>: mitigar, transferir, evitar, aceitar."
 ],
 "licoes": [
  {
   "t": "Vulnerabilidades comuns",
   "txt": "<p>Senhas padrão (admin/admin), configurações erradas, serviços desnecessários, software sem atualização, backdoors esquecidos, buffer overflow e falhas de protocolo.</p>"
  },
  {
   "t": "Gestão de riscos",
   "txt": "<p>Identificar ativos, ameaças e vulnerabilidades; avaliar probabilidade e impacto; comparar com o risco aceitável; e tratar: <b>mitigar</b> (reduzir), <b>transferir</b> (seguro, terceirização), <b>evitar</b> (eliminar a atividade) ou <b>aceitar</b>. O processo é contínuo.</p>"
  }
 ],
 "termos": [
  [
   "Risco residual",
   "O que sobra após os controles."
  ],
  [
   "Mitigar",
   "Reduzir probabilidade ou impacto."
  ],
  [
   "Transferir",
   "Passar o impacto a terceiros."
  ],
  [
   "Aceitar",
   "Conviver com risco baixo."
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
  "intro": "Monte a matriz de riscos de uma escola técnica e escolha o tratamento de cada risco.",
  "sims": [
   {
    "tipo": "risco",
    "titulo": "Matriz de riscos da escola",
    "cfg": {
     "id": "rk",
     "ameacas": [
      {
       "t": "Roteador do laboratório com senha padrão de fábrica",
       "p": 4,
       "i": 4,
       "trat": "Mitigar",
       "fb": "Trocar a senha e desativar acesso remoto."
      },
      {
       "t": "Servidor antigo sem atualização e sem suporte do fabricante",
       "p": 4,
       "i": 4,
       "trat": "Evitar",
       "fb": "Desativar e migrar."
      },
      {
       "t": "Raio queima o equipamento do rack",
       "p": 2,
       "i": 4,
       "trat": "Transferir",
       "fb": "Seguro + aterramento e nobreak."
      },
      {
       "t": "Quadro de avisos digital fora do ar por algumas horas",
       "p": 3,
       "i": 1,
       "trat": "Aceitar",
       "fb": "Impacto baixo."
      },
      {
       "t": "Professores reutilizando a mesma senha em vários sites",
       "p": 4,
       "i": 3,
       "trat": "Mitigar",
       "fb": "Gerenciador de senhas e 2FA."
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Avalie todas as ameaças",
    "ev": "rk:avaliou"
   },
   {
    "id": "m2",
    "t": "Compare com o especialista",
    "ev": "rk:comparou"
   },
   {
    "id": "m3",
    "t": "Escolha um tratamento para cada risco",
    "ev": "rk:tratou"
   },
   {
    "id": "m4",
    "t": "Acerte todos os tratamentos",
    "ev": "rk:tratou-certo"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "Senha default",
   "Credencial padrão de fábrica, documentada e conhecida; deve ser trocada na instalação."
  ],
  [
   "Travessia de diretórios",
   "Uso de ../ para acessar arquivos fora do diretório permitido."
  ],
  [
   "Formatação de strings",
   "Falha em que o atacante passa especificadores (%s, %d) e faz o programa processar mais dados do que devia."
  ],
  [
   "Buffer overflow",
   "Escrita além do limite de um buffer, sobrescrevendo a memória vizinha."
  ],
  [
   "Configuração errada",
   "Parâmetros inseguros deixados ativos por pressa, inexperiência ou displicência."
  ],
  [
   "Patch",
   "Atualização que corrige uma vulnerabilidade de software."
  ],
  [
   "Risco",
   "Evento incerto que, se ocorrer, afeta pelo menos um objetivo; ≈ probabilidade × impacto."
  ],
  [
   "Mitigar risco",
   "Reduzir probabilidade ou impacto aplicando controles."
  ],
  [
   "Transferir risco",
   "Passar o impacto financeiro a terceiros (seguro, contrato)."
  ],
  [
   "Aceitar risco",
   "Conviver com o risco quando ele está abaixo do nível aceitável ou o controle custa mais que o impacto."
  ],
  [
   "Nível de risco aceitável",
   "Limite definido pela organização a partir do qual o risco precisa ser tratado."
  ],
  [
   "CIDA",
   "Confidencialidade, Integridade, Disponibilidade e Autenticidade."
  ]
 ],
 "vf": [
  [
   "A comunidade SNMP “public” é um exemplo de configuração padrão perigosa.",
   true,
   "Verdadeiro. É conhecida e permite ler (às vezes alterar) configurações do equipamento."
  ],
  [
   "Vulnerabilidades só surgem por erro de programação.",
   false,
   "Falso. Podem surgir no projeto, na implementação, na operação ou no gerenciamento."
  ],
  [
   "Encontrar um backdoor conhecido indica que a rede provavelmente já foi atacada.",
   true,
   "Verdadeiro. Backdoors costumam ser instalados após uma invasão bem-sucedida."
  ],
  [
   "Buffer overflow ocorre quando um programa escreve mais dados do que o buffer suporta.",
   true,
   "Verdadeiro. Isso sobrescreve a memória adjacente e pode permitir execução de código."
  ],
  [
   "Aceitar um risco significa ignorá-lo sem análise.",
   false,
   "Falso. Aceitar é uma decisão consciente, após análise, de que o risco está dentro do nível aceitável."
  ],
  [
   "Contratar um seguro contra incêndio é uma forma de transferir o risco.",
   true,
   "Verdadeiro. O impacto financeiro passa para a seguradora."
  ],
  [
   "Riscos pequenos nunca precisam ser tratados, mesmo somados.",
   false,
   "Falso. A agregação de riscos pequenos e médios pode gerar um risco total significativo."
  ],
  [
   "O princípio “você não pode se proteger de algo que não conhece” fundamenta a identificação de riscos.",
   true,
   "Verdadeiro. Sem identificar riscos não há como planejar controles."
  ],
  [
   "Travessia de diretórios permite ao atacante acessar arquivos fora da pasta autorizada.",
   true,
   "Verdadeiro. Usando sequências como ../ o atacante navega para outros diretórios."
  ],
  [
   "Requisitos legais e contratuais não influenciam a análise de riscos.",
   false,
   "Falso. Devem ser considerados; uma violação legal é um impacto relevante."
  ],
  [
   "Um nobreak reduz o risco de indisponibilidade por queda de energia.",
   true,
   "Verdadeiro. É o exemplo de mitigação citado em aula."
  ],
  [
   "Configurações erradas são raras porque administradores sempre têm tempo para revisar tudo.",
   false,
   "Falso. A pressa e a inexperiência tornam as configurações erradas muito comuns."
  ]
 ],
 "caderno": [
  [
   "Em quais fases do ciclo de um sistema uma vulnerabilidade pode surgir? Dê um exemplo para cada.",
   "Projeto: protocolo que envia senha em texto claro. Implementação: programador não valida o tamanho da entrada (buffer overflow). Operação: usuário anota a senha. Gerenciamento: administrador não aplica atualizações."
  ],
  [
   "Por que senhas padrão (default) são consideradas vulnerabilidades críticas?",
   "Porque são documentadas publicamente pelos fabricantes (ex.: cisco/cisco, SNMP “public”, admin/admin), e basta uma busca para um atacante entrar. Administradores frequentemente esquecem de alterá-las."
  ],
  [
   "Explique o ataque de travessia de diretórios (directory traversal).",
   "A aplicação mapeia o pedido do usuário para um caminho de arquivo local sem validar; o atacante usa sequências como ../../ para sair do diretório permitido (ex.: /home/userX) e ler arquivos de outros locais, como /etc/passwd."
  ],
  [
   "O que é buffer overflow?",
   "É quando um programa escreve mais dados em um buffer (área de memória) do que ele comporta, sobrescrevendo áreas vizinhas. Um atacante pode usar isso para travar o programa ou executar o próprio código."
  ],
  [
   "Relate o caso do FTP anônimo visto em aula e a lição que ele traz.",
   "Um administrador configurou um FTP “seguro” para um web designer e esqueceu ativa a conta padrão anonymous. Um atacante coletou por 3 meses o arquivo de senhas de uma instituição financeira. Lição: revisar configurações, desativar contas padrão e monitorar acessos."
  ],
  [
   "Por que encontrar um backdoor conhecido na rede é um sinal grave?",
   "Porque backdoors geralmente são instalados após um ataque bem-sucedido para garantir novo acesso; significa que a rede já foi comprometida e outros ativos podem estar afetados."
  ],
  [
   "Defina risco e as três bases do gerenciamento de riscos.",
   "Risco é um evento ou condição incerta que, se ocorrer, tem efeitos (positivos ou negativos) sobre ao menos um objetivo. Bases: identificação (conhecer), avaliação (estimar probabilidade e impacto) e controle (minimizar)."
  ],
  [
   "Monte uma matriz de risco 3×3 (probabilidade × impacto) e posicione: queda de energia, vazamento de dados de alunos e meteoro atingindo o campus.",
   "Queda de energia: probabilidade alta, impacto médio → risco alto. Vazamento de dados: probabilidade média, impacto alto → risco alto. Meteoro: probabilidade baixíssima, impacto alto → risco baixo (aceitar). A matriz orienta o que tratar primeiro."
  ],
  [
   "Quais são as quatro estratégias clássicas de tratamento de risco?",
   "Mitigar (reduzir com controles, ex.: nobreak); Transferir (seguro, terceirização); Evitar (eliminar a atividade que gera o risco); Aceitar (conviver quando o custo do controle supera o impacto)."
  ],
  [
   "O que significa “agregação de riscos pequenos e médios”?",
   "Vários riscos individualmente aceitáveis podem, somados, resultar em um risco total significativo, que precisa ser tratado."
  ],
  [
   "Dê um exemplo de como um risco de disponibilidade é reduzido com um controle técnico.",
   "Risco: sistema fora do ar por queda de energia. Controle: sistema ininterrupto de energia (nobreak/UPS) e gerador. Exemplo citado em aula."
  ],
  [
   "O que significa a sigla CIDA na análise de risco?",
   "Confidencialidade, Integridade, Disponibilidade e Autenticidade: as propriedades de segurança consideradas ao avaliar o impacto dos riscos."
  ]
 ],
 "pbl": [
  {
   "titulo": "Caça às senhas padrão",
   "cenario": "O campus tem 12 switches, 3 roteadores, 20 access points, 4 impressoras de rede e 2 câmeras IP instaladas por empresas diferentes nos últimos anos. Ninguém sabe se as senhas foram trocadas.",
   "passos": [
    [
     "<ol><li>Planeje um levantamento (inventário) seguro.</li><li>Defina uma política de credenciais para equipamentos.</li><li>Estime o risco antes e depois.</li></ol>",
     "Levantamento: com autorização formal, inventariar IP/modelo/local; consultar manuais para as credenciais padrão; testar apenas nos próprios equipamentos; registrar. Política: trocar todas as senhas padrão na instalação; senhas únicas por equipamento guardadas em cofre de senhas; desabilitar SNMP public (usar SNMPv3); desativar serviços web/telnet desnecessários; revisão semestral. Risco antes: alto (probabilidade alta, impacto alto); depois: baixo/médio."
    ]
   ]
  },
  {
   "titulo": "Matriz de riscos do laboratório IFMaker",
   "cenario": "O laboratório maker tem impressoras 3D, kits de robótica, notebooks e um servidor com projetos dos alunos. Fica no térreo, perto de um bebedouro, e é usado à noite.",
   "passos": [
    [
     "<ol><li>Identifique pelo menos 8 riscos.</li><li>Classifique-os numa matriz probabilidade × impacto.</li><li>Escolha uma estratégia de tratamento para cada um.</li></ol>",
     "Riscos possíveis: furto de notebooks, vazamento de água do bebedouro, queda de energia durante impressão, incêndio por superaquecimento, perda dos projetos sem backup, malware via pendrive, acesso de pessoas não autorizadas à noite, dano a equipamentos por mau uso. Tratamentos: mitigar (armário com chave, backup, nobreak, extintor, controle de acesso), transferir (seguro patrimonial), aceitar riscos baixos. Avalie coerência entre a posição na matriz e a estratégia."
    ]
   ]
  },
  {
   "titulo": "A atualização adiada",
   "cenario": "A TI adiou por 8 meses a atualização do servidor web porque “está funcionando e não pode parar”. Um scanner público mostra que a versão tem uma vulnerabilidade crítica com exploit disponível.",
   "passos": [
    [
     "<ol><li>Analise o risco de adiar × o risco de atualizar.</li><li>Proponha um processo de gestão de patches.</li><li>Como convencer a direção?</li></ol>",
     "Adiar: probabilidade alta (exploit público), impacto alto (invasão, vazamento, defacement). Atualizar: risco de indisponibilidade breve, controlável com janela de manutenção e backup. Processo: inventário de software; monitorar boletins (CVE); classificar por severidade; testar em homologação; janela de manutenção; backup antes; aplicar; validar; registrar. Críticos em até 7 dias. Direção: mostrar custo de um incidente (imagem, LGPD, horas paradas) versus 1 hora planejada de manutenção."
    ]
   ]
  },
  {
   "titulo": "Relatório de vulnerabilidades",
   "cenario": "Em um ambiente de laboratório isolado (máquina virtual preparada pelo professor), a equipe usa uma ferramenta de varredura de vulnerabilidades (ex.: OpenVAS) e recebe 25 achados.",
   "passos": [
    [
     "<ol><li>Classifique os achados por severidade.</li><li>Priorize os 5 primeiros para correção.</li><li>Escreva um relatório executivo de 1 página.</li></ol>",
     "Rubrica: (1) achados organizados por severidade (crítica, alta, média, baixa) com base no CVSS; (2) priorização que considera severidade + exposição (serviço acessível pela internet) + criticidade do ativo; (3) relatório executivo em linguagem para gestores: resumo, riscos principais, recomendações e prazos. Importante: varreduras só em ambientes autorizados."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Riscos",
   "itens": [
    "Senhas padrão e falta de atualização lideram.",
    "Matriz probabilidade × impacto.",
    "Mitigar, transferir, evitar, aceitar."
   ]
  }
 ],
 "glossario": [
  [
   "Buffer overflow",
   "Dados além do limite sobrescrevem a memória."
  ]
 ]
});
