var app = {

    setupHtml : function() {
	$("#container").append('<h1>Welcome to</h1>');
	$("#container").append('<img id="logo" src="anchor.png">');
	$("#container").append("<ul id='tabmenu'></ul>");
	$("#tabmenu").append("<li><a id='tab-1'>About us</a></li>");
	$("#tabmenu").append("<li><a id='tab-2'>Menu</a></li>");
	$("#tabmenu").append("<li><a id='tab-3'>Contact Page</a></li>");
	$("#container").append('<div id="content"></div>');
    },

    makeActive : function() {
	for(var i = 1; i < 4; i++)
	    $("#tab-" + i).removeClass("active");

	$(this).addClass("active");

	switch($(this).attr('id')) {
	    case "tab-1":
	      $("#content").text("Ei per suas conclusionemque, euismod pertinax et est. Principes suscipiantur pro ex, ei labores ullamcorper qui. Omnes antiopam moderatius ad usu, per ut amet veri, sed zril eruditi eu. Hinc elit consequat eam ut. Unum omittantur his an, ne duo solet tamquam. Quo id libris periculis.");
	      break;
	    case "tab-2":
	      $("#content").text("Fried or Sautéed Crab Claws, Rim Tuna, Edamame, New Orleans-Style Barbecue Shrimp, Asian Calamari, Southern-Fried Green Tomatoes, Pizza Margherita, Fish House Crab and Lobster Cake...");
	      break;
	    case "tab-3":
	      $("#content").text("12 Lighthouse Rd, Green Island");
	}
    },

    init : function() {
	this.setupHtml();
	$("#tabmenu > li > a").on("click", this.makeActive);
	$("#tab-1").trigger("click");
    }
}

$(function() {
    app.init();
});
