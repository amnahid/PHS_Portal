const { getAuth, signInWithCustomToken } = require("firebase/auth");
const firebaseDatabase = require("../database/firebase.database");
// const firebaseDatabase = require("../utils/firebase.util");

const firebaseManager = {}

const auth = getAuth(firebaseDatabase.init);
firebaseManager.signInWithCustomToken = async (token) => {
  return await signInWithCustomToken(auth, token)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(Object.keys(user), " then in signInWithCustomToken")
      return user.accessToken
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error, " error in signInWithCustomToken")
      // ...
    });
}

firebaseManager.createCustomToken = (uid) => {
  // admin.auth()
  return firebaseDatabase.admin.auth()
    .createCustomToken(uid)
    .then((customToken) => {
      // Send token back to client
      return customToken
    })
    .catch((error) => {
      console.log('Error creating custom token:', error);
    });
}

module.exports = firebaseManager