FSI.modulo({
  n: 2, unidade: "Revisão visual", nome: "Banco de Dados, BI e Dados", titulo: "Banco de dados, BI e dados",
  resumoCurto: "SGBD, modelo relacional, SQL, transações e ACID, índices, NoSQL, data warehouse, BI e big data.",
  objetivos: ["Explicar o papel do SGBD e a arquitetura em três níveis.", "Aplicar chaves e integridade referencial e escrever consultas SQL com junções e agregações.", "Relacionar ACID, níveis de isolamento, bloqueios e MVCC.", "Distinguir OLTP e OLAP, data warehouse, data lake e as bases NoSQL."],
  licoes: [
    { t: "Modelo relacional e SQL", txt: "<p>O modelo relacional organiza dados em tabelas. Uma <b>chave primária</b> identifica cada linha e uma <b>chave estrangeira</b> referencia a chave primária de outra tabela, garantindo a <b>integridade referencial</b>. O SQL se divide em DDL (estrutura), DML (manipulação), DQL (consulta), DCL (permissões) e TCL (transações).</p>", pontos: ["<b>DDL</b>: CREATE, ALTER, DROP, TRUNCATE. <b>DML</b>: INSERT, UPDATE, DELETE. <b>DQL</b>: SELECT. <b>DCL</b>: GRANT, REVOKE. <b>TCL</b>: COMMIT, ROLLBACK, SAVEPOINT.", "<b>INNER JOIN</b> traz apenas correspondências; <b>LEFT JOIN</b> mantém todas as linhas da tabela da esquerda, com NULL onde não há par.", "<b>WHERE</b> filtra linhas antes de agrupar; <b>HAVING</b> filtra grupos depois da agregação.", "Comparar com NULL exige <code>IS NULL</code>; <code>= NULL</code> nunca é verdadeiro."], pense: "Quais clientes nunca fizeram pedido? Qual junção e qual filtro você usaria?" },
    { t: "Transações, isolamento e desempenho", txt: "<p>Uma transação segue o <b>ACID</b>: atomicidade (tudo ou nada), consistência (de um estado válido a outro), isolamento (transações concorrentes não se enxergam pela metade) e durabilidade (depois do commit, persiste).</p>", pontos: ["Anomalias: <b>leitura suja</b> (dados não confirmados), <b>não repetível</b> (a linha muda entre duas leituras) e <b>fantasma</b> (novas linhas aparecem no filtro).", "Níveis: read uncommitted, read committed, repeatable read e serializable; quanto mais isolamento, maior o custo de concorrência.", "<b>Deadlock</b>: duas transações esperam uma pela outra. <b>MVCC</b> mantém várias versões para leitores não bloquearem escritores.", "<b>Índices</b> aceleram consultas, mas custam espaço e desaceleram escritas. O <b>plano de execução</b> mostra como o otimizador escolhe o caminho."] },
    { t: "NoSQL, data warehouse e BI", txt: "<p>Sistemas <b>OLTP</b> registram operações do dia a dia, normalizados. Sistemas <b>OLAP</b> e o <b>data warehouse</b> respondem perguntas analíticas sobre dados históricos e integrados, em geral no <b>modelo dimensional</b> (fatos e dimensões, esquema estrela).</p>", pontos: ["<b>ETL</b>: extrair, transformar e carregar os dados no DW.", "OLAP: <b>drill-down</b> (detalhar), <b>roll-up</b> (agregar), <b>slice</b> e <b>dice</b>.", "<b>Data lake</b> guarda dados brutos de qualquer formato; sem governança vira <b>data swamp</b>.", "NoSQL: chave-valor, documentos, colunas largas e grafos. O teorema <b>CAP</b> diz que, com partição de rede, escolhe-se entre consistência e disponibilidade.", "Big data: volume, velocidade, variedade e veracidade."] }
  ],
  visuais: [
    { tipo: "camadas", id: "v2-3niveis", titulo: "Arquitetura em três níveis (ANSI/SPARC)", forma: "pilha", h: 280, instr: "Clique em cada nível. A separação garante independência de dados.",
      camadas: [{ t: "Nível externo (visões)", d: "O que cada usuário ou aplicação enxerga.", ex: "uma visão de notas para o professor" }, { t: "Nível conceitual", d: "A estrutura lógica de todo o banco: entidades, relacionamentos e restrições.", ex: "o esquema relacional" }, { t: "Nível interno (físico)", d: "Como os dados são gravados: arquivos, índices, páginas.", ex: "organização em disco" }] },
    { tipo: "rede", id: "v2-acid", titulo: "As quatro propriedades ACID", h: 400, instr: "Clique em cada propriedade e veja o exemplo da transferência bancária.",
      nos: [{ id: "t", x: 360, y: 200, t: "Transação", d: "Uma unidade lógica de trabalho: transferir R$100 da conta A para a conta B." }, { id: "a", x: 360, y: 50, t: "Atomicidade", d: "Ou os dois lançamentos (débito e crédito) acontecem, ou nenhum. Falhou no meio? ROLLBACK." }, { id: "c", x: 90, y: 200, t: "Consistência", d: "As regras valem antes e depois: o total de dinheiro não muda e o saldo não fica inválido." }, { id: "i", x: 630, y: 200, t: "Isolamento", d: "Outra transação concorrente não vê o estado intermediário." }, { id: "d", x: 360, y: 350, t: "Durabilidade", d: "Depois do COMMIT, o resultado sobrevive a falhas (log de transações)." }],
      liga: [["t", "a"], ["t", "c"], ["t", "i"], ["t", "d"]] },
    { tipo: "linha", id: "v2-bi", titulo: "Do dado à decisão: o fluxo de BI", ordenar: true, instr: "Siga o caminho do dado até a decisão e depois monte a sequência.",
      passos: [{ t: "Fontes", d: "Sistemas transacionais, planilhas, APIs." }, { t: "Extração e transformação (ETL)", d: "Limpar, padronizar e integrar." }, { t: "Data warehouse", d: "Armazena dados históricos integrados." }, { t: "Análise (OLAP)", d: "Drill-down, roll-up, slice e dice." }, { t: "Visualização", d: "Painéis e relatórios." }, { t: "Decisão", d: "A informação orienta a ação." }] },
    { tipo: "classificar", id: "v2-sql", titulo: "Jogo: a que grupo do SQL pertence?", instr: "Toque no comando e depois no grupo.", cats: ["DDL", "DML", "DQL", "DCL", "TCL"],
      itens: [["CREATE TABLE", 0], ["INSERT", 1], ["SELECT", 2], ["GRANT", 3], ["COMMIT", 4], ["ALTER TABLE", 0], ["UPDATE", 1], ["REVOKE", 3], ["ROLLBACK", 4]] },
    { tipo: "classificar", id: "v2-nosql", titulo: "Jogo: qual tipo de banco NoSQL?", instr: "Associe cada caso de uso ao modelo mais natural.", cats: ["Chave-valor", "Documento", "Coluna larga", "Grafo"],
      itens: [["Cache de sessões de usuários", 0], ["Catálogo de produtos com atributos variáveis", 1], ["Séries temporais de milhões de sensores", 2], ["Rede social e recomendação de amigos", 3], ["Carrinho de compras temporário", 0], ["Perfis em JSON", 1]] }
  ],
  fc: [
    ["O que é um <b>SGBD</b>?", "Software que gerencia o banco de dados: armazenamento, acesso, segurança, concorrência e recuperação."],
    ["O que são <b>metadados</b>?", "Dados sobre os dados: estrutura, tipos, restrições, estatísticas (guardados no catálogo)."],
    ["O que garante a independência de dados?", "A arquitetura em três níveis: mudar o nível físico não obriga a mudar o lógico, nem as visões."],
    ["Chave primária x chave estrangeira?", "A primária identifica a linha de forma única e não nula; a estrangeira referencia a primária de outra tabela."],
    ["O que é <b>integridade referencial</b>?", "Garantia de que todo valor de chave estrangeira existe na tabela referenciada (ou é nulo)."],
    ["Diferença entre WHERE e HAVING?", "WHERE filtra linhas antes do agrupamento; HAVING filtra grupos depois das agregações."],
    ["O que faz um LEFT JOIN?", "Mantém todas as linhas da esquerda; onde não há par na direita, as colunas vêm NULL."],
    ["O que é uma <b>view materializada</b>?", "Uma consulta cujo resultado é armazenado fisicamente e precisa ser atualizada."],
    ["Defina <b>leitura não repetível</b>.", "Ler a mesma linha duas vezes na transação e obter valores diferentes porque outra transação a alterou e confirmou."],
    ["O que é um <b>deadlock</b>?", "Impasse em que transações esperam bloqueios umas das outras; o SGBD aborta uma delas."],
    ["Quando um <b>índice</b> não ajuda?", "Em tabelas muito pequenas, colunas pouco seletivas ou consultas que não usam a coluna indexada; ele ainda encarece escritas."],
    ["O que diz o <b>teorema CAP</b>?", "Em uma partição de rede, um sistema distribuído tem de escolher entre consistência e disponibilidade."]
  ],
  vf: [
    ["Uma chave estrangeira pode referenciar um valor que não existe na tabela de origem.", false, "Falso. A integridade referencial exige que o valor exista na tabela referenciada (ou seja nulo, se permitido)."],
    ["O comando TRUNCATE é DML.", false, "Falso. É considerado DDL: remove todas as linhas e costuma não ser reversível como um DELETE."],
    ["INNER JOIN retorna apenas as linhas que têm correspondência nas duas tabelas.", true, "Verdadeiro. Linhas sem par são descartadas."],
    ["Em SQL, a expressão coluna = NULL retorna verdadeiro para valores nulos.", false, "Falso. O resultado é desconhecido. Deve-se usar IS NULL."],
    ["O HAVING pode filtrar usando funções de agregação.", true, "Verdadeiro. É a cláusula própria para filtrar grupos, como HAVING COUNT(*) > 5."],
    ["Atomicidade significa que a transação é executada por completo ou não é executada.", true, "Verdadeiro. Em caso de falha, ocorre o rollback."],
    ["O nível SERIALIZABLE é o que permite mais concorrência.", false, "Falso. É o mais rigoroso: evita todas as anomalias, mas reduz a concorrência."],
    ["MVCC mantém múltiplas versões para que leituras não bloqueiem escritas.", true, "Verdadeiro. Cada transação lê a versão adequada ao seu instante."],
    ["Um índice sempre melhora o desempenho, inclusive das escritas.", false, "Falso. Acelera leituras seletivas, mas inserções, atualizações e exclusões precisam manter o índice."],
    ["Um data warehouse é otimizado para registrar transações do dia a dia.", false, "Falso. Isso é OLTP. O DW é otimizado para análise de dados históricos e integrados."],
    ["Um data lake sem governança pode virar um data swamp.", true, "Verdadeiro. Sem catálogo, qualidade e responsáveis, os dados ficam inutilizáveis."],
    ["Bancos NoSQL não podem ter nenhum tipo de consistência.", false, "Falso. Muitos oferecem consistência configurável; a escolha depende do modelo e dos requisitos."]
  ],
  caderno: [
    ["Escreva uma consulta que liste o nome de cada cliente e o total gasto, apenas dos que gastaram mais de R$ 1.000.", "SELECT c.nome, SUM(p.valor) AS total FROM cliente c JOIN pedido p ON p.id_cliente = c.id GROUP BY c.nome HAVING SUM(p.valor) > 1000;"],
    ["Como listar clientes sem nenhum pedido?", "LEFT JOIN de cliente com pedido e filtro WHERE p.id IS NULL; ou NOT EXISTS."],
    ["Explique ACID com o exemplo de uma transferência bancária.", "Atomicidade: débito e crédito juntos. Consistência: soma preservada e regras respeitadas. Isolamento: outra transação não vê o estado intermediário. Durabilidade: após o commit, persiste mesmo com falha."],
    ["Dê um exemplo de leitura suja e como evitá-la.", "A transação B lê um valor alterado por A que depois sofre rollback. Evita-se usando pelo menos o nível read committed."],
    ["Quando criar um índice e quando evitar?", "Criar em colunas muito usadas em filtros, junções e ordenação com boa seletividade. Evitar em tabelas pequenas ou com muitas escritas e baixa seletividade."],
    ["Qual a diferença entre stored procedure, function e trigger?", "Procedure executa um bloco de lógica chamado explicitamente; function retorna um valor e pode ser usada em consultas; trigger dispara automaticamente em eventos de INSERT, UPDATE ou DELETE."],
    ["Compare OLTP e OLAP em três dimensões.", "Objetivo (operar x analisar), dados (atuais e normalizados x históricos e dimensionais), consultas (curtas e frequentes x complexas e agregadas)."],
    ["O que é o esquema estrela?", "Uma tabela de fatos central com medidas, cercada por dimensões desnormalizadas (tempo, produto, cliente)."],
    ["Por que definir o grão da tabela de fatos antes das medidas?", "Porque o grão estabelece o nível de detalhe de cada linha e determina quais dimensões e medidas são possíveis."],
    ["Dê um caso em que escolheria NoSQL e outro em que escolheria relacional.", "NoSQL: catálogo com atributos variáveis ou cache de alta velocidade. Relacional: sistema financeiro com transações e integridade forte."]
  ],
  pbl: [
    { titulo: "Relatório lento na sexta-feira", cenario: "Um relatório de vendas leva 4 minutos. A tabela de pedidos tem 50 milhões de linhas e a consulta filtra por data e cliente.",
      passos: [["Como investigaria a causa?", "Ver o plano de execução, identificar varreduras completas, verificar estatísticas e se há índices nas colunas do filtro e da junção."], ["Que soluções propor e que cuidados tomar?", "Índice composto por data e cliente, particionamento por período, view materializada para agregações. Cuidado com o custo nas escritas e com a manutenção."]] },
    { titulo: "Estoque negativo", cenario: "Duas vendas simultâneas do último item de um produto resultam em estoque -1.",
      passos: [["Que problema de concorrência é esse?", "Uma condição de corrida: as duas transações leram o mesmo saldo antes de qualquer atualização (anomalia de atualização perdida)."], ["Como corrigir?", "Usar bloqueio de linha na leitura (SELECT FOR UPDATE), nível de isolamento adequado e restrição CHECK (estoque >= 0)."]] },
    { titulo: "Painel da diretoria", cenario: "Cada setor tem uma planilha e os números divergem. A diretoria quer um painel único.",
      passos: [["Desenhe a arquitetura de dados.", "Fontes, ETL com regras de limpeza, data warehouse dimensional, camada semântica e painéis. Definir o grão e as dimensões conformadas."], ["Que riscos de governança existem?", "Dados duplicados, definições diferentes de métricas, qualidade e acesso indevido. Resolver com glossário, responsáveis e controle de acesso."]] }
  ],
  resumo: [
    { t: "Ideias-chave", itens: ["SGBD gerencia armazenamento, segurança, concorrência e recuperação.", "Três níveis dão independência de dados.", "SQL: DDL, DML, DQL, DCL e TCL; WHERE antes do grupo, HAVING depois.", "ACID, anomalias de leitura e níveis de isolamento andam juntos.", "DW é analítico e dimensional; data lake guarda dados brutos."] },
    { t: "Erros comuns", itens: ["Comparar com NULL usando igual.", "Achar que índice nunca tem custo.", "Confundir OLTP com OLAP.", "Esquecer a governança do data lake."] }
  ],
  glossario: [["SGBD", "Sistema gerenciador de banco de dados."], ["ACID", "Atomicidade, consistência, isolamento e durabilidade."], ["Deadlock", "Impasse entre transações que se esperam mutuamente."], ["MVCC", "Controle de concorrência por múltiplas versões."], ["ETL", "Extrair, transformar e carregar dados."], ["Data warehouse", "Repositório analítico de dados históricos integrados."], ["OLAP", "Processamento analítico online."], ["Esquema estrela", "Modelo dimensional com fato central e dimensões."]]
});
