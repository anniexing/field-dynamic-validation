import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ValidationRule } from "./valudationRule.ts";
export enum FieldType {
  Number = "number",
  String = "string",
  Date = "date",
  Boolean = "boolean",
}

export type Field = {
  key: string;
  type: FieldType;
  label: string;
  value: string;
  error?:string | null;
};

export interface FormState {
  fields: { [key: string]: Field };
  validationRules: {[key:string]:ValidationRule[]};
  isEnabledDynamicValidation: boolean
}

const initialState: FormState = {
  fields: {},
  validationRules:{},
  isEnabledDynamicValidation: false
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField: (
      state: FormState,
      action: PayloadAction<{ key: string; type: FieldType; label: string }>
    ) => {
      const { key, type, label } = action.payload;

      state.fields[key] = {
        key,
        type,
        label,
        value: "",
      };
    },
    setValue: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      const field = state.fields[key];

      field.value = value;
    },
    setValidationError: (
      state,
      action: PayloadAction<{ key:string, errorMessage: string | null }>
    ) => {
      const { key, errorMessage } = action.payload;
      const field = state.fields[key];
      field.error=errorMessage;

    },
    setValidationRules:(state, action:PayloadAction<{key: string,rules:ValidationRule[]}>) =>{
      const { key, rules } = action.payload;
      state.validationRules[key] = rules;
    },
    setDynamicValidation: (state, action:PayloadAction<{isDynamicValidation:boolean}>) => {
      const {isDynamicValidation} = action.payload;
      state.isEnabledDynamicValidation = isDynamicValidation;
    }
  },
});

export const { addField, setValue, setValidationError,setValidationRules, setDynamicValidation } = formSlice.actions;
export const formReducer = formSlice.reducer;
