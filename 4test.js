(function() {

var table = {

    cells: [
        /* Row 1 */
        [
        {
        rowspan: 1,
        colspan: 1,
        border: {
            top: 'solid',
            right: 'solid',
            bottom: 'solid',
            left: 'solid'
        }},
    {
        rowspan: 1,
        colspan: 1,
        border: {
            top: 'solid',
            right: 'solid',
            bottom: 'solid',
            left: 'solid'
        }},
    {
        rowspan: 1,
        colspan: 1,
        border: {
            top: 'solid',
            right: 'solid',
            bottom: 'solid',
            left: 'solid'
        }},
    {
        rowspan: 1,
        colspan: 1,
        border: {
            top: 'solid',
            right: 'solid',
            bottom: 'solid',
            left: 'solid'
        }}
    ],
        /* Row 2 */
        [
        {
        rowspan: 1,
        colspan: 1,
        border: {
            top: 'solid',
            right: 'solid',
            bottom: 'solid',
            left: 'solid'
        }},
    {
        rowspan: 1,
        colspan: 1,
        border: {
            top: 'solid',
            right: 'solid',
            bottom: 'solid',
            left: 'solid'
        }},
    {
        rowspan: 1,
        colspan: 2,
        border: {
            top: 'solid',
            right: 'solid',
            bottom: 'solid',
            left: 'solid'
        }}
    ],
        /* Row 3 */
        [
        {
        rowspan: 1,
        colspan: 1,
        border: {
            top: 'solid',
            right: 'solid',
            bottom: 'solid',
            left: 'solid'
        }},
    {
        rowspan: 1,
        colspan: 1,
        border: {
            top: 'solid',
            right: 'solid',
            bottom: 'solid',
            left: 'solid'
        }},
    {
        rowspan: 1,
        colspan: 2,
        border: {
            top: 'solid',
            right: 'solid',
            bottom: 'solid',
            left: 'solid'
        }}
    ]
        ]

};



/**
 * Normalise a table's border properties
 * @param {Object} table - The table to be normalised
 * @return {Object} table - The normalised table
 */
var normaliseTableBorders = function(table) {
    var row, cell, validBorderStyles;

    validBorderStyles = [
        ['strong','solid'],
        ['normal','dashed'],
        ['weak','dotted'],
        ['none']
    ];

    var normaliseBorderValue = function(borderStyleValue) {
        for (style in validBorderStyles) {
            if (validBorderStyles[style].indexOf(borderStyleValue) > 0) {
                return validBorderStyles[style][0];
            }
        }
        return false;
    };

    var normaliseBorderValues = function(target, source) {
        var style, tmp, match, returnValue = '';

        target = normaliseBorderValue(target);
        source = normaliseBorderValue(source);

        if (target === source) {
            return target;
        } else {
            throw new Error("Incompatible types");
        }
        
    };
    
    for (var _row = 0; _row < table.cells.length; _row++) {
        row = table.cells[_row];
        for (var _col = 0; _col < row.length; _col++) {
            cell = row[_col];
            
            var siblings = {
                top: table.cells[_row - 1] ? table.cells[_row - 1][_col] : null,
                right: table.cells[_row][_col + 1],
                bottom: table.cells[_row + 1] ? table.cells[_row + 1][_col] : null,
                left: table.cells[_row][_col - 1]
            };

            for (position in cell.border) {

                if (position === 'top' && cell.border[position]) {
                    cell.border[position] = normaliseBorderValues(cell.border[position],cell.border[position])
                }
                if (position === 'right' && cell.border[position]) {
                    if (siblings.right && siblings.right.border) {
                        if (siblings.right.border.left) {
                            siblings.right.border.left = normaliseBorderValues(siblings.right.border.left,cell.border[position])
                        }
                        
                    }   
                    delete cell.border[position];                
                }
                if (position === 'bottom' && cell.border[position]) {
                    if (siblings.bottom && siblings.bottom.border) {
                        if (siblings.bottom.border.top) {
                            siblings.bottom.border.top = normaliseBorderValues(siblings.bottom.border.top,cell.border[position]);
                        }
                    }
                    delete cell.border[position];                
                }
                if (position === 'left' && cell.border[position]) {
                    cell.border[position] = normaliseBorderValues(cell.border[position],cell.border[position])
                }


                
            }
        }
    }
    
    return table;
}

console.log(normaliseTableBorders(table));

}())