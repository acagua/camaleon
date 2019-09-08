export class UserAccess
{
    constructor(
        public roles: string[],
        public preferred: boolean,
        public _storeId: string,
    )
    {

    }
}