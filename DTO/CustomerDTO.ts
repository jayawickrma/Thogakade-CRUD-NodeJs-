import {OrderDTO} from "./OrderDTO";

export interface CustomerDTO{
        id:string;
        name:string;
        address:string;
        email:string;
        order:OrderDTO[]
}