import React from "react";
import moment, { Moment } from "moment-timezone";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";

export const CustomDatePicker: React.FC<{
    value: string;
    sx?: any;
    disabled?: boolean;
    views?: ("day" | "month" | "year")[];
    inputFormat?: string;
    fullWidth?: boolean;
    errorMessage?: string;
    onChange: (value: any, timeWithSeconds: any, momentObject: Moment | null) => void;

}> = (props) => {
    const {
        value,
        sx,
        views = ["year", "month", "day"],
        inputFormat = "MM-DD-YYYY",
        fullWidth,
        disabled,
        errorMessage
    } = props;
    return (
        <>
            <DatePicker
                views={views}

                disabled={disabled}
                format={inputFormat}
                sx={{
                    width: fullWidth ? "100%" : "unset",

                    "& .MuiOutlinedInput-input": {
                        padding: "9px 13px",
                        fontSize: "0.8rem",
                        color: "rgb(38, 38, 38)",
                    },
                    ...sx
                }}
                value={value ? moment(value) : null}
                onChange={(newValue) => {
                    if (newValue) {
                        const newDate = moment(newValue).format("YYYY-MM-DD");
                        const newDate1 = moment(newValue).format("YYYY-MM-DD, HH:mm:ss a");
                        props.onChange(newDate, newDate1, newValue);
                    }
                    else {
                        props.onChange(null, null, null);
                    }

                }}
            />
        </>
    );
};

export const CustomTimePicker: React.FC<{
    value: string | null;
    sx?: any;
    fullWidth?: boolean;
    onChange: (value: string) => void;
    disabled?: boolean;
}> = (props) => {
    console.log(props.value)
    const { value, sx, fullWidth, disabled } = props;
    const timeString = value;
    const momentObject = moment(timeString);
    return (
        <TimePicker
            value={momentObject}
            disabled={disabled}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
            }}
            // format="hh:mm A"
            onChange={(newValue) => {
                if (newValue) {
                    props.onChange(moment(newValue).format('HH:mm:ss.SSS'));
                }
            }}
            sx={{
                width: fullWidth ? "100%" : "unset",
                "& .MuiOutlinedInput-input": {
                    padding: "9px 13px",
                    fontSize: "0.8rem",
                    color: "rgb(38, 38, 38)",
                },
                "& .MuiInputBase-root": {
                    backgroundColor: "white",
                },                
            }}
        />
    );
};
