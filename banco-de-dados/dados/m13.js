FSI.modulo({
 "n": 13,
 "unidade": "Aprofundamento",
 "nome": "Segurança de dados",
 "titulo": "Quem pode ver o quê: permissões, injeção, backup e LGPD",
 "duracao": "4 h",
 "resumoCurto": "DAC, RBAC, MAC, SQL Injection, criptografia, auditoria, backup e LGPD",
 "analogia": {
  "titulo": "Crachás e chaves",
  "txt": "<p>Na escola, o crachá de aluno abre a biblioteca, o de professor abre também a sala dos professores, e só a direção tem a chave do arquivo. No banco é igual: <b>GRANT</b> dá a chave, <b>REVOKE</b> tira, e os <b>papéis</b> (roles) agrupam quem tem as mesmas chaves.</p>"
 },
 "chave": [
  "DAC: o dono concede e revoga com GRANT/REVOKE (padrão SQL).",
  "RBAC: permissões vão para papéis (roles) e usuários recebem papéis.",
  "MAC: classificações e níveis de liberação; no read up, no write down.",
  "SQL Injection: evite com consultas parametrizadas, menor privilégio e validação de entrada.",
  "Criptografia em trânsito (TLS) e em repouso (TDE, disco); senhas com hash + salt (bcrypt, Argon2).",
  "Backup: completo, incremental, diferencial, WAL; regra 3-2-1. LGPD regula dados pessoais no Brasil."
 ],
 "objetivos": [
  "Aplicar <b>GRANT/REVOKE</b> e o <b>menor privilégio</b>.",
  "Prevenir <b>SQL Injection</b>.",
  "Planejar <b>backup 3-2-1</b> e relacionar com a <b>LGPD</b>."
 ],
 "licoes": [
  {
   "t": "Controle de acesso",
   "txt": "<p><b>DAC</b>: o dono concede (GRANT/REVOKE). <b>RBAC</b>: permissões para papéis. <b>MAC</b>: níveis de classificação. Princípio do <b>menor privilégio</b>: cada um só o que precisa.</p>"
  },
  {
   "t": "Proteção e recuperação",
   "txt": "<p>Consultas parametrizadas contra injeção; TLS em trânsito e criptografia em repouso; senhas com hash + salt; backup completo/incremental/diferencial e regra <b>3-2-1</b> (3 cópias, 2 mídias, 1 fora do local). A LGPD exige cuidado com dados pessoais.</p>"
  }
 ],
 "termos": [
  [
   "GRANT",
   "Concede permissão."
  ],
  [
   "REVOKE",
   "Retira permissão."
  ],
  [
   "Menor privilégio",
   "Só o necessário."
  ],
  [
   "3-2-1",
   "3 cópias, 2 mídias, 1 fora."
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
 "visuais": [],
 "lab": {
  "intro": "Avalie e trate os riscos do banco de dados da escola.",
  "sims": [
   {
    "tipo": "risco",
    "titulo": "Matriz de riscos do banco da escola",
    "cfg": {
     "id": "rk",
     "ameacas": [
      {
       "t": "SQL Injection no formulário de login do sistema",
       "p": 4,
       "i": 5,
       "trat": "Mitigar",
       "fb": "Consultas parametrizadas e validação de entrada."
      },
      {
       "t": "Estagiário com permissão de DROP em produção",
       "p": 3,
       "i": 5,
       "trat": "Mitigar",
       "fb": "Menor privilégio: papel só de leitura."
      },
      {
       "t": "Falha do disco do servidor sem backup",
       "p": 2,
       "i": 5,
       "trat": "Mitigar",
       "fb": "Backup 3-2-1 e teste de restauração."
      },
      {
       "t": "Planilha antiga com CPFs de ex-alunos sem finalidade",
       "p": 3,
       "i": 4,
       "trat": "Evitar",
       "fb": "LGPD: eliminar dados sem finalidade."
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Avalie todas as ameaças",
    "ev": "rk:avaliou"
   },
   {
    "id": "m2",
    "t": "Compare com o especialista",
    "ev": "rk:comparou"
   },
   {
    "id": "m3",
    "t": "Acerte todos os tratamentos",
    "ev": "rk:tratou-certo"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que é DAC?",
   "Controle discricionário: o proprietário do objeto decide quem acessa, via GRANT e REVOKE."
  ],
  [
   "O que é RBAC?",
   "Controle baseado em papéis: permissões são dadas a roles e os usuários recebem os roles."
  ],
  [
   "O que é MAC?",
   "Controle mandatório por classificação dos dados e liberação dos usuários (militar/governo)."
  ],
  [
   "O que faz WITH GRANT OPTION?",
   "Permite que o usuário repasse a permissão recebida a outros."
  ],
  [
   "O que é SQL Injection?",
   "Inserção de código SQL malicioso por meio de entradas do usuário concatenadas na consulta."
  ],
  [
   "Qual a defesa mais eficaz contra SQL Injection?",
   "Consultas parametrizadas (prepared statements)."
  ],
  [
   "O que é o princípio do menor privilégio?",
   "Dar a cada usuário ou aplicação só as permissões estritamente necessárias."
  ],
  [
   "Criptografia em trânsito x em repouso?",
   "Trânsito: dados circulando na rede (TLS). Repouso: dados armazenados em disco (TDE, BitLocker)."
  ],
  [
   "Como guardar senhas corretamente?",
   "Com hash + salt usando bcrypt, scrypt ou Argon2; nunca em texto claro."
  ],
  [
   "Backup incremental x diferencial?",
   "Incremental: alterações desde o último backup de qualquer tipo. Diferencial: desde o último completo."
  ],
  [
   "O que é a regra 3-2-1?",
   "3 cópias, em 2 mídias diferentes, 1 fora do local."
  ],
  [
   "O que é a LGPD?",
   "Lei Geral de Proteção de Dados (Brasil), que regula o tratamento de dados pessoais."
  ]
 ],
 "vf": [
  [
   "GRANT e REVOKE implementam o modelo DAC no SQL padrão.",
   true,
   "O dono concede e retira permissões livremente."
  ],
  [
   "No RBAC, as permissões são atribuídas diretamente a cada usuário.",
   false,
   "São atribuídas a papéis; os usuários recebem papéis."
  ],
  [
   "No MAC, um usuário pode ler dados de nível superior ao seu.",
   false,
   "A regra é no read up: só lê de nível igual ou inferior."
  ],
  [
   "Digitar <code>' OR '1'='1' --</code> no login pode burlar uma consulta vulnerável.",
   true,
   "A condição vira sempre verdadeira e o resto é comentado."
  ],
  [
   "Esconder mensagens de erro é suficiente para impedir SQL Injection.",
   false,
   "Ajuda a não vazar detalhes, mas a proteção real é parametrizar as consultas."
  ],
  [
   "Senhas criptografadas com MD5 sem salt são seguras.",
   false,
   "MD5 é rápido e quebrável por tabelas prontas; use bcrypt/Argon2 com salt."
  ],
  [
   "<code>ssl = on</code> no postgresql.conf ativa criptografia em trânsito.",
   true,
   "Habilita conexões TLS entre cliente e servidor."
  ],
  [
   "Triggers de auditoria podem registrar INSERT, UPDATE e DELETE em tabelas de log.",
   true,
   "É uma das formas de auditoria no banco."
  ],
  [
   "pg_dump gera backup lógico de um banco PostgreSQL.",
   true,
   "A restauração é feita com pg_restore ou psql."
  ],
  [
   "Guardar o único backup no mesmo servidor do banco atende à regra 3-2-1.",
   false,
   "Falta cópia em outra mídia e fora do local."
  ],
  [
   "A LGPD exige finalidade específica e minimização no tratamento de dados pessoais.",
   true,
   "Coletar só o necessário para uma finalidade informada."
  ],
  [
   "A conta da aplicação web deve ter privilégio de superusuário para evitar erros.",
   false,
   "Isso viola o menor privilégio e amplia o estrago de uma invasão."
  ]
 ],
 "caderno": [
  [
   "Conceda SELECT e INSERT em ALUNO ao usuário secretaria e depois revogue o INSERT.",
   "<code>GRANT SELECT, INSERT ON ALUNO TO secretaria; REVOKE INSERT ON ALUNO FROM secretaria;</code>"
  ],
  [
   "Crie os papéis professor e aluno com permissões diferentes em NOTA.",
   "<code>CREATE ROLE papel_professor; CREATE ROLE papel_aluno; GRANT SELECT, UPDATE ON NOTA TO papel_professor; GRANT SELECT ON NOTA TO papel_aluno;</code>"
  ],
  [
   "Compare DAC, RBAC e MAC em uma tabela (quem decide e onde se usa).",
   "DAC: o dono decide, SQL padrão. RBAC: administração por papéis, empresas grandes. MAC: regras fixas por classificação, militar/governo."
  ],
  [
   "Mostre a consulta vulnerável de login e a versão parametrizada.",
   "Vulnerável: concatenar <code>usuario</code> e <code>senha</code> na string. Segura: <code>cursor.execute(\"SELECT * FROM USUARIO WHERE login = %s AND senha = %s\", (usuario, senha_hash))</code>."
  ],
  [
   "Liste 5 medidas de prevenção contra SQL Injection.",
   "Consultas parametrizadas, stored procedures, validação de entrada, menor privilégio, WAF."
  ],
  [
   "Monte a tabela de tipos de backup com frequência típica.",
   "Completo: semanal. Incremental: diário. Diferencial: diário. WAL: contínuo. Snapshot: quando necessário."
  ],
  [
   "Escreva os comandos de backup e restauração com pg_dump/pg_restore.",
   "<code>pg_dump -U postgres -Fc -f backup.dump meu_banco</code> e <code>pg_restore -U postgres -d meu_banco backup.dump</code>."
  ],
  [
   "Cite 4 impactos da LGPD no projeto de banco de dados.",
   "Criptografia, controle de acesso granular, auditoria, anonimização, exclusão e portabilidade de dados pessoais."
  ],
  [
   "Explique por que senhas devem usar hash com salt.",
   "O hash não pode ser revertido e o salt faz senhas iguais gerarem hashes diferentes, derrubando tabelas pré-calculadas."
  ],
  [
   "Cite 3 formas de implementar auditoria no PostgreSQL.",
   "Triggers de auditoria, extensão pgAudit, parâmetros de log (log_statement, log_connections) e SIEM."
  ]
 ],
 "pbl": [
  {
   "titulo": "Hardening do banco de produção",
   "cenario": "Vocês receberam um PostgreSQL de produção: a aplicação usa o superusuário postgres, senhas estão em texto claro, não há TLS e o último backup é de 6 meses atrás.",
   "passos": [
    [
     "Qual a primeira correção nas contas?",
     "Criar um usuário próprio da aplicação com o mínimo de permissões e deixar o postgres só para administração."
    ],
    [
     "Como tratar as senhas armazenadas?",
     "Migrar para hash com salt (bcrypt/Argon2), forçando redefinição ou re-hash no próximo login."
    ],
    [
     "Que política de backup adotar?",
     "Completo semanal, incremental diário, arquivamento contínuo de WAL e regra 3-2-1, com testes periódicos de restauração."
    ]
   ]
  },
  {
   "titulo": "Formulário de login do grêmio",
   "cenario": "O site do grêmio estudantil monta a consulta assim: `\"SELECT * FROM USUARIO WHERE login='\" + login + \"'\"`. Um aluno entrou como administrador sem saber a senha.",
   "passos": [
    [
     "Que ataque foi usado?",
     "SQL Injection, provavelmente com <code>' OR '1'='1' --</code> no campo login."
    ],
    [
     "Como corrigir o código?",
     "Usar consulta parametrizada (placeholder %s ou ?) passando login e hash da senha como parâmetros."
    ],
    [
     "Que medidas extras reduziriam o dano?",
     "Conta da aplicação com menor privilégio, validação de entrada, logs de auditoria e bloqueio após tentativas falhas."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Segurança",
   "itens": [
    "DAC, RBAC, MAC; menor privilégio.",
    "Parametrize: nada de concatenar SQL.",
    "Backup 3-2-1; LGPD."
   ]
  }
 ],
 "glossario": [
  [
   "RBAC",
   "Controle por papéis."
  ],
  [
   "Hash + salt",
   "Forma segura de guardar senhas."
  ]
 ]
});
