import { Field, FieldType, setValidationError } from "../store/form";
import { Dispatch } from "@reduxjs/toolkit";
import NumberValidator from '../validations/NumberValidator';
import StringValidator from "../validations/StringValidator";
import DateValidator from "../validations/DateValidator";
import { ValidationRule } from "../store/valudationRule";
import BooleanValidator from "../validations/BooleanValidator";

/**
 * Task2 in the assignment
 * Execute Dynamic Validation Rules
 * when you checked the dynamic validation setting on page, it will execute the function when Blur.
 * @param validates
 * @param field
 * @param dispatch
 */
const executeDynamicValidateRules = (validates: ValidationRule[], field:Field, dispatch:Dispatch) => {
  let errorMsg ='';
  const {value, type, key} = field;

  validates.forEach((item:ValidationRule) => {
    const {validate, paramsValues, errorMessage} =item;
    let returnValue=false;
    switch(type) {
      case FieldType.String:{
        if(validate){
          const stringValidateFunction = convertStringToFunction(type,validate.toString());
          if(stringValidateFunction) {
            returnValue = stringValidateFunction(StringValidator)(value, paramsValues);
          }
        }
      }
        break;
      case FieldType.Number:{
        if(validate){
          const numberValidateFunction = convertStringToFunction(type,validate.toString());
          if(numberValidateFunction) {
            returnValue = numberValidateFunction(NumberValidator)(value, paramsValues, type);
          }
        }


      }

        break;
      case FieldType.Date:{
        if(validate){
          const dateValidateFunction = convertStringToFunction(type, validate.toString());
          if(dateValidateFunction) {
            returnValue = dateValidateFunction(DateValidator)(value, paramsValues);
          }
        }


      }

        break;
      case FieldType.Boolean: {
        if(validate){
          const booleanValidateFunction = convertStringToFunction(type,validate.toString());
          if(booleanValidateFunction) {
            returnValue = booleanValidateFunction(BooleanValidator)(value, paramsValues);
          }
        }

      }

        break;
      default:
        break;
    }
    if(!returnValue) {
      errorMsg = errorMessage || ''
    }
  })
  dispatch(setValidationError({ key, errorMessage:errorMsg }));
}

/**
 * Execute Specific Validation (Task 1 in the assignment)
 * When Dynamic validation is uncheck,will execute specific validation
 * @param field
 * @param dispatch
 */

const executeSpecificValidateRule = (field:Field, dispatch:Dispatch) => {
  const { type, key, value, label} = field;
  let errorMsg = '';
  switch (type) {
    case FieldType.Number:{
      // Perform number validation logic
      const isValid = new NumberValidator(Number(value)).isValidNumber();
      if (isValid) {
        errorMsg = `${label} must be a number`;
      }
    }
      break;
    case FieldType.String: {
      // Perform string validation logic
      const isStringEmpty = new StringValidator(value).trim();
      if (!isStringEmpty) {
        errorMsg = "Please enter a value.";
      }
    }

      break;
    case FieldType.Date:{
      /** Perform date validation logic
       Regular expression pattern for "YYYY-MM-DD" format
       **/
      const isValidDate = new DateValidator(value).isValidDate();
      if(!isValidDate) {
        errorMsg="Please enter valid date.";
      }
    }
      break;
    default:
      break;
  }
  // Display the error message if validation failed
  dispatch(setValidationError({ key, errorMessage:errorMsg }));
}

/**
 *
 * @param field
 * @param validationRules: This is the validationRules from formState
 * @param isEnabledDynamicValidation: open or close Dynamic validation setting
 * @param dispatch
 */
export const validationByParamsType = (
  field: Field,
  validationRules:{[key:string]:ValidationRule[]},
  isEnabledDynamicValidation:boolean,
  dispatch: Dispatch

) => {
  const { key } = field;
  const validates = validationRules[key];

  if(isEnabledDynamicValidation) {
    /**
     * When Enabled the Dynamic Validation Setting is checked on Page,
     * will executeDynamicValidateRules
     */
    executeDynamicValidateRules(validates, field, dispatch);
  } else {
    /**
     * When Enabled the Dynamic Validation Setting is unchecked on Page,
     * will executeSpecificValidateRule
     */
    executeSpecificValidateRule(field, dispatch)
  }
};

/**
 * in Store the validation is a string , and when call the validation , we need to convert it to function
 * Convert validate string to  a function
 * @param functionString
 * @param type
 */
export function convertStringToFunction(type:FieldType, functionString?: string, ): ((...args: any[]) => any) | undefined {
  if (functionString) {
    switch (type) {
      case FieldType.Number:
        return new Function('NumberValidator',`return ${functionString}`) as (...args: any[]) => any | undefined;
      case FieldType.String:
        return new Function('StringValidator',`return ${functionString}`) as (...args: any[]) => any | undefined;
      case FieldType.Date:
        return new Function('DateValidator',`return ${functionString}`) as (...args: any[]) => any | undefined;
      case FieldType.Boolean:
        return new Function('BooleanValidator',`return ${functionString}`) as (...args: any[]) => any | undefined;
    }
  }
  return undefined
}

