var IndexModule = (function() {
  var self = this;

  self.Init = function() {
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
      $(".offer-card").each(function() {
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
        Swal.fire(
          'Oops...',
          'Заполните все поля',
          'error'
        );
      } else {
        Email.send({
          SecureToken: "8b208eb9-064e-4caa-8965-6096e0812e45",
          To: "ostrov.md@gmail.com",
          From: "ostrov.md@gmail.com",
          Subject: "Новое сообщение от " + dates.name,
          Body: "<div>Имя: " + dates.name + "</div>" + "<div>Телефон: " + dates.mobile + "</div>" + "<div>Сообщение: " + dates.message + "</div>"
        }).then(
          function(message) {
            if (message === "OK") {
              Swal.fire(
                'Спасибо',
                'Ваше сообщение было успешно отправленно',
                'success'
              );
            }
          }
        );
      }
    });

    $('.gallery a').simpleLightbox();
    $('.countries-slider').multislider();
  };

  return self;
})();

(function() {
  IndexModule.Init();
})();
