import { auth,db } from "../firebase"
import { doc, getDocs, collection } from "firebase/firestore"

import { useEffect, useState } from "react"
import Taskcard from "./Taskcard"
export default function Task()
{
    const user=auth.currentUser
    const [taskList,setTaskList]=useState([])
    
    useEffect(()=>{const fetchTasks = async() => {
        if (!user) return;
  
        try {
          const tasksRef = collection(db, 'Users', user.uid, 'tasks');
          const snapshot = await getDocs(tasksRef);
  
          const tasksData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTaskList(tasksData)
        } catch (err) {
          console.error('Error fetching tasks:', err);
        }
    };
    fetchTasks()},[user,taskList])
    return(
        <>

            {taskList.length > 0? taskList.map((task)=> (<Taskcard title={task.task} completed={task.completed} />)):<p>No Tasks to do</p>}
        </>
    )
}

