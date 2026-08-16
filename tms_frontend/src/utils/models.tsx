
type ModelInfo = {
    model_name: string;
    plural_name: string;
    title: string;
    modelClass: type;
    model: Category | Tag;
    formConfig: FormConfig;

}

type FormField = {
    name: string;
    api: string;
    objects: [];
    label_for: string;
    label_class: string;
    input_type: string;
    input_class: string;
    input_id: string;
}
type FormConnectionField = {
    name: string;
    api: string;
    objects: [];
    label_for: string;
    label_class: string;
    input_type: string;
    input_class: string;
    input_id: string;
}
type FormConfig = {
    feilds: (FormField | FormConnectionField)[];//an array of FormFields and FormConnectionField each element o the array van be either a FormField or a FormConnectionField
}


export type Category = {
    id:string;
    name:string;
    description:string;
    previous_version:string;
    version_number_major:number;
    version_number_minor:number;
    superiors:string;
    date_created:string;
    date_updated:string;
}

export type Tag = {
    id:string;
    name:string;
    description:string;
    previous_version:string;
    version_number_major:number;
    version_number_minor:number;
    superiors:string;
    date_created:string;
    date_updated:string;
}


//I want this to be a dictionary of ModelInfo objects
//I was originally going to make this an array of dictionaries or ModelInfo objects but realized I want to access info via the model name not an index (i.e. number) and searching to ind a specific model name seems too cumbersome and inefficient
export const models = {
    "category": {
        model_name: "",
        plural_name: "",
        title: "",
        modelClass: Category,
        model: {}:Category,
        formConfig = [],
    },
    "category": {
        model_name: "",
        plural_name: "",
        title: "",
        modelClass: Tag,
        model: Tag(),
        formConfig = [],
    },
}