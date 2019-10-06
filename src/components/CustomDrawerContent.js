import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
// import PropTypes from 'prop-types';
import { colors, device, fonts } from '../constants';

const CustomDrawerContent = () => (
  <View style={styles.container}>
    <View style={styles.containerVersion}>
      <Text style={styles.versionText}>{`v${Constants.manifest.version}`}</Text>
    </View>
  </View>
);

// CustomDrawerContent.propTypes = {
// required
// navigation: PropTypes.object.isRequired
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  containerVersion: {
    bottom: device.iPhoneX ? 40 : 16,
    paddingHorizontal: 38,
    position: 'absolute',
    width: '100%'
  },
  versionText: {
    color: colors.grey,
    fontFamily: fonts.uberRegular,
    fontSize: 20,
    textAlign: 'right'
  }
});

export default CustomDrawerContent;
