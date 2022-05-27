import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';

type Props = {};

const Posts = (props: Props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'GET',
          headers: {
            'User-Agent': 'react-native-learning',
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View style={{width: '100%'}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={style.postsHeader}>User Posts</Text>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={style.postsContainer}>
            {posts.map(post => (
              <View key={post.id} style={style.postContainer}>
                <Text style={style.postTitle}>{post.title}</Text>
                <Text style={style.postBody}>{post.body}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  postsContainer: {
    paddingHorizontal: 12,
    marginBottom: 100,
  },
  postsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    padding: 12,
  },
  postContainer: {
    backgroundColor: 'whitesmoke',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'red',
  },
  postBody: {},
});

export default Posts;
