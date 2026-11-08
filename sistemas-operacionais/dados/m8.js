FSI.modulo({
  n: 8, unidade: "Arquivos, E/S e Linux", nome: "Arquivos, E/S e Linux na prática", titulo: "Arquivos, dispositivos de E/S e o estudo de um sistema real: Linux", duracao: "6 h",
  resumoCurto: "Arquivos e atributos, diretórios em árvore, caminhos, métodos de alocação, proteção de acesso, hardware e software de E/S em camadas, discos, relógios, interfaces — e prática no terminal Linux.",
  analogia: { titulo: "A biblioteca e a ponte para o mundo exterior", txt: "<p>O disco, sozinho, é um amontoado de blocos numerados — como um depósito cheio de folhas soltas. O <b>sistema de arquivos</b> transforma esse depósito numa <b>biblioteca organizada</b>: cada documento tem nome, estante (diretório), ficha catalográfica (atributos) e regras de quem pode ler, escrever ou levar emprestado (permissões).</p><p>Já o <b>subsistema de E/S</b> é a ponte entre o computador e o mundo: teclado lento, SSD rapidíssimo, impressora, rede. O SO oferece a todos os programas a mesma “porta de entrada” simples, e os <b>drivers</b> traduzem para a língua de cada aparelho. Neste módulo você ainda vai abrir um terminal Linux e mexer nisso tudo com as próprias mãos.</p>" },
  chave: [
    "<b>Arquivo:</b> abstração com nome e <b>atributos</b> (tipo, tamanho, localização, proteção, datas). Operações: criar, ler, escrever, reposicionar, apagar, truncar.",
    "<b>Diretórios</b> em nível único, dois níveis ou <b>árvore</b>; <b>caminho absoluto</b> começa na raiz (/), <b>relativo</b> parte da pasta atual.",
    "Alocação de blocos: <b>contígua</b> (rápida, fragmenta), <b>encadeada</b> (cresce fácil, acesso aleatório ruim) e <b>indexada</b> (i-node; usada por NTFS e ext4).",
    "Proteção no Linux: <b>dono, grupo e outros</b> × <b>r (4), w (2), x (1)</b> → ex.: <code>chmod 754</code> = rwxr-xr--.",
    "Software de E/S em camadas: <b>aplicação → E/S independente do dispositivo → drivers → tratadores de interrupção → hardware</b>.",
    "Disco: tempo de acesso = <b>busca (seek) + latência rotacional + transferência</b>; SSD não tem partes móveis."
  ],
  objetivos: ["Descrever <b>arquivos</b>, <b>atributos</b>, <b>diretórios</b> e <b>caminhos</b>.", "Comparar os métodos de <b>alocação</b> contígua, encadeada e indexada.", "Ler e configurar <b>permissões</b> Unix/Linux (rwx e octal).", "Explicar as <b>camadas de software de E/S</b>, discos, relógios e interfaces; usar comandos básicos do <b>Linux</b>."],
  licoes: [
    { t: "Arquivos e diretórios", txt: "<p>O sistema de arquivos esconde onde os bytes estão fisicamente e oferece a abstração <b>arquivo</b>: uma coleção de informações com um <b>nome</b>. Cada arquivo tem <b>atributos</b> (metadados): nome, tipo, localização, tamanho, proteção e datas (criação, modificação, acesso).</p>", pontos: ["Operações: criar, escrever, ler, reposicionar (buscar uma posição), apagar e truncar.", "<b>Diretório</b> é um arquivo especial que lista outros arquivos e diretórios.", "Estruturas: <b>nível único</b> (tudo junto, vira caos), <b>dois níveis</b> (uma pasta por usuário) e <b>árvore</b> (subpastas à vontade — a que usamos).", "<b>Caminho absoluto:</b> da raiz até o arquivo (<code>/home/aluno/documentos/trabalho.txt</code> ou <code>C:\\Usuarios\\aluno\\Documentos\\trabalho.txt</code>). <b>Relativo:</b> a partir da pasta atual (<code>documentos/trabalho.txt</code>)."], pense: "Qual o caminho absoluto da pasta Downloads no seu computador?" },
    { t: "Onde ficam os blocos: métodos de alocação", txt: "<p>Assim como na memória, o SO precisa decidir em que blocos do disco cada arquivo fica:</p>", pontos: ["<b>Contígua:</b> blocos sequenciais. Leitura rapidíssima (sequencial e aleatória), mas sofre fragmentação externa e exige saber o tamanho de antemão.", "<b>Encadeada (ligada):</b> cada bloco aponta para o próximo; o diretório guarda só o primeiro. Cresce fácil e sem fragmentação externa, mas o acesso aleatório é péssimo e um ponteiro corrompido perde o resto do arquivo.", "<b>Indexada:</b> um <b>bloco de índice</b> (o <b>i-node</b> no Unix/Linux) lista todos os blocos do arquivo. Acesso aleatório eficiente e sem fragmentação externa; usada por NTFS e ext4.", "Exemplo: bloco de índice com 1024 ponteiros e blocos de 4 KB → arquivo máximo de 1024 × 4 KB = 4 MB (por isso há índices de vários níveis)."], pense: "Para um serviço de streaming, com arquivos enormes lidos do começo ao fim, que método você escolheria?" },
    { t: "Proteção de acesso", txt: "<p>Num sistema multiusuário é preciso controlar quem faz o quê. O Unix/Linux define permissões para três classes — <b>dono (u)</b>, <b>grupo (g)</b> e <b>outros (o)</b> — e três direitos — <b>leitura (r)</b>, <b>escrita (w)</b> e <b>execução (x)</b>. Outros sistemas usam <b>listas de controle de acesso (ACL)</b>, mais detalhadas.</p>", pontos: ["Em <code>ls -l</code>: <code>-rwxr-xr--</code> = arquivo comum; dono rwx; grupo r-x; outros r--.", "Em octal: r = 4, w = 2, x = 1. rwx = 7, r-x = 5, r-- = 4 → <b>754</b>.", "<code>chmod 644 arquivo</code> → rw-r--r--: o dono lê e escreve; os outros só leem.", "<code>chmod u+x script.sh</code> dá permissão de execução ao dono.", "Para diretórios, x significa poder <b>entrar</b> na pasta."], pense: "Que permissão você daria a um arquivo de notas que só o professor pode alterar, mas a turma (grupo) pode ler?" },
    { t: "Sistemas de E/S: hardware e software em camadas", txt: "<p>Cada dispositivo tem uma parte <b>mecânica</b> (o aparelho) e uma <b>eletrônica</b> (o <b>controlador</b>), com quem o SO conversa por portas de E/S ou mapeamento em memória. Como vimos, a comunicação pode ser por polling, interrupção ou DMA. Para domar a variedade de dispositivos, o software de E/S é organizado em <b>camadas</b>:</p>", pontos: ["<b>Processos/aplicações</b> pedem E/S por chamadas de sistema (read, write).", "<b>Software de E/S independente do dispositivo</b>: nomes, proteção, buffering, tratamento de erros e uma interface uniforme.", "<b>Drivers de dispositivo</b>: traduzem os pedidos genéricos para os comandos de cada controlador (um por tipo de dispositivo).", "<b>Tratadores de interrupção</b>: acordam o driver/processo quando o dispositivo termina.", "<b>Hardware</b>: controladores e dispositivos.", "Assim, um programa grava num pendrive ou num SSD da mesma forma — quem muda é o driver."], pense: "Por que, ao trocar de impressora, você instala um driver e não reinstala o editor de texto?" },
    { t: "Discos, relógios, interfaces e o estudo do Linux", txt: "<p>Alguns dispositivos merecem atenção especial:</p>", pontos: ["<b>Disco rígido (HD):</b> tempo de acesso = <b>busca</b> (mover o braço até a trilha) + <b>latência rotacional</b> (esperar o setor passar sob a cabeça; em média meia volta) + <b>transferência</b>. <b>SSD:</b> memória flash, sem partes móveis, muito mais rápido.", "<b>Relógios (timers):</b> geram interrupções periódicas; o SO usa para manter a hora, controlar o quantum e acordar processos.", "<b>Interfaces com o usuário:</b> teclado (gera interrupções e códigos de tecla), mouse (movimento e cliques), monitor (o SO e o driver de vídeo desenham na tela).", "<b>Estudo de um SO real: Linux.</b> Sistema livre e de código aberto, criado por Linus Torvalds em 1991, inspirado no Unix/Minix. Núcleo monolítico com <b>módulos carregáveis</b>, multitarefa preemptivo, multiusuário, árvore de diretórios começando em <code>/</code> (/home, /etc, /bin, /tmp) e permissões rwx.", "No terminal, o <b>shell</b> (bash) interpreta comandos: <code>pwd</code>, <code>ls -l</code>, <code>cd</code>, <code>mkdir</code>, <code>chmod</code>, <code>ps</code>, <code>free -h</code>."], pense: "Num HD de 7200 rpm, quanto dura uma volta completa do disco?" }
  ],
  termos: [["Atributos", "Metadados do arquivo: nome, tamanho, datas, proteção."], ["Caminho absoluto", "Da raiz até o arquivo: /home/aluno/x.txt."], ["i-node", "Bloco de índice de um arquivo no Unix/Linux."], ["rwx", "Ler (4), escrever (2), executar (1)."], ["chmod 754", "rwxr-xr--."], ["Driver", "Traduz pedidos genéricos para um dispositivo."], ["Seek", "Tempo de mover o braço do disco até a trilha."], ["Shell", "Interpretador de comandos (ex.: bash)."]],
  visuais: [
    { tipo: "rede", id: "arvore", titulo: "A árvore de diretórios do Linux", dir: true, h: 420, nos: [
      { id: "r", x: 360, y: 50, t: "/ (raiz)", d: "Topo da árvore. Todo caminho absoluto começa aqui." },
      { id: "home", x: 130, y: 170, t: "/home", d: "Pastas pessoais dos usuários." },
      { id: "etc", x: 300, y: 170, t: "/etc", d: "Arquivos de configuração do sistema (ex.: /etc/passwd, /etc/hostname)." },
      { id: "bin", x: 450, y: 170, t: "/bin", d: "Programas essenciais (ls, bash, cp)." },
      { id: "tmp", x: 600, y: 170, t: "/tmp", d: "Arquivos temporários; qualquer usuário pode escrever." },
      { id: "al", x: 130, y: 290, t: "/home/aluno", d: "A pasta “casa” do usuário aluno, também chamada de ~ (til)." },
      { id: "doc", x: 60, y: 390, t: "documentos", d: "Caminho absoluto: /home/aluno/documentos. Relativo (estando em ~): documentos." },
      { id: "sh", x: 250, y: 390, t: "script.sh", d: "Um arquivo de script; só executa se tiver permissão x." }],
      liga: [["r", "home"], ["r", "etc"], ["r", "bin"], ["r", "tmp"], ["home", "al"], ["al", "doc"], ["al", "sh"]] },
    { tipo: "camadas", id: "camadas-es", titulo: "Camadas do software de E/S", forma: "pilha", h: 360, camadas: [
      { t: "Processo do usuário", d: "Pede a operação por uma chamada de sistema, sem saber qual é o dispositivo.", ex: "write(arquivo, dados)" },
      { t: "Software independente do dispositivo", d: "Interface uniforme, nomes, proteção, buffering e tratamento de erros.", ex: "Sistema de arquivos, cache de disco." },
      { t: "Drivers de dispositivo", d: "Traduzem o pedido genérico para os comandos do controlador específico.", ex: "Driver do SSD NVMe, driver da impressora." },
      { t: "Tratadores de interrupção", d: "Recebem o aviso de que a operação terminou e acordam o driver/processo.", ex: "Rotina de interrupção do disco." },
      { t: "Hardware (controladores e dispositivos)", d: "Executam fisicamente a operação.", ex: "Controlador SATA, disco, teclado." }] },
    { tipo: "classificar", id: "alocacoes", titulo: "Jogo: qual método de alocação de arquivos?", cats: ["Contígua", "Encadeada", "Indexada"], itens: [["Blocos sequenciais no disco", 0], ["Cada bloco aponta para o próximo", 1], ["Usa um bloco de índice (i-node)", 2], ["Acesso aleatório péssimo", 1], ["Sofre fragmentação externa", 0], ["Usada por NTFS e ext4", 2]] }
  ],
  lab: {
    intro: "Um terminal Linux simulado, seguro para errar à vontade. Cumpra as missões: navegue, crie pastas e arquivos, leia permissões, torne um script executável e veja os processos e a memória do sistema.",
    sims: [
      { tipo: "terminal", titulo: "Terminal Linux do laboratório", instr: "Digite os comandos e tecle Enter. Comece com <code>help</code>.", cfg: { id: "term" } },
      { tipo: "cenarios", titulo: "Decifre as permissões", cfg: { id: "perm", rotulo: "Arquivo", itens: [
        { t: "<code>-rwxr-xr--</code> em <b>script.sh</b>. Quem pode executar?", ops: [["Dono e grupo", true, "rwx (dono) e r-x (grupo) têm x; outros (r--) não."], ["Todos", false, "Os outros só têm r--."], ["Só o dono", false, "O grupo também tem x (r-x)."]] },
        { t: "Qual o valor octal de <code>rw-r--r--</code>?", ops: [["644", true, "rw- = 4+2 = 6; r-- = 4; r-- = 4."], ["755", false, "755 seria rwxr-xr-x."], ["600", false, "600 seria rw-------."]] },
        { t: "O professor quer que só ele altere <b>notas.txt</b>, que a turma (grupo) leia e que ninguém mais veja. Qual comando?", ops: [["chmod 640 notas.txt", true, "rw- (dono), r-- (grupo), --- (outros)."], ["chmod 777 notas.txt", false, "Todo mundo poderia alterar."], ["chmod 604 notas.txt", false, "Daria leitura aos outros e nada ao grupo."]] },
        { t: "Você tentou rodar <code>./instalar.sh</code> e recebeu “Permissão negada”. O que falta?", ops: [["Permissão de execução (x)", true, "Use chmod u+x instalar.sh."], ["Permissão de leitura (r)", false, "O erro de execução vem da falta de x."], ["Ser outro usuário", false, "Basta dar x ao dono."]] },
        { t: "Em <code>drwxr-x---</code>, o que a letra <b>d</b> indica?", ops: [["Que é um diretório", true, "O primeiro caractere é o tipo: d = diretório, - = arquivo comum."], ["Que pode ser deletado", false, "Não é uma permissão."], ["Que é um dispositivo", false, "Dispositivos aparecem como b ou c."]] }] } }
    ],
    missoes: [
      { id: "m1", t: "Descubra em que pasta você está (pwd)", ev: "term:pwd" },
      { id: "m2", t: "Liste os arquivos com permissões (ls -l)", ev: "term:ls-l" },
      { id: "m3", t: "Crie a pasta projetos (mkdir projetos)", ev: "term:mkdir:projetos" },
      { id: "m4", t: "Entre em projetos e crie um arquivo nela (cd + touch)", ev: "term:touch-projetos" },
      { id: "m5", t: "Tente executar ./script.sh sem permissão", ev: "term:negado" },
      { id: "m6", t: "Dê permissão 754 ao script.sh", ev: "term:chmod:script.sh:754" },
      { id: "m7", t: "Execute o script com sucesso", ev: "term:executou" },
      { id: "m8", t: "Veja os processos e seus estados (ps)", ev: "term:ps" },
      { id: "m9", t: "Veja a memória RAM e o swap (free -h)", ev: "term:free" },
      { id: "m10", t: "Decifre todas as permissões", ev: "perm:fim" }
    ],
    guiados: [
      { titulo: "Permissões em octal", txt: "<p>Lembre: <b>r = 4</b>, <b>w = 2</b>, <b>x = 1</b>, somados para dono, grupo e outros.</p>", passos: [
        { p: "Quanto vale rwx em octal?", r: 7, dica: "4 + 2 + 1.", expl: "7." },
        { p: "Escreva as permissões de chmod 754 no formato rwx (9 letras)", r: ["rwxr-xr--"], dica: "7 = rwx, 5 = r-x, 4 = r--.", expl: "rwxr-xr--." },
        { p: "Qual o octal de rw-r-----?", r: 640, dica: "rw- = 6, r-- = 4, --- = 0.", expl: "640." }] },
      { titulo: "Tamanho máximo com um bloco de índice (exercício do e-book)", txt: "<p>Um bloco de índice guarda <b>1024 ponteiros</b>; cada bloco de dados tem <b>4 KB</b>.</p>", passos: [
        { p: "Quantos KB um único bloco de índice consegue endereçar?", r: 4096, un: "KB", dica: "Ponteiros × tamanho do bloco.", expl: "1024 × 4 KB = 4096 KB." },
        { p: "Quanto é isso em MB?", r: 4, un: "MB", dica: "1 MB = 1024 KB.", expl: "4 MB — por isso sistemas reais usam índices de vários níveis para arquivos grandes." }] },
      { titulo: "Tempo de acesso a um HD", txt: "<p>Um HD gira a <b>7200 rpm</b>, tem tempo médio de busca de <b>9 ms</b> e leva <b>0,1 ms</b> para transferir o bloco.</p>", passos: [
        { p: "Duração de uma volta completa, em ms (duas casas)", r: 8.33, un: "ms", dica: "60 000 ms ÷ 7200 voltas.", expl: "8,33 ms." },
        { p: "Latência rotacional média (meia volta), em ms (duas casas)", r: 4.17, tol: 0.02, un: "ms", dica: "Metade de uma volta.", expl: "≈ 4,17 ms." },
        { p: "Tempo médio total de acesso, em ms (duas casas)", r: 13.27, tol: 0.03, un: "ms", dica: "Busca + latência + transferência.", expl: "9 + 4,17 + 0,1 ≈ 13,27 ms — uma eternidade para a CPU, que executa milhões de instruções nesse tempo." }] }
    ]
  },
  fc: [
    ["O que são os atributos de um arquivo?", "Metadados como nome, tipo, localização, tamanho, proteção e datas de criação, modificação e acesso."],
    ["Quais as operações básicas sobre arquivos?", "Criar, escrever, ler, reposicionar, apagar e truncar."],
    ["Diferença entre caminho absoluto e relativo?", "Absoluto parte da raiz (/home/aluno/x.txt); relativo parte da pasta atual (documentos/x.txt)."],
    ["Por que a estrutura em árvore de diretórios venceu?", "Permite subpastas à vontade, organização flexível e evita conflito de nomes."],
    ["Vantagem e desvantagem da alocação contígua?", "Acesso muito rápido; sofre fragmentação externa e exige saber o tamanho do arquivo."],
    ["Vantagem e desvantagem da alocação encadeada?", "Arquivo cresce fácil e sem fragmentação externa; acesso aleatório péssimo e ponteiro corrompido perde o resto."],
    ["O que é um i-node?", "O bloco de índice de um arquivo no Unix/Linux, com seus atributos e ponteiros para os blocos de dados."],
    ["O que significa -rwxr-xr--?", "Arquivo comum; dono pode ler, escrever e executar; grupo ler e executar; outros só ler (754)."],
    ["Quais as camadas do software de E/S?", "Processo do usuário → software independente do dispositivo → drivers → tratadores de interrupção → hardware."],
    ["Para que serve um driver?", "Traduzir pedidos genéricos de E/S nos comandos específicos de um controlador de dispositivo."],
    ["Quais os três componentes do tempo de acesso a um HD?", "Tempo de busca (seek), latência rotacional e tempo de transferência."],
    ["Por que os relógios (timers) são importantes para o SO?", "Geram interrupções periódicas usadas para manter a hora, controlar o quantum e acordar processos."]
  ],
  vf: [
    ["Um diretório é, na essência, um arquivo especial que lista outros arquivos.", true, "Por isso pode conter arquivos e outros diretórios."],
    ["O caminho /home/aluno/notas.txt é relativo.", false, "Começa na raiz (/), então é absoluto."],
    ["Na alocação encadeada, chegar ao bloco 100 exige percorrer os 99 anteriores.", true, "Cada bloco só conhece o próximo."],
    ["NTFS e ext4 usam principalmente alocação indexada.", true, "Com estruturas como o i-node (ext4) e a MFT (NTFS)."],
    ["chmod 777 é a escolha mais segura para arquivos importantes.", false, "777 dá todas as permissões a todos; é o oposto de seguro."],
    ["Em octal, r-x vale 5.", true, "4 + 0 + 1."],
    ["Para executar um script no Linux, ele precisa ter permissão x.", true, "Sem x, o shell responde “Permissão negada”."],
    ["O driver de dispositivo fica na camada mais alta, junto do aplicativo.", false, "Fica abaixo do software independente do dispositivo, perto do hardware."],
    ["Graças às camadas de E/S, um programa grava em pendrive e em SSD da mesma forma.", true, "A diferença fica escondida no driver."],
    ["O SSD tem tempo de busca maior que o HD por causa do braço mecânico.", false, "O SSD não tem partes móveis; é o HD que tem braço."],
    ["A latência rotacional média é o tempo de meia volta do disco.", true, "Em média o setor está a meia volta de distância."],
    ["O Linux é um sistema de código aberto inspirado no Unix.", true, "Criado por Linus Torvalds em 1991."]
  ],
  caderno: [
    ["Abra o terminal do seu computador, liste os arquivos com permissões (ls -la ou dir /a) e interprete as permissões de um arquivo.", "Resposta pessoal. Ex.: -rw-r--r-- 1 aluno aluno 120 relatorio.txt: arquivo comum; dono lê e escreve; grupo e outros só leem (644)."],
    ["Explique, com um exemplo, a diferença entre caminho absoluto e relativo.", "Estando em /home/aluno, o arquivo /home/aluno/documentos/trabalho.txt pode ser chamado de forma relativa como documentos/trabalho.txt."],
    ["Para um serviço de streaming de vídeo (arquivos grandes, lidos em sequência), que método de alocação você escolheria? Justifique.", "Contígua ou indexada com blocos grandes: a leitura sequencial fica rapidíssima. A contígua é ótima se os arquivos raramente mudam; a indexada é mais flexível."],
    ["Compare os três métodos de alocação de arquivos num quadro.", "Contígua: rápida, fragmenta, tamanho fixo. Encadeada: cresce fácil, acesso aleatório ruim, frágil. Indexada: acesso aleatório bom, sem fragmentação externa, gasta um bloco de índice."],
    ["Converta: rwxr-x--- para octal e 640 para rwx.", "rwxr-x--- = 750; 640 = rw-r-----."],
    ["Descreva o caminho de um pedido de impressão pelas camadas de E/S.", "O editor chama write → camada independente do dispositivo (spool, buffer, permissões) → driver da impressora traduz para a linguagem dela → controlador imprime → interrupção avisa o fim."],
    ["Calcule o tempo médio de acesso de um HD de 5400 rpm, busca de 12 ms e transferência de 0,2 ms.", "Uma volta = 60 000 ÷ 5400 ≈ 11,11 ms; latência média ≈ 5,56 ms; total ≈ 12 + 5,56 + 0,2 = 17,76 ms."],
    ["Por que o SSD deixa o computador tão mais rápido para abrir programas?", "Porque não tem busca nem latência rotacional: o acesso é eletrônico, em microssegundos, enquanto o HD gasta milissegundos movendo peças."],
    ["Liste 6 comandos Linux e o que cada um faz.", "pwd (mostra a pasta atual), ls -l (lista com permissões), cd (muda de pasta), mkdir (cria pasta), chmod (muda permissões), ps (lista processos). Também: free -h, cat, rm, touch."],
    ["Escolha um SO real (Linux ou Windows) e descreva como ele aplica três conceitos da disciplina.", "Ex.: Linux — multitarefa preemptivo com escalonador CFS; memória virtual com paginação e swap; sistema de arquivos ext4 com i-nodes e permissões rwx."]
  ],
  pbl: [
    { titulo: "As notas da turma vazaram", cenario: "No servidor da escola, a planilha de notas ficou com permissão 666 e um aluno alterou as próprias notas.", passos: [["Explique o que a permissão 666 permitia e por que isso é grave.", "666 = rw-rw-rw-: dono, grupo e outros podiam ler e escrever; qualquer usuário do servidor podia alterar as notas."], ["Que permissão e que organização de grupos você proporia?", "640 (rw-r-----): só o professor (dono) altera; o grupo da coordenação lê; outros nada. Alunos fora do grupo."]] },
    { titulo: "O pendrive que demorava a copiar", cenario: "Copiar 2000 fotos pequenas para um pendrive demora muito mais que copiar um único vídeo do mesmo tamanho total.", passos: [["Explique a diferença usando sistema de arquivos e E/S.", "Cada foto exige criar um arquivo, atualizar diretório, atributos e índice: muitas operações pequenas de E/S. O vídeo é uma gravação grande e sequencial."], ["Que dica você daria para acelerar a cópia?", "Compactar as fotos num único arquivo (zip), copiar e descompactar depois; usar um dispositivo mais rápido."]] },
    { titulo: "Primeiro dia como técnico de suporte", cenario: "Você assumiu o suporte de um laboratório com Linux. Precisa criar uma pasta compartilhada para trabalhos, liberar a execução de um script de backup e descobrir por que uma máquina está lenta.", passos: [["Quais comandos você usaria para a pasta e o script?", "mkdir /home/compartilhado/trabalhos; chmod 770 na pasta para o grupo da turma; chmod u+x backup.sh (ou 754)."], ["Como investigaria a lentidão?", "ps / top para ver processos e estados (muitos em D = esperando disco?), free -h para ver se está usando muito swap, e df -h para ver espaço em disco."]] }
  ],
  resumo: [
    { t: "Arquivos", itens: ["Atributos e operações.", "Diretórios em árvore; caminho absoluto × relativo.", "Alocação contígua, encadeada, indexada (i-node).", "Permissões u/g/o × r/w/x; octal (754, 644, 640)."] },
    { t: "E/S", itens: ["Controlador, polling, interrupção, DMA.", "Camadas: processo → independente do dispositivo → driver → interrupções → hardware.", "Disco: busca + latência + transferência; relógios; teclado, mouse, monitor."] },
    { t: "Linux", itens: ["Livre, inspirado no Unix, núcleo monolítico modular.", "Comandos: pwd, ls -l, cd, mkdir, chmod, ps, free -h."] }
  ],
  glossario: [["Sistema de arquivos", "Parte do SO que organiza os dados em arquivos e diretórios."], ["i-node", "Estrutura de índice de um arquivo no Unix/Linux."], ["ACL", "Lista de controle de acesso."], ["Driver", "Software de controle de um dispositivo."], ["Seek", "Tempo de busca do braço do HD."], ["Latência rotacional", "Espera pelo setor girar até a cabeça."], ["Shell", "Interpretador de comandos."], ["ext4 / NTFS", "Sistemas de arquivos do Linux / Windows."]]
});
