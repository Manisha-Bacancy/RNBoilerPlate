import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Headers} from '../../components';
import I18n from '../../I18n/I18n';
import {Colors, Fonts, FontSize, smartScale, WINDOW} from '../../theme';
import NavigationService from '../../route/navigationservice';
import {MessageInput} from './components/messageinput';
import {sbGetGroupChannel} from './sendbirdActions/groupChannel';
import {
  initChatScreen,
  sbAdjustMessageList,
  sbCreatePreviousMessageListQuery,
  sbGetMessageList,
  sbSendTextMessage,
} from './sendbirdActions/chat';
import {StackActions} from '@react-navigation/native';
interface IProps {
  navigation: any;
  route: any;
}

export const Chat: React.FC<IProps> = props => {
  const goBack = () => {
    props.navigation.dispatch(StackActions.popToTop());
    props.navigation.navigate('GroupChannel');
  };

  const [textMessage, setTextMessage] = useState('');
  const [chatList, setChatList] = useState([]);
  const [channelUrl, setChannelUrl] = useState(props.route.params.channel.url);
  const [previousMessageListQuery, setPreviousMessageListQuery] =
    useState(null);

  const chatRef = useRef(null);
  useEffect(() => {
    initChatScreen();
    getMessageList(true);
  }, []);
  useEffect(() => {
    if (chatList) {
      setTextMessage('');
      if (chatList && chatList.length > 0) {
        // chatRef.current.scrollToIndex({
        //   animated: true,
        //   index: 0,
        //   viewOffset: 0,
        // });
        // chatRef.current.scrollToIndex({
        //   index: 0,
        //   viewOffset: 0,
        // });
      }
    }
  }, [chatList]);
  const uniqueList = list => {
    return list.reduce((uniqList, currentValue) => {
      let ids = uniqList.map(item => {
        return item.messageId;
      });
      if (ids.indexOf(currentValue.messageId) < 0) {
        uniqList.push(currentValue);
      }
      return uniqList;
    }, []);
  };
  const getMessageList = init => {
    if (!previousMessageListQuery && !init) {
      return;
    }

    if (init) {
      sbCreatePreviousMessageListQuery(channelUrl, false).then(
        (previousMessageListQuery: any) => {
          setPreviousMessageListQuery(previousMessageListQuery);
          if (previousMessageListQuery.hasMore) {
            sbGetMessageList(previousMessageListQuery)
              .then((messages: any) => {
                var listMsg = uniqueList(messages);
                var list = sbAdjustMessageList(listMsg);
                setChatList(list);
              })
              .catch(error => {
                setChatList([]);
              });
          }
        },
      );
    } else {
      sbGetMessageList(previousMessageListQuery).then((messages: any) => {
        const listMsg = uniqueList([...chatList, ...messages]);
        setChatList(listMsg);
      });
    }
  };
  const openPanel = () => {
    Keyboard.dismiss();
  };
  const _onSendButtonPress = () => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        sendTextMessage(channel, textMessage);
      })
      .catch(error => {});
  };
  const sendTextMessage = (channel, textMessage) => {
    const messageTemp = sbSendTextMessage(
      channel,
      textMessage,
      (message, error) => {
        if (error) {
        } else {
          const oldArray = [...chatList, message];
          var listMsg = uniqueList(oldArray);
          var list = sbAdjustMessageList(listMsg);
          setChatList(list);
        }
      },
    );
  };

  const _onTextMessageChanged = (textMessage: any) => {
    setTextMessage(textMessage);
  };
  const renderChatView = () => {
    return (
      <MessageInput
        onLeftPress={openPanel}
        onRightPress={_onSendButtonPress}
        textMessage={textMessage}
        onChangeText={_onTextMessageChanged}
        width={WINDOW.width}
      />
    );
  };
  const ChatListRenderItem = (props: any) => {
    const {item, index} = props;
    console.log('item:::', item);
    const {message, messageId, _sender, isUser} = item;
    return (
      <View style={{transform: [{scaleY: -1}]}}>
        <View
          style={{
            flexDirection: isUser ? 'row-reverse' : 'row',
          }}>
          <View
            key={index}
            style={
              isUser ? styles.rightTextContainer : styles.leftTextContainer
            }>
            <Text
              style={[
                styles.txtMsg,
                {
                  color: isUser ? Colors.white : Colors.grey,
                },
              ]}>
              {message}
            </Text>
          </View>
        </View>
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
          <View
            style={{
              flex: 1,
              marginBottom: smartScale(10),
              transform: [{scaleY: -1}],
            }}>
            {chatList.length > 0 ? (
              <FlatList
                ref={chatRef}
                renderItem={({item, index}) => (
                  <ChatListRenderItem item={item} index={index} />
                )}
                //onContentSizeChange={() => chatRef?.current?.scrollToEnd()} // scroll end
                data={chatList}
                extraData={chatList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => getMessageList(false)}
                onEndReachedThreshold={0}
              />
            ) : null}
          </View>
          {Platform.OS == 'ios' ? (
            <KeyboardAvoidingView
              behavior={'padding'}
              keyboardVerticalOffset={WINDOW.height >= 812 ? 40 : 20}>
              {renderChatView()}
            </KeyboardAvoidingView>
          ) : (
            renderChatView()
          )}
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
  rightTextContainer: {
    backgroundColor: Colors.green,
    padding: smartScale(15),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxWidth: WINDOW.width - 130,
    borderBottomLeftRadius: 25,
    marginTop: smartScale(5),
    marginRight: smartScale(10),
  },
  leftTextContainer: {
    backgroundColor: Colors.white,
    padding: smartScale(15),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    marginTop: smartScale(5),
    marginLeft: smartScale(10),
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
    maxWidth: WINDOW.width - 130,
  },
  txtMsg: {
    fontFamily: Fonts.fontRegular,
    fontSize: smartScale(14),
  },
});
