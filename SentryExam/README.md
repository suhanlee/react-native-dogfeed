This is my `dog-feeding` experiences.
# Install
```
$ npm install react-native-sentry --save
$ react-native link react-native-sentry
```
after successfully linking it, you can see message such like below.
```
...
Please open
https://sentry.io/account/settings/wizard/[YOUR_URL]
in your browser (if it's not open already)


Successfully set up android for react-native
Successfully set up ios for react-native

🎉  Successfully set up Sentry for your project 🎉
```
## Android
## ios (with CocosPods)
If you see message while building ios project like below
```
#import "RNSentry.h" // This is used for versions of react < 0.40
        ^~~~~~~~~~~~
1 error generated.
```
Maybe installing pod modules is failed.
So you should install pod modules correctly.
```
$ cd ios
$ pod install
```
and If you see error message like below
```
[!] CocoaPods could not find compatible versions for pod "Sentry":
  In Podfile:
    SentryReactNative (from `../node_modules/react-native-sentry`) was resolved to 0.37.0, which depends on
      Sentry (~> 3.12.4)
```
update cocoapods and re-install it.
```
$ pod repo update
$ pod install
```
Sentry pod depends on React pod. so you need to configure `React` Pod.
```
 pod 'yoga', path: "#{rn_path}/ReactCommon/yoga/yoga.podspec"
 pod 'React', path: rn_path, :subspecs => [
    'Core',
    'CxxBridge',
    'DevSupport',
    'RCTActionSheet',
    'RCTAnimation',
    'RCTGeolocation',
    'RCTImage',
    'RCTLinkingIOS',
    'RCTNetwork',
    'RCTSettings',
    'RCTText',
    'RCTVibration',
    'RCTWebSocket',
  ]
```
then try re install it.
If you see runtime module error, also maybe It will need reset cache
```
$ yarn start --reset-cache
```
