import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { blueColorApp, textLight } from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import ApiRequest from "../../../utils/api/Main/ApiRequest";
import { logOut } from "../../../redux/features/auth/authSlices";
import Spinner from "react-native-loading-spinner-overlay/lib";
export default function InfoDetail() {
  const tag = "Bill";
  const { token, userName } = useAppSelector((state) => state.auth);
  const [userDetail, setUserDetail] = useState<any>({});

  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token && userName) {
      ApiRequest.DetailInfoNguoiDung(token, userName)
        .then((data) => {
          setLoading(false);
          setUserDetail(data.result);
          console.log(`${tag} get detail success`);
        })
        .catch(() => {
          setLoading(false);
          dispatch(logOut());
        });
    }
  }, [dispatch, userName, token]);
  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={loading}
        textContent={"Loading ..."}
        textStyle={{ color: "#fff", fontSize: 20 }}
      />
      <View style={styles.items}>
        <View style={styles.viewItemImage}>
          <Ionicons
            // @ts-ignore
            name={"call"}
            size={28}
            color={"#fff"}
          />
        </View>
        <View style={styles.viewItemText}>
          <Text style={styles.itemText}> Số điện thoại </Text>
          <Text style={{ color: textLight, fontSize: 16 }}>
            {" "}
            {userDetail.userName}
          </Text>
        </View>
      </View>
      <View style={styles.items}>
        <View style={styles.viewItemImage}>
          <Ionicons
            // @ts-ignore
            name={"person"}
            size={28}
            color={"#fff"}
          />
        </View>
        <View style={styles.viewItemText}>
          <Text style={styles.itemText}> Tên đầy đủ </Text>
          <Text style={{ color: textLight, fontSize: 16 }}>
            {" "}
            {userDetail.fullName}
          </Text>
        </View>
      </View>
      <View style={styles.items}>
        <View style={styles.viewItemImage}>
          <Ionicons
            // @ts-ignore
            name={"card"}
            size={28}
            color={"#fff"}
          />
        </View>
        <View style={styles.viewItemText}>
          <Text style={styles.itemText}> Căn cước công dân </Text>
          <Text style={{ color: textLight, fontSize: 16 }}>
            {" "}
            {userDetail.cccd}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewItemImage: {
    width: 75,
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    backgroundColor: blueColorApp,
    borderRadius: 75,
    marginRight: 10,
    marginLeft: 10,
  },
  itemImage: {
    width: 35,
    height: 35,
    tintColor: "#fff",
  },
  items: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  viewItemText: {
    flex: 6,
    justifyContent: "center",
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d86ff",
  },
});
