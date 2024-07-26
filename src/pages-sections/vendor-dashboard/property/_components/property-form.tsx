"use client";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CustomStepper from "components/common/custom-stepper";
import LoadingDialog from "components/Dialogs/LoadingDialog";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { defaultProperty } from "models/Property.model";
import { useRouter } from "next/navigation";
import PageWrapper from "pages-sections/vendor-dashboard/page-wrapper";
import React, { useState } from "react";
import { getPropertyDetails } from "utils/__api__/property";
import { api } from "utils/api";
import * as yup from "yup";
import { PropertyFormButton } from "./form-button";
import { PropertyFormStepFive } from "./step-five";
import { PropertyFormStepFour } from "./step-four";
import { PropertyFormStepOne } from "./step-one";
import { PropertyFormStepThree } from "./step-three";
import { PropertyFormStepTwo } from "./step-two";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  property_details_name: yup.string().required("Property Name is required!"),
});

// ================================================================
interface Props {
  uuid?: string;
}
// ================================================================

export default function PropertyForm({ uuid }: Props) {
  const [files, setFiles] = useState([]);
  const { userInfo } = useAuth();
  const steps = ['Description', 'Images', 'Details', 'Location', 'Amenities'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();



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
      setLoading(true);
      const { insert_ts, create_ts, ...rest } = values;
      try {
        const res = await api.post("/property/update-property",
          rest          
        );
        if (res.status === 200) {
          router.push("/property/properties")
      }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
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
    if (uuid) {
      const fetchData = async () => {
        const propertyData = await getPropertyDetails(uuid);
        console.log(propertyData)
        setValues(propertyData);
      };

      fetchData();
    }
  }, [uuid]);


  return (
    <PageWrapper title={`${uuid ? "Edit" : "Create"} Property`}>

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
      <LoadingDialog open={loading} />
    </PageWrapper>

  );
}
