import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts, FontSize, smartScale} from '../../../theme';

interface Props {
  item: ItemState;
  index: number;
}

interface ItemState {
  title: string;
  description: string;
  price: string;
}

const IAPRenderItem: React.FC<Props> = props => {
  const {item, index} = props;
  const {title, description, price} = item;
  return (
    <View
      key={index}
      style={{
        marginTop: smartScale(10),
      }}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flex: 1, marginRight: smartScale(10)}}>
          <Text style={styles.txtTitle}>{title}</Text>
          <Text style={styles.txtTitle}>{description}</Text>
          <Text style={styles.txtTitle}>{price}</Text>
        </View>
        <TouchableOpacity
          onPress={() => alert(price)}
          style={{backgroundColor: Colors.green}}>
          <Text
            style={{
              color: Colors.white,
              fontSize: FontSize.Largest,
              padding: smartScale(10),
            }}>
            {'Buy'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export default IAPRenderItem;

const styles = StyleSheet.create({
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
