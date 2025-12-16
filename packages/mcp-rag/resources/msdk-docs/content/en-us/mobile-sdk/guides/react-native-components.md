# Using Mobile SDK Components in React Native Apps

React Native apps access the same Mobile SDK libraries as Mobile SDK native apps. For React Native, Mobile SDK provides JavaScript components, or bridges, that execute your JavaScript code as native Mobile SDK instructions.

In React Native, you access Mobile SDK functionality through the following native bridges:

- `react.force.oauth.js`
- `react.force.net.js`
- `react.force.smartstore.js`
- `react.force.mobilesync.js`

To use these bridges, add an import statement in your JavaScript code. The following example imports all four bridges.

<!-- prettier-ignore -->
```javascript
import { oauth, net, smartstore, mobilesync } from 'react-native-force';
```

React native apps built with forcereact specify the `react-native-force` source path in the `package.json` file:

```nolang
"react-native-force": "https://github.com/forcedotcom/SalesforceMobileSDK-ReactNative.git"
```

:::note

You can’t use the `force.js` library with React Native.

:::
