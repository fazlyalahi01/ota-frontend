import { Box, Grid } from "@mui/material";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import { IProperty } from "models/Property.model";
import { StyledClear, UploadImageBox } from "pages-sections/vendor-dashboard/styles";
import React from "react";

interface Props {
    values: IProperty;
    handleChange: any;
}

export function PropertyFormStepTwo({ values, handleChange }: Props) {
    const [files, setFiles] = React.useState([]);
    console.log(files, "files")

    // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
    const handleChangeDropZone = (files: File[]) => {
        files.forEach((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
        setFiles(files);
    };

    // HANDLE DELETE UPLOAD IMAGE
    const handleFileDelete = (file: File) => () => {
        setFiles((files) => files.filter((item) => item.name !== file.name));
    };
    return (
        <>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <DropZone
                        title="Drag and drop property images"
                        imageSize="Recommended size 600*500px"
                        onChange={(files) => handleChangeDropZone(files)}
                    />

                    <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                        {files.map((file, index) => {
                            console.log(file, file.preview)
                            return (
                                <UploadImageBox key={index}>
                                    <Box component="img" alt="product" src={file.preview} width="100%" />
                                    <StyledClear onClick={handleFileDelete(file)} />
                                </UploadImageBox>
                            );
                        })}
                    </FlexBox>
                </Grid>
            </Grid>
        </>
    )
}