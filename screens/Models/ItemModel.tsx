import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ModelType, updateModel } from "../../redux/features/ModelSlides";
import { TextInput } from "react-native-paper";
import { useAppDispatch } from "../../redux/store/hooks";
import { blueColorApp } from "../../constants/Colors";

export default function ItemModel(props: { item: ModelType }) {
  const { item } = props;
  const [input, setInput] = useState<ModelType>(item);
  const dispatch = useAppDispatch();
  const update = () => {
    if (input) dispatch(updateModel({ item: input }));
  };
  return (
    <View style={{ padding: 10, backgroundColor: "#fff", marginVertical: 5 }}>
      <Text>Loại : {item.type}</Text>
      <Text>tên</Text>
      <TextInput
        defaultValue={item.name}
        onChangeText={(text) => {
          setInput((old) => {
            return { ...old, name: text };
          });
        }}
      />
      {input && input.name !== item.name && (
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: blueColorApp,
            marginTop: 5,
          }}
          onPress={update}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Cập nhật</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
