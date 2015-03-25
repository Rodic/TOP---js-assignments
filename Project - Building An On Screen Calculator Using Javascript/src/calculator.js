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
	    else { return NaN }
	    
	    return func(this.evalexp(exp.slice(0, split_index)), this.evalexp(exp.slice(split_index+1)));
	}
    }

    this.exp = [];

    var self = this;
 
    var isOperator = function(str) { return $.inArray(str, ["+", "-", "/", "x"]) >= 0; };

    var normalizeNeg = function(exp) {
	if(exp[0] === "-") exp.unshift("0"); 
	return exp 
    }

    this.setup = function() {
	var input = $(this).text();
	var result;

	switch(input) {
	    case "=":
	      result = self.evalexp(normalizeNeg(self.exp));
	      $("#display").text(result);
	      self.exp = [result];
	      break;
	    case "C":
	      $("#display").text("");
	      self.exp = [];
	      break;
	    default:
	      if (self.exp.length == 0 || isOperator(input) || isOperator(self.exp[self.exp.length-1])) {
		  $("#display").append(" " + input);
		  self.exp.push(input);
	      } else {
		  $("#display").append(input);
		  self.exp[self.exp.length-1] += input;
	      }
	}
    }
}

$(document).on("click", "#numpad > div", new Calculator().setup);
