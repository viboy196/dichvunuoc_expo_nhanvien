import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../../navigation/types";
import { blueColorApp } from "../../constants/Colors";
import ItemDeviceOnModule from "./ItemDeviceOnModule";

export default function FactoryManager({
  navigation,
}: RootStackScreenProps<"ModuleDetail">) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20, backgroundColor: blueColorApp }}></View>
      <View style={{ flex: 1, padding: 10 }}>
        <View>
          <Text>Nhà máy nước Vĩnh tường</Text>
        </View>

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
              Danh sách Module
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#5cb85c",
              }}
              onPress={() => navigation.navigate("AddDevices")}
            >
              <Text style={{ color: "white" }}>Thêm Module</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {/* <ItemModule />
              <ItemModule />
              <ItemModule />
              <ItemModule /> */}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
