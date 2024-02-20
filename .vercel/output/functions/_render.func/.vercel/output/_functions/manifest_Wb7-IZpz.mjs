import { T as bold, V as red, W as yellow, X as dim, Y as blue } from './chunks/astro_OSQ-nX93.mjs';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.3.5_typescript@5.2.2/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"let s=!1;const e=document.getElementById(\"menuMovil\");function t(){s?(e.classList.remove(\"h-[305px]\"),e.classList.add(\"h-[0px]\"),s=!1):(e.classList.add(\"h-[305px]\"),e.classList.remove(\"h-[0px]\"),s=!0)}document.getElementById(\"menuTrigger\").addEventListener(\"click\",t);\n"}],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/acerca_de_digital","isIndex":false,"type":"page","pattern":"^\\/acerca_de_digital\\/?$","segments":[[{"content":"acerca_de_digital","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/acerca_de_digital.astro","pathname":"/acerca_de_digital","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/aviso_de_privacidad","isIndex":false,"type":"page","pattern":"^\\/aviso_de_privacidad\\/?$","segments":[[{"content":"aviso_de_privacidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aviso_de_privacidad.astro","pathname":"/aviso_de_privacidad","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/beneficios","isIndex":false,"type":"page","pattern":"^\\/beneficios\\/?$","segments":[[{"content":"beneficios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/beneficios.astro","pathname":"/beneficios","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/configuraciones","isIndex":false,"type":"page","pattern":"^\\/configuraciones\\/?$","segments":[[{"content":"configuraciones","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/configuraciones.astro","pathname":"/configuraciones","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/contacto","isIndex":false,"type":"page","pattern":"^\\/contacto\\/?$","segments":[[{"content":"contacto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacto.astro","pathname":"/contacto","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/politicas_privacidad","isIndex":false,"type":"page","pattern":"^\\/politicas_privacidad\\/?$","segments":[[{"content":"politicas_privacidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politicas_privacidad.astro","pathname":"/politicas_privacidad","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/politicas_reeembolso","isIndex":false,"type":"page","pattern":"^\\/politicas_reeembolso\\/?$","segments":[[{"content":"politicas_reeembolso","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politicas_reeembolso.astro","pathname":"/politicas_reeembolso","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const a=document.querySelectorAll(\".questionItem\"),o=s=>{const e=document.querySelector(`[data-answer='${s.target.dataset.question}']`),t=document.querySelector(`#icon_${s.target.dataset.question}`);+e.dataset.open?(e.classList.remove(\"max-h-[100px]\"),e.classList.add(\"max-h-0\"),t.classList.add(\"fa-plus\"),t.classList.remove(\"fa-minus\"),e.dataset.open=0):(e.classList.add(\"max-h-[100px]\"),e.classList.remove(\"max-h-0\"),t.classList.add(\"fa-minus\"),t.classList.remove(\"fa-plus\"),e.dataset.open=1),console.log(e.dataset.open)};a.forEach(s=>{s.addEventListener(\"click\",e=>o(e))});\n"}],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/preguntas_frecuentes","isIndex":false,"type":"page","pattern":"^\\/preguntas_frecuentes\\/?$","segments":[[{"content":"preguntas_frecuentes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/preguntas_frecuentes.astro","pathname":"/preguntas_frecuentes","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/renuncia_responsabilidades","isIndex":false,"type":"page","pattern":"^\\/renuncia_responsabilidades\\/?$","segments":[[{"content":"renuncia_responsabilidades","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/renuncia_responsabilidades.astro","pathname":"/renuncia_responsabilidades","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/acerca_de_digital.AIBs5YfJ.css"}],"routeData":{"route":"/terminos_y_condiciones","isIndex":false,"type":"page","pattern":"^\\/terminos_y_condiciones\\/?$","segments":[[{"content":"terminos_y_condiciones","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terminos_y_condiciones.astro","pathname":"/terminos_y_condiciones","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/acerca_de_digital.astro",{"propagation":"none","containsHead":true}],["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/aviso_de_privacidad.astro",{"propagation":"none","containsHead":true}],["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/beneficios.astro",{"propagation":"none","containsHead":true}],["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/configuraciones.astro",{"propagation":"none","containsHead":true}],["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/contacto.astro",{"propagation":"none","containsHead":true}],["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/politicas_privacidad.astro",{"propagation":"none","containsHead":true}],["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/politicas_reeembolso.astro",{"propagation":"none","containsHead":true}],["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/preguntas_frecuentes.astro",{"propagation":"none","containsHead":true}],["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/renuncia_responsabilidades.astro",{"propagation":"none","containsHead":true}],["/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/terminos_y_condiciones.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/aviso_de_privacidad.astro":"chunks/pages/aviso_de_privacidad_d_cU6sMh.mjs","/src/pages/beneficios.astro":"chunks/pages/beneficios_p7U0kaAQ.mjs","/src/pages/configuraciones.astro":"chunks/pages/configuraciones_KXl_1KRb.mjs","/node_modules/.pnpm/astro@4.3.5_typescript@5.2.2/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_IkZlXD8X.mjs","/src/pages/index.astro":"chunks/pages/index_x3xHgtb1.mjs","/src/pages/politicas_privacidad.astro":"chunks/pages/politicas_privacidad_dAGkyQcW.mjs","/src/pages/politicas_reeembolso.astro":"chunks/pages/politicas_reeembolso_bSDHleKP.mjs","/src/pages/preguntas_frecuentes.astro":"chunks/pages/preguntas_frecuentes_Ytbh_A1_.mjs","/src/pages/renuncia_responsabilidades.astro":"chunks/pages/renuncia_responsabilidades_Ku50RTuP.mjs","/src/pages/terminos_y_condiciones.astro":"chunks/pages/terminos_y_condiciones_4jlMJESV.mjs","\u0000@astrojs-manifest":"manifest_Wb7-IZpz.mjs","/Users/jeanpaul/Projects/digitalcerti-landing/node_modules/.pnpm/@astrojs+react@3.0.10_@types+react-dom@18.2.19_@types+react@18.2.55_react-dom@18.2.0_react@18.2.0_vite@5.1.1/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_7a5sIVmK.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.3.5_typescript@5.2.2/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_jkA46Ymn.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_VmVbhLrj.mjs","\u0000@astro-page:src/pages/acerca_de_digital@_@astro":"chunks/acerca_de_digital_34-lfGcg.mjs","\u0000@astro-page:src/pages/aviso_de_privacidad@_@astro":"chunks/aviso_de_privacidad_Z5yR69g5.mjs","\u0000@astro-page:src/pages/beneficios@_@astro":"chunks/beneficios_NPABjket.mjs","\u0000@astro-page:src/pages/configuraciones@_@astro":"chunks/configuraciones_efDbiFBC.mjs","\u0000@astro-page:src/pages/contacto@_@astro":"chunks/contacto_8WsoqXz_.mjs","\u0000@astro-page:src/pages/politicas_privacidad@_@astro":"chunks/politicas_privacidad_1BIcxGQU.mjs","\u0000@astro-page:src/pages/politicas_reeembolso@_@astro":"chunks/politicas_reeembolso_gZHD7Qy8.mjs","\u0000@astro-page:src/pages/preguntas_frecuentes@_@astro":"chunks/preguntas_frecuentes_ivA_3xRk.mjs","\u0000@astro-page:src/pages/renuncia_responsabilidades@_@astro":"chunks/renuncia_responsabilidades_9gz_F45k.mjs","\u0000@astro-page:src/pages/terminos_y_condiciones@_@astro":"chunks/terminos_y_condiciones_sIaZsoYO.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.QrjlJttO.js","@astrojs/preact/client.js":"_astro/client.1VO2DJ7l.js","/astro/hoisted.js?q=0":"_astro/hoisted.xg6Zlrkj.js","/Users/jeanpaul/Projects/digitalcerti-landing/node_modules/.pnpm/@preact+signals@1.2.2_preact@10.19.4/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.Cpd1EI6U.js","@astrojs/react/client.js":"_astro/client.ZuanqE6Z.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/client1.skVGDvSM.png","/_astro/client2.ErDhBPa6.png","/_astro/client3.AsYKW7D6.png","/_astro/client4.om0_ZxfR.png","/_astro/clock.d9JUSXfE.png","/_astro/img_girl_nav.QrLs87GA.png","/_astro/marca.k2KzOO_5.png","/_astro/fast_configuration.WaryA5X4.png","/_astro/configurations.tww4r-TJ.svg","/_astro/dataConfig.SNBCgk7L.png","/_astro/textConfig.dZSgdwkq.png","/_astro/benefits.34M4GWOl.svg","/_astro/supportConfig.ZP-WPDZk.png","/_astro/questions.CieYuemZ.png","/_astro/logo-white.z7BX5WCW.png","/_astro/client.TMDGhB6b.png","/_astro/logo-without-letter.hUmuCEuO.png","/_astro/acerca_de_digital.AIBs5YfJ.css","/favicon.svg","/_astro/client.1VO2DJ7l.js","/_astro/client.3z1Knhjv.js","/_astro/client.ZuanqE6Z.js","/_astro/signals.module.Cpd1EI6U.js"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
