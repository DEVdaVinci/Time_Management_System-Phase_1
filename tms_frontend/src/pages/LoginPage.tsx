import React, { useState} from 'react'
import axios from 'axios'

import { useNavigate } from "react-router";

import type { ModelNames, UserLogin } from '../utils/models';
import { LoginForm } from '../utils/models';
import CreateModelForm from '../ui_components/CreateModelForm';
import CreateForm from '../ui_components/CreateForm';





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



async function login(payload: UserLogin) {
    console.log("[CreateObjectsPageTest.tsx -> login()]")
    const hostName: string = import.meta.env.VITE_BACKEND_HOST
    const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url:string = `http://${hostName}:${portNumber.toString()}/login`//!!!!!!!!!!!!!!!!!!!!!!!!!

    


    
    console.log(`creating: \"${url}\" ...`);
    //fetch(url).then((response) => { return response.json() }).then((data)=> {setObjects(data)});        
    axios.post(url, payload).then((response) => {console.log(response);});

    
}



export default function LoginPage() {

    const navigate = useNavigate();
    
    const [values, setValues] = useState<UserLogin>({})
    
    

    async function handleSubmit()
    {
        console.log("[CreateObjectsPageTest.tsx -> handleSubmit()]")
        await login(values);

        navigate("/");
    }

    function onChange(fieldName: string, value:any)
    {

        console.log(`[CreateObjectsPageTest.tsx -> onChange(): ${fieldName}]`)
        setValues((previousValues: UserLogin) => (
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
                    Log-In Page (Test)
                </div>
                <div className="card-body">
                    <CreateForm form={LoginForm} handleChange={onChange} handleSubmit={handleSubmit}/>
                </div>
                
            </div>
            
                    
        </>

    )
}
