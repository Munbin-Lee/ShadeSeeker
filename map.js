const markerImageSize = new kakao.maps.Size(24, 35);
const markerImage = new kakao.maps.MarkerImage("icons/marker.png", markerImageSize);

let map = null;

let weatherImg_ = null;
let weatherText_ = null;

function generateMap(lat, lng) {
  const weatherImg = document.getElementById("weatherImg");
  const weatherText = document.getElementById("weatherText");

  console.log("map generate: ", lat, lng);
  let mapContainer = document.getElementById("map");
  let mapOption = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3,
  };

  map = new kakao.maps.Map(mapContainer, mapOption);

  setElement(weatherImg, weatherText);
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

function setElement(weatherImg, weatherText) {
  kakao.maps.event.addListener(map, "dragend", function () {
    // 지도 중심좌표를 얻어옵니다
    let center = map.getCenter();
    let lat = center.getLat();
    let lng = center.getLng();
    getWeather(lat, lng, weatherImg, weatherText);
    let msg = "지도 중심 변경 - lat: " + lat + " , lng: " + lng;
    console.log(msg);
  });
}
