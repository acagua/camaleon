import { City } from './city.model';

export class Item
{
    constructor(
        public _id: String,
        public name: String,
        public price: number,
        public image: String,
        public shippingAllColombia: Boolean,
        public shippingCities?: City[]
    )
    {

    }


}