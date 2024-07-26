import { Grid, MenuItem } from "@mui/material";
import { CustomTimePicker } from "components/form-componet/custom-date-time-picker";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { IProperty } from "models/Property.model";

interface Props {
    values: IProperty;
    handleChange: any;
    setFieldValue: any; 
}

export function PropertyFormStepSeven({ values, handleChange, setFieldValue }: Props) {
    return (
        <>
            <Grid item xs={12} sm={6}>
                <CustomFormLabel>Check in</CustomFormLabel>
                <CustomTimePicker
                    fullWidth
                    value={values.checkin_time}
                    onChange={(time) => {
                        setFieldValue("checkin_time", time)
                    }}

                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomFormLabel>Check out</CustomFormLabel>
                <CustomTimePicker
                    fullWidth
                    value={values.checkout_time}
                    onChange={(time) => {
                        setFieldValue("checkout_time", time)
                    }}

                />
            </Grid>
        </>
    )
}