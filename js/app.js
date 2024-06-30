/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const fragment = document.createDocumentFragment();

// Responsive NavBar
document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector(".navbar__menu ul").classList.toggle("active");
});

// Close Sidebar
function closeSidebar() {
  document.querySelector(".navbar__menu ul").classList.remove("active");
  document.body.classList.remove("sidebar-active");
}

document.getElementById("close-sidebar").addEventListener("click", function () {
  closeSidebar();
});

// Function to open the sidebar
function openSidebar() {
  document.body.classList.add("sidebar-active");
}

document.querySelector(".hamburger").addEventListener("click", openSidebar);
document
  .getElementById("close-sidebar")
  .addEventListener("click", closeSidebar);

window.addEventListener("resize", closeSidebar);

// Create Nav List
function createNavList() {
  const sectionsContainer = document.createElement("div");
  sectionsContainer.classList.add("sections-container");

  const homeHeader = document.querySelector("header");
  if (homeHeader) {
    const homeListItem = document.createElement("li");
    const homeLink = document.createElement("a");
    homeLink.textContent = "Home";
    homeLink.setAttribute("href", "#home");
    homeLink.classList.add("menu__link");
    homeLink.id = "home-link";
    homeLink.addEventListener("click", closeSidebar);
    homeListItem.appendChild(homeLink);
    fragment.appendChild(homeListItem);
  }

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = section.getAttribute("data-nav");
    link.setAttribute("href", `#${section.id}`);
    link.classList.add("menu__link");
    link.addEventListener("click", closeSidebar);
    listItem.appendChild(link);
    sectionsContainer.appendChild(listItem);
  }
  fragment.appendChild(sectionsContainer);
  navList.appendChild(fragment);
}
createNavList();

// Scroll to section
function scrollToSection() {
  navList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.nodeName === "A") {
      document.querySelectorAll(".menu__link").forEach((link) => {
        link.classList.remove("active-link");
      });
      e.target.classList.add("active-link");
      const sectionId = e.target.getAttribute("href").substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
}

scrollToSection();

// Scroll to top
function scrollToTop() {
  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const backTop = document.getElementById("backto__top");
  if (backTop) {
    backTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

scrollToTop();

// Set active section
function setActiveSection() {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const h2 = section.querySelector('h2');
    if (isInViewport(section)) {
      section.classList.add("active");
      h2.style.color = "orange";
      document
        .querySelector('a[href="#' + section.id + '"]')
        .classList.add("active-link");
    } else {
      section.classList.remove("active");
      h2.style.color = "";
      document
        .querySelector('a[href="#' + section.id + '"]')
        .classList.remove("active-link");
    }
  }
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -50 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

setActiveSection();
document.addEventListener("scroll", setActiveSection);

// Active Section
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector('h2').classList.add('h2-active');
      } else {
        entry.target.querySelector('h2').classList.remove('h2-active');
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.5
  });

  document.querySelectorAll('section.your-active-class').forEach(section => {
    observer.observe(section);
  });
});