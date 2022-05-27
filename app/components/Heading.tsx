/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {View, Text} from 'react-native';

const Heading = ({children, title}): Node => {
  return (
    <View>
      <Text>{title}</Text>
      {children}
    </View>
  );
};

export default Heading;
