import { FieldValue } from "firebase-admin/firestore";
import db from "./dbConncet.js";

const coll = db.collection("tasks");


//Get All Tasks
export async function getTasks(req, res) {
    const { uid } = req.params;
    // get all tasks by user:
    const tasks = await coll.where('uid', '==', uid).get();
    // arrange task in an array:
    const taskArray = tasks.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(taskArray);
}


//Add Tasks
export async function addTask(req, res) {
    const { title, uid } = req.body;
    if(!title || !uid) {
        res.status(401).send({ success: false, message: 'Not a valid request'})
        return;
    }
    const newTask = {
        title,
        uid,
        done: false,
        createdAt: FieldValue.serverTimestamp(),
    }
    await coll.add(newTask);
    getTasks(req,res);
}


//Updates Taks
export async function updateTask(req,res) {
    const { done, uid } = req.body;

    if(!uid) {
        res.status(401).send({sucess: false, message:"Not a valid request"});
        return;
    }

    const updates = {
        done,
        updatedAt: FieldValue.serverTimestamp()
    }

    await coll.doc(id).update(updates);

    getTasks(req, res);
}


