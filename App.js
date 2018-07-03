import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import Repo from './components/Repo'

export default class App extends Component<{}> {

  state={
    repos:[
      {
        id:1,
        thumbnail:'https://avatars3.githubusercontent.com/u/6407677?s=400&v=4',
        title:'Kay Plößer',
        author:'kay-is'
      },
      {
        id:2,
        thumbnail:'https://avatars3.githubusercontent.com/u/6407677?s=400&v=4',
        title:'Other',
        author:'bryan'
      },
      
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My First App! (RepoList)</Text>
          <TouchableOpacity onPress={()=>{}}> 
            <Text style={styles.headerButton}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.repoList}>
          {
            this.state.repos.map(repo => 
              <Repo key={repo.id} data={repo} />
            )
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  header:{
    height:(Platform.OS === 'ios')? 70 : 50,
    paddingTop:(Platform.OS === 'ios')? 20 : 0,
    backgroundColor:'#FFF',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20,
  },
  headerButton:{
    fontSize:24,
    fontWeight:'bold',
  },
  repoList:{
    padding:20,
  },
  headerText:{
    fontSize:16,
    fontWeight:'bold',
  },
});
