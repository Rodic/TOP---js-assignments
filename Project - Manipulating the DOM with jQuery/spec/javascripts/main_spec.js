describe("app", function() {

    beforeEach(function() {
	$("#container").remove()
	$('<div id="container"></div>').appendTo("body");
    });

    describe("setupHtml()", function() {

	beforeEach(function() {
	    app.setupHtml();
	});

	it("appends h1 to #container", function() {
	    expect($("#container").children().is('h1')).toBeTruthy();
	    expect($("h1").text()).toEqual('Welcome to');
	});

	it("appends restaurant logo to #container", function() {
	    expect($("#container").children().is("img#logo")).toBeTruthy();
	    expect($("#logo").attr("src")).toEqual("anchor.png");
	});

	it("appends ul#tabmenu to #container", function() {
	    expect($("#container").children().is('ul#tabmenu')).toBeTruthy();
	});

	it("appends three items to ul#tabmenu", function() {
	    expect($("ul#tabmenu").children().length).toEqual(3);
	});

	it("appends a link with 'tab-n' id to each of three 'ul#tabmenu' items", function() {
	    $("ul#tabmenu").children().each(function(index) {
		var i = index + 1;
		expect($(this).children().is("a#tab-" + i)).toBeTruthy();
	    });
	});

	it("appends div#content to #container", function() {
	    expect($("#container").children().is("div#content")).toBeTruthy();
	});
    });

    describe("makeActive()", function() {
	
	beforeEach(function() {
	    app.init();
	});

	it("sets 'active' class on clicked link", function() {
	    var li = $("#tabmenu > li > a");

	    li.eq(0).trigger( "click" );
	    expect(li.eq(0).attr('class')).toEqual("active");
	    expect(li.eq(1).attr('class')).not.toEqual("active");
	    expect(li.eq(2).attr('class')).not.toEqual("active");

	    li.eq(1).trigger( "click" );
	    expect(li.eq(0).attr('class')).not.toEqual("active");
	    expect(li.eq(1).attr('class')).toEqual("active");
	    expect(li.eq(2).attr('class')).not.toEqual("active");
	});
    });
});
