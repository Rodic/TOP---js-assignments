describe("Game", function() {

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

  describe("#gameEnd", function() {

    it("Ends when there are 3 same marks in a row", function() {
      for(var row = 0; row < 2; row++) {
        table.setX($('.row-'+ row + '.col-0'));
        table.setX($('.row-'+ row + '.col-1'));
        table.setX($('.row-'+ row + '.col-2'));

        expect(game.gameEnd()).toBeTruthy();
      }
    });

    it("Fails to End game when there are no 3 same marks in a row", function() {
      for(var row = 0; row < 2; row++) {
        table.setO($('.row-'+ row + '.col-0'));
        table.setX($('.row-'+ row + '.col-1'));
        table.setX($('.row-'+ row + '.col-2'));

        expect(game.gameEnd()).toBeFalsy();
      }
    });

    it("Ends when there are 3 same marks in a col", function() {
      for(var col = 0; col < 2; col++) {
        table.setO($('.row-0.col-'+ col));
        table.setO($('.row-1.col-'+ col));
        table.setO($('.row-2.col-'+ col));

        expect(game.gameEnd()).toBeTruthy();
      }
    });

    it("Fails to end game when there are no 3 same marks in a col", function() {
      for(var col = 0; col < 2; col++) {
        table.setO($('.row-0.col-'+ col));
        table.setX($('.row-1.col-'+ col));
        table.setO($('.row-2.col-'+ col));

        expect(game.gameEnd()).toBeFalsy();
      }
    });

    it("Ends when there are 3 same marks in the raising col", function() {
      table.setO($('.row-0.col-2'));
      table.setO($('.row-1.col-1'));
      table.setO($('.row-2.col-0'));

      expect(game.gameEnd()).toBeTruthy();
    });

    it("Fails to end game when there are no 3 same marks in the raising col", function() {
      table.setX($('.row-0.col-2'));
      table.setX($('.row-1.col-1'));
      table.setO($('.row-2.col-0'));

      expect(game.gameEnd()).toBeFalsy();
    });

    it("Ends when there are 3 same marks in the falling col", function() {
      table.setX($('.row-0.col-0'));
      table.setX($('.row-1.col-1'));
      table.setX($('.row-2.col-2'));

      expect(game.gameEnd()).toBeTruthy();
    });

    it("Fails to End game when there are no 3 same marks in the falling col", function() {
      table.setX($('.row-0.col-0'));
      table.setO($('.row-1.col-1'));
      table.setX($('.row-2.col-2'));

      expect(game.gameEnd()).toBeFalsy();
    });
  });
});