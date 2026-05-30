/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, F = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, B = Symbol(), Z = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== B) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (F && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Z.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Z.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _t = (i) => new ct(typeof i == "string" ? i : i + "", void 0, B), ht = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, o, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[r + 1], i[0]);
  return new ct(e, i, B);
}, $t = (i, t) => {
  if (F) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), o = D.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = e.cssText, i.appendChild(s);
  }
}, J = F ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return _t(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vt, defineProperty: mt, getOwnPropertyDescriptor: bt, getOwnPropertyNames: yt, getOwnPropertySymbols: xt, getPrototypeOf: At } = Object, v = globalThis, Q = v.trustedTypes, Et = Q ? Q.emptyScript : "", wt = v.reactiveElementPolyfillSupport, O = (i, t) => i, U = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Et : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, G = (i, t) => !vt(i, t), tt = { attribute: !0, type: String, converter: U, reflect: !1, useDefault: !1, hasChanged: G };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, e);
      o !== void 0 && mt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: o, set: r } = bt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: o, set(n) {
      const c = o?.call(this);
      r?.call(this, n), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = At(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, s = [...yt(e), ...xt(e)];
      for (const o of s) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, o] of e) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const o = this._$Eu(e, s);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) e.unshift(J(o));
    } else t !== void 0 && e.push(J(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $t(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : U).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = s.getPropertyOptions(o), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : U;
      this._$Em = o;
      const c = n.fromAttribute(e, r.type);
      this[o] = c ?? this._$Ej?.get(o) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, o = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (o === !1 && (r = this[t]), s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? G)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: o, wrapped: r }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: n } = r, c = this[o];
        n !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, r, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[O("elementProperties")] = /* @__PURE__ */ new Map(), x[O("finalized")] = /* @__PURE__ */ new Map(), wt?.({ ReactiveElement: x }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis, et = (i) => i, z = S.trustedTypes, it = z ? z.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, dt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, pt = "?" + _, Nt = `<${pt}>`, y = document, I = () => y.createComment(""), P = (i) => i === null || typeof i != "object" && typeof i != "function", Y = Array.isArray, Tt = (i) => Y(i) || typeof i?.[Symbol.iterator] == "function", W = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, ot = />/g, m = RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, nt = /"/g, ft = /^(?:script|style|textarea|title)$/i, Ot = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), $ = Ot(1), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), at = /* @__PURE__ */ new WeakMap(), b = y.createTreeWalker(y, 129);
function ut(i, t) {
  if (!Y(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(t) : t;
}
const St = (i, t) => {
  const e = i.length - 1, s = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = T;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let p, f, h = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, f = n.exec(a), f !== null); ) u = n.lastIndex, n === T ? f[1] === "!--" ? n = st : f[1] !== void 0 ? n = ot : f[2] !== void 0 ? (ft.test(f[2]) && (o = RegExp("</" + f[2], "g")), n = m) : f[3] !== void 0 && (n = m) : n === m ? f[0] === ">" ? (n = o ?? T, h = -1) : f[1] === void 0 ? h = -2 : (h = n.lastIndex - f[2].length, p = f[1], n = f[3] === void 0 ? m : f[3] === '"' ? nt : rt) : n === nt || n === rt ? n = m : n === st || n === ot ? n = T : (n = m, o = void 0);
    const g = n === m && i[c + 1].startsWith("/>") ? " " : "";
    r += n === T ? a + Nt : h >= 0 ? (s.push(p), a.slice(0, h) + dt + a.slice(h) + _ + g) : a + _ + (h === -2 ? c : g);
  }
  return [ut(i, r + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class k {
  constructor({ strings: t, _$litType$: e }, s) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const c = t.length - 1, a = this.parts, [p, f] = St(t, e);
    if (this.el = k.createElement(p, s), b.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = b.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(dt)) {
          const u = f[n++], g = o.getAttribute(h).split(_), M = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: r, name: M[2], strings: g, ctor: M[1] === "." ? It : M[1] === "?" ? Pt : M[1] === "@" ? kt : L }), o.removeAttribute(h);
        } else h.startsWith(_) && (a.push({ type: 6, index: r }), o.removeAttribute(h));
        if (ft.test(o.tagName)) {
          const h = o.textContent.split(_), u = h.length - 1;
          if (u > 0) {
            o.textContent = z ? z.emptyScript : "";
            for (let g = 0; g < u; g++) o.append(h[g], I()), b.nextNode(), a.push({ type: 2, index: ++r });
            o.append(h[u], I());
          }
        }
      } else if (o.nodeType === 8) if (o.data === pt) a.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(_, h + 1)) !== -1; ) a.push({ type: 7, index: r }), h += _.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function w(i, t, e = i, s) {
  if (t === E) return t;
  let o = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = P(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(i), o._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = o : e._$Cl = o), o !== void 0 && (t = w(i, o._$AS(i, t.values), o, s)), t;
}
class Ct {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, o = (t?.creationScope ?? y).importNode(e, !0);
    b.currentNode = o;
    let r = b.nextNode(), n = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let p;
        a.type === 2 ? p = new R(r, r.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (p = new Ht(r, this, t)), this._$AV.push(p), a = s[++c];
      }
      n !== a?.index && (r = b.nextNode(), n++);
    }
    return b.currentNode = y, o;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, o) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = w(this, t, e), P(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Tt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = k.createElement(ut(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const r = new Ct(o, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = at.get(t.strings);
    return e === void 0 && at.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, o = 0;
    for (const r of t) o === e.length ? e.push(s = new R(this.O(I()), this.O(I()), this, this.options)) : s = e[o], s._$AI(r), o++;
    o < e.length && (this._$AR(s && s._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = et(t).nextSibling;
      et(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, o, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = w(this, t, e, 0), n = !P(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const c = t;
      let a, p;
      for (t = r[0], a = 0; a < r.length - 1; a++) p = w(this, c[s + a], e, a), p === E && (p = this._$AH[a]), n || (n = !P(p) || p !== this._$AH[a]), p === d ? t = d : t !== d && (t += (p ?? "") + r[a + 1]), this._$AH[a] = p;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class It extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Pt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class kt extends L {
  constructor(t, e, s, o, r) {
    super(t, e, s, o, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = w(this, t, e, 0) ?? d) === E) return;
    const s = this._$AH, o = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== d && (s === d || o);
    o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ht {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    w(this, t);
  }
}
const Rt = S.litHtmlPolyfillSupport;
Rt?.(k, R), (S.litHtmlVersions ?? (S.litHtmlVersions = [])).push("3.3.3");
const Mt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = o = new R(t.insertBefore(I(), r), r, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis;
class A extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Mt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
A._$litElement$ = !0, A.finalized = !0, C.litElementHydrateSupport?.({ LitElement: A });
const Dt = C.litElementPolyfillSupport;
Dt?.({ LitElement: A });
(C.litElementVersions ?? (C.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = { attribute: !0, type: String, converter: U, reflect: !1, hasChanged: G }, zt = (i = Ut, t, e) => {
  const { kind: s, metadata: o } = e;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, a, i, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, i, c), c;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(c) {
      const a = this[n];
      t.call(this, c), this.requestUpdate(n, a, i, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function V(i) {
  return (t, e) => typeof e == "object" ? zt(i, t, e) : ((s, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, s), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function q(i) {
  return V({ ...i, state: !0, attribute: !1 });
}
const K = "notifier-stack-card", Lt = "notifier-stack-card-editor", jt = "1.0.0", l = {
  ICON: "mdi:bell-outline",
  COLOR: "0, 0, 0",
  ALPHA: 0.35,
  PRIORITY: "normal",
  PERSISTENT: !1,
  NOTIFICATION_HEIGHT: "72px",
  NOTIFICATION_WIDTH: "100%",
  EMPTY_ICON: "mdi:check-circle-outline",
  EMPTY_TEXT: "No Notifications to Action",
  EMPTY_COLOR: "0, 0, 0",
  EMPTY_ALPHA: 0.35
}, Wt = "8px";
function Ft(i, t) {
  return {
    entity: i.entity,
    text: i.text ?? "",
    icon: i.icon ?? l.ICON,
    color: i.color ?? l.COLOR,
    alpha: i.alpha ?? l.ALPHA,
    priority: i.priority ?? l.PRIORITY,
    persistent: i.persistent ?? l.PERSISTENT,
    isActive: t
  };
}
function Bt(i) {
  return [...i].sort((t, e) => t.priority === "urgent" && e.priority !== "urgent" ? -1 : t.priority !== "urgent" && e.priority === "urgent" ? 1 : 0);
}
function Gt(i, t) {
  if (!i.notifications?.length) return [];
  const s = i.notifications.map((o) => {
    const n = t[o.entity]?.state === "on";
    return Ft(o, n);
  }).filter((o) => o.isActive);
  return Bt(s);
}
function Yt(i) {
  return /^\d+(\.\d+)?(px|%|rem|em|vh|vw|fr|ch|ex|pt|cm|mm)$/.test(i.trim());
}
function lt(i, t) {
  return i && Yt(i) ? i.trim() : t;
}
var Vt = Object.defineProperty, qt = Object.getOwnPropertyDescriptor, X = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? qt(t, e) : t, r = i.length - 1, n; r >= 0; r--)
    (n = i[r]) && (o = (s ? n(t, e, o) : n(o)) || o);
  return s && o && Vt(t, e, o), o;
};
let H = class extends A {
  static getConfigElement() {
    return document.createElement("notifier-stack-card-editor");
  }
  static getStubConfig() {
    return {
      type: `custom:${K}`,
      notification_height: l.NOTIFICATION_HEIGHT,
      notification_width: l.NOTIFICATION_WIDTH,
      notifications: [
        {
          entity: "input_boolean.example_notification",
          text: "Example Notification",
          icon: l.ICON,
          color: l.COLOR,
          priority: l.PRIORITY
        }
      ]
    };
  }
  setConfig(i) {
    if (!i) throw new Error("Invalid configuration");
    this._config = i;
  }
  get _notificationHeight() {
    return lt(this._config?.notification_height, l.NOTIFICATION_HEIGHT);
  }
  get _notificationWidth() {
    return lt(this._config?.notification_width, l.NOTIFICATION_WIDTH);
  }
  _handleTap(i) {
    !this.hass || i.persistent || this.hass.callService("input_boolean", "turn_off", {
      entity_id: i.entity
    });
  }
  _renderNotification(i) {
    return $`
      <div
        class="notification ${i.persistent ? "persistent" : ""}"
        style="--notification-rgb: ${i.color}; --notification-alpha: ${i.alpha};"
        role="button"
        tabindex="0"
        aria-label="Dismiss: ${i.text}"
        @click=${() => this._handleTap(i)}
        @keydown=${(t) => {
      (t.key === "Enter" || t.key === " ") && this._handleTap(i);
    }}
      >
        <ha-icon icon="${i.icon}" class="notification-icon"></ha-icon>
        <span class="notification-text">${i.text}</span>
        ${i.priority === "urgent" ? $`<span class="priority-badge">Urgent</span>` : d}
      </div>
    `;
  }
  _renderEmpty() {
    return $`
      <div
        class="notification empty-state"
        style="--notification-rgb: ${l.EMPTY_COLOR}; --notification-alpha: ${l.EMPTY_ALPHA};"
      >
        <ha-icon icon="${l.EMPTY_ICON}" class="notification-icon empty-icon"></ha-icon>
        <span class="notification-text empty-text">${l.EMPTY_TEXT}</span>
      </div>
    `;
  }
  render() {
    if (!this._config || !this.hass) return d;
    const i = Gt(this._config, this.hass.states);
    return $`
      <ha-card>
        <div
          class="card-content"
          style="
            --notification-height: ${this._notificationHeight};
            --notification-width: ${this._notificationWidth};
            --notification-gap: ${Wt};
          "
        >
          ${i.length > 0 ? i.map((t) => this._renderNotification(t)) : this._renderEmpty()}
        </div>
      </ha-card>
    `;
  }
};
H.styles = ht`
    :host {
      display: block;
    }

    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      gap: var(--notification-gap, 8px);
      padding: 0;
    }

    .notification {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      min-height: var(--notification-height, 72px);
      width: var(--notification-width, 100%);
      box-sizing: border-box;
      padding: 16px;
      border-radius: 16px;
      background: rgba(var(--notification-rgb, 120, 120, 120), var(--notification-alpha, 0.18));
      cursor: pointer;
      user-select: none;
      outline: none;
      position: relative;
    }

    .notification:focus-visible {
      box-shadow: 0 0 0 2px rgb(var(--notification-rgb, 120, 120, 120));
    }

    .notification:active {
      opacity: 0.8;
    }

    .notification.persistent {
      cursor: default;
    }

    .notification-icon {
      --mdc-icon-size: 36px;
      width: 36px;
      height: 36px;
      flex-shrink: 0;
      color: #ffffff;
    }

    .notification-text {
      font-size: 20px;
      font-weight: 500;
      flex: 1;
      line-height: 1.3;
      color: #ffffff;
    }

    .priority-badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.7);
      border-radius: 4px;
      padding: 2px 6px;
      flex-shrink: 0;
    }

    .empty-state {
      cursor: default;
      justify-content: center;
    }

    .empty-text {
      font-size: 16px;
      font-weight: 400;
      text-align: center;
    }
  `;
X([
  V({ attribute: !1 })
], H.prototype, "hass", 2);
X([
  q()
], H.prototype, "_config", 2);
H = X([
  gt(K)
], H);
var Kt = Object.defineProperty, Xt = Object.getOwnPropertyDescriptor, j = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? Xt(t, e) : t, r = i.length - 1, n; r >= 0; r--)
    (n = i[r]) && (o = (s ? n(t, e, o) : n(o)) || o);
  return s && o && Kt(t, e, o), o;
};
let N = class extends A {
  constructor() {
    super(...arguments), this._drag = null;
  }
  setConfig(i) {
    this._config = { ...i };
  }
  // ---------------------------------------------------------------------------
  // Config helpers
  // ---------------------------------------------------------------------------
  _fire(i) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _updateGlobal(i, t) {
    this._fire({ ...this._config, [i]: t });
  }
  _updateNotification(i, t, e) {
    const s = [...this._config.notifications ?? []];
    s[i] = { ...s[i], [t]: e }, this._fire({ ...this._config, notifications: s });
  }
  _addNotification() {
    const i = [
      ...this._config.notifications ?? [],
      {
        entity: "",
        text: "New Notification",
        icon: l.ICON,
        color: l.COLOR,
        priority: l.PRIORITY
      }
    ];
    this._fire({ ...this._config, notifications: i });
  }
  _removeNotification(i) {
    const t = [...this._config.notifications ?? []];
    t.splice(i, 1), this._fire({ ...this._config, notifications: t });
  }
  _moveNotification(i, t) {
    if (t < 0 || t >= (this._config.notifications?.length ?? 0)) return;
    const e = [...this._config.notifications ?? []], [s] = e.splice(i, 1);
    e.splice(t, 0, s), this._fire({ ...this._config, notifications: e });
  }
  // ---------------------------------------------------------------------------
  // Drag & drop
  // ---------------------------------------------------------------------------
  _onDragStart(i, t) {
    this._drag = { draggingIndex: t, overIndex: t }, i.dataTransfer && (i.dataTransfer.effectAllowed = "move", i.dataTransfer.setData("text/plain", String(t)));
  }
  _onDragOver(i, t) {
    i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "move"), this._drag && this._drag.overIndex !== t && (this._drag = { ...this._drag, overIndex: t });
  }
  _onDrop(i, t) {
    if (i.preventDefault(), !this._drag) return;
    const e = this._drag.draggingIndex;
    this._drag = null, e !== t && this._moveNotification(e, t);
  }
  _onDragEnd() {
    this._drag = null;
  }
  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------
  _renderGlobalSettings() {
    return $`
      <div class="section-header">Global Settings</div>

      <div class="field-row">
        <label class="field-label">Notification Height</label>
        <input
          class="field-input"
          type="text"
          .value=${this._config.notification_height ?? l.NOTIFICATION_HEIGHT}
          placeholder="${l.NOTIFICATION_HEIGHT}"
          @change=${(i) => this._updateGlobal("notification_height", i.target.value)}
        />
      </div>

      <div class="field-row">
        <label class="field-label">Notification Width</label>
        <input
          class="field-input"
          type="text"
          .value=${this._config.notification_width ?? l.NOTIFICATION_WIDTH}
          placeholder="${l.NOTIFICATION_WIDTH}"
          @change=${(i) => this._updateGlobal("notification_width", i.target.value)}
        />
      </div>
    `;
  }
  _renderNotificationEditor(i, t) {
    const e = this._drag?.draggingIndex === t, s = this._drag?.overIndex === t && this._drag?.draggingIndex !== t;
    return $`
      <div
        class="notification-item ${e ? "dragging" : ""} ${s ? "drag-over" : ""}"
        draggable="true"
        @dragstart=${(o) => this._onDragStart(o, t)}
        @dragover=${(o) => this._onDragOver(o, t)}
        @drop=${(o) => this._onDrop(o, t)}
        @dragend=${() => this._onDragEnd()}
      >
        <div class="notification-item-header">
          <span class="drag-handle" title="Drag to reorder">⠿</span>
          <span class="notification-label">
            ${i.text || i.entity || `Notification ${t + 1}`}
          </span>
          <div class="header-actions">
            <button
              class="icon-btn"
              title="Move up"
              ?disabled=${t === 0}
              @click=${() => this._moveNotification(t, t - 1)}
            >▲</button>
            <button
              class="icon-btn"
              title="Move down"
              ?disabled=${t === (this._config.notifications?.length ?? 0) - 1}
              @click=${() => this._moveNotification(t, t + 1)}
            >▼</button>
            <button
              class="icon-btn remove-btn"
              title="Remove"
              @click=${() => this._removeNotification(t)}
            >✕</button>
          </div>
        </div>

        <div class="notification-fields">
          <!-- Entity picker -->
          <div class="field-row">
            <label class="field-label">Entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${i.entity ?? ""}
              .includeDomains=${["input_boolean"]}
              allow-custom-entity
              @value-changed=${(o) => this._updateNotification(t, "entity", o.detail.value)}
            ></ha-entity-picker>
          </div>

          <!-- Text -->
          <div class="field-row">
            <label class="field-label">Text</label>
            <input
              class="field-input"
              type="text"
              .value=${i.text ?? ""}
              placeholder="Notification text"
              @input=${(o) => this._updateNotification(t, "text", o.target.value)}
            />
          </div>

          <!-- Icon picker -->
          <div class="field-row">
            <label class="field-label">Icon</label>
            <ha-icon-picker
              .value=${i.icon ?? l.ICON}
              @value-changed=${(o) => this._updateNotification(t, "icon", o.detail.value)}
            ></ha-icon-picker>
          </div>

          <!-- Colour -->
          <div class="field-row">
            <label class="field-label">Colour (RGB)</label>
            <div class="color-row">
              <input
                class="field-input color-text"
                type="text"
                .value=${i.color ?? l.COLOR}
                placeholder="e.g. 100, 0, 255"
                @change=${(o) => this._updateNotification(t, "color", o.target.value)}
              />
              <input
                class="color-swatch"
                type="color"
                .value=${this._rgbToHex(i.color ?? l.COLOR)}
                title="Pick colour"
                @input=${(o) => {
      const r = o.target.value;
      this._updateNotification(t, "color", this._hexToRgb(r));
    }}
              />
            </div>
          </div>

          <!-- Alpha -->
          <div class="field-row">
            <label class="field-label">Opacity</label>
            <div class="alpha-row">
              <input
                class="alpha-slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                .value=${String(i.alpha ?? l.ALPHA)}
                @input=${(o) => this._updateNotification(
      t,
      "alpha",
      parseFloat(o.target.value)
    )}
              />
              <span class="alpha-value">${Math.round((i.alpha ?? l.ALPHA) * 100)}%</span>
            </div>
          </div>

          <!-- Priority -->
          <div class="field-row">
            <label class="field-label">Priority</label>
            <select
              class="field-input"
              .value=${i.priority ?? l.PRIORITY}
              @change=${(o) => this._updateNotification(
      t,
      "priority",
      o.target.value
    )}
            >
              <option value="normal" ?selected=${(i.priority ?? "normal") === "normal"}>
                Normal
              </option>
              <option value="urgent" ?selected=${i.priority === "urgent"}>
                Urgent
              </option>
            </select>
          </div>

          <!-- Persistent -->
          <div class="field-row">
            <label class="field-label">Persistent</label>
            <label class="toggle-label">
              <input
                type="checkbox"
                class="toggle-input"
                .checked=${i.persistent ?? l.PERSISTENT}
                @change=${(o) => this._updateNotification(
      t,
      "persistent",
      o.target.checked
    )}
              />
              <span class="toggle-track">
                <span class="toggle-thumb"></span>
              </span>
              <span class="toggle-hint">
                ${i.persistent ? "Won't dismiss on tap" : "Tap to dismiss"}
              </span>
            </label>
          </div>
        </div>
      </div>
    `;
  }
  // ---------------------------------------------------------------------------
  // Colour conversion helpers
  // ---------------------------------------------------------------------------
  _rgbToHex(i) {
    try {
      const t = i.split(",").map((e) => parseInt(e.trim(), 10));
      return t.length !== 3 || t.some(isNaN) ? "#787878" : "#" + t.map((e) => Math.min(255, Math.max(0, e)).toString(16).padStart(2, "0")).join("");
    } catch {
      return "#787878";
    }
  }
  _hexToRgb(i) {
    const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i);
    return t ? `${parseInt(t[1], 16)}, ${parseInt(t[2], 16)}, ${parseInt(t[3], 16)}` : l.COLOR;
  }
  // ---------------------------------------------------------------------------
  // Main render
  // ---------------------------------------------------------------------------
  render() {
    if (!this._config) return d;
    const i = this._config.notifications ?? [];
    return $`
      <div class="editor">
        ${this._renderGlobalSettings()}

        <div class="section-header notifications-header">
          <span>Notifications</span>
          <button class="add-btn" @click=${this._addNotification}>+ Add Notification</button>
        </div>

        ${i.length === 0 ? $`<div class="empty-hint">No notifications configured yet.</div>` : i.map((t, e) => this._renderNotificationEditor(t, e))}
      </div>
    `;
  }
};
N.styles = ht`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 0;
    }

    .section-header {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
      margin-top: 12px;
      margin-bottom: 4px;
    }

    .notifications-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .field-row {
      display: grid;
      grid-template-columns: 130px 1fr;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }

    .field-label {
      font-size: 13px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .field-input {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
    }

    .field-input:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: -1px;
      border-color: transparent;
    }

    select.field-input {
      cursor: pointer;
    }

    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-text {
      flex: 1;
    }

    .color-swatch {
      width: 36px;
      height: 34px;
      padding: 2px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      cursor: pointer;
      background: none;
      flex-shrink: 0;
    }

    .alpha-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .alpha-slider {
      flex: 1;
      cursor: pointer;
      accent-color: var(--primary-color);
    }

    .alpha-value {
      font-size: 13px;
      color: var(--secondary-text-color);
      min-width: 36px;
      text-align: right;
    }

    .toggle-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }

    .toggle-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-track {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 22px;
      background: var(--divider-color, #ccc);
      border-radius: 11px;
      transition: background 0.2s;
      flex-shrink: 0;
    }

    .toggle-input:checked ~ .toggle-track {
      background: var(--primary-color);
    }

    .toggle-thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.2s;
    }

    .toggle-input:checked ~ .toggle-track .toggle-thumb {
      transform: translateX(18px);
    }

    .toggle-hint {
      font-size: 13px;
      color: var(--secondary-text-color);
    }

    ha-entity-picker,
    ha-icon-picker {
      display: block;
      width: 100%;
    }

    .notification-item {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      padding: 10px 12px;
      background: var(--secondary-background-color, #f5f5f5);
      cursor: grab;
      transition: box-shadow 0.15s, opacity 0.15s;
    }

    .notification-item.dragging {
      opacity: 0.4;
      cursor: grabbing;
    }

    .notification-item.drag-over {
      box-shadow: 0 0 0 2px var(--primary-color);
      background: var(--primary-color-light, rgba(33, 150, 243, 0.08));
    }

    .notification-item-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }

    .drag-handle {
      font-size: 18px;
      color: var(--disabled-text-color, #999);
      cursor: grab;
      flex-shrink: 0;
      line-height: 1;
    }

    .notification-label {
      flex: 1;
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .header-actions {
      display: flex;
      gap: 2px;
      flex-shrink: 0;
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1;
    }

    .icon-btn:hover:not([disabled]) {
      background: var(--divider-color);
    }

    .icon-btn[disabled] {
      opacity: 0.3;
      cursor: default;
    }

    .remove-btn {
      color: var(--error-color, #f44336);
    }

    .notification-fields {
      padding-left: 26px;
    }

    .add-btn {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }

    .add-btn:hover {
      opacity: 0.88;
    }

    .empty-hint {
      font-size: 13px;
      color: var(--disabled-text-color, #999);
      text-align: center;
      padding: 12px 0;
    }
  `;
j([
  V({ attribute: !1 })
], N.prototype, "hass", 2);
j([
  q()
], N.prototype, "_config", 2);
j([
  q()
], N.prototype, "_drag", 2);
N = j([
  gt(Lt)
], N);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: K,
  name: "Notifier Stack Card",
  description: "A modern notification stack card for Home Assistant. Displays input_boolean-driven notifications with priority ordering and a clean Mushroom-inspired design.",
  preview: !0
});
console.info(
  `%c NOTIFIER-STACK-CARD %c v${jt} `,
  "background:#1976d2;color:#fff;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:700;",
  "background:#424242;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0;"
);
