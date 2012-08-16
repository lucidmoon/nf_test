beforeEach(function() {
	this.table = {
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
    
    this.normalisedTable = NF.normaliseTableBorders(this.table);
});