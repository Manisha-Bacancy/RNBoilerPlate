import SendBird from 'sendbird';

export const sbCreateOpenChannelListQuery = () => {
  const sb = SendBird.getInstance();
  return sb.OpenChannel.createOpenChannelListQuery();
};

export const sbGetOpenChannelList = (openChannelListQuery: any) => {
  return new Promise((resolve, reject) => {
    openChannelListQuery.next((channels: any, error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(channels);
      }
    });
  });
};

export const sbGetOpenChannel = (channelUrl: string) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbCreateOpenChannel = (channelName: string) => {
  return new Promise((resolve, reject) => {
    if (!channelName) {
      reject('Channel name is required.');
      return;
    }
    const sb = SendBird.getInstance();
    sb.OpenChannel.createChannel(channelName, null, null, (channel, error) => {
      if (error) {
        reject('Create OpenChannel Failed.');
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
        resolve(channel);
      }
    });
  });
};

export const sbOpenChannelExit = (channel: any) => {
  return new Promise((resolve, reject) => {
    channel.exit((response: any, error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbCreateParticipantListQuery = (channelUrl: string) => {
  return new Promise((resolve, reject) => {
    sbGetOpenChannel(channelUrl)
      .then((channel: any) => resolve(channel.createParticipantListQuery()))
      .catch(error => reject(error));
  });
};

export const sbGetParticipantList = (participantListQuery: any) => {
  return new Promise((resolve, reject) => {
    participantListQuery.next((participants: any, error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(participants);
      }
    });
  });
};
