/**
 * @format
 */
import {AppRegistry, YellowBox} from 'react-native';
import './src/config/reactotronconfig';
import {App} from './src/screens';
import {name as appName} from './app.json';
console.disableYellowBox = true; // For avoid waring
console.ignoredYellowBox = ['Require cycle:'];
YellowBox.ignoreWarnings(['']);
AppRegistry.registerComponent(appName, () => App);
