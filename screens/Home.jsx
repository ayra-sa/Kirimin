import React from "react";
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserCircleIcon, ChevronDownIcon } from "react-native-heroicons/solid";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import SectionRow from "../components/SectionRow";
import sanity from "../kirimin-project/client";
import useBackButtonHandler from "../lib/useBackButtonHandler";

const Home = () => {
  const navigation = useNavigation();
  const [nearestRestaurant, setNearestRestaurant] = React.useState([]);
  const [newRestaurant, setNewRestaurant] = React.useState([]);
  const [recommendationRestaurant, setRecommendationRestaurant] =
    React.useState([]);
  useBackButtonHandler()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  React.useEffect(() => {
    sanity
      .fetch(
        `*[_type == "nearest"] {
          restaurant_of_choice[]-> {
            _id,
            "name": restaurant_name,
            "imageUrl": image.asset->url,
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
          }
        }`
      )
      .then((data) => setNearestRestaurant(data));
  }, []);

  React.useEffect(() => {
    sanity
      .fetch(
        `*[_type == "new_restaurant"] {
          restaurant_of_choice[]-> {
            _id,
            "name": restaurant_name,
            "imageUrl": image.asset->url,
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
          }
        }`
      )
      .then((data) => setNewRestaurant(data));
  }, []);

  React.useEffect(() => {
    sanity
      .fetch(
        `*[_type == "recommendation"] {
          restaurant_of_choice[]-> {
            _id,
            "name": restaurant_name,
            "imageUrl": image.asset->url,
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
          }
        }`
      )
      .then((data) => setRecommendationRestaurant(data));
  }, []);

  // console.log(recommendationRestaurant[0]?.restaurant_of_choice, "as");

  return (
    <SafeAreaView className="bg-white pt-10 pb-5">
      <View className="flex-row gap-x-3 items-center justify-between mb-5 px-2">
        <View className="w-8 h-8 rounded-full border border-neutral-300" />
        <View className="flex-1">
          <Text>Deliver Now!</Text>
          <View className="flex-row items-center gap-x-2">
            <Text className="font-bold text-lg">Current Location</Text>
            <ChevronDownIcon size={16} fill="black" />
          </View>
        </View>
        <UserCircleIcon size={40} fill="blue" />
      </View>

      <SearchBar />
      <ScrollView
        className="mt-3 bg-neutral-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Categories />
        {recommendationRestaurant[0] ? (
          <SectionRow
            title="Rekomendasi"
            data={recommendationRestaurant[0].restaurant_of_choice}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}

        {nearestRestaurant[0] ? (
          <SectionRow
            title="Coba Restoran terdekat"
            data={nearestRestaurant[0].restaurant_of_choice}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}

        {newRestaurant[0] ? (
          <SectionRow
            title="Restoran baru"
            data={newRestaurant[0].restaurant_of_choice}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
