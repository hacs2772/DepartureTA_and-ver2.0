import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

function Alarm({ navigation }) {
  let [data, setdata] = useState([]);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from home where day is not null`,
        [],
        (tx, result) => {
          let name = [];
          for (let i = 0; i < result.rows.length; ++i) {
            name.push(result.rows._array[i]);
            console.log(result.rows.item(i));
          }
          setdata(name);
        }
      );
    });
  }, []);
  const goTime = (a) => {
    let time = new Date();
    let current = time.getHours() * 60 + time.getMinutes();
    let hour = parseInt((current - a) / 60);
    let minute = (current - a) % 60;
    return `${hour}시 ${minute}분`;
  };
  const getTime = (b) => {
    let time = new Date();
    let current = time.getHours() * 60 + time.getMinutes() + b;
    let hour = parseInt(current / 60);
    let minute = current % 60;
    if (hour >= 24) {
      hour = Math.abs(hour - 24);
    }
    return `${hour}시 ${minute}분`;
  };
  function modify() {}
  const ItemRender = ({ item }) => (
    <SafeAreaView>
      <TouchableOpacity onPress={() => modify(setVisibile(true))}>
        <View style={styles.list}>
          <View style={styles.day}>
            <Text
              style={{
                fontSize: 35,
                textAlign: "center",
                lineHeight: 80,
                color: "gray",
                fontWeight: "bold",
              }}
            >
              {item.day}
            </Text>
          </View>
          <View style={styles.time}>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              출발시간 : {goTime(item.totalTime)}
            </Text>
            <Text
              style={{ fontSize: 26, fontWeight: "bold", marginBottom: 10 }}
            >
              도착시간 : {getTime(item.totalTime)}
            </Text>
            <Text style={{ fontSize: 18 }}>
              요금:{item.fare.toLocaleString()}원
            </Text>
          </View>

          <View style={styles.path}>
            <Icon size={50} name="bus-outline"></Icon>
            <Text>{item.number}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
  const [isVisible, setVisibile] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
          <Text style={styles.headertext}>
            <Icon name="chevron-back-outline" size={55}></Icon>
          </Text>
        </TouchableOpacity>
        <Text style={styles.headertext}>알람 목록</Text>

        <Text style={styles.headertext}>
          <Icon name="menu-outline" size={55} color="#e1f5fe"></Icon>
        </Text>
      </View>
      <View style={styles.contents}>
        <Modal animationType="fade" transparent={true} visible={isVisible}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f2f2f2",
              height: "100%",
              opacity: 0.5,
              borderWidth: 1,
              borderColor: "#ccc",
              elevation: 20,
            }}
          >
            <Button title="수정"></Button>
            <Button title="close" onPress={() => setVisibile(false)}></Button>
          </View>
        </Modal>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ItemRender item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

export default Alarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#e1f5fe",
  },
  header: {
    flex: 0.15,
    display: "flex",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  contents: {
    flex: 1.1,
    display: "flex",
    backgroundColor: "white",
  },
  headertext: {
    fontWeight: "bold",
    fontSize: 40,
  },
  list: {
    height: 100,
    display: "flex",
    borderColor: "#fefce8",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  path: {
    position: "absolute",
    right: 0,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  day: {
    justifyContent: "center",
    position: "absolute",
    width: 80,
    height: 98,
    backgroundColor: "#f2f2f2",
  },
  time: {
    position: "absolute",
    right: 95,
    alignItems: "flex-start",
    height: 100,
  },
});