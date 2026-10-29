#!/usr/bin/env python3
"""Gera offline-manifest.json: lista de arquivos de cada disciplina para uso offline.
Rode na raiz do repositório depois de alterar qualquer material:  python3 tools/gerar-offline.py
A 'versao' de cada grupo muda sozinha quando um arquivo dele muda; assim o aluno vê "atualização disponível"."""
import hashlib, json, os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)

NOMES = {
    "redes-de-computadores": "Redes de Computadores",
    "projeto-de-redes": "Projeto de Redes",
    "seguranca-da-informacao": "Segurança da Informação",
    "informatica-basica": "Informática Básica",
    "engenharia-de-software": "Engenharia de Software",
    "construcao-de-sites-1": "Construção de Sites 1",
    "banco-de-dados": "Banco de Dados",
    "recursos-de-aula": "Recursos de aula",
    "laboratorio-3d": "Laboratório 3D",
}
EXTRAS = {"informatica-basica": ["office-visual-img"]}  # pastas de imagens usadas por uma disciplina
CORE = ["index.html", "config.js", "progresso-turma.js", "acessibilidade.js", "aparencia.js", "offline.js",
        "manifest.webmanifest", "offline.html", "offline-manifest.json",
        "icons/icon-192.png", "icons/icon-512.png"]
EXT = re.compile(r'(?:src|href)=["\'](https://(?:fonts\.googleapis\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net)[^"\']+)["\']')
IGNORA = (".md", ".csv", ".zip", ".gs")

def arquivos(pasta):
    out = []
    for d, _, fs in os.walk(pasta):
        for f in fs:
            if f.endswith(IGNORA) or f.startswith("."): continue
            out.append(os.path.relpath(os.path.join(d, f), RAIZ).replace(os.sep, "/"))
    return sorted(out)

def sha(p):
    h = hashlib.sha1()
    with open(p, "rb") as f: h.update(f.read())
    return h.hexdigest()

def grupo(slug):
    pastas = [slug] + EXTRAS.get(slug, [])
    fs = [f for p in pastas for f in arquivos(p)]
    externos = set()
    for f in fs:
        if f.endswith(".html"):
            externos.update(EXT.findall(open(f, encoding="utf-8", errors="ignore").read()))
    h = hashlib.sha1()
    for f in fs: h.update(f.encode()); h.update(sha(f).encode())
    return {"id": slug, "nome": NOMES[slug], "versao": h.hexdigest()[:10],
            "bytes": sum(os.path.getsize(f) for f in fs), "arquivos": fs, "externos": sorted(externos)}

def principal():
    core = [c for c in CORE if c == "offline-manifest.json" or os.path.exists(c)]
    gs = [grupo(s) for s in NOMES if os.path.isdir(s)]
    ext_core = set()
    if os.path.exists("index.html"):
        ext_core.update(EXT.findall(open("index.html", encoding="utf-8").read()))
    m = {"core": core, "externosCore": sorted(ext_core), "grupos": gs}
    with open("offline-manifest.json", "w", encoding="utf-8") as f:
        json.dump(m, f, ensure_ascii=False, indent=1)
    tot = sum(g["bytes"] for g in gs)
    print("grupos:", len(gs), "| total %.1f MB" % (tot / 1048576))
    for g in gs: print("  %-26s %5d arquivos %6.1f MB  v%s" % (g["id"], len(g["arquivos"]), g["bytes"] / 1048576, g["versao"]))

principal()
