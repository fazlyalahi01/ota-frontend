"use client";

import { Box, Button, FormControlLabel, FormGroup, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { PropertyAutoSearch } from "components/auto-searches/property-auto-search";
import { RoomTypeAutoSearch } from "components/auto-searches/room-type-auto-search";
import LoadingDialog from "components/Dialogs/LoadingDialog";
import DropZone from "components/DropZone";
import { FileUpload } from "components/FileUpload/FileUpload";
import { uploadMultipleFile } from "components/FileUpload/utils";
import { FlexBox } from "components/flex-box";
import { CustomCheckbox } from "components/form-componet/custom-checkbox";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { amenities } from "constants/constants";
import { useFormik } from "formik";
import { defaultRoomDetails } from "models/Room-details.model";
import { useRouter } from "next/navigation";
import PageWrapper from "pages-sections/vendor-dashboard/page-wrapper";
import { StyledClear, UploadImageBox } from "pages-sections/vendor-dashboard/styles";
import React from "react";
import { getRoomDetails } from "utils/__api__/room-details";
import { api } from "utils/api";
import * as yup from "yup";


// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
});

// ================================================================
interface Props {
    uuid?: string;
}
// ================================================================

export default function RoomDetailsForm({ uuid }: Props) {
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
        initialValues: defaultRoomDetails,
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: async (values) => {
            setLoading(true);

            const { insert_ts, create_ts, ...rest } = values;
            try {
                const asPayload = {
                    invoice_id: values.room_types_uuid,
                };
                const { paths } = await uploadMultipleFile(
                    values.room_images || [],
                    "ACCOUNTING",
                    asPayload
                );
                console.log(paths)
                const res = await api.post("/room/upsert-room-details",
                    rest
                );
                // if (res.status === 200) {
                //     router.push("/property/room-details")
                // }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }

        }
    });

    console.log(values)

    const handleAmenitiesCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const newRuleAllowed = checked
            ? [...values.amenities, name]
            : values.amenities.filter(rule => rule !== name);
        setValues({ ...values, amenities: newRuleAllowed });
    }

    // fetch the data while editing the form
    React.useEffect(() => {
        if (uuid) {
            const fetchData = async () => {
                const data = await getRoomDetails(uuid);
                setValues(data);
            };
            fetchData();
        }
    }, [uuid]);


    return (

        <PageWrapper title={`${uuid ? "Edit" : "Create"} Room Details`}>
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
                            <RoomTypeAutoSearch
                                label="Room Type"
                                value={{
                                    room_types_uuid: values.room_types_uuid,
                                    room_types_name: values.room_types_name,
                                }}
                                onSelect={(value) => {
                                    setValues({
                                        ...values,
                                        room_types_uuid: value.room_types_uuid as string,
                                        room_types_name: value.types_name as string,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <CustomFormLabel>Room Area</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                name="room_area"
                                color="info"
                                value={values.room_area}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <CustomFormLabel>Bed Type</CustomFormLabel>
                            <CustomTextField
                                select
                                fullWidth
                                color="info"
                                name="bed_type"
                                onChange={handleChange}
                                value={values.bed_type}
                            >
                                <MenuItem value="hotel">Delux</MenuItem>
                                <MenuItem value="resort">Type 2</MenuItem>
                                <MenuItem value="apartment">Type 3</MenuItem>
                            </CustomTextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <CustomFormLabel>View Type</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                name="view_type"
                                color="info"
                                value={values.view_type}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <CustomFormLabel>Max No of Guests</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                name="max_no_of_guests"
                                color="info"
                                value={values.max_no_of_guests}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <CustomFormLabel>Amenities</CustomFormLabel>
                            <FormGroup>
                                {
                                    amenities?.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item}
                                            control={
                                                <CustomCheckbox
                                                    checked={values.amenities.includes(item)}
                                                    onChange={handleAmenitiesCheckboxChange}
                                                    name={item}
                                                />
                                            }
                                        />
                                    ))
                                }
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <CustomFormLabel>About Room</CustomFormLabel>
                            <CustomTextField
                                type="text"
                                fullWidth
                                name="about_room"
                                color="info"
                                multiline
                                rows={4}
                                value={values.about_room}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <DropZone
                                title="Drag and drop property images"
                                imageSize="Recommended size 600*500px"
                                onChange={(files) => handleChangeDropZone(files)}
                            />

                            <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                                {files.map((file, index) => {
                                    return (
                                        <UploadImageBox key={index}>
                                            <Box component="img" alt="product" src={file} width="100%" />
                                            {/* <StyledClear onClick={handleFileDelete(file)} /> 
                                        </UploadImageBox>
                                    );
                                })}
                            </FlexBox>
                        </Grid> */}
                        <Grid item xs={12} />
                        <Grid item xs={12}>
                            <Grid item xs={12} lg={4}>
                                <FileUpload
                                    multiple
                                    value={values.room_images || []}
                                    heading="Attachments"
                                    onMultiChange={(data) => setFieldValue("room_images", data)}
                                />
                            </Grid>
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
