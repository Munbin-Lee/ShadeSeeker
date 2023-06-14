
const locationJson =
  "https://raw.githubusercontent.com/cosmosfarm/korea-administrative-district/master/korea-administrative-district.json";

fetch(locationJson)
  .then((response) => response.json())
  .then((data) => {
    // JSON 데이터를 사용하여 원하는 작업 수행

    // 도시 정보에 접근
    var jsonData = data.data;

    // 첫 번째 콤보박스 구성
    var combo1 = document.getElementById("combo1");
    jsonData.forEach(function (city) {
      var option = document.createElement("option");
      var cityName = Object.keys(city)[0]; // 도시 이름
      option.value = cityName;
      option.text = cityName;

      combo1.appendChild(option);
    });

    // 두 번째 콤보박스 구성
    var combo2 = document.getElementById("combo2");
    jsonData[0]["서울특별시"].forEach(function (district) {
      var option = document.createElement("option");
      option.value = district;
      option.text = district;
      combo2.appendChild(option);
    });

    // 두 번쨰 콤보박스 갱신 이벤트
    combo1.addEventListener("change", function () {
      combo2.innerHTML = ""; // 기존 옵션 초기화
      var selectedCity = combo1.value;
      var selectedData = jsonData.forEach(function (item) {
        if (selectedCity == "세종특별자치시" && Object.keys(item)[0] === selectedCity) {
          var option = document.createElement("option");
          option.value = selectedCity;
          option.text = selectedCity;
          combo2.appendChild(option);
        } else if (Object.keys(item)[0] === selectedCity) {
          item[selectedCity].forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.text = district;
            combo2.appendChild(option);
          });
        }
      });
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });