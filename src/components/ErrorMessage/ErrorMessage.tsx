import React from "react";
import { IErrorMessageProps } from "./interfaces/IErroMessageProps";
import { Typography } from "@mui/material";

export const ErrorMessage: React.FC<IErrorMessageProps> = (props) => {
  const { value } = props;

  return (
    <Typography variant="caption" color="error">
      {value}
    </Typography>
  );
};
