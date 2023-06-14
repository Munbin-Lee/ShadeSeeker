const menu = document.getElementById("search_bar");

const main_tab_statistic = document.getElementById("statistic_tab");
const main_tab_location = document.getElementById("location_tab");
const statistic_icon = document.getElementById("statistic_icon");
const location_icon = document.getElementById("location_icon");

const content = document.getElementById('content');

main_tab_location.addEventListener("click", function () {
  content.data="mapTab.html"
  statistic_icon.src = "icons/statistic.png";
  location_icon.src = "icons/location_clicked.png";
});
main_tab_statistic.addEventListener("click", function () {
  content.data="statistic.html"
  statistic_icon.src = "icons/statistic_clicked.png";
  location_icon.src = "icons/location.png";
});
