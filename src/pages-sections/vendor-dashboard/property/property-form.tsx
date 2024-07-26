"use client";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CustomStepper from "components/common/custom-stepper";
import { ILocationResponsePayload } from "components/LocationAutoComplete/LocationAutoComplete";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { defaultProperty } from "models/Property.model";
import React, { useState } from "react";
import * as yup from "yup";
import { PropertyFormButton } from "./_components/form-button";
import { PropertyFormStepFive } from "./_components/step-five";
import { PropertyFormStepFour } from "./_components/step-four";
import { PropertyFormStepOne } from "./_components/step-one";
import { PropertyFormStepThree } from "./_components/step-three";
import { PropertyFormStepTwo } from "./_components/step-two";
import { getPropertyDetails } from "../.././../utils/__api__/property"
import { api } from "utils/api";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  property_details_name: yup.string().required("Property Name is required!"),
});

// ================================================================
interface Props {
  propertyId?: string;
}
// ================================================================

export default function PropertyForm({ propertyId }: Props) {
  const [files, setFiles] = useState([]);
  const { userInfo } = useAuth();
  const steps = ['Description', 'Images', 'Details', 'Location', 'Amenities'];
  const [activeStep, setActiveStep] = React.useState(0);


  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue
  } = useFormik({
    initialValues: defaultProperty,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values) => {
      const { insert_ts, create_ts, ...rest } = values;
      await api.post("/property/upsert-property",
        rest,
        {
          headers: {
            "auth-Token": userInfo.token,
          },
        }
      );
    }
  });

  // handle Active Step
  const handleActiveStep = (buttonType: "back" | "front") => {
    if (buttonType === "back" && activeStep > 0) {
      setActiveStep((pre) => pre - 1)
    } else if (buttonType === "front" && activeStep < steps.length - 1) {
      setActiveStep((pre) => pre + 1)
    }

  }

  // fetch the data while editing the form
  React.useEffect(() => {
    if (propertyId) {
      const fetchData = async () => {
        const propertyData = await getPropertyDetails(propertyId);
        console.log(propertyData)
        setValues(propertyData);
      };

      fetchData();
    }
  }, [propertyId]);


  return (
    <>
      <CustomStepper steps={steps} activeStep={activeStep} />
      <Card className="p-3">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {
              activeStep === 0 && (
                <PropertyFormStepOne
                  values={values}
                  handleChange={handleChange}
                  touched
                  errors
                />
              )
            }
            {
              activeStep === 1 && (
                <PropertyFormStepTwo
                  values={values}
                  handleChange={handleChange}
                />
              )
            }
            {
              activeStep === 2 && (
                <PropertyFormStepThree
                  values={values}
                  handleChange={handleChange}
                />
              )
            }
            {
              activeStep === 3 && (
                <PropertyFormStepFour
                  values={values}
                  handleChange={handleChange}
                  setValues
                />
              )
            }
            {
              activeStep === 4 && (
                <PropertyFormStepFive
                  values={values}
                  setValues={setValues}
                  handleChange={handleChange}
                />
              )
            }
            <Grid item md={12}>
              <PropertyFormButton
                activeStep={activeStep}
                handleActiveStep={handleActiveStep}
                onSubmit={handleSubmit}
                steps={steps}
              />
            </Grid>
          </Grid>
        </form>
      </Card >
    </>

  );
}
