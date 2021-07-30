import SendBird from 'sendbird';

export const initGroupChannel = () => {
  const sb = SendBird.getInstance();
  sb.removeAllChannelHandlers();
};
export const createGroupChannelListHandler = () => {
  return dispatch => {
    const sb = SendBird.getInstance();
    let channelHandler = new sb.ChannelHandler();
    channelHandler.onChannelChanged = channel => {};
    sb.addChannelHandler('GROUP_CHANNEL_LIST_HANDLER', channelHandler);
    return;
  };
};
export const sbCreateGroupChannelListQuery = () => {
  const sb = SendBird.getInstance();
  return sb.GroupChannel.createMyGroupChannelListQuery();
};

export const sbGetGroupChannelList = groupChannelListQuery => {
  return new Promise((resolve, reject) => {
    groupChannelListQuery.next((channels, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channels);
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

export const sbLeaveGroupChannel = (channelUrl: string) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sbGetGroupChannel(channelUrl)
      .then((channel: any) => {
        channel.leave((response: any, error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      })
      .catch(error => reject(error));
  });
};

export const sbHideGroupChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sbGetGroupChannel(channelUrl)
      .then((channel: any) => {
        channel.hide((response, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      })
      .catch(error => reject(error));
  });
};

export const sbCreateUserListQuery = friendList => {
  const sb = SendBird.getInstance();

  if (sb != null) {
    var applicationUserListQueryByIds = sb.createApplicationUserListQuery();

    // filter data by user friend id.
    if (friendList != undefined) {
      applicationUserListQueryByIds.userIdsFilter = friendList;
    } else {
      applicationUserListQueryByIds.userIdsFilter = ['No data found'];
    }

    return applicationUserListQueryByIds;
  }
};

export const sbGetUserList = userListQuery => {
  return new Promise((resolve, reject) => {
    userListQuery.next((users, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(users);
      }
    });
  });
};

export const sbCreateGroupChannel = (inviteUserIdList, isDistinct) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.GroupChannel.createChannelWithUserIds(
      inviteUserIdList,
      isDistinct,
      (channel, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(channel);
        }
      },
    );
  });
};

export const sbInviteGroupChannel = (
  inviteUserIdList: any,
  channelUrl: string,
) => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then((channel: any) => {
        channel.inviteWithUserIds(
          inviteUserIdList,
          (channel: any, error: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(channel);
            }
          },
        );
      })
      .catch(error => {
        reject(error);
      });
  });
};
