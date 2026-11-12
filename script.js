const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".primary-nav a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const contactForm = document.querySelector("#contact-form");
if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const values = new FormData(contactForm);
    const subject = encodeURIComponent(`Website enquiry: ${values.get("service")}`);
    const body = encodeURIComponent(
      `Name: ${values.get("name")}\nEmail: ${values.get("email")}\nCompany: ${values.get("company") || "Not provided"}\nService: ${values.get("service")}\n\n${values.get("message")}`,
    );
    const notice = contactForm.querySelector(".form-note");
    if (notice) {
      notice.textContent = "Your email app should open with your enquiry ready to send. If it doesn’t, email hello@modernaudit.co.zw.";
    }
    window.location.href = `mailto:hello@modernaudit.co.zw?subject=${subject}&body=${body}`;
  });
}
