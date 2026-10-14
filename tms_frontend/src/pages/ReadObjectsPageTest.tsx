import React, { useState, useEffect } from 'react'
import axios from "../utils/axiosConfig";

import { useNavigate } from "react-router";

import type { ModelNames, ModelTypes, ModelInfo, ReadResponse, Category_Write_List } from '../utils/models';
import { models } from '../utils/models';
import { updateRequest, readRequest } from '../utils/apiRequests';
import ReadObject from '../ui_components/ReadObject';


type ReadPageProps<M extends ModelNames> = {
  model_name: M;
  id:string;
};



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





export default function ReadPage<M extends ModelNames>({model_name, id}:ReadPageProps<M>) {

    const navigate = useNavigate();
    
    const [values, setValues] = useState<ReadResponse<M>>({})
    const modelInfo:ModelInfo = models[model_name];
   
    
    useEffect(() => {
        console.log("[ReadPage->UseEfect()] START")

        
        readRequest(model_name, id, modelInfo).then((data) => {setValues(data)})

        
        
        
        console.log("[ReadPage->UseEfect()]")
       
    }, []);


    
    return (
        <>
            
            <div className="card">
                <div className="card-header">
                    Read {snakeCase2Traditional(model_name)} Page (Test)
                </div>
                <div className="card-body">
                    <ReadObject form={modelInfo.formConfig} model_name={model_name} object={values}/>
                </div>
                
            </div>
            
                    
        </>

    )
}
