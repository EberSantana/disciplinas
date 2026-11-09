FSI.modulo({
  n: 4, unidade: "E/S e montagem", nome: "Entrada, saída, barramentos e montagem", titulo: "Ligando tudo: dispositivos de E/S, barramentos e montagem de um computador", duracao: "6 h",
  resumoCurto: "Dispositivos de entrada e saída, portas e conectores, barramentos e placa-mãe, fonte de alimentação, montagem passo a passo e manutenção básica.",
  analogia: { titulo: "Uma cidade e suas estradas", txt: "<p>Imagine o computador como uma cidade. A <b>CPU</b> é a prefeitura, a <b>RAM</b> é o arquivo que está aberto sobre as mesas, e os <b>dispositivos de entrada e saída</b> são as portas da cidade: por elas chegam pedidos (teclado, mouse, microfone) e saem respostas (monitor, impressora, caixa de som).</p><p>Tudo isso só funciona porque existem <b>estradas</b> ligando os lugares: são os <b>barramentos</b> da placa-mãe. Estradas largas e rápidas (PCIe, para a placa de vídeo e o SSD NVMe) e estradas mais simples (USB, para periféricos). E sem a <b>usina</b> — a fonte de alimentação — nenhuma luz acende.</p>" },
  chave: [
    "Dispositivos de <b>entrada</b> levam dados para o computador; de <b>saída</b> trazem resultados; alguns são <b>de entrada e saída</b> (tela sensível ao toque, SSD, placa de rede).",
    "A <b>placa-mãe</b> interliga tudo: soquete da CPU, slots de RAM, slots PCIe, conectores SATA/M.2, chipset e firmware.",
    "<b>Barramentos</b> transportam dados, endereços e sinais de controle; hoje predominam ligações seriais rápidas como <b>PCIe</b> e <b>USB</b>.",
    "A <b>fonte</b> converte a corrente da tomada (CA) em tensões contínuas (CC: 12 V, 5 V, 3,3 V) e precisa ter potência e qualidade adequadas.",
    "Montagem segura: <b>desligar e descarregar</b>, usar pulseira antiestática, conferir <b>compatibilidade</b>, encaixar sem forçar e organizar os cabos.",
    "Manutenção <b>preventiva</b> (limpeza, pasta térmica, backup) evita a <b>corretiva</b>."
  ],
  objetivos: ["Classificar dispositivos em <b>entrada</b>, <b>saída</b> e <b>entrada e saída</b>.", "Identificar os principais <b>componentes e conectores</b> da placa-mãe.", "Explicar o papel dos <b>barramentos</b> e comparar PCIe, SATA e USB.", "Descrever a <b>sequência segura de montagem</b> de um computador.", "Dimensionar a <b>fonte de alimentação</b> e planejar a <b>manutenção preventiva</b>."],
  licoes: [
    { t: "Entrada, saída e as duas coisas", txt: "<p>Na arquitetura de Von Neumann, o computador conversa com o mundo pelos dispositivos de <b>E/S</b> (entrada e saída).</p>", pontos: ["<b>Entrada:</b> teclado, mouse, microfone, câmera, scanner, leitor biométrico, sensores.", "<b>Saída:</b> monitor, impressora, caixas de som, projetor.", "<b>Entrada e saída:</b> tela sensível ao toque, SSD/HD e pen drive (gravam e leem), placa de rede, impressora multifuncional.", "Cada dispositivo tem um <b>controlador</b> (hardware) e um <b>driver</b> (software do sistema operacional) que sabe conversar com ele."] },
    { t: "A placa-mãe", txt: "<p>É a placa principal, onde tudo se encaixa:</p>", pontos: ["<b>Soquete</b> da CPU (precisa ser compatível com o processador: AM5, LGA1700…).", "<b>Slots de memória</b> (DIMM): o tipo precisa coincidir (DDR4 ou DDR5).", "<b>Slots PCIe</b> para placa de vídeo, rede e outras expansões.", "Conectores <b>M.2</b> (SSD NVMe) e <b>SATA</b> (SSD/HD de 2,5\" e 3,5\").", "<b>Chipset</b>, que coordena a comunicação, e o chip do <b>firmware UEFI/BIOS</b>.", "Painel traseiro: USB, rede (RJ-45), áudio, HDMI/DisplayPort; conectores do gabinete (botão liga, LEDs, USB frontal)."] },
    { t: "Barramentos", txt: "<p>Barramento é o caminho compartilhado por onde passam os sinais. Na teoria, há três tipos: <b>de dados</b> (o conteúdo), <b>de endereços</b> (onde ler ou gravar) e <b>de controle</b> (ler, gravar, interrupção, relógio). Na prática atual, as ligações são <b>seriais e ponto a ponto</b>:</p>", pontos: ["<b>PCIe:</b> o mais rápido; organizado em pistas (x1, x4, x16); usado por placas de vídeo e SSDs NVMe.", "<b>SATA:</b> para SSDs e HDs de 2,5\"/3,5\"; até cerca de 600 MB/s.", "<b>USB:</b> periféricos externos; versões e conectores (Tipo-A, Tipo-C) com velocidades diferentes.", "A <b>largura de banda</b> (quantos dados por segundo) define o gargalo: um SSD NVMe num slot lento perde desempenho."] },
    { t: "Fonte de alimentação", txt: "<p>A fonte transforma a corrente alternada da tomada em corrente contínua nas tensões que os componentes usam. Para escolher:</p>", pontos: ["Some o consumo dos componentes (CPU e placa de vídeo são os maiores) e deixe uma <b>folga de 30% a 50%</b>.", "Prefira fontes com <b>certificação de eficiência</b> (80 Plus): desperdiçam menos energia em calor.", "Confira os <b>conectores</b>: 24 pinos da placa-mãe, 8 pinos da CPU, PCIe da placa de vídeo, SATA.", "Uma fonte fraca ou de má qualidade causa desligamentos, travamentos e pode danificar componentes."] },
    { t: "Montagem passo a passo e manutenção", txt: "<p>Uma ordem segura e prática:</p>", pontos: ["1. Desligue tudo da tomada, use pulseira antiestática e trabalhe sobre superfície isolante.", "2. Na placa-mãe fora do gabinete: CPU no soquete (alinhando a marcação), pasta térmica e cooler.", "3. Encaixe os pentes de RAM nos slots indicados no manual e o SSD M.2.", "4. Fixe a placa-mãe no gabinete (com os espaçadores) e instale a fonte.", "5. Conecte os cabos de energia (24 e 8 pinos), a placa de vídeo e os discos SATA.", "6. Ligue os conectores do painel frontal, organize os cabos e faça o primeiro teste (POST) antes de fechar.", "<b>Manutenção preventiva:</b> limpeza da poeira, troca da pasta térmica, verificação de temperaturas, atualização de firmware e backup."] }
  ],
  termos: [["Dispositivo de E/S", "Equipamento que leva dados ao computador ou traz resultados."], ["Driver", "Programa que ensina o SO a usar um dispositivo."], ["Placa-mãe", "Placa que interliga CPU, memória e expansões."], ["Barramento", "Caminho por onde passam dados, endereços e controle."], ["PCIe", "Barramento serial rápido, organizado em pistas."], ["Fonte de alimentação", "Converte CA da tomada em CC para os componentes."]],
  visuais: [
    { tipo: "rede", id: "placa", titulo: "Mapa da placa-mãe", h: 420, nos: [
      { id: "cpu", x: 360, y: 70, t: "Soquete\nda CPU", d: "Onde o processador encaixa; precisa ser compatível (ex.: AM5, LGA1700)." },
      { id: "ram", x: 590, y: 70, t: "Slots\nde RAM", d: "DIMM DDR4 ou DDR5; o tipo deve coincidir com o da placa." },
      { id: "chip", x: 360, y: 220, t: "Chipset", d: "Coordena a comunicação entre CPU, discos, USB e expansões." },
      { id: "pcie", x: 130, y: 220, t: "Slots\nPCIe", d: "Placa de vídeo (x16), rede, captura; as pistas definem a banda." },
      { id: "m2", x: 590, y: 220, t: "M.2 / SATA", d: "M.2 para SSD NVMe (via PCIe); SATA para SSDs e HDs de 2,5\"/3,5\"." },
      { id: "fw", x: 130, y: 360, t: "Firmware\nUEFI", d: "Chip flash com o programa que testa e dá a partida no computador." },
      { id: "io", x: 590, y: 360, t: "Painel\ntraseiro", d: "USB, rede RJ-45, áudio, HDMI/DisplayPort." },
      { id: "pwr", x: 360, y: 360, t: "Energia\n24 + 8 pinos", d: "Cabos da fonte para a placa-mãe e para a CPU." }],
      liga: [["cpu", "ram"], ["cpu", "chip"], ["cpu", "pcie"], ["chip", "m2"], ["chip", "io"], ["chip", "fw"], ["pwr", "chip"]] },
    { tipo: "classificar", id: "jogo-es", titulo: "Jogo: entrada, saída ou as duas?", cats: ["Entrada", "Saída", "Entrada e saída"], itens: [["Teclado", 0], ["Microfone", 0], ["Leitor biométrico", 0], ["Monitor", 1], ["Impressora comum", 1], ["Caixa de som", 1], ["Tela sensível ao toque", 2], ["Pen drive", 2], ["Placa de rede", 2]] },
    { tipo: "camadas", id: "barr", titulo: "Do mais rápido ao mais lento: as ligações", forma: "pilha", h: 340, camadas: [
      { t: "PCIe x16", d: "Placa de vídeo; dezenas de GB/s.", ex: "GPU" },
      { t: "PCIe x4 (M.2 NVMe)", d: "SSD NVMe; alguns GB/s.", ex: "SSD de 1 TB" },
      { t: "SATA III", d: "SSD/HD de 2,5\" e 3,5\"; até ~600 MB/s.", ex: "HD de 2 TB" },
      { t: "USB", d: "Periféricos; de poucos MB/s (USB 2.0) a GB/s (USB 3.x/4).", ex: "Pen drive, mouse" }] }
  ],
  lab: {
    intro: "Monte um computador de verdade, na ordem certa e com segurança, e depois atenda os chamados da assistência técnica. Por fim, dimensione a fonte de um PC gamer.",
    sims: [
      { tipo: "linha", id: "lab-mont", titulo: "Bancada de montagem: ponha os passos em ordem", instr: "Percorra os passos e depois resolva o desafio de ordenar.", ordenar: true, passos: [
        { t: "Segurança", d: "Desligar da tomada, pulseira antiestática e superfície isolante." },
        { t: "CPU no soquete", d: "Alinhar a marcação e travar sem forçar." },
        { t: "Pasta térmica e cooler", d: "Camada fina de pasta e cooler bem fixado." },
        { t: "RAM e SSD M.2", d: "Pentes nos slots indicados no manual; SSD no conector M.2." },
        { t: "Placa-mãe no gabinete", d: "Sobre os espaçadores, alinhada ao painel traseiro." },
        { t: "Fonte e cabos", d: "24 pinos, 8 pinos da CPU, PCIe da placa de vídeo, SATA." },
        { t: "Painel frontal e teste", d: "Botão liga, LEDs, USB frontal; primeiro POST antes de fechar." }] },
      { tipo: "cenarios", titulo: "Assistência técnica: qual é o problema?", cfg: { id: "ass", rotulo: "Chamado", medidor: { nome: "Avaliação da assistência", ini: 50 }, itens: [
        { t: "O cliente comprou um pente DDR4, mas a placa-mãe dele só tem slots DDR5. O pente não encaixa.", ops: [["Incompatibilidade de tipo de memória: trocar por DDR5", true, "DDR4 e DDR5 têm chanfros diferentes de propósito."], ["Forçar o encaixe com cuidado", false, "Forçar quebra o slot ou o pente."], ["Atualizar o driver de vídeo", false, "Não tem relação com memória."]] },
        { t: "Depois de trocar a placa de vídeo por uma mais potente, o PC desliga sozinho quando o jogo começa.", ops: [["Fonte sem potência suficiente para a nova placa", true, "O pico de consumo da GPU passa do que a fonte entrega."], ["Falta de memória RAM", false, "Falta de RAM deixa lento, não desliga o PC."], ["Mouse com defeito", false, "Não causa desligamento."]] },
        { t: "O processador chega a 98 °C e o computador trava depois de alguns minutos.", ops: [["Superaquecimento: limpar o cooler e trocar a pasta térmica", true, "Manutenção preventiva resolve a maioria desses casos."], ["Trocar o teclado", false, "Sem relação."], ["Instalar mais programas", false, "Só aumentaria a carga."]] },
        { t: "O SSD NVMe novo está lento, igual a um SATA. Ele foi instalado num slot M.2 ligado só ao SATA.", ops: [["Gargalo do barramento: usar o slot M.2 com PCIe/NVMe", true, "A interface define a velocidade máxima."], ["O SSD veio com defeito, com certeza", false, "Primeiro verifique o barramento."], ["Aumentar a RAM", false, "Não muda a velocidade do disco."]] },
        { t: "A impressora nova não imprime: o Windows mostra “dispositivo desconhecido”.", ops: [["Instalar o driver correto do fabricante", true, "Sem driver, o SO não sabe conversar com o dispositivo."], ["Trocar a placa-mãe", false, "Exagero: é um problema de software."], ["Formatar o computador", false, "Desnecessário."]] },
        { t: "O computador da secretaria nunca foi limpo em 4 anos e está cheio de poeira.", ops: [["Fazer manutenção preventiva: limpeza, verificação de temperatura e backup", true, "Prevenir é mais barato que consertar."], ["Esperar quebrar para chamar o técnico", false, "Isso é manutenção corretiva, mais cara."], ["Lavar as peças com água", false, "Danifica os componentes."]] }] } }
    ],
    missoes: [
      { id: "m1", t: "Percorra todos os passos da montagem", ev: "vis:lab-mont" },
      { id: "m2", t: "Ponha a montagem na ordem certa", ev: "ord:lab-mont" },
      { id: "m3", t: "Resolva 3 chamados corretamente", ev: "ass:acertos:3" },
      { id: "m4", t: "Deixe a avaliação da assistência em 80% ou mais", ev: "ass:medidor80" },
      { id: "m5", t: "Atenda todos os chamados", ev: "ass:fim" },
      { id: "m6", t: "Atenda todos os chamados sem errar", ev: "ass:perfeito" }
    ],
    guiados: [
      { titulo: "Qual fonte comprar?", txt: "<p>Um PC tem processador de <b>125 W</b>, placa de vídeo de <b>220 W</b> e <b>75 W</b> para placa-mãe, memórias, SSD, ventoinhas e USB. Recomenda-se uma folga de <b>40%</b>.</p>", passos: [
        { p: "Consumo total estimado (W)", r: 420, un: "W", dica: "Some os três valores.", expl: "125 + 220 + 75 = 420 W." },
        { p: "Potência com 40% de folga (W)", r: 588, un: "W", dica: "420 × 1,4.", expl: "588 W." },
        { p: "Entre fontes de 500 W, 550 W, 650 W e 850 W, qual é a menor que atende? (digite o número)", r: 650, un: "W", dica: "A menor que seja maior ou igual a 588 W.", expl: "650 W: atende com folga sem pagar por potência que não será usada." }] },
      { titulo: "Quanto demora para copiar?", txt: "<p>Copiar um arquivo de vídeo de <b>12 GB</b> (considere 1 GB = 1000 MB).</p>", passos: [
        { p: "Num pen drive USB 2.0 a 30 MB/s, quantos segundos?", r: 400, un: "s", dica: "12.000 ÷ 30.", expl: "400 s, quase 7 minutos." },
        { p: "Num SSD SATA a 500 MB/s, quantos segundos?", r: 24, un: "s", dica: "12.000 ÷ 500.", expl: "24 s." },
        { p: "Num SSD NVMe a 3000 MB/s, quantos segundos?", r: 4, un: "s", dica: "12.000 ÷ 3.000.", expl: "4 s: o barramento faz toda a diferença." }] }
    ]
  },
  fc: [
    ["O que é um dispositivo de entrada? Dê dois exemplos.", "Leva dados para o computador: teclado, mouse, microfone, câmera."],
    ["O que é um dispositivo de saída? Dê dois exemplos.", "Apresenta resultados: monitor, impressora, caixa de som."],
    ["Por que um pen drive é de entrada e saída?", "Porque o computador lê e grava dados nele."],
    ["Para que serve um driver?", "É o software que permite ao sistema operacional controlar um dispositivo."],
    ["O que é o soquete da placa-mãe?", "O encaixe do processador; precisa ser compatível com o modelo da CPU."],
    ["Quais são os três tipos de barramento na teoria?", "Dados, endereços e controle."],
    ["Para que serve o PCIe?", "Ligar placas de vídeo, SSDs NVMe e outras expansões em alta velocidade."],
    ["Qual a diferença entre M.2 NVMe e SATA?", "NVMe usa PCIe e chega a GB/s; SATA chega a ~600 MB/s."],
    ["O que faz a fonte de alimentação?", "Converte a corrente alternada da tomada em tensões contínuas para os componentes."],
    ["Por que deixar folga na potência da fonte?", "Para suportar picos de consumo, trabalhar com mais eficiência e permitir upgrades."],
    ["Para que serve a pulseira antiestática?", "Descarregar a eletricidade estática do corpo e evitar danificar componentes."],
    ["Dê dois exemplos de manutenção preventiva.", "Limpeza da poeira e troca da pasta térmica (também backup e atualização de firmware)."]
  ],
  vf: [
    ["O monitor é um dispositivo de entrada.", false, "É de saída (a não ser que seja sensível ao toque)."],
    ["A tela sensível ao toque é de entrada e saída.", true, "Mostra imagens e recebe toques."],
    ["Qualquer pente de memória encaixa em qualquer placa-mãe.", false, "DDR4 e DDR5, por exemplo, são incompatíveis."],
    ["O PCIe é organizado em pistas, como x1, x4 e x16.", true, "Mais pistas, mais banda."],
    ["Um SSD NVMe ligado a uma interface SATA mantém toda a sua velocidade.", false, "O barramento limita a velocidade."],
    ["Sem driver, o sistema operacional pode não reconhecer um dispositivo.", true, "Aparece como dispositivo desconhecido."],
    ["A fonte converte corrente contínua em alternada.", false, "Converte alternada (tomada) em contínua."],
    ["A placa de vídeo costuma ser um dos componentes que mais consomem energia.", true, "Junto com o processador."],
    ["Pode-se montar um computador ligado na tomada, desde que com cuidado.", false, "Sempre desligue da tomada antes."],
    ["A pasta térmica melhora a transferência de calor entre a CPU e o cooler.", true, "Preenche as imperfeições entre as superfícies."],
    ["Manutenção corretiva é feita antes que o problema aconteça.", false, "Essa é a preventiva; a corretiva conserta depois da falha."],
    ["O chip do firmware UEFI fica na placa-mãe.", true, "É uma memória flash não volátil."]
  ],
  caderno: [
    ["Classifique em entrada, saída ou ambos: scanner, projetor, webcam, HD externo, fone de ouvido com microfone.", "Scanner: entrada. Projetor: saída. Webcam: entrada. HD externo: entrada e saída. Fone com microfone: entrada e saída."],
    ["Desenhe uma placa-mãe simplificada e indique soquete, slots de RAM, PCIe, M.2, SATA, chipset e conector de 24 pinos.", "Resposta pessoal; conferir se todos os itens aparecem e se a CPU está ligada diretamente à RAM e ao PCIe principal."],
    ["Explique a diferença entre barramento de dados, de endereços e de controle.", "Dados: o conteúdo transportado; endereços: onde ler ou gravar; controle: comandos e sinais (ler, gravar, relógio, interrupção)."],
    ["Por que um SSD NVMe é mais rápido que um SSD SATA, se ambos usam flash?", "Porque o NVMe usa o barramento PCIe, com muito mais banda que o SATA."],
    ["Liste os passos de montagem na ordem correta.", "Segurança; CPU; pasta e cooler; RAM e M.2; placa-mãe no gabinete; fonte e cabos; painel frontal e teste."],
    ["Calcule a fonte para CPU de 65 W, placa de vídeo de 160 W e 60 W de demais componentes, com 40% de folga.", "285 W × 1,4 = 399 W; uma fonte de 450 W ou 500 W atende."],
    ["Explique o papel do driver usando a analogia de um tradutor.", "O SO fala uma língua genérica e o dispositivo outra; o driver traduz os pedidos do SO em comandos que o dispositivo entende."],
    ["Quais cuidados evitam danos por eletricidade estática?", "Pulseira antiestática, tocar em metal aterrado, segurar placas pelas bordas, superfície isolante, não trabalhar sobre carpete."],
    ["Monte um plano de manutenção preventiva semestral para o laboratório de informática.", "Ex.: limpeza interna e externa, verificação de temperaturas e ventoinhas, troca de pasta térmica anual, atualização do SO e firmware, teste de backup, inventário."],
    ["Por que um computador pode desligar sozinho ao rodar um jogo pesado? Cite duas causas.", "Fonte insuficiente ou de má qualidade e superaquecimento (cooler sujo, pasta térmica seca)."]
  ],
  pbl: [
    { titulo: "O laboratório de 20 máquinas", cenario: "A escola recebeu 20 computadores desmontados por doação e precisa deixá-los funcionando antes do semestre.", passos: [["Organize uma linha de montagem com etapas, responsáveis e cuidados de segurança.", "Etapas: conferência e compatibilidade, montagem da placa-mãe (CPU, cooler, RAM, SSD), instalação no gabinete, cabos, teste POST e instalação do SO; pulseira antiestática e bancada isolada; registro de cada máquina."], ["Como testar cada máquina antes de liberar para os alunos?", "POST sem erros, entrar no UEFI e conferir CPU/RAM/discos, instalar SO e drivers, testar USB, rede, áudio e vídeo, medir temperaturas sob carga."]] },
    { titulo: "Upgrade do PC gamer", cenario: "Um aluno quer trocar só a placa de vídeo por uma de 280 W. O PC tem fonte de 450 W, processador de 105 W e cerca de 70 W de outros componentes.", passos: [["Verifique se a fonte atual aguenta.", "105 + 280 + 70 = 455 W, já acima de 450 W sem folga: não aguenta."], ["Recomende a fonte e outros cuidados.", "Com 40% de folga: 637 W, então uma fonte de 650 W a 750 W com certificação 80 Plus; conferir conectores PCIe, espaço no gabinete e slot PCIe x16."]] },
    { titulo: "O pen drive que não aparece", cenario: "No laboratório, alguns pen drives não aparecem em certas máquinas, mas funcionam em outras.", passos: [["Liste hipóteses ligadas a hardware e a software.", "Porta USB frontal desconectada ou com defeito; energia insuficiente na porta; driver ou controlador USB com problema; sistema de arquivos não reconhecido; política de bloqueio de USB."], ["Proponha um roteiro de diagnóstico do mais simples ao mais complexo.", "Testar outra porta (traseira), outro pen drive na mesma porta, ver o Gerenciador de Dispositivos, atualizar driver/chipset, checar o Gerenciamento de Disco e a política do laboratório."]] }
  ],
  resumo: [
    { t: "E/S", itens: ["Entrada, saída ou ambos.", "Controlador (hardware) + driver (software)."] },
    { t: "Placa-mãe e barramentos", itens: ["Soquete, RAM, PCIe, M.2/SATA, chipset, firmware.", "PCIe > SATA; USB para periféricos.", "A banda do barramento pode ser o gargalo."] },
    { t: "Montagem e manutenção", itens: ["Segurança antiestática e compatibilidade.", "Fonte com 30–50% de folga.", "Preventiva evita corretiva."] }
  ],
  glossario: [["Chipset", "Circuito que coordena a comunicação na placa-mãe."], ["DIMM", "Formato dos pentes de memória de desktop."], ["M.2", "Conector compacto para SSDs."], ["NVMe", "Protocolo de SSD sobre PCIe."], ["SATA", "Interface para discos de 2,5\" e 3,5\"."], ["80 Plus", "Certificação de eficiência de fontes."], ["Pasta térmica", "Composto que melhora a troca de calor entre CPU e cooler."], ["POST", "Autoteste feito pelo firmware ao ligar."]]
});
