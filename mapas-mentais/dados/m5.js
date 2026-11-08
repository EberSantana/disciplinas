FSI.modulo({
  n: 5, unidade: "Revisão visual", nome: "Cloud, DevOps e Containers", titulo: "Computação em nuvem, DevOps e containers",
  resumoCurto: "Modelos de serviço e implantação, virtualização, containers e Docker, Kubernetes, CI/CD, infraestrutura como código e observabilidade.",
  objetivos: ["Distinguir IaaS, PaaS, SaaS e os modelos público, privado, híbrido e multicloud.", "Comparar máquinas virtuais e containers e entender Docker e Kubernetes.", "Descrever um pipeline de CI/CD e a cultura DevOps.", "Relacionar infraestrutura como código, monitoramento e observabilidade."],
  licoes: [
    { t: "Computação em nuvem", txt: "<p>A nuvem entrega recursos de TI sob demanda, com <b>elasticidade</b>, <b>autoatendimento</b>, acesso amplo pela rede, medição de uso e agrupamento de recursos. Os modelos de serviço variam conforme o que o provedor gerencia.</p>", pontos: ["<b>IaaS</b>: infraestrutura (máquinas virtuais, rede, disco); você gerencia SO e aplicações.", "<b>PaaS</b>: plataforma para desenvolver e executar aplicações sem gerenciar a infraestrutura.", "<b>SaaS</b>: software pronto, consumido pelo navegador.", "Implantação: <b>pública</b>, <b>privada</b>, <b>híbrida</b> e <b>multicloud</b>.", "<b>Responsabilidade compartilhada</b>: o provedor protege a nuvem; o cliente protege o que coloca nela."], pense: "Em qual modelo o cliente tem mais responsabilidade: IaaS ou SaaS?" },
    { t: "Virtualização e containers", txt: "<p>A <b>máquina virtual</b> emula um computador completo, com seu próprio sistema operacional, sobre um <b>hipervisor</b>. O <b>container</b> isola processos compartilhando o kernel do hospedeiro; é mais leve e inicia mais rápido.</p>", pontos: ["<b>Imagem</b> é o modelo imutável; <b>container</b> é a instância em execução.", "O <b>Dockerfile</b> descreve como construir a imagem; um <b>registry</b> guarda e distribui imagens.", "<b>Kubernetes</b> orquestra containers: agenda, escala, reinicia e expõe serviços. A menor unidade é o <b>pod</b>.", "Volumes preservam dados quando o container é descartado."] },
    { t: "DevOps, CI/CD e observabilidade", txt: "<p><b>DevOps</b> une desenvolvimento e operações com cultura, automação, medição e compartilhamento (CALMS). O <b>pipeline de CI/CD</b> automatiza build, testes e implantação.</p>", pontos: ["<b>Integração contínua</b>: integrar e testar com frequência. <b>Entrega contínua</b>: sempre pronto para ir à produção, com aprovação manual. <b>Implantação contínua</b>: vai à produção automaticamente.", "<b>Infraestrutura como código</b> (Terraform, Ansible) torna ambientes reproduzíveis e versionados.", "<b>Observabilidade</b> usa logs, métricas e traces para entender o comportamento do sistema.", "<b>DevSecOps</b> leva a segurança para o início do ciclo (shift left)."] }
  ],
  visuais: [
    { tipo: "camadas", id: "v5-servico", titulo: "Pilha de responsabilidades: IaaS, PaaS e SaaS", forma: "pilha", h: 340, instr: "De cima para baixo, o que o provedor assume cresce. Clique em cada nível.",
      camadas: [{ t: "SaaS", d: "O provedor gerencia tudo; o cliente usa o software e cuida de dados e acessos.", ex: "e-mail na nuvem, CRM" }, { t: "PaaS", d: "O cliente gerencia a aplicação e os dados; o provedor cuida de SO, runtime e infraestrutura.", ex: "plataformas de aplicação, bancos gerenciados" }, { t: "IaaS", d: "O cliente gerencia SO, runtime, aplicação e dados; o provedor entrega o hardware virtualizado.", ex: "máquinas virtuais, redes virtuais" }, { t: "Infraestrutura física", d: "Datacenters, energia e rede: responsabilidade do provedor em todos os modelos.", ex: "servidores, resfriamento" }] },
    { tipo: "rede", id: "v5-k8s", titulo: "Mapa do Kubernetes", h: 420, instr: "Clique nos componentes e veja o papel de cada um.",
      nos: [{ id: "c", x: 360, y: 60, t: "Cluster", d: "Conjunto de máquinas que o Kubernetes gerencia como um todo." }, { id: "cp", x: 130, y: 170, t: "Plano de\ncontrole", d: "Decide e mantém o estado desejado: API, agendador e controladores." }, { id: "n", x: 590, y: 170, t: "Nós de\ntrabalho", d: "Máquinas que executam os pods." }, { id: "p", x: 590, y: 320, t: "Pod", d: "Menor unidade implantável: um ou mais containers com rede e volumes compartilhados." }, { id: "d", x: 360, y: 270, t: "Deployment", d: "Declara quantas réplicas devem existir e como atualizar." }, { id: "s", x: 130, y: 330, t: "Service", d: "Endereço estável para acessar um conjunto de pods." }],
      liga: [["c", "cp"], ["c", "n"], ["n", "p"], ["d", "p"], ["s", "p"], ["cp", "d"]] },
    { tipo: "linha", id: "v5-pipe", titulo: "Pipeline de CI/CD", ordenar: true, instr: "Acompanhe o caminho do código à produção e depois ordene.",
      passos: [{ t: "Commit", d: "O desenvolvedor envia o código ao repositório." }, { t: "Build", d: "O código é compilado e empacotado (imagem)." }, { t: "Testes automáticos", d: "Unitários, integração e análise estática." }, { t: "Publicação do artefato", d: "A imagem vai para o registry." }, { t: "Implantação", d: "Entrega em homologação e produção." }, { t: "Monitoramento", d: "Métricas e alertas alimentam a próxima iteração." }] },
    { tipo: "classificar", id: "v5-vm", titulo: "Jogo: máquina virtual ou container?", instr: "Associe a característica.", cats: ["Máquina virtual", "Container"],
      itens: [["Possui sistema operacional convidado próprio", 0], ["Compartilha o kernel do hospedeiro", 1], ["Inicia em segundos e é mais leve", 1], ["Isolamento mais forte por emular hardware", 0], ["Executa sobre um hipervisor", 0], ["É criado a partir de uma imagem em camadas", 1]] },
    { tipo: "classificar", id: "v5-ent", titulo: "Jogo: integração, entrega ou implantação contínua?", instr: "Classifique.", cats: ["Integração contínua", "Entrega contínua", "Implantação contínua"],
      itens: [["Cada commit dispara build e testes", 0], ["Sempre pronto para produção, com aprovação manual", 1], ["Vai à produção automaticamente se os testes passam", 2], ["Evita conflitos de merge de longa duração", 0]] }
  ],
  fc: [
    ["Cite as características essenciais da computação em nuvem.", "Autoatendimento sob demanda, amplo acesso pela rede, agrupamento de recursos, elasticidade rápida e serviço medido."],
    ["O que é <b>IaaS</b>?", "Infraestrutura como serviço: máquinas virtuais, rede e armazenamento sob demanda."],
    ["O que é <b>PaaS</b>?", "Plataforma como serviço: ambiente para desenvolver e executar aplicações sem gerenciar a infraestrutura."],
    ["O que é <b>SaaS</b>?", "Software como serviço: aplicação pronta, usada pelo navegador."],
    ["O que é <b>nuvem híbrida</b>?", "Combinação de nuvem privada e pública, com integração entre elas."],
    ["O que é o modelo de <b>responsabilidade compartilhada</b>?", "O provedor protege a infraestrutura da nuvem; o cliente protege dados, acessos e configurações."],
    ["O que é um <b>hipervisor</b>?", "Software que cria e executa máquinas virtuais sobre o hardware."],
    ["Diferença entre imagem e container?", "Imagem é o modelo imutável; container é a instância em execução dessa imagem."],
    ["O que é um <b>pod</b>?", "A menor unidade do Kubernetes: um ou mais containers que compartilham rede e armazenamento."],
    ["O que é <b>infraestrutura como código</b>?", "Descrever e provisionar infraestrutura por arquivos versionados e automatizados."],
    ["Quais os três pilares da observabilidade?", "Logs, métricas e traces."],
    ["O que significa o <b>shift left</b>?", "Antecipar testes e segurança para o início do ciclo de desenvolvimento."]
  ],
  vf: [
    ["No SaaS, o cliente gerencia o sistema operacional do servidor.", false, "Falso. No SaaS o provedor gerencia tudo, da infraestrutura ao software. O cliente cuida de dados, acessos e configuração."],
    ["Containers compartilham o kernel do sistema operacional hospedeiro.", true, "Verdadeiro. Por isso são mais leves que máquinas virtuais, mas o isolamento é menor."],
    ["Uma imagem de container é imutável; alterações valem para novas imagens.", true, "Verdadeiro. O container em execução é descartável."],
    ["Kubernetes é uma ferramenta para criar imagens de container.", false, "Falso. Ele orquestra containers (agenda, escala, reinicia). Imagens são construídas, por exemplo, com Docker."],
    ["A implantação contínua exige aprovação manual antes de ir à produção.", false, "Falso. É a entrega contínua que costuma ter aprovação manual; na implantação contínua o deploy é automático."],
    ["Na nuvem, o provedor é responsável por toda a segurança dos dados do cliente.", false, "Falso. A responsabilidade é compartilhada; dados e acessos são do cliente."],
    ["Elasticidade é a capacidade de aumentar e reduzir recursos conforme a demanda.", true, "Verdadeiro. É uma das promessas centrais da nuvem."],
    ["Infraestrutura como código ajuda a reproduzir ambientes.", true, "Verdadeiro. Ambientes viram arquivos versionados e revisáveis."],
    ["Dados dentro de um container sem volume sobrevivem ao descarte do container.", false, "Falso. Sem volume, os dados somem com o container."],
    ["DevOps é apenas um conjunto de ferramentas.", false, "Falso. É cultura e prática, com ferramentas como apoio."],
    ["Multicloud é usar serviços de mais de um provedor de nuvem.", true, "Verdadeiro. Reduz dependência de um fornecedor, mas aumenta a complexidade."],
    ["Métricas, logs e traces ajudam a entender o comportamento de sistemas em produção.", true, "Verdadeiro. Compõem a observabilidade."]
  ],
  caderno: [
    ["Escolha IaaS, PaaS ou SaaS para: e-mail institucional, hospedagem de uma API própria e um servidor com SO customizado. Justifique.", "E-mail: SaaS. API própria: PaaS (menos gestão). SO customizado: IaaS, pois exige controle da máquina."],
    ["Compare VM e container em isolamento, peso e velocidade.", "VM: isolamento mais forte, mais pesada e inicia em minutos. Container: isolamento por processo, leve e inicia em segundos."],
    ["Explique para que serve cada instrução do Dockerfile: FROM, COPY, RUN, CMD.", "FROM: imagem base. COPY: copia arquivos. RUN: executa comandos na construção. CMD: comando padrão ao iniciar o container."],
    ["Por que usar volumes em containers de banco de dados?", "Porque o sistema de arquivos do container é efêmero; o volume preserva os dados."],
    ["Descreva um pipeline de CI/CD de ponta a ponta.", "Commit, build, testes automáticos, publicação da imagem, implantação em homologação, aprovação, produção e monitoramento."],
    ["O que o Kubernetes faz quando um pod falha?", "O controlador detecta a diferença do estado desejado e cria outro pod para repor as réplicas."],
    ["Dê dois benefícios da infraestrutura como código.", "Reprodutibilidade e versionamento; revisão por pares e menos erros manuais."],
    ["O que é blue-green deployment e para que serve?", "Dois ambientes idênticos; o tráfego é trocado para a nova versão de uma vez, permitindo retorno rápido."],
    ["Cite riscos de segurança em containers e como mitigá-los.", "Imagens com vulnerabilidades, segredos embutidos, execução como root. Mitigar com varredura de imagens, gestão de segredos e privilégio mínimo."],
    ["Explique as vantagens e desvantagens do multicloud.", "Vantagens: evita dependência, resiliência e escolha do melhor serviço. Desvantagens: complexidade, custo de integração e competências diversas."]
  ],
  pbl: [
    { titulo: "Pico de acessos no dia da matrícula", cenario: "O sistema de matrícula cai todo ano no primeiro dia, porque o servidor único não aguenta.",
      passos: [["Que recursos de nuvem resolveriam?", "Escala horizontal automática com balanceador de carga, cache e banco gerenciado com réplicas de leitura."], ["Como controlar o custo?", "Definir limites de escala, desligar o excedente após o pico e monitorar gastos com alertas."]] },
    { titulo: "Funciona na minha máquina", cenario: "Uma aplicação roda na máquina do desenvolvedor, mas falha em produção por diferenças de versões.",
      passos: [["Como containers ajudam?", "A imagem empacota aplicação e dependências, garantindo o mesmo ambiente em desenvolvimento e produção."], ["Que práticas complementam?", "Versionar o Dockerfile, usar CI para construir a imagem e infraestrutura como código para o ambiente."]] },
    { titulo: "Migrar para a nuvem", cenario: "Uma prefeitura quer migrar seus sistemas para a nuvem.",
      passos: [["Que critérios avaliar antes?", "Classificação dos dados, requisitos legais (LGPD), custo total, latência, dependência do fornecedor e capacitação."], ["Que estratégia de migração propor?", "Migração gradual, começando por sistemas de menor risco, com plano de rollback e treinamento."]] }
  ],
  resumo: [
    { t: "Ideias-chave", itens: ["IaaS, PaaS e SaaS diferem pelo que o cliente gerencia.", "Container compartilha o kernel; VM tem SO próprio.", "Kubernetes orquestra; Docker constrói e executa.", "CI integra, entrega contínua deixa pronto, implantação contínua publica sozinha.", "Segurança na nuvem é responsabilidade compartilhada."] },
    { t: "Erros comuns", itens: ["Achar que o provedor cuida de tudo.", "Confundir entrega com implantação contínua.", "Esquecer volumes para dados persistentes."] }
  ],
  glossario: [["IaaS", "Infraestrutura como serviço."], ["PaaS", "Plataforma como serviço."], ["SaaS", "Software como serviço."], ["Hipervisor", "Software que executa VMs."], ["Container", "Processo isolado que compartilha o kernel."], ["Pod", "Menor unidade do Kubernetes."], ["CI/CD", "Integração e entrega/implantação contínuas."], ["IaC", "Infraestrutura como código."]]
});
