/* =====================================================
   A.J-DEV INC. JAVASCRIPT
   1. Your contact details (edit here)
   2. Header and mobile menu
   3. Service cards
   4. Scroll fade in and out
   5. Contact form
   ===================================================== */


/* =====================================================
   1. YOUR CONTACT DETAILS
   WhatsApp format: country code + number, no "+" or spaces
   ===================================================== */
var CONFIG = {
  email: "ayijohn28@gmail.com",
  whatsapp: "2348135314019",
  phoneText: "+234 813 531 4019"
};

// Fill in email, phone and WhatsApp link across the page
document.getElementById("yr").textContent = new Date().getFullYear();
document.getElementById("mailText").textContent = CONFIG.email;
document.getElementById("mailLink").href = "mailto:" + CONFIG.email;
document.getElementById("fMail").textContent = CONFIG.email;
document.getElementById("fPhone").textContent = CONFIG.phoneText;

var waMessage = encodeURIComponent("Hello A.J-Dev, I’d like to enquire about a website.");
document.getElementById("waBtn").href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + waMessage;


/* =====================================================
   2. HEADER AND MOBILE MENU
   ===================================================== */
var header = document.getElementById("top");
var burger = document.getElementById("burger");
var links = document.getElementById("links");

// Add a background to the header once the page is scrolled
window.addEventListener("scroll", function () {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

function closeMenu() {
  links.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
}

// Open or close the menu with the burger button
burger.addEventListener("click", function () {
  var isOpen = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", isOpen);
});

// Close the menu after tapping a link
links.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Close the menu with the Escape key
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeMenu();
  }
});


/* =====================================================
   3. SERVICE CARDS (click to show or hide details)
   ===================================================== */
document.querySelectorAll(".svc").forEach(function (card) {
  card.addEventListener("click", function () {
    var isOpen = card.getAttribute("aria-expanded") === "true";
    card.setAttribute("aria-expanded", !isOpen);
    card.querySelector(".tog").textContent = isOpen ? "Show details" : "Hide details";
  });
});


/* =====================================================
   4. SCROLL FADE IN AND OUT
   Elements with the class "fade" appear when scrolled into
   view and fade away when scrolled out of view.
   ===================================================== */
var fadeItems = document.querySelectorAll(".fade");

if ("IntersectionObserver" in window) {

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // On screen: fade in
        entry.target.classList.add("on");
        entry.target.classList.remove("up");
      } else {
        // Off screen: fade out (upward if it left through the top)
        entry.target.classList.remove("on");
        entry.target.classList.toggle("up", entry.boundingClientRect.top < 0);
      }
    });
  }, { threshold: 0.12 });

  fadeItems.forEach(function (item, index) {
    // Small stagger so neighbouring cards don't appear all at once
    item.style.transitionDelay = (index % 3) * 90 + "ms";
    observer.observe(item);
  });

} else {
  // Old browsers: just show everything
  fadeItems.forEach(function (item) {
    item.classList.add("on");
  });
}


/* =====================================================
   5. CONTACT FORM
   Opens the visitor's email app with the message filled in.
   (To receive form submissions without an email app, you can
   later connect a free service such as Formspree.)
   ===================================================== */
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  var form = e.target;
  var message = document.getElementById("fmsg");

  // Spam trap: real visitors never fill this hidden field
  if (form.website.value) {
    return;
  }

  // Check the fields
  var emailOk = /^\S+@\S+\.\S+$/.test(form.email.value);
  if (!form.name.value.trim() || !emailOk || !form.msg.value.trim()) {
    message.textContent = "Please enter your name, a valid email and your project details.";
    return;
  }

  // Build the email
  var subject = "Website enquiry from " + form.name.value;
  var body =
    "Name: " + form.name.value + "\n" +
    "Email: " + form.email.value + "\n" +
    "Service: " + form.service.value + "\n\n" +
    form.msg.value;

  window.location.href =
    "mailto:" + CONFIG.email +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  message.textContent = "Thanks, " + form.name.value.split(" ")[0] + ". Your email app should open with your request ready to send.";
});