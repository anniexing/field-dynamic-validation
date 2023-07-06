import { Dropdown } from "./fields/Dropdown.tsx";
import { useState } from "react";
import { addField, FieldType } from "../store/form.ts";
import { Button, Grid, Typography } from "@mui/material";
import { InputField } from "./fields/InputField.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/config.ts";
import { ruleConfiguration, ValidationRule } from "../store/valudationRule.ts";
import { setValidationRules } from "../store/form";

export const FormBuilder = () => {
  const [currentType, setCurrentType] = useState("");
  const [currentKey, setCurrentKey] = useState("");
  const [currentLabel, setCurrentLabel] = useState("");
  const dispatch = useDispatch();
  const { fields, isEnabledDynamicValidation } = useSelector(
    (state: RootState) => state.form
  );

  const [ruleMessage, setRuleMessage] = useState("");
  const { ruleList } = useSelector((state: RootState) => state.rules);
  const [ruleItems, setRuleItems] = useState<{ [key: string]: string }>({});
  const [parameters, setParameters] = useState<string[]>([]);
  const [paramsValues, setParamsValues] = useState<{
    [key: string]: string | number | Date | boolean;
  }>({});

  /**
   * mapped Rules to the options format for select rules
   * @param type
   */
  const mappedRuleOptions = (type: string) => {
    const configRules = ruleConfiguration[type as FieldType];
    const rules =
      ruleList && ruleList[type]
        ? [...configRules, ...ruleList[type]]
        : configRules;
    const mappedRule = rules?.reduce(
      (acc: { [key: string]: string }, { ruleType, ruleMessage }) => {
        acc[ruleType] = ruleMessage;
        return acc;
      },
      {}
    );
    setRuleItems(mappedRule);
  };

  /**
   * Analysis the parameters in rule ruleMessage and create parameters field for user to input parameter values
   * the format would be ${path}...${min}...${length}
   * the path, min and length would be parameters.
   * path is the field label name, had created default, so here I exclude the path, just create
   * field for min and length etc.
   * @param message
   */
  const analyzeParametersInMessage = (message: string) => {
    const regex = /\$\{(\w+)\}/g;
    let match;
    const values: string[] = [];

    while ((match = regex.exec(message)) !== null) {
      const param = match[1];
      if (param !== "path") {
        values.push(param);
      }
    }
    setParameters(values);
  };

  const handleAddingField = () => {
    if (fields[currentKey] !== undefined) {
      alert("Key already exists");
      return;
    }

    if (currentType && currentKey && currentLabel) {
      dispatch(
        addField({
          key: currentKey,
          type: currentType as FieldType,
          label: currentLabel,
        })
      );

      const configRule = [...ruleConfiguration[currentType as FieldType]];
      const rule = configRule.filter(
        (item) => item.ruleMessage === ruleMessage || item.ruleType === "empty"
      );
      if (rule) {
        // @ts-ignore
        const mappedRule: ValidationRule[] = rule.map((item) => ({
          ...item,
          validate: item.validate.toString(),
          errorMessage: (item.ruleMessage.includes("${path}")
            ? item.ruleMessage.replace("${path}", currentLabel)
            : item.ruleMessage
          ).replace(/\${(\w+)}/g, (_, key) => paramsValues[key].toString()),
          paramsValues,
        }));
        dispatch(setValidationRules({ key: currentKey, rules: mappedRule }));
      }
    }
  };

  return (
    <Grid container spacing={2} sx={{ width: 300, margin: "auto" }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Form Builder
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Dropdown
          label="Choose a field type"
          value={currentType}
          onChange={(type) => {
            setCurrentType(type);
            mappedRuleOptions(type);
              setCurrentKey("");
              setCurrentLabel("");
              setParamsValues({});
              setRuleMessage('')
          }}
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
          onChange={(value) => setCurrentKey(value)}
          label="Key"
          value={currentKey}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          onChange={(value) => setCurrentLabel(value)}
          label="Label"
          value={currentLabel}
        />
      </Grid>
      {isEnabledDynamicValidation && currentType && (
        <>
          <Grid item xs={12}>
            <Dropdown
              label="Choose a rule type"
              value={ruleMessage}
              onChange={(message) => {
                setRuleMessage(message);
                /**
                 * Analysis the rule message and extract the parameters in the rule message.
                 * the message format would be for example '${path} must be ${length}. the length and path are parameters
                 * actually ${path} is the label.
                 */
                analyzeParametersInMessage(message);
              }}
              options={ruleItems}
            />
          </Grid>
          {ruleMessage && parameters.map((paramItem, index) => (
            <Grid item xs={12} key={index}>
              <InputField
                onChange={(value) => {
                  let tempValue: string | number | Date | boolean = value;
                  if (!isNaN(Number(value))) {
                    tempValue = Number(value);
                  }
                  setParamsValues({ ...paramsValues, [paramItem]: tempValue });
                }}
                label={paramItem}
                value={paramsValues[paramItem]?.toString()}
              />
            </Grid>
          ))}
        </>
      )}

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddingField}>
          Add Field
        </Button>
      </Grid>
    </Grid>
  );
};
