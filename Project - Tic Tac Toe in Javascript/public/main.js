var Game = function(table) {

  var table = table;
  var move = 0;

  var that = this;

  this.gameEnd = function() {

    var mapClassesToInts = function(cell) {
      if($(cell).hasClass('x'))
        return 1
      else if($(cell).hasClass('o'))
        return -1
      else
        return 0
    };

    var isSeqComplete = function(arr) {
      var mapped = arr.map(mapClassesToInts);
      var summed = mapped.reduce(function(a, b) { return a + b });

      if(summed === 3) {
        alert("X won!"); 
        return true;
      } else if(summed === -3) {
        alert("O won!"); 
        return true;
      } else {
        return false;
      }
    }

    var areSeqsComplete = function(getSeq) {
      for(var i = 0; i < 3; i++) {
        var done = isSeqComplete(getSeq(i));
        if(done)
          return true;
      }
      return false;
    }

    var isDraw = function() {
      if ($('.blank').length === 0) {
        alert('Draw!');
        return true;
      } else {
        return false;
      }
    }

    var checkRows = areSeqsComplete(table.getRow);
    var checkCols = areSeqsComplete(table.getCol);
    var checkRisingDiagonal  = isSeqComplete(table.getRaisingDiagonal());
    var checkFallingDiagonal = isSeqComplete(table.getFallingDiagonal());

    return checkRows || checkCols || checkRisingDiagonal || checkFallingDiagonal || isDraw();
  }

  this.play = function() {
    if(move % 2 === 0) {
      table.setX(this);
    } else {
      table.setO(this);
    }

    that.gameEnd();
    move += 1;
  }

  this.init = function() {
    table.render();
    $(".cell").click(this.play);
  }
};

var Table = function(parentDiv) {

  var parent = $(parentDiv);

  this.render = function() {
    for(var row = 0; row < 3; row++) {
      for(var col = 0; col < 3; col++) {
        parent.append('<div class="blank cell row-'+ row +' col-'+ col +'"></div>');
      }
    }
  }

  var setMark = function(mark) {
    return function(field) {
      field = $(field);
      if(field.hasClass('blank')) {
        field.removeClass('blank');
        field.addClass(mark);
      } else
        throw "Field is not blank!";
    }
  }

  this.setX = setMark('x');
  this.setO = setMark('o');

  this.getRow = function(n) {
    return $('.row-' + n).toArray();
  }

  this.getCol = function(n) {
    return $('.col-' + n).toArray();
  }

  this.getRaisingDiagonal = function() {
    return [ $('.row-0.col-2'), $('.row-1.col-1'), $('.row-2.col-0') ];
  }

  this.getFallingDiagonal = function() {
    return [ $('.row-0.col-0'), $('.row-1.col-1'), $('.row-2.col-2') ];
  }
};

$(document).ready(function() {
  var table = new Table("#table");
  var game  = new Game(table);
  game.init();
});
