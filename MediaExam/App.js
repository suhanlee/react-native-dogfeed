/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';

type Props = {};
export default class App extends Component<Props> {
  videoError = (error) => {
    console.log(error);
  };
  render() {
    const url = 'https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4';

    return (
      <View style={styles.container}>
        <Video source={{uri: url}}   // Can be a URL or a local file.
               ref={(ref) => {
                 this.player = ref
               }}
               onError={this.videoError}
               style={styles.backgroundVideo}
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
