import { Validator } from "./Validator.ts";

export default class StringValidator extends Validator<string> {
  validate(type: string): boolean {
    switch (type) {
      case "empty":
        return !this.isEmpty();
      case "length":
        return this.length();
      case "min":
        return this.min();
      case "max":
        return this.max();
      case "matches":
        return this.matches();
      case "email":
        return this.email();
      case "url":
        return this.url();
      case "uuid":
        return this.uuid();
      case "trim":
        return this.trim();
      case "lowercase":
        return this.lowercase();
      case "uppercase":
        return this.uppercase();
      case "contains":
        return this.contains();
      default:
        return true;
    }
  }

  isEmpty(): boolean {
    return this.value.trim() === "";
  }
  length(): boolean {
    const { length } = this.params;
    return this.value.length === length;
  }

  min(): boolean {
    const { min } = this.params;
    if (min !== undefined) {
      return this.value.length >= min;
    }
    return true;
  }

  max(): boolean {
    const { max } = this.params;
    if (max !== undefined) {
      return this.value.length <= max;
    }
    return true;
  }

  matches(): boolean {
    const { regex } = this.params;
    if (regex !== undefined) {
      return regex.test(this.value);
    }
    return true;
  }

  email(): boolean {
    // Regular expression for email validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(this.value);
  }

  url(): boolean {
    // Regular expression for URL validation
    // eslint-disable-next-line
    const urlRegex = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
    return urlRegex.test(this.value);
  }

  uuid(): boolean {
    // Regular expression for UUID validation
    const uuidRegex =
      /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    return uuidRegex.test(this.value);
  }

  trim(): boolean {
    return this.value.trim() === this.value;
  }

  lowercase(): boolean {
    return this.value.toLowerCase() === this.value;
  }

  uppercase(): boolean {
    return this.value.toUpperCase() === this.value;
  }

  startsWith(): boolean {
    const { prefix } = this.params;
    if (prefix !== undefined) {
      return this.value.startsWith(prefix);
    }
    return true;
  }

  endsWith(): boolean {
    const { suffix } = this.params;
    if (suffix !== undefined) {
      return this.value.endsWith(suffix);
    }
    return true;
  }

  contains(): boolean {
    const { substring } = this.params;
    if (substring !== undefined) {
      return this.value.includes(substring);
    }
    return true;
  }
}
