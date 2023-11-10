import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function App() {
  const [inputValue, setInputValue] = useState("0");
  const [originValue, setOriginValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("0");
  const [originItems, setOriginItems] = useState([]);
  const [targetItems, setTargetItems] = useState([]);

  const convertCurrency = async () => {
    const url = `https://currency-exchange.p.rapidapi.com/exchange?from=${originValue}&to=${targetValue}&q=1`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const multipliedUnit = parseFloat(result * parseFloat(inputValue)).toFixed(2)
      setConvertedValue(multipliedUnit);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      const url = "https://currency-exchange.p.rapidapi.com/listquotes";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04",
          "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const itemListFromArray = (array) => {
          const itemList = [];
          array.forEach((c) => {
            itemList.push({ label: c, value: c });
          });
          return itemList;
        };
        console.log(itemListFromArray(result));
        setOriginItems(itemListFromArray(result));
        setTargetItems(itemListFromArray(result));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrency();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cash convertor</Text>
      <Text style={styles.subTitle}>Séléctionnez une valeur et les devises.</Text>
      <View>
        <View style={styles.field}>
          <TextInput style={styles.currency} value={inputValue} onChangeText={setInputValue} />
          <SelectList setSelected={(val) => setOriginValue(val)} data={originItems} search={false} />
        </View>
        <Text style={styles.separator}>=</Text>
        <View style={styles.field}>
          <Text style={styles.currency}>{convertedValue}</Text>
          <SelectList setSelected={(val) => setTargetValue(val)} data={targetItems} search={false} />
        </View>
      </View>
      <Pressable style={styles.button} onPress={convertCurrency}>
        <Text style={styles.buttonText}>Convertir !</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 20
  },
  field: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  currency: {
    width: 100,
    padding: 5,
    borderRadius: 5,
    fontSize: 25,
  },
  separator: {
    margin: 20,
    textAlign: "center",
    fontSize: 30
  },
  button: {
    marginTop: 80,
    borderRadius: 5,
    padding: 12,
    backgroundColor: "#DDD",
  },
  buttonText: {
    fontSize: 20
  }
});
