import { Item } from './item.model';

export class ItemCart
{
    public total: number;

    constructor(
        public item: Item,
        public quantity: number,

    )
    {
        this.total = item.price * this.quantity;
    }
}