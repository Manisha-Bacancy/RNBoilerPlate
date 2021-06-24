import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View, Alert} from 'react-native';
import {isLogout} from '../../services';
import styles from './styles';
import I18n from '../../I18n/I18n';
import {Colors, smartScale} from '../../theme';

interface IProps {
  navigation: any;
}

export const DrawerMenu: React.FC<IProps> = props => {
  const [drawerItemList, setDrawerItemList] = useState([
    {
      title: I18n.t('setting.title'),
      type: 'screen',
      id: 1,
      route: 'Setting',
    },
    {
      title: I18n.t('signOut'),
      type: 'Sign out',
      id: 2,
      route: 'SignedOut',
    },
  ]);
  const onItemSelection = item => {
    const {type, route, title} = item;
    props.navigation.closeDrawer();
    if (type === 'screen') {
      props.navigation.navigate(route);
    } else if (type === 'Sign out') {
      Alert.alert(
        I18n.t('signOut'),
        I18n.t('auth.signOutMsg'),
        [
          {
            text: 'cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'ok',
            onPress: async () => {
              await isLogout();
              props.navigation.reset({
                index: 0,
                routes: [{name: 'SignedOutStack'}],
              });
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {drawerItemList.map((item, index) => {
          const {title, type, route} = item;
          return (
            <View key={index}>
              <TouchableOpacity
                style={{
                  height: smartScale(35),
                  justifyContent: 'center',
                  marginHorizontal: smartScale(10),
                }}
                onPress={() => onItemSelection(item)}>
                <Text>{title}</Text>
              </TouchableOpacity>
              <View style={{height: 1, backgroundColor: Colors.grey}} />
            </View>
          );
        })}
      </View>
      {/*   <SafeAreaView style={styles.safeAreaBottomeContainer} /> */}
    </SafeAreaView>
  );
};
