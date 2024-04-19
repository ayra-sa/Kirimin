import React from "react";
import { Pressable, Text, View } from "react-native";
import {useNavigation} from '@react-navigation/native'
import { useSelector } from "react-redux";
import { selectBasketItems } from "../features/basketSlice";
import { formatCurrency } from "../lib/formatCurrency";

const Basket = () => {
  const navigation = useNavigation()
  const savedDish = useSelector(selectBasketItems);

  const totalQuantity = savedDish.reduce((tot, item) => tot + item.quantity, 0)

  const totalPrice = savedDish.reduce((tot, item) => tot + item.price * item.quantity, 0)

  return (
    <View className="fixed h-14 w-full bg-white flex flex-col place-content-center items-center justify-center px-3">
      <Pressable className="bg-green-500 w-full rounded-sm px-4 py-2 shadow-md" onPress={() => navigation.push("Detail")}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-2">
            <Text className="text-white font-semibold">Basket</Text>
            <View className="w-1 h-1 bg-white rounded-full" />
            <Text className="text-white">{totalQuantity} Item</Text>
          </View>
          <Text className="text-white font-semibold">{formatCurrency(totalPrice)}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Basket;
