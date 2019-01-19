import {StyleSheet} from 'react-native';
import uiTheme from '../../../../theme';
const styles = StyleSheet.create({
    imageContainer:{
        width:100,
        height:100,
        backgroundColor:uiTheme.palette.primaryColor
    },
    tagContainerStyle:{
        backgroundColor:'red'
    },
    tagTextStyle:{
        color:'white'
    }
});
export default styles;