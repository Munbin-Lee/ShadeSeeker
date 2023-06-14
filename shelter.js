const base = "https://apis.data.go.kr/1741000/HeatWaveShelter2/getHeatWaveShelterList2?";
const serviceKey =
  "%2FPyXD53d13dDxi79kkPHb%2BqLRlHbhwyyM7fFVHAUMVAm%2F2UI8TbN%2BolzR10R2weyurRdimRWgXeCGt1Tdos%2B%2FQ%3D%3D";
const numOfRows = "100";
const type = "json";
const year = "2023";

const allowedDistance = 50000;

let shelters = [];

function getShelterInfo() {
  // 원래 62로 설정해야 함
  for (let i = 1; i <= 1; i++) {
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
    console.log(url);
    return;
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        shelters.push(resJson.HeatWaveShelter[1].row);
      });
  }
}

function findNearShelter(lat1, lng1) {
  shelters.forEach(function (shelter) {
    let lat2 = shelter.la;
    let lng2 = shelter.lo;
    if (getDistance(lat1, lat2, lng1, lng2) <= allowedDistance) {
      console.log(shelter.restname);
    }
  });
}

function getDistance(lat1, lat2, lng1, lng2) {
  let dlat = lat1 - lat2;
  let dlng = lng1 - lng2;
  return dlat * dlat + dlng * dlng;
}
