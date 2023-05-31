function success({ coords }) {
  const lat = coords.latitude; // 위도
  const lng = coords.longitude; // 경도
  console.log("user position:", lat, lng);
  generateMap(lat, lng);
}

function error(e) {
  console.log("error:", e);
}

function getPositionAndGenerateMap() {
  if (!navigator.geolocation) {
    console.log("위치 정보가 존재하지 않습니다!");
  }
  navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
}
