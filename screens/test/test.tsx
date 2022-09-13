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
import { blueColorApp, textLight } from "../../constants/Colors";
export default function test() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [region, setRegion] = useState<Region>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
          showsScale={true}
          onRegionChangeComplete={(
            region: Region,
            details?: { isGesture: boolean }
          ) => {
            setRegion(region);
          }}
        ></MapView>
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
        <Button
          title="chọn"
          color={blueColorApp}
          onPress={() => {
            // if (region) setArrLocation((old) => [...old, region]);
            Alert.alert(
              "thông báo ",
              `tọa độ điểm được chọn là : {${region?.latitude} , ${region?.longitude}}`
            );
          }}
        />
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
    height: Dimensions.get("window").height,
  },
});
