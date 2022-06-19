import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function Alarm({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
          <Text style={styles.headertext}>
            <Icon name="arrow-back-circle-outline" size={40}></Icon>
          </Text>
        </TouchableOpacity>
        <Text style={styles.headertext}>알람 목록</Text>
        <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
          <Text style={styles.headertext}>
            <Icon name="menu-outline" size={40}></Icon>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contents}></View>
    </SafeAreaView>
  );
}

export default Alarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.15,
    backgroundColor: "#2c2c2c",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  contents: {
    flex: 1.1,
  },
  headertext: {
    color: "white",
    fontSize: 40,
  },
});
