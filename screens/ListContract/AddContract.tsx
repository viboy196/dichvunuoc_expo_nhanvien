import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text, View } from "../../components/Themed";
import layout from "../../constants/Layout";
import { blueColorApp } from "../../constants/Colors";
import { Button, RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { WaterUser } from "../../utils/api/apiTypes";
import { useAppSelector } from "../../redux/store/hooks";
import TakePickture, { ImageItem } from "../../components/TakePicture";

export default function AddContract() {
  const { token } = useAppSelector((state) => state.auth);
  const [waterUser, setWaterUser] = useState<WaterUser>({});

  const [listBase64Image, setListBase64Image] = useState<Array<string>>([]);
  console.log("waterUser", waterUser);
  const [notificationMethodTypeChecker, setNotificationMethodTypeChecker] =
    useState<{
      Zalo?: boolean;
      Sms?: boolean;
      App?: Boolean;
    }>();
  const [paymentMethodChecker, setPaymentMethodChecker] = useState<{
    Bank?: boolean;
    Transfer?: boolean;
    EWallet?: Boolean;
    Manual?: Boolean;
  }>();

  const [ListUnitType, setListUnitType] = useState<Array<any>>();

  const [ListTollArea, setListTollArea] = useState<Array<any>>();
  const [openTakePicture, setOpenTakePicture] = useState<Boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (token) {
      ApiRequest.GetUnitTypeAll(token)
        .then((data) => {
          setListUnitType(data.result.data);
          console.log("GetUnitTypeAll get detail success");
        })
        .catch(() => {
          Alert.alert("Lỗi", "Tải loại hình đơn vị");
        });
      ApiRequest.GetTollAreaAll(token)
        .then((data) => {
          setListTollArea(data.result.data);
        })
        .catch(() => {
          Alert.alert("Lỗi", "Tải Khu vực");
        });
    }
  }, [token]);

  const UseWaterAdd = useCallback(() => {
    if (waterUser.code === undefined || waterUser.code === "") {
      Alert.alert("Trường Mã hợp đồng không được để trống");
      return;
    }
    if (waterUser.name === undefined || waterUser.name === "") {
      Alert.alert("Trường tên người đại diện không được để trống");
      return;
    }
    if (waterUser.tollAreaId === undefined || waterUser.tollAreaId === "") {
      Alert.alert("Trường Khu vực không được để trống");
      return;
    }
    setLoading(true);
    let notificationMethodTypeCheckerStr = "";
    for (const variable in notificationMethodTypeChecker) {
        // @ts-ignore
      if (notificationMethodTypeChecker[variable] == true) {
        notificationMethodTypeCheckerStr = `${variable};${notificationMethodTypeCheckerStr}`;
      } else {
        // @ts-ignore
        console.log(variable, notificationMethodTypeChecker[variable]);
      }
    }
    console.log(
      "notificationMethodTypeCheckerStr",
      notificationMethodTypeCheckerStr
    );
    let paymentMethodCheckerStr = "";
    for (const variable in paymentMethodChecker) {
        // @ts-ignore
      if (paymentMethodChecker[variable] == true) {
        paymentMethodCheckerStr = `${variable};${paymentMethodCheckerStr}`;
      } else {
        // @ts-ignore
        console.log(variable, paymentMethodChecker[variable]);
      }
    }
    console.log("paymentMethodCheckerStr", paymentMethodCheckerStr);

    if (token) {
      ApiRequest.PostWaterUserAdd(
        {
          ...waterUser,
          notificationMethod: notificationMethodTypeCheckerStr,
          paymentMethod: paymentMethodCheckerStr,
          images: listBase64Image ? listBase64Image : [],
        },
        token
      )
        .then((data) => {
          if (data.code === "00") {
            Alert.alert("Thông báo", "Thêm Thành công");
          } else {
            Alert.alert("Thông báo", data.errorMessage);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          Alert.alert("Lỗi", "có lỗi sảy ra");
        });
    }
  }, [
    listBase64Image,
    notificationMethodTypeChecker,
    paymentMethodChecker,
    token,
    waterUser,
  ]);
  if (openTakePicture) {
    return (
      <TakePickture
        onPressComplete={() => {
          setOpenTakePicture(false);
        }}
        listBase64Image={listBase64Image}
        setListBase64Image={setListBase64Image}
      />
    );
  }
  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <Spinner
          visible={true}
          textContent={"Loading ..."}
          textStyle={{ color: "#fff", fontSize: 20 }}
        />
      )}
      <ScrollView>
        <View style={{ margin: 10 }}>
          <Text
            style={{ color: blueColorApp, fontWeight: "bold", fontSize: 18 }}
          >
            Thông tin hợp đồng thêm mới
          </Text>
          {/* Mã Hợp Đồng */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Mã Hợp Đồng</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Mã Hợp Đồng"}
                onChangeText={(text) => {
                  setWaterUser((old) => {
                    return { ...old, code: text };
                  });
                }}
                value={waterUser.code}
              />
            </View>
          </View>
          {/* tên NGƯỜI ĐẠI DIỆN*/}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Tên người đại diện</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={" Nhập tên người đại diện"}
                onChangeText={(text) => {
                  setWaterUser((old) => {
                    return { ...old, name: text };
                  });
                }}
                value={waterUser.name}
              />
            </View>
          </View>
          {/* Tên đơn vị tổ chức*/}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Tên đơn vị tổ chức</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Nhập tên đơn vị tổ chức "}
                onChangeText={(text) => {
                  setWaterUser((old) => {
                    return { ...old, organization: text };
                  });
                }}
                value={waterUser.organization}
              />
            </View>
          </View>
          {/* Loại hình đơn vị */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Loại hình đơn vị</Text>
            <Picker
              style={styles.viewInput}
              placeholder="chọn Loại hình đơn vị"
              selectedValue={waterUser.unitTypeId}
              onValueChange={(itemValue, itemIndex) => {
                if (waterUser.unitTypeId !== itemValue) {
                  setWaterUser((old) => {
                    return { ...old, unitTypeId: itemValue };
                  });
                  console.log(itemIndex);
                }
              }}
            >
              <Picker.Item label={"chọn Loại hình đơn vị"} value={undefined} />
              {ListUnitType?.map((item) => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
          </View>
          {/* Trạng thái hoạt động */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Trạng thái hoạt động</Text>
            <Picker
              style={styles.viewInput}
              placeholder="chọn trạng thái hoạt động"
              selectedValue={waterUser.status}
              onValueChange={(itemValue, itemIndex) => {
                if (waterUser.status !== itemValue) {
                  setWaterUser((old) => {
                    return { ...old, status: itemValue };
                  });
                  console.log(itemIndex);
                }
              }}
            >
              <Picker.Item
                label={"chọn trạng thái hoạt động"}
                value={undefined}
              />

              <Picker.Item label={"Đang xử lý"} value={"Processing"} />

              <Picker.Item label={"Đang hoạt động"} value={"Active"} />

              <Picker.Item label={"Tạm dừng cấp nước"} value={"TempDisabled"} />

              <Picker.Item label={"Ngưng xử dụng"} value={"Disabled"} />
            </Picker>
          </View>
          {/* Khu vực */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Khu vực</Text>
            <Picker
              style={styles.viewInput}
              placeholder="Chọn Khu vực"
              selectedValue={waterUser.tollAreaId}
              onValueChange={(itemValue, itemIndex) => {
                if (waterUser.tollAreaId !== itemValue) {
                  setWaterUser((old) => {
                    return { ...old, tollAreaId: itemValue };
                  });
                  console.log(itemIndex);
                }
              }}
            >
              <Picker.Item label={"Chọn Khu vực"} value={undefined} />
              {ListTollArea?.map((item) => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
          </View>
          {/* điện thoại */}
          <View
            style={{ width: layout.window.width - 20, flexDirection: "row" }}
          >
            <View style={{ flex: 3, marginRight: 5 }}>
              <Text style={{ marginVertical: 5 }}>Điện thoại(*)</Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#e3e3e3",
                  paddingHorizontal: 10,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={{ width: "100%" }}
                  placeholder={"Di Động"}
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    setWaterUser((old) => {
                      return { ...old, phone: text };
                    });
                  }}
                  value={waterUser.phone}
                />
              </View>
            </View>
          </View>

          {/* TÀI KHOẢN NGÂN HÀNG */}
          <View
            style={{ width: layout.window.width - 20, flexDirection: "row" }}
          >
            <View style={{ flex: 3, marginRight: 5 }}>
              <Text style={{ marginVertical: 5 }}>Tài khoản ngân hàng</Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#e3e3e3",
                  paddingHorizontal: 10,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={{ width: "100%" }}
                  placeholder={"Số tài khoản"}
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    setWaterUser((old) => {
                      return { ...old, bankNo: text };
                    });
                  }}
                  value={waterUser.bankNo}
                />
              </View>
            </View>
            <View style={{ flex: 3, marginRight: 5 }}>
              <Text style={{ marginVertical: 5 }} />
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#e3e3e3",
                  paddingHorizontal: 10,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={{ width: "100%" }}
                  placeholder={"Tên ngân hàng"}
                  keyboardType={"default"}
                  onChangeText={(text) => {
                    setWaterUser((old) => {
                      return { ...old, bank: text };
                    });
                  }}
                  value={waterUser.bank}
                />
              </View>
            </View>
          </View>
          {/* Mã Đồng hồ nước */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Mã đồng hồ nước</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Nhập mã"}
                onChangeText={(text) => {
                  setWaterUser((old) => {
                    return { ...old, waterMeterCode: text };
                  });
                }}
                value={waterUser.waterMeterCode}
              />
            </View>
          </View>
          {/* Chọn hình thức thông báo  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Chọn hình thức thông báo</Text>
            <View style={styles.viewInput}>
              <Text>Zalo</Text>
              <RadioButton
                value="Zalo"
                status={
                  notificationMethodTypeChecker?.Zalo ? "checked" : "unchecked"
                }
                onPress={() => {
                  setNotificationMethodTypeChecker((old) => {
                    return { ...old, Zalo: !old?.Zalo };
                  });
                }}
              />
              <Text>Sms</Text>
              <RadioButton
                value="second"
                status={
                  notificationMethodTypeChecker?.Sms ? "checked" : "unchecked"
                }
                onPress={() =>
                  setNotificationMethodTypeChecker((old) => {
                    return { ...old, Sms: !old?.Sms };
                  })
                }
              />
              <Text>Ứng dụng</Text>
              <RadioButton
                value="second"
                status={
                  notificationMethodTypeChecker?.App ? "checked" : "unchecked"
                }
                onPress={() =>
                  setNotificationMethodTypeChecker((old) => {
                    return { ...old, App: !old?.App };
                  })
                }
              />
            </View>
          </View>
          {/* Chọn hình thức thanh toán  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Chọn hình thức thanh toán</Text>

            <ScrollView horizontal={true}>
              <View style={styles.viewInput}>
                <Text>Trừ nợ qua ngân hàng</Text>
                <RadioButton
                  value="first"
                  status={paymentMethodChecker?.Bank ? "checked" : "unchecked"}
                  onPress={() =>
                    setPaymentMethodChecker((old) => {
                      return { ...old, Bank: !old?.Bank };
                    })
                  }
                />
                <Text>Chuyển Khoản</Text>
                <RadioButton
                  value="second"
                  status={
                    paymentMethodChecker?.Transfer ? "checked" : "unchecked"
                  }
                  onPress={() =>
                    setPaymentMethodChecker((old) => {
                      return { ...old, Transfer: !old?.Transfer };
                    })
                  }
                />
                <Text>Ví điện tử</Text>
                <RadioButton
                  value="second"
                  status={
                    paymentMethodChecker?.EWallet ? "checked" : "unchecked"
                  }
                  onPress={() =>
                    setPaymentMethodChecker((old) => {
                      return { ...old, EWallet: !old?.EWallet };
                    })
                  }
                />
                <Text>Nộp trực tiếp</Text>
                <RadioButton
                  value="second"
                  status={
                    paymentMethodChecker?.Manual ? "checked" : "unchecked"
                  }
                  onPress={() =>
                    setPaymentMethodChecker((old) => {
                      return { ...old, Manual: !old?.Manual };
                    })
                  }
                />
              </View>
            </ScrollView>
          </View>
          {/* Địa chỉ  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Địa chỉ</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Nhập Nhập địa chỉ"}
                onChangeText={(text) =>
                  setWaterUser((old) => {
                    return { ...old, address: text };
                  })
                }
                value={waterUser.address}
              />
            </View>
          </View>
          {/* Tài Khoản đại diện  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Tài khoản đại diện</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Nhập Nhập tài khoản đại diện"}
                onChangeText={(text) =>
                  setWaterUser((old) => {
                    return { ...old, userName: text };
                  })
                }
                value={waterUser.userName}
              />
            </View>
          </View>

          {/* Thêm ảnh Hợp đồng  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Thêm ảnh chụp hợp đồng</Text>
            <View style={styles.viewInput}>
              <View style={{ width: 120 }}>
                <Button
                  mode="contained"
                  icon={"camera"}
                  onPress={() => {
                    setOpenTakePicture(true);
                  }}
                >
                  Chụp Ảnh
                </Button>
              </View>
              <FlatList
                horizontal={true}
                data={listBase64Image}
                renderItem={({ item, index }) => (
                  <ImageItem
                    base64Image={item}
                    onPressDelete={() => {
                      console.log("index", index);

                      setListBase64Image((old) => {
                        const newold = [];
                        for (var i: number = 0; i < old.length; i++) {
                          if (i !== index) {
                            newold.push(old[i]);
                          }
                        }

                        return newold;
                      });
                    }}
                  />
                )}
              />
            </View>
          </View>

          <Button
            style={{
              marginTop: 5,
              borderRadius: 10,
              backgroundColor: blueColorApp,
            }}
            mode="contained"
            onPress={UseWaterAdd}
          >
            Thêm mới
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInput: {
    borderRadius: 10,
    backgroundColor: "#e3e3e3",
    paddingHorizontal: 10,
    flexDirection: "row",
    marginVertical: 2,
    alignItems: "center",
  },
});
