import React from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Find.db");

db.transaction(
  (tx) => {
    tx.executeSql(
      `create table if not exists ODSAY(DTIME text primary key not null,searchType int not null, pathType int not null, firstStartStation text not null, lastEndStation text not null, startName text not null, endName text not null, busNo int, busId int, wayCode int, citycode int, startID int not null, endID int not null);`
    );
  },
  (error) => {
    console.log(error);
  }
);

db.transaction(
  (tx) => {
    tx.executeSql(
      `insert into ODSAY (DTIME, searchType, pathType, firstStartStation, lastEndStation, startName, endName, busNo, busID, wayCode, cityCode, startID, endID) values ()`
    );
  },
  (error) => {
    console.log(errer);
  }
);

db.transaction(
  (tx) => {
    tx.executeSql(`select * from ODSAY`, [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  },
  (error) => {
    console.log(error);
  }
);
