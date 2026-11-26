/* =====================================================
   A.J-DEV INC. SCRIPT FOR INNER PAGES
   (ceo.html, how-it-works.html, get-started.html)
   1. Your contact details
   2. Header and mobile menu
   3. Smooth "Back to top"
   4. Scroll fade in and out
   5. Get Started form (only runs on get-started.html)
   ===================================================== */


/* =====================================================
   1. YOUR CONTACT DETAILS
   ===================================================== */
var CONFIG = {
  email: "ayijohn28@gmail.com",
  whatsapp: "2348135314019",
  phoneText: "+234 813 531 4019"
};

document.getElementById("yr").textContent = new Date().getFullYear();
document.getElementById("fMail").textContent = CONFIG.email;
document.getElementById("fPhone").textContent = CONFIG.phoneText;

// Any link with the class "js-wa" becomes a WhatsApp link
var waMessage = encodeURIComponent("Hello A.J-Dev, I’d like to enquire about a website.");
document.querySelectorAll(".js-wa").forEach(function (link) {
  link.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + waMessage;
});


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
   4. SCROLL FADE IN AND OUT
   The "js" class is added first, so content only hides for
   the fade effect once this script is running. If the script
   ever fails to load, everything stays visible.
   ===================================================== */
document.documentElement.classList.add("js");

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
   5. GET STARTED FORM (only runs on get-started.html)
   ===================================================== */
var startForm = document.getElementById("startForm");

function projectText(form) {
  return (
    "Name: " + form.name.value + "\n" +
    "Email: " + form.email.value + "\n" +
    "WhatsApp: " + (form.phone.value || "-") + "\n" +
    "Business: " + (form.business.value || "-") + "\n" +
    "Service: " + form.service.value + "\n" +
    "Timeline: " + form.timeline.value + "\n\n" +
    form.msg.value
  );
}

function projectValid(form) {
  var emailOk = /^\S+@\S+\.\S+$/.test(form.email.value);
  return form.name.value.trim() && emailOk && form.msg.value.trim();
}

if (startForm) {
  var note = document.getElementById("fmsg");

  // Button 1: send by email
  startForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Spam trap: real visitors never fill this hidden field
    if (startForm.website.value) {
      return;
    }

    if (!projectValid(startForm)) {
      note.textContent = "Please enter your name, a valid email and your project details.";
      return;
    }

    window.location.href =
      "mailto:" + CONFIG.email +
      "?subject=" + encodeURIComponent("New project request from " + startForm.name.value) +
      "&body=" + encodeURIComponent(projectText(startForm));

    note.textContent = "Thanks, " + startForm.name.value.split(" ")[0] + ". Your email app should open with your request ready to send.";
  });

  // Button 2: send on WhatsApp
  document.getElementById("waSend").addEventListener("click", function () {
    if (!projectValid(startForm)) {
      note.textContent = "Please enter your name, a valid email and your project details.";
      return;
    }

    window.open(
      "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(projectText(startForm)),
      "_blank"
    );
  });
}