let cursor = {
  x: null,
  y: null,
};

let note = {
  dom: null,
  x: null,
  y: null,
};

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("noteInputHeader")) {
    cursor = {
      x: e.clientX,
      y: e.clientY,
    };
    note = {
      dom: e.target.parentNode,
      x: e.target.parentNode.getBoundingClientRect().left,
      y: e.target.parentNode.getBoundingClientRect().top,
    };
  }
});

document.addEventListener("mousemove", (e) => {
  if (note.dom == null) return;
  let currentCursor = {
    x: e.clientX,
    y: e.clientY,
  };
  let distance = {
    x: currentCursor.x - cursor.x,
    y: currentCursor.y - cursor.y,
  };
  note.dom.style.left = note.x + distance.x + "px";
  note.dom.style.top = note.y + distance.y + "px";
  note.dom.style.cursor = "grab";
});

document.addEventListener("mouseup", () => {
  if (note.dom == null) return;
  note.dom.style.cursor = "auto";
  note.dom = null;
});
