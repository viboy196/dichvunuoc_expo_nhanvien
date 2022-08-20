import { TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { navGoBack } from "../../utils/helper/navigationHelper";
export default function GoBackArrow({
  navigation,
  color,
}: {
  navigation: any;
  color?: string;
}) {
  return (
    <TouchableOpacity
      style={{ width: 60, height: 60, justifyContent: "center" }}
      onPress={() => navGoBack(navigation)}
    >
      <Ionicons
        name={"chevron-back"}
        size={38}
        color={color ? color : "#fff"}
      />
    </TouchableOpacity>
  );
}
