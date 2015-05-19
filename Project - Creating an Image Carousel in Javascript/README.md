# Javascript image carousel

More details can be found at [TOP](http://www.theodinproject.com/javascript-and-jquery/creating-an-image-carousel-slider?ref=lnav)

Example call:

```javascript
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
```
