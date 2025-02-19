"use client";
import React from "react";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
// LOCAL CUSTOM COMPONENTS
import EyeToggleButton from "../components/eye-toggle-button";
// LOCAL CUSTOM HOOK
import usePasswordVisible from "../use-password-visible";
// GLOBAL CUSTOM COMPONENTS
import BazaarTextField from "components/BazaarTextField";
import useAuth from "hooks/useAuth";
import { Small } from "components/Typography";

// ==============================================================
interface Props {
  closeDialog?: () => void;
}
// ==============================================================

const LoginPageView = ({ closeDialog }: Props) => {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
  const { login } = useAuth()
  const [error, setError] = React.useState<string>("");

  // LOGIN FORM FIELDS INITIAL VALUES
  const initialValues = { email: "", password: "" };

  // LOGIN FORM FIELD VALIDATION SCHEMA
  const validationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    email: yup.string().email("invalid email").required("Email is required")
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await login(values.email, values.password, () => { }, (error) => {
        setError(error)
      })

      closeDialog?.();
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Small sx={{ color: "error.main", textAlign: "center" }}>{error}</Small>
      <BazaarTextField
        mb={1.5}
        fullWidth
        name="email"
        size="small"
        type="email"
        variant="outlined"
        onBlur={handleBlur}
        value={values.email}
        onChange={handleChange}
        label="Email"
        placeholder="exmple@mail.com"
        helperText={touched.email && errors.email}
        error={Boolean(touched.email && errors.email)}
      />

      <BazaarTextField
        mb={2}
        fullWidth
        size="small"
        name="password"
        label="Password"
        autoComplete="on"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        placeholder="*********"
        type={visiblePassword ? "text" : "password"}
        helperText={touched.password && errors.password}
        error={Boolean(touched.password && errors.password)}
        InputProps={{
          endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
        }}
      />
      <Button fullWidth type="submit" color="primary" variant="contained" size="large">
        Login
      </Button>
    </form>
  );
};

export default LoginPageView;
