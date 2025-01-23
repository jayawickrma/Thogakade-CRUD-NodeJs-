import {CustomerDTO} from "./CustomerDTO";
import {OrderDetailsDTO} from "./OrderDetailsDTO";

export interface OrderDTO{
    orderId:number;
    orderDate:Date;
    customerId:CustomerDTO;
    orderDetails:OrderDetailsDTO[]
}