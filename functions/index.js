// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('./_keys/artblocks-v3-firebase-adminsdk.json')),
    databaseURL: 'https://artblock-v3.firebaseio.com'
});

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.options('*', cors({origin: false}));

const contract = require('./routes/contract');

app.use('/network/:network/contract', contract);

// Expose Express API as a single Cloud Function:
exports.main = functions.https.onRequest(app);

/////////////////////////////
// Catch All Error Handler //
/////////////////////////////

app.use((error, request, response, next) => {
    console.error('API ERROR', error);
    response
        .status(500)
        .json({error: error.message});
});
