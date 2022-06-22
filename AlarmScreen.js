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
            <Icon name="arrow-back-circle-outline" size={50}></Icon>
            <Text style={styles.xxxtext}>{"\n"}back</Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.headertext}>알람 목록</Text>
        <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
          <Text style={styles.headertext}>
            <Icon name="menu-outline" size={55}></Icon>
            <Text style={styles.xxxtext}>{"\n"}menu</Text>
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
    backgroundColor: 'white',
  },
  header: {
    flex: 0.15,
    backgroundColor: "#e1f5fe",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  contents: {
    flex: 1.1,
  },
  headertext: {
    color: "#4fc3f7",
    fontWeight: "bold",
    fontSize: 40,
  },
  xxxtext: {
    color: "#b2ebf2",
    fontSize: 20
  }
});
