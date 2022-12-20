import { View, Text } from "react-native";
import React from "react";
import { ModelType } from "../../redux/features/ModelSlides";

export default function ItemModel(props: { item: ModelType }) {
  const { item } = props;
  return (
    <View>
      <Text>{item.name}</Text>

      <Text>{item.type}</Text>
    </View>
  );
}
