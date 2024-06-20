import { environment } from '../src/environments/environment';

export const url: string = environment.production ? 'https://shc.sut.ac.th/durableapi' : 'https://shc.sut.ac.th/durableapi';
// http://localhost:5400 https://app-durable-api.herokuapp.com
export const apiKey:string = environment.production ? '3d7d052a031e864ee9c1b04b5a4d0f11':'3d7d052a031e864ee9c1b04b5a4d0f11'; 
