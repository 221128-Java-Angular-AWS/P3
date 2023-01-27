import { OrderProduct } from "./order-product";
import { User } from "./user";

export class Order {
    orderId?: number;
    dateOrdered?: string;
    user?: User;
    products?: OrderProduct[];

    constructor(orderId?: number, dateOrdered?: string, user?: User, products?: OrderProduct[]){
        this.orderId = orderId;
        this.dateOrdered = dateOrdered;
        this.user = user;
        this.products = products;
    }
}
