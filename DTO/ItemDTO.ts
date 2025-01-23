import {OrderDTO} from "./OrderDTO";

export interface ItemDTO{
    itemId:number;
    itemName:string;
    quantity:number;
    price:number;
    orderId :OrderDTO[]
}