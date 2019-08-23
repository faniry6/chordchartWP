/////////////////////////////////////////////////////////////////
//                                                             //
//            Copyright Â© 2018. All rights reserved            //
//                                                             //
/////////////////////////////////////////////////////////////////
data = {
    "udi": {
        "open": {
            "C": {
                "title": "C",
                "frets": "x,3,2,0,1,0",
                "labels": "x,3,2,0,1,0",
                "footer": " ,C,E,G,C,E"
            },
            "A": {
                "title": "A",
                "frets": "x,0,2,2,2,0",
                "labels": "x,0,1,2,3,0",
                "footer": " ,A,E,A,Câ™¯,E"
            },
            "G": {
                "title": "G",
                "frets": "3,2,0,0,0,3",
                "labels": "2,1,0,0,0,3",
                "footer": "G,B,D,G,B,D"
            },
            "E": {
                "title": "E",
                "frets": "0,2,2,1,0,0",
                "labels": "0,2,3,1,0,0",
                "footer": "E,B,E,Gâ™¯,B,E"
            },
            "D": {
                "title": "D",
                "frets": "x,x,0,2,3,2",
                "labels": "x,x,0,1,3,2",
                "footer": " , ,D,A,D,Fâ™¯"
            },
            "Am": {
                "title": "Am",
                "frets": "x,0,2,2,1,0",
                "labels": "x,0,2,3,1,0",
                "footer": " ,A,E,A,C,E"
            },
            "Em": {
                "title": "Em",
                "frets": "0,2,2,0,0,0",
                "labels": "0,2,3,0,0,0",
                "footer": "E,B,E,G,B,E"
            },
            "Dm": {
                "title": "Dm",
                "frets": "x,x,0,2,3,1",
                "labels": "x,x,0,2,3,1",
                "footer": " , ,D,A,D,F"
            }
        },
        "caged": {
            "F": {
                "title": "F",
                "frets": "x,8,7,5,6,5",
                "labels": "x,4,3,1,2,1",
                "footer": " ,F,A,C,F,A"
            },
            "D": {
                "title": "D",
                "frets": "x,5,7,7,7,5",
                "labels": "x,1,2,3,4,1",
                "footer": " ,D,A,D,Fâ™¯,A"
            },
            "C": {
                "title": "C",
                "frets": "8,7,5,5,5,8",
                "labels": "3,2,1,1,1,4",
                "footer": "C,E,G,C,E,G"
            },
            "A": {
                "title": "A",
                "frets": "5,7,7,6,5,5",
                "labels": "1,3,4,2,1,1",
                "footer": "A,E,A,Câ™¯,E,A"
            },
            "G": {
                "title": "G",
                "frets": "x,x,5,7,8,7",
                "labels": "x,x,1,2,4,3",
                "footer": " , ,G,D,G,B"
            }
        },
        "misc": {
            "C7b9": {
                "title": "C7â™­9",
                "frets": "x,3,2,3,2,3",
                "labels": "x,2,1,3,1,4",
                "footer": ",C,E,Bâ™­,Dâ™­,G"
            },
            "Cm": {
                "title": "Cm",
                "frets": "x,3,5,5,4,3",
                "labels": "x,1,3,4,2,1",
                "footer": ",C,G,C,Eâ™­,G"
            },
            "F#m": {
                "title": "Fâ™¯m",
                "frets": "2,4,4,2,2,2",
                "labels": "1,3,4,1,1,1",
                "footer": "Fâ™¯,Câ™¯,Fâ™¯,A,Câ™¯,Fâ™¯"
            }
        },
        "banjo": {
            "Dmin": {
                "frets": "0,2,3,3"
            },
            "Dm": {
                "title": "Dm",
                "frets": "0,2,3,3",
                "labels": "0,1,2,3",
                "footer": "D,A,D,F"
            }
        }
    },
    "style": {
        "default": {
            "chart": "background: white",
            "grid": "stroke: black; stroke-linecap: round",
            "text": "font-family: Tahoma, Arial, sans-serif",
            "title": "font-size:150%; font-weight: bold",
            "labels": "fill: white"
        },
        "blue": {
            "chart": "background: #8af",
            "grid": "stroke: darkblue; stroke-linecap: square",
            "dots": "fill: white",
            "text": "fill: darkblue; font-family:'Arial Black', sans-serif",
            "title": "font-size:150%; font-weight: bold"
        },
        "cool": {
            "chart": "background: #def; stroke: #448; fill: white",
            "grid": "stroke-linecap: round",
            "frets": "stroke-width: 2",
            "strings": "stroke: #aaa",
            "text": "fill: #448; stroke: none; font-family: 'Comic Sans MS', cursive",
            "title": "stroke: #448; fill: white; font-weight: bold; font-size: 200%"
        },
        "grey": {
            "chart": "background: #ddd",
            "grid": "stroke: black; stroke-linecap: square",
            "nut": "fill: #ddd",
            "dots": "fill: white",
            "text": "font-family: Arial, sans-serif",
            "title": "font-size: 150%"
        },
        "negative": {
            "chart": "background: black; fill: white",
            "grid": "stroke: white; stroke-linecap: square",
            "text": "font-family: Arial, sans-serif",
            "labels": "fill: black; font-weight: bold",
            "title": "font-size:150%"
        },
        "plain": {
            "grid": "stroke: black",
            "labels": "fill: white"
        },
        "pretty": {
            "chart": "background:#fff",
            "grid": "stroke: blue; fill: white; stroke-linecap: round",
            "text": "font-family: Times, serif",
            "title": "fill: blue; font-size: 175%; font-weight: bold",
            "labels": "fill: red; font-weight: bold"
        },
        "none": {}
    },
    "core": { // default core data
        "barre": "auto",
        "barHeight": 9,
        "barGirth": 3,
        "cellWidth": 20,
        "cellHeight": 20,
        "dotSize": 16,
        "fontHeight": 14,
        "fontBaseline": 5,
        "minSpan": 4,
        "nutHeight": 4,
        "padding": 7,
        "scale": 1,
        "style": "default"
    }
};
