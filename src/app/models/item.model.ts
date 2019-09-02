import { City } from './city.model';

export class Item
{
    constructor(
        public _id: String,
        public _storeCodeName: string,
        public name: String,
        public images: String,
        public price: number,
        public description: string,
        public keywords: string,
        public specifications: any [],
        public options: any [],
        public shippingAllColombia: Boolean,
        public shippingCities?: City[]
    )
    {

    }


}