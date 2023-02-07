const { getStorage } = require('firebase-admin/storage');

const firebaseDatabase = require("../database/firebase.database");
// const firebaseDatabase = require("../utils/firebase.util");

const firebaseManager = {}
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