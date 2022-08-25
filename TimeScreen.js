import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Getroute from "./getroute";
import OutTime from "./OutTime";
import InTime from "./InTime";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

function Insert({ navigation, route }) {
  async function T() {
    let t = await Getroute(route.params.lat, route.params.long);
    setmode(t);
  }
  useEffect(() => {
    T();
  }, []);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "월", value: "월", selected: true },
    { label: "화", value: "화" },
    { label: "수", value: "수" },
    { label: "목", value: "목" },
    { label: "금", value: "금" },
    { label: "토", value: "토" },
    { label: "일", value: "일" },
  ]);

  const [mode, setmode] = useState(false);
  const [date, onChangeDate] = useState(new Date(0));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.log("A date has been picked: ", time);

    onChangeDate(time);
    hideDatePicker();
  };
  function check(value) {
    if (value) {
      let a = departtime.split(":");
      let dtime = Number(a[0] * 60) + Number(a[1]);
      // InTime(value, dtime);
      console.log(value, dtime,lat,long);
      navigation.navigate("List", {
        id: value,
        ttime: Number(dtime),
      });

      // OutTime(value, dtime);
    } else {
      Alert.alert("요일을 입력해 주세요!");
    }
  }
  let departtime = format(new Date(date), "HH:mm");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("./logo.png")}
          style={{ width: "100%", height: "100%", justifyContent: "center" }}
          resizeMode="cover"
        ></Image>
      </View>
      <View style={styles.content}>
        <View style={styles.input}>
          <Text style={styles.text}>요일</Text>
          <DropDownPicker
            style={styles.picker}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={{
              marginLeft: 5,
              width: 290,
            }}
            labelStyle={{ fontSize: 30 }}
            placeholder="요일을 선택하세요!"
            placeholderStyle={{
              fontSize: 30,
            }}
            autoScroll={true}
            zIndex={10000}
            textStyle={{
              fontSize: 40,
              alignContent: "center",
            }}
            listMode="MODAL"
            modalTitle="요일 선택"
            modalContentContainerStyle={{
              width: "100%",
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: "black",
              backgroundColor: "#e1f5fe",
            }}
            modalProps={{
              animationType: "slide",
            }}
            listItemContainerStyle={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              width: "100%",
              fontSize: 40,
              backgroundColor: "white",
            }}
            selectedItemContainerStyle={{
              width: "100%",
              backgroundColor: "#f2f2f2",
            }}
            itemSeparator={true}
          />
          <Text style={styles.text}>시간</Text>
          <TouchableOpacity style={styles.viewtime} onPress={showDatePicker}>
            <Text style={styles.time}>{departtime}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={date}
            isDarkModeEnabled={true}
          />
          <TouchableOpacity
            disabled={mode ? false : true}
            style={mode ? styles.button : styles.button2}
            onPress={() => check(value)}
          >
            <Text style={mode ? styles.comfirm : styles.comfirm2}>
              {mode ? "확인" : "데이터 수집 중"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Shuttle", {lat: route.params.lat, long: route.params.long, id : route.params.id ,
                  });
              }}
            >
              <Text style={styles.shuttletext}>셔틀 버스</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Insert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  header: {
    flex: 0.9,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
  headertext: {
    color: "black",
    fontWeight: "bold",
    fontSize: 40,
  },

  content: {
    flex: 0.8,
    display: "flex",
    alignItems: "center",
  },
  input: {
    display: "flex",
    width: 300,
    height: 350,
    backgroundColor: "white",
    marginTop: 30,
    justifyContent: "flex-start",
    borderRadius: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  button: {
    display: "flex",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 290,
    left: 5,
    height: 50,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.4,
    borderRadius: 25,
  },
  button2: {
    display: "flex",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 50,
    backgroundColor: "#f5f5f5",
    borderColor: "#f0f0f0",
    borderWidth: 1,
    borderRadius: 15,
  },
  comfirm2: {
    fontSize: 30,
    fontWeight: "bold",
    color: "gray",
  },
  comfirm: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0000a0",
  },
  viewtime: {
    marginLeft: 5,
    borderRadius: 3,
    borderStyle: "solid",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 290,
  },
  time: {
    fontSize: 25,
  },
  picker: {
    marginBottom: 38,
    alignItems: "center",
  },
  shuttletext: {
    fontSize: 30,
    fontWeight: "bold",
  },
});