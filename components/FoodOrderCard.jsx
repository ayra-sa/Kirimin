import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "../lib/formatCurrency";

const FoodOrderCard = ({menu, price, image, quantity}) => {
  return (
    <View className="flex-row items-center justify-between px-3 py-4 border-b border-neutral-100">
      <View className="flex-row gap-x-2 flex-1 items-center">
        <Text className="text-blue-400">{quantity} x</Text>
        <Image
          source={{ uri: `${image}` }}
          className="w-10 h-10 rounded-xl"
        />
        <Text className="font-medium">{menu}</Text>
      </View>

      <View className="flex-row flex-1 justify-end items-center gap-x-1">
        <Text className="text-xs">{formatCurrency(price * quantity)}</Text>
        <TouchableOpacity>
          <Text className="text-xs text-blue-400">Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodOrderCard;
