import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { blueColorApp } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Menu, Provider, TextInput } from "react-native-paper";
import { addModel, ModelType } from "../../redux/features/ModelSlides";
import uuid from "react-native-uuid";
import Layout from "../../constants/Layout";
import { useAppDispatch } from "../../redux/store/hooks";
export default function AddModel(props: { goBack: () => void }) {
  const [input, setInput] = useState<ModelType>({
    id: uuid.v4() as string,
  });
  const [visibleMenu, setVisibleMenu] = React.useState(false);

  const openMenu = () => setVisibleMenu(true);
  const dispatch = useAppDispatch();

  const closeMenu = () => setVisibleMenu(false);
  const _addModel = () => {
    dispatch(addModel({ item: input }));
    props.goBack();
  };
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 8,
              backgroundColor: blueColorApp,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={props.goBack}
          >
            <Ionicons name="chevron-back-outline" color="white" size={20} />
            <Text style={{ color: "white" }}>Quay lại</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Text>Thêm Đối tượng</Text>
          <TextInput
            placeholder={"Tên Model"}
            outlineColor={"rgba(0,0,0,0)"}
            activeOutlineColor={blueColorApp}
            mode={"outlined"}
            defaultValue={input?.name}
            onChangeText={(text) => {
              const _input = { ...input, name: text };
              setInput(_input);
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Menu
              visible={visibleMenu}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    width: Layout.window.width - 20,
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
                    {input?.type ? input.type : "Chọn Loại Model"}
                  </Text>
                  <Ionicons name="chevron-down-outline" size={24} />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                onPress={() => {
                  if (input) {
                    const _input = {
                      ...input,
                      type: "điểm thu",
                    } as ModelType;
                    setInput(_input);
                  }
                  closeMenu();
                }}
                title="điểm thu"
              />
              <Menu.Item
                onPress={() => {
                  if (input) {
                    const _input = {
                      ...input,
                      type: "điểm nhà máy",
                    } as ModelType;
                    setInput(_input);
                  }
                  closeMenu();
                }}
                title="điểm nhà máy"
              />
              <Menu.Item
                onPress={() => {
                  if (input) {
                    const _input = {
                      ...input,
                      type: "điểm trạm",
                    } as ModelType;
                    setInput(_input);
                  }
                  closeMenu();
                }}
                title="điểm trạm"
              />
              <Menu.Item
                onPress={() => {
                  if (input) {
                    const _input = {
                      ...input,
                      type: "điểm van",
                    } as ModelType;
                    setInput(_input);
                  }
                  closeMenu();
                }}
                title="điểm van"
              />
              <Menu.Item
                onPress={() => {
                  if (input) {
                    const _input = {
                      ...input,
                      type: "điểm đồng hồ hộ sử dụng",
                    } as ModelType;
                    setInput(_input);
                  }
                  closeMenu();
                }}
                title="điểm đồng hồ hộ sử dụng"
              />
              <Menu.Item
                onPress={() => {
                  console.log("vao day");

                  if (input) {
                    const _input = {
                      ...input,
                      type: "điểm đồng hồ tổng",
                    } as ModelType;
                    setInput(_input);
                  }
                  closeMenu();
                }}
                title="điểm đồng hồ tổng"
              />
            </Menu>
          </View>

          <View>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#5cb85c",
                marginTop: 10,
                borderRadius: 8,
              }}
              onPress={_addModel}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Thêm mới
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Provider>
  );
}
