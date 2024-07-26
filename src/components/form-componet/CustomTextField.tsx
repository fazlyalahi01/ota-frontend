import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTextField = styled((props: TextFieldProps) => (
  <TextField
    {...props}
  />
))(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#fff", 
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.mode === "dark" ? "#fff" : "##E7E7E7", 
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.info.dark, 
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.info.light, 
  },
  '&.Mui-focused:not(:hover) .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.info.light, 
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.mode === "dark" ? "#fff" : "#000", 
  },
  "& .MuiOutlinedInput-input": {
    padding: "9px 13px",
    fontSize: "0.8rem",
    color: "rgb(38, 38, 38)",
  },
}));

export default CustomTextField;
