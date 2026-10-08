import React, { useEffect, useState } from 'react'

import { models, type FormConfig, type FormBaseField, type ModelNames, type UpdateRequest } from "../utils/models";
import type { ListResponse } from "../utils/models";
import { listRequest } from "../utils/apiRequests";
import FormField from "./FormField";

type CreateFormProps<M extends ModelNames> = {
    model_name: M;
    form: FormConfig;
    handleChange: (feildName:string, value:string) => void;
    handleSubmit: () => void;
    object?: UpdateRequest<M>;
}

export default function CreateForm<M extends ModelNames>({model_name, form, handleChange, handleSubmit, object}:CreateFormProps<M>) {
    const [connectionObjects, setConnectionObjects] = useState<Partial<Record<ModelNames, any[]>>>({})


    useEffect(() => {
        console.log(`[CreateForm -> useEffect()] START`)
        let targetModels = new Set<ModelNames>()
        form.feilds.forEach((field) => {
            if(field.kind=="connection" && field.connection)
            {
                targetModels.add(field.connection)
            }
        })
        console.log(`-------------------------------------------------------------------------`)
        
        targetModels.forEach((targetModel) => {
            
            const connectionAPI = models[targetModel].APIs.list
            

            //make a call to the backend then store the data in a dictionary
            listRequest(connectionAPI, model_name).then((data) => {
                setConnectionObjects(previousObjects => (
                    {
                        ...previousObjects,
                        [targetModel]: data 
                    }
                ))
                console.log(`\t[CreateForm -> useEffect() -> targetModels.forEach()] number of objects retrieved: ${data.length}\tdata: ${data}`)
                if(data.length > 0)
                {
                    console.log(`\t[CreateForm -> useEffect() -> targetModels.forEach()] targetModel: ${targetModel}\tfirst objects name: ${data.at(0).name}\tdata[0]: ${data.at(0)}`)
                }
                
            });
            
            
        })
        

        console.log(`[CreateForm -> useEffect()] END`)

    
    }, [])
    

  return (
    <form onSubmit={handleSubmit}>
        {form.feilds.map((field) => (

            

            field.connection ? 
            <FormField key={field.name+"_formField"} field={field} objects={connectionObjects[field.connection!]} handleChange={handleChange} object={object} />
            :
            <FormField key={field.name+"_formField"} field={field} handleChange={handleChange} object={object}/>

            
        ))}

        <button
            type="submit"
            className="btn btn-primary"
        >
            Submit
        </button>
        
    </form>

  )
}
