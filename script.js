var allImages = [];

var currentSlide = 1;
var startEmbed = function()
{
	allImages = location.hash.replace("#","").split(",");
	startAux();
}

var start = function()
{
	allImages = [
'https://s-media-cache-ak0.pinimg.com/originals/8d/50/ca/8d50ca0982c8bbe22e4f03585b318267.jpg' , 
'http://www.lovethispic.com/uploaded_images/273018-Ice-Cream-Cones.jpg' ,
'https://78.media.tumblr.com/6cf8a871d09b190454c9dc5bb0a66064/tumblr_otocdkKtTD1ufzelwo1_500.png' ,
'https://i.pinimg.com/736x/74/3a/18/743a18080184b5b8ff9d488b6c614f0f--rainbow-ice-cream-colorful-ice-cream.jpg'
];

startAux();
}

function startAux()
{
  var markup = "";
  for(var i = 0; i < allImages.length; i++){
    var imgURL = allImages[i];
    markup = markup + "<div class='slide' style='background-image:url(" + imgURL + ")'></div>";
  }

  /*
  var i = 0;
  while(i < allImages.length){
    var imgURL = allImages[i];
    markup = markup + "<div class='slide' style='background-image:url(" + imgURL + ")'></div>";
    i = i + 1;
  }
   */
  $("#ssContainer").html(markup);

  var markup1 = "";
  for(var i = 0; i < allImages.length; i++){
    markup1 = markup1 + '<button onclick="goToSlide(' + (i + 1) + ',1000)">' + (i + 1) + '</button>';
  }
  $("#numContainer").html(markup1);
  


  goToSlide(1, 0);
}

var ani = "swipe";

var goToSlide = function(n, d)
{
  d = d || 0;
  if(ani === "fade"){
    $("#ssContainer .slide").stop().fadeOut(d);
    $("#ssContainer .slide:nth-of-type(" + n + ")").stop().fadeIn(d);
  }
 else{
    if(n > currentSlide){ // swipe left
      $("#ssContainer .slide").stop().animate({"margin-left":"-100%"}, d);
      $("#ssContainer .slide:nth-of-type(" + currentSlide + ")").stop().animate({"margin-left":"-100%", "opacity":0}, d);
      $("#ssContainer .slide:nth-of-type(" + n + ")").stop().css({"opacity":"0"}).css({"margin-left":"100%"}).animate({"opacity":"1","margin-left":"0%"}, d);
    }
    else{  // swipe right
      $("#ssContainer .slide").stop().animate({"margin-left":"-100%"}, d);
      $("#ssContainer .slide:nth-of-type(" + currentSlide + ")").stop().animate({"margin-left":"100%", "opacity": 0}, d);
      $("#ssContainer .slide:nth-of-type(" + n + ")").stop().css({"opacity":0,"margin-left":"-100%"}).animate({"opacity":1,"margin-left":"0%"}, d);
    }
  }

  $("#numContainer button").removeClass("active");
  $("#numContainer button:nth-of-type(" + n + ")").addClass("active");
  currentSlide = n;
}


var goNext = function()
{
  var n = currentSlide + 1;
  if (n > allImages.length){
    n = 1;
  } 
  goToSlide(n, 1000);
}

var goPrev = function()
{
  var n = currentSlide - 1;
  if (n < 1){
    n = allImages.length;
  } 
  goToSlide(n, 1000);
}