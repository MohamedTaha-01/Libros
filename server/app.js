const express = require("express");
const app = express();
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const router = require("./routes/bookRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Firebase
const serviceAccount = require("./credentials.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// API routes
app.use("/books", router(db));

app.listen(3000);
