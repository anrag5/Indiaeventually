let nav = document.getElementById("show");
let show = document.querySelector(".rigt-links");
nav.addEventListener("click", function () {
  show.classList.toggle("showclass");
});

window.onscroll = () => {
  toggleTopButton();
};
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleTopButton() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("back-to-up").classList.remove("d-none");
  } else {
    document.getElementById("back-to-up").classList.add("d-none");
  }
}
$(document).ready(function () {
  $("ul.tabs li").click(function () {
    var tab_id = $(this).attr("data-tab");
    $("ul.tabs li").removeClass("current2");
    $(".tab-content").removeClass("current2");
    $(this).addClass("current2");
    $("#" + tab_id).addClass("current2");
    console.log(tab_id);
  });
});

$(document).ready(function () {
  $("#show").click(function () {
    $(".close-btn").addClass("showbtn-close");
    $(".mobile-logo").addClass("mobile-logoshow");
  });
  $("#show").click(function () {
    $(".back-drop").addClass("showdrop");
  });

  $(".close-btn").click(function () {
    $(".rigt-links").removeClass("showclass");
    $(".close-btn").removeClass("showbtn-close");
    $(".back-drop").removeClass("showdrop");
    $(".mobile-logo").removeClass("mobile-logoshow");
  });

  $(".mobiel_viewClick").click(function () {
    $(".rigt-links").removeClass("showclass");
    $(".close-btn").removeClass("showbtn-close");
    $(".back-drop").removeClass("showdrop");
    $(".mobile-logo").removeClass("mobile-logoshow");
  });
  $(".rigt-links li a").on("click", function (e) {
    $(".set-padding").toggleClass("managemnt_ag-padding");
    var href = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(href).offset().top - 90,
      },
      "200",
    );
    e.preventDefault();
  });

  ///navbar_scroll
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 150) {
      $(".navigation").addClass("fixed-header");
    } else {
      $(".navigation").removeClass("fixed-header");
    }
  });

  $(".cleints_slider").owlCarousel({
    loop: true,
    margin: 20,
    responsiveClass: true,

    // Autoplay
    autoplay: true,
    slideTransition: "linear",
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    autoplayHoverPause: false,

    // Navigation
    nav: true,
    dots: false,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],

    responsive: {
      0: {
        items: 2,
        nav: true,
        dots: false,
      },
      600: {
        items: 3,
        nav: true,
        dots: false,
      },
      1000: {
        items: 6,
        nav: true,
        dots: false,
      },
    },
  });

  $(".testimoni_slider").owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,

    // Autoplay (keeps autoplay but preserves original layout sizes)
    autoplay: true,
    slideTransition: "linear",
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    autoplayHoverPause: false,

    // Navigation: enabled but only shown on larger viewports via responsive settings
    nav: true,
    dots: false,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],

    autoHeight: true,
    smartSpeed: 1000,

    // Preserve original testimonial layout: 1 item on small, 2 items on desktop
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: false,
      },
      600: {
        items: 1,
        nav: false,
        dots: false,
      },
      800: {
        items: 1,
        nav: false,
        dots: false,
      },
      1000: {
        items: 2,
        nav: true,
        dots: false,
      },
    },
  });

  // Ensure autoplay resumes after manual nav clicks
  $(".testimoni_slider").on("click", ".owl-next, .owl-prev", function () {
    $(".testimoni_slider").trigger("play.owl.autoplay", [3000]);
  });

  $(".related_eventsSlider").owlCarousel({
    loop: true,
    autoplay: true,
    margin: 20,
    dots: false,
    responsiveClass: true,
    nav: true,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  $(".gallery_slider").owlCarousel({
    loop: true,
    autoplay: true,
    margin: 20,
    dots: false,
    responsiveClass: true,
    nav: true,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  var items = $(".list-wrapper .list-item");
  var numItems = items.length;
  var perPage = 16;

  items.slice(perPage).hide();

  if ($.fn.pagination) {
    $("#pagination-container").pagination({
      items: numItems,
      itemsOnPage: perPage,
      prevText: "&laquo;",
      nextText: "&raquo;",
      onPageClick: function (pageNumber) {
        var showFrom = perPage * (pageNumber - 1);
        var showTo = showFrom + perPage;
        items.hide().slice(showFrom, showTo).show();
      },
    });
  }
  // $('#pagination-container').pagination({
  //     items: numItems,
  //     itemsOnPage: perPage,
  //     prevText: "&laquo;",
  //     nextText: "&raquo;",
  //     onPageClick: function (pageNumber) {
  //         var showFrom = perPage * (pageNumber - 1);
  //         var showTo = showFrom + perPage;
  //         items.hide().slice(showFrom, showTo).show();
  //     }
  // });
});

document.addEventListener("DOMContentLoaded", function () {
  let cards = document.querySelectorAll(".card-item");
  let loadMoreBtn = document.getElementById("load-more");
  let cardsToShow = 12;
  let increment = 4;

  // Initially hide all cards except the first 8
  for (let i = 0; i < cards.length; i++) {
    if (i >= cardsToShow) {
      cards[i].style.display = "none";
    }
  }

  // Show Load More button if there are more than 8 cards
  if (cards.length > cardsToShow) {
    loadMoreBtn.style.display = "block";
  }

  // Load more cards on button click
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      cardsToShow += increment;

      for (let i = 0; i < cards.length; i++) {
        if (i < cardsToShow) {
          cards[i].style.display = "block";
        }
      }

      if (cardsToShow >= cards.length) {
        loadMoreBtn.style.display = "none";
      }
    });
  }
  // loadMoreBtn.addEventListener('click', function () {
  //     cardsToShow += increment;
  //     for (let i = 0; i < cards.length; i++) {
  //         if (i < cardsToShow) {
  //             cards[i].style.display = 'block';
  //         }
  //     }

  //     // Hide Load More button if all cards are displayed
  //     if (cardsToShow >= cards.length) {
  //         loadMoreBtn.style.display = 'none';
  //     }
  // });
});

if (typeof AOS !== "undefined") {
  AOS.init({
    offset: 120,
    delay: 0,
  });
}
