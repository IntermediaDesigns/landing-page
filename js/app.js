/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */


const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const fragment = document.createDocumentFragment();

function createNavList() {
  if (!fragment) {
    var fragment = document.createDocumentFragment();
  }
  const homeHeader = document.querySelector("header");
  if (homeHeader) {
    const homeListItem = document.createElement("li");
    const homeLink = document.createElement("a");
    homeLink.textContent = "Home";
    homeLink.setAttribute("href", "#home");
    homeLink.classList.add("menu__link");
    homeLink.id = "home-link";
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
    listItem.appendChild(link);
    fragment.appendChild(listItem);
  }
  navList.appendChild(fragment);
}
createNavList();

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

function scrollToTop() {
  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
scrollToTop();

function setActiveSection() {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (isInViewport(section)) {
      section.classList.add("active");
      navList
        .querySelector('a[href="#' + section.id + '"]')
        .classList.add("active");
    } else {
      section.classList.remove("active");
      navList
        .querySelector('a[href="#' + section.id + '"]')
        .classList.remove("active");
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
