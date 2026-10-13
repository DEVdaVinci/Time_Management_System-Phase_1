
import { type FormConfig, } from "../utils/models";
import type { UserLogin, UserRegistration } from "../utils/models";
import FormField from "./FormField";

type CreateFormProps = {
    form: FormConfig;
    handleChange: (feildName:string, value:string) => void;
    handleSubmit: () => void;
    object: UserLogin | UserRegistration;
}

export default function CreateModelForm({form, handleChange, handleSubmit, object}:CreateFormProps) {
    

  return (
    <form onSubmit={handleSubmit}>
        {form.feilds.map((field) => (

            

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
