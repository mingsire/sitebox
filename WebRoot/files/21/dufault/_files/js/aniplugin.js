/*
* Lazy Load 
* Project home:http://www.appelsiini.net/projects/lazyload
*/
(function (a, b, c, d) { var e = a(b); a.fn.lazyload = function (c) { function i() { var b = 0; f.each(function () { var c = a(this); if (h.skip_invisible && !c.is(":visible")) return; if (!a.abovethetop(this, h) && !a.leftofbegin(this, h)) if (!a.belowthefold(this, h) && !a.rightoffold(this, h)) c.trigger("appear"), b = 0; else if (++b > h.failure_limit) return !1 }) } var f = this, g, h = { threshold: 0, failure_limit: 0, event: "scroll", effect: "show", container: b, data_attribute: "original", skip_invisible: !0, appear: null, load: null }; return c && (d !== c.failurelimit && (c.failure_limit = c.failurelimit, delete c.failurelimit), d !== c.effectspeed && (c.effect_speed = c.effectspeed, delete c.effectspeed), a.extend(h, c)), g = h.container === d || h.container === b ? e : a(h.container), 0 === h.event.indexOf("scroll") && g.bind(h.event, function (a) { return i() }), this.each(function () { var b = this, c = a(b); b.loaded = !1, c.one("appear", function () { if (!this.loaded) { if (h.appear) { var d = f.length; h.appear.call(b, d, h) } a("<img />").bind("load", function () { c.hide().attr("src", c.data(h.data_attribute))[h.effect](h.effect_speed), b.loaded = !0; var d = a.grep(f, function (a) { return !a.loaded }); f = a(d); if (h.load) { var e = f.length; h.load.call(b, e, h) } }).attr("src", c.data(h.data_attribute)) } }), 0 !== h.event.indexOf("scroll") && c.bind(h.event, function (a) { b.loaded || c.trigger("appear") }) }), e.bind("resize", function (a) { i() }), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function (b) { b.originalEvent.persisted && f.each(function () { a(this).trigger("appear") }) }), a(b).load(function () { i() }), this }, a.belowthefold = function (c, f) { var g; return f.container === d || f.container === b ? g = e.height() + e.scrollTop() : g = a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold }, a.rightoffold = function (c, f) { var g; return f.container === d || f.container === b ? g = e.width() + e.scrollLeft() : g = a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold }, a.abovethetop = function (c, f) { var g; return f.container === d || f.container === b ? g = e.scrollTop() : g = a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height() }, a.leftofbegin = function (c, f) { var g; return f.container === d || f.container === b ? g = e.scrollLeft() : g = a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width() }, a.inviewport = function (b, c) { return !a.rightoffold(b, c) && !a.leftofbegin(b, c) && !a.belowthefold(b, c) && !a.abovethetop(b, c) }, a.extend(a.expr[":"], { "below-the-fold": function (b) { return a.belowthefold(b, { threshold: 0 }) }, "above-the-top": function (b) { return !a.belowthefold(b, { threshold: 0 }) }, "right-of-screen": function (b) { return a.rightoffold(b, { threshold: 0 }) }, "left-of-screen": function (b) { return !a.rightoffold(b, { threshold: 0 }) }, "in-viewport": function (b) { return a.inviewport(b, { threshold: 0 }) }, "above-the-fold": function (b) { return !a.belowthefold(b, { threshold: 0 }) }, "right-of-fold": function (b) { return a.rightoffold(b, { threshold: 0 }) }, "left-of-fold": function (b) { return !a.rightoffold(b, { threshold: 0 }) } }) })(jQuery, window, document);

/*lunbo support slide and fade */
(function (a) {
    a.fn.slides = function (b) {
        return b = a.extend({},
        a.fn.slides.option, b),
        this.each(function () {
            function w(g, h, i) {
                if (!p && o) {
                    p = !0,
                    b.animationStart(n + 1);
                    switch (g) {
                        case "next":
                            l = n,
                            k = n + 1,
                            k = e === k ? 0 : k,
                            r = f * 2,
                            g = -f * 2,
                            n = k;
                            break;
                        case "prev":
                            l = n,
                            k = n - 1,
                            k = k === -1 ? e - 1 : k,
                            r = 0,
                            g = 0,
                            n = k;
                            break;
                        case "pagination":
                            k = parseInt(i, 10),
                            l = a("." + b.paginationClass + " li." + b.currentClass + " a", c).attr("href").match("[^#/]+$"),
                            k > l ? (r = f * 2, g = -f * 2) : (r = 0, g = 0),
                            n = k
                    }
                    h === "fade" ? b.crossfade ? d.children(":eq(" + k + ")", c).css({
                        zIndex: 10
                    }).fadeIn(b.fadeSpeed, b.fadeEasing,
                    function () {
                        b.autoHeight ? d.animate({
                            height: d.children(":eq(" + k + ")", c).outerHeight()
                        },
                        b.autoHeightSpeed,
                        function () {
                            d.children(":eq(" + l + ")", c).css({
                                display: "none",
                                zIndex: 0
                            }),
                            d.children(":eq(" + k + ")", c).css({
                                zIndex: 0
                            }),
                            b.animationComplete(k + 1, c),
                            p = !1
                        }) : (d.children(":eq(" + l + ")", c).css({
                            display: "none",
                            zIndex: 0
                        }), d.children(":eq(" + k + ")", c).css({
                            zIndex: 0
                        }), b.animationComplete(k + 1, c), p = !1)
                    }) : d.children(":eq(" + l + ")", c).fadeOut(b.fadeSpeed, b.fadeEasing,
                    function () {
                        b.autoHeight ? d.animate({
                            height: d.children(":eq(" + k + ")", c).outerHeight()
                        },
                        b.autoHeightSpeed,
                        function () {
                            d.children(":eq(" + k + ")", c).fadeIn(b.fadeSpeed, b.fadeEasing)
                        }) : d.children(":eq(" + k + ")", c).fadeIn(b.fadeSpeed, b.fadeEasing,
                        function () {
                            a.browser.msie && a(this).get(0).style.removeAttribute("filter")
                        }),
                        b.animationComplete(k + 1, c),
                        p = !1
                    }) : (d.children(":eq(" + k + ")").css({
                        left: r,
                        display: "block"
                    }), b.autoHeight ? d.animate({
                        left: g,
                        height: d.children(":eq(" + k + ")").outerHeight()
                    },
                    b.slideSpeed, b.slideEasing,
                    function () {
                        d.css({
                            left: -f
                        }),
                        d.children(":eq(" + k + ")").css({
                            left: f,
                            zIndex: 5
                        }),
                        d.children(":eq(" + l + ")").css({
                            left: f,
                            display: "none",
                            zIndex: 0
                        }),
                        b.animationComplete(k + 1, c),
                        p = !1
                    }) : d.animate({
                        left: g
                    },
                    b.slideSpeed, b.slideEasing,
                    function () {
                        d.css({
                            left: -f
                        }),
                        d.children(":eq(" + k + ")").css({
                            left: f,
                            zIndex: 5
                        }),
                        d.children(":eq(" + l + ")").css({
                            left: f,
                            display: "none",
                            zIndex: 0
                        }),
                        b.animationComplete(k + 1, c),
                        p = !1
                    })),
                    b.pagination && (a("." + b.paginationClass + " li." + b.currentClass, c).removeClass(b.currentClass), a("." + b.paginationClass + " li:eq(" + k + ")", c).addClass(b.currentClass))
                }
            }
            function x() {
                clearInterval(c.data("interval"))
            }
            function y() {
                b.pause ? (clearTimeout(c.data("pause")), clearInterval(c.data("interval")), u = setTimeout(function () {
                    clearTimeout(c.data("pause")),
                    v = setInterval(function () {
                        w("next", i)
                    },
                    b.play),
                    c.data("interval", v)
                },
                b.pause), c.data("pause", u)) : x()
            }
            if (b.withTitle) {
                var title_lists = "";
                a("." + b.container, a(this)).find("a").each(function () {
                    var title = a(this).attr("title");
                    var link = a(this).attr("href");
                    title_lists += '<li class="slider_title_cell"><a href="' + link + '">' + title + '</a></li>';
                });
                a(this).after('<ul class="slider_title_lists">' + title_lists + '</ul>');
                b.slidesLoaded(a(this));
            }
            a("." + b.container, a(this)).children().wrapAll('<div class="slides_control"/>');
            var c = a(this),
            d = a(".slides_control", c),
            e = d.children().size(),
            f = d.children().outerWidth(),
            g = d.children().outerHeight(),
            h = b.start - 1,
            i = b.effect.indexOf(",") < 0 ? b.effect : b.effect.replace(" ", "").split(",")[0],
            j = b.effect.indexOf(",") < 0 ? i : b.effect.replace(" ", "").split(",")[1],
            k = 0,
            l = 0,
            m = 0,
            n = 0,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v;
            if (e < 2) return a("." + b.container, a(this)).fadeIn(b.fadeSpeed, b.fadeEasing,
            function () {
                o = !0
                //b.slidesLoaded()
            }),
            a("." + b.next + ", ." + b.prev).fadeOut(0),
            !1;
            if (e < 2) return;
            h < 0 && (h = 0),
            h > e && (h = e - 1),
            b.start && (n = h),
            b.randomize && d.randomize(),
            a("." + b.container, c).css({
                overflow: "hidden",
                position: "relative"
            }),
            d.children().css({
                position: "absolute",
                top: 0,
                left: d.children().outerWidth(),
                zIndex: 0,
                display: "none"
            }),
            d.css({
                position: "relative",
                width: f * 3,
                height: g,
                left: -f
            }),
            a("." + b.container, c).css({
                display: "block"
            }),
            b.autoHeight && (d.children().css({
                height: "auto"
            }), d.animate({
                height: d.children(":eq(" + h + ")").outerHeight()
            },
            b.autoHeightSpeed));
            if (b.preload && d.find("img:eq(" + h + ")").length) {
                a("." + b.container, c).css({
                    background: "url(" + b.preloadImage + ") no-repeat 50% 50%"
                });
                var z = d.find("img:eq(" + h + ")").attr("src") + "?" + (new Date).getTime();
                a("img", c).parent().attr("class") != "slides_control" ? t = d.children(":eq(0)")[0].tagName.toLowerCase() : t = d.find("img:eq(" + h + ")"),
                d.find("img:eq(" + h + ")").attr("src", z).load(function () {
                    d.find(t + ":eq(" + h + ")").fadeIn(b.fadeSpeed, b.fadeEasing,
                    function () {
                        a(this).css({
                            zIndex: 5
                        }),
                        a("." + b.container, c).css({
                            background: ""
                        }),
                        o = !0
                        //b.slidesLoaded()
                    })
                })
            } else d.children(":eq(" + h + ")").fadeIn(b.fadeSpeed, b.fadeEasing,
            function () {
                o = !0
                //b.slidesLoaded()
            });
            b.bigTarget && (d.children().css({
                cursor: "pointer"
            }), d.children().click(function () {
                return w("next", i),
                !1
            })),
            b.hoverPause && b.play && (d.bind("mouseover",
            function () {
                x()
            }), d.bind("mouseleave",
            function () {
                y()
            })),
            b.generateNextPrev && (a("." + b.container, c).after('<a href="#" class="' + b.prev + '">Prev</a>'), a("." + b.prev, c).after('<a href="#" class="' + b.next + '">Next</a>')),
            a("." + b.next, c).click(function (a) {
                a.preventDefault(),
                b.play && y(),
                w("next", i)
            }),
            a("." + b.prev, c).click(function (a) {
                a.preventDefault(),
                b.play && y(),
                w("prev", i)
            }),
            b.generatePagination ? (b.prependPagination ? c.prepend("<ul class=" + b.paginationClass + "></ul>") : c.append("<ul class=" + b.paginationClass + "></ul>"), d.children().each(function () {
                a("." + b.paginationClass, c).append('<li><a href="#' + m + '">' + (m + 1) + "</a></li>"),
                m++
            })) : a("." + b.paginationClass + " li a", c).each(function () {
                a(this).attr("href", "#" + m),
                m++
            }),
            a("." + b.paginationClass + " li:eq(" + h + ")", c).addClass(b.currentClass),
            a("." + b.paginationClass + " li a", c).hover(function () {
                return b.play && y(),
                q = a(this).attr("href").match("[^#/]+$"),
                n != q && w("pagination", j, q),
                !1
            }),
            a("a.link", c).click(function () {
                return b.play && y(),
                q = a(this).attr("href").match("[^#/]+$") - 1,
                n != q && w("pagination", j, q),
                !1
            }),
            b.play && (v = setInterval(function () {
                w("next", i)
            },
            b.play), c.data("interval", v))
        })
    },
    a.fn.slides.option = {
        preload: !1,
        preloadImage: "/img/loading.gif",
        container: "slides_container",
        generateNextPrev: !1,
        next: "next",
        prev: "prev",
        pagination: !0,
        generatePagination: !0,
        prependPagination: !1,
        paginationClass: "pagination",
        currentClass: "current",
        fadeSpeed: 350,
        fadeEasing: "",
        slideSpeed: 350,
        slideEasing: "",
        start: 1,
        effect: "slide",
        crossfade: true,
        randomize: !1,
        play: 0,
        pause: 0,
        hoverPause: true,
        autoHeight: !1,
        autoHeightSpeed: 350,
        bigTarget: !1,
        withTitle: !1,
        animationStart: function (element) { },
        animationComplete: function (index, ele) { var _target = ele.next(".slider_title_lists"); if (_target.size() > 0) { _target.find("li").hide(); _target.find("li:eq(" + (index - 1) + ")").show(); } },
        slidesLoaded: function (element) { element.next(".slider_title_lists").find("li:eq(0)").show(); }
    },
    a.fn.randomize = function (b) {
        function c() {
            return Math.round(Math.random()) - .5
        }
        return a(this).each(function () {
            var d = a(this),
            e = d.children(),
            f = e.length;
            if (f > 1) {
                e.hide();
                var g = [];
                for (i = 0; i < f; i++) g[g.length] = i;
                g = g.sort(c),
                a.each(g,
                function (a, c) {
                    var f = e.eq(c),
                    g = f.clone(!0);
                    g.show().appendTo(d),
                    b !== undefined && b(f, g),
                    f.remove()
                })
            }
        })
    }
})(jQuery);

/*jquery tools*/
(function (a, b) { a.tools = a.tools || { version: "v1.2.7" }; var c = [], d = {}, e, f = [75, 76, 38, 39, 74, 72, 40, 37], g = {}; e = a.tools.dateinput = { conf: { format: "mm/dd/yy", formatter: "default", selectors: !1, yearRange: [-5, 5], lang: "en", offset: [0, 0], speed: 0, firstDay: 0, min: b, max: b, trigger: 0, toggle: 0, editable: 0, css: { prefix: "cal", input: "date", root: 0, head: 0, title: 0, prev: 0, next: 0, month: 0, year: 0, days: 0, body: 0, weeks: 0, today: 0, current: 0, week: 0, off: 0, sunday: 0, focus: 0, disabled: 0, trigger: 0 } }, addFormatter: function (a, b) { d[a] = b }, localize: function (b, c) { a.each(c, function (a, b) { c[a] = b.split(",") }), g[b] = c } }, e.localize("en", { months: "January,February,March,April,May,June,July,August,September,October,November,December", shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec", days: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday", shortDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat" }); function h(a, b) { return (new Date(a, b + 1, 0)).getDate() } function i(a, b) { a = "" + a, b = b || 2; while (a.length < b) a = "0" + a; return a } var j = a("<a/>"); function k(a, b, c, e) { var f = b.getDate(), h = b.getDay(), k = b.getMonth(), l = b.getFullYear(), m = { d: f, dd: i(f), ddd: g[e].shortDays[h], dddd: g[e].days[h], m: k + 1, mm: i(k + 1), mmm: g[e].shortMonths[k], mmmm: g[e].months[k], yy: String(l).slice(2), yyyy: l }, n = d[a](c, b, m, e); return j.html(n).html() } e.addFormatter("default", function (a, b, c, d) { return a.replace(/d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g, function (a) { return a in c ? c[a] : a }) }), e.addFormatter("prefixed", function (a, b, c, d) { return a.replace(/%(d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*')/g, function (a, b) { return b in c ? c[b] : a }) }); function l(a) { return parseInt(a, 10) } function m(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() == b.getMonth() && a.getDate() == b.getDate() } function n(a) { if (a !== b) { if (a.constructor == Date) return a; if (typeof a == "string") { var c = a.split("-"); if (c.length == 3) return new Date(l(c[0]), l(c[1]) - 1, l(c[2])); if (!/^-?\d+$/.test(a)) return; a = l(a) } var d = new Date; d.setDate(d.getDate() + a); return d } } function o(d, e) { var i = this, j = new Date, o = j.getFullYear(), p = e.css, q = g[e.lang], r = a("#" + p.root), s = r.find("#" + p.title), t, u, v, w, x, y, z = d.attr("data-value") || e.value || d.val(), A = d.attr("min") || e.min, B = d.attr("max") || e.max, C, D; A === 0 && (A = "0"), z = n(z) || j, A = n(A || new Date(o + e.yearRange[0], 1, 1)), B = n(B || new Date(o + e.yearRange[1] + 1, 1, -1)); if (!q) throw "Dateinput: invalid language: " + e.lang; if (d.attr("type") == "date") { var D = d.clone(), E = D.wrap("<div/>").parent().html(), F = a(E.replace(/type/i, "type=text data-orig-type")); e.value && F.val(e.value), d.replaceWith(F), d = F } d.addClass(p.input); var G = d.add(i); if (!r.length) { r = a("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({ position: "absolute" }).attr("id", p.root), r.children().eq(0).attr("id", p.head).end().eq(1).attr("id", p.body).children().eq(0).attr("id", p.days).end().eq(1).attr("id", p.weeks).end().end().end().find("a").eq(0).attr("id", p.prev).end().eq(1).attr("id", p.next), s = r.find("#" + p.head).find("div").attr("id", p.title); if (e.selectors) { var H = a("<select/>").attr("id", p.month), I = a("<select/>").attr("id", p.year); s.html(H.add(I)) } var J = r.find("#" + p.days); for (var K = 0; K < 7; K++) J.append(a("<span/>").text(q.shortDays[(K + e.firstDay) % 7])); a("body").append(r) } e.trigger && (t = a("<a/>").attr("href", "#").addClass(p.trigger).click(function (a) { e.toggle ? i.toggle() : i.show(); return a.preventDefault() }).insertAfter(d)); var L = r.find("#" + p.weeks); I = r.find("#" + p.year), H = r.find("#" + p.month); function M(b, c, e) { z = b, w = b.getFullYear(), x = b.getMonth(), y = b.getDate(), e || (e = a.Event("api")), e.type == "click" && !a.browser.msie && d.focus(), e.type = "beforeChange", G.trigger(e, [b]); e.isDefaultPrevented() || (d.val(k(c.formatter, b, c.format, c.lang)), e.type = "change", G.trigger(e), d.data("date", b), i.hide(e)) } function N(b) { b.type = "onShow", G.trigger(b), a(document).on("keydown.d", function (b) { if (b.ctrlKey) return !0; var c = b.keyCode; if (c == 8 || c == 46) { d.val(""); return i.hide(b) } if (c == 27 || c == 9) return i.hide(b); if (a(f).index(c) >= 0) { if (!C) { i.show(b); return b.preventDefault() } var e = a("#" + p.weeks + " a"), g = a("." + p.focus), h = e.index(g); g.removeClass(p.focus); if (c == 74 || c == 40) h += 7; else if (c == 75 || c == 38) h -= 7; else if (c == 76 || c == 39) h += 1; else if (c == 72 || c == 37) h -= 1; h > 41 ? (i.addMonth(), g = a("#" + p.weeks + " a:eq(" + (h - 42) + ")")) : h < 0 ? (i.addMonth(-1), g = a("#" + p.weeks + " a:eq(" + (h + 42) + ")")) : g = e.eq(h), g.addClass(p.focus); return b.preventDefault() } if (c == 34) return i.addMonth(); if (c == 33) return i.addMonth(-1); if (c == 36) return i.today(); c == 13 && (a(b.target).is("select") || a("." + p.focus).click()); return a([16, 17, 18, 9]).index(c) >= 0 }), a(document).on("click.d", function (b) { var c = b.target; !a(c).parents("#" + p.root).length && c != d[0] && (!t || c != t[0]) && i.hide(b) }) } a.extend(i, { show: function (b) { if (!(d.attr("readonly") || d.attr("disabled") || C)) { b = b || a.Event(), b.type = "onBeforeShow", G.trigger(b); if (b.isDefaultPrevented()) return; a.each(c, function () { this.hide() }), C = !0, H.off("change").change(function () { i.setValue(l(I.val()), l(a(this).val())) }), I.off("change").change(function () { i.setValue(l(a(this).val()), l(H.val())) }), u = r.find("#" + p.prev).off("click").click(function (a) { u.hasClass(p.disabled) || i.addMonth(-1); return !1 }), v = r.find("#" + p.next).off("click").click(function (a) { v.hasClass(p.disabled) || i.addMonth(); return !1 }), i.setValue(z); var f = d.offset(); /iPad/i.test(navigator.userAgent) && (f.top -= a(window).scrollTop()), r.css({ top: f.top + d.outerHeight({ margins: !0 }) + e.offset[0], left: f.left + e.offset[1] }), e.speed ? r.show(e.speed, function () { N(b) }) : (r.show(), N(b)); return i } }, setValue: function (c, d, f) { var g = l(d) >= -1 ? new Date(l(c), l(d), l(f == b || isNaN(f) ? 1 : f)) : c || z; g < A ? g = A : g > B && (g = B), typeof c == "string" && (g = n(c)), c = g.getFullYear(), d = g.getMonth(), f = g.getDate(), d == -1 ? (d = 11, c--) : d == 12 && (d = 0, c++); if (!C) { M(g, e); return i } x = d, w = c, y = f; var k = new Date(c, d, 1 - e.firstDay), o = k.getDay(), r = h(c, d), t = h(c, d - 1), D; if (e.selectors) { H.empty(), a.each(q.months, function (b, d) { A < new Date(c, b + 1, 1) && B > new Date(c, b, 0) && H.append(a("<option/>").html(d).attr("value", b)) }), I.empty(); var E = j.getFullYear(); for (var F = E + e.yearRange[0]; F < E + e.yearRange[1]; F++) A < new Date(F + 1, 0, 1) && B > new Date(F, 0, 0) && I.append(a("<option/>").text(F)); H.val(d), I.val(c) } else s.html(q.months[d] + " " + c); L.empty(), u.add(v).removeClass(p.disabled); for (var G = o ? 0 : -7, J, K; G < (o ? 42 : 35) ; G++) J = a("<a/>"), G % 7 === 0 && (D = a("<div/>").addClass(p.week), L.append(D)), G < o ? (J.addClass(p.off), K = t - o + G + 1, g = new Date(c, d - 1, K)) : G < o + r ? (K = G - o + 1, g = new Date(c, d, K), m(z, g) ? J.attr("id", p.current).addClass(p.focus) : m(j, g) && J.attr("id", p.today)) : (J.addClass(p.off), K = G - r - o + 1, g = new Date(c, d + 1, K)), A && g < A && J.add(u).addClass(p.disabled), B && g > B && J.add(v).addClass(p.disabled), J.attr("href", "#" + K).text(K).data("date", g), D.append(J); L.find("a").click(function (b) { var c = a(this); c.hasClass(p.disabled) || (a("#" + p.current).removeAttr("id"), c.attr("id", p.current), M(c.data("date"), e, b)); return !1 }), p.sunday && L.find("." + p.week).each(function () { var b = e.firstDay ? 7 - e.firstDay : 0; a(this).children().slice(b, b + 1).addClass(p.sunday) }); return i }, setMin: function (a, b) { A = n(a), b && z < A && i.setValue(A); return i }, setMax: function (a, b) { B = n(a), b && z > B && i.setValue(B); return i }, today: function () { return i.setValue(j) }, addDay: function (a) { return this.setValue(w, x, y + (a || 1)) }, addMonth: function (a) { var b = x + (a || 1), c = h(w, b), d = y <= c ? y : c; return this.setValue(w, b, d) }, addYear: function (a) { return this.setValue(w + (a || 1), x, y) }, destroy: function () { d.add(document).off("click.d keydown.d"), r.add(t).remove(), d.removeData("dateinput").removeClass(p.input), D && d.replaceWith(D) }, hide: function (b) { if (C) { b = a.Event(), b.type = "onHide", G.trigger(b); if (b.isDefaultPrevented()) return; a(document).off("click.d keydown.d"), r.hide(), C = !1 } return i }, toggle: function () { return i.isOpen() ? i.hide() : i.show() }, getConf: function () { return e }, getInput: function () { return d }, getCalendar: function () { return r }, getValue: function (a) { return a ? k(e.formatter, z, a, e.lang) : z }, isOpen: function () { return C } }), a.each(["onBeforeShow", "onShow", "change", "onHide"], function (b, c) { a.isFunction(e[c]) && a(i).on(c, e[c]), i[c] = function (b) { b && a(i).on(c, b); return i } }), e.editable || d.on("focus.d click.d", i.show).keydown(function (b) { var c = b.keyCode; if (C || a(f).index(c) < 0) (c == 8 || c == 46) && d.val(""); else { i.show(b); return b.preventDefault() } return b.shiftKey || b.ctrlKey || b.altKey || c == 9 ? !0 : b.preventDefault() }), n(d.val()) && M(z, e) } a.expr[":"].date = function (b) { var c = b.getAttribute("type"); return c && c == "date" || a(b).data("dateinput") }, a.fn.dateinput = function (b) { if (this.data("dateinput")) return this; b = a.extend(!0, {}, e.conf, b), a.each(b.css, function (a, c) { !c && a != "prefix" && (b.css[a] = (b.css.prefix || "") + (c || a)) }); var d; this.each(function () { var e = new o(a(this), b); c.push(e); var f = e.getInput().data("dateinput", e); d = d ? d.add(f) : f }); return d ? d : this } })(jQuery);
(function (a) { a.tools = a.tools || { version: "v1.2.7" }, a.tools.overlay = { addEffect: function (a, b, d) { c[a] = [b, d] }, conf: { close: null, closeOnClick: !0, closeOnEsc: !0, closeSpeed: "fast", effect: "default", fixed: !a.browser.msie || a.browser.version > 6, left: "center", load: !1, mask: null, oneInstance: !0, speed: "normal", target: null, top: "10%" } }; var b = [], c = {}; a.tools.overlay.addEffect("default", function (b, c) { var d = this.getConf(), e = a(window); d.fixed || (b.top += e.scrollTop(), b.left += e.scrollLeft()), b.position = d.fixed ? "fixed" : "absolute", this.getOverlay().css(b).fadeIn(d.speed, c) }, function (a) { this.getOverlay().fadeOut(this.getConf().closeSpeed, a) }); function d(d, e) { var f = this, g = d.add(f), h = a(window), i, j, k, l = a.tools.expose && (e.mask || e.expose), m = Math.random().toString().slice(10); l && (typeof l == "string" && (l = { color: l }), l.closeOnClick = l.closeOnEsc = !1); var n = e.target || d.attr("rel"); j = n ? a(n) : null || d; if (!j.length) throw "Could not find Overlay: " + n; d && d.index(j) == -1 && d.click(function (a) { f.load(a); return a.preventDefault() }), a.extend(f, { load: function (d) { if (f.isOpened()) return f; var i = c[e.effect]; if (!i) throw "Overlay: cannot find effect : \"" + e.effect + "\""; e.oneInstance && a.each(b, function () { this.close(d) }), d = d || a.Event(), d.type = "onBeforeLoad", g.trigger(d); if (d.isDefaultPrevented()) return f; k = !0, l && a(j).expose(l); var n = e.top, o = e.left, p = j.outerWidth({ margin: !0 }), q = j.outerHeight({ margin: !0 }); typeof n == "string" && (n = n == "center" ? Math.max((h.height() - q) / 2, 0) : parseInt(n, 10) / 100 * h.height()), o == "center" && (o = Math.max((h.width() - p) / 2, 0)), i[0].call(f, { top: n, left: o }, function () { k && (d.type = "onLoad", g.trigger(d)) }), l && e.closeOnClick && a.mask.getMask().one("click", f.close), e.closeOnClick && a(document).on("click." + m, function (b) { a(b.target).parents(j).length || f.close(b) }), e.closeOnEsc && a(document).on("keydown." + m, function (a) { a.keyCode == 27 && f.close(a) }); return f }, close: function (b) { if (!f.isOpened()) return f; b = b || a.Event(), b.type = "onBeforeClose", g.trigger(b); if (!b.isDefaultPrevented()) { k = !1, c[e.effect][1].call(f, function () { b.type = "onClose", g.trigger(b) }), a(document).off("click." + m + " keydown." + m), l && a.mask.close(); return f } }, getOverlay: function () { return j }, getTrigger: function () { return d }, getClosers: function () { return i }, isOpened: function () { return k }, getConf: function () { return e } }), a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function (b, c) { a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) { b && a(f).on(c, b); return f } }), i = j.find(e.close || ".close"), !i.length && !e.close && (i = a("<a class=\"close\"></a>"), j.prepend(i)), i.click(function (a) { f.close(a) }), e.load && f.load() } a.fn.overlay = function (c) { var e = this.data("overlay"); if (e) return e; a.isFunction(c) && (c = { onBeforeLoad: c }), c = a.extend(!0, {}, a.tools.overlay.conf, c), this.each(function () { e = new d(a(this), c), b.push(e), a(this).data("overlay", e) }); return c.api ? e : this } })(jQuery);
(function (a) { var b = a.tools.overlay, c = a(window); a.extend(b.conf, { start: { top: null, left: null }, fadeInSpeed: "fast", zIndex: 9999 }); function d(a) { var b = a.offset(); return { top: b.top + a.height() / 2, left: b.left + a.width() / 2 } } var e = function (b, e) { var f = this.getOverlay(), g = this.getConf(), h = this.getTrigger(), i = this, j = f.outerWidth({ margin: !0 }), k = f.data("img"), l = g.fixed ? "fixed" : "absolute"; if (!k) { var m = f.css("backgroundImage"); if (!m) throw "background-image CSS property not set for overlay"; m = m.slice(m.indexOf("(") + 1, m.indexOf(")")).replace(/\"/g, ""), f.css("backgroundImage", "none"), k = a("<img src=\"" + m + "\"/>"), k.css({ border: 0, display: "none" }).width(j), a("body").append(k), f.data("img", k) } var n = g.start.top || Math.round(c.height() / 2), o = g.start.left || Math.round(c.width() / 2); if (h) { var p = d(h); n = p.top, o = p.left } g.fixed ? (n -= c.scrollTop(), o -= c.scrollLeft()) : (b.top += c.scrollTop(), b.left += c.scrollLeft()), k.css({ position: "absolute", top: n, left: o, width: 0, zIndex: g.zIndex }).show(), b.position = l, f.css(b), k.animate({ top: b.top, left: b.left, width: j }, g.speed, function () { f.css("zIndex", g.zIndex + 1).fadeIn(g.fadeInSpeed, function () { i.isOpened() && !a(this).index(f) ? e.call() : f.hide() }) }).css("position", l) }, f = function (b) { var e = this.getOverlay().hide(), f = this.getConf(), g = this.getTrigger(), h = e.data("img"), i = { top: f.start.top, left: f.start.left, width: 0 }; g && a.extend(i, d(g)), f.fixed && h.css({ position: "absolute" }).animate({ top: "+=" + c.scrollTop(), left: "+=" + c.scrollLeft() }, 0), h.animate(i, f.closeSpeed, b) }; b.addEffect("apple", e, f) })(jQuery);
(function (a) { a.tools = a.tools || { version: "v1.2.7" }; var b; b = a.tools.rangeinput = { conf: { min: 0, max: 100, step: "any", steps: 0, value: 0, precision: undefined, vertical: 0, keyboard: !0, progress: !1, speed: 100, css: { input: "range", slider: "slider", progress: "progress", handle: "handle" } } }; var c, d; a.fn.drag = function (b) { document.ondragstart = function () { return !1 }, b = a.extend({ x: !0, y: !0, drag: !0 }, b), c = c || a(document).on("mousedown mouseup", function (e) { var f = a(e.target); if (e.type == "mousedown" && f.data("drag")) { var g = f.position(), h = e.pageX - g.left, i = e.pageY - g.top, j = !0; c.on("mousemove.drag", function (a) { var c = a.pageX - h, e = a.pageY - i, g = {}; b.x && (g.left = c), b.y && (g.top = e), j && (f.trigger("dragStart"), j = !1), b.drag && f.css(g), f.trigger("drag", [e, c]), d = f }), e.preventDefault() } else try { d && d.trigger("dragEnd") } finally { c.off("mousemove.drag"), d = null } }); return this.data("drag", !0) }; function e(a, b) { var c = Math.pow(10, b); return Math.round(a * c) / c } function f(a, b) { var c = parseInt(a.css(b), 10); if (c) return c; var d = a[0].currentStyle; return d && d.width && parseInt(d.width, 10) } function g(a) { var b = a.data("events"); return b && b.onSlide } function h(b, c) { var d = this, h = c.css, i = a("<div><div/><a href='#'/></div>").data("rangeinput", d), j, k, l, m, n; b.before(i); var o = i.addClass(h.slider).find("a").addClass(h.handle), p = i.find("div").addClass(h.progress); a.each("min,max,step,value".split(","), function (a, d) { var e = b.attr(d); parseFloat(e) && (c[d] = parseFloat(e, 10)) }); var q = c.max - c.min, r = c.step == "any" ? 0 : c.step, s = c.precision; s === undefined && (s = r.toString().split("."), s = s.length === 2 ? s[1].length : 0); if (b.attr("type") == "range") { var t = b.clone().wrap("<div/>").parent().html(), u = a(t.replace(/type/i, "type=text data-orig-type")); u.val(c.value), b.replaceWith(u), b = u } b.addClass(h.input); var v = a(d).add(b), w = !0; function x(a, f, g, h) { g === undefined ? g = f / m * q : h && (g -= c.min), r && (g = Math.round(g / r) * r); if (f === undefined || r) f = g * m / q; if (isNaN(g)) return d; f = Math.max(0, Math.min(f, m)), g = f / m * q; if (h || !j) g += c.min; j && (h ? f = m - f : g = c.max - g), g = e(g, s); var i = a.type == "click"; if (w && k !== undefined && !i) { a.type = "onSlide", v.trigger(a, [g, f]); if (a.isDefaultPrevented()) return d } var l = i ? c.speed : 0, t = i ? function () { a.type = "change", v.trigger(a, [g]) } : null; j ? (o.animate({ top: f }, l, t), c.progress && p.animate({ height: m - f + o.height() / 2 }, l)) : (o.animate({ left: f }, l, t), c.progress && p.animate({ width: f + o.width() / 2 }, l)), k = g, n = f, b.val(g); return d } a.extend(d, { getValue: function () { return k }, setValue: function (b, c) { y(); return x(c || a.Event("api"), undefined, b, !0) }, getConf: function () { return c }, getProgress: function () { return p }, getHandle: function () { return o }, getInput: function () { return b }, step: function (b, e) { e = e || a.Event(); var f = c.step == "any" ? 1 : c.step; d.setValue(k + f * (b || 1), e) }, stepUp: function (a) { return d.step(a || 1) }, stepDown: function (a) { return d.step(-a || -1) } }), a.each("onSlide,change".split(","), function (b, e) { a.isFunction(c[e]) && a(d).on(e, c[e]), d[e] = function (b) { b && a(d).on(e, b); return d } }), o.drag({ drag: !1 }).on("dragStart", function () { y(), w = g(a(d)) || g(b) }).on("drag", function (a, c, d) { if (b.is(":disabled")) return !1; x(a, j ? c : d) }).on("dragEnd", function (a) { a.isDefaultPrevented() || (a.type = "change", v.trigger(a, [k])) }).click(function (a) { return a.preventDefault() }), i.click(function (a) { if (b.is(":disabled") || a.target == o[0]) return a.preventDefault(); y(); var c = j ? o.height() / 2 : o.width() / 2; x(a, j ? m - l - c + a.pageY : a.pageX - l - c) }), c.keyboard && b.keydown(function (c) { if (!b.attr("readonly")) { var e = c.keyCode, f = a([75, 76, 38, 33, 39]).index(e) != -1, g = a([74, 72, 40, 34, 37]).index(e) != -1; if ((f || g) && !(c.shiftKey || c.altKey || c.ctrlKey)) { f ? d.step(e == 33 ? 10 : 1, c) : g && d.step(e == 34 ? -10 : -1, c); return c.preventDefault() } } }), b.blur(function (b) { var c = a(this).val(); c !== k && d.setValue(c, b) }), a.extend(b[0], { stepUp: d.stepUp, stepDown: d.stepDown }); function y() { j = c.vertical || f(i, "height") > f(i, "width"), j ? (m = f(i, "height") - f(o, "height"), l = i.offset().top + m) : (m = f(i, "width") - f(o, "width"), l = i.offset().left) } function z() { y(), d.setValue(c.value !== undefined ? c.value : c.min) } z(), m || a(window).load(z) } a.expr[":"].range = function (b) { var c = b.getAttribute("type"); return c && c == "range" || a(b).filter("input").data("rangeinput") }, a.fn.rangeinput = function (c) { if (this.data("rangeinput")) return this; c = a.extend(!0, {}, b.conf, c); var d; this.each(function () { var b = new h(a(this), a.extend(!0, {}, c)), e = b.getInput().data("rangeinput", b); d = d ? d.add(e) : e }); return d ? d : this } })(jQuery);
(function (a) { a.tools = a.tools || { version: "v1.2.7" }, a.tools.scrollable = { conf: { activeClass: "active", circular: !1, clonedClass: "cloned", disabledClass: "disabled", easing: "swing", initialIndex: 0, item: "> *", items: ".items", keyboard: !0, mousewheel: !1, next: ".next", prev: ".prev", size: 1, speed: 400, vertical: !1, touch: !0, wheelSpeed: 0 } }; function b(a, b) { var c = parseInt(a.css(b), 10); if (c) return c; var d = a[0].currentStyle; return d && d.width && parseInt(d.width, 10) } function c(b, c) { var d = a(c); return d.length < 2 ? d : b.parent().find(c) } var d; function e(b, e) { var f = this, g = b.add(f), h = b.children(), i = 0, j = e.vertical; d || (d = f), h.length > 1 && (h = a(e.items, b)), e.size > 1 && (e.circular = !1), a.extend(f, { getConf: function () { return e }, getIndex: function () { return i }, getSize: function () { return f.getItems().size() }, getNaviButtons: function () { return n.add(o) }, getRoot: function () { return b }, getItemWrap: function () { return h }, getItems: function () { return h.find(e.item).not("." + e.clonedClass) }, move: function (a, b) { return f.seekTo(i + a, b) }, next: function (a) { return f.move(e.size, a) }, prev: function (a) { return f.move(-e.size, a) }, begin: function (a) { return f.seekTo(0, a) }, end: function (a) { return f.seekTo(f.getSize() - 1, a) }, focus: function () { d = f; return f }, addItem: function (b) { b = a(b), e.circular ? (h.children().last().before(b), h.children().first().replaceWith(b.clone().addClass(e.clonedClass))) : (h.append(b), o.removeClass("disabled")), g.trigger("onAddItem", [b]); return f }, seekTo: function (b, c, k) { b.jquery || (b *= 1); if (e.circular && b === 0 && i == -1 && c !== 0) return f; if (!e.circular && b < 0 || b > f.getSize() || b < -1) return f; var l = b; b.jquery ? b = f.getItems().index(b) : l = f.getItems().eq(b); var m = a.Event("onBeforeSeek"); if (!k) { g.trigger(m, [b, c]); if (m.isDefaultPrevented() || !l.length) return f } var n = j ? { top: -l.position().top } : { left: -l.position().left }; i = b, d = f, c === undefined && (c = e.speed), h.animate(n, c, e.easing, k || function () { g.trigger("onSeek", [b]) }); return f } }), a.each(["onBeforeSeek", "onSeek", "onAddItem"], function (b, c) { a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) { b && a(f).on(c, b); return f } }); if (e.circular) { var k = f.getItems().slice(-1).clone().prependTo(h), l = f.getItems().eq(1).clone().appendTo(h); k.add(l).addClass(e.clonedClass), f.onBeforeSeek(function (a, b, c) { if (!a.isDefaultPrevented()) { if (b == -1) { f.seekTo(k, c, function () { f.end(0) }); return a.preventDefault() } b == f.getSize() && f.seekTo(l, c, function () { f.begin(0) }) } }); var m = b.parents().add(b).filter(function () { if (a(this).css("display") === "none") return !0 }); m.length ? (m.show(), f.seekTo(0, 0, function () { }), m.hide()) : f.seekTo(0, 0, function () { }) } var n = c(b, e.prev).click(function (a) { a.stopPropagation(), f.prev() }), o = c(b, e.next).click(function (a) { a.stopPropagation(), f.next() }); e.circular || (f.onBeforeSeek(function (a, b) { setTimeout(function () { a.isDefaultPrevented() || (n.toggleClass(e.disabledClass, b <= 0), o.toggleClass(e.disabledClass, b >= f.getSize() - 1)) }, 1) }), e.initialIndex || n.addClass(e.disabledClass)), f.getSize() < 2 && n.add(o).addClass(e.disabledClass), e.mousewheel && a.fn.mousewheel && b.mousewheel(function (a, b) { if (e.mousewheel) { f.move(b < 0 ? 1 : -1, e.wheelSpeed || 50); return !1 } }); if (e.touch) { var p = {}; h[0].ontouchstart = function (a) { var b = a.touches[0]; p.x = b.clientX, p.y = b.clientY }, h[0].ontouchmove = function (a) { if (a.touches.length == 1 && !h.is(":animated")) { var b = a.touches[0], c = p.x - b.clientX, d = p.y - b.clientY; f[j && d > 0 || !j && c > 0 ? "next" : "prev"](), a.preventDefault() } } } e.keyboard && a(document).on("keydown.scrollable", function (b) { if (!(!e.keyboard || b.altKey || b.ctrlKey || b.metaKey || a(b.target).is(":input"))) { if (e.keyboard != "static" && d != f) return; var c = b.keyCode; if (j && (c == 38 || c == 40)) { f.move(c == 38 ? -1 : 1); return b.preventDefault() } if (!j && (c == 37 || c == 39)) { f.move(c == 37 ? -1 : 1); return b.preventDefault() } } }), e.initialIndex && f.seekTo(e.initialIndex, 0, function () { }) } a.fn.scrollable = function (b) { var c = this.data("scrollable"); if (c) return c; b = a.extend({}, a.tools.scrollable.conf, b), this.each(function () { c = new e(a(this), b), a(this).data("scrollable", c) }); return b.api ? c : this } })(jQuery);
(function (a) { var b = a.tools.scrollable; b.autoscroll = { conf: { autoplay: !0, interval: 3e3, autopause: !0 } }, a.fn.autoscroll = function (c) { typeof c == "number" && (c = { interval: c }); var d = a.extend({}, b.autoscroll.conf, c), e; this.each(function () { var b = a(this).data("scrollable"), c = b.getRoot(), f, g = !1; function h() { f && clearTimeout(f), f = setTimeout(function () { b.next() }, d.interval) } b && (e = b), b.play = function () { f || (g = !1, c.on("onSeek", h), h()) }, b.pause = function () { f = clearTimeout(f), c.off("onSeek", h) }, b.resume = function () { g || b.play() }, b.stop = function () { g = !0, b.pause() }, d.autopause && c.add(b.getNaviButtons()).hover(b.pause, b.resume), d.autoplay && b.play() }); return d.api ? e : this } })(jQuery);
(function (a) { var b = a.tools.scrollable; b.navigator = { conf: { navi: ".navi", naviItem: null, activeClass: "active", indexed: !1, idPrefix: null, history: !1 } }; function c(b, c) { var d = a(c); return d.length < 2 ? d : b.parent().find(c) } a.fn.navigator = function (d) { typeof d == "string" && (d = { navi: d }), d = a.extend({}, b.navigator.conf, d); var e; this.each(function () { var b = a(this).data("scrollable"), f = d.navi.jquery ? d.navi : c(b.getRoot(), d.navi), g = b.getNaviButtons(), h = d.activeClass, i = d.history && history.pushState, j = b.getConf().size; b && (e = b), b.getNaviButtons = function () { return g.add(f) }, i && (history.pushState({ i: 0 }, ""), a(window).on("popstate", function (a) { var c = a.originalEvent.state; c && b.seekTo(c.i) })); function k(a, c, d) { b.seekTo(c), d.preventDefault(), i && history.pushState({ i: c }, "") } function l() { return f.find(d.naviItem || "> *") } function m(b) { var c = a("<" + (d.naviItem || "a") + "/>").click(function (c) { k(a(this), b, c) }); b === 0 && c.addClass(h), d.indexed && c.text(b + 1), d.idPrefix && c.attr("id", d.idPrefix + b); return c.appendTo(f) } l().length ? l().each(function (b) { a(this).click(function (c) { k(a(this), b, c) }) }) : a.each(b.getItems(), function (a) { a % j == 0 && m(a) }), b.onBeforeSeek(function (a, b) { setTimeout(function () { if (!a.isDefaultPrevented()) { var c = b / j, d = l().eq(c); d.length && l().removeClass(h).eq(c).addClass(h) } }, 1) }), b.onAddItem(function (a, c) { var d = b.getItems().index(c); d % j == 0 && m(d) }) }); return d.api ? e : this } })(jQuery);
(function (a) { a.tools = a.tools || { version: "v1.2.7" }, a.tools.tabs = { conf: { tabs: "a", current: "current", onBeforeClick: null, onClick: null, effect: "default", initialEffect: !1, initialIndex: 0, event: "click", rotate: !1, slideUpSpeed: 400, slideDownSpeed: 400, history: !1 }, addEffect: function (a, c) { b[a] = c } }; var b = { "default": function (a, b) { this.getPanes().hide().eq(a).show(), b.call() }, fade: function (a, b) { var c = this.getConf(), d = c.fadeOutSpeed, e = this.getPanes(); d ? e.fadeOut(d) : e.hide(), e.eq(a).fadeIn(c.fadeInSpeed, b) }, slide: function (a, b) { var c = this.getConf(); this.getPanes().slideUp(c.slideUpSpeed), this.getPanes().eq(a).slideDown(c.slideDownSpeed, b) }, ajax: function (a, b) { this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"), b) } }, c, d; a.tools.tabs.addEffect("horizontal", function (b, e) { if (!c) { var f = this.getPanes().eq(b), g = this.getCurrentPane(); d || (d = this.getPanes().eq(0).width()), c = !0, f.show(), g.animate({ width: 0 }, { step: function (a) { f.css("width", d - a) }, complete: function () { a(this).hide(), e.call(), c = !1 } }), g.length || (e.call(), c = !1) } }); function e(c, d, e) { var f = this, g = c.add(this), h = c.find(e.tabs), i = d.jquery ? d : c.children(d), j; h.length || (h = c.children()), i.length || (i = c.parent().find(d)), i.length || (i = a(d)), a.extend(this, { click: function (d, i) { var k = h.eq(d), l = !c.data("tabs"); typeof d == "string" && d.replace("#", "") && (k = h.filter("[href*=\"" + d.replace("#", "") + "\"]"), d = Math.max(h.index(k), 0)); if (e.rotate) { var m = h.length - 1; if (d < 0) return f.click(m, i); if (d > m) return f.click(0, i) } if (!k.length) { if (j >= 0) return f; d = e.initialIndex, k = h.eq(d) } if (d === j) return f; i = i || a.Event(), i.type = "onBeforeClick", g.trigger(i, [d]); if (!i.isDefaultPrevented()) { var n = l ? e.initialEffect && e.effect || "default" : e.effect; b[n].call(f, d, function () { j = d, i.type = "onClick", g.trigger(i, [d]) }), h.removeClass(e.current), k.addClass(e.current); return f } }, getConf: function () { return e }, getTabs: function () { return h }, getPanes: function () { return i }, getCurrentPane: function () { return i.eq(j) }, getCurrentTab: function () { return h.eq(j) }, getIndex: function () { return j }, next: function () { return f.click(j + 1) }, prev: function () { return f.click(j - 1) }, destroy: function () { h.off(e.event).removeClass(e.current), i.find("a[href^=\"#\"]").off("click.T"); return f } }), a.each("onBeforeClick,onClick".split(","), function (b, c) { a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) { b && a(f).on(c, b); return f } }), e.history && a.fn.history && (a.tools.history.init(h), e.event = "history"), h.each(function (b) { a(this).on(e.event, function (a) { f.click(b, a); return a.preventDefault() }) }), i.find("a[href^=\"#\"]").on("click.T", function (b) { f.click(a(this).attr("href"), b) }), location.hash && e.tabs == "a" && c.find("[href=\"" + location.hash + "\"]").length ? f.click(location.hash) : (e.initialIndex === 0 || e.initialIndex > 0) && f.click(e.initialIndex) } a.fn.tabs = function (b, c) { var d = this.data("tabs"); d && (d.destroy(), this.removeData("tabs")), a.isFunction(c) && (c = { onBeforeClick: c }), c = a.extend({}, a.tools.tabs.conf, c), this.each(function () { d = new e(a(this), b, c), a(this).data("tabs", d) }); return c.api ? d : this } })(jQuery);
(function (a) { var b; b = a.tools.tabs.slideshow = { conf: { next: ".forward", prev: ".backward", disabledClass: "disabled", autoplay: !1, autopause: !0, interval: 3e3, clickable: !0, api: !1 } }; function c(b, c) { var d = this, e = b.add(this), f = b.data("tabs"), g, h = !0; function i(c) { var d = a(c); return d.length < 2 ? d : b.parent().find(c) } var j = i(c.next).click(function () { f.next() }), k = i(c.prev).click(function () { f.prev() }); function l() { g = setTimeout(function () { f.next() }, c.interval) } a.extend(d, { getTabs: function () { return f }, getConf: function () { return c }, play: function () { if (g) return d; var b = a.Event("onBeforePlay"); e.trigger(b); if (b.isDefaultPrevented()) return d; h = !1, e.trigger("onPlay"), e.on("onClick", l), l(); return d }, pause: function () { if (!g) return d; var b = a.Event("onBeforePause"); e.trigger(b); if (b.isDefaultPrevented()) return d; g = clearTimeout(g), e.trigger("onPause"), e.off("onClick", l); return d }, resume: function () { h || d.play() }, stop: function () { d.pause(), h = !0 } }), a.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","), function (b, e) { a.isFunction(c[e]) && a(d).on(e, c[e]), d[e] = function (b) { return a(d).on(e, b) } }), c.autopause && f.getTabs().add(j).add(k).add(f.getPanes()).hover(d.pause, d.resume), c.autoplay && d.play(), c.clickable && f.getPanes().click(function () { f.next() }); if (!f.getConf().rotate) { var m = c.disabledClass; f.getIndex() || k.addClass(m), f.onBeforeClick(function (a, b) { k.toggleClass(m, !b), j.toggleClass(m, b == f.getTabs().length - 1) }) } } a.fn.slideshow = function (d) { var e = this.data("slideshow"); if (e) return e; d = a.extend({}, b.conf, d), this.each(function () { e = new c(a(this), d), a(this).data("slideshow", e) }); return d.api ? e : this } })(jQuery);
(function (a) { a.tools = a.tools || { version: "v1.2.7" }; var b; b = a.tools.expose = { conf: { maskId: "exposeMask", loadSpeed: "slow", closeSpeed: "fast", closeOnClick: !0, closeOnEsc: !0, zIndex: 9998, opacity: .8, startOpacity: 0, color: "#fff", onLoad: null, onClose: null } }; function c() { if (a.browser.msie) { var b = a(document).height(), c = a(window).height(); return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, b - c < 20 ? c : b] } return [a(document).width(), a(document).height()] } function d(b) { if (b) return b.call(a.mask) } var e, f, g, h, i; a.mask = { load: function (j, k) { if (g) return this; typeof j == "string" && (j = { color: j }), j = j || h, h = j = a.extend(a.extend({}, b.conf), j), e = a("#" + j.maskId), e.length || (e = a("<div/>").attr("id", j.maskId), a("body").append(e)); var l = c(); e.css({ position: "absolute", top: 0, left: 0, width: l[0], height: l[1], display: "none", opacity: j.startOpacity, zIndex: j.zIndex }), j.color && e.css("backgroundColor", j.color); if (d(j.onBeforeLoad) === !1) return this; j.closeOnEsc && a(document).on("keydown.mask", function (b) { b.keyCode == 27 && a.mask.close(b) }), j.closeOnClick && e.on("click.mask", function (b) { a.mask.close(b) }), a(window).on("resize.mask", function () { a.mask.fit() }), k && k.length && (i = k.eq(0).css("zIndex"), a.each(k, function () { var b = a(this); /relative|absolute|fixed/i.test(b.css("position")) || b.css("position", "relative") }), f = k.css({ zIndex: Math.max(j.zIndex + 1, i == "auto" ? 0 : i) })), e.css({ display: "block" }).fadeTo(j.loadSpeed, j.opacity, function () { a.mask.fit(), d(j.onLoad), g = "full" }), g = !0; return this }, close: function () { if (g) { if (d(h.onBeforeClose) === !1) return this; e.fadeOut(h.closeSpeed, function () { d(h.onClose), f && f.css({ zIndex: i }), g = !1 }), a(document).off("keydown.mask"), e.off("click.mask"), a(window).off("resize.mask") } return this }, fit: function () { if (g) { var a = c(); e.css({ width: a[0], height: a[1] }) } }, getMask: function () { return e }, isLoaded: function (a) { return a ? g == "full" : g }, getConf: function () { return h }, getExposed: function () { return f } }, a.fn.mask = function (b) { a.mask.load(b); return this }, a.fn.expose = function (b) { a.mask.load(b, this); return this } })(jQuery);
(function () { var a = document.all, b = "http://www.adobe.com/go/getflashplayer", c = typeof jQuery == "function", d = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/, e = { width: "100%", height: "100%", id: "_" + ("" + Math.random()).slice(9), allowfullscreen: !0, allowscriptaccess: "always", quality: "high", version: [3, 0], onFail: null, expressInstall: null, w3c: !1, cachebusting: !1 }; window.attachEvent && window.attachEvent("onbeforeunload", function () { __flash_unloadHandler = function () { }, __flash_savedUnloadHandler = function () { } }); function f(a, b) { if (b) for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]); return a } function g(a, b) { var c = []; for (var d in a) a.hasOwnProperty(d) && (c[d] = b(a[d])); return c } window.flashembed = function (a, b, c) { typeof a == "string" && (a = document.getElementById(a.replace("#", ""))); if (a) { typeof b == "string" && (b = { src: b }); return new j(a, f(f({}, e), b), c) } }; var h = f(window.flashembed, { conf: e, getVersion: function () { var a, b; try { b = navigator.plugins["Shockwave Flash"].description.slice(16) } catch (c) { try { a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), b = a && a.GetVariable("$version") } catch (e) { try { a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), b = a && a.GetVariable("$version") } catch (f) { } } } b = d.exec(b); return b ? [b[1], b[3]] : [0, 0] }, asString: function (a) { if (a === null || a === undefined) return null; var b = typeof a; b == "object" && a.push && (b = "array"); switch (b) { case "string": a = a.replace(new RegExp("([\"\\\\])", "g"), "\\$1"), a = a.replace(/^\s?(\d+\.?\d*)%/, "$1pct"); return "\"" + a + "\""; case "array": return "[" + g(a, function (a) { return h.asString(a) }).join(",") + "]"; case "function": return "\"function()\""; case "object": var c = []; for (var d in a) a.hasOwnProperty(d) && c.push("\"" + d + "\":" + h.asString(a[d])); return "{" + c.join(",") + "}" } return String(a).replace(/\s/g, " ").replace(/\'/g, "\"") }, getHTML: function (b, c) { b = f({}, b); var d = "<object width=\"" + b.width + "\" height=\"" + b.height + "\" id=\"" + b.id + "\" name=\"" + b.id + "\""; b.cachebusting && (b.src += (b.src.indexOf("?") != -1 ? "&" : "?") + Math.random()), b.w3c || !a ? d += " data=\"" + b.src + "\" type=\"application/x-shockwave-flash\"" : d += " classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"", d += ">"; if (b.w3c || a) d += "<param name=\"movie\" value=\"" + b.src + "\" />"; b.width = b.height = b.id = b.w3c = b.src = null, b.onFail = b.version = b.expressInstall = null; for (var e in b) b[e] && (d += "<param name=\"" + e + "\" value=\"" + b[e] + "\" />"); var g = ""; if (c) { for (var i in c) if (c[i]) { var j = c[i]; g += i + "=" + encodeURIComponent(/function|object/.test(typeof j) ? h.asString(j) : j) + "&" } g = g.slice(0, -1), d += "<param name=\"flashvars\" value='" + g + "' />" } d += "</object>"; return d }, isSupported: function (a) { return i[0] > a[0] || i[0] == a[0] && i[1] >= a[1] } }), i = h.getVersion(); function j(c, d, e) { if (h.isSupported(d.version)) c.innerHTML = h.getHTML(d, e); else if (d.expressInstall && h.isSupported([6, 65])) c.innerHTML = h.getHTML(f(d, { src: d.expressInstall }), { MMredirectURL: location.href, MMplayerType: "PlugIn", MMdoctitle: document.title }); else { c.innerHTML.replace(/\s/g, "") || (c.innerHTML = "<h2>Flash version " + d.version + " or greater is required</h2><h3>" + (i[0] > 0 ? "Your version is " + i : "You have no flash plugin installed") + "</h3>" + (c.tagName == "A" ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='" + b + "'>here</a></p>"), c.tagName == "A" && (c.onclick = function () { location.href = b })); if (d.onFail) { var g = d.onFail.call(this); typeof g == "string" && (c.innerHTML = g) } } a && (window[d.id] = document.getElementById(d.id)), f(this, { getRoot: function () { return c }, getOptions: function () { return d }, getConf: function () { return e }, getApi: function () { return c.firstChild } }) } c && (jQuery.tools = jQuery.tools || { version: "v1.2.7" }, jQuery.tools.flashembed = { conf: e }, jQuery.fn.flashembed = function (a, b) { return this.each(function () { jQuery(this).data("flashembed", flashembed(this, a, b)) }) }) })();
(function (a) { var b, c, d, e; a.tools = a.tools || { version: "v1.2.7" }, a.tools.history = { init: function (g) { e || (a.browser.msie && a.browser.version < "8" ? c || (c = a("<iframe/>").attr("src", "javascript:false;").hide().get(0), a("body").append(c), setInterval(function () { var d = c.contentWindow.document, e = d.location.hash; b !== e && a(window).trigger("hash", e) }, 100), f(location.hash || "#")) : setInterval(function () { var c = location.hash; c !== b && a(window).trigger("hash", c) }, 100), d = d ? d.add(g) : g, g.click(function (b) { var d = a(this).attr("href"); c && f(d); if (d.slice(0, 1) != "#") { location.href = "#" + d; return b.preventDefault() } }), e = !0) } }; function f(a) { if (a) { var b = c.contentWindow.document; b.open().close(), b.location.hash = a } } a(window).on("hash", function (c, e) { e ? d.filter(function () { var b = a(this).attr("href"); return b == e || b == e.replace("#", "") }).trigger("history", [e]) : d.eq(0).trigger("history", [e]), b = e }), a.fn.history = function (b) { a.tools.history.init(this); return this.on("history", b) } })(jQuery);
(function (a) { a.fn.mousewheel = function (a) { return this[a ? "on" : "trigger"]("wheel", a) }, a.event.special.wheel = { setup: function () { a.event.add(this, b, c, {}) }, teardown: function () { a.event.remove(this, b, c) } }; var b = a.browser.mozilla ? "DOMMouseScroll" + (a.browser.version < "1.9" ? " mousemove" : "") : "mousewheel"; function c(b) { switch (b.type) { case "mousemove": return a.extend(b.data, { clientX: b.clientX, clientY: b.clientY, pageX: b.pageX, pageY: b.pageY }); case "DOMMouseScroll": a.extend(b, b.data), b.delta = -b.detail / 3; break; case "mousewheel": b.delta = b.wheelDelta / 120 } b.type = "wheel"; return a.event.handle.call(this, b, b.delta) } })(jQuery);
(function (a) { a.tools = a.tools || { version: "v1.2.7" }, a.tools.tooltip = { conf: { effect: "toggle", fadeOutSpeed: "fast", predelay: 0, delay: 30, opacity: 1, tip: 0, fadeIE: !1, position: ["top", "center"], offset: [0, 0], relative: !1, cancelDefault: !0, events: { def: "mouseenter,mouseleave", input: "focus,blur", widget: "focus mouseenter,blur mouseleave", tooltip: "mouseenter,mouseleave" }, layout: "<div/>", tipClass: "tooltip" }, addEffect: function (a, c, d) { b[a] = [c, d] } }; var b = { toggle: [function (a) { var b = this.getConf(), c = this.getTip(), d = b.opacity; d < 1 && c.css({ opacity: d }), c.show(), a.call() }, function (a) { this.getTip().hide(), a.call() }], fade: [function (b) { var c = this.getConf(); !a.browser.msie || c.fadeIE ? this.getTip().fadeTo(c.fadeInSpeed, c.opacity, b) : (this.getTip().show(), b()) }, function (b) { var c = this.getConf(); !a.browser.msie || c.fadeIE ? this.getTip().fadeOut(c.fadeOutSpeed, b) : (this.getTip().hide(), b()) }] }; function c(b, c, d) { var e = d.relative ? b.position().top : b.offset().top, f = d.relative ? b.position().left : b.offset().left, g = d.position[0]; e -= c.outerHeight() - d.offset[0], f += b.outerWidth() + d.offset[1], /iPad/i.test(navigator.userAgent) && (e -= a(window).scrollTop()); var h = c.outerHeight() + b.outerHeight(); g == "center" && (e += h / 2), g == "bottom" && (e += h), g = d.position[1]; var i = c.outerWidth() + b.outerWidth(); g == "center" && (f -= i / 2), g == "left" && (f -= i); return { top: e, left: f } } function d(d, e) { var f = this, g = d.add(f), h, i = 0, j = 0, k = d.attr("title"), l = d.attr("data-tooltip"), m = b[e.effect], n, o = d.is(":input"), p = o && d.is(":checkbox, :radio, select, :button, :submit"), q = d.attr("type"), r = e.events[q] || e.events[o ? p ? "widget" : "input" : "def"]; if (!m) throw "Nonexistent effect \"" + e.effect + "\""; r = r.split(/,\s*/); if (r.length != 2) throw "Tooltip: bad events configuration for " + q; d.on(r[0], function (a) { clearTimeout(i), e.predelay ? j = setTimeout(function () { f.show(a) }, e.predelay) : f.show(a) }).on(r[1], function (a) { clearTimeout(j), e.delay ? i = setTimeout(function () { f.hide(a) }, e.delay) : f.hide(a) }), k && e.cancelDefault && (d.removeAttr("title"), d.data("title", k)), a.extend(f, { show: function (b) { if (!h) { l ? h = a(l) : e.tip ? h = a(e.tip).eq(0) : k ? h = a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k) : (h = d.next(), h.length || (h = d.parent().next())); if (!h.length) throw "Cannot find tooltip for " + d } if (f.isShown()) return f; h.stop(!0, !0); var o = c(d, h, e); e.tip && h.html(d.data("title")), b = a.Event(), b.type = "onBeforeShow", g.trigger(b, [o]); if (b.isDefaultPrevented()) return f; o = c(d, h, e), h.css({ position: "absolute", top: o.top, left: o.left }), n = !0, m[0].call(f, function () { b.type = "onShow", n = "full", g.trigger(b) }); var p = e.events.tooltip.split(/,\s*/); h.data("__set") || (h.off(p[0]).on(p[0], function () { clearTimeout(i), clearTimeout(j) }), p[1] && !d.is("input:not(:checkbox, :radio), textarea") && h.off(p[1]).on(p[1], function (a) { a.relatedTarget != d[0] && d.trigger(r[1].split(" ")[0]) }), e.tip || h.data("__set", !0)); return f }, hide: function (c) { if (!h || !f.isShown()) return f; c = a.Event(), c.type = "onBeforeHide", g.trigger(c); if (!c.isDefaultPrevented()) { n = !1, b[e.effect][1].call(f, function () { c.type = "onHide", g.trigger(c) }); return f } }, isShown: function (a) { return a ? n == "full" : n }, getConf: function () { return e }, getTip: function () { return h }, getTrigger: function () { return d } }), a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function (b, c) { a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) { b && a(f).on(c, b); return f } }) } a.fn.tooltip = function (b) { var c = this.data("tooltip"); if (c) return c; b = a.extend(!0, {}, a.tools.tooltip.conf, b), typeof b.position == "string" && (b.position = b.position.split(/,?\s/)), this.each(function () { c = new d(a(this), b), a(this).data("tooltip", c) }); return b.api ? c : this } })(jQuery);
(function (a) { var b = a.tools.tooltip; b.dynamic = { conf: { classNames: "top right bottom left" } }; function c(b) { var c = a(window), d = c.width() + c.scrollLeft(), e = c.height() + c.scrollTop(); return [b.offset().top <= c.scrollTop(), d <= b.offset().left + b.width(), e <= b.offset().top + b.height(), c.scrollLeft() >= b.offset().left] } function d(a) { var b = a.length; while (b--) if (a[b]) return !1; return !0 } a.fn.dynamic = function (e) { typeof e == "number" && (e = { speed: e }), e = a.extend({}, b.dynamic.conf, e); var f = a.extend(!0, {}, e), g = e.classNames.split(/\s/), h; this.each(function () { var b = a(this).tooltip().onBeforeShow(function (b, e) { var i = this.getTip(), j = this.getConf(); h || (h = [j.position[0], j.position[1], j.offset[0], j.offset[1], a.extend({}, j)]), a.extend(j, h[4]), j.position = [h[0], h[1]], j.offset = [h[2], h[3]], i.css({ visibility: "hidden", position: "absolute", top: e.top, left: e.left }).show(); var k = a.extend(!0, {}, f), l = c(i); if (!d(l)) { l[2] && (a.extend(j, k.top), j.position[0] = "top", i.addClass(g[0])), l[3] && (a.extend(j, k.right), j.position[1] = "right", i.addClass(g[1])), l[0] && (a.extend(j, k.bottom), j.position[0] = "bottom", i.addClass(g[2])), l[1] && (a.extend(j, k.left), j.position[1] = "left", i.addClass(g[3])); if (l[0] || l[2]) j.offset[0] *= -1; if (l[1] || l[3]) j.offset[1] *= -1 } i.css({ visibility: "visible" }).hide() }); b.onBeforeShow(function () { var a = this.getConf(), b = this.getTip(); setTimeout(function () { a.position = [h[0], h[1]], a.offset = [h[2], h[3]] }, 0) }), b.onHide(function () { var a = this.getTip(); a.removeClass(e.classNames) }), ret = b }); return e.api ? ret : this } })(jQuery);
(function (a) { var b = a.tools.tooltip; a.extend(b.conf, { direction: "up", bounce: !1, slideOffset: 10, slideInSpeed: 200, slideOutSpeed: 200, slideFade: !a.browser.msie }); var c = { up: ["-", "top"], down: ["+", "top"], left: ["-", "left"], right: ["+", "left"] }; b.addEffect("slide", function (a) { var b = this.getConf(), d = this.getTip(), e = b.slideFade ? { opacity: b.opacity } : {}, f = c[b.direction] || c.up; e[f[1]] = f[0] + "=" + b.slideOffset, b.slideFade && d.css({ opacity: 0 }), d.show().animate(e, b.slideInSpeed, a) }, function (b) { var d = this.getConf(), e = d.slideOffset, f = d.slideFade ? { opacity: 0 } : {}, g = c[d.direction] || c.up, h = "" + g[0]; d.bounce && (h = h == "+" ? "-" : "+"), f[g[1]] = h + "=" + e, this.getTip().animate(f, d.slideOutSpeed, function () { a(this).hide(), b.call() }) }) })(jQuery);
(function (a) { a.tools = a.tools || { version: "v1.2.7" }; var b = /\[type=([a-z]+)\]/, c = /^-?[0-9]*(\.[0-9]+)?$/, d = a.tools.dateinput, e = /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i, f = /^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i, g; g = a.tools.validator = { conf: { grouped: !1, effect: "default", errorClass: "invalid", inputEvent: null, errorInputEvent: "keyup", formEvent: "submit", lang: "en", message: "<div/>", messageAttr: "data-message", messageClass: "error", offset: [0, 0], position: "center right", singleError: !1, speed: "normal" }, messages: { "*": { en: "Please correct this value" } }, localize: function (b, c) { a.each(c, function (a, c) { g.messages[a] = g.messages[a] || {}, g.messages[a][b] = c }) }, localizeFn: function (b, c) { g.messages[b] = g.messages[b] || {}, a.extend(g.messages[b], c) }, fn: function (c, d, e) { a.isFunction(d) ? e = d : (typeof d == "string" && (d = { en: d }), this.messages[c.key || c] = d); var f = b.exec(c); f && (c = i(f[1])), j.push([c, e]) }, addEffect: function (a, b, c) { k[a] = [b, c] } }; function h(b, c, d) { c = a(c).first() || c; var e = b.offset().top, f = b.offset().left, g = d.position.split(/,?\s+/), h = g[0], i = g[1]; e -= c.outerHeight() - d.offset[0], f += b.outerWidth() + d.offset[1], /iPad/i.test(navigator.userAgent) && (e -= a(window).scrollTop()); var j = c.outerHeight() + b.outerHeight(); h == "center" && (e += j / 2), h == "bottom" && (e += j); var k = b.outerWidth(); i == "center" && (f -= (k + c.outerWidth()) / 2), i == "left" && (f -= k); return { top: e, left: f } } function i(a) { function b() { return this.getAttribute("type") == a } b.key = "[type=\"" + a + "\"]"; return b } var j = [], k = { "default": [function (b) { var c = this.getConf(); a.each(b, function (b, d) { var e = d.input; e.addClass(c.errorClass); var f = e.data("msg.el"); f || (f = a(c.message).addClass(c.messageClass).appendTo(document.body), e.data("msg.el", f)), f.css({ visibility: "hidden" }).find("p").remove(), a.each(d.messages, function (b, c) { a("<p/>").html(c).appendTo(f) }), f.outerWidth() == f.parent().width() && f.add(f.find("p")).css({ display: "inline" }); var g = h(e, f, c); f.css({ visibility: "visible", position: "absolute", top: g.top, left: g.left }).fadeIn(c.speed) }) }, function (b) { var c = this.getConf(); b.removeClass(c.errorClass).each(function () { var b = a(this).data("msg.el"); b && b.css({ visibility: "hidden" }) }) }] }; a.each("email,url,number".split(","), function (b, c) { a.expr[":"][c] = function (a) { return a.getAttribute("type") === c } }), a.fn.oninvalid = function (a) { return this[a ? "on" : "trigger"]("OI", a) }, g.fn(":email", "Please enter a valid email address", function (a, b) { return !b || e.test(b) }), g.fn(":url", "Please enter a valid URL", function (a, b) { return !b || f.test(b) }), g.fn(":number", "Please enter a numeric value.", function (a, b) { return c.test(b) }), g.fn("[max]", "Please enter a value no larger than $1", function (a, b) { if (b === "" || d && a.is(":date")) return !0; var c = a.attr("max"); return parseFloat(b) <= parseFloat(c) ? !0 : [c] }), g.fn("[min]", "Please enter a value of at least $1", function (a, b) { if (b === "" || d && a.is(":date")) return !0; var c = a.attr("min"); return parseFloat(b) >= parseFloat(c) ? !0 : [c] }), g.fn("[required]", "Please complete this mandatory field.", function (a, b) { if (a.is(":checkbox")) return a.is(":checked"); return b }), g.fn("[pattern]", function (a, b) { return b === "" || (new RegExp("^" + a.attr("pattern") + "$")).test(b) }), g.fn(":radio", "Please select an option.", function (b) { var c = !1, d = a("[name='" + b.attr("name") + "']").each(function (b, d) { a(d).is(":checked") && (c = !0) }); return c ? !0 : !1 }); function l(b, c, e) { var f = this, i = c.add(f); b = b.not(":button, :image, :reset, :submit"), c.attr("novalidate", "novalidate"); function l(b, c, d) { if (e.grouped || !b.length) { var f; if (d === !1 || a.isArray(d)) { f = g.messages[c.key || c] || g.messages["*"], f = f[e.lang] || g.messages["*"].en; var h = f.match(/\$\d/g); h && a.isArray(d) && a.each(h, function (a) { f = f.replace(this, d[a]) }) } else f = d[e.lang] || d; b.push(f) } } a.extend(f, { getConf: function () { return e }, getForm: function () { return c }, getInputs: function () { return b }, reflow: function () { b.each(function () { var b = a(this), c = b.data("msg.el"); if (c) { var d = h(b, c, e); c.css({ top: d.top, left: d.left }) } }); return f }, invalidate: function (c, d) { if (!d) { var g = []; a.each(c, function (a, c) { var d = b.filter("[name='" + a + "']"); d.length && (d.trigger("OI", [c]), g.push({ input: d, messages: [c] })) }), c = g, d = a.Event() } d.type = "onFail", i.trigger(d, [c]), d.isDefaultPrevented() || k[e.effect][0].call(f, c, d); return f }, reset: function (c) { c = c || b, c.removeClass(e.errorClass).each(function () { var b = a(this).data("msg.el"); b && (b.remove(), a(this).data("msg.el", null)) }).off(e.errorInputEvent + ".v"); return f }, destroy: function () { c.off(e.formEvent + ".V reset.V"), b.off(e.inputEvent + ".V change.V"); return f.reset() }, checkValidity: function (c, g) { c = c || b, c = c.not(":disabled"); var h = {}; c = c.filter(function () { var b = a(this).attr("name"); if (!h[b]) { h[b] = !0; return a(this) } }); if (!c.length) return !0; g = g || a.Event(), g.type = "onBeforeValidate", i.trigger(g, [c]); if (g.isDefaultPrevented()) return g.result; var m = []; c.each(function () { var b = [], c = a(this).data("messages", b), h = d && c.is(":date") ? "onHide.v" : e.errorInputEvent + ".v"; c.off(h), a.each(j, function () { var a = this, d = a[0]; if (c.filter(d).length) { var h = a[1].call(f, c, c.val()); if (h !== !0) { g.type = "onBeforeFail", i.trigger(g, [c, d]); if (g.isDefaultPrevented()) return !1; var j = c.attr(e.messageAttr); if (j) { b = [j]; return !1 } l(b, d, h) } } }), b.length && (m.push({ input: c, messages: b }), c.trigger("OI", [b]), e.errorInputEvent && c.on(h, function (a) { f.checkValidity(c, a) })); if (e.singleError && m.length) return !1 }); var n = k[e.effect]; if (!n) throw "Validator: cannot find effect \"" + e.effect + "\""; if (m.length) { f.invalidate(m, g); return !1 } n[1].call(f, c, g), g.type = "onSuccess", i.trigger(g, [c]), c.off(e.errorInputEvent + ".v"); return !0 } }), a.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","), function (b, c) { a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) { b && a(f).on(c, b); return f } }), e.formEvent && c.on(e.formEvent + ".V", function (a) { if (!f.checkValidity(null, a)) return a.preventDefault(); a.target = c, a.type = e.formEvent }), c.on("reset.V", function () { f.reset() }), b[0] && b[0].validity && b.each(function () { this.oninvalid = function () { return !1 } }), c[0] && (c[0].checkValidity = f.checkValidity), e.inputEvent && b.on(e.inputEvent + ".V", function (b) { f.checkValidity(a(this), b) }), b.filter(":checkbox, select").filter("[required]").on("change.V", function (b) { var c = a(this); (this.checked || c.is("select") && a(this).val()) && k[e.effect][1].call(f, c, b) }), b.filter(":radio[required]").on("change.V", function (b) { var c = a("[name='" + a(b.srcElement).attr("name") + "']"); c != null && c.length != 0 && f.checkValidity(c, b) }), a(window).resize(function () { f.reflow() }) } a.fn.validator = function (b) { var c = this.data("validator"); c && (c.destroy(), this.removeData("validator")), b = a.extend(!0, {}, g.conf, b); if (this.is("form")) return this.each(function () { var d = a(this); c = new l(d.find(":input"), d, b), d.data("validator", c) }); c = new l(this, this.eq(0).closest("form"), b); return this.data("validator", c) } })(jQuery);


/*photoslider_with_thumb*/
(function ($) {
    var NivoSlider = function (element, options) {
        // Defaults are below
        var settings = $.extend({}, $.fn.nivoSlider.defaults, options);

        // Useful variables. Play carefully.
        var vars = {
            currentSlide: 0,
            currentImage: '',
            totalSlides: 0,
            running: false,
            paused: false,
            stop: false,
            controlNavEl: false
        };

        // Get this slider
        var slider = $(element);
        slider.data('nivo:vars', vars).addClass('nivoSlider');

        // Find our slider children
        var kids = slider.children();
        kids.each(function () {
            var child = $(this);
            var link = '';
            if (!child.is('img')) {
                if (child.is('a')) {
                    child.addClass('nivo-imageLink');
                    link = child;
                }
                child = child.find('img:first');
            }
            // Get img width & height
            var childWidth = (childWidth === 0) ? child.attr('width') : child.width(),
                childHeight = (childHeight === 0) ? child.attr('height') : child.height();

            if (link !== '') {
                link.css('display', 'none');
            }
            child.css('display', 'none');
            vars.totalSlides++;
        });

        // If randomStart
        if (settings.randomStart) {
            settings.startSlide = Math.floor(Math.random() * vars.totalSlides);
        }

        // Set startSlide
        if (settings.startSlide > 0) {
            if (settings.startSlide >= vars.totalSlides) { settings.startSlide = vars.totalSlides - 1; }
            vars.currentSlide = settings.startSlide;
        }

        // Get initial image
        if ($(kids[vars.currentSlide]).is('img')) {
            vars.currentImage = $(kids[vars.currentSlide]);
        } else {
            vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
        }

        // Show initial link
        if ($(kids[vars.currentSlide]).is('a')) {
            $(kids[vars.currentSlide]).css('display', 'block');
        }

        // Set first background
        var sliderImg = $('<img class="nivo-main-image" src="#" />');
        sliderImg.attr('src', vars.currentImage.attr('src')).show();
        slider.append(sliderImg);

        // Detect Window Resize
        $(window).resize(function () {
            slider.children('img').width(slider.width());
            sliderImg.attr('src', vars.currentImage.attr('src'));
            sliderImg.stop().height('auto');
            $('.nivo-slice').remove();
            $('.nivo-box').remove();
        });

        //Create caption
        slider.append($('<div class="nivo-caption"></div>'));

        // Process caption function
        var processCaption = function (settings) {
            var nivoCaption = $('.nivo-caption', slider);
            if (vars.currentImage.attr('title') != '' && vars.currentImage.attr('title') != undefined) {
                var title = vars.currentImage.attr('title');
                if (title.substr(0, 1) == '#') title = $(title).html();

                if (nivoCaption.css('display') == 'block') {
                    setTimeout(function () {
                        nivoCaption.html(title);
                    }, settings.animSpeed);
                } else {
                    nivoCaption.html(title);
                    nivoCaption.stop().fadeIn(settings.animSpeed);
                }
            } else {
                nivoCaption.stop().fadeOut(settings.animSpeed);
            }
        }

        //Process initial  caption
        processCaption(settings);

        // In the words of Super Mario "let's a go!"
        var timer = 0;
        if (!settings.manualAdvance && kids.length > 1) {
            timer = setInterval(function () { nivoRun(slider, kids, settings, false); }, settings.pauseTime);
        }

        // Add Direction nav
        if (settings.directionNav) {
            slider.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + settings.prevText + '</a><a class="nivo-nextNav">' + settings.nextText + '</a></div>');

            // Hide Direction nav
            if (settings.directionNavHide) {
                $('.nivo-directionNav', slider).hide();
                slider.hover(function () {
                    $('.nivo-directionNav', slider).show();
                }, function () {
                    $('.nivo-directionNav', slider).hide();
                });
            }

            $('a.nivo-prevNav', slider).live('click', function () {
                if (vars.running) { return false; }
                clearInterval(timer);
                timer = '';
                vars.currentSlide -= 2;
                nivoRun(slider, kids, settings, 'prev');
            });

            $('a.nivo-nextNav', slider).live('click', function () {
                if (vars.running) { return false; }
                clearInterval(timer);
                timer = '';
                nivoRun(slider, kids, settings, 'next');
            });
        }

        // Add Control nav
        if (settings.controlNav) {
            var gap = settings.stepNumbers;
            var img_number = kids.length;
            var gap_cells = parseInt(Math.ceil(img_number / gap));//scroll_numbers
            vars.controlNavEl = $('<div class="nivo-controlNav"><a class="prev browse left"><</a><div class="slider_thumbs"><div class="items"></div></div><a class="next browse right">></a></div>');
            for (var i = 0; i < gap_cells; i++) {
                vars.controlNavEl.find(".items").append('<div class="slide_cell"></div>');
            }
            slider.after(vars.controlNavEl);
            for (var i = 0; i < kids.length; i++) {
                if (settings.controlNavThumbs) {
                    vars.controlNavEl.addClass('nivo-thumbs-enabled');
                    var child = kids.eq(i);
                    if (!child.is('img')) {
                        child = child.find('img:first');
                    }
                    var locate = Math.ceil((i + 1) / gap) - 1;
                    if (child.attr('data-thumb')) vars.controlNavEl.find(".slide_cell:eq(" + locate + ")").append('<img class="nivo-control" rel="' + i + '" src="' + child.attr('data-thumb') + '" alt="" />');
                } else {
                    vars.controlNavEl.append('<a class="nivo-control" rel="' + i + '">' + (i + 1) + '</a>');
                }
                vars.controlNavEl.find(".slider_thumbs").scrollable();
            }

            //Set initial active link
            $('img.nivo-control:eq(' + vars.currentSlide + ')', vars.controlNavEl).addClass('active');

            $('img.nivo-control', vars.controlNavEl).bind('click', function () {
                if (vars.running) return false;
                if ($(this).hasClass('active')) return false;
                $('img.nivo-control').removeClass("active");
                $(this).addClass("active");

                clearInterval(timer);
                timer = '';
                sliderImg.attr('src', vars.currentImage.attr('src'));
                vars.currentSlide = $(this).attr('rel') - 1;
                nivoRun(slider, kids, settings, 'control');
            });
        }

        function getcoords(element) { //get coords of thumb image function
            var offset = element.offset() //get image's tracker div's offset from document
            return { left: offset.left, top: offset.top }
        }
        if (settings.enablezoomer) {//img-zoomer
            function afterloaded() {
                var zoom_showdiv_square = slider.find("img:eq(0)").height();
                var zoom_left = slider.find("img:eq(0)").width();
                var zoom_src = slider.find("img:eq(0)").attr("src");
                $("body").append('<div class="zoomer_showdiv" style="width:' + zoom_showdiv_square + 'px; height:' + zoom_showdiv_square + 'px; position:absolute;left:-1000px;top:0;overflow:hidden; "><img src="' + zoom_src + '" style="position:absolute;left:0;top:0;" /></div>');
                var zoom_radio = $(".zoomer_showdiv").find("img").height() / zoom_showdiv_square;//缩放比例

                if (zoom_radio <= 1) {//如果比原图大，则放大原图
                    zoom_radio = 2;
                }
                var zoom_mover_width = slider.find("img:eq(0)").width();
                $(".zoomer_showdiv").find('img').css({ width: zoom_radio * zoom_mover_width, height: zoom_radio * zoom_showdiv_square });

                var zoom_mover_square = Math.round(zoom_showdiv_square / zoom_radio);
                $("body").append('<div class="zoom_mover" style="display:none;position:absolute;left:0;top:0;height:0;width:' + zoom_mover_square + 'px; height:' + zoom_mover_square + 'px;z-index:999; "><div class="zoom_mover_inner" style="position:absolute;left:0;top:0;height:0;width:' + (zoom_mover_square - 2) + 'px; height:' + (zoom_mover_square - 2) + 'px;border:1px solid #333;cursor:move;"></div></div>');
                var target = slider.find(".nivo-main-image");
                var cords, zoomover, img_moveleft, img_moveright, img_movetop, img_movebottom, zoomover_width, zoomover_height;
                function cordsrefresh() {
                    cords = getcoords(target);
                    zoomover = $(".zoom_mover");
                    img_moveleft = cords.left + zoomover.width() / 2;
                    img_moveright = cords.left + slider.width() - zoomover.width() / 2;
                    img_movetop = cords.top + zoomover.height() / 2;
                    img_movebottom = cords.top + slider.height() - zoomover.height() / 2;
                    zoomover_width = zoomover.width() / 2;
                    zoomover_height = zoomover.height() / 2;
                    $(".zoomer_showdiv").css({ left: cords.left + slider.width() + 10, top: cords.top, display: "none" });
                }
                cordsrefresh();
                var zoom_image = $(".zoomer_showdiv").find("img");
                function zoom_moveact(e) {
                   // if ($("#manu_act_tools").size()) {
                        cordsrefresh();
                   // }
                    var now_src = target.attr("src");
                    zoom_image.attr("src", now_src);
                    var cursor_x = e.pageX;
                    var cursor_y = e.pageY;
                    var mover_x, mover_y;
                    if (cursor_x > img_moveleft && cursor_x < img_moveright) {
                        mover_x = cords.left + cursor_x - img_moveleft;
                        zoom_image.css({ left: Math.round(-zoom_radio * (cursor_x - img_moveleft)), right: "auto" });
                    }
                    else if (cursor_x <= img_moveleft) {
                        mover_x = cords.left;
                        zoom_image.css({ left: 0, right: "auto" })
                    }
                    else {
                        mover_x = img_moveright - zoomover_width;
                        zoom_image.css({ left: "auto", right: 0 })
                    }
                    if (cursor_y > img_movetop && cursor_y < img_movebottom) {
                        mover_y = cords.top + cursor_y - img_movetop;
                        zoom_image.css({ top: Math.round(-zoom_radio * (cursor_y - img_movetop)), bottom: "auto" });
                    }
                    else if (cursor_y <= img_movetop) {
                        mover_y = cords.top;
                        zoom_image.css({ top: 0, bottom: "auto" });
                    }
                    else {
                        mover_y = img_movebottom - zoomover_height;
                        zoom_image.css({ top: "auto", bottom: 0 });
                    }
                    $(".zoom_mover").css({ left: mover_x, top: mover_y, display: "block" });
                    $(".zoomer_showdiv").show();
                }
                slider.mousemove(zoom_moveact);
                zoomover.mousemove(zoom_moveact);
                zoomover.mouseover(function () {
                    $(".zoom_mover").show();
                    $(".zoomer_showdiv").show();
                });
                zoomover.mouseleave(function () {
                    $(".zoom_mover").hide();
                    $(".zoomer_showdiv").hide();
                });
                slider.mouseleave(function () {
                    $(".zoom_mover").hide();
                    $(".zoomer_showdiv").hide();
                });
            }
            var img = new Image();
            img.src = slider.find("img:eq(0)").attr("src");
            var intialed = 1;
            img.onload = function () {
                if (intialed) {
                    afterloaded();
                }
                intialed = 0;
            }

            if (img.complete && intialed) {
                intialed = 0;
                afterloaded();
            }

        }
        //For pauseOnHover setting
        if (settings.pauseOnHover) {
            slider.hover(function () {
                vars.paused = true;
                clearInterval(timer);
                timer = '';
            }, function () {
                vars.paused = false;
                // Restart the timer
                if (timer === '' && !settings.manualAdvance) {
                    timer = setInterval(function () { nivoRun(slider, kids, settings, false); }, settings.pauseTime);
                }
            });
        }

        // Event when Animation finishes
        slider.bind('nivo:animFinished', function () {
            sliderImg.attr('src', vars.currentImage.attr('src'));
            vars.running = false;
            // Hide child links
            $(kids).each(function () {
                if ($(this).is('a')) {
                    $(this).fadeIn();
                }
            });
            // Show current link
            if ($(kids[vars.currentSlide]).is('a')) {
                $(kids[vars.currentSlide]).fadeOut();
            }
            // Restart the timer
            if (timer === '' && !vars.paused && !settings.manualAdvance) {
                timer = setInterval(function () { nivoRun(slider, kids, settings, false); }, settings.pauseTime);
            }
            // Trigger the afterChange callback
            settings.afterChange.call(this);
        });

        // Add slices for slice animations
        var createSlices = function (slider, settings, vars) {
            if ($(vars.currentImage).parent().is('a')) $(vars.currentImage).parent().css('display', 'block');
            $('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').width(slider.width()).css('visibility', 'hidden').show();
            var sliceHeight = ($('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').parent().is('a')) ? $('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').parent().height() : $('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').height();

            for (var i = 0; i < settings.slices; i++) {
                var sliceWidth = Math.round(slider.width() / settings.slices);

                if (i === settings.slices - 1) {
                    slider.append(
                        $('<div class="nivo-slice" name="' + i + '"><img src="' + vars.currentImage.attr('src') + '" style="position:absolute; width:' + slider.width() + 'px; height:auto; display:block !important; top:0; left:-' + ((sliceWidth + (i * sliceWidth)) - sliceWidth) + 'px;" /></div>').css({
                            left: (sliceWidth * i) + 'px',
                            width: (slider.width() - (sliceWidth * i)) + 'px',
                            height: sliceHeight + 'px',
                            display: 'none',
                            overflow: 'hidden'
                        })
                    );
                } else {
                    slider.append(
                        $('<div class="nivo-slice" name="' + i + '"><img src="' + vars.currentImage.attr('src') + '" style="position:absolute; width:' + slider.width() + 'px; height:auto; display:block !important; top:0; left:-' + ((sliceWidth + (i * sliceWidth)) - sliceWidth) + 'px;" /></div>').css({
                            left: (sliceWidth * i) + 'px',
                            width: sliceWidth + 'px',
                            height: sliceHeight + 'px',
                            display: 'none',
                            overflow: 'hidden'
                        })
                    );
                }
            }

            /*   $('.nivo-slice', slider).height(sliceHeight);
              sliderImg.stop().animate({
                  height: $(vars.currentImage).height()
              }, settings.animSpeed); */
        };

        // Add boxes for box animations
        var createBoxes = function (slider, settings, vars) {
            if ($(vars.currentImage).parent().is('a')) $(vars.currentImage).parent().css('display', 'block');
            $('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').width(slider.width()).css('visibility', 'hidden').show();
            var boxWidth = Math.round(slider.width() / settings.boxCols),
                boxHeight = Math.round($('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').height() / settings.boxRows);


            for (var rows = 0; rows < settings.boxRows; rows++) {
                for (var cols = 0; cols < settings.boxCols; cols++) {
                    if (cols === settings.boxCols - 1) {
                        slider.append(
                            $('<div class="nivo-box" name="' + cols + '" rel="' + rows + '"><img src="' + vars.currentImage.attr('src') + '" style="position:absolute; width:' + slider.width() + 'px; height:auto; display:block; top:-' + (boxHeight * rows) + 'px; left:-' + (boxWidth * cols) + 'px;" /></div>').css({
                                opacity: 0,
                                left: (boxWidth * cols) + 'px',
                                top: (boxHeight * rows) + 'px',
                                width: (slider.width() - (boxWidth * cols)) + 'px'

                            })
                        );
                        $('.nivo-box[name="' + cols + '"]', slider).height($('.nivo-box[name="' + cols + '"] img', slider).height() + 'px');
                    } else {
                        slider.append(
                            $('<div class="nivo-box" name="' + cols + '" rel="' + rows + '"><img src="' + vars.currentImage.attr('src') + '" style="position:absolute; width:' + slider.width() + 'px; height:auto; display:block; top:-' + (boxHeight * rows) + 'px; left:-' + (boxWidth * cols) + 'px;" /></div>').css({
                                opacity: 0,
                                left: (boxWidth * cols) + 'px',
                                top: (boxHeight * rows) + 'px',
                                width: boxWidth + 'px'
                            })
                        );
                        $('.nivo-box[name="' + cols + '"]', slider).height($('.nivo-box[name="' + cols + '"] img', slider).height() + 'px');
                    }
                }
            }

            sliderImg.stop().animate({
                height: $(vars.currentImage).height()
            }, settings.animSpeed);
        };

        // Private run method
        var nivoRun = function (slider, kids, settings, nudge) {
            // Get our vars
            var vars = slider.data('nivo:vars');

            // Trigger the lastSlide callback
            if (vars && (vars.currentSlide === vars.totalSlides - 1)) {
                settings.lastSlide.call(this);
            }

            // Stop
            if ((!vars || vars.stop) && !nudge) { return false; }

            // Trigger the beforeChange callback
            settings.beforeChange.call(this);

            // Set current background before change
            if (!nudge) {
                sliderImg.attr('src', vars.currentImage.attr('src'));
            } else {
                if (nudge === 'prev') {
                    sliderImg.attr('src', vars.currentImage.attr('src'));
                }
                if (nudge === 'next') {
                    sliderImg.attr('src', vars.currentImage.attr('src'));
                }
            }

            vars.currentSlide++;
            // Trigger the slideshowEnd callback
            if (vars.currentSlide === vars.totalSlides) {
                vars.currentSlide = 0;
                settings.slideshowEnd.call(this);
            }
            if (vars.currentSlide < 0) { vars.currentSlide = (vars.totalSlides - 1); }
            // Set vars.currentImage
            if ($(kids[vars.currentSlide]).is('img')) {
                vars.currentImage = $(kids[vars.currentSlide]);
            } else {
                vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
            }

            // Set active links
            if (settings.controlNav) {
                $('img', vars.controlNavEl).removeClass('active');
                $('img:eq(' + vars.currentSlide + ')', vars.controlNavEl).addClass('active');
            }

            // Process caption
            processCaption(settings);

            // Remove any slices from last transition
            $('.nivo-slice', slider).remove();

            // Remove any boxes from last transition
            $('.nivo-box', slider).remove();

            var currentEffect = settings.effect,
                anims = '';

            // Generate random effect
            if (settings.effect === 'random') {
                anims = new Array('sliceDownRight', 'sliceDownLeft', 'sliceUpRight', 'sliceUpLeft', 'sliceUpDown', 'sliceUpDownLeft', 'fold', 'fade',
                'boxRandom', 'boxRain', 'boxRainReverse', 'boxRainGrow', 'boxRainGrowReverse');
                currentEffect = anims[Math.floor(Math.random() * (anims.length + 1))];
                if (currentEffect === undefined) { currentEffect = 'fade'; }
            }

            // Run random effect from specified set (eg: effect:'fold,fade')
            if (settings.effect.indexOf(',') !== -1) {
                anims = settings.effect.split(',');
                currentEffect = anims[Math.floor(Math.random() * (anims.length))];
                if (currentEffect === undefined) { currentEffect = 'fade'; }
            }

            // Custom transition as defined by "data-transition" attribute
            if (vars.currentImage.attr('data-transition')) {
                currentEffect = vars.currentImage.attr('data-transition');
            }

            // Run effects
            vars.running = true;
            var timeBuff = 0,
                i = 0,
                slices = '',
                firstSlice = '',
                totalBoxes = '',
                boxes = '';

            if (currentEffect === 'sliceDown' || currentEffect === 'sliceDownRight' || currentEffect === 'sliceDownLeft') {
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                slices = $('.nivo-slice', slider);
                if (currentEffect === 'sliceDownLeft') { slices = $('.nivo-slice', slider)._reverse(); }

                slices.each(function () {
                    var slice = $(this);
                    slice.css({ 'top': '0px' });
                    if (i === settings.slices - 1) {
                        setTimeout(function () {
                            slice.animate({ opacity: '1.0' }, settings.animSpeed, '', function () { slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function () {
                            slice.animate({ opacity: '1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    i++;
                });
            } else if (currentEffect === 'sliceUp' || currentEffect === 'sliceUpRight' || currentEffect === 'sliceUpLeft') {
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                slices = $('.nivo-slice', slider);
                if (currentEffect === 'sliceUpLeft') { slices = $('.nivo-slice', slider)._reverse(); }

                slices.each(function () {
                    var slice = $(this);
                    slice.css({ 'bottom': '0px' });
                    if (i === settings.slices - 1) {
                        setTimeout(function () {
                            slice.animate({ opacity: '1.0' }, settings.animSpeed, '', function () { slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function () {
                            slice.animate({ opacity: '1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    i++;
                });
            } else if (currentEffect === 'sliceUpDown' || currentEffect === 'sliceUpDownRight' || currentEffect === 'sliceUpDownLeft') {
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                var v = 0;
                slices = $('.nivo-slice', slider);
                if (currentEffect === 'sliceUpDownLeft') { slices = $('.nivo-slice', slider)._reverse(); }

                slices.each(function () {
                    var slice = $(this);
                    if (i === 0) {
                        slice.css('top', '0px');
                        i++;
                    } else {
                        slice.css('bottom', '0px');
                        i = 0;
                    }

                    if (v === settings.slices - 1) {
                        setTimeout(function () {
                            slice.animate({ opacity: '1.0' }, settings.animSpeed, '', function () { slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function () {
                            slice.animate({ opacity: '1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    v++;
                });
            } else if (currentEffect === 'fold') {
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;

                $('.nivo-slice', slider).each(function () {
                    var slice = $(this);
                    var origWidth = slice.width();
                    slice.css({ top: '0px', width: '0px' });
                    if (i === settings.slices - 1) {
                        setTimeout(function () {
                            slice.animate({ width: origWidth, opacity: '1.0' }, settings.animSpeed, '', function () { slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function () {
                            slice.animate({ width: origWidth, opacity: '1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    i++;
                });
            } else if (currentEffect === 'fade') {
                createSlices(slider, settings, vars);

                firstSlice = $('.nivo-slice:first', slider);
                firstSlice.css({
                    'width': slider.width() + 'px'
                });

                firstSlice.fadeIn((settings.animSpeed * 2), function () { slider.trigger('nivo:animFinished'); }).show();
            } else if (currentEffect === 'slideInRight') {
                createSlices(slider, settings, vars);

                firstSlice = $('.nivo-slice:first', slider);
                firstSlice.css({
                    'width': '0px',
                    'opacity': '1'
                });

                firstSlice.animate({ width: slider.width() + 'px' }, (settings.animSpeed * 2), '', function () { slider.trigger('nivo:animFinished'); });
            } else if (currentEffect === 'slideInLeft') {
                createSlices(slider, settings, vars);

                firstSlice = $('.nivo-slice:first', slider);
                firstSlice.css({
                    'width': '0px',
                    'opacity': '1',
                    'left': '',
                    'right': '0px'
                });

                firstSlice.animate({ width: slider.width() + 'px' }, (settings.animSpeed * 2), '', function () {
                    // Reset positioning
                    firstSlice.css({
                        'left': '0px',
                        'right': ''
                    });
                    slider.trigger('nivo:animFinished');
                });
            } else if (currentEffect === 'boxRandom') {
                createBoxes(slider, settings, vars);

                totalBoxes = settings.boxCols * settings.boxRows;
                i = 0;
                timeBuff = 0;

                boxes = shuffle($('.nivo-box', slider));
                boxes.each(function () {
                    var box = $(this);
                    if (i === totalBoxes - 1) {
                        setTimeout(function () {
                            box.animate({ opacity: '1' }, settings.animSpeed, '', function () { slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function () {
                            box.animate({ opacity: '1' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 20;
                    i++;
                });
            } else if (currentEffect === 'boxRain' || currentEffect === 'boxRainReverse' || currentEffect === 'boxRainGrow' || currentEffect === 'boxRainGrowReverse') {
                createBoxes(slider, settings, vars);

                totalBoxes = settings.boxCols * settings.boxRows;
                i = 0;
                timeBuff = 0;

                // Split boxes into 2D array
                var rowIndex = 0;
                var colIndex = 0;
                var box2Darr = [];
                box2Darr[rowIndex] = [];
                boxes = $('.nivo-box', slider);
                if (currentEffect === 'boxRainReverse' || currentEffect === 'boxRainGrowReverse') {
                    boxes = $('.nivo-box', slider)._reverse();
                }
                boxes.each(function () {
                    box2Darr[rowIndex][colIndex] = $(this);
                    colIndex++;
                    if (colIndex === settings.boxCols) {
                        rowIndex++;
                        colIndex = 0;
                        box2Darr[rowIndex] = [];
                    }
                });

                // Run animation
                for (var cols = 0; cols < (settings.boxCols * 2) ; cols++) {
                    var prevCol = cols;
                    for (var rows = 0; rows < settings.boxRows; rows++) {
                        if (prevCol >= 0 && prevCol < settings.boxCols) {
                            /* Due to some weird JS bug with loop vars 
                            being used in setTimeout, this is wrapped
                            with an anonymous function call */
                            (function (row, col, time, i, totalBoxes) {
                                var box = $(box2Darr[row][col]);
                                var w = box.width();
                                var h = box.height();
                                if (currentEffect === 'boxRainGrow' || currentEffect === 'boxRainGrowReverse') {
                                    box.width(0).height(0);
                                }
                                if (i === totalBoxes - 1) {
                                    setTimeout(function () {
                                        box.animate({ opacity: '1', width: w, height: h }, settings.animSpeed / 1.3, '', function () { slider.trigger('nivo:animFinished'); });
                                    }, (100 + time));
                                } else {
                                    setTimeout(function () {
                                        box.animate({ opacity: '1', width: w, height: h }, settings.animSpeed / 1.3);
                                    }, (100 + time));
                                }
                            })(rows, prevCol, timeBuff, i, totalBoxes);
                            i++;
                        }
                        prevCol--;
                    }
                    timeBuff += 100;
                }
            }
        };

        // Shuffle an array
        var shuffle = function (arr) {
            for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i, 10), x = arr[--i], arr[i] = arr[j], arr[j] = x);
            return arr;
        };

        // For debugging
        var trace = function (msg) {
            if (this.console && typeof console.log !== 'undefined') { console.log(msg); }
        };
        this.element = $(element);
        // Start / Stop
        this.stop = function () {
            if (!$(element).data('nivo:vars').stop) {
                $(element).data('nivo:vars').stop = true;
                trace('Stop Slider');
            }
        };

        this.start = function () {
            if ($(element).data('nivo:vars').stop) {
                $(element).data('nivo:vars').stop = false;
                trace('Start Slider');
            }
        };
        // Trigger the afterLoad callback
        settings.afterLoad.call(this);

        return this;
    };

    $.fn.nivoSlider = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('nivoslider')) { return element.data('nivoslider'); }
            // Pass options to plugin constructor
            var nivoslider = new NivoSlider(this, options);
            // Store plugin object in this element's data
            element.data('nivoslider', nivoslider);
        });
    };

    //Default settings
    $.fn.nivoSlider.defaults = {
        effect: 'fade',
        slices: 15,
        boxCols: 8,
        boxRows: 4,
        animSpeed: 500,
        pauseTime: 3000,
        startSlide: 0,
        enablezoomer: false,
        directionNav: true,
        directionNavHide: true,
        controlNav: true,
        controlNavThumbs: true,
        pauseOnHover: true,
        manualAdvance: true,//false:autoplay
        keyboardNav: true,
        prevText: '<',
        nextText: '>',
        randomStart: false,
        stepNumbers: 5,
        controlNavThumbsFromRel: true,
        beforeChange: function () { },
        afterChange: function () { },
        slideshowEnd: function () { },
        lastSlide: function () { },
        afterLoad: function () { }
    };

    $.fn._reverse = [].reverse;

})(jQuery);

/*main_navi*/
(function ($) {
    var MainNavi = function (element, options) {
        // Defaults are below
        var settings = $.extend({}, $.fn.mainNavi.defaults, options);
        // Get this slider
        var main_navi = $(element);
        var speed = settings.animSpeed;
        if (settings.effect == 'normal') {
            $("li.parent", main_navi).each(function () {
                $(this).hover(
                function () {
                    $(this).find('ul:eq(0)').show();
                },
                function () {
                    $(this).find('ul:eq(0)').hide();
                }
                );
            });

        }
        else if (settings.effect == 'slideDown') {
            var mouseover_tid = [];
            var mouseout_tid = [];
            $("li.parent", main_navi).each(function (index) {
                $(this).hover(
                function () {
                    var _self = this;
                    clearTimeout(mouseout_tid[index]);
                    mouseover_tid[index] = setTimeout(function () {
                        $(_self).find('ul:eq(0)').slideDown(settings.animSpeed);
                    }, settings.defaultTime);
                },
                function () {
                    var _self = this;
                    clearTimeout(mouseover_tid[index]);
                    mouseout_tid[index] = setTimeout(function () {
                        $(_self).find('ul:eq(0)').slideUp(settings.animSpeed);
                    }, settings.defaultTime);
                }
                );
            });

        }
        else if (settings.effect == 'fade') {
            var mouseover_tid = [];
            var mouseout_tid = [];
            $("li.parent", main_navi).each(function (index) {
                $(this).hover(
                function () {
                    var _self = this;
                    clearTimeout(mouseout_tid[index]);
                    mouseover_tid[index] = setTimeout(function () {
                        $(_self).find('ul:eq(0)').fadeIn(settings.animSpeed);
                    }, settings.defaultTime);
                },
                function () {
                    var _self = this;
                    clearTimeout(mouseover_tid[index]);
                    mouseout_tid[index] = setTimeout(function () {
                        $(_self).find('ul:eq(0)').fadeOut(settings.animSpeed);
                    }, settings.defaultTime);
                }
                );
            });

        }
    };

    $.fn.mainNavi = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('mainNavi')) { return element.data('mainNavi'); }
            // Pass options to plugin constructor
            var mainNavi = new MainNavi(this, options);
            // Store plugin object in this element's data
            element.data('mainNavi', mainNavi);
        });
    };

    //Default settings
    $.fn.mainNavi.defaults = {
        effect: 'normal',
        animSpeed: 500,
        defaultTime: 200
    };

})(jQuery);

/*Left_navi*/
(function ($) {
    var LeftNavi = function (element, options) {
        // Defaults are below
        var settings = $.extend({}, $.fn.mainNavi.defaults, options);
        // Get this slider
        var left_navi = $(element);
        var speed = settings.animSpeed;

        // 是否定位到页面左边或者右边
        if (settings.isPosition == 1) {
            // 设置左侧导航的位置
            left_navi.parents('.LeftNavi').css('position', 'absolute')
            if (settings.positionDirec == 'left') {
                left_navi.parents('.LeftNavi').css('left', '0')
            } else if (settings.positionDirec == 'right') {
                left_navi.parents('.LeftNavi').css('right', '0')
            }
            changeNavTop();

            // 鼠标滚动或者屏幕缩放时，改变左侧导航的top值
            $(window).scroll(function () {
                changeNavTop();
            })

            $(window).resize(function () {
                changeNavTop();
            })
        } else if (settings.isPosition == 2) { // 是否左右滚动
            left_navi.parent('.bd').addClass('scrollBd');

            // 将li横过来排放
            var left_naviLiWidth = left_navi.find('.parent').outerWidth(true);
            var left_naviLiLength = left_navi.find('.parent').length;
            left_navi.width(left_naviLiWidth * left_naviLiLength);

            // 添加左右的按钮
            $('<a class="scrollBtn scrollBtnLeft" href="javascript:;">&lt;</a><a class="scrollBtn scrollBtnRight" href="javascript:;">&gt;</a>').appendTo(left_navi.parents('.LeftNavi'));

            // 添加左右按钮的点击事件
            left_navi.parents('.LeftNavi').find('.scrollBtnLeft').click(function (event) {
                event.preventDefault();

                left_navi.find('.firstplink').removeClass('firstplink');
                left_navi.find('.lastplink').removeClass('lastplink').addClass('firstplink');
                left_navi.find('.parent').eq(left_naviLiLength - 2).addClass('lastplink');

                left_navi.css('margin-left', left_naviLiWidth * (-1));
                left_navi.find('.parent').eq(0).before(left_navi.find('.parent').eq(left_naviLiLength - 1));
                left_navi.stop(true, true).animate({ 'margin-left': 0 }, 300);
            });
            left_navi.parents('.LeftNavi').find('.scrollBtnRight').click(function (event) {
                event.preventDefault();

                left_navi.find('.lastplink').removeClass('lastplink');
                left_navi.find('.firstplink').removeClass('firstplink').addClass('lastplink');
                left_navi.find('.parent').eq(1).addClass('firstplink');

                left_navi.stop(true, true).animate({ 'margin-left': left_naviLiWidth * (-1) }, 300, function () {
                    left_navi.find('.parent').eq(left_naviLiLength - 1).after(left_navi.find('.parent').eq(0));
                    left_navi.css('margin-left', 0);

                });
            });
        }

        function changeNavTop() {
            var leftNavWinHeight = $(window).height();
            var leftNavHeight = left_navi.parents('.LeftNavi').outerHeight();
            var leftNavScrollTop = $(document).scrollTop();

            left_navi.parents('.LeftNavi').stop().animate({ 'top': (leftNavWinHeight - leftNavHeight) / 2 + leftNavScrollTop }, 500)
        }


        if (!settings.isHover) {

            if (settings.effect == 'normal') {
                $(".expend", left_navi).each(function () {
                    var fold_ul = $(this).parent().next();
                    if (fold_ul.is(":visible")) {
                        $(this).attr("class", "unexpend");
                    }
                    $(this).click(function (event) {
                        event.preventDefault();
                        if (fold_ul.is(":visible")) {
                            $(this).attr("class", "expend");
                            fold_ul.hide();
                        }
                        else {
                            $(this).attr("class", "unexpend");
                            fold_ul.show();
                        }
                    });
                });
            }
            else if (settings.effect == 'slideDown') {
                $(".expend", left_navi).each(function () {
                    var fold_ul = $(this).parent().next();
                    if (fold_ul.is(":visible")) {
                        $(this).attr("class", "unexpend");
                    }
                    $(this).click(function (event) {
                        event.preventDefault();
                        if (fold_ul.is(":visible")) {
                            $(this).attr("class", "expend");
                            fold_ul.slideUp(settings.animSpeed);
                        }
                        else {
                            $(this).attr("class", "unexpend");
                            fold_ul.slideDown(settings.animSpeed);
                        }
                    });
                });
            }
            else if (settings.effect == 'fade') {
                $(".expend", left_navi).each(function () {
                    var fold_ul = $(this).parent().next();
                    if (fold_ul.is(":visible")) {
                        $(this).attr("class", "unexpend");
                    }
                    $(this).click(function (event) {
                        event.preventDefault();
                        if (fold_ul.is(":visible")) {
                            $(this).attr("class", "expend");
                            fold_ul.fadeOut(settings.animSpeed);
                        }
                        else {
                            $(this).attr("class", "unexpend");
                            fold_ul.fadeIn(settings.animSpeed);
                        }
                    });
                });
            }
        } else {
            // 当鼠标浮动到大分类上，显示子分类
            // 一些准备工作，让子分类隐藏
            $(".children1", left_navi).hide(0);

            // 二级分类的下拉
            $(".parent", left_navi).each(function () {
                $(this).hover(function () {
                    $(this).find('.children1').stop(true, true).slideDown(200);
                    $(this).addClass('parent_active');
                    $(this).find('.lone_link span').attr("class", "unexpend");
                }, function () {
                    $(this).find('.children1').stop(true, true).slideUp(200);
                    $(this).removeClass('parent_active');
                    $(this).find('.lone_link span').attr("class", "expend");
                });
            })

            // 三级分类的下拉
            $(".item1:first-child", left_navi).each(function () {
                $(this).hover(function () {
                    $(this).find('.children2').stop(true, true).slideDown(200);
                    $(this).addClass('children_active');
                    $(this).find('a span').attr("class", "unexpend");
                }, function () {
                    $(this).find('.children2').stop(true, true).slideUp(200);
                    $(this).removeClass('children_active');
                    $(this).find('a span').attr("class", "expend");
                });
            })
        }
    };

    $.fn.leftNavi = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('leftNavi')) { return element.data('leftNavi'); }
            // Pass options to plugin constructor
            var leftNavi = new LeftNavi(this, options);
            // Store plugin object in this element's data
            element.data('leftNavi', leftNavi);
        });
    };

    //Default settings
    $.fn.leftNavi.defaults = {
        effect: 'normal',
        animSpeed: 500,
        isHover: false,
        isPosition: 0,
        positionDirec: 'left'
    };

})(jQuery);

/*Left_navi*/
(function ($) {
    var LeftNavi = function (element, options) {
        // Defaults are below
        var settings = $.extend({}, $.fn.mainNavi.defaults, options);
        // Get this slider
        var left_navi = $(element);
        var speed = settings.animSpeed;
        if (settings.effect == 'normal') {
            $(".expend", left_navi).each(function () {
                var fold_ul = $(this).parent().parent().next();
                if (fold_ul.is(":visible")) {
                    $(this).attr("class", "unexpend");
                }
                $(this).click(function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    if (fold_ul.is(":visible")) {
                        $(this).attr("class", "expend");
                        $(this).parent().parent().removeClass("unexpendbox");
                        $(this).parent().parent().addClass("expendbox");
                        fold_ul.hide();
                    }
                    else {
                        $(this).parent().parent().addClass("unexpendbox");
                        $(this).parent().parent().removeClass("expendbox");
                        $(this).attr("class", "unexpend");
                        fold_ul.show();
                    }
                });
            });
            $(".firlinkbx", left_navi).each(function () {
                var fold_ul = $(this).next();
                if (fold_ul.size() == 0) {
                    return;
                }
                if (fold_ul.is(":visible")) {
                    $(this).addClass("unexpendbox");
                }
                $(this).click(function (event) {
                    if (fold_ul.is(":visible")) {
                        $(this).removeClass("unexpendbox");
                        $(this).addClass("expendbox");
                        $(this).find("a span").attr("class", "expend");
                        fold_ul.hide();
                    }
                    else {
                        $(this).addClass("unexpendbox");
                        $(this).removeClass("expendbox");
                        $(this).find("a span").attr("class", "unexpend");
                        fold_ul.show();
                    }
                });
            });
        }
        else if (settings.effect == 'slideDown') {
            $(".expend", left_navi).each(function () {
                var fold_ul = $(this).parent().parent().siblings('ul');
                if (fold_ul.is(":visible")) {
                    $(this).attr("class", "unexpend");
                }
                $(this).click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (fold_ul.is(":visible")) {
                        $(this).parent().parent().removeClass("unexpendbox");
                        $(this).parent().parent().addClass("expendbox");
                        $(this).attr("class", "expend");
                        fold_ul.slideUp(settings.animSpeed);
                    }
                    else {
                        $(this).parent().parent().addClass("unexpendbox");
                        $(this).parent().parent().removeClass("expendbox");
                        $(this).attr("class", "unexpend");
                        fold_ul.slideDown(settings.animSpeed);
                    }
                });
            });
            $(".firlinkbx", left_navi).each(function () {
                var fold_ul = $(this).siblings('ul');
                if (fold_ul.size() == 0) {
                    return true;
                }
                if (fold_ul.is(":visible")) {
                    $(this).addClass("unexpendbox");
                }
                $(this).click(function (event) {
                    if (fold_ul.is(":visible")) {
                        $(this).removeClass("unexpendbox");
                        $(this).addClass("expendbox");
                        $(this).find("a span").attr("class", "expend");
                        fold_ul.slideUp(settings.animSpeed);
                    }
                    else {
                        $(this).addClass("unexpendbox");
                        $(this).removeClass("expendbox");
                        $(this).find("a span").attr("class", "unexpend");
                        fold_ul.slideDown(settings.animSpeed);
                    }
                });
            });

        }
        else if (settings.effect == 'fade') {
            $(".expend", left_navi).each(function () {
                var fold_ul = $(this).parent().parent().next();
                if (fold_ul.is(":visible")) {
                    $(this).attr("class", "unexpend");
                }
                $(this).click(function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    if (fold_ul.is(":visible")) {
                        $(this).parent().parent().removeClass("unexpendbox");
                        $(this).parent().parent().addClass("expendbox");
                        $(this).attr("class", "expend");
                        fold_ul.fadeOut(settings.animSpeed);
                    }
                    else {
                        $(this).parent().parent().addClass("unexpendbox");
                        $(this).parent().parent().removeClass("expendbox");
                        $(this).attr("class", "unexpend");
                        fold_ul.fadeIn(settings.animSpeed);
                    }
                });
            });
            $(".firlinkbx", left_navi).each(function () {
                var fold_ul = $(this).next();
                if (fold_ul.size() == 0) {
                    return;
                }
                if (fold_ul.is(":visible")) {
                    $(this).addClass("unexpendbox");
                }
                $(this).click(function (event) {
                    if (fold_ul.is(":visible")) {
                        $(this).removeClass("unexpendbox");
                        $(this).addClass("expendbox");
                        $(this).find("a span").attr("class", "expend");
                        fold_ul.fadeOut(settings.animSpeed);
                    }
                    else {
                        $(this).addClass("unexpendbox");
                        $(this).removeClass("expendbox");
                        $(this).find("a span").attr("class", "unexpend");
                        fold_ul.fadeIn(settings.animSpeed);
                    }
                });
            });
        }

        //记住当前链接状态
        if (settings.remState == 1) {
            var naviList = left_navi;
            var c1 = naviList.find(".activelink ").parent();
            var c2 = c1.parent().parent();
            var c3 = c2.parent().parent();
            c1.show();
            c1.siblings(".firlinkbx").addClass("unexpendbox").removeClass("expendbox");
            c2.show();
            c2.siblings(".firlinkbx").addClass("unexpendbox").removeClass("expendbox");
            c3.show();
            c3.siblings(".firlinkbx").addClass("unexpendbox").removeClass("expendbox");
        }
    };

    $.fn.leftNaviExpand = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('leftNavi')) { return element.data('leftNavi'); }
            // Pass options to plugin constructor
            var leftNavi = new LeftNavi(this, options);
            // Store plugin object in this element's data
            element.data('leftNavi', leftNavi);
        });
    };

    //Default settings
    $.fn.leftNaviExpand.defaults = {
        effect: 'normal',
        animSpeed: 500
    };

})(jQuery);


/*couplet*/
(function ($) {
    var Couplet = function (element, options) {
        // Defaults are below
        var settings = $.extend({}, $.fn.couplet.defaults, options);
        // Get this slider
        var obj = $(element);
        var lasty = 0;
        if (settings.layout == 'left') {
            $('.coupletRbox', obj).hide();
        } else if (settings.layout == 'right') {
            $('.coupletLbox', obj).hide();
        } else if (settings.layout == 'both') {
            $('.coupletLbox,.coupletRbox', obj).show();
        }
        function coupletRoll() {
            var diffy;
            if (document.documentElement && document.documentElement.scrollTop) {
                diffy = document.documentElement.scrollTop;
            } else if (document.body) {
                diffy = document.body.scrollTop;
            }
            percent = (diffy - lasty) / 10;
            if (percent > 0) {
                percent = Math.ceil(percent);
            } else {
                percent = Math.floor(percent);
            }
            var martop = parseInt($('.coupletLbox', obj).css('top')) + percent;
            $('.coupletLbox,.coupletRbox', obj).css('top', martop);
            lasty = lasty + percent;
        }
        $('.couplet_close', obj).click(function () {
            obj.remove();
        });
        var int = setInterval(coupletRoll, 30);
    };

    $.fn.couplet = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('couplet')) { return element.data('couplet'); }
            // Pass options to plugin constructor
            var couplet = new Couplet(this, options);
            // Store plugin object in this element's data
            element.data('couplet', couplet);
        });
    };

    //Default settings
    $.fn.couplet.defaults = {
        layout: 'both'
    };

})(jQuery);
(function ($) {
    var ImStyle = function (element, options) {
        // Defaults are below
        var settings = $.extend({}, $.fn.IMStyle.defaults, options);
        // Get this slider
        var obj = $(element);
        var lasty = 0;
        function IMStyleRoll() {
            var diffy;
            if (document.documentElement && document.documentElement.scrollTop) {
                diffy = document.documentElement.scrollTop;
            } else if (document.body) {
                diffy = document.body.scrollTop;
            }
            percent = (diffy - lasty) / 10;
            if (percent > 0) {
                percent = Math.ceil(percent);
            } else {
                percent = Math.floor(percent);
            }
            var martop = parseInt($(obj).css('top')) + percent;
            $(obj).css('top', martop);
            lasty = lasty + percent;
        }
        var int = setInterval(IMStyleRoll, 30);
    };

    $.fn.IMStyle = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('IMStyle')) { return element.data('IMStyle'); }
            // Pass options to plugin constructor
            var IMStyle = new ImStyle(this, options);
            // Store plugin object in this element's data
            element.data('IMStyle', IMStyle);
        });
    };

    //Default settings
    $.fn.IMStyle.defaults = {
        layout: 'both'
    };

})(jQuery);

(function ($) {//Employee_submit
    //应聘人员信息填写开始
    var Employee_submit = function (element, options) {//应聘信息验证
        jQuery.validator.addMethod("IsHeight", function (value, _element) {//验证身高
            var regHeight = /^[0-9]{2,3}$/;
            return this.optional(_element) || (regHeight.test(value));
        }, "请正确填写您的身高");
        jQuery.validator.addMethod("checkName", function (value, _element) {//验证姓名
            var regName = /^[\u4E00-\u9FA5a-zA-Z]{1,50}$/;
            return this.optional(_element) || (regName.test($.trim(value)));
        }, "请正确填写您的姓名");
        jQuery.validator.addMethod("IsZipCode", function (value, _element) {// 邮政编码验证   
            var tel = /^[0-9]{6}$/;
            return this.optional(_element) || (tel.test(value));
        }, "请正确填写您的邮政编码");
        jQuery.validator.addMethod("IsMobile", function (value, _element) {// 手机号码验证
            var length = value.length;
            var mobile = /^\d{7,11}$/;
            return this.optional(_element) || (length == 11 && mobile.test(value));
        }, "手机号码格式错误");
        jQuery.validator.addMethod("IsTelephone", function (value, _element) {// 电话号码验证   
            var tel = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
            return this.optional(_element) || (tel.test(value));
        }, "电话号码格式错误");
        jQuery.validator.addMethod("checkDate", function (value, _element) {//检查日期格式
            var ereg = /^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/;
            var r = value.match(ereg);
            if (r == null) { return false; } var d = new Date(r[1], r[3] - 1, r[5]); var result = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[5]); return this.optional(_element) || (result);
        }, "");
        $(element).find("form").validate({
            'rules': {
                'txtEmployeeName': {//应聘人员名称
                    'required': true, "checkName": true, 'maxlength': 50
                }, 'txtBirthday': {//请填写出生日期
                    /*'required': true, "checkDate": true*/
                }, 'txtHeight': {//身高
                    /*'required': true, "IsHeight": true*/
                }, 'txtSchool': {//毕业学校
                    /*'required': true,*/'maxlength': 100
                }, 'txtMajor': {//专业
                    /*'required': true,*/'maxlength': 50
                }, 'txtDegree': {//学历
                    /*'required': true,*/'maxlength': 10
                }, 'txtGraduatedTime': {//毕业时间
                    'date': true
                },
                'txtBirthplace': {//户籍地
                    'required': true, 'maxlength': 100
                }, 'txtEducation': {
                    'required': true, 'maxlength': 500
                }, 'txtWorking': {
                    'required': true, 'maxlength': 700
                }, 'txtTelephone': {
                    /*'required': true,*/'IsTelephone': true
                }, 'txtMobile': {
                    'required': true, 'IsMobile': true
                }, 'txtEmail': {
                    'required': true, 'email': true
                }, 'txtPostCode': {
                    'IsZipCode': true
                }, 'txtAddress': {
                    'maxlength': 100
                }
            },
            'messages': {
                'txtEmployeeName': {
                    'required': I18NSWYLAN.LeaveName, "checkName": I18NSWYLAN.OnlyChineseLetters, 'maxlength': I18NSWYLAN.UpWords
                }, 'txtBirthday': {//
                    'required': I18NSWYLAN.FillBirth, "checkDate": I18NSWYLAN.FillFormatdate
                }, 'txtHeight': {//
                    'required': I18NSWYLAN.FillHeight, "IsHeight": I18NSWYLAN.FillCorrectHeight
                }, 'txtSchool': {//学校
                    /*'required': "请填写毕业院校", */'maxlength': "最多100个字"
                }, 'txtMajor': {//专业
                    /*'required': "请填写专业", */'maxlength': "最多50个字"
                }, 'txtDegree': {//有效期
                    /*'required': "请填写学历",*/'maxlength': "最多10个字"
                }, 'txtGraduatedTime': {//毕业时间
                    'date': I18NSWYLAN.FillFormatdate
                }, 'txtBirthplace': {
                    'required': I18NSWYLAN.FillRegistration, 'maxlength': "最多100个字"
                }, 'txtEducation': {
                    'required': I18NSWYLAN.FillEduExp, 'maxlength': "最多500个字"
                }, 'txtWorking': {
                    'required': I18NSWYLAN.FillWorkExp, 'maxlength': "最多700个字"
                }, 'txtTelephone': {
                    /*'required': "请填写联系电话",*/'IsTelephone': I18NSWYLAN.TelNumError
                }, 'txtMobile': {
                    'required': I18NSWYLAN.FillMobPhoneNum, 'IsMobile': I18NSWYLAN.MobPhoneNumError
                }, 'txtEmail': {
                    'required': I18NSWYLAN.FillMail, 'email': I18NSWYLAN.FillFormatMail
                }, 'txtPostCode': {
                    'IsZipCode': I18NSWYLAN.FillCorrCode
                }, 'txtAddress': {
                    'maxlength': "最多100个字"
                }
            }, //messages
            submitHandler: function (form) {
                EmployeeSave(element);
            } //, submitHandler
            //debug: true
        }); // .validate
    }; //Employee_Submit
    var EmployeeSave = function (element) {//添加应聘
        var d = {}; // alert(0);
        d.jobid = $(element).find("input[name='hidJobId']").eq(0).val();
        d.EmployeeName = $(element).find("input[name='txtEmployeeName']").eq(0).val();  //应聘人员名称
        d.Birthday = $(element).find("input[name='txtBirthday']").eq(0).val(); //请填写出生日期
        d.Height = $(element).find("input[name='txtHeight']").eq(0).val();
        $(element).find("input[name='rdoGenderSex']").each(function () {
            if ($(this)[0].checked) {
                d.Gender = $(this).val();
            }
        });
        d.School = $(element).find("input[name='txtSchool']").eq(0).val();
        $(element).find("input[name='rdoIsMarriaged']").each(function () {
            if ($(this)[0].checked) {
                d.IsMarriaged = $(this).val();
            }
        });
        d.Major = $(element).find("input[name='txtMajor']").eq(0).val(); //专业
        d.Degree = $(element).find("input[name='txtDegree']").eq(0).val();//学历
        d.GraduatedTime = $(element).find("input[name='txtGraduatedTime']").eq(0).val();//毕业时间
        d.Birthplace = $(element).find("input[name='txtBirthplace']").eq(0).val();
        d.Education = $(element).find("textarea[name='txtEducation']").eq(0).val();
        d.Working = $(element).find("textarea[name='txtWorking']").eq(0).val();
        d.Telephone = $(element).find("input[name='txtTelephone']").eq(0).val();
        d.Mobile = $(element).find("input[name='txtMobile']").eq(0).val();
        d.Email = $(element).find("input[name='txtEmail']").eq(0).val();
        d.Address = $(element).find("input[name='txtAddress']").eq(0).val();
        d.PostCode = $(element).find("input[name='txtPostCode']").eq(0).val();
        $.ajax({
            url: "/Jobs/AddEmployee",
            data: d,
            type: "post",
            dataType: "json",
            success: function (val) {
                if (val.Code > 0) {
                    alert(val.Msg);
                    location.href = $(element).find("input[name='hidListURL']").eq(0).val();//返回地址
                }
                else {
                    alert(val.Msg);
                }
            } //success00
        }); //ajax
    };  //EmployeeSave
    $.fn.Employee_Submit = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('Employee_submit')) { return element.data('Employee_submit'); }
            // Pass options to plugin constructor
            var employee_submit = new Employee_submit(this, options);
            // Store plugin object in this element's data
            element.data('Employee_submit', employee_submit);
        });
    };//$.fn.Employee_submit
})(jQuery);//Employee_submit end
/*
 * 产品询价
*/
(function ($) {//ProductInquire_Submit
    //询价信息填写开始
    var productInquire_Submit = function (element, options) {//应聘信息验证
        var inquireElement = $(element);//询价挂件外层元素
        jQuery.validator.addMethod("IsMobile", function (value, _element) {// 手机号码验证
            var length = value.length;
            var mobile = /^\d{7,11}$/;
            return this.optional(_element) || (length == 11 && mobile.test(value));
        }, I18NSWYLAN.MobPhoneNumError);
        jQuery.validator.addMethod("IsTelephone", function (value, _element) {// 电话号码验证   
            var tel = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
            return this.optional(_element) || (tel.test(value));
        }, I18NSWYLAN.TelNumError);
        $(element).find("form").validate({
            'rules': {
                'lecontent': {//留言内容
                    'required': true, 'maxlength': 200
                }, 'msg_telphone': {
                    /*'required': true,*/'IsTelephone': true
                }, 'msg_phone': {
                    'required': true, 'IsMobile': true
                }, 'msg_email': {
                    'required': true, 'email': true
                }, 'vaildtxt': {
                    'required': true
                }
            },
            'messages': {
                'lecontent': {
                    'required': I18NSWYLAN.FillMsg, 'maxlength': "最多200个字"
                }, 'msg_telphone': {//
                    "IsTelephone": I18NSWYLAN.TelNumError
                }, 'msg_phone': {//
                    'required': I18NSWYLAN.FillMobPhoneNum, "IsMobile": I18NSWYLAN.FillMobPhoneNum
                }, 'msg_email': {
                    'required': I18NSWYLAN.FillMail, 'email': I18NSWYLAN.FillFormatMail
                }, 'vaildtxt': {
                    'required': I18NSWYLAN.FillVerCode
                }
            }, //messages
            submitHandler: function (form) {
                ProductInquireAdd(element);//alert(0);
            } //, submitHandler
            //debug: true
        }); // .validate
        inquireElement.find("input[name='validimg']").click(function () {
            $(this).attr('src', '/ValidationCode/CreateImage?' + Math.random());
        });// inquireElement validimg click end
        inquireElement.find(".MsgList").find('.toggle_adreplay').toggle(function (event) {//展开收起回复
            event.preventDefault();
            $(this).parents('.adm_reply').find(".replay_lists li:gt(0)").show();
            $(this).text("收起");
        }, function (event) {
            event.preventDefault();
            $(this).parents('.adm_reply').find(".replay_lists li:gt(0)").hide();
            $(this).text("展开");
        });
    }; //productInquire_Submit
    var ProductInquireAdd = function (element) {//添加应聘
        var divoutElement = $(element);//询价挂件外层元素
        var d = {};//alert(0); 
        var fg = divoutElement.find("input[name='hffg']").eq(0).val();
        if (fg == "True") {
            var vildtxt = divoutElement.find("input[name='vaildtxt']").eq(0).val();
            d.vild = vildtxt;
        }
        d.ProductId = divoutElement.find("input[name='hidProductId']").eq(0).val();//对应产品id
        d.MesageType = divoutElement.find("input[name='hidMesageType']").eq(0).val();//留言类型，MsgType=4为询价
        d.lecontent = divoutElement.find("textarea[name='lecontent']").eq(0).val();
        d.email = divoutElement.find("input[name='msg_email']").eq(0).val();//邮箱
        d.telphone = divoutElement.find("input[name='msg_telphone']").eq(0).val();
        d.company = divoutElement.find("input[name='msg_company']").eq(0).val();
        d.phone = divoutElement.find("input[name='msg_phone']").eq(0).val();
        d.address = divoutElement.find("input[name='msg_address']").eq(0).val();
        divoutElement.find("input[name='sex']").each(function () {
            if ($(this)[0].checked) {
                d.sex = $(this).val();
            }
        });
        d.title = divoutElement.find("input[name='msg_title']").eq(0).val();
        if (divoutElement.find("input[name='msg_ckemail']").size() > 0) {
            if (divoutElement.find("input[name='msg_ckemail']").eq(0)[0].checked)//发邮件
            {
                d.msg_hidchemail = 1;
            }
            else//不发邮件
            {
                d.msg_hidchemail = 0;
            }
        }
        if (divoutElement.find("input[name='msg_ckphone']").size() > 0) {
            if (divoutElement.find("input[name='msg_ckphone']").eq(0)[0].checked) {//发短信
                d.msg_hidchphone = 1;
            }
            else//不发短信
            {
                d.msg_hidchphone = 0;
            }
        }
        divoutElement.find('.logerro_tip').hide();
        var OpenMsg = $("#hidIsOpenMsged").val();
        var ReDays = $("#hidRepDays").val();
        $.ajax({
            type: "post",
            url: "/Product/ProductInquireAdd",
            dataType: "json",
            data: d,
            success: function (v) {
                if (v != null) {//alert(v.code);
                    if (v.code == 0) {
                        if (v.fg == true) {
                            if (OpenMsg > 0) {
                                alert("欢迎您的咨询，我们会在" + ReDays + "工作日以内给您回复！");
                            }
                            divoutElement.find('.logerro_tip').text(I18NSWYLAN.fgMsgSuccess).show();
                            divoutElement.find("input[name='validimg']").eq(0).attr('src',
                             '/ValidationCode/CreateImage?' + Math.random());
                        }
                        else {
                            var html = "<li><div class='lg_top'>";
                            html += "<a href='' class='lg_name'>" + v.names + "</a><span class='lg_time'>" + v.addtime + "</span></div>";
                            html += "<div class='lg_content'>" + v.cxt + "</div></li>";
                            divoutElement.find("input[name='msgList']").eq(0).prepend(html);
                            divoutElement.find('.logerro_tip').text(I18NSWYLAN.postMsg).show();
                            divoutElement.find("input[name='lecontent']").eq(0).val("");
                            $("input[name='msg_email']").eq(0).val("");
                            divoutElement.find("input[name='msg_telphone']").eq(0).val("");
                            divoutElement.find("input[name='msg_company']").eq(0).val("");
                            divoutElement.find("input[name='msg_phone']").eq(0).val("");
                            divoutElement.find("input[name='msg_address']").eq(0).val("");
                            divoutElement.find("input[name='msg_title']").eq(0).val("");
                            divoutElement.find("input[name='validimg']").eq(0).attr('src',
                             '/ValidationCode/CreateImage?' + Math.random());
                            if (OpenMsg > 0) {
                                alert("欢迎您的咨询，我们会在" + ReDays + "工作日以内给您回复！");
                            }
                        }
                        location.href = location.href;
                    }//留言成功
                    else if (v.code == 2) {
                        divoutElement.find('.logerro_tip').eq(0).text("验证码不正确！").show();
                        divoutElement.find("input[name='validimg']").eq(0).attr('src', '/ValidationCode/CreateImage?' + Math.random());
                    }
                    else if (v.code == 1) {
                        divoutElement.find('.logerro_tip').eq(0).text(I18NSWYLAN.postMsgErro).show();
                        divoutElement.find("input[name='validimg']").eq(0).attr('src', '/ValidationCode/CreateImage?' + Math.random());
                    }
                }//if (v.code == 0) 
            }// success
        })//ajax
    };  //productInquire
    $.fn.ProductInquire_Submit = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('ProductInquire_Submit')) { return element.data('ProductInquire_Submit'); }
            // Pass options to plugin constructor
            var productinquire_submit = new productInquire_Submit(this, options);
            // Store plugin object in this element's data
            element.data('ProductInquire_Submit', productinquire_submit);
        });
    };//$.fn.ProductInquire_Submit
})(jQuery);//ProductInquire_Submit end

(function ($) {//vedio-detail
    var Videodetail = function (element, options) {
        var video_target = $(element).find(".divVideoPlayHolder");
        var videoTagID = video_target.data("videotagid"); //相当于当前视频部分唯一id标示
        var VideoShareFilePath = video_target.data("videosharefilepath"); //视频分享相关配置文件路径
        var PathType = video_target.data("videopathtype"); //视频来源类型，1：外网视频，0：本地视频
        var isautoplay = video_target.data("isautoplay");//是否自动播放，0：否，1：是
        var _websitehosturl = "";
        if (video_target.size() > 0) {
            if (video_target.eq(0).data("websitehosturl") != "") {
                _websitehosturl = video_target.eq(0).data("websitehosturl");
            }
        }
        var fValue = "";

        // if (PathType == 1) {
        //    fValue = video_target.data("videourl"); //外网视频
        //} else {
        //    fValue = _websitehosturl+"/Scripts/ckplayer/geturl.swf"; //本地视频
        //}
        // var aValue = video_target.data("videodataid");

        // var flashvars = { f: fValue, a: aValue, s: 3, c: '0', x: '', i: '', d: '', u: '', l: '', r: '', t: '1', e: '2', v: '80', p: ''+isautoplay+'', h: '1', q: '', m: '0', g: '', j: '', k: '', n: '', b: '0x000', my_url: encodeURIComponent(window.location.href), w: '' }; //视频配置参数

        //var params = { bgcolor: '#000000', allowFullScreen: true, allowScriptAccess: 'always' }; //外观参数
        //var attributes = { id: 'ckp' + videoTagID, name: 'ckp' + videoTagID,"class":'videoplayer-cls' }; //所在div 的id
        //if (fValue.indexOf("www.tudou.com") > -1 || fValue.indexOf("qiyi.com") > -1) {
        //    changePlayer(fValue, 'a1-' + videoTagID);
        //} else {
        //    swfobject.embedSWF(_websitehosturl+'/Scripts/ckplayer/ckplayer.swf', 'a1-' + videoTagID, '600', '400', '10.0.0',_websitehosturl+ '/Scripts/ckplayer/expressInstall.swf', flashvars, params, attributes); //播放器地址，容器id，宽，高，需要flash插件的版本，flashvars,params,attributes   
        //} //embedSWF

        if (PathType == 1) {
            fValue = video_target.data("videourl"); //外网视频
        } else {
            fValue = video_target.data("videodataid"); //本地视频
        }
        //var fValue = video_target.data("videodataid");

        //alert(fValue);
        var flashvars = {
            f: fValue,
            c: '0',
            p: isautoplay
        };
        var params = { bgcolor: '#000000', allowFullScreen: true, allowScriptAccess: 'always' }; //外观参数
        if (PathType == 1) {
            videoRemotechangePlayer(fValue, 'a1-' + videoTagID);
        } else {
            CKobject.embedSWF(_websitehosturl + '/Scripts/ckplayer/ckplayer.swf', 'a1-' + videoTagID, 'ckplayer_a1', '600', '400', flashvars, params);
        }

        var Remark_view = document.getElementById("divRemark-" + videoTagID); //视频简介，内容处理
        Remark_view.innerHTML = Remark_view.title.replace(/script/gim, "<label>script</label>");
    };//Videodetail
    $.fn.VideoDetail = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('Videodetail')) { return element.data('Videodetail'); }
            // Pass options to plugin constructor
            var videodetail = new Videodetail(this, options);
            // Store plugin object in this element's data
            element.data('Videodetail', videodetail);
        });
    };//$.fn.VideoDetail
})(jQuery);//vedio-detail 视频播放

(function ($) {//survey 调查问卷
    var toJSON = function (txtOrObj, hasIndent) {//转换为json格式
        var data = txtOrObj;
        if (typeof data == 'string') try { data = eval('(' + data + ')') } catch (e) { return "" };
        var draw = [], last = false, isLast = true, indent = 0;
        function notify(name, value, isLast, formObj) {
            if (value && value.constructor == Array) {
                draw.push((formObj ? ('"' + name + '":') : '') + '[');
                for (var i = 0; i < value.length; i++) notify(i, value[i], i == value.length - 1, false);
                draw.push(']' + (isLast ? '' : (',')));
            } else if (value && typeof value == 'object') {
                draw.push((formObj ? ('"' + name + '":') : '') + '{');
                var len = 0, i = 0;
                for (var key in value) len++;
                for (var key in value) notify(key, value[key], ++i == len, true);
                draw.push('}' + (isLast ? '' : (',')));
            } else {
                if (typeof value == 'string') value = '"' + value + '"';
                draw.push((formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ','));
            };
        };
        notify('', data, isLast, false);
        return draw.join('');
    };//toJSON
    //提交保存调查结果（挂件外层div,编号 在线调查编号 调查完成是否需要跳转页面 跳转到的页面）
    var SurveySave = function (element, modelid, sid, isurl, url, Vote_TelPhone, Vote_name) {//alert(0);
        var d = {};
        var tid = '';
        var tclass = '';
        var topic = {};
        var $otemp;
        var tv = 0;
        var flag = true;
        d.surveyid = sid;
        if (Vote_TelPhone != null) { d.ffour = Vote_TelPhone; }
        if (Vote_name != null) { d.fthree = Vote_name; }

        d.answertopics = new Array();//alert($(element).find('.topic').size()+$(element).data("wiget-type"));
        var $listpop = $("div[name='" + modelid + "_list_pop']");
        $(element).find("div[name='survey_" + modelid + "']").find('.topic').each(function () {
            topic = {};
            tid = $(this).data('topicid');
            tclass = $(this).data('topicclass');
            if (!SurveyValidate(element, tid, tclass, $(this))) {
                flag = false;
            }
            if (tclass == "TextArea") {
                $otemp = $(this).find('textarea');
                topic.answerid = 0;
                topic.surveytopicid = tid;
                topic.value = $.trim($otemp.val());
                d.answertopics.push(topic);
            }
            else if (tclass == "Radio") {
                topic.answerid = 0;
                topic.surveytopicid = tid;
                topic.value = "";
                $(this).find('input:checked').each(function () {
                    tv = $(this).val();
                    $otemp = $(element).find("input[name='" + tid + "_Text_" + tv + "']").eq(0);
                    topic.value += tv;
                    if ($otemp && $otemp.val()) {
                        topic.value += "@" + $.trim($otemp.val());
                    }
                });
                d.answertopics.push(topic);
            }
            else if (tclass == "CheckBox") {
                topic.answerid = 0;
                topic.surveytopicid = tid;
                topic.value = "";
                $(this).find('input:checked').each(function () {
                    tv = $(this).val();
                    $otemp = $(element).find("input[name='" + tid + "_Text_" + tv + "']").eq(0);
                    topic.value += "|" + tv;
                    if ($otemp && $otemp.val()) {
                        topic.value += "@" + $.trim($otemp.val());
                    }
                });
                if (topic.value.length > 0) {
                    topic.value = topic.value.substring(1);
                }
                d.answertopics.push(topic);
            }
        });
        var isSuccess = 0;
        var divTitle = $(element).data("widgettitle").toLowerCase();//title属性值，相当于方法名
        if (flag) {
            $.ajax({
                url: "/Survey/SurveySave",
                data: toJSON(d),
                type: "post",
                dataType: "json",
                success: function (val) {
                    if (val == null) {
                        return;
                    }
                    if (val.Code == 1) {//成功 //
                        if (isSuccess == 0) {
                            if (divTitle == "singlevotedetail" || divTitle == "votedetail") {//只有投票有弹框
                                SurveyOutcome(element, modelid, sid);//查看结果
                            } else {//问卷调查采用alert提示信息
                                alert(val.Msg);
                            }
                        }
                    }
                    else {//报错的时候
                        alert(val.Msg);
                    }
                    isSuccess++;
                    if (($(element).data("widgettitle") == "QuestionnaireDetail" || $(element).data("widgettitle") == "SingleQuestionDetail") && $(element).data("redirecturl") != "") {//问卷调查跳转页面
                        location.href = $(element).data("redirecturl");
                    }
                } //success
            }); //ajax
        } //if(flag)
    }; //Survey.SurveySave
    //验证在线调查
    var SurveyValidate = function (element, tid, tclass, $obj) {//alert(0);
        var $error = $obj.find("[name='" + tid + "_errormsg']").eq(0);
        var $otemp;
        var tv = 0;
        var flag = true;
        var errflg = true;
        if ($error[0]) {
            $error.text("")
            if (tclass == "TextArea") {
                $otemp = $obj.find('textarea');
                if ($.trim($otemp.val()).length <= 0) {
                    $error.text("请填写答案");
                    errflg = false;
                }
            }
            else if (tclass == "Radio") {
                $obj.find('input:checked').each(function () {
                    flag = false;
                    tv = $(this).val();
                    $otemp = $(element).find("input[name='" + tid + "_Text_" + tv + "']").eq(0);
                    if ($otemp && $otemp.attr('type')) {
                        if ($.trim($otemp.val()).length <= 0) {
                            $error.text("请填写选择项连带的输入框");
                            errflg = false;
                        }
                    }
                });
                if (flag) {
                    $error.text("请填写答案");
                    errflg = false;
                }
            }
            else if (tclass == "CheckBox") {
                $obj.find('input:checked').each(function () {
                    flag = false;
                    tv = $(this).val();
                    $otemp = $(element).find("input[name='" + tid + "_Text_" + tv + "']").eq(0);
                    if ($otemp && $otemp.attr('type')) {
                        if ($.trim($otemp.val()).length <= 0) {
                            $error.text("请填写选择项连带的输入框");
                            errflg = false;
                        }
                    }
                });
                if (flag) {
                    $error.text("请填写答案");
                    errflg = false;
                }
            }
        }
        return errflg;
    }; //Survey.SurveyValidate
    //清空选项
    var SurveyClear = function (element, modelid) {
        $(element).find("div[name='survey_" + modelid + "']").find('.topic').each(function () {
            topic = {};
            tid = $(this).data('topicid');
            tclass = $(this).data('topicclass');
            if (!SurveyValidate(element, tid, tclass, $(this))) {
                flag = false;
            }
            if (tclass == "TextArea") {
                $otemp = $(this).find('textarea');
                $otemp.val('');
            }
            else if (tclass == "Radio") {
                $(this).find('input:checked').each(function () {
                    tv = $(this).val();
                    $otemp = $(element).find("input[name='" + tid + "_Text_" + tv + "']").eq(0);
                    $(this).attr("checked", false);
                    if ($otemp && $otemp.val()) {
                        $otemp.val('');
                    }
                });
            }
            else if (tclass == "CheckBox") {
                $(this).find('input:checked').each(function () {
                    tv = $(this).val();
                    $otemp = $(element).find("input[name='" + tid + "_Text_" + tv + "']").eq(0);
                    $(this).attr("checked", false);
                    if ($otemp && $otemp.val()) {
                        $otemp.val('');
                    }
                });
            }
        });
    }; //Survey.SurveyValidate
    //查看投票结果（挂件模块编号 在线调查编号）
    var SurveyOutcome = function (element, modelid, sid) {
        var OPrefix = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; //题目选项前缀
        var data = {};
        data.id = sid;
        //投票结果弹出层//$(element).find("div[name='" + modelid + "_pop']").dialog("open");           
        var $listpop = $("div[name='" + modelid + "_list_pop']");
        $listpop.html("");
        $.ajax({
            url: '/Survey/SurveyStatistics',
            data: data,
            type: 'post',
            dataType: 'json',
            success: function (v) {//v的格式{Code:0,List[{id:1,type:0,require:true,title:"标题"},{id:2,type:0,require:true,title:"标题"}]}
                if (v.Code == 1) {//用返回的json拼接结构alert(1)                    
                    $(element).find("div[name='" + modelid + "_title_pop']").html(v.Survey.title); //显示标题
                    //console.log("div[name='" + modelid + "_list_pop']");
                    $(element).find("div[name='" + modelid + "_title_pop']").html("");
                    var temp = "";
                    var opts = [];
                    for (var i = 0; i < v.Survey.surveytopics.length; i++) {
                        temp = "<div>"; //题目的问题 
                        temp += v.Survey.surveytopics[i].title;
                        if (v.Survey.surveytopics[i].isrequired == 1) {
                            temp += " （必填）";
                        }
                        temp += "【<label class=\"topic_style\">" + v.Survey.surveytopics[i].topicclassname;
                        if (v.Survey.mode == "Questionnaire") {
                            temp += "" + v.Survey.surveytopics[i].scores + " 分 ";
                        }
                        temp += "</label>】";
                        temp += "</div>";
                        //题目选项
                        temp += "<div>";
                        if (v.Survey.surveytopics[i].topicclass == "") {//填空题

                        }
                        else {
                            opts = v.Survey.surveytopics[i].options.split("|");
                            for (var j = 0; j < opts.length; j++) {
                                temp += "" + OPrefix[j] + ". " + opts[j] + "    【选择数：" + v.Survey.surveytopics[i].optionselects[j + 1] + " 人 选择百分比： ";
                                if (v.Survey.answercount > 0) {
                                    temp += Math.round((v.Survey.surveytopics[i].optionselects[j + 1] / v.Survey.answercount) * 100);
                                }
                                else {
                                    temp += "0";
                                }
                                temp += "%】<br />";
                            }
                        }
                        temp += "</div>";
                        $listpop.append(temp);
                        //console.log("div[name='" + modelid + "_pop']");
                    }
                }
                else if (v.Code == -402) {
                    alert(v.Msg);
                }
            }
        }); //$.ajax            
        $("div[name=" + modelid + "_pop]").dialog("open");
    };//SurveyOutcome
    var Surveydetail = function (element, options) {//事件绑定      
        var elementObj = $(element);
        var divTitle = elementObj.data("widgettitle").toLowerCase();//title属性值，相当于方法名
        var hasPermission = elementObj.data("haspermission");//判断是否有权限进行投票，若没有则显示错误
        if (hasPermission != "") {
            elementObj.find("div[name='survey_errormsg_" + elementObj.data("surveytagid") + "']").show();
            elementObj.find("div[name='survey_errormsg_" + elementObj.data("surveytagid") + "']").html(hasPermission);//alert(hasPermission);survey_errormsg_$!{surveyTagID}
        }
        elementObj.find(".SurveySaveSubmit").each(function () {//提交事件绑定   
            elementObj.find("div[name='" + $(this).data("surveytagid") + "_pop']").dialog({ "autoOpen": false, "position": ["center ", 100], "width": 500, "draggable": false });//alert($(element).html());
            $("." + $(this).data("surveytagid") + "_popcancel").click(function (event) {//关闭dialog
                event.preventDefault();
                $("div[name='" + $(this).data("surveytagid") + "_pop']").dialog("close");
            });
            $(this).click(function () {
                SurveySave(element, $(this).data("surveytagid"), $(this).data("suyveyid"), false, "", $("#Vote_TelPhone").val(), $("#Vote_name").val());//保存
                return false;
            });
        });//SurveySaveSubmit each

        //      elementObj.find(".SurveyOutcomeView").each(function(){//查看结果    
        //          $(this).click(function(){
        //              SurveyOutcome(element,$(this).data("surveytagid"),$(this).data("suyveyid"));//查看结果
        //              return false;
        //          });
        //      });//SurveyOutcomeView each

    };//Surveydetail
    $.fn.SurveyDetail = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('Surveydetail')) { return element.data('Surveydetail'); }
            // Pass options to plugin constructor
            var surveydetail = new Surveydetail(this, options);
            // Store plugin object in this element's data
            element.data('Surveydetail', surveydetail);
        });
    };//$.fn.Surveydetail
})(jQuery);

(function ($) {
    var baiduMap = function (element, options) {
        // Defaults are below
        //var settings = $.extend({}, $.fn.IMStyle.defaults, options);
        // Get this slider
        var obj = $(element);
        var r_result = obj.find(".appbaidu_result").data("id");
        var map_instance = obj.find(".appbaidu_instance").data("id");
        var map = new BMap.Map(map_instance);            // 创建Map实例
        var save = obj.find(".appbaidu_hdnSetPoints")[0];
        var myFun = function (result) {
            var cityName = result.name;
            map.setCenter(cityName);
        }
        var InitialMap = function () {
            map.centerAndZoom(new BMap.Point(121.491, 31.233), 11);


            RecoverMark(true);
            map.enableScrollWheelZoom(); // 开启鼠标滚轮缩放
            map.enableContinuousZoom(); // 开启连续缩放效果
            map.enableInertialDragging(); // 开启惯性拖拽效果
            map.addControl(new BMap.NavigationControl()); //地图平移缩放控件
            var opts = { offset: new BMap.Size(150, 5) }
            map.addControl(new BMap.ScaleControl(opts)); //比例尺控件
            map.addControl(new BMap.OverviewMapControl()); //缩略地图控件 

        }

        var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
        var search = function (start, end, route) {
            var transit = new BMap.DrivingRoute(map, {
                renderOptions: { map: map, panel: r_result },
                policy: route
            });
            transit.search(start, end);
        }
        obj.find(".classCar").click(function () {
            var classStart = obj.find(".classStart").val();
            var classEnd = obj.find(".classEnd").val();
            search(classStart, classEnd, routePolicy[0]); //最少时间

        });


        var transit = new BMap.TransitRoute(map, {
            renderOptions: { map: map, panel: r_result },
            policy: BMAP_TRANSIT_POLICY_LEAST_TIME   //不乘地铁  
        });

        obj.find(".classAddress").click(function () {
            var classStart = obj.find(".classStart").val();
            var classEnd = obj.find(".classEnd").val();
            transit.search(classStart, classEnd);
        });




        var RecoverMark = function (isMoveto) {
            if (map && save.value.length > 0) {
                var points = save.value.split("|");
                for (var i = 0; i < points.length; i++) {
                    var point = points[i].split(",");
                    var pointMarker = new BMap.Point(point[0], point[1]); // 创建标注的坐标
                    var marker = new BMap.Marker(pointMarker); // 创建标注
                    var label = new BMap.Label(point[2], { "offset": new BMap.Size(20, -10) }); //添加标注
                    marker.setLabel(label);
                    map.addOverlay(marker); // 将标注添加到地图中
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    if (isMoveto && i == 0) {//地图移动到第一个表示的位置
                        map.panTo(new BMap.Point(point[0], point[1]));
                    }
                }
            }
            else {
                var local = new BMap.LocalSearch(map, {
                    renderOptions: { map: map, panel: r_result }
                });
                //local.search("苏州");
            }

        }
        InitialMap();
    };

    $.fn.BaiduMap = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('baiduMap')) { return element.data('baiduMap'); }
            // Pass options to plugin constructor
            var baidumap = new baiduMap(this, options);
            // Store plugin object in this element's data
            element.data('baiduMap', baidumap);
        });
    };

    //Default settings
    $.fn.BaiduMap.defaults = {
        layout: 'both'
    };

})(jQuery);





(function ($) {
    var Memberregister = function (element, options) {
        // Defaults are below
        //var settings = $.extend({}, $.fn.IMStyle.defaults, options);
        // Get this slider

        //身份证验证
        var IdCardValidate = (function () {
            var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
            var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X   
            function IdCardValidate(idCard) {
                idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格                     
                if (idCard.length == 15) {
                    return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
                } else if (idCard.length == 18) {
                    var a_idCard = idCard.split("");                // 得到身份证数组   
                    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            /**  
             * 判断身份证号码为18位时最后的验证位是否正确  
             * @param a_idCard 身份证号码数组  
             * @return  
             */
            function isTrueValidateCodeBy18IdCard(a_idCard) {
                var sum = 0;                             // 声明加权求和变量   
                if (a_idCard[17].toLowerCase() == 'x') {
                    a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
                }
                for (var i = 0; i < 17; i++) {
                    sum += Wi[i] * a_idCard[i];            // 加权求和   
                }
                valCodePosition = sum % 11;                // 得到验证码所位置   
                if (a_idCard[17] == ValideCode[valCodePosition]) {
                    return true;
                } else {
                    return false;
                }
            }
            /**  
              * 验证18位数身份证号码中的生日是否是有效生日  
              * @param idCard 18位书身份证字符串  
              * @return  
              */
            function isValidityBrithBy18IdCard(idCard18) {
                var year = idCard18.substring(6, 10);
                var month = idCard18.substring(10, 12);
                var day = idCard18.substring(12, 14);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 这里用getFullYear()获取年份，避免千年虫问题   
                if (temp_date.getFullYear() != parseFloat(year)
                      || temp_date.getMonth() != parseFloat(month) - 1
                      || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }
            /**  
             * 验证15位数身份证号码中的生日是否是有效生日  
             * @param idCard15 15位书身份证字符串  
             * @return  
             */
            function isValidityBrithBy15IdCard(idCard15) {
                var year = idCard15.substring(6, 8);
                var month = idCard15.substring(8, 10);
                var day = idCard15.substring(10, 12);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
                if (temp_date.getYear() != parseFloat(year)
                        || temp_date.getMonth() != parseFloat(month) - 1
                        || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }
            //去掉字符串头尾空格   
            function trim(str) {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }
            return IdCardValidate;
        }());
        jQuery.validator.addMethod("IdCardValidate", IdCardValidate, "<font color='red'>身份证格式有误</font>");

        var obj = $(element);
        obj.find("form").validate({
            'rules': {
                'txtLoginName': {
                    'required': true,
                    'rangelength': [5, 20]
                },
                'txtLoginPass': {
                    'required': true,
                    'rangelength': [3, 15]
                },
                'txtLoginPassAgain': {
                    'required': true,
                    'rangelength': [3, 15],
                    'equalTo': "[name=txtLoginPass]"
                },
                'txtUserEmail': {
                    'required': true,
                    'email': true
                },
                'txtUserMobile': {
                    'required': true
                },
                'txtID': {
                    'required': true,
                    'IdCardValidate': true
                }

            },
            'messages': {
                'txtLoginName': {
                    'required': "请填写用户名",
                    'rangelength': "用户名为5到20个字符"
                },
                'txtLoginPass': {
                    'required': "请填写密码",
                    'rangelength': "密码为3到15个字符"
                },
                'txtLoginPassAgain': {
                    'required': "请再次输入密码",
                    'rangelength': "密码为3到15个字符",
                    'equalTo': "两次输入密码不一致"
                },
                'txtUserEmail': {
                    'required': "请填写电子邮件",
                    'email': "请填写正确格式的电子邮件"
                },
                'txtUserMobile': {
                    'required': "请填写正确格式的手机号码"
                },
                'txtID': {
                    'required': "请输入身份号码",
                    'IdCardValidate': "身份证格式有误"
                }
            },

            'submitHandler': function (form) {
                MmberRegfun();
            }
        });
        var MmberRegfun = function () {
            var loginname = obj.find("input[name='txtLoginName']").val();
            var loginpass = obj.find("input[name='txtLoginPass']").val();
            var email = obj.find("input[name='txtUserEmail']").val();
            var phone = obj.find("input[name='txtUserMobile']").val();
            var qq = obj.find("input[name='txtUserqq']").val();
            var username = obj.find("input[name='txtUserName']").val();
            var address = obj.find("input[name='txtUseraddress']").val();
            var Pcheck = obj.find("input[name='phonefg']").val();
            var Echeck = obj.find("input[name='emailfg']").val();
            var telflag = obj.find("input[name='telflag']").val();
            var emaflag = obj.find("input[name='emaflag']").val();
            var ID = obj.find("input[name='txtID']").val();
            var data = {};
            data.telflag = telflag;
            data.emaflag = emaflag;
            data.Pcheck = Pcheck;
            data.Echeck = Echeck;
            data.loginname = loginname;
            data.loginpass = loginpass;
            data.email = email;
            data.phone = phone;
            data.qq = qq;
            data.username = username;
            data.address = address;
            data.id = ID;

            $.ajax({
                type: "POST",
                url: "/Member/MemberRegedit",
                data: data,
                success: function (data) {
                    if (data.Code == 1) {
                        alert(data.Msg);
                        window.location = $("#hidurl").val();
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

    };

    $.fn.MemberRegister = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('Memberregister')) { return element.data('Memberregister'); }
            // Pass options to plugin constructor
            var memberregister = new Memberregister(this, options);
            // Store plugin object in this element's data
            element.data('Memberregister', memberregister);
        });
    };

    //Default settings
    $.fn.MemberRegister.defaults = {
        layout: 'both'
    };

})(jQuery);



(function ($) {
    var Memberedit = function (element, options) {
        // Defaults are below
        //var settings = $.extend({}, $.fn.IMStyle.defaults, options);
        // Get this slider
        var obj = $(element);
        obj.find("form").validate({
            'rules': {
                'txtLoginName': {
                    'required': true,
                    'rangelength': [5, 20]
                },
                'txtUserEmail': {
                    'required': true,
                    'email': true
                },
                'txtUserMobile': {
                    'required': true
                }

            },
            'messages': {
                'txtLoginName': {
                    'required': "请填写用户名",
                    'rangelength': "用户名为5到20个字符"
                },

                'txtUserEmail': {
                    'required': "请填写电子邮件",
                    'email': "请填写正确格式的电子邮件"
                },
                'txtUserMobile': {
                    'required': "请填写正确格式的手机号码"
                }
            },
            'submitHandler': function (form) {
                MemberEdit();
            }
        });
        var MemberEdit = function () {
            var pass = obj.find("input[name='txtLoginPass']").val();
            var email = obj.find("input[name='txtUserEmail']").val();
            var phone = obj.find("input[name='txtUserMobile']").val();
            var qq = obj.find("input[name='txtUserqq']").val();
            var username = obj.find("input[name='txtUserName']").val();
            var address = obj.find("input[name='txtUseraddress']").val();
            var id = obj.find("input[name='hidmid']").val();
            var data = {};
            data.pass = pass;
            data.email = email;
            data.phone = phone;
            data.qq = qq;
            data.username = username;
            data.address = address;
            data.id = id;
            $.ajax({
                type: "POST",
                url: "/Member/Memberedits",
                data: data,
                success: function (data) {
                    if (data.Code == 1) {
                        alert(data.Msg);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

    };

    $.fn.MemberEdit = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('Memberedit')) { return element.data('Memberedit'); }
            // Pass options to plugin constructor
            var memberedit = new Memberedit(this, options);
            // Store plugin object in this element's data
            element.data('Memberedit', memberedit);
        });
    };

    //Default settings
    $.fn.MemberEdit.defaults = {
        layout: 'both'
    };

})(jQuery);

(function ($) {
    var Memberlogin = function (element, options) {
        // Defaults are below
        //var settings = $.extend({}, $.fn.IMStyle.defaults, options);
        // Get this slider
        var obj = $(element);
        var mid = obj.find("input[name='hidmid']").val();
        $(".Ver_jump").click(function (event) {
            event.preventDefault();
            var weburl = $(this).attr("data-src");

            var id = obj.find("input[name='hidmid']").val();
            window.location = weburl + '?id=' + id;
        })
        $(".Ver_jumpedit").click(function (event) {
            event.preventDefault();
            var weburl = $(this).attr("data-src");
            var id = obj.find("input[name='hidmid']").val();
            window.location = weburl + '?id=' + id;
        })
        $("[name='validimg']").click(function () {
            $("[name='validimg']").attr('src', '/ValidationCode/CreateImage?' + Math.random());
        });

    };

    $.fn.MemberLogin = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('Memberlogin')) { return element.data('Memberlogin'); }
            // Pass options to plugin constructor
            var memberlogin = new Memberlogin(this, options);
            // Store plugin object in this element's data
            element.data('Memberlogin', memberlogin);
        });
    };

    //Default settings
    $.fn.MemberLogin.defaults = {
        layout: 'both'
    };

})(jQuery);

(function ($) {//多语言选择
    var languageSelect = function (element, options) {
        var obj = $(element);
        var s_trigger = obj.find(".lansel_bx");
        var s_tarlists = obj.find(".lansel_lists");
        s_trigger.click(function (event) {
            event.stopPropagation();
            if (s_tarlists.is(":visible")) {
                s_tarlists.hide();
            }
            else {
                s_tarlists.show();
            }
        });
        $("body").bind("click", function () {
            s_tarlists.hide();
        });
    };

    $.fn.LanguageSelect = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('languageSelect')) { return element.data('languageSelect'); }
            // Pass options to plugin constructor
            var languageselect = new languageSelect(this, options);
            // Store plugin object in this element's data
            element.data('languageSelect', languageselect);
        });
    };

    //Default settings
    $.fn.LanguageSelect.defaults = {
        layout: 'both'
    };

})(jQuery);

(function ($) {//搜索挂件
    var searchWidgetResult = function (element, options) {
        var objElement = $(element);
        var SearchResultList = function (total, pageSize) {
            if (total > 0) {
                $("div[name='data_page_nav']").pagination(total, {
                    prev_text: '上一页',
                    next_text: '下一页',
                    num_display_entries: 5,
                    current_page: 0,
                    items_per_page: pageSize,
                    num_edge_entries: 2,
                    show_if_single_page: true,
                    load_first_page: false,
                    callback: GetSearchResultList
                });
            }
        };//SearchResultList
        var GetSearchResultList = function (pageIndex) {
            var d = {};
            var keyword = $.trim(objElement.find("[name='keyword']").val());//出现关键字
            var searchType = objElement.find("input[name=hidSearchType]").val();//搜索选择类型
            d.k = keyword;
            d.s = searchType;
            d.P = pageIndex + 1;
            d.aliascode = objElement.attr("id");//挂件代号
            $("ul[name=ul_ResultList_holder]").html("");
            $('div[name=div_noresult_tip]').hide();//隐藏无结果提示
            $('div[name=div_nokeyword_tip]').hide();//隐藏无关键字提示
            //if (keyword == "") {//查询关键字不能为空提示
               // $('div[name=div_nokeyword_tip]').show(); return;
           // }
            $.ajax({
                url: '/Common/GetSearchResultList',
                data: d,
                type: 'post',
                async: false,
                dataType: 'json',
                success: function (v) {//ul_ResultList_holder
                    if (v.Code > 0) {
                        objElement.data("totalcount", v.totalcount);//查询结果总数
                        objElement.data("pagesize", v.pagesize);//每页条数
                        var liArray = new Array();
                        for (var i = 0; i < v.v_list.length; i++) {
                            liArray.push('<li class="f ' + searchType + '_li">');
                            liArray.push('<h3 class="t">');//<!--标题-->
                            liArray.push('<a href="' + v.websitehosturl + '/' + v.detailurl + '/I' + v.v_list[i].IdHex + '.html" target="' + v.v_target + '">' + v.v_list[i].Name_LightKeyword + '</a>');
                            liArray.push('</h3>');
                            liArray.push('<div class="fc">');//<!--简介-->
                            if (v.v_list[i].Descr_LightKeyword != "") {
                                liArray.push('<div class="s_discr">' + v.v_list[i].Descr_LightKeyword + '</div>');
                            }
                            liArray.push('<p class="wl">' + v.websitehosturl + '/' + v.detailurl + '/I' + v.v_list[i].IdHex + '.html ' + v.v_list[i].CreateTime_Str + '</p>');
                            liArray.push('</div><br />');
                            liArray.push('</li>');
                        }
                        $("ul[name=ul_ResultList_holder]").append(liArray.join(''));
                        if (v.isshowpage > 0) {
                            $("div[name='data_page_nav']").show();
                        } else {
                            $("div[name='data_page_nav']").hide();
                        }
                    }//if
                    else {//没有搜到内容
                        objElement.data("totalcount", 0);//查询结果总数
                        objElement.data("pagesize", 10);//每页条数
                        if ($('div[name=div_noresult_tip]').data("hassearchtype") != "0") {
                            $('div[name=div_noresult_tip]').show();
                            $('div[name=div_nokeyword_tip]').hide();
                            $('div[name=div_noresult_tip] em').html(keyword);
                        }
                        $("div[name='data_page_nav']").hide();
                    }
                }//success
            });
        };//GetResultList

        objElement.find(".s_tab :radio").bind("click", function () {//点击搜索类文字SearchResultList
            objElement.find("input[name='hidSearchType']").val($(this).val());
            GetSearchResultList(0);//数据列表
            SearchResultList(objElement.data("totalcount"), objElement.data("pagesize"));//分页
            //return false;
        });//点击搜索类文字
        objElement.find("input[name='searchBtn']").bind("click", function () {//点击按钮
            var keyword = $.trim(objElement.find("[name=keyword]").val());//出现关键字
            var searchType = objElement.find("input[name=hidSearchType]").val();//搜索选择类型
            var keywordInput = objElement.find("[name='keyword']");//alert(keyword);
            if (keyword == "" || keyword == I18NSWYLAN.FillKeyWords) {
                keywordInput.val(I18NSWYLAN.FillKeyWords);
                keywordInput.select().focus();
                return false;
            }
            GetSearchResultList(0);//数据列表
            SearchResultList(objElement.data("totalcount"), objElement.data("pagesize"));//分页
            return false;
        });//点击按钮
        objElement.find("input[name='keyword']").bind("keydown", function (event) {//回车提交
            event = (event) ? event : ((window.event) ? window.event : "")
            var keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
            if (keyCode == 13) {
                objElement.find("input[name='searchBtn']").trigger("click");//搜索事件 
                return false;
            }
        });
        objElement.find("form").bind("submit", function () { return false; });//阻止提交
        SearchResultList(objElement.data("totalcount"), objElement.data("pagesize"));//初始化分页事件
        if (objElement.data("isshowpage") > 0) {//是否显示分页
            $("div[name='data_page_nav']").show();
        } else {
            $("div[name='data_page_nav']").hide();
        }
        (function () {
            var hidSearchTypeValue = objElement.data("searchtype");//搜索选择类型
            objElement.find(":radio").each(function () {
                if (hidSearchTypeValue == $(this).val()) {
                    $(this).attr("checked", "checked");//alert(hidSearchTypeValue);
                }
            });
            var keyword = $.trim(objElement.find("[name=keyword]").val());//出现关键字
            if (keyword != "" && objElement.find(".result-op li").size() == 0) {
                objElement.find('div[name=div_noresult_tip]').show();
            }
        })();
    };
    $.fn.Search = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('searchWidgetResult')) { return element.data('searchWidgetResult'); }
            // Pass options to plugin constructor
            var searchresult = new searchWidgetResult(this, options);
            // Store plugin object in this element's data
            element.data('searchWidgetResult', searchresult);
        });
    };
})(jQuery);

(function ($) {//搜索挂件
    var searchLinkWidget = function (element, options) {
        var objElement = $(element);
        objElement.find(".s_tab :radio").bind("click", function () {//点击搜索类文字SearchResultList
            objElement.find("input[name='hidSearchType']").val($(this).val());
            //return false;
        });//点击搜索类文字
        objElement.find("input[name='searchBtn']").bind("click", function () {//点击按钮
            var keyword = $.trim(objElement.find("[name=keyword]").val());//出现关键字
            var searchType = objElement.find("input[name=hidSearchType]").val();//搜索选择类型
            var searchdetailurl = objElement.data("searchdetailurl");//搜索挂件url
            var websitehosturl = objElement.data("websitehosturl");//主机
            var keywordInput = objElement.find("[name='keyword']");//alert(keyword);
            if (keyword == "" || keyword == I18NSWYLAN.FillKeyWords) {
                keywordInput.val(I18NSWYLAN.FillKeyWords);
                keywordInput.select().focus();
                return false;
            }
            if (window.location.href.indexOf(searchdetailurl) == 0 && searchType == 'Product') {
                location.href = window.location.href + "&k=" + encodeURIComponent(keyword) + "&s=" + searchType;
            }
            else {
                location.href = websitehosturl + "/" + searchdetailurl + ".html?k=" + encodeURIComponent(keyword) + "&s=" + searchType;
            }
            //location.href=websitehosturl+"/"+searchdetailurl+".html?k="+encodeURIComponent(keyword)+"&s="+searchType;
            return false;
        });//点击按钮
        objElement.find("input[name='keyword']").bind("keydown", function (event) {//回车提交
            event = (event) ? event : ((window.event) ? window.event : "")
            var keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
            if (keyCode == 13) {
                objElement.find("input[name='searchBtn']").trigger("click");//搜索事件 
                return false;
            }
        });
        objElement.find("form").bind("submit", function () { return false; });//阻止提交
    };
    $.fn.SearchLink = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('searchLinkWidget')) { return element.data('searchLinkWidget'); }
            // Pass options to plugin constructor
            var searchlinkwidget = new searchLinkWidget(this, options);
            // Store plugin object in this element's data
            element.data('searchLinkWidget', searchlinkwidget);
        });
    };
})(jQuery);
//(function ($) {//产品搜索
//    var searchLinkWidget = function (element, options) {
//        var objElement = $(element);
//        objElement.find(".s_tab :radio").bind("click", function () {//点击搜索类文字SearchResultList
//            objElement.find("input[name='hidSearchType']").val($(this).val());
//            //return false;
//        });//点击搜索类文字
//        objElement.find("input[name='searchBtn']").bind("click", function () {//点击按钮
//            var keyword = $.trim(objElement.find("[name=keyword]").val());//出现关键字
//            var searchType = objElement.find("input[name=hidSearchType]").val();//搜索选择类型
//            var searchdetailurl = objElement.data("searchdetailurl");//搜索挂件url
//            var websitehosturl = objElement.data("websitehosturl");//主机
//            var keywordInput = objElement.find("[name='keyword']");//alert(keyword);
//            if (keyword == "" || keyword == "请填写关键字！") {
//                keywordInput.val("请填写关键字！");
//                keywordInput.select().focus();
//                return false;
//            }
//            if (window.location.href.indexOf(searchdetailurl) == 0) {
//                location.href = window.location.href +"&k=" + encodeURIComponent(keyword) + "&s=" + searchType;
//            }
//            else {
//                location.href = websitehosturl + "/" + searchdetailurl + ".html?k=" + encodeURIComponent(keyword) + "&s=" + searchType;
//            }
//            return false;
//        });//点击按钮
//        objElement.find("input[name='keyword']").bind("keydown", function (event) {//回车提交
//            event = (event) ? event : ((window.event) ? window.event : "")
//            var keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
//            if (keyCode == 13) {
//                objElement.find("input[name='searchBtn']").trigger("click");//搜索事件 
//                return false;
//            }
//        });
//        objElement.find("form").bind("submit", function () { return false; });//阻止提交
//    };

//})(jQuery);
(function ($) {//产品挂件 竖排带有编号产品列表 SortedProductList
    var sortedProductList = function (element, options) {//alert(0);
        var objElement = $(element);
        var ul_li = objElement.find(".sortlists li");
        objElement.find(".sortlists li").hover(
            function () {//over s_pd_title
                objElement.find(".details_pic").removeClass("disp_block").addClass("disp_none");
                objElement.find(".details").removeClass("disp_block").addClass("disp_none");
                objElement.find(".s_pd_title").removeClass("disp_none").addClass("disp_block");
                $(this).find(".details_pic").removeClass("disp_none").addClass("disp_block");
                $(this).find(".details").removeClass("disp_none").addClass("disp_block");
                $(this).find(".s_pd_title").removeClass("disp_block").addClass("disp_none");
            },
            function () {//out
                //$(this).removeClass("hover");
            }
        );
    };//sortedProductList
    $.fn.SortedProductList = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('sortedProductList')) { return element.data('sortedProductList'); }
            // Pass options to plugin constructor
            var sortedproductlist = new sortedProductList(this, options);
            // Store plugin object in this element's data
            element.data('sortedProductList', sortedproductlist);
        });
    };
})(jQuery);

(function ($) {//电子样本PhotoBook
    var photoBook = function (element, options) {//alert(0);
        var Beacon = {}
        var objElement = $(element);
        var page_content = new Array();//相册图片集合
        var photoes_names = new Array();//相册图片名称
        var start_page = 0;//开始页码
        var plattype = objElement.data("plattype");//所在平台
        var textnumber = objElement.data("textnumber");//最大字数（图片名称）
        var websitehosturl = objElement.data("websitehosturl");//请求服务器地址
        var book = objElement.find('.book_wrap');
        var left = objElement.find('.book_wrap .book_left');
        var right = objElement.find('.book_wrap .book_right');
        var left_w = objElement.find('.book_wrap .book_left').width();
        var left_bar = objElement.find('.book_wrap .book_arrow').eq(0);
        var right_bar = objElement.find('.book_wrap .book_arrow').eq(1);
        var flip = objElement.find('.book_wrap .book_flip');
        var photo_popup = objElement.find(".ebook-popup");
        var cancel_pop = objElement.find(".ebook-cancle");
        cancel_pop.click(function () {
            photo_popup.fadeOut(1000);
            photo_popup.css("height", "auto");
        });
        photo_popup.prependTo("body");
        objElement.find(".book_pic img").live("click", function () {
            var src_val = $(this).attr("src");
            photo_popup.find("img").attr("src", src_val);
            photo_popup.fadeIn(1000);
            if (photo_popup.height() < $(window).height()) {
                photo_popup.css("height", $(window).height());
            }
            else {
                photo_popup.css("height", $(document).height());
            }
        });
        var flip_time = 1000;
        var current = start_page ? start_page : 0;//当前页码
        var isIE = false;
        var arVersion = navigator.appVersion.split("MSIE");
        var version = parseFloat(arVersion[1]);
        if (version > 0) {
            isIE = true;
            flip_time = 800;
            flip.find('.book_overlayer img').hide();
            flip.find('.book_overlayer').addClass('book_ie_r');
        }
        objElement.find('.book_btn_fav').live('click', function (e) {
            var href = $(this).attr('href');
            var title = $(this).attr('title');
            if (document.all) {//ie
                window.external.addFavorite(href, title);
                e.preventDefault();
            } else if (window.sidebar) {//firefox
                window.sidebar.addPanel(title, href, "");
                e.preventDefault();
            } else if (window.opera && window.print) { //opera
                $(this).attr('rel', 'sidebar');
            } else if (window.chrome) {
                alert('谷歌浏览器请使用Ctrl+D收藏本页');
                e.preventDefault();
            } else {
                alert('您的浏览器不支持自动收藏功能，请手动收藏本页。');
                e.preventDefault();
            }
            return false;
        });
        page_content.push('<p> &nbsp;<br/></p>');
        photoes_names.push('电子样本');
        var classifyid = objElement.data("classifyid");//所属分类id
        var pagesize = objElement.data("pagesize");//相册图片数量
        var d = {};
        d.c = classifyid;
        d.pagesize = pagesize;
        //获得电子样本图片数量
        if (plattype == 0) {//判断是否在网站里
            $.ajax({
                url: '/EPhotoBook/PhotoBookPics',
                data: d,
                type: 'post',
                async: false,
                dataType: 'json',
                success: function (v) {
                    if (v.Code > 0) {
                        for (var i = 0; i < v.list.length; i++) {
                            page_content.push('<p class="book_pic"><img src="' + websitehosturl + v.list[i].OrginalFileURL + '" width="340px" height="538px" titile="' + v.list[i].ClassName + "_" + v.list[i].FileName + '"/><br/> </p>');
                            photoes_names.push(v.list[i].ClassName + "_" + v.list[i].FileName);
                        }//for
                    }//if
                }//success
            });
        }
        page_content.push('<p> &nbsp;<br/></p>');
        photoes_names.push('电子样本');
        var total = page_content.length;//相册图片总数
        //check pager
        left.find('.book_pager').html('<p class="book_pageindex">' + (current + 1 + 1) / 2 + ' / ' + Math.ceil(total / 2) + '</p><p class="book_pic_tip">\u5EFA\u8BAE\u4E0A\u4F20\u56FE\u7247\u5206\u8FA8\u7387\:\u5BBD\ 340px\,\u9AD8\ 538px. </p>');
        if (page_content[current + 1]) {
            right.find('.book_content').html(page_content[current + 1]).show();
        } else {
            right.find('.book_content').html('').show();
        }
        if (photoes_names[current]) {
            left.find('.book_label').find('.book_photoname').html(photoes_names[current].length > textnumber ? (photoes_names[current].substring(0, textnumber) + '...') : photoes_names[current]).attr('title', photoes_names[current]);
            left.find('.book_label').find('a').attr('title', photoes_names[current]);
        } else {
            left.find('.book_label').find('.book_photoname').html('电子样本');
            left.find('.book_label').find('a').attr('title', '电子样本');
        }
        if (photoes_names[current + 1]) {
            right.find('.book_label').find('.book_photoname').html(photoes_names[current + 1].length > textnumber ? (photoes_names[current + 1].substring(0, textnumber) + '...') : photoes_names[current + 1]).attr('title', photoes_names[current + 1]);
            right.find('.book_label').find('a').attr('title', photoes_names[current + 1]);
        } else {
            right.find('.book_label').find('.book_photoname').html('电子样本');
            right.find('.book_label').find('a').attr('title', '电子样本');
        }
        left_bar.click(function () {
            if (current - 2 >= 0) {
                Beacon.ajax_refer = current / 2 + 1; // current index
                Beacon.ajax_url = current / 2;  // target index
                Beacon.ajax_isLastPage = 0; // 0 or 1  
                current = current - 2;
                if (isIE) {
                    flip.find('.book_overlayer').removeClass('book_ie_r').addClass('book_ie_l');
                } else {
                    flip.find('img').attr('src', '/Content/app_images/flip_l.png');
                }
                flip.find('.book_container').css('background', 'url(/Content/app_images/book_r.jpg) left top no-repeat');
                flip.find('.book_label').html(right.find('.book_label').html());
                flip.find('.book_content').html(page_content[current + 1]);
                flip.find('.book_label').find('.book_photoname').html(photoes_names[current + 1].length > textnumber ? (photoes_names[current + 1].substring(0, textnumber) + '...') : photoes_names[current + 1]).attr('title', photoes_names[current + 1].substring(0, textnumber));
                flip.find('.book_label').find('a').attr('title', photoes_names[current + 1]);
                flip.find('.book_pager').html('');
                left.find('.book_pager').html('');

                if (isIE) {
                    left.find('.book_content').hide();
                    window.setTimeout(function () {
                        if (page_content[current]) {
                            left.find('.book_content').html(page_content[current]).show();
                        } else {
                            left.find('.book_content').html('').show();
                        }
                        if (photoes_names[current]) {
                            left.find('.book_label').find('.book_photoname').html(photoes_names[current].length > textnumber ? (photoes_names[current].substring(0, textnumber) + '...') : photoes_names[current]).attr('title', photoes_names[current]);
                            left.find('.book_label').find('a').attr('title', photoes_names[current]);
                        } else {
                            left.find('.book_label').find('.book_photoname').html('电子样本');
                            left.find('.book_label').find('a').attr('title', '电子样本');
                        }
                        if (photoes_names[current + 1]) {
                            right.find('.book_label').find('.book_photoname').html(photoes_names[current + 1].length > textnumber ? (photoes_names[current + 1].substring(0, textnumber) + '...') : photoes_names[current + 1]).attr('title', photoes_names[current + 1]);
                            right.find('.book_label').find('a').attr('title', photoes_names[current + 1]);
                        } else {
                            right.find('.book_label').find('.book_photoname').html('电子样本');
                            right.find('.book_label').find('a').attr('title', '电子样本');
                        }
                    }, flip_time / 4);
                } else {
                    window.setTimeout(function () {
                        if (page_content[current]) {
                            left.find('.book_content').hide().html(page_content[current]).css({ opacity: 1, display: 'block' }).animate({ opacity: 1 }, (flip_time - (flip_time / 4)));
                        } else {
                            left.find('.book_content').html('');
                        }
                        if (photoes_names[current]) {
                            left.find('.book_label').find('.book_photoname').html(photoes_names[current].length > textnumber ? (photoes_names[current].substring(0, textnumber) + '...') : photoes_names[current]).attr('title', photoes_names[current]);
                            left.find('.book_label').find('a').attr('title', photoes_names[current]);
                        } else {
                            left.find('.book_label').find('.book_photoname').html('电子样本');
                            left.find('.book_label').find('a').attr('title', '电子样本');
                        }
                        if (photoes_names[current + 1]) {
                            right.find('.book_label').find('.book_photoname').html(photoes_names[current + 1].length > textnumber ? (photoes_names[current + 1].substring(0, textnumber) + '...') : photoes_names[current + 1]).attr('title', photoes_names[current + 1]);
                            right.find('.book_label').find('a').attr('title', photoes_names[current + 1]);
                        } else {
                            right.find('.book_label').find('.book_photoname').html('电子样本').attr('title', '电子样本');
                            right.find('.book_label').find('a').attr('title', '电子样本');
                        }
                    }, flip_time / 4);
                }

                flip.find('.book_container').stop().css({
                    'margin-left': -526
                }).animate({
                    'margin-left': 0
                }, flip_time, 'linear');

                flip.find('.book_overlayer').stop().css({
                    'width': 100,
                    'margin-left': -26
                }).animate({
                    'width': 652,
                    'margin-left': -195
                }, flip_time, 'linear');

                flip.stop().css({
                    'left': 15,
                    'display': 'block'
                }).animate({
                    'left': 490
                }, flip_time, 'linear', function () {
                    right.find('.book_content').html(flip.find('.book_content').html());
                    left.find('.book_pager').html('<p class="book_pageindex">' + (current + 1 + 1) / 2 + ' / ' + Math.ceil(total / 2) + '</p><p class="book_pic_tip">\u5EFA\u8BAE\u4E0A\u4F20\u56FE\u7247\u5206\u8FA8\u7387\:\u5BBD\ 340px\,\u9AD8\ 538px. </p>');
                    boo_slider.slider("value", (current + 1) * step);
                    $(this).hide(0);
                });
            }
        });

        right_bar.click(function () {
            if (current + 2 <= total - 1) {
                Beacon.ajax_refer = current / 2 + 1; // current index
                Beacon.ajax_url = current / 2 + 2;  // target index
                Beacon.ajax_isLastPage = 0; // 0 or 1 

                current = current + 2;
                if (isIE) {
                    flip.find('.book_overlayer').removeClass('book_ie_l').addClass('book_ie_r');
                } else {
                    flip.find('img').attr('src', '/Content/app_images/flip_r.png');
                }
                flip.find('.book_container').css('background', 'url(/Content/app_images/book_l.jpg) left top no-repeat');
                flip.find('.book_label').html('');
                flip.find('.book_content').html(page_content[current]);
                flip.find('.book_label').find('.book_photoname').html(photoes_names[current]).attr('title', photoes_names[current].substring(0, textnumber));
                flip.find('.book_label').find('a').attr('title', photoes_names[current]);
                flip.find('.book_pager').html('<p class="book_pageindex">' + (current + 1 + 1) / 2 + ' / ' + Math.ceil(total / 2) + '</p><p class="book_pic_tip">\u5EFA\u8BAE\u4E0A\u4F20\u56FE\u7247\u5206\u8FA8\u7387\:\u5BBD\ 340px\,\u9AD8\ 538px. </p>');
                flip.find('.book_overlayer').css({ 'width': '100%', 'margin-left': 0 });

                if (isIE) {
                    right.find('.book_content').hide();
                    window.setTimeout(function () {
                        if (page_content[current + 1]) {
                            right.find('.book_content').html(page_content[current + 1]).show();
                        } else {
                            right.find('.book_content').html('').show();
                        }
                        if (photoes_names[current + 1]) {
                            right.find('.book_label').find('.book_photoname').html(photoes_names[current + 1].length > textnumber ? (photoes_names[current + 1].substring(0, textnumber) + '...') : photoes_names[current + 1]).attr('title', photoes_names[current + 1]);
                            right.find('.book_label').find('a').attr('title', photoes_names[current + 1]);
                        } else {
                            right.find('.book_label').find('.book_photoname').html('电子样本');
                        }
                        if (photoes_names[current]) {
                            left.find('.book_label').find('.book_photoname').html(photoes_names[current].length > textnumber ? (photoes_names[current].substring(0, textnumber) + '...') : photoes_names[current]).attr('title', photoes_names[current]);
                            left.find('.book_label').find('a').attr('title', photoes_names[current]);
                        } else {
                            left.find('.book_label').find('.book_photoname').html('电子样本');
                            left.find('.book_label').find('a').attr('title', '电子样本');
                        }
                    }, flip_time / 4);
                } else {
                    window.setTimeout(function () {
                        if (page_content[current + 1]) {
                            right.find('.book_content').hide().html(page_content[current + 1]).css({ opacity: 0.5, display: 'block' }).animate({ opacity: 1 }, (flip_time - (flip_time / 4))).attr('title', photoes_names[current + 1]);
                            right.find('.book_label').find('a').attr('title', photoes_names[current + 1]);
                        } else {
                            right.find('.book_content').html('');
                        }
                        if (photoes_names[current + 1]) {
                            right.find('.book_label').find('.book_photoname').html(photoes_names[current + 1].length > textnumber ? (photoes_names[current + 1].substring(0, textnumber) + '...') : photoes_names[current + 1]).attr('title', photoes_names[current + 1]);
                            right.find('.book_label').find('a').attr('title', photoes_names[current + 1]);
                        } else {
                            right.find('.book_label').find('.book_photoname').html('电子样本');
                        }
                        if (photoes_names[current]) {
                            left.find('.book_label').find('.book_photoname').html(photoes_names[current].length > textnumber ? (photoes_names[current].substring(0, textnumber) + '...') : photoes_names[current]).attr('title', photoes_names[current]);
                            left.find('.book_label').find('a').attr('title', photoes_names[current]);
                        } else {
                            left.find('.book_label').find('.book_photoname').html('电子样本');
                            left.find('.book_label').find('a').attr('title', '电子样本');
                        }
                    }, flip_time / 4);
                }

                flip.stop().css({
                    'left': 850,
                    'width': 100,
                    'display': 'block'
                }).animate({
                    'left': 15,
                    'width': 652
                }, flip_time, 'linear', function () {
                    left.find('.book_content').html(flip.find('.book_content').html());
                    left.find('.book_pager').html('<p class="book_pageindex">' + (current + 1 + 1) / 2 + ' / ' + Math.ceil(total / 2) + '</p><p class="book_pic_tip">\u5EFA\u8BAE\u4E0A\u4F20\u56FE\u7247\u5206\u8FA8\u7387\:\u5BBD\ 340px\,\u9AD8\ 538px. </p>');
                    //'<p class="album_book_pageindex">' + (current + 1 + 1) / 2 + ' / ' + Math.ceil(total / 2) + '</p><p class="book_pic_tip">建议上传图片分辨率(宽×高)： 340px×538px.</p>' 
                    boo_slider.slider("value", (current + 1) * step);
                    $(this).hide(0);
                });
            }
        });

        var left_bar_w = left_bar.width();
        book.hover(function (e) {
            left_bar.find('.book_mask').stop().animate({ opacity: 0.1 }, 200, 'linear').next().show();
            right_bar.find('.book_mask').stop().animate({ opacity: 0.1 }, 200, 'linear').next().show();
        }, function (e) {
            left_bar.find('.book_mask').animate({ opacity: 0 }, 500, 'linear', function () { $(this).next().hide(); });
            right_bar.find('.book_mask').animate({ opacity: 0 }, 500, 'linear', function () { $(this).next().hide(); });
        });

        //glide
        var step = parseInt($('.book_glide').width() / (Math.ceil(total / 2) * 2 - 1));
        var boo_slider = objElement.find('.book_glide').slider({
            min: step,
            max: objElement.find('.book_glide').width(),
            step: step * 2,
            slide: function (event, ui) {
                objElement.find('.book_glide a').attr('title', (ui.value / step + 1) / 2 + '/' + Math.ceil(total / 2));
                if (ui.value / step > current) {
                    current = ui.value / step - 2 - 1;
                    right_bar.click();
                } else if (ui.value / step < current) {
                    current = ui.value / step + 2 - 1;
                    left_bar.click();
                }
            }
        });//slider end
        objElement.find('.book_glide a').attr('title', 1 + '/' + Math.ceil(total / 2)).attr('hidefocus', 'true').css('outline', '0').focus(function () { $(this).blur(); });

        //review
        (function () {
            var spacing = 166;
            var container = $('.book_review ul');
            var left = $('.book_review .book_ab_l');
            var right = $('.book_review .book_ab_r');
            var on_class = 'on';

            function checkStatus() {
                if (parseInt(container.css('left')) < 0) {
                    left.unbind('click').one('click', leftClick).addClass(on_class);
                } else {
                    left.removeClass(on_class);
                }
                if (parseInt(container.css('left')) > -(parseInt(container.css('width')) - (spacing * 5))) {
                    right.unbind('click').one('click', rightClick).addClass(on_class);
                } else {
                    right.removeClass(on_class);
                }
            }

            function leftClick(e) {
                e.preventDefault();
                if (parseInt(container.css('left')) < 14) {
                    container.animate({
                        left: '+=' + (spacing * 5)
                    }, 800, function () {
                        checkStatus();
                    });
                }
            }

            function rightClick(e) {
                e.preventDefault();
                if (parseInt(container.css('left')) > -(parseInt(container.css('width')) - (spacing * 5)) + 14) {
                    container.animate({
                        left: '-=' + (spacing * 5)
                    }, 800, function () {
                        checkStatus();
                    });
                }
            }
            container.css('width', spacing * container.children().length);
            checkStatus();
        })();
    };//photoBook end

    $.fn.PhotoBook = function (options) {
        return this.each(function (key, value) {//alert(0);
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('PhotoBook')) { return element.data('PhotoBook'); }
            // Pass options to plugin constructor
            var photobook = new photoBook(this, options);
            // Store plugin object in this element's data
            element.data('PhotoBook', photobook);
        });
    };
})(jQuery); //PhotoBook end

(function ($) {//浏览产品发送产品链接短信 
    var productSlider = function (element, options) {
        var objElement = $(element);
        var txtMobileNumber = objElement.find("input[name=txtMobileNumber]");
        txtMobileNumber.click(function () {
            $(this).val("").select(); return false;
        });
        txtMobileNumber.blur(function () {
            var mobileNumber = $.trim(txtMobileNumber.val());//手机号
            if (mobileNumber == "") {//不可为空
                txtMobileNumber.val("请填写正确格式手机号码"); return false;
            }
            if (mobileNumber == "请填写正确格式手机号码") {
                return false;
            }
            var mobilePatten = /^\d{7,11}$/;
            if (!mobilePatten.test(mobileNumber)) {
                txtMobileNumber.val("请填写正确格式手机号码"); return false;
            }
        });
        objElement.find("input[name=btnSend]").click(function () {
            var mobileNumber = $.trim(txtMobileNumber.val());//手机号
            if (mobileNumber == "") {//不可为空
                txtMobileNumber.val("请填写正确格式手机号码").focus().select(); return false;
            }
            if (mobileNumber == "请填写正确格式手机号码") {
                txtMobileNumber.focus().select(); return false;
            }
            var mobilePatten = /^\d{7,11}$/;
            if (!mobilePatten.test(mobileNumber)) {
                txtMobileNumber.val("请填写正确格式手机号码").focus().select(); return false;
            }
            var prod_message_tip = objElement.find(".prod_message").find(".msg_tip");
            var d = {};
            d.mobile = mobileNumber;
            d.location = location.href;
            $.ajax({
                url: '/Product/SendShortMessage',
                data: d,
                type: 'post',
                async: false,
                dataType: 'json',
                success: function (v) {
                    if (v.Code > 0) {
                        if (prod_message_tip.size() > 0) {
                            prod_message_tip.html("发送成功！");
                        }
                    }//if
                    else {
                        if (prod_message_tip.size() > 0) {
                            prod_message_tip.html("发送失败！");
                        }
                    }
                }//success
            });//ajax
        });//btnSend click end
    }; //var productSlider  end 
    $.fn.ProductSlider = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('ProductSlider')) { return element.data('ProductSlider'); }
            // Pass options to plugin constructor
            var productslider = new productSlider(this, options);
            // Store plugin object in this element's data
            element.data('ProductSlider', productslider);
        });
    };// $.fn.ProductSlider end
})(jQuery);

(function ($) {//文字滚动插件
    var scrollText = function (element, options) {
        var settings = $.extend({}, $.fn.ScrollText.defaults, options);
        var _delay = settings.delay;
        var _speed = settings.speed;
        var _dir = settings.direction;
        var _autoScroll;
        var _stop = false;
        var scroll_lists = $(element).find(".lists");
        if (scroll_lists.find("li").size() == 1) {
            return;
        }
        var scoll_height = scroll_lists.find("li").height();
        var scroll_up = function () {//向上滚动
            scroll_lists.animate({ "marginTop": -scoll_height }, _speed, function () {
                scroll_lists.find("li:eq(0)").appendTo(scroll_lists);
                scroll_lists.css("marginTop", 0);
                if (_stop) {
                    clearTimeout(_autoScroll);
                    return;
                }
                _autoScroll = setTimeout(scrollAni, _delay);
            });

        }
        var scroll_down = function () {//向下滚动
            scroll_lists.find("li:last").prependTo(scroll_lists);
            scroll_lists.css("marginTop", -scoll_height);
            scroll_lists.animate({ "marginTop": 0 }, _speed, function () {
                if (_stop) {
                    clearTimeout(_autoScroll);
                    return;
                }
                _autoScroll = setTimeout(scrollAni, _delay);
            });
        }
        var scrollAni = (function () {
            if (_dir == "up") {
                return scroll_up;
            }
            if (_dir == "down") {
                return scroll_down;
            }
        })();

        scrollAni();
        scroll_lists.hover(function () {
            _stop = true;
        }, function () {
            _stop = false;
            scrollAni();
        });
    };

    $.fn.ScrollText = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('ScrollText')) { return element.data('ScrollText'); }
            // Pass options to plugin constructor
            var scrolltext = new scrollText(this, options);
            // Store plugin object in this element's data
            element.data('ScrollText', scrolltext);
        });
    };

    //Default settings
    $.fn.ScrollText.defaults = {
        speed: 1000,
        delay: 5000,
        direction: "up"
    };

})(jQuery);

(function ($) {//图片marquee效果
    var imagesMarquee = function (element, options) {
        var settings = $.extend({}, $.fn.ImagesMarquee.defaults, options);
        var _target = $(element);

        if (settings.ifscroll == 0) {
            $LAB.script("/Scripts/plugin/jquery.jqzoom.js?version=" + window.VERSION).wait(function () {
                $(function () {
                    $(element).find(".jqzoom").each(function () {
                        var databind = $(this).data("binded");
                        if (!databind) {
                            $(this).data("binded", "binded");
                            $(this).jqueryzoom({
                                xzoom: 200,
                                yzoom: 200,
                                offset: 10,
                                position: "right",
                                preload: 1
                            });
                        }
                    });
                });
            });
            return;
        }
        if (settings.ifshowzoom == 1) {
            $LAB.script("/Scripts/plugin/jquery.jqzoom.js?version=" + window.VERSION).wait(function () {
                $(function () {
                    $(element).find(".jqzoom").each(function () {
                        var databind = $(this).data("binded");
                        if (!databind) {
                            $(this).data("binded", "binded");
                            $(this).jqueryzoom({
                                xzoom: 200,
                                yzoom: 200,
                                offset: 10,
                                position: "right",
                                preload: 1
                            });
                        }
                    });
                });
            });
        }
        if (settings.effectType == 0) {
            var _movegap = settings.movegap;
            var _speed = settings.speed;
            var _dir = settings.direction;
            var _autoScroll;
            var _scrollLeft = 0;
            var _scrollTop = 0;
            var scroll_lists = $(element).find("ul");
            var scroll_cell = scroll_lists.find("li:eq(0)");
            var cell_size = scroll_lists.find("li").size();
            var scolllist_pdleft = parseInt(scroll_lists.css("paddingLeft"));
            var scolllist_pdtop = parseInt(scroll_lists.css("paddingTop"));
            if (_dir == "left" || _dir == "right") {//左右滚动的加上float：left
                scroll_lists.find("li").css({ display: "inline", float: "left" });
            }
            $(element).find('.prev_btn').click(function (event) {//左滚箭头
                scrollAni = scroll_left;
            });
            $(element).find('.next_btn').click(function (event) {//右滚箭头
                scrollAni = scroll_right;
            });
            var scroll_left = function () {//向左滚动
                var scroll_gap = parseInt(scroll_cell.width()) + parseInt(scroll_cell.css("paddingLeft")) + parseInt(scroll_cell.css("paddingRight")) + parseInt(scroll_cell.css("marginLeft")) + parseInt(scroll_cell.css("marginRight"));
                scroll_lists.css({ width: scroll_gap * (cell_size + 1) });
                _scrollLeft = _scrollLeft - _movegap;
                if (_scrollLeft <= (-scroll_gap - scolllist_pdleft)) {
                    scroll_lists.find("li:eq(0)").appendTo(scroll_lists);
                    _scrollLeft = _scrollLeft + scroll_gap;
                    scroll_lists.css("marginLeft", _scrollLeft);
                    return;
                }
                scroll_lists.css("marginLeft", _scrollLeft);
            }
            var scroll_right = function () {//向右滚动
                var scroll_gap = parseInt(scroll_cell.width()) + parseInt(scroll_cell.css("paddingLeft")) + parseInt(scroll_cell.css("paddingRight")) + parseInt(scroll_cell.css("marginLeft")) + parseInt(scroll_cell.css("marginRight"));
                scroll_lists.css({ width: scroll_gap * (cell_size + 1) });
                if (_scrollLeft >= 0) {
                    _scrollLeft = -scroll_gap + _scrollLeft;
                    scroll_lists.css("marginLeft", _scrollLeft);
                    scroll_lists.find("li:last").prependTo(scroll_lists);
                    return;
                }
                _scrollLeft += _movegap;
                scroll_lists.css("marginLeft", _scrollLeft);
            }
            var scroll_up = function () {//向上滚动
                var scroll_vgap = parseInt(scroll_cell.height()) + parseInt(scroll_cell.css("paddingTop")) + parseInt(scroll_cell.css("paddingBottom")) + parseInt(scroll_cell.css("marginTop")) + parseInt(scroll_cell.css("marginBottom"));
                scroll_lists.css({ height: scroll_vgap * (cell_size + 1) });
                _scrollTop = _scrollTop - _movegap;
                if (_scrollTop <= (-scroll_vgap - scolllist_pdtop)) {
                    scroll_lists.find("li:eq(0)").appendTo(scroll_lists);
                    _scrollTop = _scrollTop + scroll_vgap;
                    scroll_lists.css("marginTop", _scrollTop);
                    return;
                }
                scroll_lists.css("marginTop", _scrollTop);
            }
            var scroll_down = function () {//向下滚动
                var scroll_vgap = parseInt(scroll_cell.height()) + parseInt(scroll_cell.css("paddingTop")) + parseInt(scroll_cell.css("paddingBottom")) + parseInt(scroll_cell.css("marginTop")) + parseInt(scroll_cell.css("marginBottom"));
                scroll_lists.css({ height: scroll_vgap * (cell_size + 1) });
                if (_scrollTop >= 0) {
                    scroll_lists.find("li:last").prependTo(scroll_lists);
                    _scrollTop = _scrollTop - scroll_vgap;
                    scroll_lists.css("marginTop", _scrollTop);
                    return;
                }
                _scrollTop += _movegap;
                scroll_lists.css("marginTop", _scrollTop);
            }
            var scrollAni = (function () {
                if (_dir == "left") {
                    return scroll_left;
                }
                if (_dir == "right") {
                    return scroll_right;
                }
                if (_dir == "up") {
                    return scroll_up;
                }
                if (_dir == "down") {
                    return scroll_down;
                }
            })();


            var mouseTime = "";//延迟滚动
            var auto_scroll = function () {
                scrollAni();
                _autoScroll = setTimeout(auto_scroll, _speed);
            }
            auto_scroll();

            scroll_lists.mouseover(function () {
                clearTimeout(mouseTime);
                clearTimeout(_autoScroll);
            });

            scroll_lists.mouseleave(function () {
                clearTimeout(_autoScroll);
                clearTimeout(mouseTime);
                mouseTime = setTimeout(auto_scroll, 300)
            });
        } else if (settings.effectType == 1) {
            // 设置和获取一些必要的值
            var timer = null;
            var num = 0;
            var myDirection = '';
            var oneWidth = _target.find('.Marquee_li').eq(0).outerWidth(true);
            var oneHeight = _target.find('.Marquee_li').eq(0).outerHeight(true);

            _target.find('.Marquee_li').css({ display: "inline", float: "left" });

            // 将ul的内容加倍
            var _imgIntervalSlideLists = _target.find('.Marquee_lists');
            var _marqueeBoxWidth = _target.find('.Marquee_box').width();
            var imgIntervalSlideLists = _imgIntervalSlideLists.html();
            _imgIntervalSlideLists.html(imgIntervalSlideLists + imgIntervalSlideLists);

            if (settings.direction == "up") {
                myDirection = 'up';
            }
            if (settings.direction == "down") {
                myDirection = 'down';
            }
            if (settings.direction == "left") {
                myDirection = 'left';
            }
            if (settings.direction == "right") {
                myDirection = 'right';
            }

            function totalScroll() {
                // 向上运动
                if (myDirection == 'up') {
                    timer = setInterval(function () {
                        imgScrollUp();
                    }, settings.spaceTime);

                    function imgScrollUp() {
                        if (parseInt(_imgIntervalSlideLists.css('margin-top')) <= -_imgIntervalSlideLists.height() / 2) {
                            _imgIntervalSlideLists.css('margin-top', 0);
                            num = 0;
                        }
                        num++;
                        _imgIntervalSlideLists.animate({ 'margin-top': -oneHeight * num }, settings.scrollTime);
                    }

                    _imgIntervalSlideLists.on('mouseover', function () {
                        clearInterval(timer);
                    });

                    _imgIntervalSlideLists.on('mouseout', function () {
                        timer = setInterval(function () {
                            imgScrollUp();
                        }, settings.spaceTime);
                    });
                }

                // 向下运动
                if (myDirection == 'down') {
                    timer = setInterval(function () {
                        imgScrollDown();
                    }, settings.spaceTime);

                    function imgScrollDown() {
                        if (parseInt(_imgIntervalSlideLists.css('margin-top')) >= 0) {
                            _imgIntervalSlideLists.css('margin-top', -_imgIntervalSlideLists.height() / 2);
                        }
                        _imgIntervalSlideLists.animate({ 'margin-top': parseInt(_imgIntervalSlideLists.css('margin-top')) + oneHeight }, settings.scrollTime);
                    }

                    _imgIntervalSlideLists.on('mouseover', function () {
                        clearInterval(timer);
                    });

                    _imgIntervalSlideLists.on('mouseout', function () {
                        timer = setInterval(function () {
                            imgScrollDown();
                        }, settings.spaceTime);
                    });
                }

                // 向左运动
                if (myDirection == 'left') {
                    _imgIntervalSlideLists.css('width', oneWidth * _imgIntervalSlideLists.find('.Marquee_li').length);

                    timer = setInterval(function () {
                        imgScrollLeft();
                    }, settings.spaceTime);

                    function imgScrollLeft() {
                        if (parseInt(_imgIntervalSlideLists.css('margin-left')) <= -_imgIntervalSlideLists.width() / 2) {
                            _imgIntervalSlideLists.css('margin-left', 0);
                            num = 0;
                        }
                        num++;
                        _imgIntervalSlideLists.animate({ 'margin-left': -_marqueeBoxWidth * num }, settings.scrollTime);
                    }

                    _imgIntervalSlideLists.on('mouseover', function () {
                        clearInterval(timer);
                    });

                    _imgIntervalSlideLists.on('mouseout', function () {
                        timer = setInterval(function () {
                            imgScrollLeft();
                        }, settings.spaceTime);
                    });
                }

                // 向右运动
                if (myDirection == 'right') {
                    _imgIntervalSlideLists.css('width', oneWidth * _imgIntervalSlideLists.find('.Marquee_li').length);

                    timer = setInterval(function () {
                        imgScrollRight();
                    }, settings.spaceTime);

                    function imgScrollRight() {
                        if (parseInt(_imgIntervalSlideLists.css('margin-left')) >= 0) {
                            _imgIntervalSlideLists.css('margin-left', -_imgIntervalSlideLists.width() / 2);
                        }
                        _imgIntervalSlideLists.animate({ 'margin-left': parseInt(_imgIntervalSlideLists.css('margin-left')) + _marqueeBoxWidth }, settings.scrollTime);
                    }

                    _imgIntervalSlideLists.on('mouseover', function () {
                        clearInterval(timer);
                    });

                    _imgIntervalSlideLists.on('mouseout', function () {
                        timer = setInterval(function () {
                            imgScrollRight();
                        }, settings.spaceTime);
                    });
                }
            }

            totalScroll();

            // 点击左边按钮
            _target.find('.prev_btn').click(function () {
                clearInterval(timer);
                myDirection = 'left';
                _imgIntervalSlideLists.off('mouseover');
                _imgIntervalSlideLists.off('mouseout');
                totalScroll();
            });

            // 点击右边按钮
            _target.find('.next_btn').click(function () {
                clearInterval(timer);
                myDirection = 'right';
                _imgIntervalSlideLists.off('mouseover');
                _imgIntervalSlideLists.off('mouseout');
                totalScroll();
            });
        }
    };

    $.fn.ImagesMarquee = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('ImagesMarquee')) { return element.data('ImagesMarquee'); }
            // Pass options to plugin constructor
            var imagesmarquee = new imagesMarquee(this, options);
            // Store plugin object in this element's data
            element.data('ImagesMarquee', imagesmarquee);
        });
    };

    //Default settings
    $.fn.ImagesMarquee.defaults = {
        effectType: 0,
        movegap: 5,
        speed: 16,
        direction: "right",
        ifscroll: 1,
        spaceTime: 3000,
        scrollTime: 500
    };

})(jQuery);

(function ($) {//tab切换效果
    var tabSwitch = function (element, options) {
        var settings = $.extend({}, $.fn.TabSwitch.defaults, options);
        var _effect = settings.effect;
        var _trigger = settings.trigger;
        var _target = $(element);
        var morelink = _target.find(".news_tab_Much a");
        morelink.attr("href", _target.find(".tabs-switch_active a").attr("href"));
        var _tabBx = _target.find(".tabs-switch_lists");
        _tabBx.find("a").each(function (index) {//绑定切换事件
            $(this).bind(_trigger, function (event) {
                event.preventDefault();
                _tabBx.find(".tabs-switch_btn").removeClass("tabs-switch_active");
                $(this).parent().addClass("tabs-switch_active");
                morelink.attr("href", $(this).attr("href"));
                _target.find(".tabs-switch_cell").hide();
                _target.find(".tabs-switch_cell:eq(" + index + ")").show();
            });
        });

    };

    $.fn.TabSwitch = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('TabSwitch')) { return element.data('TabSwitch'); }
            // Pass options to plugin constructor
            var tabswitch = new tabSwitch(this, options);
            // Store plugin object in this element's data
            element.data('TabSwitch', tabswitch);
        });
    };

    //Default settings
    $.fn.TabSwitch.defaults = {
        trigger: "click"
    };

})(jQuery);

(function ($) { //产品图片缓加载开始
    var productPicLazyLoad = function (element, options) {
        options = $.extend({}, $.fn.ProductPicLazyLoad.defaults, options);
        var objElement = $(element);
        objElement.find("img").lazyload({ event: "sporty", effect: "fadeIn" });
        $(window).bind("scroll", function () {
            var timeout = setTimeout(function () { objElement.find("img").trigger("sporty") }, 1000);
        });
        if (options.initial) {
            if (options.defalutType == 1) {
                $LAB.script("/Scripts/plugin/jquery.jqzoom.js?version=" + window.VERSION).wait(function () {
                    $(function () {
                        $(".jqzoom").each(function () {
                            var databind = $(this).data("binded");
                            if (!databind) {
                                $(this).data("binded", "binded");
                                $(this).jqueryzoom({
                                    xzoom: 200,
                                    yzoom: 200,
                                    offset: 10,
                                    position: "right",
                                    preload: 1
                                });
                            }
                        });
                    });
                });
            }
            else if (options.defalutType == 2) {
                $LAB.script("/Scripts/plugin/ProductInitzoom.js?version=" + window.VERSION).wait(function () {
                    objElement.productListPicZoom(options);
                });
            }
        }
    };//var productPicLazyLoad end
    $.fn.ProductPicLazyLoad = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('ProductPicLazyLoad')) { return element.data('ProductPicLazyLoad'); }
            // Pass options to plugin constructor
            var productpiclazyload = new productPicLazyLoad(this, options);
            // Store plugin object in this element's data
            element.data('ProductPicLazyLoad', productpiclazyload);
        });
    }; //$.fn.ProductPicLazyLoad end
    //default option
    $.fn.ProductPicLazyLoad.defaults = {
        initial: false
    };
})(jQuery);//产品图片缓加载结束

(function ($) { //网页回呼 
    var webMobileCall = function (element, options) {
        var objElement = $(element);
        var webcallouter = objElement.find("div.webcall-outer");//回呼窗口外包div
        if (objElement.data("showcallwin") == "1") {
            webcallouter.fadeOut();
        }
        objElement.find("a.trigger-btn").click(function () {//打开回呼窗口
            webcallouter.fadeIn();
        });
        objElement.find(".close a").click(function () {//关闭回呼窗口
            webcallouter.fadeOut(); return false;
        });
        objElement.find("input[name=txtValidateCode]").focus(function () {//填写验证码 
            if ($.trim($(this).val()) == "请输入验证码") {
                $(this).val("");
            }
        }).blur(function () {
            if ($.trim($(this).val()) == "") {
                $(this).val("请输入验证码");
            }
        }).bind("keydown", function (event) {//回车提交
            event = (event) ? event : ((window.event) ? window.event : "")
            var keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
            if (keyCode == 13) {
                objElement.find("a.ac_submit").trigger("click");//搜索事件 
                return false;
            }
        });
        objElement.find("input[name=DialogText]").focus(function () {//填写电话号码 
            if ($.trim($(this).val()) == "请输入您用于接听的电话号码") {
                $(this).val("");
            }
        }).blur(function () {
            if ($.trim($(this).val()) == "") {
                $(this).val("请输入您用于接听的电话号码");
            } else if ($.trim($(this).val()) != "请输入您用于接听的电话号码") {
                var mobile = /^\d{7,11}$/;
                if (!mobile.test($.trim($(this).val()))) {
                    objElement.find("p.error").html("电话号码格式不正确");
                }
            }
        }).bind("keydown", function (event) {//回车提交
            event = (event) ? event : ((window.event) ? window.event : "")
            var keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
            if (keyCode == 13) {
                objElement.find("a.ac_submit").trigger("click");//搜索事件 
                return false;
            }
        });
        objElement.find("a.ac_submit").click(function () {//提交网页回呼 
            objElement.find("p.error").html("");
            var webcalldataid = objElement.data("webcalldataid");//400号码数据库数据id
            if (webcalldataid == "") {
                objElement.find("p.error").html("未启用公司400号码！"); return false;
            }
            objElement.find("p.error").html("&nbsp;&nbsp;");
            var clientPhone = objElement.find("input[name=DialogText]").val();//客户电话
            if ($.trim(clientPhone) == "请输入您用于接听的电话号码" || $.trim(clientPhone) == "") {
                objElement.find("input[name=DialogText]").focus(); return false;
            } else {
                var mobile = /^\d{7,11}$/;
                if (!mobile.test($.trim(clientPhone))) {
                    objElement.find("p.error").html("电话号码格式不正确"); objElement.find("input[name=DialogText]").focus(); return false;
                }
            }
            var checkResult = CheckValidateCode(objElement);//检验验证码
            if (!checkResult) {//验证不通过
                return false;
            }
            var mobileAreaMsg = MobileArea("", clientPhone);//归属地详细信息
            if (mobileAreaMsg != "") {
                mobileAreaMsg = "<span>&nbsp;&nbsp;欢迎来自" + mobileAreaMsg + "的客户</span>";
            } else {
                mobileAreaMsg = "&nbsp;&nbsp;";
            }
            objElement.find("p.error").html(mobileAreaMsg + '&nbsp;&nbsp;&nbsp;&nbsp;正在连接&nbsp;<img src="/content/app_images/mobilecall-ajax.gif">');
            var loginMsgJson = WebCallLogin(webcalldataid);//400功能登陆
            if (loginMsgJson.code > 0) {//400号登陆成功
                objElement.find("p.error").html(mobileAreaMsg + "&nbsp;&nbsp;&nbsp;&nbsp;连接成功！");
                var webCallMsg = WebCallBack(webcalldataid, clientPhone, loginMsgJson.webcallkey);
                if (webCallMsg.code > 0) {
                    objElement.find("p.error").html(mobileAreaMsg + "&nbsp;&nbsp;&nbsp;&nbsp;已经接通，请注意接听。");

                    WebCallPotenCustomerAdd($.trim(clientPhone));//添加潜在客户
                } else {
                    objElement.find("p.error").html("&nbsp;&nbsp;" + webCallMsg.resultmsg);
                }
            } else {//接听失败
                objElement.find("p.error").html("&nbsp;&nbsp;" + loginMsgJson.loginmsg);
            }
            setTimeout(function () { objElement.find("p.error").html("&nbsp;&nbsp;"); }, 30000);
            return false;
        });//btnSubmitWebCall click
    };//var webMobileCall end
    //400号码登录，登录后才可以呼叫 ,webcalldataid——400号码数据库数据id
    function WebCallLogin(webcalldataid) {
        var loginMsgJson = { code: 0, loginmsg: "", webcallkey: "" };//登陆返回结果
        var webCallKey = "";//网页回呼功能所需要的key，从登陆出获取
        var d = {};
        d.webcalldataid = webcalldataid;
        $.ajax({
            url: '/WebCall/WebCallLogin',
            type: 'post',
            data: d,
            async: false,
            dataType: 'json',
            success: function (v) {
                if (v != null) {//函数调用失败
                    loginMsgJson.code = v.code;
                    loginMsgJson.loginmsg = v.loginmsg;
                    loginMsgJson.webcallkey = v.webcallkey;
                }
            }//success
        });//ajax
        return loginMsgJson;
    }//WebCallLogin end
    //获取号码归属地 webCallKey——网页回呼功能所需要的key，从登陆出获取，clientPhone——客户电话
    function MobileArea(webCallKey, clientPhone) {
        var mobileAreaMsg = "";//归属地详细信息
        var d = {};
        d.webCallKey = webCallKey;
        d.clientPhone = clientPhone;
        $.ajax({
            url: '/WebCall/MobileArea',
            type: 'post',
            data: d,
            async: false,
            dataType: 'json',
            success: function (v) {
                if (v != null) {//函数调用失败
                    if (v.code > 0) {//获取号码归属地成功
                        mobileAreaMsg = v.mobileareamsg;
                    }
                }
            }//success
        });//ajax
        return mobileAreaMsg;
    }//MobileArea end
    //网页回呼
    function WebCallBack(webcalldataid, clientPhone, webCallKey) {
        var webCallMsg = { code: 0, resultmsg: "" };//归属地详细信息
        var d = {};
        d.webcalldataid = webcalldataid;
        d.webCallKey = webCallKey;
        d.clientPhone = clientPhone;
        $.ajax({
            url: '/WebCall/WebCallBack',
            type: 'post',
            data: d,
            async: false,
            dataType: 'json',
            success: function (v) {
                if (v != null) {//函数调用失败
                    webCallMsg.code = v.code;
                    webCallMsg.resultmsg = v.resultmsg;
                }
            }//success
        });//ajax
        return webCallMsg;
    }
    //验证验证码
    function CheckValidateCode(objElement) {//objElement -- 挂件最外层div
        var ValidateCode = objElement.find("input[name=txtValidateCode]").val();
        if ($.trim(ValidateCode) == "请输入验证码" || $.trim(ValidateCode) == "") {
            objElement.find("input[name=txtValidateCode]").focus(); return false;
        }
        var sessionVCode;
        $.ajax({
            url: '/WebCall/CheckValidateCode',
            type: 'post',
            async: false,
            dataType: 'json',
            success: function (v) {
                if (v != null) {
                    sessionVCode = v.webcallvcode;
                } else {
                    sessionVCode = "";
                }
            }//success
        });//ajax
        if (sessionVCode != $.trim(ValidateCode)) {
            objElement.find("p.error").html("验证码不正确");
            objElement.find("img.validate-img").attr("src", objElement.data("websitehosturl") + '/WebCall/GetValidateCode?time=' + (new Date()).getTime());
            objElement.find("input[name=txtValidateCode]").focus();
            return false;
        }
        objElement.find("img.validate-img").attr("src", objElement.data("websitehosturl") + '/WebCall/GetValidateCode?time=' + (new Date()).getTime());
        return true;
    }//CheckValidateCode end
    /*
    * 添加网页回呼潜在客户信息
    * webCallPhone:客户电话
    */
    function WebCallPotenCustomerAdd(webCallPhone) {
        if (webCallPhone != "") {
            var d = {};
            d.webcallphone = webCallPhone;
            $.ajax({
                url: "/WebCall/WebCallPotenCustomerAdd",
                data: d,
                type: "post",
                dataType: "json",
                success: function (v) {
                    if (v != null) {

                    }
                }//success
            });
        }
    }//WebCallPotenCustomerAdd end
    $.fn.WebMobileCall = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('WebMobileCall')) { return element.data('WebMobileCall'); }
            // Pass options to plugin constructor
            var webmobilecall = new webMobileCall(this, options);
            // Store plugin object in this element's data
            element.data('WebMobileCall', webmobilecall);
        });
    }; //$.fn.WebMobileCall end
})(jQuery);//网页回呼

var aniInitObj = {};
(function (I) {
    I.aniWigetInit = function () {//带动画效果的挂件的初始化
        $('[data-wiget-type]').each(function () {
            var obj = jQuery.parseJSON($(this).attr('data-wiget-para'));
            var plugin_name = $(this).attr("data-wiget-type");
            switch (plugin_name) {
                case 'ProductCatepicShelter':   //分类图片覆盖
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/product_catepic_shelter.js?version=" + window.VERSION).wait(function () {
                            _that.ProductCatepicShelter(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'JadeProductDetail':
                case 'JadeProductSearch'://玉石产品
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/JadeProductSearch.js?version=" + window.VERSION);
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'UniteProductSearch':// 产品多条件筛选
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/UniteProductSearch.js?version=" + window.VERSION);
                        $(this).ProductPicLazyLoad(obj);
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'UniteProductSearchExpend':// 产品多条件筛选扩展
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/UniteProductSearchExpend.js?version=" + window.VERSION);
                        $(this).ProductPicLazyLoad(obj);
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'ProductSearch':
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/ProductSearch.js?version=" + window.VERSION).wait(function () {
                            _that.ProductSearch(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'ClassifiedProductSearch':// 产品多条件筛选
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/ClassifiedProductSearch.js?version=" + window.VERSION).wait(function () {
                            _that.ClassifiedProductSearch(obj);
                        });
                        $(this).ProductPicLazyLoad(obj);
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'productDvthumb':   //产品详情垂直缩略图加tab
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script(["/Scripts/plugin/jcarousellite_1.0.1.js?version=" + window.VERSION, "/Scripts/plugin/jquery.jqzoom-core.js?version=" + window.VERSION]).wait().script("/Scripts/plugin/productdvthumb.js?version=" + window.VERSION).wait(function () {
                            _that.productDvthumb(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'RecProductSwitch':   //产品tab切换加滚动
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script(["/Scripts/plugin/RecProductSwitch.js?version=" + window.VERSION]).wait(function () {
                            _that.recProductSwitch(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'RecSinglePageSwitch':   //单品页tab切换加滚动
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script(["/Scripts/plugin/RecSinglePageSwitch.js?version=" + window.VERSION]).wait(function () {
                            _that.recSinglePageSwitch(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'ProDetailExpend':   //产品详情加tab切换
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        var target = $(this).find('.slider_thumb');
                        target.nivoSlider(obj);
                        $LAB.script(["/Scripts/plugin/ProDetailExpend.js?version=" + window.VERSION]).wait(function () {
                            _that.ProDetailExpend(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'AdverSlider':
                    if (!$(this).data("haveIntialed")) {
                        $(this).find('.slider_wrap').slides(obj);
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'AdverSliderExpend':
                    var _that = $(this);
                    $LAB.script("/Scripts/plugin/AdverSliderExpend.js?version=" + window.VERSION).wait(function () {
                        _that.bannerImgFade(obj);
                    });
                    break;
                case 'AdverSliderJDTu':
                    var _that = $(this);
                    $LAB.script("/Scripts/plugin/AdverSliderJDTu.js?version=" + window.VERSION).wait(function () {
                        _that.FocusPic(obj);
                    });
                    break;
                case 'AdverSliderOrbit':
                    var _that = $(this);
                    $LAB.script("/Scripts/plugin/jquery.orbit-1.2.3.min.js?version=" + window.VERSION).wait(function () {
                        _that.find(".orbit_featured").orbit();
                    });
                    break;
                case 'AdverSliderLunbo':
                    var _that = $(this);
                    $LAB.script("/Scripts/plugin/jquery.slides.js?version=" + window.VERSION).wait(function () {
                        var midWidth = 0 - obj.width / 2;
                        _that.find(".bigImgBanner_bd").css({ height: obj.height });
                        _that.find('.slides_wrapperbox').css({ "width": obj.width, "marginLeft": midWidth, "left": "50%" });
                        if (!obj.mouseEvent) {
                            obj.mouseEvent = "click";
                        }

                        _that.find('.slides_wrapperbox').slidesjs({
                            width: obj.width,
                            height: obj.height,
                            mouseEvent: obj.mouseEvent,
                            play: {
                                auto: true,
                                interval: obj.interval,
                                swap: true,
                                effect: obj.effect,
                                pauseOnHover: true
                            },
                            navigation: {
                                active: true,
                                effect: obj.effect
                            },
                            pagination: {
                                active: true,
                                effect: obj.effect
                            },
                            effect: {
                                slide: {
                                    speed: obj.speed,
                                    crossfade: true
                                },
                                fade: {
                                    speed: obj.speed,
                                    crossfade: true
                                }
                            }
                        });
                    });
                    break;
                case 'AdverSlider3D'://平滑旋转幻灯片代码
                    var _that = $(this);
                    $LAB.script("/Scripts/plugin/jQuery-jcImgScroll.js?version=" + window.VERSION).wait(function () {
                        _that.find('.AS3D_bd').jcImgScroll({
                            // 轮播图的宽度（必填）
                            width: obj.width,
                            // 轮播图的高度（必填）
                            height: obj.height,
                            // 图片与图片之间的偏移量
                            offsetX: obj.offsetX,
                            // 显示的个数(必须为奇数)
                            //count: obj.count,
                            // 是否自动滚动（0为不滚，1为滚）
                            autoScroll: obj.autoScroll,
                            // 滚动的间隔
                            timeScroll: obj.timeScroll,
                            // 箭头的样式
                            arrow: {
                                // 左右箭头的宽度
                                width: obj.awidth,
                                // 左右箭头的高度（与图片的高度一致
                                height: obj.height,
                                // 箭头分别往外扩散的距离
                                x: obj.ax
                            },
                            // 是否显示标题
                            title: obj.stitle,
                            // 设置标题的样式
                            setTitle: {
                                // 标题的高度
                                height: obj.sheight,
                                // 边框的宽度
                                border: obj.sborder,
                                // 边框的背景颜色
                                bgColor: obj.sbgcolor,
                                // 标题的颜色
                                color: obj.scolor,
                                padding: 20,
                                // 标题的透明度
                                opacity: 0.8
                            }
                        });
                    });
                    break;
                case 'AdverSliderAlbumEffect'://缩略图轮播Banner
                    var _that = $(this);
                    $LAB.script("/Scripts/plugin/ecAlbumEffect.js?version=" + window.VERSION).wait(function () {
                        _that.find('.ecAlbumEffect').ecAlbumEffect({
                            //淡入淡出切换时间
                            fadeTime: obj.fadeTime,
                            //停留时间
                            spaceTime: obj.spaceTime,
                            // 是否自动滚动（0为不滚，1为滚）
                            isScroll: obj.isScroll
                        });
                    });
                    break;
                case 'AdverEffectExpend'://缩略图轮播Banner
                    var _that = $(this);
                    $LAB.script("/Scripts/plugin/ecAlbumEffectExpend.js?version=" + window.VERSION).wait(function () {
                        _that.find('.eecAlbumEffect').ecAlbumEffect({
                            //淡入淡出切换时间
                            fadeTime: obj.fadeTime
                        });
                    });
                    break;
                case 'SidesOpacityBanner':
                    var _that = $(this);
                    $LAB.script("/Scripts/plugin/sidesOpacityBanner.js?version=" + window.VERSION).wait(function () {
                        _that.sidesOpacityBanner({
                            // 自动播放的时间间隔
                            duration: obj.duration,
                            // 滚动瞬间的间隔
                            millisec: obj.millisec
                        });
                    });
                    break;
                case 'newsRollList'://新闻列表滚动
                    var _that = $(this);
                    $LAB.script("/Scripts/plugin/newsrolllist.js?version=" + window.VERSION).wait(function () {
                        _that.NewsRollList(obj);
                    });
                    break;
                case 'CommPagePic'://单页图片简介
                    if (!$(this).data("haveIntialed")) {
                        $(this).find('.js-cpc-boxer').hover(function () {//鼠标移上去
                            $(this).addClass('cpc_boxhover');
                        }, function () {//鼠标移走
                            $(this).removeClass('cpc_boxhover');
                        });
                    }
                    break;
                case 'newsSlidertop':
                    if (!$(this).data("haveIntialed")) {
                        $(this).find('.slider_wrap').slides(obj);
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'horizNewsSlider':
                    if (!$(this).data("haveIntialed")) {
                        $(this).find('.slider_wrap').slides(obj);
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'MsgListMarquee'://回复列表滚动
                    var _that = $(this);
                    $LAB.script("/Scripts/plugin/newsrolllist.js?version=" + window.VERSION).wait(function () {
                        _that.NewsRollList(obj);
                    });
                    break;
                case 'PhotoThumbSlider':
                    var target = $(this).find('.slider_thumb');
                    target.nivoSlider(obj);
                    break;
                case 'ProductSlider':
                    var targetParent = $(this);
                    var target = $(this).find('.slider_thumb');

                    if (obj.hasMainPoperty == 1) {
                        if (obj.FInFOut) {
                            target.nivoSlider(obj);
                        } else {
                            $LAB.script("/Scripts/plugin/nivoSlider.js?version=" + window.VERSION).wait(function () {
                                target.nivoSlider2(obj);
                            });
                        }
                    } else if (obj.hasMainPoperty == 2) {
                        $LAB.script("/Scripts/plugin/jquery.lightbox.js?version=" + window.VERSION).wait(function () {
                            $LAB.script("/Scripts/plugin/ProDetailLightBox.js?version=" + window.VERSION).wait(function () {
                                targetParent.ProDetailLightBox();
                            });
                        });

                    }

                    $(this).ProductSlider(obj);

                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        if (obj.IsShowPage) {
                            $LAB.script("/Scripts/plugin/jquery.easing.1.3.js?version=" + window.VERSION).wait(function () {
                                $LAB.script("/Scripts/plugin/textify-min.js?version=" + window.VERSION).wait(function () {
                                    _that.find('.pd_content').height(obj.Height);
                                    _that.find('.pd_content').textify({
                                        numberOfColumn: 1,
                                        margin: 20,
                                        padding: 15,
                                        width: 'auto',
                                        height: 'auto',
                                        showNavigation: true,
                                        textAlign: 'justify'
                                    })

                                });
                            });
                        }

                        $(this).data("haveIntialed", "haveIntialed");
                    }

                    break;

                case 'PhotoListAndDetail':
                    var target = $(this).find('.galleryImgThumbnails');
                    $LAB.script("/Scripts/plugin/jquery.fancybox-1.3.4.pack.js?version=" + window.VERSION).wait().script("/Scripts/plugin/galleryImgThumbnails.js?version=" + window.VERSION).wait(function () {
                        target.galleryImgThumbnails({
                            duration: 500
                        });
                    });
                    break;
                case 'MainNavi':
                    $(this).find('.navi_lists').mainNavi(obj);
                    break;
                case 'MainNaviMore':
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/MainNaviMore.js?version=" + window.VERSION).wait(function () {
                            _that.mainNaviMore(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'MainNaviMoreChild':
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/MainNaviMoreChild.js?version=" + window.VERSION).wait(function () {
                            _that.navSlideDown(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'LeftNavi':
                    $(this).find('.navi_lists').leftNavi(obj);
                    break;
                case 'LeftNaviExpand':
                    $(this).find('.navi_lists').leftNaviExpand(obj);
                    break;
                case 'LeftNaviExpandV2':
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/leftNaviExpandV2.js?version=" + window.VERSION).wait(function () {
                            _that.find('.navi_lists').leftNaviExpandV2(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'ProductDetailTabwgt':
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/ProductDetailTab.js?version=" + window.VERSION).wait(function () {
                            productdetailtab.loadTab(_that.find(".v2productId").val());
                            productdetailtab.TabSwitch($(".ProductDetailTab"), { "trigger": "hover" });
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'couplet':
                    $(this).couplet(obj);
                    break;
                case 'IMStyle':
                    $(this).IMStyle(obj);
                    break;
                case 'VideoDetail'://视频播放
                    $(this).VideoDetail(obj);
                    break;
                case 'Employee_Submit'://应聘提交
                    $(this).Employee_Submit(obj);
                    break;
                case 'SurveyDetail'://在线调查
                    $(this).SurveyDetail(obj);
                    break;
                case 'MapBaidu'://百度地图
                    $(this).BaiduMap(obj);
                    break;
                case 'MemberRegister'://用户注册
                    $(this).MemberRegister(obj);
                    break;

                case 'MemberEdit'://用户编辑
                    $(this).MemberEdit(obj);
                    break;

                case 'MemberLogin'://用户登陆
                    $(this).MemberLogin(obj);
                    break;
                case 'BasicSharing'://分享
                    if (!$(this).data("haveIntialed")) {
                        SharingEvent.ConfigSharing();
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'LanguageSelect'://多语言挂件
                    $(this).LanguageSelect();
                    break;
                case 'Search'://搜索挂件
                    $(this).Search();
                    break;
            	case 'DownloadSearch':
            		if (!$(this).data("haveIntialed")) {
            			var _that = $(this);
            			$LAB.script("/Scripts/plugin/DownloadSearch.js?version=" + window.VERSION).wait(function () {
            				_that.DownloadSearch(obj);
            			});
            			$(this).data("haveIntialed", "haveIntialed");
            		}
            		break;
                case 'SearchLink'://搜索导航挂件
                    $(this).SearchLink();
                    break;
                case 'TitleKeysSearch'://搜索导航挂件
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/SearchTitle.js?version=" + window.VERSION).wait(function () {
                            _that.Search(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'scrollText'://文字滚动
                    $(this).ScrollText(obj);
                    break;
                case 'imagesMarquee'://图片marquee效果
                    $(this).ImagesMarquee(obj);
                    break;
                case 'ScrollFLink'://图片marquee效果
                    $(this).ImagesMarquee(obj);
                    break;
            	case 'FlinkSlick'://多图友情链接滚动
            		if (!$(this).data("haveIntialed")) {
            			var _that = $(this);
            			var options = {infinite: true,
            				autoplaySpeed: 3000,
            				speed: 400,
            				slidesToShow:3,
            				slidesToScroll: 3,
            				autoplay:true,
            				draggable:false,
            				prevArrow:"<a></a>",
            				nextArrow:"<a></a>"};
            			options = $.extend(options, obj);
            			$LAB.script("/Scripts/plugin/slick.min.js?version=" + window.VERSION).wait(function () {
            				_that.find(".f_slicklist").slick(options);
            			});
            			$(this).data("haveIntialed", "haveIntialed");
            		}
            		break;
                case 'ScrollPhotoList'://相册图片marquee效果
                    if (obj.ZoomType == 1) {
                        $(this).ImagesMarquee(obj);
                    } else {
                        $LAB.script("/Scripts/plugin/ProductInitzoom.js?version=" + window.VERSION).wait(function () {
                            $(this).productListPicZoom(obj);
                        })

                    }
                    break;
                case 'PhotoListShaded'://相册图片shade效果
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/ImageShaned.js?version=" + window.VERSION).wait(function () {
                            _that.imgMasking(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'AlbumListShaded'://相册列表shade效果
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/ImageShaned.js?version=" + window.VERSION).wait(function () {
                            _that.imgMasking(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'TabSwitch'://tab切换效果
                    $(this).TabSwitch(obj);
                    break;
                case 'SortedProductList'://竖排带有编号产品列表 列切换效果
                    $(this).SortedProductList(obj);
                    break;
                case 'PhotoBook'://电子样本
                    $(this).PhotoBook(obj);
                    break;
                case 'ProductPicLazyLoad'://产品图片延迟加载
                    $(this).ProductPicLazyLoad(obj);
                    if (obj != null) {
                        if (obj.IsLightBox) {
                            if (!$(this).data("haveIntialed")) {
                                var _that = $(this);
                                $LAB.script("/Scripts/plugin/jquery.lightbox.js?version=" + window.VERSION).wait(function () {
                                    $(_that).find('.lightboxLink').lightBox(obj);
                                });
                                $(this).data("haveIntialed", "haveIntialed");
                            }
                        }
                    }
                    break;
                case 'ProductInquire_Submit'://产品询价
                    $(this).ProductInquire_Submit(obj);
                case "WebMobileCall"://网页回呼
                    $(this).WebMobileCall(obj);
                case 'PhotosSlider'://相册轮播
                    if (!$(this).data("haveIntialed")) {
                        $(this).find('.slider_wrap').slides(obj);
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'PicProductSlider'://产品轮播
                    if (!$(this).data("haveIntialed")) {
                        $(this).find('.slider_wrap').slides(obj);
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'TalkAppExpand'://在线咨询扩展
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/TalkAppExpand.js?version=" + window.VERSION).wait(function () {
                            _that.qqtalkfix(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'NewsComposite'://新闻图片综合
                    if (obj.IsRoll == 0) {
                        if (!$(this).data("haveIntialed")) {
                            var _that = $(this);
                            $LAB.script("/Scripts/plugin/NewsLeftSlider.js?version=" + window.VERSION).wait(function () {
                                $(_that).newsImgScroll(obj);
                            });
                            $(this).data("haveIntialed", "haveIntialed");
                        }
                    }
                    break;
                case 'ProductDetailMask'://lightbox效果
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/jquery.lightbox.js?version=" + window.VERSION).wait(function () {
                            $(_that).find('.fancybox').lightBox(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'FriendLinkTab'://友情链接选项
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/friendLinkTab.js?version=" + window.VERSION).wait(function () {
                            _that.friendLinkTab(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'NewsPic'://带标题的新闻图片滚动
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/NewsPic.js?version=" + window.VERSION).wait(function () {
                            _that.newsImgScrollWithTitle(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'MainNaviChanLang'://主导航语言切换
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/MainNaviChanLang.js?version=" + window.VERSION).wait(function () {
                            _that.mainNaviChanLang(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'CommPageInfo'://单页详细拓展
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/commPageInfoImg.js?version=" + window.VERSION).wait(function () {
                            _that.commPageInfoImg(obj);
                        });

                        if (obj.IsShowPage) {
                            $LAB.script("/Scripts/plugin/jquery.easing.1.3.js?version=" + window.VERSION).wait(function () {
                                $LAB.script("/Scripts/plugin/textify-min.js?version=" + window.VERSION).wait(function () {
                                    _that.find('.con_bx').height(obj.Height);
                                    _that.find('.con_bx').textify({
                                        numberOfColumn: 1,
                                        margin: 20,
                                        padding: 15,
                                        width: "auto",
                                        height: "auto",
                                        showNavigation: true,
                                        textAlign: 'justify'
                                    })

                                });
                            });

                        }

                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'imagesSwitch'://产品一个一个滚动
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/proswitch.js?version=" + window.VERSION).wait(function () {
                            _that.proSwitch(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'PhotoSingleSwitch'://照片一个一个滚动
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/proswitch.js?version=" + window.VERSION).wait(function () {
                            _that.proSwitch(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'NewsListSlider'://新闻图片轮播
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/NewsListSlider.js?version=" + window.VERSION).wait(function () {
                            _that.NewsListSlider(obj);
                        });

                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'SingleProSwitch'://产品一个一个滚动
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/SingleProSwitch.js?version=" + window.VERSION).wait(function () {
                            _that.singleProSwitch(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'MainNaviHSlide'://主导航下拉横排效果
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/MainNaviHSlide.js?version=" + window.VERSION).wait(function () {
                            _that.find('.navi_lists').mainNavHSlide(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'MultipleProductNavi'://产品列表导航指向展开
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        if (obj.IsExp) {
                            $LAB.script("/Scripts/plugin/MultipleProductNavi.js?version=" + window.VERSION).wait(function () {
                                _that.proListNav(obj);
                            });
                        }
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'AlbumPhotoList'://电子相册列表带tab切换
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        _that.find('.tabs-switch_btn').each(function (index, ele) {
                            $(this).mouseover(function () {
                                // 对应的分类添加删除class名称
                                _that.find('.tabs-switch_btn').removeClass('tabs-switch_active');
                                $(this).addClass('tabs-switch_active');

                                // 对应分类的列表显示隐藏
                                _that.find('.tabs-switch_cell').hide();
                                _that.find('.tabs-switch_cell').eq(index).show();
                            });
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'AlbumDetailsFlash'://电子相册详情
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);

                        $LAB.script("/Scripts/plugin/AlbumDetailsFlash.js?version=" + window.VERSION).wait(function () {
                            // 转换颜色的模式
                            function RGB2Hex(rgb) {
                                var re = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");//利用正则表达式去掉多余的部分
                                if (String(re).indexOf('#') >= 0) {
                                    hexColor = String(re).substring(1);
                                } else {
                                    var hexColor = "";
                                    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
                                    for (var i = 0; i < 3; i++) {
                                        var r = null;
                                        var c = parseInt(re[i]);
                                        var hexAr = [];
                                        if (c == 0) {
                                            hexAr.push(hex[c]);
                                        }
                                        while (c > 16) {
                                            r = c % 16;
                                            c = (c / 16) >> 0;
                                            hexAr.push(hex[r]);
                                        }
                                        hexAr.push(hex[c]);
                                        hexColor += hexAr.reverse().join('');
                                    }
                                }
                                return hexColor;
                            }
                            flippingBook.bgColor2 = RGB2Hex($('.AlbumDetailsFlash').css('background-color'));


                            flippingBook.pages = obj.Url.split(',');


                            var firstPageUrl = flippingBook.pages[0].substring(0, 30);


                            flippingBook.contents = [];
                            var albumFlashImgLength = flippingBook.pages.length;
                            var contentArr = ["首版", 1];
                            flippingBook.contents.push(contentArr);
                            for (var i = 1; i < Math.ceil((albumFlashImgLength) / 2) ; i++) {
                                var contentArr = [i * 2 + "-" + (i * 2 + 1) + "版", i * 2];
                                flippingBook.contents.push(contentArr);
                            }
                            var contentArr = ["尾版", albumFlashImgLength % 2 == 0 ? albumFlashImgLength - 1 : albumFlashImgLength];
                            flippingBook.contents.push(contentArr);


                            flippingBook.settings.bookWidth = undefined || 400 * 2;
                            flippingBook.settings.bookHeight = undefined || 590;
                            flippingBook.settings.zoomImageWidth = undefined || 1000;
                            flippingBook.settings.zoomImageHeight = undefined || 1410;
                            flippingBook.settings.backgroundColor = flippingBook.bgColor2,
                            flippingBook.settings.zoomPath = firstPageUrl;
                            flippingBook.create();

                            setTimeout(function () {
                                albumFlash.flippingBookLoad();
                                albumFlash.swfobject.callDomLoadFunctions();
                                albumFlash.sizeContent();
                            }, 1000);

                        });

                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'ProductClassSwitch'://产品分类列表带tab切换
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        _that.find('.tabs-switch_btn').each(function (index, ele) {
                            $(this).mouseover(function () {
                                // 对应的分类添加删除class名称
                                _that.find('.tabs-switch_btn').removeClass('tabs-switch_active');
                                $(this).addClass('tabs-switch_active');

                                // 对应分类的列表显示隐藏
                                _that.find('.tabs-switch_cell').hide();
                                _that.find('.tabs-switch_cell').eq(index).show();
                            });
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'AlbumListSlider'://相册列表幻灯片播放
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/AlbumListSlider.js?version=" + window.VERSION).wait(function () {
                            imf.create(_that.attr('id'), 0.3, 1.1, 10);//第一个参数非选中图片大小;第二个参数选择图片放大倍数;图片间隔
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'PhotoListSlider'://照片列表幻灯片播放
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/AlbumListSlider.js?version=" + window.VERSION).wait(function () {
                            imf.create(_that.attr('id'), 0.3, 1.1, 10);//第一个参数非选中图片大小;第二个参数选择图片放大倍数;图片间隔
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'PhotoListSimpleScroll'://照片列表简单滚动
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/PhotoListSimpleScroll.js?version=" + window.VERSION).wait(function () {
                            _that.photoListSimpleScroll(obj);
                        });
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'ProductImgScrollAndZoom'://产品图片滚动整体放大的列表挂件
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);

                        $LAB.script("/Scripts/plugin/ProductInitzoom.js?version=" + window.VERSION).wait(function () {
                            _that.productListPicZoom();
                            _that.ImagesMarquee({
                                movegap: 1,
                                speed: 16,
                                direction: obj.direction,
                                ifscroll: obj.ifscroll
                            })
                        })
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;

                case 'ProClassifyAndListShow'://产品图片滚动整体放大的列表挂件
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);

                        $LAB.script("/Scripts/plugin/ProClassifyAndListShow.js?version=" + window.VERSION).wait(function () {
                            _that.ProClassifyAndListShow();
                        })
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'AdverFloatRandom'://随机浮动广告图片挂件
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);

                        $LAB.script("/Scripts/plugin/AdverFloatRandom.js?version=" + window.VERSION).wait(function () {
                            _that.AdverFloatRandom(obj);
                        })
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'PhotoProductListLoad'://图片产品展示
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);
                        $LAB.script("/Scripts/plugin/jquery.mousewheel.js?version=" + window.VERSION).wait(function () {
                            $LAB.script("/Scripts/plugin/jquery.lightbox.js?version=" + window.VERSION).wait(function () {
                                $LAB.script("/Scripts/plugin/ProPicComplexShow.js?version=" + window.VERSION).wait(function () {
                                    _that.ProPicComplexShow(obj);
                                })
                            })
                        })
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                case 'ProLeftHandNaviBar'://左侧产品导航
                    if (!$(this).data("haveIntialed")) {
                        var _that = $(this);

                        $LAB.script("/Scripts/plugin/ProLeftHandNaviBar.js?version=" + window.VERSION).wait(function () {
                            _that.ProLeftHandNaviBar(obj);
                        })
                        $(this).data("haveIntialed", "haveIntialed");
                    }
                    break;
                default:
                    return;
            }
        });
    };
})(aniInitObj);
if (typeof PUBLICENVIRONMENT == 'undefined' || PUBLICENVIRONMENT == true) {
    aniInitObj.aniWigetInit();//初始化挂件脚本动画
} else {
    $(function () {
        aniInitObj.aniWigetInit();//初始化挂件脚本动画
    });
}