describe("Table", function() {

  var table;

  beforeEach(function(){
    $("#jasmine_content").append($('<div id="table"></div>'));
    table = new Table("#table");
    table.render();
  });

  afterEach(function() {
    $("#jasmine_content").empty();
  });

  it("renders the html", function() {
    expect($(".cell").length).toEqual(9);
  });

  it("adds 'x' class to a cell when it's blank", function() {
    table.setX($('.row-0.col-0'));
    expect($(".row-0.col-0").hasClass('x')).toBeTruthy();
  });

  it("throws an expception when cell is not blank", function() {
    table.setX($('.row-0.col-0'));
    expect(function() { table.setX($('.row-0.col-0')) }).toThrow("Field is not blank!");
  });

  it("retrieves all cells from specific row", function() {
    for(var i = 0; i < 3; i++) {

      var row = table.getRow(i);
      expect(row.length).toEqual(3);


      expect($(row[0]).hasClass("row-" + i)).toBeTruthy();
      expect($(row[0]).hasClass("col-0")).toBeTruthy();

      expect($(row[1]).hasClass("row-" + i)).toBeTruthy();
      expect($(row[1]).hasClass("col-1")).toBeTruthy();

      expect($(row[2]).hasClass("row-" + i)).toBeTruthy();
      expect($(row[2]).hasClass("col-2")).toBeTruthy();
    }
  });

  it("retrieves all cells from specific col", function() {
    for(var i = 0; i < 3; i++) {

      var col = table.getCol(i);
      expect(col.length).toEqual(3);

      expect($(col[0]).hasClass("row-0")).toBeTruthy();
      expect($(col[0]).hasClass("col-"+i)).toBeTruthy();

      expect($(col[1]).hasClass("row-1")).toBeTruthy();
      expect($(col[1]).hasClass("col-"+i)).toBeTruthy();

      expect($(col[2]).hasClass("row-2")).toBeTruthy();
      expect($(col[2]).hasClass("col-"+i)).toBeTruthy();
    }
  });

  it("retrieves all cells on raising diagonal", function() {
    var diagonal = table.getRaisingDiagonal();
    expect(diagonal.length).toEqual(3);

    expect($(diagonal[0]).hasClass("row-0")).toBeTruthy();
    expect($(diagonal[0]).hasClass("col-2")).toBeTruthy();

    expect($(diagonal[1]).hasClass("row-1")).toBeTruthy();
    expect($(diagonal[1]).hasClass("col-1")).toBeTruthy();

    expect($(diagonal[2]).hasClass("row-2")).toBeTruthy();
    expect($(diagonal[2]).hasClass("col-0")).toBeTruthy();
  });

  it("retrieves all cells on falling diagonal", function() {
    var diagonal = table.getFallingDiagonal();
    expect(diagonal.length).toEqual(3);

    expect($(diagonal[0]).hasClass("row-0")).toBeTruthy();
    expect($(diagonal[0]).hasClass("col-0")).toBeTruthy();

    expect($(diagonal[1]).hasClass("row-1")).toBeTruthy();
    expect($(diagonal[1]).hasClass("col-1")).toBeTruthy();

    expect($(diagonal[2]).hasClass("row-2")).toBeTruthy();
    expect($(diagonal[2]).hasClass("col-2")).toBeTruthy();
  });
});
