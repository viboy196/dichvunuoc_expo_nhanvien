import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { DevicesType } from "../../redux/features/DeviceSlice";
import { textLight } from "../../constants/Colors";
import ListFakeThongSos from "../../utils/FakeData/FakeThongSo";
import { Ionicons } from "@expo/vector-icons";

export default function ItemDevice(props: { item: DevicesType }) {
  const { item } = props;
  const arrThongSo = ListFakeThongSos.filter((x) =>
    item.listIdThongSo?.includes(x.id)
  );
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <View>
      <View style={{ padding: 5, flexDirection: "row" }}>
        <Text style={{ flex: 1, color: textLight, fontWeight: "600" }}>
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => setIsShow(!isShow)}>
          {isShow ? (
            <Ionicons name="chevron-down" size={24} color={textLight} />
          ) : (
            <Ionicons name="chevron-forward" size={24} color={textLight} />
          )}
        </TouchableOpacity>
      </View>
      {isShow && (
        <View>
          {arrThongSo &&
            arrThongSo.map((item, index) => (
              <View
                key={"arrThongSo" + item.id + index}
                style={{
                  flexDirection: "row",
                  padding: 5,
                  paddingHorizontal: 15,
                }}
              >
                <Text style={{ flex: 1, color: textLight }}>{item.name}</Text>
                <Text style={{ color: textLight }}>
                  {item.vale}
                  {item.unitType ? ` ${item.unitType}` : ""}
                </Text>
              </View>
            ))}
        </View>
      )}
    </View>
  );
}
