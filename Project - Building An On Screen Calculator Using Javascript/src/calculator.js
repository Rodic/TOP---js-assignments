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

	         if ((split_index = exp.indexOf("+")) >= 0) func = this.add;
	    else if ((split_index = exp.indexOf("-")) >= 0) func = this.sub;
	    else if ((split_index = exp.indexOf("/")) >= 0) func = this.div;
	    else if ((split_index = exp.indexOf("x")) >= 0) func = this.mul;
	    else { return NaN }
	    
	    return func(this.evalexp(exp.slice(0, split_index)), this.evalexp(exp.slice(split_index+1)));
	}
    }

    var self = this;
 
    var isOperator = function(str) { return $.inArray(str, ["+", "-", "/", "x"]) >= 0; };

    var normalizeNeg = function(exp) {
	if(exp[0] === "-") {
	    exp = exp.slice(1);
	    exp[0] *= -1;
	}
	return exp 
    }

    this.setup = function() {
	var display = $("#display");
	var input = $(this).text();
	var result, exp;

	switch(input) {
	    case "=":
	      exp = display.text().trim().split(" ");
	      result = self.evalexp(normalizeNeg(exp));
	      display.text(result);
	      break;
	    case "C":
	      display.text("");
	      break;
	    default:
	      if (isOperator(input) || isOperator($("#display").text().slice(-1))) {
		  display.append(" " + input);
	      } else {
		  display.append(input);
	      }
	}
    }
}

$(document).on("click", "#numpad > div", new Calculator().setup);
