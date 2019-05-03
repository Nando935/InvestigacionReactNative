import React, {Component} from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  constructor(){
    super()
    this.state={
      resultText: "", 
      calculationText: ""
    }
    this.aperations = ['Del', '+', '-', '*', '/']
  }

  calculateResult(){
    const text=this.state.resultText
    console.log(text, eval(text))
    this.setState({
      calculationText: eval(text)
    })
  }

  buttonPressed(text){
    console.log(text)
    if(text=='='){
      return this.calculateResult(this.state.resultText)
    }

    this.setState({
      resultText: this.state.resultText+text
    })
  }

  operate(aperations){
    switch(aperations){
      case 'Del':
        let text=this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
      break
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar=this.state.resultText.split('').pop()

        if(this.aperations.indexOf(lastChar) > 0) return

        if(this.state.text == "") return
        this.setState({
          resultText: this.state.resultText+aperations
        })
    }
  }
  
  render(){
    let rows=[]
    let nums=[[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]

    for(let i=0; i<4; i++){
      let row=[]
      for(let j=0; j<3; j++){
        row.push(<TouchableOpacity onPress={()=> this.buttonPressed(nums[i][j])} style={styles.btn}>
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i=0; i<5; i++){
      ops.push(<TouchableOpacity style={styles.btn} onPress={()=> this.operate(this.aperations[i])}>
        <Text style={[styles.btnText, styles.white]}>{this.aperations[i]}</Text>
      </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>

        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>

        
          <View style={styles.buttons}>
              <View style={styles.numbers}>
                {rows}
              </View>

              <View style={styles.operations}>
                {ops}
              </View>
          </View>

          
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  resultText: {
    fontSize: 30,
    color: 'white'
  },

  btn: {
    alignItems: 'stretch', 
    alignSelf: 'stretch',
    justifyContent: 'center'

  },

  btnText: {
    fontSize: 40
  }, 

  white:{
    color: 'white',
    marginLeft: '40%'
  }, 

  calculationText: {
    fontSize: 24,
    color: 'white'
  },

  row: {
    flexDirection: 'row',
    flex: 1, 
    justifyContent: 'space-around', 
    alignItems: 'center'
  },

  result: {
    flex: 2, 
    backgroundColor: 'red', 
    justifyContent: 'center', 
    alignItems:'flex-end'
  },

  calculation: {
    flex: 1, 
    backgroundColor: 'green',
    justifyContent: 'center', 
    alignItems:'flex-end'
  },

  buttons: { 
    flex: 7,
    flexDirection: 'row'
  },

  numbers: {
    flex: 3, 
    backgroundColor: 'yellow'
  },

  operations: {
    flex: 1, 
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black'
  }
});
