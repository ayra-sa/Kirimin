import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

const FoodCard = ({ restaurantName, image, rating, address, dishes, description, lat, long }) => {
  const navigate = useNavigation();

  return (
    <Pressable
      className="w-36"
      onPress={() =>
        navigate.push("Restaurant", {
          restaurantName,
          rating,
          image,
          address,
          dishes,
          description,
          lat,
          long
        })
      }
    >
      <Image
        source={{ uri: `${image}` }}
        className="w-full h-32 mb-3 rounded-md"
        resizeMode="cover"
      />

      <Text className="truncate" ellipsizeMode="tail" numberOfLines={2}>
        {restaurantName}
      </Text>
      <View className="flex flex-row gap-x-2 items-center mt-2">
        <Text className="text-xs">3.4 km</Text>
        <View className="w-1 h-1 bg-neutral-900 rounded-full" />
        <View className="flex flex-row items-center teyello5 gap-x-1">
          <StarIcon size={15} fill="rgb(234 179 8)" />
          <Text className="text-xs">{rating}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default FoodCard;

FoodCard.propTypes = {
  // id: PropTypes.string,
  restaurantName: PropTypes.string,
  image: PropTypes.any,
  rating: PropTypes.number,
  address: PropTypes.string,
  description: PropTypes.string,
  dishes: PropTypes.array,
  lat: PropTypes.number,
  long: PropTypes.number,
};
