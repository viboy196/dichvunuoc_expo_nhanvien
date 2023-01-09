import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Divider,
  Menu,
  Modal,
  Portal,
  Provider,
  TextInput,
} from "react-native-paper";
import Layout from "../../constants/Layout";
import { blueColorApp } from "../../constants/Colors";
import {
  addPoint,
  PointType,
  TypePoint,
  updatePoint,
} from "../../redux/features/PointsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { Ionicons } from "@expo/vector-icons";
import { removeAllModel } from "../../redux/features/ModelSlides";

export default function ModalSelectPoint(props: {
  visible: boolean;
  hideModal: () => void;
  latitude: number;
  longitude: number;
  isEdit?: boolean;
  pointSelect?: PointType;
  onUpdateSuccess?: () => void;
}) {
  const { visible, hideModal, latitude, longitude } = props;
  const dispatch = useAppDispatch();
  const { listData } = useAppSelector((s) => s.models);

  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [point, setPoint] = useState<PointType | undefined>(
    props.isEdit
      ? props.pointSelect
      : {
          id: `${latitude}_${longitude}`,
          latitude,
          longitude,
          name: "",
        }
  );

  const _addPoint = () => {
    if (point)
      dispatch(
        addPoint({
          item: point,
        })
      );
    hideModal();
  };

  const _updatePoint = () => {
    if (point)
      dispatch(
        updatePoint({
          item: point,
        })
      );
    if (props.onUpdateSuccess) props.onUpdateSuccess();
    hideModal();
  };
  const [visibleMenu, setVisibleMenu] = React.useState(false);

  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  const [visibleSelectModel, setVisibleSelectModel] = React.useState(false);

  const openSelectModel = () => setVisibleSelectModel(true);

  const closeSelectModel = () => setVisibleSelectModel(false);

  const [visibleParen, setVisibleParen] = React.useState(false);

  const openParen = () => setVisibleParen(true);

  const closeParen = () => setVisibleParen(false);

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View>
            <Text>{props.isEdit ? "Chi tiết điểm" : "Thêm điểm"}</Text>
            <TextInput
              style={{ width: Layout.window.width - 40 }}
              placeholder={"Tên nút"}
              outlineColor={"rgba(0,0,0,0)"}
              activeOutlineColor={blueColorApp}
              mode={"outlined"}
              defaultValue={point?.name}
              onChangeText={(text) => {
                if (point) {
                  const _point = { ...point, name: text };
                  setPoint(_point);
                }
              }}
            />
            <Text>Loại điểm</Text>
            <Menu
              visible={visibleMenu}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#e3e3e3",
                    marginVertical: 5,
                  }}
                  onPress={openMenu}
                >
                  <Text style={{ flex: 1 }}>
                    {point?.typePoint ? point.typePoint : "Chọn Loại điểm"}
                  </Text>
                  <Ionicons name="chevron-down-outline" size={24} />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                onPress={() => {
                  if (point) {
                    const _point = {
                      ...point,
                      typePoint: "Đồng hồ doanh nghiệp",
                    } as PointType;
                    setPoint(_point);
                  }
                  closeMenu();
                }}
                title="Đồng hồ doanh nghiệp"
              />
              <Menu.Item
                onPress={() => {
                  console.log("vao day");

                  if (point) {
                    const _point = {
                      ...point,
                      typePoint: "Đồng hồ hộ dân",
                    } as PointType;
                    setPoint(_point);
                  }
                  closeMenu();
                }}
                title="Đồng hồ hộ dân"
              />
              <Menu.Item
                onPress={() => {
                  console.log("vao day");

                  if (point) {
                    const _point = {
                      ...point,
                      typePoint: "Đồng hồ tổng nhánh",
                    } as PointType;
                    setPoint(_point);
                  }
                  closeMenu();
                }}
                title="Đồng hồ tổng nhánh"
              />
              <Menu.Item
                onPress={() => {
                  console.log("vao day");

                  if (point) {
                    const _point = {
                      ...point,
                      typePoint: "Đồng hồ tổng tuyến",
                    } as PointType;
                    setPoint(_point);
                  }
                  closeMenu();
                }}
                title="Đồng hồ tổng tuyến"
              />
              <Menu.Item
                onPress={() => {
                  if (point) {
                    const _point = {
                      ...point,
                      typePoint: "điểm thu",
                    } as PointType;
                    setPoint(_point);
                  }
                  closeMenu();
                }}
                title="điểm thu"
              />
              <Menu.Item
                onPress={() => {
                  if (point) {
                    const _point = {
                      ...point,
                      typePoint: "điểm nhà máy",
                    } as PointType;
                    setPoint(_point);
                  }
                  closeMenu();
                }}
                title="điêm nhà máy"
              />
              <Menu.Item
                onPress={() => {
                  if (point) {
                    const _point = {
                      ...point,
                      typePoint: "điểm trạm",
                    } as PointType;
                    setPoint(_point);
                  }
                  closeMenu();
                }}
                title="điểm trạm"
              />
              <Menu.Item
                onPress={() => {
                  if (point) {
                    const _point = {
                      ...point,
                      typePoint: "điểm van",
                    } as PointType;
                    setPoint(_point);
                  }
                  closeMenu();
                }}
                title="điểm van"
              />
            </Menu>

            <Text>Đối tượng map</Text>
            <Menu
              visible={visibleSelectModel}
              onDismiss={closeSelectModel}
              anchor={
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#e3e3e3",
                    marginVertical: 5,
                  }}
                  onPress={openSelectModel}
                >
                  <Text style={{ flex: 1 }}>
                    {point?.idConnect
                      ? listData?.find((x) => x.id === point.idConnect)?.name
                      : "Chọn đối tượng"}
                  </Text>
                  <Ionicons name="chevron-down-outline" size={24} />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                onPress={() => {
                  if (point) {
                    const _point = {
                      ...point,
                      idConnect: undefined,
                    } as PointType;
                    setPoint(_point);
                  }
                  closeSelectModel();
                }}
                title="trống"
              />
              {listData &&
                listData
                  .filter((x) => x.type === point?.typePoint)
                  .map((item) => (
                    <Menu.Item
                      key={"enu.Item" + item.id}
                      onPress={() => {
                        if (point) {
                          const _point = {
                            ...point,
                            idConnect: item.id,
                          } as PointType;
                          setPoint(_point);
                        }
                        closeSelectModel();
                      }}
                      title={item.name}
                    />
                  ))}
            </Menu>
            {/* {point?.typePoint === "điểm đồng hồ tổng" ||
              (point?.typePoint === "điểm đồng hồ hộ sử dụng" && (
                <>
                  <Text>Chọn đồng hồ quản lý</Text>
                  <Menu
                    visible={visibleParen}
                    onDismiss={closeParen}
                    anchor={
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: "#e3e3e3",
                          marginVertical: 5,
                        }}
                        onPress={openParen}
                      >
                        <Text style={{ flex: 1 }}>
                          {point?.idParent
                            ? listData?.find((x) => x.id === point.idParent)
                                ?.name
                            : "Chọn đối tượng"}
                        </Text>
                        <Ionicons name="chevron-down-outline" size={24} />
                      </TouchableOpacity>
                    }
                  >
                    {listData &&
                      listData
                        .filter((x) => x.type === "điểm đồng hồ tổng")
                        .map((item) => (
                          <Menu.Item
                            key={"enu.Item" + item.id}
                            onPress={() => {
                              if (point) {
                                const _point = {
                                  ...point,
                                  idParent: item.id,
                                } as PointType;
                                setPoint(_point);
                              }
                              closeParen();
                            }}
                            title={item.name}
                          />
                        ))}
                  </Menu>
                </>
              ))} */}

            <View style={{ flexDirection: "row" }}>
              <Text>Tọa độ</Text>

              <Text>{`(${point?.latitude},${point?.longitude})`}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: blueColorApp,
                  marginTop: 10,
                  borderRadius: 8,
                }}
                onPress={() => {
                  if (props.isEdit === true) {
                    _updatePoint();
                  } else {
                    _addPoint();
                  }
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}
