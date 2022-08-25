import React, { Component, useEffect, useState } from "react";
let hknurogo = require("./hknurogo.jpg");
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { Alert } from "react-native";
import * as SQLite from "expo-sqlite";
import * as Location from "expo-location";
import Getroute from "./getroute";
import { ScrollView,} from 'react-native';

const db = SQLite.openDatabase("db.db");
function Main({ navigation }) {
  const [lat, setlat] = useState(null);
  const [long, setlong] = useState(null);
  
  const [line, setLine] = useState(2);
const [isActivated, setIsActivated] = useState(false);

const handleLine = () => {
    isActivated ? setLine(2) : setLine(Number.MAX_SAFE_INTEGER);
    setIsActivated(prev => !prev);
  }



  db.transaction((tx) => {
    tx.executeSql(`DELETE from user`);
  });
  useEffect(() => {
    const getLocation = async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        setlat(latitude);
        setlong(longitude);
        // console.log("location", location[0].city);
        // db.transaction((tx) => {
        //   tx.executeSql(
        //     `insert into user (id, lat, long, region) values('1','${latitude}','${longitude}','${location[0].city}')`
        //   );
        // });

        // db.transaction((tx) => {
        //   tx.executeSql(`select * from user`, [], (tx, result) => {
        //     console.log(result.rows._array[0].long, result.rows._array[0].lat);
        //   });
        // });
      } catch (error) {
        Alert.alert("위치정보 확인을 허용해주세요!");
      }
    };
    getLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row, styles.header]}>
      <ScrollView>
      <Text numberOfLines={line} ellipsizeMode="tail" onPress={()=>handleLine()}> 
        dfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      </Text>
      <Text numberOfLines={line} ellipsizeMode="tail" onPress={() => setElementVisible(!elementVisible)}> 
        gkgkgkgkggkkfvlksvlnxlnkvdsㅣㄴㅇㅁ이ㅏ푸미ㅏㄴ퓌ㅏㅊㅏ;ㅜ니ㅏㅁ푸이ㅏㅍ;ㅟㅏㄴ무리ㅏㅜ피ㅏ챁쿠피;누이ㅏㅜ피ㅏ누마ㅣㅍㄴㅇㄹㄴㅁㅇㄻㄴㅇㅍㅊ터카피뉴파ㅓㅠㅠㅣㅠㄴㅁ아ㅓ퓨ㅏㅓㄴ뮹파ㅓㅣㅠ나ㅓ유파ㅓㅠㅌ차ㅓㅣ큐파ㅓㅣㅠㄴ파ㅓㅣㅠㅌ차커ㅣ퓨ㅣㅏㅓㅌ큐처ㅏ피ㅠ
      </Text>
      </ScrollView>
        <View style={styles.header}>
          <Image style={styles.image} source={require("./logo.png")}></Image>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Alarm")}
          >
            <Text style={styles.text1}>Schedule</Text>
          </TouchableOpacity>
          {long === null ? (
            <Text style={styles.text}>위치정보를 확인 중...</Text>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Input", {lat: lat, long: long,
                });
              }}
            >
              <Text style={styles.text1}>시간 선택</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Main;

const styles = StyleSheet.create({
  header: { flex: 1, marginBottom: 10 },
  image: {
    width: "100%",
    height: "100%",
  },
  ddddd: {
    height: 0,
    width: 0,
  },

  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  appname: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 0,
  },
  footer: {
    display: "flex",
    marginTop: 20,
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 70,
    backgroundColor: "#f5f5f5",
    marginBottom: 25,
    borderColor: "black",
    borderRadius: 30,
    shadowOpacity: 1,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 5, height: 10 },
  },
  text1: {
    fontSize: 42,
    fontWeight: "bold",
  },
  text: {
    fontSize: 40,
    color: "black",
    textDecorationLine: "underline",
  },
});