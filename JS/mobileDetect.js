const isMobile = function () {
  const match = window.matchMedia("(pointer:coarse)");
  return match && match.matches;
};

// console.log(isMobile() ? "yes" : "no");

isMobile()
  ? document.body.classList.add("mobile")
  : document.body.classList.remove("mobile");
