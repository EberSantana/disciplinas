#!/usr/bin/env python3
"""Gera offline-manifest.json: lista de arquivos de cada disciplina para uso offline.
Rode na raiz do repositório depois de alterar qualquer material:  python3 tools/gerar-offline.py
A 'versao' de cada grupo muda sozinha quando um arquivo dele muda; assim o aluno vê "atualização disponível"."""
import unicodedata, hashlib, json, os, re, sys

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
        "icons/icon-192.png", "icons/icon-512.png", "icons/favicon-32.png", "favicon.ico", "busca-index.json", "como-usar.html", "icons/apple-touch-icon.png"]
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


TAG = re.compile(r"<[^>]+>")
def limpa(s):
    import html as H
    return re.sub(r"\s+", " ", H.unescape(TAG.sub(" ", s))).strip()

def busca():
    """Índice de busca do portal: título e títulos de seção de cada página (sem o corpo do texto)."""
    itens = []
    for slug in NOMES:
        if not os.path.isdir(slug): continue
        for f in arquivos(slug):
            if not f.endswith(".html"): continue
            t = open(f, encoding="utf-8", errors="ignore").read()
            m = re.search(r"<title>(.*?)</title>", t, re.S)
            titulo = limpa(m.group(1)) if m else f
            secoes = []
            for h in re.findall(r"<h[123][^>]*>(.*?)</h[123]>", t, re.S):
                x = limpa(h)
                if 3 < len(x) < 90 and "${" not in x and "{{" not in x and x not in secoes: secoes.append(x)
            chave = "".join(c for c in unicodedata.normalize("NFD", f) if not unicodedata.combining(c))  # ignora cópias do mesmo arquivo com nome acentuado
            if any(i["h"] == chave for i in itens): continue
            itens.append({"h": chave, "u": f, "d": NOMES[slug], "t": titulo, "s": secoes[:40]})
    with open("busca-index.json", "w", encoding="utf-8") as fh:
        json.dump([{k: v for k, v in i.items() if k != "h"} for i in itens], fh, ensure_ascii=False, separators=(",", ":"))
    print("busca:", len(itens), "páginas")

principal()
busca()
