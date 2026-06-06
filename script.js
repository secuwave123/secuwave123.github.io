const siteHeaderElement = document.getElementById("siteHeader");
const mobileMenuToggleButton = document.getElementById("mobileMenuToggle");
const primaryNavigationLinks = document.getElementById("primaryNavigationLinks");
const contactFormElement = document.getElementById("contactForm");
const formSuccessMessageElement = document.getElementById("formSuccessMessage");

const careerTrackKeywordList = [
  "금융권",
  "행정통계",
  "퀀트",
  "데이터분석",
  "휴먼개발자",
  "사이버보안인프라",
];

const scrollRevealSelectorList = [
  ".service-card",
  ".portfolio-card",
  ".about-intro-panel",
  ".about-feature-card",
  ".about-highlight-card",
  ".contact-intro",
  ".contact-form",
];

function updateHeaderScrollAppearance() {
  const hasScrolledPastThreshold = window.scrollY > 20;
  siteHeaderElement.classList.toggle("is-scrolled", hasScrolledPastThreshold);
}

function toggleMobileNavigationMenu() {
  const isMenuCurrentlyOpen = mobileMenuToggleButton.classList.toggle("is-active");
  primaryNavigationLinks.classList.toggle("is-open", isMenuCurrentlyOpen);
  mobileMenuToggleButton.setAttribute("aria-expanded", String(isMenuCurrentlyOpen));
  mobileMenuToggleButton.setAttribute(
    "aria-label",
    isMenuCurrentlyOpen ? "메뉴 닫기" : "메뉴 열기"
  );
}

function closeMobileNavigationMenu() {
  mobileMenuToggleButton.classList.remove("is-active");
  primaryNavigationLinks.classList.remove("is-open");
  mobileMenuToggleButton.setAttribute("aria-expanded", "false");
  mobileMenuToggleButton.setAttribute("aria-label", "메뉴 열기");
}

function validateEmailAddressFormat({ emailAddress }) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(emailAddress);
}

function displayFieldValidationError({ fieldElement, errorMessageElement, errorMessage }) {
  fieldElement.classList.add("has-error");
  errorMessageElement.textContent = errorMessage;
}

function clearFieldValidationError({ fieldElement, errorMessageElement }) {
  fieldElement.classList.remove("has-error");
  errorMessageElement.textContent = "";
}

function validateContactFormFields({ contactName, contactEmail, contactMessage }) {
  let isFormValid = true;

  const contactNameInput = document.getElementById("contactName");
  const contactEmailInput = document.getElementById("contactEmail");
  const contactMessageTextarea = document.getElementById("contactMessage");

  const contactNameErrorElement = document.getElementById("contactNameError");
  const contactEmailErrorElement = document.getElementById("contactEmailError");
  const contactMessageErrorElement = document.getElementById("contactMessageError");

  clearFieldValidationError({
    fieldElement: contactNameInput,
    errorMessageElement: contactNameErrorElement,
  });
  clearFieldValidationError({
    fieldElement: contactEmailInput,
    errorMessageElement: contactEmailErrorElement,
  });
  clearFieldValidationError({
    fieldElement: contactMessageTextarea,
    errorMessageElement: contactMessageErrorElement,
  });

  if (!contactName.trim()) {
    displayFieldValidationError({
      fieldElement: contactNameInput,
      errorMessageElement: contactNameErrorElement,
      errorMessage: "이름을 입력해 주세요.",
    });
    isFormValid = false;
  }

  if (!contactEmail.trim()) {
    displayFieldValidationError({
      fieldElement: contactEmailInput,
      errorMessageElement: contactEmailErrorElement,
      errorMessage: "이메일을 입력해 주세요.",
    });
    isFormValid = false;
  } else if (!validateEmailAddressFormat({ emailAddress: contactEmail })) {
    displayFieldValidationError({
      fieldElement: contactEmailInput,
      errorMessageElement: contactEmailErrorElement,
      errorMessage: "올바른 이메일 형식이 아닙니다.",
    });
    isFormValid = false;
  }

  if (!contactMessage.trim()) {
    displayFieldValidationError({
      fieldElement: contactMessageTextarea,
      errorMessageElement: contactMessageErrorElement,
      errorMessage: "메시지를 입력해 주세요.",
    });
    isFormValid = false;
  } else if (contactMessage.trim().length < 10) {
    displayFieldValidationError({
      fieldElement: contactMessageTextarea,
      errorMessageElement: contactMessageErrorElement,
      errorMessage: "메시지는 10자 이상 입력해 주세요.",
    });
    isFormValid = false;
  }

  return isFormValid;
}

function handleContactFormSubmission(event) {
  event.preventDefault();

  const formData = new FormData(contactFormElement);
  const contactName = formData.get("contactName");
  const contactEmail = formData.get("contactEmail");
  const contactMessage = formData.get("contactMessage");

  const isFormValid = validateContactFormFields({
    contactName,
    contactEmail,
    contactMessage,
  });

  if (!isFormValid) {
    return;
  }

  formSuccessMessageElement.hidden = false;
  contactFormElement.reset();

  setTimeout(() => {
    formSuccessMessageElement.hidden = true;
  }, 5000);
}

function initializeScrollRevealAnimations() {
  const revealTargetElements = document.querySelectorAll(
    scrollRevealSelectorList.join(", ")
  );

  revealTargetElements.forEach((element) => {
    element.classList.add("reveal-on-scroll");
  });

  const scrollRevealObserver = new IntersectionObserver(
    (observedEntries) => {
      observedEntries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          scrollRevealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargetElements.forEach((element) => {
    scrollRevealObserver.observe(element);
  });
}

function initializeSmoothAnchorNavigation() {
  const anchorLinkElements = document.querySelectorAll('a[href^="#"]');

  anchorLinkElements.forEach((anchorLink) => {
    anchorLink.addEventListener("click", (event) => {
      const targetSectionId = anchorLink.getAttribute("href");

      if (targetSectionId === "#") {
        return;
      }

      const targetSectionElement = document.querySelector(targetSectionId);

      if (!targetSectionElement) {
        return;
      }

      event.preventDefault();
      closeMobileNavigationMenu();

      const headerOffset = siteHeaderElement.offsetHeight;
      const targetScrollPosition =
        targetSectionElement.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({ top: targetScrollPosition, behavior: "smooth" });
    });
  });
}

function initializeCareerTrackKeywordRotation() {
  const careerTrackKeywordElement = document.getElementById("careerTrackKeyword");

  if (!careerTrackKeywordElement) {
    return;
  }

  let currentKeywordIndex = 0;

  window.setInterval(() => {
    careerTrackKeywordElement.classList.add("is-fading");

    window.setTimeout(() => {
      currentKeywordIndex = (currentKeywordIndex + 1) % careerTrackKeywordList.length;
      careerTrackKeywordElement.textContent = careerTrackKeywordList[currentKeywordIndex];
      careerTrackKeywordElement.classList.remove("is-fading");
    }, 350);
  }, 2800);
}

function initializeWebsiteInteractions() {
  window.addEventListener("scroll", updateHeaderScrollAppearance, { passive: true });
  updateHeaderScrollAppearance();

  mobileMenuToggleButton.addEventListener("click", toggleMobileNavigationMenu);
  contactFormElement.addEventListener("submit", handleContactFormSubmission);

  initializeScrollRevealAnimations();
  initializeSmoothAnchorNavigation();
  initializeCareerTrackKeywordRotation();
}

initializeWebsiteInteractions();
