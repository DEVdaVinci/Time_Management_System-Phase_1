import axios from 'axios'
import { models, type ListResponse, type ModelInfo, type ModelNames, type ModelTypes } from '../utils/models';


export async function listRequest<M extends ModelNames>(API_Endpoint: string, model_name:M): Promise<ListResponse<M>[]> {
    const hostName: string = import.meta.env.VITE_BACKEND_HOST
    const portNumber: number = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url:string = `http://${hostName}:${portNumber.toString()}/${API_Endpoint}`

    console.log(`[apiRequests.tsx > listRequest()] fetching: \"${url}\" ...`);
    //fetch(url).then((response) => { return response.json() }).then((data)=> {setObjects(data)});
    return axios.get(url).then((response) => {return response.data;});
}