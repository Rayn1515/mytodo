import { useState } from "react"
import { doc, setDoc,getDocs,collection } from "firebase/firestore"
import { auth,db } from "../firebase"

export default function AddTask()
{
    const user=auth.currentUser
    const [task,setTask]=useState('')

    const fetchTasks = async () => {
        if (!user) return;
  
        try {
          const tasksRef = collection(db, 'Users', user.uid, 'tasks');
          const snapshot = await getDocs(tasksRef);
  
          const tasksData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          console.log(tasksData);
        } catch (err) {
          console.error('Error fetching tasks:', err);
        }
    }
    const onSubmit= async (e)=>
    {
        e.preventDefault()
        await setDoc(doc(db, 'Users',user.uid,"tasks",task),{task: task , completed: false})
        .then(setTask(""))
        .catch((error)=>
            alert("Error")
        )

    }
    return(
        <form>
            <div>
                <label>Enter Task</label>
                <input
                    type="text"
                    value={task}
                    onChange={(e)=>setTask(e.target.value)}
                />
            </div>
            <button type="submit" onClick={onSubmit}>+ Add Task</button>

        </form>
    )

}