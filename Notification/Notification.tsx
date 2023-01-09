import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Alert, Platform } from "react-native";
import { logOut } from "../redux/features/auth/authSlices";
import { setStateNotification } from "../redux/features/NotificationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import ApiRequest from "../utils/api/Main/ApiRequest";

Notifications.setNotificationHandler({
  handleNotification: async (noti) => {
    if (noti.request.content.title === "BlackBox") {
      return {
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    }
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState<string>();

  const { token, userName } = useAppSelector((s) => s.auth);

  const noti = useAppSelector((s) => s.noti);

  const dispatch = useAppDispatch();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  //add this
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        // if (notification.request.content.title !== null) ShowNotification();
        console.log("addNotificationReceivedListener");
        console.log(notification.request.content);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("addNotificationResponseReceivedListener");
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    if (
      expoPushToken &&
      token &&
      userName &&
      noti.expoToken !== expoPushToken
    ) {
      dispatch(
        setStateNotification({
          input: { expoToken: expoPushToken, isSend: false },
        })
      );
    }
  }, [expoPushToken, token, userName]);
  // useEffect(() => {
  //   if (lastNotificationResponse) {
  //     const data = JSON.stringify(
  //       lastNotificationResponse.notification.request.content.data
  //     );
  //     const json = JSON.parse(data);

  //     console.log("lastNotificationResponse", data);
  //     getFullPath({ invoiceId: json.invoiceId });
  //   }
  // }, [lastNotificationResponse]);

  return <></>;
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
