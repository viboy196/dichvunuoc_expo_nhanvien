import { View, Text, AlertButton, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { PointType, updatePoint } from "../../redux/features/PointsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { PointDraw } from ".";

export default function ActionSelectPointDrawnLine(props: {
  // pointSelect: PointDraw;
  butons: AlertButton[];
}) {
  const dispatch = useAppDispatch();
  const { butons } = props;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        width: 120,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 8,
      }}
    >
      {butons &&
        butons.map((x, index) => (
          <TouchableOpacity
            key={`${index}_ActionSelect`}
            style={{
              padding: 5,
              borderBottomWidth: 1,
              borderColor: "#5e5e5e",
            }}
            onPress={() => {
              if (x.onPress) {
                x.onPress();
              }
            }}
          >
            <Text style={{ color: "#fff" }}>{x.text}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}
