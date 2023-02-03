import { User } from "./user";

import { Product } from "./product"

export class Review {
    reviewId?: number;
    message?: string;
    rating?: number;
    user?: User;
    product?: Product;

    constructor(message?: string, rating?: number, user?: User, product?: Product) {
        this.message = message;
        this.rating = rating;
        this.user = user;
        this.product = product;
    }
}
