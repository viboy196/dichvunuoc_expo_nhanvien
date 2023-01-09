import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { PointType } from "../../redux/features/PointsSlice";
import { useAppSelector } from "../../redux/store/hooks";
import { Ionicons } from "@expo/vector-icons";

export default function ShowName(props: { point: PointType }) {
  const { listData } = useAppSelector((s) => s.models);
  const data = listData?.find((x) => x.id === props.point.idConnect);
  const [w, sw] = useState<number>(20);

  return (
    <View
      style={{
        padding: 5,
        borderRadius: 8,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Text
        style={{
          color: "white",
          width: w < 40 ? undefined : 40,
          fontSize: 8,
          fontWeight: "bold",
        }}
        onLayout={(e) => {
          const { width } = e.nativeEvent.layout;
          sw(width);
        }}
      >
        {data ? data.name : props.point.name}
      </Text>
      {props.point.typePoint === "điểm nhà máy" && (
        <Image
          source={require("../../assets/images/waterfactory/shw.png")}
          style={{ width: 35, height: 20 }}
        />
      )}
      {props.point.typePoint === "điểm thu" && (
        <Image
          source={require("../../assets/images/waterfactory/hydroelectric-power-station.png")}
          style={{ width: 35, height: 20, resizeMode: "center" }}
        />
      )}

      {props.point.typePoint === "điểm trạm" && (
        <Image
          source={require("../../assets/images/waterfactory/trambom.png")}
          style={{ width: 35, height: 30, resizeMode: "center" }}
        />
      )}
      {(props.point.typePoint === "Đồng hồ tổng nhánh" ||
        props.point.typePoint === "Đồng hồ doanh nghiệp" ||
        props.point.typePoint === "Đồng hồ tổng tuyến") && (
        <Image
          source={require("../../assets/images/waterfactory/watercock.png")}
          style={{ width: 35, height: 35, resizeMode: "center" }}
        />
      )}

      {props.point.typePoint === "điểm van" && (
        <Image
          source={require("../../assets/images/waterfactory/pipeline.png")}
          style={{ width: 35, height: 20, resizeMode: "center" }}
        />
      )}
      {props.point.typePoint === "Đồng hồ hộ dân" && (
        <Image
          source={require("../../assets/images/waterfactory/gauge.png")}
          style={{ width: 35, height: 20, resizeMode: "center" }}
        />
      )}
    </View>
  );
}
