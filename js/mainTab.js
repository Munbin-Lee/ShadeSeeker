/* 메뉴 접기 버튼 */

const menu = document.getElementById("foldableBar");
const folderButton = document.getElementById("folderButton");
const btnIcon = document.getElementById("buttonIcon");
const sideFrame = document.getElementById("side_frame");


folderButton.addEventListener("click", function () {
    if (menu.style.display != "none") {
        sideFrame.style.width = 0;
      menu.style.display = "none";
      btnIcon.src = "icons/right-arrow.png";
    } else {
        sideFrame.style.width = "25%";
      menu.style.display = "flex";
      btnIcon.src = "icons/left-arrow.png";
    }
  });  
  
  
  /* 검색 방법 탭 */
    const naming_search = document.getElementById("naming_search");
    const location_search = document.getElementById("location_search");
    const naming_input = document.getElementById("keyword_search_input");
    const location_input = document.getElementById("location_search_input");

  location_search.addEventListener("click", function () {
    naming_input.style.display = "none"
    location_input.style.display = "flex"
    removeMarker();
   removeAllChildNods();

  });
  naming_search.addEventListener("click", function () {
    naming_input.style.display = "flex"
    location_input.style.display = "none"
    removeMarker();
    removeAllChildNods();
  });

  // 엔터 키 이벤트 리스너
document.getElementById("keyword").addEventListener("keyup", function(event) {
  // 엔터 키의 keyCode는 13입니다.
  if (event.key === "Enter") {
    event.preventDefault(); // 기본 동작(페이지 새로고침) 방지
    
    // 버튼 클릭 동작 실행
    document.getElementById("searchButton").click();
  }
});


