// the auto-resizible input bar

function autoresize() {
  let size = input.scrollWidth;
  input.style.width = size + "px";
  input.style.transition = "none";
}

let input = document.getElementById("#city-input");
input.addEventListener("input", autoresize);
