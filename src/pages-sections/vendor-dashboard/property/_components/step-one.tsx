import { Grid, MenuItem } from "@mui/material";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { IProperty } from "models/Property.model";

interface Props {
    values: IProperty;
    handleChange: any;
    touched: any;
    errors: any;
    handleBlur: any;
}

export function PropertyFormStepOne({ values, handleChange, touched, errors, handleBlur }: Props) {
    return (
        <>
            <Grid item sm={3} xs={12}>
                <CustomFormLabel>Property Name</CustomFormLabel>
                <CustomTextField
                    fullWidth
                    name="property_details_name"
                    color="info"
                    value={values.property_details_name}
                    onChange={handleChange}
                    helperText={touched.property_details_name && errors.property_details_name}
                    error={Boolean(touched.property_details_name && errors.property_details_name)}
                />
            </Grid>            
            <Grid item sm={3} xs={12}>
                <CustomFormLabel>Property Type</CustomFormLabel>
                <CustomTextField
                    select
                    fullWidth
                    color="info"
                    name="property_type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.property_type}
                >
                    <MenuItem value="hotel">Hole</MenuItem>
                    <MenuItem value="resort">Resort</MenuItem>
                    <MenuItem value="apartment">Apartment</MenuItem>
                </CustomTextField>
            </Grid>            
        </>
    )
}