import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {Button} from '../components/Button'
import {BottomWarning} from '../components/BottomWarning.jsx'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  axios  from 'axios'
import { jwtDecode } from 'jwt-decode'
export function Sigin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongInput, setWrongInput] = useState(false)
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{ 
        const token = localStorage.getItem("token")
        if(token){
            try{
                const decoded = jwtDecode(token);
                if(decoded.email){
                    setEmail(decoded.email);
                }
                navigate('/dashboard')
            }
            catch(e){
                console.error(e);
            }
        }
    },[])
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label= {"Sign in"} />
                <SubHeading label={"Enter your information"}/>  
                <InputBox onChange={(e)=>{
                    setEmail(e.target.value)
                }} placeholder={"john@gmail.com"} label={"Email"} />         
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value)
                }} placeholder={"1234"} label={"Password"} />   
                {!wrongInput && 
                    <div className='text-red-500 mt-1'>
                        {alertMessage}
                    </div>
                }
                <div className="pt-4">
                    <Button label={"Sign in"} onClick={ async()=>{
                        try{
                            const response = await axios.post("http://localhost:3000/api/v1/user/login", {
                                email,
                                password
                            })
                            
                            console.log("Request sent")
                            // console.log(response)
                            localStorage.setItem("token", response.data.token)
                            
                            console.log(localStorage.getItem("token"))
                            navigate('/dashboard')
                        }catch(err){
                            console.error("Login failed:", err.response?.status, err.response?.data);
                            // alert("Invalid email or password");
                            setAlertMessage("Invalid email or password")
                            if(response.status == 411){
                                setAlertMessage("Internal Server Error")
                            }
                        }       
                    }
                    }  />
                </div>
                <BottomWarning label={"Already have an account ?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>

    </div>

}