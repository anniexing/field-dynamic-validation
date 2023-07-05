import { CheckboxField } from "./fields/CheckboxField.tsx";
import { Grid } from "@mui/material";
import { useState } from "react";
import {setDynamicValidation} from '../store/form';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/config.ts";

const DynamicValidationSetting = () => {
    const dispatch = useDispatch();
    const {isEnabledDynamicValidation} = useSelector((state:RootState)=> state.form);
  const [isDynamicSetting, setIsDynamicSetting] = useState<string>(isEnabledDynamicValidation? "1" : '0');
  const onChange = (value:string) => {
      setIsDynamicSetting(value);
      dispatch(setDynamicValidation({isDynamicValidation: value === "1"}))
  };

  return (
    <Grid item xs={12}>
      <CheckboxField
        label="Dynamic Validation"
        onChange={(value) => onChange(value)}
        value={isDynamicSetting}
      />
    </Grid>
  );
};

export default DynamicValidationSetting;
