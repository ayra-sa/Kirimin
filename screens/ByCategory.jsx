import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import sanity from "../kirimin-project/client";
import { ArrowLeftIcon, StarIcon } from "react-native-heroicons/solid";

const ByCategory = () => {
  const navigate = useNavigation();
  const {
    params: { title, image, id },
  } = useRoute();

  const [categoryId, setCategoryId] = React.useState([]);
  const [restaurants, setRestaurants] = React.useState([]);

  React.useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  }, []);

  React.useEffect(() => {
    sanity
      .fetch(
        `*[_type=="category" && _id == "${id}"] {
          _id
        }`
      )
      .then((data) => setCategoryId(data[0]._id));
  }, []);

  React.useEffect(() => {
    sanity
      .fetch(
        `*[_type=="restaurant" && type._ref == "${categoryId}"] {
          "image": image.asset->url,
          "restaurantName": restaurant_name,
          rating,
          address,
          description,
          lat,
          long,
          dishes[]-> {
            _id,
            name,
            price,
            description,
            "imageUrl": image.asset->url,
          }
        }`
      )
      .then((data) => setRestaurants(data));
  }, [categoryId]);

  return (
    <SafeAreaView className="bg-gray-200 relative flex-1 pt-10">
      <ScrollView>
        <Image
          source={{ uri: `${image}` }}
          className="w-full h-48"
          resizeMode="cover"
        />

        <Pressable
          className="absolute top-9 left-5 w-10 h-10 bg-white rounded-full shadow-xl place-content-center items-center justify-center"
          onPress={() => navigate.navigate("Home")}
        >
          <ArrowLeftIcon fill="black" />
        </Pressable>
        <View className="py-5 px-3 bg-white">
          <Text>Category : {title}</Text>

          <View className="mt-6 w-full">
            {restaurants.length === 0 ? <ActivityIndicator /> : null}
            {restaurants.map((item, id) => (
              <Pressable
                key={id}
                className="flex-row mb-3 w-full items-start gap-x-2"
                onPress={() => navigate.push("Restaurant", item)}
              >
                <Image
                  source={{ uri: `${item.image}` }}
                  className="w-20 h-20 rounded-md"
                  resizeMode="cover"
                />
                <View className="w-full">
                  <Text
                    className="font-semibold flex-1 flex-wrap pr-20"
                    ellipsizeMode="tail"
                    numberOfLines={2}
                  >
                    {item.restaurantName}
                  </Text>

                  <View className="flex-row mt-1 items-start gap-x-2">
                    <View className="flex-row items-center gap-x-1">
                      <StarIcon size={12} fill="yellow" />
                      <Text className="text-xs">{item.rating}</Text>
                    </View>

                    <Text
                      className="text-xs max-w-[70%]"
                      ellipsizeMode="tail"
                      numberOfLines={1}
                    >
                      {item.address}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ByCategory;
