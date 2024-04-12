!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).RevealNotes = e()
}(this, (function() {
    "use strict";
    function t() {
        return {
            async: !1,
            baseUrl: null,
            breaks: !1,
            extensions: null,
            gfm: !0,
            headerIds: !0,
            headerPrefix: "",
            highlight: null,
            hooks: null,
            langPrefix: "language-",
            mangle: !0,
            pedantic: !1,
            renderer: null,
            sanitize: !1,
            sanitizer: null,
            silent: !1,
            smartypants: !1,
            tokenizer: null,
            walkTokens: null,
            xhtml: !1
        }
    }
    let e = {
        async: !1,
        baseUrl: null,
        breaks: !1,
        extensions: null,
        gfm: !0,
        headerIds: !0,
        headerPrefix: "",
        highlight: null,
        hooks: null,
        langPrefix: "language-",
        mangle: !0,
        pedantic: !1,
        renderer: null,
        sanitize: !1,
        sanitizer: null,
        silent: !1,
        smartypants: !1,
        tokenizer: null,
        walkTokens: null,
        xhtml: !1
    };
    const n = /[&<>"']/
      , i = new RegExp(n.source,"g")
      , s = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/
      , r = new RegExp(s.source,"g")
      , a = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }
      , o = t=>a[t];
    function l(t, e) {
        if (e) {
            if (n.test(t))
                return t.replace(i, o)
        } else if (s.test(t))
            return t.replace(r, o);
        return t
    }
    const c = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
    function p(t) {
        return t.replace(c, ((t,e)=>"colon" === (e = e.toLowerCase()) ? ":" : "#" === e.charAt(0) ? "x" === e.charAt(1) ? String.fromCharCode(parseInt(e.substring(2), 16)) : String.fromCharCode(+e.substring(1)) : ""))
    }
    const u = /(^|[^\[])\^/g;
    function d(t, e) {
        t = "string" == typeof t ? t : t.source,
        e = e || "";
        const n = {
            replace: (e,i)=>(i = (i = i.source || i).replace(u, "$1"),
            t = t.replace(e, i),
            n),
            getRegex: ()=>new RegExp(t,e)
        };
        return n
    }
    const h = /[^\w:]/g
      , g = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    function m(t, e, n) {
        if (t) {
            let t;
            try {
                t = decodeURIComponent(p(n)).replace(h, "").toLowerCase()
            } catch (t) {
                return null
            }
            if (0 === t.indexOf("javascript:") || 0 === t.indexOf("vbscript:") || 0 === t.indexOf("data:"))
                return null
        }
        e && !g.test(n) && (n = function(t, e) {
            f[" " + t] || (k.test(t) ? f[" " + t] = t + "/" : f[" " + t] = v(t, "/", !0));
            t = f[" " + t];
            const n = -1 === t.indexOf(":");
            return "//" === e.substring(0, 2) ? n ? e : t.replace(w, "$1") + e : "/" === e.charAt(0) ? n ? e : t.replace(x, "$1") + e : t + e
        }(e, n));
        try {
            n = encodeURI(n).replace(/%25/g, "%")
        } catch (t) {
            return null
        }
        return n
    }
    const f = {}
      , k = /^[^:]+:\/*[^/]*$/
      , w = /^([^:]+:)[\s\S]*$/
      , x = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    const b = {
        exec: function() {}
    };
    function y(t, e) {
        const n = t.replace(/\|/g, ((t,e,n)=>{
            let i = !1
              , s = e;
            for (; --s >= 0 && "\\" === n[s]; )
                i = !i;
            return i ? "|" : " |"
        }
        )).split(/ \|/);
        let i = 0;
        if (n[0].trim() || n.shift(),
        n.length > 0 && !n[n.length - 1].trim() && n.pop(),
        n.length > e)
            n.splice(e);
        else
            for (; n.length < e; )
                n.push("");
        for (; i < n.length; i++)
            n[i] = n[i].trim().replace(/\\\|/g, "|");
        return n
    }
    function v(t, e, n) {
        const i = t.length;
        if (0 === i)
            return "";
        let s = 0;
        for (; s < i; ) {
            const r = t.charAt(i - s - 1);
            if (r !== e || n) {
                if (r === e || !n)
                    break;
                s++
            } else
                s++
        }
        return t.slice(0, i - s)
    }
    function S(t, e) {
        if (e < 1)
            return "";
        let n = "";
        for (; e > 1; )
            1 & e && (n += t),
            e >>= 1,
            t += t;
        return n + t
    }
    function T(t, e, n, i) {
        const s = e.href
          , r = e.title ? l(e.title) : null
          , a = t[1].replace(/\\([\[\]])/g, "$1");
        if ("!" !== t[0].charAt(0)) {
            i.state.inLink = !0;
            const t = {
                type: "link",
                raw: n,
                href: s,
                title: r,
                text: a,
                tokens: i.inlineTokens(a)
            };
            return i.state.inLink = !1,
            t
        }
        return {
            type: "image",
            raw: n,
            href: s,
            title: r,
            text: l(a)
        }
    }
    class _ {
        constructor(t) {
            this.options = t || e
        }
        space(t) {
            const e = this.rules.block.newline.exec(t);
            if (e && e[0].length > 0)
                return {
                    type: "space",
                    raw: e[0]
                }
        }
        code(t) {
            const e = this.rules.block.code.exec(t);
            if (e) {
                const t = e[0].replace(/^ {1,4}/gm, "");
                return {
                    type: "code",
                    raw: e[0],
                    codeBlockStyle: "indented",
                    text: this.options.pedantic ? t : v(t, "\n")
                }
            }
        }
        fences(t) {
            const e = this.rules.block.fences.exec(t);
            if (e) {
                const t = e[0]
                  , n = function(t, e) {
                    const n = t.match(/^(\s+)(?:```)/);
                    if (null === n)
                        return e;
                    const i = n[1];
                    return e.split("\n").map((t=>{
                        const e = t.match(/^\s+/);
                        if (null === e)
                            return t;
                        const [n] = e;
                        return n.length >= i.length ? t.slice(i.length) : t
                    }
                    )).join("\n")
                }(t, e[3] || "");
                return {
                    type: "code",
                    raw: t,
                    lang: e[2] ? e[2].trim().replace(this.rules.inline._escapes, "$1") : e[2],
                    text: n
                }
            }
        }
        heading(t) {
            const e = this.rules.block.heading.exec(t);
            if (e) {
                let t = e[2].trim();
                if (/#$/.test(t)) {
                    const e = v(t, "#");
                    this.options.pedantic ? t = e.trim() : e && !/ $/.test(e) || (t = e.trim())
                }
                return {
                    type: "heading",
                    raw: e[0],
                    depth: e[1].length,
                    text: t,
                    tokens: this.lexer.inline(t)
                }
            }
        }
        hr(t) {
            const e = this.rules.block.hr.exec(t);
            if (e)
                return {
                    type: "hr",
                    raw: e[0]
                }
        }
        blockquote(t) {
            const e = this.rules.block.blockquote.exec(t);
            if (e) {
                const t = e[0].replace(/^ *>[ \t]?/gm, "")
                  , n = this.lexer.state.top;
                this.lexer.state.top = !0;
                const i = this.lexer.blockTokens(t);
                return this.lexer.state.top = n,
                {
                    type: "blockquote",
                    raw: e[0],
                    tokens: i,
                    text: t
                }
            }
        }
        list(t) {
            let e = this.rules.block.list.exec(t);
            if (e) {
                let n, i, s, r, a, o, l, c, p, u, d, h, g = e[1].trim();
                const m = g.length > 1
                  , f = {
                    type: "list",
                    raw: "",
                    ordered: m,
                    start: m ? +g.slice(0, -1) : "",
                    loose: !1,
                    items: []
                };
                g = m ? `\\d{1,9}\\${g.slice(-1)}` : `\\${g}`,
                this.options.pedantic && (g = m ? g : "[*+-]");
                const k = new RegExp(`^( {0,3}${g})((?:[\t ][^\\n]*)?(?:\\n|$))`);
                for (; t && (h = !1,
                e = k.exec(t)) && !this.rules.block.hr.test(t); ) {
                    if (n = e[0],
                    t = t.substring(n.length),
                    c = e[2].split("\n", 1)[0].replace(/^\t+/, (t=>" ".repeat(3 * t.length))),
                    p = t.split("\n", 1)[0],
                    this.options.pedantic ? (r = 2,
                    d = c.trimLeft()) : (r = e[2].search(/[^ ]/),
                    r = r > 4 ? 1 : r,
                    d = c.slice(r),
                    r += e[1].length),
                    o = !1,
                    !c && /^ *$/.test(p) && (n += p + "\n",
                    t = t.substring(p.length + 1),
                    h = !0),
                    !h) {
                        const e = new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`)
                          , i = new RegExp(`^ {0,${Math.min(3, r - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)
                          , s = new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`)
                          , a = new RegExp(`^ {0,${Math.min(3, r - 1)}}#`);
                        for (; t && (u = t.split("\n", 1)[0],
                        p = u,
                        this.options.pedantic && (p = p.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
                        !s.test(p)) && !a.test(p) && !e.test(p) && !i.test(t); ) {
                            if (p.search(/[^ ]/) >= r || !p.trim())
                                d += "\n" + p.slice(r);
                            else {
                                if (o)
                                    break;
                                if (c.search(/[^ ]/) >= 4)
                                    break;
                                if (s.test(c))
                                    break;
                                if (a.test(c))
                                    break;
                                if (i.test(c))
                                    break;
                                d += "\n" + p
                            }
                            o || p.trim() || (o = !0),
                            n += u + "\n",
                            t = t.substring(u.length + 1),
                            c = p.slice(r)
                        }
                    }
                    f.loose || (l ? f.loose = !0 : /\n *\n *$/.test(n) && (l = !0)),
                    this.options.gfm && (i = /^\[[ xX]\] /.exec(d),
                    i && (s = "[ ] " !== i[0],
                    d = d.replace(/^\[[ xX]\] +/, ""))),
                    f.items.push({
                        type: "list_item",
                        raw: n,
                        task: !!i,
                        checked: s,
                        loose: !1,
                        text: d
                    }),
                    f.raw += n
                }
                f.items[f.items.length - 1].raw = n.trimRight(),
                f.items[f.items.length - 1].text = d.trimRight(),
                f.raw = f.raw.trimRight();
                const w = f.items.length;
                for (a = 0; a < w; a++)
                    if (this.lexer.state.top = !1,
                    f.items[a].tokens = this.lexer.blockTokens(f.items[a].text, []),
                    !f.loose) {
                        const t = f.items[a].tokens.filter((t=>"space" === t.type))
                          , e = t.length > 0 && t.some((t=>/\n.*\n/.test(t.raw)));
                        f.loose = e
                    }
                if (f.loose)
                    for (a = 0; a < w; a++)
                        f.items[a].loose = !0;
                return f
            }
        }
        html(t) {
            const e = this.rules.block.html.exec(t);
            if (e) {
                const t = {
                    type: "html",
                    raw: e[0],
                    pre: !this.options.sanitizer && ("pre" === e[1] || "script" === e[1] || "style" === e[1]),
                    text: e[0]
                };
                if (this.options.sanitize) {
                    const n = this.options.sanitizer ? this.options.sanitizer(e[0]) : l(e[0]);
                    t.type = "paragraph",
                    t.text = n,
                    t.tokens = this.lexer.inline(n)
                }
                return t
            }
        }
        def(t) {
            const e = this.rules.block.def.exec(t);
            if (e) {
                const t = e[1].toLowerCase().replace(/\s+/g, " ")
                  , n = e[2] ? e[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : ""
                  , i = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline._escapes, "$1") : e[3];
                return {
                    type: "def",
                    tag: t,
                    raw: e[0],
                    href: n,
                    title: i
                }
            }
        }
        table(t) {
            const e = this.rules.block.table.exec(t);
            if (e) {
                const t = {
                    type: "table",
                    header: y(e[1]).map((t=>({
                        text: t
                    }))),
                    align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    rows: e[3] && e[3].trim() ? e[3].replace(/\n[ \t]*$/, "").split("\n") : []
                };
                if (t.header.length === t.align.length) {
                    t.raw = e[0];
                    let n, i, s, r, a = t.align.length;
                    for (n = 0; n < a; n++)
                        /^ *-+: *$/.test(t.align[n]) ? t.align[n] = "right" : /^ *:-+: *$/.test(t.align[n]) ? t.align[n] = "center" : /^ *:-+ *$/.test(t.align[n]) ? t.align[n] = "left" : t.align[n] = null;
                    for (a = t.rows.length,
                    n = 0; n < a; n++)
                        t.rows[n] = y(t.rows[n], t.header.length).map((t=>({
                            text: t
                        })));
                    for (a = t.header.length,
                    i = 0; i < a; i++)
                        t.header[i].tokens = this.lexer.inline(t.header[i].text);
                    for (a = t.rows.length,
                    i = 0; i < a; i++)
                        for (r = t.rows[i],
                        s = 0; s < r.length; s++)
                            r[s].tokens = this.lexer.inline(r[s].text);
                    return t
                }
            }
        }
        lheading(t) {
            const e = this.rules.block.lheading.exec(t);
            if (e)
                return {
                    type: "heading",
                    raw: e[0],
                    depth: "=" === e[2].charAt(0) ? 1 : 2,
                    text: e[1],
                    tokens: this.lexer.inline(e[1])
                }
        }
        paragraph(t) {
            const e = this.rules.block.paragraph.exec(t);
            if (e) {
                const t = "\n" === e[1].charAt(e[1].length - 1) ? e[1].slice(0, -1) : e[1];
                return {
                    type: "paragraph",
                    raw: e[0],
                    text: t,
                    tokens: this.lexer.inline(t)
                }
            }
        }
        text(t) {
            const e = this.rules.block.text.exec(t);
            if (e)
                return {
                    type: "text",
                    raw: e[0],
                    text: e[0],
                    tokens: this.lexer.inline(e[0])
                }
        }
        escape(t) {
            const e = this.rules.inline.escape.exec(t);
            if (e)
                return {
                    type: "escape",
                    raw: e[0],
                    text: l(e[1])
                }
        }
        tag(t) {
            const e = this.rules.inline.tag.exec(t);
            if (e)
                return !this.lexer.state.inLink && /^<a /i.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(e[0]) && (this.lexer.state.inLink = !1),
                !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) && (this.lexer.state.inRawBlock = !1),
                {
                    type: this.options.sanitize ? "text" : "html",
                    raw: e[0],
                    inLink: this.lexer.state.inLink,
                    inRawBlock: this.lexer.state.inRawBlock,
                    text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : l(e[0]) : e[0]
                }
        }
        link(t) {
            const e = this.rules.inline.link.exec(t);
            if (e) {
                const t = e[2].trim();
                if (!this.options.pedantic && /^</.test(t)) {
                    if (!/>$/.test(t))
                        return;
                    const e = v(t.slice(0, -1), "\\");
                    if ((t.length - e.length) % 2 == 0)
                        return
                } else {
                    const t = function(t, e) {
                        if (-1 === t.indexOf(e[1]))
                            return -1;
                        const n = t.length;
                        let i = 0
                          , s = 0;
                        for (; s < n; s++)
                            if ("\\" === t[s])
                                s++;
                            else if (t[s] === e[0])
                                i++;
                            else if (t[s] === e[1] && (i--,
                            i < 0))
                                return s;
                        return -1
                    }(e[2], "()");
                    if (t > -1) {
                        const n = (0 === e[0].indexOf("!") ? 5 : 4) + e[1].length + t;
                        e[2] = e[2].substring(0, t),
                        e[0] = e[0].substring(0, n).trim(),
                        e[3] = ""
                    }
                }
                let n = e[2]
                  , i = "";
                if (this.options.pedantic) {
                    const t = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
                    t && (n = t[1],
                    i = t[3])
                } else
                    i = e[3] ? e[3].slice(1, -1) : "";
                return n = n.trim(),
                /^</.test(n) && (n = this.options.pedantic && !/>$/.test(t) ? n.slice(1) : n.slice(1, -1)),
                T(e, {
                    href: n ? n.replace(this.rules.inline._escapes, "$1") : n,
                    title: i ? i.replace(this.rules.inline._escapes, "$1") : i
                }, e[0], this.lexer)
            }
        }
        reflink(t, e) {
            let n;
            if ((n = this.rules.inline.reflink.exec(t)) || (n = this.rules.inline.nolink.exec(t))) {
                let t = (n[2] || n[1]).replace(/\s+/g, " ");
                if (t = e[t.toLowerCase()],
                !t) {
                    const t = n[0].charAt(0);
                    return {
                        type: "text",
                        raw: t,
                        text: t
                    }
                }
                return T(n, t, n[0], this.lexer)
            }
        }
        emStrong(t, e, n="") {
            let i = this.rules.inline.emStrong.lDelim.exec(t);
            if (!i)
                return;
            if (i[3] && n.match(/[\p{L}\p{N}]/u))
                return;
            const s = i[1] || i[2] || "";
            if (!s || s && ("" === n || this.rules.inline.punctuation.exec(n))) {
                const n = i[0].length - 1;
                let s, r, a = n, o = 0;
                const l = "*" === i[0][0] ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
                for (l.lastIndex = 0,
                e = e.slice(-1 * t.length + n); null != (i = l.exec(e)); ) {
                    if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6],
                    !s)
                        continue;
                    if (r = s.length,
                    i[3] || i[4]) {
                        a += r;
                        continue
                    }
                    if ((i[5] || i[6]) && n % 3 && !((n + r) % 3)) {
                        o += r;
                        continue
                    }
                    if (a -= r,
                    a > 0)
                        continue;
                    r = Math.min(r, r + a + o);
                    const e = t.slice(0, n + i.index + (i[0].length - s.length) + r);
                    if (Math.min(n, r) % 2) {
                        const t = e.slice(1, -1);
                        return {
                            type: "em",
                            raw: e,
                            text: t,
                            tokens: this.lexer.inlineTokens(t)
                        }
                    }
                    const l = e.slice(2, -2);
                    return {
                        type: "strong",
                        raw: e,
                        text: l,
                        tokens: this.lexer.inlineTokens(l)
                    }
                }
            }
        }
        codespan(t) {
            const e = this.rules.inline.code.exec(t);
            if (e) {
                let t = e[2].replace(/\n/g, " ");
                const n = /[^ ]/.test(t)
                  , i = /^ /.test(t) && / $/.test(t);
                return n && i && (t = t.substring(1, t.length - 1)),
                t = l(t, !0),
                {
                    type: "codespan",
                    raw: e[0],
                    text: t
                }
            }
        }
        br(t) {
            const e = this.rules.inline.br.exec(t);
            if (e)
                return {
                    type: "br",
                    raw: e[0]
                }
        }
        del(t) {
            const e = this.rules.inline.del.exec(t);
            if (e)
                return {
                    type: "del",
                    raw: e[0],
                    text: e[2],
                    tokens: this.lexer.inlineTokens(e[2])
                }
        }
        autolink(t, e) {
            const n = this.rules.inline.autolink.exec(t);
            if (n) {
                let t, i;
                return "@" === n[2] ? (t = l(this.options.mangle ? e(n[1]) : n[1]),
                i = "mailto:" + t) : (t = l(n[1]),
                i = t),
                {
                    type: "link",
                    raw: n[0],
                    text: t,
                    href: i,
                    tokens: [{
                        type: "text",
                        raw: t,
                        text: t
                    }]
                }
            }
        }
        url(t, e) {
            let n;
            if (n = this.rules.inline.url.exec(t)) {
                let t, i;
                if ("@" === n[2])
                    t = l(this.options.mangle ? e(n[0]) : n[0]),
                    i = "mailto:" + t;
                else {
                    let e;
                    do {
                        e = n[0],
                        n[0] = this.rules.inline._backpedal.exec(n[0])[0]
                    } while (e !== n[0]);
                    t = l(n[0]),
                    i = "www." === n[1] ? "http://" + n[0] : n[0]
                }
                return {
                    type: "link",
                    raw: n[0],
                    text: t,
                    href: i,
                    tokens: [{
                        type: "text",
                        raw: t,
                        text: t
                    }]
                }
            }
        }
        inlineText(t, e) {
            const n = this.rules.inline.text.exec(t);
            if (n) {
                let t;
                return t = this.lexer.state.inRawBlock ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(n[0]) : l(n[0]) : n[0] : l(this.options.smartypants ? e(n[0]) : n[0]),
                {
                    type: "text",
                    raw: n[0],
                    text: t
                }
            }
        }
    }
    const z = {
        newline: /^(?: *(?:\n|$))+/,
        code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
        fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
        hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
        html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
        def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
        table: b,
        lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
        text: /^[^\n]+/,
        _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
        _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
    };
    z.def = d(z.def).replace("label", z._label).replace("title", z._title).getRegex(),
    z.bullet = /(?:[*+-]|\d{1,9}[.)])/,
    z.listItemStart = d(/^( *)(bull) */).replace("bull", z.bullet).getRegex(),
    z.list = d(z.list).replace(/bull/g, z.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + z.def.source + ")").getRegex(),
    z._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
    z._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/,
    z.html = d(z.html, "i").replace("comment", z._comment).replace("tag", z._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),
    z.paragraph = d(z._paragraph).replace("hr", z.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", z._tag).getRegex(),
    z.blockquote = d(z.blockquote).replace("paragraph", z.paragraph).getRegex(),
    z.normal = {
        ...z
    },
    z.gfm = {
        ...z.normal,
        table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
    },
    z.gfm.table = d(z.gfm.table).replace("hr", z.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", z._tag).getRegex(),
    z.gfm.paragraph = d(z._paragraph).replace("hr", z.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", z.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", z._tag).getRegex(),
    z.pedantic = {
        ...z.normal,
        html: d("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", z._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: b,
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: d(z.normal._paragraph).replace("hr", z.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", z.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
    };
    const $ = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: b,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(ref)\]/,
        nolink: /^!?\[(ref)\](?:\[\])?/,
        reflinkSearch: "reflink|nolink(?!\\()",
        emStrong: {
            lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
            rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
            rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
        },
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: b,
        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
        punctuation: /^([\spunctuation])/
    };
    function E(t) {
        return t.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…")
    }
    function A(t) {
        let e, n, i = "";
        const s = t.length;
        for (e = 0; e < s; e++)
            n = t.charCodeAt(e),
            Math.random() > .5 && (n = "x" + n.toString(16)),
            i += "&#" + n + ";";
        return i
    }
    $._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",
    $.punctuation = d($.punctuation).replace(/punctuation/g, $._punctuation).getRegex(),
    $.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,
    $.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g,
    $._comment = d(z._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(),
    $.emStrong.lDelim = d($.emStrong.lDelim).replace(/punct/g, $._punctuation).getRegex(),
    $.emStrong.rDelimAst = d($.emStrong.rDelimAst, "g").replace(/punct/g, $._punctuation).getRegex(),
    $.emStrong.rDelimUnd = d($.emStrong.rDelimUnd, "g").replace(/punct/g, $._punctuation).getRegex(),
    $._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,
    $._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,
    $._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,
    $.autolink = d($.autolink).replace("scheme", $._scheme).replace("email", $._email).getRegex(),
    $._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,
    $.tag = d($.tag).replace("comment", $._comment).replace("attribute", $._attribute).getRegex(),
    $._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
    $._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,
    $._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,
    $.link = d($.link).replace("label", $._label).replace("href", $._href).replace("title", $._title).getRegex(),
    $.reflink = d($.reflink).replace("label", $._label).replace("ref", z._label).getRegex(),
    $.nolink = d($.nolink).replace("ref", z._label).getRegex(),
    $.reflinkSearch = d($.reflinkSearch, "g").replace("reflink", $.reflink).replace("nolink", $.nolink).getRegex(),
    $.normal = {
        ...$
    },
    $.pedantic = {
        ...$.normal,
        strong: {
            start: /^__|\*\*/,
            middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            endAst: /\*\*(?!\*)/g,
            endUnd: /__(?!_)/g
        },
        em: {
            start: /^_|\*/,
            middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
            endAst: /\*(?!\*)/g,
            endUnd: /_(?!_)/g
        },
        link: d(/^!?\[(label)\]\((.*?)\)/).replace("label", $._label).getRegex(),
        reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", $._label).getRegex()
    },
    $.gfm = {
        ...$.normal,
        escape: d($.escape).replace("])", "~|])").getRegex(),
        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    },
    $.gfm.url = d($.gfm.url, "i").replace("email", $.gfm._extended_email).getRegex(),
    $.breaks = {
        ...$.gfm,
        br: d($.br).replace("{2,}", "*").getRegex(),
        text: d($.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    };
    class R {
        constructor(t) {
            this.tokens = [],
            this.tokens.links = Object.create(null),
            this.options = t || e,
            this.options.tokenizer = this.options.tokenizer || new _,
            this.tokenizer = this.options.tokenizer,
            this.tokenizer.options = this.options,
            this.tokenizer.lexer = this,
            this.inlineQueue = [],
            this.state = {
                inLink: !1,
                inRawBlock: !1,
                top: !0
            };
            const n = {
                block: z.normal,
                inline: $.normal
            };
            this.options.pedantic ? (n.block = z.pedantic,
            n.inline = $.pedantic) : this.options.gfm && (n.block = z.gfm,
            this.options.breaks ? n.inline = $.breaks : n.inline = $.gfm),
            this.tokenizer.rules = n
        }
        static get rules() {
            return {
                block: z,
                inline: $
            }
        }
        static lex(t, e) {
            return new R(e).lex(t)
        }
        static lexInline(t, e) {
            return new R(e).inlineTokens(t)
        }
        lex(t) {
            let e;
            for (t = t.replace(/\r\n|\r/g, "\n"),
            this.blockTokens(t, this.tokens); e = this.inlineQueue.shift(); )
                this.inlineTokens(e.src, e.tokens);
            return this.tokens
        }
        blockTokens(t, e=[]) {
            let n, i, s, r;
            for (t = this.options.pedantic ? t.replace(/\t/g, "    ").replace(/^ +$/gm, "") : t.replace(/^( *)(\t+)/gm, ((t,e,n)=>e + "    ".repeat(n.length))); t; )
                if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((i=>!!(n = i.call({
                    lexer: this
                }, t, e)) && (t = t.substring(n.raw.length),
                e.push(n),
                !0)))))
                    if (n = this.tokenizer.space(t))
                        t = t.substring(n.raw.length),
                        1 === n.raw.length && e.length > 0 ? e[e.length - 1].raw += "\n" : e.push(n);
                    else if (n = this.tokenizer.code(t))
                        t = t.substring(n.raw.length),
                        i = e[e.length - 1],
                        !i || "paragraph" !== i.type && "text" !== i.type ? e.push(n) : (i.raw += "\n" + n.raw,
                        i.text += "\n" + n.text,
                        this.inlineQueue[this.inlineQueue.length - 1].src = i.text);
                    else if (n = this.tokenizer.fences(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.heading(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.hr(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.blockquote(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.list(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.html(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.def(t))
                        t = t.substring(n.raw.length),
                        i = e[e.length - 1],
                        !i || "paragraph" !== i.type && "text" !== i.type ? this.tokens.links[n.tag] || (this.tokens.links[n.tag] = {
                            href: n.href,
                            title: n.title
                        }) : (i.raw += "\n" + n.raw,
                        i.text += "\n" + n.raw,
                        this.inlineQueue[this.inlineQueue.length - 1].src = i.text);
                    else if (n = this.tokenizer.table(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.lheading(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else {
                        if (s = t,
                        this.options.extensions && this.options.extensions.startBlock) {
                            let e = 1 / 0;
                            const n = t.slice(1);
                            let i;
                            this.options.extensions.startBlock.forEach((function(t) {
                                i = t.call({
                                    lexer: this
                                }, n),
                                "number" == typeof i && i >= 0 && (e = Math.min(e, i))
                            }
                            )),
                            e < 1 / 0 && e >= 0 && (s = t.substring(0, e + 1))
                        }
                        if (this.state.top && (n = this.tokenizer.paragraph(s)))
                            i = e[e.length - 1],
                            r && "paragraph" === i.type ? (i.raw += "\n" + n.raw,
                            i.text += "\n" + n.text,
                            this.inlineQueue.pop(),
                            this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : e.push(n),
                            r = s.length !== t.length,
                            t = t.substring(n.raw.length);
                        else if (n = this.tokenizer.text(t))
                            t = t.substring(n.raw.length),
                            i = e[e.length - 1],
                            i && "text" === i.type ? (i.raw += "\n" + n.raw,
                            i.text += "\n" + n.text,
                            this.inlineQueue.pop(),
                            this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : e.push(n);
                        else if (t) {
                            const e = "Infinite loop on byte: " + t.charCodeAt(0);
                            if (this.options.silent) {
                                console.error(e);
                                break
                            }
                            throw new Error(e)
                        }
                    }
            return this.state.top = !0,
            e
        }
        inline(t, e=[]) {
            return this.inlineQueue.push({
                src: t,
                tokens: e
            }),
            e
        }
        inlineTokens(t, e=[]) {
            let n, i, s, r, a, o, l = t;
            if (this.tokens.links) {
                const t = Object.keys(this.tokens.links);
                if (t.length > 0)
                    for (; null != (r = this.tokenizer.rules.inline.reflinkSearch.exec(l)); )
                        t.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (l = l.slice(0, r.index) + "[" + S("a", r[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
            }
            for (; null != (r = this.tokenizer.rules.inline.blockSkip.exec(l)); )
                l = l.slice(0, r.index) + "[" + S("a", r[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            for (; null != (r = this.tokenizer.rules.inline.escapedEmSt.exec(l)); )
                l = l.slice(0, r.index + r[0].length - 2) + "++" + l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),
                this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
            for (; t; )
                if (a || (o = ""),
                a = !1,
                !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((i=>!!(n = i.call({
                    lexer: this
                }, t, e)) && (t = t.substring(n.raw.length),
                e.push(n),
                !0)))))
                    if (n = this.tokenizer.escape(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.tag(t))
                        t = t.substring(n.raw.length),
                        i = e[e.length - 1],
                        i && "text" === n.type && "text" === i.type ? (i.raw += n.raw,
                        i.text += n.text) : e.push(n);
                    else if (n = this.tokenizer.link(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.reflink(t, this.tokens.links))
                        t = t.substring(n.raw.length),
                        i = e[e.length - 1],
                        i && "text" === n.type && "text" === i.type ? (i.raw += n.raw,
                        i.text += n.text) : e.push(n);
                    else if (n = this.tokenizer.emStrong(t, l, o))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.codespan(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.br(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.del(t))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (n = this.tokenizer.autolink(t, A))
                        t = t.substring(n.raw.length),
                        e.push(n);
                    else if (this.state.inLink || !(n = this.tokenizer.url(t, A))) {
                        if (s = t,
                        this.options.extensions && this.options.extensions.startInline) {
                            let e = 1 / 0;
                            const n = t.slice(1);
                            let i;
                            this.options.extensions.startInline.forEach((function(t) {
                                i = t.call({
                                    lexer: this
                                }, n),
                                "number" == typeof i && i >= 0 && (e = Math.min(e, i))
                            }
                            )),
                            e < 1 / 0 && e >= 0 && (s = t.substring(0, e + 1))
                        }
                        if (n = this.tokenizer.inlineText(s, E))
                            t = t.substring(n.raw.length),
                            "_" !== n.raw.slice(-1) && (o = n.raw.slice(-1)),
                            a = !0,
                            i = e[e.length - 1],
                            i && "text" === i.type ? (i.raw += n.raw,
                            i.text += n.text) : e.push(n);
                        else if (t) {
                            const e = "Infinite loop on byte: " + t.charCodeAt(0);
                            if (this.options.silent) {
                                console.error(e);
                                break
                            }
                            throw new Error(e)
                        }
                    } else
                        t = t.substring(n.raw.length),
                        e.push(n);
            return e
        }
    }
    class L {
        constructor(t) {
            this.options = t || e
        }
        code(t, e, n) {
            const i = (e || "").match(/\S*/)[0];
            if (this.options.highlight) {
                const e = this.options.highlight(t, i);
                null != e && e !== t && (n = !0,
                t = e)
            }
            return t = t.replace(/\n$/, "") + "\n",
            i ? '<pre><code class="' + this.options.langPrefix + l(i) + '">' + (n ? t : l(t, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? t : l(t, !0)) + "</code></pre>\n"
        }
        blockquote(t) {
            return `<blockquote>\n${t}</blockquote>\n`
        }
        html(t) {
            return t
        }
        heading(t, e, n, i) {
            if (this.options.headerIds) {
                return `<h${e} id="${this.options.headerPrefix + i.slug(n)}">${t}</h${e}>\n`
            }
            return `<h${e}>${t}</h${e}>\n`
        }
        hr() {
            return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
        }
        list(t, e, n) {
            const i = e ? "ol" : "ul";
            return "<" + i + (e && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + t + "</" + i + ">\n"
        }
        listitem(t) {
            return `<li>${t}</li>\n`
        }
        checkbox(t) {
            return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> "
        }
        paragraph(t) {
            return `<p>${t}</p>\n`
        }
        table(t, e) {
            return e && (e = `<tbody>${e}</tbody>`),
            "<table>\n<thead>\n" + t + "</thead>\n" + e + "</table>\n"
        }
        tablerow(t) {
            return `<tr>\n${t}</tr>\n`
        }
        tablecell(t, e) {
            const n = e.header ? "th" : "td";
            return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>\n`
        }
        strong(t) {
            return `<strong>${t}</strong>`
        }
        em(t) {
            return `<em>${t}</em>`
        }
        codespan(t) {
            return `<code>${t}</code>`
        }
        br() {
            return this.options.xhtml ? "<br/>" : "<br>"
        }
        del(t) {
            return `<del>${t}</del>`
        }
        link(t, e, n) {
            if (null === (t = m(this.options.sanitize, this.options.baseUrl, t)))
                return n;
            let i = '<a href="' + t + '"';
            return e && (i += ' title="' + e + '"'),
            i += ">" + n + "</a>",
            i
        }
        image(t, e, n) {
            if (null === (t = m(this.options.sanitize, this.options.baseUrl, t)))
                return n;
            let i = `<img src="${t}" alt="${n}"`;
            return e && (i += ` title="${e}"`),
            i += this.options.xhtml ? "/>" : ">",
            i
        }
        text(t) {
            return t
        }
    }
    class I {
        strong(t) {
            return t
        }
        em(t) {
            return t
        }
        codespan(t) {
            return t
        }
        del(t) {
            return t
        }
        html(t) {
            return t
        }
        text(t) {
            return t
        }
        link(t, e, n) {
            return "" + n
        }
        image(t, e, n) {
            return "" + n
        }
        br() {
            return ""
        }
    }
    class M {
        constructor() {
            this.seen = {}
        }
        serialize(t) {
            return t.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-")
        }
        getNextSafeSlug(t, e) {
            let n = t
              , i = 0;
            if (this.seen.hasOwnProperty(n)) {
                i = this.seen[t];
                do {
                    i++,
                    n = t + "-" + i
                } while (this.seen.hasOwnProperty(n))
            }
            return e || (this.seen[t] = i,
            this.seen[n] = 0),
            n
        }
        slug(t, e={}) {
            const n = this.serialize(t);
            return this.getNextSafeSlug(n, e.dryrun)
        }
    }
    class C {
        constructor(t) {
            this.options = t || e,
            this.options.renderer = this.options.renderer || new L,
            this.renderer = this.options.renderer,
            this.renderer.options = this.options,
            this.textRenderer = new I,
            this.slugger = new M
        }
        static parse(t, e) {
            return new C(e).parse(t)
        }
        static parseInline(t, e) {
            return new C(e).parseInline(t)
        }
        parse(t, e=!0) {
            let n, i, s, r, a, o, l, c, u, d, h, g, m, f, k, w, x, b, y, v = "";
            const S = t.length;
            for (n = 0; n < S; n++)
                if (d = t[n],
                this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[d.type] && (y = this.options.extensions.renderers[d.type].call({
                    parser: this
                }, d),
                !1 !== y || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(d.type)))
                    v += y || "";
                else
                    switch (d.type) {
                    case "space":
                        continue;
                    case "hr":
                        v += this.renderer.hr();
                        continue;
                    case "heading":
                        v += this.renderer.heading(this.parseInline(d.tokens), d.depth, p(this.parseInline(d.tokens, this.textRenderer)), this.slugger);
                        continue;
                    case "code":
                        v += this.renderer.code(d.text, d.lang, d.escaped);
                        continue;
                    case "table":
                        for (c = "",
                        l = "",
                        r = d.header.length,
                        i = 0; i < r; i++)
                            l += this.renderer.tablecell(this.parseInline(d.header[i].tokens), {
                                header: !0,
                                align: d.align[i]
                            });
                        for (c += this.renderer.tablerow(l),
                        u = "",
                        r = d.rows.length,
                        i = 0; i < r; i++) {
                            for (o = d.rows[i],
                            l = "",
                            a = o.length,
                            s = 0; s < a; s++)
                                l += this.renderer.tablecell(this.parseInline(o[s].tokens), {
                                    header: !1,
                                    align: d.align[s]
                                });
                            u += this.renderer.tablerow(l)
                        }
                        v += this.renderer.table(c, u);
                        continue;
                    case "blockquote":
                        u = this.parse(d.tokens),
                        v += this.renderer.blockquote(u);
                        continue;
                    case "list":
                        for (h = d.ordered,
                        g = d.start,
                        m = d.loose,
                        r = d.items.length,
                        u = "",
                        i = 0; i < r; i++)
                            k = d.items[i],
                            w = k.checked,
                            x = k.task,
                            f = "",
                            k.task && (b = this.renderer.checkbox(w),
                            m ? k.tokens.length > 0 && "paragraph" === k.tokens[0].type ? (k.tokens[0].text = b + " " + k.tokens[0].text,
                            k.tokens[0].tokens && k.tokens[0].tokens.length > 0 && "text" === k.tokens[0].tokens[0].type && (k.tokens[0].tokens[0].text = b + " " + k.tokens[0].tokens[0].text)) : k.tokens.unshift({
                                type: "text",
                                text: b
                            }) : f += b),
                            f += this.parse(k.tokens, m),
                            u += this.renderer.listitem(f, x, w);
                        v += this.renderer.list(u, h, g);
                        continue;
                    case "html":
                        v += this.renderer.html(d.text);
                        continue;
                    case "paragraph":
                        v += this.renderer.paragraph(this.parseInline(d.tokens));
                        continue;
                    case "text":
                        for (u = d.tokens ? this.parseInline(d.tokens) : d.text; n + 1 < S && "text" === t[n + 1].type; )
                            d = t[++n],
                            u += "\n" + (d.tokens ? this.parseInline(d.tokens) : d.text);
                        v += e ? this.renderer.paragraph(u) : u;
                        continue;
                    default:
                        {
                            const t = 'Token with "' + d.type + '" type was not found.';
                            if (this.options.silent)
                                return void console.error(t);
                            throw new Error(t)
                        }
                    }
            return v
        }
        parseInline(t, e) {
            e = e || this.renderer;
            let n, i, s, r = "";
            const a = t.length;
            for (n = 0; n < a; n++)
                if (i = t[n],
                this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type] && (s = this.options.extensions.renderers[i.type].call({
                    parser: this
                }, i),
                !1 !== s || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)))
                    r += s || "";
                else
                    switch (i.type) {
                    case "escape":
                    case "text":
                        r += e.text(i.text);
                        break;
                    case "html":
                        r += e.html(i.text);
                        break;
                    case "link":
                        r += e.link(i.href, i.title, this.parseInline(i.tokens, e));
                        break;
                    case "image":
                        r += e.image(i.href, i.title, i.text);
                        break;
                    case "strong":
                        r += e.strong(this.parseInline(i.tokens, e));
                        break;
                    case "em":
                        r += e.em(this.parseInline(i.tokens, e));
                        break;
                    case "codespan":
                        r += e.codespan(i.text);
                        break;
                    case "br":
                        r += e.br();
                        break;
                    case "del":
                        r += e.del(this.parseInline(i.tokens, e));
                        break;
                    default:
                        {
                            const t = 'Token with "' + i.type + '" type was not found.';
                            if (this.options.silent)
                                return void console.error(t);
                            throw new Error(t)
                        }
                    }
            return r
        }
    }
    class q {
        constructor(t) {
            this.options = t || e
        }
        static passThroughHooks = new Set(["preprocess", "postprocess"]);
        preprocess(t) {
            return t
        }
        postprocess(t) {
            return t
        }
    }
    function P(t, e) {
        return (n,i,s)=>{
            "function" == typeof i && (s = i,
            i = null);
            const r = {
                ...i
            }
              , a = function(t, e, n) {
                return i=>{
                    if (i.message += "\nPlease report this to https://github.com/markedjs/marked.",
                    t) {
                        const t = "<p>An error occurred:</p><pre>" + l(i.message + "", !0) + "</pre>";
                        return e ? Promise.resolve(t) : n ? void n(null, t) : t
                    }
                    if (e)
                        return Promise.reject(i);
                    if (!n)
                        throw i;
                    n(i)
                }
            }((i = {
                ...N.defaults,
                ...r
            }).silent, i.async, s);
            if (null == n)
                return a(new Error("marked(): input parameter is undefined or null"));
            if ("string" != typeof n)
                return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
            if (function(t) {
                t && t.sanitize && !t.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")
            }(i),
            i.hooks && (i.hooks.options = i),
            s) {
                const r = i.highlight;
                let o;
                try {
                    i.hooks && (n = i.hooks.preprocess(n)),
                    o = t(n, i)
                } catch (t) {
                    return a(t)
                }
                const l = function(t) {
                    let n;
                    if (!t)
                        try {
                            i.walkTokens && N.walkTokens(o, i.walkTokens),
                            n = e(o, i),
                            i.hooks && (n = i.hooks.postprocess(n))
                        } catch (e) {
                            t = e
                        }
                    return i.highlight = r,
                    t ? a(t) : s(null, n)
                };
                if (!r || r.length < 3)
                    return l();
                if (delete i.highlight,
                !o.length)
                    return l();
                let c = 0;
                return N.walkTokens(o, (function(t) {
                    "code" === t.type && (c++,
                    setTimeout((()=>{
                        r(t.text, t.lang, (function(e, n) {
                            if (e)
                                return l(e);
                            null != n && n !== t.text && (t.text = n,
                            t.escaped = !0),
                            c--,
                            0 === c && l()
                        }
                        ))
                    }
                    ), 0))
                }
                )),
                void (0 === c && l())
            }
            if (i.async)
                return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((e=>t(e, i))).then((t=>i.walkTokens ? Promise.all(N.walkTokens(t, i.walkTokens)).then((()=>t)) : t)).then((t=>e(t, i))).then((t=>i.hooks ? i.hooks.postprocess(t) : t)).catch(a);
            try {
                i.hooks && (n = i.hooks.preprocess(n));
                const s = t(n, i);
                i.walkTokens && N.walkTokens(s, i.walkTokens);
                let r = e(s, i);
                return i.hooks && (r = i.hooks.postprocess(r)),
                r
            } catch (t) {
                return a(t)
            }
        }
    }
    function N(t, e, n) {
        return P(R.lex, C.parse)(t, e, n)
    }
    N.options = N.setOptions = function(t) {
        var n;
        return N.defaults = {
            ...N.defaults,
            ...t
        },
        n = N.defaults,
        e = n,
        N
    }
    ,
    N.getDefaults = t,
    N.defaults = e,
    N.use = function(...t) {
        const e = N.defaults.extensions || {
            renderers: {},
            childTokens: {}
        };
        t.forEach((t=>{
            const n = {
                ...t
            };
            if (n.async = N.defaults.async || n.async || !1,
            t.extensions && (t.extensions.forEach((t=>{
                if (!t.name)
                    throw new Error("extension name required");
                if (t.renderer) {
                    const n = e.renderers[t.name];
                    e.renderers[t.name] = n ? function(...e) {
                        let i = t.renderer.apply(this, e);
                        return !1 === i && (i = n.apply(this, e)),
                        i
                    }
                    : t.renderer
                }
                if (t.tokenizer) {
                    if (!t.level || "block" !== t.level && "inline" !== t.level)
                        throw new Error("extension level must be 'block' or 'inline'");
                    e[t.level] ? e[t.level].unshift(t.tokenizer) : e[t.level] = [t.tokenizer],
                    t.start && ("block" === t.level ? e.startBlock ? e.startBlock.push(t.start) : e.startBlock = [t.start] : "inline" === t.level && (e.startInline ? e.startInline.push(t.start) : e.startInline = [t.start]))
                }
                t.childTokens && (e.childTokens[t.name] = t.childTokens)
            }
            )),
            n.extensions = e),
            t.renderer) {
                const e = N.defaults.renderer || new L;
                for (const n in t.renderer) {
                    const i = e[n];
                    e[n] = (...s)=>{
                        let r = t.renderer[n].apply(e, s);
                        return !1 === r && (r = i.apply(e, s)),
                        r
                    }
                }
                n.renderer = e
            }
            if (t.tokenizer) {
                const e = N.defaults.tokenizer || new _;
                for (const n in t.tokenizer) {
                    const i = e[n];
                    e[n] = (...s)=>{
                        let r = t.tokenizer[n].apply(e, s);
                        return !1 === r && (r = i.apply(e, s)),
                        r
                    }
                }
                n.tokenizer = e
            }
            if (t.hooks) {
                const e = N.defaults.hooks || new q;
                for (const n in t.hooks) {
                    const i = e[n];
                    q.passThroughHooks.has(n) ? e[n] = s=>{
                        if (N.defaults.async)
                            return Promise.resolve(t.hooks[n].call(e, s)).then((t=>i.call(e, t)));
                        const r = t.hooks[n].call(e, s);
                        return i.call(e, r)
                    }
                    : e[n] = (...s)=>{
                        let r = t.hooks[n].apply(e, s);
                        return !1 === r && (r = i.apply(e, s)),
                        r
                    }
                }
                n.hooks = e
            }
            if (t.walkTokens) {
                const e = N.defaults.walkTokens;
                n.walkTokens = function(n) {
                    let i = [];
                    return i.push(t.walkTokens.call(this, n)),
                    e && (i = i.concat(e.call(this, n))),
                    i
                }
            }
            N.setOptions(n)
        }
        ))
    }
    ,
    N.walkTokens = function(t, e) {
        let n = [];
        for (const i of t)
            switch (n = n.concat(e.call(N, i)),
            i.type) {
            case "table":
                for (const t of i.header)
                    n = n.concat(N.walkTokens(t.tokens, e));
                for (const t of i.rows)
                    for (const i of t)
                        n = n.concat(N.walkTokens(i.tokens, e));
                break;
            case "list":
                n = n.concat(N.walkTokens(i.items, e));
                break;
            default:
                N.defaults.extensions && N.defaults.extensions.childTokens && N.defaults.extensions.childTokens[i.type] ? N.defaults.extensions.childTokens[i.type].forEach((function(t) {
                    n = n.concat(N.walkTokens(i[t], e))
                }
                )) : i.tokens && (n = n.concat(N.walkTokens(i.tokens, e)))
            }
        return n
    }
    ,
    N.parseInline = P(R.lexInline, C.parseInline),
    N.Parser = C,
    N.parser = C.parse,
    N.Renderer = L,
    N.TextRenderer = I,
    N.Lexer = R,
    N.lexer = R.lex,
    N.Tokenizer = _,
    N.Slugger = M,
    N.Hooks = q,
    N.parse = N,
    N.options,
    N.setOptions,
    N.use,
    N.walkTokens,
    N.parseInline,
    C.parse,
    R.lex;
    return ()=>{
        let t, e, n = null;
	let speaker_view_html_str="";
	fetch("plugin/notes/speaker-view.html")
	    .then((res) => res.text())
	    .then((text) => {
		speaker_view_html_str = text;
	    })
	    .catch((e) => console.error(e));

        function i() {
            if (n && !n.closed)
                n.focus();
            else {
                if (n = window.open("about:blank", "reveal.js - Notes", "width=1100,height=700"),
                n.marked = N,
                n.document.write("\x3c!" + speaker_view_html_str),
                !n)
                    return void alert("Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.");
                !function() {
                    const i = e.getConfig().url
                      , s = "string" == typeof i ? i : window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
                    t = setInterval((function() {
                        n.postMessage(JSON.stringify({
                            namespace: "reveal-notes",
                            type: "connect",
                            state: e.getState(),
                            url: s
                        }), "*")
                    }
                    ), 500),
                    window.addEventListener("message", r)
                }()
            }
        }
        function s(t) {
            let i = e.getCurrentSlide()
              , s = i.querySelectorAll("aside.notes")
              , r = i.querySelector(".current-fragment")
              , a = {
                namespace: "reveal-notes",
                type: "state",
                notes: "",
                markdown: !1,
                whitespace: "normal",
                state: e.getState()
            };
            if (i.hasAttribute("data-notes") && (a.notes = i.getAttribute("data-notes"),
            a.whitespace = "pre-wrap"),
            r) {
                let t = r.querySelector("aside.notes");
                t ? (a.notes = t.innerHTML,
                a.markdown = "string" == typeof t.getAttribute("data-markdown"),
                s = null) : r.hasAttribute("data-notes") && (a.notes = r.getAttribute("data-notes"),
                a.whitespace = "pre-wrap",
                s = null)
            }
            s && s.length && (s = Array.from(s).filter((t=>null === t.closest(".fragment"))),
            a.notes = s.map((t=>t.innerHTML)).join("\n"),
            a.markdown = s[0] && "string" == typeof s[0].getAttribute("data-markdown")),
            n.postMessage(JSON.stringify(a), "*")
        }
        function r(i) {
            if (function(t) {
                try {
                    return window.location.origin === t.source.location.origin
                } catch (t) {
                    return !1
                }
            }(i)) {
                let s = JSON.parse(i.data);
                s && "reveal-notes" === s.namespace && "connected" === s.type ? (clearInterval(t),
                a()) : s && "reveal-notes" === s.namespace && "call" === s.type && function(t, i, s) {
                    let r = e[t].apply(e, i);
                    n.postMessage(JSON.stringify({
                        namespace: "reveal-notes",
                        type: "return",
                        result: r,
                        callId: s
                    }), "*")
                }(s.methodName, s.arguments, s.callId)
            }
        }
        function a() {
            e.on("slidechanged", s),
            e.on("fragmentshown", s),
            e.on("fragmenthidden", s),
            e.on("overviewhidden", s),
            e.on("overviewshown", s),
            e.on("paused", s),
            e.on("resumed", s),
            s()
        }
        return {
            id: "notes",
            init: function(t) {
                e = t,
                /receiver/i.test(window.location.search) || (null !== window.location.search.match(/(\?|\&)notes/gi) ? i() : window.addEventListener("message", (t=>{
                    if (!n && "string" == typeof t.data) {
                        let i;
                        try {
                            i = JSON.parse(t.data)
                        } catch (t) {}
                        i && "reveal-notes" === i.namespace && "heartbeat" === i.type && (e = t.source,
                        n && !n.closed ? n.focus() : (n = e,
                        window.addEventListener("message", r),
                        a()))
                    }
                    var e
                }
                )),
                e.addKeyBinding({
                    keyCode: 83,
                    key: "S",
                    description: "Speaker notes view"
                }, (function() {
                    i()
                }
                )))
            },
            open: i
        }
    }
}
));
