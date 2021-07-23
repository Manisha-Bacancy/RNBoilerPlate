import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PostsRenderItem from './components/PostsRenderItem';
import {Headers, TextInputView} from '../../components';
import I18n from '../../I18n';
import Loader from '../../components/loaders/loader';
import {Colors, smartScale} from '../../theme';
import {getPosts, resetError} from '../../modules/auth/actions';
import {Alert} from 'react-native';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
  initConnection,
} from 'react-native-iap';

interface IProps {
  navigation: any;
}
declare global {
  interface Console {
    tron: any;
  }
}
export const Home: React.FC<IProps> = props => {
  // const [isLoading, setLoading] = useState(false);
  //const [posts, setPosts] = useState([]);

  const {posts, error, loading} = useSelector((state: any) => ({
    posts: state.auth.posts,
    error: state.auth.error,
    loading: state.auth.loading,
  }));
  const itemSkus = Platform.select({
    ios: [
      'com.bacancy.MyApp.iapDemo',
      'com.bacancy.MyApp.002', // dooboolab
    ],
    android: [
      'com.bacancy.MyApp.iapDemo',
      'com.bacancy.MyApp.002', // do
    ],
  });
  const [isError, setIsError] = useState(error);
  const [fullData, setFullData] = useState([
    'com.bacancy.MyApp.iapDemo',
    'com.bacancy.MyApp.002', // dooboolab
  ]);
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  //use effect perform side effect in functional component
  //use effect is a replacement of componentDidMount,componentDidUpadte and componentWillUnMount method of class

  useEffect(() => {
    //dispatch(getPosts());
    intitConnectionIAP();
  }, []);

  const intitConnectionIAP = async () => {
    try {
      await RNIap.initConnection();
      // await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
    } catch (err) {
      console.log(err.code, err.message);
    }
  };
  // useEffect(() => {
  //   console.log('error::::::', error);
  //   if (error != null) {
  //     Alert.alert('Error', error, [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           dispatch(resetError());
  //         },
  //       },
  //     ]);
  //   }
  // }, [error]);

  //Search view--Done't remove code
  // const onSearchTextChange = (value: string) => {
  //   let text = value.toLowerCase();

  //   let filteredName: any = fullData.filter(item => {
  //     return item.title.toLowerCase().match(text);
  //   });

  //   if (!text || text === '') {
  //     setPosts(posts);
  //     setSearch('');
  //   } else if (!Array.isArray(filteredName) && !filteredName.length) {
  //     // set no data flag to true so as to render flatlist conditionally
  //   } else if (Array.isArray(filteredName)) {
  //     setPosts(filteredName);
  //     setSearch(value);
  //   }
  // };

  const getItems = async () => {
    try {
      const products = await RNIap.getProducts(fullData);
      //const products = await RNIap.getAvailablePurchases();
      //const products = await RNIap.getSubscriptions(itemSkus);

      console.log('Products', products);
    } catch (err) {
      console.log('err........', err.code, err.message);
      console.warn(err.code, err.message);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers
          title={I18n.t('home.title')}
          navigation={props.navigation}
          leftButtonType={'menu'}
          leftIcon={'md-menu'}
          rightIcon={'notifications-outline'}
          badge1Count={1}
          rightAction={() => props.navigation.navigate('Notification')}
          leftAction={() => props.navigation.openDrawer()}
        />

        <View style={styles.postListContainer}>
          {/* Search view don't remove code */}
          {/* <TextInputView
            icon={'search'}
            refProp={searchRef}
            placeholder={I18n.t('home.search')}
            onChangeText={text => {
              onSearchTextChange(text);
            }}
            numberOfLines={1}
            onSubmitEditing={() => onSearchTextChange(search)}
            returnKeyType={'search'}
            value={search}
            textInputContainerStyle={styles.textInputContainerStyle}
            iconStyles={styles.iconStyle}
            errorMessage={''}
          /> */}
          {/* <FlatList
            data={posts}
            renderItem={({item, index}) => (
              <PostsRenderItem item={item} index={index} />
            )}
            style={{flex: 1}}
            extraData={posts}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          /> */}

          <TouchableOpacity onPress={() => getItems()}>
            <Text>{'Get IAP Product'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader loading={loading} />
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.green,
  },
  safeAreaBottomeContainer: {
    flex: 0,
    backgroundColor: Colors.white,
  },
  indicatorContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  postListContainer: {flex: 1, margin: smartScale(10)},
  textInputContainerStyle: {
    borderRadius: smartScale(10),
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  iconStyle: {
    marginLeft: smartScale(5),
    color: Colors.grey,
    marginRight: smartScale(5),
  },
});
