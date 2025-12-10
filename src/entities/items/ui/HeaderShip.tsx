import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { GarageItem } from "@/features/garage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
type Props = { item: GarageItem };

export default function HeaderShip({ item }: Props) {
  const navigation = useNavigation();
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Image
        source={item.image}
        style={[styles.image, { top: -statusBarHeight }]}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>Цена от ${item.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 20,
  },

  image: {
    position: "absolute",
    left: -21,
    right: 0,
    width: "115%",
    height: 200,
    zIndex: -1,
  },

  content: {
    marginTop: 200,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#777",
  },
});
