import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {Button} from '../components/Button'
import {BottomWarning} from '../components/BottomWarning.jsx'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  axios  from 'axios'

export function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongInput, setWrongInput] = useState(false)
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate()
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label= {"Sign in"} />
                <SubHeading label={"Enter your information"}/>      
                <InputBox onChange={e => {
                    setFirstName(e.target.value)
                }} placeholder={"John"} label={"First Name"} />         
                <InputBox onChange={e => {
                    setLastName(e.target.value)
                }} placeholder={"Doe"} label={"Last Name"} />         
                <InputBox onChange={e => {
                    setEmail(e.target.value)
                }} placeholder={"john@gmail.com"} label={"Email"} />         
                <InputBox onChange={e => {
                    setPassword(e.target.value)
                }} placeholder={"1234"} label={"Password"} />         
                {wrongInput && 
                    <div className='text-red-500 mt-1'>
                        {alertMessage}
                    </div>
                }
                
                <div className="pt-4">
                    <Button onClick={async () => {
                        try{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                email,
                                firstName,  
                                lastName, 
                                password
                            })
                            
                            localStorage.setItem("token", response.data.token)
                            navigate('/dashboard')
                        }
                        catch(err){
                            console.error(err);
                            setWrongInput(true);

                            if (axios.isAxiosError(err)) {
                                const msg = err.response?.data?.msg;

                                if (msg === "Invalid Inputs !") {
                                    setAlertMessage("Please use a stronger password !");
                                } else if (msg === "Email already exists") {
                                    setAlertMessage("Email already exists");
                                } else {
                                    setAlertMessage("Something went wrong.");
                                }
                            } else {
                                setAlertMessage("Unexpected error occurred.");
                            }
                        }

                    }} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account ?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>

    </div>
}