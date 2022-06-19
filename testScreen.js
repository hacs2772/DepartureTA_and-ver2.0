import { useState, useEffect } from "react";
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
} from "react-native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

// var xhr = new XMLHttpRequest();
// var url =
//   "https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX=127.11&SY=36.9927&EX=127.2635&EY=37.0094&apiKey={API_KEY}";
// xhr.open("GET", url, true);
// xhr.send();
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     let arr = JSON.parse(xhr.responseText)["result"]["path"];
//     for (let i = 0; i < arr.length; i++) {
//       let arr2 = arr[i]["subPath"];
//       for (let j = 0; j < arr2.length; j++) {
//         if (arr2[j].hasOwnProperty("lane") === true) {
//           let arr3 = arr2[j]["lane"];
//           for (let k = 0; k < arr3.length; k++) {
//             console.log(arr3[k]["busNo"]);
//             db.transaction((tx) => {
//               let busno = JSON.stringify(arr3[k]["busNo"]);
//               tx.executeSql(`insert into test (id) values (${busno})`);
//             });
//           }
//         }
//       }
//     }
//   }
// };

function Tests() {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `create table if not exists bye(id text primary key not null, time text, day text);`,
        []
      );
    },
    (error) => {
      console.log(error);
    }
  );
  let [data, setdata] = useState([]);
  db.transaction((tx) => {
    tx.executeSql(`insert into bye (id, day, time) values('50','목',"13:30")`),
      (error) => {
        console.log(error);
      };
  });
  useEffect(() => {
    db.transaction((tx) => {
      // 데이터 수정 및 추가 tx.executeSql(`update bye set time ='11:30' WHERE id = '50'`),
      tx.executeSql(`select * from bye`, [], (tx, result) => {
        let name = [];
        for (let i = 0; i < result.rows.length; ++i) {
          name.push(result.rows._array[i]);
          console.log(result.rows.item(i));
        }
        setdata(name);
      });
    });
  }, []);

  function listItemView(item) {
    return (
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Text>{item.id}</Text>
        <Text>{item.day}</Text>
        <Text>{item.time}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View style={styles.h}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
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
