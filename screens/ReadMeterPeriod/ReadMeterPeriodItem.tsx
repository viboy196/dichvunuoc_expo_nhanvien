import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Layout from "../../constants/Layout";
import { blueColorApp } from "../../constants/Colors";
export default function ListReadMeterPeriodItem({
  onPress,
  areaName,
  hodo,
  tongho,
}: {
  areaName?: string;
  onPress?: () => void;
  hodo?: number;
  tongho?: number;
}) {
  return (
    <TouchableOpacity
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
    >
      <View
        style={{
          width: Layout.window.width - 20,
          margin: 10,
          padding: 10,
          borderRadius: 10,
          flexDirection: "row",
          backgroundColor: blueColorApp,
        }}
      >
        <View style={{ flex: 4, justifyContent: "center", padding: 10 }}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
            {areaName ? areaName : " khu vực ....."}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.6)",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Đo được : {hodo ? hodo : "0 "} {"/"} {tongho ? tongho : "0"} (hộ)
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: 50,
            }}
          >
            {hodo == tongho ? (
              <Image
                source={require("../../assets/images/ReadMeterPeriod/check.png")}
                resizeMode="cover"
                style={{ width: 48, height: 48 }}
              />
            ) : (
              <Image
                source={require("../../assets/images/ReadMeterPeriod/loading.png")}
                resizeMode="cover"
                style={styles.itemImage}
              />
            )}
          </View>
          {hodo == tongho ? (
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Hoàn thành
            </Text>
          ) : (
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Đang thực hiện
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewItemImage: {
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blueColorApp,
    borderRadius: 75,
    marginRight: 10,
    marginLeft: 10,
  },
  itemImage: {
    width: 35,
    height: 35,
    tintColor: "#fff",
  },
  items: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  viewItemText: {
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  itemText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#FFF",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
