const menu = document.getElementById("search_bar");
const folderButton = document.getElementById("folderButton");
const btnIcon = document.getElementById("buttonIcon");
const menu_tab = document.getElementById("menu_tab");
const main_tab_statistic = document.getElementById("statistic_tab");
const main_tab_location = document.getElementById("location_tab");
const statistic_icon = document.getElementById("statistic_icon");
const location_icon = document.getElementById("location_icon");
const myMap = document.getElementById("myMap");

const search_bar = document.getElementById("search_bar");
const naming_search = document.getElementById("naming_search");
const location_search = document.getElementById("location_search");

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
  myMap.style.display = "inline-block";

  statistic_icon.src = "icons/statistic.png";
  location_icon.src = "icons/location_clicked.png";
}); 
main_tab_statistic.addEventListener("click", function () {
  menu.style.display = "none";
  folderButton.style.display = "none";
  myMap.style.display = "none";

  statistic_icon.src = "icons/statistic_clicked.png";
  location_icon.src = "icons/location.png";
});

location_search.addEventListener("click", function () {
  searchHTML.data = "location_search.html";
});
naming_search.addEventListener("click", function () {
  searchHTML.data = "naming_search.html";
});

let namingSearchHTML = document.getElementById("search_bar");
namingSearchHTML.onload = () => {
  let doc = namingSearchHTML.contentDocument;
  let btn = doc.getElementById("search_button");
  btn.addEventListener("click", () => {
    let text = doc.getElementById("search_text");
    console.log("검색 버튼 클릭");
    console.log(text.value);  
    text.value = "";
  });
};
