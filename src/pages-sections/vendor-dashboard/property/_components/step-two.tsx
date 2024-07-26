import { Grid, MenuItem } from "@mui/material";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { IProperty } from "models/Property.model";

interface Props {
    values: IProperty;
    handleChange: any;
}

export function PropertyFormStepTwo({ values, handleChange }: Props) {
    return (
        <>
            <Grid item sm={3} xs={12}>
                <CustomFormLabel>Images</CustomFormLabel>
                Images
            </Grid>
        </>
    )
}