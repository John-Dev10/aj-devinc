// ---------- Mobile menu ----------
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        const open = navMenu.classList.toggle("show-menu");
        menuToggle.setAttribute("aria-expanded", open);
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("show-menu");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// ---------- Light / dark theme (icon button, choice is remembered) ----------
const themeBtn = document.getElementById("theme-toggle");

function readTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
}
function writeTheme(value) {
    try { localStorage.setItem("theme", value); } catch (e) {}
}
function applyTheme(light) {
    document.body.classList.toggle("light-mode", light);
    if (themeBtn) {
        themeBtn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    }
}

applyTheme(readTheme() === "light");

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        const light = !document.body.classList.contains("light-mode");
        applyTheme(light);
        writeTheme(light ? "light" : "dark");
    });
}

// ---------- Contact form ----------
// To receive messages, create a free form at formspree.io and paste its URL below,
// for example: "https://formspree.io/f/yourFormId"
const FORM_ENDPOINT = "";

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!FORM_ENDPOINT) {
            formStatus.textContent = "This form isn't connected yet. Please contact me by email instead.";
            return;
        }

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });
            if (!response.ok) throw new Error("Request failed");
            formStatus.textContent = "Thanks, your message was sent.";
            contactForm.reset();
        } catch (error) {
            formStatus.textContent = "Something went wrong. Please try again.";
        }
    });
}

// ---------- Gallery spotlight ----------
document.querySelectorAll(".tile").forEach(function (tile) {
    tile.addEventListener("mousemove", function (e) {
        const r = tile.getBoundingClientRect();
        tile.style.setProperty("--mx", (e.clientX - r.left) + "px");
        tile.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
});

// ---------- Skills fade in and out while scrolling ----------
const skillItems = document.querySelectorAll(".skill");

if ("IntersectionObserver" in window && skillItems.length) {
    const fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
    }, { threshold: 0.2, rootMargin: "-8% 0px -8% 0px" });

    skillItems.forEach(function (item) {
        item.classList.add("fade");
        fadeObserver.observe(item);
    });
}

// ---------- Profile photo: tap + automatic demo on touch devices ----------
const avatar = document.querySelector(".avatar");

if (avatar && window.matchMedia("(hover: none)").matches && "IntersectionObserver" in window) {
    avatar.addEventListener("click", function () {
        avatar.classList.toggle("active");
    });

    let avatarTimer;
    const avatarObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            clearInterval(avatarTimer);
            if (entry.isIntersecting) {
                const pulse = function () {
                    avatar.classList.add("active");
                    setTimeout(function () { avatar.classList.remove("active"); }, 2600);
                };
                pulse();
                avatarTimer = setInterval(pulse, 6000);
            } else {
                avatar.classList.remove("active");
            }
        });
    }, { threshold: 0.5 });
    avatarObserver.observe(avatar);
}