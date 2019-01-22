import {combineReducers} from 'redux'
import {networkReducer} from './network'
import { USER_LOGIN, USER_REGISTER, USER_FORGOTPASSWORD, INVENTORY, RECIPES} from './types';
import {reducer as uiReducer} from './ui/reducer';
import {crudReducer} from './crud'

export default combineReducers({
    user_login:networkReducer(USER_LOGIN),
    user_register:networkReducer(USER_REGISTER),
    user_forgotpassword:networkReducer(USER_FORGOTPASSWORD),
    ui:uiReducer,
    inventory:crudReducer(INVENTORY),
    recipes:networkReducer(RECIPES)
    
})