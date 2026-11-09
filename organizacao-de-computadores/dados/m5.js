FSI.modulo({
  n: 5, unidade: "Do hardware ao SO", nome: "Inicialização, interrupções e o sistema operacional", titulo: "Do botão liga à área de trabalho: firmware, boot, interrupções e drivers", duracao: "5 h",
  resumoCurto: "O que acontece ao ligar o computador (POST, UEFI, gerenciador de boot, kernel), interrupções e DMA, drivers, partições e sistemas de arquivos, e a ponte para a disciplina de Sistemas Operacionais.",
  analogia: { titulo: "Abrir a loja de manhã", txt: "<p>Antes de a loja abrir, o <b>vigia</b> acende as luzes e confere se portas, caixa e alarme funcionam: é o <b>POST</b> feito pelo firmware. Depois ele entrega a chave ao <b>gerente</b>, que sabe onde está tudo: é o <b>gerenciador de boot</b> encontrando o sistema. O gerente chama a <b>equipe</b> — o <b>kernel</b> e os <b>drivers</b> — e só então as portas se abrem para os clientes: a área de trabalho.</p><p>Durante o dia, quando um cliente toca a campainha do balcão, o atendente interrompe o que está fazendo e o atende: é uma <b>interrupção</b>. Sem ela, o atendente teria que olhar para o balcão a cada segundo.</p>" },
  chave: [
    "Ao ligar: <b>firmware UEFI/BIOS → POST → escolha do dispositivo de boot → gerenciador de boot → kernel → drivers e serviços → login</b>.",
    "O <b>POST</b> testa CPU, memória e vídeo; erros aparecem como bipes ou LEDs.",
    "<b>Interrupção</b>: sinal que faz a CPU pausar o que faz para atender um dispositivo; evita a espera ativa (polling).",
    "<b>DMA</b> permite que um dispositivo copie dados direto para a RAM sem ocupar a CPU a cada byte.",
    "O disco é dividido em <b>partições</b> (tabela <b>GPT</b> ou MBR) e cada uma recebe um <b>sistema de arquivos</b> (NTFS, ext4, FAT32/exFAT).",
    "O <b>sistema operacional</b> é a ponte entre o hardware e os programas: gerencia processos, memória, arquivos e E/S."
  ],
  objetivos: ["Descrever a <b>sequência de inicialização</b> de um computador.", "Explicar <b>interrupções</b>, <b>polling</b> e <b>DMA</b>.", "Diferenciar <b>BIOS</b> e <b>UEFI</b>, <b>MBR</b> e <b>GPT</b>.", "Relacionar <b>partições</b> e <b>sistemas de arquivos</b> ao uso de cada sistema.", "Reconhecer o papel do <b>sistema operacional</b> como gerente do hardware."],
  licoes: [
    { t: "Ligando o computador", txt: "<p>Quando você aperta o botão, a fonte estabiliza as tensões e a CPU começa a executar o programa gravado no chip de firmware da placa-mãe.</p>", pontos: ["<b>POST</b> (Power-On Self-Test): testa processador, memória, vídeo e teclado. Um erro grave gera <b>bipes</b> ou LEDs de diagnóstico.", "O firmware procura um <b>dispositivo de boot</b> na ordem configurada (SSD, pen drive, rede).", "O <b>gerenciador de boot</b> (Windows Boot Manager, GRUB) carrega o <b>kernel</b> do sistema operacional na RAM.", "O kernel inicia os <b>drivers</b> e os <b>serviços</b> e, por fim, mostra a tela de login."] },
    { t: "BIOS e UEFI", txt: "<p><b>BIOS</b> é o firmware tradicional, de 16 bits, com interface em texto e limitado a discos com tabela <b>MBR</b> (até 2 TB e 4 partições primárias). <b>UEFI</b> é o sucessor moderno: interface gráfica, suporte a discos <b>GPT</b> enormes, inicialização mais rápida e <b>Secure Boot</b>, que só permite carregar sistemas assinados digitalmente, dificultando malwares de inicialização.</p>" },
    { t: "Interrupções, polling e DMA", txt: "<p>Os dispositivos de E/S são muito mais lentos que a CPU. Há três formas de lidar com eles:</p>", pontos: ["<b>Polling (espera ativa):</b> a CPU pergunta ao dispositivo, repetidamente, se ele terminou. Desperdiça tempo.", "<b>Interrupção:</b> o dispositivo avisa quando termina; a CPU pausa o programa, executa a <b>rotina de tratamento</b> e depois retoma de onde parou.", "<b>DMA (acesso direto à memória):</b> o controlador copia blocos inteiros direto para a RAM e só interrompe a CPU no fim — ideal para discos e rede.", "Exemplos de interrupção: tecla pressionada, pacote de rede recebido, leitura de disco concluída, relógio do sistema (que permite a multitarefa)."] },
    { t: "Partições e sistemas de arquivos", txt: "<p>Antes de guardar arquivos, o disco é <b>particionado</b> e cada partição é <b>formatada</b> com um sistema de arquivos, que organiza os dados em pastas, nomes, permissões e blocos.</p>", pontos: ["<b>NTFS:</b> padrão do Windows; permissões, arquivos grandes, registro de alterações (journaling).", "<b>ext4:</b> padrão de muitas distribuições Linux.", "<b>FAT32:</b> compatível com quase tudo, mas limita arquivos a 4 GB.", "<b>exFAT:</b> para pen drives e cartões; sem o limite de 4 GB.", "Os fabricantes de disco medem em <b>potências de 10</b> (1 TB = 10¹² bytes) e o sistema mostra em <b>potências de 2</b> (GiB): por isso um disco de 1 TB aparece com cerca de 931 GB."] },
    { t: "A ponte para os sistemas operacionais", txt: "<p>Tudo o que você estudou — CPU, memória, E/S — precisa de um <b>gerente</b>. O sistema operacional decide qual programa usa a CPU (<b>processos e escalonamento</b>), quem ocupa cada parte da RAM (<b>gerência de memória</b>), como os dados ficam no disco (<b>sistema de arquivos</b>) e como conversar com cada dispositivo (<b>drivers e E/S</b>). Esses temas continuam na disciplina <b>Fundamentos de Sistemas Operacionais</b>, com simuladores de processos, escalonamento e memória.</p>" }
  ],
  termos: [["POST", "Autoteste do hardware ao ligar."], ["UEFI", "Firmware moderno que substitui a BIOS."], ["Gerenciador de boot", "Programa que carrega o kernel do SO."], ["Interrupção", "Aviso de um dispositivo que pausa a CPU."], ["DMA", "Cópia direta entre dispositivo e RAM."], ["Sistema de arquivos", "Organização dos dados numa partição."]],
  visuais: [
    { tipo: "sequencia", id: "boot", titulo: "Do botão liga à tela de login", atores: ["Fonte e\nfirmware", "Hardware", "Disco", "Sistema\noperacional"], passos: [
      { de: 0, para: 1, t: "POST", d: "O firmware testa CPU, RAM, vídeo e teclado." },
      { de: 1, para: 0, t: "Tudo certo", d: "Sem erros: nenhum bipe longo." },
      { de: 0, para: 2, t: "Procura o boot", d: "Segue a ordem de inicialização configurada no UEFI." },
      { de: 2, para: 0, t: "Gerenciador de boot", d: "Encontra o Windows Boot Manager ou o GRUB." },
      { de: 0, para: 3, t: "Carrega o kernel", d: "O núcleo do sistema vai para a RAM e assume o controle." },
      { de: 3, para: 1, t: "Inicia drivers", d: "Vídeo, disco, rede, USB: cada dispositivo ganha seu driver." },
      { de: 3, para: 3, t: "Serviços e login", d: "Serviços em segundo plano e, por fim, a tela de login." }] },
    { tipo: "classificar", id: "jogo-fs", titulo: "Jogo: qual sistema de arquivos?", cats: ["NTFS", "ext4", "exFAT", "FAT32"], itens: [["Disco do sistema Windows", 0], ["Partição raiz de um servidor Linux", 1], ["Cartão de memória para vídeos de 10 GB usado em várias câmeras", 2], ["Pen drive antigo que precisa abrir em qualquer aparelho, com arquivos pequenos", 3], ["Disco com permissões por usuário no Windows", 0], ["Pen drive para levar um vídeo de 6 GB entre Windows e Mac", 2]] },
    { tipo: "rede", id: "irq", titulo: "Três jeitos de falar com a E/S", h: 340, nos: [
      { id: "cpu", x: 360, y: 60, t: "CPU", d: "Muito mais rápida que qualquer dispositivo." },
      { id: "pol", x: 130, y: 230, t: "Polling", d: "A CPU pergunta sem parar: “terminou?”. Simples, mas desperdiça tempo." },
      { id: "int", x: 360, y: 230, t: "Interrupção", d: "O dispositivo avisa quando termina; a CPU atende e volta ao que fazia." },
      { id: "dma", x: 590, y: 230, t: "DMA", d: "O controlador copia blocos direto para a RAM e só avisa no fim." }],
      liga: [["cpu", "pol"], ["cpu", "int"], ["cpu", "dma"]] }
  ],
  lab: {
    intro: "Ponha em ordem a inicialização de um computador e depois trabalhe no suporte técnico resolvendo problemas de partida, disco e dispositivos.",
    sims: [
      { tipo: "linha", id: "lab-boot", titulo: "A partida, passo a passo", instr: "Percorra as etapas e depois resolva o desafio de ordenar.", ordenar: true, passos: [
        { t: "Botão liga", d: "A fonte estabiliza as tensões." },
        { t: "Firmware UEFI", d: "A CPU executa o programa do chip da placa-mãe." },
        { t: "POST", d: "Teste de CPU, RAM, vídeo e teclado." },
        { t: "Dispositivo de boot", d: "Segue a ordem configurada: SSD, pen drive, rede." },
        { t: "Gerenciador de boot", d: "Windows Boot Manager ou GRUB." },
        { t: "Kernel", d: "O núcleo do sistema é carregado na RAM." },
        { t: "Drivers e serviços", d: "Cada dispositivo ganha seu driver." },
        { t: "Login", d: "A área de trabalho fica pronta." }] },
      { tipo: "cenarios", titulo: "Suporte técnico: o computador não inicia direito", cfg: { id: "sup", rotulo: "Chamado", medidor: { nome: "Chamados resolvidos no prazo", ini: 50 }, itens: [
        { t: "Ao ligar, o PC dá vários bipes e não mostra imagem. Na véspera, alguém mexeu nos pentes de memória.", ops: [["Falha no POST: reencaixar ou testar a RAM", true, "Bipes indicam erro detectado pelo firmware antes do sistema."], ["Reinstalar o Windows", false, "O sistema nem chegou a ser carregado."], ["Trocar o mouse", false, "Sem relação."]] },
        { t: "A mensagem é “No bootable device”. O SSD aparece no UEFI, mas a ordem de boot começa pela rede.", ops: [["Ajustar a ordem de boot no UEFI para o SSD", true, "O firmware está procurando no lugar errado."], ["Trocar a fonte", false, "O computador liga normalmente."], ["Formatar o SSD", false, "Apagaria o sistema que está lá."]] },
        { t: "Ao tentar iniciar um pen drive de instalação antigo, o UEFI bloqueia por não ser assinado.", ops: [["É o Secure Boot: usar uma mídia assinada ou ajustar a configuração com cuidado", true, "O Secure Boot só aceita sistemas assinados digitalmente."], ["O pen drive tem vírus, com certeza", false, "Não necessariamente; é a verificação de assinatura."], ["A RAM está com defeito", false, "Sem relação."]] },
        { t: "Um aluno não consegue copiar um vídeo de 6 GB para o pen drive: “arquivo grande demais”, mas há espaço.", ops: [["O pen drive está em FAT32: formatar em exFAT (depois de salvar os dados)", true, "FAT32 limita cada arquivo a 4 GB."], ["O pen drive está cheio", false, "O enunciado diz que há espaço."], ["Trocar a porta USB", false, "O erro é do sistema de arquivos."]] },
        { t: "O cliente comprou um SSD de 1 TB e reclama que o Windows mostra só 931 GB.", ops: [["É a diferença entre TB (potência de 10) e GiB (potência de 2)", true, "10¹² bytes ÷ 2³⁰ ≈ 931 GiB: não falta nada."], ["O SSD é falsificado", false, "A diferença é exatamente a esperada."], ["O Windows reservou 69 GB para vírus", false, "Não existe isso."]] },
        { t: "Durante uma cópia grande de arquivos, a CPU continua livre para outras tarefas.", ops: [["Graças ao DMA, o controlador copia direto para a RAM", true, "A CPU só é avisada no fim, por interrupção."], ["Porque a CPU desliga durante a cópia", false, "A CPU continua trabalhando em outras tarefas."], ["Por causa do polling", false, "Polling ocuparia a CPU o tempo todo."]] }] } }
    ],
    missoes: [
      { id: "m1", t: "Percorra todas as etapas da partida", ev: "vis:lab-boot" },
      { id: "m2", t: "Ordene a partida corretamente", ev: "ord:lab-boot" },
      { id: "m3", t: "Resolva 3 chamados corretamente", ev: "sup:acertos:3" },
      { id: "m4", t: "Deixe os chamados no prazo em 80% ou mais", ev: "sup:medidor80" },
      { id: "m5", t: "Resolva todos os chamados", ev: "sup:fim" },
      { id: "m6", t: "Resolva todos os chamados sem errar", ev: "sup:perfeito" }
    ],
    guiados: [
      { titulo: "Por que meu disco “encolheu”?", txt: "<p>Um SSD vendido como <b>500 GB</b> tem 500 × 10⁹ bytes. O sistema mostra em GiB, em que 1 GiB = 2³⁰ = 1.073.741.824 bytes.</p>", passos: [
        { p: "Quantos GiB o sistema mostra? (uma casa decimal)", r: 465.7, tol: 0.1, un: "GiB", dica: "500.000.000.000 ÷ 1.073.741.824.", expl: "≈ 465,7 GiB: não falta nada, só muda a unidade." },
        { p: "Quantos GiB “somem” em relação ao número da caixa? (uma casa decimal)", r: 34.3, tol: 0.15, un: "GiB", dica: "500 − 465,7.", expl: "≈ 34,3: é só a diferença entre potências de 10 e de 2." }] },
      { titulo: "Polling ou interrupção?", txt: "<p>Uma CPU verifica um teclado por polling <b>1.000 vezes por segundo</b>, e cada verificação gasta <b>2 microssegundos</b>. O usuário aperta só <b>5 teclas por segundo</b>; com interrupção, cada tecla custa <b>3 microssegundos</b> de tratamento.</p>", passos: [
        { p: "Tempo gasto por segundo com polling (µs)", r: 2000, un: "µs", dica: "1.000 × 2.", expl: "2.000 µs por segundo, mesmo sem ninguém digitar." },
        { p: "Tempo gasto por segundo com interrupção (µs)", r: 15, un: "µs", dica: "5 × 3.", expl: "15 µs." },
        { p: "Quantas vezes o polling gasta mais? (uma casa decimal)", r: 133.3, tol: 0.1, un: "vezes", dica: "2.000 ÷ 15.", expl: "≈ 133 vezes: é por isso que os dispositivos avisam por interrupção." }] }
    ]
  },
  fc: [
    ["O que é o POST?", "O autoteste feito pelo firmware ao ligar: confere CPU, memória, vídeo e teclado."],
    ["O que indicam bipes ao ligar o computador?", "Um erro de hardware detectado pelo POST (ex.: memória ou vídeo)."],
    ["Qual a função do gerenciador de boot?", "Localizar e carregar o kernel do sistema operacional na RAM."],
    ["Cite duas vantagens da UEFI sobre a BIOS.", "Suporte a discos GPT grandes, Secure Boot, interface gráfica e partida mais rápida."],
    ["O que é Secure Boot?", "Recurso da UEFI que só deixa iniciar sistemas assinados digitalmente."],
    ["O que é uma interrupção?", "Um sinal de um dispositivo que faz a CPU pausar o que faz e executar uma rotina de tratamento."],
    ["O que é polling?", "A CPU perguntar repetidamente a um dispositivo se ele terminou: espera ativa."],
    ["Para que serve o DMA?", "Copiar blocos de dados entre dispositivo e RAM sem ocupar a CPU byte a byte."],
    ["Qual a diferença entre MBR e GPT?", "MBR: até 2 TB e 4 partições primárias; GPT: discos enormes e muitas partições, usado com UEFI."],
    ["Qual a limitação do FAT32?", "Arquivos de no máximo 4 GB."],
    ["Por que um disco de 1 TB aparece com cerca de 931 GB?", "O fabricante usa potências de 10 e o sistema mostra em potências de 2 (GiB)."],
    ["Quais recursos o sistema operacional gerencia?", "Processos (CPU), memória, arquivos e dispositivos de E/S."]
  ],
  vf: [
    ["O POST acontece depois que o Windows carrega.", false, "Acontece antes, ainda no firmware."],
    ["A ordem de boot é configurada no firmware UEFI/BIOS.", true, "Ela define onde procurar o sistema."],
    ["O GRUB é um gerenciador de boot comum no Linux.", true, "Ele carrega o kernel Linux."],
    ["O polling é mais eficiente que a interrupção para dispositivos lentos.", false, "Desperdiça tempo de CPU perguntando sem parar."],
    ["Com DMA, a CPU precisa copiar cada byte do disco para a RAM.", false, "O controlador faz a cópia; a CPU só é avisada no fim."],
    ["O relógio do sistema gera interrupções que permitem a multitarefa.", true, "A cada fatia de tempo o SO pode trocar de processo."],
    ["Discos GPT podem passar de 2 TB.", true, "O limite de 2 TB é do MBR."],
    ["FAT32 é a melhor escolha para guardar um arquivo de 8 GB.", false, "FAT32 limita a 4 GB; use exFAT ou NTFS."],
    ["NTFS oferece permissões por usuário.", true, "Por isso é o padrão do Windows."],
    ["O kernel é a primeira coisa executada ao apertar o botão liga.", false, "Antes vem o firmware e o POST."],
    ["Sem o driver adequado, um dispositivo pode não funcionar mesmo estando conectado.", true, "O SO precisa do driver para controlá-lo."],
    ["Um SSD de 1 TB mostrado como 931 GB está com defeito.", false, "É apenas a conversão de unidades."]
  ],
  caderno: [
    ["Descreva, em ordem, as etapas desde o botão liga até a tela de login.", "Fonte; firmware UEFI; POST; escolha do dispositivo de boot; gerenciador de boot; kernel na RAM; drivers e serviços; login."],
    ["Explique a analogia da loja (vigia, gerente, equipe) relacionando cada parte com a inicialização.", "Vigia = firmware/POST; gerente com a chave = gerenciador de boot; equipe = kernel e drivers; portas abertas = área de trabalho."],
    ["Compare BIOS e UEFI em três aspectos.", "BIOS: antiga, texto, MBR até 2 TB. UEFI: gráfica, GPT, Secure Boot, partida mais rápida."],
    ["Explique, com um exemplo do dia a dia, a diferença entre polling e interrupção.", "Polling: olhar o celular a cada minuto para ver se chegou mensagem. Interrupção: o celular vibra quando a mensagem chega."],
    ["Por que o DMA é importante para discos e placas de rede?", "Eles transferem grandes volumes; sem DMA a CPU ficaria ocupada copiando byte a byte."],
    ["Qual sistema de arquivos você usaria em: (a) disco do Windows; (b) servidor Linux; (c) pen drive para vídeos grandes entre vários sistemas?", "(a) NTFS; (b) ext4; (c) exFAT."],
    ["Calcule quantos GiB um disco de 2 TB mostra no sistema (uma casa decimal).", "2 × 10¹² ÷ 2³⁰ ≈ 1.862,6 GiB (cerca de 1,82 TiB)."],
    ["Um computador dá bipes e não mostra imagem. Liste três verificações.", "Reencaixar a RAM, testar um pente por vez, verificar a placa de vídeo e o cabo do monitor, consultar o manual para o código dos bipes."],
    ["O que é Secure Boot e por que ele ajuda na segurança?", "Só permite carregar sistemas assinados digitalmente, dificultando malwares que se instalam na inicialização (bootkits)."],
    ["Explique por que o sistema operacional é chamado de “ponte” entre o hardware e os programas.", "Porque esconde os detalhes do hardware e oferece serviços (arquivos, memória, processos, E/S) que os programas usam sem conhecer cada peça."]
  ],
  pbl: [
    { titulo: "Dual boot no laboratório", cenario: "O professor quer que os computadores do laboratório iniciem com Windows ou Linux, à escolha do aluno.", passos: [["Planeje as partições e os sistemas de arquivos.", "Disco GPT; partição de sistema EFI; partição NTFS para o Windows; partição ext4 para o Linux (e swap, se desejado); instalar primeiro o Windows e depois o Linux."], ["Quem vai permitir escolher o sistema na partida e qual cuidado tomar com o Secure Boot?", "O gerenciador de boot (GRUB ou o menu da UEFI); usar uma distribuição com suporte a Secure Boot ou ajustar a configuração de forma consciente."]] },
    { titulo: "O pen drive da feira de ciências", cenario: "Os alunos precisam levar vídeos de 5 a 7 GB num pen drive que será usado em notebooks Windows, Mac e numa TV.", passos: [["Que problema surgirá se o pen drive estiver em FAT32?", "Arquivos acima de 4 GB não poderão ser copiados."], ["Qual formato escolher e qual cuidado tomar antes de formatar?", "exFAT, compatível com os três; fazer cópia dos arquivos que já estão no pen drive, pois formatar apaga tudo."]] },
    { titulo: "Diagnóstico pelo som", cenario: "Três computadores do laboratório não iniciam: o primeiro dá bipes; o segundo mostra “No bootable device”; o terceiro chega ao logotipo do Windows e reinicia.", passos: [["Em que etapa da inicialização cada um está falhando?", "1º: POST (hardware, ex.: RAM). 2º: escolha do dispositivo de boot/gerenciador. 3º: carregamento do kernel ou de drivers/serviços."], ["Proponha uma ação para cada um.", "1º: reencaixar ou testar a RAM. 2º: conferir a ordem de boot e se o disco é detectado. 3º: modo de segurança, reparo de inicialização ou remoção de driver recém-instalado."]] }
  ],
  resumo: [
    { t: "Inicialização", itens: ["Firmware → POST → boot → kernel → drivers → login.", "UEFI, GPT e Secure Boot."] },
    { t: "E/S eficiente", itens: ["Polling desperdiça CPU.", "Interrupção avisa quando termina.", "DMA copia direto para a RAM."] },
    { t: "Disco e SO", itens: ["Partições e sistemas de arquivos (NTFS, ext4, exFAT, FAT32).", "TB × GiB.", "O SO gerencia processos, memória, arquivos e E/S."] }
  ],
  glossario: [["BIOS", "Firmware tradicional de inicialização."], ["MBR", "Tabela de partições antiga, até 2 TB."], ["GPT", "Tabela de partições moderna, usada com UEFI."], ["Kernel", "Núcleo do sistema operacional."], ["GRUB", "Gerenciador de boot do Linux."], ["Rotina de tratamento", "Código que atende uma interrupção."], ["Journaling", "Registro de alterações que protege o sistema de arquivos."], ["GiB", "Gibibyte: 2³⁰ bytes."]]
});
