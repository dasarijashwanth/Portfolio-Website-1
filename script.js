$(document).ready(function() {

  // Sticky Header with Animation
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky animated bounce");
    } else {
      $(".header-area").removeClass("sticky animated bounce");
    }
    updateActiveSection();
  });

  // Smooth Scrolling
  $(".header ul li a").click(function(e) {
    e.preventDefault(); 
    var target = $(this).attr("href");
    if (target === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      var offset = $(target).offset().top - 40;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Intersection Observer for Active Sections
  const sections = document.querySelectorAll("section");
  const options = { root: null, threshold: 0.5 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + entry.target.id + "']").addClass("active");
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));

  // ScrollReveal Animation Enhancements
  ScrollReveal({ distance: "100px", duration: 2000, delay: 200, easing: "ease-in-out" });
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top", interval: 100 });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom", interval: 100 });

  // Hover Animations (Shake, Rotate, Vibrate, Glow)
  $("section, .profile-photo, .project-title, .contact-title").hover(
    function() {
      $(this).addClass("animated jello");
    }, function() {
      $(this).removeClass("animated jello");
    }
  );

  $(".projects, .contact").hover(
    function() {
      $(this).addClass("animated pulse");
    }, function() {
      $(this).removeClass("animated pulse");
    }
  );

  // Contact Form Submission to Google Sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
const form = document.forms['submitToGoogleSheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault();  // Prevents default form submission

  // Send form data to Google Sheets via Google Apps Script
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      msg.innerHTML = "✅ Message sent successfully!";
      setTimeout(() => msg.innerHTML = "", 5000);  // Clear message after 5 seconds
      form.reset();  // Reset the form after submission
    })
    .catch(error => {
      console.error('Error!', error.message);
      msg.innerHTML = "❌ Something went wrong. Please try again later.";
    });
});
