import { takeLatest, all, take } from 'redux-saga/effects'
import { Types } from '.';
import {checkUserLoggedIn, loginUser,registerUser,forgotPassword, logoutUser} from './auth/sagas';
import { request, create, read, update, remove } from './types';
import inventorySaga from './inventory/sagas';
const crudTake = (type,saga) => {
  return [
    takeLatest(request(create(type)),saga.create),
    takeLatest(request(read(type)),saga.read),
    takeLatest(request(update(type)),saga.update),
    takeLatest(request(remove(type)),saga.delete)
  ]
}
export default function * root () {
    yield all([
      takeLatest(Types.CHECK_USER_LOGGEDIN,checkUserLoggedIn),

      takeLatest(request(Types.USER_LOGIN),loginUser),
      takeLatest(request(Types.USER_REGISTER),registerUser),
      takeLatest(request(Types.USER_FORGOTPASSWORD),forgotPassword),
      takeLatest(Types.USER_LOGOUT,logoutUser),
      ...crudTake(Types.INVENTORY,inventorySaga)
    ])
  }