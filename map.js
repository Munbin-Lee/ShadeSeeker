const markerImageSize = new kakao.maps.Size(24, 35);
const markerImage = new kakao.maps.MarkerImage(
  // "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
  "icons/marker.png",
  markerImageSize
);

let map = null;

function generateMap(lat, lng) {
  console.log("map generate: ", lat, lng);
  let mapContainer = document.getElementById("map"); // 지도를 표시할 div
  let mapOption = {
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
  let markerPosition = new kakao.maps.LatLng(lat, lng);
  let marker = new kakao.maps.Marker({
    map: map,
    position: markerPosition,
    image: markerImage,
  });
}
