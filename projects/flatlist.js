import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { data } from "./data.json";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: "25px", margin: "10px" }}>FLATLIST</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: "5px",
              marginBottom: "10px",
            }}
          >
            <Text>{item.completed ? "✅" : "❌"}</Text>
            <Text>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={{
          backgroundColor: "lightgray",
          borderRadius: "5px",
          padding: "15px",
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
