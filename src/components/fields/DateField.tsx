import {TextField} from "@mui/material";

type DateFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onHandleBlur?:() => void;
    errorMessage?: string;
}

export const DateField = ({ label, value, errorMessage, onChange, onHandleBlur }: DateFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <TextField
            label={label}
            type="date"
            value={value}
            onChange={handleChange}
            InputLabelProps={{
                shrink: true,
            }}
            fullWidth
            margin="normal"
            onBlur={onHandleBlur}
            helperText={errorMessage}
            error={!!errorMessage}
        />
    );
};
