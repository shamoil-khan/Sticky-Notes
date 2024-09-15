function createNote(noteText, noteHour, noteMin, noteDay, noteMonth, noteYear) {
  let editNoteHour = noteHour;
  let editNoteMin = noteMin;

  if (noteHour > 9) {
    editNoteHour = noteHour;
  } else {
    editNoteHour = `0${noteHour}`;
  }

  if (noteMin > 9) {
    editNoteMin = noteMin;
  } else {
    editNoteMin = `0${noteMin}`;
  }

  let noteHtml = `<div class="note active notePlaceholderIsActive" data-default-color="#aaaaaa" style="--current-color:var(--grey-bg);" title="${noteText}">
              <div class="text">${noteText}</div>
              <div class="time">${editNoteHour}:${editNoteMin}</div>
              <div class="date">${noteDay} ${noteMonth} ${noteYear}</div>
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

  notesContainer.insertAdjacentHTML("afterbegin", noteHtml);
  noteFunc();
  isNote = true;
}

function addingNote(currentText) {
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

  createNote(currentText, convertedHours, min, day, convertedMonth, year);
}
