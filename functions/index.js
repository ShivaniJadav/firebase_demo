const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
    "apiKey": "AIzaSyB6fkmuJffLRr8e7cwOQ1RcBVIDynCjwno",
    "authDomain": "inventorysystem-b6f64.firebaseapp.com",
    "projectId": "inventorysystem-b6f64",
    "storageBucket": "inventorysystem-b6f64.appspot.com",
    "messagingSenderId": "284450495415",
    "appId": "1:284450495415:web:42d97100004376ab64a632",
    "measurementId": "G-NBNV8GZDB1"
}) 

const db = admin.firestore()

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.getData = functions.https.onRequest(async (request, response) => {
    var arr=[];
    await db.collection('InventoryItem').get().then(QueryDocumentSnapshot => {
        QueryDocumentSnapshot.forEach(doc => {
            arr.push(doc.data());
        })    
        response.send(arr);
    })
});

exports.addData = functions.https.onRequest(async (request, response) => {
    await db.collection('InventoryItem').doc('xyz').set({
        "id":"3","Description":"soap","Brand":"pears","Price":90,"name":"soap"
    })
    response.send("product added!")
});
