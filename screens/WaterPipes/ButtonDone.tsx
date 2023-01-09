import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Layout from "../../constants/Layout";
import { blueColorApp, textLight } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Menu, Provider } from "react-native-paper";
import Select from "../../components/Item/Select";
import { TypePoint } from "../../redux/features/PointsSlice";

export default function ButtonDone(props: {
  onPress: () => void;
  onCance: () => void;
  staTusPointSelect?: 1 | 2 | 3 | 4;
  setWidthShow: React.Dispatch<React.SetStateAction<number>>;
  setPointShow: React.Dispatch<React.SetStateAction<TypePoint | undefined>>;
}) {
  const { onPress, staTusPointSelect } = props;
  const [isSelectClass, setIsSelectClass] = useState<boolean>(false);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        width: Layout.window.width,
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <View>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            backgroundColor: blueColorApp,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginLeft: 5,
          }}
          onPress={props.onPress}
        >
          <Text style={{ color: "white" }}>
            {staTusPointSelect === 1 ? "Xác nhận" : "Thêm điểm"}
          </Text>
        </TouchableOpacity>
        {staTusPointSelect && (
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 8,
              backgroundColor: blueColorApp,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginLeft: 5,
            }}
            onPress={props.onCance}
          >
            <Text style={{ color: "white" }}>Hủy</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 1 }} />
      <View
        style={{
          padding: 10,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: blueColorApp,
          }}
          onPress={() => setIsSelectClass(!isSelectClass)}
        >
          <Text style={{ color: "white" }}>Tùy chọn xem</Text>
        </TouchableOpacity>
        {isSelectClass && (
          <>
            <View
              style={{
                marginTop: 5,
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  color: textLight,
                  textAlign: "right",
                }}
              >
                Chọn Loại Đường ống
              </Text>

              <Select
                listValueSelect={[
                  "Tất cả",
                  "Tuyến ống nước thô",
                  "Ống truyền tải",
                  "Ống phân phối",
                  "Ống dịch vụ",
                ]}
                onPressItem={(text) => {
                  if (text === "Tất cả") {
                    props.setWidthShow(-1);
                  }
                  if (text === "Tuyến ống nước thô") {
                    props.setWidthShow(5);
                  }
                  if (text === "Ống truyền tải") {
                    props.setWidthShow(4);
                  }
                  if (text === "Ống phân phối") {
                    props.setWidthShow(3);
                  }
                  if (text === "Ống dịch vụ") {
                    props.setWidthShow(2);
                  }
                }}
                placeholder={"Chọn Loại đường ống"}
              />
            </View>

            <View
              style={{
                marginTop: 5,
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  color: textLight,
                  textAlign: "right",
                }}
              >
                Chọn Loại điểm
              </Text>
              <Select
                listValueSelect={[
                  "Tất cả",
                  "Đồng hồ hộ dân",
                  "Đồng hồ doanh nghiệp",
                  "Đồng hồ tổng nhánh",
                  "Đồng hồ tổng tuyến",
                ]}
                onPressItem={(text) => {
                  if (text === "Tất cả") {
                    props.setPointShow(undefined);
                  }
                  if (text === "Đồng hồ hộ dân") {
                    props.setPointShow("Đồng hồ hộ dân");
                  }
                  if (text === "Đồng hồ doanh nghiệp") {
                    props.setPointShow("Đồng hồ doanh nghiệp");
                  }
                  if (text === "Đồng hồ tổng nhánh") {
                    props.setPointShow("Đồng hồ tổng nhánh");
                  }

                  if (text === "Đồng hồ tổng tuyến") {
                    props.setPointShow("Đồng hồ tổng tuyến");
                  }
                }}
                placeholder={"Chọn loại điểm"}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
