This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## MapViewClustering Component

# Component

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

For iOS, don't forget to install pods:

cd ios && pod install && cd ..

```
   import React, { useRef } from 'react';
   import MapViewClustering from './MapViewClustering';

   const App = () => {
      const mapRef = useRef(null);

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
```tsx

```
## Props

| Prop Name               | Type                                    | Required | Default Value | Description |
|-------------------------|-----------------------------------------|----------|--------------|-------------|
| `initialRegion`         | `CoordinatedType`                      | ❌        | `{ latitude: 37.78825, longitude: -122.4324 }` | Defines the initial region for the map. |
| `mapRef`               | `MutableRefObject<MapView | undefined>` | ✅        | `undefined`  | Reference to the map instance for programmatic control. |
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
| `onPressSearchedLoc`  | `(coordinates: GooglePlaceData, location: GooglePlaceDetail | null) => void` | ❌ | `() => {}` | Callback triggered when a search result is selected. |
