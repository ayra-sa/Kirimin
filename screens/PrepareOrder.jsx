import React from "react";
import { SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const PrepareOrder = () => {
  const navigate = useNavigation();

  React.useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      navigate.navigate("Delivery");
    }, 3000);
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 pt-10">
      <View className="h-full place-content-center items-center justify-center">
        <Animatable.Image
          source={require("../assets/images/cook.webp")}
          animation="slideInDown"
          iterationCount="infinite"
          direction="alternate"
          className="h-96"
        />
        {/* <Text>Prepare Order ...</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default PrepareOrder;
