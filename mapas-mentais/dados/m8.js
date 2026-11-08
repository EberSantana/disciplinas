FSI.modulo({
  n: 8, unidade: "Revisão visual", nome: "LGPD, TI Pública e Contratações", titulo: "LGPD, TI pública e contratações",
  resumoCurto: "Lei Geral de Proteção de Dados, princípios, bases legais, direitos, agentes e sanções, governo digital e contratações públicas de TI.",
  objetivos: ["Aplicar os princípios, as bases legais e os direitos dos titulares da LGPD.", "Distinguir controlador, operador, encarregado e ANPD.", "Reconhecer as modalidades e fases de licitação da Lei 14.133/2021.", "Relacionar o planejamento de contratações de TI a ETP, termo de referência e gestão de riscos."],
  licoes: [
    { t: "LGPD: conceitos e princípios", txt: "<p>A <b>Lei Geral de Proteção de Dados</b> (Lei 13.709/2018) regula o tratamento de dados pessoais, inclusive nos meios digitais, por pessoas naturais e jurídicas, de direito público ou privado. <b>Dado pessoal</b> é a informação relacionada a pessoa natural identificada ou identificável; <b>dado sensível</b> trata de origem racial ou étnica, convicção religiosa, opinião política, saúde, vida sexual, dados genéticos e biométricos, entre outros.</p>", pontos: ["Princípios: finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização e prestação de contas.", "<b>Titular</b> é a pessoa a quem os dados se referem; <b>controlador</b> decide sobre o tratamento; <b>operador</b> trata em nome do controlador; <b>encarregado</b> (DPO) é o canal com titulares e a ANPD.", "A <b>ANPD</b> fiscaliza, regulamenta e aplica sanções.", "<b>Anonimização</b> torna o dado não identificável; dados anonimizados, em regra, não são dados pessoais."], pense: "Coletar mais dados do que o necessário viola qual princípio?" },
    { t: "Bases legais, direitos e sanções", txt: "<p>Todo tratamento precisa de uma <b>base legal</b>. O <b>consentimento</b> é só uma delas: há também cumprimento de obrigação legal, execução de políticas públicas, estudos por órgão de pesquisa, execução de contrato, exercício regular de direitos, proteção da vida, tutela da saúde, legítimo interesse e proteção do crédito.</p>", pontos: ["O consentimento deve ser livre, informado e inequívoco, para finalidade determinada, e pode ser revogado.", "Direitos do titular: confirmação e acesso, correção, anonimização, bloqueio ou eliminação, portabilidade, informação sobre compartilhamento e revogação do consentimento.", "O incidente de segurança com risco relevante deve ser comunicado à ANPD e aos titulares.", "Sanções: advertência, multa simples (até 2% do faturamento, limitada a R$ 50 milhões por infração), multa diária, publicização, bloqueio e eliminação dos dados."] },
    { t: "Governo digital e contratações de TI", txt: "<p>A <b>Lei 14.133/2021</b> é a nova lei de licitações e contratos. As modalidades são pregão, concorrência, concurso, leilão e diálogo competitivo. O <b>pregão</b> serve a bens e serviços comuns, com critério de menor preço ou maior desconto. Contratar sem licitação só em casos de <b>dispensa</b> e <b>inexigibilidade</b>, previstos em lei.</p>", pontos: ["Fase preparatória: <b>estudo técnico preliminar (ETP)</b>, análise de riscos, <b>termo de referência</b> ou projeto básico, pesquisa de preços.", "Para soluções de TIC, a IN SGD/ME nº 94/2022 organiza o processo: documento de oficialização da demanda, ETP, gestão de riscos e termo de referência.", "A <b>Lei de Acesso à Informação</b> (12.527/2011) garante transparência: informação pública é a regra, o sigilo, a exceção.", "<b>Fiscalização</b> do contrato e <b>sanções</b> a fornecedores fazem parte da gestão contratual."] }
  ],
  visuais: [
    { tipo: "rede", id: "v8-agentes", titulo: "Agentes e relações na LGPD", h: 420, instr: "Clique em cada agente e veja o papel.",
      nos: [{ id: "t", x: 100, y: 200, t: "Titular", d: "Pessoa natural a quem os dados se referem. Exerce os direitos do art. 18." }, { id: "c", x: 360, y: 90, t: "Controlador", d: "Toma as decisões sobre o tratamento. Responde pela conformidade." }, { id: "o", x: 620, y: 200, t: "Operador", d: "Trata dados em nome do controlador, seguindo as instruções." }, { id: "e", x: 360, y: 320, t: "Encarregado (DPO)", d: "Canal de comunicação entre controlador, titulares e ANPD." }, { id: "a", x: 620, y: 360, t: "ANPD", d: "Autoridade Nacional: fiscaliza, regulamenta e sanciona." }],
      liga: [["t", "e"], ["c", "o"], ["c", "e"], ["e", "a"], ["t", "c"]] },
    { tipo: "linha", id: "v8-lic", titulo: "Fases de uma licitação", ordenar: true, instr: "Percorra as fases da Lei 14.133/2021 e depois ordene.",
      passos: [{ t: "Preparatória", d: "Planejamento, ETP, riscos, termo de referência e pesquisa de preços." }, { t: "Divulgação do edital", d: "Publicação no Portal Nacional de Contratações Públicas (PNCP)." }, { t: "Apresentação de propostas e lances", d: "Os licitantes disputam." }, { t: "Julgamento e habilitação", d: "Avalia-se a proposta e a documentação do vencedor." }, { t: "Recursos, homologação e adjudicação", d: "Defesa dos interessados e conclusão do processo." }, { t: "Contratação e fiscalização", d: "Assinatura do contrato e acompanhamento da execução." }] },
    { tipo: "classificar", id: "v8-base", titulo: "Jogo: dado pessoal ou dado sensível?", instr: "Classifique.", cats: ["Dado pessoal comum", "Dado sensível"],
      itens: [["Nome e e-mail", 0], ["Diagnóstico médico", 1], ["Impressão digital (biometria)", 1], ["Endereço residencial", 0], ["Filiação a um sindicato", 1], ["Número de matrícula escolar", 0]] },
    { tipo: "classificar", id: "v8-papel", titulo: "Jogo: quem faz o quê?", instr: "Associe a responsabilidade ao agente.", cats: ["Controlador", "Operador", "Encarregado", "ANPD"],
      itens: [["Decide as finalidades do tratamento", 0], ["Processa a folha de pagamento por contrato", 1], ["Atende solicitações de titulares", 2], ["Aplica multas e fiscaliza", 3], ["Elabora o relatório de impacto, como responsável pelo tratamento", 0], ["Recebe as comunicações da ANPD pela organização", 2]] }
  ],
  fc: [
    ["O que é <b>dado pessoal</b>?", "Informação relacionada a pessoa natural identificada ou identificável."],
    ["Dê exemplos de <b>dados sensíveis</b>.", "Origem racial ou étnica, religião, opinião política, saúde, vida sexual, dados genéticos e biométricos."],
    ["Quem é o <b>controlador</b>?", "Quem toma as decisões sobre o tratamento de dados pessoais."],
    ["Quem é o <b>operador</b>?", "Quem realiza o tratamento em nome do controlador."],
    ["Qual o papel do <b>encarregado</b>?", "Ser o canal entre o controlador, os titulares e a ANPD."],
    ["O consentimento é a única base legal da LGPD?", "Não. Há várias, como obrigação legal, execução de contrato e legítimo interesse."],
    ["Cite três direitos do titular.", "Acesso, correção, anonimização, bloqueio ou eliminação, portabilidade, revogação do consentimento."],
    ["O que é <b>anonimização</b>?", "Processo que torna o dado não identificável por meios técnicos razoáveis."],
    ["Quais as modalidades da Lei 14.133/2021?", "Pregão, concorrência, concurso, leilão e diálogo competitivo."],
    ["Para que serve o <b>ETP</b>?", "Estudo técnico preliminar: analisa a necessidade, as soluções e a viabilidade da contratação."],
    ["O que é <b>inexigibilidade</b> de licitação?", "Quando a competição é inviável, como em fornecedor exclusivo; prevista em lei."],
    ["O que garante a Lei de Acesso à Informação?", "Transparência: a divulgação é a regra e o sigilo, exceção."]
  ],
  vf: [
    ["A LGPD só se aplica a empresas privadas.", false, "Falso. Aplica-se também ao poder público, com regras específicas."],
    ["O consentimento é exigido para qualquer tratamento de dados pessoais.", false, "Falso. Existem outras bases legais, como obrigação legal, contrato e políticas públicas."],
    ["O titular pode revogar o consentimento a qualquer momento.", true, "Verdadeiro. A revogação deve ser facilitada, por procedimento gratuito."],
    ["O operador decide as finalidades do tratamento.", false, "Falso. Isso cabe ao controlador; o operador segue as instruções."],
    ["Dados anonimizados são, em regra, considerados dados pessoais.", false, "Falso. Se a anonimização for efetiva e irreversível por meios razoáveis, deixam de ser dados pessoais."],
    ["O encarregado é o canal de comunicação com titulares e com a ANPD.", true, "Verdadeiro. Também orienta os funcionários sobre as práticas de proteção de dados."],
    ["A multa da LGPD pode chegar a 2% do faturamento, limitada a R$ 50 milhões por infração.", true, "Verdadeiro. Há ainda outras sanções, como advertência e bloqueio dos dados."],
    ["O pregão é indicado para obras de engenharia complexas.", false, "Falso. Serve a bens e serviços comuns; obras e serviços de engenharia têm regras próprias."],
    ["O ETP faz parte da fase preparatória da contratação.", true, "Verdadeiro. Justifica a necessidade e compara as alternativas."],
    ["A inexigibilidade de licitação ocorre quando a competição é inviável.", true, "Verdadeiro. Exemplo: fornecedor exclusivo."],
    ["Segundo a LAI, o sigilo é a regra e a publicidade é a exceção.", false, "Falso. A publicidade é a regra; o sigilo, a exceção, nos casos legais."],
    ["Incidentes de segurança com risco relevante devem ser comunicados à ANPD e aos titulares.", true, "Verdadeiro. A comunicação deve ocorrer em prazo razoável e conter as informações exigidas."]
  ],
  caderno: [
    ["Dê dois exemplos de dados pessoais e dois de dados sensíveis em um sistema escolar.", "Pessoais: nome, matrícula, endereço. Sensíveis: laudo médico, informações de saúde e dados biométricos usados no ponto."],
    ["Escolha a base legal mais adequada para: enviar boletim, divulgar fotos de aluno no Instagram e cumprir exigência do MEC.", "Boletim: execução de políticas públicas ou obrigação legal. Fotos: consentimento (do responsável, para menores). Exigência do MEC: obrigação legal."],
    ["Explique o princípio da necessidade com um exemplo.", "Tratar apenas os dados indispensáveis à finalidade: para emitir carteirinha, não é necessário pedir a renda familiar."],
    ["Quais providências a organização deve tomar em caso de vazamento?", "Conter o incidente, avaliar o risco, comunicar a ANPD e os titulares quando houver risco relevante, documentar e corrigir as causas."],
    ["Diferencie controlador e operador com um exemplo de prefeitura e empresa de folha de pagamento.", "Prefeitura (controladora) decide para que usar os dados; a empresa que processa a folha, a pedido dela, é operadora."],
    ["O que é um relatório de impacto à proteção de dados (RIPD)?", "Documento que descreve processos de tratamento que possam gerar riscos às liberdades e aos direitos dos titulares e as medidas de mitigação."],
    ["Liste as etapas da fase preparatória de uma contratação de TI.", "Demanda, ETP, gestão de riscos, pesquisa de preços, termo de referência e aprovação."],
    ["Quando é possível dispensar a licitação? Dê um exemplo.", "Em casos previstos em lei, como contratações de pequeno valor ou emergência justificada."],
    ["O que é o termo de referência e quais elementos mínimos ele contém?", "Documento com a definição do objeto, justificativa, requisitos, critérios de aceitação, prazos, obrigações, valor estimado e forma de fiscalização."],
    ["Como a LAI se relaciona com a LGPD no setor público?", "A transparência é a regra, mas dados pessoais devem ser protegidos; é preciso conciliar o acesso à informação com a proteção da intimidade."]
  ],
  pbl: [
    { titulo: "A lista de alunos no mural", cenario: "Uma escola publica, no mural externo, a lista de alunos com nome, CPF e notas.",
      passos: [["Que princípios da LGPD foram violados?", "Necessidade (CPF é desnecessário), finalidade e segurança, além de risco à privacidade."], ["Que correção propor?", "Divulgar apenas a matrícula ou o nome, conforme a necessidade, e disponibilizar notas em área restrita."]] },
    { titulo: "Vazamento em fornecedor", cenario: "Uma empresa contratada para o sistema acadêmico sofreu um ataque e dados de alunos foram expostos.",
      passos: [["Quem responde?", "Controlador e operador têm responsabilidades; o controlador responde perante os titulares e a ANPD e pode ter direito de regresso."], ["Que cláusulas contratuais deveriam existir?", "Obrigações de segurança, prazos de comunicação de incidentes, auditoria, subcontratação controlada e sanções."]] },
    { titulo: "Contratar um sistema de gestão", cenario: "Um instituto precisa contratar um sistema de gestão acadêmica. Pretende contratar diretamente um conhecido do diretor.",
      passos: [["Que problema há e o que fazer?", "Risco de violar licitação, impessoalidade e moralidade. É necessário o planejamento e o processo competitivo, salvo hipótese legal."], ["Como planejar a contratação?", "Documento de demanda, ETP comparando soluções, gestão de riscos, pesquisa de preços e termo de referência, antes da modalidade adequada."]] }
  ],
  resumo: [
    { t: "Ideias-chave", itens: ["LGPD: princípios, bases legais e direitos do titular.", "Controlador decide, operador executa, encarregado faz a ponte e a ANPD fiscaliza.", "Consentimento é só uma das bases legais.", "Lei 14.133: preparação, divulgação, julgamento, homologação e contrato.", "LAI: publicidade é a regra."] },
    { t: "Erros comuns", itens: ["Achar que tudo exige consentimento.", "Confundir controlador com operador.", "Contratar sem planejamento nem competição."] }
  ],
  glossario: [["Titular", "Pessoa a quem os dados se referem."], ["Controlador", "Decide sobre o tratamento."], ["Operador", "Trata em nome do controlador."], ["Encarregado", "Canal com titulares e ANPD."], ["ANPD", "Autoridade Nacional de Proteção de Dados."], ["ETP", "Estudo técnico preliminar."], ["Termo de referência", "Documento que descreve o objeto e as condições da contratação."], ["LAI", "Lei de Acesso à Informação."]]
});
