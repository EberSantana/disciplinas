FSI.modulo({
  n: 3, unidade: "Memórias", nome: "Hierarquia de memória", titulo: "Rápida, grande ou barata? A hierarquia de memória", duracao: "6 h",
  resumoCurto: "Registradores, cache, RAM, ROM, SSD e HD: velocidade, capacidade, custo e volatilidade, o princípio da localidade e o funcionamento da cache.",
  analogia: { titulo: "A mesa, a estante e o depósito", txt: "<p>Quando você estuda, o que está usando agora fica <b>na mesa</b>: pouco espaço, mas ao alcance da mão. Os livros do semestre ficam <b>na estante</b> do quarto: cabe mais, mas é preciso levantar. As caixas antigas ficam <b>no depósito</b>: cabe tudo, mas buscar algo leva tempo.</p><p>O computador organiza a memória do mesmo jeito: <b>registradores e cache</b> são a mesa, a <b>RAM</b> é a estante e o <b>SSD/HD</b> é o depósito. Como você tende a voltar ao mesmo livro várias vezes, deixá-lo na mesa poupa viagens — é o <b>princípio da localidade</b>, que faz a cache funcionar.</p>" },
  chave: [
    "Não existe memória ao mesmo tempo <b>rápida, grande e barata</b>: por isso há uma <b>hierarquia</b>.",
    "Do topo para a base: <b>registradores → cache (L1, L2, L3) → RAM → SSD/HD → mídias externas e nuvem</b>.",
    "Subindo na pirâmide: mais <b>velocidade</b> e mais <b>custo por byte</b>; descendo: mais <b>capacidade</b>.",
    "<b>Volátil</b> perde os dados sem energia (registradores, cache, RAM); <b>não volátil</b> mantém (ROM/flash, SSD, HD).",
    "<b>Localidade temporal</b> (o que foi usado volta a ser usado) e <b>espacial</b> (o vizinho também será usado) fazem a cache acertar muito.",
    "<b>Acerto (hit)</b>: o dado está na cache; <b>falta (miss)</b>: é preciso buscar no nível de baixo."
  ],
  objetivos: ["Ordenar os níveis da <b>hierarquia de memória</b> por velocidade, capacidade e custo.", "Diferenciar memórias <b>voláteis</b> e <b>não voláteis</b>, <b>RAM</b> e <b>ROM</b>, <b>SSD</b> e <b>HD</b>.", "Explicar o <b>princípio da localidade</b> e o funcionamento da <b>cache</b>.", "Calcular o <b>tempo médio de acesso</b> com cache."],
  licoes: [
    { t: "Por que uma hierarquia?", txt: "<p>O processador executa uma instrução em fração de nanossegundo, mas a RAM leva dezenas de nanossegundos para responder e um HD, milissegundos — milhões de vezes mais. Memórias muito rápidas são caras e pequenas; memórias grandes são lentas. A solução é combinar níveis: o que está sendo usado agora fica perto da CPU, o resto fica mais longe.</p>" },
    { t: "Os níveis", txt: "<p>Do mais rápido ao mais lento:</p>", pontos: ["<b>Registradores:</b> dentro da CPU, poucos bytes, acesso em um ciclo.", "<b>Cache L1, L2, L3:</b> memória SRAM dentro do processador; de dezenas de KB (L1) a dezenas de MB (L3).", "<b>Memória principal (RAM):</b> DRAM nos pentes de memória; gigabytes; guarda programas e dados em uso.", "<b>Armazenamento secundário:</b> SSD (flash, sem partes móveis) e HD (discos magnéticos girando); centenas de GB a vários TB.", "<b>Terciário:</b> pen drives, discos externos, fitas de backup e nuvem."] },
    { t: "Voláteis e não voláteis; RAM e ROM", txt: "<p>Memória <b>volátil</b> perde o conteúdo quando a energia acaba — por isso salvamos o trabalho no disco. <b>RAM</b> (memória de acesso aleatório) é volátil e de leitura e escrita. <b>ROM</b> (memória somente de leitura) é não volátil; hoje é quase sempre <b>flash</b> regravável, onde fica o <b>firmware</b> da placa-mãe (BIOS/UEFI), que dá a partida no computador.</p>", pontos: ["<b>SRAM:</b> estática, muito rápida, cara; usada na cache.", "<b>DRAM:</b> dinâmica, precisa ser recarregada (refresh) milhares de vezes por segundo; mais densa e barata; usada na RAM (DDR4, DDR5).", "<b>SSD × HD:</b> o SSD não tem partes móveis, é muito mais rápido e resistente a impactos; o HD ainda oferece mais capacidade por real."] },
    { t: "Localidade e cache", txt: "<p>Programas não acessam a memória ao acaso:</p>", pontos: ["<b>Localidade temporal:</b> um dado ou instrução usado agora tende a ser usado de novo em breve (ex.: variáveis de um laço).", "<b>Localidade espacial:</b> endereços vizinhos tendem a ser usados em seguida (ex.: percorrer um vetor).", "A cache aproveita isso guardando cópias do que foi usado recentemente e trazendo <b>blocos</b> inteiros (os vizinhos juntos).", "Quando a cache lota, é preciso escolher quem sai: políticas como <b>FIFO</b> e <b>LRU</b> (a menos usada recentemente).", "A <b>taxa de acerto</b> costuma passar de 90%, e por isso a memória “parece” quase tão rápida quanto a cache."] },
    { t: "Tempo médio de acesso", txt: "<p>Com uma cache, o tempo médio de acesso pode ser estimado por:</p><p><b>Tm = h × Tcache + (1 − h) × TRAM</b></p><p>em que <i>h</i> é a taxa de acerto. Exemplo: cache de 2 ns, RAM de 60 ns e 95% de acertos: 0,95 × 2 + 0,05 × 60 = 1,9 + 3 = <b>4,9 ns</b> — muito mais perto da cache que da RAM.</p>" }
  ],
  termos: [["Hierarquia de memória", "Níveis que equilibram velocidade, capacidade e custo."], ["Cache", "Memória rápida que guarda cópias do que é usado com frequência."], ["Volátil", "Perde os dados sem energia."], ["ROM / firmware", "Memória não volátil com o programa de partida."], ["Localidade", "Tendência de reusar o mesmo dado e os vizinhos."], ["Taxa de acerto", "Fração dos acessos encontrados na cache."]],
  visuais: [
    { tipo: "camadas", id: "piramide", titulo: "A pirâmide da memória", forma: "piramide", h: 400, camadas: [
      { t: "Registradores", d: "Dentro da CPU; bytes; ~1 ciclo.", ex: "PC, IR, acumulador" },
      { t: "Cache L1 · L2 · L3", d: "SRAM no processador; KB a dezenas de MB; poucos ns.", ex: "L3 de 32 MB" },
      { t: "RAM (DRAM)", d: "Pentes de memória; GB; dezenas de ns; volátil.", ex: "16 GB DDR5" },
      { t: "SSD / HD", d: "Armazenamento secundário; centenas de GB a TB; microssegundos (SSD) a milissegundos (HD); não volátil.", ex: "SSD NVMe de 1 TB" },
      { t: "Externos e nuvem", d: "Pen drive, disco externo, fita, nuvem; enorme e mais lento.", ex: "Backup na nuvem" }] },
    { tipo: "classificar", id: "jogo-vol", titulo: "Jogo: volátil ou não volátil?", cats: ["Volátil", "Não volátil"], itens: [["Registradores", 0], ["Cache L2", 0], ["Pente de RAM DDR4", 0], ["Chip do firmware UEFI", 1], ["SSD", 1], ["HD", 1], ["Pen drive", 1], ["DRAM que precisa de refresh", 0]] },
    { tipo: "rede", id: "loc", titulo: "Por que a cache acerta tanto?", h: 360, nos: [
      { id: "c", x: 360, y: 60, t: "Cache", d: "Guarda cópias perto da CPU." },
      { id: "t", x: 170, y: 190, t: "Localidade\ntemporal", d: "O que foi usado agora volta a ser usado: variáveis de um laço, instruções repetidas." },
      { id: "e", x: 550, y: 190, t: "Localidade\nespacial", d: "Vizinhos também serão usados: elementos seguintes de um vetor, próxima instrução." },
      { id: "h", x: 360, y: 310, t: "Alta taxa\nde acerto", d: "Mais de 90% dos acessos encontrados na cache." }],
      liga: [["t", "c"], ["e", "c"], ["c", "h"]] }
  ],
  lab: {
    intro: "Escolha a memória certa para cada situação de um técnico de informática. Depois, simule uma cache pequena e veja como a política de substituição muda a quantidade de faltas.",
    sims: [
      { tipo: "cenarios", titulo: "Técnico de hardware: qual memória resolve?", cfg: { id: "mem", rotulo: "Chamado", medidor: { nome: "Satisfação dos clientes", ini: 50 }, itens: [
        { t: "Um estudante abre 40 abas do navegador e o computador fica lento, com o disco trabalhando sem parar.", ops: [["Aumentar a RAM", true, "Faltou memória principal; o sistema passou a usar o disco como extensão (swap)."], ["Trocar o processador", false, "O sintoma aponta falta de RAM, não de CPU."], ["Aumentar a cache L3", false, "Não é algo que se troca, e o gargalo é a RAM."]] },
        { t: "Um notebook antigo com HD demora 3 minutos para ligar.", ops: [["Trocar o HD por um SSD", true, "O SSD lê os arquivos do sistema muito mais rápido."], ["Colocar mais um pente de RAM", false, "Ajuda depois de ligado, mas a lentidão na partida vem do disco."], ["Atualizar o firmware", false, "Raramente resolve lentidão de disco."]] },
        { t: "Uma fotógrafa precisa guardar 6 TB de fotos antigas gastando pouco.", ops: [["HD de grande capacidade (e um backup)", true, "Melhor custo por terabyte para arquivo que é pouco acessado."], ["Mais RAM", false, "RAM é volátil e caríssima por GB."], ["SSD NVMe de 6 TB", false, "Rápido, mas bem mais caro para dados que quase não são abertos."]] },
        { t: "A luz acabou e o aluno perdeu o texto que não tinha salvo.", ops: [["O texto estava só na RAM, que é volátil", true, "Salvar grava no disco, que não é volátil."], ["O SSD apagou o texto", false, "O que está no SSD sobrevive à falta de energia."], ["A cache corrompeu o disco", false, "A cache só guarda cópias temporárias."]] },
        { t: "O computador nem chega a mostrar o logotipo e o técnico desconfia do programa que dá a partida.", ops: [["Firmware (BIOS/UEFI) na memória flash da placa-mãe", true, "É a memória não volátil com o programa de inicialização."], ["Registradores da CPU", false, "Não guardam programas de forma permanente."], ["Arquivo de paginação no disco", false, "Só é usado depois que o sistema operacional carrega."]] },
        { t: "Um jogo tem um laço que repete as mesmas contas milhões de vezes sobre o mesmo vetor.", ops: [["A cache vai acertar quase sempre (localidade)", true, "Temporal e espacial ao mesmo tempo: o cenário ideal para a cache."], ["Cada acesso irá ao SSD", false, "Os dados em uso ficam na RAM e na cache."], ["A cache não ajuda em laços", false, "Laços são exatamente onde ela mais ajuda."]] }] } },
      { tipo: "substituicao", titulo: "Cache com poucas linhas: quem sai quando lota?", instr: "Cada número é um bloco de memória pedido pela CPU; os “frames” são as linhas da cache. Compare FIFO, LRU e Ótimo.", cfg: { id: "cache", frames: 3, refs: "1 2 3 1 4 1 2 5 1 2 3 4 5" } }
    ],
    missoes: [
      { id: "m1", t: "Resolva 3 chamados corretamente", ev: "mem:acertos:3" },
      { id: "m2", t: "Deixe a satisfação dos clientes em 80% ou mais", ev: "mem:medidor80" },
      { id: "m3", t: "Atenda todos os chamados", ev: "mem:fim" },
      { id: "m4", t: "Simule a cache com LRU", ev: "cache:lru" },
      { id: "m5", t: "Compare as três políticas de substituição", ev: "cache:comparou" }
    ],
    guiados: [
      { titulo: "Tempo médio de acesso com cache", txt: "<p>Cache: <b>2 ns</b>. RAM: <b>60 ns</b>. Taxa de acerto: <b>90%</b>. Use Tm = h × Tcache + (1 − h) × TRAM.</p>", passos: [
        { p: "Parcela dos acertos (0,9 × 2), em ns", r: 1.8, tol: 0.01, un: "ns", dica: "0,9 × 2.", expl: "1,8 ns." },
        { p: "Parcela das faltas (0,1 × 60), em ns", r: 6, un: "ns", dica: "0,1 × 60.", expl: "6 ns." },
        { p: "Tempo médio de acesso, em ns", r: 7.8, tol: 0.01, un: "ns", dica: "Some as duas parcelas.", expl: "7,8 ns, contra 60 ns sem cache: quase 8 vezes mais rápido." },
        { p: "Se a taxa de acerto subir para 98%, qual o novo tempo médio? (duas casas decimais)", r: 3.16, tol: 0.01, un: "ns", dica: "0,98 × 2 + 0,02 × 60.", expl: "1,96 + 1,2 = 3,16 ns: cada ponto de acerto conta muito." }] },
      { titulo: "Quanto cabe?", txt: "<p>Um computador tem <b>16 GB</b> de RAM (considere 1 GB = 1024 MB).</p>", passos: [
        { p: "Quantos MB são?", r: 16384, un: "MB", dica: "16 × 1024.", expl: "16.384 MB." },
        { p: "Quantas fotos de 4 MB cabem nessa RAM ao mesmo tempo?", r: 4096, un: "fotos", dica: "16.384 ÷ 4.", expl: "4.096 fotos — mas, sem energia, todas somem: a RAM é volátil." }] }
    ]
  },
  fc: [
    ["Por que existe uma hierarquia de memória?", "Porque não há memória rápida, grande e barata ao mesmo tempo; combinar níveis dá velocidade perto da CPU e capacidade longe dela."],
    ["Quais são os níveis da hierarquia, do mais rápido ao mais lento?", "Registradores, cache (L1, L2, L3), RAM, SSD/HD, armazenamento externo/nuvem."],
    ["O que significa memória volátil?", "Que perde o conteúdo quando a energia é desligada (ex.: RAM)."],
    ["Onde fica o firmware BIOS/UEFI?", "Numa memória não volátil (ROM/flash) da placa-mãe."],
    ["Qual a diferença entre SRAM e DRAM?", "SRAM é estática, rápida e cara (cache); DRAM precisa de refresh, é mais densa e barata (RAM)."],
    ["Por que o SSD é mais rápido que o HD?", "Usa memória flash, sem disco girando nem cabeça se movendo."],
    ["O que é localidade temporal?", "O que foi acessado recentemente tende a ser acessado de novo."],
    ["O que é localidade espacial?", "Endereços próximos aos acessados tendem a ser acessados em seguida."],
    ["O que é um acerto (hit) de cache?", "Quando o dado procurado já está na cache."],
    ["O que acontece numa falta (miss)?", "O bloco é buscado no nível de baixo (RAM) e copiado para a cache."],
    ["O que faz a política LRU?", "Quando a cache lota, retira o bloco usado há mais tempo."],
    ["Qual a fórmula do tempo médio de acesso com cache?", "Tm = h × Tcache + (1 − h) × TRAM."]
  ],
  vf: [
    ["A memória cache fica no disco rígido.", false, "Fica dentro do processador (SRAM)."],
    ["Quanto mais perto da CPU, mais rápida e cara é a memória.", true, "É o princípio da pirâmide."],
    ["A RAM guarda os dados mesmo com o computador desligado.", false, "É volátil."],
    ["Um SSD é armazenamento não volátil.", true, "Os dados ficam gravados na flash sem energia."],
    ["A DRAM precisa ser recarregada periodicamente.", true, "O refresh evita que os capacitores percam a carga."],
    ["Percorrer um vetor em ordem aproveita a localidade espacial.", true, "Os elementos vizinhos chegam juntos no mesmo bloco."],
    ["Uma taxa de acerto de 95% significa que 95% dos acessos vão à RAM.", false, "95% são atendidos pela cache; só 5% vão à RAM."],
    ["Adicionar RAM pode reduzir o uso do disco como memória virtual.", true, "Com mais RAM, o sistema troca menos páginas com o disco."],
    ["O HD tem melhor custo por terabyte que o SSD.", true, "Por isso ainda é usado para arquivo e backup."],
    ["Registradores ficam nos pentes de memória.", false, "Ficam dentro da CPU."],
    ["A política FIFO retira o bloco que entrou primeiro na cache.", true, "Primeiro a entrar, primeiro a sair."],
    ["Salvar um arquivo significa copiá-lo da memória volátil para a não volátil.", true, "Do que está na RAM para o disco."]
  ],
  caderno: [
    ["Explique a analogia da mesa, da estante e do depósito.", "Mesa = registradores/cache (pouco espaço, acesso imediato); estante = RAM; depósito = SSD/HD (muito espaço, acesso lento). Deixar na mesa o que se usa sempre poupa viagens (localidade)."],
    ["Desenhe a pirâmide da memória e indique, com setas, onde aumentam velocidade, custo e capacidade.", "Para cima: velocidade e custo por byte; para baixo: capacidade."],
    ["Compare RAM e ROM em quatro aspectos.", "RAM: volátil, leitura e escrita, guarda programas em uso, GB. ROM/flash: não volátil, normalmente só leitura no uso comum, guarda firmware, poucos MB."],
    ["Compare SSD e HD: velocidade, partes móveis, custo por TB e uso indicado.", "SSD: muito rápido, sem partes móveis, mais caro por TB, ideal para sistema e programas. HD: lento, com disco girando, mais barato por TB, ideal para arquivo e backup."],
    ["Dê um exemplo de localidade temporal e outro de espacial num programa.", "Temporal: a variável contador de um laço usada a cada repetição. Espacial: ler um vetor do primeiro ao último elemento."],
    ["Calcule o tempo médio com cache de 1 ns, RAM de 50 ns e 96% de acertos.", "0,96 × 1 + 0,04 × 50 = 0,96 + 2 = 2,96 ns."],
    ["Na sequência de blocos 1 2 3 1 4 1 2 com cache de 3 linhas e LRU, quais pedidos são faltas?", "1, 2, 3 (cache vazia), 4 (sai o 2), 2 (sai o 3): 5 faltas; os dois pedidos do 1 depois do início são acertos."],
    ["Por que um computador com 4 GB de RAM fica lento ao abrir muitos programas?", "A RAM lota e o sistema passa a usar o disco (swap/paginação), milhares de vezes mais lento."],
    ["Explique por que os pentes de memória DDR5 não guardam o sistema operacional instalado.", "São voláteis; o sistema fica instalado no SSD/HD e é carregado para a RAM a cada inicialização."],
    ["Monte uma configuração (RAM e armazenamento) para um aluno de programação com orçamento limitado e justifique.", "Ex.: 16 GB de RAM e SSD de 512 GB: RAM para IDE, navegador e máquina virtual; SSD para iniciar e compilar rápido; HD externo para arquivos grandes, se precisar."]
  ],
  pbl: [
    { titulo: "Upgrade com R$ 400", cenario: "A secretaria da escola tem um computador com HD e 4 GB de RAM que demora a ligar e trava com planilha e navegador abertos. Há R$ 400 para melhorar.", passos: [["Diagnostique os dois gargalos usando os conceitos do módulo.", "Partida lenta: HD (armazenamento lento). Travamentos com vários programas: pouca RAM, uso do disco como memória virtual."], ["Proponha a melhor combinação dentro do orçamento e justifique a prioridade.", "Priorizar o SSD (maior ganho percebido) e, se sobrar, completar a RAM para 8 GB; verificar compatibilidade da placa-mãe."]] },
    { titulo: "A cache do supermercado", cenario: "O dono de um mercado quer deixar no balcão os 20 produtos mais vendidos, em vez de buscar tudo no estoque dos fundos.", passos: [["Relacione a ideia com a cache e o princípio da localidade.", "O balcão é a cache: poucos itens perto do caixa; produtos muito vendidos são a localidade temporal; acertar = produto no balcão, faltar = ir ao estoque."], ["Proponha uma regra para trocar os produtos do balcão e diga a qual política ela se parece.", "Retirar o produto que está há mais tempo sem ser vendido: é a política LRU."]] },
    { titulo: "Perdi meu trabalho!", cenario: "Na véspera da entrega, a luz acabou e um aluno perdeu duas horas de trabalho no editor de texto.", passos: [["Explique tecnicamente por que o texto se perdeu.", "O texto estava só na RAM, que é volátil; não tinha sido gravado no disco."], ["Liste três medidas para que isso não aconteça de novo.", "Salvar com frequência, ativar o salvamento automático, usar nobreak e/ou um editor na nuvem que grava continuamente."]] }
  ],
  resumo: [
    { t: "Hierarquia", itens: ["Registradores → cache → RAM → SSD/HD → externos.", "Mais rápido e caro em cima; maior em baixo."] },
    { t: "Tipos", itens: ["Voláteis: registradores, cache, RAM.", "Não voláteis: flash/ROM, SSD, HD.", "SRAM (cache) × DRAM (RAM); SSD × HD."] },
    { t: "Cache", itens: ["Localidade temporal e espacial.", "Acerto × falta; políticas FIFO e LRU.", "Tm = h × Tcache + (1 − h) × TRAM."] }
  ],
  glossario: [["SRAM", "RAM estática, rápida, usada na cache."], ["DRAM", "RAM dinâmica, precisa de refresh."], ["DDR", "Padrão de módulos de RAM (DDR4, DDR5)."], ["Flash", "Memória não volátil regravável (SSD, pen drive, firmware)."], ["NVMe", "Interface rápida para SSDs."], ["Swap / paginação", "Uso do disco como extensão da RAM."], ["Bloco (linha) de cache", "Conjunto de bytes vizinhos copiados juntos."], ["Hit / miss", "Acerto / falta na cache."]]
});
