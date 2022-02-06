import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
  },
  logo: {
    width: 85,
    height: 85,
  },
});

class StarIconBlue extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../images/Icons/Blue_Star3.png')}
        />
      </View>
    );
  }
}

export default StarIconBlue;