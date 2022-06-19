import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Button,
} from "react-native";

function Main({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appname}>한경대학교 </Text>
        <Text style={styles.appname}>출발시간 알림이</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Alarm")}
        >
          <Text style={styles.text}>알람 보기 ></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Input")}
        >
          <Text style={styles.text}>시간 선택 ></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Test")}
        >
          <Text style={styles.text}>sql test ></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  appname: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
    backgroundColor: "#d3d3d3",
    marginBottom: 40,
    borderRadius: 20,
    shadowOpacity: 2,
    shadowColor: "rgba(0,0,0,0.2)",
  },
  text: {
    fontSize: 40,
    color: "gray",
  },
});
