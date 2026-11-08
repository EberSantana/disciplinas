FSI.modulo({
  n: 7, unidade: "Revisão visual", nome: "Sistemas Operacionais", titulo: "Sistemas operacionais",
  resumoCurto: "Kernel, processos e threads, escalonamento, memória virtual, deadlock, sincronização, sistemas de arquivos e Linux.",
  objetivos: ["Explicar as funções do sistema operacional e do kernel.", "Distinguir processo e thread e os estados de um processo.", "Comparar algoritmos de escalonamento e a paginação da memória virtual.", "Reconhecer deadlock, sincronização, sistemas de arquivos e permissões no Linux."],
  licoes: [
    { t: "Kernel, processos e threads", txt: "<p>O sistema operacional gerencia processos, memória, arquivos e dispositivos, e oferece uma interface ao usuário e às aplicações. O <b>kernel</b> é o núcleo que roda em modo privilegiado; as aplicações pedem serviços por <b>chamadas de sistema</b>.</p>", pontos: ["<b>Processo</b>: programa em execução, com espaço de endereçamento próprio. <b>Thread</b>: fluxo de execução dentro de um processo; threads compartilham memória.", "Estados: <b>novo, pronto, executando, bloqueado (espera) e terminado</b>.", "A <b>troca de contexto</b> salva e restaura o estado de um processo; tem custo.", "Modos de operação: usuário e kernel, para proteger o sistema."], pense: "Por que criar uma thread costuma ser mais barato que criar um processo?" },
    { t: "Escalonamento, memória e deadlock", txt: "<p>O <b>escalonador</b> decide qual processo pronto usa a CPU. Os algoritmos variam em justiça, tempo de resposta e vazão. A <b>memória virtual</b> usa <b>paginação</b> para dar a cada processo a ilusão de um espaço contínuo e maior que a memória física.</p>", pontos: ["<b>FCFS</b>: ordem de chegada. <b>SJF</b>: menor tarefa primeiro (pode causar inanição). <b>Round Robin</b>: fatias de tempo (quantum), justo e interativo. <b>Prioridades</b>: podem causar inanição; o <i>aging</i> corrige.", "<b>Falta de página (page fault)</b>: a página não está na memória e precisa ser trazida do disco. <b>Thrashing</b>: excesso de page faults degrada o desempenho.", "Substituição de páginas: FIFO, LRU (menos recentemente usada), ótimo.", "<b>Deadlock</b> exige quatro condições: exclusão mútua, posse e espera, não preempção e espera circular."] },
    { t: "Arquivos, sincronização e Linux", txt: "<p>Os <b>sistemas de arquivos</b> organizam os dados em disco (ext4, NTFS, FAT32, XFS). A <b>sincronização</b> evita condições de corrida quando processos ou threads compartilham dados, com <b>mutex</b>, <b>semáforos</b> e monitores.</p>", pontos: ["Linux: tudo é arquivo; diretórios principais como <code>/etc</code> (configuração), <code>/home</code>, <code>/var</code> (logs e dados variáveis), <code>/bin</code> e <code>/usr</code>.", "Permissões <code>rwx</code> para dono, grupo e outros; <code>chmod 754</code> = rwx r-x r--.", "Comandos comuns: <code>ls, cd, cp, mv, rm, grep, ps, top, kill, chmod, chown</code>.", "O <b>boot</b> segue firmware (BIOS/UEFI), gerenciador de boot, kernel e init/systemd."] }
  ],
  visuais: [
    { tipo: "rede", id: "v7-estados", titulo: "Estados de um processo", h: 400, dir: true, instr: "Clique em cada estado e nas transições possíveis.",
      nos: [{ id: "n", x: 90, y: 200, t: "Novo", d: "O processo está sendo criado." }, { id: "p", x: 280, y: 90, t: "Pronto", d: "Pode executar; aguarda a CPU." }, { id: "e", x: 520, y: 90, t: "Executando", d: "Está usando a CPU. Pode ser preemptado (volta a pronto), bloquear por E/S ou terminar." }, { id: "b", x: 400, y: 300, t: "Bloqueado", d: "Espera um evento, como E/S. Quando ele ocorre, volta a pronto." }, { id: "t", x: 640, y: 300, t: "Terminado", d: "Concluiu a execução; recursos serão liberados." }],
      liga: [["n", "p"], ["p", "e"], ["e", "p"], ["e", "b"], ["b", "p"], ["e", "t"]] },
    { tipo: "camadas", id: "v7-mem", titulo: "Hierarquia de memória", forma: "pilha", h: 340, instr: "Do mais rápido e caro ao mais lento e barato.",
      camadas: [{ t: "Registradores", d: "Dentro da CPU; acesso mais rápido, capacidade mínima.", ex: "bytes" }, { t: "Cache (L1, L2, L3)", d: "Guarda dados usados com frequência perto da CPU.", ex: "KB a MB" }, { t: "Memória principal (RAM)", d: "Memória volátil dos processos em execução.", ex: "GB" }, { t: "Armazenamento (SSD/HD)", d: "Persistente, grande e mais lento; inclui a área de swap.", ex: "centenas de GB a TB" }] },
    { tipo: "linha", id: "v7-boot", titulo: "O caminho do boot", ordenar: true, instr: "Do botão de ligar à tela de login.",
      passos: [{ t: "Firmware (BIOS/UEFI)", d: "Testa o hardware (POST) e procura o dispositivo de boot." }, { t: "Gerenciador de boot", d: "Carrega o kernel na memória (ex.: GRUB)." }, { t: "Kernel", d: "Inicializa memória, processos e drivers." }, { t: "Init/systemd", d: "Primeiro processo; inicia os serviços." }, { t: "Login", d: "O sistema fica pronto para o usuário." }] },
    { tipo: "classificar", id: "v7-esc", titulo: "Jogo: qual algoritmo de escalonamento?", instr: "Associe cada característica.", cats: ["FCFS", "SJF", "Round Robin", "Prioridades"],
      itens: [["Atende por ordem de chegada", 0], ["Menor tempo de execução primeiro", 1], ["Fatia de tempo (quantum) para cada processo", 2], ["Pode causar inanição; usa aging para corrigir", 3], ["Bom para sistemas interativos", 2], ["Pode favorecer processos curtos e adiar os longos", 1]] }
  ],
  fc: [
    ["Quais as funções principais de um sistema operacional?", "Gerenciar processos, memória, arquivos e dispositivos, além de oferecer interface e proteção."],
    ["O que é o <b>kernel</b>?", "O núcleo do sistema operacional, executado em modo privilegiado."],
    ["Diferença entre processo e thread?", "Processo tem espaço de endereçamento próprio; threads de um mesmo processo compartilham memória."],
    ["Quais os estados clássicos de um processo?", "Novo, pronto, executando, bloqueado e terminado."],
    ["O que é <b>troca de contexto</b>?", "Salvar o estado do processo atual e restaurar o de outro para que a CPU o execute."],
    ["Como funciona o Round Robin?", "Cada processo recebe uma fatia de tempo (quantum) e volta ao fim da fila se não terminar."],
    ["O que é <b>memória virtual</b>?", "Técnica que dá a cada processo um espaço de endereços maior que a RAM, usando o disco como apoio."],
    ["O que é um <b>page fault</b>?", "Acesso a uma página que não está na memória; o sistema a carrega do disco."],
    ["O que é <b>thrashing</b>?", "Excesso de falta de páginas: o sistema gasta mais tempo trocando páginas do que executando."],
    ["Quais as quatro condições do <b>deadlock</b>?", "Exclusão mútua, posse e espera, não preempção e espera circular."],
    ["Para que serve um <b>mutex</b>?", "Garante que apenas uma thread por vez acesse uma seção crítica."],
    ["O que significa <code>chmod 755</code>?", "Dono: rwx; grupo: r-x; outros: r-x."]
  ],
  vf: [
    ["Threads de um mesmo processo compartilham o espaço de endereçamento.", true, "Verdadeiro. Por isso a comunicação é fácil, mas exige sincronização."],
    ["Um processo em execução pode ir diretamente do estado bloqueado para executando.", false, "Falso. Ao terminar a espera, ele vai para pronto e só então o escalonador o coloca em execução."],
    ["O SJF pode causar inanição de processos longos.", true, "Verdadeiro. Se sempre chegam tarefas curtas, as longas esperam indefinidamente."],
    ["Round Robin é uma boa escolha para sistemas interativos.", true, "Verdadeiro. O quantum garante resposta rápida a todos."],
    ["Para ocorrer deadlock basta existir exclusão mútua.", false, "Falso. As quatro condições precisam ocorrer ao mesmo tempo."],
    ["Thrashing ocorre quando há pouca memória física e muitas trocas de página.", true, "Verdadeiro. O desempenho cai drasticamente."],
    ["No Linux, apenas o usuário root pode ler qualquer arquivo; permissões não existem para outros usuários.", false, "Falso. O modelo rwx se aplica a dono, grupo e outros."],
    ["O diretório /etc guarda arquivos de configuração do sistema.", true, "Verdadeiro. Os logs ficam, em geral, em /var/log."],
    ["A troca de contexto não tem custo.", false, "Falso. Salvar e restaurar estado consome tempo de CPU e invalida caches."],
    ["O NTFS é um sistema de arquivos do Windows com permissões e journaling.", true, "Verdadeiro. O FAT32 é mais simples e limita o tamanho de arquivo a 4 GB."],
    ["Um semáforo pode controlar o acesso a um número limitado de recursos.", true, "Verdadeiro. Um semáforo binário se comporta como um mutex."],
    ["O init/systemd é o primeiro processo do espaço de usuário no Linux.", true, "Verdadeiro. Ele inicia e supervisiona os demais serviços."]
  ],
  caderno: [
    ["Explique a diferença entre processo e thread usando uma analogia.", "Processo é uma casa com seus próprios cômodos e móveis; threads são moradores da mesma casa, compartilhando os cômodos."],
    ["Dados os processos P1(8), P2(4) e P3(2) chegando juntos, calcule o tempo médio de espera em FCFS e em SJF.", "FCFS (P1,P2,P3): esperas 0, 8, 12: média 6,67. SJF (P3,P2,P1): esperas 0, 2, 6: média 2,67."],
    ["Por que a memória virtual é importante?", "Permite executar programas maiores que a RAM, isola os processos e simplifica a alocação."],
    ["Explique o que acontece em uma falta de página.", "O hardware gera uma interrupção, o SO localiza a página no disco, escolhe um quadro livre ou vítima, carrega a página, atualiza a tabela e reexecuta a instrução."],
    ["Descreva um exemplo de deadlock e uma forma de evitá-lo.", "P1 segura R1 e pede R2; P2 segura R2 e pede R1. Evitar impondo uma ordem global de aquisição dos recursos."],
    ["O que é uma condição de corrida e como evitá-la?", "Resultado depende da ordem de execução de threads que acessam dado compartilhado. Evita-se com exclusão mútua (mutex, semáforo)."],
    ["Converta rw-r----- em notação octal e explique.", "640: dono lê e escreve (6), grupo apenas lê (4), outros sem acesso (0)."],
    ["Cite cinco comandos Linux e sua função.", "ls (lista), cd (muda de pasta), grep (busca texto), ps (lista processos), chmod (altera permissões)."],
    ["O que é journaling em um sistema de arquivos?", "Um registro das operações antes de aplicá-las, que permite recuperar a consistência após uma falha de energia."],
    ["Compare máquina virtual e container do ponto de vista do sistema operacional.", "A VM executa um SO convidado sobre um hipervisor; o container compartilha o kernel do hospedeiro, isolando por namespaces e cgroups."]
  ],
  pbl: [
    { titulo: "O servidor está lento", cenario: "Um servidor Linux responde devagar. O comando top mostra CPU a 100% por um único processo e muita atividade de swap.",
      passos: [["Que hipóteses levantar?", "Processo em laço ou carga excessiva; pouca RAM causando swap e thrashing; falta de recursos para os serviços."], ["Que ações tomar?", "Identificar o processo com top e ps, analisar logs, ajustar prioridade (nice) ou encerrar; aumentar RAM ou limitar serviços; monitorar."]] },
    { titulo: "Permissões erradas", cenario: "Um site apresenta erro 403 depois de os arquivos serem copiados por outro usuário.",
      passos: [["Como investigar?", "Verificar dono, grupo e permissões com ls -l, o usuário do servidor web e o contexto de segurança."], ["Qual a correção segura?", "Ajustar dono e grupo com chown e permissões mínimas (755 para pastas, 644 para arquivos), sem usar 777."]] },
    { titulo: "Escolha do sistema de arquivos", cenario: "Um pendrive precisa ser lido em Windows, Linux e Mac, com arquivos de 6 GB.",
      passos: [["O que há de errado com o FAT32?", "O limite de 4 GB por arquivo impede arquivos de 6 GB."], ["Que alternativa propor?", "exFAT, suportado pelos três sistemas e sem esse limite."]] }
  ],
  resumo: [
    { t: "Ideias-chave", itens: ["Kernel executa em modo privilegiado; aplicações usam chamadas de sistema.", "Threads compartilham memória; processos, não.", "Round Robin usa quantum; SJF pode causar inanição.", "Deadlock exige quatro condições simultâneas.", "Permissões rwx: dono, grupo e outros."] },
    { t: "Erros comuns", itens: ["Passar de bloqueado direto para executando.", "Achar que basta uma condição para haver deadlock.", "Usar chmod 777 como solução."] }
  ],
  glossario: [["Kernel", "Núcleo do sistema operacional."], ["Thread", "Fluxo de execução dentro de um processo."], ["Quantum", "Fatia de tempo do Round Robin."], ["Page fault", "Falta de página na memória."], ["Deadlock", "Impasse entre processos."], ["Mutex", "Exclusão mútua."], ["Journaling", "Registro de operações para recuperação."], ["systemd", "Gerenciador de serviços do Linux."]]
});
