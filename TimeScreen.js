import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import Icon from "react-native-vector-icons/Ionicons";
function Insert({ navigation }) {
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

  const [mode, setmode] = useState("date");
  const [date, onChangeDate] = useState(new Date(0));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setmode("time");
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.warn("A date has been picked: ", time);
    onChangeDate(time);
    hideDatePicker();
  };
  function check() {
    if (value) {
      let a = departtime.split(":");
      let dtime = a[0] * 60 + a[1];
      navigation.navigate("List", {
        id: value,
        ttime: dtime,
      });
    } else {
      alert("요일을 선택하세요!");
    }
  }
  let departtime = format(new Date(date), "HH:mm");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("./logo.png")}
          style={{ width: 300, height: 300, justifyContent: "center" }}
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
          <TouchableOpacity style={styles.button} onPress={() => check()}>
            <Text style={styles.comfirm}>확인</Text>
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
    backgroundColor: "#e1f5fe",
  },
  header: {
    flex: 0.8,
    alignItems: "center",
    backgroundColor: "white",
  },
  headertext: {
    color: "black",
    fontWeight: "bold",
    fontSize: 40,
  },

  content: {
    flex: 1.1,
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 350,
    backgroundColor: "white",
    marginTop: 20,
    justifyContent: "flex-start",
    borderRadius: 30,
  },
  text: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  button: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 50,
    backgroundColor: "white",
    borderTopColor: "gray",
    borderTopWidth: 1,
    borderRadius: 30,
  },
  comfirm: {
    fontSize: 30,
    fontWeight: "bold",
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
    marginBottom: 50,
    alignItems: "center",
  },
});