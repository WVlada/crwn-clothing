import { takeLatest, call, put } from "redux-saga/effects";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shop.actions";
import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    //const collectionsMap = convertCollectionsSnapshotToMap(snapshot); moze i tako
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap)); //umesto dispatch
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message)); //umesto dispatch
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
