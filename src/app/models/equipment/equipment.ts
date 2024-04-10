import { Placement } from "../placement/placement";
import { Responsible } from "../responsible/responsible";
import { Subcategory } from "../subcategory/subcategory";

export class Equipment {
    constructor (
        public id : number, 
        public inventoryNumber : string,
        public name : string,
        public initialCost : number,
        public commissioningDate : string,
        public commissioningActNumber : string,
        public responsible : Responsible,
        public subcategory : Subcategory,
        public placement : Placement,
        public imageData? : string,
        public description? : string,
        public decommissioningDate? : string, 
        public decommissioningActNumber? : string,   
    ) {}
}
