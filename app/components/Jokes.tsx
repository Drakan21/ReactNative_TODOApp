import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const Jokes = (): Node => {
  const [joke, setjoke] = useState('');
  const [resp, setResp] = useState('');
  const [loading, setLoading] = useState(true);

  const getDadJoke = async () => {
    setTimeout(async () => {
      try {
        const response = await fetch('https://icanhazdadjoke.com/', {
          method: 'GET',
          headers: {
            'User-Agent': 'react-native-learning',
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        setjoke(data.joke);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  useEffect(() => {
    getDadJoke();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text>
          A Joke:
          {joke}
        </Text>
      )}
    </View>
  );
};

export default Jokes;
