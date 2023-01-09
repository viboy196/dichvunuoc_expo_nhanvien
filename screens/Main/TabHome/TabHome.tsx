import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Share,
  TouchableOpacity,
  Alert,
  FlatList,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useState } from "react";
import { blueColorApp, textLight } from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import ButtonText from "../../../components/Item/ButtonText";
import { RootTabScreenProps } from "../../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
import ApiRequest from "../../../utils/api/Main/ApiRequest";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import ItemRole from "./ItemRole";
import { logOut } from "../../../redux/features/auth/authSlices";
import { removeAllPoint } from "../../../redux/features/PointsSlice";

const widthIcon = (Layout.window.width - 20) / 4;

export type TypeRole = {
  name: string;
  imageSource: ImageSourcePropType;
  onPress: () => void;
};
export default function TabHome({ navigation }: RootTabScreenProps<"TabHome">) {
  const tag = "TabHome";
  const { token, UserId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  console.log("token", token, "userId", UserId);

  const [loading, setLoading] = useState<boolean>(true);

  const [listAppRole, setListAppRole] = useState<Array<any>>([]);

  const listCongViecCTVDocDongHoNuoc = [
    {
      name: "Ghi chỉ số nước",
      imageSource: require("../../../assets/images/main/tabHome/meter.png"),
      onPress: () => {
        navigation.navigate("ScanfQrCode", {
          name: "Quét mã đồng hồ",
          type: "Mã Đồng Hồ",
        });
      },
    },
    {
      name: "Lịch đọc nước",
      imageSource: require("../../../assets/images/main/tabHome/calendar.png"),
      onPress: () => {
        navigation.navigate("ReadMeterPeriod", {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        });
      },
    },
    {
      name: "Danh sách chỉ số nước",
      imageSource: require("../../../assets/images/main/tabHome/plumber.png"),
      onPress: () => {
        navigation.navigate("ListWaterIndex");
      },
    },
  ] as Array<TypeRole>;

  const listCongViecQuanLyHoSuDungNuoc = [
    {
      name: "Yêu cầu đăng ký sử dụng nước",
      imageSource: require("../../../assets/images/main/tabHome/request.png"),
      onPress: () => {
        navigation.navigate("UseWaterRegister");
      },
    },
    {
      name: "Danh sách hợp đồng",
      imageSource: require("../../../assets/images/main/tabHome/form.png"),
      onPress: () => {
        navigation.navigate("ListContract");
      },
    },
  ] as Array<TypeRole>;

  const listCongViecQuanLyCongTy = [
    {
      name: "Quản lý tuyến ống",
      imageSource: require("../../../assets/images/main/tabHome/request.png"),
      onPress: () => {
        navigation.navigate("WaterPipes");
      },
    },
    {
      name: "Xóa dữ liệu tuyến ống",
      imageSource: require("../../../assets/images/main/tabHome/request.png"),
      onPress: () => {
        Alert.alert("Xác nhận", "Bạn muốn xóa dữ liệu tuyến ống", [
          {
            text: "Xác nhận",
            onPress: () => {
              dispatch(removeAllPoint());
            },
          },
          {
            text: "Thôi",
          },
        ]);
      },
    },
    {
      name: "Quản lý Danh mục",
      imageSource: require("../../../assets/images/main/tabHome/request.png"),
      onPress: () => {
        navigation.navigate("Models");
      },
    },
    {
      name: "Quản Lý Nhà máy",
      imageSource: require("../../../assets/images/main/tabHome/request.png"),
      onPress: () => {
        navigation.navigate("FactoryManager", {
          title: "Quản lý nhà máy nước Sông Hồng",
        });
      },
    },
  ] as Array<TypeRole>;

  console.log(listAppRole);

  useEffect(() => {
    if (token && UserId)
      ApiRequest.AppRoleGetByUser({ token, userId: UserId })
        .then((res) => {
          setLoading(false);
          if (res.code == "00") {
            console.log(res.result);
            setListAppRole(res.result);
          }
        })
        .catch((error) => {
          console.log(tag, error);
          dispatch(logOut());
        });
    else setLoading(false);
  }, [token, UserId]);
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f5fe" }}>
      <Spinner visible={loading} textStyle={{ color: "#FFF" }} />
      <View
        style={{
          height: 120,
          backgroundColor: blueColorApp,
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 40,
            width: "90%",
            height: 60,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 2,
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                width: 60,
                backgroundColor: "#ececec",
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <Ionicons name="search-circle" size={32} color={blueColorApp} />
            </View>
            <TextInput
              placeholder={"Hôm nay ,bạn tìm gì ?"}
              selectionColor={blueColorApp}
              style={{
                paddingLeft: 10,
                width: 150,
                height: 40,
                backgroundColor: "#fff",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
            />
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
            <TouchableOpacity
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Ionicons name="chatbubble-outline" size={28} color={"#fff"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
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
            <TouchableOpacity
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={28}
                  color={"#fff"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ height: Layout.window.height - 220 }}>
        <View
          style={{
            height: 120,
            backgroundColor: "#f3f3f3",
            borderRadius: 10,
            margin: 10,
            shadowOffset: { width: 1, height: 1 },
            shadowColor: "black",
            shadowOpacity: 0.5,
          }}
        >
          <Image
            source={require("../../../assets/images/LogoApp/nhamay.jpg")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
        </View>

        <FlatList
          data={listAppRole}
          renderItem={({ item }) => {
            if (item.name === "CTVDocDongHoNuoc")
              return (
                <ItemRole
                  description={item.description}
                  listTypeRole={listCongViecCTVDocDongHoNuoc}
                />
              );

            if (item.name === "QuanLyHoSuDungNuoc")
              return (
                <ItemRole
                  description={item.description}
                  listTypeRole={listCongViecQuanLyHoSuDungNuoc}
                />
              );

            if (item.name === "QuanLyCongTy")
              return (
                <ItemRole
                  description={item.description}
                  listTypeRole={listCongViecQuanLyCongTy}
                />
              );

            return <View />;
          }}
        />
      </View>
    </View>
  );
}
