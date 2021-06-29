import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import NavigationService from '../../route/navigationservice';
import styles from './style';
import {Headers, MyStatusBar, CustomSwitch} from '../../components';
import I18n from '../../I18n';
import {Colors, smartScale} from '../../theme';

interface IProps {
  navigation: any;
}

export const Setting: React.FC<IProps> = props => {
  const goBack = () => NavigationService.goBack();
  const [loading, setLoading] = useState(false);
  const [switchTwoValue, setSwitchTwoValue] = useState(false);
  const CustomComponent = () => {
    return <View style={{backgroundColor: 'green'}} />;
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers
          title={I18n.t('setting.title')}
          navigation={props.navigation}
          leftButtonType={'back'}
          leftIcon={'chevron-back-outline'}
          leftAction={goBack}
        />

        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: smartScale(10),
            }}>
            <View style={{flex: 1}}>
              <Text>{'Notification'}</Text>
            </View>
            <View
              style={{
                marginLeft: switchTwoValue ? smartScale(20) : 0,
                marginRight: switchTwoValue ? smartScale(20) : 0,
              }}>
              <CustomSwitch
                value={switchTwoValue}
                onValueChange={() => setSwitchTwoValue(!switchTwoValue)}
                disabled={false}
                activeText={'ON'}
                inActiveText={'OFF'}
                circleSize={50}
                barHeight={30}
                backgroundActive={'pink'}
                backgroundInactive={'pink'}
                circleActiveColor={'green'}
                circleInActiveColor={'grey'}
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={[
                  styles.innerCircleStyle,
                  {
                    borderColor: switchTwoValue ? 'green' : 'grey',
                  },
                ]} // style for inner animated circle for what you (may) be rendering inside the circle
                renderActiveText={true}
                renderInActiveText={true}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // de5nominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={10}
                activeTextStyle={styles.activeTextStyle}
                inactiveTextStyle={styles.inactiveTextStyle}
              />
            </View>
          </View>
        </View>
      </View>
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
    </SafeAreaView>
  );
};
