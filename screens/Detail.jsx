import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/solid";
import FoodOrderCard from "../components/FoodOrderCard";
import { formatCurrency } from "../lib/formatCurrency";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../features/basketSlice";
import { selectRestaurant } from "../features/restaurantSlice";

const Detail = () => {
  const navigate = useNavigation();

  React.useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  }, []);

  const savedDish = useSelector(selectBasketItems);
  const savedRestaurant = useSelector(selectRestaurant)
  const totalPrice = savedDish.reduce((tot, item) => tot + item.price * item.quantity, 0)

  const costDeliverey = 2000

  return (
    <SafeAreaView className="bg-gray-200 relative flex-1">
      <ScrollView>
        <View className="items-center pt-12 pb-5 relative bg-white border-b border-blue-500">
          <Text className="font-bold mb-1 text-xl">Your Orders</Text>
          <Text className="text-neutral-500 text-center">{savedRestaurant?.restaurantName}</Text>

          <Pressable className="absolute top-8 right-5 bg-blue-500 rounded-full p-1" onPress={() => navigate.push("Home")}>
            <XMarkIcon fill="white" size={27} />
          </Pressable>
        </View>

        <View className="my-5 flex-row justify-between bg-white px-3 py-4">
          <Text>Deliver in 40-50 min</Text>
          <TouchableOpacity>
            <Text className="text-blue-400">Change</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          {savedDish.map((item, id) => (
            <FoodOrderCard key={id} menu={item.menu} price={item.price} image={item.image} quantity={item.quantity} />
          ))}
        </View>
      </ScrollView>
      <View className="bg-white absolute w-full bottom-0 px-3 py-4 space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-400">SubTotal</Text>
          <Text className="text-gray-400">{formatCurrency(totalPrice)}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-400 text-xs">Delivery fee</Text>
          <Text className="text-gray-400 text-xs">{formatCurrency(costDeliverey)}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="font-bold">Order total</Text>
          <Text className="font-bold">{formatCurrency(totalPrice + costDeliverey)}</Text>
        </View>
        <TouchableOpacity className="w-full bg-green-400 py-2 rounded-md" onPress={() => navigate.push("PrepareOrder")}>
          <Text className="text-center text-white font-bold text-lg">Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
