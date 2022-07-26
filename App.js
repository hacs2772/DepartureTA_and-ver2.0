import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./MainScreen";
import Insert from "./TimeScreen";
import Alarm from "./AlarmScreen";
import Lists from "./ListScreen";
import Shuttle from "./Shuttlebus";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="HOME"
          component={Main}
        />
        <Stack.Screen
          options={{ headerShown: false }} //
          name="Input"
          component={Insert}
        />
        <Stack.Screen
          options={{ headerShown: false }} //
          name="Alarm"
          component={Alarm}
        />
        <Stack.Screen
          options={{ headerShown: false }} //
          name="List"
          component={Lists}
        />
        <Stack.Screen
          options={{ headerShown: false }} //
          name="Shuttle"
          component={Shuttle}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}