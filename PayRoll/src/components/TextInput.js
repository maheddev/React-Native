import React, { useState } from "react";
import { TextInput } from "react-native";

const CustomTextInput = ({ placeholder, style, onChangeText }) => {
  const [text, setText] = useState("");

  return (
    <TextInput
      placeholder={placeholder}
      style={style}
      onChangeText={text => {
        setText(text);
        onChangeText(text);
      }}
      value={text}
    />
  );
};

export default CustomTextInput;
