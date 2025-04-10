import React from "react";
import { updateDoc,collection,doc,deleteDoc } from "firebase/firestore";
import { db,auth } from "../firebase";
export default function Taskcard({title,completed,})
{
    const user=auth.currentUser
    const handleDone = async() =>{
        await updateDoc(doc(db, 'Users', user.uid, 'tasks', title), {"completed":!completed})
        .then(() => {
        })
        .catch((error) => {
          console.error("Error writing document:", error);
        });
    }
    const handleDelete = async() =>{
        await deleteDoc(doc(db, 'Users', user.uid, 'tasks', title))
        .then(() => {
          })
          .catch((error) => {
            console.error('Error deleting document: ', error);
        });
    }
    return(
        <div>
            <p>{title}</p>
            <p>Completed: {completed? "True" : "False"}</p>
            <button onClick={handleDone}>{completed? "Undo" : "Done"}</button>
            <button onClick={handleDelete}>Delete Task</button>
        </div>
    )
}