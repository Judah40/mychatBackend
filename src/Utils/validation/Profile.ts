import * as yup from "yup";

export const profileSchema = yup
  .object({
    firstName: yup
      .string()
      .trim()
      .matches(
        /^[A-Za-z'-]+$/,
        "First name can only contain letters, apostrophes and hyphens"
      )
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be at most 50 characters")
      .required("First name is required"),

    middleName: yup
      .string()
      .transform((value) =>
        typeof value === "string" && value.trim() === "" ? undefined : value
      )
      .trim()
      .matches(
        /^[A-Za-z'-]+$/,
        "Middle name can only contain letters, apostrophes and hyphens"
      )
      .max(50, "Middle name must be at most 50 characters")
      .nullable()
      .notRequired(),

    lastName: yup
      .string()
      .trim()
      .matches(
        /^[A-Za-z'-]+$/,
        "Last name can only contain letters, apostrophes and hyphens"
      )
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be at most 50 characters")
      .required("Last name is required"),
  })
  .required();

export type Profile = yup.InferType<typeof profileSchema>;
