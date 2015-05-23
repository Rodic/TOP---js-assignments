var TableEvaluator = {

  evaluate : function(table, playerMark) {

    var mapClassesToInts = function(cell) {
      if($(cell).hasClass('x'))
        return 1
      else if($(cell).hasClass('o'))
        return -1
      else
        return 0
    };

    var evaluateSeq = function(arr) {
      var mapped = arr.map(mapClassesToInts);
      var summed = mapped.reduce(function(a, b) { return a + b });

      // Revard for winning is 10 points and for losing -10, 0 signals game is not complete
      if((summed === 3 && playerMark === 'x') || (summed === -3 && playerMark === 'o'))
        return 10;
      else if((summed === 3 && playerMark === 'o') || (summed === -3 && playerMark === 'x'))
        return -10
      else
        return 0;
    }

    var evaluateSeqs = function(getTableSeq) {
      for(var i = 0; i < 3; i++) {
        var score = evaluateSeq(getTableSeq(i));
        if(score !== 0)
          return score;
      }
      return 0;
    }

    var isDraw = function() {
      // Revard for draw is 1 point
      return ($('.blank').length === 0) ? 1 : 0;
    }

    var max = function(arr, fn) {
      var i = 0
      for(var j = 0; j < arr.length; j++) {
        if(fn(arr[j]) > fn(arr[i])) {
          i = j;
        }
      }
      return arr[i];
    }

    var evalRows = evaluateSeqs(table.getRow);
    var evalCols = evaluateSeqs(table.getCol);
    var evalRisingDiagonal  = evaluateSeq(table.getRaisingDiagonal());
    var evalFallingDiagonal = evaluateSeq(table.getFallingDiagonal());

    return max([ evalRows, evalCols, evalRisingDiagonal, evalFallingDiagonal, isDraw() ], Math.abs);
  }
}

var Game = function(table) {

  var table = table;
  var move = 0;
  var playerMark;

  this.play = function() {
    if(move % 2 === 0) {
      table.setX(this);
      playerMark = 'x';
    } else {
      table.setO(this);
      playerMark = 'o';
    }

    var score = TableEvaluator.evaluate(table, playerMark);
    if(score === 10)
      alert('Player ' + playerMark + ' won!');
    else if(socre === 1)
      alert('Draw!');
    else
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
