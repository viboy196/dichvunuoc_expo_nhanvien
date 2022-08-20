import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import Layout from "../../../constants/Layout";
import { blueColorApp, textLight } from "../../../constants/Colors";
import ButtonText from "../../../components/Item/ButtonText";
import { RootTabScreenProps } from "../../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
export default function TabRequest({
  navigation,
}: RootTabScreenProps<"TabRequest">) {
  const fetchData = () => {
    Alert.alert("Thông Báo", "Tab yêu cầu xử lý đang phát triển", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };
  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, [navigation]);
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
        <Spinner visible={true} textStyle={{ color: "#FFF" }} />
        {/* header */}
        <View
          style={{
            height: 150,
            width: Layout.window.width,
            backgroundColor: blueColorApp,
          }}
        >
          <View
            style={{
              height: 60,
              top: 35,
              alignItems: "center",
              flexDirection: "row",
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingLeft: 30,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "500", color: "#fff" }}>
                Yêu cầu
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: "100%",
                flexDirection: "row",
                marginLeft: 10,
                justifyContent: "center",
              }}
            >
              <View style={{ flex: 1 }} />
              <TouchableOpacity style={{ flex: 1, height: "100%" }}>
                <View
                  style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={28}
                    color={"#fff"}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ flex: 1, height: "100%" }}>
                <View
                  style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Ionicons name="call-outline" size={28} color={"#fff"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: Layout.window.width,
            backgroundColor: "#f1f2fe",
          }}
        >
          <View
            style={{
              marginTop: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ButtonText
                  imageSource={require("../../../assets/images/main/tabYeuCau/1.png")}
                  text={"Lắp đặt đồng hồ"}
                  colorText={textLight}
                  width={80}
                  height={150}
                  size={64}
                  onPress={() => {
                    navigation.navigate("MyWebView", {
                      title: "Lắp đặt đồng hồ ",
                      url: "http://dichvunuoc.vn/show/dvn_mobile_dichvu_lapdatdongho",
                    });
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ButtonText
                  imageSource={require("../../../assets/images/main/tabYeuCau/2.png")}
                  text={"Di rời thay đổi đường ống"}
                  colorText={textLight}
                  width={100}
                  height={150}
                  size={64}
                  onPress={() => {
                    navigation.navigate("MyWebView", {
                      title: "Thay đổi đường ống cụm đồng hồ nước",
                      url: "http://dichvunuoc.vn/show/dvn_mobile_dichvu_didoidongho",
                    });
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ButtonText
                  imageSource={require("../../../assets/images/main/tabYeuCau/3.png")}
                  text={"Kiểm tra kiểm định đồng hồ"}
                  colorText={textLight}
                  width={100}
                  height={150}
                  size={64}
                  onPress={() => {
                    navigation.navigate("MyWebView", {
                      title: " Kiểm tra kiểm định đồng hồ ",
                      url: "http://dichvunuoc.vn/show/dvn_mobile_dichvu_kiemtrakiemdinhdongho",
                    });
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ButtonText
                  imageSource={require("../../../assets/images/main/tabYeuCau/4.png")}
                  text={"Đề nghị tạm ngừng , mở cấp nước"}
                  colorText={textLight}
                  width={140}
                  height={150}
                  size={64}
                  onPress={() => {
                    navigation.navigate("MyWebView", {
                      title: "Đề nghị tạm ngừng , mở nguồn , cấp nước",
                      url: "http://dichvunuoc.vn/show/dvn_mobile_dichvu_denghidongmo",
                    });
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ButtonText
                  imageSource={require("../../../assets/images/main/tabYeuCau/5.png")}
                  text={"Thay đổi thông tin , ký lại hợp đồng"}
                  colorText={textLight}
                  width={140}
                  height={150}
                  size={64}
                  onPress={() => {
                    navigation.navigate("MyWebView", {
                      title: "Thay đổi thông tin , ký lại hợp đồng",
                      url: "http://dichvunuoc.vn/show/dvn_mobile_dichvu_thaydoithongtin",
                    });
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              width: Layout.window.width - 60,
              marginLeft: 30,
              height: 80,
              backgroundColor: "#fff",
              position: "absolute",
              top: -40,
              borderRadius: 20,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Ionicons name="add-circle" size={28} color={blueColorApp} />
              <Text
                style={{
                  color: blueColorApp,
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >
                Tạo Yêu cầu
              </Text>

              {/* <View
                style={{
                  width: 40,
                  height: 5,
                  backgroundColor: blueColorApp,
                  marginBottom: 20,
                }}
              /> */}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
