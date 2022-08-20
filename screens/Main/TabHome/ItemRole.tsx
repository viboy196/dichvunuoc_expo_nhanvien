import { View, Text, FlatList } from "react-native";
import React from "react";
import { blueColorApp, textLight } from "../../../constants/Colors";
import ButtonText from "../../../components/Item/ButtonText";
import Layout from "../../../constants/Layout";
import { TypeRole } from "./TabHome";

const widthIcon = (Layout.window.width - 20) / 4;
export default function ItemRole({
  description,
  listTypeRole,
}: {
  description: string;
  listTypeRole: Array<TypeRole>;
}) {
  return (
    <View
      style={{
        paddingBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,
        paddingTop: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "black",
        shadowOpacity: 0.5,
      }}
    >
      <Text
        style={{
          color: textLight,
          fontSize: 16,
          fontWeight: "600",
          marginLeft: 20,
        }}
      >
        {description ? description : ""}
      </Text>
      <FlatList
        data={listTypeRole}
        renderItem={({ item }) => (
          <ButtonText
            imageSource={item.imageSource}
            text={item.name}
            colorText={textLight}
            size={28}
            sizeText={12}
            widthText={80}
            width={widthIcon}
            height={75}
            onPress={item.onPress}
          />
        )}
        numColumns={4}
      />
    </View>
  );
}
