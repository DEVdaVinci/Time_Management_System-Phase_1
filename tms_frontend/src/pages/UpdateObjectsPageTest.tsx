import React, { useState, useEffect } from 'react'
import axios from "../utils/axiosConfig";

import { useNavigate } from "react-router";

import type { ModelNames, ModelTypes, ModelInfo, UpdateRequest, Category_Write_List } from '../utils/models';
import { models } from '../utils/models';
import CreateModelForm from '../ui_components/CreateModelForm';
import { updateRequest, readRequest } from '../utils/apiRequests';


type UpdatePageProps<M extends ModelNames> = {
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


function createPayload_test<M extends ModelNames>(payload: UpdateRequest<M>)
{
    return payload;
}

async function updateObject<M extends ModelNames>(modelName: M, payload: UpdateRequest<M>, modelInfo:ModelInfo) {
    console.log("[UpdateObjectsPageTest.tsx -> updateObject()]")
    
    updateRequest(modelName, payload, modelInfo).then((data) => {console.log(`output of update request: ${data}`)})
    
}



export default function UpdatePage<M extends ModelNames>({model_name, id}:UpdatePageProps<M>) {

    const navigate = useNavigate();
    
    const [values, setValues] = useState<UpdateRequest<M>>({})
    const modelInfo:ModelInfo = models[model_name];
   
    
    useEffect(() => {
        console.log("[UpdatePage->UseEfect()] START")

        
        readRequest(model_name, id, modelInfo).then((data) => {setValues(data)})

        
        
        
        console.log("[UpdatePage->UseEfect()]")
       
    }, []);

    async function handleSubmit()
    {
        console.log("[UpdateObjectsPageTest.tsx -> handleSubmit()]")
        const payload = createPayload_test(values);
        console.log(`Payload: ${payload}`)
        await updateObject(model_name, payload, modelInfo);

        navigate("/");
    }

    function onChange(fieldName: string, value:any)
    {

        console.log(`[UpdateObjectsPageTest.tsx -> onChange(): ${fieldName}]`)
        setValues((previousValues: UpdateRequest<M>) => (
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
                    Update {snakeCase2Traditional(model_name)} Page (Test)
                </div>
                <div className="card-body">
                    <CreateModelForm form={modelInfo.formConfig} model_name={model_name} handleChange={onChange} handleSubmit={handleSubmit} object={values}/>
                </div>
                
            </div>
            
                    
        </>

    )
}
