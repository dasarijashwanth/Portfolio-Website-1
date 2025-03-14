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

  // Initialize EmailJS with your user ID
emailjs.init("jashwanthdasari143@gmail.com");  // Your EmailJS user ID

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevents the default form submission

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    // Create the data object to send in the email
    var templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    // Send the email
    emailjs.send("service_iixu6wz", templateParams)
        .then(function(response) {
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();  // Reset the form
        }, function(error) {
            alert('Failed to send message. Please try again later.');
        });
});

