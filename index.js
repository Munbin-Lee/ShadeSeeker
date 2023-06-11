let menu = document.getElementById("search_bar");
let folderButton = document.getElementById("folderButton");
let btnIcon = document.getElementById("buttonIcon");
let menu_tab = document.getElementById("menu_tab");
let main_tab_statistic = document.getElementById("statistic_tab");
let main_tab_location = document.getElementById("location_tab");
let statistic_icon = document.getElementById("statistic_icon");
let location_icon = document.getElementById("location_icon");
let main_page = document.getElementById("main_page");
let search_tab = document.getElementById("search_tab");

let search_bar = document.getElementById("search_bar");
let naming_search = document.getElementById("naming_search");
let location_search = document.getElementById("location_search");

folderButton.addEventListener("click", function () {
  folderButton.classList.toggle("img_toggle");
  if (menu.style.display != "none") {
    menu.style.display = "none";
    search_tab.style.display = "none";
    btnIcon.src = "icons/right-arrow.png";
  } else {
    menu.style.display = "inline-block";
    search_tab.style.display = "inline-block";
    btnIcon.src = "icons/left-arrow.png";
  }
});

main_tab_location.addEventListener("click", function () {
  menu.style.display = "inline-block";
  folderButton.style.display = "inline-block";
  search_tab.style.display = "inline-block";
  main_page.style.display = "inline-block";

  statistic_icon.src = "icons/statistic.png";
  location_icon.src = "icons/location_clicked.png";
});
main_tab_statistic.addEventListener("click", function () {
  menu.style.display = "none";
  search_tab.style.display = "none";
  folderButton.style.display = "none";
  main_page.style.display = "none";

  statistic_icon.src = "icons/statistic_clicked.png";
  location_icon.src = "icons/location.png";
});

location_search.addEventListener("click", function () {
  search_bar.data = "location_search.html";
});
naming_search.addEventListener("click", function () {
  search_bar.data = "naming_search.html";
});
