import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/store/hooks";
import ItemModel from "./ItemModel";
import AddModel from "./AddModel";
import { blueColorApp } from "../../constants/Colors";

export default function Models() {
  const { listData } = useAppSelector((s) => s.models);
  const [isAddModel, setIsAddModel] = useState<boolean>(false);
  if (isAddModel) {
    return <AddModel goBack={() => setIsAddModel(false)} />;
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{ padding: 10, borderRadius: 8, backgroundColor: "#5cb85c" }}
          onPress={() => setIsAddModel(true)}
        >
          <Text style={{ color: "white" }}>Thêm mới</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            padding: 10,
            marginLeft: 10,
            borderRadius: 8,
            backgroundColor: blueColorApp,
          }}
        >
          <Text>Tất cả</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ padding: 10, marginLeft: 10 }}>
          <Text>Tất cả</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ padding: 10, marginLeft: 10 }}>
          <Text>Tất cả</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {listData &&
            listData.map((item) => (
              <ItemModel item={item} key={"item" + item.id} />
            ))}
          {listData === undefined && (
            <Text style={{ padding: 10 }}>Danh sách trống</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
