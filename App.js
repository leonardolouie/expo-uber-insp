import React from 'react';
import { StyleSheet, View, Platform, Button } from 'react-native';
import  device  from './src/constants/device'
import MapView from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Marker } from 'react-native-maps';

class App extends React.Component {

  state = {
    location: null,
    latitude:null,
    longitude:null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    await this.setState({ location:location, longitude:location.coords.longitude, latitude:location.coords.latitude });
  };
  

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };
  
  render(){
  return (
      <View style={styles.container}>
        { this.state.location && <MapView 
          style={styles.map}
          onRegionChange={this._handleMapRegionChange}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.03000,
            longitudeDelta: 0.0421
          }}>
            <Marker style={styles.marker} title="My Location" 
            coordinate={{latitude:this.state.latitude, longitude:this.state.longitude}} />
        </MapView> }
        <Button
            onPress={this.getCurrentPositionAsync}
            title="Back"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
export default App
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      height: '100%',
      position: 'absolute',
      width: '100%'
   },
   marker: {
     width:'2%',
     height:'2%',
     borderRadius:1
   }
}
);
  
