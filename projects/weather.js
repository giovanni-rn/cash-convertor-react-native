import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  View,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({
    location: { city: "Paris", country: "France" },
    current_observation: {
      astronomy: { sunrise: "06h50" },
      condition: {
        temperature: 12,
        text: "Sunny",
      },
    },
  });

  const onSubmit = async () => {
    setWeather();
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=c`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04",
        "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setWeather(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Météo</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Valider</Text>
      </Pressable>
      {weather ? (
        <View>
          <Text style={styles.text}>
            {weather.location.city}, {weather.location.country}
          </Text>
          <Text style={styles.text}>
            {weather.current_observation.condition.text}
          </Text>
          <Text style={styles.text}>
            Température : {weather.current_observation.condition.temperature}°c
          </Text>
          <Text style={styles.text}>
            Lever du soleil : {weather.current_observation.astronomy.sunrise}
          </Text>
        </View>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    height: "100%",
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    backgroundColor: "lightgrey",
    marginBottom: 10,
    borderRadius: 5,
    padding: 5,
    width: "70%",
  },
  button: {
    backgroundColor: "#0081f1",
    padding: 9,
    borderRadius: 5,
    width: "70%",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  text: {
    fontSize: 17,
  },
});
