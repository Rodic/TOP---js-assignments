describe("snake", function() {

    it("has body", function() {
	expect(snake.body).toBeDefined();
    });

    it("has css class", function() {
	expect(snake.css_class).toBeDefined();
    });

    describe("#body_at", function() {
	beforeEach(function() {
	    snake.body = [ [10, 30], [9, 30], [8, 30] ];
	});

	it("returns true when snake is on given coord", function() {
	    expect(snake.body_at([10, 30])).toBeTruthy();
	});

	it("returns false when snake is not on given coord", function() {
	    expect(snake.body_at(10, 10)).toBeFalsy();
	});
    });

    describe("#move", function() {

	it("has move method", function() {
	    expect(snake.move).toBeDefined();
	});

	it("throws an exception when direction is unknown", function() {
	    snake.body = [ [20, 20] ];
	    expect(function() { snake.move("left"); }).toThrow(snake.UNKNOWN_DIRECTION);
	});

	describe("simple snake that has only head", function() {

	    beforeEach(function() {
		snake.body = [ [20, 20] ];
	    });
	    
	    it("moves correctly right when snake has only head", function() {
		snake.move(snake.RIGHT);
		expect(snake.body).toEqual([ [ 21, 20 ] ]);
	    });

	    it("moves correctly left when snake has only head", function() {
		snake.move(snake.LEFT);
		expect(snake.body).toEqual([ [ 19, 20 ] ]);
	    });

	    it("moves correctly up when snake has only head", function() {
		snake.move(snake.UP);
		expect(snake.body).toEqual([ [ 20, 19 ] ]);
	    });

	    it("moves correctly down when snake has only head", function() {
		snake.move(snake.DOWN);
		expect(snake.body).toEqual([ [ 20, 21 ] ]);
	    });
	});

	describe("snake that consists of two pieces", function() {

	    beforeEach(function() {
		snake.body = [ [20, 20], [19, 20] ];
	    });
	    
	    it("moves correctly right", function() {
		snake.move(snake.RIGHT);
		expect(snake.body).toEqual([ [ 21, 20 ], [20, 20] ]);
	    });

	    it("Throws an exception when it steps on itself", function() {
		expect(function() { snake.move(snake.LEFT); }).toThrow(snake.BITES_ITSELF);
	    });

	    it("moves correctly up", function() {
		snake.move(snake.UP);
		expect(snake.body).toEqual([ [ 20, 19 ], [20, 20] ]);
	    });

	    it("moves correctly down", function() {
		snake.move(snake.DOWN);
		expect(snake.body).toEqual([ [ 20, 21 ], [20, 20] ]);
	    });
	});


	describe("snake with long body", function() {

	    beforeEach(function() {
		snake.body = [ [20, 20], [19, 20], [18, 20], [17, 20], [16, 20] ]
	    });

	    it("moves correctly right when snake is long", function() {
		snake.move(snake.RIGHT);
		expect(snake.body).toEqual([ [21, 20], [20, 20], [19, 20], [18, 20], [17, 20] ]);
	    });

	    it("moves correctly up when snake is long", function() {
	    	snake.move(snake.UP);
	    	expect(snake.body).toEqual([ [ 20, 19 ], [20, 20], [19, 20], [18, 20], [17, 20] ]);
	    });

	    it("moves correctly down when snake is long", function() {
	    	snake.move(snake.DOWN);
	    	expect(snake.body).toEqual([ [ 20, 21 ], [20, 20], [19, 20], [18, 20], [17, 20] ]);
	    });
	    
	    it("moves correctly left when snake has only head", function() {
		snake.body = [ [20, 20], [21, 20], [22, 20], [23, 20], [24, 20] ]
	    	snake.move(snake.LEFT);
	    	expect(snake.body).toEqual([ [19, 20], [20, 20], [21, 20], [22, 20], [23, 20] ]);
	    });

	    it("throws 'Bites itself' exception when snake makes a move on itself", function() {
		expect(function() { snake.move(snake.LEFT); }).toThrow(snake.BITES_ITSELF);
	    });

	    it("can go in circle", function() {
		snake.body = [ [20, 20], [20, 19], [21, 19], [21, 20] ];
		snake.move(snake.RIGHT);
		expect(snake.body).toEqual([ [21, 20], [20, 20], [20, 19], [21, 19] ])
	    });

	});
    });
});
