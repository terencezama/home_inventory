import {combineReducers} from 'redux'
import {networkReducer} from './network'
import { USER_LOGIN, USER_REGISTER, USER_FORGOTPASSWORD} from './types';
import {reducer as uiReducer} from './ui/reducer';


export default combineReducers({
    user_login:networkReducer(USER_LOGIN),
    user_register:networkReducer(USER_REGISTER),
    user_forgotpassword:networkReducer(USER_FORGOTPASSWORD),
    ui:uiReducer,
    
})