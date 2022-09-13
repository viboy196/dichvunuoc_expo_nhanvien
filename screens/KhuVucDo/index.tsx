import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { Text, View } from "../../components/Themed";
import { RootStackScreenProps } from "../../navigation/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { logOut } from "../../redux/features/auth/authSlices";
import { blueColorApp } from "../../constants/Colors";
import { _Location } from "../AreaMap";
import { getLocation } from "../../utils/helper";
export default function KhuVucDoScreen({
  navigation,
  route,
}: RootStackScreenProps<"KhuVucDoScreen">) {
  const [loading, setLoading] = useState<boolean>(true);
  console.log("tollAreaId", route.params.tollAreaId);

  const tag = "DoNuoc";
  const { token } = useAppSelector((state) => state.auth);
  const [waterUser, setwaterUser] = useState<Array<any>>([]);
  const [listLocationContract, setListLocationContract] = useState<
    Array<_Location>
  >([]);
  console.log(tag, route.params.tollAreaId);
  useEffect(() => {
    waterUser.forEach((item) => {
      setListLocationContract((old) => {
        return [...old, getLocation(item.gps, item.name)];
      });
    });
  }, [waterUser]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      ApiRequest.getWaterUserAllByTollarea({
        token: token,
        tollAreaId: route.params.tollAreaId,
      })
        .then((data) => {
          setwaterUser(data.result.data);
          console.log(tag, "fetch success");
          setLoading(false);
        })
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, [dispatch, route.params.tollAreaId, token]);
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Xem bản đồ"
        color={blueColorApp}
        onPress={() => {
          if (route.params.location)
            navigation.navigate("AreaMap", {
              locationArea: route.params.location,
              listLocationContract: listLocationContract,
            });
        }}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Tên hộ</DataTable.Title>
          <DataTable.Title>Số điện thoại</DataTable.Title>
          <DataTable.Title>Địa chỉ</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={waterUser}
          renderItem={({ item }) => (
            <DataTable.Row
              onPress={() => {
                navigation.navigate("ChiTietSoDoScreen", {
                  waterUserId: item.id,
                  waterUserName: item.name,
                  waterMeterCode: item.waterMeterCode,
                });
              }}
            >
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.phone}</DataTable.Cell>
              <DataTable.Cell>{item.address}</DataTable.Cell>
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
