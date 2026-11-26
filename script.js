/* =====================================================
   A.J-DEV INC. HOME PAGE JAVASCRIPT
   1. Your contact details (edit here)
   2. Header and mobile menu
   3. Smooth "Back to top"
   4. Service cards
   5. Scroll fade in and out
   6. Hero slider
   7. Contact form
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

window.addEventListener("scroll", function () {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

function closeMenu() {
  links.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
}

burger.addEventListener("click", function () {
  var isOpen = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", isOpen);
});

links.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeMenu();
  }
});


/* =====================================================
   3. SMOOTH "BACK TO TOP"
   Glides to the top with easing. The further down you are,
   the longer the glide (between 0.6 and 1.6 seconds).
   ===================================================== */
function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function glideToTop() {
  var startY = window.scrollY;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || startY === 0) {
    window.scrollTo(0, 0);
    return;
  }

  var duration = Math.min(1600, 600 + startY * 0.25);
  var startTime = null;

  document.documentElement.style.scrollBehavior = "auto";

  function step(now) {
    if (startTime === null) {
      startTime = now;
    }
    var progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY * (1 - easeInOut(progress)));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      document.documentElement.style.scrollBehavior = "";
    }
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href="#home"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    closeMenu();
    glideToTop();
  });
});


/* =====================================================
   4. SERVICE CARDS (click to show or hide details)
   ===================================================== */
document.querySelectorAll(".svc").forEach(function (card) {
  card.addEventListener("click", function () {
    var isOpen = card.getAttribute("aria-expanded") === "true";
    card.setAttribute("aria-expanded", !isOpen);
    card.querySelector(".tog").textContent = isOpen ? "Show details" : "Hide details";
  });
});


/* =====================================================
   5. SCROLL FADE IN AND OUT
   ===================================================== */
var fadeItems = document.querySelectorAll(".fade");

if ("IntersectionObserver" in window) {

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("on");
        entry.target.classList.remove("up");
      } else {
        entry.target.classList.remove("on");
        entry.target.classList.toggle("up", entry.boundingClientRect.top < 0);
      }
    });
  }, { threshold: 0.12 });

  fadeItems.forEach(function (item, index) {
    item.style.transitionDelay = (index % 3) * 90 + "ms";
    observer.observe(item);
  });

} else {
  fadeItems.forEach(function (item) {
    item.classList.add("on");
  });
}


/* =====================================================
   6. HERO SLIDER
   Slides every 5 seconds. Pauses when the mouse is over it.
   Arrows, dots and swipe also work.
   ===================================================== */
var slidesBox = document.getElementById("slides");
var slideItems = slidesBox.querySelectorAll(".slide");
var dotsBox = document.getElementById("dots");
var current = 0;
var autoplay;

slideItems.forEach(function (slide, i) {
  var dot = document.createElement("button");
  dot.className = "dot";
  dot.setAttribute("aria-label", "Go to message " + (i + 1));
  dot.addEventListener("click", function () {
    goTo(i);
    restartAutoplay();
  });
  dotsBox.appendChild(dot);
});

var dots = dotsBox.querySelectorAll(".dot");

function goTo(index) {
  current = (index + slideItems.length) % slideItems.length;
  slidesBox.style.transform = "translateX(-" + current * 100 + "%)";

  slideItems.forEach(function (slide, i) {
    slide.classList.toggle("active", i === current);
    slide.setAttribute("aria-hidden", i !== current);
  });
  dots.forEach(function (dot, i) {
    dot.classList.toggle("active", i === current);
  });
}

function startAutoplay() {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    autoplay = setInterval(function () {
      goTo(current + 1);
    }, 5000);
  }
}

function restartAutoplay() {
  clearInterval(autoplay);
  startAutoplay();
}

document.getElementById("prev").addEventListener("click", function () {
  goTo(current - 1);
  restartAutoplay();
});

document.getElementById("next").addEventListener("click", function () {
  goTo(current + 1);
  restartAutoplay();
});

var sliderEl = document.getElementById("slider");
sliderEl.addEventListener("mouseenter", function () { clearInterval(autoplay); });
sliderEl.addEventListener("mouseleave", restartAutoplay);
sliderEl.addEventListener("focusin", function () { clearInterval(autoplay); });
sliderEl.addEventListener("focusout", restartAutoplay);

// Swipe on phones
var touchStartX = 0;
sliderEl.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

sliderEl.addEventListener("touchend", function (e) {
  var distance = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 50) {
    goTo(distance < 0 ? current + 1 : current - 1);
    restartAutoplay();
  }
}, { passive: true });

goTo(0);
startAutoplay();


/* =====================================================
   7. CONTACT FORM
   Opens the visitor's email app with the message filled in.
   ===================================================== */
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  var form = e.target;
  var message = document.getElementById("fmsg");

  // Spam trap: real visitors never fill this hidden field
  if (form.website.value) {
    return;
  }

  var emailOk = /^\S+@\S+\.\S+$/.test(form.email.value);
  if (!form.name.value.trim() || !emailOk || !form.msg.value.trim()) {
    message.textContent = "Please enter your name, a valid email and your project details.";
    return;
  }

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