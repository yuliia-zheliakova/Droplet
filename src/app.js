// the auto-resizible input bar
function autoresize() {
  let size = input.scrollWidth;
  input.style.width = size + "px";
  input.style.transition = "none";
}

let input = document.getElementById("city-input");
input.addEventListener("input", autoresize);

// Display the date
function getCurFullDate() {
  const curDate = document.querySelector("#date");
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const curFullDate = `${days[now.getDay()]}, ${now.getHours()}:${
    (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
  }`;
  curDate.textContent = curFullDate;
}

getCurFullDate();
