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

  function Shuttle({ route, lat1, lon1, jj1, jj2,sw1,sw2,kh1,kh2,js1,js2,bp1,bp2,dddd}) {
    lat1 = route.params.lat
    lon1 = route.params.long
    dddd = departtime.replace(":","")
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
//-----------------------------------------지제
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
//====수원
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
//====기흥
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
//====잠실
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
//====부평
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
//---------------------------------------------------
    
    if (dddd <= 920) {
      if (value === "화" || "수" || "목" || "금") {
        if (dist<10000 || dist2<10000 || dist3<10000 || dist4<10000 || dist5<10000){Alert.alert("셔틀 탑승가능!");}else {check(value)}
        
      } else if (value === "월") {
        if (dist<10000 || dist2<10000 || dist3<10000 || dist4<10000 || dist5<10000){Alert.alert("셔틀 탑승가능!");}else {check(value)}
      }else {check(value)}
    } else if (dddd <= 1020 && dddd >= 1000){
      if (dist<10000){Alert.alert("셔틀 탑승가능!");}else {check(value)}
    }else {check(value)}
  }

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
            onPress={() => Shuttle(value)}
          >
            <Text style={mode ? styles.comfirm : styles.comfirm2}>
              {mode ? "확인" : "데이터 수집 중"}
            </Text>
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