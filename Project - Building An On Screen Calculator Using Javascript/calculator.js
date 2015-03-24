function Calculator() {

    this.add = function(a,b) { return a + b; };
    this.sub = function(a,b) { return a - b; };
    this.mul = function(a,b) { return a * b; };
    this.div = function(a,b) { return a / b; };

    this.evalexp = function(exp) {
	if(exp.length == 1) {
	    return parseFloat(exp);
	} else {
	    var split_index;
	    var func;

	         if ((split_index = exp.indexOf("+")) >= 0) { func = this.add; }
	    else if ((split_index = exp.indexOf("-")) >= 0) { func = this.sub; }
	    else if ((split_index = exp.indexOf("/")) >= 0) { func = this.div; }
	    else if ((split_index = exp.indexOf("x")) >= 0) { func = this.mul; }
	    else { return undefined }
	    
	    return func(this.evalexp(exp.slice(0, split_index)), this.evalexp(exp.slice(split_index+1)));
	}
    }

    this.exp = [];

    var self = this;

    this.setup = function() {
	var input = $(this).text();
	var result;

	switch(input) {
	    case "=": 
	      result = self.evalexp(self.exp);
	      $("#display").text(result);
	      self.exp = [result];
	      break;
	    case "CE":
	      $("#display").text("");
	      self.exp = [];
	      break;
	    default:
	      $("#display").append(" " + input);
	      self.exp.push(input);
	      break;
	}
    }
}
var calculator = new Calculator();
$(document).on("click", "#numpad > div", calculator.setup);
