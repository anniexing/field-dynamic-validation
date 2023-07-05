import { RootState } from "../store/config";
import { useDispatch, useSelector } from "react-redux";
import { FieldType, setValue } from "../store/form";
import { InputField } from "./fields/InputField";
import { CheckboxField } from "./fields/CheckboxField";
import { DateField } from "./fields/DateField";
import { Grid, Typography } from "@mui/material";
import { validationByParamsType } from "../validations/executeValidate";

export const FormView = () => {
  const { fields, validationRules, isEnabledDynamicValidation } = useSelector(
    (state: RootState) => state.form
  );
  const dispatch = useDispatch();

  const renderFields = () => {
    const renderedFields = [];
    for (const key in fields) {
      const field = fields[key];
      const label = field.label;
      const onChange = (value: string) => dispatch(setValue({ key, value }));
      const value = field.value;
      const errorMessage = field.error || null;

      switch (field.type) {
        case FieldType.Number:
        case FieldType.String:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <InputField
                label={label}
                onChange={onChange}
                value={value}
                onHandleBlur={() => {
                  //Here basic validation for String and Number and String
                  validationByParamsType(
                    field,
                    validationRules,
                    isEnabledDynamicValidation,
                    dispatch
                  );
                }}
                errorMessage={errorMessage}
              />
            </Grid>
          );
          break;
        case FieldType.Boolean:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <CheckboxField label={label} onChange={onChange} value={value} />
            </Grid>
          );
          break;
        case FieldType.Date:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <DateField
                label={label}
                onChange={onChange}
                value={value}
                onHandleBlur={() => {
                  //Here basic validation for Date
                  validationByParamsType(
                    field,
                    validationRules,
                    isEnabledDynamicValidation,
                    dispatch
                  );
                }}
              />
            </Grid>
          );
      }
    }

    return renderedFields;
  };

  return (
    <Grid container spacing={2} sx={{ width: 300, margin: "auto" }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Form Preview
        </Typography>
      </Grid>
      {renderFields()}
    </Grid>
  );
};
