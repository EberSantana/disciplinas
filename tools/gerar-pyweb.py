#!/usr/bin/env python3
"""Embute tools/pyweb.py (mini-Flask didático) em motor-interativo/labs.js (FSI.pyPre.web)."""
import json, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(R, "tools/pyweb.py"), encoding="utf-8").read()
p = os.path.join(R, "motor-interativo/labs.js"); s = open(p, encoding="utf-8").read()
a, b = s.index("/*PYWEB-INI*/"), s.index("/*PYWEB-FIM*/")
s = s[:a] + "/*PYWEB-INI*/FSI.pyPre = FSI.pyPre || {}; FSI.pyPre.web = " + json.dumps(src, ensure_ascii=False) + ";" + s[b:]
open(p, "w", encoding="utf-8").write(s); print("ok", len(src))
