import { FieldType } from "./form";
import StringValidator from "../validations/StringValidator.ts";
import NumberValidator from "../validations/NumberValidator.ts";
import DateValidator from "../validations/DateValidator.ts";
import BooleanValidator from "../validations/BooleanValidator.ts";

export interface ValidationRule {
  fieldType: FieldType;
  ruleType: string;
  ruleMessage: string;
  errorMessage?:string | undefined;
  paramsValues?:object;
  validate?: (value: string, params?:object) => boolean;
}

export const ruleConfiguration = {
  [FieldType.String]: [
    {
      fieldType:FieldType.String,
      ruleType: "empty",
      ruleMessage: "${path} must not empty",
      validate: (value: string, params: { length: number }) =>
          new StringValidator(value, params).validate('empty'),
    },
    {
      fieldType:FieldType.String,
      ruleType: "length",
      ruleMessage: "${path} must be exactly ${length} characters",
      validate: (value: string, params: { length: number }) =>
        new StringValidator(value, params).validate('length'),
    },
    {
      fieldType:FieldType.String,
      ruleType: "min",
      ruleMessage: "${path} must be at least ${min} characters",
      validate: (value: string, params: { length: number }) =>
        new StringValidator(value, params).validate('min'),
    },
    {
      fieldType:FieldType.String,
      ruleType: "max",
      ruleMessage: "${path} must be at most ${max} characters",
      validate: (value: string, params: { length: number }) =>
        new StringValidator(value, params).validate('max'),
    },
    {
      fieldType:FieldType.String,
      ruleType: "matches",
      ruleMessage: '${path} must match the following: "${regex}"',
      validate: (value: string, params: { length: number }) =>
        new StringValidator(value, params).validate('matches'),
    },
    {
      fieldType:FieldType.String,
      ruleType: "email",
      ruleMessage: "${path} must be a valid email",
      validate: (value: string) => new StringValidator(value).validate("email"),
    },
    {
      fieldType:FieldType.String,
      ruleType: "url",
      ruleMessage: "${path} must be a valid URL",
      validate: (value: string) => new StringValidator(value).validate("url"),
    },
    {
      fieldType:FieldType.String,
      ruleType: 'trim',
      ruleMessage: '${path} must be a trimmed string',
      validate:(value:string) => new StringValidator(value).validate("trim"),
    },
    {
      fieldType:FieldType.String,
      ruleType: 'lowercase',
      ruleMessage: '${path} must be a lowercase string',
      validate:(value:string) => new StringValidator(value).validate("lowercase"),
    },
    {
      fieldType:FieldType.String,
      ruleType: 'uppercase',
      ruleMessage: '${path} must be a uppercase string',
      validate:(value:string) => new StringValidator(value).validate("uppercase"),
    },
    {
      fieldType:FieldType.String,
      ruleType: 'uuid',
      ruleMessage: '${path} must be a valid UUID',
      validate:(value:string) => new StringValidator(value).validate("uuid"),
    }
  ],
  [FieldType.Number]:[{
    fieldType:FieldType.Number,
    ruleType: 'min',
    ruleMessage: '${path} must be greater than or equal to ${min}',
    validate:(value:number, params:{min:number}) => new NumberValidator(value,params).validate("min")
  },{
    fieldType:FieldType.Number,
    ruleType: 'max',
    ruleMessage: '${path} must be less than or equal to ${max}',
    validate:(value:number, params:{min:number}) => new NumberValidator(value,params).validate("max")
  },
    {
      fieldType:FieldType.Number,
      ruleType: 'lessThan',
      ruleMessage: '${path} must be less than ${less}',
      validate:(value:number, params:{less:number}) => new NumberValidator(value,params).validate("lessThan")
    },
    {
      fieldType:FieldType.Number,
      ruleType: 'moreThan',
      ruleMessage: '${path} must be greater than ${more}',
      validate:(value:number, params:{more:number}) => new NumberValidator(value,params).validate("moreThan")
    },
    {
      fieldType:FieldType.Number,
      ruleType: 'positive',
      ruleMessage: '${path} must be a positive number',
      validate:(value:number) => new NumberValidator(value).validate("positive")
    },
    {
      fieldType:FieldType.Number,
      ruleType: 'negative',
      ruleMessage: '${path} must be a negative number',
      validate:(value:number) => new NumberValidator(value).validate("negative")
    }
  ],
  [FieldType.Date]:[
    {
      fieldType:FieldType.Date,
      ruleType: 'validDate',
      ruleMessage:'${path} field must be valid date',
      validate:(value:string) => new DateValidator(value).validate("validDate")
    },
    {
      fieldType:FieldType.Date,
      ruleType: 'pastDate',
      ruleMessage:'${path} field must be earlier than today',
      validate:(value:string) => new DateValidator(value).validate("isPast")
    },
    {
      fieldType:FieldType.Date,
      ruleType: 'futureDate',
      ruleMessage:'${path} field must be later than today',
      validate:(value:string) => new DateValidator(value).validate("isFuture")
    },
    {
      fieldType:FieldType.Date,
      ruleType: 'after',
      ruleMessage:'${path} field must be after ${date}',
      validate:(value:string, params:{date:Date}) => new DateValidator(value, params).validate("isAfter")
    },
    {
      fieldType:FieldType.Date,
      ruleType: 'before',
      ruleMessage:'${path} field must be before ${date}',
      validate:(value:string, params:{date:Date}) => new DateValidator(value, params).validate("isBefore")
    },
    {
      fieldType:FieldType.Date,
      ruleType: 'sameAs',
      ruleMessage:'${path} field must be the same as ${date}',
      validate:(value:string, params:{date:Date}) => new DateValidator(value, params).validate("isSameAs")
    },
  ],
  [FieldType.Boolean]: [
    {
      fieldType:FieldType.Boolean,
      ruleType:'isFalse',
      ruleMessage: '${path} field must be false',
      validate:(value:boolean) => new BooleanValidator(value).validate("isFalse")
    },
    {
      fieldType:FieldType.Boolean,
      ruleType:'isTrue',
      ruleMessage: '${path} field must be true',
      validate:(value:boolean) => new BooleanValidator(value).validate("isTrue")
    },
  ]
};
