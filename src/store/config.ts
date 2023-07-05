import {configureStore} from '@reduxjs/toolkit'
import {formReducer} from "./form.ts";
import validationReducer from './validationSlice';

export const store = configureStore({
    reducer: {
        form: formReducer,
        rules: validationReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
