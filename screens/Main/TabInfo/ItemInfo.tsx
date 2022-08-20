import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { blueColorApp, textLight } from "../../../constants/Colors";
export default function ItemInfo({
  name,
  iconName,
  onPress,
}: {
  name?: string;
  iconName?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Ionicons
          // @ts-ignore
          name={iconName ? iconName : "add"}
          size={28}
          color={blueColorApp}
        />
        <Text style={{ color: textLight, marginLeft: 10 }}>
          {name ? name : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
