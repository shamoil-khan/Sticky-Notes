//! Hide Default Menu Of Browser

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

//! Main Constants

const termsOfUseBtn = document.getElementById("termsOfUseBtn");
const warningContainer = document.getElementById("warning");
const mainContainer = document.querySelector(".container");
const settingContainer = document.querySelector(".settingContainer");
const notesContainer = document.querySelector(".notesContainer");
const fullscreenIcon = document.querySelector(".fullscreen");
const closeWindowIcon = document.querySelector(".close");
const settingIcon = document.querySelector(".settingIcon");
const settingBackIcon = document.querySelector(".backIcon");
const noteInput = document.querySelector(".noteInput");
const deleteNote_openNote = noteInput.querySelector(".deleteNoteList");
const menuIconInput = noteInput.querySelector(".menuIconInput");
const top_noteInput = noteInput.querySelector(".top");
const colors = top_noteInput.querySelectorAll(".color");
const takingNoteInput = noteInput.querySelector("textarea");
const addIcon = document.querySelector(".addIcon");
const closeNoteIcon = document.querySelector(".closeNote");
const searchInput = document.getElementById("search");
const deleteConfirm = document.getElementById("deleteConfirm");
const delBtnSetting = document.querySelector(".delBtn");
const deleteOk = document.querySelector(".alertContainer.delete .ok");

// termsOfUseBtn.addEventListener("click", () => {
// warningContainer.remove();
// });

try {
  closeWindowIcon.addEventListener("click", () => {
    if (document.body.classList.contains("mobile")) {
      window.close();
    }
  });
} catch (er) {
  console.log(er);
}

//! Music/Audio

//? Error

const errAudio = new Audio("Audio/errAudio.mp3");
errAudio.playbackRate = 1.5;

//! Main varibles

let isNote = false;
let isOnMenu = false;
let isOnNoteInputTop = false;
let noteFullscreen = false;
let saveNotes = true;
let deleteConfirmation = false;

window.addEventListener("beforeunload", () => {
  localStorage.setItem("mainContainerHeight", mainContainer.clientHeight);
  localStorage.setItem("mainContainerWidth", mainContainer.clientWidth);
});

window.addEventListener("load", () => {
  let mainContainerHeight = localStorage.getItem("mainContainerHeight");
  let mainContainerWidth = localStorage.getItem("mainContainerWidth");

  mainContainer.setAttribute(
    "style",
    `
    height:${mainContainerHeight}px;width:${mainContainerWidth}px;
    `
  );

  let getDelConfirm = localStorage.getItem("delete");

  if (getDelConfirm) {
    delBtnSetting.classList.add("on");
    deleteConfirmation = true;
    deleteConfirm.click();
  }
});

//?

const updateLSData = () => {
  //! For Text

  const textAreaData = document.querySelectorAll(".text");
  const notesArr = [];

  textAreaData.forEach((text) => {
    return notesArr.push(text.innerHTML);
  });

  //! For Date

  const dateData = document.querySelectorAll(".date");
  const dateArr = [];

  dateData.forEach((date) => {
    return dateArr.push(date.innerHTML);
  });

  //! For Time

  const timeData = document.querySelectorAll(".time");
  const timeArr = [];

  timeData.forEach((time) => {
    return timeArr.push(time.innerHTML);
  });

  const colorData = document.querySelectorAll(".note");
  const colorArr = [];

  colorData.forEach((data) => {
    return colorArr.push(data.getAttribute("data-default-color"));
  });

  localStorage.setItem("IJnotes", JSON.stringify(notesArr));
  localStorage.setItem("IJNotesDates", JSON.stringify(dateArr));
  localStorage.setItem("IJNotesTimes", JSON.stringify(timeArr));
  localStorage.setItem("IJNotesColors", JSON.stringify(colorArr));
};

//? Getting Back Data from local Storage

const notesData = JSON.parse(localStorage.getItem("IJnotes"));
const datesData = JSON.parse(localStorage.getItem("IJNotesDates"));
const timesData = JSON.parse(localStorage.getItem("IJNotesTimes"));
const colorsData = JSON.parse(localStorage.getItem("IJNotesColors"));

if (notesData) {
  isNote = true;
  function gettingNotes(noteText, dateData, timeData, colorData) {
    let noteHtml = `<div class="note" data-default-color="${colorData}" style="--current-color:${colorData};" title="${noteText}">
    <div class="text">${noteText}</div>
    <div class="time">${timeData}</div>
    <div class="date">${dateData}</div>
    <div class="menuIcon" title="Menu">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    </div>
    <div class="menu">
    <div class="openNote" title="Open note">open note</div>
                <div class="deleteNote" title="Delete note">delete note</div>
                </div>
                </div>`;
    notesContainer.insertAdjacentHTML("beforeend", noteHtml);
    noteFunc();
  }

  for (let i = 0; i < notesData.length; i++) {
    gettingNotes(notesData[i], datesData[i], timesData[i], colorsData[i]);
  }
}

function closeAndSave() {
  let getCurrentNote = document.querySelector(".note.active");

  if (takingNoteInput.value.trim() == "") {
    getCurrentNote.remove();
  }

  let activeNote = document.querySelector(".note.active");

  // activeNote.setAttribute("data-default-color", "#aaaaaa");

  noteInput.classList.remove("active");
  setTimeout(() => {
    takingNoteInput.value = "";
  }, 500);
  const notes = document.querySelectorAll(".note");
  updateLSData();

  notes.forEach((note) => {
    note.classList.remove("active");
  });

  colors.forEach((color) => {
    color.classList.remove("activeColor");
  });
  colors[5].classList.add("activeColor");
}

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.ctrlKey) {
    closeAndSave();
  }
});

closeNoteIcon.addEventListener("click", () => {
  closeAndSave();
  top_noteInput.classList.remove("active");
});

menuIconInput.addEventListener("click", () => {
  top_noteInput.classList.add("active");
});

top_noteInput.addEventListener("mouseover", () => {
  isOnNoteInputTop = true;
});
top_noteInput.addEventListener("mouseout", () => {
  isOnNoteInputTop = false;
});

menuIconInput.addEventListener("mouseover", () => {
  isOnNoteInputTop = true;
});
menuIconInput.addEventListener("mouseout", () => {
  isOnNoteInputTop = false;
});

noteInput.addEventListener("click", () => {
  if (top_noteInput.classList.contains("active") && !isOnNoteInputTop) {
    top_noteInput.classList.remove("active");
  }
});

colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    colors.forEach((color_remove) => {
      color_remove.classList.remove("activeColor");
    });
    e.target.classList.add("activeColor");
    let activeNote = document.querySelector(".note.active");
    activeNote.setAttribute(
      "style",
      `--current-color:${e.target.getAttribute("data-color")};`
    );

    activeNote.setAttribute(
      "data-default-color",
      `${e.target.getAttribute("data-color")}`
    );

    noteInput.setAttribute(
      "style",
      `--current-color:${e.target.getAttribute("data-color")};`
    );

    top_noteInput.classList.remove("active");
  });
});

deleteNote_openNote.addEventListener("click", () => {
  let pendingNote = document.querySelector(".note.active");
  pendingNote.remove();
  updateLSData();
  noteInput.classList.remove("active");
  top_noteInput.classList.remove("active");
});

addIcon.addEventListener("click", () => {
  errAudio.currentTime = 0;

  if (noteInput.classList.contains("active")) {
    errAudio.play();
    noteInput.classList.add("error");

    setTimeout(() => {
      noteInput.classList.remove("error");
    }, 1000);
  } else {
    noteInput.classList.add("active");
    noteInput.setAttribute("style", `--current-color:var(--grey-bg);`);
    let getText = "Take a note";
    takingNoteInput.addEventListener("keydown", () => {
      if (takingNoteInput.value == "") {
        getText = "Take a note";
      } else {
        getText = takingNoteInput.value;
      }
    });
    takingNoteInput.addEventListener("input", () => {
      let activeNote = document.querySelector(".note.active");
      if (takingNoteInput.value == "") {
        activeNote.classList.add("notePlaceholderIsActive");
        getText = "Take a note";
      } else {
        activeNote.classList.remove("notePlaceholderIsActive");
        getText = takingNoteInput.value;
      }
      document.querySelector(".note.active").querySelector(".text").innerHTML =
        getText;

      activeNote.title = getText;
    });
    addingNote(getText);
  }
  takingNoteInput.focus();
});

fullscreenIcon.addEventListener("click", () => {
  if (!document.body.classList.contains("mobile")) {
    if (noteFullscreen) {
      fullscreenIcon.innerHTML = "←→";
      fullscreenIcon.title = "Maximize";
      document.body.style.padding = "0 60px";
      // document.exitFullscreen();
      mainContainer.classList.remove("fullscreenActive");
      noteFullscreen = false;
    } else {
      fullscreenIcon.innerHTML = "→←";
      fullscreenIcon.title = "Manimize";
      document.body.style.padding = "0 0";
      mainContainer.removeAttribute("style");
      // mainContainer.requestFullscreen();
      mainContainer.classList.add("fullscreenActive");
      noteFullscreen = true;
    }
  }
});

function setColor(index) {
  colors[index].classList.add("activeColor");
}

function noteFunc() {
  //! Notes Contants If Available

  const notes = document.querySelectorAll(".note");

  searchInput.addEventListener("keydown", search);
  searchInput.addEventListener("keypress", search);
  searchInput.addEventListener("keyup", search);

  notes.forEach((note) => {
    //! Notes Navigation Contants

    const noteText = note.querySelector(".text");
    const noteTime = note.querySelector(".time");
    const noteDate = note.querySelector(".date");
    const noteMenuIcon = note.querySelector(".menuIcon");
    const noteMenu = note.querySelector(".menu");
    const allnoteMenu = document.querySelectorAll(".menu");
    const openNote = note.querySelector(".openNote");
    const deleteNote = note.querySelector(".deleteNote");

    function openMenu() {
      allnoteMenu.forEach((menu) => {
        menu.classList.remove("active");
      });
      noteMenu.classList.add("active");
    }

    function closeMenu() {
      noteMenu.classList.remove("active");
    }

    noteMenuIcon.addEventListener("mouseover", () => {
      if (noteMenu.classList.contains("active")) {
        isOnMenu = false;
      } else {
        isOnMenu = true;
      }
    });

    note.addEventListener("contextmenu", () => {
      openMenu();
    });

    noteMenuIcon.addEventListener("click", openMenu);

    noteMenu.addEventListener("mouseover", () => {
      isOnMenu = true;
    });

    noteMenu.addEventListener("mouseout", () => {
      isOnMenu = false;
    });

    document.querySelector("*").addEventListener("click", () => {
      if (!isOnMenu) {
        closeMenu();
      }
    });

    function openCurrentNote(e, j) {
      noteInput.classList.add("active");
      noteInput.setAttribute(
        "style",
        `--current-color:${j.getAttribute("data-default-color")};`
      );

      colors.forEach((color) => {
        color.classList.remove("activeColor");
      });

      switch (j.getAttribute("data-default-color")) {
        case "#e6b905":
          setColor(0);
          break;

        case "#6fd262":
          setColor(1);
          break;

        case "#ea86c2":
          setColor(2);
          break;

        case "#c78eff":
          setColor(3);
          break;

        case "#5ac0e7":
          setColor(4);
          break;

        case "#aaaaaa":
          setColor(5);
          break;

        case "#454545":
          setColor(6);
          break;

        default:
          break;
      }

      takingNoteInput.value = e;
      j.classList.add("active");
      takingNoteInput.addEventListener("keydown", () => {
        let activeNote = document.querySelector(".note.active");
        getText = takingNoteInput.value.trim();
        document
          .querySelector(".note.active")
          .querySelector(".text").innerHTML = getText;

        if (takingNoteInput.value == "") {
          activeNote.classList.add("notePlaceholderIsActive");
          getText = "Take a note";
        } else {
          activeNote.classList.remove("notePlaceholderIsActive");
          getText = takingNoteInput.value;
        }
      });

      let date = new Date();
      let hours = date.getHours();
      let min = date.getMinutes();

      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let convertedHours = hours;
      let convertedMonth = "";

      switch (hours) {
        case "00" || 0:
          convertedHours = 12;
          break;
        case 13:
          convertedHours = 1;
          break;
        case 14:
          convertedHours = 2;
          break;
        case 15:
          convertedHours = 3;
          break;
        case 16:
          convertedHours = 4;
          break;
        case 17:
          convertedHours = 5;
          break;
        case 18:
          convertedHours = 6;
          break;
        case 19:
          convertedHours = 7;
          break;
        case 20:
          convertedHours = 8;
          break;
        case 21:
          convertedHours = 9;
          break;
        case 22:
          convertedHours = 10;
          break;
        case 23:
          convertedHours = 11;
          break;
        case 24:
          convertedHours = 12;
          break;

        default:
          convertedHours = hours;
          break;
      }

      switch (month) {
        case 0:
          convertedMonth = "January";
          break;
        case 1:
          convertedMonth = "February";
          break;
        case 2:
          convertedMonth = "March";
          break;
        case 3:
          convertedMonth = "April";
          break;
        case 4:
          convertedMonth = "May";
          break;
        case 5:
          convertedMonth = "June";
          break;
        case 6:
          convertedMonth = "July";
          break;
        case 7:
          convertedMonth = "August";
          break;
        case 8:
          convertedMonth = "September";
          break;
        case 9:
          convertedMonth = "October";
          break;
        case 10:
          convertedMonth = "November";
          break;
        case 11:
          convertedMonth = "December";
          break;

        default:
          break;
      }

      let editNoteHour = convertedHours;
      let editNoteMin = min;

      if (convertedHours > 9) {
        editNoteHour = convertedHours;
      } else {
        editNoteHour = `0${convertedHours}`;
      }

      if (min > 9) {
        editNoteMin = min;
      } else {
        editNoteMin = `0${min}`;
      }

      let openDate = j.querySelector(".date");
      let openTime = j.querySelector(".time");

      openTime.innerHTML = `${editNoteHour}:${editNoteMin}`;
      openDate.innerHTML = `${day} ${convertedMonth}:${year}`;
    }

    function deleteCurrentNote(e) {
      e.remove();
    }

    openNote.addEventListener("click", (e) => {
      try {
        document.querySelectorAll(".note").forEach((note) => {
          note.classList.remove("active");
        });
        let getCurrentText =
          e.target.parentNode.parentNode.querySelector(".text").innerHTML;
        openCurrentNote(getCurrentText, e.target.parentNode.parentNode);
      } catch (error) {
        console.log(error);
      }

      closeMenu();
    });

    if (document.body.classList.contains("mobile")) {
      note.addEventListener("click", (e) => {
        document.querySelectorAll(".note").forEach((note) => {
          note.classList.remove("active");
        });

        try {
          let getCurrentText = e.target.querySelector(".text").innerHTML;
          openCurrentNote(getCurrentText, e.target);
        } catch (error) {
          console.log(error);
        }
        takingNoteInput.focus();
      });
    } else {
      note.addEventListener("dblclick", (e) => {
        document.querySelectorAll(".note").forEach((note) => {
          note.classList.remove("active");
        });

        try {
          let getCurrentText = e.target.querySelector(".text").innerHTML;
          openCurrentNote(getCurrentText, e.target);
        } catch (error) {
          console.log(error);
        }
        takingNoteInput.focus();
      });
    }
    deleteNote.addEventListener("click", (e) => {
      if (deleteConfirmation) {
        showDeleteAlert(e.target.parentNode.parentNode);
      } else {
        deleteCurrentNote(e.target.parentNode.parentNode);
      }
      closeMenu();
      updateLSData();
    });

    function showDeleteAlert(e) {
      deleteIcon.innerHTML = deleteConfirmData.icon;
      deleteIcon.style.color = deleteConfirmData.color;
      deleteMess.innerHTML = deleteConfirmData.mess;
      alertDeleteContainer.classList.add("active");
      deleteOk.focus();

      deleteOk.addEventListener("click", () => {
        deleteCurrentNote(e);
        updateLSData();
      });
    }
  });

  function search() {
    let filter = document.getElementById("search").value.toUpperCase();

    let l = document.querySelectorAll(".text");

    for (var i = 0; i <= l.length; i++) {
      try {
        const a = notes[i].querySelectorAll(".text")[0];
        let value = a.innerHTML || a.innerText || a.textContent;

        if (value.toUpperCase().indexOf(filter) > -1) {
          notes[i].style.display = "block";
        } else {
          notes[i].style.display = "none";
        }
      } catch (error) {
        // console.log(error);
      }
    }
  }
}

if (isNote) {
  noteFunc();
}

settingIcon.addEventListener("click", () => {
  settingContainer.classList.add("active");
});

settingBackIcon.addEventListener("click", () => {
  settingContainer.classList.remove("active");
});

deleteConfirm.addEventListener("change", (e) => {
  if (e.target.checked) {
    delBtnSetting.classList.add("on");
    deleteConfirmation = true;
    localStorage.setItem("delete", true);
  } else {
    deleteConfirmation = false;
    delBtnSetting.classList.remove("on");
    localStorage.removeItem("delete");
  }
});
