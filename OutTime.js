import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

function OutTime(a, value, dtime) {
  async function T() {
    let third = await Third();
    console.log("third", third);
    let second = await Second(third);
    console.log("second", second);
    let schedule = await Schedule(second);
    console.log("first :", schedule);
    let e = await InputDB(schedule);
    let a = await ReadDB(e);
    return a;
  }
  async function ReadDB(e) {
    let hi = [];
    if (e === 0) {
      return true;
    }
    return new Promise(async function (resolve) {
      db.transaction((tx) => {
        tx.executeSql(`select * from Out`, [], (tx, result) => {
          for (let i = 0; i < result.rows.length; ++i) {
            if (hi.includes(result.rows._array)) {
            } else {
              hi.push(result.rows._array[i]);
            }
            if ((i = result.rows.length - 1)) {
              console.log("out", hi);
              resolve(true);
            }
          }
        });
      });
    });
  }
  async function InputDB(o) {
    let t = 0;
    if (o.length === 0) {
      return 0;
    }
    return new Promise(async function (resolve) {
      for (let i = 0; i < o.length; i++) {
        if (Number(o[i].hour) > 0) {
          db.transaction((tx) => {
            tx.executeSql(
              `update Out set Schedule ='${o[i].hour}시${o[i].minute}분', Name='${o[i].name}' WHERE id ='${o[i].id}'`
            );
          });
          t++;
        } else {
          db.transaction((tx) => {
            tx.executeSql(
              `update Out set Schedule ='운행시간 전 입니다.', Name='${o[i].name}' WHERE id ='${o[i].id}'`
            );
          });
          t++;
        }
      }
      console.log("t", t);
      resolve(true);
    });
  }
  async function Third() {
    let i = 0;
    let response;
    let intervaltime = 1500;
    let g = [];
    let ni = [];
    if (a.length === 0) {
      return g;
    }
    return new Promise(async (resolve) => {
      let intervals = setInterval(async () => {
        let sub = JSON.parse(a[i]["ThirdPath"])[0]["subpath"];
        switch (sub[1].type) {
          case "버스":
            response = await (
              await fetch(
                `https://api.odsay.com/v1/api/busLaneDetail?lang=0&busID=${sub[1].busID}&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
              )
            ).json();
            if (response.error) {
              intervaltime = 3000;
              break;
            } else {
              intervaltime = 1500;
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
              }
              let arr = await response["result"]["station"];
              for (let k = 0; k < arr.length; k++) {
                if (arr[k].stationID === sub[1].startID) {
                  if (ni === a[i].ID) {
                  } else {
                    ni = a[i].ID;
                    let gettime = Math.ceil(1.5 * arr[k].idx);
                    let firsttime = Number(q[0] * 60) + Number(q[1]) + gettime;
                    let t =
                      Number(dtime) -
                      Number(JSON.parse(a[i]["ThirdPath"])[0].TotalTime) -
                      5;
                    if (interval === null || firsttime > t) {
                      g.push({
                        id: a[i].ID,
                        schedule: 0,
                      });
                    } else {
                      while (firsttime < t) {
                        firsttime = firsttime + Number(interval);
                        if (firsttime >= t) {
                          firsttime =
                            firsttime -
                            Number(interval) -
                            Number(sub[0].sectionTime);
                          break;
                        }
                      }
                      g.push({
                        id: a[i].ID,
                        schedule: firsttime,
                      });
                    }
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
                `https://api.odsay.com/v1/api/subwayTimeTable?lang=0&stationID=${sub[1].startID}&wayCode=${sub[1].wayCode}&showExpressTime=1&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
              )
            ).json();
            if (response.error) {
              console.log("error", i);
              intervaltime = 3000;
              break;
            } else {
              intervaltime = 1500;
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
              let b = Number(subschedule[0].schedule);
              let time =
                Number(dtime) -
                Number(sub[0].sectionTime) -
                Number(JONS.parse(a[i]["ThirdPath"])[0].TotalTime);
              if (b > time) {
                g.push({
                  id: a[i].ID,
                  schedule: 0,
                });
              } else {
                while (b < time) {
                  b = Number(subschedule[l].schedule);
                  if (b > time) {
                    b = Number(subschedule[l - 1].schedule);
                    break;
                  }
                  l++;
                }
                g.push({
                  id: a[i].ID,
                  schedule: b,
                });
              }
              // console.log(i, g);
              i++;
              if (i >= a.length) {
                resolve(g);
                clearInterval(intervals);
              }
              break;
            }
        }
      }, intervaltime);
    });
  }

  async function Second(third) {
    let intervaltime = 1500;
    let response;
    let i = 0;
    let b = [];
    let g = [];
    if (third.length === 0) {
      return g;
    }
    return new Promise(async function (resolve) {
      let intervals = setInterval(async () => {
        let sub = JSON.parse(a[0]["SecondPath"])[0]["subpath"];
        for (let t = 0; t < sub.length; t++) {
          switch (sub[t].trafficType) {
            case 4:
              response = await (
                await fetch(
                  `https://api.odsay.com/v1/api/trainServiceTime?lang=0&startStationID=${sub[t].startID}&endStationID=${sub[t].endID}&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
                )
              ).json();
              if (response.error) {
                intervaltime = 3000;
                break;
              } else {
                intervaltime = 1500;
                let arr = await response["result"]["station"];
                for (let j = 0; j < arr.length; j++) {
                  if (arr[j].arrivalTime < third[i].schedule) {
                    let q = JSON.stringify(arr[j].arrivalTime)
                      .replace(/\"/gi, "")
                      .split(":");
                    let p = JSON.stringify(arr[j].wasteTime)
                      .replace(/\"/gi, "")
                      .split(":");
                    b.push({
                      arrivalTime: Number(q[0] * 60) + Number(q[1]),
                      wasteTime: Number(p[0] * 60) + Number(p[1]),
                    });
                  }
                }
                let o = 0;
                let l = b[o].arrivalTime;
                let y = 0;
                if (l > third[i].schedule) {
                  g.push({
                    id: third[i].id,
                    name: "열차",
                    schedule: y,
                  });
                } else {
                  while (l < third[i].schedule) {
                    l = b[o].arrivalTime;
                    if (l > third[i].schedule) {
                      l = b[o].arrivalTime;
                      y = b[o].wasteTime;
                      break;
                    }
                    o++;
                  }
                  g.push({
                    id: third[i].id,
                    name: "열차",
                    schedule: Number(l) - Number(y),
                  });
                }
                i++;
                if (i >= third.length) {
                  resolve(g);
                  clearInterval(intervals);
                }
                break;
              }
            case 5:
              b = [];
              response = await (
                await fetch(
                  `https://api.odsay.com/v1/api/expressServiceTime?lang=0&startStationID=${sub[t].startID}&endStationID=${sub[t].endID}&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
                )
              ).json();
              if (response.error) {
                intervaltime = 3000;
                break;
              } else {
                intervaltime = 1500;
                let arr2 = await response["result"]["station"];
                let ab = JSON.stringify(arr2[1].wasteTime)
                  .replace(/\"/gi, "")
                  .split(":");
                let waste = Number(ab[0] * 60) + Number(ab[1]);
                let td = arr2[1].schedule.replace(/(\(\우등\))/gi, "");
                let tc = td.replace(/\n/g, "/").split("/");
                for (let nj = 0; nj < tc.length; nj++) {
                  let ti = tc[nj].split(":");
                  b.push({
                    schedule: Number(ti[0] * 60) + Number(ti[1]),
                  });
                }
                let bp = b[0].schedule;
                if (third[i].schedule > bp) {
                  g.push({
                    id: third[i].id,
                    name: "고속버스",
                    schedule: 0,
                  });
                } else {
                  let l = 0;
                  while (third[i].schedule > bp) {
                    bp = b[l].schedule;
                    if (third[i].schedule < bp) {
                      bp = b[l - 1].schedule;
                      break;
                    }
                    l++;
                  }
                  g.push({
                    id: third[i].id,
                    name: "고속버스",
                    schedule: bp,
                  });
                }
                i++;
                if (i >= third.length) {
                  resolve(g);
                  clearInterval(intervals);
                }
                break;
              }
            case 6:
              response = await (
                await fetch(
                  `https://api.odsay.com/v1/api/intercityServiceTime?lang=0&startStationID=${sub[t].startID}&endStationID=${sub[t].endID}&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
                )
              ).json();
              if (response.error) {
                intervaltime = 3000;
                break;
              } else {
                b = [];
                intervaltime = 1500;
                let arr3 = await response["result"]["station"];
                let schedule = arr3[0].schedule.split("/");
                for (let n = 0; n < schedule.length; n++) {
                  let hj = schedule[n].split(":");
                  b.push({
                    schedule: Number(hj[0] * 60) + Number(hj[1]),
                  });
                }
                let j = 0;
                let l = b[0].schedule;
                if (l > third[i].schedule) {
                  g.push({
                    id: third[i].id,
                    name: "시외버스",
                    schedule: 0,
                  });
                } else {
                  while (l > third[i].schedule) {
                    l = b[l].schedule;
                    if (l > third[i].schedule) {
                      l = b[l - 1].schedule;
                    }
                    l++;
                  }
                  g.push({
                    id: third[i].id,
                    name: "시외버스",
                    schedule: l,
                  });
                }
                i++;
                if (i >= third.length) {
                  resolve(g);
                  clearInterval(intervals);
                }
                break;
              }
            default:
              i++;
              if (i >= third.length) {
                resolve(g);
                clearInterval(intervals);
              }
              break;
          }
        }
      }, intervaltime);
    });
  }

  async function Schedule(second) {
    let i = 0;
    let response;
    let intervaltime = 1000;
    let g = [];
    let ni = [];
    if (second.length === 0) {
      return g;
    }
    return new Promise(async (resolve) => {
      let intervals = setInterval(async () => {
        let sub = JSON.parse(a[i]["FirstPath"])[0]["subpath"];
        switch (sub[1].type) {
          case "버스":
            response = await (
              await fetch(
                `https://api.odsay.com/v1/api/busLaneDetail?lang=0&busID=${sub[1].busID}&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
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
                  if (ni === a[i].ID) {
                  } else {
                    ni = a[i].ID;
                    let gettime = Math.ceil(1.5 * arr[k].idx);
                    let r = Number(q[0] * 60) + Number(q[1]) + gettime;
                    let t =
                      Number(second[i].schedule) -
                      Number(JSON.parse(a[i]["FirstPath"])[0].TotalTime);
                    if (interval === null || r > t) {
                      g.push({
                        id: a[i].ID,
                        name: second[i].name,
                        hour: 0,
                        minute: 0,
                      });
                    } else {
                      while (r < t) {
                        r = r + Number(interval);
                        if (r > t) {
                          r = r - Number(interval);
                          break;
                        }
                      }
                      let hour = Math.floor(r / 60);
                      let minute = r % 60;
                      if (hour < 10) {
                        hour = "0" + hour;
                      }
                      if (minute < 10) {
                        minute = "0" + minute;
                      }
                      g.push({
                        id: a[i].ID,
                        name: second[i].name,
                        hour: hour,
                        minute: minute,
                      });
                    }
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
                `https://api.odsay.com/v1/api/subwayTimeTable?lang=0&stationID=${sub[1].startID}&wayCode=${sub[1].wayCode}&showExpressTime=1&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
              )
            ).json();
            if (response.error) {
              intervaltime = 2000;
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
              let l = 1;
              let b = Number(subschedule[0].schedule);

              let time =
                Number(second[i].schedule) -
                Number(JSON.parse(a[i]["FirstPath"])[0].TotalTime);
              if (b > time) {
                g.push({
                  id: a[i].ID,
                  name: second[i].name,
                  hour: 0,
                  minute: 0,
                });
              } else {
                while (b < time) {
                  b = Number(subschedule[l].schedule);
                  if (b > time) {
                    b = Number(subschedule[l - 1].schedule);
                    break;
                  }
                  l++;
                }
                let hour = Math.floor(b / 60);
                let minute = b % 60;
                if (hour < 10) {
                  hour = "0" + hour;
                }
                if (minute < 10) {
                  minute = "0" + minute;
                }
                g.push({
                  id: a[i].ID,
                  name: second[i].name,
                  hour: hour,
                  minute: minute,
                });
              }
              i++;
              if (i >= a.length) {
                resolve(g);

                clearInterval(intervals);
              }
              break;
            }
        }
      }, intervaltime);
    });
  }
  return T();
}
export default OutTime;