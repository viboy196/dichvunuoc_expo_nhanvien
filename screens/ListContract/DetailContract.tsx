import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
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
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import TakePickture, { ImageItem } from "../../components/TakePicture";
import { RootStackScreenProps } from "../../navigation/types";
import SelectGPS from "../../components/SelectGPS";
import { Region } from "react-native-maps";
import Device from "expo-device";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as Location from "expo-location";
import { logOut } from "../../redux/features/auth/authSlices";

// import fs from 'react-native-fs';
export default function DetailContract({
  route,
}: RootStackScreenProps<"DetailContract">) {
  const { token } = useAppSelector((state) => state.auth);
  const [waterUser, setWaterUser] = useState<WaterUser>(route.params.waterUser);
  console.log("waterUser", waterUser);

  const [listBase64Image, setListBase64Image] = useState<Array<string>>([]);
  const [listImage, setListImage] = useState<Array<string>>([]);

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

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (waterUser.images) {
      let arr = (waterUser.images as string).split(";");
      arr.forEach(async (element, index) => {
        const url = `http://lamviec.dichvunuoc.vn/resource/${element}`;
        console.log("imageurl", url);

        setListImage((old) => [...old, url]);
      });
    }
    const Zalo =
      waterUser.notificationMethod?.search("Zalo") !== undefined &&
      waterUser.notificationMethod?.search("Zalo") > -1;
    const Sms =
      waterUser.notificationMethod?.search("Sms") !== undefined &&
      waterUser.notificationMethod?.search("Sms") > -1;
    const App =
      waterUser.notificationMethod?.search("App") !== undefined &&
      waterUser.notificationMethod?.search("App") > -1;
    setNotificationMethodTypeChecker({ App, Sms, Zalo });
    const Bank =
      waterUser.paymentMethod?.search("Bank") !== undefined &&
      waterUser.paymentMethod?.search("Bank") > -1;

    const Transfer =
      waterUser.paymentMethod?.search("Transfer") !== undefined &&
      waterUser.paymentMethod?.search("Transfer") > -1;

    const EWallet =
      waterUser.paymentMethod?.search("EWallet") !== undefined &&
      waterUser.paymentMethod?.search("EWallet") > -1;

    const Manual =
      waterUser.paymentMethod?.search("Manual") !== undefined &&
      waterUser.paymentMethod?.search("Manual") > -1;
    setPaymentMethodChecker({ Bank, EWallet, Manual, Transfer });
  }, [waterUser.notificationMethod, waterUser.paymentMethod]);
  // useEffect(() => {
  //   let arrimage = [];
  //   route.params.waterUser.images?.forEach(url => {
  //     var imageAsBase64 = await fs.readFileSync(
  //       require(`http://lamviec.dichvunuoc.vn/Resource/${url}`),
  //       'base64',
  //     );

  //   });
  // });
  const [ListUnitType, setListUnitType] = useState<Array<any>>();

  const [ListTollArea, setListTollArea] = useState<Array<any>>();
  const [openTakePicture, setOpenTakePicture] = useState<Boolean>(false);

  const [openScreenGPS, setOpenScreenGPS] = useState<Boolean>(false);
  const [region, setRegion] = useState<Region>();

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (token) {
      ApiRequest.GetUnitTypeAll(token)
        .then((data) => {
          setListUnitType(data.result.data);
          console.log("GetUnitTypeAll get detail success");
        })
        .catch(() => {
          Alert.alert("L???i", "T???i lo???i h??nh ????n v???");
        });
      ApiRequest.GetTollAreaAll(token)
        .then((data) => {
          setListTollArea(data.result.data);
        })
        .catch(() => {
          Alert.alert("L???i", "T???i Khu v???c");
        });
    }
  }, [token]);

  const UseWaterPostImage = () => {
    setLoading(true);
    console.log(
      "UseWaterPostImage waterUser.id",
      waterUser.id,
      listBase64Image.length
    );

    if (token && waterUser.id && listBase64Image.length > 0) {
      ApiRequest.PostWaterUserUpdateImage(
        {
          id: waterUser.id,
          images: listBase64Image,
        },
        token
      )
        .then((data) => {
          if (data.code === "00") {
          } else {
            Alert.alert("Th??ng b??o", data.errorMessage);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert("L???i", error);
          //dispatch(logOut());
        });
    }
  };
  const UseWaterUpdate = () => {
    UseWaterPostImage();
    if (waterUser.code === undefined || waterUser.code === "") {
      Alert.alert("Tr?????ng M?? h???p ?????ng kh??ng ???????c ????? tr???ng");
      return;
    }
    if (waterUser.name === undefined || waterUser.name === "") {
      Alert.alert("Tr?????ng t??n ng?????i ?????i di???n kh??ng ???????c ????? tr???ng");
      return;
    }
    if (waterUser.tollAreaId === undefined || waterUser.tollAreaId === "") {
      Alert.alert("Tr?????ng Khu v???c kh??ng ???????c ????? tr???ng");
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
      ApiRequest.PostWaterUserUpdate(
        {
          ...waterUser,
          notificationMethod: notificationMethodTypeCheckerStr,
          paymentMethod: paymentMethodCheckerStr,
        },
        token
      )
        .then((data) => {
          if (data.code === "00") {
            Alert.alert("Th??ng b??o", "C???p nh???t Th??nh c??ng");
          } else {
            Alert.alert("Th??ng b??o", data.errorMessage);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          Alert.alert("L???i", "c?? l???i s???y ra");
          dispatch(logOut());
        });
    }
  };

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
  if (openScreenGPS) {
    return (
      <SelectGPS
        name={waterUser.name}
        region={region}
        setRegion={setRegion}
        onPressDone={() => {
          Alert.alert("X??c Nh???n", "X??c nh???n v??? tr?? ???????c ch???n", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                setWaterUser((old) => {
                  setOpenScreenGPS(false);
                  return {
                    ...old,
                    gps: `${region?.latitude},${region?.longitude}`,
                  };
                });
              },
            },
          ]);
        }}
        onPressClose={() => {
          setOpenScreenGPS(false);
        }}
        gps={waterUser.gps ? waterUser.gps : undefined}
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
            Th??ng tin h???p ?????ng th??m m???i
          </Text>
          {/* M?? H???p ?????ng */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>M?? H???p ?????ng</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"M?? H???p ?????ng"}
                onChangeText={(text) => {
                  setWaterUser((old) => {
                    return { ...old, code: text };
                  });
                }}
                value={waterUser.code}
              />
            </View>
          </View>
          {/* t??n NG?????I ?????I DI???N*/}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>T??n ng?????i ?????i di???n</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={" Nh???p t??n ng?????i ?????i di???n"}
                onChangeText={(text) => {
                  setWaterUser((old) => {
                    return { ...old, name: text };
                  });
                }}
                value={waterUser.name}
              />
            </View>
          </View>
          {/* T??n ????n v??? t??? ch???c*/}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>T??n ????n v??? t??? ch???c</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Nh???p t??n ????n v??? t??? ch???c "}
                onChangeText={(text) => {
                  setWaterUser((old) => {
                    return { ...old, organization: text };
                  });
                }}
                value={waterUser.organization}
              />
            </View>
          </View>
          {/* Lo???i h??nh ????n v??? */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Lo???i h??nh ????n v???</Text>
            <Picker
              style={styles.viewInput}
              placeholder="ch???n Lo???i h??nh ????n v???"
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
              <Picker.Item label={"ch???n Lo???i h??nh ????n v???"} value={undefined} />
              {ListUnitType?.map((item) => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
          </View>
          {/* Tr???ng th??i ho???t ?????ng */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Tr???ng th??i ho???t ?????ng</Text>
            <Picker
              style={styles.viewInput}
              placeholder="ch???n tr???ng th??i ho???t ?????ng"
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
                label={"ch???n tr???ng th??i ho???t ?????ng"}
                value={undefined}
              />

              <Picker.Item label={"??ang x??? l??"} value={"Processing"} />

              <Picker.Item label={"??ang ho???t ?????ng"} value={"Active"} />

              <Picker.Item label={"T???m d???ng c???p n?????c"} value={"TempDisabled"} />

              <Picker.Item label={"Ng??ng x??? d???ng"} value={"Disabled"} />
            </Picker>
          </View>
          {/* Khu v???c */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Khu v???c</Text>
            <Picker
              style={styles.viewInput}
              placeholder="Ch???n Khu v???c"
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
              <Picker.Item label={"Ch???n Khu v???c"} value={undefined} />
              {ListTollArea?.map((item) => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
          </View>
          {/* ??i???n tho???i */}
          <View
            style={{ width: layout.window.width - 20, flexDirection: "row" }}
          >
            <View style={{ flex: 3, marginRight: 5 }}>
              <Text style={{ marginVertical: 5 }}>??i???n tho???i(*)</Text>
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
                  placeholder={"Di ?????ng"}
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

          {/* T??I KHO???N NG??N H??NG */}
          <View
            style={{ width: layout.window.width - 20, flexDirection: "row" }}
          >
            <View style={{ flex: 3, marginRight: 5 }}>
              <Text style={{ marginVertical: 5 }}>T??i kho???n ng??n h??ng</Text>
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
                  placeholder={"S??? t??i kho???n"}
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
                  placeholder={"T??n ng??n h??ng"}
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
          {/* M?? ?????ng h??? n?????c */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>M?? ?????ng h??? n?????c</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Nh???p m??"}
                onChangeText={(text) => {
                  setWaterUser((old) => {
                    return { ...old, waterMeterCode: text };
                  });
                }}
                value={waterUser.waterMeterCode}
              />
            </View>
          </View>
          {/* Ch???n h??nh th???c th??ng b??o  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Ch???n h??nh th???c th??ng b??o</Text>
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
              <Text>???ng d???ng</Text>
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
          {/* Ch???n h??nh th???c thanh to??n  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Ch???n h??nh th???c thanh to??n</Text>

            <ScrollView horizontal={true}>
              <View style={styles.viewInput}>
                <Text>Tr??? n??? qua ng??n h??ng</Text>
                <RadioButton
                  value="first"
                  status={paymentMethodChecker?.Bank ? "checked" : "unchecked"}
                  onPress={() =>
                    setPaymentMethodChecker((old) => {
                      return { ...old, Bank: !old?.Bank };
                    })
                  }
                />
                <Text>Chuy???n Kho???n</Text>
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
                <Text>V?? ??i???n t???</Text>
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
                <Text>N???p tr???c ti???p</Text>
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
          {/* ?????a ch???  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>?????a ch???</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Nh???p Nh???p ?????a ch???"}
                onChangeText={(text) =>
                  setWaterUser((old) => {
                    return { ...old, address: text };
                  })
                }
                value={waterUser.address}
              />
            </View>
          </View>

          {/* GPS  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>GPS</Text>
            <View style={styles.viewInput}>
              <View style={{ backgroundColor: "tranparents" }}>
                <Text style={{ paddingVertical: 5 }}>{waterUser.gps}</Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    setOpenScreenGPS(true);
                  }}
                  color={blueColorApp}
                >
                  Ch???n v??? tr??
                </Button>
              </View>
            </View>
          </View>

          {/* T??i Kho???n ?????i di???n  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>T??i kho???n ?????i di???n</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Nh???p Nh???p t??i kho???n ?????i di???n"}
                onChangeText={(text) =>
                  setWaterUser((old) => {
                    return { ...old, userName: text };
                  })
                }
                value={waterUser.userName}
              />
            </View>
          </View>

          {/* Th??m ???nh H???p ?????ng  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Th??m ???nh ch???p h???p ?????ng</Text>
            <View style={styles.viewInput}>
              <View style={{ flexDirection: "column" }}>
                <View style={{ width: 120 }}>
                  <Button
                    mode="contained"
                    icon={"camera"}
                    onPress={() => {
                      setOpenTakePicture(true);
                    }}
                    color={blueColorApp}
                  >
                    Ch???p ???nh
                  </Button>
                </View>
              </View>
              {listImage && listBase64Image.length == 0 && (
                <FlatList
                  horizontal={true}
                  data={listImage}
                  renderItem={({ item, index }) => (
                    <ImageItem
                      uri={item}
                      // onPressDelete={() => {
                      //   console.log("index", index);

                      //   setListBase64Image((old) => {
                      //     const newold = [];
                      //     for (var i: number = 0; i < old.length; i++) {
                      //       if (i !== index) {
                      //         newold.push(old[i]);
                      //       }
                      //     }

                      //     return newold;
                      //   });
                      // }}
                    />
                  )}
                />
              )}
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
            onPress={UseWaterUpdate}
          >
            Ghi Nh???n
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
