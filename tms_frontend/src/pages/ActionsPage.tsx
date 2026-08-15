import React, { useState, useEffect } from 'react'
import axios from 'axios'



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
                        <div key={Action.id} className='p-1'>
                            <button type="button" className="btn btn-secondary">
                                {Action.name}
                            </button>
                            <button type="button" className="btn btn-outline-secondary">Edit</button>
                            <button type="button" className="btn btn-outline-secondary">Delete</button>
                        </div>
                    ))}
                    <a href="/" className="btn btn-primary">Home</a>
                </div>
            </div>
            <div></div>
                    
        </>

    )
}
