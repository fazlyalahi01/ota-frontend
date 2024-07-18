import React from "react";

import { Typography } from "@mui/material";
import { TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment, { Moment } from "moment";

export const CustomDatePicker: React.FC<{
    fieldName?: string;
    value: string;
    sx?: any;
    disabled?: boolean;
    views?: ("day" | "month" | "year")[];
    inputFormat?: string;
    fullWidth?: boolean;
    onChange: (value: any, formattedDate: string) => void;
    error?: boolean;
    helperText?: string;
}> = (props) => {
    const {
        fieldName,
        value,
        sx,
        views = ["year", "month", "day"],
        inputFormat = "DD-MM-YYYY",
        fullWidth,
        disabled,
        error,
        helperText,
    } = props;
    return (
        <>
            <DatePicker
                name={fieldName}
                views={views}
                key={value}
                disabled={disabled}
                format={inputFormat}
                sx={{
                    width: fullWidth ? "100%" : "unset",
                    "& .MuiOutlinedInput-input": {
                        padding: "9px 13px",
                        fontSize: "0.8rem",
                        color: "rgb(38, 38, 38)",
                    },
                }}
                value={moment(value) && value.length > 0 ? moment(value) : null}
                onChange={(newValue) => {
                    const formattedDate = moment(newValue).format("YYYY-MM-DD");
                    props.onChange(newValue, formattedDate);
                }}
            />
            <Typography
                variant="body2"
                sx={{
                    fontSize: "0.75rem",
                    color: "#e46a76",
                    marginLeft: 2,
                    marginTop: 0.75,
                }}
            >
                {error && helperText}
            </Typography>
        </>
    );
};

export const CustomTimePicker: React.FC<{
    value: any;
    sx?: any;
    fullWidth?: boolean;
    onChange: (value: Moment) => void;
    disabled?: boolean;
}> = (props) => {
    const { value, sx, fullWidth, disabled } = props;
    const timeString = value;
    const momentObject = moment(timeString, "HH:mm:ss");
    return (
        <TimePicker
            value={momentObject}
            disabled={disabled}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
            }}
            format="hh:mm A"
            onChange={(newValue) => {
                if (newValue) {
                    props.onChange(newValue);
                }
            }}
            sx={{
                width: fullWidth ? "100%" : "unset",
                "& .MuiOutlinedInput-input": {
                    padding: "9px 13px",
                    fontSize: "0.8rem",
                    color: "rgb(38, 38, 38)",
                },
            }}
        />
    );
};
