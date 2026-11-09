FSI.modulo({
 "n": 12,
 "unidade": "Aprofundamento",
 "nome": "Transações e concorrência",
 "titulo": "Tudo ou nada: transações, ACID e bloqueios",
 "duracao": "4 h",
 "resumoCurto": "ACID, problemas de concorrência, isolamento, bloqueios, deadlock e recuperação",
 "analogia": {
  "titulo": "A transferência bancária",
  "txt": "<p>Transferir R$ 100 de Ana para Beto são dois passos: tirar de Ana e pôr em Beto. Se a luz acabar no meio, o dinheiro não pode sumir. A <b>transação</b> garante que os dois passos acontecem juntos — ou nenhum acontece.</p>"
 },
 "chave": [
  "Transação: unidade lógica de trabalho — tudo ou nada (BEGIN, COMMIT, ROLLBACK).",
  "ACID: Atomicidade, Consistência, Isolamento, Durabilidade.",
  "Problemas: leitura suja, leitura não repetível, leitura fantasma, atualização perdida.",
  "Níveis: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE.",
  "Controle: bloqueios S e X, protocolo 2PL, MVCC (PostgreSQL).",
  "Recuperação: WAL (log antes do dado), REDO, UNDO e checkpoints."
 ],
 "objetivos": [
  "Explicar as propriedades <b>ACID</b>.",
  "Usar <b>BEGIN, COMMIT e ROLLBACK</b>.",
  "Reconhecer <b>problemas de concorrência</b> e níveis de isolamento."
 ],
 "licoes": [
  {
   "t": "ACID",
   "txt": "",
   "pontos": [
    "<b>Atomicidade</b>: tudo ou nada.",
    "<b>Consistência</b>: de um estado válido para outro.",
    "<b>Isolamento</b>: transações simultâneas não se atrapalham.",
    "<b>Durabilidade</b>: confirmado é para sempre (log)."
   ]
  },
  {
   "t": "Concorrência",
   "txt": "<p>Sem controle surgem leitura suja, leitura não repetível, leitura fantasma e atualização perdida. Os níveis de isolamento (READ COMMITTED … SERIALIZABLE), os bloqueios S/X, o 2PL e o MVCC resolvem — com custo de desempenho.</p>"
  }
 ],
 "termos": [
  [
   "Transação",
   "Unidade lógica de trabalho."
  ],
  [
   "COMMIT",
   "Confirma."
  ],
  [
   "ROLLBACK",
   "Desfaz."
  ],
  [
   "Deadlock",
   "Espera circular entre transações."
  ]
 ],
 "ler": [
  [
   "Apostila interativa de Banco de Dados",
   "apostila.html"
  ],
  [
   "Console de estudo (13 módulos, com SQL)",
   "console-de-estudo.html"
  ]
 ],
 "visuais": [
  {
   "tipo": "sequencia",
   "id": "tx",
   "titulo": "Uma transferência com transação",
   "atores": [
    "Aplicação",
    "SGBD",
    "Log (WAL)"
   ],
   "passos": [
    {
     "de": 0,
     "para": 1,
     "t": "BEGIN",
     "d": "Começa a transação."
    },
    {
     "de": 0,
     "para": 1,
     "t": "UPDATE Ana −100",
     "d": "Saldo de Ana diminui (ainda não confirmado)."
    },
    {
     "de": 0,
     "para": 1,
     "t": "UPDATE Beto +100",
     "d": "Saldo de Beto aumenta."
    },
    {
     "de": 1,
     "para": 2,
     "t": "grava no log",
     "d": "O log é escrito antes dos dados (WAL)."
    },
    {
     "de": 0,
     "para": 1,
     "t": "COMMIT",
     "d": "Confirma: agora é durável."
    }
   ]
  }
 ],
 "lab": {
  "intro": "Experimente transações de verdade: comece, altere, desfaça e confirme.",
  "sims": [
   {
    "tipo": "sql",
    "titulo": "Console SQL: BEGIN, COMMIT e ROLLBACK",
    "cfg": {
     "id": "q12",
     "setup": "CREATE TABLE conta (titular TEXT PRIMARY KEY, saldo REAL CHECK (saldo >= 0)); INSERT INTO conta VALUES ('Ana', 500), ('Beto', 200);",
     "inicial": "BEGIN;\nUPDATE conta SET saldo = saldo - 100 WHERE titular = 'Ana';\nUPDATE conta SET saldo = saldo + 100 WHERE titular = 'Beto';\nCOMMIT;\nSELECT * FROM conta;",
     "desafios": [
      {
       "p": "Transfira <b>R$ 100 de Ana para Beto</b> numa transação (rode o exemplo).",
       "ref": "UPDATE conta SET saldo = saldo - 100 WHERE titular = 'Ana'; UPDATE conta SET saldo = saldo + 100 WHERE titular = 'Beto';",
       "verif": "SELECT * FROM conta ORDER BY titular;",
       "dica": "Rode o código que já está no editor.",
       "expl": "Ana 400, Beto 300."
      },
      {
       "p": "Agora comece outra transferência de <b>R$ 50 de Ana para Beto</b>, mas desista: termine com <b>ROLLBACK</b> em vez de COMMIT. Os saldos não devem mudar.",
       "ref": "UPDATE conta SET saldo = saldo - 100 WHERE titular = 'Ana'; UPDATE conta SET saldo = saldo + 100 WHERE titular = 'Beto';",
       "verif": "SELECT * FROM conta ORDER BY titular;",
       "exige": "ROLLBACK",
       "dica": "BEGIN; UPDATE …; UPDATE …; ROLLBACK; SELECT * FROM conta;",
       "expl": "Desfeito: os saldos continuam 400 e 300."
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Execute uma transação",
    "ev": "q12:update"
   },
   {
    "id": "m2",
    "t": "Vença os 2 desafios de transação",
    "ev": "q12:todos"
   },
   {
    "id": "m3",
    "t": "Veja a transferência passo a passo",
    "ev": "vis:tx"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que é uma transação?",
   "Unidade lógica de trabalho: todas as operações são efetivadas ou nenhuma é."
  ],
  [
   "O que significa cada letra de ACID?",
   "Atomicidade, Consistência, Isolamento e Durabilidade."
  ],
  [
   "O que garante a durabilidade?",
   "Depois do COMMIT, os efeitos persistem mesmo com falha (via WAL)."
  ],
  [
   "O que é leitura suja?",
   "Ler um dado alterado por outra transação que ainda não fez COMMIT."
  ],
  [
   "O que é leitura não repetível?",
   "Ler o mesmo dado duas vezes e obter valores diferentes porque outra transação o alterou."
  ],
  [
   "O que é leitura fantasma?",
   "Repetir uma consulta e aparecerem linhas novas inseridas por outra transação."
  ],
  [
   "O que é atualização perdida?",
   "Duas transações leem o mesmo valor e uma gravação sobrescreve a outra."
  ],
  [
   "Qual o nível de isolamento mais rígido?",
   "SERIALIZABLE."
  ],
  [
   "Bloqueio S x bloqueio X?",
   "S (compartilhado) permite leituras simultâneas; X (exclusivo) só permite uma transação."
  ],
  [
   "O que é o protocolo 2PL?",
   "Two-Phase Locking: fase de crescimento (só adquire bloqueios) e de encolhimento (só libera)."
  ],
  [
   "O que é MVCC?",
   "Controle por múltiplas versões: leitores não bloqueiam escritores e cada transação vê um snapshot."
  ],
  [
   "O que é deadlock?",
   "Duas ou mais transações esperando uma pela outra em ciclo, sem ninguém avançar."
  ]
 ],
 "vf": [
  [
   "Na transferência bancária, se o crédito falhar o débito deve ser desfeito.",
   true,
   "É a atomicidade: tudo ou nada."
  ],
  [
   "ROLLBACK confirma as operações da transação.",
   false,
   "ROLLBACK desfaz; quem confirma é COMMIT."
  ],
  [
   "READ COMMITTED impede leitura suja.",
   true,
   "Só enxerga dados já confirmados."
  ],
  [
   "READ COMMITTED impede leitura não repetível.",
   false,
   "Ela ainda pode ocorrer; REPEATABLE READ impede."
  ],
  [
   "SERIALIZABLE impede leitura suja, não repetível e fantasma.",
   true,
   "É o nível mais rígido do padrão SQL."
  ],
  [
   "Dois bloqueios X no mesmo recurso podem coexistir.",
   false,
   "O bloqueio exclusivo é incompatível com qualquer outro."
  ],
  [
   "No MVCC do PostgreSQL, leitores não bloqueiam escritores.",
   true,
   "Cada leitor lê uma versão consistente do dado."
  ],
  [
   "O PostgreSQL detecta deadlocks e aborta uma das transações.",
   true,
   "Usa um grafo de espera e escolhe uma vítima."
  ],
  [
   "Acessar os recursos sempre na mesma ordem ajuda a prevenir deadlocks.",
   true,
   "Evita a formação de ciclos de espera."
  ],
  [
   "No WAL, o dado é gravado em disco antes do registro de log.",
   false,
   "A regra é o inverso: o log é gravado antes do dado."
  ],
  [
   "REDO reaplica transações confirmadas cujos dados podem não ter ido ao disco.",
   true,
   "UNDO desfaz as que não confirmaram."
  ],
  [
   "Transações longas diminuem a chance de conflitos.",
   false,
   "Transações longas seguram bloqueios por mais tempo e aumentam conflitos."
  ]
 ],
 "caderno": [
  [
   "Escreva a transferência de R$ 500 da conta 1001 para a 2002 em uma transação.",
   "<code>BEGIN; UPDATE CONTA SET Saldo = Saldo - 500 WHERE NumConta = 1001; UPDATE CONTA SET Saldo = Saldo + 500 WHERE NumConta = 2002; COMMIT;</code>"
  ],
  [
   "Explique cada propriedade ACID com o exemplo da transferência.",
   "A: débito e crédito juntos. C: soma dos saldos se mantém e saldo não fica negativo. I: outra transação não vê o meio-termo. D: após COMMIT, sobrevive a queda de energia."
  ],
  [
   "Monte a tabela de níveis de isolamento x problemas permitidos.",
   "RU: suja, não repetível, fantasma. RC: não repetível, fantasma. RR: fantasma (PG evita). SER: nenhum."
  ],
  [
   "Descreva em linha do tempo uma atualização perdida no estoque.",
   "T1 lê 10; T2 lê 10; T1 grava 9; T2 grava 9. Dois itens saíram, mas o estoque caiu só 1."
  ],
  [
   "Descreva em linha do tempo uma leitura suja.",
   "T2 altera saldo para 500 sem commit; T1 lê 500; T2 faz ROLLBACK; T1 usou um valor que nunca existiu."
  ],
  [
   "Desenhe um deadlock entre T1 e T2 com os recursos A e B.",
   "T1 bloqueia A e pede B; T2 bloqueia B e pede A; ciclo de espera."
  ],
  [
   "Liste 4 formas de prevenir deadlocks.",
   "Mesma ordem de acesso, transações curtas, bloqueios com timeout, menor escopo de bloqueio."
  ],
  [
   "Como definir o nível SERIALIZABLE para uma transação?",
   "<code>SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;</code> logo após o BEGIN."
  ],
  [
   "Explique REDO, UNDO e checkpoint.",
   "REDO reaplica confirmadas; UNDO desfaz não confirmadas; checkpoint grava páginas sujas e encurta a recuperação."
  ],
  [
   "Compare bloqueio (2PL) com MVCC.",
   "2PL: leitores e escritores podem esperar uns pelos outros. MVCC: versões múltiplas, leituras não bloqueiam, com custo de armazenamento e limpeza (VACUUM)."
  ]
 ],
 "pbl": [
  {
   "titulo": "Vendas de ingressos da feira de ciências",
   "cenario": "O site da feira vende 200 ingressos. No lançamento, 500 pessoas acessaram juntas e o sistema vendeu 214 ingressos.",
   "passos": [
    [
     "Que problema de concorrência ocorreu?",
     "Atualização perdida: várias transações leram o mesmo saldo de ingressos e gravaram por cima."
    ],
    [
     "Como corrigir com SQL?",
     "<code>UPDATE EVENTO SET Restantes = Restantes - 1 WHERE Id = 1 AND Restantes > 0;</code> e conferir linhas afetadas, ou <code>SELECT ... FOR UPDATE</code> dentro da transação."
    ],
    [
     "Que nível de isolamento resolveria sem mudar a lógica?",
     "SERIALIZABLE, tratando erros de serialização com nova tentativa."
    ]
   ]
  },
  {
   "titulo": "Queda de energia no fechamento do caixa",
   "cenario": "Durante o fechamento do caixa da cantina faltou energia. Algumas vendas tinham COMMIT e outras estavam em andamento.",
   "passos": [
    [
     "O que acontece com as vendas já confirmadas?",
     "São mantidas: o SGBD refaz (REDO) a partir do WAL se ainda não estavam no disco."
    ],
    [
     "E as vendas em andamento?",
     "São desfeitas (UNDO), pois não tiveram COMMIT."
    ],
    [
     "Qual propriedade ACID é garantida em cada caso?",
     "Durabilidade para as confirmadas; atomicidade para as incompletas."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Transações",
   "itens": [
    "ACID.",
    "BEGIN, COMMIT, ROLLBACK.",
    "Isolamento, bloqueios, MVCC, WAL."
   ]
  }
 ],
 "glossario": [
  [
   "2PL",
   "Protocolo de bloqueio em duas fases."
  ],
  [
   "MVCC",
   "Controle por múltiplas versões."
  ]
 ]
});
