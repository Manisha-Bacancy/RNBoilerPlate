import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Headers} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../I18n/I18n';
import {Colors, Fonts, FontSize, smartScale} from '../../theme';
import {WebView} from 'react-native-webview';
import NavigationService from '../../route/navigationservice';
import {
  sbCreateGroupChannel,
  sbCreateUserListQuery,
  sbGetGroupChannel,
  sbGetUserList,
} from './sendbirdActions/groupChannel';
import {getFriends} from '../../modules/auth/actions';
import Loader from '../../components/loaders/loader';
import {endpoints} from '../../modules/auth/service';

interface IProps {
  navigation: any;
}

export const GroupChannelInvite: React.FC<IProps> = props => {
  const goBack = () => NavigationService.goBack();
  const {friendList, error, loading} = useSelector((state: any) => ({
    friendList: state.auth.friendList,
    error: state.auth.error,
    loading: state.auth.loading,
  }));
  const dispatch = useDispatch();
  const [myFndList, setMyFndList] = useState(friendList);
  const [userList, setUserList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    const apiURl =
      endpoints.fnd + '?perPage=' + 5 + '&pageNo=' + 1 + '&fullName=' + '';
    dispatch(getFriends(apiURl));
  }, []);

  useEffect(() => {
    if (friendList !== myFndList) {
      const userIdss = friendList.map(user => {
        return user._id;
      });
      if (friendList.length > 0) {
        getUserList(userIdss);
      }
    }
  }, [friendList]);

  useEffect(() => {
    if (userList) {
      if (selectedList.length > 0) {
        const inviteUserIdList = selectedList.map(user => {
          return user.userId;
        });

        if (inviteUserIdList.length > 0) {
          sbCreateGroupChannel(inviteUserIdList, true)
            .then((channel: any) => {
              sbGetGroupChannel(channel.url).then((channel: any) => {
                NavigationService.navigate('Chat', {channel: channel});
              });
            })
            .catch(error => {});
        }
      }
    }
  }, [userList]);

  const getUserList = userIdss => {
    const userListQuery = sbCreateUserListQuery(userIdss);

    sbGetUserList(userListQuery)
      .then((users: any) => {
        const newList = users.map(user => {
          user['isSelected'] = false;
          return user;
        });
        setUserList(newList);
      })
      .catch(error => {});
  };

  const onItemSelection = selectedUser => {
    const updatedList = userList.map(user => {
      if (user.userId === selectedUser.userId) {
        if (user.isSelected) {
          user.isSelected = false;
          _removeSelectedList(user);
        } else {
          user.isSelected = true;
          setSelectedList(prevItems => [...prevItems, user]);
        }
      }
      return user;
    });
    setUserList(updatedList);
  };
  const _removeSelectedList = removeUser => {
    const newSelectedList = selectedList.filter(user => {
      return user.userId !== removeUser.userId;
    });
    setSelectedList(newSelectedList);
  };

  const ChannelListRenderItem = (props: any) => {
    const {item, index} = props;
    const {nickname, userId, profileUrl} = item;
    return (
      <View key={index} style={{marginTop: smartScale(10)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              height: smartScale(40),
              width: smartScale(40),
              borderRadius: smartScale(40),
              backgroundColor: profileUrl != '' ? Colors.white : Colors.grey,
            }}
            source={{uri: profileUrl}}
          />
          <TouchableOpacity
            style={{marginLeft: smartScale(10)}}
            onPress={() => onItemSelection(item)}>
            <Text style={styles.txtTitle}>{nickname}</Text>
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
        />
        <View style={{flex: 1, margin: smartScale(10)}}>
          <FlatList
            data={userList}
            renderItem={({item, index}) => (
              <ChannelListRenderItem item={item} index={index} />
            )}
            extraData={userList}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
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
