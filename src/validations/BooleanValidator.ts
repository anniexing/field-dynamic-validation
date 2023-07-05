export default class BooleanValidator {
    private readonly value: boolean;

    constructor(value: boolean) {
        this.value = value;
    }

    isTrue(): boolean {
        return this.value;
    }

    isFalse(): boolean {
        return !this.value;
    }
}
