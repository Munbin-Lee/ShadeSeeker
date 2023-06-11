const base = "https://apis.data.go.kr/1741000/HeatWaveShelter2/getHeatWaveShelterList2?";
const serviceKey =
  "%2FPyXD53d13dDxi79kkPHb%2BqLRlHbhwyyM7fFVHAUMVAm%2F2UI8TbN%2BolzR10R2weyurRdimRWgXeCGt1Tdos%2B%2FQ%3D%3D";
const numOfRows = "1000";
const type = "json";
const year = "2023";

let shelters = [];

function getShelterInfo() {
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
        shelters.push(resJson.HeatWaveShelter[1].row);
      });
  }
}
