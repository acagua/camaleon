import { ItemCart } from './item-cart.model';

export class Order
{
    constructor(
        public whoReceives: String,
        public comments: String,
        public date: Date,
        public address: String,
        public total: number,
        public items: ItemCart[],
        public _id: String,
    )
    {

    }


}