import React, { useState, useEffect } from "react";
import { View } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// Import map & marker
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';


export default function Map() {

      const [location, setLocation] = useState({ lat: 0, long: 0 });


      // Load map + location on loading of the screen
      useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status == "granted") {
            Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
              setLocation({
                lat: location.coords.latitude,
                long: location.coords.longitude,
              });
            });
          }
        })();
      }, []);
    
      
    
        return (
    
          <View
          style={{
            flex: 1,
          }}
        >
            
            <MapView
            style={{ flex: 1 }}
            region={{
              latitude: location.lat,
              longitude: location.long,
              latitudeDelta: 0.014,
              longitudeDelta: 0.004,
            }}
          >
            <Marker
              coordinate={{ latitude: location.lat, longitude: location.long }}
              title="Hi"
              description="You are here"
              pinColor="#eb3467"
              style={{ "width": 250, "height": 50 }}
            />
          </MapView>
        </View>
    

    );
    }