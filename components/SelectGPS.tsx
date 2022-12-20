
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import { blueColorApp } from "../constants/Colors";
export default function test({
  onPressClose,
  region,
  setRegion,
  onPressDone,
  gps,
  name,
}: {
  onPressClose: () => void;
  onPressDone: () => void;
  region: Region | undefined;
  setRegion: React.Dispatch<React.SetStateAction<Region | undefined>>;
  gps?: string;
  name?: string;
}) {
  const [errorMsg, setErrorMsg] = useState<string>();
  const [locationGps, setLocationGps] = useState<{
    lat: number;
    long: number;
  }>();
  console.log("locationGps", locationGps);

  useEffect(() => {
    if (gps) {
      const arrStr = gps.split(",");
      console.log(arrStr);
      const lat = Number(arrStr[0]);
      const long = Number(arrStr[1]);
      setLocationGps({ lat: lat, long: long });
    }
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={
            locationGps
              ? {
                  ...region,
                  latitude: locationGps.lat,
                  longitude: locationGps.long,
                }
              : region
          }
          showsUserLocation={true}
          showsScale={true}
          onRegionChangeComplete={(
            region: Region,
            details?: { isGesture: boolean }
          ) => {
            setRegion(region);
          }}
        >
          {locationGps && (
            <Marker
              coordinate={{
                latitude: locationGps.lat,
                longitude: locationGps.long,
              }}
            >
              <Callout>
                <Text>Vị trí {name}</Text>
              </Callout>
            </Marker>
          )}
        </MapView>
      )}
      <View
        style={{
          backgroundColor: blueColorApp,
          width: 10,
          height: 10,
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 1,
        }}
      />
      <View style={{ position: "absolute", bottom: 10, right: 10 }}>
        <Button title="Chọn" color={blueColorApp} onPress={onPressDone} />
      </View>

      <View style={{ position: "absolute", bottom: 10, left: 10 }}>
        <Button title="Quay lại" color={blueColorApp} onPress={onPressClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },

  map: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 65,
  },
});
