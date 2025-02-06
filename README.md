This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli). 

## MapViewClustering Component

`MapViewClustering` is a reusable React Native component that provides an interactive map with clustering, search, and multiple customization options. It leverages `react-native-maps`, `react-native-map-clustering`, and `react-native-google-places-autocomplete` for a seamless mapping experience.

## Features

- Google Maps integration with clustering
- Custom markers and clustering options
- Google Places Autocomplete search functionality
- Support for polylines, circles, heatmaps, and polygons
- Clickable markers with event handling
- Fully customizable styling

## Installation

Ensure you have the required dependencies installed:

```sh
npm install react-native-maps react-native-map-clustering react-native-google-places-autocomplete

OR 

yarn add react-native-maps react-native-map-clustering react-native-google-places-autocomplete

```
For iOS, don't forget to install pods:
```

cd ios && pod install && cd ..

```
## Example
```sh
   import React, { useRef } from 'react';
   import MapViewClustering from './MapViewClustering';

   const App = () => {
      const mapRef = usRef(null);

      return (
         <MapViewClustering 
               mapRef={mapRef}
               isSearchEnabled={true}
               coordinateDataArray={[
                  { latitude: 37.78825, longitude: -122.4324 },
                  { latitude: 37.785, longitude: -122.45 }
               ]}
               onMarkerClick={(index) => console.log(`Marker ${index} clicked`)}
         />
      );
   };

   export default App;
```
## Props

| Prop Name               | Type                                    | Required | Default Value | Description |
|-------------------------|-----------------------------------------|----------|--------------|-------------|
| `initialRegion`         | `CoordinatedType`                      | ❌        | `{ latitude: 37.78825, longitude: -122.4324 }` | Defines the initial region for the map. |
| `mapRef`               | `MutableRefObject<MapView or undefined>` | ✅        | `undefined`  | Reference to the map instance for programmatic control. |
| `coordinateDataArray`   | `Array<CoordinatedType>`               | ❌        | `[]`         | Array of coordinates to display as markers. |
| `markerImage`          | `ImageURISource`                        | ❌        | `undefined`  | Custom image for the markers. |
| `onMapReady`           | `Function`                              | ❌        | `undefined`  | Callback triggered when the map is ready. |
| `onMarkerClick`        | `(index: number) => void`               | ❌        | `undefined`  | Callback triggered when a marker is clicked. |
| `renderMarkersComp`    | `() => React.JSX.Element`               | ❌        | `undefined`  | Custom render function for markers. |
| `clusterColor`         | `string`                                | ❌        | `#FF8C00`    | Color of the cluster markers. |
| `clusterFontFamily`    | `string`                                | ❌        | `fonts.MEDIUM` | Font family for cluster text. |
| `clusterTextColor`     | `string`                                | ❌        | `#FFFFFF`    | Text color of the cluster markers. |
| `isPolylined`          | `boolean`                               | ❌        | `false`      | Enables polylines on the map. |
| `clusteringEnabled`    | `boolean`                               | ❌        | `true`       | Enables marker clustering. |
| `renderPolyline`       | `() => React.JSX.Element`               | ❌        | `undefined`  | Custom render function for polylines. |
| `renderCircleWithMarker` | `() => React.JSX.Element`             | ❌        | `undefined`  | Custom render function for circles with markers. |
| `renderHeatMap`        | `() => React.JSX.Element`               | ❌        | `undefined`  | Custom render function for heatmaps. |
| `renderPolygon`        | `() => React.JSX.Element`               | ❌        | `undefined`  | Custom render function for polygons. |
| `onPressMap`          | `(coordinates: Object) => void`         | ❌        | `undefined`  | Callback for map press events. |
| `isSearchEnabled`     | `boolean`                                | ❌        | `false`      | Enables Google Places Autocomplete search. |
| `countryLatLng`       | `string`                                | ❌        | `undefined`  | Comma-separated latitude and longitude for a country. |
| `onPressSearchedLoc`  | `(coordinates: GooglePlaceData, location: GooglePlaceDetail or null) => void` | ❌ | `() => {}` | Callback triggered when a search result is selected. |
