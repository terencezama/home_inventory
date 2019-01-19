import React from "react";
import { StyleSheet, Dimensions } from 'react-native'
import { createAppContainer } from "react-navigation";
import { MainNavigator } from './src/navigation'
import { ThemeContext, getTheme } from 'react-native-material-ui';
import uiTheme from './src/theme'
// REDUX
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './src/state/reducers'
import rootSagas from './src/state/sagas';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['ui']
}
const persistedReducer = persistReducer(persistConfig, reducers)

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
persistStore(store)

sagaMiddleware.run(rootSagas);



// REDUX END

const AppContainer = createAppContainer(MainNavigator);
//FIREBASE
import firebase from 'react-native-firebase'
import { Config, NavigationService } from "./src/services";
import { Images } from "./src/assets";
import { COLOR } from 'react-native-material-ui'
import AppIntroSlider from 'react-native-app-intro-slider'
firebase.firestore().enablePersistence = Config.firestore.persistence;
//FIREBASE END
const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },

});
const slideStyle = {
  textStyle: { color: uiTheme.palette.primaryColor },
  titleStyle: { color: uiTheme.palette.primaryColor },
  backgroundColor: COLOR.white,
  imageStyle: styles.image,
  buttonTextStyle: { color: uiTheme.palette.primaryColor },
}
const slides = [
  {
    key: 'checklist',
    title: 'Home Inventory',
    text: 'Make a list of you household items.',
    image: Images.welcome.checklist,
    ...slideStyle
  },
  {
    key: 'cloudsync',
    title: 'Cloud Sync',
    text: 'You items will be available on multiple devices and sync in the cloud.',
    image: Images.welcome.cloudsync,
    ...slideStyle
  },
  {
    key: 'statistics',
    title: 'Statistics',
    text: 'You can view graphs of your current items.',
    image: Images.welcome.statistics,
    ...slideStyle
  },
];
export default class App extends React.Component {
  state = {
    showRealApp: false
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.state.showRealApp) {
      return (
        <Provider store={store}>
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <AppContainer ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }} />
          </ThemeContext.Provider>
        </Provider>
      );
    } else {
      return <AppIntroSlider slides={slides} onDone={this._onDone} onSkip={this._onDone}  showSkipButton={true} 
      buttonTextStyle={{
        color:uiTheme.palette.primaryColor
      }}
      activeDotStyle={{
        backgroundColor:uiTheme.palette.primaryColor
      }}
      />;
    }

  }
}