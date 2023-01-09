import { View, Text } from "react-native";
import React from "react";
import { PointDraw } from ".";
import { Ionicons } from "@expo/vector-icons";

export default function ItemMaker(props: { point: PointDraw }) {
  if (props.point.isEdit) {
    return (
      <View>
        <Ionicons name="pin" color={"#3e3e3e"} size={16} />
      </View>
    );
  }
  return (
    <View>
      <Ionicons name="pin" color={"#e3e3e3"} size={16} />
    </View>
  );
}
