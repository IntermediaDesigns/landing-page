/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function createNavList() {
  // Create a fragment if not already created
  if (!fragment) {
    var fragment = document.createDocumentFragment();
  }

  // Check and add 'Home' link
  const homeHeader = document.querySelector("header");
  if (homeHeader) {
    const homeListItem = document.createElement("li");
    const homeLink = document.createElement("a");
    homeLink.textContent = "Home"; // Assuming you want the text to be "Home"
    homeLink.setAttribute("href", "#home"); // Assuming the header has an ID of 'home'
    homeLink.classList.add("menu__link");
    homeLink.id = "home-link"; // Assigning a specific ID to the link for the 'home' header
    homeListItem.appendChild(homeLink);
    fragment.appendChild(homeListItem);
  }

  // Existing loop to add sections
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

  // Append the fragment to the navList
  navList.appendChild(fragment);
}
createNavList();

// Add class 'active' to section when near top of viewport
function setActiveSection() {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const rect = section.getBoundingClientRect();
    if (rect.top >= -50 && rect.bottom <= window.innerHeight) {
      if (!section.classList.contains("your-active-class")) {
        section.classList.add("your-active-class");
      }
    } else {
      if (section.classList.contains("your-active-class")) {
        section.classList.remove("your-active-class");
      }
    }
  }
}
document.addEventListener("scroll", setActiveSection);

// Scroll to anchor ID using scrollTO event
function scrollToSection() {
  navList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.nodeName === "A") {
      const section = document.querySelector(e.target.getAttribute("href"));
      section.scrollIntoView({ behavior: "smooth" });
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

/**
 * End Main Functions
 * Begin Events
 */

// Build menu
// function buildMenu() {
//   for (let i = 0; i < sections.length; i++) {
//     const section = sections[i];
//     const navItem = document.createElement("li");
//     navItem.innerHTML =
//       '<a class="menu__link" href="#' + section.id + '">' + section.dataset.nav + "</a>"; // Create a new nav item
//     navList.appendChild(navItem); // Append the new item to the list
//   }
// }
// buildMenu();

// Scroll to section on link click

// Set sections as active
function setActiveSection() {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (isInViewport(section)) {
      section.classList.add("active");
      navList
        .querySelector('a[href="#' + section.id + '"]')
        .classList.add("active"); // Add active class to the nav item
    } else {
      section.classList.remove("active");
      navList
        .querySelector('a[href="#' + section.id + '"]')
        .classList.remove("active"); // Remove active class from the nav item
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
// Set sections as active
setActiveSection();
document.addEventListener("scroll", setActiveSection);
