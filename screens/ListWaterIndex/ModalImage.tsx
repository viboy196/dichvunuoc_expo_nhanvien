import {
  View,
  Text,
  Modal,
  Alert,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function ModalImage({
  visibleModaImage,
  hideModal,
  imageUri,
}: {
  visibleModaImage: boolean;
  hideModal: () => void;
  imageUri?: string;
}) {
  const width = 250;
  const [uri, setUri] = useState<string | undefined>(imageUri);
  useEffect(() => {
    if (uri !== imageUri) {
      setUri(imageUri);
    }
  });
  console.log(imageUri);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibleModaImage}
      onRequestClose={() => {
        hideModal();
      }}
      onDismiss={hideModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            style={{ width: width, height: (4 * width) / 3 }}
            source={{
              uri: uri ? `${uri}?time=${new Date()}` : undefined,
            }}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => hideModal()}
          >
            <Text style={styles.textStyle}>Đóng</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  tinyLogo: {
    width: 50,
    height: 50,
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
