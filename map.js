let map = null;

function generateMap(lat, lng) {
  console.log("map generate: ", lat, lng);
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

  // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
  map = new kakao.maps.Map(mapContainer, mapOption);

  // 테스트용
  generateMarker(lat, lng);
}

function generateMarker(lat, lng) {
  console.log("marker generate:", lat, lng);
  var markerPosition = new kakao.maps.LatLng(lat, lng);
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  marker.setMap(map);
}
