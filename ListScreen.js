import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

function Lists({ navigation, route }) {
  const [data, setdata] = useState([]);
  const [sortdata, setsortdata] = useState([]);
  useEffect(() => {
    db.transaction((tx) => {
      // 데이터 수정 및 추가 tx.executeSql(`update bye set time ='11:30' WHERE id = '50'`),
      // 레코드 삭제 tx.executeSql(`DELETE from home WHERE id = '1229'`);
      tx.executeSql(`select * from home`, [], (tx, result) => {
        let name = [];
        for (let i = 0; i < result.rows.length; ++i) {
          name.push(result.rows._array[i]);
        }
        setdata(name);
      });
    });
  }, []);

  useEffect(() => {
    setsortdata(sortdata);
  }, []);

  const sort_Array_Alphabetically = () => {
    setsortdata(
      data.sort(function (a, b) {
        return parseFloat(a.totalTime) - parseFloat(b.totalTime);
      })
    );
  };
  const setTime = (a) => {
    let time = new Date();
    let current = time.getHours() * 60 + time.getMinutes();
    let hour = parseInt((current - a) / 60);
    let minute = (current - a) % 60;
    return `${hour}시 ${minute}분`;
  };
  const ItemRender = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Route", {
          id: item.id,
          ns: route.params.id,
        })
      }
    >
      <SafeAreaView>
        <View style={styles.list}>
          <Text style={styles.itemtime}>
            도착시간 : {setTime(item.totalTime)}
          </Text>
          <View style={styles.path}>
            <Icon size={50} name="bus-outline"></Icon>
            <Text>{item.number}</Text>
          </View>
          <Text style={styles.fare}>요금 : {item.fare}원</Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
  if (route.params.ttime <= 54020) {
    if (route.params.id === "화" || "수" || "목" || "금") {
      return(
        <View style={styles.footer}>
          <Button
            title = "조건11-2-32"
            onPress = {() => Alert.alert("셔틀버스")}
          />
        </View>
      )
    } else if (route.params.id === "월") {
      return(
        <View style={styles.footer}>
          <Button
            title = "조건11-2-31"
            onPress = {() => Alert.alert("셔틀버스")}
          />
        </View>
      )
    }
  } else if (route.params.ttime <= 60020 && route.params.ttime >= 60000){
    return(
      <View style={styles.footer}>
        <Button
          title = "조건12-2"
          onPress = {() => Alert.alert("셔틀버스")}
        />
      </View>
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headertext}>
            <Icon name="chevron-back-outline" size={55}></Icon>
          </Text>
        </TouchableOpacity>
        <Text style={styles.headertext}>이동 목록</Text>
        <TouchableOpacity onPress={() => sort_Array_Alphabetically()}>
          <Text style={styles.headertext}>
            <Icon name="menu-outline" size={55}></Icon>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contents}>
        <FlatList
          keyExtractor={(item) => item.id}
          extraData={data}
          data={data}
          renderItem={(itemData) => <ItemRender item={itemData.item} />}
        />
      </View>
      <Text>{route.params.id}</Text>
    </SafeAreaView>
  );
}

function sutlebus(){
    if (route.params.id === "월") {
      return(
        <View>
          <Text style={styles.bustext}>bus bus bus</Text>
        </View>
      )
    } else {
      return(
        <View>
          <Text style={styles.bustext}>bus bus</Text>
        </View>
      )
    }
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
  itemtime: {
    textAlign: "left",
    fontSize: 33,
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

  bustext: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems:'center'
  },
  button: {
    alignItems: "center",
  },
  footer: {
    position: 'absolute',
    flex:0.3,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'green',
    flexDirection:'row',
    height:60,
    alignItems:'center',
  },

});