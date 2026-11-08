FSI.modulo({
  n: 3, unidade: "Mono, multi e threads", nome: "Multiprogramação e threads", titulo: "Um de cada vez ou todos juntos? Multiprogramação e threads", duracao: "5 h",
  resumoCurto: "Sistemas monotarefa e multitarefa, lote, tempo compartilhado, tempo real, múltiplos processadores e as threads que deixam um programa fazer várias coisas ao mesmo tempo.",
  analogia: { titulo: "A lavanderia e a cozinha", txt: "<p>Numa <b>lavanderia com uma só máquina</b>, a sua roupa ocupa a máquina o ciclo inteiro — mesmo durante o tempo de molho, quando ela não faz nada. Ninguém mais usa. Isso é a <b>monoprogramação</b>: um programa monopoliza tudo, e a CPU fica de braços cruzados sempre que ele espera o disco ou o teclado.</p><p>Agora pense numa <b>cozinha com vários pratos</b>: enquanto a água do macarrão ferve, o cozinheiro corta os legumes. Isso é a <b>multiprogramação</b>. E se a cozinha tiver <b>vários chefs</b> dividindo os mesmos utensílios para fazer partes do mesmo jantar, temos <b>threads</b>: várias linhas de execução dentro de um único processo.</p>" },
  chave: [
    "<b>Monoprogramável/monotarefa:</b> um programa de usuário por vez; a CPU fica ociosa durante a E/S (ex.: MS-DOS).",
    "<b>Multiprogramável/multitarefa:</b> vários programas na memória; quando um espera E/S, outro usa a CPU.",
    "Num único núcleo só um programa executa por instante: a simultaneidade é uma <b>ilusão</b> criada por trocas rápidas.",
    "Tipos de multiprogramação: <b>batch</b> (sem interação), <b>tempo compartilhado</b> (fatias/quantum) e <b>tempo real</b> (prazos).",
    "Múltiplos processadores: <b>fortemente acoplados</b> (memória compartilhada) e <b>fracamente acoplados</b> (cada nó com sua memória, ligados por rede).",
    "<b>Thread:</b> linha de execução dentro de um processo; compartilha código e dados, mas tem pilha e registradores próprios."
  ],
  objetivos: ["Diferenciar sistemas <b>monoprogramáveis</b> e <b>multiprogramáveis</b>.", "Calcular o <b>uso da CPU</b> em mono e multiprogramação.", "Distinguir <b>batch</b>, <b>tempo compartilhado</b> e <b>tempo real</b>; e sistemas <b>fortemente</b> e <b>fracamente acoplados</b>.", "Explicar <b>monothread</b> e <b>multithread</b>, e threads de usuário e de kernel."],
  licoes: [
    { t: "Monoprogramação: a era da paciência", txt: "<p>Nos sistemas <b>monoprogramáveis</b> (ou <b>monotarefa</b>), como o MS-DOS, só um programa de usuário fica na memória e usa todos os recursos até terminar. O problema: programas param o tempo todo para esperar algo lento — o disco, a rede, a digitação. Durante essa espera o processador, que é extremamente rápido, <b>não faz nada</b>.</p>", pontos: ["Simples de implementar: o SO não precisa repartir memória nem proteger um programa do outro.", "Grande desperdício: CPU, memória e periféricos ficam subutilizados.", "É como pagar um funcionário genial para ficar de braços cruzados a maior parte do dia."], pense: "Quanto da sua jornada você passaria esperando se só pudesse abrir um programa por vez?" },
    { t: "Multiprogramação: fazendo várias coisas", txt: "<p>Nos sistemas <b>multiprogramáveis</b> (multitarefa), vários programas ficam na memória. Quando o que está executando pede E/S, o SO entrega a CPU para outro que esteja pronto. A troca é tão rápida que parece que tudo roda ao mesmo tempo — mas, num único núcleo, só um programa executa a cada instante.</p>", pontos: ["Ganho: CPU e dispositivos ficam ocupados ao mesmo tempo, e o trabalho total termina antes.", "Custo: o SO fica complexo — precisa escalonar, proteger memória, controlar E/S e sincronizar.", "Os sistemas de hoje (Windows, Linux, macOS, Android) são multitarefa."], pense: "Abra o Gerenciador de Tarefas (Ctrl+Shift+Esc). Quantos processos estão rodando agora?" },
    { t: "Batch, tempo compartilhado e tempo real", txt: "<p>A multiprogramação pode ser implementada de formas diferentes, conforme o objetivo:</p>", pontos: ["<b>Batch (lote):</b> jobs executados sem interação, aproveitando a CPU ociosa. Bom para processamento pesado e repetitivo (folha de pagamento, relatórios noturnos).", "<b>Tempo compartilhado (time-sharing):</b> a CPU é dividida em fatias de tempo (<b>time-slice</b> ou <b>quantum</b>); cada programa roda um pouquinho e passa a vez. É interativo — a base dos sistemas que usamos.", "<b>Tempo real:</b> a prioridade é cumprir <b>prazos (deadlines)</b>. As trocas seguem prioridades das tarefas críticas.", "<b>Múltiplos processadores:</b> mais de uma CPU executando de fato ao mesmo tempo."], pense: "Um controlador de tráfego aéreo e um chef de cozinha: qual se parece com tempo real e qual com tempo compartilhado?" },
    { t: "Vários processadores: forte e fracamente acoplados", txt: "<p>Quando há mais de um processador, o paralelismo deixa de ser ilusão. Os sistemas se dividem em:</p>", pontos: ["<b>Fortemente acoplados:</b> vários processadores compartilham <b>a mesma memória</b> e são controlados por um único SO. Ex.: um PC ou servidor com CPU multicore (SMP).", "<b>Fracamente acoplados:</b> cada nó tem <b>sua própria memória e seu SO</b>, e eles se comunicam por <b>rede</b>. Ex.: clusters, sistemas distribuídos, SOs de rede.", "Benefícios: mais desempenho (tarefas em paralelo), escalabilidade e tolerância a falhas (um nó cai, outro assume)."], pense: "Seu celular de 8 núcleos é forte ou fracamente acoplado? E os servidores de um serviço de streaming espalhados pelo mundo?" },
    { t: "Threads: várias tarefas num só processo", txt: "<p>Um editor de texto verifica a ortografia, salva automaticamente e responde à digitação — tudo junto. Se fosse um único fluxo sequencial, travaria a cada salvamento. A solução são as <b>threads</b> (linhas de execução ou processos leves).</p>", pontos: ["<b>Monothread:</b> cada processo tem uma única linha de execução; se ela bloqueia, o processo inteiro para.", "<b>Multithread:</b> o processo tem várias threads que <b>compartilham código, dados e arquivos</b>, mas cada uma tem sua <b>pilha</b> e seus <b>registradores</b>.", "Vantagens: responsividade, compartilhamento fácil de dados, criação e troca mais baratas que processos, paralelismo real em multicore.", "Cuidado: como dividem a mesma memória, threads podem gerar <b>condições de corrida</b> (veja o Módulo 5).", "<b>Threads de usuário</b> (modelo N:1): rápidas, mas se uma bloqueia, todas param. <b>Threads de kernel</b> (modelo 1:1): o kernel escalona cada uma; permitem paralelismo. Windows, Linux e macOS usam o modelo 1:1 ou híbrido."], pense: "Que threads você imagina dentro de um navegador com várias abas tocando vídeo e baixando arquivos?" }
  ],
  termos: [["Monotarefa", "Um programa de usuário por vez."], ["Multitarefa", "Vários programas na memória, revezando a CPU."], ["Quantum / time-slice", "Fatia de tempo de CPU dada a cada programa."], ["Fortemente acoplado", "Processadores com memória compartilhada e um SO."], ["Fracamente acoplado", "Nós independentes ligados por rede."], ["Thread", "Linha de execução dentro de um processo."], ["Modelo 1:1", "Cada thread de usuário é uma thread do kernel."], ["Troca de contexto", "Salvar o estado de quem sai e carregar o de quem entra."]],
  visuais: [
    { tipo: "rede", id: "familias", titulo: "Famílias de sistemas segundo a multiprogramação", dir: true, h: 420, nos: [
      { id: "s", x: 360, y: 50, t: "Sistemas\noperacionais", d: "Podem ser classificados pela forma como dividem a CPU entre programas." },
      { id: "mono", x: 130, y: 170, t: "Monoprogramáveis", d: "Um programa de usuário por vez. Ex.: MS-DOS." },
      { id: "multi", x: 360, y: 170, t: "Multiprogramáveis", d: "Vários programas na memória compartilhando recursos." },
      { id: "mp", x: 600, y: 170, t: "Múltiplos\nprocessadores", d: "Duas ou mais CPUs trabalhando ao mesmo tempo." },
      { id: "b", x: 170, y: 330, t: "Batch", d: "Sem interação; jobs em sequência." },
      { id: "ts", x: 360, y: 330, t: "Tempo\ncompartilhado", d: "Fatias de tempo para cada usuário/programa." },
      { id: "tr", x: 540, y: 330, t: "Tempo real", d: "Prazos garantidos." },
      { id: "fo", x: 520, y: 260, t: "Fortemente\nacoplados", d: "Memória compartilhada, um SO." },
      { id: "fr", x: 680, y: 330, t: "Fracamente\nacoplados", d: "Cada nó com memória e SO próprios, ligados por rede." }],
      liga: [["s", "mono"], ["s", "multi"], ["s", "mp"], ["multi", "b"], ["multi", "ts"], ["multi", "tr"], ["mp", "fo"], ["mp", "fr"]] },
    { tipo: "camadas", id: "thread-anatomia", titulo: "Anatomia de um processo multithread", forma: "pilha", h: 340, camadas: [
      { t: "Código (compartilhado)", d: "As instruções do programa: todas as threads executam o mesmo código, cada uma num ponto diferente.", ex: "O executável do editor de texto." },
      { t: "Dados e heap (compartilhados)", d: "Variáveis globais e objetos criados durante a execução: qualquer thread enxerga. Por isso é preciso sincronizar.", ex: "O documento aberto." },
      { t: "Arquivos abertos (compartilhados)", d: "Descritores de arquivos e conexões pertencem ao processo.", ex: "trabalho.docx aberto." },
      { t: "Pilha de cada thread (própria)", d: "Variáveis locais e chamadas de função de cada thread.", ex: "Thread de ortografia, thread de salvamento." },
      { t: "Registradores e PC de cada thread (próprios)", d: "Cada thread guarda em que instrução está e os valores com que trabalha.", ex: "Contador de programa de cada linha de execução." }] },
    { tipo: "classificar", id: "jogo-acopl", titulo: "Jogo: fortemente ou fracamente acoplado?", cats: ["Fortemente acoplado", "Fracamente acoplado"], itens: [["Notebook com processador de 8 núcleos", 0], ["Cluster de 100 servidores ligados por rede", 1], ["Processadores dividem a mesma memória RAM", 0], ["Cada máquina tem sua memória e seu SO", 1], ["Um único sistema operacional controla todas as CPUs", 0], ["Comunicação por mensagens na rede", 1]] }
  ],
  lab: {
    intro: "Veja com os próprios olhos onde a CPU perde tempo. Rode os mesmos programas em monoprogramação e em multiprogramação e compare o gráfico e o uso do processador.",
    sims: [
      { tipo: "multiprog", titulo: "Simulador: CPU × E/S", instr: "Cada linha colorida da CPU é um programa executando; listras são CPU parada. As linhas de baixo mostram quando cada programa espera E/S.", cfg: { id: "mp", progs: [{ n: "Editor", r: [2, 5, 2, 5, 2] }, { n: "Compactador", r: [5, 2, 5] }, { n: "Backup", r: [1, 6, 1] }] } },
      { tipo: "cenarios", titulo: "Monothread ou multithread?", cfg: { id: "thr", rotulo: "Situação", itens: [
        { t: "O navegador baixa um arquivo grande e, ao mesmo tempo, você continua rolando a página sem travar.", ops: [["Multithread", true, "Uma thread baixa, outra cuida da interface."], ["Monothread", false, "Com uma só linha de execução, a página congelaria durante o download."]] },
        { t: "Um programa antigo congela inteiro enquanto salva um arquivo grande no pendrive.", ops: [["Monothread", true, "A única thread ficou bloqueada esperando a E/S."], ["Multithread", false, "Se houvesse outra thread cuidando da janela, ela continuaria respondendo."]] },
        { t: "Um servidor web atende centenas de visitantes ao mesmo tempo usando um único processo.", ops: [["Multithread", true, "Cada requisição pode ser tratada por uma thread do mesmo processo."], ["Monothread", false, "Um visitante esperando o disco travaria os outros."]] },
        { t: "Num sistema com threads só de usuário (N:1), uma thread pede leitura de disco e todas as outras param.", ops: [["É o problema das threads de usuário", true, "O kernel só enxerga o processo e o bloqueia inteiro."], ["É o comportamento das threads de kernel (1:1)", false, "No 1:1 o kernel escalonaria outra thread do processo."]] },
        { t: "Um editor de vídeo usa os 8 núcleos do processador para renderizar mais rápido.", ops: [["Multithread com threads de kernel", true, "Threads de kernel podem rodar em paralelo em núcleos diferentes."], ["Monothread", false, "Uma única thread usaria só um núcleo."]] }] } }
    ],
    missoes: [
      { id: "m1", t: "Rode os programas em monoprogramação", ev: "mp:mono" },
      { id: "m2", t: "Rode os mesmos programas em multiprogramação", ev: "mp:multi" },
      { id: "m3", t: "Compare os dois modos com o mesmo conjunto de programas", ev: "mp:comparou" },
      { id: "m4", t: "Adicione um programa I/O-bound ou CPU-bound", ev: "mp:add" },
      { id: "m5", t: "Faça a CPU passar de 80% de uso na multiprogramação", ev: "mp:util80" },
      { id: "m6", t: "Resolva as situações de monothread × multithread", ev: "thr:fim" }
    ],
    guiados: [
      { titulo: "Quanto a CPU fica parada?", txt: "<p>Um programa alterna sempre <b>2 ms de CPU</b> e <b>8 ms esperando o disco</b>, repetidamente.</p>", passos: [
        { p: "Em monoprogramação, qual o percentual de uso da CPU?", r: 20, un: "%", dica: "Em cada ciclo de 10 ms, quanto tempo a CPU trabalha?", expl: "2 ÷ (2 + 8) = 0,2 → 20%. Em 80% do tempo a CPU fica ociosa." },
        { p: "Se houver 2 programas iguais e a troca for perfeita, qual o uso máximo da CPU?", r: 40, un: "%", dica: "Enquanto um espera o disco, o outro usa a CPU: em cada 10 ms, quantos ms de CPU são usados?", expl: "2 + 2 = 4 ms de CPU a cada 10 ms → 40%." },
        { p: "Quantos programas desse tipo seriam necessários para ocupar 100% da CPU?", r: 5, dica: "Cada programa ocupa 20% da CPU.", expl: "100% ÷ 20% = 5 programas — na prática um pouco mais, por causa das trocas de contexto." }] },
      { titulo: "Threads num servidor", txt: "<p>Um servidor leva <b>50 ms</b> para atender cada requisição: <b>10 ms de CPU</b> e <b>40 ms esperando o disco</b>.</p>", passos: [
        { p: "Com uma única thread (uma requisição por vez), quantas requisições por segundo ele atende?", r: 20, un: "req/s", dica: "1 segundo = 1000 ms.", expl: "1000 ÷ 50 = 20 requisições por segundo." },
        { p: "Com várias threads sobrepondo as esperas de disco, qual o limite imposto pela CPU?", r: 100, un: "req/s", dica: "Agora o gargalo é a CPU: cada requisição usa 10 ms de CPU.", expl: "1000 ÷ 10 = 100 requisições por segundo: 5 vezes mais, só por não deixar a CPU esperando." }] }
    ]
  },
  fc: [
    ["O que é um sistema monoprogramável?", "Aquele que executa um único programa de usuário por vez, que usa todos os recursos até terminar (ex.: MS-DOS)."],
    ["Qual o grande problema da monoprogramação?", "A CPU fica ociosa sempre que o programa espera E/S, desperdiçando o recurso mais caro."],
    ["Como a multiprogramação resolve isso?", "Mantém vários programas na memória e, quando um espera E/S, entrega a CPU a outro que está pronto."],
    ["Por que se diz que a multitarefa num só núcleo é uma ilusão?", "Porque apenas um programa executa a cada instante; as trocas rápidas criam a sensação de simultaneidade."],
    ["O que é quantum (time-slice)?", "A fatia de tempo de CPU que cada programa recebe nos sistemas de tempo compartilhado."],
    ["Diferença entre batch e tempo compartilhado?", "Batch não tem interação; tempo compartilhado é interativo, com fatias de tempo para cada programa/usuário."],
    ["O que prioriza um sistema de tempo real?", "Cumprir prazos (deadlines) de tarefas críticas, com previsibilidade."],
    ["O que são sistemas fortemente acoplados?", "Vários processadores que compartilham a mesma memória e são controlados por um único SO."],
    ["O que são sistemas fracamente acoplados?", "Nós independentes, cada um com sua memória e SO, que se comunicam por rede (clusters, distribuídos)."],
    ["O que uma thread compartilha com as outras do mesmo processo?", "Código, dados (variáveis globais/heap) e arquivos abertos."],
    ["O que é próprio de cada thread?", "A pilha, os registradores e o contador de programa."],
    ["Por que threads de kernel permitem paralelismo e threads de usuário não?", "O kernel conhece e escalona cada thread de kernel, podendo pô-las em núcleos diferentes; threads de usuário aparecem para o kernel como um único processo."]
  ],
  vf: [
    ["Em um sistema monotarefa, a CPU fica ociosa enquanto o programa espera E/S.", true, "Não há outro programa para assumir a CPU."],
    ["Em um processador de um núcleo, dois programas executam instruções exatamente no mesmo instante.", false, "Eles se revezam rapidamente; a simultaneidade é aparente."],
    ["A multiprogramação aumenta a complexidade do sistema operacional.", true, "Ele passa a escalonar, proteger memória e sincronizar."],
    ["Sistemas batch são interativos.", false, "O lote é justamente não interativo."],
    ["No tempo compartilhado, cada programa recebe uma fatia de tempo chamada quantum.", true, "É a base dos SOs modernos."],
    ["Um sistema de tempo real é o mesmo que um sistema de tempo compartilhado rápido.", false, "Tempo real é sobre prazos garantidos, não sobre dividir o tempo igualmente."],
    ["Em sistemas fortemente acoplados, os processadores compartilham a memória.", true, "E são controlados por um único SO."],
    ["Um cluster de servidores ligados por rede é um sistema fracamente acoplado.", true, "Cada nó tem memória e SO próprios."],
    ["Threads de um mesmo processo têm, cada uma, sua própria cópia do código e dos dados.", false, "Elas compartilham código e dados; só pilha e registradores são próprios."],
    ["Criar uma thread costuma ser mais barato que criar um processo.", true, "Não é preciso criar um novo espaço de memória."],
    ["Com threads apenas de usuário, uma chamada de E/S bloqueante pode parar todas as threads do processo.", true, "O kernel bloqueia o processo inteiro."],
    ["Threads eliminam a necessidade de sincronização.", false, "Pelo contrário: como compartilham dados, precisam de sincronização."]
  ],
  caderno: [
    ["Explique a analogia da lavanderia para a monoprogramação.", "Uma única máquina fica ocupada o ciclo inteiro por uma roupa, mesmo nos momentos em que não está fazendo nada; ninguém mais usa. Assim o programa monopoliza a CPU, que fica parada durante a E/S."],
    ["Faça um quadro comparando mono e multiprogramação: execução, uso da CPU, complexidade e exemplo.", "Mono: um programa por vez, uso ineficiente (ocioso), baixa complexidade, MS-DOS. Multi: vários na memória, uso eficiente, alta complexidade, Windows/Linux/macOS."],
    ["Um programa usa 3 ms de CPU e depois espera 7 ms de E/S, repetidamente. Qual o uso da CPU em monoprogramação?", "3 ÷ (3+7) = 30%."],
    ["Por que o tempo compartilhado foi um marco?", "Porque permitiu interação: vários usuários e programas recebem fatias de CPU e têm respostas rápidas, como se cada um tivesse a máquina só para si."],
    ["Descreva um exemplo de sistema de tempo real e o que aconteceria se um prazo fosse perdido.", "Freio ABS: se o comando de aliviar a pressão atrasar, a roda trava e o carro pode derrapar."],
    ["Compare fortemente e fracamente acoplados quanto a memória, SO e comunicação.", "Fortemente: memória compartilhada, um SO, comunicação pela memória. Fracamente: memória e SO por nó, comunicação por mensagens na rede."],
    ["Explique a analogia dos chefs na cozinha para threads.", "Vários chefs (threads) trabalham no mesmo jantar (processo), dividem utensílios e ingredientes (memória), mas cada um cuida da sua tarefa; se um espera a água ferver, os outros continuam."],
    ["Cite três aplicativos que usam muitas threads e o que cada thread pode estar fazendo.", "Navegador (interface, downloads, cada aba); jogo (gráficos, som, física, rede); editor de texto (digitação, ortografia, salvamento automático)."],
    ["Por que, com threads só de usuário, um programa pode congelar inteiro ao ler um arquivo?", "Porque o kernel não sabe que existem várias threads; ele vê um processo que pediu E/S e o bloqueia por completo, parando todas as threads."],
    ["Monte uma tabela processo × thread: custo de criação, troca de contexto, memória e isolamento.", "Processo: criação cara, troca cara, memória própria, isolado. Thread: criação barata, troca barata, memória compartilhada, pouco isolamento."]
  ],
  pbl: [
    { titulo: "O laboratório lento", cenario: "No laboratório da escola, os alunos reclamam que o computador “trava” quando o antivírus faz varredura enquanto eles digitam um trabalho.", passos: [["Usando os conceitos do módulo, explique o que pode estar acontecendo.", "O antivírus é muito pesado (CPU e disco) e disputa recursos com o editor; se o editor for monothread ou o escalonamento priorizar a varredura, a interface demora a responder."], ["Proponha duas soluções técnicas.", "Agendar a varredura para horários sem aula; reduzir a prioridade do antivírus; usar programas multithread; mais memória/SSD para reduzir esperas de E/S."]] },
    { titulo: "Um dia sem multitarefa", cenario: "Imagine que o seu computador passou a ser estritamente monotarefa por um dia.", passos: [["Descreva como seria uma tarde de estudos e quais as maiores frustrações.", "Fechar o navegador para abrir o editor, sem música de fundo, sem mensagens; cada troca de programa exige fechar e abrir; muito tempo esperando."], ["Que conceito do SO resolveria cada frustração?", "Multiprogramação/tempo compartilhado (vários programas abertos), threads (programas que não travam), escalonamento (dividir a CPU de forma justa)."]] },
    { titulo: "Servidor da festa junina", cenario: "A escola vai vender ingressos da festa junina num site. No primeiro teste, quando muita gente acessou, o site respondia um visitante por vez.", passos: [["Que modelo de execução o servidor parece usar e por que ele é lento?", "Monothread/um atendimento por vez: enquanto um pedido espera o banco de dados ou o disco, os outros ficam na fila mesmo com a CPU livre."], ["Como threads (e mais processadores) melhorariam o atendimento?", "Cada pedido em uma thread: as esperas se sobrepõem e a CPU atende outros; com vários núcleos e threads de kernel, pedidos são processados em paralelo."]] }
  ],
  resumo: [
    { t: "Mono × multi", itens: ["Mono: um programa por vez, CPU ociosa na E/S.", "Multi: vários na memória, CPU trocada na E/S.", "Num núcleo, a simultaneidade é ilusão."] },
    { t: "Tipos", itens: ["Batch, tempo compartilhado (quantum), tempo real (prazos).", "Múltiplos processadores: forte (memória comum) e fracamente acoplados (rede)."] },
    { t: "Threads", itens: ["Compartilham código, dados e arquivos; pilha e registradores próprios.", "Usuário (N:1) × kernel (1:1); SOs modernos usam 1:1 ou híbrido."] }
  ],
  glossario: [["Monotarefa", "Um programa de usuário por vez."], ["Multitarefa", "Vários programas revezando a CPU."], ["Quantum", "Fatia de tempo de CPU."], ["Tempo real", "Prazos garantidos."], ["Fortemente acoplado", "Memória compartilhada, um SO."], ["Fracamente acoplado", "Nós ligados por rede."], ["Thread", "Linha de execução de um processo."], ["Troca de contexto", "Salvar e restaurar o estado da CPU ao trocar de tarefa."]]
});
