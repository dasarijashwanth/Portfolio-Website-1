$(document).ready(function() {

  // Sticky header on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header as user scrolls
    updateActiveSection();
  });

  // Smooth scrolling for header links
  $(".header ul li a").click(function(e) {
    e.preventDefault(); 

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return; 
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0 
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40; 

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    // Remove active class from all links and add it to the clicked one
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
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .Experience", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .publications-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .publications, .contact", {
    origin: "bottom"
  });
  

  // Contact form submission to Google Sheets
  <!-- EmailJS SDK -->
<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
<script>
  (function() {
    emailjs.init("o0KiwX8aSnZJxx_6S");
  })();

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_nmqgw5a", "template_1vykt3k", this)
      .then(() => {
        const msg = document.getElementById("msg");
        msg.innerHTML = "Message sent successfully!";
        setTimeout(() => msg.innerHTML = "", 5000);
        form.reset();
      }, (error) => {
        alert("Message failed to send. Error: " + JSON.stringify(error));
      });
  });
</script>


// Function to update active section in the header based on scroll position
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Check if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function() {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}  
