/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  PixelRatio,
  Keyboard,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView, TouchableWithoutFeedback,
} from 'react-native';

import './KeyboardView';
import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import DismissKeyboardHOC from './DismissKeyboardHOC';
import {Input} from 'native-base';
import NumberKeyboard from './NumberKeyboard';

const DismissKeyboardView = DismissKeyboardHOC(View);
const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state ={
      text: '',
    };
    this.keyboardHeight = new Animated.Value(0);
    this.keyboardOpacity = new Animated.Value(0);
  }

  _handleKey = (key) => {
    this.setState({
      text: key
    })
  };
  onText = (text) => {
    Animated.timing(
      this.keyboardHeight,
      {
        toValue: 200,
        duration: 500,
      }
    ).start();

    Animated.timing(
      this.keyboardOpacity,
      {
        toValue: 1,
        duration: 0,
      }
    ).start();
  };
  onReleaseKeyboard = () => {
    Animated.timing(
      this.keyboardHeight,
      {
        toValue: 0,
        duration: 500,
      }
    ).start();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onReleaseKeyboard}>
        <View style={styles.container}>
          <View style={styles.contents}>
            <Text onPress={this.onText}>
              Input: {this.state.text}
            </Text>
          </View>
          <Animated.View
            style={{
              height: this.keyboardHeight,
              opacity: this.keyboardOpacity,
            }}
          >
            <NumberKeyboard
              isRenderDot={true}
              onClear={this._handleKey}
              onDelete={this._handleKey}
              onKeyPress={this._handleKey}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#F5FCFF',
  },
  contents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});