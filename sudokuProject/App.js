import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>SUDOKU - GOKILL</Text>
      <View style={styles.boardContainer}>
      <Cell />
      </View>
      <Button title="Submit" />
    </View>
  );
}

function Cell() {
  return (
    <TextInput
    style={{ height: 40, width: 40, borderColor: 'black', borderWidth: 1 }}
    onChangeText={text => onChangeText(text)}
    keyboardType={'numeric'}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    backgroundColor: 'red',
    width: "90%",
    margin: 2,
    height: "80%"
  }
});
