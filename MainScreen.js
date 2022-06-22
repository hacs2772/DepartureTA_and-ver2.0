import React, { Component } from "react";
let hknurogo = require('./hknurogo.jpg');
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

function Main({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <ImageBackground source={require("./rogo1.jpg")} style={styles.bgImage}>
        <View style={styles.header}></View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Alarm")}
        >
          <Text style={styles.text1}>알람 보기 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Input")}
        >
          <Text style={styles.text2}>시간 선택 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Test")}
        >
          <Text style={styles.text3}>sql test </Text>
        </TouchableOpacity>
      </View>
        </ImageBackground>
      </View>
      
    </SafeAreaView>
  );
}

export default Main;

const styles = StyleSheet.create({
  header: {flex:1},
  bgImage: {width: '100%', height: '100%'},
  container: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fef08a',
  },
  appname: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 0,
  },
  footer: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
    backgroundColor: "#ffebee",
    marginBottom: 25,
    borderRadius: 30,
    shadowOpacity: 3,
    shadowColor: "rgba(0,0,0,0.2)",
  },
  text1: {
    fontSize: 30,
    color: "#ef5350",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 30,
    color: "#4aa9ff",
    fontWeight: "bold",
  },
  text3: {
    fontSize: 30,
    color: "#ff8f00",
    fontWeight: "bold",
  },
});
