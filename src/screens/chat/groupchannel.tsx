import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Headers} from '../../components';

import I18n from '../../I18n/I18n';
import {Colors, Fonts, FontSize, smartScale} from '../../theme';
import {WebView} from 'react-native-webview';
import NavigationService from '../../route/navigationservice';
import {sbConnect, sbCreateOpenChannel} from './chatservice';
import {CHAT_APP_ID} from '../../utils/constants';
import {
  createGroupChannelListHandler,
  initGroupChannel,
  sbCreateGroupChannelListQuery,
  sbGetGroupChannel,
  sbGetGroupChannelList,
} from './sendbirdActions/groupChannel';
import {getUserData} from '../../services';

interface IProps {
  navigation: any;
}

export const GroupChannel: React.FC<IProps> = props => {
  const goBack = () => NavigationService.goBack();
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      loadData();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);
  const loadData = async () => {
    const {user} = await getUserData();
    setUserId(user._id);
    sbConnect(user._id, user.fullName, CHAT_APP_ID)
      .then(user => {
        _initGroupChannelList();
      })
      .catch(err => {});
  };
  const _initGroupChannelList = () => {
    initGroupChannel();
    createGroupChannelListHandler();
    const groupChannelListQuery = sbCreateGroupChannelListQuery();
    if (groupChannelListQuery !== null && groupChannelListQuery.hasNext) {
      sbGetGroupChannelList(groupChannelListQuery).then((userList: any) => {
        setUserList(userList);
      });
    }
  };
  const onItemSelection = item => {
    sbGetGroupChannel(item.url)
      .then(channel => {
        NavigationService.navigate('Chat', {channel: channel});
      })
      .catch(error => {});
  };
  const GroupChannelListRenderItem = (props: any) => {
    const {item, index, userId} = props;
    console.log('userId:::', userId);
    const {lastMessage, members} = item;
    let itemVal: any = '';

    for (let j = 0; j < members.length; j++) {
      if (userId != members[j].userId) {
        itemVal = members[j];
      }
    }

    return (
      <View key={index} style={{marginTop: smartScale(10)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              height: smartScale(40),
              width: smartScale(40),
              borderRadius: smartScale(40),
              backgroundColor:
                itemVal.profileUrl != '' ? Colors.white : Colors.grey,
            }}
            source={{uri: itemVal.profileUrl}}
          />
          <TouchableOpacity
            style={{marginLeft: smartScale(10)}}
            onPress={() => onItemSelection(item)}>
            <Text style={styles.txtTitle}>{itemVal.nickname}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers
          title={I18n.t('chat.title')}
          navigation={props.navigation}
          leftButtonType={'back'}
          leftIcon={'chevron-back-outline'}
          leftAction={goBack}
          rightIcon={'add'}
          rightAction={() => NavigationService.navigate('GroupChannelInvite')}
        />
        <View style={{flex: 1, margin: smartScale(10)}}>
          <FlatList
            data={userList}
            renderItem={({item, index}) => (
              <GroupChannelListRenderItem
                item={item}
                index={index}
                userId={userId}
              />
            )}
            extraData={userList}
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
    backgroundColor: Colors.white,
  },
  txtTitle: {
    color: Colors.black,
    fontFamily: Fonts.fontMedium,
    fontSize: FontSize.MediumLarge,
  },
  divider: {
    height: smartScale(1),
    marginTop: smartScale(10),
    backgroundColor: Colors.grey,
  },
});
