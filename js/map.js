document.write('<script src="js/shelter.js"></script>');

const markerImageSize = new kakao.maps.Size(28, 28);
const markerImage = new kakao.maps.MarkerImage("../icons/marker.png", markerImageSize);

let map = null;
let ps = null;

let weatherImg_ = null;
let weatherText_ = null;

// 마커를 담을 배열입니다
let markers = [];

let markers_r = [];
let markers_g = [];
let markers_b = [];
let markers_y = [];

let circle = null;

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
var infowindow_sht = new kakao.maps.InfoWindow({ zIndex: 1, removable: true });

//무더위 쉼터 마크 표시하는 함수
function generateShelterMarker(shelters, islocationSearch = false) {
  (menuEl = document.getElementById("menu_wrap")), (listEl = document.getElementById("placesList"));
  (fragment = document.createDocumentFragment()), (bounds = new kakao.maps.LatLngBounds()), (listStr = "");

  for (i = 0; i < shelters.length; i++) {
    var shelter = shelters[i];
    var itemEl = getListShelter(shelters[i]); // 검색 결과 항목 Element를 생성합니다
    var placePosition = new kakao.maps.LatLng(shelter.la, shelter.lo);
    var markers_sht = null;
    var visible = true;
    var imgSrc = "../icons/marker_";
    switch (String(shelter.equptype)) {
      //노인시설
      case "001":
        imgSrc += "r.png";
        markers_sht = markers_r;
        visible = document.getElementById("red").checked;
        break;

      //복지회관 / 마을회관
      case "002":
      case "003":
      case "005":
      case "006":
        imgSrc += "g.png";
        markers_sht = markers_g;
        visible = document.getElementById("green").checked;
        break;

      //공원 / 정자
      case "009":
      case "010":
      case "011":
      case "022":
        imgSrc += "b.png";
        markers_sht = markers_b;
        visible = document.getElementById("blue").checked;
        break;

      //기타
      default:
        imgSrc += "y.png";
        markers_sht = markers_y;
        visible = document.getElementById("yellow").checked;
    }

    var marker_img = new kakao.maps.MarkerImage(imgSrc, markerImageSize);
    var marker = new kakao.maps.Marker({
      position: placePosition, // 마커의 위치
      image: marker_img,
    });

    //돌아갈곳

    //무더위쉼터의 인포 이벤트
    (function (marker, shelter) {
      kakao.maps.event.addListener(marker, "mouseover", function () {
        displayInfowindow(marker, shelter.restname);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });
      if (islocationSearch) {
        itemEl.onmouseover = function () {
          displayInfowindow(marker, shelter.restname);
        };
        itemEl.onmouseout = function () {
          infowindow.close();
        };

        kakao.maps.event.addListener(marker, "click", function () {
          infowindow.close();
          shelterInfowindow(marker, shelter);
        });
      }
    })(marker, shelter);

    if (visible) {
      marker.setMap(map); // 지도 위에 마커를 표출합니다
    }
    markers_sht.push(marker); // 배열에 생성된 마커를 추가합니다

    if (islocationSearch) {
      bounds.extend(placePosition);
      fragment.appendChild(itemEl);
    }
  }
  if (islocationSearch) {
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;
    map.setBounds(bounds);
  }

  endLoading();
}

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
  ps = new kakao.maps.services.Places();
  setElement(weatherImg, weatherText);
  var latlng = map.getCenter();
  getWeather(latlng.getLat(), latlng.getLng(), weatherImg, weatherText);
}

function setElement(weatherImg, weatherText) {
  kakao.maps.event.addListener(map, "dragend", function () {
    // 지도 중심좌표를 얻어옵니다
    var latlng = map.getCenter();
    getWeather(latlng.getLat(), latlng.getLng(), weatherImg, weatherText);
    var message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
    message += "경도는 " + latlng.getLng() + " 입니다";

    console.log(message);
  });
}

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {
  var keyword = document.getElementById("keyword").value;

  if (!keyword.replace(/^\s+|\s+$/g, "")) {
    alert("키워드를 입력해주세요!");
    return false;
  }

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword, placesSearchCB);
  var latlng = map.getCenter();
  getWeather(latlng.getLat(), latlng.getLng(), weatherImg, weatherText);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 정상적으로 검색이 완료됐으면
    // 검색 목록과 마커를 표출합니다
    displayPlaces(data);

    // 페이지 번호를 표출합니다
    displayPagination(pagination);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
    return;
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert("검색 결과 중 오류가 발생했습니다.");
    return;
  }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
  (menuEl = document.getElementById("menu_wrap")), (listEl = document.getElementById("placesList"));
  (fragment = document.createDocumentFragment()), (bounds = new kakao.maps.LatLngBounds()), (listStr = "");

  // 검색 결과 목록에 추가된 항목들을 제거합니다
  removeAllChildNods();

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();

  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시합니다
    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
      marker = addMarker(placePosition, i),
      itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(placePosition);

    // 마커와 검색결과 항목에 mouseover 했을때
    // 해당 장소에 인포윈도우에 장소명을 표시합니다
    // mouseout 했을 때는 인포윈도우를 닫습니다
    (function (marker, title) {
      kakao.maps.event.addListener(marker, "mouseover", function () {
        displayInfowindow(marker, title);
      });

      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      kakao.maps.event.addListener(marker, "click", function () {});

      itemEl.onmouseover = function () {
        displayInfowindow(marker, title);
      };

      itemEl.onmouseout = function () {
        infowindow.close();
      };

      itemEl.addEventListener("click", function () {
        marker.onclick();
      });
    })(marker, places[i].place_name);

    fragment.appendChild(itemEl);
  }

  // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
  listEl.appendChild(fragment);
  menuEl.scrollTop = 0;

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {
  var el = document.createElement("li"),
    itemStr =
      '<span class="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div class="info">' +
      "   <h5>" +
      places.place_name +
      "</h5>";

  if (places.road_address_name) {
    itemStr +=
      "    <span>" +
      places.road_address_name +
      "</span>" +
      '   <span class="jibun gray">' +
      places.address_name +
      "</span>";
  } else {
    itemStr += "    <span>" + places.address_name + "</span>";
  }

  itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

  el.innerHTML = itemStr;
  el.className = "item";

  return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
    imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
    imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

  //마커 클릭 이벤트 구현입니다.
  kakao.maps.event.addListener(marker, "click", function () {
    removeMarkerShelter();
    if (circle != null) {
      circle.setMap(null);
    }
    setNearbyShelters(marker.getPosition().Ma, marker.getPosition().La);
    map.setLevel(5);
    map.setCenter(marker.getPosition());
    var latlng = map.getCenter();
    getWeather(latlng.getLat(), latlng.getLng(), weatherImg, weatherText);

    // 지도에 표시할 원을 생성합니다
    var new_circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(marker.getPosition().Ma, marker.getPosition().La), // 원의 중심좌표 입니다
      radius: 1000, // 미터 단위의 원의 반지름입니다
      strokeWeight: 5, // 선의 두께입니다
      strokeColor: "#75B8FA", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "dashed", // 선의 스타일 입니다
      fillColor: "#CFE7FF", // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
    });

    // 지도에 원을 표시합니다
    new_circle.setMap(map);
    circle = new_circle;
  });
  marker.setMap(map); // 지도 위에 마커를 표출합니다
  markers.push(marker); // 배열에 생성된 마커를 추가합니다

  return marker;
}

// 지도 위에 표시되고 있는 마커및 원을 모두 제거합니다
function removeMarker() {
  removeMarkerShelter();
  if (circle != null) {
    circle.setMap(null);
  }
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}
// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarkerShelter() {
  for (var i = 0; i < markers_y.length; i++) {
    markers_y[i].setMap(null);
  }
  for (var i = 0; i < markers_r.length; i++) {
    markers_r[i].setMap(null);
  }
  for (var i = 0; i < markers_g.length; i++) {
    markers_g[i].setMap(null);
  }
  for (var i = 0; i < markers_b.length; i++) {
    markers_b[i].setMap(null);
  }
  markers_y = [];
  markers_b = [];
  markers_g = [];
  markers_r = [];
}
// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
  var paginationEl = document.getElementById("pagination"),
    fragment = document.createDocumentFragment(),
    i;

  // 기존에 추가된 페이지번호를 삭제합니다
  while (paginationEl.hasChildNodes()) {
    paginationEl.removeChild(paginationEl.lastChild);
  }

  for (i = 1; i <= pagination.last; i++) {
    var el = document.createElement("a");
    el.href = "#";
    el.innerHTML = i;

    if (i === pagination.current) {
      el.className = "on";
    } else {
      el.onclick = (function (i) {
        return function () {
          pagination.gotoPage(i);
        };
      })(i);
    }

    fragment.appendChild(el);
  }
  paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
  var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

  infowindow.setContent(content);
  infowindow.open(map, marker);
}
function shelterInfowindow(marker, shelter) {
  var content =
    '<div class="info_sht" style="padding:5px;z-index:1;padding-bottom=20px;">' +
    '<a class="info_title">' +
    shelter.restname +
    "</a>" +
    '<a class="info_addr">' +
    shelter.restaddr +
    "</a>" +
    '<button class="info_btn" onclick="openDirections(\'' +
    shelter.restname +
    "', " +
    shelter.la +
    ", " +
    shelter.lo +
    ')">길찾기</button>' +
    "</div>";

  infowindow_sht.setContent(content);
  infowindow_sht.open(map, marker);
}

function openDirections(restname, la, lo) {
  var roadUrl = "https://map.kakao.com/link/to/";
  roadUrl += restname + "," + la + "," + lo;
  let url = "https://map.kakao.com/link/from/현재위치," + lat + "," + lng + "/to/" + restname + "," + la + "," + lo;
  window.open(url);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods() {
  var el = document.getElementById("placesList");
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
  var paginationEl = document.getElementById("pagination");
  // 기존에 추가된 페이지번호를 삭제합니다
  while (paginationEl.hasChildNodes()) {
    paginationEl.removeChild(paginationEl.lastChild);
  }

  infowindow.close();
  infowindow_sht.close();
}

//지역코드로 검색시작
function setlocationShelters(code) {
  // 검색 결과 목록에 추가된 항목들을 제거합니다
  removeAllChildNods();
  removeMarkerShelter();
  var results = [];
  var lats = [];
  var lons = [];
  allShelters.forEach((sht) => {
    if (sht.areaCd.slice(0, 5) == code) {
      lats.push(sht.la);
      lons.push(sht.lo);
      results.push(sht);
    }
  });
  // 이동할 위도 경도 위치를 생성합니다
  var moveLatLon = new kakao.maps.LatLng(calculateAverage(lats), calculateAverage(lons));

  // 지도 중심을 이동시킵니다
  map.setCenter(moveLatLon);
  var latlng = map.getCenter();
  getWeather(latlng.getLat(), latlng.getLng(), weatherImg, weatherText);

  map.setLevel(7);
  generateShelterMarker(results, true);
  endLoading();
}

//검색명에 대한 지역코드 찾아 검색시작
function locationSearch() {
  var sido = document.getElementById("combo1").value;
  var sgg = document.getElementById("combo2").value;
  if (sido == "강원도") {
    sido = "강원특별자치도";
  }
  var location = sido + " " + sgg;
  let url = locationBase + location;
  startLoading();
  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      code = String(resJson.StanReginCd[1].row[0]["sido_cd"]) + String(resJson.StanReginCd[1].row[0]["sgg_cd"]);
      setlocationShelters(code);
    });
}

function calculateAverage(list) {
  var sum = 0;

  // 리스트의 모든 값을 더함
  for (var i = 0; i < list.length; i++) {
    sum += list[i];
  }

  // 평균을 계산하여 반환
  return sum / list.length;
}

// 검색 시작 시 로딩 스피너를 표시
function startLoading() {
  document.getElementById("loading-spinner").style.zIndex = "2";
}

function endLoading() {
  document.getElementById("loading-spinner").style.zIndex = "-1";
}

function updateShelterEl(color, visible) {
  var el = document.getElementById("placesList");
  var childElements = el.children;
  console.log("childEel", childElements);
  var targetClass = null;
  switch (color) {
    case "red":
      targetClass = "marker_r";
      break;
    case "green":
      targetClass = "marker_g";
      break;
    case "blue":
      targetClass = "marker_b";
      break;
    case "yellow":
      targetClass = "marker_y";
      break;
    default:
  }

  console.log(targetClass, visible);
  // 자식 요소를 순회하면서 코드 실행
  for (var i = 0; i < childElements.length; i++) {
    var child = childElements[i];
    var span = child.getElementsByTagName("span")[0]; // 첫 번째 <span> 태그 가져오기
    if (span.classList.contains(targetClass)) {
      if (visible) {
        child.style.display = "";
      } else {
        child.style.display = "none";
      }
    }
  }
}

function changeMarkersVisible(color, visible) {
  updateShelterEl(color, visible);
  switch (color) {
    case "red":
      for (var i = 0; i < markers_r.length; i++) {
        if (visible) {
          markers_r[i].setMap(map);
        } else {
          markers_r[i].setMap(null);
        }
      }
      break;
    case "green":
      for (var i = 0; i < markers_g.length; i++) {
        if (visible) {
          markers_g[i].setMap(map);
        } else {
          markers_g[i].setMap(null);
        }
      }
      break;
    case "blue":
      for (var i = 0; i < markers_b.length; i++) {
        if (visible) {
          markers_b[i].setMap(map);
        } else {
          markers_b[i].setMap(null);
        }
      }
      break;
    case "yellow":
      for (var i = 0; i < markers_y.length; i++) {
        if (visible) {
          markers_y[i].setMap(map);
        } else {
          markers_y[i].setMap(null);
        }
      }
      break;

    default:
  }
}
