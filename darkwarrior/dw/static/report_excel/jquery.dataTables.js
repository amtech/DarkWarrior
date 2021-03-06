/**
 * Created by root on 9/29/16.
 */
/*!
 DataTables 1.10.9-dev
 ©2008-2014 SpryMedia Ltd - datatables.net/license
*/
(function(Fa, T, k) {
    var S = function(g) {
        function X(a) {
            var b, c, e = {};
            g.each(a,
            function(d) {
                if ((b = d.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " ")) c = d.replace(b[0], b[2].toLowerCase()),
                e[c] = d,
                "o" === b[1] && X(a[d])
            });
            a._hungarianMap = e
        }
        function I(a, b, c) {
            a._hungarianMap || X(a);
            var e;
            g.each(b,
            function(d) {
                e = a._hungarianMap[d];
                if (e !== k && (c || b[e] === k))"o" === e.charAt(0) ? (b[e] || (b[e] = {}), g.extend(!0, b[e], b[d]), I(a[e], b[e], c)) : b[e] = b[d]
            })
        }
        function S(a) {
            var b = m.defaults.oLanguage,
            c = a.sZeroRecords; ! a.sEmptyTable && (c && "No data available in table" === b.sEmptyTable) && F(a, a, "sZeroRecords", "sEmptyTable"); ! a.sLoadingRecords && (c && "Loading..." === b.sLoadingRecords) && F(a, a, "sZeroRecords", "sLoadingRecords");
            a.sInfoThousands && (a.sThousands = a.sInfoThousands); (a = a.sDecimal) && db(a)
        }
        function eb(a) {
            B(a, "ordering", "bSort");
            B(a, "orderMulti", "bSortMulti");
            B(a, "orderClasses", "bSortClasses");
            B(a, "orderCellsTop", "bSortCellsTop");
            B(a, "order", "aaSorting");
            B(a, "orderFixed", "aaSortingFixed");
            B(a, "paging", "bPaginate");
            B(a, "pagingType", "sPaginationType");
            B(a, "pageLength", "iDisplayLength");
            B(a, "searching", "bFilter");
            "boolean" === typeof a.sScrollX && (a.sScrollX = a.sScrollX ? "100%": "");
            if (a = a.aoSearchCols) for (var b = 0,
            c = a.length; b < c; b++) a[b] && I(m.models.oSearch, a[b])
        }
        function fb(a) {
            B(a, "orderable", "bSortable");
            B(a, "orderData", "aDataSort");
            B(a, "orderSequence", "asSorting");
            B(a, "orderDataType", "sortDataType");
            var b = a.aDataSort;
            b && !g.isArray(b) && (a.aDataSort = [b])
        }
        function gb(a) {
            var a = a.oBrowser,
            b = g("<div/>").css({
                position: "fixed",
                top: 0,
                left: 0,
                height: 1,
                width: 1,
                overflow: "hidden"
            }).append(g("<div/>").css({
                position: "absolute",
                top: 1,
                left: 1,
                width: 100,
                overflow: "scroll"
            }).append(g('<div class="test"/>').css({
                width: "100%",
                height: 10
            }))).appendTo("body"),
            c = b.find(".test");
            a.bScrollOversize = 100 === c[0].offsetWidth;
            a.bScrollbarLeft = 1 !== Math.round(c.offset().left);
            a.bBounding = b[0].getBoundingClientRect().width ? !0 : !1;
            b.remove()
        }
        function hb(a, b, c, e, d, f) {
            var h, i = !1;
            c !== k && (h = c, i = !0);
            for (; e !== d;) a.hasOwnProperty(e) && (h = i ? b(h, a[e], e, a) : a[e], i = !0, e += f);
            return h
        }
        function Ga(a, b) {
            var c = m.defaults.column,
            e = a.aoColumns.length,
            c = g.extend({},
            m.models.oColumn, c, {
                nTh: b ? b: T.createElement("th"),
                sTitle: c.sTitle ? c.sTitle: b ? b.innerHTML: "",
                aDataSort: c.aDataSort ? c.aDataSort: [e],
                mData: c.mData ? c.mData: e,
                idx: e
            });
            a.aoColumns.push(c);
            c = a.aoPreSearchCols;
            c[e] = g.extend({},
            m.models.oSearch, c[e]);
            ka(a, e, g(b).data())
        }
        function ka(a, b, c) {
            var b = a.aoColumns[b],
            e = a.oClasses,
            d = g(b.nTh);
            if (!b.sWidthOrig) {
                b.sWidthOrig = d.attr("width") || null;
                var f = (d.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
                f && (b.sWidthOrig = f[1])
            }
            c !== k && null !== c && (fb(c), I(m.defaults.column, c), c.mDataProp !== k && !c.mData && (c.mData = c.mDataProp), c.sType && (b._sManualType = c.sType), c.className && !c.sClass && (c.sClass = c.className), g.extend(b, c), F(b, c, "sWidth", "sWidthOrig"), c.iDataSort !== k && (b.aDataSort = [c.iDataSort]), F(b, c, "aDataSort"));
            var h = b.mData,
            i = P(h),
            j = b.mRender ? P(b.mRender) : null,
            c = function(a) {
                return "string" === typeof a && -1 !== a.indexOf("@")
            };
            b._bAttrSrc = g.isPlainObject(h) && (c(h.sort) || c(h.type) || c(h.filter));
            b.fnGetData = function(a, b, c) {
                var e = i(a, b, k, c);
                return j && b ? j(e, b, a, c) : e
            };
            b.fnSetData = function(a, b, c) {
                return Q(h)(a, b, c)
            };
            "number" !== typeof h && (a._rowReadObject = !0);
            a.oFeatures.bSort || (b.bSortable = !1, d.addClass(e.sSortableNone));
            a = -1 !== g.inArray("asc", b.asSorting);
            c = -1 !== g.inArray("desc", b.asSorting); ! b.bSortable || !a && !c ? (b.sSortingClass = e.sSortableNone, b.sSortingClassJUI = "") : a && !c ? (b.sSortingClass = e.sSortableAsc, b.sSortingClassJUI = e.sSortJUIAscAllowed) : !a && c ? (b.sSortingClass = e.sSortableDesc, b.sSortingClassJUI = e.sSortJUIDescAllowed) : (b.sSortingClass = e.sSortable, b.sSortingClassJUI = e.sSortJUI)
        }
        function Y(a) {
            if (!1 !== a.oFeatures.bAutoWidth) {
                var b = a.aoColumns;
                Ha(a);
                for (var c = 0,
                e = b.length; c < e; c++) b[c].nTh.style.width = b[c].sWidth
            }
            b = a.oScroll; ("" !== b.sY || "" !== b.sX) && Z(a);
            w(a, null, "column-sizing", [a])
        }
        function la(a, b) {
            var c = $(a, "bVisible");
            return "number" === typeof c[b] ? c[b] : null
        }
        function aa(a, b) {
            var c = $(a, "bVisible"),
            c = g.inArray(b, c);
            return - 1 !== c ? c: null
        }
        function ba(a) {
            return $(a, "bVisible").length
        }
        function $(a, b) {
            var c = [];
            g.map(a.aoColumns,
            function(a, d) {
                a[b] && c.push(d)
            });
            return c
        }
        function Ia(a) {
            var b = a.aoColumns,
            c = a.aoData,
            e = m.ext.type.detect,
            d, f, h, i, j, g, l, r, q;
            d = 0;
            for (f = b.length; d < f; d++) if (l = b[d], q = [], !l.sType && l._sManualType) l.sType = l._sManualType;
            else if (!l.sType) {
                h = 0;
                for (i = e.length; h < i; h++) {
                    j = 0;
                    for (g = c.length; j < g; j++) {
                        q[j] === k && (q[j] = y(a, j, d, "type"));
                        r = e[h](q[j], a);
                        if (!r && h !== e.length - 1) break;
                        if ("html" === r) break
                    }
                    if (r) {
                        l.sType = r;
                        break
                    }
                }
                l.sType || (l.sType = "string")
            }
        }
        function ib(a, b, c, e) {
            var d, f, h, i, j, n, l = a.aoColumns;
            if (b) for (d = b.length - 1; 0 <= d; d--) {
                n = b[d];
                var r = n.targets !== k ? n.targets: n.aTargets;
                g.isArray(r) || (r = [r]);
                f = 0;
                for (h = r.length; f < h; f++) if ("number" === typeof r[f] && 0 <= r[f]) {
                    for (; l.length <= r[f];) Ga(a);
                    e(r[f], n)
                } else if ("number" === typeof r[f] && 0 > r[f]) e(l.length + r[f], n);
                else if ("string" === typeof r[f]) {
                    i = 0;
                    for (j = l.length; i < j; i++)("_all" == r[f] || g(l[i].nTh).hasClass(r[f])) && e(i, n)
                }
            }
            if (c) {
                d = 0;
                for (a = c.length; d < a; d++) e(d, c[d])
            }
        }
        function L(a, b, c, e) {
            var d = a.aoData.length,
            f = g.extend(!0, {},
            m.models.oRow, {
                src: c ? "dom": "data",
                idx: d
            });
            f._aData = b;
            a.aoData.push(f);
            for (var h = a.aoColumns,
            i = 0,
            j = h.length; i < j; i++) c && Ja(a, d, i, y(a, d, i)),
            h[i].sType = null;
            a.aiDisplayMaster.push(d);
            b = a.rowIdFn(b);
            b !== k && (a.aIds[b] = f); (c || !a.oFeatures.bDeferRender) && Ka(a, d, c, e);
            return d
        }
        function ma(a, b) {
            var c;
            b instanceof g || (b = g(b));
            return b.map(function(b, d) {
                c = na(a, d);
                return L(a, c.data, d, c.cells)
            })
        }
        function y(a, b, c, e) {
            var d = a.iDraw,
            f = a.aoColumns[c],
            h = a.aoData[b]._aData,
            i = f.sDefaultContent,
            c = f.fnGetData(h, e, {
                settings: a,
                row: b,
                col: c
            });
            if (c === k) return a.iDrawError != d && null === i && (J(a, 0, "Requested unknown parameter " + ("function" == typeof f.mData ? "{function}": "'" + f.mData + "'") + " for row " + b, 4), a.iDrawError = d),
            i;
            if ((c === h || null === c) && null !== i) c = i;
            else if ("function" === typeof c) return c.call(h);
            return null === c && "display" == e ? "": c
        }
        function Ja(a, b, c, e) {
            a.aoColumns[c].fnSetData(a.aoData[b]._aData, e, {
                settings: a,
                row: b,
                col: c
            })
        }
        function La(a) {
            return g.map(a.match(/(\\.|[^\.])+/g) || [""],
            function(a) {
                return a.replace(/\\./g, ".")
            })
        }
        function P(a) {
            if (g.isPlainObject(a)) {
                var b = {};
                g.each(a,
                function(a, c) {
                    c && (b[a] = P(c))
                });
                return function(a, c, f, h) {
                    var i = b[c] || b._;
                    return i !== k ? i(a, c, f, h) : a
                }
            }
            if (null === a) return function(a) {
                return a
            };
            if ("function" === typeof a) return function(b, c, f, h) {
                return a(b, c, f, h)
            };
            if ("string" === typeof a && ( - 1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
                var c = function(a, b, f) {
                    var h, i;
                    if ("" !== f) {
                        i = La(f);
                        for (var j = 0,
                        g = i.length; j < g; j++) {
                            f = i[j].match(ca);
                            h = i[j].match(U);
                            if (f) {
                                i[j] = i[j].replace(ca, "");
                                "" !== i[j] && (a = a[i[j]]);
                                h = [];
                                i.splice(0, j + 1);
                                i = i.join(".");
                                j = 0;
                                for (g = a.length; j < g; j++) h.push(c(a[j], b, i));
                                a = f[0].substring(1, f[0].length - 1);
                                a = "" === a ? h: h.join(a);
                                break
                            } else if (h) {
                                i[j] = i[j].replace(U, "");
                                a = a[i[j]]();
                                continue
                            }
                            if (null === a || a[i[j]] === k) return k;
                            a = a[i[j]]
                        }
                    }
                    return a
                };
                return function(b, d) {
                    return c(b, d, a)
                }
            }
            return function(b) {
                return b[a]
            }
        }
        function Q(a) {
            if (g.isPlainObject(a)) return Q(a._);
            if (null === a) return function() {};
            if ("function" === typeof a) return function(b, e, d) {
                a(b, "set", e, d)
            };
            if ("string" === typeof a && ( - 1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
                var b = function(a, e, d) {
                    var d = La(d),
                    f;
                    f = d[d.length - 1];
                    for (var h, i, j = 0,
                    g = d.length - 1; j < g; j++) {
                        h = d[j].match(ca);
                        i = d[j].match(U);
                        if (h) {
                            d[j] = d[j].replace(ca, "");
                            a[d[j]] = [];
                            f = d.slice();
                            f.splice(0, j + 1);
                            h = f.join(".");
                            i = 0;
                            for (g = e.length; i < g; i++) f = {},
                            b(f, e[i], h),
                            a[d[j]].push(f);
                            return
                        }
                        i && (d[j] = d[j].replace(U, ""), a = a[d[j]](e));
                        if (null === a[d[j]] || a[d[j]] === k) a[d[j]] = {};
                        a = a[d[j]]
                    }
                    if (f.match(U)) a[f.replace(U, "")](e);
                    else a[f.replace(ca, "")] = e
                };
                return function(c, e) {
                    return b(c, e, a)
                }
            }
            return function(b, e) {
                b[a] = e
            }
        }
        function Ma(a) {
            return D(a.aoData, "_aData")
        }
        function oa(a) {
            a.aoData.length = 0;
            a.aiDisplayMaster.length = 0;
            a.aiDisplay.length = 0
        }
        function pa(a, b, c) {
            for (var e = -1,
            d = 0,
            f = a.length; d < f; d++) a[d] == b ? e = d: a[d] > b && a[d]--; - 1 != e && c === k && a.splice(e, 1)
        }
        function da(a, b, c, e) {
            var d = a.aoData[b],
            f,
            h = function(c, f) {
                for (; c.childNodes.length;) c.removeChild(c.firstChild);
                c.innerHTML = y(a, b, f, "display")
            };
            if ("dom" === c || (!c || "auto" === c) && "dom" === d.src) d._aData = na(a, d, e, e === k ? k: d._aData).data;
            else {
                var i = d.anCells;
                if (i) if (e !== k) h(i[e], e);
                else {
                    c = 0;
                    for (f = i.length; c < f; c++) h(i[c], c)
                }
            }
            d._aSortData = null;
            d._aFilterData = null;
            h = a.aoColumns;
            if (e !== k) h[e].sType = null;
            else {
                c = 0;
                for (f = h.length; c < f; c++) h[c].sType = null;
                Na(a, d)
            }
        }
        function na(a, b, c, e) {
            var d = [],
            f = b.firstChild,
            h,
            i,
            j = 0,
            n,
            l = a.aoColumns,
            r = a._rowReadObject,
            e = e !== k ? e: r ? {}: [],
            q = function(a, b) {
                if ("string" === typeof a) {
                    var c = a.indexOf("@"); - 1 !== c && (c = a.substring(c + 1), Q(a)(e, b.getAttribute(c)))
                }
            },
            jb = function(a) {
                if (c === k || c === j) i = l[j],
                n = g.trim(a.innerHTML),
                i && i._bAttrSrc ? (Q(i.mData._)(e, n), q(i.mData.sort, a), q(i.mData.type, a), q(i.mData.filter, a)) : r ? (i._setter || (i._setter = Q(i.mData)), i._setter(e, n)) : e[j] = n;
                j++
            };
            if (f) for (; f;) {
                h = f.nodeName.toUpperCase();
                if ("TD" == h || "TH" == h) jb(f),
                d.push(f);
                f = f.nextSibling
            } else {
                d = b.anCells;
                h = 0;
                for (var o = d.length; h < o; h++) jb(d[h])
            }
            if (b = f ? b: b.nTr)(b = b.getAttribute("id")) && Q(a.rowId)(e, b);
            return {
                data: e,
                cells: d
            }
        }
        function Ka(a, b, c, e) {
            var d = a.aoData[b],
            f = d._aData,
            h = [],
            i,
            j,
            g,
            l,
            r;
            if (null === d.nTr) {
                i = c || T.createElement("tr");
                d.nTr = i;
                d.anCells = h;
                i._DT_RowIndex = b;
                Na(a, d);
                l = 0;
                for (r = a.aoColumns.length; l < r; l++) {
                    g = a.aoColumns[l];
                    j = c ? e[l] : T.createElement(g.sCellType);
                    h.push(j);
                    if (!c || g.mRender || g.mData !== l) j.innerHTML = y(a, b, l, "display");
                    g.sClass && (j.className += " " + g.sClass);
                    g.bVisible && !c ? i.appendChild(j) : !g.bVisible && c && j.parentNode.removeChild(j);
                    g.fnCreatedCell && g.fnCreatedCell.call(a.oInstance, j, y(a, b, l), f, b, l)
                }
                w(a, "aoRowCreatedCallback", null, [i, f, b])
            }
            d.nTr.setAttribute("role", "row")
        }
        function Na(a, b) {
            var c = b.nTr,
            e = b._aData;
            if (c) {
                var d = a.rowIdFn(e);
                d && (c.id = d);
                e.DT_RowClass && (d = e.DT_RowClass.split(" "), b.__rowc = b.__rowc ? Oa(b.__rowc.concat(d)) : d, g(c).removeClass(b.__rowc.join(" ")).addClass(e.DT_RowClass));
                e.DT_RowAttr && g(c).attr(e.DT_RowAttr);
                e.DT_RowData && g(c).data(e.DT_RowData)
            }
        }
        function kb(a) {
            var b, c, e, d, f, h = a.nTHead,
            i = a.nTFoot,
            j = 0 === g("th, td", h).length,
            n = a.oClasses,
            l = a.aoColumns;
            j && (d = g("<tr/>").appendTo(h));
            b = 0;
            for (c = l.length; b < c; b++) f = l[b],
            e = g(f.nTh).addClass(f.sClass),
            j && e.appendTo(d),
            a.oFeatures.bSort && (e.addClass(f.sSortingClass), !1 !== f.bSortable && (e.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId), Pa(a, f.nTh, b))),
            f.sTitle != e[0].innerHTML && e.html(f.sTitle),
            Qa(a, "header")(a, e, f, n);
            j && ea(a.aoHeader, h);
            g(h).find(">tr").attr("role", "row");
            g(h).find(">tr>th, >tr>td").addClass(n.sHeaderTH);
            g(i).find(">tr>th, >tr>td").addClass(n.sFooterTH);
            if (null !== i) {
                a = a.aoFooter[0];
                b = 0;
                for (c = a.length; b < c; b++) f = l[b],
                f.nTf = a[b].cell,
                f.sClass && g(f.nTf).addClass(f.sClass)
            }
        }
        function fa(a, b, c) {
            var e, d, f, h = [],
            i = [],
            j = a.aoColumns.length,
            n;
            if (b) {
                c === k && (c = !1);
                e = 0;
                for (d = b.length; e < d; e++) {
                    h[e] = b[e].slice();
                    h[e].nTr = b[e].nTr;
                    for (f = j - 1; 0 <= f; f--) ! a.aoColumns[f].bVisible && !c && h[e].splice(f, 1);
                    i.push([])
                }
                e = 0;
                for (d = h.length; e < d; e++) {
                    if (a = h[e].nTr) for (; f = a.firstChild;) a.removeChild(f);
                    f = 0;
                    for (b = h[e].length; f < b; f++) if (n = j = 1, i[e][f] === k) {
                        a.appendChild(h[e][f].cell);
                        for (i[e][f] = 1; h[e + j] !== k && h[e][f].cell == h[e + j][f].cell;) i[e + j][f] = 1,
                        j++;
                        for (; h[e][f + n] !== k && h[e][f].cell == h[e][f + n].cell;) {
                            for (c = 0; c < j; c++) i[e + c][f + n] = 1;
                            n++
                        }
                        g(h[e][f].cell).attr("rowspan", j).attr("colspan", n)
                    }
                }
            }
        }
        function M(a) {
            var b = w(a, "aoPreDrawCallback", "preDraw", [a]);
            if ( - 1 !== g.inArray(!1, b)) C(a, !1);
            else {
                var b = [],
                c = 0,
                e = a.asStripeClasses,
                d = e.length,
                f = a.oLanguage,
                h = a.iInitDisplayStart,
                i = "ssp" == z(a),
                j = a.aiDisplay;
                a.bDrawing = !0;
                h !== k && -1 !== h && (a._iDisplayStart = i ? h: h >= a.fnRecordsDisplay() ? 0 : h, a.iInitDisplayStart = -1);
                var h = a._iDisplayStart,
                n = a.fnDisplayEnd();
                if (a.bDeferLoading) a.bDeferLoading = !1,
                a.iDraw++,
                C(a, !1);
                else if (i) {
                    if (!a.bDestroying && !lb(a)) return
                } else a.iDraw++;
                if (0 !== j.length) {
                    f = i ? a.aoData.length: n;
                    for (i = i ? 0 : h; i < f; i++) {
                        var l = j[i],
                        r = a.aoData[l];
                        null === r.nTr && Ka(a, l);
                        l = r.nTr;
                        if (0 !== d) {
                            var q = e[c % d];
                            r._sRowStripe != q && (g(l).removeClass(r._sRowStripe).addClass(q), r._sRowStripe = q)
                        }
                        w(a, "aoRowCallback", null, [l, r._aData, c, i]);
                        b.push(l);
                        c++
                    }
                } else c = f.sZeroRecords,
                1 == a.iDraw && "ajax" == z(a) ? c = f.sLoadingRecords: f.sEmptyTable && 0 === a.fnRecordsTotal() && (c = f.sEmptyTable),
                b[0] = g("<tr/>", {
                    "class": d ? e[0] : ""
                }).append(g("<td />", {
                    valign: "top",
                    colSpan: ba(a),
                    "class": a.oClasses.sRowEmpty
                }).html(c))[0];
                w(a, "aoHeaderCallback", "header", [g(a.nTHead).children("tr")[0], Ma(a), h, n, j]);
                w(a, "aoFooterCallback", "footer", [g(a.nTFoot).children("tr")[0], Ma(a), h, n, j]);
                e = g(a.nTBody);
                e.children().detach();
                e.append(g(b));
                w(a, "aoDrawCallback", "draw", [a]);
                a.bSorted = !1;
                a.bFiltered = !1;
                a.bDrawing = !1
            }
        }
        function R(a, b) {
            var c = a.oFeatures,
            e = c.bFilter;
            c.bSort && mb(a);
            e ? ga(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice(); ! 0 !== b && (a._iDisplayStart = 0);
            a._drawHold = b;
            M(a);
            a._drawHold = !1
        }
        function nb(a) {
            var b = a.oClasses,
            c = g(a.nTable),
            c = g("<div/>").insertBefore(c),
            e = a.oFeatures,
            d = g("<div/>", {
                id: a.sTableId + "_wrapper",
                "class": b.sWrapper + (a.nTFoot ? "": " " + b.sNoFooter)
            });
            a.nHolding = c[0];
            a.nTableWrapper = d[0];
            a.nTableReinsertBefore = a.nTable.nextSibling;
            for (var f = a.sDom.split(""), h, i, j, n, l, r, q = 0; q < f.length; q++) {
                h = null;
                i = f[q];
                if ("<" == i) {
                    j = g("<div/>")[0];
                    n = f[q + 1];
                    if ("'" == n || '"' == n) {
                        l = "";
                        for (r = 2; f[q + r] != n;) l += f[q + r],
                        r++;
                        "H" == l ? l = b.sJUIHeader: "F" == l && (l = b.sJUIFooter); - 1 != l.indexOf(".") ? (n = l.split("."), j.id = n[0].substr(1, n[0].length - 1), j.className = n[1]) : "#" == l.charAt(0) ? j.id = l.substr(1, l.length - 1) : j.className = l;
                        q += r
                    }
                    d.append(j);
                    d = g(j)
                } else if (">" == i) d = d.parent();
                else if ("l" == i && e.bPaginate && e.bLengthChange) h = ob(a);
                else if ("f" == i && e.bFilter) h = pb(a);
                else if ("r" == i && e.bProcessing) h = qb(a);
                else if ("t" == i) h = rb(a);
                else if ("i" == i && e.bInfo) h = sb(a);
                else if ("p" == i && e.bPaginate) h = tb(a);
                else if (0 !== m.ext.feature.length) {
                    j = m.ext.feature;
                    r = 0;
                    for (n = j.length; r < n; r++) if (i == j[r].cFeature) {
                        h = j[r].fnInit(a);
                        break
                    }
                }
                h && (j = a.aanFeatures, j[i] || (j[i] = []), j[i].push(h), d.append(h))
            }
            c.replaceWith(d);
            a.nHolding = null
        }
        function ea(a, b) {
            var c = g(b).children("tr"),
            e,
            d,
            f,
            h,
            i,
            j,
            n,
            l,
            r,
            q;
            a.splice(0, a.length);
            f = 0;
            for (j = c.length; f < j; f++) a.push([]);
            f = 0;
            for (j = c.length; f < j; f++) {
                e = c[f];
                for (d = e.firstChild; d;) {
                    if ("TD" == d.nodeName.toUpperCase() || "TH" == d.nodeName.toUpperCase()) {
                        l = 1 * d.getAttribute("colspan");
                        r = 1 * d.getAttribute("rowspan");
                        l = !l || 0 === l || 1 === l ? 1 : l;
                        r = !r || 0 === r || 1 === r ? 1 : r;
                        h = 0;
                        for (i = a[f]; i[h];) h++;
                        n = h;
                        q = 1 === l ? !0 : !1;
                        for (i = 0; i < l; i++) for (h = 0; h < r; h++) a[f + h][n + i] = {
                            cell: d,
                            unique: q
                        },
                        a[f + h].nTr = e
                    }
                    d = d.nextSibling
                }
            }
        }
        function qa(a, b, c) {
            var e = [];
            c || (c = a.aoHeader, b && (c = [], ea(c, b)));
            for (var b = 0,
            d = c.length; b < d; b++) for (var f = 0,
            h = c[b].length; f < h; f++) if (c[b][f].unique && (!e[f] || !a.bSortCellsTop)) e[f] = c[b][f].cell;
            return e
        }
        function ra(a, b, c) {
            w(a, "aoServerParams", "serverParams", [b]);
            if (b && g.isArray(b)) {
                var e = {},
                d = /(.*?)\[\]$/;
                g.each(b,
                function(a, b) {
                    var c = b.name.match(d);
                    c ? (c = c[0], e[c] || (e[c] = []), e[c].push(b.value)) : e[b.name] = b.value
                });
                b = e
            }
            var f, h = a.ajax,
            i = a.oInstance,
            j = function(b) {
                w(a, null, "xhr", [a, b, a.jqXHR]);
                c(b)
            };
            if (g.isPlainObject(h) && h.data) {
                f = h.data;
                var n = g.isFunction(f) ? f(b, a) : f,
                b = g.isFunction(f) && n ? n: g.extend(!0, b, n);
                delete h.data
            }
            n = {
                data: b,
                success: function(b) {
                    var c = b.error || b.sError;
                    c && J(a, 0, c);
                    a.json = b;
                    j(b)
                },
                dataType: "json",
                cache: !1,
                type: a.sServerMethod,
                error: function(b, c) {
                    var f = w(a, null, "xhr", [a, null, a.jqXHR]); - 1 === g.inArray(!0, f) && ("parsererror" == c ? J(a, 0, "Invalid JSON response", 1) : 4 === b.readyState && J(a, 0, "Ajax error", 7));
                    C(a, !1)
                }
            };
            a.oAjaxData = b;
            w(a, null, "preXhr", [a, b]);
            a.fnServerData ? a.fnServerData.call(i, a.sAjaxSource, g.map(b,
            function(a, b) {
                return {
                    name: b,
                    value: a
                }
            }), j, a) : a.sAjaxSource || "string" === typeof h ? a.jqXHR = g.ajax(g.extend(n, {
                url: h || a.sAjaxSource
            })) : g.isFunction(h) ? a.jqXHR = h.call(i, b, j, a) : (a.jqXHR = g.ajax(g.extend(n, h)), h.data = f)
        }
        function lb(a) {
            return a.bAjaxDataGet ? (a.iDraw++, C(a, !0), ra(a, ub(a),
            function(b) {
                vb(a, b)
            }), !1) : !0
        }
        function ub(a) {
            var b = a.aoColumns,
            c = b.length,
            e = a.oFeatures,
            d = a.oPreviousSearch,
            f = a.aoPreSearchCols,
            h, i = [],
            j,
            n,
            l,
            r = V(a);
            h = a._iDisplayStart;
            j = !1 !== e.bPaginate ? a._iDisplayLength: -1;
            var q = function(a, b) {
                i.push({
                    name: a,
                    value: b
                })
            };
            q("sEcho", a.iDraw);
            q("iColumns", c);
            q("sColumns", D(b, "sName").join(","));
            q("iDisplayStart", h);
            q("iDisplayLength", j);
            var k = {
                draw: a.iDraw,
                columns: [],
                order: [],
                start: h,
                length: j,
                search: {
                    value: d.sSearch,
                    regex: d.bRegex
                }
            };
            for (h = 0; h < c; h++) n = b[h],
            l = f[h],
            j = "function" == typeof n.mData ? "function": n.mData,
            k.columns.push({
                data: j,
                name: n.sName,
                searchable: n.bSearchable,
                orderable: n.bSortable,
                search: {
                    value: l.sSearch,
                    regex: l.bRegex
                }
            }),
            q("mDataProp_" + h, j),
            e.bFilter && (q("sSearch_" + h, l.sSearch), q("bRegex_" + h, l.bRegex), q("bSearchable_" + h, n.bSearchable)),
            e.bSort && q("bSortable_" + h, n.bSortable);
            e.bFilter && (q("sSearch", d.sSearch), q("bRegex", d.bRegex));
            e.bSort && (g.each(r,
            function(a, b) {
                k.order.push({
                    column: b.col,
                    dir: b.dir
                });
                q("iSortCol_" + a, b.col);
                q("sSortDir_" + a, b.dir)
            }), q("iSortingCols", r.length));
            b = m.ext.legacy.ajax;
            return null === b ? a.sAjaxSource ? i: k: b ? i: k
        }
        function vb(a, b) {
            var c = sa(a, b),
            e = b.sEcho !== k ? b.sEcho: b.draw,
            d = b.iTotalRecords !== k ? b.iTotalRecords: b.recordsTotal,
            f = b.iTotalDisplayRecords !== k ? b.iTotalDisplayRecords: b.recordsFiltered;
            if (e) {
                if (1 * e < a.iDraw) return;
                a.iDraw = 1 * e
            }
            oa(a);
            a._iRecordsTotal = parseInt(d, 10);
            a._iRecordsDisplay = parseInt(f, 10);
            e = 0;
            for (d = c.length; e < d; e++) L(a, c[e]);
            a.aiDisplay = a.aiDisplayMaster.slice();
            a.bAjaxDataGet = !1;
            M(a);
            a._bInitComplete || ta(a, b);
            a.bAjaxDataGet = !0;
            C(a, !1)
        }
        function sa(a, b) {
            var c = g.isPlainObject(a.ajax) && a.ajax.dataSrc !== k ? a.ajax.dataSrc: a.sAjaxDataProp;
            return "data" === c ? b.aaData || b[c] : "" !== c ? P(c)(b) : b
        }
        function pb(a) {
            var b = a.oClasses,
            c = a.sTableId,
            e = a.oLanguage,
            d = a.oPreviousSearch,
            f = a.aanFeatures,
            h = '<input type="search" class="' + b.sFilterInput + '"/>',
            i = e.sSearch,
            i = i.match(/_INPUT_/) ? i.replace("_INPUT_", h) : i + h,
            b = g("<div/>", {
                id: !f.f ? c + "_filter": null,
                "class": b.sFilter
            }).append(g("<label/>").append(i)),
            f = function() {
                var b = !this.value ? "": this.value;
                b != d.sSearch && (ga(a, {
                    sSearch: b,
                    bRegex: d.bRegex,
                    bSmart: d.bSmart,
                    bCaseInsensitive: d.bCaseInsensitive
                }), a._iDisplayStart = 0, M(a))
            },
            h = null !== a.searchDelay ? a.searchDelay: "ssp" === z(a) ? 400 : 0,
            j = g("input", b).val(d.sSearch).attr("placeholder", e.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT", h ? ua(f, h) : f).bind("keypress.DT",
            function(a) {
                if (13 == a.keyCode) return ! 1
            }).attr("aria-controls", c);
            g(a.nTable).on("search.dt.DT",
            function(b, c) {
                if (a === c) try {
                    j[0] !== T.activeElement && j.val(d.sSearch)
                } catch(f) {}
            });
            return b[0]
        }
        function ga(a, b, c) {
            var e = a.oPreviousSearch,
            d = a.aoPreSearchCols,
            f = function(a) {
                e.sSearch = a.sSearch;
                e.bRegex = a.bRegex;
                e.bSmart = a.bSmart;
                e.bCaseInsensitive = a.bCaseInsensitive
            };
            Ia(a);
            if ("ssp" != z(a)) {
                wb(a, b.sSearch, c, b.bEscapeRegex !== k ? !b.bEscapeRegex: b.bRegex, b.bSmart, b.bCaseInsensitive);
                f(b);
                for (b = 0; b < d.length; b++) xb(a, d[b].sSearch, b, d[b].bEscapeRegex !== k ? !d[b].bEscapeRegex: d[b].bRegex, d[b].bSmart, d[b].bCaseInsensitive);
                yb(a)
            } else f(b);
            a.bFiltered = !0;
            w(a, null, "search", [a])
        }
        function yb(a) {
            for (var b = m.ext.search,
            c = a.aiDisplay,
            e, d, f = 0,
            h = b.length; f < h; f++) {
                for (var i = [], j = 0, g = c.length; j < g; j++) d = c[j],
                e = a.aoData[d],
                b[f](a, e._aFilterData, d, e._aData, j) && i.push(d);
                c.length = 0;
                c.push.apply(c, i)
            }
        }
        function xb(a, b, c, e, d, f) {
            if ("" !== b) for (var h = a.aiDisplay,
            e = Ra(b, e, d, f), d = h.length - 1; 0 <= d; d--) b = a.aoData[h[d]]._aFilterData[c],
            e.test(b) || h.splice(d, 1)
        }
        function wb(a, b, c, e, d, f) {
            var e = Ra(b, e, d, f),
            d = a.oPreviousSearch.sSearch,
            f = a.aiDisplayMaster,
            h;
            0 !== m.ext.search.length && (c = !0);
            h = zb(a);
            if (0 >= b.length) a.aiDisplay = f.slice();
            else {
                if (h || c || d.length > b.length || 0 !== b.indexOf(d) || a.bSorted) a.aiDisplay = f.slice();
                b = a.aiDisplay;
                for (c = b.length - 1; 0 <= c; c--) e.test(a.aoData[b[c]]._sFilterRow) || b.splice(c, 1)
            }
        }
        function Ra(a, b, c, e) {
            a = b ? a: va(a);
            c && (a = "^(?=.*?" + g.map(a.match(/"[^"]+"|[^ ]+/g) || [""],
            function(a) {
                if ('"' === a.charAt(0)) var b = a.match(/^"(.*)"$/),
                a = b ? b[1] : a;
                return a.replace('"', "")
            }).join(")(?=.*?") + ").*$");
            return RegExp(a, e ? "i": "")
        }
        function va(a) {
            return a.replace(Zb, "\\$1")
        }
        function zb(a) {
            var b = a.aoColumns,
            c, e, d, f, h, i, j, g, l = m.ext.type.search;
            c = !1;
            e = 0;
            for (f = a.aoData.length; e < f; e++) if (g = a.aoData[e], !g._aFilterData) {
                i = [];
                d = 0;
                for (h = b.length; d < h; d++) c = b[d],
                c.bSearchable ? (j = y(a, e, d, "filter"), l[c.sType] && (j = l[c.sType](j)), null === j && (j = ""), "string" !== typeof j && j.toString && (j = j.toString())) : j = "",
                j.indexOf && -1 !== j.indexOf("&") && (wa.innerHTML = j, j = $b ? wa.textContent: wa.innerText),
                j.replace && (j = j.replace(/[\r\n]/g, "")),
                i.push(j);
                g._aFilterData = i;
                g._sFilterRow = i.join("  ");
                c = !0
            }
            return c
        }
        function Ab(a) {
            return {
                search: a.sSearch,
                smart: a.bSmart,
                regex: a.bRegex,
                caseInsensitive: a.bCaseInsensitive
            }
        }
        function Bb(a) {
            return {
                sSearch: a.search,
                bSmart: a.smart,
                bRegex: a.regex,
                bCaseInsensitive: a.caseInsensitive
            }
        }
        function sb(a) {
            var b = a.sTableId,
            c = a.aanFeatures.i,
            e = g("<div/>", {
                "class": a.oClasses.sInfo,
                id: !c ? b + "_info": null
            });
            c || (a.aoDrawCallback.push({
                fn: Cb,
                sName: "information"
            }), e.attr("role", "status").attr("aria-live", "polite"), g(a.nTable).attr("aria-describedby", b + "_info"));
            return e[0]
        }
        function Cb(a) {
            var b = a.aanFeatures.i;
            if (0 !== b.length) {
                var c = a.oLanguage,
                e = a._iDisplayStart + 1,
                d = a.fnDisplayEnd(),
                f = a.fnRecordsTotal(),
                h = a.fnRecordsDisplay(),
                i = h ? c.sInfo: c.sInfoEmpty;
                h !== f && (i += " " + c.sInfoFiltered);
                i += c.sInfoPostFix;
                i = Db(a, i);
                c = c.fnInfoCallback;
                null !== c && (i = c.call(a.oInstance, a, e, d, f, h, i));
                g(b).html(i)
            }
        }
        function Db(a, b) {
            var c = a.fnFormatNumber,
            e = a._iDisplayStart + 1,
            d = a._iDisplayLength,
            f = a.fnRecordsDisplay(),
            h = -1 === d;
            return b.replace(/_START_/g, c.call(a, e)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a, f)).replace(/_PAGE_/g, c.call(a, h ? 1 : Math.ceil(e / d))).replace(/_PAGES_/g, c.call(a, h ? 1 : Math.ceil(f / d)))
        }
        function ha(a) {
            var b, c, e = a.iInitDisplayStart,
            d = a.aoColumns,
            f;
            c = a.oFeatures;
            var h = a.bDeferLoading;
            if (a.bInitialised) {
                nb(a);
                kb(a);
                fa(a, a.aoHeader);
                fa(a, a.aoFooter);
                C(a, !0);
                c.bAutoWidth && Ha(a);
                b = 0;
                for (c = d.length; b < c; b++) f = d[b],
                f.sWidth && (f.nTh.style.width = u(f.sWidth));
                w(a, null, "preInit", [a]);
                R(a);
                d = z(a);
                if ("ssp" != d || h)"ajax" == d ? ra(a, [],
                function(c) {
                    var f = sa(a, c);
                    for (b = 0; b < f.length; b++) L(a, f[b]);
                    a.iInitDisplayStart = e;
                    R(a);
                    C(a, !1);
                    ta(a, c)
                },
                a) : (C(a, !1), ta(a))
            } else setTimeout(function() {
                ha(a)
            },
            200)
        }
        function ta(a, b) {
            a._bInitComplete = !0; (b || a.oInit.aaData) && Y(a);
            w(a, "aoInitComplete", "init", [a, b])
        }
        function Sa(a, b) {
            var c = parseInt(b, 10);
            a._iDisplayLength = c;
            Ta(a);
            w(a, null, "length", [a, c])
        }
        function ob(a) {
            for (var b = a.oClasses,
            c = a.sTableId,
            e = a.aLengthMenu,
            d = g.isArray(e[0]), f = d ? e[0] : e, e = d ? e[1] : e, d = g("<select/>", {
                name: c + "_length",
                "aria-controls": c,
                "class": b.sLengthSelect
            }), h = 0, i = f.length; h < i; h++) d[0][h] = new Option(e[h], f[h]);
            var j = g("<div><label/></div>").addClass(b.sLength);
            a.aanFeatures.l || (j[0].id = c + "_length");
            j.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", d[0].outerHTML));
            g("select", j).val(a._iDisplayLength).bind("change.DT",
            function() {
                Sa(a, g(this).val());
                M(a)
            });
            g(a.nTable).bind("length.dt.DT",
            function(b, c, f) {
                a === c && g("select", j).val(f)
            });
            return j[0]
        }
        function tb(a) {
            var b = a.sPaginationType,
            c = m.ext.pager[b],
            e = "function" === typeof c,
            d = function(a) {
                M(a)
            },
            b = g("<div/>").addClass(a.oClasses.sPaging + b)[0],
            f = a.aanFeatures;
            e || c.fnInit(a, b, d);
            f.p || (b.id = a.sTableId + "_paginate", a.aoDrawCallback.push({
                fn: function(a) {
                    if (e) {
                        var b = a._iDisplayStart,
                        g = a._iDisplayLength,
                        n = a.fnRecordsDisplay(),
                        l = -1 === g,
                        b = l ? 0 : Math.ceil(b / g),
                        g = l ? 1 : Math.ceil(n / g),
                        n = c(b, g),
                        k,
                        l = 0;
                        for (k = f.p.length; l < k; l++) Qa(a, "pageButton")(a, f.p[l], l, n, b, g)
                    } else c.fnUpdate(a, d)
                },
                sName: "pagination"
            }));
            return b
        }
        function Ua(a, b, c) {
            var e = a._iDisplayStart,
            d = a._iDisplayLength,
            f = a.fnRecordsDisplay();
            0 === f || -1 === d ? e = 0 : "number" === typeof b ? (e = b * d, e > f && (e = 0)) : "first" == b ? e = 0 : "previous" == b ? (e = 0 <= d ? e - d: 0, 0 > e && (e = 0)) : "next" == b ? e + d < f && (e += d) : "last" == b ? e = Math.floor((f - 1) / d) * d: J(a, 0, "Unknown paging action: " + b, 5);
            b = a._iDisplayStart !== e;
            a._iDisplayStart = e;
            b && (w(a, null, "page", [a]), c && M(a));
            return b
        }
        function qb(a) {
            return g("<div/>", {
                id: !a.aanFeatures.r ? a.sTableId + "_processing": null,
                "class": a.oClasses.sProcessing
            }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]
        }
        function C(a, b) {
            a.oFeatures.bProcessing && g(a.aanFeatures.r).css("display", b ? "block": "none");
            w(a, null, "processing", [a, b])
        }
        function rb(a) {
            var b = g(a.nTable);
            b.attr("role", "grid");
            var c = a.oScroll;
            if ("" === c.sX && "" === c.sY) return a.nTable;
            var e = c.sX,
            d = c.sY,
            f = a.oClasses,
            h = b.children("caption"),
            i = h.length ? h[0]._captionSide: null,
            j = g(b[0].cloneNode(!1)),
            n = g(b[0].cloneNode(!1)),
            l = b.children("tfoot");
            c.sX && "100%" === b.attr("width") && b.removeAttr("width");
            l.length || (l = null);
            j = g("<div/>", {
                "class": f.sScrollWrapper
            }).append(g("<div/>", {
                "class": f.sScrollHead
            }).css({
                overflow: "hidden",
                position: "relative",
                border: 0,
                width: e ? !e ? null: u(e) : "100%"
            }).append(g("<div/>", {
                "class": f.sScrollHeadInner
            }).css({
                "box-sizing": "content-box",
                width: c.sXInner || "100%"
            }).append(j.removeAttr("id").css("margin-left", 0).append("top" === i ? h: null).append(b.children("thead"))))).append(g("<div/>", {
                "class": f.sScrollBody
            }).css({
                position: "relative",
                overflow: "auto",
                width: !e ? null: u(e)
            }).append(b));
            l && j.append(g("<div/>", {
                "class": f.sScrollFoot
            }).css({
                overflow: "hidden",
                border: 0,
                width: e ? !e ? null: u(e) : "100%"
            }).append(g("<div/>", {
                "class": f.sScrollFootInner
            }).append(n.removeAttr("id").css("margin-left", 0).append("bottom" === i ? h: null).append(b.children("tfoot")))));
            var b = j.children(),
            k = b[0],
            f = b[1],
            q = l ? b[2] : null;
            if (e) g(f).on("scroll.DT",
            function() {
                var a = this.scrollLeft;
                k.scrollLeft = a;
                l && (q.scrollLeft = a)
            });
            g(f).css(d && c.bCollapse ? "max-height": "height", d);
            a.nScrollHead = k;
            a.nScrollBody = f;
            a.nScrollFoot = q;
            a.aoDrawCallback.push({
                fn: Z,
                sName: "scrolling"
            });
            return j[0]
        }
        function Z(a) {
            var b = a.oScroll,
            c = b.sX,
            e = b.sXInner,
            d = b.sY,
            b = b.iBarWidth,
            f = g(a.nScrollHead),
            h = f[0].style,
            i = f.children("div"),
            j = i[0].style,
            n = i.children("table"),
            i = a.nScrollBody,
            l = g(i),
            k = i.style,
            q = g(a.nScrollFoot).children("div"),
            m = q.children("table"),
            o = g(a.nTHead),
            E = g(a.nTable),
            p = E[0],
            t = p.style,
            N = a.nTFoot ? g(a.nTFoot) : null,
            Eb = a.oBrowser,
            w = Eb.bScrollOversize,
            s,
            v,
            O,
            x,
            y = [],
            z = [],
            A = [],
            B,
            C = function(a) {
                a = a.style;
                a.paddingTop = "0";
                a.paddingBottom = "0";
                a.borderTopWidth = "0";
                a.borderBottomWidth = "0";
                a.height = 0
            };
            E.children("thead, tfoot").remove();
            x = o.clone().prependTo(E);
            o = o.find("tr");
            v = x.find("tr");
            x.find("th, td").removeAttr("tabindex");
            N && (O = N.clone().prependTo(E), s = N.find("tr"), O = O.find("tr"));
            c || (k.width = "100%", f[0].style.width = "100%");
            g.each(qa(a, x),
            function(b, c) {
                B = la(a, b);
                c.style.width = a.aoColumns[B].sWidth
            });
            N && H(function(a) {
                a.style.width = ""
            },
            O);
            f = E.outerWidth();
            if ("" === c) {
                t.width = "100%";
                if (w && (E.find("tbody").height() > i.offsetHeight || "scroll" == l.css("overflow-y"))) t.width = u(E.outerWidth() - b);
                f = E.outerWidth()
            } else "" !== e && (t.width = u(e), f = E.outerWidth());
            H(C, v);
            H(function(a) {
                A.push(a.innerHTML);
                y.push(u(g(a).css("width")))
            },
            v);
            H(function(a, b) {
                a.style.width = y[b]
            },
            o);
            g(v).height(0);
            N && (H(C, O), H(function(a) {
                z.push(u(g(a).css("width")))
            },
            O), H(function(a, b) {
                a.style.width = z[b]
            },
            s), g(O).height(0));
            H(function(a, b) {
                a.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + A[b] + "</div>";
                a.style.width = y[b]
            },
            v);
            N && H(function(a, b) {
                a.innerHTML = "";
                a.style.width = z[b]
            },
            O);
            if (E.outerWidth() < f) {
                s = i.scrollHeight > i.offsetHeight || "scroll" == l.css("overflow-y") ? f + b: f;
                if (w && (i.scrollHeight > i.offsetHeight || "scroll" == l.css("overflow-y"))) t.width = u(s - b); ("" === c || "" !== e) && J(a, 1, "Possible column misalignment", 6)
            } else s = "100%";
            k.width = u(s);
            h.width = u(s);
            N && (a.nScrollFoot.style.width = u(s)); ! d && w && (k.height = u(p.offsetHeight + b));
            c = E.outerWidth();
            n[0].style.width = u(c);
            j.width = u(c);
            e = E.height() > i.clientHeight || "scroll" == l.css("overflow-y");
            d = "padding" + (Eb.bScrollbarLeft ? "Left": "Right");
            j[d] = e ? b + "px": "0px";
            N && (m[0].style.width = u(c), q[0].style.width = u(c), q[0].style[d] = e ? b + "px": "0px");
            l.scroll();
            if ((a.bSorted || a.bFiltered) && !a._drawHold) i.scrollTop = 0
        }
        function H(a, b, c) {
            for (var e = 0,
            d = 0,
            f = b.length,
            h, i; d < f;) {
                h = b[d].firstChild;
                for (i = c ? c[d].firstChild: null; h;) 1 === h.nodeType && (c ? a(h, i, e) : a(h, e), e++),
                h = h.nextSibling,
                i = c ? i.nextSibling: null;
                d++
            }
        }
        function Ha(a) {
            var b = a.nTable,
            c = a.aoColumns,
            e = a.oScroll,
            d = e.sY,
            f = e.sX,
            h = e.sXInner,
            i = c.length,
            j = $(a, "bVisible"),
            n = g("th", a.nTHead),
            l = b.getAttribute("width"),
            k = b.parentNode,
            q = !1,
            m,
            o,
            p;
            p = a.oBrowser;
            e = p.bScrollOversize; (m = b.style.width) && -1 !== m.indexOf("%") && (l = m);
            for (m = 0; m < j.length; m++) o = c[j[m]],
            null !== o.sWidth && (o.sWidth = Fb(o.sWidthOrig, k), q = !0);
            if (e || !q && !f && !d && i == ba(a) && i == n.length) for (m = 0; m < i; m++) c[m].sWidth = u(n.eq(m).width());
            else {
                i = g(b).clone().css("visibility", "hidden").removeAttr("id");
                i.find("tbody tr").remove();
                var t = g("<tr/>").appendTo(i.find("tbody"));
                i.find("thead, tfoot").remove();
                i.append(g(a.nTHead).clone()).append(g(a.nTFoot).clone());
                i.find("tfoot th, tfoot td").css("width", "");
                n = qa(a, i.find("thead")[0]);
                for (m = 0; m < j.length; m++) o = c[j[m]],
                n[m].style.width = null !== o.sWidthOrig && "" !== o.sWidthOrig ? u(o.sWidthOrig) : "";
                if (a.aoData.length) for (m = 0; m < j.length; m++) q = j[m],
                o = c[q],
                g(Gb(a, q)).clone(!1).append(o.sContentPadding).appendTo(t);
                q = g("<div/>").css(f || d ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 1,
                    right: 0,
                    overflow: "hidden"
                }: {}).append(i).appendTo(k);
                f && h ? i.width(h) : f ? (i.css("width", "auto"), i.width() < k.clientWidth && i.width(k.clientWidth)) : d ? i.width(k.clientWidth) : l && i.width(l);
                if (f) {
                    for (m = h = 0; m < j.length; m++) o = c[j[m]],
                    d = p.bBounding ? n[m].getBoundingClientRect().width: g(n[m]).outerWidth(),
                    h += null === o.sWidthOrig ? d: parseInt(o.sWidth, 10) + d - g(n[m]).width();
                    i.width(u(h));
                    b.style.width = u(h)
                }
                for (m = 0; m < j.length; m++) if (o = c[j[m]], p = g(n[m]).width()) o.sWidth = u(p);
                b.style.width = u(i.css("width"));
                q.remove()
            }
            l && (b.style.width = u(l));
            if ((l || f) && !a._reszEvt) b = function() {
                g(Fa).bind("resize.DT-" + a.sInstance, ua(function() {
                    Y(a)
                }))
            },
            e ? setTimeout(b, 1E3) : b(),
            a._reszEvt = !0
        }
        function ua(a, b) {
            var c = b !== k ? b: 200,
            e,
            d;
            return function() {
                var b = this,
                h = +new Date,
                i = arguments;
                e && h < e + c ? (clearTimeout(d), d = setTimeout(function() {
                    e = k;
                    a.apply(b, i)
                },
                c)) : (e = h, a.apply(b, i))
            }
        }
        function Fb(a, b) {
            if (!a) return 0;
            var c = g("<div/>").css("width", u(a)).appendTo(b || T.body),
            e = c[0].offsetWidth;
            c.remove();
            return e
        }
        function Gb(a, b) {
            var c = Hb(a, b);
            if (0 > c) return null;
            var e = a.aoData[c];
            return ! e.nTr ? g("<td/>").html(y(a, c, b, "display"))[0] : e.anCells[b]
        }
        function Hb(a, b) {
            for (var c, e = -1,
            d = -1,
            f = 0,
            h = a.aoData.length; f < h; f++) c = y(a, f, b, "display") + "",
            c = c.replace(ac, ""),
            c.length > e && (e = c.length, d = f);
            return d
        }
        function u(a) {
            return null === a ? "0px": "number" == typeof a ? 0 > a ? "0px": a + "px": a.match(/\d$/) ? a + "px": a
        }
        function Ib() {
            var a = m.__scrollbarWidth;
            if (a === k) {
                var b = g("<p/>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 150,
                    padding: 0,
                    overflow: "scroll",
                    visibility: "hidden"
                }).appendTo("body"),
                a = b[0].offsetWidth - b[0].clientWidth;
                m.__scrollbarWidth = a;
                b.remove()
            }
            return a
        }
        function V(a) {
            var b, c, e = [],
            d = a.aoColumns,
            f,
            h,
            i,
            j;
            b = a.aaSortingFixed;
            c = g.isPlainObject(b);
            var n = [];
            f = function(a) {
                a.length && !g.isArray(a[0]) ? n.push(a) : n.push.apply(n, a)
            };
            g.isArray(b) && f(b);
            c && b.pre && f(b.pre);
            f(a.aaSorting);
            c && b.post && f(b.post);
            for (a = 0; a < n.length; a++) {
                j = n[a][0];
                f = d[j].aDataSort;
                b = 0;
                for (c = f.length; b < c; b++) h = f[b],
                i = d[h].sType || "string",
                n[a]._idx === k && (n[a]._idx = g.inArray(n[a][1], d[h].asSorting)),
                e.push({
                    src: j,
                    col: h,
                    dir: n[a][1],
                    index: n[a]._idx,
                    type: i,
                    formatter: m.ext.type.order[i + "-pre"]
                })
            }
            return e
        }
        function mb(a) {
            var b, c, e = [],
            d = m.ext.type.order,
            f = a.aoData,
            h = 0,
            i,
            g = a.aiDisplayMaster,
            n;
            Ia(a);
            n = V(a);
            b = 0;
            for (c = n.length; b < c; b++) i = n[b],
            i.formatter && h++,
            Jb(a, i.col);
            if ("ssp" != z(a) && 0 !== n.length) {
                b = 0;
                for (c = g.length; b < c; b++) e[g[b]] = b;
                h === n.length ? g.sort(function(a, b) {
                    var c, d, h, i, g = n.length,
                    j = f[a]._aSortData,
                    k = f[b]._aSortData;
                    for (h = 0; h < g; h++) if (i = n[h], c = j[i.col], d = k[i.col], c = c < d ? -1 : c > d ? 1 : 0, 0 !== c) return "asc" === i.dir ? c: -c;
                    c = e[a];
                    d = e[b];
                    return c < d ? -1 : c > d ? 1 : 0
                }) : g.sort(function(a, b) {
                    var c, h, i, g, j = n.length,
                    k = f[a]._aSortData,
                    m = f[b]._aSortData;
                    for (i = 0; i < j; i++) if (g = n[i], c = k[g.col], h = m[g.col], g = d[g.type + "-" + g.dir] || d["string-" + g.dir], c = g(c, h), 0 !== c) return c;
                    c = e[a];
                    h = e[b];
                    return c < h ? -1 : c > h ? 1 : 0
                })
            }
            a.bSorted = !0
        }
        function Kb(a) {
            for (var b, c, e = a.aoColumns,
            d = V(a), a = a.oLanguage.oAria, f = 0, h = e.length; f < h; f++) {
                c = e[f];
                var i = c.asSorting;
                b = c.sTitle.replace(/<.*?>/g, "");
                var g = c.nTh;
                g.removeAttribute("aria-sort");
                c.bSortable && (0 < d.length && d[0].col == f ? (g.setAttribute("aria-sort", "asc" == d[0].dir ? "ascending": "descending"), c = i[d[0].index + 1] || i[0]) : c = i[0], b += "asc" === c ? a.sSortAscending: a.sSortDescending);
                g.setAttribute("aria-label", b)
            }
        }
        function Va(a, b, c, e) {
            var d = a.aaSorting,
            f = a.aoColumns[b].asSorting,
            h = function(a, b) {
                var c = a._idx;
                c === k && (c = g.inArray(a[1], f));
                return c + 1 < f.length ? c + 1 : b ? null: 0
            };
            "number" === typeof d[0] && (d = a.aaSorting = [d]);
            c && a.oFeatures.bSortMulti ? (c = g.inArray(b, D(d, "0")), -1 !== c ? (b = h(d[c], !0), null === b && 1 === d.length && (b = 0), null === b ? d.splice(c, 1) : (d[c][1] = f[b], d[c]._idx = b)) : (d.push([b, f[0], 0]), d[d.length - 1]._idx = 0)) : d.length && d[0][0] == b ? (b = h(d[0]), d.length = 1, d[0][1] = f[b], d[0]._idx = b) : (d.length = 0, d.push([b, f[0]]), d[0]._idx = 0);
            R(a);
            "function" == typeof e && e(a)
        }
        function Pa(a, b, c, e) {
            var d = a.aoColumns[c];
            Wa(b, {},
            function(b) { ! 1 !== d.bSortable && (a.oFeatures.bProcessing ? (C(a, !0), setTimeout(function() {
                    Va(a, c, b.shiftKey, e);
                    "ssp" !== z(a) && C(a, !1)
                },
                0)) : Va(a, c, b.shiftKey, e))
            })
        }
        function xa(a) {
            var b = a.aLastSort,
            c = a.oClasses.sSortColumn,
            e = V(a),
            d = a.oFeatures,
            f,
            h;
            if (d.bSort && d.bSortClasses) {
                d = 0;
                for (f = b.length; d < f; d++) h = b[d].src,
                g(D(a.aoData, "anCells", h)).removeClass(c + (2 > d ? d + 1 : 3));
                d = 0;
                for (f = e.length; d < f; d++) h = e[d].src,
                g(D(a.aoData, "anCells", h)).addClass(c + (2 > d ? d + 1 : 3))
            }
            a.aLastSort = e
        }
        function Jb(a, b) {
            var c = a.aoColumns[b],
            e = m.ext.order[c.sSortDataType],
            d;
            e && (d = e.call(a.oInstance, a, b, aa(a, b)));
            for (var f, h = m.ext.type.order[c.sType + "-pre"], i = 0, g = a.aoData.length; i < g; i++) if (c = a.aoData[i], c._aSortData || (c._aSortData = []), !c._aSortData[b] || e) f = e ? d[i] : y(a, i, b, "sort"),
            c._aSortData[b] = h ? h(f) : f
        }
        function ya(a) {
            if (a.oFeatures.bStateSave && !a.bDestroying) {
                var b = {
                    time: +new Date,
                    start: a._iDisplayStart,
                    length: a._iDisplayLength,
                    order: g.extend(!0, [], a.aaSorting),
                    search: Ab(a.oPreviousSearch),
                    columns: g.map(a.aoColumns,
                    function(b, e) {
                        return {
                            visible: b.bVisible,
                            search: Ab(a.aoPreSearchCols[e])
                        }
                    })
                };
                w(a, "aoStateSaveParams", "stateSaveParams", [a, b]);
                a.oSavedState = b;
                a.fnStateSaveCallback.call(a.oInstance, a, b)
            }
        }
        function Lb(a) {
            var b, c, e = a.aoColumns;
            if (a.oFeatures.bStateSave) {
                var d = a.fnStateLoadCallback.call(a.oInstance, a);
                if (d && d.time && (b = w(a, "aoStateLoadParams", "stateLoadParams", [a, d]), -1 === g.inArray(!1, b) && (b = a.iStateDuration, !(0 < b && d.time < +new Date - 1E3 * b) && e.length === d.columns.length))) {
                    a.oLoadedState = g.extend(!0, {},
                    d);
                    d.start !== k && (a._iDisplayStart = d.start, a.iInitDisplayStart = d.start);
                    d.length !== k && (a._iDisplayLength = d.length);
                    d.order !== k && (a.aaSorting = [], g.each(d.order,
                    function(b, c) {
                        a.aaSorting.push(c[0] >= e.length ? [0, c[1]] : c)
                    }));
                    d.search !== k && g.extend(a.oPreviousSearch, Bb(d.search));
                    b = 0;
                    for (c = d.columns.length; b < c; b++) {
                        var f = d.columns[b];
                        f.visible !== k && (e[b].bVisible = f.visible);
                        f.search !== k && g.extend(a.aoPreSearchCols[b], Bb(f.search))
                    }
                    w(a, "aoStateLoaded", "stateLoaded", [a, d])
                }
            }
        }
        function za(a) {
            var b = m.settings,
            a = g.inArray(a, D(b, "nTable"));
            return - 1 !== a ? b[a] : null
        }
        function J(a, b, c, e) {
            c = "DataTables warning: " + (a ? "table id=" + a.sTableId + " - ": "") + c;
            e && (c += ". For more information about this error, please see http://datatables.net/tn/" + e);
            if (b) Fa.console && console.log && console.log(c);
            else if (b = m.ext, b = b.sErrMode || b.errMode, a && w(a, null, "error", [a, e, c]), "alert" == b) alert(c);
            else {
                if ("throw" == b) throw Error(c);
                "function" == typeof b && b(a, e, c)
            }
        }
        function F(a, b, c, e) {
            g.isArray(c) ? g.each(c,
            function(c, f) {
                g.isArray(f) ? F(a, b, f[0], f[1]) : F(a, b, f)
            }) : (e === k && (e = c), b[c] !== k && (a[e] = b[c]))
        }
        function Mb(a, b, c) {
            var e, d;
            for (d in b) b.hasOwnProperty(d) && (e = b[d], g.isPlainObject(e) ? (g.isPlainObject(a[d]) || (a[d] = {}), g.extend(!0, a[d], e)) : a[d] = c && "data" !== d && "aaData" !== d && g.isArray(e) ? e.slice() : e);
            return a
        }
        function Wa(a, b, c) {
            g(a).bind("click.DT", b,
            function(b) {
                a.blur();
                c(b)
            }).bind("keypress.DT", b,
            function(a) {
                13 === a.which && (a.preventDefault(), c(a))
            }).bind("selectstart.DT",
            function() {
                return ! 1
            })
        }
        function A(a, b, c, e) {
            c && a[b].push({
                fn: c,
                sName: e
            })
        }
        function w(a, b, c, e) {
            var d = [];
            b && (d = g.map(a[b].slice().reverse(),
            function(b) {
                return b.fn.apply(a.oInstance, e)
            }));
            null !== c && (b = g.Event(c + ".dt"), g(a.nTable).trigger(b, e), d.push(b.result));
            return d
        }
        function Ta(a) {
            var b = a._iDisplayStart,
            c = a.fnDisplayEnd(),
            e = a._iDisplayLength;
            b >= c && (b = c - e);
            b -= b % e;
            if ( - 1 === e || 0 > b) b = 0;
            a._iDisplayStart = b
        }
        function Qa(a, b) {
            var c = a.renderer,
            e = m.ext.renderer[b];
            return g.isPlainObject(c) && c[b] ? e[c[b]] || e._: "string" === typeof c ? e[c] || e._: e._
        }
        function z(a) {
            return a.oFeatures.bServerSide ? "ssp": a.ajax || a.sAjaxSource ? "ajax": "dom"
        }
        function Aa(a, b) {
            var c = [],
            c = Nb.numbers_length,
            e = Math.floor(c / 2);
            b <= c ? c = W(0, b) : a <= e ? (c = W(0, c - 2), c.push("ellipsis"), c.push(b - 1)) : (a >= b - 1 - e ? c = W(b - (c - 2), b) : (c = W(a - e + 2, a + e - 1), c.push("ellipsis"), c.push(b - 1)), c.splice(0, 0, "ellipsis"), c.splice(0, 0, 0));
            c.DT_el = "span";
            return c
        }
        function db(a) {
            g.each({
                num: function(b) {
                    return Ba(b, a)
                },
                "num-fmt": function(b) {
                    return Ba(b, a, Xa)
                },
                "html-num": function(b) {
                    return Ba(b, a, Ca)
                },
                "html-num-fmt": function(b) {
                    return Ba(b, a, Ca, Xa)
                }
            },
            function(b, c) {
                v.type.order[b + a + "-pre"] = c;
                b.match(/^html\-/) && (v.type.search[b + a] = v.type.search.html)
            })
        }
        function Ob(a) {
            return function() {
                var b = [za(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                return m.ext.internal[a].apply(this, b)
            }
        }
        var m, v, t, p, s, Ya = {},
        Pb = /[\r\n]/g,
        Ca = /<.*?>/g,
        bc = /^[\w\+\-]/,
        cc = /[\w\+\-]$/,
        Zb = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"),
        Xa = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,
        K = function(a) {
            return ! a || !0 === a || "-" === a ? !0 : !1
        },
        Qb = function(a) {
            var b = parseInt(a, 10);
            return ! isNaN(b) && isFinite(a) ? b: null
        },
        Rb = function(a, b) {
            Ya[b] || (Ya[b] = RegExp(va(b), "g"));
            return "string" === typeof a && "." !== b ? a.replace(/\./g, "").replace(Ya[b], ".") : a
        },
        Za = function(a, b, c) {
            var e = "string" === typeof a;
            if (K(a)) return ! 0;
            b && e && (a = Rb(a, b));
            c && e && (a = a.replace(Xa, ""));
            return ! isNaN(parseFloat(a)) && isFinite(a)
        },
        Sb = function(a, b, c) {
            return K(a) ? !0 : !(K(a) || "string" === typeof a) ? null: Za(a.replace(Ca, ""), b, c) ? !0 : null
        },
        D = function(a, b, c) {
            var e = [],
            d = 0,
            f = a.length;
            if (c !== k) for (; d < f; d++) a[d] && a[d][b] && e.push(a[d][b][c]);
            else for (; d < f; d++) a[d] && e.push(a[d][b]);
            return e
        },
        ia = function(a, b, c, e) {
            var d = [],
            f = 0,
            h = b.length;
            if (e !== k) for (; f < h; f++) a[b[f]][c] && d.push(a[b[f]][c][e]);
            else for (; f < h; f++) d.push(a[b[f]][c]);
            return d
        },
        W = function(a, b) {
            var c = [],
            e;
            b === k ? (b = 0, e = a) : (e = b, b = a);
            for (var d = b; d < e; d++) c.push(d);
            return c
        },
        Tb = function(a) {
            for (var b = [], c = 0, e = a.length; c < e; c++) a[c] && b.push(a[c]);
            return b
        },
        Oa = function(a) {
            var b = [],
            c,
            e,
            d = a.length,
            f,
            h = 0;
            e = 0;
            a: for (; e < d; e++) {
                c = a[e];
                for (f = 0; f < h; f++) if (b[f] === c) continue a;
                b.push(c);
                h++
            }
            return b
        },
        B = function(a, b, c) {
            a[b] !== k && (a[c] = a[b])
        },
        ca = /\[.*?\]$/,
        U = /\(\)$/,
        wa = g("<div>")[0],
        $b = wa.textContent !== k,
        ac = /<.*?>/g;
        m = function(a) {
            this.$ = function(a, b) {
                return this.api(!0).$(a, b)
            };
            this._ = function(a, b) {
                return this.api(!0).rows(a, b).data()
            };
            this.api = function(a) {
                return a ? new t(za(this[v.iApiIndex])) : new t(this)
            };
            this.fnAddData = function(a, b) {
                var c = this.api(!0),
                e = g.isArray(a) && (g.isArray(a[0]) || g.isPlainObject(a[0])) ? c.rows.add(a) : c.row.add(a); (b === k || b) && c.draw();
                return e.flatten().toArray()
            };
            this.fnAdjustColumnSizing = function(a) {
                var b = this.api(!0).columns.adjust(),
                c = b.settings()[0],
                e = c.oScroll;
                a === k || a ? b.draw(!1) : ("" !== e.sX || "" !== e.sY) && Z(c)
            };
            this.fnClearTable = function(a) {
                var b = this.api(!0).clear(); (a === k || a) && b.draw()
            };
            this.fnClose = function(a) {
                this.api(!0).row(a).child.hide()
            };
            this.fnDeleteRow = function(a, b, c) {
                var e = this.api(!0),
                a = e.rows(a),
                d = a.settings()[0],
                g = d.aoData[a[0][0]];
                a.remove();
                b && b.call(this, d, g); (c === k || c) && e.draw();
                return g
            };
            this.fnDestroy = function(a) {
                this.api(!0).destroy(a)
            };
            this.fnDraw = function(a) {
                this.api(!0).draw(a)
            };
            this.fnFilter = function(a, b, c, e, d, g) {
                d = this.api(!0);
                null === b || b === k ? d.search(a, c, e, g) : d.column(b).search(a, c, e, g);
                d.draw()
            };
            this.fnGetData = function(a, b) {
                var c = this.api(!0);
                if (a !== k) {
                    var e = a.nodeName ? a.nodeName.toLowerCase() : "";
                    return b !== k || "td" == e || "th" == e ? c.cell(a, b).data() : c.row(a).data() || null
                }
                return c.data().toArray()
            };
            this.fnGetNodes = function(a) {
                var b = this.api(!0);
                return a !== k ? b.row(a).node() : b.rows().nodes().flatten().toArray()
            };
            this.fnGetPosition = function(a) {
                var b = this.api(!0),
                c = a.nodeName.toUpperCase();
                return "TR" == c ? b.row(a).index() : "TD" == c || "TH" == c ? (a = b.cell(a).index(), [a.row, a.columnVisible, a.column]) : null
            };
            this.fnIsOpen = function(a) {
                return this.api(!0).row(a).child.isShown()
            };
            this.fnOpen = function(a, b, c) {
                return this.api(!0).row(a).child(b, c).show().child()[0]
            };
            this.fnPageChange = function(a, b) {
                var c = this.api(!0).page(a); (b === k || b) && c.draw(!1)
            };
            this.fnSetColumnVis = function(a, b, c) {
                a = this.api(!0).column(a).visible(b); (c === k || c) && a.columns.adjust().draw()
            };
            this.fnSettings = function() {
                return za(this[v.iApiIndex])
            };
            this.fnSort = function(a) {
                this.api(!0).order(a).draw()
            };
            this.fnSortListener = function(a, b, c) {
                this.api(!0).order.listener(a, b, c)
            };
            this.fnUpdate = function(a, b, c, e, d) {
                var g = this.api(!0);
                c === k || null === c ? g.row(b).data(a) : g.cell(b, c).data(a); (d === k || d) && g.columns.adjust(); (e === k || e) && g.draw();
                return 0
            };
            this.fnVersionCheck = v.fnVersionCheck;
            var b = this,
            c = a === k,
            e = this.length;
            c && (a = {});
            this.oApi = this.internal = v.internal;
            for (var d in m.ext.internal) d && (this[d] = Ob(d));
            this.each(function() {
                var d = {},
                d = 1 < e ? Mb(d, a, !0) : a,
                h = 0,
                i,
                j = this.getAttribute("id"),
                n = !1,
                l = m.defaults,
                r = g(this);
                if ("table" != this.nodeName.toLowerCase()) J(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                else {
                    eb(l);
                    fb(l.column);
                    I(l, l, !0);
                    I(l.column, l.column, !0);
                    I(l, g.extend(d, r.data()));
                    var q = m.settings,
                    h = 0;
                    for (i = q.length; h < i; h++) {
                        var p = q[h];
                        if (p.nTable == this || p.nTHead.parentNode == this || p.nTFoot && p.nTFoot.parentNode == this) {
                            h = d.bRetrieve !== k ? d.bRetrieve: l.bRetrieve;
                            if (c || h) return p.oInstance;
                            if (d.bDestroy !== k ? d.bDestroy: l.bDestroy) {
                                p.oInstance.fnDestroy();
                                break
                            } else {
                                J(p, 0, "Cannot reinitialise DataTable", 3);
                                return
                            }
                        }
                        if (p.sTableId == this.id) {
                            q.splice(h, 1);
                            break
                        }
                    }
                    if (null === j || "" === j) this.id = j = "DataTables_Table_" + m.ext._unique++;
                    var o = g.extend(!0, {},
                    m.models.oSettings, {
                        sDestroyWidth: r[0].style.width,
                        sInstance: j,
                        sTableId: j
                    });
                    o.nTable = this;
                    o.oApi = b.internal;
                    o.oInit = d;
                    q.push(o);
                    o.oInstance = 1 === b.length ? b: r.dataTable();
                    eb(d);
                    d.oLanguage && S(d.oLanguage);
                    d.aLengthMenu && !d.iDisplayLength && (d.iDisplayLength = g.isArray(d.aLengthMenu[0]) ? d.aLengthMenu[0][0] : d.aLengthMenu[0]);
                    d = Mb(g.extend(!0, {},
                    l), d);
                    F(o.oFeatures, d, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));
                    F(o, d, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"], ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"], ["bJQueryUI", "bJUI"]]);
                    F(o.oScroll, d, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]);
                    F(o.oLanguage, d, "fnInfoCallback");
                    A(o, "aoDrawCallback", d.fnDrawCallback, "user");
                    A(o, "aoServerParams", d.fnServerParams, "user");
                    A(o, "aoStateSaveParams", d.fnStateSaveParams, "user");
                    A(o, "aoStateLoadParams", d.fnStateLoadParams, "user");
                    A(o, "aoStateLoaded", d.fnStateLoaded, "user");
                    A(o, "aoRowCallback", d.fnRowCallback, "user");
                    A(o, "aoRowCreatedCallback", d.fnCreatedRow, "user");
                    A(o, "aoHeaderCallback", d.fnHeaderCallback, "user");
                    A(o, "aoFooterCallback", d.fnFooterCallback, "user");
                    A(o, "aoInitComplete", d.fnInitComplete, "user");
                    A(o, "aoPreDrawCallback", d.fnPreDrawCallback, "user");
                    o.rowIdFn = P(d.rowId);
                    j = o.oClasses;
                    d.bJQueryUI ? (g.extend(j, m.ext.oJUIClasses, d.oClasses), d.sDom === l.sDom && "lfrtip" === l.sDom && (o.sDom = '<"H"lfr>t<"F"ip>'), o.renderer) ? g.isPlainObject(o.renderer) && !o.renderer.header && (o.renderer.header = "jqueryui") : o.renderer = "jqueryui": g.extend(j, m.ext.classes, d.oClasses);
                    r.addClass(j.sTable);
                    if ("" !== o.oScroll.sX || "" !== o.oScroll.sY) o.oScroll.iBarWidth = Ib();
                    o.iInitDisplayStart === k && (o.iInitDisplayStart = d.iDisplayStart, o._iDisplayStart = d.iDisplayStart);
                    null !== d.iDeferLoading && (o.bDeferLoading = !0, h = g.isArray(d.iDeferLoading), o._iRecordsDisplay = h ? d.iDeferLoading[0] : d.iDeferLoading, o._iRecordsTotal = h ? d.iDeferLoading[1] : d.iDeferLoading);
                    var t = o.oLanguage;
                    g.extend(!0, t, d.oLanguage);
                    "" !== t.sUrl && (g.ajax({
                        dataType: "json",
                        url: t.sUrl,
                        success: function(a) {
                            S(a);
                            I(l.oLanguage, a);
                            g.extend(true, t, a);
                            ha(o)
                        },
                        error: function() {
                            ha(o)
                        }
                    }), n = !0);
                    null === d.asStripeClasses && (o.asStripeClasses = [j.sStripeOdd, j.sStripeEven]);
                    var h = o.asStripeClasses,
                    s = r.children("tbody").find("tr").eq(0); - 1 !== g.inArray(!0, g.map(h,
                    function(a) {
                        return s.hasClass(a)
                    })) && (g("tbody tr", this).removeClass(h.join(" ")), o.asDestroyStripes = h.slice());
                    q = [];
                    h = this.getElementsByTagName("thead");
                    0 !== h.length && (ea(o.aoHeader, h[0]), q = qa(o));
                    if (null === d.aoColumns) {
                        p = [];
                        h = 0;
                        for (i = q.length; h < i; h++) p.push(null)
                    } else p = d.aoColumns;
                    h = 0;
                    for (i = p.length; h < i; h++) Ga(o, q ? q[h] : null);
                    ib(o, d.aoColumnDefs, p,
                    function(a, b) {
                        ka(o, a, b)
                    });
                    if (s.length) {
                        var u = function(a, b) {
                            return a.getAttribute("data-" + b) !== null ? b: null
                        };
                        g.each(na(o, s[0]).cells,
                        function(a, b) {
                            var c = o.aoColumns[a];
                            if (c.mData === a) {
                                var e = u(b, "sort") || u(b, "order"),
                                d = u(b, "filter") || u(b, "search");
                                if (e !== null || d !== null) {
                                    c.mData = {
                                        _: a + ".display",
                                        sort: e !== null ? a + ".@data-" + e: k,
                                        type: e !== null ? a + ".@data-" + e: k,
                                        filter: d !== null ? a + ".@data-" + d: k
                                    };
                                    ka(o, a)
                                }
                            }
                        })
                    }
                    var v = o.oFeatures;
                    d.bStateSave && (v.bStateSave = !0, Lb(o, d), A(o, "aoDrawCallback", ya, "state_save"));
                    if (d.aaSorting === k) {
                        q = o.aaSorting;
                        h = 0;
                        for (i = q.length; h < i; h++) q[h][1] = o.aoColumns[h].asSorting[0]
                    }
                    xa(o);
                    v.bSort && A(o, "aoDrawCallback",
                    function() {
                        if (o.bSorted) {
                            var a = V(o),
                            b = {};
                            g.each(a,
                            function(a, c) {
                                b[c.src] = c.dir
                            });
                            w(o, null, "order", [o, a, b]);
                            Kb(o)
                        }
                    });
                    A(o, "aoDrawCallback",
                    function() { (o.bSorted || z(o) === "ssp" || v.bDeferRender) && xa(o)
                    },
                    "sc");
                    gb(o);
                    h = r.children("caption").each(function() {
                        this._captionSide = r.css("caption-side")
                    });
                    i = r.children("thead");
                    0 === i.length && (i = g("<thead/>").appendTo(this));
                    o.nTHead = i[0];
                    i = r.children("tbody");
                    0 === i.length && (i = g("<tbody/>").appendTo(this));
                    o.nTBody = i[0];
                    i = r.children("tfoot");
                    if (0 === i.length && 0 < h.length && ("" !== o.oScroll.sX || "" !== o.oScroll.sY)) i = g("<tfoot/>").appendTo(this);
                    0 === i.length || 0 === i.children().length ? r.addClass(j.sNoFooter) : 0 < i.length && (o.nTFoot = i[0], ea(o.aoFooter, o.nTFoot));
                    if (d.aaData) for (h = 0; h < d.aaData.length; h++) L(o, d.aaData[h]);
                    else(o.bDeferLoading || "dom" == z(o)) && ma(o, g(o.nTBody).children("tr"));
                    o.aiDisplay = o.aiDisplayMaster.slice();
                    o.bInitialised = !0; ! 1 === n && ha(o)
                }
            });
            b = null;
            return this
        };
        var Ub = [],
        x = Array.prototype,
        dc = function(a) {
            var b, c, e = m.settings,
            d = g.map(e,
            function(a) {
                return a.nTable
            });
            if (a) {
                if (a.nTable && a.oApi) return [a];
                if (a.nodeName && "table" === a.nodeName.toLowerCase()) return b = g.inArray(a, d),
                -1 !== b ? [e[b]] : null;
                if (a && "function" === typeof a.settings) return a.settings().toArray();
                "string" === typeof a ? c = g(a) : a instanceof g && (c = a)
            } else return [];
            if (c) return c.map(function() {
                b = g.inArray(this, d);
                return - 1 !== b ? e[b] : null
            }).toArray()
        };
        t = function(a, b) {
            if (! (this instanceof t)) return new t(a, b);
            var c = [],
            e = function(a) { (a = dc(a)) && c.push.apply(c, a)
            };
            if (g.isArray(a)) for (var d = 0,
            f = a.length; d < f; d++) e(a[d]);
            else e(a);
            this.context = Oa(c);
            b && this.push.apply(this, b.toArray ? b.toArray() : b);
            this.selector = {
                rows: null,
                cols: null,
                opts: null
            };
            t.extend(this, this, Ub)
        };
        m.Api = t;
        g.extend(t.prototype, {
            any: function() {
                return 0 !== this.count()
            },
            concat: x.concat,
            context: [],
            count: function() {
                return this.flatten().length
            },
            each: function(a) {
                for (var b = 0,
                c = this.length; b < c; b++) a.call(this, this[b], b, this);
                return this
            },
            eq: function(a) {
                var b = this.context;
                return b.length > a ? new t(b[a], this[a]) : null
            },
            filter: function(a) {
                var b = [];
                if (x.filter) b = x.filter.call(this, a, this);
                else for (var c = 0,
                e = this.length; c < e; c++) a.call(this, this[c], c, this) && b.push(this[c]);
                return new t(this.context, b)
            },
            flatten: function() {
                var a = [];
                return new t(this.context, a.concat.apply(a, this.toArray()))
            },
            join: x.join,
            indexOf: x.indexOf ||
            function(a, b) {
                for (var c = b || 0,
                e = this.length; c < e; c++) if (this[c] === a) return c;
                return - 1
            },
            iterator: function(a, b, c, e) {
                var d = [],
                f,
                h,
                g,
                j,
                n,
                l = this.context,
                m,
                q,
                p = this.selector;
                "string" === typeof a && (e = c, c = b, b = a, a = !1);
                h = 0;
                for (g = l.length; h < g; h++) {
                    var o = new t(l[h]);
                    if ("table" === b) f = c.call(o, l[h], h),
                    f !== k && d.push(f);
                    else if ("columns" === b || "rows" === b) f = c.call(o, l[h], this[h], h),
                    f !== k && d.push(f);
                    else if ("column" === b || "column-rows" === b || "row" === b || "cell" === b) {
                        q = this[h];
                        "column-rows" === b && (m = Da(l[h], p.opts));
                        j = 0;
                        for (n = q.length; j < n; j++) f = q[j],
                        f = "cell" === b ? c.call(o, l[h], f.row, f.column, h, j) : c.call(o, l[h], f, h, j, m),
                        f !== k && d.push(f)
                    }
                }
                return d.length || e ? (a = new t(l, a ? d.concat.apply([], d) : d), b = a.selector, b.rows = p.rows, b.cols = p.cols, b.opts = p.opts, a) : this
            },
            lastIndexOf: x.lastIndexOf ||
            function(a, b) {
                return this.indexOf.apply(this.toArray.reverse(), arguments)
            },
            length: 0,
            map: function(a) {
                var b = [];
                if (x.map) b = x.map.call(this, a, this);
                else for (var c = 0,
                e = this.length; c < e; c++) b.push(a.call(this, this[c], c));
                return new t(this.context, b)
            },
            pluck: function(a) {
                return this.map(function(b) {
                    return b[a]
                })
            },
            pop: x.pop,
            push: x.push,
            reduce: x.reduce ||
            function(a, b) {
                return hb(this, a, b, 0, this.length, 1)
            },
            reduceRight: x.reduceRight ||
            function(a, b) {
                return hb(this, a, b, this.length - 1, -1, -1)
            },
            reverse: x.reverse,
            selector: null,
            shift: x.shift,
            sort: x.sort,
            splice: x.splice,
            toArray: function() {
                return x.slice.call(this)
            },
            to$: function() {
                return g(this)
            },
            toJQuery: function() {
                return g(this)
            },
            unique: function() {
                return new t(this.context, Oa(this))
            },
            unshift: x.unshift
        });
        t.extend = function(a, b, c) {
            if (c.length && b && (b instanceof t || b.__dt_wrapper)) {
                var e, d, f, h = function(a, b, c) {
                    return function() {
                        var e = b.apply(a, arguments);
                        t.extend(e, e, c.methodExt);
                        return e
                    }
                };
                e = 0;
                for (d = c.length; e < d; e++) f = c[e],
                b[f.name] = "function" === typeof f.val ? h(a, f.val, f) : g.isPlainObject(f.val) ? {}: f.val,
                b[f.name].__dt_wrapper = !0,
                t.extend(a, b[f.name], f.propExt)
            }
        };
        t.register = p = function(a, b) {
            if (g.isArray(a)) for (var c = 0,
            e = a.length; c < e; c++) t.register(a[c], b);
            else for (var d = a.split("."), f = Ub, h, i, c = 0, e = d.length; c < e; c++) {
                h = (i = -1 !== d[c].indexOf("()")) ? d[c].replace("()", "") : d[c];
                var j;
                a: {
                    j = 0;
                    for (var n = f.length; j < n; j++) if (f[j].name === h) {
                        j = f[j];
                        break a
                    }
                    j = null
                }
                j || (j = {
                    name: h,
                    val: {},
                    methodExt: [],
                    propExt: []
                },
                f.push(j));
                c === e - 1 ? j.val = b: f = i ? j.methodExt: j.propExt
            }
        };
        t.registerPlural = s = function(a, b, c) {
            t.register(a, c);
            t.register(b,
            function() {
                var a = c.apply(this, arguments);
                return a === this ? this: a instanceof t ? a.length ? g.isArray(a[0]) ? new t(a.context, a[0]) : a[0] : k: a
            })
        };
        p("tables()",
        function(a) {
            var b;
            if (a) {
                b = t;
                var c = this.context;
                if ("number" === typeof a) a = [c[a]];
                else var e = g.map(c,
                function(a) {
                    return a.nTable
                }),
                a = g(e).filter(a).map(function() {
                    var a = g.inArray(this, e);
                    return c[a]
                }).toArray();
                b = new b(a)
            } else b = this;
            return b
        });
        p("table()",
        function(a) {
            var a = this.tables(a),
            b = a.context;
            return b.length ? new t(b[0]) : a
        });
        s("tables().nodes()", "table().node()",
        function() {
            return this.iterator("table",
            function(a) {
                return a.nTable
            },
            1)
        });
        s("tables().body()", "table().body()",
        function() {
            return this.iterator("table",
            function(a) {
                return a.nTBody
            },
            1)
        });
        s("tables().header()", "table().header()",
        function() {
            return this.iterator("table",
            function(a) {
                return a.nTHead
            },
            1)
        });
        s("tables().footer()", "table().footer()",
        function() {
            return this.iterator("table",
            function(a) {
                return a.nTFoot
            },
            1)
        });
        s("tables().containers()", "table().container()",
        function() {
            return this.iterator("table",
            function(a) {
                return a.nTableWrapper
            },
            1)
        });
        p("draw()",
        function(a) {
            return this.iterator("table",
            function(b) {
                "page" === a ? M(b) : ("string" === typeof a && (a = "full-hold" === a ? !1 : !0), R(b, !1 === a))
            })
        });
        p("page()",
        function(a) {
            return a === k ? this.page.info().page: this.iterator("table",
            function(b) {
                Ua(b, a)
            })
        });
        p("page.info()",
        function() {
            if (0 === this.context.length) return k;
            var a = this.context[0],
            b = a._iDisplayStart,
            c = a._iDisplayLength,
            e = a.fnRecordsDisplay(),
            d = -1 === c;
            return {
                page: d ? 0 : Math.floor(b / c),
                pages: d ? 1 : Math.ceil(e / c),
                start: b,
                end: a.fnDisplayEnd(),
                length: c,
                recordsTotal: a.fnRecordsTotal(),
                recordsDisplay: e,
                serverSide: "ssp" === z(a)
            }
        });
        p("page.len()",
        function(a) {
            return a === k ? 0 !== this.context.length ? this.context[0]._iDisplayLength: k: this.iterator("table",
            function(b) {
                Sa(b, a)
            })
        });
        var Vb = function(a, b, c) {
            if (c) {
                var e = new t(a);
                e.one("draw",
                function() {
                    c(e.ajax.json())
                })
            }
            if ("ssp" == z(a)) R(a, b);
            else {
                C(a, !0);
                var d = a.jqXHR;
                d && 4 !== d.readyState && d.abort();
                ra(a, [],
                function(c) {
                    oa(a);
                    for (var c = sa(a, c), e = 0, d = c.length; e < d; e++) L(a, c[e]);
                    R(a, b);
                    C(a, !1)
                })
            }
        };
        p("ajax.json()",
        function() {
            var a = this.context;
            if (0 < a.length) return a[0].json
        });
        p("ajax.params()",
        function() {
            var a = this.context;
            if (0 < a.length) return a[0].oAjaxData
        });
        p("ajax.reload()",
        function(a, b) {
            return this.iterator("table",
            function(c) {
                Vb(c, !1 === b, a)
            })
        });
        p("ajax.url()",
        function(a) {
            var b = this.context;
            if (a === k) {
                if (0 === b.length) return k;
                b = b[0];
                return b.ajax ? g.isPlainObject(b.ajax) ? b.ajax.url: b.ajax: b.sAjaxSource
            }
            return this.iterator("table",
            function(b) {
                g.isPlainObject(b.ajax) ? b.ajax.url = a: b.ajax = a
            })
        });
        p("ajax.url().load()",
        function(a, b) {
            return this.iterator("table",
            function(c) {
                Vb(c, !1 === b, a)
            })
        });
        var $a = function(a, b, c, e, d) {
            var f = [],
            h,
            i,
            j,
            n,
            l,
            m;
            j = typeof b;
            if (!b || "string" === j || "function" === j || b.length === k) b = [b];
            j = 0;
            for (n = b.length; j < n; j++) {
                i = b[j] && b[j].split ? b[j].split(",") : [b[j]];
                l = 0;
                for (m = i.length; l < m; l++)(h = c("string" === typeof i[l] ? g.trim(i[l]) : i[l])) && h.length && f.push.apply(f, h)
            }
            a = v.selector[a];
            if (a.length) {
                j = 0;
                for (n = a.length; j < n; j++) f = a[j](e, d, f)
            }
            return f
        },
        ab = function(a) {
            a || (a = {});
            a.filter && a.search === k && (a.search = a.filter);
            return g.extend({
                search: "none",
                order: "current",
                page: "all"
            },
            a)
        },
        bb = function(a) {
            for (var b = 0,
            c = a.length; b < c; b++) if (0 < a[b].length) return a[0] = a[b],
            a[0].length = 1,
            a.length = 1,
            a.context = [a.context[b]],
            a;
            a.length = 0;
            return a
        },
        Da = function(a, b) {
            var c, e, d, f = [],
            h = a.aiDisplay;
            c = a.aiDisplayMaster;
            var i = b.search;
            e = b.order;
            d = b.page;
            if ("ssp" == z(a)) return "removed" === i ? [] : W(0, c.length);
            if ("current" == d) {
                c = a._iDisplayStart;
                for (e = a.fnDisplayEnd(); c < e; c++) f.push(h[c])
            } else if ("current" == e || "applied" == e) f = "none" == i ? c.slice() : "applied" == i ? h.slice() : g.map(c,
            function(a) {
                return - 1 === g.inArray(a, h) ? a: null
            });
            else if ("index" == e || "original" == e) {
                c = 0;
                for (e = a.aoData.length; c < e; c++)"none" == i ? f.push(c) : (d = g.inArray(c, h), ( - 1 === d && "removed" == i || 0 <= d && "applied" == i) && f.push(c))
            }
            return f
        };
        p("rows()",
        function(a, b) {
            a === k ? a = "": g.isPlainObject(a) && (b = a, a = "");
            var b = ab(b),
            c = this.iterator("table",
            function(c) {
                var d = b;
                return $a("row", a,
                function(a) {
                    var b = Qb(a);
                    if (b !== null && !d) return [b];
                    var i = Da(c, d);
                    if (b !== null && g.inArray(b, i) !== -1) return [b];
                    if (!a) return i;
                    if (typeof a === "function") return g.map(i,
                    function(b) {
                        var d = c.aoData[b];
                        return a(b, d._aData, d.nTr) ? b: null
                    });
                    b = Tb(ia(c.aoData, i, "nTr"));
                    if (a.nodeName && g.inArray(a, b) !== -1) return [a._DT_RowIndex];
                    if (typeof a === "string" && a.charAt(0) === "#") {
                        i = c.aIds[a.replace(/^#/, "")];
                        if (i !== k) return [i.idx]
                    }
                    return g(b).filter(a).map(function() {
                        return this._DT_RowIndex
                    }).toArray()
                },
                c, d)
            },
            1);
            c.selector.rows = a;
            c.selector.opts = b;
            return c
        });
        p("rows().nodes()",
        function() {
            return this.iterator("row",
            function(a, b) {
                return a.aoData[b].nTr || k
            },
            1)
        });
        p("rows().data()",
        function() {
            return this.iterator(!0, "rows",
            function(a, b) {
                return ia(a.aoData, b, "_aData")
            },
            1)
        });
        s("rows().cache()", "row().cache()",
        function(a) {
            return this.iterator("row",
            function(b, c) {
                var e = b.aoData[c];
                return "search" === a ? e._aFilterData: e._aSortData
            },
            1)
        });
        s("rows().invalidate()", "row().invalidate()",
        function(a) {
            return this.iterator("row",
            function(b, c) {
                da(b, c, a)
            })
        });
        s("rows().indexes()", "row().index()",
        function() {
            return this.iterator("row",
            function(a, b) {
                return b
            },
            1)
        });
        s("rows().ids()", "row().id()",
        function(a) {
            for (var b = [], c = this.context, e = 0, d = c.length; e < d; e++) for (var f = 0,
            h = this[e].length; f < h; f++) {
                var g = c[e].rowIdFn(c[e].aoData[this[e][f]]._aData);
                b.push((!0 === a ? "#": "") + g)
            }
            return new t(c, b)
        });
        s("rows().remove()", "row().remove()",
        function() {
            var a = this;
            this.iterator("row",
            function(b, c, e) {
                var d = b.aoData;
                d.splice(c, 1);
                for (var f = 0,
                h = d.length; f < h; f++) null !== d[f].nTr && (d[f].nTr._DT_RowIndex = f);
                pa(b.aiDisplayMaster, c);
                pa(b.aiDisplay, c);
                pa(a[e], c, !1);
                Ta(b)
            });
            this.iterator("table",
            function(a) {
                for (var c = 0,
                e = a.aoData.length; c < e; c++) a.aoData[c].idx = c
            });
            return this
        });
        p("rows.add()",
        function(a) {
            var b = this.iterator("table",
            function(b) {
                var c, f, h, g = [];
                f = 0;
                for (h = a.length; f < h; f++) c = a[f],
                c.nodeName && "TR" === c.nodeName.toUpperCase() ? g.push(ma(b, c)[0]) : g.push(L(b, c));
                return g
            },
            1),
            c = this.rows( - 1);
            c.pop();
            c.push.apply(c, b.toArray());
            return c
        });
        p("row()",
        function(a, b) {
            return bb(this.rows(a, b))
        });
        p("row().data()",
        function(a) {
            var b = this.context;
            if (a === k) return b.length && this.length ? b[0].aoData[this[0]]._aData: k;
            b[0].aoData[this[0]]._aData = a;
            da(b[0], this[0], "data");
            return this
        });
        p("row().node()",
        function() {
            var a = this.context;
            return a.length && this.length ? a[0].aoData[this[0]].nTr || null: null
        });
        p("row.add()",
        function(a) {
            a instanceof g && a.length && (a = a[0]);
            var b = this.iterator("table",
            function(b) {
                return a.nodeName && "TR" === a.nodeName.toUpperCase() ? ma(b, a)[0] : L(b, a)
            });
            return this.row(b[0])
        });
        var cb = function(a, b) {
            var c = a.context;
            if (c.length && (c = c[0].aoData[b !== k ? b: a[0]]) && c._details) c._details.remove(),
            c._detailsShow = k,
            c._details = k
        },
        Wb = function(a, b) {
            var c = a.context;
            if (c.length && a.length) {
                var e = c[0].aoData[a[0]];
                if (e._details) { (e._detailsShow = b) ? e._details.insertAfter(e.nTr) : e._details.detach();
                    var d = c[0],
                    f = new t(d),
                    h = d.aoData;
                    f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
                    0 < D(h, "_details").length && (f.on("draw.dt.DT_details",
                    function(a, b) {
                        d === b && f.rows({
                            page: "current"
                        }).eq(0).each(function(a) {
                            a = h[a];
                            a._detailsShow && a._details.insertAfter(a.nTr)
                        })
                    }), f.on("column-visibility.dt.DT_details",
                    function(a, b) {
                        if (d === b) for (var c, e = ba(b), f = 0, g = h.length; f < g; f++) c = h[f],
                        c._details && c._details.children("td[colspan]").attr("colspan", e)
                    }), f.on("destroy.dt.DT_details",
                    function(a, b) {
                        if (d === b) for (var c = 0,
                        e = h.length; c < e; c++) h[c]._details && cb(f, c)
                    }))
                }
            }
        };
        p("row().child()",
        function(a, b) {
            var c = this.context;
            if (a === k) return c.length && this.length ? c[0].aoData[this[0]]._details: k;
            if (!0 === a) this.child.show();
            else if (!1 === a) cb(this);
            else if (c.length && this.length) {
                var e = c[0],
                c = c[0].aoData[this[0]],
                d = [],
                f = function(a, b) {
                    if (g.isArray(a) || a instanceof g) for (var c = 0,
                    k = a.length; c < k; c++) f(a[c], b);
                    else a.nodeName && "tr" === a.nodeName.toLowerCase() ? d.push(a) : (c = g("<tr><td/></tr>").addClass(b), g("td", c).addClass(b).html(a)[0].colSpan = ba(e), d.push(c[0]))
                };
                f(a, b);
                c._details && c._details.remove();
                c._details = g(d);
                c._detailsShow && c._details.insertAfter(c.nTr)
            }
            return this
        });
        p(["row().child.show()", "row().child().show()"],
        function() {
            Wb(this, !0);
            return this
        });
        p(["row().child.hide()", "row().child().hide()"],
        function() {
            Wb(this, !1);
            return this
        });
        p(["row().child.remove()", "row().child().remove()"],
        function() {
            cb(this);
            return this
        });
        p("row().child.isShown()",
        function() {
            var a = this.context;
            return a.length && this.length ? a[0].aoData[this[0]]._detailsShow || !1 : !1
        });
        var ec = /^(.+):(name|visIdx|visible)$/,
        Xb = function(a, b, c, e, d) {
            for (var c = [], e = 0, f = d.length; e < f; e++) c.push(y(a, d[e], b));
            return c
        };
        p("columns()",
        function(a, b) {
            a === k ? a = "": g.isPlainObject(a) && (b = a, a = "");
            var b = ab(b),
            c = this.iterator("table",
            function(c) {
                var d = a,
                f = b,
                h = c.aoColumns,
                i = D(h, "sName"),
                j = D(h, "nTh");
                return $a("column", d,
                function(a) {
                    var b = Qb(a);
                    if (a === "") return W(h.length);
                    if (b !== null) return [b >= 0 ? b: h.length + b];
                    if (typeof a === "function") {
                        var d = Da(c, f);
                        return g.map(h,
                        function(b, f) {
                            return a(f, Xb(c, f, 0, 0, d), j[f]) ? f: null
                        })
                    }
                    var k = typeof a === "string" ? a.match(ec) : "";
                    if (k) switch (k[2]) {
                    case "visIdx":
                    case "visible":
                        b = parseInt(k[1], 10);
                        if (b < 0) {
                            var m = g.map(h,
                            function(a, b) {
                                return a.bVisible ? b: null
                            });
                            return [m[m.length + b]]
                        }
                        return [la(c, b)];
                    case "name":
                        return g.map(i,
                        function(a, b) {
                            return a === k[1] ? b: null
                        })
                    } else return g(j).filter(a).map(function() {
                        return g.inArray(this, j)
                    }).toArray()
                },
                c, f)
            },
            1);
            c.selector.cols = a;
            c.selector.opts = b;
            return c
        });
        s("columns().header()", "column().header()",
        function() {
            return this.iterator("column",
            function(a, b) {
                return a.aoColumns[b].nTh
            },
            1)
        });
        s("columns().footer()", "column().footer()",
        function() {
            return this.iterator("column",
            function(a, b) {
                return a.aoColumns[b].nTf
            },
            1)
        });
        s("columns().data()", "column().data()",
        function() {
            return this.iterator("column-rows", Xb, 1)
        });
        s("columns().dataSrc()", "column().dataSrc()",
        function() {
            return this.iterator("column",
            function(a, b) {
                return a.aoColumns[b].mData
            },
            1)
        });
        s("columns().cache()", "column().cache()",
        function(a) {
            return this.iterator("column-rows",
            function(b, c, e, d, f) {
                return ia(b.aoData, f, "search" === a ? "_aFilterData": "_aSortData", c)
            },
            1)
        });
        s("columns().nodes()", "column().nodes()",
        function() {
            return this.iterator("column-rows",
            function(a, b, c, e, d) {
                return ia(a.aoData, d, "anCells", b)
            },
            1)
        });
        s("columns().visible()", "column().visible()",
        function(a, b) {
            return this.iterator("column",
            function(c, e) {
                if (a === k) return c.aoColumns[e].bVisible;
                var d = c.aoColumns,
                f = d[e],
                h = c.aoData,
                i,
                j,
                n;
                if (a !== k && f.bVisible !== a) {
                    if (a) {
                        var l = g.inArray(!0, D(d, "bVisible"), e + 1);
                        i = 0;
                        for (j = h.length; i < j; i++) n = h[i].nTr,
                        d = h[i].anCells,
                        n && n.insertBefore(d[e], d[l] || null)
                    } else g(D(c.aoData, "anCells", e)).detach();
                    f.bVisible = a;
                    fa(c, c.aoHeader);
                    fa(c, c.aoFooter);
                    if (b === k || b) Y(c),
                    (c.oScroll.sX || c.oScroll.sY) && Z(c);
                    w(c, null, "column-visibility", [c, e, a]);
                    ya(c)
                }
            })
        });
        s("columns().indexes()", "column().index()",
        function(a) {
            return this.iterator("column",
            function(b, c) {
                return "visible" === a ? aa(b, c) : c
            },
            1)
        });
        p("columns.adjust()",
        function() {
            return this.iterator("table",
            function(a) {
                Y(a)
            },
            1)
        });
        p("column.index()",
        function(a, b) {
            if (0 !== this.context.length) {
                var c = this.context[0];
                if ("fromVisible" === a || "toData" === a) return la(c, b);
                if ("fromData" === a || "toVisible" === a) return aa(c, b)
            }
        });
        p("column()",
        function(a, b) {
            return bb(this.columns(a, b))
        });
        p("cells()",
        function(a, b, c) {
            g.isPlainObject(a) && (a.row === k ? (c = a, a = null) : (c = b, b = null));
            g.isPlainObject(b) && (c = b, b = null);
            if (null === b || b === k) return this.iterator("table",
            function(b) {
                var e = a,
                d = ab(c),
                f = b.aoData,
                h = Da(b, d),
                i = Tb(ia(f, h, "anCells")),
                j = g([].concat.apply([], i)),
                l,
                n = b.aoColumns.length,
                m,
                p,
                t,
                s,
                u,
                v;
                return $a("cell", e,
                function(a) {
                    var c = typeof a === "function";
                    if (a === null || a === k || c) {
                        m = [];
                        p = 0;
                        for (t = h.length; p < t; p++) {
                            l = h[p];
                            for (s = 0; s < n; s++) {
                                u = {
                                    row: l,
                                    column: s
                                };
                                if (c) {
                                    v = b.aoData[l];
                                    a(u, y(b, l, s), v.anCells ? v.anCells[s] : null) && m.push(u)
                                } else m.push(u)
                            }
                        }
                        return m
                    }
                    return g.isPlainObject(a) ? [a] : j.filter(a).map(function(a, b) {
                        l = b.parentNode._DT_RowIndex;
                        return {
                            row: l,
                            column: g.inArray(b, f[l].anCells)
                        }
                    }).toArray()
                },
                b, d)
            });
            var e = this.columns(b, c),
            d = this.rows(a, c),
            f,
            h,
            i,
            j,
            n,
            l = this.iterator("table",
            function(a, b) {
                f = [];
                h = 0;
                for (i = d[b].length; h < i; h++) {
                    j = 0;
                    for (n = e[b].length; j < n; j++) f.push({
                        row: d[b][h],
                        column: e[b][j]
                    })
                }
                return f
            },
            1);
            g.extend(l.selector, {
                cols: b,
                rows: a,
                opts: c
            });
            return l
        });
        s("cells().nodes()", "cell().node()",
        function() {
            return this.iterator("cell",
            function(a, b, c) {
                return (a = a.aoData[b].anCells) ? a[c] : k
            },
            1)
        });
        p("cells().data()",
        function() {
            return this.iterator("cell",
            function(a, b, c) {
                return y(a, b, c)
            },
            1)
        });
        s("cells().cache()", "cell().cache()",
        function(a) {
            a = "search" === a ? "_aFilterData": "_aSortData";
            return this.iterator("cell",
            function(b, c, e) {
                return b.aoData[c][a][e]
            },
            1)
        });
        s("cells().render()", "cell().render()",
        function(a) {
            return this.iterator("cell",
            function(b, c, e) {
                return y(b, c, e, a)
            },
            1)
        });
        s("cells().indexes()", "cell().index()",
        function() {
            return this.iterator("cell",
            function(a, b, c) {
                return {
                    row: b,
                    column: c,
                    columnVisible: aa(a, c)
                }
            },
            1)
        });
        s("cells().invalidate()", "cell().invalidate()",
        function(a) {
            return this.iterator("cell",
            function(b, c, e) {
                da(b, c, a, e)
            })
        });
        p("cell()",
        function(a, b, c) {
            return bb(this.cells(a, b, c))
        });
        p("cell().data()",
        function(a) {
            var b = this.context,
            c = this[0];
            if (a === k) return b.length && c.length ? y(b[0], c[0].row, c[0].column) : k;
            Ja(b[0], c[0].row, c[0].column, a);
            da(b[0], c[0].row, "data", c[0].column);
            return this
        });
        p("order()",
        function(a, b) {
            var c = this.context;
            if (a === k) return 0 !== c.length ? c[0].aaSorting: k;
            "number" === typeof a ? a = [[a, b]] : g.isArray(a[0]) || (a = Array.prototype.slice.call(arguments));
            return this.iterator("table",
            function(b) {
                b.aaSorting = a.slice()
            })
        });
        p("order.listener()",
        function(a, b, c) {
            return this.iterator("table",
            function(e) {
                Pa(e, a, b, c)
            })
        });
        p(["columns().order()", "column().order()"],
        function(a) {
            var b = this;
            return this.iterator("table",
            function(c, e) {
                var d = [];
                g.each(b[e],
                function(b, c) {
                    d.push([c, a])
                });
                c.aaSorting = d
            })
        });
        p("search()",
        function(a, b, c, e) {
            var d = this.context;
            return a === k ? 0 !== d.length ? d[0].oPreviousSearch.sSearch: k: this.iterator("table",
            function(d) {
                d.oFeatures.bFilter && ga(d, g.extend({},
                d.oPreviousSearch, {
                    sSearch: a + "",
                    bRegex: null === b ? !1 : b,
                    bSmart: null === c ? !0 : c,
                    bCaseInsensitive: null === e ? !0 : e
                }), 1)
            })
        });
        s("columns().search()", "column().search()",
        function(a, b, c, e) {
            return this.iterator("column",
            function(d, f) {
                var h = d.aoPreSearchCols;
                if (a === k) return h[f].sSearch;
                d.oFeatures.bFilter && (g.extend(h[f], {
                    sSearch: a + "",
                    bRegex: null === b ? !1 : b,
                    bSmart: null === c ? !0 : c,
                    bCaseInsensitive: null === e ? !0 : e
                }), ga(d, d.oPreviousSearch, 1))
            })
        });
        p("state()",
        function() {
            return this.context.length ? this.context[0].oSavedState: null
        });
        p("state.clear()",
        function() {
            return this.iterator("table",
            function(a) {
                a.fnStateSaveCallback.call(a.oInstance, a, {})
            })
        });
        p("state.loaded()",
        function() {
            return this.context.length ? this.context[0].oLoadedState: null
        });
        p("state.save()",
        function() {
            return this.iterator("table",
            function(a) {
                ya(a)
            })
        });
        m.versionCheck = m.fnVersionCheck = function(a) {
            for (var b = m.version.split("."), a = a.split("."), c, e, d = 0, f = a.length; d < f; d++) if (c = parseInt(b[d], 10) || 0, e = parseInt(a[d], 10) || 0, c !== e) return c > e;
            return ! 0
        };
        m.isDataTable = m.fnIsDataTable = function(a) {
            var b = g(a).get(0),
            c = !1;
            g.each(m.settings,
            function(a, d) {
                var f = d.nScrollHead ? g("table", d.nScrollHead)[0] : null,
                h = d.nScrollFoot ? g("table", d.nScrollFoot)[0] : null;
                if (d.nTable === b || f === b || h === b) c = !0
            });
            return c
        };
        m.tables = m.fnTables = function(a) {
            var b = !1;
            g.isPlainObject(a) && (b = a.api, a = a.visible);
            var c = g.map(m.settings,
            function(b) {
                if (!a || a && g(b.nTable).is(":visible")) return b.nTable
            });
            return b ? new t(c) : c
        };
        m.util = {
            throttle: ua,
            escapeRegex: va
        };
        m.camelToHungarian = I;
        p("$()",
        function(a, b) {
            var c = this.rows(b).nodes(),
            c = g(c);
            return g([].concat(c.filter(a).toArray(), c.find(a).toArray()))
        });
        g.each(["on", "one", "off"],
        function(a, b) {
            p(b + "()",
            function() {
                var a = Array.prototype.slice.call(arguments);
                a[0].match(/\.dt\b/) || (a[0] += ".dt");
                var e = g(this.tables().nodes());
                e[b].apply(e, a);
                return this
            })
        });
        p("clear()",
        function() {
            return this.iterator("table",
            function(a) {
                oa(a)
            })
        });
        p("settings()",
        function() {
            return new t(this.context, this.context)
        });
        p("init()",
        function() {
            var a = this.context;
            return a.length ? a[0].oInit: null
        });
        p("data()",
        function() {
            return this.iterator("table",
            function(a) {
                return D(a.aoData, "_aData")
            }).flatten()
        });
        p("destroy()",
        function(a) {
            a = a || !1;
            return this.iterator("table",
            function(b) {
                var c = b.nTableWrapper.parentNode,
                e = b.oClasses,
                d = b.nTable,
                f = b.nTBody,
                h = b.nTHead,
                i = b.nTFoot,
                j = g(d),
                f = g(f),
                k = g(b.nTableWrapper),
                l = g.map(b.aoData,
                function(a) {
                    return a.nTr
                }),
                p;
                b.bDestroying = !0;
                w(b, "aoDestroyCallback", "destroy", [b]);
                a || (new t(b)).columns().visible(!0);
                k.unbind(".DT").find(":not(tbody *)").unbind(".DT");
                g(Fa).unbind(".DT-" + b.sInstance);
                d != h.parentNode && (j.children("thead").detach(), j.append(h));
                i && d != i.parentNode && (j.children("tfoot").detach(), j.append(i));
                b.aaSorting = [];
                b.aaSortingFixed = [];
                xa(b);
                g(l).removeClass(b.asStripeClasses.join(" "));
                g("th, td", h).removeClass(e.sSortable + " " + e.sSortableAsc + " " + e.sSortableDesc + " " + e.sSortableNone);
                b.bJUI && (g("th span." + e.sSortIcon + ", td span." + e.sSortIcon, h).detach(), g("th, td", h).each(function() {
                    var a = g("div." + e.sSortJUIWrapper, this);
                    g(this).append(a.contents());
                    a.detach()
                }));
                f.children().detach();
                f.append(l);
                h = a ? "remove": "detach";
                j[h]();
                k[h](); ! a && c && (c.insertBefore(d, b.nTableReinsertBefore), j.css("width", b.sDestroyWidth).removeClass(e.sTable), (p = b.asDestroyStripes.length) && f.children().each(function(a) {
                    g(this).addClass(b.asDestroyStripes[a % p])
                }));
                c = g.inArray(b, m.settings); - 1 !== c && m.settings.splice(c, 1)
            })
        });
        g.each(["column", "row", "cell"],
        function(a, b) {
            p(b + "s().every()",
            function(a) {
                return this.iterator(b,
                function(e, d, f, h, g) {
                    a.call((new t(e))[b](d, "cell" === b ? f: k), d, f, h, g)
                })
            })
        });
        p("i18n()",
        function(a, b, c) {
            var e = this.context[0],
            a = P(a)(e.oLanguage);
            a === k && (a = b);
            c !== k && g.isPlainObject(a) && (a = a[c] !== k ? a[c] : a._);
            return a.replace("%d", c)
        });
        m.version = "1.10.9-dev";
        m.settings = [];
        m.models = {};
        m.models.oSearch = {
            bCaseInsensitive: !0,
            sSearch: "",
            bRegex: !1,
            bSmart: !0
        };
        m.models.oRow = {
            nTr: null,
            anCells: null,
            _aData: [],
            _aSortData: null,
            _aFilterData: null,
            _sFilterRow: null,
            _sRowStripe: "",
            src: null,
            idx: -1
        };
        m.models.oColumn = {
            idx: null,
            aDataSort: null,
            asSorting: null,
            bSearchable: null,
            bSortable: null,
            bVisible: null,
            _sManualType: null,
            _bAttrSrc: !1,
            fnCreatedCell: null,
            fnGetData: null,
            fnSetData: null,
            mData: null,
            mRender: null,
            nTh: null,
            nTf: null,
            sClass: null,
            sContentPadding: null,
            sDefaultContent: null,
            sName: null,
            sSortDataType: "std",
            sSortingClass: null,
            sSortingClassJUI: null,
            sTitle: null,
            sType: null,
            sWidth: null,
            sWidthOrig: null
        };
        m.defaults = {
            aaData: null,
            aaSorting: [[0, "asc"]],
            aaSortingFixed: [],
            ajax: null,
            aLengthMenu: [10, 25, 50, 100],
            aoColumns: null,
            aoColumnDefs: null,
            aoSearchCols: [],
            asStripeClasses: null,
            bAutoWidth: !0,
            bDeferRender: !1,
            bDestroy: !1,
            bFilter: !0,
            bInfo: !0,
            bJQueryUI: !1,
            bLengthChange: !0,
            bPaginate: !0,
            bProcessing: !1,
            bRetrieve: !1,
            bScrollCollapse: !1,
            bServerSide: !1,
            bSort: !0,
            bSortMulti: !0,
            bSortCellsTop: !1,
            bSortClasses: !0,
            bStateSave: !1,
            fnCreatedRow: null,
            fnDrawCallback: null,
            fnFooterCallback: null,
            fnFormatNumber: function(a) {
                return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
            },
            fnHeaderCallback: null,
            fnInfoCallback: null,
            fnInitComplete: null,
            fnPreDrawCallback: null,
            fnRowCallback: null,
            fnServerData: null,
            fnServerParams: null,
            fnStateLoadCallback: function(a) {
                try {
                    return JSON.parse(( - 1 === a.iStateDuration ? sessionStorage: localStorage).getItem("DataTables_" + a.sInstance + "_" + location.pathname))
                } catch(b) {}
            },
            fnStateLoadParams: null,
            fnStateLoaded: null,
            fnStateSaveCallback: function(a, b) {
                try { ( - 1 === a.iStateDuration ? sessionStorage: localStorage).setItem("DataTables_" + a.sInstance + "_" + location.pathname, JSON.stringify(b))
                } catch(c) {}
            },
            fnStateSaveParams: null,
            iStateDuration: 7200,
            iDeferLoading: null,
            iDisplayLength: 100,
            iDisplayStart: 0,
            iTabIndex: 0,
            oClasses: {},
            oLanguage: {
                oAria: {
                    sSortAscending: ": activate to sort column ascending",
                    sSortDescending: ": activate to sort column descending"
                },
                oPaginate: {
                    sFirst: "First",
                    sLast: "Last",
                    sNext: "Next",
                    sPrevious: "Previous"
                },
                sEmptyTable: "No data available in table",
                sInfo: "显示_TOTAL_ 条目中的 _START_ 到 _END_ 条",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sDecimal: "",
                sThousands: ",",
                sLengthMenu: "Show _MENU_ entries",
                sLoadingRecords: "Loading...",
                sProcessing: "Processing...",
                sSearch: "搜索:",
                sSearchPlaceholder: "",
                sUrl: "",
                sZeroRecords: "No matching records found"
            },
            oSearch: g.extend({},
            m.models.oSearch),
            sAjaxDataProp: "data",
            sAjaxSource: null,
            sDom: "lfrtip",
            searchDelay: null,
            sPaginationType: "simple_numbers",
            sScrollX: "",
            sScrollXInner: "",
            sScrollY: "",
            sServerMethod: "GET",
            renderer: null,
            rowId: "DT_RowId"
        };
        X(m.defaults);
        m.defaults.column = {
            aDataSort: null,
            iDataSort: -1,
            asSorting: ["asc", "desc"],
            bSearchable: !0,
            bSortable: !0,
            bVisible: !0,
            fnCreatedCell: null,
            mData: null,
            mRender: null,
            sCellType: "td",
            sClass: "",
            sContentPadding: "",
            sDefaultContent: null,
            sName: "",
            sSortDataType: "std",
            sTitle: null,
            sType: null,
            sWidth: null
        };
        X(m.defaults.column);
        m.models.oSettings = {
            oFeatures: {
                bAutoWidth: null,
                bDeferRender: null,
                bFilter: null,
                bInfo: null,
                bLengthChange: null,
                bPaginate: null,
                bProcessing: null,
                bServerSide: null,
                bSort: null,
                bSortMulti: null,
                bSortClasses: null,
                bStateSave: null
            },
            oScroll: {
                bCollapse: null,
                iBarWidth: 0,
                sX: null,
                sXInner: null,
                sY: null
            },
            oLanguage: {
                fnInfoCallback: null
            },
            oBrowser: {
                bScrollOversize: !1,
                bScrollbarLeft: !1,
                bBounding: !1
            },
            ajax: null,
            aanFeatures: [],
            aoData: [],
            aiDisplay: [],
            aiDisplayMaster: [],
            aIds: {},
            aoColumns: [],
            aoHeader: [],
            aoFooter: [],
            oPreviousSearch: {},
            aoPreSearchCols: [],
            aaSorting: null,
            aaSortingFixed: [],
            asStripeClasses: null,
            asDestroyStripes: [],
            sDestroyWidth: 0,
            aoRowCallback: [],
            aoHeaderCallback: [],
            aoFooterCallback: [],
            aoDrawCallback: [],
            aoRowCreatedCallback: [],
            aoPreDrawCallback: [],
            aoInitComplete: [],
            aoStateSaveParams: [],
            aoStateLoadParams: [],
            aoStateLoaded: [],
            sTableId: "",
            nTable: null,
            nTHead: null,
            nTFoot: null,
            nTBody: null,
            nTableWrapper: null,
            bDeferLoading: !1,
            bInitialised: !1,
            aoOpenRows: [],
            sDom: null,
            searchDelay: null,
            sPaginationType: "two_button",
            iStateDuration: 0,
            aoStateSave: [],
            aoStateLoad: [],
            oSavedState: null,
            oLoadedState: null,
            sAjaxSource: null,
            sAjaxDataProp: null,
            bAjaxDataGet: !0,
            jqXHR: null,
            json: k,
            oAjaxData: k,
            fnServerData: null,
            aoServerParams: [],
            sServerMethod: null,
            fnFormatNumber: null,
            aLengthMenu: null,
            iDraw: 0,
            bDrawing: !1,
            iDrawError: -1,
            _iDisplayLength: 10,
            _iDisplayStart: 0,
            _iRecordsTotal: 0,
            _iRecordsDisplay: 0,
            bJUI: null,
            oClasses: {},
            bFiltered: !1,
            bSorted: !1,
            bSortCellsTop: null,
            oInit: null,
            aoDestroyCallback: [],
            fnRecordsTotal: function() {
                return "ssp" == z(this) ? 1 * this._iRecordsTotal: this.aiDisplayMaster.length
            },
            fnRecordsDisplay: function() {
                return "ssp" == z(this) ? 1 * this._iRecordsDisplay: this.aiDisplay.length
            },
            fnDisplayEnd: function() {
                var a = this._iDisplayLength,
                b = this._iDisplayStart,
                c = b + a,
                e = this.aiDisplay.length,
                d = this.oFeatures,
                f = d.bPaginate;
                return d.bServerSide ? !1 === f || -1 === a ? b + e: Math.min(b + a, this._iRecordsDisplay) : !f || c > e || -1 === a ? e: c
            },
            oInstance: null,
            sInstance: null,
            iTabIndex: 0,
            nScrollHead: null,
            nScrollFoot: null,
            aLastSort: [],
            oPlugins: {},
            rowIdFn: null,
            rowId: null
        };
        m.ext = v = {
            buttons: {},
            classes: {},
            errMode: "alert",
            feature: [],
            search: [],
            selector: {
                cell: [],
                column: [],
                row: []
            },
            internal: {},
            legacy: {
                ajax: null
            },
            pager: {},
            renderer: {
                pageButton: {},
                header: {}
            },
            order: {},
            type: {
                detect: [],
                search: {},
                order: {}
            },
            _unique: 0,
            fnVersionCheck: m.fnVersionCheck,
            iApiIndex: 0,
            oJUIClasses: {},
            sVersion: m.version
        };
        g.extend(v, {
            afnFiltering: v.search,
            aTypes: v.type.detect,
            ofnSearch: v.type.search,
            oSort: v.type.order,
            afnSortData: v.order,
            aoFeatures: v.feature,
            oApi: v.internal,
            oStdClasses: v.classes,
            oPagination: v.pager
        });
        g.extend(m.ext.classes, {
            sTable: "dataTable",
            sNoFooter: "no-footer",
            sPageButton: "paginate_button",
            sPageButtonActive: "current",
            sPageButtonDisabled: "disabled",
            sStripeOdd: "odd",
            sStripeEven: "even",
            sRowEmpty: "dataTables_empty",
            sWrapper: "dataTables_wrapper",
            sFilter: "dataTables_filter",
            sInfo: "dataTables_info",
            sPaging: "dataTables_paginate paging_",
            sLength: "dataTables_length",
            sProcessing: "dataTables_processing",
            sSortAsc: "sorting_asc",
            sSortDesc: "sorting_desc",
            sSortable: "sorting",
            sSortableAsc: "sorting_asc_disabled",
            sSortableDesc: "sorting_desc_disabled",
            sSortableNone: "sorting_disabled",
            sSortColumn: "sorting_",
            sFilterInput: "",
            sLengthSelect: "",
            sScrollWrapper: "dataTables_scroll",
            sScrollHead: "dataTables_scrollHead",
            sScrollHeadInner: "dataTables_scrollHeadInner",
            sScrollBody: "dataTables_scrollBody",
            sScrollFoot: "dataTables_scrollFoot",
            sScrollFootInner: "dataTables_scrollFootInner",
            sHeaderTH: "",
            sFooterTH: "",
            sSortJUIAsc: "",
            sSortJUIDesc: "",
            sSortJUI: "",
            sSortJUIAscAllowed: "",
            sSortJUIDescAllowed: "",
            sSortJUIWrapper: "",
            sSortIcon: "",
            sJUIHeader: "",
            sJUIFooter: ""
        });
        var Ea = "",
        Ea = "",
        G = Ea + "ui-state-default",
        ja = Ea + "css_right ui-icon ui-icon-",
        Yb = Ea + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
        g.extend(m.ext.oJUIClasses, m.ext.classes, {
            sPageButton: "fg-button ui-button " + G,
            sPageButtonActive: "ui-state-disabled",
            sPageButtonDisabled: "ui-state-disabled",
            sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
            sSortAsc: G + " sorting_asc",
            sSortDesc: G + " sorting_desc",
            sSortable: G + " sorting",
            sSortableAsc: G + " sorting_asc_disabled",
            sSortableDesc: G + " sorting_desc_disabled",
            sSortableNone: G + " sorting_disabled",
            sSortJUIAsc: ja + "triangle-1-n",
            sSortJUIDesc: ja + "triangle-1-s",
            sSortJUI: ja + "carat-2-n-s",
            sSortJUIAscAllowed: ja + "carat-1-n",
            sSortJUIDescAllowed: ja + "carat-1-s",
            sSortJUIWrapper: "DataTables_sort_wrapper",
            sSortIcon: "DataTables_sort_icon",
            sScrollHead: "dataTables_scrollHead " + G,
            sScrollFoot: "dataTables_scrollFoot " + G,
            sHeaderTH: G,
            sFooterTH: G,
            sJUIHeader: Yb + " ui-corner-tl ui-corner-tr",
            sJUIFooter: Yb + " ui-corner-bl ui-corner-br"
        });
        var Nb = m.ext.pager;
        g.extend(Nb, {
            simple: function() {
                return ["previous", "next"]
            },
            full: function() {
                return ["first", "previous", "next", "last"]
            },
            numbers: function(a, b) {
                return [Aa(a, b)]
            },
            simple_numbers: function(a, b) {
                return ["previous", Aa(a, b), "next"]
            },
            full_numbers: function(a, b) {
                return ["first", "previous", Aa(a, b), "next", "last"]
            },
            _numbers: Aa,
            numbers_length: 7
        });
        g.extend(!0, m.ext.renderer, {
            pageButton: {
                _: function(a, b, c, e, d, f) {
                    var h = a.oClasses,
                    i = a.oLanguage.oPaginate,
                    j, k, l = 0,
                    m = function(b, e) {
                        var p, q, t, s, u = function(b) {
                            Ua(a, b.data.action, true)
                        };
                        p = 0;
                        for (q = e.length; p < q; p++) {
                            s = e[p];
                            if (g.isArray(s)) {
                                t = g("<" + (s.DT_el || "div") + "/>").appendTo(b);
                                m(t, s)
                            } else {
                                j = null;
                                k = "";
                                switch (s) {
                                case "ellipsis":
                                    b.append('<span class="ellipsis">&#x2026;</span>');
                                    break;
                                case "first":
                                    j = i.sFirst;
                                    k = s + (d > 0 ? "": " " + h.sPageButtonDisabled);
                                    break;
                                case "previous":
                                    j = i.sPrevious;
                                    k = s + (d > 0 ? "": " " + h.sPageButtonDisabled);
                                    break;
                                case "next":
                                    j = i.sNext;
                                    k = s + (d < f - 1 ? "": " " + h.sPageButtonDisabled);
                                    break;
                                case "last":
                                    j = i.sLast;
                                    k = s + (d < f - 1 ? "": " " + h.sPageButtonDisabled);
                                    break;
                                default:
                                    j = s + 1;
                                    k = d === s ? h.sPageButtonActive: ""
                                }
                                if (j !== null) {
                                    t = g("<a>", {
                                        "class": h.sPageButton + " " + k,
                                        "aria-controls": a.sTableId,
                                        "data-dt-idx": l,
                                        tabindex: a.iTabIndex,
                                        id: c === 0 && typeof s === "string" ? a.sTableId + "_" + s: null
                                    }).html(j).appendTo(b);
                                    Wa(t, {
                                        action: s
                                    },
                                    u);
                                    l++
                                }
                            }
                        }
                    },
                    p;
                    try {
                        p = g(b).find(T.activeElement).data("dt-idx")
                    } catch(t) {}
                    m(g(b).empty(), e);
                    p && g(b).find("[data-dt-idx=" + p + "]").focus()
                }
            }
        });
        g.extend(m.ext.type.detect, [function(a, b) {
            var c = b.oLanguage.sDecimal;
            return Za(a, c) ? "num" + c: null
        },
        function(a) {
            if (a && !(a instanceof Date) && (!bc.test(a) || !cc.test(a))) return null;
            var b = Date.parse(a);
            return null !== b && !isNaN(b) || K(a) ? "date": null
        },
        function(a, b) {
            var c = b.oLanguage.sDecimal;
            return Za(a, c, !0) ? "num-fmt" + c: null
        },
        function(a, b) {
            var c = b.oLanguage.sDecimal;
            return Sb(a, c) ? "html-num" + c: null
        },
        function(a, b) {
            var c = b.oLanguage.sDecimal;
            return Sb(a, c, !0) ? "html-num-fmt" + c: null
        },
        function(a) {
            return K(a) || "string" === typeof a && -1 !== a.indexOf("<") ? "html": null
        }]);
        g.extend(m.ext.type.search, {
            html: function(a) {
                return K(a) ? a: "string" === typeof a ? a.replace(Pb, " ").replace(Ca, "") : ""
            },
            string: function(a) {
                return K(a) ? a: "string" === typeof a ? a.replace(Pb, " ") : a
            }
        });
        var Ba = function(a, b, c, e) {
            if (0 !== a && (!a || "-" === a)) return - Infinity;
            b && (a = Rb(a, b));
            a.replace && (c && (a = a.replace(c, "")), e && (a = a.replace(e, "")));
            return 1 * a
        };
        g.extend(v.type.order, {
            "date-pre": function(a) {
                return Date.parse(a) || 0
            },
            "html-pre": function(a) {
                return K(a) ? "": a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + ""
            },
            "string-pre": function(a) {
                return K(a) ? "": "string" === typeof a ? a.toLowerCase() : !a.toString ? "": a.toString()
            },
            "string-asc": function(a, b) {
                return a < b ? -1 : a > b ? 1 : 0
            },
            "string-desc": function(a, b) {
                return a < b ? 1 : a > b ? -1 : 0
            }
        });
        db("");
        g.extend(!0, m.ext.renderer, {
            header: {
                _: function(a, b, c, e) {
                    g(a.nTable).on("order.dt.DT",
                    function(d, f, h, g) {
                        if (a === f) {
                            d = c.idx;
                            b.removeClass(c.sSortingClass + " " + e.sSortAsc + " " + e.sSortDesc).addClass(g[d] == "asc" ? e.sSortAsc: g[d] == "desc" ? e.sSortDesc: c.sSortingClass)
                        }
                    })
                },
                jqueryui: function(a, b, c, e) {
                    g("<div/>").addClass(e.sSortJUIWrapper).append(b.contents()).append(g("<span/>").addClass(e.sSortIcon + " " + c.sSortingClassJUI)).appendTo(b);
                    g(a.nTable).on("order.dt.DT",
                    function(d, f, h, g) {
                        if (a === f) {
                            d = c.idx;
                            b.removeClass(e.sSortAsc + " " + e.sSortDesc).addClass(g[d] == "asc" ? e.sSortAsc: g[d] == "desc" ? e.sSortDesc: c.sSortingClass);
                            b.find("span." + e.sSortIcon).removeClass(e.sSortJUIAsc + " " + e.sSortJUIDesc + " " + e.sSortJUI + " " + e.sSortJUIAscAllowed + " " + e.sSortJUIDescAllowed).addClass(g[d] == "asc" ? e.sSortJUIAsc: g[d] == "desc" ? e.sSortJUIDesc: c.sSortingClassJUI)
                        }
                    })
                }
            }
        });
        m.render = {
            number: function(a, b, c, e, d) {
                return {
                    display: function(f) {
                        if ("number" !== typeof f && "string" !== typeof f) return f;
                        var g = 0 > f ? "-": "",
                        f = Math.abs(parseFloat(f)),
                        i = parseInt(f, 10),
                        f = c ? b + (f - i).toFixed(c).substring(2) : "";
                        return g + (e || "") + i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + f + (d || "")
                    }
                }
            }
        };
        g.extend(m.ext.internal, {
            _fnExternApiFunc: Ob,
            _fnBuildAjax: ra,
            _fnAjaxUpdate: lb,
            _fnAjaxParameters: ub,
            _fnAjaxUpdateDraw: vb,
            _fnAjaxDataSrc: sa,
            _fnAddColumn: Ga,
            _fnColumnOptions: ka,
            _fnAdjustColumnSizing: Y,
            _fnVisibleToColumnIndex: la,
            _fnColumnIndexToVisible: aa,
            _fnVisbleColumns: ba,
            _fnGetColumns: $,
            _fnColumnTypes: Ia,
            _fnApplyColumnDefs: ib,
            _fnHungarianMap: X,
            _fnCamelToHungarian: I,
            _fnLanguageCompat: S,
            _fnBrowserDetect: gb,
            _fnAddData: L,
            _fnAddTr: ma,
            _fnNodeToDataIndex: function(a, b) {
                return b._DT_RowIndex !== k ? b._DT_RowIndex: null
            },
            _fnNodeToColumnIndex: function(a, b, c) {
                return g.inArray(c, a.aoData[b].anCells)
            },
            _fnGetCellData: y,
            _fnSetCellData: Ja,
            _fnSplitObjNotation: La,
            _fnGetObjectDataFn: P,
            _fnSetObjectDataFn: Q,
            _fnGetDataMaster: Ma,
            _fnClearTable: oa,
            _fnDeleteIndex: pa,
            _fnInvalidate: da,
            _fnGetRowElements: na,
            _fnCreateTr: Ka,
            _fnBuildHead: kb,
            _fnDrawHead: fa,
            _fnDraw: M,
            _fnReDraw: R,
            _fnAddOptionsHtml: nb,
            _fnDetectHeader: ea,
            _fnGetUniqueThs: qa,
            _fnFeatureHtmlFilter: pb,
            _fnFilterComplete: ga,
            _fnFilterCustom: yb,
            _fnFilterColumn: xb,
            _fnFilter: wb,
            _fnFilterCreateSearch: Ra,
            _fnEscapeRegex: va,
            _fnFilterData: zb,
            _fnFeatureHtmlInfo: sb,
            _fnUpdateInfo: Cb,
            _fnInfoMacros: Db,
            _fnInitialise: ha,
            _fnInitComplete: ta,
            _fnLengthChange: Sa,
            _fnFeatureHtmlLength: ob,
            _fnFeatureHtmlPaginate: tb,
            _fnPageChange: Ua,
            _fnFeatureHtmlProcessing: qb,
            _fnProcessingDisplay: C,
            _fnFeatureHtmlTable: rb,
            _fnScrollDraw: Z,
            _fnApplyToChildren: H,
            _fnCalculateColumnWidths: Ha,
            _fnThrottle: ua,
            _fnConvertToWidth: Fb,
            _fnGetWidestNode: Gb,
            _fnGetMaxLenString: Hb,
            _fnStringToCss: u,
            _fnScrollBarWidth: Ib,
            _fnSortFlatten: V,
            _fnSort: mb,
            _fnSortAria: Kb,
            _fnSortListener: Va,
            _fnSortAttachListener: Pa,
            _fnSortingClasses: xa,
            _fnSortData: Jb,
            _fnSaveState: ya,
            _fnLoadState: Lb,
            _fnSettingsFromNode: za,
            _fnLog: J,
            _fnMap: F,
            _fnBindAction: Wa,
            _fnCallbackReg: A,
            _fnCallbackFire: w,
            _fnLengthOverflow: Ta,
            _fnRenderer: Qa,
            _fnDataSource: z,
            _fnRowAttributes: Na,
            _fnCalculateEnd: function() {}
        });
        g.fn.dataTable = m;
        g.fn.dataTableSettings = m.settings;
        g.fn.dataTableExt = m.ext;
        g.fn.DataTable = function(a) {
            return g(this).dataTable(a).api()
        };
        g.each(m,
        function(a, b) {
            g.fn.DataTable[a] = b
        });
        return g.fn.dataTable
    };
    "function" === typeof define && define.amd ? define("datatables", ["jquery"], S) : "object" === typeof exports ? module.exports = S(require("jquery")) : jQuery && !jQuery.fn.dataTable && S(jQuery)
})(window, document);