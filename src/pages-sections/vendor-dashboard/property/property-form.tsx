"use client";

import { Add, Delete, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { api } from "api/api";
import CustomStepper from "components/common/custom-stepper";
import IncrementalTextfield, { DangerIconButton, PrimaryIconButton } from "components/common/incremental-textfiled";
import { CustomTimePicker } from "components/form-componet/custom-date-time-picker";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { ILocationResponsePayload, LocationAutoComplete } from "components/LocationAutoComplete/LocationAutoComplete";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { produce } from "immer";
import { defaultProperty } from "models/Property.model";
import React, { useState } from "react";
import * as yup from "yup";
import { PropertyFormStepOne } from "./_components/step-one";
import { PropertyFormStepTwo } from "./_components/step-two";
import { PropertyFormStepThree } from "./_components/step-three";
import { PropertyFormStepFour } from "./_components/step-four";
import { PropertyFormStepFive } from "./_components/step-five";
import { PropertyFormStepSeven } from "./_components/step-seven";
import { PropertyFormStepSix } from "./_components/step-six";
import { PropertyFormButton } from "./_components/form-button";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  property_details_name: yup.string().required("Property Name is required!"),
});

// ================================================================
interface Props { }
// ================================================================

export default function PropertyForm(props: Props) {
  const [files, setFiles] = useState([]);
  const { userInfo } = useAuth();
  const steps = ['Description', 'Price', 'Images', 'Details', 'Location', 'Amenities', 'Calender'];
  const [activeStep, setActiveStep] = React.useState(6);


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
  const handleAmenitiesChange = (index: number, value: string) => {
    const newValues = produce(values, (draft) => {
      draft.amenities[index][value] = value;
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

  // handle Active Step

  const handleActiveStep = (buttonType: "back" | "front") => {
    if (buttonType === "back" && activeStep > 0) {
      setActiveStep((pre) => pre - 1)
    } else if (buttonType === "front" && activeStep < steps.length - 1) {
      setActiveStep((pre) => pre + 1)
    }

  }


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
                  handleChange
                  touched
                  errors
                  handleBlur
                />
              )
            }
            {
              activeStep === 1 && (
                <PropertyFormStepTwo
                  values={values}
                  handleChange
                />
              )
            }
            {
              activeStep === 2 && (
                <PropertyFormStepThree
                  values={values}
                  handleChange
                />
              )
            }
            {
              activeStep === 3 && (
                <PropertyFormStepFour
                  values={values}
                  handleChange
                />
              )
            }
            {
              activeStep === 4 && (
                <PropertyFormStepFive
                  values={values}
                  handleChange
                  setValues
                />
              )
            }
            {
              activeStep === 5 && (
                <PropertyFormStepSix
                  values={values}
                  setValues={setValues}
                  handleChange
                />
              )
            }
            {
              activeStep === 6 && (
                <PropertyFormStepSeven
                  values={values}
                  handleChange
                  setFieldValue
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
