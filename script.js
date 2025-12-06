
const typing = document.getElementById("typing");
const text = "Développeuse Web & Logiciel 💻";
let i = 0;

function typeEffect() {
  if (i < text.length) {
    typing.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  } else {
    typing.style.borderRight = "3px solid var(--accent-1)";
    setInterval(() => {
      typing.style.borderRight = typing.style.borderRight === "3px solid var(--accent-1)" 
        ? "3px solid transparent" 
        : "3px solid var(--accent-1)";
    }, 500);
  }
}

typeEffect();

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  
  const icon = themeToggle.querySelector('i');
  icon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse && navCollapse.classList.contains('show')) {
        navCollapse.classList.remove('show');
      }
    }
  });
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    if (!contactForm.action || contactForm.action.includes('ton_code')) {
      e.preventDefault();
      alert("Merci pour votre message ! Je vous répondrai bientôt. 😊");
      contactForm.reset();
    }
  });
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .timeline-content, .about-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

const progressBars = document.querySelectorAll('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0%';
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
  progressObserver.observe(bar);
});