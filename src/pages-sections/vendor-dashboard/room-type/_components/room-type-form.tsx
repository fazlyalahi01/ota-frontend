"use client";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { defaultProperty } from "models/Property.model";
import PageWrapper from "pages-sections/vendor-dashboard/page-wrapper";
import React from "react";
import { getPropertyDetails } from "utils/__api__/property";
import { api } from "utils/api";
import * as yup from "yup";


// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
    property_details_name: yup.string().required("Property Name is required!"),
});

// ================================================================
interface Props {
    propertyId?: string;
}
// ================================================================

export default function RoomTypeForm({ propertyId }: Props) {
    const { userInfo } = useAuth();

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

        <PageWrapper title="Add Room Type">
            <Card className="p-3">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>

                    </Grid>
                </form>
            </Card >
        </PageWrapper>

    );
}
