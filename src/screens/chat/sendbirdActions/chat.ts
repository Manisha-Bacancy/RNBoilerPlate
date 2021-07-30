import {sbGetOpenChannel} from './openChannel';
import {sbGetGroupChannel} from './groupChannel';
import SendBird from 'sendbird';
export const initChatScreen = () => {
  const sb = SendBird.getInstance();
  sb.removeAllChannelHandlers();
};
export const sbCreatePreviousMessageListQuery = (channelUrl, isOpenChannel) => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then((channel: any) => resolve(channel.createPreviousMessageListQuery()))
      .catch(error => reject(error));
    // if (isOpenChannel) {
    //   sbGetOpenChannel(channelUrl)
    //     .then((channel: any) =>
    //       resolve(channel.createPreviousMessageListQuery()),
    //     )
    //     .catch(error => reject(error));
    // } else {
    //   sbGetGroupChannel(channelUrl)
    //     .then((channel: any) =>
    //       resolve(channel.createPreviousMessageListQuery()),
    //     )
    //     .catch(error => reject(error));
    // }
  });
};

export const sbGetMessageList = previousMessageListQuery => {
  const limit = 30;
  const reverse = true;
  return new Promise((resolve, reject) => {
    previousMessageListQuery.load(limit, reverse, (messages, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(messages);
      }
    });
  });
};

export const sbSendTextMessage = (channel, textMessage, callback) => {
  if (channel.isGroupChannel()) {
    channel.endTyping();
  }
  return channel.sendUserMessage(textMessage, (message, error) => {
    callback(message, error);
  });
};

export const sbSendFileMessage = (channel, file, callback) => {
  const data = '';
  const customType = file.type;
  const thumbSizeList = [{maxWidth: 160, maxHeight: 160}];

  return channel.sendFileMessage(
    file,
    data,
    customType,
    thumbSizeList,
    (message, error) => {
      callback(message, error);
    },
  );
};

export const sbTypingStart = channelUrl => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then((channel: any) => {
        channel.startTyping();
        resolve(channel);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const sbTypingEnd = channelUrl => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then((channel: any) => {
        channel.endTyping();
        resolve(channel);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const sbIsTyping = channel => {
  if (channel.isTyping()) {
    const typingMembers = channel.getTypingMembers();
    if (typingMembers.length == 1) {
      return `${typingMembers[0].nickname} is typing...`;
    } else {
      return 'several member are typing...';
    }
  } else {
    return '';
  }
};

export const sbMarkAsRead = ({channelUrl, channel}) => {
  if (channel) {
    channel.markAsRead();
  } else {
    sbGetGroupChannel(channelUrl).then((channel: any) => channel.markAsRead());
  }
};

export const sbUnixTimestampToDate = unixTimestamp => {
  const today = new Date();
  const date = new Date(unixTimestamp);

  if (
    today.getMonth() !== date.getMonth() ||
    today.getDay() !== date.getDay()
  ) {
    return date.getMonth() + '-' + date.getDay() + '-' + date.getFullYear();
  } else {
    const hour = '0' + date.getHours();
    const minute = '0' + date.getMinutes();
    return hour.substr(-2) + ':' + minute.substr(-2);
  }
};
export const sbAdjustMessageList = list => {
  return list.map((message, i) => {
    message['time'] = sbUnixTimestampToDate(message.createdAt);
    message['readCount'] = 0;
    if (message.isUserMessage() || message.isFileMessage()) {
      message['isUser'] =
        message.sender.userId === SendBird.getInstance().getCurrentUserId();
    } else {
      message['isUser'] = false;
    }
    if (message.sender) {
      message.sender['isShow'] = true;
      if (!message.sender.profileUrl) {
        message.sender.profileUrl = 'default-image';
      }
    }

    if (i < list.length - 1) {
      let prevMessage = list[i + 1];
      if (message.isUserMessage() || message.isFileMessage()) {
        if (prevMessage.isUserMessage() || prevMessage.isFileMessage()) {
          if (prevMessage.sender.userId === message.sender.userId) {
            message.sender.isShow = false;
          }
        }
      }
    }
    return message;
  });
};
