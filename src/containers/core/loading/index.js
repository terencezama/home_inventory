import React, { Component } from 'react'
import { Text, View, ActivityIndicator, BackHandler } from 'react-native'
import styles from './styles';
import { withTheme } from 'react-native-material-ui';
import { material } from 'react-native-typography'
import { i18n } from '../../../services';

class Loading extends Component {
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // this.goBack(); // works best when the goBack is async

            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }
    render() {
        const { theme: { palette } } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <ActivityIndicator size="large" color={palette.darkTextColor} />
                    <Text style={[material.titleWhite]}>{i18n.t('loading')}</Text>
                </View>
            </View>
        )
    }
}

export default withTheme(Loading)
