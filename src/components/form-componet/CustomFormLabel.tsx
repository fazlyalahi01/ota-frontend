import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomFormLabel = styled((props: TypographyProps) => (
  <Typography
    variant="body2"
    {...props}
  />
))(({ theme }) => ({
  display: "block",
  fontSize: "0.875rem", // Equivalent to text-sm
  fontWeight: 500, // Equivalent to font-medium
  color: theme.palette.mode === "dark" ? "#fff" : "#4a4a4a", // Equivalent to text-gray-700
  paddingBottom: "0.25rem", // Equivalent to pb-1
}));

export default CustomFormLabel;
