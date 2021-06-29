import React from 'react';
import {View, ScrollView, Text, SafeAreaView} from 'react-native';
import {Headers} from '../../components';
import styles from './style';
import I18n from '../../I18n/I18n';
import {smartScale} from '../../theme';
import {WebView} from 'react-native-webview';

interface IProps {
  navigation: any;
}

export const Profile: React.FC<IProps> = props => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers
          title={I18n.t('profile.title')}
          navigation={props.navigation}
          leftButtonType={'menu'}
          leftIcon={'md-menu'}
          leftAction={() => props.navigation.openDrawer()}
        />
        <ScrollView style={{flex: 1}}>
          <View style={{backgroundColor: 'pink'}}>
            <WebView
              source={{
                uri: 'https://mtbguru.s3.us-east-2.amazonaws.com/gallery/zdFhvKMJ9wEF4.html',
              }}
              style={{height: 200, width: '100%'}}
              scrollEnabled={true}
              javaScriptEnabled={true}
              //source={{uri: PrivacyData.TERMS_OF_SERVICE}}
              // onLoadStart={()=>this.props.loader(true)}
              // onLoadEnd={()=>this.props.loader(false)}
              // injectedJavaScript={meta}
              scalesPageToFit={true}
              startInLoadingState={true}
              automaticallyAdjustsScrollIndicatorInsets={true}
              automaticallyAdjustContentInsets={false}
            />
          </View>

          <View style={{backgroundColor: 'yellow', flex: 1}}>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
            <Text style={{height: smartScale(100)}}>
              {'This is Profile screen!'}
            </Text>
          </View>
        </ScrollView>
      </View>
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
    </SafeAreaView>
  );
};
