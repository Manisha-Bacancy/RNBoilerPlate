import React from 'react';
import {View, Text} from 'react-native';
import {smartScale} from '../../../theme';
import styles from './style';

interface Props {
  item: ItemState;
  index: number;
}

interface ItemState {
  title: string;
}

const PostsRenderItem: React.FC<Props> = props => {
  const {item, index} = props;
  const {title} = item;
  return (
    <View key={index} style={{marginTop: smartScale(10)}}>
      <Text style={styles.txtTitle}>{title}</Text>
      <View style={styles.divider} />
    </View>
  );
};

export default PostsRenderItem;
