export class Store
{
    constructor(
        public name: string,
        public description: string,
        public imageLogo: string,
        public emails: string[],
        public _categoryId: string,
        public _userIds: string[],
        public _id?: string,
        public codeName?: string,
        public numberOfItems?: number
    )
    {

    }
}