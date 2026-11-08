FSI.modulo({
  n: 6, unidade: "Escalonamento", nome: "Escalonamento de processos", titulo: "Quem manda na fila? Técnicas de escalonamento de processos", duracao: "5 h",
  resumoCurto: "Critérios de escalonamento, preemptivo e não preemptivo, FIFO, SJF, circular (Round Robin), prioridades e circular com prioridades — com simulador e gráfico de Gantt.",
  analogia: { titulo: "A fila do brinquedo no parque", txt: "<p>No parque de diversões, o gerente da fila do brinquedo mais popular precisa decidir quem vai primeiro. Se for por ordem de chegada, quem chegou com um grupo de 30 pessoas na frente faz todo mundo esperar (o <b>efeito comboio</b>). Se der preferência a quem tem passe VIP, quem não tem pode nunca entrar (<b>inanição</b>). Se cada um der uma volta curta e voltar para o fim da fila, todo mundo se diverte um pouco — mas o tempo gasto subindo e descendo do brinquedo aumenta.</p><p>O <b>escalonador</b> do SO faz exatamente esse papel com a fila de processos prontos. Não existe regra perfeita: cada algoritmo favorece um objetivo.</p>" },
  chave: [
    "O <b>escalonador</b> escolhe qual processo pronto usa a CPU; o <b>despachante</b> faz a troca de contexto.",
    "Critérios: <b>utilização da CPU</b>, <b>throughput</b> (vazão), <b>turnaround</b>, <b>tempo de espera</b> e <b>tempo de resposta</b>.",
    "<b>Não preemptivo:</b> o processo só sai da CPU quando termina ou bloqueia. <b>Preemptivo:</b> o SO pode tirá-lo (quantum, prioridade).",
    "<b>FIFO/FCFS:</b> ordem de chegada; simples, mas sofre o <b>efeito comboio</b>.",
    "<b>SJF:</b> menor job primeiro; menor espera média possível, mas exige saber a duração.",
    "<b>Round Robin (circular):</b> fatias de tempo (quantum) em rodízio. <b>Prioridade:</b> pode causar <b>inanição</b>, resolvida com <b>envelhecimento (aging)</b>."
  ],
  objetivos: ["Explicar os <b>critérios</b> de escalonamento e o que cada um mede.", "Diferenciar escalonamento <b>preemptivo</b> e <b>não preemptivo</b>.", "Simular <b>FIFO, SJF, prioridades e Round Robin</b> com gráfico de Gantt.", "Calcular <b>tempo de espera</b> e <b>turnaround</b> médios e comparar algoritmos."],
  licoes: [
    { t: "Critérios: o que é um bom escalonador?", txt: "<p>Melhorar um critério frequentemente piora outro. O projetista escolhe o equilíbrio conforme o objetivo do sistema:</p>", pontos: ["<b>Utilização da CPU:</b> manter o processador ocupado o máximo possível.", "<b>Throughput (vazão):</b> quantos processos terminam por unidade de tempo.", "<b>Turnaround:</b> tempo total desde a chegada até o término (término − chegada).", "<b>Tempo de espera:</b> soma do tempo que o processo passou na fila de prontos (turnaround − duração, quando não há E/S).", "<b>Tempo de resposta:</b> do pedido até a primeira resposta — essencial em sistemas interativos."], pense: "Num servidor que roda relatórios à noite e num celular, qual critério é mais importante em cada um?" },
    { t: "Preemptivo × não preemptivo", txt: "<p>Os algoritmos se dividem em duas famílias:</p>", pontos: ["<b>Não preemptivo (cooperativo):</b> uma vez com a CPU, o processo fica até terminar ou bloquear por conta própria. Simples, mas um processo longo “prende” todos.", "<b>Preemptivo:</b> o SO pode “arrancar” a CPU — porque o quantum acabou (interrupção do relógio) ou chegou um processo mais prioritário.", "Sistemas modernos de uso geral são preemptivos; a preempção custa <b>trocas de contexto</b>."], pense: "Por que um sistema interativo não pode ser não preemptivo?" },
    { t: "FIFO e SJF", txt: "<p><b>FIFO</b> (First-In, First-Out), também chamado <b>FCFS</b>, atende por ordem de chegada — como a fila do banco. É justo e fácil, mas não preemptivo: se um processo muito longo (um “elefante”) chega primeiro, os curtos (“ratos”) esperam muito. É o <b>efeito comboio</b>.</p><p><b>SJF</b> (Shortest Job First) escolhe o processo com a <b>menor duração</b>. É comprovadamente o que dá a <b>menor espera média</b>, mas na prática o SO não sabe quanto tempo cada processo vai durar — só pode estimar pelo histórico. A versão preemptiva chama-se SRTF (menor tempo restante).</p>", pontos: ["Exemplo do e-book: P1 = 10, P2 = 2, P3 = 4, todos chegando juntos.", "FIFO (P1, P2, P3): esperas 0, 10 e 12 → média 7,33.", "SJF (P2, P3, P1): esperas 0, 2 e 6 → média 2,67."], pense: "Por que mandar os curtos primeiro reduz a espera média?" },
    { t: "Round Robin (circular)", txt: "<p>O <b>escalonamento circular</b> é o algoritmo típico do tempo compartilhado: cada processo recebe um <b>quantum</b>; se não terminar, vai para o <b>fim da fila</b> e o próximo entra. É preemptivo e justo, com bom tempo de resposta.</p>", pontos: ["Quantum <b>muito grande</b>: o RR se comporta como FIFO.", "Quantum <b>muito pequeno</b>: muitas <b>trocas de contexto</b>, e o SO gasta tempo demais só trocando (overhead).", "Regra prática: o quantum deve ser bem maior que o custo da troca de contexto, mas pequeno o bastante para a resposta parecer imediata."], pense: "Com quantum 1 e cinco processos, quanto tempo cada um espera, no máximo, para voltar à CPU?" },
    { t: "Prioridades e circular com prioridades", txt: "<p>No escalonamento <b>por prioridade</b>, cada processo tem um número de prioridade e o escalonador escolhe o mais prioritário (aqui, menor número = maior prioridade). Pode ser preemptivo ou não.</p>", pontos: ["Vantagem: tarefas críticas (sistema, áudio, interface) passam na frente.", "Problema: <b>inanição (starvation)</b> — um processo de baixa prioridade pode nunca executar.", "Solução: <b>envelhecimento (aging)</b> — a prioridade de quem espera aumenta com o tempo.", "<b>Circular com prioridades:</b> combina os dois — há filas por prioridade e, dentro de cada nível, os processos se revezam por quantum. É a ideia usada pelos SOs modernos (com múltiplas filas)."], pense: "Que processos do seu computador você colocaria em prioridade alta?" }
  ],
  termos: [["Escalonador", "Escolhe o próximo processo a usar a CPU."], ["Turnaround", "Término − chegada."], ["Tempo de espera", "Tempo na fila de prontos."], ["Throughput", "Processos concluídos por unidade de tempo."], ["Efeito comboio", "Processos curtos presos atrás de um longo (FIFO)."], ["Quantum", "Fatia de tempo do Round Robin."], ["Inanição", "Processo que nunca ganha a CPU."], ["Aging", "Aumentar a prioridade de quem espera muito."]],
  visuais: [
    { tipo: "rede", id: "familia-esc", titulo: "Mapa dos algoritmos de escalonamento", dir: true, h: 400, nos: [
      { id: "e", x: 360, y: 50, t: "Escalonamento", d: "Escolher qual processo pronto usa a CPU." },
      { id: "np", x: 170, y: 170, t: "Não preemptivo", d: "O processo só sai da CPU quando termina ou bloqueia." },
      { id: "pr", x: 550, y: 170, t: "Preemptivo", d: "O SO pode tirar a CPU (quantum, prioridade)." },
      { id: "fifo", x: 80, y: 320, t: "FIFO / FCFS", d: "Ordem de chegada. Efeito comboio." },
      { id: "sjf", x: 250, y: 320, t: "SJF", d: "Menor job primeiro. Menor espera média; exige estimar a duração." },
      { id: "rr", x: 440, y: 320, t: "Round Robin", d: "Rodízio com quantum. Bom tempo de resposta." },
      { id: "pri", x: 640, y: 320, t: "Prioridade", d: "Mais prioritário primeiro. Risco de inanição; aging resolve." }],
      liga: [["e", "np"], ["e", "pr"], ["np", "fifo"], ["np", "sjf"], ["pr", "rr"], ["pr", "pri"], ["np", "pri", "também"]] },
    { tipo: "linha", id: "rr-passos", titulo: "Round Robin passo a passo (quantum 2; P1 = 5, P2 = 3, P3 = 1)", passos: [
      { t: "t = 0: P1", d: "Fila: P1, P2, P3. P1 roda 2 unidades e volta ao fim da fila (restam 3)." },
      { t: "t = 2: P2", d: "P2 roda 2 unidades (resta 1) e vai para o fim: fila P3, P1, P2." },
      { t: "t = 4: P3", d: "P3 precisa de só 1 unidade: termina em t = 5." },
      { t: "t = 5: P1", d: "P1 roda mais 2 (resta 1) e volta ao fim da fila." },
      { t: "t = 7: P2", d: "P2 usa a última unidade e termina em t = 8." },
      { t: "t = 8: P1", d: "P1 roda a última unidade e termina em t = 9. Esperas: P1 = 4, P2 = 5, P3 = 4 → média 4,33." }] },
    { tipo: "classificar", id: "jogo-alg", titulo: "Jogo: qual algoritmo tem esta característica?", cats: ["FIFO", "SJF", "Round Robin", "Prioridade"], itens: [["Sofre com o efeito comboio", 0], ["Menor tempo de espera médio possível", 1], ["Usa quantum e fila circular", 2], ["Pode causar inanição", 3], ["Precisa estimar a duração do processo", 1], ["Quantum enorme o transforma em FIFO", 2], ["Aging é a solução para o seu problema", 3], ["Atende na ordem de chegada", 0]] }
  ],
  lab: {
    intro: "Seja o escalonador. Edite os processos (chegada, duração, prioridade), escolha um algoritmo e veja o gráfico de Gantt e os tempos. Depois compare os quatro algoritmos com os mesmos processos.",
    sims: [
      { tipo: "escalonamento", titulo: "Simulador de escalonamento", cfg: { id: "esc", quantum: 2, procs: [{ n: "P1", ch: 0, d: 8, pr: 3 }, { n: "P2", ch: 1, d: 4, pr: 1 }, { n: "P3", ch: 2, d: 9, pr: 4 }, { n: "P4", ch: 3, d: 5, pr: 2 }] } }
    ],
    missoes: [
      { id: "m1", t: "Execute o FIFO", ev: "esc:fifo" },
      { id: "m2", t: "Execute o SJF", ev: "esc:sjf" },
      { id: "m3", t: "Execute o escalonamento por prioridade", ev: "esc:prio" },
      { id: "m4", t: "Execute o Round Robin", ev: "esc:rr" },
      { id: "m5", t: "Rode o Round Robin com quantum 1 e observe as trocas de contexto", ev: "esc:rr:q1" },
      { id: "m6", t: "Compare os quatro algoritmos", ev: "esc:comparou" },
      { id: "m7", t: "Edite os processos e crie o seu próprio cenário", ev: "esc:editou" }
    ],
    guiados: [
      { titulo: "FIFO × SJF (exercício do e-book)", txt: "<p>Três processos chegam juntos (tempo 0) com durações <b>P1 = 10</b>, <b>P2 = 2</b> e <b>P3 = 4</b>.</p>", passos: [
        { p: "FIFO (P1, P2, P3): tempo de espera de P3", r: 12, dica: "P3 espera P1 e P2 terminarem.", expl: "10 + 2 = 12." },
        { p: "FIFO: tempo de espera médio (duas casas decimais)", r: 7.33, dica: "Esperas: P1 = 0, P2 = 10, P3 = 12.", expl: "(0 + 10 + 12) ÷ 3 = 7,33." },
        { p: "SJF (P2, P3, P1): tempo de espera de P1", r: 6, dica: "P1 é o mais longo, então espera P2 e P3.", expl: "2 + 4 = 6." },
        { p: "SJF: tempo de espera médio (duas casas decimais)", r: 2.67, dica: "Esperas: P2 = 0, P3 = 2, P1 = 6.", expl: "(0 + 2 + 6) ÷ 3 = 2,67. O SJF reduziu a espera média de 7,33 para 2,67." }] },
      { titulo: "Round Robin com quantum 2", txt: "<p>Os mesmos processos (P1 = 10, P2 = 2, P3 = 4, chegando em 0), agora em Round Robin com <b>quantum 2</b>. Ordem: P1(0–2), P2(2–4), P3(4–6), P1(6–8), P3(8–10), P1(10–16).</p>", passos: [
        { p: "Em que instante P3 termina?", r: 10, dica: "Olhe a última fatia de P3.", expl: "P3 termina em t = 10." },
        { p: "Tempo de espera de P3", r: 6, dica: "Turnaround − duração = 10 − 4.", expl: "6." },
        { p: "Tempo de espera médio do RR (duas casas decimais)", r: 4.67, dica: "Esperas: P1 = 6, P2 = 2, P3 = 6.", expl: "(6 + 2 + 6) ÷ 3 = 4,67: pior que o SJF, melhor que o FIFO — e com ótimo tempo de resposta para todos." }] }
    ]
  },
  fc: [
    ["O que faz o escalonador?", "Decide qual processo da fila de prontos vai usar a CPU."],
    ["O que é turnaround?", "O tempo total de um processo, da chegada ao término (término − chegada)."],
    ["O que é tempo de espera?", "A soma dos períodos que o processo passou na fila de prontos."],
    ["O que é throughput?", "O número de processos concluídos por unidade de tempo."],
    ["Diferença entre preemptivo e não preemptivo?", "No preemptivo o SO pode tirar a CPU do processo; no não preemptivo ele só sai quando termina ou bloqueia."],
    ["O que é o efeito comboio?", "No FIFO, processos curtos esperam muito porque um processo longo chegou antes."],
    ["Por que o SJF é difícil de implementar?", "Porque o SO não sabe de antemão quanto tempo cada processo vai durar; precisa estimar."],
    ["Como funciona o Round Robin?", "Cada processo recebe um quantum; se não terminar, vai para o fim da fila de prontos."],
    ["O que acontece com quantum muito pequeno?", "Aumentam as trocas de contexto e o overhead; o SO gasta muito tempo só trocando de processo."],
    ["O que acontece com quantum muito grande?", "O Round Robin passa a se comportar como FIFO."],
    ["O que é inanição (starvation)?", "Um processo de baixa prioridade que nunca consegue a CPU porque sempre chegam outros mais prioritários."],
    ["O que é envelhecimento (aging)?", "Aumentar gradualmente a prioridade de um processo enquanto ele espera, evitando a inanição."]
  ],
  vf: [
    ["No FIFO, o processo que chega primeiro é executado primeiro.", true, "É a definição de First-In, First-Out."],
    ["O FIFO é um algoritmo preemptivo.", false, "O processo só sai da CPU ao terminar ou bloquear."],
    ["O SJF garante o menor tempo de espera médio entre os algoritmos não preemptivos.", true, "Atender primeiro os curtos minimiza a espera média."],
    ["No Round Robin, um processo que não termina no quantum vai para o início da fila.", false, "Ele vai para o fim da fila."],
    ["Um quantum muito pequeno aumenta o número de trocas de contexto.", true, "E com isso o overhead."],
    ["Escalonamento por prioridade pode causar inanição.", true, "Processos de baixa prioridade podem nunca rodar."],
    ["O envelhecimento diminui a prioridade de quem espera muito.", false, "Ele aumenta a prioridade de quem espera."],
    ["Turnaround é o tempo da chegada até o término do processo.", true, "Inclui espera, execução e bloqueios."],
    ["Tempo de resposta é o critério mais importante em sistemas interativos.", true, "O usuário quer ver reação rápida."],
    ["Existe um algoritmo de escalonamento ideal para todos os casos.", false, "Cada um favorece critérios diferentes; há sempre trade-offs."],
    ["A preempção por quantum depende de interrupções do relógio.", true, "O relógio avisa o SO quando a fatia termina."],
    ["No circular com prioridades, processos de mesma prioridade se revezam por quantum.", true, "Combina filas por prioridade com rodízio dentro de cada uma."]
  ],
  caderno: [
    ["Explique cada critério de escalonamento com um exemplo de sistema em que ele é o mais importante.", "Utilização: mainframe caro. Throughput: servidor de lote. Turnaround: jobs científicos. Espera: fila de impressão. Resposta: celular/PC interativo."],
    ["Calcule a espera média no FIFO para P1 = 6, P2 = 3, P3 = 1, chegando juntos nessa ordem.", "Esperas 0, 6 e 9 → média 5."],
    ["Mesmo exercício com SJF.", "Ordem P3, P2, P1: esperas P3 = 0, P2 = 1, P1 = 4 → média 1,67."],
    ["Explique o efeito comboio com a analogia dos elefantes e ratos.", "Se um processo enorme (elefante) chega primeiro na fila FIFO, todos os pequenos (ratos) esperam ele terminar, mesmo que precisassem de pouco tempo."],
    ["Por que um quantum muito pequeno prejudica o desempenho? O que é troca de contexto?", "Troca de contexto é salvar o estado de um processo e carregar o de outro; com quantum pequeno ela acontece o tempo todo e consome boa parte da CPU sem avançar trabalho."],
    ["Um usuário reclama que seu programa de baixa prioridade nunca termina. Proponha uma solução.", "Aplicar aging: aumentar a prioridade do processo a cada intervalo que ele espera, até que ele ganhe a CPU."],
    ["Faça o Gantt do Round Robin (quantum 3) para P1 = 7, P2 = 4, P3 = 2, chegando juntos.", "P1 0–3, P2 3–6, P3 6–8 (termina), P1 8–11, P2 11–12 (termina), P1 12–13 (termina). Esperas: P1 = 6, P2 = 8, P3 = 6 → média 6,67."],
    ["Compare FIFO e Round Robin quanto a justiça, tempo de resposta e overhead.", "FIFO: justo por ordem de chegada, resposta ruim para curtos, pouco overhead. RR: justo por rodízio, ótima resposta, mais overhead de trocas."],
    ["Por que o SJF é usado mais como referência teórica do que na prática?", "Porque exige saber a duração dos processos, o que o SO não sabe; serve de régua para avaliar outros algoritmos."],
    ["Explique o circular com prioridades e por que ele é usado em SOs modernos.", "Há várias filas por prioridade; o escalonador atende a mais prioritária e, dentro dela, faz rodízio por quantum. Garante prioridade para tarefas críticas e justiça entre iguais."]
  ],
  pbl: [
    { titulo: "A fila do laboratório de informática", cenario: "No laboratório, um único servidor compila os programas dos alunos. Alguns trabalhos levam 30 segundos; outros, 10 minutos. Os alunos com trabalhos curtos reclamam que esperam demais.", passos: [["Que algoritmo provavelmente está sendo usado e qual problema aparece?", "FIFO: efeito comboio — trabalhos curtos presos atrás dos longos."], ["Qual algoritmo você sugeriria e que efeito colateral precisa ser vigiado?", "SJF (ou RR): curtos passam na frente e a espera média cai; vigiar a inanição dos longos (usar aging) e a estimativa das durações."]] },
    { titulo: "O celular que engasga", cenario: "Um fabricante testou dois valores de quantum no seu SO: 1 ms e 200 ms. Com 1 ms a bateria acabava rápido; com 200 ms a tela parecia travar ao rolar.", passos: [["Explique cada sintoma.", "1 ms: trocas de contexto demais, CPU gasta energia em overhead. 200 ms: cada processo segura a CPU por muito tempo e a interface espera, prejudicando o tempo de resposta."], ["Que solução equilibrada você proporia?", "Quantum intermediário (ex.: 10–20 ms) e prioridade maior para a thread da interface (circular com prioridades)."]] },
    { titulo: "O hospital e o escalonador", cenario: "O sistema de um hospital roda: monitoramento de batimentos (crítico), prontuário eletrônico (interativo) e um relatório estatístico mensal (pesado).", passos: [["Que prioridade e que algoritmo você daria a cada tarefa?", "Monitoramento: prioridade máxima, preemptivo (tempo real). Prontuário: prioridade média, RR para boa resposta. Relatório: prioridade baixa, roda quando sobrar CPU."], ["Que mecanismo garante que o relatório termine em algum momento?", "Aging: a prioridade do relatório sobe enquanto ele espera, evitando inanição."]] }
  ],
  resumo: [
    { t: "Critérios", itens: ["Utilização, throughput, turnaround, espera, resposta."] },
    { t: "Algoritmos", itens: ["FIFO: simples; efeito comboio.", "SJF: menor espera média; exige estimar duração.", "Round Robin: quantum em rodízio; cuidado com o tamanho do quantum.", "Prioridade: inanição → aging. Circular com prioridades: filas por prioridade + rodízio."] }
  ],
  glossario: [["Escalonador", "Componente que escolhe o próximo processo."], ["Despachante", "Faz a troca de contexto para o escolhido."], ["FIFO/FCFS", "Primeiro a chegar, primeiro a ser servido."], ["SJF", "Menor tarefa primeiro."], ["SRTF", "Versão preemptiva do SJF."], ["Round Robin", "Escalonamento circular com quantum."], ["Inanição", "Espera indefinida pela CPU."], ["Aging", "Envelhecimento: sobe a prioridade de quem espera."]]
});
