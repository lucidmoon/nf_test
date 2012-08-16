# NF.normaliseTableBorders()

Normalise border properties on simple table objects. 

### Example Table Object
```javascript
var table = {
    cells: [
        [
            {
                rowspan: 1,
                colspan: 1,
                border: {
                    top: 'solid',
                    right: 'solid',
                    bottom: 'solid',
                    left: 'solid'
                }
            },
            {
                rowspan: 1,
                colspan: 1,
                border: {
                    top: 'solid',
                    right: 'solid',
                    bottom: 'solid',
                    left: 'solid'
                }
            },
            {
                rowspan: 1,
                colspan: 1,
                border: {
                    top: 'solid',
                    right: 'solid',
                    bottom: 'solid',
                    left: 'solid'
                }
            }, 
            {
                rowspan: 1,
                colspan: 1,
                border: {
                    top: 'solid',
                    right: 'solid',
                    bottom: 'solid',
                    left: 'solid'
                }
            }
        ],[
            {
                rowspan: 1,
                colspan: 1,
                border: {
                    top: 'solid',
                    right: 'solid',
                    bottom: 'solid',
                    left: 'solid'
                }
            }, {
                rowspan: 1,
                colspan: 1,
                border: {
                    top: 'solid',
                    right: 'solid',
                    bottom: 'solid',
                    left: 'solid'
                }
            }, {
                rowspan: 1,
                colspan: 2,
                border: {
                    top: 'solid',
                    right: 'solid',
                    bottom: 'solid',
                    left: 'solid'
                }
            }
        ]
    ]
};
```

### Requirements:
> Given is a table with R rows and C columns. Each cell can have a "rowspan" and/or a "colspan". Additionally, on each side of the cell (top, bottom, left, right), a border style can be defined. Possible border styles are (strong, normal, weak, solid, dashed, dotted, none).
>
> The expected output of the algorithm is a normalized set of border information where for each cell, only a top and/or left border is defined. This means that whenever a cell has a right or bottom border, those must be "moved" to the adjacent cells as left or top border.
>
> Whenever border styles are defined on adjacent cells (e.g. cell[1,1] has strong right border and cell[1,2] has dotted left border), the border styles are merged (in the example to strong/dotted). Border style merging follows "common sense" insofar as the strength types (strong, normal, weak) can be merged with the style types (solid, dashed, dotted) but two borders from the same type should result in an error (e.g. a cell with dotted right border must not be adjacent to a cell with a dashed left border).

#### Using Python SimpleHTTPServer module to run the test suite:
```bash
$ cd nf_test/
$ python -m SimpleHTTPServer
```
To run Jasmine tests navigate your browser to:
```
http://localhost:8000/tests/SpecRunner.html
```