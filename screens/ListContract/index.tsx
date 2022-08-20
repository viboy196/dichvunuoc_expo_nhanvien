import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Table, Row, Rows } from "react-native-table-component";
import { blueColorApp, textLight } from "../../constants/Colors";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { logOut } from "../../redux/features/auth/authSlices";
import { TollAreaShow, UnitTypeShow } from "../../components/CompomentHelper";
import { RootStackScreenProps } from "../../navigation/types";

const fields = [
  { key: "STT", title: "STT", width: 40 },
  { key: "code", title: "Mã HĐ", width: 100 },
  { key: "name", title: "Đại diện HĐ", width: 150 },
  { key: "organization", title: "Tên tổ chức", width: 150 },
  { key: "userName", title: "TK đại diện", width: 100 },
  { key: "tollAreaId", title: "Khu vực", width: 150 },
  { key: "unitTypeId", title: "Loại hình đơn vị", width: 350 },
  { key: "waterMeterCode", title: "Mã đồng hồ nước", width: 150 },
  { key: "status", title: "Trạng thái", width: 100 },
  { key: "manipulation", title: "Thao tác", width: 550 },
];
export default function ListConTract({
  navigation,
}: RootStackScreenProps<"ListContract">) {
  const dispatch = useAppDispatch();
  const tableHead = fields.map((field) => field.title);
  const widthArr = fields.map((field) => field.width);

  const { token } = useAppSelector((state) => state.auth);

  const [listContract, setListContract] = useState<Array<any>>();
  const [items, setItems] = useState<Array<Array<any>>>();
  let index = 0;

  useEffect(() => {
    if (token)
      ApiRequest.getWaterUserAll(token)
        .then((res) => {
          if (res.code === "00") {
            setListContract(res.result.data);
            const datas = res.result.data as Array<any>;
            const data = datas.map((row) =>
              fields.map((field) => {
                if (field.key == "STT") {
                  index = index + 1;
                  return index;
                }
                if (field.key == "unitTypeId") {
                  //   return row[field.key] == "Individual" ? "Cá nhân" : "Cơ quan";
                }
                if (field.key == "status") {
                  if (row[field.key] === "Active") return "Đang sử dụng";
                }

                if (field.key == "tollAreaId") {
                  return <TollAreaShow token={token} id={row[field.key]} />;
                }

                if (field.key == "unitTypeId") {
                  return <UnitTypeShow token={token} id={row[field.key]} />;
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
                      <Button
                        title="thông tin"
                        color={"#20232a"}
                        onPress={() => {
                          navigation.navigate("DetailContract", {
                            waterUser: row,
                          });
                        }}
                      />
                      <View style={{ width: 5 }} />

                      <Button
                        title="Xóa"
                        color={"tomato"}
                        onPress={() => {
                          Alert.alert("xóa " + row.name);
                        }}
                      />

                      <View style={{ width: 25 }} />
                    </View>
                  );
                }
                // @ts-ignore
                return row[field.key];
              })
            );
            setItems(data);
          }
        })
        .catch((error) => {
          console.log("error", error);
          dispatch(logOut());
        });
  }, [token]);
  useEffect(() => {});
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ width: 150, padding: 10 }}>
        <Button
          title="+ Thêm "
          color={"green"}
          onPress={() => {
            navigation.navigate("AddContract");
          }}
        />
      </View>
      <ScrollView horizontal={true} style={{ paddingHorizontal: 10 }}>
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
                    paddingHorizontal: 10,
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
});
