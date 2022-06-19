import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./MainScreen";
import Insert from "./TimeScreen";
import Alarm from "./AlarmScreen";
import Tests from "./testScreen";
import Lists from "./ListScreen";
import Routes from "./routeScreen";

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
          name="Test"
          component={Tests}
        />
        <Stack.Screen
          options={{ headerShown: false }} //
          name="List"
          component={Lists}
        />
        <Stack.Screen
          options={{ headerShown: false }} //
          name="Route"
          component={Routes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
