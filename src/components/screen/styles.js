import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
// import {getTheme} from 'react-native-material-ui';
// import theme from '../../theme';
import uiTheme from '../../theme';

const styles = StyleSheet.create({
    container:{
        
        position:'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0,
        backgroundColor: uiTheme.palette.primaryColor+"E6",
        flex:1,
        justifyContent:'center',
    },
    text:{
        color:uiTheme.palette.darkTextColor
    },
    content:{
        alignItems:'center'
    }
});

export default styles;