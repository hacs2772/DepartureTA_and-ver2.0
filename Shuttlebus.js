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

const db = SQLite.openDatabase("db.db");


function Shuttle({ route, lat1, lon1, jj1, jj2,sw1,sw2,kh1,kh2,js1,js2,bp1,bp2}) {
  lat1 = route.params.lat
  lon1 = route.params.long
  jj1 = 37.01948696495442
  jj2 = 127.07199207819473
  sw1 = 37.263721058834044
  sw2 = 127.00120063156379
  kh1 = 37.276218725427796
  kh2 = 127.11524583498772
  js1 = 37.51484899120726
  js2 = 127.10397255759656
  bp1 = 37.49100622257451
  bp2 = 126.72773855660245
    //----------------------------------------------지제↓
  if ((lat1 == jj1) && (lon1 == jj2))
    return 0;
    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * jj1 / 180;
    var theta = lon1 - jj2;
    var radTheta = Math.PI * theta / 180;
    var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1)
        dist = 1;

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;
    if (dist < 10000){
      if (route.params.ttime <= 54020) {
        if (route.params.id === "화" || "수" || "목" || "금") {
          return (
            <View style={styles.footer}>
            <Button title="조건11-2-32 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />  
          </View>
          );
        } else if (route.params.id === "월") {
          return (
            <View style={styles.footer}>
              <Button title="조건11-2-31 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />
            </View>
          );
        }
      } else if (route.params.ttime <= 60020 && route.params.ttime >= 60000) {
        return (
          <View style={styles.footer}>
            <Button title="조건12-2 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />
          </View>
        );
      }
    }
    //----------------------------------------------수원↓
  if ((lat1 == sw1) && (lon1 == sw2))
    return 0;  
    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * sw1 / 180;
    var theta = lon1 - sw2;
    var radTheta = Math.PI * theta / 180;
    var dist2 = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist2 > 1)
        dist2 = 1;

    dist2 = Math.acos(dist2);
    dist2 = dist2 * 180 / Math.PI;
    dist2 = dist2 * 60 * 1.1515 * 1.609344 * 1000;
    if (dist2 < 100) dist2 = Math.round(dist2 / 10) * 10;
    else dist2 = Math.round(dist2 / 100) * 100;
    if (dist2 < 10000){
      if (route.params.ttime <= 54020) {
        if (route.params.id === "화" || "수" || "목" || "금") {
          return (
            <View style={styles.footer}>
            <Button title="조건11-2-32 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />  
          </View>
          );
        } else if (route.params.id === "월") {
          return (
            <View style={styles.footer}>
              <Button title="조건11-2-31 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />
            </View>
          );
        }
      } else if (route.params.ttime <= 60020 && route.params.ttime >= 60000) {
        return (
          <View style={styles.footer}>
            <Button title="조건12-2 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />
          </View>
        );
      }
    }
    //----------------------------------------------기흥↓
  if ((lat1 == kh1) && (lon1 == kh2))
    return 0;
    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * kh1 / 180;
    var theta = lon1 - kh2;
    var radTheta = Math.PI * theta / 180;
    var dist3 = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist3 > 1)
        dist3 = 1;

    dist3 = Math.acos(dist3);
    dist3 = dist3 * 180 / Math.PI;
    dist3 = dist3 * 60 * 1.1515 * 1.609344 * 1000;
    if (dist3 < 100) dist3 = Math.round(dist3 / 10) * 10;
    else dist3 = Math.round(dist3 / 100) * 100;
    if (dist3 < 10000){
      if (route.params.ttime <= 54020) {
        if (route.params.id === "화" || "수" || "목" || "금") {
          return (
            <View style={styles.footer}>
            <Button title="조건11-2-32 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />  
          </View>
          );
        } else if (route.params.id === "월") {
          return (
            <View style={styles.footer}>
              <Button title="조건11-2-31 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />
            </View>
          );
        }
      } else if (route.params.ttime <= 60020 && route.params.ttime >= 60000) {
        return (
          <View style={styles.footer}>
            <Button title="조건12-2 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />
          </View>
        );
      }
    }
    //----------------------------------------------잠실↓
  if ((lat1 == js1) && (lon1 == js2))
    return 0;
    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * js1 / 180;
    var theta = lon1 - js2;
    var radTheta = Math.PI * theta / 180;
    var dist4 = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist4 > 1)
        dist4 = 1;

    dist4 = Math.acos(dist4);
    dist4 = dist4 * 180 / Math.PI;
    dist4 = dist4 * 60 * 1.1515 * 1.609344 * 1000;
    if (dist4 < 100) dist4 = Math.round(dist4 / 10) * 10;
    else dist4 = Math.round(dist4 / 100) * 100;
    if (dist4 < 10000){
      if (route.params.ttime <= 54020) {
        if (route.params.id === "화" || "수" || "목" || "금") {
          return (
            <View style={styles.footer}>
            <Button title="조건11-2-32 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />  
          </View>
          );
        } else if (route.params.id === "월") {
          return (
            <View style={styles.footer}>
              <Button title="조건11-2-31 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />
            </View>
          );
        }
      } else if (route.params.ttime <= 60020 && route.params.ttime >= 60000) {
        return (
          <View style={styles.footer}>
            <Button title="조건12-2 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />
          </View>
        );
      }
    }
    //----------------------------------------------부평↓
  if ((lat1 == bp1) && (lon1 == bp2))
    return 0;
    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * bp1 / 180;
    var theta = lon1 - bp2;
    var radTheta = Math.PI * theta / 180;
    var dist5 = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist5 > 1)
        dist5 = 1;

    dist5 = Math.acos(dist5);
    dist5 = dist5 * 180 / Math.PI;
    dist5 = dist5 * 60 * 1.1515 * 1.609344 * 1000;
    if (dist5 < 100) dist5 = Math.round(dist5 / 10) * 10;
    else dist5 = Math.round(dist5 / 100) * 100;
    if (dist5 < 10000){
      if (route.params.ttime <= 54020) {
        if (route.params.id === "화" || "수" || "목" || "금") {
          return (
            <View style={styles.footer}>
            <Button title="조건11-2-32 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />  
          </View>
          );
        } else if (route.params.id === "월") {
          return (
            <View style={styles.footer}>
              <Button title="조건11-2-31 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />
            </View>
          );
        }
      } else if (route.params.ttime <= 60020 && route.params.ttime >= 60000) {
        return (
          <View style={styles.footer}>
            <Button title="조건12-2 / 셔틀버스+기타 이동수단 붙여야함" onPress={() => Alert.alert("셔틀버스")} />
          </View>
        );
      }
    }
//-----------------------------------------------------------끝
}
export default Shuttle;



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