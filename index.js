/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import './shim'
import { LogBox } from 'react-native';
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims/dist/index.js";

LogBox.ignoreAllLogs();//Ignore all log notifications
console.reportErrorsAsExceptions = false;
AppRegistry.registerComponent(appName, () => App);
