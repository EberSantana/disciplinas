#!/usr/bin/env python3
"""Gera as páginas de uma disciplina interativa a partir de <pasta>/disciplina.json e <pasta>/dados/mN.js.
Uso (na raiz do repositório):  python3 tools/gerar-disciplina.py fundamentos-de-sistemas-de-informacao
disciplina.json: {"disc":"id-curto","nome":"Nome da disciplina","eixo":"Curso/turma","descricao":"...","cor":"#1D4ED8",
                  "como":["passo 1","passo 2",...], "modulos":6}
O motor (motor-interativo/motor.js e motor.css) é compartilhado por todas as disciplinas."""
import json, os, sys, html
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pasta = sys.argv[1].strip("/")
base = os.path.join(RAIZ, pasta)
cfg = json.load(open(os.path.join(base, "disciplina.json"), encoding="utf-8"))
N = cfg["modulos"]
GATE = '<script>try{var pa=JSON.parse(localStorage.getItem("perfil:aluno")||"null");if(!(pa&&pa.id&&pa.pin)&&!/[?&]professor\\b/.test(location.search))document.documentElement.classList.add("pt-gate")}catch(e){}</script><style>html.pt-gate body>*:not(.pt-screen){visibility:hidden}</style>'
def head(titulo, desc):
    CFG = json.dumps({k: cfg[k] for k in ('disc','nome','eixo','descricao','como','aulas','analogia','niveis','passo') if k in cfg}, ensure_ascii=False)
    return f'''<!doctype html>
<html lang="pt-BR" data-a11y-cores>
<head>
<meta charset="utf-8">
{GATE}
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(titulo)}</title>
<meta name="description" content="{html.escape(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400&display=swap">
<link rel="stylesheet" href="../motor-interativo/motor.css">
<script src="../aparencia.js"></script>
<link rel="manifest" href="../manifest.webmanifest">
<link rel="icon" type="image/png" sizes="32x32" href="../icons/favicon-32.png">
<link rel="icon" href="../favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="../icons/apple-touch-icon.png">
<meta name="theme-color" content="#16261C">
<script src="../offline.js" defer></script>
<script>window.FSI_CFG={CFG};</script>
</head>
<body>
'''
def fim(extra):
    dados = "".join(f'<script src="dados/m{i}.js"></script>\n' for i in range(1, N + 1)) if extra == "todos" else ""
    return dados
RODAPE = '<script src="../config.js"></script>\n<script src="../progresso-turma.js"></script>\n<script src="../acessibilidade.js" defer></script>\n</body>\n</html>\n'
def grava(nome, txt): open(os.path.join(base, nome), "w", encoding="utf-8").write(txt)

todos = "".join(f'<script src="dados/m{i}.js"></script>\n' for i in range(1, N + 1))
MOTOR = '<div id="app"></div>\n<script src="../motor-interativo/motor.js"></script>\n<script src="../motor-interativo/labs.js"></script>\n'
for i in range(1, N + 1):
    grava(f"modulo-{i}.html", head(f"Módulo {i} — {cfg['nome']}", cfg["descricao"]) + MOTOR + todos + f'<script>FSI.montarModulo({i})</script>\n' + RODAPE)
grava("index.html", head(cfg["nome"], cfg["descricao"]) + MOTOR + todos + '<script>FSI.montarIndice()</script>\n' + RODAPE)
grava("simulado.html", head(f"Simulado — {cfg['nome']}", cfg["descricao"]) + MOTOR + todos + '<script>FSI.montarSimulado()</script>\n' + RODAPE)
print("ok:", N, "módulos +", "index, simulado")
