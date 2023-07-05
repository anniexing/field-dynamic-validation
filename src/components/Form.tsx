import { Grid } from "@mui/material";
import { FormBuilder } from "./FormBuilder";
import { FormView } from "./FormView";
import { FC } from "react";
import DynamicValidationSetting from "../components/DynamicValidationSetting";
import RulesSetting from "./RulesSetting.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/config.ts";

const Form: FC = () => {
  const { isEnabledDynamicValidation } = useSelector(
    (state: RootState) => state.form
  );
  return (
    <Grid container spacing={2} alignItems="flex-start">
      {isEnabledDynamicValidation && (
        <Grid item xs={4}>
          <RulesSetting />
        </Grid>
      )}

      <Grid item xs={isEnabledDynamicValidation ? 4 : 6}>
        <DynamicValidationSetting />
        <FormBuilder />
      </Grid>
      <Grid item xs={isEnabledDynamicValidation ? 4 : 6}>
        <FormView />
      </Grid>
    </Grid>
  );
};
export default Form;
