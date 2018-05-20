This is my `dog-feeding` experiences.
# Install
```
$ npm install react-native-sentry --save
$ react-native link react-native-sentry
```
## Android
## ios (CocosPods)
```
$ cd ios
$ pod install
```
If you see error message like below
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
