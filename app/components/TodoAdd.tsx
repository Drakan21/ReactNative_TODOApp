import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';

const TodoAdd = ({addTodo}) => {
  const [todoText, setTodoText] = useState('');

  const handleOnPressAdd = () => {
    todoText
      ? addTodo(todoText)
      : ToastAndroid.showWithGravity(
          'Todo Requires Text!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
    setTodoText('');
  };

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="enter new todo..."
        value={todoText}
        onChangeText={text => setTodoText(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleOnPressAdd}>
        <Text style={styles.addButtonText}>add item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 24,
    height: '100%',
  },
  textInput: {
    paddingHorizontal: 12,
    width: '100%',
    borderWidth: 1,
    height: 48,
    marginBottom: 12,
    borderRadius: 5,
    backgroundColor: 'whitesmoke',
    opacity: 0.8,
  },
  addButton: {
    width: '100%',
    height: 48,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default TodoAdd;
