import { Category } from "../category/category";

export class Subcategory {
    constructor (public id : number, public name : string, public category : Category) { }
}
