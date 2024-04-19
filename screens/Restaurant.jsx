import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  StarIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/solid";
import MenuCard from "../components/MenuCard";
import Basket from "../components/Basket";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant, setRestaurant } from "../features/restaurantSlice";
import { selectBasketItems } from "../features/basketSlice";


const Restaurant = () => {
  const {
    params: { restaurantName, image, rating, address, dishes, description, lat, long },
  } = useRoute();
  const navigate = useNavigation();
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  }, []);

  React.useEffect(() => {
    dispatch(
      setRestaurant({
        restaurantName,
        image,
        rating,
        address,
        dishes,
        description,
        lat,
        long
      })
    );
  }, []);

  // const id = useSelector(selectBasketItemWithId)
  // console.log(id, 'ide')

  const savedDish = useSelector(selectBasketItems);
  const totalQuantity = savedDish.reduce((tot, item) => tot + item.quantity, 0)

  const showBasket = useSelector((state) => state.basket.showBasket);
  const restaurantDescription = useSelector(selectRestaurant);

  return (
    <SafeAreaView className="bg-gray-200 relative flex-1">
      <ScrollView>
        <Image
          source={{ uri: `${restaurantDescription?.image}` }}
          className="w-full h-52"
          resizeMode="cover"
        />

        <Pressable
          className="absolute top-9 left-5 w-10 h-10 bg-white rounded-full shadow-xl place-content-center items-center justify-center"
          onPress={() => navigate.navigate("Home")}
        >
          <ArrowLeftIcon fill="black" />
        </Pressable>

        <View className="bg-white p-3">
          <Text className="font-bold text-2xl">{restaurantDescription?.restaurantName}</Text>
          <View className="flex-row items-center gap-x-2 mt-2">
            <View className="flex-row items-center gap-x-1 flex-initial">
              <StarIcon size={12} fill="yellow" />
              <Text className="text-xs">{restaurantDescription?.rating}</Text>
            </View>
            <View className="flex-row items-center gap-x-1 flex-[2_2_0%]">
              <MapPinIcon size={12} fill="gray" />
              <Text className="text-xs" ellipsizeMode="tail" numberOfLines={1}>
                {address}
              </Text>
            </View>
          </View>
          <Text className="text-sm text-neutral-500 mt-3">{restaurantDescription?.description}</Text>
        </View>

        <Text className="font-bold text-xl p-3">Menu</Text>

        <View className="bg-white">
          {restaurantDescription?.dishes?.map((item) => {
            return (
              <MenuCard
                key={item._id}
                id={item._id}
                menu={item.name}
                description={item.description}
                price={item.price}
                image={item.imageUrl}
              />
            );
          })}
        </View>
      </ScrollView>
      {showBasket && totalQuantity > 0 ? <Basket /> : null}
    </SafeAreaView>
  );
};

export default Restaurant;