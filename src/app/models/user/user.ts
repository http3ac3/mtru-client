import { Responsible } from "../responsible/responsible";
import { Role } from "../role/role";

export class User {
    constructor (
        public id? : number, 
        public username? : string, 
        public password? : string, 
        public responsible? : Responsible,
        public roles? : Role[]
    ) { }
}
