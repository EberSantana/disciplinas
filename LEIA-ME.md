# Ambientes de estudo · Prof. Eber Santana

Site: `https://ebersantana.github.io/disciplinas/`

## Como está organizado

Cada disciplina tem a sua pasta. Dentro dela, o `index.html` é a página de entrada da disciplina, com a lista dos materiais.

```
disciplinas/
├── index.html                      ← página inicial (todas as disciplinas)
├── config.js                       ← endereço do ranking (vale para todas)
├── redes-de-computadores/
│   ├── index.html                  ← entrada da disciplina
│   ├── console-de-estudo.html
│   └── atividades.html             ← atividades com ranking
├── projeto-de-redes/
│   ├── index.html
│   └── atividades.html             ← atividades com ranking
├── informatica-basica/
│   ├── index.html
│   ├── ambiente-interativo.html
│   └── apostila.html
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
└── apps-script/Codigo.gs           ← código da planilha do ranking
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

## Ranking

Vale para as **atividades com ranking** (Redes de Computadores e Projeto de Redes). Para ligar:

1. Crie uma planilha em sheets.google.com.
2. **Extensões** › **Apps Script**, cole o conteúdo de `apps-script/Codigo.gs` e salve.
3. **Implantar** › **Nova implantação** › **App da Web**, *Executar como*: **Eu**, *Quem pode acessar*: **Qualquer pessoa** › **Implantar** e autorize.
4. Copie o endereço que termina em `/exec` e cole entre as aspas no `config.js`.

## Cuidados

- O repositório é público: não coloque dados pessoais de alunos nos arquivos.
- Oriente os alunos a usar apelido no ranking.
