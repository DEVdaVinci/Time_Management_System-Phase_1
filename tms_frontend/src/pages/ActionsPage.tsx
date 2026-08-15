import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskRow from '../ui_components/TaskRow';



export default function ActionsPage() {
    const [actions, setActions] = useState([])
    
    useEffect(() => {
        console.log("[ActionsPage->UseEfect()]")
        

        const hostName: string = import.meta.env.VITE_BACKEND_HOST
        const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
        const url:string = "http://" + hostName + ":" + portNumber.toString() + "/api/actions/"

        console.log(`fetching: \"${url}\" ...`);
        //fetch(url).then((response) => { return response.json() }).then((data)=> {setActions(data)});
        axios.get(url).then((response) => {setActions(response.data);});

        
       
    }, []);
    

    
    return (
        <>
            
            <div className="card">
                <div className="card-header">
                    ActionsPage
                </div>
                <div className="card-body">
                    {actions.map((Action) => (
                        <TaskRow id={Action.id.toString()} title={Action.name} description={Action.description} completed={false} starred={true} onEdit={(id) => {console.log(`onEdit(id=${id})...`)}} onDelete={(id) => {console.log(`onDelete(id=${id})...`)}}/>
                    ))}
                    <a href="/" className="btn btn-primary">Home</a>
                </div>
            </div>
            <div></div>
                    
        </>

    )
}
