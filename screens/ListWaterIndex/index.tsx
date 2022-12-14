import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { Table, Row, Rows } from "react-native-table-component";
import { blueColorApp, textLight } from "../../constants/Colors";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { logOut } from "../../redux/features/auth/authSlices";
import { TollAreaShow, UnitTypeShow } from "../../components/CompomentHelper";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Layout from "../../constants/Layout";
import ModalImage from "./ModalImage";
import { RootStackScreenProps } from "../../navigation/types";

const fields = [
  { key: "STT", title: "STT", width: 40 },
  { key: "code", title: "Mã hợp đồng", width: 100 },
  { key: "name", title: "Đại diện hợp đồng", width: 150 },
  { key: "waterMeterCode", title: "Mã đồng hồ nước", width: 150 },
  { key: "tollAreaId", title: "Khu vực", width: 200 },
  { key: "waterMeterNumber", title: "Chỉ số đồng hồ", width: 100 },
  { key: "updatedAt", title: "Ngày đo", width: 150 },
  { key: "updatedBy", title: "Người đo", width: 200 },
  { key: "manipulation", title: "Thao tác", width: 150 },
];
export default function ListWaterUser({
  navigation,
}: RootStackScreenProps<"ListWaterIndex">) {
  const dispatch = useAppDispatch();
  const tableHead = fields.map((field) => field.title);
  const widthArr = fields.map((field) => field.width);

  const { token } = useAppSelector((state) => state.auth);

  const [listContract, setListContract] = useState<Array<any>>();
  const [items, setItems] = useState<Array<Array<any>>>();

  const [loading, setLoading] = useState<boolean>(true);

  const [visibleModaImage, setVisibleModaImage] = React.useState(false);

  const [urlImage, setUrlImage] = React.useState<string>();

  const showModal = (url: string) => {
    setUrlImage(url);
    setVisibleModaImage(true);
  };

  const hideModal = () => setVisibleModaImage(false);
  const fetchData = useCallback(() => {
    if (token) {
      setLoading(true);
      ApiRequest.getWaterIndexPage({
        token: token,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      })
        .then((res) => {
          setLoading(false);
          console.log(res);

          if (res.code === "00") {
            let index = 0;
            setListContract(res.result.data);
            const datas = res.result.data as Array<any>;
            const data = datas.map((row) => {
              console.log(row);
              return fields.map((field) => {
                if (field.key == "STT") {
                  index = index + 1;
                  return index;
                }
                if (
                  field.key == "code" ||
                  field.key == "name" ||
                  field.key == "waterMeterCode"
                ) {
                  return row.waterUser[field.key];
                }

                if (field.key == "tollAreaId") {
                  return (
                    <TollAreaShow token={token} id={row.waterUser[field.key]} />
                  );
                }

                if (field.key == "updatedAt") {
                  if (!row[field.key]) return "";
                  console.log("updatetime", row[field.key]);

                  const date = new Date(row[field.key]);
                  const txtDate = `${`0${date.getDate()}`.slice(-2)}/${`0${
                    date.getMonth() + 1
                  }`.slice(-2)}/${date.getFullYear()}`;
                  console.log("updatetime", row[field.key] + " " + txtDate);
                  const txtTime = `${`0${date.getUTCHours()}`.slice(
                    -2
                  )}:${`0${date.getMinutes()}`.slice(-2)}`;
                  const str = `${txtDate} - ${txtTime}`;
                  return str;
                }

                if (field.key == "manipulation") {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: 5,
                      }}
                    >
                      <View style={{ width: 5 }} />

                      <Button
                        title="Ảnh"
                        disabled={row.image === undefined || row.image === null}
                        color={"tomato"}
                        onPress={() => {
                          showModal(`http://lamviec.dichvunuoc.vn/resource/${row.image}`);
                        }}
                      />
                      <View style={{ width: 5 }} />

                      <Button
                        title="Ghi chỉ số"
                        color={"#20232a"}
                        onPress={() => {
                          navigation.navigate("CameraWaterScreen", {
                            waterUserId: row.waterUser.id,
                            waterMeterCode: row.waterUser.waterMeterCode,
                            waterUserAddress: row.waterUser.address,
                            waterUserName: row.waterUser.name,
                          });
                        }}
                      />
                      <View style={{ width: 15 }} />
                    </View>
                  );
                }
                // @ts-ignore
                return row[field.key];
              });
            });
            setItems(data);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
          dispatch(logOut());
        });
    }
  }, [token]);
  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, [fetchData, navigation]);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Spinner visible={loading} textStyle={{ color: "#FFF" }} />
      <ModalImage
        imageUri={urlImage}
        hideModal={hideModal}
        visibleModaImage={visibleModaImage}
      />

      <ScrollView horizontal={true} style={{}}>
        <View>
          <Table borderStyle={{ borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.headerText}
            />
          </Table>
          <View>
            <ScrollView
              style={styles.dataWrapper}
              //   ref={(table) => (this._last = table)}
            >
              <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                <Rows
                  data={items}
                  textStyle={styles.text}
                  widthArr={widthArr}
                  style={{
                    borderBottomColor: "#f0f0f0",
                    borderBottomWidth: 1,
                  }}
                />
              </Table>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#212732",
  },
  header: {
    height: 50,
    backgroundColor: blueColorApp,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "500",
    color: "white",
  },
  text: {
    color: "#000",
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: "#2c3445",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
