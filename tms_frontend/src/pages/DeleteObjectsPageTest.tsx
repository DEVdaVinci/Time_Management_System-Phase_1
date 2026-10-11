import { useState, useEffect } from 'react'

import { useNavigate } from "react-router";

import type { ModelNames, ModelInfo, ReadResponse } from '../utils/models';
import { models } from '../utils/models';
import { deleteRequest, readRequest } from '../utils/apiRequests';


type DeletePageProps<M extends ModelNames> = {
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







export default function DeletePage<M extends ModelNames>({model_name, id}:DeletePageProps<M>) {

    const navigate = useNavigate();
    
    const [values, setValues] = useState<ReadResponse<M>>({})
    const modelInfo:ModelInfo = models[model_name];
   
    
    useEffect(() => {
        console.log("[DeletePage->UseEfect()] START")

        
        readRequest(model_name, id, modelInfo).then((data) => {setValues(data)})

        
        
        
        console.log("[DeletePage->UseEfect()]")
       
    }, []);

    async function deleteObject()
    {
        console.log("[DeleteObjectsPageTest.tsx -> deleteObject()]")
    
        const data = await deleteRequest(model_name, id, modelInfo)
        console.log(`output of delete request: ${data}`)

        navigate("/");
    }

    
    

    
    return (
        <>
            
            <div className="card">
                <div className="card-header">
                    Read {snakeCase2Traditional(model_name)} Page (Test)
                </div>
                <div className="card-body">


                    <div className="card">
                        <div className="card-header">
                            Are you sure you want to delete {String(values["name"])}?
                        </div>
                        <div className="card-body">

                            <button        type="button"        className="btn btn-sm btn-outline position-relative z-2"        onClick={() => navigate(-1)}      >
                                No
                            </button>
                            <button        type="button"        className="btn btn-sm btn-outline-danger position-relative z-2"        onClick={() => deleteObject()}      >
                                Yes
                            </button>
                            
                        </div>
                        
                    </div>

                    
                </div>
                
            </div>
            
                    
        </>

    )
}
