var Minesweeper = function(parent, user_options) {

  var parent = $(parent);

  var int_mapper = {
    1 : 'one',
    2 : 'two',
    3 : 'three',
    4 : 'four',
    5 : 'five',
    6 : 'six',
    7 : 'seven',
    8 : 'eight'
  };

  var options = $.extend({
    'ROWS'  : 9,
    'COLS'  : 9,
    'MINES' : 10
  }, user_options);

  var get_random_up_to = function(n) {
    return Math.floor(Math.random() * n);
  };

  var has_mine = function(field) {
    return field.attr('data-has_mine') === "true";
  };

  var get_mines_count = function(field) {
    return parseInt(field.attr('data-mines_around'));
  };

  var get_field = function(row, col) {
    return $('.row-'+ row +'.col-'+ col);
  };

  var get_neighbours = function(field) {
    var row = parseInt(field.attr('data-row'));
    var col = parseInt(field.attr('data-col'));

    return [
      get_field(row-1, col-1),
      get_field(row-1, col),
      get_field(row-1, col+1),
      get_field(row, col+1),
      get_field(row+1, col+1),
      get_field(row+1, col),
      get_field(row+1, col-1),
      get_field(row, col-1)
    ]
  };

  var show_neighbours = function(f) {
    get_neighbours(f).forEach(function(field) {
      field = $(field);
      var count = get_mines_count(field);

      if(field.hasClass('field empty') && !has_mine(field)) {
        field.removeClass('empty');
        if(count > 0) {
          field.addClass(int_mapper[count]);
        }
        else {
          show_neighbours(field);
        }
      }
    });
  };

  var update_mine_counters = function() {
    $('.field').each(function(index) {
      var field = $(this);

      if(has_mine(field)) return

      var cnt = 0;

      get_neighbours(field).forEach(function(f) {
        if(has_mine($(f)))
          cnt += 1;
      });

      field.attr('data-mines_around', cnt);
    });
  };

  var place_mines = function() {
    for(var i = 0; i < options['MINES']; i++) {
      var field = get_random_field();
      if(has_mine(field))
        i--;
      else
        field.attr("data-has_mine", true);
    }
  };

  var get_random_field = function() {
    var row = get_random_up_to(options['ROWS']);
    var col = get_random_up_to(options['COLS']);
    return get_field(row, col);
  };

  var show_all = function() {
    $('.field').each(function() {
      var field = $(this);

      field.removeClass('empty');

      if (has_mine(field)) {
        field.addClass('mine');
        if (field.hasClass('flag'))
          field.removeClass('flag');
        else
          field.addClass('red');
      } else {
        var count = get_mines_count(field);
        if (count > 0)
          field.addClass(int_mapper[count]);
      }
    });
  };

  var isWin = function(timer) {
    if($('.empty').length === 0 && $('.flag').length === options['MINES']) {
      alert("Win!");
      clearInterval(timer);
    }
  };

  var render = function() {
    // Fix table width
    parent.css("width", options['COLS'] * 60);

    // add basic fields
    for(var i = -1; i <= options['ROWS']; i++) {
      for(var j = -1; j <= options['COLS']; j++) {

        var field = $('<div></div>');
        field.addClass("row-" + i + " col-" + j);
        field.attr("data-row", i);
        field.attr("data-col", j);
        field.attr("data-has_mine", false);
        field.attr("data-mines_around", 0);
        parent.append(field);

        if(i >= 0 && i < options['ROWS'] && j >= 0 && j < options['COLS']) {
          field.addClass("field empty");  
        }
      }
    }
    place_mines();
    update_mine_counters();
  };

  var as_two_digits = function(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  this.init = function() {
    render();

    $("#timer").val('00:00:00');
    $("#flags").val(0);

    var timer = setInterval(function(){
      var time = $("#timer").val().split(':');
      var total = parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2]) + 1;
      
      var hours = Math.floor(total / 3600);
      var mins  = Math.floor((total % 3600) / 60);
      var secs  = total % 60;

      $("#timer").val( as_two_digits(hours) + ":" + as_two_digits(mins) + ":" + as_two_digits(secs) ); 
    }, 1000);

    parent.on("contextmenu", function(evt) {
      evt.preventDefault();
    });

    $('.field').click(function() {
      var field = $(this);

      if (has_mine(field)) {
        clearInterval(timer);
        field.removeClass('empty').addClass('red mine');
        show_all();
        setTimeout(function() { alert("Game over!"); }, 500);
      } else {
        var cnt = get_mines_count(field);
        field.removeClass('empty');

        if (cnt !== 0)
          field.addClass(int_mapper[cnt]);
        else
          show_neighbours(field);
      }
      isWin(timer);
    });
    $('.field').mousedown(function(e) {
      if(e.which === 3) {
        var field = $(this);
        var count = parseInt($("#flags").val());

        if(field.hasClass('flag'))
          count--;
        else
          count++;

        $("#flags").val(count);

        field.toggleClass('flag');
        field.toggleClass('empty');
      }
      isWin(timer);
    });
  };
};

$(function() {

  var m = new Minesweeper("#table");
  m.init();

  $("#start").click(function() {

    // Clear timer
    var i = setInterval (function () {}, 10000);
    clearInterval (i-1);
    clearInterval (i);

    $("#table").empty();

    var rows  = parseInt($("#rows").val());
    var cols  = parseInt($("#cols").val());
    var mines = parseInt($("#mines").val());

    var m = new Minesweeper("#table", { 'ROWS' : rows, 'COLS' : cols, 'MINES' : mines });
    m.init();
  });
});
