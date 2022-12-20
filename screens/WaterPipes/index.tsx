import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AlertButton,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../navigation/types";
import MapView, {
  Callout,
  LatLng,
  Marker,
  Polygon,
  Polyline,
  Region,
} from "react-native-maps";
import { blueColorApp } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import ModalSelectPoint from "./ModalSelectPoint";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  PointType,
  removePoint,
  updatePoint,
} from "../../redux/features/PointsSlice";
import ActionSelectPoint from "./ActionSelectPoint";
import ButtonDone from "./ButtonDone";

type MapTypes =
  | "standard"
  | "satellite"
  | "hybrid"
  | "terrain"
  | "none"
  | "mutedStandard";

export default function AreaMap({
  navigation,
}: RootStackScreenProps<"WaterPipes">) {
  const regionDefault = {
    latitude: 21.2130450170416,
    longitude: 105.50748394802213,
    latitudeDelta: 0.00452679349725571,
    longitudeDelta: 0.0026812031864977826,
  };
  const [region, setRegion] = useState<Region>(regionDefault);
  const [mapType, setMapType] = useState<MapTypes>("standard");
  const [pointSelect, setPointSelect] = useState<PointType>();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [staTusPointSelect, setStaTusPointSelect] = useState<1 | 2 | 3>();

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: Layout.window.width,
    height: Layout.window.height,
  });
  const [showModalSelect, setShowModalSelect] = useState<boolean>(false);
  const { listPoint } = useAppSelector((s) => s.points);
  const [arrLatLng, setArrLatLng] = useState<LatLng[][]>();

  const [arrListPointLatLng, setArrListPointLatLng] = useState<LatLng[][][]>();

  const dispatch = useAppDispatch();
  const _removePoint = (id: string) => {
    dispatch(removePoint({ id: id }));
  };
  const calcDict = () => {
    if (pointSelect === undefined) {
      return -1;
    }
    const ax = region.latitude;
    const ay = region.longitude;

    const bx = pointSelect.latitude;
    const by = pointSelect.longitude;

    return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
  };
  useEffect(() => {
    if (pointSelect && region && staTusPointSelect === undefined) {
      if (calcDict() > 0.0005) {
        setPointSelect(undefined);
        setStaTusPointSelect(undefined);
      }
    }
  }, [pointSelect, region]);
  console.log(pointSelect);
  const genArrPointSelect = (item: PointType) => {
    console.log("vào genArrPointSelect", item);

    const arr: LatLng[][] = [];
    if (item?.listIdConnect) {
      item.listIdConnect.forEach((x) => {
        const itemNode = listPoint?.find((y) => y.id === x);
        if (itemNode)
          arr.push([
            { latitude: item.latitude, longitude: item.longitude },
            {
              latitude: itemNode.latitude,
              longitude: itemNode.longitude,
            },
          ]);
      });
    }

    setArrLatLng(arr);
  };
  const genArrPointSelectArr = (item: PointType) => {
    console.log("vào genArrPointSelect", item);

    const arr: LatLng[][] = [];
    if (item?.listIdConnect) {
      item.listIdConnect.forEach((x) => {
        const itemNode = listPoint?.find((y) => y.id === x);
        if (itemNode)
          arr.push([
            { latitude: item.latitude, longitude: item.longitude },
            {
              latitude: itemNode.latitude,
              longitude: itemNode.longitude,
            },
          ]);
      });
    }

    return arr;
  };

  useEffect(() => {
    if (pointSelect) genArrPointSelect(pointSelect);
  }, [pointSelect]);

  useEffect(() => {
    if (listPoint && pointSelect === undefined) {
      const Arr: LatLng[][][] = [];
      listPoint.forEach((x) => {
        const _arr = genArrPointSelectArr(x);
        Arr.push(_arr);
      });
      if (Arr.length > 0) {
        setArrListPointLatLng(Arr);
      }
    } else {
      setArrListPointLatLng(undefined);
    }
  }, [listPoint, pointSelect]);

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        console.log(width, height);

        setSize({ width, height });
      }}
    >
      <MapView
        style={{ ...styles.map, width: size.width, height: size.height }}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsScale={true}
        mapType={mapType}
        onRegionChangeComplete={(
          region: Region,
          details?: { isGesture: boolean }
        ) => {
          setRegion(region);
          if (staTusPointSelect === 1 && pointSelect !== undefined) {
            const x = {
              ...pointSelect,
              latitude: region.latitude,
              longitude: region.longitude,
            };
            setPointSelect(x);
          }
          console.log(region);
        }}
      >
        {listPoint &&
          listPoint
            .filter((x) => x.id !== pointSelect?.id)
            .map((item) => (
              <Marker
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                pinColor="black"
                key={item.id}
                onPress={(e) => {
                  if (staTusPointSelect === 3 && pointSelect) {
                    if (item.id !== pointSelect?.id) {
                      const obj = {
                        ...pointSelect,
                        listIdConnect: pointSelect.listIdConnect
                          ? [
                              ...pointSelect.listIdConnect.filter(
                                (x) => x !== item.id
                              ),
                              item.id,
                            ]
                          : [item.id],
                      } as PointType;
                      const obj_x = {
                        ...item,
                        listIdConnect: item.listIdConnect
                          ? [
                              ...item.listIdConnect.filter(
                                (x) => x !== pointSelect.id
                              ),
                              pointSelect.id,
                            ]
                          : [pointSelect.id],
                      } as PointType;
                      setPointSelect(obj);
                      Alert.alert(
                        "",
                        `Liên kết điểm ${item.name} vào điểm ${pointSelect.name}`,
                        [
                          {
                            text: "Xác nhận",
                            onPress: () => {
                              dispatch(updatePoint({ item: obj }));

                              dispatch(updatePoint({ item: obj_x }));

                              setStaTusPointSelect(undefined);
                            },
                          },
                          {
                            text: "Thôi",
                          },
                        ]
                      );
                    }
                    return;
                  }
                  setPointSelect(item);
                }}
              ></Marker>
            ))}
        {pointSelect && (
          <Marker
            coordinate={{
              latitude: pointSelect.latitude,
              longitude: pointSelect.longitude,
            }}
            pinColor="black"
            key={pointSelect.id}
            onPress={(e) => {
              setPointSelect(pointSelect);
            }}
          ></Marker>
        )}

        {arrLatLng &&
          arrLatLng.map((item, index) => (
            <Polyline
              coordinates={item}
              fillColor="rgba(0, 200, 0, 0.5)"
              strokeColor="rgba(0,0,0,0.5)"
              strokeWidth={4}
              key={"Polyline" + index}
            />
          ))}

        {arrListPointLatLng &&
          arrListPointLatLng.map((itemx, indexx) =>
            itemx.map((item, index) => (
              <Polyline
                coordinates={item}
                strokeColor="rgba(255,0,0,0.2)"
                strokeWidth={1}
                geodesic={true}
                key={`Polyline${indexx}${index}`}
              />
            ))
          )}

        {/* {arrLatLng && (
          <Polyline
            coordinates={arrLatLng}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={4}
          />
        )} */}
      </MapView>

      <View
        style={{
          backgroundColor: blueColorApp,
          width: 10,
          height: 10,
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 1,
        }}
      >
        {pointSelect && staTusPointSelect === undefined && (
          <ActionSelectPoint
            setPointSelect={setPointSelect}
            pointSelect={pointSelect}
            butons={[
              {
                text: "Thay đổi tọa độ",
                onPress: () => {
                  setStaTusPointSelect(1);
                  Alert.alert(
                    "Hướng dẫn",
                    " di chuyển vị trí điểm theo vị trí chấm xanh trên bản đỗ \n ấn xác nhận để hoàn thành"
                  );
                },
              },
              {
                text: "Chi tiết",
                onPress: () => {
                  setIsEdit(true);
                  setShowModalSelect(true);
                },
              },
              {
                text: "Xóa điểm",
                onPress: () => {
                  Alert.alert(
                    "Xóa điểm",
                    "Xác nhận xóa điểm :" + pointSelect.name,
                    [
                      {
                        text: "Xác nhận",
                        onPress: () => {
                          dispatch(removePoint({ id: pointSelect.id }));
                          setPointSelect(undefined);
                          setStaTusPointSelect(undefined);
                        },
                      },
                      {
                        text: "Thôi",
                      },
                    ]
                  );
                },
              },
              {
                text: "Nối điểm",
                onPress: () => {
                  setStaTusPointSelect(3);
                  //   Alert.alert(
                  //     "Xóa điểm",
                  //     "Xác nhận xóa điểm :" + pointSelect.name,
                  //     [
                  //       {
                  //         text: "Xác nhận",
                  //         onPress: () => {
                  //           dispatch(removePoint({ id: pointSelect.id }));
                  //           setPointSelect(undefined);
                  //           setStaTusPointSelect(undefined);
                  //         },
                  //       },
                  //       {
                  //         text: "Thôi",
                  //       },
                  //     ]
                  //   );
                },
              },
            ]}
          />
        )}
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: size.width,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            backgroundColor: blueColorApp,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            marginRight: 5,
          }}
          onPress={() => {
            if (mapType === "standard") setMapType("hybrid");
            if (mapType === "hybrid") setMapType("standard");
          }}
        >
          <Text style={{ color: "white" }}>
            {mapType === "standard" ? "Vệ tinh" : "Bản đồ"}
          </Text>
        </TouchableOpacity>
      </View>
      <ButtonDone
        staTusPointSelect={staTusPointSelect}
        onPress={() => {
          if (staTusPointSelect === 1) {
            if (pointSelect) {
              dispatch(updatePoint({ item: pointSelect }));
              setPointSelect(undefined);
              setStaTusPointSelect(undefined);
            }
            return;
          }
          setShowModalSelect(true);
          setIsEdit(false);
        }}
      />
      {showModalSelect && (
        <ModalSelectPoint
          visible={showModalSelect}
          hideModal={() => {
            setShowModalSelect(false);
          }}
          latitude={region.latitude}
          longitude={region.longitude}
          pointSelect={pointSelect}
          isEdit={isEdit}
          onUpdateSuccess={() => {
            setPointSelect(undefined);
            setStaTusPointSelect(undefined);
            setIsEdit(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },

  map: {
    position: "absolute",
    zIndex: 0,
  },
});
