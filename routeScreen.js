import React, { Component, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function Routes({ route, navigation }) {
  const [day, setday] = useState("");
  const sorted = () => setday(day.sort);
  function addAlarm() {
    alert("알람이 저장되었습니다.");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headertext}>
            <Icon name="chevron-back-outline" size={55}></Icon>
          </Text>
        </TouchableOpacity>
        <Text style={styles.headertext}>이동 경로</Text>
        <TouchableOpacity onPress={() => addAlarm()}>
          <Text style={styles.headertext}>
            <Icon name="add-outline" size={50}></Icon>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contents}>
        <Text>{route.params.id}</Text>
        <Text>{route.params.ns}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Routes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1f5fe",
  },
  header: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  headertext: {
    fontSize: 40,
    fontWeight: "bold",
  },
  contents: {
    flex: 1.1,
    backgroundColor: "white",
  },
});