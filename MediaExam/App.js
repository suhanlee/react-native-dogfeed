/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

const resultIcons = {
  '': '',
  pending: '?',
  playing: '\u25B6',
  win: '\u2713',
  fail: '\u274C',
};

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

const Header = ({children, style}) => <Text style={[styles.header, style]}>{children}</Text>;

const Feature = ({title, onPress, description, buttonLabel = 'PLAY', status}) => (
  <View style={styles.feature}>
    <Header style={{flex: 1}}>{title}</Header>
    {status ? <Text style={{padding: 5}}>{resultIcons[status] || ''}</Text> : null}
    <Button title={buttonLabel} onPress={onPress} />
  </View>
);


const audioTests = [
  {
    title: 'mp3 in bundle',
    url: 'advertising.mp3',
    basePath: Sound.MAIN_BUNDLE,
  },
  {
    title: 'mp3 in bundle (looped)',
    url: 'advertising.mp3',
    basePath: Sound.MAIN_BUNDLE,
    onPrepared: (sound, component) => {
      sound.setNumberOfLoops(-1);
      component.setState({loopingSound: sound});
    },
  },
  {
    title: 'mp3 via require()',
    isRequire: true,
    url: require('./advertising.mp3'),
  },
  {
    title: 'mp3 remote download',
    url: 'https://s3.ap-northeast-2.amazonaws.com/react-native-sound/BLACKPINK_-_BOOMBAYAH_(mp3.pm).mp3',
  },
  {
    title: 'mp3 remote - file doesn\'t exist',
    url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/file-not-here.mp3',
  },
  {
    title: 'aac remote download',
    url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac',
  },
  {
    title: 'wav remote download',
    url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/frog.wav',
  },
  {
    title: 'aac via require()',
    isRequire: true,
    url: require('./pew2.aac'),
  },
  {
    title: 'wav via require()',
    isRequire: true,
    url: require('./frog.wav'),
  },
];

function setTestState(testInfo, component, status) {
  component.setState({tests: {...component.state.tests, [testInfo.title]: status}});
}

/**
 * Generic play function for majority of tests
 */
function playSound(testInfo, component) {
  setTestState(testInfo, component, 'pending');

  const callback = (error, sound) => {
    if (error) {
      Alert.alert('error', error.message);
      setTestState(testInfo, component, 'fail');
      return;
    }
    setTestState(testInfo, component, 'playing');
    // Run optional pre-play callback
    testInfo.onPrepared && testInfo.onPrepared(sound, component);
    sound.play(() => {
      // Success counts as getting to the end
      setTestState(testInfo, component, 'win');
      // Release when it's done so we're not using up resources
      sound.release();
    });
  };

  // If the audio is a 'require' then the second parameter must be the callback.
  if (testInfo.isRequire) {
    const sound = new Sound(testInfo.url, error => callback(error, sound));
  } else {
    const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
  }
}

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    Sound.setCategory('Playback', true); // true = mixWithOthers

    // Special case for stopping
    this.stopSoundLooped = () => {
      if (!this.state.loopingSound) {
        return;
      }

      this.state.loopingSound.stop().release();
      this.setState({loopingSound: null, tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'}});
    };

    this.state = {
      loopingSound: undefined,
      tests: {},
      url: 'https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4',
    };
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
          {audioTests.map(testInfo => {
            return (
              <Feature
                status={this.state.tests[testInfo.title]}
                key={testInfo.title}
                title={testInfo.title}
                onPress={() => {
                  return playSound(testInfo, this);
                }}
              />
            );
          })}
          <Feature title="mp3 in bundle (looped)" buttonLabel={'STOP'} onPress={this.stopSoundLooped} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    width: 200,
    height: 200,
  },
  scrollContainer: {},
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)',
  },
});