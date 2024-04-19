import React from "react";
import { TextInput, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

const SearchBar = () => {
  return (
    <View className='w-[90%] mx-auto'>
      <View className="flex-row items-center gap-x-2 border border-neutral-300 rounded-md p-2">
        <MagnifyingGlassIcon size={18} fill="gray" />
        <TextInput
          placeholder="Search"
          keyboardType="default"
          className="w-full outline-none border-none focus:outline-none"
        />
      </View>
    </View>
  );
};

export default SearchBar;
