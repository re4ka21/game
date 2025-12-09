import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Island">;

export default function IslandCard() {
  const navigation = useNavigation<NavigationProp>();

  const goTo = () => {
    navigation.navigate("Island");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={goTo}>
        <View style={styles.topBlock}>
          <Image
            source={require("../../../../assets/images/react-logo.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <LinearGradient
          colors={["#3ddc84", "#0a3f5f"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bottomBlock}
        >
          <Text style={styles.label}>Острова</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  card: {
    width: "100%",
    height: 160,
    backgroundColor: "#f4f7fb",
    borderRadius: 26,
    overflow: "hidden",
  },

  topBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f7fb",
  },

  bottomBlock: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },

  icon: {
    width: 80,
    height: 80,
  },
});
