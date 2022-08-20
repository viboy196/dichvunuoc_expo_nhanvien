import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function ButtonText({
  imageSource,
  text,
  onPress,
  color,
  size,
  sizeText,
  width,
  height,
  colorText,
  widthText,
}: {
  imageSource?: ImageSourcePropType;
  text?: string;
  onPress?: () => void;
  color?: string;

  colorText?: string;

  size?: string | number;
  sizeText?: number;
  width?: string | number | undefined;

  widthText?: string | number | undefined;

  height?: string | number | undefined;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: width ? width : 75,
          height: height ? height : 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: "60%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={
              imageSource
                ? imageSource
                : require("../../assets/images/LogoApp/Logo_256_256.png")
            }
            resizeMode="cover"
            style={{
              width: size ? size : 48,
              height: size ? size : 48,
              tintColor: color ? color : undefined,
            }}
          />
        </View>
        <View
          style={{ height: "40%", width: widthText ? widthText : undefined }}
        >
          <Text
            style={{
              textAlign: "center",
              color: colorText ? colorText : undefined,
              fontSize: sizeText ? sizeText : undefined,
            }}
          >
            {text ? text : "Chưa nhập"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
