import { Grid, MenuItem } from "@mui/material";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { IProperty } from "models/Property.model";

interface Props {
    values: IProperty;
    handleChange: any;
}

export function PropertyFormStepFour({ values, handleChange }: Props) {
    return (
        <>
            <Grid item xs={12}>
                <CustomFormLabel>Property Description</CustomFormLabel>
                <CustomTextField
                    type="text"
                    fullWidth
                    name="about_property"
                    color="info"
                    multiline
                    rows={4}
                    value={values.about_property}
                    onChange={handleChange}
                />
            </Grid>
        </>
    )
}