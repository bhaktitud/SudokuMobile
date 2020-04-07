import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput, 
  FlatList } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchBoard,
    setUserResult, 
    validateResult,
    showResult
  } from './src/store/actions';

export default function App() {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>SUDOKU - GOKILL</Text>
        <Board />
      </View>
    </Provider>
  );
}

function Board () {

  const dispatch = useDispatch()

  const [ level, setLevel ] = useState('random')
  const [ childData, setChildData ] = useState([])
  const [ solveData, setSolveData ] = useState([])

  const board = useSelector(state => state.board)
  const userResult = useSelector(state => state.userResult)

  useEffect(() => {
    dispatch(fetchBoard(level))
  }, [])

  const handleOnValidate = () => {
    // console.log('masuk sini', userResult)
    dispatch(validateResult(userResult))
  }

  const handleOnShowFinal = () => {
    console.log('show me the way')
    dispatch(showResult(userResult))
  }

  return (
    <>
      <View style={styles.boardContainer}>
      <FlatList 
        style={styles.cellList}
        data={board}
        renderItem={({ item, index }) => (
          <Cell style={styles.viewStyle} item={item} index={index} board={board}/>
        )}
        numColumns={3}
        listKey={(item, index) => index.toString()}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      <View style={styles.buttonGameContainer}>
        <Button style={styles.buttonOnGame} title="Validate" 
            onPress={handleOnValidate}
        />
        <Button style={styles.buttonOnGame} title="Show me the way!"
          onPress={handleOnShowFinal}
        />
      </View>
    </>
  )
}

function Cell({ item, index, board }) {
  const rowIndex = index
  const [ defaultBoard, setDefault ] = useState(board)

  const dispatch = useDispatch()
  
  const onChangeValue = (text, indexCol, row) => {
    console.log(text)
    defaultBoard.map((cells, index) => {
      if (index == row){
        cells.splice(indexCol, 1, parseInt(text))
      }
    })
    dispatch(setUserResult(defaultBoard))
  }

  return (
    <View style={styles.viewStyle} >
      <FlatList 
        data = {item}
        renderItem = {({ item, index }) => (
          <TextInput 
          style={styles.inputStyle}
          keyboardType={'numeric'}
          maxLength={1}
          defaultValue={item.toString()}
          underlineColorAndroid="transparent"
          onChangeText={text => onChangeValue(text, index, rowIndex)}
          key={index.toString()+rowIndex}
          />
        )}
        numColumns={3}
        listKey={(item, index) => index.toString()}
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
    backgroundColor: 'black',
    width: "100%",
    margin: 10,
    height: "50%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  viewStyle: {
    width: 130,
    height: 130,
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: 'grey',
    alignItems:"center"
  },
  inputStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    width: 35,
    height: 35,
    backgroundColor: 'white',
    marginTop: 6,
    marginLeft: 2.5,
    marginRight:2.5
  },
  lottie: {
    width: 100,
    height: 100
  },
  textTitle:{
    fontSize: 30
  },
  buttonGameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%"
  }
});
