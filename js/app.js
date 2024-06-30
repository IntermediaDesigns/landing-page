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
  // Attach event listener to the home link
  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Attach event listener to the back__top element
  const backTop = document.getElementById("backto__top");
  if (backTop) { // Check if the back__top element exists
    backTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
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
