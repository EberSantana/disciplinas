# Ambientes de estudo · Prof. Eber Santana

Site: `https://ebersantana.github.io/disciplinas/`

## Como está organizado

Cada disciplina tem a sua pasta. Dentro dela, o `index.html` é a página de entrada da disciplina, com a lista dos materiais.

```
disciplinas/
├── index.html                      ← página inicial (todas as disciplinas)
├── config.js                       ← endereço da planilha (vale para todas)
├── progresso-turma.js              ← login do aluno e envio do progresso
├── redes-de-computadores/
│   ├── index.html                  ← entrada da disciplina
│   ├── console-de-estudo.html
│   ├── atividades.html             ← atividades com ranking
│   └── subnetting-na-pratica.html  ← envia progresso
├── projeto-de-redes/
│   ├── index.html
│   └── atividades.html             ← atividades com ranking
├── informatica-basica/
│   ├── index.html
│   ├── ambiente-interativo.html
│   ├── apostila.html
│   ├── metodo-office-visual.html   ← envia progresso
│   └── trilha-windows-11.html      ← envia progresso
├── engenharia-de-software/
│   ├── index.html
│   ├── apostila-engenharia-de-software.html
│   ├── apostila-engenharia-de-software-1.html
│   ├── apostila-engenharia-de-requisitos.html
│   ├── estante.html
│   ├── roteiro-processo-de-software.html
│   └── dicionario-de-dados.html
├── banco-de-dados/
│   ├── index.html
│   ├── console-de-estudo.html
│   └── apostila.html
├── construcao-de-sites-1/
│   ├── index.html
│   └── apostila.html
├── seguranca-da-informacao/
│   ├── index.html
│   └── console-de-estudo.html
├── recursos-de-aula/
│   ├── index.html
│   ├── cronometro-de-equipes.html
│   └── linha-do-tempo-tecnologica.html
└── apps-script/Codigo.gs           ← código da planilha (login, progresso e ranking)
```

Regras dos nomes: letras minúsculas, sem acento, sem espaço, palavras separadas por hífen. Nomes com acento ou espaço quebram os links no GitHub Pages.

## Endereços para mandar aos alunos

- Todas: `https://ebersantana.github.io/disciplinas/`
- Uma disciplina: `https://ebersantana.github.io/disciplinas/banco-de-dados/` (troque pelo nome da pasta)

## Para substituir tudo de uma vez

1. No repositório, apague as pastas antigas (ou crie o repositório de novo, vazio).
2. **Add file** › **Upload files** e arraste **tudo o que está dentro** desta pasta.
3. **Commit changes**.
4. **Settings** › **Pages** › Branch **main** › **/ (root)** › **Save**.

## Para acrescentar um material a uma disciplina

Peça ao Claude para incluir o material: ele devolve o arquivo com nome certo e o `index.html` da disciplina atualizado. Envie os dois para a pasta da disciplina.

## Login dos alunos e progresso

O aluno entra uma vez no portal com **nome completo, e-mail, curso, turno, turma e um PIN de 4 números**. O login fica guardado no navegador e vale para todos os materiais.

Depois do login:
- A página inicial mostra primeiro **Suas disciplinas** (as do curso do aluno) e, abaixo, as outras.
- O botão laranja **Minhas disciplinas**, no canto de todas as páginas, abre o menu com as disciplinas do curso dele.

### Quais disciplinas são de cada curso

A lista fica no começo do arquivo `progresso-turma.js`, na parte `CURSOS`. Para incluir uma disciplina num curso, acrescente uma linha `["Nome que aparece", "nome-da-pasta"]` dentro do curso. Uma disciplina pode estar em mais de um curso.

Enviam o progresso para a planilha: Subnetting na Prática, Método Office Visual, Trilha Windows 11 e as atividades com ranking de Redes e de Projeto de Redes.

Na planilha aparecem duas abas:
- **Alunos**: um aluno por linha, com nome, e-mail, curso, turno, turma, data do cadastro e do último acesso.
- **Progresso**: uma linha por aluno e por material, com atividades feitas, total, pontos e data da última atualização.

O PIN impede que outra pessoa use o e-mail de um colega. Se um aluno esquecer o PIN, apague a linha dele na aba **Alunos** e ele cria outro no próximo acesso.

O ranking que os alunos veem mostra só o primeiro nome e a inicial do sobrenome. E-mail e nome completo ficam apenas na planilha.

### Para ligar (uma vez só)

1. Crie uma planilha em sheets.google.com.
2. **Extensões** › **Apps Script**, apague o que houver, cole o conteúdo de `apps-script/Codigo.gs` e salve.
3. **Implantar** › **Nova implantação** › engrenagem › **App da Web**. *Executar como*: **Eu**. *Quem pode acessar*: **Qualquer pessoa**. **Implantar** e autorize.
4. Copie o endereço que termina em `/exec` e cole entre as aspas no `config.js` do repositório.

Se depois você alterar o código, use **Implantar** › **Gerenciar implantações** › lápis › *Versão*: **Nova versão**, para manter o mesmo endereço.

## Cuidados

- O repositório é público: não coloque dados pessoais de alunos nos arquivos. Os dados dos alunos ficam só na planilha.
- Não compartilhe a planilha: ela tem nome completo e e-mail dos alunos.
- Os pontos são calculados no navegador do aluno. Servem para acompanhar e motivar, não como nota oficial.
