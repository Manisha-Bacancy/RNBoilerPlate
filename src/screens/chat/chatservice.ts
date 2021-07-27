import SendBird from 'sendbird';
import {Platform} from 'react-native';

export const sbConnect = (userId: string, nickname: string, APP_ID: string) => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject('UserID is required.');
      return;
    }
    if (!nickname) {
      reject('Nickname is required.');
      return;
    }
    const sb = new SendBird({appId: APP_ID});

    sb.connect(userId, (user, error) => {
      if (error) {
        reject('SendBird Login Failed.');
      } else {
        resolve(sbUpdateProfile(nickname, APP_ID));
      }
    });
  });
};

export const sbUpdateProfile = (nickname, APP_ID) => {
  return new Promise((resolve, reject) => {
    if (!nickname) {
      reject('Nickname is required.');
      return;
    }
    let sb = SendBird.getInstance();
    if (!sb) sb = new SendBird({appId: APP_ID});
    sb.updateCurrentUserInfo(nickname, null, (user, error) => {
      if (error) {
        reject('Update profile failed.');
      } else {
        resolve(user);
      }
    });
  });
};

export const sbCreateOpenChannel = channelName => {
  return new Promise((resolve, reject) => {
    // if (!channelName) {
    //     reject('Channel name is required.');
    //     return;
    // }
    const sb = SendBird.getInstance();

    sb.OpenChannel.createChannel(function (channel, error) {
      if (error) {
        reject('Create OpenChannel Failed.');
      } else {
        resolve(channel);
        console.log('createChannel::', channel.url);
        resolve(createChatHandler(channel.url, channel));
      }
    });
  });
};

export const sbGetOpenChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      } else {
        console.log('sbGetOpenChannel:response:', channel);
        resolve(channel);
        //resolve(sbOpenChannelEnter(channel));
      }
    });
  });
};
export const sbGetGroupChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbOpenChannelEnter = channel => {
  return new Promise((resolve, reject) => {
    channel.enter((response, error) => {
      if (error) {
        reject(error);
      } else {
        console.log('sbOpenChannelEnter response:::', response);
        resolve(channel);
      }
    });
  });
};

export const onSendButtonPress = (channelUrl, isOpenChannel, textMessage) => {
  return new Promise((resolve, reject) => {
    resolve(sendTextMessage(isOpenChannel, textMessage));
  });
};

const sendTextMessage = (channel, textMessage) => {
  return new Promise((resolve, reject) => {
    channel.sendUserMessage(textMessage, function (message, error) {
      console.log('sbOpenChannelEnter:message:', message);
      console.log('sbOpenChannelEnter:error:', error);
      if (error) {
        reject(error);
      } else {
        resolve(message);
      }
    });
  });
};

export const onFileButtonPress = (channelUrl, isOpenChannel, source) => {
  return new Promise((resolve, reject) => {
    resolve(sendFileMessage(isOpenChannel, source));
  });
};

const sendFileMessage = (channel, file) => {
  return new Promise((resolve, reject) => {
    const data = '';
    const customType = file.type;
    const thumbSizeList = [{maxWidth: 160, maxHeight: 160}];

    channel.sendFileMessage(
      file,
      data,
      customType,
      thumbSizeList,
      (message, error) => {
        console.log('sendFileMessage:message:', message);
        console.log('sendFileMessage:error:', error);

        if (error) {
          reject(error);
        } else {
          resolve(message);
        }
      },
    );
  });
};
export const createChatHandler = (channelUrl, isOpenChannel) => {
  return new Promise((resolve, reject) => {
    if (isOpenChannel) {
      sbGetOpenChannel(channelUrl).then(channel => {
        sbOpenChannelEnter(channel).then(channnne1 => {
          resolve(isOpenChannel);
        });
      });
    } else {
      sbGetGroupChannel(channelUrl).then(channel => {
        resolve(isOpenChannel);
      });
    }
  });
};

export const GetMimeType = url => {
  if (url) {
    var m = url.split('/').pop().split('#')[0].split('?')[0];

    const type = m.split('.');
    const mediaType = type[1];
    return m;
  }
  return '';
};
