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
import styled from 'styled-components';

const db = SQLite.openDatabase("db.db");
function Main({ navigation }) {
  const [lat, setlat] = useState(null);
  const [long, setlong] = useState(null);
  const Detail = styled.View'
    background-color : #0000ff;
    width : ${props => props.sizes.width};
    height : ${props => props.sizes.height};
  ';
  const [sizes,setSizes] = useState({
    sidth:'0px',
    height:'0px'
  });
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
          <Text>dd</Text>
        </View>
        <View>
            <Button title="더보기 창" onPress={changeView}/>
        </View>
        <View>
          <Detail sizes={sizes}>
            <Text>더보기 내용 추가</Text>
          </Detail>
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