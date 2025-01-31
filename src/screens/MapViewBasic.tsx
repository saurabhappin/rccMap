import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const LocationScreen = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922, // Standard zoom level for starting
    longitudeDelta: 0.0421, // Standard zoom level for starting
  });

  const [markers, setMarkers] = useState([
    {
      latlng: { latitude: 37.78825, longitude: -122.4324 },
      title: 'Marker 1',
      description: 'Description of Marker 1',
    },
    {
      latlng: { latitude: 37.78925, longitude: -122.4314 },
      title: 'Marker 2',
      description: 'Description of Marker 2',
    },
    // Add more markers as needed
  ]);

  const onRegionChange = (newRegion) => {
    setRegion(newRegion); // Dynamically update the region as the user drags or zooms
  };

  //Request android location permission
  const requestAndroidPermission = async () => {
    try {
      const fineLocationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (fineLocationGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Fine location permission granted');
        return true;
      } else {
        console.log('Fine location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Request iOS location permissions
  const requestIOSPermission = async () => {
    const auth = await Geolocation.requestAuthorization('whenInUse'); // or 'always'
    if (auth === 'granted') {
      console.log('iOS location permission granted');
      return true;
    } else {
      console.log('iOS location permission denied');
      return false;
    }
  };

  // Unified function to handle permissions for both platforms
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      return await requestAndroidPermission();
    } else {
      return await requestIOSPermission();
    }
  };

  // Get user location
  const fetchLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required to fetch your location.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setRegion((prev) => ({ ...prev, latitude, longitude }));
      },
      (error) => {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch your location.');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          zoomEnabled
          scrollEnabled
          style={styles.map}
          region={region} // Make sure this is dynamic and controlled by state
          onRegionChangeComplete={onRegionChange} // Updates region when map is dragged or zoomed
          provider={PROVIDER_GOOGLE} // Optional: Use Google Maps for better performance
          showsUserLocation={true} // Optional: Show user's current location on map
          showsMyLocationButton={true} // Optional: Add a button to center map on user's location
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.loading}>
          <Text>Fetching your location...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
  },
  loading: {
    position: 'absolute',
    top: 600,
    left: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationScreen;
