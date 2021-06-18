import immutablePersistenceTransform from './ImmutablePersistenceTransform';
import AsyncStorage from '@react-native-async-storage/async-storage';

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    // Reducer keys that you do NOT want stored to persistence here.
    blacklist: ['form'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    whitelist: ['posts'],
    transforms: [immutablePersistenceTransform],
    //debug: true, //to get useful logging
  },
};

export default REDUX_PERSIST;
