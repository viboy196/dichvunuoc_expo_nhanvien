import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../../navigation/types";
import { blueColorApp } from "../../constants/Colors";
import ItemDeviceOnModule from "./ItemDeviceOnModule";
import ListFakeModules from "../../utils/FakeData/FakeModule";
import ListFakeDevices from "../../utils/FakeData/FakeDevice";

export default function ModuleScreen({
  navigation,
  route,
}: RootStackScreenProps<"ModuleDetail">) {
  const module = route.params.data;
  const arrThietBi = ListFakeDevices.filter((x) =>
    module.listIdDevice?.includes(x.id)
  );
  console.log("vao day");

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(48,98,229,0.1)",
            borderRadius: 8,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-end",
              backgroundColor: "rgba(48,98,229,0.4)",
              borderTopLeftRadius: 8,

              borderTopRightRadius: 8,

              padding: 5,
            }}
          >
            <Text style={{ flex: 1, color: "white", fontWeight: "bold" }}>
              Danh sách Thiết bị
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#5cb85c",
              }}
              onPress={() => navigation.navigate("AddDevices")}
            >
              <Text style={{ color: "white" }}>Thêm Thiết bị</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {arrThietBi.map((item, index) => (
                <ItemDeviceOnModule
                  item={item}
                  key={item.id + index}
                  index={index + 1}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
