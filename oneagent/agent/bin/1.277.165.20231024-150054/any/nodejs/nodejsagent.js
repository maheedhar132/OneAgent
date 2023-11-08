// ----------------------------------------------------------------------------
// Copyright 2016-2022 Dynatrace
// All rights reserved.
// ----------------------------------------------------------------------------
// This document contains proprietary information belonging to Dynatrace.
// Passing on and copying of this document, use, and communication of its
// contents is not permitted without prior written authorization.
// ----------------------------------------------------------------------------

"use strict";

(function() {
var aa = aa || {};
aa.scope = {};
aa.arrayIteratorImpl = function(O) {
  var a = 0;
  return function() {
    return a < O.length ? {done:!1, value:O[a++],} : {done:!0};
  };
};
aa.arrayIterator = function(O) {
  return {next:aa.arrayIteratorImpl(O)};
};
aa.ASSUME_ES5 = !1;
aa.ASSUME_NO_NATIVE_MAP = !1;
aa.ASSUME_NO_NATIVE_SET = !1;
aa.SIMPLE_FROUND_POLYFILL = !1;
aa.ISOLATE_POLYFILLS = !1;
aa.FORCE_POLYFILL_PROMISE = !1;
aa.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
aa.defineProperty = aa.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(O, a, u) {
  if (O == Array.prototype || O == Object.prototype) {
    return O;
  }
  O[a] = u.value;
  return O;
};
aa.getGlobal = function(O) {
  O = ["object" == typeof globalThis && globalThis, O, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var a = 0; a < O.length; ++a) {
    var u = O[a];
    if (u && u.Math == Math) {
      return u;
    }
  }
  throw Error("Cannot find global object");
};
aa.global = aa.getGlobal(this);
aa.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
aa.TRUST_ES6_POLYFILLS = !aa.ISOLATE_POLYFILLS || aa.IS_SYMBOL_NATIVE;
aa.polyfills = {};
aa.propertyToPolyfillSymbol = {};
aa.POLYFILL_PREFIX = "$jscp$";
aa.polyfill = function(O, a, u, t) {
  a && (aa.ISOLATE_POLYFILLS ? aa.polyfillIsolated(O, a, u, t) : aa.polyfillUnisolated(O, a, u, t));
};
aa.polyfillUnisolated = function(O, a) {
  var u = aa.global;
  O = O.split(".");
  for (var t = 0; t < O.length - 1; t++) {
    var r = O[t];
    if (!(r in u)) {
      return;
    }
    u = u[r];
  }
  O = O[O.length - 1];
  t = u[O];
  a = a(t);
  a != t && null != a && aa.defineProperty(u, O, {configurable:!0, writable:!0, value:a});
};
aa.polyfillIsolated = function(O, a, u) {
  var t = O.split(".");
  O = 1 === t.length;
  var r = t[0];
  r = !O && r in aa.polyfills ? aa.polyfills : aa.global;
  for (var n = 0; n < t.length - 1; n++) {
    var p = t[n];
    if (!(p in r)) {
      return;
    }
    r = r[p];
  }
  t = t[t.length - 1];
  u = aa.IS_SYMBOL_NATIVE && "es6" === u ? r[t] : null;
  a = a(u);
  null != a && (O ? aa.defineProperty(aa.polyfills, t, {configurable:!0, writable:!0, value:a}) : a !== u && (void 0 === aa.propertyToPolyfillSymbol[t] && (O = 1E9 * Math.random() >>> 0, aa.propertyToPolyfillSymbol[t] = aa.IS_SYMBOL_NATIVE ? aa.global.Symbol(t) : aa.POLYFILL_PREFIX + O + "$" + t), aa.defineProperty(r, aa.propertyToPolyfillSymbol[t], {configurable:!0, writable:!0, value:a})));
};
aa.initSymbol = function() {
};
aa.iteratorPrototype = function(O) {
  O = {next:O};
  O[Symbol.iterator] = function() {
    return this;
  };
  return O;
};
aa.polyfill("Object.fromEntries", function(O) {
  return O ? O : function(a) {
    var u = {};
    if (!(Symbol.iterator in a)) {
      throw new TypeError("" + a + " is not iterable");
    }
    a = a[Symbol.iterator].call(a);
    for (var t = a.next(); !t.done; t = a.next()) {
      t = t.value;
      if (Object(t) !== t) {
        throw new TypeError("iterable for fromEntries should yield objects");
      }
      u[t[0]] = t[1];
    }
    return u;
  };
}, "es_2019", "es3");
aa.polyfill("String.prototype.trimRight", function(O) {
  function a() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return O || a;
}, "es_2019", "es3");
module.__DT_NODE_OBFUSCATED_AGENT__ = !0;
const S = (() => {
  function O(l) {
    const c = [], m = r[l];
    if (m.exports === n) {
      t && console.log("resolving " + l);
      m.exports = {_____DynatraceAmdLoaderModuleName:l};
      m.isResolving = !0;
      for (const d of m.dependencies) {
        "require" === d ? c.push(require) : "exports" === d ? c.push(m.exports) : void 0 !== r[d] ? (c.push(O(d)), t && r[d].isResolving && console.log("module " + l + " is dependent on resolving module " + d)) : global.__DT_AMDLOADER_ALLOW_EXTERNALS__ || k.hasOwnProperty(d) || p[d] ? c.push(require(d)) : require("assert")(!1, "forbidden request to external module " + d);
      }
      l = m.generator.apply(void 0, c);
      void 0 !== l && (m.exports = l);
      m.isResolving = !1;
    }
    return m.exports;
  }
  function a() {
    O("src/nodejsagent");
    for (const l in r) {
      O(l);
    }
  }
  function u(l, c) {
    a();
    return r["src/nodejsagent"].exports(l, c);
  }
  const t = process.env.DT_NODE_AMD_LOADER_ENABLE_LOGGING, r = {}, n = {}, p = {}, k = process.binding("natives");
  u.amdModuleLoader = {resolve:O, resolveAll:a, moduleMap:r};
  module.exports = u;
  return function(l, c, m) {
    let d = r[l];
    void 0 === d && (d = {generator:m, dependencies:c, exports:n, isResolving:!1}, r[l] = d, t && console.log("creating module " + l));
  };
})();
S("src/lib/util/CoreUtil", ["require", "exports"], function(O, a) {
  function u(n) {
    return null !== n && "object" === typeof n;
  }
  function t(n, p, ...k) {
    if ((k = null != n && null != n[p]) && 2 < arguments.length) {
      n = n[p];
      k = null != n;
      for (let l = 2; l < arguments.length && k; ++l) {
        n = n[arguments[l]], k = null != n;
      }
    }
    return k;
  }
  var r;
  Object.defineProperty(a, "__esModule", {value:!0});
  a.getDurationMicros = a.getDurationMillis = a.getTimeStamp = a.match = a.hasElements = a.getOptionalPropertyValue = a.getPropertyNameAnyOf = a.getPropertyByPath = a.hasProperty = a.hasSingleProperty = a.stripByteOrderMark = a.pad = a.objectFromEntries = a.isEmptyObject = a.isObject = a.isError = void 0;
  a.isError = function(n) {
    return n instanceof Error;
  };
  a.isObject = u;
  a.isEmptyObject = function(n) {
    let p;
    for (p in n) {
      return !1;
    }
    return !0;
  };
  a.objectFromEntries = null !== (r = Object.fromEntries) && void 0 !== r ? r : function(n) {
    return Object.assign({}, ...[...n].map(([p, k]) => ({[p]:k})));
  };
  a.pad = function(n, p = 2, k = "0") {
    return `${Array(p + 1).join(k)}${n}`.slice(-p);
  };
  a.stripByteOrderMark = function(n) {
    return 65279 === n.charCodeAt(0) ? n.slice(1) : n;
  };
  a.hasSingleProperty = function(n, p) {
    return null != p && null != n && u(n) && p in n;
  };
  a.hasProperty = t;
  a.getPropertyByPath = function(n, p) {
    if (null != n && (Array.isArray(p) || (p = p.split(".")), 0 !== p.length)) {
      n = n[p[0]];
      for (let k = 1; k < p.length && null != n; ++k) {
        n = n[p[k]];
      }
      return n;
    }
  };
  a.getPropertyNameAnyOf = function(n, p) {
    if (null != n && 0 < p.length) {
      for (const k of p) {
        if (null != n[k]) {
          return k;
        }
      }
    }
  };
  a.getOptionalPropertyValue = function(n, p, k) {
    return t(n, p) ? n[p] : k;
  };
  a.hasElements = function(n, p = 1) {
    return null != n && n.length >= p;
  };
  a.match = function(n, p) {
    let k;
    if (Array.isArray(n)) {
      for (let c = 0; null == k && c < n.length; ++c) {
        var l = n[c];
        ("string" === typeof l ? l === p : l.test(p)) && (k = n[c]);
      }
    } else {
      "string" === typeof n ? n === p && (k = n) : n.test(p) && (k = n);
    }
    return k;
  };
  a.getTimeStamp = process.hrtime;
  a.getDurationMillis = function(n) {
    n = process.hrtime(n);
    return Math.round(1000 * n[0] + n[1] / 1000000);
  };
  a.getDurationMicros = function(n) {
    n = process.hrtime(n);
    return Math.round(1000000 * n[0] + n[1] / 1000);
  };
});
S("src/lib/Debug", ["require", "exports", "assert"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.setUnitTestMode = a.unitTestMode = a.setDebugMode = a.isEnabled = a.fail = a.assertNotStrictEqual = a.assertStrictEqual = a.assert = a.test = void 0;
  let t = null != process.env.DT_NODE_AGENT_DEBUG_MODE_ENABLE;
  a.test = function(r) {
    return t && r;
  };
  a.assert = function(r, n) {
    t && u.ok(r, n);
  };
  a.assertStrictEqual = function(r, n, p) {
    t && u.strictEqual(r, n, p);
  };
  a.assertNotStrictEqual = function(r, n, p) {
    t && u.notStrictEqual(r, n, p);
  };
  a.fail = function(r) {
    if (t) {
      throw Error(null !== r && void 0 !== r ? r : "unconditional debug assertion.");
    }
  };
  a.isEnabled = function() {
    return t;
  };
  a.setDebugMode = function(r) {
    t = r;
  };
  a.unitTestMode = !1;
  a.setUnitTestMode = function(r) {
    a.unitTestMode = r;
  };
});
S("src/lib/RunTimeProperty", ["require", "exports", "src/lib/Agent", "src/lib/Debug", "src/lib/util/ErrorUtil"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.StringOption = a.NumberOption = a.NumberSetting = a.BooleanOption = a.BooleanProperty = a.parseForRunTimeProperties = a.PropertyRtcUpdateListener = void 0;
  class n {
    constructor(w) {
      this.value = w;
    }
  }
  class p {
  }
  class k {
    constructor() {
      this.entries = new p();
    }
    get(w, G) {
      let y = this.entries[w];
      if (!y) {
        if (u.Agent && u.Agent.nativeAgent) {
          switch(typeof G) {
            case "boolean":
              G = u.Agent.nativeAgent.getBooleanRunTimePropertyValue(w, G);
              break;
            case "number":
              G = u.Agent.nativeAgent.getNumericalRunTimePropertyValue(w, G);
              break;
            case "string":
              G = u.Agent.nativeAgent.getStringRunTimePropertyValue(w, G);
              break;
            default:
              t.fail("unknown property type");
          }
        }
        y = new n(G);
        this.entries[w] = y;
      }
      return y;
    }
    set(w, G) {
      if (null == G) {
        r.logAgentException(new TypeError(`PropertyValuePool.set(${w}) with emtpy value`));
      } else {
        var y = this.entries[w];
        y ? y.value = G : this.entries[w] = new n(G);
      }
    }
    update(w, G) {
      const y = this.entries[w];
      y && (null != G ? y.value = G : r.logAgentException(new TypeError(`PropertyValuePool.update(${w}) with empty value`)));
    }
    _testRemove(w) {
      delete this.entries[w];
    }
    updateExistingFromNative(w) {
      for (const G in this.entries) {
        const y = this.entries[G];
        if (null != y.value) {
          const D = w.call(u.Agent.nativeAgent, G, y.value);
          null != D ? y.value = D : r.logAgentException(new TypeError(`Native agent returned no value for Property ${G}`));
        } else {
          r.logAgentException(new TypeError(`Property ${G} has no value`));
        }
      }
    }
    copyEntries() {
      const w = {names:[], defaultValues:[]};
      for (const G in this.entries) {
        this.entries.hasOwnProperty(G) && (w.names.push(G), w.defaultValues.push(this.entries[G].value));
      }
      return w;
    }
  }
  const l = new k(), c = new k(), m = new k();
  class d {
    onConfigUpdate(w) {
      if ((w = w.rtc) && !d.updateExistingFromNative()) {
        for (const G in w.booleanMap) {
          l.update(G, w.booleanMap[G]);
        }
        for (const G in w.longMap) {
          c.update(G, w.longMap[G]);
        }
        for (const G in w.stringMap) {
          m.update(G, w.stringMap[G]);
        }
      }
    }
    onLifeCycleStateChanged() {
      d.updateExistingFromNative();
    }
    static updateExistingFromNative() {
      return u.Agent.lifeCycleState === u.LifeCycleState.Running && u.Agent.nativeAgent ? (l.updateExistingFromNative(u.Agent.nativeAgent.getBooleanRunTimePropertyValue), c.updateExistingFromNative(u.Agent.nativeAgent.getNumericalRunTimePropertyValue), m.updateExistingFromNative(u.Agent.nativeAgent.getStringRunTimePropertyValue), !0) : !1;
    }
  }
  a.PropertyRtcUpdateListener = d;
  a.parseForRunTimeProperties = function(w) {
    for (const G of Object.getOwnPropertyNames(w)) {
      if (G.startsWith("debugNode") || G.startsWith("optionNode")) {
        const y = w[G];
        switch(typeof y) {
          case "boolean":
            l.set(G, y);
            break;
          case "number":
            c.set(G, y);
            break;
          case "string":
            m.set(G, y);
        }
      }
    }
  };
  class e {
    constructor(w, G) {
      this.name = w;
      this.valueRef = G;
    }
    get value() {
      return this.valueRef.value;
    }
    static makeName(w, G = "debug") {
      return `${G}Node${w}NodeJS`;
    }
  }
  class b extends e {
    constructor(w, G = !1) {
      w = e.makeName(w);
      super(w, l.get(w, G));
    }
    static getBooleanPropertyPool() {
      return l;
    }
  }
  a.BooleanProperty = b;
  class g extends e {
    constructor(w, G = !1) {
      w = e.makeName(w, "option");
      super(w, l.get(w, G));
    }
    static getBooleanPropertyPool() {
      return l;
    }
  }
  a.BooleanOption = g;
  class h extends e {
    constructor(w, G = 0) {
      super(w, c.get(w, G));
    }
    static getNumberPropertyPool() {
      return c;
    }
  }
  a.NumberSetting = h;
  class f extends e {
    constructor(w, G = 0) {
      w = e.makeName(w, "option");
      super(w, c.get(w, G));
    }
    static getNumberPropertyPool() {
      return c;
    }
  }
  a.NumberOption = f;
  class q extends e {
    constructor(w, G = "") {
      w = e.makeName(w, "option");
      super(w, m.get(w, G));
    }
    static getStringPropertyPool() {
      return m;
    }
  }
  a.StringOption = q;
});
S("src/lib/MethodIdCache", ["require", "exports", "src/lib/Agent", "src/lib/RunTimeProperty", "src/lib/util/CoreUtil"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MethodIdCache = void 0;
  class n {
    constructor() {
      this.fileNameCount = this.methodIdObjectCount = 0;
    }
    toString() {
      return `[${this.fileNameCount} ${this.methodIdObjectCount}]`;
    }
  }
  class p {
    constructor() {
      this.debugFlag = new t.BooleanProperty("MethodIdCache");
      this.disableFlag = new t.BooleanProperty("MethodIdCacheDisabled");
      this.reset();
    }
    get statistics() {
      return this.stats;
    }
    get enabled() {
      return !this.disableFlag.value;
    }
    reset() {
      this.cache = Object.create(null);
      this.stats = new n();
    }
    get(k, l) {
      let c;
      if (this.disableFlag.value) {
        r.isEmptyObject(this.cache) || this.reset(), c = u.Agent.nativeAgent.registerMethod(k, l);
      } else {
        let m = this.cache[l];
        null == m && (m = Object.create(null), this.cache[l] = m, ++this.stats.fileNameCount);
        c = m[k];
        null == c && (c = u.Agent.nativeAgent.registerMethod(k, l), m[k] = c, ++this.stats.methodIdObjectCount, this.debugFlag.value && u.Logger.debug(`MethodRegistryCache: created id ${c} #${this.stats.methodIdObjectCount} from '${k}' '${l}'`), 255 === (this.stats.methodIdObjectCount & 255) && u.Logger.info(`MethodRegistryCache: grown to ${this.stats} entries`));
      }
      return c;
    }
  }
  a.MethodIdCache = new p();
});
S("src/lib/util/Reflection", ["require", "exports", "util"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.copyPromisifyProperties = a.cloneFunctionProperties = a.cAnonymousFnName = void 0;
  a.cAnonymousFnName = "<anonymous>";
  a.cloneFunctionProperties = function(t, r, n = "") {
    n = r.name ? r.name : n;
    t.name !== n && Object.defineProperty(t, "name", {value:n, enumerable:!1, configurable:!0, writable:!1});
    t.length !== r.length && Object.defineProperty(t, "length", {value:r.length, enumerable:!1, configurable:!0, writable:!1});
  };
  a.copyPromisifyProperties = function(t, r) {
    if (u.promisify) {
      var n = Object.getOwnPropertySymbols(r);
      for (const p of n) {
        t.hasOwnProperty(p) || p !== u.promisify.custom && "Symbol(customPromisifyArgs)" !== p.toString() || (n = Object.getOwnPropertyDescriptor(r, p), Object.defineProperty(t, p, n));
      }
    }
  };
});
S("src/lib/DebugLoggingEntity", "require exports src/lib/Debug src/lib/Logger src/lib/RunTimeProperty src/lib/util/InvocationUtil".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.DebugLoggingEntity = void 0;
  class p {
    constructor(k) {
      this.debugFlag = new r.BooleanProperty(k, u.unitTestMode);
    }
    get isDebugEnabled() {
      return this.debugFlag.value || null != this.domainDebugFlags && this.domainDebugFlags.some(k => k.value);
    }
    get debugFlagName() {
      return this.debugFlag.name;
    }
    logDebug() {
      this.isDebugEnabled && n.doInvoke(void 0, t.debug, arguments);
    }
    addToDebugLogDomain(k) {
      null == this.domainDebugFlags && (this.domainDebugFlags = []);
      this.domainDebugFlags.push(new r.BooleanProperty(k, u.unitTestMode));
    }
  }
  a.DebugLoggingEntity = p;
});
S("src/lib/Embedder", ["require", "exports", "src/lib/util/CoreUtil"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.createPrivate = a.create = a.cDtEmbeddedDataSymbolName = void 0;
  a.cDtEmbeddedDataSymbolName = Symbol("DynatraceEmbeddedData");
  a.create = function(t) {
    function r(p) {
      return null != p && null != p[a.cDtEmbeddedDataSymbolName] ? p[a.cDtEmbeddedDataSymbolName][t] : void 0;
    }
    function n(p, k) {
      try {
        null == p[a.cDtEmbeddedDataSymbolName] && Object.defineProperty(p, a.cDtEmbeddedDataSymbolName, {enumerable:!1, configurable:!0, writable:!0, value:Object.create(null)}), p[a.cDtEmbeddedDataSymbolName][t] = k;
      } catch (l) {
        return;
      }
      return k;
    }
    return {get:r, createOrGet:function(p, k) {
      let l = r(p);
      null == l && (l = k(), n(p, l));
      return l;
    }, set:n, clear:function(p) {
      try {
        null != p[a.cDtEmbeddedDataSymbolName] && (p[a.cDtEmbeddedDataSymbolName][t] = void 0);
      } catch (k) {
      }
    }, unlink:function(p) {
      try {
        null != p[a.cDtEmbeddedDataSymbolName] && (p[a.cDtEmbeddedDataSymbolName][t] = void 0, delete p[a.cDtEmbeddedDataSymbolName][t], u.isEmptyObject(p[a.cDtEmbeddedDataSymbolName]) && delete p[a.cDtEmbeddedDataSymbolName]);
      } catch (k) {
      }
    }, hasData:function(p) {
      return u.hasProperty(p, a.cDtEmbeddedDataSymbolName, t);
    }, hasKey:function(p) {
      return u.hasProperty(p, a.cDtEmbeddedDataSymbolName) && null != Object.getOwnPropertyDescriptor(p[a.cDtEmbeddedDataSymbolName], t);
    }};
  };
  a.createPrivate = function(t) {
    function r(k) {
      return null != k ? k[p] : void 0;
    }
    function n(k, l) {
      try {
        Object.defineProperty(k, p, {value:l, enumerable:!1, configurable:!0, writable:!0});
      } catch (c) {
        return;
      }
      return l;
    }
    const p = Symbol(`${"Dynatrace"}_${t}`);
    return {get:r, createOrGet:function(k, l) {
      let c = r(k);
      null == c && (c = l(), n(k, c));
      return c;
    }, set:n, clear:function(k) {
      try {
        k[p] = void 0;
      } catch (l) {
      }
    }, unlink:function(k) {
      try {
        delete k[p];
      } catch (l) {
      }
    }, hasData:function(k) {
      return null != k && null != k[p];
    }, hasKey:function(k) {
      return null != Object.getOwnPropertyDescriptor(k, p);
    }, sym:p};
  };
});
S("src/lib/Patch", "require exports src/lib/util/CoreUtil src/lib/util/InvocationUtil src/lib/util/Reflection src/lib/Agent src/lib/DebugLoggingEntity src/lib/Embedder src/lib/RunTimeProperty".split(" "), function(O, a, u, t, r, n, p, k, l) {
  function c(v, z) {
    const x = v[z];
    return "function" === typeof x && (!a.FnEmbedder.hasData(x) || !v.hasOwnProperty(z));
  }
  function m(v, z, x) {
    if (null == v.module) {
      n.Logger.info(`module ${v.moduleName} is undefined`);
    } else {
      return x.polymorphicSubstitution !== g.Polymorphic || (null == B && (B = (new l.BooleanOption("DisablePolymorphicSubstitutions", !1)).value) && n.Logger.info("Polymorphic substitions are disabled, falling back to regular substitutions"), B) ? G.install(v, z, x) : D.install(v, z, x);
    }
  }
  function d(v, z, x, A) {
    a.FnEmbedder.set(z, v);
    r.cloneFunctionProperties(z, x, v.functionName);
    r.copyPromisifyProperties(z, x);
    if (null != A) {
      var C = Object.getOwnPropertyNames(x);
      for (const E of C) {
        u.match(A, E) && (C = Object.getOwnPropertyDescriptor(x, E), Object.defineProperty(z, E, C));
      }
    }
    return v;
  }
  function e(v, z, x = a.cDefaultOptions) {
    return m(v, A => z.generateSubstitute(A), x);
  }
  function b(v) {
    return a.FnEmbedder.get(v);
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.invokeResolvedOriginal = a.invokeOriginal = a.getFunctionDescriptor = a.isApplied = a.substitute = a.applyToAllFunctions = a.applyToAll = a.applyToSingle = a.tag = a.apply = a.installAlias = a.PolymorphicDispatcherFnDescriptor = a.PolymorphicOverrideFnDescriptor = a.SubstitutedFnDescriptor = a.PatchedFnDescriptor = a.FunctionSpec = a.ModuleSpec = a.AsyncTrackingMode = a.cOverrideDefaultOptions = a.cPolymorphicDefaultOptions = a.cDefaultOptions = a.SubstitutionType = a.FnEmbedder = void 0;
  a.FnEmbedder = k.create("patchedFnDesc");
  var g;
  (function(v) {
    v[v.WarnOnOverride = 0] = "WarnOnOverride";
    v[v.Polymorphic = 1] = "Polymorphic";
    v[v.Override = 2] = "Override";
  })(g = a.SubstitutionType || (a.SubstitutionType = {}));
  a.cDefaultOptions = {ignoreMissing:!1, ignoreAlreadyPatched:!1, polymorphicSubstitution:g.WarnOnOverride};
  a.cPolymorphicDefaultOptions = {ignoreMissing:!1, ignoreAlreadyPatched:!1, polymorphicSubstitution:g.Polymorphic};
  a.cOverrideDefaultOptions = {ignoreMissing:!1, ignoreAlreadyPatched:!1, polymorphicSubstitution:g.Override};
  var h;
  (function(v) {
    v[v.None = 0] = "None";
    v[v.CallbackFirst = 536870912] = "CallbackFirst";
    v[v.CallbackSecond = 536870913] = "CallbackSecond";
    v[v.CallbackSecondInjectMissing = -1610612735] = "CallbackSecondInjectMissing";
    v[v.CallbackThird = 536870914] = "CallbackThird";
    v[v.CallbackLast = 536936447] = "CallbackLast";
    v[v.CallbackLastInjectMissing = -1610547201] = "CallbackLastInjectMissing";
    v[v.Promise = 1073741824] = "Promise";
    v[v.CallbackFirstOrPromise = 1610612736] = "CallbackFirstOrPromise";
    v[v.CallbackLastOrPromise = 1610678271] = "CallbackLastOrPromise";
  })(h = a.AsyncTrackingMode || (a.AsyncTrackingMode = {}));
  (function(v) {
    v.getCallbackIndex = function(z, x) {
      if (0 === (z & 536870912)) {
        return -1;
      }
      z &= 536870911;
      return 65535 === z ? x.length - 1 : z;
    };
    v.makeCallbackTrackingMode = function(z, x = !1) {
      return z | 536870912 | (x ? -2147483648 : 0);
    };
    v.isCallbackStyle = function(z) {
      return 0 !== (z & 536870912);
    };
    v.isPromiseStyle = function(z) {
      return 0 !== (z & 1073741824);
    };
    v.doInjectMissingCallback = function(z) {
      return 0 !== (z & -2147483648);
    };
  })(h = a.AsyncTrackingMode || (a.AsyncTrackingMode = {}));
  class f {
    constructor(v, z, x = h.None, A) {
      this.moduleName = v;
      this.module = z;
      this.asyncTrackingMode = x;
      this.apiRealm = A;
    }
  }
  a.ModuleSpec = f;
  class q extends f {
    constructor() {
      var v = arguments[1];
      if ("string" === typeof v) {
        v = arguments[1];
        const z = arguments[2];
        let x, A;
        3 < arguments.length && ("string" === typeof arguments[3] ? A = arguments[3] : (x = arguments[3], A = 4 < arguments.length ? arguments[4] : void 0));
        super(v, z, x, A);
      } else {
        super(v.moduleName, v.module, v.asyncTrackingMode, v.apiRealm);
      }
      this.functionName = arguments[0];
    }
    get qualifiedName() {
      return `${this.moduleName}.${this.functionName}`;
    }
    toString() {
      return this.qualifiedName;
    }
  }
  a.FunctionSpec = q;
  class w {
    constructor(v) {
      this.functionName = v.functionName;
      this.apiRealm = v.apiRealm;
      this.asyncTrackingMode = v.asyncTrackingMode;
      this.qualifiedName = v.qualifiedName;
      w.monitor(this, v);
    }
    get methodNodeName() {
      null == this.theMethodNodeName && this.setFunctionInfo(n.Agent.nativeAgent.getFunctionInfo(this.origFn));
      return this.theMethodNodeName;
    }
    get scriptFile() {
      null == this.theScriptFile && this.setFunctionInfo(n.Agent.nativeAgent.getFunctionInfo(this.origFn));
      return this.theScriptFile;
    }
    get lineNumber() {
      null == this.theLineNumber && this.setFunctionInfo(n.Agent.nativeAgent.getFunctionInfo(this.origFn));
      return this.theLineNumber;
    }
    static getOrigFn(v) {
      const z = a.FnEmbedder.get(v);
      return null != z ? z.origFn : v;
    }
    static getResolvedOrigFn(v) {
      const z = a.FnEmbedder.get(v);
      return null != z ? z.resolvedOrigFn : v;
    }
    setFunctionInfo(v) {
      this.theMethodNodeName = v.functionName;
      this.theScriptFile = v.fileName;
      this.theLineNumber = v.lineNumber;
    }
    static dummyPatchMonitor() {
    }
  }
  w.monitor = w.dummyPatchMonitor;
  a.PatchedFnDescriptor = w;
  class G extends w {
    static install(v, z, x) {
      const A = v.module[v.functionName];
      if ("function" !== typeof A) {
        x.ignoreMissing || n.Logger.info(`${v.qualifiedName} is not a function`);
      } else {
        var C = null != A && null == Object.getOwnPropertyDescriptor(v.module, v.functionName);
        C ? x.polymorphicSubstitution === g.WarnOnOverride && n.Logger.warning(`overriding ${v.qualifiedName} - consider applying a polymorphic substitution`) : x.polymorphicSubstitution === g.Override && n.Logger.warning(`overriding ${v.qualifiedName} intended but method is not in base class`);
        if (a.FnEmbedder.hasData(A) && v.module.hasOwnProperty(v.functionName)) {
          x.ignoreAlreadyPatched || n.Logger.info(`${v.qualifiedName} is already patched`);
        } else {
          return J.isDebugEnabled && n.Logger.debug(`patching ${v.qualifiedName} [${v.apiRealm}]`), C = new G(v, A, C), z = z(C), v.module[v.functionName] = z, d(C, z, A, x.propertiesToCopy), C;
        }
      }
    }
    constructor(v, z, x) {
      super(v);
      this.origFn = z;
      this.isOverride = x;
    }
    restore(v) {
      this.isOverride ? delete v.module[v.functionName] : v.module[v.functionName] = this.origFn;
    }
    get resolvedOrigFn() {
      let v = this.origFn, z = b(v);
      for (; null != z;) {
        v = z.origFn, z = a.FnEmbedder.get(v);
      }
      return v;
    }
    installAlias(v, z) {
      const x = v.module[v.functionName];
      if (w.getOrigFn(x) === z.module[z.functionName]) {
        return z.module[z.functionName] = x, w.monitor(this, z), !0;
      }
      n.Logger.warning(`${v} original function doesn't match to fspecAlias`);
      return !1;
    }
  }
  a.SubstitutedFnDescriptor = G;
  class y extends w {
    constructor(v, z, x) {
      super(v);
      this.theOrigFn = z;
      this.embedder = x;
      this.module = v.module;
    }
    get origFn() {
      var v = Object.getPrototypeOf(this.module);
      v = this.embedder.get(v);
      return null != v ? v : this.theOrigFn;
    }
    restore(v) {
      this.embedder.unlink(v.module);
    }
    get resolvedOrigFn() {
      return this.theOrigFn;
    }
    installAlias(v) {
      n.Logger.warning(`${v} can't install an alias via PolymorphicOverrideFnDescriptor`);
      return !1;
    }
  }
  a.PolymorphicOverrideFnDescriptor = y;
  class D extends w {
    static install(v, z, x) {
      const A = D.findImplementingProto(v.module, v.functionName);
      if (null == A) {
        n.Logger.info(`cannot install polymorphic dispatcher for ${v.qualifiedName} - function not found`);
      } else {
        var C = b(A[v.functionName]);
        if (null == C) {
          var E = A.constructor && A.constructor.name ? A.constructor.name : `PolymorphicBase of ${v.moduleName}`;
          C = new q(v.functionName, E, A);
          C = new D(C, A[v.functionName]);
          J.isDebugEnabled && n.Logger.debug(`install polymorphic dispatcher for ${v.qualifiedName} on ${E}`);
          E = C.createPolymorphicDispatcher(C);
          A[v.functionName] = E;
          d(C, E, C.origFn, x.propertiesToCopy);
        } else if (!(C instanceof D)) {
          n.Logger.warning(`PolymorphicSubstitution: attempt to apply polymorphic substution to an non-polymorphich substituted function ${v.qualifiedName}`);
          return;
        }
        return C.installOverride(v, z);
      }
    }
    restore(v) {
      const z = D.findImplementingProto(v.module, v.functionName);
      null != z && (z[v.functionName] = this.origFn);
    }
    get resolvedOrigFn() {
      return this.origFn;
    }
    installAlias(v, z) {
      const x = D.findImplementingProto(z.module, z.functionName);
      if (null == x) {
        return n.Logger.info(`cannot install alias ${z.qualifiedName} of ${v.qualifiedName} - function not found`), !1;
      }
      if (x[z.functionName] !== this.origFn) {
        return n.Logger.info(`${z.qualifiedName} is not an alias of ${v.qualifiedName}`), !1;
      }
      x[z.functionName] = v.module[v.functionName];
      w.monitor(this, z);
      return !0;
    }
    constructor(v, z) {
      super(v);
      this.origFn = z;
      this.embedder = k.createPrivate(v.functionName);
    }
    installOverride(v, z) {
      if (this.embedder.hasKey(v.module)) {
        n.Logger.warning(`attempt to re-install polymorphic patch for ${v.qualifiedName}`);
      } else {
        J.isDebugEnabled && n.Logger.debug(`patching ${v.qualifiedName} [${v.apiRealm}]`);
        var x = new y(v, this.origFn, this.embedder);
        z = z(x);
        this.embedder.set(v.module, z);
        d(x, z, this.origFn);
        return x;
      }
    }
    createPolymorphicDispatcher(v) {
      const z = this;
      return function() {
        const x = z.embedder.get(this);
        return t.doInvoke(this, null != x ? x : v.origFn, arguments);
      };
    }
    static findImplementingProto(v, z) {
      for (; null != v && null == Object.getOwnPropertyDescriptor(v, z);) {
        v = Object.getPrototypeOf(v);
      }
      return v;
    }
  }
  a.PolymorphicDispatcherFnDescriptor = D;
  const J = new p.DebugLoggingEntity("Patch");
  J.addToDebugLogDomain("Transformers");
  let B;
  a.installAlias = function(v, z) {
    if (v.module[v.functionName] === z.module[z.functionName]) {
      return J.isDebugEnabled && n.Logger.debug(`${z} is already aliased to ${v}`), !0;
    }
    const x = b(v.module[v.functionName]);
    return null != x ? x.installAlias(v, z) : !1;
  };
  a.apply = m;
  a.tag = d;
  a.applyToSingle = e;
  a.applyToAll = function(v, z, x, A = a.cDefaultOptions) {
    v = new q("", v);
    for (const C of z) {
      v.functionName = C, e(v, x, A);
    }
  };
  a.applyToAllFunctions = function(v, z, x, A = a.cDefaultOptions) {
    const C = A.ignoreMissing, E = {};
    C || x.forEach(H => E[H.toString()] = !1);
    const I = new q("", v);
    for (const H of x) {
      c(I.module, H) && (I.functionName = H, e(I, z, A), C || (E[H] = !0));
    }
    !C && x.some(H => !E[H.toString()]) && (z = x.reduce((H, F) => E[F.toString()] ? H : `${H} ${F.toString()}`), n.Logger.info(`no match for [${z}] in module ${v.moduleName}`));
  };
  a.substitute = function(v, z, x = a.cDefaultOptions) {
    return m(v, () => z, x);
  };
  a.isApplied = function(v) {
    return a.FnEmbedder.hasData(v);
  };
  a.getFunctionDescriptor = b;
  a.invokeOriginal = function(v, z, x = []) {
    return t.doInvoke(z, w.getOrigFn(v), x);
  };
  a.invokeResolvedOriginal = function(v, z, x = []) {
    return t.doInvoke(z, w.getResolvedOrigFn(v), x);
  };
});
S("src/lib/FunctionId", ["require", "exports", "src/lib/Agent", "src/lib/MethodIdCache"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.VirtualNodeFunctionId = a.FunctionId = void 0;
  class r {
    constructor() {
      this.isVirtual = !1;
      if ("string" === typeof arguments[0]) {
        this.functionName = arguments[0], this.fileName = arguments[1], this.lineNumber = arguments[2], 4 <= arguments.length && (this.apiRealm = arguments[3]), 5 <= arguments.length && (this.isVirtual = arguments[4]);
      } else if ("function" === typeof arguments[0]) {
        var p = u.Agent.nativeAgent.getFunctionInfo(arguments[0]);
        this.functionName = p.functionName;
        this.fileName = p.fileName;
        this.lineNumber = p.lineNumber;
      } else {
        p = arguments[0], this.functionName = p.methodNodeName, this.fileName = p.scriptFile, this.lineNumber = p.lineNumber, this.apiRealm = p.apiRealm;
      }
    }
    toString() {
      return this.functionName;
    }
    get methodId() {
      null == this.theMethodId && (this.theMethodId = t.MethodIdCache.get(this.functionName, this.fileName));
      return this.theMethodId;
    }
  }
  a.FunctionId = r;
  class n extends r {
    constructor(p) {
      super(p.functionName, p.fileName, p.lineNumber, p.apiRealm, !0);
    }
  }
  a.VirtualNodeFunctionId = n;
});
S("src/lib/RuntimeSetting", ["require", "exports", "src/lib/Logger"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.RuntimeSetting = a.RuntimeSettingsPool = void 0;
  class t {
    constructor() {
      var n;
      this.valuePool = {"ambientSampling.enabled":{value:!1}, "ambientSampling.forceEnable":{value:!1}, "autoSensor.enabled":{value:!1}, "sensor.stringTruncationLimit":{value:+(null !== (n = process.env.DT_STRINGTRUNCATIONLIMIT) && void 0 !== n ? n : 250)}, "distributedTracing.http.dynatraceTagging":{value:!0}, "distributedTracing.http.traceContext":{value:!1}, "distributedTracing.grpc.dynatraceTagging":{value:!0}, "distributedTracing.grpc.traceContext":{value:!1}};
      t.theInstance = this;
    }
    static get instance() {
      if (null == t.theInstance) {
        throw Error("RuntimeSettingsPool: request for setting before proper setup");
      }
      return t.theInstance;
    }
    onConfigUpdate(n) {
      const p = n.rtc;
      if (null != p) {
        if (null != p.agentOptionMap) {
          for (const k in this.valuePool) {
            this.setValue(k, p.agentOptionMap[k]);
          }
        }
        null != p.distributedTracing && ["http", "grpc"].forEach(k => {
          if (null != p.distributedTracing[k]) {
            for (const l of ["dynatraceTagging", "traceContext"]) {
              this.setValue(`distributedTracing.${k}.${l}`, p.distributedTracing[k][l]);
            }
          }
        });
      }
    }
    getValue(n) {
      return this.valuePool[n];
    }
    setValue(n, p) {
      if (null != p) {
        const k = this.valuePool[n].value;
        typeof k === typeof p ? k !== p && (u.info(`RuntimeSettings: updating ${n}: ${k} -> ${p}`), this.valuePool[n].value = p) : u.info(`RuntimeSettings.onConfigUpdate: type mismatch in ${n}: ${p} (${typeof p})`);
      }
    }
  }
  a.RuntimeSettingsPool = t;
  class r {
    constructor(n) {
      this.valueRef = t.instance.getValue(n);
    }
    get value() {
      return this.valueRef.value;
    }
  }
  a.RuntimeSetting = r;
});
S("src/lib/AttachmentBase", ["require", "exports", "src/lib/RuntimeSetting", "src/lib/util/ErrorUtil"], function(O, a, u, t) {
  function r() {
    null == p && (p = new u.RuntimeSetting("sensor.stringTruncationLimit"));
    return p.value;
  }
  function n(c, m) {
    let d = !1;
    c.length > m && (d = !0, c = c.substr(0, m));
    return [c, d];
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AttachmentBase = a.AttachmentFieldSetter = void 0;
  let p;
  class k {
    constructor(c) {
      this.attachment = c;
    }
    string(c, m, d = r()) {
      const [e, b] = n(m, d);
      this.attachment.setFieldString(c, e, b);
    }
    stringCached(c, m, d = r()) {
      const [e, b] = n(m, d);
      this.attachment.setFieldStringCached(c, e, b);
    }
    stringUnavailable(c) {
      this.attachment.setFieldStringUnavailable(c);
    }
    stringCachedOrUnavailable(c, m, d = r()) {
      null != m ? this.stringCached(c, m, d) : this.attachment.setFieldStringUnavailable(c);
    }
    float(c, m) {
      this.attachment.setFieldFloat(c, m);
    }
    integer(c, m) {
      this.attachment.setFieldInteger(c, m);
    }
    keyValue(c, m, d, e = r()) {
      const [b, g] = n(m, e), [h, f] = n(d, e);
      this.attachment.setFieldKeyValue(c, b, g, h, f);
    }
    keyValueCached(c, m, d, e = r()) {
      const [b, g] = n(m, e), [h, f] = n(d, e);
      this.attachment.setFieldKeyValueCached(c, b, g, h, f);
    }
    map(c, m, d, e = r()) {
      if (void 0 !== d) {
        for (const b of d) {
          this.cacheKeyValueEntry(c, b, m[b], e);
        }
      } else {
        for (const b in m) {
          this.cacheKeyValueEntry(c, b, m[b], e);
        }
      }
    }
    cacheKeyValueEntry(c, m, d, e) {
      if (null != d) {
        if (Array.isArray(d)) {
          for (const b of d) {
            this.keyValueCached(c, m, `${b}`, e);
          }
        } else {
          this.keyValueCached(c, m, `${d}`, e);
        }
      }
    }
    static setMultiple(c, m) {
      try {
        c.beginFastFieldAccess(), m(new k(c));
      } catch (d) {
        t.logAgentException(d);
      } finally {
        c.endFastFieldAccess();
      }
    }
  }
  a.AttachmentFieldSetter = k;
  class l {
    constructor(c, m, d, e) {
      this.id = m;
      this.attachment = c.getAttachment(m, d, e);
    }
    get valid() {
      return this.attachment.valid;
    }
    setMultipleFields(c) {
      k.setMultiple(this.attachment, c);
    }
    setString(c, m, d = r()) {
      const [e, b] = n(m, d);
      this.attachment.setFieldString(c, e, b);
    }
    setStringCached(c, m, d = r()) {
      const [e, b] = n(m, d);
      this.attachment.setFieldStringCached(c, e, b);
    }
    setKeyValueCached(c, m, d, e = r()) {
      const [b, g] = n(m, e), [h, f] = n(d, e);
      this.attachment.setFieldKeyValueCached(c, b, g, h, f);
    }
    setStringCachedOrUnavailable(c, m, d = r()) {
      if (null != m) {
        const [e, b] = n(m, d);
        this.attachment.setFieldStringCached(c, e, b);
      } else {
        this.attachment.setFieldStringUnavailable(c);
      }
    }
    setStringOrUnavailable(c, m, d = r()) {
      if (null != m) {
        const [e, b] = n(m, d);
        this.attachment.setFieldString(c, e, b);
      } else {
        this.attachment.setFieldStringUnavailable(c);
      }
    }
    toString() {
      return `attachment[#${this.attachment} ${this.id}]`;
    }
  }
  a.AttachmentBase = l;
});
S("src/lib/Stack", ["require", "exports", "src/lib/util/Reflection"], function(O, a, u) {
  function t(n, p) {
    const k = {};
    let l = [];
    const c = Error.stackTraceLimit, m = Error.prepareStackTrace;
    try {
      Error.prepareStackTrace = (d, e) => {
        l = e;
      }, Error.stackTraceLimit = n, Error.captureStackTrace(k, p ? p : t), r.triggerPrepareStackTrace(k);
    } finally {
      Error.stackTraceLimit = c, Error.prepareStackTrace = m;
    }
    return l;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.findFunctionName = a.findTypeName = a.getCallSites = void 0;
  class r {
    static triggerPrepareStackTrace(n) {
      return n.stack;
    }
  }
  a.getCallSites = t;
  a.findTypeName = function(n) {
    return n.isToplevel() ? "" : n.getTypeName() || "";
  };
  a.findFunctionName = function(n) {
    let p;
    (p = n.getFunctionName()) || (p = n.getMethodName());
    return p || u.cAnonymousFnName;
  };
});
S("src/lib/ErrorObject", ["require", "exports", "src/lib/Stack", "src/lib/Debug"], function(O, a, u, t) {
  function r(l) {
    const c = [];
    if (!l || "string" !== typeof l) {
      return c;
    }
    var m = l.split("\n").slice(1);
    l = new k();
    for (const e of m) {
      if (m = e.match(/at (?:(.+)\s+)?\(?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/)) {
        const b = new k();
        var d = m[1];
        d && (l.functionName = d, b.typeName = u.findTypeName(l), b.functionName = u.findFunctionName(l) || (b.typeName ? "<anonymous>" : ""), d = b.functionName.indexOf(" "), 0 < d && (b.functionName = b.functionName.substring(0, d)));
        b.fileName = m[2] || "";
        b.lineNumber = parseInt(m[3], 10) || -1;
        b.columnNumber = parseInt(m[4], 10) || -1;
        c.push(b);
      }
    }
    return c;
  }
  function n(l, c) {
    const m = [];
    l && m.push(l.toString());
    if (c) {
      for (const d of c) {
        m.push("    at " + d.toString());
      }
    }
    return m.join("\n");
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.CallSiteObject = a.getCallStack = void 0;
  a.getCallStack = function(l) {
    let c = [], m = !1;
    const d = Error.prepareStackTrace;
    try {
      Error.prepareStackTrace = (e, b) => {
        c = b;
        Error.prepareStackTrace = d;
        m = !0;
        return (d || n)(e, b);
      }, p.triggerPrepareStackTrace(l), 0 === c.length && (c = r(l.stack));
    } finally {
      m || (Error.prepareStackTrace = d);
    }
    return c;
  };
  class p {
    static triggerPrepareStackTrace(l) {
      return l.stack;
    }
  }
  class k {
    constructor() {
      this.fileName = this.typeName = this.functionName = "";
      this.columnNumber = this.lineNumber = -1;
      this.receiver = "dummyReceiverValue";
    }
    getFileName() {
      return this.fileName;
    }
    getLineNumber() {
      return this.lineNumber;
    }
    getFunctionName() {
      return this.functionName;
    }
    getTypeName() {
      return this.typeName;
    }
    getColumnNumber() {
      return this.columnNumber;
    }
    getMethodName() {
      return "";
    }
    toString() {
      return (this.typeName ? this.typeName + "." : "") + this.functionName + (this.functionName ? " (" : "") + `${this.fileName}:${this.lineNumber}:${this.columnNumber}` + (this.functionName ? ")" : "");
    }
    isNative() {
      t.fail("not implemented");
      return !1;
    }
    getThis() {
      t.fail("not implemented");
    }
    getFunction() {
      t.fail("not implemented");
    }
    getEvalOrigin() {
      t.fail("not implemented");
    }
    isToplevel() {
      return !1;
    }
    isEval() {
      t.fail("not implemented");
      return !1;
    }
    isConstructor() {
      t.fail("not implemented");
      return !1;
    }
  }
  a.CallSiteObject = k;
});
S("src/lib/util/RuntimeUtil", ["require", "exports", "src/lib/util/CoreUtil", "src/lib/Configuration"], function(O, a, u, t) {
  function r() {
    return "win32" === process.platform;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.isNodeCoreModule = a.isAgentFile = a.isDebuggerActive = a.hasCaseInsensitiveFilePaths = a.isLinux = a.isWindows = void 0;
  a.isWindows = r;
  a.isLinux = function() {
    return "linux" === process.platform;
  };
  a.hasCaseInsensitiveFilePaths = function() {
    return r();
  };
  a.isDebuggerActive = function() {
    return null != global.v8debug;
  };
  a.isAgentFile = function(p) {
    return p.startsWith(t.Configuration.rootFolder);
  };
  const n = process.binding("natives");
  a.isNodeCoreModule = function(p) {
    return u.hasProperty(n, p);
  };
});
S("src/lib/sensors/ExceptionAttachment", "require exports src/lib/Agent src/lib/AttachmentBase src/lib/Debug src/lib/ErrorObject src/lib/RunTimeProperty src/lib/Stack src/lib/util/RuntimeUtil".split(" "), function(O, a, u, t, r, n, p, k, l) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ExceptionAttachment = void 0;
  const c = !r.isEnabled();
  class m extends t.AttachmentBase {
    constructor(d) {
      super(d, u.Agent.correlation.AttachmentId.EXCEPTION_ID, 0, u.Agent.correlation.AttachmentTarget.CurrentNode);
    }
    fillExceptionData(d, e = !0) {
      null != this.attachment && this.setMultipleFields(b => {
        this.debugExceptionAttachment && u.Logger.debug(`ExceptionAttachment: processing ${d.name} [${d.message}]`);
        const g = u.Agent.correlation.AttachmentFieldId;
        b.stringCached(g.EXCEPTION_MESSAGE, d.message ? `${d.message}` : "", 1024);
        b.stringCached(g.EXCEPTION_THROWABLE, d.name || "");
        const h = n.getCallStack(d);
        for (const f of h) {
          this.isFilterAgentFrames() && l.isAgentFile(f.getFileName() || "") || (this.debugExceptionAttachment && u.Logger.debug(`ExceptionAttachment: adding stackframe ${f.toString()}`), b.integer(g.EXCEPTION_STACKTRACE_NEXT_LINE, 0), b.stringCached(g.EXCEPTION_STACKTRACE_METHOD, k.findFunctionName(f)), b.stringCached(g.EXCEPTION_STACKTRACE_CLASS, k.findTypeName(f)), b.stringCached(g.EXCEPTION_STACKTRACE_FILE, f.getFileName() || ""), b.integer(g.EXCEPTION_STACKTRACE_LINE_NUMBER, f.getLineNumber() || 
          -1));
        }
        !1 === e && b.integer(g.EXCEPTION_NEXT_CAUSE, 0);
      });
    }
    isFilterAgentFrames() {
      return c;
    }
    get debugExceptionAttachment() {
      return m.debugExceptionAttachmentProperty.value;
    }
  }
  m.debugExceptionAttachmentProperty = new p.BooleanProperty("ExceptionAttachment", !1);
  a.ExceptionAttachment = m;
});
S("src/lib/util/UniqueId", ["require", "exports"], function(O, a) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.UniqueId = void 0;
  class u {
    constructor() {
      this.id = u.getNext();
    }
    toString() {
      return u.asString(this.id);
    }
    static getNext() {
      const t = u.nextId++;
      65536 <= u.nextId && (u.nextId = 0);
      return t;
    }
    static getNextAsString() {
      return u.asString(u.getNext());
    }
    static asString(t) {
      return `[#${("000" + t.toString(16)).substr(-4)}]`;
    }
  }
  u.nextId = 0;
  a.UniqueId = u;
});
S("src/lib/sensors/UriRuleSensorProperty", ["require", "exports", "src/lib/Logger"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.parseUriRules = a.UriRule = void 0;
  var t;
  (function(n) {
    n[n.EQUALS = 0] = "EQUALS";
    n[n.CONTAINS = 1] = "CONTAINS";
    n[n.ENDS = 2] = "ENDS";
    n[n.STARTS = 3] = "STARTS";
  })(t || (t = {}));
  (function(n) {
    n.matches = function(p, k, l) {
      switch(l) {
        case n.CONTAINS:
          return p.includes(k);
        case n.ENDS:
          return p.endsWith(k);
        case n.EQUALS:
          return p === k;
        case n.STARTS:
          return p.startsWith(k);
      }
      return !1;
    };
    n.fromString = function(p) {
      switch(p.toLowerCase()) {
        case "equals":
          return n.EQUALS;
        case "ends":
          return n.ENDS;
        case "contains":
          return n.CONTAINS;
        case "starts":
          return n.STARTS;
      }
      throw Error("illegal match string");
    };
  })(t || (t = {}));
  class r {
    constructor(n) {
      let p = !1;
      "string" === typeof n.uriPattern && "string" === typeof n.uriPatternMatch && (this.uriPattern = n.uriPattern, this.uriPatternMatch = t.fromString(n.uriPatternMatch), p = !0);
      "string" === typeof n.queryStringPattern && "string" === typeof n.queryStringPatternMatch && (this.queryStringPattern = n.queryStringPattern, this.queryStringPatternMatch = t.fromString(n.queryStringPatternMatch), p = !0);
      if (!p) {
        throw Error("malformed UriRule");
      }
    }
    match(n, p) {
      let k = !0;
      null != this.uriPattern && (k = t.matches(n, this.uriPattern, this.uriPatternMatch));
      null != this.queryStringPattern && (k = k && t.matches(p, this.queryStringPattern, this.queryStringPatternMatch));
      return k;
    }
  }
  a.UriRule = r;
  a.parseUriRules = function(n, p) {
    if (Array.isArray(n)) {
      try {
        const k = [];
        for (const l of n) {
          k.push(new r(l));
        }
        return k;
      } catch (k) {
        u.info(`${p} has malformed UriRules ${k}`);
      }
    }
    return [];
  };
});
S("src/lib/sensors/SensorConstants", ["require", "exports"], function(O, a) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.cDtTaggingHeader = "x-dynatrace";
  a.cW3cTraceParent = "traceparent";
  a.cW3cTraceState = "tracestate";
  a.cW3cTraceResponse = "traceresponse";
  a.cDtTraceState = "x-dt-tracestate";
  a.CONNECTION_POOL_TYPE_NOT_A_POOL = -1;
  a.CONNECTION_POOL_TYPE_GENERIC = 6;
});
S("src/lib/Tracing", ["require", "exports", "src/lib/Agent", "src/lib/RuntimeSetting", "src/lib/sensors/SensorConstants"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.Tracing = void 0;
  class n {
    constructor(p) {
      this.traceContext = p;
    }
    isDtTagValid() {
      return "string" === typeof this.traceContext.dtTag;
    }
    isTraceParentValid() {
      return "string" === typeof this.traceContext.traceparent;
    }
    isTraceStateValid() {
      return "string" === typeof this.traceContext.tracestate;
    }
    httpUseDtTagging() {
      return n.httpDtTaggingEnabled && this.isDtTagValid();
    }
    httpUseTraceParent() {
      return n.httpTraceContextTaggingEnabled && this.isTraceParentValid();
    }
    httpUseTraceState() {
      return n.httpTraceContextTaggingEnabled && this.isTraceStateValid();
    }
    grpcUseDtTagging() {
      return n.grpcDtTaggingEnabled && this.isDtTagValid();
    }
    grpcUseTraceParent() {
      return n.grpcTraceContextTaggingEnabled && this.isTraceParentValid();
    }
    grpcUseTraceState() {
      return n.grpcTraceContextTaggingEnabled && this.isTraceStateValid();
    }
    get dtTag() {
      return this.traceContext.dtTag;
    }
    get traceParent() {
      return this.traceContext.traceparent;
    }
    get traceState() {
      return this.traceContext.tracestate;
    }
    getHttpTaggingHeaders() {
      const p = {};
      this.httpUseDtTagging() && (p[r.cDtTaggingHeader] = this.traceContext.dtTag);
      this.httpUseTraceParent() && (p[r.cW3cTraceParent] = this.traceContext.traceparent);
      this.httpUseTraceState() && (p[r.cW3cTraceState] = this.traceContext.tracestate);
      return p;
    }
    toString() {
      return n.traceContextToString(this.traceContext);
    }
    static traceContextToString(p) {
      return null != p ? `{ dtTag: ${p.dtTag}, traceparent: ${p.traceparent}, tracestate: ${p.tracestate} }` : "";
    }
    static getTaggingMode() {
      if (n.isOpenTelemetryEnabled) {
        return u.Agent.correlation.TaggingMode.DT_AND_TC;
      }
      const p = n.httpTraceContextTaggingEnabled || n.grpcTraceContextTaggingEnabled;
      return n.httpDtTaggingEnabled || n.grpcDtTaggingEnabled ? p ? u.Agent.correlation.TaggingMode.DT_AND_TC : u.Agent.correlation.TaggingMode.DT_ONLY : p ? u.Agent.correlation.TaggingMode.TC_ONLY : u.Agent.correlation.TaggingMode.DT_ONLY;
    }
    static getHttpTaggingMode() {
      return n.httpTraceContextTaggingEnabled ? n.httpDtTaggingEnabled ? u.Agent.correlation.TaggingMode.DT_AND_TC : u.Agent.correlation.TaggingMode.TC_ONLY : u.Agent.correlation.TaggingMode.DT_ONLY;
    }
    static getGrpcTaggingMode() {
      return n.grpcTraceContextTaggingEnabled ? n.grpcDtTaggingEnabled ? u.Agent.correlation.TaggingMode.DT_AND_TC : u.Agent.correlation.TaggingMode.TC_ONLY : u.Agent.correlation.TaggingMode.DT_ONLY;
    }
    static get httpDtTaggingEnabled() {
      return n.isHttpDtTaggingEnabled.value;
    }
    static get httpTraceContextTaggingEnabled() {
      return n.isHttpTraceContextEnabled.value;
    }
    static get grpcDtTaggingEnabled() {
      return n.isGrpcDtTaggingEnabled.value;
    }
    static get grpcTraceContextTaggingEnabled() {
      return n.isGrpcTraceContextEnabled.value;
    }
    static init() {
      n.isHttpDtTaggingEnabled = new t.RuntimeSetting("distributedTracing.http.dynatraceTagging");
      n.isHttpTraceContextEnabled = new t.RuntimeSetting("distributedTracing.http.traceContext");
      n.isGrpcDtTaggingEnabled = new t.RuntimeSetting("distributedTracing.grpc.dynatraceTagging");
      n.isGrpcTraceContextEnabled = new t.RuntimeSetting("distributedTracing.grpc.traceContext");
    }
  }
  n.isOpenTelemetryEnabled = !1;
  a.Tracing = n;
});
S("src/lib/util/HttpHeader", ["require", "exports"], function(O, a) {
  function u(h, f) {
    return h === f.normalizedName;
  }
  function t(h, f) {
    return h.length === f.rawName.length && h === f.normalizedName;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.HeaderManipulator = a.ExtendedHeadersObjectManipulator = a.HeadersObjectManipulator = a.HeadersArrayManipulator = a.HeaderContainerManipulator = a.HeaderAssociatedData = void 0;
  class r {
    constructor(h, f) {
      this.normalizedHeaderName = h;
      this.associatedData = f;
    }
    toString() {
      return this.normalizedHeaderName;
    }
  }
  a.HeaderAssociatedData = r;
  class n {
    find(h, f) {
      return h.findIndex(q => this.matchHeaderName(q.toString(), f));
    }
    constructor(h) {
      this.matchHeaderName = (this.normalized = h) ? u : t;
    }
    cloneHeaderValue(h) {
      return Array.isArray(h) ? h.slice() : h;
    }
  }
  a.HeaderContainerManipulator = n;
  class p extends n {
    prepareForHeaderModification() {
      this.needsCloning && (this.headers = this.cloneHeaders(this.headers, 2 === this.cloningMode), this.needsCloning = !1);
    }
    constructor(h, f, q) {
      super(q);
      this.headers = h;
      this.cloningMode = f;
      this.needsCloning = 0 !== f;
    }
  }
  class k {
    get firstValue() {
      const h = this.value;
      return "string" === typeof h ? h : h[0];
    }
    appendValue(h) {
      this.owner.prepareForHeaderModification();
      const f = this.value;
      Array.isArray(f) ? f.push(h) : this.value = [f, h];
    }
    get normalizedName() {
      return this.owner.normalized ? this.rawName : this.rawName.toLowerCase();
    }
    doesMatch(h) {
      return this.owner.matchHeaderName(h, this);
    }
  }
  class l extends k {
    constructor(h) {
      super();
      this.owner = h;
      this.currIdx = 0;
    }
    get rawName() {
      return this.owner.headers[this.currIdx][0];
    }
    get value() {
      return this.owner.headers[this.currIdx][1];
    }
    set value(h) {
      this.owner.prepareForHeaderModification();
      this.owner.headers[this.currIdx][1] = h;
    }
    remove() {
      this.owner.prepareForHeaderModification();
      this.owner.headers.splice(this.currIdx, 1);
      --this.currIdx;
    }
  }
  class c extends p {
    constructor(h, f = 0, q = !1) {
      super(h, f, q);
    }
    forEach(h) {
      const f = new l(this);
      let q;
      for (; !q && f.currIdx < this.headers.length;) {
        q = h(f), ++f.currIdx;
      }
      return q;
    }
    forMatching(h, f) {
      const q = new l(this);
      let w;
      for (; !w && q.currIdx < this.headers.length;) {
        const G = this.find(h, q);
        0 <= G && (w = f(q, G, h[G]));
        ++q.currIdx;
      }
      return w;
    }
    addHeaderEntity(h, f) {
      this.prepareForHeaderModification();
      this.headers.push([h, f]);
    }
    cloneHeaders(h, f) {
      let q;
      f ? (q = [], q.length = h.length, h.forEach((w, G) => {
        const y = this.cloneHeaderValue(w[1]);
        q[G] = [w[0], y];
      })) : q = h.slice();
      return q;
    }
  }
  a.HeadersArrayManipulator = c;
  class m extends k {
    constructor(h) {
      super();
      this.owner = h;
    }
    get rawName() {
      return this.currKey;
    }
    get value() {
      return this.owner.headers[this.currKey];
    }
    set value(h) {
      this.owner.prepareForHeaderModification();
      this.owner.headers[this.currKey] = h;
    }
    remove() {
      this.owner.prepareForHeaderModification();
      delete this.owner.headers[this.currKey];
    }
  }
  class d extends p {
    constructor(h, f = 0, q = !1) {
      super(h, f, q);
    }
    forEach(h) {
      const f = new m(this), q = Object.keys(this.headers);
      let w = 0, G;
      for (; !G && w < q.length;) {
        f.currKey = q[w], G = h(f), ++w;
      }
      return G;
    }
    forMatching(h, f) {
      let q;
      const w = new m(this);
      if (this.normalized) {
        for (var G = 0; !q && G < h.length; ++G) {
          var y = h[G], D = y.toString();
          null != this.headers[D] && (w.currKey = D, q = f(w, G, y));
        }
      } else {
        for (G = Object.keys(this.headers), y = 0; !q && y < G.length;) {
          w.currKey = G[y], D = this.find(h, w), 0 <= D && (q = f(w, D, h[D])), ++y;
        }
      }
      return q;
    }
    addHeaderEntity(h, f) {
      this.prepareForHeaderModification();
      this.headers[h] = f;
    }
    cloneHeaders(h, f) {
      let q;
      f ? (q = {}, Object.keys(h).forEach(w => {
        q[w] = this.cloneHeaderValue(h[w]);
      })) : q = Object.assign({}, h);
      return q;
    }
  }
  a.HeadersObjectManipulator = d;
  class e extends k {
    constructor(h) {
      super();
      this.owner = h;
    }
    get rawName() {
      return this.owner.headers[this.currKey][0];
    }
    get normalizedName() {
      return this.currKey;
    }
    get value() {
      return this.owner.headers[this.currKey][1];
    }
    set value(h) {
      this.owner.prepareForHeaderModification();
      this.owner.headers[this.currKey][1] = h;
    }
    remove() {
      this.owner.prepareForHeaderModification();
      delete this.owner.headers[this.currKey];
    }
  }
  class b extends p {
    constructor(h, f = 0) {
      super(h, f, !0);
    }
    forEach(h) {
      const f = new e(this), q = Object.keys(this.headers);
      let w = 0, G;
      for (; !G && w < q.length;) {
        f.currKey = q[w], G = h(f), ++w;
      }
      return G;
    }
    forMatching(h, f) {
      const q = new e(this);
      let w;
      for (let G = 0; !w && G < h.length; ++G) {
        const y = h[G], D = y.toString();
        null != this.headers[D] && (q.currKey = D, w = f(q, G, y));
      }
      return w;
    }
    addHeaderEntity(h, f) {
      this.prepareForHeaderModification();
      this.headers[h] = [h, f];
    }
    cloneHeaders(h, f) {
      let q;
      f ? (q = {}, Object.keys(h).forEach(w => {
        const G = h[w];
        q[w] = [G[0], this.cloneHeaderValue(G[1])];
      })) : q = Object.assign({}, h);
      return q;
    }
  }
  a.ExtendedHeadersObjectManipulator = b;
  class g {
    constructor(h, f = 0, q = !1) {
      this.manipulator = g.createSpecificManipulator(h, f, q);
    }
    get headers() {
      return this.manipulator.headers;
    }
    forEach(h) {
      return this.manipulator.forEach(h);
    }
    forMatching(h, f) {
      return Array.isArray(h) ? this.manipulator.forMatching(h, f) : this.manipulator.forMatching([h], f);
    }
    remove(h, f = !0) {
      h = Array.isArray(h) ? h : [h];
      this.manipulator.forMatching(h, q => {
        q.remove();
        return !f;
      });
    }
    append(h, f) {
      this.manipulator.forMatching([h], q => {
        q.appendValue(f);
        return !0;
      }) || this.manipulator.addHeaderEntity(h, f);
    }
    get(h) {
      let f;
      this.forMatching(h, q => {
        f = q.value;
        return !0;
      });
      return f;
    }
    set(h, f) {
      this.manipulator.forMatching([h], q => {
        q.value = f;
        return !0;
      }) || this.manipulator.addHeaderEntity(h, f);
    }
    static createSpecificManipulator(h, f = 0, q = !1) {
      let w;
      if (Array.isArray(h)) {
        w = new c(h, f, q);
      } else {
        const G = Object.keys(h);
        if (0 < G.length) {
          const y = h[G[0]];
          Array.isArray(y) && 2 === y.length && "string" === typeof y[0] && G[0] === y[0].toLowerCase() && (w = new b(h, f));
        }
        null == w && (w = new d(h, f, q));
      }
      return w;
    }
  }
  a.HeaderManipulator = g;
});
S("src/lib/util/SemverUtil", ["require", "exports"], function(O, a) {
  function u(c, m, d) {
    return (new k(c, d)).compare(new k(m, d));
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.satisfies = a.patch = a.minor = a.major = a.valid = void 0;
  a.valid = function(c) {
    let m;
    try {
      m = new k(c);
    } catch (d) {
      return null;
    }
    return m.version;
  };
  a.major = function(c) {
    return (new k(c)).major;
  };
  a.minor = function(c) {
    return (new k(c)).minor;
  };
  a.patch = function(c) {
    return (new k(c)).patch;
  };
  a.satisfies = function(c, m, d) {
    return (new l(m, d)).test(c);
  };
  class t {
    constructor() {
      this.regExSrcRepo = [];
      const c = this.regexSrc = [];
      this.registerRegexString(0, "0|[1-9]\\d*");
      this.registerRegexString(1, "[0-9]+");
      this.registerRegexString(2, `(${c[0]})\\.(${c[0]})\\.(${c[0]})`);
      this.registerRegexString(3, `(${c[1]})\\.(${c[1]})\\.(${c[1]})`);
      this.registerRegexString(4, "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
      this.registerRegexString(5, `(?:${c[0]}|${c[4]})`);
      this.registerRegexString(6, `(?:${c[1]}|${c[4]})`);
      this.registerRegexString(7, `(?:-(${c[5]}(?:\\.${c[5]})*))`);
      this.registerRegexString(8, `(?:-?(${c[6]}(?:\\.${c[6]})*))`);
      this.registerRegexString(9, "[0-9A-Za-z-]+");
      this.registerRegexString(10, `(?:\\+(${c[9]}(?:\\.${c[9]})*))`);
      this.registerRegexString(11, `${c[0]}|x|X|\\*`);
      this.registerRegexString(12, `[v=\\s]*(${c[11]})(?:\\.(${c[11]})` + `(?:\\.(${c[11]})(?:${c[7]})?${c[10]}?)?)?`);
      this.registerRegexString(13, "(?:\\^)");
      this.registerRegexString(15, `(\\s*)${c[13]}\\s+`);
      this.registerRegexString(14, `^${c[13]}${c[12]}$`);
      this.registerRegexString(16, "((?:<|>)?=?)");
      this.registerRegexString(17, `v?${c[2]}${c[7]}?${c[10]}?`);
      this.registerRegexString(18, `^${c[17]}$`);
      this.registerRegexString(19, `[v=\\s]*${c[3]}${c[8]}?${c[10]}?`);
      this.registerRegexString(20, `^${c[16]}\\s*${c[12]}$`);
      this.registerRegexString(21, "(?:~>?)");
      this.registerRegexString(22, `(\\s*)${c[21]}\\s+`);
      this.registerRegexString(23, `^${c[21]}${c[12]}$`);
      this.registerRegexString(24, `^${c[16]}\\s*(${c[17]})$|^$`);
      this.registerRegexString(25, `(\\s*)${c[16]}\\s*(${c[19]}|${c[12]})`, "g");
      this.registerRegexString(26, `^\\s*(${c[12]})\\s+-\\s+(${c[12]})\\s*$`);
      this.registerRegexString(27, "(<|>)?=?\\s*\\*");
      this.regExRepo = this.regExSrcRepo.map(m => new RegExp(m.regexString, m.regexFlags));
    }
    getRegex(c) {
      return this.regExRepo[c];
    }
    registerRegexString(c, m, d = "") {
      this.regExSrcRepo[c] = {regexString:m, regexFlags:d};
      this.regexSrc[c] = m;
    }
  }
  const r = new t();
  class n {
    constructor(c = {includePrerelease:!1}) {
      this.options = c;
    }
  }
  class p extends n {
    constructor(c, m) {
      super(m);
      this.comp = c;
      m = r.getRegex(24);
      m = c.match(m);
      if (!m) {
        throw new TypeError(`Invalid comparator: ${c}`);
      }
      this.operator = null != m[1] ? m[1] : "";
      "=" === this.operator && (this.operator = "");
      m[2] ? (this.semver = new k(m[2], this.options), this.value = `${this.operator}${this.semver.version}`) : (this.semver = void 0, this.value = "");
    }
    test(c) {
      return null == this.semver ? !0 : this.cmp(c, this.operator, this.semver, this.options);
    }
    cmp(c, m, d, e) {
      switch(m) {
        case "":
        case "=":
        case "==":
          return 0 === u(c, d, e);
        case ">":
          return 0 < u(c, d, e);
        case ">=":
          return 0 <= u(c, d, e);
        case "<":
          return 0 > u(c, d, e);
        case "<=":
          return 0 >= u(c, d, e);
      }
    }
  }
  class k extends n {
    constructor(c, m) {
      super(m);
      this.numeric = /^[0-9]+$/;
      c = "string" === typeof c ? c : c.version;
      if (256 < c.length) {
        throw new TypeError("version is longer than 256 characters");
      }
      m = r.getRegex(18).exec(c.trim());
      if (!m) {
        throw new TypeError(`Invalid Version: ${c}`);
      }
      this.raw = c;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > Number.MAX_SAFE_INTEGER || 0 > this.major) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > Number.MAX_SAFE_INTEGER || 0 > this.minor) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > Number.MAX_SAFE_INTEGER || 0 > this.patch) {
        throw new TypeError("Invalid patch version");
      }
      this.prerelease = m[4] ? m[4].split(".").map(d => {
        if (/^[0-9]+$/.test(d)) {
          const e = +d;
          if (0 <= e && e < Number.MAX_SAFE_INTEGER) {
            return e;
          }
        }
        return d;
      }) : [];
      this.build = m[5] ? m[5].split(".") : [];
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`);
    }
    compare(c) {
      return this.compareMain(c) || this.comparePre(c);
    }
    compareMain(c) {
      return this.compareIdentifiers(this.major, c.major) || this.compareIdentifiers(this.minor, c.minor) || this.compareIdentifiers(this.patch, c.patch);
    }
    comparePre(c) {
      if (this.prerelease.length && !c.prerelease.length) {
        return -1;
      }
      if (!this.prerelease.length && c.prerelease.length) {
        return 1;
      }
      if (!this.prerelease.length && !c.prerelease.length) {
        return 0;
      }
      let m = 0, d = 0;
      do {
        const e = this.prerelease[m], b = c.prerelease[m];
        if (null == e && null == b) {
          d = 0;
          break;
        } else if (null == b) {
          d = 1;
          break;
        } else if (null == e) {
          d = -1;
          break;
        } else if (e !== b) {
          d = this.compareIdentifiers(e, b);
          break;
        }
      } while (++m);
      return d;
    }
    compareIdentifiers(c, m) {
      const d = this.numeric.test(`${c}`), e = this.numeric.test(`${m}`);
      d && e && (c = +c, m = +m);
      return c === m ? 0 : d && !e ? -1 : e && !d ? 1 : c < m ? -1 : 1;
    }
  }
  class l extends n {
    constructor(c, m) {
      super(m);
      this.range = c;
      this.comparatorsSet = c.split(/\s*\|\|\s*/).map(d => this.parseRange(d.trim())).filter(d => d.length);
    }
    parseRange(c) {
      c = c.trim();
      const m = r.getRegex(26);
      c = c.replace(m, (d, e, b, g, h, f, q, w, G, y, D, J) => {
        e = this.isX(b) ? "" : this.isX(g) ? `>=${b}.0.0` : this.isX(h) ? `>=${b}.${g}.0` : `>=${e}`;
        w = this.isX(G) ? "" : this.isX(y) ? `<${+G + 1}.0.0` : this.isX(D) ? `<${G}.${+y + 1}.0` : J ? `<=${G}.${y}.${D}-${J}` : `<=${w}`;
        return `${e} ${w}`.trim();
      });
      c = c.replace(r.getRegex(25), "$1$2$3");
      c = c.replace(r.getRegex(22), "$1~");
      c = c.replace(r.getRegex(15), "$1^");
      c = c.split(/\s+/).join(" ");
      return c.split(" ").map(d => this.parseComparator(d, this.options)).join(" ").split(/\s+/).map(d => new p(d, this.options));
    }
    parseComparator(c, m) {
      c = this.replaceCarets(c);
      c = this.replaceTildes(c);
      c = this.replaceXRanges(c, m);
      return c = this.replaceStars(c);
    }
    replaceTildes(c) {
      return c.trim().split(/\s+/).map(m => this.replaceTilde(m)).join(" ");
    }
    replaceTilde(c) {
      const m = r.getRegex(23);
      return c.replace(m, (d, e, b, g, h) => this.isX(e) ? "" : this.isX(b) ? `>=${e}.0.0 <${+e + 1}.0.0` : this.isX(g) ? `>=${e}.${b}.0 <${e}.${+b + 1}.0` : h ? `>=${e}.${b}.${g}-${h} <${e}.${+b + 1}.0` : `>=${e}.${b}.${g} <${e}.${+b + 1}.0`);
    }
    replaceCarets(c) {
      return c.trim().split(/\s+/).map(m => this.replaceCaret(m)).join(" ");
    }
    replaceCaret(c) {
      const m = r.getRegex(14);
      return c.replace(m, (d, e, b, g, h) => this.isX(e) ? "" : this.isX(b) ? `>=${e}.0.0 <${+e + 1}.0.0` : this.isX(g) ? "0" === e ? `>=${e}.${b}.0 <${e}.${+b + 1}.0` : `>=${e}.${b}.0 <${+e + 1}.0.0` : h ? "0" === e ? "0" === b ? `>=${e}.${b}.${g}-${h} <${e}.${b}.${+g + 1}` : `>=${e}.${b}.${g}-${h} <${e}.${+b + 1}.0` : `>=${e}.${b}.${g}-${h} <${+e + 1}.0.0` : "0" === e ? "0" === b ? `>=${e}.${b}.${g} <${e}.${b}.${+g + 1}` : `>=${e}.${b}.${g} <${e}.${+b + 1}.0` : `>=${e}.${b}.${g} <${+e + 1}.0.0`);
    }
    replaceXRanges(c, m) {
      return c.split(/\s+/).map(d => this.replaceXRange(d, m)).join(" ");
    }
    replaceXRange(c, m) {
      c = c.trim();
      const d = r.getRegex(20);
      return c.replace(d, (e, b, g, h, f, q) => {
        const w = this.isX(g), G = w || this.isX(h);
        f = G || this.isX(f);
        "=" === b && f && (b = "");
        q = m.includePrerelease ? "-0" : "";
        w ? e = ">" === b || "<" === b ? "<0.0.0-0" : "*" : b && f ? (G && (h = 0), f = 0, ">" === b ? (b = ">=", G ? (g = +g + 1, h = 0) : h = +h + 1, f = 0) : "<=" === b && (b = "<", G ? g = +g + 1 : h = +h + 1), e = `${b}${g}.${h}.${f}${q}`) : G ? e = `>=${g}.0.0${q} <${+g + 1}.0.0${q}` : f && (e = `>=${g}.${h}.0${q} <${g}.${+h + 1}.0${q}`);
        return e;
      });
    }
    replaceStars(c) {
      return c.trim().replace(r.getRegex(27), "");
    }
    test(c) {
      let m;
      try {
        m = new k(c, this.options);
      } catch (d) {
        return !1;
      }
      for (const d of this.comparatorsSet) {
        if (this.testSet(d, m, this.options)) {
          return !0;
        }
      }
      return !1;
    }
    testSet(c, m, d) {
      for (const e of c) {
        if (!e.test(m)) {
          return !1;
        }
      }
      if (m.prerelease.length && !d.includePrerelease) {
        for (const e of c) {
          if (null != e.semver && 0 < e.semver.prerelease.length && (c = e.semver, c.major === m.major && c.minor === m.minor && c.patch === m.patch)) {
            return !0;
          }
        }
        return !1;
      }
      return !0;
    }
    isX(c) {
      return !c || "x" === c.toLowerCase() || "*" === c;
    }
  }
});
S("src/lib/contextmanager/ContextManagerBase", "require exports util src/lib/Agent src/lib/RunTimeProperty src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n) {
  function p() {
    return k.value;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ROOT_STORE = a.ContextManagerBase = a.AsyncContextState = a.Stats = a.isContextManagerDebugEnabled = void 0;
  const k = new r.BooleanProperty("ContextManager");
  a.isContextManagerDebugEnabled = p;
  class l {
    constructor() {
      this.startTimer = () => {
        this.curIntervalMs = this.intervalOption.value;
        0 < this.curIntervalMs && setTimeout(this.onMonitoringInterval, this.curIntervalMs).unref();
      };
      this.onMonitoringInterval = () => {
        var d = this.debugFlag.value;
        n.ContextManager.hasDestroyHook() && 10000 < this.globalMaxCnt && this.loggedGlobalMaxCnt < this.globalMaxCnt && 1000 < this.globalMaxCnt - this.loggedGlobalMaxCnt && (d = !0, this.loggedGlobalMaxCnt = this.globalMaxCnt);
        d && (d = n.ContextManager.hasDestroyHook() ? `curCnt: ${this.curCnt}, maxCnt: ${this.maxCnt}, globalMaxCnt: ${this.globalMaxCnt},` : "", t.Logger.info(`ContextmanagerStats: ${d} initPSec: ${1000 * this.initCnt / this.curIntervalMs}`));
        this.maxCnt = this.initCnt = 0;
        this.startTimer();
      };
      this.intervalOption = new r.NumberOption("ContextManagerStatsIntervalMs", 10000);
      this.debugFlag = new r.BooleanProperty("ContextManagerStats", !1);
      this.curIntervalMs = this.loggedGlobalMaxCnt = this.maxCnt = this.globalMaxCnt = this.curCnt = this.initCnt = 0;
      process.nextTick(this.startTimer);
    }
    onInit() {
      this.initCnt++;
      n.ContextManager.hasDestroyHook() && (this.curCnt++, this.maxCnt < this.curCnt && (this.maxCnt = this.curCnt), this.globalMaxCnt < this.curCnt && (this.globalMaxCnt = this.curCnt));
    }
    onDestroy() {
      0 < this.curCnt && this.curCnt--;
    }
    getCurCnt() {
      return this.curCnt;
    }
  }
  a.Stats = l;
  class c {
    constructor(d) {
      this.context = d ? new Map(d.context) : new Map();
      p() && t.Logger.debug(`constructed AsyncContextState: ${u.inspect(this.context)}`);
    }
    getValue(d) {
      return this.context.get(d);
    }
    setValue(d, e) {
      if (null == e) {
        return this.deleteValue(d);
      }
      const b = new c(this);
      b.context.set(d, e);
      return b;
    }
    deleteValue(d) {
      const e = new c(this);
      e.context.delete(d);
      return e;
    }
    toString() {
      var d, e;
      return null !== (e = null === (d = this.getValue(n.CurrentSPC)) || void 0 === d ? void 0 : d.toString()) && void 0 !== e ? e : "<not set>";
    }
  }
  a.AsyncContextState = c;
  class m {
    constructor(d = !0) {
      this.enabled = d;
    }
    bind(d, e) {
      function b(...h) {
        return g.runInContext(d, () => Reflect.apply(e, this, h), null);
      }
      const g = this;
      Object.defineProperty(b, "length", {enumerable:!1, configurable:!0, writable:!1, value:e.length});
      return b;
    }
    bindToCurrentContext(d) {
      const e = this.activeAsyncState;
      return null != e ? this.bind(e, d) : d;
    }
    runInCurrentContext(d, e, ...b) {
      return this.runInContext(this.activeAsyncState, d, e, ...b);
    }
    debugLogger(d) {
      return this.logIf(p(), d);
    }
    logIf(d, e) {
      d && t.Logger.debug(e());
    }
  }
  a.ContextManagerBase = m;
  a.ROOT_STORE = new c();
});
S("src/lib/contextmanager/ALSContextManager", "require exports async_hooks src/lib/Embedder src/lib/SubPathContext src/lib/contextmanager/ContextManagerBase".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ALSContextManager = void 0;
  class p extends n.ContextManagerBase {
    constructor(k = !0) {
      super(k);
      this.contextStoreEmbedder = t.create("asyncContextStateHolder");
      this.stats = new n.Stats();
      this.asyncHookHandle = u.createHook(this.getAsyncHooksSetup());
      this.enable(k);
      this.init();
    }
    hasDestroyHook() {
      return !1;
    }
    get activeAsyncState() {
      var k;
      if (this.enabled) {
        return null !== (k = this.contextStoreEmbedder.get(this.getExecutionAsyncResource())) && void 0 !== k ? k : n.ROOT_STORE;
      }
    }
    init() {
      this.contextStoreEmbedder.set(this.getExecutionAsyncResource(), n.ROOT_STORE);
    }
    reset() {
      let k;
      do {
        k = r.SubPathContext.getActiveContext(), null === k || void 0 === k ? void 0 : k.deactivate();
      } while (null != k);
      this.contextStoreEmbedder.clear(this.getExecutionAsyncResource());
    }
    enable(k = !0) {
      (this.enabled = k) ? this.asyncHookHandle.enable() : this.asyncHookHandle.disable();
    }
    activateContext(k) {
      const l = this.getExecutionAsyncResource(), c = this.contextStoreEmbedder.get(l);
      this.debugLogger(() => `activateContext: ${null != k ? k.toString() : "<empty>"} was: ${null === c || void 0 === c ? void 0 : c.toString()}`);
      this.contextStoreEmbedder.set(l, k);
      return c;
    }
    activatePreviousContext(k) {
      this.debugLogger(() => `activatePreviousContext: ${null != k ? k.toString() : "<empty>"}`);
      return this.activateContext(k);
    }
    runInContext(k, l, c, ...m) {
      k = this.activateContext(k);
      try {
        return Reflect.apply(l, c, m);
      } finally {
        this.activateContext(k);
      }
    }
    getAsyncHooksSetup() {
      return {init:this.onAsyncInit.bind(this)};
    }
    onAsyncInit(k, l, c, m) {
      this.stats.onInit();
      c = this.getExecutionAsyncResource();
      const d = this.contextStoreEmbedder.get(c);
      this.debugLogger(() => `onAsyncInit: ${k}:${l} set currentStore: ${null === d || void 0 === d ? void 0 : d.toString()}`);
      null != d && this.contextStoreEmbedder.set(m, d);
    }
    getExecutionAsyncResource() {
      return u.executionAsyncResource();
    }
  }
  a.ALSContextManager = p;
});
S("src/lib/contextmanager/AHContextManager", ["require", "exports", "async_hooks", "src/lib/SubPathContext", "src/lib/contextmanager/ContextManagerBase"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AHContextManager = void 0;
  class n extends r.ContextManagerBase {
    constructor(p = !0) {
      super(p);
      this.contextsStack = [];
      this.contextMapping = new Map();
      this.stats = new r.Stats();
      this.asyncHookHandle = u.createHook(this.getAsyncHooksSetup());
      this.enable(p);
    }
    hasDestroyHook() {
      return !0;
    }
    get activeAsyncState() {
      if (this.enabled) {
        return 0 < this.contextsStack.length ? this.contextsStack[this.contextsStack.length - 1] : r.ROOT_STORE;
      }
    }
    runInContext(p, k, l, ...c) {
      p = this.activateContext(p);
      try {
        return Reflect.apply(k, l, c);
      } finally {
        this.activatePreviousContext(p);
      }
    }
    activateContext(p) {
      try {
        this.debugLogger(() => `activateContext: ${null != p ? p.toString() : "<empty>"}`);
        const k = this.activeAsyncState;
        this.contextsStack.push(p);
        return k;
      } finally {
        t.SubPathContext.announceAsyncContextActivation();
      }
    }
    activatePreviousContext(p) {
      this.debugLogger(() => `activatePreviousContext: ${null != p ? p.toString() : "<empty>"}`);
      try {
        return this.contextsStack.pop();
      } finally {
        t.SubPathContext.announceAsyncContextDeactivation();
      }
    }
    enable(p = !0) {
      (this.enabled = p) ? this.asyncHookHandle.enable() : (this.asyncHookHandle.disable(), this.reset());
    }
    reset() {
      this.contextMapping.clear();
      this.contextsStack = [];
      let p;
      do {
        p = t.SubPathContext.getActiveContext(), null === p || void 0 === p ? void 0 : p.deactivate();
      } while (null != p);
    }
    getAsyncHooksSetup() {
      return {init:this.onAsyncInit.bind(this), before:this.onBefore.bind(this), after:this.onAfter.bind(this), destroy:this.onDestroy.bind(this), promiseResolve:this.onDestroy.bind(this)};
    }
    onAsyncInit(p) {
      this.stats.onInit();
      const k = this.activeAsyncState;
      void 0 !== k && this.contextMapping.set(p, k);
    }
    onBefore(p) {
      p = this.contextMapping.get(p);
      void 0 !== p && this.contextsStack.push(p);
    }
    onAfter() {
      this.contextsStack.pop();
    }
    onDestroy(p) {
      this.contextMapping.delete(p);
      this.stats.onDestroy();
    }
  }
  a.AHContextManager = n;
});
S("src/lib/contextmanager/ContextManager", "require exports src/lib/util/SemverUtil src/lib/contextmanager/ALSContextManager src/lib/contextmanager/AHContextManager src/lib/contextmanager/ContextManagerBase".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AsyncContextState = a.ROOT_STORE = a.ContextManager = a.CurrentSPC = void 0;
  Object.defineProperty(a, "ROOT_STORE", {enumerable:!0, get:function() {
    return n.ROOT_STORE;
  }});
  Object.defineProperty(a, "AsyncContextState", {enumerable:!0, get:function() {
    return n.AsyncContextState;
  }});
  a.CurrentSPC = Symbol.for("Key for SPC");
  O = null != process.env.DT_USE_ALS_CONTEXT_MANAGER && u.satisfies(process.version, ">= 14.8.0") ? new t.ALSContextManager() : new r.AHContextManager();
  a.ContextManager = O;
});
S("src/lib/util/Validatable", ["require", "exports"], function(O, a) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.validate = void 0;
  a.validate = function(u) {
    return null != u && u.valid;
  };
});
S("src/lib/transformer/ControlParamSupplier", ["require", "exports"], function(O, a) {
  Object.defineProperty(a, "__esModule", {value:!0});
});
S("src/lib/transformer/TransformerBase", "require exports src/lib/contextmanager/ContextManager src/lib/FunctionId src/lib/Logger src/lib/MethodActivation src/lib/SubPathContext src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/util/Validatable".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  function m(y, D, J) {
    return null != J.val ? D(J.get()) : y(J.get());
  }
  function d() {
    var y;
    return G.of(null !== (y = u.ContextManager.activeAsyncState) && void 0 !== y ? y : u.ROOT_STORE);
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.fromCurrentState = a.tryWrap = a.tryLastIf = a.tryIf = a.bailIfTrueOrElse = a.bailIf = a.tryFunction = a.Continuable = a.Interrupted = a.pipe = a.compose = a.curry = a.either = a.TransformerBase = a.CbActivationResult = a.SyncActivationResult = a.AsyncActivationResult = a.FunctionRunConfig = void 0;
  class e {
    constructor(y, D, J) {
      this._initResult = y;
      this._onError = D;
      this._onSuccess = J;
    }
    chain(y) {
      var D;
      this._initResult = (null !== (D = this._initResult) && void 0 !== D ? D : d()).chain(y);
      return this;
    }
    addToErrorHandler(y) {
      this._onError = (0,a.pipe)(this._onError, y);
      return this;
    }
    addToSuccessHandler(y) {
      this._onSuccess = (0,a.pipe)(this._onSuccess, y);
      return this;
    }
    get initResult() {
      return this._initResult;
    }
    get onError() {
      return this._onError;
    }
    get onSuccess() {
      return this._onSuccess;
    }
  }
  a.FunctionRunConfig = e;
  const b = y => y;
  class g {
    constructor(y, D) {
      this.vNodeActivation = y;
      this.initiatorActivation = D;
      null === D || void 0 === D ? void 0 : D.spc.activate();
    }
    get initialSpc() {
      var y, D;
      return null !== (D = null === (y = this.initiatorActivation) || void 0 === y ? void 0 : y.spc) && void 0 !== D ? D : this.vNodeActivation.spc;
    }
    get initialActivation() {
      var y;
      return null !== (y = this.initiatorActivation) && void 0 !== y ? y : this.vNodeActivation;
    }
    initiatorActivationDone(y) {
      var D, J, B;
      null === (D = this.initiatorActivation) || void 0 === D ? void 0 : D.spc.deactivate();
      return null !== (B = null === (J = this.initiatorActivation) || void 0 === J ? void 0 : J.exitOrException(y)) && void 0 !== B ? B : !0;
    }
    toString() {
      return `AsyncActivation[vNode=${this.vNodeActivation.spc}, initiator=${this.initiatorActivation}]`;
    }
  }
  a.AsyncActivationResult = g;
  class h {
    constructor(y) {
      this.mActivation = y;
      y.spc.activate();
    }
    methodActivationDone(y) {
      this.mActivation.spc.deactivate();
      return this.mActivation.exitOrException(y);
    }
    toString() {
      return `SyncActivation[node=${this.mActivation.spc}]`;
    }
  }
  a.SyncActivationResult = h;
  class f {
    constructor(y) {
      this.activation = y;
      y.spc.activate();
    }
    done(y) {
      this.activation.spc.deactivate();
      return this.activation.exitOrException(y);
    }
    toString() {
      return this.activation.toString();
    }
  }
  a.CbActivationResult = f;
  class q {
    constructor(y) {
      this.controlParams = y;
    }
    static selectMethodActivationContext(y) {
      let D = p.SubPathContext.getActiveContext();
      null != D && D.open || (D = y);
      return D;
    }
    static createCallbackActivation(y, D, J) {
      y = q.selectMethodActivationContext(y).createCallbackActivation(D, y.sensorId, J);
      return null != y ? new f(y) : void 0;
    }
    get isDebugEnabled() {
      return this.controlParams.isDebugEnabled;
    }
    isApiRealmActive(y, D) {
      return null != D.apiRealm && null != y.currentActivation && y.currentActivation.functionId.apiRealm === D.apiRealm;
    }
    tryStartAsyncActivation(y) {
      var D;
      if (this.controlParams.active) {
        var J = p.SubPathContext.getActiveContext();
        if (null != J && this.isApiRealmActive(J, y.functionId)) {
          this.controlParams.isDebugEnabled && r.debug(`nested call within apiRealm ${y.functionId.apiRealm} ${J.currentActivation.functionId.functionName}->${y.functionId.functionName}`);
        } else {
          if (null == y.createInitiatorNode || y.createInitiatorNode) {
            if (null != J) {
              var B = J.createActivation({sensorId:y.sensorId, functionId:y.functionId, creator:y.creator, mode:1});
              if (null == B) {
                return;
              }
            } else {
              if (!this.controlParams.entrypoint) {
                return;
              }
              B = new p.SubPathContext({sensorId:y.sensorId});
              if (!B.valid) {
                return;
              }
              B = new n.MethodActivation({spc:B, mode:1, functionId:y.functionId, endSpcOnExit:!0, creator:y.creator});
            }
          }
          var v = null !== (D = null === B || void 0 === B ? void 0 : B.spc) && void 0 !== D ? D : J;
          if (null == v) {
            if (!this.controlParams.entrypoint) {
              return;
            }
            v = new p.SubPathContext({sensorId:y.sensorId});
            if (!v.valid) {
              return;
            }
          }
          D = v.spawnAsyncExecutionSubPath(y.sensorId, y.vPathOption);
          if (D.valid) {
            return J = new t.VirtualNodeFunctionId(y.functionId), y = new n.MethodActivation({spc:D, mode:2, functionId:J, category:y.category, attachmentCreator:y.attachmentCreator, creator:y.creator}), new g(y, B);
          }
          r.info(`${v.toString(!0)} was created but spawned exe subpath ${D} is invalid`);
          null === B || void 0 === B ? void 0 : B.exit();
        }
      }
    }
    tryStartActivation(y) {
      y = this.tryStartMethodActivation(y);
      if (null != y) {
        return new h(y);
      }
    }
    tryStartMethodActivation(y) {
      var D = p.SubPathContext.getActiveContext();
      if (null != D) {
        if (this.isApiRealmActive(D, y.functionId)) {
          this.controlParams.isDebugEnabled && r.debug(`nested call within apiRealm ${y.functionId.apiRealm} ${D.currentActivation.functionId.functionName}->${y.functionId.functionName}`);
        } else {
          return D.createActivation({sensorId:y.sensorId, attachmentCreator:y.attachmentCreator, category:y.category, creator:y.creator, functionId:y.functionId, mode:1});
        }
      } else {
        if (this.controlParams.entrypoint) {
          return D = new p.SubPathContext({sensorId:y.sensorId}), D.valid ? new n.MethodActivation({spc:D, endSpcOnExit:!0, attachmentCreator:y.attachmentCreator, category:y.category, creator:y.creator, functionId:y.functionId, mode:1}) : void 0;
        }
      }
    }
    tryStartIncomingAsyncSubPath(y) {
      if (this.controlParams.active && (this.controlParams.entrypoint || c.validate(y.link))) {
        var D = new p.SubPathContext(y);
        if (D.valid) {
          var J = new t.VirtualNodeFunctionId(y.functionId);
          J = new n.MethodActivation({spc:D, endSpcOnExit:!0, attachmentCreator:y.attachmentCreator, category:y.category, creator:y.creator, functionId:J, mode:2, customServiceUuid:y.customServiceUuid});
          D = D.spawnAsyncInitiatorSubPath(y.sensorId);
          y = new n.MethodActivation({spc:D, endSpcOnExit:!0, creator:y.creator, functionId:y.functionId, mode:1, customServiceUuid:y.customServiceUuid});
          return new g(J, y);
        }
      }
    }
    tryStartIncomingSubPath(y) {
      if (this.controlParams.active && (this.controlParams.entrypoint || c.validate(y.link))) {
        var D = new p.SubPathContext(y);
        if (D.valid) {
          return y = new n.MethodActivation({spc:D, endSpcOnExit:!0, attachmentCreator:y.attachmentCreator, category:y.category, creator:y.creator, functionId:y.functionId, mode:1, customServiceUuid:y.customServiceUuid}), new h(y);
        }
      }
    }
    runFunction(y, D, J, ...B) {
      return this.runFunctionInContext(new e(void 0, y.onError, y.onSuccess), D, J, ...B);
    }
    runFunctionInContext(y, D, J, ...B) {
      var v, z, x, A;
      let C = !1;
      const E = null != y.initResult ? m(F => {
        var K;
        return F instanceof u.AsyncContextState ? F : null !== (K = u.ContextManager.activeAsyncState) && void 0 !== K ? K : u.ROOT_STORE;
      }, F => F, y.initResult) : void 0, I = null != E ? u.ContextManager.bind(E, null !== (v = y.onError) && void 0 !== v ? v : b) : null !== (z = y.onError) && void 0 !== z ? z : b;
      v = null != E ? u.ContextManager.bind(E, null !== (x = y.onSuccess) && void 0 !== x ? x : b) : null !== (A = y.onSuccess) && void 0 !== A ? A : b;
      let H;
      try {
        H = null != E ? u.ContextManager.runInContext(E, D, J, ...B) : Reflect.apply(D, J, B);
      } catch (F) {
        const K = l.safeInvoke(this, I, [F]);
        C = !0;
        this.debugLogger(() => `Exception in original function ${F}. After hook ${K.didThrow ? `has thrown ${K.exception()}` : "processed"}`);
        K.didThrow && k.logAgentException(K.exception());
        throw F;
      } finally {
        if (!C) {
          const F = l.safeInvoke(this, v, [l.SafeInvokeRetVal.makeRetVal(H)]);
          this.debugLogger(() => `After hook result ${F.didThrow ? F.exception() : "success"}`);
          F.didThrow ? k.logAgentException(F.exception()) : H = F.retVal.retVal;
        }
      }
      return H;
    }
    tryStartIncomingVNode(y) {
      if (this.controlParams.active && (this.controlParams.entrypoint || c.validate(y.link))) {
        var D = new p.SubPathContext(y);
        if (D.valid) {
          var J = new t.VirtualNodeFunctionId(y.functionId);
          return new n.MethodActivation({spc:D, endSpcOnExit:!0, attachmentCreator:y.attachmentCreator, category:y.category, creator:y.creator, functionId:J, mode:2, customServiceUuid:y.customServiceUuid});
        }
      }
    }
    debugLogger(y) {
      return this.logIf(this.isDebugEnabled, y);
    }
    logIf(y, D) {
      y && r.debug(l.isFunction(D) ? D() : D);
    }
    onResultWithLog(y) {
      return D => {
        this.debugLogger(y);
        return D;
      };
    }
    onResultWithAction(y) {
      return D => {
        y();
        return D;
      };
    }
    static emptyRunConfig() {
      return new e();
    }
  }
  a.TransformerBase = q;
  a.either = m;
  a.curry = (y, D = []) => (...J) => {
    J = [...D, ...J];
    return J.length === y.length ? y(...J) : (0,a.curry)(y, J);
  };
  a.compose = (y, ...D) => D.reduce((J, B) => v => J(B(v)), null !== y && void 0 !== y ? y : b);
  a.pipe = (y, ...D) => D.reduce((J, B) => v => B(J(v)), null !== y && void 0 !== y ? y : b);
  class w {
    constructor(y) {
      this.reason = y;
    }
    get() {
      return this.reason;
    }
    static of(y) {
      return new w(y);
    }
    toString() {
      return `Interrupted(${this.get})`;
    }
    map() {
      return this;
    }
    join() {
      return this;
    }
    chain() {
      return this;
    }
  }
  a.Interrupted = w;
  class G {
    constructor(y) {
      this.val = y;
    }
    get() {
      return this.val;
    }
    static of(y) {
      return new G(y);
    }
    toString() {
      return `Continuable(${this.val})`;
    }
    map(y) {
      return new G(y(this.get()));
    }
    join() {
      return this.get() instanceof G || this.get() instanceof w ? this.get() : this;
    }
    chain(y) {
      return y(this.get());
    }
  }
  a.Continuable = G;
  a.tryFunction = function(y) {
    return D => {
      try {
        return G.of(y(D));
      } catch (J) {
        return k.logAgentException(J), w.of(J);
      }
    };
  };
  a.bailIf = function(y, D, J, B) {
    return v => y ? (J.debugLogger(D), null === B || void 0 === B ? void 0 : B.call(J), w.of(D)) : G.of(v);
  };
  a.bailIfTrueOrElse = function(y, D, J, B) {
    return v => {
      if (y) {
        return J(), w.of(D);
      }
      try {
        return G.of(B(v));
      } catch (z) {
        return k.logAgentException(z), w.of(z);
      }
    };
  };
  a.tryIf = function(y, D) {
    return J => {
      if (y) {
        try {
          return G.of(D(J));
        } catch (B) {
          return k.logAgentException(B), w.of(B);
        }
      }
      return G.of(J);
    };
  };
  a.tryLastIf = function(y, D) {
    return J => {
      if (y) {
        try {
          return w.of(D(J));
        } catch (B) {
          return k.logAgentException(B), w.of(B);
        }
      }
      return G.of(J);
    };
  };
  a.tryWrap = function(y) {
    return (...D) => {
      try {
        return y(...D);
      } catch (J) {
        k.logAgentException(J);
      }
    };
  };
  a.fromCurrentState = d;
});
S("src/lib/util/HttpUtil", "require exports http src/lib/Agent src/lib/RunTimeProperty src/lib/Tracing src/lib/sensors/SensorConstants src/lib/util/CoreUtil".split(" "), function(O, a, u, t, r, n, p, k) {
  function l(y) {
    var D = y.length;
    2 <= D && y.startsWith('"') && y.endsWith('"') && (y = y.substring(1, D - 1));
    if (y.startsWith("_") || "unknown" === y) {
      return "";
    }
    if (y.startsWith("[")) {
      return D = y.indexOf("]"), -1 !== D ? y.substring(1, D) : y.substring(1);
    }
    D = y.indexOf(":");
    return -1 !== D ? -1 !== y.indexOf(":", D + 1) ? y : y.substring(0, D) : y;
  }
  function c() {
    null == G && (G = new r.NumberSetting("sensor.stringTruncationLimit.webrequest", t.Agent.correlation.AgentConfiguration.DEFAULT_WEBREQUEST_STRING_TRUNCATION_LIMIT));
    return G.value;
  }
  function m(y, D, J, B, v, z, x) {
    if (null != z && (v = v.toLowerCase(), J || -1 !== B.indexOf(v))) {
      if (Array.isArray(z)) {
        for (const A of z) {
          null != A && y.keyValueCached(D, v, `${A}`, x);
        }
      } else {
        y.keyValueCached(D, v, `${z}`, x);
      }
    }
  }
  function d(y, D) {
    var J;
    const B = D.toLowerCase();
    return null === (J = Object.entries(y).find(([v]) => v.toLowerCase() === B)) || void 0 === J ? void 0 : J[1];
  }
  function e(y, D) {
    const J = D.toLowerCase();
    y = y.find(([B]) => B.toLowerCase() === J);
    return null === y || void 0 === y ? void 0 : y[1];
  }
  function b(y, D, J) {
    const B = y.headers;
    let v = J;
    Array.isArray(B) ? v = e : (0,k.isObject)(B) && (v = null !== J && void 0 !== J ? J : d);
    if (null == v) {
      null === D || void 0 === D ? void 0 : D(() => `getTraceContextFromRequest: unknown headers format: ${typeof y.headers}`);
    } else {
      D = n.Tracing.httpTraceContextTaggingEnabled ? v(null !== B && void 0 !== B ? B : {}, p.cW3cTraceParent) : void 0;
      if ("string" === typeof D) {
        var z = v(null !== B && void 0 !== B ? B : {}, p.cW3cTraceState);
        "string" !== typeof z && (z = void 0);
      } else {
        D = void 0;
      }
      if (null != D) {
        return {traceparent:D, tracestate:z};
      }
    }
  }
  function g(y, D, J) {
    if (null != J) {
      var B = D.toLowerCase(), v = Object.keys(y).find(z => z.toLowerCase() === B);
      y[null !== v && void 0 !== v ? v : D] = J;
    }
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.setResponseTaggingHeaders = a.getTraceContext = a.mergePropertiesCaseInsensitive = a.addOrChangeObjectProperty = a.addOrChangeArrayHeader = a.getTraceContextFromRequest = a.fillOutgoingHeaders = a.getWebRequestMaxStringLen = a.shallCapturePostRequestParameters = a.getRemoteAddress = a.getHostname = a.getClientIp = a.headersToString = a.removeResponseHeader = a.setResponseHeader = a.getResponseHeaders = a.normalizeHeaders = a.toStringArrayLc = a.lookupKeyname = a.UemConfigUpdateListener = a.outHeadersKey = 
  void 0;
  a.outHeadersKey = function() {
    const y = new u.OutgoingMessage();
    return Object.getOwnPropertySymbols(y).find(D => {
      D = D.toString();
      return "Symbol(outHeadersKey)" === D || "Symbol(kOutHeaders)" === D;
    });
  }();
  class h {
    onConfigUpdate(y) {
      var D, J, B, v;
      let z = null === (J = null === (D = y.uemConfig) || void 0 === D ? void 0 : D.globalUemConfiguration) || void 0 === J ? void 0 : J.clientIPDetectionHeaders;
      if (Array.isArray(z)) {
        f.length = 0;
        for (const x of z) {
          "string" === typeof x && f.push(x.toLowerCase());
        }
      }
      z = null === (v = null === (B = y.uemConfig) || void 0 === B ? void 0 : B.globalUemConfiguration) || void 0 === v ? void 0 : v.hostDetectionHeaders;
      if (Array.isArray(z)) {
        q.length = 0;
        for (const x of z) {
          "string" === typeof x && q.push(x.toLowerCase());
        }
      }
    }
  }
  a.UemConfigUpdateListener = h;
  const f = [], q = [];
  a.lookupKeyname = function(y, D) {
    D = D.toLowerCase();
    for (const J in y) {
      if (J.toLowerCase() === D) {
        return J;
      }
    }
  };
  a.toStringArrayLc = function(y) {
    const D = [];
    for (const J of y) {
      "string" === typeof J && D.push(J.toLowerCase());
    }
    return D;
  };
  a.normalizeHeaders = function(y) {
    const D = {};
    var J = Object.keys(y);
    for (const v of J) {
      var B = y[v];
      if (null != B && 0 !== B.length) {
        switch(J = v.toLowerCase(), J) {
          case "age":
          case "authorization":
          case "content-length":
          case "content-type":
          case "etag":
          case "expires":
          case "from":
          case "host":
          case "if-modified-since":
          case "if-unmodified-since":
          case "last-modified":
          case "location":
          case "max-forwards":
          case "proxy-authorization":
          case "referer":
          case "retry-after":
          case "server":
          case "user-agent":
            null == D[J] && (D[J] = Array.isArray(B) ? B[0] : B);
            break;
          case "set-cookie":
            null == D[J] ? D[J] = Array.isArray(B) ? B : [B] : Array.isArray(B) ? D[J] = D[J].concat(B) : D[J].push(B);
            break;
          default:
            const z = "cookie" === J ? "; " : ", ";
            B = Array.isArray(B) ? B.join(z) : B;
            D[J] = null == D[J] ? B : D[J] + `${z}${B}`;
        }
      }
    }
    return D;
  };
  a.getResponseHeaders = function(y, D) {
    if (null == D) {
      return [Object.create(null), !1];
    }
    if (a.outHeadersKey && y[a.outHeadersKey] === D) {
      y = Object.create(null);
      for (J in D) {
        const [B, v] = D[J];
        y[B] = v;
      }
      var J = y;
      return [J, !0];
    }
    if (Array.isArray(D)) {
      if (D.length && Array.isArray(D[0])) {
        J = Object.create(null);
        for (const [B, v] of D) {
          null != J[B] ? (D = J[B], J[B] = Array.isArray(D) ? D.concat(v) : [D].concat(v)) : J[B] = v;
        }
        return [J, !1];
      }
      a: {
        if (0 !== D.length % 2) {
          D = void 0;
        } else {
          J = Object.create(null);
          for (y = 0; y < D.length; y += 2) {
            const [B, v] = D.slice(y, y + 2);
            if ("string" !== typeof B) {
              D = void 0;
              break a;
            }
            J[B] = null != J[B] ? [J[B], v].flat() : v;
          }
          D = J;
        }
      }
      return [D, !1];
    }
    return (0,k.isObject)(D) ? (J = Object.assign(Object.create(null), D), [J, !1]) : [void 0, !1];
  };
  a.setResponseHeader = function(y, D, J, B, v) {
    v ? y.setHeader(J, B) : D[J] = B;
  };
  a.removeResponseHeader = function(y, D, J, B) {
    B ? y.removeHeader(J) : delete D[J];
  };
  a.headersToString = function(y) {
    let D = "";
    for (const J in y) {
      const B = y[J];
      D = Array.isArray(B) ? D + (B.map(v => `${J}=${v}`).join(" ") + " ") : D + `${J}=${B} `;
    }
    return D;
  };
  a.getClientIp = function(y) {
    for (var D of f) {
      var J = y[D];
      if (null != J) {
        y = J.indexOf(",");
        J = (-1 === y ? J : J.substring(0, y)).toLowerCase();
        y = J.indexOf("for=");
        if (-1 === y) {
          return -1 !== J.indexOf("=") ? "" : l(J);
        }
        D = J.indexOf(";");
        J = -1 === D ? J.substring(y + 4) : J.substring(y + 4, D);
        return l(J);
      }
    }
  };
  a.getHostname = function(y) {
    for (const B of q) {
      var D = y[B];
      if (null != D) {
        if ("forwarded" === B) {
          D = D.split(";");
          for (var J of D) {
            if (D = J.split("="), 2 === D.length && -1 !== D[0].toLowerCase().indexOf("host")) {
              D = D[1].split(",");
              for (let v of D) {
                if (v = v.trim().replace(/"/g, ""), 0 < v.length) {
                  return v;
                }
              }
            }
          }
          return "";
        }
        J = D.indexOf(",");
        return -1 === J ? D : D.substring(0, J);
      }
    }
    return y.host || y[":authority"] || "";
  };
  const w = process.binding("pipe_wrap").Pipe;
  a.getRemoteAddress = function(y) {
    return null == y ? "0.0.0.0" : y._handle instanceof w ? "127.0.0.1" : y.remoteAddress || "0.0.0.0";
  };
  a.shallCapturePostRequestParameters = function(y, D, J) {
    if ("POST" !== y || !J.shallCaptureRequestData()) {
      return !1;
    }
    y = D["content-type"];
    return "string" === typeof y && y.toLowerCase().includes("application/x-www-form-urlencoded");
  };
  let G;
  a.getWebRequestMaxStringLen = c;
  a.fillOutgoingHeaders = function(y, D, J, B, v) {
    const z = c();
    if (Array.isArray(J)) {
      for (const x of J) {
        Array.isArray(x) && 2 === x.length && "string" === typeof x[0] && m(y, D, B, v, x[0], x[1], z);
      }
    } else {
      for (const x in J) {
        m(y, D, B, v, x, J[x], z);
      }
    }
  };
  a.getTraceContextFromRequest = b;
  a.addOrChangeArrayHeader = function(y, D, J) {
    if (null != J) {
      var B = D.toLowerCase(), v = y.find(([z]) => z.toLowerCase() === B);
      null != v ? v[1] = J : y.push([D, J]);
    }
  };
  a.addOrChangeObjectProperty = g;
  a.mergePropertiesCaseInsensitive = function(y, D) {
    const J = Object.assign(Object.create(null), y);
    Object.keys(D).forEach(B => g(J, B, D[B]));
    return J;
  };
  a.getTraceContext = function(y) {
    var D;
    if (null != y) {
      var J = n.Tracing.httpDtTaggingEnabled ? y[p.cDtTaggingHeader] : void 0;
      "string" !== typeof J && (J = void 0);
      var {traceparent:B, tracestate:v} = null !== (D = b({headers:y}, void 0, (z, x) => z[x])) && void 0 !== D ? D : {traceparent:void 0, tracestate:void 0};
      if (null != J || null != B) {
        return {dtTag:J, traceparent:B, tracestate:v};
      }
    }
  };
  a.setResponseTaggingHeaders = function(y, D) {
    const J = y[p.cW3cTraceResponse];
    y = y[p.cDtTraceState];
    null == J && null == y || D.spc.path.setCurrentNodeResponseTaggingHeaders(J, y);
  };
});
S("src/lib/sensors/WebRequestSensorProperties", "require exports url src/lib/sensors/UriRuleSensorProperty src/lib/Logger src/lib/util/CoreUtil src/lib/util/HttpUtil".split(" "), function(O, a, u, t, r, n, p) {
  function k(g, h) {
    return Array.isArray(g) ? p.toStringArrayLc(g) : h;
  }
  function l(g, h) {
    return "boolean" === typeof g ? g : h;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.WebRequestSensorProperties = void 0;
  const c = [], m = [], d = [], e = [];
  class b {
    constructor(g) {
      this.theCaptureAllRequestHeaders = !1;
      this.theRequestHeadersToCapture = c;
      this.theCaptureAllResponseHeaders = !1;
      this.theResponseHeadersToCapture = m;
      this.theRequestParametersToCapture = d;
      this.theUriRulesWhiteList = this.theCaptureAllRequestParameters = !1;
      this.theUriRules = e;
      this.theEnableHttp2Transformer = !1;
      this.update(g);
    }
    update(g) {
      if (n.hasProperty(g, "sensorProperties")) {
        g = g.sensorProperties;
        this.theCaptureAllRequestHeaders = l(g.captureAllRequestHeaders, !1);
        this.theRequestHeadersToCapture = k(g.requestHeadersToCapture, c);
        this.theCaptureAllResponseHeaders = l(g.captureAllResponseHeaders, !1);
        this.theResponseHeadersToCapture = k(g.responseHeadersToCapture, m);
        var h = g.requestParametersToCapture;
        if (Array.isArray(h)) {
          const q = [];
          for (f of h) {
            "string" === typeof f && q.push(f);
          }
          var f = q;
        } else {
          f = d;
        }
        this.theRequestParametersToCapture = f;
        this.theCaptureAllRequestParameters = l(g.captureAllRequestParameters, !1);
        this.theUriRulesWhiteList = l(g.uriRulesWhiteList, !1);
        this.theUriRules = (0,t.parseUriRules)(g.uriRules, "WebRequestSensorConfig.sensorProperties");
        this.theEnableHttp2Transformer = l(g.enableHttp2Transformer, !1);
      } else {
        r.info("WebRequestSensorConfig has no sensorProperties field");
      }
    }
    get captureAllRequestHeaders() {
      return this.theCaptureAllRequestHeaders;
    }
    get requestHeadersToCapture() {
      return this.theRequestHeadersToCapture;
    }
    get captureAllResponseHeaders() {
      return this.theCaptureAllResponseHeaders;
    }
    get responseHeadersToCapture() {
      return this.theResponseHeadersToCapture;
    }
    get requestParametersToCapture() {
      return this.theRequestParametersToCapture;
    }
    get captureAllRequestParameters() {
      return this.theCaptureAllRequestParameters;
    }
    get enableHttp2Transformer() {
      return this.theEnableHttp2Transformer;
    }
    get uriRulesWhiteList() {
      return this.theUriRulesWhiteList;
    }
    get uriRules() {
      return this.theUriRules;
    }
    shallCaptureRequestData() {
      return this.captureAllRequestParameters || 0 < this.requestParametersToCapture.length;
    }
    shallCaptureUrl(g) {
      if ("string" !== typeof g || 0 === this.theUriRules.length) {
        return !this.theUriRulesWhiteList;
      }
      const h = u.parse(g);
      g = this.theUriRules.some(f => f.match(h.pathname || "", h.query || ""));
      return this.theUriRulesWhiteList ? g : !g;
    }
  }
  a.WebRequestSensorProperties = b;
});
S("src/lib/logenrichment/LogEnrichmentSensorProperty", ["require", "exports"], function(O, a) {
  Object.defineProperty(a, "__esModule", {value:!0});
});
S("src/lib/sensors/SensorConfig", ["require", "exports"], function(O, a) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.cConfigKeyPrefix = "Node.";
  a.cSdkConfigKeyPrefix = "sdk.";
  a.cBizEventsConfigKeyPrefix = "bizevents.";
  a.cCustomServiceKeyPrefix = `${a.cConfigKeyPrefix}CustomService.`;
});
S("src/lib/otel/SpanSensorConfig", ["require", "exports", "src/lib/Logger", "src/lib/util/CoreUtil"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.SpanSensorConfig = void 0;
  class r {
    constructor(k) {
      this.value = "";
      this.kind = 5;
      switch(k.type) {
        case "CONTAINS":
          this.type = 0;
          break;
        case "STARTS_WITH":
          this.type = 1;
          break;
        case "ENDS_WITH":
          this.type = 2;
          break;
        case "EQUALS":
          this.type = 3;
          break;
        default:
          throw new TypeError(`type invalid <${k.type}>`);
      }
      switch(k.source) {
        case "SPAN_NAME":
          this.source = 0;
          break;
        case "SPAN_KIND":
          this.source = 1;
          break;
        case "ATTRIBUTE":
          this.source = 2;
          break;
        case "INSTRUMENTATION_LIBRARY_NAME":
          this.source = 3;
          break;
        case "INSTRUMENTATION_LIBRARY_VERSION":
          this.source = 4;
          break;
        default:
          throw new TypeError(`source invalid: <${k.source}>`);
      }
      if (2 === this.source) {
        if ("string" !== typeof k.sourceKey) {
          throw new TypeError(`sourceKey invalid: <${typeof k.sourceKey}>`);
        }
        this.sourceKey = k.sourceKey;
      } else {
        this.sourceKey = "";
      }
      if ("string" !== typeof k.value) {
        throw new TypeError(`value invalid: <${typeof k.value}>`);
      }
      if (1 === this.source) {
        switch(k.value) {
          case "INTERNAL":
            this.kind = 0;
            break;
          case "SERVER":
            this.kind = 1;
            break;
          case "CLIENT":
            this.kind = 2;
            break;
          case "PRODUCER":
            this.kind = 3;
            break;
          case "CONSUMER":
            this.kind = 4;
            break;
          default:
            throw new TypeError(`kind value invalid: <${k.value}>`);
        }
      } else {
        this.value = k.value;
      }
      switch(k.negate) {
        case "NEGATED":
          this.negation = 0;
          break;
        case "NOT_NEGATED":
          this.negation = 1;
          break;
        default:
          throw new TypeError(`negate invalid <${k.negate}>`);
      }
      switch(k.caseSensitive) {
        case "CASE_SENSITIVE":
          this.caseSensitivity = 0;
          break;
        case "CASE_INSENSITIVE":
          this.caseSensitivity = 1;
          break;
        default:
          throw new TypeError(`caseSensitive invalid <${k.caseSensitive}>`);
      }
      1 === this.caseSensitivity && (this.value = this.value.toUpperCase(), this.sourceKey = this.sourceKey.toUpperCase());
    }
    match(k) {
      let l;
      switch(this.source) {
        case 0:
          l = this.compare(k.name);
          break;
        case 1:
          l = k.kind === this.kind;
          break;
        case 2:
          l = this.compareAttribute(k.attributes);
          break;
        case 3:
          l = this.compare(k.libraryName);
          break;
        case 4:
          l = this.compare(k.libraryVersion);
      }
      return 1 === this.negation ? l : !l;
    }
    compare(k) {
      if ("string" !== typeof k) {
        return !1;
      }
      1 === this.caseSensitivity && (k = k.toUpperCase());
      switch(this.type) {
        case 0:
          return k.includes(this.value);
        case 2:
          return k.endsWith(this.value);
        case 3:
          return k === this.value;
        case 1:
          return k.startsWith(this.value);
      }
    }
    compareAttribute(k) {
      if (!t.isObject(k)) {
        return !1;
      }
      if (0 === this.caseSensitivity) {
        return k = k[this.sourceKey], "string" === typeof k ? this.compare(k) : !1;
      }
      for (const [l, c] of Object.entries(k)) {
        if ("string" === typeof c && l.toUpperCase() === this.sourceKey) {
          return this.compare(c);
        }
      }
      return !1;
    }
  }
  class n {
    constructor(k, l) {
      this.action = l;
      if (!Array.isArray(k.matchers)) {
        throw new TypeError(`matchers invalid <${typeof k.matchers}>`);
      }
      this.matchers = [];
      for (const c of k.matchers) {
        if (!t.isObject(c)) {
          throw new TypeError(`matcher invalid <${typeof c}>`);
        }
        this.matchers.push(new r(c));
      }
    }
    match(k) {
      if (0 === this.matchers.length) {
        return !0;
      }
      for (const l of this.matchers) {
        if (!l.match(k)) {
          return !1;
        }
      }
      return !0;
    }
    static matchRules(k, l, c) {
      for (const m of l) {
        if (m.match(k)) {
          return m.action;
        }
      }
      return c;
    }
  }
  class p {
    constructor(k) {
      this.captureRules = [];
      this.entrypointRules = [];
      this.outTaggingRules = [];
      this.update(k);
    }
    update(k) {
      if (t.isObject(k.sensorProperties)) {
        k = k.sensorProperties;
        if (Array.isArray(k.captureRules)) {
          const w = [];
          for (var l of k.captureRules) {
            try {
              var c = w, m = c.push;
              let G = void 0;
              var d = l;
              switch(d.action) {
                case "CAPTURE":
                  G = 0;
                  break;
                case "IGNORE":
                  G = 1;
                  break;
                default:
                  throw new TypeError(`action invalid <${d.action}>`);
              }
              var e = new n(d, G);
              m.call(c, e);
            } catch (G) {
              u.info(`SpanSensorConfig captureRules parse skip: ${JSON.stringify(l)}, ${G.message}`);
            }
          }
          this.captureRules = w;
        }
        if (Array.isArray(k.entrypointRules)) {
          l = [];
          for (var b of k.entrypointRules) {
            try {
              m = l;
              var g = m.push;
              c = void 0;
              e = b;
              switch(e.action) {
                case "ENTRYPOINT":
                  c = 0;
                  break;
                case "NO_ENTRYPOINT":
                  c = 1;
                  break;
                default:
                  throw new TypeError(`action invalid <${e.action}>`);
              }
              var h = new n(e, c);
              g.call(m, h);
            } catch (w) {
              u.info(`SpanSensorConfig entrypointRules skip: ${JSON.stringify(b)}, ${w.message}`);
            }
          }
          this.entrypointRules = l;
        }
        if (Array.isArray(k.outTaggingRules)) {
          g = [];
          for (const w of k.outTaggingRules) {
            try {
              k = g;
              var f = k.push;
              b = void 0;
              h = w;
              switch(h.action) {
                case "TAG":
                  b = 0;
                  break;
                case "NO_TAG":
                  b = 1;
                  break;
                default:
                  throw new TypeError(`action invalid <${h.action}>`);
              }
              var q = new n(h, b);
              f.call(k, q);
            } catch (G) {
              u.info(`SpanSensorConfig outTaggingRules skip: ${JSON.stringify(w)}, ${G.message}`);
            }
          }
          this.outTaggingRules = g;
        }
      } else {
        u.info("SpanSensorConfig has no sensorProperties field");
      }
    }
    shouldCapture(k) {
      return 0 === n.matchRules(k, this.captureRules, 1);
    }
    isEntrypoint(k) {
      return 0 === n.matchRules(k, this.entrypointRules, 1);
    }
    shouldTag(k) {
      return 0 === n.matchRules(k, this.outTaggingRules, 1);
    }
  }
  a.SpanSensorConfig = p;
});
S("src/lib/otel/SpanAttachment", "require exports src/lib/Agent src/lib/AttachmentBase src/lib/util/CoreUtil src/lib/RunTimeProperty".split(" "), function(O, a, u, t, r, n) {
  function p() {
    null == k && (k = new n.NumberSetting("sensor.stringTruncationLimit.spanattribute.value", u.Agent.correlation.AgentConfiguration.DEFAULT_SPANATTRIBUTE_VALUE_STRING_TRUNCATION_LIMIT));
    const c = k.value;
    return 0 <= c ? c : 0;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.SpanAttachment = a.addEventToNativePurePath = a.convertExceptionToAttributes = a.SemanticAttributes = a.cExceptionEventName = a.getAttributeValueMaxStringLen = void 0;
  let k;
  a.getAttributeValueMaxStringLen = p;
  a.cExceptionEventName = "exception";
  a.SemanticAttributes = {EXCEPTION_MESSAGE:"exception.message", EXCEPTION_TYPE:"exception.type", EXCEPTION_STACKTRACE:"exception.stacktrace"};
  a.convertExceptionToAttributes = function(c) {
    if ("string" === typeof c) {
      return {[a.SemanticAttributes.EXCEPTION_MESSAGE]:c};
    }
    if (r.isObject(c)) {
      const m = {};
      c.code ? m[a.SemanticAttributes.EXCEPTION_TYPE] = c.code.toString() : c.name && (m[a.SemanticAttributes.EXCEPTION_TYPE] = c.name);
      c.message && (m[a.SemanticAttributes.EXCEPTION_MESSAGE] = c.message);
      c.stack && (m[a.SemanticAttributes.EXCEPTION_STACKTRACE] = c.stack);
      if (m[a.SemanticAttributes.EXCEPTION_TYPE] || m[a.SemanticAttributes.EXCEPTION_MESSAGE]) {
        return m;
      }
    }
  };
  a.addEventToNativePurePath = function(c, m, d) {
    if (null != d) {
      const e = {};
      Object.entries(d).forEach(([b, g]) => {
        Array.isArray(g) ? e[b] = JSON.stringify(g) : e[b] = g;
      });
      c.appendCurrentNodeSpanEvent(m, e);
    } else {
      c.appendCurrentNodeSpanEvent(m);
    }
  };
  class l extends t.AttachmentBase {
    constructor(c, m) {
      super(c, u.Agent.correlation.AttachmentId.SPAN_ID, u.Agent.correlation.SpanAttachmentSdsVersion.V2);
      this.otelApi = m;
    }
    fillEntryData(c, m, d, e) {
      this.setMultipleFields(b => {
        const g = u.Agent.correlation, h = g.AttachmentFieldId;
        b.integer(h.SPAN_TRACING_SYSTEM, g.ForeignTracerSystem.OPENTELEMETRY);
        b.stringCachedOrUnavailable(h.SPAN_INSTRUMENTATION_LIBRARY_NAME, c.name);
        "string" === typeof c.version && b.stringCached(h.SPAN_INSTRUMENTATION_LIBRARY_VERSION, c.version);
        b.stringCachedOrUnavailable(h.SPAN_NAME_AT_START, m);
        b.integer(h.SPAN_KIND, this.convertSpanKind(d));
        for (const [f, q] of Object.entries(e)) {
          this.setAttribute(b, f, q, h.SPAN_ATTRIBUTE_KEY_AT_START, h);
        }
      });
    }
    fillExitData(c, m, d, e) {
      this.setMultipleFields(b => {
        const g = u.Agent.correlation.AttachmentFieldId;
        "number" === typeof m.code && b.integer(g.SPAN_STATUS_CODE, this.convertStatusCode(m.code));
        "string" === typeof m.message && b.stringCached(g.SPAN_STATUS_MESSAGE, m.message);
        "string" === typeof c && b.stringCached(g.SPAN_NAME_AT_END, c);
        for (const [h, f] of Object.entries(e)) {
          d[h] !== f && this.setAttribute(b, h, f, g.SPAN_ATTRIBUTE_KEY_AT_END, g);
        }
      });
    }
    convertStatusCode(c) {
      const m = u.Agent.correlation;
      switch(c) {
        case this.otelApi.SpanStatusCode.ERROR:
          return m.SpanStatusCode.ERROR;
        case this.otelApi.SpanStatusCode.OK:
          return m.SpanStatusCode.OK;
      }
      return m.SpanStatusCode.UNSET;
    }
    convertSpanKind(c) {
      const m = u.Agent.correlation;
      switch(c) {
        case 2:
          return m.SpanKind.CLIENT;
        case 4:
          return m.SpanKind.CONSUMER;
        case 3:
          return m.SpanKind.PRODUCER;
        case 1:
          return m.SpanKind.SERVER;
      }
      return m.SpanKind.INTERNAL;
    }
    setAttribute(c, m, d, e, b) {
      switch(typeof d) {
        case "number":
          c.stringCached(e, m);
          c.float(b.ATTACHMENT_CAPTURED_ARG_DOUBLE, d);
          break;
        case "string":
          c.stringCached(e, m);
          c.stringCached(b.ATTACHMENT_CAPTURED_ARG_STRING, d, p());
          break;
        case "boolean":
          c.stringCached(e, m);
          c.integer(b.ATTACHMENT_CAPTURED_ARG_BOOL, d ? 1 : 0);
          break;
        default:
          Array.isArray(d) && (c.stringCached(e, m), c.stringCached(b.ATTACHMENT_CAPTURED_ARG_STRING, JSON.stringify(d), p()));
      }
    }
  }
  a.SpanAttachment = l;
});
S("src/lib/otel/SpanTracker", "require exports src/lib/Embedder src/lib/Logger src/lib/util/ErrorUtil src/lib/util/UniqueId src/lib/otel/SpanAttachment".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.SpanTracker = a.spanTrackerEmbedder = void 0;
  a.spanTrackerEmbedder = u.create("SpanTracker");
  class k {
    constructor(l, c, m, d) {
      this.linkableSpc = c;
      this.otelApi = m;
      this.debug = d;
      this.status = Object.create(null);
      this.attributesAtStart = Object.create(null);
      this.id = n.UniqueId.getNext();
      this.instrLib = {name:l.libraryName, version:l.libraryVersion};
      this.name = l.name;
      this.kind = l.kind;
      Object.assign(this.attributesAtStart, l.attributes);
      this.attributesAtEnd = Object.assign(Object.create(null), this.attributesAtStart);
    }
    getSpanInfo() {
      var l;
      return {name:null !== (l = this.updateName) && void 0 !== l ? l : this.name, kind:this.kind, libraryName:this.instrLib.name, libraryVersion:this.instrLib.version, attributes:this.attributesAtEnd};
    }
    createAttachments(l) {
      l = new p.SpanAttachment(l, this.otelApi);
      if (l.valid) {
        this.attachment = l;
        try {
          l.fillEntryData(this.instrLib, this.name, this.kind, this.attributesAtStart);
        } catch (c) {
          r.logAgentException(c);
        }
      } else {
        this.debug && t.debug(`${this}: fillEntryData() - failed to create attachment`);
      }
    }
    onSpanEnd() {
      var l;
      (null === (l = this.attachment) || void 0 === l ? 0 : l.valid) && this.attachment.fillExitData(this.name !== this.updateName ? this.updateName : void 0, this.status, this.attributesAtStart, this.attributesAtEnd);
      this.methodActivation.exit();
      this.attributesAtStart = this.attributesAtEnd = Object.create(null);
    }
    addEvent(l, c) {
      var m;
      !this.methodActivation.isExited && (null === (m = this.attachment) || void 0 === m ? 0 : m.valid) && (0,p.addEventToNativePurePath)(this.methodActivation.spc.path, l, c);
    }
    get isRecording() {
      return !this.methodActivation.isExited && null != this.attachment && this.attachment.valid;
    }
    toString() {
      this.logPrefix || (this.logPrefix = `Span ${n.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
  }
  a.SpanTracker = k;
});
S("src/lib/otel/Utils", ["require", "exports", "src/lib/Embedder", "src/lib/otel/SpanTracker", "src/lib/util/CoreUtil"], function(O, a, u, t, r) {
  function n(p) {
    return r.isObject(p) ? "function" === typeof p.getValue && "function" === typeof p.setValue : !1;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.createDtSpan = a.spanModifiedEmbedder = a.spcEmbedder = a.getTrackerFromContext = a.isContext = void 0;
  a.isContext = n;
  a.getTrackerFromContext = function(p, k) {
    if (n(p) && (p = k.trace.getSpan(p), null != p)) {
      return t.spanTrackerEmbedder.get(p);
    }
  };
  a.spcEmbedder = u.create("SubPathContext");
  a.spanModifiedEmbedder = u.create("spanModified");
  a.createDtSpan = function(p, k, l) {
    k = {traceId:l.traceId, spanId:k, traceFlags:l.isIgnoredPath ? p.TraceFlags.NONE : p.TraceFlags.SAMPLED};
    a.spanModifiedEmbedder.set(k, !0);
    k = p.trace.setSpanContext(p.ROOT_CONTEXT, k);
    p = p.trace.getSpan(k);
    a.spcEmbedder.set(p, l);
    return p;
  };
});
S("src/lib/MethodActivation", "require exports src/lib/Agent src/lib/Debug src/lib/Logger src/lib/RunTimeProperty src/lib/SubPathContext src/lib/sensors/ExceptionAttachment src/lib/otel/Utils src/lib/util/CoreUtil".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MethodActivation = void 0;
  const m = Buffer.allocUnsafe(8), d = 2 ** 32;
  class e {
    constructor(b) {
      var g, h;
      this.currentState = 0;
      t.assert(b.spc.open);
      this.spc = b.spc;
      this.functionId = b.functionId;
      this.endSpcOnExit = null !== (g = b.endSpcOnExit) && void 0 !== g ? g : !1;
      this.creator = null !== (h = b.creator) && void 0 !== h ? h : u.Agent.correlation.Creator.NONE;
      this.customService = b.customServiceUuid;
      e.serialNoCounter >= d && (e.serialNoCounter = 1);
      this.serialNo = e.serialNoCounter++;
      this.category = null != b.category ? b.category : this.isVirtual ? u.Agent.correlation.MethodCategory.AsyncCall : u.Agent.correlation.MethodCategory.None;
      null == b.attachmentCreator || this.spc.isIgnoredPath || b.attachmentCreator.createAttachments(this);
      this.isDebugEnabled && r.debug(`creating MethodActivation(${this.toString(!0)})`);
      switch(b.mode) {
        case 0:
          break;
        case 1:
          this.enter();
          break;
        case 2:
          this.enterAndSuspend();
          break;
        default:
          t.fail(`unexpected MethodActivationCreationMode: ${b.mode}`);
      }
    }
    get stack() {
      const b = [];
      b.push(this);
      let g = this.parentActivation;
      for (; null != g;) {
        b.push(g), g = g.parentActivation;
      }
      return b;
    }
    get valid() {
      return this.spc.open;
    }
    toString(b = !1) {
      let g = `${this.functionId.toString()}:${this.serialNo}`;
      b && (g += `[${this.spc}]`);
      return g;
    }
    enter(b = !1) {
      this.doTransition(b ? 1 : 0);
      t.assert(null == this.parentActivation || 1 === this.parentActivation.currentState);
      let g = !1;
      t.assert(this.spc.open, "enter on closed path");
      this.spc.open && (g = this.spc.isIgnoredPath ? !0 : b ? this.spc.path.methodEnterSuspended(this.serialNo, this.functionId.methodId, this.category, this.isVirtual, this.creator, this.customService) : this.spc.path.methodEnter(this.serialNo, this.functionId.methodId, this.category, this.isVirtual, this.creator, this.customService), this.spc.onMethodEnter(this), this.isDebugEnabled && r.debug(`MethodActivation.enter(${this}): ${g}`));
      return g;
    }
    enterAndSuspend() {
      return this.enter(!0);
    }
    exit(b) {
      this.doTransition(4);
      t.assert(this.spc.open, "exit on closed path");
      this.spc.onMethodExit(this);
      const g = this.spc.isIgnoredPath ? !0 : this.spc.path.methodExit(this.serialNo, this.isVirtual, b);
      this.endSpcOnExit && this.spc.end();
      this.isDebugEnabled && r.debug(`MethodActivation.exit(${this}): ${g} withCustomTicks: ${null != b}`);
      return g;
    }
    get isExited() {
      return 3 === this.currentState;
    }
    exitOrException(b, g) {
      return null != b ? this.methodException(b, g) : this.exit(g);
    }
    addExceptionData(b, g = !0) {
      if (!this.spc.isIgnoredPath && c.isError(b)) {
        const h = new k.ExceptionAttachment(this);
        h.valid && h.fillExceptionData(b, g);
      }
    }
    methodException(b, g) {
      this.doTransition(5);
      t.assert(this.spc.open, "methodException on closed path");
      this.addExceptionData(b);
      this.spc.onMethodExit(this);
      b = this.spc.isIgnoredPath || this.spc.path.methodException(this.serialNo, this.isVirtual, g);
      this.endSpcOnExit && this.spc.end();
      this.isDebugEnabled && r.debug(`MethodActivation.methodException(${this}): ${b}`);
      return b;
    }
    getAttachment(b, g, h) {
      const f = this.spc.isIgnoredPath;
      this.spc.open && !f ? (this.isDebugEnabled && r.debug(`MethodActivation.getAttachment(${this}, id:${b}, semanticVersion:${g}, target:${h})`), b = this.spc.path.getAttachment(this.serialNo, b, g, h)) : (b = u.Agent.correlation.cInvalidAttachment, f || t.fail("attempt to create attachement on closed path"));
      return b;
    }
    get isVirtual() {
      return this.functionId.isVirtual;
    }
    getOrCreateSpan(b) {
      null == this.theSpan && (this.theSpan = (0,l.createDtSpan)(b, this.spanId, this.spc));
      return this.theSpan;
    }
    setSpan(b) {
      const g = b.spanContext();
      null == this.theSpan && this.theSpanId === g.spanId ? this.theSpan = b : (b = `${this.toString(!0)} invalid setSpan traceId: ${g.traceId}, spanId: ${g.spanId}, expected spanId: ${this.theSpanId}`, t.fail(b), r.warning(b));
    }
    get span() {
      return this.theSpan;
    }
    get spanId() {
      var b;
      if (null == this.theSpanId) {
        if (this.spc.traceId !== p.cInvalidTraceId) {
          if (null === (b = this.spc.path.getCurrentSpanId()) || void 0 === b) {
            m.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, 0);
            m.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, 4);
            for (b = 0; 8 > b && 0 === m[b]; b++) {
              7 === b && (m[7] = 1);
            }
            b = m.toString("hex", 0, 8);
          }
          this.theSpanId = b;
        } else {
          this.theSpanId = p.cInvalidSpanId;
        }
      }
      return this.theSpanId;
    }
    doTransition(b) {
      let g, h;
      switch(b) {
        case 0:
          g = 0 === this.currentState;
          h = 1;
          break;
        case 1:
          g = 0 === this.currentState;
          h = 2;
          break;
        case 2:
          g = 1 === this.currentState;
          h = 2;
          break;
        case 3:
          g = 2 === this.currentState;
          h = 1;
          break;
        case 4:
        case 5:
          g = 1 === this.currentState || 2 === this.currentState;
          h = 3;
          break;
        default:
          t.fail(`unknown MethodActivationEvent ${b}`), g = !1, h = this.currentState;
      }
      g ? this.currentState = h : (b = `${this.toString(!0)}: MethodActivationEvent ${b} invalid in state ${this.currentState}`, t.fail(b), r.warning(b));
      return g;
    }
    get isDebugEnabled() {
      return e.cDbgFlag.value;
    }
  }
  e.serialNoCounter = 1;
  e.cDbgFlag = new n.BooleanProperty("MethodActivation");
  a.MethodActivation = e;
});
S("src/lib/SubPathContext", "require exports util src/lib/Agent src/lib/Debug src/lib/Logger src/lib/MethodActivation src/lib/RunTimeProperty src/lib/Tracing src/lib/otel/Utils src/lib/util/Validatable src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.SubPathContext = a.cInvalidTraceId = a.cInvalidSpanId = a.ContextStackListener = void 0;
  class e {
    onContextActivation() {
    }
  }
  a.ContextStackListener = e;
  const b = new k.BooleanProperty("SubPathContext");
  a.cInvalidSpanId = "0000000000000000";
  a.cInvalidTraceId = "00000000000000000000000000000000";
  class g {
    constructor() {
      this.contextStackListeners = [];
      this.contextStack = [];
    }
    get top() {
      return this.hasItem ? this.contextStack[this.contextStack.length - 1] : void 0;
    }
    pop() {
      var f;
      1 === this.contextStack.length && this.announceLastContextDeactivation();
      const q = this.hasItem ? this.contextStack.pop() : void 0;
      b.value && n.debug(`ContextStack.pop ${null === (f = null === q || void 0 === q ? void 0 : q.getValue(d.CurrentSPC)) || void 0 === f ? void 0 : f.toString()} => ${this.topToString()}`);
      return q;
    }
    push() {
      var f;
      const q = d.ContextManager.activeAsyncState;
      q && (b.value && n.debug(`ContextStack.push ${this.topToString()} => ${null === (f = null === q || void 0 === q ? void 0 : q.getValue(d.CurrentSPC)) || void 0 === f ? void 0 : f.toString()}`), this.contextStack.push(q), 1 === this.contextStack.length && this.announceFirstContextActivation());
    }
    topToString() {
      var f, q;
      return this.hasItem ? null !== (q = null === (f = this.top.getValue(d.CurrentSPC)) || void 0 === f ? void 0 : f.toString()) && void 0 !== q ? q : "<invalid>" : "<empty>";
    }
    clear() {
      this.contextStack = [];
    }
    addContextStackListener(f) {
      r.assert(!this.contextStackListeners.includes(f), "Trying to add the same ContextStackListener twice!");
      this.contextStackListeners.push(f);
    }
    removeContextStackListener(f) {
      f = this.contextStackListeners.indexOf(f);
      -1 < f ? this.contextStackListeners.splice(f, 1) : r.fail("Trying to remove non existing ContextStackListener!");
    }
    announceLastContextDeactivation() {
      this.contextStackListeners.forEach(f => f.onLastContextDeactivation());
    }
    announceFirstContextActivation() {
      this.contextStackListeners.forEach(f => f.onFirstContextActivation());
    }
    announceContextActivation(f) {
      this.contextStackListeners.forEach(q => q.onContextActivation(f));
    }
    get hasItem() {
      return 0 < this.contextStack.length;
    }
  }
  class h {
    constructor(f) {
      var q;
      this.previousSpcList = [];
      this.instanceId = h.instanceCounter++;
      this.theDidInitiatAsyncOpFlag = !1;
      this.sensorId = f.sensorId;
      null != f.traceId ? (this.pathHandle = t.Agent.correlation.startLocalPath(this.sensorId, f.link, l.Tracing.getTaggingMode()), this.theIsIgnoredPath = this.pathHandle.isIgnored(), this.traceId = f.traceId) : (this.pathHandle = t.Agent.correlation.startPath(this.sensorId, f.link, f.serverId, l.Tracing.getTaggingMode()), this.pathHandle.isIgnored() && (this.theIsIgnoredPath = !0), this.traceId = null !== (q = this.pathHandle.getTraceId()) && void 0 !== q ? q : a.cInvalidTraceId);
      b.value && n.debug(`created ${this.toString(!0)} | isIgnored=${this.isIgnoredPath}`);
    }
    get isIgnoredPath() {
      var f;
      return null !== (f = this.theIsIgnoredPath) && void 0 !== f ? f : !1;
    }
    static getActiveContext() {
      var f;
      return null === (f = d.ContextManager.activeAsyncState) || void 0 === f ? void 0 : f.getValue(d.CurrentSPC);
    }
    static addContextStackListener(f) {
      h.contextStack.addContextStackListener(f);
    }
    static announceAsyncContextActivation() {
      h.contextStack.push();
      h.contextStack.announceContextActivation(h.getActiveContext());
    }
    static announceAsyncContextDeactivation() {
      h.contextStack.pop();
    }
    static removeContextStackListener(f) {
      h.contextStack.removeContextStackListener(f);
    }
    announceFirstContextActivation() {
      h.contextStack.announceFirstContextActivation();
    }
    announceLastContextDeactivation() {
      h.contextStack.announceLastContextDeactivation();
    }
    toString(f = !1) {
      let q = `SPC:#${this.instanceId.toString(16)}`;
      f && (q += `[P=${this.pathHandle}, LAF=${(0,u.inspect)(this.lostAndFoundLocalLink || "<>")}, valid=${this.valid}, traceId=${this.traceId}]`);
      return q;
    }
    get activationStack() {
      const f = [];
      let q = this.theCurrentActivation;
      for (; null != q;) {
        f.push(q), q = q.parentActivation;
      }
      return f;
    }
    get currentActivation() {
      return this.theCurrentActivation;
    }
    get didInitiateAsyncOp() {
      return this.theDidInitiatAsyncOpFlag;
    }
    set didInitiateAsyncOp(f) {
      f && f !== this.theDidInitiatAsyncOpFlag && (b.value && n.debug(`${this} set didInitiatAsyncOp to true`), this.open ? this.theDidInitiatAsyncOpFlag = !0 : r.fail(`${this} set didInitiateAsyncOp on ended path`));
    }
    get valid() {
      return m.validate(this.pathHandle) || null != this.lostAndFoundLocalLink;
    }
    get open() {
      return null != this.pathHandle;
    }
    get isActive() {
      return h.getActiveContext() === this;
    }
    get parentExecutor() {
      return this.theParentExecutor;
    }
    activate() {
      b.value && n.debug(`activated ${this.toString(!0)} | isIgnored=${this.isIgnoredPath}`);
      const f = d.ContextManager.activeAsyncState;
      d.ContextManager.activateContext(null === f || void 0 === f ? void 0 : f.setValue(d.CurrentSPC, this));
    }
    deactivate() {
      var f;
      this.isActive ? d.ContextManager.activatePreviousContext(h.contextStack.top) : r.fail(`attempt to deactivate inactive SPC this=${this}, active=${null === (f = h.contextStack.top) || void 0 === f ? void 0 : f.getValue(d.CurrentSPC)}`);
      b.value && n.debug(`deactivated ${this.toString(!0)} | isIgnored=${this.isIgnoredPath}`);
    }
    get path() {
      var f;
      return null !== (f = this.pathHandle) && void 0 !== f ? f : t.Agent.correlation.cInvalidPath;
    }
    end() {
      let f = !1;
      null != this.pathHandle ? (b.value && n.debug(`ending ${this} => LAF=${(0,u.inspect)(this.lostAndFoundLocalLink)}`), f = this.isIgnoredPath ? !0 : this.pathHandle.endPath(), this.pathHandle = void 0) : r.fail(`${this} attempt to end path twice`);
      return f;
    }
    spawnAsyncExecutionSubPath(f, q = 0) {
      f = this.spawnSubPath(f, !1, q);
      this.cleanClosedParentExecutor();
      null == this.theParentExecutor && (this.theParentExecutor = f);
      f.theParentExecutor = this.theParentExecutor;
      return f;
    }
    spawnAsyncInitiatorSubPath(f) {
      f = this.spawnSubPath(f);
      f.theParentExecutor = this;
      f.didInitiateAsyncOp = !0;
      return f;
    }
    spawnSubPath(f, q = !1, w = 0) {
      const G = b.value;
      let y;
      if (null != this.pathHandle) {
        y = this.pathHandle.createLocalLink(q, f), G && n.debug(`${this} created ${q ? "" : "a"}synchronous locallink for new local path L[${(0,u.inspect)(y)}]`);
      } else {
        if (null == this.lostAndFoundLocalLink) {
          const D = `${this} has no lost-and-found-link, is didInitiateAsyncOp (${this.didInitiateAsyncOp}) set? sensorId: ${f}`;
          [r.fail, n.warning].forEach(J => J(D));
        } else {
          y = this.lostAndFoundLocalLink;
        }
      }
      null != y ? (f = new h({link:y, sensorId:f, traceId:this.traceId}), 1 === w ? f.parentLocalLink = y : 2 === w && (f.lostAndFoundLocalLink = y, f.didInitiateAsyncOp = !0)) : (f = new h({sensorId:f}), 2 === w && (f.didInitiateAsyncOp = !0));
      G && n.debug(`${this} spawned ${f} from L(${this})`);
      return f;
    }
    createActivation(f) {
      var q;
      const w = !this.open || (null === (q = this.currentActivation) || void 0 === q ? void 0 : q.isVirtual) || f.functionId.isVirtual;
      q = w ? this.spawnSubPath(f.sensorId) : this;
      if (q.valid) {
        return w && this.forwardParentExecutor(q), new p.MethodActivation({spc:q, endSpcOnExit:w, mode:f.mode, functionId:f.functionId, category:f.category, attachmentCreator:f.attachmentCreator, creator:f.creator});
      }
      b.value && n.debug(`${this.toString(!0)} ${this.valid ? `spawned(${q.toString()})` : "this"} subpath is not valid.`);
    }
    createCallbackActivation(f, q, w) {
      if (this.open) {
        if (this.valid) {
          return new p.MethodActivation({spc:this, functionId:f, creator:w, mode:1});
        }
        b.value && n.debug(`${this.toString(!0)} skip method creation on invalid path`);
      } else {
        if (null == this.parentLocalLink) {
          b.value && n.debug(`${this.toString(!0)}: parentLocalLink is undefined`), r.fail(`${this} no parentLocalLink present; have you requested one during start of path?`);
        } else {
          q = new h({link:this.parentLocalLink, sensorId:q, traceId:this.traceId});
          if (q.valid) {
            return this.forwardParentExecutor(q), new p.MethodActivation({spc:q, functionId:f, endSpcOnExit:!0, creator:w, mode:1});
          }
          b.value && n.debug(`${this.toString(!0)}: spawned(${q.toString()}) subpath is not valid.`);
        }
      }
    }
    createAddSerializeLink(f, q, w) {
      var G;
      return null === (G = this.pathHandle) || void 0 === G ? void 0 : G.createAddSerializeLink(f, this.sensorId, q, null !== w && void 0 !== w ? w : {});
    }
    createAddSerializeLinkToBlob(f) {
      var q;
      return null === (q = this.pathHandle) || void 0 === q ? void 0 : q.createAddSerializeLinkToBlob(f, this.sensorId);
    }
    onMethodEnter(f) {
      var q;
      if (b.value) {
        const w = this.activationStack.map(G => G.toString()).join(" < ");
        n.debug(`${this}.onMethodEnter: push '${f}' to [${w}]`);
      }
      null == this.theIsIgnoredPath && (this.theIsIgnoredPath = null === (q = this.pathHandle) || void 0 === q ? void 0 : q.isIgnored());
      f.parentActivation = this.theCurrentActivation;
      this.theCurrentActivation = f;
    }
    onMethodExit(f) {
      if (b.value) {
        const q = this.activationStack.map(w => w.toString()).join(" < ");
        n.debug(`${this}.onMethodExit: pop '${f}' from [${q}]`);
      }
      r.assertStrictEqual(this.theCurrentActivation, f);
      this.theDidInitiatAsyncOpFlag && null == f.parentActivation && this.addLostAndFoundLink();
      this.theCurrentActivation = f.parentActivation;
      f.parentActivation = void 0;
    }
    get spanId() {
      var f, q, w;
      return null !== (w = null !== (q = null === (f = this.currentActivation) || void 0 === f ? void 0 : f.spanId) && void 0 !== q ? q : this.lostAndFoundSpanId) && void 0 !== w ? w : a.cInvalidSpanId;
    }
    getSpan(f) {
      if (null != this.lostAndFoundSpan) {
        return this.lostAndFoundSpan;
      }
      if (null != this.theCurrentActivation) {
        return this.didInitiateAsyncOp = !0, this.theCurrentActivation.getOrCreateSpan(f);
      }
      if (null != this.lostAndFoundSpanId) {
        return this.lostAndFoundSpan = (0,c.createDtSpan)(f, this.lostAndFoundSpanId, this);
      }
      [r.fail, n.warning].forEach(q => q(`${this} has no lost-and-found-spanid, is didInitiateAsyncOp set?`));
    }
    addLostAndFoundLink() {
      null == this.lostAndFoundLocalLink && (null == this.pathHandle ? b.value && n.debug(`${this} can't create LAF as there is no pathHandle`) : (this.lostAndFoundLocalLink = this.pathHandle.createLocalLink(!1, t.Agent.correlation.SensorId.NODEJS_LOST_AND_FOUND), b.value && n.debug(`${this} created LAF=${(0,u.inspect)(this.lostAndFoundLocalLink)}`), null != this.theCurrentActivation && (this.lostAndFoundSpanId = this.theCurrentActivation.spanId, this.lostAndFoundSpan = this.theCurrentActivation.span)));
    }
    cleanClosedParentExecutor() {
      null == this.theParentExecutor || this.theParentExecutor.open || (this.theParentExecutor = void 0);
    }
    forwardParentExecutor(f) {
      this.cleanClosedParentExecutor();
      f.theParentExecutor = this.theParentExecutor;
    }
  }
  h.contextStack = new g();
  h.instanceCounter = 0;
  a.SubPathContext = h;
});
S("src/lib/util/InvocationUtil", ["require", "exports", "src/lib/SubPathContext", "src/lib/util/CoreUtil"], function(O, a, u, t) {
  function r(l) {
    return null != l && "function" === typeof l;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.isEventEmitter = a.isFunction = a.safeInvoke = a.SafeInvokeRetVal = a.doInvoke = void 0;
  class n {
    static dynatraceRegularInvoke(l, c, m) {
      return Reflect.apply(c, l, m);
    }
    static dynatraceOnServiceExecutionIndicator(l, c, m) {
      return Reflect.apply(c, l, m);
    }
  }
  a.doInvoke = n.dynatraceRegularInvoke;
  class p extends u.ContextStackListener {
    onFirstContextActivation() {
      a.doInvoke = n.dynatraceOnServiceExecutionIndicator;
    }
    onLastContextDeactivation() {
      a.doInvoke = n.dynatraceRegularInvoke;
    }
  }
  u.SubPathContext.addContextStackListener(new p());
  class k {
    static makeRetVal(l) {
      return new k(l, !1);
    }
    static makeException(l) {
      return new k(l, !0);
    }
    get retVal() {
      return this.didThrow ? void 0 : this.obj;
    }
    get retValOrException() {
      return this.didThrow ? this.exception : this.obj;
    }
    setVal(l) {
      this.obj = l;
    }
    get exception() {
      return this.didThrow ? this.obj : void 0;
    }
    rethrow() {
      if (this.didThrow) {
        throw this.obj;
      }
      return this.obj;
    }
    constructor(l, c) {
      this.obj = l;
      this.didThrow = c;
    }
  }
  a.SafeInvokeRetVal = k;
  a.safeInvoke = function(l, c, m) {
    try {
      return k.makeRetVal((0,a.doInvoke)(l, c, m));
    } catch (d) {
      return k.makeException(d);
    }
  };
  a.isFunction = r;
  a.isEventEmitter = function(l) {
    return (0,t.hasSingleProperty)(l, "on") && r(l.on);
  };
});
S("src/lib/FileLogger", ["require", "exports", "path", "fs", "src/lib/util/RuntimeUtil"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.FileLogger = void 0;
  const n = (0,r.isWindows)() ? "C:/ProgramData/dynatrace/oneagent/log" : "/var/log/dynatrace/oneagent", p = ["log", "oneagent"];
  class k {
    constructor() {
      this.appendFileCallback = () => {
        0 < this.queue.length && this.doWrite();
      };
      this.queue = [];
    }
    init(l, c) {
      let m = !0;
      try {
        const d = u.join(l, "nodejs");
        try {
          t.mkdirSync(d);
        } catch (e) {
        }
        this.logFileName = u.join(d, `${"oneagent"}_${c}_managed_${process.pid}.log`);
        try {
          t.unlinkSync(this.logFileName);
        } catch (e) {
        }
      } catch (d) {
        this.logFileName = void 0, m = !1;
      }
      return m;
    }
    static findLogFolder(l, c) {
      for (;;) {
        for (const m of p) {
          const d = u.join(l, m);
          try {
            return t.statSync(d), d;
          } catch (e) {
          }
        }
        --c;
        l = u.dirname(l);
        if ("" === l || 0 >= c) {
          break;
        }
      }
    }
    static get defaultLogDir() {
      try {
        return t.statSync(n), n;
      } catch (l) {
      }
    }
    get fileName() {
      return this.logFileName;
    }
    get initialized() {
      return void 0 !== this.logFileName;
    }
    write(l) {
      this.logFileName && (this.queue.push(l), 1 === this.queue.length && this.doWrite());
    }
    doWrite() {
      null != this.logFileName && t.appendFile(this.logFileName, this.queue.shift(), this.appendFileCallback);
    }
  }
  a.FileLogger = k;
});
S("src/lib/Logger", "require exports util src/lib/Agent src/lib/util/CoreUtil src/lib/util/InvocationUtil src/lib/FileLogger src/lib/Configuration".split(" "), function(O, a, u, t, r, n, p, k) {
  function l(w) {
    return w >= a.control.logLevel;
  }
  function c(w, ...G) {
    return f.doWrite(w, G);
  }
  function m() {
    return f.condWrite(b.INFO, arguments);
  }
  function d() {
    return f.condWrite(b.SEVERE, arguments);
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.control = a.debug = a.severe = a.warning = a.info = a.write = a.isLoggable = a.LogControl = a.Level = a.Mode = void 0;
  var e;
  (function(w) {
    w[w.BUFFERED = 0] = "BUFFERED";
    w[w.NATIVE = 1] = "NATIVE";
    w[w.MANAGED = 2] = "MANAGED";
  })(e = a.Mode || (a.Mode = {}));
  var b;
  (function(w) {
    w[w.INFO = 4] = "INFO";
    w[w.WARNING = 5] = "WARNING";
    w[w.SEVERE = 6] = "SEVERE";
    w[w.DEBUG = 7] = "DEBUG";
    w[w.NONE = 8] = "NONE";
  })(b = a.Level || (a.Level = {}));
  class g {
    constructor(w, G) {
      this.logLevel = w;
      this.msg = G;
      this.timeStamp = Date.now();
    }
  }
  class h {
    constructor() {
      this.logFn = this.writeBufferedLog;
      this.bufferedLogEntries = [];
      this.discardedLogEntryCount = 0;
    }
    get mode() {
      let w;
      switch(this.logFn) {
        case this.writeManagedLog:
          w = e.MANAGED;
          break;
        case this.writeNativeLog:
          w = e.NATIVE;
          break;
        case this.writeBufferedLog:
          w = e.BUFFERED;
          break;
        default:
          w = e.BUFFERED, d("could not determine logger mode");
      }
      return w;
    }
    set mode(w) {
      switch(w) {
        case e.NATIVE:
          w === e.NATIVE && t.Agent.nativeAgent && (this.logFn = this.writeNativeLog, this.updateLogLevelsFromNative(), this.flushLogBuffer());
          break;
        case e.MANAGED:
          this.logFn = this.writeManagedLog;
          this.flushLogBuffer();
          break;
        case e.BUFFERED:
          this.logFn = this.writeBufferedLog;
          break;
        default:
          d(`unknown logger mode: ${w}`);
      }
      c(b.INFO, "switched log mode to %s", e[this.mode]);
    }
    updateLogLevelsFromNative() {
      if (t.Agent.nativeAgent) {
        const w = t.Agent.nativeAgent.consoleLogLevel, G = t.Agent.nativeAgent.fileLogLevel;
        if (a.control.consoleLogLevel !== w || a.control.fileLogLevel !== G) {
          a.control.consoleLogLevel = w, a.control.fileLogLevel = G, m(`update log levels from native consoleLogLevel=${b[a.control.consoleLogLevel]},` + ` fileLogLevel=${b[a.control.fileLogLevel]}`);
        }
      }
    }
    assembleLogHeader(w) {
      const G = new Date();
      return u.format("%d-%s-%s %s:%s:%s.%s UTC [%s] %s [node] ", G.getUTCFullYear(), (0,r.pad)(G.getUTCMonth() + 1), (0,r.pad)(G.getUTCDate()), (0,r.pad)(G.getUTCHours()), (0,r.pad)(G.getUTCMinutes()), (0,r.pad)(G.getUTCSeconds()), (G.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5), (0,r.pad)(process.pid, 8), (0,r.pad)(b[w], 8, " "));
    }
    writeManagedLog(w, G) {
      l(w) && (G = this.assembleLogHeader(w) + G, w >= a.control.consoleLogLevel && console.log(G), w >= a.control.fileLogLevel && (this.fileLogger || (this.fileLogger = new p.FileLogger(), (w = a.control.getRootLogDir ? a.control.getRootLogDir : process.env.DT_LOGDIR ? process.env.DT_LOGDIR : p.FileLogger.defaultLogDir ? p.FileLogger.defaultLogDir : p.FileLogger.findLogFolder(k.Configuration.rootFolder, 6)) && this.fileLogger.init(w, k.Configuration.appName || k.Configuration.scriptName)), this.fileLogger && 
      this.fileLogger.write(G + "\n")));
    }
    writeBufferedLog(w, G) {
      if (0 === this.bufferedLogEntries.length) {
        this.discardedLogEntryCount = 0;
      } else if (this.bufferedLogEntries.length >= a.control.bufferedLogEntryCountMax) {
        do {
          this.bufferedLogEntries.shift(), ++this.discardedLogEntryCount;
        } while (this.bufferedLogEntries.length >= a.control.bufferedLogEntryCountMax);
        this.bufferedLogEntries[0].msg = `[${this.discardedLogEntryCount} discarded prior log entries]` + ` ${this.bufferedLogEntries[0].msg}`;
      }
      this.bufferedLogEntries.push(new g(w, G));
    }
    flushLogBuffer() {
      this.bufferedLogEntries.forEach(w => {
        const G = `[buffered ${Date.now() - w.timeStamp}ms ago] ${w.msg}`;
        this.logFn(w.logLevel, G);
      });
      this.bufferedLogEntries.length = 0;
    }
    writeNativeLog(w, G) {
      t.Agent.nativeAgent && t.Agent.nativeAgent.log(w, G);
    }
    condWrite(w, G) {
      return l(w) && this.doWrite(w, G);
    }
    doWrite(w, G) {
      G = (0,n.doInvoke)(null, u.format, G);
      this.logFn(w, G);
      return !0;
    }
  }
  const f = new h();
  class q {
    constructor() {
      this.bufferedLogEntryCountMax = 100;
      this.currLogLevel = b.INFO;
      this.currConLogLevel = b.NONE;
      this.currFileLogLevel = b.INFO;
    }
    get mode() {
      return f.mode;
    }
    set mode(w) {
      f.mode = w;
    }
    get logLevel() {
      return this.currLogLevel;
    }
    get consoleLogLevel() {
      return this.currConLogLevel;
    }
    set consoleLogLevel(w) {
      this.currConLogLevel = w;
      this.updateLogLevel();
    }
    get fileLogLevel() {
      return this.currFileLogLevel;
    }
    set fileLogLevel(w) {
      this.currFileLogLevel = w;
      this.updateLogLevel();
    }
    updateLoggingOptions(w) {
      w.logdir && (this.rootLogDir = w.logdir.toString());
      if (w.loglevelcon) {
        const G = b[w.loglevelcon.toUpperCase()];
        G ? this.currConLogLevel = G : m(`invalid option loglevelcon=${w.loglevelcon}`);
      }
    }
    get getRootLogDir() {
      return this.rootLogDir;
    }
    updateLogLevel() {
      this.currLogLevel = Math.min(this.currConLogLevel, this.currFileLogLevel);
    }
  }
  a.LogControl = q;
  a.isLoggable = l;
  a.write = c;
  a.info = m;
  a.warning = function() {
    return f.condWrite(b.WARNING, arguments);
  };
  a.severe = d;
  a.debug = function() {
    return f.condWrite(b.DEBUG, arguments);
  };
  a.control = new q();
});
S("src/lib/Configuration", ["require", "exports", "path", "src/lib/Logger", "src/lib/util/CoreUtil"], function(O, a, u, t, r) {
  function n(k, l) {
    return Object.assign(Object.create(null), k, l);
  }
  function p(k) {
    k = k.trim();
    if (k.startsWith("{")) {
      var l = JSON.parse(r.stripByteOrderMark(k));
    } else {
      l = {};
      k = k.split(",");
      for (let e of k) {
        if (e = e.trim(), 0 < e.length) {
          var c = e.split("=");
          if (2 !== c.length) {
            throw Error(`invalid agent option format "${e}"`);
          }
          k = c[0].trim();
          c = c[1].trim();
          var m = +c;
          if (Number.isNaN(m)) {
            var d = c.toLowerCase();
            m = "true" === d;
            d = "false" === d;
            m = m || d ? m : c;
          }
          l[k] = m;
        }
      }
    }
    return l;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.Configuration = a.parseAgentOptionString = void 0;
  a.parseAgentOptionString = p;
  a.Configuration = {maxSqlStringLen:4096, rootFolder:(module.__DT_NODE_OBFUSCATED_AGENT__ ? __dirname : u.dirname(__dirname)) + u.sep, appName:void 0, scriptName:1 < process.argv.length ? u.basename(process.argv[1]) : "", processOptions:function(k) {
    let l;
    try {
      process.env.DT_NODE_OPTIONS_FILE && (t.info(`Acquiring alternative agent options from ${process.env.DT_NODE_OPTIONS_FILE}`), l = O(process.env.DT_NODE_OPTIONS_FILE));
      if (process.env.DT_NODE_OPTIONS) {
        const c = p(process.env.DT_NODE_OPTIONS);
        l = n(l, c);
      }
      if (process.env.DT_NODE_PRELOAD_OPTIONS) {
        const c = p(process.env.DT_NODE_PRELOAD_OPTIONS);
        l = n(l, c);
      }
    } catch (c) {
      t.info(`reading alternative options failed with ${c}`);
    }
    return n(k, l);
  }};
});
S("src/lib/sensors/PredefinedInstrumentationRules", ["require", "exports", "src/lib/Patch"], function(O, a, u) {
  function t() {
    if (null == r) {
      const n = {"Node.Core.Process":{type:"ContextPassing", associatedModules:{"implicit:process":{asyncTrackingMode:u.AsyncTrackingMode.CallbackFirst, instrumentationStrategy:1, rules:[{functionNames:["nextTick"]}, {functionNames:["_nextDomainTick"], ignoreMissing:!0}]}}}, "Node.Core.DNS":{type:"ContextPassing", associatedModules:{dns:{asyncTrackingMode:u.AsyncTrackingMode.CallbackLast, rules:[{subComponentName:"Resolver", patchPrototype:!0, rules:[{functionNames:"resolve resolve4 resolve6 resolveMx resolveTxt resolveSrv resolveNs resolveCname resolveNaptr reverse resolveSoa resolvePtr resolveAny".split(" ")}]}, 
      {functionNames:"lookup resolve resolve4 resolve6 resolveMx resolveTxt resolveSrv resolveNs resolveCname resolveNaptr reverse lookupService resolveSoa resolvePtr".split(" ")}, {functionNames:["resolveAny"]}]}}}, "Node.Core.Timers":{type:"TimerSensor", associatedModules:{timers:{instrumentationStrategy:1}}}, "Node.Core.Events":{type:"EventEmitterContextPassing", associatedModules:{events:{instrumentationStrategy:1}}}, "Node.Core.Promise":{type:"Promise", associatedModules:{"implicit:Promise":{ruleKey:"Promise.implicit", 
      instrumentationStrategy:1}, bluebird:{ruleKey:"Promise.bluebird", instrumentationStrategy:0}, "promise-polyfill":{ruleKey:"Promise.polyfill", instrumentationStrategy:0}, q:{ruleKey:"Promise.q", instrumentationStrategy:0}, "es6-promise":{ruleKey:"Promise.es6", instrumentationStrategy:0}, mpromise:{ruleKey:"Promise.m", instrumentationStrategy:0}}}, "Node.ModuleSubstitutions":{type:"ModuleSubstitution", associatedModules:{"graceful-fs":{moduleVersionCriteria:"<4.0.0"}}}, "Node.DisabledModules":{type:"DisabledModules", 
      associatedModules:{newrelic:{moduleAllowPrereleaseCriteria:!0}, appdynamics:{moduleAllowPrereleaseCriteria:!0}, longjohn:{moduleAllowPrereleaseCriteria:!0}}}, "Node.WebRequest":{type:"WebRequest", associatedModules:{http:{instrumentationStrategy:1}, https:{instrumentationStrategy:1}, http2:{instrumentationStrategy:0}, "node:http2":{instrumentationStrategy:0}}}, BizEventsHttpIncoming:{type:"BizEvents", associatedModules:{"implicit:global":{instrumentationStrategy:1}}}, "Node.ClientWebRequest":{type:"ClientWebRequest", 
      associatedModules:{http:{instrumentationStrategy:1}, https:{instrumentationStrategy:1}, http2:{instrumentationStrategy:0}, "node:http2":{instrumentationStrategy:0}, "implicit:global":{ruleKey:"Fetch.global", instrumentationStrategy:1, nodeVersionCriteria:">=18"}}}, "Node.MongoDb":{type:"MongoDb", associatedModules:{mongodb:{asyncTrackingMode:u.AsyncTrackingMode.CallbackLastOrPromise, instrumentationStrategy:0, ruleKey:"Module.main", rules:[{subComponentName:"Collection", patchPrototype:!0, 
      ignoreMissing:!1, apiRealm:"mongodb", rules:[{moduleVersionCriteria:">=1.4.0 <4.0.0", functionNames:"insert remove rename save update distinct count drop findAndModify findAndRemove findOne createIndex ensureIndex listIndexes indexInformation dropIndex dropAllIndexes reIndex mapReduce group options isCapped indexExists indexes stats".split(" ")}, {moduleVersionCriteria:">=2.0.0", functionNames:"bulkWrite createIndexes deleteMany deleteOne dropIndexes findOneAndDelete findOneAndReplace findOneAndUpdate insertMany insertOne replaceOne updateMany updateOne".split(" ")}, 
      {moduleVersionCriteria:">=4.0.0", functionNames:"insert remove rename update distinct count drop findOne createIndex listIndexes indexInformation dropIndex mapReduce options isCapped indexExists indexes stats".split(" ")}]}, {subComponentName:"Db", patchPrototype:!0, ignoreMissing:!1, apiRealm:"mongodb", rules:[{moduleVersionCriteria:">=2.0.0 <3.0.0", functionNames:"db authenticate collectionNames dereference logout cursorInfo dropIndex reIndex".split(" ")}, {moduleVersionCriteria:">=2.0.0 <4.0.0", 
      functionNames:"addUser admin collections eval removeUser createCollection command dropCollection renameCollection createIndex ensureIndex executeDbAdminCommand indexInformation dropDatabase stats".split(" ")}, {moduleVersionCriteria:">=4.0.0", functionNames:"removeUser createCollection command dropCollection renameCollection createIndex indexInformation dropDatabase stats".split(" ")}]}]}, "pattern:mongodb/lib/cursor/abstract_cursor(?:\\.js)?$":{ruleKey:"MongoDb.abstract_cursor"}, "pattern:mongodb/lib/aggregation_cursor(?:\\.js)?$":{ruleKey:"MongoDb.aggregation_cursor"}, 
      "pattern:mongodb/lib/mongodb/aggregation_cursor(?:\\.js)?$":{ruleKey:"MongoDb.aggregation_cursor"}, "pattern:mongodb/lib/cursor/aggregation_cursor(?:\\.js)?$":{ruleKey:"MongoDb.aggregation_cursor"}, "pattern:mongodb/lib/command_cursor(?:\\.js)?$":{ruleKey:"MongoDb.command_cursor"}}}, "Node.MongoDb.ContextPassing":{type:"ContextPassing", associatedModules:{mongodb:{asyncTrackingMode:u.AsyncTrackingMode.CallbackLastOrPromise, instrumentationStrategy:0, ruleKey:"Module.main", rules:[{subComponentName:"Db", 
      patchPrototype:!0, ignoreMissing:!1, rules:[{moduleVersionCriteria:"<3.0.0", functionNames:["open", "close"]}]}, {subComponentName:"MongoClient", patchPrototype:!0, ignoreMissing:!0, rules:[{functionNames:["connect", "close", "logout", "isConnected"]}]}]}}}, "Node.Redis":{type:"Redis", associatedModules:{redis:{ruleKey:"Module.main", instrumentationStrategy:0, moduleVersionCriteria:"<=3"}, "pattern:@node-redis/client/dist/lib/commander(?:\\.js)?$":{ruleKey:"NodeRedis.client.commander_impl", 
      moduleVersionCriteria:">=1.0.1"}, "pattern:@redis/client/dist/lib/commander(?:\\.js)?$":{ruleKey:"Redis.client.commander_impl", moduleVersionCriteria:">=1.0.5"}}}, "Node.Memcached":{type:"Memcached", associatedModules:{memcached:{instrumentationStrategy:0}}}, "Node.Express":{type:"Express", associatedModules:{"pattern:express/lib/router/layer(?:\\.js)?$":{ruleKey:"Express.layer", moduleVersionCriteria:">=4.6.0 <5.0.0"}, express:{ruleKey:"Express.express", moduleVersionCriteria:">=4.6.0 <5.0.0"}, 
      "pattern:router/lib/layer(?:\\.js)?$":{ruleKey:"Router.layer", moduleVersionCriteria:">=1.0.0"}, router:{ruleKey:"Router.index", moduleVersionCriteria:">=1.0.0"}}}, "Node.Hapi":{type:"Hapi", associatedModules:{"pattern:@hapi/hapi/lib/handler(?:\\.js)?$":{ruleKey:"Hapi.handler", moduleVersionCriteria:">=17.9.0"}}}, "Node.FinalHandler":{type:"FinalHandler", associatedModules:{finalhandler:{instrumentationStrategy:0}}}, "Node.Restify":{type:"Restify", associatedModules:{"pattern:restify/lib/response(?:\\.js)?$":{ruleKey:"Restify.response"}, 
      "pattern:restify/lib/server(?:\\.js)?$":{ruleKey:"Restify.server", moduleVersionCriteria:">=4.3"}}}, "Node.SQLite3":{type:"ContextPassing", associatedModules:{sqlite3:{asyncTrackingMode:u.AsyncTrackingMode.CallbackLast, instrumentationStrategy:0, moduleVersionCriteria:"<5.0.0 || >=5.1.0", ruleKey:"Module.main", rules:[{subComponentName:"Database", patchPrototype:!0, ignoreMissing:!1, rules:[{functionNames:"close exec wait loadExtension serialize parallelize configure".split(" ")}]}, {subComponentName:"Statement", 
      patchPrototype:!0, ignoreMissing:!1, rules:[{functionNames:"bind get run all each reset finalize".split(" ")}]}]}}}, "Node.MySql":{type:"MySql", associatedModules:{"pattern:mysql/lib/Pool(?:\\.js)?$":{ruleKey:"MySql.Pool"}, "pattern:mysql/lib/Connection(?:\\.js)?$":{ruleKey:"MySql.Connection"}, "pattern:mysql/lib/protocol/sequences/Query(?:\\.js)?$":{ruleKey:"MySql.Query"}}}, "Node.MySql2":{type:"MySql2", associatedModules:{"pattern:mysql2/lib/pool(?:\\.js)?$":{ruleKey:"MySql2.pool"}, "pattern:mysql2/lib/connection(?:\\.js)?$":{ruleKey:"MySql2.connection"}, 
      "pattern:mysql2/lib/commands/query(?:\\.js)?$":{ruleKey:"MySql2.query"}}}, "Node.Postgres":{type:"Postgres", associatedModules:{pg:{asyncTrackingMode:u.AsyncTrackingMode.CallbackLastOrPromise, instrumentationStrategy:0, ruleKey:"Module.main", rules:[{subComponentName:"Client", patchPrototype:!0, ignoreMissing:!1}]}, "pattern:pg/lib/client(?:\\.js)?$":{ruleKey:"Postgres.client"}, "pattern:pg/lib/query(?:\\.js)?$":{ruleKey:"Postgres.query"}}}, "Node.CouchbaseDb":{type:"CouchbaseDb", associatedModules:{couchbase:{ruleKey:"Module.main", 
      asyncTrackingMode:u.AsyncTrackingMode.CallbackLast, instrumentationStrategy:0, moduleVersionCriteria:">=2.6.0 <5.0.0"}, "pattern:couchbase/lib/bucket(?:\\.js)?$":{moduleVersionCriteria:">=2.6.0 <3.0.0", ruleKey:"CouchbaseDb.bucket"}, "pattern:couchbase/lib/connstr(?:\\.js)?$":{moduleVersionCriteria:">=2.6.0 <3.0.0", ruleKey:"CouchbaseDb.connstr"}, "pattern:couchbase/(?:lib|dist)/collection(?:\\.js)?$":{moduleVersionCriteria:">=3.0.0 <5.0.0", ruleKey:"CouchbaseDb.collection"}, "pattern:couchbase/(?:lib|dist)/connection(?:\\.js)?$":{moduleVersionCriteria:">=3.0.0 <4.0.0", 
      ruleKey:"CouchbaseDb.connection"}, "pattern:couchbase/(?:lib|dist)/cluster(?:\\.js)?$":{moduleVersionCriteria:">=3.0.0 <5.0.0", ruleKey:"CouchbaseDb.cluster"}}}, "Node.AwsSdk":{type:"AwsSdk", associatedModules:{"pattern:aws-sdk/lib/core(?:\\.js)?$":{ruleKey:"AwsSdk.coreV2"}, "pattern:@aws-sdk/smithy-client/dist-cjs/index(?:\\.js)?$":{ruleKey:"AwsSdk.smithy", moduleVersionCriteria:">=3.0.0"}, "pattern:@aws-sdk/client-lambda/dist-cjs/index(?:\\.js)?$":{ruleKey:"AwsSdk.client", moduleVersionCriteria:">=3.0.0"}}}, 
      "Node.RabbitMq":{type:"RabbitMq", associatedModules:{amqplib:{ruleKey:"Module.main", instrumentationStrategy:0}, "amqplib/callback_api":{ruleKey:"RabbitMq.callback_api", instrumentationStrategy:0}, "pattern:amqplib/lib/channel(?:\\.js)?$":{ruleKey:"RabbitMq.channel"}, "pattern:amqplib/lib/channel_model(?:\\.js)?$":{ruleKey:"RabbitMq.model"}, "pattern:amqplib/lib/callback_model(?:\\.js)?$":{ruleKey:"RabbitMq.model"}}}, "Node.gRPC":{type:"gRPC", associatedModules:{grpc:{ruleKey:"Module.main", 
      patchPrototype:!0, instrumentationStrategy:0}, "pattern:grpc/src/client(?:\\.js)?$":{ruleKey:"gRPC.client"}}}, "Node.GrpcJs":{type:"GrpcJs", associatedModules:{"@grpc/grpc-js":{ruleKey:"Module.main", patchPrototype:!0, moduleVersionCriteria:">=1.0.0", instrumentationStrategy:0}, "pattern:@grpc/grpc-js/build/src/make-client(?:\\.js)?$":{ruleKey:"GrpcJs.make-client", moduleVersionCriteria:">=1.0.0"}}}, "Node.OracleDb":{type:"OracleDb", associatedModules:{oracledb:{ruleKey:"Module.main", instrumentationStrategy:0, 
      moduleVersionCriteria:">=5.0.0"}}}, "Node.GraphQL":{type:"GraphQL", associatedModules:{graphql:{ruleKey:"Module.main", instrumentationStrategy:0, moduleVersionCriteria:">=15"}, "pattern:graphql/execution/execute(?:\\.js)?$":{ruleKey:"GraphQL.Execute", moduleVersionCriteria:">=15"}, "pattern:graphql/language/parser(?:\\.js)?$":{ruleKey:"GraphQL.Parser", moduleVersionCriteria:">=15"}, "pattern:graphql/validation/validate(?:\\.js)?$":{ruleKey:"GraphQL.Validation", moduleVersionCriteria:">=15"}}}, 
      "sdk.outgoing.remotecall":{type:"SdkOutgoingRemoteCall", associatedModules:{}}, "sdk.incoming.remotecall":{type:"SdkIncomingRemoteCall", associatedModules:{}}, "sdk.outgoing.messaging":{type:"SdkOutgoingMessaging", associatedModules:{}}, "sdk.incoming.messaging":{type:"SdkIncomingMessaging", associatedModules:{}}, "sdk.database":{type:"SdkDatabase", associatedModules:{}}, "sdk.scav":{type:"SdkScav", associatedModules:{}}, "Node.IORedis":{type:"IORedis", associatedModules:{ioredis:{ruleKey:"Module.main", 
      asyncTrackingMode:u.AsyncTrackingMode.CallbackLastOrPromise, instrumentationStrategy:0}, "pattern:ioredis/built/[Cc]ommand(?:\\.js)?$":{ruleKey:"IORedis.command"}, "pattern:ioredis/built/[Pp]ipeline(?:\\.js)?$":{ruleKey:"IORedis.pipeline"}, "pattern:ioredis/built/transaction(?:\\.js)?$":{ruleKey:"IORedis.transaction"}, "pattern:ioredis/built/ScanStream(?:\\.js)?$":{ruleKey:"IORedis.ScanStream"}}}, "Node.MSSql":{type:"MSSql", associatedModules:{mssql:{ruleKey:"Module.main", asyncTrackingMode:u.AsyncTrackingMode.CallbackLastOrPromise, 
      instrumentationStrategy:0}, "pattern:mssql/lib/base(?:\\.js)?$":{ruleKey:"MSSql.base"}, "pattern:mssql/lib/base/request(?:\\.js)?$":{ruleKey:"MSSql.request"}, "pattern:mssql/lib/base/connection-pool(?:\\.js)?$":{ruleKey:"MSSql.connection-pool"}}}, "Node.Tedious":{type:"Tedious", associatedModules:{tedious:{ruleKey:"Module.main", asyncTrackingMode:u.AsyncTrackingMode.CallbackLast, instrumentationStrategy:0}, "pattern:tedious/lib/connection(?:\\.js)?$":{ruleKey:"Tedious.connection"}}}, "Node.KafkaJsProducer":{type:"KafkaJsProducer", 
      associatedModules:{kafkajs:{ruleKey:"Module.main", asyncTrackingMode:u.AsyncTrackingMode.None, instrumentationStrategy:0}, "pattern:kafkajs/src/producer/messageProducer(?:\\.js)?$":{ruleKey:"KafkaJsProducer.messageProducer"}}}, "Node.KafkaJsConsumerAuto":{type:"KafkaJsConsumerAuto", associatedModules:{kafkajs:{ruleKey:"Module.main"}}}, "Node.CustomService.KafkaJsConsumer":{type:"KafkaJsConsumer", associatedModules:{}}, "Node.OpenTelemetry":{type:"OpenTelemetry", associatedModules:{"@opentelemetry/api":{ruleKey:"Module.main", 
      instrumentationStrategy:0, moduleVersionCriteria:"^1.0.0"}, "@opentelemetry/sdk-trace-base":{ruleKey:"OpenTelemetry.SDK", moduleVersionCriteria:"^1.0.0"}, "@opentelemetry/context-async-hooks":{ruleKey:"OpenTelemetry.ContextAsyncHooks", moduleVersionCriteria:"^1.0.0"}, "pattern:@opentelemetry/api/build/src/trace/NonRecordingSpan(?:\\.js)?$":{ruleKey:"OpenTelemetry.NonRecordingSpan", moduleVersionCriteria:"^1.0.0"}, "pattern:@opentelemetry/api/build/src/api/context(?:\\.js)?$":{ruleKey:"OpenTelemetry.ContextAPI", 
      moduleVersionCriteria:"^1.0.0"}, "pattern:@opentelemetry/api/build/src/api/propagation(?:\\.js)?$":{ruleKey:"OpenTelemetry.PropagationAPI", moduleVersionCriteria:"^1.0.0"}, "pattern:@opentelemetry/api/build/src/api/trace(?:\\.js)?$":{ruleKey:"OpenTelemetry.TraceAPI", moduleVersionCriteria:"^1.0.0"}, "pattern:@opentelemetry/api/build/src/context/NoopContextManager(?:\\.js)?$":{ruleKey:"OpenTelemetry.NoopContextManager", moduleVersionCriteria:"^1.0.0"}, "pattern:@opentelemetry/api/build/src/trace/NoopTracer(?:\\.js)?$":{ruleKey:"OpenTelemetry.NoopTracer", 
      moduleVersionCriteria:"^1.0.0"}}}, "Node.LogEnrichment":{type:"LogEnrichment", associatedModules:{"pattern:winston/lib/winston/logger(?:\\.js)?$":{ruleKey:"LogEnrichment.Winston.Logger", moduleVersionCriteria:"^3.0.0"}, "pattern:pino/pino(?:\\.js)?$":{ruleKey:"LogEnrichment.Pino.Logger", moduleVersionCriteria:">=5.14.0"}}}, "Node.WorkerThreads":{type:"WorkerThreads", associatedModules:{worker_threads:{nodeVersionCriteria:">=12", instrumentationStrategy:0}, "node:worker_threads":{nodeVersionCriteria:">=12", 
      instrumentationStrategy:0}}}, "Node.Snappy":{type:"ContextPassing", associatedModules:{snappy:{asyncTrackingMode:u.AsyncTrackingMode.CallbackLast, instrumentationStrategy:0, moduleVersionCriteria:"^6.0.0", rules:[{functionNames:["compress", "uncompress", "isValidCompressed"]}]}}}};
      r = Object.assign(Object.create(null), n);
    }
    return r;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.getPredefinedInstrumentationRule = a.getPredefinedInstrumentationRules = void 0;
  let r;
  a.getPredefinedInstrumentationRules = t;
  a.getPredefinedInstrumentationRule = function(n) {
    return t()[n];
  };
});
S("src/lib/sensors/InstrumentationRule", ["require", "exports"], function(O, a) {
  Object.defineProperty(a, "__esModule", {value:!0});
});
S("src/lib/sensors/SensorBase", "require exports src/lib/Agent src/lib/Debug src/lib/DebugLoggingEntity src/lib/Logger src/lib/ModuleRegistry src/lib/PackageRegistry src/lib/Patch src/lib/RunTimeProperty src/lib/sensors/SensorConfig src/lib/util/CoreUtil src/lib/util/SemverUtil".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.SensorBase = void 0;
  class b extends r.DebugLoggingEntity {
    constructor(g, h) {
      super(b.makeSensorDebugFlagName(g));
      this.sensorConfigKey = g;
      this.sensorConfig = h;
      this.addToDebugLogDomain("Sensors");
      this.addToDebugLogDomain("Transformers");
      this.disableFlag = new c.BooleanProperty(`${b.makeSensorDebugFlagName(g)}Disabled`, !1);
    }
    get name() {
      return this.sensorConfigKey;
    }
    get enabled() {
      return this.sensorConfig.enabled && !this.disableFlag.value;
    }
    get entrypoint() {
      return this.sensorConfig.entrypoint;
    }
    get capture() {
      return this.sensorConfig.capture;
    }
    get active() {
      return this.capture && u.Agent.active && !u.Agent.isCim;
    }
    updateState(g) {
      this.sensorConfig.capture = g.capture;
      this.sensorConfig.entrypoint = g.entrypoint;
    }
    applyInstrumentation() {
    }
    determinePackageMetaInfo() {
    }
    toString() {
      return this.name;
    }
    applyPatch(g, h, f) {
      var q, w, G;
      this.doApplyPatch(f, g.moduleExports, g.request, g, h, null !== (q = f.ignoreMissing) && void 0 !== q ? q : !1, null !== (w = f.patchPrototype) && void 0 !== w ? w : !1, null !== (G = f.asyncTrackingMode) && void 0 !== G ? G : l.AsyncTrackingMode.CallbackLast, f.apiRealm, f.propertiesToCopy);
    }
    doApplyPatch(g, h, f, q, w, G, y, D, J, B) {
      var v, z, x, A, C;
      if (null != g.rules && b.validateCriterias(g, q)) {
        for (const H of g.rules) {
          if (b.validateCriterias(H, q)) {
            var E = null !== (v = H.asyncTrackingMode) && void 0 !== v ? v : D;
            const F = null !== (z = H.patchPrototype) && void 0 !== z ? z : y;
            var I = null !== (x = H.ignoreMissing) && void 0 !== x ? x : G;
            const K = null !== (A = g.apiRealm) && void 0 !== A ? A : J, L = null !== (C = g.propertiesToCopy) && void 0 !== C ? C : B;
            if (null != H.subComponentName) {
              this.isDebugEnabled && n.debug(`doApplyPatch patching sub-component ${f}.${H.subComponentName}: ${F}`);
              const M = h[H.subComponentName];
              null != M ? this.doApplyPatch(H, M, `${f}.${H.subComponentName}`, q, w, I, F, E, K, L) : I || n.warning(`${this.sensorConfigKey}: sub-component ${f}.${H.subComponentName} not found`);
            } else {
              this.isDebugEnabled && n.debug(`patching ${f}: ${H.functionNames}`), I = {ignoreMissing:I, ignoreAlreadyPatched:!1, polymorphicSubstitution:l.SubstitutionType.WarnOnOverride, propertiesToCopy:L}, E = new l.ModuleSpec(f, F ? h.prototype : h, E, K), l.applyToAllFunctions(E, w, H.functionNames, I);
            }
          }
        }
      }
    }
    static validateCriterias(g, h) {
      var f;
      let q = null == g.nodeVersionCriteria || e.satisfies(process.version, g.nodeVersionCriteria, {includePrerelease:!0});
      if (q) {
        const w = null !== (f = g.moduleAllowPrereleaseCriteria) && void 0 !== f ? f : !1;
        f = p.ModuleRegistry.lookup(h);
        (q = h.isNodeCoreModule || e.satisfies(f.version, ">=0.0.0", {includePrerelease:w})) && null != g.moduleVersionCriteria && (q = f.version !== k.cInvalidVersionString && e.satisfies(f.version, g.moduleVersionCriteria, {includePrerelease:w}));
      }
      q && null != g.platformCriteria && (q = null != d.match(g.platformCriteria, process.platform));
      q && null != g.runTimePropertyCriteria && (q = (new c.BooleanProperty(g.runTimePropertyCriteria, !1)).value);
      return q;
    }
    static makeSensorDebugFlagName(g) {
      if (g.startsWith(m.cCustomServiceKeyPrefix)) {
        var h = g.substring(m.cCustomServiceKeyPrefix.length);
      } else {
        g.startsWith(m.cConfigKeyPrefix) ? h = g.substring(m.cConfigKeyPrefix.length) : g.startsWith(m.cSdkConfigKeyPrefix) ? h = `Sdk${g.substring(m.cSdkConfigKeyPrefix.length)}` : (g.startsWith("BizEvents") || (h = `makeSensorDebugFlagName: Unexpected sensor key: ${g}`, n.warning(h), t.fail(h)), h = g);
      }
      h = h.replace(/\./g, "");
      g.endsWith("Sensor") || (h += "Sensor");
      return h;
    }
  }
  a.SensorBase = b;
});
S("src/lib/AsyncTracker", ["require", "exports", "src/lib/Patch"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AsyncTracker = void 0;
  class t {
    constructor(r, n) {
      this.transformer = r;
      this.descriptor = n;
      this.injectedCallback = !1;
    }
    get hasCallback() {
      return null != this.origCb;
    }
    manipulateArguments(r) {
      const n = u.AsyncTrackingMode.getCallbackIndex(this.descriptor.asyncTrackingMode, r);
      if (0 > n) {
        return r;
      }
      n < r.length && "function" === typeof r[n] ? this.origCb = r[n] : null != this.transformer.injectionCallback && u.AsyncTrackingMode.doInjectMissingCallback(this.descriptor.asyncTrackingMode) && (this.origCb = this.transformer.injectionCallback, this.injectedCallback = !0);
      if (null == this.origCb) {
        return r;
      }
      const p = this.transformer.wrapCallback(this);
      if (this.injectedCallback) {
        const k = Array(n >= r.length ? n + 1 : r.length);
        let l = 0;
        for (let c = 0; c < k.length && !(c === n && (k[c++] = p, c >= k.length)); ++c) {
          k[c] = r.length > l ? r[l++] : void 0;
        }
        r = k;
      } else {
        r[n] = p;
      }
      return r;
    }
    manipulateReturnValue(r) {
      !r.didThrow && u.AsyncTrackingMode.isPromiseStyle(this.descriptor.asyncTrackingMode) && this.transformer.wrapReturnValue(this, r);
    }
  }
  a.AsyncTracker = t;
});
S("src/lib/transformer/AsyncTransformerBase", ["require", "exports", "src/lib/transformer/TransformerBase"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AsyncTransformerBase = void 0;
  class t extends u.TransformerBase {
    constructor(r, n = t.dynatraceInjectedCallback) {
      super(r);
      this.injectionCallback = n;
    }
    static dynatraceInjectedCallback() {
    }
  }
  a.AsyncTransformerBase = t;
});
S("src/lib/CallbackWrappingHelper", "require exports src/lib/contextmanager/ContextManager src/lib/FunctionId src/lib/transformer/TransformerBase src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil".split(" "), function(O, a, u, t, r, n, p, k) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.CallbackWrappingHelper = a.errorFromFirstArg = void 0;
  a.errorFromFirstArg = function() {
    return 1 <= arguments.length && n.isError(arguments[0]) ? arguments[0] : void 0;
  };
  class l {
    static wrapCallbackContextPassing(c) {
      var m;
      c.spc.didInitiateAsyncOp = !0;
      const d = null !== (m = u.ContextManager.activeAsyncState) && void 0 !== m ? m : u.ROOT_STORE;
      return u.ContextManager.bind(d.setValue(u.CurrentSPC, c.spc), c.origCb);
    }
    static wrapCallbackCreateActivation(c) {
      return function() {
        var m;
        try {
          if (null != c.virtualNodeActivation) {
            const b = k.isFunction(c.errorExtractor) ? k.doInvoke(this, c.errorExtractor, arguments) : void 0;
            c.virtualNodeActivation.exitOrException(b);
          }
        } catch (b) {
          p.logAgentException(b);
        }
        let d;
        if (null != c.virtualNodeActivation && !c.injectedCallback) {
          try {
            var e = new t.FunctionId(c.origCb);
            d = r.TransformerBase.createCallbackActivation(c.virtualNodeActivation.spc, e);
          } catch (b) {
            p.logAgentException(b);
          }
        }
        e = k.safeInvoke(this, c.origCb, arguments);
        try {
          null === d || void 0 === d ? void 0 : d.done(e.exception), null === (m = c.virtualNodeActivation) || void 0 === m ? void 0 : m.spc.end();
        } catch (b) {
          p.logAgentException(b);
        }
        return e.rethrow();
      };
    }
    static wrapCallbackEndVNode(c) {
      return function() {
        try {
          if (null != c.virtualNodeActivation && !c.injectedCallback) {
            const m = k.isFunction(c.errorExtractor) ? k.doInvoke(this, c.errorExtractor, arguments) : void 0;
            c.virtualNodeActivation.exitOrException(m);
            c.virtualNodeActivation.spc.end();
          }
        } catch (m) {
          p.logAgentException(m);
        }
        return k.doInvoke(this, c.origCb, arguments);
      };
    }
  }
  a.CallbackWrappingHelper = l;
});
S("src/lib/AsyncContextPassingTracker", ["require", "exports", "src/lib/AsyncTracker"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AsyncContextPassingTracker = void 0;
  class t extends u.AsyncTracker {
    constructor(r, n, p) {
      super(r, p);
      this.spc = n;
    }
  }
  a.AsyncContextPassingTracker = t;
});
S("src/lib/transformer/ContextPassingTransformer", "require exports src/lib/transformer/AsyncTransformerBase src/lib/AsyncContextPassingTracker src/lib/CallbackWrappingHelper src/lib/SubPathContext src/lib/util/InvocationUtil src/lib/contextmanager/ContextManager src/lib/util/ErrorUtil src/lib/transformer/TransformerBase".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ContextBlockingTransformer = a.ContextPassingTransformer = void 0;
  class m extends u.AsyncTransformerBase {
    constructor(e, b) {
      super(e);
      this.conditionCb = b;
    }
    generateSubstitute(e) {
      const b = this;
      return function() {
        if (!b.controlParams.active || b.conditionCb && !b.conditionCb.apply(this, arguments)) {
          return p.doInvoke(this, e.origFn, arguments);
        }
        let g;
        var h = arguments;
        try {
          const f = n.SubPathContext.getActiveContext();
          null != f && (g = new t.AsyncContextPassingTracker(b, f, e), h = g.manipulateArguments(arguments));
        } catch (f) {
          l.logAgentException(f);
        }
        if (null == g) {
          return p.doInvoke(this, e.origFn, arguments);
        }
        h = p.safeInvoke(this, e.origFn, h);
        try {
          g.manipulateReturnValue(h);
        } catch (f) {
          l.logAgentException(f);
        }
        return h.rethrow();
      };
    }
    wrapCallback(e) {
      return r.CallbackWrappingHelper.wrapCallbackContextPassing(e);
    }
    wrapReturnValue() {
    }
  }
  a.ContextPassingTransformer = m;
  class d extends c.TransformerBase {
    constructor(e, b = () => !0) {
      super(e);
      this.blockContextPropagation = b;
    }
    generateSubstitute(e) {
      const b = this;
      return function() {
        return b.controlParams.active && b.blockContextPropagation.apply(this, arguments) ? k.ContextManager.runInContext(new k.AsyncContextState(), () => p.doInvoke(this, e.origFn, arguments), null) : p.doInvoke(this, e.origFn, arguments);
      };
    }
  }
  a.ContextBlockingTransformer = d;
});
S("src/lib/sensors/GenericSensors", ["require", "exports", "src/lib/Logger", "src/lib/transformer/ContextPassingTransformer", "src/lib/sensors/SensorBase"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ContextPassingSensor = void 0;
  class n extends r.SensorBase {
    applyInstrumentation(k, l) {
      this.isDebugEnabled && u.debug(`${this.name}: instrumenting module ${k.toString(!0)}`);
      null == this.transformer && (this.transformer = this.createTransformer());
      this.applyPatch(k, this.transformer, l);
    }
  }
  class p extends n {
    createTransformer() {
      return new t.ContextPassingTransformer(this);
    }
  }
  a.ContextPassingSensor = p;
});
S("src/lib/sensors/DisabledModulesSensor", ["require", "exports", "src/lib/Debug", "src/lib/Logger", "src/lib/sensors/SensorBase"], function(O, a, u, t, r) {
  function n() {
  }
  function p() {
    return "";
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.DisabledModulesSensor = void 0;
  const k = {newrelic:function(c) {
    process.env.NEW_RELIC_NO_CONFIG_FILE = "1";
    process.env.NEW_RELIC_ENABLED = "0";
    t.info("DisabledModules: disabling newrelic agent");
    return c.moduleExports;
  }, appdynamics:function() {
    t.info("DisabledModules: disabling AppDynamics agent");
    return {profile:n};
  }, longjohn:function() {
    t.info("DisabledModules: disabline logjohn");
    return {format_stack_frame:p, format_stack:p, async_trace_limit:5, empty_frame:"---------------------------------------------"};
  }};
  class l extends r.SensorBase {
    applyInstrumentation(c) {
      u.assert(!c.isModuleAcquired, "disabled module got loaded before DisabledModuleSensor");
      this.isDebugEnabled && t.debug(`${this.name}: inhibit ${c}`);
      const m = k[c.request];
      c.moduleExports = null != m ? m(c) : {};
    }
  }
  a.DisabledModulesSensor = l;
});
S("src/lib/sensors/ModuleSubstitutionSensor", ["require", "exports", "src/lib/Logger", "src/lib/sensors/SensorBase", "src/lib/util/ErrorUtil"], function(O, a, u, t, r) {
  function n(l) {
    l.gracefulify = n;
    return l;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ModuleSubstitutionSensor = void 0;
  const p = {"graceful-fs":function() {
    const l = O("fs");
    return n(l);
  }};
  class k extends t.SensorBase {
    applyInstrumentation(l) {
      null != p[l.request] ? (this.isDebugEnabled && u.debug(`${this.name}: substituting module ${l}`), l.moduleExports = p[l.request](l)) : (u.warning(`${this.name}: undefined substitution for module ${l.request}`), r.reportInstrumentationError(this, ` undefined substitution for module ${l.request}`));
    }
  }
  a.ModuleSubstitutionSensor = k;
});
S("src/lib/sensors/UemSensor", "require exports url util tls src/lib/Agent src/lib/Logger src/lib/RunTimeProperty src/lib/util/ErrorUtil src/lib/util/HttpUtil".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.UemSensorContext = a.UemSensor = void 0;
  class m {
    static isEnabled() {
      return m.isActive && !n.Agent.isCim;
    }
    static createContext(e, b) {
      return new d(e, b);
    }
    static setActive(e) {
      this.uemActive = e;
    }
    static get debug() {
      return this.debugProperty.value;
    }
    static get isActive() {
      return this.uemActive && !m.uemDisabled.value;
    }
  }
  m.uemActive = !0;
  m.uemDisabled = new k.BooleanProperty("UemSensorDisabled", !1);
  m.debugProperty = new k.BooleanProperty("UemSensorLogging", !1);
  a.UemSensor = m;
  class d {
    constructor(e, b) {
      this.debug = m.debug;
      var g = u.parse("string" === typeof e.url ? e.url : "");
      g = {scheme:e.socket instanceof r.TLSSocket ? "https" : "http", method:e.method || "", path:g.pathname || "", query:g.query || "", clientIP:c.getRemoteAddress(e.socket)};
      this.uemSensorContext = n.Agent.uemSensor.createUemSensorContext(g, e.headers, b);
    }
    release() {
      null != this.uemSensorContext && this.uemSensorContext.release();
    }
    isUemWebRequest() {
      return null != this.uemSensorContext ? this.uemSensorContext.isUemWebRequest() : !1;
    }
    isInjecting() {
      return null != this.uemSensorContext ? this.uemSensorContext.isInjecting() : !1;
    }
    getServerId() {
      return null != this.uemSensorContext ? this.uemSensorContext.serverId : 0;
    }
    isPathBlocked() {
      return null != this.uemSensorContext ? this.uemSensorContext.isPathBlocked : !1;
    }
    onWebRequest(e, b, g, h) {
      g = this.handleRequest(g, h);
      null != g ? (this.debug && p.debug(`UEM: SpecialRequest: postBodyNeeded: ${g.postBodyNeeded}, maxPostBodySize: ${g.maxPostBodySize}: ${e.url}`), g.postBodyNeeded ? this.captureSpecialRequestPostBody(g.maxPostBodySize, e, b) : this.handleSpecialRequest(b)) : this.handleRegularRequest(e);
    }
    onStoreHeaders(e, b, g, h) {
      var f;
      const q = this.responseStarted(g), w = this.getChangedResponseHeaders();
      this.debug && p.debug(`UEM: Changed responseHeaders: ${c.headersToString(null !== w && void 0 !== w ? w : {})}`);
      for (const G in w) {
        const y = c.lookupKeyname(g, G);
        if (null != y) {
          if (d.shouldAppendHeader(y)) {
            let D = [];
            D = D.concat(g[y], w[G]);
            c.setResponseHeader(b, g, y, D, h);
          } else {
            c.setResponseHeader(b, g, y, w[G], h);
          }
        } else {
          c.setResponseHeader(b, g, G, w[G], h);
        }
      }
      q && "HEAD" !== e.method && (e = c.lookupKeyname(g, "content-length"), null != e && c.removeResponseHeader(b, g, e, h), e = null !== (f = c.lookupKeyname(g, "transfer-encoding")) && void 0 !== f ? f : "transfer-encoding", c.setResponseHeader(b, g, e, "chunked", h));
    }
    onResponseWrite(e, b) {
      if (null != e && this.isInjecting() && (e = d.getBuffer(e, b), null != e)) {
        b = this.injectJsAgentTag(e, !1);
        var g = null != b, h = g ? b.length : 0;
        this.debug && p.debug(`UEM: Agent was ${0 < h ? "" : "NOT "}injected into fragment` + ` (fragment length before: ${e.length}, new fragment${g ? ` length: ${h}` : ": <undefined>"})`);
        return b;
      }
    }
    onResponseEnd(e, b) {
      let g;
      this.isInjecting() && (g = this.injectJsAgentTag(d.getBuffer(e, b), !0), null == e && null != g && 0 === g.length && (g = void 0), this.debug && (b = (e = null != g) ? g.length : 0, p.debug(`UEM: Processing remaining fragment (fragment${e ? ` length: ${b}` : ": <undefined>"})`)));
      this.release();
      return g;
    }
    static handleHealthCheck(e, b) {
      return "dtHealthCheck" === e.headers["user-agent"] ? (this.agentIdStrHex || (this.agentIdStrHex = `${n.Agent.nativeAgent.getAgentId(2)}`), m.debug && p.debug(`UEM: Processing dtHealthCheck: ${"x-dtAgentId"} = ${this.agentIdStrHex}`), b.writeHead(200, {["content-length"]:0, ["x-dtHealthCheck"]:"CAPTURING_OFF_SENSOR_CONF", ["x-dtAgentId"]:`${this.agentIdStrHex}`}), b.end(), b.on("error", g => {
        p.info(`UEM: Error on processing dtHealthCheck: ${g.message}`);
      }), !0) : !1;
    }
    handleRequest(e, b) {
      if (null != this.uemSensorContext) {
        return this.uemSensorContext.handleRequest(e, b);
      }
    }
    responseStarted(e) {
      return null != this.uemSensorContext ? this.uemSensorContext.responseStarted(e) : !1;
    }
    getChangedRequestHeaders() {
      if (null != this.uemSensorContext) {
        return this.uemSensorContext.getChangedRequestHeaders();
      }
    }
    getChangedResponseHeaders() {
      if (null != this.uemSensorContext) {
        return this.uemSensorContext.getChangedResponseHeaders();
      }
    }
    injectJsAgentTag(e, b) {
      if (null != this.uemSensorContext) {
        return this.uemSensorContext.injectJsAgentTag(e, b);
      }
    }
    updateRequestBody(e) {
      return null != this.uemSensorContext ? this.uemSensorContext.updateRequestBody(e) : !1;
    }
    getResponseStatus() {
      return null != this.uemSensorContext ? this.uemSensorContext.getResponseStatus() : 200;
    }
    getResponseBody() {
      if (null != this.uemSensorContext) {
        return this.uemSensorContext.getResponseBody();
      }
    }
    static getBuffer(e, b) {
      if (null != e) {
        var g;
        "string" === typeof e ? g = Buffer.from(e, b) : Buffer.isBuffer(e) ? g = e : t.types.isUint8Array(e) && (g = Buffer.from(e.buffer, e.byteOffset, e.byteLength));
        return null != g && 0 < g.length ? g : void 0;
      }
    }
    static shouldAppendHeader(e) {
      return "set-cookie" === e.toLowerCase() ? !0 : !1;
    }
    handleRegularRequest(e) {
      const b = this.getChangedRequestHeaders();
      if (null != b) {
        for (const g in b) {
          const h = g.toLowerCase(), f = b[g];
          null == f ? delete e.headers[h] : e.headers[h] = f;
        }
        this.debug && p.debug(`UEM: Changed requestHeaders: ${c.headersToString(e.headers)}`);
      }
    }
    handleSpecialRequest(e) {
      var b;
      const g = null !== (b = this.getChangedResponseHeaders()) && void 0 !== b ? b : {};
      b = this.getResponseBody();
      const h = this.getResponseStatus();
      let f = 0;
      null == b ? p.warning("UemSensor: failed to get response body for special request (e.g. no jsAgent available)") : f = b.length;
      this.debug && (p.debug(`UEM: Response status code: ${h}`), p.debug(`UEM: Response headers: ${c.headersToString(g)}`), p.debug(`UEM: Response body size: ${f}`), 0 < f && p.debug(`UEM: Response body: ${b.toString("hex", 0, 1024)}`));
      null == c.lookupKeyname(g, "content-length") && (g["content-length"] = `${f}`);
      e.writeHead(h, g);
      0 < f ? e.end(b) : e.end();
      e.on("error", q => {
        p.info(`UEM: Error on processing SpecialRequest: ${q.message}`);
      });
    }
    captureSpecialRequestPostBody(e, b, g) {
      this.debug && p.debug(`UEM: Processing BEACON request method ${b.method}`);
      if ("POST" === b.method && 0 < e) {
        const h = this;
        let f = 0;
        const q = Buffer.allocUnsafe(Math.min(e + 1, 2147483647));
        b.on("data", function(w) {
          try {
            h.debug && p.debug(`UEM: beacon data: length=${w.length}`), f < q.length && ("string" === typeof w ? f += q.write(w, f) : Buffer.isBuffer(w) && (f += w.copy(q, f)));
          } catch (G) {
            l.logAgentException(G);
          }
        });
        b.on("end", function() {
          try {
            const w = q.slice(0, f);
            h.debug && p.debug(`UEM: beacon end: length=${f}, ${w.toString(void 0, 0, 1024)}`);
            h.updateRequestBody(w) && h.handleSpecialRequest(g);
          } catch (w) {
            l.logAgentException(w);
          }
        });
      } else {
        this.updateRequestBody(Buffer.alloc(0)) && this.handleSpecialRequest(g);
      }
    }
  }
  a.UemSensorContext = d;
});
S("src/lib/sensors/WebRequestAttachment", "require exports querystring url src/lib/Agent src/lib/AttachmentBase src/lib/Configuration src/lib/Embedder src/lib/util/ErrorUtil src/lib/util/HttpUtil".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.WebRequestAttachment = void 0;
  const m = k.create("serverAddress");
  class d extends n.AttachmentBase {
    constructor(e, b) {
      super(e, r.Agent.correlation.AttachmentId.WEBREQUEST_ID, 0);
      this.sensorProperties = b;
      this.maxStrLen = c.getWebRequestMaxStringLen();
    }
    fillEntryData(e) {
      this.setMultipleFields(b => {
        const g = e.method || "GET";
        var h = e.headers || {};
        const f = c.getRemoteAddress(e.socket);
        var q = c.getClientIp(h);
        null == q && (q = f);
        const w = r.Agent.correlation.AttachmentFieldId;
        b.string(w.WEBREQUEST_CLIENT_IP, q, this.maxStrLen);
        b.stringCached(w.WEBREQUEST_REQUEST_METHOD, g, this.maxStrLen);
        q = t.parse(e.url || "");
        b.stringCached(w.WEBREQUEST_URI, q.pathname || "/", this.maxStrLen);
        q.query && b.stringCached(w.WEBREQUEST_QUERY_STRING, q.query, this.maxStrLen);
        b.stringCached(w.WEBREQUEST_REQUESTED_HOSTNAME, c.getHostname(h), this.maxStrLen);
        const G = this.sensorProperties;
        b.map(w.WEBREQUEST_REQUEST_HEADERS, h, G.captureAllRequestHeaders ? void 0 : G.requestHeadersToCapture, this.maxStrLen);
        "string" === typeof p.Configuration.appName && b.stringCached(w.WEBREQUEST_APPLICATION_ID, p.Configuration.appName, this.maxStrLen);
        var y = b.stringCached, D = w.WEBREQUEST_SERVERNAME;
        var J = e.server, B = m.get(J);
        if ("string" === typeof B) {
          var v = B;
        } else {
          try {
            "function" === typeof J.address && (v = J.address());
          } catch (z) {
            l.logAgentException(z);
          }
          null == v || "string" === typeof v || "string" !== typeof v.address ? B = "localhost" : (B = "IPv6" === v.family ? `[${v.address}]` : v.address, "number" === typeof v.port && (B += `:${v.port}`));
          m.set(J, B);
          v = B;
        }
        y.call(b, D, v, this.maxStrLen);
        b.stringCached(w.WEBREQUEST_CONTEXTROOT, "/", this.maxStrLen);
        h = h.forwarded || h["x-forwarded-for"];
        "string" === typeof h && b.string(w.WEBREQUEST_FORWARDED_FOR, h, this.maxStrLen);
        b.string(w.WEBREQUEST_REMOTE_ADRESS, f, this.maxStrLen);
        "GET" === g && q.query && G.shallCaptureRequestData() && this.fillRequestParameters(b, q.query);
      });
    }
    fillExitData(e) {
      this.setMultipleFields(b => {
        const g = r.Agent.correlation.AttachmentFieldId;
        null != e.statusCode && b.integer(g.WEBREQUEST_RESPONSE_STATUS, +e.statusCode);
        if ("string" === typeof e.headers) {
          this.fillResponseHeadersFromHeaderline(b, e.headers);
        } else if (null != e.headers) {
          const {captureAllResponseHeaders:h, responseHeadersToCapture:f} = this.sensorProperties;
          c.fillOutgoingHeaders(b, g.WEBREQUEST_RESPONSE_HEADERS, e.headers, h, f);
        }
        "string" === typeof e.postData && 0 < e.postData.length && this.fillRequestParameters(b, e.postData);
      });
    }
    fillRequestParameters(e, b) {
      const {captureAllRequestParameters:g, requestParametersToCapture:h} = this.sensorProperties;
      e.map(r.Agent.correlation.AttachmentFieldId.WEBREQUEST_REQUEST_PARAMETERS, u.parse(b), g ? void 0 : h, this.maxStrLen);
    }
    fillResponseHeadersFromHeaderline(e, b) {
      b = b.split("\r\n");
      const g = b.length;
      let h = 0;
      for (; h < g; h++) {
        if (b[h].startsWith("HTTP/")) {
          h++;
          break;
        }
      }
      const {captureAllResponseHeaders:f, responseHeadersToCapture:q} = this.sensorProperties, w = r.Agent.correlation.AttachmentFieldId.WEBREQUEST_RESPONSE_HEADERS;
      for (; h < g; h++) {
        const G = b[h], y = G.indexOf(":");
        if (-1 !== y) {
          const D = G.substring(0, y).toLowerCase();
          (f || -1 !== q.indexOf(D)) && e.keyValueCached(w, D, G.substring(y + 1).trim(), this.maxStrLen);
        }
      }
    }
  }
  a.WebRequestAttachment = d;
});
S("src/lib/transformer/EventEmitterTransformerBase", ["require", "exports", "src/lib/Embedder", "src/lib/Patch", "src/lib/transformer/TransformerBase"], function(O, a, u, t, r) {
  function n(l, c, m) {
    function d() {
      l.removeListener(c, d.listener);
      e || (e = !0, Reflect.apply(m, l, arguments));
    }
    let e = !1;
    d.listener = m;
    p.set(d, m);
    return d;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.EventEmitterTransformerBase = void 0;
  const p = u.create("eventEmitter");
  class k extends r.TransformerBase {
    constructor(l, c) {
      super(l);
      null != c && (Array.isArray(c) ? this.types = c : this.types = [c]);
    }
    applyTransformation(l) {
      const c = t.cPolymorphicDefaultOptions, m = new t.FunctionSpec("addListener", l);
      null != t.substitute(m, this.generateAddListenerSubstitute(), c) && t.installAlias(m, new t.FunctionSpec("on", l));
      t.substitute(new t.FunctionSpec("once", l), this.generateOnceSubstitute(), c);
      t.substitute(new t.FunctionSpec("prependListener", l), this.generateAddListenerSubstitute(), c);
      t.substitute(new t.FunctionSpec("prependOnceListener", l), this.generatePrependOnceSubstitute(), c);
    }
    static getUnwrappedListener(l) {
      return p.get(l) || l;
    }
    generateAddListenerSubstitute() {
      const l = this;
      return function m() {
        if (l.checkArguments.apply(l, arguments)) {
          var d = arguments[1];
          const e = l.getWrappedListener(this, arguments[0], d);
          if (null != e && e !== d) {
            return p.set(e, d), d = k.getUnwrappedListener(d), e.listener = d, arguments[1] = e, t.invokeResolvedOriginal(m, this, arguments);
          }
        }
        return t.invokeOriginal(m, this, arguments);
      };
    }
    generateOnceSubstitute() {
      const l = this;
      return function m() {
        return Reflect.apply(l.checkArguments, l, arguments) && l.shallWrap(this, arguments[0]) ? (arguments[1] = n(this, arguments[0], arguments[1]), Reflect.apply(this.on, this, arguments)) : t.invokeOriginal(m, this, arguments);
      };
    }
    generatePrependOnceSubstitute() {
      const l = this;
      return function m() {
        return Reflect.apply(l.checkArguments, l, arguments) && l.shallWrap(this, arguments[0]) ? (arguments[1] = n(this, arguments[0], arguments[1]), Reflect.apply(this.prependListener, this, arguments)) : t.invokeOriginal(m, this, arguments);
      };
    }
    checkArguments() {
      return 2 <= arguments.length && "function" === typeof arguments[1] && (null == this.types || -1 !== this.types.indexOf(arguments[0]));
    }
  }
  a.EventEmitterTransformerBase = k;
});
S("src/lib/transformer/ReadableStreamDataTransformer", "require exports string_decoder src/lib/transformer/EventEmitterTransformerBase src/lib/Logger src/lib/Patch src/lib/util/ErrorUtil src/lib/util/InvocationUtil".split(" "), function(O, a, u, t, r, n, p, k) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ReadableStreamDataTransformer = a.BasicReadableStreamDataTransformer = void 0;
  var l;
  (function(e) {
    e[e.UNDEFINED = 0] = "UNDEFINED";
    e[e.READ = 1] = "READ";
    e[e.DATAEVENT = 2] = "DATAEVENT";
  })(l || (l = {}));
  class c extends t.EventEmitterTransformerBase {
    constructor(e, b) {
      super(e, "data");
      this.config = b;
      this.state = l.UNDEFINED;
    }
    applyTransformation(e) {
      const b = new n.FunctionSpec("read", e);
      null == n.applyToSingle(b, this, n.cOverrideDefaultOptions) && this.config.warnLogWithContext(`Failed to patch ${b.qualifiedName}`);
      super.applyTransformation(e);
    }
    generateSubstitute(e) {
      const b = this;
      let g = e.origFn;
      return function() {
        if (b.config.earlyBail) {
          return k.doInvoke(this, g, arguments);
        }
        b.state === l.UNDEFINED && (b.state = l.READ);
        if (b.state !== l.READ) {
          return b.config.debugLogWithContext(() => `ReadableStreamDataTransformer.read skipped as state=${l[b.state]}`), k.doInvoke(this, g, arguments);
        }
        const h = this.read, f = k.safeInvoke(this, g, arguments);
        if (!f.didThrow) {
          const q = f.retVal;
          null != q && b.addChunk("read", q);
        }
        b.config.debugLogWithContext(() => `ReadableStreamDataTransformer.read() didThrow: ${f.didThrow ? p.verboseExceptionObject(f.exception) : "-"}`);
        this.read !== h && (g = this.read, this.read = h);
        return f.rethrow();
      };
    }
    shallWrap() {
      this.config.debugLogWithContext(() => `ReadableStreamDataTransformer.shallWrap: ${l[this.state]}`);
      return this.state === l.UNDEFINED && !this.config.earlyBail;
    }
    getWrappedListener(e, b, g) {
      if (this.state !== l.UNDEFINED) {
        return g;
      }
      const h = this;
      this.state = l.DATAEVENT;
      return function(f) {
        if (h.config.earlyBail) {
          return k.doInvoke(this, g, arguments);
        }
        if (h.state !== l.DATAEVENT) {
          return h.config.debugLogWithContext(() => `ReadableStreamDataTransformer.onData skipped as state=${l[h.state]}`), k.doInvoke(this, g, arguments);
        }
        h.addChunk("onData", f);
        return k.doInvoke(this, g, arguments);
      };
    }
    addChunk(e, b) {
      try {
        this.config.addChunk(e, b);
      } catch (g) {
        p.logAgentException(g);
      }
    }
  }
  a.BasicReadableStreamDataTransformer = c;
  class m extends c {
    constructor(e, b, g, h = "utf8") {
      super(e, new d(e.isDebugEnabled, g, (f, q) => {
        const w = this.tracker.streamData.length;
        this.config.debugLogWithContext(() => `ReadableStreamDataTransformer.${f}: curLen=${w}, chunkLen=${q.length}`);
        w < this.maxSize ? this.tracker.streamData = "string" === typeof q ? this.tracker.streamData + q.slice(0, this.maxSize - w) : this.tracker.streamData + this.decoder.write(q).slice(0, this.maxSize - w) : this.config.debugLogWithContext(() => `ReadableStreamDataTransformer.${f} skip chunk of length ${q.length}`);
      }));
      this.maxSize = b;
      this.tracker = g;
      this.decoder = new u.StringDecoder(h);
    }
  }
  a.ReadableStreamDataTransformer = m;
  class d {
    constructor(e, b, g) {
      this.isDebugEnabled = e;
      this.tracker = b;
      this.addChunk = g;
    }
    get earlyBail() {
      return null == this.tracker.vNodeActivation ? (this.debugLogWithContext("ReadableStreamDataTransformer.read don't capture data on closed path"), !0) : !1;
    }
    debugLogWithContext(e) {
      this.isDebugEnabled && r.debug(`${this.tracker}: ${"function" === typeof e ? e() : e}`);
    }
    warnLogWithContext(e) {
      r.warning(`${this.tracker}: ${e}`);
    }
  }
});
S("src/lib/transformer/WebRequestTrackerBase", "require exports src/lib/Agent src/lib/sensors/ExceptionAttachment src/lib/sensors/WebRequestAttachment src/lib/util/ErrorUtil src/lib/util/UniqueId".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.WebRequestTrackerBase = void 0;
  class k {
    constructor(l, c, m) {
      this.trackerName = l;
      this.server = c;
      this.sensor = m;
      this.streamData = "";
      this.errorCnt = 0;
      this.subRoutes = [];
      this.id = p.UniqueId.getNext();
    }
    createAttachments(l) {
      this.webRequestAttachment = new r.WebRequestAttachment(l, this.sensor.properties);
      if (this.webRequestAttachment.valid) {
        try {
          this.onWebRequestAttachmentCreated();
        } catch (c) {
          n.logAgentException(c);
        }
      } else {
        this.isDebugEnabled && u.Logger.debug(`${this}: WebRequestAttachment is not valid`);
      }
    }
    attachError(l) {
      const c = this.isDebugEnabled;
      this.errorCnt++;
      if (1 === this.errorCnt) {
        if (null == this.vNodeActivation || this.vNodeActivation.isExited) {
          c && u.Logger.debug(`${this}: rejecting error object - vNode closed`);
        } else {
          try {
            (new t.ExceptionAttachment(this.vNodeActivation)).fillExceptionData(l), c && u.Logger.debug(`${this}: attached error ${n.verboseExceptionObject(l)}`);
          } catch (m) {
            n.logAgentException(m);
          }
        }
      } else {
        c && u.Logger.debug(`${this}: rejecting error object - already attached ${this.errorCnt}`);
      }
    }
    addSubRoute(l) {
      if (null != l) {
        if (0 < this.subRoutes.length) {
          const c = this.subRoutes[this.subRoutes.length - 1];
          c.path === l.path && c.regexp === l.regexp && c.id === l.id || this.subRoutes.push(l);
        } else {
          this.subRoutes = [l];
        }
      }
    }
    attachRoute(l) {
      null == this.vNodeActivation || this.vNodeActivation.isExited || (l = this.subRoutes.map(c => c.route).join("") + l, this.subRoutes = [], this.isDebugEnabled && u.Logger.debug(`${this}: adding attribute http.route: ${l}`), this.vNodeActivation.spc.path.addCurrentNodeSpanAttribute("http.route", l));
    }
    endAsyncExeNode() {
      const l = this.isDebugEnabled;
      if (null == this.vNodeActivation || this.vNodeActivation.isExited) {
        l && u.Logger.debug(`${this}: endAsyncExeNode() no vNode set or closed`);
      } else {
        try {
          l && u.Logger.debug(`${this}: endAsyncExeNode() virt: ${this.vNodeActivation.spc}`), null != this.webRequestAttachment && this.webRequestAttachment.valid && this.fillWebRequestAttachmentExitData(), 0 === this.errorCnt ? this.vNodeActivation.exit() : this.vNodeActivation.methodException();
        } catch (c) {
          n.logAgentException(c);
        }
      }
    }
    get isDebugEnabled() {
      return this.sensor.isDebugEnabled;
    }
    toString() {
      this.logPrefix || (this.logPrefix = `${this.trackerName} ${p.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
  }
  a.WebRequestTrackerBase = k;
});
S("src/lib/util/EventUtil", "require exports events src/lib/Logger src/lib/util/ErrorUtil src/lib/util/InvocationUtil".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.installErrorMonitor = a._testResetErrorMonitorCnt = void 0;
  let p = "symbol" === typeof u.errorMonitor, k = 0;
  a._testResetErrorMonitorCnt = function() {
    p = "symbol" === typeof u.errorMonitor;
    k = 0;
  };
  a.installErrorMonitor = function(l, c) {
    if (p) {
      try {
        l.on(u.errorMonitor, c);
        return;
      } catch (m) {
        5 <= ++k && (p = !1, t.info(`Stop using errorMonitor, last exception seen: ${(0,r.verboseExceptionObject)(m)}`));
      }
    }
    l.on("error", function(...m) {
      n.doInvoke(this, c, m);
      1 >= l.listenerCount("error") && (l.removeAllListeners("error"), l.emit("error", ...m));
    });
  };
});
S("src/lib/sensors/BizEventsSensorUtils", ["require", "exports", "src/lib/sensors/BizEventsSensor"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.extractContentEncoding = a.extractContentType = a.BodyKind = a.ContentEncoding = a.ContentType = void 0;
  var t;
  (function(n) {
    n.JSON = "JSON";
    n.INELIGIBLE = "INELIGIBLE";
  })(t = a.ContentType || (a.ContentType = {}));
  var r;
  (function(n) {
    n.PLAIN_TEXT = "PLAIN_TEXT";
    n.GZIP = "GZIP";
    n.UNSUPPORTED = "UNSUPPORTED";
  })(r = a.ContentEncoding || (a.ContentEncoding = {}));
  (function(n) {
    n.REQUEST = "request";
    n.RESPONSE = "response";
  })(a.BodyKind || (a.BodyKind = {}));
  a.extractContentType = function(n, p) {
    let k = t.INELIGIBLE, l = "unsupported";
    if (null != n) {
      const c = n.toLowerCase();
      c.includes("application/json") ? (k = t.JSON, u.BizEventsSensor.logDebug(() => `BizEvent: found ${p} body content-type 'application/json'`)) : u.BizEventsSensor.logDebug(() => `BizEvent: ineligible ${p} body content type '${n}'`);
      const m = c.search("charset=");
      if (-1 !== m) {
        const d = c.slice(m + 8);
        Buffer.isEncoding(d) ? (l = d, u.BizEventsSensor.logDebug(() => `BizEvent: found ${p} body charset '${l}'`)) : "iso-8859-1" === d ? (l = "latin1", u.BizEventsSensor.logDebug(() => `BizEvent: found ${p} body charset '${d}' and treating it as '${l}'`)) : u.BizEventsSensor.logDebug(() => `BizEvent: found unsupported ${p} body charset '${d}'`);
      } else {
        l = "utf-8";
      }
    }
    "unsupported" === l && (k = t.INELIGIBLE);
    return [k, l];
  };
  a.extractContentEncoding = function(n, p) {
    if (null == n) {
      return r.PLAIN_TEXT;
    }
    switch(n.toLowerCase()) {
      case "gzip":
        return r.GZIP;
      default:
        return u.BizEventsSensor.logDebug(() => `BizEvent: found unsupported ${p} body encoding: '${n}'`), r.UNSUPPORTED;
    }
  };
});
S("src/lib/sensors/BizEventsSensor", "require exports url util zlib string_decoder src/lib/sensors/SensorBase src/lib/sensors/BizEventsSensorUtils src/lib/Agent src/lib/Embedder src/lib/Logger src/lib/Patch src/lib/transformer/ReadableStreamDataTransformer src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/HttpUtil src/lib/util/UniqueId".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h, f) {
  function q(E, I) {
    E = new d.ModuleSpec("IncomingMessage", E);
    const H = z.instance, F = new x(H.sensorConfig, I, (K, L) => {
      var M;
      null === (M = I.requestCollector) || void 0 === M ? void 0 : M.appendChunk(L);
    });
    (new e.BasicReadableStreamDataTransformer(H, F)).applyTransformation(E);
  }
  function w() {
    const E = v.get(this);
    null != E && (z.logDebug(() => `${E}: responseClose - response was prematurely closed, cleaning up intermediary results.`), E.bizEvent.cancel(), v.clear(this));
  }
  function G(E) {
    const I = Object.create(null);
    for (const [H, F] of Object.entries(E)) {
      if (null != F) {
        E = H.toLowerCase();
        const K = Array.isArray(F) ? F.join(", ") : F;
        I[E] = null != I[E] ? I[E] + `${", "}${K}` : K;
      }
    }
    return I;
  }
  function y(E) {
    const I = Object.create(null);
    for (const [H, F] of Object.entries(E)) {
      if (null != F) {
        switch(H) {
          case "set-cookie":
            I[H] = F.join(", ");
            break;
          case "cookie":
            I[H] = F.split("; ").join(", ");
            break;
          default:
            I[H] = F;
        }
      }
    }
    return I;
  }
  function D(E) {
    var I, H;
    const F = Object.create(null);
    for (const [K, L] of E.entries()) {
      E = null !== (H = null === (I = F[K]) || void 0 === I ? void 0 : I.concat(", ")) && void 0 !== H ? H : "", F[K] = E + L;
    }
    return F;
  }
  function J(E) {
    return "string" === typeof E ? Buffer.from(E, "binary") : E;
  }
  function B(E) {
    return E === k.ContentEncoding.GZIP ? I => {
      try {
        return r.gunzipSync(I);
      } catch (H) {
        z.logDebug(() => `BizEvents: Exception thrown when unzipping the data chunk, discarding all of it. (${H})`);
      }
    } : E === k.ContentEncoding.PLAIN_TEXT ? I => I : () => {
    };
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.normalizeRequestHeaders = a.StreamCollector = a.end = a.endCallbackActive = a.write = a.storeHeader = a.requestStart = a.BizEventsSensor = a.cBizEventsSensorConfigurationName = a.cBizEventsExternalConfigurationName = void 0;
  const v = c.create("bizEvent");
  a.cBizEventsExternalConfigurationName = "bizevents.http.incoming";
  a.cBizEventsSensorConfigurationName = "BizEventsHttpIncoming";
  class z extends p.SensorBase {
    constructor(E, I) {
      super(E, I);
      z._instance = this;
      l.Agent.incomingHttpBizEvents.createConfig();
    }
    static get instance() {
      null == z._instance && (z._instance = new z(a.cBizEventsSensorConfigurationName, {capture:!1, enabled:!1, entrypoint:!1}));
      return z._instance;
    }
    static logDebug(E) {
      z.instance.isDebugEnabled && m.debug("function" === typeof E ? E() : E);
    }
    get contentLengthLimit() {
      const E = this.sensorConfig.sensorProperties;
      return b.isObject(E) && b.hasSingleProperty(E, "limits") && b.isObject(E.limits) && b.hasSingleProperty(E.limits, "contentLength") && "number" === typeof E.limits.contentLength ? E.limits.contentLength : 10240;
    }
  }
  a.BizEventsSensor = z;
  a.requestStart = function(E, I, H) {
    var F, K, L, M, N, P;
    const Q = v.get(I);
    if (null == Q && z.instance.active) {
      const R = u.parse(null !== (F = E.url) && void 0 !== F ? F : "/");
      F = y(null !== (K = E.headers) && void 0 !== K ? K : {});
      K = null === H || void 0 === H ? void 0 : H.spc.path;
      H = null === H || void 0 === H ? void 0 : H.serialNo;
      const T = {method:null !== (L = E.method) && void 0 !== L ? L : "GET", path:null !== (M = R.pathname) && void 0 !== M ? M : "/", parameters:D(new URLSearchParams(null !== (N = R.search) && void 0 !== N ? N : "")), headers:F, purePath:K, serialNo:H};
      z.logDebug(() => `BizEvent: request start ${t.inspect(T)}`);
      const U = l.Agent.incomingHttpBizEvents.requestStart(T);
      null != U && (z.logDebug(() => `BizEvent: started ${t.inspect(U)}`), L = new A(U), U.captureRequestBody && (L.requestCollector = C.create(F["content-type"], F["content-encoding"], k.BodyKind.REQUEST), (null === (P = L.requestCollector) || void 0 === P ? 0 : P.isEligible) && q(E, L)), I.on("close", w), v.set(I, L));
    } else {
      z.logDebug(() => `BizEvent: ignoring request, existingBizEvent=${Q}, ` + `sensor enabled=${z.instance.enabled}/capture=${z.instance.capture}`);
    }
  };
  a.storeHeader = function(E, I) {
    const H = v.get(E);
    if (null != H) {
      [I = {}] = h.getResponseHeaders(E, I);
      I = G(I);
      const F = {statusCode:E.statusCode, headers:I};
      z.logDebug(() => `Bizevents: response data ${t.inspect(F)}`);
      H.bizEvent.responseStart(F);
      H.responseCollector = C.create(I["content-type"], I["content-encoding"], k.BodyKind.RESPONSE);
    } else {
      z.logDebug("BizEvents: unmonitored storeHeader (no BizEvent found)");
    }
  };
  a.write = function(E, ...I) {
    var H;
    const F = v.get(E);
    if ((null === F || void 0 === F ? 0 : F.bizEvent.captureResponseBody) && (null === (H = F.responseCollector) || void 0 === H ? 0 : H.isEligible)) {
      const [K, L] = I;
      F.responseCollector.compareAndLogCharset(L);
      F.responseCollector.appendChunk(K);
    } else {
      z.logDebug(() => `BizEvents: unmonitored write for BizEvent=${F}`);
    }
  };
  a.endCallbackActive = function(E) {
    var I, H, F, K;
    try {
      const L = v.get(E);
      return (null !== (H = null === (I = null === L || void 0 === L ? void 0 : L.bizEvent) || void 0 === I ? void 0 : I.captureRequestBody) && void 0 !== H ? H : !1) || (null !== (K = null === (F = null === L || void 0 === L ? void 0 : L.bizEvent) || void 0 === F ? void 0 : F.captureResponseBody) && void 0 !== K ? K : !1);
    } catch (L) {
      return g.logAgentException(L), !1;
    }
  };
  a.end = function(E, I, H) {
    var F, K;
    const L = v.get(E);
    null == L ? z.logDebug(() => `BizEvents: unmonitored end for BizEvent=${L}`) : (L.bizEvent.captureRequestBody && (null === (F = L.requestCollector) || void 0 === F ? 0 : F.isEligible) ? (z.logDebug(() => `BizEvents: providing request body for ${L}`), L.bizEvent.requestBody(L.requestCollector.collect())) : L.bizEvent.requestBody(void 0), L.requestCollector = void 0, L.bizEvent.captureResponseBody && (null === (K = L.responseCollector) || void 0 === K ? 0 : K.isEligible) ? (L.responseCollector.compareAndLogCharset(H), 
    null != I && L.responseCollector.appendChunk(I), z.logDebug(() => `BizEvents: providing response body for event ${L}`), L.bizEvent.responseBody(L.responseCollector.collect())) : L.bizEvent.responseBody(void 0), L.responseCollector = void 0, v.clear(E));
  };
  class x {
    constructor(E, I, H) {
      this.sensorConfig = E;
      this.tracker = I;
      this.addChunk = H;
      this.earlyBail = !this.sensorConfig.capture;
    }
    debugLogWithContext(E) {
      z.instance.isDebugEnabled && m.debug(`${this.tracker}: ${"function" === typeof E ? E() : E}`);
    }
    warnLogWithContext(E) {
      m.warning(`${this.tracker} ${E}`);
    }
  }
  class A {
    constructor(E) {
      this.bizEvent = E;
      this.id = f.UniqueId.getNextAsString();
      this.name = "BizEventsTracker";
    }
    toString() {
      return `${this.name} ${this.id}`;
    }
  }
  class C {
    constructor(E, I, H, F = z.instance.contentLengthLimit) {
      this.contentType = E;
      this.contentEncoding = I;
      this.charset = H;
      this.contentLengthLimit = F;
      this._collectedChunks = [];
      this._collectedLength = 0;
      this._skipRemainingData = !1;
    }
    static create(E, I, H, F) {
      const [K, L] = (0,k.extractContentType)(E, H), M = (0,k.extractContentEncoding)(I, H);
      if ("unsupported" !== L) {
        return new C(K, M, L, F);
      }
      z.logDebug(() => `BizEvents: found ineligible content-type(${K})/content-encoding(${M})/` + `charset (${L}) combination for ${H} body, skipping body capture`);
    }
    get isEligible() {
      return this.contentType !== k.ContentType.INELIGIBLE && this.contentEncoding !== k.ContentEncoding.UNSUPPORTED;
    }
    appendChunk(E) {
      this.shouldSkipRemainingData || (this._collectedChunks.push(J(E)), this._collectedLength += E.length, this.isContentLengthLimitExceeded && (z.logDebug(() => `BizEvents: response data length exceeded content length limit of ${this.contentLengthLimit}, discarding all of it.`), this.skipRemainingData()));
    }
    collect() {
      if (!this.shouldSkipRemainingData) {
        var E = this.mergeChunks();
        E = B(this.contentEncoding)(E);
        var I = this.decoder;
        E = null == E ? E : Buffer.isBuffer(E) ? I.write(E) : t.types.isUint8Array(E) ? I.write(Buffer.from(E.buffer, E.byteOffset, E.byteLength)) : E;
        return this.discardOnExcess(E);
      }
    }
    compareAndLogCharset(E) {
      var I;
      const H = null !== (I = this.charset) && void 0 !== I ? I : "utf-8", F = null !== E && void 0 !== E ? E : "utf-8";
      H !== F && z.logDebug(() => `BizEvents: got different charsets for content type header (${this.charset}/${H})` + `and stream charset (${E}/${F})`);
    }
    get decoder() {
      null == this._decoder && (this._decoder = new n.StringDecoder(this.charset));
      return this._decoder;
    }
    get isContentLengthLimitExceeded() {
      return this.exceedsContentLengthLimit(this._collectedLength);
    }
    get shouldSkipRemainingData() {
      return this._skipRemainingData;
    }
    exceedsContentLengthLimit(E) {
      return E > this.contentLengthLimit;
    }
    skipRemainingData() {
      this._collectedChunks = [];
      this._skipRemainingData = !0;
    }
    mergeChunks() {
      return Buffer.concat(this._collectedChunks);
    }
    discardOnExcess(E) {
      if (null != E && this.exceedsContentLengthLimit(E.length)) {
        z.logDebug(() => `BizEvents: response data length exceeded content length limit of ${this.contentLengthLimit}, discarding all of it.`);
      } else {
        return E;
      }
    }
  }
  a.StreamCollector = C;
  a.normalizeRequestHeaders = y;
});
S("src/lib/transformer/HttpServerTransformer", "require exports src/lib/sensors/UemSensor src/lib/sensors/WebRequestSensor src/lib/transformer/EventEmitterTransformerBase src/lib/transformer/ReadableStreamDataTransformer src/lib/transformer/TransformerBase src/lib/transformer/WebRequestTrackerBase src/lib/Agent src/lib/Embedder src/lib/FunctionId src/lib/Logger src/lib/Patch src/lib/Tracing src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/EventUtil src/lib/util/HttpUtil src/lib/util/InvocationUtil src/lib/sensors/BizEventsSensor src/lib/contextmanager/ContextManager".split(" "), 
function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h, f, q, w, G, y) {
  function D(C, E, I) {
    q.shallCapturePostRequestParameters(C.method, C.headers, E.properties) ? (C = new e.ModuleSpec("IncomingMessage", C), (new n.ReadableStreamDataTransformer(E, t.WebRequestSensor.cPostDataCaptureSize, I)).applyTransformation(C)) : E.isDebugEnabled && (E = E.properties, C = g.getOptionalPropertyValue(C.headers, "content-type", "no content-type"), d.debug(`${I}: skip capturing POST data, ${E.captureAllRequestParameters}, ${E.requestParametersToCapture}, ${C}`));
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ServerResponseWriteTransformer = a.ResponseStoreHeaderTransformer = a.ServerResponseEndTransformer = a.ServerRequestTransformer = a.ServerResponseEmbedder = void 0;
  a.ServerResponseEmbedder = c.create("serverResponse");
  class J extends k.WebRequestTrackerBase {
    constructor(C, E, I, H, F) {
      super("WebRequest", C, H);
      this.req = E;
      this.res = I;
      this.uemSensorContext = F;
      this.isResponseEnd = !1;
    }
    endAsyncExeNode() {
      this.isDebugEnabled && d.debug(`${this}: endAsyncExeNode(), vNode: ${this.vNodeActivation}, headersSent: ${this.res.headersSent}, status: ${this.res.statusCode}`);
      super.endAsyncExeNode();
    }
    onWebRequestAttachmentCreated() {
      const C = this.req;
      this.webRequestAttachment.fillEntryData({server:this.server, socket:C.socket, method:C.method, headers:C.headers, url:C.url});
    }
    fillWebRequestAttachmentExitData() {
      const C = this.res, E = C.headersSent;
      this.webRequestAttachment.fillExitData({statusCode:E ? C.statusCode : void 0, headers:E && "string" === typeof C._header ? C._header : void 0, postData:this.streamData});
    }
  }
  let B = !1;
  class v extends r.EventEmitterTransformerBase {
    constructor(C) {
      super(C, "request");
      this.sensor = C;
    }
    shallWrap() {
      return !0;
    }
    getWrappedListener(C, E, I) {
      const H = this, F = H.debugLogger.bind(this);
      F(() => `WebRequest: getWrappedListener cnt: ${C.listenerCount(E)}`);
      const K = r.EventEmitterTransformerBase.getUnwrappedListener(I), L = new m.FunctionId(K);
      return function(...M) {
        const N = M[0], P = M[1], Q = H.controlParams.isDebugEnabled;
        let R = H.onResultWithLog("default after hook success"), T = H.onResultWithLog("default after hook error"), U = a.ServerResponseEmbedder.get(P), V, Z = !1;
        F(() => `WebRequest: Handler enter: ${N.method}, ${N.url}`);
        const ba = (new p.FunctionRunConfig()).chain((0,p.bailIf)(!H.controlParams.active, "WebRequest: Handler exit - inactive", H, () => {
          try {
            G.requestStart(N, P, void 0);
          } catch (W) {
            h.logAgentException(W);
          }
        })).chain((0,p.tryLastIf)(null != U && null != U.vNodeActivation, W => {
          const X = U.vNodeActivation.spc.createActivation({sensorId:l.Agent.correlation.SensorId.NODEJS_HTTP_SERVER, functionId:L, mode:1});
          return null != X ? (R = (0,p.pipe)(R, ea => {
            F(() => "endActivationSuccess");
            X.exit();
            return ea;
          }), T = (0,p.pipe)(T, ea => {
            F(() => "endActivationError");
            X.methodException(ea);
            return ea;
          }), W.setValue(y.CurrentSPC, X.spc)) : W;
        })).chain((0,p.tryFunction)(W => {
          var X;
          let ea = W;
          var Y, ha = q.getTraceContext(N.headers);
          null != ha && (Y = l.Agent.correlation.deserializeLinkFromString(ha.dtTag, ha.traceparent, ha.tracestate));
          var la = 0, ia = !1, fa;
          if (fa = u.UemSensor.isEnabled()) {
            "boolean" === typeof N.isSpdy && N.isSpdy ? (B || (d.info("Disable UEM on SPDY requests"), B = !0), fa = !1) : fa = !0;
          }
          fa ? (V = u.UemSensor.createContext(N, Y), Z = V.isUemWebRequest(), la = V.getServerId(), ia = V.isPathBlocked()) : Z = u.UemSensorContext.handleHealthCheck(N, P);
          if (!Z) {
            ia = H.shouldSuppressPath(N.url, ia, Q);
            ia && null == V || (U = new J(this, N, P, H.sensor, V), a.ServerResponseEmbedder.set(P, U));
            if (!ia) {
              const ca = H.tryStartIncomingAsyncSubPath({sensorId:l.Agent.correlation.SensorId.NODEJS_HTTP_SERVER, functionId:L, category:l.Agent.correlation.MethodCategory.WebRequest, link:Y, attachmentCreator:U, serverId:la, createInitiatorNode:!0});
              null != ca && (ea = W.setValue(y.CurrentSPC, ca.initialSpc), R = (0,p.pipe)(R, da => {
                F(() => "finishInitiatorNodeSuccess");
                null === ca || void 0 === ca ? void 0 : ca.initiatorActivationDone();
                return da;
              }), T = (0,p.pipe)(T, da => {
                null === ca || void 0 === ca ? void 0 : ca.initiatorActivationDone(da);
                return da;
              }));
              Y = void 0;
              try {
                G.requestStart(N, P, null === ca || void 0 === ca ? void 0 : ca.vNodeActivation);
              } catch (da) {
                h.logAgentException(da);
              }
              null != ca ? (Q && (W = ca.vNodeActivation.spc, la = null === (X = ca.initiatorActivation) || void 0 === X ? void 0 : X.spc, X = U.webRequestAttachment, d.debug(`${U}: Handler virt: ${W}, init: ${la}, tag: ${b.Tracing.traceContextToString(ha)}, ${X}`)), U.vNodeActivation = ca.vNodeActivation, U.vNodeActivation.spc.didInitiateAsyncOp = !0, D(N, H.sensor, U), f.installErrorMonitor(N, da => v.attachError(U, da)), f.installErrorMonitor(P, v.responseErrorListener)) : Q && d.debug(`${U}: Handler failed to create activation, tag: ${b.Tracing.traceContextToString(ha)}`);
            }
            if (null != U) {
              P.on("close", v.responseCloseListener);
            }
          }
          null != Y && (Y.purge(), Y = void 0);
          null != V && (Y = l.Agent.correlation.cInvalidPath, ha = 0, Z || null == U || null == U.vNodeActivation || (Y = U.vNodeActivation.spc.path, ha = U.vNodeActivation.serialNo), V.onWebRequest(N, P, Y, ha));
          return ea;
        })).addToErrorHandler(T).addToSuccessHandler(R);
        if (!Z) {
          return H.runFunctionInContext(ba, I, this, ...M);
        }
      };
    }
    shouldSuppressPath(C, E, I) {
      const H = E || !this.sensor.properties.shallCaptureUrl(C);
      H && I && d.debug(`WebRequest: suppress subpath ${C}, uemBlocked: ${E}`);
      return H;
    }
    static responseErrorListener(C) {
      v.attachError(a.ServerResponseEmbedder.get(this), C);
    }
    static attachError(C, E) {
      null != C && C.attachError(E);
    }
    static responseCloseListener() {
      const C = a.ServerResponseEmbedder.get(this);
      null != C && (C.isDebugEnabled && d.debug(`${C}: responseClose`), C.endAsyncExeNode());
    }
  }
  a.ServerRequestTransformer = v;
  class z {
    constructor(C) {
      this.controlParams = C;
    }
    generateSubstitute(C) {
      const E = this;
      return function(...I) {
        var H;
        let F = I[0], K = I[1], L = I[2];
        "function" === typeof F ? (L = F, F = void 0) : "function" === typeof K && (L = K, K = void 0);
        const M = E.controlParams.isDebugEnabled, N = a.ServerResponseEmbedder.get(this), P = G.endCallbackActive(this);
        if (null == N && !P) {
          return M && d.debug("WebRequest: unmonitored end()"), w.doInvoke(this, C.origFn, I);
        }
        M && null != N && d.debug(`${N}: end() argLength: ${I.length}`);
        const Q = null !== (H = null === N || void 0 === N ? void 0 : N.toString()) && void 0 !== H ? H : "WebRequest";
        if (null != (null === N || void 0 === N ? void 0 : N.uemSensorContext) || P) {
          try {
            this.headersSent || this.finished || (M && d.debug(`${Q}: call writeHead(${this.statusCode})`), this.writeHead(this.statusCode));
            var R = !0;
          } catch (T) {
            M && d.debug(`${Q}: end() writeHead has thrown: ${h.verboseExceptionObject(T)}`), R = !1;
          }
        } else {
          R = !0;
        }
        if (R) {
          try {
            if (null != (null === N || void 0 === N ? void 0 : N.uemSensorContext)) {
              N.isResponseEnd = !0;
              const T = N.uemSensorContext.onResponseEnd(F, K);
              null != T && (null != F ? I[0] = T : I = [T, L]);
            }
            G.end(this, F, K);
          } catch (T) {
            h.logAgentException(T);
          }
        }
        I = w.safeInvoke(this, C.origFn, I);
        null === N || void 0 === N ? void 0 : N.endAsyncExeNode();
        M && d.debug(`${Q}: end() didThrow: ${I.didThrow ? h.verboseExceptionObject(I.exception) : "-"}`);
        return I.rethrow();
      };
    }
  }
  a.ServerResponseEndTransformer = z;
  class x {
    constructor(C) {
      this.controlParams = C;
    }
    generateSubstitute(C) {
      const E = this;
      return function(...I) {
        var H, F, K;
        try {
          G.storeHeader(this, I[1]);
        } catch (N) {
          h.logAgentException(N);
        }
        const L = E.controlParams.isDebugEnabled, M = a.ServerResponseEmbedder.get(this);
        if (null == M) {
          return L && d.debug("WebRequest: unmonitored storeHeader()"), w.doInvoke(this, C.origFn, I);
        }
        L && d.debug(`${M}: storeHeader() argLength: ${I.length}`);
        if (2 > I.length) {
          return w.doInvoke(this, C.origFn, I);
        }
        try {
          const N = null === (H = M.vNodeActivation) || void 0 === H ? void 0 : H.spc.path.createCurrentNodeResponseTaggingHeaders();
          if (null != N || null != M.uemSensorContext) {
            const [P, Q] = q.getResponseHeaders(this, I[1]);
            Q || null == P || (I[1] = P);
            L && d.debug(`${M}: Headers before modification: ${null != P ? q.headersToString(P) : "?"}`);
            null === (F = M.uemSensorContext) || void 0 === F ? void 0 : F.onStoreHeaders(M.req, this, null !== P && void 0 !== P ? P : Object.create(null), Q);
            if (null != N && null != P) {
              for (const R in N) {
                q.setResponseHeader(this, P, null !== (K = q.lookupKeyname(P, R)) && void 0 !== K ? K : R, N[R], Q);
              }
            }
            if (L) {
              const R = Q ? q.getResponseHeaders(this, I[1])[0] : P;
              d.debug(`${M}: Headers after modification: ${null != R ? q.headersToString(R) : "?"}`);
            }
          }
        } catch (N) {
          h.logAgentException(N);
        }
        I = w.safeInvoke(this, C.origFn, I);
        L && d.debug(`${M}: storeHeader() didThrow: ${I.didThrow ? h.verboseExceptionObject(I.exception) : "-"}`);
        return I.rethrow();
      };
    }
  }
  a.ResponseStoreHeaderTransformer = x;
  class A {
    constructor(C) {
      this.controlParams = C;
    }
    generateSubstitute(C) {
      const E = this;
      return function(...I) {
        const [H, F] = I;
        try {
          "function" === typeof F ? G.write(this, H) : G.write(this, H, F);
        } catch (M) {
          h.logAgentException(M);
        }
        const K = E.controlParams.isDebugEnabled, L = a.ServerResponseEmbedder.get(this);
        if (null == L) {
          return K && d.debug("WebRequest: unmonitored write()"), w.doInvoke(this, C.origFn, I);
        }
        K && d.debug(`${L}: write() argLength: ${I.length}`);
        if (null != L.uemSensorContext && !L.isResponseEnd) {
          try {
            this.headersSent || this.finished || "number" !== typeof this.statusCode || this.writeHead(this.statusCode);
            const M = L.uemSensorContext.onResponseWrite(...I);
            null != M && (I[0] = M);
          } catch (M) {
            h.logAgentException(M);
          }
        }
        I = w.safeInvoke(this, C.origFn, I);
        K && d.debug(`${L}: write() didThrow: ${I.didThrow ? h.verboseExceptionObject(I.exception) : "-"}`);
        return I.rethrow();
      };
    }
  }
  a.ServerResponseWriteTransformer = A;
});
S("src/lib/transformer/Http2ServerTransformer", "require exports events net src/lib/transformer/EventEmitterTransformerBase src/lib/transformer/ReadableStreamDataTransformer src/lib/transformer/WebRequestTrackerBase src/lib/Agent src/lib/Debug src/lib/Embedder src/lib/FunctionId src/lib/Logger src/lib/Patch src/lib/SubPathContext src/lib/Tracing src/lib/sensors/WebRequestSensor src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/EventUtil src/lib/util/HttpUtil src/lib/util/InvocationUtil".split(" "), 
function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h, f, q, w, G, y) {
  function D(E) {
    const I = v.get(this);
    null != I && (I.isDebugEnabled && d.debug(`${I}: streamCloseListener() headersSent: ${this.headersSent}, errorCode: ${E}`), I.endAsyncExeNode());
  }
  function J(E) {
    const I = v.get(this);
    null != I && I.attachError(E);
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.CreateServerTransformer = a.addCheckForIncomingRequestSuppression = void 0;
  const B = [];
  a.addCheckForIncomingRequestSuppression = function(E) {
    B.includes(E) || B.push(E);
  };
  const v = c.create("ServerHttp2Stream");
  class z extends p.WebRequestTrackerBase {
    constructor(E, I, H, F, K) {
      super("Http2Server", E, K);
      this.stream = I;
      this.headers = H;
    }
    setResponseHeaders(E) {
      var I;
      l.assert(null != this.webRequestAttachment);
      if (f.isObject(E)) {
        if (null === (I = this.webRequestAttachment) || void 0 === I ? 0 : I.valid) {
          try {
            this.webRequestAttachment.fillExitData({statusCode:E[":status"], headers:E});
          } catch (H) {
            q.logAgentException(H);
          }
        } else {
          this.isDebugEnabled && d.debug(`${this}: no valid WebRequestAttachment in setResponseHeaders()`);
        }
      }
    }
    onWebRequestAttachmentCreated() {
      var E, I;
      const H = this.headers, F = {server:this.server, socket:null !== (I = null === (E = this.stream.session) || void 0 === E ? void 0 : E.socket) && void 0 !== I ? I : new t.Socket(), method:H[":method"], url:H[":path"], headers:H};
      this.webRequestAttachment.fillEntryData(F);
      this.headers = void 0;
    }
    fillWebRequestAttachmentExitData() {
      0 < this.streamData.length && this.webRequestAttachment.fillExitData({postData:this.streamData});
    }
  }
  class x {
    constructor(E) {
      this.sensor = E;
      this.serverPatched = !1;
    }
    generateSubstitute(E) {
      const I = this, H = "createSecureServer" === E.functionName ? 1 : 0;
      return function(...F) {
        const K = I.sensor.isDebugEnabled;
        K && d.debug(`Http2Server: ${E.functionName}() hasRequestHandler: ${2 <= F.length}`);
        let L;
        if (!I.serverPatched) {
          try {
            K && d.debug(`Http2Server: ${E.functionName}() delay request listener registration`), F.length > H && "function" === typeof F[H] && (L = F[H], F[H] = void 0);
          } catch (M) {
            q.logAgentException(M);
          }
        }
        F = y.safeInvoke(this, E.origFn, F);
        if (F.didThrow || I.serverPatched) {
          K && d.debug(`Http2Server: ${E.functionName}() exit with exception: ${F.exception}`);
        } else {
          try {
            const M = F.retVal;
            if (M instanceof u.EventEmitter) {
              K && d.debug(`Http2Server: ${E.functionName}() patching ${M.constructor && M.constructor.name}`);
              const N = new e.ModuleSpec(M.constructor.name, M.constructor.prototype);
              (new A(I.sensor)).applyTransformation(N);
              if (null != L) {
                M.on("request", L);
              }
              I.serverPatched = !0;
            } else {
              d.info(`Http2Server: ${E.functionName}() skip patching server as it is no emitter: ${M && M.constructor && M.constructor.name}`);
            }
          } catch (M) {
            q.logAgentException(M);
          }
        }
        return F.rethrow();
      };
    }
  }
  a.CreateServerTransformer = x;
  class A extends r.EventEmitterTransformerBase {
    constructor(E) {
      super(E, "stream");
      this.sensor = E;
    }
    shallWrap() {
      return !0;
    }
    getWrappedListener(E, I, H) {
      const F = this;
      F.controlParams.isDebugEnabled && d.debug(`Http2Server: getWrappedListener(${I.toString()}) cnt: ${E.listenerCount(I)}`);
      E = r.EventEmitterTransformerBase.getUnwrappedListener(H);
      const K = new m.FunctionId(E);
      return function(...L) {
        var M;
        const N = L[0], P = L[1], Q = L[3], R = F.controlParams.isDebugEnabled;
        R && d.debug("Http2Server: onStream enter");
        if (!F.controlParams.active) {
          return R && d.debug("Http2Server: onStream exit - inactive"), y.doInvoke(this, H, L);
        }
        var T = v.get(N);
        if (null != T) {
          R && d.debug(`${T}: onStream: already patched, currSpc: ${b.SubPathContext.getActiveContext()}, vNode: ${T.vNodeActivation}`);
          if (null == T.vNodeActivation) {
            return y.doInvoke(this, H, L);
          }
          let ba;
          try {
            ba = T.vNodeActivation.spc.createActivation({sensorId:k.Agent.correlation.SensorId.NODEJS_HTTP2_SERVER, functionId:K, mode:1}), null === ba || void 0 === ba ? void 0 : ba.spc.activate();
          } catch (W) {
            q.logAgentException(W);
          }
          var U = y.safeInvoke(this, H, L);
          try {
            null != ba && (ba.spc.deactivate(), ba.exitOrException(U.exception));
          } catch (W) {
            q.logAgentException(W);
          }
          R && d.debug(`${T}: onStream exit didThrow: ${U.didThrow ? q.verboseExceptionObject(U.exception) : "-"}`);
          return U.rethrow();
        }
        try {
          if (!F.shouldSuppress(P)) {
            let ba;
            const W = G.getTraceContext(P);
            null != W && (ba = k.Agent.correlation.deserializeLinkFromString(W.dtTag, W.traceparent, W.tracestate));
            T = new z(this, N, P, Q, F.sensor);
            U = F.tryStartIncomingAsyncSubPath({sensorId:k.Agent.correlation.SensorId.NODEJS_HTTP2_SERVER, functionId:K, category:k.Agent.correlation.MethodCategory.WebRequest, link:ba, attachmentCreator:T});
            if (null != U) {
              if (R) {
                const X = U.vNodeActivation.spc, ea = null === (M = U.initiatorActivation) || void 0 === M ? void 0 : M.spc, Y = T.webRequestAttachment;
                d.debug(`${T}: onStream virt: ${X}, init: ${ea}, tag: ${g.Tracing.traceContextToString(W)}, ${Y}`);
              }
              T.vNodeActivation = U.vNodeActivation;
              T.vNodeActivation.spc.didInitiateAsyncOp = !0;
              v.set(N, T);
              F.patchResponseApis(T, N);
              var V = F.sensor;
              if (G.shallCapturePostRequestParameters(P[":method"], P, V.properties)) {
                var Z = new e.ModuleSpec("ServerHttp2Stream", N);
                (new n.ReadableStreamDataTransformer(V, h.WebRequestSensor.cPostDataCaptureSize, T)).applyTransformation(Z);
              } else {
                if (V.isDebugEnabled) {
                  const X = V.properties;
                  d.debug(`${T}: skip capturing POST data, method=${P[":method"]}, all=${X.captureAllRequestParameters}, list=${X.requestParametersToCapture}, ct=${P["content-type"] || "no content-type"}`);
                }
              }
              w.installErrorMonitor(N, J);
              N.on("close", D);
            } else {
              R && d.debug(`${T}: onStream failed to create activation, tag: ${g.Tracing.traceContextToString(W)}`);
            }
          }
        } catch (ba) {
          q.logAgentException(ba);
        }
        L = y.safeInvoke(this, H, L);
        try {
          null === U || void 0 === U ? void 0 : U.initiatorActivationDone(L.exception);
        } catch (ba) {
          q.logAgentException(ba);
        }
        R && d.debug(`Http2Server: onStream exit didThrow: ${L.didThrow ? q.verboseExceptionObject(L.exception) : "-"}`);
        return L.rethrow();
      };
    }
    patchResponseApis(E, I) {
      if (!A.respondPatched) {
        A.respondPatched = !0;
        I = I.constructor.prototype;
        var H = [{name:"respond", headersParamIdx:0}, {name:"respondWithFD", headersParamIdx:1}, {name:"respondWithFile", headersParamIdx:1}];
        for (const F of H) {
          H = new e.FunctionSpec(F.name, "ServerHttp2Stream", I);
          const K = new C(this.sensor, F.headersParamIdx);
          null == e.applyToSingle(H, K) && d.warning(`${E}: Failed to patch ServerHttp2Stream.${F.name}`);
        }
      }
    }
    shouldSuppress(E) {
      const I = E[":path"];
      if (!this.sensor.properties.shallCaptureUrl(I)) {
        return this.isDebugEnabled && d.debug(`Http2Server:: suppress path for: ${I}`), !0;
      }
      E = E["content-type"];
      if ("string" === typeof E) {
        for (const H of B) {
          if (H(E)) {
            return this.isDebugEnabled && d.debug(`Http2Server:: suppress path for content-type: ${E}`), !0;
          }
        }
      }
      return !1;
    }
  }
  A.respondPatched = !1;
  class C {
    constructor(E, I) {
      this.sensor = E;
      this.headersParamIdx = I;
    }
    generateSubstitute(E) {
      const I = this;
      return function(...H) {
        var F, K;
        const L = I.sensor.isDebugEnabled, M = v.get(this);
        if (null == M) {
          return L && d.debug("Http2Server: unmonitored respond()"), y.doInvoke(this, E.origFn, H);
        }
        L && d.debug(`${M}: respond() argLength: ${H.length}`);
        try {
          const N = null === (F = M.vNodeActivation) || void 0 === F ? void 0 : F.spc.path.createCurrentNodeResponseTaggingHeaders();
          if (null != N) {
            const P = Object.assign(Object.create(null), H[I.headersParamIdx]);
            L && d.debug(`${M}: Headers before modification: ${G.headersToString(P)}`);
            for (const Q in N) {
              const R = null !== (K = G.lookupKeyname(P, Q)) && void 0 !== K ? K : Q;
              P[R] = N[Q];
            }
            L && d.debug(`${M}: Headers after modification: ${G.headersToString(P)}`);
            H[I.headersParamIdx] = P;
          }
        } catch (N) {
          q.logAgentException(N);
        }
        F = y.safeInvoke(this, E.origFn, H);
        try {
          F.didThrow || H.length > I.headersParamIdx && M.setResponseHeaders(H[I.headersParamIdx]);
        } catch (N) {
          q.logAgentException(N);
        }
        L && d.debug(`${M}: respond() didThrow: ${F.didThrow ? q.verboseExceptionObject(F.exception) : "-"}`);
        return F.rethrow();
      };
    }
  }
});
S("src/lib/sensors/WebRequestSensor", "require exports src/lib/sensors/SensorBase src/lib/sensors/WebRequestSensorProperties src/lib/transformer/HttpServerTransformer src/lib/transformer/Http2ServerTransformer src/lib/Debug src/lib/Logger src/lib/Patch src/lib/RunTimeProperty src/lib/util/ErrorUtil util".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.WebRequestSensor = a.WebRequestSensorApi = a.WebRequestSubRoute = void 0;
  const e = new c.BooleanProperty("Http2ServerInstrumentationEnabled", !1);
  class b {
    constructor(h, f, q) {
      this.id = h;
      this.path = f;
      this.regexp = q;
    }
    static make(h, f) {
      if ("string" === typeof h) {
        return new b(f, h);
      }
      if (d.types.isRegExp(h)) {
        return new b(f, void 0, h);
      }
    }
    get route() {
      var h;
      return null != this.regexp ? `RegExp(${this.regexp})` : null !== (h = this.path) && void 0 !== h ? h : "";
    }
    static pathOrRegexToString(h) {
      return d.types.isRegExp(h) ? `RegExp(${h})` : null !== h && void 0 !== h ? h : "";
    }
  }
  a.WebRequestSubRoute = b;
  (function(h) {
    h.isMonitored = function(f) {
      f = r.ServerResponseEmbedder.get(f);
      return null != (null === f || void 0 === f ? void 0 : f.vNodeActivation) && !f.vNodeActivation.isExited;
    };
    h.attachError = function(f, q) {
      (f = r.ServerResponseEmbedder.get(f)) && f.attachError(q);
    };
    h.addSubRoute = function(f, q) {
      null != q && (f = r.ServerResponseEmbedder.get(f)) && f.addSubRoute(q);
    };
    h.attachRoute = function(f, q) {
      null != q && (f = r.ServerResponseEmbedder.get(f)) && f.attachRoute(b.pathOrRegexToString(q));
    };
  })(a.WebRequestSensorApi || (a.WebRequestSensorApi = {}));
  class g extends u.SensorBase {
    constructor(h, f) {
      super(h, f);
      this.properties = new t.WebRequestSensorProperties(f);
    }
    applyInstrumentation(h) {
      const f = h.request, q = [];
      switch(f) {
        case "http":
          this.transformRegisterRequest(h);
          this.transformResponseStoreHeader(h, q);
          this.transformResponseWrite(h, q);
          this.transformResponseEnd(h, q);
          break;
        case "https":
          this.transformRegisterRequest(h);
          break;
        case "http2":
        case "node:http2":
          e.value || this.properties.enableHttp2Transformer ? (this.transformHttp2CreateSecureServer(h, q), this.transformHttp2CreateServer(h, q)) : k.info("Instrumenting HTTP2 server is disabled");
          break;
        default:
          k.warning(`Unexpected WebRequestSensor.applyInstrumentation(${f}`);
      }
      0 < q.length && m.reportInstrumentationError(this, q);
    }
    updateState(h) {
      super.updateState(h);
      this.properties.update(h);
    }
    transformRegisterRequest(h) {
      h = new l.ModuleSpec("Server", h.moduleExports.Server.prototype);
      (new r.ServerRequestTransformer(this)).applyTransformation(h);
    }
    transformResponseStoreHeader(h, f) {
      const q = new l.FunctionSpec("_storeHeader", "ServerResponse", h.moduleExports.ServerResponse.prototype), w = new r.ResponseStoreHeaderTransformer(this);
      null == l.applyToSingle(q, w, l.cPolymorphicDefaultOptions) && (k.warning(`Failed to patch ${h.request}.ServerResponse._storeHeader`), p.fail(), f.push(`${q.module}.${q.qualifiedName}`));
    }
    transformResponseWrite(h, f) {
      const q = new l.FunctionSpec("write", "ServerResponse", h.moduleExports.ServerResponse.prototype), w = new r.ServerResponseWriteTransformer(this);
      null == l.applyToSingle(q, w, l.cPolymorphicDefaultOptions) && (k.warning(`Failed to patch ${h.request}.ServerResponse.write`), p.fail(), f.push(`${q.module}.${q.qualifiedName}`));
    }
    transformResponseEnd(h, f) {
      const q = new l.FunctionSpec("end", "ServerResponse", h.moduleExports.ServerResponse.prototype), w = new r.ServerResponseEndTransformer(this);
      null == l.applyToSingle(q, w, l.cPolymorphicDefaultOptions) && (k.warning(`Failed to patch ${h.request}.ServerResponse.end`), p.fail(), f.push(`${q.module}.${q.qualifiedName}`));
    }
    transformHttp2CreateSecureServer(h, f) {
      const q = new l.FunctionSpec("createSecureServer", "", h.moduleExports), w = new n.CreateServerTransformer(this);
      null == l.applyToSingle(q, w) && (k.warning(`Failed to patch ${h.request}.createSecureServer`), p.fail(), f.push(`${q.module}.${q.qualifiedName}`));
    }
    transformHttp2CreateServer(h, f) {
      const q = new l.FunctionSpec("createServer", "", h.moduleExports), w = new n.CreateServerTransformer(this);
      null == l.applyToSingle(q, w) && (k.warning(`Failed to patch ${h.request}.createServer`), p.fail(), f.push(`${q.module}.${q.qualifiedName}`));
    }
  }
  g.cPostDataCaptureSize = 20000;
  a.WebRequestSensor = g;
});
S("src/lib/sensors/ClientWebRequestSensorProperties", "require exports src/lib/sensors/UriRuleSensorProperty src/lib/Logger src/lib/util/CoreUtil src/lib/util/HttpUtil".split(" "), function(O, a, u, t, r, n) {
  function p(e, b) {
    return "boolean" === typeof e ? e : b;
  }
  function k(e, b) {
    return Array.isArray(e) ? n.toStringArrayLc(e) : b;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ClientWebRequestSensorProperties = void 0;
  const l = [], c = [], m = [];
  class d {
    constructor(e) {
      this.theCaptureAllResponseHeaders = this.theCaptureAllRequestHeaders = !1;
      this.theRequestHeadersToCapture = l;
      this.theResponseHeadersToCapture = c;
      this.theUriRulesWhiteList = this.theEnableFetchTransformer = this.theEnableHttp2Transformer = !1;
      this.theUriRules = m;
      this.update(e);
    }
    update(e) {
      r.hasProperty(e, "sensorProperties") ? (e = e.sensorProperties, this.theCaptureAllRequestHeaders = p(e.captureAllRequestHeaders, !1), this.theCaptureAllResponseHeaders = p(e.captureAllResponseHeaders, !1), this.theRequestHeadersToCapture = k(e.requestHeadersToCapture, l), this.theResponseHeadersToCapture = k(e.responseHeadersToCapture, c), this.theEnableHttp2Transformer = p(e.enableHttp2Transformer, !1), this.theUriRulesWhiteList = p(e.uriRulesWhiteList, !1), this.theUriRules = (0,u.parseUriRules)(e.uriRules, 
      "ClientWebRequestSensorConfig.sensorProperties")) : t.info("ClientWebRequestSensorConfig has no sensorProperties field");
    }
    get captureAllRequestHeaders() {
      return this.theCaptureAllRequestHeaders;
    }
    get requestHeadersToCapture() {
      return this.theRequestHeadersToCapture;
    }
    get captureAllResponseHeaders() {
      return this.theCaptureAllResponseHeaders;
    }
    get responseHeadersToCapture() {
      return this.theResponseHeadersToCapture;
    }
    get enableHttp2Transformer() {
      return this.theEnableHttp2Transformer;
    }
    get enableFetchTransformer() {
      return this.theEnableFetchTransformer;
    }
    get uriRulesWhiteList() {
      return this.theUriRulesWhiteList;
    }
    get uriRules() {
      return this.theUriRules;
    }
    shallCaptureRequestHeaders() {
      return this.theCaptureAllRequestHeaders || 0 < this.theRequestHeadersToCapture.length;
    }
    shallCaptureResponsetHeaders() {
      return this.theCaptureAllResponseHeaders || 0 < this.theResponseHeadersToCapture.length;
    }
    shallCaptureUrl(e) {
      if ("string" !== typeof e || 0 === this.theUriRules.length) {
        return !this.theUriRulesWhiteList;
      }
      let b = "", g = e;
      const h = e.indexOf("?");
      if (-1 !== h) {
        g = e.substring(0, h);
        const f = e.indexOf("#", h);
        b = -1 !== f ? e.substring(h + 1, f) : e.substring(h + 1);
      }
      e = this.theUriRules.some(f => f.match(g, b));
      return this.theUriRulesWhiteList ? e : !e;
    }
  }
  a.ClientWebRequestSensorProperties = d;
});
S("src/lib/util/UrlUtil", ["require", "exports", "url"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.parseURL = void 0;
  a.parseURL = function(t, r) {
    try {
      return new u.URL(t, r);
    } catch (n) {
      let p;
      try {
        p = u.parse(t);
      } catch (k) {
      }
      return {protocol:(null === p || void 0 === p ? void 0 : p.protocol) || "", hostname:(null === p || void 0 === p ? void 0 : p.hostname) || "", pathname:(null === p || void 0 === p ? void 0 : p.pathname) || "", search:(null === p || void 0 === p ? void 0 : p.search) || "", port:(null === p || void 0 === p ? void 0 : p.port) || ""};
    }
  };
});
S("src/lib/sensors/ClientWebRequestAttachment", "require exports src/lib/Agent src/lib/AttachmentBase src/lib/util/CoreUtil src/lib/util/HttpUtil src/lib/util/UrlUtil".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ClientWebRequestAttachment = void 0;
  class k extends t.AttachmentBase {
    constructor(l, c) {
      super(l, u.Agent.correlation.AttachmentId.CLIENT_WEBREQUEST_ID, 0);
      this.sensorProperties = c;
      this.maxStrLen = n.getWebRequestMaxStringLen();
    }
    fillEntryData(l, c) {
      const m = c ? 443 : 80;
      c = c ? "https:" : "http:";
      const d = l.protocol || c, e = l.hostname || l.host || "localhost", b = "string" === typeof l.method && l.method.toUpperCase() || "GET", g = null == l.port ? m : +l.port;
      let h = "", f = "/", q = -1;
      l.path && (h = f = `${l.path}`, q = f.indexOf("?"), -1 !== q && (f = f.substr(0, q)));
      const w = `${d}//${e}` + (g === m && d === c ? "" : `:${g}`) + f;
      this.setMultipleFields(G => {
        const y = u.Agent.correlation.AttachmentFieldId;
        G.stringCached(y.CLIENT_WEB_REQUEST_URI, w, this.maxStrLen);
        G.stringCached(y.CLIENT_WEB_REQUEST_METHOD, b, this.maxStrLen);
        G.stringCached(y.CLIENT_WEB_REQUEST_HOSTNAME, e, this.maxStrLen);
        G.integer(y.CLIENT_WEB_REQUEST_PORTNO, g);
        if (null != l.headers && !this.willGetLateEntryData(l.headers)) {
          const {captureAllRequestHeaders:D, requestHeadersToCapture:J} = this.sensorProperties;
          n.fillOutgoingHeaders(G, y.CLIENT_WEB_REQUEST_REQUEST_HEADER, l.headers, D, J);
          -1 !== q && G.stringCached(y.CLIENT_WEB_REQUEST_QUERY, h.substr(q + 1), this.maxStrLen);
        }
      });
    }
    fillLateEntryData(l) {
      var c = u.Agent.correlation.AttachmentFieldId;
      if (l.path) {
        var m = p.parseURL(`scheme://host/${l.path}`);
        1 < m.search.length && this.setStringCached(c.CLIENT_WEB_REQUEST_QUERY, m.search.slice(1), this.maxStrLen);
      }
      m = this.sensorProperties;
      if (m.shallCaptureRequestHeaders()) {
        const {captureAllRequestHeaders:d, requestHeadersToCapture:e} = m;
        m = l.getHeaderNames();
        c = c.CLIENT_WEB_REQUEST_REQUEST_HEADER;
        for (const b of m) {
          if (m = b.toLowerCase(), d || -1 !== e.indexOf(m)) {
            const g = l.getHeader(b);
            if (Array.isArray(g)) {
              for (const h of g) {
                null != h && this.setKeyValueCached(c, m, `${h}`, this.maxStrLen);
              }
            } else {
              null != g && this.setKeyValueCached(c, m, `${g}`, this.maxStrLen);
            }
          }
        }
      }
    }
    fillExitData(l) {
      this.setMultipleFields(c => {
        const m = u.Agent.correlation.AttachmentFieldId, d = l.statusCode;
        "number" === typeof d && c.integer(m.CLIENT_WEB_REQUEST_RESPONSECODE, d);
        if (null != l.headers) {
          const {captureAllResponseHeaders:e, responseHeadersToCapture:b} = this.sensorProperties;
          c.map(m.CLIENT_WEB_REQUEST_RESPONSE_HEADER, l.headers, e ? void 0 : b, this.maxStrLen);
        }
      });
    }
    willGetLateEntryData(l) {
      if (Array.isArray(l)) {
        return !1;
      }
      if (r.isObject(l)) {
        for (const c in l) {
          if ("expect" === c.toLowerCase()) {
            return !1;
          }
        }
      }
      return !0;
    }
  }
  a.ClientWebRequestAttachment = k;
});
S("src/lib/transformer/HttpClientTransformer", "require exports url src/lib/Agent src/lib/Embedder src/lib/FunctionId src/lib/Logger src/lib/SubPathContext src/lib/Tracing src/lib/sensors/ClientWebRequestAttachment src/lib/sensors/SensorConstants src/lib/transformer/EventEmitterTransformerBase src/lib/transformer/TransformerBase src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/EventUtil src/lib/util/HttpUtil src/lib/util/InvocationUtil src/lib/util/UrlUtil src/lib/util/UniqueId src/lib/contextmanager/ContextManager".split(" "), 
function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h, f, q, w, G, y) {
  function D(C) {
    try {
      const E = this.listenerCount("response");
      1 >= E ? C._dump() : p.warning(`ClientWebRequest: dummyOnResponse but cnt is ${E}`);
    } catch (E) {
    }
  }
  function J(C) {
    return {protocol:C.protocol, hostname:C.hostname, path:C.pathname + C.search, port:"" !== C.port ? C.port : void 0};
  }
  function B(C, E) {
    "string" === typeof C ? C = J(w.parseURL(C)) : null != C && C instanceof u.URL ? C = J(C) : (E = C, C = {});
    "function" === typeof E && (E = void 0);
    return Object.assign(C, E);
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ClientRequestEmitterTransformer = a.ClientRequestStoreHeadersTransformer = a.RequestTransformer = a.normalizeOptions = void 0;
  class v {
    constructor(C, E, I) {
      this.reqOpts = C;
      this.isHttps = E;
      this.sensor = I;
      this.onRequestInjected = !1;
      this.id = G.UniqueId.getNext();
    }
    createAttachments(C) {
      C = new c.ClientWebRequestAttachment(C, this.sensor.properties);
      if (C.valid) {
        this.attachment = C;
        try {
          C.fillEntryData(this.reqOpts, this.isHttps);
        } catch (E) {
          g.logAgentException(E);
        }
      } else {
        this.sensor.isDebugEnabled && p.debug(`${this}: fillEntryData() - failed to create attachment`);
      }
    }
    fillAttachmentLateEntryData() {
      if (null != this.attachment && null != this.theClientRequest) {
        try {
          this.attachment.fillLateEntryData(this.theClientRequest);
        } catch (C) {
          g.logAgentException(C);
        }
      }
    }
    fillAttachmentExitData(C) {
      if (null != this.attachment) {
        try {
          this.attachment.fillExitData(C);
        } catch (E) {
          g.logAgentException(E);
        }
      }
    }
    set clientRequest(C) {
      v.embedder.set(C, this);
      this.theClientRequest = C;
    }
    endAsyncSubPath() {
      null != this.vNodeActivation && (this.vNodeActivation.spc.end(), this.vNodeActivation = void 0, null != this.theClientRequest && v.embedder.clear(this.theClientRequest), this.theClientRequest = void 0);
    }
    toString() {
      this.logPrefix || (this.logPrefix = `ClientWebRequest ${G.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
    static getTracker(C) {
      return v.embedder.get(C) || v.activeTracker;
    }
  }
  v.activeTracker = void 0;
  v.embedder = r.create("clientRequest");
  a.normalizeOptions = B;
  class z extends e.TransformerBase {
    constructor(C, E) {
      super(C);
      this.sensor = C;
      this.isHttps = E;
    }
    generateSubstitute(C) {
      const E = this, I = new n.FunctionId(C);
      return function(...H) {
        const F = E.controlParams.isDebugEnabled, K = E.debugLogger.bind(E);
        K(() => `ClientWebRequest: request() argsCnt: ${H.length}`);
        const L = H[0], M = H[1], N = H[H.length - 1];
        "function" === typeof N && (H[H.length - 1] = y.ContextManager.bindToCurrentContext(N));
        const P = e.TransformerBase.emptyRunConfig();
        P.chain((0,e.bailIf)(!E.controlParams.active, "ClientWebRequest: request() exit - inactive", E)).chain((0,e.tryFunction)(Q => {
          const R = B(L, M);
          if (E.sensor.properties.shallCaptureUrl(R.path)) {
            const U = new v(R, E.isHttps, E.sensor), V = E.tryStartAsyncActivation({sensorId:t.Agent.correlation.SensorId.NODEJS_HTTP_CLIENT, functionId:I, attachmentCreator:U, createInitiatorNode:!1});
            if (null != V) {
              U.vNodeActivation = V.vNodeActivation;
              Q = Q.setValue(y.CurrentSPC, V.initialSpc);
              var T = f.getTraceContextFromRequest(R, K);
              let Z = V.vNodeActivation.spc.createAddSerializeLink(!0, l.Tracing.getHttpTaggingMode(), T);
              K(() => `${U}: request() virt: ${V.vNodeActivation.spc}, tag: ${l.Tracing.traceContextToString(Z)}, ${U.attachment}`);
              null != Z && ((T = new l.Tracing(Z), L instanceof u.URL || !b.hasProperty(L, "headers")) ? "function" !== typeof M && b.hasProperty(M, "headers") && (T = z.addTaggingHeadersToOptions(T, M, F), null != T && (H[1] = T, Z = void 0)) : (T = z.addTaggingHeadersToOptions(T, L, F), null != T && (H[0] = T, Z = void 0)));
              v.activeTracker = U;
              P.addToErrorHandler(E.onResultWithAction(() => v.activeTracker = void 0));
              P.addToSuccessHandler(E.onResultWithAction(() => v.activeTracker = void 0));
              P.addToErrorHandler(ba => {
                b.isError(ba) && z.closeAsyncExePathWithException(U, ba);
                return ba;
              });
              P.addToSuccessHandler(ba => {
                const W = ba.retVal;
                U.clientRequest = W;
                h.installErrorMonitor(W, X => z.closeAsyncExePathWithException(U, X));
                if (null != Z) {
                  const X = new l.Tracing(Z);
                  X.httpUseDtTagging() && W.setHeader(m.cDtTaggingHeader, X.dtTag);
                  X.httpUseTraceParent() && W.setHeader(m.cW3cTraceParent, X.traceParent);
                  X.httpUseTraceState() && W.setHeader(m.cW3cTraceState, X.traceState);
                }
                K(() => `${U.toString()}: request() exit didThrow: -}`);
                return ba;
              });
            } else {
              K(() => `${U}: request() no method activation, active spc: ${k.SubPathContext.getActiveContext()}`);
            }
          } else {
            K(() => `ClientWebRequest: suppress path for: ${R.path}`);
          }
          return Q;
        }));
        return E.runFunctionInContext(P, C.origFn, this, ...H);
      };
    }
    static addTaggingHeadersToOptions(C, E, I) {
      let H;
      Array.isArray(E.headers) ? (H = Object.assign(Object.create(null), E), H.headers = H.headers.slice(0), C.httpUseDtTagging() && f.addOrChangeArrayHeader(H.headers, m.cDtTaggingHeader, C.dtTag), C.httpUseTraceParent() && f.addOrChangeArrayHeader(H.headers, m.cW3cTraceParent, C.traceParent), C.httpUseTraceState() && f.addOrChangeArrayHeader(H.headers, m.cW3cTraceState, C.traceState)) : b.isObject(E.headers) ? (H = Object.assign({}, E), H.headers = Object.assign({}, H.headers), C.httpUseDtTagging() && 
      f.addOrChangeObjectProperty(H.headers, m.cDtTaggingHeader, C.dtTag), C.httpUseTraceParent() && f.addOrChangeObjectProperty(H.headers, m.cW3cTraceParent, C.traceParent), C.httpUseTraceState() && f.addOrChangeObjectProperty(H.headers, m.cW3cTraceState, C.traceState)) : I && p.debug(`ClientWebRequest: headers property present in options but unknown type: ${typeof E.headers}`);
      return H;
    }
    static closeAsyncExePathWithException(C, E) {
      let I;
      if (null != C.vNodeActivation) {
        try {
          I = C.vNodeActivation.spc, C.vNodeActivation.methodException(E), C.endAsyncSubPath();
        } catch (H) {
          g.logAgentException(H);
        }
      }
      C.sensor.isDebugEnabled && p.debug(`${C}: closeAsyncExePathWithException() spc: ${I}, err: ${g.verboseExceptionObject(E)}`);
    }
  }
  a.RequestTransformer = z;
  class x {
    constructor(C) {
      this.controlParams = C;
    }
    generateSubstitute(C) {
      const E = this;
      return function(...I) {
        try {
          const H = E.controlParams.isDebugEnabled, F = v.getTracker(this);
          null != F ? (H && p.debug(`${F}: _storeHeadersSubstitute()`), 0 === this.listenerCount("response") && (this.on("response", D), F.onRequestInjected = !0, H && p.debug(`${F}: installed dummy response listener`)), F.fillAttachmentLateEntryData()) : H && p.debug("ClientWebRequest: unmonitored _storeHeadersSubstitute()");
        } catch (H) {
          g.logAgentException(H);
        }
        return q.doInvoke(this, C.origFn, I);
      };
    }
  }
  a.ClientRequestStoreHeadersTransformer = x;
  class A extends d.EventEmitterTransformerBase {
    constructor(C) {
      super(C, "response");
    }
    shallWrap(C) {
      return null != v.getTracker(C);
    }
    getWrappedListener(C, E, I) {
      const H = this, F = v.getTracker(C);
      if (null == F) {
        return I;
      }
      F.onRequestInjected && (C.removeListener("response", D), F.onRequestInjected = !1);
      return function(...K) {
        const L = H.debugLogger.bind(H), M = K[0], N = e.TransformerBase.emptyRunConfig();
        N.chain((0,e.bailIf)(null == F.vNodeActivation, `${F}: onResponse() vNode already closed status: ${M.statusCode}`, H)).chain((0,e.tryFunction)(P => {
          null != M.statusCode && (F.fillAttachmentExitData(M), f.setResponseTaggingHeaders(M.headers, F.vNodeActivation));
          F.vNodeActivation.exit();
          F.endAsyncSubPath();
          N.addToErrorHandler(Q => {
            L(() => `${F}: onResponse() status: ${M.statusCode}, didThrow: ${g.verboseExceptionObject(Q)}`);
            return Q;
          });
          N.addToSuccessHandler(Q => {
            L(() => `${F}: onResponse() status: ${M.statusCode}, didThrow: -`);
            return Q;
          });
          return P;
        }));
        return H.runFunction(N, I, this, ...K);
      };
    }
  }
  a.ClientRequestEmitterTransformer = A;
});
S("src/lib/transformer/Http2ClientTransformer", "require exports src/lib/transformer/EventEmitterTransformerBase src/lib/transformer/TransformerBase src/lib/Agent src/lib/AttachmentBase src/lib/Embedder src/lib/FunctionId src/lib/Logger src/lib/Patch src/lib/SubPathContext src/lib/Tracing src/lib/util/CoreUtil src/lib/util/EventUtil src/lib/util/ErrorUtil src/lib/util/HttpUtil src/lib/util/InvocationUtil src/lib/util/UniqueId src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, 
r, n, p, k, l, c, m, d, e, b, g, h, f, q, w) {
  function G() {
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ConnectTransformer = a.SymbolExtractor = a.ClientWebRequestAttachment = a.addCheckForOutgoingRequestSuppression = void 0;
  const y = [];
  a.addCheckForOutgoingRequestSuppression = function(C) {
    y.includes(C) || y.push(C);
  };
  class D extends n.AttachmentBase {
    constructor(C, E) {
      super(C, r.Agent.correlation.AttachmentId.CLIENT_WEBREQUEST_ID, 0);
      this.sensorProperties = E;
      this.maxStrLen = h.getWebRequestMaxStringLen();
    }
    fillEntryData(C = "https:", E = "localhost", I) {
      this.setMultipleFields(H => {
        I = e.isObject(I) ? I : {};
        let F;
        switch(C.toLowerCase()) {
          case "https:":
            F = 443;
            break;
          case "http:":
            F = 80;
        }
        var K = I[":authority"];
        "string" !== typeof K && (K = E);
        let L = "localhost", M = F;
        if ("string" === typeof K) {
          var N = K.indexOf(":");
          -1 !== N ? (L = K.substr(0, N), M = +K.substr(N + 1)) : L = K;
        }
        K = "string" === typeof I[":method"] ? I[":method"] : "GET";
        N = "/";
        let P;
        if (null != I[":path"]) {
          var Q = `${I[":path"]}`;
          const R = Q.indexOf("?");
          -1 !== R ? (N = Q.substr(0, R), P = Q.substr(R + 1)) : N = Q;
        }
        Q = r.Agent.correlation.AttachmentFieldId;
        H.stringCached(Q.CLIENT_WEB_REQUEST_URI, `${C}//${L}` + (M === F ? "" : `:${M}`) + N, this.maxStrLen);
        H.stringCached(Q.CLIENT_WEB_REQUEST_METHOD, K, this.maxStrLen);
        H.stringCached(Q.CLIENT_WEB_REQUEST_HOSTNAME, L, this.maxStrLen);
        null != M && H.integer(Q.CLIENT_WEB_REQUEST_PORTNO, M);
        null != P && this.setStringCached(Q.CLIENT_WEB_REQUEST_QUERY, P, this.maxStrLen);
        this.sensorProperties.shallCaptureRequestHeaders() && h.fillOutgoingHeaders(H, Q.CLIENT_WEB_REQUEST_REQUEST_HEADER, I, this.sensorProperties.captureAllRequestHeaders, this.sensorProperties.requestHeadersToCapture);
      });
    }
    fillExitData(C) {
      this.setMultipleFields(E => {
        const I = r.Agent.correlation.AttachmentFieldId, H = C[":status"];
        "number" === typeof H && E.integer(I.CLIENT_WEB_REQUEST_RESPONSECODE, H);
        const {captureAllResponseHeaders:F, responseHeadersToCapture:K} = this.sensorProperties;
        E.map(I.CLIENT_WEB_REQUEST_RESPONSE_HEADER, C, F ? void 0 : K, this.maxStrLen);
      });
    }
  }
  a.ClientWebRequestAttachment = D;
  class J {
    constructor(C, E, I) {
      this.clientSession = C;
      this.headers = E;
      this.sensor = I;
      this.onRequestInjected = !1;
      this.id = q.UniqueId.getNext();
    }
    createAttachments(C) {
      C = new D(C, this.sensor.properties);
      if (C.valid) {
        this.attachment = C;
        try {
          C.fillEntryData(this.clientSession[v.kProtocol], this.clientSession[v.kAuthority], this.headers);
        } catch (E) {
          g.logAgentException(E);
        }
      } else {
        this.sensor.isDebugEnabled && l.debug(`${this}: fillEntryData() - failed to create attachment`);
      }
    }
    fillAttachmentExitData(C) {
      if (null != this.attachment) {
        try {
          this.attachment.fillExitData(C);
        } catch (E) {
          g.logAgentException(E);
        }
      }
    }
    set clientStream(C) {
      J.embedder.set(C, this);
      this.theClientStream = C;
    }
    endAsyncSubPath() {
      null != this.vNodeActivation && (this.vNodeActivation.spc.end(), this.vNodeActivation = void 0, null != this.theClientStream && J.embedder.clear(this.theClientStream), this.theClientStream = void 0);
    }
    toString() {
      this.logPrefix || (this.logPrefix = `ClientWebRequest ${q.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
    static getTracker(C) {
      return J.embedder.get(C);
    }
  }
  J.embedder = p.create("clientStream");
  class B {
    constructor(C) {
      this.kProtocol = this.kAuthority = this.dummySymbol = Symbol("Dummy");
      try {
        const E = Object.getOwnPropertySymbols(C);
        for (const I of E) {
          switch(I.toString()) {
            case "Symbol(authority)":
              this.kAuthority = I;
              break;
            case "Symbol(protocol)":
              this.kProtocol = I;
          }
        }
      } catch (E) {
        g.logAgentException(E);
      }
    }
  }
  a.SymbolExtractor = B;
  let v;
  class z extends t.TransformerBase {
    constructor(C) {
      super(C);
      this.sensor = C;
      this.connectPatched = !1;
    }
    generateSubstitute(C) {
      const E = this, I = E.debugLogger.bind(E);
      return function(...H) {
        I(() => `Http2Client: connect(): ${H.length}`);
        const F = t.TransformerBase.emptyRunConfig();
        F.chain((0,t.bailIf)(E.connectPatched, "ConnectTransformer: connect already patched", E)).chain((0,t.tryFunction)(K => {
          F.addToSuccessHandler(L => {
            const M = L.retVal;
            if (f.isEventEmitter(M)) {
              I(() => {
                var Q;
                return `Http2Client: connect() patching ${null === (Q = M.constructor) || void 0 === Q ? void 0 : Q.name}`;
              });
              null == v && (v = new B(M));
              var N = new c.FunctionSpec("request", "ClientHttp2Session", M.constructor.prototype);
              const P = new x(E.sensor);
              null == c.applyToSingle(N, P) && l.warning("Http2Client: Failed to patch ClientHttp2Session.request");
              E.connectPatched = !0;
            } else {
              l.info(`Http2Client: connect() skip patching client as it is no emitter: ${null === (N = null === M || void 0 === M ? void 0 : M.constructor) || void 0 === N ? void 0 : N.name}`);
            }
            return L;
          });
          F.addToErrorHandler(L => {
            I(() => `Http2Client: connect() exit with exception: ${L}`);
            return L;
          });
          return K;
        }));
        return E.runFunction(F, C.origFn, this, ...H);
      };
    }
  }
  a.ConnectTransformer = z;
  class x extends t.TransformerBase {
    constructor(C) {
      super(C);
      this.sensor = C;
    }
    generateSubstitute(C) {
      const E = this, I = E.debugLogger.bind(E), H = new k.FunctionId(C);
      return function(...F) {
        I(() => `ClientWebRequest: request(): ${F.length}`);
        const K = t.TransformerBase.emptyRunConfig();
        K.chain((0,t.bailIf)(!E.controlParams.active, "Http2ClientWebRequest: request() exit - inactive", E)).chain((0,t.tryFunction)(L => {
          const M = 0 < F.length && e.isObject(F[0]) && !Array.isArray(F[0]) ? F[0] : void 0;
          if (!E.shouldSuppress(M)) {
            const P = new J(this, M, E.sensor), Q = E.tryStartAsyncActivation({sensorId:r.Agent.correlation.SensorId.NODEJS_HTTP2_CLIENT, functionId:H, attachmentCreator:P, createInitiatorNode:!1});
            if (null != Q) {
              L = L.setValue(w.CurrentSPC, Q.initialSpc);
              P.vNodeActivation = Q.vNodeActivation;
              var N = h.getTraceContextFromRequest({headers:M}, I);
              const R = Q.vNodeActivation.spc.createAddSerializeLink(!0, d.Tracing.getHttpTaggingMode(), null !== N && void 0 !== N ? N : {});
              null != R && (N = new d.Tracing(R), 0 === F.length ? F = [N.getHttpTaggingHeaders()] : null != M || null == F[0] ? F[0] = h.mergePropertiesCaseInsensitive(null !== M && void 0 !== M ? M : {}, N.getHttpTaggingHeaders()) : I(() => `${P}: request() can't set tag as headers object seems to be invalid ${typeof M}`));
              K.addToErrorHandler(T => {
                x.closeAsyncExePath(P, T);
                I(() => `${P}: request() exit didThrow: ${g.verboseExceptionObject(T)}`);
                return T;
              });
              K.addToSuccessHandler(T => {
                const U = T.retVal;
                P.clientStream = U;
                E.patchClientStream(U);
                U.on("response", G);
                P.onRequestInjected = !0;
                b.installErrorMonitor(U, V => x.closeAsyncExePath(P, V));
                U.on("close", x.getCloseListener(P));
                I(() => `${P}: request() exit successs`);
                return T;
              });
              I(() => `${P}: request() virt: ${Q.initialSpc}, tag: ${d.Tracing.traceContextToString(R)}, ${P.attachment}`);
            } else {
              I(() => `ClientHttp2SessionTransformer.initVNode: request() no method activation, active spc: ${m.SubPathContext.getActiveContext()}`);
            }
          }
          return L;
        }));
        return E.runFunction(K, C.origFn, this, ...F);
      };
    }
    static getCloseListener(C) {
      return function() {
        x.closeAsyncExePath(C);
      };
    }
    static closeAsyncExePath(C, E) {
      let I;
      if (null != C.vNodeActivation) {
        try {
          I = C.vNodeActivation.spc, C.vNodeActivation.exitOrException(E), C.endAsyncSubPath();
        } catch (H) {
          g.logAgentException(H);
        }
      }
      C.sensor.isDebugEnabled && l.debug(`${C}: closeAsyncExePath() spc: ${I}, err: ${null != E ? g.verboseExceptionObject(E) : "-"}`);
    }
    patchClientStream(C) {
      if (!x.clientStreamPatched) {
        x.clientStreamPatched = !0;
        var E = C.constructor.prototype;
        C = new A(this.sensor);
        E = new c.ModuleSpec("ClientHttp2Stream", E);
        C.applyTransformation(E);
      }
    }
    shouldSuppress(C) {
      var E = null != C ? C[":path"] : void 0;
      if (!this.sensor.properties.shallCaptureUrl(E)) {
        return this.isDebugEnabled && l.debug(`ClientWebRequest: suppress path for: ${E}`), !0;
      }
      E = null != C ? h.lookupKeyname(C, "content-type") : void 0;
      if ("string" === typeof E) {
        for (const I of y) {
          const H = C[E];
          if ("string" === typeof H) {
            if (I(H)) {
              return this.isDebugEnabled && l.debug(`ClientWebRequest: suppress path for ${E}: ${H}`), !0;
            }
          } else {
            this.isDebugEnabled && l.debug(`ClientWebRequest: Header ${E} does not hold a string value`);
          }
        }
      }
      return !1;
    }
  }
  x.clientStreamPatched = !1;
  class A extends u.EventEmitterTransformerBase {
    constructor(C) {
      super(C, "response");
    }
    shallWrap(C) {
      return null != J.getTracker(C);
    }
    getWrappedListener(C, E, I) {
      const H = this, F = H.debugLogger.bind(H), K = J.getTracker(C);
      if (null == K) {
        return I;
      }
      K.onRequestInjected && (K.onRequestInjected = !1, C.removeListener("response", G));
      return function(...L) {
        const M = L[0], N = t.TransformerBase.emptyRunConfig();
        N.chain((0,t.bailIf)(null == K.vNodeActivation, `${K}: onResponse() vNode already closed status: ${M[":status"]}`, H)).chain((0,t.tryFunction)(P => {
          null != M && (K.fillAttachmentExitData(M), h.setResponseTaggingHeaders(M, K.vNodeActivation));
          K.vNodeActivation.exit();
          K.endAsyncSubPath();
          N.addToErrorHandler(Q => {
            F(() => `${K}: onResponse() status: ${M[":status"]}, didThrow: ${g.verboseExceptionObject(Q)}`);
            return Q;
          });
          N.addToSuccessHandler(Q => {
            F(() => `${K}: onResponse() status: ${M[":status"]}, success`);
            return Q;
          });
          return P;
        }));
        return H.runFunction(N, I, this, ...L);
      };
    }
  }
});
S("src/lib/transformer/PromiseTransformerUtilities", ["require", "exports", "src/lib/Embedder"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.EmbeddedPromiseContext = a.PromiseTransformerUtilities = a.PromiseEmbedder = void 0;
  a.PromiseEmbedder = u.create("promise");
  class t {
    static isActuallyAPromise(n) {
      return null != n && "function" === typeof n.then;
    }
    static wrapPromise(n, p) {
      a.PromiseEmbedder.createOrGet(n, () => new r()).customThenWrapper = p;
      return n.then(k => k, k => {
        throw k;
      });
    }
  }
  a.PromiseTransformerUtilities = t;
  class r {
  }
  a.EmbeddedPromiseContext = r;
});
S("src/lib/sensors/FetchAttachment", "require exports src/lib/Agent src/lib/AttachmentBase src/lib/util/HttpUtil src/lib/util/CoreUtil".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.FetchAttachment = void 0;
  class p extends t.AttachmentBase {
    constructor(k, l) {
      super(k, u.Agent.correlation.AttachmentId.CLIENT_WEBREQUEST_ID, 0);
      this.sensorProperties = l;
      this.maxStrLen = r.getWebRequestMaxStringLen();
    }
    fillEntryData(k) {
      var l = "https:" === k.protocol;
      const c = l ? 443 : 80;
      l = l ? "https:" : "http:";
      const m = k.protocol || l, d = k.hostname || "localhost", e = "string" === typeof k.method && k.method.toUpperCase() || "GET", b = null == k.port ? c : +k.port, g = `${m}//${d}${b === c && m === l ? "" : `:${b}`}${k.path || "/"}`;
      this.setMultipleFields(h => {
        const f = u.Agent.correlation.AttachmentFieldId;
        h.stringCached(f.CLIENT_WEB_REQUEST_URI, g, this.maxStrLen);
        h.stringCached(f.CLIENT_WEB_REQUEST_METHOD, e, this.maxStrLen);
        h.stringCached(f.CLIENT_WEB_REQUEST_HOSTNAME, d, this.maxStrLen);
        h.integer(f.CLIENT_WEB_REQUEST_PORTNO, b);
        const {captureAllRequestHeaders:q, requestHeadersToCapture:w} = this.sensorProperties;
        r.fillOutgoingHeaders(h, f.CLIENT_WEB_REQUEST_REQUEST_HEADER, Array.from(k.headers.entries()), q, w);
        null != k.query && h.stringCached(f.CLIENT_WEB_REQUEST_QUERY, k.query, this.maxStrLen);
      });
    }
    fillExitData(k) {
      this.setMultipleFields(l => {
        const c = u.Agent.correlation.AttachmentFieldId;
        l.integer(c.CLIENT_WEB_REQUEST_RESPONSECODE, k.statusCode);
        if (null != k.headers) {
          const {captureAllResponseHeaders:m, responseHeadersToCapture:d} = this.sensorProperties;
          l.map(c.CLIENT_WEB_REQUEST_RESPONSE_HEADER, (0,n.objectFromEntries)(k.headers), m ? void 0 : d, this.maxStrLen);
        }
      });
    }
  }
  a.FetchAttachment = p;
});
S("src/lib/transformer/FetchTransformer", "require exports util src/lib/transformer/TransformerBase src/lib/transformer/PromiseTransformerUtilities src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/Agent src/lib/FunctionId src/lib/Logger src/lib/SubPathContext src/lib/Tracing src/lib/util/UniqueId src/lib/util/HttpUtil src/lib/util/CoreUtil src/lib/sensors/FetchAttachment src/lib/sensors/SensorConstants".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h, f) {
  function q(J, B) {
    J && c.debug(B());
  }
  function w(J, B) {
    return (0,g.hasSingleProperty)(B, "headers") ? new Headers(B.headers) : (0,g.hasSingleProperty)(J, "headers") ? new Headers(J.headers) : new Headers();
  }
  function G(J) {
    if (J instanceof URL) {
      return J;
    }
    if ("string" === typeof J) {
      return new URL(J);
    }
    if ((0,g.hasSingleProperty)(J, "url") && "string" === typeof J.url) {
      return new URL(J.url);
    }
    c.warning(`Fetch: unexpected resource identifier: ${(0,u.inspect)(J)}`);
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.FetchTransformer = void 0;
  class y extends t.TransformerBase {
    constructor(J) {
      super(J);
      this.sensor = J;
    }
    generateSubstitute(J) {
      const B = this, v = new l.VirtualNodeFunctionId(new l.FunctionId(J));
      return function(z, x) {
        var A, C, E;
        const I = B.controlParams.isDebugEnabled;
        q(I, () => "Fetch: fetch()");
        if (!B.controlParams.active) {
          return q(I, () => "Fetch: fetch() exit - inactive"), p.doInvoke(void 0, J.origFn, arguments);
        }
        let H, F, K;
        try {
          const M = G(z), N = null != M && !B.sensor.properties.shallCaptureUrl(M.href);
          q(N && I, () => `Fetch: suppress path for: ${(0,u.inspect)(z)}`);
          if (!N && null != M) {
            const P = new Headers(null !== (C = null !== (A = null === x || void 0 === x ? void 0 : x.headers) && void 0 !== A ? A : null === z || void 0 === z ? void 0 : z.headers) && void 0 !== C ? C : {}), Q = null !== (E = null === x || void 0 === x ? void 0 : x.method) && void 0 !== E ? E : null === z || void 0 === z ? void 0 : z.method;
            F = new D(M, P, Q, J, B.sensor);
            H = B.tryStartMethodActivation({sensorId:k.Agent.correlation.SensorId.NODEJS_HTTP_CLIENT, functionId:v, attachmentCreator:F});
            if (null != H) {
              F.methodActivation = H;
              const R = b.getTraceContext((0,g.objectFromEntries)(P.entries()));
              K = H.spc.createAddSerializeLink(!1, d.Tracing.getHttpTaggingMode(), R);
              if (null != K) {
                const T = new d.Tracing(K), U = w(z, x);
                T.httpUseDtTagging() && null != T.dtTag && U.set(f.cDtTaggingHeader, T.dtTag);
                T.httpUseTraceParent() && null != T.traceParent && U.set(f.cW3cTraceParent, T.traceParent);
                T.httpUseTraceState() && null != T.traceState && U.set(f.cW3cTraceState, T.traceState);
                x = Object.assign(Object.create(null), x, {headers:U});
              }
              q(I, () => `${F}: fetch() virt: ${null === H || void 0 === H ? void 0 : H.spc}, tag: ${d.Tracing.traceContextToString(K)}, ${null === F || void 0 === F ? void 0 : F.attachment}`);
            } else {
              q(I, () => `${F}: fetch() no method activation, active spc: ${m.SubPathContext.getActiveContext()}`);
            }
          }
        } catch (M) {
          n.logAgentException(M);
        }
        const L = p.safeInvoke(this, J.origFn, [z, x, ...Array.from(arguments).slice(2)]);
        try {
          null != (null === F || void 0 === F ? void 0 : F.methodActivation) && (L.didThrow ? F.methodActivation.methodException(L.exception) : B.wrapReturnValue(F, L));
        } catch (M) {
          n.logAgentException(M);
        }
        q(I, () => {
          var M;
          return `${null !== (M = null === F || void 0 === F ? void 0 : F.toString()) && void 0 !== M ? M : "Fetch"}: fetch() exit didThrow: ${L.didThrow ? n.verboseExceptionObject(L.exception) : "-"}`;
        });
        return L.rethrow();
      };
    }
    wrapReturnValue(J, B) {
      const v = this.controlParams.isDebugEnabled, z = B.retVal;
      r.PromiseTransformerUtilities.isActuallyAPromise(z) && B.setVal(r.PromiseTransformerUtilities.wrapPromise(z, function(x, A) {
        return function(C) {
          return y.handleThenCall(this, J, x, C, A, arguments, v);
        };
      }));
    }
    static handleThenCall(J, B, v, z, x, A, C) {
      var E;
      q(C, () => `${B}: enter then call, isCatch ${v}`);
      try {
        if (null != B.methodActivation && !B.methodActivation.isExited) {
          if (!v) {
            try {
              if (null != z.status) {
                const H = new Map(z.headers);
                B.fillAttachmentExitData({statusCode:z.status, headers:H});
                b.setResponseTaggingHeaders((0,g.objectFromEntries)(H), B.methodActivation);
              }
            } catch (H) {
              n.logAgentException(H);
            }
          }
          null === (E = B.methodActivation) || void 0 === E ? void 0 : E.exitOrException(v ? z : void 0);
          q(C, () => `${B}: ended virtual node`);
        }
      } catch (H) {
        n.logAgentException(H);
      }
      const I = p.safeInvoke(J, x, A);
      q(C, () => `${B}: exit then call, didThrow ${I.didThrow}`);
      return I.rethrow();
    }
  }
  a.FetchTransformer = y;
  class D {
    constructor(J, B, v, z, x) {
      this.descriptor = z;
      this.sensor = x;
      this.id = e.UniqueId.getNext();
      z = J.search.substring(1);
      this.requestOptions = {protocol:J.protocol, hostname:J.hostname, path:J.pathname, port:"" !== J.port ? Number.parseInt(J.port, 10) : void 0, headers:B, query:z, method:v};
    }
    createAttachments(J) {
      J = new h.FetchAttachment(J, this.sensor.properties);
      if (J.valid) {
        this.attachment = J;
        try {
          J.fillEntryData(this.requestOptions);
        } catch (B) {
          n.logAgentException(B);
        }
      } else {
        q(this.sensor.isDebugEnabled, () => `${this}: fillEntryData() - failed to create attachment`);
      }
    }
    fillAttachmentExitData(J) {
      var B;
      try {
        null === (B = this.attachment) || void 0 === B ? void 0 : B.fillExitData(J);
      } catch (v) {
        n.logAgentException(v);
      }
    }
    toString() {
      this.logPrefix || (this.logPrefix = `Fetch ${e.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
  }
});
S("src/lib/sensors/ClientWebRequestSensor", "require exports src/lib/Logger src/lib/Debug src/lib/Patch src/lib/RunTimeProperty src/lib/sensors/ClientWebRequestSensorProperties src/lib/sensors/SensorBase src/lib/transformer/HttpClientTransformer src/lib/transformer/Http2ClientTransformer src/lib/transformer/FetchTransformer".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ClientWebRequestSensor = void 0;
  const d = new n.BooleanProperty("Http2ClientInstrumentationEnabled", !1), e = new n.BooleanOption("FetchEnabled", !1);
  class b extends k.SensorBase {
    constructor(g, h) {
      super(g, h);
      this.properties = new p.ClientWebRequestSensorProperties(h);
    }
    applyInstrumentation(g) {
      switch(g.request) {
        case "http":
          this.transformRequest(g);
          this.transformGet(g);
          this.transformClientRequestStoreHeader(g);
          this.transformClientRequestEmitter(g);
          break;
        case "https":
          this.transformRequest(g);
          this.transformGet(g);
          break;
        case "http2":
        case "node:http2":
          d.value || this.properties.enableHttp2Transformer ? this.transformHttp2Connect(g) : u.info("Instrumenting HTTP2 client is disabled");
          break;
        case "implicit:global":
          this.transformFetch();
      }
    }
    updateState(g) {
      super.updateState(g);
      this.properties.update(g);
    }
    transformRequest(g) {
      var h = new r.FunctionSpec("request", g.request, g.moduleExports, "http");
      g = new l.RequestTransformer(this, "https" === g.request);
      h = r.applyToSingle(h, g);
      t.assert(null != h);
    }
    transformClientRequestEmitter(g) {
      g = new r.ModuleSpec("ClientRequest", g.moduleExports.ClientRequest.prototype);
      (new l.ClientRequestEmitterTransformer(this)).applyTransformation(g);
    }
    transformClientRequestStoreHeader(g) {
      g = new r.FunctionSpec("_storeHeader", "ClientRequest", g.moduleExports.ClientRequest.prototype);
      const h = new l.ClientRequestStoreHeadersTransformer(this);
      g = r.applyToSingle(g, h, r.cPolymorphicDefaultOptions);
      t.assert(null != g);
    }
    transformGet(g) {
      const h = g.moduleExports;
      g = new r.FunctionSpec("get", g.request, h);
      r.substitute(g, function() {
        const f = h.request.apply(h, arguments);
        f.end();
        return f;
      });
    }
    transformHttp2Connect(g) {
      g = new r.FunctionSpec("connect", g.request, g.moduleExports, "http");
      const h = new c.ConnectTransformer(this);
      g = r.applyToSingle(g, h);
      t.assert(null != g);
    }
    transformFetch() {
      const g = global;
      e.value && "function" === typeof g.fetch ? (this.isDebugEnabled && u.debug("FetchSensor.applyInstrumentation to global.fetch"), r.applyToSingle(new r.FunctionSpec("fetch", "", global, r.AsyncTrackingMode.Promise, "fetch"), new m.FetchTransformer(this))) : u.info("Instrumenting Fetch client is disabled");
    }
  }
  a.ClientWebRequestSensor = b;
});
S("src/lib/transformer/EventEmitterContextPassingTransformer", "require exports src/lib/transformer/EventEmitterTransformerBase src/lib/SubPathContext src/lib/util/ErrorUtil src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.EventEmitterContextPassingTransformer = void 0;
  class p extends u.EventEmitterTransformerBase {
    shallWrap() {
      return this.controlParams.active && null != t.SubPathContext.getActiveContext();
    }
    getWrappedListener(k, l, c) {
      if (!this.controlParams.active) {
        return c;
      }
      let m;
      try {
        m = t.SubPathContext.getActiveContext(), null != m && (m.didInitiateAsyncOp = !0);
      } catch (d) {
        r.logAgentException(d);
      }
      return null != m ? n.ContextManager.bindToCurrentContext(c) : c;
    }
  }
  a.EventEmitterContextPassingTransformer = p;
});
S("src/lib/sensors/EventEmitterContextPassingSensor", "require exports src/lib/Logger src/lib/Patch src/lib/sensors/SensorBase src/lib/transformer/EventEmitterContextPassingTransformer".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.EventEmitterContextPassingSensor = void 0;
  class p extends r.SensorBase {
    applyInstrumentation(k) {
      const l = new t.ModuleSpec("EventEmitter", k.moduleExports.EventEmitter.prototype), c = new n.EventEmitterContextPassingTransformer(this);
      this.isDebugEnabled && u.debug(`${this.name}: instrumenting module ${k.toString(!0)}`);
      c.applyTransformation(l);
    }
  }
  a.EventEmitterContextPassingSensor = p;
});
S("src/lib/util/JsonObfuscatorUtil", ["require", "exports", "src/lib/Configuration"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.QueryNormalizer = void 0;
  class t {
    static normalizeQueryToString(r, n) {
      t.initialized || t.initialize();
      this.whitelist = n;
      r = this.internal_normalizeQueryToString(r, 0);
      this.whitelist = void 0;
      return r;
    }
    static initialize() {
      t.maxStringLength = u.Configuration.maxSqlStringLen;
      t.initialized = !0;
    }
    static internal_normalizeQueryToString(r, n) {
      let p = "";
      if (n >= this.maxRecursionDepth || null == r || r instanceof RegExp || "object" !== typeof r) {
        return p += this.queryValueReplacer;
      }
      if (r instanceof Array) {
        p += "[";
        for (var k = 0; k < r.length; ++k) {
          p += this.internal_normalizeQueryToString(r[k], n + 1);
          if (p.length > t.maxStringLength) {
            break;
          }
          k < r.length - 1 && (p += ",");
        }
        p += "]";
      } else {
        p += "{";
        k = 0;
        const l = void 0 === this.whitelist ? Object.keys(r) : this.whitelist;
        for (const c of l) {
          if (Object.hasOwnProperty.call(r, c) && (p += `${0 === k ? "" : ","}${c}:`, k++, p += this.internal_normalizeQueryToString(r[c], n + 1), p.length > t.maxStringLength)) {
            break;
          }
        }
        p += "}";
      }
      return p.length > t.maxStringLength ? p.slice(0, t.maxStringLength) : p;
    }
  }
  t.initialized = !1;
  t.maxRecursionDepth = 50;
  t.queryValueReplacer = "?";
  a.QueryNormalizer = t;
});
S("src/lib/sensors/MongoDbAttachmentUtils", "require exports src/lib/Agent src/lib/Logger src/lib/util/CoreUtil src/lib/util/JsonObfuscatorUtil src/lib/util/SemverUtil url".split(" "), function(O, a, u, t, r, n, p, k) {
  function l(b) {
    return b && "object" === typeof b ? n.QueryNormalizer.normalizeQueryToString(b) : b;
  }
  function c(b) {
    switch(b) {
      case d.aggregate:
        return "pipeline:";
      case d.bulkWrite:
        return "operations:";
      case d.createIndex:
      case d.ensureIndex:
        return "fieldOrSpec:";
      case d.createIndexes:
        return "indexSpecs:";
      case d.deleteMany:
      case d.deleteOne:
      case d.listCollections:
      case d.findOneAndReplace:
      case d.findOneAndUpdate:
      case d.findOneAndDelete:
      case d.replaceOne:
      case d.updateMany:
      case d.updateOne:
        return "filter:";
      case d.dropIndex:
        return "indexName:";
      case d.collection:
      case d.createCollection:
        return "name:";
      case d.command:
        return "command:";
      case d.indexExists:
        return "indexes:";
      case d.insert:
      case d.insertMany:
      case d.insertOne:
        return "docs:";
      case d.rename:
        return "newName:";
      case d.remove:
      case d.update:
        return "selector:";
      case d.save:
        return "doc:";
      default:
        return "query:";
    }
  }
  function m(b) {
    switch(b) {
      case d.distinct:
        return 0;
      case d.findAndModify:
        return 2;
      case d.findOneAndReplace:
      case d.findOneAndUpdate:
      case d.replaceOne:
      case d.update:
      case d.updateMany:
      case d.updateOne:
        return 1;
      default:
        return -1;
    }
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.getUpdateString = a.getNormalizedQueryString = a.normalizeJson = a.MongoDbConfigurationData = a.methodNameToMethodType = void 0;
  var d;
  (function(b) {
    b[b.aggregate = 0] = "aggregate";
    b[b.authenticate = 1] = "authenticate";
    b[b.bulkWrite = 2] = "bulkWrite";
    b[b.close = 3] = "close";
    b[b.collection = 4] = "collection";
    b[b.count = 5] = "count";
    b[b.createCollection = 6] = "createCollection";
    b[b.createIndexes = 7] = "createIndexes";
    b[b.createIndex = 8] = "createIndex";
    b[b.command = 9] = "command";
    b[b.deleteMany = 10] = "deleteMany";
    b[b.deleteOne = 11] = "deleteOne";
    b[b.dropIndex = 12] = "dropIndex";
    b[b.drop = 13] = "drop";
    b[b.dropAllIndexes = 14] = "dropAllIndexes";
    b[b.dropDatabase = 15] = "dropDatabase";
    b[b.distinct = 16] = "distinct";
    b[b.dropIndexes = 17] = "dropIndexes";
    b[b.ensureIndex = 18] = "ensureIndex";
    b[b.find = 19] = "find";
    b[b.findOne = 20] = "findOne";
    b[b.findAndModify = 21] = "findAndModify";
    b[b.findOneAndReplace = 22] = "findOneAndReplace";
    b[b.findOneAndUpdate = 23] = "findOneAndUpdate";
    b[b.findAndRemove = 24] = "findAndRemove";
    b[b.findOneAndDelete = 25] = "findOneAndDelete";
    b[b.indexInformation = 26] = "indexInformation";
    b[b.indexExists = 27] = "indexExists";
    b[b.insert = 28] = "insert";
    b[b.insertMany = 29] = "insertMany";
    b[b.insertOne = 30] = "insertOne";
    b[b.listCollections = 31] = "listCollections";
    b[b.listIndexes = 32] = "listIndexes";
    b[b.mapReduce = 33] = "mapReduce";
    b[b.open = 34] = "open";
    b[b.reIndex = 35] = "reIndex";
    b[b.rename = 36] = "rename";
    b[b.remove = 37] = "remove";
    b[b.replaceOne = 38] = "replaceOne";
    b[b.save = 39] = "save";
    b[b.update = 40] = "update";
    b[b.updateMany = 41] = "updateMany";
    b[b.updateOne = 42] = "updateOne";
  })(d || (d = {}));
  a.methodNameToMethodType = function(b) {
    switch(d[b]) {
      case d.aggregate:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_AGGREGATE;
      case d.open:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_CONNECTION_ACQUISITION;
      case d.close:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_COMMAND;
      case d.collection:
      case d.listCollections:
      case d.listIndexes:
      case d.indexInformation:
      case d.indexExists:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_LISTCOLLECTIONS;
      case d.createCollection:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_CREATECOLLECTION;
      case d.dropDatabase:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_DROPDATABASE;
      case d.command:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_COMMAND;
      case d.insert:
      case d.insertMany:
      case d.insertOne:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_INSERT;
      case d.save:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_SAVE;
      case d.count:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_GET_COUNT;
      case d.find:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_FIND;
      case d.findOne:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_FIND_ONE;
      case d.findAndModify:
      case d.findOneAndReplace:
      case d.replaceOne:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_FIND_AND_MODIFY;
      case d.update:
      case d.updateMany:
      case d.updateOne:
      case d.findOneAndUpdate:
      case d.rename:
      case d.createIndex:
      case d.createIndexes:
      case d.ensureIndex:
      case d.reIndex:
      case d.bulkWrite:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_UPDATE;
      case d.findAndRemove:
      case d.findOneAndDelete:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_FIND_AND_REMOVE;
      case d.distinct:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_DISTINCT;
      case d.remove:
      case d.deleteMany:
      case d.deleteOne:
      case d.dropIndex:
      case d.drop:
      case d.dropAllIndexes:
      case d.dropIndexes:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_REMOVE;
      case d.authenticate:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_AUTHENTICATE;
      case d.mapReduce:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_MONGO_DB_MAP_REDUCE;
      default:
        return u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_UNKNOWN;
    }
  };
  class e {
    constructor(b, g) {
      this.version = g;
      this.databaseName = "";
      this.hostName = "undefined";
      this.portNumber = -1;
      this.collectionName = "";
      this.poolSize = -1;
      this.initialize(b);
    }
    updateDatabaseAttachmentInfo(b) {
      b = b.s;
      "" === this.databaseName && (this.databaseName = e.findDatabaseName(b));
      "" === this.collectionName && (this.collectionName = e.findCollectionName(b));
    }
    initialize(b) {
      if (null != b) {
        const g = b.s, h = this.findReplicationSetPrimaryOptions(g, this.version);
        b = h ? e.findHostAndPort(h, this.version) : e.getHostAndPortFromMongoDbObject(b);
        this.hostName = b.host;
        this.portNumber = b.port;
        this.databaseName = e.findDatabaseName(g);
        this.collectionName = e.findCollectionName(g);
        this.poolSize = e.findPoolSize(g, h);
      }
    }
    findReplicationSetPrimaryOptions(b, g) {
      if (p.satisfies(g, ">=3.0")) {
        if (r.hasProperty(b, "topology", "s", "coreTopology", "s")) {
          if (g = b.topology.s.coreTopology.s, r.hasProperty(g, "replicaSetState", "primary", "s", "options")) {
            return g.replicaSetState.primary.s.options;
          }
        } else if (r.hasProperty(b, "coreTopology", "s") && (g = b.coreTopology.s, r.hasProperty(g, "replicaSetState", "primary", "s", "options"))) {
          return g.replicaSetState.primary.s.options;
        }
      } else if (r.hasProperty(b, "topology", "s", "replset", "s")) {
        if (b = b.topology.s.replset.s, p.satisfies(g, "2.0 - 2.1")) {
          if (r.hasProperty(b, "replState", "primary", "s", "options")) {
            return b.replState.primary.s.options;
          }
        } else if (p.satisfies(g, ">=2.2")) {
          return b;
        }
      }
    }
    static findDatabaseName(b) {
      let g = "";
      null != b && (r.hasProperty(b, "databasename") ? g = b.databasename : r.hasProperty(b, "databaseName") ? g = b.databaseName : r.hasProperty(b, "dbname") ? g = b.dbname : r.hasProperty(b, "dbName") ? g = b.dbName : r.hasProperty(b, "db", "databasename") ? g = b.db.databasename : r.hasProperty(b, "db", "databaseName") ? g = b.db.databaseName : r.hasProperty(b, "db", "dbname") ? g = b.db.dbname : r.hasProperty(b, "db", "dbName") ? g = b.db.dbName : r.hasProperty(b, "namespace", "db") && (g = b.namespace.db));
      return g;
    }
    static findHostAndPort(b, g) {
      const h = {host:"undefined", port:-1};
      if (r.hasProperty(b, "host")) {
        if (h.host = b.host, p.satisfies(g, ">=3.0") && r.hasProperty(b, "servers") && b.servers instanceof Array) {
          for (const f of b.servers) {
            if (f.host.toLocaleUpperCase().startsWith(h.host.toLocaleUpperCase())) {
              h.host = f.host;
              break;
            }
          }
        }
      } else if (p.satisfies(g, ">=2.2") && r.hasProperty(b, "replicaSetState", "primary", "s", "options") && (h.host = b.replicaSetState.primary.s.options.host, r.hasProperty(b, "seedlist") && b.seedlist instanceof Array)) {
        for (const f of b.seedlist) {
          if (f.host.toLocaleUpperCase().startsWith(h.host.toLocaleUpperCase())) {
            h.host = f.host;
            break;
          }
        }
      }
      r.hasProperty(b, "port") ? h.port = b.port : r.hasProperty(b, "replicaSetState", "primary", "s", "options") && (h.port = b.replicaSetState.primary.s.options.port);
      return h;
    }
    static findMongoDbStateProperty(b, g) {
      try {
        if (r.hasProperty(b, "topology", g)) {
          return b.topology[g];
        }
        if (r.hasProperty(b, "topology", "s", g)) {
          return b.topology.s[g];
        }
        if (r.hasProperty(b, "db", "serverConfig", "s", g)) {
          return b.db.serverConfig.s[g];
        }
        if (r.hasProperty(b, "serverConfig", g)) {
          return b.serverConfig[g];
        }
        if (r.hasProperty(b, "db", "serverConfig", g)) {
          return b.db.serverConfig[g];
        }
        if (r.hasProperty(b, g)) {
          return b[g];
        }
        if (r.hasProperty(b, "options", "hosts")) {
          const h = b.options.hosts;
          if (0 < h.length) {
            return h[0][g];
          }
        }
      } catch (h) {
        t.debug(`MongoDbAttachmentUtils: failed to find ${g}: ${h}`);
      }
    }
    static getHostAndPortFromMongoDbObject(b) {
      var g, h, f, q, w, G;
      let y = e.findMongoDbStateProperty(b.s, "host"), D = e.findMongoDbStateProperty(b.s, "port");
      if (!y || !D) {
        const J = null !== (f = null === (h = null === (g = null === b || void 0 === b ? void 0 : b.client) || void 0 === g ? void 0 : g.s) || void 0 === h ? void 0 : h.url) && void 0 !== f ? f : null === (G = null === (w = null === (q = null === b || void 0 === b ? void 0 : b.s) || void 0 === q ? void 0 : q.client) || void 0 === w ? void 0 : w.s) || void 0 === G ? void 0 : G.url;
        J && (b = e.parseMongoDbUrl(J), y || (y = b.host), D || (D = b.port));
      }
      return e.validHostAndPort(y, D);
    }
    static parseMongoDbUrl(b) {
      const g = b.split(",")[0];
      try {
        const h = new k.URL(g);
        if (!h.hostname && !g.startsWith("mongodb://")) {
          throw Error("Invalid hostname");
        }
        return e.validHostAndPort(h.hostname, h.port);
      } catch (h) {
        t.debug(`Failed to parse replica set, ${h}: ${b}`);
      }
      b = g.startsWith("mongodb://") ? g.substring(10) : g;
      b = 0 <= b.indexOf("@") ? b.split("@")[1] : b;
      b = b.split(":");
      return e.validHostAndPort(b[0], b[1]);
    }
    static validHostAndPort(b, g) {
      g = g ? +g : -1;
      return {host:b || "undefined", port:Number.isNaN(g) ? -1 : g};
    }
    static findCollectionName(b) {
      let g = "";
      null != b && (r.hasProperty(b, "collectionName") ? g = b.collectionName : r.hasProperty(b, "name") ? g = b.name : r.hasProperty(b, "db", "name") ? g = b.db.name : r.hasProperty(b, "namespace", "collection") && (g = b.namespace.collection));
      return g;
    }
    static findPoolSize(b, g) {
      let h = -1;
      r.hasProperty(g, "size") ? h = g.size : r.hasProperty(g, "replicaSetState", "primary", "s", "options", "size") ? h = g.replicaSetState.primary.s.options.size : r.hasProperty(b, "topology", "s", "poolSize") ? h = b.topology.s.poolSize : r.hasProperty(b, "topology", "s", "poolsize") ? h = b.topology.s.poolsize : r.hasProperty(b, "serverConfig", "connectionPool", "poolSize") ? h = b.serverConfig.connectionPool.poolSize : r.hasProperty(b, "serverConfig", "options", "poolSize") && (h = b.serverConfig.options.poolSize);
      return +h;
    }
  }
  a.MongoDbConfigurationData = e;
  a.normalizeJson = l;
  a.getNormalizedQueryString = function(b, g) {
    b = d[b];
    a: {
      switch(b) {
        case d.distinct:
          var h = 1;
          break a;
        case d.authenticate:
        case d.drop:
        case d.dropAllIndexes:
        case d.dropDatabase:
        case d.dropIndexes:
        case d.indexInformation:
        case d.listIndexes:
        case d.mapReduce:
        case d.reIndex:
        case d.insert:
        case d.insertMany:
        case d.insertOne:
          h = -1;
          break a;
        default:
          h = 0;
      }
    }
    return -1 < h && h < g.length && (g = g[h]) && "function" !== typeof g ? c(b) + l(g) : "";
  };
  a.getUpdateString = function(b, g) {
    b = m(d[b]);
    return -1 < b && b < g.length && (g = g[b]) && "function" !== typeof g ? "update:" + l(g) : "";
  };
});
S("src/lib/sensors/MongoDbAttachment", ["require", "exports", "src/lib/Agent", "src/lib/AttachmentBase", "src/lib/sensors/MongoDbAttachmentUtils"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MongoDbAttachmentData = a.MongoDbConnectionPoolAttachment = a.MongoDbQueryAttachment = a.MongoDbAttachment = a.DATABASE_TYPE = a.CONNECTION_POOL_TYPE_MONGODB = void 0;
  a.CONNECTION_POOL_TYPE_MONGODB = 17;
  a.DATABASE_TYPE = "MongoDB";
  class n extends t.AttachmentBase {
  }
  a.MongoDbAttachment = n;
  class p extends n {
    constructor(c) {
      super(c, u.Agent.correlation.AttachmentId.SQL_ID, 0);
    }
    fillMongoDbQueryData(c, m) {
      if (null != this.attachment && null != c) {
        const d = u.Agent.correlation.AttachmentFieldId, e = c.makePseudoSql();
        this.setString(d.SQL_STATEMENT, e, u.Configuration.maxSqlStringLen);
        let b;
        null != c.dbMethod && (b = r.methodNameToMethodType(c.dbMethod), this.attachment.setFieldInteger(d.SQL_METHOD_TYPE, b));
        m && u.Logger.debug(`Setting sql attachment values: SQL_STATEMENT: ${e} | SQL_METHOD_TYPE: ${b}`);
      }
    }
    updateRowCount(c, m) {
      null != this.attachment && this.attachment.valid && (this.attachment.setFieldInteger(u.Agent.correlation.AttachmentFieldId.SQL_NUM_ROWS_RETURNED, c), m && u.Logger.debug(`Setting rows returned: SQL_NUM_ROWS_RETURNED: ${c}`));
    }
  }
  a.MongoDbQueryAttachment = p;
  class k extends n {
    constructor(c) {
      super(c, u.Agent.correlation.AttachmentId.CONNECTION_POOL_ID, 0);
    }
    fillMongoDbConnectionPoolData(c, m) {
      null != this.attachment && null != c.mongDbConfigData ? (this.setMultipleFields(d => {
        const e = u.Agent.correlation.AttachmentFieldId;
        d.stringCached(e.CONNECTION_POOL_DB, c.mongDbConfigData.databaseName);
        d.stringCached(e.CONNECTION_POOL_URL, c.dbUrl);
        d.stringCached(e.CONNECTION_POOL_DBTYPE, a.DATABASE_TYPE);
        d.stringCached(e.CONNECTION_POOL_DBHOST, c.mongDbConfigData.hostName);
        d.integer(e.CONNECTION_POOL_DBPORTNO, c.mongDbConfigData.portNumber);
        d.integer(e.CONNECTION_POOL_TYPE, a.CONNECTION_POOL_TYPE_MONGODB);
        d.integer(e.CONNECTION_POOL_AGGREGATION_MECHANISM, u.Agent.correlation.DbAggregationMechanism.DB_AGGREGATION_MECHANISM_MONGO_DB_ASYNC);
        d.integer(e.CONNECTION_POOL_SIZE, c.mongDbConfigData.poolSize);
      }), m && u.Logger.debug("Setting connection pool attachment values: " + `CONNECTION_POOL_DB: ${c.mongDbConfigData.databaseName} | ` + `CONNECTION_POOL_URL: ${c.dbUrl} | ` + `CONNECTION_POOL_DBTYPE: ${a.DATABASE_TYPE} | ` + `CONNECTION_POOL_DBHOST: ${c.mongDbConfigData.hostName} | ` + `CONNECTION_POOL_DBPORTNO: ${c.mongDbConfigData.portNumber} | ` + `CONNECTION_POOL_TYPE: ${a.CONNECTION_POOL_TYPE_MONGODB} | ` + `CONNECTION_POOL_AGGREGATION_MECHANISM: ${u.Agent.correlation.DbAggregationMechanism.DB_AGGREGATION_MECHANISM_MONGO_DB_ASYNC} | ` + 
      `CONNECTION_POOL_SIZE: ${c.mongDbConfigData.poolSize}`)) : m && u.Logger.debug(`Failed to set connection pool attachment, mongodb data: ${JSON.stringify(c)}`);
    }
  }
  a.MongoDbConnectionPoolAttachment = k;
  class l {
    constructor(c, m, d) {
      this.mongDbConfigData = c;
      this.dbMethod = m;
      this.dbUrl = this.dbUpdateString = this.dbQueryString = "";
      this.isCollectionMethod = !1;
      null != m && null != d && (this.dbQueryString = r.getNormalizedQueryString(m, d), this.dbUpdateString = r.getUpdateString(m, d));
      null != this.mongDbConfigData && (this.dbUrl = `mongodb://${this.mongDbConfigData.hostName}${0 < this.mongDbConfigData.portNumber ? `:${this.mongDbConfigData.portNumber}` : ""}/${this.mongDbConfigData.databaseName}`);
    }
    makePseudoSql() {
      let c = "";
      null != this.mongDbConfigData && (this.isCollectionMethod && this.mongDbConfigData.collectionName && (c += this.mongDbConfigData.collectionName), this.dbMethod && (this.isCollectionMethod && this.mongDbConfigData.collectionName && (c += "."), c += this.dbMethod), c = c + "(" + this.dbQueryString, this.dbQueryString && this.dbUpdateString && (c += ", "), c += this.dbUpdateString, c += ")");
      return c;
    }
  }
  a.MongoDbAttachmentData = l;
});
S("src/lib/sensors/ResultSetAttachment", ["require", "exports", "src/lib/Agent", "src/lib/AttachmentBase"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ResultSetAttachment = void 0;
  class r extends t.AttachmentBase {
    constructor(n) {
      super(n, u.Agent.correlation.AttachmentId.SQL_RESULTSET_AGGREGATION_ID, 0);
    }
  }
  a.ResultSetAttachment = r;
});
S("src/lib/transformer/MongoDbTransformer", "require exports src/lib/Agent src/lib/AsyncTracker src/lib/Debug src/lib/Embedder src/lib/FunctionId src/lib/Logger src/lib/Patch src/lib/sensors/ExceptionAttachment src/lib/sensors/MongoDbAttachment src/lib/transformer/AsyncTransformerBase src/lib/transformer/PromiseTransformerUtilities src/lib/transformer/TransformerBase src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/SemverUtil src/lib/util/UniqueId src/lib/sensors/MongoDbAttachmentUtils src/lib/sensors/ResultSetAttachment src/lib/contextmanager/ContextManager".split(" "), 
function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h, f, q, w, G, y) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MongoDbTransformer = a.MongoDbClientTransformer = a.MongoDbOpenTransformer = a.MongoDbConnectTransformer = a.MongoDbCursorInternalNextTransformer = a.MongoDbCursorNextTransformer = a.MongoDbCursorTransformer = a.MongoDbReturnsCursorTransformer = a.MongoDbTransformerHelper = void 0;
  class D {
    static isActuallyACursor(F, K) {
      return null != F && "function" === typeof K && F instanceof K;
    }
    static isActuallyADb(F, K) {
      return null != F && "function" === typeof K && F instanceof K;
    }
    static isActuallyAClient(F, K) {
      return null != F && "function" === typeof K && F instanceof K;
    }
    static isActuallyACollection(F, K) {
      return null != F && "function" === typeof K && F instanceof K;
    }
    static isCreateCollectionMethodResult(F, K) {
      return null != K.mongoData.mongDbConfigData && "createCollection" === K.mongoData.dbMethod && D.isActuallyACollection(F, K.transformer.collectionType);
    }
  }
  D.TrackerEmbedder = n.create("tracker");
  D.HostInfoEmbedder = n.create("hostName");
  a.MongoDbTransformerHelper = D;
  class J extends d.AsyncTransformerBase {
    handleThenCall(F, K, L, M, N, P) {
      this.debugLogger.bind(this)(() => `${K} ${K.descriptor.functionName} - then enter, isCatch: ${L}`);
      const Q = T => `${K} ${K.descriptor.functionName} - then exit, didThrow ${T}`, R = b.TransformerBase.emptyRunConfig();
      R.chain((0,b.tryFunction)(T => {
        null == K.virtualNodeActivation || K.virtualNodeActivation.isExited || (L || null == M || (D.isCreateCollectionMethodResult(M, K) && D.HostInfoEmbedder.set(M, K.mongoData.mongDbConfigData), Array.isArray(M) ? K.rowCount = M.length : g.hasSingleProperty(M, "insertedCount") && "number" === typeof M.insertedCount ? K.rowCount = M.insertedCount : K.rowCount = 1), K.setExitAttachmentValues(), K.virtualNodeActivation.exitOrException(L ? M : void 0), K.virtualNodeActivation.spc.end());
        return T;
      })).addToErrorHandler(this.onResultWithLog(Q.bind(this, !0))).addToSuccessHandler(this.onResultWithLog(Q.bind(this, !1)));
      return this.runFunction(R, N, F, ...P);
    }
    handleThenCallForCursors(F, K, L, M, N, P) {
      const Q = this.debugLogger.bind(this);
      Q(() => `${K} ${K.descriptor.functionName} - cursor then enter, isCatch: ${L}`);
      const R = U => {
        null == K.virtualNodeActivation ? D.suppressActivationCreation = !1 : K.virtualNodeActivation.isExited && K.virtualNodeActivation.spc.open && K.virtualNodeActivation.spc.end();
        Q(() => `${K} ${K.descriptor.functionName} - then exit, didThrow ${U}`);
      }, T = b.TransformerBase.emptyRunConfig();
      T.chain((0,b.tryFunction)(U => {
        if (null != K.virtualNodeActivation && 0 < P.length) {
          let V = !0;
          g.isError(M) ? (new c.ExceptionAttachment(K.virtualNodeActivation)).fillExceptionData(M) : (V = null == M || K.exitVNode, V || (Array.isArray(M) ? (K.rowCount = M.length, V = !0) : "boolean" === typeof M || "number" === typeof M ? V = !0 : K.rowCount++));
          V && !K.virtualNodeActivation.isExited && (K.setExitAttachmentValues(), K.virtualNodeActivation.exit());
        }
        return U;
      })).addToErrorHandler(this.onResultWithAction(R.bind(this, !0))).addToSuccessHandler(this.onResultWithAction(R.bind(this, !1)));
      return this.runFunction(T, N, F, ...P);
    }
  }
  class B extends d.AsyncTransformerBase {
    constructor(F, K, L) {
      super(F);
      this.collectionType = K;
      this.cursorType = L;
    }
    generateSubstitute(F) {
      const K = this;
      return function(...L) {
        const M = K.debugLogger.bind(K);
        M(() => `MongoDb [] ${F.functionName} - enter`);
        const N = b.TransformerBase.emptyRunConfig();
        N.chain((0,b.bailIf)(!K.controlParams.active, "MongoDB sensor is inactive", K)).chain((0,b.tryFunction)(P => {
          const Q = (T, U) => `${null !== U && void 0 !== U ? U : "MongoDb []"} ${F.functionName} - exit, didThrow: ${T}`;
          if (D.suppressActivationCreation) {
            D.suppressActivationCreation = !1, M(() => `MongoDb [] ${F.functionName} - suppressing activation creation`), N.addToErrorHandler(K.onResultWithLog(Q.bind(this, !0))), N.addToSuccessHandler(K.onResultWithLog(Q.bind(this, !1)));
          } else {
            var R = D.HostInfoEmbedder.get(this);
            null != R ? (M(() => `MongoDb [] ${F.functionName} - mongoconfigdata object found`), R.updateDatabaseAttachmentInfo(this)) : M(() => `MongoDb [] ${F.functionName} - no mongoconfigdata object found`);
            R = new m.MongoDbAttachmentData(R, F.functionName, L);
            R.isCollectionMethod = D.isActuallyACollection(this, K.collectionType);
            const T = new H(R, K, F, !0);
            L = T.manipulateArguments(L);
            N.addToSuccessHandler(U => {
              T.manipulateReturnValue(U);
              return U;
            });
            N.addToErrorHandler(K.onResultWithLog(Q.bind(this, !0, T)));
            N.addToSuccessHandler(K.onResultWithLog(Q.bind(this, !1, T)));
          }
          return P;
        }));
        return K.runFunction(N, F.origFn, this, ...L);
      };
    }
    wrapCallback(F) {
      const K = this;
      F.isCursorInCallback = !0;
      return function(...L) {
        const M = K.debugLogger.bind(K);
        M(() => `${F} ${F.descriptor.functionName} - callback enter`);
        const N = Q => `${F} ${F.descriptor.functionName} - callback exit, didThrow: ${Q}`, P = b.TransformerBase.emptyRunConfig();
        P.chain((0,b.tryFunction)(Q => {
          for (let R = 0; R < L.length; R++) {
            D.isActuallyACursor(L[R], K.cursorType) && (D.TrackerEmbedder.set(L[R], F), M(() => `${F} ${F.descriptor.functionName} - successfully embedded tracker on retrieved argument`));
          }
          return Q;
        })).addToErrorHandler(K.onResultWithLog(N.bind(this, !0))).addToSuccessHandler(K.onResultWithLog(N.bind(this, !1)));
        return K.runFunction(P, F.origCb, this, ...L);
      };
    }
    wrapReturnValue(F, K) {
      K = K.retVal;
      const L = this.debugLogger.bind(this);
      try {
        D.isActuallyACursor(K, this.cursorType) && (D.TrackerEmbedder.set(K, F), L(() => `${F} ${F.descriptor.functionName} - successfully embedded tracker on returned object`));
      } catch (M) {
        h.logAgentException(M);
      }
    }
  }
  a.MongoDbReturnsCursorTransformer = B;
  class v extends J {
    constructor(F) {
      super(F);
    }
    generateSubstitute(F) {
      const K = this, L = new p.FunctionId(F);
      return function(...M) {
        const N = K.debugLogger.bind(K);
        N(() => `MongoDb [] ${F.functionName} - enter`);
        const P = b.TransformerBase.emptyRunConfig();
        P.chain((0,b.bailIf)(!K.controlParams.active, "MongoDB sensor is inactive", K)).chain((0,b.tryFunction)(Q => {
          const R = (U, V) => `${null !== V && void 0 !== V ? V : "MongoDb []"} ${F.functionName} - exit, didThrow: ${U}`, T = D.TrackerEmbedder.get(this);
          if (null != T) {
            N(() => `MongoDb [] ${F.functionName} - found embedded tracker ${T}`);
            const U = new H(T.mongoData, K, F, !0);
            U.execCount = T.execCount;
            U.rowCount = T.rowCount;
            U.virtualNodeActivation = T.virtualNodeActivation;
            U.suppressNext = "each" === F.functionName;
            U.suppressExitVNode = ["each", "forEach", "toArray"].includes(F.functionName);
            (U.suppressNext || U.suppressExitVNode) && N(() => `MongoDb [] ${F.functionName} - suppressNext: ${U.suppressNext}, suppressExitVNode: ${U.suppressExitVNode}`);
            const V = K.tryStartAsyncActivation({sensorId:u.Agent.correlation.SensorId.NODEJS_MONGODB, functionId:L, category:u.Agent.correlation.MethodCategory.Database, attachmentCreator:U, vPathOption:2, createInitiatorNode:!1});
            P.addToErrorHandler(Z => {
              null != U.virtualNodeActivation && (U.virtualNodeActivation.isExited || (U.setExitAttachmentValues(), U.virtualNodeActivation.exitOrException(Z)), U.virtualNodeActivation.spc.end());
              N(() => `${U} ${F.functionName} - async activation ended`);
              return Z;
            });
            P.addToSuccessHandler(Z => {
              U.manipulateReturnValue(Z);
              return Z;
            });
            null != V && (V.initialSpc.didInitiateAsyncOp = !0, Q = Q.setValue(y.CurrentSPC, V.initialSpc), U.virtualNodeActivation = V.vNodeActivation, D.TrackerEmbedder.set(this, U), N(() => `${U} ${F.functionName} - async activation created`), P.addToErrorHandler(Z => {
              V.vNodeActivation.exitOrException(Z);
              V.vNodeActivation.spc.end();
              return Z;
            }), M = U.manipulateArguments(M));
          }
          P.addToErrorHandler(K.onResultWithLog(R.bind(this, !0)));
          P.addToSuccessHandler(K.onResultWithLog(R.bind(this, !1)));
          return Q;
        }));
        return K.runFunctionInContext(P, F.origFn, this, ...M);
      };
    }
    wrapCallback(F) {
      const K = this;
      return y.ContextManager.bindToCurrentContext(function(...L) {
        const M = K.debugLogger.bind(K);
        M(() => `${F} ${F.descriptor.functionName} - callback enter`);
        const N = b.TransformerBase.emptyRunConfig();
        N.chain((0,b.tryFunction)(Q => {
          if (null != F.virtualNodeActivation) {
            let T = !0;
            if (0 < L.length) {
              if (g.isError(L[0])) {
                var R = L[0];
                (new c.ExceptionAttachment(F.virtualNodeActivation)).fillExceptionData(R);
                M(() => `${F} ${F.descriptor.functionName} - ended virtual node with exception`);
              } else {
                2 === L.length && (R = L[1], T = null == R, T || (Array.isArray(R) ? (F.rowCount = R.length, T = !0) : "boolean" === typeof R || "number" === typeof R ? T = !0 : F.rowCount++));
              }
            }
            T && !F.virtualNodeActivation.isExited && (F.setExitAttachmentValues(), F.createResultSetAttachment && (F.setResultSetAttachmentData(), F.virtualNodeActivation.exit()));
          }
          return Q;
        })).addToSuccessHandler(Q => {
          null == F.virtualNodeActivation ? D.suppressActivationCreation = !1 : F.virtualNodeActivation.isExited && null != F.virtualNodeActivation.spc && F.virtualNodeActivation.spc.open && F.virtualNodeActivation.spc.end();
          return Q;
        });
        const P = Q => `${F} ${F.descriptor.functionName} - callback exit, didThrow: ${Q}`;
        N.addToErrorHandler(K.onResultWithLog(P.bind(this, !0))).addToSuccessHandler(K.onResultWithLog(P.bind(this, !1)));
        return K.runFunction(N, F.origCb, this, ...L);
      });
    }
    wrapReturnValue(F, K) {
      function L(Q, R) {
        return function(T) {
          return M.handleThenCallForCursors(this, F, Q, T, R, arguments);
        };
      }
      const M = this, N = K.retVal, P = M.debugLogger.bind(M);
      e.PromiseTransformerUtilities.isActuallyAPromise(N) && (P(() => `${F} ${F.descriptor.functionName} - register then wrapper and install dummy handlers on returned object`), K.setVal(e.PromiseTransformerUtilities.wrapPromise(N, L)), F.returnsPromise = !0);
    }
  }
  a.MongoDbCursorTransformer = v;
  class z extends J {
    constructor(F) {
      super(F);
    }
    generateSubstitute(F) {
      const K = this, L = new p.FunctionId(F);
      return function(...M) {
        const N = K.debugLogger.bind(K);
        N(() => `MongoDb [] ${F.functionName} - enter`);
        const P = b.TransformerBase.emptyRunConfig();
        P.chain((0,b.bailIf)(!K.controlParams.active, "MongoDB sensor is inactive", K)).chain((0,b.tryFunction)(Q => {
          const R = (U, V) => `${null !== V && void 0 !== V ? V : "MongoDb []"} ${F.functionName} - exit, didThrow: ${U}`, T = D.TrackerEmbedder.get(this);
          if (null == T || T.suppressNext) {
            P.addToErrorHandler(K.onResultWithLog(R.bind(this, !0))), P.addToSuccessHandler(K.onResultWithLog(R.bind(this, !1)));
          } else {
            N(() => `MongoDb [] ${F.functionName} - found embedded tracker ${T}`);
            const U = new H(T.mongoData, K, F, !0);
            U.execCount = T.execCount;
            U.rowCount = T.rowCount;
            U.suppressNext = !0;
            U.suppressExitVNode = T.suppressExitVNode;
            U.suppressExitVNode || (U.exitVNode = !0);
            U.virtualNodeActivation = T.virtualNodeActivation;
            D.TrackerEmbedder.set(this, U);
            const V = K.tryStartAsyncActivation({sensorId:u.Agent.correlation.SensorId.NODEJS_MONGODB, functionId:L, category:u.Agent.correlation.MethodCategory.Database, attachmentCreator:U, vPathOption:2, createInitiatorNode:!1});
            P.addToErrorHandler(Z => {
              null != U.virtualNodeActivation && (U.virtualNodeActivation.isExited || U.virtualNodeActivation.exitOrException(Z), U.virtualNodeActivation.spc.end());
              return Z;
            });
            P.addToSuccessHandler(Z => {
              U.manipulateReturnValue(Z);
              return Z;
            });
            null != V && (V.initialSpc.didInitiateAsyncOp = !0, Q = Q.setValue(y.CurrentSPC, V.initialSpc), U.virtualNodeActivation = V.vNodeActivation, D.TrackerEmbedder.set(this, U), N(() => `${U} ${F.functionName} - async activation created`), P.addToErrorHandler(Z => {
              V.vNodeActivation.exitOrException(Z);
              V.vNodeActivation.spc.end();
              return Z;
            }), M = U.manipulateArguments(M));
            P.addToErrorHandler(K.onResultWithLog(R.bind(this, !0, U)));
            P.addToSuccessHandler(K.onResultWithLog(R.bind(this, !1, U)));
          }
          return Q;
        }));
        return K.runFunctionInContext(P, F.origFn, this, ...M);
      };
    }
    wrapCallback(F) {
      const K = this;
      return y.ContextManager.bindToCurrentContext(function(...L) {
        const M = K.debugLogger.bind(K);
        M(() => `${F} ${F.descriptor.functionName} - callback enter`);
        const N = b.TransformerBase.emptyRunConfig();
        N.chain((0,b.tryFunction)(Q => {
          if (null != F.virtualNodeActivation) {
            if (0 < L.length && g.isError(L[0])) {
              const R = L[0];
              (new c.ExceptionAttachment(F.virtualNodeActivation)).fillExceptionData(R);
              M(() => `${F} ${F.descriptor.functionName} - ended virtual node with exception`);
            }
            F.virtualNodeActivation.isExited || (F.setExitAttachmentValues(), F.virtualNodeActivation.exit());
          }
          return Q;
        })).addToSuccessHandler(Q => {
          null == F.virtualNodeActivation ? D.suppressActivationCreation = !1 : null != F.virtualNodeActivation.spc && F.virtualNodeActivation.spc.open && F.virtualNodeActivation.spc.end();
          return Q;
        });
        const P = Q => `${F} ${F.descriptor.functionName} - callback exit, didThrow: ${Q}`;
        N.addToErrorHandler(K.onResultWithLog(P.bind(this, !0))).addToSuccessHandler(K.onResultWithLog(P.bind(this, !1)));
        return K.runFunction(N, F.origCb, this, ...L);
      });
    }
    wrapReturnValue(F, K) {
      function L(Q, R) {
        return function(T) {
          return M.handleThenCallForCursors(this, F, Q, T, R, arguments);
        };
      }
      const M = this, N = K.retVal, P = M.controlParams.isDebugEnabled;
      e.PromiseTransformerUtilities.isActuallyAPromise(N) && (P && k.debug(`${F} ${F.descriptor.functionName} - register then wrapper and install dummy handlers on returned object`), K.setVal(e.PromiseTransformerUtilities.wrapPromise(N, L)), F.returnsPromise = !0);
    }
  }
  a.MongoDbCursorNextTransformer = z;
  class x extends J {
    constructor(F) {
      super(F);
    }
    generateSubstitute(F) {
      const K = this;
      return function(...L) {
        const M = K.debugLogger.bind(K);
        M(() => `MongoDb [] ${F.functionName} - enter`);
        const N = b.TransformerBase.emptyRunConfig();
        N.chain((0,b.bailIf)(!K.controlParams.active, "MongoDB sensor is inactive", K)).chain((0,b.tryFunction)(P => {
          const Q = (T, U) => `${null !== U && void 0 !== U ? U : "MongoDb []"} ${F.functionName} - exit, didThrow: ${T}`, R = D.TrackerEmbedder.get(this);
          if (null != R) {
            M(() => `MongoDb [] ${F.functionName} - found embedded tracker ${R}`);
            R.execCount++;
            const T = R.virtualNodeActivation, U = R.resultSetAttachment, V = new H(R.mongoData, K, F, R.createResultSetAttachment);
            V.virtualNodeActivation = T;
            V.execCount = R.execCount;
            V.rowCount = R.rowCount;
            null != U && (V.resultSetAttachment = U);
            L = V.manipulateArguments(L);
            N.addToSuccessHandler(Z => {
              V.manipulateReturnValue(Z);
              return Z;
            });
            N.addToErrorHandler(K.onResultWithLog(Q.bind(this, !0, V)));
            N.addToSuccessHandler(K.onResultWithLog(Q.bind(this, !1, V)));
          } else {
            N.addToErrorHandler(K.onResultWithLog(Q.bind(this, !0))), N.addToSuccessHandler(K.onResultWithLog(Q.bind(this, !1)));
          }
          return P;
        }));
        return K.runFunctionInContext(N, F.origFn, this, ...L);
      };
    }
    wrapCallback(F) {
      const K = this;
      return y.ContextManager.bindToCurrentContext(function(...L) {
        const M = K.debugLogger.bind(K);
        M(() => `${F} ${F.descriptor.functionName} - callback enter`);
        const N = b.TransformerBase.emptyRunConfig();
        N.chain((0,b.tryFunction)(Q => {
          if (null != F.virtualNodeActivation) {
            if (0 < L.length && g.isError(L[0])) {
              const R = L[0];
              (new c.ExceptionAttachment(F.virtualNodeActivation)).fillExceptionData(R);
              M(() => `${F} ${F.descriptor.functionName} - ended virtual node with exception`);
            }
            F.createResultSetAttachment && F.setResultSetAttachmentData();
          }
          return Q;
        }));
        const P = Q => `${F} ${F.descriptor.functionName} - callback exit, didThrow: ${Q}`;
        N.addToErrorHandler(K.onResultWithLog(P.bind(this, !0))).addToSuccessHandler(K.onResultWithLog(P.bind(this, !1)));
        return K.runFunction(N, F.origCb, this, ...L);
      });
    }
    wrapReturnValue(F, K) {
      function L(Q, R) {
        return function(T) {
          return M.handleThenCallForCursors(this, F, Q, T, R, arguments);
        };
      }
      const M = this, N = K.retVal, P = M.controlParams.isDebugEnabled;
      e.PromiseTransformerUtilities.isActuallyAPromise(N) && (P && k.debug(`${F} ${F.descriptor.functionName} - register then wrapper and install dummy handlers on returned object`), K.setVal(e.PromiseTransformerUtilities.wrapPromise(N, L)), F.returnsPromise = !0);
    }
  }
  a.MongoDbCursorInternalNextTransformer = x;
  class A extends J {
    constructor(F, K, L, M) {
      super(F);
      this.dbType = K;
      this.clientType = L;
      this.version = M;
    }
    generateSubstitute(F) {
      const K = this;
      return y.ContextManager.bindToCurrentContext(function(...L) {
        K.debugLogger.bind(K)(() => `MongoDb [] ${F.functionName} - enter`);
        const M = b.TransformerBase.emptyRunConfig(), N = (P, Q) => `${null !== Q && void 0 !== Q ? Q : "MongoDb []"} ${F.functionName} - exit, didThrow: ${P}`;
        M.chain((0,b.bailIf)(!K.controlParams.active, "MongoDB sensor is inactive", K)).chain((0,b.tryFunction)(P => {
          var Q = new w.MongoDbConfigurationData(this, K.version);
          Q = new m.MongoDbAttachmentData(Q, void 0, void 0);
          const R = new H(Q, K, F);
          L = R.manipulateArguments(L);
          M.addToSuccessHandler(T => {
            R.manipulateReturnValue(T);
            return T;
          });
          M.addToErrorHandler(K.onResultWithLog(N.bind(this, !0, R)));
          M.addToSuccessHandler(K.onResultWithLog(N.bind(this, !1, R)));
          return P;
        }));
        return K.runFunction(M, F.origFn, this, ...L);
      });
    }
    wrapCallback(F) {
      const K = this;
      return y.ContextManager.bindToCurrentContext(function(...L) {
        const M = K.debugLogger.bind(K), N = b.TransformerBase.emptyRunConfig();
        N.chain((0,b.tryFunction)(Q => {
          M(() => `${F} ${F.descriptor.functionName} - callback enter`);
          const R = 0 < L.length ? L[L.length - 1] : void 0;
          let T;
          if (D.isActuallyADb(R, K.dbType)) {
            T = new w.MongoDbConfigurationData(R, K.version);
          } else if (D.isActuallyAClient(R, K.clientType)) {
            if (g.hasSingleProperty(R, "topology")) {
              T = new w.MongoDbConfigurationData(R.topology, K.version);
              const U = new E(K.controlParams), V = new l.FunctionSpec("db", "MongoClient", R);
              l.applyToSingle(V, U, l.cPolymorphicDefaultOptions);
            } else {
              M(() => `${F} ${F.descriptor.functionName} - could not patch db() on MongoClient: property \"topology \" not found`);
            }
          }
          null != T ? D.HostInfoEmbedder.set(R, T) : M(() => `${F} ${F.descriptor.functionName} - could not create initial MongoDbConfigurationData`);
          return Q;
        }));
        const P = Q => `${F} ${F.descriptor.functionName} - callback exit, didThrow: ${Q}`;
        N.addToErrorHandler(K.onResultWithLog(P.bind(this, !0))).addToSuccessHandler(K.onResultWithLog(P.bind(this, !0)));
        return K.runFunction(N, F.origCb, this, ...L);
      });
    }
    wrapReturnValue(F, K) {
      function L(Q, R) {
        return function(T) {
          return N.handleThenCall(this, F, Q, T, R, arguments);
        };
      }
      const M = K.retVal, N = this, P = N.controlParams.isDebugEnabled;
      e.PromiseTransformerUtilities.isActuallyAPromise(M) && (P && k.debug(`${F} ${F.descriptor.functionName} - register then wrapper and install dummy handlers on returned object`), K.setVal(e.PromiseTransformerUtilities.wrapPromise(M, L)), F.returnsPromise = !0);
    }
  }
  a.MongoDbConnectTransformer = A;
  class C extends d.AsyncTransformerBase {
    constructor(F, K) {
      super(F);
      this.version = K;
    }
    generateSubstitute(F) {
      const K = this;
      return function(...L) {
        K.debugLogger.bind(K)(() => `MongoDb [] ${F.functionName} - enter`);
        const M = b.TransformerBase.emptyRunConfig(), N = (P, Q) => `${null !== Q && void 0 !== Q ? Q : "MongoDb []"} ${F.functionName} - exit, didThrow: ${P}`;
        M.chain((0,b.bailIf)(!K.controlParams.active, "MongoDB sensor is inactive", K)).chain((0,b.tryFunction)(P => {
          const Q = new w.MongoDbConfigurationData(this, K.version);
          var R = new m.MongoDbAttachmentData(Q);
          R = new H(R, K, F);
          L = R.manipulateArguments(L);
          D.HostInfoEmbedder.set(this, Q);
          M.addToErrorHandler(K.onResultWithLog(N.bind(this, !0, R)));
          M.addToSuccessHandler(K.onResultWithLog(N.bind(this, !1, R)));
          return P;
        }));
        K.runFunction(M, F.origFn, this, ...L);
      };
    }
    wrapCallback(F) {
      const K = this;
      return y.ContextManager.bindToCurrentContext(function(...L) {
        const M = K.debugLogger.bind(K), N = b.TransformerBase.emptyRunConfig();
        N.chain((0,b.tryFunction)(Q => {
          M(() => `${F} ${F.descriptor.functionName} - callback enter`);
          return Q;
        }));
        const P = Q => `${F} ${F.descriptor.functionName} - callback exit, didThrow: ${Q}`;
        N.addToErrorHandler(K.onResultWithLog(P.bind(this, !0))).addToSuccessHandler(K.onResultWithLog(P.bind(this, !1)));
        return K.runFunction(N, F.origCb, this, ...L);
      });
    }
    wrapReturnValue() {
    }
  }
  a.MongoDbOpenTransformer = C;
  class E extends b.TransformerBase {
    generateSubstitute(F) {
      const K = this;
      return y.ContextManager.bindToCurrentContext(function(...L) {
        const M = K.debugLogger.bind(K), N = b.TransformerBase.emptyRunConfig(), P = Q => `${F.functionName} - exit, didThrow: ${Q}`;
        N.addToErrorHandler(K.onResultWithLog(P.bind(this, !0)));
        N.addToSuccessHandler(K.onResultWithLog(P.bind(this, !1)));
        N.chain((0,b.bailIf)(!K.controlParams.active, "MongoDB sensor is inactive", K)).chain((0,b.tryFunction)(Q => {
          M(() => `${F.functionName} - enter`);
          const R = D.HostInfoEmbedder.get(this);
          if (null != R) {
            N.addToSuccessHandler(T => {
              D.HostInfoEmbedder.set(T.retVal, R);
              return T;
            });
          } else {
            const T = `${F.functionName} - no MongoDbConfigurationData object found`;
            N.addToErrorHandler(K.onResultWithLog(T));
            N.addToSuccessHandler(K.onResultWithLog(T));
          }
          return Q;
        }));
        return K.runFunction(N, F.origFn, this, ...L);
      });
    }
  }
  a.MongoDbClientTransformer = E;
  class I extends J {
    constructor(F, K, L, M) {
      super(F);
      this.isDbCollection = K;
      this.collectionType = L;
      this.mongoDbVersion = M;
    }
    generateSubstitute(F) {
      const K = this, L = new p.FunctionId(F);
      return function(...M) {
        const N = K.debugLogger.bind(K);
        N(() => `MongoDb [] ${F.functionName} - enter`);
        const P = b.TransformerBase.emptyRunConfig();
        P.chain((0,b.bailIf)(!K.controlParams.active, "MongoDB sensor is inactive", K)).chain((0,b.tryFunction)(Q => {
          const R = (U, V) => {
            D.isActuallyACollection(V.retVal, K.collectionType) && D.HostInfoEmbedder.set(V.retVal, U);
            return V;
          };
          if (K.shouldCreateNode(M)) {
            if (D.suppressActivationCreation) {
              D.suppressActivationCreation = !1, N(() => `MongoDb [] ${F.functionName} - suppressing activation creation`);
            } else {
              let U = D.HostInfoEmbedder.get(this);
              null != U ? (N(() => `${F.functionName} - embedded MongoDbConfigurationData found`), U.updateDatabaseAttachmentInfo(this)) : (N(() => `${F.functionName} - no MongoDbConfigurationData found`), U = new w.MongoDbConfigurationData(this, K.mongoDbVersion));
              if (!K.isDbCollection || f.satisfies(K.mongoDbVersion, "<4.0.0")) {
                var T = new m.MongoDbAttachmentData(U, F.functionName, M);
                T.isCollectionMethod = D.isActuallyACollection(this, K.collectionType);
                const V = new H(T, K, F, K.isDbCollection), Z = K.tryStartAsyncActivation({sensorId:u.Agent.correlation.SensorId.NODEJS_MONGODB, functionId:L, category:u.Agent.correlation.MethodCategory.Database, attachmentCreator:V, vPathOption:1, createInitiatorNode:!1});
                null != Z && (Z.initialSpc.didInitiateAsyncOp = !0, Q = Q.setValue(y.CurrentSPC, Z.initialSpc), V.virtualNodeActivation = Z.vNodeActivation, N(() => `${V} ${F.functionName} - async activation created`), P.addToErrorHandler(ba => {
                  Z.vNodeActivation.exitOrException(ba);
                  Z.vNodeActivation.spc.end();
                  return ba;
                }), P.addToSuccessHandler(ba => {
                  V.manipulateReturnValue(ba);
                  V.hasCallback && V.returnsPromise && (Z.vNodeActivation.exitOrException(ba.exception), Z.vNodeActivation.spc.end());
                  return ba;
                }));
                M = V.manipulateArguments(M);
              }
              P.addToSuccessHandler(V => R(U, V));
            }
          } else if (K.isDbCollection) {
            const U = new w.MongoDbConfigurationData(this, K.mongoDbVersion);
            T = new m.MongoDbAttachmentData(U, F.functionName, M);
            M = (new H(T, K, F, K.isDbCollection)).manipulateArguments(M);
            P.addToSuccessHandler(V => R(U, V));
          }
          return Q;
        }));
        return K.runFunctionInContext(P, F.origFn, this, ...M);
      };
    }
    wrapCallback(F) {
      const K = this;
      return y.ContextManager.bindToCurrentContext(function(...L) {
        const M = K.debugLogger.bind(K);
        M(() => `${F} ${F.descriptor.functionName} - callback enter`);
        const N = b.TransformerBase.emptyRunConfig();
        N.chain((0,b.tryFunction)(Q => {
          if (null != F.virtualNodeActivation) {
            if (0 < L.length && g.isError(L[0])) {
              const R = L[0];
              (new c.ExceptionAttachment(F.virtualNodeActivation)).fillExceptionData(R);
              M(() => `${F} ${F.descriptor.functionName} - ended virtual node with exception`);
            }
            F.virtualNodeActivation.isExited || (2 === L.length && null != L[1] && (Array.isArray(L[1]) ? F.rowCount = L[1].length : g.hasSingleProperty(L[1], "insertedCount") && "number" === typeof L[1].insertedCount ? F.rowCount = L[1].insertedCount : F.rowCount = 1), F.setExitAttachmentValues(), F.virtualNodeActivation.exit());
          }
          D.suppressActivationCreation && (D.suppressActivationCreation = !1);
          null != F.mongoData.mongDbConfigData && 0 < L.length && D.isActuallyACollection(L[L.length - 1], K.collectionType) && D.HostInfoEmbedder.set(L[L.length - 1], F.mongoData.mongDbConfigData);
          return Q;
        })).addToSuccessHandler(Q => {
          null != F.virtualNodeActivation && F.virtualNodeActivation.spc.end();
          return Q;
        });
        const P = Q => `${null !== F && void 0 !== F ? F : "MongoDb []"} ${F.descriptor.functionName} - callback exit, didThrow: ${Q}`;
        N.addToErrorHandler(K.onResultWithLog(P.bind(this, !0))).addToSuccessHandler(K.onResultWithLog(P.bind(this, !1)));
        return K.runFunction(N, F.origCb, this, ...L);
      });
    }
    wrapReturnValue(F, K) {
      function L(Q, R) {
        return function(T) {
          return N.handleThenCall(this, F, Q, T, R, arguments);
        };
      }
      const M = K.retVal, N = this, P = N.controlParams.isDebugEnabled;
      e.PromiseTransformerUtilities.isActuallyAPromise(M) && (P && k.debug(`${F} ${F.descriptor.functionName} - register then wrapper and install dummy handlers on returned object`), K.setVal(e.PromiseTransformerUtilities.wrapPromise(M, L)), F.returnsPromise = !0);
    }
    shouldCreateNode(F) {
      return this.isDbCollection ? 1 <= F.length && F[1] && F[1].strict : !0;
    }
  }
  a.MongoDbTransformer = I;
  class H extends t.AsyncTracker {
    constructor(F, K, L, M) {
      super(K, L);
      this.mongoData = F;
      this.createResultSetAttachment = M;
      this.rowCount = this.execCount = 0;
      this.onExitTicksSet = this.returnsPromise = this.suppressExitVNode = this.exitVNode = this.suppressNext = this.isCursorInCallback = !1;
      this.id = q.UniqueId.getNext();
      K.controlParams.isDebugEnabled && k.debug(`${this} ${this.descriptor.functionName} - new tracker created #${"000" + this.id.toString(16).substr(-4)}`);
    }
    createAttachments(F) {
      if (null != this.mongoData) {
        this.sqlAttachment = new m.MongoDbQueryAttachment(F);
        this.sqlAttachment.valid && this.sqlAttachment.fillMongoDbQueryData(this.mongoData, this.isDebug());
        const K = new m.MongoDbConnectionPoolAttachment(F);
        K.valid && K.fillMongoDbConnectionPoolData(this.mongoData, this.isDebug());
        this.createResultSetAttachment && null == this.resultSetAttachment && (this.resultSetAttachment = new G.ResultSetAttachment(F));
      } else {
        r.fail("CreateAttachment called without MongoData!");
      }
    }
    setResultSetAttachmentData() {
      null != this.resultSetAttachment && this.resultSetAttachment.valid && null != this.virtualNodeActivation && u.Agent.correlation.setSqlResultSetData(this.virtualNodeActivation.spc.path, this.virtualNodeActivation.serialNo, this.execCount);
      this.isDebug() && k.debug(`Setting result set attachment value: EXEC_COUNT: ${this.execCount}`);
    }
    setExitAttachmentValues() {
      null != this.sqlAttachment && this.sqlAttachment.updateRowCount(this.rowCount, this.transformer.controlParams.isDebugEnabled);
    }
    toString() {
      this.logPrefix || (this.logPrefix = `MongoDb ${q.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
    isDebug() {
      return this.transformer.controlParams.isDebugEnabled;
    }
  }
});
S("src/lib/sensors/MongoDbSensor", "require exports src/lib/Logger src/lib/Patch src/lib/sensors/SensorBase src/lib/transformer/MongoDbTransformer src/lib/util/SemverUtil".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MongoDbSensor = void 0;
  let k, l, c;
  class m extends r.SensorBase {
    applyInstrumentation(d, e) {
      this.isDebugEnabled && u.debug(`${this.name}: inhibit ${d}`);
      c = d.moduleInfo.version;
      var b = p.satisfies(c, ">=4.0.0");
      if ("Module.main" === e.ruleKey) {
        this.isDebugEnabled && u.debug(`${this.name}: patching mongodb`);
        k = void 0;
        this.patchMongoDb(d, c, e);
        this.patchMongoDbConnect(d.moduleExports, c, b);
        b ? this.patchDbCollection(d.moduleExports, d.request, c, t.AsyncTrackingMode.None) : this.patchDbCollection(d.moduleExports, d.request, c, t.AsyncTrackingMode.CallbackLast);
        var g = b ? d.moduleExports.AbstractCursor.prototype : d.moduleExports.Cursor.prototype;
        const h = b ? "AbstractCursor" : "Cursor";
        this.patchCursorMethods(g, h, b);
        this.patchCursorNextMethods(g, h, c);
        this.patchCursorInternalNext(g, h, b);
        this.patchCollectionFind(d.moduleExports, d.request, c, b);
        this.patchCollectionAggregate(d.moduleExports, d.request, l, c, b);
        this.patchListCollections(d.moduleExports, d.request, k, c, b);
        k = void 0;
      }
      "MongoDb.aggregation_cursor" === e.ruleKey && (c ? (p.satisfies(c, ">=2.0.0 <4.0.0") ? l = d.moduleExports : b && (l = d.moduleExports.AggregationCursor), b || (b = new n.MongoDbCursorTransformer(this), g = new n.MongoDbCursorNextTransformer(this), this.patchAggregationCursorEach(l, d.request, b), this.patchAggregationCursorToArray(l, d.request, b), this.patchAggregationCursorNext(l, d.request, g), this.patchAggregationCursorInternalNext(l, d.request, c))) : u.warning("CommandCursor type not found - some methods will not be fully supported (e.g. Db.listCollection)!"));
      "MongoDb.command_cursor" === e.ruleKey && (e = new n.MongoDbCursorTransformer(this), b = new n.MongoDbCursorNextTransformer(this), c ? (p.satisfies(c, ">=2.0.0") && (k = d.moduleExports), this.patchCommandCursorEach(k, d.request, e), this.patchCommandCursorToArray(k, d.request, e), this.patchCommandCursorNext(k, d.request, b), this.patchCommandCursorInternalNext(k, d.request)) : u.warning("CommandCursor type not found - some methods will not be fully supported (e.g. Db.listCollection)!"));
    }
    patchMongoDb(d, e, b) {
      e = new n.MongoDbTransformer(this, !1, d.moduleExports.Collection, e);
      this.applyPatch(d, e, b);
    }
    patchMongoDbConnect(d, e, b) {
      e = new n.MongoDbConnectTransformer(this, d.Db, d.MongoClient, e);
      b || (b = new t.FunctionSpec("connect", "", d, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb"), t.applyToSingle(b, e));
      d = new t.FunctionSpec("connect", "MongoClient", d.MongoClient, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, e);
    }
    patchDbCollection(d, e, b, g) {
      e = new n.MongoDbTransformer(this, !0, d.Collection, b);
      this.isDebugEnabled && u.debug(`${this.name}: patching Db.collection`);
      d = new t.FunctionSpec("collection", "Db", d.Db.prototype, g, "mongodb");
      t.applyToSingle(d, e);
    }
    patchCursorMethods(d, e, b) {
      const g = new n.MongoDbCursorTransformer(this);
      this.patch(g, "toArray", e, d, t.cPolymorphicDefaultOptions);
      this.patch(g, b ? "bufferedCount" : "count", e, d);
      this.patch(g, b ? "forEach" : "each", e, d, t.cPolymorphicDefaultOptions);
    }
    patchCursorNextMethods(d, e, b) {
      const g = new n.MongoDbCursorNextTransformer(this);
      this.patchCursorHasNext(d, g, e);
      this.patchCursorNext(d, g, e);
      p.satisfies(b, "<3.0.0") && this.patchCursorNextObject(d, g, e);
    }
    patchCursorInternalNext(d, e, b) {
      b || (b = new n.MongoDbCursorInternalNextTransformer(this), this.patch(b, "_next", e, d, t.cPolymorphicDefaultOptions));
    }
    patchCursorHasNext(d, e, b) {
      this.patch(e, "hasNext", b, d, t.cPolymorphicDefaultOptions);
    }
    patchCursorNext(d, e, b) {
      this.patch(e, "next", b, d, t.cPolymorphicDefaultOptions);
    }
    patchCursorNextObject(d, e, b) {
      this.patch(e, "nextObject", b, d);
    }
    patch(d, e, b, g, h = t.cDefaultOptions) {
      this.isDebugEnabled && u.debug(`${this.name}: patching ${b}.${e}`);
      e = new t.FunctionSpec(e, b, g, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(e, d, h);
    }
    patchCommandCursorEach(d, e, b) {
      this.isDebugEnabled && u.debug(`${this.name}: patching commandCursor.Each`);
      d = new t.FunctionSpec("each", "CommandCursor", d.prototype, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, b, t.cPolymorphicDefaultOptions);
    }
    patchCommandCursorNext(d, e, b) {
      this.isDebugEnabled && u.debug(`${this.name}: patching commandCursor.Next`);
      d = new t.FunctionSpec("next", "CommandCursor", d.prototype, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, b, t.cPolymorphicDefaultOptions);
    }
    patchCommandCursorToArray(d, e, b) {
      this.isDebugEnabled && u.debug(`${this.name}: patching commandCursor.ToArray`);
      d = new t.FunctionSpec("toArray", "CommandCursor", d.prototype, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, b, t.cPolymorphicDefaultOptions);
    }
    patchCommandCursorInternalNext(d) {
      const e = new n.MongoDbCursorInternalNextTransformer(this);
      this.isDebugEnabled && u.debug(`${this.name}: commandCursor._next`);
      d = new t.FunctionSpec("_next", "CommandCursor", d.prototype, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, e, t.cPolymorphicDefaultOptions);
    }
    patchAggregationCursorEach(d, e, b) {
      this.isDebugEnabled && u.debug(`${this.name}: patching AggregationCursor.Each`);
      d = new t.FunctionSpec("each", "AggregationCursor", d.prototype, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, b, t.cPolymorphicDefaultOptions);
    }
    patchAggregationCursorNext(d, e, b) {
      this.isDebugEnabled && u.debug(`${this.name}: patching AggregationCursor.Next`);
      d = new t.FunctionSpec("next", "AggregationCursor", d.prototype, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, b, t.cPolymorphicDefaultOptions);
    }
    patchAggregationCursorToArray(d, e, b) {
      this.isDebugEnabled && u.debug(`${this.name}: patching AggregationCursor.ToArray`);
      d = new t.FunctionSpec("toArray", "AggregationCursor", d.prototype, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, b, t.cPolymorphicDefaultOptions);
    }
    patchAggregationCursorInternalNext(d) {
      const e = new n.MongoDbCursorInternalNextTransformer(this);
      this.isDebugEnabled && u.debug(`${this.name}: patching AggregationCursor._next`);
      d = new t.FunctionSpec("_next", "AggregationCursor", d.prototype, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, e, t.cPolymorphicDefaultOptions);
    }
    patchCollectionFind(d, e, b, g) {
      e = g ? new n.MongoDbReturnsCursorTransformer(this, d.Collection, d.AbstractCursor) : new n.MongoDbReturnsCursorTransformer(this, d.Collection, d.Cursor);
      this.isDebugEnabled && u.debug(`${this.name}: patching collection.Find`);
      d = new t.FunctionSpec("find", "Collection", d.Collection.prototype, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, e);
    }
    patchCollectionAggregate(d, e, b) {
      this.isDebugEnabled && u.debug(`${this.name}: patching collection.aggregate`);
      e = new n.MongoDbReturnsCursorTransformer(this, d.Collection, b);
      d = new t.FunctionSpec("aggregate", "Collection", d.Collection.prototype, t.AsyncTrackingMode.CallbackLastOrPromise, "mongodb");
      t.applyToSingle(d, e);
    }
    patchListCollections(d, e, b, g, h) {
      this.isDebugEnabled && u.debug(`${this.name}: patching Db.listCollections`);
      e = new n.MongoDbReturnsCursorTransformer(this, d.Collection, b);
      d = d.Db.prototype;
      b = t.AsyncTrackingMode.CallbackLastOrPromise;
      g = new t.FunctionSpec("listCollections", "Db", d, b, "mongodb");
      t.applyToSingle(g, e);
      h && (this.isDebugEnabled && u.debug(`${this.name}: patching Db.addUser, Db.admin, Db.collections`), g = new t.FunctionSpec("addUser", "Db", d, b, "mongodb"), t.applyToSingle(g, e), g = new t.FunctionSpec("admin", "Db", d, b, "mongodb"), t.applyToSingle(g, e), g = new t.FunctionSpec("collections", "Db", d, b, "mongodb"), t.applyToSingle(g, e));
    }
  }
  a.MongoDbSensor = m;
});
S("src/lib/transformer/RedisTracker", "require exports events src/lib/CallbackWrappingHelper src/lib/Embedder src/lib/Logger src/lib/Patch src/lib/util/ErrorUtil src/lib/util/UniqueId".split(" "), function(O, a, u, t, r, n, p, k, l) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.RedisTrackerSince4 = a.RedisTrackerPre26 = a.RedisTrackerSince26 = a.RedisTrackerBase = void 0;
  class c {
    constructor(b, g, h, f) {
      this.transformer = b;
      this.descriptor = g;
      this.redisClient = h;
      this.args = f;
      this.errorExtractor = t.errorFromFirstArg;
      this.injectedCallback = !1;
      this.isDebugEnabled = b.controlParams.isDebugEnabled;
      this.id = l.UniqueId.getNext();
    }
    manipulateArguments(b) {
      return b;
    }
    shallProcess() {
      return !0;
    }
    toString() {
      this.logPrefix || (this.logPrefix = `Redis ${l.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
    get opts() {
      return this.redisClient.connection_options || this.redisClient.connection_option || this.redisClient.connectionOption || this.redisClient.options || c.optionsEmbedder.get(this.redisClient);
    }
    get connInfo() {
      const b = this.opts;
      if (null != b) {
        const [g, h] = null != b.socket ? [b.socket.host, b.socket.port] : [b.host, b.port];
        return {host:g, port:h};
      }
      return {host:this.redisClient.host, port:this.redisClient.port};
    }
    manipulateReturnValue(b) {
      !b.didThrow && p.AsyncTrackingMode.isPromiseStyle(this.descriptor.asyncTrackingMode) && this.transformer.wrapReturnValue(this, b);
    }
    cbIsWrapped(b) {
      return null != b ? !!c.embedder.get(b) : !1;
    }
    getWrappedCallback(b) {
      null != b ? this.origCb = b : (this.injectedCallback = !0, this.origCb = this.transformer.emitErrors ? this.getEmittingRedisCb() : this.getThrowingRedisCb());
      b = this.transformer.wrapCallback(this);
      c.embedder.set(b, !0);
      return b;
    }
    getEmittingRedisCb() {
      const b = this;
      return function(g) {
        g && (b.redisClient instanceof u.EventEmitter ? (b.isDebugEnabled && n.debug(`${b}: reemit error event: ${g}`), b.redisClient.emit("error", g)) : b.isDebugEnabled && n.debug(`${b}: can't reemit error event: ${g}, ${typeof b.redisClient}`));
      };
    }
    getThrowingRedisCb() {
      const b = this;
      return function(g) {
        g && (b.isDebugEnabled && n.debug(`${b}: re-throw error event: ${g}`), process.nextTick(() => {
          throw g;
        }));
      };
    }
  }
  c.optionsEmbedder = r.create("redisOptions");
  c.embedder = r.create("redisTracker");
  a.RedisTrackerBase = c;
  class m extends c {
    manipulateArguments(b) {
      if (0 < b.length) {
        const g = b[0];
        null != g && (this.isDebugEnabled && n.debug(`${this}: ${"function" === typeof g.callback ? "wrap" : "inject"} callback`), g.callback = this.getWrappedCallback(g.callback));
      }
      return b;
    }
    shallProcess(b) {
      if (0 < b.length) {
        const g = b[0];
        if (null != g) {
          return !this.cbIsWrapped(g.callback);
        }
      }
      this.isDebugEnabled && n.debug(`${this}: Since26: unknown args: length=${b.length}, typeof(args[0])=${typeof b[0]}`);
      return !1;
    }
    getCommandName() {
      if (0 < this.args.length && null != this.args[0]) {
        const b = this.args[0].command;
        if ("string" === typeof b) {
          return this.isDebugEnabled && n.debug(`${this}: found command in CmdObj: ${b}`), b;
        }
      }
    }
  }
  a.RedisTrackerSince26 = m;
  class d extends c {
    manipulateArguments(b) {
      if (3 <= b.length) {
        if (void 0 === b[2] || "function" === typeof b[2]) {
          this.isDebugEnabled && n.debug(`${this}: ${"function" === typeof b[2] ? "wrap" : "inject"} at third argument`), b[2] = this.getWrappedCallback(b[2]);
        }
        return b;
      }
      if (2 === b.length && Array.isArray(b[1])) {
        const g = b[1];
        "function" === typeof g[g.length - 1] ? (g[g.length - 1] = this.getWrappedCallback(g[g.length - 1]), this.isDebugEnabled && n.debug(`${this}: wrapped last element in args[1]`)) : (this.isDebugEnabled && n.debug(`${this}: inject a third argument.`), b.push(this.getWrappedCallback()));
      }
      return b;
    }
    shallProcess(b) {
      let g;
      if (3 <= b.length && (void 0 === b[2] || "function" === typeof b[2])) {
        g = b[2];
      } else if (2 === b.length && Array.isArray(b[1])) {
        b = b[1], "function" === typeof b[b.length - 1] && (g = b[b.length - 1]);
      } else {
        return this.isDebugEnabled && n.debug(`${this}: Pre26: unknown args: length=${b.length}, typeof(args[2])=${typeof b[2]}`), !1;
      }
      return !this.cbIsWrapped(g);
    }
    getCommandName() {
      if (1 < this.args.length && Array.isArray(this.args[1])) {
        const b = this.args[0];
        if ("string" === typeof b) {
          return this.isDebugEnabled && n.debug(`${this}: found command in arg[0]: ${b}`), b;
        }
      }
    }
  }
  a.RedisTrackerPre26 = d;
  class e extends c {
    getCommandName() {
      if (0 < this.args.length && null != this.args[0]) {
        const b = this.args[0];
        try {
          const g = b.transformArguments(this.args.slice(1));
          if (Array.isArray(g)) {
            return this.isDebugEnabled && n.debug(`${this}: found command in CmdObj: ${g}`), 0 < g.length ? g[0] : void 0;
          }
        } catch (g) {
          k.logAgentException(g);
        }
      }
    }
  }
  a.RedisTrackerSince4 = e;
});
S("src/lib/transformer/RedisTransformer", "require exports src/lib/Agent src/lib/AttachmentBase src/lib/FunctionId src/lib/Logger src/lib/Patch src/lib/SubPathContext src/lib/util/CoreUtil src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/transformer/PromiseTransformerUtilities src/lib/transformer/RedisTracker src/lib/transformer/TransformerBase src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.Redis4CommanderTransformer = a.RedisTransformer = void 0;
  class f {
    constructor(y) {
      this.tracker = y;
    }
    createAttachments(y) {
      try {
        const D = new t.AttachmentBase(y, u.Agent.correlation.AttachmentId.EXTERNAL_CALL_ID, 0);
        D.valid ? D.setMultipleFields(J => {
          const B = u.Agent.correlation.AttachmentFieldId;
          J.stringCachedOrUnavailable(B.EXTERNALCALL_HOSTNAME_ID, this.tracker.connInfo.host);
          null != this.tracker.connInfo.port && J.integer(B.EXTERNALCALL_PORTNO_ID, +this.tracker.connInfo.port);
          J.stringCached(B.EXTERNALCALL_OPERATION_NAME_ID, this.getCommandName());
          J.integer(B.EXTERNALCALL_CALL_TYPE_ID, u.Agent.correlation.ExternalCallType.REDIS);
        }) : this.tracker.isDebugEnabled && n.debug(`${this.tracker}: failed to create attachment`);
      } catch (D) {
        m.logAgentException(D);
      }
    }
    getCommandName() {
      var y;
      return null !== (y = this.tracker.getCommandName()) && void 0 !== y ? y : this.tracker.descriptor.functionName;
    }
  }
  class q extends g.TransformerBase {
    constructor(y, D, J) {
      super(y);
      this.redisVersion = D;
      this.emitErrors = J;
    }
    getCommandName(y) {
      switch(this.redisVersion) {
        case 0:
          return y;
        case 1:
          if (c.hasSingleProperty(y, "command")) {
            return y.command;
          }
      }
    }
    generateSubstitute(y) {
      const D = this, J = D.debugLogger.bind(D), B = new r.FunctionId(y);
      return function(...v) {
        2 !== D.redisVersion ? J(() => {
          var A;
          return `Redis command(), argCnt: ${v.length}, cmd: ${null !== (A = D.getCommandName(null === v || void 0 === v ? void 0 : v[0])) && void 0 !== A ? A : "<missing>"}, isEmitter: ${d.isEventEmitter(this)}`;
        }) : J(() => `Redis command(), argCnt: ${v.length}`);
        const z = A => {
          switch(A) {
            case 0:
              return new b.RedisTrackerPre26(D, y, this, v);
            case 1:
              return new b.RedisTrackerSince26(D, y, this, v);
            case 2:
              return new b.RedisTrackerSince4(D, y, this, v);
          }
        }, x = g.TransformerBase.emptyRunConfig();
        x.chain((0,g.bailIf)(!D.controlParams.active, "Redis command() exit - inactive", D)).chain((0,g.tryFunction)(A => {
          const C = z(D.redisVersion);
          if (C.shallProcess(v)) {
            const E = new f(C), I = D.tryStartAsyncActivation({sensorId:u.Agent.correlation.SensorId.NODEJS_REDIS, functionId:B, attachmentCreator:E, createInitiatorNode:!1});
            null != I ? (A = A.setValue(h.CurrentSPC, I.initialSpc), C.virtualNodeActivation = I.vNodeActivation, v = C.manipulateArguments(v), x.addToSuccessHandler(H => {
              C.manipulateReturnValue(H);
              J(`${C}: command() success exit`);
              return H;
            }), x.addToErrorHandler(H => {
              J(() => `${C}: command() exit, didThrow: ${H}`);
              return H;
            }), J(() => `${C}: command() virt: ${I.initialSpc}`)) : J(() => `${C}: no activation, active spc: ${k.SubPathContext.getActiveContext()}`);
          } else {
            J(() => `${C}: Skip request because tracker.shallProcess returns false`);
          }
          return A;
        }));
        return D.runFunctionInContext(x, y.origFn, this, ...v);
      };
    }
    wrapCallback(y) {
      return h.ContextManager.bindToCurrentContext(function(...D) {
        try {
          if (null != y.virtualNodeActivation) {
            const J = d.isFunction(y.errorExtractor) ? d.doInvoke(this, y.errorExtractor, arguments) : void 0;
            y.virtualNodeActivation.exitOrException(J);
            y.virtualNodeActivation.spc.end();
          }
        } catch (J) {
          m.logAgentException(J);
        }
        return d.doInvoke(this, y.origCb, D);
      });
    }
    wrapReturnValue(y, D) {
      if (!D.didThrow && e.PromiseTransformerUtilities.isActuallyAPromise(D.retVal)) {
        const J = this;
        D.setVal(e.PromiseTransformerUtilities.wrapPromise(D.retVal, (B, v) => function(z) {
          return J.handleThenCall(this, y, B, z, v, arguments);
        }));
      }
    }
    handleThenCall(y, D, J, B, v, z) {
      const x = this, A = x.debugLogger.bind(x), C = g.TransformerBase.emptyRunConfig();
      C.chain((0,g.tryFunction)(E => {
        null != D.virtualNodeActivation && (A(() => `${D}: enter handleThenCall, isCatch=${J}`), D.virtualNodeActivation.isExited || (D.virtualNodeActivation.exitOrException(J ? B : void 0), D.virtualNodeActivation.spc.end(), A(() => `${D}: closing vNode=${D.virtualNodeActivation} and ending spc=${D.virtualNodeActivation.spc} in handleThenCall`)));
        C.addToErrorHandler(I => {
          A(() => `${D}: exit handleThenCall, didThrow ${I}`);
          return I;
        });
        C.addToSuccessHandler(x.onResultWithLog(() => `${D}: exit handleThenCall success`));
        return E;
      }));
      return x.runFunction(C, v, y, ...z);
    }
  }
  a.RedisTransformer = q;
  class w extends g.TransformerBase {
    constructor(y) {
      super(y);
      this.sensorBase = y;
    }
    generateSubstitute(y) {
      const D = this, J = D.debugLogger.bind(D);
      return function(B, ...v) {
        J(() => {
          var x;
          return `Redis extendWithCommands options base class: ${null === (x = null === B || void 0 === B ? void 0 : B.BaseClass) || void 0 === x ? void 0 : x.name}`;
        });
        const z = g.TransformerBase.emptyRunConfig();
        z.chain((0,g.bailIf)(!D.controlParams.active, "Redis extendWithCommands() exit - inactive", D)).chain((0,g.tryFunction)(x => {
          if (null != B) {
            const E = B.BaseClass.name;
            var A = D.getMainMethodToSubstitute(E);
            if (null != A) {
              var C = new q(D.controlParams, 2, !0);
              A = new p.FunctionSpec(A, E, B.BaseClass.prototype, p.AsyncTrackingMode.Promise);
              if (null == p.applyToSingle(A, C)) {
                throw Error(`${D.sensorBase}: failed to patch Redis: ${E}`);
              }
              if ("RedisClient" === E) {
                B.executor = B.BaseClass.prototype.commandsExecutor;
                C = (0,l.getPropertyNameAnyOf)(B.BaseClass.prototype, ["MULTI", "multi"]);
                if (!C) {
                  throw Error(`${D.sensorBase}: failed to lookup MULTI/multi method in redis client: ${E}`);
                }
                A = new p.FunctionSpec(C, E, B.BaseClass.prototype, p.AsyncTrackingMode.Promise);
                if (null == p.applyToSingle(A, new G(D.controlParams))) {
                  throw Error(`${D.sensorBase}: failed to patch ${E}.${C}()`);
                }
              }
            }
          }
          z.addToErrorHandler(E => {
            J(() => `exit extendWithCommands, didThrow ${E}`);
            return E;
          });
          z.addToSuccessHandler(D.onResultWithLog(() => "exit extendWithCommands success"));
          return x;
        }));
        return D.runFunction(z, y.origFn, this, B, ...v);
      };
    }
    getMainMethodToSubstitute(y) {
      switch(y) {
        case "RedisClientMultiCommand":
          return "exec";
        case "RedisClient":
          return "commandsExecutor";
      }
    }
  }
  a.Redis4CommanderTransformer = w;
  class G extends g.TransformerBase {
    generateSubstitute(y) {
      const D = this, J = D.debugLogger.bind(this);
      return function(...B) {
        J(() => "Redis multi()");
        const v = g.TransformerBase.emptyRunConfig();
        v.chain((0,g.bailIf)(!D.controlParams.active, "Redis multi() exit - inactive", D)).chain((0,g.tryFunction)(z => {
          v.addToSuccessHandler(x => {
            b.RedisTrackerBase.optionsEmbedder.set(x.retVal, this.options);
            return x;
          });
          return z;
        }));
        return D.runFunction(v, y.origFn, this, ...B);
      };
    }
  }
});
S("src/lib/sensors/RedisSensor", "require exports src/lib/Patch src/lib/sensors/SensorBase src/lib/transformer/RedisTransformer src/lib/ModuleRegistry src/lib/Debug src/lib/Logger src/lib/util/ErrorUtil src/lib/util/SemverUtil".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.RedisSensor = void 0;
  class m extends t.SensorBase {
    applyInstrumentation(d, e) {
      const b = n.ModuleRegistry.lookup(d);
      let g;
      var h = f => {
        if ("function" !== typeof d.moduleExports[f]) {
          var q = `RedisClient function not found: ${f}. Failed to patch Redis version: ${b.version}`;
          k.warning(q);
          l.reportInstrumentationError(this, q);
          throw Error(q);
        }
        q = new r.Redis4CommanderTransformer(this);
        f = new u.FunctionSpec(f, d.request, d.moduleExports);
        g = u.applyToSingle(f, q);
      };
      switch(e.ruleKey) {
        case "Module.main":
          e = "";
          if (null == d.moduleExports.RedisClient) {
            k.warning(`RedisClient object not found. Failed to patch Redis version: ${b.version}`);
            l.reportInstrumentationError(this, `RedisClient object not found. Failed to patch redis version: ${b.version}`);
            return;
          }
          "function" === typeof d.moduleExports.RedisClient.prototype.internal_send_command ? (h = 1, e = "internal_send_command") : (h = 0, e = "send_command");
          const f = c.satisfies(b.version, ">=2.0.0");
          h = new r.RedisTransformer(this, h, f);
          e = new u.FunctionSpec(e, "RedisClient", d.moduleExports.RedisClient.prototype);
          g = u.applyToSingle(e, h);
          break;
        case "NodeRedis.client.commander_impl":
          h("extendWithCommands");
          break;
        case "Redis.client.commander_impl":
          h("attachCommands");
      }
      null == g && (k.warning(`Failed to patch Redis version: ${b.version}`), l.reportInstrumentationError(this, `failed to patch redis version: ${b.version}`), p.fail());
    }
  }
  a.RedisSensor = m;
});
S("src/lib/transformer/MemcachedTracker", ["require", "exports", "src/lib/util/ErrorUtil", "src/lib/CallbackWrappingHelper", "src/lib/contextmanager/ContextManager"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MemcachedTracker = void 0;
  class n {
    constructor(p) {
      this.transformer = p;
      this.injectedCallback = !1;
      this.errorExtractor = t.errorFromFirstArg;
    }
    manipulateArguments(p) {
      if (0 < p.length) {
        try {
          const k = p[0]();
          null != k.callback ? this.origCb = k.callback : (this.injectedCallback = !0, this.origCb = () => {
          });
          k.callback = r.ContextManager.bindToCurrentContext(this.transformer.wrapCallback(this));
          p[0] = function() {
            return k;
          };
        } catch (k) {
          u.logAgentException(k);
        }
      }
      return p;
    }
  }
  a.MemcachedTracker = n;
});
S("src/lib/transformer/MemcachedTransformer", "require exports src/lib/Agent src/lib/AttachmentBase src/lib/Embedder src/lib/FunctionId src/lib/util/InvocationUtil src/lib/util/ErrorUtil src/lib/transformer/MemcachedTracker src/lib/transformer/TransformerBase src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MemcachedConnectTransformer = a.MemcachedCommandTransformer = a.MemcachedAttachmentCreator = void 0;
  const d = r.create("memcachedAttachment");
  class e {
    constructor(h, f) {
      this.originalDescriptor = h;
      this.args = f;
    }
    createAttachments(h) {
      var f = u.Agent.correlation;
      this.externalCallAttachment = new t.AttachmentBase(h, f.AttachmentId.EXTERNAL_CALL_ID, 0);
      h = f.AttachmentFieldId;
      f = this.getCommandName();
      this.externalCallAttachment.setStringCached(h.EXTERNALCALL_OPERATION_NAME_ID, f);
      this.externalCallAttachment.attachment.setFieldInteger(h.EXTERNALCALL_CALL_TYPE_ID, u.Agent.correlation.ExternalCallType.MEMCACHED);
    }
    setServerInfo(h) {
      if (null != this.externalCallAttachment && "string" === typeof h && 0 < h.length) {
        var f = h.split(":");
        h = f[0];
        let q = 11211;
        1 < f.length && (q = +f[1]);
        f = u.Agent.correlation.AttachmentFieldId;
        this.externalCallAttachment.setStringCached(f.EXTERNALCALL_HOSTNAME_ID, h);
        this.externalCallAttachment.attachment.setFieldInteger(f.EXTERNALCALL_PORTNO_ID, q);
      }
    }
    getCommandName() {
      if (0 < this.args.length) {
        const h = this.args[0];
        if (null != h.name) {
          return h.name;
        }
      }
      return this.originalDescriptor.functionName;
    }
  }
  a.MemcachedAttachmentCreator = e;
  class b extends c.TransformerBase {
    generateSubstitute(h) {
      const f = this, q = new n.FunctionId(h);
      return function(...w) {
        const G = (new c.FunctionRunConfig()).chain((0,c.bailIf)(!f.controlParams.active, "mamcached sensor is inactive", f)).chain((0,c.tryFunction)(y => {
          const D = new l.MemcachedTracker(f), J = new e(h, w), B = f.tryStartAsyncActivation({sensorId:u.Agent.correlation.SensorId.NODEJS_MEMCACHED, functionId:q, attachmentCreator:J, createInitiatorNode:!1});
          null != B && (D.virtualNodeActivation = B.vNodeActivation, d.set(this, J), D.manipulateArguments(w), y = y.setValue(m.CurrentSPC, B.initialSpc));
          return y;
        }));
        return f.runFunctionInContext(G, h.origFn, this, ...w);
      };
    }
    wrapCallback(h) {
      return function(...f) {
        try {
          if (null != h.virtualNodeActivation) {
            const q = p.isFunction(h.errorExtractor) ? p.doInvoke(this, h.errorExtractor, arguments) : void 0;
            h.virtualNodeActivation.exitOrException(q);
            h.virtualNodeActivation.spc.end();
          }
        } catch (q) {
          k.logAgentException(q);
        }
        return p.doInvoke(this, h.origCb, f);
      };
    }
  }
  a.MemcachedCommandTransformer = b;
  class g {
    generateSubstitute(h) {
      return function() {
        const f = d.get(this);
        null != f && 0 < arguments.length && (f.setServerInfo(arguments[0]), d.clear(this));
        return p.doInvoke(this, h.origFn, arguments);
      };
    }
  }
  a.MemcachedConnectTransformer = g;
});
S("src/lib/sensors/MemcachedSensor", ["require", "exports", "src/lib/Patch", "src/lib/sensors/SensorBase", "src/lib/transformer/MemcachedTransformer"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MemcachedSensor = void 0;
  class n extends t.SensorBase {
    applyInstrumentation(p) {
      u.applyToSingle(new u.FunctionSpec("command", "Client", p.moduleExports.prototype), new r.MemcachedCommandTransformer(this));
      u.applyToSingle(new u.FunctionSpec("connect", "Client", p.moduleExports.prototype), new r.MemcachedConnectTransformer());
    }
  }
  a.MemcachedSensor = n;
});
S("src/lib/sensors/ExpressSensor", "require exports src/lib/Patch src/lib/sensors/SensorBase src/lib/sensors/WebRequestSensor src/lib/Embedder src/lib/RunTimeProperty src/lib/transformer/TransformerBase src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/SemverUtil src/lib/Agent".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ExpressSensor = void 0;
  const e = n.create("parentUse");
  class b extends k.TransformerBase {
    constructor(q, w) {
      super(q);
      this.name = w;
    }
    generateSubstitute(q) {
      const w = this;
      return function(G, y, D, J) {
        const B = w.debugLogger.bind(w), v = k.TransformerBase.emptyRunConfig();
        v.chain((0,k.bailIf)(!w.controlParams.active, `${w.name} sensor is inactive`, w)).chain((0,k.bailIf)(!r.WebRequestSensorApi.isMonitored(D), `${w.name} - web request response is not monitored`, w)).chain((0,k.tryFunction)(z => {
          B(() => `${w.name}: capture error ${c.verboseExceptionObject(G)}`);
          l.isError(G) && r.WebRequestSensorApi.attachError(D, G);
          return z;
        }));
        return w.runFunction(v, q.origFn, this, G, y, D, J);
      };
    }
  }
  class g extends k.TransformerBase {
    constructor(q, w) {
      super(q);
      this.name = w;
    }
    generateSubstitute(q) {
      const w = this;
      return function(G, y, D) {
        const J = w.debugLogger.bind(w), B = k.TransformerBase.emptyRunConfig();
        B.chain((0,k.bailIf)(!r.WebRequestSensorApi.isMonitored(y), `${w.name} - web request response is not monitored`, w)).chain((0,k.bailIf)(!w.controlParams.active, `${w.name} sensor is inactive`, w)).chain((0,k.tryFunction)(v => {
          var z;
          const x = e.get(this);
          null == this.route && null == x || J(() => `${w.name}: route: ${this.route} parentRoute: ${null === x || void 0 === x ? void 0 : x.route}`);
          r.WebRequestSensorApi.addSubRoute(y, x);
          r.WebRequestSensorApi.attachRoute(y, null === (z = this.route) || void 0 === z ? void 0 : z.path);
          return v;
        }));
        return w.runFunction(B, q.origFn, this, G, y, D);
      };
    }
  }
  class h extends k.TransformerBase {
    constructor(q, w) {
      super(q);
      this.name = w;
    }
    generateSubstitute(q) {
      const w = this;
      return function(G, ...y) {
        const D = w.debugLogger.bind(w), J = k.TransformerBase.emptyRunConfig();
        J.chain((0,k.bailIf)(!w.controlParams.active, `${w.name} sensor is inactive`, w)).chain((0,k.tryFunction)(B => {
          const v = r.WebRequestSubRoute.make(G, this);
          if (null != v && (D(() => `${w.name}: use - route: ${v.route}`), 0 < (null === y || void 0 === y ? void 0 : y.length))) {
            var z = y[0];
            if (l.hasProperty(z, "stack") && (z = z.stack, Array.isArray(z))) {
              for (const x of z) {
                e.set(x, v);
              }
            }
          }
          return B;
        }));
        return w.runFunction(J, q.origFn, this, G, ...y);
      };
    }
  }
  class f extends t.SensorBase {
    constructor() {
      super(...arguments);
      this.routeMonitoringDisabled = new p.BooleanProperty("ExpressSensorHttpRouteDisabled", !1);
    }
    applyInstrumentation(q, w) {
      if (null == w.ruleKey) {
        d.Logger.warning("ExpressSensor: rule.ruleKey is missing");
      } else {
        var G = w.ruleKey.startsWith("Router."), y = G && !m.satisfies(q.moduleInfo.version, "<2.0"), D = G ? "Router" : "Express";
        if ("Express.layer" === w.ruleKey || "Router.layer" === w.ruleKey) {
          u.applyToSingle(new u.FunctionSpec(y ? "handleError" : "handle_error", "Layer", q.moduleExports.prototype), new b(this, D)), this.routeMonitoringDisabled.value || u.applyToSingle(new u.FunctionSpec(y ? "handleRequest" : "handle_request", "Layer", q.moduleExports.prototype), new g(this, D));
        } else if ("Express.express" === w.ruleKey || "Router.index" === w.ruleKey) {
          this.routeMonitoringDisabled.value || u.applyToSingle(new u.FunctionSpec("use", "Router", G ? q.moduleExports.prototype : q.moduleExports.Router.prototype.constructor), new h(this, D));
        }
      }
    }
  }
  a.ExpressSensor = f;
});
S("src/lib/sensors/HapiSensor", "require exports src/lib/Patch src/lib/sensors/SensorBase src/lib/transformer/TransformerBase src/lib/sensors/WebRequestSensor src/lib/util/CoreUtil".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.HapiSensor = void 0;
  class k extends r.TransformerBase {
    generateSubstitute(c) {
      const m = this;
      return function(d, ...e) {
        const b = m.debugLogger.bind(m), g = r.TransformerBase.emptyRunConfig();
        g.chain((0,r.bailIf)(!m.controlParams.active, "Hapi sensor is inactive", m)).chain((0,r.bailIf)(!p.hasSingleProperty(d, "raw"), "Hapi missing request.raw property", m)).chain((0,r.bailIf)(!p.hasSingleProperty(d, "route"), "Hapi missing request.route property", m)).chain((0,r.tryFunction)(h => {
          const f = d.raw.res;
          null != f && n.WebRequestSensorApi.isMonitored(f) && (b(() => `Hapi execute request path: ${d.route.path}`), n.WebRequestSensorApi.attachRoute(f, d.route.path));
          return h;
        }));
        return m.runFunction(g, c.origFn, this, d, ...e);
      };
    }
  }
  class l extends t.SensorBase {
    applyInstrumentation(c, m) {
      "Hapi.handler" === m.ruleKey && u.applyToSingle(new u.FunctionSpec("execute", "Hapi", c.moduleExports), new k(this));
    }
  }
  a.HapiSensor = l;
});
S("src/lib/sensors/FinalHandlerSensor", "require exports src/lib/Logger src/lib/Patch src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/sensors/SensorBase src/lib/sensors/WebRequestSensor".split(" "), function(O, a, u, t, r, n, p, k) {
  function l(m, d, e) {
    return function(b) {
      try {
        r.isError(b) && k.WebRequestSensorApi.isMonitored(d) && (e.isDebugEnabled && u.debug(`${e.name}: capture error ${n.verboseExceptionObject(b)}`), k.WebRequestSensorApi.attachError(d, b));
      } catch (g) {
        n.logAgentException(g);
      }
      m(b);
    };
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.FinalHandlerSensor = void 0;
  class c extends p.SensorBase {
    applyInstrumentation(m) {
      var d = m.moduleExports;
      if ("function" === typeof d && 3 === d.length) {
        m.moduleExports = this.makeFinalHandlerSubstituteClosure(d);
        const e = new t.SubstitutedFnDescriptor(new t.FunctionSpec("finalHandler", "finalhandler", void 0), d, !1);
        t.tag(e, m.moduleExports, d);
      } else {
        m = "function" === typeof d, d = d.length, u.warning(`${this.name}: instrumentation failed as exports did not match expected: ${m} ${d}`), n.reportInstrumentationError(this, `failed as exports did not match expected: ${m} ${d}`);
      }
    }
    makeFinalHandlerSubstituteClosure(m) {
      const d = this;
      return function(e, b, g) {
        e = m.call(this, e, b, g);
        return k.WebRequestSensorApi.isMonitored(b) && d.active ? l(e, b, d) : e;
      };
    }
  }
  a.FinalHandlerSensor = c;
});
S("src/lib/sensors/RestifySensor", "require exports http src/lib/Logger src/lib/Patch src/lib/sensors/SensorBase src/lib/sensors/WebRequestSensor src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/transformer/TransformerBase src/lib/RunTimeProperty".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.RestifySensor = void 0;
  class d extends c.TransformerBase {
    constructor(b, g) {
      super(b);
      this.name = g;
    }
    generateSubstitute(b) {
      const g = this;
      return function(h, f, ...q) {
        const w = g.debugLogger.bind(g), G = c.TransformerBase.emptyRunConfig();
        G.chain((0,c.bailIf)(!g.controlParams.active, "Restify sensor is inactive", g)).chain((0,c.bailIf)("function" !== typeof f, `${g.name} handler is not a function`, g)).chain((0,c.tryFunction)(y => {
          w(() => `${g.name} patch handler`);
          f = g.wrapHandlerCb(f);
          return y;
        }));
        return g.runFunction(G, b.origFn, this, h, f, ...q);
      };
    }
    wrapHandlerCb(b) {
      const g = this;
      return function(h, f, q) {
        const w = g.debugLogger.bind(g), G = c.TransformerBase.emptyRunConfig();
        G.chain((0,c.bailIf)(!p.WebRequestSensorApi.isMonitored(f), `${g.name} - web request response is not monitored`, g)).chain((0,c.bailIf)(!k.hasSingleProperty(h, "route"), `${g.name} missing req.route property`, g)).chain((0,c.tryFunction)(y => {
          if (null != h.route) {
            const D = h.route;
            w(() => `${g.name} route: ${p.WebRequestSubRoute.pathOrRegexToString(D.path)}`);
            p.WebRequestSensorApi.attachRoute(f, D.path);
          }
          return y;
        }));
        return g.runFunction(G, b, this, h, f, q);
      };
    }
  }
  class e extends n.SensorBase {
    constructor() {
      super(...arguments);
      this.routeMonitoringDisabled = new m.BooleanProperty("RestifySensorHttpRouteDisabled", !1);
    }
    applyInstrumentation(b, g) {
      if ("Restify.response" === g.ruleKey) {
        b.load(), b = new r.FunctionSpec("send", "ServerResponse", u.ServerResponse.prototype), r.substitute(b, this.makeResponseSendSubstituteClosure());
      } else if ("Restify.server" === g.ruleKey && !this.routeMonitoringDisabled.value) {
        g = "get head post put patch delete options".split(" ");
        for (const h of g) {
          r.applyToSingle(new r.FunctionSpec(h, "Server", b.moduleExports.prototype), new d(this, `Restify[${h}]`));
        }
      }
    }
    makeResponseSendSubstituteClosure() {
      const b = this;
      return function h() {
        if (p.WebRequestSensorApi.isMonitored(this) && 0 < arguments.length) {
          try {
            let f;
            k.isError(arguments[0]) ? f = arguments[0] : 1 < arguments.length && k.isError(arguments[1]) && (f = arguments[1]);
            null != f && (b.isDebugEnabled && t.debug(`${b.name}: capture error ${l.verboseExceptionObject(f)}`), p.WebRequestSensorApi.attachError(this, f));
          } catch (f) {
            t.debug(`RestifySensor: failed with ${l.verboseExceptionObject(f)}`);
          }
        }
        return r.invokeOriginal(h, this, arguments);
      };
    }
  }
  a.RestifySensor = e;
});
S("src/lib/transformer/PromiseTransformer", "require exports src/lib/Logger src/lib/Patch src/lib/SubPathContext src/lib/transformer/PromiseTransformerUtilities src/lib/util/InvocationUtil src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n, p, k) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.PromiseTransformer = void 0;
  class l {
    constructor(c = !1, m = !1) {
      this.instrumentInstanceInsteadOfPrototype = c;
      this.wrapCatch = m;
    }
    instrument(c) {
      function m() {
        const f = p.doInvoke(this, t.PatchedFnDescriptor.getOrigFn(m), arguments), q = new t.FunctionSpec("then", "Promise", f);
        t.substitute(q, d, t.cPolymorphicDefaultOptions);
        return f;
      }
      function d() {
        const f = this, q = r.SubPathContext.getActiveContext();
        if (null === q || void 0 === q ? 0 : q.open) {
          q.didInitiateAsyncOp = !0;
        }
        const w = n.PromiseEmbedder.createOrGet(f, () => new n.EmbeddedPromiseContext()), G = (D, J) => function(B) {
          var v, z, x;
          B = null !== (v = r.SubPathContext.getActiveContext()) && void 0 !== v ? v : q;
          v = null != B ? null === (z = k.ContextManager.activeAsyncState) || void 0 === z ? void 0 : z.setValue(k.CurrentSPC, B) : null !== (x = k.ContextManager.activeAsyncState) && void 0 !== x ? x : k.ROOT_STORE;
          return k.ContextManager.runInContext(v, () => p.doInvoke(this, J, arguments), null);
        };
        var y = (D, J) => {
          var B;
          const v = null !== (B = w.customThenWrapper) && void 0 !== B ? B : G;
          return p.isFunction(v) && p.isFunction(J) ? Reflect.apply(v, f, [D, J]) : J;
        };
        arguments[0] = y(!1, arguments[0]);
        arguments[1] = y(!0, arguments[1]);
        y = p.doInvoke(f, t.PatchedFnDescriptor.getOrigFn(d), arguments);
        n.PromiseEmbedder.set(y, w);
        b.instrumentInstanceInsteadOfPrototype && (y.then = d);
        return y;
      }
      function e(f) {
        return this.then(void 0, f);
      }
      const b = this;
      if (function() {
        return null == c ? (u.warning("Unable to instrument this particular promise implementation, because we don't have any exports at all."), !1) : null == c.Promise && null == c.promise ? (u.warning("Unable to instrument this particular promise implementation, because we don't have '.Promise'."), !1) : b.instrumentInstanceInsteadOfPrototype || n.PromiseTransformerUtilities.isActuallyAPromise(c.Promise.prototype) ? !0 : (u.warning("Unable to instrument this particular promise implementation, because we don't have '.Promise.prototype.then'."), 
        !1);
      }()) {
        if (this.instrumentInstanceInsteadOfPrototype) {
          var g = new t.FunctionSpec("", "Promise", c), h = "function" === typeof c.Promise;
          const f = "function" === typeof c.promise;
          h || f ? (h && !t.isApplied(c.Promise) && (h = c.Promise === c.promise, g.functionName = "Promise", t.substitute(g, m), Object.assign(c.Promise, t.PatchedFnDescriptor.getOrigFn(c.Promise)), h && (c.promise = c.Promise)), f && !t.isApplied(c.promise) && (g.functionName = "promise", t.substitute(g, m))) : u.warning("Unable to instrument this promise instance, because we can't find the constructor.");
        } else {
          "function" !== typeof c.Promise ? u.warning("Unable to instrument this promise instance, because we can't find the constructor.") : (t.isApplied(c.Promise.prototype.then) || (g = new t.FunctionSpec("then", "Promise", c.Promise.prototype), t.substitute(g, d)), b.wrapCatch && !t.isApplied(c.Promise.prototype.catch) && (g = new t.FunctionSpec("catch", "Promise", c.Promise.prototype), t.substitute(g, e)));
        }
      }
    }
  }
  a.PromiseTransformer = l;
});
S("src/lib/sensors/PromiseSensor", ["require", "exports", "src/lib/Logger", "src/lib/sensors/SensorBase", "src/lib/transformer/PromiseTransformer"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.PromiseSensor = void 0;
  class n extends t.SensorBase {
    applyInstrumentation(p, k) {
      this.isDebugEnabled && u.debug(`${this.name}: instrumenting module ${p.toString(!0)}`);
      if (null != p.moduleExports) {
        if (k = new r.PromiseTransformer("Promise.q" === k.ruleKey, "Promise.m" === k.ruleKey), null != p.moduleExports.Promise || null != p.moduleExports.promise) {
          k.instrument(p.moduleExports);
        } else {
          const l = {Promise:p.moduleExports};
          k.instrument(l);
          p.moduleExports = l.Promise;
        }
      }
    }
  }
  a.PromiseSensor = n;
});
S("src/lib/sensors/TimerSensor", "require exports src/lib/sensors/SensorBase src/lib/Patch src/lib/RunTimeProperty src/lib/transformer/ContextPassingTransformer".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.TimerSensor = void 0;
  class p extends u.SensorBase {
    constructor(k, l) {
      super(k, l);
      this.monitoredFn = [];
      (new r.BooleanOption("TrackSetInterval", !1)).value || this.monitoredFn.push("setInterval");
    }
    applyInstrumentation(k) {
      if ("timers" === k.request) {
        var l = k.moduleExports, c = [], m = [];
        this.monitoredFn.forEach(b => {
          l[b] === global[b] ? m.push(b) : c.push(b);
        });
        var d = new n.ContextBlockingTransformer(this);
        k = new t.ModuleSpec("timers", l, t.AsyncTrackingMode.CallbackFirst);
        t.applyToAll(k, this.monitoredFn, d);
        if (0 < c.length) {
          var e = new t.ModuleSpec("global", global, t.AsyncTrackingMode.CallbackFirst);
          t.applyToAll(e, c, d);
        }
        d = new n.ContextBlockingTransformer(this, (b, g) => "number" === typeof g && g >= p.timeoutOption.value);
        l.setTimeout === global.setTimeout ? m.push("setTimeout") : (e = new t.FunctionSpec("setTimeout", "global", global, t.AsyncTrackingMode.CallbackFirst), t.applyToSingle(e, d));
        k = new t.FunctionSpec("setTimeout", k);
        t.applyToSingle(k, d);
        m.forEach(b => {
          global[b] = l[b];
        });
      }
    }
  }
  p.timeoutOption = new r.NumberOption("TrackTimeoutValueMs", 51);
  a.TimerSensor = p;
});
S("src/lib/sensors/CryptoSensor", ["require", "exports", "src/lib/Patch", "src/lib/sensors/SensorBase", "src/lib/transformer/ContextPassingTransformer"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.CryptoSensor = void 0;
  class n extends t.SensorBase {
    applyInstrumentation(p, k) {
      if ("crypto" === p.request) {
        var l = p.moduleExports, c = new r.ContextPassingTransformer(this), m = l.randomBytes !== l.pseudoRandomBytes, d = l.rng === l.randomBytes, e = l.prng === l.pseudoRandomBytes;
        this.applyPatch(p, c, k);
        m ? this.patchPseudoRandomBytes(l, c, "pseudoRandomBytes") : l.pseudoRandomBytes = l.randomBytes;
        d ? l.rng = l.randomBytes : "function" === typeof l.rng && this.patchPseudoRandomBytes(l, c, "rng");
        e ? l.prng = l.pseudoRandomBytes : "function" === typeof l.prng && this.patchPseudoRandomBytes(l, c, "prng");
      }
    }
    patchPseudoRandomBytes(p, k, l) {
      p = new u.FunctionSpec(l, "crypto", p, u.AsyncTrackingMode.CallbackLast);
      u.applyToSingle(p, k);
    }
  }
  a.CryptoSensor = n;
});
S("src/lib/sensors/MySqlAttachment", "require exports src/lib/Agent src/lib/AttachmentBase src/lib/sensors/SensorConstants src/lib/util/CoreUtil".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MySqlData = a.MySqlConnectionPoolAttachment = a.MySqlQueryAttachment = a.DATABASE_TYPE = void 0;
  a.DATABASE_TYPE = "MySQL";
  class p extends t.AttachmentBase {
    constructor(c) {
      super(c, u.Agent.correlation.AttachmentId.SQL_ID, 0);
    }
    fillMySqlQueryData(c) {
      this.setString(u.Agent.correlation.AttachmentFieldId.SQL_STATEMENT, c.queryString, u.Configuration.maxSqlStringLen);
    }
    setNumberOfRowsReturned(c) {
      this.attachment.setFieldInteger(u.Agent.correlation.AttachmentFieldId.SQL_NUM_ROWS_RETURNED, c);
    }
  }
  a.MySqlQueryAttachment = p;
  class k extends t.AttachmentBase {
    constructor(c) {
      super(c, u.Agent.correlation.AttachmentId.CONNECTION_POOL_ID, 0);
    }
    fillMySqlConnectionPoolData(c) {
      this.setMultipleFields(m => {
        const d = u.Agent.correlation, e = d.AttachmentFieldId;
        m.stringCached(e.CONNECTION_POOL_DB, c.dbName);
        m.stringCached(e.CONNECTION_POOL_URL, c.dbUrl);
        m.stringCached(e.CONNECTION_POOL_DBTYPE, a.DATABASE_TYPE);
        m.stringCached(e.CONNECTION_POOL_DBHOST, c.dbHost);
        m.integer(e.CONNECTION_POOL_DBPORTNO, c.dbPort);
        m.integer(e.CONNECTION_POOL_TYPE, c.dbPoolType);
        m.integer(e.CONNECTION_POOL_AGGREGATION_MECHANISM, d.DbAggregationMechanism.DB_AGGREGATION_MECHANISM_UNDEFINED);
        m.integer(e.CONNECTION_POOL_SIZE, c.dbPoolSize);
      });
    }
  }
  a.MySqlConnectionPoolAttachment = k;
  class l {
    constructor(c, m, d) {
      this.theDbHost = this.theDbUrl = this.theDbName = this.theQueryString = "";
      this.theDbPoolType = this.theDbPoolSize = this.theDbPort = -1;
      this.theQueryString = m;
      null != c ? (c = c.config, null != c && (this.theDbName = this.tryFindDbName(c), this.theDbHost = this.tryFindDbHost(c), this.theDbPort = this.tryFindDbPort(c), this.theDbPoolType = this.tryFindPoolType(c), this.theDbPoolSize = this.tryFindPoolSize(c), this.theDbUrl = this.buildDbUrl())) : null === d || void 0 === d ? void 0 : d(() => "Trying to instantiate a MySqlData object w/o a connection");
    }
    get queryString() {
      return this.theQueryString;
    }
    get dbName() {
      return this.theDbName;
    }
    get dbUrl() {
      return this.theDbUrl;
    }
    get dbHost() {
      return this.theDbHost;
    }
    get dbPort() {
      return this.theDbPort;
    }
    get dbPoolSize() {
      return this.theDbPoolSize;
    }
    get dbPoolType() {
      return this.theDbPoolType;
    }
    tryFindDbName(c) {
      return c.database ? c.database : "";
    }
    tryFindDbHost(c) {
      return c.host ? c.host : "";
    }
    tryFindDbPort(c) {
      return null != c.port ? "number" === typeof c.port ? c.port : parseInt(c.port, 10) || -1 : -1;
    }
    tryFindPoolType(c) {
      return null != c.pool ? r.CONNECTION_POOL_TYPE_GENERIC : r.CONNECTION_POOL_TYPE_NOT_A_POOL;
    }
    tryFindPoolSize(c) {
      return n.hasProperty(c.pool, "config", "connectionLimit") ? c.pool.config.connectionLimit : 0;
    }
    buildDbUrl() {
      return `mysql://${this.dbHost}${0 < this.dbPort ? `:${this.dbPort}` : ""}/${this.dbName}`;
    }
  }
  a.MySqlData = l;
});
S("src/lib/transformer/MySqlTransformer", "require exports src/lib/util/CoreUtil src/lib/util/InvocationUtil src/lib/util/UniqueId src/lib/sensors/MySqlAttachment src/lib/sensors/ResultSetAttachment src/lib/Agent src/lib/CallbackWrappingHelper src/lib/Debug src/lib/Embedder src/lib/FunctionId src/lib/Patch src/lib/SubPathContext src/lib/transformer/EventEmitterTransformerBase src/lib/transformer/TransformerBase src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n, p, k, l, 
c, m, d, e, b, g, h, f) {
  function q() {
  }
  function w(v) {
    return t.isFunction(v) && u.hasProperty(v, "_dTWrapped");
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.QueryStreamTransformer = a.QueryEmitterTransformer = a.ConnectionCreateQueryTransformer = a.ConnectionQueryTransformer = void 0;
  class G {
    constructor(v) {
      this.mySqlData = v;
      this.execCount = 0;
      this.isCallbackSet = !1;
      this.id = r.UniqueId.getNext();
    }
    createAttachments(v) {
      null != this.mySqlData ? (this.mySqlQueryAttachment = new n.MySqlQueryAttachment(v), this.mySqlQueryAttachment.valid && this.mySqlQueryAttachment.fillMySqlQueryData(this.mySqlData), this.mySqlConnectionPoolAttachment = new n.MySqlConnectionPoolAttachment(v), this.mySqlConnectionPoolAttachment.valid && this.mySqlConnectionPoolAttachment.fillMySqlConnectionPoolData(this.mySqlData), this.mySqlResultSetAttachment = new p.ResultSetAttachment(v)) : c.fail(`${this}: CreateAttachment called without MySqlData!`);
    }
    setNumberOfRowsReturned(v) {
      null != this.mySqlQueryAttachment && this.mySqlQueryAttachment.valid && this.mySqlQueryAttachment.setNumberOfRowsReturned(v);
    }
    toString() {
      this.logPrefix || (this.logPrefix = `MySql ${r.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
    static embeddTracker(v, z) {
      G.embedder.set(v, z);
    }
    static getEmbeddedTracker(v) {
      return G.embedder.get(v);
    }
    findCallbackIndex(v) {
      for (let z = 0; z < v.length; z++) {
        if ("function" === typeof v[z]) {
          return z;
        }
      }
      return -1;
    }
    wrapQueryCb(v, z, x) {
      function A(...H) {
        const F = new h.FunctionRunConfig();
        return x.runFunction(F.chain((0,h.tryFunction)(K => {
          I(() => `${E}: mySqlCbSubstitute enter for ${C.name}`);
          if (null != E.virtualNodeActivation) {
            if (1 < H.length) {
              const M = arguments[1];
              null != M && null != M.length && E.setNumberOfRowsReturned(M.length);
            }
            const L = t.doInvoke(this, l.errorFromFirstArg, arguments);
            E.virtualNodeActivation.exitOrException(L);
            E.virtualNodeActivation.spc.end();
            F.addToErrorHandler(x.onResultWithAction(() => `${E}: mySqlCbSubstitute exit for ${C.name}, didThrow: ${L}`));
            F.addToSuccessHandler(x.onResultWithAction(() => `${E}: mySqlCbSubstitute exit for ${C.name}, didThrow: -`));
          }
          return K;
        })), C, this, ...H);
      }
      const C = v[z], E = this, I = x.debugLogger.bind(x);
      this.isCallbackSet = !0;
      A._dTWrapped = !0;
      v[z] = A;
      return v;
    }
    setResultSetAttachmentData() {
      null != this.mySqlResultSetAttachment && this.mySqlResultSetAttachment.valid && null != this.virtualNodeActivation && k.Agent.correlation.setSqlResultSetData(this.virtualNodeActivation.spc.path, this.virtualNodeActivation.serialNo, this.execCount);
    }
    get hasCallback() {
      return this.isCallbackSet;
    }
  }
  G.embedder = m.create("mysql");
  class y extends h.TransformerBase {
    constructor(v, z) {
      super(v);
      this.sensorId = z;
      this.queryType = q;
    }
    generateSubstitute(v) {
      const z = this, x = z.debugLogger.bind(z), A = new d.FunctionId(v);
      return function(...C) {
        x(() => `MySql: ${v.functionName} querySubstitute enter`);
        const E = h.TransformerBase.emptyRunConfig();
        E.chain((0,h.bailIf)(!z.controlParams.active, "MySQL sensor is inactive", z)).chain((0,h.tryFunction)(I => {
          var H;
          if (z.controlParams.entrypoint || null != b.SubPathContext.getActiveContext()) {
            var F = z.getSqlString(C);
            F = new n.MySqlData(this, F, x);
            const K = null !== (H = G.getEmbeddedTracker(null === C || void 0 === C ? void 0 : C[0])) && void 0 !== H ? H : new G(F);
            K.mySqlData = F;
            H = K.findCallbackIndex(C);
            0 <= H && (w(C[H]) || K.wrapQueryCb(C, H, z));
            H = z.tryStartAsyncActivation({sensorId:z.sensorId, functionId:A, category:k.Agent.correlation.MethodCategory.Database, attachmentCreator:K, vPathOption:2, createInitiatorNode:!1});
            null != H ? (K.virtualNodeActivation = H.vNodeActivation, K.spc = H.initialSpc, K.spc.didInitiateAsyncOp = !0, I = I.setValue(f.CurrentSPC, H.initialSpc), E.addToSuccessHandler(L => {
              if (null != L.retVal) {
                const M = L.retVal;
                "function" !== typeof M._callback && (x(() => `${K}: mySql embedding tracker on query: ${M.sql}`), G.embeddTracker(L.retVal, K));
              }
              x(() => `${K || "MySql"}: ${v.functionName} querySubstitute success exit`);
              return L;
            }), E.addToErrorHandler(L => {
              K.virtualNodeActivation.methodException(L);
              K.virtualNodeActivation.spc.end();
              x(() => `${K || "MySql"}: ${v.functionName} querySubstitute exit, didThrow: ${L}`);
              return L;
            })) : x(() => `${K}: ${v.functionName} querySubstitute no activation, active spc: ${b.SubPathContext.getActiveContext()}`);
          } else {
            x(() => `MySql: ${v.functionName} skip path creation as no active spc and entrypoint is false`);
          }
          return I;
        }));
        return z.runFunction(E, v.origFn, this, ...C);
      };
    }
    isAQuery(v) {
      return v instanceof this.queryType;
    }
    getSqlString(v) {
      if (null == v) {
        return "";
      }
      let z;
      0 < v.length && (v = v[0], z = this.isAQuery(v) || u.hasProperty(v, "sql") ? v.sql : v);
      return z ? `${z}` : "";
    }
  }
  a.ConnectionQueryTransformer = y;
  class D extends h.TransformerBase {
    constructor() {
      super(...arguments);
      this.queryType = q;
    }
    generateSubstitute(v) {
      const z = this, x = z.debugLogger.bind(z);
      return function(...A) {
        x(() => `MySql: ${v.functionName} createQuerySubstitute enter`);
        const C = h.TransformerBase.emptyRunConfig();
        C.chain((0,h.bailIf)(!z.controlParams.active, "MySQL sensor is inactive", z)).chain((0,h.tryFunction)(E => {
          var I;
          if (z.controlParams.entrypoint || null != b.SubPathContext.getActiveContext()) {
            const H = null !== (I = G.getEmbeddedTracker(null === A || void 0 === A ? void 0 : A[0])) && void 0 !== I ? I : new G();
            I = H.findCallbackIndex(A);
            0 <= I && (w(A[I]) || H.wrapQueryCb(A, I, z));
            C.addToErrorHandler(F => {
              x(`${H}: ${v.functionName} createQuerySubstitute exit, didThrow: ${F}`);
              return F;
            });
            C.addToSuccessHandler(F => {
              G.embeddTracker(F.retVal, H);
              x(() => `${H}: ${v.functionName} createQuerySubstitute success exit`);
              return F;
            });
          } else {
            x(() => `MySql: ${v.functionName} createQuerySubstitute: No active spc and entrypoint is false`);
          }
          return E;
        }));
        return z.runFunctionInContext(C, v.origFn, this, ...A);
      };
    }
  }
  a.ConnectionCreateQueryTransformer = D;
  class J extends g.EventEmitterTransformerBase {
    constructor(v) {
      super(v, "result fields end error data row".split(" "));
    }
    shallWrap(v) {
      return null != G.getEmbeddedTracker(v);
    }
    getWrappedListener(v, z, x) {
      const A = this;
      return this.shallWrap(v, z) ? f.ContextManager.bindToCurrentContext(function(C, ...E) {
        return A.runFunction(h.TransformerBase.emptyRunConfig().chain((0,h.tryFunction)(I => {
          const H = G.getEmbeddedTracker(v);
          null != H && null != H.virtualNodeActivation && (H.virtualNodeActivation.isExited || null != H.exitTicks || (H.exitTicks = H.virtualNodeActivation.spc.path.getExitTimeStamps()), "result" === z || "data" === z || "row" === z ? H.execCount++ : "end" === z && H.virtualNodeActivation.spc.open ? (H.setResultSetAttachmentData(), H.virtualNodeActivation.isExited || H.hasCallback || (H.virtualNodeActivation.exit(H.exitTicks), H.virtualNodeActivation.spc.end())) : "error" !== z && !u.isError(C) || 
          H.virtualNodeActivation.isExited || (H.virtualNodeActivation.methodException(C, H.exitTicks), H.virtualNodeActivation.spc.end()));
          return I;
        })), x, this, C, ...E);
      }) : x;
    }
  }
  a.QueryEmitterTransformer = J;
  class B extends h.TransformerBase {
    generateSubstitute(v) {
      const z = this, x = z.debugLogger.bind(z);
      return function(A) {
        const C = h.TransformerBase.emptyRunConfig();
        C.addToSuccessHandler(E => {
          var I = E.retVal;
          const H = G.getEmbeddedTracker(this);
          null != H && (x(() => `${H || "MySql"}: embedding tracker from query on stream`), G.embeddTracker(I, H));
          const F = new J(z.controlParams);
          I = new e.ModuleSpec("Readable", I);
          F.applyTransformation(I);
          return E;
        });
        return z.runFunction(C, v.origFn, this, A);
      };
    }
  }
  a.QueryStreamTransformer = B;
});
S("src/lib/sensors/MySqlSensor", "require exports src/lib/Agent src/lib/Logger src/lib/Patch src/lib/transformer/ContextPassingTransformer src/lib/transformer/MySqlTransformer src/lib/util/SemverUtil src/lib/sensors/SensorBase src/lib/PackageRegistry".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MySqlSensor = a.cApiRealm = void 0;
  a.cApiRealm = "mysql";
  class m {
    constructor(e, b, g) {
      this.moduleVersion = e;
      this.connectionQueryTransformer = new p.ConnectionQueryTransformer(b, g);
      this.connectionCreateQueryTransformer = new p.ConnectionCreateQueryTransformer(b);
      this.queryStreamTransformer = new p.QueryStreamTransformer(b);
      this.queryEmitterTransformer = new p.QueryEmitterTransformer(b);
    }
  }
  class d extends l.SensorBase {
    constructor() {
      super(...arguments);
      this.moduleMap = {};
    }
    applyInstrumentation(e, b) {
      const g = this.tryGetOrCreateModuleState(e, u.Agent.correlation.SensorId.NODEJS_MYSQL);
      null != g && ("MySql.Pool" === b.ruleKey && this.patchPoolModule(e), "MySql.Connection" === b.ruleKey && this.patchConnectionModule(e, g), "MySql.Query" === b.ruleKey && this.patchQueryModule(e, g));
    }
    patchPoolModule(e) {
      const b = new n.ContextPassingTransformer(this);
      this.patchGetConnectionCommand(e.moduleExports, b);
      this.patchAcquireConnectionCommand(e.moduleExports, b);
    }
    patchConnectionModule(e, b) {
      this.patchQueryCommand(e.moduleExports, b.connectionQueryTransformer);
      this.patchCreateQueryCommand(e.moduleExports, b.connectionCreateQueryTransformer);
      b.moduleVersion ? k.satisfies(b.moduleVersion, "<2.4") && (b = new n.ContextPassingTransformer(this), this.patchBeginTransactionCommand(e.moduleExports, b), this.patchCommitCommand(e.moduleExports, b), this.patchRollbackCommand(e.moduleExports, b)) : t.info("MySql client version >2.4 detected. Not patching 'beginTransaction', 'commit' and 'rollback'.");
    }
    tryGetOrCreateModuleState(e, b) {
      var g, h, f;
      const q = c.PackageRegistry.lookup(e.resolvedModulePath);
      if (null != (null === q || void 0 === q ? void 0 : q.packageRoot)) {
        return null !== (g = (h = this.moduleMap)[f = q.packageRoot]) && void 0 !== g ? g : h[f] = new m(e.moduleInfo.version, this, b);
      }
      t.warning(`Cannot retrieve PackageMetaInfo with packageRoot for ${e.resolvedModulePath}`);
    }
    patchQueryModule(e, b) {
      b.connectionQueryTransformer.queryType = e.moduleExports;
      b.connectionCreateQueryTransformer.queryType = e.moduleExports;
      this.transformQueryEmitter(e.moduleExports, b.queryEmitterTransformer);
      this.transformQueryStream(e.moduleExports, b.queryStreamTransformer);
    }
    patchQueryCommand(e, b) {
      e = new r.FunctionSpec("query", "", e.prototype, a.cApiRealm);
      r.applyToSingle(e, b);
    }
    patchCreateQueryCommand(e, b) {
      e = new r.FunctionSpec("createQuery", "", e, a.cApiRealm);
      r.applyToSingle(e, b);
    }
    patchBeginTransactionCommand(e, b) {
      e = new r.FunctionSpec("beginTransaction", "", e.prototype, a.cApiRealm);
      r.applyToSingle(e, b);
    }
    patchCommitCommand(e, b) {
      e = new r.FunctionSpec("commit", "", e.prototype, a.cApiRealm);
      r.applyToSingle(e, b);
    }
    patchRollbackCommand(e, b) {
      e = new r.FunctionSpec("rollback", "", e.prototype, a.cApiRealm);
      r.applyToSingle(e, b);
    }
    patchGetConnectionCommand(e, b) {
      e = new r.FunctionSpec("getConnection", "", e.prototype, r.AsyncTrackingMode.CallbackLast, a.cApiRealm);
      r.applyToSingle(e, b);
    }
    patchAcquireConnectionCommand(e, b) {
      e = new r.FunctionSpec("acquireConnection", "", e.prototype, r.AsyncTrackingMode.CallbackLast, a.cApiRealm);
      r.applyToSingle(e, b);
    }
    transformQueryEmitter(e, b) {
      e = new r.ModuleSpec("Query", e.prototype);
      b.applyTransformation(e);
    }
    transformQueryStream(e, b) {
      e = new r.FunctionSpec("stream", "Query", e.prototype, a.cApiRealm);
      r.applyToSingle(e, b);
    }
  }
  a.MySqlSensor = d;
});
S("src/lib/sensors/MySql2Sensor", "require exports src/lib/Agent src/lib/Patch src/lib/sensors/MySqlSensor src/lib/transformer/ContextPassingTransformer".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MySql2Sensor = void 0;
  class p extends r.MySqlSensor {
    applyInstrumentation(k, l) {
      const c = this.tryGetOrCreateModuleState(k, u.Agent.correlation.SensorId.NODEJS_MYSQL2);
      null != c && ("MySql2.pool" === l.ruleKey && this.patchPoolModule(k), "MySql2.connection" === l.ruleKey && (this.patchConnectionModule(k, c), this.patchExecuteCommand(k.moduleExports, c.connectionQueryTransformer)), "MySql2.query" === l.ruleKey && this.patchQueryModule(k, c));
    }
    patchPoolModule(k) {
      const l = new n.ContextPassingTransformer(this);
      this.patchGetConnectionCommand(k.moduleExports, l);
    }
    patchExecuteCommand(k, l) {
      k = new t.FunctionSpec("execute", "", k.prototype, r.cApiRealm);
      t.applyToSingle(k, l);
    }
  }
  a.MySql2Sensor = p;
});
S("src/lib/sensors/PostgresAttachment", ["require", "exports", "src/lib/Agent", "src/lib/AttachmentBase"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.PostgresData = a.PostgresConnectionPoolAttachment = a.PostgreSQLAttachment = void 0;
  class r extends t.AttachmentBase {
  }
  class n extends r {
    constructor(l) {
      super(l, u.Agent.correlation.AttachmentId.SQL_ID, 0);
    }
    fillSqlQueryData(l) {
      null != this.attachment && null != l && null != l.queryString && this.setString(u.Agent.correlation.AttachmentFieldId.SQL_STATEMENT, l.queryString, u.Configuration.maxSqlStringLen);
    }
    updateAttachment(l, c) {
      null != this.attachment && ("number" === typeof l && this.attachment.setFieldInteger(u.Agent.correlation.AttachmentFieldId.SQL_NUM_ROWS_RETURNED, l), "number" === typeof c && this.attachment.setFieldInteger(u.Agent.correlation.AttachmentFieldId.SQL_METHOD_TYPE, c));
    }
  }
  a.PostgreSQLAttachment = n;
  class p extends r {
    constructor(l) {
      super(l, u.Agent.correlation.AttachmentId.CONNECTION_POOL_ID, 0);
    }
    fillSqlConnectionPoolData(l) {
      null != this.attachment && null != l && this.setMultipleFields(c => {
        const m = u.Agent.correlation.AttachmentFieldId;
        c.stringCachedOrUnavailable(m.CONNECTION_POOL_DB, l.dbName);
        c.stringCachedOrUnavailable(m.CONNECTION_POOL_URL, l.dbUrl);
        c.stringCached(m.CONNECTION_POOL_DBTYPE, "PostgreSQL");
        c.stringCachedOrUnavailable(m.CONNECTION_POOL_DBHOST, l.dbHost);
        c.integer(m.CONNECTION_POOL_DBPORTNO, l.dbPort);
        c.integer(m.CONNECTION_POOL_TYPE, l.dbPoolType);
        c.integer(m.CONNECTION_POOL_AGGREGATION_MECHANISM, u.Agent.correlation.DbAggregationMechanism.DB_AGGREGATION_MECHANISM_UNDEFINED);
        c.integer(m.CONNECTION_POOL_SIZE, l.dbPoolSize);
      });
    }
  }
  a.PostgresConnectionPoolAttachment = p;
  class k {
    constructor(l, c) {
      l = l.connectionParameters || {};
      this.queryString = "string" === typeof c ? c : c.text || "<?>";
      this.dbName = l.database;
      this.dbHost = l.host;
      this.dbPort = this.getDbPort(l);
      this.dbPoolSize = this.dbPoolType = 0;
      this.dbUrl = "";
    }
    getDbPort(l) {
      return null != l.port ? "number" === typeof l.port ? l.port : parseInt(l.port, 10) || -1 : -1;
    }
  }
  a.PostgresData = k;
});
S("src/lib/transformer/PostgresTracker", "require exports src/lib/util/UniqueId src/lib/sensors/PostgresAttachment src/lib/AsyncTracker src/lib/CallbackWrappingHelper src/lib/Debug src/lib/Embedder".split(" "), function(O, a, u, t, r, n, p, k) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.PostgresTracker = void 0;
  class l extends r.AsyncTracker {
    constructor(c, m, d) {
      super(m, d);
      this.postgresData = c;
      this.errorExtractor = n.errorFromFirstArg;
      this.id = u.UniqueId.getNext();
    }
    createAttachments(c) {
      null != this.postgresData ? ("query" === this.descriptor.functionName && (this.sqlAttachment = new t.PostgreSQLAttachment(c), this.sqlAttachment.valid && this.sqlAttachment.fillSqlQueryData(this.postgresData)), this.connectionPoolAttachment = new t.PostgresConnectionPoolAttachment(c), this.connectionPoolAttachment.valid && this.connectionPoolAttachment.fillSqlConnectionPoolData(this.postgresData)) : p.fail("CreateAttachment called without PostgresData!");
    }
    updateSQLAttachment(c) {
      "query" === this.descriptor.functionName && null != this.sqlAttachment && this.sqlAttachment.valid && this.sqlAttachment.updateAttachment(c, void 0);
    }
    static setTracker(c, m) {
      l.embedder.set(c, m);
    }
    static getTracker(c) {
      return l.embedder.get(c);
    }
    toString() {
      this.logPrefix || (this.logPrefix = `PostgresTracker ${u.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
  }
  l.embedder = k.create("query");
  a.PostgresTracker = l;
});
S("src/lib/transformer/PostgresTransformer", "require exports src/lib/util/CoreUtil src/lib/Agent src/lib/FunctionId src/lib/Logger src/lib/SubPathContext src/lib/sensors/PostgresAttachment src/lib/transformer/AsyncTransformerBase src/lib/transformer/PostgresTracker src/lib/transformer/PromiseTransformerUtilities src/lib/transformer/TransformerBase src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.PostgresClientTransformer = void 0;
  class b extends l.AsyncTransformerBase {
    constructor(g, h) {
      super(g);
      this.isV7orLater = h;
    }
    generateSubstitute(g) {
      const h = this, f = new r.FunctionId(g), q = h.debugLogger.bind(h);
      return function(...w) {
        q(() => `${g.functionName} querySubstitute enter`);
        const G = d.TransformerBase.emptyRunConfig();
        G.chain((0,d.bailIf)(!h.controlParams.active, "postgres sensor is inactive", h)).chain((0,d.tryFunction)(y => {
          let D = y;
          const J = new k.PostgresData(this, 0 < arguments.length ? arguments[0] : ""), B = new c.PostgresTracker(J, h, g), v = h.tryStartAsyncActivation({sensorId:t.Agent.correlation.SensorId.NODEJS_POSTGRES, functionId:f, category:t.Agent.correlation.MethodCategory.Database, attachmentCreator:B, vPathOption:1, createInitiatorNode:!1});
          null != v ? (D = D.setValue(e.CurrentSPC, v.initialSpc), B.virtualNodeActivation = v.vNodeActivation, B.manipulateArguments(w), G.addToErrorHandler(z => {
            null != B.virtualNodeActivation && (v.vNodeActivation.exitOrException(z), B.virtualNodeActivation.spc.end());
            q(() => `${g.functionName} querySubstitute exit, error: ${z}`);
            return z;
          }), G.addToSuccessHandler(z => {
            B.manipulateReturnValue(z);
            return z;
          })) : q(() => `${B}: no activation, active spc: ${p.SubPathContext.getActiveContext()}`);
          return D;
        }));
        return h.runFunctionInContext(G, g.origFn, this, ...w);
      };
    }
    wrapCallback(g) {
      const h = this, f = h.debugLogger.bind(h);
      return e.ContextManager.bindToCurrentContext(function(q, w, ...G) {
        const y = d.TransformerBase.emptyRunConfig();
        f(() => `${g}: postgresCbSubstitute enter for ${g.origCb.name}`);
        y.chain((0,d.tryFunction)(D => {
          null != g.virtualNodeActivation && (h.updateSQLAttachment(arguments, g), g.virtualNodeActivation.exitOrException(q), y.addToErrorHandler(h.onResultWithAction(() => {
            g.virtualNodeActivation.spc.end();
            f(() => `${g}: postgresCbSubstitute exit for ${g.origCb.name}, didThrow: true`);
          })), y.addToSuccessHandler(h.onResultWithAction(() => {
            g.virtualNodeActivation.spc.end();
            f(() => `${g}: postgresCbSubstitute exit for ${g.origCb.name}, didThrow: false`);
          })));
          return D;
        }));
        return h.runFunction(y, g.origCb, this, q, w, ...G);
      });
    }
    wrapReturnValue(g, h) {
      function f(D, J) {
        return function(B) {
          return q.handleThenCall(this, g, D, B, J, arguments);
        };
      }
      const q = this;
      var w = q.controlParams.isDebugEnabled;
      const G = h.retVal;
      let y = !1;
      u.hasProperty(G, "on") && (w && n.debug(`${g}: postgres wrapping event listeners on query`), c.PostgresTracker.setTracker(G, g), y = !0);
      m.PromiseTransformerUtilities.isActuallyAPromise(G) && (w = m.PromiseTransformerUtilities.wrapPromise(G, f), y || h.setVal(w));
    }
    updateSQLAttachment(g, h) {
      1 < g.length && (g = g[1], null != g && null != g.rowCount && h.updateSQLAttachment(g.rowCount));
    }
    handleThenCall(g, h, f, q, w, G) {
      const y = this.debugLogger.bind(this);
      y(() => `${h}: enter then call, isCatch ${f}`);
      const D = (new d.FunctionRunConfig()).chain((0,d.tryFunction)(J => {
        null == h.virtualNodeActivation || h.virtualNodeActivation.isExited || (null != (null === q || void 0 === q ? void 0 : q.rows) && h.updateSQLAttachment(q.rows.length), h.virtualNodeActivation.exitOrException(f ? q : void 0), h.virtualNodeActivation.spc.end(), y(() => `${h}: ended virtual node and path`));
        return J;
      })).addToErrorHandler(this.onResultWithLog(() => `${h}: exit then call, did throw)`)).addToSuccessHandler(this.onResultWithLog(() => `${h}: exit then call, did not throw)`));
      return this.runFunction(D, w, g, ...G);
    }
  }
  a.PostgresClientTransformer = b;
});
S("src/lib/transformer/PostgresQueryTransformer", "require exports src/lib/transformer/EventEmitterTransformerBase src/lib/util/CoreUtil src/lib/CallbackWrappingHelper src/lib/transformer/AsyncTransformerBase src/lib/transformer/PostgresTracker src/lib/transformer/PromiseTransformerUtilities src/lib/transformer/PromiseTransformer src/lib/transformer/TransformerBase src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.PostgresQuery6xTransformer = a.PostgresQueryTransformer = void 0;
  class d extends u.EventEmitterTransformerBase {
    constructor(b, g) {
      super(b, g);
    }
    shallWrap(b) {
      return null != p.PostgresTracker.getTracker(b);
    }
    getWrappedListener(b, g, h) {
      const f = p.PostgresTracker.getTracker(b);
      if (null == f) {
        return h;
      }
      const q = this, w = q.debugLogger.bind(q), G = u.EventEmitterTransformerBase.getUnwrappedListener(h);
      return m.ContextManager.bindToCurrentContext(function(y, ...D) {
        const J = c.TransformerBase.emptyRunConfig();
        J.chain((0,c.tryFunction)(B => {
          null != G && "" !== G.name && w(() => `PostgresQuery event ${G.name}`);
          null == f.virtualNodeActivation || f.virtualNodeActivation.isExited || (t.isError(y) ? f.virtualNodeActivation.methodException(y) : (null != (null === y || void 0 === y ? void 0 : y.rowCount) && f.updateSQLAttachment(y.rowCount), f.virtualNodeActivation.exit()), f.virtualNodeActivation.spc.end());
          return B;
        }));
        return q.runFunction(J, h, this, y, ...D);
      });
    }
  }
  a.PostgresQueryTransformer = d;
  class e extends n.AsyncTransformerBase {
    constructor(b, g) {
      super(b);
      this.transformer = g;
    }
    generateSubstitute(b) {
      const g = this, h = g.debugLogger.bind(g);
      return function(...f) {
        const q = c.TransformerBase.emptyRunConfig();
        q.addToSuccessHandler(w => {
          if (k.PromiseTransformerUtilities.isActuallyAPromise(w.retVal)) {
            h(() => `PostgresQuery6x: wrapping promise ${w.retVal.functionName}`);
            const G = p.PostgresTracker.getTracker(this);
            null != G && g.transformer.wrapReturnValue(G, w);
          }
          return w;
        });
        return g.runFunction(q, b.origFn, this, ...f);
      };
    }
    wrapCallback(b) {
      return r.CallbackWrappingHelper.wrapCallbackContextPassing(b);
    }
    wrapReturnValue(b, g) {
      k.PromiseTransformerUtilities.isActuallyAPromise(g.retVal) && (g.didThrow || (new l.PromiseTransformer(!0, !0)).instrument(g.retVal));
    }
  }
  a.PostgresQuery6xTransformer = e;
});
S("src/lib/sensors/PostgresSensor", "require exports path src/lib/Logger src/lib/Patch src/lib/transformer/ContextPassingTransformer src/lib/transformer/PostgresQueryTransformer src/lib/transformer/PostgresTransformer src/lib/util/SemverUtil src/lib/sensors/SensorBase".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.PostgresSensor = void 0;
  class m extends c.SensorBase {
    constructor() {
      super(...arguments);
      this.transformerMap = {};
    }
    applyInstrumentation(d, e) {
      if ("Module.main" === e.ruleKey) {
        var b = `PostgreSQL (pg) v${d.moduleInfo.version} detected`;
        m.isV7orLater(d) ? t.info(`${b}: ${d.resolvedModulePath}`) : t.info(`${b}, this version may not be fully supported!`);
        b = u.dirname(d.resolvedModulePath);
        null == this.transformerMap[b] && (this.transformerMap[b] = new k.PostgresClientTransformer(this, m.isV7orLater(d)));
      }
      if ("Postgres.client" === e.ruleKey) {
        b = new n.ContextPassingTransformer(this);
        const g = this.getTransformer(d);
        null != g && (this.patchClientConnect(d.moduleExports, b), this.patchClientQuery(d.moduleExports, g));
      }
      "Postgres.query" !== e.ruleKey || m.isV7orLater(d) || (e = this.getTransformer(d), null != e && this.transformQuery(d.moduleExports, e));
    }
    patchClientQuery(d, e) {
      d = new r.FunctionSpec("query", "", d.prototype, r.AsyncTrackingMode.CallbackLastOrPromise, "postgres");
      r.applyToSingle(d, e);
    }
    patchClientConnect(d, e) {
      d = new r.FunctionSpec("connect", "", d.prototype, r.AsyncTrackingMode.CallbackLastOrPromise, "postgres");
      r.applyToSingle(d, e);
    }
    transformQuery(d, e) {
      const b = e.isV7orLater ? ["row", "end", "error"] : ["end", "error"], g = new r.ModuleSpec("Query", d.prototype);
      (new p.PostgresQueryTransformer(this, b)).applyTransformation(g);
      e = new p.PostgresQuery6xTransformer(this, e);
      d = new r.FunctionSpec("then", "", d.prototype, r.AsyncTrackingMode.None, "postgres");
      r.applyToSingle(d, e);
    }
    static isV7orLater(d) {
      return l.satisfies(d.moduleInfo.version, ">=7.0.0");
    }
    getTransformer(d) {
      d = u.dirname(d.resolvedModulePath);
      return this.transformerMap[d];
    }
  }
  a.PostgresSensor = m;
});
S("src/lib/transformer/CouchbaseDbTransformer", "require exports src/lib/util/CoreUtil src/lib/util/InvocationUtil src/lib/util/EventUtil src/lib/util/JsonObfuscatorUtil src/lib/sensors/CouchbaseAttachment src/lib/Agent src/lib/Debug src/lib/FunctionId src/lib/Logger src/lib/Patch src/lib/SubPathContext src/lib/transformer/EventEmitterTransformerBase src/lib/transformer/TransformerBase src/lib/transformer/PromiseTransformerUtilities src/lib/contextmanager/ContextManager".split(" "), function(O, a, 
u, t, r, n, p, k, l, c, m, d, e, b, g, h, f) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.getDtConnection = a.getDtBucket = a.CouchbaseClusterBucketTransformer = a.CouchbaseBuilderTransformer = a.CouchbaseLegacyQueryTransformer = a.CouchbaseDbRestTransformer = a.CouchbaseSubDocumentTransformer = a.CouchbaseQueryTransformer = a.CouchbaseDbCollectionTransformer = a.CouchbaseDbTransformer = void 0;
  class q extends g.TransformerBase {
    constructor(x) {
      super(x);
    }
    wrapCallback(x) {
      const A = this;
      return f.ContextManager.bindToCurrentContext(function(C, E, ...I) {
        const H = A.logIf.bind(A, x.debug);
        H(() => `${x}: entered base transformer wrapped callback`);
        const F = g.TransformerBase.emptyRunConfig();
        F.chain((0,g.tryFunction)(K => {
          if (null != x.virtualNodeActivation) {
            var L = x.errorExtractor(C, E);
            null != E && (null != E.value ? x.fillExitData(1) : Array.isArray(E.contents) ? x.fillExitData(E.contents.length) : Array.isArray(E.results) && x.fillExitData(E.results.length));
            H(() => `${x}: exiting virtual node=${x.virtualNodeActivation} didThrow=${void 0 !== C}`);
            x.virtualNodeActivation.exitOrException(L);
            L = () => {
              x.virtualNodeActivation.spc.end();
              H(() => `${x}: ending spc=${x.virtualNodeActivation.spc} in callback.`);
            };
            F.addToErrorHandler(A.onResultWithAction(L));
            F.addToSuccessHandler(A.onResultWithAction(L));
          }
          return K;
        }));
        return A.runFunction(F, x.origCb, this, C, E, ...I);
      });
    }
    wrapReturnValue(x) {
      x.debug && l.fail();
    }
    extractCallback(x) {
      for (let A = x.length - 1; 0 <= A; A--) {
        if (t.isFunction(x[A])) {
          return {index:A, callback:x[A]};
        }
      }
    }
    getCbIndex(x, A) {
      return 0 < A.length && t.isFunction(A[x - 1]) ? x - 1 : 2 < A.length && t.isFunction(A[x - 2]) ? x - 2 : -1;
    }
    get debug() {
      return this.controlParams.isDebugEnabled;
    }
  }
  a.CouchbaseDbTransformer = q;
  class w extends q {
    generateSubstitute(x) {
      const A = this, C = new c.FunctionId(x);
      return function(...E) {
        const I = A.debugLogger.bind(A), H = g.TransformerBase.emptyRunConfig();
        H.chain((0,g.bailIf)(!A.controlParams.active, "CouchbaseDB sensor is inactive", A)).chain((0,g.tryFunction)(F => {
          var K = p.CbData.getData(this._conn);
          const L = e.SubPathContext.getActiveContext();
          if (null != K) {
            const M = new p.CouchbaseV3Tracker(A, x, K), N = A.tryStartAsyncActivation({sensorId:k.Agent.correlation.SensorId.NODEJS_COUCHBASE, functionId:C, category:k.Agent.correlation.MethodCategory.Database, attachmentCreator:M, vPathOption:1, createInitiatorNode:!1});
            if (null != N) {
              I(() => `${M}: opened asyncActivation=${N.initiatorActivation} on spc=${L}`);
              F = F.setValue(f.CurrentSPC, N.initialSpc);
              H.addToErrorHandler(Q => {
                null != M.virtualNodeActivation && (N.vNodeActivation.exitOrException(Q), M.virtualNodeActivation.spc.end());
                return Q;
              });
              H.addToSuccessHandler(Q => {
                null == M.origCb && A.wrapReturnValue(M, Q);
                return Q;
              });
              M.activationResult = N;
              const P = A.extractCallback(E);
              null != P && (M.origCb = P.callback, K = A.wrapCallback(M), E[P.index] = K, I(() => `${M}: wrappedCallback=${t.isFunction(P.callback)} at index=${P.index}`));
            }
          } else {
            m.warning("CouchbaseDbCollectionTransformer | Can not get data");
          }
          return F;
        }));
        return A.runFunctionInContext(H, x.origFn, this, ...E);
      };
    }
    wrapReturnValue(x, A) {
      const C = h.PromiseTransformerUtilities.isActuallyAPromise(A.retVal), E = x.debug;
      if (C && !A.didThrow) {
        const I = this;
        E && m.debug(`${x}: wrapping returned promise`);
        A.setVal(h.PromiseTransformerUtilities.wrapPromise(A.retVal, function(H, F) {
          return function(K, ...L) {
            return I.handleThenCall(this, x, H, K, F, [K, ...L]);
          };
        }));
      }
    }
    handleThenCall(x, A, C, E, I, H) {
      const F = (new g.FunctionRunConfig()).chain((0,g.tryFunction)(K => {
        const L = null != A && A.debug;
        this.debugLogger(() => `${A}: enter handleThenCall, isCatch=${C}`);
        A.hasPromiseHandled || (A.virtualNodeActivation.isExited ? A.hasPromiseHandled = !0 : (C || null == E || (null != E.value ? A.fillExitData(1) : Array.isArray(E.contents) ? A.fillExitData(E.contents.length) : (this.debugLogger(() => `${A}: How to handle this result type: ${JSON.stringify(E, void 0, 4)}`), l.fail())), A.virtualNodeActivation.exitOrException(C ? E : void 0), A.virtualNodeActivation.spc.end(), this.debugLogger(() => `${A}: closing vNode=${A.virtualNodeActivation} and ending spc=${A.virtualNodeActivation.spc} in handleThenCall`)));
        L && m.debug(`${A}: Promise handle then call.`);
        return K;
      })).addToErrorHandler(K => {
        this.debugLogger(() => `${A} | exit handleThenCall, didThrow)`);
        return K;
      }).addToSuccessHandler(K => {
        this.debugLogger(() => `${A} | exit handleThenCall, did not Throw)`);
        return K;
      });
      return this.runFunction(F, I, x, ...H);
    }
  }
  a.CouchbaseDbCollectionTransformer = w;
  class G extends q {
    generateSubstitute(x) {
      const A = this, C = new c.FunctionId(x);
      return function(...E) {
        const I = A.debugLogger.bind(A), H = g.TransformerBase.emptyRunConfig();
        H.chain((0,g.bailIf)(!A.controlParams.active, "CouchbaseDB sensor is inactive", A)).chain((0,g.tryFunction)(F => {
          var K, L;
          const M = e.SubPathContext.getActiveContext(), N = null !== (L = null === (K = this._getClusterConn) || void 0 === K ? void 0 : K.call(this)) && void 0 !== L ? L : this.conn;
          K = p.CbData.getData(N);
          if (null != K) {
            const P = new p.CouchbaseQueryTracker(A, x, K, E[0].toString()), Q = A.tryStartAsyncActivation({sensorId:k.Agent.correlation.SensorId.NODEJS_COUCHBASE, functionId:C, category:k.Agent.correlation.MethodCategory.Database, attachmentCreator:P, vPathOption:1, createInitiatorNode:!1});
            null != Q && (P.activationResult = Q, I(() => `${P}: opened asyncActivation=${Q.initiatorActivation} with vNode=${P.virtualNodeActivation} on spc=${M}`), F = F.setValue(f.CurrentSPC, Q.initialSpc), K = A.extractCallback(E), null != K && (P.origCb = K.callback, L = A.wrapCallback(P), E[K.index] = L, I(() => `${P}: wrapped callback`)), H.addToErrorHandler(R => {
              Q.vNodeActivation.exitOrException(R);
              Q.vNodeActivation.spc.end();
              return R;
            }), H.addToSuccessHandler(R => {
              null == P.origCb && A.wrapReturnValue(P, R);
              return R;
            }));
          } else {
            I(() => "CouchbaseQueryTransformer | missing data on Cluster connection!");
          }
          return F;
        }));
        return A.runFunctionInContext(H, x.origFn, this, ...E);
      };
    }
    wrapReturnValue(x, A) {
      const C = A.retVal, E = this.debugLogger.bind(this);
      if (t.isEventEmitter(C)) {
        A = I => {
          x.virtualNodeActivation.isExited || (null != I ? (x.virtualNodeActivation.methodException(I), E(() => `${x}: exiting vNode=${x.virtualNodeActivation} with exception=${I}`)) : (x.fillExitData(x.rowCnt), x.virtualNodeActivation.exit(), E(() => `${x}: exiting vNode=${x.virtualNodeActivation}, rows=${x.rowCnt}`)), x.virtualNodeActivation.spc.end(), E(() => `${x}: exiting spc=${x.virtualNodeActivation.spc}`));
        }, C.on("row", x.onRow), C.on("end", (0,g.tryWrap)(A)), r.installErrorMonitor(C, (0,g.tryWrap)(A)), E(() => `${x}: installed listeners on returned StreamableRowPromise`);
      } else if (h.PromiseTransformerUtilities.isActuallyAPromise(C)) {
        const I = this;
        E(() => `${x}: wrapping returned promise`);
        A.setVal(h.PromiseTransformerUtilities.wrapPromise(C, function(H, F) {
          return function(K, ...L) {
            return I.handleThenCall(this, x, H, K, F, [K, ...L]);
          };
        }));
      }
    }
    wrapCallback(x) {
      const A = this, C = this.debugLogger.bind(this);
      return f.ContextManager.bindToCurrentContext(function(E, I, ...H) {
        const F = (new g.FunctionRunConfig()).chain((0,g.tryFunction)(K => {
          null != (null === I || void 0 === I ? void 0 : I.rows) && x.fillExitData(I.rows.length);
          x.virtualNodeActivation.exitOrException(E);
          x.virtualNodeActivation.spc.end();
          C(() => `${x}: ending vNode=${x.virtualNodeActivation} and spc=${x.spc} in callback, hasCallback=${null != x.origCb} with err=${null != E}`);
          return K;
        }));
        if (null != x.origCb) {
          return A.runFunction(F, x.origCb, this, E, I, ...H);
        }
      });
    }
    handleThenCall(x, A, C, E, I, H) {
      return this.runFunction((new g.FunctionRunConfig()).chain((0,g.tryFunction)(F => {
        A.virtualNodeActivation.isExited || (C || null == (null === E || void 0 === E ? void 0 : E.rows) || A.fillExitData(E.rows.length), A.virtualNodeActivation.exitOrException(C ? E : void 0), A.virtualNodeActivation.spc.end(), this.debugLogger(() => `${A}: ending vNode=${A.virtualNodeActivation}` + ` and spc=${A.spc} in promise, hasCallback=` + `${null != A.origCb} with err=${C}`));
        return F;
      })), I, x, ...H);
    }
  }
  a.CouchbaseQueryTransformer = G;
  class y extends q {
    generateSubstitute(x) {
      const A = this, C = new c.FunctionId(x);
      return function() {
        const E = A.debugLogger.bind(A), I = arguments, H = g.TransformerBase.emptyRunConfig();
        H.chain((0,g.bailIf)(!A.controlParams.active, "CouchbaseDB sensor is inactive", A)).chain((0,g.tryFunction)(F => {
          let K = F;
          const L = A.extractCallback(arguments);
          var M = p.CbData.getData(this._conn);
          const N = e.SubPathContext.getActiveContext();
          if (null != M) {
            const P = new p.CouchbaseSubDocumentTracker(A, x, M, I[1]), Q = A.tryStartAsyncActivation({sensorId:k.Agent.correlation.SensorId.NODEJS_COUCHBASE, functionId:C, category:k.Agent.correlation.MethodCategory.Database, attachmentCreator:P, vPathOption:1, createInitiatorNode:!1});
            null != Q && (E(() => `${P}: opened asyncActivation=${Q.initiatorActivation} on spc=${N}`), P.activationResult = Q, K = K.setValue(f.CurrentSPC, Q.initialSpc), null != L && (P.origCb = L.callback, M = A.wrapCallback(P), I[L.index] = M, E(() => `${P}: wrappedCallback=${t.isFunction(L.callback)} at index=${L.index}`)), H.addToSuccessHandler(R => {
              null == P.origCb && A.wrapReturnValue(P, R);
              return R;
            }), H.addToErrorHandler(R => {
              var T, U;
              null === (T = P.virtualNodeActivation) || void 0 === T ? void 0 : T.exitOrException(R);
              null === (U = P.virtualNodeActivation) || void 0 === U ? void 0 : U.spc.end();
              return R;
            }));
          } else {
            m.warning("CouchbaseSubDocumentTransformer | Can not get data");
          }
          return K;
        }));
        return A.runFunctionInContext(H, x.origFn, this, ...I);
      };
    }
    wrapReturnValue(x, A) {
      var C = h.PromiseTransformerUtilities.isActuallyAPromise(A.retVal);
      const E = x.debug;
      if (C && !A.didThrow) {
        const I = this;
        C = A.retVal;
        E && m.debug(`${x}: wrapping returned promise`);
        A.setVal(h.PromiseTransformerUtilities.wrapPromise(C, function(H, F) {
          return function(K, ...L) {
            return I.handleThenCall(this, x, H, K, F, [K, ...L]);
          };
        }));
      }
    }
    handleThenCall(x, A, C, E, I, H) {
      const F = null != A && A.debug, K = this.logIf.bind(this, F);
      return this.runFunction((new g.FunctionRunConfig()).chain((0,g.tryFunction)(L => {
        K(() => `${A}: enter handleThenCall, isCatch=${C}`);
        if (A.hasPromiseHandled) {
          K(() => `${A}: Promise handle then call.`);
        } else {
          if (A.virtualNodeActivation.isExited) {
            A.hasPromiseHandled = !0;
          } else {
            const M = A.errorExtractor(E, E);
            C || null == E || (null != E.value || null != E.cas ? A.fillExitData(1) : Array.isArray(E.contents) ? A.fillExitData(E.contents.length) : Array.isArray(E.results) ? A.fillExitData(E.results.length) : (K(() => `${A}: How to handle this result type: ${n.QueryNormalizer.normalizeQueryToString(E)}`), F && l.fail()));
            A.virtualNodeActivation.exitOrException(M);
            A.virtualNodeActivation.spc.end();
            K(() => `${A}: closing vNode=${A.virtualNodeActivation} and ending spc=${A.virtualNodeActivation.spc} in handleThenCall`);
          }
        }
        return L;
      })), I, x, ...H);
    }
  }
  a.CouchbaseSubDocumentTransformer = y;
  class D extends q {
    generateSubstitute(x) {
      const A = this, C = new c.FunctionId(x);
      return function(...E) {
        const I = A.debugLogger.bind(A), H = g.TransformerBase.emptyRunConfig();
        H.chain((0,g.bailIf)(!A.controlParams.active, "CouchbaseDB sensor is inactive", A)).chain((0,g.tryFunction)(F => {
          var K = A.extractOptions(x.functionName, E);
          const L = A.extractCallback(E), M = p.CbData.getData(this), N = e.SubPathContext.getActiveContext();
          if (M && null != L) {
            const P = new p.CouchbaseV2Tracker(A, x, M, K), Q = A.tryStartAsyncActivation({sensorId:k.Agent.correlation.SensorId.NODEJS_COUCHBASE, functionId:C, category:k.Agent.correlation.MethodCategory.Database, attachmentCreator:P, createInitiatorNode:!1});
            null != Q && (I(() => `${P}: opened asyncActivation=${Q.initiatorActivation} on spc=${N}`), F = F.setValue(f.CurrentSPC, Q.initialSpc), P.activationResult = Q, H.addToErrorHandler(R => {
              Q.vNodeActivation.exitOrException(R);
              Q.vNodeActivation.spc.end();
              return R;
            }), P.origCb = L.callback, K = A.wrapCallback(P), E[L.index] = K, I(() => `${P}: wrappedCallback=${t.isFunction(L.callback)} at index=${L.index}`));
          } else {
            m.warning("CouchbaseRestTransformer | Bucket exists which hasn't been patched: ");
          }
          return F;
        }));
        return A.runFunctionInContext(H, x.origFn, this, ...E);
      };
    }
    extractOptions(x, A) {
      x = this.getMaxArgumentCount(x);
      if (-1 !== x && !(A.length > x || 2 > A.length || x - 1 === A.length)) {
        return A[x - 2];
      }
    }
    getMaxArgumentCount(x) {
      switch(x) {
        case "upsert":
        case "insert":
        case "replace":
        case "append":
        case "prepend":
        case "getAndTouch":
        case "counter":
        case "get":
          return 4;
        case "remove":
        case "getAndLock":
        case "getReplica":
        case "getMulti":
          return 3;
        default:
          return -1;
      }
    }
  }
  a.CouchbaseDbRestTransformer = D;
  class J extends q {
    wrapCallback(x) {
      const A = this;
      return f.ContextManager.bindToCurrentContext(function(...C) {
        const E = A.logIf.bind(A, x.debug);
        E(() => `${x}: entering query callback`);
        const I = g.TransformerBase.emptyRunConfig();
        I.chain((0,g.tryFunction)(H => {
          if (null != x.virtualNodeActivation && !x.virtualNodeActivation.isExited) {
            const F = t.doInvoke(x, x.errorExtractor, C);
            null == F && (E(() => `${x}: filling exit data in callback`), x.fillExitData());
            E(() => `${x}: exiting vNode=${x.virtualNodeActivation} with err=${F}`);
            x.virtualNodeActivation.exitOrException(F);
            const K = () => {
              null != x.virtualNodeActivation && (E(() => `${x}: ending spc=${x.virtualNodeActivation.spc} in callback.`), x.virtualNodeActivation.spc.end());
            };
            I.addToErrorHandler(A.onResultWithAction(K));
            I.addToSuccessHandler(A.onResultWithAction(K));
          }
          return H;
        }));
        return A.runFunction(I, x.origCb, this, ...C);
      });
    }
    generateSubstitute(x) {
      const A = this, C = A.debugLogger.bind(A), E = this.getQueryType(x.functionName), I = new c.FunctionId(x);
      return function(...H) {
        const F = g.TransformerBase.emptyRunConfig();
        F.chain((0,g.bailIf)(!A.controlParams.active, "CouchbaseDB sensor is inactive", A)).chain((0,g.tryFunction)(K => {
          const L = H[Math.max(0, H.length - 3)];
          let M = H[H.length - 1];
          t.isFunction(M) || (M = void 0);
          const N = p.CbData.getData(this), P = e.SubPathContext.getActiveContext();
          if (N) {
            N.setQueryhosts(this.queryhosts) && N.setData(this);
            const Q = new p.CouchbaseV2QueryTracker(A, x, N, L, 2 === E ? `${H[1]}.${H[2]}` : ""), R = A.tryStartAsyncActivation({sensorId:k.Agent.correlation.SensorId.NODEJS_COUCHBASE, functionId:I, category:k.Agent.correlation.MethodCategory.Database, attachmentCreator:Q, vPathOption:1, createInitiatorNode:!1});
            null != R && (C(() => `${Q}: opened asyncActivation=${R.initialActivation} on spc=${P}`), K = K.setValue(f.CurrentSPC, R.initialSpc), Q.activationResult = R, null != M ? (Q.origCb = M, Q.hasCallback = !0, M = A.wrapCallback(Q), H[H.length - 1] = M) : (Q.hasCallback = !1, Q.origCb = void 0), F.addToErrorHandler(T => {
              R.vNodeActivation.exitOrException(T);
              R.vNodeActivation.spc.end();
              return T;
            }), F.addToSuccessHandler(T => {
              A.wrapReturnValue(Q, T);
              return T;
            }), C(() => `${Q}: hasCallback=${Q.hasCallback},injectedCallback=${Q.injectedCallback}`));
          } else {
            m.warning("CouchbaseLegacyQueryTransformer | Bucket exists which hasn't been patched: ");
          }
          return K;
        }));
        return A.runFunction(F, x.origFn, this, ...H);
      };
    }
    wrapReturnValue(x, A) {
      x.debug && m.debug(`${x}: trying to register EmitterTransformer on response object. didThrow=${A.didThrow}`);
      if (!A.didThrow) {
        x.setTracker(A.retVal);
        A.retVal.on("row", p.CouchbaseV2QueryTracker.onRow);
        const C = new v(this.controlParams, x.hasCallback);
        A = new d.ModuleSpec("Readable", A.retVal);
        C.applyTransformation(A);
        x.debug && m.debug(`${x}: registered EmitterTransformer on response object`);
      }
    }
    getQueryType(x) {
      let A = 4;
      switch(x) {
        case "_n1ql":
          A = 1;
          break;
        case "_view":
          A = 2;
          break;
        case "_fts":
          A = 0;
          break;
        case "_cbas":
          A = 3;
          break;
        default:
          this.isDebugEnabled && m.warning(`Unrecognized query type, got=${x}`);
      }
      return A;
    }
  }
  a.CouchbaseLegacyQueryTransformer = J;
  class B extends q {
    generateSubstitute(x) {
      const A = this, C = A.debugLogger.bind(A), E = new c.FunctionId(x);
      return function(I, H) {
        const F = [I, H], K = g.TransformerBase.emptyRunConfig();
        K.chain((0,g.bailIf)(!A.controlParams.active, "CouchbaseDB sensor is inactive", A)).chain((0,g.tryFunction)(L => {
          const M = p.CbData.getData(this), N = e.SubPathContext.getActiveContext();
          if (M && null != H) {
            const P = new p.CouchbaseBuilderTracker(A, x, M, I.data), Q = A.tryStartAsyncActivation({sensorId:k.Agent.correlation.SensorId.NODEJS_COUCHBASE, functionId:E, category:k.Agent.correlation.MethodCategory.Database, attachmentCreator:P, createInitiatorNode:!1});
            null != Q && (C(() => `${P}: opened asyncActivation=${Q.initialActivation} on spc=${N}`), L = L.setValue(f.CurrentSPC, Q.initialSpc), P.activationResult = Q, P.origCb = H, H = A.wrapCallback(P), F[F.length - 1] = H, K.addToErrorHandler(R => {
              Q.vNodeActivation.exitOrException(R);
              Q.vNodeActivation.spc.end();
              return R;
            }), C(() => `${P}: wrappedCallback=${t.isFunction(H)}`));
          } else {
            m.warning("CouchbaseBuilderTransformer | Bucket exists which hasn't been patched: ");
          }
          return L;
        }));
        return A.runFunctionInContext(K, x.origFn, this, ...F);
      };
    }
  }
  a.CouchbaseBuilderTransformer = B;
  class v extends b.EventEmitterTransformerBase {
    constructor(x, A) {
      super(x, A ? ["error", "end", "rows"] : ["error", "end"]);
    }
    shallWrap(x) {
      return null != p.CouchbaseV2QueryTracker.getTracker(x);
    }
    getWrappedListener(x, A, C) {
      const E = this, I = E.debugLogger.bind(E), H = p.CouchbaseV2QueryTracker.getTracker(x);
      if (null == H) {
        return C;
      }
      I(() => `${H} | wrapping ${C.name} for event ${A.toString()}`);
      return function(F, ...K) {
        const L = g.TransformerBase.emptyRunConfig();
        return E.runFunction(L.chain((0,g.tryFunction)(M => {
          const N = p.CouchbaseV2QueryTracker.getTracker(x);
          if (null != N) {
            const P = Q => `${N}: handled ${A.toString()} event(${C.name}). didThrow=${Q}`;
            L.addToErrorHandler(E.onResultWithLog(P.bind(this, !0)));
            L.addToSuccessHandler(E.onResultWithLog(P.bind(this, !1)));
            null != N.virtualNodeActivation ? N.virtualNodeActivation.isExited || (u.isError(F) ? (N.virtualNodeActivation.methodException(F), I(() => `${N}: exiting vNode=${N.virtualNodeActivation} for event=${A.toString()} ` + `with exception=${F} on spc=${N.virtualNodeActivation.spc}`)) : (N.fillExitData(), I(() => `${N}: filled exit data in ${A.toString()} event`), N.virtualNodeActivation.exit(), I(() => `${N}: exiting vNode=${N.virtualNodeActivation} for event=${A.toString()} ` + `on spc=${N.virtualNodeActivation.spc}`)), 
            N.virtualNodeActivation.spc.end(), I(() => `${N}: exiting spc=${N.virtualNodeActivation.spc}`)) : I(() => `${N}: on spc=${N.spc} has no virtualNodeActivation`);
          } else {
            I(() => "CouchbaseEmitterTransformer | emitter did not have tracker embedded.");
          }
          return M;
        })), C, this, F, ...K);
      };
    }
  }
  class z extends g.TransformerBase {
    generateSubstitute(x) {
      const A = this;
      return function(C, ...E) {
        return A.runFunction((new g.FunctionRunConfig()).chain((0,g.bailIf)(!A.controlParams.active, "CouchbaseDB sensor is inactive", A)).chain((0,g.tryFunction)(I => {
          var H;
          p.CbData.createV4(this._connStr, C).setData(null !== (H = this._conn) && void 0 !== H ? H : this.conn);
          return I;
        })), x.origFn, this, C, ...E);
      };
    }
  }
  a.CouchbaseClusterBucketTransformer = z;
  a.getDtBucket = function() {
    return function(x) {
      const A = new this.__proto__.constructor(x);
      p.CbData.createV2(x).setData(A);
      return A;
    };
  };
  a.getDtConnection = function() {
    return function(x) {
      const A = new this.__proto__.constructor(x);
      p.CbData.createV3(x).setData(A);
      return A;
    };
  };
});
S("src/lib/sensors/CouchbaseAttachment", "require exports net util src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/UrlUtil src/lib/util/JsonObfuscatorUtil src/lib/util/UniqueId src/lib/sensors/SensorConstants src/lib/Agent src/lib/AttachmentBase src/lib/CallbackWrappingHelper src/lib/Debug src/lib/Embedder".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g) {
  function h(x, A) {
    var C, E, I = x.indexOf("://"), H = x.substring(0 < I ? I + 3 : 0).split(/[;,]/);
    x = /^\[([^\]].+)\](?::([\d]+))?/;
    I = [];
    for (const K of H) {
      var F = x.exec(K);
      null != F ? (H = F[1], F = parseInt(null !== (C = null === F || void 0 === F ? void 0 : F[2]) && void 0 !== C ? C : -1, 10), I.push([H, F]), A && A(`Pushed: ${[H, F]}`)) : (F = K.split(":", 2), 1 <= F.length ? (H = F[0], F = parseInt(null !== (E = null === F || void 0 === F ? void 0 : F[1]) && void 0 !== E ? E : -1, 10), I.push([H, F]), A && A(`Pushed: ${[H, F]}`)) : A && A(`Failed to parse '${K}'`));
    }
    return I;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.parseHostsAndPorts = a.CbData = a.CouchbaseBuilderTracker = a.CouchbaseV2QueryTracker = a.CouchbaseV2Tracker = a.CouchbaseSubDocumentTracker = a.CouchbaseQueryTracker = a.CouchbaseV3Tracker = a.CouchbaseConnectionAttachment = a.CouchbaseSQLAttachment = void 0;
  class f extends d.AttachmentBase {
    constructor(x) {
      super(x, m.Agent.correlation.AttachmentId.SQL_ID, 0);
    }
    fillEntryData(x, A) {
      this.setMultipleFields(C => {
        const E = m.Agent.correlation.AttachmentFieldId;
        C.string(E.SQL_STATEMENT, x, m.Configuration.maxSqlStringLen);
        null != A && C.integer(E.SQL_METHOD_TYPE, A);
      });
    }
    fillExitData(x) {
      Number.isInteger(x) && 0 <= x && this.attachment.setFieldInteger(m.Agent.correlation.AttachmentFieldId.SQL_NUM_ROWS_RETURNED, x);
    }
  }
  a.CouchbaseSQLAttachment = f;
  class q extends d.AttachmentBase {
    constructor(x) {
      super(x, m.Agent.correlation.AttachmentId.CONNECTION_POOL_ID, 0);
    }
    fillConn(x, A) {
      let C = [];
      null != x.getQueryhosts() ? (x.debug && m.Logger.debug(`${x}: Using queryhosts=${x.getQueryhosts()}`), C = x.getQueryhosts()) : null != x.getHosts() ? (x.debug && m.Logger.debug(`${x}: Using hosts=${t.inspect(x.getHosts())}`), C = x.getHosts()) : (x.debug && m.Logger.debug(`${x}: Using fallback host.`), C.push(["<unknown host>", -1]));
      0 === C.length && (x.debug && m.Logger.debug(`${x}: encountered empty hosts array. adding fallback host.`), C.push(["<unknown host>", -1]));
      this.setMultipleFields(E => {
        const I = m.Agent.correlation.AttachmentFieldId;
        E.stringCached(I.CONNECTION_POOL_DB, x.name);
        E.stringCached(I.CONNECTION_POOL_URL, C.toString());
        E.stringCached(I.CONNECTION_POOL_DBTYPE, "Couchbase");
        E.stringCached(I.CONNECTION_POOL_DBHOST, C[0][0]);
        E.integer(I.CONNECTION_POOL_DBPORTNO, 8093);
        E.integer(I.CONNECTION_POOL_TYPE, c.CONNECTION_POOL_TYPE_NOT_A_POOL);
        E.integer(I.CONNECTION_POOL_AGGREGATION_MECHANISM, A);
        E.integer(I.CONNECTION_POOL_SIZE, C.length);
      });
    }
  }
  a.CouchbaseConnectionAttachment = q;
  class w {
    constructor(x, A) {
      this.data = A;
      this.debug = x.controlParams.isDebugEnabled;
      this.ID = l.UniqueId.getNext();
      this.errorExtractor = e.errorFromFirstArg;
    }
    toString() {
      this.prefix || (this.prefix = `CouchbaseTracker(#${this.ID})`);
      return this.prefix;
    }
    aggregationType() {
      return m.Agent.correlation.DbAggregationMechanism.DB_AGGREGATION_MECHANISM_UNDEFINED;
    }
    fillEntryData() {
      this.debug && m.Logger.debug(`${this}: starting to fill entry data`);
      null != this.cPoolAttch && null != this.sqlAttch && (this.sqlAttch.fillEntryData(this.formSQLString(), this.aggregationType()), this.cPoolAttch.fillConn(this.data, m.Agent.correlation.DbAggregationMechanism.DB_AGGREGATION_MECHANISM_NO_AGGREGATION));
    }
    getServiceTypeFromMethodName(x) {
      switch(x.replace(/^_+/, "")) {
        case "upsert":
        case "insert":
        case "remove":
        case "replace":
        case "append":
        case "prepend":
        case "counter":
        case "mutateIn":
        case "binaryPrepend":
        case "binaryAppend":
          x = m.Agent.correlation.DbServiceType.DB_SERVICE_TYPE_COUCHBASE_DB_WRITE;
          break;
        case "get":
        case "getAndLock":
        case "getAndTouch":
        case "getReplica":
        case "getMulti":
        case "lookupIn":
        case "exists":
          x = m.Agent.correlation.DbServiceType.DB_SERVICE_TYPE_COUCHBASE_DB_READ;
          break;
        default:
          this.debug && (m.Logger.debug(`${this}: Got unknown methodname=${x}`), b.fail()), x = m.Agent.correlation.DbServiceType.DB_SERVICE_TYPE_UNDEFINED;
      }
      return x;
    }
  }
  class G extends w {
    constructor(x, A, C) {
      super(x, C);
      this.descriptor = A;
      this.injectedCallback = this.hasPromiseHandled = !1;
    }
    createAttachments(x) {
      this.debug && m.Logger.debug(`${this}: creating attachments. activation=${x}`);
      this.cPoolAttch = new q(x);
      this.sqlAttch = new f(x);
      this.fillEntryData();
    }
    fillExitData(x) {
      null != this.sqlAttch && this.sqlAttch.fillExitData(x);
    }
    get virtualNodeActivation() {
      b.isEnabled() && null == this.activationResult && b.fail("activationResult is undefined");
      return this.activationResult.vNodeActivation;
    }
    toString() {
      this.prefix || (this.prefix = `CouchbaseTracker(${this.ID})`);
      return this.prefix;
    }
    get spc() {
      b.isEnabled() && null == this.activationResult && b.fail("activationResult is undefined");
      return this.activationResult.initialSpc;
    }
    set origCb(x) {
      this._origCb = x;
      this.injectedCallback = null != x;
    }
    get origCb() {
      return this._origCb;
    }
    formSQLString() {
      const x = this.descriptor.functionName.replace(/^_+/, "");
      return `${this.data.name}.${x}()`;
    }
    aggregationType() {
      const x = this.descriptor.functionName.replace(/^_+/, "");
      return this.getServiceTypeFromMethodName(x);
    }
  }
  a.CouchbaseV3Tracker = G;
  class y extends G {
    constructor(x, A, C, E) {
      super(x, A, C);
      this.query = E;
      this.onRow = () => {
        this._rowCnt++;
      };
      this._rowCnt = 0;
    }
    get rowCnt() {
      return this._rowCnt;
    }
    formSQLString() {
      return this.query;
    }
    aggregationType() {
      return m.Agent.correlation.DbServiceType.DB_SERVICE_TYPE_COUCHBASE_DB_QUERY;
    }
  }
  a.CouchbaseQueryTracker = y;
  class D extends G {
    constructor(x, A, C, E) {
      super(x, A, C);
      this.cmdCount = null == E ? 0 : E.length;
      this.errorExtractor = function(I, H) {
        if (r.isError(I)) {
          return I;
        }
        if (r.hasProperty(H, "results")) {
          return I = H.results.filter(F => null != F.error).map(F => F.error), r.hasElements(I, 1) ? I[0] : void 0;
        }
        r.hasProperty(I, "content") || m.Logger.warning(`${this}: failed to extract error from: ${JSON.stringify(I)}, defined(doc)=${null != H}`);
      };
    }
    formSQLString() {
      const x = this.descriptor.functionName.replace(/^_+/, "");
      return `${this.data.name}.${x}(${this.obfuscatedOpString()})`;
    }
    obfuscatedOpString() {
      return 0 === this.cmdCount ? "" : "[?" + ",?".repeat(this.cmdCount - 1) + "]";
    }
  }
  a.CouchbaseSubDocumentTracker = D;
  class J extends w {
    constructor(x, A, C, E) {
      super(x, C);
      this.descriptor = A;
      this.options = E;
      this.injectedCallback = !1;
    }
    createAttachments(x) {
      this.debug && m.Logger.debug(`${this}: creating attachments. activation=${x}`);
      this.cPoolAttch = new q(x);
      this.sqlAttch = new f(x);
      this.fillEntryData();
    }
    fillExitData(x) {
      null != this.sqlAttch && this.sqlAttch.fillExitData(x);
    }
    get virtualNodeActivation() {
      b.isEnabled() && null == this.activationResult && b.fail("activationResult is undefined");
      return this.activationResult.vNodeActivation;
    }
    get spc() {
      b.isEnabled() && null == this.activationResult && b.fail("activationResult is undefined");
      return this.activationResult.initialSpc;
    }
    set origCb(x) {
      this._origCb = x;
      this.injectedCallback = null != x;
    }
    get origCb() {
      return this._origCb;
    }
    formSQLString() {
      const x = this.descriptor.functionName.replace(/^_+/, "");
      return `${this.data.name}.${x}(${void 0 === this.options ? "" : k.QueryNormalizer.normalizeQueryToString(this.options)})`;
    }
    aggregationType() {
      const x = this.descriptor.functionName.replace(/^_+/, "");
      return this.getServiceTypeFromMethodName(x);
    }
  }
  J.trackerEmbedder = g.create("cbTracker");
  a.CouchbaseV2Tracker = J;
  class B extends J {
    constructor(x, A, C, E, I) {
      super(x, A, C, "");
      this.query = E;
      this.viewQualifier = I;
      this.hasCallback = !1;
      this.rowCnt = 0;
    }
    createAttachments(x) {
      this.cPoolAttch = new q(x);
      this.sqlAttch = new f(x);
      this.fillEntryData();
    }
    setTracker(x) {
      B.emitterEmbedder.hasData(x) ? this.debug && m.Logger.debug(`${this}: Trying to embed twice!`) : null != x ? (this.debug && m.Logger.debug(`${this}: embedded Tracker!`), B.emitterEmbedder.set(x, this)) : this.debug && null == x && m.Logger.debug(`${this}: Trying to embed on ${x}!`);
    }
    static getTracker(x) {
      return B.emitterEmbedder.get(x);
    }
    fillExitData(x = this.rowCnt) {
      null != this.sqlAttch && this.sqlAttch.fillExitData(x);
    }
    toString() {
      this.prefix || (this.prefix = `CouchbaseQueryTracker(${this.ID})`);
      return this.prefix;
    }
    calledRowEvent() {
      return ++this.rowCnt;
    }
    aggregationType() {
      let x = m.Agent.correlation.DbServiceType.DB_SERVICE_TYPE_UNDEFINED;
      switch(this.descriptor.functionName) {
        case "_cbas":
        case "_n1ql":
          x = m.Agent.correlation.DbServiceType.DB_SERVICE_TYPE_COUCHBASE_DB_QUERY;
          break;
        case "_view":
          x = m.Agent.correlation.DbServiceType.DB_SERVICE_TYPE_COUCHBASE_DB_VIEW;
          break;
        case "_fts":
          x = m.Agent.correlation.DbServiceType.DB_SERVICE_TYPE_COUCHBASE_DB_VIEW;
          break;
        default:
          m.Logger.warning(`${this.data}: found unknown query method=${this.descriptor.functionName}`), b.fail();
      }
      return x;
    }
    formSQLString() {
      let x = "";
      switch(this.descriptor.functionName) {
        case "_cbas":
        case "_n1ql":
          x = this.query.options.statement;
          break;
        case "_view":
          x = this.parsePseudoSQLViewQuery(this.query);
          break;
        case "_fts":
          x = this.parsePseudoSQLSearchQuery(this.query);
          break;
        default:
          m.Logger.warning(`${this.data}: found unknown query method=${this.descriptor.functionName}`), b.fail();
      }
      return x;
    }
    parsePseudoSQLSearchQuery(x) {
      return `(${this.data.name}.${x.data.indexName}).FTSearch(${k.QueryNormalizer.normalizeQueryToString(x)})`;
    }
    parsePseudoSQLViewQuery(x) {
      return `(${this.data.name}.${this.viewQualifier}).ViewQuery(` + k.QueryNormalizer.normalizeQueryToString(x, "stale skip limit group group_level key keys startkey endkey startkey_docid endkey_docid full_set reduce bbox".split(" ")) + ")";
    }
  }
  B.onRow = function() {
    const x = B.getTracker(this);
    if (null != x) {
      const A = x.calledRowEvent();
      x.debug && 0 === A && m.Logger.debug(`${x}: handled first row event. Will omit logging others.`);
    } else {
      m.Logger.debug("Called CouchbaseQueryTracker#onRow without embedded tracker?");
    }
  };
  B.emitterEmbedder = g.create("tracker");
  a.CouchbaseV2QueryTracker = B;
  class v extends J {
    constructor(x, A, C, E) {
      super(x, A, C, E);
      this.errorExtractor = function(I, H) {
        if (r.hasProperty(H, "contents")) {
          const F = H.contents.filter(K => null != K.error).map(K => K.error);
          return r.hasElements(F, 1) ? F[0] : void 0;
        }
        m.Logger.warning(`${this}: cannot extract error. argc=${arguments.length}, errorCnt=${I}, defined(doc)=${null != H}`);
      };
    }
  }
  a.CouchbaseBuilderTracker = v;
  class z {
    static createV2(x) {
      var A = r.hasProperty(x, "dsnObj", "bucket") ? x.dsnObj.bucket : "default";
      A = new z(A);
      try {
        if (Array.isArray(x.dsnObj.hosts)) {
          for (const C of x.dsnObj.hosts) {
            const E = 0 > C[z.HOSTINDEX].indexOf("://"), I = p.parseURL((E ? "fillerProtocol://" : "") + `${C[z.HOSTINDEX]}:${C[z.PORTINDEX]}`);
            if (I.hostname) {
              if (I.hostname.match(/^([a-zA-Z])/)) {
                const H = I.port ? parseInt(I.port, 10) : -1;
                A.hosts.push([I.hostname, 0 === H ? -1 : H]);
                A.debug && m.Logger.debug(`Couchbase: ${A}: Pushed: ${[I.hostname, 0 === H ? -1 : H]}`);
              } else if ((0,u.isIPv4)(C[z.HOSTINDEX]) || (0,u.isIPv6)(C[z.HOSTINDEX])) {
                const H = C[z.PORTINDEX];
                A.hosts.push([C[z.HOSTINDEX], void 0 === H ? -1 : H]);
                A.debug && m.Logger.debug(`Couchbase: ${A}: Pushed: ${[C[z.HOSTINDEX], void 0 === H ? -1 : H]}`);
              } else {
                A.debug && m.Logger.debug(`Couchbase: ${A}: Could not parse ${t.inspect(C)}`);
              }
            }
          }
        } else if (r.hasProperty(x, "dsnObj", "hosts", "port")) {
          const C = parseInt(x.dsnObj.hosts.port, 10);
          A.hosts.push([x.dsnObj.hosts.host, 0 === C ? -1 : C]);
          A.debug && m.Logger.debug(`Couchbase: ${A}: Pushed non array: ${t.inspect(x.dsnObj.hosts)}`);
        }
      } catch (C) {
        n.logAgentException(C);
      }
      return A;
    }
    static createV3(x) {
      var A;
      const C = null !== (A = x.bucketName) && void 0 !== A ? A : "", E = new z(C);
      E.hosts = h(x.connStr, E.debug ? I => m.Logger.debug(`Couchbase: ${E}: ${I}`) : void 0);
      return E;
    }
    static createV4(x, A) {
      return this.createV3({connStr:x, bucketName:A});
    }
    getHosts() {
      return this.hosts;
    }
    getQueryhosts() {
      return this.qHosts;
    }
    setQueryhosts(x) {
      if (void 0 === x) {
        return !1;
      }
      Array.isArray(x) || (x = x.split(","));
      const A = [];
      for (let E of x) {
        if (E) {
          E = z.connStr.normalize(E);
          var C = p.parseURL(E);
          x = C.hostname || "<unknown>";
          C = C.port ? parseInt(C.port, 10) : -1;
          A.push([x, C]);
        }
      }
      this.qHosts = A;
      return !0;
    }
    static getData(x) {
      return z.dataEmbedder.get(x);
    }
    setData(x) {
      z.dataEmbedder.set(x, this);
    }
    toString() {
      this.prefix || (this.prefix = `CbData(${this.name}#${this.ID})`);
      return this.prefix;
    }
    constructor(x) {
      this.debug = z.debug;
      this.ID = l.UniqueId.getNext();
      this.name = x;
      this.hosts = [];
    }
  }
  z.HOSTINDEX = 0;
  z.PORTINDEX = 1;
  z.dataEmbedder = g.create("cbData");
  a.CbData = z;
  a.parseHostsAndPorts = h;
});
S("src/lib/sensors/CouchbaseDbSensor", "require exports src/lib/Debug src/lib/Logger src/lib/Patch src/lib/sensors/CouchbaseAttachment src/lib/sensors/SensorBase src/lib/transformer/CouchbaseDbTransformer src/lib/transformer/ContextPassingTransformer src/lib/util/SemverUtil".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.CouchbaseDbSensor = void 0;
  class m extends p.SensorBase {
    applyInstrumentation(d, e) {
      var b = d.moduleInfo.version;
      c.satisfies(b, ">=2.6.0") ? (this.isDebugEnabled && t.debug(`Found version couchbase module: ${b}, sensor is ${this.active ? "en" : "dis"}abled`), b = c.satisfies(b, ">=3.0.0"), this.isDebugEnabled && t.debug(`${this.name}: patching ${d.request}`), b ? this.applyInstrumentationPost3(d, e.ruleKey) : this.applyInstrumentationPre3(d, e.ruleKey)) : t.info(`Found unsupported version of ${this.name}. Support starts with version ${"2.6.0"}, but is ${b}!`);
    }
    applyInstrumentationPost3(d, e) {
      var b = d.moduleInfo.version;
      const g = c.satisfies(b, ">=3.2.0");
      b = c.satisfies(b, ">=4.0.0");
      if ("CouchbaseDb.collection" === e) {
        const h = g ? d.moduleExports.Collection.prototype : d.moduleExports.prototype;
        d = "upsert insert remove replace _binaryAppend _binaryPrepend get getAndLock getAndTouch exists".split(" ");
        const f = (q, w) => this._debugOutput(this.patchFunction(q, w, h), q);
        (b ? d : d.concat(["_counter", "_getReplica"])).forEach(q => f(q, new k.CouchbaseDbCollectionTransformer(this)));
        ["lookupIn", "mutateIn"].forEach(q => f(q, new k.CouchbaseSubDocumentTransformer(this)));
      } else if ("CouchbaseDb.connection" === e) {
        b = g ? d.moduleExports.Connection : d.moduleExports, "function" !== typeof b ? (t.warning("Can't patch Connection because prototype is not a function"), u.fail()) : (e = (0,k.getDtConnection)(), g ? d.moduleExports.Connection = e : d.moduleExports = e, e.prototype = b.prototype, d = new r.SubstitutedFnDescriptor(new r.FunctionSpec("Connection", "", e, "couchbase"), b, !1), r.tag(d, e, b), this._debugOutput(!0, "Connection constructor"));
      } else if ("CouchbaseDb.cluster" === e) {
        const h = g ? d.moduleExports.Cluster.prototype : d.moduleExports.prototype;
        ["analyticsQuery", "query", "searchQuery"].forEach(f => this._debugOutput(this.patchFunction(f, new k.CouchbaseQueryTransformer(this), h), f));
        b && this.patchFunction("bucket", new k.CouchbaseClusterBucketTransformer(this), h);
      }
    }
    applyInstrumentationPre3(d, e) {
      var b = c.satisfies(d.moduleInfo.version, ">=2.6.0");
      this.isDebugEnabled && t.debug(`AnalyticsQuery ${b ? "en" : "dis"}abled`);
      if ("Module.main" === e) {
        let w = new k.CouchbaseDbRestTransformer(this);
        for (var g of "upsert insert remove replace append prepend counter".split(" ")) {
          e = this.patchFunction(g, w, d.moduleExports.BucketImpl.prototype), this._debugOutput(e, g);
        }
        for (const G of ["get", "getAndLock", "getAndTouch", "getReplica", "getMulti"]) {
          e = this.patchFunction(G, w, d.moduleExports.BucketImpl.prototype), this._debugOutput(e, G);
        }
        g = new l.ContextPassingTransformer(this);
        e = this.patchFunction("openBucket", g, d.moduleExports.Cluster.prototype);
        this._debugOutput(e, "openBucket");
        for (var h of ["disconnect"]) {
          e = this.patchFunction(h, g, d.moduleExports.BucketImpl.prototype), this._debugOutput(e, h);
        }
        h = new k.CouchbaseLegacyQueryTransformer(this);
        e = ["_n1ql", "_view", "_fts"];
        b && e.push("_cbas");
        for (var f of e) {
          e = this.patchFunction(f, h, d.moduleExports.BucketImpl.prototype), this._debugOutput(e, `Bucket::${f}`);
        }
        f = ["_n1ql", "_fts"];
        b && f.push("_cbas");
        for (var q of f) {
          e = this.patchFunction(q, h, d.moduleExports.Cluster.prototype), this._debugOutput(e, `Cluster::${q}`);
        }
        w = new k.CouchbaseBuilderTransformer(this);
        for (const G of ["_mutateIn", "_lookupIn"]) {
          e = this.patchFunction(G, w, d.moduleExports.BucketImpl.prototype), this._debugOutput(e, G);
        }
      } else {
        "CouchbaseDb.bucket" === e ? (b = d.moduleExports, q = (0,k.getDtBucket)(), q.prototype = b.prototype, d.moduleExports = q, d = new r.SubstitutedFnDescriptor(new r.FunctionSpec("Bucket", "", q, "couchbase"), b, !1), r.tag(d, q, b), this._debugOutput(!0, "Bucket constructor")) : "CouchbaseDb.connstr" === e && (n.CbData.connStr = d.moduleExports, n.CbData.debug = this.isDebugEnabled, null == d.moduleExports.normalize && t.warning(`Found connstr module without normalize method, cbVersion=${d.moduleInfo.version}`), 
        this.isDebugEnabled && t.debug("Using couchbases connstr to parse URLs."));
      }
    }
    patchFunction(d, e, b) {
      d = new r.FunctionSpec(d, "", b, r.AsyncTrackingMode.CallbackLast, "couchbase");
      return void 0 !== r.applyToSingle(d, e);
    }
    _debugOutput(d, e) {
      this.isDebugEnabled && d ? t.debug(`        patched ${e}`) : d || (t.warning(`could not patch ${e}`), u.fail());
    }
  }
  a.CouchbaseDbSensor = m;
});
S("src/lib/sensors/MessagingAttachment", ["require", "exports", "src/lib/Agent", "src/lib/AttachmentBase"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ConnectionInfo = a.MessagingConsumerAttachment = a.MessagingProducerAttachment = void 0;
  class r extends t.AttachmentBase {
    constructor(l, c, m, d, e, b) {
      super(l, c, b);
      this.vendor = m;
      this.messageType = d;
      this.transmissionType = e;
    }
    fillAttachment(l) {
      this.setMultipleFields(c => {
        const m = u.Agent.correlation.AttachmentFieldId;
        l.setServiceDetectionFeatureFlags(c);
        c.integer(m.MESSAGING_NODE_TYPE, this.messageType);
        c.stringCached(m.MESSAGING_NODE_QUEUE_VENDOR, this.vendor);
        var d = l.getDestinationName();
        c.stringCached(m.MESSAGING_NODE_DESTINATION, d || "<unknown>");
        d = l.getDestinationType();
        null != d && c.stringCached(m.MESSAGING_NODE_DESTINATION_TYPE, d);
        c.integer(m.MESSAGING_NODE_TOPOLOGY, l.getTopology());
        c.stringCachedOrUnavailable(m.MESSAGING_NODE_HOSTNAME, l.getHostName());
        this.id === u.Agent.correlation.AttachmentId.MESSAGING_SERVER_ID && null != this.transmissionType && c.integer(m.MESSAGING_NODE_TRANSMISSION_TYPE, this.transmissionType);
        d = l.getPort();
        null != d && c.integer(m.MESSAGING_NODE_PORT, d);
        d = l.isTmpQueue();
        null != d && c.integer(m.MESSAGING_NODE_IS_TEMPORARY_QUEUE, d ? 1 : 0);
        d = l.getMsgSize();
        null != d && 0 < d && c.integer(m.MESSAGING_NODE_SIZE, l.getMsgSize());
        d = l.getCorrelationId();
        null != d && c.string(m.MESSAGING_NODE_VENDOR_CORRELATION_ID, d);
        d = l.getMsgId();
        null != d && c.string(m.MESSAGING_NODE_VENDOR_MESSAGE_ID, d);
      });
    }
  }
  class n extends r {
    constructor(l, c, m, d = 0) {
      super(l, u.Agent.correlation.AttachmentId.MESSAGING_CLIENT_ID, c, m, void 0, d);
    }
  }
  a.MessagingProducerAttachment = n;
  class p extends r {
    constructor(l, c, m, d = 0) {
      super(l, u.Agent.correlation.AttachmentId.MESSAGING_SERVER_ID, c, m, u.Agent.correlation.TransmissionType.RECEIVE, d);
    }
  }
  a.MessagingConsumerAttachment = p;
  class k {
    constructor(l, c, m) {
      this.host = l;
      this.port = c;
      this.topology = m;
    }
  }
  a.ConnectionInfo = k;
});
S("src/lib/transformer/RabbitMqTransformer", "require exports util src/lib/Agent src/lib/CallbackWrappingHelper src/lib/Embedder src/lib/FunctionId src/lib/Logger src/lib/SubPathContext src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/sensors/MessagingAttachment src/lib/transformer/TransformerBase".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AmqpConsumerTransformer = a.AmqpProducerTransformer = a.RabbitMqConsumerMessagingData = a.RabbitMqProducerMessagingData = void 0;
  class g {
    constructor(y, D, J, B) {
      this.channel = y;
      this.args = D;
      this.isConsumerTracker = J;
      this.isDebug = B;
      this.errorExtractor = r.errorFromFirstArg;
    }
    createAttachments(y) {
      if (null != this.channel && null != this.args) {
        y = this.isConsumerTracker ? new e.MessagingConsumerAttachment(y, "RabbitMQ", t.Agent.nativeAgent.correlation.MessagingMessagetype.AMQP_MESSAGE) : new e.MessagingProducerAttachment(y, "RabbitMQ", t.Agent.nativeAgent.correlation.MessagingMessagetype.AMQP_MESSAGE);
        const D = this.isConsumerTracker ? new q(this.channel, this.args) : new f(this.channel, this.args);
        y.fillAttachment(D);
      } else {
        this.isDebug && k.debug(`RabbitMqSensor: trying to create attachment w/o data objects for ${this.isConsumerTracker ? "consumer" : "producer"}`);
      }
    }
    static cbIsWrapped(y) {
      return !!g.embedder.get(y);
    }
    static getMessageObjectFromArgs(y) {
      if (0 < y.length) {
        return y[y.length - 1];
      }
    }
    static getLinkFromMessage(y) {
      var D, J;
      y = null === (J = null === (D = null === y || void 0 === y ? void 0 : y.properties) || void 0 === D ? void 0 : D.headers) || void 0 === J ? void 0 : J.dtdTraceTagInfo;
      return "string" === typeof y ? y : void 0;
    }
  }
  g.embedder = n.create("amqptracker");
  class h {
    constructor(y) {
      c.hasProperty(y, "connection", "muxer", "out") && (y = y.connection.muxer.out.address(), this.connInfo = null != y ? new e.ConnectionInfo(y.address, y.port, t.Agent.correlation.MessagingTopology.EXTERNAL) : new e.ConnectionInfo("localhost", -1, t.Agent.correlation.MessagingTopology.EMBEDDED));
    }
    getDestinationName() {
      return c.hasProperty(this.fields, "exchange") && 0 < this.fields.exchange.length ? this.fields.exchange : this.fields.routingKey || "";
    }
    getHostName() {
      return null != this.connInfo && null != this.connInfo.host ? this.connInfo.host : "";
    }
    getPort() {
      return null != this.connInfo && null != this.connInfo.port ? this.connInfo.port : -1;
    }
    getTopology() {
      return null != this.connInfo ? this.connInfo.topology : t.Agent.correlation.MessagingTopology.NOT_SET;
    }
    isTmpQueue() {
      if (null != this.fields) {
        var y = this.fields.exchange;
        if (null != y && 0 < y.length) {
          return !1;
        }
        y = this.fields.routingKey;
        if ("string" !== typeof y) {
          return !1;
        }
        if (y.startsWith("amq.gen") || y.startsWith("amq.rabbitmq.reply-to") || y.match(/^amqpSendAndReceive[0-9a-fA-F]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12}$/)) {
          return !0;
        }
      }
      return !1;
    }
    getDestinationType() {
      if (null != this.fields) {
        var y = this.fields.exchange;
        if (null != y && 0 < y.length) {
          return "Topic";
        }
        y = this.fields.routingKey;
        if (null != y && 0 < y.length) {
          return "Queue";
        }
      }
      return "";
    }
    getMsgSize() {
      return null != this.msgContent ? this.msgContent.length : 0;
    }
    setServiceDetectionFeatureFlags(y) {
      const D = t.Agent.correlation.AttachmentFieldId;
      y.integer(D.MESSAGING_NODE_WILL_HAVE_DESTINATION_TYPE, 1);
      y.integer(D.MESSAGING_NODE_WILL_HAVE_IPCONTAINER, 1);
      y.integer(D.MESSAGING_NODE_WILL_HAVE_TOPOLOGY, 1);
      y.integer(D.MESSAGING_NODE_WILL_HAVE_TEMPORARY_QUEUE, 1);
      y.integer(D.MESSAGING_NODE_WILL_HAVE_QUEUE_VENDOR_NAME, 1);
      y.integer(D.MESSAGING_NODE_WILL_HAVE_MQ_QUEUE_MANAGER_NAME, 0);
    }
  }
  class f extends h {
    constructor(y, D) {
      super(y);
      3 === D.length && (this.fields = D[0], this.msgContent = D[2]);
    }
    getCorrelationId() {
      if (c.hasProperty(this.fields, "correlationId")) {
        return `${this.fields.correlationId}`;
      }
    }
    getMsgId() {
      if (c.hasProperty(this.fields, "messageId")) {
        return `${this.fields.messageId}`;
      }
    }
  }
  a.RabbitMqProducerMessagingData = f;
  class q extends h {
    constructor(y, D) {
      super(y);
      c.hasProperty(D, "fields") && (this.fields = D.fields);
      c.hasProperty(D, "properties") && (this.props = D.properties);
      c.hasProperty(D, "content") && (this.msgContent = D.content);
    }
    getCorrelationId() {
      if (c.hasProperty(this.props, "correlationId")) {
        return `${this.props.correlationId}`;
      }
    }
    getMsgId() {
      if (c.hasProperty(this.props, "messageId")) {
        return `${this.props.messageId}`;
      }
    }
  }
  a.RabbitMqConsumerMessagingData = q;
  class w extends b.TransformerBase {
    generateSubstitute(y) {
      const D = this, J = new p.FunctionId(y);
      return function(B) {
        const v = D.controlParams.isDebugEnabled;
        v && k.debug("RabbitMqSensor: Channel.sendMessage substitute enter");
        if (!D.controlParams.active) {
          return v && k.debug("RabbitMqSensor: Channel.sendMessage exit - inactive"), d.doInvoke(this, y.origFn, arguments);
        }
        let z;
        try {
          var x = new g(this, arguments, !1, v);
          z = D.tryStartActivation({sensorId:t.Agent.correlation.SensorId.NODEJS_RABBITMQ, functionId:J, attachmentCreator:x});
          if (null != z) {
            const A = z.mActivation.spc;
            if (c.hasProperty(B, "headers")) {
              const C = A.createAddSerializeLink(!1, t.Agent.correlation.TaggingMode.DT_ONLY);
              null != C && null != C.dtTag ? B.headers.dtdTraceTagInfo = C.dtTag : v && k.debug("RabbitMqSensor: Channel.sendMessage - link invalid");
            }
          } else {
            v && k.debug(`RabbitMqSensor: no activation, active spc: ${l.SubPathContext.getActiveContext()}`);
          }
        } catch (A) {
          m.logAgentException(A);
        }
        x = d.safeInvoke(this, y.origFn, arguments);
        try {
          null === z || void 0 === z ? void 0 : z.methodActivationDone(x.exception);
        } catch (A) {
          m.logAgentException(A);
        }
        v && k.debug("RabbitMqSensor: Channel.sendMessage substitute exit");
        return x.rethrow();
      };
    }
  }
  a.AmqpProducerTransformer = w;
  class G extends b.TransformerBase {
    generateSubstitute(y) {
      const D = this;
      return function() {
        const J = D.controlParams.isDebugEnabled;
        J && k.debug("RabbitMqSensor: Channel.dispatchMessage substitute enter");
        if (!D.controlParams.active) {
          return J && k.debug("RabbitMqSensor: Channel.dispatchMessage exit - inactive"), d.doInvoke(this, y.origFn, arguments);
        }
        var B = arguments;
        try {
          if (c.hasProperty(this, "consumers")) {
            const v = g.getMessageObjectFromArgs(arguments);
            if (c.hasProperty(v, "fields", "consumerTag")) {
              if (null != g.getLinkFromMessage(v)) {
                const z = v.fields.consumerTag, x = u.types.isMap(this.consumers), A = x ? this.consumers.get(z) : this.consumers[z];
                if ("function" !== typeof A || g.cbIsWrapped(A)) {
                  J && k.debug(`RabbitMqSensor: Channel.dispatchMessage - ${"function" === typeof A ? "callback already wrapped" : "non callback"}`);
                } else {
                  J && k.debug("RabbitMqSensor: Channel.dispatchMessage - wrapping callback");
                  const C = D.wrapCallback(A, this);
                  g.embedder.set(C, !0);
                  x ? this.consumers.set(z, C) : this.consumers[z] = C;
                }
              } else {
                J && k.debug("RabbitMqSensor: no tag found on message");
              }
            } else {
              J && k.debug("RabbitMqSensor: No callback for wrapping available");
            }
          }
        } catch (v) {
          m.logAgentException(v);
        }
        B = d.safeInvoke(this, y.origFn, B);
        J && k.debug("RabbitMqSensor: Channel.dispatchMessage substitute exit");
        return B.rethrow();
      };
    }
    wrapCallback(y, D) {
      const J = this, B = new p.FunctionId(y);
      return function() {
        const v = J.controlParams.isDebugEnabled;
        let z;
        try {
          v && k.debug("RabbitMqSensor: consumer callback substitute enter");
          var x = g.getMessageObjectFromArgs(arguments);
          const A = g.getLinkFromMessage(x);
          let C;
          null != A && (C = t.Agent.correlation.deserializeLinkFromString(A));
          const E = new g(D, x, !0, v);
          z = J.tryStartIncomingSubPath({sensorId:t.Agent.correlation.SensorId.NODEJS_RABBITMQ, functionId:B, link:C, attachmentCreator:E});
          null == z && v && k.debug(`RabbitMqSensor: no activation, active spc: ${l.SubPathContext.getActiveContext()}`);
        } catch (A) {
          m.logAgentException(A);
        }
        x = d.safeInvoke(this, y, arguments);
        try {
          null === z || void 0 === z ? void 0 : z.methodActivationDone(x.exception), v && k.debug("RabbitMqSensor: consumer callback substitute exit");
        } catch (A) {
          m.logAgentException(A);
        }
        return x.rethrow();
      };
    }
  }
  a.AmqpConsumerTransformer = G;
});
S("src/lib/sensors/RabbitMqSensor", "require exports src/lib/Patch src/lib/transformer/ContextPassingTransformer src/lib/transformer/RabbitMqTransformer src/lib/sensors/SensorBase".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.RabbitMqSensor = void 0;
  class p extends n.SensorBase {
    applyInstrumentation(k, l) {
      "Module.main" !== l.ruleKey && "RabbitMq.callback_api" !== l.ruleKey || this.patchConnect(k.moduleExports);
      "RabbitMq.channel" === l.ruleKey && (this.patchChannelSendMessageCommand(k.moduleExports), this.patchChannelDispatchMessageCommand(k.moduleExports));
      "RabbitMq.model" === l.ruleKey && (this.patchChannelrpcCommand(k.moduleExports), this.patchChannelAssertExchangeCommand(k.moduleExports));
    }
    patchChannelSendMessageCommand(k) {
      const l = new r.AmqpProducerTransformer(this);
      k = new u.FunctionSpec("sendMessage", "Channel", k.Channel.prototype, u.AsyncTrackingMode.None, "amqp");
      u.applyToSingle(k, l);
    }
    patchChannelrpcCommand(k) {
      const l = new t.ContextPassingTransformer(this);
      k = new u.FunctionSpec("rpc", "Channel", k.Channel.prototype, u.AsyncTrackingMode.CallbackLastOrPromise, "amqp");
      u.applyToSingle(k, l);
    }
    patchChannelAssertExchangeCommand(k) {
      const l = new t.ContextPassingTransformer(this);
      k = new u.FunctionSpec("assertExchange", "Channel", k.Channel.prototype, u.AsyncTrackingMode.CallbackLastOrPromise, "amqp");
      u.applyToSingle(k, l);
    }
    patchChannelDispatchMessageCommand(k) {
      const l = new r.AmqpConsumerTransformer(this);
      k = new u.FunctionSpec("dispatchMessage", "Channel", k.BaseChannel.prototype, u.AsyncTrackingMode.CallbackLastOrPromise, "amqp");
      u.applyToSingle(k, l);
    }
    patchConnect(k) {
      const l = new t.ContextPassingTransformer(this);
      k = new u.FunctionSpec("connect", "", k, u.AsyncTrackingMode.CallbackLastOrPromise, "amqp");
      u.applyToSingle(k, l);
    }
  }
  a.RabbitMqSensor = p;
});
S("src/lib/transformer/AwsSdkTransformerUtils", ["require", "exports", "src/lib/Agent", "src/lib/util/CoreUtil"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.parseFunctionName = a.ClientContextManipulator = void 0;
  class r {
    static fromBase64(n, p = !1) {
      let k;
      if (null != n) {
        try {
          const l = Buffer.from(n, "base64").toString();
          p && u.Logger.debug(`ClientContextManipulator: modifying application client context '${l}'`);
          k = JSON.parse(l);
        } catch (l) {
          p && u.Logger.debug(`ClientContextManipulator: failed to parse existing client context (${l})`);
        }
      } else {
        k = Object.create(null);
      }
      return new r(k, n, p);
    }
    static fromClientContext(n, p = !1) {
      return new r(n, void 0, p);
    }
    getTag() {
      const n = this.getCustomProp();
      return null != n ? n["dynatrace-link"] : void 0;
    }
    extractTag() {
      const n = this.getTag();
      if (null != n) {
        try {
          delete this.getCustomProp()["dynatrace-link"];
        } catch (p) {
        }
      }
      return n;
    }
    setTag(n) {
      if (null != this.cc) {
        try {
          const p = this.getCustomProp();
          null == p ? (this.cc.custom = Object.create(null), this.cc.custom["dynatrace-link"] = n) : !Array.isArray(p) && t.isObject(p) ? p["dynatrace-link"] = n : this.isDebugEnabled && u.Logger.debug(`ClientContextManipulator: tag not set. Custom isArray - typeof(Custom)=${typeof p}`);
        } catch (p) {
          this.isDebugEnabled && u.Logger.debug(`ClientContextManipulator: error setting tag '${p}'`);
        }
      }
    }
    toBase64() {
      if (null == this.cc) {
        return this.origCcStr;
      }
      let n;
      try {
        const p = Buffer.from(JSON.stringify(this.cc));
        this.isDebugEnabled && u.Logger.debug(`ClientContextManipulator: modified client context '${p.toString()}'`);
        n = p.toString("base64");
        n.length > r.cClientContextLengthMax && (this.isDebugEnabled && u.Logger.info(`ClientContextManipulator: exceeded length limit embedding to ClientContext (${n.length})`), n = this.origCcStr);
      } catch (p) {
        this.isDebugEnabled && u.Logger.debug(`ClientContextManipulator: embedding to ClientContext failed with ${p}`);
      }
      return n;
    }
    constructor(n, p, k) {
      this.cc = n;
      this.origCcStr = p;
      this.isDebugEnabled = k;
    }
    getCustomProp() {
      var n, p, k;
      return null !== (p = null === (n = this.cc) || void 0 === n ? void 0 : n.custom) && void 0 !== p ? p : null === (k = this.cc) || void 0 === k ? void 0 : k.Custom;
    }
  }
  r.cClientContextLengthMax = 3583;
  a.ClientContextManipulator = r;
  a.parseFunctionName = function(n, p) {
    var k = n.split(":");
    1 === k.length ? k = n : "arn" === k[0] ? k = 7 <= k.length && "function" === k[5] && "lambda" === k[2] ? k[6] : n : 2 === k.length ? k = k[1] : (k = n, p && u.Logger.debug(`malformed function name '${n}'`));
    p && n !== k && u.Logger.debug(`parsed '${k}' from '${n}'`);
    return k;
  };
});
S("src/lib/transformer/AwsSdkTransformerV2", "require exports src/lib/Agent src/lib/AttachmentBase src/lib/CallbackWrappingHelper src/lib/FunctionId src/lib/Logger src/lib/Patch src/lib/SubPathContext src/lib/Tracing src/lib/transformer/TransformerBase src/lib/transformer/AwsSdkTransformerUtils src/lib/util/ErrorUtil src/lib/util/HttpHeader src/lib/util/InvocationUtil".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AwsSdkV2RequestTransformer = void 0;
  class h extends m.TransformerBase {
    constructor(f) {
      super(f);
      this.unsupportedPromiseLibrary = !1;
      p.info(`AwsSdk: cRequestIdBase=${h.cRequestIdBase}`);
    }
    createAttachments(f) {
      this.attachment = new t.AttachmentBase(f, u.Agent.correlation.AttachmentId.AWS_LAMBDA_CLIENT_ID, 0);
    }
    applyRequestTransformations(f) {
      let q = new k.FunctionSpec("send", "Request", f.moduleExports.Request.prototype, k.AsyncTrackingMode.CallbackFirst, "http");
      k.applyToSingle(q, this);
      q = new k.FunctionSpec("promise", "Request", f.moduleExports.Request.prototype, k.AsyncTrackingMode.None, "http");
      k.applyToSingle(q, this);
    }
    generateSubstitute(f) {
      const q = this, w = new n.FunctionId(f), G = "send" === f.functionName;
      return function() {
        q.isDebugEnabled && p.debug(`${q.toString(this)} enter ${f.qualifiedName} api=${this.service.api.apiVersion} ` + `svc=${this.service.serviceIdentifier} op=${this.operation}, type=${this.params.InvocationType}`);
        if (q.doIgnoreRequest(this)) {
          return q.isDebugEnabled && p.debug(`${q.toString(this)} ignoring ${q.controlParams.active ? "sensor inactive" : "not a targeted request"}`), g.doInvoke(this, f.origFn, arguments);
        }
        var y = "invoke" === this.operation || null == this.params.InvocationType || "RequestResponse" === this.params.InvocationType;
        let D, J, B = arguments, v;
        try {
          let z;
          D = q.tryStartAsyncActivation({sensorId:u.Agent.correlation.SensorId.NODEJS_AWSSDK, functionId:w, attachmentCreator:q});
          if (null != D) {
            z = D.vNodeActivation.spc.createAddSerializeLink(y, u.Agent.correlation.TaggingMode.DT_ONLY);
            if (q.isDebugEnabled) {
              const x = c.Tracing.traceContextToString(z);
              p.debug(`${q.toString(this)} ${D}, tag: ${x}, att: ${q.attachment}`);
            }
            J = this.params.ClientContext;
            if (null != z && null != z.dtTag) {
              const x = d.ClientContextManipulator.fromBase64(this.params.ClientContext, q.isDebugEnabled);
              x.setTag(z.dtTag);
              this.params.ClientContext = x.toBase64();
            }
            null != q.attachment && (v = q.attachment, q.attachment = void 0, q.fillAttachmentFieldsFromRequest(v, this), this.on("httpHeaders", q.makeHttpHeadersEventHandler(v)));
            G && (0 < B.length ? "function" === typeof B[0] ? B[0] = q.wrapCallback(D, B[0]) : q.isDebugEnabled && p.debug(`${q.toString(this)} argument[0] is not a function (${B[0]})`) : B = [q.wrapCallback(D)]);
          } else {
            q.isDebugEnabled && p.debug(`${q.toString(this)} no method activation, active spc: ${l.SubPathContext.getActiveContext()}`);
          }
        } catch (z) {
          e.logAgentException(z);
        }
        y = g.safeInvoke(this, f.origFn, B);
        if (null != D) {
          try {
            if (y.didThrow) {
              q.closeAsyncPath(D.vNodeActivation, y.exception);
            } else if (!G) {
              const z = q.makeProxyPromise(y.retVal, D, this);
              y = g.SafeInvokeRetVal.makeRetVal(z);
            }
            D.initiatorActivationDone(y.exception);
            null != J ? this.params.ClientContext = J : delete this.params.ClientContext;
          } catch (z) {
            e.logAgentException(z);
          }
          q.isDebugEnabled && p.debug(`${q.toString(this)} exit ${f.qualifiedName}`);
        }
        return y.rethrow();
      };
    }
    toString(f) {
      return null == f ? "AwsSdk:" : `AwsSdk(${f.startTime.valueOf() - h.cRequestIdBase}):`;
    }
    makeProxyPromise(f, q, w) {
      function G(J) {
        try {
          y.isDebugEnabled && p.debug(`${y.toString(w)}: promise fullfilled with err=${J} - closing vnode ${q.vNodeActivation}`), null != q.vNodeActivation && q.vNodeActivation.exitOrException(J);
        } catch (B) {
          e.logAgentException(B);
        }
      }
      const y = this;
      let D;
      null != f.constructor ? D = new f.constructor((J, B) => {
        f.then(v => {
          G();
          J(v);
        }, v => {
          G(v);
          B(v);
        });
      }) : (this.unsupportedPromiseLibrary || (p.warning("non native Promise implementation does not expose construcor"), this.unsupportedPromiseLibrary = !0), D = f);
      return D;
    }
    doIgnoreRequest(f) {
      return !this.controlParams.active || f.service.serviceIdentifier !== h.cLambdaServiceIdentifier || !h.cSupportedApiVersions.some(q => q === f.service.api.apiVersion) || "invoke" !== f.operation || "DryRun" === f.params.InvocationType;
    }
    wrapCallback(f, q) {
      const w = null != q;
      w || (q = h.dtInjectedSendCallback);
      return r.CallbackWrappingHelper.wrapCallbackCreateActivation({injectedCallback:!w, virtualNodeActivation:f.vNodeActivation, origCb:q, errorExtractor:G => G});
    }
    makeHttpHeadersEventHandler(f) {
      const q = this;
      return function(w, G) {
        try {
          q.isDebugEnabled && p.debug(`${q.toString(this)} httpHeaders event`), q.fillAttachmentFieldsFromResponseHeaders(f, this, G);
        } catch (y) {
          e.logAgentException(y);
        }
      };
    }
    fillAttachmentFieldsFromRequest(f, q) {
      const w = (0,d.parseFunctionName)(`${q.params.FunctionName}`, this.isDebugEnabled), G = `${q.httpRequest.region}`, y = u.Agent.correlation.AttachmentFieldId;
      f.setStringCached(y.AWS_LAMBDA_CLIENT_FUNCTION_NAME, w);
      f.setStringCached(y.AWS_LAMBDA_CLIENT_REGION, G);
      this.isDebugEnabled && p.debug(`${this.toString(q)} attachment FnName=${w}, region=${G}`);
    }
    fillAttachmentFieldsFromResponseHeaders(f, q, w) {
      (new b.HeadersObjectManipulator(w, 0, !1)).forMatching(h.headerData, (G, y, D) => {
        f.setString(D.associatedData(), G.firstValue);
        this.isDebugEnabled && p.debug(`${this.toString(q)} attachment ${G.rawName}=${G.firstValue}`);
      });
    }
    closeAsyncPath(f, q) {
      if (null != f) {
        try {
          this.controlParams.isDebugEnabled && p.debug(`${this} closeAsyncPath spc: ${f.spc}, err: ${e.verboseExceptionObject(q)}`), f.exitOrException(q), f.spc.end();
        } catch (w) {
          e.logAgentException(w);
        }
      }
    }
    static dtInjectedSendCallback() {
    }
  }
  h.cLambdaServiceIdentifier = "lambda";
  h.cRequestIdBase = Date.now().valueOf();
  h.cSupportedApiVersions = ["2015-03-31"];
  h.headerData = [new b.HeaderAssociatedData("x-amzn-trace-id", () => u.Agent.correlation.AttachmentFieldId.AWS_LAMBDA_CLIENT_TRACE_ID), new b.HeaderAssociatedData("x-amzn-requestid", () => u.Agent.correlation.AttachmentFieldId.AWS_LAMBDA_CLIENT_REQUEST_ID)];
  a.AwsSdkV2RequestTransformer = h;
});
S("src/lib/transformer/AwsSdkTransformerV3", "require exports util src/lib/Agent src/lib/AttachmentBase src/lib/Embedder src/lib/FunctionId src/lib/transformer/TransformerBase src/lib/transformer/PromiseTransformerUtilities src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/transformer/AsyncTransformerBase src/lib/AsyncTracker src/lib/transformer/AwsSdkTransformerUtils".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g) {
  function h(B, v) {
    B && t.Logger.debug(d.isFunction(v) ? v() : v);
  }
  function f(B) {
    return "object" === typeof B && null !== B && null !== B.constructor && "InvokeCommand" !== B.constructor.name && c.hasSingleProperty(B, "input") && c.hasSingleProperty(B, "deserialize");
  }
  function q(B) {
    if (null != B) {
      const v = B.config;
      return null != v && c.hasSingleProperty(v, "apiVersion") && "string" === typeof v.apiVersion && c.hasSingleProperty(v, "region") && "string" === typeof v.serviceId && c.hasSingleProperty(B, "middlewareStack");
    }
    return !1;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AwsSdkV3ResolveMiddlewareTransformer = a.AwsSdkV3ClientTransformer = void 0;
  class w extends b.AsyncTracker {
    constructor(B, v, z) {
      super(B, v);
      this.activation = z;
    }
  }
  class G {
    createAttachments(B) {
      this.attachment = new r.AttachmentBase(B, t.Agent.correlation.AttachmentId.AWS_LAMBDA_CLIENT_ID, 0);
    }
  }
  const y = n.create("awsSdkAttachmentEmbedder");
  class D extends e.AsyncTransformerBase {
    generateSubstitute(B) {
      const v = this, z = new p.VirtualNodeFunctionId(new p.FunctionId(B));
      return function(x) {
        var A;
        if (!f(x) || !q(this)) {
          return h(v.isDebugEnabled, `Request ignored on obj ${typeof this} with args: ${(0,u.inspect)(arguments)}`), d.doInvoke(this, B.origFn, arguments);
        }
        let C, E, I = arguments;
        try {
          const H = this.config, F = x, K = F.input;
          let L;
          if (v.doIgnoreRequest(H, K.InvocationType)) {
            return d.doInvoke(this, B.origFn, arguments);
          }
          h(v.isDebugEnabled, () => `AwsSdkV3: enter ${B.functionName} api=${H.apiVersion} svc=${H.serviceId} fn=${K.FunctionName} type=${K.InvocationType}`);
          const M = (0,g.parseFunctionName)(null !== (A = K.FunctionName) && void 0 !== A ? A : D.defaultFunctionName, v.isDebugEnabled), N = new G();
          C = v.tryStartActivation({sensorId:t.Agent.correlation.SensorId.NODEJS_AWSSDK, functionId:z, attachmentCreator:N});
          if (null != C) {
            E = new w(v, B, C);
            I = E.manipulateArguments(I);
            L = C.mActivation.spc.createAddSerializeLink(!1, t.Agent.correlation.TaggingMode.DT_ONLY);
            const P = t.Agent.correlation.AttachmentFieldId, Q = N.attachment;
            null != Q && (Q.setStringCached(P.AWS_LAMBDA_CLIENT_FUNCTION_NAME, M), H.region().then(R => {
              Q.setStringCached(P.AWS_LAMBDA_CLIENT_REGION, R);
            }).catch(m.logAgentException), y.set(F, Q));
            if (null != (null === L || void 0 === L ? void 0 : L.dtTag)) {
              h(v.isDebugEnabled, `AwsSdkV3: setting tag '${L.dtTag}'`);
              const R = F.input, T = g.ClientContextManipulator.fromBase64(R.ClientContext);
              T.setTag(L.dtTag);
              R.ClientContext = T.toBase64();
            }
          }
        } catch (H) {
          m.logAgentException(H);
        }
        A = d.safeInvoke(this, B.origFn, I);
        try {
          A.didThrow ? (h(v.isDebugEnabled, `AwsSdkV3: original function ${B.qualifiedName} did throw: ${A.exception}`), null === C || void 0 === C ? void 0 : C.methodActivationDone(A.exception)) : null != E && v.wrapReturnValue(E, A), h(v.isDebugEnabled, `AwsSdkV3: exit ${B.qualifiedName}`);
        } catch (H) {
          m.logAgentException(H);
        }
        return A.rethrow();
      };
    }
    wrapReturnValue(B, v) {
      const z = this.controlParams.isDebugEnabled;
      v = v.retVal;
      l.PromiseTransformerUtilities.isActuallyAPromise(v) && l.PromiseTransformerUtilities.wrapPromise(v, function(x, A) {
        return function(C) {
          return D.handleThenCall(this, B.activation, x, C, A, arguments, z);
        };
      });
    }
    wrapCallback(B) {
      const v = this;
      return function(z, x) {
        null == B.activation || B.activation.mActivation.isExited || (B.activation.methodActivationDone(z), h(v.isDebugEnabled, "AwsSdkV3: ended virtual node (cb)"));
        return d.doInvoke(void 0, B.origCb, arguments);
      };
    }
    doIgnoreRequest(B, v) {
      const z = ["2015-03-31"];
      return !this.controlParams.active || "lambda" !== B.serviceId.toLowerCase() || !z.some(x => x === B.apiVersion) || "DryRun" === v;
    }
    static handleThenCall(B, v, z, x, A, C, E) {
      h(E, () => `AwsSdkV3: enter then call, isCatch ${z}`);
      try {
        v.mActivation.isExited || (v.methodActivationDone(z ? x : void 0), h(E, "AwsSdkV3: ended virtual node"));
      } catch (H) {
        m.logAgentException(H);
      }
      const I = d.safeInvoke(B, A, C);
      h(E, () => `AwsSdkV3: exit then call, didThrow ${I.didThrow}`);
      return I.rethrow();
    }
  }
  D.defaultFunctionName = "<undefined>";
  a.AwsSdkV3ClientTransformer = D;
  class J extends k.TransformerBase {
    generateSubstitute(B) {
      const v = this;
      return function(...z) {
        const x = this, A = d.doInvoke(this, B.origFn, z);
        return v.controlParams.active ? function(...C) {
          return d.doInvoke(this, A, C).then(E => {
            var I;
            if (I = c.hasSingleProperty(E, "response")) {
              I = E.response, I = c.hasSingleProperty(I, "headers") && c.hasSingleProperty(I, "statusCode");
            }
            if (I) {
              var H = E.response.headers;
              I = y.get(x);
              if (null != I) {
                const F = H["x-amzn-trace-id"];
                "string" === typeof F && I.setString(t.Agent.correlation.AttachmentFieldId.AWS_LAMBDA_CLIENT_TRACE_ID, F);
                H = H["x-amzn-requestid"];
                "string" === typeof H && I.setString(t.Agent.correlation.AttachmentFieldId.AWS_LAMBDA_CLIENT_REQUEST_ID, H);
                v.controlParams.isDebugEnabled && t.Logger.debug(`AwsSdkV3: headers returned x-amzn-trace-id: ${F} x-amzn-requestid: ${H}`);
              }
            }
            return E;
          }).finally(() => {
            y.clear(x);
            const E = x.input, I = g.ClientContextManipulator.fromBase64(E.ClientContext);
            I.extractTag();
            E.ClientContext = I.toBase64();
          });
        } : A;
      };
    }
  }
  a.AwsSdkV3ResolveMiddlewareTransformer = J;
});
S("src/lib/sensors/AwsSdkSensor", "require exports src/lib/sensors/SensorBase src/lib/Debug src/lib/Patch src/lib/transformer/AwsSdkTransformerV2 src/lib/transformer/AwsSdkTransformerV3".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AwsSdkSensor = void 0;
  class k extends u.SensorBase {
    applyInstrumentation(l, c) {
      "AwsSdk.coreV2" === c.ruleKey ? (new n.AwsSdkV2RequestTransformer(this)).applyRequestTransformations(l) : "AwsSdk.smithy" === c.ruleKey ? (c = new p.AwsSdkV3ClientTransformer(this), l = new r.FunctionSpec("send", "Client", l.moduleExports.Client.prototype, r.AsyncTrackingMode.CallbackLastOrPromise, "http"), r.applyToSingle(l, c)) : "AwsSdk.client" === c.ruleKey ? (c = new p.AwsSdkV3ResolveMiddlewareTransformer(this), l = new r.FunctionSpec("resolveMiddleware", "InvokeCommand", l.moduleExports.InvokeCommand.prototype, 
      r.AsyncTrackingMode.Promise), r.applyToSingle(l, c)) : t.fail(`AwsSdkSensor: unexpected rule key ${c.ruleKey}`);
    }
  }
  a.AwsSdkSensor = k;
});
S("src/lib/sensors/RemoteCallAttachment", ["require", "exports", "src/lib/Agent", "src/lib/AttachmentBase"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.RemoteCallServerAttachment = a.RemoteCallClientAttachment = void 0;
  class r extends t.AttachmentBase {
    constructor(p) {
      super(p, u.Agent.correlation.AttachmentId.REMOTE_CALL_CLIENT_ID, 0);
    }
    fillAttachmentData(p) {
      this.setMultipleFields(k => {
        const l = u.Agent.correlation.AttachmentFieldId;
        k.integer(l.REMOTE_CALL_CHANNEL_TYPE_ID, p.getChannelTypeId());
        k.stringCached(l.REMOTE_CALL_CHANNEL_ENDPOINT_ID, p.getChannelEndpointId());
        k.stringCached(l.REMOTE_CALL_SERVICE_ENDPOINT_ID, p.getServiceEndpointId());
        p.hasHostnameId() && k.stringCached(l.REMOTE_CALL_HOSTNAME_ID, p.getHostnameId());
        k.integer(l.REMOTE_CALL_PORTNO_ID, p.getPortNoId());
        k.stringCached(l.REMOTE_CALL_SERVICE_METHOD_ID, p.getServiceMethodId());
        k.stringCached(l.REMOTE_CALL_SERVICE_NAME_ID, p.getServiceNameId());
        k.integer(l.REMOTE_CALL_PROTOCOL_TYPE_ID, p.getWireProtocolTypeId());
        p.hasWireProtocolName() && k.stringCached(l.REMOTE_CALL_PROTOCOL_NAME_ID, p.getWireProtocolName());
      });
    }
  }
  a.RemoteCallClientAttachment = r;
  class n extends t.AttachmentBase {
    constructor(p) {
      super(p, u.Agent.correlation.AttachmentId.REMOTE_CALL_SERVER_ID, 0);
    }
    fillAttachmentData(p) {
      this.setMultipleFields(k => {
        const l = u.Agent.correlation.AttachmentFieldId;
        k.stringCached(l.REMOTE_CALL_SERVICE_ENDPOINT_ID, p.getServiceEndpointId());
        k.stringCached(l.REMOTE_CALL_SERVICE_METHOD_ID, p.getServiceMethodId());
        k.stringCached(l.REMOTE_CALL_SERVICE_NAME_ID, p.getServiceNameId());
        k.integer(l.REMOTE_CALL_PROTOCOL_TYPE_ID, p.getWireProtocolTypeId());
        p.hasWireProtocolName() && k.stringCached(l.REMOTE_CALL_PROTOCOL_NAME_ID, p.getWireProtocolName());
      });
    }
  }
  a.RemoteCallServerAttachment = n;
});
S("src/lib/transformer/GrpcUtilities", "require exports src/lib/sensors/SensorConstants src/lib/sensors/RemoteCallAttachment src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/util/UniqueId src/lib/Agent src/lib/Embedder src/lib/FunctionId src/lib/Logger src/lib/Patch src/lib/SubPathContext src/lib/Tracing src/lib/transformer/EventEmitterTransformerBase src/lib/transformer/TransformerBase".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h, f) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.GrpcClientTransformer = a.GrpcUtilities = a.GrpcServerTracker = a.GrpcServerState = a.GrpcClientTracker = a.GrpcTracker = void 0;
  class q {
    constructor() {
      this.id = k.UniqueId.getNext();
    }
  }
  a.GrpcTracker = q;
  class w extends q {
    constructor(z, x, A) {
      super();
      this.serviceInfo = z;
      this.address = x;
      this.isDebug = A;
    }
    createAttachments(z) {
      z = new t.RemoteCallClientAttachment(z);
      z.valid && z.fillAttachmentData(new G(this.serviceInfo, this.address, this.isDebug));
    }
    toString() {
      null == this.stringified && (this.stringified = `GRPCClientTracker#${this.id}`);
      return this.stringified;
    }
  }
  a.GrpcClientTracker = w;
  class G {
    constructor(z, x, A) {
      this.serviceInfo = z;
      this.address = x;
      this.isDebug = A;
      this.port = 0;
      null != x ? (x = x.split(":"), 2 === x.length && (this.hostname = x[0], this.port = +x[1])) : this.isDebug && d.debug("GRPCClientState.ctr: no adress available");
      null == z && this.isDebug && d.debug("GRPCClientState.ctr: no serviceInfo object available");
    }
    getChannelTypeId() {
      return l.Agent.correlation.ChannelType.TCP_IP;
    }
    getChannelEndpointId() {
      return null != this.address ? this.address : "";
    }
    getServiceEndpointId() {
      return "grpc://" + this.getServiceNameId();
    }
    hasHostnameId() {
      return null != this.hostname;
    }
    getHostnameId() {
      return this.hostname ? this.hostname : "";
    }
    getPortNoId() {
      return this.port;
    }
    getServiceMethodId() {
      if (null == this.methodName && null != this.serviceInfo && null != this.serviceInfo.path) {
        const z = this.serviceInfo.path.split("/");
        0 < z.length && (this.methodName = z[z.length - 1]);
      }
      return null != this.methodName ? this.methodName : "";
    }
    getServiceNameId() {
      if (null == this.serviceName && null != this.serviceInfo) {
        const z = this.serviceInfo.path;
        if (null != z) {
          const x = z.lastIndexOf("/");
          -1 === x ? this.serviceName = z : 0 === x ? this.serviceName = z.substring(x + 1, z.length) : z.startsWith("/") ? this.serviceName = z.substring(1, x) : this.serviceName = z.substring(0, x);
        }
      }
      return null != this.serviceName ? this.serviceName : "";
    }
    getWireProtocolTypeId() {
      const z = l.Agent.correlation.RemoteCallWireProtocol;
      if (r.hasProperty(this.serviceInfo, "requestStream") && r.hasProperty(this.serviceInfo, "responseStream")) {
        switch(J.getCallType(this.serviceInfo.requestStream, this.serviceInfo.responseStream)) {
          case J.CallType.UNARY:
            return z.REMOTE_CALL_WIRE_PROTOCOL_GRPC_UNARY;
          case J.CallType.SERVER_STREAM:
          case J.CallType.SERVER_STREAM_JS:
            return z.REMOTE_CALL_WIRE_PROTOCOL_GRPC_SERVERSTREAM;
          case J.CallType.CLIENT_STREAM:
          case J.CallType.CLIENT_STREAM_JS:
            return z.REMOTE_CALL_WIRE_PROTOCOL_GRPC_CLIENTSTREAM;
          case J.CallType.BIDI:
            return z.REMOTE_CALL_WIRE_PROTOCOL_GRPC_BIDI;
        }
      }
      return z.REMOTE_CALL_WIRE_PROTOCOL_GRPC;
    }
    hasWireProtocolName() {
      return !1;
    }
    getWireProtocolName() {
      return "";
    }
  }
  class y {
    constructor(z, x) {
      this.type = z;
      this.serviceEndpoint = x;
    }
    getServiceEndpointId() {
      return "grpc://" + this.getServiceNameId();
    }
    getServiceMethodId() {
      if (null == this.methodName && null != this.serviceEndpoint) {
        const z = this.serviceEndpoint.split("/");
        0 < z.length && (this.methodName = z[z.length - 1]);
      }
      return this.methodName ? this.methodName : "";
    }
    getServiceNameId() {
      if (null == this.serviceName && null != this.serviceEndpoint) {
        const z = this.serviceEndpoint, x = z.lastIndexOf("/");
        -1 === x ? this.serviceName = z : 0 === x ? this.serviceName = z.substring(x + 1, z.length) : z.startsWith("/") ? this.serviceName = z.substring(1, x) : this.serviceName = z.substring(0, x);
      }
      return null != this.serviceName ? this.serviceName : "";
    }
    getWireProtocolTypeId() {
      const z = l.Agent.correlation.RemoteCallWireProtocol;
      if (null != this.type) {
        switch(this.type) {
          case J.CallType.UNARY:
            return z.REMOTE_CALL_WIRE_PROTOCOL_GRPC_UNARY;
          case J.CallType.SERVER_STREAM:
          case J.CallType.SERVER_STREAM_JS:
            return z.REMOTE_CALL_WIRE_PROTOCOL_GRPC_SERVERSTREAM;
          case J.CallType.CLIENT_STREAM:
          case J.CallType.CLIENT_STREAM_JS:
            return z.REMOTE_CALL_WIRE_PROTOCOL_GRPC_CLIENTSTREAM;
          case J.CallType.BIDI:
            return z.REMOTE_CALL_WIRE_PROTOCOL_GRPC_BIDI;
        }
      }
      return z.REMOTE_CALL_WIRE_PROTOCOL_GRPC;
    }
    hasWireProtocolName() {
      return !1;
    }
    getWireProtocolName() {
      return "";
    }
  }
  a.GrpcServerState = y;
  class D extends q {
    constructor(z) {
      super();
      this.grpcServerState = z;
    }
    createAttachments(z) {
      z = new t.RemoteCallServerAttachment(z);
      z.valid && z.fillAttachmentData(this.grpcServerState);
    }
    toString() {
      null == this.stringified && (this.stringified = `GRPCServerTracker#${this.id}`);
      return this.stringified;
    }
  }
  a.GrpcServerTracker = D;
  class J {
    static getTraceContext(z) {
      if (0 < z.length && null != z[0].metadata) {
        z = z[0].metadata;
        let x, A, C, E = g.Tracing.grpcDtTaggingEnabled ? z.get(u.cDtTaggingHeader) : void 0;
        1 === (null === E || void 0 === E ? void 0 : E.length) && "string" === typeof E[0] && (x = E[0], z.remove(u.cDtTaggingHeader));
        E = g.Tracing.grpcTraceContextTaggingEnabled ? z.get(u.cW3cTraceParent) : void 0;
        1 === (null === E || void 0 === E ? void 0 : E.length) && "string" === typeof E[0] && (A = E[0], E = z.get(u.cW3cTraceState), 1 === (null === E || void 0 === E ? void 0 : E.length) && "string" === typeof E[0] && (C = E[0]));
        if (null != x || null != A) {
          return {dtTag:x, traceparent:A, tracestate:C};
        }
      }
    }
    static getCallbackIndex(z) {
      return 0 < z.length && "function" === typeof z[z.length - 1] ? z.length - 1 : -1;
    }
    static getCallType(z, x) {
      return z ? x ? J.CallType.BIDI : J.CallType.CLIENT_STREAM : x ? J.CallType.SERVER_STREAM : J.CallType.UNARY;
    }
    static findServiceInfo(z, x) {
      let A = z[x];
      null == A && (A = z[J.recapitalizeServiceMethodName(x)]);
      return A;
    }
    static recapitalizeServiceMethodName(z) {
      const x = z.charAt(0);
      return x === x.toLowerCase() ? x.toUpperCase() + z.slice(1) : x.charAt(0).toLowerCase() + z.slice(1);
    }
    static patchServiceClient(z, x, A, C, E = !1) {
      if (null != z && ("ServiceClient" === z.name || "ServiceClientImpl" === z.name)) {
        C && d.debug("GrpcLoadTransformer.patchServiceClient: patching serviceclient");
        for (const F in z.prototype) {
          if (z.prototype.hasOwnProperty(F) && J.isServiceFunction(z.prototype[F])) {
            var I = F.toString(), H = z.service;
            let K;
            null != H && (K = J.findServiceInfo(H, I));
            C && d.debug("GRPCLoadTransformer.patchServiceClient: patching service function " + F);
            I = new B(K, x, E, A);
            H = new e.FunctionSpec(F, "ServiceClient", z.prototype, e.AsyncTrackingMode.CallbackLast, J.cApiRealm);
            e.applyToSingle(H, I, J.GrpcPatchOptions);
          }
        }
      }
    }
    static isServiceFunction(z) {
      return "function" === typeof z && ("wrapper" === z.name || "method_func" === z.name || r.hasProperty(z, "path"));
    }
    static isService(z) {
      return r.hasProperty(z, "name") && "ServiceClientImpl" === z.name;
    }
    static isProtoMessageDefinition(z) {
      return r.hasProperty(z, "fileDescriptorProtos");
    }
    static findAndPatchServiceClients(z, x, A, C) {
      if (r.isObject(z)) {
        for (const E in z) {
          if (z.hasOwnProperty(E)) {
            const I = z[E];
            J.isService(I) ? J.patchServiceClient(I, x, A, C, !0) : J.isProtoMessageDefinition(I) || J.findAndPatchServiceClients(I, x, A, C);
          }
        }
      }
    }
  }
  J.CallType = {UNARY:"unary", SERVER_STREAM:"server_stream", CLIENT_STREAM:"client_stream", SERVER_STREAM_JS:"serverStream", CLIENT_STREAM_JS:"clientStream", BIDI:"bidi", UNKNOWN:"unknown"};
  J.TrackerEmbedder = c.create("grpctracker");
  J.cApiRealm = "grpc";
  J.ClientFunctionProperties = "path requestDeserialize requestSerialize requestStream requestType responseDeserialize responseSerialize responseStream responseType".split(" ");
  J.GrpcPatchOptions = Object.assign({}, e.cDefaultOptions, {propertiesToCopy:J.ClientFunctionProperties});
  a.GrpcUtilities = J;
  class B extends f.TransformerBase {
    constructor(z, x, A, C) {
      super(C);
      this.serviceInfo = z;
      this.metadataType = x;
      this.isManagedGrpc = A;
      this.callType = J.CallType.UNKNOWN;
      null != z ? this.callType = J.getCallType(z.requestStream, z.responseStream) : this.isDebugEnabled && d.debug("GrpcClientTransformer.ctr: No service info available. Some attachment data will be missing.");
    }
    generateSubstitute(z) {
      const x = this, A = new m.FunctionId(z);
      return function() {
        var C = x.controlParams.isDebugEnabled;
        let E, I, H = arguments;
        try {
          const F = x.getChannelTarget(this);
          E = new w(x.serviceInfo, F, x.isDebugEnabled);
          I = x.tryStartAsyncActivation({sensorId:this.isManagedGrpc ? l.Agent.correlation.SensorId.NODEJS_GRPC : l.Agent.correlation.SensorId.NODEJS_GRPCJS, functionId:A, attachmentCreator:E, vPathOption:x.callType === J.CallType.SERVER_STREAM || x.callType === J.CallType.BIDI || x.callType === J.CallType.SERVER_STREAM_JS ? 2 : 1});
          if (null != I) {
            E.virtualNodeActivation = I.vNodeActivation;
            switch(x.callType) {
              case J.CallType.UNARY:
              case J.CallType.CLIENT_STREAM:
                x.isDebugEnabled && d.debug(`GRPCClientTransformer.clientCallSubstitute: '${x.callType}' call - wrapping callback`);
                const K = J.getCallbackIndex(H);
                if (0 <= K) {
                  E.origFunction = H[K];
                  const L = x.wrapCallback(E);
                  H[K] = L;
                } else {
                  x.isDebugEnabled && d.debug("GRPCClientTransformer.clientCallSubstitute: no cbIndex could be found.");
                }
                break;
              default:
                x.isDebugEnabled && d.debug(`GRPCClientTransformer.clientCallSubstitute: '${x.callType}' call - wrapping stream`);
            }
            if (null != x.metadataType) {
              const K = x.getTaggingHeaders(H), L = I.vNodeActivation.spc.createAddSerializeLink(!0, g.Tracing.getGrpcTaggingMode(), null !== K && void 0 !== K ? K : {});
              null != L && (x.isDebugEnabled && d.debug(`GRPCClientTransformer.clientCallSubstitute: tags: ${g.Tracing.traceContextToString(L)}`), H = x.modifyGrpcCallArguments(L, H));
            }
          } else {
            C && d.debug(`${E}: no activation, active spc: ${b.SubPathContext.getActiveContext()}`);
          }
        } catch (F) {
          n.logAgentException(F);
        }
        C = p.safeInvoke(this, z.origFn, H);
        try {
          if (null != E) {
            C.didThrow && null != E.virtualNodeActivation && (x.isDebugEnabled && d.debug("GRPCClientTransformer.clientCallSubstitute: call ended with exception. Ending virtual path structure"), E.virtualNodeActivation.exitOrException(C.exception), E.virtualNodeActivation.spc.end());
            if (!C.didThrow) {
              switch(x.callType) {
                case J.CallType.SERVER_STREAM:
                case J.CallType.SERVER_STREAM_JS:
                case J.CallType.BIDI:
                  J.TrackerEmbedder.set(C.retVal, E);
                  x.patchReadableStream(C.retVal);
                  break;
                case J.CallType.UNKNOWN:
                  null != E.virtualNodeActivation && (E.virtualNodeActivation.exitOrException(C.exception), E.virtualNodeActivation.spc.end());
              }
            }
            null === I || void 0 === I ? void 0 : I.initiatorActivationDone(C.exception);
          }
        } catch (F) {
          n.logAgentException(F);
        }
        return C.rethrow();
      };
    }
    wrapCallback(z) {
      const x = this;
      return function() {
        const A = x.controlParams.isDebugEnabled;
        let C;
        try {
          if (null != z.virtualNodeActivation) {
            z.virtualNodeActivation.isExited || (0 < arguments.length && r.isError(arguments[0]) ? z.virtualNodeActivation.methodException(arguments[0]) : z.virtualNodeActivation.exit());
            var E = new m.FunctionId(z.origFunction);
            C = f.TransformerBase.createCallbackActivation(z.virtualNodeActivation.spc, E);
            null != C ? A && d.debug(`${z} | creating callback node for function ${z.origFunction.name}. spc=${C.activation.spc}`) : A && d.debug(`${z} | could not create callback method activation`);
          }
        } catch (I) {
          n.logAgentException(I);
        }
        E = p.safeInvoke(this, z.origFunction, arguments);
        try {
          null != z.virtualNodeActivation && (null != C && (A && d.debug(`${z} | closing callback node.`), C.done(E.exception)), z.virtualNodeActivation.spc.end());
        } catch (I) {
          n.logAgentException(I);
        }
        return E.rethrow();
      };
    }
    patchReadableStream(z) {
      const x = new v(this.controlParams);
      z = new e.ModuleSpec("Readable", z);
      x.applyTransformation(z);
    }
    getChannelTarget(z) {
      if (r.hasProperty(z, "$channel")) {
        if (z = z.$channel.getTarget(), "string" === typeof z) {
          return z;
        }
      } else if (this.isManagedGrpc && "function" === typeof(null === z || void 0 === z ? void 0 : z.getChannel) && (z = z.getChannel().getTarget(), "string" === typeof z)) {
        if (!z.startsWith("dns:")) {
          return z;
        }
        const x = z.lastIndexOf("/");
        return z.substring(-1 === x ? 4 : x + 1);
      }
      return "";
    }
    modifyGrpcCallArguments(z, x) {
      for (let A = 0; A < x.length; A++) {
        if (x[A] instanceof this.metadataType) {
          return B.setTaggingHeaders(z, x[A]), x;
        }
      }
      z = this.normalizeGrpcCallArgumentsAndAddTagging(x, z);
      if (null != z) {
        return z;
      }
      this.isDebugEnabled && d.warning("Could not modify grpc call arguments -> tagging is skipped");
      return x;
    }
    normalizeGrpcCallArgumentsAndAddTagging(z, x) {
      let A;
      const C = new this.metadataType();
      B.setTaggingHeaders(x, C);
      switch(this.callType) {
        case J.CallType.UNARY:
          switch(z.length) {
            case 2:
              A = [z[0], C, z[1]];
              break;
            case 3:
              A = [z[0], C, z[1], z[2]];
              break;
            case 4:
              A = [z[0], C, z[2], z[3]];
              break;
            default:
              this.isDebugEnabled && d.warning(`GrpcSensor: got unsupported args.length for unary call (${z.length})`);
          }break;
        case J.CallType.SERVER_STREAM:
          switch(z.length) {
            case 1:
              A = [z[0], C];
              break;
            case 2:
              A = [z[0], C, z[1]];
              break;
            case 3:
              A = [z[0], C, z[2]];
              break;
            default:
              this.isDebugEnabled && d.warning(`GrpcSensor: got unsupported args.length for server stream call (${z.length})`);
          }break;
        case J.CallType.CLIENT_STREAM:
          switch(z.length) {
            case 1:
              A = [C, z[0]];
              break;
            case 2:
              A = [C, z[0], z[1]];
              break;
            case 3:
              A = [C, z[1], z[2]];
              break;
            default:
              this.isDebugEnabled && d.warning(`GrpcSensor: got unsupported args.length for client stream call (${z.length})`);
          }break;
        case J.CallType.BIDI:
          switch(z.length) {
            case 0:
              A = [C];
              break;
            case 1:
              A = [C, z[0]];
              break;
            case 2:
              A = [C, z[1]];
              break;
            default:
              this.isDebugEnabled && d.warning(`GrpcSensor: got unsupported args.length for bidi stream call (${z.length})`);
          }break;
        default:
          this.isDebugEnabled && d.warning(`GrpcSensor: got unknown grpc calltyp (${this.callType})`);
      }
      return A;
    }
    static setTaggingHeaders(z, x) {
      const A = new g.Tracing(z);
      A.grpcUseDtTagging() && x.set(u.cDtTaggingHeader, z.dtTag);
      A.grpcUseTraceParent() && x.set(u.cW3cTraceParent, z.traceparent);
      A.grpcUseTraceState() && x.set(u.cW3cTraceState, z.tracestate);
    }
    getTaggingHeaders(z) {
      for (var x = 0; x < z.length; x++) {
        const A = z[x];
        if (A instanceof this.metadataType) {
          z = A.getMap();
          x = z[u.cW3cTraceParent];
          let C;
          "string" === typeof x ? (this.isDebugEnabled && d.debug(`GRPCClientTransformer.getTaggingHeaders: found traceparent: ${x}`), C = z[u.cW3cTraceState], "string" !== typeof C ? C = void 0 : this.isDebugEnabled && d.debug(`GRPCClientTransformer.getTaggingHeaders: found traceState: ${C}`)) : x = void 0;
          if (null != x) {
            return {traceparent:x, tracestate:C};
          }
          break;
        }
      }
    }
  }
  a.GrpcClientTransformer = B;
  class v extends h.EventEmitterTransformerBase {
    constructor(z) {
      super(z, ["data", "end", "readable", "error", "close"]);
    }
    shallWrap(z) {
      return null != J.TrackerEmbedder.get(z);
    }
    getWrappedListener(z, x, A) {
      const C = J.TrackerEmbedder.get(z);
      return null == C ? A : function(E) {
        var I;
        try {
          null != C && null != C.virtualNodeActivation && (C.virtualNodeActivation.isExited || (r.isError(E) ? C.virtualNodeActivation.methodException(E) : C.virtualNodeActivation.exit(), C.virtualNodeActivation.spc.open && C.virtualNodeActivation.spc.end()), C.virtualNodeActivation.spc.activate());
        } catch (F) {
          n.logAgentException(F);
        }
        const H = p.safeInvoke(this, A, arguments);
        try {
          null === (I = null === C || void 0 === C ? void 0 : C.virtualNodeActivation) || void 0 === I ? void 0 : I.spc.deactivate();
        } catch (F) {
          n.logAgentException(F);
        }
        return H.rethrow();
      };
    }
  }
});
S("src/lib/transformer/GrpcTransformer", "require exports util src/lib/Agent src/lib/FunctionId src/lib/Logger src/lib/Patch src/lib/Tracing src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/transformer/TransformerBase src/lib/transformer/GrpcUtilities".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.GrpcRegisterTransformer = a.GrpcMakeClientCtrTransformer = void 0;
  class e extends m.TransformerBase {
    generateSubstitute(f) {
      const q = this;
      return function() {
        const w = q.isDebugEnabled;
        w && n.debug(".makeClientCtrSubstitute: calling original");
        const G = c.safeInvoke(this, f.origFn, arguments);
        try {
          w && n.debug(".makeClientCtrSubstitute: wrapping client instance functions"), d.GrpcUtilities.patchServiceClient(G.retVal, q.metadataType, q.controlParams, w);
        } catch (y) {
          l.logAgentException(y);
        }
        return G.rethrow();
      };
    }
  }
  a.GrpcMakeClientCtrTransformer = e;
  class b extends m.TransformerBase {
    constructor(f, q) {
      super(f);
      this.sensorId = q;
    }
    generateSubstitute(f) {
      const q = this;
      return function() {
        const w = c.doInvoke(this, f.origFn, arguments);
        try {
          const G = arguments[0], y = arguments[1], D = arguments[4];
          if (!0 !== w || "string" !== typeof G || "function" !== typeof y || "string" !== typeof D) {
            return q.isDebugEnabled && n.debug(`GrpcRegisterTransformer | skip patch, result:${w}, arguments ${"string" === typeof G ? `name:${G}` : `typeof(name):${typeof G}`}, ${"function" === typeof y ? `handler:${y.name}` : `typeof(handler): ${typeof y}`}, ${"string" === typeof D ? `type:${D}` : `typeof(type): ${typeof D}`}`), w;
          }
          const J = u.types.isMap(this.handlers) ? this.handlers.get(G) : this.handlers[G], B = new g(q.controlParams, q.sensorId, G, D), v = new p.FunctionSpec("func", "handler", J), z = p.applyToSingle(v, B);
          q.isDebugEnabled && n.debug(`GrpcRegisterTransformer | patched name:${G}, type:${D}, success: ${null != z}`);
        } catch (G) {
          l.logAgentException(G);
        }
        return w;
      };
    }
  }
  a.GrpcRegisterTransformer = b;
  class g extends m.TransformerBase {
    constructor(f, q, w, G) {
      super(f);
      this.sensorId = q;
      this.serviceType = G;
      this.grpcServerState = new d.GrpcServerState(G, w);
    }
    generateSubstitute(f) {
      const q = this, w = new r.FunctionId(f.origFn);
      return function() {
        var G;
        let y;
        const D = arguments;
        let J;
        const B = q.isDebugEnabled;
        try {
          const v = d.GrpcUtilities.getTraceContext(arguments);
          let z;
          if (null != v) {
            if (B) {
              const x = k.Tracing.traceContextToString(v);
              n.debug(`GRPCServiceFunctionTransformer: for (${f.origFn.name}), tags:${x}`);
            }
            z = t.Agent.correlation.deserializeLinkFromString(v.dtTag, v.traceparent, v.tracestate);
          }
          J = new d.GrpcServerTracker(q.grpcServerState);
          y = q.tryStartIncomingAsyncSubPath({sensorId:q.sensorId, functionId:w, link:z, attachmentCreator:J});
          if (null != y) {
            J.virtualNodeActivation = y.vNodeActivation;
            if (B) {
              const x = null === (G = y.initiatorActivation) || void 0 === G ? void 0 : G.toString(!0), A = y.vNodeActivation.toString(!0);
              n.debug(`${J} | GRPCServiceFunctionTransformer: started asyncActivation. initiator=${x}, vNode=${A}`);
            }
            switch(q.serviceType) {
              case d.GrpcUtilities.CallType.UNARY:
              case d.GrpcUtilities.CallType.CLIENT_STREAM:
              case d.GrpcUtilities.CallType.CLIENT_STREAM_JS:
                B && n.debug(`${J} | GRPCServiceFunctionTransformer: '${q.serviceType}' call. Wrapping callback`);
                const x = d.GrpcUtilities.getCallbackIndex(D);
                if (0 <= x) {
                  J.origFunction = D[x];
                  const E = q.wrapClientCallback(J);
                  D[x] = E;
                }
                break;
              case d.GrpcUtilities.CallType.SERVER_STREAM_JS:
              case d.GrpcUtilities.CallType.SERVER_STREAM:
              case d.GrpcUtilities.CallType.BIDI:
                B && n.debug(`${J} | GRPCServiceFunctionTransformer: '${q.serviceType}' call. Wrapping stream`);
                d.GrpcUtilities.TrackerEmbedder.set(D[0], J);
                g.writableStreamPatched || (q.patchWritableStream(D[0]), g.writableStreamPatched = !0);
                const A = new h(q.controlParams), C = new p.FunctionSpec("end", "", D[0]);
                p.applyToSingle(C, A);
                break;
              default:
                B && n.debug(`${J} | GRPCServiceFunctionTransformer: unknown call type='${q.serviceType}'`);
            }
          }
        } catch (v) {
          l.logAgentException(v);
        }
        G = c.safeInvoke(this, f.origFn, D);
        try {
          null != y && (B && n.debug(`${J} | GRPCServiceFunctionTransformer: didThrow=${G.didThrow}`), y.initiatorActivationDone(G.exception));
        } catch (v) {
          l.logAgentException(v);
        }
        return G.rethrow();
      };
    }
    wrapClientCallback(f) {
      const q = this;
      return function() {
        try {
          null != f.virtualNodeActivation && (f.virtualNodeActivation.isExited ? q.isDebugEnabled && n.debug(`${f} | reentering callback, with closed vNode=${f.virtualNodeActivation.toString(!0)}`) : (q.isDebugEnabled && n.debug(`${f} | exiting vNode=${f.virtualNodeActivation.toString(!0)}`), f.virtualNodeActivation.exit()));
        } catch (w) {
          l.logAgentException(w);
        }
        return c.doInvoke(this, f.origFunction, arguments);
      };
    }
    patchWritableStream(f) {
      let q = new h(this.controlParams), w = new p.FunctionSpec("write", "", f.constructor.prototype);
      p.applyToSingle(w, q);
      q = new h(this.controlParams);
      w = new p.FunctionSpec("pipe", "", f.constructor.prototype);
      p.applyToSingle(w, q);
    }
  }
  g.writableStreamPatched = !1;
  class h extends m.TransformerBase {
    generateSubstitute(f) {
      const q = this;
      return function() {
        let w;
        try {
          w = d.GrpcUtilities.TrackerEmbedder.get(this), null != w && (q.isDebugEnabled && n.debug(`${w} | GRPCWritableStreamTransformer.writableStreamSubstitute(${f.functionName}): found embedded tracker`), null == w.virtualNodeActivation || w.virtualNodeActivation.isExited || (w.virtualNodeActivation.exit(), q.isDebugEnabled && n.debug(`${w} | GRPCWritableStreamTransformer.writableStreamSubstitute` + `(${f.functionName}): exiting virtual node=${w.virtualNodeActivation}`)));
        } catch (y) {
          l.logAgentException(y);
        }
        const G = c.safeInvoke(this, f.origFn, arguments);
        if (null != w) {
          try {
            null != w.virtualNodeActivation && w.virtualNodeActivation.spc.open && (q.isDebugEnabled && n.debug(`${w} | GRPCWritableStreamTransformer.writableStreamSubstitute` + `(${f.functionName}): ending subpath=${w.virtualNodeActivation.spc}`), w.virtualNodeActivation.spc.end());
          } catch (y) {
            l.logAgentException(y);
          }
        }
        return G.rethrow();
      };
    }
  }
});
S("src/lib/sensors/GrpcSensor", "require exports src/lib/sensors/SensorBase src/lib/Agent src/lib/Logger src/lib/Patch src/lib/transformer/GrpcTransformer".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.GrpcSensor = void 0;
  class k extends u.SensorBase {
    applyInstrumentation(l, c) {
      if ("Module.main" === c.ruleKey) {
        const m = l.moduleExports.Metadata;
        this.makeClientTransformer ? this.makeClientTransformer.metadataType = m : r.warning("Trying to set metadata type information before ClientTransformer has been initialized - tagging will not be available");
        this.patchServer(l.moduleExports);
      }
      "gRPC.client" === c.ruleKey && this.patchMakeClientCtr(l.moduleExports);
    }
    patchMakeClientCtr(l) {
      this.makeClientTransformer = new p.GrpcMakeClientCtrTransformer(this);
      l = new n.FunctionSpec("makeClientConstructor", "", l, n.AsyncTrackingMode.CallbackLast, "grpc");
      n.applyToSingle(l, this.makeClientTransformer);
    }
    patchServer(l) {
      const c = new p.GrpcRegisterTransformer(this, t.Agent.correlation.SensorId.NODEJS_GRPCJS);
      l = new n.FunctionSpec("register", "Server", l.Server.prototype);
      n.applyToSingle(l, c);
    }
  }
  a.GrpcSensor = k;
});
S("src/lib/transformer/GrpcManagedTransformer", "require exports src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/Logger src/lib/transformer/GrpcUtilities src/lib/transformer/TransformerBase".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.GrpcLoadPackageTransformer = void 0;
  class k extends p.TransformerBase {
    generateSubstitute(l) {
      const c = this;
      return function() {
        const m = c.isDebugEnabled;
        try {
          m && r.debug(".loadPackageSubstitute: calling original");
        } catch (e) {
          u.logAgentException(e);
        }
        const d = t.safeInvoke(this, l.origFn, arguments);
        try {
          m && r.debug(".loadPackageSubstitute: wrapping client instance functions"), n.GrpcUtilities.findAndPatchServiceClients(d.retVal, c.metadataType, c.controlParams, m);
        } catch (e) {
          u.logAgentException(e);
        }
        return d.rethrow();
      };
    }
  }
  a.GrpcLoadPackageTransformer = k;
});
S("src/lib/sensors/GrpcJsSensor", "require exports src/lib/sensors/SensorBase src/lib/Agent src/lib/Logger src/lib/Patch src/lib/transformer/GrpcTransformer src/lib/transformer/GrpcManagedTransformer src/lib/transformer/Http2ClientTransformer src/lib/transformer/Http2ServerTransformer".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.GrpcJsSensor = void 0;
  class m extends u.SensorBase {
    constructor() {
      super(...arguments);
      this.checkForSuppression = d => this.active ? d.toLowerCase().startsWith("application/grpc") : !1;
    }
    applyInstrumentation(d, e) {
      if ("Module.main" === e.ruleKey) {
        const b = d.moduleExports.Metadata;
        this.makeClientTransformer ? this.makeClientTransformer.metadataType = b : r.warning("Trying to set metadata type information before ClientTransformer has been initialized - tagging will not be available");
        this.loadPackageTransformer ? this.loadPackageTransformer.metadataType = b : r.warning("Trying to set metadata type information before LoadPackageTransformer has been initialized - tagging will not be available");
        this.patchServer(d.moduleExports);
        (0,l.addCheckForOutgoingRequestSuppression)(this.checkForSuppression);
        (0,c.addCheckForIncomingRequestSuppression)(this.checkForSuppression);
      }
      "GrpcJs.make-client" === e.ruleKey && (this.patchLoadPackageDefinition(d.moduleExports), this.patchMakeClientCtr(d.moduleExports));
    }
    patchMakeClientCtr(d) {
      this.makeClientTransformer = new p.GrpcMakeClientCtrTransformer(this);
      d = new n.FunctionSpec("makeClientConstructor", "", d, n.AsyncTrackingMode.CallbackLast, "grpc");
      n.applyToSingle(d, this.makeClientTransformer);
    }
    patchServer(d) {
      const e = new p.GrpcRegisterTransformer(this, t.Agent.correlation.SensorId.NODEJS_GRPCJS);
      d = new n.FunctionSpec("register", "Server", d.Server.prototype, "grpc");
      n.applyToSingle(d, e);
    }
    patchLoadPackageDefinition(d) {
      this.loadPackageTransformer = new k.GrpcLoadPackageTransformer(this);
      d = new n.FunctionSpec("loadPackageDefinition", "", d, n.AsyncTrackingMode.None, "grpc");
      n.applyToSingle(d, this.loadPackageTransformer);
    }
  }
  a.GrpcJsSensor = m;
});
S("src/lib/transformer/IORedisTracker", "require exports src/lib/Agent src/lib/AsyncTracker src/lib/AttachmentBase src/lib/CallbackWrappingHelper src/lib/Debug src/lib/Embedder src/lib/Logger src/lib/util/ErrorUtil src/lib/util/UniqueId src/lib/transformer/PromiseTransformerUtilities src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.IORedisEventTracker = a.IORedisPipelineTracker = a.IORedisTracker = void 0;
  class b extends t.AsyncTracker {
    constructor(f, q, w) {
      super(f, q);
      this.commandName = w;
      this.errorExtractor = n.errorFromFirstArg;
      this.hasPromiseHandled = !1;
      this.debug = f.controlParams.isDebugEnabled;
      this.id = m.UniqueId.getNext();
      this.isStreamCommand = this.isStream(w);
    }
    static hasTrackerEmbedded(f) {
      f = b.inProcessEmbedder.get(f);
      return null != f && f;
    }
    manipulateArguments(f) {
      var q, w = this.debug;
      if (0 !== (f ? f.length : 0)) {
        const G = f[0];
        b.inProcessEmbedder.set(G, !0);
        w && (w = this.asyncActivation, p.assert(null != w, "asyncActivation should already be defined!"), this.isStreamCommand ? l.debug(`${this} | command is stream command! hasCallback=[${this.hasCallback}] coHasCallback=[${null != G.callback}]`) : this.hasCallback ? l.debug(`${this} | command has callback!`) : d.PromiseTransformerUtilities.isActuallyAPromise(G.promise) && l.debug(`${this} | command uses promise!`), l.debug(`${this} | vNode=${w.vNodeActivation.spc} | init=${null === (q = w.initiatorActivation) || 
        void 0 === q ? void 0 : q.spc}`));
      }
      return f;
    }
    createAttachments(f) {
      try {
        if (this.attachment = new r.AttachmentBase(f, u.Agent.correlation.AttachmentId.EXTERNAL_CALL_ID, 0), this.attachment.valid) {
          this.debug && l.debug(`${this} | creating external call attachment, connectionOptionsSet=${null != this.connectionOptions}`);
          const q = u.Agent.correlation.AttachmentFieldId;
          this.fillConnectionOptions(q);
          this.attachment.setStringCached(q.EXTERNALCALL_OPERATION_NAME_ID, this.commandName);
          this.attachment.attachment.setFieldInteger(q.EXTERNALCALL_CALL_TYPE_ID, u.Agent.correlation.ExternalCallType.REDIS);
        } else {
          this.debug && l.debug(`${this} | skip setting data on invalid attachment`);
        }
      } catch (q) {
        c.logAgentException(q);
      }
    }
    updateConnectionOptions() {
      var f;
      (null === (f = this.attachment) || void 0 === f ? 0 : f.valid) && this.fillConnectionOptions(u.Agent.correlation.AttachmentFieldId);
    }
    toString() {
      this.prefix || (this.prefix = `IORedis#${this.id}`);
      return this.prefix;
    }
    static embedTracker(f, q) {
      if (q.debug && this.hasTracker(f)) {
        throw Error(`${q} | tried to replace exisiting tracker!`);
      }
      return this.trackerEmbedder.set(f, q);
    }
    static hasTracker(f) {
      return this.trackerEmbedder.hasData(f);
    }
    static getTracker(f) {
      return this.trackerEmbedder.get(f);
    }
    static removeTracker(f) {
      const q = this.trackerEmbedder.get(f);
      this.trackerEmbedder.unlink(f);
      return q;
    }
    get virtualNodeActivation() {
      return this.vNode;
    }
    get vNode() {
      var f;
      return null === (f = this.asyncActivation) || void 0 === f ? void 0 : f.vNodeActivation;
    }
    get hasVnodeSet() {
      return null != this.vNode;
    }
    isStream(f) {
      return "scan sscan hscan zscan scanBuffer sscanBuffer hscanBuffer zscanBuffer".split(" ").includes(f);
    }
    fillConnectionOptions(f) {
      var q, w;
      this.attachment.setStringCachedOrUnavailable(f.EXTERNALCALL_HOSTNAME_ID, null === (q = this.connectionOptions) || void 0 === q ? void 0 : q.host);
      "number" === typeof(null === (w = this.connectionOptions) || void 0 === w ? void 0 : w.port) && this.attachment.attachment.setFieldInteger(f.EXTERNALCALL_PORTNO_ID, this.connectionOptions.port);
    }
  }
  b.inProcessEmbedder = k.create("ioredis_inProcess");
  b.trackerEmbedder = k.create("ioredis_tracker");
  a.IORedisTracker = b;
  class g extends b {
    manipulateArguments(f) {
      null != f[0] && ("function" === typeof f[0] ? null == this.spc && "exec" !== this.commandName ? (this.debug && l.debug(`${this} | cmd=${this.commandName} has no spc set, but wants to do context passing!`), p.fail()) : (this.origCb = f[0], f[0] = e.ContextManager.bindToCurrentContext(n.CallbackWrappingHelper.wrapCallbackEndVNode(this)), this.debug && l.debug(`${this} | wrapped cb for cmd=${this.commandName}`)) : this.debug && l.debug(`${this} | arg[0] is not a function`));
      return f;
    }
    static embedPipelineTracker(f, q) {
      if (q.debug && g.hasPipelineTracker(f)) {
        throw Error(`${q} | tried to overwrite exising tracker`);
      }
      return g.pipelineTrackerEmbedder.set(f, q);
    }
    static getPipelineTracker(f) {
      return g.pipelineTrackerEmbedder.get(f);
    }
    static hasPipelineTracker(f) {
      return g.pipelineTrackerEmbedder.hasData(f);
    }
  }
  g.pipelineTrackerEmbedder = k.create("ioredis_pipelinetracker");
  a.IORedisPipelineTracker = g;
  class h {
    constructor(f, q) {
      this.spc = f;
      this.debug = q;
      this.id = m.UniqueId.getNext();
    }
    static embedTracker(f, q) {
      if (q.debug && this.hasTracker(f)) {
        throw Error(`${q} | tried to replace exisiting tracker!`);
      }
      return this.trackerEmbedder.set(f, q);
    }
    static hasTracker(f) {
      return this.trackerEmbedder.hasData(f);
    }
    static getTracker(f) {
      return this.trackerEmbedder.get(f);
    }
    toString() {
      this.prefix || (this.prefix = `IORedis#${this.id}`);
      return this.prefix;
    }
  }
  h.trackerEmbedder = k.create("ioredisEventTracker");
  a.IORedisEventTracker = h;
});
S("src/lib/transformer/IORedisTransformer", "require exports util src/lib/Agent src/lib/FunctionId src/lib/Logger src/lib/SubPathContext src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/transformer/AsyncTransformerBase src/lib/transformer/EventEmitterTransformerBase src/lib/transformer/IORedisTracker src/lib/transformer/PromiseTransformerUtilities src/lib/transformer/TransformerBase src/lib/contextmanager/ContextManager src/lib/CallbackWrappingHelper".split(" "), function(O, 
a, u, t, r, n, p, k, l, c, m, d, e, b, g, h, f) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.IORedisSilentEmitErrorsTransformer = a.IORedisSpcFromTrackerTransformer = a.IORedisStreamEventTransformer = a.IORedisStreamTransformer = a.IORedisPipelineDiscardTransformer = a.IORedisFillResultTransformer = a.IORedisMultiExecTransformer = a.IORedisTransactionMultiTransformer = a.IORedisTransactionSupportTransformer = a.IORedisPipelineTransformer = a.IORedisCommandTransformer = a.IORedisSendCommandTransformer = a.IORedisTransformer = void 0;
  class q extends m.AsyncTransformerBase {
    wrapReturnValue(I, H) {
      if (b.PromiseTransformerUtilities.isActuallyAPromise(H.retVal) && !H.didThrow && !I.hasCallback) {
        const F = I.debug, K = this;
        H = H.retVal;
        F && n.debug(`${I} | wrapping returned promise`);
        return c.SafeInvokeRetVal.makeRetVal(b.PromiseTransformerUtilities.wrapPromise(H, function(L, M) {
          return function(N) {
            return K.handleThenCall(this, I, L, N, M, arguments, F);
          };
        }));
      }
      return H;
    }
    wrapCallback(I) {
      return f.CallbackWrappingHelper.wrapCallbackEndVNode(I);
    }
    getConnectionOptions(I) {
      if (k.hasProperty(I.connector, "options", "host") || k.hasProperty(I.connector, "options", "port")) {
        return {host:I.connector.options.host, port:I.connector.options.port};
      }
      if (k.hasProperty(I, "options", "host") || k.hasProperty(I, "options", "port")) {
        return {host:I.options.host, port:I.options.port};
      }
      this.isDebugEnabled && n.debug(`IORedisTransformer | could not get connection options! ${u.inspect(I)}`);
    }
    handleThenCall(I, H, F, K, L, M) {
      const N = (new g.FunctionRunConfig()).chain((0,g.tryFunction)(P => {
        null != H && null != H.vNode && (this.debugLogger(() => `${H} | enter handleThenCall, isCatch=${F}`), H.hasPromiseHandled ? null != H.asyncActivation && this.debugLogger(() => `${H} | asyncActSPC=${H.asyncActivation.initialSpc} activated`) : H.isStreamCommand ? this.debugLogger(() => {
          var Q;
          return `${H} | passed through handleThenCall, event has to close vNode=${H.vNode} and spc=${null === (Q = H.vNode) || void 0 === Q ? void 0 : Q.spc}`;
        }) : H.vNode.isExited ? H.hasPromiseHandled = !0 : (H.vNode.exitOrException(F ? K : void 0), H.vNode.spc.end(), this.debugLogger(() => {
          var Q;
          return `${H} | closing vNode=${H.vNode} and ending spc=${null === (Q = H.vNode) || void 0 === Q ? void 0 : Q.spc} in handleThenCall`;
        })));
        return P;
      })).addToErrorHandler(this.onResultWithLog(() => `${H} | exit handleThenCall, didThrow)`)).addToSuccessHandler(this.onResultWithLog(() => `${H} | exit handleThenCall, did not Throw)`));
      return this.runFunctionInContext(N, L, I, ...M);
    }
  }
  a.IORedisTransformer = q;
  class w extends q {
    generateSubstitute(I) {
      const H = this, F = H.debugLogger.bind(this), K = new r.FunctionId(I);
      return function(L, ...M) {
        let N = H.onResultWithLog(() => "sendCommand default after hook error"), P = H.onResultWithLog(() => "sendCommand default after hook success"), Q = arguments;
        const R = (new g.FunctionRunConfig()).chain((0,g.bailIf)(!H.controlParams.active, "IORedis sensor is inactive", H)).chain((0,g.tryFunction)(T => {
          let U;
          const V = H.getTrackerObject(this, L);
          null == V || V.hasVnodeSet ? null != V && null == V.connectionOptions && (V.connectionOptions = H.getConnectionOptions(this), F(`${V} | sendCommand, cmd=${V.commandName}, isClusterPipeline=${this.isCluster}, update connectionOptions ${null != V.connectionOptions}`), null != V.connectionOptions && V.updateConnectionOptions()) : (this.isCluster || (V.connectionOptions = H.getConnectionOptions(this)), V.injectedCallback = V.isStreamCommand, U = H.tryStartAsyncActivation({sensorId:t.Agent.correlation.SensorId.NODEJS_IOREDIS, 
          functionId:K, attachmentCreator:V, vPathOption:1, createInitiatorNode:!1}), null != U && (V.asyncActivation = U, T = T.setValue(h.CurrentSPC, U.vNodeActivation.spc), Q = V.manipulateArguments(Q), N = (0,g.pipe)(N, Z => {
            F(() => "endActivationError");
            U.initialActivation.methodException(Z);
            U.initialSpc.end();
            F(() => `${V} | closed vNode=${U.vNodeActivation} on spc=${U.vNodeActivation.spc}`);
            return Z;
          }), P = (0,g.pipe)(P, Z => {
            F(() => "endActivationSuccess");
            return H.wrapReturnValue(V, Z);
          }), H.isDebugEnabled && F(`${V} | sendCommand, argCnt=${Q.length}, cmd=${V.commandName}, hasCommandObjectCallback=${"function" === typeof L.callback}, isClusterPipeline=${this.isCluster}, ` + `hasTrackerCallback=${V.hasCallback}, wrappedCb=${null != V.origCb}, ` + `opened asyncActivation(async)=${U.vNodeActivation} on spc=${U.initialSpc}`)));
          return T;
        })).addToErrorHandler(N).addToSuccessHandler(P);
        return H.runFunctionInContext(R, I.origFn, this, L, ...M);
      };
    }
    getTrackerObject(I, H) {
      return !e.IORedisPipelineTracker.hasPipelineTracker(I) || "exec" !== H.name && "discard" !== H.name ? e.IORedisTracker.getTracker(H) : (e.IORedisTracker.removeTracker(H), e.IORedisPipelineTracker.getPipelineTracker(I));
    }
  }
  a.IORedisSendCommandTransformer = w;
  class G extends q {
    generateSubstitute(I) {
      const H = this, F = this.debugLogger.bind(this);
      return function(...K) {
        const L = (new g.FunctionRunConfig()).chain((0,g.bailIf)(!H.controlParams.active, "IORedis sensor is inactive", H)).chain((0,g.tryFunction)(M => {
          if (!e.IORedisTracker.hasTracker(this)) {
            const N = this.callback, P = new e.IORedisTracker(H, I, this.name);
            "function" !== typeof N || P.isStreamCommand || (P.origCb = N, this.callback = f.CallbackWrappingHelper.wrapCallbackEndVNode(P));
            F(() => `${P} | initPromise embedded tracker in command=${P.commandName}, hasCb: ${"function" === typeof N}`);
            e.IORedisTracker.embedTracker(this, P);
          } else {
            if (H.isDebugEnabled) {
              const N = e.IORedisTracker.getTracker(this);
              n.debug(`${N} | initPromise command=${N.commandName}, tracker already present`);
            }
          }
          return M;
        }));
        return H.runFunction(L, I.origFn, this, ...K);
      };
    }
  }
  a.IORedisCommandTransformer = G;
  class y extends q {
    generateSubstitute(I) {
      const H = this, F = new r.FunctionId(I), K = this.debugLogger.bind(this);
      return function() {
        let L = arguments, M, N = e.IORedisPipelineTracker.getPipelineTracker(this);
        const P = g.TransformerBase.emptyRunConfig();
        P.chain((0,g.bailIf)(!H.controlParams.active, "IORedis sensor is inactive", H)).chain((0,g.tryFunction)(Q => {
          0 !== this._transactions || null != N && N.hasVnodeSet || (N = null != N ? N : new e.IORedisPipelineTracker(H, I, "exec"), this.isCluster || (N.connectionOptions = H.getConnectionOptions(this)), M = H.tryStartAsyncActivation({sensorId:t.Agent.correlation.SensorId.NODEJS_IOREDIS, functionId:F, attachmentCreator:N, vPathOption:1, createInitiatorNode:!1}), e.IORedisPipelineTracker.embedPipelineTracker(this, N), null != M && (Q = Q.setValue(h.CurrentSPC, M.initialSpc), N.spc = M.initialSpc, 
          N.asyncActivation = M, L = N.manipulateArguments(L), P.addToSuccessHandler(R => {
            H.wrapReturnValue(N, R);
            return R;
          }), P.addToErrorHandler(R => {
            M.vNodeActivation.exitOrException(R);
            M.vNodeActivation.spc.end();
            K(() => `${N} | exec closed vNode=${null === M || void 0 === M ? void 0 : M.vNodeActivation} on spc=${null === M || void 0 === M ? void 0 : M.vNodeActivation.spc} in pipeline exec`);
            return R;
          }), K(() => `${N} | exec opened asyncActivation=${M.initialActivation} on spc=${M.initialSpc} in pipeline exec`)));
          return Q;
        }));
        return H.runFunctionInContext(P, I.origFn, this, ...L);
      };
    }
  }
  a.IORedisPipelineTransformer = y;
  class D extends q {
    constructor(I) {
      super(I);
      this.sensor = I;
    }
    generateSubstitute(I) {
      const H = this, F = this.debugLogger.bind(this);
      return function(...K) {
        return H.runFunction((new g.FunctionRunConfig()).addToSuccessHandler(L => {
          try {
            if (!H.controlParams.active) {
              return F("IORedis sensor is inactive"), L;
            }
            F("Transaction support intercepted...");
            const M = arguments[0];
            k.hasProperty(M, "multi") ? null == H.sensor.patchTransactionMultiCommand(M) && F(() => `${this} | could not patch 'Redis'`) : F("Transaction return value does not have property 'multi'!");
            k.hasProperty(M, "exec") ? null == H.sensor.patchTransactionExecCommand(M, "PipelineMonkeyPatch") && F(() => `${this} | could not patch '${"PipelineMonkeyPatch"}'`) : F("Transaction return value does not have property 'multi'!");
          } catch (M) {
            l.logAgentException(M);
          }
          return L;
        }), I.origFn, this, ...K);
      };
    }
  }
  a.IORedisTransactionSupportTransformer = D;
  class J extends q {
    constructor(I) {
      super(I);
      this.sensor = I;
    }
    generateSubstitute(I) {
      const H = this, F = this.debugLogger.bind(this);
      return function(...K) {
        F("Transaction::multi entered");
        return H.runFunction((new g.FunctionRunConfig()).addToSuccessHandler(L => {
          try {
            if (!H.controlParams.active) {
              return F("IORedis sensor is inactive"), L;
            }
            const M = b.PromiseTransformerUtilities.isActuallyAPromise(L.retVal);
            F(`Transaction::multi exited | isPromise=${M}`);
            if (M) {
              F("Multi returned a promise");
            } else {
              const N = L.retVal;
              k.hasProperty(N, "exec") ? H.sensor.patchTransactionExecCommand(N, "multi") : F("Transaction return value does not have property 'multi'!");
            }
          } catch (M) {
            l.logAgentException(M);
          }
          return L;
        }), I.origFn, this, ...K);
      };
    }
  }
  a.IORedisTransactionMultiTransformer = J;
  class B extends q {
    generateSubstitute(I) {
      const H = this;
      return function(F) {
        let K = arguments, L = e.IORedisPipelineTracker.getPipelineTracker(this);
        const M = H.controlParams.isDebugEnabled, N = g.TransformerBase.emptyRunConfig();
        N.chain((0,g.bailIf)(!H.controlParams.active, "IORedis sensor is inactive", H)).chain((0,g.tryFunction)(P => {
          if (null == L) {
            L = new e.IORedisPipelineTracker(H, I, "exec");
            K = L.manipulateArguments(K);
            e.IORedisPipelineTracker.embedPipelineTracker(this, L);
            const Q = () => {
              M && k.hasSingleProperty(this, "_queue") && this._queue.forEach(R => {
                R = e.IORedisTracker.getTracker(R);
                null != R && null == R.vNode && n.debug(`${L} | ${R} has no vNode, cmd=${R.commandName}`);
              });
            };
            N.addToErrorHandler(R => {
              Q();
              return R;
            });
            N.addToSuccessHandler(R => {
              Q();
              return null != L ? H.wrapReturnValue(L, R) : R;
            });
          }
          return P;
        }));
        return H.runFunction(N, I.origFn, this, ...K);
      };
    }
  }
  a.IORedisMultiExecTransformer = B;
  class v extends q {
    generateSubstitute(I) {
      const H = this, F = this.debugLogger.bind(this);
      return function(K, L, ...M) {
        F(() => "IORedis | enter pipeline fill result");
        let N;
        var P = () => {
          null != (null === N || void 0 === N ? void 0 : N.vNode) && N.vNode.isExited && N.vNode.spc.open && (N.vNode.spc.end(), F(() => `${N} | ending spc=${N.vNode.spc}`));
          F(() => `${N} | exited pipeline fill result`);
        };
        P = (new g.FunctionRunConfig()).chain((0,g.bailIf)(!H.controlParams.active, "IORedis sensor is inactive", H)).chain((0,g.tryFunction)(Q => {
          N = e.IORedisTracker.getTracker(this._queue[L]);
          if (null != N) {
            if (null == N.vNode || N.vNode.isExited || N.hasCallback) {
              N.hasCallback ? F(() => `${N} | is passed through fill result`) : F(() => `${N} | cmd=${N.commandName}, hasVNode=${null != N.vNode}, hasCallback=${N.hasCallback}}`);
            } else {
              const R = K[0];
              F(() => `${N} | closed asyncactivation=${N.vNode} on spc=${N.vNode.spc} in fillResult, has error=${null != R}`);
              N.vNode.exitOrException(R);
            }
          }
          return Q;
        })).addToErrorHandler(H.onResultWithAction(P)).addToSuccessHandler(H.onResultWithAction(P));
        return H.runFunction(P, I.origFn, this, K, L, ...M);
      };
    }
  }
  a.IORedisFillResultTransformer = v;
  class z extends q {
    generateSubstitute(I) {
      const H = this, F = this.debugLogger.bind(this);
      return function(K) {
        var L = () => {
          const M = this._queue;
          if (null != M) {
            for (const N of M) {
              const P = e.IORedisTracker.getTracker(N);
              null != P && (F(() => `"DISCARDED_TRACKER" | discarded command: ${P.commandName}`), null != P.vNode && (P.vNode.exit(), P.vNode.spc.end()));
            }
          }
          F(() => "exited pipeline discard");
        };
        L = (new g.FunctionRunConfig()).chain((0,g.bailIf)(!H.controlParams.active, "IORedis sensor is inactive", H)).addToErrorHandler(H.onResultWithAction(L)).addToSuccessHandler(H.onResultWithAction(L));
        F(() => "entered pipeline discard");
        return H.runFunction(L, I.origFn, this, K);
      };
    }
  }
  a.IORedisPipelineDiscardTransformer = z;
  class x extends q {
    generateSubstitute(I) {
      const H = this, F = this.debugLogger.bind(this);
      return function(...K) {
        return H.runFunction((new g.FunctionRunConfig()).addToSuccessHandler(L => {
          const M = p.SubPathContext.getActiveContext();
          if (H.controlParams.active) {
            if (null != M) {
              const N = new e.IORedisEventTracker(M, H.controlParams.isDebugEnabled);
              e.IORedisEventTracker.embedTracker(L.retVal, N);
              F(() => `${N} | embedded into ScanStream`);
            } else {
              F(() => "=== | tried to embed EventTracker but SPC was undefined");
            }
          }
          return L;
        }), I.origFn, this, ...K);
      };
    }
  }
  a.IORedisStreamTransformer = x;
  class A extends d.EventEmitterTransformerBase {
    getWrappedListener(I, H, F) {
      const K = e.IORedisEventTracker.getTracker(I);
      if (null == K) {
        return F;
      }
      const L = d.EventEmitterTransformerBase.getUnwrappedListener(F), M = this;
      return function(...N) {
        M.debugLogger(() => `${K} | entered ${H.toString()} event, argCnt=${N.length}, has spc=${K.spc}, isOpen=${K.spc.open}`);
        const P = g.TransformerBase.emptyRunConfig();
        P.chain((0,g.tryFunction)(Q => {
          const R = K.asyncActivationResult;
          if (null != R) {
            R.vNodeActivation.isExited || (M.debugLogger(() => `${K} | closing vNode=${R.vNodeActivation} on spc=${R.vNodeActivation.spc}`), R.vNodeActivation.exit());
            const T = () => {
              if ("end" === H) {
                const U = R.vNodeActivation.spc;
                M.debugLogger(() => `${K} | ending spc=${U}`);
                U.end();
              }
            };
            P.addToErrorHandler(U => {
              M.debugLogger(() => `${K} | ${H.toString()} event handled. Error occured: ${U}`);
              T();
              return U;
            });
            P.addToSuccessHandler(U => {
              M.debugLogger(() => `${K} | ${H.toString()} event handled. Success`);
              T();
              return U;
            });
          }
          return Q;
        }));
        return M.runFunction(P, L, I, ...N);
      };
    }
    shallWrap(I, H) {
      return e.IORedisEventTracker.hasTracker(I) && ["data", "end"].includes(H.toString());
    }
  }
  a.IORedisStreamEventTransformer = A;
  class C extends q {
    generateSubstitute(I) {
      const H = this;
      return function() {
        const F = H.controlParams.isDebugEnabled;
        if (!H.controlParams.active) {
          return c.doInvoke(this, I.origFn, arguments);
        }
        let K;
        try {
          K = e.IORedisEventTracker.getTracker(this), null != K && F && n.debug(`${K} | pushing spc of ${K.spc} on top, isOpen=${K.spc.open}`);
        } catch (M) {
          l.logAgentException(M);
        }
        const L = c.safeInvoke(this, I.origFn, arguments);
        try {
          if (null != K) {
            F && n.debug(`${K} | popping spc=${K.spc} from top`);
            const M = H.getLastIssuedScanCommand(this), N = H.getCommandAsyncResult(M);
            null != N && (K.asyncActivationResult = N);
            F && n.debug(`${K} | got last scan command=[${M}], got asyncResult=${null != N ? N : void 0}`);
          }
        } catch (M) {
          l.logAgentException(M);
        }
        return L.rethrow();
      };
    }
    getCommandAsyncResult(I) {
      let H;
      null != I && (I = e.IORedisTracker.getTracker(I), null != I && (H = I.asyncActivation));
      return H;
    }
    getLastIssuedScanCommand(I) {
      I = I.opt.redis;
      let H = this.findLatestScanCommand(I.offlineQueue);
      null == H && (H = this.findLatestScanCommand(I.commandQueue));
      return H;
    }
    findLatestScanCommand(I) {
      let H;
      if (null != I) {
        let F = Math.min(I.length - 1, 100000);
        for (this.controlParams.isDebugEnabled && 100000 === F && n.debug(` IORedis | Encountered queue with ${I.length} elements`); 0 <= F; F--) {
          const K = I.peekAt(F);
          if (null != K && "scan" === K.command.name) {
            H = K.command;
            break;
          }
        }
      }
      return H;
    }
  }
  a.IORedisSpcFromTrackerTransformer = C;
  class E extends q {
    generateSubstitute(I) {
      const H = this;
      return function(F, K) {
        var L;
        if (!H.controlParams.active) {
          return c.doInvoke(this, I.origFn, arguments);
        }
        const M = H.controlParams.isDebugEnabled;
        try {
          if (M && n.debug(`Entered silent emit for evnt=${F.toString()}`), "error" === F) {
            const [N, P] = H.getQueue(this);
            if (M) {
              const Q = H.isLastRetry(this), R = null !== (L = null === N || void 0 === N ? void 0 : N.length) && void 0 !== L ? L : "undefined queue";
              n.debug(`=== | deque name=${P} length=${R}, isLastRetry=${Q}, error=[${K}]`);
            }
            null != N && H.endAllSubPathsBecauseOfError(N, K);
          }
        } catch (N) {
          l.logAgentException(N);
        }
        return c.doInvoke(this, I.origFn, arguments);
      };
    }
    endAllSubPathsBecauseOfError(I, H) {
      for (let K = 0; K < I.length; K++) {
        var F = I.peekAt(K);
        null != F && (F = e.IORedisTracker.getTracker(F.command), null == (null === F || void 0 === F ? void 0 : F.vNode) || F.vNode.isExited || (this.controlParams.isDebugEnabled && n.debug(`${F} | cmd=[${F.commandName}] ended vNode=[${F.vNode}] @SPC=[${F.vNode.spc}] with exception=[${H}]`), F.vNode.exitOrException(H), F.vNode.spc.end()));
      }
    }
    getQueue(I) {
      return k.hasProperty(I, "commandQueue") ? [I.commandQueue, "commandQueue"] : k.hasProperty(I, "offlineQueue") ? [I.offlineQueue, "offlineQueue"] : [void 0, "undefined"];
    }
    isLastRetry(I) {
      return k.hasProperty(I, "options", "maxRetriesPerRequest") ? I.options.maxRetriesPerRequest === I.retryAttempts : k.hasProperty(I, "redisOptions", "maxRetriesPerRequest") ? I.redisOptions.maxRetriesPerRequest === I.retryAttempts : !1;
    }
  }
  a.IORedisSilentEmitErrorsTransformer = E;
});
S("src/lib/sensors/IORedisSensor", "require exports src/lib/Debug src/lib/Logger src/lib/Patch src/lib/sensors/SensorBase src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/SemverUtil src/lib/transformer/IORedisTransformer".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.IORedisSensor = void 0;
  class m extends n.SensorBase {
    applyInstrumentation(d, e) {
      const b = this.isDebugEnabled;
      var g = d.moduleInfo.version;
      null == this.isSupportedVersion && (this.isSupportedVersion = l.satisfies(g, ">=4.0.0"), this.isPreTypeScript = l.satisfies(g, "<=4.2.1"), this.isSupportedVersion || t.info(`Found unsupported version of ${this.name}. Support starts with version ${"4.0.0"}, but is ${g}!`), b && t.debug(`Found version ${"ioredis"} module: ${g}, sensor is ${this.active ? "en" : "dis"}abled`));
      if (this.isSupportedVersion) {
        if ("Module.main" === e.ruleKey) {
          b && t.debug(`IORedis (${d.request}) requested.`);
          var h = new c.IORedisSendCommandTransformer(this), f = new r.FunctionSpec("sendCommand", "IORedis", d.moduleExports.prototype, r.AsyncTrackingMode.CallbackLastOrPromise, "ioredis");
          h = r.applyToSingle(f, h);
          this.printPatchState(g, h);
          h = new c.IORedisStreamTransformer(this);
          f = new r.FunctionSpec("scanStream", "IORedis", d.moduleExports.prototype);
          h = r.applyToSingle(f, h);
          this.printPatchState(g, h);
          h = new c.IORedisSilentEmitErrorsTransformer(this);
          f = new r.FunctionSpec("silentEmit", "IORedis", d.moduleExports.prototype, r.AsyncTrackingMode.None);
          h = r.applyToSingle(f, h);
          this.printPatchState(g, h);
        }
        "IORedis.command" === e.ruleKey && (b && t.debug(`IORedis (${d.request}) requested.`), h = new c.IORedisCommandTransformer(this), f = new r.FunctionSpec("initPromise", "Command", this.isPreTypeScript ? d.moduleExports.prototype : d.moduleExports.default.prototype, void 0, "ioredis"), h = r.applyToSingle(f, h), this.printPatchState(g, h));
        if ("IORedis.pipeline" === e.ruleKey) {
          b && t.debug(`IORedis (${d.request}) requested.`);
          h = l.satisfies(g, "<4.7.0") ? d.moduleExports.prototype : d.moduleExports.default.prototype;
          f = new c.IORedisPipelineTransformer(this);
          var q = new r.FunctionSpec("exec", "Pipeline", h, r.AsyncTrackingMode.CallbackLast, "ioredis");
          f = r.applyToSingle(q, f);
          this.printPatchState(g, f);
          f = new c.IORedisPipelineDiscardTransformer(this);
          q = new r.FunctionSpec("discard", "Pipeline", h, r.AsyncTrackingMode.CallbackLast, "ioredis");
          f = r.applyToSingle(q, f, r.cPolymorphicDefaultOptions);
          this.printPatchState(g, f);
          f = new c.IORedisFillResultTransformer(this);
          q = new r.FunctionSpec("fillResult", "Pipeline", h, r.AsyncTrackingMode.CallbackLast, "ioredis");
          f = r.applyToSingle(q, f);
          this.printPatchState(g, f);
          f = new c.IORedisSendCommandTransformer(this);
          h = new r.FunctionSpec("sendCommand", "Pipeline", h, r.AsyncTrackingMode.CallbackLastOrPromise, "ioredis");
          h = r.applyToSingle(h, f);
          this.printPatchState(g, h);
        }
        "IORedis.transaction" === e.ruleKey && (b && t.debug(`IORedis (${d.request}) requested.`), h = new c.IORedisTransactionSupportTransformer(this), f = new r.FunctionSpec("addTransactionSupport", "transaction", d.moduleExports, void 0, "ioredis"), h = r.applyToSingle(f, h), this.printPatchState(g, h));
        "IORedis.ScanStream" === e.ruleKey && (e = new c.IORedisSpcFromTrackerTransformer(this), h = new r.FunctionSpec("_read", "ScanStream", d.moduleExports.default.prototype, r.AsyncTrackingMode.None, "ioredis"), e = r.applyToSingle(h, e), this.printPatchState(g, e), g = new c.IORedisStreamEventTransformer(this, ["data", "end"]), d = new r.FunctionSpec("Readable", "ScanStream", d.moduleExports.default.prototype, r.AsyncTrackingMode.None, "ioredis"), g.applyTransformation(d), b && t.debug("      event emitter"));
      }
    }
    patchTransactionMultiCommand(d) {
      if (p.hasProperty(d, "multi")) {
        var e = new c.IORedisTransactionMultiTransformer(this);
        d = new r.FunctionSpec("multi", "Redis", d, void 0, "ioredis");
        e = r.applyToSingle(d, e);
        this.printPatchState(void 0, e);
        return e;
      }
      t.warning("IORedisSensor | could not find property multi");
      k.reportInstrumentationError(this, "can not find property 'multi' on transaction script return value!");
    }
    patchTransactionExecCommand(d, e) {
      if (p.hasProperty(d, "exec")) {
        var b = new c.IORedisMultiExecTransformer(this);
        d = new r.FunctionSpec("exec", e, d, r.AsyncTrackingMode.CallbackLastOrPromise, "ioredis");
        b = r.applyToSingle(d, b);
        this.printPatchState(void 0, b);
        return b;
      }
      t.warning("IORedisSensor | could not find property exec");
      k.reportInstrumentationError(this, "can not find property 'exec' on transaction script return value!");
    }
    printPatchState(d, e) {
      null == e ? (t.warning(`Failed to patch IORedis version: ${d}`), k.reportInstrumentationError(this, `failed to patch ioredis version ${d}`), u.fail(`failing for ${d}`)) : this.isDebugEnabled && t.debug(`      patched ${e.qualifiedName}`);
    }
  }
  a.IORedisSensor = m;
});
S("src/lib/transformer/MSSqlTracker", "require exports src/lib/Agent src/lib/AttachmentBase src/lib/CallbackWrappingHelper src/lib/Embedder src/lib/util/CoreUtil src/lib/util/UniqueId".split(" "), function(O, a, u, t, r, n, p, k) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MSSqlSqlAttachment = a.MSSqlConnectionPoolAttachment = a.MSSqlTracker = a.DATABASE_TYPE = void 0;
  a.DATABASE_TYPE = "SQL Server";
  class l {
    constructor(d, e) {
      this.transformer = d;
      this.request = e;
      this.hasPromiseHandled = this.usesPromise = this.injectedCallback = !1;
      this.errorExtractor = r.errorFromFirstArg;
      this.debug = d.controlParams.isDebugEnabled;
      this.id = k.UniqueId.getNext();
    }
    manipulateArguments(d) {
      "function" === typeof d[d.length - 1] ? (this.origCb = d[d.length - 1], d[d.length - 1] = this.transformer.wrapCallback(this), this.debug && u.Logger.debug(`${this}: manipulating arguments`)) : this.usesPromise = !0;
      return d;
    }
    createAttachments(d) {
      this.connectionPoolAttachment = new c(d);
      this.fillEntryData();
    }
    fillExitData(d) {
      if (null == this.sqlAttachment && null != this.virtualNodeActivation) {
        this.debug && u.Logger.debug(`${this}: filling exit attachments`);
        let e;
        if (null != d) {
          if (null != d.rowsAffected && 0 < d.rowsAffected.length) {
            e = 0;
            for (const b of d.rowsAffected) {
              e += b;
            }
          } else {
            "number" === typeof d.rowsAffected && (e = d.rowsAffected);
          }
        }
        null != this.request._currentRequest && (d = this.request._currentRequest.parametersByName, "string" === typeof d ? this.fillMSSqlAttachment(d, e) : p.hasProperty(d, "statement", "value") && "string" === typeof d.statement.value ? this.fillMSSqlAttachment(d.statement.value, e) : "string" === typeof this.request._currentRequest.sqlTextOrProcedure && this.fillMSSqlAttachment(this.request._currentRequest.sqlTextOrProcedure, e));
      } else {
        this.debug && u.Logger.debug(`${this}: not filling exit attachment (sqlAtt=${null == this.sqlAttachment}, vNode=${null == this.virtualNodeActivation})`);
      }
    }
    embed(d) {
      const e = l.embedder.get(d);
      l.embedder.set(d, this);
      return e;
    }
    toString() {
      this.prefix || (this.prefix = `MSSql#${this.id}`);
      return this.prefix;
    }
    static get(d) {
      return this.embedder.get(d);
    }
    fillEntryData() {
      null != this.connectionPoolAttachment && (this.debug && u.Logger.debug(`${this}: filling entry attachments`), this.connectionPoolAttachment.fillConn(this.getMSSqlData()));
    }
    hasInstanceNameSet() {
      return null != this.getMSSqlData().instanceName;
    }
    getMSSqlData() {
      return p.hasProperty(this.request.parent, "config") ? this.request.parent.config : p.hasProperty(this.request.parent, "parent", "config") ? this.request.parent.parent.config : {};
    }
    fillMSSqlAttachment(d, e) {
      null == this.sqlAttachment && null != this.virtualNodeActivation && (this.sqlAttachment = new m(this.virtualNodeActivation), this.sqlAttachment.fillExitData(d, e));
    }
  }
  l.embedder = n.create("mssqlTracker");
  a.MSSqlTracker = l;
  class c extends t.AttachmentBase {
    constructor(d) {
      super(d, u.Agent.correlation.AttachmentId.CONNECTION_POOL_ID, 1);
    }
    fillConn(d) {
      const e = u.Agent.correlation.AttachmentFieldId;
      this.setMultipleFields(b => {
        b.stringCachedOrUnavailable(e.CONNECTION_POOL_DB, d.database);
        b.stringCachedOrUnavailable(e.CONNECTION_POOL_DBHOST, d.server);
        b.stringCached(e.CONNECTION_POOL_DBTYPE, a.DATABASE_TYPE);
        b.stringCachedOrUnavailable(e.CONNECTION_POOL_INSTANCENAME, d.instanceName);
        null != d.port && b.integer(e.CONNECTION_POOL_DBPORTNO, d.port);
        b.integer(e.CONNECTION_POOL_AGGREGATION_MECHANISM, u.Agent.correlation.DbAggregationMechanism.DB_AGGREGATION_MECHANISM_UNDEFINED);
      });
    }
  }
  a.MSSqlConnectionPoolAttachment = c;
  class m extends t.AttachmentBase {
    constructor(d) {
      super(d, u.Agent.correlation.AttachmentId.SQL_ID, 0);
    }
    fillExitData(d, e) {
      null != e && this.attachment.setFieldInteger(u.Agent.correlation.AttachmentFieldId.SQL_NUM_ROWS_RETURNED, e);
      this.setString(u.Agent.correlation.AttachmentFieldId.SQL_STATEMENT, d, u.Configuration.maxSqlStringLen);
    }
  }
  a.MSSqlSqlAttachment = m;
});
S("src/lib/transformer/TediousTransformer", "require exports src/lib/Agent src/lib/FunctionId src/lib/util/InvocationUtil src/lib/transformer/TediousTracker src/lib/transformer/TransformerBase src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n, p, k) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.TediousTransformer = void 0;
  class l extends p.TransformerBase {
    constructor(c, m) {
      super(c);
      this.callbackProperty = m;
    }
    generateSubstitute(c) {
      const m = this, d = new t.FunctionId(c);
      return function(...e) {
        const b = m.debugLogger.bind(m), g = p.TransformerBase.emptyRunConfig();
        if (!m.controlParams.active) {
          return r.doInvoke(this, c.origFn, arguments);
        }
        g.chain((0,p.bailIf)(!m.controlParams.active, "Tedious sensor is inactive", m)).chain((0,p.tryFunction)(h => {
          const f = arguments[0];
          if (n.TediousTracker.isTagged(this)) {
            b(() => `<notracker>: fnName='${c.functionName}' skips tedious handling`);
          } else {
            const q = new n.TediousTracker(m, this, m.callbackProperty), w = m.tryStartAsyncActivation({sensorId:u.Agent.correlation.SensorId.NODEJS_TEDIOUS, functionId:d, attachmentCreator:q, createInitiatorNode:!1});
            if (null != w) {
              return q.vNode = w.vNodeActivation, q.manipulateArguments(f), q.fillEntryData(this.config, f), b(() => `${q}: opened init=${w.initiatorActivation}, vNode=${q.vNode}`), g.addToErrorHandler(G => {
                b(() => `${q}: ending spc=${w.vNodeActivation.spc} because of error. ${G}`);
                w.vNodeActivation.methodException(G);
                w.vNodeActivation.spc.end();
                return G;
              }), g.addToSuccessHandler(G => {
                b(() => `${q}: spc=${w.initialSpc} (virtActivation=${w.vNodeActivation})`);
                return G;
              }), h.setValue(k.CurrentSPC, w.initialSpc);
            }
          }
          return h;
        }));
        return m.runFunctionInContext(g, c.origFn, this, ...e);
      };
    }
    wrapCallback(c) {
      const m = this, d = this.logIf.bind(this, c.debug);
      return k.ContextManager.bindToCurrentContext(function(e, b, ...g) {
        d(() => `${c}: entered tedious wrapped callback - error: ${e} - val: ${b}`);
        const h = p.TransformerBase.emptyRunConfig();
        h.chain((0,p.tryFunction)(f => {
          if (null != c.vNode) {
            var q = c.errorExtractor(e, b);
            c.vNode.exitOrException(q);
            c.fillExitData(b);
            q = () => {
              c.vNode.spc.end();
            };
            h.addToErrorHandler(m.onResultWithAction(q));
            h.addToSuccessHandler(m.onResultWithAction(q));
          }
          return f;
        }));
        return m.runFunction(h, c.origCb, this, e, b, ...g);
      });
    }
  }
  a.TediousTransformer = l;
});
S("src/lib/transformer/TediousTracker", "require exports util src/lib/Agent src/lib/Embedder src/lib/util/CoreUtil src/lib/util/UniqueId src/lib/AttachmentBase src/lib/CallbackWrappingHelper src/lib/transformer/MSSqlTracker".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.TediousSqlAttachment = a.TediousTracker = void 0;
  class m {
    constructor(e, b, g) {
      this.transformer = e;
      this.connection = b;
      this.callbackProperty = g;
      this.errorExtractor = l.errorFromFirstArg;
      this.ID = p.UniqueId.getNext();
      this.debug = e.controlParams.isDebugEnabled;
    }
    createAttachments(e) {
      this.debug && t.Logger.debug(`${this} | created attachments activation=${e}`);
      this.sqlAttachment = new d(e);
      this.connPoolAttachment = new c.MSSqlConnectionPoolAttachment(e);
    }
    fillEntryData(e, b) {
      null != this.connPoolAttachment && this.connPoolAttachment.valid && (this.debug && t.Logger.debug(`${this} | fill tedious connection pool attachment`), e.options = e.options, this.connPoolAttachment.fillConn({port:e.options.port, server:e.server, database:e.options.database, instanceName:e.options.instanceName}));
      if (null != this.sqlAttachment && this.sqlAttachment.valid) {
        this.debug && t.Logger.debug(`${this} | fill tedious sql entry attachment`);
        let g;
        n.hasProperty(b, "sqlTextOrProcedure") ? g = b.sqlTextOrProcedure : n.hasProperty(b, "getTableCreationSql") ? g = b.getTableCreationSql() : this.debug && t.Logger.debug(`${this} | can not get sql from request=${typeof b}`);
        this.sqlAttachment.fillEntryData(g);
      }
    }
    fillExitData(e) {
      null != this.sqlAttachment && this.sqlAttachment.valid && "number" === typeof e && (this.debug && t.Logger.debug(`${this} | fill tedious sql exit attachment`), this.sqlAttachment.fillExitData(e));
    }
    manipulateArguments(e) {
      const b = this.debug;
      n.hasProperty(e, this.callbackProperty) ? (this.origCb = e[this.callbackProperty], e[this.callbackProperty] = this.transformer.wrapCallback(this), b && t.Logger.debug(`${this} | wrapped callback of ${u.inspect(this.origCb)}`)) : b && t.Logger.debug(`${this} | could not find callback property=${this.callbackProperty}`);
    }
    toString() {
      null == this.prefix && (this.prefix = `MSSqlTediousTracker(${this.ID})`);
      return this.prefix;
    }
    static isTagged(e) {
      return !0 === m.embedder.get(e);
    }
    static tag(e) {
      m.embedder.set(e, !0);
    }
  }
  m.embedder = r.create("isHandledByMSSql");
  a.TediousTracker = m;
  class d extends k.AttachmentBase {
    constructor(e) {
      super(e, t.Agent.correlation.AttachmentId.SQL_ID, 0);
    }
    fillEntryData(e) {
      this.setStringOrUnavailable(t.Agent.correlation.AttachmentFieldId.SQL_STATEMENT, e, t.Configuration.maxSqlStringLen);
    }
    fillExitData(e) {
      this.attachment.setFieldInteger(t.Agent.correlation.AttachmentFieldId.SQL_NUM_ROWS_RETURNED, e);
    }
  }
  a.TediousSqlAttachment = d;
});
S("src/lib/transformer/MSSqlTransformer", "require exports src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/Agent src/lib/Debug src/lib/FunctionId src/lib/Logger src/lib/transformer/MSSqlTracker src/lib/transformer/PromiseTransformerUtilities src/lib/transformer/TediousTracker src/lib/transformer/TransformerBase src/lib/contextmanager/ContextManager".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MSSqlTaggingTransformer = a.MSSqlQueryTransformer = a.MSSqlBaseTransformer = void 0;
  class b extends d.TransformerBase {
    wrapReturnValue(f, q) {
      var w = c.PromiseTransformerUtilities.isActuallyAPromise(q.retVal);
      const G = f.debug;
      if (w && !q.didThrow && f.usesPromise) {
        const y = this;
        w = q.retVal;
        G && k.debug(`${f}: wrapping returned promise`);
        q.setVal(c.PromiseTransformerUtilities.wrapPromise(w, function(D, J) {
          return function(B) {
            return y.handleThenCall(this, f, D, B, J, arguments);
          };
        }));
      }
    }
    generateSubstitute(f) {
      const q = this, w = new p.FunctionId(f);
      return function(...G) {
        const y = q.debugLogger.bind(q), D = d.TransformerBase.emptyRunConfig();
        D.chain((0,d.bailIf)(!q.controlParams.active, "MsSQL sensor is inactive", q)).chain((0,d.tryFunction)(J => {
          const B = new l.MSSqlTracker(q, this), v = q.tryStartAsyncActivation({sensorId:r.Agent.correlation.SensorId.NODEJS_MSSQL, functionId:w, attachmentCreator:B, vPathOption:1, createInitiatorNode:!1});
          if (null != v) {
            B.virtualNodeActivation = v.vNodeActivation;
            const z = B.embed(this);
            null != z && y(`${z} to be replaced with ${B}, valid in consecutive commands case`);
            G = B.manipulateArguments(G);
            const x = () => `${B}: spc=${v.initialSpc}` + `(virtActivation=${v.vNodeActivation})`;
            D.addToErrorHandler(A => {
              y(x);
              v.vNodeActivation.methodException(A);
              v.vNodeActivation.spc.end();
              return A;
            });
            D.addToSuccessHandler(A => {
              y(x);
              B.usesPromise && q.wrapReturnValue(B, A);
              return A;
            });
            return J.setValue(e.CurrentSPC, v.initialSpc);
          }
          return J;
        }));
        return q.runFunctionInContext(D, f.origFn, this, ...G);
      };
    }
    handleThenCall(f, q, w, G, y, D) {
      const J = this.logIf.bind(this, null != q && q.debug);
      try {
        null != q && null != q.virtualNodeActivation && (J(() => `${q}: enter handleThenCall, isCatch=${w}`), q.hasPromiseHandled ? (J(() => `${q}: promise handle then call.`), q.debug && n.fail("Promise handle then call.")) : q.virtualNodeActivation.isExited ? q.hasPromiseHandled = !0 : (q.fillExitData(G), q.virtualNodeActivation.exitOrException(w ? G : void 0), q.virtualNodeActivation.spc.end(), J(() => `${q}: closing vNode=${q.virtualNodeActivation} and ending spc=${q.virtualNodeActivation.spc} in handleThenCall`)));
      } catch (v) {
        u.logAgentException(v);
      }
      const B = t.safeInvoke(f, y, D);
      J(() => `${q}: exit handleThenCall, didThrow ${B.didThrow}`);
      return B.rethrow();
    }
  }
  a.MSSqlBaseTransformer = b;
  class g extends b {
    wrapCallback(f) {
      return e.ContextManager.bindToCurrentContext(function(q, w) {
        try {
          if (f.debug && k.debug(`${f}: entered wrapped callback, hasCallback=${null != f.origCb}`), null != f.virtualNodeActivation) {
            var G = t.doInvoke(f, f.errorExtractor, arguments);
            null != f.request ? f.fillExitData(w) : (f.debug && k.debug(`${f}: tracker has request not set!`), k.warning(`${f}: tracker has no request been set!`));
            f.debug && k.debug(`${f}: exiting virtual node=${f.virtualNodeActivation} didThrow=${void 0 !== G}`);
            f.virtualNodeActivation.exitOrException(G);
          }
        } catch (y) {
          u.logAgentException(y);
        }
        G = t.safeInvoke(this, f.origCb, arguments);
        try {
          null != f.virtualNodeActivation && (f.debug && k.debug(`${f}: closing , didThrow=${null != G.didThrow}`), f.debug && k.debug(`${f}: ending virtual node spc=${f.virtualNodeActivation.spc}`), f.virtualNodeActivation.spc.end()), f.debug && k.debug(`${f}: exited wrapped callback`);
        } catch (y) {
          u.logAgentException(y);
        }
        return G.rethrow();
      });
    }
  }
  a.MSSqlQueryTransformer = g;
  class h {
    constructor(f) {
      this.controlParams = f;
    }
    generateSubstitute(f) {
      const q = this;
      return function() {
        if (!q.controlParams.active) {
          return t.doInvoke(this, f.origFn, arguments);
        }
        const w = arguments;
        try {
          const G = q.controlParams.isDebugEnabled, y = w[1];
          if ("function" === typeof y) {
            if (w[1] = q.getCallbackSubstitute(y), G) {
              const D = l.MSSqlTracker.get(this);
              k.debug(`${null !== D && void 0 !== D ? D : "<notracker>"}: tagged connection.`);
            }
          } else {
            G && k.debug(`Callback argument is not a function: type=${typeof y}`);
          }
        } catch (G) {
          u.logAgentException(G);
        }
        return t.doInvoke(this, f.origFn, w);
      };
    }
    getCallbackSubstitute(f) {
      return function() {
        try {
          const q = arguments[1];
          null != q && m.TediousTracker.tag(q);
        } catch (q) {
          u.logAgentException(q);
        }
        return t.doInvoke(this, f, arguments);
      };
    }
  }
  a.MSSqlTaggingTransformer = h;
});
S("src/lib/sensors/MSSqlSensor", "require exports src/lib/Debug src/lib/Logger src/lib/Patch src/lib/transformer/MSSqlTransformer src/lib/util/SemverUtil src/lib/sensors/SensorBase".split(" "), function(O, a, u, t, r, n, p, k) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MSSqlSensor = a.cApiRealm = void 0;
  a.cApiRealm = "mssql/tedious";
  class l extends k.SensorBase {
    applyInstrumentation(c, m) {
      const d = this.isDebugEnabled, e = c.moduleInfo.version, b = p.satisfies(e, ">=5.0.0"), g = p.satisfies(e, ">=6.0.1");
      d && t.debug(`Found version mssql module: ${e}, sensor is ${this.active ? "en" : "dis"}abled`);
      b ? "MSSql.base" === m.ruleKey ? (this.patchQueryFunction(c.moduleExports.Request.prototype, d), this.patchAquire(c.moduleExports.ConnectionPool.prototype, d)) : g && ("MSSql.request" === m.ruleKey ? this.patchQueryFunction(c.moduleExports.prototype, d) : "MSSql.connection-pool" === m.ruleKey && this.patchAquire(c.moduleExports.prototype, d)) : t.info(`Found unsupported version of ${this.name}. Support starts with version ${"5.0.0"}, but is ${e}!`);
    }
    patchQueryFunction(c, m) {
      const d = new n.MSSqlQueryTransformer(this);
      let e;
      for (const b of ["query", "execute", "batch", "bulk"]) {
        e = this.patchFunction(b, d, c), this._debugOutput(m, e, b);
      }
    }
    patchAquire(c, m) {
      var d = new n.MSSqlTaggingTransformer(this);
      c = new r.FunctionSpec("acquire", "", c, a.cApiRealm);
      d = void 0 !== r.applyToSingle(c, d);
      this._debugOutput(m, d, "acquire");
    }
    patchFunction(c, m, d) {
      c = new r.FunctionSpec(c, "", d, r.AsyncTrackingMode.CallbackLast, a.cApiRealm);
      return void 0 !== r.applyToSingle(c, m);
    }
    _debugOutput(c, m, d) {
      c && m ? t.debug(`        patched ${d}`) : m || (t.warning(`could not patch ${d}`), u.fail(`could not patch ${d}`));
    }
  }
  a.MSSqlSensor = l;
});
S("src/lib/sensors/TediousSensor", "require exports src/lib/Debug src/lib/Logger src/lib/Patch src/lib/transformer/TediousTransformer src/lib/util/SemverUtil src/lib/sensors/MSSqlSensor src/lib/sensors/SensorBase".split(" "), function(O, a, u, t, r, n, p, k, l) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.TediousSensor = void 0;
  class c extends l.SensorBase {
    applyInstrumentation(m, d) {
      const e = this.isDebugEnabled;
      var b = m.moduleInfo.version;
      const g = p.satisfies(b, ">=4.2.0");
      e && t.debug(`Found version tedious module: ${b}, sensor is ${this.active ? "en" : "dis"}abled`);
      if (!g) {
        t.info(`Found unsupported version of ${this.name}. Support starts with version ${"4.2.0"}, but is ${b}!`);
      } else {
        if ("Tedious.connection" === d.ruleKey) {
          e && t.debug(`Hit request: ${m.request}`);
          b = new n.TediousTransformer(this, "userCallback");
          for (const h of ["execSql", "execute", "callProcedure", "execSqlBatch"]) {
            d = this.patchFunction(h, b, m.moduleExports.prototype), this._debugOutput(e, d, h);
          }
          b = new n.TediousTransformer(this, "callback");
          for (const h of ["execBulkLoad"]) {
            d = this.patchFunction(h, b, m.moduleExports.prototype), this._debugOutput(e, d, h);
          }
        }
      }
    }
    patchFunction(m, d, e) {
      m = new r.FunctionSpec(m, "", e, r.AsyncTrackingMode.CallbackLast, k.cApiRealm);
      return void 0 !== r.applyToSingle(m, d);
    }
    _debugOutput(m, d, e) {
      m && d ? t.debug(`        patched ${e}`) : d || (t.warning(`could not patch ${e}`), u.fail(`could not patch ${e}`));
    }
  }
  a.TediousSensor = c;
});
S("src/lib/sensors/AggregationAttachment", ["require", "exports", "src/lib/Agent", "src/lib/AttachmentBase"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AggregationAttachment = void 0;
  class r extends t.AttachmentBase {
    constructor(n) {
      super(n, u.Agent.correlation.AttachmentId.AGGREGATION_ID, 0);
    }
    fillAttachment(n) {
      const p = u.Agent.correlation.AttachmentFieldId;
      this.setMultipleFields(k => {
        null != n.execCount && k.integer(p.AGGREGATION_EXECCOUNT, n.execCount);
        null != n.exceptionCount && k.integer(p.AGGREGATION_EXCEPTIONCOUNT, n.exceptionCount);
      });
    }
  }
  a.AggregationAttachment = r;
});
S("src/lib/transformer/KafkaData", ["require", "exports", "src/lib/sensors/MessagingAttachment", "src/lib/Agent", "src/lib/sensors/AggregationAttachment"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.KafkaConsumerData = a.KafkaProducerData = void 0;
  class n {
    constructor(k, l, c, m) {
      this.topic = k;
      this.messageCount = l;
      this.host = c;
      this.port = m;
    }
    getDestinationName() {
      return this.topic;
    }
    getHostName() {
      return this.host;
    }
    getPort() {
      return this.port;
    }
    getTopology() {
      return t.Agent.nativeAgent.correlation.MessagingTopology.EXTERNAL;
    }
    isTmpQueue() {
      return !1;
    }
    getDestinationType() {
    }
    getMsgSize() {
      return -1;
    }
    getCorrelationId() {
    }
    getMsgId() {
    }
    setServiceDetectionFeatureFlags(k) {
      const l = t.Agent.correlation.AttachmentFieldId;
      k.integer(l.MESSAGING_NODE_WILL_HAVE_DESTINATION_TYPE, 0);
      k.integer(l.MESSAGING_NODE_WILL_HAVE_IPCONTAINER, 1);
      k.integer(l.MESSAGING_NODE_WILL_HAVE_TOPOLOGY, 1);
      k.integer(l.MESSAGING_NODE_WILL_HAVE_TEMPORARY_QUEUE, 1);
      k.integer(l.MESSAGING_NODE_WILL_HAVE_QUEUE_VENDOR_NAME, 1);
    }
    createAttachments(k) {
      this.attachment = new u.MessagingProducerAttachment(k, "Apache Kafka", t.Agent.nativeAgent.correlation.MessagingMessagetype.KAFKA_MESSAGE);
      this.attachment.valid && this.attachment.fillAttachment(this);
      this.aggregationAttachment = new r.AggregationAttachment(k);
      this.aggregationAttachment.valid && this.aggregationAttachment.fillAttachment({execCount:this.messageCount});
    }
  }
  a.KafkaProducerData = n;
  class p {
    constructor(k) {
      this.topic = k;
    }
    getDestinationName() {
      return this.topic;
    }
    getHostName() {
    }
    getPort() {
    }
    getTopology() {
      return t.Agent.nativeAgent.correlation.MessagingTopology.EXTERNAL;
    }
    isTmpQueue() {
      return !1;
    }
    getDestinationType() {
    }
    getMsgSize() {
      return -1;
    }
    getCorrelationId() {
    }
    getMsgId() {
    }
    setServiceDetectionFeatureFlags(k) {
      const l = t.Agent.correlation.AttachmentFieldId;
      k.integer(l.MESSAGING_NODE_WILL_HAVE_DESTINATION_TYPE, 0);
      k.integer(l.MESSAGING_NODE_WILL_HAVE_IPCONTAINER, 0);
      k.integer(l.MESSAGING_NODE_WILL_HAVE_MQ_QUEUE_MANAGER_NAME, 0);
      k.integer(l.MESSAGING_NODE_WILL_HAVE_QUEUE_VENDOR_NAME, 1);
      k.integer(l.MESSAGING_NODE_WILL_HAVE_TEMPORARY_QUEUE, 1);
      k.integer(l.MESSAGING_NODE_WILL_HAVE_TOPOLOGY, 1);
    }
    createAttachments(k) {
      this.attachment = new u.MessagingConsumerAttachment(k, "Apache Kafka", t.Agent.nativeAgent.correlation.MessagingMessagetype.KAFKA_MESSAGE);
      this.attachment.valid && this.attachment.fillAttachment(this);
    }
  }
  a.KafkaConsumerData = p;
});
S("src/lib/transformer/KafkaJsConsumerTransformer", "require exports src/lib/util/CoreUtil src/lib/util/InvocationUtil src/lib/util/ErrorUtil src/lib/Agent src/lib/FunctionId src/lib/Logger src/lib/Patch src/lib/transformer/KafkaData src/lib/transformer/TransformerBase".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.KafkaJsCreateConsumerTransformer = a.KafkaJsConsumerTransformer = void 0;
  class d extends m.TransformerBase {
    constructor(g, h, f) {
      super(g);
      this.isSensorActive = h;
      this.uid = f;
    }
    generateSubstitute(g) {
      const h = this, f = new p.FunctionId(g);
      return function(q) {
        if (!h.isSensorActive()) {
          return t.doInvoke(this, g.origFn, arguments);
        }
        const w = h.isDebugEnabled;
        let G;
        try {
          var y = q.message;
          w && k.debug(`KafkaJsConsumerTransformer::generateSubstituteFn: found headers: ${null != (null === y || void 0 === y ? void 0 : y.headers)}`);
          const D = h.getLink(y), J = new c.KafkaConsumerData(q.topic);
          G = h.tryStartIncomingSubPath({sensorId:n.Agent.correlation.SensorId.NODEJS_KAFKAJS_CONSUMER, functionId:f, link:D, category:n.Agent.correlation.MethodCategory.AsyncCall, attachmentCreator:J, customServiceUuid:h.uid});
          null != G && w && k.debug(`KafkaJsConsumerTransformer::generateSubstituteFn: started activation=${G} with link=${D}`);
        } catch (D) {
          r.logAgentException(D);
        }
        y = t.safeInvoke(this, g.origFn, arguments);
        try {
          null != G && (w && k.debug(`KafkaJsConsumerTransformer::generateSubstituteFn: activation=${G}, didThrow=${y.didThrow}`), G.methodActivationDone(y.exception), w && k.debug(`KafkaJsConsumerTransformer::generateSubstituteFn: ended activation=${G}`));
        } catch (D) {
          r.logAgentException(D);
        }
        return y.rethrow();
      };
    }
    getLink(g) {
      var h;
      g = null === (h = null === g || void 0 === g ? void 0 : g.headers) || void 0 === h ? void 0 : h[d.DYNATRACE_TAGGING_HEADER];
      if (Buffer.isBuffer(g)) {
        return h = n.Agent.correlation.deserializeLinkFromBlob(g), this.isDebugEnabled && k.debug(`KafkaJsConsumerTransformer::getLink: found link=${h} from linkTag=${null === g || void 0 === g ? void 0 : g.toString("hex")}`), h;
      }
      this.isDebugEnabled && null != g && k.debug(`KafkaJsConsumerTransformer::getLink: malformed header linkTag=${g}`);
    }
  }
  d.DYNATRACE_TAGGING_HEADER = "X-dynaTrace";
  a.KafkaJsConsumerTransformer = d;
  class e {
    constructor(g) {
      this.sensor = g;
    }
    generateSubstitute(g) {
      const h = this;
      return function(...f) {
        f = t.safeInvoke(this, g.origFn, f);
        if (f.didThrow || "function" !== typeof f.retVal.run) {
          h.sensor.isDebugEnabled && k.debug(`KafkaJsCreateConsumerTransformer: no patched: ${f.didThrow ? "didThrow" : typeof f.retVal.run}`);
        } else {
          try {
            const q = new l.FunctionSpec("run", "consumer", f.retVal), w = new b(h.sensor), G = l.applyToSingle(q, w);
            h.sensor.isDebugEnabled && k.debug(`KafkaJsCreateConsumerTransformer: patched consumer: ${null != G}`);
          } catch (q) {
            r.logAgentException(q);
          }
        }
        return f.rethrow();
      };
    }
  }
  a.KafkaJsCreateConsumerTransformer = e;
  class b {
    constructor(g) {
      this.sensor = g;
    }
    generateSubstitute(g) {
      const h = this;
      return function(...f) {
        const q = h.sensor.isDebugEnabled;
        q && k.debug(`KafkaJsConsumerRunTransformer: ${g.functionName}()`);
        try {
          if (u.isObject(f[0])) {
            const w = f[0];
            if ("function" === typeof w.eachMessage) {
              if (l.isApplied(w.eachMessage)) {
                k.info(`KafkaJsConsumerRunTransformer: eachMessage already patched: ${w.eachMessage.name}`);
              } else {
                const G = new l.FunctionSpec("eachMessage", "config", w), y = new d(h.sensor, () => h.sensor.active), D = l.applyToSingle(G, y);
                null == D ? k.warning(`KafkaJsConsumerRunTransformer: failed to patch eachMessage ${w.eachMessage.name}`) : q && k.debug(`KafkaJsConsumerRunTransformer: patched eachMessage: ${D.origFn.name}`);
              }
            }
            "function" === typeof w.eachBatch && k.info(`KafkaJsConsumerRunTransformer: eachBatch exists: ${w.eachBatch.name}`);
          }
        } catch (w) {
          r.logAgentException(w);
        }
        return t.doInvoke(this, g.origFn, f);
      };
    }
  }
});
S("src/lib/sensors/KafkaJsConsumerSensor", "require exports util src/lib/Agent src/lib/Logger src/lib/Patch src/lib/sensors/SensorBase src/lib/transformer/KafkaJsConsumerTransformer".split(" "), function(O, a, u, t, r, n, p, k) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.KafkaJsConsumerSensor = a.cApiRealm = void 0;
  a.cApiRealm = "kafkajs";
  class l extends p.SensorBase {
    constructor(c, m) {
      super(c, m);
      null == this.sensorConfig.sensorProperties && (this.sensorConfig.sensorProperties = {});
      null == this.sensorConfig.sensorProperties.whitelist && (this.sensorConfig.sensorProperties.whitelist = []);
    }
    applyInstrumentation(c) {
      const m = this.isDebugEnabled;
      m && r.debug(`KafkaJsConsumerSensor | hit. mlc.request=${c.request}, mlc.resolvedModulePath=${c.resolvedModulePath}, version=${c.moduleInfo.version}`);
      const d = t.Agent.nativeAgent.getCustomServiceRulesForFile(c.resolvedModulePath, Object.getOwnPropertyNames(c.moduleExports));
      if (null != d && 0 < d.length) {
        const e = new Map();
        d.filter(b => b.sensorKey === this.sensorConfigKey).forEach(b => {
          const g = e.get(b.uid);
          null == g ? e.set(b.uid, [b.methodName]) : g.push(b.methodName);
        });
        e.forEach((b, g) => {
          const h = new k.KafkaJsConsumerTransformer(this, () => this.isActive(g), g), f = new n.ModuleSpec("", c.moduleExports);
          n.applyToAll(f, b, h, {ignoreAlreadyPatched:!1, ignoreMissing:!0, polymorphicSubstitution:n.SubstitutionType.WarnOnOverride});
        });
        m && r.debug(`KafkaJsConsumerSensor | serviceUids='${(0,u.inspect)(e)}'`);
      } else {
        m && r.debug(`KafkaJsConsumerSensor | ${c.resolvedModulePath} registered, but has no rules defined.`);
      }
    }
    updateState(c) {
      this.isDebugEnabled && r.debug(`KafkaJsConsumerSensor | update runtime configuration with cfg=${(0,u.inspect)(c)}`);
      this.sensorConfig.capture = c.capture;
      this.sensorConfig.entrypoint = c.entrypoint;
      null != c.sensorProperties && (null != c.sensorProperties.whitelist && Array.isArray(c.sensorProperties.whitelist) ? this.sensorConfig.sensorProperties.whitelist = c.sensorProperties.whitelist : r.warning("Received ill-formed runtime configuration update. Whitelist is null or no Array"));
    }
    isActive(c) {
      return this.active ? -1 !== this.sensorConfig.sensorProperties.whitelist.findIndex(m => m === c) : !1;
    }
  }
  a.KafkaJsConsumerSensor = l;
});
S("src/lib/sensors/KafkaJsConsumerAutoSensor", "require exports src/lib/Debug src/lib/Logger src/lib/Patch src/lib/sensors/SensorBase src/lib/transformer/KafkaJsConsumerTransformer".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.KafkaJsConsumerAutoSensor = a.cApiRealm = void 0;
  a.cApiRealm = "kafkajs";
  class k extends n.SensorBase {
    constructor(l, c) {
      super(l, c);
    }
    applyInstrumentation(l, c) {
      var m = this.isDebugEnabled;
      "Module.main" === c.ruleKey && (m && t.debug(`KafkaJsConsumerAutoSensor | patch Kafka.consumer, version=${l.moduleInfo.version}`), c = new r.FunctionSpec("consumer", "Kafka", l.moduleExports.Kafka.prototype), m = new p.KafkaJsCreateConsumerTransformer(this), null == r.applyToSingle(c, m) && (t.warning(`Failed to patch ${l.request}.${"Kafka"}.${"consumer"}`), u.fail()));
    }
  }
  a.KafkaJsConsumerAutoSensor = k;
});
S("src/lib/transformer/KafkaJsProducerTransformer", "require exports url src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/Agent src/lib/FunctionId src/lib/Logger src/lib/MethodActivation src/lib/transformer/KafkaData src/lib/transformer/KafkaJsConsumerTransformer src/lib/transformer/TransformerBase".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.KafkaJsReturnValueProducerTransformer = a.KafkaJsSingleProducerTransformer = a.KafkaJsBatchProducerTransformer = a.KafkaJsCommonProducerTransformer = void 0;
  class b extends e.TransformerBase {
    constructor(q, w) {
      super(q);
      this.cluster = w;
    }
    getSeedBroker() {
      const q = this.getConnStr(), [w, G] = b.parseConnStr(q, this.isDebugEnabled);
      if (null != w && null != G) {
        return [w, G];
      }
      this.isDebugEnabled && l.debug(`KafkaJsCommonProducerTransformer | failed to retrieve connHost and connPort from connStr=${q}`);
      return [void 0, void 0];
    }
    handleSingleTopic(q, w, G, y, D, J) {
      q = q.mActivation.spc.spawnSubPath(p.Agent.correlation.SensorId.NODEJS_KAFKAJS_PRODUCER, !0, 2);
      if (null != q) {
        G = new m.KafkaProducerData(D, J.length, G, y);
        w = new c.MethodActivation({functionId:w, mode:2, spc:q, attachmentCreator:G, endSpcOnExit:!0});
        G = w.spc.createAddSerializeLinkToBlob(!1);
        if (null != G) {
          for (const B of J) {
            null == B.headers && (B.headers = {}), B.headers[d.KafkaJsConsumerTransformer.DYNATRACE_TAGGING_HEADER] = G;
          }
        }
        this.isDebugEnabled && l.debug(`KafkaJsCommonProducerTransformer | topic=${D}, link=${null == G ? "<no link>" : G.toString("hex")}`);
        w.exit();
      }
    }
    getConnStr() {
      var q;
      let w;
      const G = null === (q = this.cluster) || void 0 === q ? void 0 : q.brokerPool;
      null != G && null != G.seedBroker && "string" === typeof G.seedBroker.brokerAddress && (w = G.seedBroker.brokerAddress);
      return w;
    }
    static parseConnStr(q, w) {
      let G, y;
      if ("string" === typeof q) {
        try {
          const D = new u.URL(`unknown://${q}`);
          G = D.hostname;
          const J = Number.parseInt(D.port, 10);
          y = Number.isNaN(J) ? void 0 : J;
        } catch (D) {
          w && l.debug(`KafkaJsCommonProducerTransformer | unknown connStr='${q}'`);
        }
      }
      return [G, y];
    }
  }
  a.KafkaJsCommonProducerTransformer = b;
  class g extends b {
    constructor(q, w) {
      super(q, w);
    }
    generateSubstitute(q) {
      const w = this, G = new k.FunctionId(q), y = new k.VirtualNodeFunctionId(G);
      return function() {
        if (!w.controlParams.active) {
          return n.doInvoke(this, q.origFn, arguments);
        }
        const D = w.isDebugEnabled;
        var J = arguments;
        let B;
        try {
          const v = w.getMessages(J);
          D && l.debug(`${w} | ::generateSubstituteFn found messages: ${null != v ? v.length : "not"}`);
          if (null != v && (B = w.tryStartActivation({sensorId:p.Agent.correlation.SensorId.NODEJS_KAFKAJS_PRODUCER, functionId:G}), null != B)) {
            const [z, x] = w.getSeedBroker();
            for (const A of v) {
              D && l.debug(`${w} | topic='${A.topic}' (${A.messages.length})`), 0 !== A.messages.length && w.handleSingleTopic(B, y, z, x, A.topic, A.messages);
            }
          }
        } catch (v) {
          r.logAgentException(v);
        }
        J = n.safeInvoke(this, q.origFn, J);
        try {
          D && l.debug(`${w} | didThrow=${J.didThrow}`), null === B || void 0 === B ? void 0 : B.methodActivationDone(J.exception);
        } catch (v) {
          r.logAgentException(v);
        }
        return J.rethrow();
      };
    }
    toString() {
      return "KafkaJsBatchProducerTransformer";
    }
    getMessages(q) {
      if (0 < q.length && Array.isArray(q[0].topicMessages)) {
        return q[0].topicMessages;
      }
    }
  }
  a.KafkaJsBatchProducerTransformer = g;
  class h extends b {
    constructor(q, w) {
      super(q, w);
    }
    generateSubstitute(q) {
      const w = this, G = new k.FunctionId(q), y = new k.VirtualNodeFunctionId(G);
      return function() {
        if (!w.controlParams.active) {
          return n.doInvoke(this, q.origFn, arguments);
        }
        const D = w.isDebugEnabled;
        var J = arguments;
        let B;
        try {
          const v = w.getMessages(J), z = w.getTopic(J);
          D && l.debug(`${w} | ::generateSubstituteFn found messages: ${null != v ? v.length : "not"}`);
          if (null != v && null != z && 0 < v.length) {
            if (B = w.tryStartActivation({sensorId:p.Agent.correlation.SensorId.NODEJS_KAFKAJS_PRODUCER, functionId:G}), null != B) {
              const [x, A] = w.getSeedBroker();
              D && l.debug(`${w} | topic='${z}' (${v.length})`);
              w.handleSingleTopic(B, y, x, A, z, v);
            }
          } else {
            D && l.debug(`${w} | gotMsgs=${null != v}, gotTopic=${null != z}, #msgs=${null === v || void 0 === v ? void 0 : v.length}`);
          }
        } catch (v) {
          r.logAgentException(v);
        }
        J = n.safeInvoke(this, q.origFn, J);
        try {
          D && l.debug(`${w} | didThrow=${J.didThrow}`), null != B && B.methodActivationDone();
        } catch (v) {
          r.logAgentException(v);
        }
        return J.rethrow();
      };
    }
    toString() {
      return "KafkaJsSingleProducerTransformer";
    }
    getMessages(q) {
      if (0 < q.length && Array.isArray(q[0].messages)) {
        return q[0].messages;
      }
    }
    getTopic(q) {
      if (0 < q.length) {
        return q[0].topic;
      }
    }
  }
  a.KafkaJsSingleProducerTransformer = h;
  class f extends e.TransformerBase {
    constructor(q) {
      super(q);
      this.sensor = q;
    }
    generateSubstitute(q) {
      const w = this;
      return function() {
        if (!w.controlParams.active) {
          return n.doInvoke(this, q.origFn, arguments);
        }
        const G = n.safeInvoke(this, q.origFn, arguments);
        w.isDebugEnabled && l.debug(`${w} | wrapping return value, didThrow=${G.didThrow}`);
        0 < arguments.length && t.hasProperty(arguments, "0", "cluster") ? w.wrapReturnValue(G.retVal, arguments[0].cluster) : w.wrapReturnValue(G.retVal, void 0);
        return G.rethrow();
      };
    }
    toString() {
      return "KafkaJsRetValTransformer";
    }
    wrapReturnValue(q, w) {
      null != q && "function" === typeof q.sendBatch && "function" === typeof q.send && this.sensor.monkeyPatchSendFunctions(q, w);
    }
  }
  a.KafkaJsReturnValueProducerTransformer = f;
});
S("src/lib/sensors/KafkaJsProducerSensor", "require exports src/lib/Logger src/lib/Patch src/lib/transformer/KafkaJsProducerTransformer src/lib/sensors/SensorBase".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.KafkaJsProducerSensor = a.cApiRealm = void 0;
  a.cApiRealm = "kafkajs";
  class p extends n.SensorBase {
    applyInstrumentation(k, l) {
      this.isDebugEnabled && u.debug(`KafkaJsProducerSensor | hit. version=${k.moduleInfo.version}`);
      if ("KafkaJsProducer.messageProducer" === l.ruleKey) {
        l = new r.KafkaJsReturnValueProducerTransformer(this);
        const c = {dummyName:k.moduleExports}, m = new t.FunctionSpec("dummyName", "", c);
        null == t.applyToSingle(m, l) ? u.info("KafkaJsProducerSensor failed to patch function.") : k.moduleExports = c.dummyName;
      }
    }
    monkeyPatchSendFunctions(k, l) {
      this.isDebugEnabled && u.debug(`KafkaJsProducerSensor | found cluster=${null != l}`);
      const c = new r.KafkaJsBatchProducerTransformer(this, l), m = new t.FunctionSpec("sendBatch", "", k);
      null == t.applyToSingle(m, c) && u.info("KafkaJsProducerSensor failed to patch sendBatch");
      l = new r.KafkaJsSingleProducerTransformer(this, l);
      k = new t.FunctionSpec("send", "", k);
      null == t.applyToSingle(k, l) && u.info("KafkaJsProducerSensor failed to patch send");
    }
  }
  a.KafkaJsProducerSensor = p;
});
S("src/lib/sensors/WorkerThreadsSensor", "require exports src/lib/Configuration src/lib/Debug src/lib/Logger src/lib/Patch src/lib/sensors/SensorBase".split(" "), function(O, a, u, t, r, n, p) {
  function k(m, d) {
    return m.includes("pl-nodejsagent.js") || m.includes("pl-onenodeloader.js") ? `--require ${u.Configuration.rootFolder}pl-nodejsagent.js ${null !== d && void 0 !== d ? d : ""}`.trimRight() : m.includes("createNodeAgent.js") ? `--require ${u.Configuration.rootFolder}../supplement/createNodeAgent.js ${null !== d && void 0 !== d ? d : ""}`.trimRight() : d;
  }
  function l() {
    return function(m, d) {
      if ((null === d || void 0 === d ? 0 : d.hasOwnProperty("env")) && null != d.env && "object" === typeof d.env) {
        r.info("nodeagent autoinject on worker thread");
        const e = {...(null != process.env.NODE_OPTIONS && {NODE_OPTIONS:k(process.env.NODE_OPTIONS, d.env.NODE_OPTIONS)})};
        Object.entries(process.env).forEach(([b, g]) => {
          if (b.startsWith("DT_") || b.startsWith("_DT_")) {
            e[b] = g;
          }
        });
        Object.assign(d.env, e);
      }
      return new this.__proto__.constructor(m, d);
    };
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.WorkerThreadsSensor = void 0;
  class c extends p.SensorBase {
    applyInstrumentation(m) {
      const d = this.isDebugEnabled, e = m.moduleExports.Worker, b = l();
      b.prototype = e.prototype;
      const g = new n.SubstitutedFnDescriptor(new n.FunctionSpec("Worker", "", b, "Worker"), e, !1);
      null == n.tag(g, b, e) ? (r.warning("Failed to patch worker_threads module"), t.fail()) : (m.moduleExports.Worker = b, d && r.debug("worker_threads module patched"));
    }
  }
  a.WorkerThreadsSensor = c;
});
S("src/lib/transformer/OracleDbConnectionStringParser", ["require", "exports"], function(O, a) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.parse = void 0;
  const u = RegExp("(?:(?:[A-Za-z]+:)?//)?([A-Za-z_][\\w\\.-]{0,255}|[0-9]{1,3}(?:\\.[0-9]{1,3}){3}|\\[(?:[:]{0,2}[A-Fa-f0-9]+)+\\])(?:,[A-Za-z_][\\w\\.-]{0,255})*(?::([0-9]{0,5}))?(?:,[A-Za-z_][\\w\\.-]{0,255}:[0-9]{0,5})*(?:/([A-Za-z_][\\w\\.-]{0,255})?(?::[A-Za-z_][\\w\\.-]{0,255})?(?:/[A-Za-z_][\\w\\.-]{0,255})?)?(?:\\?[A-Za-z_][\\w\\.-]{0,255}=[^&]+(?:&[A-Za-z_][\\w\\.-]{0,255}=[^&]+)*)?$"), t = RegExp("\\[((?:[:]{0,2}[A-Fa-f0-9]+)+)\\]"), r = RegExp("\\(HOST=([A-Za-z_][\\w\\.-]{0,255}|[0-9]{1,3}(?:\\.[0-9]{1,3}){3}|(?:[:]{0,2}[A-Fa-f0-9]+)+)\\)", 
  "i"), n = RegExp("\\(PORT=([0-9]{0,5})\\)", "i"), p = RegExp("\\((?:SERVICE_NAME|SID)=([A-Za-z_][\\w\\.-]{0,255})?\\)", "i");
  a.parse = function(k) {
    var l, c = u.exec(k);
    if (null != c) {
      var m = c[1];
      if (null != m) {
        var d = t.exec(m);
        null != d && (m = d[1]);
      }
      return {dbHost:m, dbPort:c[2] ? Number.parseInt(c[2], 10) : void 0, dbName:c[3], dbUrl:k};
    }
    const e = k.replace(/\s*/g, "");
    c = null === (l = r.exec(e)) || void 0 === l ? void 0 : l[1];
    l = null === (d = n.exec(e)) || void 0 === d ? void 0 : d[1];
    d = null === (m = p.exec(e)) || void 0 === m ? void 0 : m[1];
    if (null != c || null != l || null != d) {
      return {dbHost:c, dbPort:l ? Number.parseInt(l, 10) : void 0, dbName:d, dbUrl:k};
    }
  };
});
S("src/lib/sensors/OracleDbAttachment", ["require", "exports", "src/lib/Agent", "src/lib/AttachmentBase"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.OracleDbConnectionPoolAttachment = a.OracleDbSQLAttachment = void 0;
  class r extends t.AttachmentBase {
    constructor(p) {
      super(p, u.Agent.correlation.AttachmentId.SQL_ID, 0);
    }
    fillSqlQueryData(p) {
      this.setString(u.Agent.correlation.AttachmentFieldId.SQL_STATEMENT, p.queryString, u.Configuration.maxSqlStringLen);
    }
    updateAttachment(p) {
      this.attachment.setFieldInteger(u.Agent.correlation.AttachmentFieldId.SQL_NUM_ROWS_RETURNED, p);
    }
    setMethodToResultSetNext() {
      this.attachment.setFieldInteger(u.Agent.correlation.AttachmentFieldId.SQL_METHOD_TYPE, u.Agent.correlation.DbMethodType.DB_METHOD_TYPE_RESULTSET_NEXT_TRUE);
    }
  }
  a.OracleDbSQLAttachment = r;
  class n extends t.AttachmentBase {
    constructor(p) {
      super(p, u.Agent.correlation.AttachmentId.CONNECTION_POOL_ID, 0);
    }
    fillSqlConnectionPoolData(p) {
      this.setMultipleFields(k => {
        var l, c, m, d, e;
        const b = u.Agent.correlation.AttachmentFieldId;
        k.stringCachedOrUnavailable(b.CONNECTION_POOL_DBHOST, null === (l = null === p || void 0 === p ? void 0 : p.connectionData) || void 0 === l ? void 0 : l.dbHost);
        k.stringCachedOrUnavailable(b.CONNECTION_POOL_DB, null === (c = null === p || void 0 === p ? void 0 : p.connectionData) || void 0 === c ? void 0 : c.dbName);
        k.stringCachedOrUnavailable(b.CONNECTION_POOL_URL, null === (m = null === p || void 0 === p ? void 0 : p.connectionData) || void 0 === m ? void 0 : m.dbUrl);
        k.stringCached(b.CONNECTION_POOL_DBTYPE, "Oracle");
        k.integer(b.CONNECTION_POOL_DBPORTNO, null !== (e = null === (d = null === p || void 0 === p ? void 0 : p.connectionData) || void 0 === d ? void 0 : d.dbPort) && void 0 !== e ? e : 1521);
      });
    }
  }
  a.OracleDbConnectionPoolAttachment = n;
});
S("src/lib/transformer/OracleDbTracker", "require exports src/lib/util/UniqueId src/lib/sensors/OracleDbAttachment src/lib/AsyncTracker src/lib/CallbackWrappingHelper src/lib/Agent".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.OracleDbGetRowsTracker = a.OracleDbConnectionTracker = a.OracleDbTracker = void 0;
  class k extends r.AsyncTracker {
    constructor(m, d, e) {
      super(m, d);
      this.oracleDbData = e;
      this.errorExtractor = n.errorFromFirstArg;
      this.isTrackingResultSet = !1;
      this.id = u.UniqueId.getNext();
    }
    createAttachments(m) {
      this.sqlAttachment = new t.OracleDbSQLAttachment(m);
      this.sqlAttachment.valid && this.sqlAttachment.fillSqlQueryData(this.oracleDbData);
      m = new t.OracleDbConnectionPoolAttachment(m);
      m.valid && m.fillSqlConnectionPoolData(this.oracleDbData);
    }
    updateSQLAttachment(m) {
      var d;
      (null === (d = this.sqlAttachment) || void 0 === d ? 0 : d.valid) && this.sqlAttachment.updateAttachment(m);
    }
    setResultSetAttachmentData() {
      var m;
      null != this.virtualNodeActivation && null != this.oracleDbData.returnedRows && (null === (m = this.sqlAttachment) || void 0 === m ? 0 : m.valid) && (this.sqlAttachment.setMethodToResultSetNext(), p.Agent.correlation.setSqlResultSetData(this.virtualNodeActivation.spc.path, this.virtualNodeActivation.serialNo, this.oracleDbData.returnedRows));
    }
    toString() {
      this.logPrefix || (this.logPrefix = `OracleDbTracker ${u.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
  }
  a.OracleDbTracker = k;
  class l extends r.AsyncTracker {
    constructor(m, d, e) {
      super(m, d);
      this.oracleDbConnectionData = e;
      this.id = u.UniqueId.getNext();
    }
    toString() {
      this.logPrefix || (this.logPrefix = `OracleDbConnectionTracker ${u.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
  }
  a.OracleDbConnectionTracker = l;
  class c extends r.AsyncTracker {
    constructor(m, d, e) {
      super(m, d);
      this.data = e;
      this.id = u.UniqueId.getNext();
    }
    toString() {
      this.logPrefix || (this.logPrefix = `OracleDbGetRowsTracker ${u.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
  }
  a.OracleDbGetRowsTracker = c;
});
S("src/lib/transformer/OracleDbTransformer", "require exports util src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/Agent src/lib/Embedder src/lib/FunctionId src/lib/Logger src/lib/SubPathContext src/lib/transformer/AsyncTransformerBase src/lib/transformer/OracleDbConnectionStringParser src/lib/transformer/OracleDbTracker src/lib/transformer/PromiseTransformerUtilities src/lib/transformer/TransformerBase".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g) {
  function h(A) {
    try {
      return A();
    } catch (C) {
      t.logAgentException(C);
    }
  }
  function f(A, C, E, I, H) {
    return function() {
      const F = A.controlParams.isDebugEnabled, K = arguments;
      F && l.debug(`OracleDb: genericSubstitute for ${C.functionName} enter`);
      if (!A.controlParams.active) {
        return F && l.debug(`OracleDb: genericSubstitute for ${C.functionName} exit - inactive`), r.doInvoke(this, C.origFn, K);
      }
      const [L, ...M] = h(() => E(this, K, C)) || [K, ...H], N = r.safeInvoke(this, C.origFn, L);
      h(() => I(N, ...M));
      F && l.debug(`OracleDb: genericSubstitute for ${C.functionName} exit, didThrow: ${N.didThrow}`);
      return N.rethrow();
    };
  }
  function q(A, C, E, I) {
    return function() {
      const H = A.controlParams.isDebugEnabled;
      H && l.debug(`${C} ${C.descriptor.functionName} - callback enter`);
      const F = arguments, K = h(() => E(F, C)), L = r.safeInvoke(this, C.origCb, F);
      h(() => I(L, C, K));
      H && l.debug(`${C} ${C.descriptor.functionName} - callback exit, didThrow: ${L.didThrow}`);
      return L.rethrow();
    };
  }
  function w(A) {
    return "string" === typeof(null === A || void 0 === A ? void 0 : A.connectString) || "string" === typeof(null === A || void 0 === A ? void 0 : A.connectionString);
  }
  function G(A) {
    return "string" === typeof(null === A || void 0 === A ? void 0 : A.connectString) ? A.connectString : A.connectionString;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.OracleDbQueryStreamTransformer = a.OracleDbResultSetCloseTransformer = a.OracleDbResultSetGetRowsTransformer = a.OracleDbConnectionTransformer = a.OracleDbTransformer = void 0;
  const y = p.create("connectionData"), D = p.create("oracleDbTracker");
  class J extends m.AsyncTransformerBase {
    constructor() {
      super(...arguments);
      this.beforeCall = (A, C, E) => {
        const I = 0 < C.length ? C[0] : "";
        A = {connectionData:y.get(A), queryString:I, returnedRows:void 0};
        A = new e.OracleDbTracker(this, E, A);
        E = new k.FunctionId(E);
        E = this.tryStartAsyncActivation({sensorId:n.Agent.correlation.SensorId.NODEJS_ORACLEDB, functionId:E, category:n.Agent.correlation.MethodCategory.Database, attachmentCreator:A});
        if (null != E) {
          return A.virtualNodeActivation = E.vNodeActivation, [A.manipulateArguments(C), A, E];
        }
        this.controlParams.isDebugEnabled && l.debug(`${A}: no activation, active spc: ${c.SubPathContext.getActiveContext()}`);
        return [C, A, E];
      };
      this.afterCall = (A, C, E) => {
        null != E && (A.didThrow ? (E.vNodeActivation.exitOrException(A.exception), E.vNodeActivation.spc.end()) : null === C || void 0 === C ? void 0 : C.manipulateReturnValue(A), E.initiatorActivationDone(A.exception));
      };
      this.beforeCallback = (A, C) => {
        if (null != C.virtualNodeActivation && 0 < A.length) {
          if (1 < A.length) {
            const E = A[1];
            J.updateRowCount(C, E);
            null != (null === E || void 0 === E ? void 0 : E.resultSet) && (D.set(E.resultSet, C), C.isTrackingResultSet = !0);
          }
          C.virtualNodeActivation.exitOrException(A[0]);
          A = new k.FunctionId(C.origCb);
          return g.TransformerBase.createCallbackActivation(C.virtualNodeActivation.spc, A);
        }
      };
      this.afterCallback = (A, C, E) => {
        var I;
        null === E || void 0 === E ? void 0 : E.done(A.exception);
        C.isTrackingResultSet || (null === (I = C.virtualNodeActivation) || void 0 === I ? void 0 : I.spc.end());
      };
    }
    generateSubstitute(A) {
      return f(this, A, this.beforeCall, this.afterCall, [void 0, void 0]);
    }
    wrapCallback(A) {
      return q(this, A, this.beforeCallback, this.afterCallback);
    }
    wrapReturnValue(A, C) {
      function E(H, F) {
        return function(K) {
          return J.handleThenCall(this, A, H, K, F, arguments, I);
        };
      }
      const I = this.controlParams.isDebugEnabled;
      C = C.retVal;
      b.PromiseTransformerUtilities.isActuallyAPromise(C) && b.PromiseTransformerUtilities.wrapPromise(C, E);
    }
    static handleThenCall(A, C, E, I, H, F, K) {
      var L;
      K && l.debug(`${C}: enter then call, isCatch ${E}`);
      try {
        null == C.virtualNodeActivation || C.virtualNodeActivation.isExited || (C.virtualNodeActivation.exitOrException(E ? I : void 0), E ? null === (L = C.virtualNodeActivation) || void 0 === L ? void 0 : L.spc.end() : (J.updateRowCount(C, I), null != (null === I || void 0 === I ? void 0 : I.resultSet) ? (D.set(I.resultSet, C), C.isTrackingResultSet = !0) : C.virtualNodeActivation.spc.end()), K && l.debug(`${C}: ended virtual node and path`));
      } catch (M) {
        t.logAgentException(M);
      }
      A = r.safeInvoke(A, H, F);
      K && l.debug(`${C}: exit then call, didThrow ${A.didThrow}`);
      return A.rethrow();
    }
    static updateRowCount(A, C) {
      var E;
      "number" === typeof(null === (E = null === C || void 0 === C ? void 0 : C.rows) || void 0 === E ? void 0 : E.length) ? A.updateSQLAttachment(C.rows.length) : "number" === typeof(null === C || void 0 === C ? void 0 : C.rowsAffected) && A.updateSQLAttachment(C.rowsAffected);
    }
  }
  a.OracleDbTransformer = J;
  class B extends m.AsyncTransformerBase {
    constructor() {
      super(...arguments);
      this.beforeCall = (A, C, E) => {
        var I;
        const H = this.controlParams.isDebugEnabled;
        let F;
        if (0 < C.length) {
          const K = C[0];
          w(K) ? F = (0,d.parse)(G(K)) : w(A) && (F = (0,d.parse)(G(A)));
        } else {
          0 === C.length && w(A) && (F = (0,d.parse)(G(A)));
        }
        H && l.debug("OracleDb: getConnectionSubstitute - " + `connectionData=${u.inspect(F)}, args[0]=${u.inspect(C[0])}:${typeof C[0]}, userObj:${null === (I = null === A || void 0 === A ? void 0 : A.constructor) || void 0 === I ? void 0 : I.name}`);
        return null != F ? (A = new e.OracleDbConnectionTracker(this, E, F), [A.manipulateArguments(C), A]) : [C, void 0];
      };
      this.afterCall = (A, C) => {
        A.didThrow || (null === C || void 0 === C ? void 0 : C.manipulateReturnValue(A));
      };
    }
    generateSubstitute(A) {
      return f(this, A, this.beforeCall, this.afterCall, [void 0]);
    }
    wrapCallback(A) {
      return function(C, E) {
        null == C && null != E && y.set(E, A.oracleDbConnectionData);
        return r.doInvoke(void 0, A.origCb, arguments);
      };
    }
    wrapReturnValue(A, C) {
      const E = C.retVal;
      b.PromiseTransformerUtilities.isActuallyAPromise(E) && C.setVal(E.then(I => {
        y.set(I, A.oracleDbConnectionData);
        return I;
      }));
    }
  }
  a.OracleDbConnectionTransformer = B;
  class v extends m.AsyncTransformerBase {
    constructor() {
      super(...arguments);
      this.beforeCall = (A, C, E) => {
        A = D.get(A);
        return null != A ? (E = new e.OracleDbGetRowsTracker(this, E, A.oracleDbData), [E.manipulateArguments(C), E]) : [C, void 0];
      };
      this.afterCall = (A, C) => {
        A.didThrow || (null === C || void 0 === C ? void 0 : C.manipulateReturnValue(A));
      };
    }
    generateSubstitute(A) {
      return f(this, A, this.beforeCall, this.afterCall, [void 0]);
    }
    wrapCallback(A) {
      return function(C, E) {
        null == C && null != E && v.updateRowCount(A, E);
        return r.doInvoke(void 0, A.origCb, arguments);
      };
    }
    wrapReturnValue(A, C) {
      const E = C.retVal;
      b.PromiseTransformerUtilities.isActuallyAPromise(E) && C.setVal(E.then(I => {
        null != I && v.updateRowCount(A, I);
        return I;
      }));
    }
    static updateRowCount(A, C) {
      var E, I;
      "getRow" === A.descriptor.functionName ? A.data.returnedRows = (null !== (E = A.data.returnedRows) && void 0 !== E ? E : 0) + 1 : "getRows" === A.descriptor.functionName && (A.data.returnedRows = (null !== (I = A.data.returnedRows) && void 0 !== I ? I : 0) + (null === C || void 0 === C ? void 0 : C.length));
    }
  }
  a.OracleDbResultSetGetRowsTransformer = v;
  class z extends m.AsyncTransformerBase {
    constructor() {
      super(...arguments);
      this.beforeCall = (A, C, E) => {
        A = D.get(A);
        if (null != (null === A || void 0 === A ? void 0 : A.virtualNodeActivation)) {
          return E = new e.OracleDbTracker(this, E, A.oracleDbData), E.oracleDbData.returnedRows = A.oracleDbData.returnedRows, E.virtualNodeActivation = A.virtualNodeActivation, [E.manipulateArguments(C), E];
        }
        this.controlParams.isDebugEnabled && l.debug(`${null !== A && void 0 !== A ? A : "no existing tracker found"}: no activation, active spc: ${c.SubPathContext.getActiveContext()}`);
        return [C, void 0];
      };
      this.afterCall = (A, C) => {
        null != (null === C || void 0 === C ? void 0 : C.virtualNodeActivation) && C.manipulateReturnValue(A);
      };
      this.beforeCallback = (A, C) => {
        z.submitRowCount(C, null != A[0], this.controlParams.isDebugEnabled);
      };
      this.afterCallback = (A, C) => {
        var E;
        null === (E = C.virtualNodeActivation) || void 0 === E ? void 0 : E.spc.end();
      };
    }
    generateSubstitute(A) {
      return f(this, A, this.beforeCall, this.afterCall, [void 0]);
    }
    wrapCallback(A) {
      return q(this, A, this.beforeCallback, this.afterCallback);
    }
    wrapReturnValue(A, C) {
      function E(F, K) {
        return function(L) {
          return I.handleThenCall(this, A, F, L, K, arguments, H);
        };
      }
      const I = this, H = I.controlParams.isDebugEnabled;
      C = C.retVal;
      b.PromiseTransformerUtilities.isActuallyAPromise(C) && b.PromiseTransformerUtilities.wrapPromise(C, E);
    }
    handleThenCall(A, C, E, I, H, F, K) {
      K && l.debug(`${C}: enter then call, isCatch ${E}`);
      h(() => z.submitRowCount(C, E, K));
      A = r.safeInvoke(A, H, F);
      K && l.debug(`${C}: exit then call, didThrow ${A.didThrow}`);
      return A.rethrow();
    }
    static submitRowCount(A, C, E) {
      var I;
      if (null === (I = null === A || void 0 === A ? void 0 : A.virtualNodeActivation) || void 0 === I ? 0 : I.spc.open) {
        C || null == A.oracleDbData.returnedRows || (C = A.virtualNodeActivation.spc.createActivation({sensorId:n.Agent.correlation.SensorId.NODEJS_ORACLEDB, functionId:new k.FunctionId(A.descriptor), category:n.Agent.correlation.MethodCategory.Database, attachmentCreator:A, mode:0}), null != C && (A.updateSQLAttachment(A.oracleDbData.returnedRows), A.setResultSetAttachmentData(), C.enter(), C.exit())), A.virtualNodeActivation.spc.end(), E && l.debug(`${A}: ended virtual node and path`);
      }
    }
  }
  a.OracleDbResultSetCloseTransformer = z;
  class x extends m.AsyncTransformerBase {
    constructor() {
      super(...arguments);
      this.beforeCall = (A, C, E) => {
        const I = 0 < C.length ? C[0] : "";
        A = {connectionData:y.get(A), queryString:I, returnedRows:void 0};
        A = new e.OracleDbTracker(this, E, A);
        E = new k.FunctionId(E);
        E = this.tryStartAsyncActivation({sensorId:n.Agent.correlation.SensorId.NODEJS_ORACLEDB, functionId:E, category:n.Agent.correlation.MethodCategory.Database, attachmentCreator:A});
        null != E ? A.virtualNodeActivation = E.vNodeActivation : this.controlParams.isDebugEnabled && l.debug(`${A}: no activation, active spc: ${c.SubPathContext.getActiveContext()}`);
        return [C, A, E];
      };
      this.afterCall = (A, C, E) => {
        var I;
        if (null != E && null != C) {
          A.didThrow && (E.vNodeActivation.exitOrException(A.exception), E.vNodeActivation.spc.end());
          E.initiatorActivationDone(A.exception);
          null === (I = C.virtualNodeActivation) || void 0 === I ? void 0 : I.exitOrException(A.exception);
          const H = this.controlParams.isDebugEnabled;
          h(() => {
            const F = A.retVal;
            null != F && (C.isTrackingResultSet = !0, F.on("open", () => h(() => {
              null != F._resultSet && D.set(F._resultSet, C);
            })), F.on("end", () => h(() => {
              z.submitRowCount(C, !1, H);
            })));
          });
        }
      };
    }
    generateSubstitute(A) {
      return f(this, A, this.beforeCall, this.afterCall, [void 0, void 0]);
    }
    wrapCallback() {
      return () => {
      };
    }
    wrapReturnValue() {
    }
  }
  a.OracleDbQueryStreamTransformer = x;
});
S("src/lib/sensors/OracleDbSensor", "require exports src/lib/transformer/OracleDbTransformer src/lib/Logger src/lib/Patch src/lib/sensors/SensorBase".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.OracleDbSensor = void 0;
  class p extends n.SensorBase {
    applyInstrumentation(k, l) {
      "Module.main" === l.ruleKey && (this.isDebugEnabled && t.debug("OracleDbSensor.applyInstrumentation to OracleDb.getConnection"), r.applyToSingle(new r.FunctionSpec("getConnection", "OracleDb", k.moduleExports, r.AsyncTrackingMode.CallbackLastOrPromise, "OracleDb"), new u.OracleDbConnectionTransformer(this), r.cPolymorphicDefaultOptions), this.isDebugEnabled && t.debug("OracleDbSensor.applyInstrumentation to Pool.getConnection"), r.applyToSingle(new r.FunctionSpec("getConnection", "Pool", k.moduleExports.Pool.prototype, 
      r.AsyncTrackingMode.CallbackLastOrPromise, "OracleDb"), new u.OracleDbConnectionTransformer(this)), this.isDebugEnabled && t.debug("OracleDbSensor.applyInstrumentation to class Connection"), r.applyToSingle(new r.FunctionSpec("execute", "Connection", k.moduleExports.Connection.prototype, r.AsyncTrackingMode.CallbackLastOrPromise, "OracleDb"), new u.OracleDbTransformer(this)), r.applyToSingle(new r.FunctionSpec("executeMany", "Connection", k.moduleExports.Connection.prototype, r.AsyncTrackingMode.CallbackLastOrPromise, 
      "OracleDb"), new u.OracleDbTransformer(this)), r.applyToSingle(new r.FunctionSpec("queryStream", "Connection", k.moduleExports.Connection.prototype, r.AsyncTrackingMode.None, "OracleDb"), new u.OracleDbQueryStreamTransformer(this)), this.isDebugEnabled && t.debug("OracleDbSensor.applyInstrumentation to class ResultSet"), r.applyToSingle(new r.FunctionSpec("getRow", "ResultSet", k.moduleExports.ResultSet.prototype, r.AsyncTrackingMode.CallbackLastOrPromise, "OracleDb"), new u.OracleDbResultSetGetRowsTransformer(this)), 
      r.applyToSingle(new r.FunctionSpec("getRows", "ResultSet", k.moduleExports.ResultSet.prototype, r.AsyncTrackingMode.CallbackLastOrPromise, "OracleDb"), new u.OracleDbResultSetGetRowsTransformer(this)), r.applyToSingle(new r.FunctionSpec("close", "ResultSet", k.moduleExports.ResultSet.prototype, r.AsyncTrackingMode.CallbackLastOrPromise, "OracleDb"), new u.OracleDbResultSetCloseTransformer(this)));
    }
  }
  a.OracleDbSensor = p;
});
S("src/lib/agentapi/Common", "require exports src/lib/Agent src/lib/CallbackWrappingHelper src/lib/FunctionId src/lib/transformer/TransformerBase src/lib/sensors/ExceptionAttachment src/lib/sensors/SensorBase src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/util/UniqueId".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.IncomingTaggableTracer = a.IncomingTracer = a.OutgoingTaggableTracer = a.OutgoingTracer = a.Tracer = a.DummyOutgoingTaggableTracer = a.DummyOutgoingTracer = a.DummyIncomingTracer = a.DummyTracer = a.TracerState = a.SdkContext = a.SdkSensorBase = a.validateConnectionInfo = void 0;
  a.validateConnectionInfo = function(B) {
    if (null != B.host) {
      if ("string" !== typeof B.host) {
        return ".host is invalid";
      }
      if (null != B.port && "number" !== typeof B.port) {
        return ".port is invalid";
      }
    } else if (null != B.socketPath) {
      if ("string" !== typeof B.socketPath) {
        return ".socketPath is invalid";
      }
    } else if (null != B.pipeName) {
      if ("string" !== typeof B.pipeName) {
        return ".pipeName is invalid";
      }
    } else if (null != B.channelType) {
      if ("number" !== typeof B.channelType || 0 > B.channelType || 4 < B.channelType) {
        return ".channelType is invalid";
      }
    } else {
      return " contains no ConnectionInfo (host/port, socketPath, pipeName or channelType)";
    }
  };
  class d extends k.SensorBase {
    constructor(B, v) {
      super(B, v);
      this.addToDebugLogDomain("Sdk");
    }
  }
  a.SdkSensorBase = d;
  class e {
    logWarn(B, v, z) {
      B && u.Logger.debug(`${v}: SDK warn: ${z}`);
      if (null != this.warnCb) {
        try {
          this.warnCb.call(void 0, z);
        } catch (x) {
          B && u.Logger.debug(`SDK: exception in warnCb: ${l.verboseExceptionObject(x)}`);
        }
      }
    }
    logError(B, v, z) {
      B && u.Logger.debug(`${v}: SDK error: ${z}`);
      if (null != this.errorCb) {
        try {
          this.errorCb.call(void 0, z);
        } catch (x) {
          B && u.Logger.debug(`SDK: exception in errorCb: ${l.verboseExceptionObject(x)}`);
        }
      }
    }
  }
  a.SdkContext = e;
  var b;
  (function(B) {
    B[B.CREATED = 0] = "CREATED";
    B[B.STARTED = 1] = "STARTED";
    B[B.ENDED = 2] = "ENDED";
  })(b = a.TracerState || (a.TracerState = {}));
  class g {
    start(B, ...v) {
      if ("function" !== typeof B) {
        throw new TypeError(`OneAgent SDK: Tracer.start() first parameter must be a function, but received ${typeof B}`);
      }
      return B.call(void 0, ...v);
    }
    startWithContext(B, v, ...z) {
      if ("function" !== typeof B) {
        throw new TypeError(`OneAgent SDK: Tracer.start() first parameter must be a function, but received ${typeof B}`);
      }
      return B.call(v, ...z);
    }
    error() {
      return this;
    }
  }
  a.DummyTracer = g;
  class h extends g {
    end() {
    }
  }
  a.DummyIncomingTracer = h;
  class f extends g {
    end(B, ...v) {
      return this.endWithContext(B, void 0, ...v);
    }
    endWithContext(B, v, ...z) {
      if (null != B) {
        if ("function" !== typeof B) {
          throw new TypeError(`OneAgent SDK: Tracer.end() first parameter must be a function, but received ${typeof B}`);
        }
        return B.call(v, ...z);
      }
    }
  }
  a.DummyOutgoingTracer = f;
  class q extends f {
    getDynatraceStringTag() {
      return "";
    }
    getDynatraceByteTag() {
      return Buffer.alloc(0);
    }
  }
  a.DummyOutgoingTaggableTracer = q;
  class w extends n.TransformerBase {
    start(B, ...v) {
      return this.startWithContext(B, void 0, ...v);
    }
    startWithContext(B, v, ...z) {
      if ("function" !== typeof B) {
        throw this.sdkContext.logError(this.isDebugEnabled, this.moduleName, `start() first parameter must be a function, but received ${typeof B}`), new TypeError(`OneAgent SDK: Tracer.start() first parameter must be a function, but received ${typeof B}`);
      }
      let x;
      try {
        if (this.isDebugEnabled && u.Logger.debug(`${this}: start() state: ${b[this.state]}`), this.state === b.CREATED) {
          this.state = b.STARTED;
          var A = new r.FunctionId(B);
          x = this.startAsyncPath(A);
          if (null != x) {
            if (this.isDebugEnabled) {
              const E = x.vNodeActivation, I = x.initiatorActivation;
              u.Logger.debug(`${this}: start() vNode: ${E} @spc: ${E.spc}, initiator: ${I} @spc: ${null === I || void 0 === I ? void 0 : I.spc}`);
            }
            this.vNodeActivation = x.vNodeActivation;
            var C = x.initialSpc;
            for (A = 0; A < z.length; A++) {
              const E = z[A];
              "function" === typeof E && (z[A] = t.CallbackWrappingHelper.wrapCallbackContextPassing({origCb:E, spc:C}));
            }
          } else {
            this.isDebugEnabled && u.Logger.debug(`${this}: start() no activation created`), this.sdkContext.logWarn(this.isDebugEnabled, this.moduleName, "no subpath created");
          }
        } else {
          this.sdkContext.logWarn(this.isDebugEnabled, this.moduleName, "start() is only allowed once after tracer creation");
        }
      } catch (E) {
        l.logAgentException(E);
      }
      if (null == x) {
        return c.doInvoke(v, B, z);
      }
      B = c.safeInvoke(v, B, z);
      try {
        x.initiatorActivationDone(B.exception);
      } catch (E) {
        l.logAgentException(E);
      }
      this.isDebugEnabled && u.Logger.debug(`${this}: start() exit didThrow: ${B.didThrow ? l.verboseExceptionObject(B.exception) : "-"}`);
      return B.rethrow();
    }
    error(B) {
      try {
        this.isDebugEnabled && u.Logger.debug(`${this}: error(): state: ${b[this.state]}, vNode: ${this.vNodeActivation}, err: ${B}`);
        if (this.state !== b.STARTED) {
          return this.sdkContext.logWarn(this.isDebugEnabled, this.moduleName, "error() shall be called on a started tracer"), this;
        }
        if (null != this.vNodeActivation) {
          if (this.exitByException) {
            this.sdkContext.logWarn(this.isDebugEnabled, this.moduleName, "it's not allowed to set more then one error on a tracer");
          } else {
            this.exitByException = !0;
            try {
              (new p.ExceptionAttachment(this.vNodeActivation)).fillExceptionData(B);
            } catch (v) {
              l.logAgentException(v);
            }
          }
        } else {
          this.sdkContext.logWarn(this.isDebugEnabled, this.moduleName, "can't set error on this path");
        }
      } catch (v) {
        l.logAgentException(v);
      }
      return this;
    }
    toString() {
      this.logPrefix || (this.logPrefix = `${this.moduleName} ${m.UniqueId.asString(this.id)}`);
      return this.logPrefix;
    }
    constructor(B, v, z) {
      super(B);
      this.sdkContext = v;
      this.moduleName = z;
      this.exitByException = !1;
      this.state = b.CREATED;
      this.id = m.UniqueId.getNext();
      this.isDebugEnabled && u.Logger.debug(`${this}: create tracer`);
    }
    endVNode(B) {
      try {
        if (this.isDebugEnabled && u.Logger.debug(`${this}: endVNode(${B}): state: ${b[this.state]}, vNode: ${this.vNodeActivation}`), this.state !== b.STARTED) {
          this.sdkContext.logWarn(this.isDebugEnabled, this.moduleName, "can't end non started tracer");
        } else {
          if (this.state = b.ENDED, null != this.vNodeActivation) {
            const v = this.vNodeActivation.spc;
            this.exitByException ? this.vNodeActivation.methodException() : this.vNodeActivation.exit();
            this.vNodeActivation = void 0;
            B && v.end();
            return v;
          }
        }
      } catch (v) {
        l.logAgentException(v);
      }
    }
  }
  a.Tracer = w;
  class G extends w {
    endWithContext(B, v, ...z) {
      if ("function" === typeof B) {
        const x = this.endVNode(!1);
        let A, C;
        try {
          null != x && (A = new r.FunctionId(B), C = n.TransformerBase.createCallbackActivation(x, A, u.Agent.correlation.Creator.ONEAGENT_SDK));
        } catch (E) {
          l.logAgentException(E);
        }
        B = c.safeInvoke(v, B, [...z]);
        try {
          null === C || void 0 === C ? void 0 : C.done(B.exception), null === x || void 0 === x ? void 0 : x.end();
        } catch (E) {
          l.logAgentException(E);
        }
        return B.rethrow();
      }
      this.endVNode(!0);
      if (null != B) {
        throw this.sdkContext.logError(this.isDebugEnabled, this.moduleName, `end() first parameter must be a function, but received ${typeof B}`), new TypeError(`OneAgent SDK: Tracer.end() first parameter must be a function, but received ${typeof B}`);
      }
    }
    end(B, ...v) {
      return this.endWithContext(B, void 0, ...v);
    }
  }
  a.OutgoingTracer = G;
  class y extends G {
    constructor(B, v, z, x) {
      super(B, v, z);
      this.syncLink = x;
    }
    getDynatraceStringTag() {
      try {
        if (this.state !== b.STARTED) {
          return this.sdkContext.logWarn(this.isDebugEnabled, this.moduleName, "getDynatraceStringTag() shall be called on started tracer"), "";
        }
        if (null != this.stringTag) {
          return this.stringTag;
        }
        if (null != this.blobTag) {
          const B = u.Agent.correlation.deserializeLinkFromBlob(this.blobTag);
          this.stringTag = B.serialize().dtTag;
          B.purge();
          return this.stringTag || "";
        }
        if (null != this.vNodeActivation) {
          const B = this.vNodeActivation.spc.createAddSerializeLink(this.syncLink, u.Agent.correlation.TaggingMode.DT_ONLY);
          null != B && (this.stringTag = B.dtTag);
        } else {
          this.isDebugEnabled && u.Logger.debug(`${this}: getDynatraceStringTag() but no Activation`);
        }
      } catch (B) {
        l.logAgentException(B);
      }
      return this.stringTag || "";
    }
    getDynatraceByteTag() {
      try {
        if (this.state !== b.STARTED) {
          return this.sdkContext.logWarn(this.isDebugEnabled, this.moduleName, "getDynatraceByteTag() shall be called on started tracer"), Buffer.alloc(0);
        }
        if (null != this.blobTag) {
          return this.blobTag;
        }
        if (null != this.stringTag) {
          const B = u.Agent.correlation.deserializeLinkFromString(this.stringTag);
          this.blobTag = B.toBlob();
          B.purge();
          return this.blobTag;
        }
        null != this.vNodeActivation ? this.blobTag = this.vNodeActivation.spc.createAddSerializeLinkToBlob(this.syncLink) : this.isDebugEnabled && u.Logger.debug(`${this}: getDynatraceByteTag() but no Activation`);
      } catch (B) {
        l.logAgentException(B);
      }
      return this.blobTag || Buffer.alloc(0);
    }
  }
  a.OutgoingTaggableTracer = y;
  class D extends w {
    end() {
      this.endVNode(!1);
    }
  }
  a.IncomingTracer = D;
  class J extends D {
    getLink(B) {
      let v;
      "string" === typeof B ? v = u.Agent.correlation.deserializeLinkFromString(B) : Buffer.isBuffer(B) ? v = u.Agent.correlation.deserializeLinkFromBlob(B) : null != B && this.sdkContext.logWarn(this.isDebugEnabled, this.moduleName, "ignoring invalid tag");
      return v;
    }
  }
  a.IncomingTaggableTracer = J;
});
S("src/lib/agentapi/TraceContext", ["require", "exports", "src/lib/SubPathContext"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.getApis = void 0;
  a.getApis = function() {
    return {traceContext:function() {
      var t, r;
      const n = u.SubPathContext.getActiveContext();
      return {isValid:null != n && n.spanId !== u.cInvalidSpanId && n.traceId !== u.cInvalidTraceId, traceid:null !== (t = null === n || void 0 === n ? void 0 : n.traceId) && void 0 !== t ? t : u.cInvalidTraceId, spanid:null !== (r = null === n || void 0 === n ? void 0 : n.spanId) && void 0 !== r ? r : u.cInvalidSpanId};
    }};
  };
});
S("src/lib/agentapi/IncomingRemoteCall", "require exports assert util src/lib/Agent src/lib/AttachmentBase src/lib/Logger src/lib/agentapi/AgentApi src/lib/agentapi/Common src/lib/util/CoreUtil src/lib/util/ErrorUtil".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  function d(f, q, w) {
    return c.isObject(w) ? "string" !== typeof w.serviceEndpoint ? (f.logError(q, "IncomingRemoteCall", "traceIncomingRemoteCall: startData.serviceEndpoint is invalid"), !1) : "string" !== typeof w.serviceMethod ? (f.logError(q, "IncomingRemoteCall", "traceIncomingRemoteCall: startData.serviceMethod is invalid"), !1) : "string" !== typeof w.serviceName ? (f.logError(q, "IncomingRemoteCall", "traceIncomingRemoteCall: startData.serviceName is invalid"), !1) : !0 : (f.logError(q, "IncomingRemoteCall", 
    "traceIncomingRemoteCall: startData is not an object"), !1);
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.getApis = a.SdkIncomingRemoteCallSensor = void 0;
  class e extends l.SdkSensorBase {
    constructor(f, q) {
      super(f, q);
      u.strictEqual(e.instance, void 0, "Multiple instances of SdkIncomingRemoteCallSensor created");
      e.instance = this;
    }
  }
  a.SdkIncomingRemoteCallSensor = e;
  a.getApis = function(f) {
    return {create:function(q) {
      const w = e.instance;
      if (null == w) {
        return f.logWarn((0,k.isDebug)(), "IncomingRemoteCall", "traceIncomingRemoteCall: no trace created as sensor is disabled"), new l.DummyIncomingTracer();
      }
      if (!(0,k.isActive)()) {
        return f.logWarn(w.isDebugEnabled, "IncomingRemoteCall", "traceIncomingRemoteCall: no trace created as SDK is inactive"), new l.DummyIncomingTracer();
      }
      if (!w.active) {
        return f.logWarn(w.isDebugEnabled, "IncomingRemoteCall", "traceIncomingRemoteCall: no trace created as sensor is not active"), new l.DummyIncomingTracer();
      }
      if (!d(f, w.isDebugEnabled, q)) {
        return new l.DummyIncomingTracer();
      }
      w.isDebugEnabled && p.debug(`${"IncomingRemoteCall"}: create() data: ${t.inspect(q)}`);
      return new b(w, f, q);
    }};
  };
  class b extends l.IncomingTaggableTracer {
    constructor(f, q, w) {
      super(f, q, "IncomingRemoteCall");
      this.startData = w;
    }
    startAsyncPath(f) {
      const q = new h(this.startData, this.sdkContext, this.isDebugEnabled), w = this.getLink(this.startData.dynatraceTag);
      return this.tryStartIncomingAsyncSubPath({sensorId:r.Agent.correlation.SensorId.NODEJS_ONEAGENTSDK, functionId:f, link:w, attachmentCreator:q, creator:r.Agent.correlation.Creator.ONEAGENT_SDK});
    }
  }
  class g extends n.AttachmentBase {
    constructor(f, q) {
      super(f, r.Agent.correlation.AttachmentId.REMOTE_CALL_SERVER_ID, 0);
      this.debug = q;
    }
    fillEntryData(f, q) {
      this.setMultipleFields(w => {
        const G = r.Agent.correlation.AttachmentFieldId;
        w.integer(G.REMOTE_CALL_PROTOCOL_TYPE_ID, r.Agent.correlation.RemoteCallWireProtocol.REMOTE_CALL_WIRE_PROTOCOL_ADK);
        w.stringCached(G.REMOTE_CALL_SERVICE_METHOD_ID, f.serviceMethod);
        w.stringCached(G.REMOTE_CALL_SERVICE_NAME_ID, f.serviceName);
        w.stringCached(G.REMOTE_CALL_SERVICE_ENDPOINT_ID, f.serviceEndpoint);
        "string" === typeof f.protocolName ? w.stringCached(G.REMOTE_CALL_PROTOCOL_NAME_ID, f.protocolName) : null != f.protocolName && q.logWarn(this.debug, "IncomingRemoteCall", "traceIncomingRemoteCall: ignoring invalid startData.protocolName");
      });
    }
  }
  class h {
    constructor(f, q, w) {
      this.entryData = f;
      this.sdkContext = q;
      this.debug = w;
    }
    createAttachments(f) {
      f = new g(f, this.debug);
      if (f.valid) {
        try {
          f.fillEntryData(this.entryData, this.sdkContext);
        } catch (q) {
          m.logAgentException(q);
        }
      }
    }
  }
});
S("src/lib/agentapi/OutgoingRemoteCall", "require exports assert util src/lib/Agent src/lib/AttachmentBase src/lib/Logger src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/agentapi/AgentApi src/lib/agentapi/Common".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  function d(f, q, w) {
    return k.isObject(w) ? "string" !== typeof w.serviceEndpoint ? (f.logError(q, "OutgoingRemoteCall", "traceOutgoingRemoteCall: startData.serviceEndpoint is invalid"), !1) : "string" !== typeof w.serviceMethod ? (f.logError(q, "OutgoingRemoteCall", "traceOutgoingRemoteCall: startData.serviceMethod is invalid"), !1) : "string" !== typeof w.serviceName ? (f.logError(q, "OutgoingRemoteCall", "traceOutgoingRemoteCall: startData.serviceName is invalid"), !1) : (w = (0,m.validateConnectionInfo)(w)) ? 
    (f.logError(q, "OutgoingRemoteCall", `traceOutgoingRemoteCall: startData${w}`), !1) : !0 : (f.logError(q, "OutgoingRemoteCall", "traceOutgoingRemoteCall: startData is not an object"), !1);
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.getApis = a.SdkOutgoingRemoteCallSensor = void 0;
  class e extends m.SdkSensorBase {
    constructor(f, q) {
      super(f, q);
      u.strictEqual(e.instance, void 0, "Multiple instances of SdkOutgoingRemoteCallSensor created");
      e.instance = this;
    }
  }
  a.SdkOutgoingRemoteCallSensor = e;
  a.getApis = function(f) {
    return {create:function(q) {
      const w = e.instance;
      if (null == w) {
        return f.logWarn((0,c.isDebug)(), "OutgoingRemoteCall", "traceOutgoingRemoteCall: no trace created as sensor is disabled"), new m.DummyOutgoingTaggableTracer();
      }
      if (!(0,c.isActive)()) {
        return f.logWarn(w.isDebugEnabled, "OutgoingRemoteCall", "traceOutgoingRemoteCall: no trace created as SDK is inactive"), new m.DummyOutgoingTaggableTracer();
      }
      if (!w.active) {
        return f.logWarn(w.isDebugEnabled, "OutgoingRemoteCall", "traceOutgoingRemoteCall: no trace created as sensor is not active"), new m.DummyOutgoingTaggableTracer();
      }
      if (!d(f, w.isDebugEnabled, q)) {
        return new m.DummyOutgoingTaggableTracer();
      }
      w.isDebugEnabled && p.debug(`${"OutgoingRemoteCall"}: create() data: ${t.inspect(q)}`);
      return new b(w, f, q);
    }};
  };
  class b extends m.OutgoingTaggableTracer {
    constructor(f, q, w) {
      super(f, q, "OutgoingRemoteCall", !0);
      this.startData = w;
    }
    startAsyncPath(f) {
      const q = new h(this.startData, this.sdkContext, this.isDebugEnabled);
      return this.tryStartAsyncActivation({sensorId:r.Agent.correlation.SensorId.NODEJS_ONEAGENTSDK, functionId:f, attachmentCreator:q, creator:r.Agent.correlation.Creator.ONEAGENT_SDK});
    }
  }
  class g extends n.AttachmentBase {
    constructor(f, q) {
      super(f, r.Agent.correlation.AttachmentId.REMOTE_CALL_CLIENT_ID, 0);
      this.debug = q;
    }
    fillEntryData(f, q) {
      this.setMultipleFields(w => {
        var G = r.Agent.correlation;
        const y = G.AttachmentFieldId;
        w.integer(y.REMOTE_CALL_PROTOCOL_TYPE_ID, G.RemoteCallWireProtocol.REMOTE_CALL_WIRE_PROTOCOL_ADK);
        "string" === typeof f.protocolName ? w.stringCached(y.REMOTE_CALL_PROTOCOL_NAME_ID, f.protocolName) : null != f.protocolName && q.logWarn(this.debug, "OutgoingRemoteCall", "traceOutgoingRemoteCall: ignoring invalid startData.protocolName");
        w.stringCached(y.REMOTE_CALL_SERVICE_METHOD_ID, f.serviceMethod);
        w.stringCached(y.REMOTE_CALL_SERVICE_NAME_ID, f.serviceName);
        w.stringCached(y.REMOTE_CALL_SERVICE_ENDPOINT_ID, f.serviceEndpoint);
        G = r.Agent.correlation.ChannelType;
        let D;
        if (null != f.host) {
          G = G.TCP_IP, D = f.host, w.stringCached(y.REMOTE_CALL_HOSTNAME_ID, f.host), "number" === typeof f.port && (w.integer(y.REMOTE_CALL_PORTNO_ID, f.port), D += `:${f.port}`);
        } else if (null != f.socketPath) {
          G = G.UNIX_DOMAIN_SOCKET, D = f.socketPath;
        } else if (null != f.pipeName) {
          G = G.NAMED_PIPE, D = f.pipeName;
        } else {
          switch(f.channelType) {
            case 1:
              G = G.TCP_IP;
              break;
            case 2:
              G = G.UNIX_DOMAIN_SOCKET;
              D = null;
              break;
            case 3:
              G = G.NAMED_PIPE;
              D = null;
              break;
            case 4:
              G = G.IN_PROCESS;
              break;
            default:
              G = G.OTHER;
          }
        }
        w.integer(y.REMOTE_CALL_CHANNEL_TYPE_ID, G);
        void 0 !== D && w.stringCachedOrUnavailable(y.REMOTE_CALL_CHANNEL_ENDPOINT_ID, D);
      });
    }
  }
  class h {
    constructor(f, q, w) {
      this.entryData = f;
      this.sdkContext = q;
      this.debug = w;
    }
    createAttachments(f) {
      f = new g(f, this.debug);
      if (f.valid) {
        try {
          f.fillEntryData(this.entryData, this.sdkContext);
        } catch (q) {
          l.logAgentException(q);
        }
      }
    }
  }
});
S("src/lib/agentapi/MessagingCommon", "require exports src/lib/Agent src/lib/AttachmentBase src/lib/agentapi/Common src/lib/util/CoreUtil src/lib/util/ErrorUtil".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MessagingAttachmentCreator = a.validateSystemInfo = void 0;
  a.validateSystemInfo = function(c) {
    return n.isObject(c) ? "string" !== typeof c.vendorName ? ".vendorName is invalid" : "string" !== typeof c.destinationName ? ".destinationName is invalid" : "number" !== typeof c.destinationType || 0 > c.destinationType || 1 < c.destinationType ? ".destinationType is invalid" : (0,r.validateConnectionInfo)(c) : " is not an object";
  };
  class k {
    constructor(c, m, d, e) {
      this.attachmentId = c;
      this.messagingSystem = m;
      this.moduleName = d;
      this.debug = e;
    }
    createAttachments(c) {
      c = new l(c, this.attachmentId);
      if (c.valid) {
        try {
          this.attachment = c, c.fillEntryData(this.messagingSystem);
        } catch (m) {
          p.logAgentException(m);
        }
      }
    }
    setVendorMessageId(c, m, d) {
      if (null != this.attachment) {
        if ("string" !== typeof c) {
          m.logWarn(this.debug, this.moduleName, `${d}: setVendorMessageId() vendorMessageId is no string`);
        } else {
          try {
            this.debug && u.Logger.debug(`${this.moduleName}: setVendorMessageId(): ${c}`), this.attachment.setStringCached(u.Agent.correlation.AttachmentFieldId.MESSAGING_NODE_VENDOR_MESSAGE_ID, c);
          } catch (e) {
            p.logAgentException(e);
          }
        }
      }
    }
    setCorrelationId(c, m, d) {
      if (null != this.attachment) {
        if ("string" !== typeof c) {
          m.logWarn(this.debug, this.moduleName, `${d}: setCorrelationId() correlationId is no string`);
        } else {
          try {
            this.debug && u.Logger.debug(`${this.moduleName}: setCorrelationId(): ${c}`), this.attachment.setStringCached(u.Agent.correlation.AttachmentFieldId.MESSAGING_NODE_VENDOR_CORRELATION_ID, c);
          } catch (e) {
            p.logAgentException(e);
          }
        }
      }
    }
  }
  a.MessagingAttachmentCreator = k;
  class l extends t.AttachmentBase {
    constructor(c, m) {
      super(c, m, 0);
    }
    fillEntryData(c) {
      this.setMultipleFields(m => {
        var d = u.Agent.correlation;
        const e = d.AttachmentFieldId;
        m.integer(e.MESSAGING_NODE_WILL_HAVE_DESTINATION_TYPE, 1);
        m.integer(e.MESSAGING_NODE_WILL_HAVE_TOPOLOGY, 1);
        m.integer(e.MESSAGING_NODE_WILL_HAVE_QUEUE_VENDOR_NAME, 1);
        this.id === d.AttachmentId.MESSAGING_SERVER_ID && m.integer(e.MESSAGING_NODE_TRANSMISSION_TYPE, d.TransmissionType.PROCESS);
        m.stringCached(e.MESSAGING_NODE_DESTINATION_TYPE, 0 === c.destinationType ? "QUEUE" : "TOPIC");
        m.stringCached(e.MESSAGING_NODE_DESTINATION, c.destinationName);
        m.stringCached(e.MESSAGING_NODE_QUEUE_VENDOR, c.vendorName);
        d = d.MessagingTopology;
        if (null != c.host) {
          m.integer(e.MESSAGING_NODE_TOPOLOGY, d.EXTERNAL), m.stringCached(e.MESSAGING_NODE_HOSTNAME, c.host), "number" === typeof c.port && m.integer(e.MESSAGING_NODE_PORT, c.port);
        } else if (null != c.socketPath || null != c.pipeName) {
          m.integer(e.MESSAGING_NODE_TOPOLOGY, d.EXTERNAL);
        } else {
          switch(c.channelType) {
            case 1:
            case 2:
            case 3:
              m.integer(e.MESSAGING_NODE_TOPOLOGY, d.EXTERNAL);
              break;
            case 4:
              m.integer(e.MESSAGING_NODE_TOPOLOGY, d.EMBEDDED);
              break;
            default:
              m.integer(e.MESSAGING_NODE_TOPOLOGY, d.NOT_SET);
          }
        }
      });
    }
  }
});
S("src/lib/agentapi/IncomingMessaging", "require exports assert util src/lib/Agent src/lib/Logger src/lib/agentapi/AgentApi src/lib/agentapi/Common src/lib/agentapi/MessagingCommon".split(" "), function(O, a, u, t, r, n, p, k, l) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.DummyIncomingMessageTracer = a.getApis = a.SdkIncomingMessagingSensor = void 0;
  class c extends k.SdkSensorBase {
    constructor(e, b) {
      super(e, b);
      u.strictEqual(c.instance, void 0, "Multiple instances of SdkIncomingMessagingSensor created");
      c.instance = this;
    }
  }
  a.SdkIncomingMessagingSensor = c;
  a.getApis = function(e) {
    return {create:function(b) {
      const g = c.instance;
      if (null == g) {
        return e.logWarn((0,p.isDebug)(), "IncomingMessaging", "traceIncomingMessage: no trace created as sensor is disabled"), new m();
      }
      if (!(0,p.isActive)()) {
        return e.logWarn(g.isDebugEnabled, "IncomingMessaging", "traceIncomingMessage: no trace created as SDK is inactive"), new m();
      }
      if (!g.active) {
        return e.logWarn(g.isDebugEnabled, "IncomingMessaging", "traceIncomingMessage: no trace created as sensor is not active"), new m();
      }
      const h = (0,l.validateSystemInfo)(b);
      if (null != h) {
        return e.logError(g.isDebugEnabled, "IncomingMessaging", `traceIncomingMessage: startData${h}`), new m();
      }
      g.isDebugEnabled && n.debug(`${"IncomingMessaging"}: create() data: ${t.inspect(b)}`);
      return new d(g, e, b);
    }};
  };
  class m extends k.DummyIncomingTracer {
    setVendorMessageId() {
      return this;
    }
    setCorrelationId() {
      return this;
    }
  }
  a.DummyIncomingMessageTracer = m;
  class d extends k.IncomingTaggableTracer {
    constructor(e, b, g) {
      super(e, b, "IncomingMessaging");
      this.startData = g;
    }
    setVendorMessageId(e) {
      null == this.attachmentCreator || this.state !== k.TracerState.STARTED ? this.sdkContext.logWarn(this.isDebugEnabled, "IncomingMessaging", "traceIncomingMessage: setVendorMessageId() shall be called on a started tracer") : this.attachmentCreator.setVendorMessageId(e, this.sdkContext, "traceIncomingMessage");
      return this;
    }
    setCorrelationId(e) {
      null == this.attachmentCreator || this.state !== k.TracerState.STARTED ? this.sdkContext.logWarn(this.isDebugEnabled, "IncomingMessaging", "traceIncomingMessage: setCorrelationId() shall be called on a started tracer") : this.attachmentCreator.setCorrelationId(e, this.sdkContext, "traceIncomingMessage");
      return this;
    }
    startAsyncPath(e) {
      this.attachmentCreator = new l.MessagingAttachmentCreator(r.Agent.correlation.AttachmentId.MESSAGING_SERVER_ID, this.startData, "IncomingMessaging", this.isDebugEnabled);
      const b = this.getLink(this.startData.dynatraceTag);
      return this.tryStartIncomingAsyncSubPath({sensorId:r.Agent.correlation.SensorId.NODEJS_ONEAGENTSDK, functionId:e, link:b, attachmentCreator:this.attachmentCreator, creator:r.Agent.correlation.Creator.ONEAGENT_SDK});
    }
  }
});
S("src/lib/agentapi/OutgoingMessaging", "require exports assert util src/lib/Agent src/lib/Logger src/lib/agentapi/AgentApi src/lib/agentapi/Common src/lib/agentapi/MessagingCommon".split(" "), function(O, a, u, t, r, n, p, k, l) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.DummyOutgoingMessageTracer = a.getApis = a.SdkOutgoingMessagingSensor = void 0;
  class c extends k.SdkSensorBase {
    constructor(e, b) {
      super(e, b);
      u.strictEqual(c.instance, void 0, "Multiple instances of SdkOutgoingMessagingSensor created");
      c.instance = this;
    }
  }
  a.SdkOutgoingMessagingSensor = c;
  a.getApis = function(e) {
    return {create:function(b) {
      const g = c.instance;
      if (null == g) {
        return e.logWarn((0,p.isDebug)(), "OutgoingMessaging", "traceOutgoingMessage: no trace created as sensor is disabled"), new m();
      }
      if (!(0,p.isActive)()) {
        return e.logWarn(g.isDebugEnabled, "OutgoingMessaging", "traceOutgoingMessage: no trace created as SDK is inactive"), new m();
      }
      if (!g.active) {
        return e.logWarn(g.isDebugEnabled, "OutgoingMessaging", "traceOutgoingMessage: no trace created as sensor is not active"), new m();
      }
      const h = (0,l.validateSystemInfo)(b);
      if (null != h) {
        return e.logError(g.isDebugEnabled, "OutgoingMessaging", `traceOutgoingMessage: startData${h}`), new m();
      }
      g.isDebugEnabled && n.debug(`${"OutgoingMessaging"}: create() data: ${t.inspect(b)}`);
      return new d(g, e, b);
    }};
  };
  class m extends k.DummyOutgoingTaggableTracer {
    setVendorMessageId() {
      return this;
    }
    setCorrelationId() {
      return this;
    }
  }
  a.DummyOutgoingMessageTracer = m;
  class d extends k.OutgoingTaggableTracer {
    constructor(e, b, g) {
      super(e, b, "OutgoingMessaging", !1);
      this.startData = g;
    }
    setVendorMessageId(e) {
      null == this.attachmentCreator || this.state !== k.TracerState.STARTED ? this.sdkContext.logWarn(this.isDebugEnabled, "OutgoingMessaging", "traceOutgoingMessage: setVendorMessageId() shall be called on a started tracer") : this.attachmentCreator.setVendorMessageId(e, this.sdkContext, "traceOutgoingMessage");
      return this;
    }
    setCorrelationId(e) {
      null == this.attachmentCreator || this.state !== k.TracerState.STARTED ? this.sdkContext.logWarn(this.isDebugEnabled, "OutgoingMessaging", "traceOutgoingMessage: setCorrelationId() shall be called on a started tracer") : this.attachmentCreator.setCorrelationId(e, this.sdkContext, "traceOutgoingMessage");
      return this;
    }
    startAsyncPath(e) {
      this.attachmentCreator = new l.MessagingAttachmentCreator(r.Agent.correlation.AttachmentId.MESSAGING_CLIENT_ID, this.startData, "OutgoingMessaging", this.isDebugEnabled);
      return this.tryStartAsyncActivation({sensorId:r.Agent.correlation.SensorId.NODEJS_ONEAGENTSDK, functionId:e, attachmentCreator:this.attachmentCreator, creator:r.Agent.correlation.Creator.ONEAGENT_SDK});
    }
  }
});
S("src/lib/agentapi/RequestAttributes", "require exports assert src/lib/util/ErrorUtil src/lib/Agent src/lib/AttachmentBase src/lib/SubPathContext src/lib/agentapi/AgentApi src/lib/agentapi/Common".split(" "), function(O, a, u, t, r, n, p, k, l) {
  function c(e, b, g) {
    const h = d.instance;
    if (null == h) {
      e.logWarn((0,k.isDebug)(), "RequestAttributes", "addCustomRequestAttribute: attribute not added as sensor is disabled");
    } else {
      if ((0,k.isActive)()) {
        if (h.active) {
          var f = h.isDebugEnabled;
          f && r.Logger.debug(`${"RequestAttributes"}: addCustomRequestAttribute() key: ${b}, value: ${g}`);
          if ("string" !== typeof b) {
            e.logError(h.isDebugEnabled, "RequestAttributes", "addCustomRequestAttribute: key is no string");
          } else {
            if ("string" !== typeof g && "number" !== typeof g) {
              e.logError(h.isDebugEnabled, "RequestAttributes", "addCustomRequestAttribute: value is no string nor a number");
            } else {
              try {
                const w = m(f);
                if (null == w) {
                  e.logWarn(h.isDebugEnabled, "RequestAttributes", `addCustomRequestAttribute: attribute <${b}> not added because no active trace context found`);
                } else {
                  var q = r.Agent.correlation;
                  (new n.AttachmentBase(w, q.AttachmentId.SERVICECALLATTRIBUTES_ID, 0, q.AttachmentTarget.CurrentNode)).setMultipleFields(G => {
                    const y = q.AttachmentFieldId;
                    G.stringCached(y.SERVICECALLATTRIBUTES_SERVICECALLATTRIBUTES_ATTRIBUTE_ID, b);
                    G.integer(y.SERVICECALLATTRIBUTES_SERVICECALLATTRIBUTES_ATTRIBUTE_CREATOR, q.Creator.ONEAGENT_SDK);
                    "string" === typeof g ? G.stringCached(y.ATTACHMENT_CAPTURED_ARG_STRING, g) : G.float(y.ATTACHMENT_CAPTURED_ARG_DOUBLE, g);
                  });
                }
              } catch (w) {
                t.logAgentException(w);
              }
            }
          }
        } else {
          e.logWarn(h.isDebugEnabled, "RequestAttributes", "addCustomRequestAttribute: attribute not added as sensor is not active");
        }
      } else {
        e.logWarn(h.isDebugEnabled, "RequestAttributes", "addCustomRequestAttribute: attribute not added as SDK is inactive");
      }
    }
  }
  function m(e) {
    const b = p.SubPathContext.getActiveContext();
    if (null == b) {
      e && r.Logger.debug("RequestAttributes: getActivation: no SPC");
    } else {
      var g = b.currentActivation;
      if (null != g) {
        return e && r.Logger.debug(`${"RequestAttributes"}: using activation ${g} from current spc ${b}`), g;
      }
      e && r.Logger.debug(`${"RequestAttributes"}: curr spc ${b} has not activation`);
      var h = b.parentExecutor;
      if (null != h) {
        g = h.currentActivation;
        if (null != g) {
          return e && r.Logger.debug(`${"RequestAttributes"}: using activation ${g} from parent spc ${h}, curSpc: ${b}`), g;
        }
        e && r.Logger.debug(`${"RequestAttributes"}: parent spc ${h} has not activation, curSpc: ${b}`);
      } else {
        e && r.Logger.debug(`${"RequestAttributes"}: no parentExecutor set on spc ${b}`);
      }
    }
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.getApis = a.SdkScavSensor = void 0;
  class d extends l.SdkSensorBase {
    constructor(e, b) {
      super(e, b);
      u.strictEqual(d.instance, void 0, "Multiple instances of SdkScavSensor created");
      d.instance = this;
    }
  }
  a.SdkScavSensor = d;
  a.getApis = function(e) {
    return {addCustomRequestAttribute:function(b, g) {
      return c(e, b, g);
    }};
  };
});
S("src/lib/agentapi/Metrics", "require exports src/lib/util/CoreUtil src/lib/Agent src/lib/RunTimeProperty src/lib/agentapi/AgentApi".split(" "), function(O, a, u, t, r, n) {
  function p(h, f, q, w) {
    const G = k.value;
    if (!(0,n.isActive)()) {
      return h.logWarn(G, "Metrics", `${f}: metric not created as SDK is inactive`), !1;
    }
    if ("string" !== typeof q || "" === q || 100 < Buffer.byteLength(q)) {
      return h.logError(G, "Metrics", `${f}: metric not created as name is invalid: ${q}`), !1;
    }
    if (null != w) {
      if (!u.isObject(w)) {
        return h.logError(G, "Metrics", `${f}: metric not created as options is no object`), !1;
      }
      if (null != w.unit && "string" !== typeof w.unit) {
        return h.logError(G, "Metrics", `${f}: metric not created as options.unit is invalid`), !1;
      }
      if (null != w.dimensionName && ("string" !== typeof w.dimensionName || "" === w.dimensionName)) {
        return h.logError(G, "Metrics", `${f}: metric not created as options.dimensionName is invalid`), !1;
      }
      G && t.Logger.debug(`${f}: name: ${q}, unit: ${w.unit}, dimensionName: ${w.dimensionName})`);
    } else {
      G && t.Logger.debug(`${f}: name: ${q}`);
    }
    return !0;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.testExports = a.getApis = void 0;
  const k = new r.BooleanProperty("SdkMetrics", !1);
  a.getApis = function(h) {
    return {createIntegerCounterMetric:function(f, q) {
      if (p(h, "createIntegerCounterMetric", f, q)) {
        try {
          var w = new e(h, f, t.Agent.metrics.MetricType.INTEGER_COUNTER, q);
        } catch (G) {
          h.logWarn(k.value, "Metrics", `createIntegerCounterMetric: failed to create metric: ${G.message}`), w = new l();
        }
      } else {
        w = new l();
      }
      return w;
    }, createFloatCounterMetric:function(f, q) {
      if (p(h, "createFloatCounterMetric", f, q)) {
        try {
          var w = new e(h, f, t.Agent.metrics.MetricType.FLOATING_POINT_COUNTER, q);
        } catch (G) {
          h.logWarn(k.value, "Metrics", `createFloatCounterMetric: failed to create metric: ${G.message}`), w = new l();
        }
      } else {
        w = new l();
      }
      return w;
    }, createIntegerGaugeMetric:function(f, q) {
      if (p(h, "createIntegerGaugeMetric", f, q)) {
        try {
          var w = new b(h, f, t.Agent.metrics.MetricType.INTEGER_GAUGE, q);
        } catch (G) {
          h.logWarn(k.value, "Metrics", `createIntegerGaugeMetric: failed to create metric: ${G.message}`), w = new c();
        }
      } else {
        w = new c();
      }
      return w;
    }, createFloatGaugeMetric:function(f, q) {
      if (p(h, "createFloatGaugeMetric", f, q)) {
        try {
          var w = new b(h, f, t.Agent.metrics.MetricType.FLOATING_POINT_GAUGE, q);
        } catch (G) {
          h.logWarn(k.value, "Metrics", `createFloatGaugeMetric: failed to create metric: ${G.message}`), w = new c();
        }
      } else {
        w = new c();
      }
      return w;
    }, createIntegerStatisticsMetric:function(f, q) {
      if (p(h, "createIntegerStatisticsMetric", f, q)) {
        try {
          var w = new g(h, f, t.Agent.metrics.MetricType.INTEGER_SUMMARY_STATISTICS, q);
        } catch (G) {
          h.logWarn(k.value, "Metrics", `createIntegerStatisticsMetric: failed to create metric: ${G.message}`), w = new m();
        }
      } else {
        w = new m();
      }
      return w;
    }, createFloatStatisticsMetric:function(f, q) {
      if (p(h, "createFloatStatisticsMetric", f, q)) {
        try {
          var w = new g(h, f, t.Agent.metrics.MetricType.FLOATING_POINT_SUMMARY_STATISTICS, q);
        } catch (G) {
          h.logWarn(k.value, "Metrics", `createFloatStatisticsMetric: failed to create metric: ${G.message}`), w = new m();
        }
      } else {
        w = new m();
      }
      return w;
    }};
  };
  class l {
    increaseBy() {
    }
  }
  class c {
    setValue() {
    }
  }
  class m {
    addValue() {
    }
  }
  class d {
    constructor(h, f, q, w = {}) {
      this.sdkContext = h;
      const {unit:G, dimensionName:y} = w;
      this.metric = new t.Agent.metrics.NiSdkMetric(q, f, G, y);
    }
    addSample(h, f) {
      if ((0,n.isActive)()) {
        if ("number" !== typeof h) {
          this.sdkContext.logError(k.value, "Metrics", "failed to record metric as value is not a number");
        } else {
          try {
            this.metric.addSample(h, f);
          } catch (q) {
            this.sdkContext.logWarn(k.value, "Metrics", `failed to record metric sample: ${q.message}`);
          }
        }
      }
    }
  }
  class e extends d {
    increaseBy(h, f) {
      this.addSample(h, f);
    }
  }
  class b extends d {
    setValue(h, f) {
      this.addSample(h, f);
    }
  }
  class g extends d {
    addValue(h, f) {
      this.addSample(h, f);
    }
  }
  a.testExports = {DummyCounterMetric:l, DummyGaugeMetric:c, DummyStatisticsMetric:m, CounterMetric:e, GaugeMetric:b, StatisticsMetric:g};
});
S("src/lib/agentapi/AgentApi", "require exports src/lib/CallbackWrappingHelper src/lib/SubPathContext src/lib/RunTimeProperty src/lib/Logger src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/agentapi/Common src/lib/agentapi/Database src/lib/agentapi/TraceContext src/lib/agentapi/IncomingRemoteCall src/lib/agentapi/OutgoingRemoteCall src/lib/agentapi/IncomingMessaging src/lib/agentapi/OutgoingMessaging src/lib/agentapi/RequestAttributes src/lib/agentapi/Metrics".split(" "), function(O, a, u, t, 
r, n, p, k, l, c, m, d, e, b, g, h, f) {
  function q() {
    return !B.value;
  }
  function w() {
    return v.value;
  }
  function G(z) {
    if ("function" !== typeof z) {
      return z;
    }
    let x = z;
    try {
      const A = t.SubPathContext.getActiveContext();
      null != A && (x = u.CallbackWrappingHelper.wrapCallbackContextPassing({spc:A, origCb:z}));
    } catch (A) {
      k.logAgentException(A);
    }
    return x;
  }
  function y() {
    return q() ? 0 : 1;
  }
  function D() {
    const z = new l.SdkContext(), x = c.getApis(z), A = m.getApis(z), C = d.getApis(z), E = e.getApis(z), I = b.getApis(z), H = g.getApis(z), F = h.getApis(z), K = f.getApis(z);
    return {passContext:G, traceSQLDatabaseRequest:x.createSQL, traceIncomingRemoteCall:C.create, traceOutgoingRemoteCall:E.create, traceIncomingMessage:I.create, traceOutgoingMessage:H.create, addCustomRequestAttribute:F.addCustomRequestAttribute, getCurrentState:y, createIntegerCounterMetric:K.createIntegerCounterMetric, createFloatCounterMetric:K.createFloatCounterMetric, createIntegerGaugeMetric:K.createIntegerGaugeMetric, createFloatGaugeMetric:K.createFloatGaugeMetric, createIntegerStatisticsMetric:K.createIntegerStatisticsMetric, 
    createFloatStatisticsMetric:K.createFloatStatisticsMetric, setLoggingCallbacks(L) {
      p.isObject(L) ? (z.warnCb = "function" === typeof L.warning ? L.warning : void 0, z.errorCb = "function" === typeof L.error ? L.error : void 0) : (z.warnCb = void 0, z.errorCb = void 0);
    }, getTraceContextInfo:A.traceContext};
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.getAgentApi = a.isDebug = a.isActive = a.isEnabled = void 0;
  const J = new r.BooleanProperty("SdkDisabled"), B = new r.BooleanProperty("SdkInactive"), v = new r.BooleanProperty("Sdk");
  a.isEnabled = function() {
    return !J.value;
  };
  a.isActive = q;
  a.isDebug = w;
  a.getAgentApi = function(z) {
    let x;
    switch(z) {
      case 1:
        x = {passContext:G};
        break;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        x = D();
    }
    w() && n.debug(`getAgentApi(${z}) returns ${x}`);
    return x;
  };
});
S("src/lib/agentapi/Database", "require exports assert util src/lib/Agent src/lib/AttachmentBase src/lib/SubPathContext src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/agentapi/AgentApi src/lib/agentapi/Common".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  function d(w, G, y, D) {
    return k.isObject(y) ? "string" !== typeof y.name ? (w.logError(G, "Database", "traceSQLDatabaseRequest: databaseInfo.name is invalid"), !1) : "string" !== typeof y.vendor ? (w.logError(G, "Database", "traceSQLDatabaseRequest: databaseInfo.vendor is invalid"), !1) : (y = (0,m.validateConnectionInfo)(y)) ? (w.logError(G, "Database", `traceSQLDatabaseRequest: databaseInfo${y}`), !1) : k.isObject(D) ? "string" !== typeof D.statement ? (w.logError(G, "Database", "traceSQLDatabaseRequest: startData.statement is invalid"), 
    !1) : !0 : (w.logError(G, "Database", "traceSQLDatabaseRequest: startData is not an object"), !1) : (w.logError(G, "Database", "traceSQLDatabaseRequest: databaseInfo is not an object"), !1);
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.getApis = a.SdkDatabaseSensor = a.DummyDatabaseRequestTracer = void 0;
  class e extends m.DummyOutgoingTracer {
    setResultData() {
      return this;
    }
  }
  a.DummyDatabaseRequestTracer = e;
  class b extends m.SdkSensorBase {
    constructor(w, G) {
      super(w, G);
      u.strictEqual(b.instance, void 0, "Multiple instances of SdkDatabaseSensor created");
      b.instance = this;
    }
  }
  a.SdkDatabaseSensor = b;
  a.getApis = function(w) {
    return {createSQL:function(G, y) {
      const D = b.instance;
      if (null == D) {
        return w.logWarn((0,c.isDebug)(), "Database", "traceSQLDatabaseRequest: no trace created as sensor is disabled"), new e();
      }
      if (!(0,c.isActive)()) {
        return w.logWarn(D.isDebugEnabled, "Database", "traceSQLDatabaseRequest: no trace created as SDK is inactive"), new e();
      }
      if (!D.active) {
        return w.logWarn(D.isDebugEnabled, "Database", "traceSQLDatabaseRequest: no trace created as sensor is not active"), new e();
      }
      if (!d(w, D.isDebugEnabled, G, y)) {
        return new e();
      }
      if (null == p.SubPathContext.getActiveContext()) {
        return w.logWarn(D.isDebugEnabled, "Database", "traceSQLDatabaseRequest: no trace created as no path is active"), new e();
      }
      D.isDebugEnabled && r.Logger.debug(`${"Database"}: createSql() info: ${t.inspect(G)}, data: ${t.inspect(y)}`);
      return new g(D, w, G, y);
    }};
  };
  class g extends m.OutgoingTracer {
    constructor(w, G, y, D) {
      super(w, G, "Database");
      this.databaseInfo = y;
      this.startData = D;
    }
    setResultData(w) {
      null == this.attachmentCreator || this.state !== m.TracerState.STARTED ? this.sdkContext.logWarn(this.isDebugEnabled, "Database", "traceSQLDatabaseRequest: setResultData() shall be called on a started tracer") : this.attachmentCreator.setResultData(w);
      return this;
    }
    startAsyncPath(w) {
      const G = r.Agent.correlation;
      this.attachmentCreator = new q(this.databaseInfo, this.startData, this.sdkContext, this.isDebugEnabled);
      return this.tryStartAsyncActivation({sensorId:G.SensorId.NODEJS_ONEAGENTSDK, attachmentCreator:this.attachmentCreator, category:G.MethodCategory.Database, creator:G.Creator.ONEAGENT_SDK, functionId:w});
    }
  }
  class h extends n.AttachmentBase {
    constructor(w, G) {
      super(w, r.Agent.correlation.AttachmentId.SQL_ID, 0);
      this.debug = G;
    }
    fillEntryData(w) {
      this.setString(r.Agent.correlation.AttachmentFieldId.SQL_STATEMENT, w.statement, r.Configuration.maxSqlStringLen);
    }
    fillResultData(w, G) {
      if (k.isObject(w)) {
        try {
          this.debug && r.Logger.debug(`${"Database"}: fillResultData(): rowsReturned=${w.rowsReturned}, roundTripCount=${w.roundTripCount}`);
          const y = r.Agent.correlation.AttachmentFieldId;
          this.setPositivNumber(w.rowsReturned, y.SQL_NUM_ROWS_RETURNED, "rowsReturned", G);
          this.setPositivNumber(w.roundTripCount, y.SQL_ROUND_TRIPS, "roundTripCount", G);
        } catch (y) {
          l.logAgentException(y);
        }
      } else {
        G.logWarn(this.debug, "Database", "traceSQLDatabaseRequest: resultData is not an object");
      }
    }
    setPositivNumber(w, G, y, D) {
      null != w && ("number" === typeof w && 0 <= w ? this.attachment.setFieldInteger(G, w) : D.logWarn(this.debug, "Database", `traceSQLDatabaseRequest: resultData.${y} holds no valid number`));
    }
  }
  class f extends n.AttachmentBase {
    constructor(w) {
      super(w, r.Agent.correlation.AttachmentId.CONNECTION_POOL_ID, 0);
    }
    fillEntryData(w) {
      null != this.attachment && this.setMultipleFields(G => {
        var y = r.Agent.correlation;
        const D = y.AttachmentFieldId;
        G.stringCached(D.CONNECTION_POOL_DB, w.name);
        G.stringCached(D.CONNECTION_POOL_DBTYPE, w.vendor);
        G.integer(D.CONNECTION_POOL_AGGREGATION_MECHANISM, y.DbAggregationMechanism.DB_AGGREGATION_MECHANISM_ADK_SQL);
        y = y.ConnectionPoolTopology;
        let J;
        if (null != w.host) {
          y = y.TOPOLOGY_SINGLE_SERVER, J = w.host, "number" === typeof w.port && G.integer(D.CONNECTION_POOL_DBPORTNO, w.port);
        } else if (null != w.socketPath) {
          y = y.TOPOLOGY_LOCAL_IPC, J = w.socketPath;
        } else if (null != w.pipeName) {
          y = y.TOPOLOGY_LOCAL_IPC, J = w.pipeName;
        } else {
          switch(w.channelType) {
            case 1:
              y = y.TOPOLOGY_SINGLE_SERVER;
              break;
            case 2:
            case 3:
              y = y.TOPOLOGY_LOCAL_IPC;
              break;
            case 4:
              y = y.TOPOLOGY_EMBEDDED;
              break;
            default:
              y = y.TOPOLOGY_NOT_SET;
          }
        }
        G.integer(D.CONNECTION_POOL_TOPOLOGY, y);
        G.stringCachedOrUnavailable(D.CONNECTION_POOL_DBHOST, J);
      });
    }
  }
  class q {
    constructor(w, G, y, D) {
      this.databaseInfo = w;
      this.entryData = G;
      this.sdkContext = y;
      this.debug = D;
    }
    createAttachments(w) {
      const G = new f(w);
      if (G.valid) {
        try {
          G.fillEntryData(this.databaseInfo, this.sdkContext);
        } catch (y) {
          l.logAgentException(y);
        }
      }
      w = new h(w, this.debug);
      if (w.valid) {
        try {
          this.sqlAttachment = w, w.fillEntryData(this.entryData);
        } catch (y) {
          l.logAgentException(y);
        }
      }
    }
    setResultData(w) {
      null != this.sqlAttachment && this.sqlAttachment.fillResultData(w, this.sdkContext);
    }
  }
});
S("src/lib/otel/OtelContextManagerTransformer", "require exports src/lib/Agent src/lib/Logger src/lib/Patch src/lib/SubPathContext src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/util/Reflection src/lib/otel/OpenTelemetrySensor src/lib/otel/Utils".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.OtelContextManagerTransformer = void 0;
  class d {
    constructor(e, b, g) {
      this.controlParams = e;
      this.otel = b;
      this.instrType = g;
      this.generateActiveSubstitute = h => {
        const f = this;
        return function() {
          var q;
          const w = f.controlParams.isDebugEnabled;
          if (!f.controlParams.active) {
            return w && t.debug("NoopContextManager.active(): instrumentation is disabled"), k.doInvoke(this, h.origFn, arguments);
          }
          w && t.debug(`NoopContextManager.active(): activeContext: ${null != f.activeContext}, isRoot: ${f.activeContext === f.otel.api.ROOT_CONTEXT}`);
          if (null != f.activeContext) {
            return f.activeContext;
          }
          let G = k.doInvoke(this, h.origFn, arguments);
          try {
            const y = n.SubPathContext.getActiveContext();
            if (null != y && null == f.otel.api.trace.getSpan(G)) {
              const D = y.getSpan(f.otel.api);
              null != D && (G = f.otel.api.trace.setSpan(G, D));
              if (w) {
                const J = null !== (q = null === D || void 0 === D ? void 0 : D.spanContext().spanId) && void 0 !== q ? q : "-";
                t.debug(`NoopContextManager.active(): injected spc: ${y}, spanId: ${J}, traceId: ${y.traceId}`);
              }
            }
          } catch (y) {
            p.logAgentException(y);
          }
          return G;
        };
      };
      this.generateBindSubstitute = h => {
        const f = this;
        return function(q, w) {
          var G = f.controlParams.isDebugEnabled;
          if (!f.controlParams.active) {
            return G && t.debug("NoopContextManager.bind(): instrumentation is disabled"), k.doInvoke(this, h.origFn, arguments);
          }
          G && t.debug(`NoopContextManager.bind(): target: ${typeof w}, context present: ${null != q}`);
          G = k.doInvoke(this, h.origFn, arguments);
          if ("function" === typeof G) {
            try {
              const y = G, D = this;
              function J(...B) {
                return D.with(q, y, this, ...B);
              }
              l.cloneFunctionProperties(J, y);
              l.copyPromisifyProperties(J, y);
              G = J;
            } catch (y) {
              p.logAgentException(y);
            }
          }
          return G;
        };
      };
      this.generateWithSubstitute = h => {
        const f = this, q = u.Agent.correlation.SensorId.NODEJS_OPENTELEMETRY;
        return function(...w) {
          const G = f.controlParams.isDebugEnabled;
          if (!f.controlParams.active) {
            return G && t.debug("NoopContextManager.with(): instrumentation is disabled"), k.doInvoke(this, h.origFn, w);
          }
          let y, D, J;
          try {
            const B = w[0];
            f.instrType === c.OpenTelemetryInstrumentationType.FOR_API && (J = f.activeContext, f.activeContext = B);
            const v = n.SubPathContext.getActiveContext();
            if (null == v || v.sensorId === q) {
              if (D = (0,m.getTrackerFromContext)(B, f.otel.api), null != D) {
                y = D.linkableSpc, y.activate();
              } else if ((0,m.isContext)(B)) {
                const z = f.otel.api.trace.getSpan(B);
                null != z && (y = m.spcEmbedder.get(z), null === y || void 0 === y ? void 0 : y.activate());
              }
            }
            G && (D = null !== D && void 0 !== D ? D : (0,m.getTrackerFromContext)(B, f.otel.api), t.debug(`NoopContextManager.with() activate spc: ${null !== y && void 0 !== y ? y : "-"}, ${null !== D && void 0 !== D ? D : "-"}, ${null !== v && void 0 !== v ? v : "-"}`));
          } catch (B) {
            p.logAgentException(B);
          }
          w = k.safeInvoke(this, h.origFn, w);
          try {
            f.instrType === c.OpenTelemetryInstrumentationType.FOR_API && (f.activeContext = J), null != y && (y.deactivate(), G && t.debug(`NoopContextManager.with() deactivate: ${null !== D && void 0 !== D ? D : "-"}, ${y}`));
          } catch (B) {
            p.logAgentException(B);
          }
          return w.rethrow();
        };
      };
    }
    applyTransformation(e) {
      var b = this.instrType === c.OpenTelemetryInstrumentationType.FOR_SDK ? {with:this.generateWithSubstitute} : {active:this.generateActiveSubstitute, bind:this.generateBindSubstitute, with:this.generateWithSubstitute};
      for (const [g, h] of Object.entries(b)) {
        b = new r.FunctionSpec(g, e), null == r.apply(b, h, r.cDefaultOptions) && t.warning(`Failed to patch NoopContextManagerTransformer.${g}`);
      }
    }
  }
  a.OtelContextManagerTransformer = d;
});
S("src/lib/otel/OtelSpanTransformer", "require exports util src/lib/Logger src/lib/Patch src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/otel/SpanTracker src/lib/otel/SpanAttachment".split(" "), function(O, a, u, t, r, n, p, k, l, c) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.OtelSpanTransformer = void 0;
  class m {
    constructor(d) {
      this.controlParams = d;
      this.generateSetAttributeSubstitute = e => {
        const b = this;
        return function(g, h) {
          try {
            const f = l.spanTrackerEmbedder.get(this);
            b.controlParams.isDebugEnabled && t.debug(`${f || "Span"} setAttribute - ${g}, ${h}`);
            null != f && (f.attributesAtEnd[g] = h);
          } catch (f) {
            p.logAgentException(f);
          }
          return k.doInvoke(this, e.origFn, arguments);
        };
      };
      this.generateSetAttributesSubstitute = e => {
        const b = this;
        return function(g) {
          try {
            const h = l.spanTrackerEmbedder.get(this);
            b.controlParams.isDebugEnabled && t.debug(`${h || "Span"} setAttributes - ${n.isObject(g) ? Object.entries(g) : "-"}`);
            null != h && n.isObject(g) && Object.assign(h.attributesAtEnd, g);
          } catch (h) {
            p.logAgentException(h);
          }
          return k.doInvoke(this, e.origFn, arguments);
        };
      };
      this.generateAddEventSubstitute = e => {
        function b(h) {
          return n.isObject(h) && !Array.isArray(h) && !(h instanceof Date);
        }
        const g = this;
        return function(h, f) {
          try {
            const q = l.spanTrackerEmbedder.get(this);
            g.controlParams.isDebugEnabled && t.debug(`${q || "Span"} addEvent - ${"string" === typeof h ? h : "-"}, ${b(f) ? Object.entries(f) : "-"}`);
            null != q && "string" === typeof h && q.addEvent(h, b(f) ? f : void 0);
          } catch (q) {
            p.logAgentException(q);
          }
          return k.doInvoke(this, e.origFn, arguments);
        };
      };
      this.generateSetStatusSubstitute = e => {
        const b = this;
        return function(g) {
          var h;
          try {
            const f = l.spanTrackerEmbedder.get(this);
            if (b.controlParams.isDebugEnabled) {
              const q = n.isObject(g) ? g : Object.create(null);
              t.debug(`${f || "Span"} setStatus - ${q.code}, ${null !== (h = q.message) && void 0 !== h ? h : "-"}`);
            }
            null != f && n.isObject(g) && (f.status = g);
          } catch (f) {
            p.logAgentException(f);
          }
          return k.doInvoke(this, e.origFn, arguments);
        };
      };
      this.generateUpdateNameSubstitute = e => {
        const b = this;
        return function(g) {
          try {
            const h = l.spanTrackerEmbedder.get(this);
            b.controlParams.isDebugEnabled && t.debug(`${h || "Span"} updateName - ${g}`);
            null != h && "string" === typeof g && (h.updateName = g);
          } catch (h) {
            p.logAgentException(h);
          }
          return k.doInvoke(this, e.origFn, arguments);
        };
      };
      this.generateEndSubstitute = e => {
        const b = this;
        return function(g) {
          var h;
          try {
            const f = l.spanTrackerEmbedder.get(this);
            b.controlParams.isDebugEnabled && t.debug(`${f || "Span"} end - ${null !== (h = u.inspect(g)) && void 0 !== h ? h : "-"}`);
            null === f || void 0 === f ? void 0 : f.onSpanEnd();
          } catch (f) {
            p.logAgentException(f);
          }
          return k.doInvoke(this, e.origFn, arguments);
        };
      };
      this.generateIsRecordingSubstitute = e => {
        const b = this;
        return function() {
          try {
            const g = l.spanTrackerEmbedder.get(this);
            b.controlParams.isDebugEnabled && t.debug(`${g || "Span"} isRecording - ${null === g || void 0 === g ? void 0 : g.isRecording}`);
            if (null === g || void 0 === g ? 0 : g.isRecording) {
              return !0;
            }
          } catch (g) {
            p.logAgentException(g);
          }
          return k.doInvoke(this, e.origFn, arguments);
        };
      };
      this.generateRecordExceptionSubstitute = e => {
        const b = this;
        return function(g) {
          try {
            const h = l.spanTrackerEmbedder.get(this);
            if (b.controlParams.isDebugEnabled) {
              const f = "string" === typeof g ? g : n.isObject(g) ? Object.entries(g) : "-";
              t.debug(`${h || "Span"} recordException - ${f}`);
            }
            if (null != h) {
              const f = (0,c.convertExceptionToAttributes)(g);
              null != f && h.addEvent(c.cExceptionEventName, f);
            }
          } catch (h) {
            p.logAgentException(h);
          }
          return k.doInvoke(this, e.origFn, arguments);
        };
      };
    }
    applyTransformation(d) {
      var e = {setAttribute:this.generateSetAttributeSubstitute, setAttributes:this.generateSetAttributesSubstitute, addEvent:this.generateAddEventSubstitute, setStatus:this.generateSetStatusSubstitute, updateName:this.generateUpdateNameSubstitute, end:this.generateEndSubstitute, isRecording:this.generateIsRecordingSubstitute, recordException:this.generateRecordExceptionSubstitute};
      for (const [b, g] of Object.entries(e)) {
        e = new r.FunctionSpec(b, d), null == r.apply(e, g, r.cDefaultOptions) && t.warning(`Failed to patch Span implementation. Affected function: ${b}`);
      }
    }
  }
  a.OtelSpanTransformer = m;
});
S("src/lib/otel/OtelPropagatorTransformer", "require exports util src/lib/Agent src/lib/Embedder src/lib/Logger src/lib/Patch src/lib/Tracing src/lib/sensors/SensorConstants src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/otel/Utils".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e) {
  function b(q) {
    if ("string" === typeof q) {
      return q;
    }
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.OtelPropagatorTransformer = a.getTraceContext = void 0;
  const g = r.create("TraceContext"), h = [l.cDtTaggingHeader, l.cW3cTraceParent, l.cW3cTraceState];
  a.getTraceContext = function(q, w) {
    if ((0,e.isContext)(q) && (q = w.trace.getSpan(q), c.isObject(q))) {
      return g.get(q);
    }
  };
  class f {
    constructor(q, w) {
      this.sensor = q;
      this.otel = w;
      this.generateInjectSubstitute = G => {
        const y = this;
        return function(D, J, B = y.otel.api.defaultTextMapSetter) {
          const v = y.sensor.isDebugEnabled;
          if (!y.sensor.active) {
            return v && n.debug("OtelPropagatorTransformer.inject() exit - instrumentation is disabled"), d.doInvoke(this, G.origFn, arguments);
          }
          const z = d.doInvoke(this, G.origFn, arguments);
          try {
            const x = (0,e.getTrackerFromContext)(D, y.otel.api);
            if (null != x && !x.methodActivation.isExited && y.sensor.config.shouldTag(x.getSpanInfo())) {
              const A = Object.create(null);
              d.doInvoke(this, G.origFn, [arguments[0], A]);
              const C = x.methodActivation.spc.createAddSerializeLink(!1, t.Agent.correlation.TaggingMode.DT_AND_TC, A);
              v && n.debug(`${x || "Span"} inject - ${x.methodActivation.spc}, ${k.Tracing.traceContextToString(C)}. InputHeaders: ${u.inspect(A)}`);
              null != C && (C.dtTag && B.set(J, l.cDtTaggingHeader, C.dtTag), C.traceparent && B.set(J, l.cW3cTraceParent, C.traceparent), C.tracestate && B.set(J, l.cW3cTraceState, C.tracestate));
            } else {
              v && n.debug(`${x || "Span"} inject - skip ${(null === x || void 0 === x ? void 0 : x.methodActivation.spc) || "-"}`);
            }
          } catch (x) {
            m.logAgentException(x);
          }
          return z;
        };
      };
      this.generateExtractSubstitute = G => {
        const y = this;
        return function(D, J, B = y.otel.api.defaultTextMapGetter) {
          const v = y.sensor.isDebugEnabled;
          if (!y.sensor.active) {
            return v && n.debug("OtelPropagatorTransformer.extract() exit - instrumentation is disabled"), d.doInvoke(this, G.origFn, arguments);
          }
          let z = d.doInvoke(this, G.origFn, arguments);
          try {
            if (!(0,e.isContext)(z)) {
              return v && n.debug(`OtelPropagatorTransformer.extract() exit because orig returned no context ${typeof z}`), z;
            }
            const x = b(B.get(J, l.cDtTaggingHeader)), A = b(B.get(J, l.cW3cTraceParent)), C = A ? b(B.get(J, l.cW3cTraceState)) : void 0;
            v && n.debug(`OtelPropagatorTransformer.extract() exit dtTag: ${x}, traceparent: ${A}, tracestate: ${C}`);
            if (x || A) {
              B = {dtTag:x, traceparent:A, tracestate:C};
              let E = y.otel.api.trace.getSpan(z);
              if (null == E) {
                const I = Object.assign({}, y.otel.api.INVALID_SPAN_CONTEXT, {isRemote:!0});
                z = y.otel.api.trace.setSpanContext(z, I);
                E = y.otel.api.trace.getSpan(z);
              }
              g.set(E, B);
            }
          } catch (x) {
            m.logAgentException(x);
          }
          return z;
        };
      };
      this.generateFieldsSubstitute = G => {
        const y = this;
        return function() {
          const D = y.sensor.isDebugEnabled;
          if (!y.sensor.active) {
            return D && n.debug("OtelPropagatorTransformer.fields() exit - instrumentation is disabled"), d.doInvoke(this, G.origFn, arguments);
          }
          let J = d.doInvoke(this, G.origFn, arguments);
          try {
            J = Array.isArray(J) ? [...(new Set([...h, ...J]))] : h.slice(), D && n.debug(`OtelPropagatorTransformer.fields() ${J}`);
          } catch (B) {
            m.logAgentException(B);
          }
          return J;
        };
      };
    }
    applyTransformation(q) {
      var w = {inject:this.generateInjectSubstitute, extract:this.generateExtractSubstitute, fields:this.generateFieldsSubstitute};
      for (const [G, y] of Object.entries(w)) {
        w = new p.FunctionSpec(G, q), null == p.apply(w, y, p.cDefaultOptions) && n.warning(`Failed to patch TextMapPropagator implementation. Affected function: ${G}`);
      }
    }
  }
  a.OtelPropagatorTransformer = f;
});
S("src/lib/otel/OtelTracerTransformer", "require exports src/lib/Agent src/lib/Embedder src/lib/FunctionId src/lib/Logger src/lib/MethodActivation src/lib/Patch src/lib/SubPathContext src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/otel/OtelPropagatorTransformer src/lib/otel/OpenTelemetrySensor src/lib/otel/SpanTracker src/lib/otel/Utils".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h) {
  function f(G, y) {
    switch(G) {
      case y.SpanKind.CLIENT:
        return 2;
      case y.SpanKind.CONSUMER:
        return 4;
      case y.SpanKind.INTERNAL:
        return 0;
      case y.SpanKind.PRODUCER:
        return 3;
      case y.SpanKind.SERVER:
        return 1;
    }
    return 5;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.OtelTracerTransformer = void 0;
  const q = t.create("ParentSpan");
  class w {
    constructor(G, y, D) {
      this.sensor = G;
      this.otel = y;
      this.instrumentationType = D;
      this.logPrefix = this.isInstrumentedFor(b.OpenTelemetryInstrumentationType.FOR_API) ? "ProxyTracer" : "Tracer";
      this.generateStartSpanSubstitute = J => {
        const B = this, v = new r.VirtualNodeFunctionId(new r.FunctionId("Span", "OpenTelemetry", -1)), z = u.Agent.correlation.SensorId.NODEJS_OPENTELEMETRY, x = (A, C) => {
          A = B.isInstrumentedFor(b.OpenTelemetryInstrumentationType.FOR_API) ? A : A.instrumentationLibrary;
          return "string" === typeof A[C] ? A[C] : void 0;
        };
        return function(...A) {
          var C, E;
          const I = B.sensor.isDebugEnabled;
          if (I) {
            const Q = A[1];
            n.debug(`${B.logPrefix}.startSpan() - tracer: ${x(this, "name")} ${null !== (C = x(this, "version")) && void 0 !== C ? C : "-"}, spanName: ${A[0]}, kind: ${null === Q || void 0 === Q ? void 0 : Q.kind}`);
          }
          if (!B.sensor.active) {
            return I && n.debug(`${B.logPrefix}.startSpan() exit - inactive`), d.doInvoke(this, J.origFn, A);
          }
          C = d.doInvoke(this, J.origFn, A);
          try {
            if (B.skipCallPostProcessing(this)) {
              return C;
            }
            var H;
            let Q, R, T;
            const U = c.isObject(A[1]) ? A[1] : {}, V = l.SubPathContext.getActiveContext(), Z = null != V && V.sensorId !== z;
            let ba;
            Z && (ba = H = V);
            if (!U.root) {
              const da = (0,h.isContext)(A[2]) ? A[2] : B.otel.api.context.active();
              let ja = B.otel.api.trace.getSpan(da);
              if (null != ja) {
                const ka = q.get(ja);
                null != ka && (B.sensor.debugFlagName && n.debug(`${B.logPrefix}.getParentSpan() use parent of suppressed span`), ja = ka);
              }
              R = ja;
              if (null != R) {
                if (T = g.spanTrackerEmbedder.get(R), null != T) {
                  H = Z ? V === T.linkableSpc ? T.methodActivation.spc : V : T.linkableSpc;
                } else {
                  if (!Z) {
                    if (H = h.spcEmbedder.get(R), null == H) {
                      const ka = (0,e.getTraceContext)(da, B.otel.api);
                      null != ka && (Q = u.Agent.correlation.deserializeLinkFromString(ka.dtTag, ka.traceparent, ka.tracestate));
                    } else {
                      ba = H;
                    }
                  }
                }
              }
            }
            if (B.sensor.isDebugEnabled) {
              const da = null === R || void 0 === R ? void 0 : R.spanContext();
              n.debug(`${B.logPrefix}.getParentSpc() curSpc: ${V}, parentSpc: ${H}, link: ${Q}, root: ${U.root}, ` + `parentSpan: ${null != da ? `${da.traceId}:${da.spanId}` : "-"} ` + `parentTracker: ${null === T || void 0 === T ? void 0 : T.linkableSpc}, ${null === T || void 0 === T ? void 0 : T.methodActivation.spc}`);
            }
            const [W, X, ea] = [H, ba, Q];
            var F, K, L, M = A[1], N = B.otel.api;
            let Y;
            H = 0;
            c.isObject(M) && ("number" === typeof M.kind && (H = f(M.kind, N)), c.isObject(M.attributes) && (Y = M.attributes));
            const [ha, la] = [H, Y], ia = {name:"string" === typeof A[0] ? A[0] : void 0, kind:ha, attributes:la, libraryName:x(this, "name"), libraryVersion:x(this, "version")};
            B.sensor.isDebugEnabled && n.info(`${B.logPrefix}.getSpanInfo() name: ${null !== (F = ia.name) && void 0 !== F ? F : "-"}, kind: ${ha}, libraryName: ${null !== (K = ia.libraryName) && void 0 !== K ? K : "-"}, libraryVersion: ${null !== (L = ia.libraryVersion) && void 0 !== L ? L : "-"}`);
            var P = ia;
            if (!B.sensor.config.shouldCapture(P)) {
              if (null != W) {
                const da = W.getSpan(B.otel.api);
                if (null != da) {
                  if (B.isSpanContextAlteringAllowed(C.spanContext())) {
                    const ja = Object.assign({}, da.spanContext());
                    ja.traceFlags = B.otel.api.TraceFlags.NONE;
                    h.spanModifiedEmbedder.set(ja, !0);
                    C._spanContext = ja;
                  }
                  q.set(C, da);
                }
              }
              I && n.debug(`${B.logPrefix}.startSpan(): exit don't capture`);
              return C;
            }
            let fa;
            if (null != W) {
              fa = W.spawnSubPath(z, !1);
            } else {
              if (!((null === ea || void 0 === ea ? 0 : ea.valid) || B.sensor.entrypoint && B.sensor.config.isEntrypoint(P))) {
                return I && n.debug(`${B.logPrefix}.startSpan(): exit no entry point`), C;
              }
              fa = new l.SubPathContext({link:ea, sensorId:z});
            }
            fa.didInitiateAsyncOp = !0;
            let ca;
            if (fa.valid && (ca = new g.SpanTracker(P, null !== X && void 0 !== X ? X : fa, B.otel.api, B.sensor.isDebugEnabled), ca.methodActivation = new p.MethodActivation({functionId:v, mode:2, spc:fa, attachmentCreator:ca, endSpcOnExit:!0}), g.spanTrackerEmbedder.set(C, ca), B.isSpanContextAlteringAllowed(C.spanContext()))) {
              const da = Object.assign({}, C.spanContext());
              da.traceId = fa.traceId;
              da.spanId = ca.methodActivation.spanId;
              da.traceFlags = fa.isIgnoredPath ? da.traceFlags & ~B.otel.api.TraceFlags.SAMPLED : da.traceFlags | B.otel.api.TraceFlags.SAMPLED;
              h.spanModifiedEmbedder.set(da, !0);
              C._spanContext = da;
              ca.methodActivation.setSpan(C);
            }
            I && n.debug(`${B.logPrefix}.startSpan(): exit ${null !== ca && void 0 !== ca ? ca : "-"}, ${null !== (E = null === ca || void 0 === ca ? void 0 : ca.methodActivation.spc.toString(!0)) && void 0 !== E ? E : "-"}`);
          } catch (Q) {
            m.logAgentException(Q);
          }
          return C;
        };
      };
      this.generateStartActiveSpanSubstitute = J => {
        const B = this;
        return function(...v) {
          const z = B.sensor.isDebugEnabled;
          if (!B.sensor.active) {
            return z && n.debug(`${B.logPrefix}.startActiveSpan() exit - inactive`), d.doInvoke(this, J.origFn, arguments);
          }
          z && n.debug(`${B.logPrefix}.startActiveSpan(): argCnt: ${v.length}, type: ${typeof v[v.length - 1]}`);
          return d.doInvoke(this, B.isInstrumentedFor(b.OpenTelemetryInstrumentationType.FOR_API) ? B.otel.NoopTracer.prototype.startActiveSpan : J.origFn, v);
        };
      };
    }
    applyTransformation(G) {
      var y = {startSpan:this.generateStartSpanSubstitute, startActiveSpan:this.generateStartActiveSpanSubstitute};
      for (const [D, J] of Object.entries(y)) {
        y = new k.FunctionSpec(D, G), null == k.apply(y, J, k.cDefaultOptions) && n.warning(`Failed to patch Tracer implementation. Affected function: ${D}`);
      }
    }
    isInstrumentedFor(G) {
      return G === this.instrumentationType;
    }
    skipCallPostProcessing(G) {
      return this.isInstrumentedFor(b.OpenTelemetryInstrumentationType.FOR_API) && G.hasOwnProperty("_delegate");
    }
    isSpanContextAlteringAllowed(G) {
      return this.isInstrumentedFor(b.OpenTelemetryInstrumentationType.FOR_API) && (G === this.otel.api.INVALID_SPAN_CONTEXT || !0 === h.spanModifiedEmbedder.get(G));
    }
  }
  a.OtelTracerTransformer = w;
});
S("src/lib/otel/RegisterSdkTransformers", ["require", "exports", "src/lib/Logger", "src/lib/util/InvocationUtil"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.SetGlobalTracerProviderTransformer = a.SetGlobalPropagatorTransformer = a.SetGlobalContextManagerTransformer = void 0;
  class r {
    constructor(k) {
      this.sensor = k;
    }
    generateSubstitute(k) {
      const l = this;
      return function(c) {
        if (!l.sensor.active) {
          return u.info(`setGlobalContextManager() - ContextManager registered (active: ${l.sensor.active})`), t.doInvoke(this, k.origFn, arguments);
        }
        u.info("setGlobalContextManager() - Suppress ContextManager registration");
        return !0;
      };
    }
  }
  a.SetGlobalContextManagerTransformer = r;
  class n {
    constructor(k) {
      this.sensor = k;
    }
    generateSubstitute(k) {
      const l = this;
      return function(c) {
        if (!l.sensor.active) {
          return u.info(`setGlobalPropagator() - Propagator registered (active: ${l.sensor.active})`), t.doInvoke(this, k.origFn, arguments);
        }
        u.info("setGlobalPropagator() - Suppress Propagator registration");
        return !0;
      };
    }
  }
  a.SetGlobalPropagatorTransformer = n;
  class p {
    constructor(k) {
      this.sensor = k;
    }
    generateSubstitute(k) {
      const l = this;
      return function() {
        if (!l.sensor.active) {
          return u.info(`setGlobalTracerProvider() - TracerProvider registered (active: ${l.sensor.active})`), t.doInvoke(this, k.origFn, arguments);
        }
        u.info("setGlobalTracerProvider() - Suppress TracerProvider registration");
        return !0;
      };
    }
  }
  a.SetGlobalTracerProviderTransformer = p;
});
S("src/lib/otel/OpenTelemetrySensor", "require exports src/lib/Debug src/lib/Logger src/lib/Patch src/lib/Tracing src/lib/sensors/SensorBase src/lib/otel/OtelContextManagerTransformer src/lib/otel/OtelSpanTransformer src/lib/otel/OtelPropagatorTransformer src/lib/otel/OtelTracerTransformer src/lib/otel/RegisterSdkTransformers src/lib/otel/SpanSensorConfig src/lib/RunTimeProperty".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e, b) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.OpenTelemetrySensor = a.OpenTelemetryInstrumentationType = void 0;
  var g;
  (function(f) {
    f[f.FOR_API = 0] = "FOR_API";
    f[f.FOR_SDK = 1] = "FOR_SDK";
  })(g = a.OpenTelemetryInstrumentationType || (a.OpenTelemetryInstrumentationType = {}));
  class h extends p.SensorBase {
    constructor(f, q) {
      super(f, q);
      this.instrumentOTelSdk = (new b.BooleanOption("InstrumentOTelSdk", !0)).value;
      this.config = new e.SpanSensorConfig(q);
      n.Tracing.isOpenTelemetryEnabled = this.active;
    }
    updateState(f) {
      super.updateState(f);
      this.config.update(f);
      n.Tracing.isOpenTelemetryEnabled = this.active;
    }
    applyInstrumentation(f, q) {
      switch(q.ruleKey) {
        case "Module.main":
          h.instrumentationRegistry = {};
          null != h.lastSeenInstrumentationRegistry && t.warning(`OpenTelemetrySensor: API already instrumented for version: ${h.lastSeenInstrumentationRegistry.version}.` + `New module version: ${f.moduleInfo.version}`);
          h.lastSeenInstrumentationRegistry = h.instrumentationRegistry;
          this.patchProxyTracer(f);
          h.instrumentationRegistry.api = f.moduleExports;
          h.instrumentationRegistry.version = f.moduleInfo.version;
          null == h.instrumentationRegistry.NoopTracer && t.warning("OpenTelemetrySensor didn't load NoopTracer");
          h.instrumentationRegistry = void 0;
          break;
        case "OpenTelemetry.SDK":
          this.patchSDK(f);
          break;
        case "OpenTelemetry.NonRecordingSpan":
          this.patchNonRecordingSpan(f);
          break;
        case "OpenTelemetry.ContextAPI":
          this.patchSetGlobalContextManager(f);
          break;
        case "OpenTelemetry.PropagationAPI":
          this.patchSetGlobalPropagator(f);
          this.patchPropagator(f, "PropagationAPI");
          break;
        case "OpenTelemetry.TraceAPI":
          this.patchSetGlobalTracerProvider(f);
          break;
        case "OpenTelemetry.NoopContextManager":
          this.patchContextManager("NoopContextManager", f.moduleExports.NoopContextManager.prototype, g.FOR_API);
          break;
        case "OpenTelemetry.ContextAsyncHooks":
          this.patchContextManager("AsyncLocalStorageContextManager", f.moduleExports.AsyncLocalStorageContextManager.prototype, g.FOR_SDK);
          this.patchContextManager("AsyncHooksContextManager", f.moduleExports.AsyncHooksContextManager.prototype, g.FOR_SDK);
          break;
        case "OpenTelemetry.NoopTracer":
          null != h.instrumentationRegistry ? h.instrumentationRegistry.NoopTracer = f.moduleExports.NoopTracer : (t.warning("OpenTelemetrySensor.instrumentationRegistry is null during loading NoopTracer"), u.fail());
      }
    }
    patchProxyTracer(f) {
      null != h.instrumentationRegistry ? (f = new r.ModuleSpec("ProxyTracer", f.moduleExports.ProxyTracer.prototype), (new m.OtelTracerTransformer(this, h.instrumentationRegistry, g.FOR_API)).applyTransformation(f)) : (t.warning("OpenTelemetrySensor.instrumentationRegistry is null in patchProxyTracer"), u.fail());
    }
    patchSDK(f) {
      if (this.instrumentOTelSdk) {
        const q = new r.ModuleSpec("Tracer", f.moduleExports.Tracer.prototype);
        null != h.lastSeenInstrumentationRegistry ? ((new m.OtelTracerTransformer(this, h.lastSeenInstrumentationRegistry, g.FOR_SDK)).applyTransformation(q), f = new r.ModuleSpec("Span", f.moduleExports.Span.prototype), (new l.OtelSpanTransformer(this)).applyTransformation(f)) : (t.warning("OpenTelemetrySensor.lastSeenInstrumentationRegistry is null in patchSDK after loading the tracer module"), u.fail());
      }
    }
    patchNonRecordingSpan(f) {
      f = new r.ModuleSpec("NonRecordingSpan", f.moduleExports.NonRecordingSpan.prototype);
      (new l.OtelSpanTransformer(this)).applyTransformation(f);
    }
    patchContextManager(f, q, w) {
      null != h.lastSeenInstrumentationRegistry ? (f = new r.ModuleSpec(f, q), (new k.OtelContextManagerTransformer(this, h.lastSeenInstrumentationRegistry, w)).applyTransformation(f)) : (t.warning("OpenTelemetrySensor.lastSeenInstrumentationRegistry is null in patchContextManager"), u.fail());
    }
    patchPropagator(f, q) {
      null != h.instrumentationRegistry ? (f = new r.ModuleSpec(q, f.moduleExports[q].prototype), (new c.OtelPropagatorTransformer(this, h.instrumentationRegistry)).applyTransformation(f)) : (t.warning(`OpenTelemetrySensor.instrumentationRegistry is null in ${q}`), u.fail());
    }
    patchSetGlobalContextManager(f) {
      if (!this.instrumentOTelSdk) {
        var q = new r.FunctionSpec("setGlobalContextManager", "ContextAPI", f.moduleExports.ContextAPI.prototype), w = new d.SetGlobalContextManagerTransformer(this);
        null == r.applyToSingle(q, w) && (t.warning(`Failed to patch ${f.request}.${"ContextAPI"}.${"setGlobalContextManager"}`), u.fail());
      }
    }
    patchSetGlobalPropagator(f) {
      if (!this.instrumentOTelSdk) {
        var q = new r.FunctionSpec("setGlobalPropagator", "PropagationAPI", f.moduleExports.PropagationAPI.prototype), w = new d.SetGlobalPropagatorTransformer(this);
        null == r.applyToSingle(q, w) && (t.warning(`Failed to patch ${f.request}.${"PropagationAPI"}.${"setGlobalPropagator"}`), u.fail());
      }
    }
    patchSetGlobalTracerProvider(f) {
      if (!this.instrumentOTelSdk) {
        var q = new r.FunctionSpec("setGlobalTracerProvider", "TraceAPI", f.moduleExports.TraceAPI.prototype), w = new d.SetGlobalTracerProviderTransformer(this);
        null == r.applyToSingle(q, w) && (t.warning(`Failed to patch ${f.request}.${"TraceAPI"}.${"setGlobalTracerProvider"}`), u.fail());
      }
    }
  }
  h.instrumentationRegistry = void 0;
  h.lastSeenInstrumentationRegistry = void 0;
  a.OpenTelemetrySensor = h;
});
S("src/lib/logenrichment/WinstonTransformer", "require exports src/lib/Logger src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.WinstonTransformer = void 0;
  class p {
    constructor(k) {
      this.sensor = k;
    }
    generateSubstitute(k) {
      const l = this;
      return function(c) {
        const m = l.sensor.isDebugEnabled;
        if (!l.sensor.active || l.sensor.winstonEnrichmentDisabled.value) {
          return m && u.debug("WinstonTransformer: inactive"), n.doInvoke(this, k.origFn, arguments);
        }
        if (!(0,t.isObject)(c)) {
          return m && u.debug("WinstonTransformer: arguments[0] is no object"), n.doInvoke(this, k.origFn, arguments);
        }
        try {
          if (l.sensor.unstructuredEnrichmentEnabled) {
            if ("string" === typeof c.message) {
              const d = l.sensor.getEnrichmentString("WinstonTransformer");
              null != d && (c.message = d + c.message);
            } else {
              m && u.debug(`WinstonTransformer: failed to inject into type ${typeof c.message}`);
            }
          } else {
            l.sensor.enrichLogInfo(c, "WinstonTransformer");
          }
        } catch (d) {
          r.logAgentException(d);
        }
        return n.doInvoke(this, k.origFn, arguments);
      };
    }
  }
  a.WinstonTransformer = p;
});
S("src/lib/logenrichment/PinoTransformer", ["require", "exports", "src/lib/Logger", "src/lib/util/ErrorUtil"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.PinoTransformer = void 0;
  class r {
    constructor(n) {
      this.sensor = n;
    }
    getMixinFunction() {
      const n = this;
      return function() {
        try {
          var p = n.sensor.isDebugEnabled;
          if (!n.sensor.active || n.sensor.pinoEnrichmentDisabled.value) {
            return p && u.debug("PinoTransformer: inactive"), {};
          }
          p = {};
          n.sensor.enrichLogInfo(p, "PinoTransformer");
          return p;
        } catch (k) {
          t.logAgentException(k);
        }
        return {};
      };
    }
    getDtPino(n) {
      function p(...l) {
        const c = k.sensor.isDebugEnabled;
        if (0 === l.length) {
          return c && u.debug("pinoSubstitute: inject mixin function on no-arguments instance"), n({mixin:k.getMixinFunction()});
        }
        if (1 === l.length) {
          var m = l[0];
          if ("string" === typeof m || "function" === typeof(null === m || void 0 === m ? void 0 : m.write)) {
            return c && u.debug("pinoSubstitute: pino has stream only as parameter, add mixin function"), l.splice(0, 0, {mixin:k.getMixinFunction()}), n(...l);
          }
        }
        c && u.debug("pinoSubstitute: both opts and stream available");
        m = l[0];
        if (null == m.mixin) {
          return c && u.debug("pinoSubstitute: no mixin available. adding dtMixin"), m.mixin = k.getMixinFunction(), n(...l);
        }
        c && u.debug("pinoSubstitute: mixin already available. Additional dtMixin added");
        const d = m.mixin, e = k.getMixinFunction();
        m.mixin = (...b) => Object.assign({}, Reflect.apply(d, void 0, b), e());
        return n(...l);
      }
      const k = this;
      Object.assign(p, n);
      return p;
    }
  }
  a.PinoTransformer = r;
});
S("src/lib/logenrichment/LogEnrichmentSensor", "require exports src/lib/Agent src/lib/Debug src/lib/Logger src/lib/Patch src/lib/sensors/SensorBase src/lib/logenrichment/WinstonTransformer src/lib/logenrichment/PinoTransformer src/lib/RunTimeProperty src/lib/SubPathContext".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.LogEnrichmentSensor = void 0;
  class d extends p.SensorBase {
    constructor(e, b) {
      super(e, b);
      this._unstructuredEnrichmentEnabled = this._metadataEnrichmentEnabled = !1;
      this.pinoEnrichmentDisabled = new c.BooleanProperty("PinoEnrichmentDisabled", !1);
      this.winstonEnrichmentDisabled = new c.BooleanProperty("WinstonEnrichmentDisabled", !1);
      this.updateConfig(b);
    }
    updateState(e) {
      super.updateState(e);
      this.updateConfig(e);
    }
    applyInstrumentation(e, b) {
      null == d.metaData && (d.metaData = u.Agent.nativeAgent.readEnrichmentMetadataFile());
      if ("LogEnrichment.Pino.Logger" === b.ruleKey) {
        var g = e.moduleExports;
        const h = (new l.PinoTransformer(this)).getDtPino(g);
        e.moduleExports.default === g && (h.default = h);
        e.moduleExports.pino === g && (h.pino = h);
        e.moduleExports = h;
        const f = new n.SubstitutedFnDescriptor(new n.FunctionSpec("pino", "", h), g, !1);
        n.tag(f, h, g);
      }
      "LogEnrichment.Winston.Logger" === b.ruleKey && (b = new n.FunctionSpec("write", "Logger", e.moduleExports.prototype), g = new k.WinstonTransformer(this), null == n.applyToSingle(b, g, n.cOverrideDefaultOptions) && (r.warning(`Failed to patch ${e.request}.${"Logger"}.${"write"}`), t.fail()));
    }
    enrichLogInfo(e, b) {
      this.metadataEnrichmentEnabled && Object.assign(e, d.metaData);
      const g = this.isDebugEnabled, h = m.SubPathContext.getActiveContext();
      if (null != h) {
        const f = h.spanId, q = h.traceId;
        f !== m.cInvalidSpanId && q !== m.cInvalidTraceId ? (g && r.debug(`${b}: inject trace_id-span_Id: ${q}-${f} from ${h}. spc.isIgnoredPath: ${h.isIgnoredPath}`), e[d.traceIdKey] = q, e[d.spanIdKey] = f, e[d.traceSampledKey] = h.isIgnoredPath ? "false" : "true") : g && r.debug(`${b}: skip inject trace_id-span_Id: ${q}-${f} from ${h}`);
      } else {
        g && r.debug(`${b}: no active SPC`);
      }
    }
    getEnrichmentString(e) {
      const b = Object.create(null);
      this.enrichLogInfo(b, e);
      e = Object.entries(b);
      if (0 < e.length) {
        return `[!dt ${e.map(([g, h]) => `${g}=${h}`).join(",")}] `;
      }
    }
    updateConfig(e) {
      var b, g, h, f;
      this._metadataEnrichmentEnabled = null !== (g = !0 === (null === (b = e.sensorProperties) || void 0 === b ? void 0 : b.metadataEnrichmentEnabled)) && void 0 !== g ? g : !1;
      this._unstructuredEnrichmentEnabled = null !== (f = !0 === (null === (h = e.sensorProperties) || void 0 === h ? void 0 : h.unstructuredLogEnrichmentEnabled)) && void 0 !== f ? f : !1;
      this.isDebugEnabled && r.debug(`Update metadataEnrichmentEnabled to: ${this.metadataEnrichmentEnabled}, unstructuredEnrichmentEnabled to ${this.unstructuredEnrichmentEnabled}`);
    }
    get metadataEnrichmentEnabled() {
      return this._metadataEnrichmentEnabled;
    }
    get unstructuredEnrichmentEnabled() {
      return this._unstructuredEnrichmentEnabled;
    }
  }
  d.traceIdKey = "dt.trace_id";
  d.spanIdKey = "dt.span_id";
  d.traceSampledKey = "dt.trace_sampled";
  a.LogEnrichmentSensor = d;
});
S("src/lib/sensors/GraphQLAttachment", ["require", "exports", "src/lib/Agent", "src/lib/AttachmentBase", "src/lib/Logger"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.GraphQLAttachment = void 0;
  class n extends t.AttachmentBase {
    constructor(p, k) {
      super(p, u.Agent.correlation.AttachmentId.SPAN_ID, u.Agent.correlation.SpanAttachmentSdsVersion.V2);
      this.activation = p;
      (this.debug = k) && r.debug("GraphQLAttachment created.");
    }
    setCustomAttributes(p, k, l) {
      if (null != k) {
        const c = u.Agent.correlation.AttachmentFieldId;
        for (const [m, d] of Object.entries(k)) {
          switch(p.stringCached(l, m), typeof d) {
            case "number":
              p.float(c.ATTACHMENT_CAPTURED_ARG_DOUBLE, d);
              break;
            case "string":
              p.stringCached(c.ATTACHMENT_CAPTURED_ARG_STRING, d);
          }
        }
      }
    }
    onCreateAttachment(p) {
      this.debug && r.debug("GraphQLAttachment onCreateAttachment()");
      this.setMultipleFields(k => {
        const l = u.Agent.correlation, c = l.AttachmentFieldId;
        k.integer(c.SPAN_TRACING_SYSTEM, l.ForeignTracerSystem.DYNATRACE);
        k.stringCached(c.SPAN_INSTRUMENTATION_LIBRARY_NAME, "dt.graphql");
        k.stringCached(c.SPAN_NAME_AT_START, `graphql.${this.activation.functionId.functionName}`);
        this.setCustomAttributes(k, p, c.SPAN_ATTRIBUTE_KEY_AT_START);
      });
    }
    onEnrichAttachment(p, k) {
      this.setMultipleFields(l => {
        null != k && l.integer(u.Agent.correlation.AttachmentFieldId.SPAN_STATUS_CODE, k);
        this.setCustomAttributes(l, p, u.Agent.correlation.AttachmentFieldId.SPAN_ATTRIBUTE_KEY_AT_END);
      });
    }
  }
  a.GraphQLAttachment = n;
});
S("src/lib/transformer/GraphQLTracker", ["require", "exports", "src/lib/Logger", "src/lib/sensors/GraphQLAttachment", "src/lib/util/ErrorUtil"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.GraphQLExecuteTracker = a.GraphQLTracker = void 0;
  class n {
    constructor(k) {
      this.debug = k;
      this.attributesCollection = {};
    }
    createAttachments(k) {
      k = new t.GraphQLAttachment(k, this.debug);
      if (k.valid) {
        this.attachment = k;
        try {
          k.onCreateAttachment(this.attributesCollection);
        } catch (l) {
          r.logAgentException(l);
        }
      } else {
        this.debug && u.debug("GraphQLTracker: createAttachment() - failed to create attachment");
      }
    }
    enrichAttachment(k, l) {
      var c;
      if (null === (c = this.attachment) || void 0 === c ? 0 : c.valid) {
        this.attachment.onEnrichAttachment(k, l);
      }
    }
  }
  a.GraphQLTracker = n;
  class p extends n {
    constructor() {
      super(...arguments);
      this.resolverCallsTracked = this.resolverCalls = 0;
    }
  }
  a.GraphQLExecuteTracker = p;
});
S("src/lib/transformer/GraphQLTransformer", "require exports src/lib/Agent src/lib/Embedder src/lib/FunctionId src/lib/Logger src/lib/otel/SpanAttachment src/lib/transformer/TransformerBase src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/InvocationUtil src/lib/transformer/GraphQLTracker src/lib/transformer/PromiseTransformerUtilities".split(" "), function(O, a, u, t, r, n, p, k, l, c, m, d, e) {
  function b(D, J, B) {
    D.attributesCollection[`graphql.operation.${J}`] = B;
  }
  function g(D, J) {
    return e.PromiseTransformerUtilities.isActuallyAPromise(D.retVal) && !D.didThrow ? (D.setVal(e.PromiseTransformerUtilities.wrapPromise(D.retVal, J)), !0) : !1;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.GraphQLExecuteTransformer = a.GraphQLSimpleTransformer = void 0;
  class h extends k.TransformerBase {
    isErrorsArray(D) {
      return Array.isArray(D.retVal) && 0 < D.retVal.length ? D.retVal.every(l.isError) : !1;
    }
    generateSubstitute(D) {
      const J = new r.FunctionId(D), B = this;
      return function(...v) {
        let z;
        const x = new d.GraphQLTracker(B.isDebugEnabled);
        try {
          z = B.tryStartActivation({sensorId:u.Agent.correlation.SensorId.NODEJS_GRAPHQL, functionId:J, attachmentCreator:x});
        } catch (A) {
          c.logAgentException(A);
        }
        v = m.safeInvoke(B, D.origFn, v);
        try {
          null != z && (!v.didThrow && B.isErrorsArray(v) && (v.retVal.forEach(A => (0,p.addEventToNativePurePath)(z.mActivation.spc.path, p.cExceptionEventName, (0,p.convertExceptionToAttributes)(A))), x.enrichAttachment(void 0, u.Agent.correlation.SpanStatusCode.ERROR)), null != v.exception && ((0,p.addEventToNativePurePath)(z.mActivation.spc.path, p.cExceptionEventName, (0,p.convertExceptionToAttributes)(v.exception)), x.enrichAttachment(void 0, u.Agent.correlation.SpanStatusCode.ERROR)), z.methodActivationDone());
        } catch (A) {
          c.logAgentException(A);
        }
        return v.rethrow();
      };
    }
  }
  a.GraphQLSimpleTransformer = h;
  class f extends k.TransformerBase {
    applyOnAllFields(D, J) {
      return null == D.getTypeMap ? (this.isDebugEnabled && n.debug("GraphQLResolverTransformer: typeMap not found, skip schema instrumentation"), !1) : Object.entries(D.getTypeMap()).filter(([B]) => !B.startsWith("__")).filter(([, B]) => l.isObject(B) && B.hasOwnProperty("_fields")).flatMap(([B, v]) => {
        v = "function" === typeof v._fields ? v._fields() : v._fields;
        return Object.entries(v).map(([z, x]) => J(x, B, z));
      }).some(B => B);
    }
    instrument(D) {
      return this.applyOnAllFields(D, (J, B, v) => {
        if (null == J.resolve) {
          return !1;
        }
        this.isDebugEnabled && n.debug(`GraphQLExecuteTransformer: wrap schema field resolver for ${B}.${v}`);
        J.resolve = this.getFieldResolver(J.resolve);
        return !0;
      });
    }
    ensureSchemaInstrumented(D) {
      !w.get(D) && this.instrument(D) && w.set(D, !0);
    }
    getFieldResolver(D) {
      const J = this;
      return function(B, v, z, x) {
        const A = G.get(z);
        try {
          null != A && (A.resolverCalls++, y.get(A) || (b(A, "type", x.operation.operation), b(A, "graphqlname", x.fieldName), null != x.operation.name && b(A, "name", x.operation.name.value), y.set(A, !0)));
        } catch (C) {
          c.logAgentException(C);
        }
        return m.doInvoke(J, D, [B, v, z, x]);
      };
    }
  }
  class q extends k.TransformerBase {
    constructor(D, J) {
      super(D);
      this.moduleExports = J;
      this.resolverHelper = new f(this.controlParams);
    }
    enrichAttachmentAfterOperation(D, J, B) {
      var v;
      b(D, "resolver_call_count", D.resolverCalls);
      D.enrichAttachment(D.attributesCollection, J || null != B && B.hasOwnProperty("errors") ? u.Agent.correlation.SpanStatusCode.ERROR : void 0);
      null != D.activation && (J && (0,p.addEventToNativePurePath)(D.activation.spc.path, p.cExceptionEventName, (0,p.convertExceptionToAttributes)(B)), null != B && B.hasOwnProperty("errors") && (null === (v = B.errors) || void 0 === v ? void 0 : v.map(z => (0,p.addEventToNativePurePath)(D.activation.spc.path, p.cExceptionEventName, (0,p.convertExceptionToAttributes)(z)))), D.activation.exit());
    }
    handleThenCall(D, J, B, v, z, x) {
      var A;
      try {
        (null === (A = J.activation) || void 0 === A ? 0 : A.isExited) || this.enrichAttachmentAfterOperation(J, B, v);
      } catch (C) {
        c.logAgentException(C);
      }
      return m.doInvoke(D, z, x);
    }
    fillSpanAttributes(D, J) {
      var B;
      if (null == J.operationName) {
        null != J.document.loc && (D["graphql.document"] = J.document.loc.source.body);
      } else {
        var v = J.document.definitions.filter(z => {
          var x;
          z = "OperationDefinition" === z.kind && null != J.operationName ? (null === (x = z.name) || void 0 === x ? void 0 : x.value) === J.operationName : !1;
          return z;
        });
        if (1 !== v.length) {
          throw Error(`Unsupported graphql operation: ${J.document.kind}, ${null === (B = J.document.loc) || void 0 === B ? void 0 : B.source.body}`);
        }
        B = v[0];
        null != B.loc && (D["graphql.document"] = B.loc.source.body.substring(B.loc.start, B.loc.end));
      }
    }
    generateSubstitute(D) {
      this.isDebugEnabled && n.debug("GraphQLExecuteTransformer generateSubstitute for execute");
      const J = new r.VirtualNodeFunctionId(new r.FunctionId(D)), B = this;
      return function(...v) {
        var z;
        let x;
        try {
          let A;
          A = 1 < v.length ? {schema:v[0], document:v[1], rootValue:v[2], contextValue:v[3], variableValues:v[4], operationName:v[5], fieldResolver:v[6], typeResolver:v[7]} : v[0];
          x = new d.GraphQLExecuteTracker(B.isDebugEnabled);
          B.fillSpanAttributes(x.attributesCollection, A);
          x.activation = B.tryStartMethodActivation({sensorId:u.Agent.correlation.SensorId.NODEJS_GRAPHQL, functionId:J, attachmentCreator:x});
          B.isDebugEnabled && n.debug(`GraphQL${x.activation ? "" : " no"} activation for execute`);
          x.activation && (x.activation.spc.activate(), A.fieldResolver = B.resolverHelper.getFieldResolver(null !== (z = A.fieldResolver) && void 0 !== z ? z : B.moduleExports.defaultFieldResolver), B.resolverHelper.ensureSchemaInstrumented(A.schema), A.contextValue ? G.set(A.contextValue, x) : B.isDebugEnabled && n.debug("GraphQLExecuteTransformer no context value for propagating context to resolver"));
        } catch (A) {
          c.logAgentException(A);
        }
        v = m.safeInvoke(B, D.origFn, v);
        try {
          null != (null === x || void 0 === x ? void 0 : x.activation) && (x.activation.spc.deactivate(), g(v, function(A, C) {
            return function(E) {
              return B.handleThenCall(this, x, A, E, C, arguments);
            };
          }) || B.enrichAttachmentAfterOperation(x, v.didThrow, v.retValOrException));
        } catch (A) {
          c.logAgentException(A);
        }
        return v.rethrow();
      };
    }
  }
  a.GraphQLExecuteTransformer = q;
  const w = t.create("schemaInstrumented"), G = t.create("tracker"), y = t.create("operationMetadataCollected");
});
S("src/lib/sensors/GraphQLSensor", "require exports src/lib/sensors/SensorBase src/lib/Logger src/lib/Patch src/lib/transformer/GraphQLTransformer".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.GraphQLSensor = void 0;
  class p extends u.SensorBase {
    applyInstrumentation(k, l) {
      var c;
      this.isDebugEnabled && t.debug(`applyInstrumentation: ${k.request}, ${null !== (c = l.ruleKey) && void 0 !== c ? c : "no_rule_key"}`);
      "GraphQL.Execute" === l.ruleKey && (c = new r.FunctionSpec("execute", k.request, k.moduleExports, "graphql"), r.applyToSingle(c, new n.GraphQLExecuteTransformer(this, k.moduleExports)));
      "GraphQL.Parser" === l.ruleKey && (c = new r.FunctionSpec("parse", k.request, k.moduleExports, "graphql"), r.applyToSingle(c, new n.GraphQLSimpleTransformer(this)));
      "GraphQL.Validation" === l.ruleKey && (k = new r.FunctionSpec("validate", k.request, k.moduleExports, "graphql"), r.applyToSingle(k, new n.GraphQLSimpleTransformer(this)));
    }
  }
  a.GraphQLSensor = p;
});
S("src/lib/sensors/SensorFactory", "require exports src/lib/Logger src/lib/sensors/GenericSensors src/lib/sensors/DisabledModulesSensor src/lib/sensors/ModuleSubstitutionSensor src/lib/sensors/WebRequestSensor src/lib/sensors/ClientWebRequestSensor src/lib/sensors/EventEmitterContextPassingSensor src/lib/sensors/MongoDbSensor src/lib/sensors/RedisSensor src/lib/sensors/MemcachedSensor src/lib/sensors/ExpressSensor src/lib/sensors/HapiSensor src/lib/sensors/FinalHandlerSensor src/lib/sensors/RestifySensor src/lib/sensors/PromiseSensor src/lib/sensors/TimerSensor src/lib/sensors/CryptoSensor src/lib/sensors/MySqlSensor src/lib/sensors/MySql2Sensor src/lib/sensors/PostgresSensor src/lib/sensors/CouchbaseDbSensor src/lib/sensors/RabbitMqSensor src/lib/sensors/AwsSdkSensor src/lib/sensors/GrpcSensor src/lib/sensors/GrpcJsSensor src/lib/sensors/IORedisSensor src/lib/sensors/MSSqlSensor src/lib/sensors/TediousSensor src/lib/sensors/KafkaJsConsumerSensor src/lib/sensors/KafkaJsConsumerAutoSensor src/lib/sensors/KafkaJsProducerSensor src/lib/sensors/WorkerThreadsSensor src/lib/sensors/OracleDbSensor src/lib/agentapi/Database src/lib/agentapi/IncomingRemoteCall src/lib/agentapi/OutgoingRemoteCall src/lib/agentapi/IncomingMessaging src/lib/agentapi/OutgoingMessaging src/lib/agentapi/RequestAttributes src/lib/otel/OpenTelemetrySensor src/lib/logenrichment/LogEnrichmentSensor src/lib/sensors/GraphQLSensor src/lib/sensors/BizEventsSensor".split(" "), 
function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h, f, q, w, G, y, D, J, B, v, z, x, A, C, E, I, H, F, K, L, M, N, P, Q, R, T, U, V, Z, ba) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.createSensor = void 0;
  a.createSensor = function(W, X, ea) {
    let Y;
    switch(ea.type) {
      case "ContextPassing":
        Y = new t.ContextPassingSensor(W, X);
        break;
      case "DisabledModules":
        Y = new r.DisabledModulesSensor(W, X);
        break;
      case "ModuleSubstitution":
        Y = new n.ModuleSubstitutionSensor(W, X);
        break;
      case "EventEmitterContextPassing":
        Y = new l.EventEmitterContextPassingSensor(W, X);
        break;
      case "WebRequest":
        Y = new p.WebRequestSensor(W, X);
        break;
      case "ClientWebRequest":
        Y = new k.ClientWebRequestSensor(W, X);
        break;
      case "MongoDb":
        Y = new c.MongoDbSensor(W, X);
        break;
      case "Redis":
        Y = new m.RedisSensor(W, X);
        break;
      case "Memcached":
        Y = new d.MemcachedSensor(W, X);
        break;
      case "Express":
        Y = new e.ExpressSensor(W, X);
        break;
      case "Hapi":
        Y = new b.HapiSensor(W, X);
        break;
      case "FinalHandler":
        Y = new g.FinalHandlerSensor(W, X);
        break;
      case "Restify":
        Y = new h.RestifySensor(W, X);
        break;
      case "Promise":
        Y = new f.PromiseSensor(W, X);
        break;
      case "TimerSensor":
        Y = new q.TimerSensor(W, X);
        break;
      case "CryptoSensor":
        Y = new w.CryptoSensor(W, X);
        break;
      case "MySql":
        Y = new G.MySqlSensor(W, X);
        break;
      case "MySql2":
        Y = new y.MySql2Sensor(W, X);
        break;
      case "Postgres":
        Y = new D.PostgresSensor(W, X);
        break;
      case "CouchbaseDb":
        Y = new J.CouchbaseDbSensor(W, X);
        break;
      case "AwsSdk":
        Y = new v.AwsSdkSensor(W, X);
        break;
      case "RabbitMq":
        Y = new B.RabbitMqSensor(W, X);
        break;
      case "GraphQL":
        Y = new Z.GraphQLSensor(W, X);
        break;
      case "gRPC":
        Y = new z.GrpcSensor(W, X);
        break;
      case "GrpcJs":
        Y = new x.GrpcJsSensor(W, X);
        break;
      case "OracleDb":
        Y = new L.OracleDbSensor(W, X);
        break;
      case "SdkDatabase":
        Y = new M.SdkDatabaseSensor(W, X);
        break;
      case "SdkIncomingRemoteCall":
        Y = new N.SdkIncomingRemoteCallSensor(W, X);
        break;
      case "SdkOutgoingRemoteCall":
        Y = new P.SdkOutgoingRemoteCallSensor(W, X);
        break;
      case "SdkIncomingMessaging":
        Y = new Q.SdkIncomingMessagingSensor(W, X);
        break;
      case "SdkOutgoingMessaging":
        Y = new R.SdkOutgoingMessagingSensor(W, X);
        break;
      case "SdkScav":
        Y = new T.SdkScavSensor(W, X);
        break;
      case "IORedis":
        Y = new A.IORedisSensor(W, X);
        break;
      case "MSSql":
        Y = new C.MSSqlSensor(W, X);
        break;
      case "Tedious":
        Y = new E.TediousSensor(W, X);
        break;
      case "KafkaJsConsumer":
        Y = new I.KafkaJsConsumerSensor(W, X);
        break;
      case "KafkaJsConsumerAuto":
        Y = new H.KafkaJsConsumerAutoSensor(W, X);
        break;
      case "KafkaJsProducer":
        Y = new F.KafkaJsProducerSensor(W, X);
        break;
      case "OpenTelemetry":
        Y = new U.OpenTelemetrySensor(W, X);
        break;
      case "LogEnrichment":
        Y = new V.LogEnrichmentSensor(W, X);
        break;
      case "WorkerThreads":
        Y = new K.WorkerThreadsSensor(W, X);
        break;
      case "BizEvents":
        Y = new ba.BizEventsSensor(W, X);
        break;
      default:
        u.warning(`${W} requests unknown sensor type ${ea.type}`);
    }
    return Y;
  };
});
S("src/lib/sensors/PredefinedSensors", ["require", "exports"], function(O, a) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.cPredefinedSensors = void 0;
  O = {capture:!0, enabled:!0, entrypoint:!1};
  const u = {capture:!0, enabled:!0, entrypoint:!0}, t = {capture:!1, enabled:!1, entrypoint:!1}, r = {capture:!1, enabled:!0, entrypoint:!1};
  a.cPredefinedSensors = Object.assign(Object.create(null), {"Node.Core.Process":O, "Node.Core.DNS":O, "Node.Core.Timers":O, "Node.Core.Events":O, "Node.Core.Promise":O, "Node.ModuleSubstitutions":O, "Node.DisabledModules":O, "Node.WebRequest":Object.assign({sensorProperties:[]}, u), "Node.ClientWebRequest":Object.assign({sensorProperties:[]}, O), "Node.MongoDb.ContextPassing":O, "Node.MongoDb":O, "Node.Redis":O, "Node.Memcached":O, "Node.Express":O, "Node.Hapi":O, "Node.FinalHandler":O, "Node.Restify":O, 
  "Node.SQLite3":O, "Node.MySql":O, "Node.MySql2":O, "Node.Postgres":O, "Node.CouchbaseDb":O, "Node.AwsSdk":O, "Node.RabbitMq":O, "Node.gRPC":u, "Node.GrpcJs":u, "Node.OracleDb":t, "Node.GraphQL":t, "sdk.outgoing.remotecall":r, "sdk.incoming.remotecall":r, "sdk.outgoing.messaging":r, "sdk.incoming.messaging":r, "sdk.database":r, "sdk.scav":r, "Node.IORedis":O, "Node.MSSql":O, "Node.Tedious":O, "Node.KafkaJsProducer":t, "Node.KafkaJsConsumerAuto":t, "Node.CustomService.KafkaJsConsumer":t, "Node.OpenTelemetry":t, 
  "Node.LogEnrichment":t, "Node.WorkerThreads":t, "Node.Snappy":O, BizEventsHttpIncoming:t});
});
S("src/lib/modules/SensorManager", "require exports module path src/lib/Agent src/lib/Debug src/lib/DebugLoggingEntity src/lib/Logger src/lib/ModuleLoadContext src/lib/Patch src/lib/PackageRegistry src/lib/SupportAlertBuilder src/lib/sensors/SensorBase src/lib/sensors/SensorConfig src/lib/sensors/SensorFactory src/lib/sensors/PredefinedSensors src/lib/sensors/PredefinedInstrumentationRules src/lib/sensors/BizEventsSensor src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/RuntimeUtil".split(" "), 
function(O, a, u, t, r, n, p, k, l, c, m, d, e, b, g, h, f, q, w, G, y) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.SensorManager = a.SensorAssociation = a.cPathPatternPrefix = void 0;
  a.cPathPatternPrefix = "pattern:";
  class D {
    constructor(B, v) {
      this.sensor = B;
      this.moduleRule = v;
    }
  }
  a.SensorAssociation = D;
  class J extends p.DebugLoggingEntity {
    constructor(B, v) {
      super("SensorManager");
      this.thePredefinedSensors = B;
      this.thePredefinedInstrumentationRules = v;
      this.name = "SensorManager";
      this.sensorMapIsBuilt = !1;
      this.sensorMap = Object.create(null);
      this.moduleMap = Object.create(null);
      this.pathPatternAssociations = [];
      this.agentModuleRegistry = Object.create(null);
      this.wrapperAppendix = new WeakMap();
      this.hookables = [];
      this.proxyHandlerObject = {set(z, x, A) {
        return J.theInstance.wrapperAppendix.get(z)[x](A);
      }, defineProperty(z, x, A) {
        return J.theInstance.wrapperAppendix.get(z)[x](A.value);
      }};
      n.assertStrictEqual(J.theInstance, void 0);
      J.theInstance = this;
      this.addToDebugLogDomain("Transformers");
    }
    static getInstance() {
      return J.theInstance;
    }
    startModuleLoadIntercept() {
      k.info("Module._load intercept kicked in");
      this.sensorMapIsBuilt || (k.info("build sensor map lazy"), this.buildSensorMap());
      var B = new c.FunctionSpec("_load", "module", u.Module);
      c.substitute(B, J.moduleLoadSubstitute);
      B = {};
      for (const v in u.Module._cache) {
        const z = u.Module._cache[v];
        if (y.isAgentFile(v)) {
          this.agentModuleRegistry[v] = u.Module._cache[v].exports;
        } else if (!this.isRequiredByAgent(z)) {
          const x = m.PackageRegistry.lookup(v);
          null != x && null != x.packageRoot ? B.hasOwnProperty(x.packageRoot) || (B[x.packageRoot] = 1, k.info(`unmonitored load of package ${x} (required by ${J.getParentModuleId(z)})`)) : B.hasOwnProperty(v) || (B[v] = 1, k.info(`unmonitored load of ${v} (required by ${J.getParentModuleId(z)})`));
        }
      }
      this.preLoadModules();
    }
    getSensorNameForKey(B) {
      return B === q.cBizEventsExternalConfigurationName ? q.cBizEventsSensorConfigurationName : B;
    }
    onConfigUpdate(B) {
      if (w.hasProperty(B, "rtc", "knowledgeSensorConfigurations")) {
        if (B = B.rtc, this.sensorMapIsBuilt) {
          for (const v of B.knowledgeSensorConfigurations.entries) {
            if (this.isApplicableSensorConfig(v) && (B = this.getSensorNameForKey(v.sensorKey), B = this.getSensor(B), null != B)) {
              const z = this.convertSensorConfig(v);
              null != z && B.updateState(z);
            }
          }
        } else {
          this.buildSensorMap(B.knowledgeSensorConfigurations.entries);
        }
      }
    }
    getSensor(B) {
      return this.sensorMap[B];
    }
    registerForRequest(B, v, z) {
      this.addAssociation(v, B, {ruleKey:z}, !1);
    }
    onLoad(B) {
      var v;
      if (y.isAgentFile(B.resolvedModulePath)) {
        this.onAgentFileLoad(B);
      } else {
        if (!(B.isImplicitModule || B.isNodeCoreModule || B.isModuleAcquired || B.moduleInfo.isInstrumented)) {
          var z = r.Agent.nativeAgent.getCustomServiceSensorKeysForFile(B.resolvedModulePath);
          if (null != z && 0 < z.length) {
            for (var x of z) {
              z = this.getSensor(x), null != z ? this.addAssociation(z, `pattern:${B.resolvedModulePath}`, {}, !0) : this.isDebugEnabled && k.debug(`unrecognized sensorkey '${x}'`);
            }
          }
        }
        x = null === (v = this.getAssociatedSensors(B)) || void 0 === v ? void 0 : v.sort(J.sortForInstrumentationOrder);
        if (null != x && (!B.moduleInfo.isInstrumented || !this.isInNodeModuleCache(B.resolvedModulePath) && !y.isNodeCoreModule(B.request))) {
          B.moduleInfo.isInstrumented = !0;
          try {
            for (const A of x) {
              const C = A.sensor;
              if (C.enabled && e.SensorBase.validateCriterias(A.moduleRule, B)) {
                try {
                  C.isDebugEnabled && k.debug(`${C.name}: instrumenting module ${B.toString(!0)}`), C.applyInstrumentation(B, A.moduleRule);
                } catch (E) {
                  k.severe(`exception during instrumentation of ${B.request}: ${G.verboseExceptionObject(E)}`), d.SupportAlertBuilder.handleInstrumentationError(E);
                }
              } else {
                C.isDebugEnabled && k.debug(`${C.name}: skipping instrumentation of module ${B.toString(!0)} - ${C.enabled ? "restrictions not met" : "sensor disabled"}`);
              }
            }
          } finally {
            !B.isModuleAcquired && this.isDebugEnabled && k.debug(`instrumentation of ${B.toString()} did not acquire module`);
          }
        }
      }
    }
    getAssociatedSensors(B) {
      let v = this.moduleMap[B.request];
      null == v && (v = this.moduleMap[B.resolvedModulePath]);
      null == v && this.pathPatternAssociations.forEach(x => {
        x.pathPattern.test(B.resolvedModulePath) && (null == v ? v = [x.associatedSensor] : v.push(x.associatedSensor));
      });
      if (null == v && null != B.moduleInfo && t.isAbsolute(B.request)) {
        const x = B.moduleInfo.packageName;
        if (null != x) {
          var z = B.moduleInfo.packageMain;
          const A = B.moduleInfo.packageJsonPath;
          if (null != z && null != A) {
            const C = t.normalize(B.request);
            z = t.join(A, z);
            if (y.hasCaseInsensitiveFilePaths() ? z.toLowerCase() === C.toLowerCase() : z === C) {
              v = this.moduleMap[x];
            }
          }
        }
      }
      return v;
    }
    loadModule(B, v, z, x) {
      this.isDebugEnabled && k.debug(`SensorManager: loading ${v} requested by ${z ? z.id : "<undefined>"}`);
      const A = c.PatchedFnDescriptor.getOrigFn(J.moduleLoadSubstitute);
      return Reflect.apply(A, B, [v, z, x]);
    }
    patchImportedModule(B, v, z) {
      this.isDebugEnabled && k.debug(`SensorManager: patchImportedModule ${B}"}`);
      this.wrapperAppendix.set(v, z);
      v = new Proxy(v, this.proxyHandlerObject);
      this.hookables.push([B, v]);
      v = J.getInstance();
      B = l.ModuleLoadContext.createESM(B);
      if (null != B && !r.Agent.isCim) {
        v.onLoad(B);
      }
    }
    proxyForModule(B) {
      return this.hookables.filter(v => v[0] === B).flat()[1];
    }
    get predefinedSensors() {
      null == this.thePredefinedSensors && (this.thePredefinedSensors = h.cPredefinedSensors);
      return this.thePredefinedSensors;
    }
    get predefinedInstrumentationRules() {
      null == this.thePredefinedInstrumentationRules && (this.thePredefinedInstrumentationRules = (0,f.getPredefinedInstrumentationRules)());
      return this.thePredefinedInstrumentationRules;
    }
    static sortForInstrumentationOrder(B, v) {
      B = B.sensor.sensorConfigKey.startsWith(b.cCustomServiceKeyPrefix);
      v = v.sensor.sensorConfigKey.startsWith(b.cCustomServiceKeyPrefix);
      return B === v ? 0 : B && !v ? 1 : -1;
    }
    onAgentFileLoad(B) {
      null != this.agentModuleRegistry[B.resolvedModulePath] ? (B.moduleExports = this.agentModuleRegistry[B.resolvedModulePath], this.isDebugEnabled && k.debug(`repeated load of agent file ${B}: using cached exports.`)) : (this.agentModuleRegistry[B.resolvedModulePath] = B.moduleExports, this.isDebugEnabled && k.debug(`agent file ${B}: caching exports on initial load.`));
    }
    isRequiredByAgent(B) {
      for (B = B.parent;; B = B.parent) {
        if (null == B) {
          return !1;
        }
        if (null != B.filename && y.isAgentFile(B.filename)) {
          return !0;
        }
      }
    }
    isInNodeModuleCache(B) {
      return null != u.Module._cache[B];
    }
    buildSensorMap(B) {
      if (this.sensorMapIsBuilt) {
        n.fail();
      } else {
        this.sensorMapIsBuilt = !0;
        var v = {};
        if (Array.isArray(B)) {
          for (var z of B) {
            this.isApplicableSensorConfig(z) && (B = this.convertSensorConfig(z)) && (v[this.getSensorNameForKey(z.sensorKey)] = B);
          }
        }
        for (const x of Object.getOwnPropertyNames(this.predefinedInstrumentationRules)) {
          (z = v[x] || this.predefinedSensors[x]) && z.enabled ? this.createSensorInstance(x, z, this.predefinedInstrumentationRules[x]) : k.info(`skip creation of sensor ${x} as sensor is ${z ? "disabled" : "unknown"}`);
        }
      }
    }
    createSensorInstance(B, v, z) {
      null == this.getSensor(B) ? (v = g.createSensor(B, v, z), null != v && (this.sensorMap[B] = v, this.addAssociatesToModuleMap(v, z.associatedModules), this.logDebug(`created sensor ${B} of type ${z.type}`))) : this.logDebug(`sensor ${B} already exists`);
    }
    addAssociatesToModuleMap(B, v) {
      for (const z of Object.getOwnPropertyNames(v)) {
        this.addAssociation(B, z, v[z], !1);
      }
    }
    static makePathPattern(B, v) {
      B = v ? B.replace(/[/\\]/g, "[/\\\\]") : `${"[/\\\\]"}node_modules${"[/\\\\]"}${B.replace(/[/]/g, "[/\\\\]")}`;
      return new RegExp(B, y.hasCaseInsensitiveFilePaths() ? "i" : void 0);
    }
    addAssociation(B, v, z, x) {
      z = new D(B, z);
      v.startsWith(a.cPathPatternPrefix) ? this.pathPatternAssociations.push({pathPattern:J.makePathPattern(v.slice(a.cPathPatternPrefix.length), x), associatedSensor:z}) : null == this.moduleMap[v] ? this.moduleMap[v] = [z] : this.moduleMap[v].some(A => A.sensor === B) ? k.warning(`SensorManager: sensor ${B} associated twice for module ${v}`) : this.moduleMap[v].push(z);
    }
    isApplicableSensorConfig(B) {
      return "string" === typeof B.sensorKey && (B.sensorKey.startsWith(b.cConfigKeyPrefix) || B.sensorKey.startsWith(b.cSdkConfigKeyPrefix) || B.sensorKey.startsWith(b.cBizEventsConfigKeyPrefix));
    }
    convertSensorConfig(B) {
      if ("boolean" === typeof B.capture && "boolean" === typeof B.enabled && "boolean" === typeof B.entrypoint && Array.isArray(B.sensorProperties)) {
        var v = {capture:B.capture, enabled:B.enabled, entrypoint:B.entrypoint};
        0 < B.sensorProperties.length && (v.sensorProperties = B.sensorProperties[0]);
        return v;
      }
      k.warning("Illegal sensor config received");
    }
    preLoadModules() {
      for (const B in this.moduleMap) {
        if (this.moduleMap[B].some(v => 1 === v.moduleRule.instrumentationStrategy)) {
          this.isDebugEnabled && k.debug(`pre-loading module ${B}`);
          try {
            O(B);
          } catch (v) {
            k.severe(`SensorManager: failed to pre-load module ${B} with ${G.verboseExceptionObject(v)}`);
          }
        }
      }
      this.logDebug("done with module pre-load");
    }
    static getParentModuleId(B) {
      return null != B.parent && null != B.parent.id ? B.parent.id : "<unknown>";
    }
    static moduleLoadSubstitute(B, v, z) {
      const x = J.theInstance;
      var A = t.extname(B);
      if (0 === A.length || ".js" === A || ".node" === A) {
        if (null == z && (z = !1), A = l.ModuleLoadContext.create(B, v, z, this), null != A) {
          if (!r.Agent.isCim) {
            x.onLoad(A);
          }
          B = A.moduleExports;
        } else {
          x.isDebugEnabled && k.debug(`module ${B} could not be resolved.`), B = x.loadModule(this, B, v, z);
        }
      } else {
        B = x.loadModule(this, B, v, z);
      }
      return B;
    }
  }
  a.SensorManager = J;
});
S("src/lib/ModuleRegistry", "require exports src/lib/DebugLoggingEntity src/lib/PackageRegistry src/lib/Agent src/lib/modules/SensorManager src/lib/util/CoreUtil".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ModuleRegistry = a.ModuleRegistryEntry = void 0;
  let k;
  class l {
    constructor(m, d, e) {
      this.request = m;
      this.parent = d;
      this.packageMetaInfo = e;
      this.isLoaded = this.isInstrumented = !1;
    }
    get version() {
      var m, d;
      return null !== (d = null === (m = this.packageMetaInfo) || void 0 === m ? void 0 : m.version) && void 0 !== d ? d : t.cInvalidVersionString;
    }
    get packageJsonPath() {
      var m;
      return null === (m = this.packageMetaInfo) || void 0 === m ? void 0 : m.packageRoot;
    }
    get packageName() {
      var m;
      return null === (m = this.packageMetaInfo) || void 0 === m ? void 0 : m.name;
    }
    get packageMain() {
      var m;
      return null === (m = this.packageMetaInfo) || void 0 === m ? void 0 : m.main;
    }
    get packageType() {
      var m;
      return null === (m = this.packageMetaInfo) || void 0 === m ? void 0 : m.modulePackageType;
    }
    get parentFilePath() {
      return p.hasProperty(this.parent, "id") ? this.parent.id : void 0;
    }
  }
  a.ModuleRegistryEntry = l;
  class c {
    constructor() {
      this.loadedModuleCount = 0;
      this.loadedModuleMap = Object.create(null);
    }
    lookup(m) {
      let d = this.loadedModuleMap[m.resolvedModulePath];
      if (null == d) {
        const e = this.determinePackageMetaInfo(m);
        d = new l(m.request, m.parent, e);
        this.loadedModuleMap[m.resolvedModulePath] = d;
        null == k && (k = new u.DebugLoggingEntity("ModuleRegistry"), k.addToDebugLogDomain("ModuleLoad"));
        k.isDebugEnabled && r.Logger.debug(`ModuleRegistry: added #${this.loadedModuleCount} ${m.request}: pmi=${e}, resolved=${m.resolvedModulePath}`);
        ++this.loadedModuleCount;
      }
      return d;
    }
    determinePackageMetaInfo(m) {
      const d = n.SensorManager.getInstance().getAssociatedSensors(m);
      let e;
      null != d && d.some(b => {
        e = b.sensor.determinePackageMetaInfo(m);
        return null != e;
      });
      null == e && (e = t.PackageRegistry.determinePackageMetaInfo(m));
      return e;
    }
  }
  a.ModuleRegistry = new c();
});
S("src/lib/ModuleLoadContext", "require exports module src/lib/DebugLoggingEntity src/lib/ModuleRegistry src/lib/modules/SensorManager src/lib/Agent src/lib/util/RuntimeUtil url".split(" "), function(O, a, u, t, r, n, p, k, l) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.ModuleRegistryEntry = a.ModuleLoadContext = void 0;
  Object.defineProperty(a, "ModuleRegistryEntry", {enumerable:!0, get:function() {
    return r.ModuleRegistryEntry;
  }});
  let c;
  const m = {"implicit:process":process, "implicit:global":global, "implicit:Promise":null != global.Promise ? global : void 0};
  class d {
    static create(e, b, g, h) {
      let f, q = e;
      if (k.isNodeCoreModule(e)) {
        f = 0;
      } else if (m.hasOwnProperty(e)) {
        f = 1;
      } else {
        try {
          q = u.Module._resolveFilename(e, b), f = d.isInternalModuleRequestString(e) ? 2 : 3;
        } catch (w) {
        }
      }
      if (null == f) {
        null == c && (c = new t.DebugLoggingEntity("ModuleLoadContext"), c.addToDebugLogDomain("ModuleLoad")), c.isDebugEnabled && p.Logger.debug(`unable to resolve module ${e}`);
      } else {
        return new d(e, b, g, f, q, h);
      }
    }
    static createESM(e) {
      var b = e;
      e.startsWith("file://") && (b = new l.URL(e), b = (0,l.fileURLToPath)(b));
      const g = d.isInternalModuleRequestString(b) ? 2 : 3;
      return new d(e, void 0, !1, g, b);
    }
    get isImplicitModule() {
      return 1 === this.moduleType;
    }
    get isNodeCoreModule() {
      return 0 === this.moduleType;
    }
    get isExternalModule() {
      return 3 === this.moduleType;
    }
    get isInternalModule() {
      return 2 === this.moduleType;
    }
    get isModuleAcquired() {
      return this.theModuleExports !== d.cNoExports;
    }
    get isECMAScriptModule() {
      return "module" === this.moduleInfo.packageType;
    }
    get moduleExports() {
      this.load();
      return this.theModuleExports;
    }
    set moduleExports(e) {
      this.theModuleExports = e;
      const b = this.moduleCacheEntry;
      null != b && (b.exports = e);
    }
    get moduleCacheEntry() {
      return u.Module._cache[this.resolvedModulePath];
    }
    load() {
      this.theModuleExports === d.cNoExports && (this.theModuleExports = n.SensorManager.getInstance().loadModule(this.thisContext, this.request, this.parent, this.isMain), this.moduleInfo.isLoaded = !0);
    }
    toString(e = !1) {
      return e ? `${this.request}(${this.resolvedModulePath})` : this.request;
    }
    constructor(e, b, g, h, f, q) {
      this.request = e;
      this.parent = b;
      this.isMain = g;
      this.moduleType = h;
      this.resolvedModulePath = f;
      this.thisContext = q;
      this.theModuleExports = d.cNoExports;
      1 === this.moduleType && (this.theModuleExports = m[e]);
      this.moduleInfo = r.ModuleRegistry.lookup(this);
      f.endsWith(".node") && p.Logger.info(`Native extension loaded: ${f} module: ${this.moduleInfo.packageName || "<unknown>"}@${this.moduleInfo.version}`);
    }
    static isInternalModuleRequestString(e) {
      return /^[\/\\.]|([a-zA-Z]:)/.test(e);
    }
  }
  d.cNoExports = {cNoExports:!0};
  a.ModuleLoadContext = d;
});
S("src/lib/PackageRegistry", "require exports path fs src/lib/DebugLoggingEntity src/lib/Logger src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/RuntimeUtil src/lib/util/SemverUtil src/lib/Agent".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  function d() {
    null == b && (b = new r.DebugLoggingEntity("PackageRegistry"), b.addToDebugLogDomain("ModuleLoad"));
    return b.isDebugEnabled;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.PackageRegistry = a.PackageMetaInfo = a.cInvalidVersionString = void 0;
  a.cInvalidVersionString = "0.0.0";
  class e {
    constructor(h, f, q, w, G) {
      this.name = h;
      this.version = f;
      this.packageRoot = q;
      this.main = w;
      this.modulePackageType = G;
      214 < h.length && (n.info(`PackageRegistry: suspicious package name detected (name exceeds ${214} chars): ${h}`), this.name = h.substr(0, 214));
      50 < f.length && (n.info(`PackageRegistry: version of package '${h}' exceeds string length: ${f}`), this.version = f.substr(0, 50));
      q && 4096 < q.length && (n.info(`PackageRegistry: invalid package root path: ${q}`), this.packageRoot = q.substr(0, 4096));
      w && 4096 < w.length && (n.info(`PackageRegistry: invalid package main: ${w}`), this.main = w.substr(w.length - 4096));
    }
    toString() {
      return `${this.name}@${this.version}`;
    }
  }
  a.PackageMetaInfo = e;
  let b;
  class g {
    constructor() {
      this.importConditions = new Set(["node", "import"]);
      this.cNodeModulePathFragment = `${u.sep}node_modules${u.sep}`;
      this.packageRootCache = Object.create(null);
      this.builtinPackageCache = Object.create(null);
      this.packageMetaInfoList = [];
    }
    determinePackageMetaInfo(h) {
      let f;
      if (2 === h.moduleType || 3 === h.moduleType) {
        f = this.lookup(h.resolvedModulePath);
      } else if (0 === h.moduleType || 1 === h.moduleType) {
        f = this.getBuiltinPackage(h.request);
      }
      return f;
    }
    lookup(h) {
      var f;
      h = u.dirname(h);
      l.hasCaseInsensitiveFilePaths() && (h = h.toLowerCase());
      var q = h.lastIndexOf(this.cNodeModulePathFragment);
      q = 0 <= q ? q + this.cNodeModulePathFragment.length : 1;
      var w = !1;
      const G = [];
      for (var y; !(h.length <= q || y === h);) {
        if (null == this.packageRootCache[h]) {
          G.push(h);
          y = u.join(h, "package.json");
          const D = this.tryReadPackageJson(y);
          if (null != D.pkg) {
            q = D.pkg;
            w = a.cInvalidVersionString;
            null != q.version && (null != c.valid(q.version) ? w = q.version : "kibana" !== q.version && n.info(`PackageRegistry: invalid package.json version field in ${y}: ${D.json}`));
            null != q.name && w !== a.cInvalidVersionString ? (w = new e(q.name, w, h, this.getMainScript(q, h), null !== (f = q.type) && void 0 !== f ? f : "commonjs"), this.addNewPackage(w)) : (w = !1, d() && n.debug(`Skipping package at: "${h}"`));
            break;
          }
        } else {
          w = this.packageRootCache[h];
          break;
        }
        y = h;
        h = u.dirname(h);
      }
      this.associateLocationsWithPackage(w, G);
      return w || void 0;
    }
    get packageList() {
      return this.packageMetaInfoList;
    }
    tryReadPackageJson(h) {
      const f = {pkg:void 0, json:void 0};
      try {
        const q = t.readFileSync(h);
        f.json = p.stripByteOrderMark(q.toString("utf-8"));
        f.pkg = JSON.parse(f.json);
        d() && n.debug(`tryReadPackageJson: read "${h} -> ${f.json}"`);
      } catch (q) {
        d() && n.debug(`tryReadPackageJson: failed to read "${h}"`);
      }
      return f;
    }
    addNewPackage(h) {
      var f;
      this.packageMetaInfoList.push(h);
      null === (f = m.Agent.nativeAgent) || void 0 === f ? void 0 : f.reportPackage(h.name, h.version);
      d() && n.debug(`Adding package #${this.packageMetaInfoList.length} "${h}" -> ${h.packageRoot}`);
    }
    associateLocationsWithPackage(h, f) {
      f.forEach(q => this.packageRootCache[q] = h);
      d() && 0 < f.length && n.debug(`PackageRegistry.packageFileCache.length=${Object.keys(this.packageRootCache).length}`);
    }
    getBuiltinPackage(h) {
      let f = this.builtinPackageCache[h];
      null == f && (f = new e(h, process.version), this.builtinPackageCache[h] = f);
      return f;
    }
    isConditionalExportsMainSugar(h) {
      if ("string" === typeof h || Array.isArray(h)) {
        return !0;
      }
      if (!p.isObject(h)) {
        return !1;
      }
      h = Object.getOwnPropertyNames(h);
      return 0 < h.length ? "" === h[0] || !h[0].startsWith(".") : !1;
    }
    resolvePackageTargetString(h, f, q) {
      if (("" === f || q || h.endsWith("/")) && h.startsWith("./")) {
        return h;
      }
    }
    resolvePackageTarget(h, f, q, w) {
      if ("string" === typeof h) {
        return this.resolvePackageTargetString(h, f, w);
      }
      if (Array.isArray(h)) {
        for (var G of h) {
          if (h = this.resolvePackageTarget(G, f, q, w), null != h) {
            return h;
          }
        }
      } else {
        if (p.isObject(h)) {
          G = Object.getOwnPropertyNames(h);
          for (const y of G) {
            if ("default" === y || this.importConditions.has(y)) {
              if (G = this.resolvePackageTarget(h[y], f, q, w), null != G) {
                return G;
              }
            }
          }
        }
      }
    }
    packageExportsResolve(h) {
      try {
        this.isConditionalExportsMainSugar(h) && (h = {".":h});
      } catch (f) {
        k.logAgentException(f);
        return;
      }
      if (p.isObject(h) && h.hasOwnProperty(".")) {
        return this.resolvePackageTarget(h["."], "", ".", !1);
      }
    }
    fileExists(h) {
      try {
        return t.statSync(h).isFile();
      } catch (f) {
        return !1;
      }
    }
    resolveMain(h, f) {
      if (null != f) {
        if (this.fileExists(u.join(h, `./${f}`))) {
          return f;
        }
        if (this.fileExists(u.join(h, `./${f}.js`))) {
          return f + ".js";
        }
        if (this.fileExists(u.join(h, `./${f}/index.js`))) {
          return f + "/index.js";
        }
      } else if (this.fileExists(u.join(h, "index.js"))) {
        return "index.js";
      }
    }
    getMainScript(h, f) {
      let q;
      c.satisfies(process.version, ">= 12.7.0") && null != h.exports ? (q = this.packageExportsResolve(h.exports)) || n.info(`Failed to resolve package exports (name: ${h.name}, version: ${h.version}, base: ${f})`) : q = this.resolveMain(f, h.main);
      return q;
    }
  }
  a.PackageRegistry = new g();
});
S("src/lib/SupportAlertBuilder", "require exports module path src/lib/Agent src/lib/Configuration src/lib/PackageRegistry src/lib/RunTimeProperty src/lib/util/CoreUtil src/lib/util/RuntimeUtil src/lib/util/InvocationUtil".split(" "), function(O, a, u, t, r, n, p, k, l, c, m) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.SupportAlertBuilder = a.cDefaultErrorFilter = void 0;
  a.cDefaultErrorFilter = ".*listen EADDRINUSE.*;.*ENOENT: no such file or directory.*;.*EFAULT: bad address in system call argument.*;.*ENOMEM.*;.*Unexpected token .*;.*duplicate key error.*;.*Cannot find module.*;.*Login failed for user.*;.*Connection lost: The server closed the connection.*;.*Connection terminated unexpectedly.*;.*Unexpected end of JSON input.*;.*Client network socket disconnected before secure TLS connection was established.*;.*Connection timed out after .*ms.*;.*write after end.*;.*The session has been destroyed.*;.*ESOCKETTIMEDOUT.*;.*socket could not be established.*;.*Forbidden: Resource was not in the authorization token.*;.*Request disconnected during file upload stream parsing.*;.*Socket closed unexpectedly.*;.*Connection is closed.*;.*connection request timeout. Request exceeded queueTimeout.*;.*getaddrinfo ENOENT.*;.*Incomplete multipart payload.*;.*connection was closed.*;.*connection timed out.*;.*ORA-12514: TNS:listener.*;.*ORA-02291: integrity constraint.*;.*ORA-01400: cannot insert NULL.*".split(";");
  class d {
    static handleUncaughtException(e, b) {
      const g = new d();
      d.generateSupportAlert(r.Agent.nativeAgent.SupportAlertType.Crash, e.stack ? e.stack : "", g.isAgentRelevant(e), b);
    }
    static handleInstrumentationError(e) {
      const b = new d();
      d.generateSupportAlert(r.Agent.nativeAgent.SupportAlertType.InstrumentationProblem, e.stack ? e.stack : "", b.isAgentRelevant(e), !1);
    }
    static _testonly_createInstance() {
      return new d();
    }
    static generateSupportAlert(e, b, g, h) {
      r.Agent.nativeAgent.generateSupportAlert(e, b, process.execPath, g, h, d.getModuleCacheFileList());
    }
    isAgentRelevant(e) {
      return !this.debugSuppressAllAlerts && this.isErrorMessageRelevant(e.message) && this.isAgentOnTopOfStack(e.stack ? e.stack : "");
    }
    static getModuleCacheFileList() {
      const e = {};
      for (let b in u.Module._cache) {
        c.hasCaseInsensitiveFilePaths() && (b = b.toLowerCase());
        const g = p.PackageRegistry.lookup(b);
        e[b] = !0;
        g && g.packageRoot && (e[`${t.join(g.packageRoot, "/package.json")} (${g.version ? g.version : "?"})`] = !0);
      }
      return Object.keys(e);
    }
    isErrorMessageRelevant(e) {
      return e ? null == l.match(this.ignoreErrorsFilter, e) : !0;
    }
    isAgentOnTopOfStack(e) {
      e = e.split("\n");
      for (let b = 1; b < e.length && b <= this.agentMaxPosOnStack; b++) {
        if (-1 !== e[b].indexOf(n.Configuration.rootFolder) && !this.isSafeInvoke(e[b]) && !this.isServiceDetectionMethod(e[b]) && !this.isRunInContext(e[b])) {
          return b <= this.agentMaxPosOnStack;
        }
      }
      return !1;
    }
    get debugSuppressAllAlerts() {
      return this.debugSuppressAllAlertsProperty.value;
    }
    constructor() {
      this.debugSuppressAllAlertsProperty = new k.BooleanProperty("SuppressSupportAlerts", !1);
      this.agentMaxPosOnStack = (new k.NumberOption("AgentMaxPosOnStack", 3)).value;
      this.ignoreErrorsFilter = [];
      for (var e of a.cDefaultErrorFilter) {
        this.ignoreErrorsFilter.push(new RegExp(e));
      }
      e = (new k.StringOption("NonRelevantErrors", "")).value;
      if (0 < e.length) {
        for (const b of e.split("|")) {
          0 < b.length ? this.ignoreErrorsFilter.push(new RegExp(b)) : r.Logger.info("Found empty RegExp in non relevant errors. Ignoring it. " + `Use '${this.debugSuppressAllAlertsProperty.name}' to suppress all support alerts.`);
        }
      }
    }
    isSafeInvoke(e) {
      return -1 !== e.indexOf("safeInvoke");
    }
    isServiceDetectionMethod(e) {
      return -1 !== e.indexOf(m.doInvoke.name) || -1 !== e.indexOf("dynatraceOnServiceExecutionIndicator");
    }
    isRunInContext(e) {
      return -1 !== e.indexOf("runInContext");
    }
  }
  a.SupportAlertBuilder = d;
});
S("src/lib/util/ErrorUtil", ["require", "exports", "src/lib/Agent", "src/lib/SupportAlertBuilder", "src/lib/Logger"], function(O, a, u, t, r) {
  function n(k) {
    return k instanceof Error ? `${k.stack}` : `${k}`;
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.reportInstrumentationError = a.logAgentException = a.verboseExceptionObject = void 0;
  a.verboseExceptionObject = n;
  a.logAgentException = function(k) {
    k = n(k);
    r.warning(`agent exception: ${k}`);
    if (null != u.Agent.nativeAgent) {
      {
        var l = u.Agent.nativeAgent.SupportAlertType.InstrumentationProblem;
        const c = Date.now();
        if (!(864E5 > c - p)) {
          try {
            t.SupportAlertBuilder.generateSupportAlert(l, k, !0, !1), p = c;
          } catch (m) {
          }
        }
      }
    }
  };
  a.reportInstrumentationError = function(k, l) {
    l = Array.isArray(l) ? l : [l];
    k = k.name;
    try {
      t.SupportAlertBuilder.generateSupportAlert(u.Agent.nativeAgent.SupportAlertType.InstrumentationProblem, `${k}=[${l}]`, !0, !1);
    } catch (c) {
    }
  };
  let p = 0;
});
S("src/lib/modules/AmbientSampling", "require exports timers src/lib/Agent src/lib/RunTimeProperty src/lib/RuntimeSetting src/lib/util/RuntimeUtil".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.AmbientSampling = void 0;
  class k {
    constructor() {
      this.name = "AmbientSampling";
      this.onPeriodicSamplingSessionStart = () => {
        try {
          this.isDebugEnabled && t.Logger.debug("AmbientSampling: onSporadicSamplingSessionStart"), u.setTimeout(this.onPeriodicSamplingSessionEnd, this.samplingSessionDurationOption.value).unref(), this.startNativeSamplingSession();
        } catch (l) {
          t.Logger.info(`AmbientSampling: onPeriodicSamplingSessionStart failed ${l}`);
        }
      };
      this.onPeriodicSamplingSessionEnd = () => {
        try {
          this.isDebugEnabled && t.Logger.debug("AmbientSampling: onSporadicSamplingSessionEnd"), this.stopNativeSamplingSession();
        } catch (l) {
          t.Logger.info(`AmbientSampling: onPeriodicSamplingSessionEnd failed ${l}`);
        }
      };
      this.onContinousSamplingSessionEnd = () => {
        try {
          this.isDebugEnabled && t.Logger.debug("AmbientSampling: onContinousSamplingSessionEnd"), this.stopNativeSamplingSession(!0);
        } catch (l) {
          t.Logger.info(`AmbientSampling: onContinousSamplingSessionEnd failed ${l}`);
        }
      };
      this.isNativeSamplingSessionActive = this.isPlatformSupported = !1;
      this.currentV8SamplingInterval = this.currentSessionDuration = this.currentSessionFrequency = 0;
      this.isInitialized = !1;
      this.inStartupGracePeriod = !0;
      this.featureEnableSetting = new n.RuntimeSetting("ambientSampling.enabled");
      this.featureForceEnableSetting = new n.RuntimeSetting("ambientSampling.forceEnable");
      this.featureDisabledFlag = new r.BooleanProperty("AmbientSamplingFeatureDisable", !1);
      this.debugLoggingFlag = new r.BooleanProperty("AmbientSamplingLoggingEnable", !1);
      this.samplingSessionDurationOption = new r.NumberOption("AmbientSamplingSessionDuration", 60000);
      this.samplingSessionFrequencyOption = new r.NumberOption("AmbientSamplingSessionFrequency", 0);
      this.v8SamplingIntervalOption = new r.NumberOption("AmbientSamplingV8SamplingInterval", 5000);
    }
    get isDebugEnabled() {
      return this.debugLoggingFlag.value;
    }
    get startable() {
      return !t.Agent.active || this.featureDisabledFlag.value ? !1 : this.featureEnableSetting.value && this.isPlatformSupported;
    }
    get isStarted() {
      return null != this.intervalTimer;
    }
    onInit() {
      this.isDebugEnabled && t.Logger.debug("AmbientSampling: initializing module");
      this.updateRuntimeRestrictions();
      this.isInitialized = !0;
      setTimeout(() => {
        this.isDebugEnabled && t.Logger.debug(`AmbientSampling: end of startup grace period - trigger sampling start with ${this.verboseOptions()}`);
        this.inStartupGracePeriod = !1;
        this.start();
      }, this.samplingSessionDurationOption.value).unref();
      this.isDebugEnabled && t.Logger.debug(`AmbientSampling: started startup grace period timer with ${this.samplingSessionDurationOption.value / 1000} seconds with ${this.verboseOptions()}`);
    }
    onConfigUpdate() {
      this.isInitialized && (this.isDebugEnabled && t.Logger.debug(`AmbientSampling: config update ${this.verboseOptions()}`), this.updateRuntimeRestrictions(), this.isStarted === this.startable && this.currentSessionFrequency === this.samplingSessionFrequencyOption.value && this.currentSessionDuration === this.samplingSessionDurationOption.value && this.currentV8SamplingInterval === this.v8SamplingIntervalOption.value || this.start());
    }
    onLifeCycleStateChanged() {
      t.Agent.lifeCycleState === t.LifeCycleState.ShuttingDown && this.stop();
    }
    updateRuntimeRestrictions() {
      this.isPlatformSupported = !p.isWindows();
      this.isPlatformSupported || (this.featureForceEnableSetting.value ? (this.isPlatformSupported = !0, t.Logger.info("AmbientSampling: force enable overrides platform restriction")) : t.Logger.info("AmbientSampling: unsupported platform / node version"));
    }
    start() {
      try {
        this.inStartupGracePeriod ? this.isDebugEnabled && t.Logger.debug("AmbientSampling: rejecting startup request as still in startup grace period") : (this.isStarted && this.stop(), this.startable && (t.Logger.info(`AmbientSampling: starting up ${this.verboseOptions()}`), 0 === this.samplingSessionFrequencyOption.value ? (this.intervalTimer = u.setInterval(this.onContinousSamplingSessionEnd, this.samplingSessionDurationOption.value), this.startNativeSamplingSession()) : (this.intervalTimer = 
        u.setInterval(this.onPeriodicSamplingSessionStart, this.samplingSessionFrequencyOption.value), this.onPeriodicSamplingSessionStart()), this.intervalTimer.unref(), this.currentSessionFrequency = this.samplingSessionFrequencyOption.value, this.currentSessionDuration = this.samplingSessionDurationOption.value, this.currentV8SamplingInterval = this.v8SamplingIntervalOption.value));
      } catch (l) {
        t.Logger.info(`AmbientSampling: start failed ${l}`);
      }
    }
    stop() {
      try {
        this.isStarted && (t.Logger.info("AmbientSampling: stop"), null != this.intervalTimer && (u.clearInterval(this.intervalTimer), this.intervalTimer = void 0), null != this.sessionEndTimer && (u.clearTimeout(this.sessionEndTimer), this.sessionEndTimer = void 0), this.stopNativeSamplingSession());
      } catch (l) {
        t.Logger.info(`AmbientSampling: stop failed ${l}`);
      }
    }
    startNativeSamplingSession() {
      this.isNativeSamplingSessionActive || (t.Agent.nativeAgent.startAmbientSampling(this.v8SamplingIntervalOption.value), this.isNativeSamplingSessionActive = !0);
    }
    stopNativeSamplingSession(l = !1) {
      this.isNativeSamplingSessionActive && (t.Agent.nativeAgent.stopAmbientSampling(!1, this.v8SamplingIntervalOption.value), l && t.Agent.nativeAgent.startAmbientSampling(this.v8SamplingIntervalOption.value), this.isNativeSamplingSessionActive = l);
    }
    verboseOptions() {
      return `SessionFrequency=${this.samplingSessionFrequencyOption.value}ms, ` + `SessionDuration=${this.samplingSessionDurationOption.value}ms, ` + `V8SamplingInterval=${this.v8SamplingIntervalOption.value}us, ` + `ambientSampling.enabled=${this.featureEnableSetting.value}, ` + `ambientSampling.forceEnabled=${this.featureForceEnableSetting.value}`;
    }
  }
  a.AmbientSampling = k;
});
S("src/lib/modules/IrqBasedCpuSampling", "require exports src/lib/Agent src/lib/RunTimeProperty src/lib/SubPathContext src/lib/RuntimeSetting".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.IrqBasedCpuSampling = void 0;
  class p extends r.ContextStackListener {
    onFirstContextActivation() {
      this.theSharedIsOnService[0] = u.Agent.nativeAgent.AmbientSamplingServiceIndication.ON_SERVICE;
    }
    onLastContextDeactivation() {
      this.theSharedIsOnService[0] = u.Agent.nativeAgent.AmbientSamplingServiceIndication.OFF_SERVICE;
    }
    set sharedIsOnServiceIndicator(c) {
      this.theSharedIsOnService = c;
    }
  }
  class k extends r.ContextStackListener {
    onFirstContextActivation() {
    }
    onLastContextDeactivation() {
    }
    onContextActivation(c) {
      var m, d;
      null != c ? this.updateCurrentHandle(c.path !== u.Agent.correlation.cInvalidPath ? c.path : null !== (d = null === (m = c.parentExecutor) || void 0 === m ? void 0 : m.path) && void 0 !== d ? d : u.Agent.correlation.cInvalidPath) : this.updateCurrentHandle(u.Agent.correlation.cInvalidPath);
    }
    updateCurrentHandle(c) {
      u.Agent.currentHandleHolder && Atomics.exchange(u.Agent.currentHandleHolder, 0, null !== c && void 0 !== c ? c : 0);
    }
  }
  class l {
    constructor() {
      this.name = "IrqBasedCpuSampling";
      this.autoSensorCurrentlyEnabled = this.ambientSamplingCurrentlyEnabled = this.isInitialized = this.isStarted = !1;
      this.samplingOnServiceIndicator = new p();
      this.contextActivator = new k();
      this.debugLoggingFlag = new t.BooleanProperty("IrqBasedCpuSampling", !1);
      this.featureDisabled = new t.BooleanOption("IrqBasedCpuSamplingDisabled", !1);
      this.ambientSamplingEnabled = new n.RuntimeSetting("ambientSampling.enabled");
      this.autoSensorEnabled = new n.RuntimeSetting("autoSensor.enabled");
    }
    get isDebugEnabled() {
      return this.debugLoggingFlag.value;
    }
    onInit() {
      u.Logger.info(`IrqBasedCpuSampling: initializing module ${this.verboseOptions()})`);
      this.samplingOnServiceIndicator.sharedIsOnServiceIndicator = u.Agent.nativeAgent.initSampling();
      u.Agent.currentHandleHolder = u.Agent.nativeAgent.initBufferForActivePath();
      this.start();
      this.isInitialized = !0;
    }
    onConfigUpdate() {
      this.isInitialized && (this.isDebugEnabled && u.Logger.debug(`IrqBasedCpuSampling: config update ${this.verboseOptions()}`), this.isStarted !== this.startable || this.ambientSamplingCurrentlyEnabled !== this.ambientSamplingEnabled.value || this.autoSensorCurrentlyEnabled !== this.autoSensorEnabled.value) && (this.isDebugEnabled && u.Logger.debug("IrqBasedCpuSampling: restarting..."), this.start());
    }
    onLifeCycleStateChanged() {
      u.Agent.lifeCycleState === u.LifeCycleState.ShuttingDown && this.stop();
    }
    verboseOptions() {
      return `IrqBasedCpuSamplingDisabled=${this.featureDisabled.value}, ` + `autoSensor.enabled=${this.autoSensorEnabled.value}, ` + `ambientSampling.enabled=${this.ambientSamplingEnabled.value}`;
    }
    start() {
      try {
        this.isStarted && this.stop(), this.startable && (this.isStarted = !0, this.isDebugEnabled && u.Logger.debug(`IrqBasedCpuSampling: starting up ${this.verboseOptions()}`), this.ambientSamplingCurrentlyEnabled = this.ambientSamplingEnabled.value, this.autoSensorCurrentlyEnabled = this.autoSensorEnabled.value, r.SubPathContext.addContextStackListener(this.samplingOnServiceIndicator), r.SubPathContext.addContextStackListener(this.contextActivator), u.Agent.nativeAgent.startSampling(this.autoSensorCurrentlyEnabled, 
        this.ambientSamplingCurrentlyEnabled));
      } catch (c) {
        u.Logger.info(`IrqBasedCpuSampling: start failed ${c}`);
      }
    }
    stop() {
      try {
        this.isStarted && (this.isDebugEnabled && u.Logger.info("IrqBasedCpuSampling: stopping sampling..."), u.Agent.nativeAgent.stopSampling(), this.isStarted = !1, r.SubPathContext.removeContextStackListener(this.contextActivator), r.SubPathContext.removeContextStackListener(this.samplingOnServiceIndicator));
      } catch (c) {
        u.Logger.info(`IrqBasedCpuSampling: stop failed ${c}`);
      }
    }
    get startable() {
      return !u.Agent.active || u.Agent.isCim || this.featureDisabled.value ? !1 : this.autoSensorEnabled.value || this.ambientSamplingEnabled.value;
    }
  }
  a.IrqBasedCpuSampling = l;
});
S("src/lib/modules/CpuSampling", "require exports src/lib/Agent src/lib/modules/AmbientSampling src/lib/modules/IrqBasedCpuSampling src/lib/RunTimeProperty".split(" "), function(O, a, u, t, r, n) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.CpuSampling = void 0;
  class p {
    constructor() {
      this.name = "CpuSampling";
    }
    onInit() {
      u.Agent.isCim || ((new n.BooleanOption("UseIrqBasedCpuSampling", !0)).value ? u.Agent.register(new r.IrqBasedCpuSampling()) : u.Agent.register(new t.AmbientSampling()));
    }
  }
  a.CpuSampling = p;
});
S("src/lib/modules/EventLoopUtilization", ["require", "exports", "perf_hooks", "src/lib/Agent", "src/lib/Debug"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.EventLoopUtilization = void 0;
  class n {
    constructor() {
      this.name = "EventLoopUtilization";
      this.onPeriodicTimer = () => {
        if (t.Agent.active && null != t.Agent.nativeAgent && null != u.performance.eventLoopUtilization) {
          try {
            const p = u.performance.eventLoopUtilization();
            if (null != this.lastMetrics) {
              const k = u.performance.eventLoopUtilization(p, this.lastMetrics), l = n.clamp(100 * k.utilization, 0, 100);
              t.Agent.nativeAgent.onPeriodicEventLoopUtilizationMetrics(l);
            }
            this.lastMetrics = p;
          } catch (p) {
            t.Logger.info(`Exception during event loop usage sampling: ${p}`), r.fail();
          }
        }
      };
    }
    onInit() {
      u.performance && (this.timer = setInterval(this.onPeriodicTimer, 1E4), this.timer.unref());
    }
    onLifeCycleStateChanged() {
      t.Agent.lifeCycleState === t.LifeCycleState.ShuttingDown && null != this.timer && (clearInterval(this.timer), this.lastMetrics = this.timer = void 0);
    }
    static clamp(p, k, l) {
      return Math.max(Math.min(p, l), k);
    }
  }
  a.EventLoopUtilization = n;
});
S("src/lib/modules/MemMetrics", ["require", "exports", "src/lib/Agent"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.MemMetricsModule = void 0;
  class t {
    constructor() {
      this.name = "MemMetrics";
    }
    onInit() {
      this.timer = setInterval(t.onPeriodicTimer, 1E4);
      this.timer.unref();
    }
    onLifeCycleStateChanged() {
      u.Agent.lifeCycleState === u.LifeCycleState.ShuttingDown && this.timer && (clearInterval(this.timer), this.timer = void 0);
    }
    static onPeriodicTimer() {
      if (u.Agent.active && u.Agent.nativeAgent) {
        try {
          const r = process.memoryUsage();
          u.Agent.nativeAgent.onPeriodicMemMetrics(r.heapTotal, r.heapUsed, r.rss);
        } catch (r) {
          u.Logger.info(`Exception during capturing memory usage: ${r}`);
        }
      }
    }
  }
  a.MemMetricsModule = t;
});
S("src/lib/modules/PackageListReporter", ["require", "exports", "src/lib/Agent", "src/lib/DebugLoggingEntity", "src/lib/PackageRegistry"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.PackageListReporterModule = void 0;
  class n extends t.DebugLoggingEntity {
    constructor() {
      super("PackageListReporterModule");
      this.name = "PackageListReporterModule";
      this.addToDebugLogDomain("ModuleLoad");
    }
    onInit() {
      this.timer = setTimeout(n.onPeriodicTimer, 1E4, this, !0);
      this.timer.unref();
      this.interval = setInterval(n.onPeriodicTimer, 6E5, this, !1);
      this.interval.unref();
    }
    onLifeCycleStateChanged() {
      u.Agent.lifeCycleState === u.LifeCycleState.ShuttingDown && (null != this.timer && (clearTimeout(this.timer), this.timer = void 0), null != this.interval && (clearInterval(this.interval), this.interval = void 0));
    }
    static onPeriodicTimer(p, k) {
      k && (p.timer = void 0, u.Logger.info(`Reporting package list: ${r.PackageRegistry.packageList.join(",")}`));
      if (u.Agent.active && null != u.Agent.nativeAgent) {
        try {
          p.isDebugEnabled && u.Logger.debug(`Updating package list: ${r.PackageRegistry.packageList.join(",")}`), u.Agent.nativeAgent.reportPackageList(r.PackageRegistry.packageList);
        } catch (l) {
          u.Logger.info(`Exception while sending module information: ${l}`);
        }
      }
    }
  }
  a.PackageListReporterModule = n;
});
S("src/lib/Blacklist", ["require", "exports", "src/lib/Configuration", "src/lib/RunTimeProperty", "src/lib/Logger"], function(O, a, u, t, r) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.isBlacklisted = void 0;
  const n = ["grunt", "gulp", "node-gyp", "npm"], p = ["atom-package-manager", "forever", "localtunnel-server"];
  a.isBlacklisted = function() {
    var k = new t.StringOption("ScriptBlacklist"), l = new t.StringOption("AppBlacklist");
    const c = /\s*,\s*/;
    let m = n;
    "" !== k.value && (m = k.value.split(c), r.info(`Scripts blacklist: ${k.value}`));
    k = p;
    "" !== l.value && (k = l.value.split(c), r.info(`App blacklist: ${l.value}`));
    l = -1 !== m.indexOf(u.Configuration.scriptName);
    null != u.Configuration.appName && (l = l || -1 !== k.indexOf(u.Configuration.appName));
    return l;
  };
});
S("src/lib/Dispatcher", ["require", "exports", "src/lib/Debug", "src/lib/util/InvocationUtil"], function(O, a, u, t) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.Dispatcher = void 0;
  class r {
    constructor(n) {
      this.methodName = n;
      this.listeners = [];
    }
    addListener(n) {
      u.assert(n[this.methodName]);
      this.listeners.push(n);
    }
    doDispatch(n) {
      for (const p of this.listeners) {
        n(p);
      }
    }
    dispatch(...n) {
      for (const p of this.listeners) {
        (0,t.doInvoke)(p, p[this.methodName], arguments);
      }
    }
  }
  a.Dispatcher = r;
});
S("src/lib/util/WorkerUtil", ["require", "exports", "src/lib/util/SemverUtil"], function(O, a, u) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.workerSupport = a.threadId = a.isMainThread = void 0;
  a: {
    try {
      var t = O("worker_threads");
      break a;
    } catch (n) {
    }
    t = void 0;
  }
  O = t;
  a.isMainThread = null == O || O.isMainThread;
  var r;
  O = null !== (r = null === O || void 0 === O ? void 0 : O.threadId) && void 0 !== r ? r : 0;
  a.threadId = O;
  a.workerSupport = u.satisfies(process.version, ">=12");
});
S("src/lib/NiLoader", "require exports fs path os src/lib/Logger src/lib/util/WorkerUtil".split(" "), function(O, a, u, t, r, n, p) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.NiLoader = void 0;
  class k {
    constructor() {
      this.dsoFileName = "";
    }
    load(l) {
      var c = l.libcvendor ? l.libcvendor : "";
      if (!this.nativeInterface && (l = l.nativeLibsRootPath || process.env.DT_NODE_NATIVE_LIBS_ROOT)) {
        let m = t.join(l, this.getNativeLibsFolderName(c), this.nativeModuleFileName);
        this.requireNativeLibrary(m);
        this.nativeInterface || (m = t.join(l, this.getPlatformFolderName(""), this.nativeModuleFileName), this.requireNativeLibrary(m));
      }
      this.nativeInterface || (l = t.join(__dirname, this.oneAgentBaseDirRelative, this.getPlatformFolderName(c), this.nativeModuleFileName), this.requireNativeLibrary(l));
      this.nativeInterface || (l = t.join(__dirname, this.oneAgentBaseDirRelative, this.getPlatformFolderName(""), this.nativeModuleFileName), this.requireNativeLibrary(l));
      this.nativeInterface || (c = t.join(__dirname, this.oneAgentBaseDirRelative, this.getNativeLibsFolderName(c), this.nativeModuleFileName), this.requireNativeLibrary(c));
      this.nativeInterface || n.info("Unable to load native interface.");
      return this.nativeInterface;
    }
    requireNativeLibrary(l) {
      p.isMainThread ? n.info(`try to load native library from ${l}`) : n.info(`Worker: loading native library from ${l}`);
      if (u.existsSync(l)) {
        try {
          this.nativeInterface = O(l), this.dsoFileName = l, p.isMainThread && n.info(`loaded ${l}`);
        } catch (c) {
          n.info(`failed to load ${l} ': ${c}`);
        }
      }
    }
    get moduleFileName() {
      return this.dsoFileName;
    }
    static is64bit() {
      return -1 !== ["x64", "ppc64", "arm64", "s390x"].indexOf(process.arch);
    }
    getNativeLibsFolderName(l) {
      l = "musl" === l ? "libmusl" : "lib";
      return k.is64bit() ? l + "64" : l;
    }
    get nativeModuleFileName() {
      return "oneagentnode_" + ("1" === process.env.DT_NODE_USE_NAPI ? "napi_" : "") + process.versions.modules + ".node";
    }
    get oneAgentBaseDirRelative() {
      return module.__DT_NODE_OBFUSCATED_AGENT__ ? "../.." : "../../..";
    }
    getPlatformFolderName(l) {
      switch(process.platform) {
        case "win32":
          l = "windows-x86";
          break;
        case "linux":
          switch(process.arch) {
            case "ppc":
            case "ppc64":
              l = `linux-ppc${r.endianness().toLowerCase()}`;
              break;
            case "arm64":
              l = "linux-arm";
              break;
            case "s390x":
              l = "linux-s390";
              break;
            default:
              l = `linux${"musl" === l ? "-musl" : ""}-x86`;
          }break;
        default:
          throw Error(`Unsupported platform: ${process.platform}`);
      }
      if (!k.is64bit()) {
        throw Error(`Unsupported arch: ${process.arch} on platform: ${process.platform}`);
      }
      return l + "-64";
    }
  }
  a.NiLoader = k;
});
S("src/lib/NiStub", ["require", "exports"], function(O, a) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.enable = void 0;
  class u {
    constructor(c) {
      this.valid = !0;
      u.objectCounter[c] ? ++u.objectCounter[c] : u.objectCounter[c] = 1;
      this.id = u.objectCounter[c];
    }
    toString() {
      return `[${this.id}]`;
    }
    equals(c) {
      return this === c;
    }
  }
  u.objectCounter = {};
  class t extends u {
    constructor() {
      super("Attachment");
    }
    setFieldFloat() {
      return !0;
    }
    setFieldInteger() {
      return !0;
    }
    setFieldString() {
      return !0;
    }
    setFieldStringCached() {
      return !0;
    }
    setFieldStringUnavailable() {
      return !0;
    }
    setFieldKeyValue() {
      return !0;
    }
    setFieldKeyValueCached() {
      return !0;
    }
    beginFastFieldAccess() {
    }
    endFastFieldAccess() {
    }
  }
  class r extends u {
    constructor() {
      super("PurePath");
    }
    endPath() {
      return !0;
    }
    getAttachment() {
      return new t();
    }
    appendCurrentNodeSpanEvent() {
    }
    addCurrentNodeSpanAttribute() {
    }
    methodEnter() {
      return !0;
    }
    methodEnterSuspended() {
      return !0;
    }
    methodExit() {
      return !0;
    }
    methodException() {
      return !0;
    }
    createLink() {
      return new n();
    }
    addLink() {
      return !0;
    }
    createAddSerializeLink() {
      return (new n()).serialize();
    }
    createAddSerializeLinkToBlob() {
      return (new n()).toBlob();
    }
    getExitTimeStamps() {
      return [[0, 1], [2, 3]];
    }
    createLocalLink() {
      return {};
    }
    getTraceId() {
      return "PpTraceId";
    }
    getCurrentSpanId() {
      return "PpCurrentSpanId";
    }
    createCurrentNodeResponseTaggingHeaders() {
      return {traceresponse:"aTraceResponse", "x-dt-tracestate":["dtState-1", "dtState-2"]};
    }
    setCurrentNodeResponseTaggingHeaders() {
    }
    isIgnored() {
      return !1;
    }
  }
  class n extends u {
    constructor() {
      super("Link");
    }
    serialize() {
      return {dtTag:`serialized(${this})`, traceparent:"", tracestate:""};
    }
    toBlob() {
      return Buffer.from(this.serialize().dtTag || "");
    }
    duplicate() {
      return new n();
    }
    purge() {
    }
  }
  class p {
    constructor(c) {
      this.AgentConfiguration = c.AgentConfiguration;
      this.AttachmentFieldId = c.AttachmentFieldId;
      this.AttachmentId = c.AttachmentId;
      this.AttachmentTarget = c.AttachmentTarget;
      this.ChannelType = c.ChannelType;
      this.ConnectionPoolTopology = c.ConnectionPoolTopology;
      this.Creator = c.Creator;
      this.DbAggregationMechanism = c.DbAggregationMechanism;
      this.DbMethodType = c.DbMethodType;
      this.DbServiceType = c.DbServiceType;
      this.ExternalCallType = c.ExternalCallType;
      this.MethodCategory = c.MethodCategory;
      this.RemoteCallWireProtocol = c.RemoteCallWireProtocol;
      this.SensorId = c.SensorId;
      this.MessagingTopology = c.MessagingTopology;
      this.TransmissionType = c.TransmissionType;
      this.MessagingMessagetype = c.MessagingMessagetype;
      this.cInvalidPath = new r();
      this.cInvalidLink = new n();
      this.cInvalidAttachment = new t();
      this.cInvalidMethodId = c.cInvalidMethodId;
      this.TaggingMode = c.TaggingMode;
      this.ForeignTracerSystem = c.ForeignTracerSystem;
      this.SpanAttachmentSdsVersion = c.SpanAttachmentSdsVersion;
      this.SpanKind = c.SpanKind;
      this.SpanStatusCode = c.SpanStatusCode;
    }
    startPath() {
      return new r();
    }
    startLocalPath() {
      return new r();
    }
    deserializeLinkFromString() {
      return new n();
    }
    deserializeLinkFromBlob() {
      return new n();
    }
    setSqlResultSetData() {
      return !0;
    }
  }
  class k {
    constructor(c) {
      this.requestHeaders = c;
      this.isPathBlocked = !1;
      this.serverId = 0;
    }
    release() {
    }
    isUemWebRequest() {
      return !1;
    }
    isInjecting() {
      return !0;
    }
    handleRequest() {
      return {postBodyNeeded:!1, maxPostBodySize:1024};
    }
    responseStarted(c) {
      this.responseHeaders = c;
      return !0;
    }
    getChangedRequestHeaders() {
      return this.requestHeaders;
    }
    getChangedResponseHeaders() {
      return this.responseHeaders;
    }
    injectJsAgentTag(c) {
      return c;
    }
    updateRequestBody() {
      return !0;
    }
    getResponseBody() {
    }
    getResponseStatus() {
      return 200;
    }
  }
  class l {
    createUemSensorContext(c, m) {
      return new k(m);
    }
  }
  a.enable = function(c) {
    const m = c.niAgent;
    if (m) {
      const d = new l(), e = new p(m.correlation), b = Object.create(null);
      for (const g in m) {
        if ("correlation" === g) {
          b.correlation = e;
        } else if ("uemSensor" === g) {
          b.uemSensor = d;
        } else {
          const h = m[g];
          b[g] = "function" === typeof h ? function() {
            return h.apply(m, arguments);
          } : m[g];
        }
      }
      c.niAgent = b;
    }
  };
});
S("src/lib/Agent", "require exports path src/lib/util/CoreUtil src/lib/util/ErrorUtil src/lib/util/HttpUtil src/lib/modules/CpuSampling src/lib/modules/EventLoopUtilization src/lib/modules/MemMetrics src/lib/modules/PackageListReporter src/lib/modules/SensorManager src/lib/Blacklist src/lib/Configuration src/lib/Dispatcher src/lib/Logger src/lib/NiLoader src/lib/RunTimeProperty src/lib/RuntimeSetting src/lib/Tracing src/lib/sensors/UemSensor src/lib/util/WorkerUtil".split(" "), function(O, a, u, 
t, r, n, p, k, l, c, m, d, e, b, g, h, f, q, w, G, y) {
  Object.defineProperty(a, "__esModule", {value:!0});
  a.Configuration = a.Logger = a.Agent = a.NodeAgent = a.LifeCycleState = void 0;
  Object.defineProperty(a, "Configuration", {enumerable:!0, get:function() {
    return e.Configuration;
  }});
  a.Logger = g;
  var D;
  (function(v) {
    v[v.PreInitial = 0] = "PreInitial";
    v[v.Initializing = 1] = "Initializing";
    v[v.Running = 2] = "Running";
    v[v.ShuttingDown = 3] = "ShuttingDown";
    v[v.PostMortem = 4] = "PostMortem";
    v[v.Undefined = 5] = "Undefined";
  })(D = a.LifeCycleState || (a.LifeCycleState = {}));
  class J {
    constructor() {
      this.moduleSpecifiers = new Map();
    }
    isES6Module(v) {
      return null != v.format ? "module" === v.format : !1;
    }
    async resolveModule(v, z, x, A) {
      const {parentURL:C = ""} = z;
      v.startsWith("dtim:") && (v = v.replace("dtim:", ""));
      z = await x(v, z, x);
      if (C === A || C.startsWith("dtim:") || !this.isES6Module(z)) {
        return g.info(`ESMLoader short-resolved: ${z.url}`), z;
      }
      this.moduleSpecifiers.set(z.url, v);
      g.info(`ESMLoader resolved: ${"dtim:"}${z.url}`);
      return {url:`${"dtim:"}${z.url}`, shortCircuit:!0, format:"module"};
    }
    getFormat(v, z, x) {
      return v.startsWith("dtim:") ? {format:"module"} : x(v, z, x);
    }
    getModulePrefix() {
      return "dtim:";
    }
    getSource(v, z, x, A, C) {
      return v.startsWith("dtim:") ? (z = Object.keys(C), g.info(`ESMLoader found exports are: ${z}`), z = z.map(E => [`let _dt_${E} = origModule.${E};`, `export { _dt_${E} as ${E} };`, `setOfExports.${E} = (substitute) => {_dt_${E} = substitute; return true; };`].join("\n")).join("\n\n"), {source:[`import * as origModule from "${v}";`, "const setOfExports = {};\n", `${z}`, "", `global.__DT_AGENT_ESM_LOADER__.register( "${A}", origModule, setOfExports, "${this.moduleSpecifiers.get(A)}");`].join("\n")}) : 
      x(v, z, x);
    }
    register(v, z, x, A) {
      g.info(`ESMLoader register called: name=${v}, specifier=${A}`);
      m.SensorManager.getInstance().patchImportedModule(v, z, x, A);
    }
  }
  class B {
    constructor() {
      this.active = !0;
      this.blacklisted = this.isCim = !1;
      this.managedAgentVersion = "not specified";
      this.createAgentResult = {};
      this.agentInitOptions = {};
      this.agentInitParams = {};
      this.onConfigUpdate = v => {
        try {
          const z = JSON.parse(v);
          null != z.agentActive && this.active !== z.agentActive && (this.active = z.agentActive, this.agentClassDebugFlag.value && g.debug(`agent active changed to '${this.active}'`));
          null != z.isCim && this.isCim !== z.isCim && (this.isCim = z.isCim, this.agentClassDebugFlag.value && g.debug(`isCim changed to '${this.isCim}'`));
          if (null != z.rtc) {
            if (null != z.rtc.booleanMap) {
              for (const x in z.rtc.booleanMap) {
                z.rtc.booleanMap[x] = "true" === String(z.rtc.booleanMap[x]);
              }
            }
            if (null != z.rtc.longMap) {
              for (const x in z.rtc.longMap) {
                z.rtc.longMap[x] = +z.rtc.longMap[x];
              }
            }
            g.info(`Updated runtime configuration to revision ${z.rtcRevision}`);
          }
          null != z.uemConfig && g.info(`Updated UEM configuration to revision ${z.uemConfigRevision}`);
          null != z.uemActive && (g.info(`Real user monitoring ........ ${z.uemActive ? "enabled" : "disabled"}`), G.UemSensor.setActive(z.uemActive));
          this.niConfig = z;
          this.configUpdateListeners.dispatch(z);
        } catch (z) {
          r.logAgentException(z);
        }
      };
      this.getFileExports = (v, z) => {
        var x = this.niAgent.baseDirectory;
        this.agentClassDebugFlag.value && g.debug("NodeClassBrowserModule | received request");
        x = u.normalize(`${x}/${v}`);
        x = O.cache[x];
        const A = [];
        if (null != x) {
          for (const [C, E] of Object.entries(x.exports)) {
            if ("function" === typeof E) {
              if (null != E.prototype) {
                const I = Object.getOwnPropertyNames(E.prototype);
                1 === I.length && "constructor" === I[0] && A.push(C);
              } else {
                A.push(C);
              }
              if (A.length >= z) {
                break;
              }
            }
          }
        }
        this.agentClassDebugFlag.value && g.debug("NodeClassBrowserModule | handled file exports" + ` request for path='${v}' found=${null != x}` + ` count=${A.length}`);
        return A;
      };
      this.agentClassDebugFlag = new f.BooleanProperty("AgentClass", !1);
      this.agentModules = [];
      this.theLifeCycleState = D.PreInitial;
      this.configUpdateListeners = new b.Dispatcher("onConfigUpdate");
      this.lifeCycleStateChangeListeners = new b.Dispatcher("onLifeCycleStateChanged");
      this.niConfig = {};
      this.loaderHelper = new J();
    }
    initialize(v, z) {
      let x = !1;
      this.agentInitOptions = v;
      this.agentInitParams = z || {habitat:"Unspecified"};
      try {
        this.moveToState(D.PreInitial);
        this.moveToState(D.Initializing);
        (0,f.parseForRunTimeProperties)(v);
        const A = new h.NiLoader();
        this.ni = A.load(v);
        if (!this.ni) {
          throw Error("failed to load native agent");
        }
        this.niAgent = new this.ni.NiAgent(this.stringifyOptions(v), u.basename(A.moduleFileName), this.onConfigUpdate, this.getFileExports, z);
        e.Configuration.appName = this.niAgent.appName;
        try {
          this.managedAgentVersion = O(u.join(e.Configuration.rootFolder, "package.json")).agentversion;
        } catch (C) {
        }
        g.control.mode = g.Mode.NATIVE;
        this.niAgent.initialize({nodeVersion:process.version, managedAgentVersion:this.managedAgentVersion, scriptName:e.Configuration.scriptName, nodeAppName:e.Configuration.appName || "<undefined>", managedAgentRootPath:e.Configuration.rootFolder});
        this.isCim = this.niAgent.monitoringMode === this.niAgent.AgentMonitoringMode.CLOUD_INFRASTRUCTURE_MONITORING;
        this.blacklisted = (0,d.isBlacklisted)();
        this.blacklisted || (this.initAgentModules(), (new f.BooleanProperty("InstallNiStub", !1)).value && O("./NiStub").enable(this), m.SensorManager.getInstance().startModuleLoadIntercept());
      } catch (A) {
        x = !0, g.control.mode !== g.Mode.NATIVE && (g.control.mode = g.Mode.MANAGED), g.severe(`agent initialization failed: ${r.verboseExceptionObject(A)}`);
      } finally {
        this.logStartupInfo(), this.moveToState(x ? D.Undefined : D.Running);
      }
      return !x;
    }
    get lifeCycleState() {
      return this.theLifeCycleState;
    }
    get nativeAgent() {
      return this.niAgent;
    }
    get correlation() {
      return this.niAgent.correlation;
    }
    get metrics() {
      return this.ni.Metrics;
    }
    get incomingHttpBizEvents() {
      return this.ni.IncomingHttpBizEvent;
    }
    get stringTracking() {
      return null != process.env.__DT_NODE_STRING_TRACKING__ ? this.ni.StringTracking : void 0;
    }
    get uemSensor() {
      return this.niAgent.uemSensor;
    }
    get habitat() {
      return null != this.agentInitParams.habitat ? this.agentInitParams.habitat : "Unspecified";
    }
    getESMLoader() {
      return this.loaderHelper;
    }
    register(v) {
      this.addListener(v);
      this.agentModules.push(v);
    }
    addListener(v) {
      v.onConfigUpdate && this.configUpdateListeners.addListener(v);
      v.onLifeCycleStateChanged && this.lifeCycleStateChangeListeners.addListener(v);
    }
    shutdown() {
      let v = !1;
      try {
        this.moveToState(D.ShuttingDown), this.niAgent && this.niAgent.shutdown();
      } catch (z) {
        v = !0, g.severe(`exception during shutdown ${z}`);
      } finally {
        this.moveToState(v ? D.Undefined : D.PostMortem);
      }
    }
    get configuration() {
      return this.niConfig;
    }
    logStartupInfo() {
      const v = t.getOptionalPropertyValue(O.main, "filename", "undefined");
      y.isMainThread ? (g.info(`Platform .................... ${process.platform}`), g.info(`Arch ........................ ${process.arch}`), g.info(`Node version ................ ${process.version}`), g.info(`Agent version ............... ${this.managedAgentVersion}`), g.info(`Script ...................... ${e.Configuration.scriptName}`), g.info(`AppName ..................... ${e.Configuration.appName || "<undefined>"}`), g.info(`Blacklisted ................. ${this.blacklisted}`), g.info("MainModule .................. " + 
      t.getOptionalPropertyValue(process.mainModule, "filename", "undefined")), g.info(`require.main................. ${v}`)) : g.info(`Worker started - script: ${v}, threadId: ${y.threadId}`);
    }
    initAgentModules() {
      for (const v of this.agentModules) {
        v.onInit && (this.agentClassDebugFlag.value && g.debug(`initializing agent module '${v.name}'`), v.onInit());
      }
    }
    moveToState(v) {
      let z = !1;
      const x = this.lifeCycleState;
      if (x !== v) {
        switch(v) {
          case D.PreInitial:
            z = x === D.PreInitial;
            break;
          case D.Initializing:
            z = x === D.PreInitial;
            break;
          case D.Running:
            z = x === D.Initializing;
            break;
          case D.ShuttingDown:
            z = x === D.Running;
            break;
          case D.PostMortem:
            z = x === D.ShuttingDown;
            break;
          case D.Undefined:
            z = !0;
        }
        if (!z) {
          throw Error(`cannot transit from state ${D[x]} to ${D[v]}`);
        }
        this.agentClassDebugFlag.value && g.debug(`transit from ${D[x]} to ${D[v]}`);
        this.theLifeCycleState = v;
        this.lifeCycleStateChangeListeners.dispatch(x);
      }
    }
    stringifyOptions(v) {
      return Object.keys(v).map(z => {
        const x = v[z];
        switch(x) {
          case null:
          case void 0:
          case "":
            return g.info(`Ignoring empty option '${z}'`), "";
          default:
            return `${z}=${x}`;
        }
      }).join();
    }
  }
  a.NodeAgent = B;
  a.Agent = new B();
  a.Agent.addListener(new f.PropertyRtcUpdateListener());
  a.Agent.addListener(new q.RuntimeSettingsPool());
  a.Agent.addListener(new n.UemConfigUpdateListener());
  y.isMainThread && a.Agent.register(new l.MemMetricsModule());
  a.Agent.register(new c.PackageListReporterModule());
  a.Agent.register(new m.SensorManager());
  a.Agent.register(new p.CpuSampling());
  a.Agent.register(new k.EventLoopUtilization());
  w.Tracing.init();
});
S("src/lib/UncaughtException", "require exports fs src/lib/ErrorObject src/lib/Logger src/lib/SupportAlertBuilder src/lib/util/CoreUtil src/lib/util/RuntimeUtil src/lib/util/WorkerUtil".split(" "), function(O, a, u, t, r, n, p, k, l) {
  function c(b) {
    const g = 1 === process.listeners("uncaughtException").length && !c.listener;
    try {
      if (r.info(`Uncaught Exception - will exit: ${g}`), p.isError(b)) {
        var h;
        g && (h = t.getCallStack(b));
        r.info(b.stack || `Unknown uncaughtException ${b}`);
        n.SupportAlertBuilder.handleUncaughtException(b, g);
        if (g) {
          if (0 < h.length) {
            try {
              const f = h[0], q = f.getFileName();
              let w = f.getLineNumber();
              null == w && (w = -1);
              console.error(`${q}:${w}`);
              if (q) {
                const G = u.readFileSync(q, "utf8").split(/\r?\n/);
                console.error(G[0 < w ? w - 1 : w]);
                const y = f.getColumnNumber();
                null != y ? console.error(Array(y).join(" ") + "^") : console.error("");
              } else {
                console.error("");
              }
            } catch (f) {
              console.error("");
            }
            console.error(b.toString());
            for (const f of h) {
              const q = f.getFileName() || "";
              k.isAgentFile(q) || console.error(`    at ${f.toString()}`);
            }
          } else {
            console.error(b.stack || "Unknown uncaughtException");
          }
        }
      } else {
        r.info(`Unknown uncaughtException: error object is ${b}`), g && console.error(`Unknown uncaughtException: error object is ${b}`);
      }
    } finally {
      c.listener && c.listener(b), g && process.exit(1);
    }
  }
  function m() {
    if (l.isMainThread) {
      var b = process.listeners("uncaughtException");
      if (0 < b.length && (r.info(`uncaughtException listeners installed: ${b.length}`), 1 === b.length)) {
        b = b[0];
        const g = b.listener;
        g ? r.info(`original listener <${b.name}> has already a listener attached: ${g.name}`) : (process.removeListener("uncaughtException", b), c.listener = b);
      }
      process.on("uncaughtException", c);
    }
  }
  function d(b, g) {
    "uncaughtException" === b && r.info(`new uncaught exception listener: ${g.name}`);
  }
  function e(b, g) {
    "uncaughtException" === b && (r.info(`removed uncaughtException listener: ${g.name}`), g === c.listener && (delete c.listener, m()));
  }
  Object.defineProperty(a, "__esModule", {value:!0});
  a.installListener = void 0;
  a.installListener = function() {
    m();
    process.on("newListener", d);
    process.on("removeListener", e);
  };
});
S("src/nodejsagent", "require exports util src/lib/Agent src/lib/UncaughtException src/lib/agentapi/AgentApi src/lib/util/RuntimeUtil src/lib/util/SemverUtil src/lib/util/WorkerUtil".split(" "), function(O, a, u, t, r, n, p, k, l) {
  function c() {
    t.Configuration && (t.Logger && t.Logger.info(`${l.isMainThread ? "Application" : "Worker"} end`), b(), t.Agent.shutdown());
  }
  function m(h) {
    g.filter(f => f.signalName === h && f.active).forEach(f => {
      process.nextTick(() => {
        process.removeListener(f.signalName, f.handlerFun);
      });
      f.active = !1;
      t.Logger.info(`onegent signal handler process.on(${h}) removed`);
    });
  }
  function d(h) {
    g.filter(f => f.signalName === h && !f.active && 0 === process.listenerCount(h)).forEach(f => {
      process.on(h, f.handlerFun);
      f.active = !0;
      t.Logger.info(`onegent signal handler process.on(${h}) installed`);
    });
  }
  function e() {
    g.forEach(h => {
      if (h.install && (h.active = 0 === process.listenerCount(h.signalName), h.active)) {
        process.on(h.signalName, h.handlerFun);
      }
    });
  }
  function b() {
    g.forEach(h => {
      h.install && process.removeListener(h.signalName, h.handlerFun);
    });
    process.removeListener("newListener", m);
    process.removeListener("removeListener", d);
  }
  const g = [{signalName:"SIGINT", active:!0, install:!0, handlerFun:function() {
    process.exit((0,p.isWindows)() ? 3221225786 : 130);
  }}, {signalName:"SIGBREAK", active:!0, install:(0,p.isWindows)(), handlerFun:function() {
    process.exit(3221225786);
  }}, {signalName:"SIGTERM", active:!0, install:!(0,p.isWindows)(), handlerFun:function() {
    process.exit(143);
  }}];
  return function(h = {}, f) {
    if (global.__DT_AGENT_INJECTED__) {
      t.Logger.info("Agent already injected - exiting");
    } else {
      if (global.__DT_AGENT_INJECTED__ = {deployment:module.__DT_NODE_OBFUSCATED_AGENT__ ? 2 : 1, operational:!1}, t.Logger.control.updateLoggingOptions(h), k.satisfies(process.version, "10 || 12 || 14 || 16 || 18 || 19 || 20")) {
        if (l.isMainThread || l.workerSupport) {
          if (h = t.Configuration.processOptions(h), t.Agent.initialize(h, f)) {
            return process.on("exit", c), e(), process.on("newListener", m), process.on("removeListener", d), t.Agent.blacklisted || (r.installListener(), n.isEnabled() && (global.__DT_GETAGENTAPI__ = n.getAgentApi, global.__DT_AGENT_ESM_LOADER__ = t.Agent.getESMLoader(), "ON" === process.env.DT_LOAD_FOR_TESTING && (global.__DT_AGENT_VERSION__ = t.Agent.managedAgentVersion), "ON" === process.env.DT_CHECK_NAPI_BUFFER_HEALTH && (global.__DT_CHECK_NAPI_BUFFER_HEALTH = t.Agent.nativeAgent.checkNapiBufferHealth.bind(t.Agent.nativeAgent)))), 
            !(0,p.isDebuggerActive)() && t.Logger.isLoggable(t.Logger.Level.INFO) && (f = u.inspect(h).replace(/(\r\n|\n|\r)/gm, "").replace(/tenanttoken: '.*?'/gmi, "tenanttoken: '********'"), l.isMainThread && t.Logger.info(`Agent options: ${f}`)), l.isMainThread && t.Logger.info("Starting application"), global.__DT_AGENT_INJECTED__.operational = !0, t.Agent.createAgentResult;
          }
        } else {
          t.Logger.control.mode = t.Logger.Mode.MANAGED, t.Logger.info(`Skip OneAgent init in worker thread ${process.version}`);
        }
      } else {
        t.Logger.control.mode = t.Logger.Mode.MANAGED, t.Logger.info(`Node.js version ${process.version} is not supported. Agent disabled.`);
      }
    }
  };
});

})();


//# sourceMappingURL=nodejsagent.js.map
