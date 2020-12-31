import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAU7bhMpH6cZcaW5TQ94Ol3mYF6ypz9EKM",
    authDomain: "music-store-53fa0.firebaseapp.com",
    databaseURL: "https://music-store-53fa0.firebaseio.com"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
