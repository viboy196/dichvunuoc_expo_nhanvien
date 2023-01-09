import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { textLight } from "../../constants/Colors";
import { ModuleType } from "../../redux/features/ModuleSlice";
import ListFakeDevices from "../../utils/FakeData/FakeDevice";
import ItemThongSo from "./ItemDevice";
import { DevicesType } from "../../redux/features/DeviceSlice";
import ListFakeThongSos from "../../utils/FakeData/FakeThongSo";

export default function ItemDeviceOnModule(props: {
  item: DevicesType;
  index: number;
}) {
  const [showThongSo, setShowThongSo] = useState<boolean>(false);
  const arrThongSo = ListFakeThongSos.filter((x) =>
    props.item.listIdThongSo?.includes(x.id)
  );
  return (
    <View
      style={{
        marginTop: 5,
        borderRadius: 8,
        marginHorizontal: 5,

        backgroundColor: "rgba(48,98,229,0.2)",
      }}
    >
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          paddingHorizontal: 5,
          paddingTop: 5,
          borderTopLeftRadius: 8,

          borderTopRightRadius: 8,

          backgroundColor: "rgba(48,98,229,0.4)",
        }}
      >
        <Text style={{ flex: 1, color: "#fff", fontWeight: "600" }}>
          {props.index}. {props.item.name}
        </Text>
        <TouchableOpacity onPress={() => setShowThongSo(!showThongSo)}>
          {showThongSo ? (
            <Ionicons name="chevron-down" size={24} color="#fff" />
          ) : (
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
      {showThongSo && (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#3e3e3e",
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 5,
              flexDirection: "row",
              backgroundColor: "rgba(48,98,229,0.2)",
            }}
            onPress={() => {
              console.log("vao day");
            }}
          >
            <Text style={{ flex: 1, color: textLight, fontWeight: "600" }}>
              Xem Chi tiết
            </Text>
            <Ionicons name="chevron-forward" size={24} color={textLight} />
          </TouchableOpacity>
          {arrThongSo &&
            arrThongSo.map((item, index) => (
              <ItemThongSo item={item} key={item.id + index} />
            ))}
        </View>
      )}
      <View style={{ padding: 5, flexDirection: "row" }}>
        <Text style={{ flex: 1, color: textLight, fontWeight: "600" }}>
          Báo cáo tức thời
        </Text>
        <Ionicons name="chevron-forward" size={24} color={textLight} />
      </View>
    </View>
  );
}
