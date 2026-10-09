import React, { useState } from 'react'
import type { FieldWidget, ModelNames } from "../utils/models";

type FieldWidgetProps = {
    field: FieldWidget;
    objects?: any[];
    defaultValue?: any | any[];
    object: any;
}
export default function FieldWidget({field, objects, object, defaultValue}: FieldWidgetProps) {
    const connectionObjects = objects ? objects : []
    
    if (field.kind == "text" || field.kind == "text_area" || field.kind == "number" || field.kind == "integer" || field.kind == "checkbox") {
        return (
            <div className="card my-3">
                <h5 className="card-header">{field.name}</h5>
                <div className="card-body">
                    <p className="card-text">{String(object[field.name])}</p>
                </div>
            </div>
            
        );
    }
    else if (field.kind == "connection" && field.multiple == true && field.connection) {
        if(field.name == "superior" || field.name == "superiors_additional")
        {
            if(object["is_root"])
            {
                if(object["is_root"] == true || object["is_root"] == "true")
                {
                    return <></>
                }
            }
        }
        const matchedConnObjs = connectionObjects.filter(obj => object[field.name].includes(obj.id));
        return (
            <>
            <div className="card my-3">
                <h5 className="card-header">{field.name}</h5>
                <div className="card-body">
                    {
                    matchedConnObjs.length > 0 
                    ?
                    matchedConnObjs.map((connectionObject)=>(
                    
                        <div className="accordion" id="accordionExample">
                        {
                            Object.entries(connectionObject).map(([key, value]) => (
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        {key}
                                    </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>{String(value)}</strong>
                                        </div>
                                    </div>
                                </div>
                            ))     
                        }
                        </div>

                    ))
                    :
                    <>
                        <div>No objects found for {field.name}!!!!!</div>
                    </>
                
                }
                    
                </div>
            </div>

           
            </>
        );
    }
    else if (field.kind == "connection" && field.multiple == false && field.connection) {
        if(field.name == "superior" || field.name == "superiors_additional")
        {
            if(object["is_root"])
            {
                if(object["is_root"] == true || object["is_root"] == "true")
                {
                    return <></>
                }
            }
        }
        const matchedConnObj = connectionObjects.find(obj => obj.id == object[field.name]);
        return (
            <>
            <div className="card my-3">
                <h5 className="card-header">{field.name}</h5>
                <div className="card-body">
                    <p className="card-text">{String(object[field.name])}</p>
                    
                    <div className="accordion" id="accordionExample">
                        
                        
                        
                    </div>
                    
                    {
                        matchedConnObj ?
                        Object.entries(matchedConnObj).map(([key, value]) => (
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    {key}
                                </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>{String(value)}</strong>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <>
                        </>
                        
                            
                        }
                </div>
            </div>

           
            </>
        );
    }
}
