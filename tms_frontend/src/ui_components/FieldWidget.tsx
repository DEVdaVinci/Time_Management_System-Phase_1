import React, { useState } from 'react'
import type { FieldWidget, ModelNames } from "../utils/models";

type FieldWidgetProps = {
    field: FieldWidget;
    objects?: any[];
    handleChange: (feildName:string, value:string) => void;
    defaultValue?: any | any[];
    object: any;
}
export default function FieldWidget({field, objects, handleChange, object, defaultValue}: FieldWidgetProps) {
    const connectionObjects = objects ? objects : []
    
    if (field.kind == "text" || field.kind == "text_area" || field.kind == "number" || field.kind == "integer" || field.kind == "checkbox") {
        return (
            <div className="card">
                <h5 className="card-header">{field.name}</h5>
                <div className="card-body">
                    <p className="card-text">{object[field.name]}</p>
                </div>
            </div>
            
        );
    }
    else if (field.kind == "connection" && field.multiple == true && field.connection) {
        return (
            <>
            <div className="card">
                <h5 className="card-header">{field.name}</h5>
                <div className="card-body">
                    {connectionObjects.filter(obj => object[field.name].includes(obj.id)).map((connectionObject)=>(
                    
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

                    ))}
                    
                </div>
            </div>

           
            </>
        );
    }
    else if (field.kind == "connection" && field.multiple == false && field.connection) {
        return (
            <>
            <div className="card">
                <h5 className="card-header">{field.name}</h5>
                <div className="card-body">
                    <p className="card-text">{object[field.name]}</p>
                    <div className="accordion" id="accordionExample">
                        
                        
                        
                    </div>
                    
                    {
                        Object.entries(connectionObjects.find(obj => obj.id == object[field.name])).map(([key, value]) => (
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
            </div>

           
            </>
        );
    }
}
