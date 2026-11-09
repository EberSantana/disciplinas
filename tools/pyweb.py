# Mini-Flask didático: roda no navegador (Pyodide) e imita a API do Flask.
# O aluno escreve "from flask import Flask, request, jsonify" como no Flask de verdade.
import sys, types, json as _json, re as _re, html as _html, hashlib as _hl, secrets as _sec, base64 as _b64, traceback as _tb
from urllib.parse import urlsplit as _urlsplit, parse_qsl as _parse_qsl, urlencode as _urlencode, quote as _quote
from collections.abc import MutableMapping as _MM

STATUS = {200: "OK", 201: "Created", 204: "No Content", 301: "Moved Permanently", 302: "Found", 303: "See Other", 304: "Not Modified",
          400: "Bad Request", 401: "Unauthorized", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 409: "Conflict",
          415: "Unsupported Media Type", 422: "Unprocessable Entity", 429: "Too Many Requests", 500: "Internal Server Error", 503: "Service Unavailable"}

class Markup(str):
    def __html__(self): return self
def escape(s):
    return s if isinstance(s, Markup) else Markup(_html.escape(str(s), quote=True))

class HTTPException(Exception):
    def __init__(self, code=500, description=None):
        self.code = code; self.description = description or STATUS.get(code, "Erro")
        Exception.__init__(self, "%d %s: %s" % (code, STATUS.get(code, ""), self.description))
def abort(code, description=None): raise HTTPException(code, description)

class Headers(dict):
    def __init__(self, d=None):
        dict.__init__(self); self._m = {}
        for k, v in (d or {}).items(): self[k] = v
    def __setitem__(self, k, v): k = k.title(); dict.__setitem__(self, k, v); self._m[k] = [v]
    def __getitem__(self, k): return dict.__getitem__(self, k.title())
    def __contains__(self, k): return dict.__contains__(self, k.title())
    def get(self, k, d=None): return dict.get(self, k.title(), d)
    def add(self, k, v): k = k.title(); self._m.setdefault(k, []).append(v); dict.__setitem__(self, k, v)
    def getlist(self, k): return list(self._m.get(k.title(), []))

class Response:
    def __init__(self, response="", status=200, headers=None, mimetype=None):
        self.status_code = status; self.headers = Headers(headers)
        if isinstance(response, (bytes, bytearray)): self.data = bytes(response)
        else: self.data = ("" if response is None else str(response)).encode("utf-8")
        if "Content-Type" not in self.headers: self.headers["Content-Type"] = (mimetype or "text/html") + ("; charset=utf-8" if (mimetype or "text/html").startswith("text/") else "")
    status = property(lambda s: "%d %s" % (s.status_code, STATUS.get(s.status_code, "")))
    text = property(lambda s: s.data.decode("utf-8"))
    mimetype = property(lambda s: s.headers.get("Content-Type", "").split(";")[0])
    location = property(lambda s: s.headers.get("Location"))
    is_json = property(lambda s: s.mimetype == "application/json")
    def get_data(self, as_text=False): return self.data.decode("utf-8") if as_text else self.data
    def get_json(self, silent=False):
        try: return _json.loads(self.data.decode("utf-8"))
        except Exception:
            if silent: return None
            raise
    json = property(lambda s: s.get_json(silent=True))
    def set_cookie(self, key, value="", max_age=None, httponly=False, secure=False, samesite=None, path="/"):
        c = "%s=%s; Path=%s" % (key, value, path)
        if max_age is not None: c += "; Max-Age=%d" % max_age
        if httponly: c += "; HttpOnly"
        if secure: c += "; Secure"
        if samesite: c += "; SameSite=%s" % samesite
        self.headers.add("Set-Cookie", c)
    def delete_cookie(self, key, path="/"): self.set_cookie(key, "", max_age=0, path=path)
    def __repr__(self): return "<Response %s>" % self.status

class Request:
    def __init__(self, method, path, args, form, jsn, headers, cookies, raw=None):
        self.method = method; self.path = path; self.args = args; self.form = form; self._json = jsn
        self.headers = Headers(headers); self.cookies = cookies; self.data = raw or b""
        self.url = path; self.is_json = (self.headers.get("Content-Type", "") or "").startswith("application/json")
    @property
    def values(self):
        d = dict(self.args); d.update(self.form); return d
    def get_json(self, silent=False, force=False):
        if self._json is _NOJSON:
            if silent: return None
            raise HTTPException(415 if not self.is_json else 400, "O corpo não é um JSON válido")
        return self._json
    json = property(lambda s: s.get_json())
_NOJSON = object()

class _Ctx:
    req = None; sess = None; app = None; g = None
_ctx = _Ctx()
class _Proxy:
    def __init__(self, nome): object.__setattr__(self, "_n", nome)
    def _o(self):
        o = getattr(_ctx, self._n)
        if o is None: raise RuntimeError("Fora de uma requisição: só é possível usar request/session/g dentro de uma view.")
        return o
    def __getattr__(self, k): return getattr(self._o(), k)
    def __setattr__(self, k, v): setattr(self._o(), k, v)
request = _Proxy("req"); g = _Proxy("g")
class _Sess(_MM):
    def _d(self):
        if _ctx.app is not None and not _ctx.app.secret_key:
            raise RuntimeError("The session is unavailable because no secret key was set. Set the secret_key on the application to something unique and secret.")
        _ctx.mod = True; return _ctx.sess
    def __getitem__(self, k): return _ctx.sess[k]
    def __setitem__(self, k, v): self._d()[k] = v
    def __delitem__(self, k): del self._d()[k]
    def __iter__(self): return iter(_ctx.sess)
    def __len__(self): return len(_ctx.sess)
    def get(self, k, d=None): return _ctx.sess.get(k, d)
    def __contains__(self, k): return k in _ctx.sess
    def __repr__(self): return repr(_ctx.sess)
session = _Sess()

def _assina(app, payload): return _hl.sha256((app.secret_key + "|" + payload).encode()).hexdigest()[:12]
def _cod_sessao(app, d):
    p = _b64.urlsafe_b64encode(_json.dumps(d, sort_keys=True).encode()).decode().rstrip("=")
    return p + "." + _assina(app, p)
def _dec_sessao(app, v):
    try:
        p, s = v.rsplit(".", 1)
        if not app.secret_key or s != _assina(app, p): return {}
        return _json.loads(_b64.urlsafe_b64decode(p + "=" * (-len(p) % 4)).decode())
    except Exception: return {}

def jsonify(*args, **kw):
    obj = args[0] if len(args) == 1 and not kw else (list(args) if args else kw)
    return Response(_json.dumps(obj, sort_keys=True, ensure_ascii=False), mimetype="application/json")
def redirect(location, code=302):
    r = Response("", code); r.headers["Location"] = location; return r
def make_response(body="", status=None, headers=None):
    r = _norm(body)
    if status: r.status_code = status
    for k, v in (headers or {}).items(): r.headers[k] = v
    return r
def flash(msg, cat="message"):
    l = session.get("_flashes", []); session["_flashes"] = l + [[cat, msg]]
def get_flashed_messages(with_categories=False):
    l = _ctx.sess.pop("_flashes", []) if _ctx.sess is not None else []
    _ctx.mod = True
    return [tuple(x) for x in l] if with_categories else [x[1] for x in l]

# ---------- templates (subconjunto do Jinja2) ----------
class _Und:
    def __bool__(self): return False
    def __str__(self): return ""
    def __iter__(self): return iter(())
    def __getattr__(self, k): return self
    def __call__(self, *a, **k): return self
    def __len__(self): return 0
_UND = _Und()
class _D(dict):
    def __getattr__(self, k):
        if k in self: return self[k]
        return _UND
    def __missing__(self, k): return _UND
def _wrap(v):
    if isinstance(v, dict) and not isinstance(v, _D): return _D({k: _wrap(x) for k, x in v.items()})
    if isinstance(v, (list, tuple)): return [_wrap(x) for x in v]
    return v
class _Env(dict):
    def __missing__(self, k): return _UND
_BI = {"len": len, "range": range, "str": str, "int": int, "float": float, "sum": sum, "min": min, "max": max, "sorted": sorted, "abs": abs, "round": round, "enumerate": enumerate, "zip": zip, "list": list}
_FILT = {"safe": lambda v: Markup(str(v)), "upper": lambda v: str(v).upper(), "lower": lambda v: str(v).lower(), "title": lambda v: str(v).title(),
         "capitalize": lambda v: str(v).capitalize(), "length": lambda v: len(v), "int": lambda v: int(v), "float": lambda v: float(v),
         "default": lambda v, d="": d if (v is _UND or v in (None, "")) else v, "trim": lambda v: str(v).strip(), "reverse": lambda v: list(reversed(v)),
         "join": lambda v, s="": s.join(str(x) for x in v), "first": lambda v: v[0] if v else _UND, "last": lambda v: v[-1] if v else _UND,
         "round": lambda v, n=0: round(v, n), "sum": lambda v: sum(v), "string": lambda v: str(v), "sort": lambda v: sorted(v)}
def _split_pipe(s):
    partes, atual, asp = [], "", None
    for i, ch in enumerate(s):
        if asp:
            atual += ch
            if ch == asp: asp = None
        elif ch in "\"'": asp = ch; atual += ch
        elif ch == "|" and s[i + 1:i + 2] != "|" and s[i - 1:i] != "|": partes.append(atual); atual = ""
        else: atual += ch
    partes.append(atual); return [p.strip() for p in partes]
def _eval(src, env):
    try: return eval(src, {"__builtins__": _BI}, env)
    except (NameError, KeyError, AttributeError, TypeError, IndexError): return _UND
def _expr(src, env):
    partes = _split_pipe(src); v = _eval(partes[0], env)
    for f in partes[1:]:
        nome, args = (f.split("(", 1)[0].strip(), _eval("(" + f.split("(", 1)[1][:-1] + ",)", env)) if "(" in f else (f, ())
        if nome not in _FILT: raise ValueError("Filtro desconhecido: " + nome)
        v = _FILT[nome](v, *args)
    return v
_TOK = _re.compile(r"(\{\{.*?\}\}|\{%.*?%\}|\{#.*?#\})", _re.S)
def _parse(toks, i, fim):
    out = []
    while i < len(toks):
        t = toks[i]
        if t.startswith("{%"):
            c = t[2:-2].strip()
            if c.split(" ")[0] in fim: return out, i
            if c.startswith("for "):
                m = _re.match(r"for\s+(.+?)\s+in\s+(.+)$", c)
                corpo, i = _parse(toks, i + 1, ("endfor", "else"))
                outro = []
                if toks[i][2:-2].strip() == "else": outro, i = _parse(toks, i + 1, ("endfor",))
                out.append(("for", m.group(1), m.group(2), corpo, outro))
            elif c.startswith("if "):
                ramos, cond = [], c[3:]
                while True:
                    corpo, i = _parse(toks, i + 1, ("elif", "else", "endif"))
                    ramos.append((cond, corpo)); fc = toks[i][2:-2].strip()
                    if fc.startswith("elif "): cond = fc[5:]; continue
                    if fc == "else": corpo, i = _parse(toks, i + 1, ("endif",)); ramos.append((None, corpo))
                    break
                out.append(("if", ramos))
            elif c.startswith("set "):
                n, e = c[4:].split("=", 1); out.append(("set", n.strip(), e.strip()))
            else: raise ValueError("Comando de template desconhecido: " + c)
        elif t.startswith("{{"): out.append(("e", t[2:-2].strip()))
        elif t.startswith("{#"): pass
        else: out.append(("t", t))
        i += 1
    return out, i
def _run(nos, env):
    s = []
    for n in nos:
        k = n[0]
        if k == "t": s.append(n[1])
        elif k == "e":
            v = _expr(n[1], env); s.append(v if isinstance(v, Markup) else _html.escape(str(v), quote=True))
        elif k == "set": env[n[1]] = _expr(n[2], env)
        elif k == "if":
            for cond, corpo in n[1]:
                if cond is None or _expr(cond, env): s.append(_run(corpo, env)); break
        elif k == "for":
            seq = list(_expr(n[2], env)) if _expr(n[2], env) is not _UND else []
            if not seq: s.append(_run(n[4], env)); continue
            vs = [x.strip() for x in n[1].split(",")]
            for idx, it in enumerate(seq):
                e2 = _Env(env); e2["loop"] = _D(index=idx + 1, index0=idx, first=idx == 0, last=idx == len(seq) - 1, length=len(seq))
                if len(vs) == 1: e2[vs[0]] = it
                else:
                    for nm, vv in zip(vs, it): e2[nm] = vv
                s.append(_run(n[3], e2))
    return "".join(s)
def _herda(src, loja, prof=0):
    m = _re.match(r"\s*\{%\s*extends\s+[\"'](.+?)[\"']\s*%\}", src)
    if not m or prof > 5: return src
    if m.group(1) not in loja: raise ValueError("Template não encontrado: " + m.group(1))
    filho = dict(_re.findall(r"\{%\s*block\s+(\w+)\s*%\}(.*?)\{%\s*endblock[^%]*%\}", src[m.end():], _re.S))
    pai = _herda(loja[m.group(1)], loja, prof + 1)
    return _re.sub(r"\{%\s*block\s+(\w+)\s*%\}(.*?)\{%\s*endblock[^%]*%\}", lambda x: filho.get(x.group(1), x.group(2)), pai, flags=_re.S)
def render_template_string(src, **ctx):
    loja = _ctx.app.templates if _ctx.app is not None else {}
    src = _herda(src, loja)
    nos, _ = _parse([t for t in _TOK.split(src) if t != ""], 0, ())
    env = _Env({k: _wrap(v) for k, v in ctx.items()})
    env["request"] = request if _ctx.req is not None else _UND
    return Markup(_run(nos, env))
def render_template(nome, **ctx):
    if _ctx.app is None or nome not in _ctx.app.templates: raise ValueError("TemplateNotFound: " + str(nome))
    return render_template_string(_ctx.app.templates[nome], **ctx)

# ---------- rotas ----------
_CONV = {"int": r"-?\d+", "float": r"-?\d+\.\d+", "string": r"[^/]+", "path": r".+"}
class _Rota:
    def __init__(self, rule, endpoint, fn, methods):
        self.rule = rule; self.endpoint = endpoint; self.fn = fn; self.methods = set(m.upper() for m in methods)
        self.tipos = {}; pat = ""; pos = 0
        for m in _re.finditer(r"<(?:(\w+):)?(\w+)>", rule):
            tp = m.group(1) or "string"; self.tipos[m.group(2)] = tp
            pat += _re.escape(rule[pos:m.start()]) + "(?P<%s>%s)" % (m.group(2), _CONV[tp]); pos = m.end()
        self.re = _re.compile("^" + pat + _re.escape(rule[pos:]) + "$")
    def casa(self, path):
        m = self.re.match(path)
        if not m: return None
        d = m.groupdict()
        for k, tp in self.tipos.items():
            if tp == "int": d[k] = int(d[k])
            elif tp == "float": d[k] = float(d[k])
        return d
class _Reg:
    def route(self, rule, methods=None, **kw):
        def deco(f): self.add_url_rule(rule, kw.get("endpoint") or f.__name__, f, methods); return f
        return deco
    def get(self, rule, **kw): return self.route(rule, ["GET"], **kw)
    def post(self, rule, **kw): return self.route(rule, ["POST"], **kw)
    def put(self, rule, **kw): return self.route(rule, ["PUT"], **kw)
    def delete(self, rule, **kw): return self.route(rule, ["DELETE"], **kw)
    def patch(self, rule, **kw): return self.route(rule, ["PATCH"], **kw)
class Blueprint(_Reg):
    def __init__(self, name, import_name=None, url_prefix=None):
        self.name = name; self.url_prefix = url_prefix or ""; self.regras = []
    def add_url_rule(self, rule, endpoint=None, view_func=None, methods=None):
        self.regras.append((rule, endpoint or view_func.__name__, view_func, methods or ["GET"]))

def _norm(rv):
    if isinstance(rv, Response): return rv
    status = headers = None
    if isinstance(rv, tuple):
        if len(rv) == 3: rv, status, headers = rv
        elif len(rv) == 2:
            if isinstance(rv[1], (dict, list)) and not isinstance(rv[1], int): rv, headers = rv
            else: rv, status = rv
        else: raise TypeError("A view devolveu uma tupla com tamanho inválido")
    if rv is None: raise TypeError("The view function did not return a valid response. The function either returned None or ended without a return statement.")
    if isinstance(rv, (dict, list)): r = jsonify(rv)
    elif isinstance(rv, (str, bytes)): r = Response(rv)
    elif isinstance(rv, Response): r = rv
    else: raise TypeError("The view function did not return a valid response. The return type must be a string, dict, list, tuple, Response instance, or WSGI callable, but it was a %s." % type(rv).__name__)
    if status is not None: r.status_code = status
    for k, v in (headers or {}).items(): r.headers[k] = v
    return r

class Flask(_Reg):
    def __init__(self, nome=None, **kw):
        self.rotas = []; self.secret_key = None; self.config = {}; self.templates = {}; self._err = {}; self._antes = []; self._depois = []
        self.testing = False; self.nome = nome
    def add_url_rule(self, rule, endpoint=None, view_func=None, methods=None):
        self.rotas.append(_Rota(rule, endpoint or view_func.__name__, view_func, methods or ["GET"]))
    def errorhandler(self, code):
        def deco(f): self._err[code] = f; return f
        return deco
    def before_request(self, f): self._antes.append(f); return f
    def after_request(self, f): self._depois.append(f); return f
    def register_blueprint(self, bp, url_prefix=None):
        pre = url_prefix if url_prefix is not None else bp.url_prefix
        for rule, ep, fn, ms in bp.regras: self.add_url_rule(pre + rule, bp.name + "." + ep, fn, ms)
    def test_client(self): return Client(self)
    def run(self, *a, **k): print(" * (simulado) Servidor Flask iniciado — use app.test_client() para enviar requisições.")
    def _erro(self, code, desc=None):
        h = self._err.get(code)
        if h is not None:
            r = _norm(h(HTTPException(code, desc))); r.status_code = code if r.status_code == 200 else r.status_code; return r
        return Response("<h1>%d %s</h1><p>%s</p>" % (code, STATUS.get(code, ""), _html.escape(desc or STATUS.get(code, ""))), code)
    def processa(self, req, sess):
        _ctx.req, _ctx.sess, _ctx.app, _ctx.g, _ctx.mod = req, dict(sess), self, _D(), False
        try:
            try:
                casou, outro = None, False
                for r in self.rotas:
                    d = r.casa(req.path)
                    if d is None: continue
                    if req.method in r.methods or (req.method == "HEAD" and "GET" in r.methods): casou = (r, d); break
                    outro = True
                resp = None
                for f in self._antes:
                    v = f()
                    if v is not None: resp = _norm(v); break
                if resp is None:
                    if casou is None: raise HTTPException(405 if outro else 404)
                    resp = _norm(casou[0].fn(**casou[1]))
            except HTTPException as e:
                resp = self._erro(e.code, e.description)
            except Exception as e:
                if 500 in self._err: resp = self._erro(500, str(e))
                else:
                    sys.stderr.write("[servidor] Erro interno em %s %s -> %s: %s\n" % (req.method, req.path, type(e).__name__, e)); resp = self._erro(500)
            for f in self._depois: resp = _norm(f(resp))
            novo = _ctx.sess if _ctx.mod else None
            return resp, novo
        finally:
            _ctx.req = _ctx.sess = _ctx.app = _ctx.g = None

def url_for(endpoint, **vals):
    app = _ctx.app
    if app is None: raise RuntimeError("url_for só funciona dentro de uma requisição")
    for r in app.rotas:
        if r.endpoint == endpoint:
            url = _re.sub(r"<(?:\w+:)?(\w+)>", lambda m: _quote(str(vals.pop(m.group(1)))), r.rule)
            return url + ("?" + _urlencode(vals) if vals else "")
    raise ValueError("Não existe rota com o endpoint " + repr(endpoint))

class Client:
    def __init__(self, app): self.app = app; self.cookies = {}
    def set_cookie(self, key, value="", **kw): self.cookies[key] = value
    def get_cookie(self, key): return self.cookies.get(key)
    def open(self, method, path, data=None, json=None, headers=None, query_string=None, follow_redirects=False, content_type=None):
        for _ in range(6):
            u = _urlsplit(path); args = dict(_parse_qsl(u.query))
            if query_string: args.update(query_string if isinstance(query_string, dict) else dict(_parse_qsl(query_string)))
            h = dict(headers or {}); form = {}; jsn = _NOJSON; raw = b""
            if json is not None:
                jsn = json; h["Content-Type"] = "application/json"; raw = _json.dumps(json).encode()
            elif data is not None:
                if isinstance(data, dict): form = {k: str(v) for k, v in data.items()}; h["Content-Type"] = "application/x-www-form-urlencoded"
                else: raw = data if isinstance(data, bytes) else str(data).encode()
            if content_type: h["Content-Type"] = content_type
            if jsn is _NOJSON and raw and h.get("Content-Type", "") .startswith("application/json"):
                try: jsn = _json.loads(raw.decode())
                except Exception: pass
            sess = _dec_sessao(self.app, self.cookies["session"]) if "session" in self.cookies and self.app.secret_key else {}
            ck = {k: v for k, v in self.cookies.items() if k != "session"}
            if "session" in self.cookies: ck["session"] = self.cookies["session"]
            req = Request(method.upper(), u.path or "/", args, form, jsn, h, ck, raw)
            resp, novo = self.app.processa(req, sess)
            if novo is not None and self.app.secret_key:
                v = _cod_sessao(self.app, novo) if novo else ""
                self.cookies["session"] = v
                resp.headers.add("Set-Cookie", "session=%s; HttpOnly; Path=/" % v) if novo else resp.headers.add("Set-Cookie", "session=; Max-Age=0; Path=/")
                if not novo: self.cookies.pop("session", None)
            for c in resp.headers.getlist("Set-Cookie"):
                par = c.split(";"); k, _, v = par[0].partition("=")
                if k != "session":
                    if any(p.strip().lower() == "max-age=0" for p in par[1:]): self.cookies.pop(k, None)
                    else: self.cookies[k] = v
            if follow_redirects and resp.status_code in (301, 302, 303, 307) and resp.location: method, path, data, json = "GET", resp.location, None, None; continue
            return resp
        return resp
    def get(self, p, **k): return self.open("GET", p, **k)
    def post(self, p, **k): return self.open("POST", p, **k)
    def put(self, p, **k): return self.open("PUT", p, **k)
    def delete(self, p, **k): return self.open("DELETE", p, **k)
    def patch(self, p, **k): return self.open("PATCH", p, **k)

# ---------- werkzeug.security (simplificado) ----------
def generate_password_hash(senha, method="sha256", salt_length=8):
    sal = _sec.token_hex(salt_length // 2 + 1)[:salt_length]
    return "sha256$%s$%s" % (sal, _hl.sha256((sal + senha).encode()).hexdigest())
def check_password_hash(h, senha):
    try: _, sal, d = h.split("$"); return _hl.sha256((sal + senha).encode()).hexdigest() == d
    except Exception: return False

def _mod(nome, **attrs):
    m = types.ModuleType(nome); m.__dict__.update(attrs); sys.modules[nome] = m; return m
_mod("flask", Flask=Flask, request=request, jsonify=jsonify, redirect=redirect, abort=abort, render_template_string=render_template_string,
     render_template=render_template, session=session, url_for=url_for, make_response=make_response, Blueprint=Blueprint, Response=Response,
     g=g, flash=flash, get_flashed_messages=get_flashed_messages, escape=escape, Markup=Markup)
_mod("markupsafe", escape=escape, Markup=Markup)
_w = _mod("werkzeug"); _w.security = _mod("werkzeug.security", generate_password_hash=generate_password_hash, check_password_hash=check_password_hash)
_w.exceptions = _mod("werkzeug.exceptions", HTTPException=HTTPException, NotFound=lambda d=None: HTTPException(404, d), BadRequest=lambda d=None: HTTPException(400, d))
