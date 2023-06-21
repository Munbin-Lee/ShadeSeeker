let weatherBox = document.getElementById("weatherBox");
let fakeImg = document.getElementById("fakeWeather");

weatherBox.addEventListener("mouseenter", () => {
  fakeImg.style.opacity = 1;
});

weatherBox.addEventListener("mouseleave", () => {
  fakeImg.style.opacity = 0;
});
