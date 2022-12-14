/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import MainScreen from "../screens/Main";
import CameraWaterScreen from "../screens/CameraWater";
import ScanfQrCodeScreen from "../screens/CameraWater/ScanfQrCode";

import LoginScreen from "../screens/Login";

import { RootStackParamList } from "./types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useAppSelector } from "../redux/store/hooks";
import InfoDetailScreen from "../screens/Main/TabInfo/InfoDetail";
import ReadMeterPeriodScreen from "../screens/ReadMeterPeriod";
import KhuVucDoScreen from "../screens/KhuVucDo";
import ChiTietSoDoScreen from "../screens/ChiTietSoDo";
import UseWaterRegisterScreen from "../screens/UseWaterRegister";
import ListContractScreen from "../screens/ListContract";
import AddContractScreen from "../screens/ListContract/AddContract";
import DetailContractScreen from "../screens/ListContract/DetailContract";
import AreaMapScreen from "../screens/AreaMap";

import { blueColorApp } from "../constants/Colors";
import ListWaterIndex from "../screens/ListWaterIndex";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import WaterPipes from "../screens/WaterPipes";
import Models from "../screens/Models";
import DrawnLine from "../screens/DrawnLine";
import FactoryManager from "../screens/FactoryManager";
import ModuleScreen from "../screens/ModuleScreen";
import AddModuleScreen from "../screens/ModuleScreen/AddModuleScreen";
import AddDevices from "../screens/ModuleScreen/AddDevices";
import PointImageScreen from "../screens/WaterPipes/PointImageScreen";
import Notification from "../Notification/Notification";

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

// export function getFullPath(data: { invoiceId: string }) {
//   return navigationRef.current?.navigate("WaterInvoiceDetail", {
//     invoiceId: data.invoiceId,
//   });
// }
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <>
      <Notification />
      <NavigationContainer
        ref={navigationRef}
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { token } = useAppSelector((state) => state.auth);
  if (token) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: blueColorApp },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CameraWaterScreen"
          component={CameraWaterScreen}
          options={({ route }) => ({
            title: "Ch???p ???nh m???t ?????ng h??? n?????c",
          })}
        />
        <Stack.Screen
          name="ScanfQrCode"
          component={ScanfQrCodeScreen}
          options={{
            title: "Qu??t m?? ?????ng h??? n?????c",
          }}
        />
        <Stack.Screen
          name="InfoDetail"
          component={InfoDetailScreen}
          options={({ route }) => ({
            title: `Th??ng tin c?? nh??n`,
          })}
        />
        <Stack.Screen
          name="ReadMeterPeriod"
          component={ReadMeterPeriodScreen}
          options={{ title: "L???ch ?????c n?????c" }}
        />
        <Stack.Screen
          name="KhuVucDoScreen"
          component={KhuVucDoScreen}
          options={({ route }) => ({
            title: route.params.tollAreaName,
            headerRight: () => (
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Ionicons
                  name="map-outline"
                  size={25}
                  color="#fff"
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="ChiTietSoDoScreen"
          component={ChiTietSoDoScreen}
          options={({ route }) => ({
            title: route.params.waterUserName,
          })}
        />
        <Stack.Screen
          name="UseWaterRegister"
          component={UseWaterRegisterScreen}
          options={{ title: "Y??u c???u ????ng k?? n?????c" }}
        />
        <Stack.Screen
          name="ListContract"
          component={ListContractScreen}
          options={{ title: "Danh s??ch h???p ?????ng" }}
        />
        <Stack.Screen
          name="ListWaterIndex"
          component={ListWaterIndex}
          options={{ title: "Danh s??ch ch??? s??? n?????c" }}
        />
        <Stack.Screen
          name="AddContract"
          component={AddContractScreen}
          options={{ title: "Th??m m???i h???p ?????ng" }}
        />
        <Stack.Screen
          name="DetailContract"
          component={DetailContractScreen}
          options={{ title: "Chi ti???t h???p ?????ng" }}
        />
        <Stack.Screen
          name="AreaMap"
          component={AreaMapScreen}
          options={({ route }) => ({
            title: `Khu v???c ` + route.params.locationArea.name,
          })}
        />
        <Stack.Screen
          name="WaterPipes"
          component={WaterPipes}
          options={({ route }) => ({
            title: "Qu???n l?? tuy???n ???ng",
          })}
        />
        <Stack.Screen
          name="Models"
          component={Models}
          options={({ route }) => ({
            title: "Qu???n l?? Danh m???c",
          })}
        />
        <Stack.Screen
          name="DrawLine"
          component={DrawnLine}
          options={({ route }) => ({
            title: "V??? tuy???n ???ng",
          })}
        />
        <Stack.Screen
          name="FactoryManager"
          component={FactoryManager}
          options={({ route }) => ({
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name="ModuleDetail"
          component={ModuleScreen}
          options={({ route }) => ({
            title: "Module " + route.params.data.name,
          })}
        />
        <Stack.Screen
          name="ModuleAdd"
          component={AddModuleScreen}
          options={({ route }) => ({
            title: "Th??m m???i Module",
          })}
        />

        <Stack.Screen
          name="AddDevices"
          component={AddDevices}
          options={({ route }) => ({
            title: "Th??m m???i Thi???t b???",
          })}
        />
        <Stack.Screen
          name="PointImage"
          component={PointImageScreen}
          options={({ route }) => ({
            title: route.params.point.name,
          })}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
