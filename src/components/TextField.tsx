import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

export type TextFieldProps = Omit<TextInputProps, "placeholder"> & {
  label: string;
};

export const TextField: React.FunctionComponent<TextFieldProps> = ({
  label,
  value,
  style,
  ...textFieldProps
}) => {
  const [state, setState] = useState({
    borderWidth: 1,
    borderColor: "#D3D3D3",
  });

  const onFocus = () => {
    setState({
      borderWidth: 2,
      borderColor: "#3467eb",
    });
  };

  const onBlur = () => {
    setState({
      borderWidth: 1,
      borderColor: "#D3D3D3",
    });
  };

  const textInputStyle = {
    height: 60,
    paddingLeft: 16,
    fontSize: 20,
    borderWidth: state.borderWidth,
    borderColor: state.borderColor,
    borderRadius: 5,
  };
  return (
    <View style={style}>
      <TextInput
        style={{
          height: 60,
          paddingLeft: 16,
          fontSize: 20,
          borderWidth: state.borderWidth,
          borderColor: state.borderColor,
          borderRadius: 5,
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        placeholder={label}
        placeholderTextColor="#cfaca9"
        {...textFieldProps}
      />
    </View>
  );
};
