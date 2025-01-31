import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, Platform, Image, Dimensions } from 'react-native';
import { CoordinatedType, DeliveryRunSheet, NormalObjectTyep } from '../modals';
import { Marker, Polyline } from 'react-native-maps';
import { screenHeight, vh, vw } from '../utils/Dimensions';
import fonts from '../utils/fonts';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-map-clustering';
import MapViewClustering, { mapApiKey } from '../components/MapViewClustering';

const DemoScreen = () => {
  const [text, setText] = React.useState('');
  const [runSheet, setRunSheet] = useState<Array<DeliveryRunSheet>>([]);
  const [runSheetCoords, setRunSheetCoords] = useState<Array<CoordinatedType>>([]);
  const [markerClicked, setMarkerClicked] = useState<boolean>(false);
  const [markerPointer, setMarkerPointer] = useState<NormalObjectTyep>({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [coordinates, setCoordinates] = useState([
    { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
    { latitude: 37.7849, longitude: -122.4294 }, // Point 1
    { latitude: 37.7949, longitude: -122.4394 }, // Point 2
    { latitude: 37.8049, longitude: -122.4494 }, // Point 3
  ]);
  const [searchedFromTextInput, setSearchedFromTextInput] = useState<boolean>(false);
  const [markerInfo, setMarkerInfo] = useState<{
    mainAddress: string;
    subAddress: string
  }>({
    mainAddress: '',
    subAddress: '',
  });
  const [addressDetail, setAddressDetail] = useState<{
    vendorCountry: string;
    vendorState: string;
    vendorCity: string;
    pincode: string
    vendorApartment:string
    vendorStreetName:string
    vendorLocality:string
    vendorLandmark:string
    address:string
  }>({
    vendorCountry: '',
    vendorState:'',
    vendorCity: '',
    pincode: '',
    vendorApartment:'',
    vendorStreetName:'',
    vendorLocality:'',
    vendorLandmark:'',
    address:''
  });
  const mapRef = useRef<MapView>()

  const renderPolyline = useCallback(() => {
    const runCoords = runSheetCoords
        .filter((info) => typeof info.latitude === 'number' && typeof info.longitude === 'number')


    if (coordinates && coordinates?.length > 0) {
        return Platform.OS === 'android' ? <Polyline
            coordinates={coordinates}
            strokeColor={'orange'}
            strokeWidth={3}
            lineDashPattern={[5, 5]}
        /> : <Polyline
            coordinates={coordinates}
            strokeColor={'orange'}
            strokeWidth={3}
        />
    } else {
        return <></>
    }
  }, [runSheet, runSheetCoords]);

  const renderMarkers = useCallback(() => {
        return (
          <>
            {coordinates.map((coord, index) => (
              <Marker 
                key={index} 
                coordinate={coord} 
                title={`Point ${index + 1}`} 
                // image={require('../assets/search.png')}
              />
            ))}
          </>
        )
  }, [runSheetCoords]);

  const onPressSearchedLoc = (details: NormalObjectTyep) => {
    // 'details' is provided when fetchDetails = true
    setSearchedFromTextInput(true);
    const premiseLevel = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('premise') >= 0)?.[0]?.long_name ?? '';
    const routeLevel = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('route') >= 0)?.[0]?.long_name ?? '';
    const subLevel3 = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('sublocality_level_3') >= 0)?.[0]?.long_name ?? '';
    const subLevel2 = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('sublocality_level_2') >= 0)?.[0]?.long_name ?? '';
    const sectorLevel1 = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('sublocality_level_1') >= 0)?.[0]?.long_name ?? '';
    const adminLevel3 = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('administrative_area_level_3') >= 0)?.[0]?.long_name ?? '';
    const adminLevel2 = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('administrative_area_level_2') >= 0)?.[0]?.long_name ?? '';
    const adminLevel1 = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('administrative_area_level_1') >= 0)?.[0]?.long_name ?? '';
    const cityLevel = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('locality') >= 0)?.[0]?.long_name ?? '';
    const subpremiseLevel = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('subpremise') >= 0)?.[0]?.long_name ?? '';
    const streetLevel = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('street_number') >= 0)?.[0]?.long_name ?? '';
    const stateLevel = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('administrative_area_level_1') >= 0)?.[0]?.long_name ?? '';
    const pincode = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('postal_code') >= 0)?.[0]?.long_name ?? '';
    const country = details?.address_components?.filter((item: CoordinatedType) => item?.types?.indexOf('country') >= 0)?.[0]?.long_name ?? '';
    const address = {
      mainAddress: `${premiseLevel} ${routeLevel} ${subLevel3} ${subLevel2} ${sectorLevel1}`,
      subAddress: `${streetLevel?.length ? `${streetLevel},` : ''} ${subpremiseLevel?.length ? `${subpremiseLevel}, ` : ''} ${adminLevel3?.length ? adminLevel3 : adminLevel2?.length ? adminLevel2 : adminLevel1}, ${cityLevel}, ${stateLevel}, ${country} - ${pincode}`,
    };
    setAddressDetail({
        vendorCountry: country,
        vendorState: stateLevel,
        vendorCity: cityLevel,
        pincode: pincode,
        vendorApartment:premiseLevel,
        vendorStreetName:sectorLevel1?.length ? sectorLevel1 : subLevel2?.length ? subLevel2 : subLevel3?.length ? subLevel3 : '',
        vendorLocality: sectorLevel1?.length ? sectorLevel1 : subLevel2?.length ? subLevel2 : subLevel3?.length ? subLevel3 : '',
        vendorLandmark:'',
        address: address?.subAddress,
    });
    setMarkerInfo(address);
    const { location } = details?.geometry;
    const points = {
      latitude: 37.78825,
      longitude: -122.4324,
    };
    setMarkerPointer(points);
    setMarkerClicked(true);
    mapRef?.current?.animateToRegion({
      ...points,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    }, 1000);
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <GooglePlacesAutocomplete
          placeholder={'Search location to geocode'}
          numberOfLines={2}
          onPress={() => onPressSearchedLoc}
          textInputProps={{ placeholderTextColor: 'lightgray', clearButtonMode: 'never', value: text, onChangeText: setText }}
          styles={{
            textInput: {
              backgroundColor: 'white',
              color: 'black',
              fontSize: 18,
              borderRadius: 50,
              paddingLeft: 50,
              paddingRight: 10,
              height: 56,
              elevation: 3,
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 0.4,
              shadowRadius: 3,
              shadowColor: 'gray',
            },
            listView: {
              maxHeight: 200,
              width: 380,
              alignSelf: 'center',
              color: 'black',
            },
            textInputContainer: {
              width: '96%',
              alignSelf: 'center',
              borderRadius: 28,
              elevation: 4,
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 3,
            },
            separator: { backgroundColor: 'darkgray', borderTopWidth: 0 },
            description: { color: 'black', fontSize: 14, borderWidth: 0, width: 350 },
          }}
          renderLeftButton={() => <Image source={require('../assets/search.png')} style={styles.searchIcon} />}
          query={{
            key: mapApiKey,
            language: 'en',
          }}
          nearbyPlacesAPI={'GooglePlacesSearch'}
          fetchDetails={true}
          listViewDisplayed={false}
          debounce={500}
        />
      </View>
      <View style={styles.map}>
        <MapViewClustering
          initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.05, 
              longitudeDelta: 0.05, 
          }}
          mapRef={mapRef}
          isPolylined={true}
          renderPolyline={renderPolyline}
          renderMarkersComp={renderMarkers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxContainer: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.07,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupmarkerView: {
    width: vw(42),
    height: vw(42),
    borderWidth: vw(1.5),
    borderColor: 'white',
    borderRadius: vw(22),
    backgroundColor: 'darkgreen',
    alignItems: 'center',
    justifyContent: 'center'
},
markerText: {
    fontSize: vw(12),
    color: 'white',
    fontFamily: fonts?.REGULAR,
},
deliverymarkerView: {
    width: vw(42),
    height: vw(42),
    borderWidth: vw(2),
    borderColor: 'white',
    borderRadius: vw(22),
    backgroundColor: 'darkBlue',
    alignItems: 'center',
    justifyContent: 'center'
},
searchIcon: {
  position: 'absolute',
  zIndex: 1,
  left: vw(15),
  top: '30%',
  width: vw(20),
  height: vw(20),
  tintColor: 'lightgray',
},
});

export default DemoScreen;