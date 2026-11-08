FSI.modulo({
  n: 4, unidade: "Processos", nome: "Processos", titulo: "A vida de um programa: processos e seus estados", duracao: "5 h",
  resumoCurto: "O que é um processo, o PCB, os estados (novo, pronto, executando, bloqueado, terminado), as mudanças de estado, processos CPU-bound e I/O-bound e subprocessos.",
  analogia: { titulo: "O corredor na maratona", txt: "<p>Pense num processo como um <b>corredor de maratona</b>. Na linha de largada, pronto para correr, ele está <b>Pronto</b>. Quando dispara, está <b>Executando</b>. Se para num posto de hidratação, só volta a correr depois de beber água: está <b>Bloqueado</b>, esperando um evento.</p><p>Só que nesta corrida só existe <b>uma pista</b> (uma CPU): o juiz — o sistema operacional — decide quem corre, por quanto tempo, e quem volta para a fila. Ao terminar a prova, o corredor sai da corrida: <b>Terminado</b>.</p>" },
  chave: [
    "<b>Programa</b> é passivo (arquivo no disco); <b>processo</b> é um programa em execução, com estado, memória e recursos.",
    "O SO guarda tudo sobre o processo no <b>PCB (Bloco de Controle de Processo)</b>: PID, estado, registradores, contador de programa, memória, arquivos, prioridade.",
    "Estados: <b>Novo → Pronto → Executando → Terminado</b>, com <b>Bloqueado</b> quando espera E/S.",
    "Bloqueado <b>nunca</b> vai direto para Executando: quando o evento chega, volta para <b>Pronto</b> e espera a vez.",
    "<b>CPU-bound</b> usa muito processador; <b>I/O-bound</b> passa a maior parte do tempo esperando E/S. O SO equilibra os dois.",
    "Processos podem criar <b>subprocessos</b> (filhos), formando uma <b>árvore</b>; processos <b>independentes</b> não compartilham nada."
  ],
  objetivos: ["Diferenciar <b>programa</b> e <b>processo</b> e descrever a <b>estrutura</b> de um processo.", "Explicar o <b>PCB</b> e o que ele guarda.", "Desenhar o diagrama de <b>estados</b> e justificar cada <b>mudança de estado</b>.", "Classificar processos em <b>CPU-bound</b> e <b>I/O-bound</b>; distinguir <b>independentes</b> e <b>subprocessos</b>."],
  licoes: [
    { t: "Programa × processo", txt: "<p>Quando você dá dois cliques num ícone, o arquivo parado no disco “ganha vida”: o SO o carrega na memória e começa a executá-lo. Esse programa em execução é um <b>processo</b>. Um mesmo programa pode originar vários processos ao mesmo tempo (três janelas do navegador, por exemplo).</p>", pontos: ["<b>Programa:</b> entidade passiva, um conjunto de instruções.", "<b>Processo:</b> entidade ativa, com identidade (PID), memória própria, estado e recursos.", "É a unidade básica que o SO gerencia num sistema multitarefa."], pense: "Se você abrir duas janelas do bloco de notas, quantos programas e quantos processos existem?" },
    { t: "Estrutura do processo e o PCB", txt: "<p>Um processo é formado por três partes: <b>contexto de hardware</b> (registradores, contador de programa, ponteiro de pilha), <b>contexto de software</b> (PID, dono, prioridade, limites e recursos) e <b>espaço de endereçamento</b> (código, dados, pilha). O SO junta essas informações numa estrutura chamada <b>PCB — Process Control Block</b>, a “carteira de identidade” do processo.</p>", pontos: ["Exemplos de campos do PCB: <b>PID</b>, <b>estado</b>, <b>contador de programa</b>, <b>registradores</b>, <b>prioridade</b>, limites de memória, <b>arquivos abertos</b>.", "Na <b>troca de contexto</b>, o SO salva no PCB o estado de quem sai da CPU e carrega o de quem entra.", "É graças ao PCB que um processo interrompido continua exatamente de onde parou."], pense: "Se o PCB não guardasse o contador de programa, o que aconteceria quando o processo voltasse à CPU?" },
    { t: "Os estados de um processo", txt: "<p>Ao longo da vida, um processo passa por estados:</p>", pontos: ["<b>Novo (criação):</b> o SO está criando o processo e seu PCB.", "<b>Pronto:</b> tem tudo para executar; só espera a vez na CPU (fila de prontos).", "<b>Executando:</b> está usando o processador agora. Com uma CPU, só um processo de cada vez.", "<b>Bloqueado (espera):</b> não pode continuar até um evento acontecer — fim de uma leitura de disco, chegada de dados da rede, um clique.", "<b>Terminado:</b> encerrou; o SO libera memória, arquivos e o PCB."], pense: "Em qual estado está o processo do seu jogo enquanto ele espera você apertar uma tecla?" },
    { t: "Mudanças de estado: a dança das cadeiras", txt: "<p>O SO é o maestro das transições:</p>", pontos: ["<b>Novo → Pronto:</b> o processo foi admitido no sistema.", "<b>Pronto → Executando:</b> o escalonador escolheu este processo (o despachante carrega o contexto).", "<b>Executando → Bloqueado:</b> o processo pediu E/S ou espera um evento (ex.: <code>scanf</code> esperando digitação).", "<b>Bloqueado → Pronto:</b> o evento aconteceu (geralmente sinalizado por uma <b>interrupção</b>). Ele <b>não</b> volta direto à CPU: entra na fila de prontos.", "<b>Executando → Pronto:</b> em tempo compartilhado, o quantum acabou (<b>preempção</b>).", "<b>Executando → Terminado:</b> o processo executou sua última instrução ou foi encerrado."], pense: "Por que não existe a transição Pronto → Bloqueado?" },
    { t: "CPU-bound, I/O-bound e subprocessos", txt: "<p>Os processos têm perfis diferentes de uso dos recursos:</p>", pontos: ["<b>CPU-bound</b> (ligado à CPU): passa a maior parte do tempo calculando, quase não fica bloqueado. Ex.: renderizar vídeo, compactar arquivos, simulação científica.", "<b>I/O-bound</b> (ligado à E/S): roda pouco e logo pede E/S, ficando muito tempo bloqueado. Ex.: editor de texto, chat, navegador, backup.", "Um bom SO mistura os dois para manter CPU <b>e</b> dispositivos ocupados.", "<b>Processos independentes:</b> não compartilham nada com outros. <b>Subprocessos (filhos):</b> criados por um processo pai (no Linux, <code>fork</code>), formando uma <b>árvore de processos</b>; costumam herdar recursos e podem terminar quando o pai termina."], pense: "Um jogo de xadrez calculando a melhor jogada é CPU-bound ou I/O-bound? E o app de mensagens?" }
  ],
  termos: [["Processo", "Programa em execução, com estado e recursos."], ["PID", "Número que identifica o processo."], ["PCB", "Bloco de controle: tudo o que o SO sabe do processo."], ["Contador de programa", "Endereço da próxima instrução."], ["Fila de prontos", "Processos esperando a CPU."], ["Preempção", "Tirar a CPU de um processo à força."], ["CPU-bound", "Usa mais CPU que E/S."], ["I/O-bound", "Passa mais tempo esperando E/S."]],
  visuais: [
    { tipo: "rede", id: "diagrama-est", titulo: "Diagrama de estados do processo", dir: true, h: 380, nos: [
      { id: "n", x: 90, y: 90, t: "Novo", d: "O SO está criando o processo e o PCB." },
      { id: "p", x: 290, y: 90, t: "Pronto", d: "Espera a vez na fila de prontos. Tem tudo para executar, menos a CPU." },
      { id: "e", x: 500, y: 90, t: "Executando", d: "Está usando a CPU. Numa CPU, só um processo por vez." },
      { id: "t", x: 660, y: 230, t: "Terminado", d: "Encerrou: memória e recursos liberados." },
      { id: "b", x: 395, y: 300, t: "Bloqueado", d: "Espera um evento (E/S, rede, teclado). Não usa a CPU." }],
      liga: [["n", "p", "admitido"], ["p", "e", "escalonado"], ["e", "p", "quantum acabou"], ["e", "b", "pediu E/S"], ["b", "p", "E/S concluída"], ["e", "t", "terminou"]] },
    { tipo: "camadas", id: "pcb", titulo: "O que há dentro do PCB", forma: "pilha", h: 360, camadas: [
      { t: "Identificação: PID, dono, processo pai", d: "Quem é o processo e a quem pertence.", ex: "PID 1388, usuário aluno, pai 1207 (bash)." },
      { t: "Estado e prioridade", d: "Em que estado está e qual a importância dele para o escalonador.", ex: "Pronto, prioridade 20." },
      { t: "Contexto de hardware", d: "Contador de programa, registradores e ponteiro de pilha salvos na troca de contexto.", ex: "PC = 0x1A2C, AX = 42." },
      { t: "Memória", d: "Limites e tabelas do espaço de endereçamento (código, dados, pilha).", ex: "Base e limite, tabela de páginas." },
      { t: "Recursos e E/S", d: "Arquivos abertos, dispositivos e conexões em uso.", ex: "trabalho.txt, socket da rede." }] },
    { tipo: "sequencia", id: "troca-contexto", titulo: "Troca de contexto passo a passo", atores: ["Processo A", "Sistema\noperacional", "Processo B"], passos: [
      { de: 0, para: 0, t: "executando", d: "A está usando a CPU." },
      { de: 0, para: 1, t: "quantum acabou", d: "O relógio gera uma interrupção: o tempo de A terminou." },
      { de: 1, para: 1, t: "salva o PCB de A", d: "O SO guarda registradores e contador de programa de A no PCB dele e muda o estado de A para Pronto." },
      { de: 1, para: 1, t: "escolhe B", d: "O escalonador escolhe o próximo da fila de prontos: B." },
      { de: 1, para: 2, t: "carrega o PCB de B", d: "O despachante restaura os registradores de B e muda o estado dele para Executando." },
      { de: 2, para: 2, t: "continua de onde parou", d: "B retoma exatamente na instrução em que estava. A troca de contexto é trabalho “extra” do SO (overhead)." }] }
  ],
  lab: {
    intro: "Assuma o papel do sistema operacional: escolha um processo e dispare eventos. O simulador só aceita transições válidas — e explica por que as proibidas não podem acontecer. Observe o PCB mudando.",
    sims: [
      { tipo: "estados", titulo: "Simulador de estados com PCB", cfg: { id: "est", procs: ["Navegador", "Editor", "Backup"] } },
      { tipo: "cenarios", titulo: "CPU-bound ou I/O-bound?", cfg: { id: "perfil", rotulo: "Processo", itens: [
        { t: "Um jogo de xadrez que calcula milhões de jogadas para escolher a melhor.", ops: [["CPU-bound", true, "Passa quase todo o tempo calculando."], ["I/O-bound", false, "Quase não espera dispositivos."]] },
        { t: "Um programa que copia arquivos para um HD externo (backup).", ops: [["I/O-bound", true, "Passa a maior parte do tempo esperando o disco."], ["CPU-bound", false, "O cálculo é mínimo; o gargalo é a gravação."]] },
        { t: "Um conversor de música de MP3 para WAV.", ops: [["CPU-bound", true, "Decodificar o áudio exige muito cálculo."], ["I/O-bound", false, "Lê e grava, mas o grosso é processamento."]] },
        { t: "Um aplicativo de bate-papo.", ops: [["I/O-bound", true, "Fica esperando mensagens da rede e a digitação."], ["CPU-bound", false, "Quase não usa o processador."]] },
        { t: "Um editor de texto enquanto você digita.", ops: [["I/O-bound", true, "Espera o teclado na maior parte do tempo."], ["CPU-bound", false, "Cada tecla exige pouquíssimo cálculo."]] },
        { t: "A renderização de um vídeo em 4K.", ops: [["CPU-bound", true, "Cálculo intensivo por muito tempo."], ["I/O-bound", false, "A CPU é o gargalo, não a E/S."]] }] } }
    ],
    missoes: [
      { id: "m1", t: "Admita um processo (Novo → Pronto)", ev: "est:novo>pronto" },
      { id: "m2", t: "Dê a CPU a um processo (Pronto → Executando)", ev: "est:pronto>executando" },
      { id: "m3", t: "Faça um processo pedir E/S e depois concluir a E/S", ev: "est:bloqueado>pronto" },
      { id: "m4", t: "Provoque uma preempção por fim do quantum", ev: "est:executando>pronto" },
      { id: "m5", t: "Tente uma transição proibida e leia a explicação", ev: "est:erro" },
      { id: "m6", t: "Complete o ciclo Executando → Bloqueado → Pronto → Executando", ev: "est:ciclo" },
      { id: "m7", t: "Leve os três processos até Terminado", ev: "est:todos" },
      { id: "m8", t: "Classifique todos os perfis de processo", ev: "perfil:fim" }
    ],
    guiados: [
      { titulo: "Que perfil tem este processo?", txt: "<p>Num intervalo de <b>200 ms</b>, o processo A ficou <b>180 ms usando a CPU</b> e 20 ms bloqueado. O processo B ficou <b>15 ms na CPU</b> e 185 ms bloqueado.</p>", passos: [
        { p: "Percentual do tempo em que A usou a CPU", r: 90, un: "%", dica: "180 ÷ 200 × 100.", expl: "90%: A é CPU-bound." },
        { p: "Percentual do tempo em que B usou a CPU (uma casa decimal)", r: 7.5, un: "%", dica: "15 ÷ 200 × 100.", expl: "7,5%: B é I/O-bound." },
        { p: "Qual dos dois é I/O-bound? (A ou B)", r: ["B", "processo B"], dica: "Quem passa mais tempo bloqueado esperando E/S?", expl: "B: passa mais de 90% do tempo esperando E/S." }] },
      { titulo: "Quantas trocas de contexto?", txt: "<p>Três processos se revezam na CPU em tempo compartilhado. Cada um precisa de <b>4 fatias</b> de tempo para terminar, e o SO troca de processo a cada fatia (P1, P2, P3, P1, P2, P3…).</p>", passos: [
        { p: "Quantas fatias de CPU são usadas no total?", r: 12, dica: "3 processos × 4 fatias.", expl: "12 fatias." },
        { p: "Quantas trocas de contexto acontecem entre a 1ª e a última fatia?", r: 11, dica: "Entre 12 fatias seguidas há uma troca a cada passagem de uma para a próxima.", expl: "11 trocas — cada uma é trabalho do SO que não avança nenhum processo." }] }
    ]
  },
  fc: [
    ["Qual a diferença entre programa e processo?", "Programa é passivo (instruções no disco); processo é o programa em execução, com estado, memória e recursos."],
    ["O que é o PCB?", "O Bloco de Controle de Processo: estrutura do SO que guarda PID, estado, registradores, contador de programa, memória, arquivos e prioridade."],
    ["Cite três informações guardadas no PCB.", "PID, estado e contador de programa (também registradores, prioridade, limites de memória, arquivos abertos)."],
    ["Quais são os estados de um processo?", "Novo, Pronto, Executando, Bloqueado (espera) e Terminado."],
    ["O que leva um processo de Executando para Bloqueado?", "Ele pediu uma operação de E/S ou espera algum evento."],
    ["Para onde vai um processo bloqueado quando o evento acontece?", "Para Pronto — ele precisa esperar a vez na fila, não volta direto à CPU."],
    ["O que é preempção?", "O SO tirar a CPU de um processo à força, por exemplo quando o quantum acaba, devolvendo-o para Pronto."],
    ["O que é troca de contexto?", "Salvar o estado (registradores, PC) do processo que sai no PCB dele e carregar o estado do que entra."],
    ["O que caracteriza um processo CPU-bound?", "Passa a maior parte do tempo calculando e raramente fica bloqueado."],
    ["O que caracteriza um processo I/O-bound?", "Passa a maior parte do tempo bloqueado esperando operações de E/S."],
    ["O que é um subprocesso?", "Um processo filho criado por outro processo (o pai), formando uma árvore de processos."],
    ["Por que o SO deve misturar processos CPU-bound e I/O-bound?", "Para manter ao mesmo tempo a CPU e os dispositivos de E/S ocupados, aumentando a eficiência."]
  ],
  vf: [
    ["Um programa guardado no disco já é um processo.", false, "Só vira processo quando é carregado e colocado em execução."],
    ["O PCB funciona como a carteira de identidade do processo para o SO.", true, "Reúne tudo o que o SO precisa para gerenciá-lo."],
    ["Em um processador de um núcleo, vários processos podem estar no estado Executando ao mesmo tempo.", false, "Só um executa por vez; os outros estão prontos ou bloqueados."],
    ["Um processo bloqueado pode ir direto para o estado Executando quando a E/S termina.", false, "Ele volta para Pronto e espera ser escalonado."],
    ["A transição Executando → Pronto pode ocorrer quando o quantum termina.", true, "É a preempção por tempo."],
    ["Um processo no estado Pronto pode passar para Bloqueado.", false, "Só quem executa pode pedir E/S; um processo pronto não executa instruções."],
    ["Durante a troca de contexto, o SO salva os registradores do processo que sai.", true, "Eles ficam no PCB para a retomada."],
    ["Um editor de texto costuma ser I/O-bound.", true, "Passa a maior parte do tempo esperando a digitação."],
    ["Um processo CPU-bound passa a maior parte do tempo bloqueado.", false, "Isso descreve o I/O-bound."],
    ["Processos filhos são criados por um processo pai.", true, "No Linux, por exemplo, com fork."],
    ["Quando a E/S termina, o dispositivo costuma avisar o SO por meio de uma interrupção.", true, "A interrupção faz o SO mover o processo para Pronto."],
    ["O contador de programa indica o endereço da próxima instrução a ser executada.", true, "Por isso ele precisa ser salvo no PCB."]
  ],
  caderno: [
    ["Desenhe o diagrama de estados e escreva, em cada seta, um exemplo de evento.", "Novo→Pronto: o processo foi criado ao clicar no ícone; Pronto→Executando: o escalonador escolheu; Executando→Bloqueado: tentou ler um arquivo do HD; Bloqueado→Pronto: o disco terminou a leitura; Executando→Pronto: o quantum acabou; Executando→Terminado: o usuário fechou o programa."],
    ["Se você fosse projetar um SO, quais 5 informações guardaria no PCB e por quê?", "PID (identificar), estado (saber se pode executar), contador de programa e registradores (retomar), prioridade (escalonar), arquivos e memória (liberar e proteger recursos)."],
    ["Explique por que o processo bloqueado volta para Pronto e não para Executando.", "Porque a CPU pode estar ocupada com outro processo, e a decisão de quem executa é do escalonador; o processo entra na fila e espera a vez."],
    ["Classifique e justifique: a) xadrez que calcula jogadas; b) backup para HD externo; c) MP3 → WAV; d) chat.", "a) CPU-bound (cálculo); b) I/O-bound (espera o disco); c) CPU-bound (decodificação); d) I/O-bound (espera rede e teclado)."],
    ["O que é troca de contexto e por que ela tem custo?", "É salvar o estado de um processo e carregar o de outro; custa tempo de CPU que não avança nenhum processo (overhead) e atrapalha caches."],
    ["Por que não existe a transição Pronto → Bloqueado?", "Porque um processo pronto não está executando instruções e, portanto, não pode pedir E/S; só quem executa pode bloquear."],
    ["Qual a diferença entre processos independentes e subprocessos?", "Independentes não compartilham recursos nem têm relação de hierarquia; subprocessos são filhos de um pai, podem herdar recursos e formam uma árvore."],
    ["Abra o Gerenciador de Tarefas (ou rode ps no Linux). Liste três processos e diga o que eles fazem.", "Resposta pessoal, ex.: explorer.exe (interface do Windows), chrome.exe (navegador, vários processos), svchost.exe (serviços do sistema)."],
    ["Explique a analogia da maratona para os estados do processo.", "Linha de largada = Pronto; correndo = Executando; parado no posto de hidratação = Bloqueado; cruzou a chegada = Terminado; o juiz que decide quem corre = SO/escalonador; uma pista = uma CPU."],
    ["Por que o SO deve equilibrar processos CPU-bound e I/O-bound?", "Se só houver CPU-bound, os dispositivos ficam parados; se só I/O-bound, a CPU fica ociosa. Misturando, os dois recursos trabalham ao mesmo tempo."]
  ],
  pbl: [
    { titulo: "O computador da secretaria", cenario: "A secretária diz que, quando o sistema de matrículas imprime a lista de alunos, o computador fica lento para tudo, mas a CPU marca só 5% no Gerenciador de Tarefas.", passos: [["Que tipo de processo é a impressão da lista e em que estado ele passa a maior parte do tempo?", "I/O-bound: passa a maior parte do tempo bloqueado esperando a impressora/disco."], ["Por que a CPU está quase livre e mesmo assim o computador parece lento? O que poderia ajudar?", "O gargalo é a E/S (disco/impressora), não a CPU; outros programas esperam o mesmo dispositivo. Spooling, um SSD ou imprimir em horário de menos uso ajudam."]] },
    { titulo: "Detetive de processos", cenario: "Ao rodar ps no Linux, um aluno vê vários processos com STAT S, um com R e um com Z.", passos: [["Relacione as letras aos estados estudados.", "R = executando/pronto; S = dormindo, ou seja, bloqueado esperando evento; Z = zumbi: terminou mas o pai ainda não recolheu seu estado."], ["Por que a maioria dos processos está em S?", "Porque a maioria é I/O-bound ou serviços esperando eventos (rede, teclado, timer); só um pode executar por núcleo."]] },
    { titulo: "A corrida da troca de contexto", cenario: "Um SO troca de processo a cada 1 ms e cada troca de contexto gasta 0,1 ms.", passos: [["Qual percentual do tempo é gasto só trocando de contexto?", "0,1 ÷ (1 + 0,1) ≈ 9%."], ["O que aconteceria se o quantum fosse 0,1 ms? E 100 ms?", "Com 0,1 ms, metade do tempo seria troca (≈50% de desperdício); com 100 ms o desperdício cai (~0,1%), mas a resposta fica lenta para usuários interativos. É preciso equilíbrio."]] }
  ],
  resumo: [
    { t: "Processo", itens: ["Programa em execução, com PID, memória e recursos.", "PCB guarda identificação, estado, contexto, memória e recursos."] },
    { t: "Estados e transições", itens: ["Novo → Pronto → Executando → Terminado.", "Executando ⇄ Bloqueado (via Pronto); Executando → Pronto por preempção."] },
    { t: "Perfis", itens: ["CPU-bound × I/O-bound.", "Independentes × subprocessos (árvore de processos)."] }
  ],
  glossario: [["Processo", "Programa em execução."], ["PCB", "Bloco de controle do processo."], ["PID", "Identificador do processo."], ["Escalonador", "Escolhe o próximo processo a executar."], ["Despachante", "Carrega o contexto do processo escolhido na CPU."], ["Preempção", "Retirada forçada da CPU."], ["Processo zumbi", "Terminou, mas o pai ainda não leu seu estado de saída."], ["fork", "Chamada que cria um processo filho no Unix/Linux."]]
});
