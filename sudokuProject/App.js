import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import axios from 'axios'

export default function App() {

  const [data, setData] = useState([])

  // const data = [
  //   [1,2,3,4,5,6,7,8,9],
  //   [2,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,6,9],
  // ]

  useEffect(() => {
    axios
      .get(`https://sugoku.herokuapp.com/board`)
      .then(({ data }) => {
        const { board } = data
        setData(board)
      }).catch((err) => {
        console.log(err)
      });
  }, [])


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
        listKey={(item, index) => index.toString()}
      />
      </View>
      <Button title="Submit" />
    </View>
  );
}

function Cell({ item }) {
  console.log(item)
    // const [ defaultVals, onChangeText ] = useState(item.toString())

  return (
    <View style={styles.viewStyle} >
      <FlatList 
        data = {item}
        renderItem = {({ item }) => (
          <TextInput 
          style={styles.inputStyle}
          keyboardType={'numeric'}
          maxLength={1}
          defaultValue={item.toString()}
          />
        )}
        numColumns={3}
        listKey={(item, index) => index.toString()}
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
