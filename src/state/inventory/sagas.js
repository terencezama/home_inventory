import firebase from 'react-native-firebase';
import { put } from 'redux-saga/effects';
import { performAction, Types } from '..';
import { success, create } from '../types';
const root = "homeinventory";
function* createInventory(action) {
    const { payload: { data } } = action;
    const uid = firebase.auth().currentUser.uid;

    // #########################################################################
    // SAVE INVENTORY OBJECT
    // #########################################################################
    let inventoryId = undefined;
    try {
        const result = yield firebase.firestore().collection(root).doc(uid).collection('inventory').add({
            ...data,
            date_created: new Date()
        });
        inventoryId = result.id;
        yield put(performAction(result, success(create(Types.INVENTORY))))
    } catch (e) {
        yield put(performAction(e, success(create(Types.INVENTORY))))
    }

    // #########################################################################
    // SAVE FIREBASE IMAGE
    // #########################################################################
    let imagePath = data.image;
    if (data.image) {
        //silenty uploads to firebase storage
        try {
            const imageUpload = yield firebase
                .storage()
                .ref(`${uid}/${inventoryId}.jpg`)
                .putFile(imagePath);
            console.log('image upload success', imageUpload);

            //since image was uploaded successfully
            yield firebase.firestore().collection(root).doc(uid).collection('inventory').doc(inventoryId).update({
                image:`firestore://${uid}/${inventoryId}.jpg`
            })
        } catch (e) {
            console.log('image upload failed', e);
        }
    }
    // #########################################################################
    // SAVE FIREBASE TAGS
    // #########################################################################
    if(data.tag){
        try{
            let obj = {};
            data.tag.forEach(element => {
                obj[element]=true;
            });
            
            const tagsaving = yield firebase.firestore().collection(root).doc(uid).collection('tags').doc('value').set(obj,{merge:true});
            console.log('saving tag success',tagsaving);
        }catch(e){
            console.log('problems saving tags',e);
        }
    }



}
function* listInventory(action) {

}

function* deleteInventory(action) {

}

function* updateInventory(action) {

}

export default {
    create: createInventory,
    read: listInventory,
    update: updateInventory,
    delete: deleteInventory,
}