import React, { useEffect, useState } from "react";

import * as SQLite from "expo-sqlite";
import { Alert, SafeAreaView, Text } from "react-native";

const db = SQLite.openDatabase("db.db");
function Getroute(lat, long) {
  db.transaction((tx) => {
    tx.executeSql(
      `create table if not exists Out(ID number primary key not null,
        Fare number,
        TotalTime number,
        Name text,
        PathType number,
        FirstPath text,
        SecondPath text,
        ThirdPath text,
        Schedule text
         )`
    );
  });
  db.transaction((tx) => {
    tx.executeSql(`
    create table if not exists InCity(ID number primary key not null,
      Fare number,
      TotalTime number,
      Name text,
      PathType number,
      SubPath text,
      Start text)`);
  });
  async function fetchData() {
    let incitydata = await Incity();
    let firstdata = await First();
    let headdata = await Head(firstdata);
    let taildata = await Tail(headdata);
    let incitydb = await InDB(incitydata);
    let outcitydb = await OutDB(taildata);
    let ni = await ReadDB(incitydb, outcitydb);
    // console.log("incitydata : ", incitydata);
    // console.log("firstdata : ", firstdata);
    // console.log("headdata : ", headdata);
    // console.log("taildata : ", taildata);
    return true;
  }
  async function ReadDB(a, b) {
    let out = [];

    db.transaction((tx) => {
      tx.executeSql(`select * from Out`, [], (tx, result) => {
        for (let i = 0; i < result.rows.length; ++i) {
          if (out.includes(result.rows._array)) {
          } else {
            out.push(result.rows._array[i]);
          }
        }
      });
    });
    db.transaction((tx) => {
      tx.executeSql(`select * from InCity`, [], (tx, result) => {
        for (let i = 0; i < result.rows.length; ++i) {
          if (out.includes(result.rows._array)) {
          } else {
            out.push(result.rows._array[i]);
          }
        }
        console.log("All", out);
      });
    });
  }
  async function OutDB(a) {
    for (let i = 0; i < a.length; i++) {
      db.transaction((tx) => {
        tx.executeSql(
          `insert into Out (Id, Fare, PathType, FirstPath, ThirdPath, SecondPath) values 
          ('${a[i].id}',
          '${a[i].pay}',
          '${a[i].pathType}',
          '${JSON.stringify(a[i]["first"])}',
          '${JSON.stringify(a[i]["third"])}',
          '${JSON.stringify(a[i]["second"])}')`
        );
      });
    }
  }
  async function InDB(a) {
    for (let i = 0; i < a.length; i++) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `insert into InCity (ID, Fare, PathType, TotalTime, SubPath, Start) values ('${
              a[i].id
            }','${a[i].pay}','${a[i].pathType}','${
              a[i].time
            }','${JSON.stringify(a[i]["subpath"])}', '${a[i].start}')`
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  async function Incity() {
    db.transaction((tx) => {
      tx.executeSql(`DELETE from InCity`);
    });
    let ac = [];
    let incity = [];
    let id = 100;
    return new Promise(async function (resolve) {
      let response = await (
        await fetch(
          // `https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX=127.1092&SY=36.9895&EX=127.2635&EY=37.0094&SearchType=0&apiKey=9TFYyYrArmBYT3QuzReAOkcyXeT1fH7Tu3Ydlo4wCLk`

          `https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX=${long}&SY=${lat}&EX=127.2635&EY=37.0094&SearchType=0&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
        )
      ).json();
      let arr = await response["result"]["path"];
      if (arr[0].pathType < 4) {
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i]["subPath"];
          let time = arr[i]["info"].totalTime;
          let pay = arr[i]["info"].payment;
          let start = arr[i]["info"].firstStartStation;
          let end = arr[i]["info"].lastEndStation;
          let pathType = arr[i].pathType;
          for (let j = 0; j < arr2.length; j++) {
            switch (arr2[j].trafficType) {
              case 1:
                let res = await (
                  await fetch(
                    `https://api.odsay.com/v1/api/subwayPath?lang=0&CID=${arr2[j]["lane"][0].subwayCityCode}&SID=${arr2[j].startID}&EID=${arr2[j].endID}&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
                  )
                ).json();
                let wayName = await res["result"]["driveInfoSet"][
                  "driveInfo"
                ][0].wayName;
                ac.push({
                  type: "지하철",
                  name: arr2[j]["lane"][0].name,
                  wayCode: arr2[j].wayCode,
                  startID: arr2[j].startID,
                  wayName: wayName,
                });
                break;
              case 2:
                let busno = [];
                for (let k = 0; k < arr2[j]["lane"].length; k++) {
                  busno.push(
                    JSON.stringify(arr2[j]["lane"][k]["busNo"]).replace(
                      /\"/gi,
                      " "
                    )
                  );
                }
                ac.push({
                  type: "버스",
                  name: busno,
                  cityCode: arr2[j]["lane"][0].busCityCode,
                  startID: arr2[j].startID,
                  busID: arr2[j]["lane"][0].busID,
                  start: arr2[j].startName,
                });
                break;
              case 3:
                ac.push({
                  type: "걷기",
                  name: "",
                  distance: arr2[j].distance,
                  sectionTime: arr2[j].sectionTime,
                });
                break;
            }
          }
          incity.push({
            id: id,
            pay: pay,
            pathType: pathType,
            subpath: ac,
            time: time,
            start: start,
            end: end,
          });
          id++;
          ac = [];
        }
        resolve(incity);
      } else {
        resolve(incity);
      }
    });
  }
  async function First() {
    db.transaction((tx) => {
      tx.executeSql(`DELETE from Out`);
    });
    let first = [];
    return new Promise(async function (resolve) {
      const response = await (
        await fetch(
          `https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX=${long}&SY=${lat}&EX=127.2635&EY=37.0094&SearchType=1&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`

          // `https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX=127.1092&SY=36.9895&EX=127.2635&EY=37.0094&SearchType=1&apiKey=9TFYyYrArmBYT3QuzReAOkcyXeT1fH7Tu3Ydlo4wCLk`
        )
      ).json();
      if (response.error) {
        resolve(first);
      } else {
        const arr = await response["result"]["path"];
        let startx = [];
        let starty = [];
        let endx = [];
        let endy = [];
        let t = 0;
        let sx;
        let sy;
        let ex;
        let ey;
        let pay;
        let end = [];
        let start = [];
        let startName;
        let endName;
        let r = 0;
        for (let i = 0; i < arr.length; i++) {
          startName = arr[i]["info"].firstStartStation;
          endName = arr[i]["info"].lastEndStation;
          let bc = [];
          let second = [];
          let arr2 = arr[i]["subPath"];
          for (let j = 0; j < arr2.length; j++) {
            bc.push({
              startID: arr2[j].startID,
              endID: arr2[j].endID,
              trafficType: arr2[j].trafficType,
              sectionTime: arr2[j].sectionTime,
            });
            if (
              arr2[j]["endName"] === "평택지제" ||
              arr2[j]["endName"] === "안성종합버스터미널" ||
              arr2[j]["endName"] === "평택시외버스터미널" ||
              arr2[j]["endName"] === "평택" ||
              arr2[j]["endName"] === "두원대정류소" ||
              arr2[j]["endName"] === "죽산시외버스터미널" ||
              arr2[j]["endName"] === "일죽시외버스터미널" ||
              arr2[j]["endName"] === "공도정류소" ||
              arr2[j]["endName"] === "대림동산정류소" ||
              arr2[j]["endName"] === "중앙대안성캠퍼스정류소"
            ) {
              sx = arr2[0]["startX"];
              sy = arr2[0]["startY"];
              ex = arr2[j]["endX"];
              ey = arr2[j]["endY"];
            }
          }

          if (
            start.includes(startName) === true &&
            end.includes(endName) === true
          ) {
          } else {
            second.push({
              start: startName,
              end: endName,
              TotalTime: arr[i]["info"].totalTime,
              subpath: bc,
            });
            start[t] = startName;
            end[t] = endName;
            startx[t] = sx + r;
            starty[t] = sy + r;
            endx[t] = ex;
            endy[t] = ey;
            pay = arr[i]["info"].totalPayment;
            first.push({
              sx: startx[t],
              sy: starty[t],
              ex: endx[t],
              ey: endy[t],
              pay: pay,
              pathType: arr2[0].trafficType,
              second: second,
            });
            t++;
          }
          if (i === arr.length - 1) {
            resolve(first);
          }
        }
      }
    });
  }

  async function Head(firstdata) {
    let head = [];
    let t = 0;
    let path;
    let intervaltime = 1300;
    let i = 0;
    if (firstdata.length === 0) {
      return head;
    }
    return new Promise(async function (resolve) {
      let interval = setInterval(async () => {
        let res = await (
          await fetch(
            `https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX=${long}&SY=${lat}&EX=${firstdata[i].sx}&EY=${firstdata[i].sy}&SearchType=0&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
            // `https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX=127.1092&SY=36.9895&EX=${firstdata[i].sx}&EY=${firstdata[i].sy}&SearchType=0&apiKey=Qg9KzIkJFCV8wMtZUhSJtcOkDn15Crje91AZj/RazU8`
          )
        ).json();
        if (res.error) {
          if (res.error.code === "-98") {
            console.log(res.error.code);
            resolve(head);
            clearInterval(interval);
          } else {
            intervaltime = 3000;
          }
        } else {
          let pathtype = [];
          let sub = [];
          let subpath = [];
          intervaltime = 1300;
          let mo = [];
          let headarr = await res["result"]["path"];
          for (let k = 0; k < headarr.length; k++) {
            path = headarr[k].pathType;
            if (pathtype.includes(path) === true) {
            } else {
              let arr2 = headarr[k]["subPath"];
              for (let j = 0; j < arr2.length; j++) {
                switch (arr2[j].trafficType) {
                  case 1:
                    let response = await (
                      await fetch(
                        `https://api.odsay.com/v1/api/subwayPath?lang=0&CID=${arr2[j]["lane"][0].subwayCityCode}&SID=${arr2[j].startID}&EID=${arr2[j].endID}&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
                      )
                    ).json();
                    let wayName = await response["result"]["driveInfoSet"][
                      "driveInfo"
                    ][0].wayName;
                    sub.push({
                      type: "지하철",
                      name: arr2[j]["lane"][0].name,
                      wayCode: arr2[j].wayCode,
                      startID: arr2[j].startID,
                      wayName: wayName,
                    });
                    break;
                  case 2:
                    let busno = [];
                    for (let k = 0; k < arr2[j]["lane"].length; k++) {
                      busno.push(
                        JSON.stringify(arr2[j]["lane"][k]["busNo"]).replace(
                          /\"/gi,
                          " "
                        )
                      );
                    }
                    sub.push({
                      type: "버스",
                      name: busno,
                      cityCode: arr2[j]["lane"][0].busCityCode,
                      startID: arr2[j].startID,
                      busID: arr2[j]["lane"][0].busID,
                      start: arr2[j].startName,
                    });

                    break;
                  case 3:
                    sub.push({
                      type: "걷기",
                      name: "",
                      distance: arr2[j].distance,
                      sectionTime: arr2[j].sectionTime,
                    });
                    break;
                }
              }
              if (subpath.includes(sub) === true) {
              } else {
                subpath.push(sub);
                mo.push({
                  start: headarr[k]["info"].firstStartStation,
                  end: headarr[k]["info"].lastEndStation,
                  TotalTime: headarr[k]["info"].totalTime,
                  subpath: sub,
                });
                pathtype[k] = path;
                let walktime = headarr[k]["subPath"][0].sectionTime;
                let id = t;
                let pay = firstdata[i].pay + headarr[k]["info"].payment;
                head.push({
                  pay: pay,
                  walktime: walktime,
                  id: id,
                  pathType: firstdata[i].pathType,
                  second: firstdata[i].second,
                  ex: firstdata[i].ex,
                  ey: firstdata[i].ey,
                  first: mo,
                });
                sub = [];
                t++;
              }
            }
          }
          i++;
          if (i >= firstdata.length) {
            resolve(head);
            clearInterval(interval);
          }
        }
      }, intervaltime);
    });
  }

  async function Tail(headdata) {
    let tail = [];
    let path;
    let id = 0;
    let i = 0;
    let intervaltime = 1300;
    if (headdata.length === 0) {
      return tail;
    }
    return new Promise(async function (resolve) {
      let interval = setInterval(async () => {
        let pathtype = [];
        let sub = [];
        let subpath = [];
        let mo = [];
        let response = await (
          await fetch(
            `https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX=${headdata[i].ex}&SY=${headdata[i].ey}&EX=127.2635&EY=37.0094&OPT=0&SearchType=0&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
          )
        ).json();
        if (response.error) {
          intervaltime = 3000;
        } else {
          intervaltime = 1300;
          let headarr = await response["result"]["path"];
          for (let k = 0; k < headarr.length; k++) {
            if (headarr[k]["info"].lastEndStation != "한경대") {
            } else {
              let arr2 = headarr[k]["subPath"];
              for (let j = 0; j < arr2.length; j++) {
                switch (arr2[j].trafficType) {
                  case 1:
                    let res = await (
                      await fetch(
                        `https://api.odsay.com/v1/api/subwayPath?lang=0&CID=${arr2[j]["lane"][0].subwayCityCode}&SID=${arr2[j].startID}&EID=${arr2[j].endID}&apiKey=ad5MdOpLf4VYRUMULWjX/qTP/a6F2IjL7ZooxTpFBng0`
                      )
                    ).json();
                    let wayName = await res["result"]["driveInfoSet"][
                      "driveInfo"
                    ][0].wayName;
                    sub.push({
                      type: "지하철",
                      name: arr2[j]["lane"][0].name,
                      wayCode: arr2[j].wayCode,
                      startID: arr2[j].startID,
                      wayName: wayName,
                    });

                    break;
                  case 2:
                    let busno = [];
                    for (let k = 0; k < arr2[j]["lane"].length; k++) {
                      busno.push(
                        JSON.stringify(arr2[j]["lane"][k]["busNo"]).replace(
                          /\"/gi,
                          " "
                        )
                      );
                    }
                    sub.push({
                      type: "버스",
                      name: busno,
                      cityCode: arr2[j]["lane"][0].busCityCode,
                      startID: arr2[j].startID,
                      busID: arr2[j]["lane"][0].busID,
                      start: arr2[j].startName,
                    });
                    break;
                  case 3:
                    sub.push({
                      type: "걷기",
                      name: "",
                      distance: arr2[j].distance,
                      sectionTime: arr2[j].sectionTime,
                    });
                    break;
                }
              }
              if (subpath.includes(sub) === true) {
              } else {
                subpath.push(sub);
                mo.push({
                  start: headarr[k]["info"].firstStartStation,
                  end: headarr[k]["info"].lastEndStation,
                  TotalTime: headarr[k]["info"].totalTime,
                  subpath: sub,
                });
                pathtype[k] = path;
                let pay = headdata[i].pay + headarr[k]["info"].payment;
                tail.push({
                  pay: pay,
                  id: id,
                  pathType: headdata[i].pathType,
                  second: headdata[i].second,
                  first: headdata[i].first,
                  third: mo,
                });
                id++;
                sub = [];
                mo = [];
              }
            }
          }
          i++;
          if (i >= headdata.length) {
            resolve(tail);
            clearInterval(interval);
          }
        }
      }, intervaltime);
    });
  }
  return fetchData();
}

export default Getroute;