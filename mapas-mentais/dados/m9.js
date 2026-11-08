FSI.modulo({
  n: 9, unidade: "Revisão visual", nome: "IA e Tecnologias Emergentes", titulo: "Inteligência artificial e tecnologias emergentes",
  resumoCurto: "IA, aprendizado de máquina, redes neurais, IA generativa e LLMs, ética, IoT, blockchain, edge, 5G, computação quântica e cidades inteligentes.",
  objetivos: ["Diferenciar IA, aprendizado de máquina e aprendizado profundo.", "Comparar aprendizado supervisionado, não supervisionado e por reforço e interpretar métricas.", "Explicar IA generativa, LLMs, RAG e riscos como viés e alucinação.", "Reconhecer IoT, blockchain, edge, 5G, computação quântica e seus usos."],
  licoes: [
    { t: "IA, aprendizado de máquina e profundo", txt: "<p><b>Inteligência artificial</b> é o campo amplo de sistemas que realizam tarefas que exigem inteligência. O <b>aprendizado de máquina</b> (ML) é um subconjunto em que o sistema aprende padrões dos dados. O <b>aprendizado profundo</b> (deep learning) usa redes neurais com muitas camadas.</p>", pontos: ["<b>Supervisionado</b>: dados rotulados (classificação e regressão). <b>Não supervisionado</b>: sem rótulos (agrupamento, redução de dimensão). <b>Por reforço</b>: o agente aprende por recompensas.", "<b>Overfitting</b>: o modelo decora o treino e generaliza mal; <b>underfitting</b>: é simples demais.", "Dados divididos em treino, validação e teste.", "Métricas: <b>acurácia</b>, <b>precisão</b> (dos positivos previstos, quantos eram reais), <b>recall</b> (dos positivos reais, quantos foram achados) e <b>F1</b>."], pense: "Em um teste de doença rara, por que acurácia alta pode enganar?" },
    { t: "IA generativa e ética", txt: "<p>Os <b>modelos de linguagem de grande porte (LLMs)</b>, baseados em arquitetura <i>transformer</i>, geram texto prevendo o próximo trecho. A <b>IA generativa</b> também cria imagens, áudio e código. O <b>prompt</b> orienta o modelo; a técnica <b>RAG</b> consulta uma base de documentos para fundamentar a resposta.</p>", pontos: ["<b>Alucinação</b>: o modelo produz resposta plausível, mas falsa. Verificar fontes é essencial.", "<b>Viés</b>: dados de treino enviesados geram resultados injustos.", "Princípios éticos: transparência, justiça, responsabilidade, privacidade e supervisão humana.", "Dados pessoais em prompts podem violar a LGPD; é preciso governança do uso de IA."] },
    { t: "Tecnologias emergentes", txt: "<p>A <b>Internet das Coisas (IoT)</b> conecta objetos com sensores e atuadores. A <b>computação de borda (edge)</b> processa os dados perto da origem para reduzir a latência. O <b>5G</b> oferece alta velocidade, baixa latência e muitos dispositivos por área.</p>", pontos: ["<b>Blockchain</b>: livro-razão distribuído, imutável e encadeado por hashes, com consenso entre os nós.", "<b>Computação quântica</b>: usa qubits (superposição e entanglement) e ameaça a criptografia assimétrica atual, motivando a criptografia pós-quântica.", "<b>Gêmeo digital</b>: réplica virtual de um objeto ou processo, alimentada por dados reais.", "<b>Cidades inteligentes</b> integram IoT, dados e serviços para melhorar a vida urbana.", "RPA automatiza tarefas repetitivas; <i>low-code</i> acelera o desenvolvimento."] }
  ],
  visuais: [
    { tipo: "camadas", id: "v9-ia", titulo: "IA, aprendizado de máquina e aprendizado profundo", forma: "pilha", h: 300, instr: "Cada nível é um subconjunto do anterior. Clique para ver.",
      camadas: [{ t: "Inteligência artificial", d: "Campo amplo: sistemas que realizam tarefas que exigem inteligência.", ex: "sistemas especialistas, planejamento, visão" }, { t: "Aprendizado de máquina", d: "O sistema aprende padrões a partir de dados em vez de regras escritas à mão.", ex: "árvores de decisão, SVM, regressão" }, { t: "Aprendizado profundo", d: "Redes neurais de muitas camadas, ótimas para imagem, voz e texto.", ex: "CNNs, transformers" }, { t: "IA generativa", d: "Modelos profundos que criam conteúdo novo.", ex: "LLMs, geradores de imagem" }] },
    { tipo: "rede", id: "v9-ml", titulo: "Tipos de aprendizado de máquina", h: 420, instr: "Clique e compare os paradigmas.",
      nos: [{ id: "m", x: 360, y: 200, t: "Aprendizado\nde máquina", d: "Aprender padrões com dados." }, { id: "s", x: 360, y: 50, t: "Supervisionado", d: "Dados rotulados. Classificação (spam ou não) e regressão (prever preço)." }, { id: "n", x: 110, y: 320, t: "Não supervisionado", d: "Sem rótulos. Agrupamento de clientes, detecção de anomalias." }, { id: "r", x: 610, y: 320, t: "Por reforço", d: "Um agente interage com o ambiente e aprende por recompensas e punições." }],
      liga: [["m", "s"], ["m", "n"], ["m", "r"]] },
    { tipo: "linha", id: "v9-pipe", titulo: "Ciclo de um projeto de aprendizado de máquina", ordenar: true, instr: "Percorra o ciclo e depois ordene.",
      passos: [{ t: "Definir o problema", d: "O que prever e como medir o sucesso." }, { t: "Coletar e preparar os dados", d: "Limpar, tratar ausentes e dividir em treino, validação e teste." }, { t: "Treinar o modelo", d: "Ajustar parâmetros aos dados de treino." }, { t: "Avaliar", d: "Medir com métricas nos dados de teste; verificar overfitting e viés." }, { t: "Implantar", d: "Colocar em produção." }, { t: "Monitorar", d: "Acompanhar a deriva dos dados e o desempenho." }] },
    { tipo: "classificar", id: "v9-ml2", titulo: "Jogo: qual paradigma de aprendizado?", instr: "Associe.", cats: ["Supervisionado", "Não supervisionado", "Por reforço"],
      itens: [["Prever o preço de imóveis com exemplos rotulados", 0], ["Agrupar clientes em segmentos sem rótulos", 1], ["Robô que aprende a andar por tentativa e recompensa", 2], ["Classificar e-mails em spam ou não spam", 0], ["Detectar transações anômalas sem exemplos de fraude", 1], ["Jogador virtual que aprende a vencer um jogo", 2]] },
    { tipo: "classificar", id: "v9-tec", titulo: "Jogo: que tecnologia resolve?", instr: "Associe a necessidade.", cats: ["IoT", "Edge", "Blockchain", "Gêmeo digital"],
      itens: [["Sensores que medem a umidade do solo", 0], ["Processar vídeo de câmeras perto do local para baixa latência", 1], ["Registro imutável e distribuído de transações", 2], ["Réplica virtual de uma fábrica para simular cenários", 3], ["Atuador que abre uma válvula de irrigação", 0], ["Reduzir o envio de dados à nuvem", 1]] }
  ],
  fc: [
    ["Qual a relação entre IA, ML e aprendizado profundo?", "Aprendizado profundo ⊂ aprendizado de máquina ⊂ inteligência artificial."],
    ["O que é aprendizado <b>supervisionado</b>?", "Treinar com dados rotulados para prever classes ou valores."],
    ["O que é aprendizado <b>não supervisionado</b>?", "Encontrar padrões em dados sem rótulos, como agrupamentos."],
    ["O que é aprendizado <b>por reforço</b>?", "Um agente aprende por recompensas e punições ao interagir com o ambiente."],
    ["O que é <b>overfitting</b>?", "O modelo se ajusta demais ao treino e generaliza mal para dados novos."],
    ["Defina <b>precisão</b> e <b>recall</b>.", "Precisão: dos previstos como positivos, quantos eram. Recall: dos positivos reais, quantos foram encontrados."],
    ["O que é um <b>LLM</b>?", "Modelo de linguagem de grande porte, treinado em muito texto para gerar e compreender linguagem."],
    ["O que é <b>alucinação</b> em IA generativa?", "Resposta plausível, porém falsa ou inventada."],
    ["O que é <b>RAG</b>?", "Geração aumentada por recuperação: o modelo consulta uma base de documentos para fundamentar a resposta."],
    ["O que é <b>IoT</b>?", "Rede de objetos físicos com sensores e conectividade que coletam e trocam dados."],
    ["Qual a vantagem da <b>computação de borda</b>?", "Menor latência e menos tráfego para a nuvem, ao processar os dados perto da origem."],
    ["Por que a computação quântica preocupa a criptografia?", "Algoritmos quânticos podem quebrar a criptografia assimétrica atual, o que estimula a criptografia pós-quântica."]
  ],
  vf: [
    ["Todo sistema de aprendizado de máquina é aprendizado profundo.", false, "Falso. O aprendizado profundo é um subconjunto, que usa redes neurais de muitas camadas."],
    ["No aprendizado supervisionado, os dados de treino têm rótulos.", true, "Verdadeiro. O modelo aprende a relação entre entradas e rótulos."],
    ["Alta acurácia garante um bom modelo mesmo com classes muito desbalanceadas.", false, "Falso. Em doenças raras, um modelo que sempre diz “saudável” tem alta acurácia, mas é inútil; precisão, recall e F1 são essenciais."],
    ["O overfitting ocorre quando o modelo vai bem no treino e mal nos dados novos.", true, "Verdadeiro. Ele memoriza os dados de treino."],
    ["LLMs sempre dizem a verdade, pois são treinados com muitos dados.", false, "Falso. Eles podem alucinar; as respostas precisam ser verificadas."],
    ["Viés nos dados de treino pode gerar resultados discriminatórios.", true, "Verdadeiro. Por isso a avaliação de justiça e a diversidade dos dados são importantes."],
    ["O blockchain é um registro distribuído e encadeado por hashes.", true, "Verdadeiro. Alterar um bloco quebra os hashes seguintes."],
    ["O processamento na borda aumenta a latência.", false, "Falso. Ao processar perto da fonte, reduz a latência."],
    ["Inserir dados pessoais de terceiros em ferramentas de IA públicas não traz risco algum.", false, "Falso. Pode haver compartilhamento indevido e violação da LGPD."],
    ["O 5G oferece baixa latência e comporta mais dispositivos conectados.", true, "Verdadeiro. Isso viabiliza aplicações de IoT em larga escala."],
    ["Um gêmeo digital é uma réplica virtual alimentada por dados reais.", true, "Verdadeiro. Permite monitorar e simular cenários."],
    ["Supervisão humana é irrelevante em decisões automatizadas de alto impacto.", false, "Falso. É um princípio ético e legal importante, como o direito à revisão."]
  ],
  caderno: [
    ["Dê um exemplo de aplicação para cada tipo de aprendizado: supervisionado, não supervisionado e por reforço.", "Supervisionado: classificar spam. Não supervisionado: segmentar clientes. Por reforço: um robô aprende a se locomover."],
    ["Um teste para uma doença que afeta 1% da população diz que todos são saudáveis. Qual a acurácia e por que o modelo é ruim?", "Acurácia de 99%, mas o recall é 0: nenhum doente é identificado. Em casos assim, usar recall, precisão e F1."],
    ["Explique overfitting e três formas de reduzi-lo.", "Mais dados, regularização, simplificar o modelo, validação cruzada e parada antecipada."],
    ["O que são treino, validação e teste?", "Treino ajusta o modelo, validação ajusta hiperparâmetros e teste mede o desempenho final em dados nunca vistos."],
    ["Explique como o RAG reduz alucinações.", "Busca trechos relevantes em uma base confiável e os fornece ao modelo como contexto, de modo que a resposta se baseie em fontes verificáveis."],
    ["Liste cuidados ao usar IA generativa em uma escola.", "Não inserir dados pessoais, verificar as respostas, citar o uso, definir regras de uso acadêmico e promover o pensamento crítico."],
    ["Como o viés pode surgir em um modelo de seleção de candidatos?", "Se o histórico de contratações tem preconceitos, o modelo os aprende e reproduz. É necessário auditar os dados e os resultados."],
    ["Explique o funcionamento básico de um blockchain.", "Transações são agrupadas em blocos ligados por hash; os nós validam por consenso; alterar o passado exige refazer os blocos seguintes."],
    ["Dê um exemplo de IoT com edge computing em uma cidade inteligente.", "Câmeras de trânsito que analisam o fluxo localmente e enviam à nuvem apenas os indicadores, ajustando semáforos com baixa latência."],
    ["Por que se fala em criptografia pós-quântica?", "Um computador quântico suficientemente grande poderia quebrar RSA e ECC; novos algoritmos são desenvolvidos para resistir a essa ameaça."]
  ],
  pbl: [
    { titulo: "O chatbot da secretaria", cenario: "Uma escola quer um chatbot com IA para responder dúvidas de pais sobre calendário e matrícula. Em testes, ele inventou uma data de matrícula.",
      passos: [["Que problema ocorreu e por quê?", "Alucinação: o modelo gera respostas plausíveis sem base verificada."], ["Como projetar uma solução confiável?", "Usar RAG com documentos oficiais, citar a fonte, limitar o escopo, encaminhar a um humano em caso de incerteza e registrar as conversas com atenção à LGPD."]] },
    { titulo: "Modelo que reprova alunos", cenario: "Um modelo de previsão de evasão aponta mais risco para alunos de certo bairro, o que gera tratamento diferenciado.",
      passos: [["Que riscos éticos existem?", "Viés e discriminação, estigmatização, decisões sem transparência."], ["O que fazer?", "Auditar os dados e as variáveis, remover atributos proxy, usar o modelo como apoio a ações de acolhimento e manter supervisão humana."]] },
    { titulo: "Sensores na horta da escola", cenario: "Os alunos querem automatizar a irrigação da horta com sensores e uma placa ESP32.",
      passos: [["Desenhe a arquitetura IoT.", "Sensor de umidade, microcontrolador, comunicação Wi-Fi, atuador (relé e válvula) e painel de monitoramento."], ["Que cuidados de segurança e eficiência tomar?", "Credenciais não fixas no código, comunicação cifrada, atualização do firmware e lógica local (edge) para funcionar sem internet."]] }
  ],
  resumo: [
    { t: "Ideias-chave", itens: ["Aprendizado profundo ⊂ ML ⊂ IA.", "Supervisionado usa rótulos; não supervisionado, não; reforço usa recompensas.", "Acurácia pode enganar; use precisão, recall e F1.", "LLMs podem alucinar; RAG ajuda a fundamentar.", "Edge reduz latência; blockchain dá imutabilidade; quântica ameaça criptografia atual."] },
    { t: "Erros comuns", itens: ["Tratar IA, ML e deep learning como sinônimos.", "Confiar cegamente nas respostas de um LLM.", "Esquecer a LGPD ao usar IA com dados pessoais."] }
  ],
  glossario: [["Aprendizado de máquina", "Aprender padrões a partir de dados."], ["Overfitting", "Ajuste excessivo ao treino."], ["LLM", "Modelo de linguagem de grande porte."], ["RAG", "Geração aumentada por recuperação."], ["Alucinação", "Resposta plausível, mas falsa."], ["IoT", "Internet das Coisas."], ["Edge", "Computação de borda."], ["Gêmeo digital", "Réplica virtual alimentada por dados reais."]]
});
