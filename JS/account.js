import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
// } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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
// const db = getFirestore(app);
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

// const dbRef = ref(getDatabase(app));
// get(child(dbRef, `users/123ee`))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// !SITE KEY : 6Lc0l2spAAAAAK1sat013JXu1UmlfQpcFC-eCPyY
// !SECRET KEY : 6Lc0l2spAAAAALi2hXBNo_tIDMTX47SyLfWtLT-Y

// const user = auth.currentUser;

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     exArr,
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// // const querySnapshot = await getDocs(collection(db, "users"));
// // querySnapshot.forEach((doc) => {
// //   console.log(`${doc.id} => ${JSON.parse(doc.data())}`);
// // });

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
      //   const emailVerified = user.emailVerified;

      profileContainer.classList.add("activated");
      profileImg.src = photoURL;
      username.innerHTML = displayName;
      useremail.innerHTML = email;
    })
    .catch((error) => {
      alertContainer.classList.add("active");
      showAlert(googleError);
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   const email = error.customData.email;
      //   const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function signOutFunc() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      // console.log("Sign-out successful");

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
      // An error happened.
      // console.log("An error happened.");
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
