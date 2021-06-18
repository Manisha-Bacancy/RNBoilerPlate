import Config from './DebugConfig';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PluginConfig {
  except?: string[];
}

const reactotron = Reactotron.configure({name: 'Ignite App'})
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  .use(reduxPlugin({onRestore: Immutable}))
  .use(sagaPlugin({except: ['']}));

if (Config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!

  reactotron.connect();

  // Let's clear Reactotron on every time we load the app
  reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
}
export default reactotron;
console.tron = reactotron;
