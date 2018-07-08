/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Video from 'react-native-video';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4',
    }
  }

  videoError = (error) => {
    console.log(error);
  };

  render() {

    return (
      <View style={styles.container}>
        <Video source={{uri: this.state.url}}   // Can be a URL or a local file.
               ref={(ref) => {
                 this.player = ref
               }}
               onError={this.videoError}
               style={styles.backgroundVideo}
        />
        <TextInput
          style={{
            width: 300,
            height: 40}}
          placeholder="Type input"
          onChangeText={(text) => this.setState({url: text})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundVideo: {
    width: 200,
    height: 200,
  },
});
