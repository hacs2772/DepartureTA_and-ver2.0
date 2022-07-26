import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import * as SQLite from "expo-sqlite";
import Getroute from "./getroute";
import InTime from "./InTime";
import OutTime from "./OutTime";
import { es } from "date-fns/locale";

const db = SQLite.openDatabase("db.db");

function Lists({ navigation, route }) {
  let [data, setdata] = useState([]);
  let [sortdata, setsortdata] = useState([]);
  let [Okay, setOkay] = useState(false);
  let [mode, setmode] = useState(false);

  async function T(incity, outcity) {
    let i = await InTime(incity, route.params.id, route.params.ttime);
    console.log("i", i);
    let e = await ReadDB(i);
    let t = await OutTime(outcity, route.params.id, route.params.ttime);
    let j = await ReadDB(t);
    console.log("t", t);
    // let e = await ReadDB(i, t);
  }
  async function ReadDB(a) {
    console.log("db시작");
    let all = [];
    db.transaction((tx) => {
      tx.executeSql(`select * from InCity`, [], (tx, result) => {
        if (result.rows.length === 0) {
          console.log("db is empty");
        } else {
          for (let i = 0; i < result.rows.length; ++i) {
            if (all.includes(result.rows._array)) {
            } else {
              all.push(result.rows._array[i]);
              setdata(all);
            }
          }
        }
      });
    });
    db.transaction((tx) => {
      tx.executeSql(`select * from Out`, [], (tx, result) => {
        if (result.rows.length === 0) {
          console.log("db is empty");
        } else {
          for (let i = 0; i < result.rows.length; ++i) {
            if (all.includes(result.rows._array)) {
            } else {
              all.push(result.rows._array[i]);
              setdata(all);
            }
          }
        }
        setOkay(true);
        console.log("All", all);
      });
    });
  }
  useEffect(() => {
    let incity = [];
    let outcity = [];
    db.transaction(async (tx) => {
      tx.executeSql(`DELETE from Out where Schedule`);
      tx.executeSql(`DELETE from InCity where Schedule`);
      tx.executeSql(`select * from InCity`, [], (tx, result) => {
        if (result.rows.length === 0) {
          console.log("db is empty");
        }
        for (let i = 0; i < result.rows.length; i++) {
          incity.push(result.rows._array[i]);
        }
      });
      tx.executeSql(`select * from Out`, [], (tx, result) => {
        if (result.rows.length === 0) {
          console.log("db is empty");
        }
        for (let i = 0; i < result.rows.length; i++) {
          outcity.push(result.rows._array[i]);
        }
        T(incity, outcity);
      });
    });
  }, []);

  let [a, seta] = useState("");
  useEffect(() => {
    setsortdata(sortdata);
  }, []);
  let [visible, setVisible] = useState(false);
  const hideMenu = () => {
    setVisible(false);
  };
  const showMenu = () => setVisible(true);
  // const sort_Array_Alphabetically = () => {
  //   setsortdata(
  //     data.sort(function (a, b) {
  //       return parseFloat(a.totalTime) - parseFloat(b.totalTime);
  //     })
  //   );
  // };
  const setTime = (a) => {
    let time = new Date();
    let current = time.getHours() * 60 + time.getMinutes();
    let hour = parseInt((current - a) / 60);
    let minute = (current - a) % 60;
    return `${hour}시 ${minute}분`;
  };

  const ItemRender = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.list}>
        <Text style={styles.itemtime}>
          출발시간 :
          <Text
            style={
              item.Schedule === "운행시간 전 입니다."
                ? styles.itemtime2
                : styles.itemtime
            }
          >
            {item.Schedule}
          </Text>
        </Text>
        <View style={styles.path}>
          {item.PathType === 2 ? (
            <Icon size={50} name="bus-outline"></Icon>
          ) : (
            <Icon size={50} name="train-outline"></Icon>
          )}

          <Text>{item.Name}</Text>
        </View>
        <Text style={styles.fare}>요금 : {item.Fare.toLocaleString()}원</Text>
      </View>
    </TouchableOpacity>
  );
  // if (route.params.ttime <= 54020) {
  //   if (route.params.id === "화" || "수" || "목" || "금") {
  //     return (
  //       <View style={styles.footer}>
  //         <Button title="조건11-2-32" onPress={() => Alert.alert("셔틀버스")} />
  //       </View>
  //     );
  //   } else if (route.params.id === "월") {
  //     return (
  //       <View style={styles.footer}>
  //         <Button title="조건11-2-31" onPress={() => Alert.alert("셔틀버스")} />
  //       </View>
  //     );
  //   }
  // } else if (route.params.ttime <= 60020 && route.params.ttime >= 60000) {
  //   return (
  //     <View style={styles.footer}>
  //       <Button title="조건12-2" onPress={() => Alert.alert("셔틀버스")} />
  //     </View>
  //   );
  // }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            Getroute();
          }}
        >
          <Text style={styles.headertext}>
            <Icon name="chevron-back-outline" size={55}></Icon>
          </Text>
        </TouchableOpacity>
        <Text style={styles.headertext}>이동 목록</Text>
        <Menu
          visible={visible}
          anchor={
            <Text onPress={showMenu} style={styles.headertext}>
              <Icon name="menu-outline" size={55}></Icon>
            </Text>
          }
          onRequestClose={hideMenu}
        >
          <MenuItem
            onPress={() => {
              seta("빠른시간 순");
              setVisible(false);
            }}
          >
            빠른시간 순 {"    "}
            {a === "빠른시간 순" ? (
              <Icon name="checkmark-outline" size={20} />
            ) : (
              ""
            )}
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onPress={() => {
              seta("최저요금 순");
              setVisible(false);
            }}
          >
            최저요금 순{"    "}
            {a === "최저요금 순" ? (
              <Icon
                style={{ direction: "rtl" }}
                name="checkmark-outline"
                size={20}
              />
            ) : (
              ""
            )}
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onPress={() => {
              seta("최저환승 순");
              setVisible(false);
            }}
          >
            최저환승 순{"    "}
            {a === "최저환승 순" ? (
              <Icon
                style={{ direction: "rtl" }}
                name="checkmark-outline"
                size={20}
              />
            ) : (
              ""
            )}
          </MenuItem>
        </Menu>
      </View>
      <View style={styles.contents}>
        {Okay ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            extraData={data}
            data={data}
            renderItem={(itemData) => <ItemRender item={itemData.item} />}
          />
        ) : (
          <Text>데이터를 받아오고 있습니다.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Lists;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1f5fe",
  },
  header: {
    flex: 0.15,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headertext: {
    color: "black",
    fontWeight: "bold",
    fontSize: 40,
  },
  contents: {
    flex: 1.1,
    backgroundColor: "white",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  list: {
    justifyContent: "space-around",
    height: 100,
    borderColor: "#d3d3d3",
    borderStyle: "solid",
    borderBottomWidth: 2,
  },
  no: {},
  itemtime: {
    textAlign: "left",
    fontSize: 33,
  },
  itemtime2: {
    textAlign: "left",
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  path: {
    position: "absolute",
    right: 0,
    width: 100,
    alignItems: "center",
  },
  fare: {
    fontSize: 20,
  },
});