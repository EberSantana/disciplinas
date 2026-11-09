FSI.modulo({
  n: 1, unidade: "História e numeração", nome: "Evolução e sistemas de numeração", titulo: "Do ábaco ao smartphone: a evolução dos computadores e a linguagem dos bits", duracao: "8 h",
  resumoCurto: "Como os computadores evoluíram, por que eles usam o sistema binário e como converter entre decimal, binário, octal e hexadecimal.",
  analogia: { titulo: "O painel de lâmpadas", txt: "<p>Imagine uma fileira de 8 lâmpadas, cada uma com um valor pintado embaixo: 128, 64, 32, 16, 8, 4, 2 e 1. Para mostrar o número 13, você acende as lâmpadas 8, 4 e 1 (8 + 4 + 1 = 13) e deixa as outras apagadas. Pronto: <b>00001101</b>. Isso é o <b>sistema binário</b>.</p><p>O computador faz exatamente isso, só que com bilhões de “lâmpadas” microscópicas — os transistores — que só têm dois estados: ligado (1) ou desligado (0). Com apenas dois símbolos, ele representa números, letras, cores, sons e vídeos.</p>" },
  chave: [
    "O computador evoluiu por <b>gerações</b>: válvulas, transistores, circuitos integrados e microprocessadores (VLSI).",
    "Circuitos eletrônicos trabalham com <b>dois estados</b> (ligado/desligado), por isso o computador usa o <b>binário</b>.",
    "<b>Bit</b> é um dígito binário; <b>byte</b> são 8 bits e representa 256 valores (0 a 255).",
    "Num sistema posicional, cada posição vale uma <b>potência da base</b>: 2ⁿ no binário, 8ⁿ no octal, 16ⁿ no hexadecimal.",
    "Decimal → binário: <b>divisões sucessivas por 2</b>, lendo os restos de baixo para cima.",
    "Cada dígito <b>hexadecimal</b> equivale a 4 bits; cada dígito <b>octal</b>, a 3 bits."
  ],
  objetivos: ["Descrever as <b>gerações</b> de computadores e o que mudou em cada uma.", "Explicar por que o computador usa o <b>sistema binário</b>.", "Converter números entre <b>decimal, binário, octal e hexadecimal</b>.", "Usar corretamente <b>bit, byte</b> e os múltiplos (KB, MB, GB, TB)."],
  licoes: [
    { t: "Antes da eletrônica", txt: "<p>A vontade de calcular mais rápido é antiga. O <b>ábaco</b> ajudava comerciantes há milhares de anos. No século XVII, Pascal construiu uma máquina de somar com engrenagens, e Leibniz uma que também multiplicava. No século XIX, <b>Charles Babbage</b> projetou a <b>máquina analítica</b>, com memória, unidade de cálculo e entrada por cartões perfurados — as ideias de um computador moderno. <b>Ada Lovelace</b> escreveu para ela aquele que é considerado o primeiro algoritmo da história.</p>" },
    { t: "As gerações dos computadores", txt: "<p>A história do computador eletrônico costuma ser dividida em gerações, de acordo com a tecnologia dos circuitos:</p>", pontos: ["<b>1ª geração (válvulas, c. 1940–1956):</b> máquinas enormes como o ENIAC, que ocupava uma sala, consumia muita energia e queimava válvulas com frequência.", "<b>2ª geração (transistores, c. 1956–1963):</b> o transistor substituiu a válvula: menor, mais barato, mais confiável e mais frio. Surgem linguagens como Fortran e COBOL.", "<b>3ª geração (circuitos integrados, c. 1964–1971):</b> vários transistores num único chip de silício; computadores menores e sistemas operacionais com multiprogramação.", "<b>4ª geração (microprocessadores, de 1971 em diante):</b> uma CPU inteira num chip. Nascem os computadores pessoais.", "<b>Hoje:</b> bilhões de transistores por chip, processadores com vários núcleos, smartphones, nuvem e chips especializados para inteligência artificial."] },
    { t: "Por que binário?", txt: "<p>Um transistor funciona como uma chave: deixa ou não deixa a corrente passar. Distinguir <b>dois</b> níveis de tensão é simples e resistente a ruído; distinguir dez níveis seria caro e sujeito a erro. Por isso o computador representa tudo com dois símbolos: <b>0</b> e <b>1</b>.</p><p>Um <b>bit</b> (binary digit) é um único 0 ou 1. Com <i>n</i> bits representamos 2<sup>n</sup> valores diferentes: 8 bits (um <b>byte</b>) dão 2<sup>8</sup> = 256 combinações, de 0 a 255.</p>" },
    { t: "Sistemas posicionais", txt: "<p>No decimal, o 3 de “352” vale 300 porque está na casa das centenas (10²). Todo sistema posicional funciona assim, só muda a base:</p>", pontos: ["<b>Decimal (base 10):</b> dígitos 0–9; posições valem 1, 10, 100, 1000…", "<b>Binário (base 2):</b> dígitos 0 e 1; posições valem 1, 2, 4, 8, 16, 32, 64, 128…", "<b>Octal (base 8):</b> dígitos 0–7; posições valem 1, 8, 64, 512…", "<b>Hexadecimal (base 16):</b> dígitos 0–9 e A–F (A=10 … F=15); posições valem 1, 16, 256, 4096…", "Exemplo: 1101₂ = 1×8 + 1×4 + 0×2 + 1×1 = <b>13</b>."] },
    { t: "Convertendo de um jeito para outro", txt: "<p>As conversões mais usadas:</p>", pontos: ["<b>Binário → decimal:</b> some os valores das posições que têm 1. 101010₂ = 32 + 8 + 2 = 42.", "<b>Decimal → binário:</b> divida por 2 até chegar a 0 e leia os restos de baixo para cima. 13 ÷ 2 = 6 r1; 6 ÷ 2 = 3 r0; 3 ÷ 2 = 1 r1; 1 ÷ 2 = 0 r1 → <b>1101</b>.", "<b>Binário ↔ hexadecimal:</b> agrupe de 4 em 4 bits a partir da direita. 1010 1111₂ = A F = <b>AF₁₆</b>.", "<b>Binário ↔ octal:</b> agrupe de 3 em 3 bits. 101 011₂ = 5 3 = <b>53₈</b>.", "O hexadecimal aparece em cores da web (#FF0000), endereços MAC e endereços de memória, porque é um jeito curto de escrever binário."] },
    { t: "Bits, bytes e múltiplos", txt: "<p>Armazenamento é medido em bytes. Na memória e nos sistemas operacionais, os múltiplos costumam usar potências de 2: 1 KB = 1024 bytes, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB (o padrão IEC chama esses valores de KiB, MiB, GiB). Fabricantes de discos usam potências de 10 (1 GB = 1.000.000.000 bytes) — por isso um disco de “1 TB” aparece com cerca de 931 GB no Windows.</p><p>Velocidade de rede é medida em <b>bits</b> por segundo: 100 Mbps são cerca de 12,5 MB/s.</p>" }
  ],
  termos: [["Bit", "Dígito binário: 0 ou 1."], ["Byte", "Conjunto de 8 bits; 256 valores."], ["Base", "Quantidade de símbolos de um sistema numérico."], ["Hexadecimal", "Base 16: 0–9 e A–F."], ["Transistor", "Chave eletrônica que substituiu a válvula."], ["Circuito integrado", "Muitos transistores num único chip."]],
  visuais: [
    { tipo: "linha", id: "geracoes", titulo: "Linha do tempo da computação", ordenar: true, passos: [
      { t: "Ábaco e máquinas mecânicas", d: "Do ábaco às calculadoras de engrenagens de Pascal e Leibniz (século XVII)." },
      { t: "Babbage e Ada Lovelace (século XIX)", d: "Máquina analítica com memória e cartões perfurados; o primeiro algoritmo." },
      { t: "1ª geração · válvulas", d: "ENIAC (1946): 30 toneladas, milhares de válvulas, programado religando cabos." },
      { t: "2ª geração · transistores", d: "Máquinas menores e confiáveis; Fortran e COBOL." },
      { t: "3ª geração · circuitos integrados", d: "Vários transistores num chip; multiprogramação." },
      { t: "4ª geração · microprocessador", d: "Intel 4004 (1971): a CPU num chip; nascem os PCs." },
      { t: "Hoje · multinúcleo, móveis e nuvem", d: "Bilhões de transistores, smartphones e chips para IA." }] },
    { tipo: "camadas", id: "posicoes", titulo: "Quanto vale cada posição (8 bits)", forma: "pilha", h: 360, camadas: [
      { t: "Bit 7 = 128", d: "2⁷. O bit mais significativo de um byte.", ex: "10000000 = 128" },
      { t: "Bit 6 = 64 · Bit 5 = 32", d: "2⁶ e 2⁵.", ex: "01100000 = 96" },
      { t: "Bit 4 = 16", d: "2⁴. Começa aqui o segundo dígito hexadecimal (nibble alto: bits 7 a 4).", ex: "00010000 = 16 = 0x10" },
      { t: "Bit 3 = 8 · Bit 2 = 4", d: "2³ e 2².", ex: "00001100 = 12 = 0xC" },
      { t: "Bit 1 = 2 · Bit 0 = 1", d: "2¹ e 2⁰. O bit 0 diz se o número é ímpar.", ex: "00000011 = 3" }] },
    { tipo: "classificar", id: "jogo-ger", titulo: "Jogo: em qual geração?", cats: ["Válvulas", "Transistores", "Circuitos integrados", "Microprocessador"], itens: [["ENIAC ocupando uma sala inteira", 0], ["Válvulas queimando com frequência", 0], ["Fortran e COBOL se popularizam", 1], ["Chave eletrônica menor e mais fria substitui a válvula", 1], ["Vários transistores gravados num único chip", 2], ["Sistemas com multiprogramação", 2], ["Intel 4004, a CPU num chip", 3], ["Computador pessoal na mesa de casa", 3]] }
  ],
  lab: {
    intro: "Ligue e desligue bits e veja o número mudar em quatro bases ao mesmo tempo. Depois resolva os desafios de montagem e ponha a história da computação em ordem.",
    sims: [
      { tipo: "bases", titulo: "Painel de bits: decimal, binário, octal e hexadecimal", cfg: { id: "bits", bits: 8, alvos: [
        { v: 13, como: "dec", dica: "8 + 4 + 1.", expl: "13 = 00001101." },
        { v: 255, como: "dec", dica: "Ligue tudo.", expl: "255 = 11111111 = 0xFF: o maior valor de um byte." },
        { v: 42, como: "bin", expl: "00101010 = 32 + 8 + 2 = 42." },
        { v: 0x2F, como: "hex", dica: "2 = 0010 e F = 1111.", expl: "0x2F = 0010 1111 = 47." },
        { v: 64, como: "oct", dica: "100 em octal = 1 × 64.", expl: "100₈ = 64 = 01000000." },
        { v: 200, como: "dec", dica: "128 + 64 + 8.", expl: "200 = 11001000 = 0xC8." }] } },
      { tipo: "linha", id: "lab-hist", titulo: "Ponha a história em ordem", instr: "Percorra as etapas e depois resolva o desafio de ordenar.", ordenar: true, passos: [
        { t: "Ábaco", d: "Cálculo manual com contas." },
        { t: "Máquina analítica", d: "Babbage e Ada Lovelace." },
        { t: "Válvulas", d: "ENIAC." },
        { t: "Transistores", d: "Menores e confiáveis." },
        { t: "Circuitos integrados", d: "Vários transistores num chip." },
        { t: "Microprocessador", d: "A CPU num chip." }] }
    ],
    missoes: [
      { id: "m1", t: "Ligue o seu primeiro bit", ev: "bits:bit" },
      { id: "m2", t: "Digite um decimal e veja as conversões", ev: "bits:digitou" },
      { id: "m3", t: "Vença 3 desafios de montagem", ev: "bits:alvo:3" },
      { id: "m4", t: "Vença todos os desafios de montagem", ev: "bits:todos" },
      { id: "m5", t: "Veja todas as etapas da história", ev: "vis:lab-hist" },
      { id: "m6", t: "Ordene a história corretamente", ev: "ord:lab-hist" }
    ],
    guiados: [
      { titulo: "Decimal para binário passo a passo", txt: "<p>Converta <b>37</b> para binário usando divisões sucessivas por 2.</p>", passos: [
        { p: "Resto de 37 ÷ 2", r: 1, dica: "37 = 2 × 18 + ?", expl: "37 ÷ 2 = 18, resto 1." },
        { p: "Quociente de 37 ÷ 2", r: 18, dica: "Quantas vezes o 2 cabe em 37?", expl: "18." },
        { p: "Continue dividindo até o fim. Qual é 37 em binário? (só 0 e 1)", r: 100101, dica: "Restos: 1, 0, 1, 0, 0, 1 — leia de baixo para cima.", expl: "37 = 100101₂ = 32 + 4 + 1." }] },
      { titulo: "Hexadecimal e octal", txt: "<p>Considere o binário <b>11010110</b>.</p>", passos: [
        { p: "Valor decimal", r: 214, dica: "128 + 64 + 16 + 4 + 2.", expl: "214." },
        { p: "Valor do primeiro grupo de 4 bits (1101) em decimal", r: 13, dica: "8 + 4 + 1.", expl: "13, que em hexadecimal é D." },
        { p: "Agrupando de 3 em 3 a partir da direita (11 010 110), qual é o número em octal?", r: 326, dica: "11 = 3, 010 = 2, 110 = 6.", expl: "326₈. Em hexadecimal, D6." }] }
    ]
  },
  fc: [
    ["O que é um bit?", "Um dígito binário: 0 ou 1. É a menor unidade de informação do computador."],
    ["Quantos bits tem um byte e quantos valores ele representa?", "8 bits; 2⁸ = 256 valores (0 a 255)."],
    ["Por que o computador usa o binário?", "Os circuitos têm dois estados estáveis (ligado/desligado), fáceis de distinguir e resistentes a ruído."],
    ["Qual tecnologia marca a 1ª geração de computadores?", "As válvulas (ex.: ENIAC)."],
    ["O que o transistor trouxe para a 2ª geração?", "Máquinas menores, mais baratas, mais confiáveis e que esquentavam menos que as de válvulas."],
    ["O que é um circuito integrado?", "Um chip de silício com muitos transistores e ligações gravados juntos (3ª geração)."],
    ["O que caracteriza a 4ª geração?", "O microprocessador: toda a CPU num único chip, que permitiu o computador pessoal."],
    ["Quem é considerada a primeira programadora?", "Ada Lovelace, que escreveu um algoritmo para a máquina analítica de Babbage."],
    ["Quanto vale 1010₂ em decimal?", "10 (8 + 2)."],
    ["Quais símbolos o hexadecimal usa?", "0 a 9 e A a F (A = 10, B = 11, C = 12, D = 13, E = 14, F = 15)."],
    ["Quantos bits equivalem a um dígito hexadecimal? E a um octal?", "4 bits por dígito hexadecimal; 3 bits por dígito octal."],
    ["Quantos bytes tem 1 KB nas medidas de memória?", "1024 bytes (2¹⁰)."]
  ],
  vf: [
    ["O ENIAC usava transistores.", false, "Usava válvulas; é da 1ª geração."],
    ["Com 4 bits é possível representar 16 valores diferentes.", true, "2⁴ = 16 (de 0 a 15)."],
    ["O número binário 1111 vale 15 em decimal.", true, "8 + 4 + 2 + 1 = 15."],
    ["No hexadecimal, a letra F vale 16.", false, "F vale 15; o 16 é escrito 10₁₆."],
    ["Para converter decimal em binário lemos os restos das divisões de cima para baixo.", false, "Lemos de baixo para cima: o último resto é o bit mais significativo."],
    ["Um dígito octal pode ir de 0 a 8.", false, "Vai de 0 a 7: a base 8 tem oito símbolos."],
    ["O microprocessador colocou a CPU inteira num único chip.", true, "Marco da 4ª geração (Intel 4004, 1971)."],
    ["O hexadecimal é usado porque é um jeito compacto de escrever binário.", true, "Cada dígito hexadecimal resume 4 bits."],
    ["100 Mbps equivale a 100 megabytes por segundo.", false, "São megabits: cerca de 12,5 MB/s (divida por 8)."],
    ["A máquina analítica de Babbage já tinha ideia de memória e unidade de cálculo.", true, "Por isso ele é chamado de pai do computador."],
    ["Um disco vendido como 1 TB aparece com menos espaço no Windows porque está com defeito.", false, "O fabricante usa potências de 10 e o sistema, potências de 2: cerca de 931 GB."],
    ["O bit 0 de um número binário indica se ele é par ou ímpar.", true, "Se o bit 0 é 1, o número é ímpar."]
  ],
  caderno: [
    ["Explique, com suas palavras, a analogia do painel de lâmpadas.", "Cada lâmpada é um bit e tem um valor (128, 64, … 1). Acender algumas e somar os valores forma o número; o computador faz o mesmo com transistores ligados e desligados."],
    ["Monte uma tabela com as quatro gerações: tecnologia, exemplo e uma consequência.", "Válvulas (ENIAC; máquinas enormes e caras); transistores (IBM 1401; menores e confiáveis); circuitos integrados (IBM 360; multiprogramação); microprocessadores (PCs; computação pessoal)."],
    ["Converta 25 para binário mostrando as divisões.", "25÷2=12 r1; 12÷2=6 r0; 6÷2=3 r0; 3÷2=1 r1; 1÷2=0 r1 → 11001₂."],
    ["Converta 10110011₂ para decimal e para hexadecimal.", "128+32+16+2+1 = 179; 1011 0011 = B3₁₆."],
    ["Converta 0x3C para binário e decimal.", "3 = 0011, C = 1100 → 00111100₂ = 60."],
    ["Converta 57₈ para binário e decimal.", "5 = 101, 7 = 111 → 101111₂ = 47."],
    ["Por que seria difícil construir um computador decimal com transistores?", "Seria preciso distinguir dez níveis de tensão; pequenas variações causariam erros. Dois níveis são muito mais confiáveis e baratos."],
    ["Quantos valores diferentes cabem em 10 bits? E em 16 bits?", "2¹⁰ = 1024; 2¹⁶ = 65.536."],
    ["A cor #FF8000 é usada em sites. Quanto vale cada componente (vermelho, verde, azul) em decimal?", "FF = 255, 80 = 128, 00 = 0: muito vermelho, metade de verde, nada de azul (laranja)."],
    ["Um plano de internet de 300 Mbps baixa um arquivo de 1,5 GB em quanto tempo, aproximadamente (sem perdas)?", "300 Mbps ≈ 37,5 MB/s; 1,5 GB ≈ 1536 MB ÷ 37,5 ≈ 41 segundos (na prática, um pouco mais)."]
  ],
  pbl: [
    { titulo: "O pen drive “menor”", cenario: "Uma aluna comprou um pen drive de 64 GB e reclamou na loja: o Windows mostra só cerca de 59,6 GB.", passos: [["Explique por que isso acontece.", "O fabricante usa 1 GB = 10⁹ bytes; o Windows divide por 1024³. 64 × 10⁹ ÷ 1.073.741.824 ≈ 59,6 GB. Não há defeito nem fraude, só unidades diferentes."], ["Escreva uma resposta curta e educada que o vendedor poderia dar.", "Explicar que é o mesmo espaço medido de duas formas (potências de 10 × potências de 2), e que uma pequena parte também é usada pelo sistema de arquivos."]] },
    { titulo: "Mensagem secreta em binário", cenario: "No mural da sala apareceu: 01001001 01000110 01010011. Um colega disse que são letras.", passos: [["Converta cada byte para decimal.", "73, 70, 83."], ["Sabendo que na tabela ASCII A = 65, B = 66…, descubra a mensagem e explique como o computador guarda texto.", "73 = I, 70 = F, 83 = S → “IFS”. Cada caractere é guardado como um número (código), e o número como bits."]] },
    { titulo: "A cor da camisa do time", cenario: "O grêmio estudantil quer a cor exata da camisa do time no site da escola. O designer mandou RGB(0, 102, 51).", passos: [["Escreva essa cor em hexadecimal para usar no CSS.", "0 = 00, 102 = 66, 51 = 33 → #006633."], ["Explique por que cada componente de cor vai de 0 a 255.", "Cada componente usa 1 byte (8 bits), que representa 256 valores: 0 a 255."]] }
  ],
  resumo: [
    { t: "Evolução", itens: ["Mecânicos → válvulas → transistores → circuitos integrados → microprocessador.", "Cada geração: menor, mais rápida, mais barata e mais confiável."] },
    { t: "Binário", itens: ["Dois estados elétricos = 0 e 1.", "Bit é um dígito; byte são 8 bits (256 valores).", "Posições valem potências de 2."] },
    { t: "Conversões", itens: ["Decimal → binário: divisões por 2, restos de baixo para cima.", "Hexadecimal: grupos de 4 bits; octal: grupos de 3 bits.", "KB = 1024 bytes na memória; redes medem em bits por segundo."] }
  ],
  glossario: [["Válvula", "Componente da 1ª geração que controlava a corrente; grande e quente."], ["Transistor", "Chave eletrônica de estado sólido."], ["Circuito integrado", "Chip com muitos transistores."], ["Microprocessador", "CPU inteira num único chip."], ["Bit", "0 ou 1."], ["Byte", "8 bits."], ["Nibble", "4 bits; um dígito hexadecimal."], ["ASCII", "Tabela que associa caracteres a números."]]
});
