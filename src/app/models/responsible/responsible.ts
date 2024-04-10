import { Department } from "../department/department";

export class Responsible {
    constructor (
        public id : number, 
        public lastName : string, 
        public firstName : string, 
        public patronymic : string,
        public position : string, 
        public phoneNumber : string,
        public isFinanciallyResponsible : boolean,
        public department : Department) {}
}
