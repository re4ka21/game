import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>; // додали проп style
};

export const BackButton: React.FC<Props> = ({
  color = "black",
  size = 24,
  style,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.arrow, style]} // об’єднуємо внутрішній стиль зі зовнішнім
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="arrow-left" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrow: {
    marginTop: 20,
  },
});
