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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("List")}>
          <Text style={styles.headertext}>
            <Icon name="arrow-back-circle-outline" size={40}></Icon>
          </Text>
        </TouchableOpacity>
        <Text style={styles.headertext}>이동 경로</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Input")}>
          <Text style={styles.headertext}>
            <Icon name="menu-outline" size={40}></Icon>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contents}>
        <Text>{route.params.id}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Routes;

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
  headertext: {
    color: "white",
    fontSize: 40,
  },
  contents: {
    flex: 1.1,
  },
});
