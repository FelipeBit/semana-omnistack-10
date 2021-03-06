import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar, YellowBox } from "react-native";

import Routes from "./src/routes";

YellowBox.ignoreWarnings(["unrecognized WebSocket"]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7040E7" />
      <Routes />
    </>
  );
}
