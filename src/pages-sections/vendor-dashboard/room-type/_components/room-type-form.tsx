"use client";

import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { PropertyAutoSearch } from "components/auto-searches/property-auto-search";
import LoadingDialog from "components/Dialogs/LoadingDialog";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { useFormik } from "formik";
import { defaultRoomType } from "models/Room-type.model";
import { useRouter } from "next/navigation";
import PageWrapper from "pages-sections/vendor-dashboard/page-wrapper";
import React from "react";
import { getRoomTypeDetails } from "utils/__api__/room-type";
import { api } from "utils/api";
import * as yup from "yup";


// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
    types_name: yup.string().required("This field is required!"),
});

// ================================================================
interface Props {
    uuid?: string;
}
// ================================================================

export default function RoomTypeForm({ uuid }: Props) {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter()

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setValues,
        setFieldValue
    } = useFormik({
        initialValues: defaultRoomType,
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: async (values) => {
            setLoading(true);
            const { insert_ts, create_ts, ...rest } = values;
            try {
                const res = await api.post("/room/upsert-room-types",
                    rest
                );
                if(res.status === 200){
                    router.push('/property/room-type')
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
    });

    // fetch the data while editing the form
    React.useEffect(() => {
        if (uuid) {
            const fetchData = async () => {
                const data = await getRoomTypeDetails(uuid);
                setValues(data);
            };
            fetchData();
        }
    }, [uuid]);


    return (

        <PageWrapper title={`${uuid ? "Edit" : "Create"} Room Type`}>
            <Card className="p-3">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <PropertyAutoSearch
                                label="Property"
                                value={{
                                    property_details_uuid: values.property_details_uuid,
                                    property_details_name: values.property_details_name,
                                }}
                                onSelect={(value) => {
                                    setValues({
                                        ...values,
                                        property_details_uuid: value.property_details_uuid as string,
                                        property_details_name: value.property_details_name as string,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid item sm={8} xs={12}>
                                <CustomFormLabel>Room Type</CustomFormLabel>
                                <CustomTextField
                                    fullWidth
                                    name="types_name"
                                    color="info"
                                    value={values.types_name}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid item sm={8} xs={12}>
                                <CustomFormLabel>Total Room</CustomFormLabel>
                                <CustomTextField
                                    fullWidth
                                    type="number"
                                    name="total_room"
                                    color="info"
                                    value={values.total_room}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomFormLabel>Type Details</CustomFormLabel>
                            <CustomTextField
                                type="text"
                                fullWidth
                                name="types_details"
                                color="info"
                                multiline
                                rows={4}
                                value={values.types_details}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" color="info">Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Card >
            <LoadingDialog open={loading} />
        </PageWrapper>

    );
}
