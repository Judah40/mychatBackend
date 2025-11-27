import * as yup from "yup";

export const phoneNumberSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^\+\d{10,15}$/, "Phone number must be in E.164 format")
    .required("Phone number is required"),
});

export const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")
    .required("OTP is required"),
});
