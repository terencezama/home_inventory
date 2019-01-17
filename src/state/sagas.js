import { takeLatest, all, take } from 'redux-saga/effects'
import { Types } from '.';
import {checkUserLoggedIn, loginUser,registerUser,forgotPassword, logoutUser} from './auth/sagas';
import { request } from './types';
export default function * root () {
    yield all([
      takeLatest(Types.CHECK_USER_LOGGEDIN,checkUserLoggedIn),

      takeLatest(request(Types.USER_LOGIN),loginUser),
      takeLatest(request(Types.USER_REGISTER),registerUser),
      takeLatest(request(Types.USER_FORGOTPASSWORD),forgotPassword),
      takeLatest(Types.USER_LOGOUT,logoutUser),




    ])
  }