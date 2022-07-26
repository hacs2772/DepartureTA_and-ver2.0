import React, { useState, useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  Button,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

async function Tests() {
  let [data, setdata] = useState([]);
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM sqlite_master WHERE type='table`);
  });
  // db.transaction((tx) => {
  //   tx.executeSql(
  //     `create table if not exists Out(ID number primary key not null,
  //       Fare number,
  //       TotalTime number,
  //       Name text,
  //       PathType number,
  //       FirstPath text,
  //       SecondPath text,
  //       ThirdPath text,
  //       Schedule text
  //        )`
  //   );
  // });
  // db.transaction((tx) => {
  //   tx.executeSql(`
  //   create table if not exists In(ID number primary key not null,
  //     Fare number,
  //     TotalTime number,
  //     Name text,
  //     PathType number,
  //     SubPath text,
  //     Start text)`);
  // });

  // const ItemRender = ({ item }) => (
  //   <View style={{ alignItems: "center", marginTop: 40 }}>
  //     <Text>{item.id}</Text>
  //     <Text>{item.start}</Text>
  //     <Text>{item.end}</Text>
  //     <Text>{item.pathType}</Text>
  //     <Text>{item.subpath}</Text>
  //     <Text>{item.pay}</Text>
  //     <Text>{item.time}</Text>
  //     <Text>{item.walktime}</Text>
  //   </View>
  // );
  // db.transaction((tx) => {
  //   tx.executeSql(`insert into bye (id, day, time) values('50','목',"13:30")`),
  //     (error) => {
  //       console.log(error);
  //     };
  // });
  // db.transaction((tx) => {
  //   tx.executeSql(`ALTER TABLE home ADD COLUMN day text`);
  // });

  return (
    <SafeAreaView>
      <View style={styles.h}>
        {/* <FlatList
          data={data}
          // keyExtractor={(item, index) => index.toString()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemRender item={item} />}
        /> */}
      </View>
    </SafeAreaView>
  );
}

export default Tests;

const styles = StyleSheet.create({
  h: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 35,
  },
});