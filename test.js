let url = "https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocode.json";
let paramsDict = {
  accessToken: "3a96e74a-f656-4675-a118-ffa7c4ebb1c4",
  address: "서울특별시",
};
let params = new URLSearchParams(paramsDict);

let fullUrl = url + "?" + params;
console.log(fullUrl);

// jsonpRequest(fullUrl, function (data) {
//   console.log(data.response.result);
// });

// function jsonpRequest(url, callback) {
//   // 콜백 함수명을 동적으로 생성합니다.
//   const callbackName = "jsonp_" + Date.now();

//   // 콜백 함수를 전역 범위에 추가합니다.
//   window[callbackName] = function (data) {
//     callback(data);
//     // 데이터를 처리한 후에는 콜백 함수를 삭제합니다.
//     delete window[callbackName];
//   };

//   // 스크립트 요소를 동적으로 생성하여 API 서버에 요청을 보냅니다.
//   const script = document.createElement("script");
//   script.src = url + "&callback=" + callbackName;
//   document.body.appendChild(script);
// }
