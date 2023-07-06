export default class DateValidator {
  private readonly value: string;
  private readonly params: {
    min?: Date,
    max?: Date,
    date?: Date;
  };

  constructor(value: string, params: { date?: Date; } = {}) {
    this.value = value;
    this.params = params;
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
    const {date} = this.params;
    if(date !== undefined) {
      return new Date(this.value) > date;
    }
    return true;
  }

  isBefore(): boolean {
    const {date} = this.params;
    if(date !== undefined) {
      return new Date(this.value) < date;
    }
    return true;
  }
  isBetween():boolean {
    const {min, max} = this.params;
    if(min !== undefined && max !== undefined) {
      return new Date(this.value) > min && new Date(this.value) <= max;
    }
    return true;
  }
}
