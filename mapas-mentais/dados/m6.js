FSI.modulo({
  n: 6, unidade: "Revisão visual", nome: "Governança, Gestão e Projetos de TI", titulo: "Governança, gestão e projetos de TI",
  resumoCurto: "Governança x gestão, COBIT, ITIL, ISO 38500, gerenciamento de projetos, riscos, caminho crítico e indicadores.",
  objetivos: ["Distinguir governança (direcionar e monitorar) de gestão (planejar e executar).", "Reconhecer o papel do COBIT, do ITIL e das normas ISO.", "Aplicar conceitos de gerenciamento de projetos: escopo, EAP, cronograma, caminho crítico e riscos.", "Usar indicadores, SLA e valor de negócio."],
  licoes: [
    { t: "Governança e gestão de TI", txt: "<p>A <b>governança</b> estabelece direção, responsabilidades e controles: avalia, dirige e monitora. A <b>gestão</b> planeja, constrói, executa e monitora as atividades para alcançar os objetivos definidos. Em resumo: a governança decide o <b>quê</b> e <b>por quê</b>; a gestão cuida do <b>como</b>.</p>", pontos: ["A <b>ISO/IEC 38500</b> traz princípios de governança de TI e o ciclo avaliar, dirigir e monitorar.", "O <b>COBIT</b> é um framework de governança e gestão de TI corporativa, com foco em objetivos, processos e controles.", "O <b>ITIL</b> reúne boas práticas de gerenciamento de serviços de TI, com valor, cadeia de valor e práticas.", "Alinhar TI ao negócio e entregar <b>valor</b> com otimização de riscos e recursos é o propósito central."], pense: "Definir a política de segurança é governança ou gestão? E aplicá-la no dia a dia?" },
    { t: "Gerenciamento de serviços", txt: "<p>Os serviços de TI são medidos por <b>acordos de nível de serviço (SLA)</b>. O gerenciamento de <b>incidentes</b> restaura o serviço o mais rápido possível; o de <b>problemas</b> busca a causa raiz; o de <b>mudanças</b> controla alterações para reduzir riscos.</p>", pontos: ["<b>Incidente</b>: interrupção ou degradação não planejada. <b>Problema</b>: causa de um ou mais incidentes.", "<b>Requisição</b> é um pedido padronizado (ex.: criar uma conta); não é falha.", "<b>Central de serviços</b> é o ponto único de contato com o usuário.", "<b>SLA</b> acordado com o cliente, <b>OLA</b> entre áreas internas e <b>contrato de apoio</b> com fornecedores."] },
    { t: "Projetos de TI", txt: "<p>Um <b>projeto</b> é temporário, tem início e fim definidos e gera um produto, serviço ou resultado único. Um processo ou uma operação são contínuos. Equilibram-se escopo, prazo, custo e qualidade (e riscos).</p>", pontos: ["A <b>EAP</b> (estrutura analítica do projeto) decompõe o escopo em pacotes de trabalho.", "O <b>caminho crítico</b> é a sequência mais longa de atividades dependentes; define o prazo mínimo. Atraso nele atrasa o projeto.", "<b>Riscos</b> são eventos incertos com impacto; tratam-se com mitigar, transferir, evitar ou aceitar.", "O <b>PMBOK</b> organiza boas práticas; as abordagens podem ser preditivas, ágeis ou híbridas.", "O <b>patrocinador</b> financia e apoia; o <b>gerente do projeto</b> conduz a execução."] }
  ],
  visuais: [
    { tipo: "rede", id: "v6-gov", titulo: "Governança x gestão", h: 400, instr: "Clique em cada nó e veja a diferença de papéis.",
      nos: [{ id: "n", x: 360, y: 50, t: "Objetivos do\nnegócio", d: "A razão de existir da TI: gerar valor para a organização." }, { id: "g", x: 150, y: 190, t: "Governança", d: "Avalia, dirige e monitora. Definida pela alta direção. Estabelece políticas e responsabilidades." }, { id: "ge", x: 570, y: 190, t: "Gestão", d: "Planeja, constrói, executa e controla. Realizada pelos gestores de TI." }, { id: "c", x: 150, y: 340, t: "COBIT / ISO 38500", d: "Referências de governança e gestão." }, { id: "i", x: 570, y: 340, t: "ITIL / PMBOK", d: "Referências para operar serviços e conduzir projetos." }],
      liga: [["n", "g"], ["n", "ge"], ["g", "ge"], ["g", "c"], ["ge", "i"]] },
    { tipo: "linha", id: "v6-proj", titulo: "Ciclo de vida de um projeto", ordenar: true, instr: "Percorra as etapas e depois monte a ordem.",
      passos: [{ t: "Iniciação", d: "Justificativa, termo de abertura e patrocinador." }, { t: "Planejamento", d: "Escopo, EAP, cronograma, custos, riscos e comunicação." }, { t: "Execução", d: "Realizar o trabalho e gerenciar a equipe." }, { t: "Monitoramento e controle", d: "Comparar o realizado com o planejado e agir." }, { t: "Encerramento", d: "Aceite, lições aprendidas e liberação de recursos." }] },
    { tipo: "classificar", id: "v6-itil", titulo: "Jogo: incidente, problema, mudança ou requisição?", instr: "Classifique cada situação.", cats: ["Incidente", "Problema", "Mudança", "Requisição"],
      itens: [["O sistema de matrícula está fora do ar", 0], ["Investigar por que o sistema cai todo mês", 1], ["Atualizar a versão do banco de dados em produção", 2], ["Criar a conta de e-mail de um novo servidor", 3], ["Impressora travada", 0], ["Análise de causa raiz de falhas recorrentes", 1]] },
    { tipo: "classificar", id: "v6-gg", titulo: "Jogo: governança ou gestão?", instr: "Associe cada atividade.", cats: ["Governança", "Gestão"],
      itens: [["Aprovar a política de segurança da informação", 0], ["Monitorar o desempenho da TI em relação às metas da diretoria", 0], ["Alocar a equipe e executar o cronograma", 1], ["Definir quem decide sobre investimentos de TI", 0], ["Operar o suporte técnico diário", 1]] }
  ],
  fc: [
    ["Qual a diferença entre governança e gestão de TI?", "Governança avalia, dirige e monitora (o quê e por quê); gestão planeja, executa e controla (o como)."],
    ["O que é o <b>COBIT</b>?", "Framework de governança e gestão de TI corporativa, com objetivos, processos e controles."],
    ["O que é o <b>ITIL</b>?", "Conjunto de boas práticas de gerenciamento de serviços de TI."],
    ["O que a <b>ISO/IEC 38500</b> define?", "Princípios para a governança corporativa de TI: avaliar, dirigir e monitorar."],
    ["Defina <b>incidente</b>.", "Interrupção não planejada ou redução da qualidade de um serviço."],
    ["Defina <b>problema</b>.", "Causa raiz de um ou mais incidentes."],
    ["O que é um <b>SLA</b>?", "Acordo de nível de serviço entre prestador e cliente, com metas mensuráveis."],
    ["O que caracteriza um <b>projeto</b>?", "É temporário e gera um produto, serviço ou resultado único."],
    ["O que é a <b>EAP</b>?", "Decomposição hierárquica do escopo em entregas e pacotes de trabalho."],
    ["O que é o <b>caminho crítico</b>?", "A sequência mais longa de atividades dependentes; define o prazo mínimo do projeto."],
    ["Quais são as respostas a riscos negativos?", "Mitigar, transferir, evitar e aceitar."],
    ["O que é o <b>termo de abertura</b>?", "Documento que autoriza formalmente o projeto e dá poderes ao gerente."]
  ],
  vf: [
    ["Governança de TI é responsabilidade apenas da equipe técnica.", false, "Falso. A governança é da alta direção: define direção, responsabilidades e controles."],
    ["O COBIT é focado exclusivamente em gerenciamento de serviços.", false, "Falso. O foco do ITIL é serviços; o COBIT trata governança e gestão de TI corporativa."],
    ["Um projeto é uma atividade contínua e repetitiva.", false, "Falso. É temporário e único. O contínuo e repetitivo é a operação."],
    ["Atrasar uma atividade no caminho crítico atrasa o projeto.", true, "Verdadeiro. Não há folga nessa sequência."],
    ["Gerenciar problemas busca a causa raiz de incidentes.", true, "Verdadeiro. O incidente restaura o serviço; o problema evita a repetição."],
    ["Uma requisição de serviço é uma falha a ser corrigida.", false, "Falso. É um pedido padronizado, como criar uma conta ou liberar acesso."],
    ["O SLA deve ter metas mensuráveis, como tempo de atendimento.", true, "Verdadeiro. Sem métricas não há como verificar o cumprimento."],
    ["Aceitar um risco é uma possível resposta ao risco.", true, "Verdadeiro. Pode ser feito de forma passiva ou com reserva de contingência."],
    ["Na gestão de mudanças, alterações podem ser feitas em produção sem avaliação para ganhar velocidade.", false, "Falso. A avaliação de riscos e a autorização reduzem a chance de causar incidentes."],
    ["O ciclo de vida do projeto inclui o encerramento com lições aprendidas.", true, "Verdadeiro. Registra o conhecimento para os próximos projetos."],
    ["O patrocinador é quem executa as tarefas técnicas do projeto.", false, "Falso. Ele financia, apoia e remove obstáculos; a equipe executa."],
    ["A governança busca entregar valor ao negócio e otimizar riscos e recursos.", true, "Verdadeiro. São os três objetivos clássicos."]
  ],
  caderno: [
    ["Explique, com um exemplo, a diferença entre governança e gestão de TI.", "Governança: a diretoria define que dados pessoais devem ter proteção e quem responde. Gestão: o gerente de TI implementa controles e monitora a conformidade."],
    ["Classifique em incidente, problema ou mudança: queda do e-mail, investigar quedas repetidas e migrar o servidor de e-mail.", "Incidente: queda. Problema: investigação de causa raiz. Mudança: migração, que exige planejamento e aprovação."],
    ["Monte uma EAP simples para o projeto “Novo site da escola”.", "1 Gerenciamento; 2 Levantamento (requisitos); 3 Design (layout); 4 Desenvolvimento (front, back); 5 Testes; 6 Implantação e treinamento."],
    ["Dadas as atividades A(3) → B(4) → D(2) e A(3) → C(6) → D(2), qual o caminho crítico e a duração?", "A–C–D: 3+6+2 = 11 dias; o outro caminho, A–B–D, soma 9. O caminho crítico é A–C–D."],
    ["Dê três riscos de um projeto de software e a resposta para cada um.", "Mudança de requisitos (mitigar com iterações), saída de membro-chave (mitigar com documentação), atraso do fornecedor (transferir com contrato e multa)."],
    ["Por que o SLA deve ser mensurável? Dê um exemplo.", "Para verificar o cumprimento: ex.: incidentes críticos atendidos em até 1 hora, com 99,5% de disponibilidade mensal."],
    ["Quais indicadores você usaria para avaliar a central de serviços?", "Tempo médio de atendimento, taxa de resolução no primeiro contato, satisfação do usuário e cumprimento do SLA."],
    ["O que é o balanced scorecard (BSC)?", "Modelo de gestão estratégica que desdobra a estratégia em objetivos e indicadores em quatro perspectivas: financeira, clientes, processos internos e aprendizado e crescimento."],
    ["O que é um PETI ou PDTIC?", "Planos que alinham a TI à estratégia: o Plano Estratégico de TI e o Plano Diretor de TIC, com metas, ações e investimentos."],
    ["Quando uma abordagem ágil é preferível à preditiva em projetos?", "Quando o escopo é incerto e muda, e há necessidade de feedback frequente. A preditiva serve a escopo bem definido e estável."]
  ],
  pbl: [
    { titulo: "Quem manda na TI?", cenario: "Em uma autarquia, cada diretoria contrata sua própria solução de TI, gerando sistemas duplicados e gasto alto.",
      passos: [["Que problema de governança há?", "Falta de direcionamento e de decisões compartilhadas sobre investimentos, sem alinhamento à estratégia."], ["Proponha um modelo.", "Comitê de TI com representantes das áreas, PDTIC, critérios de priorização e acompanhamento por indicadores."]] },
    { titulo: "O chamado que nunca acaba", cenario: "A impressora do setor trava toda semana. A equipe reinicia e fecha o chamado, mas o problema volta.",
      passos: [["O que falta no processo?", "Gerenciamento de problemas: investigar a causa raiz em vez de tratar só o sintoma."], ["Como organizar?", "Registrar recorrências, abrir um registro de problema, analisar a causa (driver, rede, hardware) e implementar a correção definitiva por meio de uma mudança controlada."]] },
    { titulo: "Cronograma estourado", cenario: "Um projeto de 6 meses está há 8 meses em execução. O cliente adicionou funcionalidades sem alterar o prazo.",
      passos: [["Que técnicas de controle faltaram?", "Controle integrado de mudanças, linha de base de escopo e análise de impacto em prazo e custo."], ["Que atitudes tomar agora?", "Renegociar escopo, prazo e custo; repriorizar; informar o patrocinador e registrar as lições aprendidas."]] }
  ],
  resumo: [
    { t: "Ideias-chave", itens: ["Governança direciona e monitora; gestão executa.", "COBIT: governança e gestão corporativa de TI; ITIL: serviços; PMBOK: projetos.", "Incidente restaura; problema trata a causa raiz.", "Projeto é temporário e único; operação é contínua.", "Atraso no caminho crítico atrasa o projeto."] },
    { t: "Erros comuns", itens: ["Confundir governança com gestão.", "Confundir ITIL com COBIT.", "Tratar incidente e problema como a mesma coisa."] }
  ],
  glossario: [["Governança", "Avaliar, dirigir e monitorar."], ["Gestão", "Planejar, executar e controlar."], ["SLA", "Acordo de nível de serviço."], ["EAP", "Estrutura analítica do projeto."], ["Caminho crítico", "Sequência mais longa de atividades."], ["PDTIC", "Plano diretor de TIC."], ["BSC", "Balanced scorecard."], ["Patrocinador", "Quem financia e apoia o projeto."]]
});
