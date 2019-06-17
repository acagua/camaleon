export class ContactMessage
{
    constructor(
        public name: String,
        public lastName: String,
        public email: String,
        public message: String,
        public phone?: String
    )
    {
    }
}