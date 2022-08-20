import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import ItemCaNhan from "./ItemInfo";
import Layout from "../../../constants/Layout";
import { blueColorApp, textLight } from "../../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { logOut } from "../../../redux/features/auth/authSlices";
import { RootTabScreenProps } from "../../../navigation/types";

export default function TabInfo({ navigation }: RootTabScreenProps<"TabInfo">) {
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector((state) => state.auth);

  return (
    <ScrollView>
      <View
        style={{
          width: Layout.window.width,
          height: Layout.window.height,
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        {/* header */}
        <View
          style={{
            height: 150,
            width: Layout.window.width,
            backgroundColor: blueColorApp,
            justifyContent: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
          >
            <Image
              source={require("../../../assets/images/LogoApp/Logo_256_256.png")}
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                backgroundColor: "#fff",
              }}
              resizeMode="cover"
            />
            <Text style={{ color: "#fff", fontSize: 24, marginLeft: 10 }}>
              {userName}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: Layout.window.width,
          }}
        >
          <ScrollView>
            <ItemCaNhan
              name="Thông tin cá nhân"
              iconName="person"
              onPress={() => {
                navigation.navigate("InfoDetail");
              }}
            />

            <ItemCaNhan
              name="Điều Khoản Chính sách"
              iconName="document-sharp"
              onPress={() => {
                Linking.canOpenURL(
                  "https://dichvunuoc.vn/show/dvn_dieukhoan"
                ).then((supported) => {
                  if (supported) {
                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                    // by some browser in the mobile
                    Linking.openURL("https://dichvunuoc.vn/show/dvn_dieukhoan");
                  }
                });
              }}
            />

            <ItemCaNhan
              name="Đăng xuất"
              iconName="log-out"
              onPress={() => {
                dispatch(logOut());
              }}
            />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
