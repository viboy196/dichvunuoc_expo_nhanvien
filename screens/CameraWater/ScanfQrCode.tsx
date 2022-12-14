import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  BarCodeEvent,
  BarCodeScanner,
  PermissionStatus,
} from "expo-barcode-scanner";
import { blueColorApp, textLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { RootStackScreenProps } from "../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { logOut } from "../../redux/features/auth/authSlices";

export default function ScanfQrCode({
  navigation,
}: RootStackScreenProps<"ScanfQrCode">) {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [qrCode, setQrCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [waterUser, setWaterUser] = useState<any>();
  const [viewCamera, setViewCamera] = useState<boolean>(true);

  const { token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === PermissionStatus.GRANTED) setHasPermission(true);
    })();
  };
  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);
  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    setScanned(true);
    setViewCamera(false);
    setQrCode(data);
    console.log("Type: " + type + "\nData: " + data);
    if (token) {
      setLoading(true);
      ApiRequest.WaterUserDetailByWaterMeterCode({
        token: token,
        waterMeterCode: data,
      })
        .then((res) => {
          setLoading(false);
          console.log(res);

          if (res.code === "00") {
            if (res.result !== null) setWaterUser(res.result);
            else {
              Alert.alert("L???i", "kh??ng c?? h???p ?????ng n??o v???i m?? :" + data, [
                {
                  text: "OK",
                  onPress: () => {
                    setQrCode(undefined);
                    setScanned(false);
                    setWaterUser(undefined);
                    setViewCamera(true);
                  },
                },
              ]);
            }
          } else {
            Alert.alert("L???i", "kh??ng c?? h???p ?????ng n??o ???ng v???i m?? :" + data, [
              {
                text: "OK",
                onPress: () => {
                  setQrCode(undefined);
                  setScanned(false);
                  setWaterUser(undefined);
                  setViewCamera(true);
                },
              },
            ]);
          }
        })
        .catch((error) => {
          dispatch(logOut());
          console.log("error scanf qr :", error);
          setLoading(false);
        });
    }
  };
  // Check permissions and return the screens

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <Spinner visible={loading} textStyle={{ color: "#FFF" }} />
      {viewCamera && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            width: Layout.window.width + 10,
            height: Layout.window.height,
          }}
        />
      )}

      <TouchableOpacity
        style={{
          position: "absolute",
          width: "100%",
          alignItems: "center",
          top: 10,
        }}
        onPress={() => {
          if (scanned) {
            setQrCode(undefined);
            setScanned(false);
            setWaterUser(undefined);
            setViewCamera(true);
          }
        }}
      >
        <View
          style={{
            margin: 10,
            backgroundColor: "rgba(0,0,0,0.4)",
            width: 240,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "#fff" }}>
            {!qrCode ? "Vui l??ng qu??t m?? QR ?????ng h??? " : "Qu??t l???i"}
          </Text>
          {!qrCode && <ActivityIndicator color={blueColorApp} />}
        </View>
      </TouchableOpacity>
      {waterUser && (
        <View
          style={{
            position: "absolute",
            width: Layout.window.width - 20,
            bottom: 60,
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.6)",
            borderRadius: 10,
            marginLeft: 20,
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
            Th??ng tin Kh??ch h??ng
          </Text>
          <Text
            style={{
              color: textLight,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Kh??ch h??ng : {waterUser.name}
          </Text>
          <Text
            style={{
              color: textLight,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            ?????a ch??? : {waterUser.address}
          </Text>
          <Text
            style={{
              color: textLight,
              fontSize: 14,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            M?? ?????ng h??? : {waterUser.waterMeterCode}
          </Text>
          <Button
            title={"Ti???p t???c"}
            onPress={() => {
              navigation.navigate("CameraWaterScreen", {
                waterMeterCode: waterUser.waterMeterCode,
                waterUserId: waterUser.id,
                waterUserName: waterUser.name,
                waterUserAddress: waterUser.address,
              });
            }}
            color={blueColorApp}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
