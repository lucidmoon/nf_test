var NF = {};

/**
 * Normalise a table's border properties
 * @param {Object} table - The table to be normalised
 * @return {Object} table - The normalised table
 */
NF.normaliseTableBorders = function(table) {
    var row, cell, siblings, validBorderStyles, normaliseBorderValue, validateBorderValues, tableCellsLength, rowLength, i, normalisedValue, _row, _col;

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
        normalisedValue = false;
        for (_i = 0; _i < validBorderStyles.length; _i++) {
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
    for (_row = 0; _row < tableCellsLength; _row++) {
        row = table.cells[_row];
        rowLength = row.length;
        for (_col = 0; _col < rowLength; _col++) {
            cell = row[_col];
            for (position in cell.border) {
                cell.border[position] = normaliseBorderValue(cell.border[position]);
            }
        }
    }
    // Second Pass. Validate & re-apply border values
    for (_row = 0; _row < tableCellsLength; _row++) {
        row = table.cells[_row];
        for (_col = 0; _col < rowLength; _col++) {
            cell = row[_col];
            siblings = {
                top: table.cells[_row - 1] ? table.cells[_row - 1][_col] : null,
                right: table.cells[_row][_col + 1] ? table.cells[_row][_col + 1] : null,
                bottom: table.cells[_row + 1] ? table.cells[_row + 1][_col] : null,
                left: table.cells[_row][_col - 1] ? table.cells[_row][_col - 1] : null
            };
            for (position in cell.border) {
                if (position === 'right' && cell.border[position]) {
                    if (siblings.right && siblings.right.border && siblings.right.border.left) {
                        siblings.right.border.left = validateBorderValues(siblings.right.border.left, cell.border[position]);
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
};