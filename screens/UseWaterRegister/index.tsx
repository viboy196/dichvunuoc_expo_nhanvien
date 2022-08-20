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
import { blueColorApp } from "../../constants/Colors";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { logOut } from "../../redux/features/auth/authSlices";
import {
  DistrictShow,
  ProvinceShow,
  WardShow,
} from "../../components/CompomentHelper";

const fields = [
  { key: "STT", title: "STT", width: 40 },
  { key: "unitTypeId", title: "Loại hình đơn vị", width: 100 },
  { key: "name", title: "Tên", width: 100 },
  { key: "mobilePhone", title: "Điện thoại di động", width: 100 },
  { key: "landlinePhone", title: "Điện thoại cố định", width: 100 },
  { key: "provinceId", title: "Tỉnh/Thành phố", width: 100 },
  { key: "districtId", title: "Quận/Huyện", width: 150 },
  { key: "wardId", title: "Phường/Xã", width: 150 },
  { key: "status", title: "Trạng thái", width: 100 },
  { key: "manipulation", title: "Thao tác", width: 150 },
];
export default function UseWaterRegister() {
  const dispatch = useAppDispatch();
  const tableHead = fields.map((field) => field.title);
  const widthArr = fields.map((field) => field.width);

  const { token } = useAppSelector((state) => state.auth);

  const [listUseWaterRegister, setListUseWaterRegister] =
    useState<Array<any>>();
  const [items, setItems] = useState<Array<Array<any>>>();
  let index = 0;

  useEffect(() => {
    if (token)
      ApiRequest.getAllUseWaterRegister(token)
        .then((res) => {
          if (res.code === "00") {
            setListUseWaterRegister(res.result.data);
            const datas = res.result.data as Array<any>;
            const data = datas.map((row) =>
              fields.map((field) => {
                if (field.key == "STT") {
                  index = index + 1;
                  return index;
                }
                if (field.key == "unitTypeId") {
                  return row[field.key] == "Individual" ? "Cá nhân" : "Cơ quan";
                }
                if (field.key == "provinceId") {
                  return <ProvinceShow id={row[field.key]} token={token} />;
                }
                if (field.key == "districtId") {
                  return <DistrictShow id={row[field.key]} token={token} />;
                }
                if (field.key == "wardId") {
                  return <WardShow id={row[field.key]} token={token} />;
                }

                if (field.key == "status") {
                  if (row[field.key] === "New") return "Mới";
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
                          Alert.alert("thông tin " + row.name);
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
      <ScrollView horizontal={true}>
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
    textAlign: "center",
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
