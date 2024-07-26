import { Grid, MenuItem } from "@mui/material";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { ILocationResponsePayload, LocationAutoComplete } from "components/LocationAutoComplete/LocationAutoComplete";
import { IProperty } from "models/Property.model";

interface Props {
    values: IProperty;
    handleChange: any;
    setValues: any; 
}

export function PropertyFormStepFive({ values, handleChange, setValues }: Props) {
    const handleLocation = (data: ILocationResponsePayload) => {
        setValues({
          ...values,
          property_address_line_2: data.address,
          property_city: data.city,
          property_state: data.state,
          property_country: data.country,
          property_pincode: data.postalCode,
        });
      };
    return (
        <>
            <Grid item xs={12} sm={12}>
                <CustomFormLabel>Location</CustomFormLabel>
                <LocationAutoComplete
                    value={values.property_address_line_1}
                    onLocationChange={handleLocation}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <CustomFormLabel>Property Address Line 1</CustomFormLabel>
                <CustomTextField
                    type="text"
                    color="info"
                    name="property_address_line_1"
                    fullWidth
                    value={values.property_address_line_1}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <CustomFormLabel>Address Line 2</CustomFormLabel>
                <CustomTextField
                    type="text"
                    color="info"
                    name="property_address_line_2"
                    fullWidth
                    value={values.property_address_line_2}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <CustomFormLabel>City</CustomFormLabel>
                <CustomTextField
                    type="text"
                    color="info"
                    name="property_city"
                    fullWidth
                    value={values.property_city}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <CustomFormLabel>State</CustomFormLabel>
                <CustomTextField
                    type="text"
                    color="info"
                    name="property_state"
                    fullWidth
                    value={values.property_state}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <CustomFormLabel>Pincode</CustomFormLabel>
                <CustomTextField
                    type="text"
                    color="info"
                    name="property_pincode"
                    fullWidth
                    value={values.property_pincode}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <CustomFormLabel>Country</CustomFormLabel>
                <CustomTextField
                    type="text"
                    color="info"
                    name="property_country"
                    fullWidth
                    value={values.property_country}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomFormLabel>Longitude</CustomFormLabel>
                <CustomTextField
                    type="number"
                    color="info"
                    name="longitude"
                    fullWidth
                    value={values.longitude}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomFormLabel>Latitude</CustomFormLabel>
                <CustomTextField
                    type="number"
                    color="info"
                    name="latitude"
                    fullWidth
                    value={values.latitude}
                    onChange={handleChange}
                />
            </Grid>
        </>
    )
}