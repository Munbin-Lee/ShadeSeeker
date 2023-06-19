function convertToGrid(v1, v2) {
  // LCC DFS 좌표변환을 위한 기초 자료
  var RE = 6371.00877; // 지구 반경(km)
  var GRID = 5.0; // 격자 간격(km)
  var SLAT1 = 30.0; // 투영 위도1(degree)
  var SLAT2 = 60.0; // 투영 위도2(degree)
  var OLON = 126.0; // 기준점 경도(degree)
  var OLAT = 38.0; // 기준점 위도(degree)
  var XO = 43; // 기준점 X좌표(GRID)
  var YO = 136; // 기준점 Y좌표(GRID)

  var DEGRAD = Math.PI / 180.0;
  var RADDEG = 180.0 / Math.PI;

  var re = RE / GRID;
  var slat1 = SLAT1 * DEGRAD;
  var slat2 = SLAT2 * DEGRAD;
  var olon = OLON * DEGRAD;
  var olat = OLAT * DEGRAD;

  var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);
  var rs = {};

  rs["lat"] = v1;
  rs["lng"] = v2;
  var ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  var theta = v2 * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;
  rs["nx"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  rs["ny"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return rs;
}

function getWeather(lat, lon, imgElement, textElement) {
  v1 = lat;
  v2 = lon;

  let gridCoordinates = convertToGrid(v1, v2);
  let nx = gridCoordinates.nx;
  let ny = gridCoordinates.ny;

  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var day = String(today.getDate()).padStart(2, "0");
  var hours = String(today.getHours() - 1).padStart(2, "0");

  var formattedDate = year + month + day;
  var formattedTime = hours + "00";

  let apiURL =
    "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=wJB5u4Lk3FG95bFUSRipiX938gVIdiLfukQ806B8ql2H2ud9dnffH7kvGhC2yrVevlN0ewKzyeISd3DWI5QVVg%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=" +
    formattedDate +
    "&base_time=" +
    formattedTime +
    "&nx=" +
    nx +
    "&ny=" +
    ny;

  //let apiURL2 = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=Ra8KnDXQFqkPHWYJuYj5WIo0zbXUNa%2BIs8938WOplm3Y5s81nwmWLRbeCO5yvf29u5CQPiSv2tU%2FEFSe8alD5Q%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=" +formattedDate + "&base_time=" + prevTime +"&nx=" + nx + "&ny=" + ny;


  $.getJSON(apiURL, function (data) {
    dataObject = data.response.body.items.item;
    var weather;
    var content;

    for (var i = 0; i < dataObject.length; i++) {
      var item = dataObject[i];
      if (item.category == "T1H") {
        content = item.obsrValue;
      }
      if (item.category == "PTY") {
        weather = item.obsrValue;
      }
    }
    console.log(content, weather);

    if (weather == 0) {
      imgElement.src = "icons/cloudy.png";
    } else {
      imgElement.src = "icons/rain.png";
    }

    textElement.textContent = " " + content + " °C";
  });
}
