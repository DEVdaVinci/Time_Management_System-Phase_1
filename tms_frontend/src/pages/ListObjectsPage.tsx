import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskRow from '../ui_components/TaskRow';
import { models, type ListResponse, type ModelInfo, type ModelNames, type ModelTypes } from '../utils/models';
import type React from 'react';
import { useNavigate } from "react-router";

type ObjectsPageProps<M extends ModelNames> = {
  model_name: M;
};

function snakeCase2Traditional(text: string)
{
    const [, setTraditional] = useState("")
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

export default function ObjectsPage<M extends ModelNames>({model_name}:ObjectsPageProps<M>) {
    const [objects, setObjects] = useState<ListResponse<M>[]>([])
    const modelInfo:ModelInfo = models[model_name];

    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("[ObjectsPage->UseEfect()]")
        

        const hostName: string = import.meta.env.VITE_BACKEND_HOST
        const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
        const url:string = `http://${hostName}:${portNumber.toString()}/${modelInfo.APIs.list}`

        console.log(`fetching: \"${url}\" ...`);
        //fetch(url).then((response) => { return response.json() }).then((data)=> {setObjects(data)});
        axios.get(url).then((response) => {setObjects(response.data);});

        
       
    }, []);
    

    
    return (
        <>
            
            <div className="card">
                <div className="card-header">
                    {snakeCase2Traditional(model_name)} Page
                </div>
                <div className="card-body">
                    {objects.map((object) => (
                        <TaskRow id={object.id.toString()} title={object.name} description={object.description} onEdit={navigate(`edit/${model_name}`)} onDelete={navigate(`delete/${model_name}`)}/>
                    ))}
                    <a href="/" className="btn btn-primary">Home</a>
                </div>
            </div>
            <div>
                <a className="btn btn-secondary p-3" href={`create/${model_name}/`} role="button"><i className="bi bi-plus-lg"></i></a>
            </div>
                    
        </>

    )
}
