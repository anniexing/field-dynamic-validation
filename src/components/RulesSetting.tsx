import { FC, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { InputField } from "./fields/InputField";
import { Dropdown } from "./fields/Dropdown.tsx";
import { FieldType } from "../store/form.ts";
import { useDispatch } from "react-redux";
import { addValidationRule } from "../store/validationSlice";

const RulesSetting: FC = () => {
  const dispatch = useDispatch();
  const [fieldType, setFieldType] = useState("");
  const [ruleType, setRuleType] = useState("");
  const [ruleMessage, setRuleMessage] = useState("");
  const ruleMessageCaption =
    "The format of rule message would be {path}...{param1}...{param2}..., {path} is field name, param1 and param2 is parameters in rule message";
  /**
   * handle add rules
   */
  const handleAddingRule = () => {
    dispatch(
      addValidationRule({
        fieldType: fieldType as FieldType,
        ruleType,
        ruleMessage,
      })
    );
    setFieldType("");
    setRuleType("");
    setRuleMessage("");
  };
  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Rule Builder
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Dropdown
          label="Choose a field type"
          value={fieldType}
          onChange={(type) => setFieldType(type)}
          options={{
            Number: FieldType.Number,
            String: FieldType.String,
            Date: FieldType.Date,
            Boolean: FieldType.Boolean,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          onChange={(value) => setRuleType(value)}
          label="Rule Type"
          value={ruleType}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          onChange={(value) => setRuleMessage(value)}
          label="Rule Message"
          value={ruleMessage}
          placeholder='{path}...{param1}...{param2}.'
        />
        <Typography variant="caption" display="block" gutterBottom  textAlign="left">
          {ruleMessageCaption}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddingRule}>
          Add Rule
        </Button>
      </Grid>
    </Grid>
  );
};

export default RulesSetting;
