const { getAuth, signInWithCustomToken } = require("firebase/auth");
const { getStorage } = require('firebase-admin/storage');

const firebaseDatabase = require("../database/firebase.database");
// const firebaseDatabase = require("../utils/firebase.util");

const firebaseManager = {}

firebaseManager.signInWithCustomToken = async (token) => {
  const auth = getAuth(firebaseDatabase.init); // auth reference
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

firebaseManager.createCustomToken = async (uid) => {
  // admin.auth()
  return await firebaseDatabase.admin.auth()
    .createCustomToken(uid)
    .then((customToken) => {
      // Send token back to client
      return customToken
    })
    .catch((error) => {
      console.log('Error creating custom token:', error);
    });
}


// upload to firebase storage
const bucket = getStorage(firebaseDatabase.admin).bucket() // generating ref.....
firebaseManager.storeMedia = async (mediaFile, filePath) => {
  const contents = mediaFile; // data of media file
  const destFileName = filePath; // destination of firebase storage

  // upload
  async function uploadFromMemory() {
    await bucket.file(destFileName).save(contents);
  }

  uploadFromMemory().catch(console.error);
}

// fetching file from firebase storage
firebaseManager.fetchMedia = async (mediaPath) => {
  async function downloadIntoMemory(fileName) {
    // Downloads the file into a buffer in memory.
    const contents = await bucket.file(fileName).download();
    return contents
  }

  return downloadIntoMemory(mediaPath).catch(console.error);
}

module.exports = firebaseManager