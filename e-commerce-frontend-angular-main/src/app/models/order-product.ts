import { Product } from "./product";

export class OrderProduct {

    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number){
        this.product = product;
        this.quantity = quantity;
    }
}
