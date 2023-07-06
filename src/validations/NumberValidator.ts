import { Validator } from "./Validator";

export default class NumberValidator extends Validator<number> {
  validate(type: string): boolean {
    switch (type) {
      case "min":
        return this.min();
      case "max":
        return this.max();
      case "moreThan":
        return this.moreThan();
      case "lessThan":
        return this.lessThan();
      case "positive":
        return this.positive();
      case "negative":
        return this.negative();
      case "integer":
        return this.integer();
      case "isValidNumber":
        return this.isValidNumber();
      default:
        return true;
    }
  }

  min(): boolean {
    const { min } = this.params;
    if (min !== undefined) {
      return this.value >= min;
    }
    return true;
  }

  max(): boolean {
    const { max } = this.params;
    if (max !== undefined) {
      return this.value <= max;
    }
    return true;
  }
  moreThan(): boolean {
    const { more } = this.params;
    if (more !== undefined) {
      return this.value > more;
    }
    return true;
  }

  lessThan(): boolean {
    const { less } = this.params;
    if (less !== undefined) {
      return this.value < less;
    }
    return true;
  }

  /**
   * check the number is positive
   */
  positive(): boolean {
    return this.value > 0;
  }

  /**
   * Check if the number is negative
   */
  negative(): boolean {
    return this.value < 0;
  }

  integer(): boolean {
    return Number.isInteger(this.value);
  }
  isValidNumber(): boolean {
    return !isNaN(Number(this.value));
  }
}
