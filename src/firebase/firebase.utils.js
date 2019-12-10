import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBw6T2D-mR9J_xieJVgjKpAHo8ukBJjR8c",
  authDomain: "crwn-db-4dc61.firebaseapp.com",
  databaseURL: "https://crwn-db-4dc61.firebaseio.com",
  projectId: "crwn-db-4dc61",
  storageBucket: "crwn-db-4dc61.appspot.com",
  messagingSenderId: "652349296079",
  appId: "1:652349296079:web:b160174fc2d8168e1596ba",
  measurementId: "G-RQ7VP67KWB"
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error);
    }
  }
  return userRef;
};

export const addCollectionAndCocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  // zato sto iamo mnogo objekata radimo preko batch-a
  const batch = firestore.batch();
  //foreach radi isto i map, samo sto ne vraca novi array, sto nam ovde i ne treba
  // treba nam samo da pozovemo funkciju na svaki obj
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); //get me a new doc, and generate random ID
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {}); // ovo je initial objekat
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;
