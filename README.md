# ChordChartWP
This is a wordpress shortcode for the javascript library chordography2 (https://chordography2.blogspot.com/). It is easy to use, plug and go, and can be intensively costumized with several parameters. 

### Prerequisites
This is a wordpress plugin. So you need to have a self hosted wordpress to be able to use it. Also the chordography2 uses the latest version of javascript language style so your browser should support variable declaration such as let and so one. 

### Installation
Just download the folder and either add it via the plugin manager in web interface or upload it via Ftp. 

### Usage
To visualize a chord from the database just write
```
[chordchart title="C"]
```
For more chords from the database
```
[chordchart title="A,B,C,D,E,F,G"]
```
For custom chords
```
[chordchart title="Am7,DM7" frets="x02010,x57675" labels="xx2x1x,x13241"]
```
For mixed of chords from database and custom chords
```
[chordchart title="C,D,Em" frets=",,022000" labels=",,x12xxx"]
```
For chord in higher position of the neck you could use parantheses to define them
```
[chordchart title="C" frets="8(10)(10)988" labels="134211"]
```
You could also ignore the label parameter but then the barre sign will not be rendered for E-shape and A-shape chords.

You can see the renderings at the following page
https://www.gasytablature.com/chordchartwp/

To change the style, you could use parameter such as style="pretty" or cellHeight=34, etc.,. in the short code. The other parameter can be found in the chart.data.js file

### TODOs and Contribute
I wrote this mostly for guitar. So the provided database for quick chord look up is based on guitar. It would be nice to have first a "full" database of common chord chart not only for guitar but for any fretted string instrument e.g Ukulele and Banjo...
If you would like to contribute, then just do a pull request :) 

## Licence
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
