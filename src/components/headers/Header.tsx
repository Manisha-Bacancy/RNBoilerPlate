import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../config/Colors';
import styles from './style';

interface Props {
  navigation: any;
  title: string;
}

const Headers: React.FC<Props> = props => {
  const {title, navigation} = props;

  return (
    <View style={styles.rowContainer}>
      <Icon
        onPress={() => navigation.openDrawer()}
        name="md-menu"
        size={30}
        color={colors.white}
      />
      <Text style={styles.txtTitle}>{title}</Text>
      <View style={styles.rightHeaderIcon} />
    </View>
  );
};

export default Headers;
