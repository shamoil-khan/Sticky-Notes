const alerts = {
  googleError: {
    icon: "!",
    color: "#c73838",
    mess: "login failed",
  },
  googleSuccess: {
    icon: "&check;",
    color: "#06c506",
    mess: "login successfully",
  },
  signError: {
    icon: "!",
    color: "#c73838",
    mess: "sign out failed",
  },
  signSuccess: {
    icon: "&check;",
    color: "#06c506",
    mess: "log out successfully",
  },
  hint: {
    icon: "?",
    color: "#2058b1",
    mess: "your security code is 5656",
  },
  download: {
    icon: "⇩",
    color: "#0181fa",
    mess: "file downloaded successfully",
  },
};

const icon = document.querySelector(".alertContainer #icon");
const mess = document.querySelector(".alertContainer #mess");

function showAlert(messege) {
  icon.innerHTML = messege.icon;
  icon.style.color = messege.color;
  mess.innerHTML = messege.mess;
}

const deleteConfirmData = {
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style="fill: rgba(199, 56, 56, 1); transform: msfilter"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svgxmlns=>',
  color: "#c73838",
  mess: "do you want to delete this note",
};

const alertDeleteContainer = document.querySelector(".alertContainer.delete");
const deleteIcon = document.querySelector(".alertContainer.delete #icon");
const deleteMess = document.querySelector(".alertContainer.delete #mess");
const deleteAllBtns = document.querySelectorAll(
  ".alertContainer.delete button"
);

deleteAllBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    alertDeleteContainer.classList.remove("active");
  });
});
