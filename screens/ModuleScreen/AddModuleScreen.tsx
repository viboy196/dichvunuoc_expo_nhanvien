import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { blueColorApp, textLight } from "../../constants/Colors";
import InputForm2 from "../../components/Item/InputForm2";

export default function AddModuleScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 5 }}>
        <View>
          <Text
            style={{
              textTransform: "uppercase",
              fontSize: 24,
              fontWeight: "800",
              color: blueColorApp,
              textAlign: "center",
            }}
          >
            Nhà máy nước sông hồng
          </Text>
        </View>
        <Text
          style={{
            textAlign: "right",
            color: textLight,
            fontSize: 18,
            padding: 10,
          }}
        >
          Thêm Module
        </Text>

        <InputForm2 title="Tên module" />

        <InputForm2 title="Thông tin" />
        <TouchableOpacity
          style={{
            backgroundColor: blueColorApp,
            padding: 10,
            margin: 5,
            borderRadius: 8,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            Tạo Module
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
