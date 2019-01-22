import React, { Component } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withTheme, Icon, ListItem, IconToggle, ActionButton, COLOR } from 'react-native-material-ui'
import styles from './styles'
import { i18n, NavigationService } from '../../../../services';
import uiTheme from '../../../../theme';
import { performAction, Types } from '../../../../state';
import { read, request, remove } from '../../../../state/types';
import { alpha } from '../../../../lib/color';
import { Screen } from '../../../../components';
import firebase from 'react-native-firebase';
import InventoryItem from './item';

// Buttons
export class InventoryList extends Component {
    static navigationOptions = ({ navigation }) => {

        return {
            title: i18n.t('inventory/list'),
            headerLeft: navigation.getParam('from') ? undefined : (
                <IconToggle name="menu" size={uiTheme.palette.iconSize} onPress={() => navigation.toggleDrawer()} />
            ),

        };
    }

    state = {
        data: []
    }



    _deleteItem = item => {
        setTimeout(() => {
            this.props.deleteInventory({ data: item });
        }, 300);
    }

    _updateItem = item => {
        NavigationService.navigate('InventoryEditorScreen',{
            update:item,
            from:item.name,
        });
    }
    componentDidMount() {
        this.props.inventoryRequest();

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { inventory: { read: list } } = nextProps;
        // console.log('list',inventory);
        if (list && list.res !== prevState.data && !list.fetching) {
            return {
                data: list.res
            }
        }
        return null;
    }


    _onItemPressed = item => {
        NavigationService.navigate('InventoryDetailsScreen',{item})
    }
    _renderItem = ({ item }) => {



        return (
            <InventoryItem
                item={item}
                deleteItem={this._deleteItem}
                updateItem={this._updateItem}
                onItemPressed={this._onItemPressed}

            />
        )
    }

    render() {
        const { inventory } = this.props;
        const loading = inventory.read && inventory.read.fetching
        return (
            <Screen style={{ flex: 1 }} loading={loading}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `${item.id}`}
                    extraData={this.state}
                />
                <ActionButton onPress={() => NavigationService.reset('InventoryEditorScreen')} />
            </Screen>
        )
    }
}

const mapStateToProps = (state) => ({
    inventory: state.inventory,
    ui: state.ui

})

const mapDispatchToProps = dispatch => ({
    inventoryRequest: params => dispatch(performAction(params, request(read(Types.INVENTORY)))),
    deleteInventory: params => dispatch(performAction(params, request(remove(Types.INVENTORY))))

})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(InventoryList))
