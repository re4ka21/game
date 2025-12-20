import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useHonorsStore } from "@/entities";
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Honors">;

export default function HonorsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const owned = useHonorsStore((s) => s.received.length);

  const goTo = () => {
    navigation.navigate("Honors");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemCard} onPress={goTo}>
        <Image
          source={require("../../../../assets/images/airport.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <View style={styles.textBlock}>
          <Text style={styles.itemText}>Відзнаки</Text>
          <Text style={styles.counterText}>{owned} із 5</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  itemCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef3fa",
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderRadius: 26,
  },

  icon: {
    width: 70,
    height: 70,
    marginRight: 22,
  },

  textBlock: {
    flexDirection: "column",
  },

  itemText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  counterText: {
    marginTop: 6,
    fontSize: 15,
    color: "#8a8a8a",
  },
  line: {
    marginTop: 20,
    borderBottomWidth: 1.5,
    width: "40%",
    alignSelf: "center",
    borderColor: "#e4ecf9",
  },
});
