import {useState, useEffect} from "react"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import {auth,db} from "../firebase"
import { useNavigate } from 'react-router-dom'

export default function Signup(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate()
    const user=auth.currentUser
    useEffect(() => {
                if (user !== null) {
                navigate('/Home');  
                }
            }, )

    const onSubmit = async (e) => {
        e.preventDefault()
        await createUserWithEmailAndPassword(auth,email,password)
        .then(
            onAuthStateChanged(auth,()=>navigate('/Home'))
        )
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert("Account already exists, consider Logging in")
        });

    }

    const onChange = () =>{
        navigate('/Login')
    }

    return(
        <>
        <form>
            <div>
                <label>
                    Enter Email
                </label>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>
                    Enter Password
                </label>
                <input
                    type="password"
                    value={password}
                    placeholder="Enter password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <button type="submit" onClick={onSubmit}>Submit</button>
        </form>
        <button onClick={onChange}>Login</button>
        </>

    )
}