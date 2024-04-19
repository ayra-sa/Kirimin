import React from "react";
import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/solid";
import MapView, { Marker } from "react-native-maps";
import * as Progress from "react-native-progress";
import { useSelector, useDispatch } from "react-redux";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { selectRestaurant } from "../features/restaurantSlice";
import { resetBasket } from "../features/basketSlice";

const Delivery = () => {
  const navigate = useNavigation();
  const savedRestaurant = useSelector(selectRestaurant);
  const dispatch = useDispatch()

  const handleBackPress = () => {
    dispatch(resetBasket())
    navigate.push("Home")

    return true
  }

  React.useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  }, []);

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    return () => backHandler.remove()
  }, [])

  const backToHome = () => {
    dispatch(resetBasket())
    navigate.push("Home")
  }

  return (
    <SafeAreaView className="bg-teal-500 flex-1 pt-10">
      <ScrollView className="relative flex-1">
        <View className="flex-row items-center px-3 justify-between">
          <TouchableOpacity onPress={backToHome}>
            <XMarkIcon size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-white">Order Help</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white p-5 rounded-md mt-7 mx-3 relative -mb-12 z-10">
          <Text className="text-base text-neutral-500">Estimated Arrival</Text>
          <Text className="font-bold text-4xl mt-1 mb-3">30 - 35 Minutes</Text>

          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
        </View>

        <View>
          <MapView
            initialRegion={{
              latitude: savedRestaurant.lat,
              longitude: savedRestaurant.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{
              width: "100%",
              height: Dimensions.get("window").height,
            }}
            mapType="mutedStandard"
          >
            <Marker
              coordinate={{
                latitude: savedRestaurant.lat,
                longitude: savedRestaurant.long,
              }}
            />
          </MapView>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 z-20 w-full bg-white px-3 py-5 flex-row justify-between items-center">
        <View className="flex-row items-center gap-x-3">
          <UserCircleIcon size={40} fill="gray" />
          <View>
            <Text className="text-base font-semibold">Andi Dufrense</Text>
            <Text className="text-neutral-500">Your driver</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text className="text-teal-500 font-bold text-lg">Call</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Delivery;
