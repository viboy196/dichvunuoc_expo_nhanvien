import { StyleSheet } from "react-native";
import { blueColorApp, textLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";

export const Styles = StyleSheet.create({
  Empty: {
    flex: 1,
    width: Layout.window.width - 20,
  },
  view_Container: {
    width: Layout.window.width,
    height: Layout.window.height,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  view_Login_Header: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  view_LoginAfter_Header: {
    flex: 3,
    width: Layout.window.width,
    justifyContent: "center",
    alignItems: "center",
  },

  image_logoImage: { width: 100, height: 100 },
  text_Header_Logo: {
    color: blueColorApp,
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  text_Header_Logo_2: {
    color: textLight,
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },
  view_Login_Body: {
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text_Title_Input: {
    color: "#5a595b",
    fontSize: 16,
  },
  view_TextInput: {
    width: Layout.window.width - 40,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#aaaaaa",
    alignItems: "center",
    justifyContent: "center",
  },
  view_Button_RemoteText: {
    width: 50,
    height: 60,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  text_Error: { color: "red", position: "absolute", bottom: -25 },
  view_Button_Big: {
    width: Layout.window.width - 40,
    height: 60,
    backgroundColor: blueColorApp,
    borderRadius: 10,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text_Btn_Big: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  view_Footer: {
    height: 150,
    width: Layout.window.width - 40,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  view_arrow_back_1: {
    left: 0,
    top: 40,
    position: "absolute",
  },

  view_arrow_back_2: {
    width: 80,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
