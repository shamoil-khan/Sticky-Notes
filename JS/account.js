import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  // your config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

function writeUserData(userId, name, note, date, time, color) {
  const db = getDatabase(app);
  set(ref(db, "users/" + userId), {
    username: name,
    note,
    date,
    time,
    color,
  });
}

const provider = new GoogleAuthProvider(app);

const profileContainer = document.getElementById("profile");
const profileImg = document.getElementById("profileImg");
const username = document.getElementById("username");
const useremail = document.getElementById("useremail");
const loginGoogleBtn = document.getElementById("loginGoogle");
const signOutBtn = document.getElementById("signOut");
const alertContainer = document.querySelector(".alertContainer");
const btn = document.querySelector(".btn");

const { hint, download, googleError, googleSuccess, signError, signSuccess } =
  alerts;

btn.addEventListener("click", () => {
  alertContainer.classList.remove("active");
  document.body.style.cursor = "auto";
  document.body.style.pointerEvents = "auto";
});

function googleFunction() {
  document.body.style.pointerEvents = "none";
  document.body.style.cursor = "no-drop";
  signInWithPopup(auth, provider)
    .then((result) => {
      document.body.style.pointerEvents = "auto";
      document.body.style.cursor = "auto";
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      alertContainer.classList.add("active");
      showAlert(googleSuccess);
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;

      profileContainer.classList.add("activated");
      profileImg.src = photoURL;
      username.innerHTML = displayName;
      useremail.innerHTML = email;
    })
    .catch((error) => {
      alertContainer.classList.add("active");
      showAlert(googleError);
    });
}

function signOutFunc() {
  signOut(auth)
    .then(() => {
      alertContainer.classList.add("active");
      showAlert(signSuccess);

      profileContainer.classList.remove("activated");

      profileImg.src = "";
      username.innerHTML = "";
      useremail.innerHTML = "";
    })
    .catch((error) => {
      alertContainer.classList.add("active");
      showAlert(signError);
    });
}

loginGoogleBtn.addEventListener("click", () => {
  googleFunction();
});

signOutBtn.addEventListener("click", () => {
  signOutFunc();
});

let currentUser = "";
let currentId = "";

window.addEventListener("load", () => {
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      profileContainer.classList.add("activated");
      user.providerData.forEach((profile) => {
        profileImg.src = profile.photoURL;
        username.innerHTML = profile.displayName;
        useremail.innerHTML = profile.email;
        currentUser = profile.displayName;
        currentId = profile.uid;
      });
    }
  });
});
