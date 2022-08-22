import { StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import * as ImageManipulator from "expo-image-manipulator";
import { Camera, CameraType } from "expo-camera";
import ImageResizer from "react-native-image-resizer";
import { View, Text } from "./Themed";
export default function TakePickture({
  onPressComplete,
  listBase64Image,
  setListBase64Image,
}: {
  onPressComplete: () => void;
  listBase64Image: string[];
  setListBase64Image: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    // @ts-ignore
    if (!permission.granted) {
      // Camera permissions are not granted yet
      requestPermission();
    }
  }, []);
  const [camera, setCamera] = useState<Camera | null>(null);

  console.log("listBase64Image", listBase64Image.length);

  const __takePicture = useCallback(async () => {
    if (!camera) {
      return;
    }
    const photo = await camera.takePictureAsync({ base64: true });
    const manipResult = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 480, height: 638 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    const base64 = manipResult.base64;

    setListBase64Image((old) => [...old, base64 ? base64 : ""]);
  }, [camera, setListBase64Image]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Camera
          style={styles.camera}
          type={CameraType.back}
          ref={(ref) => {
            setCamera(ref);
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={__takePicture}>
            <View style={styles.inButton} />
          </TouchableOpacity>
        </View>
        <View style={{ position: "absolute" }}>
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
        <TouchableOpacity
          onPress={onPressComplete}
          style={{
            position: "absolute",
            bottom: 35,
            right: 15,
          }}
        >
          <View
            style={{
              width: 80,
              height: 30,
              backgroundColor: "rgba(0,0,0,0.5)",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>Xong</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export const ImageItem = ({
  base64Image,
  onPressDelete,
}: {
  base64Image?: string;
  onPressItem?: () => void;
  onPressDelete?: () => void;
}) => {
  return (
    <View>
      <Image
        // source={{uri: photoPath}}
        source={{ uri: `data:image/jpeg;base64,${base64Image}` }}
        style={{ width: 100, height: 133 }}
      />
      <TouchableOpacity
        onPress={onPressDelete}
        style={{
          position: "absolute",
          top: 5,
          right: 5,
        }}
      >
        <View
          style={{
            width: 50,
            height: 30,
            backgroundColor: "rgba(0,0,0,0.5)",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff" }}>XÓa</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barcodeTextURL: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  camera: {
    // width: window.window.width,
    // height: (4 * window.window.width) / 3,
    flex: 1,
    backgroundColor: "red",
  },
  buttonContainer: {
    bottom: 20,
    position: "absolute",
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3E3E3",
  },
  inButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "#6E6E6E",
    borderWidth: 3,
  },
});
