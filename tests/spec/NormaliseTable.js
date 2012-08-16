describe("NF.normaliseTableBorders()", function() {
  describe("Table 1", function() {
    beforeEach(function() {
      this.table.cells[1][0].border.right = 'normal';
      this.table.cells[1][1].border.left = 'dashed';
      this.normalisedTable = NF.normaliseTableBorders(this.table);
    })
    it("should remove right border property", function() {
      expect(this.normalisedTable.cells[1][0].border.right).toBeUndefined();
    });  
    it("should normalise valid border properties", function() {
      expect(this.normalisedTable.cells[1][1].border.left).toEqual("normal");      
    });
  });

  describe("Table 2", function() {
    beforeEach(function() {
      this.table.cells[1][1].border.bottom = 'solid';
      this.table.cells[2][1].border.top = 'strong';
      this.normalisedTable = NF.normaliseTableBorders(this.table);
    })
    it("should remove bottom border property", function() {
      expect(this.normalisedTable.cells[1][1].border.bottom).toBeUndefined();
    });  
    it("should normalise valid border property", function() {
      expect(this.normalisedTable.cells[2][1].border.top).toEqual("strong");      
    });
  });
  
}); 