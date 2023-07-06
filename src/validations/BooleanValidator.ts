import { Validator } from "./Validator";

export default class BooleanValidator extends Validator<boolean> {
  validate(type: string): boolean {
    switch (type) {
      case "isTrue":
        return this.isTrue();
      case "isFalse":
        return this.isFalse();
      default:
        return true;
    }
  }

  isTrue(): boolean {
    return this.value;
  }

  isFalse(): boolean {
    return !this.value;
  }
}
