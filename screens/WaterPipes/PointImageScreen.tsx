import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { blueColorApp, greenColorApp, textLight } from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  addImagePoint,
  ImagePointType,
  updateImagePoint,
} from "../../redux/features/ImagePointSlice";
import { Ionicons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../navigation/types";

export default function PointImageScreen({
  route,
  navigation,
}: RootStackScreenProps<"PointImage">) {
  const { listImagePoint } = useAppSelector((s) => s.imagePoint);
  const point = route.params.point;
  const ImagePoint = listImagePoint?.find((x) => x.idPoint === point?.id);
  const [listImageUri, setListImageUri] = useState<string[]>(
    ImagePoint?.listImageUri ? ImagePoint.listImageUri : []
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setListImageUri((old) => {
        //@ts-ignore
        return [...old, result.uri];
      });
    }
  };
  const dispatch = useAppDispatch();
  const onSave = () => {
    if (point === undefined) {
      return;
    }
    const obj: ImagePointType = {
      idPoint: point?.id,
      listImageUri: listImageUri,
    };
    if (ImagePoint) {
      dispatch(updateImagePoint({ item: obj }));
    } else {
      dispatch(addImagePoint({ item: obj }));
    }
  };
  const onRemoveImage = (str: string) => {
    const arr = listImageUri.filter((x) => x !== str);
    setListImageUri(arr);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 15 }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20 }}>{point?.name}</Text>
        <Text>{point?.typePoint}</Text>
      </View>

      <View style={{ padding: 5 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listImageUri &&
            listImageUri.map((item, index) => (
              <View style={{ padding: 5 }} key={index.toString()}>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: 200,
                    height: 150,
                    borderRadius: 8,
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "tomato",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => onRemoveImage(item)}
                >
                  <Ionicons name="close" color={"#fff"} />
                </TouchableOpacity>
              </View>
            ))}
          <View style={{ padding: 5 }}>
            <TouchableOpacity
              style={{
                width: 200,
                height: 150,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: blueColorApp,
              }}
              onPress={pickImage}
            >
              <Ionicons name="camera" size={16} color={blueColorApp} />
              <Text style={{ color: blueColorApp, fontWeight: "bold" }}>
                Thêm Ảnh
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={{ padding: 5 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 8,
              backgroundColor: blueColorApp,
              marginLeft: 5,
            }}
            onPress={onSave}
          >
            <Text style={{ color: "white" }}>Lưu</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
