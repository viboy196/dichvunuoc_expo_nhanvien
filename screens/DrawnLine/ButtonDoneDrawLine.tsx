import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import Layout from "../../constants/Layout";
import { blueColorApp, textLight } from "../../constants/Colors";
import Select from "../../components/Item/Select";

export default function ButtonDoneDrawLine(props: {
  onPress: () => void;
  staTusPointSelect?: 1 | 2 | 3;
  wl: number;
  color: string;
  onChangeWidth: (text: string) => void;
  onChangeColor: (text: string) => void;
}) {
  const { onPress, staTusPointSelect } = props;
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        width: Layout.window.width,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
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
          marginLeft: 5,
        }}
        onPress={props.onPress}
      >
        <Text style={{ color: "white" }}>
          {staTusPointSelect === 1 ? "Xác nhận" : "Hoàn Thành"}
        </Text>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        <Text>Độ rộng đường ống</Text>
        <TextInput
          defaultValue={props.wl.toString()}
          onChangeText={props.onChangeWidth}
          style={{
            padding: 5,
            backgroundColor: "rgba(255,255,255,0.5)",
            color: textLight,
          }}
        />
      </View>
      <Select
        listValueSelect={[
          "Đỏ",
          "Vàng",
          "Xanh nước biển",
          "Trắng",
          "nâu",
          "Xám",
        ]}
        onPressItem={(text) => {
          if (text === "Đỏ") {
            props.onChangeColor("red");
          }
          if (text === "Vàng") {
            props.onChangeColor("yellow");
          }
          if (text === "Xanh nước biển") {
            props.onChangeColor(blueColorApp);
          }
          if (text === "Trắng") {
            props.onChangeColor("#fff");
          }
          if (text === "nâu") {
            props.onChangeColor("#964B00");
          }
          if (text === "Xám") {
            props.onChangeColor("#3e3e3e");
          }
        }}
        placeholder={"Chọn lớp hiển thị"}
      />
    </View>
  );
}
