import React, { Component } from 'react';
import { ScrollView, Image, Text, View } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import styles from './styles'
import { Drawer,Avatar, withTheme } from 'react-native-material-ui';
import { i18n, NavigationService } from '../../services';
import { Images } from '../../assets';
import {material} from 'react-native-typography';
import firebase from 'react-native-firebase'
import {connect} from 'react-redux'
import { performAction, Types } from '../../state';
const CustomDrawerContentComponent = (props) => {
    _navigate = (screen) =>{
        NavigationService.reset(screen);
        // props.navigation.navigate(screen);
    }
    return (
        <ScrollView >
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <Drawer>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image source={Images.welcome.appicon} style={{flex:1,margin:8}} resizeMode={'center'} />
                <View style={styles.textContainer}>
                    <Text style={material.title}>{props.ui.user?props.ui.user.nickname:''}</Text>
                    <Text style={material.subheading}>{props.ui.user?props.ui.user.email:''}</Text>
                </View>
                </View>
                    <Drawer.Section
                        divider
                        items={[
                            { icon: 'event-note', value: i18n.t('menu/inventory_list'), onPress:()=>this._navigate('main') },
                            { icon: 'add', value: i18n.t('menu/inventory_add'), onPress:()=>this._navigate('InventoryEditorScreen')},
                            { icon: 'account-box', value: i18n.t('menu/contacts'), onPress:()=>this._navigate('ContactsScreen')},
                            { icon: 'donut-large', value: i18n.t('menu/recipes'), onPress:()=>this._navigate('RecipesScreen')},

                            
                        ]}
                    />
                    <Drawer.Section
                        title="Personal"
                        items={[
                            // { icon: 'bookmark-border', value: i18n.t("menu/notifications") },
                            { icon: 'settings', value: i18n.t("menu/settings"), onPress:()=>this._navigate('SettingsScreen') },
                            // { icon: 'history', value: i18n.t("menu/history") },
                            { icon: 'power-settings-new', value: i18n.t("menu/logout"), active:true, onPress:()=>{props.logoutRequest()}},
                        ]}
                    />
                </Drawer>
            </SafeAreaView>
        </ScrollView>
    );
}
const mapStateToProps = (state) => ({
    ui: state.ui,
})

const mapDispatchToProps = (dispatch) => ({
    logoutRequest: () => dispatch(performAction(undefined,Types.USER_LOGOUT)),
})
// export default withTheme(BibleBookView)
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CustomDrawerContentComponent))
// export default withTheme(CustomDrawerContentComponent);