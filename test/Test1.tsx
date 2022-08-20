import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TextInputState,
} from "react-native";

export class InputBox extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View>
        <TextInput {...this.props} />
      </View>
    );
  }
}
