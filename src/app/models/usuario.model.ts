import { UserAccess } from './userAccess.model';

export class Usuario
{
    constructor(
        public name: string,
        public lastName: string,
        public email: string,
        public password: string,
        public access?: UserAccess[],
        public telephone?: string,
        public address?: string,
        public img?: string,
        public _id?: string
    )
    {

    }
}