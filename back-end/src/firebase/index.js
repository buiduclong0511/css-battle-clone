const admin = require("firebase-admin");

const credential = require("./css-battle-clone-firebase-adminsdk-2dsox-c3736d81a4.json");

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(credential),
});

module.exports = firebaseApp;
