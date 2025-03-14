$(document).ready(function () {
  const $header = $(".header-area");
  const $navLinks = $(".header ul li a");
  const $sections = $("section");
  const form = document.forms["submitToGoogleSheet"];
  const msg = $("#msg");

  // Sticky header
  $(window).on("scroll", debounce(function () {
    $(this).scrollTop() > 1 ? $header.addClass("sticky") : $header.removeClass("sticky");
    updateActiveSection();
  }, 100));

  // Smooth scrolling and active link update
  $navLinks.on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href");
    
    if ($(target).hasClass("active-section")) return;

    const offset = target === "#home" ? 0 : $(target).offset().top - 40;

    $("html, body").animate({ scrollTop: offset }, 500);

    $navLinks.removeClass("active");
    $(this).addClass("active");
  });

  // ScrollReveal animations
  const scrollRevealOptions = {
    distance: "100px",
    duration: 2000,
    delay: 200,
  };
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { ...scrollRevealOptions, origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { ...scrollRevealOptions, origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { ...scrollRevealOptions, origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { ...scrollRevealOptions, origin: "bottom" });

  // Contact form submission to Google Sheet
  const scriptURL = "https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(response => {
        msg.text("Message sent successfully").fadeIn();
        setTimeout(() => msg.fadeOut(), 5000);
        form.reset();
      })
      .catch(error => {
        console.error("Error!", error.message);
        msg.text("Failed to send message. Please try again.").fadeIn();
      });
  });

  // Function to update active section in the navbar
  function updateActiveSection() {
    const scrollPosition = $(window).scrollTop();

    if (scrollPosition === 0) {
      $navLinks.removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }

    $sections.each(function () {
      const $this = $(this);
      const offset = $this.offset().top;
      const height = $this.outerHeight();

      if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
        $navLinks.removeClass("active");
        $navLinks.filter(`[href='#${$this.attr("id")}']`).addClass("active");
      }
    });
  }

  // Debounce function to optimize scroll events
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
});
