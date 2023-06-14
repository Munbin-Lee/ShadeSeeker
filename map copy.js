// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

function generateMap(lat, lng) {
  console.log("map generate: ", lat, lng);
  let mapContainer = document.getElementById("map");
  let mapOption = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3,
  };

  map = new kakao.maps.Map(mapContainer, mapOption);
  places = new kakao.maps.services.Places();
}

function search(keyword) {
  places.keywordSearch(keyword, searchCallback);
}

function searchCallback(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    console.log(data);
    // setResultTable(data);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
    return;
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert("검색 결과 중 오류가 발생했습니다.");
    return;
  }
}
