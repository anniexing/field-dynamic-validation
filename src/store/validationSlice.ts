import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ValidationRule} from './valudationRule';

export interface ValidationState {
  ruleList: {
      [key: string]: ValidationRule[]
  };
}

const initialState: ValidationState = {
    ruleList: {},
};

const validationSlice = createSlice({
    name: 'validation',
    initialState,
    reducers: {
        addValidationRule:(state, action:PayloadAction<ValidationRule>) => {
            const {fieldType} = action.payload;
            const ruleItem = state.ruleList[fieldType] || [];
            ruleItem.push(action.payload);
            state.ruleList[fieldType.toString()] = ruleItem;
        }
    },
});

export const { addValidationRule } = validationSlice.actions;
export default validationSlice.reducer;
