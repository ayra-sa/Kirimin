import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { Provider } from "react-redux";
import Restaurant from "./screens/Restaurant";
import React from 'react'
import { store } from "./store";
import Detail from "./screens/Detail";
import Delivery from "./screens/Delivery";
import PrepareOrder from "./screens/PrepareOrder";
import ByCategory from "./screens/ByCategory";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
          <Stack.Screen name="ByCategory" component={ByCategory} />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="PrepareOrder"
            component={PrepareOrder}
            options={{ presentation: "modal" }}
          />
          <Stack.Screen name="Delivery" component={Delivery} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
