import * as React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as WebBrowser from 'expo-web-browser';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const slackAppId = {
  ios: 'id618783545',
  android: 'com.Slack',
}

const state = {
  links: [
      {
        title: 'Art Institute of Chicago',
        url: 'https://www.artic.edu/',
        type: 'internal link'
      },
      {
        title: 'Magnificent Mile',
        url: 'https://www.themagnificentmile.com/',
        type: 'internal link',
      },
      {
        title: 'Willis Tower',
        url: 'https://www.willistower.com/',
        type: 'internal link',
      },
      {
        title: 'Navy Pier',
        url: 'https://navypier.org/',
        type: 'internal link',
      },
      {
        title: 'Water Tower',
        url: 'https://www.chicago.gov/city/en/depts/dca/supp_info/city_gallery_in_thehistoricwatertower.html',
        type: 'internal link'
      }
  ]
}

function handleMissingApp() {
  if (Platform.OS === 'ios') {
    Linking.openURL(`https://itunes.apple.com/us/app/${slackAppId.ios}`);
  } else {
    Linking.openURL(
      `https://play.google.com/store/apps/details?id=${slackAppId.android}`
    );
  }
}

function handleButtonPress(button) {
  if (button.type === 'internal link') {
    WebBrowser.openBrowserAsync(button.url);
  } else {
    Linking.openURL(button.url).catch(({ message }) => {
      if (message.includes('slack://')) {
        handleMissingApp();
      }
    });
  }
}

function renderButton (button, index) {
  return(
    <TouchableOpacity
      key={index}
      onPress={() => handleButtonPress(button)}
      style={styles.button}
    >
      <Text style={styles.text}>{button.title}</Text>
    </TouchableOpacity>
  );
}

function ArtOfChicagoScreen({ navigation }) {
  const art = require('./assets/art.png');
  const buttons = state.links.map(renderButton);

  return (
    <View style={styles.view}>
      <Image source={art} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.buttonList}>
          {buttons[0]}
        </View>
      </View>
    </View>
  );
}

function MagnificentMileScreen({ navigation }) {
  const mile = require('./assets/mile.png');
  const buttons = state.links.map(renderButton);

  return (
    <View style={styles.view}>    
      <Image source={mile} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.buttonList}>
          {buttons[1]}
        </View>
      </View>
    </View>
  );
}

function NavyPierScreen({ navigation }) {
  const pier = require('./assets/pier.png');
  const buttons = state.links.map(renderButton);

  return (
    <View style={styles.view}>    
      <Image source={pier} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.buttonList}>
          {buttons[3]}
        </View>
      </View>
    </View>
  );
}

function WaterTowerScreen({ navigation }) {
  const water = require('./assets/water.png');
  const buttons = state.links.map(renderButton);

  return (
    <View style={styles.view}>    
      <Image source={water} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.buttonList}>
          {buttons[4]}
        </View>
      </View>
    </View>
  );
}

function WillisTowerScreen({ navigation }) {
  const willis = require('./assets/willis.png');
  const buttons = state.links.map(renderButton);

  return (
    <View style={styles.view}>    
      <Image source={willis} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.buttonList}>
          {buttons[2]}
        </View>
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Art Institute of Chicago">
        <Drawer.Screen name="Art Institue of Chicago" component={ArtOfChicagoScreen} />
        <Drawer.Screen name="Magnificent Mile" component={MagnificentMileScreen} />
        <Drawer.Screen name="Navy Pier" component={NavyPierScreen} />
        <Drawer.Screen name="Water Tower" component={WaterTowerScreen} />
        <Drawer.Screen name="Willis Tower" component={WillisTowerScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  view:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: 360,
    width: 240,
  },
  button: {
    margin: 10,
    backgroundColor: '#3A9bdc',
    borderRadius: 3,
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
})
