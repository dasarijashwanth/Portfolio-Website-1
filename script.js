$(document).ready(function() {
  // Sticky header on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  // Smooth scrolling for header links & trigger animations when clicking
  $(".header ul li a").click(function(e) {
    e.preventDefault(); 

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500,
        function () {
          // Ensure ScrollReveal triggers properly after smooth scrolling
          ScrollReveal().reveal(target + " .publication", { 
            origin: "bottom", 
            distance: "50px", 
            duration: 1000,
            reset: true 
          });
        }
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Initial content revealing animation using ScrollReveal
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  // Reveal animations for sections
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .publications-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .publications, .contact", { origin: "bottom" });

  // Ensuring publications animate on scroll
  ScrollReveal().reveal(".publication", { 
    origin: "bottom", 
    distance: "50px", 
    duration: 1000, 
    reset: true 
  });

  // Contact form submission to Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Message sent successfully";
        setTimeout(function () {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      })
      .catch(error => console.error('Error!', error.message));
  });
});

// Function to update active section in the header based on scroll position
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function() {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}
