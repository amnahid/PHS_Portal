const { initializeApp } = require('firebase/app');
const admin = require("firebase-admin");

// firebase config files
const serviceAccount = require("../../firebaseServiceAccount.json"); // renamed after downloading
const firebaseConfig = require("../../firebase.config.json");

// scaffolding
const firebaseDatabase = {}

// database initializers
firebaseDatabase.init = initializeApp(firebaseConfig);
firebaseDatabase.admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = firebaseDatabase