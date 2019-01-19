import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
import { Button } from 'react-native-material-ui'
import styles from './styles'
import { i18n } from '../../services';
import PropTypes from 'prop-types';
class ImagePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: undefined
        };
    }
    /*
    onChangeText={props.handleChange('tag')}
                                        onBlur={props.handleBlur('tag')}
                                        */
    _processImage = image => {
        const { path } = image;
        console.log('images has been saved to path', path);
        this.setState({ image: path })

        this.props.onImageCaptured(path);

    }

    _addPhoto = (index) => {
        if (index == 0) {
            ImagePicker.openCamera({
                width: 300,
                height: 300,
                cropping: true
            }).then(this._processImage);
        } else {
            ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true
            }).then(this._processImage);
        }
    }
    render() {
        const { image } = this.state;
        const imageRender = image ?
            (
                <TouchableOpacity onPress={() => this.ActionSheet.show()} >
                    <Image source={{ uri: image }} style={styles.imageContainer} resizeMode={'contain'} />
                </TouchableOpacity>
            ) :
            (
                <View>
                    <Button onPress={() => this.ActionSheet.show()} raised primary text={i18n.t('form/add_photo')} icon={'add'} style={{
                        container: {
                            width: 100,
                            height: 100
                        }
                    }} />
                </View>
            )

        return (
            <View>
                {imageRender}
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Where would you like to take the picture?'}
                    options={['Camera', 'Photo Gallery', 'Cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={2}
                    onPress={(index) => {
                        if (index !== 2) {
                            this._addPhoto(index)
                        }
                    }}
                />
            </View>
        )


    }
}


ImagePickerComponent.propsType = {
    onImageCaptured: PropTypes.func.isRequired
}
export default ImagePickerComponent;