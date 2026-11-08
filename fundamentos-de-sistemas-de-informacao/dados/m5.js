FSI.modulo({
  n: 5, unidade: "Unidade 5", nome: "Desenvolvimento de sistemas", titulo: "Como são desenvolvidos os sistemas de informação?",
  resumoCurto: "Ciclo de vida, prototipagem, estratégias (in-house, pacote, terceirização, usuário final) e gestão da mudança organizacional.",
  duracao: "5 h",
  analogia: { titulo: "Construir uma casa", txt: "<p>Ninguém começa uma casa assentando tijolos. Primeiro se entende a família (<b>investigação e análise</b>), depois se faz a planta (<b>projeto</b>), aí vem a obra (<b>implementação</b>), a mudança (<b>implantação</b>) e, por anos, os consertos (<b>manutenção</b>). Pular etapas custa caro: mudar uma parede na planta é barato; derrubá-la depois de pronta, não.</p><p>E dá para escolher: construir do zero com sua equipe (<b>in-house</b>), comprar uma casa pronta e adaptar (<b>pacote</b>), contratar uma construtora (<b>terceirização</b>) ou fazer você mesmo um puxadinho (<b>desenvolvimento pelo usuário final</b>). E, se a família não quiser se mudar, a casa nova fica vazia: é a <b>gestão da mudança</b>.</p>" },
  chave: [
    "Ciclo de vida: <b>investigação, análise, projeto, implementação, implantação (conversão) e manutenção</b>.",
    "<b>Prototipagem</b>: versões rápidas e iterativas para o usuário validar cedo.",
    "Estratégias: <b>in-house</b>, <b>pacote</b> (software pronto), <b>terceirização</b> e <b>desenvolvimento pelo usuário final</b>.",
    "Conversão: <b>direta</b>, <b>paralela</b>, <b>piloto</b> ou <b>em fases</b> — cada uma com risco e custo diferentes.",
    "Erros descobertos tarde custam muito mais caro que os descobertos na análise.",
    "Sistemas mudam a organização: a <b>gestão da mudança</b> e o envolvimento dos usuários decidem o sucesso."
  ],
  termos: [["Ciclo de vida", "Etapas do desenvolvimento de um sistema."], ["Prototipagem", "Versões rápidas para validar com o usuário."], ["Pacote", "Software pronto, adaptado à empresa."], ["Terceirização", "Contratar outra empresa para desenvolver/operar."], ["Conversão paralela", "Sistemas novo e antigo rodando juntos."], ["Gestão da mudança", "Preparar pessoas e processos para o novo sistema."]],
  objetivos: ["Entender o desenvolvimento de SI como <b>solução de problemas</b>.", "Descrever as <b>cinco fases</b> do ciclo de vida e a <b>prototipagem</b>.", "Comparar as <b>estratégias</b>: in-house, pacote, terceirização e usuário final.", "Aplicar estratégias para <b>reduzir a resistência</b> à mudança."],
  licoes: [
    { t: "Solucionando problemas com sistemas de informação", txt: "<p>Desenvolver um SI normalmente é a resposta a um <b>problema de negócio</b>, em três passos: (1) entender o problema e avaliar alternativas; (2) desenvolver a solução escolhida; (3) implantá-la. No exemplo da planilha de orçamento doméstico: entender onde o dinheiro é gasto; construir a planilha (entradas, processamento do saldo, saída); usar e refinar a solução.</p>", pense: "A “Fábula dos porcos assados” mostra o perigo de resolver problemas sem pensar crítica e criativamente. Que lição ela traz?" },
    { t: "O ciclo de vida do desenvolvimento", txt: "<p>Todo projeto de SI, de qualquer tamanho, passa por um ciclo: <b>definição, análise, projeto, implantação, operação/manutenção</b>.</p>", pontos: ["<b>Definição</b>: estimar as dimensões do problema (perspectivas sociotécnicas), estudo preliminar de soluções, recursos, custos, benefícios e viabilidade.", "<b>Análise</b>: estudo em profundidade das necessidades de informação; produto = <b>lista de requisitos funcionais</b>. Diz <i>o que</i> o sistema deve fazer.", "<b>Projeto</b>: diz <i>como</i> fará — projeto da <b>interface</b>, dos <b>dados</b> e do <b>processo</b>.", "<b>Implantação</b>: aquisição de hardware/software, programação, <b>treinamento</b>, testes, documentação e conversão do sistema antigo.", "<b>Manutenção</b>: ajustes, melhorias, adaptação, expansão, monitoração e avaliação de resultados."] },
    { t: "Prototipagem e participantes", txt: "<p><b>Prototipagem</b> (RAD — <i>rapid application development</i>) é o desenvolvimento rápido e o teste de modelos de funcionamento em processo <b>iterativo</b>, com especialistas técnicos e usuários finais; o protótipo é aperfeiçoado até ficar adequado. É útil quando os requisitos do usuário não são claros no início.</p><p>Participam <b>especialistas técnicos</b> (analistas, programadores, DBAs, redes) e <b>especialistas empresariais</b> (áreas funcionais e processos): os empresariais descrevem problemas, aprovam especificações e validam testes; os técnicos modelam, codificam e testam.</p>" },
    { t: "Estratégias de desenvolvimento", txt: "<p>Três alternativas básicas — e uma variação:</p>", pontos: ["<b>In-house</b> (desenvolvimento próprio): + atende os pré-requisitos e permite evoluir a qualquer instante; − alto custo da equipe, dificuldade de acompanhar a tecnologia, vulnerabilidade de informações.", "<b>Pacote (software de prateleira)</b>: + ganho de tempo e dinheiro, menos trabalho interno; − pode não atender requisitos próprios; customização aumenta o gasto.", "<b>Terceirização (outsourcing)</b>: + economia (custo fixo → variável), liberação de pessoas internas, qualidade; − dependência de fornecedores, risco de perder a “inteligência do negócio” (caso Bradesco).", "<b>Desenvolvimento pelo usuário final</b> (dentro do in-house): + menor tempo/custo, reduz a fila de pedidos (<i>backlog</i>); − proliferação descontrolada, sistemas fora de padrões de qualidade e segurança."] },
    { t: "Administrando a mudança organizacional", txt: "<p>Introduzir um SI é uma <b>mudança organizacional</b>. Os graus (Laudon e Laudon): <b>automação</b> e <b>racionalização</b> (comuns, retorno modesto, risco pequeno); <b>reengenharia</b> (processos reprojetados) e <b>mudança de paradigma</b> (repensar a natureza do negócio) — maior retorno, maior risco.</p><p>Muitos sistemas falham porque a mudança não foi bem tratada (caso <b>Escola Pequenino</b>: o sistema Siae foi rejeitado, ficou rígido e voltou-se ao papel). Estratégias contra a resistência:</p>", pontos: ["<b>Envolver</b> o usuário final durante o desenvolvimento (autoria e comprometimento).", "Melhor <b>comunicação</b> entre usuários e técnicos (falam “línguas diferentes”).", "<b>Educação e treinamento</b> adequados.", "<b>Apoio da alta administração</b>.", "<b>Ajustar os processos</b> organizacionais antes de implantar o sistema."] }
  ],
  visuais: [
    { tipo: "rede", id: "v5-ciclo", titulo: "Ciclo de vida do desenvolvimento de sistemas", layout: "ciclo", dir: true, forma: "elipse", h: 430,
      instr: "Clique em cada fase. Veja o produto principal e as atividades. Note que o ciclo recomeça.",
      nos: [{ id: "d", t: "Definição", d: "Estimar o problema, estudo preliminar, viabilidade. Pergunta: <i>vale a pena e é possível?</i>" }, { id: "a", t: "Análise", d: "Estudo detalhado das necessidades de informação. Produto: lista de <b>requisitos funcionais</b> (o <i>que</i> o sistema faz)." }, { id: "p", t: "Projeto", d: "<i>Como</i> será feito: interface (telas, formulários, relatórios), dados e processos." }, { id: "i", t: "Implantação", d: "Aquisição, programação, treinamento, testes, documentação e conversão do sistema antigo." }, { id: "m", t: "Manutenção", d: "Ajustes, melhorias, adaptação e expansão; monitoração dos resultados. Novas necessidades reiniciam o ciclo." }],
      liga: [["d", "a"], ["a", "p"], ["p", "i"], ["i", "m"], ["m", "d"]] },
    { tipo: "linha", id: "v5-proto", titulo: "Linha do tempo da prototipagem", ordenar: true,
      instr: "Ao contrário do ciclo tradicional, a prototipagem é repetitiva. Percorra e depois ordene.",
      passos: [{ t: "Identificar requisitos básicos", d: "Usuários e analistas levantam o essencial (não precisa ser completo)." }, { t: "Construir protótipo", d: "Um modelo funcional é desenvolvido rapidamente." }, { t: "Usuário testa", d: "Os usuários finais interagem com o protótipo e avaliam." }, { t: "Revisar e refinar", d: "Ajusta-se o protótipo conforme o retorno. Repete-se o ciclo." }, { t: "Sistema final aceito", d: "Quando os usuários estão satisfeitos, o protótipo vira o sistema adequado." }] },
    { tipo: "camadas", id: "v5-mud", titulo: "Graus de mudança organizacional: risco e retorno crescentes", forma: "pilha", h: 300,
      instr: "De cima para baixo, aumentam o alcance, o retorno e o risco. Clique em cada grau.",
      camadas: [{ t: "Mudança de paradigma", d: "Repensar a natureza do próprio negócio. Máximo impacto, máximo risco.", ex: "uma livraria que passa a ser empresa de streaming" }, { t: "Reengenharia", d: "Os processos são analisados, simplificados e reprojetados.", ex: "refazer todo o fluxo de abertura de conta de um banco" }, { t: "Racionalização", d: "Ajusta procedimentos padrão e elimina gargalos, normalmente surgidos após a automação.", ex: "cortar etapas redundantes do pedido informatizado" }, { t: "Automação", d: "Executar com mais eficiência as atividades rotineiras. Retorno modesto, baixo risco.", ex: "informatizar o controle de ponto" }] },
    { tipo: "classificar", id: "v5-cls1", titulo: "Jogo: a qual fase do ciclo pertence cada atividade?", instr: "Associe as atividades às fases.",
      cats: ["Definição", "Análise", "Projeto", "Implantação", "Manutenção"],
      itens: [["Avaliar viabilidade, custos e benefícios", 0], ["Entrevistar usuários e listar requisitos funcionais", 1], ["Desenhar telas, relatórios e estrutura de dados", 2], ["Treinar usuários e converter o sistema antigo", 3], ["Programar e testar", 3], ["Monitorar o desempenho e ajustar o sistema em uso", 4], ["Estudo preliminar das soluções possíveis", 0]] },
    { tipo: "classificar", id: "v5-cls2", titulo: "Jogo: vantagem ou desvantagem de qual estratégia?", instr: "Associe cada característica à estratégia correspondente.",
      cats: ["Própria (in-house)", "Terceirização", "Pacote", "Usuário final"],
      itens: [["Alto custo de manter equipe especializada", 0], ["Garante melhor o atendimento dos pré-requisitos", 0], ["Dependência de fornecedores externos", 1], ["Libera recursos humanos internos para outros projetos", 1], ["Pode não atender requisitos próprios da empresa", 2], ["Ganho de tempo e de dinheiro", 2], ["Pode levar à proliferação descontrolada de sistemas", 3], ["Reduz a fila de solicitações não atendidas (backlog)", 3]] }
  ],
  lab: {
    intro: "Você é o gerente do projeto do novo sistema da biblioteca da escola. Tome as decisões em cada fase e mantenha o projeto saudável. Depois, ordene o ciclo de vida e compare os custos das estratégias.",
    sims: [
      { tipo: "cenarios", titulo: "Gerente do projeto da biblioteca", cfg: { id: "proj", rotulo: "Decisão", embaralhar: false, medidor: { nome: "Saúde do projeto", ini: 50 }, itens: [
        { t: "A diretora diz: “quero um sistema para a biblioteca”. Qual o primeiro passo?", ops: [["Investigar o problema e a viabilidade com bibliotecária e alunos", true, "Entender o problema antes de qualquer solução."], ["Comprar logo um software", false, "Sem saber o problema, a compra é um tiro no escuro."], ["Começar a programar", false, "Programar sem análise gera retrabalho caro."]] },
        { t: "Na análise, a bibliotecária não consegue descrever como quer as telas.", ops: [["Fazer um protótipo rápido para ela testar e opinar", true, "A prototipagem torna o requisito concreto."], ["Escrever um documento de 80 páginas", false, "Ela continuaria sem visualizar."], ["Decidir sozinho como ela quer", false, "Sem o usuário, o risco de rejeição sobe."]] },
        { t: "A escola não tem programadores e há vários sistemas de biblioteca prontos no mercado.", ops: [["Avaliar e adotar um pacote, adaptando o necessário", true, "Rápido e mais barato quando o processo é padrão."], ["Contratar uma equipe in-house", false, "Caro e lento para um problema comum."], ["Pedir que um aluno faça no fim de semana", false, "Desenvolvimento pelo usuário final tem riscos de qualidade e suporte."]] },
        { t: "Os dados de 3 mil livros estão num caderno e numa planilha antiga.", ops: [["Planejar a conversão e a limpeza dos dados antes de implantar", true, "Entra lixo, sai lixo: dados ruins arruínam o sistema novo."], ["Ignorar os dados antigos", false, "O acervo é o coração do sistema."], ["Digitar tudo no dia da inauguração", false, "Sem planejamento, haverá erros e atrasos."]] },
        { t: "É hora de pôr o sistema no ar. Não pode haver risco de perder empréstimos.", ops: [["Conversão paralela por algumas semanas", true, "Os dois sistemas rodam juntos: mais trabalho, menos risco."], ["Conversão direta numa segunda-feira", false, "Se algo falhar, não há volta."], ["Não converter nunca", false, "O projeto não entregaria valor."]] },
        { t: "Alguns professores resistem: “o caderno sempre funcionou”.", ops: [["Envolver, treinar e mostrar ganhos concretos: gestão da mudança", true, "Pessoas são parte do sistema sociotécnico."], ["Obrigar por decreto", false, "Imposição gera boicote silencioso."], ["Ignorar e esperar que se acostumem", false, "A resistência tende a crescer."]] },
        { t: "Seis meses depois, pedem um relatório de livros mais emprestados.", ops: [["Tratar como manutenção evolutiva", true, "Manutenção é a fase mais longa e inclui melhorias."], ["Recomeçar o projeto do zero", false, "Uma melhoria não exige um sistema novo."], ["Dizer que o sistema está pronto e não muda", false, "Sistemas vivos evoluem com a organização."]] }] } },
      { tipo: "linha", id: "lab-ciclo", titulo: "Ponha o ciclo de vida em ordem", instr: "Percorra as fases e depois resolva o desafio de ordenar.", ordenar: true, passos: [
        { t: "Investigação", d: "Qual é o problema? Vale a pena resolver?" },
        { t: "Análise", d: "Levantar requisitos com os usuários." },
        { t: "Projeto", d: "Definir como o sistema vai funcionar." },
        { t: "Implementação", d: "Construir, adquirir ou adaptar e testar." },
        { t: "Implantação", d: "Converter dados, treinar e pôr no ar." },
        { t: "Manutenção", d: "Corrigir, adaptar e melhorar ao longo dos anos." }] }
    ],
    missoes: [
      { id: "m1", t: "Tome 4 decisões corretas", ev: "proj:acertos:4" },
      { id: "m2", t: "Mantenha a saúde do projeto em 80% ou mais", ev: "proj:medidor80" },
      { id: "m3", t: "Conduza o projeto até o fim", ev: "proj:fim" },
      { id: "m4", t: "Conduza o projeto sem nenhum erro", ev: "proj:perfeito" },
      { id: "m5", t: "Veja todas as fases do ciclo", ev: "vis:lab-ciclo" },
      { id: "m6", t: "Ordene o ciclo de vida corretamente", ev: "ord:lab-ciclo" }
    ],
    guiados: [
      { titulo: "Qual estratégia sai mais barata em 3 anos?", txt: "<p>Horizonte: <b>36 meses</b>.<br>• <b>In-house:</b> R$ 60.000 para desenvolver + R$ 1.000/mês de manutenção.<br>• <b>Pacote:</b> R$ 15.000 de licença e adaptação + R$ 800/mês.<br>• <b>Terceirização:</b> R$ 2.500/mês, tudo incluído.</p>", passos: [
        { p: "Custo total do in-house em 36 meses (R$)", r: 96000, un: "R$", dica: "60.000 + 36 × 1.000.", expl: "60.000 + 36.000 = R$ 96.000." },
        { p: "Custo total do pacote em 36 meses (R$)", r: 43800, un: "R$", dica: "15.000 + 36 × 800.", expl: "15.000 + 28.800 = R$ 43.800." },
        { p: "Custo total da terceirização em 36 meses (R$)", r: 90000, un: "R$", dica: "36 × 2.500.", expl: "R$ 90.000." },
        { p: "Quanto o pacote economiza em relação à opção mais cara (R$)?", r: 52200, un: "R$", dica: "In-house − pacote.", expl: "96.000 − 43.800 = R$ 52.200. Para um processo padrão como uma biblioteca, o pacote vence; o in-house se justifica quando o processo é único e estratégico." }] }
    ]
  },
  fc: [
    ["Os três passos para solucionar um problema com SI?", "Entender o problema e avaliar alternativas; desenvolver a solução escolhida; implantar a solução."],
    ["As cinco fases do ciclo de vida?", "Definição, análise, projeto, implantação e manutenção (operação)."],
    ["Qual o produto da análise?", "Uma lista de requisitos funcionais — o <i>que</i> o sistema deve fazer."],
    ["Quais as três atividades do projeto do sistema?", "Projeto da interface, dos dados e do processo — o <i>como</i>."],
    ["O que envolve a implantação?", "Aquisição, programação, treinamento, testes, documentação e conversão do sistema antigo."],
    ["O que é <b>prototipagem</b> (RAD)?", "Desenvolvimento rápido e iterativo de protótipos com usuários, refinados até ficarem adequados."],
    ["Quando a prototipagem é especialmente útil?", "Quando os requisitos do usuário final não são claros no início."],
    ["Três estratégias básicas de desenvolvimento?", "Desenvolver em casa (in-house), contratar terceiros (outsourcing) ou adquirir pacote (software de prateleira)."],
    ["Principal risco da terceirização (caso Bradesco)?", "Perder a “inteligência do negócio”: dependência dos fornecedores na criação dos programas."],
    ["Quais os quatro graus de mudança organizacional?", "Automação, racionalização, reengenharia e mudança de paradigma."],
    ["Cinco estratégias para superar a resistência do usuário?", "Envolvimento do usuário, melhor comunicação, treinamento, apoio da alta administração e ajuste dos processos antes da implantação."],
    ["Por que técnicos e usuários “falam línguas diferentes”?", "Técnicos pensam em eficiência de hardware/software; usuários, em tarefas e facilidade de uso."]
  ],
  vf: [
    ["Só projetos grandes e complexos têm ciclo de vida de desenvolvimento.", false, "Falso. Todos os projetos, independentemente de tamanho, tecnologia ou complexidade, têm um ciclo de vida."],
    ["A análise diz o que o sistema deve fazer; o projeto diz como ele fará.", true, "Verdadeiro. Análise → requisitos funcionais; projeto → especificações (interface, dados e processos)."],
    ["O treinamento do usuário final faz parte da fase de implantação.", true, "Verdadeiro. Junto com aquisição, programação, testes, documentação e conversão."],
    ["Depois que o sistema é implantado, o ciclo termina e não há mais atividades.", false, "Falso. Começa a manutenção: ajustes, melhorias, adaptação, expansão e avaliação de resultados."],
    ["A prototipagem é um processo único e linear, sem repetições.", false, "Falso. É iterativa: o protótipo é testado e refinado repetidamente até ser adequado."],
    ["Software de prateleira dispensa a necessidade de escrever programas, mas pode não atender requisitos próprios.", true, "Verdadeiro. Reduz trabalho e tempo, porém a customização aumenta o gasto."],
    ["A terceirização transforma custos fixos em variáveis, mas gera dependência de fornecedores.", true, "Verdadeiro. É uma vantagem econômica com o risco da dependência (e da perda de conhecimento do negócio)."],
    ["Desenvolvimento pelo usuário final tem como risco a proliferação descontrolada de sistemas.", true, "Verdadeiro. Além de sistemas fora dos padrões de qualidade e segurança."],
    ["Automação e reengenharia têm o mesmo nível de risco e retorno.", false, "Falso. A automação tem retorno modesto e risco pequeno; a reengenharia tem impacto maior, e mais risco."],
    ["No caso Escola Pequenino, a falha foi puramente técnica.", false, "Falso. Faltou tratar a mudança: pouca flexibilidade, conflito com a secretária, análise incompleta dos requisitos, equipamentos subdimensionados."],
    ["Ajustar os processos da organização depois da implantação reduz a resistência.", false, "Falso. Os ajustes devem ser feitos <b>antes</b>, para não parecer que o “programa” é que muda o trabalho das pessoas."],
    ["O apoio da alta administração é importante para implantar novas políticas e processos exigidos pelo sistema.", true, "Verdadeiro. Dá força de implantação às mudanças."]
  ],
  caderno: [
    ["Cite e defina, com suas palavras, cada fase do ciclo de desenvolvimento.", "Definição: delimitar o problema e verificar viabilidade. Análise: levantar requisitos. Projeto: especificar interface, dados e processos. Implantação: construir, treinar, testar, converter. Manutenção: ajustar, melhorar e monitorar."],
    ["O que é prototipagem? Cite benefícios e limitações.", "Construção rápida e iterativa de modelos para os usuários avaliarem. Benefícios: clareza dos requisitos, envolvimento do usuário, velocidade. Limitações (reflexão): documentação fraca, risco de transformar protótipo em produto sem qualidade, escopo que cresce sem controle."],
    ["Vantagens e desvantagens de desenvolver baseado em pacotes de software.", "Vantagens: menos projeto, programação, instalação e manutenção; ganho de tempo e dinheiro. Desvantagens: pode não atender requisitos próprios; customização aumenta o gasto; dependência do fornecedor."],
    ["O que é desenvolvimento pelo usuário final? Vantagens e desvantagens.", "Usuários criam relatórios/sistemas com ferramentas amigáveis, sem ou com pouca ajuda de TI. Vantagens: rapidez, menor custo, reduz backlog. Desvantagens: proliferação descontrolada, padrões de qualidade e segurança frágeis."],
    ["O que é terceirização? Em que circunstâncias deve ser usada?", "Uso de fornecedor externo para construir ou operar o SI (total ou parcial). Quando não há tempo ou dinheiro para fazer internamente, quando o setor não é diferencial, desde que a empresa mantenha o controle das decisões estratégicas."],
    ["Releia o caso da Escola Pequenino: quais estratégias evitariam a resistência ao Siae?", "Envolver a secretária e os usuários desde o levantamento; melhorar a comunicação; treinar; ter apoio da direção; ajustar processos antes; validar requisitos (renegociação de pagamentos, transferência de alunos); prototipar."],
    ["Diferencie análise e projeto de sistemas usando um exemplo do cotidiano.", "Análise: definir que o app de pedidos deve permitir escolher sabor e pagar. Projeto: desenhar as telas, tabelas de dados e o fluxo de cada operação."],
    ["Por que o treinamento é “vital” para a aceitação de um sistema?", "Porque o usuário precisa saber operar e entender como a tecnologia afeta seu trabalho; sem isso, surge insegurança, erros e resistência."],
    ["Explique os quatro graus de mudança organizacional e dê exemplo de cada um.", "Automação (informatizar o ponto), racionalização (eliminar gargalos), reengenharia (reprojetar processos), mudança de paradigma (repensar o negócio). Riscos e retornos crescem."],
    ["Quem participa do ciclo de desenvolvimento e o que faz cada tipo de especialista?", "Técnicos (analistas, programadores, DBAs, redes): modelam, codificam, testam. Empresariais: identificam problemas, fornecem requisitos, aprovam especificações, validam testes e participam da conversão."]
  ],
  pbl: [
    { titulo: "Sistema de controle da biblioteca escolar", cenario: "A biblioteca da escola controla empréstimos em cadernos. A bibliotecária, com 20 anos de casa, teme ser substituída. A direção quer um sistema pronto no mês que vem.",
      passos: [["Escolha a estratégia (própria, pacote, terceirização ou usuário final) e justifique.", "Provavelmente pacote (software de biblioteca) pelo prazo e custo, com customização mínima. Justificar pela vantagem de tempo e dinheiro e por requisitos comuns; avaliar suporte, usabilidade e custo."],
        ["Elabore um plano de gestão da mudança com cinco ações.", "Envolver a bibliotecária desde a escolha; comunicação clara de que o sistema apoia, não substitui; treinamento; apoio explícito da direção; ajustar regras de empréstimo antes; migração gradual dos dados."]] },
    { titulo: "Do problema ao sistema: reservas da quadra", cenario: "Alunos reclamam que as reservas da quadra se perdem. O grêmio quer um sistema.",
      passos: [["Percorra as cinco fases e liste ao menos um resultado de cada uma.", "Definição: problema e viabilidade. Análise: requisitos (reservar, cancelar, ver horários). Projeto: telas e dados (usuário, horário, quadra). Implantação: programar, testar, treinar. Manutenção: ajustes após o uso."],
        ["Como a prototipagem ajudaria e qual seria o primeiro protótipo?", "Mostra rapidamente uma tela de horários (mesmo no papel ou numa planilha) para os alunos testarem e opinarem, refinando os requisitos antes de programar tudo."]] },
    { titulo: "A empresa que terceirizou demais", cenario: "Uma empresa entregou todo o desenvolvimento a um fornecedor. Hoje não consegue mudar nada sem pagar caro e ninguém internamente entende as regras do sistema.",
      passos: [["Que riscos do livro se concretizaram?", "Dependência de fornecedores; perda da inteligência do negócio (caso Bradesco: “fomos longe demais”); dificuldade de atualização tecnológica; vulnerabilidade de informações."],
        ["Proponha um modelo híbrido de retomada de controle.", "Manter internamente arquitetura, requisitos e decisões; contratar terceiros para execução; documentação e contratos claros; equipe pequena de gestão de contratos e conhecimento do negócio."]] }
  ],
  resumo: [
    { t: "Ideias-chave", itens: ["Solução de problemas: entender → desenvolver → implantar.", "Ciclo: <b>definição → análise → projeto → implantação → manutenção</b>.", "Prototipagem = iterativa e rápida, com o usuário.", "Estratégias: in-house, pacote, terceirização e desenvolvimento pelo usuário final — cada uma com vantagens e desvantagens.", "Mudança: automação, racionalização, reengenharia, paradigma; reduzir resistência com <b>envolvimento, comunicação, treinamento, apoio da alta direção e ajuste prévio dos processos</b>."] }
  ],
  glossario: [["Ciclo de vida", "Sequência de fases pela qual passa um projeto de SI."], ["Requisito funcional", "O que o sistema deve fazer."], ["Prototipagem / RAD", "Desenvolvimento rápido e iterativo de protótipos."], ["In-house", "Desenvolvimento feito pela própria empresa."], ["Outsourcing", "Terceirização."], ["Software de prateleira", "Pacote pronto adquirido no mercado."], ["Backlog", "Fila de solicitações não atendidas."], ["Reengenharia", "Análise, simplificação e reprojeto de processos."]]
});
