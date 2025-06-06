const mobileMenu = document.querySelector(".mobile-menu");
mobileMenu.addEventListener("click", mobileNavbar);

function mobileNavbar() {
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-list li:not(.theme-option-mobile)");
  const activeClass = "active";

  navList.classList.toggle(activeClass);
  mobileMenu.classList.toggle(activeClass);

  navLinks.forEach((link, index) => {
    link.style.animation
      ? (link.style.animation = "")
      : (link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`);
  });

  const themeOptionMobile = document.querySelector(".nav-list .theme-option-mobile");
  if (themeOptionMobile) {
    if (navList.classList.contains(activeClass)) {
        themeOptionMobile.style.animation = `navLinkFade 0.5s ease forwards ${
            navLinks.length / 7 + 0.3
        }s`;
    } else {
        themeOptionMobile.style.animation = "";
    }
  }
}

let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
  nextImage();
}, 3000);

function nextImage() {
  count++;
  if (count > 3) {
    count = 1;
  }
  document.getElementById("radio" + count).checked = true;
}

const themeIconsMobile = document.querySelectorAll('#theme-icons-mobile .theme-icon');
const themeIconsDesktop = document.querySelectorAll('#theme-icons-desktop .theme-icon');
const body = document.body;

const themeNames = {
    'light': 'Claro',
    'dark': 'Escuro',
    'accessibility': 'Acessibilidade'
};

function applyTheme(theme) {
    body.classList.remove('dark-theme', 'accessibility-theme');

    if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else if (theme === 'accessibility') {
        body.classList.add('accessibility-theme');
    }

    function updateActiveIcons(icons) {
        icons.forEach(icon => {
            if (icon.dataset.theme === theme) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
    }
    updateActiveIcons(themeIconsMobile);
    updateActiveIcons(themeIconsDesktop);

    localStorage.setItem('theme', theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    let initialTheme = 'light';

    if (savedTheme && ['light', 'dark', 'accessibility'].includes(savedTheme)) {
        initialTheme = savedTheme;
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            initialTheme = 'dark';
        }
    }

    applyTheme(initialTheme);
}

function addThemeIconListeners(icons) {
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const selectedTheme = icon.dataset.theme;
            applyTheme(selectedTheme);
        });
    });
}

addThemeIconListeners(themeIconsMobile);
addThemeIconListeners(themeIconsDesktop);

document.addEventListener('DOMContentLoaded', loadTheme);