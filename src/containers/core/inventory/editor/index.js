import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { withTheme, Button, COLOR } from 'react-native-material-ui';
import styles from './styles'
import i18n from '../../../../services/localization';
import { TextField } from 'react-native-material-textfield'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ImagePicker, DateInput } from '../../../../components';
import Tags from "react-native-tags";
import { material } from 'react-native-typography';
import { performAction, Types } from '../../../../state';
import { create, request } from '../../../../state/types';


const InventoryEditorSchema = Yup.object().shape({
    name: Yup.string()
        .required(i18n.t('validation_required')),

});
class InventoryEditor extends Component {

    static navigationOptions = {
        title: i18n.t('inventory/add_title'),
    };

    state = {

    }

    componentDidMount() {

    }

    _onSubmit = (values) => {
        this.props.createInventory({
            data:values
        })
    }


    render() {
        const { image } = this.state;
        const { theme:palette} = this.props;
        return (
            <View style={this.props.theme.palette.screen}>
                <ScrollView>
                    <Formik
                        initialValues={{
                            name:'',
                            // description:'',
                            // tag: []

                        }}

                        onSubmit={this._onSubmit}
                        validationSchema={InventoryEditorSchema}
                        ref={(ref) => { this.formik = ref; }}
                    >
                        {props => (
                            <View>
                                <ImagePicker onImageCaptured={props.handleChange('image')} />
                                <TextField
                                    onChangeText={props.handleChange('name')}
                                    onBlur={props.handleBlur('name')}
                                    value={props.values.name}
                                    label={i18n.t('field_name')}
                                    error={props.touched.name ? props.errors.name : undefined}

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
                                    onDateChanged={date=>{props.setFieldValue('date_bought',date)}}
                                    onBlur={props.handleBlur('date_bought')}
                                    value={props.values.date_bought}
                                    label={i18n.t('field_date_bought')}
                                    error={props.touched.date_bought ? props.errors.date_bought : undefined}

                                />
                                <DateInput
                                    onDateChanged={date=>{props.setFieldValue('exp_date',date)}}
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


                                <View>
                                    <Text style={material.title}>#tags</Text>
                                    <Tags
                                        initialText=""
                                        textInputProps={{
                                            placeholder: "input tags here seperated by space"
                                        }}
                                        initialTags={props.values.tag || []}
                                        onChangeTags={tags=>{props.setFieldValue('tag',tags)}}
                                        // onTagPress={(index, tagLabel, event, deleted) =>
                                        //     console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                                        // }
                                        containerStyle={{ justifyContent: "center", backgroundColor:COLOR.grey100, marginBottom: 8, paddingBottom: 8,}}
                                        tagTextStyle = {styles.tagTextStyle}
                                        tagContainerStyle = {styles.tagContainerStyle}
                                        inputStyle={{ backgroundColor: "white" }}
                                    />
                                </View>

                                <Button onPress={props.handleSubmit} raised primary text={i18n.t('forgot_submit')}
                                disabled={props.isSubmitting || !props.isValid}

                                />
                            </View>
                        )}
                    </Formik>

                </ScrollView>
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
    createInventory: params => dispatch(performAction(params,request(create(Types.INVENTORY))))
})
// export default withTheme(BibleBookView)
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(InventoryEditor))