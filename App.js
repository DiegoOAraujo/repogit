import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import Repo from './components/Repo';
import NewRepoModal from './components/NewRepoModal';

export default class App extends Component {
  state = {
    modalVisible: false,
    repos: [],
  };

  async componentDidMount() {
    const repos = JSON.parse(await AsyncStorage.getItem('repositories')) || [];

    this.setState({ repos });
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  _addRepository = async (name) => {
    const repoCall = await fetch(`https://api.github.com/repos/${name}`);
    const response = await repoCall.json();

    const repository = {
      id: response.id,
      thumbnail: response.owner.avatar_url,
      title: response.name,
      author: response.owner.login,
    };

    this.setState({
      modalVisible: false,
      repos: [
        ...this.state.repos,
        repository,
      ],
    }); 

    await AsyncStorage.setItem('repositories', JSON.stringify(this.state.repos));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Minicurso GoNative</Text>
          <TouchableOpacity onPress={this.openModal}>
            <Text style={styles.headerButton}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.repoList}>
          { this.state.repos.map(repo => <Repo key={repo.id} data={repo} />) }
        </ScrollView>

        <NewRepoModal
          onCancel={() => this.setState({ modalVisible: false })}
          onAdd={name => this._addRepository(name)}
          visible={this.state.modalVisible}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },

  header: {
    height: (Platform.OS === 'ios') ? 70 : 50,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  headerButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  repoList: {
    padding: 20,
  },
});