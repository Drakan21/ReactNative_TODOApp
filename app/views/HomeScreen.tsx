// == imports
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import uuid from 'react-native-uuid';

// == custom items
import TodoItem from '../components/TodoItem';
import TodoAdd from '../components/TodoAdd';

type Props = {};

const HomeScreen = (props: Props) => {
  const [todos, setTodos] = useState([
    {
      id: uuid.v4(),
      text: 'Buy Milk',
      completed: false,
    },
    {
      id: uuid.v4(),
      text: 'Buy Bread',
      completed: false,
    },
    {
      id: uuid.v4(),
      text: 'Check mail',
      completed: false,
    },
    {
      id: uuid.v4(),
      text: 'Walk Dog',
      completed: true,
    },
    {
      id: uuid.v4(),
      text: 'Water Plants',
      completed: false,
    },
  ]);

  const handleAddTodo = text => {
    setTodos(oldTodos => [{id: uuid.v4(), text}, ...oldTodos]);

    ToastAndroid.showWithGravity(
      'Todo added!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const handleToggleComplete = (id, value) => {
    const newTodos = [...todos];
    const toggleTodo = newTodos.find(todo => todo.id === id);
    toggleTodo.completed = value;
    setTodos(newTodos);
  };

  const handleOnRemoveTodo = id => {
    setTodos(oldTodos => oldTodos.filter(todo => todo.id !== id));
    ToastAndroid.showWithGravity(
      'Todo removed!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <ImageBackground
        style={{width: '100%', height: '100%', blur: 20}}
        source={require('../images/appbg.jpg')}>
        <View style={styles.parentContainer}>
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={require('../images/lollipop.jpg')}
            />
            <Text style={styles.headerText}>Todo List [{todos.length}]</Text>
          </View>
          <KeyboardAvoidingView
            style={styles.bodyContainer}
            behavior={'padding'}>
            <FlatList
              data={todos}
              renderItem={({item}) => (
                <TodoItem
                  item={item}
                  removeItem={handleOnRemoveTodo}
                  toggleComplete={handleToggleComplete}
                />
              )}
              ListEmptyComponent={
                <Text style={styles.emptyTodoText}>Add Todos!</Text>
              }
            />
          </KeyboardAvoidingView>
          <View style={styles.todoAddContainer}>
            <TodoAdd addTodo={handleAddTodo} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  headerText: {
    marginLeft: 24,
    fontSize: 32,
    fontWeight: '600',
  },
  bodyContainer: {
    justifyContent: 'flex-start',
    paddingLeft: 6,
    paddingRight: 12,
    flex: 1,
  },
  todoAddContainer: {
    width: '100%',
    height: 150,
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    bottom: 0,
  },
  text: {
    color: 'red',
  },
  emptyTodoText: {
    textAlign: 'center',
    padding: 24,
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
  },
});

export default HomeScreen;
