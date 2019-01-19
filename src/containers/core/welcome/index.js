import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import { withTheme, Button, Card } from 'react-native-material-ui'
import { i18n, NavigationService } from '../../../services';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { performAction, Types } from '../../../state';
import { Images } from '../../../assets';
import {material} from 'react-native-typography'
class WelcomeScreen extends Component {
  static navigationOptions = {
    title: i18n.t('welcome_title'),
    header: null
  };

  componentWillMount() {
    this.props.checkIfUserLoggedIn();
  }

  _onLoginPressed = e => {
    this.props.navigation.navigate('LoginScreen');
  }

  _onRegistrationPressed = e => {
    this.props.navigation.navigate('RegisterScreen');
  }

  _onContinuePressed = e => {
    NavigationService.reset('main')
  }

  render() {
    const { theme } = this.props;
    return (
      <View style={[theme.palette.screen, { justifyContent: 'space-between' }]}>
       <View style={{alignItems:'center'}}>
         <Text style={[material.title,{textAlign:'center',marginBottom:20 }]}>{'Home Inventory'}</Text>
         <Image source={Images.welcome.appicon} style={{width: Dimensions.get('window').width/2, height:Dimensions.get('window').width/2}} resizeMode={'stretch'}  />

       </View>

        {
          (() => {
            switch (this.props.ui.user_logged_in) {
              case 0:
                return (
                  <Text style={[material.title,{textAlign:'center'}]}>{i18n.t('loading')}</Text>
                );
              case 1:
                return (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button text={i18n.t('welcome_continue')} primary raised onPress={this._onContinuePressed} />
                  </View>
                )
              case -1:
                return (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button text={i18n.t('registration_title')} primary raised onPress={this._onRegistrationPressed} />
                    <Button text={i18n.t('login_title')} primary raised onPress={this._onLoginPressed} />
                  </View>
                )
            }
          })()
        }
      </View>
    )
  }
}


const mapStateToProps = (state) => ({
  ui: state.ui
})

const mapDispatchToProps = (dispatch) => ({
  checkIfUserLoggedIn: params => dispatch(performAction(params, Types.CHECK_USER_LOGGEDIN)),
  logoutRequest: () => dispatch(performAction(undefined,Types.USER_LOGOUT)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(WelcomeScreen))