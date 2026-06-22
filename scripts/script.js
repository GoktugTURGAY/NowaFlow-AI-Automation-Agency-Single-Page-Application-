"use strict";

const mainHeader = document.querySelector(".main-header");
const mobileBtn = document.querySelector(".mobile-btn");
const mainLinks = document.querySelectorAll(".main-link");
const loginBtn = document.querySelector(".btn-login");
const closeBtn = document.querySelector(".close");
const notice = document.querySelector(".notice");
const overlay = document.querySelector(".overlay");
const loginForm = document.querySelector(".login-form");
const loginInputs = document.querySelectorAll(".login-input");
const faqBtns = document.querySelectorAll(".faq-btn");
const faqs = document.querySelectorAll(".faq");
const time = document.querySelector(".time");
const currentYear = new Date().getFullYear();

const toggleMobileNavigation = () => {
  mainHeader.classList.toggle("active");

  if (mainHeader.classList.contains("active")) {
    mobileBtn.ariaExpanded = true;
  } else {
    mobileBtn.ariaExpanded = false;
  }
};

const closeMobileNavigation = () => {
  mainHeader.classList.remove("active");
  mobileBtn.ariaExpanded = false;
};

const openForm = () => mainHeader.classList.add("open");
const closeForm = () => mainHeader.classList.remove("open");

const showNotice = () => notice.classList.add("show");
const hideNotice = () => notice.classList.remove("show");

// Handling FAQs collapse/expand functionality
faqBtns.forEach((faqBtn) => {
  faqBtn.addEventListener("click", () => {
    faqs.forEach((faq) => {
      faq.classList.remove("active");
      const faqBtn = faq.querySelector(".faq-btn");
      faqBtn.ariaExpanded = false;
    });

    const faq = faqBtn.parentElement.parentElement;
    faq.classList.add("active");
    faqBtn.ariaExpanded = true;
  });
});

// Sliding in mobile navigation
mobileBtn.addEventListener("click", toggleMobileNavigation);

// Toggling bgcolor of main header on scroll & closing mobile navigation once scrolling
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    mainHeader.classList.add("bg-clr-change");
  } else {
    mainHeader.classList.remove("bg-clr-change");
  }

  closeMobileNavigation();
});

// Closing mobile navigation on clicking any link
mainLinks.forEach((mainLink) =>
  mainLink.addEventListener("click", closeMobileNavigation),
);

// Closing mobile navigation on clicking escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileNavigation();
  }
});

// Updating date
time.textContent = currentYear;

// Handling login form
loginBtn.addEventListener("click", () => {
  loginInputs.forEach((loginInput) => (loginInput.value = ""));

  openForm();
  loginBtn.ariaExpanded = true;
});

closeBtn.addEventListener("click", closeForm);

overlay.addEventListener("click", closeForm);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeForm();
});

// Handling form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  loginBtn.remove();
  closeForm();
  showNotice();

  setTimeout(hideNotice, 3000);
});
