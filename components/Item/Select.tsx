import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { textLight } from "../../constants/Colors";

export default function Select(props: {
  placeholder?: string;
  onPressItem: (text: string) => void;
  listValueSelect?: string[];
}) {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [valueSelect, setValueSelect] = useState<string>(
    props.placeholder ? props.placeholder : ""
  );
  const [w, sw] = useState<number>(0);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          height: "100%",
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "rgba(255,255,255,1)",
          borderRadius: 8,
          width: w > 0 ? w + 30 : undefined,
        }}
        onPress={() => {
          setIsClick(!isClick);
        }}
      >
        <Text
          style={{
            color: textLight,
          }}
          onLayout={(e) => {
            const _w = e.nativeEvent.layout.width;
            if (_w > w) sw(_w);
          }}
        >
          {valueSelect}
        </Text>
        <View style={{ paddingLeft: 10 }}>
          <Ionicons name="caret-down" color={textLight} />
        </View>
      </TouchableOpacity>
      {isClick && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 5,
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.3)",
              flex: 1,
              zIndex: 100,
              elevation: 100,
              padding: 5,
              borderRadius: 8,
            }}
          >
            {props.listValueSelect &&
              props.listValueSelect
                .filter((x) => x !== valueSelect)
                .map((item, index) => (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      marginTop: 5,
                      borderRadius: 8,
                      backgroundColor: "rgba(255,255,255,0.7)",
                    }}
                    key={"listValueSelect" + index}
                    onPress={() => {
                      setValueSelect(item);
                      setIsClick(false);
                      props.onPressItem(item);
                    }}
                  >
                    <Text style={{ color: textLight }}>{item}</Text>
                  </TouchableOpacity>
                ))}
          </View>
        </View>
      )}
    </View>
  );
}
