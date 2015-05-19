var Carousel = function(parent, images, options) {

  var images = images;
  var parent = $(parent);
  var container = null;
  var currentDisplay = 0;

  var optionOrDefault = function(field, defaultVal) {
    return (typeof(options[field]) === "undefined") ? defaultVal : options[field];
  };

  var width  = optionOrDefault("width", "400px");
  var height = optionOrDefault("height", "400px");
  var speed  = optionOrDefault("speed", 5000);

  var hideImage = function(img) {
    img.removeClass("showImg");
    img.addClass("hideImg");
  }

  var showImage = function(img) {
    img.removeClass("hideImg");
    img.addClass("showImg");
  }

  var showNext = function() {
    var imgs = $(".carouselImage");
    hideImage($(imgs[currentDisplay]));
    currentDisplay = (currentDisplay + 1) % imgs.length;
    showImage($(imgs[currentDisplay]));
  }

  var showPrevious = function() {
    var imgs = $(".carouselImage");
    hideImage($(imgs[currentDisplay]));
    if (currentDisplay == 0) { 
      currentDisplay = imgs.length - 1;
    } else {
      currentDisplay = currentDisplay - 1;
    }
    showImage($(imgs[currentDisplay]));
  }

  var showIth = function(i) {
    while(currentDisplay !== i) {
      showNext();
    }
  }

  this.init = function() {
    // Create container div
    container = $(
      '<div id="carouselContainer" style="max-width: '+ width +'; position: relative"></div>'
    );

    parent.append(container);

    // Append all images to parent and make only first one visible
    images.forEach(function(img, index){
      var img = $(
        '<img class="carouselImage" style="margin: 0 auto" src="'+ img +'" height="'+ height +'"></img>'
      );
      
      if (index != currentDisplay)
        img.addClass("hideImg");
      else
        img.addClass("showImg");

      container.append(img);
    });

    // Add slider arrows
    var leftArrow  = $('<img class="arrows" src="images/left-arrow.png"  width="60px">');
    var rightArrow = $('<img class="arrows" src="images/right-arrow.png" width="60px">');

    var arrowsHeight = Math.round(parseInt(height) / 2)+"px";

    leftArrow.css({
      "position" : "absolute",
      "left" : "0px",
      "top"  : arrowsHeight,
    });

    rightArrow.css({
      "position" : "absolute",
      "right" : "0px",
      "top"   : arrowsHeight,
    });

    rightArrow.click(showNext);
    leftArrow.click(showPrevious);

    container.append(leftArrow);
    container.append(rightArrow);

    // Add navigation circles
    var circleContainer = $('<div style="max-width: '+ width +'; text-align: center"></div>');
    for(var i = 0; i < images.length; i++) {
      var circle = $('<img width="20px" class="navCircle" data-image="'+ i +'"src="images/circle.png">');
      circleContainer.append(circle);
    }

    container.append(circleContainer);

    $(".navCircle").click(function() {
      showIth(parseInt(this.dataset.image));
    });

    // Start slide show
    setInterval(showNext, speed);
  }
}

$(document).ready(function() {
  var carousel = new Carousel(
      "#carousel", 
      [ 
        "images/djavolja_varos.jpg", 
        "images/djerdap_golubac.jpg",
        "images/tara.jpeg",
        "images/uvac.jpeg" 
      ],
      {
        height: "300px",
        width: "700px",
        speed: 5000,
      });

  carousel.init();
})