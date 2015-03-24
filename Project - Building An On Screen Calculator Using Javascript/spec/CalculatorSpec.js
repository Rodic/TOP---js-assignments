
describe("Calculator#evalexp", function() {

    beforeEach(function() {
	caluclator = new Calculator();
    });

    it("evaluates exp of one num to itself", function() {
	expect(calculator.evalexp(["1"])).toEqual(1);
    });

    it("evaluates correctly simple addition exp", function() {
    	expect(calculator.evalexp("3 + 5".split(' '))).toEqual(8);
    });

    it("evaluates correctly simple subtraction exp", function() {
	expect(calculator.evalexp("10 - 1".split(' '))).toEqual(9);
    });

    it("evaluates correctly simple mult exp", function() {
	expect(calculator.evalexp("9 x 3".split(' '))).toEqual(27);
    });

    it("evaluates correctly simple div exp", function() {
	expect(calculator.evalexp("10 / 5".split(' '))).toEqual(2);
    });

    it("handles floats", function() {
	expect(calculator.evalexp("10 / 4".split(' '))).toEqual(2.5);
    });

    it("respect order of precedence in exps with addition and multiplication", function() {
	expect(calculator.evalexp("9 x 3 + 3".split(' '))).toEqual(30);
    });

    it("evaluates gibberish to NaN", function() {
	expect(calculator.evalexp("2 5".split(' '))).toEqual(NaN);
    });
})
