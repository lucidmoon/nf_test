(function() {

    var table = {

        cells: [ /* Row 1 */ [{
            rowspan: 1,
            colspan: 1,
            border: {
                top: 'normal',
                right: 'dashed',
                bottom: 'dashed',
                left: 'dashed'
            }
        }, {
            rowspan: 1,
            colspan: 1,
            border: {
                top: 'solid',
                right: 'solid',
                bottom: 'solid',
                left: 'dashed'
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
            colspan: 1,
            border: {
                top: 'solid',
                right: 'solid',
                bottom: 'solid',
                left: 'solid'
            }
        }], /* Row 2 */ [{
            rowspan: 1,
            colspan: 1,
            border: {
                top: 'dashed',
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
        }], /* Row 3 */ [{
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
        }]]

    };

    /**
     * Normalise a table's border properties
     * @param {Object} table - The table to be normalised
     * @return {Object} table - The normalised table
     */
    var normaliseTableBorders = function(table) {
            var row, 
                cell, 
                siblings,
                validBorderStyles, 
                normaliseBorderValue,
                validateBorderValues,
                tableCellsLength,
                rowLength;

            validBorderStyles = [
                ['strong', 'solid'],
                ['normal', 'dashed'],
                ['weak', 'dotted'],
                ['none']
            ];

            /**
             * Normalise a borders value
             * @param {String} borderStyleValue - The border value to be normalised
             * @return {String} normalisedValue - The normalised border value
             */
            normaliseBorderValue = function(borderStyleValue) {
                var normalisedValue = false;
                for (var _i = 0; _i < validBorderStyles.length; _i = _i + 1) {
                    if (validBorderStyles[_i].indexOf(borderStyleValue) >= 0) {
                        normalisedValue = validBorderStyles[_i][0];
                    } 
                }
                if (normalisedValue) {
                    return normalisedValue;
                } else {
                    throw new Error("Invalid border type: " + borderStyleValue);
                }
            };

            /**
             * Validate (pre-normalised) adjacent borders values
             * @param {String} borderStyleValue - The border value to be normalised
             * @return {String} normalisedValue - The normalised border value
             */
            validateBorderValues = function(target, source) {
                if (target === source) {
                    return target;
                } else {
                    throw new Error("Incompatible types: '" + target + "' and '" + source + "'");
                }
            };
            // First Pass.  Simply normalise values or throw an error.
            tableCellsLength = table.cells.length;
            for (var _row = 0; _row < tableCellsLength; _row++) {
                row = table.cells[_row];
                rowLength = row.length
                for (var _col = 0; _col < rowLength; _col++) {
                    cell = row[_col];
                    for (position in cell.border) {
                        cell.border[position] = normaliseBorderValue(cell.border[position]);
                    }
                }
            }
            // Second Pass. Validate & re-apply border values
            for (var _row = 0; _row < tableCellsLength; _row++) {
                row = table.cells[_row];
                for (var _col = 0; _col < rowLength; _col++) {
                    cell = row[_col];
                    siblings = {
                        top: table.cells[_row - 1] ? table.cells[_row - 1][_col] : null,
                        right: table.cells[_row][_col + 1],
                        bottom: table.cells[_row + 1] ? table.cells[_row + 1][_col] : null,
                        left: table.cells[_row][_col - 1]
                    };
                    for (position in cell.border) {
                        if (position === 'right' && cell.border[position]) {
                            if (siblings.right && siblings.right.border && siblings.right.border.left) {
                                siblings.right.border.left = validateBorderValues(siblings.right.border.left, cell.border[position])
                            }
                            delete cell.border[position];
                        }
                        if (position === 'bottom' && cell.border[position]) {
                            if (siblings.bottom && siblings.bottom.border && siblings.bottom.border.top) {
                                siblings.bottom.border.top = validateBorderValues(siblings.bottom.border.top, cell.border[position]);
                            }
                            delete cell.border[position];
                        }
                    }
                }
            }
            return table;
        }
    console.log(normaliseTableBorders(table));
}());