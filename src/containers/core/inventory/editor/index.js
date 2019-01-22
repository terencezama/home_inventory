import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { withTheme, Button, COLOR, IconToggle } from 'react-native-material-ui';
import styles from './styles'
import i18n from '../../../../services/localization';
import { TextField } from 'react-native-material-textfield'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ImagePicker, DateInput, Screen } from '../../../../components';
import Tags from "react-native-tags";
import { material } from 'react-native-typography';
import { performAction, Types } from '../../../../state';
import { create, request, update } from '../../../../state/types';
import uiTheme from '../../../../theme';
import { NavigationService } from '../../../../services';

const InventoryEditorSchema = Yup.object().shape({
    name: Yup.string()
        .required(i18n.t('validation_required')),

});
class InventoryEditor extends Component {

    static navigationOptions = ({ navigation }) => {
        const from = navigation.getParam('from');
        return {
            title: from ? i18n.t('inventory/update_title'):  i18n.t('inventory/add_title'),
            headerLeft: from ? undefined : (
                <IconToggle name="menu" size={uiTheme.palette.iconSize} onPress={() => navigation.toggleDrawer()} />
            ),

        };
    }


    componentDidUpdate = (prevProps, prevState) => {
        const { inventory } = this.props;
        if (prevProps.inventory.create !== inventory.create && !inventory.create.fetching) {
            this.formik.setSubmitting(false);
            setTimeout(() => {
                NavigationService.reset('main');
            }, 300);
        }else if (prevProps.inventory.update !== inventory.update && !inventory.update.fetching){
            this.formik.setSubmitting(false);
            setTimeout(() => {
                this.props.navigation.popToTop();
            }, 300);
        }
    }


    _onSubmit = (values) => {
        const update = this.props.navigation.getParam('update');
        if(update){
            this.props.navigation.setParams({item:values});
            this.props.updateInventory({
                data:values
            })
        }else{
            this.props.createInventory({
                data: values
            })
        }
        
    }


    render() {
        const { inventory, navigation } = this.props;
        const loading = (inventory.create && inventory.create.fetching) || (inventory.update && inventory.update.fetching);
        let initialValues = {
            name: '',
            unitprice: 1
        }
        const update = navigation.getParam('update');
        if(update){
            initialValues={...update}
        }
        return (
            <Screen style={{ flex: 1 }} loading={loading}>
                <ScrollView>
                    <View style={this.props.theme.palette.screen}>
                        <Formik
                            initialValues={initialValues}

                            onSubmit={this._onSubmit}
                            validationSchema={InventoryEditorSchema}
                            ref={(ref) => { this.formik = ref; }}
                        >
                            {props => (
                                <View>
                                    <ImagePicker update={update} onImageCaptured={props.handleChange('image')} />
                                    <TextField
                                        onChangeText={props.handleChange('name')}
                                        onBlur={props.handleBlur('name')}
                                        value={props.values.name}
                                        label={i18n.t('field_name')}
                                        error={props.touched.name ? props.errors.name : undefined}


                                    />
                                    <TextField
                                        onChangeText={props.handleChange('unitprice')}
                                        onBlur={props.handleBlur('unitprice')}
                                        value={`${props.values.unitprice}`}
                                        label={i18n.t('field_unitprice')}
                                        error={props.touched.unitprice ? props.errors.unitprice : undefined}
                                        keyboardType={'numeric'}

                                    />
                                    <TextField
                                        onChangeText={props.handleChange('description')}
                                        onBlur={props.handleBlur('description')}
                                        value={props.values.description}
                                        label={i18n.t('field_description')}
                                        error={props.touched.description ? props.errors.description : undefined}
                                        multiline={true}
                                        numberOfLines={4}

                                    />

                                    <TextField
                                        onChangeText={props.handleChange('quantity')}
                                        onBlur={props.handleBlur('quantity')}
                                        value={props.values.quantity}
                                        label={i18n.t('field_quantity')}
                                        error={props.touched.quantity ? props.errors.quantity : undefined}
                                        keyboardType={'numeric'}

                                    />
                                    <DateInput
                                        onDateChanged={date => { props.setFieldValue('date_bought', date) }}
                                        onBlur={props.handleBlur('date_bought')}
                                        value={props.values.date_bought}
                                        label={i18n.t('field_date_bought')}
                                        error={props.touched.date_bought ? props.errors.date_bought : undefined}

                                    />
                                    <DateInput
                                        onDateChanged={date => { props.setFieldValue('exp_date', date) }}
                                        onBlur={props.handleBlur('exp_date')}
                                        value={props.values.exp_date}
                                        label={i18n.t('field_exp_date')}
                                        error={props.touched.exp_date ? props.errors.exp_date : undefined}

                                    />
                                    <TextField
                                        onChangeText={props.handleChange('weekly_consumption')}
                                        onBlur={props.handleBlur('weekly_consumption')}
                                        value={props.values.weekly_consumption}
                                        label={i18n.t('field_weekly_consumption')}
                                        error={props.touched.weekly_consumption ? props.errors.weekly_consumption : undefined}
                                        keyboardType={'numeric'}

                                    />
                                    <TextField
                                        onChangeText={props.handleChange('places_to_buy')}
                                        onBlur={props.handleBlur('places_to_buy')}
                                        value={props.values.places_to_buy}
                                        label={i18n.t('field_places_to_buy')}
                                        error={props.touched.places_to_buy ? props.errors.places_to_buy : undefined}

                                    />
                                    <TextField
                                        onChangeText={props.handleChange('specific_brand')}
                                        onBlur={props.handleBlur('specific_brand')}
                                        value={props.values.specific_brand}
                                        label={i18n.t('field_specific_brand')}
                                        error={props.touched.specific_brand ? props.errors.specific_brand : undefined}
                                    />


                                    <View>
                                        <Text style={material.title}>#tags</Text>
                                        <Tags
                                            initialText=""
                                            textInputProps={{
                                                placeholder: "input tags here seperated by space"
                                            }}
                                            initialTags={props.values.tag || []}
                                            onChangeTags={tags => { props.setFieldValue('tag', tags) }}
                                            // onTagPress={(index, tagLabel, event, deleted) =>
                                            //     console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                                            // }
                                            containerStyle={{ justifyContent: "center", backgroundColor: COLOR.grey100, marginBottom: 8, paddingBottom: 8, }}
                                            tagTextStyle={styles.tagTextStyle}
                                            tagContainerStyle={styles.tagContainerStyle}
                                            inputStyle={{ backgroundColor: "white" }}
                                        />
                                    </View>

                                    <Button onPress={props.handleSubmit} raised primary text={update?'Update':'Submit'}
                                        disabled={props.isSubmitting || !props.isValid}

                                    />
                                </View>
                            )}
                        </Formik>
                    </View>

                </ScrollView>

            </Screen>
        )
    }
}
// export default withTheme(LoginScreen)
const mapStateToProps = (state) => ({
    inventory: state.inventory

})

const mapDispatchToProps = (dispatch) => ({
    // loginRequest: (params) => dispatch(performAction(params, request(Types.USER_LOGIN)))
    createInventory: params => dispatch(performAction(params, request(create(Types.INVENTORY)))),
    updateInventory:params => dispatch(performAction(params,request(update(Types.INVENTORY))))
})
// export default withTheme(BibleBookView)
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(InventoryEditor))