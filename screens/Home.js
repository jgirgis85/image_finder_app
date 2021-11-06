import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  View,
  Alert,
} from "react-native";
import { Button, Divider, Input, Text } from "@ui-kitten/components";

export const HomeScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");

  const navigateDetails = () => {
    if (term === "") {
      Alert.alert("Error!", "Please specify a search term!", [], {
        cancelable: true,
      });
    } else {
      const searchTerm = term;
      setTerm("");
      navigation.navigate("Images", { term: searchTerm });
    }
  };

  return (
    <ImageBackground
      style={{ flex: 1, width: "100%", height: "100%" }}
      source={{
        uri: "https://cdn.pixabay.com/photo/2015/09/23/12/16/eiffel-tower-953596_960_720.jpg",
      }}
    >
      <View style={styles.MainContainer}>
        <Text style={styles.header} category="h3">
          Stunning free images
        </Text>
        <Input
          style={styles.input}
          size="medium"
          placeholder="Type to search"
          onChangeText={(text) => setTerm(text)}
          value={term}
        />
        <Button onPress={navigateDetails}>Search</Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "#fff",
  },
  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  input: {
    marginVertical: 30,
  },
});
