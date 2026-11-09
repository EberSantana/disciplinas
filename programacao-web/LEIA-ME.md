# Programação Web (back-end) — disciplina interativa

8 módulos × 40 atividades (320), com labs que rodam no navegador:

- **Console Flask simulado** (`tools/pyweb.py`, embutido em `motor-interativo/labs.js` como `FSI.pyPre.web`): imita a API do Flask
  (`Flask`, `request`, `session`, `jsonify`, `redirect`, `abort`, `Blueprint`, `url_for`, `errorhandler`, `before_request`, templates Jinja básicos,
  `test_client()` com cookies) e de `werkzeug.security`. O código do aluno é o mesmo que ele escreveria no Flask real.
  Roda no Pyodide (`../python-runtime/`, MPL-2.0).
- **Console SQL** (sql.js) no módulo 6 (CRUD) e o padrão DAO em Python.
- Para regenerar o pré-carregado depois de editar `tools/pyweb.py`: `python3 tools/gerar-pyweb.py`.

Limitações do simulador: não abre rede nem porta; templates cobrem `{{ }}`, `for`, `if/elif/else`, `set`, `extends/block` e filtros comuns;
o DAO do laboratório usa listas em memória (o `sqlite3` do Python não está no Pyodide embarcado).
