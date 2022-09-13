import { Text, View } from "../../components/Themed";
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { blueColorApp } from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { RootStackScreenProps } from "../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { logOut } from "../../redux/features/auth/authSlices";
import ReadMeterPeriodItem from "./ReadMeterPeriodItem";
import { getLocation } from "../../utils/helper";

export default function ReadMeterPeriodScreen({
  navigation,
  route,
}: RootStackScreenProps<"ReadMeterPeriod">) {
  const tag = "ReadMeterPeriod";
  const { token, userName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [ListReadMeterPeriod, setListReadMeterPeriod] = useState<Array<any>>(
    []
  );
  console.log(ListReadMeterPeriod);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageIndex, setPageIndex] = useState<number>(1);

  useEffect(() => {
    if (token && userName) {
      ApiRequest.getReadMeterPeriodPageByReader(
        token,
        route.params.year,
        route.params.month,
        pageIndex
      )
        .then((data) => {
          setListReadMeterPeriod(data.result.data);
          console.log(`${tag} get detail success`);
          setLoading(false);
        })
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, [
    dispatch,
    pageIndex,
    route.params.month,
    route.params.year,
    token,
    userName,
  ]);
  if (!loading && ListReadMeterPeriod.length < 1) {
    return (
      <View style={styles.container}>
        <Text>Không có lịch đọc nước</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <Spinner
          visible={true}
          textContent={"Loading ..."}
          textStyle={{ color: "#fff", fontSize: 20 }}
        />
      )}

      <FlatList
        data={ListReadMeterPeriod}
        renderItem={({ item }) => (
          <ReadMeterPeriodItem
            areaName={item.tollArea.name}
            tongho={item.waterUserTotal}
            hodo={item.waterIndexTotal}
            onPress={() => {
              navigation.navigate("KhuVucDoScreen", {
                tollAreaId: item.tollArea.id,
                tollAreaName: item.tollArea.name,
                location: getLocation(item.tollArea.gps, item.tollArea.name),
              });
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  header: {
    backgroundColor: blueColorApp,
    width: "100%",
    height: 90,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    top: -38,
    left: 20,
    position: "absolute",
    marginTop: 5,
    fontSize: 28,
    fontWeight: "800",
    color: blueColorApp,
    // textShadowOffset: {width: 2, height: 2},
    // textShadowRadius: 5,
    // textShadowColor: '#fff',
  },
  avatarView: {
    margin: 5,
    width: 75,
    height: 75,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#fff",
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "orange",
    position: "relative",
  },
  avatarImage: {
    width: 75,
    height: 75,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
  },
});
