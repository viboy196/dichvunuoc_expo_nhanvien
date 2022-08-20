/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      ReadMeterPeriod:'ReadMeterPeriod',
      CameraWaterScreen:'CameraWaterScreen',
      ChiTietSoDoScreen:'ChiTietSoDoScreen',
      InfoDetail:'InfoDetail',
      KhuVucDoScreen:'KhuVucDoScreen',
      ListContract:'ListContract',
      ScanfQrCode:'ScanfQrCode',
      UseWaterRegister:'UseWaterRegister',
      MyWebView:'MyWebView',
      Main: {
        screens: {
          TabHome: {
            screens: {
              TabHome:'TabHome'
            },
          },
          TabRequest: {
            screens: {
              TabRequest: 'TabRequest',
            },
          },
          TabInfo: {
            screens: {
              TabInfo: 'TabInfo',
            },
          },
        },
      },
      Login :{
        screens:{
          one:{screens:{
            Login:'Login'
          }},
        }
      },
    },
  },
};

export default linking;
