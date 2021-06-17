import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../../config/Colors';
import {FONT_MEDIUM, FONT_REGULAR, FONT_SEMI_BOLD} from '../../../config/Fonts';
import {smartScale} from '../../../config/Metrics';

const PostsRenderItem: React.FC<Props> = props => {
  const {item, index} = props;
  console.log('PostsRenderItem item::::', item);
  return (
    <View key={index} style={{marginTop: smartScale(10)}}>
      <Text
        style={{
          color: colors.black,
          fontFamily: FONT_REGULAR,
          fontSize: smartScale(14),
        }}>
        {item.title}
      </Text>
    </View>
  );
};

export default PostsRenderItem;
