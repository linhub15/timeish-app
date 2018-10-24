import { Deserializable } from "./deserializable.model";

export class Employee implements Deserializable{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    hourlyPay: number;
    constructor() { }

    deserialize(input: any) {
        return Object.assign(this, input);
    }
    fullName(): string {
        return this.firstName.concat(' ', this.lastName);
    }
}