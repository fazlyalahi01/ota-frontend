import { FormControlLabel, FormGroup, Grid } from "@mui/material";
import { CustomCheckbox } from "components/form-componet/custom-checkbox";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import { IProperty } from "models/Property.model";
import { produce } from "immer"
import { allowed_rules, amenities, not_allowed_rules } from "constants/constants";

interface Props {
    values: IProperty;
    setValues: any;
    handleChange: any;
}




export function PropertyFormStepSix({ values, handleChange, setValues }: Props) {

    const handleAllowedCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const newRuleAllowed = checked
            ? [...values.rule_allowed, name]
            : values.rule_allowed.filter(rule => rule !== name);
        setValues({ ...values, rule_allowed: newRuleAllowed });
    }
    const handleNotAllowedCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const newRuleAllowed = checked
            ? [...values.rule_not_allowed, name]
            : values.rule_not_allowed.filter(rule => rule !== name);
        setValues({ ...values, rule_not_allowed: newRuleAllowed });
    }
    const handleAmenitiesCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const newRuleAllowed = checked
            ? [...values.amenities, name]
            : values.amenities.filter(rule => rule !== name);
        setValues({ ...values, amenities: newRuleAllowed });
    }
    return (
        <>
            <Grid item xs={12} sm={3} spacing={2}>
                <CustomFormLabel>Rule Allowed</CustomFormLabel>
                <FormGroup>
                    {
                        allowed_rules?.map((item, index) => (
                            <FormControlLabel
                                key={index}
                                label={item}
                                control={
                                    <CustomCheckbox
                                        checked={values.rule_allowed.includes(item)}
                                        onChange={handleAllowedCheckboxChange}
                                        name={item}
                                    />
                                }
                            />
                        ))
                    }
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={3} spacing={2}>
                <CustomFormLabel>Rule Not Allowed</CustomFormLabel>
                <FormGroup>
                    {
                        not_allowed_rules?.map((item, index) => (
                            <FormControlLabel
                                key={index}
                                label={item}
                                control={
                                    <CustomCheckbox
                                        checked={values.rule_not_allowed.includes(item)}
                                        onChange={handleNotAllowedCheckboxChange}
                                        name={item}
                                    />
                                }
                            />
                        ))
                    }
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={3} spacing={2}>
                <CustomFormLabel>Amenities</CustomFormLabel>
                <FormGroup>
                    {
                        amenities?.map((item, index) => (
                            <FormControlLabel
                                key={index}
                                label={item}
                                control={
                                    <CustomCheckbox
                                        checked={values.amenities.includes(item)}
                                        onChange={handleAmenitiesCheckboxChange}
                                        name={item}
                                    />
                                }
                            />
                        ))
                    }
                </FormGroup>
            </Grid>
        </>
    )
}

