export class UserModel
{
    constructor
    (
        public name: string,
        public email: string,
        public blood: string,
        public phone: number,
        public address1: string,
        public address2: string,
        public password: string,
        public confPassword: string
    ) {};
};