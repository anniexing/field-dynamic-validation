import { ChangeEvent } from 'react';
import {TextField, TextFieldProps} from "@mui/material";

type InputFieldProps = Omit<TextFieldProps, "onChange"> & {
    label: string;
    value: string;
    errorMessage?:string | null;
    onChange: (value: string) => void;
    onHandleBlur?:() => void;
}

export const InputField = ({ label, value,errorMessage, onHandleBlur,onChange, ...rest }: InputFieldProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <TextField
            label={label}
            value={value}
            onChange={handleChange}
            onBlur={onHandleBlur}
            variant="outlined"
            fullWidth
            margin="normal"
            helperText={errorMessage}
            error={!!errorMessage}
            {...rest}
        />
    );
};
