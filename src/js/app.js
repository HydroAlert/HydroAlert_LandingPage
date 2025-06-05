const mobileMenu = document.querySelector(".mobile-menu");
mobileMenu.addEventListener("click", mobileNavbar);


function mobileNavbar() {
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-list li");
  const activeClass = "active";
  navLinks.forEach((link, index) => {
    link.style.animation
    ? (link.style.animation = "")
    : (link.style.animation = `navLinkFade 0.5s ease forwards ${
      index / 7 + 0.3
    }s`);
  });
  
  navList.classList.toggle(activeClass);
  mobileMenu.classList.toggle(activeClass);
}

let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function() {
  nextImage();
}, 3000);

function nextImage() {
  count++;
  if (count > 3) {
    count = 1;
  }
  document.getElementById("radio" + count).checked = true;
}