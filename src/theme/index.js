import {COLOR} from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'
const uiTheme = {
    palette: {
      primaryColor: COLOR.red500,
      darkTextColor:COLOR.red100,
      textColor: 'black',
      backgroundColor:COLOR.grey50,
      iconSize:20,
      screen:{
          flex:1,
        //   backgroundColor:'#EEEEEE',
          margin:20
      }
    },
    toolbar: {
      container: {
        height: 50,
      },
    },
  };
TextField.defaultProps.tintColor = uiTheme.palette.primaryColor;
// TextField.defaultProps.errorColor = 'red';
  export default uiTheme;