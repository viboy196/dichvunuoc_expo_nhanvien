import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AlertButton,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../navigation/types";
import MapView, {
  Callout,
  LatLng,
  MapEvent,
  Marker,
  Polygon,
  Polyline,
  Region,
  UrlTile,
} from "react-native-maps";
import { blueColorApp } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import ModalSelectPoint from "./ModalSelectPoint";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  PointType,
  removePoint,
  TypePoint,
  updatePoint,
} from "../../redux/features/PointsSlice";
import ActionSelectPoint from "./ActionSelectPoint";
import ButtonDone from "./ButtonDone";
import ShowName from "./ShowName";
import { useSelector } from "react-redux";
import { addLine, LineType, removeLine } from "../../redux/features/LineSlice";

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
    latitudeDelta: 0.00852679349725571,
    longitudeDelta: 0.0046812031864977826,
  };

  const [region, setRegion] = useState<Region>(regionDefault);
  const [mapType, setMapType] = useState<MapTypes>("standard");
  const [pointSelect, setPointSelect] = useState<PointType>();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [staTusPointSelect, setStaTusPointSelect] = useState<1 | 2 | 3 | 4>();

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: Layout.window.width,
    height: Layout.window.height,
  });
  const [showModalSelect, setShowModalSelect] = useState<boolean>(false);

  const [widthShow, setWidthShow] = useState<number>(-1);

  const [pointShow, setPointShow] = useState<TypePoint>();

  const { listPoint } = useAppSelector((s) => s.points);

  const dispatch = useAppDispatch();
  const _removePoint = (id: string) => {
    const point = listPoint?.find((x) => x.id);
    if (point) {
      const arrLine = listLine?.filter((x) => x.id.indexOf(point?.id));
      if (arrLine) {
        arrLine.forEach((x) => {
          dispatch(removeLine({ id: x.id }));
        });
      }
    }
    dispatch(removePoint({ id: id }));
    setPointSelect(undefined);
    setStaTusPointSelect(undefined);
  };
  const calcDict1 = (ax: number, ay: number, bx: number, by: number) => {
    return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
  };
  const { listLine } = useAppSelector((s) => s.lines);

  const onPressMaker = (item: PointType) => {
    if (staTusPointSelect === 4 && pointSelect) {
      if (pointSelect.listIdConnect?.includes(item.id)) {
        Alert.alert(
          "V??? ???????ng ???ng",
          `Nh???n x??c nh???n ????? v??? ???????ng ???ng n???i 2 ??i???m ???? ch???n`,
          [
            {
              text: "X??c nh???n",
              onPress: () => {
                navigation.navigate("DrawLine", {
                  pointStart: pointSelect,
                  pointEnd: item,
                  _region: region,
                });
                setStaTusPointSelect(undefined);
              },
            },
            {
              text: "H???y",
              onPress: () => {
                setStaTusPointSelect(undefined);
              },
            },
          ]
        );
      } else {
        Alert.alert("??i???m kh??ng ???????c li??n k???t");
      }
      return;
    }
    if (staTusPointSelect === 3 && pointSelect) {
      if (item.id !== pointSelect?.id) {
        const obj = {
          ...pointSelect,
          listIdConnect: pointSelect.listIdConnect
            ? [
                ...pointSelect.listIdConnect.filter((x) => x !== item.id),
                item.id,
              ]
            : [item.id],
        } as PointType;
        const obj_x = {
          ...item,
          listIdConnect: item.listIdConnect
            ? [
                ...item.listIdConnect.filter((x) => x !== pointSelect.id),
                pointSelect.id,
              ]
            : [pointSelect.id],
        } as PointType;
        setPointSelect(obj);
        Alert.alert(
          "",
          `Li??n k???t ??i???m ${item.name} v??o ??i???m ${pointSelect.name}`,
          [
            {
              text: "X??c nh???n",
              onPress: () => {
                dispatch(updatePoint({ item: obj }));

                dispatch(updatePoint({ item: obj_x }));
                const newLine: LineType = {
                  id: `${obj.id}_${obj_x.id}`,
                  listIdConnect: [obj.id, obj_x.id],
                  listLatLng: [
                    {
                      latitude: obj.latitude,
                      longitude: obj.longitude,
                    },
                    {
                      latitude: obj_x.latitude,
                      longitude: obj_x.longitude,
                    },
                  ],
                  type: "init",
                };
                dispatch(addLine({ item: newLine }));

                setStaTusPointSelect(undefined);
              },
            },
            {
              text: "Th??i",
              onPress: () => {
                setStaTusPointSelect(undefined);
              },
            },
          ]
        );
      }
      return;
    }
    setPointSelect(item);
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        var { width, height } = event.nativeEvent.layout;
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
            dispatch(updatePoint({ item: x }));
          }
          console.log(region);
        }}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          console.log(e.nativeEvent);

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
        {listPoint &&
          listPoint.map((item) => (
            <ViewMaker
              item={item}
              onPressMaker={() => onPressMaker(item)}
              key={item.id}
              pointShow={pointShow}
            />
          ))}
        {listLine &&
          listLine.map((item) => (
            <ViewLine widthShow={widthShow} item={item} key={item.id} />
          ))}
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
                text: "Xem ???nh",
                onPress: () => {
                  navigation.navigate("PointImage", { point: pointSelect });
                },
              },
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
              {
                text: "V??? ???????ng ???ng",
                onPress: () => {
                  setStaTusPointSelect(4);
                  Alert.alert(
                    "H?????ng d???n",
                    " Ch???n ??i???m li??n k???t v???i ??i???m ???? ch???n \n ????? b???t ?????u v??? "
                  );
                },
              },

              {
                text: "Chi ti???t",
                onPress: () => {
                  setIsEdit(true);
                  setShowModalSelect(true);
                },
              },
              {
                text: "X??a ??i???m",
                onPress: () => {
                  Alert.alert(
                    "X??a ??i???m",
                    "X??c nh???n x??a ??i???m :" + pointSelect.name,
                    [
                      {
                        text: "X??c nh???n",
                        onPress: () => _removePoint(pointSelect.id),
                      },
                      {
                        text: "Th??i",
                      },
                    ]
                  );
                },
              },
              {
                text: "N???i ??i???m",
                onPress: () => {
                  setStaTusPointSelect(3);
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
            {mapType === "standard" ? "V??? tinh" : "B???n ?????"}
          </Text>
        </TouchableOpacity>
      </View>
      <ButtonDone
        staTusPointSelect={staTusPointSelect}
        setWidthShow={setWidthShow}
        setPointShow={setPointShow}
        onPress={() => {
          if (staTusPointSelect === 1) {
            if (pointSelect) {
              setPointSelect(undefined);
              setStaTusPointSelect(undefined);
            }
            return;
          }
          setShowModalSelect(true);
          setIsEdit(false);
        }}
        onCance={() => {
          if (staTusPointSelect === 1) {
            if (pointSelect) {
              dispatch(updatePoint({ item: pointSelect }));
              setPointSelect(undefined);
              setStaTusPointSelect(undefined);
            }
            return;
          }
          setPointSelect(undefined);
          setStaTusPointSelect(undefined);
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

const ViewLine = (props: { item: LineType; widthShow: number }) => {
  const { item } = props;
  const { listPoint } = useAppSelector((s) => s.points);
  const p1 = listPoint?.find((x) => x.id === item.listIdConnect[0]);

  const p2 = listPoint?.find((x) => x.id === item.listIdConnect[1]);
  let arr = [...props.item.listLatLng];
  //console.log("arr_F" + item.id, arr.length);
  arr.splice(arr.length - 1, 1);
  arr.splice(0, 1);
  if (p1 && p2) {
    arr = [
      { latitude: p1.latitude, longitude: p1.longitude },
      ...arr,
      { latitude: p2.latitude, longitude: p2.longitude },
    ];
  }
  const [isClick, setIsClick] = useState<boolean>(false);
  if (props.widthShow > 0 && props.widthShow !== props.item.width) {
    return <></>;
  }
  return (
    <>
      <Polyline
        coordinates={arr}
        key={item.id}
        strokeColor={item.color ? item.color : "red"}
        strokeWidth={
          isClick
            ? item.width
              ? item.width * 1.5
              : 1.5
            : item.width
            ? item.width
            : 1
        }
        lineDashPattern={item.type === "success" ? undefined : [1]}
        tappable={true}
        onPress={(e) => {
          setIsClick(!isClick);
          console.log(e.nativeEvent);
        }}
      />
    </>
  );
};

const ViewMaker = (props: {
  onPressMaker: () => void;
  item: PointType;
  pointShow?: string;
}) => {
  if (
    props.pointShow !== undefined &&
    props.pointShow !== props.item.typePoint
  ) {
    return <></>;
  }

  return (
    <>
      <Marker
        coordinate={{
          latitude: props.item.latitude,
          longitude: props.item.longitude,
        }}
        pinColor="black"
        onPress={(e) => {
          props.onPressMaker();
        }}
        zIndex={1}
      >
        <ShowName point={props.item} />
      </Marker>
    </>
  );
};
