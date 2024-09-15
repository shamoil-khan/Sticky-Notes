const dark = ` body {
    --black-color: #000;
    --main-bg: #202020;
    --input-bg: #414141;
    --placeholder: #ffffffa1;
    --placeholder-active: #ffffff7e;
    --notes-bg: #ffffff15;
    --notes-active-bg: #ffffff38;
    --scroll: #00000034;
    --notes-hover: #ffffff2c;
    --menu-hover: #ffffff17;
    --border: #ffffff35;
    --menu-border: #00000077;
    --wh-color: #fff;
    --icon-bg: #ffffff77;
    --icon-hover-bg: #ffffffd2;
    --profile-border: #aeaeae;
    --check-border:#2ba6d6;
    --check-tick:#2ba6d6;
  }`;

const light = `body {
    --black-color: #ccc;
    --main-bg: #eee;
    --input-bg: #aeaeae;
    --placeholder: #ffffffa1;
    --placeholder-active: #ffffff7e;
    --notes-bg: #00000015;
    --notes-active-bg: #ffffff38;
    --scroll: #00000034;
    --notes-hover: #0000002c;
    --menu-hover: #00000017;
    --border: #ffffff35;
    --menu-border: #00000077;
    --wh-color: #000;
    --icon-bg: #00000077;
    --icon-hover-bg: #000000d2;
    --profile-border: #4d4949;
    --check-border:#000;
    --check-tick:#000;
  }`;

const setDefault = `@media (prefers-color-scheme: dark) {
  ${dark}
}

@media (prefers-color-scheme: light) {
  ${light}
}`;

const styles = document.getElementById("styles");
const darkCheck = document.getElementById("darkCheck");
const lightCheck = document.getElementById("lightCheck");
const defaultCheck = document.getElementById("defaultCheck");
const themeBox = document.querySelector(".themeBox");
const allTheme = themeBox.querySelectorAll(".themeBtns");
let currentTheme = localStorage.getItem("IJNotesTheme");

allTheme.forEach((theme) => {
  theme.addEventListener("click", (e) => {
    allTheme.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    currentTheme = e.target.getAttribute("data-theme");
    localStorage.setItem("IJNotesTheme", currentTheme);

    switch (currentTheme) {
      case "dark":
        styles.innerHTML = dark;
        break;
      case "light":
        styles.innerHTML = light;
        break;
      case "default":
        styles.innerHTML = setDefault;
        break;

      default:
        styles.innerHTML = setDefault;
        break;
    }
  });
});

try {
  document.querySelector(`.themeBtns.${currentTheme}`).classList.add("active");
} catch (error) {
  console.error(error);
}
switch (currentTheme) {
  case "dark":
    styles.innerHTML = dark;
    break;
  case "light":
    styles.innerHTML = light;
    break;
  case "default":
    styles.innerHTML = setDefault;
    break;

  default:
    styles.innerHTML = setDefault;
    document.querySelector(`.themeBtns.default`).classList.add("active");
    break;
}
