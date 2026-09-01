import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useNavigate } from "react-router";

import type { ModelNames, ModelTypes, ModelInfo, CreateRequest, Category_Write_List } from '../utils/models';
import { models } from '../utils/models';
import CreateForm from '../ui_components/CreateForm';


type CreatePageProps<M extends ModelNames> = {
  model_name: M;
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


function createPayload_test<M extends ModelNames>(payload: CreateRequest<M>)
{
    return payload;
}

async function createObject<M extends ModelNames>(modelName: M, payload: CreateRequest<M>, modelInfo:ModelInfo) {
    console.log("[CreateObjectsPageTest.tsx -> createObject()]")
    const hostName: string = import.meta.env.VITE_BACKEND_HOST
    const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url:string = `http://${hostName}:${portNumber.toString()}/${modelInfo.APIs.list}`

    


    
    console.log(`creating: \"${url}\" ...`);
    //fetch(url).then((response) => { return response.json() }).then((data)=> {setObjects(data)});        
    axios.post(url, payload).then((response) => {console.log(response);});

    
}



export default function CreatePage<M extends ModelNames>({model_name}:CreatePageProps<M>) {

    const navigate = useNavigate();
    
    const [values, setValues] = useState<CreateRequest<M>>({})
    const modelInfo:ModelInfo = models[model_name];
   
    
    useEffect(() => {
        console.log("[CreatePage->UseEfect()] START")

        

        
        setValues({name: "react create test#6 IF YOU ARE READING THIS THE TEST FAILED!!!!!!",    description: `IF YOU ARE READING THIS THE TEST FAILED!!!!!! This ${model_name} was created from the frontend. Made with test create page. Payload/data was suposed to be user created using the form. I developed and implimented the model registry (i.e. ModelInfo and ModelTypes) IF YOU ARE READING THIS THE TEST FAILED!!!!!!`,});


        
        
        
        console.log("[CreatePage->UseEfect()]")
       
    }, []);

    async function handleSubmit()
    {
        console.log("[CreateObjectsPageTest.tsx -> handleSubmit()]")
        const payload = createPayload_test(values);
        console.log(`Payload: ${payload}`)
        await createObject(model_name, payload, modelInfo);

        navigate("/");
    }

    function onChange(fieldName: string, value:any)
    {

        console.log(`[CreateObjectsPageTest.tsx -> onChange(): ${fieldName}]`)
        setValues((previousValues: CreateRequest<M>) => (
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
                    Create {snakeCase2Traditional(model_name)} Page (Test)
                </div>
                <div className="card-body">
                    <CreateForm form={modelInfo.formConfig} model_name={model_name} handleChange={onChange} handleSubmit={handleSubmit}/>
                </div>
                
            </div>
            
                    
        </>

    )
}
