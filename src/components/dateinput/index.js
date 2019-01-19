import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment-es6';
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible:false,
      date:undefined
    };
  }

  _handleDatePicked = date => {
    this.setState({date,isVisible:false})
    this.props.onDateChanged(date);
  }


  render() {
    const {isVisible,date} = this.state;
    return (
      <View>
        <TouchableOpacity onPress={()=>{this.setState({isVisible:true})}}>
          <TextField {...this.props} editable={false} value={date?moment(date).format('DD/MM/YYYY'):""} />

        </TouchableOpacity>
        <DateTimePicker
          isVisible={isVisible}
          onConfirm={this._handleDatePicked}
          onCancel={()=>{this.setState({isVisible:false})}}
        />
      </View>
    );
  }
}


export default DateInput;