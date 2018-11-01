import { Activity } from "./activity.model";
import { Employee } from "./employee.model";
import { Deserializable } from "./deserializable.model";
import { PayPeriod } from "./pay-period.model";

export class TimeSheet implements Deserializable{
    id: number;
    issued: Date;
    submitted: Date;
    approved: Date;
    payPeriodId: number;
    payPeriod: PayPeriod;
    employeeId: number;
    employee: Employee;
    activities: Activity[];
    
    constructor(payPeriodId?: number, employeeId?: number) {
        if (payPeriodId) { this.payPeriodId = payPeriodId }
        if (employeeId) { this.employeeId = employeeId }
    }

    deserialize(input: any) {
        if (!input) { console.error('deserialize(): required parameter'); return }
        input.employee = new Employee().deserialize(input.employee);
        input.payPeriod = new PayPeriod().deserialize(input.payPeriod);
        return Object.assign(this, input);
    }

    hasActivities(): boolean {
        if (this.activities.length < 1) { return false;}
        else { return true }
    }
    addActivity(): void {
        let activity = new Activity().deserialize(
            { payPeriodId: this.payPeriodId });
        this.activities.push(activity);
    }

    totalHours(): number {
        let hours: number = 0;
        for (const activity of this.activities) {
            hours += isNaN(activity.hours) ? 0 : activity.hours;
        }
        return hours;
    }

    totalPay(): number {
        let pay: number = 0;
        for (const activity of this.activities) {
            pay += isNaN(activity.pay) ? 0 : activity.pay;
        }
        return pay;
    }

    status(): string {
        if (this.approved) { return 'Approved' }
        else if (this.submitted) { return 'Submitted' }
        else if (this.issued) { return 'Issued' }
        else { return 'Created' }
    }
}
