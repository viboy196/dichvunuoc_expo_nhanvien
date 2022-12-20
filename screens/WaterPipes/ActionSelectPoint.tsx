import { View, Text, AlertButton, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { PointType, updatePoint } from "../../redux/features/PointsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

export default function ActionSelectPoint(props: {
  pointSelect: PointType;
  butons: AlertButton[];
  setPointSelect: React.Dispatch<React.SetStateAction<PointType | undefined>>;
}) {
  const dispatch = useAppDispatch();
  const { pointSelect, butons } = props;
  const { listPoint } = useAppSelector((s) => s.points);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        width: 120,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          color: "#fff",
          padding: 5,
          borderBottomWidth: 1,
          borderColor: "#5e5e5e",
          textAlign: "center",
        }}
      >
        {pointSelect.name}
      </Text>
      {butons &&
        butons.map((x, index) => (
          <TouchableOpacity
            key={`${index}_ActionSelect`}
            style={{
              padding: 5,
              borderBottomWidth: 1,
              borderColor: "#5e5e5e",
            }}
            onPress={() => {
              if (x.onPress) {
                x.onPress();
              }
            }}
          >
            <Text style={{ color: "#fff" }}>{x.text}</Text>
          </TouchableOpacity>
        ))}
      <Text
        style={{
          color: "#fff",
          padding: 5,
          borderBottomWidth: 1,
          borderColor: "#5e5e5e",
          textAlign: "center",
        }}
      >
        Điểm liên kết
      </Text>
      {pointSelect.listIdConnect &&
        listPoint
          ?.filter((x) => pointSelect.listIdConnect?.includes(x.id))
          ?.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Xóa điểm",
                  `Xóa liên kết giữa ${pointSelect.name} và ${item.name}`,
                  [
                    {
                      text: "Xác Nhận",
                      onPress: () => {
                        const obj = {
                          ...pointSelect,
                          listIdConnect: pointSelect.listIdConnect
                            ? [
                                ...pointSelect.listIdConnect.filter(
                                  (x) => x !== item.id
                                ),
                              ]
                            : undefined,
                        } as PointType;
                        const obj_x = {
                          ...item,
                          listIdConnect: item.listIdConnect
                            ? [
                                ...item.listIdConnect.filter(
                                  (x) => x !== pointSelect.id
                                ),
                              ]
                            : undefined,
                        } as PointType;
                        dispatch(updatePoint({ item: obj }));

                        dispatch(updatePoint({ item: obj_x }));
                        props.setPointSelect(obj);
                      },
                    },
                    { text: "Thôi" },
                  ]
                );
              }}
              key={`${item.id}${index}`}
            >
              <Text
                key={"pointSelect.listConnect" + item.id + index}
                style={{
                  color: "#fff",
                  padding: 5,
                  borderBottomWidth: 1,
                  borderColor: "#5e5e5e",
                  textAlign: "center",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
    </View>
  );
}
