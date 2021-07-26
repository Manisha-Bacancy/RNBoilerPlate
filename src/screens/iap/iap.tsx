import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
  Alert,
  FlatList,
} from 'react-native';
import NavigationService from '../../route/navigationservice';
import {Headers, MyStatusBar, CustomSwitch} from '../../components';
import I18n from '../../I18n';
import {Colors, smartScale} from '../../theme';
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
} from 'react-native-iap';
import IAPRenderItem from './components/IAPRenderItem';

interface IProps {
  navigation: any;
}

export const IAPurchase: React.FC<IProps> = props => {
  const goBack = () => NavigationService.goBack();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([
    {title: 'IAP Product_2', description: 'Test IAP Product_2', price: '179'},
    {
      title: 'DEMO IAP',
      description: 'it is a non consumable iap demo',
      price: '89',
    },
  ]);
  const itemSkus = Platform.select({
    ios: [
      'com.bacancy.MyApp.iapDemo',
      'com.bacancy.MyApp.002', // dooboolab
    ],
    android: [
      'android.test.purchased',
      'android.test.canceled',
      'android.test.refunded',
      'android.test.item_unavailable',
      // 'point_1000', '5000_point', // dooboolab
    ],
  });

  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;
  useEffect(() => {
    intitConnectionIAP();
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
      RNIap.endConnection();
    };
  }, []);

  const intitConnectionIAP = async () => {
    try {
      await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      try {
        const products = await RNIap.getProducts(itemSkus);

        console.log('Products', products);
      } catch (err) {
        console.log('err........', JSON.stringify(err));
        // console.warn(err.code, err.message);
      }
    } catch (err) {
      console.warn(err.code, err.message);
    }

    purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
      console.log('Purchase', purchase);
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          if (Platform.OS === 'ios') {
            finishTransactionIOS(purchase.transactionId);
          } else if (Platform.OS === 'android') {
            consumePurchaseAndroid(purchase.purchaseToken);
          }
          await finishTransaction(purchase);
        } catch (ackErr) {
          console.warn('ackErr', ackErr);
        }

        // this.setState({ receipt }, () => this.goNext());
      }
    });

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log('purchaseErrorListener', error);
        Alert.alert('purchase error', JSON.stringify(error));
      },
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers
          title={I18n.t('iap.title')}
          navigation={props.navigation}
          leftButtonType={'back'}
          leftIcon={'chevron-back-outline'}
          leftAction={goBack}
        />

        <View style={{flex: 1, marginHorizontal: smartScale(10)}}>
          <FlatList
            data={productList}
            renderItem={({item, index}) => (
              <IAPRenderItem item={item} index={index} />
            )}
            extraData={productList}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
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
    backgroundColor: Colors.red,
  },
  webviewstyle: {
    backgroundColor: 'transparent',
  },
  innerCircleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 63,
    height: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  activeTextStyle: {
    color: Colors.green,
    paddingRight: smartScale(13),
    fontSize: smartScale(15),
  },
  inactiveTextStyle: {
    color: Colors.grey,
    paddingLeft: smartScale(13),
    fontSize: smartScale(15),
  },
});
