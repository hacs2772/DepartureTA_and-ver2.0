import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");
function InTime(a, value, dtime) {
  async function T() {
    let t = await Schedule();
    let y = await InputDB(t);
    let u = await ReadDB(y);
    return u;
  }

  async function ReadDB(y) {
    let e = [];
    if (y === 0) {
      return true;
    }
    return new Promise(async function (resolve) {
      db.transaction((tx) => {
        tx.executeSql(`select * from InCity`, [], (tx, result) => {
          for (let i = 0; i < result.rows.length; ++i) {
            if (e.includes(result.rows._array)) {
            } else {
              e.push(result.rows._array[i]);
            }
          }
        });
        console.log("e", e);
        resolve(true);
      });
    });
  }

  async function Schedule() {
    let i = 0;
    let response;
    let intervaltime = 1000;
    let g = [];
    if (a.length === 0) {
      return g;
    }
    return new Promise(async (resolve) => {
      let intervals = setInterval(async () => {
        let sub = JSON.parse(a[i]["SubPath"]);
        switch (sub[1].type) {
          case "버스":
            response = await (
              await fetch(
                `https://api.odsay.com/v1/api/busLaneDetail?lang=0&busID=${sub[1].busID}&apiKey=Qg9KzIkJFCV8wMtZUhSJtcOkDn15Crje91AZj/RazU8`
              )
            ).json();
            if (response.error) {
              intervaltime = 3000;
              break;
            } else {
              intervaltime = 1000;
              let start = await response["result"].busFirstTime;
              let q = JSON.stringify(start).replace(/\"/gi, "").split(":");
              let interval;
              switch (value) {
                case "토":
                  interval = await response["result"].bus_Interval_Sat;
                  break;
                case "일":
                  interval = await response["result"].bus_Interval_Sun;
                  break;
                default:
                  interval = await response["result"].bus_Interval_Week;
                  break;
              }
              let arr = await response["result"]["station"];
              for (let k = 0; k < arr.length; k++) {
                if (arr[k].stationID === sub[1].startID) {
                  let gettime = Math.ceil(1.5 * arr[k].idx);
                  let r = Number(q[0] * 60) + Number(q[1]) + gettime;
                  let t = dtime - Number(a[i].TotalTime) - 5;
                  let hour = 0;
                  let minute = 0;
                  if (interval === null || r > t) {
                    g.push({
                      id: a[i].ID,
                      hour: hour,
                      minute: minute,
                      name: sub[1].name,
                    });
                  } else {
                    while (r < t) {
                      if (r > t) {
                        r = r - Number(interval);
                        break;
                      }
                      r = r + Number(interval);
                    }
                    hour = Math.floor(r / 60);
                    minute = r % 60;
                    if (hour < 10) {
                      hour = "0" + hour;
                    }
                    if (minute < 10) {
                      minute = "0" + minute;
                    }
                    g.push({
                      id: a[i].ID,
                      hour: hour,
                      minute: minute,
                      name: sub[1].name,
                    });
                  }
                }
              }
              i++;
              if (i >= a.length) {
                resolve(g);

                clearInterval(intervals);
              }
              break;
            }
          case "지하철":
            let list;
            let way;
            let subschedule = [];
            if (sub[1].wayCode === 1) {
              way = "up";
            } else {
              way = "down";
            }
            switch (value) {
              case "토":
                list = "SatList";
                break;
              case "일":
                list = "SunList";
                break;
              default:
                list = "OrdList";
            }
            response = await (
              await fetch(
                `https://api.odsay.com/v1/api/subwayTimeTable?lang=0&stationID=${sub[1].startID}&wayCode=${sub[1].wayCode}&showExpressTime=1&apiKey=Qg9KzIkJFCV8wMtZUhSJtcOkDn15Crje91AZj/RazU8`
              )
            ).json();
            if (response.error) {
              intervaltime = 3000;
              break;
            } else {
              intervaltime = 1000;
              let subarr = await response["result"][list][way]["time"];
              for (let t = 0; t < subarr.length; t++) {
                if (subarr[t].list.includes(sub[1].wayName)) {
                  let hour = subarr[t].Idx;
                  let minute;
                  let f = subarr[i].list.split(" ");
                  for (let n = 0; n < f.length; n++) {
                    if (f[n].includes(sub[1].wayName)) {
                      minute = f[n].split("(")[0];
                      subschedule.push({
                        schedule: Number(hour * 60) + Number(minute),
                      });
                    }
                  }
                }
              }
              let l = 0;
              let b = 0;
              let hour = 0;
              let minute = 0;
              let time =
                Number(dtime) -
                Number(sub[0].sectionTime) -
                Number(a[i].TotalTime);
              while (true) {
                b = Number(subschedule[l].schedule);
                if (b > time) {
                  break;
                }
                hour = Math.floor(b / 60);
                minute = b % 60;
                if (hour < 10) {
                  hour = "0" + hour;
                }
                if (minute < 10) {
                  minute = "0" + minute;
                }
                l++;
              }
              g.push({
                id: a[i].ID,
                hour: hour,
                minute: minute,
                name: sub[1].name,
              });
              // console.log(i, g);
              i++;
              if (i >= a.length) {
                resolve(g);
                // console.log(g);
                clearInterval(intervals);
              }
              break;
            }
        }
      }, intervaltime);
    });
  }
  async function InputDB(k) {
    console.log("k", k);
    if (k.length === 0) {
      return 0;
    }
    return new Promise((resolve) => {
      for (let i = 0; i < k.length; i++) {
        if (Number(k[i].hour) > 0) {
          db.transaction((tx) => {
            tx.executeSql(
              `update InCity set Schedule ='${k[i].hour}시${k[i].minute}분', name ='${k[i].name}' WHERE id ='${k[i].id}'`
            );
          });
        } else {
          db.transaction((tx) => {
            tx.executeSql(
              `update InCity set Schedule ='운행시간 전 입니다.', name='${k[i].name}' WHERE id ='${k[i].id}'`
            );
          });
        }
        if (i === k.length - 1) {
          resolve(true);
        }
      }
    });
  }
  return T();
}

export default InTime;