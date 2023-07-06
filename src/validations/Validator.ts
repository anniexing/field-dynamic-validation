type ValidateParams = {
    min?: number;
    max?: number;
    more?:number;
    less?:number;
    positive?: boolean;
    negative?: boolean;
    integer?: boolean;
    length?: number;
    prefix?: string;
    suffix?: string;
    substring?: string;
    regex?: RegExp;
    date?: Date
};

export abstract class Validator<T> {
    protected readonly value: T;
    protected readonly params: ValidateParams;

    constructor(value: T, params: ValidateParams = {}) {
        this.value = value;
        this.params = params;
    }

    abstract validate(): boolean;
}
