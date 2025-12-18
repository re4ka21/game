import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useBusinessStore } from "@/entities";
import { useCounterStore } from "@/features/counter";
import AntDesign from "@expo/vector-icons/AntDesign";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";

type ChangeNameScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChangeName"
>;

type ChangeNameScreenRouteProp = RouteProp<RootStackParamList, "ChangeName">;

type Props = {
  navigation: ChangeNameScreenNavigationProp;
  route: ChangeNameScreenRouteProp;
};

export default function ChangeNameScreen({ route, navigation }: Props) {
  const { business } = route.params;
  const [newName, setNewName] = useState(business.name);

  const { count, purchase } = useCounterStore();
  const renameBusiness = useBusinessStore((state) => state.renameBusiness);

  const renameCost = business.price * 0.05;

  const handleRename = () => {
    if (count < renameCost) {
      return alert("Недостатньо коштів для зміни назви!");
    }

    purchase(renameCost);
    renameBusiness(business.id, newName);

    navigation.navigate("Tabs", { screen: "Business" });
  };

  if (!business) {
    return (
      <View style={styles.container}>
        <Text>Бізнес не знайдено</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Зміна назви</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
          placeholder="Назва"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Вартість</Text>
        <Text style={styles.infoPrice}>
          $ {renameCost.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRename}>
        <Text style={styles.buttonText}>Змінити назву</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
  },
  arrow: { marginBottom: 15 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
  },
  infoBox: {
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 16,
    color: "#555",
  },
  infoPrice: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
