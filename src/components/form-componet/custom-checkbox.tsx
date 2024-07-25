import * as React from "react";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormControlLabelProps } from "@mui/material";

import { CheckboxProps, RadioProps } from "@mui/material";

export interface ICheckBoxProps extends CheckboxProps {
  bgcolor?: string;
}

export interface IRadioButtonProps extends RadioProps {
  bgcolor?: string;
}


const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,

  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(0,0,0,.2)",
  backgroundColor: theme.palette.mode === "dark" ? "rgba(0,0,0,0.4)" : "",

  ".Mui-focusVisible &": {
    outline: "0px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.primary
        : theme.palette.primary,
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  boxShadow: "none",
  width: 16,
  height: 16,
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
});

// Inspired by blueprintjs
export const CustomCheckbox: React.FC<ICheckBoxProps> = ({
  bgcolor,
  ...props
}) => {
  return (
    <Checkbox
      disableRipple
      color="default"
      size="small"
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: bgcolor || "info.main",            
          }}
        />
      }
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
};

export interface ICustomCheckBoxWithLabelProps {
  label: string;
  name?: string;
  checked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  disabled?: boolean;
  labelPlacement?: FormControlLabelProps["labelPlacement"];
}

export const CustomCheckBoxWithLabel: React.FC<
  ICustomCheckBoxWithLabelProps
> = (props) => {
  const { checked, label, labelPlacement = "end", disabled, onChange } = props;
  return (
    <FormControlLabel
      labelPlacement={labelPlacement}
      control={
        <Checkbox
          disabled={disabled}
          checked={checked}
          name={props.name}
          onChange={onChange}
        />
      }
      label={label}
    />
  );
};
