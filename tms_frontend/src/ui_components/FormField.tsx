import React, { useState } from 'react'
import type { FormField, ModelNames } from "../utils/models";

type FormFieldProps = {
    field: FormField;
    objects?: any[];
    handleChange: (feildName:string, value:any) => void;
    defaultValue?: any | any[];
    object: any;
}
export default function FormField({field, objects, handleChange, object, defaultValue}: FormFieldProps) {
    const connectionObjects = objects ? objects : []
    
    if (field.kind == "text") {
        return (
            <div>
                <label htmlFor={field.input_id ?? field.name}>{field.name}</label>
                <input
                    name={field.name}
                    type="text"
                    className={field.input_class ?? "form-control"}
                    id={field.input_id ?? field.name}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                    value={object[field.name]}
                />
            </div>
        );
    }
    else if (field.kind == "text_area") {
        return (
            <div>
                <label htmlFor={field.input_id ?? field.name}>{field.name}</label>
                <textarea 
                    className={field.input_class ?? "form-control"}
                    id={field.input_id ?? field.name}
                    rows={field.rows ?? 3}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                    value={object[field.name]}
                />
            </div>
        );
    }
    else if (field.kind == "number" || field.kind == "integer") {
        return (
            <div>
                <label htmlFor={field.input_id ?? field.name}>{field.name}</label>
                <input
                    type="number"
                    className={field.input_class ?? "form-control"}
                    id={field.input_id ?? field.name}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                    value={object[field.name]}
                />
            </div>
        );
    }
    else if (field.kind == "checkbox") {
        return (
            <div>
                <label className="form-check-label" htmlFor={field.input_id ?? field.name}>{field.name}</label>
                <input
                    type="checkbox"
                    className={field.input_class ?? "form-check-input"}
                    id={field.input_id ?? field.name}
                    onChange={(event) => handleChange(field.name, event.target.checked)}
                    checked={object[field.name]}
                />
            </div>
        );
    }
    else if (field.kind == "connection" && field.multiple == true && field.connection) {
        return (
            <div>
                <label htmlFor={field.input_id ?? field.name}>{field.name}</label>
                <select multiple 
                    value={object[field.name]}
                    className={field.input_class ?? "form-control"}
                    id={field.input_id ?? field.name}
                    onChange={(event) => 
                    {
                        const selectedOptions = Array.from(event.target.selectedOptions, option=>option.value)
                    
                        handleChange(field.name, selectedOptions)
                    }
                }
                >
                    
                    
                        {connectionObjects.map((object) =>(
                            <option value={object.id}>{object.name + ` (v${object.version_number_major}.${object.version_number_minor})`}</option>
                        ))}
                    
                </select>
            </div>
        );
    }
    else if (field.kind == "connection" && field.multiple == false && field.connection) {
        return (
            <div>
                <label htmlFor={field.input_id ?? field.name}>{field.name}</label>
                <select 
                    value={object[field.name]}
                    className={field.input_class ?? "form-control"}
                    id={field.input_id ?? field.name}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                >
                    
                    
                        {connectionObjects.map((object) =>(
                            <option value={object.id}>{object.name + ` (v${object.version_number_major}.${object.version_number_minor})`}</option>
                        ))}
                    
                </select>
            </div>
        );
    }
}
