FSI.modulo({
  n: 4, unidade: "Revisão visual", nome: "Segurança da Informação e Cibersegurança", titulo: "Segurança da informação e cibersegurança",
  resumoCurto: "Tríade CIA, ameaças e vulnerabilidades, criptografia, ataques, controles, gestão de riscos e normas ISO 27001 e 27002.",
  objetivos: ["Aplicar os princípios de confidencialidade, integridade, disponibilidade, autenticidade e não repúdio.", "Distinguir ameaça, vulnerabilidade, risco e incidente.", "Comparar criptografia simétrica, assimétrica, hash e assinatura digital.", "Reconhecer ataques comuns e os controles que os mitigam."],
  licoes: [
    { t: "Princípios e conceitos", txt: "<p>A tríade <b>CIA</b> é formada por <b>confidencialidade</b> (só quem tem direito acessa), <b>integridade</b> (a informação não é alterada indevidamente) e <b>disponibilidade</b> (acessível quando necessário). Somam-se a <b>autenticidade</b> (a origem é verdadeira) e o <b>não repúdio</b> (o autor não pode negar a autoria).</p>", pontos: ["<b>Ameaça</b>: causa potencial de um incidente. <b>Vulnerabilidade</b>: fraqueza que pode ser explorada. <b>Risco</b>: probabilidade de a ameaça explorar a vulnerabilidade e o impacto resultante.", "<b>Incidente</b>: evento que compromete a segurança.", "<b>Controles</b> podem ser preventivos, detectivos e corretivos.", "A <b>trilha de auditoria</b> e o carimbo de tempo sustentam a responsabilização."], pense: "Um ataque de negação de serviço fere qual princípio?" },
    { t: "Criptografia", txt: "<p>A criptografia <b>simétrica</b> usa a mesma chave para cifrar e decifrar (rápida; ex.: AES), mas exige compartilhar a chave. A <b>assimétrica</b> usa um par de chaves, pública e privada (ex.: RSA). A <b>função de hash</b> gera um resumo de tamanho fixo e não é reversível (ex.: SHA-256).</p>", pontos: ["Confidencialidade: cifra-se com a chave <b>pública</b> do destinatário; só a privada dele decifra.", "<b>Assinatura digital</b>: o remetente assina com a sua chave <b>privada</b>; qualquer um verifica com a pública. Garante autenticidade, integridade e não repúdio.", "<b>Certificado digital</b> liga uma chave pública a uma identidade, emitido por uma autoridade certificadora (ICP-Brasil, no Brasil).", "No TLS, a troca de chaves assimétrica estabelece uma chave simétrica de sessão."], pense: "Para enviar uma mensagem sigilosa a Ana, qual chave você usa para cifrar?" },
    { t: "Ataques, defesas e gestão", txt: "<p>Entre os ataques frequentes estão <b>phishing</b> e engenharia social, <b>malware</b> (vírus, worm, trojan, ransomware), <b>DoS e DDoS</b>, <b>SQL injection</b>, <b>XSS</b> e <b>man-in-the-middle</b>. A defesa combina camadas de controle (defesa em profundidade).</p>", pontos: ["<b>Firewall</b> filtra tráfego; <b>IDS</b> detecta e <b>IPS</b> bloqueia; <b>WAF</b> protege aplicações web; <b>SIEM</b> correlaciona logs.", "<b>MFA</b> combina fatores: algo que se sabe, se tem e se é.", "<b>ISO/IEC 27001</b> define um sistema de gestão de segurança (SGSI); a <b>27002</b> traz o catálogo de controles.", "<b>BCP</b> e <b>DRP</b> tratam de continuidade de negócios e recuperação de desastres; backup só vale se puder ser restaurado."] }
  ],
  visuais: [
    { tipo: "rede", id: "v4-cia", titulo: "Tríade CIA e propriedades associadas", h: 420, instr: "Clique em cada princípio e veja o exemplo de violação.",
      nos: [{ id: "s", x: 360, y: 200, t: "Segurança da\ninformação", d: "Proteção da informação contra acesso, alteração e indisponibilidade indevidos." }, { id: "c", x: 360, y: 50, t: "Confidencialidade", d: "Só quem está autorizado vê. Violação: vazamento de dados." }, { id: "i", x: 110, y: 320, t: "Integridade", d: "A informação não é alterada indevidamente. Violação: adulteração de um registro." }, { id: "d", x: 610, y: 320, t: "Disponibilidade", d: "O serviço está acessível quando preciso. Violação: ataque DDoS ou falha sem backup." }, { id: "a", x: 110, y: 130, t: "Autenticidade", d: "A origem e o autor são genuínos." }, { id: "n", x: 610, y: 130, t: "Não repúdio", d: "O autor não consegue negar a autoria (assinatura digital, logs)." }],
      liga: [["s", "c"], ["s", "i"], ["s", "d"], ["s", "a"], ["s", "n"]] },
    { tipo: "linha", id: "v4-risco", titulo: "Da ameaça ao incidente", ordenar: true, instr: "Veja como os conceitos se encadeiam e depois monte a ordem.",
      passos: [{ t: "Ativo", d: "O que tem valor: dados, sistema, pessoas." }, { t: "Vulnerabilidade", d: "Fraqueza no ativo: senha fraca, sistema sem correção." }, { t: "Ameaça", d: "Agente ou evento capaz de explorar a fraqueza: um atacante, um malware." }, { t: "Risco", d: "Combinação de probabilidade e impacto." }, { t: "Incidente", d: "A ameaça explora a vulnerabilidade e causa dano." }, { t: "Tratamento", d: "Mitigar, transferir, evitar ou aceitar o risco." }] },
    { tipo: "classificar", id: "v4-cripto", titulo: "Jogo: qual técnica criptográfica?", instr: "Associe cada situação à técnica.", cats: ["Simétrica", "Assimétrica", "Hash"],
      itens: [["AES com a mesma chave nos dois lados", 0], ["Cifrar com a chave pública do destinatário", 1], ["Verificar a integridade de um arquivo baixado", 2], ["Assinatura digital do remetente", 1], ["Armazenar senhas de forma não reversível (com sal)", 2], ["Cifrar um disco inteiro de forma rápida", 0]] },
    { tipo: "classificar", id: "v4-ataque", titulo: "Jogo: qual princípio o ataque fere?", instr: "Classifique o ataque ou incidente.", cats: ["Confidencialidade", "Integridade", "Disponibilidade"],
      itens: [["Vazamento de uma base de clientes", 0], ["Alteração de notas no banco de dados", 1], ["Ransomware que cifra os servidores", 2], ["Espionagem de tráfego sem cifra", 0], ["DDoS que tira o site do ar", 2], ["Modificação de um contrato assinado", 1]] }
  ],
  fc: [
    ["O que compõe a tríade <b>CIA</b>?", "Confidencialidade, integridade e disponibilidade."],
    ["O que é <b>não repúdio</b>?", "Impossibilidade de o autor negar a autoria de uma ação ou documento."],
    ["Diferença entre ameaça e vulnerabilidade?", "Ameaça é a causa potencial do dano; vulnerabilidade é a fraqueza que pode ser explorada."],
    ["O que é <b>risco</b>?", "A combinação da probabilidade de uma ameaça explorar uma vulnerabilidade com o impacto resultante."],
    ["Que chave se usa para cifrar para um destinatário?", "A chave pública dele; só a privada dele decifra."],
    ["O que a <b>assinatura digital</b> garante?", "Autenticidade, integridade e não repúdio."],
    ["O que é uma função de <b>hash</b>?", "Gera um resumo de tamanho fixo a partir dos dados, sem reversão, sensível a qualquer alteração."],
    ["Diferença entre IDS e IPS?", "IDS detecta e alerta; IPS detecta e bloqueia."],
    ["O que é <b>defesa em profundidade</b>?", "Várias camadas de controle independentes, para que a falha de uma não comprometa tudo."],
    ["Quais os três fatores de autenticação?", "Algo que você sabe, algo que você tem e algo que você é."],
    ["O que é <b>ransomware</b>?", "Malware que cifra os dados e exige resgate para devolvê-los."],
    ["Para que serve a ISO/IEC 27001?", "Estabelece requisitos de um sistema de gestão de segurança da informação (SGSI)."]
  ],
  vf: [
    ["Um ataque DDoS afeta principalmente a disponibilidade.", true, "Verdadeiro. Ele sobrecarrega o serviço, tornando-o indisponível."],
    ["A criptografia simétrica usa um par de chaves distintas.", false, "Falso. Usa a mesma chave. O par de chaves é da assimétrica."],
    ["A assinatura digital é feita com a chave privada do remetente.", true, "Verdadeiro. Qualquer um verifica com a chave pública correspondente."],
    ["Uma função de hash pode ser revertida para recuperar o original.", false, "Falso. Hash é unidirecional; pode ser atacado por força bruta ou tabelas, mas não é uma cifra."],
    ["Phishing é um tipo de engenharia social.", true, "Verdadeiro. Engana a vítima, geralmente por mensagem falsa, para obter dados ou ações."],
    ["Vulnerabilidade e ameaça são sinônimos.", false, "Falso. Vulnerabilidade é a fraqueza; ameaça é o que pode explorá-la."],
    ["O IPS pode bloquear o tráfego malicioso automaticamente.", true, "Verdadeiro. Ele atua em linha e pode descartar pacotes ou conexões."],
    ["Backup que nunca foi testado garante a recuperação.", false, "Falso. Só vale se for restaurável; teste de restauração faz parte do plano."],
    ["MFA é a combinação de dois ou mais fatores de autenticação diferentes.", true, "Verdadeiro. Duas senhas continuam sendo um único fator (conhecimento)."],
    ["SQL injection explora entradas não tratadas de uma aplicação.", true, "Verdadeiro. Previne-se com consultas parametrizadas e validação."],
    ["O certificado digital vincula uma chave pública a uma identidade.", true, "Verdadeiro. É emitido por uma autoridade certificadora confiável."],
    ["A ISO 27002 é a norma de requisitos certificáveis do SGSI.", false, "Falso. A certificável é a 27001; a 27002 é o guia de controles."]
  ],
  caderno: [
    ["Dê um exemplo de violação de cada princípio da tríade CIA.", "Confidencialidade: vazamento de base de dados. Integridade: adulteração de notas. Disponibilidade: DDoS ou ransomware que paralisa servidores."],
    ["Explique, passo a passo, como a assinatura digital funciona.", "Calcula-se o hash do documento; o remetente cifra o hash com a chave privada; o destinatário decifra com a pública e compara com o hash calculado por ele."],
    ["Por que o HTTPS usa criptografia assimétrica e simétrica juntas?", "A assimétrica estabelece a chave com segurança, mas é lenta; a simétrica, rápida, cifra o volume de dados da sessão."],
    ["Cite três medidas contra phishing.", "Treinamento de usuários, filtros de e-mail e MFA, além de verificar remetentes e links antes de clicar."],
    ["Diferencie controles preventivos, detectivos e corretivos com exemplos.", "Preventivo: firewall, senha forte. Detectivo: IDS, logs. Corretivo: restauração de backup, correção de falha."],
    ["Como armazenar senhas de forma segura?", "Com hash lento e adequado (bcrypt, scrypt, Argon2) com sal individual; nunca em texto claro nem com hash simples."],
    ["O que é a análise de riscos e quais as opções de tratamento?", "Identificar ativos, ameaças, vulnerabilidades, probabilidade e impacto. Tratar: mitigar, transferir (seguro), evitar ou aceitar."],
    ["Qual a diferença entre BCP e DRP?", "BCP mantém o negócio funcionando durante uma crise; DRP restaura os sistemas de TI após um desastre."],
    ["Explique a regra 3-2-1 de backup.", "Três cópias, em duas mídias diferentes, com uma delas fora do local."],
    ["O que é um pentest e para que serve?", "Teste de intrusão autorizado que simula um atacante para encontrar vulnerabilidades antes de serem exploradas."]
  ],
  pbl: [
    { titulo: "Arquivos cifrados na segunda-feira", cenario: "Ao chegar, a secretaria encontra todos os arquivos do servidor renomeados e uma mensagem pedindo resgate.",
      passos: [["Quais as primeiras ações de resposta ao incidente?", "Isolar as máquinas da rede, preservar evidências, acionar o plano de resposta e comunicar a gestão. Não pagar de imediato; avaliar a restauração de backup."], ["Que controles teriam prevenido ou reduzido o dano?", "Backups offline testados, atualização de sistemas, segmentação de rede, EDR, privilégio mínimo e treinamento contra phishing."]] },
    { titulo: "Login no sistema da escola", cenario: "O sistema acadêmico aceita senhas fracas e armazena as senhas com MD5 sem sal.",
      passos: [["Aponte os problemas.", "Hash fraco e sem sal permite quebra rápida; falta de política de senha e de MFA aumenta o risco de acesso indevido."], ["Proponha melhorias.", "Migrar para Argon2 ou bcrypt com sal, exigir MFA, bloquear tentativas repetidas e registrar acessos."]] },
    { titulo: "Plano de continuidade", cenario: "Uma prefeitura depende de um único servidor sem cópia. Uma falha elétrica pode parar a arrecadação.",
      passos: [["Identifique os ativos críticos e o impacto.", "Mapear sistemas e processos essenciais, definir RTO e RPO aceitáveis e o custo da parada."], ["Proponha controles.", "Redundância, nobreak, backup 3-2-1 com teste de restauração e um DRP documentado e ensaiado."]] }
  ],
  resumo: [
    { t: "Ideias-chave", itens: ["CIA mais autenticidade e não repúdio.", "Risco = ameaça × vulnerabilidade × impacto, em termos práticos.", "Cifra-se com a chave pública do destino; assina-se com a privada do remetente.", "Hash não é reversível.", "27001 certifica o SGSI; 27002 lista controles."] },
    { t: "Erros comuns", itens: ["Trocar chave pública e privada.", "Confundir ameaça com vulnerabilidade.", "Achar que backup sem teste basta."] }
  ],
  glossario: [["Confidencialidade", "Acesso só a quem tem direito."], ["Integridade", "Dados sem alteração indevida."], ["Disponibilidade", "Acesso quando necessário."], ["Não repúdio", "Autor não pode negar a ação."], ["Hash", "Resumo de tamanho fixo e unidirecional."], ["Phishing", "Golpe que imita fontes confiáveis."], ["SGSI", "Sistema de gestão de segurança da informação."], ["MFA", "Autenticação multifator."]]
});
