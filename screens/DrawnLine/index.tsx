import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../constants/Layout";
import MapView, {
  LatLng,
  MapTypes,
  Marker,
  Polyline,
  Region,
} from "react-native-maps";
import { blueColorApp, textLight } from "../../constants/Colors";
import ItemMaker from "./ItemMaker";
import ActionSelectPointDrawnLine from "./ActionSelectPointDrawnLine";
import ButtonDoneDrawLine from "./ButtonDoneDrawLine";
import { RootStackScreenProps } from "../../navigation/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { addLine, LineType, updateLine } from "../../redux/features/LineSlice";

const regionDefault = {
  latitude: 21.201793705723247,
  longitude: 105.49591524526477,
  latitudeDelta: 0.00452679349725571,
  longitudeDelta: 0.0026812031864977826,
};
export type PointDraw = {
  latitude: number;
  longitude: number;
  oder: number;
  isEdit: boolean;
};
export default function DrawnLine({
  navigation,
  route,
}: RootStackScreenProps<"DrawLine">) {
  const { pointEnd, pointStart, _region } = route.params;
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: Layout.window.width,
    height: Layout.window.height,
  });

  const [mapType, setMapType] = useState<MapTypes>("standard");
  const dispatch = useAppDispatch();
  const { listLine } = useAppSelector((s) => s.lines);
  const line = listLine?.find(
    (x) =>
      x.listIdConnect?.includes(pointEnd.id) &&
      x.listIdConnect?.includes(pointStart.id)
  );

  const [wl, sWl] = useState<number>(line?.width ? line.width : 1);
  const [colorL, sColorL] = useState<string>(line?.color ? line.color : "red");
  console.log(line);

  const [region, setRegion] = useState<Region>(_region);

  const startPoint = {
    latitude: pointStart.latitude,
    longitude: pointStart.longitude,
    oder: 0,
    isEdit: true,
  };
  const endPoint = {
    latitude: pointEnd.latitude,
    longitude: pointEnd.longitude,
    oder: 1024,
    isEdit: true,
  };

  const [arrPoint, setArrPoint] = useState<PointDraw[]>([startPoint, endPoint]);

  const [pointSelect, setPointSelect] = useState<PointDraw>();
  const [staTusPointSelect, setStaTusPointSelect] = useState<1 | 2 | 3>();
  const genDrawnLine = (_arrPoint: PointDraw[]): LatLng[] => {
    const arr: LatLng[] = [];
    _arrPoint
      .sort((a, b) => {
        return a.oder - b.oder;
      })
      .forEach((x) => {
        arr.push({ latitude: x.latitude, longitude: x.longitude });
      });
    return arr;
  };

  const calcDict1 = (ax: number, ay: number, bx: number, by: number) => {
    return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
  };
  useEffect(() => {
    if (line === undefined || line?.listLatLng === undefined) {
      setArrPoint(addNoSelectPoint(arrPoint));
    } else {
      let arr: PointDraw[] = [];
      if (pointStart.id === line.listIdConnect[0]) {
        arr.push({
          isEdit: true,
          latitude: pointStart.latitude,
          longitude: pointStart.longitude,
          oder: 0,
        });
      } else {
        arr.push({
          isEdit: true,
          latitude: pointEnd.latitude,
          longitude: pointEnd.longitude,
          oder: 0,
        });
      }

      for (let i = 1; i < line.listLatLng.length - 1; i++) {
        arr.push({
          isEdit: true,
          latitude: line.listLatLng[i].latitude,
          longitude: line.listLatLng[i].longitude,
          oder: i,
        });
      }
      if (pointStart.id === line.listIdConnect[0]) {
        arr.push({
          isEdit: true,
          latitude: pointEnd.latitude,
          longitude: pointEnd.longitude,
          oder: line.listLatLng.length - 1,
        });
      } else {
        arr.push({
          isEdit: true,
          latitude: pointStart.latitude,
          longitude: pointStart.longitude,
          oder: line.listLatLng.length - 1,
        });
      }
      setArrPoint(addNoSelectPoint(arr));
    }
  }, []);

  const addNoSelectPoint = (arr: PointDraw[]) => {
    const arrPointNoSelect: PointDraw[] = [];
    const _arr = arr.filter((x) => x.isEdit).sort((a, b) => a.oder - b.oder);
    for (let i = 0; i < _arr.length - 1; i++) {
      arrPointNoSelect.push({
        isEdit: false,
        latitude: (_arr[i].latitude + _arr[i + 1].latitude) / 2,
        longitude: (_arr[i].longitude + _arr[i + 1].longitude) / 2,
        oder: (_arr[i].oder + _arr[i + 1].oder) / 2,
      });
    }
    return [..._arr, ...arrPointNoSelect];
  };
  console.log(arrPoint);

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        var { width, height } = event.nativeEvent.layout;
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
          if (pointSelect && staTusPointSelect === 1) {
            const obj = {
              isEdit: true,
              latitude: region.latitude,
              longitude: region.longitude,
              oder: pointSelect.oder,
            } as PointDraw;
            setPointSelect(obj);
            const arr = [...arrPoint.filter((x) => x.oder !== obj.oder), obj];
            setArrPoint(addNoSelectPoint(arr));
          }
        }}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          if (pointSelect && staTusPointSelect === undefined) {
            if (
              calcDict1(
                pointSelect.latitude,
                pointSelect.longitude,
                latitude,
                longitude
              ) > 0.0005
            ) {
              setPointSelect(undefined);
              setStaTusPointSelect(undefined);
            }
          }
        }}
      >
        {arrPoint.map((item, index) => (
          <Marker
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            key={`item.oder` + index}
            zIndex={1}
            onPress={() => {
              if (index === 0 || index === arrPoint.length - 1) {
                return;
              }
              if (staTusPointSelect === undefined) {
                setPointSelect(item);
              }
            }}
          >
            <ItemMaker point={item} />
          </Marker>
        ))}
        <Polyline
          coordinates={genDrawnLine(arrPoint)}
          fillColor="rgba(0, 200, 0, 0.5)"
          strokeColor={colorL}
          strokeWidth={wl}
        />
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
          <ActionSelectPointDrawnLine
            butons={[
              {
                text: "Thay ?????i t???a ?????",
                onPress: () => {
                  setStaTusPointSelect(1);
                  Alert.alert(
                    "H?????ng d???n",
                    " di chuy???n v??? tr?? ??i???m theo v??? tr?? ch???m xanh tr??n b???n ????? \n ???n x??c nh???n ????? ho??n th??nh"
                  );
                },
              },
              pointSelect.isEdit
                ? {
                    text: "X??a ??i???m",
                    onPress: () => {
                      setStaTusPointSelect(2);
                      Alert.alert(
                        "X??a ??i???m",
                        "X??c nh???n x??a ??i???m ???????c ch???n tr??n ???????ng ???ng ",
                        [
                          {
                            text: "X??c nh???n",
                            onPress: () => {
                              const arr = arrPoint.filter(
                                (x) => x.oder !== pointSelect.oder
                              );
                              setArrPoint(addNoSelectPoint(arr));
                            },
                          },
                          { text: "H???y" },
                        ]
                      );
                    },
                  }
                : {},
            ]}
          />
        )}
      </View>
      <ButtonDoneDrawLine
        wl={wl}
        color={colorL}
        onChangeColor={(text) => {
          sColorL(text);
        }}
        onChangeWidth={(text) => {
          let num = 1;
          try {
            num = Number(text);
            sWl(num);
          } catch (error) {}
        }}
        staTusPointSelect={staTusPointSelect}
        onPress={() => {
          if (staTusPointSelect === 1) {
            if (pointSelect) {
              setPointSelect(undefined);
              setStaTusPointSelect(undefined);
            }
            return;
          }
          Alert.alert("X??c nh???n", "X??c nh???n v??? ???????ng ???ng ho??n th??nh", [
            {
              text: "X??c nh???n",
              onPress: () => {
                const arr: LatLng[] = arrPoint
                  .filter((it) => it.isEdit === true)
                  .map((x) => {
                    return { latitude: x.latitude, longitude: x.longitude };
                  });
                if (line === undefined) {
                  const newLine: LineType = {
                    id: `${pointStart.id}_${pointEnd.id}`,
                    listIdConnect: [pointStart.id, pointEnd.id],
                    listLatLng: arr,
                    type: "success",
                    width: wl,
                    color: colorL,
                  };
                  dispatch(addLine({ item: newLine }));
                } else {
                  dispatch(
                    updateLine({
                      item: {
                        ...line,
                        listLatLng: arr,
                        type: "success",
                        width: wl,
                        color: colorL,
                      },
                    })
                  );
                }
                navigation.goBack();
              },
            },
            { text: "H???y" },
          ]);
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: size.width,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
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
            {mapType === "standard" ? "V??? tinh" : "B???n ?????"}
          </Text>
        </TouchableOpacity>
      </View>
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
