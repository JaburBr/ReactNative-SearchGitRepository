/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Repo from './components/Repo'
import NewRepoModal from './components/NewRepoModal'
import Carousel from './components/Carousel'


export default class App extends Component {

  state = {
    
    modalVisible: false,

    repos: [
      /*{
        id: 1,
        thumbnail: 'https://avatars3.githubusercontent.com/u/19942158?s=460&v=4',
        title: 'jaburmail.com.br',
        author: 'Jabur'
      },
      {
        id: 2,
        thumbnail: 'https://avatars3.githubusercontent.com/u/19942158?s=460&v=4',
        title: 'Jabur React',
        author: 'Monteiro'
      }*/
    ],
  };
  
  async componentDidMount(){
    //const repos = JSON.parse(await AsyncStorage.getItem('@Minicuro:repositories')) || [];
    //this.setState({ repos });
  };
  
  _addRepository = async (newRepoText) => {
    const repoCall = await fetch(`http://api.github.com/repos/${newRepoText}`);
    const response = await repoCall.json();

    const repository = {
      id: response.id,
      thumbnail: response.owner.avatar_url,
      title: response.name,
      author: response.owner.login,
    }

    this.setState({
      modalVisible: false,
      repos: [
        ...this.state.repos,
        repository,
      ],
    });

    //await AsyncStorage.setItem('@Minicuro:repositories', JSON.stringify(this.state.repos));

  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> Repositorios GitHub 3 </Text>
          <TouchableOpacity onPress={() => {this.setState({ modalVisible : true })}} >
            <Text style={styles.headerButton} > + </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.repoList}>
          
          { this.state.repos.map( repo => <Repo key={repo.id} data={repo} /> ) }
   
        </ScrollView>

        <NewRepoModal onCancel={() => this.setState({ modalVisible: false })}
                      onAdd={this._addRepository}
                      visible={this.state.modalVisible} />

        <View>
          
          
        </View>       

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
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal: 20,
  },

  headerButton:{
    fontSize: 24,
    fontWeight: 'bold'
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  repoList:{
    padding: 20,
  },

  

});
