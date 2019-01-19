import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {connect} from 'react-redux';
import {withTheme} from 'react-native-material-ui';
import styles from './styles'
class InventoryEditor extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
// export default withTheme(LoginScreen)
const mapStateToProps = (state) => ({
    // ui: state.ui,
    // user_login: state.user_login
})

const mapDispatchToProps = (dispatch) => ({
    // loginRequest: (params) => dispatch(performAction(params, request(Types.USER_LOGIN)))
})
// export default withTheme(BibleBookView)
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(InventoryEditor))