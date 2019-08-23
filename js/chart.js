/////////////////////////////////////////////////////////////////
//                                                             //
//         Copyright Â© 2013, 2018. All rights reserved         //
//                                                             //
/////////////////////////////////////////////////////////////////
function chordography(com) { // core object modifier
    let // properties
        core = { // default core data
            barre: "auto",
            barHeight: 8,
            barGirth: 3,
            cellWidth: 20,
            cellHeight: 20,
            dotSize: 16,
            fontHeight: 14,
            fontBaseline: 5,
            minSpan: 4,
            nutHeight: 4,
            padding: 7,
            scale: 1,
            style: "default"
        },
        x, y, dx, dy, yt, yh, w, h, s, // extended core data 
        vod, // variant object data
        lo, hi, m, n, open, bar, // extended variant data
        xmlns = "http://www.w3.org/2000/svg",
        // methods
        createVOD = function (udi) { // create variant data
            let toArray = str => str ? str.split(",") : [],
                frets = toArray(udi.frets)
                    .map(Number); // Array of Number/NaN
            m = frets.length;  // No: of strings
            vod = frets.reduce((v, x, i) => {
                if (x > 0) v.frets[i] = x
                else v.header[i] = x === 0 ? "o" : "x"; // NaN -> "x"
                return v
            }, { // init vod
                    "title": udi.title,
                    "header": [],
                    "frets": [],
                    "labels": toArray(udi.labels),
                    "footer": toArray(udi.footer)
                });
            extendVOD()
        }, // create variant data
        extendVOD = function () { // extend variant data
            if (vod.frets.length) {
                lo = vod.frets.reduce((r, x) => x < r ? x : r); // min fret
                hi = vod.frets.reduce((r, x) => x > r ? x : r)  // max fret
            } else {
                lo = 1;
                hi = core.minSpan
            };
            n = Math.max(core.minSpan, hi - lo + 1); // No: of frets
            open = lo < 2 || hi <= n; // show nut or loFret
            bar = createBar(vod.frets, vod.labels) // Array of {fret, first, last}
        }, // extend vod
        createBar = function (frets, labs) {
            return frets.reduce((r, f, i) => { // Array of {fret, [posn]}
                let j = r.map(x => x.fret).indexOf(f);
                if (j < 0) r.push({ "fret": f, "posn": [i] })
                else r[j].posn.push(i);
                return r
            }, [])
                .filter(x => x.posn.length > 1)          // singletons
                .filter(x => x.posn.every(i => labs[i])) // unlabeled
                .filter(x => x.posn                      // non-uniform labels
                    .reduce((r, i) => { // Array of labels
                        if (r.indexOf(labs[i]) < 0) r.push(labs[i]);
                        return r
                    }, []).length < 2
                )
                .map(x => {                              // add first, last
                    x.first = x.posn[0];
                    x.last = x.posn[x.posn.length - 1]
                    return x
                })
                .sort((a, b) => a.fret - b.fret)
        },
        extendCore = function () { // extend core data
            dx = core.cellWidth;
            x = core.padding + dx * (open ? 1 : 3) / 2;
            dy = core.cellHeight;
            yt = core.padding + (vod.title ? dy : 0);
            yh = yt + dy;
            y = yh + (open ? core.nutHeight : 0);
            w = x + dx * (m - 0.5) + core.padding;
            h = y + dy * (n + (vod.footer.length ? 1 : 0)) + core.padding;
            s = data.style[core.style] || {}
        }, // extend core data
        addNode = function (tag, attr, parent) { // create node, add to parent
            let child = document.createElementNS(xmlns, tag);
            addAttr(attr, child);
            if (parent) parent.appendChild(child);
            return child
        },
        addAttr = function (attr, node) { // add attributes to node
            Object.keys(attr).forEach(key => {
                if (attr[key]) node.setAttribute(key, attr[key])
            })
        },
        addText = function (txt, parent) { // create text node, add to parent
            let child = document.createTextNode(txt);
            parent.appendChild(child);
        },
        o = (x, d) => Number(x.toFixed(d === undefined ? 1 : d)); // round x
    Object.keys(com).forEach(key => { // customise core object with modifier
        if (core.hasOwnProperty(key))
            core[key] = isNaN(core[key]) ? com[key] : com[key] -= 0
    });
    return function (udi, placeholder) {
        createVOD(udi);
        extendCore();
        let // main structure
            chart = addNode("svg", {
                "class": "chart",
                "xmlns": xmlns,
                "width": o(w * core.scale, 0),
                "height": o(h * core.scale, 0),
                "viewBox": `0 0 ${o(w, 0)} ${o(h, 0)}`,
                "preserveAspectRatio": "xMidYMid meet",
                "style": s.chart
            }, placeholder),
            grid = addNode("g", {
                "class": "grid",
                "style": s.grid
            }, chart),
            text = addNode("g", {
                "class": "text",
                "font-size": o(core.fontHeight),
                "text-anchor": "middle",
                "style": s.text
            }, chart);
        // grid substructure
        addNode("path", { // frets
            "class": "frets",
            "d": Array(n + 1).fill(1).reduce((r, v, i) => r + (!open || i ?
                `M${o(x)},${o(y + i * dy)} h${o((m - 1) * dx)}` : ""), ""),
            "style": s.frets
        }, grid);
        addNode("path", { // strings
            "class": "strings",
            "d": Array(m).fill(1).reduce((r, v, i) => r +
                `M${o(x + i * dx)},${o(y)} v${o(n * dy)}`, ""),
            "style": s.strings
        }, grid);
        if (open) { // nut
            let nutPath = (x, y, w, h) => {
                return `M${o(x)},${o(y)}` +
                    `h${-h / 2} a${h / 2},${h / 2} 0 0 1 0,${-o(h)}` +
                    `h${o(w + h)} a${h / 2},${h / 2} 0 0 1 0,${o(h)}z`
            };
            addNode("path", {
                "class": "nut",
                "d": nutPath(x, y, (m - 1) * dx, core.nutHeight),
                "style": s.nut
            }, grid)
        };
        if (core.barre !== "none" && bar.length) { // barre
            let barPath = (x, y, w, h, g) => {
                return `M${o(x)},${o(y)}` +
                    `a${o(w / 2)},${o(h - g / 2)} 0 0 1 ${o(w)},0` +
                    `a${o(w / 2)},${o(h + g / 2)} 0 0 0 ${-o(w)},0z`
            },
                addBar = b => addNode("path", {
                    "class": "barre",
                    "d": barPath(
                        x + dx * b.first - core.dotSize / 2,
                        y + dy * (b.fret + 0.5 - (open ? 1 : lo)) - core.dotSize / 2,
                        dx * (b.last - b.first) + core.dotSize,
                        core.barHeight, core.barGirth
                    ),
                    "style": s.barre
                }, grid); // addBar
            if (core.barre === "auto") bar.forEach(x => addBar(x))
            else if (core.barre === "simple") addBar(bar[0])
        };
        let dots = addNode("g", { // dots
            "class": "dots",
            "style": s.dots
        }, grid);
        vod.frets.forEach((f, i) => {
            if (f) addNode("circle", {
                "cx": o(x + i * dx),
                "cy": o(y + (f + 0.5 - (open ? 1 : lo)) * dy),
                "r": o(core.dotSize / 2)
            }, dots)
        });
        // text substructure
        if (vod.title) // title
            addText(vod.title, addNode("text", {
                "class": "title",
                "x": o(w / 2),
                "y": o(yt),
                "style": s.title
            }, text));
        if (vod.header.length) { // header
            let header = addNode("text", {
                "class": "header",
                "style": s.header
            }, text);
            vod.header.forEach((v, i) => {
                addText(v, addNode("tspan", {
                    "x": o(x + i * dx),
                    "y": o(yh - dy / 2 + core.fontBaseline)
                }, header))
            })
        };
        if (vod.labels.length) {// labels
            let labels = addNode("text", {
                "class": "labels",
                "style": s.labels
            }, text);
            vod.frets.forEach((f, i) => {
                if (vod.labels[i]) addText(vod.labels[i], addNode("tspan", {
                    "x": o(x + i * dx),
                    "y": o(y + (f + 0.5 - (open ? 1 : lo)) * dy + core.fontBaseline)
                }, labels))
            })
        };
        if (!open)  // loFret
            addText(lo, addNode("text", {
                "class": "loFret",
                "x": o(core.padding + dx / 2),
                "y": o(y + dy / 2 + core.fontBaseline),
                "style": s.loFret
            }, text));
        if (vod.footer.length) { // footer
            let footer = addNode("text", {
                "class": "footer",
                "style": s.footer
            }, text);
            vod.footer.forEach((v, i) => {
                if (v && vod.header[i] !== "x")
                    addText(v, addNode("tspan", {
                        "x": o(x + i * dx),
                        "y": o(y + dy * (n + 0.5) + core.fontBaseline)
                    }, footer))
            })
        };
        return chart
    }; // anon
}; // chordography
