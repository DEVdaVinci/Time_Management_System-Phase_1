import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useNavigate } from "react-router";

import { models } from "./models";



type CreatePageProps = {
  model_name: string;
};



function snakeCase2Traditional(text: string)
{
    
    let words:string[] = text.split("_")
    
    
    let traditional:string = words.map((word)=> {
        let firstLetter:string = word.charAt(0).toUpperCase()
        let word_body:string = word.length>2 ? word.substring(1) : ""
        let newWord:string = firstLetter + word_body
        console.log(`newWord: ${newWord}`)
        return newWord + " "
        
    }).join().trimEnd()

    return traditional
}

export default function CreatePage({model_name}:CreatePageProps) {

    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("[CreatePage->UseEfect()]")

        modelInfo = models.tag
        
        const hostName: string = import.meta.env.VITE_BACKEND_HOST
        const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
        const url:string = `http://${hostName}:${portNumber.toString()}/api/${model_name}/`



        const payload:modelInfo.modelClass = {name: "react create test#1",    description: "This tag was created rom the frontend. Made with test create page. Payload/data was a manually created dictionary",};

        console.log(`creating: \"${url}\" ...`);
        //fetch(url).then((response) => { return response.json() }).then((data)=> {setObjects(data)});        
        axios.post(url, payload).then((response) => {console.log(response);});

        navigate("");
        
       
    }, []);
    

    
    return (
        <>
            
            <div className="card">
                <div className="card-header">
                    Create {snakeCase2Traditional(model_name)} Page (Test)
                </div>
                <div className="card-body">
                    
                </div>
            </div>
            
                    
        </>

    )
}
