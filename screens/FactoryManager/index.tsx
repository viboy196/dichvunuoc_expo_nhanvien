import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../../navigation/types";
import { blueColorApp } from "../../constants/Colors";
import ItemModule from "./ItemModule";
import ListFakeModules from "../../utils/FakeData/FakeModule";

export default function FactoryManager({
  navigation,
}: RootStackScreenProps<"FactoryManager">) {
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
              Danh sách Module
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#5cb85c",
              }}
              onPress={() => {
                navigation.navigate("ModuleAdd");
              }}
            >
              <Text style={{ color: "white" }}>Thêm Module</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {ListFakeModules.sort((a, b) => a.oder - b.oder).map(
                (item, index) => (
                  <ItemModule
                    item={item}
                    goModuleDetai={() => {
                      navigation.navigate("ModuleDetail", { data: item });
                    }}
                    key={item.id + index}
                    index={index + 1}
                  />
                )
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
