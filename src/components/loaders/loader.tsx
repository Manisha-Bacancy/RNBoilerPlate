// @flow
import React, {Component, useState, useEffect} from 'react';
import {Modal, View} from 'react-native';
import styles from './style';
import {MaterialIndicator} from 'react-native-indicators';
import {Colors, smartScale} from '../../theme';
import {SUPPORTED_OPRATIONS} from '../../utils';

interface IProps {
  navigation?: any;
  loading: boolean;
}
const Loader: React.FC<IProps> = props => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={props.loading}

      //supportedOrientations={SUPPORTED_OPRATIONS}
    >
      <View style={styles.modalBackground}>
        <MaterialIndicator color={Colors.green} size={smartScale(50)} />
      </View>
    </Modal>
  );
};
export default Loader;
