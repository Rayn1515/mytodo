import {useState} from "react"
import {auth} from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
export default function Login(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate()
    const user=auth.currentUser
    console.log(user)
        useEffect(() => {
            if (user !== null) {
            navigate('/Home');  
            }
        }, )
    const onSubmit = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            navigate('/Home')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert("No such account exists. Consider Signing Up")
        });

    }
    const onChange = () => {
        navigate('/Signup')
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
        <button onClick={onChange}>Sign Up</button>
        </>
    )
}