document.getElementById("uptadeLink").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".header-input").focus();
});


document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // faqat bir marta ishlasin
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    observer.observe(el);
  });
});


const texts = ["Generation", "Propasis", "Future"];
let index = 0;
const textElement = document.getElementById("animated-text");

function showNextText() {
  textElement.style.opacity = 0;

  setTimeout(() => {
    textElement.innerText = texts[index];
    textElement.style.opacity = 1;
    index = (index + 1) % texts.length;
  }, 500);

  setTimeout(showNextText, 3000);
}

window.addEventListener("load", showNextText);

document.addEventListener("DOMContentLoaded", function () {
  const cookie = document.querySelector(".cookie");
  cookie.classList.remove("hide");

  window.addEventListener("scroll", function () {
    cookie.classList.add("hide");
  });
});

function toggleMobileNav() {
  const mobileNav = document.getElementById("mobileNav");
  const burgerMenu = document.querySelector(".burger-menu");

  mobileNav.classList.toggle("active");
  burgerMenu.classList.toggle("active");
}

function closeMobileNav() {
  const mobileNav = document.getElementById("mobileNav");
  const burgerMenu = document.querySelector(".burger-menu");

  mobileNav.classList.remove("active");
  burgerMenu.classList.remove("active");
}

function handleNotify() {
  const input = document.querySelector('input[type="email"]');
  const button = document.querySelector("button");
  const email = input.value.trim();

  // Email formatini tekshiruvchi oddiy regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    button.textContent = "Notifying...";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "Subscribed ✓";
      input.value = "";

      setTimeout(() => {
        button.textContent = "Notify Me ✌️";
        button.disabled = false;
      }, 2000);
    }, 1000);
  } else {
    alert("Please enter a valid email address");
  }
}

// Enter tugmasini bosganda ham ishlatish
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector('input[type="email"]');
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleNotify();
    }
  });
});

// Close mobile nav when clicking outside
document.addEventListener("click", function (event) {
  const mobileNav = document.getElementById("mobileNav");
  const burgerMenu = document.querySelector(".burger-menu");

  if (
    mobileNav.classList.contains("active") &&
    !mobileNav.contains(event.target) &&
    !burgerMenu.contains(event.target)
  ) {
    closeMobileNav();
  }
});

function animateTextSequentiallyOnScroll() {
  const elements = document.querySelectorAll(".typewriter");
  const originals = [];

  elements.forEach((el) => {
    const raw = el.innerHTML;

    // maxsus spanlarni vaqtincha matnga aylantiramiz
    const tempText = raw.replace(
      /<span[^>]*data-animate="blink"[^>]*>(.*?)<\/span>/g,
      "$1"
    );
    originals.push({ el, rawHTML: raw, tempText });
    el.innerHTML = ""; // bo‘shatamiz
  });

  let animated = false;

  function typeHTML(rawText, el, speed = 25, callback) {
    let i = 0;
    el.innerHTML = "";

    function typing() {
      if (i < rawText.length) {
        el.innerHTML += rawText.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else {
        if (callback) callback();
      }
    }

    typing();
  }

  function restoreSpans(originalHTML, el) {
    el.innerHTML = originalHTML;
  }

  function startSequentialTyping(index = 0) {
    if (index >= originals.length) return;

    const { el, rawHTML, tempText } = originals[index];

    typeHTML(tempText, el, 25, () => {
      restoreSpans(rawHTML, el);
      startSequentialTyping(index + 1);
    });
  }

  function checkScroll() {
    const firstEl = originals[0].el;
    const rect = firstEl.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView && !animated) {
      animated = true;
      startSequentialTyping();
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll();
}

document.addEventListener("DOMContentLoaded", animateTextSequentiallyOnScroll);

function type() {
  const text =
    "Everything you need to collaborate tighter, create faster and present better.";
  const target = document.getElementById("typing-text");
  let index = 0;

  function typingStep() {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(typingStep, 40);
    }
  }

  typingStep();
}

let typed = false;

window.addEventListener("scroll", () => {
  const target = document.getElementById("typing-text");
  const rect = target.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom >= 0;

  if (inView && !typed) {
    type();
    typed = true; // faqat bir marta yoziladi
  }
});

function applyBlinkAnimations() {
  const elements = document.querySelectorAll('[data-animate="blink"]');

  elements.forEach((el) => {
    // Boshlang‘ich uslub
    el.style.transition =
      "opacity 0.6s ease-in-out, transform 0.6s ease-in-out";
    el.style.display = "inline-block"; // transform ishlashi uchun

    let visible = true;
    setInterval(() => {
      if (visible) {
        el.style.opacity = "0.2";
        el.style.transform = "scale(1.1)";
      } else {
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      }
      visible = !visible;
    }, 600); // har 0.6s da o‘zgaradi
  });
}

document.addEventListener("DOMContentLoaded", applyBlinkAnimations);

// Feature cards interaction and animations
document.addEventListener("DOMContentLoaded", function () {
  const featureCards = document.querySelectorAll(".feature-card");

  // Observer uchun options
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;

        // ✅ Faqat bir marta kuzatamiz
        obs.unobserve(card);

        // ✅ Typing yoki animatsiyani boshlash
        card.style.animationPlayState = "running";

        // ✅ Interaktiv hodisalarni qo‘shish
        activateCardInteractions(card);
      }
    });
  }, observerOptions);

  // Barcha feature-card'larni kuzatamiz
  featureCards.forEach((card) => {
    // Avval observerga qo‘shamiz
    observer.observe(card);

    // Avval passiv holda qilamiz (ko‘rinmaganday)
    card.style.animationPlayState = "paused";
    card.setAttribute("tabindex", "-1"); // scrollgacha fokuslanmasin
  });

  // Interaktivliklarni faollashtiruvchi funksiya
  function activateCardInteractions(card) {
    // click animatsiyasi
    card.addEventListener("click", function () {
      const feature = this.dataset.feature;
      console.log(`Clicked on ${feature} feature`);

      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });

    // hover animatsiyasi
    card.addEventListener("mouseenter", function () {
      this.style.borderColor = "#4a4a4a";
    });

    card.addEventListener("mouseleave", function () {
      this.style.borderColor = "#2a2a2a";
    });

    // klaviatura bilan kirish
    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });

    card.addEventListener("focus", function () {
      this.style.outline = "2px solid #ffffff";
    });

    card.addEventListener("blur", function () {
      this.style.outline = "none";
    });
  }
});

// Optional: Add smooth scrolling if this section is part of a larger page
function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Export functions for potential use in other scripts
window.FeatureSection = {
  smoothScrollTo,
  cards: document.querySelectorAll(".feature-card"),
};

document.querySelector(".read-more-btn").addEventListener("click", function () {
  const readLessBtn = document.querySelector(".read-less-btn");
  const post4 = document.getElementById("post-4");
  const post5 = document.getElementById("post-5");
  const post6 = document.getElementById("post-6");
  post4.style.display = "block";
  post5.style.display = "block";
  post6.style.display = "block";
  this.style.display = "none";
  readLessBtn.style.display = "block";
});

document.querySelector(".read-less-btn").addEventListener("click", function () {
  const readMoreBtn = document.querySelector(".read-more-btn");
  const post4 = document.getElementById("post-4");
  const post5 = document.getElementById("post-5");
  const post6 = document.getElementById("post-6");
  post4.style.display = "none";
  post5.style.display = "none";
  post6.style.display = "none";
  this.style.display = "none";
  readMoreBtn.style.display = "block";
});
