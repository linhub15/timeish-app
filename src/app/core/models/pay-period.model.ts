import { Deserializable } from "./deserializable.model";

export class PayPeriod implements Deserializable{
    id: number;
    start: Date;
    end: Date;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}
