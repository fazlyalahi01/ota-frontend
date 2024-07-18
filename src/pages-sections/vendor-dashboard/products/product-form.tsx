"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
// STYLED COMPONENTS
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { ILocationResponsePayload } from "components/LocationAutoComplete/LocationAutoComplete";
import { defaultProperty } from "models/Property.model";
import { StyledClear, UploadImageBox } from "../styles";
import { CustomTimePicker } from "components/form-componet/custom-date-time-picker";
import moment from "moment";
import { api } from "api/api";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  property_details_name: yup.string().required("Property Name is required!"),
});

// ================================================================
interface Props { }
// ================================================================

export default function ProductForm(props: Props) {
  const [files, setFiles] = useState([]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue
  } = useFormik({
    initialValues: defaultProperty,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async(values) => {

      const res = await api.post("/property/create", values);

      console.log(values);
    }
  });

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (files: File[]) => {
    files.forEach((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
    setFiles(files);
  };

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = (file: File) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };

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
    <Card className="p-3">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
            <CustomFormLabel>Property Description</CustomFormLabel>
            <CustomTextField
              fullWidth
              name="about_property"
              color="info"
              value={values.about_property}
              onChange={handleChange}
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
          <Grid item xs={12} lg={3}>
            <CustomFormLabel>Property Address Line 1</CustomFormLabel>
            <CustomTextField
              type="text"
              name="property_address_line_1"
              fullWidth
              value={values.property_address_line_1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CustomFormLabel>Address Line 2</CustomFormLabel>
            <CustomTextField
              type="text"
              name="property_address_line_2"
              fullWidth
              value={values.property_address_line_2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CustomFormLabel>City</CustomFormLabel>
            <CustomTextField
              type="text"
              name="property_city"
              fullWidth
              value={values.property_city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CustomFormLabel>State</CustomFormLabel>
            <CustomTextField
              type="text"
              name="property_state"
              fullWidth
              value={values.property_state}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} lg={3}>
            <CustomFormLabel>Pincode</CustomFormLabel>
            <CustomTextField
              type="text"
              name="property_pincode"
              fullWidth
              value={values.property_pincode}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} lg={3}>
            <CustomFormLabel>Country</CustomFormLabel>
            <CustomTextField
              type="text"
              name="property_country"
              fullWidth
              value={values.property_country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CustomFormLabel>Longitude</CustomFormLabel>
            <CustomTextField
              type="text"
              name="longitude"
              fullWidth
              value={values.longitude}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CustomFormLabel>Latitude</CustomFormLabel>
            <CustomTextField
              type="text"
              name="latitude"
              fullWidth
              value={values.latitude}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CustomFormLabel>Check in</CustomFormLabel>
            <CustomTimePicker
              value={values.checkin_time}
              onChange={(time) => setFieldValue("checkin_time", time.toISOString())}

            />
          </Grid>
          <Grid item xs={12}>
            <DropZone onChange={(files) => handleChangeDropZone(files)} />

            <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
              {files.map((file, index) => (
                <UploadImageBox key={index}>
                  <Box component="img" src={file.preview} width="100%" />
                  <StyledClear onClick={handleFileDelete(file)} />
                </UploadImageBox>
              ))}
            </FlexBox>
          </Grid>

          <Grid item sm={4} xs={12}>
            <Button variant="contained" color="info" type="submit">
              Save product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card >
  );
}
