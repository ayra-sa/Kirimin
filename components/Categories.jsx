import React from "react";
import { FlatList, ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import sanity from "../kirimin-project/client";

const Categories = () => {
  const [menuCategories, setMenuCategories] = React.useState([]);

  React.useEffect(() => {
    sanity
      .fetch(
        `*[_type == "category"] {
          _id,
          name,
          "imageUrl": image.asset->url,
      }`)
      .then((data) => {
        setMenuCategories(data);
      })
  }, []);

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
      <FlatList
        data={menuCategories}
        renderItem={({ item }) => (
          <CategoryCard key={item.name} image={item.imageUrl} title={item.name} id={item._id} />
        )}
        keyExtractor={(item) => item._id}
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 20 }}
      />
    </ScrollView>
  );
};

export default Categories;
