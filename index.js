function scrollToAnchor(hash) {
  var target = $(hash);
  var headerHeight = $(".navigation-bar").height() + 5; // Get fixed header height

  target = target.length ? target : $('[name=' + hash.slice(1) + ']');

  if (target.length) {
    $('html,body').animate({
      scrollTop: target.offset().top - headerHeight
    }, 1000);
    return false;
  }
}

function adjustCards() {
  $(".offer-card, .countries-image").each(function() {
    var currentElement = $(this);
    var elementWidth = currentElement.width();

    currentElement.css("height", elementWidth);
  });
}

$(document).scroll(function() {
  var $nav = $(".navigation-bar");
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});

$(window).resize(function() {
  adjustCards();
});

adjustCards();

/*  Carousel*/
$('#carousel-example').on('slide.bs.carousel', function(e) {
  /*
      CC 2.0 License Iatek LLC 2018 - Attribution required
  */
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 5;
  var totalItems = $('.carousel-item').length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);
    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == "left") {
        $('.carousel-item').eq(i).appendTo('.carousel-inner');
      } else {
        $('.carousel-item').eq(0).appendTo('.carousel-inner');
      }
    }
  }

  adjustCards();
});

$("a.animated-scroll").click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
    scrollToAnchor(this.hash);
  }
});

if (window.location.hash) {
  scrollToAnchor(window.location.hash);
}
