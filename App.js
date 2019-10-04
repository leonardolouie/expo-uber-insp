import React from 'react';
import { StyleSheet, View, Platform, Button, Text } from 'react-native';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Svg from 'react-native-svg';

const { PROVIDER_GOOGLE } = MapView;
class App extends React.Component {

  state = {
    location: null,
    latitude:null,
    longitude:null,
    errorMessage: null,
    landslide_maps:null
  };

 async componentWillMount() {
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
    try {
      const response = await fetch('http://noah.up.edu.ph/api/landslide_maps')
      const posts = await response.json()
      this.setState({landslide_maps:posts})
    } catch (e) {
     
    }
    
  };
  

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  
  render(){
  return (
      <View style={styles.container}>
        { this.state.location && <MapView 
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          onRegionChange={this._handleMapRegionChange}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.03000,
            longitudeDelta: 0.0421
          }}>
          
          {this.state.landslide_maps && this.state.landslide_maps.map((value) => 
             value.layers.map((item, index) => 
             <MapView.Marker
             coordinate={{latitude:item.center.lat, longitude:item.center.lng}}
             key={index}
             anchor={{x: 0.5, y: 0.5}}
             > 
                <Svg height={20} width={20}>
                      <Svg.Circle
                        cx="10"
                        cy="10"
                        r={2}
                      />
                </Svg>
              </MapView.Marker>
             )
          )}  
        </MapView> }
     
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
  
