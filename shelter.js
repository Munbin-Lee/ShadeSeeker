const base = "https://apis.data.go.kr/1741000/HeatWaveShelter2/getHeatWaveShelterList2?";
const serviceKey =
  "%2FPyXD53d13dDxi79kkPHb%2BqLRlHbhwyyM7fFVHAUMVAm%2F2UI8TbN%2BolzR10R2weyurRdimRWgXeCGt1Tdos%2B%2FQ%3D%3D";
const numOfRows = "1000";
const type = "json";
const year = "2023";

function getShelterPositionAndGenerateMarker(pageNo) {
  // 원래는 62로 해야하지만, 테스트 퍼포먼스를 위해 2로 설정
  for (let i = 1; i <= 2; i++) {
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
        console.log(shelters.length);
        shelters.forEach((shelter) => {
          generateMarker(shelter.la, shelter.lo);
        });
      });
  }
}
