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
  const arryProductList = [
    {title: 'IAP Product_2', description: 'Test IAP Product_2', price: '179'},
    {
      title: 'DEMO IAP',
      description: 'it is a non consumable iap demo',
      price: '89',
    },
  ];
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
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

  const itemSubs = Platform.select({
    ios: [
      'com.cooni.point1000',
      'com.cooni.point5000', // dooboolab
    ],
    android: [
      'test_1_three_month',
      'test_1_six_month',
      '6_month_nonrenewable_subscription',
      '6_month_nonrenewable_subscription_test',
      '1_month_nonrenewable_subscription',
      '1_year_nonrenewable_subscription',
      'test_1_monthy',
      '3_month_nonrenewable_subscription', // subscription
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

        const subProducts = await RNIap.getSubscriptions(itemSubs);
        setProductList(subProducts);
        console.log('subProducts::::', subProducts);
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
  const requestSubscription = async sku => {
    //alert(sku);
    try {
      RNIap.requestSubscription(sku);
    } catch (err) {
      Alert.alert(err.message);
    }
  };
  const requestPurchase = async sku => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
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
              <IAPRenderItem
                item={item}
                index={index}
                requestSubscription={requestSubscription}
              />
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
