var grid = {

    // Constants
    WIDTH  : 40,
    HEIGHT : 40,

    // Errors
    OUT_OF_BOUNDS : "Out of bounds",
    NO_SUCH_CLASS : "No such class",

    render : function() {
	html = $("#grid");
	for(var i = 0; i < grid.WIDTH; i++) {
	    for(var j = 0; j < grid.HEIGHT; j++) {
		html.append('<div class="cell" id="cell-'+j+'x'+i+'"></div>');
	    }
	} 
	html.append('<div class="clearfix"></div>');
     },

    inBounds : function(position) {
	var x = position[0];
	var y = position[1];

	return x >= 0 && y >= 0 && x < grid.WIDTH && y < grid.HEIGHT;
    },

    elem_at : function(position) {
	return $("#grid > #cell-" + position[0] + "x" + position[1])
    },

    put : function(position, klas) {
	if (grid.inBounds(position)) {
	    grid.elem_at(position).addClass(klas);
	} else {
	    throw grid.OUT_OF_BOUNDS;
	}
    },

    remove : function(position, klas) {
	var elem = grid.elem_at(position);

	if(!grid.inBounds(position)) {
	    throw grid.OUT_OF_BOUNDS;
	} else if(!elem.hasClass(klas)) {
	    throw grid.NO_SUCH_CLASS;
	} else {
	    elem.removeClass(klas);
	}
    },
};

var snake = {

    // Constants
    LEFT  : "l",
    UP    : "u",
    RIGHT : "r",
    DOWN  : "d",

    // Errors
    UNKNOWN_DIRECTION : 'Unknown direction',
    BITES_ITSELF      : 'Bites itself',

    css_class : 'snake',
    body : [],
    head : null,
    old_tail : null,

    body_at : function(position) {
	var occupied = false;
	snake.body.forEach(function(piece) {
	    if(piece[0] === position[0] && piece[1] === position[1])
		occupied = true;
	});
	return occupied;
    },

    move : function(direction) {

	// Each elem will take the position of the elem that comes before it in the body array. Except the new head.
	// This is implemented by removing tail, calculating position for new head elem and adding it to the body
		
	snake.head = snake.body[0];
	snake.old_tail = snake.body.pop();

	var x = snake.head[0];
	var y = snake.head[1];

	switch(direction) {
	    case snake.LEFT:
	        x -= 1;
	        break;
	    case snake.UP:
	        y -= 1;
	        break;
	    case snake.RIGHT:
	        x += 1;
	        break;
	    case snake.DOWN:
	        y += 1;
	        break;
	    default:
	        throw snake.UNKNOWN_DIRECTION;
	}
	
	snake.head = [x, y];
	
	// check is head position occupied by snake's body 
	// if snake size was 2 we must include back old_tail for this test, otherwise it would never throw an error
	if(snake.body_at(snake.head) || 
	  (snake.body.length === 1 && snake.head[0] === snake.old_tail[0] && snake.head[1] === snake.old_tail[1]))
	    throw snake.BITES_ITSELF;

	snake.body.unshift(snake.head);

	return [snake.head, snake.old_tail];
    },

    regenerate : function() {
	snake.body.push(snake.old_tail);
    },
};

var Food = function(position) {
    this.position  = position;
    this.css_class = 'food';
};

var MoveCommand = function(grid, snake, direction) {
    this.grid      = grid;
    this.snake     = snake;
    this.direction = direction;

    this.execute = function() {
	var move = this.snake.move(direction);
	var head = move[0];
	var old_tail = move[1]
	
	this.grid.put(head, this.snake.css_class);
	this.grid.remove(old_tail, this.snake.css_class);
    };
};

var AddFoodCommand = function(grid, food) {
    this.grid = grid;
    this.food = food;

    this.execute = function() {
	this.grid.put(this.food.position, this.food.css_class);
    }
};

var EatCommand = function(grid, snake, food) {
    this.grid  = grid;
    this.snake = snake;
    this.food  = food;

    this.execute = function() {
	this.snake.regenerate();
	this.grid.put(this.snake.old_tail, this.snake.css_class);
	this.grid.remove(this.food.position, this.food.css_class);
    }
};

var handler = {

    init : function(grid, snake, init_direction) {
	handler.grid  = grid;
	handler.snake = snake;
	handler.food  = new Food(handler.find_free_position());
	handler.next_move = new MoveCommand(handler.grid, handler.snake, init_direction);
	new AddFoodCommand(handler.grid, handler.food).execute();
	handler.listen();
    },

    find_free_position : function() {
	while(true) {
	    var x = Math.floor(Math.random() * handler.grid.WIDTH);
	    var y = Math.floor(Math.random() * handler.grid.HEIGHT);
	    
	    if(!handler.snake.body_at([x, y]))
	       return [x, y];
	}
    },

    listen : function() {
	$(document).keydown(function(e) {
	    switch(e.which) {
                case 37:
		    handler.next_move = new MoveCommand(handler.grid, handler.snake, snake.LEFT);
		    break;
                case 38:
		    handler.next_move = new MoveCommand(handler.grid, handler.snake, snake.UP);
		    break;
                case 39:
		    handler.next_move = new MoveCommand(handler.grid, handler.snake, snake.RIGHT);
		    break;
                case 40:
		    handler.next_move = new MoveCommand(handler.grid, handler.snake, snake.DOWN);
		    break;
                default: 
		    return;
	    }
	    e.preventDefault(); // don't scroll
	});
    },

    execute_next_command: function() {
	try {
	    handler.next_move.execute();
	    if(handler.snake.head[0] === handler.food.position[0] &&
	       handler.snake.head[1] === handler.food.position[1]) {
	    	new EatCommand(handler.grid, handler.snake, handler.food).execute();
		
	    	handler.food = new Food(handler.find_free_position());
	    	new AddFoodCommand(handler.grid, handler.food).execute();
	    }
	} catch(err) {
	    alert( err + ' - Game Over!');
	    clearInterval(game.loop);
	}
    },
};

var game = {
    grid  : grid,
    snake : snake,
    speed : 100,
    loop  : null,

    init : function() {
	game.grid.render();

	game.grid.put([20, 20], snake.css_class);
	game.snake.body = [ [20, 20] ];

	handler.init(game.grid, game.snake, snake.RIGHT);

	game.loop = setInterval(handler.execute_next_command, game.speed);
    }
}

$( document ).ready(function() {
    game.init();
});
