import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { DevicesType, ThongSoType } from "../../redux/features/DeviceSlice";
import { textLight } from "../../constants/Colors";
import ListFakeThongSos from "../../utils/FakeData/FakeThongSo";
import { Ionicons } from "@expo/vector-icons";

export default function ItemThongSo(props: { item: ThongSoType }) {
  const { item } = props;

  return (
    <View>
      <View style={{ padding: 5, flexDirection: "row" }}>
        <Text style={{ flex: 1, color: textLight, fontWeight: "600" }}>
          {item.name}
        </Text>
        <TouchableOpacity>
          <Text>{item.vale}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
