import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";

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
      navigation.navigate("List", {
        id: value,
        ttime: helpee,
      });
    } else {
      alert("요일을 선택하세요!");
    }
  }
  let helpee = format(new Date(date), "p", { locale: ko });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appname}>한경대학교 </Text>
        <Text style={styles.appname}>출발시간 알림이</Text>
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
            searchable={true}
            labelStyle={{ fontSize: 30 }}
            placeholder="요일을 선택하세요!"
          />
          <Text style={styles.text}>시간</Text>

          <TouchableOpacity style={styles.viewtime} onPress={showDatePicker}>
            <Text style={styles.time}>{helpee}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={mode}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={date}
            isDarkModeEnabled={true}
          />

          <View style={styles.button}>
            <TouchableOpacity onPress={() => check()}>
              <Text style={styles.comfirm}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Insert;

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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#a9a9a9",
  },
  input: {
    marginTop: 30,
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.7,
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 25,
    color: "#949494",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: "red",
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderStyle: "solid",
    borderTopWidth: 2,
  },
  comfirm: {
    fontSize: 30,
    color: "#4682b4",
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
