import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

const CategoryCard = ({ image, title, id }) => {
  const navigate = useNavigation();

  return (
    <TouchableOpacity
      className="relative items-center"
      onPress={() => navigate.push("ByCategory", { title, image, id })}
    >
      <Image
        className="w-16 h-16 rounded-full"
        source={{ uri: `${image}` }}
        resizeMode="cover"
      />
      <Text className="font-bold tracking-wider mt-1 text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

CategoryCard.propTypes = {
  image: PropTypes.any,
  title: PropTypes.string,
  id: PropTypes.string,
};
