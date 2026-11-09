FSI.modulo({
 "n": 11,
 "unidade": "Aprofundamento",
 "nome": "Programação de banco de dados",
 "titulo": "Procedures, funções, cursores e SQL seguro",
 "duracao": "4 h",
 "resumoCurto": "Procedures, funções, cursores, exceções e SQL dinâmico",
 "analogia": {
  "titulo": "A receita guardada na cozinha",
  "txt": "<p>Em vez de o garçom ditar cada passo ao cozinheiro, a receita fica guardada <b>na cozinha</b> e basta pedir pelo nome. Uma <b>stored procedure</b> é isso: um programa guardado no próprio SGBD, executado com CALL.</p>"
 },
 "chave": [
  "Programação no servidor: PL/pgSQL (PostgreSQL), PL/SQL (Oracle), T-SQL (SQL Server).",
  "Stored procedure: chamada com CALL, recebe parâmetros e (PG 11+) controla transação.",
  "Função: sempre retorna valor; pode ser usada em SELECT e WHERE; pode retornar tabela (RETURNS TABLE).",
  "Cursor: processa resultado linha a linha (OPEN, FETCH, CLOSE). Prefira operações em conjunto.",
  "Exceções: bloco EXCEPTION WHEN unique_violation, foreign_key_violation, OTHERS.",
  "SQL dinâmico: EXECUTE com format(%I) e USING para evitar injeção."
 ],
 "objetivos": [
  "Diferenciar <b>procedure e função</b>.",
  "Explicar <b>cursores</b> e <b>tratamento de exceções</b>.",
  "Reconhecer o risco de <b>SQL dinâmico</b> mal feito."
 ],
 "licoes": [
  {
   "t": "Código no servidor",
   "txt": "<p>PL/pgSQL, PL/SQL e T-SQL permitem procedures (CALL, podem controlar transação) e funções (sempre retornam valor e podem ir no SELECT). Cursores percorrem o resultado linha a linha, mas operações em conjunto costumam ser mais rápidas.</p>"
  },
  {
   "t": "SQL dinâmico seguro",
   "txt": "<p>Montar SQL juntando textos digitados pelo usuário abre a porta para <b>SQL Injection</b>. Use parâmetros (USING, prepared statements) e format com %I para nomes.</p>"
  }
 ],
 "termos": [
  [
   "Procedure",
   "Programa chamado com CALL."
  ],
  [
   "Função",
   "Retorna valor; usável no SELECT."
  ],
  [
   "Cursor",
   "Percorre linhas uma a uma."
  ],
  [
   "Exceção",
   "Erro tratado no bloco EXCEPTION."
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
  "intro": "Decida como um desenvolvedor de banco.",
  "sims": [
   {
    "tipo": "cenarios",
    "titulo": "Procedure, função ou outra coisa?",
    "cfg": {
     "id": "pg",
     "rotulo": "Necessidade",
     "itens": [
      {
       "t": "Calcular a multa de um empréstimo e usá-la dentro de um SELECT.",
       "ops": [
        [
         "Função",
         true,
         "Retorna valor e pode ser usada em consultas."
        ],
        [
         "Procedure",
         false,
         "Procedure não vai dentro do SELECT."
        ],
        [
         "Cursor",
         false,
         "Cursor percorre resultados."
        ]
       ]
      },
      {
       "t": "Fechar o mês: gerar multas, atualizar saldos e registrar log, tudo numa transação.",
       "ops": [
        [
         "Stored procedure",
         true,
         "Executa um processo com várias etapas."
        ],
        [
         "View",
         false,
         "View só consulta."
        ],
        [
         "CHECK",
         false,
         "CHECK valida um valor."
        ]
       ]
      },
      {
       "t": "O sistema monta \"SELECT * FROM aluno WHERE nome = '\" + texto + \"'\".",
       "ops": [
        [
         "Risco de SQL Injection: usar consulta parametrizada",
         true,
         "Nunca concatene entrada do usuário."
        ],
        [
         "Está seguro se o texto for curto",
         false,
         "Basta ' OR '1'='1."
        ],
        [
         "Basta usar letras maiúsculas",
         false,
         "Não resolve."
        ]
       ]
      }
     ]
    }
   }
  ],
  "missoes": [
   {
    "id": "m1",
    "t": "Responda todas as necessidades",
    "ev": "pg:fim"
   },
   {
    "id": "m2",
    "t": "Responda sem errar",
    "ev": "pg:perfeito"
   }
  ],
  "guiados": []
 },
 "fc": [
  [
   "O que é uma stored procedure?",
   "Bloco de código armazenado no banco, chamado por nome, que recebe parâmetros e executa várias instruções."
  ],
  [
   "Como se chama uma procedure no PostgreSQL?",
   "<code>CALL nome(parametros);</code>"
  ],
  [
   "Função x procedure?",
   "A função sempre retorna valor e pode ser usada em consultas; a procedure é chamada com CALL e pode controlar transações."
  ],
  [
   "Cite as linguagens procedurais de 3 SGBDs.",
   "PL/pgSQL (PostgreSQL), PL/SQL (Oracle), T-SQL (SQL Server)."
  ],
  [
   "O que é um cursor?",
   "Mecanismo para processar o resultado de uma consulta linha a linha."
  ],
  [
   "Quais os comandos do ciclo de um cursor?",
   "DECLARE, OPEN, FETCH, CLOSE."
  ],
  [
   "Por que evitar cursores quando possível?",
   "Operações em conjunto (set-based) são bem mais eficientes que o processamento linha a linha."
  ],
  [
   "Como uma função retorna várias linhas?",
   "Com <code>RETURNS TABLE(...)</code> e <code>RETURN QUERY</code>."
  ],
  [
   "Como se lança um erro em PL/pgSQL?",
   "<code>RAISE EXCEPTION 'mensagem';</code>"
  ],
  [
   "Que exceção ocorre ao repetir uma chave única?",
   "<code>unique_violation</code>."
  ],
  [
   "O que é SQL dinâmico?",
   "SQL montado como texto e executado em tempo de execução com EXECUTE."
  ],
  [
   "Para que serve %I no format()?",
   "Coloca um identificador (nome de tabela/coluna) com as aspas corretas, evitando injeção."
  ]
 ],
 "vf": [
  [
   "Stored procedures ajudam a encapsular regras de negócio no servidor.",
   true,
   "A lógica fica centralizada no banco e reutilizável."
  ],
  [
   "Uma função PL/pgSQL pode ser usada no WHERE de uma consulta.",
   true,
   "Ex.: <code>WHERE fn_idade(DataNasc) >= 18</code>."
  ],
  [
   "Procedures no PostgreSQL 11+ podem ter COMMIT no seu corpo.",
   true,
   "Essa é uma diferença importante em relação às funções."
  ],
  [
   "Cursores são sempre mais rápidos que um UPDATE com WHERE.",
   false,
   "Um UPDATE baseado em conjunto costuma ser muito mais rápido."
  ],
  [
   "<code>EXIT WHEN NOT FOUND</code> encerra o laço quando o FETCH não traz mais linhas.",
   true,
   "É a condição de parada padrão com cursores."
  ],
  [
   "WHEN OTHERS captura qualquer erro não tratado antes.",
   true,
   "É o tratamento genérico do bloco EXCEPTION."
  ],
  [
   "SQLERRM contém a mensagem do erro ocorrido.",
   true,
   "Útil para registrar ou exibir o erro."
  ],
  [
   "Concatenar texto do usuário diretamente no EXECUTE é seguro.",
   false,
   "Abre brecha para SQL Injection; use format(%I/%L) e USING."
  ],
  [
   "Uma função RETURNS VOID não retorna valor útil.",
   true,
   "É usada quando só os efeitos colaterais importam."
  ],
  [
   "Procedures melhoram a segurança porque o usuário pode executar sem acessar as tabelas.",
   true,
   "Concede-se EXECUTE na procedure sem dar acesso direto às tabelas."
  ],
  [
   "PL/pgSQL e T-SQL têm exatamente a mesma sintaxe.",
   false,
   "São linguagens diferentes, de fornecedores diferentes."
  ],
  [
   "RETURN QUERY adiciona o resultado de uma consulta ao retorno da função.",
   true,
   "Usado em funções que retornam tabela ou SETOF."
  ]
 ],
 "caderno": [
  [
   "Escreva uma função que receba a data de nascimento e retorne a idade.",
   "<code>CREATE FUNCTION fn_idade(d DATE) RETURNS INT AS $$ BEGIN RETURN EXTRACT(YEAR FROM AGE(CURRENT_DATE, d)); END; $$ LANGUAGE plpgsql;</code>"
  ],
  [
   "Escreva uma procedure que reajuste salários de um departamento por um percentual, validando 0 a 50%.",
   "Procedure com parâmetros (p_depto, p_pct), <code>IF p_pct <= 0 OR p_pct > 50 THEN RAISE EXCEPTION ...</code>, <code>UPDATE FUNCIONARIO SET Salario = Salario*(1+p_pct/100) WHERE CodDepto = p_depto;</code>"
  ],
  [
   "Como chamar a procedure do item anterior para o departamento 5 com 8%?",
   "<code>CALL sp_reajuste_salarial(5, 8);</code>"
  ],
  [
   "Escreva uma função que retorne a média de notas de um aluno.",
   "<code>CREATE FUNCTION fn_media(p_ra INT) RETURNS DECIMAL AS $$ BEGIN RETURN (SELECT AVG(Nota) FROM MATRICULA WHERE RA = p_ra); END; $$ LANGUAGE plpgsql;</code>"
  ],
  [
   "Descreva em passos o que faz o cursor que aprova ou reprova matrículas.",
   "Declara cursor das matrículas EM_CURSO; abre; em laço faz FETCH; se nota >= 7 grava APROVADO senão REPROVADO; sai quando não houver linhas; fecha."
  ],
  [
   "Reescreva a lógica do cursor anterior sem cursor.",
   "<code>UPDATE MATRICULA SET Status = CASE WHEN Nota >= 7 THEN 'APROVADO' ELSE 'REPROVADO' END WHERE Status = 'EM_CURSO';</code>"
  ],
  [
   "Escreva um bloco EXCEPTION para aluno duplicado e curso inexistente.",
   "<code>EXCEPTION WHEN unique_violation THEN RAISE NOTICE 'Aluno já cadastrado.'; WHEN foreign_key_violation THEN RAISE NOTICE 'Curso não encontrado.';</code>"
  ],
  [
   "Liste 3 vantagens e 1 desvantagem de programar no servidor do banco.",
   "Vantagens: desempenho (menos tráfego), reutilização, segurança. Desvantagem: dependência do SGBD (portabilidade menor)."
  ],
  [
   "Por que usar USING no EXECUTE?",
   "Para passar valores como parâmetros, sem concatenar texto, evitando SQL Injection."
  ],
  [
   "Quando um cursor é realmente necessário?",
   "Quando cada linha exige lógica complexa ou chamadas externas que não se expressam em uma operação de conjunto."
  ]
 ],
 "pbl": [
  {
   "titulo": "API de dados do sistema acadêmico",
   "cenario": "O app mobile do campus não deve acessar tabelas diretamente. Toda leitura e gravação passará por rotinas no banco.",
   "passos": [
    [
     "Que rotinas criar para matrícula?",
     "Procedure <code>sp_matricular(ra, disciplina)</code> com validações e uma função <code>fn_boletim(ra)</code> que retorna tabela."
    ],
    [
     "Que validações a procedure de matrícula faz?",
     "Aluno e disciplina existem, vaga disponível, limite de disciplinas, pré-requisito cumprido; se falhar, RAISE EXCEPTION."
    ],
    [
     "Como fica a segurança?",
     "O usuário do app recebe só EXECUTE nas rotinas; nenhum SELECT/INSERT direto nas tabelas."
    ]
   ]
  },
  {
   "titulo": "Fechamento do semestre lento",
   "cenario": "O fechamento usa um cursor que percorre 40 mil matrículas e leva 25 minutos, travando o sistema.",
   "passos": [
    [
     "Qual é a causa provável?",
     "Processamento linha a linha com um UPDATE por linha."
    ],
    [
     "Como otimizar?",
     "Trocar por um UPDATE único baseado em conjunto com CASE, ou por lotes."
    ],
    [
     "Que cuidado tomar antes de rodar a nova versão em produção?",
     "Testar em cópia, rodar dentro de transação, conferir contagens com SELECT e ter backup."
    ]
   ]
  }
 ],
 "resumo": [
  {
   "t": "Programação",
   "itens": [
    "Procedures, funções, cursores, exceções.",
    "SQL dinâmico só com parâmetros."
   ]
  }
 ],
 "glossario": [
  [
   "PL/pgSQL",
   "Linguagem procedural do PostgreSQL."
  ]
 ]
});
