import { Deserializable } from "./deserializable.model";

export class Activity implements Deserializable{
    id: number;
    date: Date;
    hours: number;
    description: string;
    pay: number;
    timeSheetId: number;

    constructor() { }

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}
