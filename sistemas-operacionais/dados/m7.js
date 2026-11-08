FSI.modulo({
  n: 7, unidade: "Memória", nome: "Gerência de memória", titulo: "Onde guardar tanta coisa? Gerência de memória real e virtual", duracao: "6 h",
  resumoCurto: "Hierarquia de memórias, o gerenciador de memória, alocação contígua (first, best e worst-fit), fragmentação, swapping, memória virtual, paginação, segmentação e substituição de páginas.",
  analogia: { titulo: "O estacionamento e a bancada do chef", txt: "<p>Na <b>memória real</b>, alocar um processo é como estacionar um carro: ele precisa de uma vaga inteira, contínua, do tamanho dele. Com o tempo, carros entram e saem e sobram várias vagas pequenas espalhadas — somadas dariam espaço, mas nenhuma cabe a sua caminhonete. É a <b>fragmentação externa</b>.</p><p>A <b>memória virtual</b> é como um chef com um livro de receitas enorme e uma bancada pequena: ele não coloca o livro inteiro na bancada, só a <b>página</b> da receita que está fazendo agora. Quando precisa de outra, busca na estante (o disco) e troca. O programa acha que tem um livro inteiro à mão; na verdade só algumas páginas estão na RAM.</p>" },
  chave: [
    "<b>Hierarquia:</b> registradores → cache → RAM → disco: quanto mais alto, mais rápido, menor e mais caro.",
    "O gerenciador de memória faz <b>rastreamento</b>, <b>alocação</b>, <b>proteção</b> e <b>mapeamento</b> (endereço lógico → físico, com a MMU).",
    "<b>Alocação contígua</b> com <b>first-fit</b>, <b>best-fit</b> ou <b>worst-fit</b>; sofre <b>fragmentação externa</b> (resolvida, com custo, pela compactação).",
    "<b>Swapping:</b> tirar um processo inteiro da RAM para o disco e trazer de volta depois.",
    "<b>Paginação:</b> espaço lógico em <b>páginas</b> e RAM em <b>frames</b> de mesmo tamanho; a <b>tabela de páginas</b> faz o mapa; acabou a fragmentação externa.",
    "<b>Falta de página (page fault):</b> acesso a página fora da RAM; o SO a busca no disco, escolhendo uma vítima (FIFO, LRU, Ótimo) se precisar."
  ],
  objetivos: ["Explicar a <b>hierarquia de memórias</b> e as <b>tarefas</b> do gerenciador de memória.", "Aplicar <b>first, best e worst-fit</b> e reconhecer <b>fragmentação</b> interna e externa.", "Traduzir <b>endereço lógico em físico</b> com paginação e descrever o tratamento de uma <b>falta de página</b>.", "Comparar <b>paginação</b> e <b>segmentação</b> e os algoritmos <b>FIFO, LRU e Ótimo</b>."],
  licoes: [
    { t: "Hierarquia de memórias", txt: "<p>Um computador não tem uma memória só, mas uma <b>hierarquia</b> que equilibra velocidade, capacidade e custo:</p>", pontos: ["<b>Registradores:</b> dentro da CPU; rapidíssimos e minúsculos.", "<b>Cache:</b> pequena e muito rápida, guarda o que foi usado recentemente entre a CPU e a RAM.", "<b>Memória principal (RAM):</b> onde os programas precisam estar para executar. <b>Volátil</b>: apaga ao desligar.", "<b>Armazenamento secundário (SSD, HD):</b> grande, barato, permanente — e milhares de vezes mais lento que a RAM.", "Analogia do e-book: registradores = o que você pensa agora; cache = na ponta da língua; RAM = seu conhecimento geral; disco = os livros da estante."], pense: "Por que não fazemos o computador inteiro só com memória cache?" },
    { t: "O gerenciador de memória", txt: "<p>O componente do SO que administra a RAM tem quatro tarefas:</p>", pontos: ["<b>Rastreamento:</b> saber o que está livre e o que está ocupado, e por quem.", "<b>Alocação:</b> dar memória ao processo que começa e liberar ao terminar. Pode ser <b>estática</b> (definida antes da execução) ou <b>dinâmica</b> (durante a execução).", "<b>Proteção:</b> impedir que um processo leia ou escreva na memória de outro ou do SO.", "<b>Mapeamento:</b> o programa usa <b>endereços lógicos</b>; a <b>MMU</b> (unidade de gerenciamento de memória), configurada pelo SO, traduz para <b>endereços físicos</b> da RAM."], pense: "O que aconteceria se um processo pudesse escrever na memória do outro?" },
    { t: "Memória real: alocação contígua e fragmentação", txt: "<p>Na <b>alocação contígua</b>, cada processo ocupa um bloco contínuo da RAM. Se há vários blocos livres, qual usar?</p>", pontos: ["<b>First-fit:</b> o primeiro bloco livre em que o processo cabe. Rápido.", "<b>Best-fit:</b> o menor bloco em que ele cabe, para deixar a menor sobra. Exige percorrer tudo.", "<b>Worst-fit:</b> o maior bloco, para que a sobra ainda seja útil.", "<b>Fragmentação externa:</b> há memória livre suficiente no total, mas espalhada em buracos que não são contíguos.", "<b>Fragmentação interna:</b> o bloco dado ao processo é maior que o necessário e a sobra fica desperdiçada dentro dele (a moto numa vaga de caminhão).", "<b>Compactação:</b> mover os processos para juntar os buracos — resolve a externa, mas para o sistema enquanto copia."], pense: "Blocos livres de 100, 500, 200, 300 e 600 KB; um processo de 212 KB. Onde ele vai em cada estratégia?" },
    { t: "Swapping", txt: "<p>E quando não cabe todo mundo na RAM? O <b>swapping</b> escolhe um processo (por exemplo, bloqueado há muito tempo), copia a imagem inteira dele para uma área do disco (<b>área de troca</b> / backing store) e libera o espaço. Quando ele precisar voltar, é copiado de volta.</p>", pontos: ["Vantagem: o grau de multiprogramação pode ser maior que a RAM física.", "Desvantagem: copiar processos inteiros para o disco é muito lento.", "No Linux a área de troca aparece como <b>swap</b> (comando <code>free -h</code>)."], pense: "Por que um computador com pouca RAM fica lento quando você abre muitos programas?" },
    { t: "Memória virtual: paginação e segmentação", txt: "<p>A <b>memória virtual</b> dá a cada processo a ilusão de um espaço de endereçamento grande e contínuo, maior até que a RAM. Só as partes em uso precisam estar na memória; o resto fica no disco.</p>", pontos: ["<b>Paginação:</b> o espaço lógico é dividido em <b>páginas</b> e a RAM em <b>frames</b> do mesmo tamanho (ex.: 4 KB). Páginas de um processo podem ficar em frames espalhados — fim da fragmentação externa.", "<b>Tabela de páginas:</b> diz, para cada página, em que frame ela está, ou se está no disco (inválida).", "Tradução: <b>página = endereço ÷ tamanho</b>; <b>deslocamento = endereço mod tamanho</b>; <b>físico = frame × tamanho + deslocamento</b>.", "<b>Falta de página:</b> a MMU vê que a página é inválida e gera uma exceção; o SO busca a página no disco, coloca num frame (tirando uma vítima, se necessário), atualiza a tabela e repete a instrução — é a <b>paginação por demanda</b>.", "<b>Substituição:</b> FIFO (a mais antiga), LRU (a menos usada recentemente) e Ótimo (a que vai demorar mais a ser usada — ideal teórico).", "<b>Segmentação:</b> divide o programa em <b>segmentos</b> de tamanho variável com significado lógico (código, dados, pilha); facilita proteção, mas volta a ter fragmentação externa."], pense: "Como um jogo de 50 GB roda num PC com 16 GB de RAM?" }
  ],
  termos: [["MMU", "Hardware que traduz endereço lógico em físico."], ["First / best / worst-fit", "Primeiro que cabe / menor que cabe / maior."], ["Fragmentação externa", "Livre no total, mas em pedaços não contíguos."], ["Fragmentação interna", "Sobra desperdiçada dentro do bloco alocado."], ["Swapping", "Processo inteiro vai para o disco e volta."], ["Página / frame", "Bloco lógico / bloco físico de mesmo tamanho."], ["Page fault", "Acesso a página que não está na RAM."], ["LRU", "Substitui a página menos usada recentemente."]],
  visuais: [
    { tipo: "camadas", id: "hierarquia", titulo: "Pirâmide da hierarquia de memórias", h: 380, camadas: [
      { t: "Registradores", d: "Dentro da CPU. Acesso em menos de 1 ns, capacidade de bytes.", ex: "Registradores AX, PC, SP." },
      { t: "Cache (L1, L2, L3)", d: "Alguns MB, poucos ns. Guarda o que foi usado recentemente.", ex: "Cache L3 de 16 MB." },
      { t: "Memória principal (RAM)", d: "Alguns GB, dezenas de ns. Volátil. Os programas executam daqui.", ex: "8 GB de DDR4." },
      { t: "Armazenamento secundário", d: "Centenas de GB a TB. SSD em micro a milissegundos; HD em milissegundos. Permanente.", ex: "SSD de 512 GB, HD de 1 TB." }] },
    { tipo: "sequencia", id: "pagefault", titulo: "Falta de página, passo a passo", atores: ["Processo", "MMU", "Sistema\noperacional", "Disco"], passos: [
      { de: 0, para: 1, t: "acessa endereço 9000", d: "O processo lê uma variável no endereço lógico 9000." },
      { de: 1, para: 1, t: "página 2 inválida", d: "A MMU calcula a página (9000 ÷ 4096 = 2) e vê na tabela que ela não está na RAM." },
      { de: 1, para: 2, t: "exceção: page fault", d: "A MMU gera uma <b>falta de página</b> e o SO assume o controle; o processo fica bloqueado." },
      { de: 2, para: 2, t: "escolhe um frame", d: "Se não houver frame livre, o algoritmo de substituição escolhe uma vítima (salva no disco se foi modificada)." },
      { de: 2, para: 3, t: "lê a página 2", d: "O SO pede ao disco a página que falta." },
      { de: 3, para: 2, t: "página carregada", d: "A leitura termina (interrupção). O SO atualiza a tabela: página 2 → frame escolhido, válida." },
      { de: 2, para: 0, t: "repete a instrução", d: "O processo volta a Pronto e, quando executar, repete o acesso — agora com sucesso. Para ele, nada aconteceu." }] },
    { tipo: "classificar", id: "pag-seg", titulo: "Jogo: paginação ou segmentação?", cats: ["Paginação", "Segmentação"], itens: [["Blocos de tamanho fixo", 0], ["Blocos de tamanho variável", 1], ["Divide em código, dados e pilha", 1], ["Elimina a fragmentação externa", 0], ["Visível para o programador", 1], ["Usa frames na memória física", 0]] }
  ],
  lab: {
    intro: "Três laboratórios de memória: aloque processos em memória contígua e provoque a fragmentação; traduza endereços com a tabela de páginas e trate faltas de página; compare os algoritmos de substituição.",
    sims: [
      { tipo: "alocacao", titulo: "Memória real: first, best e worst-fit", instr: "Os blocos cinza estão livres (100, 500, 200, 300 e 600 KB). Aloque processos com estratégias diferentes, libere alguns e tente provocar a fragmentação externa.", cfg: { id: "alo", tam: 212 } },
      { tipo: "paginacao", titulo: "Paginação: do endereço lógico ao físico", instr: "Páginas de 4096 bytes. Experimente 5000, 9000 e 40000.", cfg: { id: "pag", tam: 4096, end: 9000, tabela: [5, 2, null, 7, null, 0, 3, null] } },
      { tipo: "substituicao", titulo: "Substituição de páginas: FIFO, LRU e Ótimo", cfg: { id: "sub", frames: 3 } }
    ],
    missoes: [
      { id: "m1", t: "Aloque um processo com first-fit", ev: "alo:first" },
      { id: "m2", t: "Aloque um processo com best-fit", ev: "alo:best" },
      { id: "m3", t: "Aloque um processo com worst-fit", ev: "alo:worst" },
      { id: "m4", t: "Provoque uma fragmentação externa", ev: "alo:fragext" },
      { id: "m5", t: "Compacte a memória", ev: "alo:compactou" },
      { id: "m6", t: "Traduza um endereço lógico válido", ev: "pag:traduziu" },
      { id: "m7", t: "Provoque e trate uma falta de página", ev: "pag:tratou" },
      { id: "m8", t: "Compare FIFO, LRU e Ótimo", ev: "sub:comparou" }
    ],
    guiados: [
      { titulo: "Alocação contígua (exercício do e-book)", txt: "<p>Blocos livres, em ordem: <b>100, 500, 200, 300 e 600 KB</b>. Um processo precisa de <b>212 KB</b>.</p>", passos: [
        { p: "First-fit: em qual bloco (KB) ele entra?", r: 500, un: "KB", dica: "Percorra em ordem e pare no primeiro que comporta 212.", expl: "100 não cabe; 500 é o primeiro que cabe." },
        { p: "Best-fit: em qual bloco (KB)?", r: 300, un: "KB", dica: "Entre os que cabem (500, 300, 600), o menor.", expl: "300 KB, sobrando 88 KB." },
        { p: "Worst-fit: em qual bloco (KB)?", r: 600, un: "KB", dica: "O maior bloco livre.", expl: "600 KB, sobrando 388 KB." }] },
      { titulo: "Traduzindo um endereço com paginação", txt: "<p>Páginas de <b>4096 bytes</b>. O processo acessa o endereço lógico <b>9000</b>. Na tabela de páginas, a <b>página 2 está no frame 5</b>.</p>", passos: [
        { p: "Número da página (9000 ÷ 4096, parte inteira)", r: 2, dica: "Quantas páginas inteiras de 4096 cabem em 9000?", expl: "9000 ÷ 4096 = 2,19… → página 2." },
        { p: "Deslocamento (9000 mod 4096)", r: 808, dica: "9000 − 2 × 4096.", expl: "9000 − 8192 = 808." },
        { p: "Endereço físico (frame × 4096 + deslocamento)", r: 21288, dica: "5 × 4096 + 808.", expl: "20480 + 808 = 21288." }] },
      { titulo: "Contando faltas de página", txt: "<p>Sequência de acessos: <b>7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1</b>, com <b>3 frames</b> começando vazios. Use o simulador acima para conferir depois de calcular no caderno.</p>", passos: [
        { p: "Faltas de página com FIFO", r: 15, dica: "Sai sempre a página que entrou há mais tempo.", expl: "15 faltas." },
        { p: "Faltas de página com LRU", r: 12, dica: "Sai a página usada há mais tempo.", expl: "12 faltas." },
        { p: "Faltas de página com o algoritmo Ótimo", r: 9, dica: "Sai a página que vai demorar mais a ser usada de novo.", expl: "9 faltas: o mínimo possível, por isso o Ótimo serve de régua." }] }
    ]
  },
  fc: [
    ["Quais os níveis da hierarquia de memórias?", "Registradores, cache, memória principal (RAM) e armazenamento secundário (SSD/HD)."],
    ["Quais as quatro tarefas do gerenciador de memória?", "Rastreamento, alocação, proteção e mapeamento de endereços."],
    ["O que faz a MMU?", "Traduz endereços lógicos (do programa) em endereços físicos (da RAM), configurada pelo SO."],
    ["Diferença entre first-fit, best-fit e worst-fit?", "First: primeiro bloco que cabe. Best: menor bloco que cabe. Worst: maior bloco."],
    ["O que é fragmentação externa?", "Há memória livre suficiente no total, mas dividida em buracos não contíguos."],
    ["O que é fragmentação interna?", "Espaço desperdiçado dentro de um bloco alocado maior do que o processo precisa."],
    ["O que é compactação?", "Mover os processos na memória para juntar os buracos livres num bloco só; é custosa."],
    ["O que é swapping?", "Copiar um processo inteiro da RAM para o disco (área de troca) e trazê-lo de volta depois."],
    ["O que são páginas e frames?", "Páginas: blocos de tamanho fixo do espaço lógico. Frames: blocos de mesmo tamanho na memória física."],
    ["Como se calcula o endereço físico na paginação?", "Página = E ÷ T; deslocamento = E mod T; físico = frame × T + deslocamento."],
    ["O que é uma falta de página?", "Acesso a uma página que não está na RAM; o SO a carrega do disco e repete a instrução."],
    ["Diferença entre FIFO, LRU e Ótimo na substituição de páginas?", "FIFO tira a mais antiga; LRU, a menos usada recentemente; Ótimo, a que vai demorar mais a ser usada (ideal teórico)."]
  ],
  vf: [
    ["Registradores são mais rápidos e menores que a memória RAM.", true, "Ficam dentro da CPU, no topo da hierarquia."],
    ["A memória RAM mantém os dados quando o computador é desligado.", false, "A RAM é volátil."],
    ["O programa conhece o endereço físico exato onde está na RAM.", false, "Ele usa endereços lógicos; a MMU traduz."],
    ["No best-fit escolhe-se o menor bloco livre em que o processo cabe.", true, "Para deixar a menor sobra possível."],
    ["Fragmentação externa significa que não há memória livre no total.", false, "Há memória livre, mas em pedaços não contíguos."],
    ["A compactação resolve a fragmentação externa, mas tem alto custo.", true, "O sistema precisa mover processos inteiros."],
    ["O swapping é rápido porque usa a memória cache.", false, "Ele usa o disco, que é muito mais lento que a RAM."],
    ["Na paginação, as páginas de um processo precisam ocupar frames vizinhos.", false, "Podem ficar espalhadas; a tabela de páginas faz o mapa."],
    ["Páginas e frames têm o mesmo tamanho.", true, "É isso que permite o encaixe de qualquer página em qualquer frame."],
    ["Com páginas de 4096 bytes, o endereço 9000 cai na página 2 com deslocamento 808.", true, "9000 = 2 × 4096 + 808."],
    ["O algoritmo Ótimo de substituição é fácil de implementar porque usa o passado.", false, "Ele precisa conhecer os acessos futuros; serve de referência teórica."],
    ["A segmentação divide o programa em partes de tamanho variável com significado lógico.", true, "Código, dados, pilha…"]
  ],
  caderno: [
    ["Desenhe a pirâmide da hierarquia de memórias e anote duas características de cada nível.", "Registradores: rapidíssimos, minúsculos. Cache: muito rápida, pequena. RAM: rápida, volátil, GB. Disco: lento, barato, permanente, TB."],
    ["O que poderia acontecer num SO sem proteção de memória? Dê um exemplo.", "Um programa com erro poderia sobrescrever a memória de outro ou do próprio SO, travando tudo; um malware poderia ler senhas digitadas em outro programa."],
    ["Explique o papel da MMU no mapeamento de endereços.", "Ela traduz, a cada acesso, o endereço lógico do programa no endereço físico, usando tabelas configuradas pelo SO, e gera exceção se o acesso for inválido."],
    ["Dê uma analogia do dia a dia para fragmentação externa e explique como seria a “compactação”.", "Estante com vários espaços pequenos entre livros: há espaço total para um livro grande, mas não contínuo. Compactar = empurrar todos os livros para um lado, juntando o espaço livre."],
    ["Por que o swapping é considerado custoso?", "Porque copia processos inteiros entre RAM e disco, e o disco é milhares de vezes mais lento que a RAM."],
    ["Liste três problemas que a memória virtual resolve em relação à memória real.", "Programas maiores que a RAM; fragmentação externa (com paginação); mais processos na memória ao mesmo tempo, carregando só o necessário."],
    ["Descreva em passos o tratamento de uma falta de página.", "MMU detecta página inválida → exceção → SO localiza a página no disco → escolhe frame livre ou vítima → lê a página → atualiza a tabela → processo repete a instrução."],
    ["Páginas de 1024 bytes; endereço lógico 3500; página 3 está no frame 9. Calcule o endereço físico.", "Página 3 (3500 ÷ 1024), deslocamento 428 (3500 − 3072). Físico = 9 × 1024 + 428 = 9644."],
    ["Faça uma tabela comparando paginação e segmentação: tamanho, visão do programador, fragmentação e complexidade.", "Paginação: fixo, invisível ao programador, sem fragmentação externa (só interna na última página), implementação mais simples. Segmentação: variável, visível (código/dados/pilha), fragmentação externa, proteção mais natural."],
    ["Por que o LRU costuma ter menos faltas que o FIFO?", "Porque usa o comportamento recente: páginas usadas há pouco tendem a ser usadas de novo (localidade). O FIFO pode expulsar uma página antiga mas muito usada."]
  ],
  pbl: [
    { titulo: "O computador da biblioteca", cenario: "O computador da biblioteca tem 4 GB de RAM. Quando os alunos abrem o navegador com muitas abas, o sistema de empréstimos e um editor, o disco fica acendendo sem parar e tudo fica lento.", passos: [["Explique o que está acontecendo usando memória virtual, swap e faltas de página.", "A soma dos processos passou da RAM; o SO usa memória virtual e swap, gerando muitas faltas de página: páginas vão e voltam do disco (paginação excessiva, ou thrashing), e o disco lento vira o gargalo."], ["Proponha soluções técnicas e de uso.", "Mais RAM, SSD no lugar do HD, menos abas abertas, fechar programas não usados."]] },
    { titulo: "O estacionamento da festa", cenario: "Use a analogia do estacionamento para explicar alocação contígua a uma turma do 1º ano.", passos: [["Monte o roteiro da explicação usando first, best e worst-fit.", "Carros = processos; vagas livres = blocos; first: primeira vaga que cabe; best: a vaga mais justa; worst: a maior vaga."], ["Como você mostraria a fragmentação externa e a compactação na mesma analogia?", "Depois de vários carros saírem, há várias vagas pequenas que somadas cabem um ônibus, mas não juntas; compactar = manobrar todos os carros para um lado, liberando uma área contínua."]] },
    { titulo: "Qual algoritmo de substituição?", cenario: "Um SO de celular precisa escolher o algoritmo de substituição de páginas. A equipe testou com uma sequência real de acessos: FIFO deu 15 faltas, LRU 12 e Ótimo 9.", passos: [["Por que não usar o Ótimo, se ele teve menos faltas?", "Porque ele exige saber os acessos futuros, o que é impossível na prática; serve só como referência."], ["Qual você escolheria e por quê? Que custo ele tem?", "LRU (ou aproximação dele, como o algoritmo do relógio): menos faltas que o FIFO; custo de registrar o uso de cada página."]] }
  ],
  resumo: [
    { t: "Base", itens: ["Hierarquia: registradores, cache, RAM, disco.", "Gerenciador: rastrear, alocar, proteger, mapear (MMU)."] },
    { t: "Memória real", itens: ["Alocação contígua: first, best, worst-fit.", "Fragmentação externa (compactação) e interna.", "Swapping: processo inteiro para o disco."] },
    { t: "Memória virtual", itens: ["Paginação: páginas, frames, tabela de páginas.", "Físico = frame × tamanho + deslocamento.", "Page fault e substituição: FIFO, LRU, Ótimo.", "Segmentação: blocos lógicos de tamanho variável."] }
  ],
  glossario: [["MMU", "Unidade de gerenciamento de memória."], ["Endereço lógico", "Endereço usado pelo programa."], ["Endereço físico", "Posição real na RAM."], ["Swap", "Área de troca no disco."], ["Tabela de páginas", "Mapa página → frame."], ["Page fault", "Falta de página."], ["Thrashing", "Paginação excessiva que trava o sistema."], ["Segmento", "Bloco lógico de tamanho variável."]]
});
