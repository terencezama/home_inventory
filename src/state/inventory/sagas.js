import firebase from 'react-native-firebase';
import { put,call, take } from 'redux-saga/effects';
import { performAction, Types } from '..';
import { success, create, failure, read, remove, update } from '../types';
import {eventChannel, END} from 'redux-saga'
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
        yield put(performAction(e, failure(create(Types.INVENTORY))))
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
                fsimage:`${uid}/${inventoryId}.jpg`
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
function _fetchInventories(){
    const uid = firebase.auth().currentUser.uid;
    return eventChannel(emitter=>{
        const ref =  firebase.firestore().collection(root).doc(uid).collection('inventory').orderBy('name','asc');
        const subscriber = ref.onSnapshot(querySnapshot=>{
            let inventories = [];
            querySnapshot.forEach((doc) => {
                inventories.push({
                    id: doc.id,
                    ...doc.data(), // DocumentSnapshot
                });
            });
            emitter(inventories);
        });
        return subscriber;
    });
}
function* listInventory(action) {
    const channel = yield call(_fetchInventories);
    while(true){
        const res = yield take(channel);
        // console.log(res);
        yield put(performAction(res, success(read(Types.INVENTORY))));
    }
}

function* deleteInventory(action) {
    const { payload: { data } } = action;
    const uid = firebase.auth().currentUser.uid;
    console.log('delete',action);
    try{
        const id = data.id;
        const ref =  firebase.firestore().collection(root).doc(uid).collection('inventory').doc(id);
        const res = yield ref.delete();
        yield put(performAction(res, success(remove(Types.INVENTORY))));
        console.log('delete inventory success',res);
    }catch(e){
        yield put(performAction(e, failure(remove(Types.INVENTORY))));
        console.log('delete inventory failure',e);
    }

}

function* updateInventory(action) {
    const { payload: { data } } = action;
    const uid = firebase.auth().currentUser.uid;
    console.log('update inventory attempt',data);
    try{
        const result = yield firebase.firestore().collection(root).doc(uid).collection('inventory').doc(data.id).update({
            ...data,
            date_modified: new Date()
        });
        console.log('update inventory success',result);
        yield put(performAction(result, success(update(Types.INVENTORY))));
    }catch(e){
        yield put(performAction(e, failure(update(Types.INVENTORY))));
        console.log('update inventory failure',e);
    }

    // #########################################################################
    // SAVE FIREBASE IMAGE
    // #########################################################################
    const inventoryId = data.id;
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
                fsimage:`${uid}/${inventoryId}.jpg`
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

export default {
    create: createInventory,
    read: listInventory,
    update: updateInventory,
    delete: deleteInventory,
}