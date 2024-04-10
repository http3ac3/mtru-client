import { Equipment } from "../equipment/equipment";
import { Placement } from "../placement/placement";
import { Responsible } from "../responsible/responsible";

export class Rent {
    constructor (
        public id : number,
        public createDateTime : string,
        public equipment : Equipment,
        public responsible : Responsible,
        public placement : Placement,
        public endDateTime? : string,
        public description? : string 
    ) { }
}
