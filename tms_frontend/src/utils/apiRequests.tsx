import axios from "../utils/axiosConfig";
import type { ListResponse, ModelInfo, ModelNames, UpdateRequest, CreateRequest, WriteResponse, ReadResponse } from '../utils/models';


export async function listRequest<M extends ModelNames>(API_Endpoint: string, model_name:M): Promise<ListResponse<M>[]> {
    const hostName: string = import.meta.env.VITE_BACKEND_HOST
    const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url:string = `http://${hostName}:${portNumber.toString()}/${API_Endpoint}/`

    console.log(`[apiRequests.tsx > listRequest()] fetching: \"${url}\" ...`);
    //fetch(url).then((response:any) => { return response.json() }).then((data)=> {setObjects(data)});
    return axios.get(url).then((response:any) => {return response.data;});
}

export async function createRequest<M extends ModelNames>(modelName: M, payload: CreateRequest<M>, modelInfo:ModelInfo): Promise<WriteResponse<M>> {
    const hostName: string = import.meta.env.VITE_BACKEND_HOST
    const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url:string = `http://${hostName}:${portNumber.toString()}/${modelInfo.APIs.list}/`

    


    
    console.log(`creating: \"${url}\" ...`);
    //fetch(url).then((response:any) => { return response.json() }).then((data)=> {setObjects(data)});        
    return axios.post(url, payload).then((response:any) => {return response.data;});
    
}

export async function readRequest<M extends ModelNames>(modelName: M, id:string, modelInfo:ModelInfo): Promise<ReadResponse<M>> {
    const hostName: string = import.meta.env.VITE_BACKEND_HOST
    const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url:string = `http://${hostName}:${portNumber.toString()}/${modelInfo.APIs.detailBase}/${id}/`

    


    
    console.log(`creating: \"${url}\" ...`);
    //fetch(url).then((response:any) => { return response.json() }).then((data)=> {setObjects(data)});        
    return axios.get(url).then((response:any) => {return response.data;});
    
}

export async function updateRequest<M extends ModelNames>(modelName: M, payload: UpdateRequest<M>, modelInfo:ModelInfo): Promise<WriteResponse<M>> {
    const id:string = payload.id
    
    const hostName: string = import.meta.env.VITE_BACKEND_HOST
    const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url:string = `http://${hostName}:${portNumber.toString()}/${modelInfo.APIs.detailBase}/${id}/`

    


    
    console.log(`creating: \"${url}\" ...`);
    //fetch(url).then((response:any) => { return response.json() }).then((data)=> {setObjects(data)});        
    return axios.put(url, payload).then((response:any) => {return response.data;});
    
}

export async function deleteRequest<M extends ModelNames>(modelName: M, id:string, modelInfo:ModelInfo): Promise<void> {
    const hostName: string = import.meta.env.VITE_BACKEND_HOST
    const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url:string = `http://${hostName}:${portNumber.toString()}/${modelInfo.APIs.detailBase}/${id}/`

    


    
    console.log(`creating: \"${url}\" ...`);
    //fetch(url).then((response:any) => { return response.json() }).then((data)=> {setObjects(data)});        
    return axios.delete(url).then((response:any) => {return response.data;});
    
}