import { View, Text, TextInput } from "react-native";
import React from "react";

export default function InputForm2(props: {
  title: string;
  onChangeText?: (text: string) => void;
  defaultValue?: string;
}) {
  return (
    <View
      style={{
        borderRadius: 8,
        borderColor: "rgba(48,98,229,0.4)",
        borderWidth: 1,
        margin: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 90,
          height: "100%",
          borderRightWidth: 1,
          borderRightColor: "rgba(48,98,229,0.4)",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            margin: "auto",
            textAlign: "center",
            paddingLeft: 10,
          }}
        >
          {props.title}
        </Text>
      </View>
      <TextInput
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          flex: 1,
        }}
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
        placeholder={"Nhập " + props.title}
      />
    </View>
  );
}
