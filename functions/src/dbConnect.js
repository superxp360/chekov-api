import { initializeApp, cert } from "firebase-admin/app";
import creds from "../creds.js";
import { getFirestore } from "firebase-admin/firestore";

//Connects us to our firebase project
initializeApp({
    credential: cert(creds)
})

export default getFirestore() //Connects to our db
