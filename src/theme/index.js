import {COLOR} from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'
import SyncStorage from 'sync-storage';
// if(!SyncStorage.get('primaryColor')){
//   SyncStorage.set('primaryColor',COLOR.red500)
//   console.log('initial color',SyncStorage.get('primaryColor'))
// }
let uiTheme = {
    palette: {
      get primaryColor() {
        return SyncStorage.get('primaryColor') || COLOR.red500
      },
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