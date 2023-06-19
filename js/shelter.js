const base = "https://apis.data.go.kr/1741000/HeatWaveShelter2/getHeatWaveShelterList2?";
const serviceKey = 
  "Ra8KnDXQFqkPHWYJuYj5WIo0zbXUNa%2BIs8938WOplm3Y5s81nwmWLRbeCO5yvf29u5CQPiSv2tU%2FEFSe8alD5Q%3D%3D";
const serviceKey2 =
  "%2FPyXD53d13dDxi79kkPHb%2BqLRlHbhwyyM7fFVHAUMVAm%2F2UI8TbN%2BolzR10R2weyurRdimRWgXeCGt1Tdos%2B%2FQ%3D%3D";
const numOfRows = "1000";
const type = "json";
const year = "2023";

const locationBase = "https://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?serviceKey=Ra8KnDXQFqkPHWYJuYj5WIo0zbXUNa%2BIs8938WOplm3Y5s81nwmWLRbeCO5yvf29u5CQPiSv2tU%2FEFSe8alD5Q%3D%3D&pageNo=1&numOfRows=1&type=json&locatadd_nm="

let allShelters = [];


function getShelterInfo() {
  // 나중에 62로 설정해야함
  for (let i = 1; i <= 62; i++) {
    let url =
      base +
      "serviceKey=" +
      serviceKey +
      "&pageNo=" +
      i +
      "&numOfrows=" +
      numOfRows +
      "&type=" +
      type +
      "&year=" +
      year;

    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        let shelters = resJson.HeatWaveShelter[1].row;
        shelters.forEach((shelter) => {
          allShelters.push(shelter);
        });
      }).catch(error => {
        // 네트워크 오류나 다른 예외를 처리하는 로직
        console.log('Error:', error);
      });
  }
}

//반경 1km 쉘터만 표시
function setNearbyShelters(lat,lon){
  var results = []

  allShelters.forEach((sht)=>{
    var distance = calculateDistance(sht.la, sht.lo, lat, lon)
    if(distance <= 1){
      results.push(sht)
    }
  })
  generateShelterMarker(results)
}


//지도 상 거리 계산하는 함수
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // 지구 반지름 (단위: km)

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListShelter(shelter) {
  var el = document.createElement("li"),
  marker_color = "y"  
  itemStr =
      '<span class="marker_' +
      marker_color +
      '"></span>' +
      '<div class="info">' +
      "   <h5>" +
      shelter.restname +
      "</h5>";
  itemStr += "    <span>" + (shelter.restaddr) + "</span>"
  itemStr += '  <span class="tel">' + (shelter.mngdptCd) + "</span>" + "</div>";
  
  el.innerHTML = itemStr;
  el.className = "item";

  return el;
}