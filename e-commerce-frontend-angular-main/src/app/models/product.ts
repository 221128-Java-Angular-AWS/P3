export class Product {
    id: number;
    genre: string;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;

    constructor (id: number, genre: string ,name: string, quantity: number, description: string, price: number, image: string) {
        this.id = id;
        this.genre = genre;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}
