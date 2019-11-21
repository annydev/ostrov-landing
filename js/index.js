function scrollToAnchor(hash) {
  var target = $(hash);
  var headerHeight = $(".navigation-bar").height() + 5; // Get fixed header height

  target = target.length ? target : $('[name=' + hash.slice(1) + ']');

  if (target.length) {
    $('html,body').animate({
      scrollTop: target.offset().top - headerHeight
    }, 2000);
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

function appendOffer(value) {
  var newOffer = $($("#offersTemplate").html());

  newOffer.find(".best-offer-country").html(value[1]);
  newOffer.find(".best-offer-title").html(value[2]);
  newOffer.find(".best-offer-days").html(value[3]);
  newOffer.find(".best-offer-price").html(value[4]);
  newOffer.attr("style", "background-image:" + "url(" + value[5] + ")");
  newOffer.find(".description-title").html(value[6]);
  newOffer.find(".description-body").html(value[7]);


  $("#best-offers .card-part").append(newOffer);

  adjustCards();
}

function prepareOffers(values) {
  $("#best-offers .card-part").html("");

  values.forEach(function(value, index) {

    var today = moment();
    var newDate = moment(value[0], "DD-MM-YY");

    if (index >= 1 && today <= newDate) {
      appendOffer(value);
    }

  });
}

function addCardsForTest() {
  prepareOffers([
    ["15-11-19", "France", "Title", "9 days", "3000$", "images/countries/spain.jpg", "Head", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],
    ["25-11-19", "Germany", "Title", "9 days", "3000$", "images/countries/spain.jpg"],
    ["20-12-19", "Spain", "Title", "9 days", "3000$", "images/countries/spain.jpg"],
    ["12-11-19", "Ucraine", "Title", "9 days", "3000$", "images/countries/spain.jpg"],
    ["10-10-19", "Italy", "Title", "9 days", "3000$", "images/countries/spain.jpg"],
    ["14-11-19", "Luxembourg", "Title", "9 days", "3000$", "images/countries/spain.jpg"]
  ]);
}

addCardsForTest();

$("#best-offers").on('click', ".offer-card", function(event) {
  $(this).toggleClass("opened");
});

new universalParallax().init();

$(".form-button").click(function() {
  var dates = {
    name: $("input.name").val(),
    mobile: $("input.mobile").val(),
    message: $("textarea.message-area").val()
  };

  if (!dates.name || !dates.mobile || !dates.message) {
    alert.error("Please check your data!");
  } else {
    Email.send({
      SecureToken : "ff91b418-4c40-4b2d-ad39-0e45ade8f842",
      To: 'dandara.anna13@hotmail.com',
      From: "dandara.anna13@gmail.com",
      Subject: "This is the subject",
      Body: "And this is the body"
    }).then(
      function(message) {
        console.log(message);
      }
    );
  }
})
