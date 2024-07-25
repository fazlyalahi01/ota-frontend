"use client";

import { Add, Delete, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { api } from "api/api";
import IncrementalTextfield, { DangerIconButton, PrimaryIconButton } from "components/common/incremental-textfiled";
import { CustomTimePicker } from "components/form-componet/custom-date-time-picker";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { ILocationResponsePayload, LocationAutoComplete } from "components/LocationAutoComplete/LocationAutoComplete";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { produce } from "immer";
import { defaultProperty } from "models/Property.model";
import { useState } from "react";
import * as yup from "yup";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  property_details_name: yup.string().required("Property Name is required!"),
});

// ================================================================
interface Props { }
// ================================================================

export default function PropertyForm(props: Props) {
  const [files, setFiles] = useState([]);
  const { userInfo } = useAuth()

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
    onSubmit: async (values) => {

      const res = await api.post("/property/upsert-property",
        values,
        {
          headers: {
            "auth-Token": userInfo.token,
          },
        }
      );
      console.log(res)

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

  // handle rule allowed

  const handleRuleAllowed = (index: number, value: string) => {
    const newValues = produce(values, (draft) => {
      draft.rule_allowed[index] = value;
    })
    setValues(newValues);
  }
  const handleAddRuleAllowed = (currentIndex: number) => {
    const newValues = produce(values, (draft) => {
      draft.rule_allowed.splice(currentIndex + 1, 0, "");
    })
    setValues(newValues);
  };

  const handleDeleteRuleAllowed = (currentIndex: number) => {
    console.log(currentIndex, "currentIndex")
    const newValues = produce(values.rule_allowed, (draft) => {
      draft.splice(currentIndex, 1);
    })
    setFieldValue("rule_allowed", newValues);
  };
  // handle rule not allowed

  const handleRuleNotAllowed = (index: number, value: string) => {
    const newValues = produce(values, (draft) => {
      draft.rule_not_allowed[index] = value;
    })
    setValues(newValues);
  }
  const handleAddRuleNotAllowed = (currentIndex: number) => {
    const newValues = produce(values, (draft) => {
      draft.rule_not_allowed.splice(currentIndex + 1, 0, "");
    })
    setValues(newValues);
  };

  const handleDeleteRuleNotAllowed = (currentIndex: number) => {
    console.log(currentIndex, "currentIndex")
    const newValues = produce(values.rule_not_allowed, (draft) => {
      draft.splice(currentIndex, 1);
    })
    setFieldValue("rule_not_allowed", newValues);
  };

  
  // handle amineties 
  const handleAmenitiesSectionChange = (index: number, label: string) => {
    const newValues = produce(values, (draft) => {
      draft.amenities[index]["label"] = label;
    })
    setValues(newValues);
  }
  const handleAmenitiesChange = (index: number, rowId: number,  value: string) => {
    const newValues = produce(values, (draft) => {
      draft.amenities[index][value][rowId] = value;
    })
    setValues(newValues);
  }
  const handleAddAmenities = (currentIndex: number) => {
    const newValues = produce(values, (draft) => {
      draft.rule_not_allowed.splice(currentIndex + 1, 0, "");
    })
    setValues(newValues);
  };

  const handleDeleteAmenities = (currentIndex: number) => {
    console.log(currentIndex, "currentIndex")
    const newValues = produce(values.rule_not_allowed, (draft) => {
      draft.splice(currentIndex, 1);
    })
    setFieldValue("rule_not_allowed", newValues);
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
          <Grid item xs={12} sm={3}>
            <CustomFormLabel>Location</CustomFormLabel>
            <LocationAutoComplete
              value={values.property_address_line_1}
              onLocationChange={handleLocation}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
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

          <Grid item xs={12} sm={3}>
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

          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
            <CustomFormLabel>Check in</CustomFormLabel>
            <CustomTimePicker
              fullWidth
              value={values.checkin_time}
              onChange={(time) => {
                setFieldValue("checkin_time", time)
              }}

            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomFormLabel>Check out</CustomFormLabel>
            <CustomTimePicker
              fullWidth
              value={values.checkout_time}
              onChange={(time) => {
                setFieldValue("checkout_time", time)
              }}

            />
          </Grid>

          <Grid item xs={12} sm={3} spacing={2}>
            <CustomFormLabel>Rule Allowed</CustomFormLabel>
            {
              values.rule_allowed?.map((item, index) => (
                <IncrementalTextfield
                  key={index}
                  index={index}
                  isDisabled={index === 0 && values.rule_allowed?.length === 1}
                  value={item}
                  onChange={handleRuleAllowed}
                  onAdd={handleAddRuleAllowed}
                  onDelete={handleDeleteRuleAllowed}
                />
              ))
            }
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomFormLabel>Rule Not Allowed</CustomFormLabel>
            {
              values.rule_not_allowed?.map((item, index) => (
                <IncrementalTextfield
                  key={index}
                  index={index}
                  isDisabled={index === 0 && values.rule_not_allowed?.length === 1}
                  value={item}
                  onChange={handleRuleNotAllowed}
                  onAdd={handleAddRuleNotAllowed}
                  onDelete={handleDeleteRuleNotAllowed}
                />
              ))
            }
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomFormLabel>Amenities</CustomFormLabel>
            {
              values.amenities?.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMore />} key={index}>
                    <CustomTextField
                      fullWidth
                      placeholder="Section name"                      
                      onChange={(e)=>handleAmenitiesSectionChange(index, e.target.value)}
                      value={item.label}
                    />
                    <PrimaryIconButton >
                      <Add fontSize="small" />
                    </PrimaryIconButton>
                    <DangerIconButton >
                      <Delete fontSize="small" />
                    </DangerIconButton>
                  </AccordionSummary>

                  <AccordionDetails>
                    {
                      item?.value?.map((data, rowId) => (
                        <IncrementalTextfield
                          key={index}
                          index={index}
                          placeholder="Amenitiy name"
                          isDisabled={index === 0 && values.rule_not_allowed?.length === 1}
                          value={data}
                          onChange={handleAmenitiesChange}
                          onAdd={handleAddAmenities}
                          onDelete={handleDeleteAmenities}
                        />
                      ))
                    }
                  </AccordionDetails>
                </Accordion>
              ))
            }
          </Grid>
          <Grid item md={12}>
            <Button variant="contained" color="info" type="submit">
              Save product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card >
  );
}
