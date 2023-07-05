type NumberParams = {
    min?:number;
    max?:number;
    less?:number;
    more?:number;
  }

export default class NumberValidator {
  private readonly value: number;
  private readonly params:NumberParams;

  constructor(value: number, params:NumberParams = {}) {
    this.value = value;
    this.params = params;
  }
  min(): boolean {
    const {min} = this.params;
    if(min !== undefined){
      return this.value >= min;
    }
    return true;
  }

  max(): boolean {
    const {max} = this.params;
    if(max!==undefined) {
      return this.value <= max;
    }
    return true;
  }
  moreThan(): boolean {
    const {more} = this.params;
    if(more !== undefined) {
      return this.value > more;
    }
   return true;
  }

  lessThan(): boolean {
    const {less} = this.params;
    if(less !== undefined){
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
    return isNaN(Number(this.value));
  }
}

