import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {

  const data = [
    [1,2,3,4,5,6,7,8,9],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,9],
  ]


  return (
    <View style={styles.container}>
      <Text>SUDOKU - GOKILL</Text>
      <View style={styles.boardContainer}>
      <FlatList 
        style={styles.cellList}
        data={data}
        renderItem={({ item, index }) => (
          <Cell style={styles.viewStyle} item={item} />
        )}
        numColumns={3}
        keyExtractor={(data, index) => index.toString()}
      />
      </View>
      <Button title="Submit" />
    </View>
  );
}

// function Cell({col, index, indexCol} ){
//   console.log(col, index, indexCol, index.toString()+indexCol)
//   const [ defaultVals, onChangeText ] = useState(col.toString())

//   // return null
//   return (
//     <TextInput
//     style={{ height: 40, width: 40, borderColor: 'black', borderWidth: 1 }}
//     onChangeText={text => onChangeText(text)}
//     keyboardType={'numeric'}
//     // key={(index.toString()+indexCol)}
//     value={defaultVals}
//     />
//   )
// }

function Cell({ item }) {
  console.log(item)

  return (
    <View style={styles.viewStyle} >
      <FlatList 
        data = {item}
        renderItem = {({ item }) => (
          <TextInput 
          style={styles.inputStyle}
          onChangeText={text => onChangeText(text)}
          keyboardType={'numeric'}
          value={item.toString()}
          />
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
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
    height: "80%",
  },
  viewStyle: {
    width: 110,
    height: 110,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'blue'
  },
  inputStyle: {
    width: 30,
    height: 30,
    backgroundColor: 'grey',
    marginTop: 5,
    marginLeft: 5
  }
});
