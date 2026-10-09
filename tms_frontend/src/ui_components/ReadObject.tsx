import React, { useEffect, useState } from 'react'

import { models, type FormConfig, type FormBaseField, type ModelNames, type UpdateRequest } from "../utils/models";
import type { ListResponse } from "../utils/models";
import { listRequest } from "../utils/apiRequests";
import FormField from "./FormField";
import FieldWidget from './FieldWidget';


type ReadObjectProps<M extends ModelNames> = {
    model_name: M;
    form: FormConfig;
    object?: UpdateRequest<M>;
}

export default function ReadObject<M extends ModelNames>({model_name, form, object}:ReadObjectProps<M>) {
    const [connectionObjects, setConnectionObjects] = useState<Partial<Record<ModelNames, any[]>>>({})


    useEffect(() => {
        console.log(`[ReadObject -> useEffect()] START`)
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
                console.log(`\t[ReadObject -> useEffect() -> targetModels.forEach()] number of objects retrieved: ${data.length}\tdata: ${data}`)
                if(data.length > 0)
                {
                    console.log(`\t[ReadObject -> useEffect() -> targetModels.forEach()] targetModel: ${targetModel}\tfirst objects name: ${data.at(0).name}\tdata[0]: ${data.at(0)}`)
                }
                
            });
            
            
        })
        

        console.log(`[ReadObject -> useEffect()] END`)

    
    }, [])
    

  return (
    <>
        {form.feilds.map((field) => (

            

            field.connection ? 
            <FieldWidget key={field.name+"_formField"} field={field} objects={connectionObjects[field.connection!]} object={object} />
            :
            <FieldWidget key={field.name+"_formField"} field={field} object={object}/>

            
        ))}

        <button
            type="submit"
            className="btn btn-primary"
        >
            Submit
        </button>
        
    </>

  )
}
