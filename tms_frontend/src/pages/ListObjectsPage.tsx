import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskRow from '../ui_components/TaskRow';

type ObjectsPageProps = {
  model_name: string;
};

export default function ObjectsPage({model_name}:ObjectsPageProps) {
    const [objects, setObjects] = useState([])
    
    useEffect(() => {
        console.log("[ObjectsPage->UseEfect()]")
        

        const hostName: string = import.meta.env.VITE_BACKEND_HOST
        const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
        const url:string = `http://${hostName}:${portNumber.toString()}/api/${model_name}/`

        console.log(`fetching: \"${url}\" ...`);
        //fetch(url).then((response) => { return response.json() }).then((data)=> {setObjects(data)});
        axios.get(url).then((response) => {setObjects(response.data);});

        
       
    }, []);
    

    
    return (
        <>
            
            <div className="card">
                <div className="card-header">
                    ObjectsPage
                </div>
                <div className="card-body">
                    {objects.map((object) => (
                        <TaskRow id={object.id.toString()} title={object.name} description={object.description} selected={false}/>
                    ))}
                    <a href="/" className="btn btn-primary">Home</a>
                </div>
            </div>
            <div></div>
                    
        </>

    )
}
