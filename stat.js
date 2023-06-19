const currentAreaCaption = document.getElementById("currentArea");
const statTbody = document.getElementById("statTbody");

let dict = {};
let targetDict = {};
let currentLevel = 0; // 0 = 전국, 1 = 광역자치단체, 2 = 시군구
let area = ["전국", "경기도", "안성시"];

function init() {
  fetch("shelterStat.json")
    .then((res) => res.json())
    .then((resJson) => {
      dict = resJson;
      updateTable();
    });
}

function updateLevel() {
  currentAreaCaption.textContent = area[currentLevel];
  updateTable();
}

function updateTable() {
  targetDict = dict;
  if (currentLevel >= 1) targetDict = targetDict[area[1]].subDict;
  if (currentLevel == 2) targetDict = targetDict[area[2]].subDict;

  let sum = 0;
  let sortable = [];
  for (let key in targetDict) {
    sum += targetDict[key].cnt;
    sortable.push([key, targetDict[key].cnt]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  innerHTML = "<tr align='center'><td>합계</td><td>" + sum + "</td></tr>";
  for (let arr of sortable) {
    innerHTML +=
      "<tr align='center' onclick=onClickStatElement(this)><td class='statCnt'>" +
      arr[0] +
      "</td><td>" +
      arr[1] +
      "</td></tr>";
  }
  statTbody.innerHTML = innerHTML;
}

function onClickStatElement(object) {
  if (currentLevel == 2) return;
  let newArea = object.querySelector("td[class='statCnt'").textContent;
  updateArea(currentLevel + 1, newArea);
}

function updateArea(level, newArea) {
  currentLevel = level;
  area[level] = newArea;
  updateLevel();
}

init();
updateLevel(0);
