import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type HomeProps = {
  openSheet: () => void;
};

const Home: React.FC<HomeProps> = ({ openSheet }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome! Let's chat below!
      </Text>
      <TouchableOpacity style={styles.button} onPress={openSheet}>
        <Text style={styles.buttonText}>Open Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff" 
  },
  welcome: { 
    fontSize: 20, 
    marginBottom: 32, 
    textAlign: "center" 
  },
  button: { 
    backgroundColor: "#3182ce", 
    paddingHorizontal: 32, 
    paddingVertical: 14, 
    borderRadius: 24 
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 18 
  },
});

export default Home;
