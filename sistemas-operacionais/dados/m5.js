FSI.modulo({
  n: 5, unidade: "Sincronização", nome: "Sincronização, interrupções e E/S", titulo: "Conversando em ordem: sincronização, interrupções, buffering e spooling", duracao: "5 h",
  resumoCurto: "Interrupções e exceções, operações de E/S, condição de corrida, região crítica e exclusão mútua, buffering, spooling e código reentrante.",
  analogia: { titulo: "A conta conjunta e a ponte de mão única", txt: "<p>Você e um amigo têm uma conta conjunta com R$ 500. No mesmo segundo, você saca R$ 100 num caixa e ele saca R$ 50 em outro. Os dois caixas leem “R$ 500”, cada um faz a sua conta e grava o resultado. O último a gravar vence: a conta fica com R$ 450 em vez de R$ 350. Ninguém errou a matemática — o problema foi a <b>ordem</b>.</p><p>É como dois carros entrando ao mesmo tempo numa <b>ponte de mão única</b>: é preciso uma regra para que só um passe de cada vez. Em sistemas operacionais, essa regra se chama <b>exclusão mútua</b>, e os mecanismos que a garantem são a <b>sincronização</b>.</p>" },
  chave: [
    "<b>Interrupção:</b> sinal assíncrono, geralmente de um dispositivo, que desvia a CPU para uma rotina de tratamento (ex.: o disco terminou a leitura).",
    "<b>Exceção:</b> evento síncrono causado pela própria instrução (ex.: divisão por zero, acesso inválido à memória).",
    "<b>Condição de corrida:</b> o resultado depende da ordem em que processos/threads acessam um dado compartilhado.",
    "<b>Região crítica</b> é o trecho que acessa o recurso compartilhado; <b>exclusão mútua</b> garante um de cada vez (mutex, semáforos, monitores).",
    "<b>Buffering</b> usa memória para desacoplar produtor e consumidor; <b>spooling</b> usa o disco como fila (ex.: impressão).",
    "<b>Código reentrante</b> pode ser usado por vários processos ao mesmo tempo com segurança: só usa dados locais (pilha)."
  ],
  objetivos: ["Diferenciar <b>interrupção</b> e <b>exceção</b> e descrever o tratamento de uma interrupção.", "Explicar <b>condição de corrida</b>, <b>região crítica</b> e <b>exclusão mútua</b>.", "Explicar como <b>buffering</b> e <b>spooling</b> lidam com dispositivos lentos.", "Definir <b>reentrância</b> e reconhecer código reentrante."],
  licoes: [
    { t: "Interrupções e exceções", txt: "<p>O processador executa instruções em sequência, mas o mundo lá fora não espera: uma tecla é apertada, um pacote chega da rede, o disco termina uma leitura. Para tratar esses eventos existe o mecanismo de <b>interrupção</b>.</p>", pontos: ["<b>Interrupção:</b> gerada por hardware externo, de forma <b>assíncrona</b> (pode chegar a qualquer momento). Ex.: teclado, relógio, fim de E/S.", "<b>Exceção:</b> gerada pela <b>própria instrução</b> em execução, de forma <b>síncrona</b>. Ex.: divisão por zero, instrução inválida, falta de página.", "Tratamento: a CPU termina a instrução atual, <b>salva o contexto</b>, consulta o <b>vetor de interrupção</b>, executa a <b>rotina de tratamento</b> e depois <b>restaura</b> o contexto e continua.", "O <b>relógio</b> gera interrupções periódicas: é assim que o SO retoma o controle e faz a preempção no fim do quantum."], pense: "Um vírus causa uma divisão por zero de propósito. Isso é interrupção ou exceção?" },
    { t: "Operações de entrada e saída", txt: "<p>Dispositivos de E/S são muito mais lentos que a CPU. Há três formas de a CPU acompanhar uma operação:</p>", pontos: ["<b>E/S programada (polling):</b> a CPU pergunta repetidamente ao controlador “já terminou?”. Como a criança no carro perguntando “já chegamos?”. Desperdiça CPU.", "<b>E/S por interrupção:</b> a CPU inicia a operação, vai fazer outra coisa e é <b>avisada por uma interrupção</b> quando termina. É a base da multiprogramação.", "<b>DMA (acesso direto à memória):</b> um controlador dedicado copia blocos inteiros entre o dispositivo e a memória sem a CPU, que só é interrompida no fim. Ideal para discos e rede.", "Enquanto a E/S acontece, o processo que a pediu fica <b>bloqueado</b>, e a CPU atende outro."], pense: "Por que o polling é aceitável num microcontrolador simples, mas ruim num PC multitarefa?" },
    { t: "Condição de corrida e região crítica", txt: "<p>Quando dois processos ou threads leem e modificam o mesmo dado, o resultado pode depender da ordem em que executam: é a <b>condição de corrida (race condition)</b>. No exemplo da conta conjunta, a sequência “ler → calcular → gravar” de um caixa foi intercalada com a do outro, e uma atualização se perdeu.</p>", pontos: ["<b>Região crítica:</b> o trecho de código que acessa o recurso compartilhado (ler-modificar-gravar o saldo).", "<b>Exclusão mútua:</b> garantir que, se um processo está na região crítica, nenhum outro entra nela.", "A operação precisa ser <b>atômica</b> (indivisível) do ponto de vista dos outros.", "Outros exemplos: venda do último ingresso, reserva de assento de cinema, estoque de loja online."], pense: "Pense num exemplo de condição de corrida que poderia acontecer num site de venda de ingressos." },
    { t: "Como garantir a exclusão mútua", txt: "<p>Os SOs oferecem várias ferramentas:</p>", pontos: ["<b>Desabilitar interrupções:</b> sem interrupções, o SO não troca de processo. Simples, mas perigoso e inútil com vários processadores — só o kernel usa, e por instantes.", "<b>Mutex (trava):</b> antes da região crítica o processo pega a trava; se ela estiver com outro, ele <b>bloqueia</b> e espera; ao sair, devolve a trava.", "<b>Semáforo:</b> um contador com as operações <b>down/wait</b> e <b>up/signal</b>; pode controlar um recurso ou vários (ex.: 3 vagas).", "<b>Monitor:</b> estrutura de linguagem que só deixa uma thread executar seus procedimentos por vez.", "Usar sincronização demais ou na ordem errada pode causar <b>deadlock</b> (impasse): processos esperando uns pelos outros para sempre."], pense: "Por que um mutex resolve o problema da conta conjunta?" },
    { t: "Buffering, spooling e reentrância", txt: "<p>Duas técnicas ajudam a lidar com velocidades diferentes, e um cuidado de programação permite compartilhar código:</p>", pontos: ["<b>Buffering:</b> uma área de <b>memória</b> temporária entre um <b>produtor</b> e um <b>consumidor</b>. O produtor coloca dados e o consumidor retira no seu ritmo. Ex.: o vídeo que carrega alguns segundos à frente.", "<b>Spooling</b> (Simultaneous Peripheral Operation On-Line): usa o <b>disco</b> como fila. Vários programas “imprimem” de uma vez, os documentos vão para a fila (spool) e o SO imprime um por vez. Os programas ficam livres na hora.", "<b>Reentrância:</b> um código é reentrante se pode ser interrompido no meio e chamado de novo por outro processo sem erro. Para isso, não modifica variáveis globais/estáticas; seus dados ficam na <b>pilha</b> de cada chamador.", "O kernel e bibliotecas compartilhadas precisam ser reentrantes: o mesmo código atende centenas de processos."], pense: "O que aconteceria se não houvesse spooling e três programas mandassem imprimir ao mesmo tempo?" }
  ],
  termos: [["Interrupção", "Sinal assíncrono de hardware que desvia a CPU."], ["Exceção", "Evento síncrono causado pela instrução (ex.: divisão por zero)."], ["Vetor de interrupção", "Tabela com o endereço de cada rotina de tratamento."], ["DMA", "Transferência direta dispositivo ↔ memória, sem a CPU."], ["Condição de corrida", "Resultado depende da ordem de execução."], ["Região crítica", "Trecho que acessa recurso compartilhado."], ["Mutex / semáforo", "Ferramentas de exclusão mútua."], ["Spool", "Fila de trabalhos no disco."]],
  visuais: [
    { tipo: "sequencia", id: "irq", titulo: "O que acontece numa interrupção de teclado", atores: ["Processo\nem execução", "CPU", "SO (rotina de\ntratamento)", "Teclado"], passos: [
      { de: 0, para: 1, t: "executando instruções", d: "Um processo está usando a CPU normalmente." },
      { de: 3, para: 1, t: "sinal de interrupção", d: "Você aperta uma tecla: o controlador do teclado envia um <b>sinal de interrupção</b> — assíncrono, a qualquer momento." },
      { de: 1, para: 1, t: "termina a instrução e salva o contexto", d: "A CPU conclui a instrução atual e salva o contexto (registradores, contador de programa)." },
      { de: 1, para: 2, t: "vetor → rotina", d: "Pelo <b>vetor de interrupção</b>, a CPU desvia para a rotina do SO que trata o teclado." },
      { de: 2, para: 3, t: "lê o código da tecla", d: "A rotina lê a tecla do controlador e a coloca num <b>buffer</b> do teclado." },
      { de: 2, para: 1, t: "acorda quem esperava", d: "Se algum processo estava bloqueado esperando digitação, ele passa para Pronto." },
      { de: 1, para: 0, t: "restaura o contexto", d: "A CPU restaura o contexto e o processo interrompido continua como se nada tivesse acontecido." }] },
    { tipo: "classificar", id: "int-exc", titulo: "Jogo: interrupção ou exceção?", cats: ["Interrupção (assíncrona, externa)", "Exceção (síncrona, da instrução)"], itens: [["Uma tecla foi pressionada", 0], ["Divisão por zero", 1], ["O disco terminou de ler um bloco", 0], ["Instrução inválida", 1], ["O relógio sinalizou fim do quantum", 0], ["Acesso a endereço de memória proibido", 1], ["Chegou um pacote pela placa de rede", 0], ["Overflow numa operação aritmética", 1]] },
    { tipo: "linha", id: "es-modos", titulo: "Três formas de fazer E/S", passos: [
      { t: "E/S programada (polling)", d: "A CPU fica num laço perguntando ao controlador se terminou. Simples, mas desperdiça todo esse tempo de CPU." },
      { t: "E/S por interrupção", d: "A CPU inicia a operação e vai atender outro processo. Quando o dispositivo termina, envia uma interrupção." },
      { t: "DMA", d: "Um controlador de DMA copia o bloco inteiro direto para a memória e só interrompe a CPU no fim. Ideal para grandes volumes (disco, rede)." }] }
  ],
  lab: {
    intro: "Dois laboratórios: no primeiro, você controla a ordem dos passos de dois caixas eletrônicos e vê a condição de corrida acontecer (e ser resolvida com uma trava). No segundo, compara imprimir com e sem spooling.",
    sims: [
      { tipo: "corrida", titulo: "Condição de corrida no caixa eletrônico", instr: "Alterne os passos dos caixas A e B. Tente primeiro intercalar (A lê, B lê, A grava, B grava). Depois ligue a trava.", cfg: { id: "cor", saldo: 500, a: 100, b: 50 } },
      { tipo: "spool", titulo: "Spooling de impressão", instr: "Mande os três programas imprimirem, primeiro com o spooling desligado e depois ligado.", cfg: { id: "sp" } },
      { tipo: "classificar", id: "lab-int", titulo: "Central de eventos: interrupção ou exceção?", instr: "Você é o SO. Classifique cada evento que chegou à CPU.", cats: ["Interrupção", "Exceção"], itens: [["O mouse se moveu", 0], ["O programa tentou dividir por zero", 1], ["A placa de rede recebeu dados", 0], ["Acesso a uma página inexistente", 1], ["O relógio do sistema deu um tique", 0], ["Instrução privilegiada em modo usuário", 1]] }
    ],
    missoes: [
      { id: "m1", t: "Faça uma atualização do saldo se perder (condição de corrida)", ev: "cor:perdeu" },
      { id: "m2", t: "Ligue a trava e veja um caixa ser bloqueado na região crítica", ev: "cor:bloqueou" },
      { id: "m3", t: "Chegue ao saldo correto usando a trava (mutex)", ev: "cor:mutex-ok" },
      { id: "m4", t: "Sem spooling, faça um programa travar esperando a impressora", ev: "sp:travou" },
      { id: "m5", t: "Com spooling, coloque três trabalhos na fila", ev: "sp:fila3" },
      { id: "m6", t: "Com spooling, imprima três documentos", ev: "sp:impressos3" },
      { id: "m7", t: "Classifique interrupções e exceções sem erros", ev: "vis:lab-int" }
    ],
    guiados: [
      { titulo: "A conta conjunta em números", txt: "<p>Saldo inicial <b>R$ 500</b>. Caixa A saca <b>R$ 100</b>, caixa B saca <b>R$ 50</b>. A ordem real foi: A lê, B lê, A calcula e grava, B calcula e grava.</p>", passos: [
        { p: "Qual deveria ser o saldo final correto (R$)?", r: 350, dica: "500 − 100 − 50.", expl: "R$ 350." },
        { p: "Qual valor o caixa A gravou (R$)?", r: 400, dica: "A leu 500 e subtraiu o saque dele.", expl: "500 − 100 = R$ 400." },
        { p: "Qual o saldo final que ficou gravado (R$)?", r: 450, dica: "B também leu 500 (antes de A gravar) e gravou por último.", expl: "500 − 50 = R$ 450: a gravação de A foi sobrescrita. O banco perdeu R$ 100." },
        { p: "Quantos reais o banco “perdeu” por causa da condição de corrida?", r: 100, dica: "Compare o saldo gravado com o correto.", expl: "450 − 350 = R$ 100." }] }
    ]
  },
  fc: [
    ["O que é uma interrupção?", "Um sinal assíncrono, geralmente de hardware, que faz a CPU parar o que faz e executar uma rotina de tratamento."],
    ["O que é uma exceção?", "Um evento síncrono causado pela instrução em execução, como divisão por zero ou acesso inválido à memória."],
    ["Quais os passos do tratamento de uma interrupção?", "Terminar a instrução, salvar o contexto, consultar o vetor de interrupção, executar a rotina, restaurar o contexto e continuar."],
    ["Qual a desvantagem do polling?", "A CPU gasta tempo perguntando ao dispositivo se terminou, em vez de fazer trabalho útil."],
    ["O que é DMA?", "Acesso direto à memória: um controlador transfere dados entre dispositivo e memória sem envolver a CPU, que só é avisada no fim."],
    ["O que é condição de corrida?", "Situação em que o resultado depende da ordem em que processos/threads acessam dados compartilhados."],
    ["O que é região crítica?", "O trecho do código que acessa um recurso compartilhado e precisa de proteção."],
    ["O que é exclusão mútua?", "A garantia de que só um processo por vez está na região crítica."],
    ["Como um mutex funciona?", "O processo pega a trava antes de entrar na região crítica; se outro tiver a trava, ele espera bloqueado; ao sair, libera a trava."],
    ["Qual a diferença entre buffering e spooling?", "Buffering usa uma área de memória entre produtor e consumidor; spooling usa o disco como fila de trabalhos (ex.: impressão)."],
    ["O que é código reentrante?", "Código que pode ser interrompido e chamado de novo por outro processo com segurança, pois usa só dados locais (pilha)."],
    ["Por que desabilitar interrupções não serve como solução geral de exclusão mútua?", "É perigoso deixar programas fazerem isso e não funciona com vários processadores."]
  ],
  vf: [
    ["Uma interrupção pode chegar em qualquer momento da execução de um programa.", true, "Ela é assíncrona em relação ao programa."],
    ["Divisão por zero é um exemplo de interrupção externa.", false, "É uma exceção: síncrona, causada pela instrução."],
    ["Antes de tratar uma interrupção, a CPU salva o contexto do processo interrompido.", true, "Assim ele pode continuar depois."],
    ["No polling a CPU é avisada pelo dispositivo quando a operação termina.", false, "No polling a CPU fica perguntando; quem avisa é a E/S por interrupção."],
    ["Com DMA, a CPU precisa copiar byte a byte os dados do disco para a memória.", false, "O controlador de DMA faz a cópia; a CPU só é avisada no fim."],
    ["A condição de corrida acontece quando o resultado depende da ordem de execução.", true, "É a definição."],
    ["Região crítica é a área de memória onde ficam os arquivos do SO.", false, "É o trecho de código que acessa um recurso compartilhado."],
    ["Um mutex permite que dois processos fiquem ao mesmo tempo na região crítica.", false, "Ele garante exclusão mútua: um de cada vez."],
    ["O spooling de impressão permite que o programa continue trabalhando enquanto o documento espera na fila.", true, "O documento vai para o disco e o programa fica livre."],
    ["Buffering ajuda produtor e consumidor que trabalham em ritmos diferentes.", true, "O buffer absorve as diferenças de velocidade."],
    ["Uma função que altera uma variável global compartilhada é reentrante.", false, "Para ser reentrante, ela deve usar apenas dados locais."],
    ["Usar travas na ordem errada pode levar a um impasse (deadlock).", true, "Processos podem ficar esperando uns pelos outros para sempre."]
  ],
  caderno: [
    ["Compare interrupção e exceção com dois exemplos de cada.", "Interrupção: assíncrona, externa — tecla pressionada, fim de leitura do disco. Exceção: síncrona, causada pela instrução — divisão por zero, acesso inválido à memória."],
    ["Explique, passo a passo, o tratamento de uma interrupção.", "A CPU termina a instrução, salva o contexto, identifica a interrupção pelo vetor, executa a rotina do SO, restaura o contexto e retoma o processo interrompido."],
    ["Por que a E/S por interrupção é essencial para a multiprogramação?", "Porque a CPU não precisa ficar esperando o dispositivo: inicia a operação, atende outro processo e só volta quando a interrupção avisa que terminou."],
    ["Descreva um cenário de condição de corrida diferente da conta bancária.", "Dois clientes compram o último ingresso no mesmo instante: ambos veem “1 disponível”, ambos pagam e o sistema vende dois ingressos para um assento."],
    ["Dê dois exemplos de recursos compartilhados que precisam de região crítica protegida.", "A fila de impressão do SO; a tabela de processos; um arquivo de estoque; uma variável global compartilhada por threads."],
    ["Explique como um mutex resolve o problema da conta conjunta.", "O caixa A pega a trava antes de ler o saldo; B tenta e bloqueia; A lê, calcula, grava e libera; só então B lê o saldo já atualizado (400) e grava 350."],
    ["Por que o spooling melhora a experiência do usuário?", "Os programas mandam imprimir e continuam livres; os documentos esperam em fila no disco e são impressos em ordem, sem misturar páginas nem travar ninguém."],
    ["O que aconteceria sem o gerenciamento de impressão do SO?", "Programas disputariam a impressora diretamente: páginas misturadas, programas travados esperando, erros."],
    ["Explique a diferença entre buffer e spool com um exemplo de cada.", "Buffer (memória): o vídeo carrega alguns segundos à frente. Spool (disco): a fila de documentos esperando a impressora."],
    ["Por que o código do kernel precisa ser reentrante?", "Porque o mesmo código é chamado por muitos processos e pode ser interrompido no meio; se usasse variáveis globais, uma chamada estragaria os dados da outra."]
  ],
  pbl: [
    { titulo: "O cinema que vendeu o mesmo assento duas vezes", cenario: "O site do cinema da cidade vendeu a poltrona F12 para duas pessoas na estreia de um filme. As duas compras aconteceram no mesmo segundo.", passos: [["Explique tecnicamente o que aconteceu, usando os termos do módulo.", "Condição de corrida: os dois pedidos leram “F12 livre” antes de qualquer um gravar “ocupada”; a região crítica (verificar e reservar) não tinha exclusão mútua."], ["Proponha uma solução e explique como ela evita o problema.", "Proteger a região crítica com uma trava/transação no banco: o primeiro pedido trava F12, verifica, reserva e libera; o segundo só lê depois e vê “ocupada”."]] },
    { titulo: "A impressora da sala dos professores", cenario: "Na sala dos professores há uma única impressora para 15 computadores. Antes da configuração do servidor de impressão, as páginas saíam misturadas e os computadores travavam ao imprimir.", passos: [["Que técnica o servidor de impressão aplica? Descreva o funcionamento.", "Spooling: os documentos são gravados numa fila no disco do servidor e enviados à impressora um por vez, em ordem."], ["Por que os computadores pararam de travar?", "Porque o envio para o spool é rápido; o programa não espera a impressão física terminar."]] },
    { titulo: "O teclado que não responde", cenario: "Num microcontrolador de uma máquina de café, o programa verifica o botão “Expresso” num laço sem fim. Ao adicionar mais funções (Wi-Fi, display), o botão começou a falhar.", passos: [["Que técnica de E/S o programa usa e por que ela passou a falhar?", "Polling: a CPU só verifica o botão quando passa por aquele ponto do laço; com mais tarefas, a verificação ficou espaçada e apertos rápidos se perdem."], ["Qual alternativa você recomendaria?", "Usar interrupção no pino do botão: o hardware avisa a CPU no instante em que o botão é pressionado."]] }
  ],
  resumo: [
    { t: "Interrupções", itens: ["Interrupção: assíncrona, externa. Exceção: síncrona, da instrução.", "Tratamento: salva contexto → vetor → rotina → restaura."] },
    { t: "E/S", itens: ["Polling desperdiça CPU; interrupção libera a CPU; DMA copia sem a CPU."] },
    { t: "Sincronização", itens: ["Condição de corrida → região crítica → exclusão mútua.", "Mutex, semáforo, monitor; cuidado com deadlock.", "Buffering (memória), spooling (disco), código reentrante (dados na pilha)."] }
  ],
  glossario: [["Interrupção", "Sinal externo que desvia a CPU."], ["Exceção", "Evento causado pela instrução em execução."], ["Polling", "CPU pergunta repetidamente ao dispositivo."], ["DMA", "Acesso direto à memória."], ["Mutex", "Trava de exclusão mútua."], ["Semáforo", "Contador para controlar acesso a recursos."], ["Deadlock", "Impasse: processos esperando uns pelos outros."], ["Reentrante", "Código seguro para chamadas simultâneas."]]
});
