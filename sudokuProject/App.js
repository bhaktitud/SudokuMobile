import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput, 
  FlatList, 
  Image,
  Alert,
  Picker,
  ActivityIndicator
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchBoard,
    setUserResult, 
    validateResult,
    showResult,
    setValidateStatus,
    setPlayername,
    setGameLevel,
    setLoading
  } from './src/store/actions';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import moment from 'moment'


const Stack = createStackNavigator();

function App() {

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SUDOKU" component={Board}/>
            <Stack.Screen name="Finish" component={FinishScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Win" component={WinScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}

function HomeScreen ({ navigation }) {

  const [ placeholder, onChangeText ] = useState('Player')
  const [selectedValue, setSelectedValue] = useState('random');

  const dispatch = useDispatch()

  const onSelectedLevel = (itemValue, itemIndex) => {
    console.log(itemValue)
    setSelectedValue(itemValue)
  }

  const navToBoard = () => {
    dispatch(setPlayername(placeholder))
    dispatch(setGameLevel(selectedValue))
    dispatch(setLoading(true))
    navigation.push('SUDOKU')
  }

  return(
    <View style={styles.container}>
      <View style={styles.homeScreen}>
        <Image
        style={styles.image1} 
        source={require('./assets/image1.png')}
        />
        <Text style={styles.textTitle}>SUDOKU - GOKILL</Text>
        <Text style={styles.captTitle}>"Let your brain drain..."</Text>
        <TextInput 
          placeholder={'Your Name'}
          style={styles.inputName}
          onChangeText={(text) => onChangeText(text)}
        />
        <Text>Difficulty</Text>
        <Picker
        mode={"dialog"}
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => onSelectedLevel(itemValue, itemIndex)}
      >
        <Picker.Item label="Random" value="random" />
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
        <Button title="START GAME" 
          onPress={() => navToBoard()}
        />
      </View>
    </View>
  )
}

function FinishScreen ({ navigation }) {
  return(
    <View style={styles.container}>
      <View style={styles.homeScreen}>
        <Text style={styles.textTitle}>Congratulations!</Text>
        <Text style={styles.captTitle}>"It is NOT for you, we congratulate the BOT! :P"</Text>
        <Button style={styles.playAgain} title="PLAY AGAIN" 
          onPress={() => navigation.push('SUDOKU')}
        />
      </View>
    </View>
  )
}

function WinScreen ({ navigation }) {
  return(
    <View style={styles.container}>
      <View style={styles.homeScreen}>
        <Text style={styles.textTitle}>Congratulations!</Text>
        <Text style={styles.captTitle}>"You are the real genius!"</Text>
        <Button style={styles.playAgain} title="PLAY AGAIN" 
          onPress={() => navigation.push('SUDOKU')}
        />
      </View>
    </View>
  )
}

function Board ({ navigation }) {

  const [ initTimer, setInitTimer ] = useState({
    eventDate:moment.duration().add({hours:0,minutes:0,seconds:1}),
    hours:0,
    mins:0,
    secs:0
  })

  const updateTimer = () => {
    
    const x = setInterval(() => {
      let { eventDate } = initTimer

      if(eventDate <=0){
        clearInterval(x)
      }else {
        eventDate = eventDate.add(1, 'second')
        const hours = eventDate.hours()
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()
        
        setInitTimer({
          hours,
          mins,
          secs,
          eventDate
        })
      }
    },1000)

  }

  const dispatch = useDispatch()

  const board = useSelector(state => state.board)
  const userResult = useSelector(state => state.userResult)
  const gameStatus = useSelector(state => state.status)
  const playerName = useSelector(state => state.playerName)
  const level = useSelector(state => state.level)
  const isLoading = useSelector(state => state.isLoading)

  useEffect(() => {
    dispatch(fetchBoard(level))
    dispatch(setValidateStatus('unsolved'))
    updateTimer()
  }, [])

  const handleOnValidate = () => {
    dispatch(validateResult(userResult))
    if(gameStatus == 'solved'){
      navigation.push('Win')
    } else {
      Alert.alert(
        "Game Notice",
        `Game status : ${gameStatus}, therefore we cannot validate your result. Finish it!`,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }

  const handleOnShowFinal = () => {
    Alert.alert(
      "Confirmation",
      "Do really want to give up?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes Please", onPress: () => {
            dispatch(showResult(board))
          }
        }
      ]
    );
  }



  return (
    <View style={styles.containerGame}>
      <ActivityIndicator animating={isLoading} size="large" color="#0000ff" style={styles.loadingStyle} />
      <Text style={styles.playerName}>{`${initTimer.hours} : ${initTimer.mins} : ${initTimer.secs}`}</Text>
    <View style={styles.topBoardBar}>
      <Text style={styles.playerName}>{playerName}</Text>
    </View>
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
      <View style={styles.statusBar}>
        <Text style={styles.botBoardBar}>Game Status : {gameStatus} | Difficulty : {level}</Text>
      </View>
    </View>
  )
}

function Cell({ item, index, board }) {
  const rowIndex = index
  const [ defaultBoard, setDefault ] = useState(board)

  const dispatch = useDispatch()
  
  const onChangeValue = (text, indexCol, row) => {

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
          editable={item == 0 ? true: false} 
          style={item == 0 ? styles.inputStyle: styles.clueStyle}
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
  containerGame:{
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  boardContainer: {
    backgroundColor: 'brown',
    width: "100%",
    margin: 5,
    height: "56%",
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
  clueStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    width: 35,
    height: 35,
    backgroundColor: 'green',
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
  },
  statusBar: {
    marginTop: 10,
    backgroundColor: '#0abbff',
    width: '100%'
  },
  captTitle:{
    fontStyle: "italic",
  },
  image1: {
    width: 120,
    height: 100
  },
  homeScreen: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  inputName: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: 200,
    height: 50,
    marginTop: 15,
    marginBottom: 5,
    fontSize: 20,
    textAlign: "center"
  },
  playerName: {
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: 'bold'
  },
  topBoardBar: {
    width: '100%',
  },
  botBoardBar: {
    textTransform: "uppercase",
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row'
  }
});

export default App;