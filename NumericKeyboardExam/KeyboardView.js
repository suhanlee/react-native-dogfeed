import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, ScrollView, StyleSheet, View} from 'react-native';
import {KeyboardRegistry} from 'react-native-keyboard-input';

class KeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  }

  render() {
    return (
      <View contentContainerStyle={[styles.keyboardContainer, {backgroundColor: 'purple'}]}>
        <Text style={{color: 'white'}}>HELOOOO!!!</Text>
        <Text style={{color: 'white'}}>{this.props.title}</Text>
        <TouchableOpacity
          testID={'click-me'}
          style={{padding: 20, marginTop: 30, backgroundColor: 'white'}}
          onPress={() => this.onButtonPress()}
        >
          <Text>
            Click Me!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class AnotherKeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  onButtonPress() {
    KeyboardRegistry.toggleExpandedKeyboard('AnotherKeyboardView');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.keyboardContainer, {backgroundColor: 'orange'}]}>
        <Text>*** ANOTHER ONE ***</Text>
        <Text>{this.props.title}</Text>
        <TouchableOpacity
          testID={'toggle-fs'}
          style={{padding: 20, marginTop: 30, backgroundColor: 'white'}}
          onPress={() => this.onButtonPress()}
        >
          <Text>
            Toggle Full-Screen!
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

KeyboardRegistry.registerKeyboard('KeyboardView', () => KeyboardView);
KeyboardRegistry.registerKeyboard('AnotherKeyboardView', () => AnotherKeyboardView);