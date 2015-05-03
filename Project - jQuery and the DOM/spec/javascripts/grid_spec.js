describe("grid", function() {
    
    it("has width of 40", function() {
	expect(grid.WIDTH).toEqual(40);
    });

    it("has HEIGHT of 40", function() {
	expect(grid.HEIGHT).toEqual(40);
    });

    describe("#render", function() {

	it("has render method", function() {
	    expect(grid.render).toBeDefined();
	});

	it("renders 1600 cells on the screen", function() {
	    $("#grid").remove()
	    $('<div id="grid"></div>').appendTo("body");
	    grid.render();
	    expect($(".cell").length).toEqual(grid.WIDTH * grid.HEIGHT);
	})
    });

    describe("#inBounds", function() {

	it("has inBounds method", function() {
	    expect(grid.inBounds).toBeDefined();
	});

	it("returns true when postions's x and y are valid grid coords", function() {
	    expect(grid.inBounds([20, 20])).toBeTruthy();
	});

	it("returns false when either coord is negative", function() {
	    expect(grid.inBounds([-4, 20])).toBeFalsy();
	    expect(grid.inBounds([ 4, -5])).toBeFalsy();
	});

	it("returns false when x is bigger than grid's max width", function() {
	    expect(grid.inBounds([grid.WIDTH, 5])).toBeFalsy();
	});

	it("returns false when y is bigger than grid's max HEIGHT", function() {
	    expect(grid.inBounds([5, grid.HEIGHT])).toBeFalsy();
	});
    });

    describe("#put", function() {

	it("has put method", function() {
	    expect(grid.put).toBeDefined();
	});

	it("adds class to the position when coords are valid", function() {
	    grid.put([20, 20], "test")
	    expect($("#grid > #cell-20x20").attr('class')).toMatch(/test/)
	});

	it("throws 'Out of bounds' exception when coords are invalid", function() {
	    expect(function() { grid.put([-4, -7], "test") }).toThrow(grid.OUT_OF_BOUNDS);
	});

	it("doesn't add class if it's already present", function() {
	    var cell = $("#grid > #cell-20x20");
	    
	    cell.addClass("test");
	    expect(cell.attr('class')).not.toMatch(/.*test.*test/);
	});
    });

    describe("#remove", function() {

	it("it has remove method", function() {
	    expect(grid.remove).toBeDefined();
	});

	it("removes class from the position when coords are valid and class exists", function() {
	    var cell = $("#grid > #cell-20x20");
	    var klas = "test";

	    cell.addClass(klas);
	    grid.remove([20, 20], klas);

	    expect(cell.attr('class')).not.toMatch(klas);
	});

	it("throws 'Out of bounds' exception when coords are invalid", function() {
	    expect(function() { grid.remove([20, 50], "test") }).toThrow(grid.OUT_OF_BOUNDS);
	});

	it("throws 'No such class' exception when class is not applied to an elem", function() {
	    expect(function() { grid.remove([20, 20], "test") }).toThrow(grid.NO_SUCH_CLASS);
	});
    });
});
