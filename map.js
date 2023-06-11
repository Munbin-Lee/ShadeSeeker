document.write('<script src="weather.js"></script>');

const markerImageSize = new kakao.maps.Size(24, 35);
const markerImage = new kakao.maps.MarkerImage("icons/marker.png", markerImageSize);

let map = null;
let places = null;

let weatherImg_ = null;
let weatherText_ = null;

function generateMap(lat, lng) {
  const weatherImg = document.getElementById('weatherImg');
  const weatherText = document.getElementById('weatherText');

  console.log("map generate: ", lat, lng);
  let mapContainer = document.getElementById("map");
  let mapOption = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3,
  };

  map = new kakao.maps.Map(mapContainer, mapOption);
  places = new kakao.maps.services.Places();

  setElement(weatherImg,weatherText);
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


function search(keyword) {
  places.keywordSearch(keyword, searchCallback);
}

function searchCallback(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    alert("검색 성공");
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
    return;
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert("검색 결과 중 오류가 발생했습니다.");
    return;
  }
}

function setElement(weatherImg, weatherText){
  kakao.maps.event.addListener(map, 'dragend', function() {        
    // 지도 중심좌표를 얻어옵니다 
    var latlng = map.getCenter(); 
    getWeather(latlng.getLat(),latlng.getLng(),weatherImg,weatherText);
    var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';

    console.log(message);
});
}