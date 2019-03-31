import { Item } from './item.model';

export class Category
{
    constructor(
        public name: String,
        public description: String,
        public image: String,
        public color: String,
        public _id?: String
    )
    {
    }
}