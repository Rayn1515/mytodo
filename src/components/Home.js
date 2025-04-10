import AddTask from "./AddTask";
import Task from "./Task";
import { useNavigate } from 'react-router-dom'
import { auth } from "../firebase"
import { useEffect } from 'react';
import { signOut } from "firebase/auth";

export default function Home(){
    const navigate=useNavigate()
    const user=auth.currentUser
    useEffect(() => {
        if (user === null) {
        navigate('/Login');  
        }
    }, )
    const handleLogout = async () => {
        try {
          // Sign out the user from Firebase
          await signOut(auth);
          console.log('User logged out');
    
          // After logging out, redirect to the login page
          navigate('/Login');
        } catch (error) {
          console.error('Error logging out: ', error);
        }
    }
    return(
        <>
            <nav><button onClick={handleLogout}>Log out</button></nav>
            <AddTask/>
            <Task />
        </>
        
    )
}