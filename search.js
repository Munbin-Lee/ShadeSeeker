let places = new kakao.maps.services.Places();

function search(keyword) {
  places.keywordSearch(keyword, searchCallback);
}

function searchCallback(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    alert("검색 성공");
    console.log(data);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
    return;
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert("검색 결과 중 오류가 발생했습니다.");
    return;
  }
}