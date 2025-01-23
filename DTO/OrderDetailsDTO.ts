import {ItemDTO} from "./ItemDTO";
import {OrderDTO} from "./OrderDTO";

export interface OrderDetailsDTO {
    OrderDetailsID: number;
    OrderID: number;
    ItemID: number;
    Quantity: number;
    Price: number;
    Order: OrderDTO;
    Item: ItemDTO;
}
