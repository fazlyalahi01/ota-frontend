import React from "react";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";

interface LoadingDialogProps {
  open: boolean;
  label?: string;
}

const LoadingDialog: React.FC<LoadingDialogProps> = (props) => {
  const { open, label = "Saving your changes, please wait..." } = props;
  return (
    <Dialog open={open} aria-labelledby="loading-dialog-title">
      <DialogContent>
        <Stack direction={"row"} alignItems={"center"} spacing={2} padding={2}>
          <CircularProgress color="warning" size={30} />
          <Typography variant="h6" fontWeight={600}>
            {label}
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
