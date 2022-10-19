import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, StatusBar } from 'react-native';

export default function App() {
    
    const [ lastNumber, setLastNumber ] = useState();
    const [ currentNumber, setCurrentNumber ] = useState('');
    //chuỗi số vừa nhập
    const operators = [ "AC", "DEL", "%", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "âm", 0, ".", "=" ];


       const styles = StyleSheet.create({
      main: {
        flex: 1,
        display: 'flex',
      },

      resultContainer: {
        backgroundColor: 'white',
        flex: 2,
        maxWidth: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },

      themeTouchable : {
        position: 'absolute', 
        justifyContent: "flex-end",
        alignSelf: "flex-start",
        marginLeft: 15,
        bottom: '65%',
      },
      
      textContainer: {
        minHeight: 105,
        justifyContent: "flex-end"
      },
    
      textHistory: {
        color:"#000",
        fontSize: 26,
        paddingRight: 15,
        alignSelf: "flex-end",
      },
    
      textResult: {
        color:"#000",
        fontSize: 36,
        paddingRight: 15,
        alignSelf: "flex-end",
     
      },
    
      operatorContainer: {
        backgroundColor: "#FFF",
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        justifyContent: 'center',
        lignItems: 'flex-end',
      },
      
      operators: {
        flex: 1,
        minHeight: Dimensions.get('window').height/10,
        minWidth: Dimensions.get('window').width/5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        margin: 2,
      }, 
      
      operatorsText: {
        color: "#FFF",
        fontSize: 24,
      }
    });
    

    function handleButtonPress(buttonPressed){
      if(buttonPressed == "+" || buttonPressed == "-" || buttonPressed == "*" || buttonPressed == "/"){
        
        if(currentNumber.toString().indexOf("+") == -1 && currentNumber.toString().indexOf("-") == -1 &&
         currentNumber.toString().indexOf("*") == -1 && currentNumber.toString().indexOf("/") == -1){
          //Nếu trong currentNumber chưa từng nhập toán tử
          //Tạo ra khoảng trắng giữa số và toán tử
          setCurrentNumber(currentNumber + " " + buttonPressed + " ");
          //nếu người dùng nhập vào cuối có toán tử thì không xử lý.
          //AC 9 +
          return;
        }else{
          //9+***
          //Nếu trong biểu thức đã có toán tử mà người dùng vẫn nhập thêm toán tử thì xóa toán tử có sẵn.
          const newNumberCurrent = currentNumber.toString().substring(0, currentNumber.length - 3);
          setCurrentNumber('');
          setCurrentNumber(newNumberCurrent + " " + buttonPressed + " ");
          return;
        }
      }

      switch(buttonPressed){
        case 'AC':
          setLastNumber('');
          setCurrentNumber('');
        return;
        case 'DEL':
          setCurrentNumber(currentNumber.slice(0, -1));
        return;
        case '=':
          setLastNumber(currentNumber + "=");
          calculate()
        return;
        case 'âm':
          var change = currentNumber * -1;
          isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
        return;
        case '%':
          var change = currentNumber / 100;
          isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
        return;
      }
      // console.log(currentNumber+"   "+ buttonPressed);
      //Nếu ký tự nhập vào là 1 số thì add vào curentNumber
     setCurrentNumber(currentNumber + buttonPressed);
    }

    function calculate(){
     const splitNumbers = currentNumber.toString().split(" ");
     const firstNumber = parseFloat(splitNumbers[0]);
     const secondNumber = parseFloat(splitNumbers[2]);
     const operation = splitNumbers[1];

    //  console.log("splitNumbers"+splitNumbers)
    //  console.log("firstNumber"+firstNumber)
    //  console.log("secondNumber"+secondNumber)
    //  console.log("operation"+operation)
      if(!isNaN(secondNumber)){
        switch(operation){
          case '+':
            var result = firstNumber + secondNumber;
            setCurrentNumber(result);
          return;
          case '-':
            var result = firstNumber - secondNumber;
            setCurrentNumber(result);
          return;
          case '*':
            var result = firstNumber * secondNumber;
            setCurrentNumber(result);
          return;
          case '/':
            var result = firstNumber / secondNumber;
            setCurrentNumber(result);
          return;
          default: 
            setLastNumber('');
            setCurrentNumber('');
          return;
        }
      }else{
        Alert.alert("Invalid format");
      }
    }

  return (
    <View style={styles.main}>
      <View 
        style={styles.resultContainer}>
        <TouchableOpacity style={styles.themeTouchable}>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.textHistory}>
            {lastNumber}
          </Text>
          <Text style={styles.textResult}>
            {currentNumber}
          </Text>

        </View>
      </View>
    
      <View style={styles.operatorContainer}>
          {
            operators.map((char) => (
               (char) === 'AC' ?
                <TouchableOpacity
                  key={char} 
                  style={[styles.operators, {backgroundColor:'#FF024A'}]}
                  onPress={() => handleButtonPress(char)}
                >
                  <Text style={styles.operatorsText}>{char}</Text>
                </TouchableOpacity>
              :
                <TouchableOpacity 
                  key={char} 
                  style={[styles.operators, {
                    backgroundColor: typeof(char) === 'number'  || (char) === 'DEL'  || (char) === '%' || (char) === 'âm' || (char) === '.'  ? 
                      '#282828'
                      :
                      '#ff9f00'
                  }]}
                  onPress={() => handleButtonPress(char)}
                >
                  {/* Ký tự bên trong nút bấm */}
                  <Text style={styles.operatorsText}>{char}</Text>
                </TouchableOpacity>

            ))
          }
      </View>
    </View>
    );
}
