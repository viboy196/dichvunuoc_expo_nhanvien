import React from "react";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
  Keyboard,
  KeyboardEvent,
  Platform,
} from "react-native";

import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { RootStackScreenProps } from "../../navigation/types";
import { useAppSelector } from "../../redux/store/hooks";
import { blueColorApp, textLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { TextInput } from "react-native-paper";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import Spinner from "react-native-loading-spinner-overlay/lib";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
export default function CameraWaterScreen({
  route,
}: RootStackScreenProps<"CameraWaterScreen">) {
  const { waterUserName, waterMeterCode, waterUserId, waterUserAddress } =
    route.params;
  const { token } = useAppSelector((state) => state.auth);
  const keyboardHeight = useKeyboard();
  console.log("keyboardHeight", keyboardHeight);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [camera, setCamera] = useState<Camera | null>(null);

  const [base64Image, setBase64image] = useState<string>();

  const [textChiSo, onChangeTextChiSo] = React.useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  useEffect(() => {
    // @ts-ignore
    if (permission === undefined) {
      requestPermission();
    }
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const __takePicture = async () => {
    if (!camera) {
      return;
    }

    const photo = await camera.takePictureAsync({ base64: true });
    console.log(photo.uri);
    const manipResult = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 480, height: 638 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );
    setBase64image(manipResult.base64);
  };
  const ghinhan = async () => {
    if (!textChiSo || textChiSo.length === 0) {
      Alert.alert("Lỗi", "chưa nhập chỉ số đồng hồ");
      return;
    }
    if (token && waterUserId && textChiSo) {
      setLoading(true);
      ApiRequest.WaterIndexAdd({
        token: token,
        waterUserId: waterUserId,
        year: new Date().getFullYear().toString(),

        month: (new Date().getMonth() + 1).toString(),
        waterMeterNumber: textChiSo,
        image: base64Image,
      })
        .then((data) => {
          console.log(data);
          setLoading(false);
          if (data.code === "00") {
            Alert.alert(
              "thành công",
              `ghi nhận số đo  ${
                new Date().getMonth() + 1
              }/ ${new Date().getFullYear()}`
            );
          } else {
            Alert.alert("thành công", data.errorMessage);
          }
        })
        .catch(() => {
          setLoading(false);
          Alert.alert("thất bại", "ghi nhận thất bại");
        });
    }
  };

  if (base64Image) {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            // source={{uri: photoPath}}
            source={{ uri: `data:image/jpeg;base64,${base64Image}` }}
            resizeMode={"cover"}
            style={[
              {
                width: Layout.window.width,
                height: inputFocus
                  ? (4 * Layout.window.width) / 3
                  : Layout.window.height - 20,
              },
              { backgroundColor: "black" },
            ]}
          />
          <TouchableOpacity
            onPress={() => {
              setBase64image(undefined);
            }}
            style={{
              position: "absolute",
              right: 0,

              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                margin: 10,
                backgroundColor: "rgba(0,0,0,0.4)",
                width: 120,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Chụp lại</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={{
              position: "absolute",
              left: 0,

              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                margin: 10,
                backgroundColor: "rgba(0,0,0,0.4)",
                width: 120,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>xong</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",

              bottom: Platform.OS === "ios" ? keyboardHeight + 20 : 20,
            }}
          >
            <View
              style={{
                width: Layout.window.width - 20,
                padding: 10,
                backgroundColor: "rgba(255,255,255,0.5)",
                borderRadius: 10,
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  color: textLight,
                  fontSize: 16,
                  fontWeight: "600",
                  marginVertical: 10,
                }}
              >
                Thông tin Khách hàng
              </Text>
              <Text
                style={{
                  color: textLight,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Khách hàng : {waterUserName}
              </Text>
              <Text
                style={{
                  color: textLight,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Địa chỉ : {waterUserAddress}
              </Text>
              <Text
                style={{
                  color: textLight,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Mã đồng hồ : {waterMeterCode}
              </Text>
            </View>
            <View
              style={{
                width: Layout.window.width - 20,
                padding: 10,
                backgroundColor: "rgba(255,255,255,0.5)",
                borderRadius: 10,
                margin: 10,
              }}
            >
              <TextInput
                placeholder={"chỉ số đồng hồ"}
                onChangeText={onChangeTextChiSo}
                value={textChiSo}
                keyboardType="numeric"
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  marginBottom: 10,
                }}
                outlineColor={"rgba(0,0,0,0.2)"}
                activeOutlineColor={blueColorApp}
                mode={"outlined"}
                onFocus={() => {
                  console.log("forcus vào đây");
                  setInputFocus(true);
                }}
                onBlur={() => {
                  console.log("forcus ra");
                  setInputFocus(false);
                }}
              />
              <Button
                title={"Ghi nhận"}
                onPress={ghinhan}
                color={blueColorApp}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textStyle={{ color: "#FFF" }} />
      <Camera
        style={{
          width: Layout.window.width,
          height: (4 * Layout.window.width) / 3,
        }}
        type={type}
        ref={(ref) => {
          setCamera(ref);
        }}
      >
        <View style={styles.buttonContainer}>
          <View
            style={{
              width: Layout.window.width - 20,
              padding: 10,
              backgroundColor: "rgba(0,0,0,0.4)",
              borderRadius: 10,
              margin: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
                marginVertical: 10,
              }}
            >
              Thông tin Khách hàng
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Khách hàng : {waterUserName}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Địa chỉ : {waterUserAddress}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Mã đồng hồ : {waterMeterCode}
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={__takePicture}>
            <View style={styles.inButton} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  barcodeTextURL: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    bottom: 20,
    position: "absolute",
    width: Layout.window.width,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3E3E3",
  },
  inButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "#6E6E6E",
    borderWidth: 3,
  },
});

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e: KeyboardEvent) {
    // Remove type here if not using TypeScript
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardHeight;
};
