import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Image,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCounterStore } from "../model/store";

export default function CounterZone() {
  const { increment, clear, reset, cheat } = useCounterStore();
  const { height } = useWindowDimensions();
  const [dollars, setDollars] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const nextId = useRef(0);

  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const touchZoneHeight = height * 0.47;

  const triggerGlow = () => {
    glowAnim.setValue(0);
    Animated.sequence([
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePress = (e: GestureResponderEvent) => {
    triggerGlow();
    increment();

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    const { locationX, locationY } = e.nativeEvent;
    const id = nextId.current++;
    setDollars((prev) => [...prev, { id, x: locationX, y: locationY }]);
    setTimeout(() => {
      setDollars((prev) => prev.filter((d) => d.id !== id));
    }, 500);
  };

  const glowBorder = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "#00FF66"],
  });

  const glowShadow = glowAnim.interpolate({
    inputRange: [0, 0.2],
    outputRange: [0, 0.2],
  });

  return (
    <View style={[styles.container, { height: touchZoneHeight }]}>
      <Animated.View
        style={[
          styles.glowWrapper,
          {
            borderColor: glowBorder,
            shadowColor: "#00FF66",
            shadowRadius: glowShadow,
            elevation: glowShadow,
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={handlePress}>
          <Animated.View
            style={[styles.touchArea, { transform: [{ scale: scaleAnim }] }]}
          >
            <Image
              source={require("../../../../assets/images/touch.png")}
              style={styles.iconTouch}
            />
            {dollars.map((d) => (
              <Dollar key={d.id} x={d.x} y={d.y} />
            ))}
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>

      <Text style={styles.touchText}>touch for money</Text>

      <TouchableWithoutFeedback onPress={clear}>
        <View style={styles.clearButton}>
          <Text style={styles.clearText}>Clear</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={reset}>
        <View style={styles.clearAsyncButton}>
          <Text style={styles.clearText}>Clear asyncStorage</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={cheat}>
        <View style={styles.cheatBtn}>
          <Text style={styles.cheatText}>cheat</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const Dollar = ({ x, y }: { x: number; y: number }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const randomX = (Math.random() - 0.5) * 60;

  useEffect(() => {
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
  glowWrapper: {
    width: "111%",
    height: "98%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  touchArea: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  iconTouch: {
    width: 150,
    height: 150,
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
  clearAsyncButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 2,
  },
  cheatBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    padding: 10,
    zIndex: 2,
  },
  cheatText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "bold",
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
