import { Order } from "./order";

export class User {
    userId?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    orders?: Order[];

    constructor(userId?: number, email?: string, password?: string, firstName?: string, lastName?: string, orders?: Order[]){
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.orders = orders;
    }
}
