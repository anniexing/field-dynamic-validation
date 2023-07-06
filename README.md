# Frontend Developer Homework Assignment

### Overview
This application allows you to configure dynamic field validation rules, offering flexibility and customization for your form validation needs. You can set both specific validation rules and enable dynamic validation settings to enhance your form validation capabilities.

## Features

- Dynamic Validation Setting: Enable the dynamic validation setting through a checkbox on the page. If it is unchecked, the validation will be a specific validation.
- Default Rule Configuration: Validation rules are pre-defined and grouped by field types.
- Rule Object Structure: Each rule object includes properties such as rule type, rule message, and validate method.
- Rule Builder: Configure field type, input rule type and rule message.
- Rule Message Format: The rule message follows a specific format like "{path}...{params1}...{params2}" to allow for dynamic parameter values.
- Form Builder: Configure field types, input keys, and labels using an intuitive Form Builder interface.
- Select Rule Type: When dynamic validation is enabled, select a rule type for each field.
- Params Field: Input values for the parameters through dynamically generated params fields.
- Add Field: Create a field on the Form View by clicking the "Add Field" button.
- OnBlur Event: The validation executes automatically when a value is entered into the field.
- Included Validation Classes: StringValidation, NumberValidation, DateValidation, and BooleanValidation classes with corresponding validate methods.

### Design Principles and Considerations:
- Adhered to the Open-Closed Principle (OCP) throughout the application's design. it allows for easy integration of new features in current systems.
- The code in the system is responsible for a specific aspect or concern. it followed the principle of Separation of Concerns (SoC). To improve the code modified independently, enhancing flexibility and scalability.

### Improvements
- Create a Validator abstract class to define a validate method as an abstract method. The validate method will be implemented in each derived class (e.g., StringValidator, DateValidator, NumberValidator, BooleanValidator etc.), providing the specific validation logic for each type.
- Now the system validate single field. We can think about that validate multiple fields. In the validate method, we can get the form and validate every filed in the form.
