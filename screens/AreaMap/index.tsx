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
import MapView, { Callout, Circle, Marker, Region } from "react-native-maps";
import { blueColorApp } from "../../constants/Colors";
import { RootStackScreenProps } from "../../navigation/types";
export interface _Location {
  location: { lat: number; long: number };
  name: string;
}
export type LocationMaps = {
  locationArea: _Location;
  listLocationContract: Array<_Location>;
};

export default function AreaMap({ route }: RootStackScreenProps<"AreaMap">) {
  const { locationArea, listLocationContract } = route.params;
  console.log(
    "locationArea",
    locationArea,
    "listLocationContract",
    listLocationContract
  );

  const [region, setRegion] = useState<Region>({
    latitude: locationArea.location.lat,
    longitude: locationArea.location.long,
    latitudeDelta: 0.02522,
    longitudeDelta: 0.01221,
  });

  return (
    <View style={styles.container}>
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
      >
        {/* <Marker
          coordinate={{
            latitude: locationArea.location.lat,
            longitude: locationArea.location.long,
          }}
          pinColor="black"
        >
          <Callout>
            <Text>Khu vực {locationArea.name}</Text>
          </Callout>
        </Marker> */}
        {listLocationContract.map((item) => (
          <Marker
            coordinate={{
              latitude: item.location.lat,
              longitude: item.location.long,
            }}
          >
            <Callout>
              <Text>vị trí {item.name}</Text>
            </Callout>
          </Marker>
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
      />
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
