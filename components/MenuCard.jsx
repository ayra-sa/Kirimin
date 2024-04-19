import React from "react";
import { Image, Text, View, Pressable } from "react-native";
import { MinusSmallIcon, PlusSmallIcon } from "react-native-heroicons/solid";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  openBasket,
  removeFromBasket,
  removeItem,
} from "../features/basketSlice";
import PropTypes from "prop-types";
import { formatCurrency } from "../lib/formatCurrency";

const MenuCard = ({ id, menu, description, price, image }) => {
  const [quantity, setQuantity] = React.useState(0);
  const [isClicked, setIsClicked] = React.useState(false);

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    setQuantity((prev) => prev + 1);
    dispatch(openBasket());
    dispatch(addToBasket({ id, menu, price, image }));
  };

  const removeItemFromBasket = (itemId) => {
    setQuantity((prev) => prev - 1);
    dispatch(removeItem(itemId));
    if (quantity === 1) {
      dispatch(removeFromBasket(itemId))
    }
  };

  return (
    <Pressable className="border-b border-neutral-100 py-2 px-3">
      <View className="flex-row">
        <View className="w-[80%] pr-5">
          <Text className="text-base font-semibold">{menu}</Text>
          <Text className="my-1 text-neutral-500 text-sm">{description}</Text>
          <Text className="w-[80%] text-sm text-neutral-500">
            {formatCurrency(price)}
          </Text>
        </View>

        <View className="w-[20%] items-center justify-between flex-1">
          <Image source={{ uri: `${image}` }} className="w-full h-16" />

          <View className="mt-2">
            {isClicked ? (
              <View className="w-auto">
                <View className="flex-row items-center justify-center px-2 py-1 border border-neutral-400 rounded-full space-x-[6px]">
                  <Pressable
                    onPress={() => removeItemFromBasket(id)}
                    disabled={quantity === 0 ? true : false}
                  >
                    <MinusSmallIcon
                      fill={quantity === 0 ? "gray" : "green"}
                      size={18}
                    />
                  </Pressable>
                  <Text className="font-semibold">{quantity}</Text>
                  <Pressable onPress={addItemToBasket}>
                    <PlusSmallIcon fill="green" size={18} />
                  </Pressable>
                </View>
              </View>
            ) : (
              <Pressable
                className="border-2 border-teal-300 rounded-xl px-3 py-1"
                onPress={() => setIsClicked(!isClicked)}
              >
                <Text className="font-semibold">Add</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MenuCard;

MenuCard.propTypes = {
  id: PropTypes.string,
  menu: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.any,
};
