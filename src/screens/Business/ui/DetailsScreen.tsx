import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { useRandomBusinessName } from "@/screens/Business";
import { useBusinessPurchase } from "@/screens/Business";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BusinessDetails"
>;
type BusinessDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "BusinessDetails"
>;
export default function BusinessDetailsScreen() {
  const route = useRoute<BusinessDetailsScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { business } = route.params;
  const { canOpenBusiness, openBusiness } = useBusinessPurchase();
  const generateRandomName = useRandomBusinessName(business.name);
  const [customName, setCustomName] = useState("");
  const [showWarning] = useState(false);
  const handleOpenBusiness = () => {
    if (!canOpenBusiness(business.price)) return;
    if (customName.trim().length < 3)
      return Alert.alert("Название должно быть не менее 3 символов");
    openBusiness(business, customName);
    navigation.navigate("Tabs", { screen: "Business" });
  };

  const handleRandomName = () => setCustomName(generateRandomName(customName));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вкажіть назву{"\n"}магазину</Text>
      {showWarning && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          Недостатньо коштів
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.diceButton} onPress={handleRandomName}>
          <Text style={styles.diceIcon}>🎲</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Назва"
          style={styles.input}
          value={customName}
          onChangeText={setCustomName}
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Вартість відкриття</Text>
        <Text style={styles.price}>
          ${business.price.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleOpenBusiness}>
        <Text style={styles.buttonText}>Відкрити бізнес</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  diceButton: {
    marginRight: 8,
  },
  diceIcon: {
    fontSize: 22,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  infoBox: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 12,
    paddingVertical: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  back: {
    marginTop: 10,
  },
  backText: {
    textAlign: "center",
    color: "#555",
  },
});
