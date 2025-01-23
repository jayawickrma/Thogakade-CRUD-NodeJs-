import {CustomerDTO} from "./CustomerDTO";
import {OrderDetailsDTO} from "./OrderDetailsDTO";

export interface OrderDTO{
    orderId:number;
    customerId:CustomerDTO;
    orderDate:Date;
    orderDetails:OrderDetailsDTO[]
}