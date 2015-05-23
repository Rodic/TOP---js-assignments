describe("TableEvaluator", function() {

  var table;
  var game;

  beforeEach(function(){
    $("#jasmine_content").append($('<div id="table"></div>'));
    table = new Table("#table");
    game = new Game(table);
    table.render();
  });

  afterEach(function() {
    $("#jasmine_content").empty();
  });

  describe("#evaluate", function() {

    it("Evaluates to -10 when there are 3 xs in a row and player is 'o'", function() {
      for(var row = 0; row < 2; row++) {
        table.setX($('.row-'+ row + '.col-0'));
        table.setX($('.row-'+ row + '.col-1'));
        table.setX($('.row-'+ row + '.col-2'));

        expect(TableEvaluator.evaluate(table, 'o')).toEqual(-10);
      }
    });

    it("Evaluates to 0 when there are no 3 same marks in a row", function() {
      for(var row = 0; row < 2; row++) {
        table.setO($('.row-'+ row + '.col-0'));
        table.setX($('.row-'+ row + '.col-1'));
        table.setX($('.row-'+ row + '.col-2'));

        expect(TableEvaluator.evaluate(table, 'o')).toEqual(0);
      }
    });

    it("Evaluates to 10 when there are 3 os in a col and player is 'o'", function() {
      for(var col = 0; col < 2; col++) {
        table.setO($('.row-0.col-'+ col));
        table.setO($('.row-1.col-'+ col));
        table.setO($('.row-2.col-'+ col));

        expect(TableEvaluator.evaluate(table, 'o')).toEqual(10);
      }
    });

    it("Evaluates to 0 when there are no 3 same marks in a col", function() {
      for(var col = 0; col < 2; col++) {
        table.setO($('.row-0.col-'+ col));
        table.setX($('.row-1.col-'+ col));
        table.setO($('.row-2.col-'+ col));

        expect(TableEvaluator.evaluate(table, 'x')).toEqual(0);
      }
    });

    it("Evaluates to 10 when there are 3 os in the raising col and player is 'o'", function() {
      table.setO($('.row-0.col-2'));
      table.setO($('.row-1.col-1'));
      table.setO($('.row-2.col-0'));

      expect(TableEvaluator.evaluate(table, 'o')).toEqual(10);
    });

    it("Evaluates to 0 when there are no 3 same marks in the raising col", function() {
      table.setX($('.row-0.col-2'));
      table.setX($('.row-1.col-1'));
      table.setO($('.row-2.col-0'));

      expect(TableEvaluator.evaluate(table, 'o')).toEqual(0);
    });

    it("Evaluates to 10 when there are 3 xs in the falling col and player is 'x'", function() {
      table.setX($('.row-0.col-0'));
      table.setX($('.row-1.col-1'));
      table.setX($('.row-2.col-2'));

      expect(TableEvaluator.evaluate(table, 'x')).toEqual(10);
    });

    it("Evaluates to 0 when there are no 3 same marks in the falling col", function() {
      table.setX($('.row-0.col-0'));
      table.setO($('.row-1.col-1'));
      table.setX($('.row-2.col-2'));

      expect(TableEvaluator.evaluate(table, 'x')).toEqual(0);
    });

    it("Evaluates to 1 when game is draw", function() {
      table.setX($('.row-0.col-0'));
      table.setO($('.row-0.col-1'));
      table.setX($('.row-0.col-2'));
      table.setX($('.row-1.col-0'));
      table.setO($('.row-1.col-1'));
      table.setX($('.row-1.col-2'));
      table.setO($('.row-2.col-0'));
      table.setX($('.row-2.col-1'));
      table.setO($('.row-2.col-2'));

      expect(TableEvaluator.evaluate(table, 'x')).toEqual(1);
    });
  });
});