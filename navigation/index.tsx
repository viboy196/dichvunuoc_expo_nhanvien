/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
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

import { blueColorApp } from "../constants/Colors";
import ListWaterIndex from "../screens/ListWaterIndex";
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
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
            title: "Chụp ảnh mặt đồng hồ nước",
          })}
        />
        <Stack.Screen
          name="ScanfQrCode"
          component={ScanfQrCodeScreen}
          options={{
            title: "Quét mã đồng hồ nước",
          }}
        />

        <Stack.Screen
          name="InfoDetail"
          component={InfoDetailScreen}
          options={({ route }) => ({
            title: `Thông tin cá nhân`,
          })}
        />
        <Stack.Screen
          name="ReadMeterPeriod"
          component={ReadMeterPeriodScreen}
          options={{ title: "Lịch đọc nước" }}
        />
        <Stack.Screen
          name="KhuVucDoScreen"
          component={KhuVucDoScreen}
          options={({ route }) => ({ title: route.params.tollAreaName })}
        />
        <Stack.Screen
          name="ChiTietSoDoScreen"
          component={ChiTietSoDoScreen}
          options={({ route }) => ({ title: route.params.waterUserName })}
        />

        <Stack.Screen
          name="UseWaterRegister"
          component={UseWaterRegisterScreen}
          options={{ title: "Yêu cầu đăng ký nước" }}
        />

        <Stack.Screen
          name="ListContract"
          component={ListContractScreen}
          options={{ title: "Danh sách hợp đồng" }}
        />

        <Stack.Screen
          name="ListWaterIndex"
          component={ListWaterIndex}
          options={{ title: "Danh sách chỉ số nước" }}
        />

        <Stack.Screen
          name="AddContract"
          component={AddContractScreen}
          options={{ title: "Thêm mới hợp đồng" }}
        />

        <Stack.Screen
          name="DetailContract"
          component={DetailContractScreen}
          options={{ title: "Chi tiết hợp đồng" }}
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
