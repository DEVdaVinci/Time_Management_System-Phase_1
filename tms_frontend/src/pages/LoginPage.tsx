import React, { useState} from 'react'
import axios from "../utils/axiosConfig";

import { useNavigate } from "react-router";

import type { ModelNames, UserLogin, UserRegistration } from '../utils/models';
import { LoginForm, RegisterForm } from '../utils/models';
import CreateModelForm from '../ui_components/CreateModelForm';
import CreateForm from '../ui_components/CreateForm';


type LoginPageProps = 
{
    pageType: string;
}


function snakeCase2Traditional(text: string)
{
    
    let words:string[] = text.split("_")
    
    
    let traditional:string = words.map((word)=> {
        let firstLetter:string = word.charAt(0).toUpperCase()
        let word_body:string = word.length>2 ? word.substring(1) : ""
        let newWord:string = firstLetter + word_body
        return newWord + " "
        
    }).join().trimEnd()

    return traditional
}



async function login(payload: UserLogin | UserRegistration, pageType: string) {
    console.log("[CreateObjectsPageTest.tsx -> login()]")
    const hostName: string = import.meta.env.VITE_BACKEND_HOST
    const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url:string = `http://${hostName}:${portNumber.toString()}/api/${pageType}/`//!!!!!!!!!!!!!!!!!!!!!!!!!

    


    
    console.log(`creating: \"${url}\" ...`);
    //fetch(url).then((response) => { return response.json() }).then((data)=> {setObjects(data)});        
    return await axios.post(url, payload);

    
}



export default function LoginPage({pageType}: LoginPageProps) {

    const navigate = useNavigate();
    
    const [values, setValues] = useState<UserLogin | UserRegistration>({})
    
    

    async function handleSubmit()
    {
        console.log("[CreateObjectsPageTest.tsx -> handleSubmit()]")
        const result:any = await login(values, pageType);

        if(result.status === 200)
        {
            navigate("/home");
        }
    }

    function onChange(fieldName: string, value:any)
    {

        console.log(`[CreateObjectsPageTest.tsx -> onChange(): ${fieldName}]`)
        setValues((previousValues: UserLogin | UserRegistration) => (
            {
                ...previousValues,
                [fieldName]: value,
            }
        )
        );


        console.log(`values[fieldName]: ${values[fieldName]}`)
        console.log(`values: ${values}`)
        console.log(`values.keys: ${values.keys}`)
        

    }
    

    
    return (
        <>
            
            <div className="card">
                <div className="card-header">
                    {snakeCase2Traditional(pageType)} Page (Test)
                </div>
                <div className="card-body">
                    <CreateForm form={pageType == "login" ? LoginForm : RegisterForm} handleChange={onChange} handleSubmit={handleSubmit} object={values}/>
                </div>
                
            </div>
            
                    
        </>

    )
}
