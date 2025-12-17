# Mobile SDK Native Modules for React Native Apps

Mobile SDK provides native modules for React Native that serve as JavaScript bridges to native Mobile SDK functionality.

## OAuth

The OAuth bridge is similar to the OAuth plugin for Cordova.

### Usage

<!-- prettier-ignore -->
```javascript
import { oauth } from 'react-native-force';
```

#### Types and Methods

See [react.force.oauth.ts](https://github.com/forcedotcom/SalesforceMobileSDK-ReactNative/tree/v9.0.0/src/react.force.oauth.ts) in the SalesforceMobileSDK-ReactNative GitHub repo.

## Network

The Network bridge is similar to the force.js library for hybrid apps.

### Usage

<!-- prettier-ignore -->
```javascript
import { net } from 'react-native-force';
```

#### Types and Methods

See [react.force.net.ts](https://github.com/forcedotcom/SalesforceMobileSDK-ReactNative/tree/v9.0.0/src/react.force.net.ts) in the SalesforceMobileSDK-ReactNative GitHub repo.

## SmartStore

The SmartStore bridge is similar to the SmartStore plugin for Cordova. Unlike the plugin, however, first arguments aren’t optional in React Native.

### Usage

<!-- prettier-ignore -->
```javascript
import { smartstore } from 'react-native-force';
```

#### Types and Methods

See [react.force.smartstore.ts](https://github.com/forcedotcom/SalesforceMobileSDK-ReactNative/tree/v9.0.0/src/react.force.smartstore.ts) in the SalesforceMobileSDK-ReactNative GitHub repo.

## Mobile Sync

The Mobile Sync bridge is similar to the Mobile Sync plugin for Cordova. Unlike the plugin, however, first arguments aren’t optional in React Native.

### Usage

<!-- prettier-ignore -->
```javascript
import { mobilesync } from 'react-native-force';
```

#### Types and Methods

See [react.force.mobilesync.ts](https://github.com/forcedotcom/SalesforceMobileSDK-ReactNative/tree/v9.0.0/src/react.force.mobilesync.ts) in the SalesforceMobileSDK-ReactNative GitHub repo.

:::note

Handling of field lists for “sync up” operations changed in Mobile SDK 5.1. See [Mobile Sync Plugin Methods](entity-framework-plugin-methods.md) for a description of the JavaScript `syncUp()` method.

:::
