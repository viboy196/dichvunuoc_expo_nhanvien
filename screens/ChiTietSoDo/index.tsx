import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { Button, DataTable } from "react-native-paper";

import { View } from "../../components/Themed";

import { RootStackScreenProps } from "../../navigation/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { logOut } from "../../redux/features/auth/authSlices";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { blueColorApp } from "../../constants/Colors";
// import {RootStackScreenProps} from '../../navigation/types';
export default function ChiTietSoDoScreen({
  navigation,
  route,
}: RootStackScreenProps<"ChiTietSoDoScreen">) {
  const [loading, setLoading] = useState<boolean>(true);
  console.log("tollAreaId", route.params.waterUserId);

  const tag = "ChiTietSoDoScreen";
  const { token } = useAppSelector((state) => state.auth);
  const [waterIndex, setWaterIndex] = useState<Array<any>>([]);
  console.log(tag, route.params.waterUserId);

  const dispatch = useAppDispatch();
  const fetchData = useCallback(() => {
    if (token) {
      ApiRequest.WaterIndexAllByWaterUser({
        token: token,
        waterUserId: route.params.waterUserId,
      })
        .then((data) => {
          setWaterIndex(data.result.data);
          console.log(tag, "fetch success");
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          dispatch(logOut());
        });
    }
  }, [dispatch, route.params.waterUserId, token]);
  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, [fetchData, navigation]);

  return (
    <View style={styles.container}>
      {loading && (
        <Spinner
          visible={true}
          textContent={"Loading ..."}
          textStyle={{ color: "#fff", fontSize: 20 }}
        />
      )}
      <Button
        mode="contained"
        icon={"camera"}
        color={blueColorApp}
        onPress={() => {
          navigation.navigate("CameraWaterScreen", {
            waterUserId: route.params.waterUserId,
            waterUserName: route.params.waterUserName,
            waterMeterCode: route.params.waterMeterCode,
          });
        }}
      >
        Quét số nước
      </Button>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Tháng đo</DataTable.Title>
          <DataTable.Title>Chỉ số đồng hồ đo</DataTable.Title>
          <DataTable.Title>Tác vụ</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={waterIndex}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell>
                {item.month}/{item.year}
              </DataTable.Cell>
              <DataTable.Cell>{item.waterMeterNumber}</DataTable.Cell>
              <DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    mode="contained"
                    onPress={() => {
                      Alert.alert("thông báo", "tính năng đang cập nhật");
                    }}
                    color={blueColorApp}
                  >
                    Chi tiết
                  </Button>
                </DataTable.Cell>
              </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerView: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  titleText: {
    marginLeft: 20,
    fontSize: 24,
  },
  empty: {
    flex: 1,
  },
});
