// === Import
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  UIManager,
  useWindowDimensions,
  Easing,
} from 'react-native';

import React, {useRef, useState, useEffect} from 'react';
// ============

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ============

const TodoItem = ({item, removeItem, toggleComplete}) => {
  const {id, text, completed} = item;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translation = useRef(new Animated.Value(500)).current;

  const onRemove = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100,
    }).start(({finished}) => removeItem(id));
  };

  useEffect(() => {
    Animated.parallel(
      [
        Animated.timing(translation, {
          useNativeDriver: true,
          ease: Easing.bounce(),
          toValue: 0,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }),
      ],
      {stopTogether: false},
    ).start();
  }, []);

  return (
    <Animated.View
      key={id}
      style={[
        styles.todoItem,
        {
          opacity: fadeAnim,
          transform: [{translateX: translation}],
        },
      ]}
      onLayout={() =>
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      }>
      <Switch
        value={completed}
        onValueChange={value => toggleComplete(id, value)}
      />
      <View style={styles.todoItemTextContainer}>
        <Text style={styles.todoItemText}>{text}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeButtonText}>&times;</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(50,50,50,0.4)',
    borderRadius: 5,
    marginBottom: 6,
  },
  todoItemTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItem: 'flex-start',
  },
  todoItemText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 1.0)',
    fontWeight: '600',
  },
  removeButton: {
    height: 32,
    width: 32,
  },
  removeButtonText: {
    fontSize: 24,
    fontWeight: '800',
    color: 'rgb(200, 10, 10)',
  },
});

export default TodoItem;
