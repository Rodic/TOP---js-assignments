
describe("Calculator#evalexp", function() {

    var calculator = new Calculator();

    it("evaluates exp of one num to itself", function() {
	expect(calculator.evalexp(["1"])).toEqual(1);
    });

    it("evaluates correctly simple addition exp", function() {
    	expect(calculator.evalexp(["3", "+", "5"])).toEqual(8);
    });

    it("evaluates correctly simple subtraction exp", function() {
	expect(calculator.evalexp(["10", "-", "1"])).toEqual(9);
    });

    it("evaluates correctly simple mult exp", function() {
	expect(calculator.evalexp(["9", "x", "3"])).toEqual(27);
    });

    it("evaluates correctly simple div exp", function() {
	expect(calculator.evalexp(["10", "/", "5"])).toEqual(2);
    });

    it("handles floats", function() {
	expect(calculator.evalexp(["10", "/", "4"])).toEqual(2.5);
    });

    it("respects order of precedence in exps with addition and multiplication", function() {
	expect(calculator.evalexp(["99", "+", "4", "/", "4"])).toEqual(100);
    });

    it("evaluates gibberish to NaN", function() {
	expect(calculator.evalexp(["2", "+", "/", "5"])).toEqual(NaN);
    });
})
