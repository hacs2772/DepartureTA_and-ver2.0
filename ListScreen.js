import React, { useState, useEffect } from "react";
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

function Lists({ navigation }) {
  const [DATA, set_DATA] = useState([]);

  const list_Items = ["안녕", "잘가", "바이", "헬로", "Hi", "Bye", "Cick", "D"];

  useEffect(() => {
    set_DATA(list_Items);
  }, []);

  const sort_Array_Alphabetically = () => {
    set_DATA(list_Items.sort());
  };

  const ItemRender = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Route", {
          id: item,
        })
      }
    >
      <View style={{ padding: 12 }}>
        <Text> {item} </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Input")}>
          <Text style={styles.headertext}>
            <Icon name="arrow-back-circle-outline" size={40}></Icon>
          </Text>
        </TouchableOpacity>
        <Text style={styles.headertext}>이동 목록</Text>
        <TouchableOpacity onPress={() => sort_Array_Alphabetically()}>
          <Text style={styles.headertext}>
            <Icon name="menu-outline" size={40}></Icon>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contents}>
        <FlatList
          keyExtractor={(itemData) => itemData.toString()}
          extraData={DATA}
          data={DATA}
          renderItem={(itemData) => <ItemRender item={itemData.item} />}
        />
      </View>
    </SafeAreaView>
  );
}

export default Lists;
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  listitems: {
    borderColor: "black",
    borderStyle: "solid",
    borderBottomWidth: 2,
  },
});
