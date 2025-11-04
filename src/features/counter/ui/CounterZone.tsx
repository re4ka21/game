import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from "react-native";
import { useCounterStore } from "../model/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function CounterZone() {
  const { increment, clear } = useCounterStore();
  const { height } = useWindowDimensions();
  const [active, setActive] = useState(false);
  const [dollars, setDollars] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const nextId = useRef(0);

  const touchZoneHeight = height * 0.47;

  const handlePressIn = () => setActive(true);

  const handlePressOut = (e: any) => {
    setActive(false);
    increment();

    const { locationX, locationY } = e.nativeEvent;

    const id = nextId.current++;
    setDollars((prev) => [...prev, { id, x: locationX, y: locationY }]);

    setTimeout(() => {
      setDollars((prev) => prev.filter((d) => d.id !== id));
    }, 500);
  };

  return (
    <View style={[styles.container, { height: touchZoneHeight }]}>
      <TouchableOpacity
        style={[styles.touchArea, active && styles.touchAreaActive]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <MaterialCommunityIcons
          name="gesture-tap"
          size={100}
          color="black"
          style={[styles.iconTouch, active && { transform: [{ scale: 0.8 }] }]}
        />

        {dollars.map((d) => (
          <Dollar key={d.id} x={d.x} y={d.y} />
        ))}
      </TouchableOpacity>

      <Text style={styles.touchText}>touch for money</Text>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clear}
        activeOpacity={0.8}
      >
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const Dollar = ({ x, y }: { x: number; y: number }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const randomX = (Math.random() - 0.5) * 60;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.Text
      style={[
        styles.dollar,
        {
          left: x - 10,
          top: y - 10,
          transform: [{ translateY }, { translateX: randomX }],
          opacity,
        },
      ]}
    >
      <Ionicons name="logo-usd" size={24} color="black" />
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  touchArea: {
    width: "111%",
    height: "98%",
    justifyContent: "center",
    alignItems: "center",
  },
  touchAreaActive: {
    shadowColor: "#7CFC00",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5,
  },
  iconTouch: {
    opacity: 0.3,
  },
  touchText: {
    position: "absolute",
    bottom: 130,
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  clearButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    zIndex: 2,
  },
  clearText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "bold",
  },
  dollar: {
    position: "absolute",
    fontSize: 28,
  },
});
