import { Validator } from "./Validator";

export default class DateValidator extends Validator<string> {
  validate(type: string): boolean {
    switch (type) {
      case "isValidDate":
        return this.isValidDate();
      case "isFuture":
        return this.isFuture();
      case "isPast":
        return this.isPast();
      case "isSameAs":
        return this.isSameAs();
      case "isBefore":
        return this.isBefore();
      case "isAfter":
        return this.isAfter();
      default:
        return true;
    }
  }

  isValidDate(): boolean {
    const regexPattern = /^\d{4}-\d{2}-\d{2}$/;
    return regexPattern.test(this.value);
  }

  isFuture(): boolean {
    const currentDate = new Date();
    return new Date(this.value) > currentDate;
  }

  isPast(): boolean {
    const currentDate = new Date();
    return new Date(this.value) < currentDate;
  }

  isSameAs(): boolean {
    const { date } = this.params;
    if (date !== undefined) {
      return new Date(this.value).getTime() === date.getTime();
    }
    return true;
  }

  isAfter(): boolean {
    const { date } = this.params;
    if (date !== undefined) {
      return new Date(this.value) > date;
    }
    return true;
  }

  isBefore(): boolean {
    const { date } = this.params;
    if (date !== undefined) {
      return new Date(this.value) < date;
    }
    return true;
  }
}
