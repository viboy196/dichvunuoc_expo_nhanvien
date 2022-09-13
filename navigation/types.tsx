/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LocationMaps, _Location } from "../screens/AreaMap";
import { WaterUser } from "../utils/api/apiTypes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: NavigatorScreenParams<RootLoginParamList> | undefined;
  MyWebView: { title: string; url: string };
  InfoDetail: undefined;
  CameraWaterScreen: {
    waterUserId?: string;
    waterUserName?: string;
    waterMeterCode?: string;
    waterUserAddress?: string;
  };
  ScanfQrCode: {
    name?: string;
    type?: string;
  };
  ReadMeterPeriod: {
    month: number;
    year: number;
  };
  KhuVucDoScreen: {
    tollAreaId: string;
    tollAreaName: string;
    location?: _Location;
  };
  ChiTietSoDoScreen: {
    waterUserId: string;
    waterUserName: string;
    waterMeterCode: string;
  };
  UseWaterRegister: undefined;
  ListContract: undefined;
  ListWaterIndex: undefined;
  AddContract: undefined;
  DetailContract: {
    waterUser: WaterUser;
  };
  AreaMap: LocationMaps;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootLoginParamList = {
  one: undefined;
};
export type RootLoginProps<Screen extends keyof RootLoginParamList> =
  NativeStackScreenProps<RootLoginParamList, Screen>;

export type RootRegisterParamList = {
  Register1: undefined;
  Register2: { userName: string; fullName: string };
};
export type RootRegisterProps<Screen extends keyof RootRegisterParamList> =
  NativeStackScreenProps<RootRegisterParamList, Screen>;

export type RootTabParamList = {
  TabHome: undefined;
  TabRequest: undefined;
  TabInfo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
