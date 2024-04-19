import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import FoodCard from "./FoodCard";
import { ArrowSmallRightIcon } from "react-native-heroicons/solid";
import PropTypes from "prop-types";

const SectionRow = ({ title, data }) => {
  return (
    <ScrollView contentContainerStyle={{ marginVertical: 20 }}>
      <View className="flex flex-row items-center gap-x-2 mb-3 px-3">
        <Text className="font-semibold text-xl">{title}</Text>
        <ArrowSmallRightIcon color="black" size={18} />
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <FoodCard
            key={item._id}
            // id={item._id}
            restaurantName={item.name}
            image={item.imageUrl}
            rating={item.rating}
            address={item.address}
            dishes={item.dishes}
            description={item.description}
            lat={item.lat}
            long={item.long}
          />
        )}
        keyExtractor={(item) => item._id}
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 12 }}
      />
    </ScrollView>
  );
};

export default SectionRow;

SectionRow.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};
