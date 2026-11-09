FSI.modulo({
  n: 2, unidade: "Von Neumann e CPU", nome: "Arquitetura de Von Neumann e a CPU", titulo: "Dentro do processador: a arquitetura de Von Neumann e o ciclo de instrução", duracao: "8 h",
  resumoCurto: "Os blocos de um computador (CPU, memória, entrada e saída, barramentos), as partes da CPU e o ciclo busca–decodificação–execução, numa CPU simulada.",
  analogia: { titulo: "A cozinha do restaurante", txt: "<p>Pense numa cozinha. O <b>livro de receitas</b> e a <b>despensa</b> ficam na mesma estante: é a <b>memória</b>, que guarda tanto as instruções (receitas) quanto os dados (ingredientes). O <b>chefe</b> lê o próximo passo da receita, entende o que fazer e manda executar: é a <b>unidade de controle</b>. O <b>cozinheiro</b> pica, mistura e soma ingredientes: é a <b>ULA</b>. A bancada onde ele apoia o que está usando agora são os <b>registradores</b>. Os garçons que levam e trazem coisas entre a estante e a bancada são os <b>barramentos</b>.</p><p>Toda vez que o chefe pega a próxima linha da receita, entende e manda executar, completa um <b>ciclo de instrução</b>. Um processador faz isso bilhões de vezes por segundo.</p>" },
  chave: [
    "Na <b>arquitetura de Von Neumann</b>, dados e programas ficam na <b>mesma memória</b> (programa armazenado).",
    "Blocos: <b>CPU</b> (unidade de controle + ULA + registradores), <b>memória</b>, <b>entrada e saída</b> e <b>barramentos</b>.",
    "Barramentos: de <b>dados</b> (o conteúdo), de <b>endereços</b> (onde) e de <b>controle</b> (ler, gravar, interromper).",
    "Ciclo de instrução: <b>busca</b> (PC → memória → IR), <b>decodificação</b> e <b>execução</b>.",
    "Registradores importantes: <b>PC</b> (próxima instrução), <b>IR</b> (instrução atual) e <b>acumulador</b> (resultado da ULA).",
    "O <b>clock</b> marca o ritmo da CPU; mais núcleos permitem executar instruções de verdade em paralelo."
  ],
  objetivos: ["Descrever os blocos da <b>arquitetura de Von Neumann</b>.", "Explicar a função da <b>unidade de controle</b>, da <b>ULA</b> e dos <b>registradores</b>.", "Executar à mão o <b>ciclo de instrução</b> de um programa simples.", "Relacionar <b>clock</b>, núcleos e largura do barramento ao desempenho."],
  licoes: [
    { t: "A ideia do programa armazenado", txt: "<p>Os primeiros computadores eram programados religando cabos: mudar de tarefa levava dias. Em 1945, um relatório assinado por <b>John von Neumann</b> descreveu uma máquina em que o <b>programa fica guardado na memória</b>, junto com os dados. Trocar de programa passou a ser só carregar outro na memória. Quase todos os computadores atuais seguem esse modelo.</p>" },
    { t: "Os blocos do computador", txt: "<p>A arquitetura de Von Neumann tem quatro partes ligadas por barramentos:</p>", pontos: ["<b>CPU (processador):</b> busca e executa as instruções.", "<b>Memória principal:</b> guarda programas e dados em uso, cada posição com um <b>endereço</b>.", "<b>Dispositivos de entrada e saída:</b> teclado, tela, disco, rede…", "<b>Barramentos:</b> as “estradas” por onde passam endereços, dados e sinais de controle.", "Uma limitação famosa é o <b>gargalo de Von Neumann</b>: como instruções e dados passam pelo mesmo caminho, a CPU muitas vezes espera a memória. Memórias cache ajudam a reduzir esse problema."] },
    { t: "Por dentro da CPU", txt: "<p>O processador tem três partes principais:</p>", pontos: ["<b>Unidade de controle (UC):</b> busca a instrução, interpreta e coordena todos os outros componentes por meio de sinais de controle.", "<b>Unidade lógica e aritmética (ULA):</b> faz contas (somar, subtrair) e comparações e operações lógicas (E, OU, NÃO).", "<b>Registradores:</b> memórias minúsculas e muito rápidas dentro da CPU. O <b>PC</b> (contador de programa) guarda o endereço da próxima instrução; o <b>IR</b> guarda a instrução que está sendo executada; o <b>acumulador</b> guarda o resultado da ULA."] },
    { t: "O ciclo de instrução", txt: "<p>A CPU repete sem parar três fases:</p>", pontos: ["<b>Busca:</b> o endereço do PC vai para o barramento de endereços; a memória devolve a instrução pelo barramento de dados; ela é copiada para o IR e o PC avança.", "<b>Decodificação:</b> a unidade de controle descobre que operação é e de quais dados precisa.", "<b>Execução:</b> a ULA calcula, um dado é lido ou gravado na memória, ou o PC é alterado (desvio).", "Desvios (<i>jumps</i>) são o que permite <b>decisões e repetições</b>: o PC passa a apontar para outra parte do programa."] },
    { t: "Clock, núcleos e barramentos", txt: "<p>O <b>clock</b> é um sinal que marca o ritmo do processador, medido em hertz: 3 GHz são 3 bilhões de ciclos por segundo. Mas clock não é tudo: processadores modernos executam várias instruções por ciclo e têm vários <b>núcleos</b>, cada um capaz de executar seu próprio fluxo de instruções.</p><p>A <b>largura do barramento de endereços</b> define quanta memória pode ser endereçada: com 32 bits, são 2³² endereços (4 GiB de bytes). Por isso sistemas de 32 bits não aproveitam mais de 4 GB de RAM, e os de 64 bits sim.</p>" }
  ],
  termos: [["Von Neumann", "Modelo com programa e dados na mesma memória."], ["ULA", "Faz contas e operações lógicas."], ["Unidade de controle", "Busca, decodifica e coordena."], ["PC", "Registrador com o endereço da próxima instrução."], ["IR", "Registrador com a instrução atual."], ["Clock", "Ritmo do processador, em hertz."]],
  visuais: [
    { tipo: "rede", id: "vn", titulo: "A arquitetura de Von Neumann", h: 400, nos: [
      { id: "cpu", x: 360, y: 70, t: "CPU", d: "Unidade de controle, ULA e registradores. Busca e executa as instruções." },
      { id: "uc", x: 200, y: 50, t: "Unidade de\ncontrole", d: "Interpreta a instrução e envia sinais de controle." },
      { id: "ula", x: 520, y: 50, t: "ULA", d: "Contas e comparações." },
      { id: "reg", x: 360, y: 170, t: "Registradores", d: "PC, IR, acumulador: memória mínima e rapidíssima dentro da CPU." },
      { id: "bar", x: 360, y: 260, t: "Barramentos\n(dados, endereços, controle)", d: "Caminhos que ligam todos os blocos." },
      { id: "mem", x: 140, y: 350, t: "Memória\nprincipal", d: "Guarda programas e dados, cada posição com um endereço." },
      { id: "es", x: 580, y: 350, t: "Entrada e\nsaída", d: "Teclado, tela, disco, rede: a comunicação com o mundo." }],
      liga: [["cpu", "uc"], ["cpu", "ula"], ["cpu", "reg"], ["reg", "bar"], ["bar", "mem"], ["bar", "es"]] },
    { tipo: "sequencia", id: "ciclo", titulo: "Um ciclo de instrução: LOAD 6", atores: ["Unidade de\ncontrole", "Barramentos", "Memória", "Registradores"], passos: [
      { de: 0, para: 1, t: "endereço do PC (0)", d: "A UC coloca o valor do PC no <b>barramento de endereços</b> e sinaliza “ler” no barramento de controle." },
      { de: 1, para: 2, t: "ler posição 0", d: "A memória localiza o endereço 0." },
      { de: 2, para: 1, t: "“LOAD 6”", d: "O conteúdo volta pelo <b>barramento de dados</b>." },
      { de: 1, para: 3, t: "IR ← LOAD 6; PC ← 1", d: "A instrução vai para o IR e o PC avança: fim da <b>busca</b>." },
      { de: 0, para: 0, t: "decodifica", d: "A UC entende: carregar no acumulador o dado do endereço 6." },
      { de: 0, para: 2, t: "ler posição 6", d: "Na <b>execução</b>, um novo acesso à memória busca o dado." },
      { de: 2, para: 3, t: "ACC ← 25", d: "O dado chega ao acumulador. A CPU já parte para a próxima busca." }] },
    { tipo: "classificar", id: "jogo-cpu", titulo: "Jogo: quem faz isso?", cats: ["Unidade de controle", "ULA", "Registradores", "Barramentos"], itens: [["Interpretar a instrução", 0], ["Enviar o sinal “gravar na memória”", 0], ["Somar dois números", 1], ["Comparar se um valor é zero", 1], ["Guardar o endereço da próxima instrução", 2], ["Guardar o resultado parcial de uma conta", 2], ["Levar o endereço até a memória", 3], ["Transportar o dado lido da memória", 3]] }
  ],
  lab: {
    intro: "Uma CPU simplificada com um acumulador e 16 posições de memória. Execute os programas fase por fase e observe o PC, o IR e o acumulador mudando. Depois altere os dados na memória e rode de novo.",
    sims: [
      { tipo: "cpu", titulo: "CPU simulada: busca, decodificação e execução", cfg: { id: "cpu", programas: [
        { id: "soma", nome: "1. Soma de dois números", desc: "Soma os valores dos endereços 6 e 7, guarda no 8 e mostra o resultado.", mem: ["LOAD 6", "ADD 7", "STORE 8", "OUT", "HALT", 0, 25, 17, 0], fim: "25 + 17 = 42, guardado no endereço 8." },
        { id: "laco", nome: "2. Contagem regressiva (laço)", desc: "Mostra n, n−1, … até 0. Repare no <b>JMP</b> que volta e no <b>JZ</b> que sai do laço.", mem: ["LOAD 10", "OUT", "SUB 11", "STORE 10", "JZ 6", "JMP 1", "OUT", "HALT", 0, 0, 3, 1], fim: "O laço repetiu até o acumulador chegar a zero." },
        { id: "mult", nome: "3. Multiplicação por somas", desc: "Calcula 6 × 4 somando 6 quatro vezes (a CPU só sabe somar e subtrair).", mem: ["LOAD 13", "ADD 11", "STORE 13", "LOAD 12", "SUB 14", "STORE 12", "JZ 8", "JMP 0", "LOAD 13", "OUT", "HALT", 6, 4, 0, 1], fim: "Multiplicar é somar repetidas vezes." },
        { id: "semhalt", nome: "4. Programa com defeito", desc: "Falta uma instrução HALT. O que acontece quando a CPU busca um dado como se fosse instrução?", mem: ["LOAD 3", "OUT", 7, 0], fim: "" }] } }
    ],
    missoes: [
      { id: "m1", t: "Faça a fase de busca de uma instrução", ev: "cpu:busca" },
      { id: "m2", t: "Complete um ciclo inteiro (busca, decodificação, execução)", ev: "cpu:ciclo" },
      { id: "m3", t: "Rode o programa de soma até o fim", ev: "cpu:fim:soma" },
      { id: "m4", t: "Produza uma saída com OUT", ev: "cpu:out" },
      { id: "m5", t: "Rode a contagem regressiva", ev: "cpu:fim:laco" },
      { id: "m6", t: "Rode a multiplicação por somas", ev: "cpu:fim:mult" },
      { id: "m7", t: "Mude um dado na memória e rode o programa de novo até o fim", ev: "cpu:editou-fim" }
    ],
    guiados: [
      { titulo: "Clock na prática", txt: "<p>Um processador funciona a <b>4 GHz</b>.</p>", passos: [
        { p: "Quantos bilhões de ciclos ele faz por segundo?", r: 4, un: "bilhões", dica: "1 GHz = 1 bilhão de ciclos por segundo.", expl: "4 bilhões." },
        { p: "Quanto dura um ciclo, em nanossegundos? (uma casa decimal)", r: 0.25, tol: 0.01, un: "ns", dica: "1 ÷ 4 GHz = 1 ÷ 4 ns.", expl: "0,25 ns: um quarto de bilionésimo de segundo." },
        { p: "Se cada instrução levasse 4 ciclos, quantas instruções (em bilhões) ele faria por segundo?", r: 1, un: "bilhão", dica: "4 bilhões ÷ 4.", expl: "1 bilhão. Processadores modernos fazem bem mais, porque executam várias instruções por ciclo." }] },
      { titulo: "Quanto o barramento de endereços alcança?", txt: "<p>Cada endereço identifica <b>1 byte</b>.</p>", passos: [
        { p: "Com 16 bits de endereço, quantos bytes podem ser endereçados?", r: 65536, un: "bytes", dica: "2¹⁶.", expl: "65.536 bytes = 64 KB." },
        { p: "Com 32 bits, quantos GiB? (2³⁰ bytes = 1 GiB)", r: 4, un: "GiB", dica: "2³² ÷ 2³⁰.", expl: "4 GiB: o limite dos sistemas de 32 bits." }] }
    ]
  },
  fc: [
    ["Qual é a ideia central da arquitetura de Von Neumann?", "Programa e dados ficam na mesma memória (programa armazenado)."],
    ["Quais são os blocos da arquitetura de Von Neumann?", "CPU, memória, entrada e saída, ligados por barramentos."],
    ["O que faz a unidade de controle?", "Busca e interpreta as instruções e coordena os componentes com sinais de controle."],
    ["O que faz a ULA?", "Operações aritméticas (somar, subtrair) e lógicas/comparações."],
    ["Para que serve o registrador PC?", "Guarda o endereço da próxima instrução a ser buscada."],
    ["Para que serve o registrador IR?", "Guarda a instrução que está sendo decodificada e executada."],
    ["Quais são as fases do ciclo de instrução?", "Busca, decodificação e execução."],
    ["O que viaja no barramento de endereços?", "O endereço da posição de memória ou do dispositivo que será acessado."],
    ["E no barramento de controle?", "Sinais como ler, gravar, interrupção e clock."],
    ["O que é o gargalo de Von Neumann?", "A CPU espera a memória porque instruções e dados passam pelo mesmo caminho, que é mais lento que o processador."],
    ["O que significa 3 GHz?", "3 bilhões de ciclos de clock por segundo."],
    ["Como um programa faz uma repetição em linguagem de máquina?", "Com uma instrução de desvio que muda o PC para voltar a um endereço anterior."]
  ],
  vf: [
    ["Na arquitetura de Von Neumann, o programa fica numa memória separada dos dados.", false, "Ficam na mesma memória; separar é característica da arquitetura Harvard."],
    ["A ULA decide qual será a próxima instrução.", false, "Quem coordena é a unidade de controle; o PC guarda a próxima."],
    ["Depois da busca, o PC já aponta para a instrução seguinte.", true, "Ele avança durante a busca, a menos que um desvio o altere depois."],
    ["Registradores são mais rápidos que a memória RAM.", true, "Ficam dentro da CPU e funcionam na velocidade dela."],
    ["O barramento de dados leva o endereço até a memória.", false, "Quem leva o endereço é o barramento de endereços."],
    ["Um processador de clock maior é sempre mais rápido.", false, "Depende também de instruções por ciclo, núcleos, cache e memória."],
    ["Com 32 bits de endereço é possível endereçar 4 GiB.", true, "2³² bytes = 4 GiB."],
    ["Uma instrução de desvio pode fazer o programa repetir trechos.", true, "Alterar o PC é a base de laços e decisões."],
    ["A unidade de controle executa as somas.", false, "Quem soma é a ULA."],
    ["Se a CPU buscar um dado achando que é instrução, o programa pode travar ou fazer algo inesperado.", true, "Por isso é preciso uma instrução de parada ou de desvio correta."],
    ["Um processador de 4 núcleos pode executar 4 fluxos de instruções ao mesmo tempo.", true, "Cada núcleo tem sua própria unidade de execução."],
    ["Von Neumann propôs programar os computadores religando cabos.", false, "Ele descreveu o programa armazenado na memória, que acabou com essa necessidade."]
  ],
  caderno: [
    ["Explique a analogia da cozinha, ligando cada elemento a uma parte do computador.", "Estante (receitas + ingredientes) = memória com programas e dados; chefe = unidade de controle; cozinheiro = ULA; bancada = registradores; garçons = barramentos."],
    ["Desenhe o diagrama de Von Neumann e explique cada bloco em uma linha.", "CPU (executa), memória (guarda programas e dados), entrada/saída (comunica), barramentos (ligam tudo)."],
    ["Descreva o que acontece com PC, IR e acumulador ao executar LOAD 6 no endereço 0, sabendo que a posição 6 guarda 25.", "Busca: IR = LOAD 6, PC = 1. Decodificação: ler memória[6]. Execução: ACC = 25."],
    ["Diferencie os três barramentos com um exemplo de cada.", "Endereços: “posição 1024”; dados: o valor 25 lido; controle: o sinal “ler”."],
    ["Por que a ideia do programa armazenado foi revolucionária?", "Trocar de tarefa passou a ser carregar outro programa na memória, sem refazer fios; programas podem até gerar e carregar outros programas."],
    ["O que é o gargalo de Von Neumann e como a cache ajuda?", "A CPU espera a memória mais lenta; a cache guarda perto da CPU o que foi usado recentemente, reduzindo idas à RAM."],
    ["Escreva, na linguagem da CPU simulada, um programa que soma os endereços 10, 11 e 12 e mostra o total.", "LOAD 10 / ADD 11 / ADD 12 / OUT / HALT."],
    ["Explique como o programa de contagem regressiva repete e como ele sabe parar.", "JMP 1 volta o PC para o início do laço; JZ 6 desvia para o fim quando o acumulador chega a zero."],
    ["Compare dois processadores: A (3,0 GHz, 4 núcleos) e B (3,5 GHz, 2 núcleos). Qual é melhor para editar vídeo? Justifique.", "Provavelmente A: edição de vídeo usa muitos núcleos em paralelo, e o clock maior de B não compensa ter metade dos núcleos (considerando arquiteturas parecidas)."],
    ["Por que um Windows de 32 bits não aproveita 8 GB de RAM?", "Com endereços de 32 bits só há 2³² posições (4 GiB); o restante não pode ser endereçado."]
  ],
  pbl: [
    { titulo: "O computador do laboratório", cenario: "O laboratório vai comprar 20 computadores. Um fornecedor oferece CPU de clock mais alto e 2 núcleos; outro, clock menor e 6 núcleos, pelo mesmo preço.", passos: [["Que informações faltam para decidir bem?", "O uso (programação, navegador, máquinas virtuais), geração/arquitetura dos processadores, cache, quantidade de RAM, testes de desempenho (benchmarks)."], ["Faça uma recomendação justificada para um laboratório que roda IDE, navegador e máquina virtual.", "Mais núcleos (6) tendem a ser melhores para várias tarefas simultâneas e máquinas virtuais, desde que a geração seja equivalente e haja RAM suficiente."]] },
    { titulo: "O programa que nunca para", cenario: "Na CPU simulada, um colega escreveu: LOAD 5 / OUT / ADD 6 / JMP 1 / HALT, com 1 no endereço 5 e 1 no endereço 6. O programa não termina.", passos: [["Explique por que ele não termina.", "JMP 1 sempre volta ao OUT; não há condição de saída (JZ), e o HALT nunca é alcançado: laço infinito."], ["Proponha uma correção que conte de 1 até 5 e pare.", "Usar um contador que decresce de 5 até 0 com SUB e JZ para sair, como na contagem regressiva, mostrando um outro contador crescente."]] },
    { titulo: "Explicando para o vovô", cenario: "Seu avô pergunta como uma “caixinha” consegue fazer tanta coisa sozinha.", passos: [["Crie uma explicação com uma analogia do dia a dia, sem termos técnicos.", "Ex.: uma cozinha com receitas na estante, um chefe que lê e um cozinheiro que executa, repetindo bilhões de vezes por segundo."], ["Liste os termos técnicos que correspondem a cada parte da sua analogia.", "Memória, unidade de controle, ULA, registradores, barramentos, ciclo de instrução, clock."]] }
  ],
  resumo: [
    { t: "Von Neumann", itens: ["Programa e dados na mesma memória.", "CPU, memória, E/S e barramentos.", "Gargalo: a CPU espera a memória."] },
    { t: "CPU", itens: ["UC coordena; ULA calcula; registradores guardam o imediato.", "PC = próxima instrução; IR = instrução atual; ACC = resultado."] },
    { t: "Ciclo e desempenho", itens: ["Busca → decodificação → execução.", "Desvios criam decisões e laços.", "Clock, núcleos, cache e largura de barramento influem no desempenho."] }
  ],
  glossario: [["Arquitetura Harvard", "Memórias separadas para instruções e dados."], ["Barramento", "Conjunto de linhas que transporta sinais entre componentes."], ["Acumulador", "Registrador que guarda o resultado da ULA."], ["Desvio (jump)", "Instrução que altera o PC."], ["Núcleo", "Unidade de processamento independente dentro do chip."], ["Hertz", "Ciclos por segundo."], ["Instrução", "Ordem elementar que a CPU sabe executar."], ["Linguagem de máquina", "Instruções em binário que a CPU entende."]]
});
