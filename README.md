# Ambientes de Estudo · Prof. Eber Santana

Portal de materiais didáticos interativos das disciplinas de Informática do **Instituto Federal de Sergipe (IFS), Campus Tobias Barreto**.

**Acesse:** [ebersantana.github.io/disciplinas](https://ebersantana.github.io/disciplinas/)

Cada disciplina reúne laboratórios visuais, atividades de caderno, flashcards, questões de verdadeiro ou falso com justificativa e problemas de PBL (Aprendizagem Baseada em Problemas). As respostas só aparecem depois que o estudante tenta resolver. O portal funciona no computador, no tablet e no celular, sem instalar nada.

---

## Disciplinas

| Curso | Disciplina | Materiais |
|---|---|---|
| Técnico em Informática | [Redes de Computadores](https://ebersantana.github.io/disciplinas/redes-de-computadores/) | Console de estudo, atividades com ranking, Subnetting na Prática |
| Técnico em Informática | [Projeto de Redes](https://ebersantana.github.io/disciplinas/projeto-de-redes/) | Atividades com ranking (metodologia Top-Down) |
| Técnico em Informática | [Segurança da Informação](https://ebersantana.github.io/disciplinas/seguranca-da-informacao/) | Console de estudo |
| Subsequente em Informática | [Informática Básica](https://ebersantana.github.io/disciplinas/informatica-basica/) | Ambiente interativo, apostila, Método Office Visual, Trilha Windows 11 |
| Subsequente em Informática | [Engenharia de Software](https://ebersantana.github.io/disciplinas/engenharia-de-software/) | Apostilas, roteiro de processo, dicionário de dados, estante |
| Integrado em Desenvolvimento de Sistemas · 1º ano | [Construção de Sites 1](https://ebersantana.github.io/disciplinas/construcao-de-sites-1/) | Apostila de HTML e CSS |
| Integrado em Desenvolvimento de Sistemas · 2º ano | [Banco de Dados](https://ebersantana.github.io/disciplinas/banco-de-dados/) | Console de estudo, apostila de SQL |

Também estão disponíveis [recursos de aula](https://ebersantana.github.io/disciplinas/recursos-de-aula/) para qualquer disciplina: cronômetro com ranking de equipes e a Linha do Tempo Tecnológica.

---

## Como o estudante usa

1. Abre o portal e faz o login uma vez, com nome completo, e-mail, curso, turno, turma e um PIN de 4 números.
2. O portal mostra primeiro as disciplinas do curso dele. O botão **Minhas disciplinas**, no canto da tela, leva a elas a partir de qualquer página.
3. Estuda os módulos. O progresso fica salvo no aparelho e é enviado ao professor.
4. Acompanha a própria pontuação no ranking da turma.

## Proposta pedagógica

- **Tentar antes de ver a resposta:** o gabarito e a explicação só aparecem depois da tentativa.
- **Várias formas de praticar:** caderno, flashcards com repetição, V ou F com justificativa escrita, quiz e PBL em equipe.
- **Laboratórios visuais:** simuladores que mostram o conceito funcionando (como cálculo de sub-redes e camadas de rede).
- **Gamificação:** pontos por atividade e ranking por turma, para motivar e acompanhar, sem substituir a avaliação formal.

## Como é feito

| Parte | Tecnologia |
|---|---|
| Páginas | HTML, CSS e JavaScript, sem dependências de instalação |
| Hospedagem | GitHub Pages |
| Login e progresso | Google Apps Script ligado a uma planilha do professor |
| Desenvolvimento | Engenharia de prompt e criação assistida por IA |

```
disciplinas/
├── index.html              página inicial do portal
├── config.js               endereço do serviço de progresso
├── progresso-turma.js      login, menu de disciplinas e envio do progresso
├── apps-script/Codigo.gs   código da planilha (login, progresso e ranking)
└── <disciplina>/           uma pasta por disciplina, com index.html e os materiais
```

As instruções de manutenção (incluir materiais, ligar a planilha, atualizar o portal) estão no [LEIA-ME.md](LEIA-ME.md).

## Privacidade

- Nome completo e e-mail dos estudantes ficam somente na planilha do professor, que não é pública. Nenhum dado pessoal é gravado neste repositório.
- O ranking mostra apenas o primeiro nome e a inicial do sobrenome.
- O PIN impede que outra pessoa use o e-mail de um colega.
- Os dados servem apenas para acompanhar a aprendizagem na disciplina, em linha com a LGPD (Lei nº 13.709/2018).

---

## Autor

**Prof. MSc. Eber da Silva de Santana**
Professor EBTT do Instituto Federal de Sergipe, Campus Tobias Barreto. Pesquisador em tecnologia educacional, gamificação e segurança da informação.

[Lattes](http://lattes.cnpq.br/8888622742399905) · [ORCID](https://orcid.org/0000-0002-1236-6312) · Instagram [@prof.ebersantana](https://www.instagram.com/prof.ebersantana/)

## Uso dos materiais

Os materiais são de uso educacional. Para reutilizar ou adaptar em outra instituição, entre em contato com o autor.
