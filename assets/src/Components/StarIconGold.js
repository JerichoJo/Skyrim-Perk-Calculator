import React, { Component } from 'react';
import {  View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
  },
  logo: {
    width: 85,
    height: 85,
  },
});

class StarIconGold extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../images/Icons/Gold_Star.png')}
        />
      </View>
    );
  }
}

export default StarIconGold;