import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text } from "../../components/Themed";
import Layout from "../../constants/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { blueColorApp, textLight } from "../../constants/Colors";
import ButtonText from "../../components/Item/ButtonText";
import { validatePassword, validatePhoneNumber } from "../../utils/validate";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { RootLoginProps, RootStackScreenProps } from "../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { Styles } from "../../utils/helper/Styles";
import { Button, Checkbox, TextInput } from "react-native-paper";
import {
  setState,
  setStateAuthRemember,
  UsersState,
} from "../../redux/features/auth/authSlices";

import jwt_decode from "jwt-decode";
export default function Login({ navigation }: RootLoginProps<"one">) {
  const { password, checkedAuth, userName, errorMessage } = useAppSelector(
    (state) => state.auth
  );
  const [textUsername, setTextUsername] = useState<string>(
    userName ? userName : ""
  );
  const [textPassword, setTextPassword] = useState<string>(
    password ? password : ""
  );

  const [textError, setTextError] = useState<string | undefined>();

  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState(checkedAuth);

  const dispatch = useAppDispatch();

  const onPressLogin = () => {
    if (textUsername === "") {
      setTextError("Nhập tài khoản");
      return;
    }
    if (textPassword === "") {
      setTextError("Nhập mật khẩu");
      return;
    }

    if (textPassword && validatePassword(textPassword)) {
      setLoading(true);
      dispatch(
        setStateAuthRemember({
          input: {
            loading: "idle",
            checkedAuth: checked,
            userName: textUsername,
            password: textPassword,
          },
        })
      );
      ApiRequest.LoginApi({ phone: textUsername, password: textPassword })
        .then((res) => {
          if (res.code === "00") {
            setLoading(false);
            let state = {} as UsersState;
            const decode = jwt_decode(res.result) as object;
            console.log("decode", decode);

            try {
              state = {
                ...state,
                loading: "succeeded",
                token: res.result,
                // @ts-ignore
                userName:
                  // @ts-ignore
                  decode[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                  ],

                UserId:
                  // @ts-ignore
                  decode[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                  ],
              };
            } catch {
              state = {
                ...state,
                loading: "succeeded",
                token: res.result,
              };
            }
            dispatch(setState({ input: state }));
          } else {
            setLoading(false);
            setTextError(res.errorMessage);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setTextError("mật khẩu nhiều hơn 6 ký tự");
    }
  };

  return (
    <ScrollView>
      <View style={Styles.view_Container}>
        <Spinner visible={loading} textStyle={{ color: "#FFF" }} />
        {/* header */}
        <View style={Styles.view_Login_Header}>
          <Image
            source={require("../../assets/images/LogoApp/Logo_256_256.png")}
            resizeMode="cover"
            style={Styles.image_logoImage}
          />
          <Text style={Styles.text_Header_Logo}>DICHVUNUOC</Text>
          <Text style={Styles.text_Header_Logo_2}>Nhân viên</Text>
        </View>
        {/* body */}
        <View style={Styles.view_Login_Body}>
          <TextInput
            style={{ width: Layout.window.width - 20 }}
            placeholder={"tên đăng nhập"}
            outlineColor={"rgba(0,0,0,0)"}
            activeOutlineColor={blueColorApp}
            mode={"outlined"}
            value={textUsername}
            onChangeText={setTextUsername}
          />
          <View>
            <TextInput
              style={{ width: Layout.window.width - 20, margin: 5 }}
              placeholder={"Mật khẩu"}
              outlineColor={"rgba(0,0,0,0)"}
              activeOutlineColor={blueColorApp}
              mode={"outlined"}
              value={textPassword}
              onChangeText={setTextPassword}
              secureTextEntry={true}
            />
          </View>

          <View style={Styles.Empty}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
                color={blueColorApp}
              />
              <Text style={{ marginLeft: 5, color: textLight }}>
                Ghi nhớ tài Khoản
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={Styles.text_Error}>{textError}</Text>
            </View>
          </View>

          <View
            style={{
              width: Layout.window.width - 20,
              height: 60,
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <Button
              mode="contained"
              onPress={onPressLogin}
              contentStyle={{ height: 60, backgroundColor: blueColorApp }}
            >
              Đăng Nhập
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
