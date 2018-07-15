/* Core */
import React from 'react';

/* Presentational */
import { View, Image, Text, StyleSheet } from 'react-native';

const Repo = ({ data }) => (
  <View style={styles.repo}>
    <Image
      style={styles.repoImage}
      source={{ uri: data.thumbnail }}
    />
    <View style={styles.repoInfo}>
      <Text style={styles.repoTitle}>{data.title}</Text>
      <Text style={styles.repoAuthor}>{data.author}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  repo: {
    padding: 20,
    backgroundColor: '#FFF',
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  repoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  repoInfo: {
    marginLeft: 10,
  },

  repoTitle: {
    fontWeight: 'bold',
  },

  repoAuthor: {
    fontSize: 12,
    color: '#999',
  },
});

export default Repo;