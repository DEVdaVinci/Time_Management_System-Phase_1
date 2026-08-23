const model_names = ["user", "account", "category", "tag", "action", "activity", "task"] as const;






interface API_Read {
    "single"?: string;
    "multiple"?: string;
}

interface ModelAPIs {
    "create"?: string;
    "read"?: API_Read;
    "update"?: string;
    "partial_update"?: string;
    "delete"?: string;
    list: string;
    detailBase: string;
    detail(detailBase:string, id:string): string;
}

function getDetailAPI(detailBase:string, id:string)
{
    return detailBase + id + "/";
}


export type ModelInfo = {
    model_name: string;
    plural_name: string;
    title: string;
    formConfig: FormConfig;
    APIs: ModelAPIs;
}




type FormBaseField = {
    kind: string,
    name: string;
    label_for: string;
    label_class: string;
    input_type: string;
    input_class: string;
    input_id: string;
}
type FormConnectionField = FormBaseField & {
    api: string;
    objects: [];
}
type FormField = FormBaseField | FormConnectionField;

type FormConfig = {
    feilds: FormField[];//an array of FormFields and FormConnectionField each element o the array van be either a FormField or a FormConnectionField
}















export interface BaseModel_Detail {
    id:string;
}

export interface BaseModel {
    name:string;
    description?:string;
}

export interface BaseModel_Write extends BaseModel {
    previous_version?:string;
}
export interface BaseModel_Read extends BaseModel {
    previous_version?: ShallowModel | string;
    date_created:string;
    date_updated:string;
    version_number_major:number;
    version_number_minor:number;
}





export interface BaseCategory {
    is_root: boolean;
}

export interface Category_Write_List extends BaseModel_Write, BaseCategory {
    superior?:string;
    superiors_additional?: string[];

}
export interface Category_Write_Detail extends BaseModel_Detail, Category_Write_List {}


export interface Category_Read extends BaseModel_Detail, BaseModel_Read, BaseCategory {
    superior?:Category_Write_Detail;
    superiors_additional?: Category_Write_Detail[];
}





export interface Tag_Write_List extends BaseModel_Write {
    superiors?:string[];
}
export interface Tag_Write_Detail extends BaseModel_Detail, Tag_Write_List {}


export interface Tag_Read extends BaseModel_Detail, BaseModel_Write {
    superiors?: Tag_Write_Detail[];
}







type ModelType<RC,RU,RS,RD> = {
    Request_create: RC;
    Request_update: RU;
    Read_shallow: RS;
    Read_deep: RD;
}



/*
const category: ModelType<Category_Write_List, Category_Write_Detail, Category_Write_Detail, Category_Read>
=
const category: {
    Request_create: Category_Write_List;
    Request_update: Category_Write_Detail;
    Read_shallow: Category_Write_Detail;
    Read_deep: Category_Read;
}



*/

/*

export type request<T keyof ModelType> =
  ModelType[T];


!!!!!!!!!!!
export type CreateRequest<T keyof ModelType> =
  ModelType[T];
!!!!!!!!!!!!

export type CreateRequest<T keyof ModelType> =
  ModelType[T];







export type ModelType<M extends ModelNames> =
  ModelTypes<M>;

export type CreateRequest<M extends ModelNames> =
  ModelTypes<M>["Request_create"];

  ModelTypes<M>["Request_create"] = type

  ModelTypes = 
    M
        "Request_create"
            Type

    M
        modelInfo = {
            ...
        }
*/
export interface ModelTypes<ModelNames> {
    "category": ModelType<Category_Write_List, Category_Write_Detail, Category_Write_Detail, Category_Read>,
    "tag": ModelType<Tag_Write_List, Tag_Write_Detail, Tag_Write_Detail, Tag_Read>,
    /*
    {
        Request_create: Category_Write_List,
        Request_update: Category_Write_Detail,
        Read_shallow: Category_Write_Detail,
        Read_deep: Category_Read,
    },
    "tag": {
        Request_create: Tag_Write_List,
        Request_update: Tag_Write_Detail,
        Read_shallow: Tag_Write_Detail,
        Read_deep: Tag_Read,
    },*/
}


export type ShallowModel = Category_Write_Detail | Tag_Write_Detail



export type ModelNames = (typeof model_names)[number];


export type ListResponse<M extends ModelNames> =
  ModelTypes<M>["Read_shallow"];

export type CreateRequest<M extends ModelNames> =
  ModelTypes<M>["Request_create"];

export type UpdateRequest<M extends ModelNames> =
  ModelTypes<M>["Request_update"];

export type DetailResponse<M extends ModelNames> =
  ModelTypes<M>["Read_deep"];


  /*


You need 5 base interfaces

Write
Read

List (this is unnecessary)
Detail

Request
Response


================
writing = Request + Create|Update = obj_shallow
reading = Response + List|Read = Obj_deep
---
list = {}
Detail = {id}
-----
    Request_Write_List = Create = {obj_shallow}
    Request_Write_Detail = Update = {id, obj_shallow}

    Response_Read = List, Read = {id, Obj_deep}
=====
Request + List, Read = {}
-
list = {}
Detail = {id}
---
    Request_Read_List = List = {}
    Request_Read_Detail = Read = {id}

    
Response + Create, Update, Delete = {}
---
    Response_Write_List = Create = {id}
    Response_Write_Detail = Update, Delete = {}
======================

CreateRequest = {obj_shallow}


UpdateRequest = {id, obj_shallow}
ListResponse, ReadResponse {id, obj_deep}



ListRequest = {}
ReadRequest, DeleteRequest, CreateResponse = {id}

UpdateResponse, DeleteResponse = {status}
*/





//I want this to be a dictionary of ModelInfo objects
//I was originally going to make this an array of dictionaries or ModelInfo objects but realized I want to access info via the model name not an index (i.e. number) and searching to ind a specific model name seems too cumbersome and inefficient
export const models:Record<ModelNames, ModelInfo> = {
    "category": {
        model_name: "category",
        plural_name: "categories",
        title: "Category",
        formConfig: 
            {
                feilds:
                    [
                        {
                            kind: "base",
                            name: "name",
                            label_for: "name",
                            label_class: "",
                            input_type: "text",
                            input_class: "form-control",
                            input_id: "name",
                        },
                        {
                            kind: "base",
                            name: "description",
                            label_for: "description",
                            label_class: "",
                            input_type: "text",
                            input_class: "form-control",
                            input_id: "description",
                        },
                    ]
            },
        APIs: {
            list: "api/categories/",
            detailBase: "api/categories/",
            detail: getDetailAPI,
        },
    },
    "tag": {
        model_name: "",
        plural_name: "",
        title: "",
        formConfig: 
            {
                feilds: 
                    [
                        {
                            kind: "base",
                            name: "name",
                            label_for: "name",
                            label_class: "",
                            input_type: "text",
                            input_class: "form-control",
                            input_id: "name",
                        },
                        {
                            kind: "base",
                            name: "description",
                            label_for: "description",
                            label_class: "",
                            input_type: "text",
                            input_class: "form-control",
                            input_id: "description",
                        },
                    ]
            },
        APIs: {
            list: "api/tags/",
            detailBase: "api/tags/",
            detail: getDetailAPI,
        },
    },
}

