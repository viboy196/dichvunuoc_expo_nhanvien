import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Layout from "../../constants/Layout";
import { blueColorApp } from "../../constants/Colors";

export default function ButtonDone(props: {
  onPress: () => void;
  staTusPointSelect?: 1 | 2 | 3;
}) {
  const { onPress, staTusPointSelect } = props;
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        width: Layout.window.width,
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 8,
          backgroundColor: blueColorApp,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginRight: 5,
        }}
        onPress={props.onPress}
      >
        <Text style={{ color: "white" }}>
          {staTusPointSelect === 1 ? "Xác nhận" : "Thêm điểm"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
