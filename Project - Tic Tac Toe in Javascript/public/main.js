var betterMax = function(arr, fn) {
  return arr.reduce(function(a, b) { return fn(a) > fn(b) ? a : b });
}

var betterMin = function(arr, fn) {
  return arr.reduce(function(a, b) { return fn(a) < fn(b) ? a : b });
}

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

    var evalRows = evaluateSeqs(table.getRow);
    var evalCols = evaluateSeqs(table.getCol);
    var evalRisingDiagonal  = evaluateSeq(table.getRaisingDiagonal());
    var evalFallingDiagonal = evaluateSeq(table.getFallingDiagonal());

    return betterMax([ evalRows, evalCols, evalRisingDiagonal, evalFallingDiagonal, isDraw() ], Math.abs);
  }
}

var AiPlayer = function(table) {
  // AI player plays as  'o'
  // In max step algo chooses the move which leads to the biggest reward for AI
  // Min step simulates human player
  // move picked in there is one that leads to the smallest revard for AI player
  
  var cache = [];

  var minmax = function(player) {

    var candidates = [];
    var blanks = $('.blank');

    for(var i = 0; i < blanks.length; i++) {
      
      if(player === 'o')
        table.setO(blanks[i]);
      else
        table.setX(blanks[i]);

      var score = TableEvaluator.evaluate(table, 'o');

      if(score !== 0) {
        table.setBlank(blanks[i]);
        candidates.push([ $(blanks[i]).attr('class'), score ]);
      } else {

        var hash = $('.cell').toArray().map(function(c) { return $(c).attr('class') }).join('/');

        if(!cache[hash]) {
          score = minmax(player === 'o' ? 'x' : 'o')[1];
          cache[hash] = score;
        }
        
        table.setBlank(blanks[i]);
        candidates.push([ $(blanks[i]).attr('class'), cache[hash] ]);
      }
    }

    if(player === 'o')
      return betterMax(candidates, function(c) { return c[1] });
    else
      return betterMin(candidates, function(c) { return c[1] });
  };

  this.bestMove = function() {
    var result = minmax('o');
    var move   = result[0];
    var score  = result[1];
    return '.' + move.split(' ').join('.');
  };
}

var Game = function(table, ai) {

  var table = table;
  var move = 0;
  var playerMark, score;

  this.play = function() {
    if(move % 2 === 0) {
      table.setX(this);
      playerMark = 'x';
    } else {
      table.setO($(ai.bestMove()));
      playerMark = 'o';
    }

    score = TableEvaluator.evaluate(table, playerMark);

    if(score === 10)
      alert('Player ' + playerMark + ' won!');
    else if(score === 1)
      alert('Draw!');
    else {
      move += 1;
      if(playerMark === 'x')
        this.click();
    }
  }

  this.init = function() {
    table.render();
    $(".cell").click(this.play);
  }
};

var Table = function(parentDiv) {

  this.parent = $(parentDiv);

  this.render = function() {
    for(var row = 0; row < 3; row++) {
      for(var col = 0; col < 3; col++) {
        this.parent.append('<div class="blank cell row-'+ row +' col-'+ col +'"></div>');
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

  this.setBlank = function(field) {
    field = $(field);
    field.removeClass('x');
    field.removeClass('o');
    field.addClass('blank');
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
  var ai    = new AiPlayer(table);
  var game  = new Game(table, ai);
  game.init();
});
