(function() {

    var table = {

        cells: [ /* Row 1 */ [{
            rowspan: 1,
            colspan: 1,
            border: {
                top: 'dashed',
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
            var row, cell, validBorderStyles;

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
            var normaliseBorderValue = function(borderStyleValue) {
                    var normalisedValue = false;
                    for (var _i = 0; _i < validBorderStyles.length; _i = _i + 1) {
                        if (validBorderStyles[_i].indexOf(borderStyleValue) > 0) {
                            normalisedValue = validBorderStyles[_i][0];
                        } else {
                            var lastUnmatchedIndexId = validBorderStyles[_i].indexOf(borderStyleValue);
                        }
                    }

                    if (normalisedValue) {
                        return normalisedValue;
                    } else {
                        console.log(lastUnmatchedIndexId);
                        throw new Error("Invalid border type: " + borderStyleValue);
                    }
                };

            /**
             * Validate (pre-normalised) adjacent borders values
             * @param {String} borderStyleValue - The border value to be normalised
             * @return {String} normalisedValue - The normalised border value
             */
            var validateBorderValues = function(target, source) {
                    if (target === source) {
                        return target;
                    } else {
                        throw new Error("Incompatible types: '" + target + "' and '" + source + "'");
                    }
                };

            // First Pass.  Simply normalise values or throw an error.
            for (var _row = 0; _row < table.cells.length; _row++) {
                row = table.cells[_row];
                for (var _col = 0; _col < row.length; _col++) {
                    cell = row[_col];
                    for (position in cell.border) {
                        cell.border[position] = normaliseBorderValue(cell.border[position]);
                    }
                }
            }

            // Second Pass. Validate & re-apply border values
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